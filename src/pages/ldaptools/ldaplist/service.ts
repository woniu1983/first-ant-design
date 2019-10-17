import request from '@/utils/request';

export async function queryFakeList(params: { count: number }) {
  return request('/api/fake_list', {
    params,
  });
}

export async function queryDomainList() {
  return request('/api/getDomainList', {});
}
