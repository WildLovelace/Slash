function swap(arr, i1, i2) {
    let e = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = e
}

function partition(arr, l, r) {
    let med = arr[(l + r) / 2]
    let i = l
    let j = r
    for (; arr[i] < med; i++) {
    }
    for (; arr[j] > med; j--) {
    }
    if (i <= j) {
        swap(arr, l, r)
        i++;
        j--;
    }
    return i
}
function quicksort(arr, l, r) {
    let p = partition(arr, l, r)
    return arr
}
let arr = [6, 500, 7, 5, 5, 3, 1, 2, 2]
console.log(quicksort(arr, 0, arr.length - 1))