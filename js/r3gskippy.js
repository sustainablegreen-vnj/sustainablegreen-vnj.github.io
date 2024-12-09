const skippybtn = gebi("skipanim");
const animables = qselectAll(".skippable");

function removeSkip() {
   skippybtn.remove();
   document.body.style.overflowY = "initial";
}

skippybtn.onclick = function(){
   removeSkip();
   for(const elem of animables) {
      elem.style.opacity = "1";
      elem.classList.remove("dram2-anim");
      elem.classList.remove("introyap-anim");
      elem.classList.remove("brd-anim");
      elem.classList.remove("donate-anim");
      elem.classList.remove("benefits-anim");
      elem.classList.remove("sources-anim");

      if("transpose" in elem.dataset){
         elem.style.transform = elem.dataset.transpose;
      }
   }
}

setTimeout(function(){
   removeSkip();
}, 3000);

