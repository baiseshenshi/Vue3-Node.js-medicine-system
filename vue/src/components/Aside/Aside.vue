<script setup>
import { ref } from 'vue'

const props = defineProps(['active'])
</script>

<template>
    <div class="aside">
        <nav>
            <ul>
                <router-link to="/prime/master" class="master">
                    <li :class="{ active: props.active === 0 }" 
                    @click="() => $emit('activeChange', 0)">
                        首页
                    </li>
                </router-link>
                <router-link to="/prime/master/msg" class="msg">
                    <li :class="{ active: props.active === 1 }" 
                    @click="() => $emit('activeChange', 1)">
                        销售/进货信息
                    </li>
                </router-link>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.aside {
    width: 200px;
    height: 653px;
    background-color: #324154;
}

nav {
    padding: 80px 0 0 0px;
}

ul {
    overflow: hidden;
}

ul li {
    display: block;
    font-size: 25px;
    width: 200px;
    height: 40px;
    cursor: pointer;
    color: rgb(191, 203, 217);
}

ul li:hover {
    background-color: #3F9487;
}

.active {
    color: #409EFF;
}

.master,
.msg{
    text-decoration: none;
    color: black;
}

.master li{
    padding-left: 80px;
}
.msg li{
    padding-left: 20px;
}
</style>