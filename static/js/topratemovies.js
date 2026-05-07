const bestMovieUrl = 'http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=1';
//const bestMovieUrl='http://127.0.0.1:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=3&rating=&rating_contains=&sort_by=votes&title=&title_contains=&writer=&writer_contains=&year='
fetch(bestMovieUrl)
    .then(response => response.json())
    .then(data => {
        const bestMovie = data.results[0]; // bestMovie est défini ici
        fetch(bestMovie.url)
            .then(response => response.json())
            .then(data => {
                const bestMoviedescription = data.description;

                // 5.1. Sélectionner la section HTML
                const bestMovieSection = document.querySelector('.best-movie-section');
                // 5.2. Construire le HTML du film (ICI, bestMovie est accessible)
                const movieHTML = `   
        <section class="best-movie-section">
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
        </section>
    `;

                // 5.3. Insérer le HTML dans le DOM
                bestMovieSection.innerHTML = movieHTML;

            })

    });



// 1. URL pour récupérer les 7 meilleurs films
const topMoviesUrl = 'http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7';

// 2. Requête fetch
fetch(topMoviesUrl)
    .then(response => response.json())
    .then(data => {
        // 3. Extraire les 7 meilleurs films (le 1er est déjà affiché ailleurs)
        const topMovies = data.results; // Tableau des 7 meilleurs films

        // 4. Sélectionner la section HTML
        const bestMovieSection = document.querySelector('.top-rated-movies');

        // 5. Construire le HTML pour les 6 cartes (du 2ème au 7ème film)
        let movieHTML = `
      <section class="top-rated-movies">
        <h2>Films les mieux notés</h2>
        <div class="top-movies-grid">
    `;

        // 6. Boucle pour générer les 6 cartes (index 1 à 6)
        for (let i = 1; i <= 6; i++) {
            const movie = topMovies[i]; // 2ème film = index 1, 3ème = index 2, etc.

            // 7. Déterminer les classes CSS pour chaque carte (visibilité)
            let cardClass = 'top-movies-card ';
            if (i <= 2) {
                cardClass += 'visible-on-all'; // Cartes 1 et 2 : visibles sur tous les écrans
            } else if (i <= 4) {
                cardClass += 'visible-on-tablet-and-desktop'; // Cartes 3 et 4 : visibles sur tablette et desktop
            } else {
                cardClass += 'hidden-on-tablet-and-mobile'; // Cartes 5 et 6 : cachées sur tablette et mobile
            }

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

        // 9. Fermer les balises et ajouter les boutons
        movieHTML += `
        </div>
        <button id="voir-plus" class="voir-plus-button">Voir plus</button>
        <button id="voir-moins" class="voir-moins-button" style="display: none;">Voir moins</button>
      </section>
    `;

        // 10. Insérer le HTML dans le DOM
        bestMovieSection.innerHTML = movieHTML;
        setupVisibilityToggle('.top-movies-grid', '#voir-plus', '#voir-moins');

    });
