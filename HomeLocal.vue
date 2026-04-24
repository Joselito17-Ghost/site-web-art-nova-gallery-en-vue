<template>
  <div>
   
    <section class="hero">
      <div class="hero-l">
        <p class="eyebrow">Artiste Visuelle & Photographe</p>
        <h1 class="hero-h1">L'art comme<em>langage</em></h1>
        <p class="hero-txt">Je cree des œuvres qui explorent la frontiere entre lumiere et ombre, entre reve et realite. Chaque pièce est une conversation silencieuse avec le spectateur.</p>
        <div class="ctas">
          <button class="btn-outline" @click="$router.push('/contact')">Me Contacter</button>
          <button class="btn-gold" @click="$router.push('/galerie')">Voir la Galerie</button>
        </div>
      </div>
      <div class="hero-r">
        <div class="hero-frame">Photo principale</div>
        <div class="hero-badge"><strong>12+</strong><span>ans d'expérience</span></div>
        <div class="hero-social">
          <div :class="['hs', activeNet === 'ig' ? 'active' : '']" @click="activeNet = 'ig'">Instagram</div>
          <div :class="['hs', activeNet === 'be' ? 'active' : '']" @click="activeNet = 'be'">Behance</div>
        </div>
      </div>
    </section>

  
    <div class="stats-bar">
      <div class="stat" v-for="s in stats" :key="s.label">
        <div class="stat-n">{{ s.num }}</div>
        <div class="stat-l">{{ s.label }}</div>
        <div class="stat-t">{{ s.trend }}</div>
      </div>
    </div>

    
    <div class="home-section">
      <div class="sec-hdr">
        <h2>Œuvres <em>Recentes</em></h2>
        <span class="sec-link" @click="$router.push('/galerie')">Voir toute la galerie →</span>
      </div>
      <div class="works-grid">
        <div class="wcard" v-for="o in store.oeuvres.slice(0, 3)" :key="o.id">
          <div class="wimg">
            <div class="wimg-inner" :style="{ background: o.couleur }"></div>
            <div class="wov">
              <button class="wbtn" @click.stop="like(o.id)">♥ J'aime</button>
              <button class="wbtn">💬 Voir</button>
            </div>
          </div>
          <div class="winfo">
            <div class="wtitle">{{ o.titre }}</div>
            <div class="wmeta">{{ o.cat }} · {{ o.annee }}</div>
            <div class="wstats">
              <span :class="['ws', o.liked ? 'liked' : '']">♥ {{ o.likes }}</span>
              <span class="ws">👁 {{ o.vues }}</span>
              <span class="wtag">{{ o.cat }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div class="featured">
      <div class="feat-inner">
        <div class="feat-img">Œuvre vedette</div>
        <div class="feat-c">
          <div>
            <div class="feat-lbl">⭐ Œuvre du mois</div>
            <div class="feat-title">Territoire Rouge</div>
            <div class="feat-desc">Une exploration des limites du corps et de l'espace. Cette toile interroge notre rapport a la violence douce, à travers une palette rouge profonde et des gestes amples, presque choregraphiques.</div>
            <div class="feat-stats">
              <div class="fst"><div class="fst-n">1.4k</div><div class="fst-l">Likes</div></div>
              <div class="fst"><div class="fst-n">87</div><div class="fst-l">Commentaires</div></div>
              <div class="fst"><div class="fst-n">5.2k</div><div class="fst-l">Vues</div></div>
            </div>
            <div class="feat-acts">
              <button :class="['fa', featLiked ? 'p' : 's']" @click="featLiked = !featLiked">{{ featLiked ? '♥ Aimé ✓' : '♥ J\'aime cette œuvre' }}</button>
              <button class="fa s">💬 Commenter</button>
              <button class="fa s">↗ Partager</button>
            </div>
          </div>
          <div class="feat-cmts">
            <div class="fcmt-ttl">Commentaires recents</div>
            <div class="cmt"><div class="cmt-av ca1">ML</div><div><div class="cmt-n">Marie L.</div><div class="cmt-t">Cette œuvre me touche profondément, la couleur est saisissante.</div></div></div>
            <div class="cmt"><div class="cmt-av ca2">JP</div><div><div class="cmt-n">Jean-Paul R.</div><div class="cmt-t">Magistral. Le mouvement dans la matière est fascinant.</div></div></div>
          </div>
        </div>
      </div>
    </div>

    <footer class="site-footer">
      <div class="flogo">Art Nova Gallery</div>
      <div class="fcopy">© 2025 Art Nova Gallery — Yaounde, Cameroun</div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '../store'
import { useRouter } from 'vue-router'

const store = useAppStore()
const router = useRouter()
const activeNet = ref('ig')
const featLiked = ref(false)

const stats = [
  { num: '148', label: 'Œuvres crees', trend: '+12 ce mois' },
  { num: '13.7k', label: 'Total likes', trend: '+1.2k ce mois' },
  { num: '3.2k', label: 'Abonnes', trend: '+340 ce mois' },
  { num: '30', label: 'Expositions', trend: '+2 ce mois' },
  { num: '9', label: 'Pays', trend: '+2 ce mois' }
]

function like(id) {
  if (!store.isLoggedIn) { router.push('/login'); return }
  store.toggleLike(id)
}
</script>
