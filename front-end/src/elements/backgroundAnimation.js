import React from 'react';


let backgroundAnimation = () => {

let holder = document.getElementById('holder')

let gs = 50;

window.onload = () => {
  for(let i = 0; i < gs; i++){
    for(let j = 0; j < gs; j++){
      let dot = document.createElement("div")
      dot.classList.add("dot")
      dot.style.animationDelay = `${i * j}ms`
      holder.appendChild(dot)
      
    }
  }
  
}


}

export default backgroundAnimation;