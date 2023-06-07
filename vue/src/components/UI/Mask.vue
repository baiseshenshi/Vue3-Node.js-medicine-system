<script setup>
const props= defineProps(['isShow'])
</script>

<template>
    <Teleport to="#other">
        <div class="mask" v-if="isShow">
            <slot></slot>
        </div>
    </Teleport>
</template>

<style scoped>
.mask {
    background-color: rgba(0, 0, 0, 30%);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
}
</style>