<template>
    <div class="product">
        <HeaderPemuda :webInformation="webInformation" />
        <div class="container mb-5">
            <div class="row">
                <div class="col-lg-4">
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
                <div class="col-lg-8" v-if="products.length > 0">
                    <div class="col-4" v-for="product in products" v-bind:key="product.id">
                        <div class="product-item">
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
                                            v-bind:to="'/product/'+product.slug"
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
                </div>
                <div class="col" v-else>
                    <div class="text-center">Data Produk Tidak Tersedia</div>
                </div>
            </div>
        </div>
        <FooterPemuda :webInformation="webInformation" />
    </div>
</template>

<script>
import HeaderPemuda from "@/components/HeaderPemuda.vue";

import FooterPemuda from "@/components/FooterPemuda.vue";

/**
 * LIBRARY
 */
import idrCurrency from "@/instance/idrCurrency.js";

import axios from "@/instance/axios.js";
export default {
    name: "Product",
    components: {
        HeaderPemuda,
        FooterPemuda
    },
    data() {
        return {
            userCart: [],
            webInformation: [],
            filterProduct: {
                type: "",
                price_from: "",
                price_to: ""
            },
            products: []
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
                        type: this.filterProduct.type,
                        price_from: this.filterProduct.price_from,
                        price_to: this.filterProduct.price_to
                    }
                })
                .then(res => {
                    this.products = res.data.data.data;
                })
                .catch(err => console.log(err));
        }
    },
    mounted() {
        axios.instance
            .get("app")
            .then(res => {
                this.webInformation = res.data.data;
            })
            .catch(err => console.log(err));
        axios.instance
            .get("products")
            .then(res => {
                this.products = res.data.data.data;
            })
            .catch(err => console.log(err));
    },
    watch: {
        "filterProduct.type": "setFilter"
    }
};
</script>