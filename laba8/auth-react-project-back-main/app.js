const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const auth = require("./auth");

dbConnect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(3000, () => {
//   console.log("Server is running at port 3000");
// });

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.post("/register", (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        name : request.body.name,
        group : request.body.group,
        variant : request.body.variant,
        phone : request.body.phone,
        photo : request.body.photo,
        email: request.body.email,
        password: hashedPassword,
        role: 'user'
      });

      user
        .save()
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

app.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords do not match",
              error,
            });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords do not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email does not found",
        e,
      });
    });
});

app.get('/api/profile', auth, (request, response) => {
  console.log(request.token)
  jwt.verify(request.token, "RANDOM-TOKEN", (err, authData)=>{
    if(err)
      response.sendStatus(403);
    else{
      response.json({
        message:"Welcome to Profile",
        userData:authData
      })
    }
  })
});

app.get("/auth-endpoint", auth, (request, response) => {
  User.findById(request.user.userId, function (err, docs) {
    if (err){
        console.log("Auth error: ", err);
    }
    else{
        console.log("Result : ", docs);
        response.send({
          userData:docs
      })
    }
  });
});

app.get("/get-role", auth, (request, response) => {
  User.findById(request.user.userId, function (err, docs) {
    console.log("Result : ", docs.role);
        response.send({
          userData:docs
      })
  });
});

app.post("/change", auth, async (request, response) => {

  const updateUser = await User.findByIdAndUpdate(request.user.userId, { 
    name : request.body.name, 
    group : request.body.group, 
    variant : request.body.variant, 
    phone : request.body.phone, 
    email : request.body.email
   },{
    new: true
  });

  const token = jwt.sign(
    {
      userId: request.user.userId,
      userEmail: updateUser.email,
    },
    "RANDOM-TOKEN",
    { expiresIn: "24h" }
  );
  response.status(200).send({
    message: "Login Successful",
    email: updateUser.email,
    token,
  });
})

app.post("/delete", auth, async (request, response) => {
  await User.findByIdAndDelete(request.user.userId);
})

app.get('/getUsersList', auth, async function(req, res) {
  await User.find({}, function(err, users) {
    var userMap = {};
    var i =0;

    users.forEach(function(user) {
      userMap[i] = user.name;
      i++;
    });

    res.send({
      usersList: userMap
    
    });  
  });
});

module.exports = app;
