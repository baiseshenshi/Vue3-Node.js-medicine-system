<script setup>
import { ref } from 'vue';
import Mask from '../../UI/Mask.vue';
import Window from '../../UI/Window.vue';
import { useBaseDateStore } from '../../../store/BaseData.js';

const baseData = useBaseDateStore()

const props = defineProps(['isShow'])
const emits = defineEmits(['changeShow', 'controlMaxpage', 'changeCurrent'])

const obj = ref({
    title: '新增药品',
    dType: "0",
    dFrom: "0"
})

const typing = ref(0)

const change = (bool) => {
    emits('changeShow', bool)
}

const giveData = (obj) => {
    baseData.giveShowData(obj)
}

const startTyping = async () => {
    if (!typing.value || typing.value === 0) {
        alert("未选择种类")
        return
    }

    await baseData.dataTyping(typing.value)
    emits('controlMaxpage', baseData.totalItems)
}

const changeCurrent = (totalItems) => {
    emits('changeCurrent', totalItems)
}
</script>

<template>
    <div class="tools">
        <a class="add" href="" @click.prevent="change(true); giveData(obj)">
            <i class="ri-add-line"></i>
            <span>新增</span>
        </a>

        <div class="typeSelect">
            <select v-model=" typing ">
                <option value="0" disabled hidden>请选择药品类型</option>
                <option value="all">全部</option>
                <option>西药外服</option>
                <option>西药内用</option>
                <option>西药注射</option>
                <option>中成药</option>
                <option>中药饮片</option>
                <option>丸散膏</option>
            </select>
            <label>
                <a href="" @click.prevent=" startTyping " class="chaxun">
                    <i class="ri-find-replace-fill"></i>
                    <span class="cule">
                        查询
                    </span>
                </a>
            </label>
        </div>
    </div>
    <Mask :is-show=" isShow ">
        <Window @changeShow=" change(bool) " @change-current=" changeCurrent "></Window>
    </Mask>
</template>

<style scoped>
.tools {
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 50px 0 10px 55px;
}

.add {
    width: 70px;
    height: 40px;
    background-color: bisque;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
    color: white;
    background-color: #1890FF;
    border-radius: 10px;
}

.tools span {
    font-size: 16px;
    padding-bottom: 10px;
}

.add {
    background-color: #1890FF;
}

.add:hover {
    background-color: #46A6FF;
}

.typeSelect {
    width: 200px;
    font-size: 25px;
    text-align: center;
    display: flex;
    align-items: center;
}

.typeSelect a {
    margin-top: 10px;
    position: relative;
}

.typeSelect a:hover .cule {
    display: block;
}

.cule {
    display: none;
    width: 50px;
    height: 20px;
    position: absolute;
    background-color: #46A6FF;
    color: white;
    font-size: 5px;
    left: -7px;
    top: 25px;
    z-index: 30;
    border-radius: 10px;
    line-height: 28px;
}

.cule::before {
    content: " ";
    position: absolute;
    border: 5px solid;
    border-color: transparent transparent #46A6FF transparent;
    top: -10px;
    margin-left: 10px;
}

.typeSelect label i {
    font-size: 28px;
    color: #1890FF;
}

.typeSelect select {
    border: none;
    outline: none;
    border: 1px solid #dcdfe6;
    width: 140px;
    height: 30px;
    border-radius: 10px;
}

.typeSelect select:hover {
    border-color: #C0C4CC;
}

.typeSelect select:focus {
    border-color: #1890FF;
}
</style>