import React, { ReactElement, useEffect, useState } from 'react';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import ColumnProps from '../../../../types/hr/salary/types';
import MyMgtTable from 'components/hr/salary/organisms/MyMgtTable';
import { Button, InputLabel, TextField } from '@mui/material';
import { OutSourcingTO } from 'types/logi/outsourcing/types';
import axios from 'axios';


// ==============================|| TABLE - STICKY HEADER ||============================== //

// ✔️columns information
const columns: ColumnProps[] = [
    { id: 'outsourcingNo', label: '외주일련번호', minWidth: 100, align: 'center', editable: true },
    { id: 'materialStatus', label: '자재출고상태', minWidth: 100, align: 'center', editable: true },
    { id: 'customerCode', label: '거래처코드', minWidth: 100, align: 'center', editable: true },
    { id: 'fromDate', label: '지시일', minWidth: 100, align: 'center', editable: true },
    { id: 'toDate', label: '완료일', minWidth: 100, align: 'center', editable: true },
    { id: 'itemCode', label: '품목코드', minWidth: 100, align: 'center', editable: true },
    { id: 'itemName', label: '품목명', minWidth: 100, align: 'center', editable: true },
    { id: 'unitPrice', label: '단위', minWidth: 100, align: 'center', editable: true },
    { id: 'instructAmount', label: '지시수량', minWidth: 100, align: 'center', editable: true },
    { id: 'unitPrice', label: '단가', minWidth: 100, align: 'center', editable: true },
    { id: 'totalPrice', label: '금액', minWidth: 100, align: 'center', editable: true },
    { id: 'completeStatus', label: '상태', minWidth: 100, align: 'center', editable: true },
    { id: 'checkStatus', label: '검사', minWidth: 100, align: 'center', editable: true },
];

function OutSourcing() {
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [customerCode, setCustomerCode] = useState(null);
    const [itemCode, setItemCode] = useState(null);
    const [materialStatus, setMaterialStatus] = useState(null);
    const [rowData, setRowData] = useState<OutSourcingTO[]>([]);

        
    useEffect(() => {
        fetchData();
    }, []);

    // ✔️지시일, 완료일
    const onChangeDate = (e: any) => {
        if (e.target.id === 'fromDate') {
            setFromDate(e.target.value);
            console.log('fromDate', e.target.value);
            console.log('❇️fromDate', fromDate);
        } else {
            setToDate(e.target.value);
            console.log('toDate', e.target.value);
            console.log('❇️toDate', toDate);
        }
    };

    // ✔️outsourcingSearch onclick function
    const outsourcingSearch = async () => {
        let param;
        param = {
            fromDate: fromDate,
            toDate: toDate,
            customerCode: customerCode,
            itemCode: itemCode,
            materialStatus: materialStatus
        }
        try {
            const response = await axios.get('http://localhost:9102/purchase/outsourcing/list', {
                params: param
            });

            const result = response.data;
            console.log(result);
            setRowData(response.data.outSourcingList);
        } catch (error) {
            console.error('외주 발주 조회 중 오류 발생: ', error);
        }
    };

    function fetchData() {
        outsourcingSearch();
    }

    // ✔️스타일 지정
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end' // 오른쪽 정렬
    };
    const textFieldStyle = {
        marginRight: '1vh', // 간격 조정
        flexGrow: 1, // TextField가 남은 공간을 모두 차지하도록 설정
        maxWidth: '120px' // 가로 크기 조정
    };

    return (
        <Page title="외주발주관리">
            <MainCard content={false}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 20, fontFamily: 'Verdana, Geneva, sans-serif' }}>외주 발주 관리</h2>
                    <div style={containerStyle}>
                        <InputLabel htmlFor="fromDate" style={{ marginRight: '1vh' }}>지시일</InputLabel>
                        <TextField id="fromDate" onChange={onChangeDate} type={'date'} style={textFieldStyle} defaultValue={fromDate} />
                        <InputLabel htmlFor="fromDate" style={{ marginRight: '1vh' }}>완료일</InputLabel>
                        <TextField id="toDate" onChange={onChangeDate} type={'date'} style={textFieldStyle} defaultValue={toDate} />
                    </div>
                    <div>
                        <Button variant="contained" color="primary" style={{ marginRight: 10 }} onClick={outsourcingSearch}>
                            조회
                        </Button>
                        <Button variant="contained" color="primary" style={{ marginRight: 10 }}>
                            등록
                        </Button>
                        <Button variant="contained" color="secondary">
                            삭제
                        </Button>
                    </div>
                </div>
                <MyMgtTable columns={columns} rowData={rowData} />
            </MainCard>
        </Page>
    );
}

OutSourcing.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default OutSourcing;
