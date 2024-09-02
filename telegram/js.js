/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function(arr, fn) {
    let narr =[]
    arr.forEach((e,i)=>{
        if(fn(e),i){
            narr.push(e)
        }
   })
      return narr
};