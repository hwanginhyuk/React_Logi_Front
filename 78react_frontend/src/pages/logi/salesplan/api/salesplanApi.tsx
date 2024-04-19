import axios from 'axios';
import Swal from 'sweetalert2';

const getsalesPlanData = async (startDate: any, endDate: any, salesPlanDate: any) => {
  const params = {
    startDate: startDate,
    endDate: endDate,
    salesPlanDate: salesPlanDate
  };

  // 판매계획 - 조회
  const response = await axios.get('http://localhost:9102/logi/sales/searchSalesPlan', { params: params });
  let data = response.data.gridRowJson;
  console.log('서버에서 받은 데이터 :', response.data.gridRowJson);

  return data;
};

// 판매계획 - 등록
const convertSalesPlan = (mpsApplyStatus: any) => {
  console.log("contract : ", mpsApplyStatus);
  axios.post("http://localhost:9102/logi/sales/save",
  mpsApplyStatus
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

export { getsalesPlanData, convertSalesPlan };

