import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./pendingCandidates.scss";
import PendingCandidatesDatagrid from "../../components/pendingCandidatesDatagrid/PendingCandidatesDatagrid";
import { useSelector } from "react-redux";
import ErrorComponent from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
import { publicRequest } from "../../functions/requestMethods";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PendingCandidates = () => {
  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user);
  const loggedInUserRole = currentUser?.data?.role?.[0];
  const userName = currentUser?.data?.profile?.fullName;
  const [reloadTable, setReloadTable] = useState(false);

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // TABLE DATA
  const [tableData, setTableData] = useState([]);
  const [searchedTableData, setSearchedTableData] = useState([]);

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // END OF LOADING AND ERROR DATA

  // FUNCTION TO GET AND SET PENDING CANDIDATES
  const getPendingCandidates = async () => {
    loggedInUserRole === "Quality assurance"
      ? "/Result/pending"
      : "/Candidate/stage";
    try {
      setLoading(true);
      const res = await publicRequest.get(
        loggedInUserRole === "Quality assurance"
          ? "/Result/pending"
          : "/Candidate/stage",
        {
          headers: {
            Accept: "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        console.log(res.data);
        setTableData(res.data?.data === "" ? [] : res.data?.data);
        setSearchedTableData(res.data?.data === "" ? [] : res.data?.data);
        setLoading(false);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error);

      console.log(error);
    }
  };
  // END OF FUNCTION TO GET AND SET PENDING CANDIDATES

  // SEARCH FUNCTIONALITY
  const handleSearchParamsChange = (e) => {
    let filteredPendingCandidatesArray;
    console.log(tableData);
    filteredPendingCandidatesArray = tableData.filter((tableDatum) =>
      tableDatum?.candidateName
        ?.toLowerCase()
        .includes(e.target.value.trim().toLowerCase())
    );
    setSearchedTableData(filteredPendingCandidatesArray);
    // console.log(filteredPendingCandidatesArray)
  };
  // END OF SEARCH FUNCTIONALITY

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getPendingCandidates();
  }, []);

  // USEEFFECT TO UPDATE TABLE AFTER AUTHORIZING A CANDIATE

  useEffect(() => {
    getPendingCandidates();
  }, [reloadTable]);

  // USEEFFECT TO UPDATE TABLE AFTER AUTHORIZING A CANDIATE
  useEffect(() => {
    console.log(reloadTable);
  }, [reloadTable]);

  // USEEFFECT TO RELOAD THE TABLE DATA AS SEARCH INPUT CHANGES
  useEffect(() => {}, [searchedTableData]);

  // USEEFFECT TO RELOAD THE TABLE DATA AS WHEN THE GET PENDIDNG CANDIDATES ENDPOINT IS CALLED
  useEffect(() => {}, [tableData]);

  return (
    <>
      <ToastContainer />
      <div className="pendingCandidatesWrapper">
        <Sidebar loggedInUserRole={loggedInUserRole} />
        <div className="pendingCandidatesRight">
          <Topber userName={userName} />
          <div className="pendingCandidatesMainWrapper">
            <div className="pendingCandidatesMainTop">
              <h3 className="pendingCandidatesMainTopTitle">Search</h3>
              <div className="pendingCandidatesMainTopForm">
                <TextField
                  id="outlined-search"
                  label="Candidate name"
                  type="search"
                  className="candidateName"
                  onChange={(e) => handleSearchParamsChange(e)}
                  size="small"
                />

                {/* <div className='pendingCandidatesBtn'>Search</div> */}
              </div>
            </div>
            <div className="pendingCandidatesMainBottom">
              {loading || error ? (
                loading ? (
                  <Loading />
                ) : (
                  <ErrorComponent errorMessage={errorMessage && errorMessage} />
                )
              ) : (
                <PendingCandidatesDatagrid
                  userDetails={currentUser}
                  tableData={searchedTableData}
                  setReloadTable={setReloadTable}
                  getPendingCandidates={getPendingCandidates}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingCandidates;
