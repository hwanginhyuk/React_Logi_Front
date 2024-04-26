import { GridColDef } from "@mui/x-data-grid";

const outSourcingColumn: readonly GridColDef<any>[] = [
    { field: 'outsourcingNo', headerName: '외주일련번호', minWidth: 100, align: 'center', editable: true },
    { field: 'materialStatus', headerName: '자재출고상태', minWidth: 100, align: 'center', editable: true },
    { field: 'customerCode', headerName: '거래처코드', minWidth: 100, align: 'center', editable: true },
    { field: 'instructDate', headerName: '지시일', minWidth: 100, align: 'center', editable: true },
    { field: 'completeDate', headerName: '완료일', minWidth: 100, align: 'center', editable: true },
    { field: 'outsourcingDate', headerName: '외주발주일', minWidth: 100, align: 'center', editable: true },
    { field: 'customerName', headerName: '구매처', minWidth: 100, align: 'center', editable: true },
    { field: 'itemCode', headerName: '품목코드', minWidth: 100, align: 'center', editable: true },
    { field: 'itemName', headerName: '품목명', minWidth: 100, align: 'center', editable: true },
    { field: 'instructAmount', headerName: '지시수량', minWidth: 100, align: 'center', editable: true },
    { field: 'unitPrice', headerName: '단위', minWidth: 100, align: 'center', editable: true },
    { field: 'totalPrice', headerName: '금액', minWidth: 100, align: 'center', editable: true },
    { field: 'completeStatus', headerName: '상태', minWidth: 100, align: 'center', editable: true },
    { field: 'checkStatus', headerName: '검사', minWidth: 100, align: 'center', editable: true },
];
export default outSourcingColumn;
