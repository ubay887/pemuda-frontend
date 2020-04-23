<template>
	<!-- Women Banner Section Begin -->
    <section class="women-banner spad">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mt-5" v-if="products.length > 0">
                    <carousel class="product-slider" id='carousel' :item='3' :nav='false' :autoplay="true" :margin="25" :dots="false">
						
                        <div class="product-item" v-for="product in products" v-bind:key="product.id">
                            <div class="pi-pic">
                                <img v-bind:src="product.galleries[0].photo" alt="" />
                                <ul>
                                    <li class="w-icon active">
                                        <a href="#" v-on:click='addCart(product)'>
                                            <i  class="icon_bag_alt"></i>
                                        </a>
                                    </li>
                                    <li class="quick-view">
                                        <router-link v-bind:to="'/product/'+product.slug">+ Quick View </router-link>
                                    </li>
                                </ul>
                            </div>
                            <div class="pi-text">
                                <div class="catagory-name">{{ product.type }}</div>
                                <a href="#">
                                    <h5>{{ product.name }}</h5>
                                </a>
                                <div class="product-price">
                                    ${{ product.price }}
                                    <span>$35.00</span>
                                </div>
                            </div>
                        </div>
                    </carousel>
                </div>
                <div class="col-lg-12" v-else>
                    <p>Data tidak ditemukan !!!</p>
                </div>
            </div>
        </div>
    </section>
    <!-- Women Banner Section End -->
</template>

<script>
	import carousel from 'vue-owl-carousel';
    import axios    from 'axios';

	export default{
		name: 'BannerShayna',
		components: {
			carousel
		},
        data() {
            return {
                products: [],
                userCart: [],

            }
        },
        methods: {
            addCart(product){
                let productStored = {
                    "id" : product.id,
                    'name': product.name,
                    'price': product.price,
                    'photo': product.galleries[0].photo
                }

                this.userCart.push(productStored);
                const parsed = JSON.stringify(this.userCart);
                localStorage.setItem('userCart', parsed);

                window.location.reload();
            }
        },
        mounted() {
            if(localStorage.getItem('userCart')){
                try {
                    this.userCart = JSON.parse(localStorage.getItem('userCart'));
                } catch(e) {
                    localStorage.removeItem('useCart');
                }
            }
            axios
                .get('http://localhost:8000/api/products')
                .then( res => (this.products = res.data.data.data) )
                .catch( err => console.log(err));

        }

	}
</script>

<style>
	
</style>