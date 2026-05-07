function createModal(modalId, title, yearGenre, ratingDuration, imdbScore, boxOffice, posterUrl, director, summary, actors) {
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