import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "./mpin.css";
import { useDispatch } from "react-redux";
import { setuserMpinData } from "../../redux/reducers/authReducer";

function ClientAuth() {
  // const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);
  const [mPin, setMPin] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { login } = useLogin();

  const handleInputChange = (e) => {
    setMPin(e.target.value);
  };

  const fetchData = async () => {
    const mpinapi = `http://103.67.238.230:1385/SysMpin/authenticateSysmpin?mPin=${mPin}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer your_token_here",
      "x-api-key": mPin,
    };

    try {
      const response = await axios.post(mpinapi, { mPin }, { headers });
      setData(response.data);
      console.log(response);
      dispatch(setuserMpinData(response.data));

      const apidata = response.data?.Data;
      const apiMpin = apidata?.mPin;
      const Client_name = apidata?.SlugUrl;
      const Login_API = apidata?.ServerBaseUrl;

      if (apiMpin === mPin) {
        navigate("/login");
        toast.success("Mpin Verified !");
        toast(`Welcome ${Client_name}`, {
          icon: "👏",
        });
        console.log(Login_API);
        console.log(Client_name);
      } else {
        alert("Invalid MPIN");
        setMPin("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await fetchData();
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <>
      <section>
        <div className=" flex sitems-center justify-center mt-52 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="mpintxt text-center text-3xl leading-tight text-black">
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
                      type="text"
                      value={mPin}
                      onChange={handleInputChange}
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
                    Submit
                    {/* <ArrowRight className="ml-2" size={16} /> */}
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
