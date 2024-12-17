# TypeScript-lab1

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Before you run the development server, make sure you have **Docker** and **Docker Compose** installed on your machine. This project uses Docker to start services such as a local database or API that the application relies on.

### 1. Install Docker & Docker Compose

- If you don't have Docker installed, follow the instructions for your platform from [Docker's official website](https://www.docker.com/get-started).
- Docker Compose should be installed with Docker by default. If not, follow the [Docker Compose installation guide](https://docs.docker.com/compose/install/).

### 2. Create a .env.docker file
This project requires a .env.docker file for your database connection.
Create a .env.docker file in the root of the project directory and add the following values:
DB_HOST=localhost
DB_PORT=5433
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

### 3. Create a .env file
This project requires a .env file for your database connection.
Create a .env file in the root of the project directory and add the following values:
PGURI=your-postgres-username:your-postgres-password@localhost:5433/your-postgres-db-name


### 4. Run Docker Compose

Once Docker is installed, navigate to the project directory and start the necessary services using the following command:

```bash
docker-compose up -d
```


### 5. Install Dependencies

Before running the project, you need to install the required dependencies. In your project directory, run the following command:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 6. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Goals Achieved:
- **Next.js Setup**: Successfully bootstrapped the project using `create-next-app`, a tool for quickly setting up a Next.js application.
- **PaaS Concept Demonstration**: Showcased basic functionality of a Next.js app, demonstrating server-side rendering (SSR) and static site generation (SSG).
- **Font Optimization**: Integrated `next/font` to optimize and load the **Geist** font family, improving the app’s performance.
- **Interactive UI**: Developed an interactive movie management interface where users can add, edit, and delete movies.
- **Local Development Environment**: The app runs locally, making it easy for developers to set up and contribute.

## Features:
- **Add Movie**: Add a new movie by specifying the name and release year.
- **Edit Movie**: Edit the details (name and year) of an existing movie.
- **Delete Movie**: Remove a movie from the list.
- **Dynamic Data Handling**: Perform dynamic updates to the movie list with API calls to manage the movie data.
- **Responsive UI**: The app is responsive and designed using **Tailwind CSS**, ensuring good user experience on both desktop and mobile devices.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# TypeScript-lab1
