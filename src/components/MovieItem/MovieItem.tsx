import React from "react";
import { MovieItemProps } from "../../types/interfaces/movieInterfaces";

const MovieItem = ({ movie, onEdit, onDelete, onFavorite, isFavorite }: MovieItemProps) => {
    return (
        <div className="p-4 border-b flex justify-between items-center">
            <span>
                {movie.name} ({movie.year})
            </span>
            <div className="flex gap-2">
                <button
                    className="bg-yellow-500 text-black px-3 py-1 rounded"
                    onClick={() => onEdit(movie.id)} // Make sure the onEdit gets the movie.id
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 text-black px-3 py-1 rounded"
                    onClick={() => onDelete(movie.id)} // Same here for onDelete
                >
                    Delete
                </button>
                <button
                    className={`px-3 py-1 rounded ${isFavorite ? "bg-green-500" : "bg-gray-500"}`}
                    onClick={onFavorite} // And onFavorite should use the movie.id to toggle the favorite status
                >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
            </div>
        </div>
    );
};

export default MovieItem;
