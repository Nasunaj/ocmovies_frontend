/**
 * Initialise une modale avec ses écouteurs d'événements (ouverture, fermeture).
 * Ajoute des écouteurs pour :
 * - Fermer la modale en cliquant sur le bouton "×" ('.close-modal').
 * - Fermer la modale en cliquant sur le bouton "Fermer" ('.close-button').
 * - Fermer la modale en cliquant à l'extérieur.
 *
 * @param {string} modalId - ID unique de la modale (ex: "movie-modal-1").
 * @returns {Function} Une fonction 'openModal' pour ouvrir la modale depuis l'extérieur.
 * @throws {Error} Si 'modalId' n'est pas une chaîne non vide ou si la modale n'existe pas.
 *
 * @example
 * // Initialiser une modale et l'ouvrir
 * const openMovieModal = initModal("movie-modal-1");
 * openMovieModal(); // Ouvre la modale
 */
function initModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`Modale avec ID "${modalId}" introuvable.`);
        return;
    }

    const closeModalButton = modal.querySelector('.close-modal');
    const closeFooterButton = modal.querySelector('.close-button');

    // Fonction pour ouvrir cette modale
    const openModal = function() {
        console.log(`Ouverture de la modale : ${modalId}`);
        modal.style.display = 'block';
    };

    // Fonction pour fermer cette modale
    const closeModal = function() {
        console.log(`Fermeture de la modale : ${modalId}`);
        modal.style.display = 'none';
    };

    // Écouteur pour le bouton "×" (fermeture)
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Écouteur pour le bouton "Fermer" (pied de modale)
    if (closeFooterButton) {
        closeFooterButton.addEventListener('click', closeModal);
    }

    // Écouteur pour fermer en cliquant à l'extérieur
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Retourne la fonction openModal pour pouvoir l'appeler depuis l'extérieur
    return openModal;
}


/**
 * Initialise toutes les modales de la page et configure les écouteurs pour les boutons "Détails".
 * - Parcourt toutes les modales (éléments avec la classe '.modal').
 * - Appelle `initModal` pour chaque modale et stocke sa fonction `openModal`.
 * - Ajoute un écouteur unique sur `document` pour les boutons "Détails" (délégation d'événements).
 *   Utilise l'attribut `data-modal-id` pour associer un bouton à une modale.
 *
 * @depends
 * - Les modales doivent avoir un ID unique et la classe '.modal'.
 * - Les boutons "Détails" doivent avoir :
 *   - La classe `.top-movies-button` ou '.movie-button'.
 *   - Un attribut 'data-modal-id' avec l'ID de la modale à ouvrir.
 *
 * @example
 * // Appeler une seule fois au chargement de la page
 * document.addEventListener('DOMContentLoaded', initAllModals);
 */
function initAllModals() {
    const modals = document.querySelectorAll('.modal');
    const openModalFunctions = {};

    modals.forEach(modal => {
        const modalId = modal.id;
        if (modalId) {
            openModalFunctions[modalId] = initModal(modalId);
        }
    });

    // Écouteur UNIQUE pour les boutons "Détails"
    document.addEventListener('click', function(event) {
        // Vérifie si le clic vient d'un bouton avec la classe "top-movies-button" OU "movie-button"
        if (event.target.classList.contains('top-movies-button') || event.target.classList.contains('movie-button')) {
            event.preventDefault();
            // Récupère l'ID de la modale depuis data-modal-id (OBLIGATOIRE)
            const targetModalId = event.target.getAttribute('data-modal-id');
            if (!targetModalId) {
                console.error("Le bouton n'a pas d'attribut data-modal-id !");
                return;
            }
            if (openModalFunctions[targetModalId]) {
                openModalFunctions[targetModalId]();
            } else {
                console.error(`Aucune fonction openModal trouvée pour la modale "${targetModalId}"`);
            }
        }
    });
}