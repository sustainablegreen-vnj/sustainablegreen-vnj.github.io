const reduceD = gebi("ReduceDialog");
const reuseD = gebi("ReuseDialog");
const recycleD = gebi("RecycleDialog");

const reduceO = gebi("openReduce");
const reuseO = gebi("openReuse");
const recycleO = gebi("openRecycle");

function onCloseAnyAll() {
    console.log("close");
    document.body.style.overflow = "initial";
    window.onclick = null;

}

function onOpenAnyAll() {
    document.body.style.overflow = "hidden";
}

function genOpener(dialog2open, others){
    
    return function () {
        for(const d of others){
            d.close();
        }

        onOpenAnyAll();
        dialog2open.showModal();

        let opened = true;
        window.onclick = function() {
            if(opened) {
                opened = false;
                return;
            }
            console.log("click")
            for(const d of [reduceD, reuseD, recycleD]) {
                d.close();
            }
        }
    }
}

reduceO.onclick = genOpener(reduceD, [reuseD, recycleD]);

reuseO.onclick = genOpener(reuseD, [reduceD, recycleD]);

recycleO.onclick = genOpener(recycleD, [reduceD, reuseD]);


for(const d of [reduceD, reuseD, recycleD]){
    d.onClose = onCloseAnyAll;
    // d.style.pointerEvents = "none";
    d.onclick = d.onClose;
}

