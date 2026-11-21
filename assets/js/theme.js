(() => {
 const root=document.documentElement;
 const saved=localStorage.getItem('easykity-theme');
 root.dataset.theme=saved || 'dark';
 document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('[data-theme-toggle]');
  const update=()=>{if(btn){btn.textContent=root.dataset.theme==='dark'?'☀️':'🌙';btn.setAttribute('aria-label',root.dataset.theme==='dark'?'Switch to light mode':'Switch to dark mode')}};
  update();
  btn?.addEventListener('click',()=>{
   root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
   localStorage.setItem('easykity-theme',root.dataset.theme);
   update();
  });
 });
})();
