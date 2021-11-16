import { writable } from 'svelte/store'
import { browser } from '$app/env'
import type { Filters } from '$lib/stores/Filters'
import { Animal, Convert } from '$lib/stores/Filters'


interface DateFilter {
  // date: Date,
  approx_days: number
}

// interface Filters {
//   animal: 'cat' | 'dog' | 'none',
//   announcement_type: 'lost' | 'found' | 'none',
//   date_filter: DateFilter | undefined,
// }

const init_filters = () => {
  console.log('OOO')
  if (browser) {
    console.log('BBB')
    try {
      console.log('CCC')
      // console.log(localStorage.getItem('filters'))
      // const filters: Filters = JSON.parse(localStorage.getItem('filters'))
      const filters: Filters = Convert.toFilters('{"animal": "cat"}')
      console.log(filters.animal == Animal.Cat)
      return filters
    } catch (e) {
      console.log('!!!')
      return {
        animal: undefined,
        announcement_type: undefined
      }
    }
  }
}

export const filters = writable<Filters>(init_filters())

// navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
//     const pos = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude,
//     };
//
//     console.log(pos)
//
//     // infoWindow.setPosition(pos);
//     // infoWindow.setContent("Location found.");
//     // infoWindow.open(map);
//     // map.setCenter(pos);
//   },
//   () => {
//     console.log('ERR')
//     // handleLocationError(true, infoWindow, map.getCenter()!);
//   }
// );
