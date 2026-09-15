const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const { configDotenv } = require("dotenv");
configDotenv();
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const placesRoutes = require("./routes/placesRoutes");
const authRoutes = require("./routes/auth");
const stripeRoute = require("./routes/stripe");
const orderRoutes = require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const download = require("image-downloader");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const passportsetUp = require("./passport");
// const cookieSession = require('cookie-session');
const passport = require("passport");
const userModel = require("./models/user");
const nodemailer = require("nodemailer");
const Order = require("./models/order");
const cloudinary = require("./uploadImages");
const postmark = require("postmark");
require("https").globalAgent.options.rejectUnauthorized = false;

// CORS setup - must come first so all subsequent middleware/routes respect it
// Prefer CLIENT_URL env var (set on Railway), fallback to production URL, then localhost
const clientUrl =
  process.env.CLIENT_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://airbnb-final-ten.vercel.app"
    : "http://localhost:3000");

app.use(
  cors({
    credentials: true,
    origin: clientUrl,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", clientUrl);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Middleware
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    limit: "50mb",
  })
);

// Social Auth
app.use(
  session({
    secret: "felix",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect to Db
if (process.env.MONGOURL) {
  mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
      app.listen(process.env.PORT || 4000, (req, res) => {
        console.log('--Listening to Port,' + (process.env.PORT || 4000));
      });
    })
    .catch(function(err) {
      console.log('mongo connection failed:', err.message);
      app.listen(process.env.PORT || 4000, function() {
        console.log('--Listening to Port,' + (process.env.PORT || 4000));
      });
    });
} else {
  console.log('No MONGOURL provided, starting server without database connection');
  app.listen(process.env.PORT || 4000, function() {
    console.log('--Listening to Port,' + (process.env.PORT || 4000));
  });
}

// Routes
app.use(userRoutes);
app.use(placesRoutes);
app.use(bookingRoutes);
app.use("/auth", authRoutes);
app.use(stripeRoute);
app.use(orderRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// app.get('/test',(req,res)=>{
//     res.json("Hello World!")
// })

// Reset Email
const resetPasswordEmail = async (name, email, link) => {
  const html = `<style>
                   @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700&display=swap');
                   *{
                     box-sizing:border-box;
                     font-family: 'Mukta', sans-serif;
                   }
                   </style>
                   <div style='width:80%;margin:0 auto;font-family: Arial, Helvetica, sans-serif;'>
                   <img src='https://res.cloudinary.com/dljgkzwfz/image/upload/v1693831482/userImages/airbnb_lssgog.png' alt='headerImg' style='display:block;object-fit:contain' width='100%' height='100px'/>
                     <h2>Hii ${name.split(" ")[0]},</h2> - <span>${email}</span>
                   <p style='max-width:80ch'>You requested to change your password. Here's the link to follow to change your password.</p>
                   <p> ${link}</p>
                     <p><strong>N.B:</strong>Note that this link would expire in <strong>3</strong> minutes.</p>
                     
                   </div>`;
  return new Promise(async (resolve, reject) => {
    try {
      const serverToken = process.env.POSTMARK;
      const client = new postmark.ServerClient(serverToken);

      const result = client.sendEmail({
        From: "justfelix@felixdev.com.ng",
        To: email,
        Subject: "AirBnb - Password Reset!",
        HtmlBody: html,
      });
      resolve("Email sent successfully", result);
    } catch (error) {
      console.error("Error sending email:", error);
      reject("Email sending failed");
    }
  });
};

app.post("/uploadByLink", async (req, res) => {
  try {
    const { link } = req.body;
    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(link, {
      folder: "airbnbLocations",
    });

    res.json(uploadedImage.secure_url);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

const photosMiddleware = multer();
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  try {
    const uploadedFiles = [];

    // Define a function to upload to Cloudinary
    const uploadToCloudinary = async (buffer) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "airbnbLocations",
            },
            (error, result) => {
              if (error) {
                reject(error); // Reject the promise on error
              } else {
                resolve(result); // Resolve the promise with the result on success
              }
            }
          )
          .end(buffer);
      });
    };

    for (let i = 0; i < req.files.length; i++) {
      const { buffer, originalname } = req.files[i];

      try {
        // Upload to Cloudinary using the custom promise function
        const uploadedImage = await uploadToCloudinary(buffer);
        uploadedFiles.push(uploadedImage.secure_url);
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
      }
    }

    res.json(uploadedFiles);
  } catch (error) {
    console.error("Error processing files:", error);
    res.status(500).json({ error: "Error processing files" });
  }
});

// Resetting Password Routes

app.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      console.log("Email does not exist!");
      return res.status(401).json("Email does not exist!");
    }
    if (!existingUser.password) {
      console.log("You have a social Auth registration!");
      return res.status(401).json("You have a social Auth registration!");
    }
    const SECRET = process.env.SECRET;
    const secret = SECRET + existingUser?.password;
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: 300 }
    );
    const link = `https://www.airbnb-server.felixdev.com.ng/reset-password/${existingUser._id}/${token}`;
    //send email with the reset password url to the registered mail id
    await resetPasswordEmail(existingUser?.name, existingUser?.email, link);
    res.status(200).json("Reset Link sent successfully!");
  } catch (err) {
    res.status(401).json("Something went wrong!");
  }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const existingUser = await userModel.findOne({ _id: id });
  if (!existingUser) {
    return res.status(401).json("User does not exist!");
  }
  const SECRET = process.env.SECRET;
  const secret = SECRET + existingUser?.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "not verified" });
  } catch (error) {
    res.send("Not Verified!");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;
  const isAdmin = process.env.KEY;

  const existingUser = await userModel.findOne({ _id: id });
  if (!existingUser) {
    return res.status(401).json("User does not exist!");
  }
  const SECRET = process.env.SECRET;
  const secret = SECRET + existingUser?.password;
  const verify = jwt.verify(token, secret);
  try {
    if (password !== confirmPassword) {
      return res.render("failed", { email: verify.email });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (password == confirmPassword && password.includes(isAdmin)) {
      await userModel.updateOne(
        { _id: id },
        { $set: { password: hashedPassword, admin: true } }
      );
    } else {
      await userModel.updateOne(
        { _id: id },
        { $set: { password: hashedPassword, admin: false } }
      );
    }
    // res.status(201).json({status:'Password Updated successfully!'});
    res.render("success", { email: verify.email });
  } catch (error) {
    res.render("genericFailure", { email: verify.email });
  }
});