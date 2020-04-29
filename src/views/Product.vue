<template>
    <div class="product">
        <HeaderPemuda :webInformation="webInformation" />
        <div class="container mb-5">
            <div class="row">
                <div
                    class="col-lg-4 col-sm-12 col-md-6 mb-sm-5 d-sm-flex justify-content-sm-center justify-content-md-start"
                >
                    <div class="card" style="width: 18rem;">
                        <ul class="list-group list-group-flush">
                            <li
                                class="list-group-item bg-warning text-light font-weight-bold"
                            >Filter Produk</li>
                            <li class="list-group-item text-left">
                                Category
                                <div class="pt-3">
                                    <div class="form-check form-check-inline">
                                        <input
                                            class="form-check-input"
                                            type="radio"
                                            name="type"
                                            id="pria"
                                            value="pria"
                                            v-model.trim="filterProduct.type"
                                        />
                                        <label class="form-check-label" for="pria">Pria</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input
                                            class="form-check-input"
                                            type="radio"
                                            name="type"
                                            id="wanita"
                                            value="wanita"
                                            v-model.trim="filterProduct.type"
                                        />
                                        <label class="form-check-label" for="wanita">Wanita</label>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item text-left">
                                Jangka Harga Produk
                                <div class="pt-3">
                                    <div class="form-group">
                                        <label for="formGroupExampleInput">Dari Harga</label>
                                        <input
                                            type="number"
                                            class="form-control"
                                            id="formGroupExampleInput"
                                            placeholder="200000"
                                            v-model.number="filterProduct.price_from"
                                            @blur="setFilter()"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="formGroupExampleInput">Sampai Harga</label>
                                        <input
                                            type="number"
                                            class="form-control"
                                            id="formGroupExampleInput"
                                            placeholder="500000"
                                            v-model.number="filterProduct.price_to"
                                            @blur="setFilter()"
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    class="col-lg-8 col-sm-12 d-sm-flex col-md-6 justify-content-sm-center justify-content-md-start"
                >
                    <div
                        class="col-6 col-md-12 col-lg-4"
                        data-aos="fade-left"
                        data-aos-duration="500"
                        v-for="product in products"
                        v-bind:key="product.id"
                    >
                        <div class="product-item">
                            <div class="pi-pic">
                                <img
                                    v-bind:src="product.galleries[0].photo"
                                    style="height: 330px; object-fit: cover;"
                                />
                                <ul>
                                    <li class="w-icon active">
                                        <a href="#" v-on:click="addCart(product)">
                                            <i class="icon_bag_alt"></i>
                                        </a>
                                    </li>
                                    <li class="quick-view">
                                        <router-link
                                            v-bind:to="'/product/detail/'+product.slug"
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
                    </div>
                    <transition name="component-fade" mode="out-in">Produk tidak ada</transition>
                </div>
                <paginate :total="totalProduct" :perPage="dataPerPage" class="offset-4" />
            </div>
        </div>
        <FooterPemuda :webInformation="webInformation" />
    </div>
</template>

<script>
import HeaderPemuda from "@/components/HeaderPemuda.vue";

import Paginate from "@/components/Paginate.vue";
import FooterPemuda from "@/components/FooterPemuda.vue";

/**
 * LIBRARY
 */
import idrCurrency from "@/instance/idrCurrency.js";

import axios from "@/instance/axios.js";
import aos from "aos";
import "aos/dist/aos.css";
export default {
    name: "Product",
    components: {
        HeaderPemuda,
        Paginate,
        FooterPemuda
    },
    data() {
        return {
            userCart: [],
            webInformation: [],
            filterProduct: {
                name: this.$route.params.search || "",
                type: "",
                price_from: "",
                price_to: "",
                page: this.$route.params.page || 1
            },
            products: [],
            totalProduct: "",
            dataPerPage: ""
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

            window.location.reload;
        },

        formatPrice(price) {
            return idrCurrency.convert(price);
        },

        setFilter() {
            axios.instance
                .get("products", {
                    params: {
                        name: this.filterProduct.name,
                        type: this.filterProduct.type,
                        price_from: this.filterProduct.price_from,
                        price_to: this.filterProduct.price_to,
                        page: this.filterProduct.page
                    }
                })
                .then(res => {
                    this.products = res.data.data.data;
                    this.totalProduct = res.data.data.total;
                    this.dataPerPage = res.data.data.per_page;
                })
                .catch(err => console.log(err));
        }
    },
    mounted() {
        aos.init();
        /**
         * Request to get app information from server
         */
        axios.instance
            .get("app")
            .then(res => {
                this.webInformation = res.data.data;
            })
            .catch(err => console.log(err));

        /**
         * so run setFilter Method
         */
        this.setFilter();
    },
    watch: {
        /**
         * Watching a filterProduct property type
         * if changes run setFilter function
         */
        "filterProduct.type": "setFilter",

        /**
         * Watching a search parameter if changed
         * run function below
         * changes property name in filterProduct Object
         * and run request to get api with setFilter function
         */
        "$route.params.search": function(searchParams) {
            this.filterProduct.name = searchParams;
            return this.setFilter();
        },
        "$route.params.page": function(page) {
            this.filterProduct.page = page;
            return this.setFilter();
        }
    }
};
</script>
<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>