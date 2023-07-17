import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { persistor } from "../redux/store";
import { loggedOut } from "../redux/globalSlice";
import { publicRequest } from "../functions/requestMethods";

const PrivateRoutes = () => {
  // MISCELLANEOUS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // GET LOGGED IN STATE OF THE USER
  const { isLoggedIn } = useSelector((state) => state?.globalState?.user);

  // GET CURRENT USER TOKEN
  const token = useSelector((state) => state?.user?.currentUser?.data?.token);
  const role = useSelector((state) => state?.user?.currentUser?.data?.role[0]);

  useEffect(() => {
    const getAllCandidates = async () => {
      try {
        await publicRequest
          .get("/Candidate", {
            headers: {
              Accept: "*",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async () => {
            const res = await publicRequest.get("/Candidate/stage", {
              headers: {
                Accept: "*",
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(res);
          });
      } catch (error) {
        if (
          error?.response?.statusText === "Unauthorized" ||
          error?.response?.status === 401 ||
          error?.response?.status === 400
        ) {
          dispatch(loggedOut());

          persistor
            .purge()
            // .then(() => navigate('/login'))
            .then(() => {
              return toast.info("Session Expired Please login to continue", {
                position: "top-right",
                // autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            });
        }
      }
    };
    // END OF FUNCTION TO GET AND SET ALL CANDIDATES
    getAllCandidates();
  }, [dispatch, navigate, token]);

  useEffect(() => {
    if (role === "Client") {
      dispatch(loggedOut());

      persistor
        .purge()
        // .then(() => navigate('/login'))
        .then(() => {
          return toast.info("Session Expired Please login to continue", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    console.log(isLoggedIn);
  }, []);

  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
