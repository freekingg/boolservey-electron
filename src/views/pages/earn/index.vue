<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { BrandGolangIcon, RobotIcon } from 'vue-tabler-icons';
import { Icon } from '@iconify/vue';
import { useSystemStore } from '@/stores/system/index';
import { copyToClipboard, isElectron } from '@/utils/helpers/index';
import { channelUrl } from '@/config';
import { createBrower, openBrower } from '@/utils/brower';
import user1 from '@/assets/images/svgs/33.svg';
import { encryptData } from '@/utils/helpers/crypto';
import Snackbar from '@/components/dashboards/snackbar.vue';
import Spinners from '@/components/Spinners.vue';

const snackbarRef: any = ref(null);
const store = useSystemStore();
const baseUrl = `${import.meta.env.VITE_API_URL}/`;
let loading = ref(false);
onMounted(() => {
    store
        .fetchList()
        .then(() => {
            loading.value = false;
        })
        .catch(() => {
            loading.value = false;
        });
});

const channel1: any = computed(() => {
    return store.chanels?.['1'];
});
const channel2: any = computed(() => {
    return store.chanels?.['2'];
});
const channel3: any = computed(() => {
    return store.chanels?.['3'];
});

// 启动方法
const startHandle = async (item: any, flag = true) => {
    return new Promise((resolve, reject) => {
        let url = channelUrl[item.open_type];
        loading.value = true;
        if (url && +item.open_type !== 3) {
            store.fetchUrl({ id: item.id, open_type: item.open_type }).then(({ code, data }) => {
                if (code === 0) {
                    let copyUrl = ``;
                    if (+item.open_type === 1 || +item.open_type === 2) {
                        copyUrl = `${channelUrl['common']}${data}`;
                        let rawData = {
                            l: copyUrl,
                            name: item.cname,
                            id: item.id,
                            c: item.cname,
                            open_type: item.open_type,
                            info: data,
                            star_num: item.star_num
                        };
                        let o = encryptData(JSON.stringify(rawData));
                        copyUrl = `${url}${encodeURIComponent(o)}`;
                    }
                    // open_type 直接复制
                    if (+item.open_type === 4) {
                        copyUrl = `${channelUrl['4']}${data}`;
                    }
                    resolve(copyUrl);
                    if (flag) {
                        copyToClipboard(`${copyUrl}`).then(() => {
                            return snackbarRef.value?.open({
                                type: 'success',
                                timeout: 1000,
                                title: '地址已复制',
                                message: '请在浏览器窗口打开继续'
                            });
                        });
                    }
                } else {
                    reject('获取链接失败');
                }
                loading.value = false;
            });
        }

        // 渠道二级列表
        if (+item.open_type === 3) {
            store.SET_CHANNEL(item);
            store.SET_CHANNEL_DRAWER();
            loading.value = false;
        }
    });
};

const bootHandle = async (item: any) => {
    console.log('item: ', item);
    loading.value = true;
    let browerRes: any = {};
    try {
        let countyCode = '';
        let ipcode = localStorage.getItem(`ipcode-${item.id}`);
        countyCode = ipcode || ''
        let tabUrl = await startHandle(item, false);
        let result: any = await createBrower({ ...item, open_urls: [tabUrl], countyCode: countyCode.toLowerCase() });
        snackbarRef.value?.open({
            type: 'success',
            timeout: 3000,
            title: '环境创建成功',
            message: '新窗口环境已创建成功， 正在打开中,请稍等...'
        });
        browerRes = result;
        loading.value = false;
    } catch (error) {
        snackbarRef.value?.open({
            type: 'error',
            timeout: 5000,
            title: '环境创建失败',
            message: `${error}`
        });
        loading.value = false;
        return;
    }
    try {
        await openBrower(browerRes.data?.id);
    } catch (error) {
        snackbarRef.value?.open({
            type: 'error',
            timeout: 5000,
            title: '环境打开失败',
            message: `${error}`
        });
    }
};
const afterEnterHandle = (card: any) => {
    let ipcode = localStorage.getItem(`ipcode-${card.id}`);
    if (ipcode) {
        card.ipcode = ipcode;
    }
};
const qutoHandle = (card: any, isActive: any) => {
    if (card.ipcode) {
        localStorage.setItem(`ipcode-${card.id}`, card.ipcode);
    } else {
        localStorage.removeItem(`ipcode-${card.id}`);
    }
    isActive.value = false;
};
</script>

<template>
    <Snackbar ref="snackbarRef" />
    <v-row class="justify-content-end mt-5">
        <v-col cols="12">
            <div class="d-sm-flex align-center mb-5">
                <h3 class="text-h3">
                    Internal chain surveys
                    <v-chip size="small" class="ml-2 elevation-0" variant="elevated" color="secondary">{{ channel1?.length }}</v-chip>
                </h3>
            </div>
            <v-row style="min-height: 220px">
                <Spinners v-if="!channel1?.length" />
                <v-col cols="12" md="4" sm="6" lg="3" v-for="(card, i) in channel1" :key="i">
                    <v-card elevation="10" class="card-hover overflow-hidden">
                        <v-card-item class="text-center d-flex align-center justify-center bg-lightprimary2 b-card-item">
                            <div class="mask-item">
                                <div class="mask-action">
                                    <template v-if="!loading">
                                        <v-btn size="large" icon variant="flat" color="primary" @click.stop="startHandle(card)">
                                            <BrandGolangIcon size="40" />
                                        </v-btn>
                                        <template v-if="isElectron()">
                                            <v-btn
                                                size="large"
                                                class="ml-3"
                                                icon
                                                variant="flat"
                                                color="success"
                                                @click.stop="bootHandle(card)"
                                            >
                                                <RobotIcon size="40" />
                                            </v-btn>
                                        </template>
                                    </template>
                                    <v-btn size="large" v-else icon variant="flat">
                                        <img width="55px" :src="user1" />
                                    </v-btn>
                                </div>
                            </div>
                            <div class="d-flex align-center justify-center py-2 px-4 rounded">
                                <v-img height="30" :src="baseUrl + card.img"></v-img>
                            </div>
                            <h4 class="text-h5 mt-3">{{ card.cname }}</h4>
                            <span class="text-truncate d-block gap-2 textSecondary">
                                <v-rating v-model="card.star_num" readonly size="x-small" color="#ffd600"></v-rating>
                            </span>
                        </v-card-item>
                        <v-divider />
                        <v-sheet class="bg-lightprimary px-4 py-2 d-flex align-center justify-center gap-2">
                            <v-btn color="primary" icon variant="text" class="text-facebook" size="x-small">
                                <BrandFacebookIcon size="16" />
                            </v-btn>
                            <v-btn color="primary" icon variant="text" class="text-instagram" size="x-small">
                                <BrandInstagramIcon size="16" />
                            </v-btn>
                            <v-btn color="primary" icon variant="text" class="text-github" size="x-small">
                                <Icon class="cursor-pointer" color="#0085db" icon="tabler:brand-tinder-filled" height="16" width="16" />
                                <v-dialog activator="parent" max-width="340" @afterEnter="afterEnterHandle(card)">
                                    <template v-slot:default="{ isActive }">
                                        <v-card prepend-icon="mdi-picture-in-picture-bottom-right" :title="card.cname">
                                            <v-card-item>
                                                <v-text-field
                                                    density="compact"
                                                    v-model="card.ipcode"
                                                    label="当前国家IP代码"
                                                    hide-details
                                                    variant="outlined"
                                                    class="mt-2"
                                                ></v-text-field>
                                            </v-card-item>
                                            <template v-slot:actions>
                                                <v-btn class="ml-auto" text="Save" @click="qutoHandle(card, isActive)"></v-btn>
                                            </template>
                                        </v-card>
                                    </template>
                                </v-dialog>
                            </v-btn>
                            <v-btn color="primary" icon variant="text" class="text-twitter" size="x-small">
                                <BrandTwitterIcon size="16" />
                            </v-btn>
                        </v-sheet>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <div class="d-sm-flex align-center mb-5">
                <h3 class="text-h3">
                    External chain surveys
                    <v-chip size="small" class="ml-2 elevation-0" variant="elevated" color="secondary">{{ channel2?.length }}</v-chip>
                </h3>
            </div>

            <v-row style="min-height: 100px">
                <Spinners v-if="!channel2?.length" />
                <v-col cols="12" md="4" sm="4" lg="2" v-for="(card, i) in channel2" :key="i">
                    <v-card elevation="10" class="card-hover overflow-hidden">
                        <v-card-item class="b-card-item text-center d-flex align-center justify-center bg-lightprimary2">
                            <div class="mask-item">
                                <div class="mask-action">
                                    <template v-if="!loading">
                                        <v-btn size="large" icon variant="flat" color="primary" @click.stop="startHandle(card)">
                                            <BrandGolangIcon size="40" />
                                        </v-btn>
                                        <template v-if="isElectron()">
                                            <v-btn
                                                size="large"
                                                class="ml-3"
                                                icon
                                                variant="flat"
                                                color="success"
                                                @click.stop="bootHandle(card)"
                                            >
                                                <RobotIcon size="40" />
                                            </v-btn>
                                        </template>
                                    </template>
                                    <v-btn size="large" v-else icon variant="flat">
                                        <img width="55px" :src="user1" />
                                    </v-btn>
                                </div>
                            </div>
                            <div class="d-flex align-center justify-center py-2 px-4 rounded">
                                <v-img height="30" :src="baseUrl + card.img"></v-img>
                            </div>
                            <h4 class="text-h5 mt-3 text-clamp">{{ card.cname }}</h4>
                            <span class="text-truncate d-block gap-2 textSecondary">
                                <v-rating :length="5" v-model="card.star_num" readonly size="x-small" color="#ffd600"></v-rating>
                            </span>
                        </v-card-item>
                        <v-divider />
                        <v-sheet class="bg-lightprimary px-4 py-2 d-flex align-center justify-center gap-2">
                            <v-btn color="primary" icon variant="text" class="text-facebook" size="x-small">
                                <BrandFacebookIcon size="16" />
                            </v-btn>
                            <v-btn color="primary" icon variant="text" class="text-instagram" size="x-small">
                                <BrandInstagramIcon size="16" />
                            </v-btn>
                            <v-btn color="primary" icon variant="text" class="text-github" size="x-small">
                                <Icon class="cursor-pointer" color="#0085db" icon="tabler:brand-tinder-filled" height="16" width="16" />
                                <v-dialog activator="parent" max-width="340" @afterEnter="afterEnterHandle(card)">
                                    <template v-slot:default="{ isActive }">
                                        <v-card prepend-icon="mdi-picture-in-picture-bottom-right" :title="card.cname">
                                            <v-card-item>
                                                <v-text-field
                                                    density="compact"
                                                    v-model="card.ipcode"
                                                    label="当前国家IP代码"
                                                    hide-details
                                                    variant="outlined"
                                                    class="mt-2"
                                                ></v-text-field>
                                            </v-card-item>
                                            <template v-slot:actions>
                                                <v-btn class="ml-auto" text="Save" @click="qutoHandle(card, isActive)"></v-btn>
                                            </template>
                                        </v-card>
                                    </template>
                                </v-dialog>
                            </v-btn>
                            <v-btn color="primary" icon variant="text" class="text-twitter" size="x-small">
                                <BrandTwitterIcon size="16" />
                            </v-btn>
                        </v-sheet>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12">
            <div class="d-sm-flex align-center mb-5">
                <h3 class="text-h3">
                    Pooled surveys
                    <v-chip size="small" class="ml-2 elevation-0" variant="elevated" color="secondary">{{ channel3?.length }}</v-chip>
                </h3>
            </div>

            <v-row>
                <v-col cols="12" md="4" sm="6" lg="2" v-for="(card, i) in channel3" :key="i">
                    <v-card elevation="10" class="card-hover overflow-hidden">
                        <v-card-item class="b-card-item text-center d-flex align-center justify-center bg-lightprimary2">
                            <div class="mask-item">
                                <div class="mask-action">
                                    <v-btn size="large" v-if="!loading" icon variant="flat" color="primary" @click.stop="startHandle(card)">
                                        <BrandGolangIcon size="40" />
                                    </v-btn>
                                    <v-btn size="large" v-else icon variant="flat">
                                        <img width="55px" :src="user1" />
                                    </v-btn>
                                </div>
                            </div>
                            <div class="d-flex align-center justify-center py-2 px-4 rounded">
                                <v-img height="30" :src="baseUrl + card.img"></v-img>
                            </div>
                            <h4 class="text-h5 mt-3">{{ card.cname.includes('Zamplia') ? 'JM' : card.cname }}</h4>
                            <span class="text-truncate d-block gap-2 textSecondary">
                                <v-rating v-model="card.star_num" readonly size="x-small" color="#ffd600"></v-rating>
                            </span>
                        </v-card-item>
                        <v-divider />
                        <v-sheet class="bg-lightprimary px-4 py-2 d-flex align-center justify-center gap-2">
                            <v-btn color="primary" icon variant="text" class="text-facebook" size="x-small">
                                <BrandFacebookIcon size="16" />
                            </v-btn>
                            <v-btn color="primary" icon variant="text" class="text-instagram" size="x-small">
                                <BrandInstagramIcon size="16" />
                            </v-btn>
                            <v-btn color="primary" icon variant="text" class="text-github" size="x-small">
                                <Icon class="cursor-pointer" color="#0085db" icon="tabler:brand-tinder-filled" height="16" width="16" />
                            </v-btn>
                            <v-btn color="primary" icon variant="text" class="text-twitter" size="x-small">
                                <BrandTwitterIcon size="16" />
                            </v-btn>
                        </v-sheet>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
.text-facebook {
    color: rgb(24, 119, 242) !important;
}

.text-instagram {
    color: rgb(215, 51, 109) !important;
}

.text-github {
    color: rgb(0, 96, 151) !important;
}

.text-twitter {
    color: rgb(28, 156, 234) !important;
}

.text-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    line-clamp: 1;
}
.b-card-item {
    position: relative;
}
.mask-item {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
    opacity: 0;
    transition: all 0.3s;
    z-index: 999;
}

.mask-action {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transform: translate(0px, -300px);
    transition: all 0.2s;
}

.b-card-item:hover {
    .mask-item {
        opacity: 1;
    }

    .mask-action {
        transform: translate(0, 0);
    }
}
</style>
