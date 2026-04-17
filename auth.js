/* StudyFix v5.0 — Authentication (Production) */
(function(){
"use strict";
SF.auth={};
function vEmail(e){if(!e)return"Email required";if(!SF.K.EMAIL_RE.test(e))return"Invalid email";return null;}
function vPass(p){if(!p)return"Password required";if(p.length<SF.K.MIN_PASS)return`Min ${SF.K.MIN_PASS} chars`;return null;}
function dupEmail(e){return AppData.registeredUsers.some(u=>u.email.toLowerCase()===e.toLowerCase());}
function authErr(msg,ok){const e=SF.$("#authError");if(!e)return;e.textContent=msg;e.className="auth-error show"+(ok?" auth-success":"");}

SF.auth.checkAuth=()=>{
  SF.ui.applyTheme(SF.loadTheme()==="dark");
  const u=SF.loadUser();
  if(u){
    AppData.user=u;SF.S.role=u.role;
    const ss=SF.loadSessions();if(ss)AppData.sessions=ss;
    const mm=SF.loadMentors();if(mm)AppData.mentors=mm;
    const ns=SF.loadNextSid();if(ns!==null)SF.S.nextSid=ns;
    const nf=SF.loadNotifs();if(nf)AppData.notifications=nf;
    SF.auth.showApp();return;
  }
  const ss=SF.loadSessions();if(ss)AppData.sessions=ss;
  const mm=SF.loadMentors();if(mm)AppData.mentors=mm;
  const ns=SF.loadNextSid();if(ns!==null)SF.S.nextSid=ns;
  const nf=SF.loadNotifs();if(nf)AppData.notifications=nf;
  SF.auth.showAuthPage();
};
SF.auth.showAuthPage=()=>{SF.D.auth.classList.remove("hidden");SF.D.app.classList.add("hidden");renderLogin();};
SF.auth.showApp=()=>{SF.D.auth.classList.add("hidden");SF.D.app.classList.remove("hidden");SF.$("#userAvatarText").textContent=AppData.user.initials;SF.nav.init();};

function renderLogin(){
  const c=SF.$("#authCard");let role="junior";
  c.innerHTML=`<div class="auth-tabs"><button class="auth-tab active" id="atL">Login</button><button class="auth-tab" id="atS">Sign Up</button></div>
    <div class="auth-error" id="authError"></div>
    <div class="form-group mb-12"><label>Email</label><input type="email" id="lEmail" placeholder="your.email@cumail.in"/></div>
    <div class="form-group mb-12"><label>Password</label><input type="password" id="lPass" placeholder="Enter password"/></div>
    <div class="form-group mb-16"><label>I am a</label><div class="role-select">
      <div class="role-option selected" data-r="junior"><span class="role-emoji">📚</span><h4>Junior Student</h4><p>Find mentors & notes</p></div>
      <div class="role-option" data-r="senior"><span class="role-emoji">🎓</span><h4>Senior Mentor</h4><p>Teach & earn</p></div></div></div>
    <span class="forgot-link" id="fLink">Forgot password?</span>
    <button class="btn btn-primary btn-block btn-lg" id="loginBtn">Login</button>
    <div class="auth-footer">Don't have an account? <span class="auth-link" id="goS">Sign up</span></div>
    <div class="admin-panel-link"><a href="admin.html" class="admin-link-btn"><span class="admin-link-icon">🛡️</span> Admin Panel</a></div>`;
  c.querySelectorAll(".role-option").forEach(o=>o.addEventListener("click",()=>{c.querySelectorAll(".role-option").forEach(x=>x.classList.remove("selected"));o.classList.add("selected");role=o.dataset.r;}));
  SF.$("#atS").addEventListener("click",renderSignup);SF.$("#goS").addEventListener("click",renderSignup);

  // Forgot Password — proper OTP modal flow
  SF.$("#fLink").addEventListener("click",()=>forgotPasswordFlow());

  SF.$("#loginBtn").addEventListener("click",()=>{
    const email=SF.$("#lEmail").value.trim(),pass=SF.$("#lPass").value;
    let err=vEmail(email);if(err){authErr(err);return;}err=vPass(pass);if(err){authErr(err);return;}
    const u=AppData.registeredUsers.find(x=>x.email===email&&x.password===pass&&x.role===role);
    if(!u){authErr("Invalid credentials or wrong role");return;}
    AppData.user={...u};SF.S.role=u.role;SF.save();SF.auth.showApp();
  });
}

/* ─── Forgot Password OTP Flow ─── */
function forgotPasswordFlow(){
  let step=1,email="",otp="",generatedOtp="";

  function renderStep(){
    if(step===1){
      // Step 1: Enter email
      SF.ui.modal("🔑 Forgot Password",`
        <div style="text-align:center;margin-bottom:16px">
          <div style="font-size:2.5rem;margin-bottom:8px">📧</div>
          <p style="font-size:.85rem;color:var(--text-3)">Enter your registered email address</p>
        </div>
        <div class="form-group mb-16">
          <label>Email Address</label>
          <input type="email" id="fpEmail" placeholder="your.email@cumail.in" value="${SF.escapeHtml(email)}"/>
        </div>
        <div class="auth-error" id="fpError" style="margin-bottom:12px"></div>
        <button class="btn btn-primary btn-block btn-lg" id="fpNext">Send Verification Code</button>
        <button class="btn btn-ghost btn-block mt-8" id="fpCancel">Cancel</button>`);

      SF.$("#fpNext").addEventListener("click",()=>{
        email=SF.$("#fpEmail")?.value.trim()||"";
        const err=vEmail(email);
        if(err){const el=SF.$("#fpError");if(el){el.textContent=err;el.classList.add("show");}return;}
        const user=AppData.registeredUsers.find(u=>u.email.toLowerCase()===email.toLowerCase());
        if(!user){const el=SF.$("#fpError");if(el){el.textContent="Email not found";el.classList.add("show");}return;}
        // Generate mock OTP
        generatedOtp=String(Math.floor(1000+Math.random()*9000));
        step=2;renderStep();
      });
      SF.$("#fpCancel").addEventListener("click",SF.ui.closeModal);
    }
    else if(step===2){
      // Step 2: Show OTP & verify
      SF.ui.modal("🔑 Verify Code",`
        <div style="text-align:center;margin-bottom:16px">
          <div style="font-size:2.5rem;margin-bottom:8px">🔐</div>
          <p style="font-size:.85rem;color:var(--text-3)">We sent a verification code to</p>
          <p style="font-size:.85rem;font-weight:700">${SF.escapeHtml(email)}</p>
        </div>
        <div class="otp-demo-banner">
          <span class="otp-demo-label">Demo OTP</span>
          <span class="otp-demo-code">${generatedOtp}</span>
        </div>
        <div class="form-group mb-16">
          <label>Enter 4-Digit Code</label>
          <input type="text" id="fpOtp" placeholder="••••" maxlength="4" style="text-align:center;font-size:1.5rem;letter-spacing:12px;font-weight:700"/>
        </div>
        <div class="auth-error" id="fpError" style="margin-bottom:12px"></div>
        <button class="btn btn-primary btn-block btn-lg" id="fpVerify">Verify Code</button>
        <button class="btn btn-ghost btn-block mt-8" id="fpBack">← Back</button>`);

      SF.$("#fpVerify").addEventListener("click",()=>{
        otp=SF.$("#fpOtp")?.value.trim()||"";
        if(otp!==generatedOtp){const el=SF.$("#fpError");if(el){el.textContent="Invalid verification code";el.classList.add("show");}return;}
        step=3;renderStep();
      });
      SF.$("#fpBack").addEventListener("click",()=>{step=1;renderStep();});
    }
    else if(step===3){
      // Step 3: Reset password
      SF.ui.modal("🔑 Reset Password",`
        <div style="text-align:center;margin-bottom:16px">
          <div style="font-size:2.5rem;margin-bottom:8px">✅</div>
          <p style="font-size:.85rem;color:var(--text-3)">Code verified! Set your new password.</p>
        </div>
        <div class="form-group mb-12">
          <label>New Password</label>
          <input type="password" id="fpNewPass" placeholder="Enter new password"/>
        </div>
        <div class="form-group mb-16">
          <label>Confirm Password</label>
          <input type="password" id="fpConfPass" placeholder="Confirm new password"/>
        </div>
        <div class="auth-error" id="fpError" style="margin-bottom:12px"></div>
        <button class="btn btn-accent btn-block btn-lg" id="fpReset">Reset Password</button>`);

      SF.$("#fpReset").addEventListener("click",()=>{
        const np=SF.$("#fpNewPass")?.value||"",cp=SF.$("#fpConfPass")?.value||"";
        const err=vPass(np);
        if(err){const el=SF.$("#fpError");if(el){el.textContent=err;el.classList.add("show");}return;}
        if(np!==cp){const el=SF.$("#fpError");if(el){el.textContent="Passwords don't match";el.classList.add("show");}return;}
        // Update password in registeredUsers
        const user=AppData.registeredUsers.find(u=>u.email.toLowerCase()===email.toLowerCase());
        if(user)user.password=np;
        SF.ui.closeModal();
        SF.ui.toast("✅","Password reset successful! Please login.","success");
      });
    }
  }
  renderStep();
}

function renderSignup(){
  const c=SF.$("#authCard");let role="junior";
  c.innerHTML=`<div class="auth-tabs"><button class="auth-tab" id="atL">Login</button><button class="auth-tab active">Sign Up</button></div>
    <div class="auth-error" id="authError"></div>
    <div class="form-group mb-12"><label>I want to join as</label><div class="role-select">
      <div class="role-option selected" data-r="junior"><span class="role-emoji">📚</span><h4>Junior Student</h4></div>
      <div class="role-option" data-r="senior"><span class="role-emoji">🎓</span><h4>Senior Mentor</h4></div></div></div>
    <div id="sFields"></div>`;
  function renderFields(){
    SF.$("#sFields").innerHTML=`<div class="form-group mb-12"><label>Full Name</label><input id="sN" placeholder="Your name"/></div>
      <div class="form-group mb-12"><label>Email</label><input type="email" id="sE" placeholder="your.email@cumail.in"/></div>
      <div class="form-group mb-8"><label>Password</label><input type="password" id="sP" placeholder="Create password"/></div>
      <div class="password-rules mb-12">Minimum ${SF.K.MIN_PASS} characters</div>
      <div class="form-group mb-12"><label>University</label><input id="sU" value="Chandigarh University"/></div>
      <div class="form-row mb-12"><div class="form-group"><label>Course</label><input id="sC" placeholder="B.Tech CSE"/></div>
      <div class="form-group"><label>Semester</label><select id="sS">${[1,2,3,4,5,6,7,8].map(n=>`<option value="${n}">Sem ${n}</option>`).join("")}</select></div></div>
      ${role==="senior"?`<div class="form-row mb-12"><div class="form-group"><label>CGPA (min ${SF.K.MIN_CGPA}.0)</label><input type="number" step="0.1" id="sCg" placeholder="8.5"/></div>
      <div class="form-group"><label>Price/Session (₹)</label><input type="number" id="sPr" placeholder="149"/></div></div>
      <div class="form-group mb-12"><label>Subjects</label><input id="sSub" placeholder="DSA, DBMS, OS"/></div>
      <div class="form-group mb-12"><label>CGPA Proof</label><div class="file-upload"><div class="upload-icon">📎</div><p>Tap to upload</p></div></div>`:""}
      <button class="btn btn-accent btn-block btn-lg mt-8" id="signBtn">Create Account</button>
      <div class="auth-footer">Already have an account? <span class="auth-link" id="goL">Login</span></div>`;
    SF.$("#signBtn").addEventListener("click",doSignup);SF.$("#goL").addEventListener("click",renderLogin);
  }
  c.querySelectorAll(".role-option").forEach(o=>o.addEventListener("click",()=>{c.querySelectorAll(".role-option").forEach(x=>x.classList.remove("selected"));o.classList.add("selected");role=o.dataset.r;renderFields();}));
  SF.$("#atL").addEventListener("click",renderLogin);renderFields();
}

function doSignup(){
  const name=SF.$("#sN")?.value.trim(),email=SF.$("#sE")?.value.trim(),pass=SF.$("#sP")?.value;
  const uni=SF.$("#sU")?.value.trim(),course=SF.$("#sC")?.value.trim(),sem=parseInt(SF.$("#sS")?.value);
  const role=SF.$(".role-option.selected")?.dataset.r||"junior";
  if(!name){authErr("Name required");return;}let e=vEmail(email);if(e){authErr(e);return;}
  if(dupEmail(email)){authErr("Email already registered");return;}e=vPass(pass);if(e){authErr(e);return;}
  if(!course){authErr("Course required");return;}
  const init=name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  const u={id:"u"+Date.now(),name,initials:init,email,password:pass,role,university:uni,course,semester:sem,cgpa:null,isVerified:false,sessionsBooked:0,notesDownloaded:0,hoursLearned:0,walletBalance:0,purchasedNotes:[],recentNotes:[],paymentHistory:[],reviewsGiven:[],bookmarks:{mentors:[],notes:[],examResources:[]}};
  if(role==="senior"){
    const cg=parseFloat(SF.$("#sCg")?.value);if(!cg||cg<SF.K.MIN_CGPA){authErr(`CGPA must be ${SF.K.MIN_CGPA}.0+`);return;}
    u.cgpa=cg;u.subjects=(SF.$("#sSub")?.value||"").split(",").map(s=>s.trim()).filter(Boolean);
    if(!u.subjects.length){authErr("Enter at least one subject");return;}
    u.pricePerSession=parseInt(SF.$("#sPr")?.value)||149;u.totalEarnings=0;u.sessionEarnings=0;u.noteEarnings=0;u.studentsHelped=0;u.notesUploaded=0;
  }
  AppData.registeredUsers.push(u);AppData.user={...u};SF.S.role=role;SF.save();SF.auth.showApp();
}
})();
