import axios from "axios";
import { defineStore } from "pinia";

export const useBaseDateStore = defineStore('basedate', {
    state: () => ({
        baseData: [],
        totalItems: 0,
        showData: {}
    }),
    getter: {},
    actions: {
        async dataReq() {
            let res = await axios.get('http://localhost:3000/baseinfo')
                .catch(err => {
                    console.log(err);
                })

            this.totalItems = res.data.totalItems
            this.baseData = res.data.msg
        },
        async reviseDate(medi, path) {
            if (path === 'update') {
                await axios.post('http://localhost:3000/baseinfo/' + path, {
                    medi
                }).catch(err => {
                    console.log(err);
                })
            } else if (path === 'insert') {
                await axios.put('http://localhost:3000/baseinfo/' + path,
                    {
                        medi
                    }
                ).catch(err => {
                    console.log(err);
                })
            }


            await this.dataReq()
        },
        async deleteDate(item) {
            await axios.delete('http://localhost:3000/baseinfo/delete', {
                data: {
                    item
                }
            }).catch(err => {
                console.log(err);
            })

            await this.dataReq()
        },
        async dataTyping(type) {
            if (type === 'all') {
                return this.dataReq()
            }
            const res = await axios.get('http://localhost:3000/baseinfo/typing', {
                params: {
                    type
                }
            }).catch(err => { console.log(err); })

            this.totalItems = res.data.totalItems
            this.baseData = res.data.msg
        },
        giveShowData(item) {
            this.showData = { ...item }
        }
    }
})