<script setup lang="ts">
import BlogGrid from './blogCardGrid.vue';
import {  onMounted, computed } from 'vue';
import { useSystemStore } from '@/stores/system/index';

const store = useSystemStore();

onMounted(() => {
    store.fetchNotis();
});

const getPosts = computed(() => {
    return store.notis;
});

</script>
<template>
    <v-row>
        <template v-for="(post) in getPosts" :key="post.id">
            <BlogGrid :post="post" />
        </template>
    </v-row>
</template>
