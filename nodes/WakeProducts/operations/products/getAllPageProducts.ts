import { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';

export async function getAllPageProducts(
	executeFunctions: IExecuteFunctions,
): Promise<INodeExecutionData[][]> {
	const returnData: INodeExecutionData[] = [];
	const items = executeFunctions.getInputData();
	for (let i = 0; i < items.length; i++) {
		try {
			const recordsPerPage = executeFunctions.getNodeParameter('recordsPerPage', i, 50) as number;
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

			let allProducts: IDataObject[] = [];
			let page = 1;
			let hasMorePages = true;

			while (hasMorePages) {
				// Build query parameters
				const qs: IDataObject = {
					pagina: page,
					quantidadeRegistros: recordsPerPage,
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

				// Make request
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

				// If no products returned, we've reached the end
				if (products.length === 0) {
					hasMorePages = false;
					break;
				}

				allProducts = allProducts.concat(products);

				// If we got fewer results than requested, we've reached the end
				if (products.length < recordsPerPage) {
					hasMorePages = false;
				} else {
					page++;
				}
			}

			// Add all products to return data
			for (const product of allProducts) {
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
