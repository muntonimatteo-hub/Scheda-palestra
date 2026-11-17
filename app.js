
/* ---------- State ---------- */
let state = { sel:{}, kg:{}, ok:{}, last:{}, note:{}, day:"mar" };
let dbRef = null, saveTimer = null, writing = Promise.resolve();
const LS = "scheda-allenamento-v1";
const saveEl = document.getElementById("saveState");

function loadLocal(){ try{ const s = localStorage.getItem(LS); if(s) Object.assign(state, JSON.parse(s)); }catch(e){} }
function saveLocal(){ try{ localStorage.setItem(LS, JSON.stringify(state)); }catch(e){} }
function scheduleSave(){
  saveLocal();
  saveEl.textContent = "Salvataggio…";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(()=>{
    if(!dbRef){ saveEl.textContent = "Salvato su questo dispositivo"; return; }
    const snap = JSON.parse(JSON.stringify(state));
    writing = writing.then(()=>dbRef.set(snap)).then(()=>{ saveEl.textContent = "Salvato"; }).catch(()=>{ saveEl.textContent = "Salvato su questo dispositivo"; });
  }, 700);
}

/* ---------- Render ---------- */
const tabsEl = document.getElementById("tabs");
const mainEl = document.getElementById("main");
const exIndex = {};
PLAN.forEach(d=>d.blocks.forEach(b=>b.ex.forEach(e=>exIndex[e.id]=e)));

function renderTabs(){
  tabsEl.innerHTML = "";
  PLAN.forEach(d=>{
    const b = document.createElement("button");
    b.className = "tab"; b.type = "button"; b.setAttribute("role","tab");
    b.setAttribute("aria-selected", state.day===d.id ? "true":"false");
    b.innerHTML = `<b>${d.day}</b><span>${d.tab}</span>`;
    b.onclick = ()=>{ state.day = d.id; scheduleSave(); render(); window.scrollTo({top:0}); };
    tabsEl.appendChild(b);
  });
}
const esc = s => String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function render(){
  renderTabs();
  const d = PLAN.find(x=>x.id===state.day) || PLAN[0];
  let nEx=0, nSets=0;
  d.blocks.forEach(b=>b.ex.forEach(e=>{nEx++; nSets+=e.sets;}));
  let h = `<section class="hero">
    <p class="day">${d.day}</p>
    <p class="focus">${d.focus}</p>
    <div class="stats"><span><strong>${nEx}</strong> esercizi</span><span><strong>${nSets}</strong> serie</span><span>Margine <strong>1-3 rip</strong></span></div>
    <div class="toolbar">
      <button class="btn primary" type="button" id="newWeek">Nuova settimana</button>
      <button class="btn" type="button" id="openGuide">Come eseguire le ripetizioni</button>
    </div>
  </section>`;
  d.blocks.forEach(b=>{
    h += `<section class="block"><h2>${esc(b.name)}</h2>`;
    b.ex.forEach(e=>{ h += exHTML(e); });
    h += `</section>`;
  });
  mainEl.innerHTML = h;
  bind(d);
}

const KG_STEPS = (()=>{ const a=[]; for(let k=0.5;k<=20;k+=0.5)a.push(k); for(let k=22.5;k<=250;k+=2.5)a.push(k); return a; })();
const fmtKg = n => String(n).replace(".", ",");
function kgOptions(v){
  const cur = (v===""||v===undefined||v===null) ? null : Number(v);
  const list = KG_STEPS.slice();
  if(cur!==null && !list.includes(cur)){ list.push(cur); list.sort((a,b)=>a-b); }
  let h = `<option value="" ${cur===null?"selected":""}>—</option>`;
  list.forEach(k=>{ h += `<option value="${k}" ${k===cur?"selected":""}>${fmtKg(k)}</option>`; });
  return h;
}

function exHTML(e){
  const si = state.sel[e.id] || 0;
  const opt = e.opts[si];
  const key = e.id + "|" + si;
  const kgs = state.kg[key] || [];
  const oks = state.ok[e.id + "|" + si] || [];
  const prev = (state.last||{})[key] || [];
  const note = (state.note||{})[key] || "";
  const isP = e.type === "P";
  const allOk = oks.length===e.sets && oks.every(Boolean);
  let sets = "";
  for(let i=0;i<e.sets;i++){
    const v = kgs[i] !== undefined && kgs[i] !== "" ? kgs[i] : (si===0 && e.kg ? e.kg : "");
    sets += `<div class="set${oks[i]?" done":""}">
      <label for="${e.id}-s${i}">S${i+1}</label>
      <div class="set-row"><select class="kgsel" id="${e.id}-s${i}" data-ex="${e.id}" data-i="${i}" aria-label="Kg serie ${i+1}">${kgOptions(v)}</select><span class="u">kg</span></div>
      <input type="checkbox" class="chk" data-ok="${e.id}" data-i="${i}" ${oks[i]?"checked":""} aria-label="Serie ${i+1} completata al massimo delle ripetizioni">
      ${prev[i]!==undefined && prev[i]!=="" ? `<span class="prev">Ultima volta: ${fmtKg(prev[i])} kg</span>` : ""}
    </div>`;
  }
  const options = e.opts.map((o,i)=>`<option value="${i}" ${i===si?"selected":""}>${i===0?"":"↺ "}${esc(o[0])}</option>`).join("");
  const repsSub = e.repsLabel ? e.repsLabel : (e.unit ? "rip " + e.unit : "ripetizioni");
  const repsMain = `${e.sets}×${e.reps.replace(" m","")}`;
  return `<article class="ex${e.added?" glute":""}${allOk?" ready":""}" data-id="${e.id}">
    ${e.added?'<span class="added">Aggiunto per i glutei</span>':""}
    <div class="ex-head">
      <div>
        <div class="sel-wrap"><select class="exsel" data-sel="${e.id}" aria-label="Esercizio o sostituto">${options}</select></div>
        <div class="sub-note${si?" alt":""}">${si?"Sostituto di: "+esc(e.opts[0][0]):"Tocca il nome per scegliere un sostituto"}</div>
      </div>
      <div class="reps"><b>${repsMain}</b><small>${repsSub}</small></div>
    </div>
    <div class="chips">
      <span class="chip k">${isP?"Principale":"Complementare"}</span>
      <span class="chip">Recupero ${isP?"2-3 min":"60-120 s"}</span>
      <span class="chip">Ritmo ${isP?"3-1-1":"2-1-1 + 1 s in contrazione"}</span>
    </div>
    <p class="cue">${esc(opt[1])}</p>
    <div class="sets">${sets}</div>
    <textarea class="note" data-note="${e.id}" rows="1" placeholder="Scrivi qui liberamente: kg raggiunti, ripetizioni fatte, sensazioni…" aria-label="Note libere">${esc(note)}</textarea>
    <div class="up">Tutte le serie al massimo: la prossima volta aumenta ${isP?"del 2,5-5%":"di un incremento"}.</div>
    <div class="ex-foot">
      <span class="hint">Spunta la serie se chiusa al limite alto delle ripetizioni</span>
      <button type="button" class="rest-btn" data-rest="${isP?150:90}" data-name="${esc(opt[0])}">Recupero ${isP?"2:30":"1:30"}</button>
    </div>
  </article>`;
}

function bind(d){
  const nw = document.getElementById("newWeek");
  nw.onclick = ()=>{
    if(nw.dataset.armed!=="1"){
      nw.dataset.armed = "1"; nw.textContent = "Tocca di nuovo per confermare";
      setTimeout(()=>{ if(nw.isConnected){ nw.dataset.armed = ""; nw.textContent = "Nuova settimana"; } }, 4000);
      return;
    }
    state.last = state.last || {};
    d.blocks.forEach(b=>b.ex.forEach(e=>{ e.opts.forEach((_,i)=>{
      const k = e.id+"|"+i; delete state.ok[k];
      const cur = state.kg[k] || (i===0 && e.kg ? new Array(e.sets).fill(e.kg) : null);
      if(cur && cur.some(x=>x!=="" && x!==undefined && x!==null)) state.last[k] = cur.slice();
    }); }));
    scheduleSave(); render();
  };
  document.getElementById("openGuide").onclick = ()=>{
    const g = document.getElementById("guide"); g.open = true; g.scrollIntoView({behavior:"smooth"});
  };
  mainEl.querySelectorAll("select[data-sel]").forEach(s=>{
    s.onchange = ()=>{ state.sel[s.dataset.sel] = +s.value; scheduleSave(); render(); };
  });
  mainEl.querySelectorAll("textarea[data-note]").forEach(t=>{
    t.oninput = ()=>{ const e = exIndex[t.dataset.note], si = state.sel[e.id]||0; state.note = state.note || {}; state.note[e.id+"|"+si] = t.value; scheduleSave(); };
  });
  mainEl.querySelectorAll("select[data-ex]").forEach(inp=>{
    inp.onchange = ()=>{
      const e = exIndex[inp.dataset.ex], si = state.sel[e.id]||0, key = e.id+"|"+si;
      const arr = state.kg[key] ? state.kg[key].slice() : [];
      for(let i=0;i<e.sets;i++) if(arr[i]===undefined) arr[i] = (si===0 && e.kg) ? e.kg : "";
      arr[+inp.dataset.i] = inp.value === "" ? "" : Number(inp.value);
      state.kg[key] = arr; scheduleSave();
    };
  });
  mainEl.querySelectorAll("input[data-ok]").forEach(c=>{
    c.onchange = ()=>{
      const e = exIndex[c.dataset.ok], si = state.sel[e.id]||0, key = e.id+"|"+si;
      const arr = state.ok[key] ? state.ok[key].slice() : new Array(e.sets).fill(false);
      arr[+c.dataset.i] = c.checked; state.ok[key] = arr;
      c.closest(".set").classList.toggle("done", c.checked);
      const card = c.closest(".ex");
      card.classList.toggle("ready", arr.length===e.sets && arr.every(Boolean));
      scheduleSave();
    };
  });
  mainEl.querySelectorAll(".rest-btn").forEach(b=>{
    b.onclick = ()=>startTimer(+b.dataset.rest, b.dataset.name);
  });
}

/* ---------- Timer ---------- */
const tEl = document.getElementById("timer"), tVal = document.getElementById("tVal"), tLab = document.getElementById("tLab");
let tLeft = 0, tInt = null;
function fmt(s){ const m = Math.floor(s/60), r = s%60; return m + ":" + String(r).padStart(2,"0"); }
function startTimer(sec, name){
  clearInterval(tInt); tLeft = sec; tEl.classList.add("on"); tEl.classList.remove("end");
  tLab.textContent = "Recupero · " + name; tVal.textContent = fmt(tLeft);
  tInt = setInterval(()=>{
    tLeft--; tVal.textContent = fmt(Math.max(tLeft,0));
    if(tLeft<=0){ clearInterval(tInt); tEl.classList.add("end"); tLab.textContent = "Pronto per la serie successiva"; try{ navigator.vibrate && navigator.vibrate([200,100,200]); }catch(e){} }
  },1000);
}
document.getElementById("tAdd").onclick = ()=>{ if(tLeft<=0){ startTimer(30, tLab.textContent.replace("Recupero · ","")); } else { tLeft += 30; tVal.textContent = fmt(tLeft); } };
document.getElementById("tStop").onclick = ()=>{ clearInterval(tInt); tEl.classList.remove("on","end"); };

/* ---------- Boot ---------- */
loadLocal();
render();
saveEl.textContent = "Salvato su questo dispositivo";
