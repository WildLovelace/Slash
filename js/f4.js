function rnd1(arr) { // 1-й способ
    let summ = 0;
    for (let i = 0; i < arr.length; i++)
        summ += arr[i]
    return summ
}

function rnd2(arr) { // 2-й способ
    let summ = 0;
    for (let i in arr)
        summ += arr[i]
    return summ
}

function measureTime(f, BigN) {
    let arr = []
    let starttime = new Date().valueOf()
    for (let i = 0; i < BigN; i++) {
        f(arr)
    }
    let endtime = new Date().valueOf()
    console.log(`время работы measureTime = ${(endtime - starttime) / 1000}`)
    return (endtime - starttime) / 1000 / BigN;
}
console.log(measureTime(rnd1, 10000000)) //1.7999999999999998e-9 1.7999999999999998e-9 1.7999999999999998e-9
//console.log(measureTime(rnd2, 10000000))//7.8e-9 8.2e-9 7.7e-9