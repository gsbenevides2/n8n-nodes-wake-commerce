import type { INodeProperties } from 'n8n-workflow';
import { storeGetDescription } from './get';

const showOnlyForStore = {
	resource: ['store'],
};

export const storeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForStore,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get store information',
				description: 'Get basic store information (name, site URL, cart URL)',
			},
		],
		default: 'get',
	},
	...storeGetDescription,
];
