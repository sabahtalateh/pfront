<script lang="ts">
	import PetsList from '$lib/PetsList.svelte'
	import PetsListFilters from '$lib/index/filters/PetsListFilters.svelte'
	import { set_yandex_maps } from '$lib/stores/yandex_maps'
	import { onMount } from 'svelte'
  import Header from '$lib/SiteHeader.svelte'
  import { init_filters } from '$lib/index/stores/filters'

	onMount(() => {
    init_filters()
		window.ymaps.ready(set_yandex_maps)
	})
</script>

<svelte:head>
	<title>Поиск животных</title>

	<script
		src="https://api-maps.yandex.ru/2.1/?apikey=c6d6e7f0-7277-45a2-9131-5692f31a1652&amp;lang=ru_RU"
		type="text/javascript">
	</script>
</svelte:head>

<Header />
<PetsListFilters />
<!--<PetsList />-->
