<template>
	<div class="home">
		<HeaderShayna/>
		<HeroSectionShayna/>
		<BannerShayna/>
		<InstaShayna/>
		<PatnerLogoShayna/>
		<FooterShayna/>
	</div>
</template>

<script>

/**
 * COMPONENT
 */
import HeaderShayna 		from '@/components/HeaderShayna.vue';
import HeroSectionShayna 	from '@/components/HeroSectionShayna.vue';
import BannerShayna 		from '@/components/BannerShayna.vue';
import InstaShayna 			from '@/components/InstaShayna.vue';
import PatnerLogoShayna		from '@/components/PatnerLogoShayna.vue';
import FooterShayna 		from '@/components/FooterShayna.vue'

/**
 * Library
 */


export default {
	name: 'Home',
	components: {
		/**
		 * COMPONENT
		 */
		HeaderShayna,
		HeroSectionShayna,
		BannerShayna,
		InstaShayna,
		PatnerLogoShayna,
		FooterShayna

		/**
		 * LIBRARY
		 */
		
	}
}
</script>