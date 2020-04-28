<template>
    <!-- Women Banner Section Begin -->
    <section class="women-banner spad">
        <div class="container-fluid">
            <div class="d-flex justify-content-start mt-5">
                <div class="w-25 text-left title-product">
                    <span>Produk</span>
                    {{type}}
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 mt-4" v-if="products.length > 0">
                    <carousel
                        class="product-slider"
                        id="carousel"
                        :item="10"
                        :nav="false"
                        :autoplay="true"
                        :margin="25"
                        :dots="false"
                        :autoWidth="true"
                    >
                        <div
                            class="product-item"
                            v-for="product in products"
                            v-bind:key="product.id"
                        >
                            <div class="pi-pic">
                                <img v-bind:src="product.galleries[0].photo" alt />
                                <ul>
                                    <li class="w-icon active">
                                        <a href="#" v-on:click="addCart(product)">
                                            <i class="icon_bag_alt"></i>
                                        </a>
                                    </li>
                                    <li class="quick-view">
                                        <router-link
                                            v-bind:to="'/product/Detail/'+product.slug"
                                        >+ Quick View</router-link>
                                    </li>
                                </ul>
                            </div>
                            <div class="pi-text">
                                <div class="catagory-name">{{ product.type }}</div>
                                <a href="#">
                                    <h5>{{ product.name }}</h5>
                                </a>
                                <div class="product-price">{{ formatPrice(product.price) }}</div>
                            </div>
                        </div>
                    </carousel>
                </div>
                <div class="col-lg-12 mt-5" v-else>
                    <h2>Tidak ada produk</h2>
                </div>
            </div>
        </div>
    </section>
    <!-- Women Banner Section End -->
</template>

<script>
import carousel from "vue-owl-carousel";

import axios from "@/instance/axios.js";
import idrCurrency from "@/instance/idrCurrency.js";

export default {
    name: "BannerShayna",
    components: {
        carousel
    },
    data() {
        return {
            products: [],
            userCart: []
        };
    },
    methods: {
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

            window.location.reload();
        },
        formatPrice(price) {
            return idrCurrency.convert(price);
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
                    limit: 10,
                    type: this.type
                }
            })
            .then(res => (this.products = res.data.data.data))
            .catch(err => console.log(err));
    },
    props: ["type"]
};
</script>

<style scoped>
.product-item {
    width: 250px;
}

.pi-pic img {
    height: 300px;
    object-fit: cover;
}

.title-product {
    font-size: 1.8em;
}
.title-product span {
    background: rgb(231, 171, 60);
    font-weight: bold;
    color: white;
    padding: 10px 50px 10px 10px;
    border-bottom-right-radius: 50px;
}
</style>