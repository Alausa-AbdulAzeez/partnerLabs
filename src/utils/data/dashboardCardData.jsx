import { React } from "react";
import { MdPendingActions } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";

export const adminDashboardData = [
  {
    title: "Candidate Search",
    isMoney: false,
    isCandidateSearch: true,
    link: "candidateSearch",
    linkText: "View Candidates",
    backgroundColor: "#ece8ff7b",
    icon: (
      <AiOutlineSearch
        className="icon"
        style={{ color: "#7451f8", backgroundColor: "#e1dbfd" }}
      />
    ),
  },

  {
    title: "Manage Staff",
    isMoney: false,
    isViewClients: true,
    link: "manageStaff",
    linkText: "View all staff",
    backgroundColor: "#FF8C3938",

    icon: (
      <RiTeamFill
        className="icon"
        style={{ color: "#FF8C39", backgroundColor: "#ff8c394f" }}
      />
    ),
  },
  {
    title: "Profile",
    isMoney: true,
    isProfile: true,
    link: "/profile",
    linkText: "View profile",
    backgroundColor: "#3971ff24",
    name: "Esther",

    icon: (
      <BsFillPersonFill
        className="icon"
        style={{ color: "#3970FF", backgroundColor: "#3970FF36" }}
      />
    ),
  },
];
export const receptionistDashboardData = [
  {
    title: "Candidate Search",
    isMoney: false,
    isCandidateSearch: true,
    link: "candidateSearch",
    linkText: "View Candidates",
    backgroundColor: "#ece8ff7b",
    icon: (
      <AiOutlineSearch
        className="icon"
        style={{ color: "#7451f8", backgroundColor: "#e1dbfd" }}
      />
    ),
  },
  {
    title: "Pending Candidates",
    isPendingCandidates: true,
    isMoney: false,
    link: "pendingCandidates",
    linkText: "View pending candidates",
    backgroundColor: "#33a23e24",

    icon: (
      <MdPendingActions
        className="icon"
        style={{ color: "#33A23E", backgroundColor: "#33A23E36" }}
      />
    ),
  },
  // {
  //   title: "View Clients",
  //   isMoney: false,
  //   isViewClients: true,
  //   link: "viewClients",
  //   linkText: "View all clients",
  //   backgroundColor: "#FF8C3938",

  //   icon: (
  //     <RiTeamFill
  //       className="icon"
  //       style={{ color: "#FF8C39", backgroundColor: "#ff8c394f" }}
  //     />
  //   ),
  // },
  {
    title: "Profile",
    isMoney: true,
    isProfile: true,
    link: "/profile",
    linkText: "View profile",
    backgroundColor: "#3971ff24",
    name: "Esther",

    icon: (
      <BsFillPersonFill
        className="icon"
        style={{ color: "#3970FF", backgroundColor: "#3970FF36" }}
      />
    ),
  },
];
export const phlebotomistDashboardData = [
  {
    title: "Candidate Search",
    isMoney: false,
    isCandidateSearch: true,
    link: "candidateSearch",
    linkText: "View Candidates",
    backgroundColor: "#ece8ff7b",
    icon: (
      <AiOutlineSearch
        className="icon"
        style={{ color: "#7451f8", backgroundColor: "#e1dbfd" }}
      />
    ),
  },
  {
    title: "Pending Candidates",
    isMoney: false,
    isPendingCandidates: true,
    link: "pendingCandidates",
    linkText: "View pending candidates",
    backgroundColor: "#33a23e24",

    icon: (
      <MdPendingActions
        className="icon"
        style={{ color: "#33A23E", backgroundColor: "#33A23E36" }}
      />
    ),
  },
  // {
  //   title: "View Clients",
  //   isMoney: false,
  //   isViewClients: true,
  //   link: "viewClients",
  //   linkText: "View all clients",
  //   backgroundColor: "#FF8C3938",

  //   icon: (
  //     <RiTeamFill
  //       className="icon"
  //       style={{ color: "#FF8C39", backgroundColor: "#ff8c394f" }}
  //     />
  //   ),
  // },
  {
    title: "Profile",
    isMoney: true,
    link: "/profile",
    isProfile: true,
    linkText: "View profile",
    backgroundColor: "#3971ff24",
    name: "Olamide",

    icon: (
      <BsFillPersonFill
        className="icon"
        style={{ color: "#3970FF", backgroundColor: "#3970FF36" }}
      />
    ),
  },
];
export const labScientistDashboardData = [
  {
    title: "Candidate Search",

    isMoney: false,
    link: "candidateSearch",
    linkText: "View Candidates",
    isCandidateSearch: true,
    backgroundColor: "#ece8ff7b",
    icon: (
      <AiOutlineSearch
        className="icon"
        style={{ color: "#7451f8", backgroundColor: "#e1dbfd" }}
      />
    ),
  },
  {
    title: "Pending Candidates",
    isMoney: false,
    isPendingCandidates: true,
    link: "pendingCandidates",
    linkText: "View pending candidates",
    backgroundColor: "#33a23e24",

    icon: (
      <MdPendingActions
        className="icon"
        style={{ color: "#33A23E", backgroundColor: "#33A23E36" }}
      />
    ),
  },

  {
    title: "Profile",
    isMoney: true,
    isProfile: true,
    link: "/profile",
    linkText: "View profile",
    backgroundColor: "#3971ff24",
    name: "Ada",

    icon: (
      <BsFillPersonFill
        className="icon"
        style={{ color: "#3970FF", backgroundColor: "#3970FF36" }}
      />
    ),
  },
];
export const qualityAssuranceDashboardData = [
  {
    title: "Candidate Search",
    isMoney: false,
    link: "candidateSearch",
    isCandidateSearch: true,
    linkText: "View Candidates",
    backgroundColor: "#ece8ff7b",
    icon: (
      <AiOutlineSearch
        className="icon"
        style={{ color: "#7451f8", backgroundColor: "#e1dbfd" }}
      />
    ),
  },
  {
    title: "Pending Candidates",
    isMoney: false,
    link: "pendingCandidates",
    isPendingCandidates: true,
    linkText: "View pending candidates",
    backgroundColor: "#33a23e24",

    icon: (
      <MdPendingActions
        className="icon"
        style={{ color: "#33A23E", backgroundColor: "#33A23E36" }}
      />
    ),
  },
  // {
  //   title: "View Clients",
  //   isMoney: false,
  //   link: "viewClients",
  //   isViewClients: true,
  //   linkText: "View all clients",
  //   backgroundColor: "#FF8C3938",

  //   icon: (
  //     <RiTeamFill
  //       className="icon"
  //       style={{ color: "#FF8C39", backgroundColor: "#ff8c394f" }}
  //     />
  //   ),
  // },
  {
    title: "Profile",
    isMoney: true,
    link: "/profile",
    isProfile: true,
    linkText: "View profile",
    backgroundColor: "#3971ff24",
    name: "Bankole",

    icon: (
      <BsFillPersonFill
        className="icon"
        style={{ color: "#3970FF", backgroundColor: "#3970FF36" }}
      />
    ),
  },
];
export const reportOfficerDashboardData = [
  {
    title: "Pending Candidates",
    isMoney: false,
    isPendingCandidates: true,
    link: "pendingCandidates",
    linkText: "View pending candidates",
    backgroundColor: "#33a23e24",

    icon: (
      <MdPendingActions
        className="icon"
        style={{ color: "#33A23E", backgroundColor: "#33A23E36" }}
      />
    ),
  },
  // {
  //   title: "View Clients",
  //   isMoney: false,
  //   link: "viewClients",

  //   linkText: "View all clients",
  //   backgroundColor: "#FF8C3938",

  //   icon: (
  //     <RiTeamFill
  //       className="icon"
  //       style={{ color: "#FF8C39", backgroundColor: "#ff8c394f" }}
  //     />
  //   ),
  // },
  {
    title: "Profile",
    isMoney: true,
    link: "/profile",
    isProfile: true,
    linkText: "View profile",
    backgroundColor: "#3971ff24",
    name: "Bankole",

    icon: (
      <BsFillPersonFill
        className="icon"
        style={{ color: "#3970FF", backgroundColor: "#3970FF36" }}
      />
    ),
  },
];
