import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Correctly using bcryptjs (change: ensure proper bcryptjs usage)
import { userMiddleware } from "./middleware";
const JWT_USER_KEY = "senate";
const app = express();
import cors from "cors";
import { random } from "./utils";
//zod validation pending
app.use(express.json());
app.use(cors());
//done
app.post("/api/v1/signup", async (req, res) => {
  const { username, password, email, name } = req.body;
  console.log(req.body);
  try {
    if (!username || !password || !email || !name) {
      console.log("Input details are not complete");
      res.json({
        msg: "Enter all credentials: name, email, password, username",
      });
    } else {
      // Hashing the password with bcryptjs
      const hashed_password = await bcrypt.hash(password, 10);
      const user = await UserModel.create({
        name,
        username,
        email,
        password: hashed_password,
      });
      res.status(200).json({
        msg: "Signup Successful",
        user: user,
      });
    }
  } catch (err: any) {
    console.error("Error occurred while saving data:", err.message);
    if (err.name === "ValidationError") {
      res.status(400).json({
        msg: "Validation error: " + err.message,
      });
    } else if (err.code === 11000) {
      res.status(409).json({
        msg: "Conflict: Duplicate entry",
      });
    } else {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  }
});
//done
app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = jwt.sign({ id: user._id }, JWT_USER_KEY); // user._id is encoded as id, so while decoding we will get id from it
        res.status(200).json({
          msg: "Signin Successful",
          token: token,
        });
      } else {
        res.status(403).json({
          msg: "Invalid credentials",
        });
      }
    } else {
      res.status(400).json({
        msg: "User doesn`t Exists",
      });
    }
  } catch (err: any) {
    console.error("Error occurred while signing in:", err.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

// done completely
// used middleware to get the token  and to check is the user logged in or not
app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { title, link, type } = req.body;
  try {
    if (!title || !link || !type) {
      res.json({
        msg: "add all the required details:title, link, type",
      });
    } else {
      const content = await ContentModel.create({
        title,
        link,
        type,
        // @ts-ignore
        //req.body.userId is used only when:
        //The userId is intentionally sent by the client as part of the request payload (e.g., when updating another user's data, such as an admin managing users).
        //Using req.userId keeps user-related information (like authentication/authorization) separate from the request payload (req.body), which typically contains data the user explicitly sends, such as form inputs or JSON objects.
        userId: req.userId, //note that i have written req.userId not req.body.userId
        tags: [],
      });
      res.status(200).json({
        msg: "Content added Succesfully",
        content: content,
      });
      console.log(`Content added ${content._id} by User ${content.userId}`);
    }
  } catch (e: any) {
    console.log(e);
    res.json({
      msg: "Error while adding content",
    });
  }
});

// getting content by the user// all thing done
app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //req.body.userId is used only when:
  //The userId is intentionally sent by the client as part of the request payload (e.g., when updating another user's data, such as an admin managing users).
  //Using req.userId keeps user-related information (like authentication/authorization) separate from the request payload (req.body), which typically contains data the user explicitly sends, such as form inputs or JSON objects.
  // @ts-ignore
  const userId = req.userId; // take care this userId is added in the middleware in the req object also note that i have written req.userId not req.body.userId
  const content = await ContentModel.find({ userId }).populate(
    "userId",
    "username password" // the details corresponding to the userId will be populated
  );
  res.status(200).json({
    content: content,
  });
});

//done, jest need to add if content doesnt exist
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const { _id } = req.body;
  //@ts-ignore
  console.log("Content deleted " + _id, "by User " + req.userId);
  const content = await ContentModel.deleteOne({
    //@ts-ignore
    userId: req.userId,
    _id: _id,
  });
  res.status(200).json({
    content: content,
    msg: "Content Deleted Successfully",
  });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  console.log("share: " + share);
  if (share) {
    const existingLink = await LinkModel.findOne({
      //@ts-ignore
      userId: req.userId,
    });
    if (existingLink) {
      res.status(200).json({
        msg: "Share link already exists",
        hash: existingLink.hash,
      });
      return; // early return concept
    }
    const hash = random(10);
    await LinkModel.create({
      //@ts-ignore
      userId: req.userId,
      hash: hash,
    });
    res.status(200).json({
      msg: "Share link created successfully",
      hash,
    });
  } else {
    await LinkModel.deleteMany({
      //@ts-ignore
      userId: req.userId,
    });
    res.status(200).json({
      msg: "Share link deleted successfully",
    });
  }
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({
    hash,
  });
  if (!link)
    res.status(404).json({
      msg: "Incorrect Input",
    });
  else {
    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });
    res.status(200).json({
      content: content,
      user: user,
    });
  }
});

const Connectdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://senatenikhil:Kbo8FJegztKrOwvN@cluster0.izhn8.mongodb.net/RecallRoom"
    );
    console.log("DB Connected");
  } catch (err) {
    console.log("Unable to connect to DB With err " + err);
  }
};

Connectdb();
app.listen(3000, () => console.log("Server is running on port 3000")); // (change: added server start confirmation message)
