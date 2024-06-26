import React, { useState } from 'react';

// material-ui
import { Button, Grid, Stack, Box } from '@mui/material';

// project imports
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { MpsTO } from 'types/logi/mrp/types';
import MyCalendar from 'pages/utils/Mycalender';
import { today } from 'utils/hr/lib';
import Swal from 'sweetalert2';
import Mrpdialog from './Mrpdialog';
import MyDialog from 'pages/utils/MyDialog';

// assets
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';


// ==============================|| TABLE - COLLAPSIBLE ||============================== //

function MrpRegister() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [mrpDialog, setMrpDialog] = useState(false);
  const [contractData, setContractData] = useState<MpsTO[]>([]);
  const [selectedRows, setSelectedRows] = useState([]); // 선택된 행을 저장하기 위한 상태 추가


  const mrpClose = () => {
    setMrpDialog(false);
  };

  const mrpRegister = () => {
    console.log(selectedRows);

    if (selectedRows.length === 0 || (selectedRows.length === 1 && selectedRows[0] === undefined)) {
      Swal.fire('알림', '모의전개할 mps를 선택하십시오.', 'info');
      return;
    }
    
    setMrpDialog(true);
  }


  const theme = useTheme();

  const searchMps = async () => {
    try {
      const params = {
        startDate: startDate,
        endDate: endDate,
        includeMrpApply: 'excludeMrpApply'
      };
      
      const response = await axios.get('http://localhost:9102/production/mps/list', { params: params });

      setContractData(response.data.gridRowJson);
      console.log('서버에서 받은 데이터 ㅇㅁㅇ!!!:', response.data.gridRowJson);
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
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

  //MPS조회 행 클릭 시  선택된 정보 데이터 저장 로직
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end' // 오른쪽 정렬
  };

  //Table Data
  const Columns = [
    {
      headerName: 'MPS번호',
      field: 'mpsNo',
      minWidth: 150,
      suppressSizeToFit: true,
      headerCheckboxSelection: false,
      headerCheckboxSelectionFilteredOnly: true,
      suppressRowClickSelection: true,
      checkboxSelection: true,
      flex: 1
    },
    { headerName: '계획구분', field: 'mpsPlanClassification', minWidth: 100, flex: 1 },
    { headerName: '수주상세번호', field: 'contractDetailNo', minWidth: 150, flex: 1 },
    // { headerName: '판매계획', field: 'salesPlanNo', hide: true },
    { headerName: '품목코드', field: 'itemCode', minWidth: 100, flex: 1 },
    { headerName: '품목명', field: 'itemName', minWidth: 150, flex: 1 },
    { headerName: '단위', field: 'unitOfMps', minWidth: 80, flex: 1 },
    {
      headerName: 'MPS계획일자',
      field: 'mpsPlanDate',
      minWidth: 120,
      flex: 1
    },

    {
      headerName: '출하예정일',
      field: 'scheduledEndDate',
      minWidth: 120,
      flex: 1
    }
  ];
  return (
    <Page title="MRP(자재소요계획) 관리">
      <Grid item xs={12}>
        <div id="grid-wrapper">
          <MainCard
            content={false}
            title="MRP 등록"
            secondary={
              <Grid item xs={12} sm={6}>
                <MyCalendar onChangeDate={onChangeDate} />
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: '1vh', marginTop: '1vh' }}
                  onClick={() => searchMps()}
                >
                  MPS조회
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: '1vh', marginTop: '1vh' }}
                  name={'confirm'}
                  onClick={mrpRegister}
                >
                  MRP모의전개
                </Button>
              </Grid>
            }
          >
          </MainCard>
          <MainCard>
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
                rows={contractData}
                columns={Columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.mpsNo}
                checkboxSelection
                disableRowSelectionOnClick
                rowSelectionModel={selectedRows}
                onRowSelectionModelChange={(itm) => {
                  if (itm.length > 1) {
                    const itmSet = new Set(selectedRows);
                    const result = itm.filter((s) => !itmSet.has(s));
                    setSelectedRows(result);
                  } else if(itm.length = 1) {
                    setSelectedRows(itm)
                  } else {
                    setSelectedRows([null]);
                  }
                }}
                // processRowUpdate={processRowUpdate}
                // onProcessRowUpdateError={(error) => error}
              />
            </Box>
          </MainCard>
          <MyDialog open={mrpDialog} close={mrpClose} maxWidth={'sm'}>
                <Mrpdialog selectedRows={selectedRows} mrpClose={()=>mrpClose()} searchMps={()=>searchMps()}/>
          </MyDialog>
        </div>
      </Grid>
    </Page>
  );
}

export default MrpRegister;
