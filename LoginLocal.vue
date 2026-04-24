<template>
  <div class="login-page">
    <div class="login-deco"></div>
    <div class="login-box">
      <p class="login-eye">Art Nova Gallery</p>
      <h1 class="login-h1">Bon<em>jour,</em></h1>
      <p class="login-sub">{{ isRegister ? 'Creez votre compte' : 'Connectez-vous a votre espace creatif.' }}</p>
      <div v-if="error" class="err-msg">{{ error }}</div>
      <div v-if="isRegister" class="fg">
        <label>Nom complet</label>
        <input class="fi" v-model="form.nom" type="text" placeholder="Votre nom">
      </div>
      <div class="fg">
        <label>Adresse e-mail</label>
        <input class="fi" v-model="form.email" type="email" placeholder="vous@exemple.com">
      </div>
      <div class="fg">
        <label>Mot de passe</label>
        <input class="fi" v-model="form.password" type="password" placeholder="*********" @keyup.enter="submit">
      </div>
      <p v-if="!isRegister" class="forgot">Mot de passe oublie ?</p>
      <button class="btn-gold" style="width:100%;padding:14px;margin-top:4px" @click="submit">
        {{ isRegister ? "S'inscrire" : 'Se connecter' }}
      </button>
      <p class="login-foot">
        {{ isRegister ? 'Déjà un compte ?' : 'Pas encore de compte ?' }}
        <span @click="isRegister = !isRegister; error = ''">{{ isRegister ? 'Se connecter' : "S'inscrire" }}</span>
      </p>
      <p style="font-size:11px;color:var(--tx3);text-align:center;margin-top:14px">Admin : admin@artnova.com / admin</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../store'

const store = useAppStore()
const router = useRouter()
const isRegister = ref(false)
const error = ref('')
const form = reactive({ nom: ' ', email: ' ', password: ' ' })

function submit() {
  error.value = ''
  let result
  if (isRegister.value) {
    result = store.register(form.nom, form.email, form.password)
  } else {
    result = store.login(form.email, form.password)
  }
  if (result.ok) {
    router.push(result.role === 'admin' ? '/admin' : '/home')
  } else {
    error.value = result.error
  }
}
</script>
