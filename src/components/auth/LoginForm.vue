<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import Snackbar from '@/components/dashboards/snackbar.vue';


const checkbox = ref(false);
const valid = ref(false);
const password = ref('');
const username = ref('');
const passwordRules = ref([(v: string) => !!v || 'Password is required']);
const emailRules = ref([(v: string) => !!v || 'Username is required']);

function validate(_values: any, { setErrors }: any) {
    const authStore = useAuthStore();
    const url = 'ptpkx.com';
    if (checkbox) {
        localStorage.setItem('b-user', JSON.stringify({ username: username.value, password: password.value }));
    }
    return authStore
        .login(username.value, password.value, url)
        .then((res) => {
            if (res.code !== 0) {
                return snackbarRef.value?.open({ type: 'error', message: res.msg });
            }
            snackbarRef.value?.open({ type: 'success', message: '登录成功,欢迎回来！' });
        })
        .catch((error) => setErrors({ apiError: error }));
}

const snackbarRef = ref(null);

onMounted(() => {
    let bUser = localStorage.getItem('b-user');
    if (bUser) {
        let user = JSON.parse(bUser);
        username.value = user.username;
        password.value = user.password;
    }
});
</script>

<template>
    <Snackbar ref="snackbarRef" />
    <Form @submit="validate" v-slot="{ errors, isSubmitting }" class="mt-5">
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">Username</v-label>
        <VTextField v-model="username" :rules="emailRules" class="mb-8" required hide-details="auto"></VTextField>
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">Password</v-label>
        <VTextField v-model="password" :rules="passwordRules" required hide-details="auto" type="password" class="pwdInput"></VTextField>
        <div class="d-flex flex-wrap align-center my-3 ml-n2">
            <v-checkbox
                v-model="checkbox"
                :rules="[(v: any) => !!v || 'You must agree to continue!']"
                required
                hide-details
                color="primary"
            >
                <template v-slot:label class="">Remeber this Device</template>
            </v-checkbox>
            <div class="ml-sm-auto">
                <RouterLink to="/auth/forgot-password" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                    >Forgot Password ?</RouterLink
                >
            </div>
        </div>
        <v-btn size="large" rounded="pill" :loading="isSubmitting" color="primary" :disabled="valid" block type="submit" flat
            >Sign In</v-btn
        >
        <div v-if="errors.apiError" class="mt-2">
            <v-alert color="error">{{ errors.apiError }}</v-alert>
        </div>
    </Form>
</template>
