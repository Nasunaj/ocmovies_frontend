/**
 * Convertit une notation de film (ex: "PG-13", "R", "12") en une notation adaptée au public français.
 * @param {string} rating - Notation originale (ex: "PG-13", "R", "12", "Not rated").
 * @returns {string} - Notation adaptée (ex: "-12 ans", "-16 ans", "Tous publics").
 */
function FrenchRating(rating) {
    if (!rating || rating === "Not rated or unkown rating") {
        return "Non classé";
    }

    // Notations américaines (MPAA)
    const usaRatings = {
        "G": "Tous publics",
        "PG": "Tous publics",
        "PG-13": "-12 ans",
        "R": "-16 ans",
        "NC-17": "-18 ans",
        "NR": "Non classé",
        "Unrated": "Non classé"
    };

    // Notations européennes (ex: "12", "16", "18")
    const euRatings = {
        "12": "-12 ans",
        "12A": "-12 ans", // Royaume-Uni
        "15": "-15 ans", // Royaume-Uni
        "14": "-14 ans",    // Canada/Allemagne
        "14A": "-14 ans",
        "16": "-16 ans",
        "18": "-18 ans",
        "U": "Tous publics", // Royaume-Uni
        "PG": "Tous publics" // Royaume-Uni
    };

    // Vérifie d'abord les notations USA
    if (usaRatings[rating]) {
        return usaRatings[rating];
    }
    // Sinon, vérifie les notations européennes
    else if (euRatings[rating]) {
        return euRatings[rating];
    }
    // Sinon, retourne la notation originale (ou "Non classé")
    else {
        return rating.includes("+")
            ? `-${rating.replace("+", " ans")}` // Ex: "12+" → "-12 ans"
            : rating;
    }
}