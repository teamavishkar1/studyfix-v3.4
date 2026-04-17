/* StudyFix v5.0 — Notes Library (Production) */
(function(){
"use strict";
SF.notes={};
const esc=SF.escapeHtml;

SF.notes.render=()=>{try{SF.S.notesBc=[];notesView();}catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Notes render error:",e);}};

function noteHtml(n){
  const pur=SF.U.purchased(n.id),free=!n.price||n.price===0,ok=free||pur,bm=SF.U.bookmarked("notes",n.id);
  const tag=free?'<span class="note-free">Free</span>':pur?'<span class="badge badge-purchased">✓ Purchased</span>':`<span class="note-price">₹${n.price}</span>`;
  const btn=ok?`<button class="note-dl-btn" data-dl="${n.id}" title="Download"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button>`:`<button class="note-dl-btn locked-btn" data-buy="${n.id}" title="Buy">🔒</button>`;
  return`<div class="card note-item card-animate ${!ok?"locked":""}"><button class="bm-btn note-bm ${bm?"active":""}" data-bm-n="${n.id}">♥</button><div class="note-icon" style="background:${n.bg}">${n.icon}</div><div class="note-info"><h4>${esc(n.title)} ${!free&&!pur?'<span class="badge badge-premium">PREMIUM</span>':""}</h4><p>by ${esc(n.author)}</p><div class="note-meta"><span>${n.type.toUpperCase()}</span><span>${n.pages||"?"} pages</span><span>${n.downloads} downloads</span>${tag}</div><div style="margin-top:2px">${SF.U.stars(n.rating||4.5)} <span style="font-size:.7rem;color:var(--text-4)">${n.rating||4.5}</span></div></div>${btn}</div>`;
}

function notesView(){
  try{
  const lv=SF.S.notesBc.length,bc=SF.S.notesBc;
  if(lv===0){
    const courses=AppData.notesCatalog.courses;
    SF.D.pg.innerHTML=`<div class="section-header"><h2>📚 Notes Library</h2></div>
      <div class="notes-search-wrap"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input type="text" id="nSrch" placeholder="Search notes..."/></div>
      <p style="font-size:.85rem;color:var(--text-3);margin-bottom:16px">Browse free & premium study materials.</p>
      <div class="folder-grid">${courses.map((c,i)=>`<div class="card card-click folder-card card-animate" data-ci="${i}"><div class="folder-icon">${c.icon}</div><h4>${esc(c.name)}</h4><p>${c.semesters.length} semesters</p></div>`).join("")}</div>
      ${SF.S.role==="senior"?'<button class="upload-bar mt-16" id="upBtn">📤 Upload Study Notes</button>':""}<div id="nSR" style="display:none;margin-top:16px"></div>`;
    noteSearch(courses);
    SF.D.pg.querySelectorAll("[data-ci]").forEach(c=>c.addEventListener("click",()=>{bc.push({t:"course",l:courses[parseInt(c.dataset.ci)].name,d:courses[parseInt(c.dataset.ci)]});notesView();}));
    setupUpload();return;
  }
  if(lv===1){const co=bc[0].d;SF.D.pg.innerHTML=`${bcHtml(bc)}<div class="section-header"><h2>${co.icon} ${esc(co.name)}</h2></div><div class="folder-grid">${co.semesters.map((s,i)=>`<div class="card card-click folder-card card-animate" data-si="${i}"><div class="folder-icon">📖</div><h4>Semester ${s.num}</h4><p>${s.subjects.length} subjects</p></div>`).join("")}</div>${SF.S.role==="senior"?'<button class="upload-bar mt-16" id="upBtn">📤 Upload Study Notes</button>':""}`;bcNav();SF.D.pg.querySelectorAll("[data-si]").forEach(c=>c.addEventListener("click",()=>{bc.push({t:"sem",l:`Semester ${co.semesters[parseInt(c.dataset.si)].num}`,d:co.semesters[parseInt(c.dataset.si)]});notesView();}));setupUpload();return;}
  if(lv===2){const sem=bc[1].d;SF.D.pg.innerHTML=`${bcHtml(bc)}<div class="section-header"><h2>📖 ${esc(bc[1].l)}</h2></div><div class="folder-grid">${sem.subjects.map((s,i)=>`<div class="card card-click folder-card card-animate" data-sbi="${i}"><div class="folder-icon">📂</div><h4>${esc(s.name)}</h4><p>${s.notes.length} notes</p></div>`).join("")}</div>${SF.S.role==="senior"?'<button class="upload-bar mt-16" id="upBtn">📤 Upload Study Notes</button>':""}`;bcNav();SF.D.pg.querySelectorAll("[data-sbi]").forEach(c=>c.addEventListener("click",()=>{bc.push({t:"subj",l:sem.subjects[parseInt(c.dataset.sbi)].name,d:sem.subjects[parseInt(c.dataset.sbi)]});notesView();}));setupUpload();return;}
  if(lv===3){
    const subj=bc[2].d,free=subj.notes.filter(n=>!n.price||n.price===0),paid=subj.notes.filter(n=>n.price&&n.price>0);
    SF.D.pg.innerHTML=`${bcHtml(bc)}<div class="section-header"><h2>📂 ${esc(subj.name)}</h2><span class="link">${subj.notes.length} notes</span></div>${paid.length?`<h4 style="font-size:.85rem;font-weight:700;margin-bottom:8px">⭐ Premium Notes</h4><div class="notes-list mb-16">${paid.map(n=>noteHtml(n)).join("")}</div>`:""}${free.length?`<h4 style="font-size:.85rem;font-weight:700;margin-bottom:8px">📄 Free Notes</h4><div class="notes-list">${free.map(n=>noteHtml(n)).join("")}</div>`:""}${SF.S.role==="senior"?'<button class="upload-bar mt-16" id="upBtn">📤 Upload Study Notes</button>':""}`;
    bcNav();bindActions();setupUpload();
  }
  }catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Notes view error:",e);}
}

function bindActions(){
  SF.D.pg.querySelectorAll("[data-dl]").forEach(b=>b.addEventListener("click",()=>{AppData.user.notesDownloaded++;SF.save();SF.ui.toast("📥","Downloaded!");}));
  SF.D.pg.querySelectorAll("[data-buy]").forEach(b=>b.addEventListener("click",()=>{
    const n=SF.U.findNote(parseInt(b.dataset.buy));if(!n)return;
    SF.pay.open({amount:n.price,title:`Purchase: ${n.title}`,description:`by ${n.author} · ${n.pages} pages`,onSuccess:()=>{
      if(!AppData.user.purchasedNotes)AppData.user.purchasedNotes=[];AppData.user.purchasedNotes.push(n.id);n.downloads++;AppData.user.notesDownloaded++;SF.save();SF.ui.toast("✅","Note purchased!");notesView();
    }});
  }));
  SF.D.pg.querySelectorAll("[data-bm-n]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();const id=parseInt(b.dataset.bmN);const added=SF.U.toggleBM("notes",id);b.classList.toggle("active",added);SF.ui.toast(added?"❤️":"💔",added?"Note bookmarked":"Removed");}));
}

function bcHtml(bc){let h='<div class="breadcrumb"><span data-bc="0">Courses</span>';bc.forEach((it,i)=>{h+=`<span class="sep">›</span><span ${i===bc.length-1?'class="current"':`data-bc="${i+1}"`}>${esc(it.l)}</span>`;});return h+"</div>";}

function bcNav(){SF.D.pg.querySelectorAll("[data-bc]").forEach(s=>s.addEventListener("click",()=>{SF.S.notesBc=SF.S.notesBc.slice(0,parseInt(s.dataset.bc));SF.D.pg.style.animation="none";void SF.D.pg.offsetWidth;SF.D.pg.style.animation="fadeUp .35s ease";notesView();}));}

function noteSearch(courses){SF.$("#nSrch")?.addEventListener("input",e=>{const q=e.target.value.toLowerCase().trim(),r=SF.$("#nSR");if(!q){r.style.display="none";return;}let all=[];courses.forEach(c=>c.semesters.forEach(s=>s.subjects.forEach(subj=>subj.notes.forEach(n=>{if(`${n.title} ${n.author} ${subj.name}`.toLowerCase().includes(q))all.push({...n,subject:subj.name});}))));r.style.display="block";r.innerHTML=all.length?`<h3 style="font-size:.9rem;font-weight:700;margin-bottom:10px">${all.length} results</h3><div class="notes-list">${all.map(n=>noteHtml(n)).join("")}</div>`:'<div class="empty"><p>No notes found.</p></div>';bindActions();});}

function setupUpload(){SF.$("#upBtn")?.addEventListener("click",()=>{SF.ui.modal("Upload Notes",`<div class="form-group mb-12"><label>Title</label><input type="text" id="upT" placeholder="e.g. DBMS Notes"/></div><div class="form-row mb-12"><div class="form-group"><label>Subject</label><input type="text" id="upS" placeholder="Data Structures"/></div><div class="form-group"><label>Price (₹, 0=free)</label><input type="number" id="upP" value="0"/></div></div><div class="file-upload mb-16"><div class="upload-icon">📎</div><p>Tap to select file</p></div><button class="btn btn-accent btn-block" id="subUp">Upload</button>`);SF.$("#subUp").addEventListener("click",()=>{SF.ui.closeModal();SF.ui.toast("📤","Notes uploaded!");});});}
})();
