<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useRecordStore } from '@/stores/record/index';
import loadingSvg from '@/assets/images/svgs/33.svg';
import { timestampToTime } from '@/utils/helpers/index';

const store = useRecordStore();

const defaultParams = reactive({
    page: 1,
    limit: 15,
    status: '',
    nickname: ''
});

onMounted(() => {
    store.fetchList(defaultParams);
});
const list: any = computed(() => {
    return store.list;
});

const statistics: any = computed(() => {
    return store.statistics;
});

let key: any = ref(1);
const length: any = computed(() => {
    let total = statistics.value.total || 0;
    key += 1;
    return Math.ceil(total / 15);
});

const loading = ref(false);
const onPageChange = async (number: number) => {
    loading.value = true;
    defaultParams.page = number;
    await store.fetchList(defaultParams);
    loading.value = false;
};

// const rolesbg = ref(['primary', 'secondary', 'error', 'success', 'warning']);
const rolesbg: any = ref({
    1: {
        color: 'primary',
        label: '答题完成'
    }
});

const headers:any = ref([
    { title: 'Account', key: 'user_name' },
    { title: 'Name', key: 'nickname' },
    { title: 'Platform', key: 'platform_name', width: '100px' },
    { title: 'Platform Id', key: 'offerid' },
    { title: 'Points', key: 'pay' },
    { title: 'Status', key: 'status' },
    { title: 'IP', key: 'ip' },
    { title: 'Time', key: 'create_time' }
]);

const items = ref([{ title: '答题完成', value: '1' }]);
</script>
<template>
    <v-row justify="space-between">
        <v-col cols="12" lg="4" md="6">
            <v-text-field
                density="compact"
                v-model="defaultParams.nickname"
                label="Search Account"
                hide-details
                variant="outlined"
                clearable
            ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4" md="6">
            <v-select
                density="compact"
                clearable
                v-model="defaultParams.status"
                :items="items"
                label="Select Status"
                hide-details
            ></v-select>
        </v-col>
        <v-col cols="12" lg="4" md="6">
            <v-btn color="primary" rounded="pill" class="ml-auto" @click="onPageChange(1)">
                <v-icon class="mr-2">mdi-magnify</v-icon>Search
            </v-btn>
        </v-col>
    </v-row>
    <div class="border-table">
        <v-data-table
            :headers="headers"
            :items="list"
            items-per-page="15"
            item-value="product"
            height="calc(100vh - 300px)"
            :loading="loading"
            fixed-header
        >
            <template v-slot:loading>
                <img width="100px" :src="loadingSvg" />
            </template>
            <template v-slot:item.offerid="{ item }">
                <span style="width: 100px" class="text-clamp-1">{{ (item as any).offerid }}</span>
            </template>
            <template v-slot:item.pay="{ item }">
                <span class="text-subtitle-1 text-success">{{ (item as any).pay }}</span>
            </template>
            <template v-slot:item.status="{ item }">
                <v-chip variant="flat" :color="rolesbg[(item as any).status]['color']" size="small" label>{{
                    rolesbg[(item as any).status]['label']
                }}</v-chip>
            </template>
            <template v-slot:item.ip="{ item }">
                <span style="width: 100px" class="text-clamp-1">{{ (item as any).ip }}</span>
            </template>
            <template v-slot:item.create_time="{ item }">
                <span class="text-subtitle-1 text-info">{{ timestampToTime((item as any).create_time) }}</span>
            </template>
            <template v-slot:bottom>
                <div class="d-sm-flex justify-md-space-between align-center mt-3">
                    <div class="text-subtitle-1 text-grey100">
                        <span>Total {{ statistics.total }} entries, </span>
                        <span
                            >Points <strong class="text-success">{{ statistics.total_money }}</strong></span
                        >
                    </div>

                    <div>
                        <v-pagination
                            v-model="defaultParams.page"
                            rounded="circle"
                            density="compact"
                            :key="key"
                            @update:modelValue="onPageChange"
                            :length="length"
                        ></v-pagination>
                    </div>
                </div>
            </template>
        </v-data-table>
    </div>
</template>
