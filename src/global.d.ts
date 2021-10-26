/// <reference types="@sveltejs/kit" />
import { ymaps } from '@types/yandex-maps'

declare global {
	interface Window {
		ymaps: ymaps
	}
}

window.ymaps = ymaps || {}
