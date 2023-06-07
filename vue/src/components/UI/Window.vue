<script setup>
import { ref } from 'vue';
import { useBaseDateStore } from '../../store/BaseData';

const baseData = useBaseDateStore()

const emits = defineEmits(['changeShow','changeCurrent'])

const mdei = ref({})

mdei.value = baseData.showData
const sumbit = async (item, path) => {
    for (let i in item) {
        if ((item[i] === "" && i === 'dID') || !item.dID) {
            alert("id未填写")
            return
        }
        if (item.dFrom === "0" || item.dType === "0") {
            alert("剂型或类型未填写")
            return
        }
    }
    await baseData.reviseDate(item, path)

    emits('changeShow', false)
    
    const totalItems = baseData.totalItems
    
    emits('changeCurrent',totalItems)
    alert('提交完成')
}
</script>

<template>
    <div class="window">
        <header>
            <span>{{ mdei.title }}</span>
            <a href="" class="close" @click.prevent="$emit('changeShow', false)">
                <i class="ri-close-line"></i>
            </a>
        </header>

        <form action="#">
            <div class="first">
                <label>药品id</label>
                <input type="text" v-model="mdei.dID">
                <label>药物名</label>
                <input type="text" v-model="mdei.dName">
            </div>
            <div class="second">
                <label>剂型</label>
                <select v-model="mdei.dType">
                    <option value="0" disabled hidden>请选择剂型</option>
                    <option>胶囊剂</option>
                    <option>颗粒剂</option>
                    <option>片剂</option>
                    <option>软膏剂</option>
                    <option>栓剂</option>
                    <option>气雾剂</option>
                    <option>注射剂</option>
                    <option>中药剂</option>
                </select>

                <label>用法</label>
                <input type="text" v-model="mdei.dUsage">
            </div>
            <div class="third">
                <label>药品类型</label>
                <select v-model="mdei.dFrom">
                    <option value="0" disabled hidden>请选择药品类型</option>
                    <option>西药外服</option>
                    <option>西药内用</option>
                    <option>西药注射</option>
                    <option>中成药</option>
                    <option>中药饮片</option>
                    <option>丸散膏</option>
                </select>
            </div>

            <div class="fourteen">
                <label style="vertical-align:top">禁忌事项</label>
                <textarea v-model="mdei.dTaboo" cols="41" rows="8"></textarea>
            </div>
            <button class="btn" @click.prevent="sumbit(mdei, 'insert')" v-if="!mdei.opearate">
                确认
            </button>
            <button class="btn" @click.prevent="sumbit(mdei, 'update')" v-else-if="mdei.opearate === '修改'">
                {{ mdei.opearate }}
            </button>
        </form>
    </div>
</template>

<style scoped>
.window {
    position: relative;
    margin: 120px auto;
    width: 600px;
    height: 600px;
    background-color: white;
    border-radius: 10px;
    z-index: 9999;
}

header {
    padding: 10px;
}

.close {
    font-size: 25px;
    float: right;
    vertical-align: top;
}

header span {
    font-size: 20px;
    line-height: 40px;
}

form {
    display: block;
    padding: 50px 10px;
}

form input,
form select {
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    font-size: 16px;
}

.first input,
.second select,
.second input {
    width: 180px;
    height: 35px;
    margin-right: 30px;
}

.first label,
.second label,
.third label,
.fourteen label {
    font-size: 18px;
    margin: 0 5px 0 10px;
}

.second,
.third,
.fourteen {
    margin-top: 30px;
}

.second select,
.third select {
    border: 1px solid #dcdfe6;
    margin-left: 18px;
    border-radius: 5px;
    outline: none;
}

.second input {
    margin-left: 20px;
}

.third select {
    height: 40px;
    width: 320px;
    font-size: 16px;
    margin-left: 0px;
}

.fourteen textarea {
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    outline: none;
    resize: none;
    font-size: 20px;
}

.btn {
    cursor: pointer;
    margin: 50px 0 0 220px;
    font-size: 16px;
    color: white;
    background-color: #1890FF;
    width: 80px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
}
</style>