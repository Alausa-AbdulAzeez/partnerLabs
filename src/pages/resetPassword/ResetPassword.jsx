import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./resetPassword.scss";
import { BsEye, BsFillEyeSlashFill } from "react-icons/bs";
import { publicRequest } from "../../functions/requestMethods";
// import { login } from '../../redux/apiCalls'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  // MISCELLANEOUS
  const [btnDisabled, setBtnDisabled] = useState(false);
  const navigate = useNavigate();
  const toastId = useRef(null);
  const token = window.location?.search?.split("=")[1];

  // END OF MISCELLANEOUS

  // USER LOGIN DETAILS
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    code: token,
  });
  // END OF USER LOGIN DETAILS

  //   FUNCTIONs FOR SETTING USER STATE

  const handleSetUser = (event, inputType) => {
    setUser({ ...user, [inputType]: event.target.value });
  };

  // PASSWORD TOGGLE FUNCTIONALITY
  const [showPassword, setShowPassword] = useState(false);

  // FUNCTION FOR PASSWORD TOGGLE
  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // END OF FUNCTION FOR PASSWORD TOGGLE

  // END OF PASSWORD TOGGLE FUNCTIONALITY

  // FUNCTION FOR ONCLICK LOGIN BUTTON
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setBtnDisabled(true);

    toastId.current = toast("Please Wait", {
      autoClose: 3000,
      isLoading: true,
    });

    try {
      if (user?.password?.trim() === user?.confirmPassword?.trim()) {
        const res = await publicRequest
          .post("/Account/reset-password", user)
          .then(() => {
            toast.update(toastId.current, {
              render:
                "Password updated succesfully! You'll be redirected in a bit, Please wait...",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });

            setBtnDisabled(false);

            setTimeout(() => {
              navigate("/login");
            }, 2500);
          });
        console.log(res);
      } else {
        toast.update(toastId.current, {
          render: "Passwords don't match!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        setTimeout(() => {
          setBtnDisabled(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 2500,
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

    // login(dispatch, user, navigate)
  };
  // END OF FUNCTION FOR ONCLICK LOGIN BUTTON

  //   USE EFFECT FOR SETTING BUTTON STATE
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <ToastContainer />
      <div className="resetPasswordWrapper">
        <div className="resetPasswordWrapperRight">
          <form
            className="resetPasswordFormWrapper"
            onSubmit={handleResetPassword}
          >
            <div className="resetPasswordHeading">Reset Password</div>
            <div className="resetPasswordInputs">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="resetPasswordEmailInput resetPasswordInput"
                placeholder="example@****.com"
                data-testid="emailTestId"
                onChange={(e) => handleSetUser(e, "username")}
                required
              />

              <label htmlFor="">New Password</label>
              <div className="passwordWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="resetPasswordPasswordInput resetPasswordInput"
                  placeholder="Password"
                  onChange={(e) => handleSetUser(e, "password")}
                  data-testid="passwordTestId"
                  required
                />
              </div>
              <label htmlFor="">Confirm New Password</label>
              <div className="passwordWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="resetPasswordPasswordInput resetPasswordInput"
                  placeholder="Password"
                  onChange={(e) => handleSetUser(e, "confirmPassword")}
                  data-testid="passwordTestId"
                  required
                />
              </div>
              <div className="checkboxWrapper">
                <label htmlFor="">Show Passwords</label>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={handlePasswordToggle}
                />
              </div>
            </div>

            <button
              className="resetPasswordBtn"
              type={"submit"}
              data-testid="resetPasswordBtn"
              disabled={btnDisabled}
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
