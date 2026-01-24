// import React, { useState } from "react";
// import { Chat } from "./types";
// import "../../../../src/_metronic/assets/sass/components/ChatSystem.scss";

// interface Agency {
//   _id: string;
//   companyName: string;
//   role: string;
// }

// interface Customer {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   role: string;
// }

// interface ChatListProps {
//   chats: Chat[];
//   data: { data: Agency[] | Customer[] }[];
//   handleChatClick: (chatId: any) => void;
//   activeChatId: string | null;
// }

// const ChatList: React.FC<ChatListProps> = ({ handleChatClick, activeChatId, data }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const agencies: Agency[] = (data?.[0]?.data || []) as Agency[];
//   const customers: Customer[] = (data?.[1]?.data || []) as Customer[];

//   const filteredAgencies = agencies.filter((agency) =>
//     agency.companyName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredCustomers = customers.filter((customer) =>
//     `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="chat-area">
//       <div className="chatlist">
//         <div className="modal-dialog-scrollable">
//           <div className="modal-content">
//             <div className="chat-header">
//               <ul className="nav nav-tabs" id="myTab" role="tablist">
//                 <li className="nav-item" role="presentation">
//                   <button className="nav-link active" id="Agencies-tab" data-bs-toggle="tab" data-bs-target="#Agencies" type="button" role="tab" aria-controls="Agencies" aria-selected="true">
//                     AGENCIES
//                   </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                   <button className="nav-link" id="Customers-tab" data-bs-toggle="tab" data-bs-target="#Customers" type="button" role="tab" aria-controls="Customers" aria-selected="false">
//                     CUSTOMERS
//                   </button>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <div className="chat-list">
//                 <input
//                   type="search"
//                   className="form-control mb-3"
//                   placeholder="Search..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />

//               </div>
//               <div className="modal-body mt-3">

//                 <div className="tab-content" id="myTabContent">
//                   <div className="tab-pane fade show active" id="Agencies" role="tabpanel" aria-labelledby="Agencies-tab">
//                     {filteredAgencies.map((agency) => (
//                       <div key={agency._id} className="chat-list">
//                         <a href="#" className={agency._id === activeChatId ? "d-flex align-items-center active px-5" : "d-flex align-items-center px-5"} onClick={() => handleChatClick(agency._id)}>
//                           <div className="flex-grow-1 ms-3 mt-2">
//                             <h3>{agency.companyName}</h3>
//                             <p>{agency.role}</p>
//                           </div>
//                         </a>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="tab-pane fade" id="Customers" role="tabpanel" aria-labelledby="Customers-tab">
//                     {filteredCustomers.map((customer) => (
//                       <div key={customer._id} className="chat-list">
//                         <a href="#" className={customer._id === activeChatId ? "d-flex align-items-center active px-5" : "d-flex align-items-center px-5"} onClick={() => handleChatClick(customer._id)}>
//                           <div className="flex-grow-1 ms-3 mt-2">
//                             <h3>{customer.firstName} {customer.lastName}</h3>
//                             <p>{customer.role}</p>
//                           </div>
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatList;




import React, { useState } from "react";
import { Chat } from "./types";
import "../../../../src/_metronic/assets/sass/components/ChatSystem.scss";

interface Agency {
  _id: string;
  companyName: string;
  role: string;
}

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface ChatListProps {
  chats: Chat[];
  data: { data: Agency[] | Customer[] }[];
  handleChatClick: (chatId: any) => void;
  activeChatId: string | null;
  unreadMessages: { [key: string]: boolean };
}

const ChatList: React.FC<ChatListProps> = ({ handleChatClick, activeChatId, data, unreadMessages }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const agencies: Agency[] = (data?.[0]?.data || []) as Agency[];
  const customers: Customer[] = (data?.[1]?.data || []) as Customer[];

  const filteredAgencies = agencies.filter((agency) =>
    agency.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter((customer) =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-area"  >
      <div className="chatlist">
        <div className="">
          <div className="modal-content">
            <div className="chat-header">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="Agencies-tab" data-bs-toggle="tab" data-bs-target="#Agencies" type="button" role="tab" aria-controls="Agencies" aria-selected="true">
                    AGENCIES
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="Customers-tab" data-bs-toggle="tab" data-bs-target="#Customers" type="button" role="tab" aria-controls="Customers" aria-selected="false">
                    CUSTOMERS
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <div className="chat-list">
                <input
                  type="search"
                  className="form-control mb-3"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="modal-body mt-3">

                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="Agencies" role="tabpanel" aria-labelledby="Agencies-tab">
                    {filteredAgencies.map((agency) => (
                      <div key={agency._id} className="chat-list">
                        <a 
                          href="#" 
                          className={agency._id === activeChatId ? "d-flex align-items-center active px-5" : "d-flex align-items-center px-5"}
                          onClick={() => handleChatClick(agency._id)}
                        >
                          <div className="flex-grow-1 ms-3 mt-2">
                            <h3>{agency.companyName}</h3>
                            <p>{agency.role}</p>
                          </div>
                          {unreadMessages[agency._id] && (
                            <span className="unread-indicator"></span>
                          )}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="tab-pane fade" id="Customers" role="tabpanel" aria-labelledby="Customers-tab">
                    {filteredCustomers.map((customer) => (
                      <div key={customer._id} className="chat-list">
                        <a 
                          href="#" 
                          className={customer._id === activeChatId ? "d-flex align-items-center active px-5" : "d-flex align-items-center px-5"} 
                          onClick={() => handleChatClick(customer._id)}
                        >
                          <div className="flex-grow-1 ms-3 mt-2">
                            <h3>{customer.firstName} {customer.lastName}</h3>
                            <p>{customer.role}</p>
                          </div>
                          {unreadMessages[customer._id] && (
                            <span className="unread-indicator"></span>
                          )}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
