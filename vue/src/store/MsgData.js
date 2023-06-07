import axios from "axios";
import { defineStore } from "pinia";

export const useMsgDataStore = defineStore('msgData', {
    state: () => ({
        data: {}
    }),
    getters: {},
    actions: {
        async getData(){
            await axios.get('http://localhost:3000/msg')
        }
    }
})