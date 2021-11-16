import { writable } from 'svelte/store'


export const set_yandex_maps = (yandex_maps_object) => {
  yandex_maps.update(old => {
    if (old === null) {
      return yandex_maps_object
    }
    return null
  })
}

// console.log(window.localStorage.getItem("123"))

export const yandex_maps = writable(null)
export const map_suggestions_store = writable<{ x: number, y: number } | undefined>(undefined)

