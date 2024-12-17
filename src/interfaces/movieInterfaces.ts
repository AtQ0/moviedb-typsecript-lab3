
// Movie interface
export interface Movie {
    id: number;
    name: string;
    year: number;
}

// Props interface for the MovieItem component
export interface MovieItemProps {
    movie: Movie;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}
