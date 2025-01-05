<script setup lang="ts">
import { ref, reactive,onMounted } from 'vue';
import Snackbar from '@/components/dashboards/snackbar.vue';

const snackbarRef: any = ref(null);
const dataForm = reactive({
    browerApi: '',
});

onMounted(()=>{
    let browerUrl = localStorage.getItem('browerApi')
    if(browerUrl){
        dataForm.browerApi = browerUrl
    } ;
})

const submitHandle = () => {
    if (!dataForm.browerApi) {
        return snackbarRef.value?.open({ type: 'error', message: '信息填写不完整' });
    }
    localStorage.setItem('browerApi',dataForm.browerApi)
    return snackbarRef.value?.open({ type: 'success', message: '更新成功了' });
};
</script>
<template>
    <Snackbar ref="snackbarRef" />
    <v-row class="justify-center ma-n2">
        <v-col cols="12" md="9">
            <v-card elevation="10">
                <v-card-item>
                    <h5 class="text-h5">浏览器地址接口</h5>
                    <div class="text-subtitle-1 text-grey100 mt-2">指纹浏览器调用接口</div>
                    <div class="mt-5">
                        <v-label class="mb-2 font-weight-medium">地址</v-label>
                        <v-text-field color="primary" variant="outlined" v-model="dataForm.browerApi" />
                    </div>
                    <div class="d-flex justify-center mt-5 pb-3">
                        <v-btn size="large" @click="submitHandle" color="primary" class="mr-4" rounded="pill">Save</v-btn>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
