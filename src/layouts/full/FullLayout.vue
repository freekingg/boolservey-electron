<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { RouterView } from 'vue-router';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import HorizontalHeader from './horizontal-header/HorizontalHeader.vue';
import HorizontalSidebar from './horizontal-sidebar/HorizontalSidebar.vue';
import Customizer from './customizer/Customizer.vue';
import Quota from './quota/Quota.vue';
import SubChannel from './sub-channel/SubChannel.vue';
import Flow from './flow/Flow.vue';
import { LifebuoyIcon } from 'vue-tabler-icons';
import { useCustomizerStore } from '../../stores/customizer';
import { useQuotaStore } from '../../stores/quota';
const customizer = useCustomizerStore();
const quota = useQuotaStore();

import { useUserStore } from '@/stores/user/user';
import { useAuthStore } from '@/stores/auth';

let gTimer: any = null;

const userStore = useUserStore();
onMounted(() => {
    clearInterval(gTimer);
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    if (isLoggedIn) {
        fetchPointsHandle()
    }
});

const fetchPointsHandle = ()=>{
    userStore.fetchPoints().then((_r) => {
        setTimeout(() => {
            fetchPointsHandle()
        }, 15000);
    }).catch(() => {
        setTimeout(() => {
            fetchPointsHandle()
        }, 15000);
    });
}

onUnmounted(() => {
    clearInterval(gTimer);
});
</script>

<template>
    <!-----RTL LAYOUT------->
    <v-locale-provider v-if="customizer.setRTLLayout" rtl>
        <v-app
            :theme="customizer.actTheme"
            :class="[
                customizer.actTheme,
                customizer.mini_sidebar ? 'mini-sidebar' : '',
                customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
                customizer.setBorderCard ? 'cardBordered' : ''
            ]"
        >
            <!---Customizer location left side--->
            <v-navigation-drawer
                app
                temporary
                elevation="10"
                location="left"
                v-model="customizer.Customizer_drawer"
                width="320"
                class="left-customizer"
            >
                <Customizer />
            </v-navigation-drawer>

            <VerticalSidebarVue v-if="!customizer.setHorizontalLayout" />
            <div :class="customizer.boxed ? 'maxWidth' : 'full-header'"><VerticalHeaderVue v-if="!customizer.setHorizontalLayout" /></div>
            <div :class="customizer.boxed ? 'maxWidth' : 'full-header'"><HorizontalHeader v-if="customizer.setHorizontalLayout" /></div>
            <HorizontalSidebar v-if="customizer.setHorizontalLayout" />

            <v-main>
                <div class="rtl-lyt mb-3 hr-layout">
                    <v-container fluid class="page-wrapper bg-background px-sm-5 px-4 pt-12 rounded-xl">
                        <div class="">
                            <div :class="customizer.boxed ? 'maxWidth' : ''">
                                <RouterView />
                                <v-btn
                                    class="customizer-btn"
                                    size="large"
                                    icon
                                    variant="flat"
                                    color="primary"
                                    @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)"
                                >
                                    <SettingsIcon />
                                </v-btn>
                            </div>
                        </div>
                    </v-container>
                </div>
            </v-main>
        </v-app>
    </v-locale-provider>

    <!-----LTR LAYOUT------->
    <v-locale-provider v-else>
        <v-app
            :theme="customizer.actTheme"
            :class="[
                customizer.actTheme,
                customizer.mini_sidebar ? 'mini-sidebar' : '',
                customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
                customizer.setBorderCard ? 'cardBordered' : ''
            ]"
        >
            <!---Customizer location right side--->
            <v-navigation-drawer app temporary elevation="10" location="right" v-model="customizer.Customizer_drawer" width="320">
                <Customizer />
            </v-navigation-drawer>
            <!---配额查询--->
            <!-- <v-navigation-drawer
                app
                elevation="10"
                location="right"
                v-model="quota.quota_drawer"
                :width="drawerWidth"
                class="left-customizer"
                :style="{ zIndex: 9999 }"
               
            > -->
                <Quota />
            <!-- </v-navigation-drawer> -->


            <!---子渠道查询--->
            <SubChannel />
            <Flow />

            <VerticalSidebarVue v-if="!customizer.setHorizontalLayout" />
            <div :class="customizer.boxed ? 'maxWidth' : 'full-header'"><VerticalHeaderVue v-if="!customizer.setHorizontalLayout" /></div>
            <div :class="customizer.boxed ? 'maxWidth' : 'full-header'"><HorizontalHeader v-if="customizer.setHorizontalLayout" /></div>
            <HorizontalSidebar v-if="customizer.setHorizontalLayout" />

            <v-main>
                <div class="mb-3 hr-layout">
                    <v-container fluid class="page-wrapper bg-background px-sm-5 px-4 pt-12 rounded-xl">
                        <div class="">
                            <div :class="customizer.boxed ? 'maxWidth' : ''">
                                <RouterView />
                                <v-btn
                                    class="customizer-btn"
                                    size="large"
                                    icon
                                    variant="flat"
                                    color="primary"
                                    style="z-index: 9998 !important;"
                                    @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)"
                                >
                                    <SettingsIcon />

                                    <!-- 配额 -->
                                    <v-btn
                                        class="customizer-btn"
                                        size="large"
                                        icon
                                        variant="flat"
                                        color="primary"
                                       
                                        @click.stop="quota.SET_CUSTOMIZER_DRAWER(!quota.quota_drawer)"
                                    >
                                        <LifebuoyIcon />
                                    </v-btn>
                                </v-btn>
                            </div>
                        </div>
                    </v-container>
                </div>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
