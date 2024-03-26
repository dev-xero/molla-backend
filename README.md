# `Molla Backend`

E-commerce application backend written with nodejs and typescript, and uses MongoDB as the primary database.

## Stack

Application stack and technologies overview.

1. Language: NodeJS (Typescript)
2. Database: MongoDB
3. BLOB Storage: Google Cloud Storage
4. Cloud Hosting: Render

## Setup

To quickly bootstrap the project on your machine, follow these commands.

1. Clone the github repo:
   
   ```bash
   git clone https://github.com/dev-xero/molla-backend
   ```

 2. Install dependencies:

    ```bash
    cd molla-backend
    yarn install
    ```

 3. Run the development server:

    Running `yarn dev:watch` watches the typescript files for changes and restarts the server automatically, to prevent this behaviour, use `yarn dev`.

    ```bash
    yarn dev:watch
    ```

## Environment variables

The server depends on environment variables, which are loaded from a `.env` file in your root directory, and example .env file is present, showing the required variables.
