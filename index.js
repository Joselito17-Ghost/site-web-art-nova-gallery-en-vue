import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    currentUser: null,
    oeuvres: [
      { id: 1, titre: "Lumière d'Aube", cat: 'Peinture', annee: 2024, likes: 342, vues: 1200, prix: 2400, dispo: true, couleur: 'linear-gradient(135deg,#1a1408,#3d2b10)', liked: false },
      { id: 2, titre: 'Profondeur Bleue', cat: 'Photographie', annee: 2024, likes: 518, vues: 2100, prix: 890, dispo: true, couleur: 'linear-gradient(135deg,#0d1a1a,#1a3d3d)', liked: true },
      { id: 3, titre: 'Rêve Violet', cat: 'Art Numérique', annee: 2023, likes: 276, vues: 980, prix: null, dispo: true, couleur: 'linear-gradient(135deg,#1a0d1a,#3d1040)', liked: false },
      { id: 4, titre: "Champ d'Or", cat: 'Photographie', annee: 2023, likes: 412, vues: 1800, prix: 1200, dispo: false, couleur: 'linear-gradient(225deg,#1a1a0d,#3d3d10)', liked: false },
      { id: 5, titre: 'Territoire Rouge', cat: 'Peinture', annee: 2022, likes: 1400, vues: 5200, prix: 4800, dispo: true, couleur: 'linear-gradient(135deg,#1a0d0d,#3d1010)', liked: false },
      { id: 6, titre: 'Jardin Secret', cat: 'Sculpture', annee: 2022, likes: 198, vues: 760, prix: 3600, dispo: true, couleur: 'linear-gradient(135deg,#0d1a0d,#103d10)', liked: false }
    ],
    comments: [
      { id: 1, nom: 'Marie L.', initiales: 'ML', oeuvre: 'Territoire Rouge', texte: 'Cette œuvre me touche profondément, la couleur est absolument saisissante !', date: 'Il y a 2 min', approuve: false, couleur: '#c9a96e' },
      { id: 2, nom: 'Jean-Paul R.', initiales: 'JP', oeuvre: 'Territoire Rouge', texte: 'Magistral. Le mouvement dans la matière est fascinant.', date: 'Il y a 5 min', approuve: false, couleur: '#2a4a3a' },
      { id: 3, nom: 'Sarah K.', initiales: 'SK', oeuvre: 'Profondeur Bleue', texte: 'La lumière dans cette photo est incroyable. Comment avez-vous capturé ça ?', date: 'Il y a 1h', approuve: true, couleur: '#2a2a4a' }
    ],
    messages: [
      { id: 1, nom: 'Galerie Luminos', initiales: 'GL', sujet: "Proposition d'exposition", preview: 'Bonjour, nous souhaitons vous proposer une exposition en avril...', corps: "Bonjour Joselito, nous représentons la Galerie Luminos et souhaitons vous inviter à exposer vos œuvres lors de notre prochain événement en avril 2025.", email: 'contact@galerie-luminos.fr', time: '09:14', unread: true },
      { id: 2, nom: 'Thomas B.', initiales: 'TB', sujet: 'Acquisition Territoire Rouge', preview: "Je suis intéressé par l'acquisition de Territoire Rouge...", corps: "Bonjour, je suis collectionneur d'art contemporain et je suis très intéressé par votre œuvre Territoire Rouge. Pouvez-vous me donner plus d'informations ?", email: 'thomas.b@email.com', time: 'Hier', unread: true },
      { id: 3, nom: "Musée d'Art Moderne", initiales: 'MA', sujet: 'Résidence artistique', preview: 'Votre candidature pour la résidence artistique a bien été...', corps: "Nous avons bien reçu votre candidature pour la résidence artistique 2025. Votre dossier a été sélectionné pour la phase finale.", email: 'residences@mam.fr', time: 'Lun', unread: true },
      { id: 4, nom: 'Claire M.', initiales: 'CM', sujet: 'Commande confirmée', preview: 'Merci pour votre réponse, je confirme ma commande...', corps: "Suite à notre échange, je confirme ma commande pour la reproduction de Lumière d'Aube en format 40x60cm.", email: 'claire.m@email.com', time: 'Dim', unread: false }
      
    ]
  }),

  getters: {
    isLoggedIn: (s) => !!s.currentUser,
    isAdmin: (s) => s.currentUser?.role === 'admin',
    pendingComments: (s) => s.comments.filter(c => !c.approuve).length
  },

  actions: {
    login(email, password) {
      if (email === 'admin@artnova.com' && password === 'admin123') {
        this.currentUser = { nom: 'Joselito Kaze', email, role: 'admin' }
        return { ok: true, role: 'admin' }
      } else if (email && password.length >= 4) {
        this.currentUser = { nom: 'Visiteur', email, role: 'visiteur' }
        return { ok: true, role: 'visiteur' }
      }
      return { ok: false, error: 'Email ou mot de passe incorrect.' }
    },

    register(nom, email, password) {
      if (!nom || !email || password.length < 4) return { ok: false, error: 'Champs invalides.' }
      this.currentUser = { nom, email, role: 'visiteur' }
      return { ok: true, role: 'visiteur' }
    },

    logout() { this.currentUser = null },

    toggleLike(id) {
      const o = this.oeuvres.find(x => x.id === id)
      if (!o) return
      o.liked = !o.liked
      o.likes += o.liked ? 1 : -1
    },

    addOeuvre(data) {
      this.oeuvres.unshift({ ...data, id: Date.now(), likes: 0, vues: 0, liked: false })
    },

    deleteOeuvre(id) {
      const i = this.oeuvres.findIndex(o => o.id === id)
      if (i > -1) this.oeuvres.splice(i, 1)
    },

    approveComment(id) {
      const c = this.comments.find(x => x.id === id)
      if (c) c.approuve = true
    },

    deleteComment(id) {
      const i = this.comments.findIndex(x => x.id === id)
      if (i > -1) this.comments.splice(i, 1)
    },

    markMessageRead(id) {
      const m = this.messages.find(x => x.id === id)
      if (m) m.unread = false
    }
  }
})
