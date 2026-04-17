/* StudyFix v5.0 — Profile & Availability Editor (Production) */
(function(){
"use strict";
SF.profile={};
const esc=SF.escapeHtml;

SF.profile.render=()=>{
  try{
  const u=AppData.user,sr=SF.S.role==="senior";
  SF.D.pg.innerHTML=`
    <div class="my-profile-header"><div class="my-profile-avatar">${esc(u.initials)}</div><h2>${esc(u.name)}</h2><div class="sub">${esc(u.course)} · Sem ${u.semester} · ${esc(u.university)}</div><div style="margin-top:8px"><span class="badge ${sr?(u.isVerified?"badge-verified":"badge-pending"):"badge-cgpa"}">${sr?(u.isVerified?"✓ Verified":"⏳ Pending"):"Junior Student"}</span></div></div>
    <div class="wallet-card"><div class="wc-left"><h4>${sr?"Earnings":"Wallet"} Balance</h4><div class="wc-balance">₹${u.walletBalance||0}</div></div><button class="wc-btn" id="addW">${sr?"Withdraw":"+ Add"}</button></div>
    <div class="my-profile-stats"><div class="card my-stat"><h3>${u.sessionsBooked}</h3><p>Sessions</p></div><div class="card my-stat"><h3>${u.notesDownloaded}</h3><p>Downloads</p></div><div class="card my-stat"><h3>${u.hoursLearned}h</h3><p>Hours</p></div></div>
    <div class="profile-section"><h3>👤 Account</h3>
      <div class="setting-row" id="swR"><div class="setting-left"><div class="setting-icon" style="background:var(--primary-50)">🔄</div><div class="setting-text"><h4>Switch Role</h4><p>Currently: ${sr?"Senior (Mentor)":"Junior (Student)"}</p></div></div><span class="setting-arrow">→</span></div>
      <div class="setting-row" id="goD"><div class="setting-left"><div class="setting-icon" style="background:var(--accent-50)">📊</div><div class="setting-text"><h4>My Dashboard</h4><p>View overview</p></div></div><span class="setting-arrow">→</span></div>
      <div class="setting-row" id="goW"><div class="setting-left"><div class="setting-icon" style="background:var(--amber-50)">👛</div><div class="setting-text"><h4>My Wallet</h4><p>₹${u.walletBalance||0}</p></div></div><span class="setting-arrow">→</span></div>
      <div class="setting-row" id="goSv"><div class="setting-left"><div class="setting-icon" style="background:#fef2f2">❤️</div><div class="setting-text"><h4>Saved Items</h4><p>Bookmarked mentors & notes</p></div></div><span class="setting-arrow">→</span></div>
      <div class="setting-row" id="goE"><div class="setting-left"><div class="setting-icon" style="background:#fef2f2">🎯</div><div class="setting-text"><h4>Exam Prep</h4><p>PYQs, tips & guides</p></div></div><span class="setting-arrow">→</span></div>
      <div class="setting-row" id="goRq"><div class="setting-left"><div class="setting-icon" style="background:var(--purple-50)">📋</div><div class="setting-text"><h4>Requests</h4><p>Learning requests board</p></div></div><span class="setting-arrow">→</span></div></div>

    ${sr&&u.isVerified?renderAvail():""}

    ${sr&&!u.isVerified?`<div class="profile-section"><h3>🎓 Mentor Verification</h3><div class="card" style="padding:20px"><p style="font-size:.85rem;color:var(--text-2);margin-bottom:16px">Submit academic details and CGPA proof.</p><div class="verify-form">
      <div class="form-group"><label>Course</label><input id="vC" placeholder="B.Tech CSE" value="${esc(u.course)}"/></div>
      <div class="form-group"><label>Semester</label><select id="vS">${[3,4,5,6,7,8].map(s=>`<option value="${s}" ${s===u.semester?"selected":""}>${s}</option>`).join("")}</select></div>
      <div class="form-group"><label>CGPA (min ${SF.K.MIN_CGPA}.0)</label><input type="number" step="0.1" id="vCg" placeholder="8.5"/></div>
      <div class="form-group"><label>Subjects</label><input id="vSb" placeholder="DSA, DBMS, OS"/></div>
      <div class="form-group"><label>Upload CGPA Proof</label><div class="file-upload"><div class="upload-icon">📎</div><p>Tap to upload</p></div></div>
      <div class="form-group"><label>Session Price (₹)</label><input type="number" id="vPr" placeholder="149"/></div>
      <button class="btn btn-accent btn-block btn-lg" id="subV">Submit for Verification</button></div></div></div>`:""}

    ${sr&&u.isVerified?`<div class="profile-section"><h3>🎓 Mentor Tools</h3>
      <div class="setting-row" id="upN"><div class="setting-left"><div class="setting-icon" style="background:var(--amber-50)">📤</div><div class="setting-text"><h4>Upload Notes</h4><p>Share materials</p></div></div><span class="setting-arrow">→</span></div>
      <div class="setting-row" id="setP"><div class="setting-left"><div class="setting-icon" style="background:var(--primary-50)">💰</div><div class="setting-text"><h4>Session Price</h4><p>₹${u.pricePerSession||149}/session</p></div></div><span class="setting-arrow">→</span></div></div>`:""}

    <div class="profile-section"><h3>⚙️ Settings</h3>
      <div class="setting-row" id="dkR"><div class="setting-left"><div class="setting-icon" style="background:var(--primary-50)">${SF.S.dark?"☀️":"🌙"}</div><div class="setting-text"><h4>Dark Mode</h4><p>${SF.S.dark?"On":"Off"}</p></div></div><div class="toggle ${SF.S.dark?"on":""}" id="dkT"></div></div>
      <div class="setting-row"><div class="setting-left"><div class="setting-icon" style="background:var(--primary-50)">🔔</div><div class="setting-text"><h4>Notifications</h4><p>Session reminders</p></div></div><div class="toggle on"></div></div>
      <div class="setting-row" id="logO"><div class="setting-left"><div class="setting-icon" style="background:var(--red-50)">🚪</div><div class="setting-text"><h4>Log Out</h4></div></div><span class="setting-arrow">→</span></div></div>`;

  SF.$("#swR").addEventListener("click",()=>{SF.S.role=SF.S.role==="junior"?"senior":"junior";AppData.user.role=SF.S.role;SF.save();SF.ui.toast("🔄",`Switched to ${SF.S.role==="senior"?"Mentor":"Student"}`);SF.profile.render();});
  SF.$("#goD").addEventListener("click",()=>SF.nav.go("dashboard"));
  SF.$("#goW").addEventListener("click",()=>SF.nav.go("wallet"));
  SF.$("#goSv").addEventListener("click",()=>SF.nav.go("saved"));
  SF.$("#goE").addEventListener("click",()=>SF.nav.go("exam-prep"));
  SF.$("#goRq").addEventListener("click",()=>SF.nav.go("requests"));
  SF.$("#dkT")?.addEventListener("click",()=>{SF.ui.toggleTheme();SF.profile.render();});
  SF.$("#addW")?.addEventListener("click",()=>{if(sr){SF.nav.go("wallet");return;}
    SF.ui.modal("Add Money",`<div class="form-group mb-16"><label>Amount (₹)</label><input type="number" id="wA" value="500"/></div><button class="btn btn-accent btn-block btn-lg" id="wC">Add to Wallet</button>`);
    SF.$("#wC").addEventListener("click",()=>{const a=parseInt(SF.$("#wA")?.value)||0;if(a>0){AppData.user.walletBalance=(AppData.user.walletBalance||0)+a;SF.U.addTx("credit",a,"Added to Wallet","UPI");SF.save();SF.ui.closeModal();SF.ui.toast("💰",`₹${a} added`);SF.profile.render();}});
  });
  SF.$("#subV")?.addEventListener("click",()=>{
    const cg=parseFloat(SF.$("#vCg")?.value);if(!cg||cg<SF.K.MIN_CGPA){SF.ui.toast("⚠️",`CGPA must be ${SF.K.MIN_CGPA}.0+`);return;}
    AppData.user.cgpa=cg;AppData.user.isVerified=true;AppData.user.pricePerSession=parseInt(SF.$("#vPr")?.value)||149;
    AppData.user.subjects=(SF.$("#vSb")?.value||"").split(",").map(s=>s.trim()).filter(Boolean);SF.save();SF.ui.toast("🎉","Verified!");SF.profile.render();
  });
  SF.$("#upN")?.addEventListener("click",()=>SF.nav.go("notes"));
  SF.$("#setP")?.addEventListener("click",()=>{SF.ui.modal("Session Price",`<div class="form-group mb-16"><label>Price per Session (₹)</label><input type="number" id="nPr" value="${u.pricePerSession||149}"/></div><button class="btn btn-primary btn-block" id="savPr">Save</button>`);SF.$("#savPr").addEventListener("click",()=>{AppData.user.pricePerSession=parseInt(SF.$("#nPr")?.value)||149;SF.save();SF.ui.closeModal();SF.ui.toast("💰","Price updated");SF.profile.render();});});
  SF.$("#logO").addEventListener("click",()=>{SF.ui.modal("Log Out",`<div style="text-align:center"><div style="font-size:2.5rem;margin-bottom:10px">🚪</div><h3 style="font-size:1rem;font-weight:700;margin-bottom:6px">Log out?</h3><p style="font-size:.85rem;color:var(--text-3);margin-bottom:20px">You'll need to log in again.</p><button class="btn btn-danger btn-block btn-lg" id="yL">Yes, Log Out</button><button class="btn btn-ghost btn-block mt-8" id="nL">Cancel</button></div>`);SF.$("#yL").addEventListener("click",()=>{localStorage.removeItem(SF.K.SK.USER);AppData.user=null;SF.ui.closeModal();SF.auth.showAuthPage();});SF.$("#nL").addEventListener("click",SF.ui.closeModal);});
  setupAvailEvents();
  }catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Profile render error:",e);}
};

function renderAvail(){
  const m=AppData.mentors.find(x=>x.name===AppData.user.name),avail=m?m.availability:[];
  return`<div class="profile-section"><h3>📅 Manage Availability</h3><p style="font-size:.82rem;color:var(--text-3);margin-bottom:12px">Set your available time slots.</p><div class="avail-editor" id="aE">${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day=>{const entry=avail.find(a=>a.day===day),slots=entry?entry.slots:[];return`<div class="avail-day-row"><div class="avail-day-label">${day}</div><div class="avail-slots">${slots.map(sl=>`<span class="avail-slot-chip">${sl} <span class="avail-rm" data-rd="${day}" data-rs="${sl}">✕</span></span>`).join("")}<button class="avail-add-slot" data-ad="${day}">+ Add</button></div></div>`;}).join("")}</div><button class="btn btn-primary btn-block" id="saveA">Save Availability</button></div>`;
}

function setupAvailEvents(){
  SF.D.pg.querySelectorAll(".avail-add-slot").forEach(btn=>btn.addEventListener("click",()=>{
    const day=btn.dataset.ad;const times=["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM"];
    SF.ui.modal("Add Slot",`<div style="font-weight:700;margin-bottom:8px">${day}</div><div class="form-group mb-16"><label>Time</label><select id="slT">${times.map(t=>`<option value="${t}">${t}</option>`).join("")}</select></div><button class="btn btn-accent btn-block" id="addSl">Add</button>`);
    SF.$("#addSl").addEventListener("click",()=>{const time=SF.$("#slT").value;const m=AppData.mentors.find(x=>x.name===AppData.user.name);if(m){let e=m.availability.find(a=>a.day===day);if(!e){e={day,slots:[]};m.availability.push(e);}if(!e.slots.includes(time)){e.slots.push(time);e.slots.sort();}}SF.save();SF.ui.closeModal();SF.ui.toast("✅",`${time} added`);SF.profile.render();});
  }));
  SF.D.pg.querySelectorAll(".avail-rm").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();const m=AppData.mentors.find(x=>x.name===AppData.user.name);if(m){const en=m.availability.find(a=>a.day===b.dataset.rd);if(en)en.slots=en.slots.filter(s=>s!==b.dataset.rs);}SF.save();SF.ui.toast("❌",`Removed ${b.dataset.rs}`);SF.profile.render();}));
  SF.$("#saveA")?.addEventListener("click",()=>{SF.save();SF.ui.toast("✅","Saved!");});
}
})();
