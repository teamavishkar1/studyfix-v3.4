/* StudyFix v5.0 — Navigation & Boot (Production) */
(function(){
"use strict";
SF.nav={};
const pageMap={
  home:()=>SF.home.render(),
  mentors:()=>SF.mentors.renderList(),
  "mentor-profile":()=>SF.mentors.renderProfile(),
  notes:()=>SF.notes.render(),
  sessions:()=>SF.sessions.render(),
  profile:()=>SF.profile.render(),
  dashboard:()=>SF.dash.render(),
  wallet:()=>SF.wallet.render(),
  "exam-prep":()=>SF.home.renderExam(),
  saved:()=>SF.home.renderSaved(),
  requests:()=>SF.home.renderRequests()
};

SF.nav.go=(page)=>{SF.S.page=page;SF.nav.syncNav(page);location.hash=page;SF.nav.renderPage(page);};

SF.nav.syncNav=page=>{
  const nav=["home","mentors","notes","sessions","profile"];
  const active=nav.includes(page)?page:page==="mentor-profile"?"mentors":page==="dashboard"||page==="wallet"||page==="saved"||page==="requests"||page==="exam-prep"?"profile":"home";
  SF.D.nav.querySelectorAll(".nav-item").forEach(n=>{n.classList.toggle("active",n.dataset.page===active);});
};

SF.nav.renderPage=page=>{
  SF.D.pg.style.animation="none";
  void SF.D.pg.offsetWidth;
  SF.D.pg.style.animation="fadeUp .3s ease";
  try{
    const fn=pageMap[page];
    if(fn)fn();else SF.home.render();
  }catch(e){
    SF.ui.toast("⚠️","Something went wrong","warning");
    console.error("Page render error ["+page+"]:",e);
  }
  window.scrollTo(0,0);
};

/* ─── Notification System ─── */
SF.nav.updateNotifDot=()=>{
  const dot=SF.D.notifDot;
  if(!dot)return;
  const hasUnread=AppData.notifications.some(n=>!n.read);
  dot.classList.toggle("active",hasUnread);
};

function renderNotif(){
  // Mark all as read
  let hadUnread=false;
  AppData.notifications.forEach(n=>{
    if(!n.read){n.read=true;hadUnread=true;}
  });
  if(hadUnread)SF.save();
  SF.nav.updateNotifDot();

  // Render notification list
  SF.D.nl.innerHTML=AppData.notifications.map(n=>`<div class="notif-item${n.read?"":" notif-unread"}">
    <div class="notif-icon" style="background:${n.bg}">${n.icon}</div>
    <div class="notif-text"><h4>${SF.escapeHtml(n.title)}</h4><p>${SF.escapeHtml(n.msg)}</p></div>
    <div class="notif-time">${SF.escapeHtml(n.time)}</div>
  </div>`).join("")||'<div class="empty"><p>No notifications.</p></div>';
}

function closePanel(){
  SF.D.ov.classList.remove("show");
  SF.D.np.classList.remove("open");
}

SF.nav.init=()=>{
  SF.D.nav.querySelectorAll(".nav-item").forEach(n=>n.addEventListener("click",()=>{const p=n.dataset.page;SF.nav.go(p);}));
  SF.$("#notifBtn")?.addEventListener("click",()=>{SF.D.ov.classList.add("show");SF.D.np.classList.add("open");renderNotif();});
  SF.D.ov.addEventListener("click",closePanel);
  SF.$("#closeNotifPanel")?.addEventListener("click",closePanel);
  SF.$("#closeModal")?.addEventListener("click",SF.ui.closeModal);
  SF.D.mb.addEventListener("click",e=>{if(e.target===SF.D.mb)SF.ui.closeModal();});
  SF.$("#logoBtn")?.addEventListener("click",()=>SF.nav.go("home"));
  SF.D.tt?.addEventListener("click",SF.ui.toggleTheme);
  SF.$("#userAvatarBtn")?.addEventListener("click",()=>SF.nav.go("profile"));
  SF.search.init();

  // Initialize notification dot
  SF.nav.updateNotifDot();

  const hash=location.hash.replace("#","");
  if(SF.K.PAGES.includes(hash)){SF.nav.go(hash);}else{SF.nav.go("home");}
};

// Boot
SF.cacheDom();
SF.auth.checkAuth();
})();
