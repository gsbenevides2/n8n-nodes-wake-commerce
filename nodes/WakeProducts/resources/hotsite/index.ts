import type { INodeProperties } from 'n8n-workflow';
import { hotsiteGetSinglePageDescription } from './getSinglePageDescription';
import { hotsiteGetAllPageDescription } from './getAllPageDescription';

const showOnlyForHotsites = {
	resource: ['hotsite'],
};

export const hotsiteDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForHotsites,
		},
		options: [
			{
				name: 'Get All Page Hotsites',
				value: 'getAllPageHotsites',
				action: 'Get all hotsites fetching all pages automatically',
				description: 'Get all hotsites from Wake Commerce (fetches all pages automatically)',
			},
			{
				name: 'Get Single Page Hotsites',
				value: 'getSinglePageHotsites',
				action: 'Get hotsites from a single page',
				description:
					'Get hotsites from Wake Commerce with manual page control (single page per execution)',
			},
		],
		default: 'getAllPageHotsites',
	},
	...hotsiteGetAllPageDescription,
	...hotsiteGetSinglePageDescription,
];
