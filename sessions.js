/* StudyFix v5.0 — Sessions: List, Reviews, Live Join (Production) */
(function(){
"use strict";
SF.sessions={};
SF.sessions.render=()=>{
  try{
  const esc=SF.escapeHtml;
  const tabs=["upcoming","completed","cancelled"],list=AppData.sessions.filter(s=>s.status===SF.S.sessFilter);
  SF.D.pg.innerHTML=`<div class="section-header"><h2>My Sessions</h2></div>
    <div class="session-tabs mb-16">${tabs.map(t=>`<button class="session-tab ${t===SF.S.sessFilter?"active":""}" data-sf="${t}">${t.charAt(0).toUpperCase()+t.slice(1)} (${AppData.sessions.filter(s=>s.status===t).length})</button>`).join("")}</div>
    <div class="session-list">${list.map(s=>{
      const countdown=s.status==="upcoming"?SF.ui.countdownBadge(s):"";
      return`<div class="card session-card card-animate">
      <div class="session-card-top"><h4>${esc(s.title)}</h4><span class="badge badge-${s.status}">${s.status.charAt(0).toUpperCase()+s.status.slice(1)}</span></div>
      <div class="mentor-row"><div class="sm-avatar" style="background:${s.mentorGradient}">${esc(s.mentorInitials)}</div><div><div class="name">${esc(s.mentorName)}</div><div class="role">${esc(s.subject)}</div></div></div>
      <div class="meta-row"><span>📅 ${esc(s.date)}</span><span>⏰ ${esc(s.time)}</span><span>⏱ ${s.duration}</span><span style="font-weight:700;color:var(--accent-700)">₹${s.price}</span><span class="badge ${s.paymentStatus==="paid"?"badge-completed":"badge-pending"}">${s.paymentStatus==="paid"?"Paid":s.paymentStatus==="refunded"?"Refunded":"Pending"}</span></div>
      ${countdown?`<div style="margin-bottom:8px"><span class="countdown-badge" data-countdown-date="${s.calendarDate}" data-countdown-time="${s.time}">⏱ Loading...</span></div>`:""}
      ${s.topics?`<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">${s.topics.map(t=>`<span class="badge badge-subject">${esc(t)}</span>`).join("")}</div>`:""}
      <div class="session-btns">
        ${s.status==="upcoming"&&s.meetingLink?`<a href="${s.meetingLink}" target="_blank" class="btn btn-live btn-sm" style="flex:1">🟢 Join Session</a>`:`<button class="btn ${s.status==="upcoming"?"btn-primary":s.status==="completed"?"btn-ghost":"btn-ghost"} btn-sm" style="flex:1">${s.status==="upcoming"?"Waiting...":s.status==="completed"?"View Summary":"Cancelled"}</button>`}
        ${s.status==="upcoming"?`<button class="btn btn-danger btn-sm cancel-btn" data-sid="${s.id}">Cancel</button>`:""}
        ${s.status==="completed"&&!s.reviewed?`<button class="btn btn-accent btn-sm review-btn" data-rsid="${s.id}">⭐ Review</button>`:""}
        ${s.status==="completed"&&s.reviewed?'<span class="session-review-badge reviewed">✓ Reviewed</span>':""}
      </div></div>`;}).join("")}
      ${list.length===0?`<div class="empty"><div class="empty-icon">📅</div><h3>No ${SF.S.sessFilter} sessions</h3><p>${SF.S.sessFilter==="upcoming"?"Book a session with a mentor!":"No sessions here yet."}</p>${SF.S.sessFilter==="upcoming"?'<button class="btn btn-primary mt-16" id="eCta">Find Mentors</button>':""}</div>`:""}</div>`;

  // Start countdown timers for upcoming
  SF.ui.startCountdownTimers();

  SF.D.pg.querySelectorAll("[data-sf]").forEach(t=>t.addEventListener("click",()=>{SF.S.sessFilter=t.dataset.sf;SF.sessions.render();}));
  SF.$("#eCta")?.addEventListener("click",()=>SF.nav.go("mentors"));
  SF.D.pg.querySelectorAll(".cancel-btn").forEach(b=>b.addEventListener("click",()=>{
    const sid=parseInt(b.dataset.sid);
    SF.ui.modal("Cancel Session",`<div style="text-align:center"><div style="font-size:2.5rem;margin-bottom:10px">⚠️</div><h3 style="font-size:1rem;font-weight:700;margin-bottom:6px">Cancel this session?</h3><p style="font-size:.85rem;color:var(--text-3);margin-bottom:20px">Full refund to your wallet.</p><button class="btn btn-danger btn-block btn-lg" id="cConf">Yes, Cancel & Refund</button><button class="btn btn-ghost btn-block mt-8" id="cKeep">Keep Session</button></div>`);
    SF.$("#cConf").addEventListener("click",()=>{const s=AppData.sessions.find(x=>x.id===sid);if(s){s.status="cancelled";s.paymentStatus="refunded";AppData.user.walletBalance=(AppData.user.walletBalance||0)+s.price;SF.U.addTx("credit",s.price,"Refund: "+s.title,"Wallet");}SF.save();SF.ui.closeModal();SF.ui.toast("💰","Cancelled. ₹"+s.price+" refunded.");SF.sessions.render();});
    SF.$("#cKeep").addEventListener("click",SF.ui.closeModal);
  }));
  SF.D.pg.querySelectorAll(".review-btn").forEach(b=>b.addEventListener("click",()=>{
    const sid=parseInt(b.dataset.rsid),s=AppData.sessions.find(x=>x.id===sid);if(!s)return;
    let rating=0;
    function starsHtml(){return[1,2,3,4,5].map(i=>`<span class="star-input ${i<=rating?"active":""}" data-star="${i}">★</span>`).join("");}
    SF.ui.modal("⭐ Rate Your Session",`<div style="text-align:center;margin-bottom:16px"><h3 style="font-size:1rem;font-weight:700">${esc(s.title)}</h3><p style="font-size:.82rem;color:var(--text-3)">with ${esc(s.mentorName)} · ${esc(s.date)}</p></div><p style="font-size:.85rem;text-align:center;margin-bottom:8px">How was your session?</p><div class="review-stars-input" id="rvStars">${starsHtml()}</div><textarea class="review-textarea" id="rvText" placeholder="Share your experience... (optional)"></textarea><div class="review-btn-row"><button class="btn btn-ghost btn-sm" style="flex:1" id="rvCancel">Skip</button><button class="btn btn-accent btn-sm" style="flex:2" id="rvSubmit" disabled>Submit Review</button></div>`);
    function bindStars(){SF.D.mbd.querySelectorAll("[data-star]").forEach(star=>star.addEventListener("click",()=>{rating=parseInt(star.dataset.star);SF.D.mbd.querySelector("#rvStars").innerHTML=starsHtml();const sub=SF.D.mbd.querySelector("#rvSubmit");if(sub)sub.disabled=false;bindStars();}));}
    bindStars();
    SF.$("#rvCancel").addEventListener("click",SF.ui.closeModal);
    SF.$("#rvSubmit").addEventListener("click",()=>{
      const comment=SF.$("#rvText")?.value.trim()||"Great session!";
      const mentor=AppData.mentors.find(m=>m.id===s.mentorId);
      if(mentor){if(!mentor.reviews)mentor.reviews=[];mentor.reviews.unshift({id:"r"+Date.now(),name:AppData.user.name,initials:AppData.user.initials,rating,comment,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})});mentor.totalReviews=(mentor.totalReviews||0)+1;const avg=mentor.reviews.reduce((sum,r)=>sum+r.rating,0)/mentor.reviews.length;mentor.rating=parseFloat(avg.toFixed(1));}
      s.reviewed=true;if(!AppData.user.reviewsGiven)AppData.user.reviewsGiven=[];AppData.user.reviewsGiven.push(sid);SF.save();SF.ui.closeModal();SF.ui.toast("⭐",`Rated ${rating} stars! Thank you.`);SF.sessions.render();
    });
  }));
  }catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Sessions render error:",e);}
};
})();
