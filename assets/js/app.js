
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('[data-menu-toggle]'), links=document.querySelector('[data-nav-links]');
 menu?.addEventListener('click',()=>{links.classList.toggle('open');menu.setAttribute('aria-expanded',links.classList.contains('open')?'true':'false')});
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const form=document.querySelector('[data-contact-form]');
 form?.addEventListener('submit',e=>{e.preventDefault();const status=form.querySelector('[data-form-status]');if(status)status.textContent='Thanks! This demo form is ready to connect to your email service or backend.';form.reset()});
});

document.addEventListener('click',e=>{
 const card=e.target.closest('.tool-card');
 if(!card)return;
 const r=card.getBoundingClientRect();
 card.style.setProperty('--ripple-x',`${e.clientX-r.left}px`);
 card.style.setProperty('--ripple-y',`${e.clientY-r.top}px`);
 card.classList.remove('ripple');
 void card.offsetWidth;
 card.classList.add('ripple');
 setTimeout(()=>card.classList.remove('ripple'),600);
});
