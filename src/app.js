const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "cookie_session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true
  })
);

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(`mongodb+srv://mmunarriz:C0d3r@cluster0.hymhndd.mongodb.net/jwt`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      await Role.create({ name: "user" });
      await Role.create({ name: "moderator" });
      await Role.create({ name: "admin" });

      console.log("Roles ('user', 'moderator', 'admin') added to the roles collection.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
