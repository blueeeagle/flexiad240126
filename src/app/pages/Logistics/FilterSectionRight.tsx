import React from 'react';
import { Button } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';


const FilterSectionRight: React.FC = () => {
  return (
    <div className="filter-search-section">
      <div className="filter-section">
        <ul className="d-flex align-items-center justify-content-between status-list">
          <li className="extra-large-text">
            <div className="status-box red"></div> <div>Fully (5)</div>
          </li>
          <li className="extra-large-text">
            <div className="status-box blue"></div> Partially  (2)
          </li>
          <li className="extra-large-text">
            <div className="status-box green"></div> Less  (5)
          </li>
        </ul>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-3 mb-5">
        <div className="search-section">
          <input type="text" placeholder="Search By Driver" />
        </div>
        <div>
          <Button variant="link">
            <img src="https://cdn.icon-icons.com/icons2/3522/PNG/512/filtering_sort_filter_icon_221171.png" style={{ width: "40px" }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSectionRight;
