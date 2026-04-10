const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
dotenv.config();
const userService = require("./user-service.js");

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    if (!jwtPayload || !jwtPayload._id) {
      return done(null, false);
    }
    return done(null, {
      _id: jwtPayload._id,
      userName: jwtPayload.userName,
      fullName: jwtPayload.fullName,
      role: jwtPayload.role,
    });
  })
);

app.get("/", (req, res) => {
  res.json({ message: "parth patel 128823234 web422 user-service working" });
});

app.post("/api/user/register", (req, res) => {
  userService
    .registerUser(req.body)
    .then((msg) => {
      res.json({ message: msg });
    })
    .catch((msg) => {
      res.status(422).json({ message: msg });
    });
});

app.post("/api/user/login", (req, res) => {
  userService
    .checkUser(req.body)
    .then((user) => {
      const payload = {
        _id: user._id,
        userName: user.userName,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      res.json({ message: "login successful", token: token });
    })
    .catch((msg) => {
      res.status(422).json({ message: msg });
    });
});

const jwtAuth = passport.authenticate("jwt", { session: false });

app.get("/api/user/favourites", jwtAuth, (req, res) => {
  userService
    .getFavourites(req.user._id)
    .then((data) => {
      res.json(data);
    })
    .catch((msg) => {
      res.status(422).json({ error: msg });
    });
});

app.put("/api/user/favourites/:id", jwtAuth, (req, res) => {
  userService
    .addFavourite(req.user._id, req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((msg) => {
      res.status(422).json({ error: msg });
    });
});

app.delete("/api/user/favourites/:id", jwtAuth, (req, res) => {
  userService
    .removeFavourite(req.user._id, req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((msg) => {
      res.status(422).json({ error: msg });
    });
});

userService
  .connect()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("API listening on: " + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log("unable to start the server: " + err);
    process.exit();
  });
