//Way 01 [ WHAT YOU ALREADY KNOW!]
// const UserLogin = async (req, res) => {
//   res.status(200).send({ Message: "OTP sent successfully" });
// };

// module.exports = UserLogin;

const Nodemailer = require("nodemailer");
const User = require("../DB/Schema/UserSchema");
const OTPS = require("../DB/Schema/OTPSchema");

//email config: setting up email from which mail will be sent to user

//Way 02 [ WHAT YOU LEART FROM VIDEO ]
class UserController {
  //Register
  static RegisterUser = async (req, res) => {
    const { fname, email, password } = req.body;

    if (!fname || !email || !password) {
      res.status(400).send({ Message: "Please Enter all details" });
      return;
    }
    try {
      const findUser = await User.findOne({ email: email });

      if (findUser) {
        res.status(400).json({ Message: "User Exists" });
        return;
      }
      const createUser = new User({ ...req.body });
      const saveUser = await createUser.save();

      return res.status(200).json(saveUser);
    } catch (e) {
      return res.status(400).json({ message: "Invalid Details", error: e });
    }
  };

  //Send OTP
  static UserLogin = async (req, res) => {
    const { email } = req.body;
    console.log("Email is: ", email);
    if (!email) {
      return res.status(400).send("Please enter the email");
    }
    try {
      //User Porcessing
      const findUser = await User.findOne({ email: email });
      if (!findUser) {
        return res.status(400).json({ Message: "Invalid Cridentials" });
      }

      //OTP GENERATION
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

      //OTP Saving
      //If OTP didnt existed, create one, else upcdate existing one
      const FindUserInOTP = await OTPS.findOne({ email: email });
      if (!FindUserInOTP) {
        console.log("User didnt existed in OTP collection");
        const AddUser = new OTPS({ email: email, otp: OTP });
        const SaveUser = await AddUser.save();
        console.log(SaveUser);
      } else {
        console.log("User did existed in OTP collection so UPDATE");
        const UpdateOTP = await OTPS.findByIdAndUpdate(
          { _id: FindUserInOTP._id },
          { otp: OTP },
          { new: true }
        );
        const StoreUpdatedOTP = await UpdateOTP.save();
        console.log(StoreUpdatedOTP);
      }

      //OTP Mailing
      transporter.sendMail(mailoptions, (err, info) => {
        if (err) {
          console.log(err);
          res.status(400).send({ error: "Email Not Sent" });
        } else {
          console.log(info);
          res.status(200).send({ message: `OTP: ${OTP} send successfully` });
        }
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  //Verify OTP
  static VerfyOTP = async (req, res) => {
    try {
      const { otp } = req.body;
      const findOTP = await OTPS.findOne({ otp: otp });
      console.log(findOTP);
      if (!findOTP) {
        return res.status(400).json({ Message: "Invalid OTP" });
      } else {
        return res.status(200).json({ Message: "Varification Successful" });
      }
    } catch (error) {}
  };
}

module.exports = UserController;
