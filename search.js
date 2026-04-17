/* StudyFix v5.0 — Global Search (Production) */
(function(){
"use strict";
SF.search={};
SF.search.init=()=>{
  const input=SF.$("#globalSearchInput");if(!input)return;
  input.addEventListener("input",e=>{SF.S.searchQ=e.target.value.trim();renderResults();});
  input.addEventListener("focus",()=>{if(SF.S.searchQ)renderResults();});
  document.addEventListener("click",e=>{if(!e.target.closest(".global-search"))SF.D.srchR?.classList.remove("open");});
  document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key==="k"){e.preventDefault();input.focus();}});
};

function renderResults(){
  try{
  const q=SF.S.searchQ.toLowerCase(),R=SF.D.srchR;
  if(!q){R.classList.remove("open");return;}
  const mentors=AppData.mentors.filter(m=>`${m.name} ${m.subjects.join(" ")} ${m.course}`.toLowerCase().includes(q)).slice(0,3);
  const notes=SF.U.allNotes().filter(n=>`${n.title} ${n.author}`.toLowerCase().includes(q)).slice(0,3);
  const exams=AppData.examResources.filter(r=>`${r.title} ${r.subject} ${r.author}`.toLowerCase().includes(q)).slice(0,3);
  if(!mentors.length&&!notes.length&&!exams.length){R.innerHTML='<div class="sr-empty">No results for "'+SF.escapeHtml(SF.S.searchQ)+'"</div>';R.classList.add("open");return;}
  let html="";
  const esc=SF.escapeHtml;
  if(mentors.length) html+='<div class="sr-section"><div class="sr-label">👤 Mentors</div>'+mentors.map(m=>`<div class="sr-item" data-sr-m="${m.id}"><div class="sr-avatar" style="background:${m.gradient}">${esc(m.initials)}</div><div class="sr-info"><h4>${esc(m.name)}</h4><p>${m.subjects.slice(0,2).map(s=>esc(s)).join(", ")}</p></div><div class="sr-meta">⭐ ${m.rating}</div></div>`).join("")+'</div>';
  if(notes.length) html+='<div class="sr-section"><div class="sr-label">📄 Notes</div>'+notes.map(n=>`<div class="sr-item" data-sr-n="${n.id}"><div class="sr-icon" style="background:${n.bg}">${n.icon}</div><div class="sr-info"><h4>${esc(n.title)}</h4><p>${esc(n.author)}</p></div></div>`).join("")+'</div>';
  if(exams.length) html+='<div class="sr-section"><div class="sr-label">🎯 Exam Prep</div>'+exams.map(r=>`<div class="sr-item" data-sr-e><div class="sr-icon" style="background:${r.bg}">${r.icon}</div><div class="sr-info"><h4>${esc(r.title)}</h4><p>${esc(r.subject)}</p></div></div>`).join("")+'</div>';
  R.innerHTML=html;R.classList.add("open");
  R.querySelectorAll("[data-sr-m]").forEach(el=>el.addEventListener("click",()=>{close();SF.mentors.openProfile(parseInt(el.dataset.srM));}));
  R.querySelectorAll("[data-sr-n]").forEach(el=>el.addEventListener("click",()=>{close();SF.nav.go("notes");}));
  R.querySelectorAll("[data-sr-e]").forEach(el=>el.addEventListener("click",()=>{close();SF.nav.go("exam-prep");}));
  }catch(e){console.error("Search render error:",e);}
}
function close(){SF.D.srchR.classList.remove("open");SF.S.searchQ="";SF.$("#globalSearchInput").value="";}
})();
