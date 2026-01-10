const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./src/configs/db");
const app = require("./src/app");

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
