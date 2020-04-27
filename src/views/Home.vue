<template>
    <div class="home">
        <HeaderPemuda v-bind:webInformation="webInformation" />
        <HeroSectionPemuda />
        <BannerPemuda />
        <InstaPemuda />
        <PatnerLogoPemuda />
        <FooterPemuda v-bind:webInformation="webInformation" />
    </div>
</template>

<script>
/**
 * COMPONENT
 */
import HeaderPemuda from "@/components/HeaderPemuda.vue";
import HeroSectionPemuda from "@/components/HeroSectionPemuda.vue";
import BannerPemuda from "@/components/BannerPemuda.vue";
import InstaPemuda from "@/components/InstaPemuda.vue";
import PatnerLogoPemuda from "@/components/PatnerLogoPemuda.vue";
import FooterPemuda from "@/components/FooterPemuda.vue";

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
        HeaderPemuda,
        HeroSectionPemuda,
        BannerPemuda,
        InstaPemuda,
        PatnerLogoPemuda,
        FooterPemuda

        /**
         * LIBRARY
         */
    },

    mounted() {
        axios.instance
            .get("app")
            .then(res => (this.webInformation = res.data.data));
        console.log(process.env.VUE_APP_NAME);
    }
};
</script>