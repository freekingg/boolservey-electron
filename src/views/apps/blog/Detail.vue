<script setup lang="ts">
// common components
import BlogDetail from '@/components/apps/blog/detail/blogDetail.vue';

</script>

<template>
    <!-- ---------------------------------------------------- -->
    <!-- Table Basic -->
    <!-- ---------------------------------------------------- -->
    <!-- <BaseBreadcrumb :title="page.title" class="" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->
    <v-row>
        <v-col cols="12">
          <BlogDetail/>
        </v-col>
    </v-row>
</template>
