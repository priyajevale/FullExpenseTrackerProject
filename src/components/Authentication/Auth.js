import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./Auth.module.css";
import { authActions } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AuthPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    const urlF =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyApHk-o7Pci_qpspQyUuyTvTcbU4OTSuIk";
    const enteredEmail = emailRef.current.value;
    try {
      const response = await fetch(urlF, {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      setIsLoading(false);
      if (response.ok) {
        console.log("request sent successfully");
        return response.json();
      } else {
        if (
          response.error &&
          response.error.message === "RESET_PASSWORD_EXCEED_LIMIT"
        ) {
          console.log("Password reset limit exceeded. Please try again later.");
        } else
          return response.json().then((data) => {
            let errorMsg = "Error sending password reset email";
            console.log(data);
            throw new Error(errorMsg);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApHk-o7Pci_qpspQyUuyTvTcbU4OTSuIk"
      
       ;
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApHk-o7Pci_qpspQyUuyTvTcbU4OTSuIk"
      
       ;
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      setIsLoading(false);
      if (!res.ok) {
        throw new Error(data.error?.message || "Authentication failed");
      }

      dispatch(authActions.login({ idToken: data.idToken, email: data.email }));
      navigate("/exp");

      setIsLoading(false);
    } catch (err) {
      alert(err.message);
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <>
      <section className={classes.auth}>
        <h1 className="mb-4">{isLogin ? "Sign Up" : "Login"}</h1>

        <form onSubmit={submitHandler}>
          <div className={classes.form_group}>
            <input
              type="email"
              className={classes.form_control}
              id="email"
              placeholder=" "
              ref={emailRef}
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className={classes.form_group}>
            <input
              type="password"
              className={classes.form_control}
              id="password"
              placeholder=" "
              ref={passwordRef}
            />
            <label htmlFor="password">Password</label>
          </div>

          {!isLogin && (
            <Button variant="link" onClick={forgotPasswordHandler}>
              Forgot Password?
            </Button>
          )}
          <div className={classes.actions}>

            {!isLoading && (
              <button type="submit" className="btn btn-primary btn-block" >
                {isLogin ? "Sign up" : "Login"}
              </button>
            )}
            {isLoading && <p>Sending Request...</p>}
          </div>

          <div className={classes.signup_link}>
            <div
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {!isLogin ? "Don't have an account? " : "Already have an Account?"}
              <span style={{ cursor: "pointer", color: "#007bff" }}>
                {!isLogin ? "Sign up!" : "Login"}
              </span>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
export default AuthPage;