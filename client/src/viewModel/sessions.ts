
import type { DataEnvelope } from "@/model/transportTypes";
import type { User } from "@/model/users";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import * as myFetch from "@/model/myFetch";


const session  = reactive({
    user: null as User | null,
    isLoading: 0,
});

export const refSession = () => session;

export function api<T>(action: string, data?: unknown, method?: string){
    session.isLoading++;
    return myFetch.api<T>(action, data, method)
    .then(x=>{
        if(!x.isSuccess){
            showError(x);
        }
        return x;
    })
    .catch(showError)
    .finally(() => session.isLoading--);
}

export function showError(error: any){
    console.error(error);
    alert(error.message || error);

}