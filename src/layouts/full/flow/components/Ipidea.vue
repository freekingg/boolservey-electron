<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { countries } from '@/utils/country';
import { generateRandomStringBase64, copyToClipboard } from '@/utils/helpers/index';
import Snackbar from '@/components/dashboards/snackbar.vue';
import { flow } from '@/config';
import * as XLSX from 'xlsx';

const snackbarRef: any = ref(null);
const dataForm = reactive({
    id: '',
    account: '',
    pasword: '',
    expire: 120,
    count: 10,
    countyCode: null
});

const flowContent = ref('');

onMounted(() => {
    let info = localStorage.getItem('flow_ipidea')
    if(info){
        let _info = JSON.parse(info)
        dataForm.account = _info.account
        dataForm.pasword = _info.pasword
        inputChangeHandle()
    }
});

const loading = ref(false);

const inputChangeHandle = () => {
    if (dataForm.account && dataForm.pasword) {
        let content = '';

        for (let i = 1; i <= dataForm.count; i++) {
            // region-us
            let region = '';
            if (dataForm.countyCode) {
                region = `-region-${dataForm.countyCode.toLowerCase()}`;
            }
            let randomStr = generateRandomStringBase64();
            content += `${flow['IPIDEA']['api']}:${flow['IPIDEA']['port']}:${dataForm.account}-zone-custom${region}-session-${randomStr}-sessTime-${dataForm.expire}:${dataForm.pasword}\n`;
        }

        flowContent.value = content.replace(/\n$/, "");;
    } else {
        flowContent.value = '';
    }
};

const exportHandle = () =>{
// 创建数据
const data = [
  ["name", "remark", "tab", "platform", "username", "password", "cookie", "proxytype", "proxy", "proxyurl", "proxyid", "ip", "countrycode", "ua", "resolution"],
];
if (flowContent.value) {
    const lines = flowContent.value.split('\n');
    lines.map((item,index:any)=>{
        data.push([index + 1, '','','','','','','Socks5',item,'','','','','',''])
    })
}
// 将数据转换为工作表
const worksheet = XLSX.utils.aoa_to_sheet(data);

// 创建一个工作簿
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// 导出为 .xlsx 文件
XLSX.writeFile(workbook, "IP模板.xlsx");
}

const copyHandle = () => {
    if (dataForm.account && dataForm.pasword) {
        localStorage.setItem('flow_ipidea', JSON.stringify(dataForm));
    }

    if (flowContent.value) {
        copyToClipboard(flowContent.value).then(() => {
            return snackbarRef.value?.open({
                type: 'success',
                timeout: 1000,
                title: '地址已复制',
                message: '请继续使用'
            });
        });
    }
};

</script>
<template>
    <Snackbar ref="snackbarRef" />
    <v-row class="mt-6">
        <v-col cols="12" lg="3" md="6">
            <v-text-field
                density="compact"
                v-model="dataForm.account"
                label="Account"
                hide-details
                variant="outlined"
                @update:modelValue="inputChangeHandle()"
                clearable
            ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3" md="6">
            <v-text-field
                density="compact"
                v-model="dataForm.pasword"
                label="Password"
                hide-details
                variant="outlined"
                @update:modelValue="inputChangeHandle()"
                clearable
            ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3" md="6">
            <v-autocomplete
                density="compact"
                clearable
                auto-select-first
                v-model="dataForm.countyCode"
                @update:modelValue="inputChangeHandle()"
                :items="countries"
                item-title="code"
                item-value="code"
                label="Country"
            >
                <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :key="item.raw.code" :subtitle="item.raw.code" :title="item.raw.name"></v-list-item>
                </template>
            </v-autocomplete>
        </v-col>
        <v-col cols="12" lg="3" md="6">
            <v-text-field
                density="compact"
                v-model="dataForm.expire"
                label="Expire Time"
                hide-details
                @update:modelValue="inputChangeHandle()"
                variant="outlined"
                clearable
            ></v-text-field>
        </v-col>
    </v-row>

    <div class="border-table">
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2" for="vmsg">Message</v-label>
            <VTextarea
                v-model="flowContent"
                auto-grow
                placeholder="Hi, here"
                rows="8"
                color="primary"
                row-height="25"
                shaped
                hide-details
                id="vmsg"
            ></VTextarea>
        </v-col>

        <v-row>
            <v-col cols="12" lg="2" md="6">
                <v-text-field
                    density="compact"
                    v-model="dataForm.count"
                    label="生成数量"
                    hide-details
                    variant="outlined"
                    @update:modelValue="inputChangeHandle()"
                    clearable
                ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="6">
                <v-btn color="primary" rounded="pill" class="ml-auto mr-1" :loading="loading" @click="copyHandle()"> Copy </v-btn>
                <v-btn color="primary" rounded="pill" class="ml-auto mr-1" :loading="loading" @click="inputChangeHandle()">
                    Refresh
                </v-btn>
                <v-btn color="primary" rounded="pill" class="ml-auto" @click="exportHandle" :loading="loading"> Export </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
