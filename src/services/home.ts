import { BannerItem } from '@/types/home'
import { http } from '@/utils/http'

/**
 * 首页广告区域-轮播图
 */
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
