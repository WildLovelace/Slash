function testAZNum(str) {
    let a = str.match(/^[\d\sa-z]+$/g);
    return a != null;
}

function decode1_one(str) {
    let arr = str.split(",");
    let o = { a: arr[0], b: arr[1], n: arr[2] }
    o.a = arr[0];
    if (!testAZNum(o.a) || !testAZNum(o.b)) {
        return undefined;
    }
    o.n = Number(o.n);
    if (isNaN(o.n)) {
        return undefined;
    }
    return o;
}
function decode1(str) {
    let newstr = str.replace(/;\s*$/g, "");
    let arr = newstr.split(";");
    if (arr.length > 1) {
        let nstr1 = arr[0];
        let nstr2 = arr[1];
        if (decode1_one(nstr1) == undefined || decode1_one(nstr2) == undefined) {
            return undefined;
        }
        return decode1_one(nstr1), decode1_one(nstr2);
    }
    return decode1_one(newstr);
}
console.log(decode1(" a0, b0, rr")) //undefined
console.log(decode1(" a0, b0, 44; a1, b1, rr; ")) //undefined
console.log(decode1(" a0, !2, 44")) //undefined
console.log(decode1(" a0, b0, 44"))
console.log(decode1(" a0, b0, 44; a1, b1, 11; "))