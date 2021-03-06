import * as features from './features'

export default {
  cartDiscounts: {
    type: 'cart-discounts',
    endpoint: '/cart-discounts',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  carts: {
    type: 'carts',
    endpoint: '/carts',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  categories: {
    type: 'categories',
    endpoint: '/categories',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  channels: {
    type: 'channels',
    endpoint: '/channels',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  customerGroups: {
    type: 'customer-groups',
    endpoint: '/customer-groups',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  customers: {
    type: 'customers',
    endpoint: '/customers',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  customObjects: {
    type: 'custom-objects',
    endpoint: '/custom-objects',
    features: [
      features.query,
      features.queryOne,
    ],
  },
  discountCodes: {
    type: 'discount-codes',
    endpoint: '/discount-codes',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  inventory: {
    type: 'inventory',
    endpoint: '/inventory',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  messages: {
    type: 'messages',
    endpoint: '/messages',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  myCarts: {
    type: 'my-carts',
    endpoint: '/me/carts',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  myOrders: {
    type: 'my-orders',
    endpoint: '/me/orders',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  orders: {
    type: 'orders',
    endpoint: '/orders',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  payments: {
    type: 'payments',
    endpoint: '/payments',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  productDiscounts: {
    type: 'product-discounts',
    endpoint: '/product-discounts',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  productProjections: {
    type: 'product-projections',
    endpoint: '/product-projections',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
      features.projection,
    ],
  },
  productProjectionsSearch: {
    type: 'product-projections-search',
    endpoint: '/product-projections/search',
    features: [
      features.search,
      features.queryOne,
      features.queryExpand,
      features.projection,
    ],
  },
  products: {
    type: 'products',
    endpoint: '/products',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  productTypes: {
    type: 'product-types',
    endpoint: '/product-types',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  reviews: {
    type: 'reviews',
    endpoint: '/reviews',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  shippingMethods: {
    type: 'shipping-methods',
    endpoint: '/shipping-methods',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  states: {
    type: 'states',
    endpoint: '/states',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  subscriptions: {
    type: 'subscriptions',
    endpoint: '/subscriptions',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  taxCategories: {
    type: 'tax-categories',
    endpoint: '/tax-categories',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  types: {
    type: 'types',
    endpoint: '/types',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
  zones: {
    type: 'zones',
    endpoint: '/zones',
    features: [
      features.query,
      features.queryOne,
      features.queryExpand,
    ],
  },
}
