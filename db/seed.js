import {createPlatform} from "./queries/platforms.js";
import {createMovie} from "./queries/movies.js";
import client from "./client.js";

import dotenv from "dotenv";
dotenv.config();

console.log("🌱 Database seeded.");
async function seedMovies() {
    await client.connect()

    const platforms = [
        {name: 'Neflix'},
        {name: 'HBO MAX'},
        {name: 'Hulu'},
        {name: 'Crunchyroll'},
        {name: 'Apple TV'},
        {name: 'Disney Plus'},
        {name: 'Peacock'},
        {name: 'Prime Video'},
        {name: 'Youtube'},
        {name: 'Tubi'}
    ];

    for (const platform of platforms){
        await createPlatform(platform);
    }

    const movies = [
        {name: 'Leave The World Behind', genre: 'horror', release_date_year: 2023},
        {name: 'The Last Showgirl', genre: 'drama', release_date_year: 2024},
        {name: 'Heretic', genre: 'horror', release_date_year: 2024},
        {name: 'Jujutsu Kaisen Zero', genre: 'anime', release_date_year: 2021},
        {name: 'CODA', genre: 'drama', release_date_year: 2021},
        {name: 'Nanny', genre: 'horror', release_date_year: 2022},
        {name: 'Lion King', genre: 'animated', release_date_year: 1994},
        {name: 'Genie', genre: 'comedy', release_date_year: 2023},
        {name: 'Outrun', genre: 'drama', release_date_year: 2024},
        {name: 'Wicked', genre: 'musical', release_date_year: 2024},

    ];

    for (const movie of movies){
        await createMovie(movie);
    }

    await client.end()
}

seedMovies()