# OCMovies Frontend

> **Projet** : Développement d'une interface utilisateur pour une application web Python utilisant l'API OCMovies.
---

## 📌 À propos du projet

### Description
OCMovies Frontend est une interface web conçue pour permettre aux utilisateurs de visualiser en temps réel des films, en s'appuyant sur une **API locale** (OCMovies-API : https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git). Ce projet vise à :
- Afficher les meilleurs films et les catégories disponibles.
- Être **responsive** (adapté à 3 écrans laptop (1054px), tablette (788px) et mobile(456px)).
- Respecter les bonnes pratiques du développement front-end (sémantique HTML5, validation W3C, accessibilité).

### Maquette
La maquette Figma de référence est disponible [ici](https://www.figma.com/design/6KzVM5R2pOBX637RcVWjJ7/Maquettes-JustStreamIt?node-id=0-1&p=f&t=nrTZqOT6Upg6y8Bx-0).

---

## Prérequis

### Environnement
- **Node.js** (version 16+ recommandée)
- **Python 3.8+** (pour lancer l'API locale OCMovies)
- Un navigateur moderne (exemple : Firefox)

### Dépendances
Aucune dépendance front-end externe n'est requise (HTML5/CSS3/JS vanilla).  
  
## Installation et lancement  
1) Cloner le repository de l'API (https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git) et suivre les instruction
2) Cloner ce repository (https://github.com/Nasunaj/ocmovies_frontend.git) et placer le dossier (`ocmovies_frontend/` à la racine du projet de l'API OCMovies-API-EN-FR)
3) Configuration des chemins :
   1) `config/settings.py` 
      1) Mise à jour du chemin pour index.html (dossier `templates/`) -> "DIRS": [os.path.join(BASE_DIR,"ocmovies_frontend/templates")]
      2) Chemin pour les fichiers .css et .js (dossier `static/`) -> après STATIC_URL = "/static/", ajouter STATICFILES_DIRS = [os.path.join(BASE_DIR, "ocmovies_frontend/static")]
   2) `config/urls.py` : 
      1) Nouveau chemin d'accueil :  dans urlpaterns[...] contenant le chemin des endpoints ajouter: path('', TemplateView.as_view(template_name='index.html'), name='home')
4) Lancer l'API et accéder au site local : http://127.0.0.1:8000/ 

## Structure du projet frontend
```aiignore
├── static
│   ├── css
│   │   ├── listederoulante.css
│   │   ├── modal.css
│   │   └── style.css
│   ├── favicon.ico
│   ├── images
│   │   ├── juststreamit.png
│   │   ├── notfound.jpg
│   │   └── notfound.png
│   └── js
│       ├── btndetails.js
│       ├── categorie_autre.js
│       ├── categorie.js
│       ├── formatfunction.js
│       ├── modal2.js
│       ├── modalbis.js
│       ├── modal.js
│       └── topratemovies.js
└── templates
    └── index.html
```