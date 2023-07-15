import { Autocomplete, Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";

import { RiAddLine } from "react-icons/ri";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./manageStaff.scss";
import { Link } from "react-router-dom";
import { publicRequest } from "../../functions/requestMethods";
import { useEffect } from "react";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import { useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageStaff = () => {
  const [pageSize, setPageSize] = useState(100);
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // TOAST ID
  const toastId = React.useRef(null);

  // TABLE COLUMNS
  const columns = [
    {
      field: "fullName",
      headerName: "Staff Name",
      width: 320,
      editable: true,
    },
    { field: "phoneNumber", headerName: "Phone Number", width: 250 },
    { field: "email", headerName: "Email", width: 300 },
  ];

  // SET LOADING AND ERROR FUNCTIONALITY
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // TO SET THE STATE OF THE UPDATE BUTTON
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(false);

  // STAFF ROLE
  const [staffRole, setStaffRole] = useState("");

  // SET LOADING AND ERROR FUNCTIONALITY FOR STAFF ROLE
  const [loadingStaffRole, setLoadingStaffRole] = useState(false);
  const [staffRoleErrorMessage, setStaffRoleErrorMessage] = useState(null);

  // SELECTED CANDIDATE AFTER ROW CLICK
  const [selectedStaff, setSelecedStaff] = useState({});

  // SELECTED CANDIDATE AFTER ROW CLICK
  const [updatedCandidateInfo, setUpdatedCandidateInfo] = useState({});

  // ALL LABORATORIES
  const [laboratories, setLaboratories] = useState([]);

  // SELECTED LABORATORY
  const [selectedLab, setSelectedLab] = useState("");

  // STAFF ROLES
  const [roles, setRoles] = useState([]);

  // INITIAL POSITION OF SLIDE
  const [position, setPosition] = useState("-100%");

  // FUNCTIONALITIES TO GET ALL STAFF

  const [staff, setStaff] = useState([]);
  const [searchedTableData, setSearchedTableData] = useState([]);

  const fetchStaff = async () => {
    try {
      setLoading(true);

      const res = await publicRequest.get("/Staff", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // const res = await privateRequest.get('Staff')
      console.log("seccessS");
      setStaff(res?.data?.data?.result);
      setSearchedTableData(res?.data?.data?.result);
      setLoading(false);
      console.log(res?.data?.data?.result);
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error);

      console.log(error);
    }
  };

  // FUNCTION TO GET SELECTED STAFF ROLE
  const getStaffRole = async () => {
    try {
      setLoadingStaffRole(true);
      setStaffRoleErrorMessage("");

      const res = await publicRequest.get(
        `/Staff/roles/${selectedStaff?.email}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStaffRole(res?.data?.data?.[0]);
      setLoadingStaffRole(false);
      console.log(res?.data?.data?.[0]);
    } catch (error) {
      setLoadingStaffRole(false);
      setStaffRoleErrorMessage(error);

      console.log(error);
    }
  };

  // END OF FUNCTION TO GET SELECTED STAFF ROLE

  // FUNCTION TO GET ALL ROLES
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
  // END OF FUNCTION TO GET ALL ROLES

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

  // FUNCTION TO HANDLE LAB SELECTION (SLIDE)
  const handleLabSelection = (e, option) => {
    setSelectedLab(option);
    console.log(option);
  };
  // END OF FUNCTION TO HANDLE LAB SELECTION (SLIDE)

  // SEARCH FUNCTIONALITY
  const handleSearchParamsChange = (e) => {
    let filteredsSaffArray;
    filteredsSaffArray = staff?.filter((tableDatum) =>
      tableDatum?.fullName
        ?.toLowerCase()
        .includes(e.target.value.trim().toLowerCase())
    );
    setSearchedTableData(filteredsSaffArray);
    // console.log(filteredPendingCandidatesArray)
  };
  // END OF SEARCH FUNCTIONALITY

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    setSelecedStaff(row?.row);
    setUpdatedCandidateInfo(row?.row);

    if (position !== "0") {
      setPosition("0");
    }
  };
  // END OF HANDLE ROW CLICK

  // HANDLE ROW CLICK
  const handleHideSlide = () => {
    setPosition("-100%");
  };
  // END OF HANDLE ROW CLICK

  // function for seting candidate info
  const handleUpdateCandidateInfo = (e, dataName, data) => {
    if (dataName === "role") {
      setUpdatedCandidateInfo((prev) => {
        return {
          ...prev,
          role: [data],
        };
      });
    } else {
      setUpdatedCandidateInfo((prev) => {
        return {
          ...prev,
          [dataName]: e.target.value,
        };
      });
    }
  };
  // end of function for seting candidate info

  // FUNCTION TO UPDATE STAFF
  const handleUpdateUser = async (event) => {
    event.preventDefault();

    const updatedStaff = {
      name: updatedCandidateInfo?.fullName,
      phoneNumber: updatedCandidateInfo?.phoneNumber,
      email: updatedCandidateInfo?.email,
      role: updatedCandidateInfo?.role?.[0]?.name || staffRole,
      laboratoryId: selectedLab?.id || selectedStaff?.laboratory?.id,
    };

    console.log(updatedStaff);

    toastId.current = toast("Please wait...", {
      autoClose: 2500,
      isLoading: true,
    });

    setDisableUpdateBtn(true);

    try {
      await publicRequest
        .put(`/Account/profile-application-user`, updatedStaff, {
          headers: {
            Accept: "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async () => {
          toast.update(toastId.current, {
            render: "Staff Updated succesfully!",
            type: "success",
            isLoading: false,
            autoClose: 2500,
          });
          setDisableUpdateBtn(false);
          handleHideSlide();
          await fetchStaff();
        });
    } catch (error) {
      console.log(error.response);
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
      setDisableUpdateBtn(false);
    }
  };
  // END OF FUNCTION TO UPDATE STAFF

  // useeffect to call the fetchStaff function
  useEffect(() => {
    fetchStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // end of useeffect to call the fetchSyaff function
  // END OF FUNCTIONALITIES TO GET ALL STAFF

  // MISCELLANEOUS USEEFFECTS
  // update errorMessage state
  useEffect(() => {}, [errorMessage]);
  // end of update errorMessage state
  // END OF MISCELLANEOUS USEEFFECTS

  // USE EFFECT TO UPDATE SELECTED STAFF
  useEffect(() => {
    getStaffRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStaff]);

  // useEffect to update error and loading state
  useEffect(() => {
    console.log(error, loading);
  }, [error, loading]);
  // end of useEffect to update error and loading state

  // USE EFFECT TO STAFF ROLES AND LABORATORIES AS PAGE LOADS
  useEffect(() => {
    getAllLaboratories();
    getRoles();
  }, []);
  // END OF USE EFFECT TO STAFF ROLES AND LABORATORIES AS PAGE LOADS

  return (
    <>
      <ToastContainer />
      <div className="manageStaffWrapper">
        <Sidebar />
        <div className="manageStaffRight">
          <Topber />
          {loading || error ? (
            loading ? (
              <Loading />
            ) : (
              <Error errorMessage={errorMessage && errorMessage} />
            )
          ) : (
            <div className="manageStaffMainWrapper">
              <div className="manageStaffMainTop">
                <h3>All Staff</h3>
                <TextField
                  id="outlined-search"
                  label="Search"
                  type="search"
                  className="candidateSearchName"
                  onChange={(e) => handleSearchParamsChange(e)}
                  size="small"
                />
                <Link to={"/manageStaff/addStaff"}>
                  <button className="addStaffBtn">
                    Add Staff
                    <span>
                      <RiAddLine className="addIcon" />
                    </span>
                  </button>
                </Link>
              </div>
              <form
                className="manageStaffSlide"
                style={{ right: position }}
                onSubmit={handleUpdateUser}
              >
                <div className="manageStaffSlideTop">
                  <div className="cancelconWrapper" onClick={handleHideSlide}>
                    <MdCancel className="cancelIcon" />
                  </div>
                  <div className="initials">
                    {selectedStaff?.fullName &&
                      selectedStaff?.fullName[0]?.toUpperCase()}
                  </div>
                  <div className="slideFullname">
                    {selectedStaff?.fullName?.toUpperCase()}
                  </div>
                </div>
                <div className="staffBasicDetailsWrapper">
                  <div className="staffDetails">
                    <h3>Staff Laboratory</h3>
                    <p>{selectedStaff?.laboratory?.laboratoryName}</p>
                  </div>
                  <div className="staffDetails">
                    <h3>Staff Email</h3>
                    <p>{selectedStaff?.email}</p>
                  </div>
                  <div className="staffDetails">
                    <h3>Staff Section/Role</h3>
                    {loadingStaffRole || staffRoleErrorMessage ? (
                      loadingStaffRole ? (
                        "Loading..."
                      ) : (
                        staffRoleErrorMessage?.response?.data?.description ||
                        staffRoleErrorMessage?.response?.data?.title ||
                        staffRoleErrorMessage?.message
                      )
                    ) : (
                      <p>{staffRole}</p>
                    )}
                  </div>
                  <div className="staffDetails">
                    <h3>Staff Phone no</h3>

                    <p>{selectedStaff?.phoneNumber}</p>
                  </div>
                </div>
                <div className="staffDetailsWrapper">
                  <div className="updateStaffInputWrapper">
                    <label htmlFor="email">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="updateStaffInput"
                      value={updatedCandidateInfo?.fullName}
                      onChange={(e) => handleUpdateCandidateInfo(e, "fullName")}
                    />
                  </div>
                  <div className="updateStaffInputWrapper">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      className="updateStaffInput"
                      value={updatedCandidateInfo?.email}
                      onChange={(e) => handleUpdateCandidateInfo(e, "email")}
                    />
                  </div>
                  <div className="updateStaffInputWrapper">
                    <label htmlFor="email">Phone Number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      className="updateStaffInput"
                      value={updatedCandidateInfo?.phoneNumber}
                      onChange={(e) =>
                        handleUpdateCandidateInfo(e, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="updateStaffInputWrapper">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={laboratories}
                      key={loadingStaffRole}
                      InputLabelProps={{ shrink: true }}
                      getOptionLabel={(option) => `${option?.laboratoryName}`}
                      onChange={(e, option) => handleLabSelection(e, option)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Assigned laboratory"
                          InputLabelProps={{ shrink: true }}
                          placeholder={
                            selectedStaff?.laboratory?.laboratoryName
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="updateStaffInputWrapper">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={roles}
                      key={loadingStaffRole}
                      getOptionLabel={(option) => option.name}
                      onChange={(e, option) =>
                        handleUpdateCandidateInfo(e, "role", option)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Staff role/section"
                          InputLabelProps={{ shrink: true }}
                          placeholder={staffRole}
                        />
                      )}
                    />
                  </div>
                </div>
                <button className="updateStaffBtn" disabled={disableUpdateBtn}>
                  Update
                </button>
              </form>
              <div className="manageStaffMainBottom">
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={searchedTableData}
                    columns={columns}
                    pageSize={pageSize}
                    experimentalFeatures={{ newEditingApi: true }}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[100, 150, 200]}
                    pagination
                    onRowClick={(row, e) => handleRowClick(row, e)}
                    getRowId={(row) => row.userId}
                  />
                </Box>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageStaff;
