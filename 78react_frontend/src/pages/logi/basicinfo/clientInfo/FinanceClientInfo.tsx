import useAsync from 'pages/utils/useAsync';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../api/index';
import { searchFinanInfo } from '../action/BasicInfoAction';
import BasicModal from 'components/basicInfo/BasicModal';

// project imports
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Layout from 'layout';
import MainCard from 'ui-component/cards/MainCard';

function FinanceClientInfo(props:any) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string[]>([]); // 선택된 아이템의 문자열 배열
  const [addOpenDialog, setAddOpenDialog] = useState(false);

  const FinanInfoList = useSelector((state) => state.basicinfo.FinanInfoList);
  console.log('저장값', FinanInfoList);

  const columns = {
    columnDefs: [
      {
        headerName: '금융거래처 코드',
        field: 'accountAssociatesCode',
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      { headerName: '사업장코드', field: 'workplaceCode', width: 140, editable: true },
      {
        headerName: '금융거래처명',
        field: 'accountAssociatesName',
        width: 200,
        editable: true
      },
      {
        headerName: '금융거래처타입',
        field: 'accountAssociatesType',
        width: 130,
        editable: true
      },
      { headerName: '계좌번호', field: 'accountNumber', editable: true },
      {
        headerName: '금융기관코드',
        field: 'financialInstituteCode',
        width: 100,
        editable: true
      },
      {
        headerName: '금융기관명',
        field: 'financialInstituteName',
        width: 100,
        editable: true
      }
    ]
  };

  const close = () => {
    setAddOpenDialog(false);
  };
  let resultList:any[] = [];

  const [result, FinanBatchSaveFetch] = useAsync((param:any) => api.saveFinanInfo(param), [], true);

  const batchSave = useCallback(() => {
    FinanBatchSaveFetch(resultList);
  }, [FinanBatchSaveFetch, resultList]);

  useEffect(() => {
    dispatch(searchFinanInfo({ searchCondition: 'ALL', workplaceCode: '' }));
  }, [result.data]);

  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = [name]; // 선택된 값 하나만 새 배열에 넣음
    }
    setSelected(newSelected);
  };

  //금융거래처 정보 추가
  const addClick = () => {
    setAddOpenDialog(true);
  };

  const saveClick = () => {
    let insertCount = 0;
    let updateCount = 0;
    let deleteCount = 0;

    FinanInfoList.forEach((rowObject:any) => {
      let status = rowObject.status;
      if (status === 'INSERT') {
        if (rowObject.customerName === '') {
          console.error('거래처명을 정확하게 입력해주세요.');
        } else {
          resultList.push(rowObject);
          insertCount++;
        }
      } else if (status === 'UPDATE') {
        resultList.push(rowObject);
        updateCount++;
      } else if (status === 'DELETE') {
        if (rowObject.deleteStatus !== 'LOCAL 삭제') {
          resultList.push(rowObject);
          deleteCount++;
        } else {
          // 삭제 작업 수행 (아래는 예시, 실제로 데이터를 삭제해야 함)
          console.log('삭제 작업 수행: ', rowObject);
        }
      }
    });

    let confirmMsg =
      (insertCount !== 0 ? insertCount + '개의 항목 추가\n' : '') +
      (updateCount !== 0 ? updateCount + '개의 항목 수정\n' : '') +
      (deleteCount !== 0 ? deleteCount + '개의 항목 삭제\n' : '') +
      '\r위와 같이 작업합니다. 계속하시겠습니까?';

    let confirmStatus = '';

    if (resultList.length !== 0) {
      confirmStatus = window.confirm(confirmMsg);
    }

    if (resultList.length !== 0 && confirmStatus) {
      batchSave(); //새로운 항목 추가 후 일괄저장 버튼 클릭 시 batchSave 호출함
    } else if (resultList.length !== 0 && !confirmStatus) {
      alert('취소되었습니다.');
    } else if (resultList.length === 0) {
      alert('추가/수정/삭제할 항목이 없습니다.');
    }
    resultList = [];
    // dispatch(saveWorkplace(ClientInfoList));
    // return Swal.fire({
    //   icon: 'success',
    //   title: '저장 되었습니다'
    // });
  };

  const delClick = () => {
    const selectedData = selected;

    if (selectedData.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    } else if (selectedData.length > 1) {
      if (!window.confirm('해당 정보들을 삭제 하시겠습니까?')) {
        return;
      } else {
        selectedData.forEach((rowObject) => {
          rowObject.status = 'DELETE';
        });
        saveClick();
      }
    } else if (selectedData.length === 1) {
      const rowObject = selectedData[0];
      if (!window.confirm('해당 ' + rowObject.accountAssociatesName + ' 정보를 지우시겠습니까?')) {
        return;
      } else {
        rowObject.status = 'DELETE';
        saveClick();
      }
    }
  };

  function financeClientInfoButton() {
    return (
      <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
        <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={addClick}>
          금융거래처 정보 추가
        </Button>
        <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={saveClick}>
          일괄저장
        </Button>
        <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={delClick}>
          삭제
        </Button>
      </Grid>
    );
  }
  console.log('FinanInfoList', FinanInfoList);
  return (
    <>
      <MainCard content={false} title="금융 거래처" secondary={financeClientInfoButton()}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.columnDefs.map((column) => (
                  <TableCell sx={{ py: 3 }} key={column.id} style={{ minWidth: column.minWidth, fontWeight: 'bold' }}>
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {FinanInfoList &&
                FinanInfoList.map((list: any, index: number) => {
                  const isSelected = selected.includes(list);
                  return (
                    <TableRow
                      key={index}
                      sx={{ py: 3 }}
                      hover
                      tabIndex={-1}
                      role="checkbox"
                      onClick={(event) => handleClick(event, list)}
                      selected={isSelected}
                    >
                      {columns.columnDefs.map((column) => (
                        <TableCell key={column.field}>{list[column.field] || 'No Data'}</TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <BasicModal open={addOpenDialog} onClose={close} title={'금융거래처 정보추가'} />
      </MainCard>
    </>
  );
}
FinanceClientInfo.getLayout = function getLayout(Page: ReactElement) {
  return <Layout>{Page}</Layout>;
};
export default FinanceClientInfo;
