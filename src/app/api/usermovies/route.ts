import { NextResponse } from "next/server";
import db from "../../../db/pool";

// Fetch the favorite movies for a specific user
export async function GET(request: Request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("user_id");

    console.log("Received user_id:", userId);

    // Check if user_id is provided
    if (!userId) {
        return NextResponse.json({ message: "User ID is required." }, { status: 400 });
    }

    try {
        // Query to fetch the favorite movies for the user
        const result = await db.query(
            `SELECT movies.id, movies.name, movies.year
            FROM usermovies
            JOIN movies ON usermovies.movie_id = movies.id
            WHERE usermovies.user_id = $1`,
            [userId]
        );

        console.log("Fetched favorite movies:", result.rows); // Log the result to debug

        if (result.rows.length === 0) {
            return NextResponse.json([]); // Return an empty array if no favorites
        }

        return NextResponse.json(result.rows); // Return the list of favorite movies
    } catch (err) {
        console.error("Error fetching favorite movies:", err);
        return NextResponse.json({ message: "Error fetching favorite movies." }, { status: 500 });
    }
}

// Add a movie to the user's favorite list
export async function POST(request: Request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("user_id");
    const movieId = url.searchParams.get("movie_id");

    console.log("Received user_id:", userId, "movie_id:", movieId);

    // Check if user_id and movie_id are provided
    if (!userId || !movieId) {
        return NextResponse.json({ message: "User ID and Movie ID are required." }, { status: 400 });
    }

    try {
        // Query to add a movie to the user's favorites list
        const result = await db.query(
            `INSERT INTO usermovies (user_id, movie_id)
            VALUES ($1, $2) RETURNING *`,
            [userId, movieId]
        );

        console.log("Added movie to favorites:", result.rows[0]);

        return NextResponse.json(result.rows[0]); // Return the added favorite movie
    } catch (err) {
        console.error("Error adding movie to favorites:", err);
        return NextResponse.json({ message: "Error adding movie to favorites." }, { status: 500 });
    }
}

// Remove a movie from the user's favorite list
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("user_id");
    const movieId = url.searchParams.get("movie_id");

    console.log("Received user_id:", userId, "movie_id:", movieId);

    // Check if user_id and movie_id are provided
    if (!userId || !movieId) {
        return NextResponse.json({ message: "User ID and Movie ID are required." }, { status: 400 });
    }

    try {
        // Query to remove a movie from the user's favorites list
        const result = await db.query(
            `DELETE FROM usermovies
            WHERE user_id = $1 AND movie_id = $2 RETURNING *`,
            [userId, movieId]
        );

        console.log("Removed movie from favorites:", result.rows[0]);

        return NextResponse.json(result.rows[0]); // Return the removed favorite movie
    } catch (err) {
        console.error("Error removing movie from favorites:", err);
        return NextResponse.json({ message: "Error removing movie from favorites." }, { status: 500 });
    }
}
