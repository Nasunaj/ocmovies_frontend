/**
 * Charge et affiche les films d'une catégorie donnée (en utilisant le nom du genre) dans le cas du choix du genre par
 * l'utilisateur.
 * Récupère les meilleurs films de la catégorie, les affichent dans une section avec :
 * - Un dropdown pour changer de catégorie.
 * - Une grille de cartes avec une visibilité responsive.
 * - Des boutons "Voir plus/moins" pour basculer l'affichage.
 * - Des modales pour chaque film.
 *
 * @param {string} genreName - Le nom du genre (ex: "Thriller").
 * @param {string} sectionTitle - Le titre de la section (ex: "Thriller").
 * @param {string} sectionClass - La classe CSS de la section (ex: "top-rated-movies-cat3").
 *                                 Doit être unique pour éviter les conflits d'ID.
 *
 * @description
 * 1) Effectue une requête à l'API pour récupérer les 6 meilleurs films de la catégorie
 * (`/titles/?genre=${genreName}&sort_by=-imdb_score&page_size=6`).
 * 2) Affiche ces 6 films (indices 0 à 5) dans une grille
 * - Ajoute un dropdown pour permettre à l'utilisateur de changer de catégorie.
 * - Crée une modale pour chaque film et initialise les écouteurs.
 * - Appelle `setupVisibilityToggle` pour activer les boutons "Voir plus/moins".
 *
 * @depends
 * - L'API doit être disponible à `http://127.0.0.1:8000/api/v1/titles/` et `http://127.0.0.1:8000/api/v1/genres/`.
 * - Les fonctions suivantes doivent être définies :createModal, initAllModals, setupVisibilityToggle, ModalValue, et
 * fetchAllGenres
 *
 *
 * @throws {Error} Si la requête API échoue ou si les données sont incomplètes.
 *
 * @example
 * // Charger les films de la catégorie "Thriller"
 * loadMoviesByCategory2(newGenreName, newGenreName, "top-rated-movies-cat3");
 */
function loadMoviesByCategory2(genreName, sectionTitle, sectionClass) {
    // 1. URL avec le NOM du genre (pas l'ID)
    const categoryUrl = `http://127.0.0.1:8000/api/v1/titles/?genre=${genreName}&sort_by=-imdb_score&page_size=6`;
    console.log("URL de l'API :", categoryUrl); // Vérifie l'URL générée

    fetch(categoryUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            /*console.log("Données reçues :", data.results); // Vérifie les données*/
            const topMovies = data.results;

            // 2. Sélectionner la section HTML
            let section = document.querySelector(`.${sectionClass}`);
            if (!section) {
                section = document.createElement('section');
                section.className = sectionClass;
                document.body.appendChild(section);
            }

            // 3. Construire le HTML
            let movieHTML = `
        <div class="section-header">
          <h2>Autres: </h2>
          <div class="dropdown">
            <button class="dropdown-toggle">
              ${genreName}
              <span class="dropdown-icon">▼</span>
            </button>
            <ul class="dropdown-menu"></ul>
          </div>
        </div>
        <div class="top-movies-grid">
      `;

            // 4. Boucle pour les 6 cartes (index 0 à 5)
            for (let i = 0; i < 6; i++) {
                const movie = topMovies[i];
                if (!movie) {
                    console.warn(`Film ${i} introuvable dans les résultats.`);
                    continue;
                }

                let cardClass = 'top-movies-card';
                if (i < 2) {
                    cardClass += ' visible-on-all';
                } else if (i < 4) {
                    cardClass += ' visible-on-tablet-and-desktop';
                } else {
                    cardClass += ' hidden-on-tablet-and-mobile';
                }

                movieHTML += `
          <article class="${cardClass}">
            <div class="top-movies-poster">
              <img src="${movie.image_url}" alt="${movie.title}"
                   onerror="this.onerror=null; this.src='static/images/notfound.jpg';">
            </div>
            <div class="top-movies-info">
              <h3>${movie.title}</h3>
              <a href="#" class="top-movies-button" data-modal-id="movie-modal-${sectionClass}-${i}">Détails</a>
            </div>
          </article>
        `;

                // Crée la modale pour ce film (avec des ID vides pour l'instant)
                createModal(
                    `movie-modal-${sectionClass}-${i}`,
                    `modal-title-${sectionClass}-${i}`, `modal-year-genre-${sectionClass}-${i}`, `modal-rating-duration-${sectionClass}-${i}`,
                    `modal-imdb-score-${sectionClass}-${i}`, `modal-box-office-${sectionClass}-${i}`, `modal-poster-${sectionClass}-${i}`,
                    `modal-director-${sectionClass}-${i}`, `modal-summary-${sectionClass}-${i}`, `modal-actors-${sectionClass}-${i}`
                );

            }

            movieHTML += `
        </div>
        <button id="voir-plus-${sectionClass}" class="voir-plus-button">Voir plus</button>
        <button id="voir-moins-${sectionClass}" class="voir-moins-button" style="display: none;">Voir moins</button>
      `;
        /*console.log(movieHTML);*/
            // 5. Insérer le HTML dans la section
            section.innerHTML = movieHTML;

            // 6. Configurer les écouteurs pour les boutons "Voir plus/moins"
            setupVisibilityToggle(
                `.${sectionClass} .top-movies-grid`,
                `#voir-plus-${sectionClass}`,
                `#voir-moins-${sectionClass}`
            );

            // Initialise les écouteurs pour les modales (APRÈS les avoir créées)
            initAllModals();

            ModalValue(categoryUrl,sectionClass)

            // 7. Remplir la liste déroulante avec tous les genres
            populateDropdownWithGenres(`.${sectionClass} .dropdown-menu`, genreName);
        })
        .catch(error => {
            console.error("Erreur lors du chargement des films :", error);
        });
}



/**
 * Remplit une liste déroulante avec tous les genres disponibles depuis l'API et Ajoute un écouteur pour changer de
 * catégorie lorsque l'utilisateur sélectionne un genre. Cette fonction est appelée dans la fonction ci-dessus
 * loadMoviesByCategory2.
 *
 * @param {string} dropdownMenuSelector - Sélecteur CSS du menu déroulant (ex: ".dropdown-menu").
 * @param {string} selectedGenre - Le genre actuellement sélectionné (ex: "Thriller").
 *
 * @description
 * 1) Récupère tous les genres via `fetchAllGenres`.
 * 2) Vide le menu existant et le remplit avec les genres.
 * 3) Met à jour le bouton du dropdown avec le genre sélectionné.
 * 4) Ajoute un écouteur pour recharger les films lorsque l'utilisateur clique sur un genre.
 *
 * @depends
 * - La fonction `fetchAllGenres` doit être définie.
 * - Les éléments `.dropdown-menu` et `.dropdown-toggle` doivent exister dans le DOM (remarque : ajouté dans le DOM
 * directement dans la fonction loadMoviesByCategory2
 *
 * @throws {Error} Si la récupération des genres échoue.
 *
 * @example
 *  populateDropdownWithGenres(`.${sectionClass}.dropdown-menu`, 'Action'); (.${sectionClass} peut par exemple être
 *  "top-rated-movies-cat3")
 */
function populateDropdownWithGenres(dropdownMenuSelector, selectedGenre) {
    const dropdownMenu = document.querySelector(dropdownMenuSelector);
    const dropdownToggle = document.querySelector(`${dropdownMenuSelector.replace('.dropdown-menu', '.dropdown-toggle')}`);

    // Vider le menu existant
    dropdownMenu.innerHTML = '';

    // 1. Récupérer tous les genres (noms uniquement)
    fetchAllGenres().then(genres => {
        // Ajouter chaque genre au menu
        genres.forEach(genre => {
            const li = document.createElement('li');
            const isSelected = genre.name === selectedGenre ? ' ✅' : '';
            li.innerHTML = `<a href="#" data-genre-name="${genre.name}">${genre.name}</a>${isSelected}`;
            dropdownMenu.appendChild(li);
        });

        // Mettre à jour le bouton avec le genre sélectionné
        dropdownToggle.innerHTML = `
      ${selectedGenre}
      <span class="dropdown-icon">▼</span>
    `;

        // Ajouter un écouteur pour les clics sur les liens du menu
        dropdownMenu.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target.tagName === 'A') {
                const newGenreName = event.target.getAttribute('data-genre-name');
                dropdownToggle.innerHTML = `
          ${newGenreName}
          <span class="dropdown-icon">▼</span>
        `;
                dropdownMenu.style.display = 'none';
                loadMoviesByCategory2(newGenreName, newGenreName, "top-rated-movies-cat3");
            }
        });
    });
}



/**
 * Récupère tous les genres disponibles depuis l'API.
 *
 * @description
 * 1) Effectue des requêtes paginées à l'API (`/genres/`) jusqu'à ce que tous les genres soient récupérés.
 * 2) Utilise une approche récursive pour suivre les pages.
 *
 * @depends
 * - L'API doit être disponible à http://127.0.0.1:8000/api/v1/genres/ et retourner les genres avec pagination.
 *
 * @throws {Error} Si une requête API échoue.
 *
 * @example
 * fetchAllGenres().then(genres => {
 *     console.log("Genres disponibles :", genres);
 * }); (voir la fonction loadMoviesByCategory2)
 */
function fetchAllGenres() {
    let allGenres = [];
    let nextUrl = 'http://127.0.0.1:8000/api/v1/genres/';

    function fetchPage(url) {
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                allGenres = allGenres.concat(data.results);
                if (data.next) {
                    return fetchPage(data.next);
                } else {
                    return allGenres;
                }
            });
    }

    return fetchPage(nextUrl);
}

document.addEventListener('DOMContentLoaded', () => {
    // Charger la première catégorie par défaut (ex: "Thriller")
    loadMoviesByCategory2("Thriller", "Thriller", "top-rated-movies-cat3");
});