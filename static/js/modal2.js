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



/*______________*/
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
    const end = typecat === "top-rated-movies" ? pageSize : pageSize - 1;

    fetch(urlmovie)
        .then(response => response.json())
        .then(data => {
            for(let i = start; i<=end; i++){
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
ModalValue("http://127.0.0.1:8000/api/v1/titles/?genre=Thriller&sort_by=-imdb_score&page_size=7","top-rated-movies-cat1")
ModalValue("http://127.0.0.1:8000/api/v1/titles/?genre=Action&sort_by=-imdb_score&page_size=7","top-rated-movies-cat2")




