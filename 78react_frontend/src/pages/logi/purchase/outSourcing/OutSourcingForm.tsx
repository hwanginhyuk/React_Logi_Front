import React, { ChangeEvent, ReactElement, useState } from 'react';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { Button, InputLabel, TextField } from '@mui/material';
import outSourcingColumn from './columes/outSourcingColumn';
import { useDispatch, useSelector } from 'store';
import { DataGrid } from '@mui/x-data-grid';
import { fetchOutSourcingRequest } from './actions/outSourcingAction';

// ==============================|| TABLE - STICKY HEADER ||============================== //
function OutSourcing() {
    const [fromDate, setStartDate] = useState<string | null>('');
    const [toDate, setEndDate] = useState<string | null>('');

    const dispatch = useDispatch();

    const outSourcingList = useSelector((state) => {
        return state.outSourcing.outSourcingList
    })
    console.log("outSourcingList?", outSourcingList)

    /**
     * [78inhyuk]
     * outsourcing 조회기능 추가 및 소스코드 추가
     * 콜백함수 사용
     */
    // ✔️outsourcingSearch onclick function
    const outsourcingSearch = () => {
        const requestData = {
            fromDate: fromDate,
            toDate: toDate
        };
        dispatch(fetchOutSourcingRequest(requestData));
    };

    // ✔️지시일, 완료일
    const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'fromDate') {
            setStartDate(e.target.value);
            console.log('fromDate', e.target.value)
        } else {
            setEndDate(e.target.value);
            console.log('toDate', e.target.value)
        }
    };

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
                <DataGrid
                    rows={outSourcingList}
                    columns={outSourcingColumn}
                    getRowId={(row) => row.outsourcingNo} // 각 행의 id로는 새로 추가된 outsourcingNo 속성을 사용
                    checkboxSelection />
            </MainCard>
        </Page>
    );
}

OutSourcing.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default OutSourcing;
