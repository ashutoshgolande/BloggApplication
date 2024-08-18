# Blogging Platform Setup

## Steps to Set Up the Application

1. **Update Database URL**
   - Change the database URL in the following files:
     - `Blog-Website/server/database/db.js`
     - `Blog-Website/server/utils/upload.js`

2. **Start MongoDB Server**
   - Ensure MongoDB Server is running and connect it with the application.

3. **Install Server Dependencies**
   - Navigate to the server directory:
     ```bash
     cd Blog-Website/server
     ```
   - Install the required npm packages:
     ```bash
     npm install
     ```

4. **Install Client Dependencies**
   - Navigate to the client directory:
     ```bash
     cd Blog-Website/client
     ```
   - Install the required npm packages:
     ```bash
     npm install
     ```

5. **Start the Server**
   - Navigate back to the server directory:
     ```bash
     cd Blog-Website/server
     ```
   - Start the server:
     ```bash
     npm run start
     ```

6. **Start the Client**
   - Open a new terminal window or tab.
   - Navigate to the client directory:
     ```bash
     cd Blog-Website/client
     ```
   - Start the client:
     ```bash
     npm run start
     ```

**Note:** Keep the terminal with the server running open while starting the client.
