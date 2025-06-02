import {createPlatform} from "./queries/platforms.js";
import {createMovie} from "./queries/movies.js";
import client from "./client.js";

import dotenv from "dotenv";
dotenv.config();

console.log("🌱 Database seeded.");
async function seedMovies() {
    await client.connect()

    // for(let i=0; i < movies.length; i++) {
    //     // for (let j = 0; j < movies.length; j++) {
    //     //     console.log(`platforms: ${platforms[i]} movies: ${movies[j]}`);
    //     // }
    // }

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
        {name: 'Leave The World Behind', genre: 'horror', release_date_year: 2023, platform_id: 1},
        {name: 'The Last Showgirl', genre: 'drama', release_date_year: 2024, platform: 2},
        {name: 'Heretic', genre: 'horror', release_date_year: 2024, platform_id: 3},
        {name: 'Jujutsu Kaisen Zero', genre: 'anime', release_date_year: 2021, platform_id: 4},
        {name: 'CODA', genre: 'drama', release_date_year: 2021, platform_id: 5},
        {name: 'Nanny', genre: 'horror', release_date_year: 2022, platform_id: 6},
        {name: 'Lion King', genre: 'animated', release_date_year: 1994, platform_id: 7},
        {name: 'Genie', genre: 'comedy', release_date_year: 2023, platform_id: 8},
        {name: 'Outrun', genre: 'drama', release_date_year: 2024, platform_id: 9},
        {name: 'Wicked', genre: 'musical', release_date_year: 2024, platform_id: 10},

    ];

    for (const movie of movies){
        await createMovie(movie);
    }

    await client.end()
}

seedMovies()