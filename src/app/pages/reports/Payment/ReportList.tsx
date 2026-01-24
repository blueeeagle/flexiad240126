// import React from 'react';

// interface ReportListProps {
//   filteredData: any;
//   getTotal: (data: any) => number;
//   setSelectedLine: (line: string) => void;
// }

// const ReportList: React.FC<ReportListProps> = ({
//   filteredData,
//   getTotal,
//   setSelectedLine,
// }) => {
//   return (
//     <ul className="report-list">
//       <li className="border-custom-reports" onClick={() => setSelectedLine('Subscription')}>
//         <i className={`fa-icon fa-subscription fa fa-money-bill-wave`} />
//         <div>
//           <h1>SUBSCRIBE</h1>
//           <span>{getTotal(filteredData.Subscription)}</span>
//         </div>
//       </li>
//       <li className="border-custom-reports mt-5" onClick={() => setSelectedLine('Logistics')}>
//         <i className={`fa-icon fa-logistics fa fa-truck`} />
//         <div>
//           <h1>LOGISTICS</h1>
//           <span>{getTotal(filteredData.Logistics)}</span>
//         </div>
//       </li>
//       <li className="border-custom-reports mt-5" onClick={() => setSelectedLine('Additional')}>
//         <i className={`fa-icon fa-additional fa fa-box`} />
//         <div>
//           <h1>M-CREDITS</h1>
//           <span>{getTotal(filteredData.Additional)}</span>
//         </div>
//       </li>
//     </ul>
//   );
// };

// export default ReportList;



import React from 'react';
import { Card } from 'react-bootstrap';

interface ReportListProps {
  chartData: any[];
  
}

const ReportList: React.FC<ReportListProps> = ({ chartData }) => {
const subscriptionData = chartData.find(item => item._id === "subscription");
const packageData = chartData.find(item => item._id === "package"); 
  const reportItems = [
   
    {
      title: "subscription",
      color: "#a1c9a9",
      price:subscriptionData?.totalSum ||0
    },
    {
      title: "package",
      color: "#ffd059",
      price:packageData?.totalSum || 0
    },
  ];

  





  return (
    <div className="d-flex flex-column gap-3">
      {reportItems.map((item) => (
        <Card
          key={item.title}
          className="p-3 shadow-sm"
          style={{
            borderLeft: `5px solid ${item.color}`,
            cursor: 'pointer',
          }}
        >
          <h6 className="text-muted">{item.title}</h6>
          <h5 className="fw-bold text-dark">
            ₹ {item?.price || "0.00"}
          </h5>
        </Card>
      ))}
    </div>
  );
};

export default ReportList;
