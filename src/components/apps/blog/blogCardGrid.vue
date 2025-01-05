<script setup lang="ts">
import { format } from 'date-fns';

const props = defineProps({ post: Object });

const linkTo = `/posts/${props.post?.id}`;
</script>
<template>
    <v-col cols="12" md="4" sm="4">
        <v-card elevation="10" rounded="xl" class="card-hover">
            <div>
                <v-card-item class="px-6 pt-4">
                    <v-chip class="text-body-2 font-weight-medium bg-grey100" size="small" v-text="'System'"></v-chip>
                    <h5 class="text-h5 text-13 my-6">
                        <RouterLink class="text-decoration-none color-inherits" :to="linkTo">{{ post?.title }}</RouterLink>
                    </h5>
                    <div class="d-flex align-center justify-space-between">
                        <div>
                            <v-avatar size="10">
                                <CircleIcon size="10" />
                            </v-avatar>
                            <span class="text-subtitle-2 ml-2" v-text="format(new Date(post?.create_time), 'E, MMM d')"></span>
                        </div>
                    </div>
                </v-card-item>
            </div>
        </v-card>
    </v-col>
</template>
