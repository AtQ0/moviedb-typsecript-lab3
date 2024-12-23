// Define your Movie interface (if it's not already defined)
export interface Movie {
    id: number;
    name: string;
    year: number;
}

// Define the MovieItemProps interface
export interface MovieItemProps {
    movie: Movie;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onFavorite: () => void;  // Function to handle adding/removing from favorites
    isFavorite: boolean;     // Boolean to indicate if the movie is in favorites
}
