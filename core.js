</* ===== Protocolo 4a ed - NUCLEO =====
   estado S, salvar/carregar, calculos, rolagem, render de cada aba, Fardos,
   Maestrias, medidores genericos, inventario e biblioteca.
   depende de data.js. chama applyTheme()/whisperLoop()/syncFX() de climate.js,
   sempre em tempo de execucao (boot roda no DOMContentLoaded). */
/* ============ NÚCLEO ============ */
const $=id=>document.getElementById(id);
const esc=s=>(s==null?"":String(s)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const rAF=window.requestAnimationFrame?window.requestAnimationFrame.bind(window):(f=>setTimeout(()=>f(performance.now()),40));
function toast(m){const t=$("toast");t.textContent=m;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("show"),2400);}
function rw(){return `<span class="rw" title="Ruído" aria-label="Ruído">${W_RUIDO}</span>`;}
function hhmm(){const d=new Date();return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");}
const STG=["Aprendiz","Veterano","Mestre","Ápice"];
const ELM=id=>ELEMS.find(e=>e.id===id)||null;

/* ---------- estado ---------- */
const DEF=()=>({v:4,nome:"",jogador:"",conceito:"",raiz:"",fardo:"",fardosX:[],nivel:1,
attrs:{car:0,ner:0,jui:0,tem:0,lab:0},
cur:{vida:null,fol:null,sin:null,luc:null},curMax:{vida:null,fol:null,sin:null,luc:null,gente:null},gente:null,brio:1,defesa:8,
/* curMax guarda BÔNUS sobre o cálculo automático, não o total. nasce `false` de propósito:
   Object.assign(DEF(),json) só sobrescreve as chaves que o JSON tem, então uma ficha antiga
   (que não tem esta chave) herda o `false` daqui e migra. nascesse `true`, ela herdaria o
   `true` e o valor antigo nunca seria convertido — a migração morreria calada. ficha nova não
   precisa de proteção: com curMax todo vazio, a migração não tem o que converter. */
_migMaxBonus:false,
ruido:0,elem:"",dinheiro:0,
/* perf: a Perfeição do Sintonizador, 0-100. nasce 0, e ficha antiga (que não tem a chave)
   herda este 0 pelo Object.assign(DEF(),json) do carregamento — não precisa de migração */
perf:0,
per:{},profis:"",esc:[],maest:[],tal:[],conh:[],
custom:{hab:[],mag:[],mae:[]},cond:{},
inv:{pieces:[],bag:[],seq:1},
div:[],cred:[],notas:"",hist:"",vinc:"",pcExtra:0,
sess:{notes:[],log:[]},
ui:{tab:"inicial",mute:false,calm:false,sess:false}});
var S=DEF();
function fixS(){const d=DEF();
 for(const k of["attrs","cur","curMax","custom","inv","sess","ui"])S[k]=Object.assign({},d[k],S[k]||{});
 for(const k of["fardosX","esc","maest","tal","conh","div","cred"])if(!Array.isArray(S[k]))S[k]=[];
 for(const k of["hab","mag","mae"])if(!Array.isArray(S.custom[k]))S.custom[k]=[];
 if(!Array.isArray(S.sess.notes))S.sess.notes=[];if(!Array.isArray(S.sess.log))S.sess.log=[];
 if(typeof S.per!=="object"||!S.per)S.per={};if(typeof S.cond!=="object"||!S.cond)S.cond={};
 if(!S.inv.pieces)S.inv.pieces=[];if(!S.inv.bag)S.inv.bag=[];if(!S.inv.seq)S.inv.seq=1;
 for(const m of S.maest){if(typeof m.rec!=="number")m.rec=0;if(typeof m.recMax!=="number")m.recMax=null;
  if(typeof m.st!=="number")m.st=parseInt(m.st,10)||0;}
 S.perf=clampPerf(S.perf);   /* ausente, texto, nulo ou fora da faixa: tudo cai em 0-100 */
 migMaxBonus();
 clampCur();}              /* DEPOIS da migração: antes dela os máximos ainda são os antigos */

/* ---------- migração: teto que SUBSTITUÍA → bônus que SOMA ----------
   até aqui, um máximo escrito na mão congelava o recurso: subir de nível ou de estágio não
   mexia mais nele. agora o campo é um bônus permanente (de talento, de item, de penalidade)
   somado ao cálculo automático. para não mudar do nada a ficha de ninguém, o valor antigo é
   convertido UMA vez: bônus = total_antigo − base_de_agora, o que devolve exatamente o mesmo
   total na tela. rodar isto duas vezes deslocaria o bônus de novo, então cada ficha carrega
   a própria marca (_migMaxBonus) e cada maestria a dela (m._migBonus). */
function migMaxBonus(){
 if(!S._migMaxBonus){
  for(const k of ["vida","fol","sin","luc"]){const o=S.curMax[k];
   if(o==null||o==="")continue;
   const v=parseInt(o,10);
   S.curMax[k]=isNaN(v)?null:v-baseMaxOf(k);}   /* gente fica de fora: o campo não existia */
  S._migMaxBonus=true;save();}
 for(const m of S.maest){
  if(m._migBonus)continue;
  if(typeof m.recMax==="number"){const d=meterOf(m);
   if(d)m.recMax=m.recMax-d.tetos[m.st];else m.recMax=null;}
  m._migBonus=true;save();}}

/* ---------- salvar ---------- */
let _st=null;
function save(){clearTimeout(_st);_st=setTimeout(()=>{try{localStorage.setItem("p4auto",JSON.stringify(S));}catch(e){}},300);}
function loadAuto(){try{const j=localStorage.getItem("p4auto");if(j){S=Object.assign(DEF(),JSON.parse(j));fixS();}}catch(e){}}
function slots(){try{return JSON.parse(localStorage.getItem("p4slots")||"[]");}catch(e){return[];}}
function saveSlot(id,name){try{const L=slots().filter(s=>s.id!==id);L.unshift({id,name,ts:Date.now()});localStorage.setItem("p4slots",JSON.stringify(L.slice(0,24)));localStorage.setItem("p4slot_"+id,JSON.stringify(S));toast("Personagem salvo: "+name);}catch(e){toast("Não deu para salvar neste navegador.");}}
function loadSlot(id){try{const j=localStorage.getItem("p4slot_"+id);if(!j)return toast("Slot vazio.");S=Object.assign(DEF(),JSON.parse(j));fixS();save();closeModal();render();toast("Personagem carregado.");}catch(e){toast("Falha ao carregar.");}}
function delSlot(id){try{localStorage.setItem("p4slots",JSON.stringify(slots().filter(s=>s.id!==id)));localStorage.removeItem("p4slot_"+id);}catch(e){}charsModal();}
function charsModal(){const L=slots();
 modal(`<h3>Personagens</h3>
 <div class="row"><div><label>salvar o atual como</label><input type="text" id="slotName" value="${esc(S.nome||"Sem nome")}"></div>
 <div style="flex:0;align-self:flex-end"><button class="btn gold" onclick="saveSlot(Date.now().toString(36),$('slotName').value||'Sem nome')">Salvar</button></div></div>
 ${L.length?L.map(s=>`<div class="hcard"><div class="ht"><b>${esc(s.name)}</b><span class="src">${new Date(s.ts).toLocaleDateString("pt-BR")}</span></div>
 <div style="margin-top:6px;display:flex;gap:6px"><button class="btn mini" onclick="loadSlot('${s.id}')">carregar</button>
 <button class="btn mini" onclick="if(confirm('Salvar por cima de ${esc(s.name)}?'))saveSlot('${s.id}',${JSON.stringify(s.name)})">salvar aqui</button>
 <button class="btn mini del" onclick="if(confirm('Excluir ${esc(s.name)}?'))delSlot('${s.id}')">excluir</button></div></div>`).join(""):`<div class="hint">Nenhum personagem salvo ainda. Tudo também fica num auto-save deste navegador.</div>`}
 <div class="hint">Os documentos da Biblioteca ficam à parte (neste navegador) e não entram nos slots nem no JSON.</div>
 <div style="margin-top:10px;text-align:right"><button class="btn" onclick="closeModal()">fechar</button></div>`);}
function exportJSON(){const d=JSON.parse(JSON.stringify(S));const blob=new Blob([JSON.stringify(d,null,1)],{type:"application/json"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=(S.nome||"personagem").replace(/\s+/g,"_")+"_protocolo4.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000);toast("Exportado (a Biblioteca não vai no JSON).");}
function importJSON(file){const r=new FileReader();r.onload=()=>{try{S=Object.assign(DEF(),JSON.parse(r.result));fixS();save();render();toast("Ficha importada.");}catch(e){toast("JSON inválido.");}};r.readAsText(file);}

/* ---------- cálculos ---------- */
const A=k=>{const v=parseInt(S.attrs[k],10);return isNaN(v)?0:v;};
const FP=()=>FARDOS[S.fardo]||null;
function owned(){const o=[];if(S.fardo&&FARDOS[S.fardo])o.push(S.fardo);for(const f of S.fardosX)if(FARDOS[f]&&!o.includes(f))o.push(f);return o;}
/* máximos: a fórmula manda, e S.curMax[k] é um BÔNUS PERMANENTE somado a ela — o +1 de Gente
   do Contato Fiel, o teto extra de um item, uma penalidade de campanha. pode ser negativo; o
   total nunca desce de 0. vazio/null é bônus zero, e aí vale a fórmula limpa. */
function baseMaxVida(){const f=FP();return 3+A("car")+(f?f.vida*S.nivel:0);}
function baseMaxFol(){const f=FP();return 3+A("ner")+((f&&f.comb==="fol")?f.cv*S.nivel:0);}
function baseMaxSin(){const f=FP();return 3+A("jui")+((f&&f.comb==="sin")?f.cv*S.nivel:0);}
function baseMaxLuc(){return 5+A("tem");}
function baseMaxGente(){return 1+A("lab");}
function baseMaxOf(k){return {vida:baseMaxVida,fol:baseMaxFol,sin:baseMaxSin,luc:baseMaxLuc,gente:baseMaxGente}[k]();}
function bonusOf(k){const o=S.curMax&&S.curMax[k];
 if(o==null||o==="")return 0;
 const v=parseInt(o,10);return isNaN(v)?0:v;}
function ovMax(k){return Math.max(0,baseMaxOf(k)+bonusOf(k));}
function maxVida(){return ovMax("vida");}
function maxFol(){return ovMax("fol");}
function maxSin(){return ovMax("sin");}
function maxLuc(){return ovMax("luc");}
function maxGente(){return ovMax("gente");}
function curOf(k){const m={vida:maxVida,fol:maxFol,sin:maxSin,luc:maxLuc}[k];const v=S.cur[k];return(v==null||v==="")?m():parseInt(v,10)||0;}
function ppTot(){const n=S.nivel;return 2+(n-1)+(n>=8?1:0)+(n>=15?1:0);}
function pcTot(){const n=S.nivel;return 4+2*(n-1)+(n>=8?1:0)+(n>=12?1:0)+(n>=15?1:0);}
function mtTot(){const n=S.nivel;return 1+(n>=4?1:0)+(n>=8?1:0)+(n>=12?1:0);}
function ppGasto(){return 2*S.esc.length;}
function pcGasto(){let t=0;for(const k of S.tal)t+=parseInt(k.split("|")[0],10)||0;return t+(parseInt(S.pcExtra,10)||0);}
function mtUsado(){return S.maest.reduce((a,m)=>a+1+(m.st||0),0);}
function hasHab(f,name){const d=FARDOS[f];if(!d)return false;if(d.base.some(h=>h.n===name))return true;return S.esc.includes(f+"|"+name);}
const fmtRS=v=>{v=parseFloat(v)||0;try{return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});}catch(e){return "R$ "+v;}};

/* ---------- rolagem ---------- */
let _rt=null;
function doRoll(label,mod){mod=parseInt(mod,10)||0;
 const d1=1+Math.floor(Math.random()*6),d2=1+Math.floor(Math.random()*6),tot=d1+d2+mod;
 let g,cls;if(d1===d2){g="CRÍTICO";cls="g-crit";}else if(tot>=10){g="TOTAL";cls="g-total";}else if(tot>=6){g="PARCIAL";cls="g-parcial";}else{g="FALHA";cls="g-falha";}
 const c=$("rollcard");$("rc_l").textContent=label;
 $("rc_t").innerHTML=`${tot} <small>(${d1} + ${d2} ${mod<0?"−":"+"} ${Math.abs(mod)})</small>`;
 $("rc_g").textContent=g;$("rc_g").className="rg "+cls;
 c.classList.add("on");clearTimeout(_rt);_rt=setTimeout(()=>c.classList.remove("on"),3400);
 S.sess.log.unshift({t:hhmm(),x:`${label} → ${d1}+${d2}${mod?(mod>0?"+"+mod:mod):""} = ${tot} · ${g}`});
 S.sess.log=S.sess.log.slice(0,40);save();
 const sl=$("slog");if(sl)sl.innerHTML=logHTML();}
function logHTML(){return S.sess.log.slice(0,12).map(l=>`<div><b style="color:var(--faint);font-family:ui-monospace">${l.t}</b> ${esc(l.x)}</div>`).join("")||`<div class="hint">nenhuma rolagem ainda</div>`;}


/* dock de dividas */
function updDock(){const d=$("divDock");const n=S.div.filter(x=>x&&x.trim()).length;
 if(n>0){d.classList.add("on");d.innerHTML=`⚖ o Pacto cobra — <b>${n}</b> dívida${n>1?"s":""} registrada${n>1?"s":""} <span style="color:var(--faint)">· aba Dívidas &amp; Notas</span>`;}
 else d.classList.remove("on");}

/* ---------- abas / navegação ---------- */
const TABS=[["inicial","Inicial"],["sint","Sintonizar"],["hab","Habilidades"],["mag","Magias"],["tal","Talentos"],["inv","Inventário"],["bib","Biblioteca"],["div","Dívidas & Notas"]];
function go(t){S.ui.tab=t;save();render();ascLand();window.scrollTo(0,0);}
function render(){fixS();
 $("tabsrow").innerHTML=TABS.map(([id,lb])=>{let l=esc(lb);
  if(id==="sint"&&S.elem)l=`<span class="tglifo">${ELM(S.elem).g}</span> Sintonizar`;
  return `<button class="${S.ui.tab===id?"active":""}" onclick="go('${id}')">${l}</button>`;}).join("");
 const R={inicial:rInicial,sint:rSint,hab:rHab,mag:rMag,tal:rTal,inv:rInv,bib:rBib,div:rDiv};
 (R[S.ui.tab]||rInicial)();
 if(S.ui.sess)rSess();
 updDock();perfDOM();applyTheme();whisperLoop();   /* perfDOM aqui pega boot, troca de personagem e importação de uma vez */
 $("foot").textContent=alien("O QUE OLHA DEMAIS E OLHADO DE VOLTA")+"  ·  protocolo 4ª edição · 2002";}
function toggleSess(){S.ui.sess=!S.ui.sess;save();
 $("btnSess").textContent=S.ui.sess?"◼ Encerrar sessão":"▶ Sessão";
 if(S.ui.sess)rSess();applyTheme();ascLand();window.scrollTo(0,0);}

/* modal */
function modal(html){$("modalbox").innerHTML=html;$("modal").classList.add("on");}
function closeModal(){$("modal").classList.remove("on");}

/* boot */
function boot(){loadAuto();
 $("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal();});
 $("btnChars").onclick=charsModal;
 $("btnExp").onclick=exportJSON;
 $("btnImp").onclick=()=>$("impFile").click();
 $("impFile").addEventListener("change",e=>{if(e.target.files[0])importJSON(e.target.files[0]);e.target.value="";});
 $("btnMute").onclick=()=>{S.ui.mute=!S.ui.mute;save();$("btnMute").classList.toggle("on",S.ui.mute);toast(S.ui.mute?"Sussurros silenciados.":"Os sussurros voltaram.");whisperLoop();scopoSync();vazSync();ecoSync();ascSync();pacSync();gerSync();};
 $("btnCalm").onclick=()=>{S.ui.calm=!S.ui.calm;save();$("btnCalm").classList.toggle("on",S.ui.calm);applyTheme();whisperLoop();toast(S.ui.calm?"Efeitos reduzidos.":"Efeitos completos.");};
 $("btnSess").onclick=toggleSess;
 $("btnMute").classList.toggle("on",S.ui.mute);$("btnCalm").classList.toggle("on",S.ui.calm);
 $("btnSess").textContent=S.ui.sess?"◼ Encerrar sessão":"▶ Sessão";
 render();}
window.addEventListener("DOMContentLoaded",boot);

/* ============ ABAS ============ */
const EC={obs:"#c9a227",eco:"#7fb8a8",vaz:"#7c8fb5",asc:"#c15a45",pac:"#c13a52",ger:"#8dbb62"};
const MTH=[1,3,5]; /* limiares da Marca */

/* ---------- setters simples ---------- */
function setF(k,v){S[k]=v;save();}
function setNum(k,v){S[k]=parseInt(v,10)||0;save();}
function setNivel(v){S.nivel=Math.max(1,Math.min(15,parseInt(v,10)||1));save();render();}
function setAttr(k,v){S.attrs[k]=Math.max(-2,Math.min(4,parseInt(v,10)||0));save();render();}
function setCur(k,v){S.cur[k]=(v===""?null:parseInt(v,10)||0);clampCur();save();applyTheme();barSync();}
/* recebe o ABSOLUTO e grava o BÔNUS (absoluto − base). o bônus resultante pode ser negativo,
   que é justamente o caso "quero um máximo menor que o do meu nível" — quem segura o piso em 0
   é o ovMax, no total. campo vazio devolve o recurso ao cálculo do nível (null). */
function setMax(k,v){if(!S.curMax)S.curMax={vida:null,fol:null,sin:null,luc:null,gente:null};
 if(v===""||v==null)S.curMax[k]=null;
 else{const n=parseInt(v,10);S.curMax[k]=isNaN(n)?null:Math.max(0,n)-baseMaxOf(k);}
 clampCur();save();applyTheme();barSync();render();}
/* A ATUAL NUNCA FICA ACIMA DO MÁXIMO — e só desce: subir o teto não enche o recurso sozinho.
   mora aqui, e não em cada setter, porque o máximo muda por caminhos demais (o campo, o nível,
   um atributo, a troca de Fardo, o estágio de uma maestria, uma ficha importada). o fixS chama
   isto no fim de todo render, então todos eles passam pelo mesmo pente. */
function clampCur(){
 for(const k of["vida","fol","sin","luc"]){const v=S.cur[k];
  if(v==null||v==="")continue;                  /* null = "cheio", acompanha o máximo sozinho */
  const n=parseInt(v,10),m=ovMax(k);
  if(!isNaN(n)&&n>m)S.cur[k]=m;}
 if(S.gente!=null&&S.gente!==""){const g=parseInt(S.gente,10),m=maxGente();
  if(!isNaN(g)&&g>m)S.gente=m;}
 for(const m of S.maest){const c=meterCap(m);
  if(c&&typeof m.rec==="number"&&m.rec>c.max)m.rec=c.max;}}
function stepRec(k,d){const m={vida:maxVida,fol:maxFol,sin:maxSin,luc:maxLuc}[k]();const v=Math.max(0,Math.min(m,curOf(k)+d));S.cur[k]=v;save();
 const i=$("cur_"+k);if(i)i.value=v;const j=$("scur_"+k);if(j)j.value=v;applyTheme();barSync();}
function barSync(){for(const k of["vida","fol","sin","luc"]){const m={vida:maxVida,fol:maxFol,sin:maxSin,luc:maxLuc}[k]();
 for(const id of["bar_"+k,"sbar_"+k]){const b=$(id);if(b)b.style.width=(m?Math.max(0,Math.min(100,Math.round(curOf(k)/m*100))):0)+"%";}}}
function setRuido(n){S.ruido=Math.max(0,Math.min(20,n));save();render();}
function clickSeg(i){setRuido(S.ruido===i+1?i:i+1);}
function togglePer(n,ck){S.per[n]=!!ck;save();const row=$("sk_"+PERICIAS.findIndex(p=>p[0]===n));render();}
function toggleCond(n){S.cond[n]=!S.cond[n];save();render();}
function setGente(v){S.gente=(v===""?null:parseInt(v,10)||0);clampCur();save();}
function curGente(){return S.gente==null?maxGente():S.gente;}

/* ---------- INICIAL ---------- */
function rInicial(){const f=FP(),r=RAIZES.find(x=>x.n===S.raiz);
 const marcos=`PC ${pcTot()} · PP ${ppTot()} · Escolhas de Maestria ${mtTot()} — atributo grátis nos níveis 3·6·9·12·15`;
 $("mainview").innerHTML=`
 <div class="grid2">
 <div class="panel"><h2>Identidade</h2>
  <div class="row"><div><label>Nome</label><input type="text" value="${esc(S.nome)}" oninput="setF('nome',this.value)"></div>
  <div><label>Jogador</label><input type="text" value="${esc(S.jogador)}" oninput="setF('jogador',this.value)"></div></div>
  <div class="row"><div><label>Conceito</label><input type="text" value="${esc(S.conceito)}" placeholder="quem é, antes do caso" oninput="setF('conceito',this.value)"></div></div>
  <div class="row"><div><label>Raiz</label><select onchange="setF('raiz',this.value);render()">
   <option value="">—</option>${RAIZES.map(x=>`<option ${S.raiz===x.n?"selected":""}>${x.n}</option>`).join("")}</select></div>
  <div style="flex:0;align-self:flex-end"><button class="btn mini" onclick="applyRaiz()" ${r?"":"disabled"}>aplicar pacote</button></div></div>
  ${r?`<div class="hint"><em style="color:var(--dim)">${esc(r.f)}</em> — perícias <b>${r.per.join(", ")}</b> · prof. ${esc(r.prof)} · ${fmtRS(r.rs)} · ${esc(r.item)} · <b>${r.c[0]}:</b> ${esc(r.c[1])}${r.ruido?` · começa com ${rw()} 1`:""}</div>`:""}
  <div class="row" style="margin-top:8px"><div><label>Fardo principal</label><select onchange="setFardoPrincipal(this.value)">
   <option value="">—</option>${Object.keys(FARDOS).map(k=>`<option ${S.fardo===k?"selected":""}>${k}</option>`).join("")}</select></div>
  <div style="flex:0;align-self:flex-end"><button class="btn mini" onclick="applyFardoTre()" ${f?"":"disabled"}>treinadas do Fardo</button></div></div>
  ${f?`<div class="hint"><em style="color:var(--dim)">“${esc(f.f)}”</em> — +${f.vida} Vida e +${f.cv} ${f.comb==="fol"?"Fôlego":"Sintonia"} por nível · treinadas: ${f.tre.join(", ")} · prof.: ${esc(f.profs)}</div>`:""}
  <div class="row" style="margin-top:8px">
   <div><label>Nível</label><input type="number" min="1" max="15" value="${S.nivel}" onchange="setNivel(this.value)"></div>
   <div><label>Dinheiro (R$)</label><input type="number" step="50" value="${S.dinheiro}" onchange="setNum('dinheiro',this.value);$('rsl').textContent=fmtRS(S.dinheiro)"><div class="hint" id="rsl">${fmtRS(S.dinheiro)}</div></div>
   <div><label>Defesa</label><input type="number" value="${S.defesa}" onchange="setNum('defesa',this.value)"><div class="hint">padrão 8, antes de armadura</div></div>
  </div>
  <div class="hint">${marcos}</div>
 </div>
 <div class="panel"><h2>Atributos <small>+2 · +1 · 0 · 0 · −1 (teto +4 na progressão)</small></h2>
  <div class="attrs">${ATTRS.map(a=>`<div class="attr"><div class="an">${a[1]}</div>
   <input type="number" min="-2" max="4" value="${A(a[0])}" onchange="setAttr('${a[0]}',this.value)"><div class="ad">${a[2]}</div></div>`).join("")}</div>
  <div class="secband" style="margin-top:14px">Recursos</div>
  <div class="recs">
   ${recCard("vida","Vida",maxVida())}${recCard("fol","Fôlego",maxFol())}${recCard("sin","Sintonia",maxSin())}${recCard("luc","Lucidez",maxLuc())}
   <div class="rec"><div class="rn">GENTE <b>máx ${maxGente()}</b></div><div class="rv">
    <button class="stp" onclick="setGente(Math.max(0,curGente()-1));render()">−</button>
    <input type="number" value="${curGente()}" onchange="setGente(this.value)"><span class="mx">/ ${maxIn("max_gente","gente")}</span>
    <button class="stp" onclick="setGente(Math.min(maxGente(),curGente()+1));render()">+</button></div>${mxRef("gente")}</div>
   <div class="rec"><div class="rn">BRIO <b>teto 5</b></div><div class="rv">
    <button class="stp" onclick="setNum('brio',Math.max(0,S.brio-1));render()">−</button>
    <input type="number" value="${S.brio}" onchange="setNum('brio',this.value)"><span class="mx"></span>
    <button class="stp" onclick="setNum('brio',S.brio+1);render()">+</button></div></div>
  </div>
 </div></div>
 <div class="panel"><h2>${rw()} <small>Ruído — o quanto o desconhecido já entrou · máx. 20</small>
  <span style="margin-left:auto;font-family:Georgia,serif;font-size:16px;color:var(--ec)">${S.ruido} <small style="color:var(--faint)">· ${BANDS[bandOf(S.ruido)][2]}</small></span></h2>
  <div class="rtrack">${Array.from({length:20},(_,i)=>`<div class="rseg ${i<S.ruido?"on":""}" onclick="clickSeg(${i})">${i<S.ruido?"✕":""}</div>`).join("")}</div>
  <div class="hint">A Marca do seu elemento avança em ${W_RUIDO} 1–2 · 3–4 · 5–6 — a trilha completa vive no altar de <a href="#" style="color:var(--ec)" onclick="go('sint');return false">Sintonizar</a>. A corrupção nunca é pegadinha: o preço se anuncia antes.</div>
 </div>
 <div class="panel"><h2>Condições</h2><div class="chips">${CONDICOES.map(c=>`<span class="chip ${S.cond[c[0]]?"on":""}" title="${esc(c[1])}" onclick="toggleCond('${c[0].replace(/'/g,"\\'")}')">${c[0]}</span>`).join("")}</div>
  ${CONDICOES.filter(c=>S.cond[c[0]]).map(c=>`<div class="hint" style="color:#c88">▸ <b>${c[0]}</b> — ${esc(c[1])}</div>`).join("")}
 </div>
 <div class="panel"><h2>Perícias <small>clique no nome para rolar 2d6 + bônus · ✓ = treinada (+1)</small></h2>
  <div class="skills">${skillsHTML(false)}</div></div>
 <div class="panel"><h2>Proficiências <small>o que você sabe operar — sem elas, −2 ou impossível</small></h2>
  <textarea oninput="setF('profis',this.value)" placeholder="armas de fogo leves, ferramentas médicas, idioma morto…">${esc(S.profis)}</textarea></div>`;
 barSync();}
function recCard(k,nm,mx){return `<div class="rec"><div class="rn">${nm} <b>máx ${mx}</b></div><div class="rv">
 <button class="stp" onclick="stepRec('${k}',-1)">−</button>
 <input type="number" id="cur_${k}" value="${curOf(k)}" onchange="setCur('${k}',this.value)"><span class="mx">/ ${maxIn("max_"+k,k)}</span>
 <button class="stp" onclick="stepRec('${k}',1)">+</button></div>${mxRef(k)}
 <div class="bar"><i id="bar_${k}"></i></div></div>`;}
/* CAMPO DO MÁXIMO — mostra e recebe o VALOR ABSOLUTO.
   o modelo mental de quem joga é "meu máximo é 6", não "+X sobre o que o nível calcula". o
   campo pedia o bônus, então quem queria 6 digitava 6 e via 14 (base 8 + 6). agora ele diz e
   aceita o total.
   por baixo, o ARMAZENAMENTO continua sendo o bônus (digitado − base): é ele que faz o total
   subir junto quando você ganha um nível. guardar o absoluto congelaria o recurso outra vez —
   exatamente o bug que a migração anterior consertou, e por isso ela não é refeita aqui.
   vazio = sem override: o campo fica cinza mostrando o que o nível sugere, e cresce sozinho */
function maxIn(id,k){const o=S.curMax?S.curMax[k]:null,vazio=(o==null||o==="");
 return `<input type="number" id="${id}" min="0" value="${vazio?"":ovMax(k)}" placeholder="${baseMaxOf(k)}" title="o máximo deste recurso. digite o total que você quer — a ficha guarda a diferença para o cálculo do nível, então ele continua subindo quando você sobe de nível. apague o campo para voltar ao valor sugerido." onchange="setMax('${k}',this.value)">`;}
/* a referência: o que a ficha calcula sozinha, SEMPRE à vista — e, quando há override, o
   caminho de volta. "zerar" seria mentira aqui: isto não põe o máximo em 0, devolve ele ao
   cálculo do nível */
const mxRef=k=>{const o=S.curMax?S.curMax[k]:null,ed=!(o==null||o==="");
 return `<div class="mxref">nível sugere ${baseMaxOf(k)}${ed?` · <button type="button" class="rev" onclick="setMax('${k}','')">usar o valor do nível</button>`:""}</div>`;};
/* medidores de maestria — recurso próprio de uma trilha (Fúria, etc.) */
const RESET_LB={cena:"zerar (nova cena)",sessao:"zerar (nova sessão)",permanente:"zerar"};
function meterOf(m){const md=m&&!m.cu?maeData(m):null;return(md&&md.medidor)||null;}
/* mesmo trato dos recursos: m.recMax é BÔNUS sobre o teto do estágio, e não um teto congelado
   que ignorava o Aprendiz virando Veterano, Mestre e Ápice */
function meterCap(m){const d=meterOf(m);if(!d)return null;
 return {min:d.min,max:Math.max(d.min,d.tetos[m.st]+(typeof m.recMax==="number"?m.recMax:0))};}
function meterVal(m){const c=meterCap(m);return c?Math.max(c.min,Math.min(c.max,m.rec||0)):0;}
/* mesmo trato do maxIn: o campo do teto mostra e recebe o ABSOLUTO, guardando o bônus sobre o
   teto do estágio — assim virar Veterano continua subindo o medidor sozinho.
   o botão "zerar (nova cena)" ao lado NÃO é o reverter: ele põe a ATUAL no mínimo, que é outra
   coisa. quem devolve o teto ao estágio é o link do rodapé, junto do "estágio sugere" */
function meterCard(m,i){const d=meterOf(m);if(!d)return "";
 const tp=meterCap(m).max,v=meterVal(m),pc=tp>d.min?Math.round((v-d.min)/(tp-d.min)*100):0;
 const ed=typeof m.recMax==="number";
 return `<div class="rec" id="mtr_${i}" style="margin-top:8px"><div class="rn">${esc(d.nome)} <b>teto ${tp} · ${STG[m.st]}</b></div><div class="rv">
 <button class="stp" onclick="stepMeter(${i},-1)">−</button>
 <input type="number" id="mcur_${i}" min="${d.min}" max="${tp}" value="${v}" onchange="setMeter(${i},this.value)"><span class="mx">/ <input type="number" id="mmax_${i}" min="${d.min}" value="${ed?tp:""}" placeholder="${d.tetos[m.st]}" title="o teto deste medidor. digite o total que você quer — a ficha guarda a diferença para o teto do estágio, então ele continua subindo quando a maestria avança. apague o campo para voltar ao valor do estágio." onchange="setMeterMax(${i},this.value)"></span>
 <button class="stp" onclick="stepMeter(${i},1)">+</button>
 ${d.reset?`<button class="btn mini" style="margin-left:auto" onclick="resetMeter(${i})">${RESET_LB[d.reset]||"zerar ("+esc(d.reset)+")"}</button>`:""}</div>
 <div class="mxref">estágio sugere ${d.tetos[m.st]}${ed?` · <button type="button" class="rev" onclick="setMeterMax(${i},'')">usar o valor do estágio</button>`:""}</div>
 <div class="bar"><i id="mbar_${i}" style="width:${pc}%"></i></div></div>`;}
/* trocar o outerHTML do card destrói o input que disparou o onchange. com ele ainda em foco, o
   navegador solta um blur NO MEIO da remoção, esse blur dispara um segundo change com o mesmo
   valor, e o segundo meterSync entra por cima do primeiro — o de fora então falha com "node to
   be removed is no longer a child of this node", que era o erro que aparecia no console ao
   editar o teto na mão. checar parentNode não resolve (no instante da reentrada o nó ainda
   está no documento): o que corta é a trava de reentrância. o evento perdido não faz falta,
   porque ele carrega exatamente o valor que a chamada de fora já gravou. */
let _mtrSync=false;
function meterSync(i){if(_mtrSync)return;
 const el=$("mtr_"+i);if(!el||!el.parentNode||!S.maest[i])return;
 _mtrSync=true;try{el.outerHTML=meterCard(S.maest[i],i);}finally{_mtrSync=false;}}
function meterPut(i,v){const m=S.maest[i];if(!m)return;const c=meterCap(m);if(!c)return;
 m.rec=Math.max(c.min,Math.min(c.max,isNaN(v)?c.min:v));save();meterSync(i);}
function stepMeter(i,d){const m=S.maest[i];if(m)meterPut(i,meterVal(m)+d);}
function setMeter(i,v){meterPut(i,parseInt(v,10));}
/* recebe o ABSOLUTO, grava o bônus sobre o teto do estágio. negativo vale (teto menor que o
   que o estágio dá); vazio devolve o medidor ao estágio */
function setMeterMax(i,v){const m=S.maest[i];if(!m)return;const d=meterOf(m);if(!d)return;
 if(v===""||v==null)m.recMax=null;
 else{const n=parseInt(v,10);m.recMax=isNaN(n)?null:Math.max(d.min,n)-d.tetos[m.st];}
 const c=meterCap(m);if(c&&m.rec>c.max)m.rec=c.max;   /* a atual encosta no teto novo */
 save();meterSync(i);}
function resetMeter(i){const m=S.maest[i];if(!m)return;const c=meterCap(m);if(c)meterPut(i,c.min);}
function skillsHTML(sessOnly){let out="",cur="";
 const list=PERICIAS.map((p,i)=>({p,i})).filter(o=>!sessOnly||S.per[o.p[0]]||SESS_ALL);
 for(const {p,i} of list){const an=ATTRS.find(a=>a[0]===p[1]);
  if(!sessOnly&&an[1]!==cur){cur=an[1];out+=`<div class="sgroup">${cur}</div>`;}
  const tr=!!S.per[p[0]],bn=A(p[1])+(tr?1:0);
  out+=`<div class="skill ${tr?"tr":""}" onclick="doRoll('${p[0].replace(/'/g,"\\'")}',${bn})">
  <input type="checkbox" ${tr?"checked":""} onclick="event.stopPropagation();togglePer('${p[0].replace(/'/g,"\\'")}',this.checked)">
  <span class="nm">${p[0]}</span><span class="at">${an[1].slice(0,3)}</span><span class="bn">${bn>=0?"+":""}${bn}</span></div>`;}
 return out||`<div class="hint">nenhuma perícia treinada — marque na aba Inicial ou ative “mostrar todas”.</div>`;}
function applyRaiz(){const r=RAIZES.find(x=>x.n===S.raiz);if(!r)return;
 r.per.forEach(p=>S.per[p]=true);
 if(r.ruido&&S.ruido<r.ruido)S.ruido=r.ruido;
 if(confirm(`Definir o dinheiro inicial em ${fmtRS(r.rs)}?`))S.dinheiro=r.rs;
 save();render();toast(`Raiz aplicada — anote: ${r.item}. Proficiências: ${r.prof}.`);}
function applyFardoTre(){const f=FP();if(!f)return;f.tre.forEach(p=>S.per[p]=true);save();render();
 toast("Treinadas do Fardo marcadas. Onde repetir com a Raiz, escolha outra livre no lugar.");}
function setFardoPrincipal(v){const old=S.fardo;S.fardo=v;S.fardosX=S.fardosX.filter(x=>x!==v);
 if(old&&old!==v&&!owned().includes(old))purgeFardo(old);save();render();}
function purgeFardo(f){const nE=S.esc.filter(k=>k.startsWith(f+"|")).length,nM=S.maest.filter(m=>m.f===f).length;
 S.esc=S.esc.filter(k=>!k.startsWith(f+"|"));S.maest=S.maest.filter(m=>m.f!==f);
 if(nE||nM)toast(`${f} removido — ${nE*2} PP e ${nM?"escolhas de maestria":""} devolvidos.`);}

/* ---------- PERFEIÇÃO — o medidor do Sintonizador ----------
   quanto do personagem já deixou de ser carne. 0 a 100, inteiro, e MANUAL de ponta a ponta:
   sem gatilho, sem marco, sem trava — quem move é o jogador ou o mestre. subir é decisão de
   mesa, e por isso nada na ficha empurra este número sozinho.
   só existe para quem carrega o Sintonizador. nas outras fichas o valor fica em 0 no estado e
   nenhum card é renderizado — não é card escondido, é card que não existe. */
const clampPerf=v=>{const n=parseInt(v,10);return isNaN(n)?0:Math.max(0,Math.min(100,n));};
const perfOn=()=>owned().includes("Sintonizador");
/* a faixa em quintos: 0-19, 20-39, 40-59, 60-79, 80-100. o 100 cai na 4 junto com o 80 de
   propósito — quinto é quinto, e quem quiser tratar o 100 à parte tem o valor cru ao lado */
const perfBand=v=>Math.min(4,Math.floor(clampPerf(v)/20));
const PERF_LB=["carne — ainda é só o rascunho","as primeiras peças assentaram",
 "metade de cada — nem carne, nem a coisa nova","a carne já é a parte que sobra",
 "quase a versão final"];
const perfLabel=v=>clampPerf(v)>=100?"a versão final — não sobrou rascunho":PERF_LB[perfBand(v)];
/* A PONTE PARA O CLIMA. o valor vai para o body do mesmo jeito que data-el e data-band, mais a
   faixa já fatiada. e é só isso: NADA lê estes atributos ainda — o climate.js não conhece nem
   `perf` nem `perfband`. é gancho pendurado, não efeito.
   o que sai daqui é o valor EFETIVO, não o guardado: sem o Sintonizador não há medidor, então o
   DOM diz 0. o S.perf em si fica intacto — trocar de Fardo e voltar devolve o número na mão, e
   ninguém perde progresso por ter experimentado outra combinação. sem isto, um personagem que
   largou o Fardo levaria a transformação do próximo prompt junto, com um valor que a ficha
   dele nem mostra mais. */
function perfDOM(){const v=perfOn()?clampPerf(S.perf):0;
 document.body.dataset.perf=v;document.body.dataset.perfband=perfBand(v);}
/* o card. mesma anatomia dos medidores de maestria (.rec + .rn + .rv + .mxref + .bar), porque
   é a forma que a ficha já usa para "recurso com teto e barra" — o que muda é a escala */
function perfCard(){if(!perfOn())return "";
 const v=clampPerf(S.perf);
 return `<div class="rec perf" id="perfcard">
 <div class="rn"><span><span class="pg" aria-hidden="true">⍟</span> Perfeição</span> <b id="perfpc">${v}%</b></div>
 <div class="rv">
  <button class="stp" onclick="stepPerf(-1)" title="−1">−</button>
  <input type="number" id="perfcur" min="0" max="100" step="1" value="${v}" onchange="setPerf(this.value)" title="digite a porcentagem exata">
  <span class="mx">/ 100</span>
  <button class="stp" onclick="stepPerf(1)" title="+1">+</button>
  <button class="btn mini" style="margin-left:auto" onclick="setPerf(0)">zerar</button></div>
 <div class="mxref" id="perftx">${esc(perfLabel(v))}</div>
 <div class="bar perfbar" title="clique na barra para marcar a porcentagem" onclick="perfFromClick(event,this)"><i id="perfbar" style="width:${v}%"></i></div>
 <div class="mxref">medidor do Sintonizador · ajuste livre, sem marco e sem trava — quem sobe é você</div></div>`;}
/* atualiza NO LUGAR em vez de refazer o card: trocar outerHTML a cada passo tiraria o foco do
   campo no meio da digitação, e aqui o jogador fica batendo no −/+ */
function perfSync(){if(!$("perfcard"))return;
 const v=clampPerf(S.perf);
 const i=$("perfcur");if(i&&i.value!==String(v))i.value=v;
 const b=$("perfbar");if(b)b.style.width=v+"%";
 const p=$("perfpc");if(p)p.textContent=v+"%";
 const t=$("perftx");if(t)t.textContent=perfLabel(v);}
function setPerf(v){S.perf=clampPerf(v);save();perfDOM();perfSync();}
function stepPerf(d){setPerf(clampPerf(S.perf)+d);}
function perfFromClick(ev,el){const r=el.getBoundingClientRect();if(r.width<=0)return;
 setPerf(Math.round((ev.clientX-r.left)/r.width*100));}

/* ---------- SINTONIZAR ---------- */
function rSint(){const sel=S.elem;
 $("mainview").innerHTML=`<div id="sintwrap">
 <div class="fala">${alien("SINTONIZAR")} · o que você olha, olha de volta</div>
 <div class="elring">${ELEMS.map(e=>`
  <div class="elc ${sel===e.id?"sel":sel?"dim":""}" data-el="${e.id}" style="--c:${EC[e.id]}"
   onmouseenter="previewEl('${e.id}')" onmouseleave="previewEl(null)" onclick="clickEl('${e.id}')">
   <span class="eg">${e.g}</span><div class="en">${e.n}</div><div class="ev">— ${e.v} —</div>
   <div class="ef">${esc(e.fr)}</div></div>`).join("")}</div>
 ${perfCard()}
 ${sel?altarHTML(ELM(sel)):`<div class="hint" style="text-align:center;margin-top:30px">Nenhum elemento sintonizado. O Ruído sobe do mesmo jeito — mas sem nome, sem Marca, sem trilha.</div>`}
 </div>`;}
function altarHTML(e){const b=bandOf(S.ruido);
 return `<div id="altar">
 <h3><span style="font-size:26px;color:${EC[e.id]}">${e.g}</span> ${e.n} <small style="letter-spacing:2px;color:var(--faint)">— ${e.v} —</small>
 <span style="margin-left:auto"><button class="btn mini" onclick="dessint()">dessintonizar</button></span></h3>
 <div class="hint" style="font-style:italic">${esc(e.fr)}</div>
 <div class="hcard regra" style="margin-top:10px"><div class="ht"><b>${e.lei[0]}</b><span class="tag warn">lei do elemento</span></div><div class="hx">${esc(e.lei[1])}</div></div>
 <div class="secband">A Marca — quem foi tocado</div>
 ${e.marca.map((m,i)=>{const on=S.ruido>=MTH[i];
  return `<div class="mtier ${on?"on":"off"}"><div class="mt">${W_RUIDO} ${MTH[i]}–${MTH[i]+1}${on?"":" · selado"}</div>
  <div class="mx">${on?esc(m):esc(alien(m).slice(0,72))+" …"}</div></div>`;}).join("")}
 <div class="secband">Graus de conjuração <small style="letter-spacing:0;text-transform:none">— 2d6 + Juízo ou Têmpera + Ocultismo vs Limiar</small></div>
 <div class="chips">${GRAUS.map(g=>`<span class="tag ${grauOK(g.g,S.ruido,S.nivel)?"ok":"dark"}" title="${esc(g.rq)}">G${g.g} · limiar ${g.lim}</span>`).join(" ")}</div>
 <div class="hint" style="margin-top:8px">Trocar de elemento é livre — clique em outro círculo. ${owned().includes("Sintonizador")?"<b>Maestria Imposta:</b> a trilha do Sintonizador segue este elemento (aba Habilidades).":""}</div>
 </div>`;}
function previewEl(id){document.body.dataset.el=id||S.elem||"";}
function clickEl(id){if(S.elem===id){const a=$("altar");if(a)a.scrollIntoView({behavior:"smooth"});return;}
 const e=ELM(id);
 modal(`<h3>${e.g} Sintonizar — ${e.n}</h3>
 <div class="hint" style="font-size:13px;font-style:italic;margin-bottom:10px">${esc(e.fr)}</div>
 <div class="hint">${esc(e.lei[1])}</div>
 ${S.elem?`<div class="hint" style="color:#c88;margin-top:8px">Você deixa ${ELM(S.elem).n} para trás. A troca é livre — a Marca acompanha o elemento atual.</div>`:""}
 <div style="margin-top:14px;display:flex;gap:8px;justify-content:flex-end">
 <button class="btn" onclick="closeModal()">ainda não</button>
 <button class="btn gold" onclick="doSint('${id}')">sintonizar</button></div>`);}
function doSint(id){closeModal();const ov=$("transOv");ov.className="t-"+id+" go";
 setTimeout(()=>{ov.className="";S.elem=id;save();render();
  toast(ELM(id).n+" — "+ELM(id).lei[0]+".");},S.ui.calm?60:1650);
 if(S.ui.calm){/* instantâneo no modo calmo */}}
function dessint(){if(!confirm("Dessintonizar? A Marca fica em silêncio até você sintonizar de novo."))return;
 S.elem="";save();render();}

/* ---------- HABILIDADES ---------- */
function badge(tx,ok){return `<span class="tag ${ok?"ok":"warn"}">${tx}</span>`;}
function reqInfo(f,h){const r=h.req||{};let html="",ok=true;
 if(r.nv){const o=S.nivel>=r.nv;ok=ok&&o;html+=badge("nível "+r.nv,o);}
 if(r.ruido){const o=S.ruido>=r.ruido;ok=ok&&o;html+=badge(W_RUIDO+" ≥"+r.ruido,o);}
 if(r.req){const o=hasHab(f,r.req);ok=ok&&o;html+=badge("req. "+r.req,o);}
 return {html,ok};}
function hcardH(h,extraTags,body){return `<div class="hcard"><div class="ht"><b>${esc(h.n)}</b><span class="tag dark">${esc(h.cst)}</span><span class="tag dark">${esc(h.ac)}</span>${extraTags||""}</div>${h.sab?`<div class="hsab">${esc(h.sab)}</div>`:""}<div class="hx">${esc(h.ef)}</div>${body||""}</div>`;}
function rHab(){const own=owned(),ppL=ppTot()-ppGasto(),mtL=mtTot()-mtUsado();
 let html=`<div class="wallet"><span class="${ppL<0?"neg":""}">Pontos de Profissão <b>${ppL}</b> livres <small>(${ppTot()} totais − ${ppGasto()} gastos)</small></span>
 <span class="${mtL<0?"neg":""}">Escolhas de Maestria <b>${mtL}</b> <small>(níveis 1 · 4 · 8 · 12)</small></span></div>
 <div class="panel"><h2>Fardos <small>multiclasse livre — habilidades-base vêm de graça; só o principal soma Vida e combustível por nível</small></h2>
 ${S.fardo?`<span class="fchip">★ ${S.fardo} <small>principal</small></span>`:`<span class="hint">defina o Fardo principal na aba Inicial</span>`}
 ${S.fardosX.map(f=>`<span class="fchip">${f} <small>extra</small><span class="x" onclick="remFardo('${f}')">✕</span></span>`).join("")}
 <button class="btn mini gold" onclick="addFardoModal()">+ adicionar Fardo</button></div>`;
 if(!own.length){$("mainview").innerHTML=html+`<div class="hint">Sem Fardo, sem habilidades. O mundo mostra os dentes mesmo assim.</div>`;return;}
 html+=`<div class="secband">No seu personagem</div>`;
 for(const f of own){const d=FARDOS[f];
  html+=`<div class="panel"><h2>${f} <small>“${esc(d.f)}” · +${d.vida} Vida e +${d.cv} ${d.comb==="fol"?"Fôlego":"Sintonia"}/nível${f===S.fardo?"":" (extra — não soma recursos)"} · treinadas: ${d.tre.join(", ")}</small></h2>
  ${d.regra?`<div class="hcard regra"><div class="ht"><b>◆ ${esc(d.regra.n)}</b>${d.regra.cst?`<span class="tag dark">${esc(d.regra.cst)}</span>`:""}${d.regra.ac?`<span class="tag dark">${esc(d.regra.ac)}</span>`:""}<span class="tag warn">regra de fardo</span></div>${d.regra.sab?`<div class="hsab">${esc(d.regra.sab)}</div>`:""}<div class="hx">${esc(d.regra.ef)}</div></div>`:""}
  ${d.base.map(h=>hcardH(h,`<span class="tag">automática</span>`)).join("")}
  ${d.esc.map((h,i)=>S.esc.includes(f+"|"+h.n)?hcardH(h,`<span class="tag ok">2 PP</span><span class="src"><button class="btn mini del" onclick="refundEsc('${f}',${i})">devolver</button></span>`):"").join("")}
  </div>`;}
 html+=`<div class="secband">Disponíveis — <b>2 PP</b> cada</div>`;
 for(const f of own){const d=FARDOS[f];const av=d.esc.map((h,i)=>({h,i})).filter(o=>!S.esc.includes(f+"|"+o.h.n));
  if(!av.length)continue;
  html+=`<div class="panel"><h2>${f}</h2>${av.map(({h,i})=>{const q=reqInfo(f,h);
   return hcardH(h,q.html+`<span class="src"><button class="btn mini gold" onclick="buyEsc('${f}',${i})">comprar · 2 PP</button></span>`);}).join("")}</div>`;}
 /* customizadas */
 html+=`<div class="panel"><h2>Anotadas à mão <small>habilidades fora do Dossiê — casa, mestre, sabe-se lá</small>
  <span style="margin-left:auto"><button class="btn mini gold" onclick="habEditor()">+ criar habilidade</button></span></h2>
  ${S.custom.hab.map((h,i)=>`<div class="hcard"><div class="ht"><b>${esc(h.n)}</b><span class="tag dark">${esc(h.tag||"—")}</span>
   <span class="src"><button class="btn mini del" onclick="if(confirm('Apagar ${esc(h.n)}?')){S.custom.hab.splice(${i},1);save();render()}">apagar</button></span></div>
   <div class="hx">${esc(h.tx)}</div></div>`).join("")||`<div class="hint">nada anotado ainda.</div>`}</div>`;
 /* maestrias */
 html+=`<div class="panel"><h2>Quadro de Maestrias <small>Aprendiz → Veterano → Mestre → Ápice (nível 12+) · cada passo gasta 1 Escolha</small>
  <span style="margin-left:auto"><button class="btn mini gold" onclick="openMaeModal()">abrir maestria</button></span></h2>
  ${maeImpostaAviso()}
  ${S.maest.map((m,i)=>maeCard(m,i)).join("")||`<div class="hint">nenhuma maestria aberta — a primeira Escolha chega no nível 1.</div>`}</div>`;
 $("mainview").innerHTML=html;}
function addFardoModal(){const rest=Object.keys(FARDOS).filter(f=>!owned().includes(f));
 modal(`<h3>Adicionar Fardo</h3>${rest.map(f=>{const d=FARDOS[f];
  return `<div class="hcard" style="cursor:pointer" onclick="pickFardo('${f}')"><div class="ht"><b>${f}</b>
  <span class="tag dark">${d.comb==="fol"?"Fôlego":"Sintonia"}</span></div><div class="hx">“${esc(d.f)}” — base: ${d.base.map(h=>h.n).join(" · ")}</div></div>`;}).join("")||"<div class='hint'>você já carrega todos os oito. Deus te ajude.</div>"}
 <div style="text-align:right;margin-top:8px"><button class="btn" onclick="closeModal()">fechar</button></div>`);}
function pickFardo(f){S.fardosX.push(f);save();closeModal();render();toast(f+" adicionado — 3 habilidades-base ganhas de graça.");}
function remFardo(f){if(!confirm(`Remover ${f}? Escolhíveis e maestrias dele voltam como reembolso.`))return;
 S.fardosX=S.fardosX.filter(x=>x!==f);purgeFardo(f);save();render();}
function buyEsc(f,i){const h=FARDOS[f].esc[i],q=reqInfo(f,h),ppL=ppTot()-ppGasto();
 if(ppL<2&&!confirm("PP insuficiente — comprar mesmo assim (fica negativo)?"))return;
 if(!q.ok&&!confirm("Requisito não atendido — a mesa manda. Comprar mesmo assim?"))return;
 S.esc.push(f+"|"+h.n);save();render();toast(h.n+" adquirida.");}
function refundEsc(f,i){const n=FARDOS[f].esc[i].n;S.esc=S.esc.filter(k=>k!==f+"|"+n);save();render();toast("2 PP devolvidos.");}
function habEditor(){modal(`<h3>Criar habilidade</h3>
 <div class="row"><div><label>Nome</label><input type="text" id="ch_n"></div><div><label>Etiqueta</label><input type="text" id="ch_t" placeholder="AÇÃO · 1 FÔLEGO · 1×/CENA"></div></div>
 <label>Texto</label><textarea id="ch_x"></textarea>
 <div style="text-align:right;margin-top:10px;display:flex;gap:8px;justify-content:flex-end">
 <button class="btn" onclick="closeModal()">cancelar</button>
 <button class="btn gold" onclick="addCustomHab()">salvar</button></div>`);}
function addCustomHab(){const n=$("ch_n").value.trim();if(!n)return toast("Dê um nome.");
 S.custom.hab.push({n,tag:$("ch_t").value.trim(),tx:$("ch_x").value.trim()});save();closeModal();render();}
/* maestrias */
function maeImpostaAviso(){if(!owned().includes("Sintonizador"))return "";
 if(!S.elem)return `<div class="hint" style="color:#c88">◆ Maestria Imposta: o Sintonizador não escolhe — <a href="#" style="color:var(--ec)" onclick="go('sint');return false">sintonize um elemento</a> para revelar a trilha.</div>`;
 const e=ELM(S.elem),nome=FARDOS["Sintonizador"].mae.find(m=>m.el===S.elem);
 if(nome&&!S.maest.some(m=>m.f==="Sintonizador"))return `<div class="hint" style="color:var(--ec)">◆ Maestria Imposta revelada: <b>${nome.n}</b> — abra pelo botão acima (custa 1 Escolha, como manda a progressão).</div>`;
 return "";}
function openMaeModal(){const mtL=mtTot()-mtUsado();let body="";
 for(const f of owned()){const d=FARDOS[f];let ops=d.mae.map((m,i)=>({m,i}));
  if(f==="Sintonizador")ops=ops.filter(o=>o.m.el===S.elem);
  ops=ops.filter(o=>!S.maest.some(x=>x.f===f&&x.n===o.m.n));
  if(ops.length)body+=`<div class="secband">${f}${f==="Sintonizador"?" · imposta pelo elemento":""}</div>`+
   ops.map(({m,i})=>`<div class="hcard" style="cursor:pointer" onclick="openMae('${f}',${i})"><div class="ht"><b>${esc(m.n)}</b>${m.el?`<span class="tag">${ELM(m.el).g} ${ELM(m.el).n}</span>`:""}</div><div class="hx">${esc(m.s||"")}${m.st.every(s=>!s.length)?" <em style='color:var(--faint)'>· estágios a completar do Dossiê</em>":""}</div></div>`).join("");
  if(f==="Sintonizador"&&!S.elem)body+=`<div class="secband">Sintonizador</div><div class="hint">sintonize um elemento para revelar a trilha imposta.</div>`;}
 modal(`<h3>Abrir maestria <small style="color:var(--faint)">· ${mtL} escolha${mtL===1?"":"s"} livre${mtL===1?"":"s"}</small></h3>
 ${body||`<div class="hint">nenhum caminho embutido disponível nos seus Fardos.</div>`}
 <div class="secband">Caminho customizado</div>
 <div class="row"><div><label>Fardo</label><select id="cm_f">${owned().map(f=>`<option>${f}</option>`).join("")}</select></div>
 <div><label>Nome do caminho</label><input type="text" id="cm_n" placeholder="ex: Batedor"></div>
 <div style="flex:0;align-self:flex-end"><button class="btn gold mini" onclick="openMaeCustom()">abrir</button></div></div>
 <div style="text-align:right;margin-top:10px"><button class="btn" onclick="closeModal()">fechar</button></div>`);}
function chkEscolha(){if(mtTot()-mtUsado()<1){toast("Sem Escolha de Maestria livre — elas chegam nos níveis 1, 4, 8 e 12.");return false;}return true;}
function openMae(f,i){if(!chkEscolha())return;const m=FARDOS[f].mae[i];
 S.maest.push({f,n:m.n,st:0,rec:0});save();closeModal();render();toast(m.n+" — Aprendiz.");}
function openMaeCustom(){if(!chkEscolha())return;const f=$("cm_f").value,n=$("cm_n").value.trim();if(!n)return toast("Dê um nome ao caminho.");
 S.maest.push({f,n,st:0,cu:true,tx:["","","",""]});save();closeModal();render();}
function maeData(m){const d=FARDOS[m.f];return d?d.mae.find(x=>x.n===m.n):null;}
function maeCard(m,i){const md=m.cu?null:maeData(m),imposta=(m.f==="Sintonizador");
 let body="";
 for(let s=0;s<=m.st;s++){const lb=`<div class="secband" style="border:none;padding:6px 0 2px">${STG[s]}</div>`;
  if(m.cu){body+=lb+`<textarea oninput="S.maest[${i}].tx[${s}]=this.value;save()" placeholder="habilidades deste estágio…">${esc(m.tx[s]||"")}</textarea>`;}
  else{const abs=(md&&md.st[s])||[];body+=lb+(abs.length?abs.map(h=>hcardH(h)).join(""):`<div class="hint">— a completar do Dossiê (use um caminho customizado ou me peça para embutir).</div>`);}}
 return `<div class="mcard"><div class="ht" style="display:flex;gap:8px;align-items:baseline;flex-wrap:wrap">
 <b style="font-family:Georgia,serif;font-size:15px">${esc(m.n)}</b><span class="tag dark">${m.f}</span>
 ${imposta?`<span class="tag warn">imposta</span>`:""}${md&&md.s?`<span class="src">${esc(md.s)}</span>`:""}</div>
 ${md&&md.regra?`<div class="hcard regra" style="margin-top:8px"><div class="ht"><b>◆ ${esc(md.regra.n)}</b>${md.regra.cst?`<span class="tag dark">${esc(md.regra.cst)}</span>`:""}${md.regra.ac?`<span class="tag dark">${esc(md.regra.ac)}</span>`:""}</div>${md.regra.sab?`<div class="hsab">${esc(md.regra.sab)}</div>`:""}<div class="hx">${esc(md.regra.ef)}</div></div>`:""}
 ${meterCard(m,i)}
 <div class="mrail">${STG.map((n,s)=>`<div class="mst ${s<=m.st?"on":s===m.st+1?"next":""}">${n}</div>`).join("")}</div>
 ${body}
 <div style="display:flex;gap:6px;margin-top:8px">
 ${m.st<3?`<button class="btn mini gold" onclick="subirMae(${i})">subir para ${STG[m.st+1]} · 1 escolha</button>`:`<span class="tag ok">ápice alcançado</span>`}
 ${m.st>0?`<button class="btn mini" onclick="S.maest[${i}].st--;save();render();toast('Escolha devolvida.')">voltar estágio</button>`:""}
 ${imposta&&owned().includes("Sintonizador")?"":`<button class="btn mini del" onclick="remMae(${i})">fechar caminho</button>`}
 </div></div>`;}
function subirMae(i){const m=S.maest[i];
 if(m.st+1===3&&S.nivel<12)return toast("Ápice exige nível 12+.");
 if(!chkEscolha())return;m.st++;save();render();toast(m.n+" — "+STG[m.st]+".");}
function remMae(i){const m=S.maest[i];if(!confirm(`Fechar ${m.n}? As ${1+m.st} escolhas voltam.`))return;
 S.maest.splice(i,1);save();render();}

/* ---------- MAGIAS ---------- */
function allMag(){return MAGIAS.concat(S.custom.mag.map(m=>Object.assign({custom:true},m)));}
function conhKey(m){return m.el+"|"+m.n;}
function conhOwnCount(){return S.conh.filter(k=>{const[el,n]=k.split("|");return el===S.elem&&!MAGIAS_AUTO.includes(n);}).length;}
function toggleConh(key,ck){if(ck){if(!S.conh.includes(key))S.conh.push(key);}else S.conh=S.conh.filter(k=>k!==key);
 save();const c=$("magCount");if(c)c.textContent=conhOwnCount();}
function magCard(m,ci){const ok=grauOK(m.g,S.ruido,S.nivel),key=conhKey(m),kn=S.conh.includes(key);
 const lines=[["Parcial",m.p],["Total",m.t],["Crítico",m.c],["Sobrecarga",m.sob],["Falha",m.fal]].filter(x=>x[1]&&x[1]!=="—");
 return `<div class="hcard ${ok||m.auto?"":"locked"}"><div class="ht"><b>${esc(m.n)}</b>
 <span class="tag ${ok?"ok":"warn"}" title="${esc(GRAUS[m.g-1].rq)}">G${m.g} · limiar ${GRAUS[m.g-1].lim}</span>
 <span class="tag dark">${esc(m.tipo)}</span><span class="tag dark">${esc(m.cst)}</span>
 ${m.auto?`<span class="tag">automática do Marcado</span>`:`<label style="margin-left:auto;display:flex;gap:5px;align-items:center;font-size:10px;letter-spacing:1px;color:var(--dim)"><input type="checkbox" ${kn?"checked":""} onchange="toggleConh('${key}',this.checked)"> conhecida</label>`}
 ${m.custom?`<span class="src"><button class="btn mini del" onclick="S.custom.mag.splice(${ci},1);save();render()">apagar</button></span>`:""}
 </div><div class="hx"><em>Execução</em> ${esc(m.exe)} · <em>Alcance</em> ${esc(m.alc)} · <em>Duração</em> ${esc(m.dur)}<br>
 ${lines.map(l=>`<em>${l[0]}</em> ${esc(l[1])}`).join("<br>")}</div></div>`;}
function rMag(){const N=2+A("jui"),X=conhOwnCount(),e=ELM(S.elem);
 let html=`<div class="panel"><h2>Magias
 <span style="margin-left:auto;font-family:Georgia,serif;font-size:16px;letter-spacing:1px;color:${X>N?"#c66":"var(--ec)"}">
 conhecidas do próprio elemento: <b id="magCount">${X}</b> / ${N}</span></h2>
 <div class="hint">${e?`elemento sintonizado: <a href="#" style="color:var(--ec)" onclick="go('sint');return false">${e.g} ${e.n}</a> · `:`<a href="#" style="color:var(--ec)" onclick="go('sint');return false">sintonize um elemento →</a> · `}
 limite = 2 + Juízo · automáticas dos Marcados e fontes achadas em jogo não contam · novas magias entram em downtime de estudo</div>
 <div class="chips" style="margin-top:8px">${GRAUS.map(g=>`<span class="tag ${grauOK(g.g,S.ruido,S.nivel)?"ok":"dark"}" title="${esc(g.rq)}">G${g.g} · ${g.lim}</span>`).join(" ")}
 <span style="margin-left:auto"><button class="btn mini gold" onclick="magEditor()">+ criar magia</button></span></div></div>`;
 if(e){const own=allMag().filter(m=>m.el===e.id).sort((a,b)=>a.g-b.g||a.n.localeCompare(b.n));
  html+=`<div class="secband">${e.g} ${e.n} — ${e.v}</div>`;
  html+=own.length?own.map(m=>magCard(m,m.custom?S.custom.mag.indexOf(S.custom.mag.find(x=>x.n===m.n&&x.el===m.el)):-1)).join(""):`<div class="hint">nenhuma magia deste elemento embutida ainda — crie pelas anotações ou me peça para puxar do Grimório.</div>`;}
 const outros=ELEMS.filter(x=>!e||x.id!==e.id);
 html+=`<details style="margin-top:16px"><summary style="cursor:pointer;color:var(--faint);font-size:11px;letter-spacing:3px;text-transform:uppercase">outros elementos — fontes achadas em jogo</summary>
 ${outros.map(o=>{const ms=allMag().filter(m=>m.el===o.id).sort((a,b)=>a.g-b.g);
  return ms.length?`<div class="secband">${o.g} ${o.n}</div>`+ms.map(m=>magCard(m,m.custom?S.custom.mag.findIndex(x=>x.n===m.n&&x.el===m.el):-1)).join(""):"";}).join("")||`<div class="hint">nada por aqui.</div>`}</details>`;
 $("mainview").innerHTML=html;}
function magEditor(){modal(`<h3>Criar magia</h3>
 <div class="row"><div><label>Elemento</label><select id="cm_el">${ELEMS.map(e=>`<option value="${e.id}" ${S.elem===e.id?"selected":""}>${e.g} ${e.n}</option>`).join("")}</select></div>
 <div><label>Grau</label><select id="cm_g"><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
 <div><label>Nome</label><input type="text" id="cm_nm"></div></div>
 <div class="row"><div><label>Tipo</label><input type="text" id="cm_tp" placeholder="SENSOR, ÁREA…"></div>
 <div><label>Custo</label><input type="text" id="cm_cs" placeholder="2 Sintonia + 1 Lucidez"></div></div>
 <div class="row"><div><label>Execução</label><input type="text" id="cm_ex" value="Ação"></div>
 <div><label>Alcance</label><input type="text" id="cm_al" value="Curto"></div>
 <div><label>Duração</label><input type="text" id="cm_du" value="Cena"></div></div>
 <label>Texto (Parcial / Total / Crítico…)</label><textarea id="cm_tx"></textarea>
 <div style="text-align:right;margin-top:10px;display:flex;gap:8px;justify-content:flex-end">
 <button class="btn" onclick="closeModal()">cancelar</button><button class="btn gold" onclick="addCustomMag()">salvar</button></div>`);}
function addCustomMag(){const n=$("cm_nm").value.trim();if(!n)return toast("Dê um nome.");
 S.custom.mag.push({el:$("cm_el").value,g:parseInt($("cm_g").value,10),n,tipo:$("cm_tp").value.trim()||"—",cst:$("cm_cs").value.trim()||"—",exe:$("cm_ex").value.trim(),alc:$("cm_al").value.trim(),dur:$("cm_du").value.trim(),p:$("cm_tx").value.trim(),t:"",c:"",sob:"",fal:""});
 save();closeModal();render();}

/* ---------- TALENTOS + ROLETA ---------- */
let TF={q:"",c:0,e:"todos"},spinning=false;
function rTal(){const pcL=pcTot()-pcGasto();
 $("mainview").innerHTML=`<div class="wallet"><span class="${pcL<0?"neg":""}">Pontos de Compra <b>${pcL}</b> livres <small>(${pcTot()} totais − ${pcGasto()} gastos)</small></span>
 <span>gasto fora da loja <input type="number" min="0" style="width:70px;display:inline-block;padding:3px 6px" value="${S.pcExtra}" onchange="S.pcExtra=parseInt(this.value,10)||0;save();rTal()"> <small>PC (proficiências 1 · atributos 3/4/6/8)</small></span></div>
 <div class="tbar"><input type="text" placeholder="buscar talento…" value="${esc(TF.q)}" oninput="TF.q=this.value;talList()">
 <select onchange="TF.c=parseInt(this.value,10);talList()"><option value="0">todos os custos</option><option value="1" ${TF.c===1?"selected":""}>1 PC</option><option value="2" ${TF.c===2?"selected":""}>2 PC</option><option value="3" ${TF.c===3?"selected":""}>3 PC</option></select>
 <select onchange="TF.e=this.value;talList()"><option value="todos" ${TF.e==="todos"?"selected":""}>todos</option><option value="c" ${TF.e==="c"?"selected":""}>comprados</option><option value="d" ${TF.e==="d"?"selected":""}>disponíveis</option></select></div>
 <div id="tallist"></div>
 <div id="roleta"><h2 style="font-family:Georgia,serif;font-weight:400;letter-spacing:4px;text-transform:uppercase;color:var(--ec);margin:0 0 4px">⟳ Roleta Maluca</h2>
 <div class="rq">“Cinco nomes na roda. A sorte não conhece nenhum.” — a roleta sorteia um <b>atributo</b>; o que fazer com ele, a mesa decide.</div>
 <div class="slotbox" id="slotbox"><div id="slotreel"><div><span>?</span>— · —</div></div></div>
 <div id="rolres" class="hint" style="min-height:18px"></div>
 <button class="btn gold" id="btnGirar" onclick="spinRoleta()">G I R A R</button></div>`;
 talList();}
function talList(){const box=$("tallist");if(!box)return;const q=TF.q.toLowerCase();let html="",last=0;
 TALENTOS.forEach((t,gi)=>{const[pc,n,tx,rq]=t,key=pc+"|"+n,own=S.tal.includes(key);
  if(TF.c&&pc!==TF.c)return;if(TF.e==="c"&&!own)return;if(TF.e==="d"&&own)return;
  if(q&&!(n+" "+tx).toLowerCase().includes(q))return;
  if(pc!==last){last=pc;html+=`<div class="secband">Talentos de <b>${pc} PC</b></div>`;}
  let rb="";if(rq){const an=ATTRS.find(a=>a[0]===rq[0]);const ok=A(rq[0])>=rq[1];rb=badge(an[1]+" +"+rq[1],ok);}
  html+=`<div class="hcard"><div class="ht"><b>${esc(n)}</b><span class="tag dark">${pc} PC</span>${rb}
  ${own?`<span class="tag ok">comprado</span><span class="src"><button class="btn mini del" onclick="refundTal(${gi})">devolver</button></span>`
   :`<span class="src"><button class="btn mini gold" onclick="buyTal(${gi})">comprar</button></span>`}</div>
  <div class="hx">${esc(tx).replace(/⟑⋏⊙⌖◊/g,rw())}</div></div>`;});
 box.innerHTML=html||`<div class="hint">nada encontrado.</div>`;}
function buyTal(gi){const[pc,n,,rq]=TALENTOS[gi],pcL=pcTot()-pcGasto();
 if(pcL<pc&&!confirm("PC insuficiente — comprar mesmo assim (fica negativo)?"))return;
 if(rq&&A(rq[0])<rq[1]&&!confirm("Requisito de atributo não atendido — comprar mesmo assim?"))return;
 S.tal.push(pc+"|"+n);save();rTal();toast(n+" adquirido.");}
function refundTal(gi){const[pc,n]=TALENTOS[gi];S.tal=S.tal.filter(k=>k!==pc+"|"+n);save();rTal();toast(pc+" PC devolvidos.");}
function spinRoleta(){if(spinning)return;spinning=true;$("btnGirar").disabled=true;$("rolres").innerHTML="";
 const pick=Math.floor(Math.random()*5),seq=[];
 for(let r=0;r<4;r++)for(const a of ATTRS)seq.push(a);
 for(let i=0;i<=pick;i++)seq.push(ATTRS[i]);
 const reel=$("slotreel");reel.style.transform="translateY(0)";
 reel.innerHTML=seq.map(a=>`<div><span>${alien(a[1][0])}</span>${a[1]}</div>`).join("");
 const total=(seq.length-1)*56,t0=performance.now(),D=S.ui.calm?200:2500;
 (function fr(t){const p=Math.min(1,(t-t0)/D),e2=1-Math.pow(1-p,3);
  reel.style.transform=`translateY(${-total*e2}px)`;
  if(p<1)rAF(fr);else{const a=ATTRS[pick];$("slotbox").classList.add("slotwin");setTimeout(()=>{const b=$("slotbox");if(b)b.classList.remove("slotwin");},900);
   $("rolres").innerHTML=`a roleta cravou: <b style="color:var(--ec);letter-spacing:3px">${a[1].toUpperCase()}</b> — ${esc(a[2])}`;
   S.sess.log.unshift({t:hhmm(),x:"Roleta Maluca → "+a[1]});S.sess.log=S.sess.log.slice(0,40);save();
   toast("Roleta Maluca: "+a[1].toUpperCase());spinning=false;const g=$("btnGirar");if(g)g.disabled=false;}})(t0);}

/* ---------- BIBLIOTECA (IndexedDB) ---------- */
let _db=null,_urls={};
function idb(){return new Promise((res,rej)=>{if(!window.indexedDB)return rej("no-idb");if(_db)return res(_db);
 const rq=indexedDB.open("prot4db",1);
 rq.onupgradeneeded=e=>{e.target.result.createObjectStore("docs",{keyPath:"id",autoIncrement:true});};
 rq.onsuccess=e=>{_db=e.target.result;res(_db);};rq.onerror=()=>rej(rq.error);});}
function dbAll(){return idb().then(db=>new Promise((res,rej)=>{const r=db.transaction("docs").objectStore("docs").getAll();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>rej(r.error);}));}
function dbAdd(rec){return idb().then(db=>new Promise((res,rej)=>{const r=db.transaction("docs","readwrite").objectStore("docs").add(rec);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);}));}
function dbPut(rec){return idb().then(db=>new Promise((res,rej)=>{const r=db.transaction("docs","readwrite").objectStore("docs").put(rec);r.onsuccess=()=>res();r.onerror=()=>rej(r.error);}));}
function dbDel(id){return idb().then(db=>new Promise((res,rej)=>{const r=db.transaction("docs","readwrite").objectStore("docs").delete(id);r.onsuccess=()=>res();r.onerror=()=>rej(r.error);}));}
function rBib(){$("mainview").innerHTML=`<div class="panel"><h2>Biblioteca do Caso <small>PDFs e imagens — mapas, retratos, recortes de jornal</small></h2>
 <div class="dropzone" id="dz" onclick="$('bibFile').click()">arraste PDFs ou imagens aqui · ou clique para escolher</div>
 <div class="hint">os arquivos ficam salvos <b>neste navegador</b> (IndexedDB) — não entram no JSON de exportação nem nos slots.</div>
 <div class="docgrid" id="docgrid" style="margin-top:14px"></div></div>`;
 const dz=$("dz");
 dz.addEventListener("dragover",e=>{e.preventDefault();dz.classList.add("over");});
 dz.addEventListener("dragleave",()=>dz.classList.remove("over"));
 dz.addEventListener("drop",e=>{e.preventDefault();dz.classList.remove("over");bibAdd(e.dataTransfer.files);});
 bibRefresh();}
function bibAdd(files){const fl=Array.from(files||[]).filter(f=>/pdf|image/.test(f.type));
 if(!fl.length)return toast("Só PDFs e imagens.");
 Promise.all(fl.map(f=>dbAdd({name:f.name.replace(/\.[^.]+$/,""),type:f.type,blob:f,note:"",ts:Date.now()})))
 .then(()=>{toast(fl.length+" documento(s) arquivado(s).");bibRefresh();})
 .catch(()=>toast("Este navegador recusou o arquivo (IndexedDB indisponível)."));}
function bibURL(r){if(!_urls[r.id])try{_urls[r.id]=URL.createObjectURL(r.blob);}catch(e){_urls[r.id]="";}return _urls[r.id];}
function bibRefresh(){const g=$("docgrid");if(!g)return;
 dbAll().then(list=>{list.sort((a,b)=>b.ts-a.ts);
  g.innerHTML=list.map(r=>`<div class="doc">
  <div class="dth" onclick="bibView(${r.id})">${/image/.test(r.type)?`<img src="${bibURL(r)}" alt="">`:"⌸"}</div>
  <input type="text" value="${esc(r.name)}" onchange="bibRen(${r.id},this.value)">
  <input type="text" placeholder="nota…" value="${esc(r.note||"")}" onchange="bibNote(${r.id},this.value)">
  <div class="dbtns"><button class="btn mini" onclick="bibView(${r.id})">abrir</button>
  <button class="btn mini del" onclick="bibDel(${r.id})">excluir</button></div></div>`).join("")
  ||`<div class="hint">o arquivo do caso está vazio. Por enquanto.</div>`;})
 .catch(()=>{g.innerHTML=`<div class="hint">Biblioteca indisponível neste navegador (sem IndexedDB).</div>`;});}
function bibFind(id,cb){dbAll().then(l=>{const r=l.find(x=>x.id===id);if(r)cb(r);});}
function bibRen(id,v){bibFind(id,r=>{r.name=v;dbPut(r);});}
function bibNote(id,v){bibFind(id,r=>{r.note=v;dbPut(r);});}
function bibDel(id){if(!confirm("Excluir este documento do arquivo?"))return;dbDel(id).then(bibRefresh);}
function bibView(id){bibFind(id,r=>{const u=bibURL(r);
 modal(`<h3>${esc(r.name)}</h3>
 ${/image/.test(r.type)?`<img src="${u}" style="max-width:100%;max-height:70vh;display:block;margin:0 auto;border:1px solid var(--line)">`
  :`<iframe src="${u}" style="width:100%;height:70vh;border:1px solid var(--line);background:#222"></iframe>`}
 <div style="margin-top:10px;display:flex;justify-content:space-between">
 <a class="btn" href="${u}" download="${esc(r.name)}" style="text-decoration:none">baixar</a>
 <button class="btn" onclick="closeModal()">fechar</button></div>`);});}

/* ---------- DÍVIDAS & NOTAS ---------- */
function rDiv(){$("mainview").innerHTML=`<div class="grid2">
 <div class="panel"><h2>⚖ Dívidas <small>registro do mestre — cobrável em jogo. O Cobrador vive delas.</small></h2>
  <div id="divlist">${S.div.map((d,i)=>`<div class="row" style="margin-bottom:6px"><div><input type="text" value="${esc(d)}" oninput="S.div[${i}]=this.value;save();updDock()"></div>
  <div style="flex:0"><button class="btn mini del" onclick="S.div.splice(${i},1);save();render()">×</button></div></div>`).join("")}</div>
  <button class="btn mini gold" onclick="S.div.push('');save();render()">+ registrar dívida</button></div>
 <div class="panel"><h2>Créditos de Garantia <small>moeda da magia Garantia (Pacto) — penhore o intangível, gaste em bônus, cura e descontos</small></h2>
  <div>${S.cred.map((d,i)=>`<div class="row" style="margin-bottom:6px"><div><input type="text" value="${esc(d)}" oninput="S.cred[${i}]=this.value;save()"></div>
  <div style="flex:0"><button class="btn mini del" onclick="S.cred.splice(${i},1);save();render()">×</button></div></div>`).join("")}</div>
  <button class="btn mini gold" onclick="S.cred.push('');save();render()">+ anotar crédito</button>
  <div class="hint">Tudo se anota. Nada se esquece.</div></div>
 </div>
 <div class="grid2">
 <div class="panel"><h2>Vínculos <small>quem te segura no mundo</small></h2><textarea style="min-height:110px" oninput="setF('vinc',this.value)">${esc(S.vinc)}</textarea></div>
 <div class="panel"><h2>História</h2><textarea style="min-height:110px" oninput="setF('hist',this.value)">${esc(S.hist)}</textarea></div>
 </div>
 <div class="panel"><h2>Notas gerais</h2><textarea style="min-height:160px" oninput="setF('notas',this.value)">${esc(S.notas)}</textarea>
 <div class="hint">as notas rápidas do Modo Sessão podem ser arquivadas aqui.</div></div>`;}

/* ---------- MODO SESSÃO ---------- */
let SESS_ALL=false;
function rSess(){const e=ELM(S.elem);
 $("sessview").innerHTML=`<div class="panel"><h2>Modo Sessão <small>${esc(S.nome||"sem nome")} · nível ${S.nivel}${S.fardo?" · "+S.fardo:""}${e?" · "+e.g+" "+e.n:""}</small>
 <span style="margin-left:auto"><button class="btn" onclick="toggleSess()">◼ encerrar</button></span></h2>
 <div class="bigrec">${["vida","fol","sin","luc"].map(k=>{const nm={vida:"Vida",fol:"Fôlego",sin:"Sintonia",luc:"Lucidez"}[k],mx={vida:maxVida,fol:maxFol,sin:maxSin,luc:maxLuc}[k]();
  return `<div class="rec"><div class="rn">${nm} <b>máx ${mx}</b></div><div class="rv">
  <button class="stp" onclick="stepRec('${k}',-1)">−</button>
  <input type="number" id="scur_${k}" value="${curOf(k)}" onchange="setCur('${k}',this.value)"><span class="mx">/ ${maxIn("smax_"+k,k)}</span>
  <button class="stp" onclick="stepRec('${k}',1)">+</button></div>${mxRef(k)}<div class="bar"><i id="sbar_${k}"></i></div></div>`;}).join("")}
 </div>
 <div class="row" style="margin-top:12px;align-items:center">
  <div style="flex:0;min-width:220px"><label>${W_RUIDO} · Ruído</label>
   <div style="display:flex;gap:6px;align-items:center">
   <button class="stp btn mini" onclick="setRuido(S.ruido-1)">−</button>
   <span style="font-family:Georgia,serif;font-size:22px;color:var(--ec);min-width:34px;text-align:center">${S.ruido}</span>
   <button class="stp btn mini" onclick="setRuido(S.ruido+1)">+</button>
   <span class="hint" style="margin:0">${BANDS[bandOf(S.ruido)][2]}</span></div></div>
  <div style="flex:0;min-width:130px"><label>Brio</label><div style="display:flex;gap:6px;align-items:center">
   <button class="stp btn mini" onclick="setNum('brio',Math.max(0,S.brio-1));rSess()">−</button>
   <span style="font-family:Georgia,serif;font-size:22px;min-width:26px;text-align:center">${S.brio}</span>
   <button class="stp btn mini" onclick="setNum('brio',S.brio+1);rSess()">+</button></div></div>
  <div style="flex:0;min-width:150px"><label>Gente</label><div style="display:flex;gap:6px;align-items:center">
   <button class="stp btn mini" onclick="setGente(Math.max(0,curGente()-1));rSess()">−</button>
   <span style="font-family:Georgia,serif;font-size:22px;min-width:26px;text-align:center">${curGente()}<small style="font-size:11px;color:var(--faint)">/${maxGente()}</small></span>
   <button class="stp btn mini" onclick="setGente(Math.min(maxGente(),curGente()+1));rSess()">+</button></div></div>
  <div><label>Condições</label><div class="chips">${CONDICOES.map(c=>`<span class="chip ${S.cond[c[0]]?"on":""}" title="${esc(c[1])}" onclick="toggleCond('${c[0].replace(/'/g,"\\'")}')">${c[0]}</span>`).join("")}</div></div>
 </div></div>
 <div class="sessgrid">
 <div class="panel"><h2>Perícias <small><label style="display:inline;letter-spacing:0;text-transform:none;cursor:pointer"><input type="checkbox" ${SESS_ALL?"checked":""} onchange="SESS_ALL=this.checked;rSess()" style="accent-color:var(--ec)"> mostrar todas</label></small></h2>
 <div class="skills">${skillsHTML(true)}</div></div>
 <div>
 <div class="panel"><h2>Notas rápidas</h2>
  <div class="snote"><input type="text" id="snIn" placeholder="pista, nome, endereço…" onkeydown="if(event.key==='Enter')addSN()"><button class="btn mini gold" onclick="addSN()">+</button></div>
  <div class="snlist">${S.sess.notes.map((n,i)=>`<div class="sn"><b>${esc(n.t)}</b>${esc(n.x)} <span style="float:right;color:var(--faint);cursor:pointer" onclick="S.sess.notes.splice(${i},1);save();rSess()">×</span></div>`).join("")||`<div class="hint">nada anotado nesta sessão.</div>`}</div>
  <div style="display:flex;gap:6px;margin-top:8px">
  <button class="btn mini" onclick="arqSN()">arquivar em Notas</button>
  <button class="btn mini del" onclick="if(confirm('Limpar as notas da sessão?')){S.sess.notes=[];save();rSess()}">limpar</button></div></div>
 <div class="panel"><h2>Rolagens</h2><div class="slog" id="slog">${logHTML()}</div></div>
 </div></div>`;
 barSync();}
function addSN(){const i=$("snIn");if(!i.value.trim())return;S.sess.notes.unshift({t:hhmm(),x:i.value.trim()});i.value="";save();rSess();}
function arqSN(){if(!S.sess.notes.length)return toast("Nada para arquivar.");
 const d=new Date().toLocaleDateString("pt-BR");
 S.notas=("— sessão "+d+" —\n"+S.sess.notes.slice().reverse().map(n=>n.t+" · "+n.x).join("\n")+"\n\n")+(S.notas||"");
 S.sess.notes=[];save();rSess();toast("Notas arquivadas em Dívidas & Notas.");}

/* ============ INVENTÁRIO (portado da ficha antiga) ============ */
const GRID_COLS=6,GAP=2,CSZ=38;
const PIECE_COLORS=["#c9a227","#8dbb62","#7fb8a8","#c15a45","#7c8fb5","#c13a52","#b8b0a0","#8a7a5a"];
let editorColor=PIECE_COLORS[0],editorShape=[],selectedPiece=null,dragInfo=null,_invKey=false;
function gridRows(){return Math.max(4,Math.min(10,6+A("car")));}
function rInv(){
 $("mainview").innerHTML=`<div class="panel"><h2>Mochila <small>arraste para posicionar · clique numa peça e tecle R para girar</small>
 <span style="margin-left:auto;font-size:12px;color:var(--dim);letter-spacing:0;text-transform:none;font-family:system-ui">R$ <input type="number" step="50" style="width:110px;display:inline-block;padding:3px 7px" value="${S.dinheiro}" onchange="setNum('dinheiro',this.value);toast(fmtRS(S.dinheiro))"></span></h2>
 <div class="inv-top">
  <div class="inv-left">
   <div class="hint" style="margin-bottom:8px">Capacidade pela Carne: grade <b id="gi">${GRID_COLS} × ${gridRows()}</b>.</div>
   <div id="invGrid"></div>
   <div style="margin-top:12px"><label>Bolsa de espera (não cabem / fora do grid)</label><div class="bag" id="bag"></div></div>
  </div>
  <div class="inv-right"><div class="panel" style="margin:0">
   <h2>Criar item</h2>
   <div class="row"><div><label>Nome</label><input type="text" id="pieceName" placeholder="ex: Espingarda"></div></div>
   <label>Cor</label><div class="swatches" id="swatches"></div>
   <label>Formato (clique nas células)</label><div class="shape-editor" id="shapeEd"></div>
   <button class="btn mini" onclick="clearShape()">limpar formato</button>
   <div style="margin-top:10px"><button class="btn gold" onclick="addPiece()">+ adicionar à bolsa</button></div>
   <div class="hint">Formato livre: L, T, linha, quadrado… Cada célula ocupa 1 espaço da mochila. Depois arraste da bolsa para a grade.</div>
  </div></div>
 </div></div>`;
 buildSwatches();buildShapeEditor();renderGrid();renderBag();
 if(!_invKey){_invKey=true;document.addEventListener("keydown",e=>{
  if((e.key==="r"||e.key==="R")&&selectedPiece&&S.ui.tab==="inv"&&!/input|textarea/i.test(document.activeElement.tagName)){
   const p=selectedPiece,old=p.rot;p.rot=((p.rot||0)+1)%4;
   if(p._loc==="grid"&&!canPlace(p,p.row,p.col,p.id)){p.rot=old;toast("Não cabe girado aqui.");}
   save();renderGrid();renderBag();}});}}
function buildSwatches(){const b=$("swatches");if(!b)return;
 b.innerHTML=PIECE_COLORS.map(c=>`<div class="sw ${c===editorColor?"sel":""}" style="background:${c}" onclick="pickColor('${c}')"></div>`).join("");}
function pickColor(c){editorColor=c;buildSwatches();}
function buildShapeEditor(){if(!editorShape.length)editorShape=Array.from({length:5},()=>Array(5).fill(false));
 const ed=$("shapeEd");if(!ed)return;ed.innerHTML="";
 for(let r=0;r<5;r++)for(let c=0;c<5;c++){const d=document.createElement("div");
  d.className="sc"+(editorShape[r][c]?" on":"");
  d.onclick=()=>{editorShape[r][c]=!editorShape[r][c];buildShapeEditor();};ed.appendChild(d);}}
function clearShape(){editorShape=Array.from({length:5},()=>Array(5).fill(false));buildShapeEditor();}
function shapeCells(){const cells=[];
 for(let r=0;r<5;r++)for(let c=0;c<5;c++)if(editorShape[r][c])cells.push([r,c]);
 if(!cells.length)return null;
 const mR=Math.min(...cells.map(x=>x[0])),mC=Math.min(...cells.map(x=>x[1]));
 return cells.map(([r,c])=>[r-mR,c-mC]);}
function addPiece(){const name=$("pieceName").value.trim()||"Item";const cells=shapeCells();
 if(!cells){toast("Desenhe um formato primeiro.");return;}
 S.inv.bag.push({id:S.inv.seq++,name,color:editorColor,shape:cells,rot:0});
 $("pieceName").value="";clearShape();save();renderBag();toast("Item criado na bolsa.");}
function rotateShape(cells){const mR=Math.max(...cells.map(x=>x[0]));
 const rot=cells.map(([r,c])=>[c,mR-r]);
 const nR=Math.min(...rot.map(x=>x[0])),nC=Math.min(...rot.map(x=>x[1]));
 return rot.map(([r,c])=>[r-nR,c-nC]);}
function shapeDims(cells){return[Math.max(...cells.map(x=>x[0]))+1,Math.max(...cells.map(x=>x[1]))+1];}
function effShape(p){let s=p.shape;for(let i=0;i<(((p.rot||0)%4)+4)%4;i++)s=rotateShape(s);return s;}
function renderGrid(){const rows=gridRows(),grid=$("invGrid");if(!grid)return;
 const gi=$("gi");if(gi)gi.textContent=GRID_COLS+" × "+rows;
 grid.style.gridTemplateColumns=`repeat(${GRID_COLS}, ${CSZ}px)`;grid.innerHTML="";
 for(let i=0;i<rows*GRID_COLS;i++){const c=document.createElement("div");c.className="cell";grid.appendChild(c);}
 const step=CSZ+GAP;
 S.inv.pieces.forEach(p=>{const s=effShape(p),[h,w]=shapeDims(s);
  const cont=document.createElement("div");cont.className="piece";
  cont.style.left=(2+p.col*step)+"px";cont.style.top=(2+p.row*step)+"px";
  cont.style.width=(w*CSZ+(w-1)*GAP)+"px";cont.style.height=(h*CSZ+(h-1)*GAP)+"px";
  cont.title=p.name+" (clique e tecle R p/ girar)";cont.dataset.id=p.id;
  s.forEach(([r,c])=>{const cd=document.createElement("div");
   cd.style.cssText=`position:absolute;left:${c*step}px;top:${r*step}px;width:${CSZ}px;height:${CSZ}px;background:${p.color};border:1px solid rgba(0,0,0,.35);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12);border-radius:2px`;
   cont.appendChild(cd);});
  const lbl=document.createElement("div");lbl.textContent=p.name;
  lbl.style.cssText="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#0d0b0a;font-weight:700;font-size:9px;text-shadow:0 0 2px rgba(255,255,255,.4);pointer-events:none;padding:2px;text-align:center";
  cont.appendChild(lbl);
  makeDraggable(cont,p,"grid");cont.onclick=()=>{selectedPiece=p;};
  grid.appendChild(cont);});}
function makeDraggable(dom,p,loc){p._loc=loc;
 dom.addEventListener("pointerdown",ev=>{ev.preventDefault();selectedPiece=p;
  const grid=$("invGrid");if(!grid)return;const rect=grid.getBoundingClientRect();
  const cell=grid.querySelector(".cell");const cs=cell?cell.getBoundingClientRect().width:CSZ;
  dragInfo={p,dom,rect,step:cs+GAP};dom.classList.add("dragging");
  document.addEventListener("pointermove",onDrag);document.addEventListener("pointerup",endDrag);});}
function onDrag(ev){if(!dragInfo)return;const{dom}=dragInfo;
 dom.style.position="fixed";dom.style.left=(ev.clientX-15)+"px";dom.style.top=(ev.clientY-15)+"px";dom.style.zIndex=999;}
function endDrag(ev){document.removeEventListener("pointermove",onDrag);document.removeEventListener("pointerup",endDrag);
 if(!dragInfo)return;const{p,rect,step}=dragInfo;
 const col=Math.round((ev.clientX-rect.left-2)/step),row=Math.round((ev.clientY-rect.top-2)/step);
 dragInfo.dom.classList.remove("dragging");dragInfo=null;
 if(ev.clientX>=rect.left&&ev.clientX<=rect.right&&ev.clientY>=rect.top&&ev.clientY<=rect.bottom){
  if(canPlace(p,row,col,p.id)){S.inv.bag=S.inv.bag.filter(x=>x.id!==p.id);
   if(!S.inv.pieces.find(x=>x.id===p.id))S.inv.pieces.push(p);
   p.row=row;p.col=col;}else toast("Não cabe aí.");}
 else{S.inv.pieces=S.inv.pieces.filter(x=>x.id!==p.id);
  if(!S.inv.bag.find(x=>x.id===p.id))S.inv.bag.push(p);}
 save();renderGrid();renderBag();}
function canPlace(p,row,col,ignoreId){const rows=gridRows(),s=effShape(p),occ={};
 S.inv.pieces.forEach(o=>{if(o.id===ignoreId)return;effShape(o).forEach(([r,c])=>occ[(o.row+r)+","+(o.col+c)]=1);});
 for(const[r,c]of s){const rr=row+r,cc=col+c;
  if(rr<0||cc<0||rr>=rows||cc>=GRID_COLS)return false;
  if(occ[rr+","+cc])return false;}
 return true;}
function renderBag(){const bag=$("bag");if(!bag)return;bag.innerHTML="";
 S.inv.bag.forEach(p=>{const s=effShape(p),[h,w]=shapeDims(s);
  const d=document.createElement("div");d.className="bagpiece";
  d.style.width=Math.max(34,w*16)+"px";d.style.height=Math.max(20,h*16)+"px";
  d.style.background=p.color;d.textContent=p.name;d.title=p.name;
  makeDraggable(d,p,"bag");d.onclick=()=>{selectedPiece=p;};
  const wrap=document.createElement("div");wrap.style.cssText="display:flex;flex-direction:column;align-items:center;gap:2px";
  wrap.appendChild(d);
  const del=document.createElement("button");del.className="btn mini del";del.textContent="×";
  del.onclick=()=>{S.inv.bag=S.inv.bag.filter(x=>x.id!==p.id);save();renderBag();};
  wrap.appendChild(del);bag.appendChild(wrap);});}

