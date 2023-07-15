import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

import Topber from "../../components/topbar/Topber";
import "./candidateSearch.scss";
import CandidateSearchDatagrid from "../../components/candidateSearchDatagrid/CandidateSearchDatagrid";
import { useSelector } from "react-redux";
import { publicRequest } from "../../functions/requestMethods";
import { ToastContainer, toast } from "react-toastify";
import ErrorComponent from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
import DatePicker from "react-datepicker";
import { RxReload } from "react-icons/rx";

const CandidateSearch = () => {
  // MISCELLANEOUS
  const toastId = React.useRef(null);

  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user);
  const loggedInUserRole = currentUser?.data?.role;
  const userName = currentUser?.data?.profile?.fullName;

  // LAB ID
  const labId = currentUser?.data?.profile?.laboratory?.id;

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // END OF LOADING AND ERROR DATA

  // TABLE DATA
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // CLIENTS DATA
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState(null);

  // CANDIDATE'S PHONE NUMBER
  const [phoneNumber, setPhoneNumber] = useState("");

  // DATE SELECTION
  const [startDate, setStartDate] = useState(null);

  // FILTER PARAMS
  const [filters, setFilters] = useState({
    clientId: "",
    phoneNumberOrName: "",
    date: "",
  });

  // FUNCTION TO GET AND SET ALL CANDIDATES
  const getAllCandidates = async () => {
    setStartDate(null);
    setFilters({ clientId: "", phoneNumberOrName: "", date: "" });

    try {
      setLoading(true);
      const res = await publicRequest.get("/Candidate", {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        const specificLabCandidates = res.data?.data?.filter((candidate) => {
          return candidate?.laboratoryId === labId;
        });
        setTableData(
          specificLabCandidates?.length > 0
            ? specificLabCandidates.reverse()
            : specificLabCandidates
        );
        setFilteredData(
          specificLabCandidates?.length > 0
            ? specificLabCandidates.reverse()
            : specificLabCandidates
        );
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
  // END OF FUNCTION TO GET AND SET ALL CANDIDATES
  //  FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS

  const getAllClients = async () => {
    try {
      const res = await publicRequest.get("Client/Client-list", {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data) {
        setClients(res.data.data);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS

  // FUNCTION FOR SETTING CLIENT ID
  const handlescheduleCandidateInfo = (e, dataName, data) => {
    setClientId(data?.clientId);
  };
  //END OF FUNCTION FOR SETTING CLIENT ID

  // FUNCTION TO HANDLE INPUT CHANGES
  const handleInputChange = (event, name, data) => {
    if (name === "phoneNumberOrName") {
      setFilters({ ...filters, [name]: event?.target?.value?.trim() });
    }
    if (name === "date") {
      setStartDate(data);
      setFilters({ ...filters, [name]: data });
    }
    if (name === "clientId") {
      setFilters({ ...filters, [name]: data?.clientId });
    }
    // setFilters({ ...filters, [name]: value.trim() });
  };
  // END OF FUNCTION TO HANDLE INPUT CHANGES

  // FUNCTION TO FILTER DATA
  const filterData = () => {
    console.log(tableData);
    const filteredData = tableData.filter((item) => {
      const { clientId, phoneNumberOrName, date } = filters;
      console.log(clientId, phoneNumberOrName, date);

      const correctDate = new Date(date);

      console.log(correctDate.toLocaleString());
      const month = (date && date?.getMonth() + 1).toString().padStart(2, "0");

      const year = date && date?.getFullYear();

      const newString = year && month ? year + "-" + month : "";
      console.log(newString);

      // const newString =
      //   correctDate.toLocaleString().split(",")[0].split("/")[2] +
      //   "-" +
      //   "0" +
      //   correctDate.toLocaleString().split(",")[0].split("/")[0];

      const itemCompanyId = item?.clientid?.toString().includes(clientId);
      const itemPhoneNumber = item?.phoneNumber
        ?.toString()
        .includes(phoneNumberOrName);
      const itemName = item?.candidateName
        ?.toLowerCase()
        .includes(phoneNumberOrName.toLowerCase());
      const itemDate = item?.createdDate?.substring(0, 7).includes(newString);
      console.log(itemDate);
      return (
        (clientId === "" || itemCompanyId) &&
        (phoneNumberOrName === "" || itemPhoneNumber || itemName) &&
        (date === "" || itemDate)
      );
    });
    console.log(filteredData);
    setFilteredData(filteredData);
  };
  // END OF FUNCTION TO FILTER DATA

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getAllCandidates();
  }, []);

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients();
  }, []);
  // end of use effect to call the getAllClients function as the page loads

  // FUNCTION TO HANDLE PHONE NUMBER CHANGE
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target?.value);
  };
  // END OF FUNCTION TO HANDLE PHONE NUMBER CHANGE

  // FUNCTION TO HANDLE CANDIDATE SEARCH
  // const handleCandidateSearch = async () => {
  //   toastId.current = toast("Please wait...", {
  //     autoClose: 3000,
  //     isLoading: true,
  //   });
  //   try {
  //     const res = await publicRequest.get(
  //       `Candidate/SearchByPhoneNumber?Clientid=${clientId}&phone=${phoneNumber?.trim()}`,
  //       {
  //         headers: {
  //           Accept: "*",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (res?.data?.data?.length === 0) {
  //       throw new Error("Candidate not found");
  //     } else {
  //       toast.update(toastId.current, {
  //         render: "Candidate found!",
  //         type: "success",
  //         isLoading: false,
  //         autoClose: 3000,
  //       });
  //       setTableData(res?.data?.data);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.update(toastId.current, {
  //       type: "error",
  //       autoClose: 3000,
  //       isLoading: false,
  //       render: `${
  //         error?.response?.data?.title ||
  //         error?.response?.data?.description ||
  //         error?.message ||
  //         "Something went wrong, please try again"
  //       }`,
  //     });
  //   }
  // };
  // END FUNCTION TO HANDLE CANDIDATE SEARCH

  return (
    <>
      <ToastContainer />
      <div className="candidateSearchWrapper">
        <Sidebar loggedInUserRole={loggedInUserRole} />
        <div className="candidateSearchRight">
          <Topber userName={userName} />
          <div className="candidateSearchMainWrapper">
            {/* <div className='candidateSearchMainTop'>
              <h3 className='candidateSearchMainTopTitle'>Search</h3>
              <div className='candidateSearchMainTopForm'>
                
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={clients}
                  getOptionLabel={(option) =>
                    `${option.clientName} ${option.email}`
                  }
                  onChange={(e, option) =>
                    handlescheduleCandidateInfo(e, 'clientid', option)
                  }
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label='Client Name' />
                  )}
                />
                <TextField
                  id='outlined-search'
                  label="Candidate's PhoneNo"
                  type='search'
                  className='candidateName'
                  onChange={(e) => handlePhoneNumberChange(e)}
                />

                <div
                  className='candidateSearchBtn'
                  onClick={handleCandidateSearch}
                >
                  Search
                </div>
                <button className='reloadBtn' onClick={getAllCandidates}>
                  Show All
                  <span>
                    <RxReload className='reloadIcon' />
                  </span>
                </button>
              </div>
            </div> */}
            <div className="filterContainer">
              <Autocomplete
                // disablePortal
                options={clients}
                getOptionLabel={(option) =>
                  `${option.clientName} ${option.email}`
                }
                onChange={(e, option) =>
                  handleInputChange(e, "clientId", option)
                }
                key={loading}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Client Name" size="small" />
                )}
              />
              <TextField
                id="outlined-search"
                label="Candidate's Name/PhoneNo"
                type="search"
                className="candidateSearchName"
                onChange={(e) => handleInputChange(e, "phoneNumberOrName")}
                size="small"
                value={filters?.phoneNumberOrName}
              />
              <div className="filterDateWrapper">
                <DatePicker
                  placeholderText="Select a date"
                  onChange={(date, e) => handleInputChange(e, "date", date)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  className="filterDate"
                  selected={startDate}
                />
              </div>
              <button className="searchFilterBtn" onClick={filterData}>
                Search
              </button>
              <button
                className="resetBtn"
                onClick={getAllCandidates}
                // onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
            <div className="candidateSearchMainBottom">
              {/* <Loading /> */}
              {loading || error ? (
                loading ? (
                  <Loading />
                ) : (
                  <ErrorComponent errorMessage={errorMessage && errorMessage} />
                )
              ) : (
                <CandidateSearchDatagrid
                  userDetails={currentUser}
                  tableData={filteredData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateSearch;
