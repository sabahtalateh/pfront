import { writable } from 'svelte/store'
import { browser } from '$app/env'

interface Filters {
  load: 'loading' | 'loaded'
  animal: 'cat' | 'dog' | 'nothing'
  announcement_type: 'lost' | 'found' | 'nothing'
  when: {
    roughly: number
    on: Date
  }
  where: {
    lat: number
    lng: number
    radius: number
  }
}

interface Store {
  filters: Filters
}

const default_filters: Filters = {
  load: 'loading',
  animal: 'nothing',
  announcement_type: 'nothing',
  when: {
    roughly: 5,
    on: new Date()
  },
  where: {
    lat: 59.5619,
    lng: 30.1850,
    radius: 2500
  }
}

export const filters = writable<Filters>(default_filters)
export const init_filters = () => {
  setTimeout(() => {
    if (browser) {
      // const filters = localStorage.getItem('filters')
      filters.set({ ...default_filters, load: 'loaded' })
    }
  }, 800)

}
