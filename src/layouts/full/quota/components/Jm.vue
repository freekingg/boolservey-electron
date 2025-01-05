<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { countries } from '@/utils/country';
import jmCountry from '@/utils/data';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import Spinners from '@/components/Spinners.vue';

import { useQuotaStore } from '@/stores/quota';
const quota = useQuotaStore();
const baseUrl = `${import.meta.env.VITE_API_URL}/api-v1`;

const result = ref([]);

const quotaData: any = computed(() => {
    return quota.quota || null;
});

const dataForm = reactive({
    id: '',
    county: '',
    countyCode: null
});

onMounted(() => {
    if (quotaData.value) {
        dataForm.countyCode = quotaData.value.countyCode || '';
        dataForm.id = quotaData.value.id;
    }
});

const loading = ref(false);
const fetchList = async () => {
    if (!dataForm.id) return;
    loading.value = true;
    try {
        const data: any = await fetchWrapper.get(`${baseUrl}/exter/jm/${dataForm.id}`);

        let quotasTable = [];
        for (let index = 0; index < data.data.length; index++) {
            const element = data.data[index];
            let obj = {
                title: matchRegion(element.QuestionID, 'title'),
                detail:
                    element.QuestionType === 'Range'
                        ? [{ AnswerText: element.AnswerCodes }]
                        : matchRegion(element.QuestionID, element.AnswerCodes)
            };
            quotasTable.push(obj);
        }

        result.value = quotasTable;
        loading.value = false;
    } catch (error) {
        console.log(error);
        loading.value = false;
    }
};

const matchRegion = (key = '', keys: any = []) => {
    let target = jmCountry[dataForm.countyCode.toUpperCase()].find((item) => item.QuestionID === key);
    if (keys === 'title') {
        return target.QuestionText;
    }
    let result = [];
    if (target) {
        let answers = target.AnswerCodes || [];
        for (let index = 0; index < keys.length; index++) {
            const element1 = keys[index];
            for (let index2 = 0; index2 < answers.length; index2++) {
                const element2 = answers[index2];
                if (+element1 === element2.AnswerCode) {
                    result.push(element2);
                }
            }
        }
    }
    return result;
};

const headers = ref([
    { title: 'Question', key: 'question' },
    { title: 'Detail', key: 'answer' }
]);
</script>
<template>
    <v-row class="mt-6 d-flex">
        <v-col cols="12" lg="2" md="6">
            <v-text-field v-model="dataForm.id" label="Survey Id" hide-details variant="outlined" clearable></v-text-field>
        </v-col>
        <v-col cols="12" lg="2" md="6">
            <v-autocomplete
                density="compact"
                clearable
                auto-select-first
                v-model="dataForm.countyCode"
                :items="countries"
                item-title="code"
                item-value="code"
                label="Country"
            >
                <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :subtitle="item.raw.code" :title="item.raw.name"></v-list-item>
                </template>
            </v-autocomplete>
        </v-col>
        <v-col cols="12" lg="2" md="6">
            <v-btn color="primary" rounded="pill" class="ml-auto" :loading="loading" @click="fetchList()">
                <v-icon class="mr-2">mdi-magnify</v-icon>Search
            </v-btn>
        </v-col>
    </v-row>
    <div class="border-table">
        <v-data-table :headers="headers" :items="result" height="calc(100vh - 400px)" :loading="loading" fixed-header hide-default-footer>
            <template v-slot:loading>
                <Spinners />
            </template>
            <template v-slot:item.question="{ item }">
                <span class="text-subtitle-1 text-success">{{ item.title }}</span>
            </template>

            <template v-slot:item.answer="{ item }">
                <div v-if="item.detail.length" style="white-space: break-spaces">
                    <span class="text-subtitle-1" v-for="(it, index) in item.detail" :key="index">
                        <span class="text-success">{{ it.AnswerText }}，</span>
                    </span>
                </div>
            </template>
        </v-data-table>
    </div>
</template>
