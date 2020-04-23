<template>
    <div class="shopping">
        <HeaderShayna/>
        <!-- Breadcrumb Section Begin -->
        <div class="breacrumb-section text-left">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb-text product-more">
                            <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
                            <span>Shopping Cart</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb Section Begin -->
        <!-- Shopping Cart Section Begin -->
        <section class="shopping-cart spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="cart-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th class="p-name text-center">Product Name</th>
                                                <th>Price</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if='userCart.length > 0'>
                                            <tr v-for='(product,index) in userCart' v-bind:key='product.id'>
                                                <td class="cart-pic first-row">
                                                    <img class='img-cart' v-bind:src="product.photo" />
                                                </td>
                                                <td class="cart-title first-row text-center">
                                                    <h5>{{ product.name }}</h5>
                                                </td>
                                                <td class="p-price first-row">${{ product.price }}</td>
                                                <td class="delete-item">
                                                    <a href="#" v-on:click='removeItem(index)'>
                                                        <i class="material-icons">close</i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody v-else>
                                            <tr>
                                                <td colspan="5">Tidak Ada Produk</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <h4 class="mb-4 text-left">
                                Informasi Pembeli:
                                </h4>
                                <div class="user-checkout text-left">
                                    <form>
                                        <div class="form-group">
                                            <label for="namaLengkap">Nama lengkap</label>
                                            <input 
                                                    type="text" 
                                                    class="form-control" 
                                                    id="namaLengkap" 
                                                    aria-describedby="namaHelp" 
                                                    placeholder="Masukan Nama"
                                                    v-model='customerInfo.name'>
                                        </div>
                                        <div class="form-group">
                                            <label for="namaLengkap">Email Address</label>
                                            <input 
                                                    type="email" 
                                                    class="form-control" 
                                                    id="emailAddress" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Masukan Email"
                                                    v-model='customerInfo.email'>
                                        </div>
                                        <div class="form-group">
                                            <label for="namaLengkap">No. HP</label>
                                            <input 
                                                    type="text" 
                                                    class="form-control" 
                                                    id="noHP" 
                                                    aria-describedby="noHPHelp" 
                                                    placeholder="Masukan No. HP"
                                                    v-model='customerInfo.number'>
                                        </div>
                                        <div class="form-group">
                                            <label for="alamatLengkap">Alamat Lengkap</label>
                                            <textarea 
                                                    class="form-control" 
                                                    id="alamatLengkap" 
                                                    rows="3"
                                                    v-model='customerInfo.address'></textarea>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="proceed-checkout text-left">
                                    <ul>
                                        <li class="subtotal">ID Transaction <span>#SH12000</span></li>
                                        <li class="subtotal mt-3">Subtotal <span>${{totalPrice}}.00</span></li>
                                        <li class="subtotal mt-3">Pajak <span>10% ${{ pajak }}.00</span></li>
                                        <li class="subtotal mt-3">Total Biaya <span>${{total}}.00</span></li>
                                        <li class="subtotal mt-3">Bank Transfer <span>Mandiri</span></li>
                                        <li class="subtotal mt-3">No. Rekening <span>2208 1996 1403</span></li>
                                        <li class="subtotal mt-3">Nama Penerima <span>Shayna</span></li>
                                    </ul>
                                    <a v-on:click='checkout()' href="#" class="proceed-btn">I ALREADY PAID</a>                          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Shopping Cart Section End -->
        <FooterShayna/>
    </div>
</template>

<script>
    

    import HeaderShayna from '@/components/HeaderShayna.vue';
    import FooterShayna from '@/components/FooterShayna.vue';

    /**
        Library
    */  
    import axios from 'axios';

    export default{
        name: 'ShoppingCart',
        components: {
            HeaderShayna,
            FooterShayna
        },
        data(){
            return{
                userCart: [],
                customerInfo: {
                    name: '',
                    email: '',
                    number: '',
                    address: '',
                }
            }
        },
        methods: {
            removeItem(index){
                this.userCart.splice(index,1);
                const parsed = JSON.stringify(this.userCart);
                localStorage.setItem('userCart', parsed);
            },
            checkout(){
                let productIds = this.userCart.map((product) => product.id);
                
                let checkoutData = {
                    "name": this.customerInfo.name,
                    "email": this.customerInfo.email,
                    "number": this.customerInfo.number,
                    "address": this.customerInfo.address,
                    "transaction_total": this.total,
                    "transaction_status": "PENDING",
                    "transaction_details": productIds
                };

            
                axios
                    .post(
                        "http://localhost:8000/api/checkout",
                        checkoutData
                    )
                    .then( () => this.$router.push('success'))
                    .catch( err => console.log(err));
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
        },
        computed: {
            totalPrice(){
                if(this.userCart.length > 0){
                    return this.userCart.reduce((items,data) => items + data.price,0)
                }else{
                    return '0';
                }
            },
            pajak(){return  this.totalPrice*10/100;},
            total(){return  this.totalPrice + this.pajak;}
            

        }
    }
</script>

<style scoped>
    .item-cart{
        width: 100px;
        height: 100px;
    }
</style>