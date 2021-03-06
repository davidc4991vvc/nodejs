import clone from '../src/utils/clone'
import productsSyncFn, { actionGroups } from '../src/products'
import {
  baseActionsList,
  metaActionsList,
  referenceActionsList,
} from '../src/product-actions'

describe('Exports', () => {
  it('action group list', () => {
    expect(actionGroups).toEqual([
      'base',
      'meta',
      'references',
      'prices',
      'attributes',
      'images',
      'variants',
      'categories',
    ])
  })

  it('correctly define base actions list', () => {
    expect(baseActionsList).toEqual([
      { action: 'changeName', key: 'name' },
      { action: 'changeSlug', key: 'slug' },
      { action: 'setDescription', key: 'description' },
      { action: 'setSearchKeywords', key: 'searchKeywords' },
    ])
  })

  it('correctly define meta actions list', () => {
    expect(metaActionsList).toEqual([
      { action: 'setMetaTitle', key: 'metaTitle' },
      { action: 'setMetaDescription', key: 'metaDescription' },
      { action: 'setMetaKeywords', key: 'metaKeywords' },
    ])
  })

  it('correctly define reference actions list', () => {
    expect(referenceActionsList).toEqual([
      { action: 'setTaxCategory', key: 'taxCategory' },
    ])
  })
})

describe('Actions', () => {
  let productsSync
  beforeEach(() => {
    productsSync = productsSyncFn()
  })

  it('should ensure given objects are not mutated', () => {
    const before = {
      name: { en: 'Car', de: 'Auto' },
      masterVariant: {
        id: 1, sku: '001', attributes: [{ name: 'a1', value: 1 }] },
      variants: [
        { id: 2, sku: '002', attributes: [{ name: 'a2', value: 2 }] },
        { id: 3, sku: '003', attributes: [{ name: 'a3', value: 3 }] },
      ],
    }
    const now = {
      name: { en: 'Sport car' },
      masterVariant: {
        id: 1, sku: '100', attributes: [{ name: 'a1', value: 100 }] },
      variants: [
        { id: 2, sku: '200', attributes: [{ name: 'a2', value: 200 }] },
        { id: 3, sku: '300', attributes: [{ name: 'a3', value: 300 }] },
      ],
    }
    productsSync.buildActions(now, before)
    expect(before).toEqual(clone(before))
    expect(now).toEqual(clone(now))
  })

  it('should build `changeName` action', () => {
    const before = { name: { en: 'Car', de: 'Auto' } }
    const now = { name: { en: 'Sport car' } }
    const actions = productsSync.buildActions(now, before)

    expect(actions).toEqual([{ action: 'changeName', ...now }])
  })

  it('should build `setSearchKeywords` action', () => {
    /* eslint-disable max-len */
    const before = {
      searchKeywords: {
        en: [
          { text: 'Multi tool' },
          { text: 'Swiss Army Knife', suggestTokenizer: { type: 'whitespace' } },
        ],
        de: [
          { text: 'Schweizer Messer', suggestTokenizer: { type: 'custom', inputs: [ 'schweizer messer', 'offiziersmesser', 'sackmesser' ] } },
        ],
      },
    }
    const now = {
      searchKeywords: {
        en: [
          { text: 'Swiss Army Knife', suggestTokenizer: { type: 'whitespace' } },
        ],
        de: [
          { text: 'Schweizer Messer', suggestTokenizer: { type: 'custom', inputs: [ 'schweizer messer', 'offiziersmesser', 'sackmesser', 'messer' ] } },
        ],
        it: [
          { text: 'Coltello svizzero' },
        ],
      },
    }
    /* eslint-enable max-len */
    const actions = productsSync.buildActions(now, before)
    expect(actions).toEqual([{ action: 'setSearchKeywords', ...now }])
  })

  it('should build no actions if searchKeywords did not change', () => {
    /* eslint-disable max-len */
    const before = {
      name: { en: 'Car', de: 'Auto' },
      searchKeywords: {
        en: [
          { text: 'Multi tool' },
          { text: 'Swiss Army Knife', suggestTokenizer: { type: 'whitespace' } },
        ],
        de: [
          { text: 'Schweizer Messer', suggestTokenizer: { type: 'custom', inputs: [ 'schweizer messer', 'offiziersmesser', 'sackmesser' ] } },
        ],
      },
    }
    /* eslint-enable max-len */
    const actions = productsSync.buildActions(before, before)
    expect(actions).toEqual([])
  })

  it('should build `add/remove Category` actions', () => {
    const before = {
      categories: [
        { id: 'aebe844e-0616-420a-8397-a22c48d5e99f' },
        { id: '34cae6ad-5898-4f94-973b-ae9ceb7464ce' },
      ],
    }
    const now = {
      categories: [
        { id: 'aebe844e-0616-420a-8397-a22c48d5e99f' },
        { id: '4f278964-48c0-4f2c-8b61-09310d1de60a' },
        { id: 'cca7a250-d8cf-4b8a-9d47-60fcc093b86b' },
      ],
    }
    const actions = productsSync.buildActions(now, before)

    expect(actions).toEqual([
      {
        action: 'removeFromCategory',
        category: { id: '34cae6ad-5898-4f94-973b-ae9ceb7464ce' },
      },
      {
        action: 'addToCategory',
        category: { id: '4f278964-48c0-4f2c-8b61-09310d1de60a' },
      },
      {
        action: 'addToCategory',
        category: { id: 'cca7a250-d8cf-4b8a-9d47-60fcc093b86b' },
      },
    ])
  })

  it('should build base actions for long diff text', () => {
    const longText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nunc ultricies fringilla tortor eu egestas.
    Praesent rhoncus molestie libero, eu tempor sapien placerat id.
    Donec commodo nunc sed nulla scelerisque, eu pulvinar augue egestas.
    Donec at leo dolor. Cras at molestie arcu.
    Sed non fringilla quam, sit amet ultricies massa.
    Donec luctus tempus erat, ut suscipit elit varius nec.
    Mauris dolor enim, aliquet sed nulla et, dignissim lobortis augue.
    Proin pharetra magna eu neque semper tristique sed.
    `

    /* eslint-disable max-len */
    const before = {
      name: {
        en: longText,
      },
      slug: {
        en: longText,
      },
      description: {
        en: longText,
      },
    }
    const now = {
      name: {
        en: `Hello, ${longText}`,
      },
      slug: {
        en: `Hello, ${longText}`,
      },
      description: {
        en: `Hello, ${longText}`,
      },
    }
    /* eslint-enable max-len */
    const actions = productsSync.buildActions(now, before)
    expect(actions).toEqual([
      {
        action: 'changeName',
        name: now.name,
      },
      {
        action: 'changeSlug',
        slug: now.slug,
      },
      {
        action: 'setDescription',
        description: now.description,
      },
    ])
  })
})
