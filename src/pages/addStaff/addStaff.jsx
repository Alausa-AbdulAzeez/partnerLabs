import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./addStaff.scss";
import AlertDialogSlide from "../../components/Dialogue";
import { Autocomplete, TextField } from "@mui/material";
import { publicRequest } from "../../functions/requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const AddStaff = () => {
  // MISCELLANEOUS
  const [open, setOpen] = React.useState(false);
  const { token } = useSelector((state) => state?.user?.currentUser?.data);
  const toastId = React.useRef(null);

  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user);
  const userName = currentUser?.data?.profile?.fullName;

  // LAB ID
  const labId = currentUser?.data?.profile?.laboratory?.id;

  // DATA TO RESET MUI AUTOSELECTS
  const [loading, setLoading] = useState(false);

  // TO SET THE STATE OF THE DONE AND CANCEL BUTTONS
  const [disableDoneAndCancelBtn, setDisableDoneAndCancelBtn] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // FUNCTIONALITIES PARTAINING TO FETCHING AND SETTING ROLES
  const [roles, setRoles] = useState([]);

  // fetch roles
  const getRoles = async () => {
    try {
      const res = await publicRequest.get("/Account/roles", {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        setRoles(res.data.data);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // end of fetch roles

  // END FUNCTIONALITIES PARTAINING TO ROLES

  // FUNCTIONALITIES FOR CREATING A NEW STAFF
  const [staff, setStaff] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    role: [],
    laboratoryId: labId,
  });

  // function for setting staff info
  const handleStaffData = (e, dataName, data) => {
    if (dataName === "laboratoryId") {
      setStaff((prev) => {
        return {
          ...prev,
          laboratoryId: data,
        };
      });
    } else {
      setStaff((prev) => {
        return {
          ...prev,
          [dataName]: data ? data.name : e.target.value,
        };
      });
    }
  };
  // end of function for setting staff info

  const createStaff = async (e) => {
    e.preventDefault();
    // const id = toast.loading('Please wait...')
    toastId.current = toast("Please wait...", {
      autoClose: false,
      isLoading: true,
    });
    console.log(staff);

    setDisableDoneAndCancelBtn(true);
    try {
      await publicRequest
        .post("/Account/profile-application-user", staff, {
          headers: {
            Accept: "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.update(toastId.current, {
            render: "Staff has been added succesfully!",
            type: "success",
            isLoading: false,
            autoClose: 2500,
          });
          setLoading((prev) => !prev);

          setDisableDoneAndCancelBtn(false);
        })
        .then(() => {
          setStaff({
            name: "",
            phoneNumber: "",
            email: "",
            role: "",
          });
        });
    } catch (error) {
      console.log(error.response);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 2500,
        isLoading: false,
        render: `${
          error.response?.data?.title ||
          error.response?.data?.description ||
          "Something went wrong, please try again"
        }`,
      });
      setDisableDoneAndCancelBtn(false);
      setLoading((prev) => !prev);
    }
  };

  //END OF FUNCTIONALITIES FOR CREATING A NEW STAFF

  // FUNCTION TO HANDLE LAB SELECTION (SLIDE)
  const handleLabSelection = (e, option) => {
    handleStaffData(e, "laboratoryId", option?.id);
    console.log(option);
    setSelectedLab(option);
  };
  // END OF FUNCTION TO HANDLE LAB SELECTION (SLIDE)

  // function to get all Laboratories
  const getAllLaboratories = async () => {
    try {
      const res = await publicRequest.get(`/Laboratory`, {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setLaboratories(res?.data?.data);
        console.log(res?.data?.data);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // end of function to get all Laboratories

  // USEEFFECT TO SET NEW STAFF INPUTS TO DEFAULT
  useEffect(() => {}, [staff]);

  // use effect for fetching roles
  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // end of use effect for fetching roles

  // use effect for getting all laboratories
  useEffect(() => {
    getAllLaboratories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // end of use effect for getting all laboratories

  return (
    <>
      <ToastContainer />
      <div className="addStaffWrapper">
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title="Cancel"
          link="/manageStaff"
          message="Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost."
        />
        <Sidebar />
        <div className="addStaffRight">
          <Topber userName={userName} />
          <div className="addStaffMainWrapper">
            <h2> Add New Staff</h2>
            <form
              className="addStaffFormWrapper"
              onSubmit={(e) => createStaff(e)}
            >
              <div className="inputsWrapper">
                <div className="singleInput">
                  <p>
                    Staff Name <span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      className="input"
                      onChange={(e) => handleStaffData(e, "name")}
                      required
                      value={staff.name}
                    />
                  </div>
                </div>

                <div className="singleInput">
                  <p>
                    Email <span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <input
                      type="email"
                      required
                      className="input"
                      onChange={(e) => handleStaffData(e, "email")}
                      value={staff.email}
                    />
                  </div>
                </div>

                <div className="singleInput">
                  <p>
                    Phone Number <span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <input
                      type="string"
                      className="input"
                      required
                      onChange={(e) => handleStaffData(e, "phoneNumber")}
                      value={staff.phoneNumber}
                    />
                  </div>
                </div>

                <div className="singleInput rolesInput">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={roles}
                    key={loading}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, option) => handleStaffData(e, "role", option)}
                    sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Staff role/section"
                        required
                      />
                    )}
                  />
                </div>
              </div>
              <div className="bottomButtons">
                <button
                  className="cancelClientEditBtn"
                  onClick={handleClickOpen}
                  disabled={disableDoneAndCancelBtn}
                >
                  Cancel
                </button>
                <button
                  className="addStaffEditBtn"
                  type="submit"
                  disabled={disableDoneAndCancelBtn}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStaff;
