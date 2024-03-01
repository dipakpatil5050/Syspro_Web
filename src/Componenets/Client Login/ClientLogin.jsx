import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setUserData, setuserMpinData } from "../../redux/reducers/authReducer";
import Cookies from "js-cookie";
import { ArrowRight } from "lucide-react";

function ClientLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // const user = localStorage.getItem("user");

  const dispatch = useDispatch();
  const userMpinData = useSelector((state) => state.auth.userMpinData);

  const ClientType = userMpinData?.Data?.SlugUrl;
  const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
  const mPin = userMpinData?.Data?.mPin;
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      navigate("/Home");
    }
  }, [userData, navigate]);

  const fetchLoginData = async () => {
    const loginUrl = `${ServerBaseUrl}api/Static/UserLogin`;

    const body = {
      UserName: username,
      Password: password,
      IsRemeber: true,
      DeviceId: "",
    };

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": mPin,
    };

    try {
      const response = await axios.post(loginUrl, body, { headers });
      const userData = response.data.Data;
      const Token = userData.Token;
      // const CompanyName = userData.CompanyName;

      Cookies.set("token", Token, { expires: 7 });
      dispatch(setUserData(userData));
      navigate("/Home");
      // toast.success("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "Login failed. Please check your login credentials and try again."
      );
    }
  };

  // if (user === CompanyName) {
  //   return <Navigate to={"/home"} replace />;
  // }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await fetchLoginData();
      navigate("/Home");
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "Login failed. Please check your login credentials and try again."
      );
    }
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-12">
          <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24 max-[390px]:hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full rounded-md object-cover object-top"
                src="https://img.freepik.com/free-vector/hand-drawn-erp-illustration_23-2149388659.jpg?w=740&t=st=1709288849~exp=1709289449~hmac=be1ec5b28928bd525996e30f6e7d2dc7a0786d0888949a10b7825c17c9c9c62e"
                alt=""
              />
            </div>
          </div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto w-auto"
                src="https://sysproerp.in/includes/site/assets/images/logo-footer.png"
                alt="Your Company"
              />
              <h3 className="flex items-center justify-center text-xl font-bold">
                {/* {ClientType} */}
              </h3>
              {/* <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2> */}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="block w-full rounded-3xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 rounded-3xl"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-3xl bg-[#004787] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-[#004787]/80 "
                  >
                    Sign in
                  </button>
                </div>
              </form>
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
        </div>
      </section>
    </>
  );
}

export default ClientLogin;
