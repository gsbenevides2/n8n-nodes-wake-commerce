import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStoreGet = {
	operation: ['get'],
	resource: ['store'],
};

export const storeGetDescription: INodeProperties[] = [
	{
		displayName: 'Info',
		name: 'info',
		type: 'notice',
		displayOptions: {
			show: showOnlyForStoreGet,
		},
		default: '',
		description:
			'This operation retrieves basic store information including name, site URL and cart URL',
	},
];
