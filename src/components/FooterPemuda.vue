<template>
    <!-- Footer Section Begin -->
    <footer class="footer-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-5">
                    <div class="footer-left text-left">
                        <div class="footer-logo">
                            <a href="#">
                                <img v-bind:src="webInformation.logo" height="200px" />
                            </a>
                        </div>
                        <ul>
                            <li>Address: {{ webInformation.address}}</li>
                            <li>Phone: {{ webInformation.number}}</li>
                            <li>Email: {{ webInformation.email}}</li>
                        </ul>
                        <div class="footer-social">
                            <a v-bind:href="webInformation.facebook">
                                <i class="fa fa-facebook"></i>
                            </a>
                            <a v-bind:href="webInformation.instagram">
                                <i class="fa fa-instagram"></i>
                            </a>
                            <a v-bind:href="webInformation.twitter">
                                <i class="fa fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-lg-3 col-sm-6 offset-lg-1">
                    <div class="footer-widget text-left">
                        <h5>Information</h5>
                        <ul>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-6 col-lg-3 col-sm-6">
                    <div class="footer-widget text-left">
                        <h5>Others</h5>
                        <ul>
                            <li>
                                <router-link :to="{name:'Cart'}">Shopping Cart</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'Product'}">Shop</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright-reserved">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <div class="copyright-text">
                            Copyright &copy;
                            {{tahun}} - {{untilYear}}
                            All rights reserved | {{webInformation.app_name}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- Footer Section End -->
</template>

<script>
export default {
    name: "FooterShayna",
    data: function() {
        return {
            tahun: new Date().getFullYear()
        };
    },
    computed: {
        untilYear: function() {
            return this.tahun + 5;
        }
    },
    props: ["webInformation"]
};
</script>