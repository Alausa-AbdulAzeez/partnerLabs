import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./forgotPassword.scss";
import {
  BASE_FRONTEND_URL,
  publicRequest,
} from "../../functions/requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  // MISCELLANEOUS
  const toastId = React.useRef(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  // END OF MISCELLANEOUS

  // USER LOGIN DETAILS
  const [user, setUser] = useState({
    username: "",
  });
  // END OF USER LOGIN DETAILS

  //   FUNCTIONs FOR SETTING USER

  const handleSetUser = (event, inputType) => {
    setUser({ ...user, [inputType]: event.target.value });
  };

  //   END OF FUNCTIONs FOR SETTING USER

  // FUNCTION FOR ONCLICK LOGIN BUTTON
  const handleLogin = async (e) => {
    e.preventDefault();

    setBtnDisabled(true);

    toastId.current = toast("Please wait...", {
      autoClose: 3000,
      isLoading: true,
    });
    try {
      if (user?.username) {
        const res = await publicRequest
          .post("/Account/forgot-password", user)
          .then(() => {
            toast.update(toastId.current, {
              render: "Recovery email sent successfully!",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
            setBtnDisabled(false);
          })
          .then(() => {
            setUser({
              username: "",
            });
          });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 3000,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          "Something went wrong, please try again"
        }`,
      });
      setBtnDisabled(false);
    }
  };
  // END OF FUNCTION FOR ONCLICK LOGIN BUTTON

  return (
    <>
      <ToastContainer />
      <div className="forgotPasswordWrapper">
        <div className="forgotPasswordWrapperRight">
          <form className="forgotPasswordFormWrapper" onSubmit={handleLogin}>
            <div className="forgotPasswordHeading">Recover Password</div>
            <p className="forgotPasswordDesc">
              Enter your email address, and we'll send you a link to get back
              into your account.
            </p>
            <div className="forgotPasswordInputs">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="forgotPasswordEmailInput forgotPasswordInput"
                placeholder="example@****.com"
                onChange={(e) => handleSetUser(e, "username")}
                value={user?.username}
                required
              />
              <Link to={"/forgotPassword"}>
                <div className="forgotPassword"></div>
              </Link>
            </div>

            <button
              className="forgotPasswordBtn"
              type={"submit"}
              data-testid="forgotPasswordBtn"
              disabled={btnDisabled}
            >
              Send Login Link
            </button>
            <Link to={`${BASE_FRONTEND_URL}login`}>
              <div className="backToLogin">Back to login</div>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
