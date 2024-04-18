import React, { ReactElement, useEffect, useState } from 'react';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import MyMgtTable from 'components/hr/salary/organisms/MyMgtTable';
import { Button, InputLabel, TextField } from '@mui/material';
import { SalesPlanTO } from 'types/logi/salesplan/types';
import ColumnProps from 'types/logi/mps/types';


// ==============================|| TABLE - STICKY HEADER ||============================== //

// ✔️columns information
const columns: ColumnProps[] = [
    { id: 'salesPlanNo', label: '판매계획일련번호', minWidth: 100, align: 'center', editable: true },
    { id: 'itemCode', label: '품목코드', minWidth: 100, align: 'center', editable: true },
    { id: 'itemName', label: '품목명', minWidth: 100, align: 'center', editable: true },
    { id: 'salesPlanDate', label: '판매계획일', minWidth: 100, align: 'center', editable: true },
    { id: 'dueDateOfSales', label: '계획마감일', minWidth: 100, align: 'center', editable: true },
    { id: 'salesAmount', label: '계획수량', minWidth: 100, align: 'center', editable: true },
    { id: 'unitPriceOfSales', label: '계획단가', minWidth: 100, align: 'center', editable: true },
    { id: 'unitOfSales', label: '단위', minWidth: 100, align: 'center', editable: true },
    { id: 'sumPriceOfSales', label: '합계액', minWidth: 100, align: 'center', editable: true },
    { id: 'mpsApplyStatus', label: 'MPS적용상태', minWidth: 100, align: 'center', editable: true },
    { id: 'description', label: '설명', minWidth: 100, align: 'center', editable: true },
];

function SalesPlan() {
    const [rowData, setRowData] = useState<SalesPlanTO[]>([]);


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
        <Page title="판매계획관리">
            <MainCard content={false}>
                <div  className="Divstyle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 20, fontFamily: 'Verdana, Geneva, sans-serif' }}>판매계획관리</h2>
                    <div style={containerStyle}>
                        <InputLabel htmlFor="fromDate" style={{ marginRight: '1vh' }}>지시일</InputLabel>
                        <TextField id="fromDate" type={'date'} style={textFieldStyle} />
                        <InputLabel htmlFor="fromDate" style={{ marginRight: '1vh' }}>완료일</InputLabel>
                        <TextField id="toDate" type={'date'} style={textFieldStyle} />
                    </div>
                    <div>
                        <Button variant="contained" color="primary" style={{ marginRight: 10 }} >
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

SalesPlan.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default SalesPlan;
