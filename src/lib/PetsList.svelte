<div class="wrap">
	<div class="item">
		<div class="box">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate dolorum error
			fugit incidunt non quibusdam quis ullam? At explicabo illo, laudantium libero magni maiores
			odio ratione similique? Aperiam at autem dignissimos dolores fuga id impedit nemo non,
			obcaecati qui saepe sed sit suscipit tempore tenetur! Ab, in, maxime molestiae non obcaecati,
			officia porro quasi quis quisquam sit soluta voluptatem? Asperiores aspernatur cum cupiditate
			debitis esse et molestias quo sint veritatis voluptate. Accusantium asperiores atque
			cupiditate, deleniti eum expedita fugiat nemo quibusdam quisquam repellat suscipit voluptatem!
			Accusantium, debitis distinctio, eligendi nam nemo nisi perferendis porro quidem quos, unde ut
			voluptatum!
		</div>
	</div>
	<div class="item">
		<div class="box">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab alias amet animi asperiores
			aspernatur at aut beatae consequatur consequuntur cum dolores doloribus eligendi
			exercitationem explicabo harum itaque laboriosam laudantium maxime minus nihil nostrum nulla
			numquam omnis perspiciatis placeat praesentium qui quos rem reprehenderit similique soluta, ut
			vel vero vitae.
		</div>
	</div>
	<div class="item">
		<div class="box">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi corporis dolorem eveniet
			exercitationem, minus officia perspiciatis quasi repellat velit voluptatum. Aliquam laboriosam
			odio qui quibusdam! Commodi perspiciatis possimus reiciendis veritatis.
		</div>
	</div>
	<div class="item">
		<div class="box">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur at, consequuntur dicta
			dolorem eum iste iure nulla quod sequi voluptate.
		</div>
	</div>
	<div class="item">
		<div class="box">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur fuga mollitia odit vel?
			Aperiam libero mollitia odio officia quaerat sit. Ad adipisci alias aperiam corporis cumque
			cupiditate dicta distinctio dolor dolore error eum ex fugit illum in magni nesciunt placeat
			ratione reiciendis, reprehenderit saepe sed unde voluptatibus. Amet asperiores assumenda
			deserunt dolore doloremque et inventore nisi ratione tempora vitae? Aliquid consequuntur id
			magni maiores modi! Architecto doloribus ea excepturi id incidunt natus nemo, pariatur vitae.
			Amet consequuntur dolores eius esse expedita, nihil perferendis, quia quo quod repudiandae
			unde voluptas?
		</div>
	</div>
	<div class="item">
		<div class="box">2</div>
	</div>
	<div class="item">
		<div class="box">3</div>
	</div>
</div>

<style>
	.wrap {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		grid-column-gap: 0.5rem;
		overflow: hidden;
		position: relative;
		max-width: 1200px;
		margin: auto;
	}

	.item {
		/*box-sizing: border-box;*/
		position: relative;

		/*background: cyan;*/
	}

	.item:before {
		content: '';
		position: absolute;
		top: 0;
		right: -0.25rem; /* Half the gap */
		height: 100vh; /* Big height*/
		width: 1px;
		background: lightgray;
	}

	.box {
		margin: 0.5rem;

		/*background-color: pink;*/
	}
</style>
