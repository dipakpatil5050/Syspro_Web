import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";
const ClientData = [
  {
    UserID: 1,
    DeviceId: "",
    User_Type: "System",
    Access_Type: "Company",
    Access_Key: "",
    IsSuperAdminLog: false,
    IsAdminLog: false,
    CompanyID: 3,
    CompanyName: "AADINATH AGENCY",
    CompanyGSTCST: "24BEHPS7230G1ZH",
    CompanyContactNo: "97277-63126",
    CompanyAddress1: "119,UMA INDUSTRAIAL SOCITEY, B/H -SNS HOUSE,",
    CompanyAddress2: "NR.CNG PUMP,BHATAR CHAR RASTA,SURAT-395017,",
    YearMasterID: 11,
    YearMasterName: "2023-04-01 - 2024-03-31",
    PremiseID: 1,
    PremiseName: "SURAT",
    DepartmentID: 1,
    DepartmentName: "SURAT",
    Session_Token: "LU4jPKe/xhhLEyeOEK99wWH3iFg= ()",
    Address: "Address",
    Token: "33874f9c-1ad4-4c76-a2ba-29aba1a30c34",
    Name: null,
    EmailID: "admin",
    UserName: "admin",
    CompanyFromDate: null,
    CompanyToDate: null,
    LastAccessTime: "2021-12-14T10:55:59.1092473+05:30",
    FCMToken: null,
    MenuId: 0,
    SubMenuId: 0,
    IsAdd: false,
    IsEdit: false,
    IsDelete: false,
    IsFind: false,
    ApiToken: null,
  },
];

function ClientLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [isAuthenticate, setIsAuthenticate] = useState(false);
  const navigate = useNavigate();

  const userMpinData = useSelector((state) => state.auth.userMpinData);
  const FetchLoginData = async () => {
    // const Login_API =
  };

  const handleLogin = () => {
    const user = ClientData.find(
      (u) => u.UserName === username && u.password === password
    );
    if (user) {
      setIsLoggedIn(true);
      navigate("/Home");
      toast.success("Login successful!");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center mt-11 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-44 w-auto"
            src="https://sysproerp.in/includes/site/assets/images/logo-footer.png"
            alt="Your Company"
          />
          <h3 className="flex items-center justify-center text-xl font-bold">
            {/* Welcome */}
          </h3>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-sm mt-5">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Contact Admin
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default ClientLogin;
