import { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';

export async function getSinglePageProducts(
	executeFunctions: IExecuteFunctions,
): Promise<INodeExecutionData[][]> {
	const returnData: INodeExecutionData[] = [];
	const items = executeFunctions.getInputData();
	for (let i = 0; i < items.length; i++) {
		try {
			const page = executeFunctions.getNodeParameter('page', i, 1) as number;
			const limit = executeFunctions.getNodeParameter('limit', i, 50) as number;
			const filters = executeFunctions.getNodeParameter('filters', i, {}) as {
				categorias?: string;
				fabricantes?: string;
				centrosDistribuicao?: string;
				alteradosPartirDe?: string;
				somenteValidos?: boolean;
			};
			const camposAdicionais = executeFunctions.getNodeParameter(
				'camposAdicionais',
				i,
				[],
			) as string[];

			// Build query parameters for single page
			const qs: IDataObject = {
				pagina: page,
				quantidadeRegistros: limit,
			};

			// Add filters
			if (filters.categorias) {
				qs.categorias = filters.categorias;
			}
			if (filters.fabricantes) {
				qs.fabricantes = filters.fabricantes;
			}
			if (filters.centrosDistribuicao) {
				qs.centrosDistribuicao = filters.centrosDistribuicao;
			}
			if (filters.alteradosPartirDe) {
				qs.alteradosPartirDe = filters.alteradosPartirDe;
			}
			if (filters.somenteValidos !== undefined) {
				qs.somenteValidos = filters.somenteValidos;
			}

			// Add additional fields
			if (camposAdicionais.length > 0) {
				qs.camposAdicionais = camposAdicionais;
			}

			// Make single request (no pagination loop)
			const responseData = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'wakeCommerceApi',
				{
					method: 'GET',
					url: 'https://api.fbits.net/produtos',
					qs,
					json: true,
				},
			);

			const products = Array.isArray(responseData) ? responseData : [];

			// Add products from this page only
			for (const product of products) {
				returnData.push({
					json: product,
					pairedItem: { item: i },
				});
			}
		} catch (error) {
			if (executeFunctions.continueOnFail()) {
				returnData.push({
					json: {
						error: error.message,
					},
					pairedItem: { item: i },
				});
				continue;
			}
			throw error;
		}
	}
	return [returnData];
}
