import React, { useState } from "react";

const Login = () => {
  const [email, setemail] = useState("");
  const [otp, setotp] = useState("");
  const [Typedotp, setTypedotp] = useState("");
  const [otpsent, setotpsent] = useState(false);
  const [message, setmessage] = useState("");

  // => Function to Take Email as input and get OTP in Email
  const GetOTP = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch("/api/user/otp/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      if (data.status == 200) {
        const res = await data.json();
        setotp(res.message.split(" ")[1]);
        setotpsent(true);
        setmessage("Email Verfication Success");
      } else {
        setmessage("Invalid Cridentials");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // => Function to send OTP to server for verification
  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch("/api/user/otp/verify", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ otp: Typedotp }),
      });
      if (data.status == 200) {
        const res = await data.json();
        setmessage("Verfication Successful");
      } else {
        setmessage("Verifcation Failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  
  return (
    <>
      <div className="login_wrapper">
        <div className="login_header">
          <h3>Login</h3>
        </div>
        <div className="form_Wrapper">
          <form action="#">
            {otpsent ? (
              <>
                <div className="formele">
                  <label htmlFor="em">Enter your OTP</label>
                  <input
                    type="email"
                    name="email"
                    id="em"
                    value={Typedotp}
                    onChange={(e) => setTypedotp(e.target.value)}
                  />
                </div>
                <div className="formele">
                  <button onClick={(e) => verifyOTP(e)}>Submit OTP</button>
                </div>
              </>
            ) : (
              <>
                <div className="formele">
                  <label htmlFor="em">Enter your email address</label>
                  <input
                    type="email"
                    name="email"
                    id="em"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="formele">
                  <button onClick={(e) => GetOTP(e)}>Get OTP</button>
                </div>
              </>
            )}
          </form>
        </div>
        <div className="message_wrapper">
          <div className="message">{message}</div>
        </div>
      </div>
    </>
  );
};

export default Login;
