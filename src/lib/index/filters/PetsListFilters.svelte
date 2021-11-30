<script lang="ts">
  import { filters } from '$lib/index/stores/filters'
  import Map from '$lib/index/filters/Map.svelte'
  import { ymaps_api } from '$lib/stores/ymaps_api'
  import { suggestion } from '$lib/index/stores/suggestion'

  let { announcement_type, animal, when, map } = $filters.filters

  const update_announcement_type = (e) => filters.update_announcement_type(e.target.value)
  const update_animal = (e) => filters.update_animal(e.target.value)
  const update_when_date = (e) => {
    const x = e.target.value.split('-')
    filters.update_when_date(x[0], x[1], x[2])
  }
  const update_when_roughly = (e) => filters.update_when_roughly(parseInt(e.target.value))
  const update_radius = (e) => filters.update_circle_radius(Math.floor(e.target.value * 1000))

  /// <<< Handle address suggestions
  let address: string
  const store_address = (e) => (address = e.target.innerHTML)
  const restore_address = () => filters.update_address(address)

  let suggestions: { text: string; lat: number; lng: number }[] = []
  let suggestionsDebounce: NodeJS.Timer
  const show_suggestions = (e: any) => {
    clearTimeout(suggestionsDebounce)
    suggestionsDebounce = setTimeout(() => {
      $ymaps_api.api.geocode(e.target.innerHTML).then(function (res: any) {
        suggestions = []
        for (let i = 0; i < res.metaData.geocoder.found; i++) {
          const obj = res.geoObjects.get(i)
          const coords = obj.geometry.getCoordinates()
          suggestions.push({ text: obj.properties.get('text'), lat: coords[0], lng: coords[1] })
        }
      })
    }, 400)
  }
  const clear_suggestions = () => {
    suggestions = []
  }
  /// >>>
</script>

<section class="filtering wrap">
  <div class="filter-wrp select-wrp">
    <div class="filter select-variant">
      <label for="lost">
        <input
          id="lost"
          type="radio"
          value="lost"
          name="lost-found"
          bind:group={announcement_type}
          on:change={update_announcement_type}
        />
        Потеряные
      </label>
      <label for="found">
        <input
          id="found"
          type="radio"
          value="found"
          name="lost-found"
          bind:group={announcement_type}
          on:change={update_announcement_type}
        />
        Найденые
      </label>
    </div>
  </div>
  <div class="filter-wrp select-wrp">
    <div class="filter select-variant">
      <label for="cat">
        <input
          id="cat"
          type="radio"
          value="dog"
          name="animal"
          bind:group={animal}
          on:change={update_animal}
        />
        Собаки
      </label>
      <label for="dog">
        <input
          id="dog"
          type="radio"
          value="cat"
          name="animal"
          bind:group={animal}
          on:change={update_animal}
        />
        Коты
      </label>
    </div>
  </div>
  <div class="filter-wrp date-picker-wrp">
    <div class="filter">
      <div class="date">
        <input
          type="date"
          id="when"
          value="{when.y}-{when.m}-{when.d}"
          on:change={update_when_date}
        />
      </div>
      <div class="days">
        +/-&nbsp;<input
          class="approx-days"
          type="number"
          max="90"
          min="0"
          value={when.roughly}
          on:change={update_when_roughly}
        />&nbsp;дней
      </div>
    </div>
  </div>
  <div class="filter-wrp address-wrp">
    {#if suggestions.length > 0}
      <ul class="suggestions">
        {#each suggestions as { text, lat, lng }}
          <li
            class="suggestion"
            on:click={() => {
              suggestion.set({ address: text, lat, lng })
              clear_suggestions()
            }}
          >
            {text}
          </li>
        {/each}
      </ul>
    {/if}

    <div class="filter">
      <div
        class="address-line-wrap"
        contenteditable="true"
        bind:innerHTML={$filters.filters.map.address}
        on:focus={store_address}
        on:focusout={restore_address}
        on:input={show_suggestions}
      />
      <div class="radius-wrap">
        <div class="icon-wrap">
          <svg
            aria-hidden="true"
            focusable="false"
            class="icon"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"
            />
          </svg>
        </div>
        <div class="radius-input-wrap">
          <input
            class="input"
            type="number"
            value={map.circle.radius / 1000}
            max="50"
            min="0.5"
            step="0.5"
            on:change={update_radius}
          /> км.
        </div>
      </div>
    </div>
  </div>
</section>
<Map />

<!--  update_address={update_address} update_suggestions={update_suggestion_list} -->
<style lang="scss">
  @import '../../../utils';

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

    .address-wrp {
      position: relative;
      overflow: visible;
      justify-items: left;

      .filter {
        padding: 6px;
        width: 100%;
      }

      .suggestions {
        position: absolute;
        background: white;
        width: calc(100% + 3px);
        top: 100%;
        z-index: 1;
        border-left: 3px double black;
        border-bottom: 3px double black;
        margin: 0 0 0 -3px;
        padding: 6px;
        box-sizing: border-box;
        list-style: none;

        .suggestion {
          padding: 6px;
          border-top: 1px solid lightgray;
          cursor: default;

          &:hover {
            background: lightyellow;
          }
        }
      }

      .address-line-wrap {
        display: inline-block;
        width: 100%;
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
            width: 42px;
          }
        }
      }
    }
  }
</style>
