import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import appRoutes from "./routes/app.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";


const app = express();

//  it will give the current root directory name
const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the body of the request
app.use(cookieParser()); // to parse the cookies

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   // root route
//   res.send(`API is running.... ${PORT}`);
// });
// it going catch all the routes that start with /api/auth/xxx** */
// app.use("/api/auth", authRoutes);

// app.use("/api/users", userRoutes);
// app.use("/api/app", appRoutes);


// // test api after installing 
// app.get("/", (req, res) => {
//   res.send("API is running....");
// });
// static files in production
app.use(express.static(path.join(__dirname, "/frontend/dist")));
// any file without the routes above will be served from the frontend/dist folder
// redirect backend server to frontend server
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
