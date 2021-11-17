<script lang="ts">
  import { filters } from '$lib/index/stores/filters'
  import { get, readable, writable } from 'svelte/store'
  import { onMount } from 'svelte'

  // import { browser } from '$app/env'
  // import { get } from 'svelte/store'
  //
  // import Map from '$lib/index/filters/Map.svelte'
  // import { date_to_input_value } from '$lib/utils'
  // import { map_suggestions_store, yandex_maps as yandex_maps_store } from '$lib/stores/yandex_maps'
  // import { filters } from '$lib/stores/filters_local'
  //
  // let yandex_maps_api = null
  // yandex_maps_store.subscribe(v => {
  //   yandex_maps_api = v ?? null
  // })
  //
  // let date = date_to_input_value(new Date())
  // let address = 'lorem'
  // let radius = 5
  // let suggestions: [{ text: string, x: number, y: number }] = []
  //
  // const update_address = (new_address: string) => {
  //   address = new_address
  // }
  //
  // const update_suggestion_list = (new_suggestions: [{ text: string, x: number, y: number }]) => {
  //   suggestions = new_suggestions
  // }
  //
  // const apply_suggestion = (x: number, y: number) => {
  //   map_suggestions_store.set({ x, y })
  // }

  // $: console.log(get(filters))

  // if (browser) {
  //   console.log(localStorage.getItem('filters'))
  // } else {
  //   console.log(123)
  // }

  // console.log(get(filters))


  // const time = readable(new Date(), function start(set) {
  //   const interval = setInterval(() => {
  //     set(new Date())
  //   }, 10)
  //
  //   return function stop() {
  //     clearInterval(interval)
  //   }
  // })

</script>

<section class="filtering wrap">
  <div class="filter-wrp select-wrp">
    <div class="filter select-variant">
      <label for="lost">
        <input id="lost" type="radio" value="lost" name="lost-found" />
        Потеряные
      </label>
      <label for="found">
        <input id="found" type="radio" value="found" name="lost-found" />
        Найденые
      </label>
    </div>
  </div>
  <!--	<div class="filter-wrp select-wrp">-->
  <!--		<div class="filter select-variant">-->
  <!--			<label for="cat">-->
  <!--				<input id="cat" type="radio" value="dog" name="animal" />-->
  <!--				Собаки-->
  <!--			</label>-->
  <!--			<label for="dog">-->
  <!--				<input id="dog" type="radio" value="cat" name="animal" />-->
  <!--				Коты-->
  <!--			</label>-->
  <!--		</div>-->
  <!--	</div>-->
  <!--	<div class="filter-wrp date-picker-wrp">-->
  <!--		<div class="filter">-->
  <!--			<div class="date">-->
  <!--				<input type="date" id="when" value="{date}" />-->
  <!--			</div>-->
  <!--			<div class="days">-->
  <!--				+/-&nbsp;<input class="approx-days" type="number" max="90" min="0" value="5">&nbsp;дней-->
  <!--			</div>-->
  <!--		</div>-->
  <!--	</div>-->
  <!--	<div class="filter-wrp address-wrap">-->
  <!--		<ul class="suggestions">-->
  <!--			{#each suggestions as { text, x, y }, i}-->
  <!--				<li class="suggestion" on:click={() => apply_suggestion(x, y)}>{text}</li>-->
  <!--			{/each}-->
  <!--		</ul>-->
  <!--		<div class="filter">-->
  <!--			<div class="address-line-wrap" contenteditable="true">-->
  <!--				{address}-->
  <!--			</div>-->
  <!--			<div class="radius-wrap">-->
  <!--				<div class="icon-wrap">-->
  <!--					<svg aria-hidden="true" focusable="false"-->
  <!--							 class="icon"-->
  <!--							 role="img"-->
  <!--							 xmlns="http://www.w3.org/2000/svg"-->
  <!--							 viewBox="0 0 512 512">-->
  <!--						<path fill="currentColor"-->
  <!--									d="M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"></path>-->
  <!--					</svg>-->
  <!--				</div>-->
  <!--				<div class="radius-input-wrap">-->
  <!--					<input class="input" type="number" value="{radius}" max="50" min="0" /> км.-->
  <!--				</div>-->
  <!--			</div>-->
  <!--		</div>-->
  <!--	</div>-->
</section>
<!--<Map update_address={update_address} update_suggestions={update_suggestion_list} />-->

<style lang="scss">
  @import "../../../utils";

  .loader-wrap {
    @include outer-wrap;
    padding: 16px;
  }

  .wrap {
    @include outer-wrap;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 2fr;
    font-family: 'Prata', 'Times New Roman', serif;
    padding: 4px;
    border-bottom: 4px double black;

    .filter-wrp {
      display: grid;
      grid-template-columns: 1fr;
      justify-items: center;
      align-items: center;
      //background: cyan;
      padding: 6px;
      border-right: 3px double black;

      &:last-child {
        border-right: none;
      }

      .filter {
        //background: red;
      }

      input[type='radio'] {
        padding: 0;
        margin: 0;
      }

      .approx-days {
        width: 36px;
      }
    }

    .select-wrp {
      .filter.select-variant {
        display: grid;

        label {
          white-space: nowrap;
        }
      }
    }

    .date-picker-wrp {
      display: grid;
    }

    .address-wrap {
      position: relative;
      overflow: visible;

      .suggestions {
        position: absolute;
        background: white;
        width: calc(100% + 3px);
        top: 100%;
        z-index: 1;
        border-left: 3px double black;
        margin: 0 0 0 -3px;
        padding: 6px;
        box-sizing: border-box;
        list-style: none;

        .suggestion {
          padding: 5px;
          border-top: 1px solid lightgray;
        }
      }

      .address-line-wrap {
        display: inline-block;
      }

      .radius-wrap {
        white-space: nowrap;

        .icon-wrap {
          display: inline-block;

          .icon {
            width: 20px;
            transform: translate(-1px, 4.5px);
          }
        }

        .radius-input-wrap {
          display: inline-block;

          .input {
            width: 36px;
          }
        }
      }
    }
  }
</style>
