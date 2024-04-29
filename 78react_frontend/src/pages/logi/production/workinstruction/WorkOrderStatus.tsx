import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Grid, Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

/** 
 * [78inhyuk]
 * 오류 및 소스코드 수정완료
*/

const WorkOrderStatus = () => {
    const [list, setList] = useState([]);
    const [selectRows, setSelectRows] = useState([]);

    const column = [
        {
            headerName: '작업지시일련번호',
            field: 'workOrderNo',
            minWidth: 150,
            flex: 1,
        },
        {
            headerName: '소요량취합번호',
            field: 'mrpGatheringNo',
            minWidth: 150,
            flex: 1,
        },
        { headerName: '품목분류', field: 'itemClassification' },
        { headerName: '품목코드', field: 'itemCode' },
        {
            headerName: '품목명',
            field: 'itemName',
            minWidth: 150,
            flex: 1,
        },
        { headerName: '단위', field: 'unitOfMrp', minWidth: 100, flex: 1, },
        { headerName: '지시수량', field: 'requiredAmount', minWidth: 90, flex: 1, },
        { headerName: '생산공정코드', field: 'productionProcessCode', minWidth: 100, flex: 1, },
        { headerName: '생산공정명', field: 'productionProcessName', minWidth: 130, flex: 1, },
        { headerName: '작업장코드', field: 'workSiteCode', minWidth: 100, flex: 1, },
        {
            headerName: '완료상태',
            field: 'completionStatus',
            minWidth: 50,
            cellRenderer: function (params) {
                if (params.value === 'Y') {
                    return '🟢';
                }
                return '❌';
            }
        },
        /**
         * [78inhyuk]
         * cellRenderer 함수를 이용하여 completionStatus의 값에 따라 params의 value값을 바꿔주는 로직
         */
        {
            headerName: '작업완료된수량',
            suppressSizeToFit: true,
            minWidth: 130,
            field: 'actualCompletionAmount',
            editable: true,
            cellRenderer: function (params) {
                console.log('오나요');
                if (params.value == null) {
                    return '📷';
                }
                return '📷' + params.value;
            }
        }
    ];

    const completionRegist = async () => {
        try {
            const workOrderNo = selectRows[0]
            const selectedItem = list.find(item => item.workOrderNo === workOrderNo);
            const actualCompletionAmount = selectedItem ? selectedItem.actualCompletionAmount : null;

            console.log(workOrderNo);
            console.log(actualCompletionAmount);

            await Axios.get('http://localhost:9102/quality/workorder/completion', {
                params: {
                    workOrderNo: workOrderNo,
                    actualCompletionAmount: actualCompletionAmount
                }
            })

            Swal.fire({
                icon: 'success',
                title: '작업완료'
            }).then((result) => {
                contractSearch();
            }).catch((err) => {

            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '작업실패'
            }).then((result) => {
                contractSearch();
            }).catch((err) => {

            });
        }

    };

    const contractSearch = () => {
        Axios.get('http://localhost:9102/quality/workorder/list')
            .then(response => {
                const responseList = response.data.gridRowJson;
                const conteactList = responseList.filter(obj => obj.operaioncompleted === null);
                setList(conteactList);
                console.log(conteactList);
            })
            .catch(e => {
                Swal.fire('오류', e, 'error');
            });
    };

    return (
        <>
            <MainCard
                content={false}
                title="작업지시현황"
                secondary={<Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: '1vh' }}
                        onClick={contractSearch}
                    >
                        작업지시현황조회
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        //style={{ marginTop: "1vh" }}
                        onClick={completionRegist}
                    >
                        작업완료등록
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
                        getRowId={(row) => row.workOrderNo}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        onRowSelectionModelChange={itm => {
                            if (itm.length > 1) {
                                const itmSet = new Set(selectRows);
                                const result = itm.filter((s) => !itmSet.has(s));

                                setSelectRows(result);
                            } else {
                                setSelectRows(itm);
                            }
                        }}
                        rowSelectionModel={selectRows}
                        onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
                            const updatedList = list.map(item => {
                                if (item.workOrderNo === params.row.workOrderNo) {
                                    const actualCompletionAmount = event.target.value;
                                    return { ...item, actualCompletionAmount: actualCompletionAmount };
                                } else {
                                    return item;
                                }
                            });
                            setList(updatedList);
                        }}
                    />
                </Box>
            </MainCard>
        </>
    );
}

export default WorkOrderStatus
