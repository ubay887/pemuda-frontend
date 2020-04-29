<template>
    <!-- Related Products Section End -->
    <div class="related-products spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title">
                        <h2>Related Products</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3 col-sm-6" v-for="product in relatedProduct" :key="product.id">
                    <div class="product-item">
                        <div class="pi-pic">
                            <img
                                :src="product.galleries[0].photo"
                                style="height:400px; object-fit:cover"
                            />
                            <ul>
                                <li class="w-icon active">
                                    <a href="#" @click="addCart(product)">
                                        <i class="icon_bag_alt"></i>
                                    </a>
                                </li>
                                <li class="quick-view">
                                    <router-link
                                        :to="{name:'ProductDetail',params:{slug: product.slug}}"
                                    >+ Quick View</router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="pi-text">
                            <div class="catagory-name">{{product.type}}</div>
                            <a href="#">
                                <h5>{{product.name}}</h5>
                            </a>
                            <div class="product-price">{{idrPrice(product.price)}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Related Products Section End -->
</template>

<script>
import axios from "@/instance/axios.js";
import idrCurrency from "@/instance/idrCurrency.js";

export default {
    name: "RelatedProductShayna",
    data() {
        return {
            relatedProduct: [],
            userCart: []
        };
    },
    methods: {
        productType() {
            return this.typeProduct.split(",", 1)[0];
        },
        idrPrice(value) {
            return idrCurrency.convert(value);
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

            window.location.reload();
        }
    },
    mounted() {
        this.productType();
        axios.instance
            .get("products", {
                params: { type: this.productType() }
            })
            .then(res => (this.relatedProduct = res.data.data.data));
    },
    props: ["typeProduct"]
};
</script>