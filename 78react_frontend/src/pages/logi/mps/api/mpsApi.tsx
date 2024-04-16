import axios from 'axios';
import Swal from 'sweetalert2';

const getmpsData = async (startDate: any, endDate: any, dateSearchCondition: any) => {
  const params = {
    startDate: startDate,
    endDate: endDate,
    dateSearchCondition: dateSearchCondition
  };

  const response = await axios.get('http://localhost:9102/production/mps/list', { params: params });
  let datatata = response.data.gridRowJson;
  console.log('서버에서 받은 데이터 ㅇㅅㅇ???:', response.data.gridRowJson);

  return datatata;
};

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

