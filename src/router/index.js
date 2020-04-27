import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * VIEWS
 */
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import ProductDetail from '../views/ProductDetail.vue';
import ShoppingCart from '../views/ShoppingCart.vue';
import Success from '../views/Success.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Product',
    name: 'Product',
    props: true,
    component: Product
  },
  {
    path: '/Product/:slug',
    name: 'ProductDetail',
    props: true,
    component: ProductDetail
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: ShoppingCart
  },
  {
    path: '/Success',
    name: 'Success',
    component: Success
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router