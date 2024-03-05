import React, { Fragment, useState, useContext } from "react";
// import { BsFillCloudSunFill } from "react-icons/bs";
// import { FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
// import { FiUser } from "react-icons/fi";
import { Dialog, Transition, Menu, Disclosure } from "@headlessui/react";
// import { RxCross2 } from "react-icons/rx";
// import { BsCart3 } from "react-icons/bs";
// import { FaBars } from "react-icons/fa6";
// import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaPowerOff } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/reducers/authReducer";
import { setuserMpinData } from "../../redux/reducers/authReducer";
import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
} from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Navbar() {
  const [open, setOpen] = useState(false);

  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const CompanyName = userData?.Data?.CompanyName;
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(setUserData(null));
    dispatch(setuserMpinData(null));
    navigate("/");
  };

  return (
    <div className=" sticky top-0 z-50 ">
      {/* Mobile View  */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white bg-opacity-90" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex ">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto  pb-12 shadow-lg">
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    {/* <RxCross2 /> */}
                  </button>
                </div>
                <div className="space-y-3 border-t flex flex-col border-gray-200 px-4 py-6">
                  <div className="mt-6 flex flex-1 flex-col justify-between">
                    <nav className="-mx-3 space-y-6 ">
                      <div className="space-y-3 ">
                        <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                          analytics
                        </label>
                        <a
                          className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                          href="#"
                        >
                          <BarChart className="h-5 w-5" aria-hidden="true" />
                          <span className="mx-2 text-sm font-medium">
                            Dashboard
                          </span>
                        </a>
                        <a
                          className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                          href="#"
                        >
                          <Wallet className="h-5 w-5" aria-hidden="true" />
                          <span className="mx-2 text-sm font-medium">
                            Configuration
                          </span>
                        </a>
                      </div>
                      <div className="space-y-3 ">
                        <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                          content
                        </label>
                        <a
                          className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                          href="#"
                        >
                          <Newspaper className="h-5 w-5" aria-hidden="true" />
                          <span className="mx-2 text-sm font-medium">
                            Sale Order
                          </span>
                        </a>

                        <a
                          className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                          href="#"
                        >
                          <Paperclip className="h-5 w-5" aria-hidden="true" />
                          <span className="mx-2 text-sm font-medium">
                            Purchase Order
                          </span>
                        </a>
                        <a
                          className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                          href="#"
                        >
                          <Newspaper className="h-5 w-5" aria-hidden="true" />
                          <span className="mx-2 text-sm font-medium">
                            Ledger Report
                          </span>
                        </a>
                      </div>

                      {/* <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900">
              Customization
            </label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Brush className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Themes</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Setting</span>
            </a>
          </div> */}
                    </nav>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2"></a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop view  */}

      <header className="relative ">
        {/* #004787 */}
        {/* [#343a40] */}
        <nav aria-label="Top" className="px-4 sm:px-6 lg:px-8 bg-gray-100 h-20">
          <div className="">
            <div className="flex items-center justify-center ">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                {/* <FaBars size={26} /> */}
              </button>

              {/* Logo */}
              <div className="flex lg:ml-0">
                <Link to={"/home"} className="flex">
                  <div className="flex ">
                    <h1 className=" text-2xl font-bold text-black  px-2 rounded">
                      {/* Hariba logo section */}
                      <div className=" md:w-28 lg:w-28 xl:w-28  z-50 ">
                        <img
                          src="https://i.imgur.com/vA1uxoT.png"
                          alt="Logo"
                          className="w-28"
                        />
                      </div>
                    </h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center justify-between">
                <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center  text-gray-700 font-bold mb-3 mr-3"
                  >
                    <h3 className="text-sm text-black">
                      Welcome, {CompanyName}
                    </h3>
                  </a>
                </div>
                <div className="user-btn ">
                  <Menu as="div" className=" relative mb-5">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
                        <img
                          className="h-11 w-11 rounded-full"
                          src="https://cdn-icons-png.freepik.com/256/3135/3135715.png?uid=R134540980"
                          alt="profile picture "
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <button
                          onClick={handleLogout}
                          className="px-4 py-2 text-sm text-gray-700 flex"
                        >
                          <Link
                            to="/"
                            className="flex items-center justify-center gap-1"
                          >
                            <FaPowerOff size={20} />
                            <span className="pl-2 font-bold"> Logout</span>
                          </Link>
                        </button>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
