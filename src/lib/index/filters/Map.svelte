<script lang="ts">
  import { onMount } from 'svelte'
  import { ymaps_api } from '$lib/stores/ymaps_api'
  import { filters, Circle, Map } from '$lib/index/stores/filters'
  import { suggestion } from '$lib/index/stores/suggestion'

  let yandex_map
  let yandex_circle
  let circle: Circle

  onMount(() => {
    $filters.load === 'loaded' &&
    $ymaps_api.load === 'loaded' &&
    init_map($ymaps_api.api, $filters.filters.map)

    $filters.load === 'loaded' &&
    $ymaps_api.load === 'loaded' &&
    filters.subscribe(({ load, filters }) => {
      const new_circle: Circle = filters.map.circle
      new_circle.radius !== circle.radius && animate_circle_radius(new_circle)
      yandex_circle.properties.set(
        'hintContent',
        `Радиус поиска - ${new_circle.radius / 1000} км.`
      )
    })

    $filters.load === 'loaded' &&
    $ymaps_api.load === 'loaded' &&
    suggestion.subscribe((x) => {
      if (x === null) return
      yandex_map.setCenter([x.lat, x.lng])
      yandex_circle.geometry.setCoordinates([x.lat, x.lng])
      filters.update_circle_coords(x.lat, x.lng)
      filters.update_address(x.address)
    })
  })

  const init_map = (api, map: Map) => {
    circle = map.circle
    yandex_map = new api.Map('map', {
      center: [map.circle.lat, map.circle.lng],
      zoom: map.zoom,
      controls: ['zoomControl', 'fullscreenControl']
    })
    yandex_circle = add_circle_to_map(api, yandex_map, circle)

    yandex_map.events.add(['boundschange'], function(e) {
      filters.update_zoom(e.get('newZoom'))
    })

    // https://yandex.ru/dev/maps/jsbox/2.1/geoobject_events
    yandex_circle.events.add(['dragend'], function(e) {
      const coords = e.originalEvent.target.geometry.getCoordinates()
      filters.update_circle_coords(coords[0], coords[1])
      api.geocode(coords).then(function(res) {
        const firstGeoObject = res.geoObjects.get(0)
        filters.update_address(firstGeoObject.getAddressLine())
      })
    })

    yandex_map.events.add('click', function(e) {
      const coords = e.get('coords')
      filters.update_circle_coords(coords[0], coords[1])
      yandex_circle.geometry.setCoordinates(coords)
      api.geocode(coords).then(function(res) {
        const firstGeoObject = res.geoObjects.get(0)
        filters.update_address(firstGeoObject.getAddressLine())
      })
    })
  }

  const add_circle_to_map = (api, map, c: Circle): any => {
    let circle = new api.Circle(
      [[c.lat, c.lng], c.radius],
      {
        hintContent: `Радиус поиска - ${c.radius / 1000} км.`
      },
      {
        draggable: true,
        fillColor: '#DB709377',
        strokeColor: '#990066',
        strokeOpacity: 0.8,
        strokeWidth: 2
      }
    )
    map.geoObjects.add(circle)
    return circle
  }

  /// << Circle size animation
  const size_animation = {
    duration: 80,
    steps: 10,
    step_duration: -0
  }
  size_animation.step_duration = size_animation.duration / size_animation.steps

  function animate_circle_radius(new_circle: Circle) {
    const changed_by = new_circle.radius - circle.radius
    const animation_radius_step_size = changed_by / size_animation.steps

    let animated_radius = circle.radius

    const interval = setInterval(() => {
      animated_radius += animation_radius_step_size
      yandex_circle.geometry.setRadius(animated_radius)

      if (changed_by > 0 && animated_radius >= new_circle.radius) {
        clearInterval(interval)
        circle = new_circle
      }
      if (changed_by <= 0 && animated_radius <= new_circle.radius) {
        clearInterval(interval)
        circle = new_circle
      }
    }, size_animation.step_duration)
  }

  /// Circle size animation >>
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
      background: lightyellow;
    }
  }
</style>
