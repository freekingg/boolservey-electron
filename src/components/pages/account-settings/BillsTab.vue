<script setup lang="ts">
import { ref, reactive } from 'vue';
import Snackbar from '@/components/dashboards/snackbar.vue';

const snackbarRef: any = ref(null);
const dataForm = reactive({
    browerApi: '',
});

const submitHandle = () => {
    if (!dataForm.browerApi) {
        return snackbarRef.value?.open({ type: 'error', message: '信息填写不完整' });
    }
    localStorage.setItem('browerApi', dataForm.browerApi);
    return snackbarRef.value?.open({ type: 'success', message: '更新成功了' });
};
</script>
<template>
    <Snackbar ref="snackbarRef" />
    <v-row class="justify-center ma-n2">
        <v-col cols="12" md="9">
            <v-card elevation="10">
                <v-card-item>
                    <h5 class="text-h5">IP地址接口</h5>
                    <div class="text-subtitle-1 text-grey100 mt-2">默认调用接口</div>
                    <div class="mt-5">
                        <v-label class="mb-2 font-weight-medium">地址</v-label>
                        <v-text-field color="primary" placeholder="例如：e3954635a37ce335.lqz.na.ipidea.online:2333" variant="outlined" v-model="dataForm.browerApi" />
                    </div>
                    <div class="mt-5">
                        <v-label class="mb-2 font-weight-medium">账号</v-label>
                        <v-text-field color="primary" placeholder="账号" variant="outlined" v-model="dataForm.browerApi" />
                    </div>
                    <div class="mt-5">
                        <v-label class="mb-2 font-weight-medium">密码</v-label>
                        <v-text-field color="primary" placeholder="密码" variant="outlined" v-model="dataForm.browerApi" />
                    </div>

                    <div class="d-flex justify-center mt-5 pb-3">
                        <v-btn size="large" @click="submitHandle" color="primary" class="mr-4" rounded="pill">Save</v-btn>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
