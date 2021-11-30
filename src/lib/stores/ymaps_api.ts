import { writable } from 'svelte/store'
import type { Load } from '$lib/types'

export const set_ymaps_api = (api_object) => {
  ymaps_api.update(({ load, api }) => {
    if (load === 'loading' && api === null) {
      return { load: 'loaded', api: api_object }
    }
    return { load: 'loading', api: null }
  })
}

export const ymaps_api = writable<{ load: Load; api: any }>({ load: 'loading', api: null })
