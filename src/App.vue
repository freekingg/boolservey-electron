<template>
    <RouterView> </RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
<style>
.text-clamp-1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    text-wrap: wrap;
}
.v-progress-linear__background, .v-progress-linear__buffer{
    background-color: none;
}
.v-data-table-progress{
    display: none;

}
</style>
