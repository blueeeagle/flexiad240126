

// // import React, { useState } from 'react'

// import { Row, Col, Nav, Tab} from "react-bootstrap";
import TransactionsTable from './TransactionsTable';
// // import PayoutTable from './PayoutTable';
const AgentTransactions = () => {

  return (
//     <div>
//       <Row>
//         <Col>
        
//           <Tab.Container id="left-tabs-example" defaultActiveKey="Transactions">
//             <Nav variant="tabs" className="border-0">
//               <Nav.Item>
//                 <Nav.Link eventKey="Transactions" className="border-0">
//                   Transactions
//                 </Nav.Link>
//               </Nav.Item>
//               {/* <Nav.Item>
//                 <Nav.Link eventKey="Payout" className="border-0">
//                   Payout History
//                 </Nav.Link>
//               </Nav.Item> */}
//             </Nav>
//             <Tab.Content>
//               <Tab.Pane eventKey="Transactions">
                <TransactionsTable />
//               </Tab.Pane>
//               {/* <Tab.Pane eventKey="Payout">
//                 <PayoutTable />
//               </Tab.Pane> */}
//             </Tab.Content>
//           </Tab.Container>
//         </Col>
//       </Row>
//     </div>
  )
}

export default AgentTransactions