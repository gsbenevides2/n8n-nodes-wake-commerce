import { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';

export async function getSinglePageHotsites(
	executeFunctions: IExecuteFunctions,
): Promise<INodeExecutionData[][]> {
	const returnData: INodeExecutionData[] = [];
	const items = executeFunctions.getInputData();

	for (let i = 0; i < items.length; i++) {
		try {
			const limit = executeFunctions.getNodeParameter('limit', i, 50) as number;
			const page = executeFunctions.getNodeParameter('page', i, 1) as number;

			// Build query parameters
			const qs: IDataObject = {
				pagina: page,
				quantidadePorPagina: limit,
			};

			// Make request
			const responseData = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'wakeCommerceApi',
				{
					method: 'GET',
					url: 'https://api.fbits.net/hotsites',
					qs,
					json: true,
				},
			);

			const hotsites = Array.isArray(responseData) ? responseData : [];

			// Add all hotsites from this page to return data
			for (const hotsite of hotsites) {
				returnData.push({
					json: hotsite,
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
