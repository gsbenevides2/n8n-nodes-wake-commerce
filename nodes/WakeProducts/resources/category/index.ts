import type { INodeProperties } from 'n8n-workflow';
import { categoryGetAllDescription } from './getAll';

const showOnlyForCategories = {
	resource: ['category'],
};

export const categoryDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCategories,
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				action: 'Get all categories',
				description: 'Get all categories from Wake Commerce',
				routing: {
					request: {
						method: 'GET',
						url: '/categorias',
					},
				},
			},
		],
		default: 'getAll',
	},
	...categoryGetAllDescription,
];
