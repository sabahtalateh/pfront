/// <reference types="@sveltejs/kit" />
import { ymaps } from '@types/yandex-maps'

declare global {
  interface Window {
    ymaps: ymaps
    localStorage: any
    navigator: any
  }
}

window.ymaps = ymaps || {}
