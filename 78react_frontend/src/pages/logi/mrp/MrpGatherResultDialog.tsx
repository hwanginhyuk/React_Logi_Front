import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import Swal from 'sweetalert2';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { getMrpGatherList, registerMrpGatherList } from 'pages/logi/mrp/redux/gatherToolkit';


const MrpGatherResultDialog = ({ mrpList, mrpGatherResultClose, getMrpList }:any) => {

    const [mrpGatherList, setMrpGatherList] = useState([]);
    const [Date, setDate] = useState('');

    const Columns = [
        { headerName: "구매 및 생산여부", field: "orderOrProductionStatus", flex: true},
        { headerName: "품목코드", field: "itemCode", flex: true },
        { headerName: "품목명", field: "itemName", width: 150 },
        { headerName: "단위", field: "unitOfMrpGathering", width: 100},
        { headerName: "지시일", field: "claimDate", flex: true },
        { headerName: "납기일", field: "dueDate", flex: true },
        { headerName: "필요수량", field: "necessaryAmount", flex: true },
    ];

    const theme = useTheme();

    const dispatch = useDispatch();

    const state = useSelector((state) => {
      return state.gather.gatherList;
    });

    useEffect(() => {
      dispatch(getMrpGatherList(mrpList));
    }, []);

    useEffect(() => {
      setMrpGatherList(state);
    }, [state]);

    const registerMrpGather = () => {
      try {
        dispatch(registerMrpGatherList({mrpList, Date}));
        mrpGatherResultClose()
        Swal.fire({
          icon: 'success',
          title: '소요량 취합 성공'
        }).then((result) => {
          getMrpList()
        }).catch((err) => {
          
        });
      } catch (error) {
        mrpGatherResultClose()
        Swal.fire({
          icon: 'error',
          title: '소요량 취합 실패'
        }).then((result) => {
          getMrpList()
        }).catch((err) => {
          
        });
      }
    };

  return (
    <>
    <MainCard
      title={'구매 및 생산 소요량 취합'}
      content={false}
      secondary={
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth label="등록일자"
            name="소요량 취합 등록일자"
            type={"date"}
            onChange={(event) => { setDate(event.target.value) }}
            InputLabelProps={{ shrink: true, }}
            style={{ width: '130px', height: '40px', marginRight: '2vh' }}
          />

          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: '1vh', marginTop: '1vh' }}
            onClick={() => registerMrpGather()}
          >
            취합 결과 등록
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
                rows={mrpGatherList}
                columns={Columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.itemCode}
              />
            </Box>
    </MainCard>
    </>
  );
};

export default MrpGatherResultDialog;