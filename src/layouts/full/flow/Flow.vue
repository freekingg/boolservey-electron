<script setup lang="ts">
import { ref, computed } from 'vue';
import { XIcon } from 'vue-tabler-icons';
import { useFlowStore } from '@/stores/flow';
import Ipidea from './components/Ipidea.vue';

const store = useFlowStore();
const dialog: any = computed(() => {
    return store.flow_drawer || false;
});

/*tab*/
const tab = ref('IPIDEA');
</script>

<template>
    <div class="text-center">
        <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark style="flex: unset">
                    <v-btn icon color="white" @click.stop="store.SET_CUSTOMIZER_DRAWER(!store.flow_drawer)" flat>
                        <XIcon width="20" />
                    </v-btn>
                    <v-toolbar-title class="text-white">流量</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark color="white" @click="store.SET_CUSTOMIZER_DRAWER(!store.flow_drawer)" flat> Close </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-item>
                    <v-tabs v-model="tab" bg-color="transparent" min-height="70" height="70" color="primary">
                        <v-tab value="IPIDEA" class="">IPIDEA</v-tab>
                    </v-tabs>
                    <v-divider></v-divider>
                    <Ipidea v-if="tab === 'IPIDEA'" />
                </v-card-item>
            </v-card>
        </v-dialog>
    </div>
</template>
