<script setup lang="ts">
// common components
import BlogPosts from '@/components/apps/blog/blogPosts.vue';
</script>

<template>
    <!-- ---------------------------------------------------- -->
    <!-- Table Basic -->
    <!-- ---------------------------------------------------- -->
    <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->
    <v-row>
        <v-col cols="12">
          <BlogPosts/>
        </v-col>
    </v-row>
</template>
