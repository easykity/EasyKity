
(() => {
 const root=document.documentElement, saved=localStorage.getItem('easykity-theme');
 if(saved) root.dataset.theme=saved;
 document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('[data-theme-toggle]');
  const update=()=>{if(btn) btn.textContent=root.dataset.theme==='dark'?'☀️':'🌙'};
  update();
  btn?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('easykity-theme',root.dataset.theme);update()});
 });
})();
