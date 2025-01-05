<script setup lang="ts">
import { onMounted, computed } from 'vue';
import BlogCardGrid from './BlogGrid.vue';


onMounted(() => {
});

const getPosts = computed(() => {
    return [];
});
</script>
<template>
    <v-container class="max-width-1218 pt-0 pb-12">
        <v-row>
            <template v-for="(post) in getPosts" :key="post.id">
                <BlogCardGrid :post="post" />
            </template>
        </v-row>
    </v-container>
</template>
