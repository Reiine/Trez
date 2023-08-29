import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  async function submit() {
    try {
      await axios.post("/register", {
        name,
        email,
        gender,
        pass,
      });
      toast.success("Account Created Successfully");
      navigate("/account/login");
    } catch (e) {
      toast.error("Failed To Register");
    }
  }
  return (
      <div className="accountcover">
        <div className="signincover">
          <p className="form">Register</p>
          <div className="form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="gender">
            <label htmlFor="gender">Gender:</label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              name="gender"
              id="trans"
              value="transgender"
              checked={gender === "transgender"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="trans">Transgender</label>
          </div>
          <div className="form">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="example@xyz.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form">
            <label htmlFor="password">Password:</label>
            <input type="password" onChange={(e) => setPass(e.target.value)} />
          </div>
          <Link to={`/account/login`} className="form">
            Already have an account?
          </Link>
          <Button variant="dark" className="form" onClick={submit}>
            Sign Up
          </Button>
        </div>
      </div>
  );
}

function LogIn({ handleAuthToken }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  async function submit() {
    try {
      await axios
        .post("/login", {
          email,
          pass,
        })
        .then((res) => {
          if (res.data.message === "logsuccess") {
            handleAuthToken(res.data.token, true);
            toast.success("Login Successfull");
            setIsLogin(true);
            navigate("/");
            localStorage.setItem("authToken", res.data.token);
          } else {
            toast.error("Wrong credentials");
          }
        });
    } catch (e) {
      console.log("Failed To Login");
    }
  }

  return (
      <div className="accountcover">
        <div className="signincover">
          <p className="form">Login</p>
          <div className="form">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="example@xyz.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form">
            <label htmlFor="password">Password:</label>
            <input type="password" onChange={(e) => setPass(e.target.value)} />
          </div>
          <Link to={`/account/signup`} className="form">
            Don't have an account?
          </Link>
          <Button variant="dark" className="form br-0" onClick={submit}>
            Login
          </Button>
        </div>

      </div>

  );
}

export const Login = LogIn;
export const Signup = SignUp;
