/**
 * Charge et affiche les films d'une catégorie donnée (en utilisant le nom du genre).
 * @param {string} genreName - Le nom du genre (ex: "Thriller").
 * @param {string} sectionTitle - Le titre de la section (ex: "Thriller").
 * @param {string} sectionClass - La classe CSS de la section (ex: "top-rated-movies-cat3").
 */
function loadMoviesByCategory2(genreName, sectionTitle, sectionClass) {
    // 1. URL avec le NOM du genre (pas l'ID)
    const categoryUrl = `http://127.0.0.1:8000/api/v1/titles/?genre=${genreName}&sort_by=-imdb_score&page_size=7`;
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

                let cardClass = 'top-movies-card ';
                if (i < 2) {
                    cardClass += 'visible-on-all';
                } else if (i < 4) {
                    cardClass += 'visible-on-tablet-and-desktop';
                } else {
                    cardClass += 'hidden-on-tablet-and-mobile';
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
 * Remplit une liste déroulante avec tous les genres.
 * @param {string} dropdownMenuSelector - Sélecteur CSS du menu déroulant.
 * @param {string} selectedGenre - Le genre actuellement sélectionné.
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