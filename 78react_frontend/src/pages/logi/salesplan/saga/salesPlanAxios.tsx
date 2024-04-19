import axios from 'axios';
import Swal from 'sweetalert2';

// export const searchSalesPlanAvailable = (setSalesPlanDate: any, startDate: any, endDate: any) => {
  
//   axios
//     .get('http://localhost:9102/logi/sales/searchSalesPlan', {
//       params: {
//         startDate: startDate,
//         endDate: endDate,
//       }
//     })
//     .then(({ data }) => {
//       if (data.errorCode < 0) {
//         Swal.fire({
//           icon: data.errorCode < 0 ? 'error' : 'success',
//           title: data.errorMsg
//         });
//       }
//       setSalesPlanDate(data.gridRowJson);
//     })
//     .catch((error) => {
//       Swal.fire({
//         icon: 'error',
//         title: '오류 발생',
//         text: error.message || '서버에서 데이터를 가져오는 중 문제가 발생했습니다.'
//       });
//     });
// };

export const searchSalesPlanAvailable = (setSalesPlanDate: any, startDate: any, endDate: any) => {
  axios
    .get('http://localhost:9102/logi/sales/searchSalesPlan', {
      params: {
        startDate: startDate,
        endDate: endDate,
      }
    })
    .then(({ data }) => {
      setSalesPlanDate(data.gridRowJson);
    })
    .catch((e) => {
      Swal.fire({
        icon: 'error',
        title: e
      });
    });
};