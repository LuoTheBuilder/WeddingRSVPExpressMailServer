const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gmailaccountemailhere",
    pass: "gmailaccountpasswordhere",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const attending = req.body.attending;
  const howManyPeople = req.body.howManyPeople;
  const whoIn = req.body.whoIn;
  const Dietary = req.body.Dietary;
  const Dancin = req.body.Dancin;
  const message = req.body.message;
  const mail = {
    from: name,
    to: "WeddingPlannersEmail@email.com",
    subject: "Wedding RSVP for John and Jane",
    html: `

    <p>Hi John and Jane, </p>
    <p>You've got another reservation notification for your wedding. Below is a summary:</p>
          <p>Who: ${name}</p>
           <p>Email: ${email}</p>
           <p>Are they attending? ${attending}</p>
           <p>How many people are they bringing? ${howManyPeople}</p>
           <p>Who are they bringing? ${whoIn}</p>
           <p>Do they have any dietary reqests? ${Dietary}</p>
           <p>What's gonna get them out on the dancefloor? ${Dancin}</p>
           <p>Do they have a personal message for you? ${message}</p>
           <p>Thank you! Here's to a great wedding!</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

app.get("/", function (req, res) {
  res.send("Email server is active");
});

app.listen(process.env.PORT || 5000, () => console.log("Server Running"));
