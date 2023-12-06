import { PageParams } from '@/types/global'
import { HotResult } from '@/types/hot'
import { http } from '@/utils/http'

type HotParams = PageParams & { subType?: string }
/**
 *
 * @param url 请求地址
 * @param data 请求参数
 */

export const getHotrecommendAPI = (url: string, data?: HotParams) => {
  return http<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
