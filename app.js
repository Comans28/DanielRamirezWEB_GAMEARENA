/* GameArena · demo visual navegable (datos de ejemplo en memoria) */
const $=s=>document.querySelector(s), E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ST={ABIERTO:'Abierto',EN_CURSO:'En curso',FINALIZADO:'Finalizado'};
let id=100;
const D={
 games:[
  {id:1,n:'Valorant',g:'Shooter táctico 5v5',d:'Duelos tácticos por rondas con agentes y habilidades.',bg:'#ff465522',bd:'#ff465566',svg:`<svg viewBox="0 0 24 24" width="26" height="26" fill="#ff4655"><path d="M2 4l8.5 16h3.5L5.5 4H2zm14.5 0L11 14.3 12.8 18 22 4h-5.5z"/></svg>`},
  {id:2,n:'League of Legends',g:'MOBA',d:'Dos equipos de cinco luchan por destruir el nexo rival.',bg:'#c89b3c22',bd:'#c89b3c66',svg:`<svg viewBox="0 0 24 24" width="26" height="26" fill="#c89b3c"><path d="M6 3v18h13v-3.5h-9V3H6zm11 4.5a5.5 5.5 0 0 1 0 9v2.2a7.5 7.5 0 0 0 0-13.4v2.2z"/></svg>`},
  {id:3,n:'Rocket League',g:'Fútbol con coches',d:'Partidos 3v3 de fútbol con coches propulsados.',bg:'#0088ff22',bd:'#0088ff66',svg:`<svg viewBox="0 0 24 24" width="26" height="26"><path fill="#0088ff" d="M12 2L4 5v6.5c0 5.2 3.4 9.8 8 11.5 4.6-1.7 8-6.3 8-11.5V5l-8-3z"/><circle cx="15" cy="10" r="2.5" fill="#ff9900"/><path fill="#fff" d="M7 14c2-2 5-2.5 8-1l-1.5 2.5C11 14.5 9 15 7 16v-2z"/></svg>`},
  {id:4,n:'Fortnite',g:'Battle royale',d:'Supervivencia y construcción hasta ser el último en pie.',bg:'#9d4dbb22',bd:'#9d4dbb66',svg:`<svg viewBox="0 0 24 24" width="26" height="26" fill="#b968ff"><path d="M7 3h11l-1 4.5h-6v3h5l-.8 4H11V21H7V3z"/></svg>`},
  {id:5,n:'EA Sports FC',g:'Simulador de fútbol',d:'Partidos 1v1 con plantillas de clubes reales.',bg:'#00e67622',bd:'#00e67666',svg:`<svg viewBox="0 0 24 24" width="26" height="26"><polygon points="12,3 3,19 21,19" fill="none" stroke="#00e676" stroke-width="2.2"/><text x="12" y="16.5" text-anchor="middle" fill="#fff" font-size="6.5" font-weight="700" font-family="sans-serif">FC</text></svg>`}
 ],
 players:[{id:1,nick:'NovaFox',name:'Lucía Ramos',email:'lucia@mail.es',country:'España'},{id:2,nick:'KaiZen',name:'Mateo Vidal',email:'mateo@mail.es',country:'España'},{id:3,nick:'Pixelada',name:'Sara Ortiz',email:'sara@mail.es',country:'México'},{id:4,nick:'Dr_Lag',name:'Hugo Pérez',email:'hugo@mail.es',country:'Argentina'},{id:5,nick:'Zorra99',name:'Irene Soto',email:'irene@mail.es',country:'España'},{id:6,nick:'BlitzMan',name:'Álex Roca',email:'alex@mail.es',country:'Chile'}],
 tours:[{id:1,n:'Copa Primavera Valorant',g:1,s:'ABIERTO',date:'2026-12-05',prize:500,max:16},{id:2,n:'Liga Rift Invierno',g:2,s:'EN_CURSO',date:'2026-11-10',prize:1200,max:8},{id:3,n:'Rocket Cup Navidad',g:3,s:'ABIERTO',date:'2026-12-20',prize:300,max:12},{id:4,n:'Fortnite Solo Series',g:4,s:'FINALIZADO',date:'2026-10-02',prize:800,max:32},{id:5,n:'FC Champions Aula',g:5,s:'EN_CURSO',date:'2026-11-14',prize:250,max:8},{id:6,n:'Valorant Clutch Night',g:1,s:'FINALIZADO',date:'2026-09-18',prize:400,max:16},{id:7,n:'Rift Rookies',g:2,s:'ABIERTO',date:'2026-12-12',prize:600,max:10}],
 parts:[[1,1],[2,1],[3,1],[1,2],[4,2],[5,2],[2,3],[6,3],[3,4],[1,4],[5,5],[6,5],[2,6],[4,6],[1,7],[6,7]].map(([p,t])=>({p,t}))
};
const by=(a,i)=>D[a].find(x=>x.id==i);
const gname=i=>by('games',i)?.n||'';
const badge=s=>`<span class="badge b-${s}">${ST[s]}</span>`;
const ini=n=>E(n.slice(0,2).toUpperCase());
const nPart=t=>D.parts.filter(x=>x.t==t).length;
const eur=n=>n.toLocaleString('es-ES')+' €';
const fdate=d=>new Date(d).toLocaleDateString('es-ES',{day:'numeric',month:'short',year:'numeric'});
const opts=(arr,k,sel,txt)=>arr.map(x=>`<option value="${x.id}"${x.id==sel?' selected':''}>${E(x[txt])}</option>`).join('');
const head=(t,sub,act='')=>`<div class="ph"><div><h1>${t}</h1>${sub?`<p>${sub}</p>`:''}</div>${act}</div>`;
const empty=(m,a='')=>`<div class="empty"><p>${m}</p>${a}</div>`;
let view='cards',fg='',fs='';

const tourCard=t=>`<article class="card"><div class="card-top"><span class="muted small">${gname(t.g)}</span>${badge(t.s)}</div>
<h3><a href="#/torneos/${t.id}">${E(t.n)}</a></h3>
<div class="meta"><span>${fdate(t.date)}</span><span>Premio ${eur(t.prize)} · ${nPart(t.id)}/${t.max} plazas</span></div>
<div class="foot-a"><a class="btn sm sec" href="#/torneos/${t.id}">Ver detalle</a>${t.s=='ABIERTO'?`<a class="btn sm" href="#/participaciones?t=${t.id}">Inscribirse</a>`:''}</div></article>`;
const tourTable=l=>`<div class="tw"><table><thead><tr><th>Torneo</th><th>Videojuego</th><th>Estado</th><th>Fecha</th><th>Plazas</th><th><span class="sr">Acciones</span></th></tr></thead><tbody>${l.map(t=>`<tr><td><a href="#/torneos/${t.id}">${E(t.n)}</a></td><td>${gname(t.g)}</td><td>${badge(t.s)}</td><td>${fdate(t.date)}</td><td>${nPart(t.id)}/${t.max}</td><td class="act"><a class="btn sm sec" href="#/torneos/${t.id}/editar">Editar</a></td></tr>`).join('')}</tbody></table></div>`;

const V={
inicio(){const f=D.tours.filter(t=>t.s=='ABIERTO')[0];
return `<section class="hero"><div><h1>Compite en la arena. Inscríbete en minutos.</h1><p>Gestiona jugadores, videojuegos y torneos de Valorant, League of Legends, Rocket League, Fortnite y EA Sports FC en un solo lugar.</p><div class="row"><a class="btn" href="#/torneos?s=ABIERTO">Ver torneos abiertos</a><a class="btn sec" href="#/participaciones">Inscribir a un jugador</a></div></div>
<article class="card featured"><div class="card-top"><span class="muted small">Próximo torneo · ${gname(f.g)}</span>${badge(f.s)}</div><h2>${E(f.n)}</h2><div class="meta"><span>${fdate(f.date)}</span><span>Premio ${eur(f.prize)} · quedan ${f.max-nPart(f.id)} plazas</span></div><div class="foot-a"><a class="btn" href="#/participaciones?t=${f.id}">Inscribirse ahora</a></div></article></section>
<section class="sec"><h2>Explora GameArena</h2><div class="tiles"><a class="tile" href="#/jugadores"><strong>Jugadores</strong><span>${D.players.length} registrados</span></a><a class="tile" href="#/videojuegos"><strong>Videojuegos</strong><span>${D.games.length} juegos disponibles</span></a><a class="tile" href="#/torneos"><strong>Torneos</strong><span>${D.tours.length} torneos en total</span></a><a class="tile" href="#/participaciones"><strong>Participaciones</strong><span>${D.parts.length} inscripciones</span></a></div></section>
<section class="sec"><div class="ph"><h2>Torneos abiertos</h2><a class="btn sec sm" href="#/torneos?s=ABIERTO">Ver todos</a></div><div class="grid">${D.tours.filter(t=>t.s=='ABIERTO').map(tourCard).join('')}</div></section>`},

jugadores(){return head('Jugadores','Consulta, edita o elimina a los jugadores de la plataforma.','<a class="btn" href="#/jugadores/nuevo">Nuevo jugador</a>')+
(D.players.length?`<div class="tw"><table><thead><tr><th>Alias</th><th>Nombre</th><th>País</th><th>Torneos</th><th><span class="sr">Acciones</span></th></tr></thead><tbody>${D.players.map(p=>`<tr><td><a href="#/jugadores/${p.id}">${E(p.nick)}</a></td><td>${E(p.name)}</td><td>${E(p.country)}</td><td>${D.parts.filter(x=>x.p==p.id).length}</td><td class="act"><a class="btn sm sec" href="#/jugadores/${p.id}">Ver ficha</a> <a class="btn sm sec" href="#/jugadores/${p.id}/editar">Editar</a> <button class="btn sm danger" data-del="players:${p.id}">Eliminar</button></td></tr>`).join('')}</tbody></table></div>`:empty('Aún no hay jugadores.','<br><a class="btn" href="#/jugadores/nuevo">Dar de alta el primero</a>'))},

jugador(i){const p=by('players',i);if(!p)return nf();const ps=D.parts.filter(x=>x.p==i).map(x=>by('tours',x.t));
return head(E(p.nick),E(p.name),`<div class="row"><a class="btn sec" href="#/jugadores/${i}/editar">Editar</a><button class="btn danger" data-del="players:${i}">Eliminar</button></div>`)+
`<div class="detail"><section><h2 style="margin-bottom:16px">Torneos del jugador</h2>${ps.length?`<div class="grid">${ps.map(tourCard).join('')}</div>`:empty('Este jugador no participa en ningún torneo.',`<br><a class="btn" href="#/participaciones?p=${i}">Inscribir en un torneo</a>`)}</section>
<aside class="card"><h3>Datos del jugador</h3><dl class="facts"><dt>Alias</dt><dd>${E(p.nick)}</dd><dt>Nombre</dt><dd>${E(p.name)}</dd><dt>Email</dt><dd>${E(p.email)}</dd><dt>País</dt><dd>${E(p.country)}</dd></dl></aside></div>`},

jform(i){const p=by('players',i)||{};return head(i?'Editar jugador':'Nuevo jugador','Los campos marcados con * son obligatorios.')+
`<form class="form" data-f="player" data-id="${i||''}"><div class="field"><label for="nick">Alias *</label><input id="nick" name="nick" required minlength="3" value="${E(p.nick)}"><span class="hint">Mínimo 3 caracteres.</span></div>
<div class="field"><label for="name">Nombre completo *</label><input id="name" name="name" required value="${E(p.name)}"></div>
<div class="field"><label for="email">Correo electrónico *</label><input id="email" name="email" type="email" required value="${E(p.email)}"></div>
<div class="field"><label for="country">País</label><input id="country" name="country" value="${E(p.country)}"></div>
<div class="row"><button class="btn" type="submit">${i?'Guardar cambios':'Crear jugador'}</button><a class="btn sec" href="#/jugadores">Cancelar</a></div></form>`},

videojuegos(){return head('Videojuegos','Elige un juego para ver sus torneos.')+`<div class="grid">${D.games.map(g=>`<article class="card"><div class="avatar" style="background:${g.bg};border-color:${g.bd}" aria-hidden="true">${g.svg||ini(g.n)}</div><h3><a href="#/videojuegos/${g.id}">${g.n}</a></h3><div class="meta"><span>${g.g}</span><span>${D.tours.filter(t=>t.g==g.id).length} torneos</span></div><div class="foot-a"><a class="btn sm sec" href="#/videojuegos/${g.id}">Ver ficha</a><a class="btn sm" href="#/torneos?g=${g.id}">Ver torneos</a></div></article>`).join('')}</div>`},

videojuego(i){const g=by('games',i);if(!g)return nf();const ts=D.tours.filter(t=>t.g==i);
return head(g.n,g.g,`<a class="btn" href="#/torneos?g=${i}">Filtrar en Torneos</a>`)+`<div class="detail"><section><h2 style="margin-bottom:16px">Torneos de ${g.n}</h2>${ts.length?`<div class="grid">${ts.map(tourCard).join('')}</div>`:empty('No hay torneos de este juego.')}</section><aside class="card"><div class="avatar" style="background:${g.bg};border-color:${g.bd};margin-bottom:4px" aria-hidden="true">${g.svg||ini(g.n)}</div><h3>Sobre el juego</h3><p class="muted">${g.d}</p></aside></div>`},

torneos(){let l=D.tours.filter(t=>(!fg||t.g==fg)&&(!fs||t.s==fs));
const chip=(v,t)=>`<button class="chip" data-fs="${v}" aria-pressed="${fs==v}">${t}</button>`;
return head('Torneos','Filtra por videojuego y estado para encontrar tu competición.','<a class="btn" href="#/torneos/nuevo">Nuevo torneo</a>')+
`<div class="filters"><div class="field"><label for="fg">Videojuego</label><select id="fg"><option value="">Todos</option>${opts(D.games,'',fg,'n')}</select></div>
<div class="field"><span class="lbl" style="font-weight:600;font-size:.9375rem">Estado</span><div class="chips">${chip('','Todos')}${chip('ABIERTO','Abierto')}${chip('EN_CURSO','En curso')}${chip('FINALIZADO','Finalizado')}</div></div>
<div class="field" style="margin-left:auto"><span class="lbl" style="font-weight:600;font-size:.9375rem">Vista</span><div class="seg"><button data-v="cards" aria-pressed="${view=='cards'}">Tarjetas</button><button data-v="table" aria-pressed="${view=='table'}">Tabla</button></div></div></div>
<p class="count">${l.length} ${l.length==1?'torneo':'torneos'}${fg?` · ${gname(fg)}`:''}${fs?` · ${ST[fs]}`:''}</p>`+
(l.length?(view=='cards'?`<div class="grid">${l.map(tourCard).join('')}</div>`:tourTable(l)):empty('Ningún torneo coincide con estos filtros.','<br><button class="btn sec" data-reset>Quitar filtros</button>'))},

torneo(i){const t=by('tours',i);if(!t)return nf();const ps=D.parts.filter(x=>x.t==i).map(x=>by('players',x.p));
return head(E(t.n),`${gname(t.g)} ${badge(t.s)}`,`<div class="row">${t.s=='ABIERTO'?`<a class="btn" href="#/participaciones?t=${i}">Inscribir jugador</a>`:''}<a class="btn sec" href="#/torneos/${i}/editar">Editar</a><button class="btn danger" data-del="tours:${i}">Eliminar</button></div>`)+
`<div class="detail"><section><h2 style="margin-bottom:16px">Participantes (${ps.length}/${t.max})</h2>${ps.length?`<div class="tw"><table><thead><tr><th>Alias</th><th>Nombre</th><th>País</th></tr></thead><tbody>${ps.map(p=>`<tr><td><a href="#/jugadores/${p.id}">${E(p.nick)}</a></td><td>${E(p.name)}</td><td>${E(p.country)}</td></tr>`).join('')}</tbody></table></div>`:empty('Todavía no hay participantes.')}</section>
<aside class="card"><h3>Datos del torneo</h3><dl class="facts"><dt>Videojuego</dt><dd><a href="#/videojuegos/${t.g}">${gname(t.g)}</a></dd><dt>Estado</dt><dd>${badge(t.s)}</dd><dt>Fecha</dt><dd>${fdate(t.date)}</dd><dt>Premio</dt><dd>${eur(t.prize)}</dd><dt>Plazas</dt><dd>${t.max}</dd></dl></aside></div>`},

tform(i){const t=by('tours',i)||{g:'',s:'ABIERTO'};return head(i?'Editar torneo':'Nuevo torneo','Los campos marcados con * son obligatorios.')+
`<form class="form" data-f="tour" data-id="${i||''}"><div class="field full"><label for="n">Nombre del torneo *</label><input id="n" name="n" required value="${E(t.n)}"></div>
<div class="field"><label for="g">Videojuego *</label><select id="g" name="g" required>${opts(D.games,'',t.g,'n')}</select></div>
<div class="field"><label for="s">Estado *</label><select id="s" name="s">${Object.entries(ST).map(([k,v])=>`<option value="${k}"${k==t.s?' selected':''}>${v}</option>`).join('')}</select></div>
<div class="field"><label for="date">Fecha *</label><input id="date" name="date" type="date" required value="${t.date||''}"></div>
<div class="field"><label for="prize">Premio (€)</label><input id="prize" name="prize" type="number" min="0" value="${t.prize??''}"></div>
<div class="field"><label for="max">Plazas *</label><input id="max" name="max" type="number" min="2" required value="${t.max||''}"></div>
<div class="row"><button class="btn" type="submit">${i?'Guardar cambios':'Crear torneo'}</button><a class="btn sec" href="#/torneos">Cancelar</a></div></form>`},

participaciones(q){const op=D.tours.filter(t=>t.s=='ABIERTO'),pj=q.get('p')||D.players[0]?.id,tt=q.get('t')||'';const mine=D.parts.filter(x=>x.p==pj).map(x=>by('tours',x.t));
return head('Participaciones','Inscribe jugadores en torneos abiertos y consulta sus inscripciones.')+
`<section><h2 style="margin-bottom:16px">Inscribir jugador</h2><form class="form" data-f="part"><div class="field"><label for="pp">Jugador *</label><select id="pp" name="p" required>${opts(D.players,'',pj,'nick')}</select></div><div class="field"><label for="pt">Torneo abierto *</label><select id="pt" name="t" required>${opts(op,'',tt,'n')}</select><span class="hint">Solo se muestran torneos con estado Abierto.</span></div><div class="row"><button class="btn" type="submit">Inscribir</button></div></form></section>
<section class="sec"><div class="ph"><h2>Torneos de un jugador</h2><div class="field"><label for="cj">Consultar jugador</label><select id="cj">${opts(D.players,'',pj,'nick')}</select></div></div>${mine.length?tourTable(mine):empty('Este jugador no tiene inscripciones.')}</section>`}
};
const nf=()=>head('Página no encontrada','La dirección no existe.','<a class="btn" href="#/">Ir al inicio</a>');
const SEC={'':'inicio',jugadores:'jugadores',videojuegos:'videojuegos',torneos:'torneos',participaciones:'participaciones'};
const NAME={inicio:'Inicio',jugadores:'Jugadores',videojuegos:'Videojuegos',torneos:'Torneos',participaciones:'Participaciones'};

function route(){const [path,qs]=(location.hash.slice(2)||'').split('?'),q=new URLSearchParams(qs||''),[a='',b,c]=path.split('/');
if(a=='torneos'&&qs){fg=q.get('g')||'';fs=q.get('s')||'';}
let h;
if(a==''||!SEC[a])h=a==''?V.inicio():nf();
else if(a=='jugadores')h=!b?V.jugadores():b=='nuevo'?V.jform():c=='editar'?V.jform(b):V.jugador(b);
else if(a=='videojuegos')h=b?V.videojuego(b):V.videojuegos();
else if(a=='torneos')h=!b?V.torneos():b=='nuevo'?V.tform():c=='editar'?V.tform(b):V.torneo(b);
else h=V.participaciones(q);
$('#view').innerHTML=h;
const s=SEC[a]||'inicio';
document.querySelectorAll('#nav a').forEach(l=>l.toggleAttribute('aria-current',l.dataset.s==s)||0);
document.querySelectorAll('#nav a').forEach(l=>l.dataset.s==s?l.setAttribute('aria-current','page'):l.removeAttribute('aria-current'));
const title=(document.querySelector('#view h1')||{}).textContent||'';
$('#crumbs').innerHTML=s=='inicio'&&!a?'<span>Estás en: Inicio</span>':`<a href="#/">Inicio</a><${b?'a href="#/'+a+'"':'span'}>${NAME[s]}</${b?'a':'span'}>${b?`<span>${title.replace(/<[^>]*>/g,'')}</span>`:''}`;
document.title=(title?title+' · ':'')+'GameArena';scrollTo(0,0);}
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2200)};
function ask(m){return new Promise(r=>{$('#dlg-t').textContent=m;const d=$('#dlg');d.showModal();d.onclose=()=>r(d.returnValue=='si');d.querySelectorAll('button').forEach(b=>b.onclick=()=>d.close(b.value))})}

document.addEventListener('click',async e=>{const x=e.target.closest('[data-fs],[data-v],[data-del],[data-reset]');if(!x)return;
if('fs' in x.dataset){fs=x.dataset.fs;route()}
else if(x.dataset.v){view=x.dataset.v;route()}
else if('reset' in x.dataset){fg=fs='';route()}
else if(x.dataset.del){const[k,i]=x.dataset.del.split(':');if(await ask('¿Seguro que quieres eliminar este elemento? Esta acción no se puede deshacer.')){D[k]=D[k].filter(o=>o.id!=i);D.parts=D.parts.filter(o=>!(k=='players'&&o.p==i)&&!(k=='tours'&&o.t==i));toast('Elemento eliminado');location.hash='#/'+(k=='players'?'jugadores':'torneos')}}});
document.addEventListener('change',e=>{if(e.target.id=='fg'){fg=e.target.value;route()}if(e.target.id=='cj')location.hash='#/participaciones?p='+e.target.value});
document.addEventListener('submit',e=>{e.preventDefault();const f=e.target,o=Object.fromEntries(new FormData(f)),i=f.dataset.id;
if(f.dataset.f=='player'){i?Object.assign(by('players',i),o):D.players.push({id:++id,...o});toast(i?'Cambios guardados':'Jugador creado');location.hash='#/jugadores'}
if(f.dataset.f=='tour'){['g','prize','max'].forEach(k=>o[k]=+o[k]);i?Object.assign(by('tours',i),o):D.tours.push({id:++id,...o});toast(i?'Cambios guardados':'Torneo creado');location.hash='#/torneos'}
if(f.dataset.f=='part'){if(D.parts.some(x=>x.p==o.p&&x.t==o.t)){toast('Ese jugador ya está inscrito en este torneo');return}D.parts.push({p:+o.p,t:+o.t});toast('Inscripción realizada');location.hash='#/participaciones?p='+o.p}});
addEventListener('hashchange',route);route();