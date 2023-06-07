<script setup>
import { getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from './Header/Header.vue';
import Aside from './Aside/Aside.vue';
import MainElement from './Main/MainElement.vue';

// 导入router
const router = useRouter()

// 获取axios 
const currentInstance = getCurrentInstance()
const { $axios } = currentInstance.appContext.config.globalProperties

// 从session中获取管理员名
const username = ref(sessionStorage.getItem('username'))

// 控制显示哪个页面
const active = ref(0)

const activeChange = (current) => {
    active.value = current
}
</script>

<template>
    <header>
        <Header :username="username"></Header>
    </header>
    <aside>
        <Aside @active-change="activeChange" :active="active"></Aside>
    </aside>
    <main>
        <MainElement></MainElement>
    </main>
</template>


<style scoped>
aside {
    width: 200px;
    float: left;
}

main {
    float: left;
}
</style>