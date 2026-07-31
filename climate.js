/* ===== Protocolo 4a ed - SISTEMA DE CLIMA =====
   tema/_ecCache, particulas (FX/fxTick), sussurros, motor de gatilhos (TRIG),
   audio compartilhado (AUD/audBuild) e os seis elementos.
   depende de data.js e de core.js (S, save, $, bandOf, ELM, curOf, maxVida...). */
/* ---------- tema / efeitos ---------- */
/* cor do elemento em cache: as partículas leem isto por frame, e getComputedStyle força reflow */
let _ecCache="#b8932f";
function applyTheme(){const b=bandOf(S.ruido||0);
 document.body.dataset.el=S.elem||"";document.body.dataset.band=b;
 document.body.style.setProperty("--band",b);
 document.body.classList.toggle("calm",!!S.ui.calm);
 document.body.classList.toggle("sess",!!S.ui.sess);
 const mv=maxVida(),vc=curOf("vida");
 document.body.classList.toggle("lowvida",mv>0&&vc<=Math.ceil(mv/3));
 document.body.classList.toggle("lowluc",curOf("luc")<=2);
 const g=$("h1g");if(g)g.textContent=S.elem?(" "+ELM(S.elem).g):"";
 _ecCache=(getComputedStyle(document.body).getPropertyValue("--ec")||"").trim()||"#b8932f";
 syncFX();}

/* partículas */
let FX={run:false,q:false,ps:[],last:0};
function syncFX(){const b=bandOf(S.ruido||0);const want=!!S.elem&&b>0&&!S.ui.calm&&!document.hidden;
 if(want&&!FX.run){FX.run=true;fxKick();}if(!want){FX.run=false;const cv=$("fx-canvas");if(cv){const x=cv.getContext&&cv.getContext("2d");if(x)x.clearRect(0,0,cv.width,cv.height);}}
 scopoSync();vazSync();ecoSync();ascSync();pacSync();gerSync();
 fxTrigSync();} /* por último: ele compara o retrato de antes com o estado já assentado */
/* FX.q garante um único rAF pendente: desligar e religar no mesmo frame não duplica o loop */
function fxKick(){if(FX.q)return;FX.q=true;rAF(fxTick);}
function fxTick(t){FX.q=false;if(!FX.run)return;const cv=$("fx-canvas");if(!cv)return;const ctx=cv.getContext&&cv.getContext("2d");if(!ctx){FX.run=false;return;}
 if(cv.width!==innerWidth||cv.height!==innerHeight){cv.width=innerWidth;cv.height=innerHeight;}
 const b=bandOf(S.ruido||0),el=S.elem,alvo=el==="vaz"?Math.min(b*2,8):b*3;
 if(FX.ps.length<alvo&&Math.random()<.12)FX.ps.push(fxNew(el,cv));
 ctx.clearRect(0,0,cv.width,cv.height);
 FX.ps=FX.ps.filter(p=>{p.life+=1;p.x+=p.vx;p.y+=p.vy;const a=Math.sin(Math.PI*Math.min(1,p.life/p.max));
  if(p.life>=p.max)return false;ctx.globalAlpha=a*p.op;fxDraw(ctx,el,p);ctx.globalAlpha=1;return true;});
 if(FX.ps.length>alvo)FX.ps.length=alvo;
 ClimateEffect.tickAll(t);pacTick(t);
 fxKick();}
function fxNew(el,cv){const W=cv.width,H=cv.height,r=Math.random;
 const base={x:r()*W,y:r()*H,vx:(r()-.5)*.2,vy:(r()-.5)*.2,life:0,max:240+r()*240,op:.16,s:4+r()*7};
 if(el==="ger"){base.y=H+10;base.vy=-.14-r()*.2;base.vx=(r()-.5)*.12;base.op=.2;}
 if(el==="asc"){base.vy=-.05;base.op=.15;}
 if(el==="pac"){base.vx=.2+r()*.2;base.vy=0;base.op=.12;}
 if(el==="eco"){base.vx=0;base.vy=0;base.max=160;base.op=.14;}
 if(el==="vaz"){base.vx=0;base.vy=0;base.op=.5;base.max=300;}
 return base;}
function fxDraw(c,el,p){c.strokeStyle=c.fillStyle=_ecCache;
 if(el==="obs"){c.beginPath();c.ellipse(p.x,p.y,p.s*1.6,p.s*.8,0,0,7);c.stroke();c.beginPath();c.arc(p.x,p.y,p.s*.32,0,7);c.fill();}
 else if(el==="eco"){const k=(p.life/p.max);c.beginPath();c.arc(p.x,p.y,p.s*3*k+2,0,7);c.stroke();}
 else if(el==="vaz"){c.fillStyle="#04050a";c.beginPath();c.arc(p.x,p.y,p.s*1.4,0,7);c.fill();}
 else if(el==="asc"){c.save();c.translate(p.x,p.y);c.rotate(p.life*.01);c.strokeRect(-p.s/2,-p.s/2,p.s,p.s);c.restore();}
 else if(el==="pac"){c.beginPath();c.moveTo(p.x,p.y);for(let i=1;i<5;i++)c.lineTo(p.x+i*7,p.y+Math.sin(p.life*.1+i)*2.4);c.stroke();}
 else if(el==="ger"){c.beginPath();c.arc(p.x,p.y,p.s*.5,0,7);c.fill();c.globalAlpha*=.4;c.beginPath();c.arc(p.x,p.y,p.s,0,7);c.stroke();}}
document.addEventListener("visibilitychange",()=>syncFX());

/* sussurros */
let _wt=null,_wsig="",_wh=null,_wEt=null;
/* quem tem susB (obs, vaz, eco) sussurra conforme a banda; os outros mantêm o sus simples */
function susOf(e,b){const B=e.susB;if(!B)return e.sus;return b<=2?B.lo:(b<=4?B.mid:B.hi);}
function showWhisper(tx,l,tp){const w=$("whisper");if(!w)return;
 w.textContent=tx;w.style.left=l;w.style.top=tp;
 w.classList.remove("on");void w.offsetWidth;w.classList.add("on");
 clearTimeout(_wh);_wh=setTimeout(()=>w.classList.remove("on"),4200);}
function whisperLoop(){const b=bandOf(S.ruido||0),e=ELM(S.elem);
 const sig=(S.elem||"")+"|"+b+"|"+(S.ui.mute?1:0)+"|"+(S.ui.calm?1:0);
 if(sig===_wsig&&_wt)return; /* render() roda a cada clique: sem mudança relevante, o ciclo em curso segue */
 _wsig=sig;clearTimeout(_wt);_wt=null;clearTimeout(_wEt);_wEt=null;
 if(!e||b<1||S.ui.mute||S.ui.calm)return;
 const base=[0,55,40,28,20,14][b]*1000;
 /* o Ascensão é metronômico: intervalos quase idênticos, precisão de máquina */
 let delay=base*(e.id==="asc"?(.97+Math.random()*.06):(0.7+Math.random()*.6));
 if(e.id==="obs"&&b>=4)delay*=.6; /* no ápice do Observação eles se acumulam */
 if(e.id==="vaz")delay*=1.45; /* o Vazio é vagaroso: mais espaçado, nunca frenético */
 _wt=setTimeout(()=>{_wt=null;const lst=susOf(e,b);let tx=lst[Math.floor(Math.random()*lst.length)];
  const temNome=tx.indexOf("{nome}")>=0;
  tx=pacTx(tx); /* o nome entra na hora de falar: reflete o campo agora, não o de antes */
  /* o Pacto fala claro; e frase com nome nunca é garatujada — sortear a palavra errada
     apagaria justamente o nome, que é o motivo de a frase existir */
  if(b>=4&&e.id!=="pac"&&!temNome&&Math.random()<.5){const ws=tx.split(" ");const i=Math.floor(Math.random()*ws.length);ws[i]=alien(ws[i]);tx=ws.join(" ");}
  const l=(8+Math.random()*70)+"%",tp=(10+Math.random()*75)+"%";
  showWhisper(tx,l,tp);
  whisperLoop(); /* reagenda o ciclo primeiro: ele limpa ecos pendentes */
  /* eco: o déjà vu do próprio sussurro — a mesma frase, no mesmo lugar, segundos depois */
  if(e.id==="eco"&&Math.random()<(b>=4?.5:.35))
   _wEt=setTimeout(()=>{_wEt=null;if(S.elem==="eco"&&!S.ui.mute&&!S.ui.calm)showWhisper(tx,l,tp);},4600+Math.random()*4200);
  },delay);}

/* ============ MOTOR DE GATILHOS — a ficha PERCEBE o que você faz ============
   os sussurros do whisperLoop são clima: caem no relógio, independem de você. estes são
   REAÇÃO: nascem de uma ação sua, e é daí que vem o susto — a ficha estava prestando atenção.

   o motor é genérico. cada elemento declara TRIG[id] (frases por gatilho) e, se quiser,
   TRIGFX[id] (efeito visual por gatilho). quem não declarar nada simplesmente não reage —
   e nem chega a instalar listener. hoje só o Germe preenche; obs/vaz/eco/asc/pac entram
   depois sem tocar em uma linha daqui.

   SEGURANÇA: o motor só LÊ ação e MOSTRA texto. não escreve em campo, não chama save/setF,
   não muta S. o trecho apagado que ele cita é lido para exibição e nunca reinserido. */
const TRIG={},TRIGFX={};
/* min = banda a partir da qual o gatilho existe; cd = carência do próprio gatilho */
const TRIGDEF={
 noiseup :{min:1,cd:9000},
 erase   :{min:2,cd:14000},
 resource:{min:2,cd:16000},
 tabopen :{min:2,cd:20000},
 idle    :{min:2,cd:40000},
 click   :{min:3,cd:45000}};
/* sem elemento, sem banda, calmo, movimento reduzido ou aba oculta: o motor nem existe.
   (mute NÃO entra: isto é texto na tela, não som — silenciar sussurros não cega a ficha) */
const TRIGON=()=>!!(S.elem&&(TRIG[S.elem]||TRIGFX[S.elem])&&bandOf(S.ruido||0)>=1&&!S.ui.calm&&!RM()&&!document.hidden);
let TG={bound:false,last:-1e9,cd:{},idleT:null,seed:null,act:0};

function fxTrigger(tipo,dados){
 if(!TRIGON())return false;
 const d=TRIGDEF[tipo];if(!d)return false;
 const b=bandOf(S.ruido||0);if(b<d.min)return false;
 /* o efeito visual corre com a carência dele mesmo: a cicatriz aparece mesmo quando a
    frase está em silêncio, senão o gesto ficaria sem resposta nenhuma */
 const fx=TRIGFX[S.elem]&&TRIGFX[S.elem][tipo];if(fx)fx(dados||{},b);
 const lst=TRIG[S.elem]&&TRIG[S.elem][tipo];if(!lst||!lst.length)return false;
 const now=performance.now();
 if(now-TG.last<6000+Math.random()*3000)return false; /* carência geral: uma reação por ~6–9s */
 if(now-(TG.cd[tipo]||-1e9)<d.cd)return false;        /* e cada gatilho tem a sua, mais longa */
 TG.last=now;TG.cd[tipo]=now;
 let tx=pacTx(lst[Math.floor(Math.random()*lst.length)]); /* {nome} */
 if(tx.indexOf("{apagado}")>=0) /* só LÊ o trecho apagado para citá-lo; nunca o devolve ao campo */
  tx=tx.replace(/\{apagado\}/g,(((dados&&dados.txt)||"").trim().slice(0,20))||"aquilo");
 showWhisper(tx,(8+Math.random()*70)+"%",(10+Math.random()*75)+"%");
 return true;}

/* --- atividade do usuário: rearma o ocioso e avisa o elemento (o Germe usa para RECUAR) --- */
function trigAct(){TG.act=performance.now();
 const fx=TRIGFX[S.elem]&&TRIGFX[S.elem].act;if(fx&&TRIGON())fx();
 trigIdleArm();}
function trigIdleArm(){clearTimeout(TG.idleT);TG.idleT=null;
 if(!TG.bound)return;
 /* rearma sozinho: ficar parado mais tempo continua alimentando o gatilho */
 TG.idleT=setTimeout(()=>{TG.idleT=null;if(!document.hidden)fxTrigger("idle",{});trigIdleArm();},25000);}
/* mousemove dispara aos milhares: só conta como atividade a cada 2s */
function trigMove(){if(performance.now()-TG.act<2000)return;trigAct();}
function trigKey(){trigAct();}
function trigDown(e){trigAct();
 const t=e.target&&e.target.closest&&e.target.closest("button");
 if(t)fxTrigger("click",{el:t});}
/* apagou um naco de texto? o motor guarda o valor anterior por campo, em memória volátil */
const _trigVal=new WeakMap();
function trigInput(e){const t=e.target;if(!TXIN(t))return;
 const prev=_trigVal.has(t)?_trigVal.get(t):(t.defaultValue||""),now=t.value||"";
 _trigVal.set(t,now);trigAct();
 if(now.length>=prev.length-6)return; /* corrigir uma letra não é apagar */
 const gone=_apagado(prev,now);
 if(gone.length<6)return;
 fxTrigger("erase",{txt:gone,el:t});}
function trigBind(on){if(on===TG.bound)return;TG.bound=on;
 const m=on?"addEventListener":"removeEventListener";
 document[m]("input",trigInput,{capture:true,passive:true});
 document[m]("pointerdown",trigDown,{capture:true,passive:true});
 document[m]("keydown",trigKey,{capture:true,passive:true});
 document[m]("mousemove",trigMove,{capture:true,passive:true});
 if(on)trigIdleArm();
 else{clearTimeout(TG.idleT);TG.idleT=null;TG.cd={};TG.last=-1e9;}}

/* tabopen, noiseup e resource não precisam de listener: syncFX roda depois de toda mudança
   de estado, então basta comparar o retrato anterior com o de agora. um gatilho por vez. */
function fxTrigSync(){const on=TRIGON();
 trigBind(on);
 const s={el:S.elem||"",b:bandOf(S.ruido||0),tab:(S.ui.tab||"")+(S.ui.sess?"|s":""),
  vida:curOf("vida"),fol:curOf("fol"),sin:curOf("sin"),luc:curOf("luc")};
 const p=TG.seed;TG.seed=s;
 if(!p||p.el!==s.el||!on)return; /* primeira leitura ou troca de elemento: só semeia */
 const rec=["vida","fol","sin","luc"].filter(k=>s[k]!==p[k]);
 /* carregar outra ficha, importar um JSON ou subir de nível mexe em várias coisas de uma vez.
    isso não é uma AÇÃO do jogador sobre a ficha: é outro estado. só semeia, sem reagir. */
 if(rec.length+(s.b!==p.b?1:0)+(s.tab!==p.tab?1:0)>1)return;
 if(s.b>p.b)return void fxTrigger("noiseup",{de:p.b,para:s.b});
 if(s.tab!==p.tab)return void fxTrigger("tabopen",{tab:s.tab});
 if(rec.length){const k=rec[0];
  fxTrigger("resource",{rec:k,dir:s[k]<p[k]?-1:1,de:p[k],para:s[k]});}}

/* ============ BASE COMPARTILHADA DO CLIMA — ClimateEffect ============
   todo elemento de nível alto repete a mesma cerimônia: canvas próprio, cor do tema em
   cache, respeito à zona onde você está, desligamento por calmar/movimento reduzido, um
   passo por frame pendurado no fxTick e um teardown que não deixa timer, pixel nem som.

   isso está escrito UMA vez, aqui. o elemento declara só o que é dele — a geometria, os
   sussurros, os sons, as reações do TRIG — e herda as seis regras de graça:

   1. o canvas é montado, redimensionado e destruído pela base (mount/resize/tear);
   2. a cor do tema sai do _ecCache, nunca de getComputedStyle por frame (climCor);
   3. a zona ativa é sagrada — raio em volta do cursor + retângulo do campo em foco, e
      geometria nenhuma pode cobri-la (climForbPt / climForbBox / climFocusZone);
   4. body.calm e prefers-reduced-motion desligam o elemento inteiro (active);
   5. o passo por frame entra pelo loop único do fxTick — ninguém abre rAF próprio (tickAll);
   6. sair do elemento limpa canvas, timers e decai o áudio (tear + audOff).

   as três funções livres da regra 3 recebem o PORTADOR do estado em vez de usarem `this`:
   assim o Pacto, que ainda está no formato antigo, já consome a mesma regra sem precisar
   virar ClimateEffect antes da hora. */

/* a MediaQueryList é criada uma vez: RM() é consultado a cada frame pelo olho e por todo gate */
const _mqRM=window.matchMedia?matchMedia("(prefers-reduced-motion:reduce)"):null;
const RM=()=>!!(_mqRM&&_mqRM.matches);

/* regra 3 — a zona proibida. o cursor só conta enquanto está vivo (mexeu nos últimos 5s); o
   campo em foco conta sempre. ponto: para a ponta que cresce. caixa: para a forma inteira,
   que não pode encostar nem de canto */
function climForbPt(o,x,y){
 if(performance.now()-o.mt<5000){const dx=x-o.mx,dy=y-o.my;
  if(dx*dx+dy*dy<o.zr*o.zr)return true;}
 const r=o.fz;return !!(r&&x>r.l&&x<r.r&&y>r.t&&y<r.b);}
function climForbBox(o,q){
 if(performance.now()-o.mt<5000){
  const x=Math.max(q.l,Math.min(q.r,o.mx)),y=Math.max(q.t,Math.min(q.b,o.my));
  const dx=x-o.mx,dy=y-o.my;
  if(dx*dx+dy*dy<o.zr*o.zr)return true;}
 const f=o.fz;
 return !!(f&&q.l<f.r&&q.r>f.l&&q.t<f.b&&q.b>f.t);}
/* o retângulo do campo em edição, com folga. custa um getBoundingClientRect: quem chama faz
   isso ~3x por segundo, nunca por frame */
function climFocusZone(pad){const a=document.activeElement;let r=null;
 if(a&&a!==document.body&&a.getBoundingClientRect){const q=a.getBoundingClientRect();
  if(q.width>0&&q.height>0)r={l:q.left-pad,r:q.right+pad,t:q.top-pad,b:q.bottom+pad};}
 return r;}
/* regra 2 — a cor do tema escurecida por k, lida do _ecCache */
function climCor(k,a,fb){fb=fb||"#b8932f";
 const h=(_ecCache||fb).replace("#","");
 const v=h.length===3?h[0]+h[0]+h[1]+h[1]+h[2]+h[2]:h.slice(0,6);
 let n=parseInt(v,16);if(isNaN(n))n=parseInt(fb.replace("#",""),16);
 return `rgba(${Math.round(((n>>16)&255)*k)},${Math.round(((n>>8)&255)*k)},${Math.round((n&255)*k)},${a})`;}

/* o = {id, cv, zr, pad, fb, timers, state, mount, tear, band, step, draw, aud} — só `id`,
   `cv` e os ganchos step/draw são obrigatórios; o resto tem padrão */
class ClimateEffect{
 constructor(o){
  this.h=o;this.id=o.id;this.cvid=o.cv;
  this.zr=o.zr||110;this.pad=o.pad||24;this.fb=o.fb||"#b8932f";
  this.tk=o.timers||[];this.aud=o.aud||null;
  this.cv=null;this.cx=null;this.W=0;this.H=0;this.on=false;this.dirty=false;
  this.mx=-1e4;this.my=-1e4;this.mt=-1e9;this.fz=null;this.fzt=0;this.lt=0;
  Object.assign(this,o.state||{});  /* o estado que é só do elemento mora no mesmo objeto */
  /* o cursor: um listener por elemento, mudo enquanto ele estiver desligado */
  addEventListener("mousemove",e=>{if(!this.on)return;
   this.mx=e.clientX;this.my=e.clientY;this.mt=performance.now();},{passive:true});
  ClimateEffect.all.push(this);}

 /* regra 4 — sem elemento, sem banda, calmo, movimento reduzido ou aba oculta: não existe */
 active(min){return S.elem===this.id&&bandOf(S.ruido||0)>=(min||1)&&!S.ui.calm&&!RM()&&!document.hidden;}
 forb(x,y){return climForbPt(this,x,y);}
 forbBox(q){return climForbBox(this,q);}
 cor(k,a){return climCor(k,a,this.fb);}

 /* regra 1 — o canvas dedicado */
 resize(){const cv=this.cv;if(!cv)return;
  this.W=cv.width=innerWidth;this.H=cv.height=innerHeight;this.dirty=true;}
 mount(){const cv=$(this.cvid);if(!cv||!cv.getContext)return false;
  this.cv=cv;this.cx=cv.getContext("2d");if(!this.cx)return false;this.resize();return true;}
 /* regra 6 — nada sobra: timers, o estado do elemento, o canvas limpo e o som decaindo */
 tear(){for(const k of this.tk){clearTimeout(this[k]);this[k]=null;}
  if(this.h.tear)this.h.tear();
  this.dirty=false;this.fz=null;
  if(this.cx)this.cx.clearRect(0,0,this.W,this.H);
  this.audOff();}

 /* regra 5 — um passo por frame, chamado pelo fxTick. nenhum rAF nasce aqui */
 tick(t){
  if(!this.on||!this.cx)return;
  if(this.cv.width!==innerWidth||this.cv.height!==innerHeight)this.resize();
  const dt=Math.min(60,t-(this.lt||t));this.lt=t;
  if(t-this.fzt>320){this.fzt=t;this.fz=climFocusZone(this.pad);}
  if(this.h.step)this.h.step(dt,t);
  if(this.dirty){this.dirty=false;if(this.h.draw)this.h.draw(this.cx);}}

 /* ligar/desligar: a troca de elemento passa por aqui e só por aqui */
 sync(){const on=this.active(1);
  if(on!==this.on){this.on=on;
   if(on){if(!this.mount()){this.on=false;return;}
    if(this.h.mount)this.h.mount();}
   else this.tear();
   return;}
  if(!on)return;
  if(this.h.band)this.h.band(bandOf(S.ruido||0));}

 /* o áudio: o grafo vive no audBuild; aqui fica só subir o ganho e deixá-lo cair */
 audOff(){const A=this.aud;if(!A)return;
  clearTimeout(AUD[A.timer]);AUD[A.timer]=null;AUD[A.flag]=false;
  if(!AUD.ctx||!AUD[A.gain])return;try{const t=AUD.ctx.currentTime;
   AUD[A.gain].gain.cancelScheduledValues(t);AUD[A.gain].gain.setTargetAtTime(0,t,A.fade);}catch(e){}}
 audSync(want,b){const A=this.aud;if(!A)return;
  if(!want||!AUD.gest)return this.audOff();
  if(!audBuild())return;
  if(AUD.ctx.state==="suspended")AUD.ctx.resume().catch(()=>{});
  try{const t=AUD.ctx.currentTime;AUD[A.gain].gain.cancelScheduledValues(t);
   AUD[A.gain].gain.setTargetAtTime(A.lvl(b),t,A.tc);}catch(e){}
  if(!AUD[A.flag]){AUD[A.flag]=true;AUD[A.timer]=setTimeout(A.tick,A.first());}}
}
ClimateEffect.all=[];
/* o loop único: o fxTick chama isto uma vez por frame e cada elemento ligado dá o seu passo */
ClimateEffect.tickAll=function(t){for(const e of ClimateEffect.all)e.tick(t);};

/* ============ HELPERS DE TEXTO COMPARTILHADOS ============
   o texto MORTO da ficha: rótulos, títulos e dicas que não têm campo dentro e que você não
   está usando agora. o Eco soluça em cima deles; a Observação registra que você os encarou.
   os critérios são os do antigo flashPick — o predicado ficou separado do sorteio porque a
   Observação precisa validar UM elemento (o que está sob o cursor) em vez de sortear entre
   todos, e o que ela quer é justamente o que está sob o cursor. */
const TXSEL=".hx,.panel h2,.hint,label";
function txMorto(el){
 if(!el||!el.isConnected||!el.querySelector)return false;
 if(el.querySelector("input,textarea,select,button"))return false;
 const a=document.activeElement;
 if(a&&a!==document.body&&(el===a||el.contains(a)))return false;
 return !!el.textContent.trim();}
function txPick(){const out=[];
 document.querySelectorAll(TXSEL).forEach(el=>{
  if(!txMorto(el)||el.matches(":hover"))return;
  const r=el.getBoundingClientRect();
  if(r.width<70||r.height<10||r.height>60||r.top<4||r.bottom>innerHeight-4)return;
  out.push([el,r]);});
 return out.length?out[Math.floor(Math.random()*out.length)]:null;}
/* a cor de fundo herdada mais próxima: o Pacto cobre um número de verdade com uma div, e ela
   precisa do mesmo fundo para a troca não ter costura */
function bgOf(el){for(let n=el;n&&n!==document.documentElement;n=n.parentElement){
  const c=getComputedStyle(n).backgroundColor;
  if(c&&c!=="transparent"&&!/^rgba\(\s*0,\s*0,\s*0,\s*0\s*\)$/.test(c))return c;}
 return getComputedStyle(document.body).backgroundColor||"#0f0d0b";}

/* --- a presença: Web Audio, só depois de um gesto do usuário e com o mute desligado ---
   o contexto é compartilhado; cada elemento tem suas próprias vozes, todas em ganho 0 */
let AUD={ctx:null,gain:null,ogain:null,vgain:null,eg:null,agn:null,pgn:null,ggn:null,gest:false,on:false,von:false,eon:false,aon:false,pon:false,gon:false,timer:null,vtimer:null,etimer:null,atimer:null,ptimer:null,gtimer:null};
function audGesture(){if(AUD.gest)return;AUD.gest=true;scopoSync();vazSync();ecoSync();ascSync();pacSync();gerSync();}
["pointerdown","keydown","touchstart"].forEach(ev=>addEventListener(ev,audGesture,{once:true,passive:true}));
function audBuild(){if(AUD.ctx)return true;
 const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;
 try{const c=new AC(),n=Math.floor(c.sampleRate*2),buf=c.createBuffer(1,n,c.sampleRate),ch=buf.getChannelData(0);
  let last=0;for(let i=0;i<n;i++){const wn=Math.random()*2-1;last=(last+.02*wn)/1.02;ch[i]=last*3.2;} /* ruído marrom */
  const src=c.createBufferSource();src.buffer=buf;src.loop=true;
  const f=c.createBiquadFilter();f.type="lowpass";f.frequency.value=240;
  const g=c.createGain();g.gain.value=0;
  src.connect(f);f.connect(g);g.connect(c.destination);src.start();
  const o=c.createOscillator();o.type="sine";o.frequency.value=52;
  const og=c.createGain();og.gain.value=0;o.connect(og);og.connect(c.destination);o.start();
  const vg=c.createGain();vg.gain.value=0;vg.connect(c.destination); /* drone do Vazio */
  for(const hz of [44,44.6]){const v=c.createOscillator();v.type="sine";v.frequency.value=hz;v.connect(vg);v.start();}
  /* zumbido de máquina do Ascensão: 60Hz de rede + harmônico batendo de leve + um grão
     metálico (serra estreitada em 1,85kHz). frio, contínuo, sem calor nenhum */
  const ag=c.createGain();ag.gain.value=0;ag.connect(c.destination);
  const a1=c.createOscillator();a1.type="sine";a1.frequency.value=60;a1.connect(ag);a1.start();
  const a2=c.createOscillator();a2.type="sine";a2.frequency.value=120.3;
  const a2g=c.createGain();a2g.gain.value=.32;a2.connect(a2g);a2g.connect(ag);a2.start();
  const a3=c.createOscillator();a3.type="sawtooth";a3.frequency.value=60;
  const af=c.createBiquadFilter();af.type="bandpass";af.frequency.value=1850;af.Q.value=7;
  /* o 31º harmônico da serra sai fraquíssimo do bandpass, mas 1,85kHz é onde o ouvido é
     sensível: mesmo em .45 ele só arranha o zumbido, nunca chia */
  const a3g=c.createGain();a3g.gain.value=.45;a3.connect(af);af.connect(a3g);a3g.connect(ag);a3.start();
  /* pacto: presença viva do outro lado. um grave orgânico cujo GANHO sobe e desce num LFO de
     0,15Hz — não é drone contínuo, é a cadência de uma respiração pesada e vagarosa */
  const pgn=c.createGain();pgn.gain.value=0;pgn.connect(c.destination);
  const pbr=c.createGain();pbr.gain.value=.5;pbr.connect(pgn); /* .5 ± .46: quase fecha e reabre */
  const p1=c.createOscillator();p1.type="sine";p1.frequency.value=46;p1.connect(pbr);p1.start();
  const p2=c.createOscillator();p2.type="triangle";p2.frequency.value=69.4; /* o corpo, não a nota */
  const p2g=c.createGain();p2g.gain.value=.2;p2.connect(p2g);p2g.connect(pbr);p2.start();
  const plf=c.createOscillator();plf.type="sine";plf.frequency.value=.15; /* ~9 respiros por minuto */
  const plg=c.createGain();plg.gain.value=.46;plf.connect(plg);plg.connect(pbr.gain);plf.start();
  /* germe: TERRA MOLHADA + VENTO DISTANTE. nada de percussivo — duas camadas de ruído que
     respiram em ritmos de propósito incomensuráveis (.07 / .045 / .021 Hz), então o ambiente
     nunca repete um ciclo audível: é orgânico, úmido e vivo sem nunca virar padrão */
  const gg=c.createGain();gg.gain.value=0;gg.connect(c.destination);
  /* 1) a terra: ruído marrom num passa-baixa RESSONANTE cujo corte vagueia devagar —
     é o que separa "algo mole se remexendo lá embaixo" de um chiado parado */
  const gsrc=c.createBufferSource();gsrc.buffer=buf;gsrc.loop=true;
  const gf=c.createBiquadFilter();gf.type="lowpass";gf.frequency.value=138;gf.Q.value=7;
  gsrc.connect(gf);gf.connect(gg);gsrc.start();
  const glf=c.createOscillator();glf.type="sine";glf.frequency.value=.07;
  const glg=c.createGain();glg.gain.value=66;glf.connect(glg);glg.connect(gf.frequency);glf.start();
  /* 2) o vento: ruído branco num passa-banda que VARRE devagar (.021Hz = uma passagem a cada
     ~48s), com o volume indo e voltando num LFO diferente. rajada que chega, passa pelas
     folhas e vai embora. o ganho fica em .3 ± .28: entre rajadas quase silencia */
  const wbuf=c.createBuffer(1,n,c.sampleRate),wch=wbuf.getChannelData(0);
  for(let i=0;i<n;i++)wch[i]=(Math.random()*2-1)*.5;
  const wsrc=c.createBufferSource();wsrc.buffer=wbuf;wsrc.loop=true;
  const wf=c.createBiquadFilter();wf.type="bandpass";wf.frequency.value=540;wf.Q.value=.85;
  const wgn=c.createGain();wgn.gain.value=.3;
  wsrc.connect(wf);wf.connect(wgn);wgn.connect(gg);wsrc.start();
  const wlf=c.createOscillator();wlf.type="sine";wlf.frequency.value=.045;
  const wlg=c.createGain();wlg.gain.value=.28;wlf.connect(wlg);wlg.connect(wgn.gain);wlf.start();
  const wsw=c.createOscillator();wsw.type="sine";wsw.frequency.value=.021;
  const wswg=c.createGain();wswg.gain.value=320;wsw.connect(wswg);wswg.connect(wf.frequency);wsw.start();
  AUD.ctx=c;AUD.gain=g;AUD.ogain=og;AUD.vgain=vg;AUD.agn=ag;AUD.pgn=pgn;AUD.ggn=gg;return true;}catch(e){return false;}}
function audOff(){clearTimeout(AUD.timer);AUD.timer=null;AUD.on=false;_obsAperto=0;
 if(!AUD.ctx)return;try{const t=AUD.ctx.currentTime;
  for(const g of [AUD.gain.gain,AUD.ogain.gain]){g.cancelScheduledValues(t);g.setTargetAtTime(0,t,.4);}}catch(e){}}
/* O APERTO: durante um tempo depois do ócio, a respiração fica mais funda e mais curta — quem
   está do outro lado chegou mais perto. o relógio é do Observação (obsAperta) */
let _obsAperto=0;
function audBreath(){if(!AUD.on||!AUD.ctx)return;
 const b=bandOf(S.ruido||0),t=AUD.ctx.currentTime,ap=performance.now()<_obsAperto;
 const pico=(b>=5?.02:.012)*(ap?1.5:1);
 try{const g=AUD.gain.gain;g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);
  g.linearRampToValueAtTime(pico,t+(ap?1.9:3.2));g.linearRampToValueAtTime(0,t+(ap?5.4:8));}catch(e){}
 AUD.timer=setTimeout(audBreath,((ap?5:9)+Math.random()*(ap?6:11))*1000);}
function audSync(want,b){
 if(!want||!AUD.gest)return audOff();
 if(!audBuild())return;
 if(AUD.ctx.state==="suspended")AUD.ctx.resume().catch(()=>{});
 try{AUD.ogain.gain.setTargetAtTime(b>=5?.006:0,AUD.ctx.currentTime,2);}catch(e){}
 if(!AUD.on){AUD.on=true;audBreath();}}

/* ============ ESCOPOFOBIA — elemento Observação ============
   o Vazio SUBTRAI, o Germe INVADE. a Observação faz uma coisa só, e é a mais simples de todas:
   ela OLHA. o piloto antigo pedia desculpa por isso — um borrão CSS a 12% de opacidade, quase
   invisível de propósito. agora o olho é o PROTAGONISTA, geometria de verdade em canvas
   próprio, em cinco camadas:

   1. O OLHO         — esclera em amêndoa, íris com fibras e limbo, pupila que DILATA quando ele
      para para encarar e contrai quando você se mexe, vasos vermelhos a partir da banda 4. o
      corpo dele persegue o cursor com atraso e nunca alcança (fica na periferia do seu olhar);
      a íris, essa mira você direto — o corpo chega atrasado, o olhar não.
      e, se você ficar 4s parado, ele se centraliza e ENCARA.
   2. O REGISTRO     — quanto tempo você deixou o cursor parado em cima do mesmo texto morto.
      passando de ~900ms, os cantos daquele retângulo ganham uma mira de câmera que aparece
      depressa e apaga devagar: o rastro de "isto foi visto". vários coexistem, cada um no seu
      tempo. e enquanto o retângulo cair na sua zona ativa ele NÃO é desenhado nem envelhece —
      o registro só se revela depois que você sai de cima, que é quando ele assusta.
   3. SER VISTO DE VOLTA — só por gatilho (TRIG.obs), nunca por timer solto: a borda do que você
      acabou de clicar pisca de volta para você.
   4. O VIDRO        — um glint diagonal atravessa a tela uma vez. raro, sutil, maior nas bandas
      altas: lembra que existe uma superfície entre você e a ficha, e que ela tem um lado de lá.
   5. O PISCAR       — banda 5, carência de 90 a 180s: a tela inteira fecha e abre em ~120ms,
      como uma pálpebra. nunca com modal aberto, nunca durante edição de campo.

   e o CENTRO DO PALCO costura tudo: de vez em quando (e SEMPRE quando você fica ocioso) o olho
   migra da periferia para o meio da tela e cresce. se a zona sagrada estiver bem ali, ele não
   desiste — muda para o quadrante mais livre. voltar a se mexer o faz recuar depressa.

   o gate é a regra 4 da base; o canvas, o cursor, a zona proibida, o loop e o teardown também.
   nada aqui toca S, nem .value, nem innerHTML: canvas pointer-events:none e uma classe. */
const obsModal=()=>$("modal").classList.contains("on");
/* digitando AGORA: nem a pálpebra nem o centro do palco atropelam quem está escrevendo */
const obsDigita=()=>{const a=document.activeElement;return !!(a&&TXIN(a));};

const OEYE=[0,.085,.10,.12,.145,.17];    /* meia-largura do olho em fração de min(W,H), por banda */
const OALF=[0,.42,.55,.7,.86,1];         /* e o quanto ele se deixa ver por dentro */
const OREG=6;                            /* registros simultâneos */

const OBS=new ClimateEffect({id:"obs",cv:"fx-eye",zr:110,pad:24,
 state:{ex:0,ey:0,r:0,r0:0,pup:.4,lid:1,bl:-1,seed:Math.random()*97,init:false,
  stg:0,stgx:0,stgy:0,stgf:0,stgL:-1e9,       /* o centro do palco */
  regs:[],hEl:null,hAcc:0,hT:0,               /* o registro */
  fls:[],gl:null,glL:-1e9,                    /* o flash e o vidro */
  lidP:0,lidD:120,lidN:-1,lidOn:false},       /* a pálpebra do ápice */
 mount(){OBS.init=false;OBS.lidN=-1;},
 tear(){OBS.regs.length=0;OBS.fls.length=0;OBS.gl=null;
  OBS.hEl=null;OBS.hAcc=0;OBS.stg=0;OBS.stgf=0;OBS.bl=-1;OBS.lid=1;
  OBS.lidP=0;obsLidOff();},
 /* a banda caiu: o que só existia lá em cima some junto */
 band(b){if(b<5&&(OBS.lidOn||OBS.lidP>0)){OBS.lidP=0;obsLidOff();OBS.dirty=true;}
  if(b<2&&OBS.gl){OBS.gl=null;OBS.dirty=true;}},
 step:obsStep,draw:obsDraw});

/* ---------- o passo por frame ---------- */
function obsStep(dt,t){
 const b=bandOf(S.ruido||0);
 OBS.r0=Math.min(OBS.W,OBS.H)*OEYE[b];
 if(!OBS.init){OBS.init=true;OBS.ex=OBS.W*.5;OBS.ey=OBS.H*.45;OBS.r=OBS.r0*.55;OBS.dirty=true;}
 /* enquanto a pálpebra corre ela é a ÚNICA coisa na tela: piscar é não ver nada */
 if(OBS.lidP>0){OBS.lidP+=dt;OBS.dirty=true;
  if(OBS.lidP>=OBS.lidD){OBS.lidP=0;obsLidOff();}
  return;}
 if(OBS.lidOn)obsLidOff();   /* a tela nunca fica presa fechada: sem fase, sem pálpebra */
 obsLidTenta(t,b);
 const parado=t-OBS.mt>4000;
 obsStgStep(dt,t,b,parado);
 obsOlhoStep(dt,t,parado);
 obsRegStep(dt,t,b);
 obsFlsStep(dt);
 obsGlintStep(dt,b);}

/* ---------- camada 1: O OLHO ---------- */
/* a distância mínima do CENTRO do olho ao cursor para a caixa inteira ficar fora da zona: zr
   mais a diagonal até o canto dela. usar só a meia-largura deixaria o canto entrar na zona
   quando o cursor viesse na diagonal — que é metade das aproximações */
const obsRaio=()=>OBS.zr+Math.hypot(OBS.r,OBS.r*.6);
/* o alvo do CORPO. ele persegue, mas nunca chega: o ponto que ele busca é o cursor empurrado
   para longe do miolo da tela, a uma distância que já garante a zona sagrada por construção.
   é isso que o mantém na periferia do seu olhar */
function obsAlvo(){const W=OBS.W,H=OBS.H;
 let dx=OBS.mx-W*.5,dy=OBS.my-H*.5;
 let l=Math.hypot(dx,dy);
 if(l<1){dx=0;dy=-1;l=1;}
 const d=obsRaio()*1.03;
 const x=Math.max(-OBS.r*.35,Math.min(W+OBS.r*.35,OBS.mx+dx/l*d));
 const y=Math.max(-OBS.r*.3,Math.min(H+OBS.r*.3,OBS.my+dy/l*d));
 return [x,y];}
/* a rede da regra 3, e ela NÃO amortece: você pode pular com o mouse para cima dele, e o campo
   em foco pode nascer embaixo dele — nos dois casos a caixa é projetada para fora no mesmo
   frame. empurrão suave aqui seria uma exceção, e a regra 3 não tem exceção. o ângulo é
   preservado nos dois empurrões, então ele desliza para fora em vez de saltar para longe */
function obsFuga(){
 const R=OBS.r,ry=R*.6;let m=false;
 for(let k=0;k<3;k++){let bateu=false;
  /* o cursor vivo é um círculo: o centro sai para o raio mínimo que já garante a caixa inteira */
  if(performance.now()-OBS.mt<5000&&OBS.mx>-1e3){const min=obsRaio();
   let dx=OBS.ex-OBS.mx,dy=OBS.ey-OBS.my,l=Math.hypot(dx,dy);
   if(l<min){if(l<1){dx=0;dy=-1;l=1;}
    OBS.ex=OBS.mx+dx/l*min;OBS.ey=OBS.my+dy/l*min;bateu=true;}}
  /* o campo em foco é retângulo: ele sai pelo lado mais perto, que é o menor deslocamento
     que resolve a sobreposição */
  const f=OBS.fz;
  if(f&&OBS.ex-R<f.r&&OBS.ex+R>f.l&&OBS.ey-ry<f.b&&OBS.ey+ry>f.t){
   const e=[f.l-(OBS.ex+R),f.r-(OBS.ex-R),f.t-(OBS.ey+ry),f.b-(OBS.ey-ry)];
   let i=0;for(let j=1;j<4;j++)if(Math.abs(e[j])<Math.abs(e[i]))i=j;
   if(i<2)OBS.ex+=e[i];else OBS.ey+=e[i];
   bateu=true;}
  if(!bateu)break;
  m=true;}
 return m;}
function obsOlhoStep(dt,t,parado){
 let gx,gy,k,tr;
 if(OBS.stg>0&&!OBS.stgf){gx=OBS.stgx;gy=OBS.stgy;k=.0011;tr=OBS.r0*1.85;} /* centro do palco */
 else if(OBS.stgf){const a=obsAlvo();gx=a[0];gy=a[1];k=.0034;tr=OBS.r0;}   /* você voltou: recua */
 else if(parado){gx=OBS.W*.5;gy=OBS.H*.45;k=.00036;tr=OBS.r0*1.14;}        /* encara de frente */
 else{const a=obsAlvo();gx=a[0];gy=a[1];k=.00168;tr=OBS.r0;}
 const kk=Math.min(1,k*dt);
 const nx=OBS.ex+(gx-OBS.ex)*kk,ny=OBS.ey+(gy-OBS.ey)*kk;
 const nr=OBS.r+(tr-OBS.r)*Math.min(1,(OBS.stgf?.0022:.0011)*dt);
 if(Math.abs(nx-OBS.ex)>.12||Math.abs(ny-OBS.ey)>.12||Math.abs(nr-OBS.r)>.06)OBS.dirty=true;
 OBS.ex=nx;OBS.ey=ny;OBS.r=nr;
 if(obsFuga())OBS.dirty=true;
 /* a pupila: aberta quando ele encara, fechada quando você se mexe. é o detalhe que mais
    denuncia atenção num olho de verdade, e custa um lerp */
 const pt=OBS.stg>0&&!OBS.stgf?1:(parado?.85:.3);
 const np=OBS.pup+(pt-OBS.pup)*Math.min(1,.0009*dt);
 /* o limiar é só da repintura: se ele também travasse a ATRIBUIÇÃO, a pupila parava a meio
    caminho para sempre — o passo fica menor que o limiar antes de a dilatação terminar */
 if(Math.abs(np-OBS.pup)>.002)OBS.dirty=true;
 OBS.pup=np;
 /* a piscada dele mesmo (gatilho resource): fecha e abre em ~210ms */
 if(OBS.bl>=0){OBS.bl+=dt;const p=OBS.bl/210;
  if(p>=1){OBS.bl=-1;OBS.lid=1;}else OBS.lid=Math.abs(Math.cos(p*Math.PI));
  OBS.dirty=true;}}

/* os vasos: nascem nos cantos da amêndoa e correm para dentro. o traçado sai do seed do olho,
   não do acaso do frame — senão eles piscariam a cada repintura */
function obsVasos(c,x,y,R,ry,A,b){const n=b>=5?6:3;
 c.lineWidth=Math.max(.5,R*.008);
 for(let i=0;i<n;i++){const s=OBS.seed+i*3.7,ld=i%2?1:-1;
  let px=x+ld*R*.95,py=y+Math.sin(s*1.9)*ry*.45;
  c.strokeStyle=`rgba(152,44,36,${Math.min(1,(.15+.12*(Math.sin(s*2.3)*.5+.5))*A).toFixed(3)})`;
  c.beginPath();c.moveTo(px,py);
  for(let k=1;k<=4;k++){px-=ld*R*.16;py+=Math.sin(s+k*1.7)*ry*.19;c.lineTo(px,py);}
  c.stroke();}}
/* a amêndoa em duas quadráticas, e tudo o que é do olho recortado por ela. as paradas de cor
   vêm do gradiente antigo (preto → --ecd → --ec → preto → transparente), mas em anéis com
   borda em vez de borrão: é a definição que faz isto virar OLHO em vez de mancha */
function obsOlhoDraw(c){
 const b=bandOf(S.ruido||0),R=OBS.r,ry=R*.58*OBS.lid;
 if(R<6||ry<1.2)return;
 const x=OBS.ex,y=OBS.ey,A=Math.min(1,OALF[b]*(OBS.stg>0&&!OBS.stgf?1.12:1));
 if(A<=.01)return;
 c.save();
 c.beginPath();
 c.moveTo(x-R,y);c.quadraticCurveTo(x,y-ry*2.06,x+R,y);
 c.quadraticCurveTo(x,y+ry*2.06,x-R,y);c.closePath();
 const sg=c.createRadialGradient(x,y,R*.08,x,y,R);
 sg.addColorStop(0,OBS.cor(.26,Math.min(1,.5*A)));       /* a esclera não é branca: é o pouco */
 sg.addColorStop(.55,OBS.cor(.17,Math.min(1,.34*A)));    /* de luz que sobra numa sala escura */
 sg.addColorStop(1,OBS.cor(.06,Math.min(1,.1*A)));       /* e ela não pode brilhar mais que a
                                                            íris, senão o olho vira mancha */
 c.fillStyle=sg;c.fill();
 c.save();c.clip();
 if(b>=4)obsVasos(c,x,y,R,ry,A,b);
 /* a íris se desloca DENTRO da esclera na direção do cursor: o corpo do olho chega atrasado,
    mas o olhar já está em você. parado há muito tempo, ela volta ao centro e encara */
 let gx=OBS.mx,gy=OBS.my;
 if(performance.now()-OBS.mt>4000||gx<0){gx=OBS.W*.5;gy=OBS.H*.5;}
 let ox=gx-x,oy=gy-y;const ol=Math.hypot(ox,oy)||1,om=Math.min(1,ol/(R*3));
 ox=ox/ol*om*R*.26;oy=oy/ol*om*ry*.34;
 const ir=Math.min(R*.46,ry*.86),ix=x+ox,iy=y+oy,pr=ir*(.2+.3*OBS.pup);
 const ig=c.createRadialGradient(ix,iy,ir*.12,ix,iy,ir);
 ig.addColorStop(0,OBS.cor(.5,Math.min(1,.8*A)));
 ig.addColorStop(.34,OBS.cor(.82,Math.min(1,.9*A)));
 ig.addColorStop(.62,OBS.cor(1,Math.min(1,.95*A)));
 ig.addColorStop(.86,OBS.cor(.4,Math.min(1,.9*A)));
 ig.addColorStop(1,OBS.cor(.11,Math.min(1,.95*A)));
 c.fillStyle=ig;c.beginPath();c.arc(ix,iy,ir,0,6.2832);c.fill();
 /* as fibras: 46 raios de comprimento e brilho irregulares. é o que separa íris de bolinha */
 c.lineWidth=Math.max(.6,ir*.035);
 for(let i=0;i<46;i++){const a=i/46*6.2832,f=.62+.3*(Math.sin(OBS.seed+i*2.4)*.5+.5);
  c.strokeStyle=OBS.cor(.9,Math.min(1,(.1+.15*(Math.sin(OBS.seed*1.7+i*1.13)*.5+.5))*A));
  c.beginPath();
  c.moveTo(ix+Math.cos(a)*pr*1.02,iy+Math.sin(a)*pr*1.02);
  c.lineTo(ix+Math.cos(a)*ir*f,iy+Math.sin(a)*ir*f);c.stroke();}
 c.strokeStyle=OBS.cor(.1,Math.min(1,.85*A));c.lineWidth=Math.max(1,ir*.09);
 c.beginPath();c.arc(ix,iy,ir*.96,0,6.2832);c.stroke();     /* o limbo fecha a íris */
 c.fillStyle=`rgba(0,0,0,${Math.min(1,.94*A).toFixed(3)})`; /* a pupila é buraco, não cor */
 c.beginPath();c.arc(ix,iy,pr,0,6.2832);c.fill();
 c.fillStyle=`rgba(255,250,232,${Math.min(1,.3*A).toFixed(3)})`;
 c.beginPath();c.ellipse(ix-ir*.3,iy-ir*.34,ir*.15,ir*.11,-.5,0,6.2832);c.fill(); /* molhado */
 c.restore();
 /* a linha da pálpebra fechando a amêndoa. é ELA que faz a silhueta de olho aparecer por trás
    dos painéis: sem contorno, o que sobra num vão de 20px é um borrão dourado */
 c.lineWidth=Math.max(1,R*.017);
 c.strokeStyle=OBS.cor(.7,Math.min(1,.72*A));
 c.beginPath();c.moveTo(x-R,y);c.quadraticCurveTo(x,y-ry*2.06,x+R,y);c.stroke();
 c.strokeStyle=OBS.cor(.52,Math.min(1,.55*A));
 c.beginPath();c.moveTo(x-R,y);c.quadraticCurveTo(x,y+ry*2.06,x+R,y);c.stroke();
 /* e a prega da pálpebra de cima, um traço acima e mais fraco: é o que dá PÁLPEBRA em vez de
    lente, e é de graça — mais uma quadrática */
 c.strokeStyle=OBS.cor(.34,Math.min(1,.3*A));c.lineWidth=Math.max(.7,R*.009);
 c.beginPath();c.moveTo(x-R*.86,y-ry*.24);
 c.quadraticCurveTo(x,y-ry*2.5,x+R*.86,y-ry*.24);c.stroke();
 c.restore();}

/* ---------- camada 2: O REGISTRO ---------- */
/* quem está sob o cursor? um elementFromPoint a cada ~190ms — nunca por frame. passando de
   900ms no mesmo texto morto, aquilo fica REGISTRADO */
function obsRegStep(dt,t,b){
 if(t-OBS.hT>190){OBS.hT=t;
  let el=null;
  if(t-OBS.mt<5000&&OBS.mx>=0&&OBS.my>=0){
   const n=document.elementFromPoint(OBS.mx,OBS.my),cd=n&&n.closest&&n.closest(TXSEL);
   if(cd&&txMorto(cd))el=cd;}
  if(el!==OBS.hEl){OBS.hEl=el;OBS.hAcc=0;}
  else if(el&&OBS.hAcc>=0){OBS.hAcc+=190;
   if(OBS.hAcc>=900){OBS.hAcc=-1;obsReg(el);}}
  /* a ficha rerenderiza e rola: os retângulos são reconferidos no mesmo relógio */
  for(let i=OBS.regs.length-1;i>=0;i--){const g=OBS.regs[i];
   if(!g.el.isConnected){OBS.regs.splice(i,1);OBS.dirty=true;continue;}
   const r=g.el.getBoundingClientRect();
   const blk=r.width<8||r.bottom<2||r.top>OBS.H-2||
    OBS.forbBox({l:r.left,r:r.right,t:r.top,b:r.bottom});
   if(!blk){g.q.l=r.left;g.q.r=r.right;g.q.t=r.top;g.q.b=r.bottom;}
   if(blk!==g.blk){g.blk=blk;OBS.dirty=true;}}}
 for(let i=OBS.regs.length-1;i>=0;i--){const g=OBS.regs[i];
  /* na zona sagrada ele não é desenhado NEM envelhece: o "isto foi visto" espera você sair de
     cima. mas não espera para sempre — quatorze segundos abafado e o rastro se perde */
  if(g.blk){g.wait+=dt;if(g.wait>14000){OBS.regs.splice(i,1);OBS.dirty=true;}continue;}
  if(g.t<1){g.t=Math.min(1,g.t+dt/220);OBS.dirty=true;}   /* aparece depressa */
  else{g.a-=dt/g.life;OBS.dirty=true;                     /* e apaga bem devagar */
   if(g.a<=0){OBS.regs.splice(i,1);}}}}
function obsReg(el){
 if(!OBS.on||!el||!el.isConnected||!el.getBoundingClientRect)return;
 for(const g of OBS.regs)if(g.el===el)return;
 const r=el.getBoundingClientRect();
 if(r.width<40||r.height<9||r.height>90||r.top<4||r.bottom>innerHeight-4)return;
 const b=bandOf(S.ruido||0);
 OBS.regs.push({el,q:{l:r.left,r:r.right,t:r.top,b:r.bottom},t:0,a:1,wait:0,blk:true,
  life:5000+b*1400+Math.random()*3000});
 while(OBS.regs.length>OREG)OBS.regs.shift();
 OBS.dirty=true;}
/* a mira: só os cantos, como visor de câmera. o retângulo inteiro seria moldura; o canto é
   enquadramento, e enquadramento é alguém decidindo o que olhar */
function obsRegDraw(c,g){
 const q=g.q,L=Math.min(18,(q.r-q.l)*.28,(q.b-q.t)*1.2)*g.t;
 if(L<1.5)return;
 const P=3,l=q.l-P,r=q.r+P,tp=q.t-P,bt=q.b+P;
 c.strokeStyle=OBS.cor(1,Math.min(1,.38*g.a));c.lineWidth=1;
 c.beginPath();
 c.moveTo(l,tp+L);c.lineTo(l,tp);c.lineTo(l+L,tp);
 c.moveTo(r-L,tp);c.lineTo(r,tp);c.lineTo(r,tp+L);
 c.moveTo(l,bt-L);c.lineTo(l,bt);c.lineTo(l+L,bt);
 c.moveTo(r-L,bt);c.lineTo(r,bt);c.lineTo(r,bt-L);
 c.stroke();}

/* ---------- camada 3: SER VISTO DE VOLTA ---------- */
/* você clicou; a borda daquilo pisca de volta. nunca por cima de quem está digitando ali */
function obsFlash(d){
 if(!OBS.on||obsModal())return;
 const el=d&&d.el;
 if(!el||!el.isConnected||!el.getBoundingClientRect)return;
 if(el===document.activeElement&&TXIN(el))return;
 if(obsDigita())return;
 const r=el.getBoundingClientRect();
 if(r.width<10||r.height<6||r.bottom<2||r.top>innerHeight-2)return;
 OBS.fls.push({q:{l:r.left,r:r.right,t:r.top,b:r.bottom},t:0});
 while(OBS.fls.length>3)OBS.fls.shift();
 OBS.dirty=true;}
function obsFlsStep(dt){
 for(let i=OBS.fls.length-1;i>=0;i--){const f=OBS.fls[i];
  f.t+=dt/300;OBS.dirty=true;
  if(f.t>=1)OBS.fls.splice(i,1);}}
function obsFlsDraw(c,f){
 const a=Math.sin(Math.PI*Math.min(1,f.t));if(a<=.02)return;
 const q=f.q,w=q.r-q.l,h=q.b-q.t;
 c.strokeStyle=OBS.cor(1,Math.min(1,.6*a));c.lineWidth=1.4;
 c.strokeRect(q.l-1.5,q.t-1.5,w+3,h+3);
 c.strokeStyle=OBS.cor(.75,Math.min(1,.18*a));c.lineWidth=4;
 c.strokeRect(q.l-3.5,q.t-3.5,w+7,h+7);}

/* ---------- camada 4: O VIDRO ---------- */
/* uma faixa de brilho atravessa a tela UMA vez. é o reflexo de uma superfície que está entre
   você e a ficha — e que portanto tem um lado de lá */
function obsGlint(){
 if(!OBS.on||OBS.gl)return;
 const b=bandOf(S.ruido||0),now=performance.now();
 if(now-OBS.glL<45000)return;
 OBS.glL=now;
 OBS.gl={p:0,dur:1500+Math.random()*900,ang:-1.0+Math.random()*.45,
  w:Math.min(OBS.W,OBS.H)*(.1+b*.035),a:.05+b*.02};
 OBS.dirty=true;}
function obsGlintStep(dt,b){
 if(OBS.gl){OBS.gl.p+=dt/OBS.gl.dur;OBS.dirty=true;if(OBS.gl.p>=1)OBS.gl=null;return;}
 if(b<2)return;
 if(Math.random()<(b>=4?.0000035:.0000012)*dt)obsGlint();}
function obsGlintDraw(c){
 const G=OBS.gl,W=OBS.W,H=OBS.H,D=Math.hypot(W,H),a=G.a*Math.sin(Math.PI*G.p);
 c.save();c.translate(W*.5,H*.5);c.rotate(G.ang);
 const x=(G.p*2-1)*D*.62;
 const g=c.createLinearGradient(x-G.w,0,x+G.w,0);
 g.addColorStop(0,OBS.cor(1,0));
 g.addColorStop(.42,OBS.cor(1,Math.min(1,a*.45)));
 g.addColorStop(.5,OBS.cor(1,Math.min(1,a)));
 g.addColorStop(.58,OBS.cor(1,Math.min(1,a*.45)));
 g.addColorStop(1,OBS.cor(1,0));
 c.fillStyle=g;c.fillRect(-D,-D,D*2,D*2);
 c.restore();}
/* a faixa varre a tela INTEIRA, e a regra 3 não abre exceção para luz. as outras camadas
   evitam a zona por geometria; nesta o furo é feito a bisturi, logo depois do vidro e antes
   de qualquer outra coisa entrar no canvas */
function obsFuro(c){
 const f=OBS.fz,viva=performance.now()-OBS.mt<5000&&OBS.mx>-1e3;
 if(!f&&!viva)return;
 c.save();c.globalCompositeOperation="destination-out";
 if(viva){const R=OBS.zr*1.3;
  const g=c.createRadialGradient(OBS.mx,OBS.my,OBS.zr*.5,OBS.mx,OBS.my,R);
  g.addColorStop(0,"rgba(0,0,0,1)");g.addColorStop(1,"rgba(0,0,0,0)");
  c.fillStyle=g;c.beginPath();c.arc(OBS.mx,OBS.my,R,0,6.2832);c.fill();}
 if(f){c.fillStyle="rgba(0,0,0,1)";c.fillRect(f.l,f.t,f.r-f.l,f.b-f.t);}
 c.restore();}

/* ---------- camada 5: O PISCAR ---------- */
/* só no ápice, e raro. a classe sobe o canvas acima da ficha inteira por ~120ms — é o único
   momento em que este elemento fica na frente de alguma coisa, e ele devolve na hora */
function obsLidOff(){if(OBS.lidOn){OBS.lidOn=false;document.body.classList.remove("obs-lid");}}
function obsLidTenta(t,b){
 if(b<5||OBS.lidP>0)return;
 if(OBS.lidN<0){OBS.lidN=t+(90+Math.random()*90)*1000;return;}
 if(t<OBS.lidN)return;
 /* modal aberto ou campo em edição: ADIA, não cancela. a pálpebra espera a hora dela */
 if(obsModal()||obsDigita()||document.hidden){OBS.lidN=t+12000;return;}
 OBS.lidN=t+(90+Math.random()*90)*1000;
 OBS.lidD=90+Math.random()*60;OBS.lidP=.001;
 OBS.lidOn=true;document.body.classList.add("obs-lid");OBS.dirty=true;}

/* ---------- o centro do palco ---------- */
/* distância de um ponto à caixa — NEGATIVA (a profundidade) quando ele está dentro dela */
function obsDist(q,x,y){
 const dx=Math.max(q.l-x,0,x-q.r),dy=Math.max(q.t-y,0,y-q.b);
 if(dx>0||dy>0)return Math.hypot(dx,dy);
 return -Math.min(x-q.l,q.r-x,y-q.t,q.b-y);}
/* o quão livre é este ponto: a folga da CAIXA do olho até o cursor vivo e até o campo em foco.
   a conta continua valendo quando ela fica negativa, e é justamente isso que ainda ordena os
   quadrantes quando o olho de palco é grande demais para caber em qualquer canto sem encostar */
function obsLivre(x,y,R){
 const q={l:x-R,r:x+R,t:y-R*.6,b:y+R*.6};let d=1e9;
 if(performance.now()-OBS.mt<5000&&OBS.mx>-1e3)d=Math.min(d,obsDist(q,OBS.mx,OBS.my)-OBS.zr);
 const f=OBS.fz;
 if(f)d=Math.min(d,obsDist(q,(f.l+f.r)*.5,(f.t+f.b)*.5)-Math.max(f.r-f.l,f.b-f.t)*.5);
 return d;}
function obsPalco(){
 if(!OBS.on||obsModal()||obsDigita())return;
 const W=OBS.W,H=OBS.H,R=OBS.r0*1.85;
 let x=W*.5,y=H*.45;
 if(OBS.forbBox({l:x-R,r:x+R,t:y-R*.6,b:y+R*.6})){
  /* a zona sagrada está bem no meio: ele NÃO desiste de aparecer — muda de quadrante */
  const q=[[W*.26,H*.28],[W*.74,H*.28],[W*.26,H*.72],[W*.74,H*.72]];
  let bs=-1e9;   /* a folga pode ser negativa e ainda ser a MELHOR: ele muda de canto de todo jeito */
  for(const p of q){const s=obsLivre(p[0],p[1],R);if(s>bs){bs=s;x=p[0];y=p[1];}}}
 OBS.stgx=x;OBS.stgy=y;OBS.stg=4200+Math.random()*3200;OBS.stgf=0;
 OBS.stgL=performance.now();OBS.dirty=true;}
function obsStgStep(dt,t,b,parado){
 if(OBS.stg>0){OBS.stg-=dt*(OBS.stgf?3.5:1);
  if(OBS.stg<=0){OBS.stg=0;OBS.stgf=0;}
  OBS.dirty=true;return;}
 if(b<3||!parado||t-OBS.stgL<70000)return;
 if(Math.random()<(b>=4?.00001:.000003)*dt)obsPalco();}

/* ---------- as reações às SUAS ações ---------- */
/* parou: ele vem te encarar de frente, e a respiração aperta. o ócio é o convite principal do
   centro do palco — narrativamente é o gancho inteiro: você parou, então dá para olhar direito */
function obsIdle(){if(!OBS.on)return;OBS.stgL=-1e9;obsPalco();obsAperta();}
function obsAperta(){_obsAperto=performance.now()+26000;
 if(!AUD.on||!AUD.ctx)return;
 clearTimeout(AUD.timer);AUD.timer=setTimeout(audBreath,700+Math.random()*900);}
/* voltou a mexer: se ele estava no centro do palco, recua depressa — a presença dele é
   interrompida pela sua atenção voltando */
function obsAct(){if(OBS.stg>0&&!OBS.stgf){OBS.stgf=1;OBS.dirty=true;}}
/* apagou: um registro se forma sobre o campo, como se ele tivesse visto o gesto. o campo está
   em foco, então a mira só se revela quando você sair dele — e é aí que ela pega você */
function obsRegErase(d){if(!OBS.on)return;const t=d&&d.el;if(t)obsReg(t);}
/* gastou recurso: ele pisca UMA vez. não é a tela — é a pálpebra dele, e você não tem como
   provar que viu */
function obsPisca(){if(!OBS.on)return;if(OBS.bl<0){OBS.bl=0;OBS.dirty=true;}}
/* o Ruído subiu: o vidro entre vocês pega a luz. sem esperar a carência */
function obsSurto(){if(!OBS.on)return;OBS.glL=-1e9;obsGlint();}

/* as frases: o tom vai do impessoal (um registro sendo feito) ao íntimo (alguém que já sabe
   o que você fez). o motor cuida da carência e das substituições de {nome}/{apagado} */
TRIG.obs={
 idle:["parou de se mexer. agora dá para olhar direito.","eu esperei você parar",
  "não precisa se virar. eu já sei onde você está.","você sente, não sente?"],
 erase:["eu vi você apagar {apagado}","ficou registrado antes","apagar não desfaz o que eu vi",
  "{apagado} — anotado quando ainda estava aí"],
 resource:["anotado","continue. estou anotando.","isso também entra no seu arquivo",
  "eu vi você fazer aquilo"],
 click:["vi onde você clicou","essa foi você","cada dedo seu deixa marca"],
 tabopen:["te sigo de página em página","aqui também estou olhando","não adianta virar a folha"],
 noiseup:["agora estou mais perto da tela","está mais fácil te ver",
  "estou olhando através da tela"]};
/* e os efeitos dos mesmos gatilhos: act = "o usuário voltou a mexer" */
TRIGFX.obs={idle:obsIdle,act:obsAct,erase:obsRegErase,resource:obsPisca,
 click:obsFlash,noiseup:obsSurto};

/* ---------- a repintura ---------- */
function obsDraw(c){
 c.clearRect(0,0,OBS.W,OBS.H);
 if(OBS.lidOn){ /* a pálpebra: alpha sobe e cai em poucos frames, e nada mais existe */
  const p=Math.min(1,OBS.lidP/OBS.lidD);
  c.fillStyle=`rgba(0,0,0,${Math.sin(Math.PI*p).toFixed(3)})`;
  c.fillRect(0,0,OBS.W,OBS.H);return;}
 if(OBS.gl){obsGlintDraw(c);obsFuro(c);}   /* o furo só alcança o vidro, e é essa a intenção */
 for(const g of OBS.regs)if(!g.blk)obsRegDraw(c,g);
 obsOlhoDraw(c);
 for(const f of OBS.fls)obsFlsDraw(c,f);}

/* sair da Observação (ou calmar) apaga canvas, registros, vidro, a classe da pálpebra e o som.
   o túnel de névoa restante é CSS por data-el, então ele fecha sozinho */
function scopoSync(){const b=bandOf(S.ruido||0),on=OBS.active(1);
 if(!on)obsLidOff();
 OBS.sync();
 audSync(on&&b>=4&&!S.ui.mute,b);}

/* ============ HORROR CÓSMICO — elemento Vazio ============
   onde a escopofobia ACRESCENTA (um olho, um vulto, uma frase a mais), o Vazio SUBTRAI. e
   agora subtrai de verdade, em seis camadas que conversam entre si:

   1. BURACOS QUE ENGOLEM  — preto absoluto com o horizonte em degradê. deslizam das bordas
      para dentro, PUXAM e dissolvem as partículas do #fx-canvas, CRESCEM quando você fica
      parado e RECUAM perto do cursor. banda 1: um mínimo, num canto. banda 5: vários, grandes.
   2. ESTRELAS QUE SE APAGAM — um céu de pontos parados demais que se apagam um a um e nunca
      voltam na mesma proporção: o céu só rareia. e, só na banda 5 e com minutos de carência,
      A FORMA VASTA — sem olho, sem rosto, no limiar da percepção: só uma região por onde as
      estrelas somem ao passar, e da qual dá para duvidar depois.
   3. DISTORÇÃO DO ESPAÇO — perto de um buraco o céu entorta na radial, e um trecho de texto
      REAL estica na direção dele e volta inteiro (transform CSS, sempre reversível).
   4. SUBTRAÇÃO DE MATÉRIA — pedaços da interface piscam para fora por instantes. NUNCA sai do
      DOM, nunca encosta em .value nem em S — e os contadores essenciais (Vida, Fôlego,
      Sintonia, Lucidez e suas barras) são território proibido inteiro.
   5. O SILÊNCIO QUE CORTA — o drone que você não nota é cortado para você sentir a falta. até
      a banda 4 ele só AFUNDA (o ar continua); na 5 o corte é ABSOLUTO, e dura mais.
   6. REATIVIDADE — o Vazio agora RESPONDE (TRIG.vaz/TRIGFX.vaz): o ócio faz os buracos
      avançarem e o ar abafar, apagar/gastar recebe a frase de dispensa, e há o teletransporte
      curto — algo muda de lugar, mas nunca sob o seu olhar.

   o esvaecimento dos painéis por banda continua sendo CSS puro (grátis) — e é justamente ele
   que deixa o canvas, que fica ATRÁS da interface, aparecer por trás dos painéis. o gate do
   elemento é a regra 4 da base, sem cópia local: VAZ é o ClimateEffect do Vazio. */
const vazModal=()=>$("modal").classList.contains("on");

const VHOL=[0,1,1,2,3,5];              /* buracos simultâneos por banda */
const VHR =[0,30,46,74,116,190];       /* raio visual maduro (o miolo preto é ~46% disto) */
const VSTR=[0,26,38,54,74,96];         /* estrelas do céu, por banda */

/* o Vazio É um ClimateEffect: canvas, cursor, zona proibida, gate, loop, teardown e áudio vêm
   da base; o que está declarado aqui embaixo é só o que é do Vazio */
const VAZ=new ClimateEffect({id:"vaz",cv:"fx-void",zr:120,pad:26,
 timers:["subT","subRm","strSch","strT","vastT","mufT","retT"],
 state:{hl:[],st:[],vast:null,lb:-1,cut:0,muf:0,tp:-1e9,pux:-1e9,
  subT:null,subRm:null,subEl:null,strSch:null,strT:null,strEl:null,vastT:null,mufT:null,retT:null},
 /* já entra com céu e com o primeiro buraco: o Vazio nunca começa cheio de nada */
 mount(){const b=bandOf(S.ruido||0);VAZ.lb=b;
  vazSemear(VSTR[b]);
  for(let i=0;i<Math.min(2,VHOL[b]);i++)vazBuraco(b,true);
  vazSubSched();vazStrSched();vazVastSched();VAZ.dirty=true;},
 /* regra 6 — nada sobra: nem buraco, nem estrela, nem classe pendurada em texto de verdade */
 tear(){VAZ.hl.length=0;VAZ.st.length=0;VAZ.vast=null;VAZ.lb=-1;VAZ.cut=0;VAZ.muf=0;
  vazSubClear();vazStrClear();},
 /* só na MUDANÇA de banda: se isto rodasse a cada syncFX (todo clique dispara um), o céu se
    repovoaria sozinho e nunca chegaria a rarear — que é o efeito inteiro da camada 2 */
 band(b){if(b===VAZ.lb)return;VAZ.lb=b;
  while(VAZ.hl.length>VHOL[b])VAZ.hl.pop();
  for(const h of VAZ.hl)if(h.r0>VHR[b])h.r0=VHR[b];
  while(VAZ.st.length>VSTR[b])VAZ.st.pop();
  if(VAZ.st.length<VSTR[b])vazSemear(VSTR[b]-VAZ.st.length,true);
  if(b<5&&VAZ.vast)VAZ.vast=null;
  VAZ.dirty=true;},
 step:vazStep,draw:vazDraw,
 /* o vácuo auditivo: o grafo (dois senos batendo em 44Hz) é do audBuild; o nível, o corte e
    o abafamento são do Vazio. subir e decair o ganho é a regra 6 da base */
 aud:{gain:"vgain",flag:"von",timer:"vtimer",fade:.5,tc:1.4,
  lvl:b=>vazNivel(b),tick:()=>vazCut(),first:()=>(10+Math.random()*10)*1000}});

/* ---------- camada 1: OS BURACOS QUE ENGOLEM ---------- */
/* nascem numa borda e vêm para dentro. na banda baixa é um ponto quieto num canto; da 3 em
   diante eles ATRAVESSAM a tela, e é isso que faz a sensação de avanço */
function vazBuraco(b,jaCrescido){const W=VAZ.W,H=VAZ.H,r=Math.random;
 if(VAZ.hl.length>=VHOL[b])return null;
 const R=VHR[b]*(.55+r()*.7);
 let x,y,vx,vy;
 if(b<=2){const cx=r()<.5,cy=r()<.5;      /* um canto, e ele quase não anda */
  x=cx?R*.55:W-R*.55;y=cy?R*.6:H-R*.6;
  vx=(cx?1:-1)*(.002+r()*.003);vy=(cy?1:-1)*(.002+r()*.002);}
 else{const e=Math.floor(r()*4);          /* de uma borda, avançando para o miolo */
  if(e===0)     {x=-R*.4;      y=H*(.1+r()*.8);vx= .009+r()*.011;vy=(r()-.5)*.006;}
  else if(e===1){x=W+R*.4;     y=H*(.1+r()*.8);vx=-.009-r()*.011;vy=(r()-.5)*.006;}
  else if(e===2){x=W*(.1+r()*.8);y=H+R*.4;    vx=(r()-.5)*.006;  vy=-.009-r()*.011;}
  else          {x=W*(.1+r()*.8);y=-R*.4;     vx=(r()-.5)*.006;  vy= .009+r()*.011;}}
 const h={x,y,px:x,py:y,r:jaCrescido?R*.4:1,r0:R,g:1,vx,vy};
 VAZ.hl.push(h);VAZ.dirty=true;return h;}
/* o passo: deslizar, crescer no ócio, recuar do cursor. a repintura só é pedida a cada ~0,6px
   percorrido — o Vazio é lento de propósito, e não paga um frame cheio para andar 0,2px */
function vazBuracoStep(dt,b,parado){
 for(let i=VAZ.hl.length-1;i>=0;i--){const h=VAZ.hl[i];
  h.x+=h.vx*dt;h.y+=h.vy*dt;
  if(Math.abs(h.x-h.px)+Math.abs(h.y-h.py)>.6){h.px=h.x;h.py=h.y;VAZ.dirty=true;}
  /* REGRA SAGRADA: onde você está, nada engole. ele murcha até zero e ainda é empurrado
     para longe do cursor — e volta ao tamanho sozinho quando você sai de perto */
  let tgt=h.r0*h.g*(parado?1.3:1);
  if(VAZ.forbBox({l:h.x-h.r,r:h.x+h.r,t:h.y-h.r,b:h.y+h.r})){tgt=0;
   const dx=h.x-VAZ.mx,dy=h.y-VAZ.my,l=Math.hypot(dx,dy)||1;
   h.x+=dx/l*.05*dt;h.y+=dy/l*.05*dt;VAZ.dirty=true;}
  const k=Math.min(1,(tgt>h.r?.0002:.0025)*dt);  /* cresce devagar, recua depressa */
  const nr=h.r+(tgt-h.r)*k;
  if(Math.abs(nr-h.r)>.05){h.r=nr;VAZ.dirty=true;}
  const F=h.r0*2;
  if(h.x<-F||h.x>VAZ.W+F||h.y<-F||h.y>VAZ.H+F){VAZ.hl.splice(i,1);VAZ.dirty=true;}}
 if(VAZ.hl.length<VHOL[b]&&Math.random()<.00012*dt)vazBuraco(b);}
/* --- ENGOLIR: as partículas do #fx-canvas que chegam perto são puxadas em espiral, encolhem
   ao cruzar o horizonte e não voltam. só toca vx/vy/s/op da partícula: o filtro do fxTick
   descarta a que teve a vida encerrada, no mesmo frame --- */
function vazEngolir(){if(!VAZ.hl.length||!FX.ps.length)return;
 for(const p of FX.ps){
  for(const h of VAZ.hl){if(h.r<6)continue;
   const dx=h.x-p.x,dy=h.y-p.y,R=h.r*3.2,d2=dx*dx+dy*dy;
   if(d2>R*R)continue;
   const d=Math.sqrt(d2)||1,f=1-d/R,nx=dx/d,ny=dy/d;
   /* amortecido: a queda tem velocidade terminal em vez de virar um estilingue */
   p.vx=p.vx*.94+(nx*f*f*.09-ny*f*.03);
   p.vy=p.vy*.94+(ny*f*f*.09+nx*f*.03);
   if(d<h.r*.46){p.s*=.86;p.op*=.8;              /* cruzou o horizonte: escala→0 e apaga */
    if(p.s<.7||d<h.r*.18)p.life=p.max;}
   break;}}}
/* preto absoluto no miolo; o horizonte não tem linha, tem degradê. o anel na cor do elemento
   é o pouco que ainda circula na beirada, e só existe quando o buraco já é grande */
function vazBuracoDraw(c,h){const R=h.r;if(R<1.2)return;
 const g=c.createRadialGradient(h.x,h.y,0,h.x,h.y,R);
 g.addColorStop(0,"rgba(0,0,0,1)");
 g.addColorStop(.46,"rgba(0,0,0,1)");
 g.addColorStop(.58,"rgba(1,2,6,.8)");
 g.addColorStop(.74,"rgba(2,3,9,.42)");
 g.addColorStop(.89,"rgba(2,3,9,.14)");
 g.addColorStop(1,"rgba(2,3,9,0)");
 c.fillStyle=g;c.beginPath();c.arc(h.x,h.y,R,0,6.2832);c.fill();
 if(R>26){c.globalAlpha=Math.min(.42,(R-26)/150);
  c.strokeStyle=VAZ.cor(.66,.55);c.lineWidth=Math.max(.6,R*.011);
  c.beginPath();c.arc(h.x,h.y,R*.5,0,6.2832);c.stroke();c.globalAlpha=1;}}

/* ---------- camada 2: O CÉU QUE SE APAGA ---------- */
/* pontos PARADOS: não cintilam, não derivam. é a imobilidade que os torna errados */
function vazSemear(n,extra){const r=Math.random;
 if(!extra)VAZ.st.length=0;
 for(let i=0;i<n;i++)VAZ.st.push({x:r()*VAZ.W,y:r()*VAZ.H,s:.6+r()*1.5,a:.18+r()*.5,al:1,d:0,up:0});
 VAZ.dirty=true;}
function vazCeuStep(dt,b){const n=VSTR[b];
 let viv=0;for(const s of VAZ.st)if(!s.d)viv++;
 /* uma se apaga de vez em quando (~1 a cada 16s), e volta gente numa fração do que foi —
    o piso em 28% só existe para o céu não zerar e a camada 3 não ficar sem o que entortar */
 if(viv>Math.max(3,Math.round(n*.28))&&Math.random()<.00006*dt){
  const c=[];for(const s of VAZ.st)if(!s.d)c.push(s);
  c[Math.floor(Math.random()*c.length)].d=1;}
 if(VAZ.st.length<n&&Math.random()<.00002*dt){const r=Math.random;
  VAZ.st.push({x:r()*VAZ.W,y:r()*VAZ.H,s:.6+r()*1.5,a:.18+r()*.5,al:0,d:0,up:1});VAZ.dirty=true;}
 for(let i=VAZ.st.length-1;i>=0;i--){const s=VAZ.st[i];
  if(s.d){s.al-=dt*.0016;VAZ.dirty=true;   /* fade curto: em ~0,6s ela nunca esteve ali */
   if(s.al<=0)VAZ.st.splice(i,1);}
  else if(s.up&&s.al<1){s.al=Math.min(1,s.al+dt*.0004);VAZ.dirty=true;}}}

/* --- A FORMA VASTA: banda 5, carência de 3 a 6 minutos, e uma travessia de quase um minuto.
   sem olho, sem rosto, sem borda: o desenho dela está no limiar da percepção de propósito, e
   o que você percebe de verdade é indireto — as estrelas somem por onde ela passa --- */
function vazVast(){if(!VAZ.on||bandOf(S.ruido||0)<5||VAZ.vast)return;
 const r=Math.random,W=VAZ.W,H=VAZ.H,R=Math.min(W,H)*(.62+r()*.5),esq=r()<.5;
 VAZ.vast={x:esq?-R*1.15:W+R*1.15,y:H*(.2+r()*.6),r:R,
  vx:(esq?1:-1)*(W+R*2.4)/52000,vy:(r()-.5)*.004};
 VAZ.dirty=true;}
function vazVastSched(){clearTimeout(VAZ.vastT);VAZ.vastT=null;
 if(!VAZ.on)return;
 VAZ.vastT=setTimeout(()=>{VAZ.vastT=null;vazVast();vazVastSched();},(180+Math.random()*180)*1000);}
function vazVastStep(dt){const V=VAZ.vast;if(!V)return;
 V.x+=V.vx*dt;V.y+=V.vy*dt;VAZ.dirty=true;
 if(V.vx>0?V.x>VAZ.W+V.r*1.2:V.x<-V.r*1.2)VAZ.vast=null;}
/* a oclusão: a estrela dentro dela simplesmente não está mais lá enquanto ela passa */
function vazOcl(x,y){const V=VAZ.vast;if(!V)return 1;
 const dx=(x-V.x)/V.r,dy=(y-V.y)/(V.r*.72),d=Math.sqrt(dx*dx+dy*dy);
 return d>=1?1:(d<.8?0:(d-.8)*5);}
function vazVastDraw(c){const V=VAZ.vast;
 const g=c.createRadialGradient(V.x,V.y,V.r*.2,V.x,V.y,V.r);
 g.addColorStop(0,"rgba(0,0,0,.085)");g.addColorStop(.72,"rgba(0,0,0,.05)");
 g.addColorStop(1,"rgba(0,0,0,0)");
 c.fillStyle=g;c.beginPath();c.ellipse(V.x,V.y,V.r,V.r*.72,0,0,6.2832);c.fill();}

/* ---------- camada 3: A DISTORÇÃO DO ESPAÇO ---------- */
/* o céu entorta perto do que engole. é só DESENHO: a posição verdadeira da estrela nunca muda,
   então ela volta ao lugar sozinha quando o buraco passa */
function vazWarp(sx,sy,out){let x=sx,y=sy;
 for(const h of VAZ.hl){if(h.r<6)continue;
  const dx=x-h.x,dy=y-h.y,R=h.r*3.4,d=Math.hypot(dx,dy)||1;
  if(d>R)continue;
  const f=1-d/R,k=h.r*.5*f*f/d;
  x-=dx*k;y-=dy*k;}
 out[0]=x;out[1]=y;}
/* e a distorção alcança o TEXTO: um trecho real perto de um buraco estica na direção dele e
   volta inteiro. nunca o campo em edição, nunca o que está sob o cursor (vazAlvos cuida) */
function vazStrClear(){clearTimeout(VAZ.strT);VAZ.strT=null;
 const el=VAZ.strEl;VAZ.strEl=null;if(!el)return;
 el.style.transform="";el.classList.remove("vaz-str");}
function vazStretch(){vazStrClear();
 if(!VAZ.on||bandOf(S.ruido||0)<4||vazModal()||!VAZ.hl.length)return;
 /* transform desloca o alvo do CLIQUE junto com o desenho: entortar só vale para texto morto.
    o que é clicável fica para a camada 4, que mexe em opacidade e não move nada de lugar */
 const cand=vazAlvos().filter(p=>!vazClic(p[0]));if(!cand.length)return;
 /* o alvo tem que estar PERTO de um buraco: quem entorta é a gravidade dele, não o acaso */
 let alvo=null,bd=1e9,bh=null;
 for(const p of cand){const cx=(p[1].left+p[1].right)/2,cy=(p[1].top+p[1].bottom)/2;
  for(const h of VAZ.hl){if(h.r<20)continue;
   const d=Math.hypot(cx-h.x,cy-h.y);
   if(d<bd&&d<h.r*3.2){bd=d;alvo=p;bh=h;}}}
 if(!alvo)return;
 const el=alvo[0],r=alvo[1],cx=(r.left+r.right)/2,cy=(r.top+r.bottom)/2;
 const ang=Math.atan2(bh.y-cy,bh.x-cx),f=Math.min(.5,(1-bd/(bh.r*3.2))*.6);
 el.classList.add("vaz-str");
 el.style.transform=`translate(${(Math.cos(ang)*bh.r*.11).toFixed(1)}px,${(Math.sin(ang)*bh.r*.08).toFixed(1)}px) `+
  `scale(${(1+f*.42).toFixed(3)},${(1-f*.3).toFixed(3)}) skewX(${(Math.cos(ang)*f*10).toFixed(2)}deg)`;
 VAZ.strEl=el;
 /* fase 2: solta e deixa a transição do .vaz-str trazer de volta, e só então tira a classe */
 VAZ.strT=setTimeout(()=>{VAZ.strT=null;
  if(VAZ.strEl!==el)return;
  el.style.transform="";
  VAZ.strT=setTimeout(()=>{VAZ.strT=null;
   if(VAZ.strEl===el){VAZ.strEl=null;el.classList.remove("vaz-str");}},1200);},1100+Math.random()*700);}
function vazStrSched(){clearTimeout(VAZ.strSch);VAZ.strSch=null;
 if(!VAZ.on)return;
 const b=bandOf(S.ruido||0),iv=b>=5?(16+Math.random()*14):(26+Math.random()*24);
 VAZ.strSch=setTimeout(()=>{VAZ.strSch=null;vazStretch();vazStrSched();},iv*1000);}

/* ---------- camada 4: A SUBTRAÇÃO DE MATÉRIA ---------- */
/* os alvos possíveis: texto de verdade, nunca o que você está usando — e NUNCA os contadores
   essenciais. um .rec que contenha um input de "atual" (cur_ na ficha, scur_ na sessão, mcur_
   nos medidores) é território proibido INTEIRO: Vida, Fôlego, Sintonia, Lucidez e as barras
   deles ficam onde estão, sempre. eles são o que você precisa ler no meio de uma cena. */
const VAZSEL=".hx,.panel h2,.hint,label,.tabs button";
const VAZREC='input[id^="cur_"],input[id^="scur_"],input[id^="mcur_"]';
const vazClic=el=>el.matches("button,a,input,select,textarea")||!!el.querySelector("button,a");
function vazAlvos(){const out=[];
 document.querySelectorAll(VAZSEL).forEach(el=>{
  if(el.querySelector("input,textarea,select"))return;
  const rec=el.closest&&el.closest(".rec");
  if(rec&&rec.querySelector(VAZREC))return;      /* os números essenciais nunca somem */
  if(el.matches(":hover"))return;
  const a=document.activeElement;
  if(a&&a!==document.body&&(el===a||el.contains(a)))return;
  if(!el.textContent.trim())return;
  const r=el.getBoundingClientRect();
  if(r.width<44||r.height<9||r.height>90||r.top<4||r.bottom>innerHeight-4)return;
  if(VAZ.forbBox({l:r.left,r:r.right,t:r.top,b:r.bottom}))return;
  out.push([el,r]);});
 return out;}
function vazSubClear(){clearTimeout(VAZ.subRm);VAZ.subRm=null;
 const el=VAZ.subEl;VAZ.subEl=null;if(!el)return;
 el.classList.remove("vaz-sub","vaz-cut");el.style.removeProperty("--vzd");}
function vazSub(){vazSubClear();
 if(!VAZ.on||bandOf(S.ruido||0)<3||vazModal())return;
 const cand=vazAlvos();if(!cand.length)return;
 const el=cand[Math.floor(Math.random()*cand.length)][0];
 const dur=.2+Math.random()*.4;
 /* clip-path também recorta o CLIQUE: o que é clicável só pode piscar por opacidade, que não
    tira o alvo do lugar nem por um frame */
 el.style.setProperty("--vzd",dur.toFixed(2)+"s");
 el.classList.add(!vazClic(el)&&Math.random()<.45?"vaz-cut":"vaz-sub");
 VAZ.subEl=el;
 VAZ.subRm=setTimeout(vazSubClear,Math.round(dur*1000)+220);}
function vazSubSched(){clearTimeout(VAZ.subT);VAZ.subT=null;
 if(!VAZ.on)return;
 const b=bandOf(S.ruido||0),iv=b>=5?(7+Math.random()*8):(b>=4?(12+Math.random()*12):(20+Math.random()*20));
 VAZ.subT=setTimeout(()=>{VAZ.subT=null;vazSub();vazSubSched();},iv*1000);}

/* ---------- camada 5: O SILÊNCIO QUE CORTA ---------- */
const vazLvl=b=>b>=5?.014:.009;
/* na banda 5 o corte é ABSOLUTO — zero, silêncio de verdade. abaixo dela o drone só afunda:
   some do consciente, mas o ar continua ali, e é por isso que o ápice pesa tanto mais */
const vazDip=b=>b>=5?0:vazLvl(b)*.16;
/* o nível que o audSync da base persegue. um syncFX no meio de um corte (qualquer clique
   dispara um) devolveria o drone antes da hora: por isso o corte e o abafamento entram AQUI,
   e não só como rampa solta no grafo */
function vazNivel(b){const n=performance.now();
 if(n<VAZ.cut)return vazDip(b);
 return vazLvl(b)*(n<VAZ.muf?.22:1);}
function vazCut(){if(!AUD.von||!AUD.ctx)return;
 const b=bandOf(S.ruido||0),t=AUD.ctx.currentTime,g=AUD.vgain.gain;
 const tot=b>=5,dur=tot?5+Math.random()*4:2+Math.random()*2,volta=tot?2.8:1.8;
 VAZ.cut=performance.now()+dur*1000;
 try{g.cancelScheduledValues(t);g.setValueAtTime(vazDip(b),t);   /* corte seco: o vácuo */
  g.setValueAtTime(vazDip(b),t+dur);g.linearRampToValueAtTime(vazLvl(b),t+dur+volta);}catch(e){}
 /* rede: se um syncFX cancelar a rampa de volta no meio do silêncio, este resync a refaz */
 clearTimeout(VAZ.retT);
 VAZ.retT=setTimeout(()=>{VAZ.retT=null;vazSync();},Math.round((dur+volta+.3)*1000));
 AUD.vtimer=setTimeout(vazCut,Math.round((dur+(tot?12+Math.random()*10:20+Math.random()*20))*1000));}
/* o ar abafa: não é o corte seco, é o ambiente perdendo densidade enquanto você não faz nada */
function vazAbafa(){if(!VAZ.on)return;
 const seg=10+Math.random()*8;
 VAZ.muf=performance.now()+seg*1000;
 clearTimeout(VAZ.mufT);
 VAZ.mufT=setTimeout(()=>{VAZ.mufT=null;vazSync();},Math.round(seg*1000)+300);
 vazSync();}

/* ---------- camada 6: A REATIVIDADE ---------- */
/* parou: os buracos AVANÇAM — nasce mais um, os que já estão engordam (com teto, senão o
   ócio repetido os faria engolir a tela) e ficam mais rápidos. e o ar abafa junto */
function vazIdle(){if(!VAZ.on)return;
 const b=bandOf(S.ruido||0);
 vazBuraco(b);
 for(const h of VAZ.hl){h.g=Math.min(1.9,h.g*1.24);h.vx*=1.35;h.vy*=1.35;}
 VAZ.dirty=true;vazAbafa();}
/* voltou a mexer: o avanço morre na hora (o recuo em si é contínuo, em vazBuracoStep) */
function vazAct(){let m=false;
 for(const h of VAZ.hl)if(h.g>1){h.g=1;m=true;}
 if(m)VAZ.dirty=true;}
/* gastou recurso: um buraco PUXA — cresce de repente e leva o que estava em volta junto */
function vazPuxa(d){if(!VAZ.on||!(d&&d.dir<0))return;
 const now=performance.now();if(now-VAZ.pux<9000)return;
 VAZ.pux=now;
 if(!VAZ.hl.length){vazBuraco(bandOf(S.ruido||0),true);return;}
 const h=VAZ.hl[Math.floor(Math.random()*VAZ.hl.length)];
 h.g=Math.min(1.9,h.g*1.45);h.r=Math.min(h.r0*h.g,h.r+h.r0*.3);VAZ.dirty=true;}
/* o Ruído subiu: falta menos. mais um buraco, todos avançando, e uma estrela a menos */
function vazSurto(){if(!VAZ.on)return;
 const b=bandOf(S.ruido||0);
 vazBuraco(b);vazBuraco(b);
 for(const h of VAZ.hl)h.g=Math.min(1.9,h.g*1.3);
 const c=[];for(const s of VAZ.st)if(!s.d)c.push(s);
 if(c.length>4)c[Math.floor(Math.random()*c.length)].d=1;
 VAZ.dirty=true;}
/* --- O TELETRANSPORTE CURTO: uma coisa muda de lugar, mas NUNCA sob o olhar direto. só
   quando a janela perde o foco, ou quando o cursor está longe e parado há um tempo. você
   volta e algo não está mais onde estava — e não há como provar que estava.
   (a aba OCULTA já desmonta o elemento inteiro pela regra 4, então voltar para ela reencontra
   um céu outro de qualquer jeito; o ajuste fino aqui é para a janela que perde o foco sem
   esconder a aba, que é o caso em que o céu de antes continua na sua frente) --- */
function vazTeleport(){
 if(!VAZ.on||!VAZ.active(2))return;
 const now=performance.now();if(now-VAZ.tp<20000)return;
 const longe=now-VAZ.mt>5000,W=VAZ.W,H=VAZ.H,R=VAZ.zr;
 const olhando=(x,y)=>!longe&&Math.hypot(x-VAZ.mx,y-VAZ.my)<R*2.6;
 const peq=[];for(const h of VAZ.hl)if(h.r>4&&h.r<VHR[bandOf(S.ruido||0)]*.7&&!olhando(h.x,h.y))peq.push(h);
 if(peq.length&&Math.random()<.3){const o=peq[Math.floor(Math.random()*peq.length)];
  for(let k=0;k<8;k++){const x=W*(.08+Math.random()*.84),y=H*(.1+Math.random()*.8);
   if(olhando(x,y)||VAZ.forbBox({l:x-o.r,r:x+o.r,t:y-o.r,b:y+o.r}))continue;
   o.x=o.px=x;o.y=o.py=y;VAZ.tp=now;VAZ.dirty=true;return;}
  return;}
 const st=[];for(const s of VAZ.st)if(!s.d&&!olhando(s.x,s.y))st.push(s);
 if(!st.length)return;
 const s=st[Math.floor(Math.random()*st.length)];
 for(let k=0;k<8;k++){const x=Math.random()*W,y=Math.random()*H;
  if(olhando(x,y)||VAZ.forb(x,y))continue;
  s.x=x;s.y=y;VAZ.tp=now;VAZ.dirty=true;return;}}
addEventListener("blur",vazTeleport,{passive:true});
document.addEventListener("visibilitychange",()=>{if(!document.hidden)vazTeleport();});

/* as reações do Vazio às suas ações. o tom nunca é ameaça — é DISPENSA: o que está do outro
   lado não quer nada de você, e é exatamente por isso que dói. o motor cuida da carência e
   das substituições de {nome}/{apagado} */
TRIG.vaz={
 erase:["não precisava estar aí","some mais rápido do que você apaga","{apagado} — ninguém ia ler",
  "apagar é o trabalho mais honesto daqui","ficou igual"],
 resource:["não muda o total","gasta. sobra o mesmo nada.","o número não estava segurando nada",
  "isso ia embora de um jeito ou de outro"],
 idle:["podia ficar aí para sempre","não há nada esperando você","é assim que termina: sem aviso",
  "o resto não parou junto com você"],
 tabopen:["aqui também não tem nada","outra página, mesma ausência","não procure: não foi guardado"],
 noiseup:["está mais perto do fim","falta menos para não haver"]};
/* e os efeitos dos mesmos gatilhos: act = "o usuário voltou a mexer" */
TRIGFX.vaz={idle:vazIdle,act:vazAct,erase:()=>vazSub(),resource:vazPuxa,noiseup:vazSurto};

/* --- o passo por frame. o gate, o resize, o dt, a zona de foco e a repintura por dirty são
   da base (ClimateEffect.tick); daqui para baixo é só o Vazio --- */
function vazStep(dt){
 const b=bandOf(S.ruido||0),parado=performance.now()-VAZ.mt>4200;
 vazBuracoStep(dt,b,parado);
 vazEngolir();
 vazCeuStep(dt,b);
 vazVastStep(dt);
 /* longe do olhar e parado: de raro em raro, algo se move sozinho (a carência é do teleport) */
 if(parado&&Math.random()<.00002*dt)vazTeleport();}

/* --- a repintura: só acontece com VAZ.dirty. ordem = céu, forma vasta, buracos por cima --- */
function vazDraw(c){
 c.clearRect(0,0,VAZ.W,VAZ.H);
 const col=VAZ.cor(1,1),p=[0,0];      /* a cor sai do _ecCache uma vez, não por estrela */
 c.fillStyle=col;
 for(const s of VAZ.st){if(s.al<=0)continue;
  const o=vazOcl(s.x,s.y);if(o<=0)continue;
  vazWarp(s.x,s.y,p);
  if(VAZ.forb(p[0],p[1]))continue;    /* nem um ponto de 1px entra na sua zona */
  c.globalAlpha=s.a*s.al*o;
  c.beginPath();c.arc(p[0],p[1],s.s,0,6.2832);c.fill();}
 c.globalAlpha=1;
 if(VAZ.vast)vazVastDraw(c);
 for(const h of VAZ.hl)vazBuracoDraw(c,h);}

/* espelho do gerSync: sair do Vazio (ou calmar) apaga timers, canvas, classes e som. os
   agendadores das camadas 2/3/4 nascem no mount e morrem no tear, como no jardim */
function vazSync(){const b=bandOf(S.ruido||0),on=VAZ.active(1);
 if(!on||b<3){vazSubClear();vazStrClear();}
 VAZ.sync();
 const som=on&&b>=4&&!S.ui.mute;
 if(!som){VAZ.cut=0;VAZ.muf=0;}      /* sem som, o corte e o abafamento não ficam pendurados */
 VAZ.audSync(som,b);}

/* ============ DÉJÀ VU — elemento Eco ============
   o Eco repete: o sussurro volta, o texto gagueja, o que você apagou reaparece.
   tudo é sobreposição efêmera — nada aqui escreve em campo, dispara oninput ou toca em S. */
const ecoOn=min=>S.elem==="eco"&&bandOf(S.ruido||0)>=(min||1)&&!S.ui.calm&&!RM()&&!document.hidden;

/* --- o soluço: um clone do texto que salta por 220ms e some --- */
let _stT=null,_stEl=null;
function ecoStClear(){if(_stEl&&_stEl.parentNode)_stEl.parentNode.removeChild(_stEl);_stEl=null;}
function ecoStutter(){ecoStClear();
 if(!ecoOn(3)||$("modal").classList.contains("on"))return;
 const p=txPick();if(!p)return; /* o mesmo texto morto que a Observação registra: sem hover, foco nem campos */
 const el=p[0],r=p[1],cs=getComputedStyle(el),d=document.createElement("div");
 d.className="fx-flash fx-stut";
 d.style.cssText=`left:${r.left}px;top:${r.top}px;width:${Math.ceil(r.width)}px;height:${Math.ceil(r.height)}px;`+
  `color:${cs.color};font-family:${cs.fontFamily};font-size:${cs.fontSize};font-weight:${cs.fontWeight};`+
  `letter-spacing:${cs.letterSpacing};text-transform:${cs.textTransform}`;
 d.textContent=el.textContent.trim().slice(0,90);
 document.body.appendChild(d);_stEl=d;
 setTimeout(ecoStClear,240);}
function stutSched(){clearTimeout(_stT);_stT=setTimeout(()=>{ecoStutter();stutSched();},15000+Math.random()*20000);}

/* --- o fantasma do que foi digitado e apagado ---
   ECOBUF é volátil: vive só em memória, nunca entra em S, nunca é salvo, nunca reescreve campo */
let ECOBUF=[],_ghT=null,_ghEl=null;
const _lastVal=new WeakMap();
const TXIN=el=>el&&(el.tagName==="TEXTAREA"||(el.tagName==="INPUT"&&(!el.type||el.type==="text"||el.type==="search")));
function _apagado(prev,now){let a=0;const m=Math.min(prev.length,now.length);
 while(a<m&&prev[a]===now[a])a++;
 let b=0;while(b<m-a&&prev[prev.length-1-b]===now[now.length-1-b])b++;
 return prev.slice(a,prev.length-b).trim();}
document.addEventListener("input",e=>{const t=e.target;if(!TXIN(t))return;
 const prev=_lastVal.has(t)?_lastVal.get(t):(t.defaultValue||""),now=t.value||"";
 _lastVal.set(t,now);
 if(S.elem!=="eco"||now.length>=prev.length-2)return;
 const gone=_apagado(prev,now);
 if(gone.length<4)return;
 ECOBUF.push(gone.slice(0,60));if(ECOBUF.length>10)ECOBUF.shift();},{passive:true});
function ecoGhClear(){if(_ghEl&&_ghEl.parentNode)_ghEl.parentNode.removeChild(_ghEl);_ghEl=null;}
/* um campo de texto vazio, visível, sem foco nem cursor em cima — senão, um ponto solto da tela */
function ghostSpot(){const out=[];
 document.querySelectorAll("input[type=text],textarea").forEach(el=>{
  if(el.value||el===document.activeElement||el.matches(":hover"))return;
  const r=el.getBoundingClientRect();
  if(r.width<90||r.height<14||r.top<12||r.bottom>innerHeight-12)return;
  out.push({x:r.left+9,y:r.top+Math.min(9,(r.height-15)/2),w:r.width-18});});
 if(out.length)return out[Math.floor(Math.random()*out.length)];
 return {x:innerWidth*(.1+Math.random()*.45),y:innerHeight*(.2+Math.random()*.55),w:260};}
function ecoGhost(){ecoGhClear();
 if(!ecoOn(4)||!ECOBUF.length||$("modal").classList.contains("on"))return;
 const tx=ECOBUF[Math.floor(Math.random()*ECOBUF.length)],a=ghostSpot();
 const d=document.createElement("div");d.className="fx-ghost";
 d.style.cssText=`left:${Math.round(a.x)}px;top:${Math.round(a.y)}px;max-width:${Math.round(a.w)}px`;
 d.textContent=tx;
 document.body.appendChild(d);_ghEl=d;
 setTimeout(ecoGhClear,1900);}
function ghostSched(){clearTimeout(_ghT);_ghT=setTimeout(()=>{ecoGhost();ghostSched();},30000+Math.random()*30000);}

/* --- o micro-loop: um elemento repete o mesmo movimento 3× e destrava --- */
let _lpT=null,_lpEl=null;
function ecoLoopClear(){if(_lpEl){_lpEl.classList.remove("fx-loop");_lpEl=null;}}
function ecoLoopNow(){ecoLoopClear();
 if(!ecoOn(5)||$("modal").classList.contains("on"))return;
 const out=[];document.querySelectorAll(".panel h2,.tabs button,label").forEach(el=>{
  if(el.matches(":hover"))return;
  if(document.activeElement&&el.contains(document.activeElement))return;
  const r=el.getBoundingClientRect();
  if(r.width<30||r.height<8||r.top<6||r.bottom>innerHeight-6)return;out.push(el);});
 if(!out.length)return;
 _lpEl=out[Math.floor(Math.random()*out.length)];_lpEl.classList.add("fx-loop");
 setTimeout(ecoLoopClear,1500);}
function loopSched(){clearTimeout(_lpT);_lpT=setTimeout(()=>{ecoLoopNow();loopSched();},28000+Math.random()*32000);}

/* --- o eco sonoro: um tom melancólico que volta 3–4 vezes, cada vez mais longe --- */
function ecoPing(){if(!AUD.ctx||S.ui.mute||!ecoOn(4))return;
 const c=AUD.ctx,t0=c.currentTime,b=bandOf(S.ruido||0),n=b>=5?4:3;
 try{const g=c.createGain();g.gain.value=0;g.connect(c.destination);
  const o=c.createOscillator();o.type="sine";o.frequency.value=196;o.connect(g);o.start(t0);
  let d=0,lvl=b>=5?.05:.036;
  for(let i=0;i<=n;i++){const t=t0+d;
   g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(lvl,t+.02);
   g.gain.exponentialRampToValueAtTime(.0001,t+.5);
   d+=(b>=5?.6:.42)+i*.06;lvl*=.55;} /* atraso crescente, volume decaindo: a lembrança se afastando */
  o.stop(t0+d+.6);AUD.eg=g;}catch(e){}}
function ecoAudOff(){clearTimeout(AUD.etimer);AUD.etimer=null;AUD.eon=false;
 if(!AUD.ctx||!AUD.eg)return;try{const t=AUD.ctx.currentTime;
  AUD.eg.gain.cancelScheduledValues(t);AUD.eg.gain.setTargetAtTime(0,t,.05);}catch(e){}}
function ecoAudTick(){if(!AUD.eon)return;const b=bandOf(S.ruido||0);
 ecoPing();
 AUD.etimer=setTimeout(ecoAudTick,(b>=5?12+Math.random()*12:18+Math.random()*17)*1000);}
function ecoAudSync(want){
 if(!want||!AUD.gest)return ecoAudOff();
 if(!audBuild())return;
 if(AUD.ctx.state==="suspended")AUD.ctx.resume().catch(()=>{});
 if(!AUD.eon){AUD.eon=true;AUD.etimer=setTimeout(ecoAudTick,(6+Math.random()*8)*1000);}}

/* sair do Eco apaga timers, overlays, som — e o buffer volátil não vaza para outro personagem */
function ecoSync(){const b=bandOf(S.ruido||0),on=ecoOn(1);
 if(S.elem!=="eco"){ECOBUF.length=0;clearTimeout(_wEt);_wEt=null;}
 if(on&&b>=3){if(!_stT)stutSched();}else{clearTimeout(_stT);_stT=null;ecoStClear();}
 if(on&&b>=4){if(!_ghT)ghostSched();}else{clearTimeout(_ghT);_ghT=null;ecoGhClear();}
 if(on&&b>=5){if(!_lpT)loopSched();}else{clearTimeout(_lpT);_lpT=null;ecoLoopClear();}
 ecoAudSync(on&&b>=4&&!S.ui.mute);}

/* ============ CARNE-METAL — elemento Ascensão ============
   o servo-travamento e os reflexos de aço são CSS puro (grátis, e somem junto com o data-el).
   aqui ficam só o que precisa de tempo: a pele que descasca, a junta que emperra e os servos
   do áudio. nada muta o DOM real nem S: overlays pointer-events:none e classes efêmeras. */
const ascOn=min=>S.elem==="asc"&&bandOf(S.ruido||0)>=(min||1)&&!S.ui.calm&&!RM()&&!document.hidden;

/* --- o assentamento: só na troca de aba, o conteúdo novo para como braço robótico --- */
let _lndT=null,_lndEl=null;
function ascLandClear(){clearTimeout(_lndT);_lndT=null;
 if(_lndEl){_lndEl.classList.remove("asc-land");_lndEl=null;}}
function ascLand(){ascLandClear();if(!ascOn(3))return;
 const m=S.ui.sess?$("sessview"):$("mainview");if(!m)return;
 _lndEl=m;m.classList.add("asc-land");
 _lndT=setTimeout(ascLandClear,560);}

/* --- a pele que descasca: um overlay revela aço e circuito por baixo, e fecha ---
   candidatos: a borda de cima de um painel ou a caixa de um título. nunca sob o cursor,
   sob edição, nem com modal aberto */
let _pkT=null,_pkEl=null;
function peelClear(){if(_pkEl&&_pkEl.parentNode)_pkEl.parentNode.removeChild(_pkEl);_pkEl=null;}
function peelPick(){const out=[];
 document.querySelectorAll(".panel").forEach(p=>{
  if(p.matches(":hover"))return;
  if(document.activeElement&&p.contains(document.activeElement))return;
  const r=p.getBoundingClientRect();
  if(r.width<130||r.top<10||r.top>innerHeight-46)return;
  out.push({x:r.left,y:r.top,w:r.width,h:7}); /* a borda abrindo */
  const h=p.querySelector("h2");if(!h)return;
  const q=h.getBoundingClientRect();
  if(q.width>70&&q.height>8&&q.top>10&&q.bottom<innerHeight-10)out.push({x:q.left-4,y:q.top-3,w:q.width+8,h:q.height+6});});
 return out.length?out[Math.floor(Math.random()*out.length)]:null;}
function peelNow(){peelClear();
 if(!ascOn(4)||$("modal").classList.contains("on"))return;
 const a=peelPick();if(!a)return;
 const d=document.createElement("div");d.className="fx-peel";
 d.style.cssText=`left:${Math.round(a.x)}px;top:${Math.round(a.y)}px;width:${Math.round(a.w)}px;height:${Math.round(a.h)}px`;
 document.body.appendChild(d);_pkEl=d;
 setTimeout(peelClear,1100);}
function peelSched(){clearTimeout(_pkT);_pkT=setTimeout(()=>{peelNow();peelSched();},20000+Math.random()*20000);}

/* --- o glitch mecânico: a junta emperra e força o mesmo fim de curso, ou salta e se corrige.
   só em texto — nunca em campo de edição, botão ou aba, para não desalinhar um clique --- */
let _jmT=null,_jmEl=null;
function jamClear(){if(_jmEl){_jmEl.classList.remove("fx-jam","fx-jolt");_jmEl=null;}}
function jamNow(){jamClear();
 if(!ascOn(5)||$("modal").classList.contains("on"))return;
 const out=[];document.querySelectorAll(".panel h2,label,.hint,.rec .rn,.attr .an").forEach(el=>{
  if(el.querySelector("input,textarea,select,button"))return;
  if(el.matches(":hover"))return;
  if(document.activeElement&&el.contains(document.activeElement))return;
  const r=el.getBoundingClientRect();
  if(r.width<40||r.height<8||r.top<12||r.bottom>innerHeight-12)return;out.push(el);});
 if(!out.length)return;
 _jmEl=out[Math.floor(Math.random()*out.length)];
 _jmEl.classList.add(Math.random()<.6?"fx-jam":"fx-jolt");
 setTimeout(jamClear,900);}
function jamSched(){clearTimeout(_jmT);_jmT=setTimeout(()=>{jamNow();jamSched();},26000+Math.random()*26000);}

/* --- o servo sonoro: um whirr de motor reposicionando, sintetizado com varredura de pitch --- */
const ascLvl=b=>b>=5?.016:.010;
function ascClick(t){const c=AUD.ctx;try{ /* o estalo metálico da trava encaixando */
 const g=c.createGain(),f=c.createBiquadFilter(),o=c.createOscillator();
 f.type="bandpass";f.frequency.value=2300+Math.random()*1000;f.Q.value=14;
 o.type="square";o.frequency.value=2400;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.018,t+.003);g.gain.exponentialRampToValueAtTime(.0001,t+.05);
 o.connect(f);f.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.09);}catch(e){}}
function ascServo(){if(!AUD.ctx||S.ui.mute||!ascOn(4))return;
 const c=AUD.ctx,t=c.currentTime,b=bandOf(S.ruido||0),dur=.15+Math.random()*.12,pico=b>=5?.028:.019;
 try{const g=c.createGain(),f=c.createBiquadFilter(),o=c.createOscillator();
  f.type="bandpass";f.Q.value=3.2;f.frequency.setValueAtTime(650,t);
  f.frequency.linearRampToValueAtTime(1800,t+dur*.5);f.frequency.linearRampToValueAtTime(600,t+dur);
  o.type="sawtooth";o.frequency.setValueAtTime(150+Math.random()*60,t);
  o.frequency.linearRampToValueAtTime(500+Math.random()*230,t+dur*.45);
  o.frequency.linearRampToValueAtTime(230,t+dur); /* sobe rápido, freia: o motor achando a posição */
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(pico,t+.012);
  g.gain.setValueAtTime(pico,t+dur-.03);g.gain.exponentialRampToValueAtTime(.0001,t+dur+.06);
  o.connect(f);f.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur+.12);
  if(b>=5)ascClick(t+dur+.02);}catch(e){}}
function ascAudOff(){clearTimeout(AUD.atimer);AUD.atimer=null;AUD.aon=false;
 if(!AUD.ctx||!AUD.agn)return;try{const t=AUD.ctx.currentTime;
  AUD.agn.gain.cancelScheduledValues(t);AUD.agn.gain.setTargetAtTime(0,t,.5);}catch(e){}}
function ascAudTick(){if(!AUD.aon)return;const b=bandOf(S.ruido||0);
 ascServo();
 AUD.atimer=setTimeout(ascAudTick,(b>=5?5+Math.random()*7:8+Math.random()*10)*1000);}
function ascAudSync(want,b){
 if(!want||!AUD.gest)return ascAudOff();
 if(!audBuild())return;
 if(AUD.ctx.state==="suspended")AUD.ctx.resume().catch(()=>{});
 try{const t=AUD.ctx.currentTime;AUD.agn.gain.cancelScheduledValues(t);
  AUD.agn.gain.setTargetAtTime(ascLvl(b),t,1.6);}catch(e){}
 if(!AUD.aon){AUD.aon=true;AUD.atimer=setTimeout(ascAudTick,(5+Math.random()*7)*1000);}}

/* sair do Ascensão (ou calmar) apaga timers, overlays, classes e o zumbido —
   o travamento em si é CSS por data-el, então volta ao movimento suave sozinho */
function ascSync(){const b=bandOf(S.ruido||0),on=ascOn(1);
 if(!on)ascLandClear();
 if(on&&b>=4){if(!_pkT)peelSched();}else{clearTimeout(_pkT);_pkT=null;peelClear();}
 if(on&&b>=5){if(!_jmT)jamSched();}else{clearTimeout(_jmT);_jmT=null;jamClear();}
 ascAudSync(on&&b>=4&&!S.ui.mute,b);}

/* ============ PRESENÇA / INTRUSÃO — elemento Pacto ============
   os outros cinco DECORAM a tela. o Pacto invade a conversa: ele responde ao que você acabou
   de fazer, oferece, e no ápice te chama pelo nome. o medo é ter alguém do outro lado.

   CONTRATO DE SEGURANÇA — vale para tudo que está abaixo desta linha, com UMA exceção nomeada:
   nada aqui muta S, rouba foco ou escreve no .value de qualquer input/textarea. o botão que
   "pede clique" é box-shadow e nada mais: se você clicar, roda o onclick normal dele, sem nada
   extra. o texto que "se completa" é uma div sobreposta que se remove sozinha. o número que
   "hesita" é uma div opaca por cima do campo, com o número real intacto embaixo.

   A EXCEÇÃO (Lei do Consentimento dramatizada): o SEQUESTRO DO CONSENTIMENTO, lá no fim deste
   bloco, escreve de verdade — e é a única coisa neste arquivo que escreve. só na banda 5, uma
   vez a cada 60-90s, por 3-5s, e SÓ no único campo de texto livre que já estava em foco
   recebendo as suas teclas. nunca em número, nunca em contador de jogo, nunca em dois campos,
   nunca em S direto. bandas 1-4 continuam 100% ilusão: ele PREFERE que você aceite. */
const pacOn=min=>S.elem==="pac"&&bandOf(S.ruido||0)>=(min||1)&&!S.ui.calm&&!RM()&&!document.hidden;
const pacModal=()=>$("modal").classList.contains("on");
/* nunca sobre o que está sob o cursor nem sobre o que está em edição */
const pacLivre=el=>!el.matches(":hover")&&!(document.activeElement&&(el===document.activeElement||el.contains(document.activeElement)));

/* --- o nome: lido no instante da fala (o usuário pode trocá-lo agora), nunca cacheado --- */
function pacNome(){return((S.nome||"").trim()||(S.jogador||"").trim()).slice(0,24);}
/* sem nome nenhum: o vocativo do fim cai fora (soaria truncado) e o do começo vira "você" */
function pacTx(tx){if(tx.indexOf("{nome}")<0)return tx;
 const n=pacNome();if(n)return tx.replace(/\{nome\}/g,n);
 return tx.replace(/ *, *\{nome\}/g,"").replace(/\{nome\}/g,"você");}

/* --- parte 1: a reação. o sussurro do Pacto vem LOGO DEPOIS de você fazer algo, como se
   a presença estivesse respondendo — e não no compasso frio de um timer --- */
/* last começa muito no passado: a carência não deve valer para a PRIMEIRA reação da sessão */
let PACR={bound:false,last:-1e9,t:null};
function pacSpeak(){const b=bandOf(S.ruido||0),e=ELM("pac");if(!e)return;
 const lst=susOf(e,b);
 showWhisper(pacTx(lst[Math.floor(Math.random()*lst.length)]),(8+Math.random()*70)+"%",(10+Math.random()*75)+"%");
 if(b>=4&&Math.random()<.5)pacMurmur();}
function pacReact(){if(!pacOn(2)||S.ui.mute||PACR.t)return;
 const now=performance.now();
 if(now-PACR.last<9000)return; /* nem toda interação vira resposta: senão vira tique, não presença */
 if(Math.random()>=(bandOf(S.ruido||0)>=4?.5:.3))return;
 PACR.last=now;
 PACR.t=setTimeout(()=>{PACR.t=null;if(pacOn(2)&&!S.ui.mute)pacSpeak();},1000+Math.random()*1000);}
function pacBind(on){if(on===PACR.bound)return;PACR.bound=on;
 const m=on?"addEventListener":"removeEventListener";
 document[m]("pointerdown",pacReact,{capture:true,passive:true});
 document[m]("focusout",pacReact,{capture:true,passive:true});}

/* --- parte 2: o texto que se completa. fantasma SOBREPOSTO ao fim do que você escreveu —
   nunca entra no campo, nunca altera o valor, nunca dispara evento --- */
const PAC_SUG=["…e você aceitou","…como combinamos","…o preço já foi pago","…não foi?","…eu lembro disso"];
let _pacTb=false,_sugT=null,_sugRm=null,_sugEl=null,_sugLast=-1e9,_pacKey=0,_mcx=null;
/* medida de texto num canvas fora da tela: sem reflow, sem nó extra no documento */
function pacTextW(cs,s){try{if(!_mcx)_mcx=document.createElement("canvas").getContext("2d");
 _mcx.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
 return _mcx.measureText(s).width;}catch(e){return -1;}}
function pacSugClear(){clearTimeout(_sugRm);_sugRm=null;
 if(_sugEl&&_sugEl.parentNode)_sugEl.parentNode.removeChild(_sugEl);_sugEl=null;}
/* cada tecla/input REARMA a espera: a sugestão só nasce depois que você para de verdade */
function pacType(e){const t=e.target;if(!TXIN(t))return;
 _pacKey=performance.now();clearTimeout(_sugT);_sugT=null;
 if(!pacOn(3))return;
 /* a confiança dele cresce com a banda: na 3 ele espera você parar de verdade, na 5 ele quase
    não espera — é a mesma oferta, feita cada vez mais perto do seu ouvido */
 const b=bandOf(S.ruido||0);
 _sugT=setTimeout(()=>{_sugT=null;pacSuggest(t);},(b>=5?1500:b>=4?2000:2600)+Math.random()*1500);}
function pacTypeBind(on){if(on===_pacTb)return;_pacTb=on;
 const m=on?"addEventListener":"removeEventListener";
 document[m]("input",pacType,{capture:true,passive:true});
 document[m]("keydown",pacType,{capture:true,passive:true});
 if(!on){clearTimeout(_sugT);_sugT=null;pacSugClear();}}
function pacSuggest(t){pacSugClear();
 if(!pacOn(3)||!t||!t.isConnected||pacModal())return;
 if(performance.now()-_pacKey<2000)return;   /* voltou a digitar: a presença não interrompe */
 const b=bandOf(S.ruido||0);
 /* carência e chance por banda: raro na 3, insistente na 5 — e ainda assim só oferta */
 if(performance.now()-_sugLast<(b>=5?13000:b>=4?19000:28000))return;
 if((t.value||"").trim().length<3||Math.random()>=(b>=5?.5:b>=4?.36:.24))return;
 const r=t.getBoundingClientRect();
 if(r.width<70||r.height<12||r.bottom<24||r.top>innerHeight-24)return;
 const cs=getComputedStyle(t),fs=parseFloat(cs.fontSize)||14;
 let x=r.left+8,y=r.bottom+1; /* padrão (e único caso da textarea): flutuando sob o campo */
 if(t.tagName==="INPUT"){ /* uma linha só: dá para medir e encostar no fim do que foi escrito */
  const w=pacTextW(cs,t.value||"");
  const px=r.left+(parseFloat(cs.paddingLeft)||0)+(parseFloat(cs.borderLeftWidth)||0)+w-(t.scrollLeft||0)+5;
  /* medida suspeita (fonte que o canvas não aceitou) cai no fantasma flutuante, sem encavalar */
  if(w>0&&px>r.left&&px<r.right-40){x=px;y=r.top+(r.height-fs*1.25)/2;}}
 _sugLast=performance.now();
 const d=document.createElement("div");d.className="pac-sug";
 d.style.cssText=`left:${Math.round(x)}px;top:${Math.round(y)}px;font-size:${cs.fontSize};`+
  `font-family:${cs.fontFamily};max-width:${Math.max(80,Math.round(innerWidth-x-12))}px`;
 d.textContent=PAC_SUG[Math.floor(Math.random()*PAC_SUG.length)];
 document.body.appendChild(d);_sugEl=d;
 _sugRm=setTimeout(pacSugClear,1500);}

/* --- parte 3: a autonomia simulada. três micro-intrusões, nenhuma delas executa ação --- */
let _autoT=null,_begEl=null,_begRm=null,_carEl=null,_carRm=null,_hesEl=null,_hesRm=null;
function pacBegClear(){clearTimeout(_begRm);_begRm=null;
 if(_begEl){_begEl.classList.remove("pac-beg");_begEl=null;}}
function pacCarClear(){clearTimeout(_carRm);_carRm=null;
 if(_carEl&&_carEl.parentNode)_carEl.parentNode.removeChild(_carEl);_carEl=null;}
function pacHesClear(){clearTimeout(_hesRm);_hesRm=null;
 if(_hesEl&&_hesEl.parentNode)_hesEl.parentNode.removeChild(_hesEl);_hesEl=null;}
function pacAutoClear(){pacBegClear();pacCarClear();pacHesClear();}
/* o botão que pede clique: só stepper e aba — nada destrutivo. e é classe de brilho, mais nada:
   ignorá-lo não faz nada, clicá-lo faz exatamente o que aquele botão sempre fez */
function pacBeg(){const out=[];
 document.querySelectorAll(".rec .stp,.tabs button").forEach(el=>{
  if(!pacLivre(el))return;const r=el.getBoundingClientRect();
  if(r.width<14||r.top<12||r.bottom>innerHeight-12)return;out.push(el);});
 if(!out.length)return;
 _begEl=out[Math.floor(Math.random()*out.length)];_begEl.classList.add("pac-beg");
 _begRm=setTimeout(pacBegClear,2050);}
/* o cursor fantasma: um caret desenhado num campo VAZIO que ninguém está usando.
   é um span sobre a tela — o foco real do usuário fica onde ele deixou */
function pacCaret(){const out=[];
 document.querySelectorAll("input[type=text],textarea").forEach(el=>{
  if(el.value||!pacLivre(el))return;const r=el.getBoundingClientRect();
  if(r.width<90||r.height<14||r.top<12||r.bottom>innerHeight-12)return;
  out.push({x:r.left+10,y:r.top+Math.min(9,Math.max(3,(r.height-16)/2))});});
 if(!out.length)return;
 const a=out[Math.floor(Math.random()*out.length)],d=document.createElement("span");
 d.className="pac-caret";d.style.cssText=`left:${Math.round(a.x)}px;top:${Math.round(a.y)}px`;
 d.textContent="|";
 document.body.appendChild(d);_carEl=d;
 _carRm=setTimeout(pacCarClear,2100);}
/* o número que hesita: 150ms de div opaca por cima, com o valor ±1. o input embaixo segue
   com o número certo o tempo todo — em nenhum momento S nem .value são tocados */
function pacHesita(){const out=[];
 document.querySelectorAll(".attr input[type=number],.rec .rv input[type=number]").forEach(el=>{
  if(!pacLivre(el))return;
  const v=parseInt(el.value,10);if(el.value===""||isNaN(v))return;
  const r=el.getBoundingClientRect();
  if(r.width<26||r.height<14||r.top<12||r.bottom>innerHeight-12)return;
  out.push([el,r,v]);});
 if(!out.length)return;
 const p=out[Math.floor(Math.random()*out.length)],cs=getComputedStyle(p[0]),r=p[1];
 const d=document.createElement("div");d.className="pac-hes";
 d.style.cssText=`left:${r.left}px;top:${r.top}px;width:${Math.ceil(r.width)}px;height:${Math.ceil(r.height)}px;`+
  `background:${bgOf(p[0])};color:${cs.color};font-family:${cs.fontFamily};font-size:${cs.fontSize};font-weight:${cs.fontWeight}`;
 d.textContent=String(p[2]+(Math.random()<.5?1:-1));
 document.body.appendChild(d);_hesEl=d;
 _hesRm=setTimeout(pacHesClear,150);}
function pacAuto(){pacAutoClear();
 if(!pacOn(4)||pacModal())return;
 const r=Math.random();if(r<.4)pacBeg();else if(r<.72)pacCaret();else pacHesita();}
/* o intervalo é lido a cada rearme, então subir de banda aperta o cerco sem religar nada */
function autoSched(){clearTimeout(_autoT);const b=bandOf(S.ruido||0),base=b>=5?11000:(b>=4?15000:20000);
 _autoT=setTimeout(()=>{pacAuto();autoSched();},base+Math.random()*base);}

/* --- parte 5: o som de NÃO ESTAR SOZINHO. a respiração vive no grafo (audBuild); aqui fica
   o nível por banda e o murmúrio — a resposta baixa demais para se entender --- */
const pacLvl=b=>b>=5?.034:.02;
/* dois ou três pulsos graves com cadência de sílabas: a forma da fala, sem palavra nenhuma */
function pacMurmur(){if(!AUD.ctx||S.ui.mute||!pacOn(4))return;
 const c=AUD.ctx,b=bandOf(S.ruido||0),n=2+Math.floor(Math.random()*2);
 try{const g=c.createGain();g.gain.value=0;
  const f=c.createBiquadFilter();f.type="lowpass";f.frequency.value=340;f.Q.value=.8;
  const o=c.createOscillator();o.type="sawtooth";
  o.connect(f);f.connect(g);g.connect(c.destination);
  let t=c.currentTime+.05;const lvl=b>=5?.05:.034;o.start(t-.03);
  for(let i=0;i<n;i++){const d=.12+Math.random()*.1;
   o.frequency.setValueAtTime(78+Math.random()*30,t);
   o.frequency.linearRampToValueAtTime(60+Math.random()*22,t+d); /* a sílaba caindo */
   g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(lvl,t+.05);
   g.gain.setValueAtTime(lvl*.85,t+d-.02);g.gain.exponentialRampToValueAtTime(.0001,t+d+.07);
   t+=d+.07+Math.random()*.07;}
  o.stop(t+.25);}catch(e){}}
function pacAudOff(){clearTimeout(AUD.ptimer);AUD.ptimer=null;AUD.pon=false;
 if(!AUD.ctx||!AUD.pgn)return;try{const t=AUD.ctx.currentTime;
  AUD.pgn.gain.cancelScheduledValues(t);AUD.pgn.gain.setTargetAtTime(0,t,.7);}catch(e){}}
function pacAudTick(){if(!AUD.pon)return;const b=bandOf(S.ruido||0);
 pacMurmur();
 AUD.ptimer=setTimeout(pacAudTick,(b>=5?15+Math.random()*12:20+Math.random()*15)*1000);}
function pacAudSync(want,b){
 if(!want||!AUD.gest)return pacAudOff();
 if(!audBuild())return;
 if(AUD.ctx.state==="suspended")AUD.ctx.resume().catch(()=>{});
 try{const t=AUD.ctx.currentTime;AUD.pgn.gain.cancelScheduledValues(t);
  AUD.pgn.gain.setTargetAtTime(pacLvl(b),t,2.2);}catch(e){}  /* na banda 5 ela chega mais perto */
 if(!AUD.pon){AUD.pon=true;AUD.ptimer=setTimeout(pacAudTick,(8+Math.random()*10)*1000);}}
/* a pena: um risco de tinta no papel — dois ou três traços de ruído num passa-banda que DESCE,
   com o peso grave da palma apoiando por baixo. sem transiente seco: não é carimbo batido,
   é alguém assinando devagar do outro lado da mesa */
function pacPena(){if(!AUD.ctx||S.ui.mute||!pacOn(5))return;
 const c=AUD.ctx;
 try{const n=Math.floor(c.sampleRate*.9),bf=c.createBuffer(1,n,c.sampleRate),ch=bf.getChannelData(0);
  for(let i=0;i<n;i++)ch[i]=(Math.random()*2-1)*.5;
  const s=c.createBufferSource();s.buffer=bf;
  const f=c.createBiquadFilter();f.type="bandpass";f.Q.value=2.4;
  const g=c.createGain();g.gain.value=0;
  s.connect(f);f.connect(g);g.connect(c.destination);
  let t=c.currentTime+.03;s.start(t);
  const k=2+Math.floor(Math.random()*2);
  for(let i=0;i<k;i++){const d=.09+Math.random()*.07;
   f.frequency.setValueAtTime(2500+Math.random()*900,t);
   f.frequency.exponentialRampToValueAtTime(880+Math.random()*320,t+d);
   g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.021,t+d*.38);
   g.gain.linearRampToValueAtTime(.0001,t+d);
   t+=d+.05+Math.random()*.05;}
  s.stop(t+.1);
  const o=c.createOscillator();o.type="sine";o.frequency.value=66;
  const og=c.createGain();og.gain.value=0;o.connect(og);og.connect(c.destination);
  const t0=c.currentTime+.02;o.start(t0);
  og.gain.setValueAtTime(0,t0);og.gain.linearRampToValueAtTime(.03,t0+.2);
  og.gain.exponentialRampToValueAtTime(.0001,t0+.8);o.stop(t0+.85);}catch(e){}}

/* ================= O CORPO DO PACTO: a mão e a tinta no #fx-pact =================
   até aqui o Pacto era voz e oferta. o que faltava era CORPO: uma mão de dedos longos que se
   forma na borda de um painel, dobra a segunda junta para o lado errado e fica ali, a um
   milímetro de tocar — e a assinatura a pena que ele escreve ao lado dela e deixa secar.
   geometria toda em JS (Path2D), canvas próprio repintado só quando algo muda (PACX.dirty).

   ele NÃO é bestial: nada aqui salta, pisca nem ataca. tudo se forma devagar, espera e recua.
   quanto mais alta a banda, mais LENTO e mais confiante — o tempo está do lado dele.

   REGRA SAGRADA (a mesma do jardim): onde você está, ele não chega. a zona proibida é um raio
   em volta do cursor + o retângulo do campo em foco, e a mão inteira é testada contra ela
   antes de nascer. o canvas é pointer-events:none e nunca recebe clique. */
const PCAP=[0,1,1,1,2,3];                     /* mãos simultâneas por banda */
const PIV=[0,46000,38000,25000,15000,8500];   /* intervalo-base entre aparições */
const PFL=[.88,1,.97,.82];                    /* índice, médio, anelar, mínimo: não é um pente */
const PACX={cv:null,cx:null,W:0,H:0,on:false,dirty:false,hs:[],ik:[],mk:[],
 mx:-1e4,my:-1e4,mt:-1e9,zr:104,fz:null,fzt:0,lt:0,hT:null};
addEventListener("mousemove",e=>{if(!PACX.on)return;
 PACX.mx=e.clientX;PACX.my=e.clientY;PACX.mt=performance.now();},{passive:true});
/* a mancha é ancorada no PAINEL, não na tela: rolar move a marca, e move junto com o painel */
addEventListener("scroll",()=>{if(PACX.on&&PACX.mk.length)PACX.dirty=true;},{passive:true});

/* --- a zona proibida: testada contra o retângulo TODO da mão, não contra um ponto.
   o Pacto ainda não é um ClimateEffect, mas já usa a regra 3 da base — PACX carrega os
   mesmos campos (mx/my/mt/zr/fz) que climForbBox espera --- */
function pacForbBox(o){return climForbBox(PACX,o);}
/* a cor do tema, escurecida por k: regra 2 da base, com a queda para o vermelho do Pacto */
function pacCor(k,a){return climCor(k,a,"#c13a52");}
/* PRNG semeado: a mancha precisa ser redesenhada IGUAL a cada repintura, então a geometria
   dela não pode sair de Math.random — sai de uma semente guardada na própria linha */
const pacRnd=s=>()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296;};
/* a fita: mesmo truque do caule das vinhas (polígono preenchido, espessura variável dentro de
   UM Path2D). vinRibbon só lê .pts, então serve para dedo e para tinta sem cópia nenhuma */
const pacFita=P=>vinRibbon({pts:P},P.length);
/* corta a corrente numa fração, interpolando a última ponta: é o que faz o dedo CRESCER em vez
   de aparecer ponto a ponto, e o que faz a tinta ser ESCRITA em vez de surgir pronta */
function pacCorte(P,f){const n=P.length;
 if(f>=1)return P;
 const e=1+(n-1)*(f<0?0:f),k=Math.floor(e),r=e-k;
 if(k<2)return null;
 const Q=P.slice(0,k);
 if(r>.03&&k<n){const a=P[k-1],b=P[k];
  Q.push({x:a.x+(b.x-a.x)*r,y:a.y+(b.y-a.y)*r,w:Math.max(.3,(a.w+(b.w-a.w)*r)*.85)});}
 return Q;}

/* --- o dedo: três falanges. a PRIMEIRA junta dobra para onde deveria; a SEGUNDA dobra para o
   lado errado, e a terceira continua nessa direção impossível. de propósito sutil: o que
   incomoda é levar dois segundos para entender por que aquela mão está errada --- */
function pacDedo(x,y,a,L,w0){
 /* a dobra errada é MODESTA de propósito: passando de ~35° a mão vira garra de bicho, e o
    Pacto não é bestial. o incômodo tem que vir da direção, não do exagero */
 const seg=[.40,.34,.26],b=[.10+Math.random()*.10,-(.32+Math.random()*.22),-(.09+Math.random()*.15)];
 const P=[{x,y,w:w0}];let ca=a,cx=x,cy=y,acc=0;
 for(let s=0;s<3;s++){ca+=b[s];const ln=L*seg[s];
  for(let i=0;i<3;i++){cx+=Math.cos(ca)*ln/3;cy+=Math.sin(ca)*ln/3;acc+=ln/3;
   P.push({x:cx,y:cy,w:Math.max(.5,w0*(1-.62*acc/L))});}}
 return P;}
/* a mão em espaço LOCAL, apontando para +x: palma em cunha (pulso fino, dorso largo), quatro
   dedos na borda dela e o polegar saindo de baixo. na banda 1-2 fica só a falange da ponta */
function pacMaoGeo(h){const L=h.L,PW=L*.36,PL=L*.5,ch=[];
 if(!h.tip)ch.push([{x:-L*.14,y:0,w:PW*.42},{x:PL*.46,y:0,w:PW*.64},{x:PL,y:0,w:PW*.54}]);
 const nf=h.tip?(1+(Math.random()<.35?1:0)):4;
 for(let i=0;i<nf;i++){const u=nf>1?i/(nf-1):.42;
  const P=pacDedo(PL,(u-.5)*PW*.88,(u-.5)*.28+(Math.random()-.5)*.08,
   L*(h.tip?1:PFL[i])*(.94+Math.random()*.12),L*.062);
  ch.push(h.tip?P.slice(6):P);}
 if(!h.tip)ch.push(pacDedo(PL*.34,PW*.58,.72+Math.random()*.16,L*.6,L*.07));
 return ch;}
/* o retângulo que a mão ocupa NA TELA: bbox local com os quatro cantos girados */
function pacBBox(h){let l=1e9,t=1e9,r=-1e9,b=-1e9;
 for(const P of h.ch)for(const p of P){
  if(p.x<l)l=p.x;if(p.x>r)r=p.x;if(p.y<t)t=p.y;if(p.y>b)b=p.y;}
 const co=Math.cos(h.a),si=Math.sin(h.a),X=[],Y=[],C=[[l,t],[r,t],[r,b],[l,b]];
 for(const q of C){X.push(h.x+q[0]*co-q[1]*si);Y.push(h.y+q[0]*si+q[1]*co);}
 return {l:Math.min.apply(null,X),r:Math.max.apply(null,X),
  t:Math.min.apply(null,Y),b:Math.max.apply(null,Y)};}

/* --- onde ela aparece: na BORDA de um painel, com a raiz fora e a ponta entrando uns 14px.
   não no meio da tela: ela vem de fora, como quem se apoia na mesa para alcançar a folha --- */
function pacPaineis(){const out=[];
 document.querySelectorAll(".wrap .panel").forEach(el=>{const r=el.getBoundingClientRect();
  if(r.width<140||r.height<54)return;
  if(r.bottom<50||r.top>innerHeight-50)return;
  out.push({el,r});});
 return out;}
function pacBorda(p,R,evit){const r=p.r;
 const jx=r.left+r.width*(.22+Math.random()*.56),jy=r.top+r.height*(.24+Math.random()*.52);
 const cand=[{x:r.left-R+14,y:jy,a:0,mx:r.left,my:jy},
  {x:r.right+R-14,y:jy,a:Math.PI,mx:r.right,my:jy},
  {x:jx,y:r.top-R+14,a:Math.PI/2,mx:jx,my:r.top},
  {x:jx,y:r.bottom+R-14,a:-Math.PI/2,mx:jx,my:r.bottom}];
 /* borda sem espaço nasce sem palma, e mão por cima do cabeçalho não é mão: é mancha. sobram
    as bordas onde o braço realmente cabe — e a lateral, que é por onde se alcança uma folha,
    entra sorteada em dobro */
 let out=cand.filter(o=>o.x>-R*.35&&o.x<PACX.W+R*.35&&o.y>70&&o.y<PACX.H-16);
 if(!out.length)out=cand.filter(o=>o.x>-R*.6&&o.x<PACX.W+R*.6&&o.y>-R*.6&&o.y<PACX.H+R*.6);
 if(!out.length)out=cand;
 const pes=[];for(const o of out){pes.push(o);if(o.a===0||o.a===Math.PI)pes.push(o);}
 out=pes;
 /* durante o sequestro há um retângulo a evitar (o campo que você está usando): ele pega a
    borda MAIS LONGE dele — os dedos tocam o painel, nunca a zona onde você digita */
 if(evit){const cx=(evit.l+evit.r)/2,cy=(evit.t+evit.b)/2;let bo=out[0],bd=-1;
  for(const o of out){const dx=o.mx-cx,dy=o.my-cy,d=dx*dx+dy*dy;if(d>bd){bd=d;bo=o;}}
  return bo;}
 return out[Math.floor(Math.random()*out.length)];}
/* um canto da tela, para a ponta de dedo das bandas 1-2: raiz fora, apontando para o miolo */
function pacCanto(R){const r=Math.random,q=Math.floor(r()*4),lx=(q===0||q===3),ty=(q<2);
 const x=lx?-R*.35:PACX.W+R*.35,y=ty?-R*.25:PACX.H+R*.25;
 return {x,y,a:Math.atan2(PACX.H*.5-y,PACX.W*.5-x)+(r()-.5)*.5};}

/* nasce: cinco tentativas de achar lugar longe de você. a mão do sequestro (pin) é a única que
   ignora a zona proibida — mas mesmo ela escolhe a borda mais longe do campo em uso */
function pacMaoNova(pin,evit,pan,dur){
 if(!PACX.on||!PACX.cx)return null;
 const b=bandOf(S.ruido||0);
 if(!pin){let viv=0;for(const h of PACX.hs)if(h.ph!==2)viv++;
  if(viv>=PCAP[b])return null;}
 const tip=!pin&&b<=2,L=tip?(20+Math.random()*13):(38+b*7+Math.random()*20),R=L*1.52;
 for(let k=0;k<5;k++){
  let pos=null,pel=null;
  if(tip)pos=pacCanto(R);
  else{let ps;
   if(pan)ps=[{el:pan,r:pan.getBoundingClientRect()}];
   else{ps=pacPaineis();if(!ps.length)return null;}
   const p=ps[Math.floor(Math.random()*ps.length)];
   if(!pin&&!pacLivre(p.el))continue;   /* painel sob o cursor ou em edição: não é a vez dele */
   pos=pacBorda(p,R,evit);pel=p.el;}
  const h={x:pos.x,y:pos.y,a:pos.a+(Math.random()-.5)*(tip?.5:.22),L,tip,pin:!!pin,pan:pel,
   ch:null,paths:null,pk:-1,grad:null,ph:0,t:0,
   gr:pin?(380+Math.random()*180):(tip?(340+Math.random()*260):(1000+Math.random()*700+(b>=5?600:0))),
   hd:pin?(dur||4000):(tip?(300+Math.random()*500):(1800+b*700+Math.random()*1800)),
   fd:tip?(500+Math.random()*300):(900+Math.random()*600)};
  h.ch=pacMaoGeo(h);
  if(!pin&&pacForbBox(pacBBox(h)))continue;
  PACX.hs.push(h);PACX.dirty=true;return h;}
 return null;}
function pacMaoSched(prim){clearTimeout(PACX.hT);PACX.hT=null;
 if(!PACX.on)return;
 const iv=(PIV[bandOf(S.ruido||0)]||30000)*(prim?.22:(.55+Math.random()*.9));
 PACX.hT=setTimeout(()=>{PACX.hT=null;
  if(!pacModal())pacMaoNova(false,null,null,0);
  pacMaoSched();},iv);}
/* a mão desenhada: a base é quase preta (silhueta), a ponta dos dedos se perde no ar. o
   gradiente é criado em espaço local e pintado sob translate+rotate, então acompanha a mão */
function pacMaoDraw(c,h){
 let p=1,al=1,rec=1;
 if(h.ph===0){p=Math.min(1,h.t/h.gr);al=Math.min(1,p*1.5);}
 else if(h.ph===2){const q=Math.min(1,h.t/h.fd);al=1-q;rec=1-q*.45;}  /* recua enquanto se desfaz */
 if(al<=.012)return;
 const n=h.ch.length,key=Math.round(p*rec*120);
 if(h.pk!==key){h.pk=key;h.paths=[];
  const sp=.13,esc=Math.max(.2,1-(n-1)*sp);   /* os dedos crescem UM A UM, não todos juntos */
  for(let i=0;i<n;i++){const f=(p*rec-i*sp)/esc;
   const Q=pacCorte(h.ch[i],f<0?0:(f>1?1:f));
   h.paths.push(Q?pacFita(Q):null);}}
 if(!h.grad){const g=c.createLinearGradient(0,0,h.L*1.6,0);
  g.addColorStop(0,pacCor(.34,.9));g.addColorStop(.55,pacCor(.72,.62));g.addColorStop(1,pacCor(1,.2));
  h.grad=g;}
 c.save();c.translate(h.x,h.y);c.rotate(h.a);
 c.globalAlpha=al*(h.tip?.55:.66);c.fillStyle=h.grad;
 for(const q of h.paths)if(q)c.fill(q);
 c.restore();c.globalAlpha=1;}

/* --- A TINTA: o gesto de assinar, nunca palavra nenhuma. um traço cursivo com pressão de pena
   (engrossa na descida, afina na subida), uma laçada no meio e o rabisco arrastado do fim.
   escreve em ~1s e depois SECA — a tinta some da folha como se nunca tivesse existido --- */
function pacSigPts(rnd,W,H,w0){
 /* 44 pontos: menos que isso e a fita mostra as facetas — assinatura tem que CORRER, não
    serrar. a segunda frequência é discreta pelo mesmo motivo */
 /* f1 é quantas subidas e descidas cabem na largura: com 2 ou 3 sai uma onda, com 3 a 5 sai
    letra. é essa frequência que separa "rabisco" de "alguém escrevendo um nome" */
 const n=44,f1=2.9+rnd()*1.9,f2=3.4+rnd()*2.2,p1=rnd()*6.2832,p2=rnd()*6.2832,
  lac=rnd()<.7,lu=.26+rnd()*.3,inc=(rnd()-.5)*.5,P=[];
 for(let i=0;i<n;i++){const u=i/(n-1),an=p1+u*6.2832*f1;
  let x=u*W,y=Math.sin(an)*H*.46+Math.sin(p2+u*6.2832*f2)*H*.12+(u-.5)*H*inc;
  if(lac){const d=(u-lu)/.14;
   if(d>-1&&d<1){const q=(d+1)*3.1416;x+=Math.sin(q)*W*.05;y+=(1-Math.cos(q))*H*.5;}}
  /* pressão de pena: engrossa na descida, afina na subida — e nunca chega a sumir no meio */
  const pr=Math.max(0,Math.cos(an)),tp=Math.min(1,Math.min(u,1-u)*7);
  P.push({x,y,w:Math.max(.3,w0*(.5+pr*.5)*(.3+tp*.7))});}
 const ly=P[n-1].y;
 for(let i=1;i<=5;i++)P.push({x:W+i*W*.07,y:ly+Math.sin(i*.9)*H*.07,w:Math.max(.25,w0*(.5-i*.09))});
 return P;}
function pacInkNova(h){
 const R=h.L*1.52,co=Math.cos(h.a),si=Math.sin(h.a);
 const W=Math.min(146,58+h.L*1.05),H=W*.25;
 /* perto de onde a mão apareceu, e sempre na horizontal: assinatura em pé não é assinatura */
 let x=h.x+co*R*.72-si*h.L*.5-W*.5+(Math.random()-.5)*20;
 let y=h.y+si*R*.72+co*h.L*.5+(Math.random()-.5)*16;
 x=Math.max(10,Math.min(PACX.W-W-10,x));
 y=Math.max(H+10,Math.min(PACX.H-H-10,y));
 PACX.ik.push({x,y,rot:(Math.random()-.5)*.16,ph:0,t:0,path:null,pk:-1,
  P:pacSigPts(pacRnd(Math.floor(Math.random()*1e9)+1),W,H,Math.max(.8,h.L*.026)),
  wr:900+Math.random()*500,dr:800+Math.random()*600});
 PACX.dirty=true;}
function pacInkDraw(c,k){
 const p=k.ph===0?Math.min(1,k.t/k.wr):1;
 const al=k.ph===0?.9:Math.max(0,1-k.t/k.dr)*.9;
 if(al<=.01)return;
 const key=Math.round(p*100);
 if(k.pk!==key){k.pk=key;const Q=pacCorte(k.P,p);k.path=Q?pacFita(Q):null;}
 if(!k.path)return;
 c.save();c.translate(k.x,k.y);c.rotate(k.rot);
 c.globalAlpha=al;c.fillStyle=pacCor(.88,.78);c.fill(k.path);
 c.restore();c.globalAlpha=1;}

/* --- A MANCHA: forçar sempre mancha. depois de cada sequestro fica uma assinatura fantasma no
   canto daquele painel, e cada novo sequestro no MESMO painel sobrepõe outra linha — mais
   densa, mais ilegível, nunca removida. é EFÊMERA: vive só nesta aba do navegador, não entra
   em S nem no localStorage (não é dado de personagem, é o rastro de uma sessão).
   ancorada pela CHAVE do painel (aba + posição + título), porque render() recria os nós. --- */
function pacKey(el){const h=el.querySelector("h2");
 const t=h?h.textContent.replace(/\s+/g," ").trim().slice(0,48):"";
 let i=0,n=el;while((n=n.previousElementSibling))i++;
 return (S.ui.tab||"")+"|"+i+"|"+t;}
function pacMarca(pan){if(!pan)return;
 const k=pacKey(pan);let m=null;
 for(const x of PACX.mk)if(x.k===k)m=x;
 if(!m){m={k,el:pan,rt:0,ls:[]};PACX.mk.push(m);}
 m.el=pan;
 m.ls.push({sd:Math.floor(Math.random()*1e9)+1,dx:(Math.random()-.5)*14,dy:(Math.random()-.5)*7,
  rot:(Math.random()-.5)*.22,sc:.82+Math.random()*.36,al:.22+Math.random()*.09,path:null,pw:0});
 if(m.ls.length>9)m.ls.shift();   /* teto de densidade: mais que isto é borrão, não assinatura */
 PACX.dirty=true;}
function pacMarcaDraw(c,m){
 if(!m.el||!m.el.isConnected){   /* um re-render trocou o nó: reencontra o painel pela chave */
  const t=performance.now();if(t-m.rt<400)return;
  m.rt=t;m.el=null;
  const ps=document.querySelectorAll(".wrap .panel");
  for(const el of ps)if(pacKey(el)===m.k){m.el=el;break;}
  if(!m.el)return;}                /* painel de outra aba: a marca espera você voltar */
 const r=m.el.getBoundingClientRect();
 if(r.width<80||r.bottom<10||r.top>PACX.H)return;
 const W=Math.min(132,r.width*.36),H=W*.19,bx=r.right-W-14,by=r.bottom-12;
 for(const l of m.ls){
  if(!l.path||Math.abs(l.pw-W)>4){l.pw=W;
   l.path=pacFita(pacSigPts(pacRnd(l.sd),W,H,.9));}
  c.save();c.translate(bx+l.dx,by+l.dy);c.rotate(l.rot);c.scale(l.sc,l.sc);
  c.globalAlpha=l.al;c.fillStyle=pacCor(.92,.85);c.fill(l.path);c.restore();}
 c.globalAlpha=1;}

/* --- a repintura: só com PACX.dirty. ordem = mancha (tinta seca, por baixo), mão, tinta --- */
function pacDraw(){const c=PACX.cx;if(!c)return;
 c.clearRect(0,0,PACX.W,PACX.H);
 for(const m of PACX.mk)pacMarcaDraw(c,m);
 for(const h of PACX.hs)pacMaoDraw(c,h);
 for(const k of PACX.ik)pacInkDraw(c,k);}
/* --- o passo por frame: pendurado no fxTick, sem rAF próprio. mão parada e mancha não custam
   nada; só o que está se formando, secando ou recuando paga repintura --- */
function pacTick(t){
 if(!PACX.on||!PACX.cx)return;
 if(PACX.cv.width!==innerWidth||PACX.cv.height!==innerHeight)pacResize();
 const dt=Math.min(60,t-(PACX.lt||t));PACX.lt=t;
 if(t-PACX.fzt>320){PACX.fzt=t;PACX.fz=climFocusZone(22);}
 const b=bandOf(S.ruido||0);let mortas=false,secas=false;
 for(const h of PACX.hs){h.t+=dt;
  if(h.ph===0){PACX.dirty=true;
   if(h.t>=h.gr){h.ph=1;h.t=0;h.pk=-1;
    /* formada a mão, ele assina do lado dela — no ápice, quase sempre */
    if(!h.tip&&Math.random()<(h.pin?.92:(b>=5?.8:(b>=4?.55:.4))))pacInkNova(h);}}
  else if(h.ph===1){ /* a mão do sequestro fica enquanto a janela durar, não pelo relógio dela */
   if(h.t>=h.hd&&!(h.pin&&PACH.el)){h.ph=2;h.t=0;PACX.dirty=true;}}
  else{PACX.dirty=true;if(h.t>=h.fd){h.dead=1;mortas=true;}}}
 if(mortas)PACX.hs=PACX.hs.filter(h=>!h.dead);
 for(const k of PACX.ik){k.t+=dt;PACX.dirty=true;
  if(k.ph===0){if(k.t>=k.wr){k.ph=1;k.t=0;}}
  else if(k.t>=k.dr){k.dead=1;secas=true;}}
 if(secas)PACX.ik=PACX.ik.filter(k=>!k.dead);
 if(PACH.el&&!PACH.el.isConnected)pacHijEnd();  /* o campo saiu do DOM: solta a tecla na hora */
 if(PACX.dirty){PACX.dirty=false;pacDraw();}}
function pacResize(){const cv=PACX.cv;if(!cv)return;
 PACX.W=cv.width=innerWidth;PACX.H=cv.height=innerHeight;
 for(const h of PACX.hs)h.grad=null;
 PACX.dirty=true;}
function pacMount(){const cv=$("fx-pact");if(!cv||!cv.getContext)return false;
 PACX.cv=cv;PACX.cx=cv.getContext("2d");if(!PACX.cx)return false;pacResize();return true;}
/* sair do Pacto: nenhuma mão pendurada, nenhuma tecla presa, nenhuma marca sobrando */
function pacTear(){clearTimeout(PACX.hT);PACX.hT=null;
 pacHijEnd(true);
 PACX.hs=[];PACX.ik=[];PACX.mk=[];PACX.dirty=false;PACX.fz=null;
 if(PACX.cx)PACX.cx.clearRect(0,0,PACX.W,PACX.H);}

/* ================= O SEQUESTRO DO CONSENTIMENTO — só no ápice =================
   a Lei do Consentimento: ele PREFERE que você aceite. bandas 1-4 são oferta e só oferta —
   sussurro, sugestão sobreposta, botão que pede, mão que quase toca. na banda 5, e só nela, ele
   força: uma vez a cada 60-90s, por 3-5s (ou 8-12 teclas, o que vier primeiro), as suas letras
   saem como "eu aceito". e forçar MANCHA — o que ficou escrito fica. nada aqui reverte,
   corrige nem pede desculpa: apagar é trabalho seu. esse é o preço.

   O QUE ELE PODE TOCAR (pacHijOK): um único campo de TEXTO LIVRE dentro de um .panel que já
   estava em foco recebendo as SUAS teclas. contador de jogo é impossível por construção —
   Vida/Fôlego/Sintonia/Lucidez, os máximos, os medidores de maestria, PP e atributos são todos
   input[type=number], e aqui só passa TEXTAREA ou input[type=text]. fora disso ainda caem: o
   que está em modal, a busca de talentos, a lista de dívidas (o dock CONTA dívidas) e os campos
   que comitam em Enter/botão. na dúvida sobre um campo, ele fica de fora.
   A ESCRITA é o caminho normal de qualquer tecla sua: .value do campo focado + um evento input
   (que é o que o oninput da ficha ouve para salvar). nunca S direto, nunca eval, nunca
   innerHTML, nunca um segundo campo.
   E FORA DA JANELA ATIVA nenhuma tecla é interceptada: preventDefault só existe dentro do
   if(PACH.el), e o listener só está no documento na banda 5. */
const PAC_FRAS="eu aceito ";                        /* o espaço faz a frase reiniciar legível */
const PAC_NOHIJ={snIn:1,slotName:1,pieceName:1};    /* comitam em Enter/botão: fora */
let PACH={bound:false,last:-1e9,cd:70000,el:null,i:0,max:0,end:0,t:null,hand:null,pan:null};
function pacHijOK(el){
 if(!el||!el.isConnected||el.disabled||el.readOnly)return false;
 const tg=el.tagName;
 if(tg!=="TEXTAREA"&&!(tg==="INPUT"&&el.type==="text"))return false;
 if(el.inputMode&&/num|dec|tel/i.test(el.inputMode))return false;
 if(el.id&&PAC_NOHIJ[el.id])return false;
 if(el.closest("#modal,.tbar,#divlist"))return false;
 if(!el.closest(".wrap .panel"))return false;
 const r=el.getBoundingClientRect();
 return r.width>60&&r.height>12&&r.bottom>20&&r.top<innerHeight-20;}
/* escreve UMA letra, no lugar da que você digitou, no campo que já estava focado */
function pacHijEscreve(){const el=PACH.el;
 if(!el||!el.isConnected)return void pacHijEnd();
 const ch=PAC_FRAS[PACH.i%PAC_FRAS.length];PACH.i++;
 const v=el.value||"";
 let s=el.selectionStart,e=el.selectionEnd;
 if(typeof s!=="number"||s<0||s>v.length)s=v.length;
 if(typeof e!=="number"||e<s||e>v.length)e=s;
 el.value=v.slice(0,s)+ch+v.slice(e);
 try{el.selectionStart=el.selectionEnd=s+1;}catch(_){}
 try{el.dispatchEvent(new Event("input",{bubbles:true}));}catch(_){}}
function pacHijStart(el){const now=performance.now();
 PACH.el=el;PACH.i=0;PACH.max=8+Math.floor(Math.random()*5);
 PACH.end=now+3000+Math.random()*2000;
 PACH.last=now;PACH.cd=60000+Math.random()*30000;   /* a carência do próximo já é sorteada aqui */
 PACH.pan=el.closest(".wrap .panel");
 clearTimeout(PACH.t);PACH.t=setTimeout(()=>pacHijEnd(),PACH.end-now+40);
 /* e a mão vem para ESTE painel, na borda mais longe do campo: dedos na moldura, não no texto */
 const r=el.getBoundingClientRect();
 PACH.hand=pacMaoNova(true,{l:r.left,t:r.top,r:r.right,b:r.bottom},PACH.pan,PACH.end-now+700);
 pacPena();}
function pacHijTenta(el){
 if(!pacOn(5)||pacModal())return;
 const now=performance.now();
 if(now-PACH.last<PACH.cd)return;      /* nunca dois seguidos: 60-90s de silêncio entre eles */
 if(!pacHijOK(el))return;
 if(Math.random()>=.3)return;          /* nem toda tecla elegível: ele escolhe o momento */
 pacHijStart(el);}
/* o fim da janela: o controle volta na hora, o que ficou fica, e no lugar da mão fica a mancha.
   duro = desmonte (trocou de elemento, calmou, caiu de banda): a mão sai sem recuar. a MANCHA
   fica de qualquer jeito se alguma letra foi escrita — forçar sempre mancha, e cair de banda
   não desfaz o que já aconteceu. (no desmonte total, pacTear limpa as marcas em seguida.) */
function pacHijEnd(duro){clearTimeout(PACH.t);PACH.t=null;
 const pan=PACH.pan,n=PACH.i,h=PACH.hand;
 PACH.el=null;PACH.pan=null;PACH.hand=null;PACH.i=0;PACH.max=0;PACH.end=0;
 if(h&&h.ph!==2&&!duro){h.ph=2;h.t=0;PACX.dirty=true;}
 if(n>0&&pan&&pan.isConnected)pacMarca(pan);}
/* a única tecla que ele pega é a IMPRESSA (key de 1 caractere, sem ctrl/alt/meta). Backspace,
   Tab, Enter, setas, atalhos e IME passam intactos: dá para corrigir e sair a qualquer momento */
function pacHijKey(e){
 if(PACH.el){
  if(e.target!==PACH.el)return void pacHijEnd();       /* mudou de campo: acabou, sem prender nada */
  if(e.ctrlKey||e.metaKey||e.altKey||!e.key||e.key.length!==1)return;
  if(performance.now()>=PACH.end||PACH.i>=PACH.max)return void pacHijEnd();
  e.preventDefault();
  pacHijEscreve();
  if(PACH.i>=PACH.max)pacHijEnd();
  return;}
 if(e.ctrlKey||e.metaKey||e.altKey||!e.key||e.key.length!==1)return;
 pacHijTenta(e.target);}
function pacHijOut(e){if(PACH.el&&e.target===PACH.el)pacHijEnd();}
function pacHijDown(e){if(PACH.el&&e.target!==PACH.el)pacHijEnd();}
function pacHijBind(on){if(on===PACH.bound)return;PACH.bound=on;
 const m=on?"addEventListener":"removeEventListener";
 /* o único listener não-passivo do arquivo: é o que permite o preventDefault da janela ativa */
 document[m]("keydown",pacHijKey,true);
 document[m]("focusout",pacHijOut,{capture:true,passive:true});
 document[m]("pointerdown",pacHijDown,{capture:true,passive:true});
 /* chegar no ápice não é o mesmo que agir: ele espera meia dúzia de dezenas de segundos antes
    da primeira vez (o Math.max preserva a carência de um sequestro recente) */
 if(on)PACH.last=Math.max(PACH.last,performance.now()-PACH.cd+22000+Math.random()*12000);
 else pacHijEnd(true);}

/* sair do Pacto (ou calmar, ou reduzir movimento) desliga listeners, timers, som e TODOS os
   overlays: nenhum caret preso na tela, nenhum número congelado por cima de um campo, nenhuma
   mão no canvas e nenhuma tecla interceptada */
function pacSync(){const b=bandOf(S.ruido||0),on=pacOn(1);
 pacBind(on&&b>=2&&!S.ui.mute);
 if(!(on&&b>=2)||S.ui.mute){clearTimeout(PACR.t);PACR.t=null;}
 pacTypeBind(on&&b>=3);
 if(on&&b>=4){if(!_autoT)autoSched();}else{clearTimeout(_autoT);_autoT=null;pacAutoClear();}
 if(on!==PACX.on){PACX.on=on;
  if(on){if(!pacMount())PACX.on=false;else pacMaoSched(true);}
  else pacTear();}
 else if(on){ /* a banda caiu: o que passa do teto RECUA, não desaparece no ar */
  const cap=PCAP[b];let viv=0;
  for(const h of PACX.hs)if(h.ph!==2)viv++;
  for(const h of PACX.hs){if(viv<=cap)break;
   if(h.ph!==2&&!h.pin){h.ph=2;h.t=0;viv--;PACX.dirty=true;}}}
 pacHijBind(on&&b>=5);   /* fora do ápice o listener não está nem no documento */
 pacAudSync(on&&b>=4&&!S.ui.mute,b);}

/* ============ NOJO / BODY-HORROR — elemento Germe ============
   o coração daqui é O JARDIM (VIN, mais abaixo): vinhas de geometria viva que crescem das
   bordas para dentro em canvas próprio, com folhas, flores que abrem e coisas que espreitam
   entre a folhagem. o musgo, a membrana e a respiração mole continuam em CSS puro — são o
   que dá textura aos painéis, por onde as vinhas passam por trás.
   e o que é REATIVO fica aqui: a cicatriz de quando você arranca texto, o broto que nasce
   dela, o surto de crescimento do ócio, o recuo diante do cursor e o som úmido.
   mesma regra de sempre: overlay pointer-events:none e classe efêmera. nada toca S nem campo. */
/* o gate do elemento é a regra 4 da base, sem cópia local: VIN é o ClimateEffect do Germe */
const gerOn=min=>VIN.active(min);
const gerModal=()=>$("modal").classList.contains("on");

/* --- a cicatriz: você arrancou, e a aresta de baixo do campo abre e fecha por cima disso.
   fica na borda inferior de propósito: o campo em edição nunca é encoberto --- */
let _scEl=null,_scRm=null;
function gerScarClear(){clearTimeout(_scRm);_scRm=null;
 if(_scEl&&_scEl.parentNode)_scEl.parentNode.removeChild(_scEl);_scEl=null;}
function gerScar(d){gerScarClear();
 if(!gerOn(3)||gerModal())return;
 const t=d&&d.el;if(!t||!t.isConnected)return;
 const r=t.getBoundingClientRect();
 if(r.width<60||r.height<12||r.bottom<20||r.top>innerHeight-20)return;
 const h=7,el=document.createElement("div");el.className="ger-scar";
 el.style.cssText=`left:${Math.round(r.left+3)}px;top:${Math.round(r.bottom-h-3)}px;`+
  `width:${Math.round(r.width-6)}px;height:${h}px`;
 document.body.appendChild(el);_scEl=el;
 _scRm=setTimeout(gerScarClear,1300);}

/* ================= O JARDIM: vinhas procedurais no #fx-vines =================
   geometria viva, não CSS nem imagem. cada vinha é uma curva que AVANÇA ponto a ponto de
   uma borda da tela para dentro, virando sozinha por ruído senoidal, ramificando, soltando
   folha e abrindo flor na ponta madura.

   o que faz isto rodar liso é o CICLO DE VIDA. uma vinha nasce CRESCENDO (recalcula a ponta,
   refaz o Path2D); ao chegar no fim vira MADURA e a geometria congela num Path2D cacheado —
   dali em diante ela custa um fill(). e o canvas inteiro só é repintado quando VIN.dirty:
   com tudo maduro e o cursor parado, o jardim custa ZERO por frame.

   REGRA SAGRADA: onde você está, nada cresce. a zona proibida (um raio em volta do cursor +
   o retângulo do campo em foco) é desviada pela ponta que cresce e faz murchar a vinha que
   já estava lá. a ficha continua 100% usável — e o canvas é pointer-events:none. */
const VCAP=[0,3,6,11,17,24];            /* vinhas simultâneas (galhos inclusos) por banda */
const VGRW=[0,2,2,3,4,5];               /* quantas podem estar CRESCENDO ao mesmo tempo */
/* teto duro de pontos: é o custo de uma repintura. está ~25% acima do que o jardim cheio
   de cada banda realmente usa — é rede de segurança, não régua: se ele encostasse toda hora,
   as vinhas amadureceriam cortadas no meio em vez de terminarem onde deviam */
const VPTS=[0,500,900,1500,2100,2800];
/* o jardim É um ClimateEffect: canvas, cursor, zona proibida, gate, loop, teardown e áudio
   vêm da base; o que está declarado aqui embaixo (state e ganchos) é só o que é do Germe.
   os campos compartilhados (cv/cx/W/H/on/dirty/mx/my/mt/zr/fz/fzt/lt) moram no mesmo objeto,
   então todo `VIN.x` do jardim continua sendo o mesmo `VIN.x` de antes */
const VIN=new ClimateEffect({id:"ger",cv:"fx-vines",zr:118,pad:26,
 timers:["budT","lkT"],
 state:{vs:[],budT:null,lkT:null,lk:null,boost:0,pts:0,cull:false,spr:-1e9,blm:-1e9},
 /* já entrou com algo no canto: o jardim nunca começa vazio */
 mount(){vinBudSched();vinLurkSched();vinBud();vinBud();},
 tear(){VIN.vs=[];VIN.lk=null;VIN.pts=0;VIN.boost=0;VIN.cull=false;},
 /* a banda caiu: o que passa do teto vai embora, e abaixo de 3 nada espreita */
 band(b){
  while(VIN.vs.length>VCAP[b]){const v=VIN.vs.shift();VIN.pts-=v.pts.length;VIN.dirty=true;}
  if(VIN.pts<0)VIN.pts=0;
  if(b<3&&VIN.lk){VIN.lk=null;VIN.dirty=true;}},
 step:vinStep,draw:vinDraw,
 /* TERRA MOLHADA + VENTO: o grafo é do audBuild, o nível e a cadência são do Germe */
 aud:{gain:"ggn",flag:"gon",timer:"gtimer",fade:.8,tc:2.2,
  lvl:b=>gerLvl(b),tick:()=>gerAudTick(),first:()=>(6+Math.random()*8)*1000}});
/* Perlin de pobre: três senos de frequências incomensuráveis. o bastante para a ponta virar
   de um jeito que não parece nem reta nem sorteada — parece que ela está PROCURANDO */
const vnz=(s,i)=>Math.sin(s+i*.131)*.54+Math.sin(s*1.73+i*.049)*.33+Math.sin(s*2.91+i*.283)*.13;

/* --- a zona proibida: regra 3 da base --- */
function vinForb(x,y){return VIN.forb(x,y);}

/* --- nascer --- */
function vinPush(o){const b=bandOf(S.ruido||0);
 if(VIN.vs.length>=VCAP[b]||VIN.pts>=VPTS[b])return null;
 /* verdes com variação de matiz E de claridade: chapar tudo numa cor só mataria o volume */
 const hue=o.hue!=null?o.hue+(Math.random()-.5)*10:86+Math.random()*30,lig=24+Math.random()*15;
 const v={pts:[{x:o.x,y:o.y,w:o.w}],a0:o.a,w0:o.w,max:o.max,spd:o.spd||18,dep:o.dep||0,
  seed:Math.random()*97,acc:0,ph:0,lv:[],fl:[],rt:0,side:1,hue,
  lstep:4+Math.floor(Math.random()*3),
  stem:`hsl(${hue.toFixed(0)},32%,${(lig*.72).toFixed(1)}%)`,
  leaf:`hsl(${hue.toFixed(0)},${(30+Math.random()*16).toFixed(0)}%,${lig.toFixed(1)}%)`,
  bx0:o.x,bx1:o.x,by0:o.y,by1:o.y,path:null,lpath:null,ck:-1};
 VIN.vs.push(v);VIN.pts++;VIN.dirty=true;return v;}
/* madura: a geometria congela. daqui em diante o Path2D é reaproveitado a cada repintura.
   e o toco que não vingou (a ponta nasceu em cima de você e parou no primeiro passo) é
   marcado para varrer — senão ele ocuparia uma vaga do teto para sempre, sem desenhar nada */
function vinMature(v){v.ph=1;const b=bandOf(S.ruido||0);
 if(v.pts.length<3){v.dead=1;VIN.cull=true;return false;}
 if(v.pts.length>8&&Math.random()<.2+b*.07)vinFlor(v,v.pts[v.pts.length-1],1.1+Math.random()*.9);
 return false;}
function vinFlor(v,p,dur){if(v.fl.length>2)return;
 v.fl.push({x:p.x,y:p.y,i:v.pts.length-1,t:0,dur,n:5+(Math.random()<.35?1:0),r:3.6+Math.random()*3.4,
  a0:Math.random()*6.2832,
  pc:`hsl(${(v.hue-14).toFixed(0)},${(26+Math.random()*16).toFixed(0)}%,${(54+Math.random()*14).toFixed(0)}%)`,
  cc:`hsl(${(v.hue-24).toFixed(0)},34%,13%)`});
 VIN.dirty=true;}

/* --- crescer: um passo --- */
function vinGrow(v){const P=v.pts,i=P.length,p=P[i-1],b=bandOf(S.ruido||0);
 if(i>=v.max||VIN.pts>=VPTS[b])return vinMature(v);
 let a=v.a0+vnz(v.seed,i)*.86;
 const st=4+Math.random()*1.8;
 let nx=p.x+Math.cos(a)*st,ny=p.y+Math.sin(a)*st;
 /* bateu na sua zona: vira para longe do cursor. três tentativas e, se ainda for em cima de
    você, amadurece ali mesmo. nunca força passagem — este é o contrato da regra sagrada */
 for(let k=0;k<3&&vinForb(nx,ny);k++){
  const fora=Math.atan2(ny-VIN.my,nx-VIN.mx);
  a=a*.32+fora*.68+(Math.random()-.5)*.3;
  nx=p.x+Math.cos(a)*st;ny=p.y+Math.sin(a)*st;}
 if(vinForb(nx,ny))return vinMature(v);
 if(nx<-40||nx>VIN.W+40||ny<-40||ny>VIN.H+40)return vinMature(v);
 const w=Math.max(.5,v.w0*Math.pow(1-i/v.max,.82));
 P.push({x:nx,y:ny,w});VIN.pts++;
 if(nx<v.bx0)v.bx0=nx;if(nx>v.bx1)v.bx1=nx;
 if(ny<v.by0)v.by0=ny;if(ny>v.by1)v.by1=ny;
 if(i>3&&i%v.lstep===0){v.side=-v.side; /* folha, alternando de lado como planta de verdade */
  v.lv.push({i,x:nx,y:ny,a:a+v.side*(.62+Math.random()*.55),s:3.4+Math.random()*4.6+v.w0});}
 /* galho: raro por passo, e no máximo 3 níveis abaixo do tronco — senão isto explode */
 if(v.dep<3&&i>7&&i<v.max*.82&&Math.random()<.03)
  vinPush({x:nx,y:ny,a:a+(Math.random()<.5?-1:1)*(.5+Math.random()*.5),
   max:Math.max(9,Math.round(v.max*(.34+Math.random()*.3))),w:w*.72,spd:v.spd*1.15,
   dep:v.dep+1,hue:v.hue});
 return true;}

/* --- brotar de uma borda: cantos e laterais, que é de onde uma trepadeira sobe --- */
function vinBud(){const b=bandOf(S.ruido||0),W=VIN.W,H=VIN.H,r=Math.random;
 if(VIN.vs.length>=VCAP[b])return;
 let g=0;for(const v of VIN.vs)if(v.ph===0)g++;
 if(g>=VGRW[b])return;
 let o;const e=r();
 if(e<.33)      o={x:-8,    y:H*(.08+r()*.9), a:(r()-.5)*1.15};
 else if(e<.66) o={x:W+8,   y:H*(.08+r()*.9), a:Math.PI+(r()-.5)*1.15};
 else if(e<.92) o={x:W*r(), y:H+8,            a:-Math.PI/2+(r()-.5)*1.2};
 else           o={x:W*r(), y:-8,             a:Math.PI/2+(r()-.5)};
 /* o comprimento é o que faz a invasão: na banda 1 ela morre perto do canto (~130px), na 5
    ela chega ao miolo da tela (~270px de média, e as maiores cruzam metade dela) */
 o.max=Math.round((20+b*15)*(.6+r()*.85));o.w=1.5+b*.3+r()*.5;o.spd=15+r()*11;
 vinPush(o);}
function vinBudSched(){clearTimeout(VIN.budT);VIN.budT=null;
 if(!VIN.on)return;
 const iv=([0,11000,8000,5200,3300,2100][bandOf(S.ruido||0)]||8000)*(.6+Math.random()*.9);
 VIN.budT=setTimeout(()=>{VIN.budT=null;vinBud();vinBudSched();},iv);}

/* --- o recuo: o que está perto do cursor murcha (encolhe da ponta para a base) e rebrota
   quando você para. murcha depressa, volta devagar — reconquistar tem que custar tempo --- */
function vinRecuo(dt){const viva=performance.now()-VIN.mt<3500,R=VIN.zr,R2=R*R;
 for(const v of VIN.vs){let tgt=0;
  if(viva&&v.bx1>VIN.mx-R&&v.bx0<VIN.mx+R&&v.by1>VIN.my-R&&v.by0<VIN.my+R){
   let d2=1e9;const P=v.pts;
   for(let i=P.length-1;i>=0;i-=2){const dx=P[i].x-VIN.mx,dy=P[i].y-VIN.my,q=dx*dx+dy*dy;
    if(q<d2)d2=q;}
   if(d2<R2)tgt=Math.min(1,1.18-Math.sqrt(d2)/R);}
  if(tgt===0&&v.rt===0)continue;
  const k=Math.min(1,(tgt>v.rt?.09:.018)*(dt/16.7));
  let nv=v.rt+(tgt-v.rt)*k;
  if(tgt===0&&nv<.006)nv=0;              /* encosta no zero em vez de rastejar para sempre */
  if(nv===v.rt)continue;
  if(nv!==0&&Math.abs(nv-v.rt)<.0012)continue; /* variação invisível não paga uma repintura */
  v.rt=nv;VIN.dirty=true;}}

/* --- desenho: o caule é um POLÍGONO preenchido, não um traço. é o que permite a espessura
   afinar da base à ponta dentro de UM Path2D — e Path2D cacheado é o barato da vinha madura */
function vinNorm(P,i,n){const a=P[i>0?i-1:0],b=P[i<n-1?i+1:n-1];
 const dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy)||1;return [-dy/l,dx/l];}
function vinRibbon(v,n){const p=new Path2D(),P=v.pts;
 for(let i=0;i<n;i++){const N=vinNorm(P,i,n),w=P[i].w,x=P[i].x+N[0]*w,y=P[i].y+N[1]*w;
  i?p.lineTo(x,y):p.moveTo(x,y);}
 for(let i=n-1;i>=0;i--){const N=vinNorm(P,i,n),w=P[i].w;
  p.lineTo(P[i].x-N[0]*w,P[i].y-N[1]*w);}
 p.closePath();return p;}
function vinFolhas(v,n){const p=new Path2D();
 for(const L of v.lv){if(L.i>=n)continue;
  const c=Math.cos(L.a),s=Math.sin(L.a),ln=L.s,wd=L.s*.44;
  const mx=L.x+c*ln*.45,my=L.y+s*ln*.45,px=-s*wd,py=c*wd;
  p.moveTo(L.x,L.y);
  p.quadraticCurveTo(mx+px,my+py,L.x+c*ln,L.y+s*ln);
  p.quadraticCurveTo(mx-px,my-py,L.x,L.y);}
 return p;}
function vinPaint(c,v){const n=v.pts.length;
 const use=v.rt>0?Math.floor(n*(1-.62*v.rt)):n;
 /* o cache: enquanto use não muda, os dois Path2D valem. vinha madura com o cursor longe
    nunca muda use — é aí que ela passa a custar dois fill() e mais nada */
 if(v.ck!==use){v.ck=use;
  if(use>=2){v.path=vinRibbon(v,use);v.lpath=vinFolhas(v,use);}else{v.path=v.lpath=null;}}
 if(!v.path)return;
 const al=1-.55*v.rt;
 c.globalAlpha=al;c.fillStyle=v.stem;c.fill(v.path);
 c.globalAlpha=al*.88;c.fillStyle=v.leaf;c.fill(v.lpath);
 c.globalAlpha=1;}
/* a flor abre: as pétalas se AFASTAM do centro por interpolação, e o miolo escuro fica */
function vinFlorDraw(c,v,f){const t=f.t<0?0:(f.t>1?1:f.t);
 const e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,R=f.r*(.18+e*.82);
 c.save();c.translate(f.x,f.y);
 c.globalAlpha=Math.min(1,t*3)*(1-.6*v.rt);
 c.fillStyle=f.pc;
 for(let i=0;i<f.n;i++){c.save();c.rotate(f.a0+i*6.2832/f.n+e*.55);
  c.beginPath();c.ellipse(R*.72,0,R*.8,R*.4,0,0,6.2832);c.fill();c.restore();}
 c.fillStyle=f.cc;c.beginPath();c.arc(0,0,Math.max(.7,R*.3),0,6.2832);c.fill();
 c.restore();c.globalAlpha=1;}

/* --- AS COISAS QUE ESPREITAM: no meio de uma moita fechada, uma forma que NÃO é planta se
   insinua por 1-2s e some. desenhada ANTES das vinhas, então a folhagem passa POR CIMA —
   meio escondida é o que a torna pior do que à mostra. nunca sobre a sua zona. --- */
function vinDenso(){const cand=[];
 for(const v of VIN.vs){if(v.ph!==1)continue;
  for(let i=0;i<v.lv.length;i+=2)cand.push(v.lv[i]);}
 if(cand.length<6)return null;
 let best=null,bn=-1;
 for(let k=0;k<9;k++){const L=cand[Math.floor(Math.random()*cand.length)];
  if(L.x<70||L.x>VIN.W-70||L.y<70||L.y>VIN.H-70||vinForb(L.x,L.y))continue;
  let n=0;for(const o of cand){const dx=o.x-L.x,dy=o.y-L.y;if(dx*dx+dy*dy<11000)n++;}
  if(n>bn){bn=n;best=L;}}
 return bn>=3?best:null;}
function vinLurk(){const b=bandOf(S.ruido||0);
 if(!VIN.on||b<3||VIN.lk)return;
 const L=vinDenso();if(!L)return;
 const olho=Math.random()<(b>=5?.66:.55);
 VIN.lk={k:olho?"o":"v",x:L.x,y:L.y,t:0,dur:1.5+Math.random()*.9,
  r:olho?(22+Math.random()*16+b*2):(52+Math.random()*40),rot:(Math.random()-.5)*.5,
  encara:olho&&b>=5&&Math.random()<.5, /* banda 5: ele para de procurar e ENCARA */
  vx:olho?0:(Math.random()-.5)*.22,vy:olho?0:-.05-Math.random()*.12};
 VIN.dirty=true;}
function vinLurkSched(){clearTimeout(VIN.lkT);VIN.lkT=null;
 if(!VIN.on)return;
 const b=bandOf(S.ruido||0),iv=b>=5?(10+Math.random()*12):(15+Math.random()*25);
 VIN.lkT=setTimeout(()=>{VIN.lkT=null;vinLurk();vinLurkSched();},iv*1000);}
function vinLurkDraw(c,L){const al=Math.sin(Math.PI*Math.min(1,Math.max(0,L.t)));
 if(al<=.01)return;
 if(L.k==="v"){ /* o vulto: silhueta sem forma definida, atrás das vinhas, andando devagar */
  const g=c.createRadialGradient(L.x,L.y,0,L.x,L.y,L.r);
  g.addColorStop(0,`rgba(2,5,2,${(al*.9).toFixed(3)})`);
  g.addColorStop(.42,`rgba(3,8,3,${(al*.62).toFixed(3)})`);
  g.addColorStop(.76,`rgba(5,11,4,${(al*.24).toFixed(3)})`);
  g.addColorStop(1,"rgba(5,11,4,0)");
  c.fillStyle=g;c.beginPath();c.ellipse(L.x,L.y,L.r*.62,L.r,0,0,6.2832);c.fill();
  const hy=L.y-L.r*.78,hr=L.r*.3; /* a cabeça: só o bastante para insinuar alguém ali */
  const g2=c.createRadialGradient(L.x,hy,0,L.x,hy,hr);
  g2.addColorStop(0,`rgba(2,5,2,${(al*.85).toFixed(3)})`);
  g2.addColorStop(.7,`rgba(3,8,3,${(al*.4).toFixed(3)})`);
  g2.addColorStop(1,"rgba(3,8,3,0)");
  c.fillStyle=g2;c.beginPath();c.arc(L.x,hy,hr,0,6.2832);c.fill();
  return;}
 /* o olho: mesma anatomia do olho do Observação (íris em gradiente radial + pupila preta),
    só que ele ABRE entre as folhas — a pálpebra é o recorte, e a altura dela é a abertura */
 const ab=Math.min(1,al*1.5),R=L.r,h=R*.6*ab;
 if(h<.6)return;
 c.save();c.translate(L.x,L.y);c.rotate(L.rot);c.globalAlpha=al;
 c.beginPath();c.ellipse(0,0,R*1.14,h*1.35,0,0,6.2832);c.fillStyle="rgba(5,9,4,.9)";c.fill();
 c.save();c.beginPath();c.ellipse(0,0,R,h,0,0,6.2832);c.clip();
 c.fillStyle="#c7d2b2";c.fillRect(-R,-h,R*2,h*2);
 const seg=L.encara?0:1,ir=R*.36;
 const px=seg?Math.max(-R*.42,Math.min(R*.42,(VIN.mx-L.x)*.14)):0;
 const py=seg?Math.max(-h*.35,Math.min(h*.35,(VIN.my-L.y)*.1)):0;
 const g=c.createRadialGradient(px,py,ir*.05,px,py,ir);
 g.addColorStop(0,"#000");g.addColorStop(.42,"#000");g.addColorStop(.5,"#3d5a2a");
 g.addColorStop(.84,"#8dbb62");g.addColorStop(1,"rgba(18,30,10,.9)");
 c.fillStyle=g;c.beginPath();c.arc(px,py,ir,0,6.2832);c.fill();
 c.restore();
 c.globalAlpha=al*.8;c.lineWidth=Math.max(1,R*.07);c.strokeStyle="rgba(6,12,5,.95)";
 c.beginPath();c.ellipse(0,0,R,h,0,0,6.2832);c.stroke();
 c.restore();c.globalAlpha=1;}

/* --- a repintura: só acontece com VIN.dirty. ordem = espreito, folhagem, flores --- */
function vinDraw(){const c=VIN.cx;if(!c)return;
 c.clearRect(0,0,VIN.W,VIN.H);
 if(VIN.lk)vinLurkDraw(c,VIN.lk);
 for(const v of VIN.vs)vinPaint(c,v);
 /* a flor vive na ponta: se o recuo já comeu o ponto dela (v.ck = quanto sobrou da vinha),
    ela some junto. flor solta boiando no ar entregaria o truque na hora */
 for(const v of VIN.vs)for(const f of v.fl)if(f.i<v.ck)vinFlorDraw(c,v,f);}

/* --- o passo por frame. o gate, o resize, o dt, a zona de foco e a repintura por dirty são
   da base (ClimateEffect.tick); daqui para baixo é só o jardim. só pontas ativas, flores
   abrindo, recuo e espreito custam alguma coisa; o resto está congelado em Path2D --- */
function vinStep(dt){
 if(VIN.boost>0)VIN.boost=Math.max(0,VIN.boost-dt);
 const mul=VIN.boost>0?2.7:1;
 for(let i=0;i<VIN.vs.length;i++){const v=VIN.vs[i];
  if(v.ph===0){v.acc+=dt*.001*v.spd*mul;
   let k=0;while(v.acc>=1&&k<7){v.acc-=1;k++;if(!vinGrow(v))break;}
   if(k)VIN.dirty=true;}
  const F=v.fl;for(let j=0;j<F.length;j++)if(F[j].t<1){F[j].t+=dt/(F[j].dur*1000);VIN.dirty=true;}}
 if(VIN.cull){VIN.cull=false;
  VIN.vs=VIN.vs.filter(v=>{if(!v.dead)return true;VIN.pts-=v.pts.length;return false;});}
 vinRecuo(dt);
 if(VIN.lk){const L=VIN.lk;L.t+=dt/(L.dur*1000);L.x+=L.vx*dt*.06;L.y+=L.vy*dt*.06;
  if(L.t>=1)VIN.lk=null;
  VIN.dirty=true;}}

/* montar / desmontar saiu daqui: quem monta o canvas, limpa os timers budT/lkT, esvazia o
   jardim e apaga o canvas ao sair do Germe é ClimateEffect.mount/tear, com os ganchos
   declarados lá em cima no `new ClimateEffect` */

/* --- o inchaço: algo se remexe sob o painel e assenta. banda 5, raro, nunca sob edição --- */
let _swT=null,_swEl=null,_swRm=null;
function gerSwellClear(){clearTimeout(_swRm);_swRm=null;
 if(_swEl){_swEl.classList.remove("ger-swell");_swEl=null;}}
function gerSwell(){gerSwellClear();
 if(!gerOn(5)||gerModal())return;
 const out=[];document.querySelectorAll(".panel").forEach(p=>{
  if(p.matches(":hover"))return;
  if(document.activeElement&&p.contains(document.activeElement))return;
  const r=p.getBoundingClientRect();
  if(r.width<130||r.bottom<40||r.top>innerHeight-30)return;out.push(p);});
 if(!out.length)return;
 _swEl=out[Math.floor(Math.random()*out.length)];_swEl.classList.add("ger-swell");
 _swRm=setTimeout(gerSwellClear,2700);}
function swellSched(){clearTimeout(_swT);_swT=setTimeout(()=>{gerSwell();swellSched();},28000+Math.random()*24000);}

/* --- o som: TERRA MOLHADA + VENTO vivem no grafo (audBuild); aqui ficam o nível e os
   eventos. NADA percussivo: sem estalo, sem batida. só coisas úmidas e folhagem --- */
const gerLvl=b=>b>=5?.030:(b>=4?.021:.013);
/* bolha: a terra soltando ar. o ataque é MOLE de propósito (42% da duração subindo) —
   se atacasse rápido viraria percussão, e é justamente isso que saiu daqui */
function gerBolha(){if(!AUD.ctx||S.ui.mute||!gerOn(3))return;
 const c=AUD.ctx,b=bandOf(S.ruido||0),t=c.currentTime+.02,dur=.3+Math.random()*.24;
 try{const n=Math.floor(c.sampleRate*.7),bf=c.createBuffer(1,n,c.sampleRate),ch=bf.getChannelData(0);
  let last=0;for(let i=0;i<n;i++){const w=Math.random()*2-1;last=(last+.05*w)/1.05;ch[i]=last*4;}
  const s=c.createBufferSource();s.buffer=bf;
  const f=c.createBiquadFilter();f.type="lowpass";f.Q.value=11;
  f.frequency.setValueAtTime(80,t);
  f.frequency.linearRampToValueAtTime(190+Math.random()*160,t+dur*.55);
  f.frequency.linearRampToValueAtTime(70,t+dur);
  const g=c.createGain();
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(b>=5?.05:.032,t+dur*.42);
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  s.connect(f);f.connect(g);g.connect(c.destination);s.start(t);s.stop(t+dur+.05);}catch(e){}}
/* farfalhar: a folhagem se mexendo toda de uma vez. ruído branco num passa-banda que DESCE */
function gerRustle(dur,lvl){if(!AUD.ctx||S.ui.mute||!gerOn(2))return;
 const c=AUD.ctx,t=c.currentTime+.02,D=dur||1.2;
 try{const n=Math.floor(c.sampleRate*(D+.3)),bf=c.createBuffer(1,n,c.sampleRate),ch=bf.getChannelData(0);
  for(let i=0;i<n;i++)ch[i]=(Math.random()*2-1)*.6;
  const s=c.createBufferSource();s.buffer=bf;
  const f=c.createBiquadFilter();f.type="bandpass";f.Q.value=1.1;
  f.frequency.setValueAtTime(1500+Math.random()*700,t);
  f.frequency.exponentialRampToValueAtTime(430,t+D);
  const g=c.createGain();
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.026*(lvl||1),t+D*.3);
  g.gain.linearRampToValueAtTime(.0001,t+D);
  s.connect(f);f.connect(g);g.connect(c.destination);s.start(t);s.stop(t+D+.1);}catch(e){}}
/* descolar: a flor abrindo de repente. passa-banda ressonante SUBINDO sobre ruído — é o som
   de duas superfícies molhadas se separando, e não tem transiente seco nenhum */
function gerDescolar(){if(!AUD.ctx||S.ui.mute||!gerOn(2))return;
 const c=AUD.ctx,t=c.currentTime+.02,D=.42+Math.random()*.2;
 try{const n=Math.floor(c.sampleRate*.8),bf=c.createBuffer(1,n,c.sampleRate),ch=bf.getChannelData(0);
  let last=0;for(let i=0;i<n;i++){const w=Math.random()*2-1;last=(last+.3*w)/1.3;ch[i]=last*1.6;}
  const s=c.createBufferSource();s.buffer=bf;
  const f=c.createBiquadFilter();f.type="bandpass";f.Q.value=8;
  f.frequency.setValueAtTime(220,t);
  f.frequency.exponentialRampToValueAtTime(1250+Math.random()*500,t+D);
  const g=c.createGain();
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.05,t+D*.35);
  g.gain.exponentialRampToValueAtTime(.0001,t+D+.1);
  s.connect(f);f.connect(g);g.connect(c.destination);s.start(t);s.stop(t+D+.2);}catch(e){}}
/* úmido curto: o broto rompendo onde você apagou. mesma família, mais grave e mais rápido */
function gerWet(){if(!AUD.ctx||S.ui.mute||!gerOn(2))return;
 const c=AUD.ctx,t=c.currentTime+.02,D=.26+Math.random()*.12;
 try{const n=Math.floor(c.sampleRate*.5),bf=c.createBuffer(1,n,c.sampleRate),ch=bf.getChannelData(0);
  let last=0;for(let i=0;i<n;i++){const w=Math.random()*2-1;last=(last+.16*w)/1.16;ch[i]=last*2.4;}
  const s=c.createBufferSource();s.buffer=bf;
  const f=c.createBiquadFilter();f.type="lowpass";f.Q.value=7;
  f.frequency.setValueAtTime(160,t);
  f.frequency.linearRampToValueAtTime(760+Math.random()*300,t+D*.6);
  f.frequency.linearRampToValueAtTime(180,t+D);
  const g=c.createGain();
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.042,t+D*.3);
  g.gain.exponentialRampToValueAtTime(.0001,t+D);
  s.connect(f);f.connect(g);g.connect(c.destination);s.start(t);s.stop(t+D+.1);}catch(e){}}
/* subir e decair o ganho é a regra 6 da base (VIN.audSync/audOff, configurados no `aud:`) */
function gerAudTick(){if(!AUD.gon)return;const b=bandOf(S.ruido||0);
 gerBolha();
 AUD.gtimer=setTimeout(gerAudTick,(b>=5?9+Math.random()*9:14+Math.random()*13)*1000);}
/* o surto do noiseup: o ambiente inteiro sobe e volta sozinho em ~5s */
function gerAudPush(){if(!AUD.ctx||!AUD.gon||S.ui.mute)return;
 try{const t=AUD.ctx.currentTime,l=gerLvl(bandOf(S.ruido||0));
  AUD.ggn.gain.cancelScheduledValues(t);
  AUD.ggn.gain.setTargetAtTime(l*2.1,t,.7);
  AUD.ggn.gain.setTargetAtTime(l,t+5,2.4);}catch(e){}}
/* --- as reações às SUAS ações: agora VISUAL + SOM, não só a frase. o motor de gatilhos
   cuida da carência da frase; cada efeito guarda a sua para não virar spam --- */
/* parou: o jardim ACELERA e a folhagem farfalha. o silêncio é o que deixa ele tomar a tela */
function gerIdle(){if(!VIN.on)return;
 VIN.boost=Math.max(VIN.boost,9000);
 vinBud();if(bandOf(S.ruido||0)>=4)vinBud();
 gerRustle(1.1+Math.random()*.6,1);}
/* voltou a mexer: o surto morre na hora (o recuo em si é contínuo, em vinRecuo) */
function gerAct(){if(VIN.boost>0)VIN.boost=0;}
/* apagou texto: uma vinha nova BROTA do ponto onde estava o que você arrancou.
   nasce logo ABAIXO do campo, fora da zona proibida dele — o campo está em foco (você
   acabou de escrever nele), e a regra sagrada não abre exceção nem para o próprio gatilho */
function gerSprout(d){if(!VIN.on)return;
 const now=performance.now();if(now-VIN.spr<7000)return;
 const t=d&&d.el;if(!t||!t.isConnected||!t.getBoundingClientRect)return;
 const r=t.getBoundingClientRect();
 if(r.width<40||r.bottom<8||r.top>innerHeight-8)return;
 const x=r.left+r.width*(.15+Math.random()*.7),y=r.bottom+30;
 if(y>innerHeight-6||vinForb(x,y))return;
 const b=bandOf(S.ruido||0);
 const v=vinPush({x,y,a:Math.PI/2+(Math.random()-.5)*1.1,
  max:Math.round(20+b*9+Math.random()*14),w:1.6+b*.22,spd:30});
 if(v){VIN.spr=now;gerWet();}}
/* tirou recurso: sangue é adubo. uma flor perto ABRE de repente, com o som de descolar */
function gerBloom(d){if(!VIN.on||!(d&&d.dir<0))return;
 const now=performance.now();if(now-VIN.blm<9000)return;
 const cand=[];
 for(const v of VIN.vs){if(v.ph!==1||v.fl.length>2||v.pts.length<6)continue;
  const p=v.pts[v.pts.length-1];
  if(p.x<10||p.x>VIN.W-10||p.y<10||p.y>VIN.H-10||vinForb(p.x,p.y))continue;
  cand.push([v,p]);}
 if(!cand.length)return;
 VIN.blm=now;
 const par=cand[Math.floor(Math.random()*cand.length)];
 vinFlor(par[0],par[1],.5); /* DE REPENTE: meio segundo, não o 1-2s de quem abre sozinha */
 gerDescolar();}
/* o Ruído subiu: surto geral de crescimento e o ambiente sobe junto por alguns segundos */
function gerSurto(){if(!VIN.on)return;
 VIN.boost=Math.max(VIN.boost,12000);
 vinBud();vinBud();vinBud();
 gerRustle(1.6,1.4);gerAudPush();}

/* as reações do Germe às suas ações — o motor da Parte A cuida de cooldown e de {nome}/{apagado} */
TRIG.ger={
 erase:["não adianta arrancar","cresce de novo","isso vai cicatrizar torto","você tirou, mas a raiz ficou",
  "{apagado}… ainda está aí, por baixo"],
 idle:["parou? é agora que cresce","enquanto você descansa, nós trabalhamos","não se mexer só ajuda a pegar",
  "sente criando casca?"],
 resource:["essa ferida é uma porta","sangue é adubo","cada corte nosso agradece","abre. deixa entrar."],
 tabopen:["levou junto para esta página","espalhou para cá também","não tem parte limpa"],
 noiseup:["está florescendo mais rápido agora","você chamou e nós crescemos"]};
/* e os efeitos dos mesmos gatilhos: act = "o usuário voltou a mexer" */
TRIGFX.ger={erase:d=>{gerScar(d);gerSprout(d);},idle:gerIdle,act:gerAct,
 resource:gerBloom,noiseup:gerSurto};

/* sair do Germe (ou calmar) apaga timers, o canvas de vinhas, overlays, classes e o som —
   a textura restante é CSS por data-el, então a superfície seca sozinha */
function gerSync(){const b=bandOf(S.ruido||0),on=gerOn(1);
 if(!on||b<3)gerScarClear();
 if(on&&b>=5){if(!_swT)swellSched();}else{clearTimeout(_swT);_swT=null;gerSwellClear();}
 VIN.sync();
 VIN.audSync(on&&b>=3&&!S.ui.mute,b);}

