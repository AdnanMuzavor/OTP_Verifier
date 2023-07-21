//Way 01 [ WHAT YOU ALREADY KNOW!]
// const UserLogin = async (req, res) => {
//   res.status(200).send({ Message: "OTP sent successfully" });
// };

// module.exports = UserLogin;

const Nodemailer = require("nodemailer");

//email config: setting up email from which mail will be sent to user

//Way 02 [ WHAT YOU LEART FROM VIDEO ]
class UserController {
  //Send OTP
  static UserLogin = async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send("Please enter the email");
    }
    try {
      const OTP = Math.floor(100000 + Math.random() * 900000);
      const transporter = Nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const mailoptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Knock Knock, Your OTP ",
        html: `
        <div>
         <h2> 
          Hello ${email}
         </h2>
         <h3>
          Your OTP is: ${OTP}
         </h3>
         <p >
          Please Don't share your OTP with anyone
         </p>
        </div>`,
      };
      transporter.sendMail(mailoptions, (err, info) => {
        if (err) console.log(err);
        else {
          console.log(info);
          res.status(200).send({ message: `OTP: ${OTP} send successfully` });
        }
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  };
}

module.exports = UserController;
