/**
 * Charge et affiche le meilleur film (meilleur score IMDb) depuis l'API.
 * 1) Récupère le film avec le meilleur score
 * 2) Charge ses détails complets (incluant la description) pour les afficher dans la section `.best-movie-section`.
 *
 * @description
 * - Réalisation d'une première requête à l'API pour récupérer le film avec le meilleur score IMDb.
 * - Puis réalisation d'une deuxième requête pour récupérer les détails complets du film (description, etc.).
 * - Construiction de façon dynamique le HTML du film et insertion dans la section '.best-movie-section'.
 * - Gètion des erreurs d'affichage des images avec un fallback (`notfound.jpg`).
 *
 * @depends
 * - L'API doit être disponible à l'URL `http://127.0.0.1:8000/api/v1/titles/`.
 * - La section `.best-movie-section` doit exister dans le DOM.
 *
 * @throws {Error} Si la requête API échoue ou si la section '.best-movie-section' n'existe pas.
 *
 * @example
 * // Appel automatique au chargement de la page
 * // Le code est exécuté directement sans fonction wrapper.
 */
const bestMovieUrl = 'http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=1';

//utilisation de fetch pour récupérer les données depuis le backend
fetch(bestMovieUrl)
    .then(response => response.json())
    .then(data => {
        const bestMovie = data.results[0]; // bestMovie est défini ici
        fetch(bestMovie.url)
            .then(response => response.json())
            .then(data => {
                const bestMoviedescription = data.description;

                // Sélection de la section HTML
                const bestMovieSection = document.querySelector('.best-movie-section');

                // Construction du HTML du film (ICI, bestMovie est accessible)
                const movieHTML = `   
                    <section class="best-movie-section">
                        <h2>Meilleur film</h2>
                        <div class="best-movie-card">
                            <div class="movie-poster">
                                <img src=${bestMovie.image_url} alt=${bestMovie.title}
                                onerror="this.onerror=null; this.src='static/images/notfound.jpg';">
                            </div>
                            <div class="movie-info">
                                <h2>${bestMovie.title}</h2>
                                <p>${bestMoviedescription || 'Aucune description disponible.'}</p>
                                <a href="" class="movie-button" data-modal-id="movie-modal">Détails</a>
                            </div>
                        </div>
                    </section>`;

                // Insertion du HTML dans le DOM
                bestMovieSection.innerHTML = movieHTML;

            })
    });



/**
 * Charge et affiche les films les mieux notés (score IMDb) depuis l'API.
 * Affiche les films du deuxième au septième (le 1er est déjà affiché : voir ci-dessus) dans la section `.top-rated-movies`,
 * avec une logique de visibilité avec les boutons "Voir plus/moins".
 *
 * @description
 * 1) Récupère les 7 films les mieux notés via l'API (`/titles/?sort_by=-imdb_score&page_size=7`).
 * 2) Affiche les films 2 à 7 dans une grille avec des classes CSS conditionnelles :
 * - Appelle 'setupVisibilityToggle' (voir /static/js/btndetails.js) pour activer les boutons "voir plus/ voir moins"
 *
 * @depends
 * - L'API doit être disponible à l'URL `http://127.0.0.1:8000/api/v1/titles/`.
 * - La section '.top-rated-movies' doit exister dans le DOM.
 * - La fonction 'setupVisibilityToggle' doit être définie.
 *
 * @throws {Error} Si la requête API échoue, si moins de sept films sont retournés, ou si la section `.top-rated-movies` n'existe pas.
 *
 * @example
 * // Appel automatique au chargement de la page
 * // Le code est exécuté directement sans fonction wrapper.
 */
// URL pour récupérer les 7 meilleurs films
const topMoviesUrl = 'http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7';

// Requête fetch
fetch(topMoviesUrl)
    .then(response => response.json())
    .then(data => {
        // Extraire les 7 meilleurs films (le 1er est déjà affiché ailleurs)
        const topMovies = data.results; // Tableau des 7 meilleurs films

        // Sélectionner la section HTML
        const bestMovieSection = document.querySelector('.top-rated-movies');

        // Construire le HTML pour les 6 cartes (du 2ème au 7ème film)
        let movieHTML = `
      <section class="top-rated-movies">
        <h2>Films les mieux notés</h2>
        <div class="top-movies-grid">
    `;

        // Boucle pour générer les 6 cartes (index 1 à 6)
        for (let i = 1; i <= 6; i++) {
            const movie = topMovies[i]; // 2ème film = index 1, 3ème = index 2, etc.

            // Déterminer les classes CSS pour chaque carte (visibilité)
            let cardClass = 'top-movies-card';
            if (i <= 2) {
                cardClass += ' visible-on-all'; // Cartes 1 et 2 : visibles sur tous les écrans
            } else if (i <= 4) {
                cardClass += ' visible-on-tablet-and-desktop'; // Cartes 3 et 4 : visibles sur tablette et desktop
            } else {
                cardClass += ' hidden-on-tablet-and-mobile'; // Cartes 5 et 6 : cachées sur tablette et mobile
            }
            /*Dans la boucle for pour le nom des classes il est nécessaire d'avoir des espaces avec les noms de classes
            car on cumule les noms de classes et donc sans espaces au lieu d'avoir deux noms de classes nous aurions
            qu'une classe non définie en CSS*/
            // 8. Ajouter le HTML pour chaque carte
            movieHTML += `
        <article class="${cardClass}">
          <div class="top-movies-poster">
            <img src="${movie.image_url}" alt="${movie.title}"
                 onerror="this.onerror=null; this.src='static/images/notfound.jpg';">
          </div>
          <div class="top-movies-info">
            <h3>${movie.title}</h3>
            <a href="#" class="top-movies-button" data-modal-id="movie-modal-${i}">Détails</a>
          </div>
        </article>
      `;
        }

        // Fermer les balises et ajouter les boutons
        movieHTML += `
        </div>
        <button id="voir-plus" class="voir-plus-button">Voir plus</button>
        <button id="voir-moins" class="voir-moins-button" style="display: none;">Voir moins</button>
      </section>
    `;

        // Insérer le HTML dans le DOM
        bestMovieSection.innerHTML = movieHTML;
        setupVisibilityToggle('.top-movies-grid', '#voir-plus', '#voir-moins');

    });