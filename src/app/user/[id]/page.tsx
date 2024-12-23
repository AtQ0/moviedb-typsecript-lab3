'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Use useParams to get the dynamic route parameters
import { Movie } from "../../../types/interfaces/movieInterfaces";

export default function User() {
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [newMovieName, setNewMovieName] = useState<string>("");
    const [newMovieYear, setNewMovieYear] = useState<number | "">("");
    const [editMovieId, setEditMovieId] = useState<number | null>(null);
    const [editMovieName, setEditMovieName] = useState<string>("");
    const [editMovieYear, setEditMovieYear] = useState<number | "">("");
    const [isLoading, setIsLoading] = useState(true);

    const { id: userId } = useParams(); // Retrieve userId from the URL

    useEffect(() => {

        // Fetch favorite movies for the user
        if (userId) {
            fetch(`/api/usermovies?user_id=${userId}`)
                .then((res) => res.json())
                .then((data) => {

                    if (Array.isArray(data)) {
                        setFavoriteMovies(data); // Set user-specific favorite movies
                    } else {
                        console.error("API did not return an array:", data);
                    }
                })
                .catch((err) => console.error("Error fetching favorites:", err))
                .finally(() => setIsLoading(false)); // Mark loading as complete
        }

        // Fetch all movies
        fetch('/api/movies')
            .then((res) => res.json())
            .then((data) => {

                if (Array.isArray(data)) {
                    setAllMovies(data); // Set all movies
                } else {
                    console.error("API did not return an array of movies:", data);
                }
            })
            .catch((err) => console.error("Error fetching all movies:", err));

    }, [userId]); // Re-run the effect when userId changes

    // Add a new movie
    const addNewMovie = () => {
        if (!newMovieName || !newMovieYear) {
            alert("Please enter both the movie name and year.");
            return;
        }

        const newMovie = { name: newMovieName, year: newMovieYear };
        fetch("/api/movies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMovie),
        })
            .then((res) => res.json())
            .then((addedMovie) => {
                if (addedMovie?.id) {
                    setAllMovies((prevMovies) => [...prevMovies, addedMovie]);
                    setNewMovieName("");
                    setNewMovieYear("");
                } else {
                    alert("Failed to add movie. No ID was returned.");
                }
            })
            .catch((err) => {
                console.error("Error adding movie:", err);
                alert("Failed to add movie.");
            });
    };

    // Save an edited movie
    const saveEditedMovie = () => {
        if (!editMovieName || !editMovieYear || !editMovieId) {
            alert("Please enter both the movie name and year.");
            return;
        }

        const updatedMovie = { id: editMovieId, name: editMovieName, year: editMovieYear };
        fetch("/api/movies", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedMovie),
        })
            .then((res) => res.json())
            .then((updatedMovie) => {
                if (updatedMovie?.id) {
                    setAllMovies((prevMovies) =>
                        prevMovies.map((movie) => (movie.id === editMovieId ? updatedMovie : movie))
                    );
                    setEditMovieId(null);
                    setEditMovieName("");
                    setEditMovieYear("");
                } else {
                    alert("Failed to update movie. No ID was returned.");
                }
            })
            .catch((err) => {
                console.error("Error updating movie:", err);
                alert("Failed to update movie.");
            });
    };

    // Delete a movie
    const deleteMovie = (id: number) => {
        fetch(`/api/movies?movie_id=${id}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) {
                    setAllMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
                } else {
                    alert("Failed to delete movie.");
                }
            })
            .catch((err) => {
                console.error("Error deleting movie:", err);
                alert("Failed to delete movie.");
            });
    };

    // Toggle add/remove movie to/from favorites
    const toggleFavorite = (movie: Movie) => {
        const isFavorite = favoriteMovies.some((favMovie) => favMovie.id === movie.id);
        if (isFavorite) {
            // Remove from favorites (DELETE request)
            fetch(`/api/usermovies?user_id=${userId}&movie_id=${movie.id}`, {
                method: "DELETE", // Ensure this endpoint handles DELETE correctly
            })
                .then((res) => res.json())
                .then(() => {
                    setFavoriteMovies((prevFavorites) =>
                        prevFavorites.filter((favMovie) => favMovie.id !== movie.id)
                    );
                })
                .catch((err) => {
                    console.error("Error removing movie from favorites:", err);
                    alert("Failed to remove movie from favorites.");
                });
        } else {
            // Add to favorites (POST request)
            fetch(`/api/usermovies?user_id=${userId}&movie_id=${movie.id}`, {
                method: "POST", // Ensure this endpoint handles POST correctly
            })
                .then((res) => res.json())
                .then(() => {
                    setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
                })
                .catch((err) => {
                    console.error("Error adding movie to favorites:", err);
                    alert("Failed to add movie to favorites.");
                });
        }
    };

    return (
        <div className="p-5">
            {/* Add Movie controls */}
            <div className="my-10 p-4 bg-blue-200 rounded shadow">
                <h2 className="text-xl text-black font-bold mb-2">Add New Movie</h2>
                <input
                    type="text"
                    placeholder="Movie Name"
                    className="border p-2 mr-2 rounded placeholder-dark-gray text-black"
                    value={newMovieName}
                    onChange={(e) => setNewMovieName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Year"
                    className="border p-2 mr-2 rounded placeholder-dark-gray text-black"
                    value={newMovieYear}
                    onChange={(e) => setNewMovieYear(Number(e.target.value))}
                />
                <button className="bg-blue-500 text-black px-4 py-2 rounded" onClick={addNewMovie}>
                    Add Movie
                </button>
            </div>

            {/* All Movies section */}
            <div className="my-5">
                <h2 className="text-xl font-bold">All Movies</h2>
                {allMovies.length > 0 ? (
                    allMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="p-2 bg-blue-100 rounded mb-2 flex justify-between items-center"
                        >
                            <span>
                                {movie.name} ({movie.year})
                            </span>
                            <div className="flex space-x-2">
                                <button
                                    className="bg-yellow-500 text-black px-3 py-1 rounded"
                                    onClick={() => {
                                        setEditMovieId(movie.id);
                                        setEditMovieName(movie.name);
                                        setEditMovieYear(movie.year);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-black px-3 py-1 rounded"
                                    onClick={() => deleteMovie(movie.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className={`${favoriteMovies.some((favMovie) => favMovie.id === movie.id)
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                        } text-black px-3 py-1 rounded`}
                                    onClick={() => toggleFavorite(movie)}
                                >
                                    {favoriteMovies.some((favMovie) => favMovie.id === movie.id)
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No movies available.</p>
                )}
            </div>

            {/* Edit Movie controls */}
            {editMovieId !== null && (
                <div className="my-5 p-4 bg-gray-100 rounded shadow">
                    <h2 className="text-xl text-black font-bold mb-2">Edit Movie</h2>
                    <input
                        type="text"
                        placeholder="Movie Name"
                        className="border p-2 mr-2 rounded placeholder-dark-gray text-black"
                        value={editMovieName}
                        onChange={(e) => setEditMovieName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        className="border p-2 mr-2 rounded placeholder-dark-gray text-black"
                        value={editMovieYear}
                        onChange={(e) => setEditMovieYear(Number(e.target.value))}
                    />
                    <button className="bg-green-500 text-black px-4 py-2 rounded" onClick={saveEditedMovie}>
                        Save Changes
                    </button>
                    <button
                        className="bg-gray-500 text-black px-4 py-2 rounded ml-2"
                        onClick={() => setEditMovieId(null)}
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Favorite Movies section */}
            <div className="my-5">
                <h2 className="text-xl font-bold">Your Favorite Movies</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : favoriteMovies.length > 0 ? (
                    favoriteMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="p-2 bg-green-100 rounded mb-2 flex justify-between items-center"
                        >
                            <span>
                                {movie.name} ({movie.year})
                            </span>
                            <button
                                className="bg-red-500 text-black px-3 py-1 rounded"
                                onClick={() => toggleFavorite(movie)}
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No favorite movies yet.</p>
                )}
            </div>
        </div>
    );
}
