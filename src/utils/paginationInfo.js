export default {
   getPageingData(data){
    const pageNum = Number(data[0])
    const contentSize = Number(data[1])
    const pnSize = 10;
    const skipSize = (pageNum - 1) * contentSize;
    const resultData = {
        contentSize : contentSize,
        skipSize : skipSize
    }
    return resultData
   }
}