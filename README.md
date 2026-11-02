# Character API

A small Express backend for creating, listing, editing and deleting character profiles. MongoDB stores the users and posts. Register and log in before changing characters. Postman keeps the login cookie until logout or server restart.

## Run on your laptop

1. Install Node.js 24 and clone this repository. Open a terminal in the project folder.
2. In MongoDB Atlas, create a free cluster, create a database user with read/write access, and add your laptop's current IP under Network Access.
3. Choose Connect → Drivers and copy the MongoDB URI. Run `copy .env.example .env` in PowerShell. Replace MONGODB_URI in .env with your URI, inserting the database username and URL-encoded password. Set the database name to `characters` between the final slash and the question mark. Keep .env private.
4. Run `npm ci` and then `npm start`. Open http://localhost:4000 to see the running message. Leave the terminal open during the demo.

## Postman demo

Import `characters.postman_collection.json` into Postman Desktop. Run the collection in order. Register creates a fresh demo user, Login sets the cookie, and Create saves Mira and captures her MongoDB ID. Read lists the stored characters. Update changes Mira's age from 22 to 23. Delete removes her. Send Read again to confirm she is gone. Logout ends the session.

## Explain one request

For `PATCH /api/posts/:id`, Express reads the JSON body. The posts router checks the login session and calls the update controller. The controller finds the document by its MongoDB ID, applies the supplied fields and saves it. The Post model validates the data before MongoDB stores it. Postman receives the updated document as JSON.
