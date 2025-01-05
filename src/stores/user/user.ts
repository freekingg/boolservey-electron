import { defineStore } from 'pinia';
// project imports
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const baseUrl = `${import.meta.env.VITE_API_URL}/api-v1`;


interface taskType {
    points: any;
    list: any;
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): taskType => ({
        points: '0.00',
        list: []
    }),
    actions: {
        // 获取积分
        async fetchPoints() {
            try {
                const data: any = await fetchWrapper.get(`${baseUrl}/record?g=true`);
                this.points = data.data?.user_pay;
                this.list = data.data.list;
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }
});
