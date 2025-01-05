<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSystemStore } from '@/stores/system/index';

const title = useRoute();
const store = useSystemStore();
let post:any = ref({})
onMounted(() => {
    store.fetchNotisDetail(`${title.params?.id}`).then((result) => {
        post.value = result;
    }).catch(() => {
        
    });
});



</script>
<template>
    <v-row v-if="post">
        <v-col cols="12">
            <v-card elevation="10"  rounded="xl">
                <v-card-item class="pt-4 blog-detail">
                    <h1 class="text-h1 font-weight-medium my-6">{{ post.title }}</h1>
                </v-card-item>
                <v-divider></v-divider>
                <div class="pa-6" v-html="post.content">
                    
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>
