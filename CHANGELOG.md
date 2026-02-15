# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-15

### Added

#### Product Operations
- **Get All Products** operation with automatic pagination
  - Fetches all products across multiple pages automatically
  - Returns all products as individual n8n items
- **Get Many Products** operation with manual pagination control
  - Allows specifying page number and records per page
  - Useful for controlled data retrieval

#### Product Filters
- **Categories**: Filter products by category IDs
- **Manufacturers**: Filter products by manufacturer IDs
- **Distribution Centers**: Filter by distribution center IDs
- **Modified Since**: Get products modified after a specific date
- **Only Valid Products**: Filter only valid/active products

#### Product Additional Fields
- **Atacado (Wholesale)**: Include wholesale pricing information
- **Estoque (Stock)**: Include stock/inventory data
- **Atributo (Attributes)**: Include product attributes
- **Informacao (Information)**: Include additional product information
- **TabelaPreco (Price Table)**: Include price table data

#### Category Operations
- **Get All Categories** operation
  - Fetches all categories from Wake Commerce store
  - Returns categories as individual n8n items

#### Category Filters
- **Hierarchy**: Include category hierarchy structure
- **Only Reseller**: Show only reseller categories
- **Only Last Level**: Display only leaf-level categories (categories without children)
- **Only Children**: Return only child categories
- **Active**: Filter by active/inactive status

#### Authentication
- Wake Commerce API credentials support
- Basic Authorization header with API token
- Secure credential storage using n8n credentials system

#### Developer Experience
- TypeScript implementation with full type safety
- Comprehensive error handling with `continueOnFail` support
- ESLint and Prettier configuration for code quality
- Automated CI/CD pipeline for testing and publishing

#### Documentation
- Complete README with installation and usage instructions
- GitHub Packages installation guide
- API reference links to Wake Commerce documentation
- Example workflows for common use cases
- Release guide (RELEASE.md) for maintainers

### Technical Details
- Built on n8n nodes API version 1
- Compatible with n8n 1.60.0 or later
- Published to GitHub Packages under `@gsbenevides2/n8n-nodes-wake-commerce`
- Automated release workflow on GitHub Actions

[1.0.0]: https://github.com/gsbenevides2/n8n-nodes-wake-commerce/releases/tag/v1.0.0
