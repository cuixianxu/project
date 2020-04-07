// 防抖动  不想让函数平凡调用时 执行此函数 返回值为一个函数
export function debounce(func,delay){
         let timer = null
         return function (...args){
           if(timer) clearTimeout(timer)
           timer = setTimeout(() => {
             func.apply(this,args)
           },delay)
         }
       }