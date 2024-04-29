import axios from 'api/logiApi'; //'http://localhost:9102/logi'

/**
 * [78inhyuk]
 * axios를 이용한 Api 호출 구현
 * FormData : JS 객체, 파일업로드 및 form 데이터 전송에 사용
 * FormData.append()를 사용하여 키값의 데이터를 생성
 * @param {*} param 
 * @returns 
 */

export const searchWorkSiteList = () => {
    return axios.get('/quality/workorder/list');
};

export const searchWorkSiteSituationList = (param) => {
    console.log(param);
    return axios.get('/quality/worksite/situation',{
        params: {
            workSiteCourse : param.workSiteCourse,
            workOrderNo: param.workOrderNo,
            itemClassIfication : param.itemClassIfication
        }
    });
};

export const workCompletion = (param) => {
  const formData = new FormData();

  formData.append('workOrderNo', param.props.workOrderNo);
  formData.append('itemCode', param.props.itemCode);
  formData.append('itemCodeList', JSON.stringify(param.itemCodes));

  console.log(param.props.workOrderNo);
  console.log(param.props.itemCode);
  console.log(param.itemCodes);

  axios.post(
    '/quality/workorder/workcompletion', formData
  )
}

export const searchWorkSiteLogList = (param) => {
  return axios.get('/quality/workorder/worksitelog',{
      params: {
          workSiteLogDate : param
      }
  });
};
