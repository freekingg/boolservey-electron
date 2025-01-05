import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { parseJwt } from '@/utils/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/api-v1`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username: string, password: string, url:string) {
            const {code,data,msg} = await fetchWrapper.post(`${baseUrl}/member/login`, { url, user_name: username, password });
            let user:any = {};
            // update pinia state
            if(code === 0 && data){
                let access_token = data.access_token
                user = parseJwt(access_token)
                let userInfo = {
                    token:access_token,
                    ...user,
                    ...user.extend
                }
                delete userInfo.extend;
                this.user = userInfo;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(userInfo));
                // redirect to previous url or default to home page
                // router.push(this.returnUrl || '/dashboard1');
                router.push(this.returnUrl || '/dashboard')
                return {code,msg}
            }else{
                return {code,msg}
            }
          
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        },
        async updatePerson(body:any) {
            return fetchWrapper.post(`${baseUrl}/member/edit`, body);
        },
        async updatePassword(body:any) {
            return fetchWrapper.post(`${baseUrl}/member/edit`, body);
        }
    }
});
