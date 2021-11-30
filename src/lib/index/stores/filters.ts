import { writable } from 'svelte/store'
import { browser } from '$app/env'
import Ajv, { JSONSchemaType } from 'ajv'
import type { Load } from '$lib/types'

const ajv = new Ajv()

export interface Circle {
  lat: number
  lng: number
  radius: number
}

export interface Map {
  // TODO мб дропнуть
  center: {
    lat: number
    lng: number
  }
  zoom: number
  circle: Circle
  address: string
}

interface Filters {
  animal: 'cat' | 'dog'
  announcement_type: 'lost' | 'found'
  when: {
    y: number
    m: number
    d: number
    roughly: number
  }
  map: Map
}

// @ts-ignore suppress "strictNullChecks": true is set in tsconfig.json
const filters_schema: JSONSchemaType<Filters> = {
  type: 'object',
  properties: {
    animal: { enum: ['dog', 'cat'] },
    announcement_type: { enum: ['lost', 'found'] },
    when: {
      type: 'object',
      properties: {
        y: { type: 'number' },
        m: { type: 'number' },
        d: { type: 'number' },
        roughly: { type: 'number' }
      },
      required: ['y', 'm', 'd', 'roughly']
    },
    map: {
      type: 'object',
      properties: {
        center: {
          type: 'object',
          properties: {
            lat: { type: 'number' },
            lng: { type: 'number' }
          },
          required: ['lat', 'lng']
        },
        zoom: { type: 'number' },
        circle: {
          type: 'object',
          properties: {
            lat: { type: 'number' },
            lng: { type: 'number' },
            radius: { type: 'number' }
          },
          required: ['lat', 'lng', 'radius']
        },
        address: { type: 'string' }
      },
      required: ['center', 'zoom', 'circle', 'address']
    }
  },
  required: ['animal', 'announcement_type', 'when', 'map']
}

const now = new Date()
const default_filters: Filters = {
  animal: 'dog',
  announcement_type: 'lost',
  when: {
    y: now.getUTCFullYear(),
    m: now.getUTCMonth(),
    d: now.getUTCDate(),
    roughly: 5
  },
  map: {
    center: {
      lat: 59.92441536155318,
      lng: 30.323015747070297
    },
    zoom: 11,
    circle: {
      lat: 59.92441536155318,
      lng: 30.323015747070297,
      radius: 2500
    },
    address: 'Россия, Санкт-Петербург, улица Ефимова, 5'
  }
}

const validate_filters = ajv.compile(filters_schema)

const create_filters = () => {
  const { subscribe, set, update } = writable<{ load: Load; filters: Filters }>({
    filters: default_filters,
    load: 'loading'
  })

  return {
    subscribe,
    set,
    update_announcement_type: (announcement_type: 'lost' | 'found') =>
      update(({ load, filters }) => {
        const new_filters = { ...filters, announcement_type }
        localStorage.setItem('filters', JSON.stringify(new_filters))
        return { load, filters: new_filters }
      }),
    update_animal: (animal: 'dog' | 'cat') =>
      update(({ load, filters }) => {
        const new_filters = { ...filters, animal }
        localStorage.setItem('filters', JSON.stringify(new_filters))
        return { load, filters: new_filters }
      }),
    update_when_date: (y: number, m: number, d: number) =>
      update(({ load, filters }) => {
        const new_filters = { ...filters, when: { ...filters.when, y, m, d } }
        localStorage.setItem('filters', JSON.stringify(new_filters))
        return { load, filters: new_filters }
      }),
    update_when_roughly: (roughly: number) =>
      update(({ load, filters }) => {
        const new_filters = { ...filters, when: { ...filters.when, roughly } }
        localStorage.setItem('filters', JSON.stringify(new_filters))
        return { load, filters: new_filters }
      }),
    update_circle_radius: (radius: number) =>
      update(({ load, filters }) => {
        const new_filters = {
          ...filters,
          map: { ...filters.map, circle: { ...filters.map.circle, radius } }
        }
        localStorage.setItem('filters', JSON.stringify(new_filters))
        return { load, filters: new_filters }
      }),
    update_circle_coords: (lat: number, lng: number) =>
      update(({ load, filters }) => {
        const new_filters = {
          ...filters,
          map: { ...filters.map, circle: { ...filters.map.circle, lat, lng } }
        }
        localStorage.setItem('filters', JSON.stringify(new_filters))
        return { load, filters: new_filters }
      }),
    update_zoom: (zoom: number) =>
      update(({ load, filters }) => {
        const new_filters = { ...filters, map: { ...filters.map, zoom } }
        localStorage.setItem('filters', JSON.stringify(new_filters))
        return { load, filters: new_filters }
      }),
    update_address: (address: string) =>
      update(({ load, filters }) => {
        console.log('!!!', address)
        const new_filters = { ...filters, map: { ...filters.map, address } }
        localStorage.setItem('filters', JSON.stringify(new_filters))
        return { load, filters: new_filters }
      })
  }
}

// {"animal":"dog","announcement_type":"lost","when":{"y":2021,"m":10,"d":20,"roughly":5},"where":{"lat":59.5619,"lng":30.185,"radius":2500}}
// {"animal":"dog","announcement_type":"found","when":{"y":2021,"m":10,"d":20,"roughly":5},"where":{"lat":59.5619,"lng":30.185,"radius":2500}}

// export const filters = writable<{
//   load: 'loading' | 'loaded'
//   filters: Filters
// }>({ filters: default_filters, load: 'loading' })
// // @ts-ignore
// filters.update_announcement_type = (type: 'lost' | 'found') => filters.update(x => {
//   const new_filters = { ...x.filters, announcement_type: type }
//   return { ...x, filters: new_filters }
// })

export const filters = create_filters()
export const load_filters = () => {
  if (browser) {
    // uncomment timeout to see loading screen on index page
    // setTimeout(() => {
    const local_filters = JSON.parse(localStorage.getItem('filters'))
    let filters_to_set: Filters = default_filters
    if (validate_filters(local_filters)) {
      // @ts-ignore we can set filters after validation
      filters_to_set = local_filters
    }

    filters_to_set.when.y = now.getUTCFullYear()
    filters_to_set.when.m = now.getUTCMonth()
    filters_to_set.when.d = now.getUTCDate()

    localStorage.setItem('filters', JSON.stringify(filters_to_set))
    filters.set({ filters: filters_to_set, load: 'loaded' })
    // }, 1000)
  } else {
    filters.set({ filters: default_filters, load: 'loaded' })
  }
}
