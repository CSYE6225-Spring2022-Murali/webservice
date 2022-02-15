const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");

//Validators
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

const passValidator = new passwordValidator();
passValidator
  .is()
  .min(5) // Minimum length 5
  .is()
  .max(50) // Maximum length 50
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digits
  .has()
  .not()
  .spaces();

//Adding User to app
const addUser = async (req, res) => {
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  let info = {
    username: req.body.username,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    password: hashPassword,
  };

  if (
    !emailValidator.validate(`${req.body.username}`) ||
    !passValidator.validate(`${req.body.password}`) ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    res.status(400).send();
  } else {
    const findUser = await User.findOne({
      where: { username: `${req.body.username}` },
    });
    if (findUser === null) {
      const user = await User.create(info);
      res
        .status(200)
        .send()
        .then(() => console.log("User Added!"))
        .catch((err) => console.log(err));
    } else {
      res.status(400).send();
    }
  }
};

// Retrieving User information after basic authentication.
const userInfo = async (req, res) => {
  if (req.headers.authorization === undefined) {
    res.status(401).send();
  } else {
    //grab the encoded value, format: bearer <Token>, need to extract only <token>
    var encoded = req.headers.authorization.split(" ")[1];
    // decode it using base64
    var decoded = new Buffer(encoded, "base64").toString();
    var username = decoded.split(":")[0];
    var password = decoded.split(":")[1];

    // check if the passed username and password match with the values in our database.\

    const findUser = await User.findOne({
      where: { username: username },
    });
    if (findUser !== null) {
      if (await bcrypt.compare(password, findUser.password)) {
        let plainUser = {
          id: findUser.id,
          username: findUser.username,
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          account_created: findUser.account_created,
          account_updated: findUser.account_updated,
        };

        res.status(200).send(JSON.stringify(plainUser));
      } else {
        res.status(400).send();
      }
    } else {
      res.status(400).send();
    }
  }
};

//Updating user information
const updateUser = async (req, res) => {
  if (req.headers.authorization === undefined) {
    res.status(401).send();
  } else {
    //grab the encoded value, format: bearer <Token>, need to extract only <token>
    var encoded = req.headers.authorization.split(" ")[1];
    // decode it using base64
    var decoded = new Buffer(encoded, "base64").toString();
    var username = decoded.split(":")[0];
    var password = decoded.split(":")[1];
    // check if the passed username and password match with the values in our database.\

    const findUser = await User.findOne({
      where: { username: username, password: password },
    });
    if (findUser !== null) {
      if (!req.body.firstName || !req.body.lastName || !req.body.password) {
        res.status(400).send();
      } else {
        if (passValidator.validate(`${req.body.password}`)) {
          findUser.update({
            firstName: `${req.body.firstName}`,
            lastName: `${req.body.lastName}`,
            password: `${req.body.password}`,
          });
        } else {
          res.status(400).send();
        }
        res.status(200).send();
      }
    } else {
      res.status(400).send();
    }
  }
};

module.exports = { addUser, userInfo, updateUser };
