import logiApi from 'api/logiApi';

// ✔️외주발주조회

export const outSourcingListApi = async (param: { fromDate: string | null; toDate: string | null }) => {
    try {
        const response = await logiApi.get('/purchase/outsourcing/list', {
            params: param
        });
        console.log('있니?', response);
        return response;
    } catch (error) {
        console.log('error');
    }
}
/**
 * [78inhyuk]
 * response의 데이터 구조를 확인하고
 * 반환하여 Saga에서 데이터를 받아야 한다
 */

