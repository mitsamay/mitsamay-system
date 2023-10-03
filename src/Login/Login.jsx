import "./Login.scss";
import logo from "../assets/logo.png";
import { useState } from "react";
import warning from "../assets/warning.png";

import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { motion as m } from "framer-motion";

const Login = () => {
  const [username, setusername] = useState(true);

  const [NewUser, setNewUser] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [error, seterror] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    seterror(false);

    if (NewUser) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          localStorage.setItem("username", username);
        })
        .catch((error) => {
          seterror(true);
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        seterror(true);
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="login-page"
    >
      <m.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span>
          from <i>Mitsamay Keotheuankham</i>
        </span>
      </m.header>

      <m.img
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 2,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
        className="logo"
        src={logo}
        alt=""
      />

      <m.h2
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 3,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
        className="title"
      >
        Lands
        <br />
        Information System
      </m.h2>

      <form onSubmit={submit}>
        {NewUser && (
          <div className="username">
            <input
              onChange={(e) => setusername(e.target.value)}
              type="username"
              id="username"
              required
            />
            <label htmlFor="username">username</label>
          </div>
        )}

        <div className="email">
          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            type="email"
            id="email"
            required
          />
          <label htmlFor="email">email</label>
        </div>

        <div className="password">
          <input
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            id="password"
            required
          />
          <label htmlFor="password">password</label>
        </div>

        {error && <img src={warning} alt="" className="status" />}

        {error && <span className="error">Process Failed</span>}
        {error && <span className="error">{ErrorMsg}</span>}

        <m.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          type="submit"
        >
          {NewUser ? "Sign Up" : "Log In"}
        </m.button>

        {NewUser ? (
          <span className="user-stat">
            Already have an account? {" "}
            <b
              onClick={() => {
                setNewUser(false);
                seterror(false);
              }}
            >
              Log In
            </b>
          </span>
        ) : (
          <span className="user-stat">
            Do not have an account? {" "}
            <b
              onClick={() => {
                setNewUser(true);
                seterror(false);
              }}
            >
              Sign Up
            </b>
          </span>
        )}
      </form>
    </m.div>
  );
};

export default Login;