<script lang="ts">
  import { yandex_maps as yandex_maps_store } from '$lib/stores/yandex_maps'
  import { onMount } from 'svelte'

	export let update_address

  let yandex_maps = null
  let mounted = false
  let map_loaded = false

  onMount(() => {
    mounted = true
    load_map()
  })

  yandex_maps_store.subscribe((v) => {
    if (v !== null) {
      yandex_maps = v
      load_map()
    }
  })

  const load_map = () => {
    if (yandex_maps === null || mounted === false || map_loaded) {
      return
    }

    let center = [55.75361503443606, 37.620883000000006]
    let zoom = 12

    const myMap = new yandex_maps.Map('map', {
      center: center,
      zoom: zoom,
      controls: ['zoomControl', 'fullscreenControl']
    })

    const myCircle = new yandex_maps.Circle(
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
    myCircle.events.add(['dragend'], function(e) {
      const coords = e.originalEvent.target.geometry.getCoordinates()
      console.log(e.originalEvent.target.geometry.getCoordinates())
      console.log(e.originalEvent.target.geometry.getRadius())

      yandex_maps.geocode(coords).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);
        update_address(firstGeoObject.getAddressLine())
        console.log(firstGeoObject.getAddressLine())
      })
    })

    myMap.geoObjects.add(myCircle)
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
