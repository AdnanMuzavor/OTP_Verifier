//Way 01
const UserLogin = async (req, res) => {
  res.status(200).send({ Message: "OTP sent successfully" });
};

module.exports = UserLogin;

//Way 02
class UserController {
  //Send OTP
  static UserLogin = async (req, res) => {
    res.status(200).send({ message: "OTP send successfully" });
  };
}
