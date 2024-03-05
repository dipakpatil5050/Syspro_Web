import React, { useEffect, useState } from "react";
import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { setLedgerReport } from "../../redux/reducers/authReducer";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function Sidebar() {
  const dispatch = useDispatch();
  const ledgerReportData = useSelector((state) => state.auth.LedgerReport);

  // const ledgerextract = ledgerReportData?.data?.Data;

  const userMpinData = useSelector((state) => state.auth.userMpinData);

  const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
  const mPin = userMpinData?.Data?.mPin;
  const SlugUrl = userMpinData?.Data?.SlugUrl;

  const userData = useSelector((state) => state.auth.userData);
  const userheaderdata = userData?.Data;
  const CompanyID = userheaderdata?.CompanyID;
  const YearMasterID = userheaderdata?.YearMasterID;
  const PremiseID = userheaderdata?.PremiseID;
  const DepartmentID = userheaderdata?.DepartmentID;
  const UserID = userheaderdata?.UserID;
  const CompanyName = userheaderdata?.CompanyName;
  const CompanyGSTCST = userheaderdata?.CompanyGSTCST;
  const PremiseName = userheaderdata?.PremiseName;
  const CompanyContactNo = userheaderdata?.CompanyContactNo;
  const CompanyAddress1 = userheaderdata?.CompanyAddress1;
  const CompanyAddress2 = userheaderdata?.CompanyAddress2;

  const currentDate = new Date();
  const defaultFromDate = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const defaultToDate = new Date();

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [fromDate, setFromDate] = useState(
    defaultFromDate.toLocaleDateString("en-US")
  );
  const [toDate, setToDate] = useState(
    defaultToDate.toLocaleDateString("en-US")
  );
  const [ReportID, setReportID] = useState("");
  const [ReportName, setReportName] = useState("");

  const fetchLedgerReport = async () => {
    const LedgerReportAPI = `${ServerBaseUrl}api/CommonFas/LedgerReport`;
    const body = {
      SYSKey: 0,
      Access_Type: "",
      Access_Key: "",
      Access_From: "",
      CatalogueImageImportSyncDateTime: "",
    };

    const headers = {
      "Content-Type": "application/json",
      CompanyID: CompanyID,
      YearMasterID: YearMasterID,
      PremiseID: PremiseID,
      DepartmentID: DepartmentID,
      UserID: UserID,
      client: SlugUrl,
      "x-api-key": mPin,
    };
    const response = await axios.post(LedgerReportAPI, body, { headers });
    try {
      const ledgerReportData = response?.data?.Data;
      dispatch(setLedgerReport(ledgerReportData));
    } catch (error) {
      console.error("Error in Ledger report data fetching:", error);
      toast.error("Error in fetching Ledger report data from API Server.");
    }
  };

  const handleLedgerReport = async (e) => {
    e.preventDefault();
    try {
      await fetchLedgerReport();
    } catch (error) {
      console.error("Error in Ledger report data fetching:", error);
      toast.error("Error in fetching Ledger report data from API Server.");
    }
  };

  //PDF API

  const fetchPDF = async () => {
    const PDFAPI = `${ServerBaseUrl}/api/CommonFas/LedgerReportPost`;
    const body = {
      FromDate: fromDate,
      ToDate: toDate,
      AmountGtEq: 0,
      CustomFilter: "",
      IntReportId: 0,
      ExcludeNoTransaction: 1,
      CompanyName: CompanyName,
      CompanyGSTCST: CompanyGSTCST,
      PremiseName: PremiseName,
      CompanyContactNo: CompanyContactNo,
      CompanyAddress1: CompanyAddress1,
      CompanyAddress2: CompanyAddress2,
      type: "pdf",
      ReportID: "Ledger.Rpt",
      ReportName: "Ledger Report",
      SysKey: "1",
      CompanyID: CompanyID,
      YearMasterID: YearMasterID,
      PremiseID: PremiseID,
      DepartmentID: DepartmentID,
      UserID: UserID,
    };

    const headers = {
      "Content-Type": "application/json",
      CompanyID: CompanyID,
      YearMasterID: YearMasterID,
      PremiseID: PremiseID,
      DepartmentID: DepartmentID,
      UserID: UserID,
      client: SlugUrl,
      "x-api-key": mPin,
    };
    const response = await axios.post(PDFAPI, body, { headers });
    try {
      const ledgerReportPDF = response?.data?.Data;
      const pdfurl = ledgerReportPDF?.ReportPath;
      console.log(pdfurl);
      // dispatch(setLedgerReport(ledgerReportData));
    } catch (error) {
      console.error("Error in Ledger report data fetching:", error);
      // toast.error("Error in fetching Ledger report data from API Server.");
    }
  };

  const handleLedgerReportPDF = async (e) => {
    e.preventDefault();
    try {
      await fetchPDF();
    } catch (error) {
      console.error("Error in Ledger report data fetching:", error);
      // toast.error("Error in fetching Ledger report data from API Server.");
    }
  };

  useEffect(() => {
    fetchLedgerReport();
  }, []);

  return (
    <>
      <div className="flex">
        <aside className="flex h-[90vh] w-64 flex-col overflow-y-auto bg-gray-100 px-5 py-8 max-[390px]:hidden">
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
                  <span className="mx-2 text-sm font-medium">Dashboard</span>
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
                  <span className="mx-2 text-sm font-medium">Sale Order</span>
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
            </nav>
          </div>
        </aside>
        <div className="content flex flex-wrap ml-16 mt-10">
          <form method="POST">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-bold leading-7 text-gray-900">
                  Ledger Report
                </h2>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="from-date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      From Date
                    </label>
                    <div className="mt-2">
                      <DatePicker
                        selected={fromDate}
                        onChange={(date) => setFromDate(date)}
                        id="from-date"
                        dateFormat="dd-MM-yyyy"
                        name="from-date"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="to-date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      To Date
                    </label>
                    <div className="mt-2">
                      <DatePicker
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                        id="to-date"
                        name="to-date"
                        dateFormat="dd-MM-yyyy"
                        minDate={fromDate}
                        maxDate={
                          new Date(
                            currentDate.getFullYear() + 1,
                            currentDate.getMonth(),
                            currentDate.getDate()
                          )
                        }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="report-type"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Report Type
                    </label>
                    <div className="mt-2">
                      <Select
                        id="party"
                        name="party"
                        options={ledgerReportData?.Table.map((report) => ({
                          value: report.Rep_Rpt,
                          label: report.Rep_Name,
                        }))}
                        placeholder="Select Party"
                        isSearchable={true}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="party"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Party
                    </label>
                    <div className="mt-2">
                      <Select
                        id="party"
                        name="party"
                        options={ledgerReportData?.Table3.map((report) => ({
                          value: report.Account_ID,
                          label: report.Account_Name,
                        }))}
                        placeholder="Select Party"
                        isSearchable={true}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="account-group"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Account Group
                    </label>
                    <div className="mt-2">
                      <Select
                        id="party"
                        name="party"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Party"
                        isSearchable={true}
                        className="block w-56 rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {console.log(toDate)}
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={handleLedgerReportPDF}
                className="rounded-md bg-[#232981] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#3e45a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Apply
              </button>
            </div>
          </form>
          {/* <div className="w-64 rounded-md border h-[45vh] ml-5 mt-5">
            <img
              src="https://imgs.search.brave.com/1hujxFj4JPOG5wHgfreJo5McPPd8bxhrc7X3Zhp3gs8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/c2tpbGxzeW91bmVl/ZC5jb20vaW1hZ2Vz/L3BpZS1jaGFydC5w/bmc"
              alt="Laptop"
              className="h-[200px] w-full rounded-md object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold">Sale Report </h1>
              <p className="mt-3 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, debitis?
              </p>
            </div>
          </div>
          <div className="w-64 rounded-md border h-[45vh] ml-5 mt-5">
            <img
              src="https://imgs.search.brave.com/SgWal2KQnrkOiYxcYcTqTc6lvlYjaFVm_2BdsKgAJhQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9saDYu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tL3VI/VTdGMEVxMjF4alFn/b3Rna09LampmSm5R/NGNmMDQ5T2tKdE0w/TTZOZWFqbnNXZmEz/UF96ck9TcEF2cDZ5/bnBPU084Y3d6ZUdE/T2MwWUYtbUVLN1g3/bmpFVUdydmdfMXI3/dE9JMFRSUGgtQXNo/WjZ3UDk4RTBBV2JF/VFNCaE1ydURXcDN2/dGE"
              alt="Laptop"
              className="h-[200px] w-full rounded-md object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold">Purchase Report</h1>
              <p className="mt-3 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, debitis?
              </p>
            </div>
          </div>
          <div className="w-64 rounded-md border h-[45vh] ml-5 mt-5">
            <img
              src="https://imgs.search.brave.com/ulQyrCZWinK2LU_12zlPYa3IP_3l8pznoK-ZJXa--es/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vcHJhY3RpY2Fs/ZGV2L2ltYWdlL2Zl/dGNoL3MtLUJocm9z/RU1RLS0vY19saW1p/dCxmX2F1dG8sZmxf/cHJvZ3Jlc3NpdmUs/cV9hdXRvLHdfODAw/L2h0dHBzOi8vZGV2/LXRvLXVwbG9hZHMu/czMuYW1hem9uYXdz/LmNvbS91cGxvYWRz/L2FydGljbGVzL2g2/Y3B6ejVxa2M2cWVu/OHUyN2tqLmpwZw"
              alt="Laptop"
              className="h-[200px] w-full rounded-md object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold">Sale Orders</h1>
              <p className="mt-3 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, debitis?
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
