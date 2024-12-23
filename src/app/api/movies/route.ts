import { NextResponse } from "next/server";
import db from "../../../db/pool";

// Fetch all movies
export async function GET() {
    try {
        const allMovies = await db.query("SELECT * FROM movies;");
        return NextResponse.json(allMovies.rows, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching movies" }, { status: 500 });
    }
}

// Add a new movie
export async function POST(request: Request) {
    try {
        const { name, year } = await request.json();
        const newMovie = await db.query(
            "INSERT INTO movies (name, year) VALUES ($1, $2) RETURNING *;",
            [name, year]
        );
        return NextResponse.json(newMovie.rows[0], { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error adding movie" }, { status: 500 });
    }
}

// Update a movie
export async function PUT(request: Request) {
    try {
        const { id, name, year } = await request.json();
        const updatedMovie = await db.query(
            "UPDATE movies SET name = $1, year = $2 WHERE id = $3 RETURNING *;",
            [name, year, id]
        );

        if (updatedMovie.rowCount === 0) {
            return NextResponse.json({ message: "Movie not found" }, { status: 404 });
        }

        return NextResponse.json(updatedMovie.rows[0], { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error updating movie" }, { status: 500 });
    }
}

// Delete a movie
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("movie_id");

        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        const deletedMovie = await db.query("DELETE FROM movies WHERE id = $1 RETURNING *;", [id]);

        if (deletedMovie.rowCount === 0) {
            return NextResponse.json({ message: "Movie not found" }, { status: 404 });
        }

        return NextResponse.json({ message: `Movie with ID ${id} deleted` }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error deleting movie" }, { status: 500 });
    }
}
