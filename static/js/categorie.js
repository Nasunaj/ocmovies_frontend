/**
 * Charge et affiche les films d'une catégorie donnée depuis l'API.
 *
 * @param {string} genreId - Le nom du genre (ex: "Thriller", "Action").Ce paramètre est utilisé directement dans
 * l'URL de l'API.
 * @param {string} sectionTitle - Le titre de la section. Affiché en tant que `<h2>` dans la section.
 * @param {string} sectionClass - La classe CSS de la section. Utilisée pour : sélectionner/créer la section dans le
 * DOM. Générer des ID uniques pour les boutons et modales (ex: `voir-plus-${sectionClass}`).
 *
 * @description
 * 1) Effectue une requête GET à l'API pour récupérer les 6 meilleurs films de la catégorie.
 * - Si la section `.${sectionClass}` n'existe pas, elle est créée et ajoutée au `<body>`.
 * 2) Affiche ces 6 films dans une grille
 * - Ajoute des boutons "Voir plus" et "Voir moins" pour basculer la visibilité de toutes les cartes.
 * - Appelle `setupVisibilityToggle` pour activer les boutons.
 *
 * @depends
 * - L'API doit être disponible à `http://127.0.0.1:8000/api/v1/titles/` et accepter le paramètre `genre`.
 * - La fonction `setupVisibilityToggle` doit être définie.
 *
 * @throws {Error} Si :
 *   - La requête API échoue (erreur HTTP).
 *   - Moins de 6 films sont retournés pour la catégorie.
 *   - `movie.title` ou `movie.image_url` est indéfini pour un film.
 *
 * @example
 * // Charger les films de la catégorie "Thriller"
 * loadMoviesByCategory("Thriller", "Thriller", "top-rated-movies-cat1");
 *
 * @example
 * // Charger les films de la catégorie "Action" avec un titre personnalisé
 * loadMoviesByCategory("Action", "Les meilleurs films d'action", "action-movies");
 */

function loadMoviesByCategory(genreId, sectionTitle, sectionClass) {

    // URL pour récupérer les 7 meilleurs films de la catégorie
    const categoryUrl = `http://127.0.0.1:8000/api/v1/titles/?genre=${genreId}&sort_by=-imdb_score&page_size=6`;
    //console.log(categoryUrl);

    // 2. Requête fetch
    fetch(categoryUrl)
        .then(response => response.json())
        .then(data => {
            const topMovies = data.results; // Tableau des 7 meilleurs films de la catégorie

            // Sélectionner la section HTML (ou la créer si elle n'existe pas)
            let section = document.querySelector(`.${sectionClass}`);
            if (!section) {
                section = document.createElement('section');
                section.className = sectionClass;
                document.body.appendChild(section); // Ajoute la section au body (ou à un autre conteneur)
            }

            // Construire le HTML pour les 6 cartes
            let movieHTML = `
            <h2>${sectionTitle}</h2>
            <div class="top-movies-grid">`;

            // Boucle pour générer les 6 cartes
            for (let i = 0; i < 6; i++) {
                const movie = topMovies[i]; // 1er film = index 0, etc.

                // Déterminer les classes CSS pour chaque carte
                let cardClass = 'top-movies-card';
                if (i < 2) {
                    cardClass += ' visible-on-all';
                } else if (i < 4) {
                    cardClass += ' visible-on-tablet-and-desktop';
                } else {
                    cardClass += ' hidden-on-tablet-and-mobile';
                }

                //Ajouter le HTML pour chaque carte
                movieHTML += `
                <article class="${cardClass}">
                    <div class="top-movies-poster">
                        <img src="${movie.image_url}" alt="${movie.title}"
                        onerror="this.onerror=null; this.src='static/images/notfound.jpg';">
                    </div>
                    <div class="top-movies-info">
                        <h3>${movie.title}</h3>
                        <a href="#" class="top-movies-button" data-modal-id="movie-modal-${sectionClass}-${i}">
                        Détails
                        </a>
                    </div>
                </article> `;
            }

            // Fermer les balises et ajouter les boutons
            movieHTML += `
            </div>
            <button id="voir-plus-${sectionClass}" class="voir-plus-button">Voir plus</button>
            <button id="voir-moins-${sectionClass}" class="voir-moins-button" style="display: none;">
            Voir moins
            </button>`;
            //console.log(movieHTML);

            // Insérer le HTML dans la section
            section.innerHTML = movieHTML;
            setupVisibilityToggle(
                `.${sectionClass} .top-movies-grid`,  // Grille de films dans la section
                `#voir-plus-${sectionClass}`,        // Bouton "Voir plus"
                `#voir-moins-${sectionClass}`        // Bouton "Voir moins"
            );
        });
}

// Appel pour la catégorie
loadMoviesByCategory("Thriller", "Thriller", "top-rated-movies-cat1");
loadMoviesByCategory("Action", "Action", "top-rated-movies-cat2");
