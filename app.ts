import express from "express";
import search from "./routes/search";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use("/search", search);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

export default app;
