<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useSystemStore } from '@/stores/system/index';
import { channelUrl } from '@/config';
import { copyToClipboard, debounce, getTimeByRegion, sortByName, getRandomItems,isElectron } from '@/utils/helpers/index';
import { encryptData } from '@/utils/helpers/crypto';
import { createBrower, openBrower } from '@/utils/brower';
import Spinners from '@/components/Spinners.vue';
import { useQuotaStore } from '@/stores/quota';
const quota = useQuotaStore();
const emit = defineEmits(['snackbarEvent']);

const store = useSystemStore();
const defaultParams = reactive({
    page: 1,
    limit: 15,
    countryCode: '',
    amount: '',
    img: '',
    cname: '',
    id: ''
});

let platName: any = ref('');
const channel: any = computed(() => {
    return store.current_channel;
});

let total = ref(0);

const channelList = ref([]);
const searchData = ref([]);
const pageData = ref([]);
let bool = ref(false);
onMounted(() => {
    let boolLocal = localStorage.getItem('bool');
    if (boolLocal) {
        bool.value = true;
    } else {
        bool.value = false;
    }
    initHandle();
});

let sagoData = ref({});
const initHandle = () => {
    loading.value = true;
    defaultParams.id = '';
    defaultParams.cname = '';
    defaultParams.countryCode = '';
    store.fetchSubList(channel.value.id).then((result) => {
        if (result && result.data.length) {
            if (!bool.value) {
                let excludeSagoData = filterExcludeSagoHandle(result.data);
                channelList.value = sortByName(excludeSagoData, 'cname');
                let sagos = filterSagoHandle(result.data, 'US');
                sagoData.value = sagos;
                searchData.value = formatChannelData(channelList.value);
                total.value = channelList.value.length;
                Object.keys(sagoData.value).forEach((key) => {
                    let allowedCountries = ['US', 'AU', 'DE'];
                    if (allowedCountries.includes(key)) {
                        let appData = {
                            id: 'Sago Surveys',
                            open_type: 2,
                            pay: '-',
                            cname: 'Sago Surveys',
                            star_num: '5',
                            code: key,
                            url: '',
                            img: 'https://adfetch.notik.me/img/sago_logo.jpeg',
                            count: sagoData.value[key].length
                        };
                        searchData.value.unshift(appData);
                        channelList.value.unshift(appData);
                    }
                });
            } else {
                channelList.value = sortByName(result.data, 'cname');
                total.value = channelList.value.length;
                searchData.value = formatChannelData(channelList.value);
            }
            platName.value = result.plat_name;
            onPageChange(1);
        }
        loading.value = false;
    }).catch(err=>{
        console.log('err---: ', err);

    })
};

const loading = ref(false);
const onPageChange = async (pageNumber: number) => {
    loading.value = true;
    defaultParams.page = pageNumber;
    const startIndex = (pageNumber - 1) * defaultParams.limit;
    pageData.value = searchData.value.slice(startIndex, startIndex + defaultParams.limit);
    loading.value = false;
};

const handleSortBy = (items) => {
    let sortBy = '';
    let sortDirection = 'asc';
    if (items.length) {
        sortBy = items[0]['key'];
        sortDirection = items[0]['order'];
    }
    if (sortDirection === 'asc') {
        searchData.value = searchData.value.sort((a, b) => a[sortBy] - b[sortBy]);
    } else {
        searchData.value = searchData.value.sort((a, b) => b[sortBy] - a[sortBy]);
    }
    onPageChange(1);
};

const formatChannelData = (data: any) => {
    let result = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.img.includes('sago_logo')) {
            element.tagname = `${element.cname}-Sago`;
        } else if (element.img.includes('innovate_logo')) {
            element.tagname = `${element.cname}-Innovate`;
        } else {
            element.tagname = `${element.cname}`;
        }
        result.push(element);
    }
    return result;
};

const groupByCode = (data) => {
    return data.reduce((acc, curr) => {
        if (!acc[curr.code]) {
            acc[curr.code] = [];
        }
        acc[curr.code].push(curr);
        return acc;
    }, {});
};

// 将指定国家的sogo过滤
const filterSagoHandle = (list: any[], _countryCode = '') => {
    let sagoData = list.filter((item) => item.cname.includes('Sago'));
    let result = groupByCode(sagoData);
    return result;
};

// 过滤sogo之外的渠道
const filterExcludeSagoHandle = (list: any[], _countryCode = '') => {
    let result = list.filter((item) => !item.cname.includes('Sago'));
    return result;
};

let key: any = ref(1);
const length: any = computed(() => {
    let total = searchData.value.length || 0;
    key += 1;
    return Math.ceil(total / 15);
});

const headers: any = ref([
    { title: 'Id', key: 'id', sortable: false },
    { title: 'Icon', key: 'img', sortable: false },
    { title: 'Name', key: 'cname', sortable: false },
    { title: 'Count', key: 'count', sortable: false },
    { title: 'Points', key: 'pay' },
    { title: 'Star Level', key: 'rating' },
    { title: 'Code', key: 'code' },
    { title: 'Action', key: 'action', sortable: false }
]);

const copyHandle = (value: any) => {
    copyToClipboard(`${value}`).then((_result) => {
        emit('snackbarEvent', { title: '复制成功', message: '请在新窗口环境中进行使用' });
    });
};

const quotaHandle = (item: any) => {
    let type = '';
    let id = '';
    let countyCode = '';
    if (item.img.includes('sago')) {
        type = 'SAGO';
        let ids = item.id.split('-');
        id = ids[0];
        countyCode = item.code;
    } else if (item.img.includes('innovate')) {
        type = 'INN';
        let ids = item.id.split('-');
        id = ids[0];
        countyCode = item.code;
    }
    if (type) {
        quota.SET_QAUOTA({ type, id, countyCode });
        quota.SET_CUSTOMIZER_DRAWER(!quota.quota_drawer);
    }
};

const bootHandle = async (item: any) => {
    item.loading = true;
    let browerRes:any = {}
    try {
        let tabUrl = await startHandle(item, false);
        let result: any = await createBrower({ ...item, open_urls: [tabUrl], countyCode: item.code });
        emit('snackbarEvent', { title: '环境创建成功', timeout: 3000, message: '新窗口环境已创建成功， 正在打开中,请稍等...' });
        browerRes = result
        item.loading = false;
    } catch (error) {
        emit('snackbarEvent', { type: 'error', timeout: 5000, title: '环境创建失败', message: `${error}` });
        item.loading = false;
        return
    }
    try {
        await openBrower(browerRes.data?.id);
    } catch (error) {
        emit('snackbarEvent', { type: 'error', timeout: 5000, title: '环境打开失败', message: `${error}` });
    }
};

const startHandle = async (item: any, flag = true) => {
    return new Promise((resolve, reject) => {
        let url = channelUrl[item.open_type];
        item.loading = true;
        let params = {
            id: item.id,
            open_type: item.open_type,
            cname: platName.value
        };

        if (item.cname.includes('Sago')) {
            if (!bool.value) {
                let ids = getRandomItems(sagoData.value[item.code], 200).map((channel) => channel.id);
                params.id = ids;
            } else {
                params.id = [item.id];
            }
        }
        store.fetchUrl(params).then(({ code, data }) => {
            if (code === 0) {
                let copyUrl = ``;
                if (+item.open_type === 1 || +item.open_type === 2) {
                    copyUrl = `${channelUrl['common']}${data}?cname=${platName.value}`;
                    let rawData = {
                        l: copyUrl,
                        name: item.cname,
                        id: item.cname.includes('Sago') ? 'Sago Surveys' : item.id,
                        c: platName.value,
                        open_type: item.open_type,
                        code: item.code
                    };
                    let o = encryptData(JSON.stringify(rawData));
                    copyUrl = `${url}${encodeURIComponent(o)}`;
                }
                resolve(copyUrl);
                if (flag) {
                    copyHandle(copyUrl);
                }
            } else {
                reject('获取链接失败');
            }
            item.loading = false;
        });
    });
};

const searchHandle = debounce(() => {
    let filters: any = {};
    if (defaultParams.id) {
        filters.id = defaultParams.id;
    }
    if (defaultParams.countryCode) {
        filters.code = defaultParams.countryCode;
    }
    if (defaultParams.cname) {
        filters.tagname = defaultParams.cname;
    }
    let result = channelList.value.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            const itemValue = item[key];

            // 模糊匹配字符串，不区分大小写
            if (typeof itemValue === 'string' && typeof value === 'string') {
                return itemValue.toLowerCase().includes(value.toLowerCase());
            }

            // 其他情况按严格等于匹配
            return itemValue === value;
        });
    });
    total.value = result.length;
    searchData.value = result;
    onPageChange(1);
}, 500);
</script>
<template>
    <v-row justify="space-between" class="pt-1">
        <v-col cols="12" lg="3" md="6">
            <v-text-field
                density="compact"
                v-model="defaultParams.id"
                @update:modelValue="searchHandle"
                label="ID"
                hide-details
                variant="outlined"
                clearable
            ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3" md="6">
            <v-text-field
                density="compact"
                v-model="defaultParams.cname"
                @update:modelValue="searchHandle"
                label="Name"
                hide-details
                variant="outlined"
                clearable
            ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3" md="6">
            <v-text-field
                density="compact"
                v-model="defaultParams.countryCode"
                @update:modelValue="searchHandle"
                label="Country Code"
                hide-details
                variant="outlined"
                clearable
            ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3" md="6">
            <v-btn color="primary" rounded="pill" class="ml-auto" @click="initHandle()">
                <v-icon class="mr-2">mdi-magnify</v-icon>Refresh
            </v-btn>
        </v-col>
    </v-row>
    <div class="border-table">
        <perfect-scrollbar style="height: calc(100vh - 260px)" class="mt-6 pt-4">
            <v-data-table
                :headers="headers"
                :items="pageData"
                items-per-page="15"
                item-value="product"
                :loading="loading"
                @update:sort-by="handleSortBy"
            >
                <template v-slot:loading>
                    <Spinners />
                </template>
                <template v-slot:item.id="{ item }">
                    <span style="width: 100px; cursor: pointer" @click="copyHandle(item.id)" class="text-subtitle-1 text-clamp-1">{{
                        item.id
                    }}</span>
                </template>
                <template v-slot:item.img="{ item }">
                    <v-img height="50" :src="item.img" aspect-ratio="16/9"></v-img>
                </template>
                <template v-slot:item.cname="{ item }">
                    <span style="width: 150px" class="text-subtitle-1 text-clamp-1">{{ item.cname }}</span>
                </template>
                <template v-slot:item.count="{ item }">
                    <span style="width: 80px" class="text-subtitle-1 text-clamp-1">{{ item.count || '-' }}</span>
                </template>
                <template v-slot:item.pay="{ item }">
                    <span style="width: 100px" class="text-clamp-1 text-indigo">{{ item.pay }}</span>
                </template>
                <template v-slot:item.rating="{ item }">
                    <v-rating v-model="item.star_num" readonly size="18" color="#ffd600"></v-rating>
                </template>
                <template v-slot:item.code="{ item }">
                    <div style="width: 100px" class="text-subtitle-1 text-clamp-1">
                        <span style="width: 180px" class="text-success">{{ item.code }} </span>
                        <span> ({{ getTimeByRegion(item.code) }})</span>
                    </div>
                </template>
                <template v-slot:item.action="{ item }">
                    <div>
                        <v-btn
                            color="success"
                            :loading="item.loading"
                            @click.stop="startHandle(item)"
                            size="small"
                            rounded="pill"
                            variant="tonal"
                            class="ml-auto mr-3"
                        >
                            复制
                        </v-btn>
                        <v-btn
                            color="danger"
                            :loading="item.loading"
                            @click.stop="quotaHandle(item)"
                            size="small"
                            rounded="pill"
                            variant="tonal"
                            class="mr-3"
                        >
                            配额
                        </v-btn>
                        <v-btn
                            color="primary"
                            :loading="item.loading"
                            @click.stop="bootHandle(item)"
                            size="small"
                            rounded="pill"
                            variant="tonal"
                            v-if="isElectron()"
                        >
                            启动
                        </v-btn>
                    </div>
                </template>
                <template v-slot:bottom> </template>
            </v-data-table>
        </perfect-scrollbar>
        <div class="d-sm-flex align-center mt-3">
            <div class="text-subtitle-1 text-grey100">
                <span>Total {{ total }} entries, </span>
            </div>
            <div>
                <v-pagination
                    v-model="defaultParams.page"
                    density="compact"
                    :key="key"
                    :total-visible="7"
                    @update:modelValue="onPageChange"
                    :length="length"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>
