<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Snackbar from '@/components/dashboards/snackbar.vue';

const authStore = useAuthStore();


const dataForm = reactive({
    email: '',
    nickname: '',
    user_name: '',
    picture: ''
});

const updateHandle = () => {
    authStore
        .updatePerson(dataForm)
        .then((result) => {
            if (result.code === 0) {
                snackbarRef.value?.open({ type: 'success', message: '更新成功了' });
                let user:any = localStorage.getItem('user');
                let userInfo = JSON.parse(user);
                dataForm.email ? (userInfo.email = dataForm.email) : '';
                dataForm.nickname ? (userInfo.nickname = dataForm.nickname) : '';
                localStorage.setItem('user', JSON.stringify(userInfo));
            }
        })
        .catch((err) => {
            console.log('err: ', err);
        });
};

const snackbarRef:any = ref(null);

onMounted(() => {
    let user = localStorage.getItem('user');
    if (user) {
        dataForm.email = authStore.user?.email;
        dataForm.nickname = authStore.user?.nickname;
        dataForm.picture = authStore.user?.picture;
        dataForm.user_name = authStore?.user.user_name;
    }
});
</script>

<template>
    <v-card elevation="10">
        <Snackbar ref="snackbarRef" />
        <v-row class="ma-sm-n2 ma-n1">
            <v-col cols="12" sm="12">
                <v-card elevation="10">
                    <v-card-item>
                        <h5 class="text-h5">Change Profile</h5>
                        <div class="text-subtitle-1 text-grey100 mt-2">Change your profile picture from here</div>
                        <div class="text-center mt-6 mb-6">
                            <v-avatar size="120">
                                <img src="@/assets/images/profile/user6.jpg" height="120" alt="image" />
                            </v-avatar>
                        </div>
                        <div class="d-flex justify-center">
                            <v-btn color="primary" class="mx-2" rounded="pill"> Upload</v-btn>
                            <v-btn color="error" class="mx-2" variant="outlined" rounded="pill">Reset</v-btn>
                        </div>
                        <div class="text-subtitle-1 text-grey100 text-center my-sm-8 my-6">Allowed JPG, GIF or PNG. Max size of 800K</div>
                    </v-card-item>
                </v-card>
            </v-col>

            <v-col cols="12">
                <v-card elevation="10">
                    <v-card-item>
                        <h5 class="text-h5">Personal Details</h5>
                        <div class="text-subtitle-1 text-grey100 mt-2">To change your personal detail , edit and save from here</div>
                        <div class="mt-5">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium">Account</v-label>
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        disabled
                                        v-model="dataForm.user_name"
                                        hide-details
                                    />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium">Nick Name</v-label>
                                    <v-text-field color="primary" variant="outlined" type="text" v-model="dataForm.nickname" hide-details />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium">Email</v-label>
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="email"
                                        v-model="dataForm.email"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <div class="d-flex justify-end mt-5 pb-3">
            <v-btn size="large" color="primary" @click="updateHandle" rounded="pill" class="mr-4">Save</v-btn>
            <v-btn size="large" class="bg-lighterror text-error" rounded="pill">Reset</v-btn>
        </div>
    </v-card>
</template>
