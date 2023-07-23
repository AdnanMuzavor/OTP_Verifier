import React, { useState } from "react";

const Login = () => {
  const [email, setemail] = useState("");
  const [otp, setotp] = useState("");
  const [Typedotp, setTypedotp] = useState("");
  const [otpsent, setotpsent] = useState(false);
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
      const res = await data.json();
      setotp(res.message.split(" ")[1]);
      setotpsent(true);
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
                  <button onClick={(e) => GetOTP(e)}>Get OTP</button>
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
      </div>
    </>
  );
};

export default Login;
