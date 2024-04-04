# `Molla Backend`

E-commerce application backend written with nodejs and typescript, and uses MongoDB as the primary database.

## Stack

Application stack and technologies overview.

1. Language: NodeJS (Typescript)
2. Database: MongoDB
3. BLOB Storage: Google Cloud Storage
4. Cloud Hosting: Render

## Endpoints

The set of defined endpoints the API listens for.

1. GET  `/`
2. GET  `/products`
3. GET  `/product/single?id=someID`
4. POST `/auth/sign-in`
5. POST `/auth/sign-up`

Endpoints documentation are found [here]('./docs/endpoints.md')

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

    Running `yarn dev` watches the typescript files for changes and restarts the server automatically, to instead run the compiled JavaScript code, use `yarn build:run`.

    ```bash
    yarn dev
    ```

## Environment variables

The server depends on environment variables, which are loaded from a `.env` file in your root directory, and example .env file is present, showing the required variables.

## Google Service Key

You can get the Google service key from the Cloud Console and save it to the root directory as `key.json`. Without this step the server will crash when attempting to connect to the bucket store.
