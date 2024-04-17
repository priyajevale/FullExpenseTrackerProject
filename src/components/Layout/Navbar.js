import { Link, useNavigate } from "react-router-dom";
import classes from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/AuthSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logouHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/exp">Expense</Link>
              </li>
            )}
            {isLoggedIn && isLoggedIn && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button className={classes.loginbtn} onClick={logouHandler}>
                  Logout
                </button>
              </li>
            )}
            {!isLoggedIn && (
              <button
                className={classes.loginbtn}
                onClick={() => navigate("/")}
              >
                Login
              </button>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;