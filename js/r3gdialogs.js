const reduceD = gebi("ReduceDialog");
const reuseD = gebi("ReuseDialog");
const recycleD = gebi("RecycleDialog");
const Ds = [reduceD, reuseD, recycleD];

const reduceO = gebi("openReduce");
const reuseO = gebi("openReuse");
const recycleO = gebi("openRecycle");

function onCloseAnyAll(e) {
    document.body.style.overflow = "initial";
    window.onclick = null;

    for(const d of Ds) {
        if(!d.open) continue;
        if(!event.target.contains(d)) return;
    }

    for(const d of Ds) {
        d.close();
    }
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
        // dialog2open.style.pointerEvents = "none";
        dialog2open.showModal();

        let opened = true;
        window.onclick = function(e) {
            if(opened) {
                opened = false;
                return;
            }

            let d = document.elementFromPoint(e.clientX, e.clientY);
            for(const d1 of d.closest("dialog")) {
                if(d == dialog2open) return;
            }

            for(const d of Ds) {
                d.close();
            }
        }
    }
}

reduceO.onclick = genOpener(reduceD, [reuseD, recycleD]);

reuseO.onclick = genOpener(reuseD, [reduceD, recycleD]);

recycleO.onclick = genOpener(recycleD, [reduceD, reuseD]);


for(const d of Ds){
    d.onClose = onCloseAnyAll;
    // d.style.pointerEvents = "none";
    d.onclick = d.onClose;
}

