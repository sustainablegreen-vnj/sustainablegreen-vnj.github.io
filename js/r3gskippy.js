const skippybtn = gebi("skipanim");
const drams = gebi("skipmepls");

function removeSkip() {
   skippybtn.remove();
}

skippybtn.onclick = function(){
   removeSkip();
   drams.classList.remove("dram2"
   );
}


