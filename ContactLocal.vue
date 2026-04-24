<template>
  <div>
    <div class="page-hdr">
      <h1 class="ctitle">Parlons <em>ensemble</em></h1>
    </div>
    <div class="contact-grid">
      <div>
        <p class="csub">Pour des collaborations, achats d'œuvres, expositions ou toute autre demande, je vous reponds sous 48h.</p>
        <div class="ci-lbl">Email</div><div class="ci-val">joselitokaze25@gmail.com</div>
        <div class="ci-lbl">Telephone</div><div class="ci-val">+237 676 694 995</div>
        <div class="ci-lbl">Atelier</div><div class="ci-val">Yaoundé, Cameroun</div>
        <div class="socials">
          <div class="soc">Ig</div>
          <div class="soc">Fb</div>
          <div class="soc">Li</div>
          <div class="soc">Be</div>
        </div>
      </div>
      <form @submit.prevent="send">
        <div class="fr2">
          <div class="fg"><label>Prenom</label><input class="fi" v-model="form.prenom" type="text" placeholder="Votre prénom"></div>
          <div class="fg"><label>Nom</label><input class="fi" v-model="form.nom" type="text" placeholder="Votre nom"></div>
        </div>
        <div class="fg"><label>Email</label><input class="fi" v-model="form.email" type="email" placeholder="vous@exemple.com"></div>
        <div class="fg"><label>Sujet</label><input class="fi" v-model="form.sujet" type="text" placeholder="Objet de votre message"></div>
        <div class="fg"><label>Message</label><textarea class="fi ftarea" v-model="form.message" placeholder="Votre message ici..."></textarea></div>
        <div v-if="sent" class="succ-msg">✅ Message envoye avec succes !</div>
        <button type="submit" class="btn-gold" style="padding:13px 28px">Envoyer le message</button>
      </form>
    </div>
    <footer class="site-footer">
      <div class="flogo">Art Nova Gallery</div>
      <div class="fcopy">© 2025 Art Nova Gallery — Yaounde, Cameroun</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const sent = ref(false)
const form = reactive({ prenom: '', nom: '', email: '', sujet: '', message: '' })
function send() {
  sent.value = true
  Object.assign(form, { prenom: '', nom: '', email: '', sujet: '', message: '' })
  setTimeout(() => sent.value = false, 3000)
}
</script>
