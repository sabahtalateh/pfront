import { writable } from 'svelte/store'
import { browser } from '$app/env'
import Ajv, { JSONSchemaType } from 'ajv'

const ajv = new Ajv()

interface Filters {
  animal: 'cat' | 'dog'
  announcement_type: 'lost' | 'found'
  when: {
    y: number,
    m: number,
    d: number
    roughly: number,
  }
  where: {
    lat: number
    lng: number
    radius: number
  }
}

// @ts-ignore suppress "strictNullChecks": true is set in tsconfig.json
const filters_schema: JSONSchemaType<Filters> = {
  type: 'object',
  properties: {
    animal: { enum: ['dog', 'cat'] },
    announcement_type: { enum: ['lost', 'found'] },
    where: {
      type: 'object',
      properties: {
        y: { type: 'integer' },
        m: { type: 'integer' },
        d: { type: 'integer' },
        roughly: { type: 'integer' }
      },
      required: ['y', 'm', 'd', 'roughly']
    },
    when: {
      type: 'object',
      properties: {
        lat: { type: 'number' },
        lng: { type: 'number' },
        radius: { type: 'number' }
      },
      required: ['lat', 'lng', 'radius']
    }
  },
  required: ['animal', 'announcement_type', 'where', 'when']
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
  where: {
    lat: 59.5619,
    lng: 30.1850,
    radius: 2500
  }
}

const validate_filters = ajv.compile(filters_schema)

export const filters = writable<{
  load: 'loading' | 'loaded'
  filters: Filters
}>({ filters: default_filters, load: 'loading' })
export const load_filters = () => {
  // uncomment timeout to see loading screen on index page
  // setTimeout(() => {
  if (browser) {
    const local_filters = JSON.parse(localStorage.getItem('filters'))
    let filters_to_set: Filters = default_filters
    if (validate_filters(local_filters)) {
      console.log(local_filters)
      // @ts-ignore we can set filters after validation
      filters_to_set = local_filters
    } else {
      // If filters are not valid then update local storage value with the valid ones
      localStorage.setItem('filters', JSON.stringify(filters_to_set))
    }

    filters.set({ filters: filters_to_set, load: 'loaded' })
  }
  // }, 1000)
}
