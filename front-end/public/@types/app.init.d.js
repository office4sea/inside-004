/**
 * @typedef {BrApp & AppC & AppP} App
 * @typedef {(fn: ()=> void)=> void} AppC 
 * @typedef {object} AppP
 * @property {AppDebug} debug
 * @property {()=> void} uiModal 모달 팝업 UI처리
 * @property {(arg: App_modalParam)=> Promise<any>} modal 모달 팝업을 호출합니다.
 * @property {(focus: HTMLElement, message: string)=> Promise<void>} alert Alert 팝업을 호출합니다.
 * 
 * @typedef {object} App_modalParam
 * @property {HTMLElement} view 팝업뷰
 * @property {HTMLElement} focus 리턴 포커스
 * @property {object=} payload 팝업 전달 값
 */

/**
 * @typedef {BrDebug & AppDebugP} AppDebug
 * @typedef {object} AppDebugP
 * @property {(args: any)=> void} log 로그 출력
 */