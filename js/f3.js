function quicksort(arr) {
    if (arr.length < 2)
        return arr
    let l = arr.length
    let m = Math.floor(l / 2)
    for (let i = 0; i < l; i++) {
        if (arr[i] > arr[m]) {
            for (let j = l; j > 0; j--) {
                if (arr[j] < arr[m]) {
                    let v = arr[i]
                    arr[i] = arr[j]
                    arr[j] = v
                }
            }
        }
    }
    return arr
}
console.log(quicksort([1, 8, 7, 4, 0, 3, 4, 5, 7]))