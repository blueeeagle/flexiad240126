import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { getRequest } from "../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Importing Font Awesome icons
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

const AgentTimeslots: FC = () => {
  let date = new Date().toISOString().slice(0, 10);
  const [rowData, setRowData] = useState([]);
  const [amSessions, setAmSessions] = useState([]);
  const [pmSessions, setPmSessions] = useState([]);
  const [filterDate, setFilterDate] = useState(date);
  const [dayName, setDayName] = useState(
    new Date().toLocaleDateString("en-us", { weekday: "long" })
  );
  const [workingHours, setWorkingHours] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // Loader state

  const { agentId } = useParams();

  const GetDates = () => {
    const aryDates = [];
    const startDate = new Date(filterDate);

    for (let i = 0; i < 6; i++) {
      const suffix = getDaySuffix(startDate.getDate());
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      aryDates.push({
        isEnable: workingHours.includes(DayAsString(currentDate.getDay())),
        value: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${currentDate
          .getDate()
          .toString()
          .padStart(2, "0")}`,
        label: `${currentDate.getDate()}${suffix} ${currentDate.toLocaleString(
          "default",
          { month: "short" }
        )}, ${DayAsString(currentDate.getDay())}`,
      });
    }

    return aryDates;
  };

  const DayAsString = (dayIndex: number) => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[dayIndex];
  };

  const getDaySuffix = (dayIndex: number) => {
    if (dayIndex === 1 || dayIndex === 21 || dayIndex === 31) return "st";
    if (dayIndex === 2 || dayIndex === 22) return "nd";
    if (dayIndex === 3 || dayIndex === 23) return "rd";
    return "th";
  };

  const fetchResults = (data: any) => {
    setFilterDate(data?.value);
    setDayName(
      new Date(data?.value).toLocaleDateString("en-us", { weekday: "long" })
    );
  };

  const getData = async (filterDate: string) => {
    setLoading(true); // Start loading
    const workingHrs = await getRequest(`/agent/workinghrs/${agentId}`, ``);
    let filterWorkingHours = workingHrs.data.data
      .filter((element: any) => element.is_active)
      .map((element: any) => element.day);

    setWorkingHours(filterWorkingHours);

    if (filterWorkingHours.includes(dayName.toString())) {
      const timeslotData = await getRequest(
        `/agent/timeslots/${agentId}`,
        `?date=${filterDate}&day=${dayName}`
      );

      const lookupObj = [timeslotData];
      let data1: Array<any> = [];
      return Promise.allSettled(lookupObj)
        .then((result) => {
          result.forEach((res: any) => {
            data1.push(res.value);
          });
          return data1;
        })
        .then((d) => {
          const dataobj = {
            timeslotData: d[0]?.data?.status === "ok" ? d[0]?.data : [],
          };
          setRowData(dataobj?.timeslotData?.data);
          setAmSessions(
            dataobj?.timeslotData?.data
              .filter((i: any) => i?.session === "AM" && i?.is_active) // Filter active AM sessions
          );
          setPmSessions(
            dataobj?.timeslotData?.data
              .filter((i: any) => i?.session === "PM" && i?.is_active) // Filter active PM sessions
          );
          setLoading(false); // End loading
        });
    } else {
      setLoading(false); // End loading if no working hours available
    }
  };

  const handleArrowClick = (direction: "left" | "right") => {
    const currentDate = new Date(filterDate);
    const updatedDate = new Date(currentDate);
    if (direction === "left") {
      updatedDate.setDate(currentDate.getDate() - 1); // Go to previous date
    } else {
      updatedDate.setDate(currentDate.getDate() + 1); // Go to next date
    }

    const formattedDate = updatedDate.toISOString().slice(0, 10);
    setFilterDate(formattedDate);
    setDayName(
      new Date(formattedDate).toLocaleDateString("en-us", { weekday: "long" })
    );
  };

  useEffect(() => {
    async function fetchData() {
      await getData(filterDate);
    }
    fetchData();
  }, [filterDate]);

  return (
    <>
      <PageTitle>TIMESLOTS</PageTitle>

      <div className="d-flex align-items-center justify-content-between mb-8">
        <button
          className="btn btn-icon btn-light"
          onClick={() => handleArrowClick("left")}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> {/* Font Awesome Left Arrow */}
        </button>
        <div className="row g-6 g-xl-9 mb-8">
          {GetDates().map((date, index) => {
            return (
              <div
                key={index}
                onClick={date.isEnable ? () => fetchResults(date) : () => null}
                className="bg-light-warning"
                style={{
                  width: "120px",
                  textAlign: "center",
                  marginRight: "15px",
                  padding: "10px",
                  cursor: "pointer",
                  color: date.value === filterDate ? "black" : "",
                  border:
                    date.value === filterDate && date.isEnable ? "solid" : "",
                  borderWidth:
                    date.value === filterDate && date.isEnable ? "2px" : "",
                  opacity: date.isEnable ? "1" : "0.5",
                }}
              >
                {date?.label}
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-icon btn-light"
          onClick={() => handleArrowClick("right")}
        >
          <FontAwesomeIcon icon={faArrowRight} /> {/* Font Awesome Right Arrow */}
        </button>
      </div>

      {/* Loader */}
      {loading ? (
       <div
       className="text-center"
       style={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         height: "50vh",
       }}
     >
       <Lottie
         animationData={loaderAnimation}
         loop={true}
         style={{ width: 150, height: 150 }}
       />
     </div>
      ) : (
        <>
          {/* AM Sessions */}
          <h3 className="card-title align-items-start flex-column mb-8">
            <span className="card-label fw-bold fs-3 mb-1">AM SESSIONS</span>
          </h3>
          <div className="d-flex flex-wrap mb-8">
            {amSessions?.length > 0
              ? amSessions.map((result: any, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                  >
                    <div className="d-flex align-items-center">
                      <div className="fs-2 fw-bolder">{result?.label}</div>
                    </div>
                  </div>
                ))
              : `No Slots Available`}
          </div>

          {/* PM Sessions */}
          <h3 className="card-title align-items-start flex-column mb-8">
            <span className="card-label fw-bold fs-3 mb-1">PM SESSIONS</span>
          </h3>
          <div className="d-flex flex-wrap">
            {pmSessions?.length > 0
              ? pmSessions.map((result: any, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                  >
                    <div className="d-flex align-items-center">
                      <div className="fs-2 fw-bolder">{result?.label}</div>
                    </div>
                  </div>
                ))
              : `No Slots Available`}
          </div>
        </>
      )}
    </>
  );
};

export default AgentTimeslots;
