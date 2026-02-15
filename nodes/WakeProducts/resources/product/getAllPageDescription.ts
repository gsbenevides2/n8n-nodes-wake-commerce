import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProductGetAllPage = {
	operation: ['getAllPageProducts'],
	resource: ['product'],
};

export const productGetAllPageDescription: INodeProperties[] = [
	{
		displayName: 'Records Per Page',
		name: 'recordsPerPage',
		type: 'number',
		displayOptions: {
			show: showOnlyForProductGetAllPage,
		},
		typeOptions: {
			minValue: 1,
			maxValue: 50,
		},
		default: 50,
		description:
			'Number of records to fetch per page (max: 50). Higher values mean fewer requests.',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForProductGetAllPage,
		},
		default: {},
		placeholder: 'Add Filter',
		options: [
			{
				displayName: 'Categories',
				name: 'categorias',
				type: 'string',
				default: '',
				description: 'Comma-separated category IDs to filter products',
				placeholder: '1,2,3',
			},
			{
				displayName: 'Distribution Centers',
				name: 'centrosDistribuicao',
				type: 'string',
				default: '',
				description: 'Comma-separated distribution center IDs to filter products',
				placeholder: '1,2,3',
			},
			{
				displayName: 'Manufacturers',
				name: 'fabricantes',
				type: 'string',
				default: '',
				description: 'Comma-separated manufacturer IDs to filter products',
				placeholder: '1,2,3',
			},
			{
				displayName: 'Modified Since',
				name: 'alteradosPartirDe',
				type: 'string',
				default: '',
				description:
					'Return only products modified after this date (format: yyyy-mm-dd hh:mm:ss, max 48 hours back)',
				placeholder: '2024-01-15 10:30:00',
			},
			{
				displayName: 'Only Valid Products',
				name: 'somenteValidos',
				type: 'boolean',
				default: false,
				description: 'Whether to return only valid products',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'camposAdicionais',
		type: 'multiOptions',
		displayOptions: {
			show: showOnlyForProductGetAllPage,
		},
		default: [],
		description: 'Additional fields to include in the response',
		options: [
			{
				name: 'Atacado (Wholesale)',
				value: 'Atacado',
				description: 'Include wholesale information',
			},
			{
				name: 'Atributo (Attributes)',
				value: 'Atributo',
				description: 'Include product attributes',
			},
			{
				name: 'Estoque (Stock)',
				value: 'Estoque',
				description: 'Include stock information',
			},
			{
				name: 'Informacao (Information)',
				value: 'Informacao',
				description: 'Include additional information',
			},
			{
				name: 'TabelaPreco (Price Table)',
				value: 'TabelaPreco',
				description: 'Include price table information',
			},
		],
	},
];
