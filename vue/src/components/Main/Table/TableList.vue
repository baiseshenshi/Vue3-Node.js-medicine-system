<script setup>
import { onBeforeMount, ref, watch, watchEffect } from 'vue';
import { useBaseDateStore } from '../../../store/BaseData.js'
import Pagination from '../../UI/Pagination.vue';
import Tools from './Tools.vue';

// 引入pinia
const dataBase = useBaseDateStore()

// 保存数据
const dataArr = ref([])
const tableDataArr = ref([])
const maxPage = ref()
const currentpage = ref(1)

// 在加载之初向服务器请求数据
const pagiTable = (value) => {
    tableDataArr.value = Array.from(dataArr.value).filter((item, index) => {
        return (index + 1 <= value * 4 && index + 1 > (value - 1) * 4)
    })
}
const dataReq = async () => {
    await dataBase.dataReq()
    dataArr.value = dataBase.baseData
    maxPage.value = dataBase.totalItems
    tableDataArr.value = Array.from(dataArr.value)
    pagiTable(currentpage.value)
}
onBeforeMount(() => {
    dataReq()
})

// 管理弹窗显示状态
const isShow = ref(false)
// 传输给弹窗的数据
const obj = ref()
// 控制弹窗的打开和关闭
const changeShow = (bool) => {
    isShow.value = bool
}
// 打开弹窗并将数据传给弹窗
const openUpdate = (item) => {
    obj.value = { ...item }
    obj.value.title = '修改药品'
    obj.value.opearate = '修改'

    changeShow(true)
    dataBase.giveShowData(obj.value)
}
// 删除数据的方法 
const deleteSql = async (item) => {
    if (confirm(`你确定删除${item.dName}吗？`)) {
       await  dataBase.deleteDate(item)
       changeMaxpage(dataBase.totalItems)
    }
}

// 管理分页组件方法
const changeCurrent = (opea) => {
    if (opea === "add" && currentpage.value < maxPage.value) {
        currentpage.value++
    } else if (opea === "desc" && currentpage.value > 1) {
        currentpage.value--
    } else if (typeof opea === 'number') {
        currentpage.value = opea
    }
}

const changeMaxpage=(number) => {
    if (number > 0) {
        maxPage.value = number
        if (currentpage.value > number) {
            currentpage.value = maxPage.value
            pagiTable(currentpage.table)
        }
        return
    }
    maxPage.value = 1
    if (currentpage.value > number) {
            currentpage.value = maxPage.value
            pagiTable(currentpage.table)
        }
}

watchEffect(async () => {
    dataArr.value = dataBase.baseData
    tableDataArr.value = Array.from(dataArr.value)
    pagiTable(currentpage.value)
})
</script>

<template>
    <Tools :is-show="isShow" @changeShow="changeShow" @change-current="changeMaxpage" @control-maxpage="changeMaxpage"></Tools>
    <table>
        <tbody>
            <tr>
                <th>药品id</th>
                <th>药品名称</th>
                <th>剂型</th>
                <th>药品类型</th>
                <th>用法</th>
                <th>禁忌事项</th>
                <th>操作</th>
            </tr>
            <tr v-for="items in tableDataArr">
                <td v-for="item in items">{{ item }}</td>
                <td>
                    <a href="" @click.prevent="openUpdate(items)">
                        <i class="ri-mark-pen-line"></i>
                    </a>
                    <a href="" @click.prevent="deleteSql(items)">
                        <i class="ri-delete-bin-6-line"></i>
                    </a>
                </td>
            </tr>
        </tbody>

    </table>
    <Pagination :current-page="currentpage" :max-page="maxPage" @change-current="changeCurrent"></Pagination>
</template>

<style scoped>
table {
    border-collapse: collapse;
    width: 1200px;
    margin: 0 0 0 60px;
}

tr,
td {
    height: 40px;
    border-bottom: 1px solid #dfe6ec;
    text-align: center;
}

td {
    font-size: 14px;
}

td a:nth-of-type(1),
td a:nth-of-type(2) {
    display: inline-block;
    width: 30px;
    height: inherit;
    margin: 5px;
    line-height: 40px;
    color: white;
    border-radius: 5px;
}

td a:nth-of-type(1) {
    background-color: #1890FF;
}

td a:nth-of-type(1):hover {
    background-color: #46A6FF;
}

td a:nth-of-type(2) {
    background-color: #FF4949;
}

td a:nth-child(2):hover {
    background-color: #FF6D6D;
}
</style>