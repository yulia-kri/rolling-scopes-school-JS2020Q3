(()=>{"use strict";var e={337:(e,t,s)=>{s.d(t,{Md:()=>c,U:()=>u,Bi:()=>p});class i{constructor(e,t){this.puzzle=e,this.index=t,this.isEmpty=!1,this.draggingCell=!1,this.cellWidth=this.puzzle.width/this.puzzle.dimension,this.cellHeight=this.cellWidth,this.elem=this.createElem(),this.index===this.puzzle.dimension*this.puzzle.dimension-1?(this.isEmpty=!0,this.elem.classList.add("empty"),this.elem.addEventListener("dragover",this.dragOver),this.elem.addEventListener("dragenter",this.dragEnter),this.elem.addEventListener("dragleave",this.dragLeave),this.elem.addEventListener("drop",(e=>{this.elem.classList.contains("hovered")&&this.elem.classList.remove("hovered");const t=this.puzzle.findEmpty(),s=this.puzzle.findDraggingCell();this.preSwapCells(s,t,e)}))):this.setBg(),this.puzzle.playingBoard.append(this.elem)}createElem(){const e=document.createElement("div");return e.style.width=this.cellWidth+"px",e.style.height=this.cellHeight+"px",e.addEventListener("click",(e=>{const t=this.puzzle.findPosition(this.index),s=this.puzzle.findEmpty();this.preSwapCells(t,s,e)})),e.addEventListener("dragstart",(()=>{this.draggingCell=!0,this.dragStart()})),e.addEventListener("dragend",(()=>{this.dragEnd()})),e}dragStart(){this.elem.className+=" hold",setTimeout((()=>this.elem.className="invisible"),0)}dragEnd(){this.elem.className="fill",this.puzzle.cells.find((e=>e.draggingCell)).draggingCell=!1}dragOver(e){e.preventDefault()}dragEnter(e){e.preventDefault(),this.classList.add("hovered")}dragLeave(){this.classList.remove("hovered")}preSwapCells(e,t,s){const{x:i,y:n}=this.getCoordinates(e),{x:l,y:a}=this.getCoordinates(t);i!==l&&n!==a||1!==Math.abs(i-l)&&1!==Math.abs(n-a)||(this.puzzle.isSoundOn&&this.playSound(),this.puzzle.numberOfMoves+=1,this.puzzle.displayMoves.innerText="Moves: "+this.puzzle.numberOfMoves,"click"===s.type?this.puzzle.swapCells(e,t,!0):this.puzzle.swapCells(e,t,!1))}setBg(){if(this.elem.classList.add("fill"),this.elem.setAttribute("draggable",!0),null==this.puzzle.imageSrc)this.elem.innerText=this.index+1;else{const{left:e,top:t}=this.getPositionFromIndex(this.index),s=document.createElement("img");s.src=this.puzzle.imageSrc,s.onload=()=>{this.elem.style.background=`url(${this.puzzle.imageSrc})`,this.elem.style.backgroundSize=`${this.puzzle.width}px ${this.puzzle.width}px`,this.elem.style.backgroundPosition=`-${e}px -${t}px`}}}setPosition(e,t,s){const{left:i,top:n}=this.getPositionFromIndex(e),{left:l,top:a}=this.getPositionFromIndex(s);t?i!==l?this.animate("left",l,i):n!==a&&this.animate("top",a,n):(this.elem.style.left=i+"px",this.elem.style.top=n+"px")}getPositionFromIndex(e){const{x:t,y:s}=this.getCoordinates(e);return{left:this.cellWidth*t,top:this.cellHeight*s}}getCoordinates(e){return{x:e%this.puzzle.dimension,y:Math.floor(e/this.puzzle.dimension)}}animate(e,t,s){const i=10*Math.abs(s-t)/300,n=setInterval((()=>{t<s?(t=Math.min(s,t+i))>=s&&clearInterval(n):(t=Math.max(s,t-i))<=s&&clearInterval(n),this.elem.style[e]=t+"px"}),10)}playSound(){const e=new Audio("Woosh 03.wav");e.currentTime=0,e.volume=.3,e.play()}}class n{constructor(e){this.container=null,this.playingBoard=null,this.displayMoves=null,this.displayMoves=null,this.dimension=e.dimension||4,this.imageSrc=e.image,this.isSoundOn=!0,this.width=400,this.cells=[],this.numberOfMoves=0}init(){this.container=document.createElement("div"),this.container.classList.add("container"),this.playingBoard=document.createElement("div"),this.playingBoard.classList.add("game-board");const e=document.createElement("div");e.classList.add("playing-board__overlay","visible"),e.innerText="Play",e.addEventListener("click",p),this.state=document.createElement("div"),this.state.classList.add("state");const t=document.createElement("button");t.classList.add("play-button"),t.innerText="Start",this.state.append(t),t.addEventListener("click",p),this.displayMoves=document.createElement("div"),this.displayMoves.innerText="Moves: 0",this.state.append(this.displayMoves),this.displayTime=document.createElement("div"),this.displayTime.dataset.id="time",this.displayTime.innerText="Time: 00:00",this.state.append(this.displayTime),document.body.append(this.state),document.body.append(this.container),this.container.prepend(e),this.container.append(this.playingBoard),this.createCells()}createCells(){for(let e=0;e<this.dimension*this.dimension;e++)this.cells.push(new i(this,e));this.shuffleCells()}shuffleCells(){for(let e=this.cells.length-1;e>0;e--){const t=Math.floor(Math.random()*e);this.swapCells(e,t)}}swapCells(e,t,s){this.cells[e].setPosition(t,s,e),this.cells[t].setPosition(e),[this.cells[e],this.cells[t]]=[this.cells[t],this.cells[e]],this.checkBoard()&&alert(`Ура! Вы решили головоломку за ${this.displayTime.innerText} и ${this.numberOfMoves} ходов`)}checkBoard(){for(let e=0;e<this.cells.length;e++)if(e!=this.cells[e].index)return!1;return!0}findPosition(e){return this.cells.findIndex((t=>t.index===e))}findEmpty(){return this.cells.findIndex((e=>e.isEmpty))}findDraggingCell(){return this.cells.findIndex((e=>e.draggingCell))}destroy(){this.container.parentNode.removeChild(this.container),this.state.parentNode.removeChild(this.state)}}function l(){const e=document.querySelector('[data-option="on"]'),t=document.querySelector('[data-option="off"]');!0!==this.checked?(c.puzzle.isSoundOn=!0,e.classList.add("active"),t.classList.remove("active")):(c.puzzle.isSoundOn=!1,t.classList.add("active"),e.classList.remove("active"))}function a(){return`https://raw.githubusercontent.com/irinainina/image-data/master/box/${Math.floor(150*Math.random())+1}.jpg`}const c={},d={};c.puzzle=new n(d);let o=!0,r=0,h=0;function m(e){return(parseInt(e,10)<10?"0":"")+e}function p(){const e=document.querySelector(".play-button"),t=document.querySelector(".playing-board__overlay");o=!o,!0===o?(e.innerText="Start",t.classList.add("visible")):(e.innerText="Pause",t.classList.remove("visible"))}function u(){const e=document.querySelector(".popup"),t=document.querySelector(".blackout"),s=document.querySelector(".play-button"),i=document.querySelector(".playing-board__overlay");e.classList.contains("visible")&&t.classList.contains("visible")?(e.classList.remove("visible"),t.classList.remove("visible"),!0!==o||i.classList.contains("visible")||(o=!1,s.innerText="Pause")):(e.classList.add("visible"),t.classList.add("visible"),!1===o&&(o=!0,s.innerText="Paused"))}c.puzzle.init(),function e(){const t=document.querySelector('[data-id="time"]');if(o){let e=t.innerText.split(":");r=parseInt(e[1]),h=parseInt(e[2]),t.innerText=`Time: ${m(r)}:${m(h)}`}else 59===r&&59===h&&(r=0,h=0),59===h?(r+=1,h=0):h+=1,t.innerText=`Time: ${m(r)}:${m(h)}`;setTimeout(e,1e3)}(),function(){const e=document.createElement("div");e.classList.add("blackout"),e.addEventListener("click",u),document.body.prepend(e)}(),function(){const e=document.createElement("button");e.classList.add("settings-button"),e.insertAdjacentHTML("afterbegin",'<svg height="48" viewBox="0 0 480 480" width="48" xmlns="http://www.w3.org/2000/svg"><path d="m409.28125 288c-3.683594 13.160156-8.921875 25.835938-15.601562 37.761719l44.320312 44.316406-67.921875 67.921875-44.316406-44.320312c-11.925781 6.679687-24.601563 11.917968-37.761719 15.601562v62.71875h-96v-62.71875c-13.160156-3.683594-25.835938-8.921875-37.761719-15.601562l-44.316406 44.320312-67.921875-67.921875 44.320312-44.316406c-6.679687-11.925781-11.917968-24.601563-15.601562-37.761719h-62.71875v-96h62.71875c3.683594-13.160156 8.921875-25.835938 15.601562-37.761719l-44.320312-44.316406 67.921875-67.921875 44.316406 44.320312c11.925781-6.679687 24.601563-11.917968 37.761719-15.601562v-62.71875h96v62.71875c13.160156 3.683594 25.835938 8.921875 37.761719 15.601562l44.316406-44.320312 67.921875 67.921875-44.320312 44.316406c6.679687 11.925781 11.917968 24.601563 15.601562 37.761719h62.71875v96zm0 0" fill="#d8d7da"/><path d="m396.800781 272c-4.109375 20.046875-12.042969 39.113281-23.359375 56.160156l41.917969 41.917969-45.28125 45.28125-41.917969-41.917969c-17.046875 11.316406-36.113281 19.25-56.160156 23.359375v59.199219h-32v-152c35.347656 0 64-28.652344 64-64s-28.652344-64-64-64v-152h32v59.199219c20.046875 4.109375 39.113281 12.042969 56.160156 23.359375l41.917969-41.917969 45.28125 45.28125-41.917969 41.917969c11.316406 17.046875 19.25 36.113281 23.359375 56.160156h59.199219v64zm0 0" fill="#c6c5ca"/><g fill="#9bfbff"><path d="m127.03125 127.03125c-9.375 9.371094-9.375 24.570312-.003906 33.945312 9.375 9.371094 24.570312 9.371094 33.945312 0 9.371094-9.375 9.371094-24.574218-.003906-33.945312-9.371094-9.367188-24.566406-9.367188-33.9375 0zm0 0"/><path d="m128 240c0 13.253906-10.746094 24-24 24s-24-10.746094-24-24 10.746094-24 24-24 24 10.746094 24 24zm0 0"/><path d="m127.03125 319.03125c-9.375 9.371094-9.375 24.570312-.003906 33.945312 9.375 9.371094 24.570312 9.371094 33.945312 0 9.371094-9.375 9.371094-24.574218-.003906-33.945312-9.371094-9.367188-24.566406-9.367188-33.9375 0zm0 0"/><path d="m264 376c0 13.253906-10.746094 24-24 24s-24-10.746094-24-24 10.746094-24 24-24 24 10.746094 24 24zm0 0"/><path d="m319.03125 319.03125c-9.375 9.371094-9.375 24.570312-.003906 33.945312 9.375 9.371094 24.570312 9.371094 33.945312 0 9.371094-9.375 9.371094-24.574218-.003906-33.945312-9.371094-9.367188-24.566406-9.367188-33.9375 0zm0 0"/><path d="m400 240c0 13.253906-10.746094 24-24 24s-24-10.746094-24-24 10.746094-24 24-24 24 10.746094 24 24zm0 0"/><path d="m352.96875 160.96875c9.375-9.371094 9.375-24.570312.003906-33.945312-9.375-9.371094-24.570312-9.371094-33.945312 0-9.371094 9.375-9.371094 24.574218.003906 33.945312 9.371094 9.367188 24.566406 9.367188 33.9375 0zm0 0"/></g><path d="m304 240c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0" fill="#ffc477"/><path d="m264 104c0 13.253906-10.746094 24-24 24s-24-10.746094-24-24 10.746094-24 24-24 24 10.746094 24 24zm0 0" fill="#9bfbff"/><path d="m472 184h-56.734375c-3.117187-9.757812-7.042969-19.234375-11.738281-28.335938l40.121094-40.121093c3.121093-3.121094 3.121093-8.1875 0-11.3125l-67.878907-67.878907c-3.175781-3-8.140625-3-11.3125 0l-40.121093 40.121094c-9.101563-4.699218-18.578126-8.625-28.335938-11.738281v-56.734375c0-4.417969-3.582031-8-8-8h-96c-4.417969 0-8 3.582031-8 8v56.734375c-9.757812 3.113281-19.234375 7.039063-28.335938 11.738281l-40.121093-40.121094c-3.121094-3.121093-8.1875-3.121093-11.3125 0l-67.878907 67.878907c-3.121093 3.125-3.121093 8.191406 0 11.3125l40.121094 40.121093c-4.695312 9.101563-8.621094 18.578126-11.738281 28.335938h-56.734375c-4.417969 0-8 3.582031-8 8v96c0 4.417969 3.582031 8 8 8h56.734375c3.117187 9.757812 7.042969 19.234375 11.738281 28.335938l-40.121094 40.121093c-3.121093 3.121094-3.121093 8.1875 0 11.3125l67.878907 67.878907c3.125 3.121093 8.191406 3.121093 11.3125 0l40.121093-40.121094c9.101563 4.699218 18.578126 8.625 28.335938 11.738281v56.734375c0 4.417969 3.582031 8 8 8h96c4.417969 0 8-3.582031 8-8v-56.734375c9.757812-3.113281 19.234375-7.039063 28.335938-11.738281l40.121093 40.121094c3.121094 3.121093 8.1875 3.121093 11.3125 0l67.878907-67.878907c3.121093-3.125 3.121093-8.191406 0-11.3125l-40.121094-40.121093c4.695312-9.101563 8.621094-18.578126 11.738281-28.335938h56.734375c4.417969 0 8-3.582031 8-8v-96c0-4.417969-3.582031-8-8-8zm-8 96h-54.679688c-3.578124 0-6.722656 2.378906-7.695312 5.824219-3.558594 12.558593-8.570312 24.660156-14.9375 36.054687-1.765625 3.136719-1.222656 7.0625 1.328125 9.601563l38.664063 38.671875-56.566407 56.558594-38.664062-38.710938c-2.539063-2.546875-6.46875-3.089844-9.601563-1.320312-11.382812 6.363281-23.476562 11.371093-36.023437 14.921874-3.445313.972657-5.824219 4.113282-5.824219 7.695313v54.703125h-80v-54.679688c0-3.578124-2.378906-6.722656-5.824219-7.695312-12.558593-3.554688-24.660156-8.566406-36.054687-14.9375-3.132813-1.769531-7.0625-1.226562-9.601563 1.320312l-38.664062 38.664063-56.566407-56.558594 38.710938-38.671875c2.550781-2.539062 3.09375-6.46875 1.328125-9.601562-6.359375-11.382813-11.371094-23.472656-14.929687-36.015625-.972657-3.453125-4.128907-5.832031-7.71875-5.824219h-54.679688v-80h54.679688c3.578124 0 6.722656-2.378906 7.695312-5.824219 3.558594-12.558593 8.570312-24.660156 14.9375-36.054687 1.765625-3.136719 1.222656-7.0625-1.328125-9.601563l-38.664063-38.632812 56.566407-56.566407 38.664062 38.679688c2.539063 2.546875 6.46875 3.089844 9.601563 1.320312 11.382812-6.363281 23.476562-11.371093 36.023437-14.921874 3.453125-.972657 5.832031-4.128907 5.824219-7.71875v-54.679688h80v54.679688c0 3.578124 2.378906 6.722656 5.824219 7.695312 12.558593 3.554688 24.660156 8.566406 36.054687 14.9375 3.132813 1.769531 7.0625 1.226562 9.601563-1.320312l38.664062-38.671876 56.566407 56.566407-38.710938 38.671875c-2.550781 2.539062-3.09375 6.46875-1.328125 9.601562 6.359375 11.382813 11.371094 23.472656 14.929687 36.015625.972657 3.445313 4.113282 5.824219 7.695313 5.824219h54.703125zm0 0"/><path d="m240 136c17.671875 0 32-14.328125 32-32s-14.328125-32-32-32-32 14.328125-32 32 14.328125 32 32 32zm0-48c8.835938 0 16 7.164062 16 16s-7.164062 16-16 16-16-7.164062-16-16 7.164062-16 16-16zm0 0"/><path d="m144 176c15.265625.003906 28.410156-10.777344 31.390625-25.75s-5.027344-29.96875-19.132813-35.8125c-14.101562-5.84375-30.371093-.914062-38.855468 11.78125-8.484375 12.691406-6.820313 29.609375 3.972656 40.40625 5.988281 6.019531 14.132812 9.394531 22.625 9.375zm-11.3125-43.3125c4.019531-4.160156 9.964844-5.828125 15.5625-4.363281 5.59375 1.464843 9.960938 5.832031 11.425781 11.425781 1.464844 5.597656-.203125 11.542969-4.363281 15.5625-6.328125 6.046875-16.296875 6.046875-22.625 0-6.246094-6.25-6.246094-16.375 0-22.625zm0 0"/><path d="m136 240c0-17.671875-14.328125-32-32-32s-32 14.328125-32 32 14.328125 32 32 32 32-14.328125 32-32zm-32 16c-8.835938 0-16-7.164062-16-16s7.164062-16 16-16 16 7.164062 16 16-7.164062 16-16 16zm0 0"/><path d="m144 304c-15.265625-.003906-28.410156 10.777344-31.390625 25.75s5.027344 29.96875 19.132813 35.8125c14.101562 5.84375 30.371093.914062 38.855468-11.78125 8.484375-12.691406 6.820313-29.609375-3.972656-40.40625-5.988281-6.019531-14.132812-9.394531-22.625-9.375zm11.3125 43.3125c-6.328125 6.046875-16.296875 6.046875-22.625 0-6.25-6.25-6.25-16.378906 0-22.628906 6.246094-6.25 16.378906-6.25 22.625 0 6.25 6.25 6.25 16.378906 0 22.628906zm0 0"/><path d="m240 344c-17.671875 0-32 14.328125-32 32s14.328125 32 32 32 32-14.328125 32-32-14.328125-32-32-32zm0 48c-8.835938 0-16-7.164062-16-16s7.164062-16 16-16 16 7.164062 16 16-7.164062 16-16 16zm0 0"/><path d="m336 304c-15.265625-.003906-28.410156 10.777344-31.390625 25.75s5.027344 29.96875 19.132813 35.8125c14.101562 5.84375 30.371093.914062 38.855468-11.78125 8.484375-12.691406 6.820313-29.609375-3.972656-40.40625-5.988281-6.019531-14.132812-9.394531-22.625-9.375zm11.3125 43.3125c-6.328125 6.046875-16.296875 6.046875-22.625 0-6.25-6.25-6.25-16.378906 0-22.628906 6.246094-6.25 16.378906-6.25 22.625 0 6.25 6.25 6.25 16.378906 0 22.628906zm0 0"/><path d="m376 208c-17.671875 0-32 14.328125-32 32s14.328125 32 32 32 32-14.328125 32-32-14.328125-32-32-32zm0 48c-8.835938 0-16-7.164062-16-16s7.164062-16 16-16 16 7.164062 16 16-7.164062 16-16 16zm0 0"/><path d="m336 176c15.265625.003906 28.410156-10.777344 31.390625-25.75s-5.027344-29.96875-19.132813-35.8125c-14.101562-5.84375-30.371093-.914062-38.855468 11.78125-8.484375 12.691406-6.820313 29.609375 3.972656 40.40625 5.988281 6.019531 14.132812 9.394531 22.625 9.375zm-11.3125-43.3125c4.019531-4.160156 9.964844-5.828125 15.5625-4.363281 5.59375 1.464843 9.960938 5.832031 11.425781 11.425781 1.464844 5.597656-.203125 11.542969-4.363281 15.5625-6.328125 6.046875-16.296875 6.046875-22.625 0-6.246094-6.25-6.246094-16.375 0-22.625zm0 0"/><path d="m336 240c-.058594-52.996094-43.003906-95.941406-96-96-4.417969 0-8 3.582031-8 8s3.582031 8 8 8c44.183594 0 80 35.816406 80 80s-35.816406 80-80 80c-4.417969 0-8 3.582031-8 8s3.582031 8 8 8c52.996094-.058594 95.941406-43.003906 96-96zm0 0"/><path d="m312 240c0-39.765625-32.234375-72-72-72s-72 32.234375-72 72 32.234375 72 72 72c39.746094-.042969 71.957031-32.253906 72-72zm-128 0c0-30.929688 25.070312-56 56-56s56 25.070312 56 56-25.070312 56-56 56c-30.914062-.035156-55.964844-25.085938-56-56zm0 0"/></svg>'),e.addEventListener("click",u),document.body.prepend(e)}(),function(){const e=document.createElement("div");e.classList.add("popup"),e.innerHTML='\n    <div id="start-game">Start new game</div>\n    <div>\n      <label for="field-size">Field size:</label>\n      <select name="dimension" id="field-size" class="dimension-select">\n        <option value="4">4x4</option>\n        <option value="3">3x3</option>\n        <option value="8">8x8</option>\n      </select>\n    </div>\n    <div class="mode">\n      Mode:\n      <label>\n        <input type="radio" name="mode" data-mode value="num" checked />\n        <span>Numbers</span>\n      </label>\n      <label>\n        <input type="radio" name="mode" value="img" data-mode/>\n        <span>Picture</span>\n      </label>\n    </div>\n    <div class="sound-switch">\n      Sound:\n      <div class="switch">\n        <span data-option="on" class="switch__option active">on</span>\n        <label class="switch__area">\n          <input type="checkbox" id="sound-switcher"/>\n          <span class="switch__slider"></span>\n        </label>\n        <span data-option="off" class="switch__option">off</span>\n      </div>\n    </div>\n    ',document.body.prepend(e)}();const v=document.getElementById("start-game"),g=document.getElementById("field-size"),z=document.querySelectorAll("[data-mode]"),f=document.getElementById("sound-switcher");function y(e){const t=e.target.value;switch(t){case"num":d.image=null;break;case"img":d.image=a();break;default:d.dimension=t}b()}function b(){c.puzzle.destroy(),c.puzzle=null,null!=d.image&&(d.image=a()),c.puzzle=new n(d),c.puzzle.init(),f.checked=!1,l.apply(f)}v.addEventListener("click",b),g.addEventListener("change",y),z.forEach((e=>e.addEventListener("change",y))),f.addEventListener("change",l)}},t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={exports:{}};return e[i](n,n.exports,s),n.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s(337)})();