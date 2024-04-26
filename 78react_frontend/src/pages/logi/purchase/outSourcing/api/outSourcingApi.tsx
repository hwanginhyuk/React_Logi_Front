import logiApi from 'api/logiApi';

// ✔️조회
const GET_API_URL = '/purchase/outsourcing/list';

export const outSourcingListApi = async (param: { fromDate: Date | null; toDate: Date | null }) => {
    try {
        const response = await logiApi.get(GET_API_URL, {
            params: param
        });
        console.log('있니?', response.data);
        return response.data;
    } catch (error) {
        console.log('error');
    }
}

