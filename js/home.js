/* StudyFix v5.0 — Home Page, Recommendations, Requests, Saved, Exam Prep (Production) */
(function(){
"use strict";
SF.home={};
SF.home.render=()=>{
  SF.ui.loading('home');
  setTimeout(()=>{try{renderHome();}catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Home render error:",e);}},SF.K.LOAD_MS);
};

function renderHome(){
  const u=AppData.user,rec=SF.U.recommend(u),esc=SF.escapeHtml;
  const lb=[...AppData.mentors].sort((a,b)=>b.rating-a.rating||b.sessionsCompleted-a.sessionsCompleted).slice(0,5);
  const tn=SF.U.allNotes().sort((a,b)=>b.downloads-a.downloads).slice(0,5);
  const up=AppData.sessions.filter(s=>s.status==="upcoming").sort((a,b)=>(a.calendarDate||"").localeCompare(b.calendarDate||""))[0];
  const reqs=AppData.mentorRequests.filter(r=>r.status==="open").slice(0,2);
  const countdown=up?SF.ui.countdownBadge(up):"";

  SF.D.pg.innerHTML=`
    <div class="apple-home">

      <!-- HERO -->
      <div class="apple-hero">
        <h1>Learn Faster with<br>Top Seniors</h1>
        <p class="apple-hero-sub">Book 1-on-1 mentoring sessions, access premium study notes, and improve your exam performance.</p>
        <div class="apple-hero-btns">
          <button class="apple-btn apple-btn-primary" id="hMentors">Find Mentors</button>
          <button class="apple-btn apple-btn-secondary" id="hNotes">Browse Notes</button>
        </div>
      </div>

      ${up?`
      <!-- UPCOMING SESSION -->
      <div class="apple-section" style="padding-bottom:0;border-bottom:none">
        <div class="apple-card apple-upcoming">
          <div class="up-session-avatar" style="background:${up.mentorGradient};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.8rem">${esc(up.mentorInitials)}</div>
          <div class="up-session-info" style="flex:1">
            <h4 style="font-size:.9rem;font-weight:700">${esc(up.title)}</h4>
            <p style="font-size:.78rem;color:#6e6e73">${esc(up.mentorName)} · ${esc(up.subject)}</p>
          </div>
          <div style="text-align:right">
            <div style="font-size:.82rem;font-weight:700;color:#0071e3">${esc(up.time)}</div>
            <div style="font-size:.7rem;color:#6e6e73">${esc(up.date)}</div>
            ${countdown?`<div data-countdown-date="${up.calendarDate}" data-countdown-time="${up.time}" class="countdown-badge" style="margin-top:4px">⏱ Loading...</div>`:""}
          </div>
          ${up.meetingLink?`<a href="${up.meetingLink}" target="_blank" class="apple-btn apple-btn-primary" style="padding:8px 16px;font-size:.78rem">Join</a>`:""}
        </div>
      </div>
      `:""}

      <!-- TOP MENTORS -->
      <div class="apple-section">
        <div class="apple-section-header">
          <h2 class="apple-section-title">Learn from Top Mentors</h2>
          <p class="apple-section-subtitle">Verified senior students with high CGPA, ready to help you succeed.</p>
        </div>
        <div class="apple-mentor-scroll">${rec.map(m=>SF.mentors.card(m)).join("")}</div>
        <div style="text-align:center;margin-top:8px"><span class="apple-section-link" id="hAllM">View all mentors →</span></div>
      </div>

      <!-- POPULAR NOTES (clickable) -->
      <div class="apple-section">
        <div class="apple-section-header">
          <h2 class="apple-section-title">Popular Study Notes</h2>
          <p class="apple-section-subtitle">Top-downloaded notes from the best students on campus.</p>
        </div>
        <div class="apple-notes-grid">${tn.map(n=>`
          <div class="apple-card apple-note-card apple-fade-up clickable-note" data-note-click="1">
            <div class="apple-note-icon" style="background:${n.bg}">${n.icon}</div>
            <h4>${esc(n.title)}</h4>
            <div class="apple-note-author">${esc(n.author)}</div>
            <div class="apple-note-dl">📥 ${n.downloads} downloads</div>
          </div>
        `).join("")}</div>
        <div style="text-align:center;margin-top:20px"><span class="apple-section-link" id="hAllN">View all notes →</span></div>
      </div>

      <!-- HOW IT WORKS -->
      <div class="apple-section">
        <div class="apple-section-header">
          <h2 class="apple-section-title">How StudyFix Works</h2>
          <p class="apple-section-subtitle">Three simple steps to better grades.</p>
        </div>
        <div class="apple-steps">
          <div class="apple-card apple-step apple-fade-up">
            <div class="apple-step-icon">🔍</div>
            <h4>Find a Mentor</h4>
            <p>Browse verified senior students in your subject area.</p>
          </div>
          <div class="apple-card apple-step apple-fade-up">
            <div class="apple-step-icon">📅</div>
            <h4>Book a Session</h4>
            <p>Schedule a 1-on-1 learning session at your convenience.</p>
          </div>
          <div class="apple-card apple-step apple-fade-up">
            <div class="apple-step-icon">🚀</div>
            <h4>Improve Your Grades</h4>
            <p>Learn faster and perform better in your exams.</p>
          </div>
        </div>
      </div>

      <!-- STATS -->
      <div class="apple-section">
        <div class="apple-section-header">
          <h2 class="apple-section-title">Early Student Success</h2>
          <p class="apple-section-subtitle">Growing faster every week — powered by real students.</p>
        </div>
        <div class="apple-stats">
          <div class="apple-card apple-stat apple-fade-up"><div class="apple-stat-num">50+</div><div class="apple-stat-label">Students</div></div>
          <div class="apple-card apple-stat apple-fade-up"><div class="apple-stat-num">8+</div><div class="apple-stat-label">Mentors</div></div>
          <div class="apple-card apple-stat apple-fade-up"><div class="apple-stat-num">120+</div><div class="apple-stat-label">Sessions</div></div>
          <div class="apple-card apple-stat apple-fade-up"><div class="apple-stat-num">95%</div><div class="apple-stat-label">Satisfaction</div></div>
        </div>
      </div>

      <!-- WHY STUDYFIX -->
      <div class="apple-section">
        <div class="apple-section-header">
          <h2 class="apple-section-title">Why StudyFix</h2>
          <p class="apple-section-subtitle">Everything you need to learn better, in one place.</p>
        </div>
        <div class="apple-features">
          <div class="apple-card apple-feature apple-fade-up">
            <div class="apple-feature-icon">✅</div>
            <h4>Verified Senior Mentors</h4>
            <p>Learn from high-CGPA students who've already aced these courses.</p>
          </div>
          <div class="apple-card apple-feature apple-fade-up">
            <div class="apple-feature-icon">💰</div>
            <h4>Affordable Learning</h4>
            <p>Sessions cheaper than any coaching — starting at just ₹99.</p>
          </div>
          <div class="apple-card apple-feature apple-fade-up">
            <div class="apple-feature-icon">📚</div>
            <h4>Premium Study Notes</h4>
            <p>Access high-quality notes curated by top-performing seniors.</p>
          </div>
          <div class="apple-card apple-feature apple-fade-up">
            <div class="apple-feature-icon">⚡</div>
            <h4>Fast Doubt Solving</h4>
            <p>Quick, targeted help right before exams when you need it most.</p>
          </div>
        </div>
      </div>

      <!-- LEARNING REQUESTS -->
      <div class="apple-section" style="border-bottom:none">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <h2 class="apple-section-title" style="margin-bottom:0;font-size:1.4rem">Learning Requests</h2>
          <span class="apple-section-link" id="hReqs">View all →</span>
        </div>
        ${reqs.length?`<div class="request-cards">${reqs.map(r=>`<div class="apple-card request-card card-animate" style="margin-bottom:12px"><div class="rq-top"><div class="rq-avatar">${esc(r.studentInitials)}</div><div class="rq-meta"><h4>${esc(r.studentName)}</h4><span>${esc(r.date)}</span></div><span class="badge badge-price">₹${r.budget}</span></div><div class="rq-body"><div style="font-weight:600;font-size:.85rem">${esc(r.subject)}</div><p style="font-size:.82rem;color:var(--text-3)">${esc(r.topic)}</p></div>${SF.S.role==="senior"?`<button class="apple-btn apple-btn-primary accept-req" style="width:100%;margin-top:10px;padding:10px;font-size:.82rem" data-rq="${r.id}">Accept Request</button>`:""}</div>`).join("")}</div>`:'<div class="apple-card" style="text-align:center;padding:28px"><p style="font-size:.88rem;color:#6e6e73">No open requests right now.</p></div>'}
      </div>

    </div>`;

  // --- Intersection Observer for fade-up animations ---
  const fadeEls=SF.D.pg.querySelectorAll(".apple-fade-up");
  if(fadeEls.length&&"IntersectionObserver" in window){
    const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);}});},{threshold:0.15});
    fadeEls.forEach(el=>obs.observe(el));
  } else { fadeEls.forEach(el=>el.classList.add("visible")); }

  // --- Event listeners ---
  SF.$("#hMentors")?.addEventListener("click",()=>SF.nav.go("mentors"));
  SF.$("#hNotes")?.addEventListener("click",()=>SF.nav.go("notes"));
  SF.$("#hAllN")?.addEventListener("click",()=>SF.nav.go("notes"));
  SF.$("#hAllM")?.addEventListener("click",()=>SF.nav.go("mentors"));
  SF.$("#hReqs")?.addEventListener("click",()=>SF.nav.go("requests"));

  // Popular Notes cards → clickable, navigate to notes
  SF.D.pg.querySelectorAll(".clickable-note").forEach(c=>c.addEventListener("click",()=>SF.nav.go("notes")));

  SF.D.pg.querySelectorAll("[data-qa]").forEach(c=>c.addEventListener("click",()=>SF.nav.go(c.dataset.qa)));
  SF.D.pg.querySelectorAll("[data-lm]").forEach(c=>c.addEventListener("click",()=>SF.mentors.openProfile(parseInt(c.dataset.lm))));
  SF.D.pg.addEventListener("click",e=>{const c=e.target.closest("[data-mentor-id]");if(c&&!e.target.closest(".bm-btn"))SF.mentors.openProfile(parseInt(c.dataset.mentorId));});
  SF.D.pg.querySelectorAll("[data-bm-m]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();const id=parseInt(b.dataset.bmM);const a=SF.U.toggleBM("mentors",id);b.classList.toggle("active",a);SF.ui.toast(a?"❤️":"💔",a?"Bookmarked":"Removed",a?"success":"info");}));
  SF.D.pg.querySelectorAll(".accept-req").forEach(b=>b.addEventListener("click",()=>{const r=AppData.mentorRequests.find(x=>x.id===b.dataset.rq);if(r){r.status="accepted";r.acceptedBy=AppData.user.name;SF.save();SF.ui.toast("✅","Request accepted!","success");SF.home.render();}}));

  // Start countdown timers
  SF.ui.startCountdownTimers();
}

// Saved Items
SF.home.renderSaved=()=>{
  try{
  const bm=AppData.user.bookmarks||{mentors:[],notes:[],examResources:[]},esc=SF.escapeHtml;
  const savedM=bm.mentors.map(id=>AppData.mentors.find(m=>m.id===id)).filter(Boolean);
  const savedN=bm.notes.map(id=>SF.U.findNote(id)).filter(Boolean);
  const savedE=bm.examResources.map(id=>AppData.examResources.find(r=>r.id===id)).filter(Boolean);
  SF.D.pg.innerHTML=`${SF.ui.backBtn("profile","← Back to Profile")}
    <div class="section-header"><h2>❤️ Saved Items</h2></div>
    ${savedM.length?`<h3 style="font-size:.9rem;font-weight:700;margin-bottom:10px">👤 Saved Mentors (${savedM.length})</h3><div class="mentor-scroll mb-24">${savedM.map(m=>SF.mentors.card(m)).join("")}</div>`:""}
    ${savedN.length?`<h3 style="font-size:.9rem;font-weight:700;margin-bottom:10px">📄 Saved Notes (${savedN.length})</h3><div class="notes-list mb-24">${savedN.map(n=>`<div class="card note-item card-animate"><div class="note-icon" style="background:${n.bg}">${n.icon}</div><div class="note-info"><h4>${esc(n.title)}</h4><p>${esc(n.author)}</p></div></div>`).join("")}</div>`:""}
    ${savedE.length?`<h3 style="font-size:.9rem;font-weight:700;margin-bottom:10px">🎯 Saved Exam Prep (${savedE.length})</h3><div class="notes-list mb-24">${savedE.map(r=>`<div class="card note-item card-animate"><div class="note-icon" style="background:${r.bg}">${r.icon}</div><div class="note-info"><h4>${esc(r.title)}</h4><p>${esc(r.subject)}</p></div></div>`).join("")}</div>`:""}
    ${!savedM.length&&!savedN.length&&!savedE.length?'<div class="empty"><div class="empty-icon">❤️</div><h3>No saved items yet</h3><p>Bookmark mentors and notes to find them here.</p></div>':""}`;
  SF.D.pg.addEventListener("click",e=>{const c=e.target.closest("[data-mentor-id]");if(c&&!e.target.closest(".bm-btn"))SF.mentors.openProfile(parseInt(c.dataset.mentorId));});
  SF.D.pg.querySelectorAll("[data-bm-m]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();const id=parseInt(b.dataset.bmM);SF.U.toggleBM("mentors",id);SF.home.renderSaved();}));
  }catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Saved render error:",e);}
};

// Mentor Requests Board
SF.home.renderRequests=()=>{
  try{
  const esc=SF.escapeHtml;
  const open=AppData.mentorRequests.filter(r=>r.status==="open"),accepted=AppData.mentorRequests.filter(r=>r.status==="accepted");
  SF.D.pg.innerHTML=`${SF.ui.backBtn("profile","← Back to Profile")}
    <div class="section-header"><h2>📋 Learning Requests</h2></div>
    <button class="btn btn-primary btn-block mb-16" id="newReq">+ Post a Request</button>
    ${open.length?`<h3 style="font-size:.9rem;font-weight:700;margin-bottom:10px">Open Requests (${open.length})</h3>${open.map(r=>`<div class="card request-card card-animate mb-12"><div class="rq-top"><div class="rq-avatar">${esc(r.studentInitials)}</div><div class="rq-meta"><h4>${esc(r.studentName)}</h4><span>${esc(r.date)}</span></div><span class="badge badge-price">₹${r.budget}</span></div><div class="rq-body"><div style="font-weight:600;font-size:.85rem">${esc(r.subject)}</div><p style="font-size:.82rem;color:var(--text-3)">${esc(r.topic)}</p></div>${SF.S.role==="senior"?`<button class="btn btn-accent btn-sm btn-block mt-8 accept-req" data-rq="${r.id}">Accept</button>`:""}</div>`).join("")}`:""} 
    ${accepted.length?`<h3 style="font-size:.9rem;font-weight:700;margin:16px 0 10px">Accepted (${accepted.length})</h3>${accepted.map(r=>`<div class="card request-card card-animate mb-12"><div class="rq-top"><div class="rq-avatar">${esc(r.studentInitials)}</div><div class="rq-meta"><h4>${esc(r.studentName)}</h4><span>${esc(r.date)}</span></div><span class="badge badge-completed">Accepted by ${esc(r.acceptedBy)}</span></div><div class="rq-body"><div style="font-weight:600;font-size:.85rem">${esc(r.subject)}</div><p style="font-size:.82rem;color:var(--text-3)">${esc(r.topic)}</p></div></div>`).join("")}`:""} 
    ${!open.length&&!accepted.length?'<div class="empty"><div class="empty-icon">📋</div><h3>No requests yet</h3><p>Post a learning request to find a mentor.</p></div>':""}`;
  SF.$("#newReq")?.addEventListener("click",()=>{
    SF.ui.modal("Post a Request",`<div class="form-group mb-12"><label>Subject</label><input id="rqS" placeholder="e.g. Data Structures"/></div><div class="form-group mb-12"><label>Topic</label><input id="rqT" placeholder="e.g. Graph Algorithms"/></div><div class="form-group mb-16"><label>Budget (₹)</label><input type="number" id="rqB" placeholder="120"/></div><button class="btn btn-accent btn-block" id="rqSub">Post Request</button>`);
    SF.$("#rqSub").addEventListener("click",()=>{const s=SF.$("#rqS")?.value.trim(),t=SF.$("#rqT")?.value.trim(),b=parseInt(SF.$("#rqB")?.value)||0;if(!s||!t){SF.ui.toast("⚠️","Fill all fields","warning");return;}AppData.mentorRequests.unshift({id:"req"+Date.now(),studentId:AppData.user.id,studentName:AppData.user.name,studentInitials:AppData.user.initials,subject:s,topic:t,budget:b,status:"open",date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),acceptedBy:null});SF.save();SF.ui.closeModal();SF.ui.toast("📋","Request posted!","success");SF.home.renderRequests();});
  });
  SF.D.pg.querySelectorAll(".accept-req").forEach(b=>b.addEventListener("click",()=>{const r=AppData.mentorRequests.find(x=>x.id===b.dataset.rq);if(r){r.status="accepted";r.acceptedBy=AppData.user.name;SF.save();SF.ui.toast("✅","Accepted!","success");SF.home.renderRequests();}}));
  }catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Requests render error:",e);}
};

// Exam Prep
SF.home.renderExam=()=>{
  try{
  const esc=SF.escapeHtml;
  let filter=SF.S.examF;const types=[{k:"all",l:"All"},{k:"expected-questions",l:"Expected Qs"},{k:"pyq-solutions",l:"PYQ Solutions"},{k:"important-topics",l:"Important Topics"},{k:"exam-guide",l:"Exam Guides"}];
  function render(){
    const list=filter==="all"?AppData.examResources:AppData.examResources.filter(r=>r.type===filter);
    const typeLabel=types.find(t=>t.k===filter)?.l||"All";
    SF.D.pg.innerHTML=`${SF.ui.backBtn("profile","← Back to Profile")}
      <div class="exam-hero"><h2>🎯 Exam Strategy Hub</h2><p>Ace every exam with curated prep resources from top mentors</p></div>
      <div class="filter-row mb-16">${types.map(t=>`<button class="filter-chip ${t.k===filter?"active":""}" data-ef="${t.k}">${t.l}</button>`).join("")}</div>
      <h3 style="font-size:.9rem;font-weight:700;margin-bottom:10px">${typeLabel} (${list.length})</h3>
      <div class="exam-list">${list.map(r=>{const bm=SF.U.bookmarked("examResources",r.id);return`<div class="card exam-card card-animate"><button class="bm-btn ${bm?"active":""}" data-bm-e="${r.id}">♥</button><div class="exam-card-icon" style="background:${r.bg}">${r.icon}</div><div class="exam-card-info"><h4>${esc(r.title)}</h4><p>by ${esc(r.author)} · 📄 ${r.pages} pages · 📥 ${r.downloads} · ${r.price?`₹${r.price}`:"Free"}</p><div class="exam-card-badges"><span class="badge badge-subject">${r.type.replace(/-/g," ").toUpperCase()}</span><span class="badge badge-subject">${esc(r.subject)}</span></div><div style="margin-top:4px">${SF.U.stars(r.rating)} ${r.rating}</div></div><button class="note-dl-btn ${!r.price||r.price===0?"":"locked-btn"}" data-exd="${r.id}">${!r.price||r.price===0?'<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>':"🔒"}</button></div>`;}).join("")}${list.length===0?'<div class="empty"><p>No resources in this category.</p></div>':""}</div>`;
    SF.D.pg.querySelectorAll("[data-ef]").forEach(c=>c.addEventListener("click",()=>{filter=c.dataset.ef;SF.S.examF=filter;render();}));
    SF.D.pg.querySelectorAll("[data-exd]").forEach(b=>b.addEventListener("click",()=>{const r=AppData.examResources.find(x=>x.id===b.dataset.exd);if(!r)return;if(!r.price||r.price===0){SF.ui.toast("📥","Downloaded!","success");return;}SF.pay.open({amount:r.price,title:`Purchase: ${r.title}`,description:`by ${r.author}`,onSuccess:()=>{SF.ui.toast("✅","Resource purchased!","success");}});}));
    SF.D.pg.querySelectorAll("[data-bm-e]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();const id=b.dataset.bmE;const a=SF.U.toggleBM("examResources",id);b.classList.toggle("active",a);SF.ui.toast(a?"❤️":"💔",a?"Saved":"Removed",a?"success":"info");}));
  }
  render();
  }catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Exam render error:",e);}
};
})();
