import { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';

export async function getAllPageHotsites(
	executeFunctions: IExecuteFunctions,
): Promise<INodeExecutionData[][]> {
	const returnData: INodeExecutionData[] = [];
	const items = executeFunctions.getInputData();
	for (let i = 0; i < items.length; i++) {
		try {
			const recordsPerPage = executeFunctions.getNodeParameter('recordsPerPage', i, 50) as number;

			let allHotsites: IDataObject[] = [];
			let page = 1;
			let hasMorePages = true;

			while (hasMorePages) {
				// Build query parameters
				const qs: IDataObject = {
					pagina: page,
					quantidadePorPagina: recordsPerPage,
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

				// If no hotsites returned, we've reached the end
				if (hotsites.length === 0) {
					hasMorePages = false;
					break;
				}

				allHotsites = allHotsites.concat(hotsites);

				// If we got fewer results than requested, we've reached the end
				if (hotsites.length < recordsPerPage) {
					hasMorePages = false;
				} else {
					page++;
				}
			}

			// Add all hotsites to return data
			for (const hotsite of allHotsites) {
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
