<template>
    <div class="product">
        <HeaderPemuda v-bind:webInformation="webInformation" />
        <!-- Breadcrumb Section Begin -->
        <div class="breacrumb-section text-left">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb-text product-more">
                            <router-link to="/">
                                <i class="fa fa-home"></i> Home
                            </router-link>
                            <span>
                                Detail >
                                <b>{{ product.slug }}</b>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb Section Begin -->
        <!-- Product Shop Section Begin -->

        <section class="product-shop spad page-details">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="product-pic-zoom">
                                    <img class="product-big-img" v-bind:src="gambarDefault" alt />
                                </div>
                                <div class="product-thumbs" v-if="product.galleries.length > 0">
                                    <carousel
                                        class="product-thumbs-track ps-slider"
                                        :dots="false"
                                        :nav="false"
                                        :margin="15"
                                    >
                                        <div
                                            v-for="thumb in product.galleries"
                                            v-bind:key="thumb.id"
                                            class="pt"
                                            v-on:click="changeImage(thumb.photo)"
                                            v-bind:class="(thumb.photo == gambarDefault) ? 'active' : '' "
                                        >
                                            <img v-bind:src="thumb.photo" alt />
                                        </div>
                                    </carousel>
                                </div>
                                <div v-else>Foto produk tidak ada</div>
                            </div>
                            <div class="col-lg-6">
                                <div class="product-details text-left">
                                    <div class="pd-title">
                                        <span>{{ product.type }}</span>
                                        <h3>{{ product.name }}</h3>
                                    </div>
                                    <div class="pd-desc">
                                        <p v-html="product.description"></p>
                                        <h4>{{idrPrice}}</h4>
                                    </div>
                                    <div class="quantity">
                                        <router-link to="/cart">
                                            <button
                                                class="primary-btn pd-cart"
                                                v-on:click="addCart(product)"
                                            >Add To Cart</button>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Product Shop Section End -->
        <RelatedProductPemuda v-bind:typeProduct="product.type" />
        <FooterPemuda v-bind:webInformation="webInformation" />
    </div>
</template>

<script>
import HeaderPemuda from "@/components/HeaderPemuda.vue";
import RelatedProductPemuda from "@/components/RelatedProductPemuda.vue";
import FooterPemuda from "@/components/FooterPemuda.vue";

/**
 * LIBRARY
 */
import axios from "@/instance/axios.js";
import idrCurreny from "@/instance/idrCurrency.js";

import carousel from "vue-owl-carousel";

export default {
    name: "ProductDetail",
    components: {
        HeaderPemuda,
        RelatedProductPemuda,
        FooterPemuda,

        /**
         * Library
         */
        carousel
    },
    data: function() {
        return {
            gambarDefault: "",
            product: [],
            userCart: [],
            webInformation: []
        };
    },
    methods: {
        changeImage(urlImage) {
            this.gambarDefault = urlImage;
        },
        setDataPicture(data) {
            this.product = data;
            this.gambarDefault = data.galleries[0].photo;
        },
        addCart(product) {
            let productStored = {
                id: product.id,
                name: product.name,
                price: product.price,
                photo: product.galleries[0].photo
            };

            this.userCart.push(productStored);
            const parsed = JSON.stringify(this.userCart);
            localStorage.setItem("userCart", parsed);
        }
    },
    computed: {
        idrPrice() {
            return idrCurreny.convert(this.product.price);
        },
        typeProduct() {
            return this.product.type;
        }
    },
    mounted() {
        if (localStorage.getItem("userCart")) {
            try {
                this.userCart = JSON.parse(localStorage.getItem("userCart"));
            } catch (e) {
                localStorage.removeItem("useCart");
            }
        }
        axios.instance
            .get("products", {
                params: {
                    slug: this.$route.params.slug
                }
            })
            .then(res => {
                this.setDataPicture(res.data.data);
            })
            .catch(err => console.log(err));

        axios.instance
            .get("app")
            .then(res => {
                this.webInformation = res.data.data;
            })
            .catch(err => console.log(err));
    },
    watch: {
        "$route.params.slug": function() {
            axios.instance
                .get("products", {
                    params: {
                        slug: this.$route.params.slug
                    }
                })
                .then(res => {
                    this.setDataPicture(res.data.data);
                })
                .catch(err => console.log(err));

            document.title =
                this.$route.meta.title + " | " + this.$route.params.slug;
        }
    }
};
</script>

<style>
</style>