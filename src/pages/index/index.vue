<script setup lang="ts">
import XtxSwiper from '@/components/XtxSwiper.vue'
import { getHomeBannerAPI, getHomeCategoryAPI } from '@/services/home'
import { BannerItem, CategoryItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'

//获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  // console.log(res)
  bannerList.value = res.result
}

//获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
})
</script>

<template>
  <!-- 导航栏组件 -->
  <CustomNavbar></CustomNavbar>
  <!-- 轮播组件 -->
  <XtxSwiper :list="bannerList"></XtxSwiper>
  <!-- 类目面板 -->
  <CategoryPanel :list="categoryList"></CategoryPanel>

  <view class="index">index</view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
