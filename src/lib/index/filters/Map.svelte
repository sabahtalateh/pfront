<script lang="ts">
  import { yandex_maps as yandex_maps_store } from '$lib/stores/yandex_maps'
  import { map_suggestions_store } from '$lib/stores/yandex_maps'
  import { onMount } from 'svelte'

  export let update_address
  export let update_suggestions

  let yandex_maps_api = null
  let mounted = false
  let map_loaded = false
  let yandex_map
  let circle


  onMount(() => {
    mounted = true
    load_map()
  })

  yandex_maps_store.subscribe((v) => {
    if (v !== null) {
      yandex_maps_api = v
      load_map()
    }
  })

  map_suggestions_store.subscribe(x => {
    if (!yandex_map) {
      return
    }
    yandex_map.setCenter([x.x, x.y])
    circle.geometry.setCoordinates([x.x, x.y])
  })

  const load_map = () => {
    if (yandex_maps_api === null || mounted === false || map_loaded) {
      return
    }

    let center = [55.75361503443606, 37.620883000000006]
    let zoom = 12

    yandex_map = new yandex_maps_api.Map('map', {
      center: center,
      zoom: zoom,
      controls: ['zoomControl', 'fullscreenControl']
    })

    circle = new yandex_maps_api.Circle(
      [[55.76, 37.6], 1000],
      {
        balloonContent: 'Радиус круга - 10 км',
        hintContent: 'Подвинь меня'
      },
      {
        draggable: true,
        fillColor: '#DB709377',
        strokeColor: '#990066',
        strokeOpacity: 0.8,
        strokeWidth: 2
      }
    )

    // https://yandex.ru/dev/maps/jsbox/2.1/geoobject_events
    circle.events.add(['dragend'], function(e) {
      const coords = e.originalEvent.target.geometry.getCoordinates()
      // map_state.update((old) => {
      //   return { x: coords[0], y: coords[1], radius: old.radius }
      // })
      console.log(e.originalEvent.target.geometry.getCoordinates())
      console.log(e.originalEvent.target.geometry.getRadius())

      yandex_maps_api.geocode(coords).then(function(res) {
        const firstGeoObject = res.geoObjects.get(0)
        update_address(firstGeoObject.getAddressLine())
        console.log(firstGeoObject.getAddressLine())
      })
    })

    yandex_map.events.add('click', function(e) {
      const coords = e.get('coords')
      circle.geometry.setCoordinates(coords)

      yandex_maps_api.geocode(coords).then(function(res) {
        const firstGeoObject = res.geoObjects.get(0)
        update_address(firstGeoObject.getAddressLine())
        console.log(firstGeoObject.getAddressLine())
      })
    })

    yandex_map.events.add('dragend', function(e) {
      console.log(123)
    })

    // yandex_maps_api.geocode('Тверск')
    //   .then(function(res) {
    //     let suggestions = []
    //     for (let i = 0; i < res.metaData.geocoder.found; i++) {
    //       const obj = res.geoObjects.get(i)
    //       const coords = obj.geometry.getCoordinates()
    //       suggestions.push({ text: obj.properties.get('name'), x: coords[0], y: coords[1] })
    //     }
    //
    //     update_suggestions(suggestions)
    //   })

    yandex_map.geoObjects.add(circle)
    map_loaded = true
  }
</script>

<section class="filtering-map wrap hidden">
  <div class="filter-map">
    <div id="map" class="map" />
  </div>
</section>

<style lang="scss">
  .wrap {
    margin: auto;
    max-width: 1200px;

    .map {
      width: 100%;
      height: 540px;
      background: lightgray;
    }
  }
</style>
