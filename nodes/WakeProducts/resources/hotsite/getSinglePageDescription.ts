import type { INodeProperties } from 'n8n-workflow';

const showOnlyForHotsiteGetSinglePage = {
	operation: ['getSinglePageHotsites'],
	resource: ['hotsite'],
};

export const hotsiteGetSinglePageDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: showOnlyForHotsiteGetSinglePage,
		},
		typeOptions: {
			minValue: 1,
			maxValue: 50,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: showOnlyForHotsiteGetSinglePage,
		},
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		description: 'Page number to retrieve (starts at 1)',
	},
];
