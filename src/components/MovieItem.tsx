// MovieItem.tsx (src/app/components/)
import React from "react";
import { MovieItemProps } from "../interfaces/movieInterfaces"; // Updated import path

const MovieItem = ({ movie, onEdit, onDelete }: MovieItemProps) => {
    return (
        <div className="p-4 border-b flex justify-between items-center">
            <span>
                {movie.name} ({movie.year})
            </span>
            <div className="flex gap-2">
                <button
                    className="bg-yellow-500 text-black px-3 py-1 rounded"
                    onClick={() => onEdit(movie.id)}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 text-black px-3 py-1 rounded"
                    onClick={() => onDelete(movie.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default MovieItem;
