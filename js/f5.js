function shiftN1(arr, N) {
    let v = Math.min(arr.length, Math.abs(N))
    for (let i = 0; i < v; i++) {
        arr.pop()
        arr.unshift(undefined)
    }
    return arr
}
function shiftN2(arr, N) {
    for (let i = arr.length - 1; i >= 0; i--) {
        arr[i] = arr[i - N]
    }
    return arr
}
function test_time(f) {
    let arr = []
    let BigN = 1000000000
    let starttime = new Date().valueOf()
    for (let i = 0; i < BigN; i++) {
        f(arr)
    }
    let endtime = new Date().valueOf()
    return (endtime - starttime) / 1000 / BigN
}
function test_timeall(shift_fun, sizeArr) {
    let testarr = []
    for (let i = 0; i < sizeArr.length; i++) {
        testarr.push(0)
    }
    let times = []
    for (let pN = 0; pN < 100; pN += 10) { // нужно прибавлять к каждой итерации 10% от длины массива
        let N =  // посчитать N как процент равный pN от значения sizeArr
            let timeworkN = test_time(() => { shift_fun(testarr, N) })
        times.push(timeworkN) // сохранить timeworkN в массив times
    }
    return  // вывести на экран shift_fun , sizeArr и массив times
}
console.log(test_timeall(shiftN1, 100))
console.log(test_timeall(shiftN2, 100))