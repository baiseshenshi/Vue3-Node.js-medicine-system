<script setup>
import { computed } from 'vue';

const props = defineProps(['username'])

const greet = computed(() => {
    const hour = new Date(Date.now()).getHours()

    let msg = ''

    if (hour >= 0 && hour <= 5) {
        msg = '注意身体哦,'
    } else if (hour > 5 && hour <= 10) {
        msg = '早上好,'
    } else if (hour > 10 && hour <= 13) {
        msg = '中午好,'
    } else if (hour > 13 && hour <= 18) {
        msg = '下午好,'
    } else if (hour > 18 && hour < 24) {
        msg = '晚上好,'
    }

    return msg
})

const sessionGOZore = () => {
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("key")
}
</script>

<template>
    <div class="head">
        <div class="info">
            <div class="img">
                <img src="/img/admin.png" alt="">
                <span>{{ greet + username }}</span>
                <a href="" @click.prevent="sessionGOZore()">
                    <router-link to="/" style="color: red; font-size: 20px;" replace>注销</router-link>
                </a>
            </div>
            <div>
                <h1>药品管理系统</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
header .head {
    width: 100%;
    height: 100px;
    background-color: #4A5B6B;
}

header .info {
    width: 800px;
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.img {
    display: flex;
    align-items: center;
    justify-content: center;
}

.info img {
    width: 60px;
    height: 80px;
    border-radius: 50%;
}

.info span {
    font-size: 30px;
    line-height: 100px;
    color: rgb(248, 248, 248);
}

.info h1 {
    color: aliceblue;
}
</style>