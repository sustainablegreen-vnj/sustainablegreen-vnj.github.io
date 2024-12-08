const skippybtn = gebi("skipanim");
const animables = qselectAll(".skippable");

function removeSkip() {
   skippybtn.remove();
}

skippybtn.onclick = function() {
   removeSkip();
   for(const elem of animables) {
      elem.style.opacity = "1";
      elem.classList.remove("yap1-anim");
      elem.classList.remove("dram-anim");
   }
}

setTimeout(function(){
    removeSkip();
 }, 2000);