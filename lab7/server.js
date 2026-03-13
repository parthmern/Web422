const express = require("express");
const cors = require("cors");
const userService = require("./user-service.js");
const books = require("./books.json");

const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");

const app = express();

const HTTP_PORT = process.env.PORT || 8080;

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey:
    "&0y7$noP#5rt99&GB%Pz7j2b1vkzaB0RKs%^N^0zOP89NT04mPuaM!&G8cbNZOtH",
};

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);

  if (jwt_payload) {
    next(null, {
      _id: jwt_payload._id,
      userName: jwt_payload.userName,
      fullName: jwt_payload.fullName,
      role: jwt_payload.role,
    });
  } else {
    next(null, false);
  }
});

passport.use(strategy);

app.use(passport.initialize());

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("pong");
});

app.post("/api/register", (req, res) => {
  userService
    .registerUser(req.body)
    .then((msg) => {
      res.json({ message: msg });
    })
    .catch((msg) => {
      res.status(422).json({ message: msg });
    });
});

app.post("/api/login", (req, res) => {
  userService
    .checkUser(req.body)
    .then((user) => {
      let payload = {
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        role: user.role,
      };

      let token = jwt.sign(payload, jwtOptions.secretOrKey);

      res.json({ message: "login successful", token: token });
    })
    .catch((msg) => {
      res.status(422).json({ message: msg });
    });
});

app.get(
  "/api/books",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const role = req.user.role;

    let filteredBooks = [];

    if (role === "admin") {
      filteredBooks = books;
      //showing all books to admin
    } else if (role === "editor") {
      filteredBooks = books.filter(
        (b) => b.viewPermission === "public" || b.viewPermission === "editor"
        // not showing admin book
      );
    } else {
      filteredBooks = books.filter((b) => b.viewPermission === "public");
    }

    res.json(filteredBooks);
  }
);

app.post(
  "/api/books",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const role = req.user.role;

    if (role === "public") {
      return res
        .status(403)
        .json({ message: "Forbidden Access your role is public" });
    }

    const { title, author, year, viewPermission } = req.body;

    if (!title || !author || !year || !viewPermission) {
      return res.status(400).json({
        message:
          "validation error : you need to provide  { title, author, year, viewPermission }",
      });
    }

    const newId =
      books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;

    const newBook = {
      id: newId,
      title,
      author,
      year,
      viewPermission,
    };

    books.push(newBook);

    res.json({
      message: "Book added successfully with id " + newId,
      book: newBook,
    });
  }
);

app.use((req, res) => {
  res.status(404).end();
});

userService
  .connect()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("API listening on: " + `http://localhost:${HTTP_PORT}/`);
    });
  })
  .catch((error) => console.log("ERROR ==>", error));
