<template>
  <div>
    <div class="gal-hero">
      <div>
        <h1>Ma <em>Galerie</em></h1>
        <p style="font-size:13px;color:var(--tx2);margin-top:6px">{{ filtered.length }} œuvres · Peinture, photographie & art numérique</p>
      </div>
      <div class="gal-kpis">
        <div class="gkpi"><div class="gkpi-n">1.2k</div><div class="gkpi-l">Commentaires</div></div>
        <div class="gkpi"><div class="gkpi-n">18.7k</div><div class="gkpi-l">Total likes</div></div>
        <div class="gkpi"><div class="gkpi-n">42k</div><div class="gkpi-l">Vues totales</div></div>
      </div>
    </div>

    <div class="toolbar">
      <div class="filters">
        <button v-for="cat in categories" :key="cat" :class="['fbtn', currentCat === cat ? 'active' : '']" @click="currentCat = cat">
          {{ cat === '' ? `Tout (${store.oeuvres.length})` : `${cat} (${store.oeuvres.filter(o => o.cat === cat).length})` }}
        </button>
      </div>
      <div class="sort-g">
        <span class="sort-lbl">Trier par</span>
        <select class="sort-sel" v-model="sortBy">
          <option value="likes">Plus aimes</option>
          <option value="recent">Plus recents</option>
          <option value="vues">Plus vus</option>
        </select>
      </div>
    </div>

    <div class="gal-grid">
      <div class="gi" v-for="o in sorted" :key="o.id">
        <div class="gi-img">
          <div class="gi-inner" :style="{ background: o.couleur }"></div>
          <div class="gi-ov">
            <button class="gbtn" @click.stop="like(o.id)">♥ J'aime</button>
            <button class="gbtn">💬 Voir</button>
            <button class="gbtn">↗ Partager</button>
          </div>
        </div>
        <div class="gi-info">
          <div class="gi-title">{{ o.titre }}</div>
          <div class="gi-meta">{{ o.cat }} · {{ o.annee }}</div>
          <div class="gi-stats">
            <span :class="['gis', o.liked ? 'liked' : '']">♥ {{ o.likes }}</span>
            <span class="gis">💬 0</span>
            <span class="gis">👁 {{ o.vues }}</span>
            <span class="gi-prix">
              {{ o.prix ? (o.dispo ? o.prix + ' €' : 'Vendu') : 'Sur demande' }}
              <span class="gi-dispo">{{ o.dispo ? 'Disponible' : 'Vendu' }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="load-more">
      <button class="lbtn">Charger plus d'œuvres</button>
    </div>

    <footer class="site-footer">
      <div class="flogo">Art Nova Gallery</div>
      <div class="fcopy">© 2025 Art Nova Gallery — Yaounde, Cameroun</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../store'
import { useRouter } from 'vue-router'

const store = useAppStore()
const router = useRouter()
const categories = ['', 'Peinture', 'Photographie', 'Art Numérique', 'Sculpture']
const currentCat = ref('')
const sortBy = ref('recent')

const filtered = computed(() => currentCat.value ? store.oeuvres.filter(o => o.cat === currentCat.value) : store.oeuvres)
const sorted = computed(() => {
  const list = [...filtered.value]
  if (sortBy.value === 'likes') list.sort((x, b) => b.likes - x.likes)
  else if (sortBy.value === 'vues') list.sort((x, b) => b.vues - x.vues)
  else list.sort((a, b) => b.annee - a.annee)
  return list
})

function like(id) {
  if (!store.isLoggedIn) { router.push('/login'); return }
  store.toggleLike(id)
}
</script>
