/* StudyFix v5.0 — Payment System (Production) */
(function(){
"use strict";
SF.pay={};
SF.pay.open=(opts)=>{
  try{
  let sel="upi";

  function getFee(method){
    // Wallet payments: 0% fee. UPI/Card/Netbanking: 5% fee
    if(method==="wallet")return 0;
    return Math.round(opts.amount*SF.K.FEE/100);
  }

  function render(){
    const fee=getFee(sel);
    const total=opts.amount+fee;

    const methodInputs={
      upi:`<div class="payment-input-group"><label>UPI ID</label><input id="payInput" placeholder="name@upi" autocomplete="off"/></div>`,
      card:`<div class="payment-input-group"><label>Card Number</label><input id="payInput" placeholder="**** **** **** ****" maxlength="19" autocomplete="off"/></div><div class="payment-input-row"><div class="payment-input-group"><label>Expiry</label><input id="payExpiry" placeholder="MM/YY" maxlength="5"/></div><div class="payment-input-group"><label>CVV</label><input id="payCvv" placeholder="***" maxlength="3" type="password"/></div></div>`,
      netbanking:`<div class="payment-input-group"><label>Select Bank</label><select id="payInput"><option value="">Choose your bank</option><option value="sbi">State Bank of India</option><option value="hdfc">HDFC Bank</option><option value="icici">ICICI Bank</option><option value="axis">Axis Bank</option><option value="pnb">Punjab National Bank</option><option value="kotak">Kotak Mahindra Bank</option><option value="bob">Bank of Baroda</option></select></div>`,
      wallet:""
    };

    SF.ui.modal("💳 Payment",`
      <div style="text-align:center;margin-bottom:16px"><h3 style="font-size:1rem;font-weight:700">${SF.escapeHtml(opts.title)}</h3><p style="font-size:.82rem;color:var(--text-3)">${SF.escapeHtml(opts.description)}</p></div>
      <div class="card payment-summary"><div class="ps-row"><span class="label">Amount</span><span class="value">₹${opts.amount}</span></div><div class="ps-row"><span class="label">Platform Fee (${sel==="wallet"?"0":SF.K.FEE}%)</span><span class="value">₹${fee}</span></div><div class="ps-row"><span class="label">Total</span><span class="value" style="color:var(--accent-700)">₹${total}</span></div></div>
      <h4 style="font-size:.85rem;font-weight:700;margin-bottom:10px">Payment Method</h4>
      <div class="payment-methods">${AppData.paymentMethods.map(pm=>`<div class="payment-method ${pm.id===sel?"selected":""}" data-pm="${pm.id}"><div class="pm-icon">${pm.icon}</div><div class="pm-info"><h4>${SF.escapeHtml(pm.name)}</h4><p>${SF.escapeHtml(pm.description)}</p></div><div class="pm-radio"></div></div>`).join("")}</div>
      ${methodInputs[sel]||""}
      ${sel==="wallet"?`<div style="font-size:.78rem;color:var(--text-3);margin-bottom:12px">Wallet: <strong style="color:var(--accent-600)">₹${AppData.user.walletBalance||0}</strong>${(AppData.user.walletBalance||0)<total?' <span style="color:var(--red)">(Insufficient)</span>':""}</div>`:""}
      <button class="btn btn-accent btn-block btn-lg" id="payNowBtn" ${sel==="wallet"&&(AppData.user.walletBalance||0)<total?"disabled":""}>Pay ₹${total}</button>`);

    SF.D.mbd.querySelectorAll("[data-pm]").forEach(el=>el.addEventListener("click",()=>{sel=el.dataset.pm;render();}));

    // Card number formatting
    if(sel==="card"){
      SF.$("#payInput")?.addEventListener("input",e=>{let v=e.target.value.replace(/\D/g,"").substring(0,16);v=v.replace(/(.{4})/g,"$1 ").trim();e.target.value=v;});
      SF.$("#payExpiry")?.addEventListener("input",e=>{let v=e.target.value.replace(/\D/g,"").substring(0,4);if(v.length>2)v=v.substring(0,2)+"/"+v.substring(2);e.target.value=v;});
    }

    SF.$("#payNowBtn")?.addEventListener("click",()=>process(total,sel,opts.onSuccess,opts.description));
  }
  render();
  }catch(e){SF.ui.toast("⚠️","Something went wrong","warning");console.error("Payment open error:",e);}
};

function process(total,method,onSuccess,desc){
  try{
  // Validate input for methods that require it
  if(method==="upi"){const v=SF.$("#payInput")?.value;if(!v||!v.includes("@")){SF.ui.toast("⚠️","Enter valid UPI ID","warning");return;}}
  if(method==="card"){const v=SF.$("#payInput")?.value;if(!v||v.replace(/\s/g,"").length<16){SF.ui.toast("⚠️","Enter valid card number","warning");return;}}
  if(method==="netbanking"){const v=SF.$("#payInput")?.value;if(!v){SF.ui.toast("⚠️","Select a bank","warning");return;}}

  const btn=SF.$("#payNowBtn");btn.disabled=true;btn.innerHTML='<span class="processing-spinner"></span>Processing...';
  setTimeout(()=>{
    if(method==="wallet")AppData.user.walletBalance=(AppData.user.walletBalance||0)-total;
    const methodLabel=method==="upi"?"UPI":method==="card"?"Card":method==="netbanking"?"Net Banking":"Wallet";
    SF.U.addTx("debit",total,desc||"Payment",methodLabel);SF.save();

    // Success with confetti
    SF.D.mbd.innerHTML=`<div class="payment-success-v2">
      <div class="success-ring"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div>
      <h3>Payment Successful!</h3>
      <div class="success-amount">₹${total}</div>
      <div class="success-method">Paid via <span class="method-badge">${methodLabel}</span></div>
      <button class="btn btn-primary btn-block" id="payDoneBtn">Done</button>
    </div>`;
    SF.D.mt.textContent="✅ Payment Complete";

    // Add confetti particles
    SF.ui.confetti(SF.D.mbd.querySelector(".payment-success-v2"));
    SF.$("#payDoneBtn")?.addEventListener("click",()=>{SF.ui.closeModal();if(onSuccess)onSuccess();});
  },1500);
  }catch(e){SF.ui.toast("⚠️","Payment failed","warning");console.error("Payment process error:",e);}
}
})();
