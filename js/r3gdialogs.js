const reduceD = gebi("ReduceDialog");
const reuseD = gebi("ReuseDialog");
const recycleD = gebi("RecycleDialog");

const reduceO = gebi("openReduce");
const reuseO = gebi("openReuse");
const recycleO = gebi("openRecycle");

reduceO.onclick = function () {
    reduceD.showModal();
}

reuseO.onclick = function () {
    reuseD.showModal();
}

recycleO.onclick = function () {
    recycleD.showModal();
}