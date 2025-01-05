<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuotaStore } from '@/stores/quota';
import Jm from './components/Jm.vue';
import Sago from './components/Sago.vue';
import Inn from './components/Inn.vue';
import Cint from './components/Cint.vue';
const quota = useQuotaStore();

const dialog: any = computed(() => {
    return quota.quota_drawer || false;
});

const quotaData: any = computed(() => {
    return quota.quota || null;
});

/*tab*/
const tab = ref('CINT');
const afterEnter = () => {
    if (quotaData.value && quotaData.value.type) {
        tab.value = quotaData.value.type;
    }
};
const afterLeave= () => {
    quota.SET_QAUOTA(null)
};
</script>

<!------------------------------------->
<!-- Customizer -->
<!------------------------------------->
<template>
    <div class="text-center">
        <v-dialog v-model="dialog" @afterEnter="afterEnter"  @afterLeave="afterLeave" transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark style="flex: unset">
                    <v-btn icon color="white" @click.stop="quota.SET_CUSTOMIZER_DRAWER(false)" flat>
                        <XIcon width="20" />
                    </v-btn>
                    <v-toolbar-title class="text-white">Quota</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark color="white" @click="quota.SET_CUSTOMIZER_DRAWER(false)" flat> Close </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-item>
                    <v-tabs v-model="tab" bg-color="transparent" min-height="70" height="70" color="primary">
                        <v-tab value="JM" class="">JM</v-tab>
                        <v-tab value="SAGO" class="">SAGO</v-tab>
                        <v-tab value="INN" class="">INN</v-tab>
                        <v-tab value="CINT" class="">CINT</v-tab>
                        <v-tab value="PS" class="">PS</v-tab>
                    </v-tabs>

                    <v-window v-model="tab">
                        <v-window-item value="JM"> <Jm /> </v-window-item>
                        <v-window-item value="SAGO"> <Sago /> </v-window-item>
                        <v-window-item value="INN"> <Inn /> </v-window-item>
                        <v-window-item value="CINT"> <Cint /> </v-window-item>
                        <v-window-item value="PS"> <Cint /> </v-window-item>
                    </v-window>
                </v-card-item>
            </v-card>
        </v-dialog>
    </div>
</template>

<style lang="scss"></style>
