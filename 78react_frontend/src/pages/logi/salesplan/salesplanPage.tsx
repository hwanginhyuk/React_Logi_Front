import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Grid } from '@mui/material';
import { SalesPlanTO } from 'types/logi/salesplan/types';
import { searchSalesPlanAvailable } from './saga/salesPlanAxios';
import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { convertSalesPlan } from './api/salesplanApi';
import MyCalendar from 'pages/utils/Mycalender';
import salePlanlistcolumn from './component/salesPlanListColumn';


// ==============================|| TABLE - STICKY HEADER ||============================== //
function SalesPlan() {
    const [salesPlan, salesPlanTOList] = useState<SalesPlanTO[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [updatedRow, setUpdateRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]); // 선택된 행을 저장하기 위한 상태 추가
    const theme = useTheme();

    const processRowUpdate = (newRow: any) => {
        const newRows = { ...newRow };
        const existingIndex = updatedRow.findIndex(row => row.salesPlanNo === newRows.salesPlanNo);
        if (existingIndex !== -1) {
            const updatedRows = [...updatedRow];
            updatedRows[existingIndex] = { ...newRow };
            setUpdateRows(updatedRows);
        } else {
            setUpdateRows(prevRows => [...prevRows, { ...newRow }]);
        }
        return newRows;
    };

    const findSalesPlan = ({ data, selectedRows }: any) => {
        return [data.find(salesPlan => salesPlan.contractDetailNo === selectedRows[0])];
    };

    const uniqueSalesPlan = (salesPlan: any) => {
        const uniqueSalesPlan = {};

        salesPlan.forEach(salesPlan => {
            const { salesPlanDate } = salesPlan;
            if (!uniqueSalesPlan[salesPlanDate] || uniqueSalesPlan[salesPlanDate].index < salesPlan.indexOf(salesPlan)) {
                uniqueSalesPlan[salesPlanDate] = { index: salesPlan.indexOf(salesPlan), value: salesPlan };
            }
        });

        const uniqueSalesPlanArray = Object.values(uniqueSalesPlan).map(item => item.value);

        return uniqueSalesPlanArray;
    }

    const onClickSalesPlanInsert = () => {
        if (selectedRows.length === 0) {
            console.log(selectedRows);
            return Swal.fire({
                icon: 'error',
                title: '등록할 열을 선택해주세요'
            });
        }

        try {
            const data = findSalesPlan(uniqueSalesPlan(updatedRow), selectedRows)[0];

            if (
                data.salesPlanNo === null ||
                data.itemCode === null ||
                data.itemName === null ||
                data.salesPlanDate === '' ||
                data.dueDateOfSales === '' ||
                data.salesAmount === '' ||
                data.unitPriceOfSales === '' ||
                data.unitOfSales === '' ||
                data.sumPriceOfSales === '' ||
                data.mpsApplyStatus === '' ||
                data.description === ''
            ) {
                return Swal.fire({
                    icon: 'error',
                    title: '시작일과 종료일을 입력해주세요'
                });
            }
            data.mpsApplyStatus = "MPS적용상태"
            const newData = { ...data };
            newData.salesPlanDate = newData.salesPlanDate.toISOString().split('Y')[0];
            newData.salesPlanDate = newData.salesPlanDate.toISOString().split('N')[0];

            console.log('newData : ', newData);

            // 판매계획 등록 API를 호출하고 데이터를 서버로 보냅니다.
            convertSalesPlan(newData);
            onClickSearchSalesPlan();
            Swal.fire({
                icon: 'success',
                title: '판매계획 등록완료'
            }).then((result) => {
                onClickSearchSalesPlan();
            }).catch((err) => {
                console.log('판매계획등록오류', err)
            });
        } catch (error) {
            console.error('서버 요청 중 오류 발생: ', error);
            return Swal.fire({
                icon: 'error',
                title: '서버 요청 중 오류 발생'
            }).then((result) => {
                onClickSearchSalesPlan();
            }).catch((err) => {

            });
        }
    };

    const onChangeDate = (e: any) => {
        if (e.target.id === 'startDate') {
            setStartDate(e.target.value);
            console.log('startDate', e.target.value);
            console.log('❇️startDate', startDate);
        } else {
            setEndDate(e.target.value);
            console.log('endDate', e.target.value);
            console.log('❇️endDate', endDate);
        }
    };

    const onClickSearchSalesPlan = useCallback(() => {
        searchSalesPlanAvailable(salesPlanTOList, startDate, endDate);
        setUpdateRows([]);
    }, [startDate, endDate]);

    useEffect(() => {
        setSelectedRows([])
    }, [])

    return (
        <Page title="판매계획 관리">
            <Grid item xs={12}>
                <div id="grid-wrapper">
                    <MainCard
                        content={false}
                        title="판매계획 관리"
                        secondary={
                            <Grid item xs={12} sm={6}>
                                <div style={{ float: 'left' }}>
                                    <MyCalendar onChangeDate={onChangeDate} />
                                    <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={onClickSalesPlanInsert}>
                                        판매계획 등록
                                    </Button>
                                </div>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginRight: '1vh', marginTop: '1vh' }}
                                    onClick={onClickSearchSalesPlan}
                                >
                                    판매계획 조회
                                </Button>
                            </Grid>
                        }
                    >
                        <Box
                            sx={{
                                height: 500,
                                width: '100%',
                                '& .MuiDataGrid-root': {
                                    border: 'none',
                                    '& .MuiDataGrid-cell': {
                                        borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                    },
                                    '& .MuiDataGrid-columnsContainer': {
                                        color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                        borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                    },
                                    '& .MuiDataGrid-columnSeparator': {
                                        color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                    }
                                }
                            }}
                        >
                            <DataGrid
                                rows={salesPlan}
                                columns={salePlanlistcolumn}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                getRowId={(row) => row.salesPlanDate}
                                checkboxSelection
                                disableRowSelectionOnClick
                                onRowSelectionModelChange={(itm) => {
                                    if (itm.length > 1) {
                                        const itmSet = new Set(selectedRows);
                                        const result = itm.filter((s) => !itmSet.has(s));
                                        setSelectedRows(result);
                                        console.log(result)
                                    } else if (itm.length = 1) {
                                        console.log(itm)
                                        setSelectedRows(itm)
                                    } else {
                                        setSelectedRows([null]);    
                                    }
                                }}
                                rowSelectionModel={selectedRows}
                                processRowUpdate={processRowUpdate}
                                onProcessRowUpdateError={(error) => error}
                            />
                        </Box>
                    </MainCard>
                </div>
            </Grid>
        </Page>
    );
}

SalesPlan.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default SalesPlan;
