<template>
    <div class="home">
        <HeaderShayna v-bind:webInformation="webInformation" />
        <HeroSectionShayna />
        <BannerShayna />
        <InstaShayna />
        <PatnerLogoShayna />
        <FooterShayna v-bind:webInformation="webInformation" />
    </div>
</template>

<script>
/**
 * COMPONENT
 */
import HeaderShayna from "@/components/HeaderShayna.vue";
import HeroSectionShayna from "@/components/HeroSectionShayna.vue";
import BannerShayna from "@/components/BannerShayna.vue";
import InstaShayna from "@/components/InstaShayna.vue";
import PatnerLogoShayna from "@/components/PatnerLogoShayna.vue";
import FooterShayna from "@/components/FooterShayna.vue";

/**
 * Library
 */
import axios from "@/instance/axios.js";

export default {
    name: "Home",
    data() {
        return {
            webInformation: []
        };
    },
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
    },

    mounted() {
        axios.instance
            .get("app")
            .then(res => (this.webInformation = res.data.data));
    }
};
</script>