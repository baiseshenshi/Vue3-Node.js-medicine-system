<script setup>
import { onMounted, toRef,ref, watch } from 'vue';
import { useBaseDateStore } from '../../store/BaseData';

const props = defineProps(['currentPage','maxPage'])
const emits = defineEmits(['changeCurrent','changeMax'])

// 导入pinia
const baseData = useBaseDateStore()
//  显示当前的页数
const current = toRef(props, 'currentPage')

// 在加载组件之后，获取maxPage最大页数
onMounted(() => {
    const maxPage = ref(props.maxPage)
})

const isTrue = (x, max) => {
    if ((x === 2 && current.value > 3) || (x === max-1 && current.value < max - 3)) {
        return true
    }
    return false
}
const maybe = (p,max,c) => {
    if (p === 1 || p == max) {
        return true
    }else if ((p < 5 && c <= 4) || (p>max-3 && c>=max-2)) {
        if (c >3 && p === 2 ) {
            return false
        }
        return true
    }
    else if(c >= p-2  && c <= p + 2){
        return true
    }
    return false
}
</script>

<template>
    <div class="padding">
        <nav>
            <ul>
                <a href="" @click.prevent="emits('changeCurrent', 'desc')">
                    <i class="ri-arrow-left-double-line"></i>
                </a>
                <template v-for="p in maxPage">
                    <li :class="{ active: current === p }" 
                    v-show="maybe(p,maxPage,current)" 
                    @click="emits('changeCurrent', p)">
                        {{ p }}
                    </li>
                    <li v-show="isTrue(p, maxPage)">...</li>
                    
                </template>

                <a href="" @click.prevent="emits('changeCurrent', 'add')">
                    <i class="ri-arrow-right-double-line"></i>
                </a>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.padding {
    position: fixed;
    height: 60px;
    line-height: 40px;
    top: 650px;
    left: 270px;
    background-color: #F5F5F6;
}

nav ul {
    display: flex;
    justify-content: center;
    align-items: center;
}

li {
    display: block;
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 10px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    margin: 1px;
}

li:hover:not(.active){
    background-color: #cdcdcd;
}

.active {
    background-color: #1890FF;
    color: white;
    
}

a {
    padding: 10px;
}
</style>