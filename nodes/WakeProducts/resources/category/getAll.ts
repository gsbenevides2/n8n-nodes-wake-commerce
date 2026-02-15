import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCategoryGetAll = {
	operation: ['getAll'],
	resource: ['category'],
};

export const categoryGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForCategoryGetAll,
		},
		default: {},
		placeholder: 'Add Filter',
		options: [
			{
				displayName: 'Active',
				name: 'ativo',
				type: 'boolean',
				default: true,
				description: 'Whether to filter by active status',
				routing: {
					send: {
						type: 'query',
						property: 'ativo',
					},
				},
			},
			{
				displayName: 'Hierarchy',
				name: 'hierarquia',
				type: 'boolean',
				default: false,
				description: 'Whether to include category hierarchy structure',
				routing: {
					send: {
						type: 'query',
						property: 'hierarquia',
					},
				},
			},
			{
				displayName: 'Only Children',
				name: 'somenteFilhos',
				type: 'boolean',
				default: false,
				description: 'Whether to return only child categories',
				routing: {
					send: {
						type: 'query',
						property: 'somenteFilhos',
					},
				},
			},
			{
				displayName: 'Only Last Level',
				name: 'apenasUltimoNivel',
				type: 'boolean',
				default: false,
				description: 'Whether to display only leaf-level categories (categories without children)',
				routing: {
					send: {
						type: 'query',
						property: 'apenasUltimoNivel',
					},
				},
			},
			{
				displayName: 'Only Reseller',
				name: 'apenasReseller',
				type: 'boolean',
				default: false,
				description: 'Whether to show only reseller categories',
				routing: {
					send: {
						type: 'query',
						property: 'apenasReseller',
					},
				},
			},
		],
	},
];
