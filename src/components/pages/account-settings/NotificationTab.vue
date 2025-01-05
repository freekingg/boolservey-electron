<script setup lang="ts">
import { ref, reactive } from 'vue';
import Snackbar from '@/components/dashboards/snackbar.vue';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

const snackbarRef: any = ref(null);
const dataForm = reactive({
    password: '',
    password2: ''
});

const submitHandle = () => {
    if (!dataForm.password || !dataForm.password2) {
        return snackbarRef.value?.open({ type: 'error', message: '信息填写不完整' });
    }
    if (dataForm.password !== dataForm.password2) {
        return snackbarRef.value?.open({ type: 'error', message: '两次密码填写不一致' });
    }

    authStore
        .updatePassword(dataForm)
        .then((result) => {
            if (result.code === 0) {
                return snackbarRef.value?.open({ type: 'success', message: '更新成功了' });
            }
            return snackbarRef.value?.open({ type: 'error', message: '修改失败' });
        })
        .catch(() => {});
};
</script>
<template>
    <Snackbar ref="snackbarRef" />
    <v-row class="justify-center ma-n2">
        <v-col cols="12" md="9">
            <v-card elevation="10">
                <v-card-item>
                    <h5 class="text-h5">Change Password</h5>
                    <div class="text-subtitle-1 text-grey100 mt-2">To change your password please confirm here</div>
                    <div class="mt-5">
                        <v-label class="mb-2 font-weight-medium">New Password</v-label>
                        <v-text-field color="primary" variant="outlined" type="password" v-model="dataForm.password" />
                        <v-label class="mb-2 font-weight-medium">Confirm Password</v-label>
                        <v-text-field color="primary" variant="outlined" type="password" v-model="dataForm.password2" hide-details />
                    </div>
                    <div class="d-flex justify-center mt-5 pb-3">
                        <v-btn size="large" @click="submitHandle" color="primary" class="mr-4" rounded="pill">Save</v-btn>
                        <v-btn size="large" class="bg-lighterror text-error" rounded="pill">Cancel</v-btn>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
