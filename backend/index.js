const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
if (!process.env.USER_MAIL || !process.env.MAIL_PASS) {
    console.error("Missing USER or PASS in .env file");
    process.exit(1);
  }
  

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sent-message", async (req, res) => {
  const { name, email, phone, email_sub, message } = req.body;


  try {
    const transporter = nodemailer.createTransport({
     service: "gmail",

      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOption = {
      from: process.env.USER_MAIL,
      to: process.env.USER_MAIL,
      replyTo: email,
      subject: `Message from ${name} : ${email_sub}`,
      text: `Name: ${name}\nEmail : ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };
    const info = await transporter.sendMail(mailOption);
    // console.log("Email Sent: ", info.response);

    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email Send Error:", error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});
app.get("/", (req, res) => {
    res.send("Rendering . . .");
});

app.listen(5000, () => {
  console.log("Server is listening on port:5000");
});
