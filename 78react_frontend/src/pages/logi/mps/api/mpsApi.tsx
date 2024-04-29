import axios from 'axios';
import Swal from 'sweetalert2';

/* 
[78inhyuk]
mpsAxios에는 async ~ await 구조가 없는걸 알수있다
*/
const getmpsData = async (startDate: any, endDate: any, dateSearchCondition: any) => {
  const params = {
    startDate: startDate,
    endDate: endDate,
    dateSearchCondition: dateSearchCondition
  };

  // 주생산계획 - MPS 조회
  const response = await axios.get('http://localhost:9102/production/mps/list', { params: params });
  let datatata = response.data.gridRowJson;
  console.log('서버에서 받은 데이터 :', response.data.gridRowJson);

  return datatata;
};

// 주생산계획 - MPS 등록
const convertContractDetailToMps = (contract: any) => {
  console.log("contract : ", contract); //{key1:val1, key2:val2.....}
  axios.post("http://localhost:9102/production/mps/contractdetail",
      contract
  ).then(({data}) => {
      Swal.fire({
          icon: data.errorCode < 0 ? "error":"success",
          title: data.errorMsg
      });
  }).catch(e => {
      Swal.fire({
          icon: "error",
          title: e
      });
  });

}

export { getmpsData, convertContractDetailToMps };

