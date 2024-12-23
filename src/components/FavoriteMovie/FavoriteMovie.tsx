import React, { useEffect, useState } from "react";
import { Movie } from "../../types/interfaces/movieInterfaces";

interface FavoriteMoviesProps {
    favorites: number[];
    movies: Movie[];
    removeFavorite: (movieId: number) => void;
}

export default function FavoriteMovie({
    favorites,
    movies,
    removeFavorite,
}: FavoriteMoviesProps) {
    // Local state for displaying favorites with relevant movie data
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

    // Update the favoriteMovies state whenever favorites or movies change
    useEffect(() => {
        // Map favorite movie IDs to their movie data
        const updatedFavorites = favorites
            .map((favoriteId) => movies.find((movie) => movie.id === favoriteId))
            .filter(Boolean) as Movie[]; // Filter out undefined results

        setFavoriteMovies(updatedFavorites);
    }, [favorites, movies]); // Re-run effect if favorites or movies change

    return (
        <div className="my-5">
            <h2 className="text-xl font-bold">Your Favorites</h2>
            {favoriteMovies.length > 0 ? (
                favoriteMovies.map((favoriteMovie) => (
                    <div
                        key={favoriteMovie.id}
                        className="p-2 bg-green-100 rounded mb-2 flex justify-between items-center"
                    >
                        <span>
                            {favoriteMovie.name} ({favoriteMovie.year})
                        </span>
                        <button
                            className="bg-red-500 text-black px-3 py-1 rounded"
                            onClick={() => removeFavorite(favoriteMovie.id)}
                        >
                            Remove from Favorites
                        </button>
                    </div>
                ))
            ) : (
                <p>No favorite movies yet. Mark some as your favorites!</p>
            )}
        </div>
    );
}
