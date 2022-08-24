function getbasisF(f) {
}
test_2boolf(f, s){
    basisf = getbasisF(f)
    if (basisf != s)
        console.log("Fail on " f, "!=", s)
}
test_2boolf((x) => x, "x")
test_2boolf((x) => (x || true || false), "true")
test_2boolf((x) => (x || false), "x")
test_2boolf((x) => (x || false) || (x && true), "x")
test_2boolf((x) => (x == false), "!x")