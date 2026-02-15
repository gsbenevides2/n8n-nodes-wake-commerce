import {
	NodeConnectionTypes,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { productDescription } from './resources/product';
import { categoryDescription } from './resources/category';
import { storeDescription } from './resources/store';
import { hotsiteDescription } from './resources/hotsite';
import { getAllPageProducts } from './operations/products/getAllPageProducts';
import { getSinglePageProducts } from './operations/products/getSinglePageProducts';
import { getAllCategories } from './operations/categories/getAllCategories';
import { getStore } from './operations/store/getStore';
import { getAllPageHotsites } from './operations/hotsites/getAllPageHotsites';
import { getSinglePageHotsites } from './operations/hotsites/getSinglePageHotsites';

export class WakeProducts implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wake Products',
		name: 'wakeProducts',
		icon: {
			light: 'file:../../icons/wake-commerce-preto.svg',
			dark: 'file:../../icons/wake-commerce-branco.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Wake Commerce Products API',
		defaults: {
			name: 'Wake Products',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'wakeCommerceApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.fbits.net',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Category',
						value: 'category',
					},
					{
						name: 'Hotsite',
						value: 'hotsite',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Store',
						value: 'store',
					},
				],
				default: 'product',
			},
			...categoryDescription,
			...hotsiteDescription,
			...productDescription,
			...storeDescription,
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Handle category operations
		if (resource === 'category' && operation === 'getAll') {
			return await getAllCategories(this);
		}

		// Handle store operations
		if (resource === 'store' && operation === 'get') {
			return await getStore(this);
		}

		// Handle hotsite operations
		if (resource === 'hotsite' && operation === 'getAllPageHotsites') {
			return await getAllPageHotsites(this);
		}

		if (resource === 'hotsite' && operation === 'getSinglePageHotsites') {
			return await getSinglePageHotsites(this);
		}

		// Handle custom operations with pagination logic
		if (resource === 'product' && operation === 'getAllPageProducts') {
			return await getAllPageProducts(this);
		}

		if (resource === 'product' && operation === 'getSinglePageProducts') {
			return await getSinglePageProducts(this);
		}

		// For other operations, use the default routing behavior
		return [await this.helpers.returnJsonArray(items)];
	}
}
