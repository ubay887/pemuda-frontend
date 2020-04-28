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
    path: '/product',
    name: 'Product',
    props: true,
    component: Product
  },
  {
    path: '/product/detail/:slug',
    name: 'ProductDetail',
    props: true,
    component: ProductDetail
  },
  {
    path: '/product/search/:search',
    name: 'ProductSearch',
    props: true,
    component: Product
  },
  {
    path: '/product/page/:page',
    name: 'ProductPage',
    props: true,
    component: Product
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