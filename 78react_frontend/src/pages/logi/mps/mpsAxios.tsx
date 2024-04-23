import axios from 'axios';
import Swal from 'sweetalert2';

//mrp에 적용하기 위한 mpsAxios 파일 생성
/*
searchContractDetailInMpsAvailable()가 setContractList의 데이터 구조를 가지고 도착하면
axios로 params를 컨트롤러로 넘겨준다
*/

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

/*
[78inhyuk]
mpsApi에서도 같은 것을 호출하고 있다.
mpsApi에서 호출하는 방식은 주로 fetch를 사용하며
mpsAxios에서 호출하는 방식이 axios사용하게 되어있다
현재 두개 모두 같은 함수를 호출하여 같은 axios를 호출하고 있으나 오류는 없다
이러한 경우는 성능의 문제를 일으킬 것이라고 판단한다 
*/ 

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

