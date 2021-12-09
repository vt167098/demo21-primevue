<template>
	<!-- component -->
	<div>
		<nav class="px-4 flex justify-between h-12 border-b-2 bg-blue-400">

			<!-- top bar left -->
			<ul class="flex items-center">
				<!-- add button -->
				<li class="h-10 w-13">
					<img
						class="h-full w-full mx-auto"
						src="/images/gfclogo-512x512.png"
						alt="gfc logo" />
				</li>
			</ul>

			<ul class="flex items-center">
				<!-- add button -->
				<li>
					<h1 class="pl-10 lg:pl-0 text-white">demo21-primevue</h1>
				</li>
			</ul>

			<!-- to bar right  -->
			<ul class="flex items-center">

				<li class="h-10 w-10">
					<img
						class="h-full w-full rounded-full mx-auto"
						src="http://192.6.3.8/gfcbmp/0.bmp"
						alt="gfc employee" />
				</li>

			</ul>

		</nav>
	</div>
</template>

<script>
	export default {
		name: "AppHeader",
		setup () {
			
		}
	}
</script>

<style>
</style>
