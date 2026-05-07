/**
 * Formate un nombre en dollars avec suffixe "m" (millions) ou "B" (milliards).
 * @param {number} amount - Montant brut (ex: 48200000 pour $48.2m).
 * @returns {string} - Montant formaté (ex: "$48.2m").
 */
function formatBoxOffice(amount) {
    if (amount === null || amount === undefined) {
        return "N/A"; // Si la donnée est manquante
    }

    // Convertir en nombre (au cas où c'est une chaîne de caractères)
    const num = Number(amount);

    if (isNaN(num)) {
        return "N/A"; // Si ce n'est pas un nombre valide
    }

    // Formater en millions ou milliards
    if (num >= 1_000_000_000) {
        // Milliards ($X.XB)
        return `$${(num / 1_000_000_000).toFixed(1)}B`;
    } else if (num >= 1_000_000) {
        // Millions ($X.Xm)
        return `$${(num / 1_000_000).toFixed(1)}m`;
    } else {
        // Moins d'un million ($X)
        return `$${num.toLocaleString()}`;
    }
}