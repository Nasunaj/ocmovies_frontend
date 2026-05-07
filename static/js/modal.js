/**
 * Initialise une modale spécifique avec ses écouteurs d'événements.
 * @param {string} modalId - ID de la modale (ex: "movie-modal-1").
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