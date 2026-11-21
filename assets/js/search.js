
document.addEventListener('DOMContentLoaded',()=>{
 const input=document.querySelector('[data-tool-search]'), cards=[...document.querySelectorAll('[data-tool-card]')], empty=document.querySelector('[data-empty-state]');
 if(!input)return;
 input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();let shown=0;cards.forEach(card=>{const match=card.textContent.toLowerCase().includes(q);card.hidden=!match;if(match)shown++});if(empty)empty.style.display=shown?'none':'block'});
});
