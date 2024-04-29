import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import {Button, Grid, Box} from "@mui/material";
import MyCalendar from 'pages/utils/Mycalender';
import { getOrderInfoList } from 'pages/logi/purchase/orderRegistInfo/redux/OrderInfoToolkit';

/**
 * [78inhyuk]
 * 오류 수정 및 소스코드 가시성 향상
 * @param param0 
 * @returns 
 */

const WorkInstruction = () => {
    const [list, setList] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const column = [
      { headerName: '발주번호', field: 'orderNo', minWidth: 170, flex: 1 },
      { headerName: '발주날짜', field: 'orderDate', minWidth: 100, flex: 1 },
      { headerName: '현재상태', field: 'orderInfoStatus', minWidth: 100, flex: 1 },
      { headerName: '발주유형', field: 'orderSort', minWidth: 100, flex: 1 },
      { headerName: '품목코드', field: 'itemCode', minWidth: 100, flex: 1 },
      { headerName: '품목명', field: 'itemName', minWidth: 150, flex: 1 },
      { headerName: '발주수량', field: 'orderAmount', minWidth: 100, flex: 1 },
      { headerName: "원재료검사", field: "inspectionStatus", minWidth: 100, flex: 1 },
    ]

    const dispatch = useDispatch();

    /**
     * [78inhyuk]
     * state이 unknown형식으로 나타나는 이유는 TypeScript에서 변수의 형식이 명확하지
     * 않기 때문이다
     * 상태추론이 가능하지 않기 때문에 주로 발생한다
     * 해결방법
     * 반환형식을 명시적으로 지정 (인터페이스로 타입을 만든다던가)
     * as를 사용하여 타입추론을 안하게 한다 (추천안함)
     */

    const orderInfoListState = useSelector((state) => {
      return state.orderInfo.orderInfoList;
    });

    useEffect(() => {
      setList(orderInfoListState);
    }, [orderInfoListState])

    const searchOrderInfoList = () => {
      dispatch(getOrderInfoList({ startDate, endDate }));
    }

    const onChangeDate = (e) => {
        if (e.target.id === 'startDate') {
          setStartDate(e.target.value);
        } else {
          setEndDate(e.target.value);
        }
    };

    return (
        <>
            <MainCard
                content={false}
                title={
                    '발주현황 조회'
                }
                secondary={
                    <Grid item xs={12} sm={6}>
                    <MyCalendar onChangeDate={onChangeDate} />
                    <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={() => searchOrderInfoList()} >
                      소요량 취합 결과 조회
                    </Button>
                  </Grid>
                }
            >
                <Box
                sx={{
                height: 400,
                width: '100%',
                background: 'white'
                }}
                >
                <DataGrid
                rows={list}
                columns={column}
                getRowId={(row) => row.orderNo}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableRowSelectionOnClick
                />
                </Box>

            </MainCard>
        </>
    );
}

export default WorkInstruction
