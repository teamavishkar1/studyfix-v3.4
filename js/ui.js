/* StudyFix v5.0 — UI Utilities (Production) */
(function(){
"use strict";
SF.ui={};

/* ─── Toast Notification ─── */
SF.ui.toast=(icon,msg,type)=>{
  clearTimeout(SF.S.toastTmr);
  SF.D.ti.textContent=icon;
  SF.D.tm.textContent=msg;
  SF.D.t.className="toast";
  if(type)SF.D.t.classList.add("toast-"+type);
  SF.D.t.classList.add("show");
  SF.S.toastTmr=setTimeout(()=>SF.D.t.classList.remove("show"),SF.K.TOAST_MS);
};

/* ─── Modal ─── */
SF.ui.modal=(title,html)=>{SF.D.mt.textContent=title;SF.D.mbd.innerHTML=html;SF.D.mb.classList.add("open");};
SF.ui.closeModal=()=>SF.D.mb.classList.remove("open");

/* ─── Loading Skeletons ─── */
SF.ui.loading=(variant)=>{
  const skeletons={
    home:'<div class="skeleton skeleton-hero"></div><div class="skeleton-stats"><div class="skeleton skeleton-stat"></div><div class="skeleton skeleton-stat"></div><div class="skeleton skeleton-stat"></div></div><div class="skeleton skeleton-section-title"></div><div class="skeleton skeleton-list-item"></div><div class="skeleton skeleton-list-item"></div><div class="skeleton skeleton-list-item"></div>',
    list:'<div class="skeleton skeleton-section-title"></div><div class="skeleton skeleton-list-item"></div><div class="skeleton skeleton-list-item"></div><div class="skeleton skeleton-list-item"></div><div class="skeleton skeleton-list-item"></div>',
    profile:'<div class="skeleton skeleton-hero" style="height:160px"></div><div class="skeleton-stats"><div class="skeleton skeleton-stat"></div><div class="skeleton skeleton-stat"></div><div class="skeleton skeleton-stat"></div></div><div class="skeleton skeleton-list-item"></div><div class="skeleton skeleton-list-item"></div>',
    default:'<div class="skeleton skeleton-card"></div><div class="skeleton skeleton-card" style="height:80px"></div><div class="skeleton skeleton-card" style="height:80px"></div>'
  };
  SF.D.pg.innerHTML=skeletons[variant]||skeletons.default;
};

/* ─── Page Loading with Skeleton Transition ─── */
SF.ui.pageLoading=(variant,callback)=>{
  SF.ui.loading(variant||'default');
  setTimeout(()=>{if(callback)callback();},SF.K.LOAD_MS);
};

/* ─── Theme ─── */
SF.ui.applyTheme=d=>{SF.S.dark=d;document.documentElement.setAttribute("data-theme",d?"dark":"light");if(SF.D.tt)SF.D.tt.textContent=d?"☀️":"🌙";SF.saveTheme(d);};
SF.ui.toggleTheme=()=>SF.ui.applyTheme(!SF.S.dark);

/* ─── Confetti Generator ─── */
SF.ui.confetti=(container)=>{
  const colors=["#2563eb","#10b981","#f59e0b","#ec4899","#8b5cf6","#06b6d4","#ef4444"];
  for(let i=0;i<24;i++){
    const c=document.createElement("div");
    c.className="confetti";
    c.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*30}%;background:${colors[i%colors.length]};width:${6+Math.random()*6}px;height:${6+Math.random()*6}px;animation-delay:${Math.random()*.8}s;animation-duration:${1.5+Math.random()*1}s;border-radius:${Math.random()>.5?'50%':'2px'}`;
    container.appendChild(c);
  }
};

/* ─── Reusable Back Button ─── */
SF.ui.backBtn=(target,label)=>{
  target=target||"home";
  label=label||"← Back";
  return`<button class="sf-back-btn" onclick="SF.nav.go('${target}')">${SF.escapeHtml(label)}</button>`;
};

/* ─── Session Countdown Component ─── */
SF.ui.countdownBadge=(session)=>{
  if(!session||!session.calendarDate||!session.time)return"";
  const cd=SF.U.countdown(session.calendarDate,session.time);
  if(!cd)return"";
  return`<span class="countdown-badge">⏱ ${cd}</span>`;
};

/* ─── Start Live Countdown Timers ─── */
SF.ui.startCountdownTimers=()=>{
  const timers=document.querySelectorAll("[data-countdown-date][data-countdown-time]");
  if(!timers.length)return;
  const update=()=>{
    timers.forEach(el=>{
      const cd=SF.U.countdown(el.dataset.countdownDate,el.dataset.countdownTime);
      if(cd)el.textContent="⏱ "+cd;
      else el.textContent="Starting soon";
    });
  };
  update();
  const interval=setInterval(()=>{
    // Stop if elements are no longer in DOM
    if(!document.contains(timers[0])){clearInterval(interval);return;}
    update();
  },60000);
};

})();
