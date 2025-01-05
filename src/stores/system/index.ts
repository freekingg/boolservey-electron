import { defineStore } from 'pinia';
// project imports
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const baseUrl = `${import.meta.env.VITE_API_URL}/api-v1`;


interface taskType {
    points: any;
    chanels: any;
    channel_drawer: boolean;
    current_channel: any;
    notis: any;
}

export const useSystemStore = defineStore({
    id: 'system',
    state: (): taskType => ({
        points: '0.00',
        chanels: {},
        channel_drawer: false,
        current_channel: {},
        notis: []
    }),
    actions: {
        SET_CHANNEL_DRAWER() {
            this.channel_drawer = !this.channel_drawer;
        },
        SET_CHANNEL(payload: any) {
            this.current_channel = payload;
            return true
        },
        // 获取渠道
        async fetchList() {
            try {
                const data: any = await fetchWrapper.get(`${baseUrl}/problem/index`);
                this.chanels = data.data;
            } catch (error) {
                console.log(error);
            }
        },
        // 获取子渠道
        async fetchSubList(id: string) {
            try {
                const data: any = await fetchWrapper.get(`${baseUrl}/problem/list?id=${id}`);
                return data.data
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        // 获取积分
        async fetchUrl(body: any) {
            try {
                const data: any = await fetchWrapper.post(`${baseUrl}/problem/getUrl`, body);
                return data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        // 获取通知
        async fetchNotis() {
            try {
                const data: any = await fetchWrapper.get(`${baseUrl}/affiche`);
                this.notis = data.data;
                return data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        // 获取通知
        async fetchNotisDetail(id: string) {
            try {
                const data: any = await fetchWrapper.get(`${baseUrl}/affiche_read?id=${id}`);
                return data.data;
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    }
});
