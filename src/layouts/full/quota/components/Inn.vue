<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import Spinners from '@/components/Spinners.vue';
import { useQuotaStore } from '@/stores/quota';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
const baseUrl = `${import.meta.env.VITE_API_URL}/api-v1`;
const quota = useQuotaStore();
const result = ref([]);

const dataForm = reactive({
    id: '',
    county: ''
});
const quotaData: any = computed(() => {
    return quota.quota || null;
});
onMounted(() => {
    if(quotaData.value){
        dataForm.id = quotaData.value.id
    }
});

const loading = ref(false);
const fetchList = async () => {
    if (!dataForm.id) return;
    loading.value = true;
    try {
        const data: any = await fetchWrapper.get(`${baseUrl}/exter/innov/${dataForm.id}`);
        result.value = data.data?.result;
        loading.value = false;
    } catch (error) {
        console.log(error);
        loading.value = false;
    }
};

const headers = ref([
    { title: 'QuestionCategory', key: 'QuestionCategory' },
    { title: 'Question', key: 'question' },
    { title: 'Detail', key: 'answer' }
]);
</script>
<template>
    <v-row class="mt-6">
        <v-col cols="12" lg="2" md="6">
            <v-text-field
                density="compact"
                v-model="dataForm.id"
                label="Survey Id"
                hide-details
                variant="outlined"
                clearable
            ></v-text-field>
        </v-col>
        <v-col cols="24">
            <v-btn color="primary" rounded="pill" class="ml-auto mr-2" :loading="loading" @click="fetchList()">
                <v-icon class="mr-2">mdi-magnify</v-icon>配额
            </v-btn>
            <v-btn color="primary" rounded="pill" class="ml-auto" :loading="loading" @click="fetchList()">
                <v-icon class="mr-2">mdi-magnify</v-icon>调查详情
            </v-btn>
        </v-col>
    </v-row>

    <div class="border-table">
        <v-data-table :headers="headers" :items="result" height="calc(100vh - 400px)" :loading="loading" fixed-header hide-default-footer>
            <template v-slot:loading>
                <Spinners />
            </template>
            <template v-slot:item.QuestionCategory="{ item }">
                <span class="text-subtitle-1 text-success">{{ item.QuestionCategory }}</span>
            </template>
            <template v-slot:item.question="{ item }">
                <span class="text-subtitle-1 text-success">{{ item.QuestionText }}</span>
            </template>
            <template v-slot:item.answer="{ item }">
                <div style="white-space: break-spaces; max-width: 800px" v-if="item.QuestionKey !== 'AGE'">
                    <span class="text-subtitle-1" v-for="(it, index) in item.Options" :key="index">
                        <span class="text-success">{{ it.OptionText }},</span>
                    </span>
                </div>
                <div style="white-space: break-spaces; max-width: 800px" v-else>
                    <span class="text-subtitle-1" v-for="(it, index) in item.Options" :key="index">
                        <span class="text-success">{{ it.ageStart }} - {{ it.ageEnd }}</span>
                    </span>
                </div>
            </template>
        </v-data-table>
    </div>
</template>
