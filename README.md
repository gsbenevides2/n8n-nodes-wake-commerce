# n8n-nodes-wake-commerce

This is an n8n community node. It lets you use Wake Commerce (formerly Tray Commerce) API in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Manual installation

This package is published to GitHub Packages. You need to configure npm to use GitHub Packages for the `@gsbenevides2` scope:

```bash
npm config set @gsbenevides2:registry https://npm.pkg.github.com
```

Then install the package:

```bash
npm install @gsbenevides2/n8n-nodes-wake-commerce
```

Alternatively, you can create a `.npmrc` file in your project root:

```
@gsbenevides2:registry=https://npm.pkg.github.com
```

## Operations

### Products

- **Get All** - Get all products with automatic pagination
- **Get Many** - Get products with manual pagination control

Both operations support:

- **Filters**: Categories, Manufacturers, Distribution Centers, Modified Since, Only Valid Products
- **Additional Fields**: Atacado (Wholesale), Estoque (Stock), Atributo (Attributes), Informacao (Information), TabelaPreco (Price Table)

### Categories

- **Get All** - Get all categories from your store

Supports filters:

- **Hierarchy**: Include category hierarchy structure
- **Only Reseller**: Show only reseller categories
- **Only Last Level**: Display only leaf-level categories (no children)
- **Only Children**: Return only child categories
- **Active**: Filter by active/inactive status

### Hotsites

- **Get All Page Hotsites** - Get all hotsites with automatic pagination
- **Get Single Page Hotsites** - Get hotsites with manual pagination control

Both operations automatically fetch hotsite data including:

- Hotsite information (hotsiteId, name, active status, template, URL)
- Product lists and expressions
- SEO metadata
- Banners and content

### Store

- **Get** - Get basic store information (name, site URL, cart URL)

## Credentials

You need a Wake Commerce API token to use this node.

### Getting your API token

1. Access your Wake Commerce admin panel
2. Go to **Configurações** > **API**
3. Generate a new API token or use an existing one
4. Copy the token

### Configuring in n8n

1. In n8n, create a new **Wake Commerce API** credential
2. Paste your API token
3. Test the connection

The token is sent as a Basic Authorization header in the format: `Basic {your-token}`

## Compatibility

Compatible with n8n@1.60.0 or later

## Usage

### Example: Get All Products

1. Add the **Wake Products** node to your workflow
2. Select **Get All** operation
3. Configure filters if needed (optional)
4. Select additional fields to include (optional)
5. Execute the node

The node will automatically fetch all products across all pages and return them as individual items.

### Example: Get Products from Specific Category

1. Add the **Wake Products** node to your workflow
2. Select **Resource**: Product
3. Select **Get All** operation
4. In **Filters** > **Add Filter** > **Categories**, enter the category ID(s)
5. Execute the node

### Example: Get All Categories

1. Add the **Wake Products** node to your workflow
2. Select **Resource**: Category
3. Select **Get All** operation
4. Configure filters if needed (optional)
5. Execute the node

### Example: Get All Hotsites

1. Add the **Wake Products** node to your workflow
2. Select **Resource**: Hotsite
3. Select **Get All Page Hotsites** operation
4. Set records per page (optional, default: 50)
5. Execute the node

The node will automatically fetch all hotsites across all pages.

### Example: Get Store Information

1. Add the **Wake Products** node to your workflow
2. Select **Resource**: Store
3. Select **Get** operation
4. Execute the node

Returns basic store information including name, site URL, and cart URL.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Wake Commerce API documentation](https://wakecommerce.readme.io/)
- [Wake Commerce Products API reference](https://wakecommerce.readme.io/reference/retorna-todos-os-produtos)
- [Wake Commerce Categories API reference](https://wakecommerce.readme.io/reference/retorna-todas-as-categorias)
- [Wake Commerce Hotsites API reference](https://wakecommerce.readme.io/reference/busca-todos-os-hotsites-inseridos)
- [Wake Commerce Store API reference](https://wakecommerce.readme.io/reference/retorna-dados-da-loja)

## License

[MIT](LICENSE)

## Author

Guilherme da Silva Benevides (git@gui.dev.br)
