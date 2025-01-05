<script setup lang="ts">
import comp1 from '@/assets/images/front-pages/componies/1.png';
import comp2 from '@/assets/images/front-pages/componies/2.png';
import comp3 from '@/assets/images/front-pages/componies/3.png';
import comp4 from '@/assets/images/front-pages/componies/4.png';
import comp5 from '@/assets/images/front-pages/componies/5.png';
import comp6 from '@/assets/images/front-pages/componies/6.png';
const companies = [
    {
        img: comp1
    },
    {
        img: comp2
    },
    {
        img: comp3
    },
    {
        img: comp4
    },
    {
        img: comp5
    },
    {
        img: comp6
    }
];
</script>
<template>
    <div class="bg-surface">
        <v-container class="max-width-1218 py-0">
            <div class="d-flex flex-wrap justify-md-space-between justify-center align-center gap-4 pt-lg-14 pt-7  border-t">
                <div v-for="item in companies" :key="item.img" style="height: 30px;">
                    <img style="height: inherit;" :src="item.img" alt="company" />
                </div>
            </div>
        </v-container>
    </div>
</template>
