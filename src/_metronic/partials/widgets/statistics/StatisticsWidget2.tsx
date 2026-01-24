import React, { FC, useState } from "react";
import { KTSVG, toApiUrl } from "../../../helpers";
import AgentItemModel from "../../../../app/pages/agents/AgentItemModel";

interface Props {
  className?: string;
  title: string;
  description?: string;
  avatar?: string;
  result: any; // Adjust the type as needed
}

const StatisticsWidget2: FC<Props> = ({ className, title, description, avatar, result }) => {
  const [initialValue, setInitialValue] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);

  const handlePopUp = (result: any) => {
    setInitialValue({
      ...result,
      product_image: result.productId?.productImageURL,
      product_name: result.productId?.productName,
      productId: result.productId?._id,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={`card ${className}`}>
        <div className="d-flex justify-content-center p-8 ">
          <img
          src={`https://adminapi.flexiclean.me/${(avatar!)}`} 
            alt=""
            className="align-self-end h-150px"
          />
        </div>
        <div className="d-flex justify-content-center">
          <a
            className="h3 mb-0 mt-3 text-center text-muted pb-2"
            onClick={() => handlePopUp(result)}
            style={{ cursor: "pointer" }}
          >
            {title}
            <i className="bi bi-pencil-square ms-2 fs-3"></i>
          </a>
        </div>
      </div>
      {isOpen && <AgentItemModel initialValuesDetails={initialValue} closeModal={closeModal} />}
    </>
  );
};

export { StatisticsWidget2 };
