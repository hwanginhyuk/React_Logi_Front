import axios from 'api/logiApi'; //'http://localhost:9102/logi'

export const searchMpsList = (param) => {
  axios.get('/production/searchMpsInfo', {
    params: {
      startDate: param.payload.startDate,
      endDate: param.payload.endDate
    }
  });
};

export const searchMrpList = () => {
  console.log('api 시작')
  return axios.get('/production/mrp/list', {
    params: {
      mrpGatheringStatusCondition: ""
    }
  });
  console.log('api 끝')
};

export const searchOpenMrpList = (param) => {
  return axios.get('/production/openMrp', {
    params: {
      mpsNoListStr: param
    }
  });
};

export const mrpInsert = (param) => {
  const formData = new FormData();

  formData.append('batchList', JSON.stringify(param.list));
  formData.append('mrpRegisterDate', param.date);

  axios.post(
    '/production/mrp', formData
  )
}

export const searchGetMpsList = (param) => {
  axios.get('/logistics/production/getMrpList', {
    params: {
      mrpGatheringStatusCondition: param.payload.mrpGatheringStatusCondition
    }
  });
}

  export const searchGatherList = (param) => {
    const mrpNoList = param.map(item => item.mrpNo);
    const mrpNoListString = mrpNoList.join(',');
  
    return axios.get('/production/mrp/gathering-list', {
      params: {
        mrpNoList: mrpNoListString
      }
    });
  };

export const mrpGatherInsert = (param) => {
  console.log(param);

  const mrpNoList = param.mrpList.map(item => item.mrpNo);
  const mrpNoListString = mrpNoList.join(',');

  const formData = new FormData();

  formData.append('mrpGatheringRegisterDate', param.Date);
  formData.append('mrpNoList', JSON.stringify(mrpNoListString));
  formData.append('mrpNoAndItemCodeList', JSON.stringify(param.mrpList));

  axios.post(
    '/production/mrp/gathering', formData
  );
}

export const searchMrpGathering = (param) => {
  console.log(param);
  return axios.get('/production/mrp/mrpgathering/list', {
    params: {
        searchDateCondition: param.daySelect,
        mrpGatheringStartDate: param.startDate,
        mrpGatheringEndDate: param.endDate,
      }
    }
  );
}

