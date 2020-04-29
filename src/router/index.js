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

let baseTitle = process.env.VUE_APP_NAME;

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    meta: {
      title: baseTitle
    },
    component: Home
  },

  {
    path: '/product',
    name: 'Product',
    props: true,
    meta: {
      title: baseTitle
    },
    component: Product
  },
  {
    path: '/product/detail/:slug',
    name: 'ProductDetail',
    props: true,
    beforeEnter: (to, from, next) => {
      document.title = `${baseTitle} | ${to.params.slug}`;

      next();
    },
    meta: {
      title: baseTitle
    },
    component: ProductDetail
  },
  {
    path: '/product/search/:search',
    name: 'ProductSearch',
    props: true,
    meta: {
      title: baseTitle
    },
    component: Product
  },
  {
    path: '/product/page/:page',
    name: 'ProductPage',
    props: true,
    meta: {
      title: baseTitle
    },
    component: Product
  },

  {
    path: '/Cart',
    name: 'Cart',
    meta: {
      title: baseTitle
    },
    component: ShoppingCart
  },
  {
    path: '/Success',
    name: 'Success',
    meta: {
      title: baseTitle
    },
    component: Success
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {

  document.title = to.meta.title;

  next();
})
export default router