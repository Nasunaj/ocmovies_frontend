/**
 * Crée une modale pour afficher les détails d'un film.
 * La modale est ajoutée au DOM avec un ID unique et des éléments vides (à remplir ultérieurement).
 * Les écouteurs pour ouvrir/fermer la modale sont initialisés via `initModal`.
 *
 * @param {string} modalId - ID unique de la modale (ex: "movie-modal-1").
 * @param {string} title - ID pour l'élément `<h2>` du titre du film (ex: "modal-title-1").
 * @param {string} yearGenre - ID pour l'élément `<p>` de l'année et du genre (ex: "modal-year-genre-1").
 * @param {string} ratingDuration - ID pour l'élément `<p>` de la note et de la durée (ex: "modal-rating-duration-1").
 * @param {string} imdbScore - ID pour l'élément `<span>` du score IMDb (ex: "modal-imdb-score-1").
 * @param {string} boxOffice - ID pour l'élément `<span>` des recettes au box-office (ex: "modal-box-office-1").
 * @param {string} posterUrl - ID pour l'élément `<img>` de l'affiche (ex: "modal-poster-1").
 * @param {string} director - ID pour l'élément `<span>` du réalisateur (ex: "modal-director-1").
 * @param {string} summary - ID pour l'élément `<p>` du résumé (ex: "modal-summary-1").
 * @param {string} actors - ID pour l'élément `<span>` des acteurs (ex: "modal-actors-1").
 *
 * @description
 * 1) Crée une structure HTML pour une modale avec :
 *   - Un bouton de fermeture "×" (classe `.close-modal`).
 *   - Un titre (`<h2>`), une année/genre (`<p>`), une note/durée (`<p>`), un score IMDb (`<span>`), et des recettes (`<span>`).
 *   - Une affiche de film (`<img>`) avec un fallback en cas d'erreur.
 *   - Un réalisateur (`<span>`), un résumé (`<p>`), et des acteurs (`<span>`).
 *   - Un bouton "Fermer" dans le pied de modale (classe `.close-button`).
 * 2) Appelle `initModal(modalId)` pour initialiser les écouteurs de la modale.
 *
 * @depends
 * - La fonction `initModal` doit être définie.
 *
 * @example
 * // Créer une modale pour le film "Inception"
 * createModal(
 *     "movie-modal-inception",
 *     "modal-title-inception", "modal-year-genre-inception", "modal-rating-duration-inception",
 *     "modal-imdb-score-inception", "modal-box-office-inception", "modal-poster-inception",
 *     "modal-director-inception", "modal-summary-inception", "modal-actors-inception"
 * );
 *
 * @example
 * // Créer 6 modales pour une catégorie (dans le cas des 6 meilleurs films)
 * for (let i = 0; i < 6; i++) {
 *     createModal(
 *         `movie-modal-cat1-${i}`,
 *         `modal-title-cat1-${i}`, `modal-year-genre-cat1-${i}`, `modal-rating-duration-cat1-${i}`,
 *         `modal-imdb-score-cat1-${i}`, `modal-box-office-cat1-${i}`, `modal-poster-cat1-${i}`,
 *         `modal-director-cat1-${i}`, `modal-summary-cat1-${i}`, `modal-actors-cat1-${i}`
 *     );
 * }
 */
function createModal(modalId, title, yearGenre, ratingDuration, imdbScore,
                     boxOffice, posterUrl, director, summary, actors) {
    const modalHTML = `
        <div id="${modalId}" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body">
                    <div class="modal-info">
                        <h2 id="${title}" class="modal-title"></h2>
                        <p id="${yearGenre}" class="modal-year-genre"></p>
                        <p id="${ratingDuration}" class="modal-rating-duration"></p>
                        <p class="modal-imdb">IMDB score: <span id="${imdbScore}" class="modal-imdb-score"></span>/10</p>
                        <p class="modal-boxoffice">Recettes au box-office: <span id="${boxOffice}" class="modal-box-office"></span></p>
                    </div>
                    <div class="modal-poster">
                        <img id="${posterUrl}" class="modal-poster-img" src="" alt="Affiche du film"
                             onerror="this.onerror=null; this.src='static/images/notfound.jpg';">
                    </div>
                    <div class="modal-inforesume">
                        <p><span class="modal-int-realise">Réalisé par:</span> <span id="${director}" class="modal-director"></span></p>
                        <p id="${summary}" class="modal-summary"></p>
                    </div>
                    <div class="modal-avecactors">
                        <p><span class="modal-int-actors">Avec:</span> <span id="${actors}" class="modal-actors"></span></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="close-button">Fermer</button>
                </div>
            </div>
        </div>
    `;

    // Ajoute la modale au DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Initialise les écouteurs POUR CETTE MODALE
    initModal(modalId); // <-- Appel direct ici
}

// 2. Crée tes modales (avec des ID uniques)
createModal(
    "movie-modal",
    "modal-title", "modal-year-genre", "modal-rating-duration",
    "modal-imdb-score", "modal-box-office", "modal-poster",
    "modal-director", "modal-summary", "modal-actors"
);


    for(let i = 1; i <=6; i++) {
        createModal(
            `movie-modal-${i}`,
            `modal-title-${i}`, `modal-year-genre-${i}`, `modal-rating-duration-${i}`,
            `modal-imdb-score-${i}`, `modal-box-office-${i}`, `modal-poster-${i}`,
            `modal-director-${i}`, `modal-summary-${i}`, `modal-actors-${i}`
        );

    }

for(let i = 0; i <6; i++) {
    let name_cat="top-rated-movies-cat1"
    createModal(
        `movie-modal-${name_cat}-${i}`,
        `modal-title-${name_cat}-${i}`, `modal-year-genre-${name_cat}-${i}`, `modal-rating-duration-${name_cat}-${i}`,
        `modal-imdb-score-${name_cat}-${i}`, `modal-box-office-${name_cat}-${i}`, `modal-poster-${name_cat}-${i}`,
        `modal-director-${name_cat}-${i}`, `modal-summary-${name_cat}-${i}`, `modal-actors-${name_cat}-${i}`
    );

}

for(let i = 0; i <6; i++) {
    let name_cat="top-rated-movies-cat2"
    createModal(
        `movie-modal-${name_cat}-${i}`,
        `modal-title-${name_cat}-${i}`, `modal-year-genre-${name_cat}-${i}`, `modal-rating-duration-${name_cat}-${i}`,
        `modal-imdb-score-${name_cat}-${i}`, `modal-box-office-${name_cat}-${i}`, `modal-poster-${name_cat}-${i}`,
        `modal-director-${name_cat}-${i}`, `modal-summary-${name_cat}-${i}`, `modal-actors-${name_cat}-${i}`
    );

}



// 3. Initialise TOUTES les modales (APRÈS les avoir créées)
document.addEventListener('DOMContentLoaded', function() {
    // Crée les modales ici si nécessaire, puis :
    initAllModals();
});