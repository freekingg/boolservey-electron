<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { XIcon } from 'vue-tabler-icons';
import { useSystemStore } from '@/stores/system/index';
import Snackbar from '@/components/dashboards/snackbar.vue';

// 动态注册组件
const components: any = {
    notikGroup: defineAsyncComponent(() => import('./components/notikGroup.vue')),
    Innovate: defineAsyncComponent(() => import('./components/Innovate.vue')),
    Zamplia: defineAsyncComponent(() => import('./components/Jm.vue')),
    sagoSupply: defineAsyncComponent(() => import('./components/sagoSupply.vue')),
    Default: defineAsyncComponent(() => import('./components/Default.vue'))
};

// 动态组件名

const currentComponent: any = computed(() => {
    return components[store.current_channel.cname] || components.Default;
});
const snackbarRef: any = ref(null);
const store = useSystemStore();
const dialog: any = computed(() => {
    return store.channel_drawer || false;
});

const channel: any = computed(() => {
    return store.current_channel;
});

const snackbarHandle = (msg: any) => {
    snackbarRef.value?.open({
        type: msg.type || 'success',
        timeout: msg.timeout || 1000,
        title: `${msg.title || 'Title'}`,
        message: `${msg.message || ''}`
    });
};

</script>

<template>
    <Snackbar ref="snackbarRef" />
    <div class="text-center">
        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark style="flex: unset">
                    <v-btn icon color="white" @click.stop="store.SET_CHANNEL_DRAWER()" flat>
                        <XIcon width="20" />
                    </v-btn>
                    <v-toolbar-title class="text-white">{{ channel.cname }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark color="white" @click="store.SET_CHANNEL_DRAWER()" flat> Close </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-item>
                    <component :is="currentComponent" @snackbarEvent="snackbarHandle"></component>
                </v-card-item>
            </v-card>
        </v-dialog>
    </div>
</template>
