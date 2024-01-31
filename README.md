# Penpalmap-front

## About penpalmap-front

UI for Penpalmap project. Based on Next.js and Chakra UI.

## Prerequisites

To run `penpalmap-front`, ensure your system has the following:

- Node.js version 20 or higher.
- Docker with Docker Compose plugin.

## Installation and Configuration

1. **Installing Dependencies**: Install the required dependencies using:

   ```bash
   npm install
   ```

2. **Setting Up environment variables**: Copy `.env.example` to `.env` and update the values as required.

3. **Start required services**: Launch required services (like databases and API) using Docker Compose:

   ```bash
   docker compose up -d
   ```

   > **NOTE 1**: Docker images of Penpalmap API are stored in Github Container Registry (GHCR).
   > To pull the images, you need to create a `personal access token (classic)` with at least `read:packages` scope (See [Login to GHCR](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry)). Then, login to GHCR using the following command:
   >
   > ```bash
   > docker login ghcr.io -u <github-username> -p <access-token>
   > ```

   > **NOTE 2**: To pull new Penpalmap API versions, run `docker compose pull` before `docker compose up -d`.

4. **Starting the app**: To start the server in development mode, run:
   ```bash
   npm run dev
   ```

## Deployment in Production

1. **Building the Docker Image**: Build a Docker image for the application using:

   ```bash
   docker build -t penpalmap-front:latest .
   ```

2. **Running the app**: To run Penpalmap front in production mode, use:

   ```bash
   docker run --env-file /path/to/env/file -p 3000:3000 penpalmap-front:latest
   ```

   Ensure to replace `/path/to/env/file` with the path to your custom environment file.

## Project structure

Here are the main source code folders of the project:

- **pages**: Each file in this directory is associated with a route based on its name.
- **components**: Reusable React components.
- **styles**: Openlayer styles and custom theme for Chakra UI.
- **public**: Static public files (images, polices, etc.).
- **utils**: Useful functions and tools.
- **api**: Penpalmap API related files.
- **context**: Global React context.
- **hooks**: Custom React hooks.
- **types**: Typescript type definitions.

## Tech stack

- **Next.js**: React framework.
- **Chakra UI**: React component library.
- **React Hook Form**: Form validation.
- **React**: Javascript library for building user interfaces.
- **Next Auth**: Authentication library for Next.js.
- **Openlayer**: Map library.
- **Socket.IO**: Real-time communication library.
- **Typescript**: Javascript superset with types.
- **ESLint**: Linter for Javascript and Typescript.
- **Prettier**: Code formatter.
- **FontAwesome**: Icon library.
