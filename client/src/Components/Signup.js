import React, { useState } from "react";

const SignUp = () => {
  const [email, setemail] = useState("");
  const [fname, setfname] = useState("");
  const [password, setpassword] = useState("");

  const [message, setmessage] = useState("Message");

  // => Function to register user
  const RegisterUser = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch("/api/user/otp/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          fname: fname,
          email: email,
          password: password,
        }),
      });
      const res = await data.json();
      if (data.status == 200) {
       
        setmessage("User Registered Successfully");
      } else {
        setmessage(res.Message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container">
        <div className="login_wrapper row">
          <div className="login_header">
            <h3>SignUp</h3>
          </div>
          <div className="lhs col-md-6 col-lg-6">
            <div className="img_wrapper">
              <img
                src={
                  "https://www.web2sms.co.in/wp-content/uploads/2020/05/otpa.png"
                }
                alt="Image"
                className="img-fluid img"
              />
            </div>
          </div>
          <div className="lhs col-md-6 col-lg-6 ">
            <div className="form_Wrapper">
              <form action="#">
                <div className="formele">
                  <label htmlFor="fn">Enter your first name: </label>
                  <input
                    type="text"
                    name="fname"
                    id="fn"
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                  />
                </div>

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
                  <label htmlFor="pw">Enter your email address</label>
                  <input
                    type="password"
                    name="password"
                    id="pw"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div className="formele">
                  <button onClick={(e) => RegisterUser(e)}>
                    Register User
                  </button>
                </div>
              </form>
            </div>
            <div className="message_wrapper">
              <div className="message">{message}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
