<script setup lang="ts">
import { reactive,onMounted } from 'vue';
import { DeviceLaptopIcon, DeviceMobileIcon, DotsVerticalIcon } from 'vue-tabler-icons';
const dataForm = reactive({
    browerApi: '',
    bool:'no',
});

const boolChangeHandle = (value:any)=>{
    if(value === 'yes'){
        localStorage.setItem('bool','yes')
    }else{
        localStorage.removeItem('bool')
    }
}

onMounted(() => {
    let bool = localStorage.getItem('bool');
    if (bool) {
        dataForm.bool = 'yes';
    }else{
        dataForm.bool = 'no';
    }
});

</script>


<template>
    <v-card elevation="10" >
        <v-row class="ma-sm-n2 ma-n1">
            <v-col cols="12">
                <v-card elevation="10">
                    <v-card-item>
                        <div class="d-flex justify-space-between my-4">
                            <div>
                                <h6 class="text-h6 mb-1">Authentication</h6>
                                <h5 class="text-subtitle-1 text-grey100">Bool Enable</h5>
                            </div>
                            <v-switch
                            v-model="dataForm.bool"
                            color="primary"
                            false-value="no"
                            true-value="yes"
                            hide-details
                            @update:modelValue="boolChangeHandle"
                        ></v-switch>
                        </div>
                        <v-divider></v-divider>
                        <div class="d-flex justify-space-between my-4">
                            <div>
                                <h6 class="text-h6 mb-1">Another e-mail</h6>
                                <h5 class="text-subtitle-1 text-grey100">E-mail to send verification link</h5>
                            </div>
                            <v-btn class="bg-lightprimary text-primary" flat>Setup</v-btn>
                        </div>
                        <v-divider></v-divider>
                        <div class="d-flex justify-space-between my-4">
                            <div>
                                <h6 class="text-h6 mb-1">SMS Recovery</h6>
                                <h5 class="text-subtitle-1 text-grey100">Your phone number or something</h5>
                            </div>
                            <v-btn class="bg-lightprimary text-primary" flat>Setup</v-btn>
                        </div>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <!-- <div class="d-flex justify-end mt-5 pb-3">
            <v-btn size="large" color="primary" rounded="pill" class="mr-4" >Save</v-btn>
            <v-btn size="large" class="bg-lighterror text-error" rounded="pill">Cancel</v-btn>
        </div> -->
    </v-card>
</template>
