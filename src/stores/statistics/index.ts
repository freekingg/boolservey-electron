import { defineStore } from 'pinia';
// project imports
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const baseUrl = `${import.meta.env.VITE_API_URL}/api-v1`;

export const useStatisticsStore = defineStore({
    id: 'statistics',
    state: (): any => ({
        statistics: {
            time_data:{},
            round_chart:{},
            plat_form_chart:{},
            line_chart:{},
            rank: []
        }
    }),
    actions: {
        // 获取积分
        async fetchList() {
            try {
                const data: any = await fetchWrapper.get(`${baseUrl}/tongji`);
                this.statistics = data.data;
            } catch (error) {
                console.log(error);
            }
        },
         // 获取排行
         async fetchRank() {
            try {
                const data: any = await fetchWrapper.get(`${baseUrl}/rank?select=user&type=d`);
                this.rank = data.data || []
                return data
            } catch (error) {
                console.log(error);
                return error
            }
        }
    }
});
