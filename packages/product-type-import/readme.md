# Product Type Import
[![npm version][version]][version-icon]
[![npm David dependencies][dependencies]][dependencies-icon]

A library that helps with importing [product-types](https://dev.commercetools.com/http-api-projects-productTypes.html) into the [Commercetools Platform][commercetools].
- Import product types to your CTP project
- Pre-validate product types using a JSON schema.

## Usage

#### CLI
You can use the product type import from the command line using [`sphere-node-cli`](https://github.com/sphereio/sphere-node-cli).
In order for the cli to import product types, the file to import from must be JSON and follow the this structure:
```json
{
  "productTypes": [
    "<product-type>",
    "<product-type>",
    "..."
  ]
}
```
Then you can import this file using the cli:
```
sphere-node-cli -t productType -p my-project-key -f /sample_dir/productTypes.json
```
You can pass a custom configuration as described above via the `-c` operator followed by a JSON String that represents your configuration

### JS
If you want more control, you can also use this library directly in JavaScript. To do this you first need to install it:
```
npm install @commercetools/product-type-import --save
```
Then you can use it to import product types like so:
```
import ProductTypeImport from '@commercetools/product-type-import'

const productType = {
  name: '<some-name>',
  description: '<some-description>'
}
const config = {
  sphereClientConfig: {
    config: {
      project_key: <PROJECT_KEY>,
      client_id: '*********',
      client_secret: '*********'
    }
  }
}
const productTypeImport = ProductTypeImport(config)

productTypeImport.importProductType(productType)
  .then(() => {
    // done importing the productType
    // look at the summary to see errors
    productTypeImport.summary
  })
```

## Configuration
Uses `sphereClientConfig`: see the [sphere-node-sdk docs](http://sphereio.github.io/sphere-node-sdk/) for more information on this

[commercetools]: https://commercetools.com/
[version]: https://www.npmjs.com/package/@commercetools/product-type-import
[version-icon]: https://img.shields.io/npm/v/@commercetools/product-type-import.svg?style=flat-square
[dependencies]: https://david-dm.org/commercetools/nodejs?path=packages/product-type-import
[dependencies-icon]: https://img.shields.io/david/commercetools/nodejs.svg?path=packages/product-type-import&style=flat-square
