import type { INodeProperties } from 'n8n-workflow';
import { productGetSinglePageDescription } from './getSinglePageDescription';
import { productGetAllPageDescription } from './getAllPageDescription';

const showOnlyForProducts = {
	resource: ['product'],
};

export const productDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForProducts,
		},
		options: [
			{
				name: 'Get All Page Products',
				value: 'getAllPageProducts',
				action: 'Get all products fetching all pages automatically',
				description: 'Get all products from Wake Commerce (fetches all pages automatically)',
			},
			{
				name: 'Get Single Page Products',
				value: 'getSinglePageProducts',
				action: 'Get products from a single page',
				description:
					'Get products from Wake Commerce with manual page control (single page per execution)',
			},
		],
		default: 'getAllPageProducts',
	},
	...productGetAllPageDescription,
	...productGetSinglePageDescription,
];
