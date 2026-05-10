/**
 * Configuration des écouteurs pour les boutons "Voir plus" et "Voir moins" d'une grille de films.
 * Ces boutons permettent d'afficher/ masquer de façon dynamique les cartes de films selon la taille de l'écran.
 *
 * @param {string} gridSelector - Sélecteur CSS de la grille contenant les cartes de films (ex : '.top-movies-grid').
 * @param {string} plusButtonSelector - Sélecteur CSS du bouton "Voir plus" (ex : '#voir-plus').
 * @param {string} moinsButtonSelector - Sélecteur CSS du bouton "Voir moins" (ex : '#voir-moins').
 *
 * @description
 * - Par défaut, seules les deux premières cartes sont visibles sur tous les écrans (PC, tablette et mobile).
 * - Les 2 suivantes sont visibles uniquement sur tablette et PC.
 * - Les 2 dernières sont visibles suniquement sur PC.
 * - En cliquant sur "Voir plus", toutes les cartes deviennent visibles.
 * - En cliquant sur "Voir moins", les cartes reviennent à leur état initial.
 *
 * @example
 * // Appel pour la section "Films les mieux notés"
 * setupVisibilityToggle('.top-movies-grid', '#voir-plus', '#voir-moins');
 */
function setupVisibilityToggle(gridSelector, plusButtonSelector, moinsButtonSelector) {

    // Récupère les éléments HTML correspondants aux sélecteurs passés en paramètres.
    const voirPlusButton = document.querySelector(plusButtonSelector);
    const voirMoinsButton = document.querySelector(moinsButtonSelector);
    const moviesGrid = document.querySelector(gridSelector);

    // Vérifie que les 3 éléments existent avant de continuer
    if (voirPlusButton && voirMoinsButton && moviesGrid) {
        // Fonction pour afficher toutes les cartes
        /*const showAllMovies = function() {
            const hiddenMovies = moviesGrid.querySelectorAll('.hidden-on-tablet-and-mobile');
            hiddenMovies.forEach(function(movie) {
                movie.classList.remove('hidden-on-tablet-and-mobile');
                movie.classList.add('visible-on-all');
            });
            voirPlusButton.style.display = 'none';
            voirMoinsButton.style.display = 'block';
        };*/
        const showAllMovies = function() {
            const allMovies = moviesGrid.querySelectorAll('.top-movies-card');
            allMovies.forEach(movie => {
                // Force l'affichage de toutes les cartes
                movie.style.display = 'block';
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
                // Réinitialise le style.display pour chaque carte
                movie.style.display = '';
            }
            // Masque le bouton "Voir moins" et affiche de nouveau le bouton "Voir plus"
            voirMoinsButton.style.display = 'none';
            voirPlusButton.style.display = 'block';
        };

        // Écouteurs d'événements
        voirPlusButton.addEventListener('click', showAllMovies);
        voirMoinsButton.addEventListener('click', hideExtraMovies);
    }
}


