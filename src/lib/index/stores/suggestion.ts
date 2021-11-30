import { writable } from 'svelte/store'

interface Suggestion {
  address: string
  lat: number
  lng: number
}

export const suggestion = writable<Suggestion | null>(null)
