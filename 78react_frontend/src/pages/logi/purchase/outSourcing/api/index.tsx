import logiApi from 'api/logiApi';

// ✔️조회
const GET_API_URL = '/purchase/outsourcing/list';

export const outSourcingListApi = async (param:string) => {
    try {
        const response = await logiApi.get(GET_API_URL, {
            params: { param }
        });
        console.log('있니?', response.data.gridRowJson);
        return response.data.gridRowJson;
    } catch (error) {
        console.log('error');
    }
}

