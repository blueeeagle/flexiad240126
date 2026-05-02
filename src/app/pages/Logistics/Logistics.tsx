// import React, { useCallback, useEffect, useState } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import "../../../../src/_metronic/assets/sass/components/Logistics.scss";
// import FilterSection from "./FilterSection";
// import LogisticsItem from "./LogisticsItem";
// import ItemList from "./ItemList";
// import FilterSectionRight from "./FilterSectionRight";
// import LogisticsTable from "./LogisticsTable";
// import IconLogistics from "./IconLogistics";
// import DatePickerSection from "./DatePickerSectionProps";
// import { PageTitle } from "../../../_metronic/layout/core";
// import {
//   Offcanvas,
//   Form,
//   Dropdown,
// } from "react-bootstrap";
// import PaginationSection from "./PaginationSection";


// interface LogisticsData {
//   data: never[];
//   orderMode: string;
//   orderDate: string;
//   orderNo: string;
//   customerId: {
//     firstName: string;
//     email: string;
//     mobile: string;
//   };
//   companyId: {
//     companyName: string;
//     email: string;
//     mobile: string;
//   };
//   itemList: any[];
//   bookedVia: string;
//   pickUpRequest: boolean;
//   deliveryRequest: boolean;
//   paymentStatus: string;
//   orderStatus: string;
//   orderDetails: string;
//   statusHistory: any[];
// }

// const Logistics: React.FC = () => {
//   const [startDate, setStartDate] = useState<Date | undefined>(undefined);
//   const [endDate, setEndDate] = useState<Date | undefined>(undefined);
//   const [isAssigned, setIsAssigned] = useState<boolean>(false);
//   const [data, setData] = useState<LogisticsData[]>([]);
//   const [orderMode, setOrderMode] = useState<string>("");
//   const [orderType, setOrderType] = useState<string>("");
//   const [areaType, setAreaType] = useState<string>("");
//   const [totalCount, setTotalCount] = useState<number>(0);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const pageSize = 10;
//   const handleDropdownChange = (value: string) => {
//     setOrderMode(value);
//   };

//   const handleOrderTypeChange = (value: string) => {
//     setOrderType(value);
//   };

//   const handleAreaChange = (value: string) => {
//     setAreaType(value)
//   }
//   const fetchLogistics = useCallback(async () => {
//     const isValidValue = (val: string | string[]) =>
//       Array.isArray(val)
//         ? val.length > 0 && val[0].trim() !== ""
//         : val && val.trim() !== "";
//     const reaId = areaType.split(',')
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `https://adminapi.flexiclean.me/api/v1/reports/logistics?pageIndex=${currentPage - 1}&pageSize=${pageSize} `,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             startDate: startDate,

//             endDate: endDate,
//             orderMode: isValidValue(orderMode)
//               ? [orderMode]
//               : ["POS", "Online"],
//             orderType: isValidValue(orderType)
//               ? [orderType]
//               : ["normal", "urgent"],
//             isAssigned: isAssigned,
//             ...(reaId && Array.isArray(reaId) && reaId.length > 0 && reaId[0] !== "" ? { areaId: reaId } : {})
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       if (result?.data) {
//         setData(result.data);
//         setTotalCount(result.data?.[0]?.totalCount || 0);
//         console.log(result.data?.[0]?.totalCount, "data");

//       }
//     } catch (error) {
//       console.error("Error fetching logistics data:", error);
//     }
//   }, [areaType, currentPage, endDate, isAssigned, orderMode, orderType, startDate]);

//   useEffect(() => {
//     fetchLogistics();
//   }, [fetchLogistics]);

//   const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
//   const toggleOffcanvas = (open: boolean) => () => {
//     setIsOffcanvasOpen(open);
//   };
//   const totalPages = Math.ceil(totalCount / pageSize);
//   console.log(totalPages);
//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };



//   return (
//     <Container fluid>
//       <Row className="logistics-row">
//         <Col md={12} className="logistics-content ">
//           <PageTitle>ACTIVITY LOG</PageTitle>
//           <div className="d-flex  flex-column items-center w-full h-full ">
//             <DatePickerSection
//               startDate={startDate}
//               endDate={endDate}
//               setStartDate={setStartDate}
//               setEndDate={setEndDate}
//               isAssigned={isAssigned}
//               setIsAssigned={setIsAssigned}
//             />
//             <div className="d-flex">

//               <FilterSection
//                 onSelect={handleDropdownChange}
//                 onChange={handleOrderTypeChange}
//                 onselects={handleAreaChange}
//               />
//             </div>


//             {/* <LogisticsItem
//               orderNo="Order No"
//               dateReceived="mm/dd/yyyy"
//               customerName="Customer Name / Email"
//               color="red"
//               status="Pickup"
//             />
//             <LogisticsItem
//               orderNo="Order No"
//               dateReceived="mm/dd/yyyy"
//               customerName="Customer Name / Email"
//               color="yellow"
//               status="Delivery"
//             />
//             <LogisticsItem
//               orderNo="Order No"
//               dateReceived="mm/dd/yyyy"
//               customerName="Customer Name / Email"
//               color="lightgreen"
//               status="Delivered"
//             /> */}
//           </div>
//         </Col>

//         {/* <Col md={4} className="logistics-right-column mt-5"> */}
//         {/* <FilterSectionRight /> */}
//         {/* <ItemList /> */}
//         {/* <div className="button-container"> */}

//         {/* <button className="p-3 custom-button">Assign</button> */}
//         {/* </div> */}
//         {/* </Col> */}
//       </Row>

//       <Row className="mt-5">
//         <Col className="p-0">
//           <LogisticsTable data={data?.[0]?.data || []} />

//         </Col>
//       </Row>
//       <div className="mt-4">
//         <PaginationSection
//           currentPage={currentPage}
//           totalPages={totalPages}
//           handlePageChange={handlePageChange}
//         />
//       </div>

//       <Row className="d-flex flex-row align-items-center mt-5">
//         <Col className="p-0">
//           <IconLogistics />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Logistics;
// Logistics.tsx
import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../../../src/_metronic/assets/sass/components/Logistics.scss";
import FilterSection from "./FilterSection";
import LogisticsItem from "./LogisticsItem";
import ItemList from "./ItemList";
import FilterSectionRight from "./FilterSectionRight";
import LogisticsTable from "./LogisticsTable";
import IconLogistics from "./IconLogistics";
import DatePickerSection from "./DatePickerSectionProps";
import { PageTitle } from "../../../_metronic/layout/core";
import {
  Offcanvas,
  Form,
  Dropdown,
} from "react-bootstrap";
import PaginationSection from "./PaginationSection";
import { getOrdersPermissions } from "../../utils/getPermissions";

interface LogisticsData {
  data: never[];
  orderMode: string;
  orderDate: string;
  orderNo: string;
  customerId: {
    firstName: string;
    email: string;
    mobile: string;
  };
  companyId: {
    companyName: string;
    email: string;
    mobile: string;
  };
  itemList: any[];
  bookedVia: string;
  pickUpRequest: boolean;
  deliveryRequest: boolean;
  paymentStatus: string;
  orderStatus: string;
  orderDetails: string;
  statusHistory: any[];
}

const Logistics: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const [data, setData] = useState<LogisticsData[]>([]);
  const [orderMode, setOrderMode] = useState<string>("");
  const [orderType, setOrderType] = useState<string>("");
  const [areaType, setAreaType] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Permissions
  const permissions = getOrdersPermissions();
  const canView = permissions.includes("view");
  const canEdit = permissions.includes("edit");
  const canDelete = permissions.includes("delete");
  const canCreate = permissions.includes("create");

  console.log("Logistics Permissions:", { canView, canEdit, canDelete, canCreate });

  // Block page if user cannot view
  if (!canView) {
    return (
      <>
        <PageTitle>Access Denied</PageTitle>
        <div className="alert alert-warning">
          You don't have permission to view this page.
        </div>
      </>
    );
  }

  const handleDropdownChange = (value: string) => {
    setOrderMode(value);
  };

  const handleOrderTypeChange = (value: string) => {
    setOrderType(value);
  };

  const handleAreaChange = (value: string) => {
    setAreaType(value);
  };

  const fetchLogistics = useCallback(async () => {
    const isValidValue = (val: string | string[]) =>
      Array.isArray(val)
        ? val.length > 0 && val[0].trim() !== ""
        : val && val.trim() !== "";
    const reaId = areaType.split(',');
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://adminapi.flexiclean.me/api/v1/reports/logistics?pageIndex=${currentPage - 1}&pageSize=${pageSize} `,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
            orderMode: isValidValue(orderMode)
              ? [orderMode]
              : ["POS", "Online"],
            orderType: isValidValue(orderType)
              ? [orderType]
              : ["normal", "urgent"],
            isAssigned: isAssigned,
            ...(reaId && Array.isArray(reaId) && reaId.length > 0 && reaId[0] !== "" ? { areaId: reaId } : {})
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result?.data) {
        setData(result.data);
        setTotalCount(result.data?.[0]?.totalCount || 0);
        console.log(result.data?.[0]?.totalCount, "data");
      }
    } catch (error) {
      console.error("Error fetching logistics data:", error);
    }
  }, [areaType, currentPage, endDate, isAssigned, orderMode, orderType, startDate]);

  useEffect(() => {
    fetchLogistics();
  }, [fetchLogistics]);

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
  const toggleOffcanvas = (open: boolean) => () => {
    setIsOffcanvasOpen(open);
  };
  const totalPages = Math.ceil(totalCount / pageSize);
  console.log(totalPages);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid>
      <Row className="logistics-row">
        <Col md={12} className="logistics-content ">
          <PageTitle>ACTIVITY LOG</PageTitle>
          <div className="d-flex  flex-column items-center w-full h-full ">
            <DatePickerSection
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              isAssigned={isAssigned}
              setIsAssigned={setIsAssigned}
            />
            <div className="d-flex">
              <FilterSection
                onSelect={handleDropdownChange}
                onChange={handleOrderTypeChange}
                onselects={handleAreaChange}
              />
            </div>

            {/* The following commented-out UI components could be conditionally rendered based on permissions if needed */}
            {/* <LogisticsItem
              orderNo="Order No"
              dateReceived="mm/dd/yyyy"
              customerName="Customer Name / Email"
              color="red"
              status="Pickup"
            />
            <LogisticsItem
              orderNo="Order No"
              dateReceived="mm/dd/yyyy"
              customerName="Customer Name / Email"
              color="yellow"
              status="Delivery"
            />
            <LogisticsItem
              orderNo="Order No"
              dateReceived="mm/dd/yyyy"
              customerName="Customer Name / Email"
              color="lightgreen"
              status="Delivered"
            /> */}
          </div>
        </Col>

        {/* <Col md={4} className="logistics-right-column mt-5"> */}
        {/* <FilterSectionRight /> */}
        {/* <ItemList /> */}
        {/* <div className="button-container"> */}
        {/* If the Assign button is uncommented, control it with canEdit: */}
        {/* {canEdit && <button className="p-3 custom-button">Assign</button>} */}
        {/* </div> */}
        {/* </Col> */}
      </Row>

      <Row className="mt-5">
        <Col className="p-0">
          <LogisticsTable data={data?.[0]?.data || []} />
        </Col>
      </Row>
      <div className="mt-4">
        <PaginationSection
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>

      <Row className="d-flex flex-row align-items-center mt-5">
        <Col className="p-0">
          <IconLogistics />
        </Col>
      </Row>
    </Container>
  );
};

export default Logistics;

