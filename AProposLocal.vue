<template>
  <div>
    <div class="page-hdr">
      <h1>A <em>Propos</em></h1>
      <p>Mon parcours, ma vision, mon univers creatif</p>
    </div>
    <div class="ap-grid">
      <div style="position:relative">
        <div class="ap-frame">Photo portrait<div class="ap-deco"></div></div>
      </div>
      <div>
        <div class="ap-eye">Artiste depuis 2019</div>
        <h2 class="ap-title">Une vision <em>singulière</em></h2>
        <p class="ap-txt">Base a Yaounde, au Cameroun, je developpe depuis plus d'une décennie un langage artistique qui traverse les frontieres entre peinture, photographie et installation numerique.</p>
        <p class="ap-txt">Mon travail s'interroge sur la memoire, le corps et la transformation — des themes universels traduits par des matieres, des lumieres et des textures qui invitent à la contemplation.</p>
        <div class="skills">
          <div class="skrow" v-for="s in skills" :key="s.nom">
            <div class="sknm">{{ s.nom }}</div>
            <div class="skbar"><div class="skfill" :style="{ width: s.pct + '%' }"></div></div>
            <div class="skpct">{{ s.pct }}%</div>
          </div>
        </div>
        <div class="awards">
          <div class="award" v-for="a in awards" :key="a.annee">
            <div class="ayr">{{ a.annee }}</div>
            <div class="anm">{{ a.nom }}</div>
          </div>
        </div>
      </div>
    </div>
    <footer class="site-footer">
      <div class="flogo">Art Nova Gallery</div>
      <div class="fcopy">©GHOST 2025 Art Nova Gallery — Yaounde, Cameroun</div>
    </footer>
  </div>
</template>

<script setup>
const skills = [
  { nom: 'Peinture', pct: 91 },
  { nom: 'Photographie', pct: 80 },
  { nom: 'Art numerique', pct: 70 },
  { nom: 'Sculpture', pct: 60 }
]
const awards = [
  { annee: '2025', nom: 'Prix Du Meilleur Peintre' },
  { annee: '2024', nom: 'Douala Bonaberi' },
  { annee: '2023', nom: 'Ouest' }
]
</script>
