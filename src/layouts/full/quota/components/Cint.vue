<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import Snackbar from '@/components/dashboards/snackbar.vue';
import loadingSvg from '@/assets/images/svgs/33.svg';
const snackbarRef: any = ref(null);
const baseUrl = `${import.meta.env.VITE_API_URL}/api-v1`;

const result = ref([]);
const countryRes = ref([]);

const dataForm1: any = ref({ order: {} });

const dataForm = reactive({
    id: '',
    county: '',
    countyCode: null
});

onMounted(() => {});

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
        const dataRes: any = await fetchWrapper.get(`${baseUrl}/exter/survey/${dataForm.countyCode.toUpperCase()}/${dataForm.id}`);
        dataForm1.value = dataRes.data?.surveys;
        const countrisRes: any = await fetchWrapper.get(`${baseUrl}/exter/country/${dataForm.countyCode.toUpperCase()}/${dataForm.id}`);
        countryRes.value = countrisRes.data;

        let quotas = dataRes.data?.surveys.quotas || [];
        let quotasTable = [];
        for (let index = 0; index < quotas.length; index++) {
            const element = quotas[index];
            let obj = {
                remaining_completes: element.remaining_completes,
                age: element.conditions.age.toString(),
                gender: matchRegion('gender', element.conditions.gender),
                region1: matchRegion('region1', element.conditions.region1),
                region2: matchRegion('region2', element.conditions.region2),
                education: matchRegion('education_level', element.conditions.education_level),
                company_department: matchRegion('company_department', element.conditions.company_department),
                standard_b2b_decision_maker: matchRegion('standard_b2b_decision_maker', element.conditions.standard_b2b_decision_maker)
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

const matchRegion = (key = '', keys = []) => {
    let target = countryRes.value.find((item) => item.name === key);
    let result = [];
    if (target) {
        let answers = target.answers || [];
        for (let index = 0; index < keys.length; index++) {
            const element1 = keys[index];
            for (let index2 = 0; index2 < answers.length; index2++) {
                const element2 = answers[index2];
                if (+element1 === element2.answer_id) {
                    result.push(element2);
                }
            }
        }
    }
    return result;
};

const headers = ref([
    { title: '剩余配额', key: 'remaining_completes' },
    { title: '详情', key: 'detail' }
]);

</script>
<template>
    <Snackbar ref="snackbarRef" />
    <v-row class="mt-6 d-flex">
        <v-col cols="12" lg="2" md="3">
            <v-text-field v-model="dataForm.id" label="Survey Id" hide-details density="default" clearable></v-text-field>
        </v-col>
        <v-col cols="12" lg="2" md="3">
            <v-text-field v-model="dataForm.countyCode" label="Country No" hide-details density="default" clearable></v-text-field>
        </v-col>
        <v-col cols="4" lg="2" md="3">
            <v-btn color="primary" rounded="pill" :loading="loading" @click="fetchList()">
                <v-icon class="mr-2">mdi-magnify</v-icon>Search
            </v-btn>
        </v-col>
    </v-row>

    <div class="border-table">
        <div class="mt-1">
            <v-row>
                <v-col cols="12" md="2" lg="1">
                    <v-label class="mb-2 font-weight-medium">LOI</v-label>
                    <v-text-field color="primary" variant="underlined" type="text" disabled v-model="dataForm1.order.loi" hide-details />
                </v-col>
                <v-col cols="12" md="2" lg="1">
                    <v-label class="mb-2 font-weight-medium">IR</v-label>
                    <v-text-field color="primary" variant="underlined" disabled type="text" v-model="dataForm1.order.ir" hide-details />
                </v-col>
                <v-col cols="12" md="2" lg="1">
                    <v-label class="mb-2 font-weight-medium">供应商剩余</v-label>
                    <v-text-field
                        color="primary"
                        variant="underlined"
                        disabled
                        type="email"
                        v-model="dataForm1.remaining_completes"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" lg="6">
                    <v-label class="mb-2 font-weight-medium">平台类型 </v-label>
                    <v-text-field
                        color="primary"
                        variant="underlined"
                        disabled
                        type="email"
                        v-model="dataForm1.platform_types"
                        hide-details
                    ></v-text-field>
                </v-col>
            </v-row>
        </div>

        <v-data-table :headers="headers" :items="result" height="calc(100vh - 400px)" :loading="loading" fixed-header hide-default-footer>
            <template v-slot:loading>
                <img width="100px" :src="loadingSvg" />
            </template>
            <template v-slot:item.remaining_completes="{ item }">
                <span style="width: 100px" class="text-clamp-1 text-error">{{ item.remaining_completes }}</span>
            </template>
            <template v-slot:item.detail="{ item }">
               <div style="max-width: 900px">
                <span class="d-block text-subtitle-1" style="white-space: break-spaces">
                    年龄: <span class="text-success"> {{ item.age }}</span>
                </span>
                <div class="d-block text-subtitle-1" v-for="(it, index) in item.region1"  :key="index">
                    Region1: <span class="text-success">{{ it.answer }}</span>
                </div>
                <div class="d-block text-subtitle-1" v-for="(it, index) in item.region2"  :key="index">
                    Region2: <span class="text-success">{{ it.answer }}</span>
                </div>

                <template v-if="item.education.length">
                    教育:
                    <span class="text-subtitle-1" v-for="(it, index) in item.education"  :key="index">
                        <span class="text-success">{{ it.answer }}，</span>
                    </span>
                </template>

                <template v-if="item.gender.length">
                    性别:
                    <span class="text-subtitle-1" v-for="(it, index) in item.gender"  :key="index">
                        <span class="text-success">{{ it.answer }}，</span>
                    </span>
                </template>

                <template v-if="item.company_department.length">
                    公司部门:
                    <span class="text-subtitle-1" v-for="(it, index) in item.company_department"  :key="index">
                        <span class="text-success">{{ it.answer }}，</span>
                    </span>
                </template>

                <template v-if="item.standard_b2b_decision_maker.length">
                    决策部门:
                    <span class="text-subtitle-1" v-for="(it, index) in item.standard_b2b_decision_maker"  :key="index">
                        <span class="text-success">{{ it.answer }}，</span>
                    </span>
                </template>
               </div>
            </template>
        </v-data-table>
    </div>
</template>
