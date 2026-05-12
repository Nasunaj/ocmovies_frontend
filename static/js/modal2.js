/**
 * Récupère le meilleur film (selon le score IMDb) et met à jour les éléments de la modale avec ses détails.
 *
 * @description
 * 1) Effectue une première requête à l'API pour récupérer le film avec le meilleur score IMDb
 * (`/titles/?sort_by=-imdb_score&page_size=1`).
 * 2) Effectue une deuxième requête pour récupérer les **détails complets** du film.
 * 3) Met à jour les éléments HTML de la modale (ID : `modal-poster`, `modal-title`, etc.) avec les données du film.
 *
 * @depends
 * - L'API doit être disponible à `http://127.0.0.1:8000/api/v1/titles/`.
 * - Les éléments HTML avec les ID suivants doivent exister dans le DOM :
 *   - `modal-poster` (img)
 *   - `modal-title` (h2)
 *   - `modal-year-genre` (p)
 *   - `modal-rating-duration` (p)
 *   - `modal-imdb-score` (span)
 *   - `modal-box-office` (span)
 *   - `modal-director` (span)
 *   - `modal-summary` (p)
 *   - `modal-actors` (span)
 * - La fonction `formatBoxOffice` doit être définie pour formater les recettes du box-office.
 *
 * @throws {Error} Si la requête API échoue ou si les éléments HTML sont introuvables.
 *
 * @example
 * // Ce code est exécuté directement (sans fonction wrapper).
 *
 */
const bestMovieUrl2 = 'http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=1';

fetch(bestMovieUrl2)
    .then(response => response.json())
    .then(data => {
        const bestMovie = data.results[0]; // bestMovie est défini ici
        fetch(bestMovie.url)
            .then(response => response.json())
            .then(data => {
                // Met à jour les éléments de la modale avec les données du film
                const modalPoster = document.getElementById('modal-poster');
                const modalTitle = document.getElementById('modal-title');
                const modalYearGenre = document.getElementById('modal-year-genre');
                const modalRatingDuration = document.getElementById('modal-rating-duration');
                const modalImdbScore = document.getElementById('modal-imdb-score');
                const modalBoxOffice = document.getElementById('modal-box-office');
                const modalDirector = document.getElementById('modal-director');
                const modalSummary = document.getElementById('modal-summary');
                const modalActors = document.getElementById('modal-actors');



                // Met à jour chaque élément avec les données du film
                modalPoster.src = data.image_url;
                modalPoster.alt = data.title;
                modalTitle.textContent = data.title;
                modalRatingDuration.textContent = `${data.duration} minutes (${data.countries ? data.countries.join('/') : N/A})`;
                modalYearGenre.textContent = `${data.year || 'N/A'} - ${data.genres ? data.genres.join(', ') : 'N/A'}`;
                modalImdbScore.textContent = data.imdb_score;
                modalBoxOffice.textContent = formatBoxOffice(data.worldwide_gross_income);
                modalDirector.textContent = data.directors ? data.directors.join(', ') : 'N/A';
                modalSummary.textContent = data.long_description || 'Aucune description disponible.';
                modalActors.textContent = data.actors ? data.actors.join(', ') : 'N/A';

            })

    });



/**
 * Récupère les films d'une catégorie ou d'une liste (ex: "top-rated-movies", "Thriller") et met à jour les
 * modales associées.
 *
 * @param {string} urlmovie - URL de l'API pour récupérer les films
 * (ex: "http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7").
 * @param {string} typecat - Type de catégorie. Peut être :
 *                          - "top-rated-movies" : Pour les films les mieux notés (indice de départ = 1).
 *                          - Toute autre chaîne (ex: "top-rated-movies-cat1")
 *
 * @description
 * 1) Récupère la valeur de `page_size` depuis l'URL pour déterminer le nombre de films à traiter.
 * 2) Détermine les indices de départ (`start`) et de fin (`end`) pour la boucle :
 *   - Si `typecat === "top-rated-movies"`, `start = 1` et `end = pageSize`
 *   (pour ignorer le premier film, déjà affiché ailleurs).
 *   - Sinon, `start = 0` et `end = pageSize - 1`.
 * - Pour chaque film dans la plage `start` à `end` :
 *   - Récupère les détails du film via une requête à `bestMovie.url`.
 *   - Met à jour les éléments HTML de la modale correspondante (ID : `modal-poster${Namecat}-${i}`, etc.) avec les
 *   données du film.
 * - `Namecat` est utilisé pour générer les ID des éléments HTML :
 *   - Si `typecat === "top-rated-movies"`, `Namecat = ""` (ex: `modal-poster-1`).
 *   - Sinon, `Namecat = -${typecat}` (ex: `modal-poster-top-rated-movies-cat1-1`).
 *
 * @depends
 * - L'API doit être disponible à l'URL fournie (`urlmovie`).
 * - Les éléments HTML avec les ID suivants doivent exister dans le DOM pour chaque film (i = indice) :
 *   - `modal-poster${Namecat}-${i}` (img)
 *   - `modal-title${Namecat}-${i}` (h2)
 *   - `modal-year-genre${Namecat}-${i}` (p)
 *   - `modal-rating-duration${Namecat}-${i}` (p)
 *   - `modal-imdb-score${Namecat}-${i}` (span)
 *   - `modal-box-office${Namecat}-${i}` (span)
 *   - `modal-director${Namecat}-${i}` (span)
 *   - `modal-summary${Namecat}-${i}` (p)
 *   - `modal-actors${Namecat}-${i}` (span)
 * - La fonction `formatBoxOffice` doit être définie pour formater les recettes du box-office.
 *
 * @throws {Error} Si la requête API échoue ou si les éléments HTML sont introuvables.
 *
 * @example
 * // Charger les films les mieux notés (en ignorant le premier film)
 * ModalValue("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7", "top-rated-movies");
 *
 * @example
 * // Charger les films de la catégorie "Thriller"
 * ModalValue("http://127.0.0.1:8000/api/v1/titles/?genre=Thriller&sort_by=-imdb_score&page_size=7",
 * "top-rated-movies-cat1");
 *
 * @example
 * // Charger les films (les meilleurs films toutes catégories confondues)
 * ModalValue("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7","top-rated-movies")
 */
function ModalValue(urlmovie,typecat){
    // 1. Déclare Namecat AVANT le if/else
    let Namecat = typecat === "top-rated-movies" ? "" : `-${typecat}`;

    console.log(Namecat);

    /*Récupérer la valeur associée à page size*/
// 1. Crée un objet URL à partir de l'URL
    const url = new URL(urlmovie);

// 2. Récupère les paramètres de l'URL
    const params = new URLSearchParams(url.search);

// 3. Récupère la valeur de page_size (en nombre)
    const pageSize = parseInt(params.get('page_size'), 10); // parseInt pour convertir en nombre 10 car base décimale
    //console.log(pageSize);

    const start = typecat === "top-rated-movies" ? 1 : 0;
    //const end = typecat === "top-rated-movies" ? pageSize : pageSize - 1;
    const end = pageSize-1;

    fetch(urlmovie)
        .then(response => response.json())
        .then(data => {
            // Au cas où il y a moins de 6 films comme par exemple la catégorie Adulte
            const RealEnd = Math.min(end, data.results.length - 1);

            for(let i = start; i<=RealEnd; i++){
                const bestMovie = data.results[i];
                //console.log(bestMovie);
                fetch(bestMovie.url)
                    .then(response => response.json())
                    .then(data => {
                        // Met à jour les éléments de la modale avec les données du film
                        const modalPoster = document.getElementById(`modal-poster${Namecat}-${i}`);
                        const modalTitle = document.getElementById(`modal-title${Namecat}-${i}`);
                        const modalYearGenre = document.getElementById(`modal-year-genre${Namecat}-${i}`);
                        const modalRatingDuration = document.getElementById(`modal-rating-duration${Namecat}-${i}`);
                        const modalImdbScore = document.getElementById(`modal-imdb-score${Namecat}-${i}`);
                        const modalBoxOffice = document.getElementById(`modal-box-office${Namecat}-${i}`);
                        const modalDirector = document.getElementById(`modal-director${Namecat}-${i}`);
                        const modalSummary = document.getElementById(`modal-summary${Namecat}-${i}`);
                        const modalActors = document.getElementById(`modal-actors${Namecat}-${i}`);

                        //console.log(modalPoster)

                        // Met à jour chaque élément avec les données du film
                        modalPoster.src = data.image_url;
                        modalPoster.alt = data.title;
                        modalTitle.textContent = data.title;
                        modalRatingDuration.textContent = `${data.duration} minutes (${data.countries ? data.countries.join('/') : N/A})`;
                        modalYearGenre.textContent = `${data.year || 'N/A'} - ${data.genres ? data.genres.join(', ') : 'N/A'}`;
                        modalImdbScore.textContent = data.imdb_score;
                        modalBoxOffice.textContent = formatBoxOffice(data.worldwide_gross_income);
                        modalDirector.textContent = data.directors ? data.directors.join(', ') : 'N/A';
                        modalSummary.textContent = data.long_description || 'Aucune description disponible.';
                        modalActors.textContent = data.actors ? data.actors.join(', ') : 'N/A';

                    })
            }


        })

}

ModalValue("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7","top-rated-movies")
ModalValue("http://127.0.0.1:8000/api/v1/titles/?genre=Thriller&sort_by=-imdb_score&page_size=6","top-rated-movies-cat1")
ModalValue("http://127.0.0.1:8000/api/v1/titles/?genre=Action&sort_by=-imdb_score&page_size=6","top-rated-movies-cat2")




