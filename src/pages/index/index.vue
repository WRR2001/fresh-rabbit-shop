<script setup lang="ts">
import XtxSwiper from '@/components/XtxSwiper.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
// import { XtxGuessInstance } from '@/types/component'
import PageSkeleton from './components/PageSkeleton.vue'
import { useGuessList } from '@/composables'

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

//获取热门推荐数据
const homehotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  homehotList.value = res.result
}

//是否加载中标记
const isLoading = ref(false)

//页面加载
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})

// //获取猜你喜欢组件实例
// const guessRef = ref<XtxGuessInstance>()
// //滚动触底
// const onscrolltolower = () => {
//   console.log('滚动触底')
//   guessRef.value?.getMore()
// }

// 猜你喜欢:获取组件实例+滚动触底加载更多
const { guessRef, onScrollTolower } = useGuessList()

const isTriggered = ref(false)
//自定义下拉刷新被触发
const OnRefresherrefresh = async () => {
  //开启刷新动画
  isTriggered.value = true
  //重新加载数据
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHomeHotData()

  //重置“猜你喜欢”数据
  guessRef.value?.resetData()
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore(),
  ])
  //结束刷新动画
  isTriggered.value = false
}
</script>

<template>
  <!-- 导航栏组件 -->
  <CustomNavbar></CustomNavbar>
  <!-- 滚动容器 -->
  <scroll-view
    class="scroll-view"
    scroll-y
    @scrolltolower="onScrollTolower"
    refresher-enabled
    @refresherrefresh="OnRefresherrefresh"
    :refresher-triggered="isTriggered"
  >
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading"></PageSkeleton>
    <!-- 正常页面 -->
    <template v-else>
      <!-- 轮播组件 -->
      <XtxSwiper :list="bannerList"></XtxSwiper>
      <!-- 类目面板 -->
      <CategoryPanel :list="categoryList"></CategoryPanel>
      <!-- 热门推荐 -->
      <HotPanel :list="homehotList"></HotPanel>
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef"></XtxGuess>
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>
