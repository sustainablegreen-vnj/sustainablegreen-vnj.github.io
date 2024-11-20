const skippybtn = gebi("skipanim");
const animables = qselectAll(".skippable");

function removeSkip() {
   skippybtn.remove();
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
   }
}

