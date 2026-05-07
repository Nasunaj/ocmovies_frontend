/**
 * Charge et affiche les films d'une catégorie donnée.
 * @param {string} genreId - Le nom du genre (ex : Thriller).
 * @param {string} sectionTitle - Le titre de la section (ex: "Les films d'action").
 * @param {string} sectionClass - La classe CSS de la section (ex: "action-movies").
 */
function loadMoviesByCategory(genreId, sectionTitle, sectionClass) {
    // 1. URL pour récupérer les 7 meilleurs films de la catégorie
    const categoryUrl = `http://127.0.0.1:8000/api/v1/titles/?genre=${genreId}&sort_by=-imdb_score&page_size=7`;
    //console.log(categoryUrl);
    // 2. Requête fetch
    fetch(categoryUrl)
        .then(response => response.json())
        .then(data => {
            const topMovies = data.results; // Tableau des 7 meilleurs films de la catégorie

            // 3. Sélectionner la section HTML (ou la créer si elle n'existe pas)
            let section = document.querySelector(`.${sectionClass}`);
            if (!section) {
                section = document.createElement('section');
                section.className = sectionClass;
                document.body.appendChild(section); // Ajoute la section au body (ou à un autre conteneur)
            }

            // 4. Construire le HTML pour les 6 cartes (du 2ème au 7ème film)
            let movieHTML = `
        <h2>${sectionTitle}</h2>
        <div class="top-movies-grid">
      `;

            // 5. Boucle pour générer les 6 cartes (index 1 à 6)
            for (let i = 0; i < 6; i++) {
                const movie = topMovies[i]; // 2ème film = index 1, etc.

                // 6. Déterminer les classes CSS pour chaque carte
                let cardClass = 'top-movies-card ';
                if (i < 2) {
                    cardClass += 'visible-on-all';
                } else if (i < 4) {
                    cardClass += 'visible-on-tablet-and-desktop';
                } else {
                    cardClass += 'hidden-on-tablet-and-mobile';
                }

                // 7. Ajouter le HTML pour chaque carte
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
            }

            // 8. Fermer les balises et ajouter les boutons
            movieHTML += `
        </div>
        <button id="voir-plus-${sectionClass}" class="voir-plus-button">Voir plus</button>
        <button id="voir-moins-${sectionClass}" class="voir-moins-button" style="display: none;">Voir moins</button>
      `;
            //console.log(movieHTML);

            // 9. Insérer le HTML dans la section
            section.innerHTML = movieHTML;
            setupVisibilityToggle(
                `.${sectionClass} .top-movies-grid`,  // Grille de films dans la section cat1
                `#voir-plus-${sectionClass}`,        // Bouton "Voir plus" de cat1 et cat2
                `#voir-moins-${sectionClass}`        // Bouton "Voir moins" de cat1 et cat2
            );
        });
}

// Appel pour la catégorie
loadMoviesByCategory("Thriller", "Thriller", "top-rated-movies-cat1");
loadMoviesByCategory("Action", "Action", "top-rated-movies-cat2");




// 1. Fonction pour récupérer tous les genres (toutes les pages)
/*function fetchAllGenres() {
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

// 2. Remplir la liste déroulante avec tous les genres
fetchAllGenres()
    .then(genres => {
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');

        dropdownMenu.innerHTML = '';

        genres.forEach((genre, index) => {
            const li = document.createElement('li');
            const checkMark = (index === 1) ? ' ✅' : ''; // Coche pour la 2ème catégorie
            li.innerHTML = `<a href="#">${genre.name}</a>${checkMark}`;
            dropdownMenu.appendChild(li);
        });

        if (genres.length > 0) {
            dropdownToggle.innerHTML = `
        ${genres[0].name}
        <span class="dropdown-icon">▼</span>
      `;
        }
    })
    .catch(error => {
        console.error('Erreur :', error);
    });*/
