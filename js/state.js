/* StudyFix v5.0 — Global State & Utilities (Production) */
(function(){
"use strict";
const SF = window.SF = {};

/* ─── Constants ─── */
SF.K = {
  SK:{
    USER:"sf4_user",
    SESSIONS:"sf4_sess",
    THEME:"sf4_theme",
    MENTORS:"sf4_mentors",
    NEXTSID:"sf4_nextsid",
    NOTIFS:"sf4_notifs"
  },
  PAGES:["home","mentors","notes","sessions","profile","dashboard","mentor-profile","wallet","exam-prep","saved","requests"],
  EMAIL_RE:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASS:5,MIN_CGPA:6,TOAST_MS:2800,LOAD_MS:200,FEE:5,
  BADGES:{verified:{i:"✓",l:"Verified"},"top-rated":{i:"🔥",l:"Top Rated"},trending:{i:"📈",l:"Trending"}}
};

/* ─── Mutable State ─── */
SF.S = {page:"home",role:"junior",sessFilter:"upcoming",notesBc:[],mentorId:null,slot:null,toastTmr:null,nextSid:200,sort:"rating",cgpaF:0,priceF:0,dark:false,examF:"all",searchQ:"",calDate:null};

/* ─── DOM Selectors (cached) ─── */
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
SF.$=$;SF.$$=$$;SF.D={};

SF.cacheDom=()=>{
  const D=SF.D;
  D.auth=$("#authPage");
  D.app=$("#appShell");
  D.pg=$("#pageContainer");
  D.nav=$("#bottomNav");
  D.ov=$("#overlay");
  D.np=$("#notifPanel");
  D.nl=$("#notifList");
  D.mb=$("#modalBackdrop");
  D.mt=$("#modalTitle");
  D.mbd=$("#modalBody");
  D.t=$("#toast");
  D.ti=$("#toastIcon");
  D.tm=$("#toastMsg");
  D.tt=$("#themeToggle");
  D.srchR=$("#searchResults");
  D.notifDot=$("#notifDot");
};

/* ─── Security: HTML Escaping ─── */
const ESC_MAP={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};
SF.escapeHtml=str=>{
  if(str==null)return"";
  return String(str).replace(/[&<>"']/g,c=>ESC_MAP[c]);
};

/* ─── Persistence ─── */
SF.save=()=>{
  const K=SF.K.SK;
  try{
    localStorage.setItem(K.USER,JSON.stringify(AppData.user));
    localStorage.setItem(K.SESSIONS,JSON.stringify(AppData.sessions));
    localStorage.setItem(K.MENTORS,JSON.stringify(AppData.mentors));
    localStorage.setItem(K.NEXTSID,JSON.stringify(SF.S.nextSid));
    localStorage.setItem(K.NOTIFS,JSON.stringify(AppData.notifications));
  }catch(e){console.error("SF.save error:",e);}
};

SF.loadUser=()=>{try{return JSON.parse(localStorage.getItem(SF.K.SK.USER));}catch{return null;}};
SF.loadSessions=()=>{try{return JSON.parse(localStorage.getItem(SF.K.SK.SESSIONS));}catch{return null;}};
SF.loadMentors=()=>{try{return JSON.parse(localStorage.getItem(SF.K.SK.MENTORS));}catch{return null;}};
SF.loadNextSid=()=>{try{const v=JSON.parse(localStorage.getItem(SF.K.SK.NEXTSID));return typeof v==="number"?v:null;}catch{return null;}};
SF.loadNotifs=()=>{try{return JSON.parse(localStorage.getItem(SF.K.SK.NOTIFS));}catch{return null;}};

SF.saveTheme=d=>localStorage.setItem(SF.K.SK.THEME,d?"dark":"light");
SF.loadTheme=()=>localStorage.getItem(SF.K.SK.THEME)||"light";

/* ─── Utilities ─── */
const U=SF.U={};

U.stars=r=>{let s='<span class="star-rating">';for(let i=1;i<=5;i++)s+=i<=Math.round(r)?"★":'<span class="star-empty">★</span>';return s+"</span>";};

U.badges=(bs)=>(bs||[]).map(b=>{const info=SF.K.BADGES[b];return info?`<span class="mentor-badge-chip ${b}">${info.i} ${info.l}</span>`:"";}).join("");

U.purchased=id=>(AppData.user?.purchasedNotes||[]).includes(id);

U.addTx=(type,amt,desc,method)=>{
  if(!AppData.user.paymentHistory)AppData.user.paymentHistory=[];
  AppData.user.paymentHistory.unshift({
    id:"tx"+Date.now(),type,amount:amt,desc,method,
    date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),
    time:new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})
  });
};

U.findNote=id=>{for(const c of AppData.notesCatalog.courses)for(const s of c.semesters)for(const subj of s.subjects)for(const n of subj.notes)if(n.id===id)return n;return null;};

U.availToday=m=>{const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return m.availability.some(a=>a.day===days[new Date().getDay()]);};

U.bookmarked=(type,id)=>{const bm=AppData.user?.bookmarks;return bm?(bm[type]||[]).includes(id):false;};

U.toggleBM=(type,id)=>{
  if(!AppData.user.bookmarks)AppData.user.bookmarks={mentors:[],notes:[],examResources:[]};
  const arr=AppData.user.bookmarks[type];const idx=arr.indexOf(id);
  if(idx>-1)arr.splice(idx,1);else arr.push(id);
  SF.save();return idx===-1;
};

U.next7Days=()=>{
  const days=[];const dn=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  for(let i=0;i<7;i++){const d=new Date();d.setDate(d.getDate()+i);days.push({label:d.toLocaleDateString("en-US",{month:"short",day:"numeric"}),dayName:dn[d.getDay()],isToday:i===0,key:d.toISOString().split("T")[0]});}
  return days;
};

U.bookedSlots=mid=>AppData.sessions.filter(s=>s.mentorId===mid&&s.status==="upcoming").map(s=>(s.calendarDate||s.date)+"|"+s.time);

U.allNotes=()=>{const all=[];AppData.notesCatalog.courses.forEach(c=>c.semesters.forEach(s=>s.subjects.forEach(subj=>subj.notes.forEach(n=>all.push(n)))));return all;};

U.recommend=(user)=>{
  if(!user)return AppData.mentors.slice(0,3);
  return[...AppData.mentors].map(m=>{
    let score=0;const uc=user.course?.toLowerCase()||"";
    m.subjects.forEach(s=>{
      if(uc.includes("cse")&&["Data Structures","Algorithms","DBMS","Operating Systems","Computer Networks","Web Development","Machine Learning","Python"].includes(s))score+=3;
      if(uc.includes("ece")&&["Digital Electronics","Signals & Systems","Network Analysis"].includes(s))score+=3;
      if(uc.includes("me")&&["Engineering Mathematics","Thermodynamics","Mechanics"].includes(s))score+=3;
      if(uc.includes("ee")&&["Circuit Theory","Power Systems","Control Systems"].includes(s))score+=3;
    });
    score+=m.rating;score+=m.cgpa/2;if(U.availToday(m))score+=1;
    return{...m,score};
  }).sort((a,b)=>b.score-a.score).slice(0,4);
};

/* ─── Study Streak Calculator ─── */
U.streak=(user)=>{
  if(!user)return 0;
  const sessions=AppData.sessions.filter(s=>s.status==="completed"||s.status==="upcoming");
  if(!sessions.length)return user.sessionsBooked||0;
  const dates=[...new Set(sessions.map(s=>s.calendarDate).filter(Boolean))].sort().reverse();
  if(!dates.length)return user.sessionsBooked||0;
  let streak=1;const today=new Date().toISOString().split("T")[0];
  const lastDate=dates[0];
  const diffDays=Math.floor((new Date(today)-new Date(lastDate))/(1000*60*60*24));
  if(diffDays>1)return 0;
  for(let i=1;i<dates.length;i++){
    const prev=new Date(dates[i-1]),curr=new Date(dates[i]);
    const gap=Math.floor((prev-curr)/(1000*60*60*24));
    if(gap<=1)streak++;else break;
  }
  return streak;
};

/* ─── Countdown Timer Helper ─── */
U.countdown=(dateStr,timeStr)=>{
  try{
    const months={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
    let target;
    if(dateStr&&dateStr.includes("-")){
      // ISO format: 2026-03-15
      const timeParts=timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if(!timeParts)return null;
      let h=parseInt(timeParts[1]),m=parseInt(timeParts[2]);
      const ampm=timeParts[3].toUpperCase();
      if(ampm==="PM"&&h!==12)h+=12;if(ampm==="AM"&&h===12)h=0;
      target=new Date(dateStr+"T"+String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")+":00");
    }else{
      return null;
    }
    const now=new Date(),diff=target-now;
    if(diff<=0)return null;
    const hours=Math.floor(diff/(1000*60*60));
    const mins=Math.floor((diff%(1000*60*60))/(1000*60));
    if(hours>=24){const days=Math.floor(hours/24);return`${days}d ${hours%24}h`;}
    return`${hours}h ${mins}m`;
  }catch{return null;}
};

/* ─── Add Notification Helper ─── */
U.addNotification=(icon,bg,title,msg)=>{
  AppData.notifications.unshift({
    id:Date.now(),icon,bg,title,msg,
    time:"Just now",read:false
  });
  SF.save();
  if(SF.nav&&SF.nav.updateNotifDot)SF.nav.updateNotifDot();
};

})();
