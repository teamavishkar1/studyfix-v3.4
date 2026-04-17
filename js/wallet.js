/* StudyFix v5.0 — Wallet & Withdrawals (Production) */
(function(){
"use strict";
SF.wallet={};
const esc=SF.escapeHtml;

SF.wallet.render=()=>{
  SF.ui.loading('list');
  setTimeout(()=>{try{renderWallet();}catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Wallet render error:",e);}},SF.K.LOAD_MS);
};

function renderWallet(){
  const u=AppData.user,txs=u.paymentHistory||[],sr=SF.S.role==="senior";
  let txFilter="all";

  function render(){
    const filtered=txFilter==="all"?txs:txs.filter(tx=>tx.type===txFilter);
    SF.D.pg.innerHTML=`
      ${SF.ui.backBtn("profile","← Back to Profile")}
      <div class="wallet-hero-v2">
        <div class="wh-label">${sr?"Total Earnings":"Available Balance"}</div>
        <div class="wh-balance">₹${u.walletBalance||0}</div>
        <div class="wh-subtitle">${sr?`${u.studentsHelped||0} students helped · ${u.notesUploaded||0} notes sold`:"StudyFix Wallet · Instant Payments"}</div>
        <div class="wh-actions">
          ${!sr?`<button class="wh-action-btn primary" id="whAdd">💰 Add Money</button>`:`<button class="wh-action-btn primary" id="whWithdraw">💸 Withdraw</button>`}
          <button class="wh-action-btn secondary" id="whHistory">📊 History</button>
        </div>
      </div>

      ${sr?`<div class="grad-stats">
        <div class="grad-card gc-blue"><div class="gc-icon">💰</div><div class="gc-value">₹${u.sessionEarnings||0}</div><div class="gc-label">Sessions</div></div>
        <div class="grad-card gc-green"><div class="gc-icon">📄</div><div class="gc-value">₹${u.noteEarnings||0}</div><div class="gc-label">Notes</div></div>
      </div>`:""}

      <div class="section-header"><h2>Transaction History</h2></div>
      <div class="tx-filters">
        <button class="tx-filter ${txFilter==="all"?"active":""}" data-txf="all">All</button>
        <button class="tx-filter ${txFilter==="credit"?"active":""}" data-txf="credit">Credits</button>
        <button class="tx-filter ${txFilter==="debit"?"active":""}" data-txf="debit">Debits</button>
      </div>
      <div class="card glass-card tx-list">${filtered.length?filtered.map((tx,i)=>`<div class="tx-item card-animate tx-slide-in" style="animation-delay:${i*0.05}s"><div class="tx-icon ${tx.type}">${tx.type==="credit"?"↓":"↑"}</div><div class="tx-info"><h4>${esc(tx.desc)}</h4><p>${esc(tx.date)} · ${esc(tx.time)} · ${esc(tx.method)}</p></div><div class="tx-amount ${tx.type}">${tx.type==="credit"?"+":"-"}₹${tx.amount}</div></div>`).join(""):'<div class="empty" style="padding:20px"><p>No transactions yet.</p></div>'}</div>`;

    // Bind filter tabs
    SF.D.pg.querySelectorAll("[data-txf]").forEach(f=>f.addEventListener("click",()=>{txFilter=f.dataset.txf;render();}));

    // Add Money
    SF.$("#whAdd")?.addEventListener("click",()=>{
      let selAmt=500;
      function renderModal(){
        SF.ui.modal("💰 Add Money",`
          <div class="amount-chips">${[100,200,500,1000].map(a=>`<button class="amount-chip ${a===selAmt?"selected":""}" data-ac="${a}">₹${a}</button>`).join("")}</div>
          <div class="form-group mb-16"><label>Custom Amount (₹)</label><input type="number" id="wAmt" placeholder="Enter amount" value="${selAmt}"/></div>
          <button class="btn btn-accent btn-block btn-lg" id="wConf">Add ₹${selAmt} to Wallet</button>`);
        SF.D.mbd.querySelectorAll("[data-ac]").forEach(c=>c.addEventListener("click",()=>{selAmt=parseInt(c.dataset.ac);renderModal();}));
        SF.$("#wAmt")?.addEventListener("input",e=>{selAmt=parseInt(e.target.value)||0;const btn=SF.$("#wConf");if(btn)btn.textContent=`Add ₹${selAmt} to Wallet`;});
        SF.$("#wConf").addEventListener("click",()=>{const a=parseInt(SF.$("#wAmt")?.value)||0;if(a>0){AppData.user.walletBalance=(AppData.user.walletBalance||0)+a;SF.U.addTx("credit",a,"Added to Wallet","UPI");SF.save();SF.ui.closeModal();SF.ui.toast("💰",`₹${a} added to wallet`,"success");renderWallet();}else{SF.ui.toast("⚠️","Enter a valid amount","warning");}});
      }
      renderModal();
    });

    // Withdraw (Seniors)
    SF.$("#whWithdraw")?.addEventListener("click",()=>openWithdrawModal());
    SF.$("#whHistory")?.addEventListener("click",()=>{SF.D.pg.querySelector(".tx-list")?.scrollIntoView({behavior:"smooth"});});
  }
  render();
}

function openWithdrawModal(){
  let step=1,amount=1000,method="upi",dest="";
  const bal=AppData.user.walletBalance||0;

  function renderStep(){
    const stepsHtml=`<div class="withdraw-steps">
      <div class="withdraw-step ${step>=1?"active":""} ${step>1?"done":""}"><span class="ws-num">${step>1?"✓":"1"}</span>Amount</div>
      <div class="withdraw-sep"></div>
      <div class="withdraw-step ${step>=2?"active":""} ${step>2?"done":""}"><span class="ws-num">${step>2?"✓":"2"}</span>Method</div>
      <div class="withdraw-sep"></div>
      <div class="withdraw-step ${step>=3?"active":""}"><span class="ws-num">3</span>Confirm</div>
    </div>`;

    if(step===1){
      SF.ui.modal("💸 Withdraw Earnings",`${stepsHtml}
        <div style="text-align:center;margin-bottom:16px"><p style="font-size:.82rem;color:var(--text-3)">Available: <strong style="color:var(--accent-600)">₹${bal}</strong></p></div>
        <div class="amount-chips">${[500,1000,2000,5000].map(a=>`<button class="amount-chip ${a===amount?"selected":""}" data-wa="${a}">₹${a}</button>`).join("")}</div>
        <div class="form-group mb-16"><label>Withdraw Amount (₹)</label><input type="number" id="wdAmt" value="${amount}" placeholder="Enter amount"/></div>
        ${amount>bal?'<div class="balance-warning">⚠️ Insufficient balance</div>':""}
        <button class="btn btn-primary btn-block btn-lg" id="wdNext" ${amount>bal||amount<=0?"disabled":""}>Continue →</button>`);
      SF.D.mbd.querySelectorAll("[data-wa]").forEach(c=>c.addEventListener("click",()=>{amount=parseInt(c.dataset.wa);renderStep();}));
      SF.$("#wdAmt")?.addEventListener("input",e=>{amount=parseInt(e.target.value)||0;const btn=SF.$("#wdNext");if(btn){btn.disabled=amount>bal||amount<=0;}});
      SF.$("#wdNext")?.addEventListener("click",()=>{amount=parseInt(SF.$("#wdAmt")?.value)||0;if(amount>0&&amount<=bal){step=2;renderStep();}});
    }
    else if(step===2){
      SF.ui.modal("💸 Withdraw Earnings",`${stepsHtml}
        <h4 style="font-size:.88rem;font-weight:700;margin-bottom:12px">Select Method</h4>
        <div class="withdraw-method-card ${method==="upi"?"selected":""}" data-wm="upi"><div class="wm-icon">📱</div><div class="wm-info"><h4>UPI Transfer</h4><p>Google Pay, PhonePe, Paytm</p></div><div class="wm-radio"></div></div>
        <div class="withdraw-method-card ${method==="bank"?"selected":""}" data-wm="bank"><div class="wm-icon">🏦</div><div class="wm-info"><h4>Bank Transfer</h4><p>Direct to your bank account</p></div><div class="wm-radio"></div></div>
        ${method==="upi"?`<div class="payment-input-group"><label>UPI ID</label><input id="wdDest" placeholder="name@upi" value="${esc(dest)}"/></div>`:`<div class="payment-input-group"><label>Account Number</label><input id="wdDest" placeholder="**** **** **** 1234" value="${esc(dest)}"/></div><div class="payment-input-group"><label>IFSC Code</label><input id="wdIfsc" placeholder="SBIN0001234"/></div>`}
        <div style="display:flex;gap:8px;margin-top:16px">
          <button class="btn btn-ghost" id="wdBack" style="flex:1">← Back</button>
          <button class="btn btn-primary" id="wdNext2" style="flex:2">Continue →</button>
        </div>`);
      SF.D.mbd.querySelectorAll("[data-wm]").forEach(c=>c.addEventListener("click",()=>{method=c.dataset.wm;dest="";renderStep();}));
      SF.$("#wdBack")?.addEventListener("click",()=>{step=1;renderStep();});
      SF.$("#wdNext2")?.addEventListener("click",()=>{dest=SF.$("#wdDest")?.value.trim()||"";if(!dest){SF.ui.toast("⚠️","Enter account details","warning");return;}step=3;renderStep();});
    }
    else if(step===3){
      SF.ui.modal("💸 Confirm Withdrawal",`${stepsHtml}
        <div class="card" style="padding:16px;margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:.82rem"><span style="color:var(--text-3)">Amount</span><span style="font-weight:700">₹${amount}</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:.82rem"><span style="color:var(--text-3)">Method</span><span style="font-weight:700">${method==="upi"?"UPI Transfer":"Bank Transfer"}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:.82rem"><span style="color:var(--text-3)">To</span><span style="font-weight:700">${esc(dest)}</span></div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost" id="wdBack2" style="flex:1">← Back</button>
          <button class="btn btn-accent" id="wdConfirm" style="flex:2">Confirm Withdrawal</button>
        </div>`);
      SF.$("#wdBack2")?.addEventListener("click",()=>{step=2;renderStep();});
      SF.$("#wdConfirm")?.addEventListener("click",()=>{
        const btn=SF.$("#wdConfirm");btn.disabled=true;btn.innerHTML='<span class="processing-spinner"></span>Processing...';
        setTimeout(()=>{
          AppData.user.walletBalance-=amount;
          SF.U.addTx("debit",amount,"Withdrawal to "+(method==="upi"?"UPI":"Bank"),method==="upi"?"UPI Transfer":"Bank Transfer");
          SF.save();

          // Success with confetti
          SF.D.mbd.innerHTML=`<div class="payment-success-v2">
            <div class="success-ring"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div>
            <h3>Withdrawal Successful!</h3>
            <div class="success-amount">₹${amount}</div>
            <div class="success-method">Sent via <span class="method-badge">${method==="upi"?"UPI":"Bank Transfer"}</span></div>
            <p style="font-size:.75rem;color:var(--text-4);margin-bottom:20px">Expected in 1-3 business days</p>
            <button class="btn btn-primary btn-block" id="wdDone">Done</button>
          </div>`;
          SF.D.mt.textContent="✅ Withdrawal Complete";
          SF.ui.confetti(SF.D.mbd.querySelector(".payment-success-v2"));
          SF.$("#wdDone")?.addEventListener("click",()=>{SF.ui.closeModal();renderWallet();});
        },1500);
      });
    }
  }
  renderStep();
}
})();
