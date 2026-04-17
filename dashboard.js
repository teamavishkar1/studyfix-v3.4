/* StudyFix v5.0 — Dashboards & Analytics (Production) */
(function(){
"use strict";
SF.dash={};
const esc=SF.escapeHtml;

SF.dash.render=()=>{
  SF.ui.loading('home');
  setTimeout(()=>{try{if(SF.S.role==="senior")renderSenior();else renderJunior();}catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Dashboard error:",e);}},SF.K.LOAD_MS);
};

function renderJunior(){
  const u=AppData.user,up=AppData.sessions.filter(s=>s.status==="upcoming").slice(0,3);
  const rec=SF.U.recommend(u);
  const pNotes=(u.purchasedNotes||[]).map(id=>SF.U.findNote(id)).filter(Boolean);
  const streak=SF.U.streak(u);
  const lb=[...AppData.mentors].sort((a,b)=>b.rating-a.rating||b.sessionsCompleted-a.sessionsCompleted).slice(0,5);

  SF.D.pg.innerHTML=`${SF.ui.backBtn("profile","← Back to Profile")}
    <div class="dash-hero"><h1>Hey, ${esc(u.name.split(" ")[0])}! 👋</h1><p>Your learning dashboard</p>
      <div class="dash-balance"><div><div class="db-label">Wallet Balance</div><div class="db-amount">₹${u.walletBalance||0}</div></div><button class="db-btn" id="goW">View Wallet →</button></div></div>
    <div class="streak-card"><div class="streak-icon">🔥</div><div class="streak-text"><h4>${streak} Day Study Streak</h4><p>Keep learning daily!</p></div></div>
    <div class="grad-stats">
      <div class="grad-card gc-blue card-animate"><div class="gc-icon">📅</div><div class="gc-value">${u.sessionsBooked}</div><div class="gc-label">Sessions</div></div>
      <div class="grad-card gc-green card-animate"><div class="gc-icon">📚</div><div class="gc-value">${u.notesDownloaded}</div><div class="gc-label">Notes</div></div>
      <div class="grad-card gc-purple card-animate"><div class="gc-icon">⏰</div><div class="gc-value">${u.hoursLearned}h</div><div class="gc-label">Learned</div></div>
      <div class="grad-card gc-amber card-animate"><div class="gc-icon">⭐</div><div class="gc-value">${(u.reviewsGiven||[]).length}</div><div class="gc-label">Reviews</div></div>
    </div>
    <div class="section-header"><h2>🏆 Top Mentors</h2></div>
    <div class="card glass-card leaderboard mb-24">${lb.map((m,i)=>`<div class="leaderboard-item card-animate" style="animation-delay:${i*0.08}s"><div class="lb-rank">${["🥇","🥈","🥉"][i]||"#"+(i+1)}</div><div class="lb-avatar" style="background:${m.gradient}">${esc(m.initials)}</div><div class="lb-info"><h4>${esc(m.name)}</h4><p>${m.subjects.slice(0,2).map(s=>esc(s)).join(", ")}</p></div><div class="lb-stats"><div class="lb-rating">⭐ ${m.rating}</div><div class="lb-sessions">${m.sessionsCompleted} sessions</div></div></div>`).join("")}</div>
    ${pNotes.length?`<div class="section-header"><h2>📚 Purchased Notes</h2></div><div class="notes-list mb-24">${pNotes.slice(0,3).map(n=>`<div class="card note-item card-animate"><div class="note-icon" style="background:${n.bg}">${n.icon}</div><div class="note-info"><h4>${esc(n.title)}</h4><p>${esc(n.author)}</p></div></div>`).join("")}</div>`:""}
    <div class="section-header"><h2>Upcoming Sessions</h2><span class="link" id="dAll">See all →</span></div>
    <div class="upcoming-sessions">${up.length?up.map(s=>`<div class="up-session-card"><div class="up-session-avatar" style="background:${s.mentorGradient}">${esc(s.mentorInitials)}</div><div class="up-session-info"><h4>${esc(s.title)}</h4><p>${esc(s.mentorName)} · ${esc(s.subject)}</p></div><div class="up-session-time"><div class="time">${esc(s.time)}</div><div class="date">${esc(s.date)}</div></div></div>`).join(""):'<div class="empty" style="padding:20px"><p>No upcoming sessions. <span class="link" id="dFind" style="cursor:pointer">Find a mentor →</span></p></div>'}</div>
    <div class="section-header mt-16"><h2>Recommended Mentors</h2></div>
    <div class="mentor-scroll mb-24">${rec.map(m=>SF.mentors.card(m)).join("")}</div>`;
  SF.$("#dAll")?.addEventListener("click",()=>SF.nav.go("sessions"));
  SF.$("#dFind")?.addEventListener("click",()=>SF.nav.go("mentors"));
  SF.$("#goW")?.addEventListener("click",()=>SF.nav.go("wallet"));
  SF.D.pg.addEventListener("click",e=>{const c=e.target.closest("[data-mentor-id]");if(c&&!e.target.closest(".bm-btn"))SF.mentors.openProfile(parseInt(c.dataset.mentorId));});
  SF.D.pg.querySelectorAll("[data-bm-m]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();const id=parseInt(b.dataset.bmM);const a=SF.U.toggleBM("mentors",id);b.classList.toggle("active",a);SF.ui.toast(a?"❤️":"💔",a?"Bookmarked":"Removed",a?"success":"info");}));
}

function renderSenior(){
  const u=AppData.user,up=AppData.sessions.filter(s=>s.status==="upcoming").slice(0,3);
  const completed=AppData.sessions.filter(s=>s.status==="completed").length;
  const m=AppData.mentors.find(x=>x.name===u.name);
  const we=m?.weeklyEarnings||[0,0,0,0,0,0,0];
  const maxE=Math.max(...we,1);
  const dayLabels=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const totalWeek=we.reduce((a,b)=>a+b,0);

  SF.D.pg.innerHTML=`${SF.ui.backBtn("profile","← Back to Profile")}
    <div class="dash-hero"><h1>Hey, ${esc(u.name.split(" ")[0])}! 🎓</h1><p>Mentor dashboard</p>
      <div class="dash-balance"><div><div class="db-label">Total Earnings</div><div class="db-amount">₹${u.totalEarnings||0}</div></div><button class="db-btn" id="dWallet">Wallet →</button></div></div>
    ${!u.isVerified?'<div class="verification-banner"><div class="vb-icon">⏳</div><div class="vb-text"><h4>Verification Pending</h4><p>Submit CGPA proof in Profile.</p></div></div>':""}
    <div class="grad-stats cols-4">
      <div class="grad-card gc-blue card-animate"><div class="gc-icon">💰</div><div class="gc-value">₹${u.sessionEarnings||0}</div><div class="gc-label">Sessions</div></div>
      <div class="grad-card gc-green card-animate"><div class="gc-icon">📄</div><div class="gc-value">₹${u.noteEarnings||0}</div><div class="gc-label">Notes</div></div>
      <div class="grad-card gc-purple card-animate"><div class="gc-icon">👥</div><div class="gc-value">${u.studentsHelped||0}</div><div class="gc-label">Students</div></div>
      <div class="grad-card gc-amber card-animate"><div class="gc-icon">📅</div><div class="gc-value">${completed}</div><div class="gc-label">Completed</div></div>
    </div>
    <div class="section-header"><h2>📊 Weekly Earnings</h2><span style="font-size:.78rem;color:var(--accent-600);font-weight:700">₹${totalWeek} this week</span></div>
    <div class="card chart-v2 mb-24"><div class="chart-bars">${we.map((v,i)=>`<div class="chart-col"><div class="chart-bar-wrap"><div class="chart-bar" style="height:${Math.round(v/maxE*100)}%"><span class="chart-val">₹${v}</span></div></div><div class="chart-label">${dayLabels[i]}</div></div>`).join("")}</div></div>
    <div class="section-header"><h2>Upcoming Sessions</h2></div>
    <div class="upcoming-sessions mb-24">${up.length?up.map(s=>`<div class="up-session-card"><div class="up-session-avatar" style="background:${s.mentorGradient}">${esc(s.mentorInitials)}</div><div class="up-session-info"><h4>${esc(s.title)}</h4><p>${esc(s.subject)}</p></div><div class="up-session-time"><div class="time">${esc(s.time)}</div><div class="date">${esc(s.date)}</div></div></div>`).join(""):'<div class="empty" style="padding:20px"><p>No upcoming sessions.</p></div>'}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <button class="card card-click glass-card" style="text-align:center;padding:20px" id="dUp"><div style="font-size:1.8rem;margin-bottom:8px">📤</div><div style="font-size:.82rem;font-weight:700">Upload Notes</div><div style="font-size:.68rem;color:var(--text-4);margin-top:2px">${u.notesUploaded||0} uploaded</div></button>
      <button class="card card-click glass-card" style="text-align:center;padding:20px" id="dPr"><div style="font-size:1.8rem;margin-bottom:8px">💸</div><div style="font-size:.82rem;font-weight:700">Withdraw</div><div style="font-size:.68rem;color:var(--text-4);margin-top:2px">₹${u.walletBalance||0} available</div></button>
    </div>`;
  SF.$("#dUp")?.addEventListener("click",()=>SF.nav.go("notes"));
  SF.$("#dPr")?.addEventListener("click",()=>SF.nav.go("wallet"));
  SF.$("#dWallet")?.addEventListener("click",()=>SF.nav.go("wallet"));
}
})();
