<script setup lang="ts">
import { ref } from 'vue';
// import icon1 from '@/assets/images/front-pages/technology/Vuejs.svg';
import { useRouter } from 'vue-router';

import icon1 from '@/assets/images/front-pages/technology/Google-Play.png';
import icon2 from '@/assets/images/front-pages/technology/Litecoin.png';
import icon3 from '@/assets/images/front-pages/technology/Vite.svg';
import icon4 from '@/assets/images/front-pages/technology/PayPal.png';
import icon5 from '@/assets/images/front-pages/technology/Pinia.svg';
import icon6 from '@/assets/images/front-pages/technology/Visa.png';

const router = useRouter()
const linkTo = ()=>{
    router.replace('/auth/login')
}
const technology = ref([
    {
        img: icon1,
        name: 'Google-Play'
    },
    {
        img: icon2,
        name: 'Litecoin'
    },
    {
        img: icon3,
        name: 'Litecoin'
    },
    {
        img: icon4,
        name: 'PayPal'
    },
    {
        img: icon5,
        name: 'Pinia'
    },
    {
        img: icon6,
        name: 'Visa'
    }
]);
</script>
<template>
    <div class="overflow-hidden bg-background">
        <v-container class="max-width-1218 pt-md-10 pt-6 pb-xl-5 pb-10">
            <v-row class="d-flex justify-center align-center">
                <v-col cols="12" lg="12" class="text-align-start">
                    <h1 class="text-56 textPrimary font-weight-medium">
                        <b> Get paid for taking free surveys</b>
                    </h1>
                    <div class="d-sm-flex align-center text-center justify-md-start justify-center pt-5 gap-3">
                        <div class="d-flex flex-row-reverse justify-sm-start justify-center ml-2">
                            <v-avatar class="ml-n2 avtar-border" size="40">
                                <img src="@/assets/images/profile/user-3.jpg" height="40" alt="usericon" />
                            </v-avatar>
                            <v-avatar class="ml-n2 avtar-border" size="40">
                                <img src="@/assets/images/profile/user-2.jpg" height="40" alt="usericon" />
                            </v-avatar>
                            <v-avatar class="ml-n2 avtar-border" size="40">
                                <img src="@/assets/images/profile/user-1.jpg" height="40" alt="usericon" />
                            </v-avatar>
                        </div>
                        <div class="d-sm-flex text-muted">
                            <h6 class="text-17 font-weight-medium ml-2">Your opinions are valuable, and businesses are willing to pay for them. Earn cash today!</h6>
                        </div>
                    </div>
                    <div class="d-flex flex-wrap  ga-sm-6 ga-3 pt-9 pb-7 justify-md-start justify-center align-center technology">
                        <div v-for="(item, i) in technology" :key="i">
                            <div class="d-flex justify-center align-center round-56 rounded-xl bg-surface elevation-1">
                                <img :src="item.img" alt="technology" height="30" />
                            </div>
                            <v-tooltip activator="parent" location="bottom">{{ item.name }}</v-tooltip>
                        </div>
                    </div>
                    <div class="d-flex justify-md-start justify-center">
                        <v-btn color="primary" rounded="pill" class="px-8 transform-none m-btn-full" size="large"  @click="linkTo"
                            >Start Your FREE Trial Now</v-btn
                        >
                    </div>
                </v-col>
                <!-- <v-col cols="12" lg="6">
                    <div class="main-banner d-lg-block d-none rounded-xl">
                        <img src="@/assets/images/front-pages/background/1.jpg" alt="banner-right-image" class="rtlImg" />
                    </div>
                </v-col> -->
            </v-row>
        </v-container>
    </div>
</template>
