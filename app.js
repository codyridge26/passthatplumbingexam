
(function(){
  // PWA install + SW
  let deferredPrompt; const installBtn=document.getElementById('installBtn');
  window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); deferredPrompt=e; installBtn.classList.remove('hidden'); });
  installBtn.addEventListener('click', async ()=>{ if(!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; installBtn.classList.add('hidden'); });
  if('serviceWorker' in navigator){ navigator.serviceWorker.register('/service-worker.js'); }

  const PASS_OK_KEY='pt_pass_ok_v32'; const MASTER='pipedope', SHANE='sridge';
  const $=id=>document.getElementById(id);
  const gate=document.getElementById('gate'), gi=$('gateInput'), gb=$('gateBtn'), ge=$('gateErr'), admin=$('adminPanel'), webhookI=$('webhook');
  const onboarding=$('onboarding'), dashboard=$('dashboard'), packRunner=$('packRunner'), simulator=$('simulator');

  const categories = [{"id": "business", "name": "Indiana Business"}, {"id": "general", "name": "General Requirements"}, {"id": "fixtures", "name": "Fixtures"}, {"id": "water_heaters", "name": "Water Heaters"}, {"id": "water_supply", "name": "Water Supply & Distribution"}, {"id": "sanitary", "name": "Sanitary Drainage"}, {"id": "vents", "name": "Vents"}, {"id": "isometric", "name": "Developed Length / Isometric Analysis"}, {"id": "storm", "name": "Storm Water Systems"}];
  const bank = [{"id": "BUS1", "cat": "business", "q": "Which clause best protects change scope mid\u2011job?", "a": ["Time is of the essence", "Written change\u2011order requirement with pricing method", "Arbitration only", "Warranty only"], "correct": 1, "ex": "Signed COs make scope/price/time changes enforceable."}, {"id": "BUS2", "cat": "business", "q": "Which clause best protects change scope mid\u2011job \u2014 what is required?", "a": ["Time is of the essence", "Written change\u2011order requirement with pricing method", "Arbitration only", "Warranty only"], "correct": 1, "ex": "Signed COs make scope/price/time changes enforceable."}, {"id": "BUS3", "cat": "business", "q": "Which clause best protects change scope mid\u2011job \u2014 choose the best answer.", "a": ["Time is of the essence", "Written change\u2011order requirement with pricing method", "Arbitration only", "Warranty only"], "correct": 1, "ex": "Signed COs make scope/price/time changes enforceable."}, {"id": "BUS4", "cat": "business", "q": "Which clause best protects change scope mid\u2011job \u2014 which applies under code?", "a": ["Time is of the essence", "Written change\u2011order requirement with pricing method", "Arbitration only", "Warranty only"], "correct": 1, "ex": "Signed COs make scope/price/time changes enforceable."}, {"id": "BUS5", "cat": "business", "q": "Workers\u2019 compensation covers:", "a": ["Client injury", "Employee injury", "Tool theft", "Property damage"], "correct": 1, "ex": ""}, {"id": "BUS6", "cat": "business", "q": "Workers\u2019 compensation covers:", "a": ["Client injury", "Employee injury", "Tool theft", "Property damage"], "correct": 1, "ex": ""}, {"id": "BUS7", "cat": "business", "q": "Workers\u2019 compensation covers:", "a": ["Client injury", "Employee injury", "Tool theft", "Property damage"], "correct": 1, "ex": ""}, {"id": "BUS8", "cat": "business", "q": "Workers\u2019 compensation covers:", "a": ["Client injury", "Employee injury", "Tool theft", "Property damage"], "correct": 1, "ex": ""}, {"id": "GEN9", "cat": "general", "q": "Who pulls a plumbing permit on a permitted job?", "a": ["Journeyman plumber", "Project owner", "Licensed plumbing contractor", "Inspector"], "correct": 2, "ex": ""}, {"id": "GEN10", "cat": "general", "q": "Who pulls a plumbing permit on a permitted job \u2014 what is required?", "a": ["Journeyman plumber", "Project owner", "Licensed plumbing contractor", "Inspector"], "correct": 2, "ex": ""}, {"id": "GEN11", "cat": "general", "q": "Who pulls a plumbing permit on a permitted job \u2014 choose the best answer.", "a": ["Journeyman plumber", "Project owner", "Licensed plumbing contractor", "Inspector"], "correct": 2, "ex": ""}, {"id": "GEN12", "cat": "general", "q": "Who pulls a plumbing permit on a permitted job \u2014 which applies under code?", "a": ["Journeyman plumber", "Project owner", "Licensed plumbing contractor", "Inspector"], "correct": 2, "ex": ""}, {"id": "FIX13", "cat": "fixtures", "q": "A lavatory clearance from centerline to sidewall is commonly:", "a": ["6 in", "12 in", "15 in", "24 in"], "correct": 2, "ex": "Check ADA/local amendments."}, {"id": "FIX14", "cat": "fixtures", "q": "A lavatory clearance from centerline to sidewall is commonly:", "a": ["6 in", "12 in", "15 in", "24 in"], "correct": 2, "ex": "Check ADA/local amendments."}, {"id": "FIX15", "cat": "fixtures", "q": "A lavatory clearance from centerline to sidewall is commonly:", "a": ["6 in", "12 in", "15 in", "24 in"], "correct": 2, "ex": "Check ADA/local amendments."}, {"id": "FIX16", "cat": "fixtures", "q": "A lavatory clearance from centerline to sidewall is commonly:", "a": ["6 in", "12 in", "15 in", "24 in"], "correct": 2, "ex": "Check ADA/local amendments."}, {"id": "WH17", "cat": "water_heaters", "q": "TPR valve must discharge:", "a": ["Upward", "To a safe location by gravity", "Into trap primer", "Capped"], "correct": 1, "ex": ""}, {"id": "WH18", "cat": "water_heaters", "q": "TPR valve must discharge:", "a": ["Upward", "To a safe location by gravity", "Into trap primer", "Capped"], "correct": 1, "ex": ""}, {"id": "WH19", "cat": "water_heaters", "q": "TPR valve must discharge:", "a": ["Upward", "To a safe location by gravity", "Into trap primer", "Capped"], "correct": 1, "ex": ""}, {"id": "WH20", "cat": "water_heaters", "q": "TPR valve must discharge:", "a": ["Upward", "To a safe location by gravity", "Into trap primer", "Capped"], "correct": 1, "ex": ""}, {"id": "WS21", "cat": "water_supply", "q": "Backflow high\u2011hazard device:", "a": ["AVB", "PVB", "RPZ", "Dual check"], "correct": 2, "ex": ""}, {"id": "WS22", "cat": "water_supply", "q": "Backflow high\u2011hazard device:", "a": ["AVB", "PVB", "RPZ", "Dual check"], "correct": 2, "ex": ""}, {"id": "WS23", "cat": "water_supply", "q": "Backflow high\u2011hazard device:", "a": ["AVB", "PVB", "RPZ", "Dual check"], "correct": 2, "ex": ""}, {"id": "WS24", "cat": "water_supply", "q": "Backflow high\u2011hazard device:", "a": ["AVB", "PVB", "RPZ", "Dual check"], "correct": 2, "ex": ""}, {"id": "SAN25", "cat": "sanitary", "q": "Minimum slope for 3\u2033 horizontal drainage:", "a": ["1/8 in/ft", "1/4 in/ft", "3/8 in/ft", "1/2 in/ft"], "correct": 1, "ex": "Many codes use 1/4 in/ft \u22643\u2033; verify local."}, {"id": "SAN26", "cat": "sanitary", "q": "Minimum slope for 3\u2033 horizontal drainage:", "a": ["1/8 in/ft", "1/4 in/ft", "3/8 in/ft", "1/2 in/ft"], "correct": 1, "ex": "Many codes use 1/4 in/ft \u22643\u2033; verify local."}, {"id": "SAN27", "cat": "sanitary", "q": "Minimum slope for 3\u2033 horizontal drainage:", "a": ["1/8 in/ft", "1/4 in/ft", "3/8 in/ft", "1/2 in/ft"], "correct": 1, "ex": "Many codes use 1/4 in/ft \u22643\u2033; verify local."}, {"id": "SAN28", "cat": "sanitary", "q": "Minimum slope for 3\u2033 horizontal drainage:", "a": ["1/8 in/ft", "1/4 in/ft", "3/8 in/ft", "1/2 in/ft"], "correct": 1, "ex": "Many codes use 1/4 in/ft \u22643\u2033; verify local."}, {"id": "VNT29", "cat": "vents", "q": "Wet venting allows shared:", "a": ["Trap arms", "Vent and drain section within limits", "Storm leaders", "Stacks only"], "correct": 1, "ex": ""}, {"id": "VNT30", "cat": "vents", "q": "Wet venting allows shared:", "a": ["Trap arms", "Vent and drain section within limits", "Storm leaders", "Stacks only"], "correct": 1, "ex": ""}, {"id": "VNT31", "cat": "vents", "q": "Wet venting allows shared:", "a": ["Trap arms", "Vent and drain section within limits", "Storm leaders", "Stacks only"], "correct": 1, "ex": ""}, {"id": "VNT32", "cat": "vents", "q": "Wet venting allows shared:", "a": ["Trap arms", "Vent and drain section within limits", "Storm leaders", "Stacks only"], "correct": 1, "ex": ""}, {"id": "ISO33", "cat": "isometric", "q": "Developed length equals:", "a": ["Straight only", "Fittings only", "Straight + fitting equivalents", "Vertical only"], "correct": 2, "ex": ""}, {"id": "ISO34", "cat": "isometric", "q": "Developed length equals:", "a": ["Straight only", "Fittings only", "Straight + fitting equivalents", "Vertical only"], "correct": 2, "ex": ""}, {"id": "ISO35", "cat": "isometric", "q": "Developed length equals:", "a": ["Straight only", "Fittings only", "Straight + fitting equivalents", "Vertical only"], "correct": 2, "ex": ""}, {"id": "ISO36", "cat": "isometric", "q": "Developed length equals:", "a": ["Straight only", "Fittings only", "Straight + fitting equivalents", "Vertical only"], "correct": 2, "ex": ""}, {"id": "STM37", "cat": "storm", "q": "Storm and sanitary systems are:", "a": ["Combined", "Separate", "Combined with AAV", "Combined if >6\u2033"], "correct": 1, "ex": ""}, {"id": "STM38", "cat": "storm", "q": "Storm and sanitary systems are:", "a": ["Combined", "Separate", "Combined with AAV", "Combined if >6\u2033"], "correct": 1, "ex": ""}, {"id": "STM39", "cat": "storm", "q": "Storm and sanitary systems are:", "a": ["Combined", "Separate", "Combined with AAV", "Combined if >6\u2033"], "correct": 1, "ex": ""}, {"id": "STM40", "cat": "storm", "q": "Storm and sanitary systems are:", "a": ["Combined", "Separate", "Combined with AAV", "Combined if >6\u2033"], "correct": 1, "ex": ""}];
  const flashcards = [{"term": "DFU", "def": "Drainage Fixture Unit; probable discharge measure."}, {"term": "Trap arm", "def": "Pipe between trap weir and the vent."}, {"term": "Developed length", "def": "Straight runs + equivalent lengths for fittings."}, {"term": "RPZ", "def": "Reduced pressure zone backflow assembly (high hazard)."}, {"term": "AAV", "def": "Air admittance valve; placement/jurisdiction limits apply."}, {"term": "Backwater valve", "def": "Prevents reverse flow in drainage line."}];

  const state = JSON.parse(localStorage.getItem('pt_state_v3_2')||JSON.stringify({studyTime:'20:30', phase:'mastery', catScores:{}, mistakes:{}, history:[], recent:[], logs:[], role:'user', webhook:''}));
  webhookI.value = state.webhook||'';
  function save(){ localStorage.setItem('pt_state_v3_2', JSON.stringify(state)); }

  function log(event, data){
    const row = {ts:new Date().toISOString(), event, role:state.role, ...data};
    state.logs.push(row); if(state.logs.length>500) state.logs.shift(); save();
    if(state.webhook){ try{ fetch(state.webhook, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(row)}); }catch(e){} }
  }

  // Gate
  function ok(){ return localStorage.getItem(PASS_OK_KEY)==='1'; }
  function showGate(){
    gb.onclick=()=>{
      const v=(gi.value||'').toLowerCase().replace(/\s+/g,'');
      if(v===MASTER){ state.role='admin'; save(); admin.classList.remove('hidden'); localStorage.setItem(PASS_OK_KEY,'1'); gate.remove(); init(); }
      else if(v===SHANE){ state.role='user'; save(); localStorage.setItem(PASS_OK_KEY,'1'); gate.remove(); init(); }
      else{ ge.textContent='Wrong code. Try again.'; }
    };
    gi.addEventListener('keydown',e=>{ if(e.key==='Enter') gb.click(); });
    $('saveHook').onclick=()=>{ state.webhook=webhookI.value.trim(); save(); ge.textContent='Saved.'; };
    $('exportCsv').onclick=()=>downloadCsv();
    $('exportJson').onclick=()=>downloadJson();
  }
  if(!ok()) showGate(); else init();

  function downloadJson(){
    const blob = new Blob([JSON.stringify(state.logs,null,2)], {type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='pass-track-logs.json'; a.click();
  }
  function downloadCsv(){
    if(!state.logs.length){ ge.textContent='No logs yet.'; return; }
    const keys=Object.keys(state.logs[0]);
    const lines=[keys.join(',')].concat(state.logs.map(r=>keys.map(k=>JSON.stringify(r[k] or '')).join(',')));
    const blob=new Blob([lines.join('\n')],{type:'text/csv'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='pass-track-logs.csv'; a.click();
  }

  // App
  function init(){
    log('open',{});
    $('startBtn').onclick=()=>{ state.studyTime=$('studyTime').value||'20:30'; save(); onboarding.classList.add('hidden'); dashboard.classList.remove('hidden'); renderDashboard(); log('start',{}); };
    if(state.studyTime){ onboarding.classList.add('hidden'); dashboard.classList.remove('hidden'); renderDashboard(); }

    $('openPack').onclick=()=>{ const warmCat=weakestCategory(); const warm=pickUnique(questionsByCat(warmCat),10); runPack({warmup:warm}); log('pack_open',{warmCat}); };
    $('reviewMistakes').onclick=()=>{ reviewMistakes(); log('mistake_review',{}); };
    $('fullSim').onclick=()=>{ startSimulator(); log('sim_start',{}); };

    function renderDashboard(){
      let mastered=0; categories.forEach(c=>{ const rec=state.catScores[c.id]; if(rec && passes(rec)>=2 && avg(rec.history)>=80) mastered++; });
      $('readiness').firstElementChild.style.width=Math.round((mastered/categories.length)*100)+'%';
      $('mistakeCount').textContent=Object.keys(state.mistakes||{}).length+' items';
      $('todaySummary').textContent='Warm‑up (weakest) • 20‑Q drill • 6 lookups';
      const grid=$('catGrid'); grid.innerHTML='';
      categories.forEach(c=>{ const rec=state.catScores[c.id]||{history:[],p:0}; const score=rec.history.length?Math.round(avg(rec.history)):0; const div=document.createElement('div'); div.className='cat'; div.innerHTML=`<span>${c.name}</span><span class="badge">${score}% • ${passes(rec)}/2</span>`; grid.appendChild(div); });
    }
    function passes(rec){ return rec.passes||0; }
    function avg(a){ return a.reduce((s,x)=>s+x,0)/a.length||0; }

    function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]];} return arr; }
    function weakestCategory(){ let min=101,out=categories[0].id; categories.forEach(c=>{ const rec=state.catScores[c.id]; const sc=rec&&rec.history.length?avg(rec.history):0; if(sc<min){min=sc; out=c.id;} }); return out; }
    function questionsByCat(cat){ return bank.filter(q=>q.cat===cat); }
    function pickUnique(pool, n){
      const recent=new Set(state.recent||[]); const available=pool.filter(q=>!recent.has(q.id));
      const chosen=[]; const used=new Set();
      while(chosen.length<n && used.size<available.length){ const i=Math.floor(Math.random()*available.length); if(used.has(i)) continue; used.add(i); chosen.push(available[i]); }
      while(chosen.length<n){ const q=pool[Math.floor(Math.random()*pool.length)]; if(chosen.find(x=>x.id===q.id)) continue; chosen.push(q); }
      state.recent=[...chosen.map(x=>x.id), ...(state.recent||[])].slice(0,100); save(); return chosen;
    }

    function runPack(p){
      dashboard.classList.add('hidden'); packRunner.classList.remove('hidden'); $('packTitle').textContent="Today’s Pack";
      const stage=$('packStage');
      const steps=[
        ()=>renderQuiz(p.warmup,'Warm‑up (10Q)', afterWarm),
        ()=>{ const wk=weakestCategory(); const drill=pickUnique(questionsByCat(wk),20); renderQuiz(drill,'Drill (20Q)', afterDrill); },
        ()=>renderLookups(['Min vent size for 4 DFU branch, 25 ft dev length?','Max trap arm length for 2″ trap?','Leader size for 3,000 ft² @ design rainfall?','Slope for 4″ horizontal storm?','Docs that protect change‑order payment?','Developed length definition?'],'Speed Lookups (6)', afterLookups)
      ];
      steps[0]();
      function afterWarm(score, byCat){ recordScores(byCat); log('pack_warm_done',{score}); steps[1](); }
      function afterDrill(score, byCat){ recordScores(byCat); log('pack_drill_done',{score}); steps[2](); }
      function afterLookups(){ packRunner.classList.add('hidden'); dashboard.classList.remove('hidden'); renderDashboard(); log('pack_done',{}); }

      function renderQuiz(questions,label,done){
        stage.innerHTML=`<h3>${label}</h3>`; let i=0, correct=0; const byCat={}; const qWrap=document.createElement('div'); stage.appendChild(qWrap); show();
        function show(){
          const q=questions[i]; if(!q){ const score=Math.round((correct/questions.length)*100); const next=$('nextStage'); next.classList.remove('hidden'); next.onclick=()=>{ next.classList.add('hidden'); done(score,byCat); }; return; }
          const idxs=[0,1,2,3]; shuffle(idxs); const correctIdx = idxs.indexOf(q.correct);
          qWrap.innerHTML=`<div class="q"><strong>Q${i+1}.</strong> ${q.q}</div><div class="choices"></div><div class="muted" id="explain"></div>`;
          const cWrap=qWrap.querySelector('.choices');
          idxs.forEach((orig,pos)=>{ const b=document.createElement('button'); b.textContent=q.a[orig]; b.onclick=()=>{ byCat[q.cat]=byCat[q.cat]||{t:0,c:0}; if(pos===correctIdx){ b.classList.add('correct'); correct++; byCat[q.cat].c++; } else { b.classList.add('wrong'); state.mistakes[q.id]={cat:q.cat,last:Date.now()}; $('explain').textContent=q.ex||''; } byCat[q.cat].t++; save(); i++; setTimeout(show,220); }; cWrap.appendChild(b); });
        }
      }
      function renderLookups(list,label,done){ stage.innerHTML=`<h3>{label}</h3><p class="muted">Answer verbally under 15s using refs.</p>`; const ul=document.createElement('ul'); list.forEach(x=>{ const li=document.createElement('li'); li.textContent=x; ul.appendChild(li); }); stage.appendChild(ul); const next=$('nextStage'); next.classList.remove('hidden'); next.onclick=()=>{ next.classList.add('hidden'); done(); }; }
    }

    function recordScores(byCat){
      Object.entries(byCat).forEach(([cat,s])=>{
        const pct=Math.round((s.c/(s.t||1))*100);
        const rec=state.catScores[cat]||{history:[],passes:0};
        rec.history.push(pct);
        if(pct>=80){ rec.passes=Math.min(2, (rec.passes||0)+1); }
        state.catScores[cat]=rec;
      });
      save();
    }

    function reviewMistakes(){
      const ids=Object.keys(state.mistakes||{});
      if(!ids.length){ alert('No mistakes saved yet.'); return; }
      const qs=bank.filter(q=>ids.includes(q.id));
      runPack({warmup:qs.slice(0,10)});
    }

    function startSimulator(){
      dashboard.classList.add('hidden'); simulator.classList.remove('hidden');
      const pool=[...bank]; shuffle(pool); const sample=pool.slice(0,100);
      const answers=new Array(sample.length).fill(null);
      let idx=0, remaining=3*60*60; const timer=$('timer'), nav=$('simNav'), qEl=$('simQ');
      const t=setInterval(()=>{ remaining--; const h=String(Math.floor(remaining/3600)).padStart(2,'0'); const m=String(Math.floor((remaining%3600)/60)).padStart(2,'0'); const s=String(remaining%60).padStart(2,'0'); timer.textContent=`${h}:{m}:{s}`; if(remaining<=0){finish();}},1000);
      $('simExit').onclick=()=>{ clearInterval(t); simulator.classList.add('hidden'); dashboard.classList.remove('hidden'); };
      renderNav(); renderQ();
      function renderNav(){ nav.innerHTML=''; sample.forEach((_,i)=>{ const b=document.createElement('button'); b.textContent=String(i+1); b.style.display='block'; b.style.margin='6px 0'; if(answers[i]!=null) b.style.border='2px solid #5AE1B9'; b.onclick=()=>{ idx=i; renderQ(); }; nav.appendChild(b); }); }
      function renderQ(){ const s=sample[idx]; const idxs=[0,1,2,3]; shuffle(idxs); const correctIdx=idxs.indexOf(s.correct); qEl.innerHTML=`<h3>Q${idx+1}</h3><p>${s.q}</p><div class="choices"></div><br><button id="nextQ">Next</button>`; const cWrap=qEl.querySelector('.choices'); idxs.forEach((orig,pos)=>{ const b=document.createElement('button'); b.textContent=s.a[orig]; b.onclick=()=>{ answers[idx]=(pos===correctIdx); renderNav(); }; cWrap.appendChild(b); }); qEl.querySelector('#nextQ').onclick=()=>{ if(idx<sample.length-1){ idx++; renderQ(); } else { finish(); } }; }
      function finish(){ clearInterval(t); const correct=answers.filter(Boolean).length; log('sim_done',{correct,total:sample.length}); alert(`Simulator complete. Score: ${correct}/${sample.length}`); simulator.classList.add('hidden'); dashboard.classList.remove('hidden'); renderDashboard(); }
    }
  }
})();
