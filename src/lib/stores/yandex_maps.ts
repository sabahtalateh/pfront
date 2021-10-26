import { writable } from 'svelte/store'

export const set_yandex_maps = (maps) => {
	yandex_maps.update((old) => {
		if (old === null) {
			return maps
		}
		return null
	})
}

export const yandex_maps = writable(null)
