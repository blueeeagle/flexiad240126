


// import React, { useCallback, useEffect, useState } from "react";
// import { Form } from "react-bootstrap";
// import { Dropdown } from "react-bootstrap";
// import './Filter.css'
// interface FilterSectionProps {
//   onSelect: (value: string) => void;
//   onChange: (value: string) => void;
//   onselects: (value: string) => void;
// }

// interface Area {
//   countryId: any;
//   _id: string;
//   name: string;
// }

// const FilterSection: React.FC<FilterSectionProps> = ({
//   onSelect,
//   onChange,
//   onselects,
// }) => {
//   const [areas, setAreas] = useState<Area[]>([]);
//   const [selectedAreaIds, setSelectedAreaIds] = useState<string[]>([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const fetchArea = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "https://adminapi.flexiclean.me/api/v1//master/areas",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       if (result?.data) {
//         setAreas(result.data);
//         console.log(result.data);
//       }
//     } catch (error) {
//       console.error("Error fetching logistics data:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchArea();
//   }, [fetchArea]);

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const { value } = event.target;
//     onSelect(value);
//   };

//   const handleOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const { value } = event.target;
//     onChange(value);
//   };

//   const handleAreaCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     let updatedIds = [...selectedAreaIds];

//     if (checked) {
//       updatedIds.push(value);
//     } else {
//       updatedIds = updatedIds.filter((id) => id !== value);
//     }

//     setSelectedAreaIds(updatedIds);
//     onselects(updatedIds.join(",")); 
//   };

//   return (
//    <div className="container mt-3 mb-4">
//   <div className="row g-3 align-items-end">
    
//     {/* Area Multi-select Dropdown */}
//     <div className="col-md-4">
//          <Form.Group className="mb-4">
//                           <Form.Label className="custom-label">Agent Name</Form.Label>
//                           <Dropdown className="w-100">
//                             <Dropdown.Toggle
//                               variant="secondary"
//                               className="w-100"
//                               style={{
//                                 backgroundColor: "#f8f9fa",
//                                 border: "1px solid #ced4da",
//                                 color: "#495057",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                               }}
//                             >
//                               <span style={{ marginRight: "auto" }}>
//                                 {selectedAreaIds.length > 0
//                                   ? "Agents Selected"
//                                   : "Select Agents"}
//                               </span>
//                             </Dropdown.Toggle>
      
//                             <Dropdown.Menu
//                               className="w-100"
//                               style={{
//                                 maxHeight: "200px",
//                                 overflowY: "auto",
//                                 borderRadius: "0.25rem",
//                                 boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//                               }}
//                             >
//                               {/* Select All Checkbox */}
//                               <Form.Group className="px-3">
//                                 <Form.Check
//                                   type="checkbox"
//                                   label="Select All"
//                                   checked={
//                                     selectedAreaIds.length === selectedAreaIds.length
//                                   }
//                                   onChange={ handleAreaCheckboxChange}
//                                   style={{ marginBottom: "0.5rem" }}
//                                 />
//                               </Form.Group>
//                               <Dropdown.Divider style={{ margin: "0.5rem 0" }} />
      
//                               {/* Agent Checkboxes */}
//                               {areas.map((agent) => (
//                                 <Form.Group
//                                   key={agent._id}
//                                   className="px-3"
//                                   style={{ marginBottom: "0.5rem" }}
//                                 >
//                                   <Form.Check
//                                     type="checkbox"
//                                     label={agent.companyName}
//                                     checked={selectedAgents.includes(agent._id)}
//                                     onChange={() => handleAgentSelect(agent._id)}
//                                   /> 
//                                 </Form.Group>
//                               ))}
//                             </Dropdown.Menu>
//                           </Dropdown>
//                         </Form.Group>
      
//     </div>

//     {/* Order Mode Dropdown */}
//     <div className="col-md-4">
//       <label className="form-label fw-bold">Order Mode</label>
//       <Form.Select
//         name="orderMode"
//         aria-label="Order Mode"
//         onChange={handleChange}
//       >
//         <option value="">Select Order Mode</option>
//         <option value="Online">Online</option>
//         <option value="POS">POS</option>
//       </Form.Select>
//     </div>

//     {/* Order Type Dropdown */}
//     <div className="col-md-4">
//       <label className="form-label fw-bold">Order Type</label>
//       <Form.Select
//         name="orderType"
//         aria-label="Order Type"
//         onChange={handleOrder}
//       >
//         <option value="">Select Order Type</option>
//         <option value="normal">Normal</option>
//         <option value="urgent">Urgent</option>
//       </Form.Select>
//     </div>
//   </div>
// </div>

//   );
// };

// export default FilterSection;



import React, { useCallback, useEffect, useState } from "react";
import { Form, Dropdown } from "react-bootstrap";
import './Filter.css';

interface FilterSectionProps {
  onSelect: (value: string) => void;
  onChange: (value: string) => void;
  onselects: (value: string) => void;
}

interface Area {
  countryId: any;
  _id: string;
  name: string;
  companyName?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  onSelect,
  onChange,
  onselects,
}) => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedAreaIds, setSelectedAreaIds] = useState<string[]>([]);

  const fetchArea = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://adminapi.flexiclean.me/api/v1//master/areas",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result?.data) {
        setAreas(result.data);
      }
    } catch (error) {
      console.error("Error fetching logistics data:", error);
    }
  }, []);

  useEffect(() => {
    fetchArea();
  }, [fetchArea]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  const handleOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  const handleAreaCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, areaId?: string) => {
    const { checked } = e.target;

    if (areaId === "all") {
      const allIds = checked ? areas.map((a) => a._id) : [];
      setSelectedAreaIds(allIds);
      onselects(allIds.join(","));
    } else if (areaId) {
      const updatedIds = checked
        ? [...selectedAreaIds, areaId]
        : selectedAreaIds.filter((id) => id !== areaId);

      setSelectedAreaIds(updatedIds);
      onselects(updatedIds.join(","));
    }
  };

  const isAllSelected = selectedAreaIds.length === areas.length;

  return (
    <div className="container mt-3 mb-4">
  <div className="row g-3 align-items-start">
    
    {/* Agent Multi-select Dropdown */}
    <div className="col-md-4">
      <Form.Group className="mb-4">
        <Form.Label className="custom-label fw-bold">Agent Name</Form.Label>
        <Dropdown className="w-100">
          <Dropdown.Toggle
            variant="secondary"
            className="w-100 text-start"
            style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #ced4da",
              color: "#495057",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "auto" }}>
              {selectedAreaIds.length > 0 ? "Agents Selected" : "Select Agents"}
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu
            className="w-100 p-3"
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              borderRadius: "0.25rem",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <Form.Group className="px-3">
              <Form.Check
                type="checkbox"
                label="Select All"
                checked={isAllSelected}
                onChange={(e) => handleAreaCheckboxChange(e, "all")}
                style={{ marginBottom: "0.5rem" }}
              />
            </Form.Group>
            <Dropdown.Divider style={{ margin: "0.5rem 0" }} />
            {areas.map((agent) => (
              <Form.Group key={agent._id} className="px-3" style={{ marginBottom: "0.5rem" }}>
                <Form.Check
                  type="checkbox"
                  label={agent.companyName || agent.name}
                  checked={selectedAreaIds.includes(agent._id)}
                  onChange={(e) => handleAreaCheckboxChange(e, agent._id)}
                />
              </Form.Group>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
    </div>

    {/* Order Mode Dropdown */}
    <div className="col-md-4">
      <Form.Group className="mb-4">
        <Form.Label className="custom-label fw-bold">Order Mode</Form.Label>
        <Form.Select
          name="orderMode"
          aria-label="Order Mode"
          className="w-100 p-3"
          onChange={handleChange}
          style={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #ced4da",
            color: "#495057",
            padding: "0.5rem 1rem",
          }}
        >
          <option value="">All</option>
          <option value="Online">Online</option>
          <option value="POS">POS</option>
        </Form.Select>
      </Form.Group>
    </div>

    {/* Order Type Dropdown */}
    <div className="col-md-4">
      <Form.Group className="mb-4">
        <Form.Label className="custom-label fw-bold">Order Type</Form.Label>
        <Form.Select
          name="orderType"
          aria-label="Order Type"
          className="w-100 p-3 "
          onChange={handleOrder}
          style={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #ced4da",
            color: "#495057",
            padding: "0.5rem 1rem",
          }}
        >
          <option value="">All</option>
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
        </Form.Select>
      </Form.Group>
    </div>
  </div>
</div>

  );
};

export default FilterSection;
