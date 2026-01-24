import React from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

interface PaymentTableProps {
  paymentRows: any[];
  paymentColumns: GridColDef[];
  paginationModel: GridPaginationModel;
  setPaginationModel: (model: GridPaginationModel) => void;
  rowCount:any;
}

const CreditTable: React.FC<PaymentTableProps> = ({
  paymentRows,
  paymentColumns,
  paginationModel,
  setPaginationModel,
  rowCount,
}) => {
 

const payments = paymentRows?.map((itm, idx) => {
  const currencySymbol = itm.currencyId?.currencySymbol || '';
  const decimalPoints = itm.currencyId?.decimalPoints ?? 2; // default to 2 if undefined

  const formattedAmount =
    itm.amount !== undefined && itm.amount !== null
      ? `${currencySymbol}${Number(itm.amount).toFixed(decimalPoints)}`
      : '-';
  console.log("Formatted Amount:", itm?.customerId?.firstName



);
  return {
    id: idx + 1, // Or use itm.id if it exists and is unique
    transactionDate: itm.updated_at
      ? new Date(itm.updated_at).toLocaleDateString('en-GB')
      : '-',
    transactionId: itm.transactionId || '-',
   customerName: itm?.customerId
  ? `${itm.customerId.firstName || ''} ${itm.customerId.lastName || ''}`.trim()
  : '-',

    emailid: itm?.customerId?.email || '-',
    packagetitle: itm?.packageId?.packageTitle || '-',
    amount: formattedAmount,
    paymentMethod: itm.paymentType || '-',
    paymentStatus: itm.status || '-',
  };
});  
  return (
    <>
    
    <DataGrid
      rows={payments}
      columns={paymentColumns}
      // hideFooter={true}
      checkboxSelection
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      rowCount={rowCount}
      paginationMode="server"
      pageSizeOptions={[10, 20, 50, 100]}
      loading={!paymentRows.length}
      />
      </>
  );
};

export default CreditTable;
