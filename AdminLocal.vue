<template>
  <div class="admin-wrap">
   
    <aside class="sidebar">
      <div class="sb-logo">
        <div class="sb-logo-sub">Tableau de bord</div>
        <div class="sb-logo-txt">Art Nova Gallery</div>
      </div>
      <nav class="sb-nav">
        <div class="sb-sec">Principal</div>
        <div :class="['sb-item', tab === 'dash' ? 'active' : '']" @click="tab = 'dash'">📊 Vue d'ensemble</div>
        <div :class="['sb-item', tab === 'ajouter' ? 'active' : '']" @click="tab = 'ajouter'">➕ Ajouter une œuvre</div>
        <div :class="['sb-item', tab === 'oeuvres' ? 'active' : '']" @click="tab = 'oeuvres'">🖼 Mes œuvres <span class="sb-badge">{{ store.oeuvres.length }}</span></div>
        <div class="sb-sec">Communaute</div>
        <div :class="['sb-item', tab === 'messages' ? 'active' : '']" @click="tab = 'messages'">✉️ Messages <span class="sb-badge">{{ store.messages.filter(m => m.unread).length }}</span></div>
        <div class="sb-sec">Analytiques</div>
        <div :class="['sb-item', tab === 'comments' ? 'active' : '']" @click="tab = 'comments'">💬 Commentaires <span class="sb-badge">{{ store.pendingComments }}</span></div>
        <div :class="['sb-item', tab === 'stats' ? 'active' : '']" @click="tab = 'stats'">📈 Statistiques</div>
        <div class="sb-sec">Compte</div>
        <div class="sb-item" @click="$router.push('/home')">🏠 Voir le site</div>
        <div class="sb-item" @click="logout">🚪 Deconnexion</div>
      </nav>
      <div class="sb-foot">
        <div class="sb-av">JK</div>
        <div><div class="sb-n">Joselito Kaze</div><div class="sb-r">Admin</div></div>
      </div>
    </aside>

    
    <div class="admin-main">
      <div class="a-topbar">
        <h2>
          <span v-if="tab === 'dash'">Vue d'<em>ensemble</em></span>
          <span v-else-if="tab === 'oeuvres'">Mes <em>Œuvres</em></span>
          <span v-else-if="tab === 'ajouter'">Ajouter une <em>Œuvre</em></span>
          <span v-else-if="tab === 'comments'">Gestion des <em>Commentaires</em></span>
          <span v-else-if="tab === 'messages'"><em>Messages</em> reçus</span>
          <span v-else-if="tab === 'stats'"><em>Statistiques</em></span>
        </h2>
        <div class="a-acts">
          <button class="a-notif">🔔</button>
          <button class="btn-gold" style="padding:8px 16px;font-size:10px" @click="tab = 'ajouter'">+ Ajouter une œuvre</button>
        </div>
      </div>

      <div class="a-content">

        
        <template v-if="tab === 'dash'">
          <div class="kpi-grid">
            <div class="kpi" v-for="k in kpis" :key="k.label">
              <div class="kpi-ico">{{ k.icon }}</div>
              <div class="kpi-lbl">{{ k.label }}</div>
              <div class="kpi-n">{{ k.num }}</div>
              <div class="kpi-tr">↑ {{ k.trend }}</div>
              <div class="kpi-bar"><div class="kpi-fill" :style="{ width: k.pct + '%' }"></div></div>
            </div>
          </div>
          <div class="dash-row">
            <div class="dpanel">
              <div class="ph">
                <h3>Engagement <em>mensuel</em></h3>
                <div class="ptabs">
                  <button v-for="t in ['likes','vues','ventes']" :key="t" :class="['ptab', chartType === t ? 'active' : '']" @click="chartType = t">{{ t.charAt(0).toUpperCase() + t.slice(1) }}</button>
                </div>
              </div>
              <div class="chart">
                <div class="bw" v-for="(v, i) in chartData[chartType]" :key="i">
                  <div :class="['bar', i === 6 ? 'hi' : '']" :style="{ height: v + '%' }"></div>
                </div>
              </div>
              <div class="cl"><span v-for="m in mois" :key="m">{{ m }}</span></div>
            </div>
            <div class="dpanel">
              <div class="ph"><h3>Top <em>Œuvres</em></h3></div>
              <div class="top-item" v-for="(o, i) in topOeuvres" :key="o.id">
                <span class="top-rk">{{ i + 1 }}</span>
                <div class="top-th" :style="{ background: o.couleur }"></div>
                <div style="flex:1"><div class="top-n">{{ o.titre }}</div><div class="top-c">{{ o.cat }} · {{ o.annee }}</div></div>
                <div style="text-align:right"><div class="top-lk">♥ {{ o.likes }}</div><div class="top-vw">{{ o.vues }} vues</div></div>
              </div>
            </div>
          </div>
          <div class="dash-row3">
            <div class="dpanel">
              <div class="ph"><h3>Commentaires <em>récents</em></h3><span class="bp">{{ store.pendingComments }} en attente</span></div>
              <div class="cm-mini" v-for="c in store.comments.slice(0, 3)" :key="c.id">
                <div class="cav" :style="{ background: c.couleur }">{{ c.initiales }}</div>
                <div style="flex:1">
                  <div class="cn">{{ c.nom }} <span class="co">— {{ c.oeuvre }}</span></div>
                  <div class="ct">{{ c.texte.substring(0, 60) }}...</div>
                  <div class="cbtns">
                    <button class="bok" @click="store.approveComment(c.id)">✓ Approuver</button>
                    <button class="bko" @click="store.deleteComment(c.id)">✗ Supprimer</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="dpanel">
              <div class="ph"><h3>Activite <em>recente</em></h3></div>
              <div class="act-item" v-for="a in activites" :key="a.id">
                <span :class="['adot', a.type]"></span>
                <span class="atxt" v-html="a.texte"></span>
                <span class="atime">{{ a.time }}</span>
              </div>
            </div>
            <div class="dpanel">
              <div class="ph"><h3>Messages <em>reçus</em></h3><span class="bp">{{ store.messages.filter(m => m.unread).length }} nouveaux</span></div>
              <div class="msg-item" v-for="m in store.messages" :key="m.id">
                <div class="msg-rw">
                  <div class="msg-nm"><span v-if="m.unread" class="mdot"></span>{{ m.nom }}</div>
                  <div class="mtime">{{ m.time }}</div>
                </div>
                <div class="mprev">{{ m.preview.substring(0, 48) }}...</div>
              </div>
            </div>
          </div>
        </template>

        
        <template v-else-if="tab === 'oeuvres'">
          <div class="ptoolbar">
            <input class="srch" v-model="searchQ" placeholder="Rechercher une œuvre..." />
            <button class="bsm" @click="tab = 'ajouter'">+ Nouvelle œuvre</button>
          </div>
          <div class="otab-wrap">
            <table>
              <thead><tr><th>Aperçu</th><th>Titre</th><th>Categorie</th><th>Annee</th><th>Likes</th><th>Vues</th><th>Prix</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                <tr v-for="o in filteredOeuvres" :key="o.id">
                  <td><div class="tthumb" :style="{ background: o.couleur }"></div></td>
                  <td class="ttitle">{{ o.titre }}</td>
                  <td><span class="catbdg">{{ o.cat }}</span></td>
                  <td>{{ o.annee }}</td>
                  <td class="tgold">♥ {{ o.likes }}</td>
                  <td>👁 {{ o.vues }}</td>
                  <td class="tgold">{{ o.prix ? o.prix + ' €' : '—' }}</td>
                  <td><span :class="['sbdg', o.dispo ? 'd' : 'v']">{{ o.dispo ? 'Disponible' : 'Vendu' }}</span></td>
                  <td class="tdacts">
                    <button class="bedit">✏️</button>
                    <button class="bdel" @click="store.deleteOeuvre(o.id)">🗑</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        
        <template v-else-if="tab === 'ajouter'">
          <div class="add-form">
            <div v-if="addSuccess" class="succ-msg">✅ Œuvre publiee avec succes !</div>
            <div class="fr2" style="margin-bottom:0">
              <div class="fg2"><label>Titre *</label><input v-model="newO.titre" type="text" placeholder="Titre de l'œuvre" required></div>
              <div class="fg2"><label>Catégorie *</label><select v-model="newO.cat"><option>Peinture</option><option>Photographie</option><option>Art Numerique</option><option>Sculpture</option></select></div>
            </div>
            <div class="fg2"><label>Description</label><textarea v-model="newO.description" placeholder="Description de l'œuvre..."></textarea></div>
            <div class="fr3">
              <div class="fg2"><label>Annee</label><input v-model.number="newO.annee" type="number" placeholder="2025"></div>
              <div class="fg2"><label>Dimensions</label><input v-model="newO.dimensions" type="text" placeholder="80×120 cm"></div>
              <div class="fg2"><label>Prix (€)</label><input v-model.number="newO.prix" type="number" placeholder="1200"></div>
            </div>
            <div class="fr2" style="margin-bottom:0">
              <div class="fg2">
                <label>Couleur de fond</label>
                <div style="display:flex;align-items:center;gap:10px">
                  <input v-model="newO.couleur" type="color" style="width:46px;height:34px;padding:2px;border:1px solid var(--b1);background:var(--s1);cursor:pointer">
                  <span style="font-size:12px;color:var(--tx2)">{{ newO.couleur }}</span>
                </div>
              </div>
              <div class="fg2"><label>URL de l'image</label><input v-model="newO.image" type="url" placeholder="https://..."></div>
            </div>
            <div class="fchk"><input v-model="newO.dispo" type="checkbox" id="dispo"><label for="dispo">Disponible à la vente</label></div>
            <div v-if="newO.titre" class="preview-box">
              <div class="prev-img" :style="{ background: newO.couleur }"></div>
              <div>
                <div class="prev-t">{{ newO.titre }}</div>
                <div class="prev-m">{{ newO.cat }} · {{ newO.annee }}</div>
                <div v-if="newO.prix" class="prev-p">{{ newO.prix }} €</div>
              </div>
            </div>
            <button class="btn-gold" style="padding:13px 28px" @click="publish">Publier l'œuvre</button>
          </div>
        </template>

        
        <template v-else-if="tab === 'comments'">
          <div class="ptoolbar">
            <span style="font-size:12px;color:var(--tx2)">{{ store.pendingComments }} commentaires en attente</span>
            <div class="fbts">
              <button v-for="f in ['tous','attente','approuves']" :key="f" :class="['fbtn', cmtFilter === f ? 'active' : '']" @click="cmtFilter = f">{{ f === 'tous' ? 'Tous' : f === 'attente' ? 'En attente' : 'Approuves' }}</button>
            </div>
          </div>
          <div class="cmt-list">
            <div class="cmt-mod" v-for="c in filteredComments" :key="c.id">
              <div class="cav" :style="{ background: c.couleur }">{{ c.initiales }}</div>
              <div style="flex:1">
                <div class="cmhdr"><span class="cn">{{ c.nom }}</span><span class="co">sur "{{ c.oeuvre }}"</span><span :class="['cmst', c.approuve ? 'ok' : 'pen']">{{ c.approuve ? 'Approuve' : 'En attente' }}</span></div>
                <div class="ct">{{ c.texte }}</div>
                <div class="cmdate">{{ c.date }}</div>
                <div class="cbtns">
                  <button v-if="!c.approuve" class="bok" @click="store.approveComment(c.id)">✓ Approuver</button>
                  <button class="bko" @click="store.deleteComment(c.id)">✗ Supprimer</button>
                </div>
              </div>
            </div>
          </div>
        </template>

        
        <template v-else-if="tab === 'messages'">
          <div class="msg-layout">
            <div class="msg-list-full">
              <div class="msg-full-item" v-for="m in store.messages" :key="m.id" @click="openMsg(m)">
                <div class="msg-av">{{ m.initiales }}</div>
                <div class="msg-content">
                  <div class="msg-rw">
                    <div class="msg-name-full"><span v-if="m.unread" class="mdot"></span>{{ m.nom }}</div>
                    <div class="mtime">{{ m.time }}</div>
                  </div>
                  <div class="msg-subject">{{ m.sujet }}</div>
                  <div class="mprev">{{ m.preview }}</div>
                </div>
              </div>
            </div>
            <div v-if="activeMsg" class="msg-detail">
              <div class="msg-detail-hdr">
                <strong>{{ activeMsg.nom }}</strong>
                <span>{{ activeMsg.email }}</span>
              </div>
              <div class="msg-detail-subj">{{ activeMsg.sujet }}</div>
              <div class="msg-detail-body">{{ activeMsg.corps }}</div>
              <textarea class="msg-reply" placeholder="Votre réponse..." v-model="reply"></textarea>
              <button class="btn-gold" style="padding:10px 22px;align-self:flex-start">Répondre</button>
            </div>
            <div v-else class="msg-empty">Selectionne un message pour le lire</div>
          </div>
        </template>

        
        <template v-else-if="tab === 'stats'">
          <div class="stats-grid">
            <div class="stat-card" v-for="s in statsData" :key="s.label">
              <div class="sc-ico">{{ s.icon }}</div>
              <div class="sc-num">{{ s.num }}</div>
              <div class="sc-lbl">{{ s.label }}</div>
              <div class="sc-bar"><div class="sc-fill" :style="{ width: s.pct + '%', background: s.color }"></div></div>
            </div>
          </div>
          <div style="padding:16px;border:1px solid var(--b2);font-size:13px;color:var(--tx2);line-height:1.7;margin-top:4px">
            Ces statistiques refletent l'activite globale de votre galerie Art Nova. Pour des donnees en temps reel, connectez le backend 
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useAppStore } from '../store'
import { useRouter } from 'vue-router'

const store = useAppStore()
const router = useRouter()
const tab = ref('dash')
const chartType = ref('likes')
const cmtFilter = ref('tous')
const activeMsg = ref(null)
const searchQ = ref('')
const reply = ref('')
const addSuccess = ref(false)

const mois = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']
const chartData = {
  vues:   [30,50,45,65,70,75,70,80,85,72,92,88],
  likes:  [40,55,38,72,55,80,95,68,74,62,88,76],
  ventes: [10,20,15,25,10,30,45,20,35,28,60,32]
}
const kpis = [
  { label: 'Total Likes', num: '16.7k', trend: '+11% ce mois', pct: 70, icon: '♥' },
  { label: 'Vues totales', num: '40.3k', trend: '+7% ce mois', pct: 62, icon: '👁' },
  { label: 'Abonnés', num: '4 200', trend: '+340 ce mois', pct: 55, icon: '👥' },
  { label: 'Revenus (€)', num: '11 400', trend: '+3 ventes', pct: 45, icon: '💰' }
]
const activites = [
  { id: 1, type: 'comment', texte: '<strong>Merlin J.</strong> a commenté', time: '5 min' },
  { id: 2, type: 'like', texte: '<strong>Carlos R.</strong> a aime Territoire Rouge', time: '2 min' },
  { id: 3, type: 'sale', texte: "Vente — Champ d'Or · 1 200 €", time: '3h' },
  { id: 4, type: 'view', texte: '<strong>142 personnes</strong> ont vu une œuvre', time: '1h' },
  { id: 5, type: 'like', texte: '<strong>+28 nouveaux abonnes</strong> cette semaine', time: '1j' }
]
const statsData = [
  { icon: '♥', num: '16.7k', label: 'Total Likes', pct: 74, color: '#c9a96e' },
  { icon: '🖼', num: store.oeuvres.length, label: 'Œuvres', pct: 80, color: '#c9a96e' },
  { icon: '💬', num: '1.1k', label: 'Commentaires', pct: 40, color: '#4a9a6a' },
  { icon: '👁', num: '41.3k', label: 'Vues totales', pct: 62, color: '#4a9a6a' },
  { icon: '👥', num: '4 200', label: 'Abonnes', pct: 55, color: '#4a6a9a' },
  { icon: '📍', num: '9', label: 'Pays', pct: 30, color: '#4a6a9a' },
  { icon: '💰', num: '12 000 €', label: 'Revenus', pct: 48, color: '#9a4a9a' },
  { icon: '🏆', num: '18', label: 'Prix & Distinctions', pct: 60, color: '#9a4a9a' }
]

const topOeuvres = computed(() => [...store.oeuvres].sort((a, b) => b.likes - a.likes).slice(0, 5))
const filteredOeuvres = computed(() => store.oeuvres.filter(o => o.titre.toLowerCase().includes(searchQ.value.toLowerCase()) || o.cat.toLowerCase().includes(searchQ.value.toLowerCase())))
const filteredComments = computed(() => {
  if (cmtFilter.value === 'attente') return store.comments.filter(c => !c.approuve)
  if (cmtFilter.value === 'approuves') return store.comments.filter(c => c.approuve)
  return store.comments
})

const newO = reactive({ titre: '', cat: 'Peinture', description: '', annee: 2025, dimensions: '', prix: null, couleur: '#1a1408', image: '', dispo: true })

function publish() {
  if (!newO.titre) return alert('Le titre est obligatoire.')
  store.addOeuvre({ ...newO })
  addSuccess.value = true
  Object.assign(newO, { titre: '', description: '', annee: 2025, dimensions: '', prix: null, image: '' })
  setTimeout(() => { addSuccess.value = false; tab.value = 'oeuvres' }, 2000)
}

function openMsg(m) {
  store.markMessageRead(m.id)
  activeMsg.value = m
}

function logout() {
  store.logout()
  router.push('/login')
}
</script>
