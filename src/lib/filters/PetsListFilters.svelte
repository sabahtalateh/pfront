<script lang="ts">
  import Map from '$lib/filters/Map.svelte'
  import { date_to_date_input_value } from '$lib/utils'

  const today = date_to_date_input_value(new Date())
  let address = 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem'

  const update_address = (new_address: string) => {
    address = new_address
  }
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
	<div class="filter-wrp select-wrp">
		<div class="filter select-variant">
			<label for="cat">
				<input id="cat" type="radio" value="dog" name="animal" />
				Собаки
			</label>
			<label for="dog">
				<input id="dog" type="radio" value="cat" name="animal" />
				Коты
			</label>
		</div>
	</div>
	<div class="filter-wrp date-picker-wrp">
		<div class="filter">
			<div class="date">
				<input type="date" id="when" placeholder="{today}" />
			</div>
			<div class="days">
				+/-&nbsp;<input class="approx-days" type="number" max="50" value="5">&nbsp;дней
			</div>
		</div>
	</div>
	<div class="filter-wrp address-wrap">
		<div class="filter">
					<div class="address-line-wrap">
						{address}
					</div>
					<div class="radius-wrap">
						<div class="icon-wrap">
							<svg aria-hidden="true" focusable="false"
									 class="icon"
									 role="img"
									 xmlns="http://www.w3.org/2000/svg"
									 viewBox="0 0 512 512">
								<path fill="currentColor"
											d="M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"></path>
							</svg>
						</div>
						<div class="radius-input-wrap">
							<input type="number" />
						</div>
					</div>
<!--			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium enim facere magnam rerum? Blanditiis commodi-->
<!--			consequatur cumque dignissimos, in ipsum magni officiis quas quod voluptate? Architecto consequatur eum-->
<!--			perferendis quo.-->
		</div>
		<!--		<div class="address-line-wrap">-->
		<!--			{address}-->
		<!--		</div>-->
		<!--		<div class="radius-wrap">-->
		<!--			<div class="icon-wrap">-->
		<!--				<svg aria-hidden="true" focusable="false"-->
		<!--						 class="icon"-->
		<!--						 role="img"-->
		<!--						 xmlns="http://www.w3.org/2000/svg"-->
		<!--						 viewBox="0 0 512 512">-->
		<!--					<path fill="currentColor"-->
		<!--								d="M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"></path>-->
		<!--				</svg>-->
		<!--			</div>-->
		<!--			<div class="radius-input-wrap">-->
		<!--				<input type="number" />-->
		<!--			</div>-->
		<!--		</div>-->
	</div>
</section>
<Map update_address={update_address} />

<style lang="scss">
  @import "src/utils";

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
      .date, .days {
        display: inline-block;
      }
    }

    .address-wrap {
      //max-width: 40%;

      .address-line-wrap {
        display: inline-block;
      }

      .radius-wrap {
        //display: inline-block;

        .icon-wrap {
          display: inline-block;
          //margin-top: 10px;
          .icon {
            width: 20px;


          }
        }

        .radius-input-wrap {
          display: inline-block;
          //margin-top: -10px;
        }
      }
    }
  }
</style>
