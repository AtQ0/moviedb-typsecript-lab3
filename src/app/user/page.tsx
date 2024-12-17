"use client";
import { useState, useEffect } from "react";
import MovieItem from "../../components/MovieItem/MovieItem";
import { Movie } from "../../types/interfaces/movieInterfaces";

export default function User() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [newMovieName, setNewMovieName] = useState<string>("");
    const [newMovieYear, setNewMovieYear] = useState<number | "">("");
    const [editMovieId, setEditMovieId] = useState<number | null>(null);
    const [editMovieName, setEditMovieName] = useState<string>("");
    const [editMovieYear, setEditMovieYear] = useState<number | "">("");

    // Fetch movies from API on load
    useEffect(() => {
        fetch("/api/movies")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setMovies(data);
                } else {
                    console.error("API did not return an array:", data);
                }
            })
            .catch((err) => console.error("Error fetching movies:", err));
    }, []);

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
                setMovies((prevMovies) => [...prevMovies, addedMovie]);
                setNewMovieName("");
                setNewMovieYear("");
            })
            .catch((err) => {
                console.error("Error adding movie:", err);
                alert("Failed to add movie.");
            });
    };

    // Edit an existing movie
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
                setMovies((prevMovies) =>
                    prevMovies.map((movie) => (movie.id === editMovieId ? updatedMovie : movie))
                );
                setEditMovieId(null);
                setEditMovieName("");
                setEditMovieYear("");
            })
            .catch((err) => {
                console.error("Error updating movie:", err);
                alert("Failed to update movie.");
            });
    };

    // Delete a movie
    const deleteMovie = (id: number) => {
        fetch(`/api/movies?id=${id}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) {
                    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
                } else {
                    alert("Failed to delete movie.");
                }
            })
            .catch((err) => {
                console.error("Error deleting movie:", err);
                alert("Failed to delete movie.");
            });
    };

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-center">Movie Manager</h1>

            {/* Add Movie controls container */}
            <div className="my-5 p-4 bg-blue-200 rounded shadow">
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
                <button
                    className="bg-blue-500 text-black px-4 py-2 rounded"
                    onClick={addNewMovie}
                >
                    Add Movie
                </button>
            </div>

            {/* Movies list */}
            <div className="my-5">
                <h2 className="text-xl font-bold">Movies</h2>
                {Array.isArray(movies) && movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieItem
                            key={movie.id}
                            movie={movie}
                            onEdit={(id) => {
                                setEditMovieId(id);
                                const movie = movies.find((movie) => movie.id === id);
                                if (movie) {
                                    setEditMovieName(movie.name);
                                    setEditMovieYear(movie.year);
                                }
                            }}
                            onDelete={deleteMovie}
                        />
                    ))
                ) : (
                    <p>No movies available. Add some to get started!</p>
                )}
            </div>

            {/* Edit Movie controls container */}
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
                    <button
                        className="bg-green-500 text-black px-4 py-2 rounded"
                        onClick={saveEditedMovie}
                    >
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
        </div>
    );
}
