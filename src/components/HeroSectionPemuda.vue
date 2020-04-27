<template>
    <section class="hero-section" v-if="heroData.length > 0">
        <carousel class="hero-items" :items="1" :nav="false">
            <!-- class="single-hero-items set-bg" -->
            <div
                class="single-hero-items set-bg"
                v-for="hero in heroData"
                v-bind:key="hero.id"
                v-bind:style="{background: 'url('+hero.background+')'}"
            >
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5">
                            <span>{{hero.type}}</span>
                            <h1>{{hero.title}}</h1>
                            <p v-html="hero.description"></p>
                            <a href="#" class="primary-btn">Belanja Sekarang</a>
                        </div>
                    </div>
                </div>
            </div>
        </carousel>
    </section>
    <section v-else>Tidak ada landing Page</section>
</template>

<script>
import carousel from "vue-owl-carousel";
import axios from "@/instance/axios.js";

export default {
    name: "HeroSectionShayna",
    components: {
        carousel
    },
    data() {
        return {
            heroData: []
        };
    },
    mounted() {
        axios.instance
            .get("hero-app")
            .then(res => (this.heroData = res.data.data));
    }
};
</script>
