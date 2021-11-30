<script lang="ts">
  import PetsList from '$lib/PetsList.svelte'
  import PetsListFilters from '$lib/index/filters/PetsListFilters.svelte'
  import { set_ymaps_api, ymaps_api } from '$lib/stores/ymaps_api'
  import { onMount } from 'svelte'
  import Header from '$lib/SiteHeader.svelte'
  import { filters, load_filters } from '$lib/index/stores/filters'
  import { readable } from 'svelte/store'
  import { fade } from 'svelte/transition'

  onMount(() => {
    load_filters()
    window.ymaps.ready(set_ymaps_api)
  })

  /// Page loading timer to show loader only if loading time greater
  //   then ${show_loader_after}ms (to prevent blinking)
  /// Interval is required here, same effect can't be achieved with delayed fade
  ///  because faded element will be added to DOM right after creation
  let interval: NodeJS.Timer
  const loader_transition_duration = 150
  const show_loader_after = 200
  const loading_started_at = +new Date()

  const page_loading_time = readable(0, function start(set) {
    interval = setInterval(() => {
      set(+new Date() - loading_started_at)
    }, 100)
  })

  $: stores_loaded = $filters.load === 'loaded' && $ymaps_api.load === 'loaded'
  $: stores_loaded && clearInterval(interval)

  let loader_visible = false
  let loader_been_shown = false
  /// END
</script>

<svelte:head>
  <title>Поиск животных</title>

  <script
    src="https://api-maps.yandex.ru/2.1/?apikey=c6d6e7f0-7277-45a2-9131-5692f31a1652&amp;lang=ru_RU"
    type="text/javascript">
  </script>
</svelte:head>

{#if !stores_loaded}
  {#if $page_loading_time > show_loader_after}
    <h1
      transition:fade={{ duration: loader_transition_duration }}
      on:introstart={() => {
        loader_visible = true
        loader_been_shown = true
      }}
      on:outroend={() => {
        stores_loaded = true
        loader_visible = false
      }}
    >
      loading
    </h1>
  {/if}
{/if}

{#if stores_loaded && !loader_visible}
  <div transition:fade={{ duration: loader_been_shown ? loader_transition_duration : 0 }}>
    <Header />
    <PetsListFilters />
    <PetsList />
  </div>
{/if}
