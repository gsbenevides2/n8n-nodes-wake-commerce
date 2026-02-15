import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function getStore(
	executeFunctions: IExecuteFunctions,
): Promise<INodeExecutionData[][]> {
	const returnData: INodeExecutionData[] = [];
	const items = executeFunctions.getInputData();

	for (let i = 0; i < items.length; i++) {
		try {
			// Make request to get store information
			const responseData = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'wakeCommerceApi',
				{
					method: 'GET',
					url: 'https://api.fbits.net/loja',
					json: true,
				},
			);

			// Add store data to return data
			returnData.push({
				json: responseData,
				pairedItem: { item: i },
			});
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
