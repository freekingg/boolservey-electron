  <!-- @ts-ignore: 禁用 TypeScript 检查 -->
<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { filterChannelCodeCountry } from '@/utils/country';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import * as XLSX from 'xlsx';
import { useQuotaStore } from '@/stores/quota';
import Snackbar from '@/components/dashboards/snackbar.vue';
import Spinners from '@/components/Spinners.vue';
import { ossUrl } from '@/config';

const quota = useQuotaStore();
const snackbarRef: any = ref(null);
const baseUrl = `${import.meta.env.VITE_API_URL}/api-v1`;

const quotaData: any = computed(() => {
    return quota.quota || null;
});

const result = ref([]);

const dataForm = reactive({
    id: '',
    county: '',
    countyCode: null
});

interface Raw {
  code: string;
  name: string;
}

interface Item {
  name: string | number;
  code: string | number;
  raw: Raw;
}

const countris = computed(() => {
    let res:any = filterChannelCodeCountry()
    return res as Item[];
});

onMounted(() => {
    if (quotaData.value) {
        let country: any = filterChannelCodeCountry(quotaData.value.countyCode);
        dataForm.countyCode = country ? country.channelCode : '';
        dataForm.id = quotaData.value.id;
    }
});

const loading = ref(false);
const fetchList = async () => {
    if (!dataForm.id || !dataForm.countyCode) {
        return snackbarRef.value?.open({
            type: 'error',
            timeout: 3000,
            title: '错误',
            message: '请检查信息填写是否完整'
        });
    }

    loading.value = true;
    try {
        const dataRes: any = await fetchWrapper.get(`${baseUrl}/exter/sago/${dataForm.id}`);
        // 假设你要读取的文件在服务器上
        const fileUrl = `${ossUrl}/excel/xls/${dataForm.countyCode}.xlsx`;
        fetch(fileUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('文件加载失败');
                }
                return response.arrayBuffer();
            })
            .then((data) => {
                loading.value = false;
                // 使用 xlsx 库解析文件
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                for (let index = 0; index < dataRes.data.length; index++) {
                    const element = dataRes.data[index];
                    element.source = [];
                    for (let index2 = 1; index2 < jsonData.length; index2++) {
                        const element2 = jsonData[index2];
                        if (element.QualificationId === +element2[0] && element.AnswerIds.includes(element2[7]+'')) {
                            element.source.push(element2);
                        } else if (element.QualificationId === +element2[0] &&  element2[4] === 'Range'){
                            element.source.push(element2);
                        } else if (element.QualificationId === +element2[0] &&  element.AnswerCodes.includes(element2[9]+'')){
                            element.source.push(element2);
                        }
                    }

                    // for (let index3 = 1; index3 < element.source.length; index3++) {
                    //     const element2 = element.source[index3];
                    //     if (element.QualificationId === +element2[0]) {
                    //         element.source.push(element2);
                    //     }
                    // }
                }
                result.value = dataRes.data;
                console.log('result.value: ', result.value);
            })
            .catch((error) => {
                console.error('读取文件失败:', error);
                loading.value = false;
            });
    } catch (error) {
        console.log(error);
        loading.value = false;
    }
};

const headers = ref([
    { title: 'Question', key: 'question' },
    { title: 'Detail', key: 'answer' },
    { title: 'Update Date', key: 'date' }
]);
</script>
<template>
    <Snackbar ref="snackbarRef" />
    <v-row class="mt-6 d-flex">
        <v-col cols="12" lg="2" md="6">
            <v-text-field v-model="dataForm.id" label="Survey Id" hide-details density="default" clearable></v-text-field>
        </v-col>
        <v-col cols="12" lg="2" md="6">
            <v-text-field v-model="dataForm.countyCode" label="Country No" hide-details density="default" clearable></v-text-field>
        </v-col>
        <v-col cols="12" lg="2" md="6">
            <v-autocomplete
                clearable
                auto-select-first
                v-model="dataForm.countyCode"
                :items="countris"
                item-title="code"
                item-value="channelCode"
                label="Country"
                variant="outlined"
            >
                <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :subtitle="item.raw.code" :title="item.raw.name"></v-list-item>
                </template>
            </v-autocomplete>
        </v-col>
        <v-col cols="4" lg="2" md="6">
            <v-btn color="primary" rounded="pill" :loading="loading" @click="fetchList()">
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
                <template v-if="item.source?.length">
                    <span class="d-block text-subtitle-1 text-success" style="max-width: 400px; white-space: initial">{{
                        item.source[0][6]
                    }}</span>
                </template>
                <span v-else class="text-clamp-1" style="white-space: initial">QualificationId: {{ item.QualificationId }}</span>
            </template>
            <template v-slot:item.answer="{ item }">
                <template v-if="item.source?.length">
                    <span class="d-block text-subtitle-1 text-success" v-for="(it, index) in item.source" :key="index">
                        <template v-if="it[4] === 'Range'">
                            {{ item.AnswerIds }}
                        </template>
                        <span v-else class="text-clamp-1" style="white-space: initial">{{ it[8] }}</span>
                    </span>
                </template>
                <span v-else style="white-space: initial">{{ item.AnswerIds }}</span>
            </template>
            <template v-slot:item.date="{ item }">
                <span>{{ item.UpdateTimeStamp }}</span>
            </template>
        </v-data-table>
    </div>
</template>
