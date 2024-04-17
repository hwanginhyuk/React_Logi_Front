import axios from 'axios';
import Swal from 'sweetalert2';

//mrp에 적용하기 위한 mpsAxios 파일 생성

export const searchContractDetailInMpsAvailable = (setContractList: any, startDate: any, endDate: any) => {
  // MPS - MPS 등록 가능 조회
  console.log(startDate);
  console.log(endDate);
  axios
    .get('http://localhost:9102/production/mps/contractdetail-available', {
      params: {
        startDate: startDate,
        endDate: endDate,
        searchCondition: 'contractDate'
      }
    })
    .then(({ data }) => {
      console.log('data1 : ', data);
      if (data.errorCode < 0) {
        Swal.fire({
          icon: data.errorCode < 0 ? 'error' : 'success',
          title: data.errorMsg
        });
      }
      setContractList(data.gridRowJson);
    })
    .catch((e) => {
      Swal.fire({
        icon: 'error',
        title: e
      });
    });
};
export const convertContractDetailToMps = (contract: any) => {
  console.log('contract : ', contract); //{key1:val1, key2:val2.....}
  axios
    .post('http://localhost:9102/production/mps/contractdetail', contract)
    .then(({ data }) => {
      Swal.fire({
        icon: data.errorCode < 0 ? 'error' : 'success',
        title: data.errorMsg
      });
    })
    .catch((e) => {
      Swal.fire({
        icon: 'error',
        title: e
      });
    });
};


export const searchMpsInfoInMrp = (setContractList: any, calendarDate: any) => {
  console.log('calendarDate1 : ', calendarDate);
  axios
    .get('http://localhost:9102/production/mps/list', {
      params: {
        startDate: calendarDate.startDate,
        endDate: calendarDate.endDate,
        searchCondition: 'includeMrpApply' //includeMrpApply -> searchCondition : 'contractDate'로 수정
      }
    })
    .then(({ data }) => {
      setContractList(data.gridRowJson);
    })
    .catch((e) => {
      Swal.fire({
        icon: 'error',
        title: e
      });
    });
};

