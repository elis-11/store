import config from "./config.js";
import express from "express";
import cors from "cors";
import "./connect-db.js";
import { errorHandler404, errorHandlerGeneric } from "./lib/error-handler.js";
import productRouter from "./routes/Product.router.js";
import userRouter from "./routes/User.router.js";
import morgan from "morgan";

const app = express();

app.use(morgan("dev")); // log all requests to API
app.use(
  cors(
    {
      origin:
        process.env.NODE_ENV !== "production"
          ? process.env.ORIGIN_URL
          : process.env.ORIGIN_URL_HTTPS,
    }
    //credentials: true, // accept incoming cookies
  )
); // this is enough setup for token exchange
// app.use(express.json()); // JSON Parser => req.body
// app.use(express.json({ limit: "300KB" })); // JSON Parser => req.body
app.use(express.json({ limit: config.UPLOAD_LIMIT })); // JSON Parser => req.body

app.get("/", (req, res) => {
  // res.send("Hello from API!")
  res.send(`
  <h2>Welcome!</h2>
<div>Our routes:</div>
<div>Home: <a href="/">/</a></div>
<div>Users: <a href="/users">/users</a></div>
<div>Products: <a href="/products">/products</a></div>
`);
});

// load ROUTERS
app.use("/users", userRouter);
app.use("/products", productRouter);

/// 404 error handler
app.use(errorHandler404);

// GENERIC error handler
// ALL errors in our code, are automatically
// forwarded from express to here
app.use(errorHandlerGeneric);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
