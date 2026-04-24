<template>
  <Navigateur v-if="!isLoginPage" />
  <RouterView />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navigateur from './components/Navigateur.vue'

const route = useRoute()
const isLoginPage = computed(() => route.name === 'Login')
</script>
