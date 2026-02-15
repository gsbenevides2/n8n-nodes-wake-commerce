import type { INodeProperties } from 'n8n-workflow';

const showOnlyForHotsiteGetAllPage = {
	operation: ['getAllPageHotsites'],
	resource: ['hotsite'],
};

export const hotsiteGetAllPageDescription: INodeProperties[] = [
	{
		displayName: 'Records Per Page',
		name: 'recordsPerPage',
		type: 'number',
		displayOptions: {
			show: showOnlyForHotsiteGetAllPage,
		},
		typeOptions: {
			minValue: 1,
			maxValue: 50,
		},
		default: 50,
		description:
			'Number of records to fetch per page (max: 50). Higher values mean fewer requests.',
	},
];
