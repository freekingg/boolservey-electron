<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { format } from 'date-fns';
import user2 from '@/assets/images/profile/user2.jpg';
import { Icon } from '@iconify/vue';
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
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" class="notification_popup">
        <template v-slot:activator="{ props }">

            <v-btn icon flat v-bind="props" size="small" class="custom-hover-primary">

                <div class="position-realtive">
                    <div class="notify">
                        <span class="heartbit"></span> <span class="point"></span>
                    </div>
                    <Icon icon="solar:bell-bing-line-duotone" height="24" width="24" />
                </div>
            </v-btn>

        </template>
        <v-sheet rounded="lg" width="385" elevation="10" class="mt-5 dropdown-box">
            <div class="px-8 pb-4 pt-6">
                <div class="d-flex align-center">
                    <h6 class="text-h5 font-weight-semibold">Notifications</h6>
                </div>
            </div>
            <perfect-scrollbar>
                <v-list class="py-0 theme-list" lines="two">
                    <v-list-item v-for="item in getPosts" :key="item.title" :value="item" color="primary"
                        class="py-4 px-8">
                        <template v-slot:prepend>
                            <v-avatar size="48">
                                <v-img :src="user2" width="48" :alt="item.avatar" />
                            </v-avatar>
                        </template>
                        <div>
                            <h6 class="text-h6 font-weight-medium mb-1">{{ item.title }}</h6>
                        </div>
                        <p class="text-subtitle-1 font-weight-medium text-grey100">{{ format(new Date(item?.create_time), 'E, MMM d') }}</p>
                    </v-list-item>
                    <v-divider></v-divider>
                </v-list>
            </perfect-scrollbar>
            <div class="py-4 px-6 text-center">
                <v-btn color="primary" size="large" rounded="pill" block>See all Notifications</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
