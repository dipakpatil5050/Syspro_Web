import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useLogin } from "../../contexts/LoginContext";
import toast from "react-hot-toast";
const ClientData = [
  {
    ServerID: 4,
    Company_ID: 0,
    Company_Name: "SYSRPO",
    ServerBaseUrl: "http://103.67.238.230:1385/Textile/",
    mPin: "SYSPRO04",
    isActive: 1,
    SlugUrl: " ",
    Expairy_Dt: "2024-03-31T00:00:00",
  },
  {
    ServerID: 47,
    Company_ID: 0,
    Company_Name: "VEER",
    ServerBaseUrl: "http://103.67.238.230:1385/VEERAPP/",
    mPin: "VEERAPP",
    isActive: 1,
    SlugUrl: "VEERAPP",
    Expairy_Dt: "2024-03-31T00:00:00",
  },
  {
    ServerID: 32,
    Company_ID: 0,
    Company_Name: "WSALE",
    ServerBaseUrl: "http://103.67.238.230:1385/WSaleApp/",
    mPin: "WSALEAPP",
    isActive: 1,
    SlugUrl: "WSaleApp",
    Expairy_Dt: "2024-03-31T00:00:00",
  },
];

function ClientAuth() {
  const [mpin, setMpin] = useState("");
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const { login } = useLogin();

  const api = "https://jsonplaceholder.typicode.com/users";

  const handleSubmit = (e) => {
    try {
      // const response = await axios.post(
      //   api,
      //   { mpin },
      //   {
      //     headers: {
      //       /* Your headers */
      //     },
      //   }
      // );
      e.preventDefault();

      const user = ClientData.find((u) => u.mPin === mpin);

      if (user) {
        // setUserData(user);
        // setUsername(user.Company_Name);
        // login(username);
        // localStorage.setItem("userData", JSON.stringify(user));

        // alert("Welcome", user.Company_Name);
        navigate("/login");
        toast.success("Mpin Verified !");
      } else {
        alert("Invalid MPIN");
        setMpin("");
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const handleMpinChange = (e) => {
    setMpin(e.target.value);
  };
  return (
    <>
      <section>
        <div className="flex sitems-center justify-center mt-52 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              M-Pin
            </h2>

            <form
              // action="#"
              method="POST"
              className="mt-8 flex items-center justify-center"
            >
              <div className="space-y-5">
                <div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      value={mpin}
                      onChange={handleMpinChange}
                      placeholder="Enter your M-pin here..."
                    ></input>
                  </div>
                </div>
                <div></div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80
                    "
                    onClick={handleSubmit}
                  >
                    Submit <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientAuth;
