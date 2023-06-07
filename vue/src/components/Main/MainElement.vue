<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const goTo = () => {
    router.push('/prime/master')
}

onMounted(() => {
    goTo()
})
</script>

<template>
    <div class="main">
        <router-view></router-view>
    </div>
</template>

<style scoped>
.main {
    width: 100%;
    
}
</style>