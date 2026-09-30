
(()=>{
 const root=document.documentElement;
 const saved=localStorage.getItem('csc-theme');
 if(saved) root.dataset.theme=saved;
 document.querySelectorAll('.theme-btn').forEach(b=>b.addEventListener('click',()=>{const n=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=n;localStorage.setItem('csc-theme',n)}));
 const menu=document.querySelector('.menu-btn'), panel=document.querySelector('.mobile-menu');
 if(menu&&panel){menu.addEventListener('click',()=>{const open=panel.classList.toggle('open');menu.setAttribute('aria-expanded',open);panel.setAttribute('aria-hidden',!open)});panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{panel.classList.remove('open');menu.setAttribute('aria-expanded','false')}));}
 if('IntersectionObserver' in window){root.classList.add('js-animations');const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));}
 const search=document.querySelector('#serviceSearch'), cards=[...document.querySelectorAll('.service-card')], pills=[...document.querySelectorAll('[data-filter]')], no=document.querySelector('#noResults');let filter='all';
 function apply(){if(!cards.length)return;const q=(search?.value||'').toLowerCase().trim();let count=0;cards.forEach(c=>{const okCat=filter==='all'||c.dataset.category===filter;const okQ=!q||c.dataset.service.toLowerCase().includes(q);const show=okCat&&okQ;c.hidden=!show;if(show)count++});if(no)no.hidden=count>0;}
 search?.addEventListener('input',apply);pills.forEach(p=>p.addEventListener('click',()=>{pills.forEach(x=>x.classList.remove('active'));p.classList.add('active');filter=p.dataset.filter;apply()}));
 const csearch=document.querySelector('#catalogSearch'), categories=[...document.querySelectorAll('.catalog-category')], ccount=document.querySelector('#catalogCount');
 function catalog(){if(!csearch)return;const q=csearch.value.toLowerCase().trim();let n=0;categories.forEach(cat=>{let inner=0;cat.querySelectorAll('.catalog-list a').forEach(a=>{const show=!q||a.textContent.toLowerCase().includes(q);a.hidden=!show;if(show){inner++;n++}});cat.hidden=inner===0});ccount.textContent=n+' services found';}
 csearch?.addEventListener('input',catalog);if(csearch)catalog();
 const form=document.querySelector('#enquiryForm');form?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(form);const mobile=String(f.get('mobile')||'').replace(/\D/g,'');if(mobile.length!==10){alert('कृपया 10-digit mobile number डालें.');return;}const text=`Namaste, main ${f.get('name')} hoon.\nVillage/Area: ${f.get('area')}\nMobile: ${mobile}\nService: ${f.get('service')}\nDetails: ${f.get('message')||'Please share required documents and availability.'}`;window.open('https://wa.me/917027494674?text='+encodeURIComponent(text),'_blank','noopener');});
 document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open){d.parentElement?.querySelectorAll('details').forEach(x=>{if(x!==d)x.open=false})}}));
})();
