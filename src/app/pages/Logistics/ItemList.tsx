// import React, { useCallback, useEffect, useState } from "react";
// import PaginationSection from "./PaginationSection";
// // import { Button } from "react-bootstrap";

// interface Item {
//   driverName: string;
//   customerName: string;
//   number: number;
//   color: string;
// }

// interface ItemListProps {
//   paginatedItems: Item[];
// }

//   // const items = [
//   //   {
//   //     driverName: "John Doe",
//   //     customerName: "Jane Smith",
//   //     number: 12,
//   //     color: "red",
//   //   },
//   //   {
//   //     driverName: "Alice Brown",
//   //     customerName: "Bob Johnson",
//   //     number: 15,
//   //     color: "yellow",
//   //   },
//   //   {
//   //     driverName: "Charlie Green",
//   //     customerName: "Dana White",
//   //     number: 10,
//   //     color: "lightgreen",
//   //   },
//   // ];


// const ItemList: React.FC = () => {
// const [currentPage, setCurrentPage] = useState<number>(1);
// const [page,setPage]=useState<any>([])
// const [items,setItems]=useState([])

//   const fetchLogistics = useCallback(async () => {

//      try {
//        const token = localStorage.getItem("token");
//        const response = await fetch(
//          "https://adminapi.flexiclean.me/api/v1/reports/logistics/driver?pageIndex=1&pageSize=10",
//          {
//            method: "POST",
//            headers: {
//              Authorization: `Bearer ${token}`,
//              "Content-Type": "application/json",
//            },
//            body: JSON.stringify({

//            }),
//          }
//        );

//        if (!response.ok) {
//          throw new Error(`HTTP error! Status: ${response.status}`);
//        }

//        const result = await response.json();
//        if (result?.data) {

//          console.log ();
//          setPage(result.data?.totalCount)
//          setItems(result?.data?.[0]?.data)
//        }
//      } catch (error) {
//        console.error("Error fetching logistics data:", error);
//      }
//    }, []);

//    useEffect(() => {
//      fetchLogistics();
//    }, [fetchLogistics]);

//    const ITEMS_PER_PAGE=page;


//     const totalPages = Math.ceil(items?.length / ITEMS_PER_PAGE);
//      const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

//      const paginatedItems = items.slice(
//        (currentPage - 1) * ITEMS_PER_PAGE,
//        currentPage * ITEMS_PER_PAGE
//      );
//   //  const totalPages=10


//   return (
//     <div>
//       {paginatedItems.map((item, index) => (
//         <div
//           key={index}
//           className="mt-5 px-5 d-flex align-items-center justify-content-between border-custom custom-height"
//         >
//           <div className="">
//             <h4 className="box-large-text">{item.driverName} </h4>
//             <div className="">{item.customerName}</div>

//           </div>
//           <div className="item-container ">
//             <label className="switch">
//               <input type="checkbox" />
//               <span className="slider round"></span>
//             </label>
//             <div className="number-box" style={{ backgroundColor: item.color }}>
//               <h3 className="rounded p-2"> {item.number}</h3>
//             </div>
//           </div>
//         </div>
//       ))}
//     <PaginationSection
//         currentPage={currentPage}
//         totalPages={totalPages} 
//                     handlePageChange={handlePageChange}
//           />
//     </div>
//   );
// };

// export default ItemList;

{
  /* <div className="">
            <h4 className=" box-large-text">{item.driverName}</h4>
            <div className="mt-3">{item.customerName}</div>
            <div className="mb-3">Customer Name / Email</div>
          </div>
          <div className="item-container">
            <label className="switch mb-2 mb-md-0 me-md-3">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
            <div className="number-box" style={{ backgroundColor: item.color }}>
              <h3 className="p-2">{item.number}</h3>
            </div>
          </div> */
}
import React, { useCallback, useEffect, useState } from "react";
import PaginationSection from "./PaginationSection";
import "bootstrap/dist/css/bootstrap.min.css";

interface Item {
  driverName: string;
  customerName: string;
  totalOrders: number;
  color: string;
  driverMobile:string;
}

const ITEMS_PER_PAGE = 10;

const ItemList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [items, setItems] = useState<Item[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchLogistics = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://adminapi.flexiclean.me/api/v1/reports/logistics/driver?pageIndex=${currentPage}&pageSize=${ITEMS_PER_PAGE}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result?.data) {
        setTotalCount(result.data?.length || 0);
        setItems(result.data?.[0]?.data || []);
        console.log(result.data);

      }
    } catch (error) {
      console.error("Error fetching logistics data:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchLogistics();
  }, [fetchLogistics]);


  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
 
  return (
    <div className="container py-4">

      {items?.map((item, index) => (
       <div className="card w-100 mb-3 p-3" key={index} style={{ borderRadius: "12px" }}>
       <div className="d-flex justify-content-between align-items-center flex-wrap">
         {/* Driver & Customer Info */}
         <div className="mb-2" style={{ maxWidth: "60%" }}>
           <h5 className="card-title mb-0 text-truncate" >
             {item.driverName || "Unknown"}
           </h5>
           <small className="text-muted text-truncate d-block" title={item.customerName}>
             CustName:{item.customerName || "No customer"}
           </small>
           <small className="text-muted text-truncate d-block" title={item.driverMobile}>
           Phone:  {item.driverMobile || "No customer"}
           </small>
         </div>
     
         {/* Switch and Orders Badge */}
         <div className="d-flex align-items-center gap-4">
           {/* <div className="form-check form-switch d-flex align-items-center gap-2">
             <input
               className="form-check-input"
               type="checkbox"
               id={`switch-${index}`}
             />
             <label className="form-check-label mb-0" htmlFor={`switch-${index}`}>
               Active
             </label>
           </div> */}
     
           <div
             className="badge text-white fw-semibold"
             style={{
               backgroundColor: item.color || "#6c757d",
               padding: "10px 14px",
               borderRadius: "12px",
               fontSize: "14px",
               minWidth: "48px",
               textAlign: "center",
             }}
           >
             {item.totalOrders}
           </div>
         </div>
       </div>
     </div>
     


      ))}


      <div className="mt-4">
        <PaginationSection
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ItemList;
