import { NextResponse } from "next/server";
import db from "../../../db/pool"; // Assuming you have a DB connection
import bcrypt from "bcrypt";

// POST handler for user registration
export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { message: "Username, email, and password are required." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        return NextResponse.json(
            { message: "Registration successful", data: result.rows[0] },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error registering user" },
            { status: 500 }
        );
    }
}

// GET handler for user login
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    if (!email || !password) {
        return NextResponse.json(
            { message: "Email and password are required." },
            { status: 400 }
        );
    }

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, result.rows[0].password);

        if (isPasswordValid) {
            return NextResponse.json(
                {
                    message: "Login successful",
                    userId: result.rows[0].id, // Return userId as a UUID
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "Incorrect password" },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error fetching user data" },
            { status: 500 }
        );
    }
}
