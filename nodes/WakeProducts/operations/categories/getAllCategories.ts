import { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';

export async function getAllCategories(
	executeFunctions: IExecuteFunctions,
): Promise<INodeExecutionData[][]> {
	const returnData: INodeExecutionData[] = [];
	const items = executeFunctions.getInputData();

	for (let i = 0; i < items.length; i++) {
		try {
			const filters = executeFunctions.getNodeParameter('filters', i, {}) as {
				hierarquia?: boolean;
				apenasReseller?: boolean;
				apenasUltimoNivel?: boolean;
				somenteFilhos?: boolean;
				ativo?: boolean;
			};

			// Build query parameters
			const qs: IDataObject = {};

			// Add filters if they are set
			if (filters.hierarquia !== undefined) {
				qs.hierarquia = filters.hierarquia;
			}
			if (filters.apenasReseller !== undefined) {
				qs.apenasReseller = filters.apenasReseller;
			}
			if (filters.apenasUltimoNivel !== undefined) {
				qs.apenasUltimoNivel = filters.apenasUltimoNivel;
			}
			if (filters.somenteFilhos !== undefined) {
				qs.somenteFilhos = filters.somenteFilhos;
			}
			if (filters.ativo !== undefined) {
				qs.ativo = filters.ativo;
			}

			// Make request
			const responseData = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'wakeCommerceApi',
				{
					method: 'GET',
					url: 'https://api.fbits.net/categorias',
					qs,
					json: true,
				},
			);

			const categories = Array.isArray(responseData) ? responseData : [];

			// Add all categories to return data
			for (const category of categories) {
				returnData.push({
					json: category,
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
