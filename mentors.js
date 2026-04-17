/* StudyFix v5.0 — Mentors: Discovery, Profile, Calendar Booking (Production) */
(function(){
"use strict";
SF.mentors={};
const esc=SF.escapeHtml;

/* ─── Shared Mentor Card Component ─── */
SF.mentors.card=m=>{
  const av=SF.U.availToday(m),bm=SF.U.bookmarked("mentors",m.id);
  return`<div class="card card-click mentor-card" data-mentor-id="${m.id}">
    <button class="bm-btn ${bm?"active":""}" data-bm-m="${m.id}" title="Bookmark">♥</button>
    <div class="mentor-avatar" style="background:${m.gradient}">${esc(m.initials)}${m.isVerified?'<span class="verified-check">✓</span>':""}</div>
    <h4>${esc(m.name)}</h4>
    <div class="mentor-course">${esc(m.course)} · Sem ${m.semester}</div>
    <div class="mentor-badge-chips">${SF.U.badges(m.badges)}</div>
    <div class="mentor-badges"><span class="badge badge-cgpa">CGPA ${m.cgpa}</span><span class="badge badge-price">₹${m.pricePerSession}</span></div>
    <div class="mentor-subjects">${m.subjects.slice(0,2).map(s=>esc(s)).join(", ")}</div>
    <div style="margin-bottom:4px"><span class="avail-dot ${av?"online":"offline"}"></span><span style="font-size:.65rem;color:var(--text-4)">${av?"Available":"Offline"}</span></div>
    <div style="margin-bottom:6px">${SF.U.stars(m.rating)} <span style="font-size:.7rem;color:var(--text-4)">${m.rating}</span></div>
    <button class="btn btn-primary btn-sm btn-block">View Profile</button>
  </div>`;
};

SF.mentors.openProfile=id=>{SF.S.mentorId=id;SF.S.slot=null;SF.S.calDate=null;SF.S.page="mentor-profile";SF.nav.syncNav("mentors");location.hash="mentor-profile";SF.nav.renderPage("mentor-profile");};

/* ═══════════════════════════════════════════
   REFACTORED: renderList() split into 4 functions
   ═══════════════════════════════════════════ */

SF.mentors.renderList=()=>{
  try{
  let subj="All";

  function renderFilters(){
    const subjects=["All",...new Set(AppData.mentors.flatMap(m=>m.subjects))];
    return`<div class="filter-row mb-12">${subjects.slice(0,8).map(s=>`<button class="filter-chip ${s===subj?"active":""}" data-s="${s}">${esc(s)}</button>`).join("")}</div>`;
  }

  function renderSortBar(){
    return`<div class="sort-row"><span>Sort:</span><select id="mSort"><option value="rating" ${SF.S.sort==="rating"?"selected":""}>⭐ Rating</option><option value="price-low" ${SF.S.sort==="price-low"?"selected":""}>₹ Low→High</option><option value="price-high" ${SF.S.sort==="price-high"?"selected":""}>₹ High→Low</option><option value="cgpa" ${SF.S.sort==="cgpa"?"selected":""}>📊 CGPA</option><option value="sessions" ${SF.S.sort==="sessions"?"selected":""}>📅 Sessions</option></select>
      <select id="cgpaSel"><option value="0">All CGPA</option><option value="8">8.0+</option><option value="8.5">8.5+</option><option value="9">9.0+</option></select>
      <select id="priceSel"><option value="0">Any Price</option><option value="100">≤₹100</option><option value="150">≤₹150</option><option value="200">≤₹200</option></select></div>`;
  }

  function renderMentorCard(m){
    const av=SF.U.availToday(m),bm=SF.U.bookmarked("mentors",m.id);
    return`<div class="card card-click mentor-list-card card-animate" data-mid="${m.id}">
      <button class="bm-btn ${bm?"active":""}" data-bm-m="${m.id}" title="Bookmark">♥</button>
      <div class="mentor-list-avatar" style="background:${m.gradient}">${esc(m.initials)}${m.isVerified?'<span class="verified-check">✓</span>':""}</div>
      <div class="mentor-list-info">
        <h4>${esc(m.name)} <span class="avail-dot ${av?"online":"offline"}"></span></h4>
        <div class="course">${esc(m.course)} · Sem ${m.semester} · ${SF.U.stars(m.rating)} ${m.rating}</div>
        <div class="mentor-badge-chips">${SF.U.badges(m.badges)}</div>
        <div class="subjects-row">${m.subjects.slice(0,3).map(s=>`<span class="badge badge-subject">${esc(s)}</span>`).join("")}</div>
      </div>
      <div class="mentor-list-right"><div class="price">₹${m.pricePerSession}</div><div class="cgpa">CGPA ${m.cgpa}</div></div>
    </div>`;
  }

  function renderMentorGrid(filtered){
    if(!filtered.length)return'<div class="empty"><div class="empty-icon">🔍</div><h3>No mentors found</h3></div>';
    return`<div class="mentors-list">${filtered.map(m=>renderMentorCard(m)).join("")}</div>`;
  }

  function render(){
    let f=subj==="All"?[...AppData.mentors]:AppData.mentors.filter(m=>m.subjects.includes(subj));
    if(SF.S.cgpaF>0)f=f.filter(m=>m.cgpa>=SF.S.cgpaF);
    if(SF.S.priceF>0)f=f.filter(m=>m.pricePerSession<=SF.S.priceF);
    if(SF.S.sort==="rating")f.sort((a,b)=>b.rating-a.rating);
    else if(SF.S.sort==="price-low")f.sort((a,b)=>a.pricePerSession-b.pricePerSession);
    else if(SF.S.sort==="price-high")f.sort((a,b)=>b.pricePerSession-a.pricePerSession);
    else if(SF.S.sort==="cgpa")f.sort((a,b)=>b.cgpa-a.cgpa);
    else if(SF.S.sort==="sessions")f.sort((a,b)=>b.sessionsCompleted-a.sessionsCompleted);

    SF.D.pg.innerHTML=`<div class="section-header"><h2>Find Mentors</h2></div>
      <div class="search-bar mb-12"><div class="search-wrap"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input type="text" id="mSrch" placeholder="Search mentors or subjects..."/></div></div>
      ${renderFilters()}
      ${renderSortBar()}
      <div class="mentor-count">${f.length} mentor${f.length!==1?"s":""} found</div>
      ${renderMentorGrid(f)}`;
    bind();
  }

  function bind(){
    SF.D.pg.querySelectorAll(".filter-chip").forEach(c=>c.addEventListener("click",()=>{subj=c.dataset.s;render();}));
    SF.$("#mSrch")?.addEventListener("input",e=>{const q=e.target.value.toLowerCase();SF.D.pg.querySelectorAll("[data-mid]").forEach(c=>{const m=AppData.mentors.find(x=>x.id===parseInt(c.dataset.mid));c.style.display=`${m.name} ${m.subjects.join(" ")}`.toLowerCase().includes(q)?"":"none";});});
    SF.$("#mSort")?.addEventListener("change",e=>{SF.S.sort=e.target.value;render();});
    SF.$("#cgpaSel")?.addEventListener("change",e=>{SF.S.cgpaF=parseFloat(e.target.value);render();});
    SF.$("#priceSel")?.addEventListener("change",e=>{SF.S.priceF=parseInt(e.target.value);render();});
    SF.D.pg.querySelectorAll("[data-mid]").forEach(c=>c.addEventListener("click",e=>{if(e.target.closest(".bm-btn"))return;SF.mentors.openProfile(parseInt(c.dataset.mid));}));
    SF.D.pg.querySelectorAll("[data-bm-m]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();const id=parseInt(b.dataset.bmM);const added=SF.U.toggleBM("mentors",id);b.classList.toggle("active",added);SF.ui.toast(added?"❤️":"💔",added?"Bookmarked":"Removed");}));
  }
  render();
  }catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Mentors list error:",e);}
};

/* ═══════════════════════════════════════════
   Mentor Profile + Calendar Booking
   ═══════════════════════════════════════════ */

SF.mentors.renderProfile=()=>{
  try{
  const m=AppData.mentors.find(x=>x.id===SF.S.mentorId);if(!m){SF.nav.go("mentors");return;}
  const days7=SF.U.next7Days();let selIdx=0,slot=null;const booked=SF.U.bookedSlots(m.id);

  function render(){
    const d=days7[selIdx],dayAvail=m.availability.find(a=>a.day===d.dayName);
    const slots=dayAvail?dayAvail.slots.filter(s=>!booked.includes(d.key+"|"+s)):[];
    const av=SF.U.availToday(m),bm=SF.U.bookmarked("mentors",m.id);

    SF.D.pg.innerHTML=`<button class="back-btn" id="bk">← Back to Mentors</button>
      <div class="profile-hero"><button class="bm-btn profile-bm ${bm?"active":""}" id="bmP" title="Bookmark">♥</button><div class="profile-hero-avatar" style="background:${m.gradient}">${esc(m.initials)}${m.isVerified?'<span class="verified-check" style="width:22px;height:22px;font-size:.7rem;bottom:2px;right:2px">✓</span>':""}</div><h2>${esc(m.name)}</h2><div class="sub">${esc(m.course)} · Sem ${m.semester} · ${esc(m.university)}</div><div class="mentor-badge-chips" style="justify-content:center;margin-top:6px">${SF.U.badges(m.badges)}</div><div class="badges-row"><span class="badge ${av?"badge-online":"badge-offline"}"><span class="avail-dot ${av?"online":"offline"}"></span>${av?"Available Today":"Offline"}</span><span class="badge badge-cgpa">CGPA ${m.cgpa}</span><span class="badge badge-price">₹${m.pricePerSession}/session</span></div></div>
      <div class="profile-stats"><div class="card profile-stat"><h3>${m.sessionsCompleted}</h3><p>Sessions</p></div><div class="card profile-stat"><h3>${m.studentsHelped}</h3><p>Students</p></div><div class="card profile-stat"><h3>⭐ ${m.rating}</h3><p>Rating</p></div></div>
      <div class="about-section"><h3>About</h3><p>${esc(m.about)}</p></div>
      <div class="about-section"><h3>Subjects</h3><div class="subjects-chips">${m.subjects.map(s=>`<span class="badge badge-subject" style="font-size:.75rem;padding:5px 12px">${esc(s)}</span>`).join("")}</div></div>
      <div class="reviews-section"><h3>⭐ Reviews (${m.reviews?.length||0})</h3>${(m.reviews||[]).map(r=>`<div class="card review-card card-animate"><div class="review-top"><div class="review-avatar">${esc(r.initials)}</div><div class="review-meta"><h4>${esc(r.name)}</h4><span class="review-date">${esc(r.date)}</span></div><div class="review-stars">${SF.U.stars(r.rating)}</div></div><p class="review-comment">${esc(r.comment)}</p></div>`).join("")}</div>
      <div class="time-slots-section"><h3>📅 Book a Session</h3>
        <div class="calendar-strip mb-12">${days7.map((dd,i)=>`<button class="cal-day ${i===selIdx?"selected":""}" data-ci="${i}"><div class="cal-dn">${dd.dayName}</div><div class="cal-dd">${dd.label}</div>${dd.isToday?'<div class="cal-today">Today</div>':""}</button>`).join("")}</div>
        ${slots.length?`<div class="slots-grid mb-16">${slots.map(s=>`<button class="slot-btn ${slot===s?"selected":""}" data-sl="${s}">${s}</button>`).join("")}</div><button class="btn btn-primary btn-block btn-lg" id="bookBtn" ${!slot?"disabled":""}>Book Session · ₹${m.pricePerSession}</button>`:dayAvail&&dayAvail.slots.length>0?'<div class="empty" style="padding:20px"><p>All slots booked for this date.</p></div>':'<div class="empty" style="padding:20px"><p>No availability for this date.</p></div>'}</div>`;

    SF.$("#bk").addEventListener("click",()=>SF.nav.go("mentors"));
    SF.$("#bmP")?.addEventListener("click",()=>{const a=SF.U.toggleBM("mentors",m.id);SF.$("#bmP").classList.toggle("active",a);SF.ui.toast(a?"❤️":"💔",a?"Bookmarked":"Removed");});
    SF.D.pg.querySelectorAll("[data-ci]").forEach(c=>c.addEventListener("click",()=>{selIdx=parseInt(c.dataset.ci);slot=null;render();}));
    SF.D.pg.querySelectorAll(".slot-btn").forEach(b=>b.addEventListener("click",()=>{slot=b.dataset.sl;render();}));
    SF.$("#bookBtn")?.addEventListener("click",()=>confirmBooking(m,days7[selIdx],slot));
  }
  render();
  }catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Mentor profile error:",e);}
};

function confirmBooking(m,dateObj,slot){
  SF.ui.modal("Confirm Booking",`<div style="text-align:center;margin-bottom:16px"><div style="background:${m.gradient};width:56px;height:56px;margin:0 auto 10px;border-radius:var(--r-full);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1rem">${esc(m.initials)}</div><h3 style="font-size:1rem;font-weight:700">${esc(m.name)}</h3><p style="font-size:.82rem;color:var(--text-3)">${esc(m.course)} · CGPA ${m.cgpa}</p></div>
    <div class="card" style="padding:14px;margin-bottom:16px"><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:.82rem;color:var(--text-3)">Date</span><span style="font-size:.82rem;font-weight:600">${dateObj.label} (${dateObj.dayName})</span></div><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:.82rem;color:var(--text-3)">Time</span><span style="font-size:.82rem;font-weight:600">${slot}</span></div><div style="display:flex;justify-content:space-between"><span style="font-size:.82rem;color:var(--text-3)">Price</span><span style="font-size:.88rem;font-weight:800;color:var(--accent-700)">₹${m.pricePerSession}</span></div></div>
    <div class="form-group mb-16"><label>Subject</label><select id="bkSubj">${m.subjects.map(s=>`<option value="${s}">${esc(s)}</option>`).join("")}</select></div>
    <button class="btn btn-accent btn-block btn-lg" id="proceedPay">Proceed to Payment</button>`);
  SF.$("#proceedPay").addEventListener("click",()=>{const subj=SF.$("#bkSubj")?.value||m.subjects[0];SF.ui.closeModal();
    SF.pay.open({amount:m.pricePerSession,title:`Session with ${m.name}`,description:`${subj} · ${dateObj.label} at ${slot}`,onSuccess:()=>{
      AppData.sessions.unshift({id:SF.S.nextSid++,mentorId:m.id,subject:subj,title:`${subj} Session`,mentorName:m.name,mentorInitials:m.initials,mentorGradient:m.gradient,date:dateObj.label,calendarDate:dateObj.key,time:slot,duration:"1h",price:m.pricePerSession,status:"upcoming",paymentStatus:"paid",reviewed:false,meetingLink:"https://meet.google.com/sf-"+Date.now(),topics:["To be discussed"]});
      AppData.user.sessionsBooked++;SF.save();
      // Add notification for booking
      SF.U.addNotification("📅","#eff6ff","Session Booked",`${subj} with ${m.name} on ${dateObj.label} at ${slot}`);
      SF.ui.toast("✅","Session booked!");SF.nav.go("sessions");
    }});
  });
}
})();
