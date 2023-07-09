import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/dashboardCard/DashboardCard";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import ErrorComponent from "../../components/error/Error";
import "./home.scss";
import {
  labScientistDashboardData,
  phlebotomistDashboardData,
  qualityAssuranceDashboardData,
  receptionistDashboardData,
  reportOfficerDashboardData,
} from "../../utils/data/dashboardCardData";
import Homedatagrid from "../../components/homeDatagrid/Homedatagrid";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import { publicRequest } from "../../functions/requestMethods";

const Home = () => {
  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user);
  const loggedInUserRole = currentUser?.data?.role;
  const userName = currentUser?.data?.profile?.fullName;

  // TABLE DATA
  const [tableData, setTableData] = useState([]);

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // END OF LOADING AND ERROR DATA

  let data;
  // HANDLE CARD INFO
  switch (loggedInUserRole && loggedInUserRole) {
    case "Reception":
      data = receptionistDashboardData;

      break;
    case "Phlebotomy":
      data = phlebotomistDashboardData;

      break;
    case "MainLab1":
      data = labScientistDashboardData;

      break;
    case "Quality assurance":
      data = qualityAssuranceDashboardData;
      break;
    case "Report":
      data = reportOfficerDashboardData;

      break;

    default:
      break;
  }

  // FUNCTION TO GET AND SET ALL CANDIDATES
  const getAllCandidates = async () => {
    console.log("getting all");
    console.log("getting all");
    try {
      setLoading(true);
      const res = await publicRequest.get("/Candidate", {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);

      if (res.data) {
        setTableData(res.data?.data?.reverse());
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

  // UPDATES LOGGEDINUSER ROLE
  useEffect(() => {
    console.log(loggedInUserRole);
  }, [loggedInUserRole]);

  // USE EFFECT TO FETCH CANDIDATES AS PAGE LOADS
  useEffect(() => {
    getAllCandidates();
  }, []);
  // END OF USE EFFECT TO FETCH CANDIDATES AS PAGE LOADS

  return (
    <div className="homeWrapper">
      <Sidebar loggedInUserRole={loggedInUserRole} />
      <div className="homepageRight">
        <Topber userName={userName} />
        <div className="homeMainWrapper">
          <div className="homeMainTop">
            {data?.map((singleItem, index) => {
              return (
                <DashboardCard
                  type="manageClients"
                  data={singleItem}
                  key={index}
                  userName={userName}
                />
              );
            })}
          </div>
          {loading || error ? (
            loading ? (
              <Loading />
            ) : (
              <ErrorComponent errorMessage={errorMessage && errorMessage} />
            )
          ) : (
            <div className="homeMainBottom">
              <Homedatagrid tableData={tableData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
