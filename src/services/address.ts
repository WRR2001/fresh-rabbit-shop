import { AddressItem, AddressParams } from '@/types/address'
import { http } from '@/utils/http'

/**
 * 添加请求参数
 * @param data 请求参数
 
 */
export const postMemberAddressAPI = (data: AddressParams) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

/**
 * 获取收货地址列表
 */
export const getMemberAddressAPI = () => {
  return http<AddressItem[]>({
    method: 'GET',
    url: '/member/address',
  })
}
