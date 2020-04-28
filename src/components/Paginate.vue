<template>
    <div class="paginate">
        <ul class="d-flex">
            <li v-for="page in leftPaginate" :key="page.id">
                <router-link :to="{name: 'ProductPage',params: {page: page}}">{{page}}</router-link>
            </li>
            <li class="bg-warning active">{{ currentPage }}</li>
            <li v-for="page in rightPaginate" :key="page.id">
                <router-link :to="{name: 'ProductPage',params: {page: page}}">{{page}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "Paginate",
    data() {
        return {
            currentPage: 1
        };
    },
    methods: {},
    mounted() {
        if (this.$route.params.page) {
            this.currentPage = parseInt(this.$route.params.page);
        }
    },
    computed: {
        leftPaginate() {
            let leftPage = [];
            for (let i = this.currentPage - 5; i <= this.currentPage; i++) {
                if (i > 0 && i <= Math.ceil(this.total / this.perPage)) {
                    leftPage.push(i);
                }
            }
            let left = leftPage.filter(e => e != this.currentPage);
            return left;
        },
        rightPaginate() {
            let rightPage = [];
            for (let i = this.currentPage + 1; i <= this.currentPage + 5; i++) {
                if (i > 0 && i <= Math.ceil(this.total / this.perPage)) {
                    rightPage.push(i);
                }
            }
            let right = rightPage.filter(e => e != this.currentPage);
            return right;
        }
    },
    watch: {
        "$route.params.page": function(page) {
            this.currentPage = parseInt(page);
        }
    },
    props: ["total", "perPage"]
};
</script>

<style scoped>
.paginate ul li {
    list-style-type: none;
}
.paginate ul li a {
    padding: 5px 10px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: gray;
}
.paginate ul li.active {
    padding: 5px 10px;

    color: white;
}
</style>