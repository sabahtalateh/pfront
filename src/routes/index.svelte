<svelte:head>
	<title>Поиск животных</title>

	<!--	<script-->
	<!--		src="https://api-maps.yandex.ru/2.1/?apikey=c6d6e7f0-7277-45a2-9131-5692f31a1652&amp;lang=ru_RU"-->
	<!--		type="text/javascript">-->
	<!--	</script>-->
</svelte:head>

<script lang="ts">
  import PetsList from '$lib/PetsList.svelte'
  import PetsListFilters from '$lib/index/filters/PetsListFilters.svelte'
  import { set_yandex_maps } from '$lib/stores/yandex_maps'
  import { onMount } from 'svelte'
  import Header from '$lib/SiteHeader.svelte'
  import { filters, load_filters } from '$lib/index/stores/filters'
  import { writable } from 'svelte/store'
  import { fade } from 'svelte/transition'

  onMount(() => {
    load_filters()
    // window.ymaps.ready(set_yandex_maps)
  })

  /// Page loading timer to show loader only if loading time greater then 100ms (to prevent blinking)
  /// Interval is required here, same effect can be achieved with delay property of fade
  ///  because faded element will be added to DOM right after creation
  let interval
  const loader_transition_duration = 150
  const show_loader_after = 200
  const loading_started_at = +new Date()

  const page_loading_time = writable(0, function start(set) {
    interval = setInterval(() => {
      set(new Date() - loading_started_at)
    }, 100)
  })

  filters.subscribe(x => {
    if (x.load === 'loaded') {
      clearInterval(interval)
    }
  })

  let loader_visible = false
  $: page_loaded = $filters.load === 'loaded'
  /// END
</script>

{#if ($filters.load === 'loading')}
	{#if $page_loading_time > show_loader_after}
		<h1
			transition:fade={{duration: loader_transition_duration}}
			on:introstart={() => loader_visible = true}
			on:outroend={() => {page_loaded = true; loader_visible = false}}
		>loading</h1>
	{/if}
{/if}

{#if page_loaded && !loader_visible}
	<div transition:fade={{duration: loader_transition_duration}}>
		<Header />
		<PetsListFilters />
		<PetsList />
	</div>
{/if}
