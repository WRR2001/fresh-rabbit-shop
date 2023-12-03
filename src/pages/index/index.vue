<script setup lang="ts">
import XtxSwiper from '@/components/XtxSwiper.vue'
import { getHomeBannerAPI } from '@/services/home'
import { BannerItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'

const bannerList = ref<BannerItem[]>([])

const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  console.log(res)
  bannerList.value = res.result
}

onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <!-- 导航栏组件 -->
  <CustomNavbar></CustomNavbar>
  <!-- 轮播组件 -->
  <XtxSwiper :list="bannerList"></XtxSwiper>

  <view class="index">index</view>
</template>

<style lang="scss">
//
</style>
