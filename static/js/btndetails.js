// Attendre que le DOM soit complètement chargé
/*function btndetalis(){
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments nécessaires
    const voirPlusButton = document.querySelector('.voir-plus-button');
    const voirMoinsButton = document.querySelector('.voir-moins-button');
    const moviesGrid = document.querySelector('.top-movies-grid');

    //console.log(moviesGrid);

    // Vérifier si les éléments existent
    if (voirPlusButton && voirMoinsButton && moviesGrid) {
        // Fonction pour afficher toutes les cartes
        const showAllMovies = function() {
            const hiddenMovies = moviesGrid.querySelectorAll('.hidden-on-tablet-and-mobile');
            hiddenMovies.forEach(function(movie) {
                movie.classList.remove('hidden-on-tablet-and-mobile');
                movie.classList.add('visible-on-all');
            });
            voirPlusButton.style.display = 'none';
            voirMoinsButton.style.display = 'block';
        };

// Fonction pour masquer les cartes supplémentaires et revenir à l'état initial
        const hideExtraMovies = function() {
            // Sélectionne toutes les cartes dans la grille
            const allMovies = moviesGrid.children;

            // Parcourt toutes les cartes
            for (let i = 0; i < allMovies.length; i++) {
                const movie = allMovies[i];
                // Réinitialise les classes selon l'index
                if (i < 2) {
                    // Les 2 premières cartes : visible-on-all
                    movie.className = 'top-movies-card visible-on-all';
                } else if (i < 4) {
                    // Les 2 suivantes (indices 2 et 3) : visible-on-tablet-and-desktop
                    movie.className = 'top-movies-card visible-on-tablet-and-desktop';
                } else {
                    // Les 2 dernières (indices 4 et 5) : hidden-on-tablet-and-mobile
                    movie.className = 'top-movies-card hidden-on-tablet-and-mobile';
                }
            }
            // Masque le bouton "Voir moins" et réaffiche "Voir plus"
            voirMoinsButton.style.display = 'none';
            voirPlusButton.style.display = 'block';
        };
        // Écouteurs d'événements
        voirPlusButton.addEventListener('click', showAllMovies);
        voirMoinsButton.addEventListener('click', hideExtraMovies);
    }
});
}*/

// Fonction pour configurer les écouteurs des boutons "Voir plus/moins"
function setupVisibilityToggle(gridSelector, plusButtonSelector, moinsButtonSelector) {
    // Sélectionner les éléments nécessaires
    const voirPlusButton = document.querySelector(plusButtonSelector);
    const voirMoinsButton = document.querySelector(moinsButtonSelector);
    const moviesGrid = document.querySelector(gridSelector);

    // Vérifier si les éléments existent
    if (voirPlusButton && voirMoinsButton && moviesGrid) {
        // Fonction pour afficher toutes les cartes
        const showAllMovies = function() {
            const hiddenMovies = moviesGrid.querySelectorAll('.hidden-on-tablet-and-mobile');
            hiddenMovies.forEach(function(movie) {
                movie.classList.remove('hidden-on-tablet-and-mobile');
                movie.classList.add('visible-on-all');
            });
            voirPlusButton.style.display = 'none';
            voirMoinsButton.style.display = 'block';
        };

        // Fonction pour masquer les cartes supplémentaires et revenir à l'état initial
        const hideExtraMovies = function() {
            // Sélectionne toutes les cartes dans la grille
            const allMovies = moviesGrid.children;

            // Parcourt toutes les cartes
            for (let i = 0; i < allMovies.length; i++) {
                const movie = allMovies[i];
                // Réinitialise les classes selon l'index
                if (i < 2) {
                    // Les 2 premières cartes : visible-on-all
                    movie.className = 'top-movies-card visible-on-all';
                } else if (i < 4) {
                    // Les 2 suivantes (indices 2 et 3) : visible-on-tablet-and-desktop
                    movie.className = 'top-movies-card visible-on-tablet-and-desktop';
                } else {
                    // Les 2 dernières (indices 4 et 5) : hidden-on-tablet-and-mobile
                    movie.className = 'top-movies-card hidden-on-tablet-and-mobile';
                }
            }
            // Masque le bouton "Voir moins" et réaffiche "Voir plus"
            voirMoinsButton.style.display = 'none';
            voirPlusButton.style.display = 'block';
        };

        // Écouteurs d'événements
        voirPlusButton.addEventListener('click', showAllMovies);
        voirMoinsButton.addEventListener('click', hideExtraMovies);
    }
}


