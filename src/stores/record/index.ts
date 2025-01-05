import { defineStore } from 'pinia';
// project imports
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const baseUrl = `${import.meta.env.VITE_API_URL}/api-v1`;


interface taskType {
    statistics: any;
    list: any[];
}

export const useRecordStore = defineStore({
    id: 'record',
    state: (): taskType => ({
        statistics: {total:0},
        list: []
    }),
    actions: {
        // 获取积分
        async fetchList(params: any) {
            // 构造带参数的 URL
            const url = new URL(`${baseUrl}/member/record`);
            Object.keys(params).forEach((key: string) => url.searchParams.append(key, params[key] || ''));
            try {
                const data: any = await fetchWrapper.get(`${url}`);
                this.statistics = {
                    total:data.data.total,
                    total_money:data.data.total_money,
                };
                this.list = data.data.list || [];
                return this.list
            } catch (error) {
                console.log(error);
            }
        }
    }
});
