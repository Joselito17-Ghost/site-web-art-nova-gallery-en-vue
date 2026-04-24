<template>
    <nav class="nav">
        <div class="nav-logo" @click="$router.push('/home')">Art Nova Gallery</div>
        <div class="nav-links">
            <RouterLink to="/home">Accueil</RouterLink>
            <RouterLink to="/galerie">Galerie</RouterLink>
            <RouterLink to="/apropos">A propos</RouterLink>
            <RouterLink to="/contact">Contact</RouterLink>
            <RouterLink to="/admin">Admin</RouterLink>
        </div>
        <div class="nav-r">
            <RouterLink v-if="store.isAdmin" to="/admin" class="nav-btn gold">Admin</RouterLink>
            <span v-if="store.isLoggedIn" class="nav-user">{{ store.currentUser?.nom }}</span>
            <button v-if="store.isLoggedIn" class="nav-btn" @click="logout">Deconnexion</button>
            <RouterLink v-else to="/login" class="nav-btn">Connexion</RouterLink>
        </div>
    </nav>
</template>

<script setup>
import { useAppStore } from '../store'
import { useRouter } from 'vue-router'
const store = useAppStore()
const router = useRouter()
function logout() {
    store.logout()
    router.push('/login')
}
</script>