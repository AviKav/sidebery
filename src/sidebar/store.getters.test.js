import Getters from './store.getters'
import { DEFAULT_CTX, PRIVATE_CTX, DEFAULT_PANELS } from './store.state'

describe('Vuex getters', () => {
  test('bgNoise', () => {
    expect(Getters.bgNoise({ bgNoise: true })).toBe(true)
  })
  test('fontSize', () => {
    expect(Getters.fontSize({ fontSize: 'm' })).toBe('m')
  })
  test('isPrivate', () => {
    expect(Getters.isPrivate({ private: true })).toBe(true)
  })
  test('ctxMenu', () => {
    expect(Getters.ctxMenu({ ctxMenu: {} })).toEqual(expect.objectContaining({}))
  })
  test('ctxMenuOpened', () => {
    expect(Getters.ctxMenuOpened({ ctxMenu: {} })).toBe(true)
  })
  test('winChoosing', () => {
    expect(Getters.winChoosing({ winChoosing: [] })).toEqual(expect.arrayContaining([]))
  })
  test('tabs', () => {
    expect(Getters.tabs({ tabs: [1, 2, 3] })).toEqual(expect.arrayContaining([1, 2, 3]))
  })
  test('defaultCtxId', () => {
    expect(Getters.defaultCtxId({ private: true })).toBe(PRIVATE_CTX)
    expect(Getters.defaultCtxId({ private: false })).toBe(DEFAULT_CTX)
  })

  test('panels', () => {
    const state = {
      ctxs: [
        { cookieStoreId: 'a', icon: 'a-icon', colorCode: 'a-color' }
      ],
      tabs: [
        { id: 11, pinned: true, cookieStoreId: DEFAULT_CTX },
        { id: 21, pinned: false, cookieStoreId: DEFAULT_CTX },
        { id: 31, pinned: false, cookieStoreId: 'a' },
      ],
    }

    const panels = Getters.panels(state)

    expect(panels).toHaveLength(5)
    // Bookmarks
    expect(panels[0].icon).toBe(DEFAULT_PANELS[0].icon)
    expect(panels[0].name).toBe(DEFAULT_PANELS[0].name)
    // Pinned
    expect(panels[1].icon).toBe(DEFAULT_PANELS[1].icon)
    expect(panels[1].name).toBe(DEFAULT_PANELS[1].name)
    expect(panels[1].tabs).toHaveLength(1)
    // Private
    expect(panels[2].cookieStoreId).toBe(PRIVATE_CTX)
    expect(panels[2].icon).toBe(DEFAULT_PANELS[2].icon)
    expect(panels[2].name).toBe(DEFAULT_PANELS[2].name)
    // Default
    expect(panels[3].cookieStoreId).toBe(DEFAULT_CTX)
    expect(panels[3].icon).toBe(DEFAULT_PANELS[3].icon)
    expect(panels[3].name).toBe(DEFAULT_PANELS[3].name)
    expect(panels[3].tabs).toHaveLength(1)
    // Context - 'a'
    expect(panels[4].cookieStoreId).toBe('a')
    expect(panels[4].icon).toBe('a-icon')
    expect(panels[4].tabs).toHaveLength(1)
  })

  test('activePanel', () => {
    const state = {
      panelIndex: 3,
      ctxs: [
        { cookieStoreId: 'a', icon: 'a-icon', colorCode: 'a-color' }
      ],
      tabs: [
        { id: 11, pinned: true, cookieStoreId: DEFAULT_CTX },
        { id: 21, pinned: false, cookieStoreId: DEFAULT_CTX },
        { id: 31, pinned: false, cookieStoreId: 'a' },
      ],
    }

    const panels = Getters.panels(state)
    const activePanel = Getters.activePanel(state, { panels })

    expect(activePanel.cookieStoreId).toBe(DEFAULT_CTX)
  })

  test('defaultPanel', () => {
    const state = {
      panelIndex: 0,
      ctxs: [
        { cookieStoreId: 'a', icon: 'a-icon', colorCode: 'a-color' }
      ],
      tabs: [
        { id: 11, pinned: true, cookieStoreId: DEFAULT_CTX },
        { id: 21, pinned: false, cookieStoreId: DEFAULT_CTX },
        { id: 31, pinned: false, cookieStoreId: 'a' },
      ],
    }

    const panels = Getters.panels(state)
    const defaultCtxId = Getters.defaultCtxId({ private: true })
    const defaultPanel = Getters.defaultPanel(state, { panels, defaultCtxId })

    expect(defaultPanel.cookieStoreId).toBe(PRIVATE_CTX)
  })
})