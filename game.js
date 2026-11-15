(()=>{var m0=Object.create;var rh=Object.defineProperty;var g0=Object.getOwnPropertyDescriptor;var x0=Object.getOwnPropertyNames;var _0=Object.getPrototypeOf,y0=Object.prototype.hasOwnProperty;var v0=(i,e)=>()=>{try{return e||i((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},Qo=(i,e)=>{for(var t in e)rh(i,t,{get:e[t],enumerable:!0})},b0=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of x0(e))!y0.call(i,s)&&s!==t&&rh(i,s,{get:()=>e[s],enumerable:!(n=g0(e,s))||n.enumerable});return i};var ed=(i,e,t)=>(t=i!=null?m0(_0(i)):{},b0(e||!i||!i.__esModule?rh(t,"default",{value:i,enumerable:!0}):t,i));var bf=v0((GT,vf)=>{"use strict";var re={};re.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)};re.localCName=re.generateIdentifier();re.splitLines=function(i){return i.trim().split(`
`).map(e=>e.trim())};re.splitSections=function(i){return i.split(`
m=`).map((t,n)=>(n>0?"m="+t:t).trim()+`\r
`)};re.getDescription=function(i){let e=re.splitSections(i);return e&&e[0]};re.getMediaSections=function(i){let e=re.splitSections(i);return e.shift(),e};re.matchPrefix=function(i,e){return re.splitLines(i).filter(t=>t.indexOf(e)===0)};re.parseCandidate=function(i){let e;i.indexOf("a=candidate:")===0?e=i.substring(12).split(" "):e=i.substring(10).split(" ");let t={foundation:e[0],component:{1:"rtp",2:"rtcp"}[e[1]]||e[1],protocol:e[2].toLowerCase(),priority:parseInt(e[3],10),ip:e[4],address:e[4],port:parseInt(e[5],10),type:e[7]};for(let n=8;n<e.length;n+=2)switch(e[n]){case"raddr":t.relatedAddress=e[n+1];break;case"rport":t.relatedPort=parseInt(e[n+1],10);break;case"tcptype":t.tcpType=e[n+1];break;case"ufrag":t.ufrag=e[n+1],t.usernameFragment=e[n+1];break;default:t[e[n]]===void 0&&(t[e[n]]=e[n+1]);break}return t};re.writeCandidate=function(i){let e=[];e.push(i.foundation);let t=i.component;t==="rtp"?e.push(1):t==="rtcp"?e.push(2):e.push(t),e.push(i.protocol.toUpperCase()),e.push(i.priority),e.push(i.address||i.ip),e.push(i.port);let n=i.type;return e.push("typ"),e.push(n),n!=="host"&&i.relatedAddress&&i.relatedPort!==void 0&&(e.push("raddr"),e.push(i.relatedAddress),e.push("rport"),e.push(i.relatedPort)),i.tcpType&&i.protocol.toLowerCase()==="tcp"&&(e.push("tcptype"),e.push(i.tcpType)),(i.usernameFragment||i.ufrag)&&(e.push("ufrag"),e.push(i.usernameFragment||i.ufrag)),"candidate:"+e.join(" ")};re.parseIceOptions=function(i){return i.substring(14).split(" ")};re.parseRtpMap=function(i){let e=i.substring(9).split(" "),t={payloadType:parseInt(e.shift(),10)};return e=e[0].split("/"),t.name=e[0],t.clockRate=parseInt(e[1],10),t.channels=e.length===3?parseInt(e[2],10):1,t.numChannels=t.channels,t};re.writeRtpMap=function(i){let e=i.payloadType;i.preferredPayloadType!==void 0&&(e=i.preferredPayloadType);let t=i.channels||i.numChannels||1;return"a=rtpmap:"+e+" "+i.name+"/"+i.clockRate+(t!==1?"/"+t:"")+`\r
`};re.parseExtmap=function(i){let e=i.substring(9).split(" ");return{id:parseInt(e[0],10),direction:e[0].indexOf("/")>0?e[0].split("/")[1]:"sendrecv",uri:e[1],attributes:e.slice(2).join(" ")}};re.writeExtmap=function(i){return"a=extmap:"+(i.id||i.preferredId)+(i.direction&&i.direction!=="sendrecv"?"/"+i.direction:"")+" "+i.uri+(i.attributes?" "+i.attributes:"")+`\r
`};re.parseFmtp=function(i){let e={},t=i.substring(i.indexOf(" ")+1).split(";");for(let n=0;n<t.length;n++){let[s,...r]=t[n].trim().split("=");e[s.trim()]=r.length?r.join("="):void 0}return e};re.writeFmtp=function(i){let e="",t=i.payloadType;if(i.preferredPayloadType!==void 0&&(t=i.preferredPayloadType),i.parameters&&Object.keys(i.parameters).length){let n=[];Object.keys(i.parameters).forEach(s=>{i.parameters[s]!==void 0?n.push(s+"="+i.parameters[s]):n.push(s)}),e+="a=fmtp:"+t+" "+n.join(";")+`\r
`}return e};re.parseRtcpFb=function(i){let e=i.substring(i.indexOf(" ")+1).split(" ");return{type:e.shift(),parameter:e.join(" ")}};re.writeRtcpFb=function(i){let e="",t=i.payloadType;return i.preferredPayloadType!==void 0&&(t=i.preferredPayloadType),i.rtcpFeedback&&i.rtcpFeedback.length&&i.rtcpFeedback.forEach(n=>{e+="a=rtcp-fb:"+t+" "+n.type+(n.parameter&&n.parameter.length?" "+n.parameter:"")+`\r
`}),e};re.parseSsrcMedia=function(i){let e=i.indexOf(" "),t={ssrc:parseInt(i.substring(7,e),10)},n=i.indexOf(":",e);return n>-1?(t.attribute=i.substring(e+1,n),t.value=i.substring(n+1)):t.attribute=i.substring(e+1),t};re.parseSsrcGroup=function(i){let e=i.substring(13).split(" ");return{semantics:e.shift(),ssrcs:e.map(t=>parseInt(t,10))}};re.getMid=function(i){let e=re.matchPrefix(i,"a=mid:")[0];if(e)return e.substring(6)};re.parseFingerprint=function(i){let e=i.substring(14).split(" ");return{algorithm:e[0].toLowerCase(),value:e[1].toUpperCase()}};re.getDtlsParameters=function(i,e){return{role:"auto",fingerprints:re.matchPrefix(i+e,"a=fingerprint:").map(re.parseFingerprint)}};re.writeDtlsParameters=function(i,e){let t="a=setup:"+e+`\r
`;return i.fingerprints.forEach(n=>{t+="a=fingerprint:"+n.algorithm+" "+n.value+`\r
`}),t};re.parseCryptoLine=function(i){let e=i.substring(9).split(" ");return{tag:parseInt(e[0],10),cryptoSuite:e[1],keyParams:e[2],sessionParams:e.slice(3)}};re.writeCryptoLine=function(i){return"a=crypto:"+i.tag+" "+i.cryptoSuite+" "+(typeof i.keyParams=="object"?re.writeCryptoKeyParams(i.keyParams):i.keyParams)+(i.sessionParams?" "+i.sessionParams.join(" "):"")+`\r
`};re.parseCryptoKeyParams=function(i){if(i.indexOf("inline:")!==0)return null;let e=i.substring(7).split("|");return{keyMethod:"inline",keySalt:e[0],lifeTime:e[1],mkiValue:e[2]?e[2].split(":")[0]:void 0,mkiLength:e[2]?e[2].split(":")[1]:void 0}};re.writeCryptoKeyParams=function(i){return i.keyMethod+":"+i.keySalt+(i.lifeTime?"|"+i.lifeTime:"")+(i.mkiValue&&i.mkiLength?"|"+i.mkiValue+":"+i.mkiLength:"")};re.getCryptoParameters=function(i,e){return re.matchPrefix(i+e,"a=crypto:").map(re.parseCryptoLine)};re.getIceParameters=function(i,e){let t=re.matchPrefix(i+e,"a=ice-ufrag:")[0],n=re.matchPrefix(i+e,"a=ice-pwd:")[0];return t&&n?{usernameFragment:t.substring(12),password:n.substring(10)}:null};re.writeIceParameters=function(i){let e="a=ice-ufrag:"+i.usernameFragment+`\r
a=ice-pwd:`+i.password+`\r
`;return i.iceLite&&(e+=`a=ice-lite\r
`),e};re.parseRtpParameters=function(i){let e={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},n=re.splitLines(i)[0].split(" ");e.profile=n[2];for(let r=3;r<n.length;r++){let o=n[r],a=re.matchPrefix(i,"a=rtpmap:"+o+" ")[0];if(a){let l=re.parseRtpMap(a),h=re.matchPrefix(i,"a=fmtp:"+o+" ");switch(l.parameters=h.length?re.parseFmtp(h[0]):{},l.rtcpFeedback=re.matchPrefix(i,"a=rtcp-fb:"+o+" ").map(re.parseRtcpFb),e.codecs.push(l),l.name.toUpperCase()){case"RED":case"ULPFEC":e.fecMechanisms.push(l.name.toUpperCase());break;default:break}}}re.matchPrefix(i,"a=extmap:").forEach(r=>{e.headerExtensions.push(re.parseExtmap(r))});let s=re.matchPrefix(i,"a=rtcp-fb:* ").map(re.parseRtcpFb);return e.codecs.forEach(r=>{s.forEach(o=>{r.rtcpFeedback.find(l=>l.type===o.type&&l.parameter===o.parameter)||r.rtcpFeedback.push(o)})}),e};re.writeRtpDescription=function(i,e){let t="";t+="m="+i+" ",t+=e.codecs.length>0?"9":"0",t+=" "+(e.profile||"UDP/TLS/RTP/SAVPF")+" ",t+=e.codecs.map(s=>s.preferredPayloadType!==void 0?s.preferredPayloadType:s.payloadType).join(" ")+`\r
`,t+=`c=IN IP4 0.0.0.0\r
`,t+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,e.codecs.forEach(s=>{t+=re.writeRtpMap(s),t+=re.writeFmtp(s),t+=re.writeRtcpFb(s)});let n=0;return e.codecs.forEach(s=>{s.maxptime>n&&(n=s.maxptime)}),n>0&&(t+="a=maxptime:"+n+`\r
`),e.headerExtensions&&e.headerExtensions.forEach(s=>{t+=re.writeExtmap(s)}),t};re.parseRtpEncodingParameters=function(i){let e=[],t=re.parseRtpParameters(i),n=t.fecMechanisms.indexOf("RED")!==-1,s=t.fecMechanisms.indexOf("ULPFEC")!==-1,r=re.matchPrefix(i,"a=ssrc:").map(c=>re.parseSsrcMedia(c)).filter(c=>c.attribute==="cname"),o=r.length>0&&r[0].ssrc,a,l=re.matchPrefix(i,"a=ssrc-group:FID").map(c=>c.substring(17).split(" ").map(f=>parseInt(f,10)));l.length>0&&l[0].length>1&&l[0][0]===o&&(a=l[0][1]),t.codecs.forEach(c=>{if(c.name.toUpperCase()==="RTX"&&c.parameters.apt){let u={ssrc:o,codecPayloadType:parseInt(c.parameters.apt,10)};o&&a&&(u.rtx={ssrc:a}),e.push(u),n&&(u=JSON.parse(JSON.stringify(u)),u.fec={ssrc:o,mechanism:s?"red+ulpfec":"red"},e.push(u))}}),e.length===0&&o&&e.push({ssrc:o});let h=re.matchPrefix(i,"b=");return h.length&&(h[0].indexOf("b=TIAS:")===0?h=parseInt(h[0].substring(7),10):h[0].indexOf("b=AS:")===0?h=parseInt(h[0].substring(5),10)*1e3*.95-2e3*8:h=void 0,e.forEach(c=>{c.maxBitrate=h})),e};re.parseRtcpParameters=function(i){let e={},t=re.matchPrefix(i,"a=ssrc:").map(r=>re.parseSsrcMedia(r)).filter(r=>r.attribute==="cname")[0];t&&(e.cname=t.value,e.ssrc=t.ssrc);let n=re.matchPrefix(i,"a=rtcp-rsize");e.reducedSize=n.length>0,e.compound=n.length===0;let s=re.matchPrefix(i,"a=rtcp-mux");return e.mux=s.length>0,e};re.writeRtcpParameters=function(i){let e="";return i.reducedSize&&(e+=`a=rtcp-rsize\r
`),i.mux&&(e+=`a=rtcp-mux\r
`),i.ssrc!==void 0&&i.cname&&(e+="a=ssrc:"+i.ssrc+" cname:"+i.cname+`\r
`),e};re.parseMsid=function(i){let e,t=re.matchPrefix(i,"a=msid:");if(t.length===1)return e=t[0].substring(7).split(" "),{stream:e[0],track:e[1]};let n=re.matchPrefix(i,"a=ssrc:").map(s=>re.parseSsrcMedia(s)).filter(s=>s.attribute==="msid");if(n.length>0)return e=n[0].value.split(" "),{stream:e[0],track:e[1]}};re.parseSctpDescription=function(i){let e=re.parseMLine(i),t=re.matchPrefix(i,"a=max-message-size:"),n;t.length>0&&(n=parseInt(t[0].substring(19),10)),isNaN(n)&&(n=65536);let s=re.matchPrefix(i,"a=sctp-port:");if(s.length>0)return{port:parseInt(s[0].substring(12),10),protocol:e.fmt,maxMessageSize:n};let r=re.matchPrefix(i,"a=sctpmap:");if(r.length>0){let o=r[0].substring(10).split(" ");return{port:parseInt(o[0],10),protocol:o[1],maxMessageSize:n}}};re.writeSctpDescription=function(i,e){let t=[];return i.protocol!=="DTLS/SCTP"?t=["m="+i.kind+" 9 "+i.protocol+" "+e.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+e.port+`\r
`]:t=["m="+i.kind+" 9 "+i.protocol+" "+e.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+e.port+" "+e.protocol+` 65535\r
`],e.maxMessageSize!==void 0&&t.push("a=max-message-size:"+e.maxMessageSize+`\r
`),t.join("")};re.generateSessionId=function(){return Math.random().toString().substr(2,22)};re.writeSessionBoilerplate=function(i,e,t){let n,s=e!==void 0?e:2;return i?n=i:n=re.generateSessionId(),`v=0\r
o=`+(t||"thisisadapterortc")+" "+n+" "+s+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`};re.getDirection=function(i,e){let t=re.splitLines(i);for(let n=0;n<t.length;n++)switch(t[n]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return t[n].substring(2);default:}return e?re.getDirection(e):"sendrecv"};re.getKind=function(i){return re.splitLines(i)[0].split(" ")[0].substring(2)};re.isRejected=function(i){return i.split(" ",2)[1]==="0"};re.parseMLine=function(i){let t=re.splitLines(i)[0].substring(2).split(" ");return{kind:t[0],port:parseInt(t[1],10),protocol:t[2],fmt:t.slice(3).join(" ")}};re.parseOLine=function(i){let t=re.matchPrefix(i,"o=")[0].substring(2).split(" ");return{username:t[0],sessionId:t[1],sessionVersion:parseInt(t[2],10),netType:t[3],addressType:t[4],address:t[5]}};re.isValidSDP=function(i){if(typeof i!="string"||i.length===0)return!1;let e=re.splitLines(i);for(let t=0;t<e.length;t++)if(e[t].length<2||e[t].charAt(1)!=="=")return!1;return!0};typeof vf=="object"&&(vf.exports=re)});var Us=.03333333333333333,td=2,gt=[{name:"Grulla",color:15026253,css:"#ef5a5f"},{name:"Carpa",color:3900150,css:"#5b9bff"},{name:"Mantis",color:4176208,css:"#4cc764"},{name:"B\xFAho",color:16098596,css:"#f7b23b"}],qt=[{name:"Brasa",role:"Ataque",spec:"Estallido",cd:9,color:16742959,css:"#ff8a3d",desc:"Lanza una bola de fuego que explota y deja ardiendo a los rivales."},{name:"Marea",role:"Apoyo",spec:"Manantial",cd:12,color:3720948,css:"#4fd0ff",desc:"Cura a todo tu equipo cercano y limpia quemaduras y enredos."},{name:"Ra\xEDz",role:"Control",spec:"Zarza",cd:10,color:10212938,css:"#a8e05a",desc:"Hace brotar zarzas que atrapan y frenan a los rivales."}],ni=[{name:"Sol",color:16762941,css:"#ffcf4a"},{name:"Luna",color:12175615,css:"#c3d0ff"}],Z={HP:100,SPEED:5,RADIUS:.34,OBST_R:.4,MELEE_R:1.8,MELEE_ARC:1,MELEE_DMG:14,MELEE_CD:.42,LUNGE:.45,SH_DMG:9,SH_SPEED:17,SH_TTL:.62,SH_MAX:3,SH_RECH:2.2,SH_HIT:.5,DASH_T:.16,DASH_MULT:3.4,DASH_INV:.26,DASH_CD:4.5,SPEC_RANGE:7.5,FIRE_T:.45,FIRE_R:2.3,FIRE_DMG:24,BURN_T:3,BURN_DPS:4,HEAL_R:3.6,HEAL_AMT:32,SEED_T:.4,BRAMBLE_R:2.3,BRAMBLE_T:4.5,BRAMBLE_DMG:7,ROOT_T:1.4,SLOW_MULT:.55,DOWN_T:18,DOWN_EARLY:8,RESPAWN_INV:2.5,REVIVE_T:2.6,REVIVE_R:1.5,REVIVE_HP:45,REVIVE_INV:1.2,REGEN_DELAY:6,REGEN:2,PICK_R:.95,FOOD_HP:40,FOOD_RESPAWN:25,SHRINE_R:3.4,PLAZA_R:6.5,DELIVER_T:6,VIEW:11,BUSH_SEE:2.3,REVEAL_T:1.1,COUNTDOWN:4,ZONE_R0:72,POW_MAX:3,POW_SPEED:.18,POW_RESPAWN:12,BOOM_R:1.7,STAR_PICK:.85,STAR_LOCK:.5},M0=[{wait:90,shrink:35,r:44,dps:4},{wait:20,shrink:28,r:28,dps:6},{wait:20,shrink:25,r:15,dps:9},{wait:20,shrink:22,r:6.5,dps:12},{wait:22,shrink:22,r:.5,dps:18}],S0=[{wait:20,shrink:25,r:27,dps:6},{wait:25,shrink:22,r:19,dps:9},{wait:25,shrink:20,r:12,dps:12},{wait:22,shrink:20,r:6.5,dps:16},{wait:12,shrink:16,r:.5,dps:22}],ii=[{id:0,name:"Cl\xE1sico",tag:"T\xE1ctico: cacer\xEDa, muerte s\xFAbita y peleas largas.",speed:5,dashMax:1,dashCd:4.5,dashInv:.26,lunge:.45,meleeReach:0,meleeDmg:14,shDmg:9,fireDmg:24,brambleDmg:7,healAmt:32,starPickup:!1,starLife:0,resurge:!1,powerups:!1,half:!1,zoneR0:72,zone:M0,deliverT:6,mmHalf:48},{id:1,name:"Frenes\xED",tag:"R\xE1pido: dos golpes derriban, esquiva constante y reapareces junto a tu equipo.",speed:6,dashMax:2,dashCd:1,dashInv:.18,lunge:1,meleeReach:.5,meleeDmg:50,shDmg:34,fireDmg:55,brambleDmg:20,healAmt:50,starPickup:!0,starLife:10,resurge:!0,powerups:!0,half:!0,respBase:2,respStage:.5,respKill:.5,respMin:1,respInv:1.5,wipeT:4,lastLifeStage:3,openStage:1,zoneR0:38,zone:S0,deliverT:4,mmHalf:38}],ea=[{id:0,name:"Bosque",short:"Bosque",tag:"El bosque original: r\xEDos con puentes, claros y matorrales."},{id:1,name:"Cruce de Clanes",short:"Cruce",tag:"Tres carriles por base, r\xEDo en cruz y jungla con criaturas."},{id:2,name:"Anillo del R\xEDo",short:"Anillo",tag:"Dos carriles por base, r\xEDo en anillo alrededor del santuario y jungla grande."}],st=[{name:"P\xE1jaro",tier:0,hp:[90,150],dmg:[9,20],r:.5,speed:4.6,reach:1.45,arc:1.1,cd:1.2,wind:.4,leash:7,first:[0,0],resp:[50,35],color:4165600,css:"#7cc4ff",h:2.1,sc:1,prize:"un potenciador para cada uno"},{name:"Pez",tier:0,hp:[90,150],dmg:[9,20],r:.55,speed:0,reach:1.8,arc:7,cd:1.4,wind:.5,leash:4,first:[0,0],resp:[50,35],color:16747069,css:"#ffb070",h:1.3,sc:1,prize:"un potenciador para cada uno"},{name:"Pulpo",tier:1,hp:[220,360],dmg:[14,30],r:.75,speed:3.6,reach:1.9,arc:7,cd:1.6,wind:.6,leash:7.5,first:[40,20],resp:[80,60],color:10181846,css:"#c99bff",h:2.3,sc:1.1,prize:"dos potenciadores y +50 de vida",spawn:"Sali\xF3 un Pulpo en el r\xEDo"},{name:"Oso",tier:2,hp:[380,640],dmg:[22,45],r:.95,speed:3.6,reach:2.3,arc:7,cd:1.9,wind:.75,leash:8.5,first:[75,40],resp:[120,90],color:9065776,css:"#e09a5e",h:3.1,sc:1.2,prize:"vida llena, Coraza y un potenciador",spawn:"\xA1Despert\xF3 un Oso en el r\xEDo!"}],_n=[{name:"Viento",desc:"Corres m\xE1s r\xE1pido",color:8315135,css:"#7ee0ff"},{name:"Sombra",desc:"Una esquiva m\xE1s",color:11898111,css:"#b58cff"},{name:"P\xF3lvora",desc:"Tus estrellas explotan",color:16751165,css:"#ff9a3d"},{name:"Coraza",desc:"Aguanta un golpe",color:16769162,css:"#ffe08a"}];function nd(i){let e=0;for(let t=i.length-1;t>=0;t--)e=e*5+(i[t]+1);return e}function ta(i,e){for(e.length=0;i>0;)e.push(i%5-1),i=Math.floor(i/5);return e}function _s(i,e){let t=0;for(let n=0;n<i.length;n++)i[n]===e&&t++;return t}var Cr=[{name:"F\xE1cil",react:.5,aim:.32,dmg:.55,special:.35,dash:.2},{name:"Normal",react:.3,aim:.17,dmg:.8,special:.7,dash:.5},{name:"Dif\xEDcil",react:.16,aim:.07,dmg:1,special:1,dash:.85}],na=["Aki","Ren","Taro","Mika","Nao","Daigo","Kaede","Jin","Goro","Emi","Riku","Suzu","Tetsu","Kohaku","Asahi","Kenta","Toma","Ryu","Noa","Yori","Isamu","Momo","Kiyo","Hiro","Yuna","Reo","Kazu","Mai","Eiji","Fumi","Nori","Saki","Tomo","Umi"],Te=0,Ot=1,Yt=2,ia=1,sa=2,Os=4,ra=8,oa=16,Fs=32,aa=64;function si(i){let e=i>>>0;return function(){e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Xi(i,e){let t=i-e;for(;t>Math.PI;)t-=2*Math.PI;for(;t<-Math.PI;)t+=2*Math.PI;return t}function yt(i,e,t){return i<e?e:i>t?t:i}var ri=0,Yn=1,yn=2,Rn=3,wn=4,Jn=5,Ri=6,ji=7,an=8,vn=9,xi=10,T0=.8,vt=96/2,Pr=11,id=5.2,sd=21,rd=31,E0=35.5,qi=27;function jn(i){return i===Rn||i===wn||i===Jn||i===an||i===vn}function Yi(i,e,t){for(;t>0;t--){let n=96-e;e=i,i=n}return{x:i,z:e}}function ks(i,e,t,n){let s=e,r=t;for(let o=0;o<4;o++){i[r*96+s]=n;let a=95-r;r=s,s=a}}function oh(i,e){let t=e+1,n=new Float32Array(t*t);for(let s=0;s<n.length;s++)n[s]=i();return function(s,r){let o=yt(s,0,1)*e,a=yt(r,0,1)*e,l=Math.floor(o),h=Math.floor(a);l>=e&&(l=e-1),h>=e&&(h=e-1);let c=o-l,u=a-h,f=c*c*(3-2*c),d=u*u*(3-2*u),p=n[h*t+l],v=n[h*t+l+1],m=n[(h+1)*t+l],g=n[(h+1)*t+l+1];return p+(v-p)*f+(m-p)*d+(p-v-m+g)*f*d}}function Ir(i,e,t){if(t===1||t===2)return w0(i,e,t);let n=e===1,s=si(i),r=new Uint8Array(9216),o=new Uint8Array(9216),a=si((i^5369127)>>>0);for(let _=0;_<o.length;_++)o[_]=a()*256|0;let l=oh(s,6),h=oh(s,7),c=oh(s,8),u=new Float32Array(vt+2);{let _=0;for(let b=0;b<u.length;b++){_+=(s()-.5)*1.1,_=yt(_,-3.2,3.2);let C=yt((b-15)/5,0,1)*yt((42-b)/5,0,1);u[b]=_*C}}for(let _=0;_<vt;_++)for(let b=0;b<vt;b++){let C=vt-(b+.5),I=vt-(_+.5),M=Math.sqrt(C*C+I*I),w=b/(vt-1),A=_/(vt-1),y=b+.5-Pr,S=_+.5-Pr,P=Math.sqrt(y*y+S*S),L=b+_>>1,T=Math.round(u[L]),N=Math.abs(b-_-T)<=1&&L>=Pr-1,U=yt(Math.min(C,I)/7,0,1),F=sd+(l(w,A)-.5)*5*U,J=Math.abs(M-F)<1.3,B=(b>=vt-2||_>=vt-2)&&M<rd+1,k=Math.abs(M-rd)<1.15,G=s(),ue=s(),he=ri;if(b<3||_<3)he=an;else if(M<Z.PLAZA_R)he=ji;else if(J)he=N||B?Ri:Jn;else if(P<id)he=Yn;else if(N||B||k)he=Yn;else{let Y=h(w,A),ne=c(w,A),ve=M<sd-2.5,pe=M<10.5,ce=P<id+1.5,Oe=Math.abs(M-F)<2.4;if(!pe&&!ce){let at=Y>.62?.42:Y>.48?.17:.05;ve&&(at*=.5),Oe&&(at*=.4),(b<6||_<6)&&(at=Math.max(at,.55)),G<at?he=Rn:G<at+(ve?.04:.02)?he=wn:(ne>.68||ne>.6&&ue<.35)&&(he=yn)}}ks(r,b,_,he)}if(ks(r,43,43,vn),r[4174]=vn,r[4177]=vn,n){for(let _=0;_<96;_++)for(let b=0;b<96;b++){let C=vt-(b+.5),I=vt-(_+.5),M=E0+(o[_*96+b]/255-.5)*1.6;C*C+I*I>M*M&&(r[_*96+b]=an)}for(let _=qi-4;_<=qi+4;_++)for(let b=qi-4;b<=qi+4;b++){let C=b+.5-qi,I=_+.5-qi,M=r[_*96+b];C*C+I*I<2.7*2.7&&M!==Jn&&M!==Ri&&M!==ji&&ks(r,b,_,Yn)}}function f(_,b){let C=[];for(let I=0;I<_.length;I++){let M=Math.floor(_[I].x),w=Math.floor(_[I].z);b&&(jn(r[w*96+M])||r[w*96+M]===yn)&&ks(r,M,w,Yn);for(let A=0;A<4;A++)C.push(Yi(_[I].x,_[I].z,A))}return C}let d=f([{x:38.5,z:38.5},{x:24.5,z:27.5}],!0),p=n?f([{x:29.5,z:29.5},{x:40.5,z:33.5},{x:20.5,z:40.5}],!0):[],v=n?[{x:26.5,z:26.5},{x:28.3,z:26.3},{x:26.3,z:28.3}]:[{x:10.5,z:10.5},{x:12.6,z:10.2},{x:10.2,z:12.6}],m=[],g=[];for(let _=0;_<4;_++)m.push(v.map(function(b){return Yi(b.x,b.z,_)})),g.push(n?Yi(qi,qi,_):Yi(Pr,Pr,_));let x=d.concat(p);for(let _=0;_<4;_++)for(let b=0;b<3;b++)x.push(m[_][b]);return cd(r,x),{seed:i,tiles:r,vari:o,pickups:d,spawns:m,camps:g,items:p,half:n,mobs:[],mmHalf:n?38:48}}var ca=.7071067811865476;function A0(i,e,t,n,s,r){let o=s-t,a=r-n,l=o*o+a*a,h=l>0?((i-t)*o+(e-n)*a)/l:0;h=h<0?0:h>1?1:h;let c=i-(t+o*h),u=e-(n+a*h);return c*c+u*u}function od(i,e,t){let n=Math.imul(i+1,374761393)^Math.imul(e+7,668265263)^Math.imul(t,1274126177);return n=Math.imul(n^n>>>13,1274126177),n^=n>>>16,(n>>>0)/4294967296}function w0(i,e,t){let n=e===1,s=n?17:5,r=vt-s,o=r/43,a=si((i^Math.imul(t,1540483477))>>>0),l=i|0,h=new Uint8Array(9216),c=new Uint8Array(9216),u=si((i^5369127)>>>0);for(let B=0;B<c.length;B++)c[B]=u()*256|0;let f=function(){return Math.floor(a()*3)-1},d=5,p=6,v=t===2,m=Math.round(r*.5)+.5,g=v?r-m:Math.round(r*.5)+.5,x=v?[Math.round(8*o)+.5+f(),Math.round(17*o)+.5+f()]:[Math.round(9*o)+.5+f(),Math.round(16*o)+.5+f()],_=v?[Math.round(11*o)+.5+f(),Math.round(29*o)+.5+f()]:[Math.round(13*o)+.5+f(),Math.round(30*o)+.5+f()];x[0]<7.5&&(x[0]=7.5),_[0]<8.5&&(_[0]=8.5);let b=[];function C(B,k,G){b.push([B[0],B[1],k[0],k[1],G||1.35])}let I=(x[0]+x[1])/2,M=(_[0]+_[1])/2;if(C([2,x[1]-1],x),C(x,[(x[0]+_[0])/2-1+f()*.5,(x[1]+_[1])/2]),C([(x[0]+_[0])/2-1+f()*.5,(x[1]+_[1])/2],_),C(_,[2,_[1]+1.5+f()]),C(_,[g,r-5.5]),!v)C(x,[I-.75,I+.75]),C(_,[M-.75,M+.75]),C([g+3.5,r-5],[r-9,r-7.5]);else{let B=r-(m+2.5)*ca;C([d+2,d+2],[B,B],1.6),C(x,[I,I]);let k=_[0]-r,G=_[1]-r,ue=Math.sqrt(k*k+G*G);C(_,[r+k/ue*(m+2),r+G/ue*(m+2)]);let he=r-(m+7)*ca;C([he-3,he+2],[he+2,he-3],1.2)}let w=[x,_];function A(B,k){let G=Math.min(B,k),ue=Math.max(B,k),he=G+.5,Y=ue+.5,ne=od(G,ue,l),ve=od(ue,G+101,l),pe=r-he,ce=r-Y,Oe=Math.sqrt(pe*pe+ce*ce);if(Oe<Z.PLAZA_R)return ji;let at=he-d,Ne=Y-d,ot=at*at+Ne*Ne;if(ot<p*p)return ot<2.6*2.6?ji:Yn;if(G===0)return ne<.2?wn:Rn;{let pt=he-g,ht=Y-r,Ut=pt*pt+ht*ht;if(Ut<3.6*3.6)return xi;if(Ut<4.9*4.9&&Math.abs(pt)>1.7&&Math.abs(ht)>1.7)return wn}let lt=v?Math.abs(Oe-m):r-Y;if(lt<2)return xi;if(G>=1&&G<=3)return Yn;let Qe=v?99:ue-G;if(Qe<=2)return Yn;if(Qe<=3)return ne<.08?yn:ri;if(lt<4)return ne<.22?yn:ri;if(G===4)return(ue>>2)%3===1?yn:ri;if(v&&Oe<m)return ne<.05?Rn:ne<.08?wn:ve<.16?yn:ri;for(let pt=0;pt<w.length;pt++){let ht=he-w[pt][0],Ut=Y-w[pt][1],bt=ht*ht+Ut*Ut;if(pt===1&&bt<1.75*1.75)return xi;if(bt<2.7*2.7)return bt>2.1*2.1&&ne<.35?yn:ri}for(let pt=0;pt<b.length;pt++){let ht=b[pt];if(A0(he,Y,ht[0],ht[1],ht[2],ht[3])<ht[4]*ht[4])return ne<.1?yn:ri}return ne<.07?wn:Rn}for(let B=0;B<vt;B++)for(let k=0;k<vt;k++){let G=k-s,ue=B-s;ks(h,k,B,G<0||ue<0?an:A(G,ue))}ks(h,43,43,vn),h[4174]=vn,h[4177]=vn;function y(B,k,G){let ue=[],he=G?[{x:s+B,z:s+k}]:[{x:s+B,z:s+k},{x:s+k,z:s+B}];for(let Y=0;Y<4;Y++)for(let ne=0;ne<he.length;ne++)ue.push(Yi(he[ne].x,he[ne].z,Y));return ue}let S=[(x[0]+_[0])/2-1,(x[1]+_[1])/2],P=y(S[0],S[1],!1),L=n?y(2,r,!0).concat(v?y(r-(m+4)*ca,r-(m+4)*ca,!0):y(r*.7,r*.7,!0)):[],T=[{x:s+d+.5,z:s+d+.5},{x:s+d+2.6,z:s+d+.2},{x:s+d+.2,z:s+d+2.6}],N=[],U=[];for(let B=0;B<4;B++)N.push(T.map(function(k){return Yi(k.x,k.z,B)})),U.push(Yi(s+d,s+d,B));let F=[];for(let B=0;B<w.length;B++)y(w[B][0],w[B][1],!1).forEach(function(k){F.push({kind:B,x:k.x,z:k.z})});for(let B=0;B<4;B++){let k=Yi(s+g,vt,B);F.push({kind:B%2===0?2:3,x:k.x,z:k.z})}let J=P.concat(L);for(let B=0;B<4;B++)for(let k=0;k<3;k++)J.push(N[B][k]);for(let B=0;B<F.length;B++)J.push(F[B]);return cd(h,J),{seed:i,tiles:h,vari:c,pickups:P,spawns:N,camps:U,items:L,half:!1,arena:t,mobs:F,E:s,zoneR0:n?46:0,mmHalf:r+1}}function cd(i,e){let t=new Uint8Array(9216);function n(){t.fill(0);let r=[vt*96+vt];for(t[vt*96+vt]=1;r.length;){let o=r.pop(),a=o%96,l=o/96|0,h=[a>0?o-1:-1,a<95?o+1:-1,l>0?o-96:-1,l<95?o+96:-1];for(let c=0;c<4;c++){let u=h[c];u<0||t[u]||jn(i[u])||(t[u]=1,r.push(u))}}}n();let s=!1;for(let r=0;r<e.length;r++){let o=Math.floor(e[r].x),a=Math.floor(e[r].z),l=0;for(;!t[a*96+o]&&l++<200;){let h=i[a*96+o];h===Jn?i[a*96+o]=Ri:jn(h)&&(i[a*96+o]=Yn),s=!0;let c=vt-o,u=vt-a;Math.abs(c)>=Math.abs(u)?o+=c>0?1:-1:a+=u>0?1:-1}}s&&n();for(let r=0;r<i.length;r++)!t[r]&&!jn(i[r])&&(i[r]=Rn)}function ys(i,e,t,n){let s=e===2?t*2:t;return i.spawns[s%4][n%3]}function ld(i,e,t){return i.camps[(e===2?t*2:t)%4]}function Dn(i,e,t){let n=Math.floor(e),s=Math.floor(t);return n<0||s<0||n>=96||s>=96?an:i.tiles[s*96+n]}function ad(i,e,t){let n=i.tiles;{let s=e.x-vt,r=e.z-vt,o=s*s+r*r,a=t+T0;if(o<a*a)if(o<1e-9)e.z=vt+a;else{let l=Math.sqrt(o);e.x=vt+s/l*a,e.z=vt+r/l*a}}for(let s=0;s<2;s++){let r=Math.floor(e.x),o=Math.floor(e.z);for(let a=o-1;a<=o+1;a++)for(let l=r-1;l<=r+1;l++){let h=l<0||a<0||l>=96||a>=96?an:n[a*96+l];if(h===Rn||h===wn||h===vn){let c=l+.5,u=a+.5,f=e.x-c,d=e.z-u,p=f*f+d*d,v=t+Z.OBST_R;if(p<v*v)if(p<1e-9)e.x=c+v;else{let m=Math.sqrt(p);e.x=c+f/m*v,e.z=u+d/m*v}}else if(h===Jn||h===an){let c=yt(e.x,l,l+1),u=yt(e.z,a,a+1),f=e.x-c,d=e.z-u,p=f*f+d*d;if(p<t*t)if(p>1e-9){let v=Math.sqrt(p);e.x=c+f/v*t,e.z=u+d/v*t}else{let v=e.x-l,m=l+1-e.x,g=e.z-a,x=a+1-e.z,_=Math.min(v,m,g,x);_===v?e.x=l-t:_===m?e.x=l+1+t:_===g?e.z=a-t:e.z=a+1+t}}}}}function Ji(i,e,t,n,s){let r=Math.sqrt(t*t+n*n);if(r<1e-6){ad(i,e,s);return}let o=Math.max(1,Math.ceil(r/.2)),a=t/o,l=n/o;for(let h=0;h<o;h++)e.x+=a,e.z+=l,ad(i,e,s);e.x=yt(e.x,.5,96-.5),e.z=yt(e.z,.5,96-.5)}function Lr(i,e,t,n,s){let r=n-e,o=s-t,a=Math.sqrt(r*r+o*o),l=Math.ceil(a/.3);for(let h=1;h<l;h++){let c=e+r*h/l,u=t+o*h/l,f=Dn(i,c,u);if(f===an)return!1;if(f===Rn||f===wn||f===vn){let d=c-(Math.floor(c)+.5),p=u-(Math.floor(u)+.5);if(d*d+p*p<.2)return!1}}return!0}function ah(i,e,t,n,s){let r=n-e,o=s-t,a=Math.sqrt(r*r+o*o);if(a<1e-6)return!0;let l=Math.ceil(a/.25),h=-o/a*.36,c=r/a*.36;for(let u=0;u<=l;u++){let f=e+r*u/l,d=t+o*u/l;if(jn(Dn(i,f,d))||jn(Dn(i,f+h,d+c))||jn(Dn(i,f-h,d-c)))return!1}return!0}function Zi(i,e,t){let n=Math.floor(e),s=Math.floor(t);for(let r=0;r<12;r++){let o=null,a=1e9;for(let l=s-r;l<=s+r;l++)for(let h=n-r;h<=n+r;h++){if(Math.max(Math.abs(h-n),Math.abs(l-s))!==r||h<0||l<0||h>=96||l>=96||jn(i.tiles[l*96+h]))continue;let c=h+.5-e,u=l+.5-t,f=c*c+u*u;f<a&&(a=f,o={x:h+.5,z:l+.5})}if(o)return o}return{x:vt,z:vt}}var la=class{constructor(e){this.map=e;let t=9216;this.walk=new Uint8Array(t);for(let n=0;n<t;n++)this.walk[n]=jn(e.tiles[n])?0:1;this.g=new Float32Array(t),this.from=new Int32Array(t),this.mark=new Uint32Array(t),this.done=new Uint32Array(t),this.gen=0,this.hk=new Int32Array(t*4),this.hf=new Float32Array(t*4),this.hn=0}_push(e,t){let n=this.hk,s=this.hf,r=this.hn++;if(r>=n.length){this.hn--;return}for(;r>0;){let o=r-1>>1;if(s[o]<=t)break;n[r]=n[o],s[r]=s[o],r=o}n[r]=e,s[r]=t}_pop(){let e=this.hk,t=this.hf,n=e[0],s=--this.hn;if(s>0){let r=e[s],o=t[s],a=0;for(;;){let l=a*2+1;if(l>=s||(l+1<s&&t[l+1]<t[l]&&l++,t[l]>=o))break;e[a]=e[l],t[a]=t[l],a=l}e[a]=r,t[a]=o}return n}_free(e,t){let n=Math.floor(e),s=Math.floor(t);if(n>=0&&s>=0&&n<96&&s<96&&this.walk[s*96+n])return s*96+n;let r=Zi(this.map,e,t);return Math.floor(r.z)*96+Math.floor(r.x)}find(e,t,n,s){let r=this.walk,o=this.g,a=this.from,l=this.mark,h=this.done,c=this._free(e,t),u=this._free(n,s),f=u%96,d=u/96|0;if(c===u)return[f+.5,d+.5];let p=++this.gen;this.hn=0,o[c]=0,l[c]=p,a[c]=-1,this._push(c,0);let v=0,m=!1;for(;this.hn>0&&v++<14e3;){let b=this._pop();if(h[b]===p)continue;if(h[b]=p,b===u){m=!0;break}let C=b%96,I=b/96|0;for(let M=-1;M<=1;M++)for(let w=-1;w<=1;w++){if(!w&&!M)continue;let A=C+w,y=I+M;if(A<0||y<0||A>=96||y>=96)continue;let S=y*96+A;if(!r[S]||h[S]===p)continue;let P=w!==0&&M!==0;if(P&&(!r[I*96+A]||!r[y*96+C]))continue;let L=o[b]+(P?1.4142:1);if(l[S]!==p||L<o[S]){o[S]=L,l[S]=p,a[S]=b;let T=Math.abs(A-f),N=Math.abs(y-d),U=T>N?T+N*.4142:N+T*.4142;this._push(S,L+U*1.001)}}}if(!m)return null;let g=[],x=u;for(;x!==c&&x>=0;)g.push(x),x=a[x];let _=[];for(let b=g.length-1;b>=0;b--)_.push(g[b]%96+.5,(g[b]/96|0)+.5);return _}};function At(i){return Math.round(i*100)}var ha=class{constructor(e,t,n){this.map=e,this.mode=n.mode===1?1:0;let s=this.R=ii[this.mode];this.lastLife=!1,this.nTeams=n.teams,this.diff=Cr[n.diff==null?1:n.diff],this.rng=si(((n.seed|0)^625341585)>>>0),this.clock=0,this.t=0,this.phase=0,this.count=Z.COUNTDOWN,this.events=[],this.nextId=1,this.ninjas=[];for(let h=0;h<t.length;h++){let c=t[h],u=ys(e,this.nTeams,c.team,c.slot);this.ninjas.push({id:c.id,team:c.team,slot:c.slot,cls:c.cls,name:c.name,bot:!!c.bot,x:u.x,z:u.z,f:Math.atan2(48-u.x,48-u.z),px:u.x,pz:u.z,vx:0,vz:0,mx:0,mz:0,moving:!1,hp:Z.HP,st:Te,downT:0,revP:0,meleeCd:0,charges:Z.SH_MAX,throwCd:0,dash:s.dashMax,dashGap:0,dashT:0,dashA:0,lungeT:0,lungeA:0,specCd:2.5,invT:0,pw:[],life:0,burnT:0,burnBy:-1,burnAcc:0,rootT:0,slowT:0,revealT:0,zoneAcc:0,hurtT:-99,combatT:-99,bush:!1,cM:0,cS:0,cX:0,cH:0,cD:0,kills:0,dmg:0,revs:0})}this.teamOut=[],this.outOrder=[],this.scrolls=[];for(let h=0;h<this.nTeams;h++){this.teamOut.push(!1);let c=this.ninjas[h*3];this.scrolls.push({id:h,kind:h%2,carrier:c.id,x:c.x,z:c.z,lock:0})}this.pickups=e.pickups.map(function(h){return{x:h.x,z:h.z,on:!0,t:0}});let r=this.rng;this.items=s.powerups?e.items.map(function(h){return{x:h.x,z:h.z,type:Math.floor(r()*4),on:!0,t:0}}):[],this.stars=[];let o=this.mode;this.mobs=(e.mobs||[]).map(function(h,c){let u=st[h.kind];return{id:c,kind:h.kind,hx:h.x,hz:h.z,x:h.x,z:h.z,f:Math.atan2(48-h.x,48-h.z),hp:u.hp[o],st:u.first[o]>0?0:1,respT:u.first[o],tgt:-1,atkCd:0,windT:0,cA:0,cH:0,hitT:-99,retT:0,moving:!1,gone:!1}}),this.mobHitBy=null,this.proj=[],this.areas=[];let a=s.zone,l=e.zoneR0||s.zoneR0;this.zone={r:l,from:l,to:a[0].r,stage:0,timer:a[0].wait,shrinking:!1,dps:a[0].dps},this.deliver=[];for(let h=0;h<this.nTeams;h++)this.deliver.push(0);this.winner=-1}ev(e){this.events.push(e)}hunting(){return this.zone.stage===0&&!this.zone.shrinking}sealed(){return this.R.resurge?this.zone.stage<this.R.openStage:this.hunting()}speedOf(e){return this.R.speed*(1+Z.POW_SPEED*_s(e.pw,0))*(e.slowT>0?Z.SLOW_MULT:1)}dashMaxOf(e){return this.R.dashMax+_s(e.pw,1)}fresh(e,t,n,s){e.x=t,e.z=n,e.px=t,e.pz=n,e.vx=0,e.vz=0,e.f=Math.atan2(48-t,48-n),e.st=Te,e.hp=Z.HP,e.invT=s,e.revP=0,e.downT=0,e.charges=Z.SH_MAX,e.meleeCd=0,e.dash=this.dashMaxOf(e),e.dashGap=0,e.combatT=this.t,this.ev(["resp",e.id])}respawn(e){let t=ys(this.map,this.nTeams,e.team,e.slot);this.fresh(e,t.x,t.z,Z.RESPAWN_INV)}resurge(e){let t=this.ninjas,n=this.map,s=null,r=-1;for(let h=0;h<t.length;h++){let c=t[h];if(c.team!==e.team||c.st!==Te)continue;let u=99;for(let f=0;f<t.length;f++){let d=t[f];if(d.team===e.team||d.st!==Te)continue;let p=Math.sqrt((d.x-c.x)*(d.x-c.x)+(d.z-c.z)*(d.z-c.z));p<u&&(u=p)}u>r&&(r=u,s=c)}if(!s){let h=ys(n,this.nTeams,e.team,e.slot),c=h.x-48,u=h.z-48,f=Math.sqrt(c*c+u*u)||1,d=Math.min(f,Math.max(2,this.zone.r-3)),p=Zi(n,48+c/f*d,48+u/f*d);this.fresh(e,p.x,p.z,this.R.respInv);return}let o=s.x,a=s.z,l=-1;for(let h=0;h<8;h++){let c=h*Math.PI/4+e.slot,u={x:s.x+Math.sin(c)*2.1,z:s.z+Math.cos(c)*2.1};if(jn(Dn(n,u.x,u.z)))continue;Ji(n,u,0,0,Z.RADIUS);let f=Math.sqrt((u.x-48)*(u.x-48)+(u.z-48)*(u.z-48)),d=30;for(let v=0;v<t.length;v++){let m=t[v];if(m.team===e.team||m.st!==Te)continue;let g=Math.sqrt((m.x-u.x)*(m.x-u.x)+(m.z-u.z)*(m.z-u.z));g<d&&(d=g)}let p=d-(f>this.zone.r?20:0);p>l&&(l=p,o=u.x,a=u.z)}this.fresh(e,o,a,this.R.respInv)}setHuman(e,t,n,s,r){let o=this.ninjas[e];if(!o||o.bot||o.st!==Te||!(t>.4&&n>.4&&t<96-.4&&n<96-.4))return;let a=t-o.x,l=n-o.z;if(a*a+l*l>49)return;let h=Dn(this.map,t,n);h===Jn||h===an||(o.x=t,o.z=n,o.f=s,o.moving=!!r)}act(e,t,n,s,r){let o=this.ninjas[e];if(!o||o.st!==Te||this.phase!==1)return!1;n!==n&&(n=o.f);let a=this.ninjas,l=this.R;if(t==="m"){if(o.meleeCd>.1)return!1;o.meleeCd=Z.MELEE_CD,o.f=n,o.cM++,o.revealT=Z.REVEAL_T,o.bot&&o.rootT<=0&&(o.lungeT=.1,o.lungeA=n);let h=Z.MELEE_R+.25+l.meleeReach;for(let c=0;c<a.length;c++){let u=a[c];if(u.team===o.team||u.st!==Te)continue;let f=u.x-o.x,d=u.z-o.z,p=f*f+d*d;p>h*h||p>.7&&Math.abs(Xi(Math.atan2(f,d),n))>Z.MELEE_ARC||this.damage(u,l.meleeDmg,o,0)}for(let c=0;c<this.mobs.length;c++){let u=this.mobs[c];if(u.st!==1)continue;let f=u.x-o.x,d=u.z-o.z,p=f*f+d*d,v=h+st[u.kind].r*.7;p>v*v||p>.9&&Math.abs(Xi(Math.atan2(f,d),n))>Z.MELEE_ARC+.2||this.hurtMob(u,l.meleeDmg,o)}return!0}if(t==="s"){if(o.charges<1||o.throwCd>.05)return!1;o.charges-=1,o.throwCd=.22,o.f=n,o.cS++,o.revealT=Z.REVEAL_T;let h=Math.sin(n),c=Math.cos(n);return this.proj.push({id:this.nextId++,kind:0,owner:o.id,team:o.team,x:o.x+h*.45,z:o.z+c*.45,vx:h*Z.SH_SPEED,vz:c*Z.SH_SPEED,ttl:Z.SH_TTL,tx:0,tz:0,boom:_s(o.pw,2)>0,life:o.life}),!0}if(t==="d")return o.dash<1-.1/l.dashCd||o.dashGap>.05||o.rootT>0?!1:(o.dash=Math.max(0,o.dash-1),o.dashGap=.2,o.invT=Math.max(o.invT,l.dashInv),o.cD++,o.bot&&(o.dashT=Z.DASH_T,o.dashA=n),!0);if(t==="x"){if(o.specCd>.1)return!1;if(o.specCd=qt[o.cls].cd,o.cX++,o.revealT=Z.REVEAL_T,o.f=n,o.cls===1){for(let d=0;d<a.length;d++){let p=a[d];if(p.team!==o.team||p.st!==Te)continue;let v=p.x-o.x,m=p.z-o.z;if(v*v+m*m>Z.HEAL_R*Z.HEAL_R)continue;let g=p.hp;p.hp=Math.min(Z.HP,p.hp+l.healAmt),p.burnT=0,p.rootT=0,p.slowT=0,p.hp-g>=1&&this.ev(["heal",p.id,Math.round(p.hp-g)])}return this.ev(["fx","heal",At(o.x),At(o.z),o.team]),!0}(s!==s||r!==r)&&(s=o.x+Math.sin(n)*5.5,r=o.z+Math.cos(n)*5.5);let h=s-o.x,c=r-o.z,u=Math.sqrt(h*h+c*c);u>Z.SPEC_RANGE&&(h*=Z.SPEC_RANGE/u,c*=Z.SPEC_RANGE/u);let f=o.cls===0?Z.FIRE_T:Z.SEED_T;return this.proj.push({id:this.nextId++,kind:o.cls===0?1:2,owner:o.id,team:o.team,x:o.x,z:o.z,vx:h/f,vz:c/f,ttl:f,tx:o.x+h,tz:o.z+c}),!0}return!1}damage(e,t,n,s,r){if(e.st===Te&&!(e.invT>0&&!r)){if(!r&&s!==4){let o=e.pw.indexOf(3);if(o>=0){e.pw.splice(o,1),e.invT=Math.max(e.invT,.35),e.hurtT=this.t,e.combatT=this.t,n&&(n.combatT=this.t),this.ev(["shield",e.id]);return}}n&&n.bot&&s!==4&&(t*=this.diff.dmg),t=Math.max(1,Math.round(t)),e.hp-=t,e.cH++,e.hurtT=this.t,e.combatT=this.t,n&&(n.combatT=this.t,n.dmg+=t),this.ev(["hit",e.id,t,s,n?n.id:-1]),e.hp<=0&&this.down(e,n)}}down(e,t){let n=this.R;if(e.hp=0,e.st=Ot,e.revP=0,e.burnT=0,e.rootT=0,e.slowT=0,e.dashT=0,e.lungeT=0,e.mx=0,e.mz=0,e.moving=!1,t&&t.team!==e.team&&(t.kills++,n.resurge))for(let s=0;s<this.ninjas.length;s++){let r=this.ninjas[s];r.team===t.team&&r.st===Ot&&r.downT>n.respMin&&(r.downT=Math.max(n.respMin,r.downT-n.respKill))}if(this.ev(["down",e.id,t?t.id:this.mobHitBy?-2-this.mobHitBy.kind:-1]),e.pw.length=0,n.resurge){e.life++;for(let s=this.stars.length-1;s>=0;s--)this.stars[s].owner===e.id&&this.stars.splice(s,1);if(this.lastLife)e.st=Yt,this.ev(["out",e.id]);else{e.downT=n.respBase+n.respStage*Math.min(this.zone.stage,4);let s=!1;for(let r=0;r<this.ninjas.length;r++)this.ninjas[r].team===e.team&&this.ninjas[r].st===Te&&(s=!0);if(!s&&this.phase===1){for(let r=0;r<this.ninjas.length;r++){let o=this.ninjas[r];o.team===e.team&&o.st===Ot&&(o.downT=Math.max(o.downT,n.wipeT))}this.ev(["wipe",e.team])}}}else e.downT=this.hunting()?Z.DOWN_EARLY:Z.DOWN_T;for(let s=0;s<this.scrolls.length;s++){let r=this.scrolls[s];if(r.carrier!==e.id)continue;r.carrier=-1,r.lock=.9;let o={x:e.x+(this.rng()-.5)*.8,z:e.z+(this.rng()-.5)*.8};Ji(this.map,o,0,0,.3),r.x=o.x,r.z=o.z,this.ev(["drop",e.id,r.id])}this.checkTeam(e.team)}checkTeam(e){if(this.teamOut[e]||this.phase!==1||!this.R.resurge&&this.hunting()||this.R.resurge&&!this.lastLife)return;let t=this.ninjas;for(let r=0;r<t.length;r++)if(t[r].team===e&&t[r].st===Te)return;this.teamOut[e]=!0,this.outOrder.push(e);for(let r=0;r<t.length;r++)t[r].team===e&&t[r].st===Ot&&(t[r].st=Yt,this.ev(["out",t[r].id]));let n=-1,s=0;for(let r=0;r<this.nTeams;r++)this.teamOut[r]||(n=r,s++);this.ev(["tout",e,s+1]),s===1?this.win(n,"last"):s===0&&this.win(e,"last")}win(e,t){if(this.phase===2)return;this.phase=2,this.winner=e;let n=this.ninjas,s=this,r=[];for(let h=0;h<this.nTeams;h++)h!==e&&!this.teamOut[h]&&r.push(h);function o(h){let c=0;for(let u=0;u<n.length;u++)n[u].team===h&&n[u].st===Te&&(c+=n[u].hp);for(let u=0;u<s.scrolls.length;u++){let f=s.scrolls[u].carrier;f>=0&&n[f].team===h&&(c+=1e3)}return c}r.sort(function(h,c){return o(c)-o(h)});let a=[e].concat(r);for(let h=this.outOrder.length-1;h>=0;h--)this.outOrder[h]!==e&&a.push(this.outOrder[h]);let l=n.map(function(h){return[h.kills,Math.round(h.dmg),h.revs]});this.ev(["end",e,t,a,l,Math.round(this.t)])}step(){let e=Us;if(this.clock+=e,this.phase===0){this.count-=e,this.count<=0&&(this.phase=1,this.ev(["go"]));return}if(this.phase===2)return;this.t+=e;let t=this.ninjas,n=this.map,s=this.zone,r=this.R,o=r.zone;for(let h=0;h<t.length;h++){let c=t[h];if(c.st!==Te){c.vx=0,c.vz=0,c.px=c.x,c.pz=c.z;continue}c.meleeCd>0&&(c.meleeCd-=e),c.throwCd>0&&(c.throwCd-=e),!r.starPickup&&c.charges<Z.SH_MAX&&(c.charges=Math.min(Z.SH_MAX,c.charges+e/Z.SH_RECH));let u=this.dashMaxOf(c);if(c.dash<u?c.dash=Math.min(u,c.dash+e/r.dashCd):c.dash>u&&(c.dash=u),c.dashGap>0&&(c.dashGap-=e),c.specCd>0&&(c.specCd-=e),c.invT>0&&(c.invT-=e),c.rootT>0&&(c.rootT-=e),c.slowT>0&&(c.slowT-=e),c.revealT>0&&(c.revealT-=e),c.bot){let f=this.speedOf(c),d=c.mx*f,p=c.mz*f;c.rootT>0&&(d=0,p=0,c.lungeT=0),c.dashT>0&&(c.dashT-=e,d=Math.sin(c.dashA)*r.speed*Z.DASH_MULT,p=Math.cos(c.dashA)*r.speed*Z.DASH_MULT),c.lungeT>0&&(c.lungeT-=e,d+=Math.sin(c.lungeA)*r.lunge/.1,p+=Math.cos(c.lungeA)*r.lunge/.1),d||p?(Ji(n,c,d*e,p*e,Z.RADIUS),c.moving=!0):c.moving=!1}c.vx+=((c.x-c.px)/e-c.vx)*.35,c.vz+=((c.z-c.pz)/e-c.vz)*.35,c.px=c.x,c.pz=c.z,c.bush=Dn(n,c.x,c.z)===yn,c.burnT>0&&(c.burnT-=e,c.burnAcc+=Z.BURN_DPS*e,c.burnAcc>=2&&(c.burnAcc-=2,this.damage(c,2,t[c.burnBy]||null,2,!0))),c.st===Te&&this.t-c.combatT>Z.REGEN_DELAY&&c.hp<Z.HP&&(c.hp=Math.min(Z.HP,c.hp+Z.REGEN*e))}for(let h=this.proj.length-1;h>=0;h--){let c=this.proj[h];c.ttl-=e;let u=!1;if(c.kind===0){for(let f=0;f<2&&!u;f++){c.x+=c.vx*e*.5,c.z+=c.vz*e*.5;let d=Dn(n,c.x,c.z);if(d===an)u=!0;else if(d===Rn||d===wn||d===vn){let p=c.x-(Math.floor(c.x)+.5),v=c.z-(Math.floor(c.z)+.5);p*p+v*v<.2&&(u=!0)}if(u){this.ev(["fx","clink",At(c.x),At(c.z),c.team]),c.boom&&this.starBoom(c,null),c.x-=c.vx*e*.5,c.z-=c.vz*e*.5;break}for(let p=0;p<t.length;p++){let v=t[p];if(v.team===c.team||v.st!==Te)continue;let m=v.x-c.x,g=v.z-c.z;if(m*m+g*g<Z.SH_HIT*Z.SH_HIT){this.damage(v,r.shDmg,t[c.owner],1),c.boom&&this.starBoom(c,v),u=!0;break}}for(let p=0;p<this.mobs.length&&!u;p++){let v=this.mobs[p];if(v.st!==1)continue;let m=v.x-c.x,g=v.z-c.z,x=Z.SH_HIT+st[v.kind].r*.8;m*m+g*g<x*x&&(this.hurtMob(v,r.shDmg,t[c.owner]),c.boom&&this.starBoom(c,null,v),u=!0)}}if(c.ttl<=0&&(u=!0),u&&r.starPickup&&t[c.owner]&&t[c.owner].st===Te&&c.life===t[c.owner].life){let f=jn(Dn(n,c.x,c.z))?Zi(n,c.x,c.z):c;this.stars.push({x:f.x,z:f.z,owner:c.owner,ttl:r.starLife,lock:Z.STAR_LOCK})}}else if(c.x+=c.vx*e,c.z+=c.vz*e,c.ttl<=0){u=!0;let f=t[c.owner];if(c.kind===1){this.ev(["fx","boom",At(c.tx),At(c.tz),c.team]);for(let d=0;d<t.length;d++){let p=t[d];if(p.team===c.team||p.st!==Te)continue;let v=p.x-c.tx,m=p.z-c.tz,g=Math.sqrt(v*v+m*m);g>Z.FIRE_R+.3||(this.damage(p,r.fireDmg*(1-.35*g/Z.FIRE_R),f,2),p.st===Te&&p.invT<=0&&(p.burnT=Z.BURN_T,p.burnBy=c.owner))}this.areaMobs(c.tx,c.tz,Z.FIRE_R+.3,r.fireDmg,f,null)}else this.areas.push({id:this.nextId++,kind:0,team:c.team,owner:c.owner,x:c.tx,z:c.tz,r:Z.BRAMBLE_R,ttl:Z.BRAMBLE_T,hit:{}}),this.ev(["fx","bram",At(c.tx),At(c.tz),c.team])}u&&this.proj.splice(h,1)}for(let h=this.areas.length-1;h>=0;h--){let c=this.areas[h];if(c.ttl-=e,c.ttl<=0){this.areas.splice(h,1);continue}c.mobDone||(c.mobDone=!0,this.areaMobs(c.x,c.z,c.r,r.brambleDmg,t[c.owner],null));for(let u=0;u<t.length;u++){let f=t[u];if(f.team===c.team||f.st!==Te)continue;let d=f.x-c.x,p=f.z-c.z;d*d+p*p>c.r*c.r||f.invT>0||(c.hit[f.id]||(c.hit[f.id]=1,f.rootT=Z.ROOT_T,this.damage(f,r.brambleDmg,t[c.owner],3)),f.slowT<.3&&(f.slowT=.3))}}this.mobs.length&&this.phase===1&&this.stepMobs(e);for(let h=0;h<t.length;h++){let c=t[h];if(c.st!==Ot)continue;if(r.resurge){c.downT-=e,c.downT<=0&&this.resurge(c);continue}let u=c.x-48,f=c.z-48,d=u*u+f*f>s.r*s.r,p=null;for(let v=0;v<t.length;v++){let m=t[v];if(m.team!==c.team||m.st!==Te)continue;let g=m.x-c.x,x=m.z-c.z;if(g*g+x*x<Z.REVIVE_R*Z.REVIVE_R&&this.t-m.hurtT>.7){p=m;break}}p?(c.revP+=e/Z.REVIVE_T,c.revP>=1&&(c.st=Te,c.hp=Z.REVIVE_HP,c.invT=Z.REVIVE_INV,c.revP=0,c.combatT=this.t,p.revs++,this.ev(["rev",c.id,p.id]))):(c.revP=Math.max(0,c.revP-e*.6),c.downT-=e*(d?3:1),c.downT<=0&&(this.hunting()?this.respawn(c):(c.st=Yt,this.ev(["out",c.id]))))}for(let h=0;h<this.scrolls.length;h++){let c=this.scrolls[h];if(c.carrier>=0){c.x=t[c.carrier].x,c.z=t[c.carrier].z;continue}c.lock>0&&(c.lock-=e);let u=c.x-48,f=c.z-48,d=Math.sqrt(u*u+f*f);if(d>s.r-1&&d>2){let m=Math.max(1,s.r-2.5),g=Zi(n,48+u/d*m,48+f/d*m);c.x=g.x,c.z=g.z;continue}if(c.lock>0)continue;let p=null,v=Z.PICK_R*Z.PICK_R;for(let m=0;m<t.length;m++){let g=t[m];if(g.st!==Te)continue;let x=g.x-c.x,_=g.z-c.z,b=x*x+_*_;b<v&&(v=b,p=g)}p&&(c.carrier=p.id,this.ev(["pick",p.id,c.id]))}for(let h=0;h<this.pickups.length;h++){let c=this.pickups[h];if(!c.on){c.t-=e,c.t<=0&&(c.on=!0);continue}for(let u=0;u<t.length;u++){let f=t[u];if(f.st!==Te||f.hp>Z.HP-2)continue;let d=f.x-c.x,p=f.z-c.z;if(d*d+p*p<Z.PICK_R*Z.PICK_R){let v=f.hp;f.hp=Math.min(Z.HP,f.hp+Z.FOOD_HP),c.on=!1,c.t=Z.FOOD_RESPAWN,this.ev(["food",f.id,h,Math.round(f.hp-v)]);break}}}for(let h=this.stars.length-1;h>=0;h--){let c=this.stars[h];c.ttl-=e,c.lock>0&&(c.lock-=e);let u=null;if(c.lock<=0){let f=Z.STAR_PICK*Z.STAR_PICK;for(let d=0;d<t.length;d++){let p=t[d];if(p.st!==Te||p.charges>Z.SH_MAX-1)continue;let v=p.x-c.x,m=p.z-c.z,g=v*v+m*m;g<f&&(f=g,u=p)}}if(!u&&c.ttl<=0){let f=t[c.owner];f&&f.st===Te&&f.charges<=Z.SH_MAX-1&&(f.charges+=1),this.stars.splice(h,1);continue}u&&(u.charges=Math.min(Z.SH_MAX,u.charges+1),this.ev(["star",u.id]),this.stars.splice(h,1))}for(let h=0;h<this.items.length;h++){let c=this.items[h];if(!c.on){c.t-=e,c.t<=0&&(c.on=!0,c.type=Math.floor(this.rng()*4));continue}for(let u=0;u<t.length;u++){let f=t[u];if(f.st!==Te)continue;let d=f.x-c.x,p=f.z-c.z;if(d*d+p*p<Z.PICK_R*Z.PICK_R){this.givePow(f,c.type),c.on=!1,c.t=Z.POW_RESPAWN;break}}}if(s.stage<o.length){s.timer-=e;let h=o[s.stage];if(s.shrinking){let c=1-Math.max(0,s.timer)/h.shrink;s.r=s.from+(s.to-s.from)*c,s.timer<=0&&(s.r=s.to,s.shrinking=!1,s.stage++,s.stage<o.length?(s.timer=o[s.stage].wait,s.to=o[s.stage].r):s.timer=0,this.ev(["zone",0,s.stage]))}else if(s.timer<=0){if(!r.resurge&&s.stage===0)for(let c=0;c<t.length;c++)t[c].st===Ot&&this.respawn(t[c]);if(r.resurge&&s.stage===r.lastLifeStage&&!this.lastLife){for(let c=0;c<t.length;c++)t[c].st===Ot&&this.resurge(t[c]);for(let c=0;c<t.length;c++){let u=t[c];u.st===Te&&(u.hp=Z.HP,u.burnT=0,u.invT=Math.max(u.invT,2),u.pw.indexOf(3)<0&&(u.pw.push(3),u.pw.length>Z.POW_MAX&&u.pw.shift()))}this.lastLife=!0,this.ev(["last"])}s.shrinking=!0,s.timer=h.shrink,s.from=s.r,s.to=h.r,s.dps=h.dps,this.ev(["zone",1,s.stage])}}for(let h=0;h<t.length;h++){let c=t[h];if(c.st!==Te)continue;let u=c.x-48,f=c.z-48;if(u*u+f*f>s.r*s.r){if(c.zoneAcc+=s.dps*e,c.zoneAcc>=2){let d=Math.floor(c.zoneAcc);c.zoneAcc-=d,this.damage(c,d,null,4,!0)}}else c.zoneAcc=0;if(this.phase!==1)return}let a=Z.SHRINE_R*Z.SHRINE_R,l=this.sealed();for(let h=0;h<this.nTeams;h++){if(this.teamOut[h]||l){this.deliver[h]=0;continue}let c=!1,u=!1;for(let f=0;f<this.scrolls.length;f++){let d=this.scrolls[f];if(d.carrier<0)continue;let p=t[d.carrier];if(p.team!==h||p.st!==Te)continue;let v=p.x-48,m=p.z-48;v*v+m*m<a&&(d.kind===0?c=!0:u=!0)}if(c&&u){let f=!1;for(let d=0;d<t.length;d++){let p=t[d];if(p.team===h||p.st!==Te)continue;let v=p.x-48,m=p.z-48;if(v*v+m*m<a){f=!0;break}}if(!f&&(this.deliver[h]+=e/r.deliverT,this.deliver[h]>=1)){this.deliver[h]=1,this.win(h,"deliver");return}}else this.deliver[h]>0&&(this.deliver[h]=Math.max(0,this.deliver[h]-e*.8))}}starBoom(e,t,n){let s=this.ninjas;this.ev(["fx","boom2",At(e.x),At(e.z),e.team]),this.areaMobs(e.x,e.z,Z.BOOM_R,this.R.shDmg*.75,s[e.owner],n);for(let r=0;r<s.length;r++){let o=s[r];if(o===t||o.team===e.team||o.st!==Te)continue;let a=o.x-e.x,l=o.z-e.z;a*a+l*l<Z.BOOM_R*Z.BOOM_R&&this.damage(o,this.R.shDmg*.75,s[e.owner],2)}}givePow(e,t){e.pw.push(t),e.pw.length>Z.POW_MAX&&e.pw.shift(),t===1&&(e.dash=Math.min(this.dashMaxOf(e),e.dash+1)),this.ev(["pw",e.id,t])}areaMobs(e,t,n,s,r,o){for(let a=0;a<this.mobs.length;a++){let l=this.mobs[a];if(l===o||l.st!==1)continue;let h=l.x-e,c=l.z-t,u=n+st[l.kind].r*.5;h*h+c*c<u*u&&this.hurtMob(l,s,r)}}hurtMob(e,t,n){if(e.st!==1||!n)return;t=Math.max(1,Math.round(t)),e.hp-=t,e.cH++,e.hitT=this.t;let s=e.tgt>=0?this.ninjas[e.tgt]:null;(!s||s.st!==Te)&&(e.tgt=n.id),n.combatT=this.t,this.ev(["mhit",e.id,t,n.id]),e.hp<=0&&this.killMob(e,n)}killMob(e,t){let n=st[e.kind];e.st=0,e.hp=0,e.windT=0,e.tgt=-1,e.moving=!1,e.respT=n.resp[this.mode],this.ev(["mob",e.id,t.id,t.team]);let s=this.ninjas;for(let r=0;r<s.length;r++){let o=s[r];if(!(o.team!==t.team||o.st!==Te))if(n.tier===0)this.givePow(o,Math.floor(this.rng()*4));else if(n.tier===1){let a=o.hp;o.hp=Math.min(Z.HP,o.hp+50),o.hp-a>=1&&this.ev(["heal",o.id,Math.round(o.hp-a)]),this.givePow(o,Math.floor(this.rng()*4)),this.givePow(o,Math.floor(this.rng()*4))}else{let a=o.hp;o.hp=Z.HP,o.burnT=0,o.hp-a>=1&&this.ev(["heal",o.id,Math.round(o.hp-a)]),this.givePow(o,3),this.givePow(o,Math.floor(this.rng()*3))}}}stepMobs(e){let t=this.ninjas,n=this.map,s=this.zone,r=this.mode;for(let o=0;o<this.mobs.length;o++){let a=this.mobs[o],l=st[a.kind],h=l.hp[r];if(a.gone)continue;{let x=a.hx-48,_=a.hz-48;if(x*x+_*_>(s.r-.5)*(s.r-.5)){a.st!==0&&this.ev(["mgone",a.id]),a.st=0,a.gone=!0,a.windT=0,a.tgt=-1,a.moving=!1;continue}}if(a.st===0){a.respT-=e,a.respT<=0&&(a.st=1,a.hp=h,a.x=a.hx,a.z=a.hz,a.tgt=-1,a.atkCd=.8,a.windT=0,this.ev(["mspawn",a.id]));continue}a.atkCd>0&&(a.atkCd-=e);let c=a.x-a.hx,u=a.z-a.hz,f=Math.sqrt(c*c+u*u);if(a.st===2){if(a.hp=Math.min(h,a.hp+h*.5*e),a.retT+=e,f<.3||a.retT>5){a.st=1,a.hp=h,a.x=a.hx,a.z=a.hz,a.moving=!1;continue}let x=Math.min(f,l.speed*1.5*e);Ji(n,a,-c/f*x,-u/f*x,Math.min(l.r,.45)),a.f=Math.atan2(-c,-u),a.moving=!0;continue}if(a.windT>0){if(a.windT-=e,a.windT<=0){a.atkCd=l.cd,this.ev(["matk",a.id]);let x=l.reach+Z.RADIUS;for(let _=0;_<t.length;_++){let b=t[_];if(b.st!==Te)continue;let C=b.x-a.x,I=b.z-a.z,M=C*C+I*I;M>x*x||l.arc<3&&M>.5&&Math.abs(Xi(Math.atan2(C,I),a.f))>l.arc||(this.mobHitBy=a,this.damage(b,l.dmg[r],null,5),this.mobHitBy=null)}}continue}let d=a.tgt>=0?t[a.tgt]:null,p=l.leash+2;if(d&&(d.st!==Te||(d.x-a.hx)*(d.x-a.hx)+(d.z-a.hz)*(d.z-a.hz)>p*p)&&(d=null),!d&&a.tgt>=0){let x=null,_=(l.reach+2.5)*(l.reach+2.5);for(let b=0;b<t.length;b++){let C=t[b];if(C.st!==Te)continue;let I=C.x-a.x,M=C.z-a.z,w=I*I+M*M;w<_&&(_=w,x=C)}if(x)a.tgt=x.id,d=x;else{a.tgt=-1,f>.3&&(a.st=2,a.retT=0);continue}}if(!d){a.moving=!1,this.t-a.hitT>3&&a.hp<h&&(a.hp=Math.min(h,a.hp+h*.25*e));continue}let v=d.x-a.x,m=d.z-a.z,g=Math.sqrt(v*v+m*m)||.01;if(a.f=Math.atan2(v,m),g<l.reach*.8+Z.RADIUS)a.moving=!1,a.atkCd<=0&&(a.windT=l.wind,a.cA++);else{let x=Math.max(0,Math.min(g-l.reach*.6,l.speed*e));x>0&&Ji(n,a,v/g*x,m/g*x,Math.min(l.r,.45)),a.moving=x>0;let _=a.x-a.hx,b=a.z-a.hz;_*_+b*b>l.leash*l.leash&&(a.tgt=-1,a.st=2,a.retT=0)}}}snapshot(){let e=[];for(let f=0;f<this.ninjas.length;f++){let d=this.ninjas[f],p=0;d.moving&&(p|=ia),d.burnT>0&&(p|=sa),d.rootT>0&&(p|=Os),d.invT>0&&(p|=ra),d.revealT>0&&(p|=oa),d.slowT>0&&(p|=Fs),d.bush&&(p|=aa),e.push([At(d.x),At(d.z),Math.round(d.f*100),Math.max(0,Math.ceil(d.hp)),d.st,p,Math.round(Math.max(0,d.downT)*10),Math.round(d.revP*100),d.cM&255,d.cS&255,d.cX&255,d.cH&255,d.cD&255,Math.round(d.charges*10),Math.round(Math.max(0,d.dash)*10),Math.round(Math.max(0,d.specCd)*10),d.kills,nd(d.pw)])}let t=[];for(let f=0;f<this.proj.length;f++){let d=this.proj[f];t.push([d.id,d.kind,At(d.x),At(d.z),At(d.vx),At(d.vz),d.team,At(d.tx),At(d.tz),Math.round(d.ttl*100),d.boom?1:0])}let n=[];for(let f=0;f<this.areas.length;f++){let d=this.areas[f];n.push([d.id,d.kind,At(d.x),At(d.z),At(d.r),Math.round(d.ttl*10),d.team])}let s=[];for(let f=0;f<this.scrolls.length;f++){let d=this.scrolls[f];s.push([d.carrier,At(d.x),At(d.z)])}let r=0;for(let f=0;f<this.pickups.length;f++)this.pickups[f].on&&(r|=1<<f);let o=this.zone,a=[];for(let f=0;f<this.nTeams;f++)a.push(Math.round(this.deliver[f]*100));let l=[];for(let f=0;f<this.stars.length;f++)l.push(Math.round(this.stars[f].x*10),Math.round(this.stars[f].z*10));let h=[];for(let f=0;f<this.items.length;f++)h.push(this.items[f].on?this.items[f].type+1:0);let c;if(this.mobs.length){c=[];for(let f=0;f<this.mobs.length;f++){let d=this.mobs[f];c.push(d.st===0?0:[At(d.x),At(d.z),Math.round(d.f*100),Math.max(0,Math.ceil(d.hp)),d.st,d.cA&255,d.windT>0?1:0,d.cH&255,d.moving?1:0])}}let u=this.events;return this.events=[],{k:"s",t:Math.round(this.clock*1e3),ph:this.phase,c:Math.max(0,Math.ceil(this.count*10)),gt:Math.round(this.t*10),n:e,p:t,a:n,s,h:r,z:[Math.round(o.r*10),Math.round(o.to*10),Math.round(Math.max(0,o.timer)*10),o.shrinking?1:0,o.stage,o.dps],d:a,e:u,g:l,it:h,ll:this.lastLife?1:0,mb:c}}};function wt(i,e,t,n){let s=i-t,r=e-n;return Math.sqrt(s*s+r*r)}var ua=class{constructor(e){this.sim=e,this.nav=new la(e.map),this.mem=e.ninjas.map(function(t,n){return{think:n*.037%.12,react:.4+n%5*.1,path:null,pi:0,pathT:0,gx:t.x,gz:t.z,tx:t.x,tz:t.z,stopAt:0,face:null,lastX:t.x,lastZ:t.z,stuckT:0,jit:0,jx:0,jz:0,strafe:n%2?1:-1,strafeT:0,force:!1,farm:n%3!==2}}),this.goals=[],this.goalT=0}update(e){let t=this.sim,n=t.ninjas;if(t.phase!==1){for(let s=0;s<n.length;s++)n[s].bot&&(n[s].mx=0,n[s].mz=0);return}this.goalT-=e,this.goalT<=0&&(this.goalT=.4,this.computeGoals());for(let s=0;s<n.length;s++){let r=n[s];if(!r.bot)continue;if(r.st!==Te){r.mx=0,r.mz=0;continue}let o=this.mem[r.id];o.think-=e,o.react-=e,o.think<=0&&(o.think+=.12,o.think<0&&(o.think=.12),this.think(r,o)),this.steer(r,o,e)}}computeGoals(){let e=this.sim,t=e.ninjas;for(let n=0;n<e.nTeams;n++){let s=this.goals[n]||(this.goals[n]={}),r=0,o=0,a=0,l=null;for(let d=0;d<t.length;d++){let p=t[d];p.team!==n||p.st!==Te||(r+=p.x,o+=p.z,a++,!p.bot&&!l&&(l=p))}if(s.lead=l,s.type="none",!a)continue;r/=a,o/=a;let h=!1,c=!1;for(let d=0;d<e.scrolls.length;d++){let p=e.scrolls[d];if(p.carrier<0)continue;let v=t[p.carrier];v.team===n&&v.st===Te&&(p.kind===0?h=!0:c=!0)}if(s.has0=h,s.has1=c,h&&c){s.type="deliver",s.x=48,s.z=48,s.scroll=null;continue}let u=null,f=1e9;for(let d=0;d<e.scrolls.length;d++){let p=e.scrolls[d];if(p.carrier>=0&&t[p.carrier].team===n||p.kind===0&&h||p.kind===1&&c)continue;let v=wt(r,o,p.x,p.z);p.carrier<0&&(v*=.6),s.scroll===p&&(v*=.8),v<f&&(f=v,u=p)}u?(s.type="hunt",s.scroll=u,s.x=u.x,s.z=u.z):(s.type="hold",s.scroll=null,s.x=48,s.z=48)}}think(e,t){let n=this.sim,s=n.ninjas,r=n.map,o=n.diff,a=n.zone,l=n.rng,h=n.R,c=this.goals[e.team]||{type:"none"},u=wt(e.x,e.z,48,48),f=null,d=1e9,p=0,v=null,m=1e9,g=!1;for(let T=0;T<s.length;T++){let N=s[T];if(N===e)continue;let U=wt(e.x,e.z,N.x,N.z);if(N.team===e.team){!h.resurge&&N.st===Ot&&U<m&&(m=U,v=N),N.st===Te&&U<Z.HEAL_R&&N.hp<62&&(g=!0);continue}N.st!==Te||U>Z.VIEW||N.bush&&N.revealT<=0&&U>Z.BUSH_SEE||(p++,U<d&&(d=U,f=N))}e.hp<62&&(g=!0);let x=e.x,_=e.z,b=0,C=!1;t.face=null;let I=this.carries(e),M=Math.max(1.2,(a.shrinking?a.to:a.r)-2.5);if(u>M&&(a.shrinking||u>a.r-1.5)){let T=Math.max(.5,M*.8);c.type!=="none"&&c.x!=null&&wt(c.x,c.z,48,48)<M?(x=c.x,_=c.z):(x=48+(e.x-48)/u*T,_=48+(e.z-48)/u*T),C=!0}let w=h.resurge?n.lastLife&&p>1?51:0:32;if(!C&&f&&e.hp<w&&d<7){let T=null,N=14;for(let U=0;U<n.pickups.length;U++){let F=n.pickups[U];if(!F.on)continue;let J=wt(e.x,e.z,F.x,F.z);J<N&&wt(f.x,f.z,F.x,F.z)>J&&(N=J,T=F)}if(T)x=T.x,_=T.z;else{let U=Zi(r,yt(e.x+(e.x-f.x)/d*6,4,92),yt(e.z+(e.z-f.z)/d*6,4,92));x=U.x,_=U.z}C=!0}let A=null,y=1e9,S=null,P=n.mobs;for(let T=0;T<P.length;T++){let N=P[T];if(N.st!==1)continue;let U=wt(e.x,e.z,N.x,N.z);N.windT>0&&U<st[N.kind].reach+.9&&(S=N),N.tgt===e.id&&U<y&&(y=U,A=N)}if(!A&&!f&&t.farm&&e.hp>55&&!I&&c.type!=="deliver"){let T=0;for(let N=0;N<s.length;N++){let U=s[N];U!==e&&U.team===e.team&&U.st===Te&&wt(e.x,e.z,U.x,U.z)<9&&T++}for(let N=0;N<P.length;N++){let U=P[N];if(U.st!==1||T<st[U.kind].tier)continue;let F=wt(e.x,e.z,U.x,U.z);F<11&&F<y&&wt(U.hx,U.hz,48,48)<a.r-3&&(y=F,A=U)}}if(!C&&S){let T=wt(e.x,e.z,S.x,S.z)||.1;x=e.x+(e.x-S.x)/T*3,_=e.z+(e.z-S.z)/T*3,e.dash>=1&&e.rootT<=0&&l()<o.dash*.6&&n.act(e.id,"d",Math.atan2(e.x-S.x,e.z-S.z)),C=!0}if(!C&&A&&!f&&(x=A.x,_=A.z,b=.7,C=!0),!C&&v&&m<16&&(p===0||d>4.5&&e.hp>40)&&(x=v.x,_=v.z,b=.8,C=!0),!C&&h.starPickup&&e.charges<1&&(!f||d>2.6)){let T=this.nearStar(e,10);T&&(x=T.x,_=T.z,C=!0)}if(!C&&f&&n.lastLife&&e.hp<=50&&f.hp>50&&d<5.5){let T=Zi(r,yt(e.x+(e.x-f.x)/(d||1)*4,4,92),yt(e.z+(e.z-f.z)/(d||1)*4,4,92));wt(T.x,T.z,48,48)<a.r-1.5&&(x=T.x,_=T.z,C=!0)}if(!C&&f){if(d>1.35)x=f.x,_=f.z;else{t.strafeT-=.12,t.strafeT<=0&&(t.strafeT=.6+l()*.9,l()<.5&&(t.strafe=-t.strafe));let T=(f.x-e.x)/(d||1),N=(f.z-e.z)/(d||1);x=e.x-N*t.strafe*1.2+T*.2,_=e.z+T*t.strafe*1.2+N*.2}C=!0}if(!C&&h.powerups){let T=9;for(let N=0;N<n.items.length;N++){let U=n.items[N];if(!U.on)continue;let F=wt(e.x,e.z,U.x,U.z);F<T&&wt(U.x,U.z,48,48)<a.r-1&&(T=F,x=U.x,_=U.z,C=!0)}}if(!C&&h.starPickup&&e.charges<=Z.SH_MAX-1){let T=this.nearStar(e,5);T&&(x=T.x,_=T.z,C=!0)}if(!C&&e.hp<60){let T=12;for(let N=0;N<n.pickups.length;N++){let U=n.pickups[N];if(!U.on)continue;let F=wt(e.x,e.z,U.x,U.z);F<T&&wt(U.x,U.z,48,48)<a.r-1&&(T=F,x=U.x,_=U.z,C=!0)}}if(!C){let T=c.lead;if(T&&T!==e){let N=wt(e.x,e.z,T.x,T.z),U=wt(T.x,T.z,48,48)<Z.SHRINE_R+1.5;if(c.type==="deliver"&&I&&U)x=48+(e.slot-1)*1.5,_=48+(e.slot===1?1.8:.9),b=.5;else{let F=e.slot===1?1:-1,J=Math.sin(T.f),B=Math.cos(T.f);x=T.x-J*1.5-B*F*1.4,_=T.z-B*1.5+J*F*1.4,b=N<3.2?5:.9}}else c.type==="deliver"?I?(x=48+(e.slot-1)*1.5,_=48+(e.slot===1?1.8:.9),b=.45):(x=48+(e.slot-1)*2.4,_=48+2.4,b=.6):c.type==="hunt"?(x=c.x+(e.slot-1)*.7,_=c.z+(e.slot===1?.6:-.4),b=.3):c.type==="hold"&&(x=48+(e.slot-1)*3,_=52,b=.8)}if(f){let T=Math.atan2(f.x-e.x,f.z-e.z);t.face=T;let N=Lr(r,e.x,e.z,f.x,f.z);if(d<Z.MELEE_R-.15+h.meleeReach*.6&&e.meleeCd<=0&&t.react<=0)n.act(e.id,"m",T),t.react=h.resurge?Z.MELEE_CD*.5+o.react*(.9+l()*.5):o.react*.55+l()*.12;else if(N&&d>2.1&&d<9.5&&e.charges>=1&&t.react<=0){let U=d/Z.SH_SPEED,F=f.x+f.vx*U-e.x,J=f.z+f.vz*U-e.z;n.act(e.id,"s",Math.atan2(F,J)+(l()-.5)*2*o.aim),t.react=o.react+l()*.45}if(e.specCd<=0&&e.cls!==1&&d>2&&d<Z.SPEC_RANGE&&l()<o.special*.3){let U=e.cls===0?Z.FIRE_T:Z.SEED_T,F=f.x+f.vx*U*.7+(l()-.5)*o.aim*6,J=f.z+f.vz*U*.7+(l()-.5)*o.aim*6;n.act(e.id,"x",Math.atan2(F-e.x,J-e.z),F,J)}e.dash>=1&&e.rootT<=0&&l()<o.dash*(h.dashMax>1?.3:.14)&&(!h.resurge&&e.hp<30&&d<4.5?n.act(e.id,"d",Math.atan2(e.x-f.x,e.z-f.z)):d>3&&d<6.5&&(h.resurge||e.hp>35)&&N&&n.act(e.id,"d",T))}if(h.dashMax>1&&e.dash>=1&&e.rootT<=0)for(let T=0;T<n.proj.length;T++){let N=n.proj[T];if(N.kind!==0||N.team===e.team)continue;let U=e.x-N.x,F=e.z-N.z,J=Math.sqrt(U*U+F*F);if(J>4.5||J<.6)continue;let B=Math.sqrt(N.vx*N.vx+N.vz*N.vz)||1;if(!((U*N.vx+F*N.vz)/(J*B)<.93)){l()<o.dash*.55&&n.act(e.id,"d",Math.atan2(N.vx,N.vz)+(t.strafe>0?1.57:-1.57));break}}if(!f&&A){let T=Math.atan2(A.x-e.x,A.z-e.z),N=st[A.kind];t.face=T,y<Z.MELEE_R+n.R.meleeReach+N.r*.7&&e.meleeCd<=0&&t.react<=0&&(n.act(e.id,"m",T),t.react=o.react*.6+l()*.15),e.specCd<=0&&e.cls!==1&&y<Z.SPEC_RANGE&&y>1.2&&l()<.25&&n.act(e.id,"x",T,A.x,A.z)}if(e.cls===1&&e.specCd<=0&&g&&l()<.5&&n.act(e.id,"x",e.f,e.x,e.z),t.tx=x,t.tz=_,t.stopAt=b,t.pathT-=.12,wt(e.x,e.z,x,_)<.2||ah(r,e.x,e.z,x,_)?t.path=null:(!t.path||t.pathT<=0||t.force||wt(t.gx,t.gz,x,_)>2.5)&&(t.path=this.nav.find(e.x,e.z,x,_),t.pi=0,t.gx=x,t.gz=_,t.pathT=.9+l()*.5,t.force=!1),t.path)for(;t.pi+2<t.path.length&&ah(r,e.x,e.z,t.path[t.pi+2],t.path[t.pi+3]);)t.pi+=2}nearStar(e,t){let n=this.sim.stars,s=null,r=t;for(let o=0;o<n.length;o++){let a=wt(e.x,e.z,n[o].x,n[o].z);a<r&&wt(n[o].x,n[o].z,48,48)<this.sim.zone.r-.5&&(r=a,s=n[o])}return s}carries(e){let t=this.sim.scrolls;for(let n=0;n<t.length;n++)if(t[n].carrier===e.id)return!0;return!1}steer(e,t,n){let s=this.sim.ninjas,r=t.tx,o=t.tz;if(t.path){for(;t.pi<t.path.length-2&&wt(e.x,e.z,t.path[t.pi],t.path[t.pi+1])<.55;)t.pi+=2;t.pi<t.path.length&&(r=t.path[t.pi],o=t.path[t.pi+1])}let a=r-e.x,l=o-e.z,h=Math.sqrt(a*a+l*l);wt(e.x,e.z,t.tx,t.tz)<Math.max(.12,t.stopAt)||h<.05?(a=0,l=0):(a/=h,l/=h);let u=a!==0||l!==0;for(let p=0;p<s.length;p++){let v=s[p];if(v===e||v.team!==e.team||v.st!==Te)continue;let m=e.x-v.x,g=e.z-v.z,x=m*m+g*g;if(x<.64&&x>1e-4){let _=Math.sqrt(x);a+=m/_*.6,l+=g/_*.6}}t.jit>0&&(t.jit-=n,a+=t.jx,l+=t.jz);let f=Math.sqrt(a*a+l*l);f>1&&(a/=f,l/=f),f<.08&&(a=0,l=0),e.mx=a,e.mz=l;let d=t.face!=null?t.face:a||l?Math.atan2(a,l):e.f;if(e.f+=yt(Xi(d,e.f),-12*n,12*n),t.stuckT+=n,t.stuckT>.9){if(u&&wt(e.x,e.z,t.lastX,t.lastZ)<.3){t.force=!0,t.jit=.45;let p=this.sim.rng()*6.283;t.jx=Math.sin(p)*.9,t.jz=Math.cos(p)*.9}t.lastX=e.x,t.lastZ=e.z,t.stuckT=0}}};var fa=class{constructor(e){this.start=e,this.map=Ir(e.seed,e.mode,e.map|0),this.sim=new ha(this.map,e.roster,e),this.bots=new ua(this.sim),this.acc=0,this.snapN=0,this.onSnap=null}advance(e){for(this.acc+=Math.min(e,.25);this.acc>=Us;)if(this.acc-=Us,this.bots.update(Us),this.sim.step(),++this.snapN>=td){this.snapN=0;let t=this.sim.snapshot();this.onSnap&&this.onSnap(t)}}input(e,t){let n=this.sim;!t||!n.ninjas[e]||(t[0]==="i"?n.setHuman(e,t[1]/100,t[2]/100,t[3]/100,t[4]):t[0]==="a"&&(n.setHuman(e,t[3]/100,t[4]/100,t[2]/100,1),n.act(e,t[1],t[2]/100,t[5]!=null?t[5]/100:NaN,t[6]!=null?t[6]/100:NaN)))}toBot(e){let t=this.sim.ninjas[e];t&&(t.bot=!0,t.mx=0,t.mz=0)}};function ch(i,e,t){return i+Xi(e,i)*t}var Dr=class{constructor(e,t,n){this.start=e,this.mode=e.mode===1?1:0;let s=this.R=ii[this.mode];this.map=Ir(e.seed,this.mode,e.map|0),this.nTeams=e.teams,this.me=e.you,this.send=t,this.delay=n??.11;let r=e.roster;this.myTeam=r[this.me].team,this.cls=r[this.me].cls,this.snaps=[],this.off=null,this.localT=0,this.lastSnapAt=0;let o=ys(this.map,this.nTeams,r[this.me].team,r[this.me].slot);this.p={x:o.x,z:o.z,f:Math.atan2(48-o.x,48-o.z)},this.cd={melee:0,charges:Z.SH_MAX,gap:0,dash:s.dashMax,dashMax:s.dashMax,dgap:0,spec:2.5},this.dashT=0,this.dashA=0,this.lungeT=0,this.lungeD=0,this.aimLock=0,this.sendAcc=0,this.moving=!1,this.farT=0,this.chargeHold=0,this.dashHold=0,this.prevSt=Te,this.myPw=[],this.local={cM:0,cS:0,cX:0,cD:0},this.queue=[];let a=this.map,l=this.nTeams;this.view={phase:0,count:Z.COUNTDOWN,time:0,ninjas:r.map(function(h){let c=ys(a,l,h.team,h.slot);return{id:h.id,team:h.team,slot:h.slot,cls:h.cls,name:h.name,bot:!!h.bot,x:c.x,z:c.z,f:Math.atan2(48-c.x,48-c.z),hp:Z.HP,st:Te,fl:0,downT:0,revP:0,cM:0,cS:0,cX:0,cH:0,cD:0,kills:0,moving:!1,hidden:!1,pw:[]}}),proj:[],areas:[],scrolls:[],food:255,stars:[],items:[],mobs:this.map.mobs.map(function(h,c){let u=st[h.kind],f=e.mode===1?1:0;return{id:c,kind:h.kind,x:h.x,z:h.z,f:Math.atan2(48-h.x,48-h.z),hp:u.hp[f],max:u.hp[f],st:u.first[f]>0?0:1,cA:0,wind:0,cH:0,moving:!1}}),zone:{r:this.map.zoneR0||s.zoneR0,to:this.map.zoneR0||s.zoneR0,timer:s.zone[0].wait,shrinking:!1,stage:0,dps:0},deliver:[],events:[],end:null,stale:0,cd:this.cd,mode:this.mode,sealed:!0,lastLife:!1};for(let h=0;h<l;h++)this.view.scrolls.push({id:h,kind:h%2,carrier:h*3,x:0,z:0}),this.view.deliver.push(0)}onSnap(e){let t=e.t/1e3-this.localT;if(this.off=this.off==null?t:Math.max(this.off-.002,t),this.snaps.push(e),this.snaps.length>24&&this.snaps.shift(),e.e&&e.e.length)for(let n=0;n<e.e.length;n++)this.queue.push({t:e.t,e:e.e[n]});this.lastSnapAt=this.localT}autoAim(e,t){let n=this.view,s=this.p,r=null,o=e;for(let a=0;a<n.ninjas.length;a++){let l=n.ninjas[a];if(l.team===this.myTeam||l.st!==Te||l.hidden)continue;let h=l.x-s.x,c=l.z-s.z,u=Math.sqrt(h*h+c*c);u>=o||t&&!Lr(this.map,s.x,s.z,l.x,l.z)||(o=u,r=l)}if(r)return r;for(let a=0;a<n.mobs.length;a++){let l=n.mobs[a];if(l.st!==1)continue;let h=l.x-s.x,c=l.z-s.z,u=Math.sqrt(h*h+c*c)-st[l.kind].r*.6;u>=o||t&&!Lr(this.map,s.x,s.z,l.x,l.z)||(o=u,r=l)}return r}sendAct(e,t,n,s){let r=this.p,o=["a",e,Math.round(t*100),Math.round(r.x*100),Math.round(r.z*100)];n!=null&&o.push(Math.round(n*100),Math.round(s*100)),this.send(o),this.sendAcc=0}frame(e,t){this.localT+=e;let n=this.view,s=this.p,r=this.cd,o=this.map,a=this.R;n.events.length=0;let l=this.snaps.length?this.snaps[this.snaps.length-1]:null;n.stale=this.localT-this.lastSnapAt;let h=Te,c=0;if(l){let A=l.n[this.me];if(h=A[4],c=A[5],n.phase=l.ph,n.count=l.c/10,n.time=l.gt/10,ta(A[17]||0,this.myPw),r.dashMax=a.dashMax+_s(this.myPw,1),this.chargeHold>0?this.chargeHold-=e:(a.starPickup||Math.abs(r.charges-A[13]/10)>.8)&&(r.charges=A[13]/10),this.dashHold>0?this.dashHold-=e:Math.abs(r.dash-A[14]/10)>.35&&(r.dash=A[14]/10),Math.abs(r.spec-A[15]/10)>.7&&(r.spec=A[15]/10),this.prevSt!==Te&&h===Te&&(s.x=A[0]/100,s.z=A[1]/100,s.f=A[2]/100,this.farT=0,r.charges=A[13]/10,r.dash=A[14]/10,this.chargeHold=0,this.dashHold=0),this.prevSt=h,h!==Te)s.x=A[0]/100,s.z=A[1]/100,this.farT=0;else{let y=A[0]/100-s.x,S=A[1]/100-s.z;y*y+S*S>25?(this.farT+=e,this.farT>1.2&&(s.x=A[0]/100,s.z=A[1]/100,this.farT=0)):this.farT=0}}r.melee>0&&(r.melee-=e),r.gap>0&&(r.gap-=e),r.dgap>0&&(r.dgap-=e),r.dash<r.dashMax?r.dash=Math.min(r.dashMax,r.dash+e/a.dashCd):r.dash>r.dashMax&&(r.dash=r.dashMax),r.spec>0&&(r.spec-=e),!a.starPickup&&r.charges<Z.SH_MAX&&(r.charges=Math.min(Z.SH_MAX,r.charges+e/Z.SH_RECH));let u=l&&l.ph===1&&h===Te,f=!1,d=!1;if(u){let A=(c&Os)!==0;if(t.melee&&r.melee<=0){let L=this.autoAim(Z.MELEE_R+1+a.meleeReach,!1),T=L?Math.atan2(L.x-s.x,L.z-s.z):s.f;s.f=T,this.aimLock=.22,r.melee=Z.MELEE_CD,A||(this.lungeT=.1,this.lungeD=L?a.lunge:Math.min(a.lunge,.45)*.6),this.local.cM++,this.sendAct("m",T),d=!0}if(t.shuriken&&r.charges>=1&&r.gap<=0){let L=this.autoAim(10.2,!0),T=s.f;if(L){let N=Math.sqrt((L.x-s.x)*(L.x-s.x)+(L.z-s.z)*(L.z-s.z))/Z.SH_SPEED;T=Math.atan2(L.x+(L.vx||0)*N-s.x,L.z+(L.vz||0)*N-s.z)}s.f=T,this.aimLock=.18,r.charges-=1,r.gap=.26,this.chargeHold=.45,this.local.cS++,this.sendAct("s",T),d=!0}if(t.dash&&r.dash>=1&&r.dgap<=0&&!A){let L=t.mx||t.mz?Math.atan2(t.mx,t.mz):s.f;this.dashT=Z.DASH_T,this.dashA=L,r.dash-=1,r.dgap=.2,this.dashHold=.45,this.local.cD++,this.sendAct("d",L),d=!0}if(t.special&&r.spec<=0){if(r.spec=qt[this.cls].cd,this.local.cX++,this.cls===1)this.sendAct("x",s.f,s.x,s.z);else{let L=this.autoAim(Z.SPEC_RANGE+.5,!1),T,N;L?(T=L.x+(L.vx||0)*.3,N=L.z+(L.vz||0)*.3):(T=s.x+Math.sin(s.f)*5.5,N=s.z+Math.cos(s.f)*5.5);let U=Math.atan2(T-s.x,N-s.z);s.f=U,this.aimLock=.25,this.sendAct("x",U,T,N)}d=!0}let y=a.speed*(1+Z.POW_SPEED*_s(this.myPw,0))*(c&Fs?Z.SLOW_MULT:1),S=t.mx*y,P=t.mz*y;A&&(S=0,P=0),this.dashT>0&&(this.dashT-=e,S=Math.sin(this.dashA)*a.speed*Z.DASH_MULT,P=Math.cos(this.dashA)*a.speed*Z.DASH_MULT),this.lungeT>0&&!A&&(this.lungeT-=e,S+=Math.sin(s.f)*this.lungeD/.1,P+=Math.cos(s.f)*this.lungeD/.1),(S||P)&&Ji(o,s,S*e,P*e,Z.RADIUS),f=t.mx*t.mx+t.mz*t.mz>.02&&!A,this.aimLock>0?this.aimLock-=e:f&&(s.f=ch(s.f,Math.atan2(t.mx,t.mz),Math.min(1,e*16)))}else this.dashT=0,this.lungeT=0;if(this.moving=f,this.sendAcc+=e,!d&&this.sendAcc>=1/15&&u&&(this.sendAcc=0,this.send(["i",Math.round(s.x*100),Math.round(s.z*100),Math.round(s.f*100),f?1:0])),!l)return n;let p=(this.localT+this.off-this.delay)*1e3,v=this.snaps,m=v.length-1;for(;m>0&&v[m-1].t>p;)m--;let g=v[m],x=m>0?v[m-1]:g,_=g.t>x.t?yt((p-x.t)/(g.t-x.t),0,1):1,b=Math.max(1,g.t-x.t)/1e3;for(let A=0;A<n.ninjas.length;A++){let y=n.ninjas[A],S=x.n[A],P=g.n[A];if(A===this.me){y.x=s.x,y.z=s.z,y.f=s.f;let L=l.n[A];y.hp=L[3],y.st=L[4],y.fl=L[5],y.downT=L[6]/10,y.revP=L[7]/100,y.cH=L[11],y.kills=L[16],y.cM=this.local.cM,y.cS=this.local.cS,y.cX=this.local.cX,y.cD=this.local.cD,y.moving=f,y.hidden=!1,y.vx=0,y.vz=0,ta(L[17]||0,y.pw);continue}y.x=(S[0]+(P[0]-S[0])*_)/100,y.z=(S[1]+(P[1]-S[1])*_)/100,y.f=ch(S[2]/100,P[2]/100,_),y.vx=(P[0]-S[0])/100/b,y.vz=(P[1]-S[1])/100/b,y.hp=P[3],y.st=P[4],y.fl=P[5],y.downT=P[6]/10,y.revP=P[7]/100,y.cM=P[8],y.cS=P[9],y.cX=P[10],y.cH=P[11],y.cD=P[12],y.kills=P[16],ta(P[17]||0,y.pw),Math.abs(P[0]-S[0])+Math.abs(P[1]-S[1])>600&&(y.x=P[0]/100,y.z=P[1]/100,y.vx=0,y.vz=0),y.moving=(P[5]&ia)!==0||y.vx*y.vx+y.vz*y.vz>1}let C=!1;for(let A=0;A<n.ninjas.length;A++)n.ninjas[A].team===this.myTeam&&n.ninjas[A].st===Te&&(C=!0);for(let A=0;A<n.ninjas.length;A++){let y=n.ninjas[A];if(y.team===this.myTeam){y.hidden=!1;continue}let S=C&&y.st===Te&&(y.fl&aa)!==0&&(y.fl&oa)===0;if(S)for(let P=0;P<n.ninjas.length;P++){let L=n.ninjas[P];if(L.team!==this.myTeam||L.st!==Te)continue;let T=L.x-y.x,N=L.z-y.z;if(T*T+N*N<Z.BUSH_SEE*Z.BUSH_SEE){S=!1;break}}y.hidden=S}let I=(p-x.t)/1e3;n.proj.length=0;for(let A=0;A<x.p.length;A++){let y=x.p[A],S=y[9]/100-I;S<-.02||n.proj.push({id:y[0],kind:y[1],x:y[2]/100+y[4]/100*I,z:y[3]/100+y[5]/100*I,team:y[6],tx:y[7]/100,tz:y[8]/100,ttl:S,vx:y[4]/100,vz:y[5]/100,boom:y[10]===1})}n.areas.length=0;for(let A=0;A<g.a.length;A++){let y=g.a[A];n.areas.push({id:y[0],kind:y[1],x:y[2]/100,z:y[3]/100,r:y[4]/100,ttl:y[5]/10,team:y[6]})}for(let A=0;A<n.scrolls.length;A++){let y=g.s[A],S=n.scrolls[A];S.carrier=y[0],y[0]>=0?(S.x=n.ninjas[y[0]].x,S.z=n.ninjas[y[0]].z):(S.x=y[1]/100,S.z=y[2]/100)}n.food=g.h;let M=x.z,w=g.z;n.zone.r=(M[0]+(w[0]-M[0])*_)/10,n.zone.to=w[1]/10,n.zone.timer=w[2]/10,n.zone.shrinking=w[3]===1,n.zone.stage=w[4],n.zone.dps=w[5];for(let A=0;A<n.deliver.length;A++)n.deliver[A]=g.d[A]/100;if(n.stars=g.g||n.stars,n.items=g.it||n.items,n.lastLife=g.ll===1,g.mb)for(let A=0;A<n.mobs.length;A++){let y=n.mobs[A],S=g.mb[A],P=x.mb?x.mb[A]:0;if(!S){y.st=0,y.wind=0,y.moving=!1;continue}let L=P||S;Math.abs(S[0]-L[0])+Math.abs(S[1]-L[1])>400?(y.x=S[0]/100,y.z=S[1]/100):(y.x=(L[0]+(S[0]-L[0])*_)/100,y.z=(L[1]+(S[1]-L[1])*_)/100),y.f=ch(L[2]/100,S[2]/100,_),y.hp=S[3],y.st=S[4],y.cA=S[5],y.wind=S[6],y.cH=S[7],y.moving=S[8]===1}for(n.sealed=a.resurge?n.zone.stage<a.openStage:n.zone.stage===0&&!n.zone.shrinking;this.queue.length&&this.queue[0].t<=p+2;){let A=this.queue.shift().e;n.events.push(A),A[0]==="end"&&(n.end={winner:A[1],how:A[2],rank:A[3],stats:A[4],time:A[5]})}return n}};function lh(i,e){let t=!1,n=!1;for(let s=0;s<i.scrolls.length;s++){let r=i.scrolls[s];if(r.carrier<0)continue;let o=i.ninjas[r.carrier];o.team===e&&o.st===Te&&(r.kind===0?t=!0:n=!0)}return{sol:t,luna:n}}function da(i,e,t,n){let s=[],r={};for(let l=0;l<e.length;l++)r[e[l].name]=1;let o=n.slice();for(let l=o.length-1;l>0;l--){let h=Math.floor(t()*(l+1)),c=o[l];o[l]=o[h],o[h]=c}let a=0;for(let l=0;l<i;l++){let h={};for(let c=0;c<e.length;c++)e[c].team===l&&(h[e[c].cls]=1);for(let c=0;c<3;c++){let u=null;for(let p=0;p<e.length;p++)e[p].team===l&&e[p].slot===c&&(u=e[p]);if(u){s.push({id:l*3+c,team:l,slot:c,cls:u.cls,name:u.name,bot:!1,owner:u.owner});continue}let f=0;for(let p=0;p<3;p++){let v=(p+c+l)%3;if(!h[v]){f=v;break}}for(h[f]=1;a<o.length&&r[o[a]];)a++;let d=o[a++%o.length];s.push({id:l*3+c,team:l,slot:c,cls:f,name:d,bot:!0,owner:null})}}return s}var Wd=0,qh=1,Xd=2;var So=1,qd=2,gr=3,cs=0,Tn=1,nn=2,Es=0,xr=1,As=2,Yh=3,jh=4,Tc=5;var ws=100,Yd=101,jd=102,Jd=103,Zd=104,$d=200,Kd=201,Qd=202,ep=203,Jh=204,Zh=205,tp=206,np=207,ip=208,sp=209,rp=210,op=211,ap=212,cp=213,lp=214,Ha=0,Ga=1,Va=2,tr=3,Wa=4,Xa=5,nr=6,qa=7,Ec=0,hp=1,up=2,Si=0,$h=1,Kh=2,Qh=3,eu=4,tu=5,nu=6,iu=7;var su=300,Rs=301,_r=302,Ac=303,wc=304,Ya=1e3,yi=1001,ja=1002,tn=1003,fp=1004;var To=1005;var Sn=1006,Rc=1007;var zi=1008;var Pn=1009,ru=1010,ou=1011,yr=1012,Cc=1013,fi=1014,Qn=1015,di=1016,Pc=1017,Ic=1018,Cs=1020,au=35902,cu=35899,lu=1021,hu=1022,pi=1023,Ui=1026,Bi=1027,Lc=1028,Dc=1029,ls=1030,Nc=1031;var Uc=1033,Eo=33776,Ao=33777,wo=33778,Ro=33779,Oc=35840,Fc=35841,kc=35842,zc=35843,Bc=36196,Hc=37492,Gc=37496,Vc=37488,Wc=37489,Co=37490,Xc=37491,qc=37808,Yc=37809,jc=37810,Jc=37811,Zc=37812,$c=37813,Kc=37814,Qc=37815,el=37816,tl=37817,nl=37818,il=37819,sl=37820,rl=37821,ol=36492,al=36494,cl=36495,ll=36283,hl=36284,Po=36285,ul=36286;var Wr=2300,Ja=2301,za=2302,Uh=2303,Oh=2400,Fh=2401,kh=2402;var dp=3200;var fl=0,pp=1,Hi="",On="srgb",Xr="srgb-linear",qr="linear",xt="srgb";var Ba=7680;var mp=519,gp=512,xp=513,_p=514,uu=515,yp=516,vp=517,fu=518,du=519,bp=35044;var pu="300 es",$n=2e3,ir=2001;function R0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function C0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Yr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Mp(){let i=Yr("canvas");return i.style.display="block",i}var hd={},sr=null;function mu(...i){let e="THREE."+i.shift();sr?sr("log",e,...i):console.log(e,...i)}function Sp(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ge(...i){i=Sp(i);let e="THREE."+i.shift();if(sr)sr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function We(...i){i=Sp(i);let e="THREE."+i.shift();if(sr)sr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Hr(...i){let e=i.join(" ");e in hd||(hd[e]=!0,Ge(...i))}function Tp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Ep={[Ha]:Ha,[Va]:nr,[Wa]:Wa,[tr]:Xa,[Ga]:Ga,[nr]:Va,[qa]:qa,[Xa]:tr},vi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},un=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var hh=Math.PI/180,Za=180/Math.PI;function vr(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(un[i&255]+un[i>>8&255]+un[i>>16&255]+un[i>>24&255]+"-"+un[e&255]+un[e>>8&255]+"-"+un[e>>16&15|64]+un[e>>24&255]+"-"+un[t&63|128]+un[t>>8&255]+"-"+un[t>>16&255]+un[t>>24&255]+un[n&255]+un[n>>8&255]+un[n>>16&255]+un[n>>24&255]).toLowerCase()}function et(i,e,t){return Math.max(e,Math.min(t,i))}function P0(i,e){return(i%e+e)%e}function uh(i,e,t){return(1-t)*i+t*e}function Ap(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function gu(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function I0(i,e){if(e.constructor===Float32Array)return i;let t=gu(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function L0(i,e){if(e.constructor===Float32Array)return i;let t=gu(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var Mu=class Mu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Mu.prototype.isVector2=!0;var Ae=Mu,bi=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],h=n[s+1],c=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],p=r[o+2],v=r[o+3];if(u!==v||l!==f||h!==d||c!==p){let m=l*f+h*d+c*p+u*v;m<0&&(f=-f,d=-d,p=-p,v=-v,m=-m);let g=1-a;if(m<.9995){let x=Math.acos(m),_=Math.sin(x);g=Math.sin(g*x)/_,a=Math.sin(a*x)/_,l=l*g+f*a,h=h*g+d*a,c=c*g+p*a,u=u*g+v*a}else{l=l*g+f*a,h=h*g+d*a,c=c*g+p*a,u=u*g+v*a;let x=1/Math.sqrt(l*l+h*h+c*c+u*u);l*=x,h*=x,c*=x,u*=x}}e[t]=l,e[t+1]=h,e[t+2]=c,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],h=n[s+2],c=n[s+3],u=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return e[t]=a*p+c*u+l*d-h*f,e[t+1]=l*p+c*f+h*u-a*d,e[t+2]=h*p+c*d+a*f-l*u,e[t+3]=c*p-a*u-l*f-h*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,h=a(n/2),c=a(s/2),u=a(r/2),f=l(n/2),d=l(s/2),p=l(r/2);switch(o){case"XYZ":this._x=f*c*u+h*d*p,this._y=h*d*u-f*c*p,this._z=h*c*p+f*d*u,this._w=h*c*u-f*d*p;break;case"YXZ":this._x=f*c*u+h*d*p,this._y=h*d*u-f*c*p,this._z=h*c*p-f*d*u,this._w=h*c*u+f*d*p;break;case"ZXY":this._x=f*c*u-h*d*p,this._y=h*d*u+f*c*p,this._z=h*c*p+f*d*u,this._w=h*c*u-f*d*p;break;case"ZYX":this._x=f*c*u-h*d*p,this._y=h*d*u+f*c*p,this._z=h*c*p-f*d*u,this._w=h*c*u+f*d*p;break;case"YZX":this._x=f*c*u+h*d*p,this._y=h*d*u+f*c*p,this._z=h*c*p-f*d*u,this._w=h*c*u-f*d*p;break;case"XZY":this._x=f*c*u-h*d*p,this._y=h*d*u-f*c*p,this._z=h*c*p+f*d*u,this._w=h*c*u+f*d*p;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],h=t[2],c=t[6],u=t[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(c-l)*d,this._y=(r-h)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(c-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+h)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-h)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+c)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+h)/d,this._y=(l+c)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,h=t._z,c=t._w;return this._x=n*c+o*a+s*h-r*l,this._y=s*c+o*l+r*a-n*h,this._z=r*c+o*h+n*l-s*a,this._w=o*c-n*a-s*l-r*h,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let h=Math.acos(a),c=Math.sin(h);l=Math.sin(l*h)/c,t=Math.sin(t*h)/c,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Su=class Su{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ud.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ud.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,h=2*(o*s-a*n),c=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*h+o*u-a*c,this.y=n+l*c+a*h-r*u,this.z=s+l*u+r*c-o*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fh.copy(this).projectOnVector(e),this.sub(fh)}reflect(e){return this.sub(fh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Su.prototype.isVector3=!0;var V=Su,fh=new V,ud=new bi,Tu=class Tu{constructor(e,t,n,s,r,o,a,l,h){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,h)}set(e,t,n,s,r,o,a,l,h){let c=this.elements;return c[0]=e,c[1]=s,c[2]=a,c[3]=t,c[4]=r,c[5]=l,c[6]=n,c[7]=o,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],h=n[1],c=n[4],u=n[7],f=n[2],d=n[5],p=n[8],v=s[0],m=s[3],g=s[6],x=s[1],_=s[4],b=s[7],C=s[2],I=s[5],M=s[8];return r[0]=o*v+a*x+l*C,r[3]=o*m+a*_+l*I,r[6]=o*g+a*b+l*M,r[1]=h*v+c*x+u*C,r[4]=h*m+c*_+u*I,r[7]=h*g+c*b+u*M,r[2]=f*v+d*x+p*C,r[5]=f*m+d*_+p*I,r[8]=f*g+d*b+p*M,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],h=e[7],c=e[8];return t*o*c-t*a*h-n*r*c+n*a*l+s*r*h-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],h=e[7],c=e[8],u=c*o-a*h,f=a*l-c*r,d=h*r-o*l,p=t*u+n*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/p;return e[0]=u*v,e[1]=(s*h-c*n)*v,e[2]=(a*n-s*o)*v,e[3]=f*v,e[4]=(c*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=d*v,e[7]=(n*l-h*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),h=Math.sin(r);return this.set(n*l,n*h,-n*(l*o+h*a)+o+e,-s*h,s*l,-s*(-h*o+l*a)+a+t,0,0,1),this}scale(e,t){return Hr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(dh.makeScale(e,t)),this}rotate(e){return Hr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(dh.makeRotation(-e)),this}translate(e,t){return Hr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(dh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Tu.prototype.isMatrix3=!0;var qe=Tu,dh=new qe,fd=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dd=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function D0(){let i={enabled:!0,workingColorSpace:Xr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===xt&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===xt&&(s.r=Qs(s.r),s.g=Qs(s.g),s.b=Qs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hi?qr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Xr]:{primaries:e,whitePoint:n,transfer:qr,toXYZ:fd,fromXYZ:dd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:On},outputColorSpaceConfig:{drawingBufferColorSpace:On}},[On]:{primaries:e,whitePoint:n,transfer:xt,toXYZ:fd,fromXYZ:dd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:On}}}),i}var rt=D0();function Ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Qs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var zs,$a=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{zs===void 0&&(zs=Yr("canvas")),zs.width=e.width,zs.height=e.height;let s=zs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=zs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Yr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ni(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ni(t[n]/255)*255):t[n]=Ni(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},N0=0,rr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:N0++}),this.uuid=vr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ph(s[o].image)):r.push(ph(s[o]))}else r=ph(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function ph(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?$a.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}var U0=0,mh=new V,Cn=class i extends vi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=yi,s=yi,r=Sn,o=zi,a=pi,l=Pn,h=i.DEFAULT_ANISOTROPY,c=Hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:U0++}),this.uuid=vr(),this.name="",this.source=new rr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(mh).x}get height(){return this.source.getSize(mh).y}get depth(){return this.source.getSize(mh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==su)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ya:e.x=e.x-Math.floor(e.x);break;case yi:e.x=e.x<0?0:1;break;case ja:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ya:e.y=e.y-Math.floor(e.y);break;case yi:e.y=e.y<0?0:1;break;case ja:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Cn.DEFAULT_IMAGE=null;Cn.DEFAULT_MAPPING=su;Cn.DEFAULT_ANISOTROPY=1;var Eu=class Eu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,h=l[0],c=l[4],u=l[8],f=l[1],d=l[5],p=l[9],v=l[2],m=l[6],g=l[10];if(Math.abs(c-f)<.01&&Math.abs(u-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(c+f)<.1&&Math.abs(u+v)<.1&&Math.abs(p+m)<.1&&Math.abs(h+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(h+1)/2,b=(d+1)/2,C=(g+1)/2,I=(c+f)/4,M=(u+v)/4,w=(p+m)/4;return _>b&&_>C?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=I/n,r=M/n):b>C?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=I/s,r=w/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=M/r,s=w/r),this.set(n,s,r,t),this}let x=Math.sqrt((m-p)*(m-p)+(u-v)*(u-v)+(f-c)*(f-c));return Math.abs(x)<.001&&(x=1),this.x=(m-p)/x,this.y=(u-v)/x,this.z=(f-c)/x,this.w=Math.acos((h+d+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Eu.prototype.isVector4=!0;var It=Eu,Ka=class extends vi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Cn({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Sn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new rr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Fn=class extends Ka{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},jr=class extends Cn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Qa=class extends Cn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Sc=class Sc{constructor(e,t,n,s,r,o,a,l,h,c,u,f,d,p,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,h,c,u,f,d,p,v,m)}set(e,t,n,s,r,o,a,l,h,c,u,f,d,p,v,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=h,g[6]=c,g[10]=u,g[14]=f,g[3]=d,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Sc().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Bs.setFromMatrixColumn(e,0).length(),r=1/Bs.setFromMatrixColumn(e,1).length(),o=1/Bs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),h=Math.sin(s),c=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*c,d=o*u,p=a*c,v=a*u;t[0]=l*c,t[4]=-l*u,t[8]=h,t[1]=d+p*h,t[5]=f-v*h,t[9]=-a*l,t[2]=v-f*h,t[6]=p+d*h,t[10]=o*l}else if(e.order==="YXZ"){let f=l*c,d=l*u,p=h*c,v=h*u;t[0]=f+v*a,t[4]=p*a-d,t[8]=o*h,t[1]=o*u,t[5]=o*c,t[9]=-a,t[2]=d*a-p,t[6]=v+f*a,t[10]=o*l}else if(e.order==="ZXY"){let f=l*c,d=l*u,p=h*c,v=h*u;t[0]=f-v*a,t[4]=-o*u,t[8]=p+d*a,t[1]=d+p*a,t[5]=o*c,t[9]=v-f*a,t[2]=-o*h,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let f=o*c,d=o*u,p=a*c,v=a*u;t[0]=l*c,t[4]=p*h-d,t[8]=f*h+v,t[1]=l*u,t[5]=v*h+f,t[9]=d*h-p,t[2]=-h,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let f=o*l,d=o*h,p=a*l,v=a*h;t[0]=l*c,t[4]=v-f*u,t[8]=p*u+d,t[1]=u,t[5]=o*c,t[9]=-a*c,t[2]=-h*c,t[6]=d*u+p,t[10]=f-v*u}else if(e.order==="XZY"){let f=o*l,d=o*h,p=a*l,v=a*h;t[0]=l*c,t[4]=-u,t[8]=h*c,t[1]=f*u+v,t[5]=o*c,t[9]=d*u-p,t[2]=p*u-d,t[6]=a*c,t[10]=v*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(O0,e,F0)}lookAt(e,t,n){let s=this.elements;return Nn.subVectors(e,t),Nn.lengthSq()===0&&(Nn.z=1),Nn.normalize(),$i.crossVectors(n,Nn),$i.lengthSq()===0&&(Math.abs(n.z)===1?Nn.x+=1e-4:Nn.z+=1e-4,Nn.normalize(),$i.crossVectors(n,Nn)),$i.normalize(),pa.crossVectors(Nn,$i),s[0]=$i.x,s[4]=pa.x,s[8]=Nn.x,s[1]=$i.y,s[5]=pa.y,s[9]=Nn.y,s[2]=$i.z,s[6]=pa.z,s[10]=Nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],h=n[12],c=n[1],u=n[5],f=n[9],d=n[13],p=n[2],v=n[6],m=n[10],g=n[14],x=n[3],_=n[7],b=n[11],C=n[15],I=s[0],M=s[4],w=s[8],A=s[12],y=s[1],S=s[5],P=s[9],L=s[13],T=s[2],N=s[6],U=s[10],F=s[14],J=s[3],B=s[7],k=s[11],G=s[15];return r[0]=o*I+a*y+l*T+h*J,r[4]=o*M+a*S+l*N+h*B,r[8]=o*w+a*P+l*U+h*k,r[12]=o*A+a*L+l*F+h*G,r[1]=c*I+u*y+f*T+d*J,r[5]=c*M+u*S+f*N+d*B,r[9]=c*w+u*P+f*U+d*k,r[13]=c*A+u*L+f*F+d*G,r[2]=p*I+v*y+m*T+g*J,r[6]=p*M+v*S+m*N+g*B,r[10]=p*w+v*P+m*U+g*k,r[14]=p*A+v*L+m*F+g*G,r[3]=x*I+_*y+b*T+C*J,r[7]=x*M+_*S+b*N+C*B,r[11]=x*w+_*P+b*U+C*k,r[15]=x*A+_*L+b*F+C*G,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],h=e[13],c=e[2],u=e[6],f=e[10],d=e[14],p=e[3],v=e[7],m=e[11],g=e[15],x=l*d-h*f,_=a*d-h*u,b=a*f-l*u,C=o*d-h*c,I=o*f-l*c,M=o*u-a*c;return t*(v*x-m*_+g*b)-n*(p*x-m*C+g*I)+s*(p*_-v*C+g*M)-r*(p*b-v*I+m*M)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],h=e[6],c=e[10];return t*(o*c-a*h)-n*(r*c-a*l)+s*(r*h-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],h=e[7],c=e[8],u=e[9],f=e[10],d=e[11],p=e[12],v=e[13],m=e[14],g=e[15],x=t*a-n*o,_=t*l-s*o,b=t*h-r*o,C=n*l-s*a,I=n*h-r*a,M=s*h-r*l,w=c*v-u*p,A=c*m-f*p,y=c*g-d*p,S=u*m-f*v,P=u*g-d*v,L=f*g-d*m,T=x*L-_*P+b*S+C*y-I*A+M*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/T;return e[0]=(a*L-l*P+h*S)*N,e[1]=(s*P-n*L-r*S)*N,e[2]=(v*M-m*I+g*C)*N,e[3]=(f*I-u*M-d*C)*N,e[4]=(l*y-o*L-h*A)*N,e[5]=(t*L-s*y+r*A)*N,e[6]=(m*b-p*M-g*_)*N,e[7]=(c*M-f*b+d*_)*N,e[8]=(o*P-a*y+h*w)*N,e[9]=(n*y-t*P-r*w)*N,e[10]=(p*I-v*b+g*x)*N,e[11]=(u*b-c*I-d*x)*N,e[12]=(a*A-o*S-l*w)*N,e[13]=(t*S-n*A+s*w)*N,e[14]=(v*_-p*C-m*x)*N,e[15]=(c*C-u*_+f*x)*N,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,h=r*o,c=r*a;return this.set(h*o+n,h*a-s*l,h*l+s*a,0,h*a+s*l,c*a+n,c*l-s*o,0,h*l-s*a,c*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,h=r+r,c=o+o,u=a+a,f=r*h,d=r*c,p=r*u,v=o*c,m=o*u,g=a*u,x=l*h,_=l*c,b=l*u,C=n.x,I=n.y,M=n.z;return s[0]=(1-(v+g))*C,s[1]=(d+b)*C,s[2]=(p-_)*C,s[3]=0,s[4]=(d-b)*I,s[5]=(1-(f+g))*I,s[6]=(m+x)*I,s[7]=0,s[8]=(p+_)*M,s[9]=(m-x)*M,s[10]=(1-(f+v))*M,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Bs.set(s[0],s[1],s[2]).length(),a=Bs.set(s[4],s[5],s[6]).length(),l=Bs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),oi.copy(this);let h=1/o,c=1/a,u=1/l;return oi.elements[0]*=h,oi.elements[1]*=h,oi.elements[2]*=h,oi.elements[4]*=c,oi.elements[5]*=c,oi.elements[6]*=c,oi.elements[8]*=u,oi.elements[9]*=u,oi.elements[10]*=u,t.setFromRotationMatrix(oi),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=$n,l=!1){let h=this.elements,c=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s),p,v;if(l)p=r/(o-r),v=o*r/(o-r);else if(a===$n)p=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===ir)p=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return h[0]=c,h[4]=0,h[8]=f,h[12]=0,h[1]=0,h[5]=u,h[9]=d,h[13]=0,h[2]=0,h[6]=0,h[10]=p,h[14]=v,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=$n,l=!1){let h=this.elements,c=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s),p,v;if(l)p=1/(o-r),v=o/(o-r);else if(a===$n)p=-2/(o-r),v=-(o+r)/(o-r);else if(a===ir)p=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return h[0]=c,h[4]=0,h[8]=0,h[12]=f,h[1]=0,h[5]=u,h[9]=0,h[13]=d,h[2]=0,h[6]=0,h[10]=p,h[14]=v,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Sc.prototype.isMatrix4=!0;var ft=Sc,Bs=new V,oi=new ft,O0=new V(0,0,0),F0=new V(1,1,1),$i=new V,pa=new V,Nn=new V,pd=new ft,md=new bi,hi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],h=s[5],c=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,h),this._z=0);break;case"YXZ":this._x=Math.asin(-et(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(et(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,h),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-c,d),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return pd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return md.setFromEuler(this),this.setFromQuaternion(md,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};hi.DEFAULT_ORDER="XYZ";var Jr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},k0=0,gd=new V,Hs=new bi,Ci=new ft,ma=new V,Nr=new V,z0=new V,B0=new bi,xd=new V(1,0,0),_d=new V(0,1,0),yd=new V(0,0,1),vd={type:"added"},H0={type:"removed"},Gs={type:"childadded",child:null},gh={type:"childremoved",child:null},Ht=class i extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:k0++}),this.uuid=vr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new V,t=new hi,n=new bi,s=new V(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ft},normalMatrix:{value:new qe}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hs.setFromAxisAngle(e,t),this.quaternion.multiply(Hs),this}rotateOnWorldAxis(e,t){return Hs.setFromAxisAngle(e,t),this.quaternion.premultiply(Hs),this}rotateX(e){return this.rotateOnAxis(xd,e)}rotateY(e){return this.rotateOnAxis(_d,e)}rotateZ(e){return this.rotateOnAxis(yd,e)}translateOnAxis(e,t){return gd.copy(e).applyQuaternion(this.quaternion),this.position.add(gd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xd,e)}translateY(e){return this.translateOnAxis(_d,e)}translateZ(e){return this.translateOnAxis(yd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ma.copy(e):ma.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(Nr,ma,this.up):Ci.lookAt(ma,Nr,this.up),this.quaternion.setFromRotationMatrix(Ci),s&&(Ci.extractRotation(s.matrixWorld),Hs.setFromRotationMatrix(Ci),this.quaternion.premultiply(Hs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(We("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vd),Gs.child=e,this.dispatchEvent(Gs),Gs.child=null):We("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(H0),gh.child=e,this.dispatchEvent(gh),gh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vd),Gs.child=e,this.dispatchEvent(Gs),Gs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,e,z0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,B0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){let u=l[h];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,h=this.material.length;l<h;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),h=o(e.textures),c=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),c.length>0&&(n.images=c),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){let l=[];for(let h in a){let c=a[h];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ht.DEFAULT_UP=new V(0,1,0);Ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Mn=class extends Ht{constructor(){super(),this.isGroup=!0,this.type="Group"}},G0={type:"move"},or=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){o=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),g=this._getHandJoint(h,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let c=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],f=c.position.distanceTo(u.position),d=.02,p=.005;h.inputState.pinching&&f>d+p?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&f<=d-p&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(G0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Mn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},wp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},ga={h:0,s:0,l:0};function xh(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Xe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=On){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,rt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=rt.workingColorSpace){if(e=P0(e,1),t=et(t,0,1),n=et(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=xh(o,r,e+1/3),this.g=xh(o,r,e),this.b=xh(o,r,e-1/3)}return rt.colorSpaceToWorking(this,s),this}setStyle(e,t=On){function n(r){r!==void 0&&parseFloat(r)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=On){let n=wp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}copyLinearToSRGB(e){return this.r=Qs(e.r),this.g=Qs(e.g),this.b=Qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=On){return rt.workingToColorSpace(fn.copy(this),e),Math.round(et(fn.r*255,0,255))*65536+Math.round(et(fn.g*255,0,255))*256+Math.round(et(fn.b*255,0,255))}getHexString(e=On){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.workingToColorSpace(fn.copy(this),t);let n=fn.r,s=fn.g,r=fn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,h,c=(a+o)/2;if(a===o)l=0,h=0;else{let u=o-a;switch(h=c<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=h,e.l=c,e}getRGB(e,t=rt.workingColorSpace){return rt.workingToColorSpace(fn.copy(this),t),e.r=fn.r,e.g=fn.g,e.b=fn.b,e}getStyle(e=On){rt.workingToColorSpace(fn.copy(this),e);let t=fn.r,n=fn.g,s=fn.b;return e!==On?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ki),this.setHSL(Ki.h+e,Ki.s+t,Ki.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ki),e.getHSL(ga);let n=uh(Ki.h,ga.h,t),s=uh(Ki.s,ga.s,t),r=uh(Ki.l,ga.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},fn=new Xe;Xe.NAMES=wp;var Zr=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Xe(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},$r=class extends Ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hi,this.environmentIntensity=1,this.environmentRotation=new hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ai=new V,Pi=new V,_h=new V,Ii=new V,Vs=new V,Ws=new V,bd=new V,yh=new V,vh=new V,bh=new V,Mh=new It,Sh=new It,Th=new It,ns=class i{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ai.subVectors(e,t),s.cross(ai);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ai.subVectors(s,t),Pi.subVectors(n,t),_h.subVectors(e,t);let o=ai.dot(ai),a=ai.dot(Pi),l=ai.dot(_h),h=Pi.dot(Pi),c=Pi.dot(_h),u=o*h-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(h*l-a*c)*f,p=(o*c-a*l)*f;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ii.x),l.addScaledVector(o,Ii.y),l.addScaledVector(a,Ii.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Mh.setScalar(0),Sh.setScalar(0),Th.setScalar(0),Mh.fromBufferAttribute(e,t),Sh.fromBufferAttribute(e,n),Th.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Mh,r.x),o.addScaledVector(Sh,r.y),o.addScaledVector(Th,r.z),o}static isFrontFacing(e,t,n,s){return ai.subVectors(n,t),Pi.subVectors(e,t),ai.cross(Pi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ai.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),ai.cross(Pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Vs.subVectors(s,n),Ws.subVectors(r,n),yh.subVectors(e,n);let l=Vs.dot(yh),h=Ws.dot(yh);if(l<=0&&h<=0)return t.copy(n);vh.subVectors(e,s);let c=Vs.dot(vh),u=Ws.dot(vh);if(c>=0&&u<=c)return t.copy(s);let f=l*u-c*h;if(f<=0&&l>=0&&c<=0&&l-c>0)return o=l/(l-c),t.copy(n).addScaledVector(Vs,o);bh.subVectors(e,r);let d=Vs.dot(bh),p=Ws.dot(bh);if(p>=0&&d<=p)return t.copy(r);let v=d*h-l*p;if(v<=0&&h>=0&&p<=0)return a=h/(h-p),t.copy(n).addScaledVector(Ws,a);let m=c*p-d*u;if(m<=0&&u-c>=0&&d-p>=0)return bd.subVectors(r,s),a=(u-c)/(u-c+(d-p)),t.copy(s).addScaledVector(bd,a);let g=1/(m+v+f);return o=v*g,a=f*g,t.copy(n).addScaledVector(Vs,o).addScaledVector(Ws,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Mi=class{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ci.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ci.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ci.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ci):ci.fromBufferAttribute(r,o),ci.applyMatrix4(e.matrixWorld),this.expandByPoint(ci);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xa.copy(n.boundingBox)),xa.applyMatrix4(e.matrixWorld),this.union(xa)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ci),ci.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ur),_a.subVectors(this.max,Ur),Xs.subVectors(e.a,Ur),qs.subVectors(e.b,Ur),Ys.subVectors(e.c,Ur),Qi.subVectors(qs,Xs),es.subVectors(Ys,qs),vs.subVectors(Xs,Ys);let t=[0,-Qi.z,Qi.y,0,-es.z,es.y,0,-vs.z,vs.y,Qi.z,0,-Qi.x,es.z,0,-es.x,vs.z,0,-vs.x,-Qi.y,Qi.x,0,-es.y,es.x,0,-vs.y,vs.x,0];return!Eh(t,Xs,qs,Ys,_a)||(t=[1,0,0,0,1,0,0,0,1],!Eh(t,Xs,qs,Ys,_a))?!1:(ya.crossVectors(Qi,es),t=[ya.x,ya.y,ya.z],Eh(t,Xs,qs,Ys,_a))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ci).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ci).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Li=[new V,new V,new V,new V,new V,new V,new V,new V],ci=new V,xa=new Mi,Xs=new V,qs=new V,Ys=new V,Qi=new V,es=new V,vs=new V,Ur=new V,_a=new V,ya=new V,bs=new V;function Eh(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){bs.fromArray(i,r);let a=s.x*Math.abs(bs.x)+s.y*Math.abs(bs.y)+s.z*Math.abs(bs.z),l=e.dot(bs),h=t.dot(bs),c=n.dot(bs);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>a)return!1}return!0}var zt=new V,va=new Ae,V0=0,Bt=class extends vi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:V0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=bp,this.updateRanges=[],this.gpuType=Qn,this.version=0,this._normalizationScale=e!==void 0?gu(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)va.fromBufferAttribute(this,t),va.applyMatrix3(e),this.setXY(t,va.x,va.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):I0(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):L0(e,this.array)}};var Kr=class extends Bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Qr=class extends Bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var dt=class extends Bt{constructor(e,t,n){super(new Float32Array(e),t,n)}},W0=new Mi,Or=new V,Ah=new V,Oi=class{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):W0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Or.subVectors(e,this.center);let t=Or.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Or,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ah.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Or.copy(e.center).add(Ah)),this.expandByPoint(Or.copy(e.center).sub(Ah))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},X0=0,Zn=new ft,wh=new Ht,js=new V,Un=new Mi,Fr=new Mi,en=new V,Ft=class i extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:X0++}),this.uuid=vr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(R0(e)?Qr:Kr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Zn.makeRotationFromQuaternion(e),this.applyMatrix4(Zn),this}rotateX(e){return Zn.makeRotationX(e),this.applyMatrix4(Zn),this}rotateY(e){return Zn.makeRotationY(e),this.applyMatrix4(Zn),this}rotateZ(e){return Zn.makeRotationZ(e),this.applyMatrix4(Zn),this}translate(e,t,n){return Zn.makeTranslation(e,t,n),this.applyMatrix4(Zn),this}scale(e,t,n){return Zn.makeScale(e,t,n),this.applyMatrix4(Zn),this}lookAt(e){return wh.lookAt(e),wh.updateMatrix(),this.applyMatrix4(wh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(js).negate(),this.translate(js.x,js.y,js.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new dt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Un.setFromBufferAttribute(r),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,Un.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,Un.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(Un.min),this.boundingBox.expandByPoint(Un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&We('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){let n=this.boundingSphere.center;if(Un.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Fr.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(Un.min,Fr.min),Un.expandByPoint(en),en.addVectors(Un.max,Fr.max),Un.expandByPoint(en)):(Un.expandByPoint(Fr.min),Un.expandByPoint(Fr.max))}Un.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)en.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(en));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let h=0,c=a.count;h<c;h++)en.fromBufferAttribute(a,h),l&&(js.fromBufferAttribute(e,h),en.add(js)),s=Math.max(s,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&We('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){We("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Bt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],h=new Uint8Array(n.count);for(let A=0;A<n.count;A++)a[A]=new V,l[A]=new V;let c=new V,u=new V,f=new V,d=new Ae,p=new Ae,v=new Ae,m=new V,g=new V;function x(A,y,S){h[A]=h[y]=h[S]=1,c.fromBufferAttribute(n,A),u.fromBufferAttribute(n,y),f.fromBufferAttribute(n,S),d.fromBufferAttribute(r,A),p.fromBufferAttribute(r,y),v.fromBufferAttribute(r,S),u.sub(c),f.sub(c),p.sub(d),v.sub(d);let P=1/(p.x*v.y-v.x*p.y);isFinite(P)&&(m.copy(u).multiplyScalar(v.y).addScaledVector(f,-p.y).multiplyScalar(P),g.copy(f).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(P),a[A].add(m),a[y].add(m),a[S].add(m),l[A].add(g),l[y].add(g),l[S].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let A=0,y=_.length;A<y;++A){let S=_[A],P=S.start,L=S.count;for(let T=P,N=P+L;T<N;T+=3)x(e.getX(T+0),e.getX(T+1),e.getX(T+2))}let b=new V,C=new V,I=new V,M=new V;function w(A){I.fromBufferAttribute(s,A),M.copy(I);let y=a[A];b.copy(y),b.sub(I.multiplyScalar(I.dot(y))).normalize(),C.crossVectors(M,y);let P=C.dot(l[A])<0?-1:1;o.setXYZW(A,b.x,b.y,b.z,P)}for(let A=0,y=n.count;A<y;++A)h[A]&&w(A);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new V,r=new V,o=new V,a=new V,l=new V,h=new V,c=new V,u=new V;if(e)for(let f=0,d=e.count;f<d;f+=3){let p=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),c.subVectors(o,r),u.subVectors(s,r),c.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,m),a.add(c),l.add(c),h.add(c),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),c.subVectors(o,r),u.subVectors(s,r),c.cross(u),n.setXYZ(f+0,c.x,c.y,c.z),n.setXYZ(f+1,c.x,c.y,c.z),n.setXYZ(f+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)en.fromBufferAttribute(e,t),en.normalize(),e.setXYZ(t,en.x,en.y,en.z)}toNonIndexed(){function e(a,l){let h=a.array,c=a.itemSize,u=a.normalized,f=new h.constructor(l.length*c),d=0,p=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?d=l[v]*a.data.stride+a.offset:d=l[v]*c;for(let g=0;g<c;g++)f[p++]=h[d++]}return new Bt(f,c,u)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],h=e(l,n);t.setAttribute(a,h)}let r=this.morphAttributes;for(let a in r){let l=[],h=r[a];for(let c=0,u=h.length;c<u;c++){let f=h[c],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let h=o[a];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let h in l)l[h]!==void 0&&(e[h]=l[h]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let h=n[l];e.data.attributes[l]=h.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let h=this.morphAttributes[l],c=[];for(let u=0,f=h.length;u<f;u++){let d=h[u];c.push(d.toJSON(e.data))}c.length>0&&(s[l]=c,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let h in s){let c=s[h];this.setAttribute(h,c.clone(t))}let r=e.morphAttributes;for(let h in r){let c=[],u=r[h];for(let f=0,d=u.length;f<d;f++)c.push(u[f].clone(t));this.morphAttributes[h]=c}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let h=0,c=o.length;h<c;h++){let u=o[h];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Rh=new V,q0=new V,Y0=new qe,li=class{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Rh.subVectors(n,t).cross(q0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Rh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Y0.getNormalMatrix(e),s=this.coplanarPoint(Rh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},j0=0,Fi=class extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:j0++}),this.uuid=vr(),this.name="",this.type="Material",this.blending=xr,this.side=cs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jh,this.blendDst=Zh,this.blendEquation=ws,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=tr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ba,this.stencilZFail=Ba,this.stencilZPass=Ba,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Xe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new li().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ae().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ae().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Di=new V,Ch=new V,ba=new V,Ma=new V,eo=class{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Di.copy(this.origin).addScaledVector(this.direction,t),Di.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ch.copy(e).add(t).multiplyScalar(.5),ba.copy(t).sub(e).normalize(),Ma.copy(this.origin).sub(Ch);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ba),a=Ma.dot(this.direction),l=-Ma.dot(ba),h=Ma.lengthSq(),c=Math.abs(1-o*o),u,f,d,p;if(c>0)if(u=o*l-a,f=o*a-l,p=r*c,u>=0)if(f>=-p)if(f<=p){let v=1/c;u*=v,f*=v,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+h}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+h;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+h;else f<=-p?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+h):f<=p?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+h):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+h);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ch).addScaledVector(ba,f),d}intersectSphere(e,t){if(e.radius<0)return null;Di.subVectors(e.center,this.origin);let n=Di.dot(this.direction),s=Di.dot(Di)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,h=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,f=this.origin;return h>=0?(n=(e.min.x-f.x)*h,s=(e.max.x-f.x)*h):(n=(e.max.x-f.x)*h,s=(e.min.x-f.x)*h),c>=0?(r=(e.min.y-f.y)*c,o=(e.max.y-f.y)*c):(r=(e.max.y-f.y)*c,o=(e.min.y-f.y)*c),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Di)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,l=a.x,h=a.y,c=a.z,u=e.x-o.x,f=e.y-o.y,d=e.z-o.z,p=t.x-o.x,v=t.y-o.y,m=t.z-o.z,g=n.x-o.x,x=n.y-o.y,_=n.z-o.z,b=Math.abs(l),C=Math.abs(h),I=Math.abs(c),M,w,A,y,S,P,L,T,N,U,F,J;if(b>=C&&b>=I?(A=l,P=u,N=p,J=g,l>=0?(M=h,w=c,y=f,S=d,L=v,T=m,U=x,F=_):(M=c,w=h,y=d,S=f,L=m,T=v,U=_,F=x)):C>=I?(A=h,P=f,N=v,J=x,h>=0?(M=c,w=l,y=d,S=u,L=m,T=p,U=_,F=g):(M=l,w=c,y=u,S=d,L=p,T=m,U=g,F=_)):(A=c,P=d,N=m,J=_,c>=0?(M=l,w=h,y=u,S=f,L=p,T=v,U=g,F=x):(M=h,w=l,y=f,S=u,L=v,T=p,U=x,F=g)),A===0)return null;let B=M/A,k=w/A,G=1/A,ue=y-B*P,he=S-k*P,Y=L-B*N,ne=T-k*N,ve=U-B*J,pe=F-k*J,ce=ve*ne-pe*Y,Oe=ue*pe-he*ve,at=Y*he-ne*ue;if(s){if(ce<0||Oe<0||at<0)return null}else if((ce<0||Oe<0||at<0)&&(ce>0||Oe>0||at>0))return null;let Ne=ce+Oe+at;if(Ne===0)return null;let ot=G*(ce*P+Oe*N+at*J);return(Ne>0?ot<0:ot>0)?null:this.at(ot/Ne,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Tt=class extends Fi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Md=new ft,Ms=new eo,Sa=new Oi,Sd=new V,Ta=new V,Ea=new V,Aa=new V,Ph=new V,wa=new V,Td=new V,Ra=new V,Be=class extends Ht{constructor(e=new Ft,t=new Tt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){wa.set(0,0,0);for(let l=0,h=r.length;l<h;l++){let c=a[l],u=r[l];c!==0&&(Ph.fromBufferAttribute(u,e),o?wa.addScaledVector(Ph,c):wa.addScaledVector(Ph.sub(t),c))}t.add(wa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Sa.copy(n.boundingSphere),Sa.applyMatrix4(r),Ms.copy(e.ray).recast(e.near),!(Sa.containsPoint(Ms.origin)===!1&&(Ms.intersectSphere(Sa,Sd)===null||Ms.origin.distanceToSquared(Sd)>(e.far-e.near)**2))&&(Md.copy(r).invert(),Ms.copy(e.ray).applyMatrix4(Md),!(n.boundingBox!==null&&Ms.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ms)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,h=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){let m=f[p],g=o[m.materialIndex],x=Math.max(m.start,d.start),_=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let b=x,C=_;b<C;b+=3){let I=a.getX(b),M=a.getX(b+1),w=a.getX(b+2);s=Ca(this,g,e,n,h,c,u,I,M,w),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){let x=a.getX(m),_=a.getX(m+1),b=a.getX(m+2);s=Ca(this,o,e,n,h,c,u,x,_,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){let m=f[p],g=o[m.materialIndex],x=Math.max(m.start,d.start),_=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let b=x,C=_;b<C;b+=3){let I=b,M=b+1,w=b+2;s=Ca(this,g,e,n,h,c,u,I,M,w),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){let x=m,_=m+1,b=m+2;s=Ca(this,o,e,n,h,c,u,x,_,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function J0(i,e,t,n,s,r,o,a){let l;if(e.side===Tn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===cs,a),l===null)return null;Ra.copy(a),Ra.applyMatrix4(i.matrixWorld);let h=t.ray.origin.distanceTo(Ra);return h<t.near||h>t.far?null:{distance:h,point:Ra.clone(),object:i}}function Ca(i,e,t,n,s,r,o,a,l,h){i.getVertexPosition(a,Ta),i.getVertexPosition(l,Ea),i.getVertexPosition(h,Aa);let c=J0(i,e,t,n,Ta,Ea,Aa,Td);if(c){let u=new V;ns.getBarycoord(Td,Ta,Ea,Aa,u),s&&(c.uv=ns.getInterpolatedAttribute(s,a,l,h,u,new Ae)),r&&(c.uv1=ns.getInterpolatedAttribute(r,a,l,h,u,new Ae)),o&&(c.normal=ns.getInterpolatedAttribute(o,a,l,h,u,new V),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));let f={a,b:l,c:h,normal:new V,materialIndex:0};ns.getNormal(Ta,Ea,Aa,f.normal),c.face=f,c.barycoord=u}return c}var to=class extends Cn{constructor(e=null,t=1,n=1,s,r,o,a,l,h=tn,c=tn,u,f){super(null,o,a,l,h,c,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ar=class extends Bt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Js=new ft,Ed=new ft,Pa=[],Ad=new Mi,Z0=new ft,kr=new Be,zr=new Oi,cr=class extends Be{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ar(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Z0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Js),Ad.copy(e.boundingBox).applyMatrix4(Js),this.boundingBox.union(Ad)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Oi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Js),zr.copy(e.boundingSphere).applyMatrix4(Js),this.boundingSphere.union(zr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(kr.geometry=this.geometry,kr.material=this.material,kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zr.copy(this.boundingSphere),zr.applyMatrix4(n),e.ray.intersectsSphere(zr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Js),Ed.multiplyMatrices(n,Js),kr.matrixWorld=Ed,kr.raycast(e,Pa);for(let o=0,a=Pa.length;o<a;o++){let l=Pa[o];l.instanceId=r,l.object=this,t.push(l)}Pa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ar(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new to(new Float32Array(s*this.count),s,this.count,Lc,Qn));let r=this.morphTexture.source.data.data,o=0;for(let h=0;h<n.length;h++)o+=n[h];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ss=new Oi,$0=new Ae(.5,.5),Ia=new V,is=class{constructor(e=new li,t=new li,n=new li,s=new li,r=new li,o=new li){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=$n,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],h=r[3],c=r[4],u=r[5],f=r[6],d=r[7],p=r[8],v=r[9],m=r[10],g=r[11],x=r[12],_=r[13],b=r[14],C=r[15];if(s[0].setComponents(h-o,d-c,g-p,C-x).normalize(),s[1].setComponents(h+o,d+c,g+p,C+x).normalize(),s[2].setComponents(h+a,d+u,g+v,C+_).normalize(),s[3].setComponents(h-a,d-u,g-v,C-_).normalize(),n)s[4].setComponents(l,f,m,b).normalize(),s[5].setComponents(h-l,d-f,g-m,C-b).normalize();else if(s[4].setComponents(h-l,d-f,g-m,C-b).normalize(),t===$n)s[5].setComponents(h+l,d+f,g+m,C+b).normalize();else if(t===ir)s[5].setComponents(l,f,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ss.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ss.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ss)}intersectsSprite(e){Ss.center.set(0,0,0);let t=$0.distanceTo(e.center);return Ss.radius=.7071067811865476+t,Ss.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ss)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Ia.x=s.normal.x>0?e.max.x:e.min.x,Ia.y=s.normal.y>0?e.max.y:e.min.y,Ia.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ia)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},wd=new ft,ec=class i{constructor(){this.coordinateSystem=$n,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];wd.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new is),n[s].setFromProjectionMatrix(wd,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new is),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var tc=class extends Fi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Rd=new ft,zh=new eo,La=new Oi,Da=new V,no=class extends Ht{constructor(e=new Ft,t=new tc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),La.copy(n.boundingSphere),La.applyMatrix4(s),La.radius+=r,e.ray.intersectsSphere(La)===!1)return;Rd.copy(s).invert(),zh.copy(e.ray).applyMatrix4(Rd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let p=f,v=d;p<v;p++){let m=h.getX(p);Da.fromBufferAttribute(u,m),Cd(Da,m,l,s,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let p=f,v=d;p<v;p++)Da.fromBufferAttribute(u,p),Cd(Da,p,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Cd(i,e,t,n,s,r,o){let a=zh.distanceSqToPoint(i);if(a<t){let l=new V;zh.closestPointToPoint(i,l),l.applyMatrix4(n);let h=s.ray.origin.distanceTo(l);if(h<s.near||h>s.far)return;r.push({distance:h,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var io=class extends Cn{constructor(e=[],t=Rs,n,s,r,o,a,l,h,c){super(e,t,n,s,r,o,a,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var ki=class extends Cn{constructor(e,t,n=fi,s,r,o,a=tn,l=tn,h,c=Ui,u=1){if(c!==Ui&&c!==Bi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,o,a,l,c,n,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},so=class extends ki{constructor(e,t=fi,n=Rs,s,r,o=tn,a=tn,l,h=Ui){let c={width:e,height:e,depth:1},u=[c,c,c,c,c,c];super(e,e,t,n,s,r,o,a,l,h),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ro=class extends Cn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Fe=class i extends Ft{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],h=[],c=[],u=[],f=0,d=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,s,o,2),p("x","z","y",1,-1,e,n,-t,s,o,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new dt(h,3)),this.setAttribute("normal",new dt(c,3)),this.setAttribute("uv",new dt(u,2));function p(v,m,g,x,_,b,C,I,M,w,A){let y=b/M,S=C/w,P=b/2,L=C/2,T=I/2,N=M+1,U=w+1,F=0,J=0,B=new V;for(let k=0;k<U;k++){let G=k*S-L;for(let ue=0;ue<N;ue++){let he=ue*y-P;B[v]=he*x,B[m]=G*_,B[g]=T,h.push(B.x,B.y,B.z),B[v]=0,B[m]=0,B[g]=I>0?1:-1,c.push(B.x,B.y,B.z),u.push(ue/M),u.push(1-k/w),F+=1}}for(let k=0;k<w;k++)for(let G=0;G<M;G++){let ue=f+G+N*k,he=f+G+N*(k+1),Y=f+(G+1)+N*(k+1),ne=f+(G+1)+N*k;l.push(ue,he,ne),l.push(he,Y,ne),J+=6}a.addGroup(d,J,A),d+=J,f+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var lr=class i extends Ft{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],l=[],h=new V,c=new Ae;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let d=n+u/t*s;h.x=e*Math.cos(d),h.y=e*Math.sin(d),o.push(h.x,h.y,h.z),a.push(0,0,1),c.x=(o[f]/e+1)/2,c.y=(o[f+1]/e+1)/2,l.push(c.x,c.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new dt(o,3)),this.setAttribute("normal",new dt(a,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Et=class i extends Ft{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let h=this;s=Math.floor(s),r=Math.floor(r);let c=[],u=[],f=[],d=[],p=0,v=[],m=n/2,g=0;x(),o===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(c),this.setAttribute("position",new dt(u,3)),this.setAttribute("normal",new dt(f,3)),this.setAttribute("uv",new dt(d,2));function x(){let b=new V,C=new V,I=0,M=(t-e)/n;for(let w=0;w<=r;w++){let A=[],y=w/r,S=y*(t-e)+e;for(let P=0;P<=s;P++){let L=P/s,T=L*l+a,N=Math.sin(T),U=Math.cos(T);C.x=S*N,C.y=-y*n+m,C.z=S*U,u.push(C.x,C.y,C.z),b.set(N,M,U).normalize(),f.push(b.x,b.y,b.z),d.push(L,1-y),A.push(p++)}v.push(A)}for(let w=0;w<s;w++)for(let A=0;A<r;A++){let y=v[A][w],S=v[A+1][w],P=v[A+1][w+1],L=v[A][w+1];(e>0||A!==0)&&(c.push(y,S,L),I+=3),(t>0||A!==r-1)&&(c.push(S,P,L),I+=3)}h.addGroup(g,I,0),g+=I}function _(b){let C=p,I=new Ae,M=new V,w=0,A=b===!0?e:t,y=b===!0?1:-1;for(let P=1;P<=s;P++)u.push(0,m*y,0),f.push(0,y,0),d.push(.5,.5),p++;let S=p;for(let P=0;P<=s;P++){let T=P/s*l+a,N=Math.cos(T),U=Math.sin(T);M.x=A*U,M.y=m*y,M.z=A*N,u.push(M.x,M.y,M.z),f.push(0,y,0),I.x=N*.5+.5,I.y=U*.5*y+.5,d.push(I.x,I.y),p++}for(let P=0;P<s;P++){let L=C+P,T=S+P;b===!0?c.push(T,T+1,L):c.push(T+1,T,L),w+=3}h.addGroup(g,w,b===!0?1:2),g+=w}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},jt=class i extends Et{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},hr=class i extends Ft{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),h(n),c(),this.setAttribute("position",new dt(r,3)),this.setAttribute("normal",new dt(r.slice(),3)),this.setAttribute("uv",new dt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(x){let _=new V,b=new V,C=new V;for(let I=0;I<t.length;I+=3)d(t[I+0],_),d(t[I+1],b),d(t[I+2],C),l(_,b,C,x)}function l(x,_,b,C){let I=C+1,M=[];for(let w=0;w<=I;w++){M[w]=[];let A=x.clone().lerp(b,w/I),y=_.clone().lerp(b,w/I),S=I-w;for(let P=0;P<=S;P++)P===0&&w===I?M[w][P]=A:M[w][P]=A.clone().lerp(y,P/S)}for(let w=0;w<I;w++)for(let A=0;A<2*(I-w)-1;A++){let y=Math.floor(A/2);A%2===0?(f(M[w][y+1]),f(M[w+1][y]),f(M[w][y])):(f(M[w][y+1]),f(M[w+1][y+1]),f(M[w+1][y]))}}function h(x){let _=new V;for(let b=0;b<r.length;b+=3)_.x=r[b+0],_.y=r[b+1],_.z=r[b+2],_.normalize().multiplyScalar(x),r[b+0]=_.x,r[b+1]=_.y,r[b+2]=_.z}function c(){let x=new V;for(let _=0;_<r.length;_+=3){x.x=r[_+0],x.y=r[_+1],x.z=r[_+2];let b=m(x)/2/Math.PI+.5,C=g(x)/Math.PI+.5;o.push(b,1-C)}p(),u()}function u(){for(let x=0;x<o.length;x+=6){let _=o[x+0],b=o[x+2],C=o[x+4],I=Math.max(_,b,C),M=Math.min(_,b,C);I>.9&&M<.1&&(_<.2&&(o[x+0]+=1),b<.2&&(o[x+2]+=1),C<.2&&(o[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function d(x,_){let b=x*3;_.x=e[b+0],_.y=e[b+1],_.z=e[b+2]}function p(){let x=new V,_=new V,b=new V,C=new V,I=new Ae,M=new Ae,w=new Ae;for(let A=0,y=0;A<r.length;A+=9,y+=6){x.set(r[A+0],r[A+1],r[A+2]),_.set(r[A+3],r[A+4],r[A+5]),b.set(r[A+6],r[A+7],r[A+8]),I.set(o[y+0],o[y+1]),M.set(o[y+2],o[y+3]),w.set(o[y+4],o[y+5]),C.copy(x).add(_).add(b).divideScalar(3);let S=m(C);v(I,y+0,x,S),v(M,y+2,_,S),v(w,y+4,b,S)}}function v(x,_,b,C){C<0&&x.x===1&&(o[_]=x.x-1),b.x===0&&b.z===0&&(o[_]=C/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function g(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},ur=class i extends hr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var kn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ge("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,h;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),h=n[s]-o,h<0)a=s+1;else if(h>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let c=n[s],f=n[s+1]-c,d=(o-c)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new Ae:new V);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new V,s=[],r=[],o=[],a=new V,l=new ft;for(let d=0;d<=e;d++){let p=d/e;s[d]=this.getTangentAt(p,new V)}r[0]=new V,o[0]=new V;let h=Number.MAX_VALUE,c=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);c<=h&&(h=c,n.set(1,0,0)),u<=h&&(h=u,n.set(0,1,0)),f<=h&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(et(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,p))}o[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(et(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},fr=class extends kn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Ae){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),h=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let c=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=h-this.aY;l=f*c-d*u+this.aX,h=f*u+d*c+this.aY}return n.set(l,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},nc=class extends fr{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function xu(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,h){s(o,a,h*(a-r),h*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,h,c,u){let f=(o-r)/h-(a-r)/(h+c)+(a-o)/c,d=(a-o)/c-(l-o)/(c+u)+(l-a)/u;f*=c,d*=c,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var Pd=new V,Id=new V,Ih=new xu,Lh=new xu,Dh=new xu,ic=class extends kn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new V){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let h,c;this.closed||a>0?h=s[(a-1)%r]:(Id.subVectors(s[0],s[1]).add(s[0]),h=Id);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?c=s[(a+2)%r]:(Pd.subVectors(s[r-1],s[r-2]).add(s[r-1]),c=Pd),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(h.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(c),d);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),Ih.initNonuniformCatmullRom(h.x,u.x,f.x,c.x,p,v,m),Lh.initNonuniformCatmullRom(h.y,u.y,f.y,c.y,p,v,m),Dh.initNonuniformCatmullRom(h.z,u.z,f.z,c.z,p,v,m)}else this.curveType==="catmullrom"&&(Ih.initCatmullRom(h.x,u.x,f.x,c.x,this.tension),Lh.initCatmullRom(h.y,u.y,f.y,c.y,this.tension),Dh.initCatmullRom(h.z,u.z,f.z,c.z,this.tension));return n.set(Ih.calc(l),Lh.calc(l),Dh.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new V().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ld(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function K0(i,e){let t=1-i;return t*t*e}function Q0(i,e){return 2*(1-i)*i*e}function eg(i,e){return i*i*e}function Gr(i,e,t,n){return K0(i,e)+Q0(i,t)+eg(i,n)}function tg(i,e){let t=1-i;return t*t*t*e}function ng(i,e){let t=1-i;return 3*t*t*i*e}function ig(i,e){return 3*(1-i)*i*i*e}function sg(i,e){return i*i*i*e}function Vr(i,e,t,n,s){return tg(i,e)+ng(i,t)+ig(i,n)+sg(i,s)}var oo=class extends kn{constructor(e=new Ae,t=new Ae,n=new Ae,s=new Ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Ae){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Vr(e,s.x,r.x,o.x,a.x),Vr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},sc=class extends kn{constructor(e=new V,t=new V,n=new V,s=new V){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new V){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Vr(e,s.x,r.x,o.x,a.x),Vr(e,s.y,r.y,o.y,a.y),Vr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ao=class extends kn{constructor(e=new Ae,t=new Ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ae){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},rc=class extends kn{constructor(e=new V,t=new V){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new V){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new V){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},co=class extends kn{constructor(e=new Ae,t=new Ae,n=new Ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Ae){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Gr(e,s.x,r.x,o.x),Gr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},oc=class extends kn{constructor(e=new V,t=new V,n=new V){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new V){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Gr(e,s.x,r.x,o.x),Gr(e,s.y,r.y,o.y),Gr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lo=class extends kn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ae){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],h=s[o],c=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Ld(a,l.x,h.x,c.x,u.x),Ld(a,l.y,h.y,c.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new Ae().fromArray(s))}return this}},Dd=Object.freeze({__proto__:null,ArcCurve:nc,CatmullRomCurve3:ic,CubicBezierCurve:oo,CubicBezierCurve3:sc,EllipseCurve:fr,LineCurve:ao,LineCurve3:rc,QuadraticBezierCurve:co,QuadraticBezierCurve3:oc,SplineCurve:lo}),ac=class extends kn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Dd[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),h=l===0?0:1-o/l;return a.getPointAt(h,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let h=0;h<l.length;h++){let c=l[h];n&&n.equals(c)||(t.push(c),n=c)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Dd[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},ho=class extends ac{constructor(e){super(),this.type="Path",this.currentPoint=new Ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ao(this.currentPoint.clone(),new Ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new co(this.currentPoint.clone(),new Ae(e,t),new Ae(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new oo(this.currentPoint.clone(),new Ae(e,t),new Ae(n,s),new Ae(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new lo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){let h=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+h,t+c,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){let h=new fr(e,t,n,s,r,o,a,l);if(this.curves.length>0){let u=h.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(h);let c=h.getPoint(1);return this.currentPoint.copy(c),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},dr=class extends ho{constructor(e){super(e),this.uuid=vr(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new ho().fromJSON(s))}return this}};function rg(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Rp(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,h;if(n&&(r=hg(i,e,r,t)),i.length>80*t){a=i[0],l=i[1];let c=a,u=l;for(let f=t;f<s;f+=t){let d=i[f],p=i[f+1];d<a&&(a=d),p<l&&(l=p),d>c&&(c=d),p>u&&(u=p)}h=Math.max(c-a,u-l),h=h!==0?32767/h:0}return uo(r,o,t,a,l,h,0),o}function Rp(i,e,t,n,s){let r;if(s===bg(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Nd(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Nd(o/n|0,i[o],i[o+1],r);return r&&pr(r,r.next)&&(po(r),r=r.next),r}function Ts(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(pr(t,t.next)||Dt(t.prev,t,t.next)===0)){if(po(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function uo(i,e,t,n,s,r,o){if(!i)return;!o&&r&&mg(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,h=i.next;if(r?ag(i,n,s,r):og(i)){e.push(l.i,i.i,h.i),po(i),i=h.next,a=h.next;continue}if(i=h,i===a){o?o===1?(i=cg(Ts(i),e),uo(i,e,t,n,s,r,2)):o===2&&lg(i,e,t,n,s,r):uo(Ts(i),e,t,n,s,r,1);break}}}function og(i){let e=i.prev,t=i,n=i.next;if(Dt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,h=n.y,c=Math.min(s,r,o),u=Math.min(a,l,h),f=Math.max(s,r,o),d=Math.max(a,l,h),p=n.next;for(;p!==e;){if(p.x>=c&&p.x<=f&&p.y>=u&&p.y<=d&&Br(s,a,r,l,o,h,p.x,p.y)&&Dt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function ag(i,e,t,n){let s=i.prev,r=i,o=i.next;if(Dt(s,r,o)>=0)return!1;let a=s.x,l=r.x,h=o.x,c=s.y,u=r.y,f=o.y,d=Math.min(a,l,h),p=Math.min(c,u,f),v=Math.max(a,l,h),m=Math.max(c,u,f),g=Bh(d,p,e,t,n),x=Bh(v,m,e,t,n),_=i.prevZ,b=i.nextZ;for(;_&&_.z>=g&&b&&b.z<=x;){if(_.x>=d&&_.x<=v&&_.y>=p&&_.y<=m&&_!==s&&_!==o&&Br(a,c,l,u,h,f,_.x,_.y)&&Dt(_.prev,_,_.next)>=0||(_=_.prevZ,b.x>=d&&b.x<=v&&b.y>=p&&b.y<=m&&b!==s&&b!==o&&Br(a,c,l,u,h,f,b.x,b.y)&&Dt(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;_&&_.z>=g;){if(_.x>=d&&_.x<=v&&_.y>=p&&_.y<=m&&_!==s&&_!==o&&Br(a,c,l,u,h,f,_.x,_.y)&&Dt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;b&&b.z<=x;){if(b.x>=d&&b.x<=v&&b.y>=p&&b.y<=m&&b!==s&&b!==o&&Br(a,c,l,u,h,f,b.x,b.y)&&Dt(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function cg(i,e){let t=i;do{let n=t.prev,s=t.next.next;!pr(n,s)&&Pp(n,t,t.next,s)&&fo(n,s)&&fo(s,n)&&(e.push(n.i,t.i,s.i),po(t),po(t.next),t=i=s),t=t.next}while(t!==i);return Ts(t)}function lg(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&_g(o,a)){let l=Ip(o,a);o=Ts(o,o.next),l=Ts(l,l.next),uo(o,e,t,n,s,r,0),uo(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function hg(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,h=Rp(i,a,l,n,!1);h===h.next&&(h.steiner=!0),s.push(xg(h))}s.sort(ug);for(let r=0;r<s.length;r++)t=fg(s[r],t);return t}function ug(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function fg(i,e){let t=dg(i,e);if(!t)return e;let n=Ip(t,i);return Ts(n,n.next),Ts(t,t.next)}function dg(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(pr(i,t))return t;do{if(pr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,h=o.y,c=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Cp(s<h?n:r,s,l,h,s<h?r:n,s,t.x,t.y)){let u=Math.abs(s-t.y)/(n-t.x);fo(t,i)&&(u<c||u===c&&(t.x>o.x||t.x===o.x&&pg(o,t)))&&(o=t,c=u)}t=t.next}while(t!==a);return o}function pg(i,e){return Dt(i.prev,i,e.prev)<0&&Dt(e.next,i,i.next)<0}function mg(i,e,t,n){let s=i;do s.z===0&&(s.z=Bh(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,gg(s)}function gg(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let h=0;h<t&&(a++,o=o.nextZ,!!o);h++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Bh(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function xg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Cp(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Br(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&Cp(i,e,t,n,s,r,o,a)}function _g(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!yg(i,e)&&(fo(i,e)&&fo(e,i)&&vg(i,e)&&(Dt(i.prev,i,e.prev)||Dt(i,e.prev,e))||pr(i,e)&&Dt(i.prev,i,i.next)>0&&Dt(e.prev,e,e.next)>0)}function Dt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function pr(i,e){return i.x===e.x&&i.y===e.y}function Pp(i,e,t,n){let s=Ua(Dt(i,e,t)),r=Ua(Dt(i,e,n)),o=Ua(Dt(t,n,i)),a=Ua(Dt(t,n,e));return!!(s!==r&&o!==a||s===0&&Na(i,t,e)||r===0&&Na(i,n,e)||o===0&&Na(t,i,n)||a===0&&Na(t,e,n))}function Na(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ua(i){return i>0?1:i<0?-1:0}function yg(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Pp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function fo(i,e){return Dt(i.prev,i,i.next)<0?Dt(i,e,i.next)>=0&&Dt(i,i.prev,e)>=0:Dt(i,e,i.prev)<0||Dt(i,i.next,e)<0}function vg(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ip(i,e){let t=Hh(i.i,i.x,i.y),n=Hh(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Nd(i,e,t,n){let s=Hh(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function po(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Hh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function bg(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Gh=class{static triangulate(e,t,n=2){return rg(e,t,n)}},er=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Ud(e),Od(n,e);let o=e.length;t.forEach(Ud);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,Od(n,t[l]);let a=Gh.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Ud(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Od(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Nt=class i extends hr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var mo=class i extends hr{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},ss=class i extends Ft{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),h=a+1,c=l+1,u=e/a,f=t/l,d=[],p=[],v=[],m=[];for(let g=0;g<c;g++){let x=g*f-o;for(let _=0;_<h;_++){let b=_*u-r;p.push(b,-x,0),v.push(0,0,1),m.push(_/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let x=0;x<a;x++){let _=x+h*g,b=x+h*(g+1),C=x+1+h*(g+1),I=x+1+h*g;d.push(_,b,I),d.push(b,C,I)}this.setIndex(d),this.setAttribute("position",new dt(p,3)),this.setAttribute("normal",new dt(v,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},zn=class i extends Ft{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],l=[],h=[],c=[],u=e,f=(t-e)/s,d=new V,p=new Ae;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){let g=r+m/n*o;d.x=u*Math.cos(g),d.y=u*Math.sin(g),l.push(d.x,d.y,d.z),h.push(0,0,1),p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,c.push(p.x,p.y)}u+=f}for(let v=0;v<s;v++){let m=v*(n+1);for(let g=0;g<n;g++){let x=g+m,_=x,b=x+n+1,C=x+n+2,I=x+1;a.push(_,b,I),a.push(b,C,I)}}this.setIndex(a),this.setAttribute("position",new dt(l,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},go=class i extends Ft{constructor(e=new dr([new Ae(0,.5),new Ae(-.5,-.5),new Ae(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)h(e);else for(let c=0;c<e.length;c++)h(e[c]),this.addGroup(a,l,c),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new dt(s,3)),this.setAttribute("normal",new dt(r,3)),this.setAttribute("uv",new dt(o,2));function h(c){let u=s.length/3,f=c.extractPoints(t),d=f.shape,p=f.holes;er.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,g=p.length;m<g;m++){let x=p[m];er.isClockWise(x)===!0&&(p[m]=x.reverse())}let v=er.triangulateShape(d,p);for(let m=0,g=p.length;m<g;m++){let x=p[m];d=d.concat(x)}for(let m=0,g=d.length;m<g;m++){let x=d[m];s.push(x.x,x.y,0),r.push(0,0,1),o.push(x.x,x.y)}for(let m=0,g=v.length;m<g;m++){let x=v[m],_=x[0]+u,b=x[1]+u,C=x[2]+u;n.push(_,b,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Mg(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let o=t[e.shapes[s]];n.push(o)}return new i(n,e.curveSegments)}};function Mg(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}function Ps(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Fd(s))s.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Fd(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function dn(i){let e={};for(let t=0;t<i.length;t++){let n=Ps(i[t]);for(let s in n)e[s]=n[s]}return e}function Fd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Sg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function _u(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}var Lp={clone:Ps,merge:dn},Tg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Eg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Kn=class extends Fi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tg,this.fragmentShader=Eg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ps(e.uniforms),this.uniformsGroups=Sg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Xe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ae().fromArray(s.value);break;case"v3":this.uniforms[n].value=new V().fromArray(s.value);break;case"v4":this.uniforms[n].value=new It().fromArray(s.value);break;case"m3":this.uniforms[n].value=new qe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ft().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},cc=class extends Kn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ui=class extends Fi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fl,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=Ec,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},lc=class extends Fi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},hc=class extends Fi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Zs(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Oa(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var rs=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},uc=class extends rs{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Oh,endingEnd:Oh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Fh:r=e,a=2*t-n;break;case kh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Fh:o=e,l=2*n-t;break;case kh:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let h=(n-t)*.5,c=this.valueSize;this._weightPrev=h/(t-a),this._weightNext=h/(l-n),this._offsetPrev=r*c,this._offsetNext=o*c}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,h=l-a,c=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-t)/(s-t),v=p*p,m=v*p,g=-f*m+2*f*v-f*p,x=(1+f)*m+(-1.5-2*f)*v+(-.5+f)*p+1,_=(-1-d)*m+(1.5+d)*v+.5*p,b=d*m-d*v;for(let C=0;C!==a;++C)r[C]=g*o[c+C]+x*o[h+C]+_*o[l+C]+b*o[u+C];return r}},fc=class extends rs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,h=l-a,c=(n-t)/(s-t),u=1-c;for(let f=0;f!==a;++f)r[f]=o[h+f]*u+o[l+f]*c;return r}},dc=class extends rs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},pc=class extends rs{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,h=l-a,c=this.inTangents,u=this.outTangents;if(!c||!u){let p=(n-t)/(s-t),v=1-p;for(let m=0;m!==a;++m)r[m]=o[h+m]*v+o[l+m]*p;return r}let f=a*2,d=e-1;for(let p=0;p!==a;++p){let v=o[h+p],m=o[l+p],g=d*f+p*2,x=u[g],_=u[g+1],b=e*f+p*2,C=c[b],I=c[b+1],M=wg(n,t,x,C,s);r[p]=Dp(M,v,_,I,m)}return r}};function Dp(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Ag(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function wg(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=Dp(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let l=Ag(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var Bn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Zs(t,this.TimeBufferType),this.values=Zs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Zs(e.times,Array),values:Zs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Oa(e.settings)&&(n.settings={inTangents:Zs(e.settings.inTangents,Array),outTangents:Zs(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new dc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new fc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new uc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new pc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Wr:t=this.InterpolantFactoryMethodDiscrete;break;case Ja:t=this.InterpolantFactoryMethodLinear;break;case za:t=this.InterpolantFactoryMethodSmooth;break;case Uh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ge("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Wr;case this.InterpolantFactoryMethodLinear:return Ja;case this.InterpolantFactoryMethodSmooth:return za;case this.InterpolantFactoryMethodBezier:return Uh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;Oa(this.settings)&&(kd(this.settings.inTangents,e),kd(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Oa(this.settings)&&(zd(this.settings.inTangents,e),zd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(We("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(We("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){We("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){We("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&C0(s))for(let a=0,l=s.length;a!==l;++a){let h=s[a];if(isNaN(h)){We("KeyframeTrack: Value is not a valid number.",this,a,h),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===za,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,h=e[a],c=e[a+1];if(h!==c&&(a!==1||h!==e[0]))if(s)l=!0;else{let u=a*n,f=u-n,d=u+n;for(let p=0;p!==n;++p){let v=t[u+p];if(v!==t[f+p]||v!==t[d+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,h=0;h!==n;++h)t[l+h]=t[a+h];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Oa(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function kd(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function zd(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Bn.prototype.ValueTypeName="";Bn.prototype.TimeBufferType=Float32Array;Bn.prototype.ValueBufferType=Float32Array;Bn.prototype.DefaultInterpolation=Ja;var os=class extends Bn{constructor(e,t,n){super(e,t,n)}};os.prototype.ValueTypeName="bool";os.prototype.ValueBufferType=Array;os.prototype.DefaultInterpolation=Wr;os.prototype.InterpolantFactoryMethodLinear=void 0;os.prototype.InterpolantFactoryMethodSmooth=void 0;var mc=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}};mc.prototype.ValueTypeName="color";var gc=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}};gc.prototype.ValueTypeName="number";var xc=class extends rs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),h=e*a;for(let c=h+a;h!==c;h+=4)bi.slerpFlat(r,0,o,h-a,o,h,l);return r}},xo=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new xc(this.times,this.values,this.getValueSize(),e)}};xo.prototype.ValueTypeName="quaternion";xo.prototype.InterpolantFactoryMethodSmooth=void 0;var as=class extends Bn{constructor(e,t,n){super(e,t,n)}};as.prototype.ValueTypeName="string";as.prototype.ValueBufferType=Array;as.prototype.DefaultInterpolation=Wr;as.prototype.InterpolantFactoryMethodLinear=void 0;as.prototype.InterpolantFactoryMethodSmooth=void 0;var _c=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}};_c.prototype.ValueTypeName="vector";var yc=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,h=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(c){a++,r===!1&&s.onStart!==void 0&&s.onStart(c,o,a),r=!0},this.itemEnd=function(c){o++,s.onProgress!==void 0&&s.onProgress(c,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(c){s.onError!==void 0&&s.onError(c)},this.resolveURL=function(c){return c=c.normalize("NFC"),l?l(c):c},this.setURLModifier=function(c){return l=c,this},this.addHandler=function(c,u){return h.push(c,u),this},this.removeHandler=function(c){let u=h.indexOf(c);return u!==-1&&h.splice(u,2),this},this.getHandler=function(c){for(let u=0,f=h.length;u<f;u+=2){let d=h[u],p=h[u+1];if(d.global&&(d.lastIndex=0),d.test(c))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Np=new yc,vc=class{constructor(e){this.manager=e!==void 0?e:Np,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};vc.DEFAULT_MATERIAL_NAME="__DEFAULT";var _o=class extends Ht{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},yo=class extends _o{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Nh=new ft,Bd=new V,Hd=new V,bc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.mapType=Pn,this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new is,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Bd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bd),Hd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Hd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Nh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Nh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,h=s?s.y/r.y:0;e.coordinateSystem===ir||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+h,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+h,0,0,.5,.5,0,0,0,1),t.multiply(Nh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Fa=new V,ka=new bi,_i=new V,vo=class extends Ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=$n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Fa,ka,_i),_i.x===1&&_i.y===1&&_i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fa,ka,_i.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Fa,ka,_i),_i.x===1&&_i.y===1&&_i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fa,ka,_i.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ts=new V,Gd=new Ae,Vd=new Ae,bn=class extends vo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Za*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(hh*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Za*2*Math.atan(Math.tan(hh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ts.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ts.x,ts.y).multiplyScalar(-e/ts.z),ts.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ts.x,ts.y).multiplyScalar(-e/ts.z)}getViewSize(e,t){return this.getViewBounds(e,Gd,Vd),t.subVectors(Vd,Gd)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(hh*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,h=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/h,s*=o.width/l,n*=o.height/h}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var bo=class extends vo{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,o=r+h*this.view.width,a-=c*this.view.offsetY,l=a-c*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vh=class extends bc{constructor(){super(new bo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Mo=class extends _o{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.shadow=new Vh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var $s=-90,Ks=1,mr=class extends Ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new bn($s,Ks,e,t);s.layers=this.layers,this.add(s);let r=new bn($s,Ks,e,t);r.layers=this.layers,this.add(r);let o=new bn($s,Ks,e,t);o.layers=this.layers,this.add(o);let a=new bn($s,Ks,e,t);a.layers=this.layers,this.add(a);let l=new bn($s,Ks,e,t);l.layers=this.layers,this.add(l);let h=new bn($s,Ks,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let h of t)this.remove(h);if(e===$n)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,h,c]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),n.texture.mipmapsAutoUpdate=v,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(u,f,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Mc=class extends bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var yu="\\[\\]\\.:\\/",Rg=new RegExp("["+yu+"]","g"),vu="[^"+yu+"]",Cg="[^"+yu.replace("\\.","")+"]",Pg=/((?:WC+[\/:])*)/.source.replace("WC",vu),Ig=/(WCOD+)?/.source.replace("WCOD",Cg),Lg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vu),Dg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vu),Ng=new RegExp("^"+Pg+Ig+Lg+Dg+"$"),Ug=["material","materials","bones","map"],Wh=class{constructor(e,t,n){let s=n||Rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Rt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Rg,"")}static parseTrackName(e){let t=Ng.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ug.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ge("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let h=t.objectIndex;switch(n){case"materials":if(!e.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){We("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){We("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let c=0;c<e.length;c++)if(e[c].name===h){h=c;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){We("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){We("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(h!==void 0){if(e[h]===void 0){We("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}let o=e[s];if(o===void 0){let h=t.nodeName;We("PropertyBinding: Trying to update property for track: "+h+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Rt.Composite=Wh;Rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Rt.prototype.GetterByBindingType=[Rt.prototype._getValue_direct,Rt.prototype._getValue_array,Rt.prototype._getValue_arrayElement,Rt.prototype._getValue_toArray];Rt.prototype.SetterByBindingTypeAndVersioning=[[Rt.prototype._setValue_direct,Rt.prototype._setValue_direct_setNeedsUpdate,Rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_array,Rt.prototype._setValue_array_setNeedsUpdate,Rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_arrayElement,Rt.prototype._setValue_arrayElement_setNeedsUpdate,Rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_fromArray,Rt.prototype._setValue_fromArray_setNeedsUpdate,Rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var _M=new Float32Array(1);var Au=class Au{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Au.prototype.isMatrix2=!0;var Xh=Au;function bu(i,e,t,n){let s=Og(n);switch(t){case lu:return i*e;case Lc:return i*e/s.components*s.byteLength;case Dc:return i*e/s.components*s.byteLength;case ls:return i*e*2/s.components*s.byteLength;case Nc:return i*e*2/s.components*s.byteLength;case hu:return i*e*3/s.components*s.byteLength;case pi:return i*e*4/s.components*s.byteLength;case Uc:return i*e*4/s.components*s.byteLength;case Eo:case Ao:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case wo:case Ro:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Fc:case zc:return Math.max(i,16)*Math.max(e,8)/4;case Oc:case kc:return Math.max(i,8)*Math.max(e,8)/2;case Bc:case Hc:case Vc:case Wc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Gc:case Co:case Xc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Yc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case jc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Jc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Zc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case $c:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Kc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Qc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case el:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case tl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case nl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case il:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case sl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case rl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ol:case al:case cl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ll:case hl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Po:case ul:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Og(i){switch(i){case Pn:case ru:return{byteLength:1,components:1};case yr:case ou:case di:return{byteLength:2,components:1};case Pc:case Ic:return{byteLength:2,components:4};case fi:case Cc:case Qn:return{byteLength:4,components:1};case au:case cu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function nm(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Wg(i){let e=new WeakMap;function t(a,l){let h=a.array,c=a.usage,u=h.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,h,c),a.onUploadCallback();let d;if(h instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)d=i.HALF_FLOAT;else if(h instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)d=i.SHORT;else if(h instanceof Uint32Array)d=i.UNSIGNED_INT;else if(h instanceof Int32Array)d=i.INT;else if(h instanceof Int8Array)d=i.BYTE;else if(h instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:f,type:d,bytesPerElement:h.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,h){let c=l.array,u=l.updateRanges;if(i.bindBuffer(h,a),u.length===0)i.bufferSubData(h,0,c);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){let p=u[f],v=u[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){let v=u[d];i.bufferSubData(h,v.start*c.BYTES_PER_ELEMENT,c,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let c=e.get(a);(!c||c.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let h=e.get(a);if(h===void 0)e.set(a,t(a,l));else if(h.version<a.version){if(h.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,a,l),h.version=a.version}}return{get:s,remove:r,update:o}}var Xg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Yg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$g=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Kg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,ex=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ix=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,sx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,rx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ox=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ax=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ux=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,fx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,dx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,px=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,mx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,gx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_x=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vx="gl_FragColor = linearToOutputTexel( gl_FragColor );",bx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Mx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Sx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Tx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ex=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ax=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Px=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ix=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Lx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ux=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ox=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Fx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Gx=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Vx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Xx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qx=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Yx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$x=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,e_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,t_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,n_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,i_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,s_=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,r_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,o_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,a_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,c_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,l_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,h_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,u_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,f_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,d_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,p_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,m_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,g_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,x_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,__=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,y_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,v_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,b_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,M_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,S_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,T_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,E_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,A_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,w_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,R_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,C_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,P_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,I_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,L_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,D_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,N_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,U_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,O_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,F_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,k_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,z_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,B_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,H_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,G_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,V_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,W_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,X_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Y_=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,j_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,J_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,K_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Q_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,ey=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ty=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ny=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ry=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ay=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ly=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,uy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,fy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,py=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,my=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_y=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,yy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,by=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,My=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$e={alphahash_fragment:Xg,alphahash_pars_fragment:qg,alphamap_fragment:Yg,alphamap_pars_fragment:jg,alphatest_fragment:Jg,alphatest_pars_fragment:Zg,aomap_fragment:$g,aomap_pars_fragment:Kg,batching_pars_vertex:Qg,batching_vertex:ex,begin_vertex:tx,beginnormal_vertex:nx,bsdfs:ix,iridescence_fragment:sx,bumpmap_pars_fragment:rx,clipping_planes_fragment:ox,clipping_planes_pars_fragment:ax,clipping_planes_pars_vertex:cx,clipping_planes_vertex:lx,color_fragment:hx,color_pars_fragment:ux,color_pars_vertex:fx,color_vertex:dx,common:px,defaultnormal_vertex:mx,displacementmap_pars_vertex:gx,displacementmap_vertex:xx,emissivemap_fragment:_x,emissivemap_pars_fragment:yx,colorspace_fragment:vx,colorspace_pars_fragment:bx,envmap_fragment:Mx,envmap_common_pars_fragment:Sx,envmap_pars_fragment:Tx,envmap_pars_vertex:Ex,envmap_physical_pars_fragment:Ox,envmap_vertex:Ax,fog_vertex:wx,fog_pars_vertex:Rx,fog_fragment:Cx,fog_pars_fragment:Px,gradientmap_pars_fragment:Ix,lightmap_pars_fragment:Lx,lights_lambert_fragment:Dx,lights_lambert_pars_fragment:Nx,lights_pars_begin:Ux,lights_toon_fragment:Fx,lights_toon_pars_fragment:kx,lights_phong_fragment:zx,lights_phong_pars_fragment:Bx,lights_physical_fragment:Hx,lights_physical_pars_fragment:Gx,lights_fragment_begin:Vx,lights_fragment_maps:Wx,lights_fragment_end:Xx,lightprobes_pars_fragment:qx,logdepthbuf_fragment:Yx,logdepthbuf_pars_fragment:jx,logdepthbuf_pars_vertex:Jx,logdepthbuf_vertex:Zx,map_fragment:$x,map_pars_fragment:Kx,map_particle_fragment:Qx,map_particle_pars_fragment:e_,metalnessmap_fragment:t_,metalnessmap_pars_fragment:n_,morphinstance_vertex:i_,morphcolor_vertex:s_,morphnormal_vertex:r_,morphtarget_pars_vertex:o_,morphtarget_vertex:a_,normal_fragment_begin:c_,normal_fragment_maps:l_,normal_pars_fragment:h_,normal_pars_vertex:u_,normal_vertex:f_,normalmap_pars_fragment:d_,clearcoat_normal_fragment_begin:p_,clearcoat_normal_fragment_maps:m_,clearcoat_pars_fragment:g_,iridescence_pars_fragment:x_,opaque_fragment:__,packing:y_,premultiplied_alpha_fragment:v_,project_vertex:b_,dithering_fragment:M_,dithering_pars_fragment:S_,roughnessmap_fragment:T_,roughnessmap_pars_fragment:E_,shadowmap_pars_fragment:A_,shadowmap_pars_vertex:w_,shadowmap_vertex:R_,shadowmask_pars_fragment:C_,skinbase_vertex:P_,skinning_pars_vertex:I_,skinning_vertex:L_,skinnormal_vertex:D_,specularmap_fragment:N_,specularmap_pars_fragment:U_,tonemapping_fragment:O_,tonemapping_pars_fragment:F_,transmission_fragment:k_,transmission_pars_fragment:z_,uv_pars_fragment:B_,uv_pars_vertex:H_,uv_vertex:G_,worldpos_vertex:V_,background_vert:W_,background_frag:X_,backgroundCube_vert:q_,backgroundCube_frag:Y_,cube_vert:j_,cube_frag:J_,depth_vert:Z_,depth_frag:$_,distance_vert:K_,distance_frag:Q_,equirect_vert:ey,equirect_frag:ty,linedashed_vert:ny,linedashed_frag:iy,meshbasic_vert:sy,meshbasic_frag:ry,meshlambert_vert:oy,meshlambert_frag:ay,meshmatcap_vert:cy,meshmatcap_frag:ly,meshnormal_vert:hy,meshnormal_frag:uy,meshphong_vert:fy,meshphong_frag:dy,meshphysical_vert:py,meshphysical_frag:my,meshtoon_vert:gy,meshtoon_frag:xy,points_vert:_y,points_frag:yy,shadow_vert:vy,shadow_frag:by,sprite_vert:My,sprite_frag:Sy},Se={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},Ei={basic:{uniforms:dn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:dn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:dn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:dn([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:dn([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Xe(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:dn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:dn([Se.points,Se.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:dn([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:dn([Se.common,Se.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:dn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:dn([Se.sprite,Se.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distance:{uniforms:dn([Se.common,Se.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distance_vert,fragmentShader:$e.distance_frag},shadow:{uniforms:dn([Se.lights,Se.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};Ei.physical={uniforms:dn([Ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new qe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new Ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};var dl={r:0,b:0,g:0},Ty=new ft,im=new qe;im.set(-1,0,0,0,1,0,0,0,1);function Ey(i,e,t,n,s,r){let o=new Xe(0),a=s===!0?0:1,l,h,c=null,u=0,f=null;function d(x){let _=x.isScene===!0?x.background:null;if(_&&_.isTexture){let b=x.backgroundBlurriness>0;_=e.get(_,b)}return _}function p(x){let _=!1,b=d(x);b===null?m(o,a):b&&b.isColor&&(m(b,1),_=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||_)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(x,_){let b=d(_);b&&b.isCubeTexture?(h===void 0&&(h=new Be(new Fe(1,1,1),new Kn({name:"BackgroundCubeMaterial",uniforms:Ps(Ei.backgroundCube.uniforms),vertexShader:Ei.backgroundCube.vertexShader,fragmentShader:Ei.backgroundCube.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,I,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=b,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ty.makeRotationFromEuler(_.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(im),h.material.toneMapped=rt.getTransfer(b.colorSpace)!==xt,(c!==b||u!==b.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,c=b,u=b.version,f=i.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Be(new ss(2,2),new Kn({name:"BackgroundMaterial",uniforms:Ps(Ei.background.uniforms),vertexShader:Ei.background.vertexShader,fragmentShader:Ei.background.fragmentShader,side:cs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=rt.getTransfer(b.colorSpace)!==xt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(c!==b||u!==b.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,c=b,u=b.version,f=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,_){x.getRGB(dl,_u(i)),t.buffers.color.setClear(dl.r,dl.g,dl.b,_,r)}function g(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,_=1){o.set(x),a=_,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,m(o,a)},render:p,addToRenderList:v,dispose:g}}function Ay(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(S,P,L,T,N){let U=!1,F=u(S,T,L,P);r!==F&&(r=F,h(r.object)),U=d(S,T,L,N),U&&p(S,T,L,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(U||o)&&(o=!1,b(S,P,L,T),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return i.createVertexArray()}function h(S){return i.bindVertexArray(S)}function c(S){return i.deleteVertexArray(S)}function u(S,P,L,T){let N=T.wireframe===!0,U=n[P.id];U===void 0&&(U={},n[P.id]=U);let F=S.isInstancedMesh===!0?S.id:0,J=U[F];J===void 0&&(J={},U[F]=J);let B=J[L.id];B===void 0&&(B={},J[L.id]=B);let k=B[N];return k===void 0&&(k=f(l()),B[N]=k),k}function f(S){let P=[],L=[],T=[];for(let N=0;N<t;N++)P[N]=0,L[N]=0,T[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:L,attributeDivisors:T,object:S,attributes:{},index:null}}function d(S,P,L,T){let N=r.attributes,U=P.attributes,F=0,J=L.getAttributes();for(let B in J)if(J[B].location>=0){let G=N[B],ue=U[B];if(ue===void 0&&(B==="instanceMatrix"&&S.instanceMatrix&&(ue=S.instanceMatrix),B==="instanceColor"&&S.instanceColor&&(ue=S.instanceColor)),G===void 0||G.attribute!==ue||ue&&G.data!==ue.data)return!0;F++}return r.attributesNum!==F||r.index!==T}function p(S,P,L,T){let N={},U=P.attributes,F=0,J=L.getAttributes();for(let B in J)if(J[B].location>=0){let G=U[B];G===void 0&&(B==="instanceMatrix"&&S.instanceMatrix&&(G=S.instanceMatrix),B==="instanceColor"&&S.instanceColor&&(G=S.instanceColor));let ue={};ue.attribute=G,G&&G.data&&(ue.data=G.data),N[B]=ue,F++}r.attributes=N,r.attributesNum=F,r.index=T}function v(){let S=r.newAttributes;for(let P=0,L=S.length;P<L;P++)S[P]=0}function m(S){g(S,0)}function g(S,P){let L=r.newAttributes,T=r.enabledAttributes,N=r.attributeDivisors;L[S]=1,T[S]===0&&(i.enableVertexAttribArray(S),T[S]=1),N[S]!==P&&(i.vertexAttribDivisor(S,P),N[S]=P)}function x(){let S=r.newAttributes,P=r.enabledAttributes;for(let L=0,T=P.length;L<T;L++)P[L]!==S[L]&&(i.disableVertexAttribArray(L),P[L]=0)}function _(S,P,L,T,N,U,F){F===!0?i.vertexAttribIPointer(S,P,L,N,U):i.vertexAttribPointer(S,P,L,T,N,U)}function b(S,P,L,T){v();let N=T.attributes,U=L.getAttributes(),F=P.defaultAttributeValues;for(let J in U){let B=U[J];if(B.location>=0){let k=N[J];if(k===void 0&&(J==="instanceMatrix"&&S.instanceMatrix&&(k=S.instanceMatrix),J==="instanceColor"&&S.instanceColor&&(k=S.instanceColor)),k!==void 0){let G=k.normalized,ue=k.itemSize,he=e.get(k);if(he===void 0)continue;let Y=he.buffer,ne=he.type,ve=he.bytesPerElement,pe=ne===i.INT||ne===i.UNSIGNED_INT||k.gpuType===Cc;if(k.isInterleavedBufferAttribute){let ce=k.data,Oe=ce.isInterleavedBuffer===!0?ce.stride:ce.itemSize,at=k.offset;if(ce.isInstancedInterleavedBuffer||ce.isInstancedBufferAttribute){for(let Ne=0;Ne<B.locationSize;Ne++)g(B.location+Ne,ce.meshPerAttribute);S.isInstancedMesh!==!0&&T._maxInstanceCount===void 0&&(T._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Ne=0;Ne<B.locationSize;Ne++)m(B.location+Ne);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let Ne=0;Ne<B.locationSize;Ne++)_(B.location+Ne,ue/B.locationSize,ne,G,Oe*ve,(at+ue/B.locationSize*Ne)*ve,pe)}else{if(k.isInstancedBufferAttribute){for(let ce=0;ce<B.locationSize;ce++)g(B.location+ce,k.meshPerAttribute);S.isInstancedMesh!==!0&&T._maxInstanceCount===void 0&&(T._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let ce=0;ce<B.locationSize;ce++)m(B.location+ce);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let ce=0;ce<B.locationSize;ce++)_(B.location+ce,ue/B.locationSize,ne,G,ue*ve,ue/B.locationSize*ce*ve,pe)}}else if(F!==void 0){let G=F[J];if(G!==void 0)switch(G.length){case 2:i.vertexAttrib2fv(B.location,G);break;case 3:i.vertexAttrib3fv(B.location,G);break;case 4:i.vertexAttrib4fv(B.location,G);break;default:i.vertexAttrib1fv(B.location,G)}}}}x()}function C(){A();for(let S in n){let P=n[S];for(let L in P){let T=P[L];for(let N in T){let U=T[N];for(let F in U)c(U[F].object),delete U[F];delete T[N]}}delete n[S]}}function I(S){if(n[S.id]===void 0)return;let P=n[S.id];for(let L in P){let T=P[L];for(let N in T){let U=T[N];for(let F in U)c(U[F].object),delete U[F];delete T[N]}}delete n[S.id]}function M(S){for(let P in n){let L=n[P];for(let T in L){let N=L[T];if(N[S.id]===void 0)continue;let U=N[S.id];for(let F in U)c(U[F].object),delete U[F];delete N[S.id]}}}function w(S){for(let P in n){let L=n[P],T=S.isInstancedMesh===!0?S.id:0,N=L[T];if(N!==void 0){for(let U in N){let F=N[U];for(let J in F)c(F[J].object),delete F[J];delete N[U]}delete L[T],Object.keys(L).length===0&&delete n[P]}}}function A(){y(),o=!0,r!==s&&(r=s,h(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:I,releaseStatesOfObject:w,releaseStatesOfProgram:M,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function wy(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,c){c!==0&&(i.drawArraysInstanced(n,l,h,c),t.update(h,n,c))}function a(l,h,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,c);let f=0;for(let d=0;d<c;d++)f+=h[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Ry(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let M=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(M){return!(M!==pi&&n.convert(M)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(M){let w=M===di&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(M!==Pn&&M!==Qn&&!w&&n.convert(M)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(M){if(M==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp",c=l(h);c!==h&&(Ge("WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);let u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&Ge("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=i.getParameter(i.MAX_SAMPLES),I=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:h,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:x,maxVaryings:_,maxFragmentUniforms:b,maxSamples:C,samples:I}}function Cy(i){let e=this,t=null,n=0,s=!1,r=!1,o=new li,a=new qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=c(u,f,0)},this.setState=function(u,f,d){let p=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,g=i.get(u);if(!s||p===null||p.length===0||r&&!m)r?c(null):h();else{let x=r?0:n,_=x*4,b=g.clippingState||null;l.value=b,b=c(p,f,_,d);for(let C=0;C!==_;++C)b[C]=t[C];g.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function h(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function c(u,f,d,p){let v=u!==null?u.length:0,m=null;if(v!==0){if(m=l.value,p!==!0||m===null){let g=d+v*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<g)&&(m=new Float32Array(g));for(let _=0,b=d;_!==v;++_,b+=4)o.copy(u[_]).applyMatrix4(x,a),o.normal.toArray(m,b),m[b+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}var Do=class extends Fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new io(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Fe(5,5,5),r=new Kn({name:"CubemapFromEquirect",uniforms:Ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Tn,blending:Es});r.uniforms.tEquirect.value=t;let o=new Be(s,r),a=t.minFilter;return t.minFilter===zi&&(t.minFilter=Sn),new mr(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Up=256,Py=3,Iy=20,sm=256,rm=16,Ly=3,Dy=new V,Ny=new Xe,ml=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new mr(1,10,null),this._boxMesh=new Be(new Fe(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=Dy}=r,l=this._renderer;this._setSize(o);let h=this._allocateTarget(),c=this._getSourceTarget(!0);t>0&&(c.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,f=l.autoClearColor,d=l.autoClearDepth,p=l.autoClearStencil,v=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,v===null&&(e.background=l.getClearColor(Ny));let m=new mr(n,s,c);return m.position.copy(a),m.update(l,e),l.autoClear=u,l.autoClearColor=f,l.autoClearDepth=d,l.autoClearStencil=p,e.background=v,t>0&&(c.texture.mipmapsAutoUpdate=!0,this._blur(h,t)),this._applyPMREM(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Up,Ap(e))}_fromTexture(e,t){e.mapping===Rs||e.mapping===_r?this._setSize(e.image.length===0?Up:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Op(e,!1,!1),n=Math.log2(e)-Py;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Op(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Rs||e.mapping===_r?(this._cubemapMaterial===null&&(this._cubemapMaterial=kp()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Fp()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Uy(),this._integrationMaterial=Oy());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/rm);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-Ly)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let l=a>0?Math.log2(t)+.5*Math.log2(6/(sm*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=l,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Fy());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function Op(i,e,t){return new Do(i,{minFilter:zi,generateMipmaps:e,type:di,colorSpace:Xr,depthBuffer:t})}function No(i,e,t){return new Kn({name:i,uniforms:e,vertexShader:$e.cube_vert,fragmentShader:t,side:Tn,blending:Es,depthTest:!1,depthWrite:!1})}function Uy(){return No("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${sm}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Oy(){return No("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:rm}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Fy(){return No("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Iy}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Fp(){return No("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function kp(){return No("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function ky(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===Ac||d===wc)if(e.has(f)){let p=e.get(f).texture;return a(p,f.mapping)}else{let p=f.image;if(p&&p.height>0){let v=new Do(p.height);return v.fromEquirectangularTexture(i,f),e.set(f,v),f.addEventListener("dispose",h),a(v.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let d=f.mapping,p=d===Ac||d===wc,v=d===Rs||d===_r;if(p||v){let m=t.get(f),g=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new ml(i)),m=p?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{let x=f.image;return p&&x&&x.height>0||v&&x&&l(x)?(n===null&&(n=new ml(i)),m=p?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",c),m.texture):null}}}return f}function a(f,d){return d===Ac?f.mapping=Rs:d===wc&&(f.mapping=_r),f}function l(f){let d=0,p=6;for(let v=0;v<p;v++)f[v]!==void 0&&d++;return d===p}function h(f){let d=f.target;d.removeEventListener("dispose",h);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function c(f){let d=f.target;d.removeEventListener("dispose",c);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function zy(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Hr("WebGLRenderer: "+n+" extension not supported."),s}}}function By(i,e,t,n){let s={},r=new WeakMap,o=new FinalizationRegistry(p=>delete s[p]);function a(p){l(p.target)}function l(p){p.index!==null&&e.remove(p.index);for(let m in p.attributes)e.remove(p.attributes[m]);p.removeEventListener("dispose",a),delete s[p.id],o.unregister(p);let v=r.get(p);v&&(e.remove(v),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function h(p,v){return s[v.id]!==void 0||(v.addEventListener("dispose",a),s[v.id]=new WeakRef(v),o.register(v,v.id,v),t.memory.geometries++),v}function c(p){let v=p.attributes;for(let m in v)e.update(v[m],i.ARRAY_BUFFER)}function u(p){let v=p.index,m=p.attributes.position,g=0;if(m===void 0)return;let x=v!==null?v.array.length:m.array.length/3-1,_=m.count>=65535?Qr:Kr,b=new _(Math.ceil(x/3)*6,1),C=b.array;if(v!==null){let M=v.array;g=v.version;for(let w=0,A=0;w<x;w+=3){let y=M[w+0],S=M[w+1],P=M[w+2];C[A++]=y,C[A++]=S,C[A++]=S,C[A++]=P,C[A++]=P,C[A++]=y}}else{g=m.version;for(let M=0,w=0;M<x;M+=3){let A=M+0,y=M+1,S=M+2;C[w++]=A,C[w++]=y,C[w++]=y,C[w++]=S,C[w++]=S,C[w++]=A}}b.version=g;let I=r.get(p);I&&e.remove(I),r.set(p,b)}function f(p){let v=r.get(p);if(v){let m=p.index;m!==null&&v.version<m.version&&u(p)}else u(p);return r.get(p)}function d(){for(let p in s){let v=s[p].deref();v!==void 0&&l(v)}}return{get:h,update:c,getWireframeAttribute:f,dispose:d}}function Hy(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*o),t.update(f,n,1)}function h(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*o,d),t.update(f,n,d))}function c(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let v=0;for(let m=0;m<d;m++)v+=f[m];t.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=h,this.renderMultiDraw=c}function Gy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:We("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Vy(i,e,t){let n=new WeakMap,s=new It;function r(o,a,l){let h=o.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=c!==void 0?c.length:0,f=n.get(a);if(f===void 0||f.count!==u){let A=function(){M.dispose(),n.delete(a),a.removeEventListener("dispose",A)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],x=a.morphAttributes.color||[],_=0;d===!0&&(_=1),p===!0&&(_=2),v===!0&&(_=3);let b=a.attributes.position.count*_,C=1;b>e.maxTextureSize&&(C=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let I=new Float32Array(b*C*4*u),M=new jr(I,b,C,u);M.type=Qn,M.needsUpdate=!0;let w=_*4;for(let y=0;y<u;y++){let S=m[y],P=g[y],L=x[y],T=b*C*4*y;for(let N=0;N<S.count;N++){let U=N*w;d===!0&&(s.fromBufferAttribute(S,N),I[T+U+0]=s.x,I[T+U+1]=s.y,I[T+U+2]=s.z,I[T+U+3]=0),p===!0&&(s.fromBufferAttribute(P,N),I[T+U+4]=s.x,I[T+U+5]=s.y,I[T+U+6]=s.z,I[T+U+7]=0),v===!0&&(s.fromBufferAttribute(L,N),I[T+U+8]=s.x,I[T+U+9]=s.y,I[T+U+10]=s.z,I[T+U+11]=L.itemSize===4?s.w:1)}}f={count:u,texture:M,size:new Ae(b,C)},n.set(a,f),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let v=0;v<h.length;v++)d+=h[v];let p=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",h)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Wy(i,e,t,n,s){let r=new WeakMap;function o(h){let c=s.render.frame,u=h.geometry,f=e.get(h,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),h.isInstancedMesh&&(h.hasEventListener("dispose",l)===!1&&h.addEventListener("dispose",l),r.get(h)!==c&&(t.update(h.instanceMatrix,i.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,i.ARRAY_BUFFER),r.set(h,c))),h.isSkinnedMesh){let d=h.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return f}function a(){r=new WeakMap}function l(h){let c=h.target;c.removeEventListener("dispose",l),n.releaseStatesOfObject(c),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:o,dispose:a}}var Xy={[$h]:"LINEAR_TONE_MAPPING",[Kh]:"REINHARD_TONE_MAPPING",[Qh]:"CINEON_TONE_MAPPING",[eu]:"ACES_FILMIC_TONE_MAPPING",[nu]:"AGX_TONE_MAPPING",[iu]:"NEUTRAL_TONE_MAPPING",[tu]:"CUSTOM_TONE_MAPPING"};function qy(i,e,t,n,s,r){let o=new Fn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,h=null,c=new Ft;c.setAttribute("position",new dt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new dt([0,2,0,0,2,0],2));let u=new cc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Be(c,u),d=new bo(-1,1,1,-1,0,1),p=null,v=null,m=!1,g,x=null,_=[],b=!1;this.setSize=function(C,I){o.setSize(C,I),a!==null&&a.setSize(C,I),l!==null&&l.setSize(C,I);for(let M=0;M<_.length;M++){let w=_[M];w.setSize&&w.setSize(C,I)}},this.setEffects=function(C){_=C,b=_.length>0&&_[0].isRenderPass===!0;let I=o.width,M=o.height;_.length>0&&a===null&&(a=new Fn(I,M,{type:di,depthBuffer:!1,stencilBuffer:!1}),l=new Fn(I,M,{type:di,depthBuffer:!1,stencilBuffer:!1}));let w=s===!0&&_.some(A=>A.needsDepthTexture===!0);w!==(o.depthTexture!==null)&&(w===!0&&h===null&&(h=new ki(I,M),r===!0&&(h.format=Bi,h.type=Cs)),o.dispose(),o.depthTexture=w?h:null,o.resolveDepthBuffer=w,o.storeMultisampledDepthBuffer=w);for(let A=0;A<_.length;A++){let y=_[A];y.setSize&&y.setSize(I,M),w&&y.needsDepthTexture===!0&&y.setDepthTexture&&y.setDepthTexture(h)}},this.begin=function(C,I){if(m||C.toneMapping===Si&&_.length===0)return!1;if(x=I,I!==null){let M=I.width,w=I.height;(o.width!==M||o.height!==w)&&this.setSize(M,w)}return b===!1&&C.setRenderTarget(o),g=C.toneMapping,C.toneMapping=Si,!0},this.hasRenderPass=function(){return b},this.end=function(C,I){C.toneMapping=g,m=!0;let M=o,w=a;for(let A=0;A<_.length;A++){let y=_[A];y.enabled!==!1&&(y.render(C,w,M,I),y.needsSwap!==!1&&(M=w,w=w===a?l:a))}if(p!==C.outputColorSpace||v!==C.toneMapping){p=C.outputColorSpace,v=C.toneMapping,u.defines={},rt.getTransfer(p)===xt&&(u.defines.SRGB_TRANSFER="");let A=Xy[v];A&&(u.defines[A]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=M.texture,C.setRenderTarget(x),C.render(f,d),x=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var om=new Cn,am=new ki(1,1),cm=new so(1),lm=new jr,hm=new Qa,um=new io,zp=[],Bp=[],Hp=new Float32Array(16),Gp=new Float32Array(9),Vp=new Float32Array(4);function Mr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=zp[s];if(r===void 0&&(r=new Float32Array(s),zp[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Jt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Zt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function xl(i,e){let t=Bp[e];t===void 0&&(t=new Int32Array(e),Bp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Yy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;i.uniform2fv(this.addr,e),Zt(t,e)}}function Jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Jt(t,e))return;i.uniform3fv(this.addr,e),Zt(t,e)}}function Zy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;i.uniform4fv(this.addr,e),Zt(t,e)}}function $y(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Jt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Jt(t,n))return;Vp.set(n),i.uniformMatrix2fv(this.addr,!1,Vp),Zt(t,n)}}function Ky(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Jt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Jt(t,n))return;Gp.set(n),i.uniformMatrix3fv(this.addr,!1,Gp),Zt(t,n)}}function Qy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Jt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Jt(t,n))return;Hp.set(n),i.uniformMatrix4fv(this.addr,!1,Hp),Zt(t,n)}}function ev(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function tv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;i.uniform2iv(this.addr,e),Zt(t,e)}}function nv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;i.uniform3iv(this.addr,e),Zt(t,e)}}function iv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;i.uniform4iv(this.addr,e),Zt(t,e)}}function sv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function rv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;i.uniform2uiv(this.addr,e),Zt(t,e)}}function ov(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;i.uniform3uiv(this.addr,e),Zt(t,e)}}function av(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;i.uniform4uiv(this.addr,e),Zt(t,e)}}function _l(i){return i.version===0&&(i.compareFunction=du,i.needsUpdate=!0),i}function cv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=_l(am):r=om,t.setTexture2D(e||r,s)}function lv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||hm,s)}function hv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=_l(cm):r=um,t.setTextureCube(e||r,s)}function uv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||lm,s)}function fv(i){switch(i){case 5126:return Yy;case 35664:return jy;case 35665:return Jy;case 35666:return Zy;case 35674:return $y;case 35675:return Ky;case 35676:return Qy;case 5124:case 35670:return ev;case 35667:case 35671:return tv;case 35668:case 35672:return nv;case 35669:case 35673:return iv;case 5125:return sv;case 36294:return rv;case 36295:return ov;case 36296:return av;case 35678:case 36198:case 36298:case 36306:case 35682:return cv;case 35679:case 36299:case 36307:return lv;case 35680:case 36300:case 36308:case 36293:return hv;case 36289:case 36303:case 36311:case 36292:return uv}}function dv(i,e){i.uniform1fv(this.addr,e)}function pv(i,e){let t=Mr(e,this.size,2);i.uniform2fv(this.addr,t)}function mv(i,e){let t=Mr(e,this.size,3);i.uniform3fv(this.addr,t)}function gv(i,e){let t=Mr(e,this.size,4);i.uniform4fv(this.addr,t)}function xv(i,e){let t=Mr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function _v(i,e){let t=Mr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function yv(i,e){let t=Mr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function vv(i,e){i.uniform1iv(this.addr,e)}function bv(i,e){i.uniform2iv(this.addr,e)}function Mv(i,e){i.uniform3iv(this.addr,e)}function Sv(i,e){i.uniform4iv(this.addr,e)}function Tv(i,e){i.uniform1uiv(this.addr,e)}function Ev(i,e){i.uniform2uiv(this.addr,e)}function Av(i,e){i.uniform3uiv(this.addr,e)}function wv(i,e){i.uniform4uiv(this.addr,e)}function Rv(i,e,t){let n=this.cache,s=e.length,r=xl(t,s);Jt(n,r)||(i.uniform1iv(this.addr,r),Zt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=_l(am):o=om;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function Cv(i,e,t){let n=this.cache,s=e.length,r=xl(t,s);Jt(n,r)||(i.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||hm,r[o])}function Pv(i,e,t){let n=this.cache,s=e.length,r=xl(t,s);Jt(n,r)||(i.uniform1iv(this.addr,r),Zt(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=_l(cm):o=um;for(let a=0;a!==s;++a)t.setTextureCube(e[a]||o,r[a])}function Iv(i,e,t){let n=this.cache,s=e.length,r=xl(t,s);Jt(n,r)||(i.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||lm,r[o])}function Lv(i){switch(i){case 5126:return dv;case 35664:return pv;case 35665:return mv;case 35666:return gv;case 35674:return xv;case 35675:return _v;case 35676:return yv;case 5124:case 35670:return vv;case 35667:case 35671:return bv;case 35668:case 35672:return Mv;case 35669:case 35673:return Sv;case 5125:return Tv;case 36294:return Ev;case 36295:return Av;case 36296:return wv;case 35678:case 36198:case 36298:case 36306:case 35682:return Rv;case 35679:case 36299:case 36307:return Cv;case 35680:case 36300:case 36308:case 36293:return Pv;case 36289:case 36303:case 36311:case 36292:return Iv}}var Cu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=fv(t.type)}},Pu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Lv(t.type)}},Iu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},wu=/(\w+)(\])?(\[|\.)?/g;function Wp(i,e){i.seq.push(e),i.map[e.id]=e}function Dv(i,e,t){let n=i.name,s=n.length;for(wu.lastIndex=0;;){let r=wu.exec(n),o=wu.lastIndex,a=r[1],l=r[2]==="]",h=r[3];if(l&&(a=a|0),h===void 0||h==="["&&o+2===s){Wp(t,h===void 0?new Cu(a,i,e):new Pu(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Iu(a),Wp(t,u)),t=u}}}var br=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);Dv(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Xp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Nv=37297,Uv=0;function Ov(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var qp=new qe;function Fv(i){rt._getMatrix(qp,rt.workingColorSpace,i);let e=`mat3( ${qp.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(i)){case qr:return[e,"LinearTransferOETF"];case xt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Yp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Ov(i.getShaderSource(e),a)}else return r}function kv(i,e){let t=Fv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var zv={[$h]:"Linear",[Kh]:"Reinhard",[Qh]:"Cineon",[eu]:"ACESFilmic",[nu]:"AgX",[iu]:"Neutral",[tu]:"Custom"};function Bv(i,e){let t=zv[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var pl=new V;function Hv(){rt.getLuminanceCoefficients(pl);let i=pl.x.toFixed(4),e=pl.y.toFixed(4),t=pl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lo).join(`
`)}function Vv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Wv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Lo(i){return i!==""}function jp(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Jp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Xv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lu(i){return i.replace(Xv,qv)}function qv(i,e){let t=$e[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Lu(t)}var Yv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zp(i){return i.replace(Yv,jv)}function jv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $p(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Jv={[So]:"SHADOWMAP_TYPE_PCF",[gr]:"SHADOWMAP_TYPE_VSM"};function Zv(i){return Jv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var $v={[_r]:"ENVMAP_MODE_REFRACTION"};function Kv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":$v[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Qv={[Ec]:"ENVMAP_BLENDING_MULTIPLY",[hp]:"ENVMAP_BLENDING_MIX",[up]:"ENVMAP_BLENDING_ADD"};function eb(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Qv[i.combine]||"ENVMAP_BLENDING_NONE"}function tb(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Zv(t),h=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",c=Kv(t),u=eb(t),f=Gv(t),d=Vv(r),p=s.createProgram(),v,m,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(Lo).join(`
`),v.length>0&&(v+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(Lo).join(`
`),m.length>0&&(m+=`
`)):(v=[$p(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lo).join(`
`),m=[$p(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Si?"#define TONE_MAPPING":"",t.toneMapping!==Si?$e.tonemapping_pars_fragment:"",t.toneMapping!==Si?Bv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,kv("linearToOutputTexel",t.outputColorSpace),Hv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lo).join(`
`)),o=Lu(o),o=jp(o,t),o=Jp(o,t),a=Lu(a),a=jp(a,t),a=Jp(a,t),o=Zp(o),a=Zp(a),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,v=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,m=["#define varying in",t.glslVersion===pu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let x=g+v+o,_=g+m+a,b=Xp(s,s.VERTEX_SHADER,x),C=Xp(s,s.FRAGMENT_SHADER,_);s.attachShader(p,b),s.attachShader(p,C),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function I(y){if(i.debug.checkShaderErrors){let S=s.getProgramInfoLog(p)||"",P=s.getShaderInfoLog(b)||"",L=s.getShaderInfoLog(C)||"",T=S.trim(),N=P.trim(),U=L.trim(),F=!0,J=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(F=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,b,C);else{let B=Yp(s,b,"vertex"),k=Yp(s,C,"fragment");We("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+T+`
`+B+`
`+k)}else T!==""?Ge("WebGLProgram: Program Info Log:",T):(N===""||U==="")&&(J=!1);J&&(y.diagnostics={runnable:F,programLog:T,vertexShader:{log:N,prefix:v},fragmentShader:{log:U,prefix:m}})}s.deleteShader(b),s.deleteShader(C),M=new br(s,p),w=Wv(s,p)}let M;this.getUniforms=function(){return M===void 0&&I(this),M};let w;this.getAttributes=function(){return w===void 0&&I(this),w};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(p,Nv)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Uv++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=b,this.fragmentShader=C,this}var nb=0,Du=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Nu(e),t.set(e,n)),n}},Nu=class{constructor(e){this.id=nb++,this.code=e,this.usedTimes=0}};function ib(i){return i===ls||i===Co||i===Po}function sb(i,e,t,n,s,r){let o=new Jr,a=new Du,l=new Set,h=[],c=new Map,u=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(M){return l.add(M),M===0?"uv":`uv${M}`}function p(M,w,A,y,S,P){let L=y.fog,T=S.geometry,N=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?y.environment:null,U=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,F=e.get(M.envMap||N,U),J=f[M.type],B=n.precision;M.precision!==null&&(B=n.getMaxPrecision(M.precision),B!==M.precision&&Ge("WebGLProgram.getParameters:",M.precision,"not supported, using",B,"instead."));let k=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,G=k!==void 0?k.length:0,ue=0;T.morphAttributes.position!==void 0&&(ue=1),T.morphAttributes.normal!==void 0&&(ue=2),T.morphAttributes.color!==void 0&&(ue=3);let he,Y,ne,ve;if(J){let Me=Ei[J];he=Me.vertexShader,Y=Me.fragmentShader}else{he=M.vertexShader,Y=M.fragmentShader;let Me=a.getVertexShaderStage(M),_t=a.getFragmentShaderStage(M);a.update(M,Me,_t),ne=Me.id,ve=_t.id}let pe=i.getRenderTarget(),ce=i.state.buffers.depth.getReversed(),Oe=S.isInstancedMesh===!0,at=S.isBatchedMesh===!0,Ne=!!M.map,ot=!!M.matcap,lt=!!F,Qe=lt&&F.isPMREMTexture===!0,pt=!!M.aoMap,ht=!!M.lightMap,Ut=!!M.bumpMap&&M.wireframe===!1,bt=!!M.normalMap,gi=!!M.displacementMap,$t=!!M.emissiveMap,Vn=!!M.metalnessMap,Wn=!!M.roughnessMap,Xn=M.anisotropy>0,H=M.clearcoat>0,qn=M.diffuseRoughness>0,Ct=M.dispersion>0,Pt=M.retroreflectivity>0,be=M.iridescence>0,Xt=M.sheen>0,He=M.transmission>0,Ye=Xn&&!!M.anisotropyMap,D=H&&!!M.clearcoatMap,E=H&&!!M.clearcoatNormalMap,X=H&&!!M.clearcoatRoughnessMap,oe=qn&&!!M.diffuseRoughnessMap,te=be&&!!M.iridescenceMap,fe=be&&!!M.iridescenceThicknessMap,_e=Xt&&!!M.sheenColorMap,K=Xt&&!!M.sheenRoughnessMap,Q=!!M.specularMap,me=!!M.specularColorMap,O=!!M.specularIntensityMap,ee=He&&!!M.transmissionMap,$=He&&!!M.thicknessMap,ge=!!M.gradientMap,le=!!M.alphaMap,de=M.alphaTest>0,ke=!!M.alphaHash,Ze=!!M.extensions,ae=Si;M.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(ae=i.toneMapping);let ze=Qe?F.isCompressedCubeTexture?F.image[0].mipmaps:F.mipmaps:null,Je={shaderID:J,shaderType:M.type,shaderName:M.name,vertexShader:he,fragmentShader:Y,defines:M.defines,customVertexShaderID:ne,customFragmentShaderID:ve,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:B,batching:at,batchingColor:at&&S._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&S.instanceColor!==null,instancingMorph:Oe&&S.morphTexture!==null,outputColorSpace:pe===null?i.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:rt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:Ne,matcap:ot,envMap:lt,envMapMode:lt&&F.mapping,envMapPMREM:Qe,envMapMaxLod:Qe?ze.length-1:null,envMapSize:Qe?ze[0].width:null,aoMap:pt,lightMap:ht,bumpMap:Ut,normalMap:bt,displacementMap:gi,emissiveMap:$t,normalMapObjectSpace:bt&&M.normalMapType===pp,normalMapTangentSpace:bt&&M.normalMapType===fl,packedNormalMap:bt&&M.normalMapType===fl&&ib(M.normalMap.format),metalnessMap:Vn,roughnessMap:Wn,anisotropy:Xn,anisotropyMap:Ye,clearcoat:H,clearcoatMap:D,clearcoatNormalMap:E,clearcoatRoughnessMap:X,diffuseRoughness:qn,diffuseRoughnessMap:oe,dispersion:Ct,retroreflection:Pt,iridescence:be,iridescenceMap:te,iridescenceThicknessMap:fe,sheen:Xt,sheenColorMap:_e,sheenRoughnessMap:K,specularMap:Q,specularColorMap:me,specularIntensityMap:O,transmission:He,transmissionMap:ee,thicknessMap:$,gradientMap:ge,opaque:M.transparent===!1&&M.blending===xr&&M.alphaToCoverage===!1,alphaMap:le,alphaTest:de,alphaHash:ke,combine:M.combine,mapUv:Ne&&d(M.map.channel),aoMapUv:pt&&d(M.aoMap.channel),lightMapUv:ht&&d(M.lightMap.channel),bumpMapUv:Ut&&d(M.bumpMap.channel),normalMapUv:bt&&d(M.normalMap.channel),displacementMapUv:gi&&d(M.displacementMap.channel),emissiveMapUv:$t&&d(M.emissiveMap.channel),metalnessMapUv:Vn&&d(M.metalnessMap.channel),roughnessMapUv:Wn&&d(M.roughnessMap.channel),anisotropyMapUv:Ye&&d(M.anisotropyMap.channel),clearcoatMapUv:D&&d(M.clearcoatMap.channel),clearcoatNormalMapUv:E&&d(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:X&&d(M.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:oe&&d(M.diffuseRoughnessMap.channel),iridescenceMapUv:te&&d(M.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&d(M.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&d(M.sheenColorMap.channel),sheenRoughnessMapUv:K&&d(M.sheenRoughnessMap.channel),specularMapUv:Q&&d(M.specularMap.channel),specularColorMapUv:me&&d(M.specularColorMap.channel),specularIntensityMapUv:O&&d(M.specularIntensityMap.channel),transmissionMapUv:ee&&d(M.transmissionMap.channel),thicknessMapUv:$&&d(M.thicknessMap.channel),alphaMapUv:le&&d(M.alphaMap.channel),vertexTangents:!!T.attributes.tangent&&(bt||Xn),vertexNormals:!!T.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!T.attributes.color&&T.attributes.color.itemSize===4,pointsUvs:S.isPoints===!0&&!!T.attributes.uv&&(Ne||le),fog:!!L,useFog:M.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||T.attributes.normal===void 0&&bt===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ce,skinning:S.isSkinnedMesh===!0,hasPositionAttribute:T.attributes.position!==void 0,morphTargets:T.morphAttributes.position!==void 0,morphNormals:T.morphAttributes.normal!==void 0,morphColors:T.morphAttributes.color!==void 0,morphTargetsCount:G,morphTextureStride:ue,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:P.filter(Me=>Me.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,decodeVideoTexture:Ne&&M.map.isVideoTexture===!0&&rt.getTransfer(M.map.colorSpace)===xt,decodeVideoTextureEmissive:$t&&M.emissiveMap.isVideoTexture===!0&&rt.getTransfer(M.emissiveMap.colorSpace)===xt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===nn,flipSided:M.side===Tn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ze&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ze&&M.extensions.multiDraw===!0||at)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Je.vertexUv1s=l.has(1),Je.vertexUv2s=l.has(2),Je.vertexUv3s=l.has(3),l.clear(),Je}function v(M){let w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(let A in M.defines)w.push(A),w.push(M.defines[A]);return M.isRawShaderMaterial===!1&&(m(w,M),g(w,M),w.push(i.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function m(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapPMREM),M.push(w.envMapMaxLod),M.push(w.envMapSize),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.diffuseRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.numSunLights),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numSunLightShadows),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.numLightProbeGrids),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function g(M,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.retroreflection&&o.enable(24),w.diffuseRoughness&&o.enable(25),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),w.packedNormalMap&&o.enable(22),w.vertexNormals&&o.enable(23),M.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),w.numLightProbeGrids>0&&o.enable(22),w.hasPositionAttribute&&o.enable(23),M.push(o.mask)}function x(M){let w=f[M.type],A;if(w){let y=Ei[w];A=Lp.clone(y.uniforms)}else A=M.uniforms;return A}function _(M,w){let A=c.get(w);return A!==void 0?++A.usedTimes:(A=new tb(i,w,M,s),h.push(A),c.set(w,A)),A}function b(M){if(--M.usedTimes===0){let w=h.indexOf(M);h[w]=h[h.length-1],h.pop(),c.delete(M.cacheKey),M.destroy()}}function C(M){a.remove(M)}function I(){a.dispose()}return{getParameters:p,getProgramCacheKey:v,getUniforms:x,acquireProgram:_,releaseProgram:b,releaseShaderCache:C,programs:h,dispose:I}}function rb(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ob(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Kp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Qp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,p,v,m,g){let x=i[e];return x===void 0?(x={id:f.id,object:f,geometry:d,material:p,materialVariant:o(f),groupOrder:v,renderOrder:f.renderOrder,z:m,group:g},i[e]=x):(x.id=f.id,x.object=f,x.geometry=d,x.material=p,x.materialVariant=o(f),x.groupOrder=v,x.renderOrder=f.renderOrder,x.z=m,x.group=g),e++,x}function l(f,d,p,v,m,g,x){x.reversedDepth===!0&&(m=-m);let _=a(f,d,p,v,m,g);p.transmission>0?n.push(_):p.transparent===!0?s.push(_):t.push(_)}function h(f,d,p,v,m,g){let x=a(f,d,p,v,m,g);p.transmission>0?n.unshift(x):p.transparent===!0?s.unshift(x):t.unshift(x)}function c(f,d){t.length>1&&t.sort(f||ob),n.length>1&&n.sort(d||Kp),s.length>1&&s.sort(d||Kp)}function u(){for(let f=e,d=i.length;f<d;f++){let p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:h,finish:u,sort:c}}function ab(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Qp,i.set(n,[o])):s>=r.length?(o=new Qp,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function cb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new V,color:new Xe};break;case"SpotLight":t={position:new V,direction:new V,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new V,halfWidth:new V,halfHeight:new V};break}return i[e.id]=t,t}}}function lb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var hb=0;function ub(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function fb(i){let e=new cb,t=lb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new V);let s=new V,r=new ft,o=new ft;function a(h){let c=0,u=0,f=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let d=0,p=0,v=0,m=0,g=0,x=0,_=0,b=0,C=0,I=0,M=0,w=0,A=0,y=0;h.sort(ub);for(let P=0,L=h.length;P<L;P++){let T=h[P],N=T.color,U=T.intensity,F=T.distance,J=null;if(T.shadow&&T.shadow.map&&(T.shadow.map.texture.format===ls?J=T.shadow.map.texture:J=T.shadow.map.depthTexture||T.shadow.map.texture),T.isAmbientLight)c+=N.r*U,u+=N.g*U,f+=N.b*U;else if(T.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(T.sh.coefficients[B],U);y++}else if(T.isSunLight){let B=e.get(T);if(B.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let k=T.shadow,G=t.get(T);G.shadowIntensity=k.intensity,G.shadowBias=k.bias,G.shadowNormalBias=k.normalBias,G.shadowRadius=k.radius,G.shadowMapSize.copy(k.mapSize).multiply(k.getFrameExtents()),n.sunShadow[p]=G,n.sunShadowMap[p]=J;let ue=k.getViewportCount();for(let he=0;he<ue;he++)n.sunShadowMatrix[v+he]=k.getMatrix(he),n.sunShadowCascade[v+he]=k._cascadeData[he];v+=ue,p++}n.sun[d]=B,d++}else if(T.isDirectionalLight){let B=e.get(T);if(B.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let k=T.shadow,G=t.get(T);G.shadowIntensity=k.intensity,G.shadowBias=k.bias,G.shadowNormalBias=k.normalBias,G.shadowRadius=k.radius,G.shadowMapSize=k.mapSize,n.directionalShadow[m]=G,n.directionalShadowMap[m]=J,n.directionalShadowMatrix[m]=T.shadow.matrix,C++}n.directional[m]=B,m++}else if(T.isSpotLight){let B=e.get(T);B.position.setFromMatrixPosition(T.matrixWorld),B.color.copy(N).multiplyScalar(U),B.distance=F,B.coneCos=Math.cos(T.angle),B.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),B.decay=T.decay,n.spot[x]=B;let k=T.shadow;if(T.map&&(n.spotLightMap[w]=T.map,w++,k.updateMatrices(T),T.castShadow&&A++),n.spotLightMatrix[x]=k.matrix,T.castShadow){let G=t.get(T);G.shadowIntensity=k.intensity,G.shadowBias=k.bias,G.shadowNormalBias=k.normalBias,G.shadowRadius=k.radius,G.shadowMapSize=k.mapSize,n.spotShadow[x]=G,n.spotShadowMap[x]=J,M++}x++}else if(T.isRectAreaLight){let B=e.get(T);B.color.copy(N).multiplyScalar(U),B.halfWidth.set(T.width*.5,0,0),B.halfHeight.set(0,T.height*.5,0),n.rectArea[_]=B,_++}else if(T.isPointLight){let B=e.get(T);if(B.color.copy(T.color).multiplyScalar(T.intensity),B.distance=T.distance,B.decay=T.decay,T.castShadow){let k=T.shadow,G=t.get(T);G.shadowIntensity=k.intensity,G.shadowBias=k.bias,G.shadowNormalBias=k.normalBias,G.shadowRadius=k.radius,G.shadowMapSize=k.mapSize,G.shadowCameraNear=k.camera.near,G.shadowCameraFar=k.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=T.shadow.matrix,I++}n.point[g]=B,g++}else if(T.isHemisphereLight){let B=e.get(T);B.skyColor.copy(T.color).multiplyScalar(U),B.groundColor.copy(T.groundColor).multiplyScalar(U),n.hemi[b]=B,b++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Se.LTC_FLOAT_1,n.rectAreaLTC2=Se.LTC_FLOAT_2):(n.rectAreaLTC1=Se.LTC_HALF_1,n.rectAreaLTC2=Se.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=u,n.ambient[2]=f;let S=n.hash;(S.sunLength!==d||S.directionalLength!==m||S.pointLength!==g||S.spotLength!==x||S.rectAreaLength!==_||S.hemiLength!==b||S.numSunShadows!==p||S.numDirectionalShadows!==C||S.numPointShadows!==I||S.numSpotShadows!==M||S.numSpotMaps!==w||S.numLightProbes!==y)&&(n.sun.length=d,n.directional.length=m,n.spot.length=x,n.rectArea.length=_,n.point.length=g,n.hemi.length=b,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=C,n.directionalShadowMap.length=C,n.directionalShadowMatrix.length=C,n.pointShadow.length=I,n.pointShadowMap.length=I,n.pointShadowMatrix.length=I,n.spotShadow.length=M,n.spotShadowMap.length=M,n.spotLightMatrix.length=M+w-A,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=y,S.sunLength=d,S.directionalLength=m,S.pointLength=g,S.spotLength=x,S.rectAreaLength=_,S.hemiLength=b,S.numSunShadows=p,S.numDirectionalShadows=C,S.numPointShadows=I,S.numSpotShadows=M,S.numSpotMaps=w,S.numLightProbes=y,n.version=hb++)}function l(h,c){let u=0,f=0,d=0,p=0,v=0,m=0,g=c.matrixWorldInverse;for(let x=0,_=h.length;x<_;x++){let b=h[x];if(b.isSunLight){let C=n.sun[u];C.direction.setFromMatrixPosition(b.matrixWorld),C.direction.transformDirection(g),u++}else if(b.isDirectionalLight){let C=n.directional[f];C.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(g),f++}else if(b.isSpotLight){let C=n.spot[p];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(g),C.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(g),p++}else if(b.isRectAreaLight){let C=n.rectArea[v];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(g),o.identity(),r.copy(b.matrixWorld),r.premultiply(g),o.extractRotation(r),C.halfWidth.set(b.width*.5,0,0),C.halfHeight.set(0,b.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),v++}else if(b.isPointLight){let C=n.point[d];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(g),d++}else if(b.isHemisphereLight){let C=n.hemi[m];C.direction.setFromMatrixPosition(b.matrixWorld),C.direction.transformDirection(g),m++}}}return{setup:a,setupView:l,state:n}}function em(i){let e=new fb(i),t=[],n=[],s=[];function r(u){c.camera=u,t.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):t.push(u)}function a(u){n.push(u)}function l(){e.setup(t),s.sort((u,f)=>u.priority-f.priority||u.id-f.id)}function h(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:c,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a}}function db(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new em(i),e.set(s,[a])):r>=o.length?(a=new em(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var pb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,gb=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],xb=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],tm=new ft,Io=new V,Ru=new V;function _b(i,e,t){let n=new is,s=new Ae,r=new Ae,o=new It,a=new lc,l=new hc,h={},c=t.maxTextureSize,u={[cs]:Tn,[Tn]:cs,[nn]:nn},f=new Kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:pb,fragmentShader:mb}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let p=new Ft;p.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Be(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=So;let g=this.type;this.render=function(I,M,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;this.type===qd&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=So);let A=i.getRenderTarget(),y=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),P=i.state;P.setBlending(Es),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);let L=g!==this.type;L&&M.traverse(function(T){T.material&&(Array.isArray(T.material)?T.material.forEach(N=>N.needsUpdate=!0):T.material.needsUpdate=!0)});for(let T=0,N=I.length;T<N;T++){let U=I[T],F=U.shadow;if(F===void 0){Ge("WebGLShadowMap:",U,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);let J=F.getFrameExtents();s.multiply(J),r.copy(F.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/J.x),s.x=r.x*J.x,F.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/J.y),s.y=r.y*J.y,F.mapSize.y=r.y));let B=i.state.buffers.depth.getReversed();if(F.camera._reversedDepth=B,F.map===null||L===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===gr){if(U.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new Fn(s.x,s.y,{format:ls,type:di,minFilter:Sn,magFilter:Sn,generateMipmaps:!1}),F.map.texture.name=U.name+".shadowMap",F.map.depthTexture=new ki(s.x,s.y,Qn),F.map.depthTexture.name=U.name+".shadowMapDepth",F.map.depthTexture.format=Ui,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=tn,F.map.depthTexture.magFilter=tn}else U.isPointLight?(F.map=new Do(s.x),F.map.depthTexture=new so(s.x,fi)):(F.map=new Fn(s.x,s.y),F.map.depthTexture=new ki(s.x,s.y,fi)),F.map.depthTexture.name=U.name+".shadowMap",F.map.depthTexture.format=Ui,this.type===So?(F.map.depthTexture.compareFunction=B?fu:uu,F.map.depthTexture.minFilter=Sn,F.map.depthTexture.magFilter=Sn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=tn,F.map.depthTexture.magFilter=tn);F.camera.updateProjectionMatrix()}F.map.isWebGLCubeRenderTarget!==!0&&(F.map.width!==s.x||F.map.height!==s.y)&&F.map.setSize(s.x,s.y);let k=F.map.isWebGLCubeRenderTarget?6:F.getViewportCount();U.isPointLight!==!0&&F.updateMatrices(U,w);let G=(F.camera.layers.mask&4294967294)!==0?F.camera.layers:w.layers;for(let ue=0;ue<k;ue++){let he=F.getCamera(ue);if(U.isPointLight){let Y=F.camera,ne=F.matrix,ve=U.distance||Y.far;ve!==Y.far&&(Y.far=ve,Y.updateProjectionMatrix()),Io.setFromMatrixPosition(U.matrixWorld),Y.position.copy(Io),Ru.copy(Y.position),Ru.add(gb[ue]),Y.up.copy(xb[ue]),Y.lookAt(Ru),Y.updateMatrixWorld(),ne.makeTranslation(-Io.x,-Io.y,-Io.z),tm.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),F._frustum.setFromProjectionMatrix(tm,Y.coordinateSystem,Y.reversedDepth)}if(F.map.isWebGLCubeRenderTarget)i.setRenderTarget(F.map,ue),i.clear();else{ue===0&&(i.setRenderTarget(F.map),i.clear());let Y=F.getViewport(ue);o.set(r.x*Y.x,r.y*Y.y,r.x*Y.z,r.y*Y.w),P.viewport(o)}n=F.getFrustum(ue),b(M,w,he,U,G,this.type)}F.isPointLightShadow!==!0&&this.type===gr&&x(F,w),F.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(A,y,S)};function x(I,M){let w=e.update(v);f.defines.VSM_SAMPLES!==I.blurSamples&&(f.defines.VSM_SAMPLES=I.blurSamples,d.defines.VSM_SAMPLES=I.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),I.mapPass===null?I.mapPass=new Fn(s.x,s.y,{format:ls,type:di}):(I.mapPass.width!==I.map.width||I.mapPass.height!==I.map.height)&&I.mapPass.setSize(I.map.width,I.map.height),f.uniforms.shadow_pass.value=I.map.depthTexture,f.uniforms.resolution.value.set(I.map.width,I.map.height),f.uniforms.radius.value=I.radius,i.setRenderTarget(I.mapPass),i.clear(),i.renderBufferDirect(M,null,w,f,v,null),d.uniforms.shadow_pass.value=I.mapPass.texture,d.uniforms.resolution.value.set(I.map.width,I.map.height),d.uniforms.radius.value=I.radius,i.setRenderTarget(I.map),i.clear(),i.renderBufferDirect(M,null,w,d,v,null)}function _(I,M,w,A){let y=null,S=w.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(S!==void 0)y=S;else if(y=w.isPointLight===!0?l:a,i.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0||M.alphaToCoverage===!0){let P=y.uuid,L=M.uuid,T=h[P];T===void 0&&(T={},h[P]=T);let N=T[L];N===void 0&&(N=y.clone(),T[L]=N,M.addEventListener("dispose",C)),y=N}if(y.visible=M.visible,y.wireframe=M.wireframe,A===gr?y.side=M.shadowSide!==null?M.shadowSide:M.side:y.side=M.shadowSide!==null?M.shadowSide:u[M.side],y.alphaMap=M.alphaMap,y.alphaTest=M.alphaToCoverage===!0?.5:M.alphaTest,y.map=M.map,y.clipShadows=M.clipShadows,y.clippingPlanes=M.clippingPlanes,y.clipIntersection=M.clipIntersection,y.displacementMap=M.displacementMap,y.displacementScale=M.displacementScale,y.displacementBias=M.displacementBias,y.wireframeLinewidth=M.wireframeLinewidth,y.linewidth=M.linewidth,w.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let P=i.properties.get(y);P.light=w}return y}function b(I,M,w,A,y,S){if(I.visible===!1)return;if(I.layers.test(y)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&S===gr)&&(!I.frustumCulled||I.intersectsFrustum(n))){I.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,I.matrixWorld);let T=e.update(I),N=I.material;if(Array.isArray(N)){let U=T.groups;for(let F=0,J=U.length;F<J;F++){let B=U[F],k=N[B.materialIndex];if(k&&k.visible){let G=_(I,k,A,S);I.onBeforeShadow(i,I,M,w,T,G,B),i.renderBufferDirect(w,null,T,G,I,B),I.onAfterShadow(i,I,M,w,T,G,B)}}}else if(N.visible){let U=_(I,N,A,S);I.onBeforeShadow(i,I,M,w,T,U,null),i.renderBufferDirect(w,null,T,U,I,null),I.onAfterShadow(i,I,M,w,T,U,null)}}let L=I.children;for(let T=0,N=L.length;T<N;T++)b(L[T],M,w,A,y,S)}function C(I){I.target.removeEventListener("dispose",C);for(let w in h){let A=h[w],y=I.target.uuid;y in A&&(A[y].dispose(),delete A[y])}}}function yb(i,e){function t(){let O=!1,ee=new It,$=null,ge=new It(0,0,0,0);return{setMask:function(le){$!==le&&!O&&(i.colorMask(le,le,le,le),$=le)},setLocked:function(le){O=le},setClear:function(le,de,ke,Ze,ae){ae===!0&&(le*=Ze,de*=Ze,ke*=Ze),ee.set(le,de,ke,Ze),ge.equals(ee)===!1&&(i.clearColor(le,de,ke,Ze),ge.copy(ee))},reset:function(){O=!1,$=null,ge.set(-1,0,0,0)}}}function n(){let O=!1,ee=!1,$=null,ge=null,le=null;return{setReversed:function(de){if(ee!==de){let ke=e.get("EXT_clip_control");de?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),ee=de;let Ze=le;le=null,this.setClear(Ze)}},getReversed:function(){return ee},setTest:function(de){de?ce(i.DEPTH_TEST):Oe(i.DEPTH_TEST)},setMask:function(de){$!==de&&!O&&(i.depthMask(de),$=de)},setFunc:function(de){if(ee&&(de=Ep[de]),ge!==de){switch(de){case Ha:i.depthFunc(i.NEVER);break;case Ga:i.depthFunc(i.ALWAYS);break;case Va:i.depthFunc(i.LESS);break;case tr:i.depthFunc(i.LEQUAL);break;case Wa:i.depthFunc(i.EQUAL);break;case Xa:i.depthFunc(i.GEQUAL);break;case nr:i.depthFunc(i.GREATER);break;case qa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=de}},setLocked:function(de){O=de},setClear:function(de){le!==de&&(le=de,ee&&(de=1-de),i.clearDepth(de))},reset:function(){O=!1,$=null,ge=null,le=null,ee=!1}}}function s(){let O=!1,ee=null,$=null,ge=null,le=null,de=null,ke=null,Ze=null,ae=null;return{setTest:function(ze){O||(ze?ce(i.STENCIL_TEST):Oe(i.STENCIL_TEST))},setMask:function(ze){ee!==ze&&!O&&(i.stencilMask(ze),ee=ze)},setFunc:function(ze,Je,Me){($!==ze||ge!==Je||le!==Me)&&(i.stencilFunc(ze,Je,Me),$=ze,ge=Je,le=Me)},setOp:function(ze,Je,Me){(de!==ze||ke!==Je||Ze!==Me)&&(i.stencilOp(ze,Je,Me),de=ze,ke=Je,Ze=Me)},setLocked:function(ze){O=ze},setClear:function(ze){ae!==ze&&(i.clearStencil(ze),ae=ze)},reset:function(){O=!1,ee=null,$=null,ge=null,le=null,de=null,ke=null,Ze=null,ae=null}}}let r=new t,o=new n,a=new s,l={},h=new WeakMap,c={},u={},f={},d=new WeakMap,p=[],v=null,m=!1,g=null,x=null,_=null,b=null,C=null,I=null,M=null,w=new Xe(0,0,0),A=0,y=!1,S=null,P=null,L=null,T=null,N=null,U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,J=0,B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(B)[1]),F=J>=1):B.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),F=J>=2);let k=null,G={},ue=i.getParameter(i.SCISSOR_BOX),he=i.getParameter(i.VIEWPORT),Y=new It().fromArray(ue),ne=new It().fromArray(he);function ve(O,ee,$,ge){let le=new Uint8Array(4),de=i.createTexture();i.bindTexture(O,de),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ke=0;ke<$;ke++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(ee,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(ee+ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return de}let pe={};pe[i.TEXTURE_2D]=ve(i.TEXTURE_2D,i.TEXTURE_2D,1),pe[i.TEXTURE_CUBE_MAP]=ve(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[i.TEXTURE_2D_ARRAY]=ve(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),pe[i.TEXTURE_3D]=ve(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ce(i.DEPTH_TEST),o.setFunc(tr),Ut(!1),bt(qh),ce(i.CULL_FACE),pt(Es);function ce(O){c[O]!==!0&&(i.enable(O),c[O]=!0)}function Oe(O){c[O]!==!1&&(i.disable(O),c[O]=!1)}function at(O,ee){return f[O]!==ee?(i.bindFramebuffer(O,ee),f[O]=ee,O===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ee),O===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ee),!0):!1}function Ne(O,ee){let $=p,ge=!1;if(O){$=d.get(ee),$===void 0&&($=[],d.set(ee,$));let le=O.textures;if($.length!==le.length||$[0]!==i.COLOR_ATTACHMENT0){for(let de=0,ke=le.length;de<ke;de++)$[de]=i.COLOR_ATTACHMENT0+de;$.length=le.length,ge=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,ge=!0);ge&&i.drawBuffers($)}function ot(O){return v!==O?(i.useProgram(O),v=O,!0):!1}let lt={[ws]:i.FUNC_ADD,[Yd]:i.FUNC_SUBTRACT,[jd]:i.FUNC_REVERSE_SUBTRACT};lt[Jd]=i.MIN,lt[Zd]=i.MAX;let Qe={[$d]:i.ZERO,[Kd]:i.ONE,[Qd]:i.SRC_COLOR,[Jh]:i.SRC_ALPHA,[rp]:i.SRC_ALPHA_SATURATE,[ip]:i.DST_COLOR,[tp]:i.DST_ALPHA,[ep]:i.ONE_MINUS_SRC_COLOR,[Zh]:i.ONE_MINUS_SRC_ALPHA,[sp]:i.ONE_MINUS_DST_COLOR,[np]:i.ONE_MINUS_DST_ALPHA,[op]:i.CONSTANT_COLOR,[ap]:i.ONE_MINUS_CONSTANT_COLOR,[cp]:i.CONSTANT_ALPHA,[lp]:i.ONE_MINUS_CONSTANT_ALPHA};function pt(O,ee,$,ge,le,de,ke,Ze,ae,ze){if(O===Es){m===!0&&(Oe(i.BLEND),m=!1);return}if(m===!1&&(ce(i.BLEND),m=!0),O!==Tc){if(O!==g||ze!==y){if((x!==ws||C!==ws)&&(i.blendEquation(i.FUNC_ADD),x=ws,C=ws),ze)switch(O){case xr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case As:i.blendFunc(i.ONE,i.ONE);break;case Yh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case jh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:We("WebGLState: Invalid blending: ",O);break}else switch(O){case xr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case As:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Yh:We("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case jh:We("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:We("WebGLState: Invalid blending: ",O);break}_=null,b=null,I=null,M=null,w.set(0,0,0),A=0,g=O,y=ze}return}le=le||ee,de=de||$,ke=ke||ge,(ee!==x||le!==C)&&(i.blendEquationSeparate(lt[ee],lt[le]),x=ee,C=le),($!==_||ge!==b||de!==I||ke!==M)&&(i.blendFuncSeparate(Qe[$],Qe[ge],Qe[de],Qe[ke]),_=$,b=ge,I=de,M=ke),(Ze.equals(w)===!1||ae!==A)&&(i.blendColor(Ze.r,Ze.g,Ze.b,ae),w.copy(Ze),A=ae),g=O,y=!1}function ht(O,ee){O.side===nn?Oe(i.CULL_FACE):ce(i.CULL_FACE);let $=O.side===Tn;ee&&($=!$),Ut($),O.blending===xr&&O.transparent===!1?pt(Es):pt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);let ge=O.stencilWrite;a.setTest(ge),ge&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),$t(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):Oe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ut(O){S!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),S=O)}function bt(O){O!==Wd?(ce(i.CULL_FACE),O!==P&&(O===qh?i.cullFace(i.BACK):O===Xd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Oe(i.CULL_FACE),P=O}function gi(O){O!==L&&(F&&i.lineWidth(O),L=O)}function $t(O,ee,$){O?(ce(i.POLYGON_OFFSET_FILL),(T!==ee||N!==$)&&(T=ee,N=$,o.getReversed()&&(ee=-ee,$=-$),i.polygonOffset(ee,$))):Oe(i.POLYGON_OFFSET_FILL)}function Vn(O){O?ce(i.SCISSOR_TEST):Oe(i.SCISSOR_TEST)}function Wn(O){O===void 0&&(O=i.TEXTURE0+U-1),k!==O&&(i.activeTexture(O),k=O)}function Xn(O,ee,$){$===void 0&&(k===null?$=i.TEXTURE0+U-1:$=k);let ge=G[$];ge===void 0&&(ge={type:void 0,texture:void 0},G[$]=ge),(ge.type!==O||ge.texture!==ee)&&(k!==$&&(i.activeTexture($),k=$),i.bindTexture(O,ee||pe[O]),ge.type=O,ge.texture=ee)}function H(){let O=G[k];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function qn(){try{i.compressedTexImage2D(...arguments)}catch(O){We("WebGLState:",O)}}function Ct(){try{i.compressedTexImage3D(...arguments)}catch(O){We("WebGLState:",O)}}function Pt(){try{i.texSubImage2D(...arguments)}catch(O){We("WebGLState:",O)}}function be(){try{i.texSubImage3D(...arguments)}catch(O){We("WebGLState:",O)}}function Xt(){try{i.compressedTexSubImage2D(...arguments)}catch(O){We("WebGLState:",O)}}function He(){try{i.compressedTexSubImage3D(...arguments)}catch(O){We("WebGLState:",O)}}function Ye(){try{i.texStorage2D(...arguments)}catch(O){We("WebGLState:",O)}}function D(){try{i.texStorage3D(...arguments)}catch(O){We("WebGLState:",O)}}function E(){try{i.texImage2D(...arguments)}catch(O){We("WebGLState:",O)}}function X(){try{i.texImage3D(...arguments)}catch(O){We("WebGLState:",O)}}function oe(O){return u[O]!==void 0?u[O]:i.getParameter(O)}function te(O,ee){u[O]!==ee&&(i.pixelStorei(O,ee),u[O]=ee)}function fe(O){Y.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Y.copy(O))}function _e(O){ne.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),ne.copy(O))}function K(O,ee){let $=h.get(ee);$===void 0&&($=new WeakMap,h.set(ee,$));let ge=$.get(O);ge===void 0&&(ge=i.getUniformBlockIndex(ee,O.name),i.uniformBlockBinding(ee,ge,ge),$.set(O,ge))}function Q(O,ee,$){let le=h.get(ee).get(O);l[le]!==$&&(i.bindBufferBase(i.UNIFORM_BUFFER,le,$),l[le]=$)}function me(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),c={},u={},k=null,G={},f={},l={},d=new WeakMap,p=[],v=null,m=!1,g=null,x=null,_=null,b=null,C=null,I=null,M=null,w=new Xe(0,0,0),A=0,y=!1,S=null,P=null,L=null,T=null,N=null,Y.set(0,0,i.canvas.width,i.canvas.height),ne.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ce,disable:Oe,bindFramebuffer:at,drawBuffers:Ne,useProgram:ot,setBlending:pt,setMaterial:ht,setFlipSided:Ut,setCullFace:bt,setLineWidth:gi,setPolygonOffset:$t,setScissorTest:Vn,activeTexture:Wn,bindTexture:Xn,unbindTexture:H,compressedTexImage2D:qn,compressedTexImage3D:Ct,texImage2D:E,texImage3D:X,pixelStorei:te,getParameter:oe,updateUBOMapping:K,uniformBlockBinding:Q,texStorage2D:Ye,texStorage3D:D,texSubImage2D:Pt,texSubImage3D:be,compressedTexSubImage2D:Xt,compressedTexSubImage3D:He,scissor:fe,viewport:_e,reset:me}}function vb(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Ae,c=new WeakMap,u=new Set,f,d=new WeakMap,p=new Set,v=new FinalizationRegistry(D=>p.delete(D)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,E){return m?new OffscreenCanvas(D,E):Yr("canvas")}function x(D,E,X){let oe=1,te=Ye(D);if((te.width>X||te.height>X)&&(oe=X/Math.max(te.width,te.height)),oe<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let fe=Math.floor(oe*te.width),_e=Math.floor(oe*te.height);f===void 0&&(f=g(fe,_e));let K=E?g(fe,_e):f;return K.width=fe,K.height=_e,K.getContext("2d").drawImage(D,0,0,fe,_e),Ge("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+fe+"x"+_e+")."),K}else return"data"in D&&Ge("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),D;return D}function _(D){return D.generateMipmaps}function b(D){i.generateMipmap(D)}function C(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function I(D,E,X,oe,te,fe=!1){if(D!==null){if(i[D]!==void 0)return i[D];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let _e;oe&&(_e=e.get("EXT_texture_norm16"),_e||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=E;if(E===i.RED&&(X===i.FLOAT&&(K=i.R32F),X===i.HALF_FLOAT&&(K=i.R16F),X===i.UNSIGNED_BYTE&&(K=i.R8),X===i.UNSIGNED_SHORT&&_e&&(K=_e.R16_EXT),X===i.SHORT&&_e&&(K=_e.R16_SNORM_EXT)),E===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(K=i.R8UI),X===i.UNSIGNED_SHORT&&(K=i.R16UI),X===i.UNSIGNED_INT&&(K=i.R32UI),X===i.BYTE&&(K=i.R8I),X===i.SHORT&&(K=i.R16I),X===i.INT&&(K=i.R32I)),E===i.RG&&(X===i.FLOAT&&(K=i.RG32F),X===i.HALF_FLOAT&&(K=i.RG16F),X===i.UNSIGNED_BYTE&&(K=i.RG8),X===i.UNSIGNED_SHORT&&_e&&(K=_e.RG16_EXT),X===i.SHORT&&_e&&(K=_e.RG16_SNORM_EXT)),E===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(K=i.RG8UI),X===i.UNSIGNED_SHORT&&(K=i.RG16UI),X===i.UNSIGNED_INT&&(K=i.RG32UI),X===i.BYTE&&(K=i.RG8I),X===i.SHORT&&(K=i.RG16I),X===i.INT&&(K=i.RG32I)),E===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(K=i.RGB8UI),X===i.UNSIGNED_SHORT&&(K=i.RGB16UI),X===i.UNSIGNED_INT&&(K=i.RGB32UI),X===i.BYTE&&(K=i.RGB8I),X===i.SHORT&&(K=i.RGB16I),X===i.INT&&(K=i.RGB32I)),E===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),X===i.UNSIGNED_INT&&(K=i.RGBA32UI),X===i.BYTE&&(K=i.RGBA8I),X===i.SHORT&&(K=i.RGBA16I),X===i.INT&&(K=i.RGBA32I)),E===i.RGB&&(X===i.UNSIGNED_SHORT&&_e&&(K=_e.RGB16_EXT),X===i.SHORT&&_e&&(K=_e.RGB16_SNORM_EXT),X===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),E===i.RGBA){let Q=fe?qr:rt.getTransfer(te);X===i.FLOAT&&(K=i.RGBA32F),X===i.HALF_FLOAT&&(K=i.RGBA16F),X===i.UNSIGNED_BYTE&&(K=Q===xt?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT&&_e&&(K=_e.RGBA16_EXT),X===i.SHORT&&_e&&(K=_e.RGBA16_SNORM_EXT),X===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function M(D,E){let X;return D?E===null||E===fi||E===Cs?X=i.DEPTH24_STENCIL8:E===Qn?X=i.DEPTH32F_STENCIL8:E===yr&&(X=i.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===fi||E===Cs?X=i.DEPTH_COMPONENT24:E===Qn?X=i.DEPTH_COMPONENT32F:E===yr&&(X=i.DEPTH_COMPONENT16),X}function w(D,E){return _(D)===!0||D.isFramebufferTexture&&D.minFilter!==tn&&D.minFilter!==Sn?Math.log2(Math.max(E.width,E.height))+1:D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?E.mipmaps.length:1}function A(D){let E=new WeakRef(D);n.get(D).__ref=E,p.add(E),v.register(D,E,E)}function y(D){let E=n.get(D).__ref;E!==void 0&&(p.delete(E),v.unregister(E))}function S(D){L(D.target)}function P(D){T(D.target)}function L(D){D.removeEventListener("dispose",S),y(D),U(D),D.isVideoTexture&&c.delete(D),D.isHTMLTexture&&u.delete(D)}function T(D){D.removeEventListener("dispose",P),y(D),J(D)}function N(){for(let D of p){let E=D.deref();E!==void 0&&(E.isRenderTarget===!0?T(E):L(E))}p.clear(),u.clear()}function U(D){let E=n.get(D);if(E.__webglInit===void 0)return;let X=D.source,oe=d.get(X);if(oe){let te=oe[E.__cacheKey];te.usedTimes--,te.usedTimes===0&&F(D),Object.keys(oe).length===0&&d.delete(X)}n.remove(D)}function F(D){let E=n.get(D);i.deleteTexture(E.__webglTexture);let X=D.source,oe=d.get(X);delete oe[E.__cacheKey],o.memory.textures--}function J(D){let E=n.get(D);E.__depthDisposeCallback&&E.__depthDisposeCallback();let X=D.depthTexture;if(X&&X.renderTarget===D&&L(X),D.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(E.__webglFramebuffer[te]))for(let fe=0;fe<E.__webglFramebuffer[te].length;fe++)i.deleteFramebuffer(E.__webglFramebuffer[te][fe]);else i.deleteFramebuffer(E.__webglFramebuffer[te]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[te])}else{if(Array.isArray(E.__webglFramebuffer))for(let te=0;te<E.__webglFramebuffer.length;te++)i.deleteFramebuffer(E.__webglFramebuffer[te]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let te=0;te<E.__webglColorRenderbuffer.length;te++)E.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[te]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let oe=D.textures;for(let te=0,fe=oe.length;te<fe;te++){let _e=n.get(oe[te]);_e.__webglTexture&&(i.deleteTexture(_e.__webglTexture),o.memory.textures--),n.remove(oe[te])}n.remove(D)}let B=0;function k(){B=0}function G(){return B}function ue(D){B=D}function he(){let D=B;return D>=s.maxTextures&&Ge("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+s.maxTextures),B+=1,D}function Y(D){let E=[];return E.push(D.wrapS),E.push(D.wrapT),E.push(D.wrapR||0),E.push(D.magFilter),E.push(D.minFilter),E.push(D.anisotropy),E.push(D.internalFormat),E.push(D.format),E.push(D.type),E.push(D.generateMipmaps),E.push(D.mipmapsAutoUpdate),E.push(D.premultiplyAlpha),E.push(D.flipY),E.push(D.unpackAlignment),E.push(D.colorSpace),E.join()}function ne(D,E){let X=n.get(D);if(D.isVideoTexture&&Xt(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&X.__version!==D.version){let oe=D.image;if(oe===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{ht(X,D,E);return}}else D.isExternalTexture&&(X.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+E)}function ve(D,E){let X=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&X.__version!==D.version){ht(X,D,E);return}else D.isExternalTexture&&(X.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+E)}function pe(D,E){let X=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&X.__version!==D.version){ht(X,D,E);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+E)}function ce(D,E){let X=n.get(D);if(D.version>0&&X.__version!==D.version){Ut(X,D,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+E)}let Oe={[Ya]:i.REPEAT,[yi]:i.CLAMP_TO_EDGE,[ja]:i.MIRRORED_REPEAT},at={[tn]:i.NEAREST,[fp]:i.NEAREST_MIPMAP_NEAREST,[To]:i.NEAREST_MIPMAP_LINEAR,[Sn]:i.LINEAR,[Rc]:i.LINEAR_MIPMAP_NEAREST,[zi]:i.LINEAR_MIPMAP_LINEAR},Ne={[gp]:i.NEVER,[du]:i.ALWAYS,[xp]:i.LESS,[uu]:i.LEQUAL,[_p]:i.EQUAL,[fu]:i.GEQUAL,[yp]:i.GREATER,[vp]:i.NOTEQUAL};function ot(D,E){if(E.type===Qn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Sn||E.magFilter===Rc||E.magFilter===To||E.magFilter===zi||E.minFilter===Sn||E.minFilter===Rc||E.minFilter===To||E.minFilter===zi)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,Oe[E.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,Oe[E.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,Oe[E.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,at[E.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,at[E.minFilter]),E.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,Ne[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===tn||E.minFilter!==To&&E.minFilter!==zi||E.type===Qn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function lt(D,E){let X=!1;D.__webglInit===void 0&&(D.__webglInit=!0,E.addEventListener("dispose",S),A(E));let oe=E.source,te=d.get(oe);te===void 0&&(te={},d.set(oe,te));let fe=Y(E);if(fe!==D.__cacheKey){te[fe]===void 0&&(te[fe]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,X=!0),te[fe].usedTimes++;let _e=te[D.__cacheKey];_e!==void 0&&(te[D.__cacheKey].usedTimes--,_e.usedTimes===0&&F(E)),D.__cacheKey=fe,D.__webglTexture=te[fe].texture}return X}function Qe(D,E,X){return Math.floor(Math.floor(D/X)/E)}function pt(D,E,X,oe){let fe=D.updateRanges;if(fe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,E.width,E.height,X,oe,E.data);else{fe.sort((O,ee)=>O.start-ee.start);let _e=0;for(let O=1;O<fe.length;O++){let ee=fe[_e],$=fe[O],ge=ee.start+ee.count,le=Qe($.start,E.width,4),de=Qe(ee.start,E.width,4);$.start<=ge+1&&le===de&&Qe($.start+$.count-1,E.width,4)===le?ee.count=Math.max(ee.count,$.start+$.count-ee.start):(++_e,fe[_e]=$)}fe.length=_e+1;let K=t.getParameter(i.UNPACK_ROW_LENGTH),Q=t.getParameter(i.UNPACK_SKIP_PIXELS),me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,E.width);for(let O=0,ee=fe.length;O<ee;O++){let $=fe[O],ge=Math.floor($.start/4),le=Math.ceil($.count/4),de=ge%E.width,ke=Math.floor(ge/E.width),Ze=le,ae=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,de),t.pixelStorei(i.UNPACK_SKIP_ROWS,ke),t.texSubImage2D(i.TEXTURE_2D,0,de,ke,Ze,ae,X,oe,E.data)}D.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,K),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(i.UNPACK_SKIP_ROWS,me)}}function ht(D,E,X){let oe=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(oe=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(oe=i.TEXTURE_3D);let te=lt(D,E),fe=E.source;t.bindTexture(oe,D.__webglTexture,i.TEXTURE0+X);let _e=n.get(fe);if(fe.version!==_e.__version||te===!0){if(t.activeTexture(i.TEXTURE0+X),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){let ae=rt.getPrimaries(rt.workingColorSpace),ze=E.colorSpace===Hi?null:rt.getPrimaries(E.colorSpace),Je=E.colorSpace===Hi||ae===ze?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je)}t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment);let Q=x(E.image,!1,s.maxTextureSize);Q=He(E,Q);let me=r.convert(E.format,E.colorSpace),O=r.convert(E.type),ee=I(E.internalFormat,me,O,E.normalized,E.colorSpace,E.isVideoTexture);ot(oe,E);let $,ge=E.mipmaps,le=E.isVideoTexture!==!0,de=_e.__version===void 0||te===!0,ke=fe.dataReady,Ze=w(E,Q);if(E.isDepthTexture)ee=M(E.format===Bi,E.type),de&&(le?t.texStorage2D(i.TEXTURE_2D,1,ee,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,ee,Q.width,Q.height,0,me,O,null));else if(E.isDataTexture)if(ge.length>0){le&&de&&t.texStorage2D(i.TEXTURE_2D,Ze,ee,ge[0].width,ge[0].height);for(let ae=0,ze=ge.length;ae<ze;ae++)$=ge[ae],le?ke&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,$.width,$.height,me,O,$.data):t.texImage2D(i.TEXTURE_2D,ae,ee,$.width,$.height,0,me,O,$.data);E.generateMipmaps=!1}else le?(de&&t.texStorage2D(i.TEXTURE_2D,Ze,ee,Q.width,Q.height),ke&&pt(E,Q,me,O)):t.texImage2D(i.TEXTURE_2D,0,ee,Q.width,Q.height,0,me,O,Q.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){le&&de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ze,ee,ge[0].width,ge[0].height,Q.depth);for(let ae=0,ze=ge.length;ae<ze;ae++)if($=ge[ae],E.format!==pi)if(me!==null)if(le){if(ke)if(E.layerUpdates.size>0){let Je=bu($.width,$.height,E.format,E.type);for(let Me of E.layerUpdates){let _t=$.data.subarray(Me*Je/$.data.BYTES_PER_ELEMENT,(Me+1)*Je/$.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,Me,$.width,$.height,1,me,_t)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,$.width,$.height,Q.depth,me,$.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,ee,$.width,$.height,Q.depth,0,$.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else le?ke&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,$.width,$.height,Q.depth,me,O,$.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,ee,$.width,$.height,Q.depth,0,me,O,$.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{le&&de&&t.texStorage2D(i.TEXTURE_2D,Ze,ee,ge[0].width,ge[0].height);for(let ae=0,ze=ge.length;ae<ze;ae++)$=ge[ae],E.format!==pi?me!==null?le?ke&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,$.width,$.height,me,$.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,ee,$.width,$.height,0,$.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?ke&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,$.width,$.height,me,O,$.data):t.texImage2D(i.TEXTURE_2D,ae,ee,$.width,$.height,0,me,O,$.data)}else if(E.isDataArrayTexture)if(le){if(de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ze,ee,Q.width,Q.height,Q.depth),ke)if(E.layerUpdates.size>0){let ae=bu(Q.width,Q.height,E.format,E.type);for(let ze of E.layerUpdates){let Je=Q.data.subarray(ze*ae/Q.data.BYTES_PER_ELEMENT,(ze+1)*ae/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ze,Q.width,Q.height,1,me,O,Je)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,me,O,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ee,Q.width,Q.height,Q.depth,0,me,O,Q.data);else if(E.isData3DTexture)le?(de&&t.texStorage3D(i.TEXTURE_3D,Ze,ee,Q.width,Q.height,Q.depth),ke&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,me,O,Q.data)):t.texImage3D(i.TEXTURE_3D,0,ee,Q.width,Q.height,Q.depth,0,me,O,Q.data);else if(E.isFramebufferTexture){if(de)if(le)t.texStorage2D(i.TEXTURE_2D,Ze,ee,Q.width,Q.height);else{let ae=Q.width,ze=Q.height;for(let Je=0;Je<Ze;Je++)t.texImage2D(i.TEXTURE_2D,Je,ee,ae,ze,0,me,O,null),ae>>=1,ze>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in i){let ae=i.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),Q.parentNode!==ae){ae.appendChild(Q),u.add(E),ae.onpaint=ze=>{let Je=ze.changedElements;for(let Me of u)Je.includes(Me.image)&&(Me.needsUpdate=!0)},ae.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{let Je=i.RGBA,Me=i.RGBA,_t=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Je,Me,_t,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ge.length>0){if(le&&de){let ae=Ye(ge[0]);t.texStorage2D(i.TEXTURE_2D,Ze,ee,ae.width,ae.height)}for(let ae=0,ze=ge.length;ae<ze;ae++)$=ge[ae],le?ke&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,me,O,$):t.texImage2D(i.TEXTURE_2D,ae,ee,me,O,$);E.generateMipmaps=!1}else if(le){if(de){let ae=Ye(Q);t.texStorage2D(i.TEXTURE_2D,Ze,ee,ae.width,ae.height)}ke&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,O,Q)}else t.texImage2D(i.TEXTURE_2D,0,ee,me,O,Q);_(E)&&E.mipmapsAutoUpdate===!0&&b(oe),_e.__version=fe.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function Ut(D,E,X){if(E.image.length!==6)return;let oe=lt(D,E),te=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+X);let fe=n.get(te);if(te.version!==fe.__version||oe===!0){t.activeTexture(i.TEXTURE0+X);let _e=rt.getPrimaries(rt.workingColorSpace),K=E.colorSpace===Hi?null:rt.getPrimaries(E.colorSpace),Q=E.colorSpace===Hi||_e===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let me=E.isCompressedTexture||E.image[0].isCompressedTexture,O=E.image[0]&&E.image[0].isDataTexture,ee=[];for(let Me=0;Me<6;Me++)!me&&!O?ee[Me]=x(E.image[Me],!0,s.maxCubemapSize):ee[Me]=O?E.image[Me].image:E.image[Me],ee[Me]=He(E,ee[Me]);let $=ee[0],ge=r.convert(E.format,E.colorSpace),le=r.convert(E.type),de=I(E.internalFormat,ge,le,E.normalized,E.colorSpace),ke=E.isVideoTexture!==!0,Ze=fe.__version===void 0||oe===!0,ae=te.dataReady,ze=w(E,$);ot(i.TEXTURE_CUBE_MAP,E);let Je;if(E.isDepthTexture){if(de=M(E.format===Bi,E.type),Ze)if(ke)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,de,$.width,$.height);else for(let Me=0;Me<6;Me++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,de,$.width,$.height,0,ge,le,null)}else if(me){ke&&Ze&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ze,de,$.width,$.height);for(let Me=0;Me<6;Me++){Je=ee[Me].mipmaps;for(let _t=0;_t<Je.length;_t++){let Kt=Je[_t];E.format!==pi?ge!==null?ke?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,_t,0,0,Kt.width,Kt.height,ge,Kt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,_t,de,Kt.width,Kt.height,0,Kt.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,_t,0,0,Kt.width,Kt.height,ge,le,Kt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,_t,de,Kt.width,Kt.height,0,ge,le,Kt.data)}}}else{if(Je=E.mipmaps,ke&&Ze){Je.length>0&&ze++;let Me=Ye(ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ze,de,Me.width,Me.height)}for(let Me=0;Me<6;Me++)if(O){ke?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,ee[Me].width,ee[Me].height,ge,le,ee[Me].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,de,ee[Me].width,ee[Me].height,0,ge,le,ee[Me].data);for(let _t=0;_t<Je.length;_t++){let Vi=Je[_t].image[Me].image;ke?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,_t+1,0,0,Vi.width,Vi.height,ge,le,Vi.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,_t+1,de,Vi.width,Vi.height,0,ge,le,Vi.data)}}else{ke?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,ge,le,ee[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,de,ge,le,ee[Me]);for(let _t=0;_t<Je.length;_t++){let Kt=Je[_t];ke?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,_t+1,0,0,ge,le,Kt.image[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,_t+1,de,ge,le,Kt.image[Me])}}}_(E)&&E.mipmapsAutoUpdate===!0&&b(i.TEXTURE_CUBE_MAP),fe.__version=te.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function bt(D,E,X,oe,te,fe){let _e=r.convert(X.format,X.colorSpace),K=r.convert(X.type),Q=I(X.internalFormat,_e,K,X.normalized,X.colorSpace),me=n.get(E),O=n.get(X);if(O.__renderTarget=E,!me.__hasExternalTextures){let ee=Math.max(1,E.width>>fe),$=Math.max(1,E.height>>fe);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,fe,Q,ee,$,E.depth,0,_e,K,null):t.texImage2D(te,fe,Q,ee,$,0,_e,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),be(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,oe,te,O.__webglTexture,0,Pt(E)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,oe,te,O.__webglTexture,fe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function gi(D,E,X){if(i.bindRenderbuffer(i.RENDERBUFFER,D),E.depthBuffer){let oe=E.depthTexture,te=oe&&oe.isDepthTexture?oe.type:null,fe=M(E.stencilBuffer,te),_e=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;be(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt(E),fe,E.width,E.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt(E),fe,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,fe,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,_e,i.RENDERBUFFER,D)}else{let oe=E.textures;for(let te=0;te<oe.length;te++){let fe=oe[te],_e=r.convert(fe.format,fe.colorSpace),K=r.convert(fe.type),Q=I(fe.internalFormat,_e,K,fe.normalized,fe.colorSpace);be(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt(E),Q,E.width,E.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt(E),Q,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Q,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function $t(D,E,X){let oe=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let te=n.get(E.depthTexture);te.__renderTarget=E;let fe=oe?E.depthTexture.image[0]:E.depthTexture.image;(!te.__webglTexture||fe.width!==E.width||fe.height!==E.height)&&(fe.width=E.width,fe.height=E.height,E.depthTexture.needsUpdate=!0),oe?ce(E.depthTexture,0):ne(E.depthTexture,0);let _e=te.__webglTexture,K=Pt(E),Q=oe?i.TEXTURE_CUBE_MAP_POSITIVE_X+X:i.TEXTURE_2D,me=E.depthTexture.format===Bi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(E.depthTexture.format===Ui)be(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,me,Q,_e,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,me,Q,_e,0);else if(E.depthTexture.format===Bi)be(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,me,Q,_e,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,me,Q,_e,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Vn(D){let E=n.get(D),X=D.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==D.depthTexture){let oe=D.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),oe){let te=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,oe.removeEventListener("dispose",te)};oe.addEventListener("dispose",te),E.__depthDisposeCallback=te}E.__boundDepthTexture=oe}if(D.depthTexture&&!E.__autoAllocateDepthBuffer)if(X)for(let oe=0;oe<6;oe++)$t(E.__webglFramebuffer[oe],D,oe);else D.texture.mipmaps.length>0?$t(E.__webglFramebuffer[0],D,0):$t(E.__webglFramebuffer,D,0);else if(X){E.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[oe]),E.__webglDepthbuffer[oe]===void 0)E.__webglDepthbuffer[oe]=i.createRenderbuffer(),gi(E.__webglDepthbuffer[oe],D,!1);else{let te=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=E.__webglDepthbuffer[oe];i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,fe)}}else if(D.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),gi(E.__webglDepthbuffer,D,!1);else{let te=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,fe)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Wn(D,E,X){let oe=n.get(D);E!==void 0&&bt(oe.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&Vn(D)}function Xn(D){let E=D.texture,X=n.get(D),oe=n.get(E);D.addEventListener("dispose",P),A(D);let te=D.textures,fe=D.isWebGLCubeRenderTarget===!0,_e=te.length>1;if(_e||(oe.__webglTexture===void 0&&(oe.__webglTexture=i.createTexture()),oe.__version=E.version,o.memory.textures++),fe){X.__webglFramebuffer=[];for(let K=0;K<6;K++)if(E.mipmaps.length>0){X.__webglFramebuffer[K]=[];for(let Q=0;Q<E.mipmaps.length;Q++)X.__webglFramebuffer[K][Q]=i.createFramebuffer()}else X.__webglFramebuffer[K]=i.createFramebuffer()}else{if(E.mipmaps.length>0){X.__webglFramebuffer=[];for(let K=0;K<E.mipmaps.length;K++)X.__webglFramebuffer[K]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(_e)for(let K=0,Q=te.length;K<Q;K++){let me=n.get(te[K]);me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&be(D)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let K=0;K<te.length;K++){let Q=te[K];X.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[K]);let me=r.convert(Q.format,Q.colorSpace),O=r.convert(Q.type),ee=I(Q.internalFormat,me,O,Q.normalized,Q.colorSpace,D.isXRRenderTarget===!0),$=Pt(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,$,ee,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,X.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),gi(X.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(fe){t.bindTexture(i.TEXTURE_CUBE_MAP,oe.__webglTexture),ot(i.TEXTURE_CUBE_MAP,E);for(let K=0;K<6;K++)if(E.mipmaps.length>0)for(let Q=0;Q<E.mipmaps.length;Q++)bt(X.__webglFramebuffer[K][Q],D,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Q);else bt(X.__webglFramebuffer[K],D,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);_(E)?b(i.TEXTURE_CUBE_MAP):E.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),t.unbindTexture()}else if(_e){for(let K=0,Q=te.length;K<Q;K++){let me=te[K],O=n.get(me),ee=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ee=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,O.__webglTexture),ot(ee,me),bt(X.__webglFramebuffer,D,me,i.COLOR_ATTACHMENT0+K,ee,0),_(me)&&b(ee)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(K=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,oe.__webglTexture),ot(K,E),E.mipmaps.length>0)for(let Q=0;Q<E.mipmaps.length;Q++)bt(X.__webglFramebuffer[Q],D,E,i.COLOR_ATTACHMENT0,K,Q);else bt(X.__webglFramebuffer,D,E,i.COLOR_ATTACHMENT0,K,0);_(E)?b(K):E.mipmaps.length>0&&i.texParameteri(K,i.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),t.unbindTexture()}D.depthBuffer&&Vn(D)}function H(D){let E=D.textures;for(let X=0,oe=E.length;X<oe;X++){let te=E[X];if(_(te)&&te.mipmapsAutoUpdate===!0){let fe=C(D),_e=n.get(te).__webglTexture;t.bindTexture(fe,_e),b(fe),t.unbindTexture()}}}let qn=[];function Ct(D){if(D.samples>0){if(be(D)===!1){let E=D.textures,X=D.width,oe=D.height,te=i.COLOR_BUFFER_BIT,fe=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=n.get(D),K=E.length>1;if(K)for(let me=0;me<E.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),D.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let me=0;me<E.length;me++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_e.__webglColorRenderbuffer[me]);let O=n.get(E[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,O,0)}i.blitFramebuffer(0,0,X,oe,0,0,X,oe,te,i.NEAREST),l===!0&&(qn.length=0,qn.push(i.COLOR_ATTACHMENT0+me),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&qn.push(fe),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,qn))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let me=0;me<E.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,_e.__webglColorRenderbuffer[me]);let O=n.get(E[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,O,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&l){let E=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function Pt(D){return Math.min(s.maxSamples,D.samples)}function be(D){let E=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Xt(D){let E=o.render.frame;c.get(D)!==E&&(c.set(D,E),D.update())}function He(D,E){let X=D.colorSpace,oe=D.format,te=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||X!==Xr&&X!==Hi&&(rt.getTransfer(X)===xt?(oe!==pi||te!==Pn)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):We("WebGLTextures: Unsupported texture color space:",X)),E}function Ye(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(h.width=D.naturalWidth||D.width,h.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(h.width=D.displayWidth,h.height=D.displayHeight):(h.width=D.width,h.height=D.height),h}this.allocateTextureUnit=he,this.resetTextureUnits=k,this.getTextureUnits=G,this.setTextureUnits=ue,this.setTexture2D=ne,this.setTexture2DArray=ve,this.setTexture3D=pe,this.setTextureCube=ce,this.rebindTextures=Wn,this.setupRenderTarget=Xn,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Vn,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=be,this.dispose=N}function bb(i,e){function t(n,s=Hi){let r,o=rt.getTransfer(s);if(n===Pn)return i.UNSIGNED_BYTE;if(n===Pc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ic)return i.UNSIGNED_SHORT_5_5_5_1;if(n===au)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===cu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ru)return i.BYTE;if(n===ou)return i.SHORT;if(n===yr)return i.UNSIGNED_SHORT;if(n===Cc)return i.INT;if(n===fi)return i.UNSIGNED_INT;if(n===Qn)return i.FLOAT;if(n===di)return i.HALF_FLOAT;if(n===lu)return i.ALPHA;if(n===hu)return i.RGB;if(n===pi)return i.RGBA;if(n===Ui)return i.DEPTH_COMPONENT;if(n===Bi)return i.DEPTH_STENCIL;if(n===Lc)return i.RED;if(n===Dc)return i.RED_INTEGER;if(n===ls)return i.RG;if(n===Nc)return i.RG_INTEGER;if(n===Uc)return i.RGBA_INTEGER;if(n===Eo||n===Ao||n===wo||n===Ro)if(o===xt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Eo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Eo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ao)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ro)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Oc||n===Fc||n===kc||n===zc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Oc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===kc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===zc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Bc||n===Hc||n===Gc||n===Vc||n===Wc||n===Co||n===Xc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Bc||n===Hc)return o===xt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Gc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Vc)return r.COMPRESSED_R11_EAC;if(n===Wc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Co)return r.COMPRESSED_RG11_EAC;if(n===Xc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===qc||n===Yc||n===jc||n===Jc||n===Zc||n===$c||n===Kc||n===Qc||n===el||n===tl||n===nl||n===il||n===sl||n===rl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===qc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Yc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===jc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Jc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Zc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$c)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Kc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===el)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===tl)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===nl)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===il)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===sl)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===rl)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ol||n===al||n===cl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ol)return o===xt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===al)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===cl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ll||n===hl||n===Po||n===ul)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ll)return r.COMPRESSED_RED_RGTC1_EXT;if(n===hl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Po)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ul)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Cs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Mb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Uu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ro(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Kn({vertexShader:Mb,fragmentShader:Sb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Be(new ss(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ou=class extends vi{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,h=null,c=null,u=null,f=null,d=null,p=null,v=typeof XRWebGLBinding<"u",m=new Uu,g={},x=t.getContextAttributes(),_=null,b=null,C=[],I=[],M=new Ae,w=null,A=null,y=new bn;y.viewport=new It;let S=new bn;S.viewport=new It;let P=[y,S],L=new Mc,T=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ne=C[Y];return ne===void 0&&(ne=new or,C[Y]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(Y){let ne=C[Y];return ne===void 0&&(ne=new or,C[Y]=ne),ne.getGripSpace()},this.getHand=function(Y){let ne=C[Y];return ne===void 0&&(ne=new or,C[Y]=ne),ne.getHandSpace()};function U(Y){let ne=I.indexOf(Y.inputSource);if(ne===-1)return;let ve=C[ne];ve!==void 0&&(ve.update(Y.inputSource,Y.frame,h||o),ve.dispatchEvent({type:Y.type,data:Y.inputSource}))}function F(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",J);for(let Y=0;Y<C.length;Y++){let ne=I[Y];ne!==null&&(I[Y]=null,C[Y].disconnect(ne))}T=null,N=null,m.reset();for(let Y in g)delete g[Y];if(e.setRenderTarget(_),d=null,f=null,u=null,s=null,b=null,he.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(M.width,M.height,!1),A!==null){let Y=A.camera;Y.fov=A.fov,Y.zoom=A.zoom,Y.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(Y){h=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(_=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",F),s.addEventListener("inputsourceschange",J),x.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(M),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,pe=null,ce=null;x.depth&&(ce=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=x.stencil?Bi:Ui,pe=x.stencil?Cs:fi);let Oe={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Oe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new Fn(f.textureWidth,f.textureHeight,{format:pi,type:Pn,depthTexture:new ki(f.textureWidth,f.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let ve={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ve),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new Fn(d.framebufferWidth,d.framebufferHeight,{format:pi,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),h=null,o=await s.requestReferenceSpace(a),he.setContext(s),he.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function J(Y){for(let ne=0;ne<Y.removed.length;ne++){let ve=Y.removed[ne],pe=I.indexOf(ve);pe>=0&&(I[pe]=null,C[pe].disconnect(ve))}for(let ne=0;ne<Y.added.length;ne++){let ve=Y.added[ne],pe=I.indexOf(ve);if(pe===-1){for(let Oe=0;Oe<C.length;Oe++)if(Oe>=I.length){I.push(ve),pe=Oe;break}else if(I[Oe]===null){I[Oe]=ve,pe=Oe;break}if(pe===-1)break}let ce=C[pe];ce&&ce.connect(ve)}}function B(Y,ne){ne===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ne.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let ne=Y.near,ve=Y.far;m.texture!==null&&(m.depthNear>0&&(ne=m.depthNear),m.depthFar>0&&(ve=m.depthFar)),L.near=S.near=y.near=ne,L.far=S.far=y.far=ve,(T!==L.near||N!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),T=L.near,N=L.far),L.layers.mask=Y.layers.mask|6,y.layers.mask=L.layers.mask&-5,S.layers.mask=L.layers.mask&-3;let pe=Y.parent,ce=L.cameras;B(L,pe);for(let Oe=0;Oe<ce.length;Oe++)B(ce[Oe],pe);L.projectionMatrix.copy(y.projectionMatrix),L.projectionMatrixInverse.copy(y.projectionMatrixInverse),A===null&&Y.isPerspectiveCamera&&(A={camera:Y,fov:Y.fov,zoom:Y.zoom}),k(Y,L,pe)};function k(Y,ne,ve){ve===null?Y.matrix.copy(ne.matrixWorld):(Y.matrix.copy(ve.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ne.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ne.projectionMatrix),Y.projectionMatrixInverse.copy(ne.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Za*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(Y){return g[Y]};let G=null;function ue(Y,ne){if(c=ne.getViewerPose(h||o),p=ne,c!==null){let ve=c.views;d!==null&&(e.setRenderTargetFramebuffer(b,d.framebuffer),e.setRenderTarget(b));let pe=!1;ve.length!==L.cameras.length&&(L.cameras.length=0,pe=!0);for(let Ne=0;Ne<ve.length;Ne++){let ot=ve[Ne],lt=null;if(d!==null)lt=d.getViewport(ot);else{let pt=u.getViewSubImage(f,ot);lt=pt.viewport,Ne===0&&(e.setRenderTargetTextures(b,pt.colorTexture,pt.depthStencilTexture),e.setRenderTarget(b))}let Qe=P[Ne];Qe===void 0&&(Qe=new bn,Qe.layers.enable(Ne),Qe.viewport=new It,P[Ne]=Qe),Qe.matrix.fromArray(ot.transform.matrix),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Qe.projectionMatrix.fromArray(ot.projectionMatrix),Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(),Qe.viewport.set(lt.x,lt.y,lt.width,lt.height),Ne===0&&(L.matrix.copy(Qe.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),pe===!0&&L.cameras.push(Qe)}let ce=s.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let Ne=u.getDepthInformation(ve[0]);Ne&&Ne.isValid&&Ne.texture&&m.init(Ne,s.renderState)}if(ce&&ce.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let Ne=0;Ne<ve.length;Ne++){let ot=ve[Ne].camera;if(ot){let lt=g[ot];lt||(lt=new ro,g[ot]=lt);let Qe=u.getCameraImage(ot);lt.sourceTexture=Qe}}}}for(let ve=0;ve<C.length;ve++){let pe=I[ve],ce=C[ve];pe!==null&&ce!==void 0&&ce.update(pe,ne,h||o)}G&&G(Y,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),p=null}let he=new nm;he.setAnimationLoop(ue),this.setAnimationLoop=function(Y){G=Y},this.dispose=function(){}}},Tb=new ft,fm=new qe;fm.set(-1,0,0,0,1,0,0,0,1);function Eb(i,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,_u(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,x,_,b){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),c(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,b)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),v(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,x,_):g.isSpriteMaterial?h(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Tn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Tn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let x=e.get(g),_=x.envMap,b=x.envMapRotation;_&&(m.envMap.value=_,m.envMapRotation.value.setFromMatrix4(Tb.makeRotationFromEuler(b)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(fm),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,x,_){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*x,m.scale.value=_*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,x){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,t(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Tn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){let x=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ab(i,e,t,n){let s={},r={};function o(x,_){let b=_.program;n.uniformBlockBinding(x,b,s[x.id])}function a(x,_){let b=s[x.id];b===void 0&&(p(x),b=l(x),s[x.id]=b,x.addEventListener("dispose",m));let C=_.program;n.updateUBOMapping(x,C);let I=e.render.frame;r[x.id]!==I&&(h(x),r[x.id]=I)}function l(x){let _=i.createBuffer(),b=x.__size,C=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,b,C),i.bindBuffer(i.UNIFORM_BUFFER,null),_}function h(x){let _=s[x.id],b=x.uniforms,C=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let I=0,M=b.length;I<M;I++){let w=b[I];if(Array.isArray(w))for(let A=0,y=w.length;A<y;A++)c(w[A],I,A,C);else c(w,I,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function c(x,_,b,C){if(f(x,_,b,C)===!0){let I=x.__offset,M=x.value;if(Array.isArray(M)){let w=0;for(let A=0;A<M.length;A++){let y=M[A],S=v(y,!0);u(y,x.__data,w),w+=S.storage/Float32Array.BYTES_PER_ELEMENT}}else u(M,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,I,x.__data)}}function u(x,_,b){typeof x=="number"||typeof x=="boolean"?_[b]=x:x.isMatrix3?(_[b]=x.elements[0],_[b+1]=x.elements[1],_[b+2]=x.elements[2],_[b+3]=0,_[b+4]=x.elements[3],_[b+5]=x.elements[4],_[b+6]=x.elements[5],_[b+7]=0,_[b+8]=x.elements[6],_[b+9]=x.elements[7],_[b+10]=x.elements[8],_[b+11]=0):ArrayBuffer.isView(x)?_.set(x.subarray(0,_.length-b),b):x.toArray(_,b)}function f(x,_,b,C){let I=x.value,M=_+"_"+b;if(Array.isArray(I)){C[M]===void 0&&(C[M]=[]);let w=C[M],A=!1;for(let y=0;y<I.length;y++)d(I[y],w,y)===!0&&(A=!0);return A}return d(I,C,M)}function d(x,_,b){if(_[b]===void 0)return typeof x=="number"||typeof x=="boolean"?_[b]=x:ArrayBuffer.isView(x)?_[b]=x.slice():_[b]=x.clone(),!0;{let C=_[b];if(typeof x=="number"||typeof x=="boolean"){if(C!==x)return _[b]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(C.equals(x)===!1)return C.copy(x),!0}}return!1}function p(x){let _=x.uniforms,b=0,C=16;for(let M=0,w=_.length;M<w;M++){let A=Array.isArray(_[M])?_[M]:[_[M]];for(let y=0,S=A.length;y<S;y++){let P=A[y],L=Array.isArray(P.value)?P.value:[P.value],T=Array.isArray(_[M])||Array.isArray(P.value),N=b;for(let F=0,J=L.length;F<J;F++){let B=L[F],k=v(B,T),G=b%C,ue=G%k.boundary,he=G+ue;b+=ue,he!==0&&C-he<k.storage&&(b+=C-he),F===0&&(N=b),b+=k.storage}let U=P.type==="int"?Int32Array:P.type==="uint"?Uint32Array:Float32Array;P.__data=new U((b-N)/Float32Array.BYTES_PER_ELEMENT),P.__offset=N}}let I=b%C;return I>0&&(b+=C-I),x.__size=b,x.__cache={},this}function v(x,_){let b={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(b.boundary=4,b.storage=4):x.isVector2?(b.boundary=8,b.storage=8):x.isVector3||x.isColor?(b.boundary=16,b.storage=12):x.isVector4?(b.boundary=16,b.storage=16):x.isMatrix3?(b.boundary=16,b.storage=48):x.isMatrix4?(b.boundary=16,b.storage=64):x.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(b.boundary=16,b.storage=x.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",x),_===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function m(x){let _=x.target;_.removeEventListener("dispose",m),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function g(){for(let x in s)i.deleteBuffer(s[x]);s={},r={}}return{bind:o,update:a,dispose:g}}var wb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ti=null;function Rb(){return Ti===null&&(Ti=new to(wb,16,16,ls,di),Ti.name="DFG_LUT",Ti.minFilter=Sn,Ti.magFilter=Sn,Ti.wrapS=yi,Ti.wrapT=yi,Ti.generateMipmaps=!1,Ti.needsUpdate=!0),Ti}var gl=class{constructor(e={}){let{canvas:t=Mp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Pn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let v=d,m=new Set([Uc,Nc,Dc]),g=new Set([Pn,fi,yr,Cs,Pc,Ic]),x=new Uint32Array(4),_=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]},C=null,I=null,M=[],w=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,S=!1,P=null,L=null,T=null,N=null;this._outputColorSpace=On;let U=0,F=0,J=null,B=-1,k=null,G=new It,ue=new It,he=null,Y=new Xe(0),ne=0,ve=t.width,pe=t.height,ce=1,Oe=null,at=null,Ne=new It(0,0,ve,pe),ot=new It(0,0,ve,pe),lt=!1,Qe=new is,pt=new ec,ht=!1,Ut=!1,bt=new ft,gi=new V,$t=new It,Vn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Wn=!1;function Xn(){return J===null?ce:1}let H=n;function qn(R,z){return t.getContext(R,z)}let Ct,Pt,be,Xt,He,Ye,D,E,X,oe,te,fe,_e,K,Q,me,O,ee,$,ge,le,de,ke;try{let R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",ze,!1),t.addEventListener("webglcontextrestored",Je,!1),t.addEventListener("webglcontextcreationerror",Me,!1),H===null){let z="webgl2";if(H=qn(z,R),H===null)throw qn(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ze()}catch(R){throw t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",Je,!1),t.removeEventListener("webglcontextcreationerror",Me,!1),We("WebGLRenderer: "+R.message),R}function Ze(){Ct=new zy(H),Ct.init(),le=new bb(H,Ct),Pt=new Ry(H,Ct,e,le),be=new yb(H,Ct),Pt.reversedDepthBuffer&&f&&be.buffers.depth.setReversed(!0),L=H.createFramebuffer(),T=H.createFramebuffer(),N=H.createFramebuffer(),Xt=new Gy(H),He=new rb,Ye=new vb(H,Ct,be,He,Pt,le,Xt),D=new ky(y),E=new Wg(H),de=new Ay(H,E),X=new By(H,E,Xt,de),oe=new Wy(H,X,E,de,Xt),ee=new Vy(H,Pt,Ye),Q=new Cy(He),te=new sb(y,D,Ct,Pt,de,Q),fe=new Eb(y,He),_e=new ab,K=new db(Ct),O=new Ey(y,D,be,oe,p,l),me=new _b(y,oe,Pt),ke=new Ab(H,Xt,Pt,be),$=new wy(H,Ct,Xt),ge=new Hy(H,Ct,Xt),Xt.programs=te.programs,y.capabilities=Pt,y.extensions=Ct,y.properties=He,y.renderLists=_e,y.shadowMap=me,y.state=be,y.info=Xt}v!==Pn&&(A=new qy(v,t.width,t.height,a,s,r));let ae=new Ou(y,H);this.xr=ae,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let R=Ct.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=Ct.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(R){R!==void 0&&(ce=R,this.setSize(ve,pe,!1))},this.getSize=function(R){return R.set(ve,pe)},this.setSize=function(R,z,j=!0){if(ae.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}ve=R,pe=z,t.width=Math.floor(R*ce),t.height=Math.floor(z*ce),j===!0&&(t.style.width=R+"px",t.style.height=z+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,R,z)},this.getDrawingBufferSize=function(R){return R.set(ve*ce,pe*ce).floor()},this.setDrawingBufferSize=function(R,z,j){ve=R,pe=z,ce=j,t.width=Math.floor(R*j),t.height=Math.floor(z*j),this.setViewport(0,0,R,z)},this.setEffects=function(R){if(v===Pn){We("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let z=0;z<R.length;z++)if(R[z].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(G)},this.getViewport=function(R){return R.copy(Ne)},this.setViewport=function(R,z,j,W){R.isVector4?Ne.set(R.x,R.y,R.z,R.w):Ne.set(R,z,j,W),be.viewport(G.copy(Ne).multiplyScalar(Xn()).round())},this.getScissor=function(R){return R.copy(ot)},this.setScissor=function(R,z,j,W){R.isVector4?ot.set(R.x,R.y,R.z,R.w):ot.set(R,z,j,W),be.scissor(ue.copy(ot).multiplyScalar(Xn()).round())},this.getScissorTest=function(){return lt},this.setScissorTest=function(R){be.setScissorTest(lt=R)},this.setOpaqueSort=function(R){Oe=R},this.setTransparentSort=function(R){at=R},this.getClearColor=function(R){return R.copy(O.getClearColor())},this.setClearColor=function(){O.setClearColor(...arguments)},this.getClearAlpha=function(){return O.getClearAlpha()},this.setClearAlpha=function(){O.setClearAlpha(...arguments)},this.clear=function(R=!0,z=!0,j=!0){let W=0;if(R){let q=!1;if(J!==null){let ye=J.texture.format;q=m.has(ye)}if(q){let ye=J.texture.type,we=g.has(ye),xe=O.getClearColor(),Ee=O.getClearAlpha(),Ue=xe.r,je=xe.g,nt=xe.b;we?(x[0]=Ue,x[1]=je,x[2]=nt,x[3]=Ee,H.clearBufferuiv(H.COLOR,0,x)):(_[0]=Ue,_[1]=je,_[2]=nt,_[3]=Ee,H.clearBufferiv(H.COLOR,0,_))}else W|=H.COLOR_BUFFER_BIT}z&&(W|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(W|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&H.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),P=R},this.dispose=function(){t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",Je,!1),t.removeEventListener("webglcontextcreationerror",Me,!1),O.dispose(),_e.dispose(),K.dispose(),Ye.dispose(),He.dispose(),D.dispose(),oe.dispose(),X.dispose(),de.dispose(),ke.dispose(),te.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Wf),ae.removeEventListener("sessionend",Xf),ms.stop()};function ze(R){R.preventDefault(),mu("WebGLRenderer: Context Lost."),S=!0}function Je(){mu("WebGLRenderer: Context Restored."),S=!1;let R=Xt.autoReset,z=me.enabled,j=me.autoUpdate,W=me.needsUpdate,q=me.type;Ze(),Xt.autoReset=R,me.enabled=z,me.autoUpdate=j,me.needsUpdate=W,me.type=q}function Me(R){We("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function _t(R){let z=R.target;z.removeEventListener("dispose",_t),Kt(z)}function Kt(R){Vi(R),He.remove(R)}function Vi(R){let z=He.get(R).programs;z!==void 0&&(z.forEach(function(j){te.releaseProgram(j)}),R.isShaderMaterial&&te.releaseShaderCache(R))}this.renderBufferDirect=function(R,z,j,W,q,ye){z===null&&(z=Vn);let we=q.isMesh&&q.matrixWorld.determinantAffine()<0,xe=f0(R,z,j,W,q);be.setMaterial(W,we);let Ee=j.index,Ue=1;if(W.wireframe===!0){if(Ee=X.getWireframeAttribute(j),Ee===void 0)return;Ue=2}let je=j.drawRange,nt=j.attributes.position,Re=je.start*Ue,it=(je.start+je.count)*Ue;ye!==null&&(Re=Math.max(Re,ye.start*Ue),it=Math.min(it,(ye.start+ye.count)*Ue)),Ee!==null?(Re=Math.max(Re,0),it=Math.min(it,Ee.count)):nt!=null&&(Re=Math.max(Re,0),it=Math.min(it,nt.count));let kt=it-Re;if(kt<0||kt===1/0)return;de.setup(q,W,xe,j,Ee);let St,Mt=$;if(Ee!==null&&(St=E.get(Ee),Mt=ge,Mt.setIndex(St)),q.isMesh)W.wireframe===!0?(be.setLineWidth(W.wireframeLinewidth*Xn()),Mt.setMode(H.LINES)):Mt.setMode(H.TRIANGLES);else if(q.isLine){let ln=W.linewidth;ln===void 0&&(ln=1),be.setLineWidth(ln*Xn()),q.isLineSegments?Mt.setMode(H.LINES):q.isLineLoop?Mt.setMode(H.LINE_LOOP):Mt.setMode(H.LINE_STRIP)}else q.isPoints?Mt.setMode(H.POINTS):q.isSprite&&Mt.setMode(H.TRIANGLES);if(q.isBatchedMesh)if(Ct.get("WEBGL_multi_draw"))Mt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let ln=q._multiDrawStarts,Ce=q._multiDrawCounts,xn=q._multiDrawCount,mt=Ee?E.get(Ee).bytesPerElement:1,gs=He.get(W).currentProgram.getUniforms();for(let hn=0;hn<xn;hn++)gs.setValue(H,"_gl_DrawID",hn),Mt.render(ln[hn]/mt,Ce[hn])}else if(q.isInstancedMesh)Mt.renderInstances(Re,kt,q.count);else if(j.isInstancedBufferGeometry){let ln=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Ce=Math.min(j.instanceCount,ln);Mt.renderInstances(Re,kt,Ce)}else Mt.render(Re,kt)};function Vf(R,z,j,W){P!==null&&R.isNodeMaterial&&P.setObject(W,R),ht===!0&&Q.setState(R,j,!1),R.transparent===!0&&R.side===nn&&R.forceSinglePass===!1?(R.side=Tn,R.needsUpdate=!0,Rr(R,z,W),R.side=cs,R.needsUpdate=!0,Rr(R,z,W),R.side=nn):Rr(R,z,W)}this.compile=function(R,z,j=null){j===null&&(j=R),P!==null&&P.renderStart(R,z,j),I=K.get(j),I.init(z),w.push(I),j.traverseVisible(function(q){q.isLight&&q.layers.test(z.layers)&&(I.pushLight(q),q.castShadow&&I.pushShadow(q))}),R!==j&&R.traverseVisible(function(q){q.isLight&&q.layers.test(z.layers)&&(I.pushLight(q),q.castShadow&&I.pushShadow(q))}),I.setupLights(),P!==null&&P.updateLights(I.state.lightsArray),Ut=this.localClippingEnabled,ht=Q.init(this.clippingPlanes,Ut),ht===!0&&Q.setGlobalState(this.clippingPlanes,z),P!==null&&me.render(I.state.shadowsArray,j,z);let W=new Set;return R.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let ye=q.material;if(ye)if(Array.isArray(ye))for(let we=0;we<ye.length;we++){let xe=ye[we];Vf(xe,j,z,q),W.add(xe)}else Vf(ye,j,z,q),W.add(ye)}),I=w.pop(),P!==null&&P.renderEnd(),W},this.compileAsync=function(R,z,j=null){let W=this.compile(R,z,j);return new Promise(q=>{function ye(){if(W.forEach(function(we){let Ee=He.get(we).currentProgram;(Ee===void 0||Ee.isReady())&&W.delete(we)}),W.size===0){q(R);return}setTimeout(ye,10)}Ct.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let ih=null;function h0(R){ih&&ih(R)}function Wf(){ms.stop()}function Xf(){ms.start()}let ms=new nm;ms.setAnimationLoop(h0),typeof self<"u"&&ms.setContext(self),this.setAnimationLoop=function(R){ih=R,ae.setAnimationLoop(R),R===null?ms.stop():ms.start()},ae.addEventListener("sessionstart",Wf),ae.addEventListener("sessionend",Xf),this.render=function(R,z){if(z!==void 0&&z.isCamera!==!0){We("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;P!==null&&P.renderStart(R,z);let j=ae.enabled===!0&&ae.isPresenting===!0,W=A!==null&&(J===null||j)&&A.begin(y,J);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(z),z=ae.getCamera()),R.isScene===!0&&R.onBeforeRender(y,R,z,J),I=K.get(R,w.length),I.init(z),I.state.textureUnits=Ye.getTextureUnits(),w.push(I),bt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),z.isArrayCamera?pt.setFromArrayCamera(z):Qe.setFromProjectionMatrix(bt,$n,z.reversedDepth),Ut=this.localClippingEnabled,ht=Q.init(this.clippingPlanes,Ut),C=_e.get(R,M.length),C.init(),M.push(C),this.info.render.frame++,ae.enabled===!0&&ae.isPresenting===!0){let we=y.xr.getDepthSensingMesh();we!==null&&sh(we,z,-1/0,y.sortObjects)}sh(R,z,0,y.sortObjects),C.finish(),P!==null&&P.updateLights(I.state.lightsArray),y.sortObjects===!0&&C.sort(Oe,at),Wn=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,Wn&&O.addToRenderList(C,R),this.info.autoReset===!0&&this.info.reset(),ht===!0&&Q.beginShadows();let q=I.state.shadowsArray;if(me.render(q,R,z),ht===!0&&Q.endShadows(),(W&&A.hasRenderPass())===!1){let we=C.opaque,xe=C.transmissive;if(I.setupLights(),z.isArrayCamera){let Ee=z.cameras;if(xe.length>0)for(let Ue=0,je=Ee.length;Ue<je;Ue++){let nt=Ee[Ue];Yf(we,xe,R,nt)}Wn&&O.render(R);for(let Ue=0,je=Ee.length;Ue<je;Ue++){let nt=Ee[Ue];qf(C,R,nt,nt.viewport)}}else xe.length>0&&Yf(we,xe,R,z),Wn&&O.render(R),qf(C,R,z)}J!==null&&F===0&&(Ye.updateMultisampleRenderTarget(J),Ye.updateRenderTargetMipmap(J)),W&&A.end(y),R.isScene===!0&&R.onAfterRender(y,R,z),de.resetDefaultState(),B=-1,k=null,w.pop(),w.length>0?(I=w[w.length-1],Ye.setTextureUnits(I.state.textureUnits),ht===!0&&Q.setGlobalState(y.clippingPlanes,I.state.camera)):I=null,M.pop(),M.length>0?C=M[M.length-1]:C=null,P!==null&&P.renderEnd()};function sh(R,z,j,W){if(R.visible===!1)return;if(R.layers.test(z.layers)){if(R.isGroup)j=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(z);else if(R.isLight)I.pushLight(R),R.castShadow&&I.pushShadow(R);else if(R.isSprite){let we=z.isArrayCamera?pt:Qe;if(!R.frustumCulled||R.intersectsFrustum(we)){W&&$t.setFromMatrixPosition(R.matrixWorld).applyMatrix4(bt);let xe=oe.update(R),Ee=R.material;Ee.visible&&C.push(R,xe,Ee,j,$t.z,null,z)}}else if(R.isMesh||R.isLine||R.isPoints){let we=z.isArrayCamera?pt:Qe;if(!R.frustumCulled||R.intersectsFrustum(we)){let xe=oe.update(R),Ee=R.material;if(W&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),$t.copy(R.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),$t.copy(xe.boundingSphere.center)),$t.applyMatrix4(R.matrixWorld).applyMatrix4(bt)),Array.isArray(Ee)){let Ue=xe.groups;for(let je=0,nt=Ue.length;je<nt;je++){let Re=Ue[je],it=Ee[Re.materialIndex];it&&it.visible&&C.push(R,xe,it,j,$t.z,Re,z)}}else Ee.visible&&C.push(R,xe,Ee,j,$t.z,null,z)}}}let ye=R.children;for(let we=0,xe=ye.length;we<xe;we++)sh(ye[we],z,j,W)}function qf(R,z,j,W){let{opaque:q,transmissive:ye,transparent:we}=R;I.setupLightsView(j),ht===!0&&Q.setGlobalState(y.clippingPlanes,j),W&&be.viewport(G.copy(W)),q.length>0&&$o(q,z,j),ye.length>0&&$o(ye,z,j),we.length>0&&$o(we,z,j),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function Yf(R,z,j,W){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[W.id]===void 0){let Re=Ct.has("EXT_color_buffer_half_float")||Ct.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[W.id]=new Fn(1,1,{generateMipmaps:!0,type:Re?di:Pn,minFilter:zi,samples:Math.max(4,Pt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:rt.workingColorSpace})}let ye=I.state.transmissionRenderTarget[W.id],we=W.viewport||G;ye.setSize(we.z*y.transmissionResolutionScale,we.w*y.transmissionResolutionScale);let xe=y.getRenderTarget(),Ee=y.getActiveCubeFace(),Ue=y.getActiveMipmapLevel();y.setRenderTarget(ye),y.getClearColor(Y),ne=y.getClearAlpha(),ne<1&&y.setClearColor(16777215,.5),y.clear(),Wn&&O.render(j);let je=y.toneMapping;y.toneMapping=Si;let nt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),I.setupLightsView(W),ht===!0&&Q.setGlobalState(y.clippingPlanes,W),$o(R,j,W),Ye.updateMultisampleRenderTarget(ye),Ye.updateRenderTargetMipmap(ye),Ct.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let it=0,kt=z.length;it<kt;it++){let St=z[it],{object:Mt,geometry:ln,material:Ce,group:xn}=St;if(Ce.side===nn&&Mt.layers.test(W.layers)){let mt=Ce.side;Ce.side=Tn,Ce.needsUpdate=!0,jf(Mt,j,W,ln,Ce,xn),Ce.side=mt,Ce.needsUpdate=!0,Re=!0}}Re===!0&&(Ye.updateMultisampleRenderTarget(ye),Ye.updateRenderTargetMipmap(ye))}y.setRenderTarget(xe,Ee,Ue),y.setClearColor(Y,ne),nt!==void 0&&(W.viewport=nt),y.toneMapping=je}function $o(R,z,j){let W=z.isScene===!0?z.overrideMaterial:null;for(let q=0,ye=R.length;q<ye;q++){let we=R[q],{object:xe,geometry:Ee,group:Ue}=we,je=we.material;je.allowOverride===!0&&W!==null&&(je=W),xe.layers.test(j.layers)&&jf(xe,z,j,Ee,je,Ue)}}function jf(R,z,j,W,q,ye){P!==null&&q.isNodeMaterial&&P.setObject(R,q),R.onBeforeRender(y,z,j,W,q,ye),R.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),q.onBeforeRender(y,z,j,W,R,ye),q.transparent===!0&&q.side===nn&&q.forceSinglePass===!1?(q.side=Tn,q.needsUpdate=!0,y.renderBufferDirect(j,z,W,q,R,ye),q.side=cs,q.needsUpdate=!0,y.renderBufferDirect(j,z,W,q,R,ye),q.side=nn):y.renderBufferDirect(j,z,W,q,R,ye),R.onAfterRender(y,z,j,W,q,ye)}function Jf(R){let z=0;for(let j of R)j.texture!==null&&z++;return z}function Rr(R,z,j){z.isScene!==!0&&(z=Vn);let W=He.get(R),q=I.state.lights,ye=I.state.shadowsArray,we=q.state.version,xe=te.getParameters(R,q.state,ye,z,j,I.state.lightProbeGridArray),Ee=te.getProgramCacheKey(xe),Ue=W.programs;W.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?z.environment:null,W.fog=z.fog;let je=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;W.envMap=D.get(R.envMap||W.environment,je),W.envMapRotation=W.environment!==null&&R.envMap===null?z.environmentRotation:R.envMapRotation,Ue===void 0&&(R.addEventListener("dispose",_t),Ue=new Map,W.programs=Ue,W.programVariants=new Map);let nt=Ue.get(Ee);if(nt!==void 0){if(W.currentProgram===nt&&W.lightsStateVersion===we)return $f(R,xe),nt}else xe.uniforms=te.getUniforms(R),P!==null&&R.isNodeMaterial&&P.build(R,j,xe),R.onBeforeCompile(xe,y),nt=te.acquireProgram(xe,Ee),Ue.set(Ee,nt),W.uniforms=xe.uniforms;let Re=W.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Re.clippingPlanes=Q.uniform),$f(R,xe),W.needsLights=p0(R),W.lightsStateVersion=we,W.needsLights&&(Re.ambientLightColor.value=q.state.ambient,Re.lightProbe.value=q.state.probe,Re.sunLights.value=q.state.sun,Re.sunLightShadows.value=q.state.sunShadow,Re.directionalLights.value=q.state.directional,Re.directionalLightShadows.value=q.state.directionalShadow,Re.spotLights.value=q.state.spot,Re.spotLightShadows.value=q.state.spotShadow,Re.rectAreaLights.value=q.state.rectArea,Re.ltc_1.value=q.state.rectAreaLTC1,Re.ltc_2.value=q.state.rectAreaLTC2,Re.pointLights.value=q.state.point,Re.pointLightShadows.value=q.state.pointShadow,Re.hemisphereLights.value=q.state.hemi,Re.sunShadowMatrix.value=q.state.sunShadowMatrix,Re.sunShadowCascade.value=q.state.sunShadowCascade,Re.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Re.spotLightMatrix.value=q.state.spotLightMatrix,Re.spotLightMap.value=q.state.spotLightMap,Re.pointShadowMatrix.value=q.state.pointShadowMatrix),W.numLightProbeGrids=Jf(I.state.lightProbeGridArray),W.currentProgram=nt,W.uniformsList=null,nt}function u0(R,z,j,W,q){let ye=He.get(R),we=ye.currentProgram.id+","+W+","+q,xe=ye.programVariants.get(we);return xe===void 0?(xe=Rr(R,z,j),ye.programVariants.set(we,xe)):(ye.currentProgram=xe,ye.uniformsList=null,ye.outputColorSpace=W,ye.toneMapping=q),xe}function Zf(R){if(R.uniformsList===null){let z=R.currentProgram.getUniforms();R.uniformsList=br.seqWithValue(z.seq,R.uniforms)}return R.uniformsList}function $f(R,z){let j=He.get(R);j.outputColorSpace=z.outputColorSpace,j.batching=z.batching,j.batchingColor=z.batchingColor,j.instancing=z.instancing,j.instancingColor=z.instancingColor,j.instancingMorph=z.instancingMorph,j.skinning=z.skinning,j.morphTargets=z.morphTargets,j.morphNormals=z.morphNormals,j.morphColors=z.morphColors,j.morphTargetsCount=z.morphTargetsCount,j.numClippingPlanes=z.numClippingPlanes,j.numIntersection=z.numClipIntersection,j.vertexAlphas=z.vertexAlphas,j.vertexTangents=z.vertexTangents,j.toneMapping=z.toneMapping}function f0(R,z,j,W,q){z.isScene!==!0&&(z=Vn),Ye.resetTextureUnits();let ye=z.fog,we=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?z.environment:null,xe=J===null?y.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:rt.workingColorSpace,Ee=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Ue=D.get(W.envMap||we,Ee),je=W.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,nt=!!j.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Re=!!j.morphAttributes.position,it=!!j.morphAttributes.normal,kt=!!j.morphAttributes.color,St=Si;W.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(St=y.toneMapping);let Mt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ln=Mt!==void 0?Mt.length:0,Ce=He.get(W),xn=I.state.lights;if(ht===!0&&(Ut===!0||R!==k)){let Lt=R===k&&W.id===B;Q.setState(W,R,Lt)}let mt=!1,gs=!1;W.version===Ce.__version?Ce.needsLights&&Ce.lightsStateVersion!==xn.state.version||q.isBatchedMesh&&Ce.batching===!1||!q.isBatchedMesh&&Ce.batching===!0||q.isBatchedMesh&&Ce.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&Ce.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&Ce.instancing===!1||!q.isInstancedMesh&&Ce.instancing===!0||q.isSkinnedMesh&&Ce.skinning===!1||!q.isSkinnedMesh&&Ce.skinning===!0||q.isInstancedMesh&&Ce.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Ce.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Ce.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Ce.instancingMorph===!1&&q.morphTexture!==null||Ce.envMap!==Ue||W.fog===!0&&Ce.fog!==ye||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==Q.numPlanes||Ce.numIntersection!==Q.numIntersection)||Ce.vertexAlphas!==je||Ce.vertexTangents!==nt||Ce.morphTargets!==Re||Ce.morphNormals!==it||Ce.morphColors!==kt||Ce.morphTargetsCount!==ln||Ce.numLightProbeGrids!==Jf(I.state.lightProbeGridArray)?mt=!0:(Ce.outputColorSpace!==xe||Ce.toneMapping!==St)&&(gs=!0):(mt=!0,Ce.__version=W.version);let hn=Ce.currentProgram;(mt===!0||gs===!0)&&(hn=gs===!0?u0(W,z,q,xe,St):Rr(W,z,q),P&&W.isNodeMaterial&&P.onUpdateProgram(W,hn,Ce));let Ko=!1,Wi=!1,xs=!1,ut=hn.getUniforms(),on=Ce.uniforms;if(be.useProgram(hn.program)&&(Ko=!0,Wi=!0,xs=!0),W.id!==B&&(B=W.id,Wi=!0),Ko||k!==R){be.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),ut.setValue(H,"projectionMatrix",R.projectionMatrix),ut.setValue(H,"viewMatrix",R.matrixWorldInverse);let Qt=ut.map.cameraPosition;Qt!==void 0&&Qt.setValue(H,gi.setFromMatrixPosition(R.matrixWorld)),Pt.logarithmicDepthBuffer&&ut.setValue(H,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ut.setValue(H,"isOrthographic",R.isOrthographicCamera===!0),k!==R&&(k=R,Wi=!0,xs=!0)}if(Ce.needsLights&&(xn.state.sunShadowMap.length>0&&ut.setValue(H,"sunShadowMap",xn.state.sunShadowMap,Ye),xn.state.directionalShadowMap.length>0&&ut.setValue(H,"directionalShadowMap",xn.state.directionalShadowMap,Ye),xn.state.spotShadowMap.length>0&&ut.setValue(H,"spotShadowMap",xn.state.spotShadowMap,Ye),xn.state.pointShadowMap.length>0&&ut.setValue(H,"pointShadowMap",xn.state.pointShadowMap,Ye)),q.isSkinnedMesh){ut.setOptional(H,q,"bindMatrix"),ut.setOptional(H,q,"bindMatrixInverse");let Lt=q.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),ut.setValue(H,"boneTexture",Lt.boneTexture,Ye))}q.isBatchedMesh&&(ut.setOptional(H,q,"batchingTexture"),ut.setValue(H,"batchingTexture",q._matricesTexture,Ye),ut.setOptional(H,q,"batchingIdTexture"),ut.setValue(H,"batchingIdTexture",q._indirectTexture,Ye),ut.setOptional(H,q,"batchingColorTexture"),q._colorsTexture!==null&&ut.setValue(H,"batchingColorTexture",q._colorsTexture,Ye));let ti=j.morphAttributes;if((ti.position!==void 0||ti.normal!==void 0||ti.color!==void 0)&&ee.update(q,j,hn),(Wi||Ce.receiveShadow!==q.receiveShadow)&&(Ce.receiveShadow=q.receiveShadow,ut.setValue(H,"receiveShadow",q.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&z.environment!==null&&(on.envMapIntensity.value=z.environmentIntensity),on.dfgLUT!==void 0&&(on.dfgLUT.value=Rb()),Wi){if(ut.setValue(H,"toneMappingExposure",y.toneMappingExposure),Ce.needsLights&&d0(on,xs),ye&&W.fog===!0&&fe.refreshFogUniforms(on,ye),fe.refreshMaterialUniforms(on,W,ce,pe,I.state.transmissionRenderTarget[R.id]),Ce.needsLights&&Ce.numLightProbeGrids>0){let Lt=b,Qt=0;for(let wi of I.state.lightProbeGridArray)wi.texture!==null&&(Lt.textures[Qt]=wi.texture,Lt.min[Qt]=wi.boundingBox.min,Lt.max[Qt]=wi.boundingBox.max,Lt.resolution[Qt]=wi.resolution,Qt++);for(let wi in Lt)Lt[wi].length=Qt;on.probesSH.value=Lt.textures,on.probesMin.value=Lt.min,on.probesMax.value=Lt.max,on.probesResolution.value=Lt.resolution}br.upload(H,Zf(Ce),on,Ye)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(br.upload(H,Zf(Ce),on,Ye),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ut.setValue(H,"center",q.center),ut.setValue(H,"modelViewMatrix",q.modelViewMatrix),ut.setValue(H,"normalMatrix",q.normalMatrix),ut.setValue(H,"modelMatrix",q.matrixWorld),W.uniformsGroups!==void 0){let Lt=W.uniformsGroups;for(let Qt=0,wi=Lt.length;Qt<wi;Qt++){let Qf=Lt[Qt];ke.update(Qf,hn),ke.bind(Qf,hn)}}return hn}function d0(R,z){R.ambientLightColor.needsUpdate=z,R.lightProbe.needsUpdate=z,R.sunLights.needsUpdate=z,R.sunLightShadows.needsUpdate=z,R.directionalLights.needsUpdate=z,R.directionalLightShadows.needsUpdate=z,R.pointLights.needsUpdate=z,R.pointLightShadows.needsUpdate=z,R.spotLights.needsUpdate=z,R.spotLightShadows.needsUpdate=z,R.rectAreaLights.needsUpdate=z,R.hemisphereLights.needsUpdate=z}function p0(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(R,z,j){let W=He.get(R);W.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),He.get(R.texture).__webglTexture=z,He.get(R.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:j,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,z){let j=He.get(R);j.__webglFramebuffer=z,j.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(R,z=0,j=0){J=R,U=z,F=j;let W=null,q=!1,ye=!1;if(R){let xe=He.get(R);if(xe.__useDefaultFramebuffer!==void 0){be.bindFramebuffer(H.FRAMEBUFFER,xe.__webglFramebuffer),G.copy(R.viewport),ue.copy(R.scissor),he=R.scissorTest,be.viewport(G),be.scissor(ue),be.setScissorTest(he),B=-1;return}else if(xe.__webglFramebuffer===void 0)Ye.setupRenderTarget(R);else if(xe.__hasExternalTextures)Ye.rebindTextures(R,He.get(R.texture).__webglTexture,He.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let je=R.depthTexture;if(xe.__boundDepthTexture!==je){if(je!==null&&He.has(je)&&(R.width!==je.image.width||R.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ye.setupDepthRenderbuffer(R)}}let Ee=R.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(ye=!0);let Ue=He.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ue[z])?W=Ue[z][j]:W=Ue[z],q=!0):R.samples>0&&Ye.useMultisampledRTT(R)===!1?W=He.get(R).__webglMultisampledFramebuffer:Array.isArray(Ue)?W=Ue[j]:W=Ue,G.copy(R.viewport),ue.copy(R.scissor),he=R.scissorTest}else G.copy(Ne).multiplyScalar(ce).floor(),ue.copy(ot).multiplyScalar(ce).floor(),he=lt;if(j!==0&&(W=L),be.bindFramebuffer(H.FRAMEBUFFER,W)&&be.drawBuffers(R,W),be.viewport(G),be.scissor(ue),be.setScissorTest(he),q){let xe=He.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+z,xe.__webglTexture,j)}else if(ye){let xe=z;for(let Ee=0;Ee<R.textures.length;Ee++){let Ue=He.get(R.textures[Ee]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+Ee,Ue.__webglTexture,j,xe)}}else if(R!==null&&j!==0){let xe=He.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,xe.__webglTexture,j)}B=-1};function Kf(R){let z=He.get(R);return(z.__readFormat!==R.format||z.__readType!==R.type)&&(z.__readFormat=R.format,z.__readType=R.type,z.__formatReadable=Pt.textureFormatReadable(R.format),z.__typeReadable=Pt.textureTypeReadable(R.type)),z}this.readRenderTargetPixels=function(R,z,j,W,q,ye,we,xe=0){if(!(R&&R.isWebGLRenderTarget)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=He.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&we!==void 0&&(Ee=Ee[we],Array.isArray(Ee)&&(Ee=Ee[0])),Ee){be.bindFramebuffer(H.FRAMEBUFFER,Ee);try{let Ue=R.textures[xe],je=Ue.format,nt=Ue.type;R.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+xe);let Re=Kf(Ue);if(Re.__formatReadable===!1){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=R.width-W&&j>=0&&j<=R.height-q&&H.readPixels(z,j,W,q,le.convert(je),le.convert(nt),ye)}finally{let Ue=J!==null?He.get(J).__webglFramebuffer:null;be.bindFramebuffer(H.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(R,z,j,W,q,ye,we,xe=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=He.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&we!==void 0&&(Ee=Ee[we],Array.isArray(Ee)&&(Ee=Ee[0])),Ee)if(z>=0&&z<=R.width-W&&j>=0&&j<=R.height-q){be.bindFramebuffer(H.FRAMEBUFFER,Ee);let Ue=R.textures[xe],je=Ue.format,nt=Ue.type;R.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+xe);let Re=Kf(Ue);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let it=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,it),H.bufferData(H.PIXEL_PACK_BUFFER,ye.byteLength,H.STREAM_READ),H.readPixels(z,j,W,q,le.convert(je),le.convert(nt),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);let kt=J!==null?He.get(J).__webglFramebuffer:null;be.bindFramebuffer(H.FRAMEBUFFER,kt);let St=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Tp(H,St,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,it),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,ye),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(it),H.deleteSync(St),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,z=null,j=0){let W=Math.pow(2,-j),q=Math.floor(R.image.width*W),ye=Math.floor(R.image.height*W),we=z!==null?z.x:0,xe=z!==null?z.y:0;Ye.setTexture2D(R,0),H.copyTexSubImage2D(H.TEXTURE_2D,j,0,0,we,xe,q,ye),be.unbindTexture()},this.copyTextureToTexture=function(R,z,j=null,W=null,q=0,ye=0){let we,xe,Ee,Ue,je,nt,Re,it,kt,St=R.isCompressedTexture?R.mipmaps[ye]:R.image;if(j!==null)we=j.max.x-j.min.x,xe=j.max.y-j.min.y,Ee=j.isBox3?j.max.z-j.min.z:1,Ue=j.min.x,je=j.min.y,nt=j.isBox3?j.min.z:0;else{let ut=Math.pow(2,-q);we=Math.floor(St.width*ut),xe=Math.floor(St.height*ut),R.isDataArrayTexture?Ee=St.depth:R.isData3DTexture?Ee=Math.floor(St.depth*ut):Ee=1,Ue=0,je=0,nt=0}W!==null?(Re=W.x,it=W.y,kt=W.z):(Re=0,it=0,kt=0);let Mt=le.convert(z.format),ln=le.convert(z.type),Ce;z.isData3DTexture?(Ye.setTexture3D(z,0),Ce=H.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Ye.setTexture2DArray(z,0),Ce=H.TEXTURE_2D_ARRAY):(Ye.setTexture2D(z,0),Ce=H.TEXTURE_2D),be.activeTexture(H.TEXTURE0),be.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,z.flipY),be.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),be.pixelStorei(H.UNPACK_ALIGNMENT,z.unpackAlignment);let xn=be.getParameter(H.UNPACK_ROW_LENGTH),mt=be.getParameter(H.UNPACK_IMAGE_HEIGHT),gs=be.getParameter(H.UNPACK_SKIP_PIXELS),hn=be.getParameter(H.UNPACK_SKIP_ROWS),Ko=be.getParameter(H.UNPACK_SKIP_IMAGES);be.pixelStorei(H.UNPACK_ROW_LENGTH,St.width),be.pixelStorei(H.UNPACK_IMAGE_HEIGHT,St.height),be.pixelStorei(H.UNPACK_SKIP_PIXELS,Ue),be.pixelStorei(H.UNPACK_SKIP_ROWS,je),be.pixelStorei(H.UNPACK_SKIP_IMAGES,nt);let Wi=R.isDataArrayTexture||R.isData3DTexture,xs=z.isDataArrayTexture||z.isData3DTexture;if(R.isDepthTexture){let ut=He.get(R),on=He.get(z),ti=He.get(ut.__renderTarget),Lt=He.get(on.__renderTarget);be.bindFramebuffer(H.READ_FRAMEBUFFER,ti.__webglFramebuffer),be.bindFramebuffer(H.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Qt=0;Qt<Ee;Qt++)Wi&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,He.get(R).__webglTexture,q,nt+Qt),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,He.get(z).__webglTexture,ye,kt+Qt)),H.blitFramebuffer(Ue,je,Ue+we,je+xe,Re,it,Re+we,it+xe,H.DEPTH_BUFFER_BIT,H.NEAREST);be.bindFramebuffer(H.READ_FRAMEBUFFER,null),be.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(q!==0||R.isRenderTargetTexture||He.has(R)){let ut=He.get(R),on=He.get(z);be.bindFramebuffer(H.READ_FRAMEBUFFER,T),be.bindFramebuffer(H.DRAW_FRAMEBUFFER,N);for(let ti=0;ti<Ee;ti++)Wi?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,ut.__webglTexture,q,nt+ti):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,ut.__webglTexture,q),xs?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,on.__webglTexture,ye,kt+ti):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,on.__webglTexture,ye),q!==0?H.blitFramebuffer(Ue,je,Ue+we,je+xe,Re,it,Re+we,it+xe,H.COLOR_BUFFER_BIT,H.NEAREST):xs?H.copyTexSubImage3D(Ce,ye,Re,it,kt+ti,Ue,je,we,xe):H.copyTexSubImage2D(Ce,ye,Re,it,Ue,je,we,xe);be.bindFramebuffer(H.READ_FRAMEBUFFER,null),be.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else xs?R.isDataTexture||R.isData3DTexture?H.texSubImage3D(Ce,ye,Re,it,kt,we,xe,Ee,Mt,ln,St.data):z.isCompressedArrayTexture?H.compressedTexSubImage3D(Ce,ye,Re,it,kt,we,xe,Ee,Mt,St.data):H.texSubImage3D(Ce,ye,Re,it,kt,we,xe,Ee,Mt,ln,St):R.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,ye,Re,it,we,xe,Mt,ln,St.data):R.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,ye,Re,it,St.width,St.height,Mt,St.data):H.texSubImage2D(H.TEXTURE_2D,ye,Re,it,we,xe,Mt,ln,St);be.pixelStorei(H.UNPACK_ROW_LENGTH,xn),be.pixelStorei(H.UNPACK_IMAGE_HEIGHT,mt),be.pixelStorei(H.UNPACK_SKIP_PIXELS,gs),be.pixelStorei(H.UNPACK_SKIP_ROWS,hn),be.pixelStorei(H.UNPACK_SKIP_IMAGES,Ko),ye===0&&z.generateMipmaps===!0&&z.mipmapsAutoUpdate===!0&&H.generateMipmap(Ce),be.unbindTexture()},this.initRenderTarget=function(R){He.get(R).__webglFramebuffer===void 0&&Ye.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Ye.setTextureCube(R,0):R.isData3DTexture?Ye.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Ye.setTexture2DArray(R,0):Ye.setTexture2D(R,0),be.unbindTexture()},this.resetState=function(){U=0,F=0,J=null,be.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=rt._getUnpackColorSpace()}};function mm(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Ft;l.morphTargetsRelative=a;let h=0;for(let c=0;c<i.length;++c){let u=i[c],f=0,d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;if(u.morphAttributes[p].length!==i[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;o[p]===void 0&&(o[p]=[]),o[p].push(u.morphAttributes[p]),d++}if(d!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of morph attributes."),null;if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;l.addGroup(h,p,c),h+=p}}if(t){let c=0,u=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let p=0;p<d.count;++p)u.push(d.getX(p)+c);c+=i[f].attributes.position.count}l.setIndex(u)}for(let c in r){let u=pm(r[c]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;l.setAttribute(c,u)}for(let c in o){let u=o[c][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[c]=[];for(let f=0;f<u;++f){let d=[];for(let v=0;v<o[c].length;++v)d.push(o[c][v][f]);let p=pm(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;l.morphAttributes[c].push(p)}}}return l}function pm(i){let e,t,n,s=-1,r=0;for(let h=0;h<i.length;++h){let c=i[h];if(e===void 0&&(e=c.array.constructor),e!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=c.itemSize),t!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=c.normalized),n!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=c.gpuType),s!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=c.count*t}let o=new e(r),a=new Bt(o,t,n),l=0;for(let h=0;h<i.length;++h){let c=i[h];if(c.isInterleavedBufferAttribute){let u=l/t;for(let f=0,d=c.count;f<d;f++)for(let p=0;p<t;p++){let v=c.getComponent(f,p);a.setComponent(f+u,p,v)}}else o.set(c.array,l);l+=c.count*t}return s!==void 0&&(a.gpuType=s),a}var yl=new Xe;function se(i,e,t,n,s,r,o,a){let l=i.index?i.toNonIndexed():i;(r||o||a)&&l.applyMatrix4(new ft().makeRotationFromEuler(new hi(r||0,o||0,a||0))),l.translate(t||0,n||0,s||0),yl.set(e);let h=l.attributes.position.count,c=new Float32Array(h*3);for(let u=0;u<h;u++)c[u*3]=yl.r,c[u*3+1]=yl.g,c[u*3+2]=yl.b;return l.setAttribute("color",new Bt(c,3)),l.attributes.uv||l.setAttribute("uv",new Bt(new Float32Array(h*2),2)),l}function sn(i){let e=mm(i,!1);for(let t=0;t<i.length;t++)i[t].dispose();return e.computeVertexNormals(),e}function Uo(i,e,t){let n=new Xe(i),s=new Xe(e);return n.lerp(s,t).getHex()}var gm=15845280,vl=1842987,Cb=14212841,Pb=8016432;function xm(i,e,t){let n=Uo(i,1184796,.62),s=Uo(i,723986,.74),r=[se(new Fe(.44,.46,.28),n,0,.6,0),se(new Fe(.47,.09,.31),e,0,.44,0),se(new Nt(.27,1),s,0,1.08,0),se(new Fe(.34,.11,.08),gm,0,1.1,.212),se(new Fe(.05,.06,.03),vl,-.085,1.1,.25),se(new Fe(.05,.06,.03),vl,.085,1.1,.25),se(new Et(.235,.265,.13,8),i,0,.87,0)];return t===0?r.push(se(new jt(.1,.3,5),e,0,.7,-.2,-.5,0,0)):t===1?r.push(se(new Nt(.12,0),e,0,.66,-.22)):r.push(se(new Fe(.06,.78,.06),Uo(e,Pb,.5),0,.72,-.19,0,0,.55)),sn(r)}function Fu(i,e){let t=Uo(i,1184796,.56),n=[se(new Fe(.12,.3,.14),t,0,-.15,0),se(new Fe(.11,.1,.12),gm,0,-.35,0)];return e&&(n.push(se(new Fe(.035,.07,.6),Cb,0,-.38,.36)),n.push(se(new Fe(.13,.035,.05),vl,0,-.38,.07))),sn(n)}function _m(i){let e=Uo(i,1184796,.68);return sn([se(new Fe(.15,.3,.17),e,0,-.15,0),se(new Fe(.16,.08,.22),vl,0,-.33,.03)])}function ym(i){return sn([se(new Fe(.11,.05,.46),i,0,0,-.23)])}function vm(){return sn([se(new Et(.1,.15,.6,5,1,!0),7031339,0,.3,0),se(new jt(.66,1.05,6,1,!0),3112259,0,1.05,0),se(new jt(.5,.9,6,1,!0),3639883,0,1.6,0),se(new jt(.33,.75,6,1,!0),4167251,0,2.1,0)])}function bm(){let i=new Nt(.66,0);i.scale(1,.82,1);let e=new Nt(.44,0);return e.scale(1,.85,1),sn([se(new Et(.11,.16,.8,5,1,!0),7360559,0,.4,0),se(i,4034367,0,1.25,0),se(e,4890698,.3,1.72,.12)])}function Mm(){let i=new Nt(.46,0);i.scale(1,.66,1);let e=new Nt(.3,0);return e.scale(1,.7,1),sn([se(i,3116862,0,.26,0),se(e,3909196,.3,.2,.2)])}function Sm(){let i=new ur(.44,0);i.scale(1,.72,.9);let e=new ur(.24,0);return sn([se(i,9146521,0,.26,0),se(e,10133674,.32,.14,.22)])}function Tm(i){return sn([se(new Et(.1,.1,.5,10),15984324,0,0,0,0,0,Math.PI/2),se(new Et(.115,.115,.15,10),i,0,0,0,0,0,Math.PI/2),se(new Et(.06,.06,.08,8),3811868,-.29,0,0,0,0,Math.PI/2),se(new Et(.06,.06,.08,8),3811868,.29,0,0,0,0,Math.PI/2)])}function Em(){let i=new Nt(.25,1);return i.scale(1,.92,.8),sn([se(i,16448250,0,0,0),se(new Fe(.3,.2,.43),2046762,0,-.1,0)])}function Am(){return sn([se(new Fe(.42,.03,.1),14673648,0,0,0),se(new Fe(.1,.03,.42),14673648,0,0,0),se(new Et(.07,.07,.04,6),3752013,0,0,0)])}function wm(){let i=[],e=7;function t(){return e=e*16807%2147483647,e/2147483647}for(let n=0;n<16;n++){let s=t()*6.283,r=.25+t()*1.75,o=.5+t()*.7;i.push(se(new jt(.13,o,4),n%3?5209903:7031339,Math.sin(s)*r,o/2,Math.cos(s)*r,(t()-.5)*.7,0,(t()-.5)*.7))}return sn(i)}function Rm(){let s=[se(new Et(3.75,3.95,.14,40),13225430,0,.07,0),se(new Et(.62,.74,.5,8),12173e3,0,.39,0),se(new Et(.46,.5,.16,8),2763830,0,.72,0),se(new Et(.17,.2,3,8),13911338,-1.5,1.5,-4.5),se(new Et(.17,.2,3,8),13911338,1.5,1.5,-4.5),se(new Fe(4.5,.24,.42),2763830,0,3.08,-4.5),se(new Fe(3.9,.16,.3),13911338,0,2.86,-4.5),se(new Fe(3.5,.18,.22),13911338,0,2.3,-4.5)],r=[[-4.5,-4.5],[4.5,-4.5],[-4.5,4.5],[4.5,4.5]];for(let o=0;o<4;o++){let a=r[o][0],l=r[o][1];s.push(se(new Fe(.5,.16,.5),12173e3,a,.08,l)),s.push(se(new Fe(.2,.7,.2),12173e3,a,.5,l)),s.push(se(new Fe(.42,.34,.42),16766826,a,1.02,l)),s.push(se(new jt(.44,.3,4),2763830,a,1.34,l,0,Math.PI/4,0))}return sn(s)}function Cm(i){return sn([se(new Et(.05,.06,2.6,6),5916208,0,1.3,0),se(new Fe(.9,.55,.05),i,.5,2.25,0),se(new jt(1.15,1.25,4),14272931,-1.9,.62,-.6,0,Math.PI/4,0),se(new Fe(1.7,.12,1.7),i,-1.9,.06,-.6,0,Math.PI/4,0),se(new Et(.34,.4,.14,7),5988200,1.3,.07,1.2),se(new jt(.2,.5,5),16751165,1.3,.38,1.2)])}function Pm(){let s=new Nt(.36,1);return s.scale(.95,.9,1.15),sn([se(s,4165600,0,.6,0),se(new Nt(.26,1),15917744,0,.52,.12),se(new Nt(.24,1),4165600,0,.95,.28),se(new jt(.09,.26,5),16753981,0,.92,.6,Math.PI/2,0,0),se(new Fe(.06,.07,.03),1844275,.1,1,.48),se(new Fe(.06,.07,.03),1844275,-.1,1,.48),se(new jt(.07,.22,4),16734794,0,1.22,.24,-.4,0,0),se(new Fe(.34,.06,.36),3108792,0,.62,-.5,.35,0,0),se(new Et(.025,.025,.32,4),16753981,.1,.3,.02),se(new Et(.025,.025,.32,4),16753981,-.1,.3,.02)])}function Im(){let i=se(new Fe(.5,.05,.34),3108792,.25,0,0);return i.computeVertexNormals(),i}function Lm(){let s=new Nt(.4,1);s.scale(.7,.85,1.35);let r=new jt(.3,.4,4);return r.scale(.25,1,1),sn([se(s,16747069,0,.42,0),se(new Nt(.26,1),16769720,0,.32,.12),se(r,14701866,0,.45,-.66,-Math.PI/2,0,0),se(new Fe(.05,.24,.4),14701866,0,.78,-.02),se(new Fe(.22,.04,.16),14701866,.24,.3,.12,0,0,-.5),se(new Fe(.22,.04,.16),14701866,-.24,.3,.12,0,0,.5),se(new Fe(.03,.09,.09),16777215,.24,.52,.32),se(new Fe(.03,.09,.09),16777215,-.24,.52,.32),se(new Fe(.035,.05,.05),1844275,.255,.52,.34),se(new Fe(.035,.05,.05),1844275,-.255,.52,.34),se(new Fe(.16,.05,.05),12075050,0,.38,.54)])}function Dm(){let n=new Nt(.5,1);n.scale(1,1.2,1);let s=[se(n,10181846,0,1.05,-.05),se(new Nt(.13,1),16777215,.17,1,.38),se(new Nt(.13,1),16777215,-.17,1,.38),se(new Fe(.08,.1,.05),1844275,.17,1,.5),se(new Fe(.08,.1,.05),1844275,-.17,1,.5),se(new Nt(.08,0),13212671,.22,1.42,.18),se(new Nt(.06,0),13212671,-.2,1.5,.05)];for(let r=0;r<8;r++){let o=r*Math.PI/4+Math.PI/8,a=new Et(.13,.05,.85,5);a.applyMatrix4(new ft().makeRotationZ(.65)),a.applyMatrix4(new ft().makeRotationY(o)),s.push(se(a,r%2?10181846:13212671,Math.cos(o)*.42,.38,-Math.sin(o)*.42))}return sn(s)}function Nm(){return sn([se(new Fe(1,1.05,.75),9065776,0,1.15,0),se(new Fe(.62,.7,.1),13212266,0,1.1,.38),se(new Fe(.62,.56,.56),9065776,0,1.95,.05),se(new Fe(.3,.22,.24),13212266,0,1.86,.38),se(new Fe(.12,.08,.06),4860952,0,1.94,.51),se(new Fe(.07,.07,.03),4860952,.14,2.06,.34),se(new Fe(.07,.07,.03),4860952,-.14,2.06,.34),se(new Fe(.16,.16,.1),9065776,.24,2.28,0),se(new Fe(.16,.16,.1),9065776,-.24,2.28,0),se(new Fe(.28,.75,.3),9065776,.66,1.3,.12,0,0,.3),se(new Fe(.28,.75,.3),9065776,-.66,1.3,.12,0,0,-.3),se(new jt(.04,.16,4),15853256,.8,.86,.22,Math.PI,0,0),se(new jt(.04,.16,4),15853256,.88,.88,.12,Math.PI,0,0),se(new jt(.04,.16,4),15853256,-.8,.86,.22,Math.PI,0,0),se(new jt(.04,.16,4),15853256,-.88,.88,.12,Math.PI,0,0),se(new Fe(.34,.6,.4),9065776,.26,.3,0),se(new Fe(.34,.6,.4),9065776,-.26,.3,0)])}var hs=16,ku=26,Um=1.17,Gi=420,Om=96;function En(i){return new Xe(i)}var zu=class{constructor(e){this.n=0,this.pos=new Float32Array(Gi*3),this.colr=new Float32Array(Gi*4),this.size=new Float32Array(Gi),this.vel=new Float32Array(Gi*3),this.life=new Float32Array(Gi),this.max=new Float32Array(Gi),this.base=new Float32Array(Gi*2);let t=new Ft;t.setAttribute("position",new Bt(this.pos,3)),t.setAttribute("pcolor",new Bt(this.colr,4)),t.setAttribute("size",new Bt(this.size,1)),t.setDrawRange(0,0),this.mat=new Kn({uniforms:{scale:{value:600}},vertexShader:`attribute float size; attribute vec4 pcolor; varying vec4 vColor; uniform float scale;
void main(){ vColor = pcolor; vec4 mv = modelViewMatrix * vec4(position, 1.0);
gl_PointSize = size * scale / -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:`varying vec4 vColor;
void main(){ vec2 d = gl_PointCoord - 0.5; float r = dot(d, d); if (r > 0.25) discard;
gl_FragColor = vec4(vColor.rgb, vColor.a * smoothstep(0.25, 0.12, r));
#include <colorspace_fragment>
}`,transparent:!0,depthWrite:!1}),this.points=new no(t,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=5,e.add(this.points),this.geo=t,this._c=new Xe}add(e,t,n,s,r,o,a,l,h,c){let u=this.n;u>=Gi?u=Math.floor(Math.random()*Gi):this.n++,this.pos[u*3]=e,this.pos[u*3+1]=t,this.pos[u*3+2]=n,this.vel[u*3]=s,this.vel[u*3+1]=r,this.vel[u*3+2]=o,this.life[u]=a,this.max[u]=a,this.base[u*2]=l,this.base[u*2+1]=c||0,this._c.set(h),this.colr[u*4]=this._c.r,this.colr[u*4+1]=this._c.g,this.colr[u*4+2]=this._c.b,this.colr[u*4+3]=1,this.size[u]=l}burst(e,t,n,s,r,o,a,l,h,c){for(let u=0;u<s;u++){let f=Math.random()*6.283,d=r*(.4+Math.random()*.6);this.add(e,t,n,Math.sin(f)*d,(c||0)+(Math.random()-.3)*r*.6,Math.cos(f)*d,o*(.6+Math.random()*.4),a*(.6+Math.random()*.6),l,h)}}update(e){let t=this.n;for(let n=0;n<t;n++){if(this.life[n]-=e,this.life[n]<=0){if(t--,n!==t){for(let r=0;r<3;r++)this.pos[n*3+r]=this.pos[t*3+r],this.vel[n*3+r]=this.vel[t*3+r];for(let r=0;r<4;r++)this.colr[n*4+r]=this.colr[t*4+r];this.life[n]=this.life[t],this.max[n]=this.max[t],this.base[n*2]=this.base[t*2],this.base[n*2+1]=this.base[t*2+1]}n--;continue}this.vel[n*3+1]-=this.base[n*2+1]*e,this.pos[n*3]+=this.vel[n*3]*e,this.pos[n*3+1]+=this.vel[n*3+1]*e,this.pos[n*3+2]+=this.vel[n*3+2]*e,this.pos[n*3+1]<.03&&(this.pos[n*3+1]=.03,this.vel[n*3+1]=0);let s=this.life[n]/this.max[n];this.colr[n*4+3]=s<.5?s*2:1,this.size[n]=this.base[n*2]*(.6+.4*s)}this.n=t,this.geo.setDrawRange(0,t),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.pcolor.needsUpdate=!0,this.geo.attributes.size.needsUpdate=!0}},bl=class{constructor(e){this.canvas=e,this.renderer=new gl({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.quality=1,this.scene=new $r;let t=1384750;this.scene.background=En(t),this.scene.fog=new Zr(t,31,54),this.camera=new bn(50,.5,1,140),this.scene.add(new yo(14676479,3889717,2.1));let n=new Mo(16773590,2.4);n.position.set(-.55,1,.45),this.scene.add(n),this.matFlat=new ui({vertexColors:!0,flatShading:!0}),this.matGround=new ui({vertexColors:!0,side:nn}),this.geo={conifer:vm(),broad:bm(),bush:Mm(),rock:Sm(),shuriken:Am(),bramble:wm(),food:Em(),ring:new zn(.43,.54,22),disc:new lr(.36,14),ball:new Nt(1,1),gem:new mo(.34)},this.geo.gem.scale(1,1.35,1),this.geo.ring.rotateX(-Math.PI/2),this.geo.disc.rotateX(-Math.PI/2),this.matShadow=new Tt({color:0,transparent:!0,opacity:.26,depthWrite:!1}),this.matShield=new Tt({color:_n[3].color,transparent:!0,opacity:.24,depthWrite:!1,blending:As}),this.starMesh=new cr(this.geo.shuriken,this.matFlat,Om),this.starMesh.frustumCulled=!1,this.starMesh.count=0,this._d=new Ht,this.items=[],this.resurge=!1,this.map=null,this.mobGeo=[Pm(),Lm(),Dm(),Nm()],this.geo.wing=Im(),this.mobsV=[];let s=new zn(.86,1,40);s.rotateX(-Math.PI/2),this.geo.tele=s,this.world=null,this.dyn=new Mn,this.scene.add(this.dyn),this.fx=new zu(this.scene),this.ninjas=[],this.projs={},this.areas={},this.slashes=[],this.rings=[],this.time=0,this.cam={x:48,z:48,shake:0},this.orbit=0,this._v=new V,this.w=1,this.h=1,this.deliverP=-1,this.onCue=null}resize(e,t,n){this.w=e,this.h=t;let s=Math.min(n||1,2)*this.quality;this.renderer.setPixelRatio(Math.max(.6,s)),this.renderer.setSize(e,t,!1);let r=e/t;this.camera.aspect=r;let o=6.3/ku/r;this.camera.fov=yt(2*Math.atan(o)*180/Math.PI,30,58),this.camera.updateProjectionMatrix(),this.fx.mat.uniforms.scale.value=t*Math.max(.6,s)/(2*Math.tan(this.camera.fov*Math.PI/360))}setQuality(e){this.quality=e,this.resize(this.w,this.h,window.devicePixelRatio||1)}buildWorld(e,t,n){this.world&&(this.scene.remove(this.world),this.world.traverse(function(A){A.geometry&&A.userData.own&&A.geometry.dispose()}));for(let A=0;A<this.items.length;A++)this.items[A].mat.dispose(),this.items[A].ringMat.dispose();this.items=[];let s=!!e.half;this.map=e,this.resurge=n===1;let r=null;if(e.arena){r=new Uint8Array(9216).fill(255);let A=[];for(let y=0;y<9216;y++)o(y)!==an&&(r[y]=0,A.push(y));for(let y=0;y<A.length;y++){let S=A[y],P=S%96,L=S/96|0,T=r[S]+1;if(!(T>20))for(let N=-1;N<=1;N++)for(let U=-1;U<=1;U++){let F=P+U,J=L+N;if(F<0||J<0||F>=96||J>=96)continue;let B=J*96+F;r[B]>T&&(r[B]=T,A.push(B))}}}function o(A){return e.tiles[A]}let a=new Mn;this.world=a,this.scene.add(a);let l=e.tiles,h=e.vari,c={g1:En(6793551),g2:En(6069318),gb:En(4885052),path1:En(13610612),path2:En(12886632),st1:En(10988982),st2:En(9870502),wall:En(2973491),bed:En(2776975),bank:En(8021312),wood1:En(11566917),wood2:En(10252090),ford:En(5084088)},u=new Xe,f=new Ht,d=this;function p(A,y){if(!y.length)return;let S=new cr(A,d.matFlat,y.length);for(let P=0;P<y.length;P++){let L=y[P];f.position.set(L.x,0,L.z),f.rotation.set(0,L.r,0),f.scale.set(L.s,L.sy||L.s,L.s),f.updateMatrix(),S.setMatrixAt(P,f.matrix),u.setRGB(L.c,L.c*(L.cg||1),L.c),S.setColorAt(P,u)}S.instanceMatrix.needsUpdate=!0,S.instanceColor&&(S.instanceColor.needsUpdate=!0),S.computeBoundingSphere(),a.add(S)}function v(A,y,S,P,L,T,N,U,F,J,B,k,G,ue,he,Y,ne,ve,pe){A.push(P,L,T,N,U,F,J,B,k,P,L,T,J,B,k,G,ue,he);for(let ce=0;ce<6;ce++)y.push(Y,ne,ve),S.push(pe.r,pe.g,pe.b)}function m(A,y){if(A<0||y<0||A>=96||y>=96)return!1;let S=l[y*96+A];return S===Jn||S===Ri||S===xi}for(let A=0;A<96/hs;A++)for(let y=0;y<96/hs;y++){let S=[],P=[],L=[],T=[],N=[],U=[],F=[];for(let k=A*hs;k<(A+1)*hs;k++)for(let G=y*hs;G<(y+1)*hs;G++){let ue=k*96+G,he=l[ue],Y=h[ue]/255,ne=h[(ue*7+13)%9216]/255,ve,pe=0;if(he===Jn||he===Ri){if(pe=-.5,ve=c.bed,m(G,k-1)||v(S,P,L,G,0,k,G+1,0,k,G+1,pe,k,G,pe,k,0,0,1,c.bank),m(G,k+1)||v(S,P,L,G,0,k+1,G+1,0,k+1,G+1,pe,k+1,G,pe,k+1,0,0,-1,c.bank),m(G-1,k)||v(S,P,L,G,0,k,G,0,k+1,G,pe,k+1,G,pe,k,1,0,0,c.bank),m(G+1,k)||v(S,P,L,G+1,0,k,G+1,0,k+1,G+1,pe,k+1,G+1,pe,k,-1,0,0,c.bank),he===Ri){let Oe=(G+k)%2?c.wood1:c.wood2;v(S,P,L,G,.05,k,G,.05,k+1,G+1,.05,k+1,G+1,.05,k,0,1,0,Oe)}}else he===xi?(pe=-.3,ve=u.copy(c.ford).lerp(c.bed,Y*.5).clone(),m(G,k-1)||v(S,P,L,G,0,k,G+1,0,k,G+1,pe,k,G,pe,k,0,0,1,c.bank),m(G,k+1)||v(S,P,L,G,0,k+1,G+1,0,k+1,G+1,pe,k+1,G,pe,k+1,0,0,-1,c.bank),m(G-1,k)||v(S,P,L,G,0,k,G,0,k+1,G,pe,k+1,G,pe,k,1,0,0,c.bank),m(G+1,k)||v(S,P,L,G+1,0,k,G+1,0,k+1,G+1,pe,k+1,G+1,pe,k,-1,0,0,c.bank)):he===Yn?ve=u.copy(c.path1).lerp(c.path2,Y).clone():he===ji||he===vn?ve=(G+k)%2?c.st1:c.st2:he===an?ve=c.wall:he===yn?ve=c.gb:ve=u.copy((G+k)%2?c.g1:c.g2).lerp(c.gb,Y*.35).clone();v(S,P,L,G,pe,k,G,pe,k+1,G+1,pe,k+1,G+1,pe,k,0,1,0,ve);let ce=Y*6.283;if(he===Rn){let Oe={x:G+.5+(Y-.5)*.12,z:k+.5+(ne-.5)*.12,r:ce,s:.8+ne*.26,c:.86+Y*.3,cg:1};(ne>.34?T:N).push(Oe)}else if(he===an){let Oe=!0,at=1;if(s){let Ne=G+.5-48,ot=k+.5-48,lt=Ne*Ne+ot*ot;lt>3025?Oe=!1:lt>1681&&(Oe=ne<.5,at=1.25)}else if(r){let Ne=r[ue];Ne>13?Oe=!1:Ne>6&&(Oe=ne<.5,at=1.25)}if(Oe){let Ne={x:G+.5+(Y-.5)*.5,z:k+.5+(ne-.5)*.5,r:ce,s:(1.25+ne*.5)*at,c:.6+Y*.22,cg:1};(ne>.2?T:N).push(Ne)}}else he===wn?U.push({x:G+.5,z:k+.5,r:ce,s:.95+ne*.35,c:.88+Y*.22}):he===yn?(F.push({x:G+.3+Y*.12,z:k+.32+ne*.12,r:ce,s:.95+ne*.3,c:.85+Y*.3}),F.push({x:G+.72-ne*.1,z:k+.7-Y*.1,r:ce+2,s:.8+Y*.3,c:.8+ne*.3})):he===ri&&Y>.93&&F.push({x:G+.5,z:k+.5,r:ce,s:.3,sy:.22,c:1.25,cg:1.1})}let J=new Ft;J.setAttribute("position",new dt(S,3)),J.setAttribute("normal",new dt(P,3)),J.setAttribute("color",new dt(L,3));let B=new Be(J,this.matGround);B.userData.own=!0,a.add(B),p(this.geo.conifer,T),p(this.geo.broad,N),p(this.geo.rock,U),p(this.geo.bush,F)}{let A=99991,y=function(){return A=A*16807%2147483647,A/2147483647},S={};for(let P=-7;P<103;P++)for(let L=-7;L<103;L++){if(L>=0&&P>=0&&L<96&&P<96||y()>.62||s&&(L-48)*(L-48)+(P-48)*(P-48)>3025||e.arena&&e.E>8)continue;let T=Math.floor((L+16)/hs)+"_"+Math.floor((P+16)/hs);(S[T]||(S[T]=[])).push({x:L+.2+y()*.6,z:P+.2+y()*.6,r:y()*6.283,s:1.3+y()*.6,c:.5+y()*.2,cg:1})}for(let P in S)p(this.geo.conifer,S[P])}let g=new Be(new ss(96,96),new ui({color:4565228,transparent:!0,opacity:.8}));g.rotation.x=-Math.PI/2,g.position.set(96/2,-.16,96/2),g.userData.own=!0,a.add(g),this.water=g;let x=new Be(new ss(420,420),new ui({color:2380075}));x.rotation.x=-Math.PI/2,x.position.set(96/2,-.62,96/2),x.userData.own=!0,a.add(x);let _=new Be(Rm(),this.matFlat);_.position.set(48,0,48),_.userData.own=!0,a.add(_),this.orb=new Be(this.geo.ball,new Tt({color:16773808})),this.orb.position.set(48,1.12,48),this.orb.scale.setScalar(.27),a.add(this.orb);let b=new zn(Z.SHRINE_R-.14,Z.SHRINE_R,72);b.rotateX(-Math.PI/2),this.shrineRing=new Be(b,new Tt({color:16766826,transparent:!0,opacity:.9,depthWrite:!1})),this.shrineRing.position.set(48,.17,48),this.shrineRing.userData.own=!0,a.add(this.shrineRing),this.progRing=new Be(new Ft,new Tt({color:16777215,transparent:!0,opacity:.95,depthWrite:!1,side:nn})),this.progRing.position.set(48,.18,48),this.progRing.visible=!1,a.add(this.progRing),this.deliverP=-1;for(let A=0;A<(s?0:t);A++){let y=ld(e,t,A),S=new Be(Cm(gt[A].color),this.matFlat),P=y.x-48,L=y.z-48,T=Math.sqrt(P*P+L*L);S.position.set(y.x+P/T*3.4,0,y.z+L/T*3.4),S.rotation.y=Math.atan2(48-y.x,48-y.z),S.userData.own=!0,a.add(S)}this.food=[];for(let A=0;A<e.pickups.length;A++){let y=e.pickups[A],S=new Be(this.geo.food,this.matFlat);S.position.set(y.x,.6,y.z);let P=new Be(this.geo.ring,new Tt({color:7208847,transparent:!0,opacity:.7,depthWrite:!1}));P.position.set(y.x,.04,y.z),P.scale.setScalar(.9),a.add(S),a.add(P),this.food.push({m:S,sh:P})}let C=e.items||[];for(let A=0;A<C.length;A++){let y=new ui({color:16777215,flatShading:!0}),S=new Be(this.geo.gem,y);S.position.set(C[A].x,.85,C[A].z),S.visible=!1;let P=new Tt({color:16777215,transparent:!0,opacity:.75,depthWrite:!1}),L=new Be(this.geo.ring,P);L.position.set(C[A].x,.045,C[A].z),L.visible=!1,a.add(S),a.add(L),this.items.push({m:S,sh:L,mat:y,ringMat:P,type:-1})}let I=new Et(1,1,5,72,1,!0);this.zoneWall=new Be(I,new Tt({color:10640639,transparent:!0,opacity:.28,side:nn,depthWrite:!1,fog:!1})),this.zoneWall.position.set(48,2.5,48),this.zoneWall.userData.own=!0,this.zoneWall.renderOrder=3,a.add(this.zoneWall);let M=new zn(1,90,72,1);M.rotateX(-Math.PI/2),this.zoneOut=new Be(M,new Tt({color:6959032,transparent:!0,opacity:.4,depthWrite:!1})),this.zoneOut.position.set(48,.1,48),this.zoneOut.userData.own=!0,this.zoneOut.renderOrder=2,a.add(this.zoneOut);let w=new zn(.992,1,96,1);w.rotateX(-Math.PI/2),this.zoneNext=new Be(w,new Tt({color:14137087,transparent:!0,opacity:.4,depthWrite:!1})),this.zoneNext.position.set(48,.12,48),this.zoneNext.userData.own=!0,a.add(this.zoneNext)}buildMatch(e,t,n){for(;this.dyn.children.length;)this.dyn.remove(this.dyn.children[0]);for(let l=0;l<this.ninjas.length;l++){let h=this.ninjas[l];h.mat.dispose(),h.ghostMat.dispose(),h.ringMat.dispose(),h.geos.forEach(function(c){c.dispose()})}this.ninjas=[],this.projs={},this.areas={},this.slashes=[],this.rings=[],this.myId=n,this.myTeam=n>=0?e[n].team:-1;for(let l=0;l<e.length;l++){let h=e[l],c=gt[h.team].color,u=qt[h.cls].color,f=new ui({vertexColors:!0,flatShading:!0}),d=xm(c,u,h.cls),p=Fu(c,!0),v=Fu(c,!1),m=_m(c),g=ym(c),x=new Mn,_=new Mn,b=new Be(d,f),C=new Be(v,f),I=new Be(p,f),M=new Be(m,f),w=new Be(m,f),A=new Be(g,f);C.position.set(.29,.81,0),I.position.set(-.29,.81,0),M.position.set(.115,.37,0),w.position.set(-.115,.37,0),A.position.set(0,.88,-.2),_.add(b,C,I,M,w,A);let y=new Tt({color:l===n?16777215:c,transparent:!1,blending:Tc,opacity:.62,depthFunc:nr,depthWrite:!1,fog:!1}),S=new Be(d,y);S.renderOrder=1,b.renderOrder=2,C.renderOrder=2,I.renderOrder=2,M.renderOrder=2,w.renderOrder=2,A.renderOrder=2,_.add(S);let P=new Tt({color:l===n?16777215:c,transparent:!0,opacity:.9,depthWrite:!1}),L=new Be(this.geo.ring,P);L.position.y=.05,l===n&&L.scale.setScalar(1.18);let T=new Be(this.geo.disc,this.matShadow);T.position.y=.035;let N=new Be(this.geo.ball,this.matShield);N.position.y=.8,N.scale.set(.62,.95,.62),N.visible=!1,N.renderOrder=4,x.add(_,L,T,N),x.scale.setScalar(1.12),this.dyn.add(x),this.ninjas.push({root:x,body:_,torso:b,armL:C,armR:I,legL:M,legR:w,tail:A,ring:L,ringMat:P,mat:f,ghostMat:y,shield:N,shadow:T,geos:[d,p,v,m,g],cM:0,cS:0,cX:0,cH:0,cD:0,first:!0,phase:l*1.7,run:0,atkT:0,thrT:0,castT:0,dashT:0,hurtT:0,dropT:0,downK:0,seed:l*2.3,wasSt:Te,stepT:0,trail:0})}this.starMesh.count=0,this.dyn.add(this.starMesh);for(let l=0;l<this.mobsV.length;l++)this.mobsV[l].mat.dispose(),this.mobsV[l].teleMat.dispose();this.mobsV=[];let s=this.map&&this.map.mobs||[];for(let l=0;l<s.length;l++){let h=s[l].kind,c=st[h],u=new ui({vertexColors:!0,flatShading:!0}),f=new Mn,d=new Be(this.mobGeo[h],u),p=c.sc;d.scale.setScalar(p);let v=null;if(h===0){let _=new Be(this.geo.wing,u),b=new Be(this.geo.wing,u);_.position.set(.2,.62,-.02),b.position.set(-.2,.62,-.02),b.scale.x=-1,d.add(_,b),v=[_,b]}let m=new Be(this.geo.disc,this.matShadow);m.position.y=.035,m.scale.setScalar(c.r*2.4),f.add(d,m),f.visible=!1;let g=new Tt({color:16726831,transparent:!0,opacity:0,depthWrite:!1}),x=new Be(this.geo.tele,g);x.visible=!1,x.renderOrder=3,this.dyn.add(f),this.dyn.add(x),this.mobsV.push({root:f,body:d,shadow:m,mat:u,tele:x,teleMat:g,kind:h,sc:p,wings:v,cA:0,cH:0,atkT:0,slamT:0,hurtT:0,phase:l,first:!0,wasSt:0})}this.scrolls=[];for(let l=0;l<t;l++){let h=ni[l%2].color,c=new Mn,u=Tm(h),f=new Be(u,this.matFlat),d=new Be(new Et(.1,.34,7,8,1,!0),new Tt({color:h,transparent:!0,opacity:.35,depthWrite:!1,blending:As,side:nn}));d.position.y=3.2;let p=new Be(this.geo.ring,new Tt({color:h,transparent:!0,opacity:.9,depthWrite:!1}));p.position.y=.06,p.scale.setScalar(1.5),c.add(f,d,p),this.dyn.add(c),this.scrolls.push({grp:c,m:f,beam:d,halo:p})}let r=new zn(.6,.72,24);r.rotateX(-Math.PI/2),this.targetRing=new Be(r,new Tt({color:16731469,transparent:!0,opacity:.85,depthWrite:!1})),this.targetRing.visible=!1,this.dyn.add(this.targetRing);let o=new dr;o.moveTo(0,.42),o.lineTo(.3,-.12),o.lineTo(.1,-.05),o.lineTo(.1,-.3),o.lineTo(-.1,-.3),o.lineTo(-.1,-.05),o.lineTo(-.3,-.12);let a=new go(o);a.rotateX(Math.PI/2),this.arrow=new Be(a,new Tt({color:16777215,transparent:!0,opacity:.95,depthWrite:!1,side:nn,fog:!1})),this.arrow.visible=!1,this.arrow.renderOrder=4,this.dyn.add(this.arrow)}slash(e,t,n,s){let r=null;for(let o=0;o<this.slashes.length;o++)if(this.slashes[o].t<=0){r=this.slashes[o];break}if(!r){if(this.slashes.length>10)return;let o=new zn(.75,Z.MELEE_R,16,1,Math.PI/2-Z.MELEE_ARC,Z.MELEE_ARC*2);o.rotateX(-Math.PI/2);let a=new Be(o,new Tt({color:16777215,transparent:!0,opacity:.8,depthWrite:!1,side:nn,blending:As}));r={m:a,t:0},this.slashes.push(r),this.scene.add(a)}r.t=.2,r.m.material.color.set(s).lerp(En(16777215),.6),r.m.position.set(e,.75,t),r.m.rotation.y=n-Math.PI/2,r.m.visible=!0}ringFx(e,t,n,s,r,o){let a=null;for(let l=0;l<this.rings.length;l++)if(this.rings[l].t<=0){a=this.rings[l];break}if(!a){if(this.rings.length>12)return;let l=new zn(.8,1,40);l.rotateX(-Math.PI/2);let h=new Be(l,new Tt({color:16777215,transparent:!0,opacity:.9,depthWrite:!1,side:nn}));a={m:h,t:0,life:1,r:1},this.rings.push(a),this.scene.add(h)}a.t=r,a.life=r,a.r=n,a.m.material.color.set(s),a.m.position.set(e,o||.2,t),a.m.visible=!0}event(e,t){let n=this.fx,s=t.ninjas,r=e[0];if(r==="hit"){let o=s[e[1]];if(!o||o.hidden)return;let a=e[3],l=a===2?16747069:a===3?9425231:a===4?11565823:16777215;n.burst(o.x,.9,o.z,a===4?3:7,3.2,.3,.2,l,6,1),e[1]===this.myId&&(this.cam.shake=Math.min(.5,this.cam.shake+.22))}else if(r==="down"||r==="out"){let o=s[e[1]];o&&(n.burst(o.x,.6,o.z,r==="out"?22:14,2.6,.7,.42,r==="out"?10134453:14541806,0,.6),this.resurge&&r==="down"&&(n.burst(o.x,.9,o.z,16,3.6,.5,.46,gt[o.team].color,3,1.4),this.ringFx(o.x,o.z,1.8,16777215,.28)))}else if(r==="rev"||r==="resp"){let o=s[e[1]];r==="resp"&&this.resurge?this.ninjas[e[1]]&&t.phase===1&&(this.ninjas[e[1]].dropT=.3):o&&(this.ringFx(o.x,o.z,1.6,10354608,.5),n.burst(o.x,.4,o.z,14,1.4,.8,.22,10354608,-3,1.5))}else if(r==="pw"){let o=s[e[1]],a=_n[e[2]];o&&a&&!o.hidden&&(this.ringFx(o.x,o.z,1.5,a.color,.4),n.burst(o.x,.5,o.z,12,1.6,.7,.24,a.color,-4,1.6))}else if(r==="shield"){let o=s[e[1]];o&&!o.hidden&&(this.ringFx(o.x,o.z,1.9,_n[3].color,.3,.8),n.burst(o.x,.9,o.z,16,4.2,.4,.26,_n[3].color,7,1.2))}else if(r==="mhit"){let o=t.mobs&&t.mobs[e[1]];o&&n.burst(o.x,.8,o.z,6,3,.3,.2,16777215,6,1)}else if(r==="mob"||r==="mgone"){let o=t.mobs&&t.mobs[e[1]];if(o){let a=st[o.kind].tier>0;if(n.burst(o.x,.8,o.z,a?30:16,a?4:2.8,.8,a?.55:.4,st[o.kind].color,0,1),r==="mob"){let l=gt[t.ninjas[e[2]]?t.ninjas[e[2]].team:0].color;if(this.ringFx(o.x,o.z,a?3.2:2,l,.5),n.burst(o.x,1.2,o.z,a?20:10,2,.9,.3,l,-3,2),a){let h=o.x-this.cam.x,c=o.z-this.cam.z;h*h+c*c<150&&(this.cam.shake=Math.min(.5,this.cam.shake+.3))}}}}else if(r==="mspawn"){let o=t.mobs&&t.mobs[e[1]];o&&(this.ringFx(o.x,o.z,2.4,st[o.kind].color,.6),n.burst(o.x,.4,o.z,18,2.5,.8,.4,14150143,-2,2))}else if(r==="matk"){let o=t.mobs&&t.mobs[e[1]],a=this.mobsV[e[1]];if(o&&a){a.slamT=.22;let l=st[o.kind],h=l.arc<3?o.x+Math.sin(o.f)*l.reach*.6:o.x,c=l.arc<3?o.z+Math.cos(o.f)*l.reach*.6:o.z;this.ringFx(h,c,l.arc<3?1.3:l.reach+.3,16765606,.3);let u=l.tier===2,f=o.kind===1||l.tier===1;if(n.burst(h,.2,c,u?22:9,u?4.5:2.5,.45,.4,f?14217471:14272931,f?6:2,1),u){let d=o.x-this.cam.x,p=o.z-this.cam.z;d*d+p*p<120&&(this.cam.shake=Math.min(.5,this.cam.shake+.22))}}}else if(r==="star"){let o=s[e[1]];o&&!o.hidden&&n.burst(o.x,.3,o.z,4,1.4,.3,.14,16777215,-2,1)}else if(r==="heal"||r==="food"){let o=s[e[1]];o&&!o.hidden&&n.burst(o.x,.5,o.z,9,.9,.8,.2,8257434,-4,1.2)}else if(r==="pick"||r==="drop"){let o=s[e[1]];if(o){let a=ni[e[2]%2].color;this.ringFx(o.x,o.z,1.4,a,.45),n.burst(o.x,1.2,o.z,12,2.2,.6,.2,a,3,1.5)}}else if(r==="fx"){let o=e[2]/100,a=e[3]/100;if(e[1]==="boom"){this.ringFx(o,a,Z.FIRE_R,16757575,.35),n.burst(o,.5,a,26,6,.55,.55,16742959,4,2),n.burst(o,.5,a,12,3,.7,.5,16769162,2,3);let l=o-this.cam.x,h=a-this.cam.z;l*l+h*h<90&&(this.cam.shake=Math.min(.5,this.cam.shake+.25))}else if(e[1]==="heal")this.ringFx(o,a,Z.HEAL_R,5230847,.55),n.burst(o,.3,a,20,3.2,.8,.26,9430015,-3,1.5);else if(e[1]==="bram")n.burst(o,.3,a,16,3.2,.5,.3,9425231,6,2);else if(e[1]==="clink")n.burst(o,.8,a,4,2,.2,.14,16777215,5,1);else if(e[1]==="boom2"){this.ringFx(o,a,Z.BOOM_R,_n[2].color,.28),n.burst(o,.6,a,14,4.6,.4,.42,16742959,4,1.4),n.burst(o,.6,a,6,2.4,.5,.36,16769162,2,2);let l=o-this.cam.x,h=a-this.cam.z;l*l+h*h<60&&(this.cam.shake=Math.min(.5,this.cam.shake+.14))}}}update(e,t,n,s){this.time+=t;let r=this.time,o=this.fx,a=e.ninjas;for(let y=0;y<this.ninjas.length;y++)a[y]?this.updateNinja(this.ninjas[y],a[y],t,y):this.ninjas[y].root.visible=!1;for(let y=0;y<this.scrolls.length;y++){let S=this.scrolls[y],P=e.scrolls[y];if(!P){S.grp.visible=!1;continue}let L=P.carrier>=0,T=L?a[P.carrier]:null,N=!(L&&(T.hidden||T.st===Yt));if(S.grp.visible=N,!!N){if(S.grp.position.set(P.x,0,P.z),S.beam.visible=!L,S.halo.visible=!L,S.m.position.y=L?1.95+Math.sin(r*3+y)*.05:.75+Math.sin(r*2.4+y)*.12,L){let U=0;for(let F=0;F<y;F++)e.scrolls[F].carrier===P.carrier&&U++;S.m.position.y+=U*.3}S.m.rotation.y=r*1.6+y,S.m.scale.setScalar(L?.85:1.25),L||S.halo.scale.setScalar(1.4+Math.sin(r*5)*.2)}}for(let y=0;y<this.food.length;y++){let S=this.food[y],P=e.food>>y&1;S.m.visible=!!P,S.sh.visible=!!P,P&&(S.m.position.y=.62+Math.sin(r*2.6+y)*.1,S.m.rotation.y=r*1.3+y)}let l=e.items||[];for(let y=0;y<this.items.length;y++){let S=this.items[y],P=(l[y]||0)-1,L=P>=0;S.m.visible=L,S.sh.visible=L,L&&(P!==S.type&&(S.type=P,S.mat.color.set(_n[P].color),S.mat.emissive.set(_n[P].color).multiplyScalar(.4),S.ringMat.color.set(_n[P].color)),S.m.position.y=.85+Math.sin(r*3+y)*.12,S.m.rotation.y=r*2.2+y,S.sh.scale.setScalar(1.25+Math.sin(r*4+y)*.14))}let h=e.mobs||[];for(let y=0;y<this.mobsV.length;y++){let S=this.mobsV[y],P=h[y];if(!P||P.st===0){S.root.visible=!1,S.tele.visible=!1,S.first=!0;continue}S.root.visible=!0,S.first&&(S.cA=P.cA,S.cH=P.cH,S.first=!1),P.cA!==S.cA&&(S.cA=P.cA,S.atkT=st[P.kind].wind),P.cH!==S.cH&&(S.cH=P.cH,S.hurtT=.14);let L=Dn(this.map,P.x,P.z)===xi;S.root.position.set(P.x,L?-.24:0,P.z),S.root.rotation.y=P.f,S.shadow.visible=!L,S.phase+=t*(P.moving?11:2.2);let T=0,N=P.moving?Math.abs(Math.sin(S.phase))*.08:Math.sin(S.phase)*.02;if(S.kind===0){N=.55+Math.sin(r*3+y)*.1;let F=Math.sin(r*(P.moving||P.wind?22:9)+y)*(P.moving||P.wind?.75:.35);S.wings[0].rotation.z=F,S.wings[1].rotation.z=F}else S.kind===1?S.body.rotation.y=Math.sin(r*5+y)*.25:S.kind===2&&(S.body.rotation.y=Math.sin(r*1.6+y)*.3);if(P.wind&&S.atkT>0){S.atkT-=t;let F=1-Math.max(0,S.atkT)/st[P.kind].wind;T=-.35*F,N+=.12*F}S.slamT>0&&(S.slamT-=t,T=.45*Math.max(0,S.slamT)/.22,S.kind===1&&(N+=.9*Math.sin(Math.max(0,S.slamT)/.22*Math.PI))),S.body.rotation.x=T,S.body.position.y=N,S.body.scale.set(S.sc,S.sc*(1+(P.wind?.06:0)),S.sc);let U=0;if(S.hurtT>0&&(S.hurtT-=t,U=Math.max(0,S.hurtT)/.14*.9),S.mat.emissive.setRGB(U+(P.st===2?.15:0),U+(P.st===2?.2:0),U+(P.st===2?.3:0)),S.tele.visible=!!P.wind,P.wind){let F=st[P.kind];S.tele.position.set(P.x,.08,P.z),S.tele.scale.setScalar(F.reach+.35),S.teleMat.opacity=.35+.45*Math.abs(Math.sin(r*14))}L&&P.moving&&Math.random()<.3&&o.add(P.x,.05,P.z,(Math.random()-.5)*1.5,1.2,(Math.random()-.5)*1.5,.35,.18,14217471,5)}let c=e.stars||[],u=Math.min(Om,c.length>>1),f=this._d;for(let y=0;y<u;y++){let S=c[y*2]/10,P=c[y*2+1]/10;f.position.set(S,.11,P),f.rotation.set(.22,(c[y*2]*.37+c[y*2+1]*.11)%6.283+r*1.4,0),f.scale.setScalar(1.3),f.updateMatrix(),this.starMesh.setMatrixAt(y,f.matrix),Math.random()<.022&&o.add(S,.25,P,0,.7,0,.4,.13,16777215,0)}this.starMesh.count=u,u&&(this.starMesh.instanceMatrix.needsUpdate=!0);let d={};for(let y=0;y<e.proj.length;y++){let S=e.proj[y];d[S.id]=1;let P=this.projs[S.id];if(!P){let L;S.kind===0?L=new Be(this.geo.shuriken,this.matFlat):(L=new Be(this.geo.ball,new Tt({color:S.kind===1?16753213:10212938})),L.scale.setScalar(S.kind===1?.3:.18)),P=this.projs[S.id]={m:L,kind:S.kind,life:Math.max(.05,S.ttl),t:0},this.scene.add(L)}if(P.t+=t,S.kind===0)P.m.position.set(S.x,.85,S.z),P.m.rotation.y=r*30,S.boom?o.add(S.x,.85,S.z,0,.2,0,.22,.24,16747069,0):Math.random()<.5&&o.add(S.x,.85,S.z,0,0,0,.14,.11,13621478,0);else{let L=S.kind===1?Z.FIRE_T:Z.SEED_T,T=yt(1-S.ttl/L,0,1),N=.9+Math.sin(T*Math.PI)*2.2;P.m.position.set(S.x,N,S.z),o.add(S.x,N,S.z,Math.random()-.5,.4,Math.random()-.5,.3,S.kind===1?.36:.2,S.kind===1?16742959:8372031,0)}}for(let y in this.projs)if(!d[y]){let S=this.projs[y];this.scene.remove(S.m),S.kind!==0&&S.m.material.dispose(),delete this.projs[y]}let p={};for(let y=0;y<e.areas.length;y++){let S=e.areas[y];p[S.id]=1;let P=this.areas[S.id];if(!P){let T=new Be(this.geo.bramble,this.matFlat),N=new lr(S.r,28);N.rotateX(-Math.PI/2);let U=new Be(N,new Tt({color:S.team===this.myTeam?7323450:12597547,transparent:!0,opacity:.25,depthWrite:!1}));U.position.y=.07;let F=new Mn;F.add(T,U),F.position.set(S.x,0,S.z),P=this.areas[S.id]={grp:F,m:T,d:U,grow:0},this.scene.add(F)}P.grow=Math.min(1,P.grow+t*6);let L=P.grow*Math.min(1,S.ttl*2.5);P.m.scale.set(1,Math.max(.01,L),1)}for(let y in this.areas)if(!p[y]){let S=this.areas[y];this.scene.remove(S.grp),S.d.geometry.dispose(),S.d.material.dispose(),delete this.areas[y]}for(let y=0;y<this.slashes.length;y++){let S=this.slashes[y];S.t<=0||(S.t-=t,S.m.material.opacity=Math.max(0,S.t/.2)*.8,S.t<=0&&(S.m.visible=!1))}for(let y=0;y<this.rings.length;y++){let S=this.rings[y];if(S.t<=0)continue;S.t-=t;let P=1-Math.max(0,S.t)/S.life;S.m.scale.setScalar(.2+P*S.r),S.m.material.opacity=(1-P)*.9,S.t<=0&&(S.m.visible=!1)}let v=e.zone,m=Math.max(.3,v.r);this.zoneWall.scale.set(m,1,m),this.zoneOut.scale.set(m,1,m),this.zoneWall.material.opacity=.22+Math.sin(r*2.2)*.06;let g=v.to<v.r-.5&&v.stage<5;this.zoneNext.visible=g,g&&this.zoneNext.scale.set(Math.max(.3,v.to),1,Math.max(.3,v.to));let x=s&&s.sealed;this.shrineRing.material.color.set(x?9410211:16766826),this.shrineRing.material.opacity=x?.5:.7+Math.sin(r*4)*.25,this.orb.scale.setScalar(x?.2:.27+Math.sin(r*3)*.035),this.orb.material.color.set(x?10134453:16773808);let _=0,b=-1;for(let y=0;y<e.deliver.length;y++)e.deliver[y]>_&&(_=e.deliver[y],b=y);let C=Math.round(_*50);if(C!==this.deliverP)if(this.deliverP=C,this.progRing.geometry.dispose(),C>0){let y=new zn(Z.SHRINE_R-.75,Z.SHRINE_R-.25,64,1,0,Math.PI*2*C/50);y.rotateX(-Math.PI/2),this.progRing.geometry=y,this.progRing.material.color.set(gt[b].color),this.progRing.visible=!0}else this.progRing.geometry=new Ft,this.progRing.visible=!1;this.water&&(this.water.position.y=-.17+Math.sin(r*1.3)*.02);let I=n>=0?a[n]:null,M=s&&s.target;this.targetRing.visible=!!M,M&&(this.targetRing.position.set(M.x,.06,M.z),this.targetRing.scale.setScalar(1+Math.sin(r*9)*.07));let w=s&&s.objective;if(this.arrow.visible=!!(w&&I&&I.st===Te),this.arrow.visible){let y=w.x-I.x,S=w.z-I.z;if(Math.sqrt(y*y+S*S)<3.2)this.arrow.visible=!1;else{let L=Math.atan2(y,S),T=1.5+Math.sin(r*5)*.08;this.arrow.position.set(I.x+Math.sin(L)*T,.2,I.z+Math.cos(L)*T),this.arrow.rotation.y=L,this.arrow.material.color.set(w.color)}}o.update(t);let A=this.cam;if(s&&s.orbit){this.orbit+=t*.07;let y=17;this.camera.position.set(48+Math.sin(this.orbit)*y,12,48+Math.cos(this.orbit)*y),this.camera.lookAt(48,1.2,48)}else{if(I){let T=1-Math.exp(-t*9),N=I.x-A.x,U=I.z-A.z;N*N+U*U>400?(A.x=I.x,A.z=I.z):(A.x+=N*T,A.z+=U*T)}let y=0,S=0;A.shake>0&&(A.shake=Math.max(0,A.shake-t*1.6),y=(Math.random()-.5)*A.shake,S=(Math.random()-.5)*A.shake);let P=.8,L=A.z+1.6;this.camera.position.set(A.x+y,P+Math.sin(Um)*ku,L+Math.cos(Um)*ku+S),this.camera.lookAt(A.x+y,P,L+S)}this.camera.updateMatrixWorld()}updateNinja(e,t,n,s){let r=t.st!==Yt&&!t.hidden&&!(this.resurge&&t.st===Ot);if(e.root.visible=r,(e.first||!r)&&(e.cM=t.cM,e.cS=t.cS,e.cX=t.cX,e.cH=t.cH,e.cD=t.cD,e.first=!1,e.wasSt=t.st,!r))return;let o=this.time,a=this.fx,l=this.map&&Dn(this.map,t.x,t.z)===xi;e.root.position.set(t.x,l?-.24:0,t.z),e.ring.position.y=l?.27:.05,e.shadow.visible=!l,e.root.rotation.y=t.f;let h=gt[t.team].color;t.cM!==e.cM&&(e.cM=t.cM,e.atkT=.26,this.slash(t.x,t.z,t.f,h),this.onCue&&this.onCue("swing",t,s)),t.cS!==e.cS&&(e.cS=t.cS,e.thrT=.2,this.onCue&&this.onCue("throw",t,s)),t.cX!==e.cX&&(e.cX=t.cX,e.castT=.42,this.ringFx(t.x,t.z,1.3,qt[t.cls].color,.35),this.onCue&&this.onCue("cast",t,s)),t.cD!==e.cD&&(e.cD=t.cD,e.dashT=.24,a.burst(t.x,.2,t.z,9,2.2,.45,.34,15265527,0,.5),this.onCue&&this.onCue("dash",t,s)),t.cH!==e.cH&&(e.cH=t.cH,e.hurtT=.16),e.run+=((t.moving&&t.st===Te?1:0)-e.run)*Math.min(1,n*12),e.phase+=n*13.5*e.run;let c=Math.sin(e.phase)*.95*e.run;e.legL.rotation.x=c,e.legR.rotation.x=-c,e.armL.rotation.x=-c*.8,e.armR.rotation.x=c*.8,e.armL.rotation.z=0,e.armR.rotation.z=0;let u=Math.abs(Math.sin(e.phase))*.07*e.run+Math.sin(o*2.2+e.seed)*.012,f=.14*e.run,d=0;if(e.atkT>0){e.atkT-=n;let b=1-Math.max(0,e.atkT)/.26;e.armR.rotation.x=-2.5+b*3.3,e.armR.rotation.z=-.35,d=(.5-b)*1,f+=.18}if(e.thrT>0){e.thrT-=n;let b=1-Math.max(0,e.thrT)/.2;e.armL.rotation.x=-2.7+b*2.5}if(e.castT>0){e.castT-=n;let b=Math.sin((1-Math.max(0,e.castT)/.42)*Math.PI);e.armL.rotation.x=-2.9*b,e.armR.rotation.x=-2.9*b,e.armL.rotation.z=.3*b,e.armR.rotation.z=-.3*b,u+=.12*b}let p=1;if(e.dashT>0&&(e.dashT-=n,f=.75,p=1.3,Math.random()<.8&&a.add(t.x,.6,t.z,0,.2,0,.25,.4,h,0)),e.run>.6&&(e.stepT-=n,e.stepT<=0&&(e.stepT=.23,l?a.burst(t.x,.04,t.z,3,1.4,.35,.16,14217471,6,1.6):Math.random()<.5&&a.add(t.x,.06,t.z,0,.3,0,.3,.2,13220239,0),this.onCue&&s===this.myId&&this.onCue("step",t,s))),e.dropT>0){e.dropT-=n;let b=Math.max(0,e.dropT)/.3;u+=b*b*8,e.dropT<=0&&(a.burst(t.x,.15,t.z,12,2.8,.4,.34,15265527,0,.4),this.ringFx(t.x,t.z,1.5,h,.32),this.onCue&&this.onCue("land",t,s))}if(e.shield.visible=t.st===Te&&!!t.pw&&t.pw.indexOf(3)>=0,e.shield.visible){let b=1+Math.sin(o*6+e.seed)*.05;e.shield.scale.set(.62*b,.95,.62*b)}let v=t.st===Ot?1:0;e.downK+=(v-e.downK)*Math.min(1,n*10),e.body.rotation.x=f*(1-e.downK)-1.5*e.downK,e.body.rotation.y=d,e.body.position.y=u*(1-e.downK)+.2*e.downK,e.body.scale.set(1,1,p),e.tail.rotation.x=-.25-e.run*.8+Math.sin(o*11+e.seed)*.13*(.3+e.run),e.ring.visible=!v,s===this.myId&&e.ring.scale.setScalar(1.18+Math.sin(o*4)*.05);let m=e.mat.emissive,g=0,x=0,_=0;if(t.fl&sa){let b=.25+Math.sin(o*18)*.12;g+=b,x+=b*.35,Math.random()<.3&&a.add(t.x+(Math.random()-.5)*.4,.5+Math.random()*.8,t.z+(Math.random()-.5)*.4,0,1.4,0,.4,.22,16747069,-1)}if(t.fl&Os?x+=.1:t.fl&Fs&&(x+=.05),e.hurtT>0){e.hurtT-=n;let b=Math.max(0,e.hurtT)/.16;g+=b*.9,x+=b*.9,_+=b*.9}v&&(g*=.3,x*=.3,_*=.3),m.setRGB(g,x,_),t.fl&ra&&e.dashT<=0?e.body.visible=Math.sin(o*40)>-.3:e.body.visible=!0,e.wasSt!==t.st&&(e.wasSt=t.st)}project(e,t,n,s){let r=this._v.set(e,t,n).project(this.camera);return s.x=(r.x*.5+.5)*this.w,s.y=(-r.y*.5+.5)*this.h,s.vis=r.z>-1&&r.z<1&&r.x>-1.15&&r.x<1.15&&r.y>-1.15&&r.y<1.15,s}render(){this.renderer.render(this.scene,this.camera)}};var Ml=class{constructor(){this.jx=0,this.jz=0,this.held={melee:!1,shuriken:!1,dash:!1,special:!1},this.edge={dash:!1,special:!1,melee:!1,shuriken:!1},this.keys={},this.joyId=null,this.ox=0,this.oy=0,this.out={mx:0,mz:0,melee:!1,shuriken:!1,dash:!1,special:!1},this.enabled=!1,this.R=54}attach(e,t,n,s){this.zone=e,this.base=t,this.knob=n;let r=this,o={passive:!1};e.addEventListener("pointerdown",function(l){if(l.preventDefault(),r.joyId!==null)return;r.joyId=l.pointerId,r.ox=l.clientX,r.oy=l.clientY;try{e.setPointerCapture(l.pointerId)}catch{}let h=e.getBoundingClientRect();t.style.left=l.clientX-h.left+"px",t.style.top=l.clientY-h.top+"px",t.classList.add("on"),r.moveJoy(l)},o),e.addEventListener("pointermove",function(l){l.pointerId===r.joyId&&(l.preventDefault(),r.moveJoy(l))},o);function a(l){l.pointerId===r.joyId&&(r.joyId=null,r.jx=0,r.jz=0,t.classList.remove("on"),t.style.left="",t.style.top="",n.style.transform="translate(-50%,-50%)")}e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a),e.addEventListener("lostpointercapture",a);for(let l=0;l<s.length;l++){let h=s[l],c=h.getAttribute("data-act"),u=function(d){d.preventDefault(),r.held[c]=!0,c in r.edge&&(r.edge[c]=!0),h.classList.add("down");try{h.setPointerCapture(d.pointerId)}catch{}},f=function(){r.held[c]=!1,h.classList.remove("down")};h.addEventListener("pointerdown",u,o),h.addEventListener("pointerup",f),h.addEventListener("pointercancel",f),h.addEventListener("lostpointercapture",f),h.addEventListener("contextmenu",function(d){d.preventDefault()})}window.addEventListener("keydown",function(l){l.repeat||(r.keys[l.code]=!0,(l.code==="KeyL"||l.code==="Space")&&(r.edge.dash=!0),(l.code==="KeyI"||l.code==="KeyU")&&(r.edge.special=!0),l.code==="KeyJ"&&(r.edge.melee=!0),l.code==="KeyK"&&(r.edge.shuriken=!0))}),window.addEventListener("keyup",function(l){r.keys[l.code]=!1}),window.addEventListener("blur",function(){r.reset()})}moveJoy(e){let t=e.clientX-this.ox,n=e.clientY-this.oy,s=Math.sqrt(t*t+n*n),r=this.R,o=s>r?r/s:1;this.knob.style.transform="translate(calc(-50% + "+t*o+"px), calc(-50% + "+n*o+"px))";let a=Math.min(1,s/r);if(a<.2){this.jx=0,this.jz=0;return}let l=Math.min(1,(a-.2)/.45);this.jx=t/s*l,this.jz=n/s*l}reset(){this.jx=0,this.jz=0,this.joyId=null,this.keys={};for(let e in this.held)this.held[e]=!1;this.edge.dash=!1,this.edge.special=!1,this.edge.melee=!1,this.edge.shuriken=!1,this.base&&(this.base.classList.remove("on"),this.base.style.left="",this.base.style.top=""),this.knob&&(this.knob.style.transform="translate(-50%,-50%)")}read(){let e=this.out,t=this.keys,n=this.jx,s=this.jz,r=(t.KeyD||t.ArrowRight?1:0)-(t.KeyA||t.ArrowLeft?1:0),o=(t.KeyS||t.ArrowDown?1:0)-(t.KeyW||t.ArrowUp?1:0);if(r||o){let a=Math.sqrt(r*r+o*o);n=r/a,s=o/a}return this.enabled||(n=0,s=0),e.mx=n,e.mz=s,e.melee=this.enabled&&(this.held.melee||!!t.KeyJ||this.edge.melee),e.shuriken=this.enabled&&(this.held.shuriken||!!t.KeyK||this.edge.shuriken),e.dash=this.enabled&&this.edge.dash,e.special=this.enabled&&this.edge.special,this.edge.dash=!1,this.edge.special=!1,this.edge.melee=!1,this.edge.shuriken=!1,e}};var Sl=class{constructor(){this.ctx=null,this.sfxOn=!0,this.musicOn=!0,this.master=null,this.musicGain=null,this.timer=null,this.step=0,this.nextT=0,this.mood=0,this.noiseBuf=null,this.last={}}unlock(){if(!this.ctx){let e=window.AudioContext||window.webkitAudioContext;if(!e)return;try{this.ctx=new e}catch{return}this.master=this.ctx.createGain(),this.master.gain.value=.9;let t=this.ctx.createDynamicsCompressor();this.master.connect(t),t.connect(this.ctx.destination),this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=this.musicOn?.5:0,this.musicGain.connect(this.master);let n=this.ctx.sampleRate*1;this.noiseBuf=this.ctx.createBuffer(1,n,this.ctx.sampleRate);let s=this.noiseBuf.getChannelData(0);for(let r=0;r<n;r++)s[r]=Math.random()*2-1;this.startMusic()}if(this.ctx.state!=="running")try{this.ctx.resume()}catch{}}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend()}resume(){if(this.ctx&&this.ctx.state!=="running")try{this.ctx.resume()}catch{}}setSfx(e){this.sfxOn=e}setMusic(e){this.musicOn=e,this.musicGain&&this.musicGain.gain.setTargetAtTime(e?.5:0,this.ctx.currentTime,.1)}setMood(e){this.mood=e}tone(e,t,n,s,r,o,a){let l=this.ctx;if(!l)return;let h=l.currentTime+(o||0),c=l.createOscillator(),u=l.createGain();c.type=n||"sine",c.frequency.setValueAtTime(e,h),r&&c.frequency.exponentialRampToValueAtTime(Math.max(20,r),h+t),u.gain.setValueAtTime(1e-4,h),u.gain.exponentialRampToValueAtTime(Math.max(2e-4,s),h+.008),u.gain.exponentialRampToValueAtTime(1e-4,h+t),c.connect(u),u.connect(a||this.master),c.start(h),c.stop(h+t+.03)}noise(e,t,n,s,r,o,a,l){let h=this.ctx;if(!h)return;let c=h.currentTime+(a||0),u=h.createBufferSource(),f=h.createBiquadFilter(),d=h.createGain();u.buffer=this.noiseBuf,u.loop=!0,f.type=n||"lowpass",f.Q.value=o||.8,f.frequency.setValueAtTime(s,c),r&&f.frequency.exponentialRampToValueAtTime(Math.max(30,r),c+e),d.gain.setValueAtTime(1e-4,c),d.gain.exponentialRampToValueAtTime(Math.max(2e-4,t),c+.01),d.gain.exponentialRampToValueAtTime(1e-4,c+e),u.connect(f),f.connect(d),d.connect(l||this.master),u.start(c,Math.random()*.5),u.stop(c+e+.03)}play(e,t){if(!this.ctx||!this.sfxOn||this.ctx.state!=="running"||(t==null&&(t=1),t<=.03))return;let n=this.ctx.currentTime;if(!(this.last[e]&&n-this.last[e]<.035))switch(this.last[e]=n,e){case"click":this.tone(880,.05,"triangle",.12*t);break;case"step":this.noise(.05,.035*t,"lowpass",500,200,.7);break;case"swing":this.noise(.13,.2*t,"bandpass",900,3200,1.2);break;case"throw":this.noise(.09,.14*t,"highpass",2500,6e3,.8),this.tone(1400,.07,"triangle",.05*t,2200);break;case"roar":this.tone(110,.7,"sawtooth",.12*t,70),this.noise(.6,.16*t,"lowpass",700,200,1);break;case"slam":this.tone(80,.35,"sine",.38*t,40),this.noise(.3,.26*t,"lowpass",1400,100,.7);break;case"grunt":this.tone(170,.14,"sawtooth",.08*t,110);break;case"star":this.tone(1900,.05,"triangle",.1*t,2500);break;case"power":this.tone(523,.09,"square",.06*t),this.tone(784,.09,"square",.06*t,0,.07),this.tone(1047,.2,"triangle",.13*t,0,.14);break;case"shield":this.tone(1250,.22,"triangle",.16*t,900),this.noise(.08,.14*t,"highpass",3500,6e3,1);break;case"land":this.tone(150,.12,"sine",.22*t,70),this.noise(.1,.12*t,"lowpass",900,300,.7);break;case"clink":this.tone(2600,.06,"square",.04*t,1800);break;case"hit":this.tone(190,.1,"sine",.3*t,60),this.noise(.06,.16*t,"lowpass",2400,500,.7);break;case"hurt":this.tone(240,.16,"sawtooth",.16*t,70),this.noise(.1,.22*t,"lowpass",1800,300,.7);break;case"dash":this.noise(.2,.2*t,"bandpass",2600,500,1.4);break;case"cast":this.tone(330,.22,"triangle",.14*t,880);break;case"boom":this.tone(130,.45,"sine",.42*t,34),this.noise(.5,.36*t,"lowpass",2600,120,.6);break;case"heal":this.tone(523,.14,"sine",.13*t),this.tone(659,.14,"sine",.13*t,0,.08),this.tone(784,.22,"sine",.13*t,0,.16);break;case"bram":this.tone(220,.25,"sawtooth",.09*t,90),this.noise(.25,.14*t,"bandpass",700,1800,2);break;case"food":this.tone(660,.08,"triangle",.14*t),this.tone(990,.12,"triangle",.14*t,0,.07);break;case"pick":this.tone(880,.12,"triangle",.16*t),this.tone(1175,.12,"triangle",.16*t,0,.09),this.tone(1568,.3,"triangle",.16*t,0,.18);break;case"drop":this.tone(700,.14,"triangle",.14*t,350),this.tone(440,.24,"triangle",.12*t,220,.12);break;case"down":this.tone(392,.16,"square",.07*t,300),this.tone(262,.3,"square",.07*t,130,.14);break;case"revive":this.tone(392,.12,"triangle",.14*t),this.tone(523,.12,"triangle",.14*t,0,.1),this.tone(784,.3,"triangle",.14*t,0,.2);break;case"beep":this.tone(620,.12,"square",.07*t);break;case"go":this.tone(930,.4,"square",.08*t),this.tone(1240,.4,"triangle",.1*t);break;case"alarm":this.tone(440,.22,"sawtooth",.07*t),this.tone(349,.3,"sawtooth",.07*t,0,.24);break;case"gong":this.tone(98,1.6,"sine",.3*t,92),this.tone(196,1.2,"triangle",.1*t,190),this.noise(.5,.08*t,"bandpass",900,400,3);break;case"win":[523,659,784,1047,1319].forEach((s,r)=>this.tone(s,.3,"triangle",.16*t,0,r*.13));break;case"lose":[392,330,262,196].forEach((s,r)=>this.tone(s,.4,"triangle",.14*t,0,r*.2));break;default:break}}startMusic(){this.timer||(this.nextT=this.ctx.currentTime+.1,this.seed=12345,this.timer=setInterval(()=>this.schedule(),90))}rnd(){return this.seed=this.seed*16807%2147483647,this.seed/2147483647}schedule(){let e=this.ctx;if(!e||e.state!=="running")return;this.nextT<e.currentTime&&(this.nextT=e.currentTime+.05);let n=60/(this.mood===2?132:this.mood===1?104:84)/2,s=[146.83,174.61,196,220,261.63,293.66,349.23,392,440,523.25];for(;this.nextT<e.currentTime+.3;){let r=this.step++%32,o=this.nextT-e.currentTime,a=Math.floor(r/8);if((r%8===0||this.mood===2&&r%4===0||this.mood>=1&&r%16===6)&&(this.tone(96,.22,"sine",.3,42,o,this.musicGain),this.noise(.05,.05,"lowpass",900,200,.7,o,this.musicGain)),this.mood>=1&&r%4===2&&this.noise(.03,.03,"highpass",6e3,0,.7,o,this.musicGain),r%8===0){let h=[0,0,2,1][a];this.tone(s[h]/2,n*7,"triangle",.12,0,o,this.musicGain)}let l=this.mood===2?.62:this.mood===1?.5:.36;(r%2===0?this.rnd()<l+.2:this.rnd()<l-.25)&&(this.note=this.note==null?5:this.note+Math.round((this.rnd()-.5)*4),this.note<2&&(this.note=3),this.note>9&&(this.note=7),this.tone(s[this.note],.5,"triangle",.075,0,o,this.musicGain),this.tone(s[this.note]*2,.12,"sine",.02,0,o,this.musicGain)),this.nextT+=n}}};var pn={melee:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.5 2.5l1 1L10 15l-1.6-1.6z"/><path fill="currentColor" d="M5.8 12.6l5.6 5.6-1.5 1.4-2-2-2.6 2.7-1.6-1.6 2.7-2.6-2-2z"/></svg>',shuriken:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6-2.6 7.9-2.6-7.9L1.5 12l7.9-2.6z"/><circle cx="12" cy="12" r="1.9" fill="#182033"/></svg>',dash:'<svg viewBox="0 0 24 24"><path d="M4 5l7 7-7 7M12.5 5l7 7-7 7" stroke="currentColor" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',cls:['<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12.6 1.5c.9 4.1 5.4 5.9 5.4 11.4a6 6 0 0 1-12 0c0-2.3 1.2-3.8 2.4-4.9.1 2.2 1 3.4 2.2 3.4.2-3.300-.9-5.600 2-9.900z"/></svg>','<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.800c4.300 6.100 6.500 8.800 6.500 12.400a6.500 6.500 0 0 1-13 0c0-3.600 2.200-6.300 6.500-12.400z"/></svg>','<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3.500 20.500C3.500 10 9.500 3.500 20.500 3.500c0 11-6.500 17-17 17z"/><path d="M4.500 19.500L14 10" stroke="#182033" stroke-width="1.700" fill="none"/></svg>'],sol:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#ffcf4a"/><g stroke="#ffcf4a" stroke-width="2.200" stroke-linecap="round"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.900 4.900l2.100 2.100M17 17l2.100 2.100M4.900 19.100L7 17M17 7l2.100-2.100"/></g></svg>',luna:'<svg viewBox="0 0 24 24"><path fill="#c3d0ff" d="M15 2.500a9.500 9.500 0 1 0 6.500 16.200A8.300 8.300 0 0 1 15 2.500z"/></svg>'};function Ve(i){return document.getElementById(i)}function Gt(i){return String(i).replace(/[&<>"]/g,function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[e]})}function Fm(i){i=Math.max(0,Math.ceil(i));let e=Math.floor(i/60),t=i%60;return e+":"+(t<10?"0":"")+t}var Tl=class{constructor(e,t){this.h=e,this.set=t,this.root=Ve("ui"),this.hud=Ve("hud"),this.name=null,this.data={},this.overlay=null;let n=this;this.root.addEventListener("click",function(s){let r=s.target;for(;r&&r!==n.root&&!(r.getAttribute&&r.getAttribute("data-a"));)r=r.parentNode;!r||r===n.root||(n.h.click(),n.action(r.getAttribute("data-a"),r.getAttribute("data-v"),r))}),Ve("bMenu").addEventListener("click",function(){n.h.click(),n.h.pause()}),this.bannerT=0,this.feed=[],this.slow=0,this.mmT=0,this.lb=[],this.dmgPool=[],this.dmgI=0,this._p={x:0,y:0,vis:!1},this.mapImg=null}show(e,t){this.name=e,this.data=t||{},this.overlay=null,this.render()}hide(){this.name=null,this.overlay=null,this.root.innerHTML=""}showOverlay(e){this.overlay=e,this.render()}closeOverlay(){this.overlay=null,this.render()}action(e,t,n){let s=this.set,r=this.data,o=this.h;switch((this.name==="mp"||this.name==="opts")&&this.readName(),e){case"go":this.show(t),t==="lan"&&o.lanScan();break;case"back":o.back(this.name);break;case"cls":s.cls=+t,o.save(),this.name==="lobby"&&o.lobbyCls(+t),this.render();break;case"diff":s.diff=+t,o.save(),this.name==="lobby"&&o.lobbyOpt(),this.render();break;case"teams":s.teams=+t,o.save(),this.name==="lobby"&&o.lobbyOpt(),this.render();break;case"gmode":s.mode=+t==0?0:1,o.save(),this.name==="lobby"&&o.lobbyOpt(),this.render();break;case"gmap":s.map=Math.max(0,Math.min(2,+t|0)),o.save(),this.name==="lobby"&&o.lobbyOpt(),this.render();break;case"solo":o.solo();break;case"host":this.readName(),o.host(t);break;case"join":this.readName(),o.join("net",(Ve("fCode").value||"").trim().toUpperCase());break;case"joinip":this.readName(),o.join("lan",t||(Ve("fIp").value||"").trim());break;case"joinhere":this.readName(),o.join("lan",location.host);break;case"scan":o.lanScan();break;case"slot":{let a=t.split(",");o.lobbySlot(+a[0],+a[1]);break}case"start":o.start();break;case"again":o.again();break;case"leave":o.leave();break;case"resume":o.resume();break;case"tog":s[t]=!s[t],o.save(),o.applySettings(),this.render();break;case"ov":this.showOverlay(t);break;case"ovx":this.closeOverlay();break;default:break}}readName(){let e=Ve("fName");if(!e)return;let t=e.value.replace(/[<>&"]/g,"").trim().slice(0,12);t&&(this.set.name=t,this.h.save())}msg(e,t){let n=Ve("msg");n&&(n.textContent=e||"",n.className="msg"+(t?" err":"")),this.data.msg=e,this.data.err=t}clsCards(){let e=this.set,t='<div class="cards">';for(let n=0;n<3;n++)t+='<button class="card'+(e.cls===n?" on":"")+'" data-a="cls" data-v="'+n+'" style="color:'+qt[n].css+'">'+pn.cls[n]+"<b>"+qt[n].name+"</b><i>"+qt[n].role+"</i></button>";return t+'</div><div class="note"><b style="color:'+qt[e.cls].css+'">'+qt[e.cls].spec+":</b> "+qt[e.cls].desc+"</div>"}chips(e,t,n,s){let r='<div class="chips">';for(let o=0;o<t.length;o++){let a=s?s[o]:o;r+='<button class="chip'+(n===a?" on":"")+'" data-a="'+e+'" data-v="'+a+'">'+t[o]+"</button>"}return r+"</div>"}modeBlock(e,t){return e=e===0?0:1,t?this.chips("gmode",[ii[1].name,ii[0].name],e,[1,0])+'<div class="note" style="min-height:0;margin-top:6px">'+ii[e].tag+"</div>":'<div class="note" style="min-height:0;margin-top:12px"><b style="color:var(--gold)">Modo '+ii[e].name+".</b> "+ii[e].tag+"</div>"}mapBlock(e,t){e=e|0;let n=ea[e]||ea[0];return t?this.chips("gmap",ea.map(function(s){return s.short}),e)+'<div class="note" style="min-height:0;margin-top:6px"><b>'+n.name+":</b> "+n.tag+"</div>":'<div class="note" style="min-height:0;margin-top:8px"><b style="color:var(--gold)">Mapa '+n.name+".</b> "+n.tag+"</div>"}toggles(){let e=this.set;function t(n,s){return'<div class="toggle"><span>'+s+'</span><button class="sw'+(e[n]?" on":"")+'" data-a="tog" data-v="'+n+'"></button></div>'}return t("sfx","Sonidos")+t("music","M\xFAsica")+t("hq","Gr\xE1ficos n\xEDtidos")}helpHtml(){return'<div class="help"><p><b>Objetivo.</b> Cada equipo de 3 empieza con un pergamino: '+this.i(pn.sol)+" Sol o "+this.i(pn.luna)+" Luna. Gana el primero que lleve <b>uno de cada tipo</b> al santuario del centro, o el \xFAltimo equipo en pie.</p><p><b>Controles.</b> Palanca a la izquierda para moverte. "+this.i(pn.melee)+" espada, "+this.i(pn.shuriken)+" estrellas, "+this.i(pn.dash)+" esquiva y tu t\xE9cnica especial. Apuntas solo al rival m\xE1s cercano.</p><h3>Modo Frenes\xED</h3><p><b>Golpes.</b> Dos cortes o tres estrellas derriban, y el corte te lanza hacia el rival.</p><p><b>Esquiva.</b> Dos cargas que vuelven en un segundo: \xFAsala todo el tiempo.</p><p><b>Estrellas.</b> Llevas tres y no se recargan: quedan donde caen y hay que ir a recogerlas. Tambi\xE9n puedes quedarte con las del rival.</p><p><b>Reaparici\xF3n.</b> Si caes, vuelves en pocos segundos junto a un compa\xF1ero; cada derribo de tu equipo acorta la espera. Cuando llega la <b>\xFAltima vida</b>, quien cae queda fuera.</p><p><b>Potenciadores.</b> "+_n.map(function(e){return'<b style="color:'+e.css+'">'+e.name+"</b>: "+e.desc.toLowerCase()}).join(". ")+". Llevas hasta tres y los pierdes al caer.</p><p><b>Santuario.</b> Se abre cuando termina el primer cierre de la niebla.</p><h3>Modo Cl\xE1sico</h3><p><b>1 \xB7 Cacer\xEDa (1:30).</b> Derriba a quien lleve el pergamino que te falta para quit\xE1rselo. Los ca\xEDdos reaparecen en su campamento y el santuario est\xE1 sellado.</p><p><b>2 \xB7 Muerte s\xFAbita.</b> La niebla morada se cierra, ya nadie reaparece y el santuario se abre. P\xE1rate junto a un compa\xF1ero ca\xEDdo para levantarlo.</p><h3>Mapas con carriles</h3><p><b>Cruce de Clanes</b> y <b>Anillo del R\xEDo</b>: cada equipo sale de una esquina. Los carriles de tierra unen las bases; entre ellos est\xE1 la jungla, con pasillos y matorrales. El r\xEDo se cruza caminando.</p><p><b>Criaturas.</b> Si las golpeas te persiguen un poco y luego vuelven a su sitio. El equipo que da el \xFAltimo golpe se lleva el premio. "+st.map(function(e){return'<b style="color:'+e.css+'">'+e.name+"</b>: "+e.prize}).join(". ")+". Los p\xE1jaros vuelan por los claros de la jungla y los peces saltan en sus estanques. Pulpos y osos aparecen en el r\xEDo pasado un rato. Cuando una criatura prepara el golpe sale un c\xEDrculo rojo: ap\xE1rtate o esqu\xEDvalo.</p><h3>Trucos</h3><p>En los matorrales no te ven. Las bolas de arroz curan. Los pergaminos siempre se ven en el minimapa. Para entregar, qu\xE9date dentro del c\xEDrculo dorado con los dos pergaminos.</p>"+((navigator.maxTouchPoints||0)>0?"":"<p><b>Con teclado.</b> WASD o flechas para moverte, J espada, K estrellas, L esquiva, I t\xE9cnica especial.</p>")+"</div>"}i(e){return'<span class="ic">'+e+"</span>"}render(){let e=this.set,t=this.data,n=this.name,s="";if(n==="title")s='<div class="screen title"><div class="logo"><div class="k">BATALLA DEL BOSQUE</div><h1>SENDA<span>NINJA</span></h1><p>Equipos de 3 \xB7 Roba el pergamino que te falta</p></div><div class="stack"><button class="btn pri" data-a="go" data-v="solo">Jugar solo</button><button class="btn gold" data-a="go" data-v="mp">Multijugador</button><div class="row"><button class="btn sm" data-a="go" data-v="help">C\xF3mo jugar</button><button class="btn sm" data-a="go" data-v="opts">Opciones</button></div>'+(t.iosTip?'<div class="tip">En iPhone: toca <b>Compartir</b> y luego <b>A\xF1adir a pantalla de inicio</b> para jugar a pantalla completa.</div>':"")+"</div></div>";else if(n==="solo")s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>Jugar solo</h2><div class="sub">T\xFA y dos bots contra otros equipos de bots.</div><div class="panel"><h3 style="margin-top:0">Modo</h3>'+this.modeBlock(e.mode,!0)+"<h3>Mapa</h3>"+this.mapBlock(e.map,!0)+"<h3>Tu estilo</h3>"+this.clsCards()+"<h3>Dificultad</h3>"+this.chips("diff",Cr.map(function(r){return r.name}),e.diff)+"<h3>Equipos en el bosque</h3>"+this.chips("teams",["2","3","4"],e.teams,[2,3,4])+'<button class="btn pri" data-a="solo" style="margin-top:16px">\xA1Al bosque!</button></div></div>';else if(n==="mp"){let r=t.env||"app";s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>Multijugador</h2><div class="panel"><h3 style="margin-top:0">Tu nombre</h3><input id="fName" class="field" maxlength="12" value="'+Gt(e.name)+'" autocomplete="off" spellcheck="false">'+(r==="lan"?'<button class="btn gold" data-a="joinhere" style="margin-top:14px">Entrar a la sala de este Wi-Fi</button>':"")+'<h3>Unirse con c\xF3digo (internet)</h3><div class="row"><input id="fCode" class="field code" maxlength="5" placeholder="C\xD3DIGO" autocomplete="off" autocapitalize="characters" spellcheck="false" style="flex:1.6"><button class="btn sm pri" data-a="join" style="margin-top:0;height:48px">Entrar</button></div>'+(r==="app"?'<button class="btn sm" data-a="go" data-v="lan">Buscar sala en mi Wi-Fi</button>':"")+'<h3>Crear una sala</h3><div class="row"><button class="btn sm gold" data-a="host" data-v="net">Por internet</button>'+(r==="app"?'<button class="btn sm gold" data-a="host" data-v="lan">Wi-Fi local</button>':"")+'</div><div id="msg" class="msg'+(t.err?" err":"")+'">'+Gt(t.msg||"")+'</div></div><div class="sub" style="max-width:380px;margin-top:10px">'+(r==="app"?"Por internet: uno crea la sala y comparte el c\xF3digo. Wi-Fi local: todos en la misma red o en el hotspot de un celular; no gasta datos.":r==="lan"?"Est\xE1s conectado al celular que cre\xF3 la sala en este Wi-Fi. Tambi\xE9n puedes usar salas por internet con c\xF3digo.":"Uno crea la sala y comparte el c\xF3digo: sirve entre iPhone, Android y PC. Las salas de Wi-Fi local se crean desde la app de Android.")+"</div></div>"}else if(n==="lan"){let r="",o=t.found||[];for(let a=0;a<o.length;a++)r+='<button class="it" data-a="joinip" data-v="'+Gt(o[a].ip)+'"><span>Sala de '+Gt(o[a].name)+'</span><span style="color:var(--mut);font-size:12px">'+Gt(o[a].ip)+"</span></button>";s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>Wi-Fi local</h2><div class="sub">Con\xE9ctate al mismo Wi-Fi (o al hotspot) del celular que cre\xF3 la sala.</div><div class="panel"><h3 style="margin-top:0">Direcci\xF3n que muestra el anfitri\xF3n</h3><div class="row"><input id="fIp" class="field" placeholder="192.168.1.20" inputmode="decimal" autocomplete="off" style="flex:1.6;font-size:16px"><button class="btn sm pri" data-a="joinip" style="margin-top:0;height:48px">Entrar</button></div><h3>Salas encontradas en tu red</h3><div class="list">'+(r||'<div class="sub">'+(t.scanning?"Buscando\u2026":"Ninguna todav\xEDa.")+"</div>")+'</div><button class="btn sm" data-a="scan"'+(t.scanning?" disabled":"")+">"+(t.scanning?"Buscando\u2026":"Buscar otra vez")+'</button><div id="msg" class="msg'+(t.err?" err":"")+'">'+Gt(t.msg||"")+"</div></div></div>"}else if(n==="lobby"){let r=t.lobby,o="";for(let l=0;l<r.teams;l++){o+='<div class="tm" style="border-top-color:'+gt[l].css+'"><h4><span style="color:'+gt[l].css+'">'+gt[l].name+"</span><small>"+(l%2?pn.luna:pn.sol).replace("<svg",'<svg width="15" height="15"')+"</small></h4>";for(let h=0;h<3;h++){let c=null;for(let u=0;u<r.players.length;u++)r.players[u].team===l&&r.players[u].slot===h&&(c=r.players[u]);c?o+='<div class="slot'+(c.id===t.myId?" me":"")+'"><i class="d" style="background:'+qt[c.cls].css+'"></i><span>'+Gt(c.name)+(c.host?" \u2605":"")+"</span></div>":o+='<button class="slot bot" data-a="slot" data-v="'+l+","+h+'"><i class="d" style="background:#4a556e"></i><span>Bot \xB7 unirme</span></button>'}o+="</div>"}s='<div class="screen dim"><button class="back" data-a="leave">\u2039</button><h2>Sala de espera</h2><div class="panel">'+(r.mode==="net"?'<div class="codebox"><small>C\xF3digo de la sala</small><b>'+Gt(r.code)+"</b></div>":'<div class="codebox"><small>Sala Wi-Fi \xB7 direcci\xF3n del anfitri\xF3n</small><b class="ip">'+Gt(r.code)+'</b></div><div class="sub" style="margin-top:8px">\xBFiPhone o PC en este Wi-Fi? Sin instalar nada: abrir en el navegador<br><b style="color:var(--ink)">http://'+Gt(String(r.code).split("\xB7")[0].trim())+":47800</b></div>")+"<h3>Equipos \xB7 "+r.players.length+" jugador"+(r.players.length===1?"":"es")+'</h3><div class="teams">'+o+"</div><h3>Tu estilo</h3>"+this.clsCards()+(t.isHost?"<h3>Modo</h3>"+this.modeBlock(r.gmode,!0)+"<h3>Mapa</h3>"+this.mapBlock(r.gmap,!0)+"<h3>Equipos</h3>"+this.chips("teams",["2","3","4"],r.teams,[2,3,4])+"<h3>Dificultad de los bots</h3>"+this.chips("diff",Cr.map(function(l){return l.name}),r.diff)+'<button class="btn pri" data-a="start" style="margin-top:16px">Empezar partida</button>':this.modeBlock(r.gmode,!1)+this.mapBlock(r.gmap,!1)+'<div class="msg">Esperando a que el anfitri\xF3n empiece\u2026</div>')+'<div id="msg" class="msg'+(t.err?" err":"")+'">'+Gt(t.msg||"")+"</div></div></div>"}else if(n==="results"){let r=t.end,o=t.roster,a=t.myTeam,l=r.winner===a,h="";for(let u=0;u<r.rank.length;u++){let f=r.rank[u],d="",p=0;for(let v=0;v<o.length;v++)o[v].team===f&&(d+=(d?", ":"")+Gt(o[v].name),p+=r.stats[v][0]);h+='<div class="r" style="border-left-color:'+gt[f].css+'"><b>'+(u+1)+"\xBA</b><span>"+gt[f].name+(f===a?" (tu equipo)":"")+'<br><small style="font-weight:600;color:var(--mut)">'+d+"</small></span><small>"+p+" derribos</small></div>"}let c=r.stats[t.me];s='<div class="screen dim"><div class="big" style="color:'+(l?"var(--gold)":"#ff8f7a")+'">'+(l?"\xA1VICTORIA!":"Derrota")+'</div><div class="sub">'+(r.how==="deliver"?"El equipo "+gt[r.winner].name+" entreg\xF3 los dos pergaminos":"El equipo "+gt[r.winner].name+" fue el \xFAltimo en pie")+" \xB7 "+Fm(r.time)+'</div><div class="panel"><div class="rank">'+h+"</div>"+(c?'<div class="note" style="min-height:0;margin-top:12px">T\xFA: <b>'+c[0]+"</b> derribos \xB7 <b>"+c[1]+"</b> de da\xF1o"+(t.mode===1?"":" \xB7 <b>"+c[2]+"</b> compa\xF1eros levantados")+"</div>":"")+(t.canAgain?'<button class="btn pri" data-a="again" style="margin-top:14px">'+(t.solo?"Jugar otra vez":"Volver a la sala")+"</button>":'<div class="msg">Esperando al anfitri\xF3n\u2026</div>')+'<button class="btn sm" data-a="leave">Salir al men\xFA</button></div></div>'}else n==="help"?s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>C\xF3mo jugar</h2><div class="panel">'+this.helpHtml()+"</div></div>":n==="opts"&&(s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>Opciones</h2><div class="panel"><h3 style="margin-top:0">Tu nombre</h3><input id="fName" class="field" maxlength="12" value="'+Gt(e.name)+'" autocomplete="off" spellcheck="false"><div style="height:8px"></div>'+this.toggles()+'</div><div class="sub" style="margin-top:14px">Senda Ninja \xB7 versi\xF3n '+Gt(t.ver||"1.0")+"</div></div>");this.overlay==="pause"?s+='<div class="screen dim" style="justify-content:center"><h2>Pausa</h2>'+(t.solo?"":'<div class="sub">La partida sigue para los dem\xE1s.</div>')+'<div class="panel">'+this.toggles()+'<button class="btn pri" data-a="resume" style="margin-top:14px">Continuar</button><button class="btn sm" data-a="ov" data-v="phelp">C\xF3mo jugar</button><button class="btn sm" data-a="leave">Salir de la partida</button></div></div>':this.overlay==="phelp"&&(s+='<div class="screen dim"><button class="back" data-a="ov" data-v="pause">\u2039</button><h2>C\xF3mo jugar</h2><div class="panel">'+this.helpHtml()+"</div></div>"),this.root.innerHTML=s}hudStart(e,t,n){this.g=e,this.roster=t,this.nTeams=n;let s=this.R=ii[e.mode===1?1:0],r=t[e.me];this.hud.classList.remove("hide"),Ve("bSpec").innerHTML=pn.cls[r.cls]+"<em>"+Gt(qt[r.cls].spec)+"</em>",Ve("bSpec").style.color=qt[r.cls].css,Ve("bDash").innerHTML=pn.dash+(s.dashMax>1?'<em id="dsN" class="n">'+s.dashMax+"</em>":"<em>Esquiva</em>"),Ve("bShur").innerHTML=pn.shuriken+'<em id="shN">3</em>',Ve("bMelee").innerHTML=pn.melee,this.lastSh=-1,this.lastDs=-1,this.lastAlive=null,this.lastPw="",Ve("pows").innerHTML="";let o="";for(let h=0;h<t.length;h++)t[h].team===r.team&&(o+='<div class="tp" id="tp'+h+'" style="border-left-color:'+qt[t[h].cls].css+'"><div class="n"><b>'+Gt(t[h].name)+(h===e.me?" (t\xFA)":"")+'</b><div class="hb"><i></i></div></div><span class="sc"></span></div>');Ve("team").innerHTML=o;let a="";for(let h=0;h<t.length;h++){let c=t[h].team===r.team;a+='<div class="lb '+(h===e.me?"me":c?"ally":"")+'" id="lb'+h+'"><div class="nm" style="color:'+gt[t[h].team].css+'">'+Gt(t[h].name)+'</div><div class="hb"><i></i></div><div class="st"></div></div>'}let l=e.view.mobs||[];for(let h=0;h<l.length;h++){let c=st[l[h].kind];a+='<div class="lb mob'+(c.tier?" big":"")+'" id="mb'+h+'" style="display:none"><div class="nm" style="color:'+c.css+'">'+c.name+'</div><div class="hb"><i></i></div></div>'}Ve("labels").innerHTML=a,this.lb=[];for(let h=0;h<t.length;h++){let c=Ve("lb"+h);this.lb.push({el:c,bar:c.querySelector(".hb i"),st:c.querySelector(".st"),hp:-1,txt:"",shown:!0})}this.mlb=[];for(let h=0;h<l.length;h++){let c=Ve("mb"+h);this.mlb.push({el:c,bar:c.querySelector(".hb i"),hp:-1,shown:!1})}Ve("dmg").innerHTML="",this.dmgPool=[];for(let h=0;h<18;h++){let c=document.createElement("div");c.className="dn",c.style.display="none",Ve("dmg").appendChild(c),this.dmgPool.push(c)}Ve("feed").innerHTML="",this.feed=[],Ve("banner").className="",this.bannerT=0,Ve("obj").innerHTML='<span class="s" id="oSol">'+pn.sol+'</span><span class="s" id="oLuna">'+pn.luna+'</span><span id="oTxt"></span>',this.hadBoth={},this.lastCount=-1,this.objective=null,this.hurtA=0,this.lastObj="",this.mapImg=this.makeMapImg(e.map),this.slow=0,this.mmT=0,["deliver","downed","stale","spect","count"].forEach(function(h){Ve(h).classList.add("hide")})}hudStop(){this.hud.classList.add("hide")}makeMapImg(e){let t=document.createElement("canvas");t.width=96,t.height=96;let n=t.getContext("2d"),s=n.createImageData(96,96),r={};r[ri]=[70,122,62],r[Yn]=[176,148,98],r[yn]=[46,98,50],r[Rn]=[34,78,44],r[wn]=[120,126,136],r[Jn]=[52,128,208],r[Ri]=[150,108,60],r[ji]=[160,166,176],r[an]=[20,44,28],r[vn]=[160,166,176],r[xi]=[72,150,214];for(let o=0;o<9216;o++){let a=r[e.tiles[o]];s.data[o*4]=a[0],s.data[o*4+1]=a[1],s.data[o*4+2]=a[2],s.data[o*4+3]=255}return n.putImageData(s,0,0),t}banner(e,t,n,s){let r=Ve("banner");r.innerHTML=Gt(e)+(t?"<small>"+Gt(t)+"</small>":""),r.style.color=n||"#fff",r.className="on",this.bannerT=s||2.6}addFeed(e){let t=Ve("feed"),n=document.createElement("div");for(n.innerHTML=e,t.appendChild(n),this.feed.push({e:n,t:4.5});this.feed.length>4;){let s=this.feed.shift();s.e.parentNode&&t.removeChild(s.e)}}nm(e){let t=this.roster[e];return'<span style="color:'+gt[t.team].css+'">'+Gt(t.name)+"</span>"}dmg(e,t,n,s,r){let o=this.dmgPool[this.dmgI++%this.dmgPool.length];o.style.display="none",o.offsetWidth,o.className="dn"+(s?" "+s:""),o.style.color=r||"",o.textContent=n,o.style.transform="translate3d("+Math.round(e-8)+"px,"+Math.round(t)+"px,0)",o.style.display="block"}hudEvent(e,t,n){let s=this.g,r=s.me,o=s.myTeam,a=this.roster,l=e[0],h=this.R.resurge;if(l==="hit"){let c=t.ninjas[e[1]];return c&&!c.hidden&&(n.project(c.x,1.7,c.z,this._p),this._p.vis&&this.dmg(this._p.x+(Math.random()-.5)*16,this._p.y,"-"+e[2],e[1]===r?"me":"")),e[1]===r?(this.hurtA=Math.min(1,this.hurtA+.5),"hurt"):e[3]===4?null:"hit"}if(l==="heal"||l==="food"){let c=t.ninjas[e[1]],u=l==="heal"?e[2]:e[3];return c&&!c.hidden&&u>0&&(n.project(c.x,1.7,c.z,this._p),this._p.vis&&this.dmg(this._p.x,this._p.y,"+"+u,"heal")),l==="food"?"food":null}if(l==="mhit"){let c=t.mobs[e[1]];return c&&(n.project(c.x,st[c.kind].h,c.z,this._p),this._p.vis&&this.dmg(this._p.x+(Math.random()-.5)*18,this._p.y,"-"+e[2],"mob")),e[3]===r?"hit":null}if(l==="matk"){let c=t.mobs[e[1]];return c&&st[c.kind].tier===2?"slam":"grunt"}if(l==="mspawn"){let c=t.mobs[e[1]];if(c&&st[c.kind].tier>0&&t.phase===1){let u=st[c.kind];return this.banner(u.spawn,"Premio: "+u.prize,u.css,2.6),"roar"}return null}if(l==="mob"){let c=t.mobs[e[1]],u=st[c?c.kind:0];return e[3]===o?u.tier>0?this.banner("\xA1Derrotaron al "+u.name+"!","Todo el equipo: "+u.prize,u.css,2.8):this.addFeed(this.nm(e[2])+' caz\xF3 un <span style="color:'+u.css+'">'+u.name+"</span>: "+u.prize):u.tier>0&&this.addFeed('<span style="color:'+gt[e[3]].css+'">Equipo '+gt[e[3]].name+'</span> derrot\xF3 al <span style="color:'+u.css+'">'+u.name+"</span>"),u.tier>0?"roar":null}if(l==="down"){let c=e[2];return this.addFeed((c>=0?this.nm(c)+" derrib\xF3 a ":c<=-2?'Un <span style="color:'+st[-2-c].css+'">'+st[-2-c].name+"</span> derrib\xF3 a ":"La niebla derrib\xF3 a ")+this.nm(e[1])),c===r&&this.banner("\xA1Derribaste a "+a[e[1]].name+"!","","#ffcf4a",1.6),"down"}if(l==="out")return h||this.addFeed(this.nm(e[1])+" qued\xF3 fuera"),null;if(l==="rev")return e[1]===r&&this.banner("\xA1De pie otra vez!",a[e[2]].name+" te levant\xF3","#7dff9a",1.8),"revive";if(l==="resp")return e[1]===r&&t.phase===1&&this.banner(h?"\xA1De vuelta!":"Reapareces en tu campamento","","#7dff9a",h?1.1:1.8),e[1]===r?"revive":null;if(l==="star")return e[1]===r?"star":null;if(l==="pw"){let c=t.ninjas[e[1]],u=_n[e[2]];return c&&u&&!c.hidden&&(n.project(c.x,2.3,c.z,this._p),this._p.vis&&this.dmg(this._p.x-14,this._p.y,"+"+u.name,"pw",u.css)),"power"}if(l==="shield"){let c=t.ninjas[e[1]];return c&&!c.hidden&&(n.project(c.x,2.3,c.z,this._p),this._p.vis&&this.dmg(this._p.x-22,this._p.y,"\xA1Coraza!","pw",_n[3].css)),"shield"}if(l==="wipe")return e[1]===o?this.banner("\xA1Cay\xF3 el equipo entero!","Vuelven desde su esquina en "+this.R.wipeT+" s","#ff8f7a",2.6):this.addFeed('<span style="color:'+gt[e[1]].css+'">Equipo '+gt[e[1]].name+"</span> cay\xF3 entero"),e[1]===o?"lose":null;if(l==="last")return this.banner("\xDALTIMA VIDA","Ya nadie reaparece \xB7 Todos vuelven con la vida llena","#ffcf4a",4),"gong";if(l==="pick"){let c=a[e[1]],u=ni[e[2]%2];return c.team===o?this.banner("\xA1Pergamino "+u.name+" conseguido!",c.name+" lo lleva",u.css,2.2):this.addFeed(this.nm(e[1])+" tom\xF3 el pergamino "+u.name),"pick"}if(l==="drop"){let c=a[e[1]],u=ni[e[2]%2];return c.team===o&&this.banner("\xA1Perdimos el pergamino "+u.name+"!","Qued\xF3 en el suelo: recup\xE9ralo","#ff8f7a",2.4),"drop"}if(l==="tout")return e[1]===o?this.banner("Tu equipo fue eliminado","Puesto "+e[2]+"\xBA","#ff8f7a",4):this.banner("Equipo "+gt[e[1]].name+" eliminado","",gt[e[1]].css,2.4),"down";if(l==="zone")return h?e[1]===1&&e[2]===this.R.lastLifeStage?null:e[1]===0&&e[2]===this.R.openStage?(this.banner("El santuario est\xE1 abierto","Lleva all\xED los dos pergaminos","#ffcf4a",3),"gong"):e[1]===1?(this.banner("La niebla se cierra","Corre hacia el centro","#c79bff",2.2),"alarm"):null:e[1]===1&&e[2]===0?(this.banner("MUERTE S\xDABITA","Ya nadie reaparece \xB7 El santuario est\xE1 abierto","#ffcf4a",4),"gong"):e[1]===1?(this.banner("La niebla se cierra","Corre hacia el centro","#c79bff",2.6),"alarm"):null;if(l==="go")return this.banner("\xA1A pelear!",h?"Dos cortes derriban \xB7 Si caes, vuelves junto a tu equipo":"Consigue el pergamino que te falta","#fff",h?3.2:2.6),"go";if(l==="fx"){if(e[1]==="boom"||e[1]==="boom2")return"boom";if(e[1]==="heal")return"heal";if(e[1]==="bram")return"bram";if(e[1]==="clink")return"clink"}return null}hudUpdate(e,t,n,s,r){let o=this.g,a=e.ninjas[o.me],l=o.myTeam,h=e.ninjas;for(let m=0;m<h.length;m++){let g=h[m],x=this.lb[m],_=g.st!==Yt&&!g.hidden&&!(this.R.resurge&&g.st===Ot);if(_&&(t.project(g.x,g.st===Ot?1.1:2.25,g.z,this._p),_=this._p.vis),_!==x.shown&&(x.shown=_,x.el.style.display=_?"block":"none"),!_)continue;x.el.style.transform="translate3d("+Math.round(this._p.x)+"px,"+Math.round(this._p.y-22)+"px,0)",g.hp!==x.hp&&(x.hp=g.hp,x.bar.style.width=Math.max(0,g.hp)+"%");let b="";g.st===Ot&&(b=g.revP>.02?"Levantando "+Math.round(g.revP*100)+"%":"Ca\xEDdo "+Math.ceil(g.downT)+"s"),b!==x.txt&&(x.txt=b,x.st.textContent=b)}let c=e.mobs||[];for(let m=0;m<this.mlb.length;m++){let g=c[m],x=this.mlb[m],_=g&&g.st!==0;if(_&&(t.project(g.x,st[g.kind].h,g.z,this._p),_=this._p.vis),_!==x.shown&&(x.shown=_,x.el.style.display=_?"block":"none"),!_)continue;x.el.style.transform="translate3d("+Math.round(this._p.x)+"px,"+Math.round(this._p.y-22)+"px,0)";let b=Math.round(100*g.hp/g.max);b!==x.hp&&(x.hp=b,x.bar.style.width=Math.max(0,b)+"%")}this.bannerT>0&&(this.bannerT-=n,this.bannerT<=0&&(Ve("banner").className=""));for(let m=this.feed.length-1;m>=0;m--){let g=this.feed[m];g.t-=n,g.t<=0&&(g.e.parentNode&&g.e.parentNode.removeChild(g.e),this.feed.splice(m,1))}this.hurtA>0&&(this.hurtA=Math.max(0,this.hurtA-n*1.8)),Ve("hurt").style.opacity=this.hurtA.toFixed(2);let u=e.cd,f=this.roster[o.me].cls,d=a.st===Te&&e.phase===1;Ve("bSpec").style.setProperty("--cd",Bu(u.spec/qt[f].cd)),Ve("bDash").style.setProperty("--cd",u.dash>=1?0:Bu(1-u.dash)),Ve("bShur").style.setProperty("--cd",u.charges>=1?0:Bu(1-u.charges));let p=Math.floor(u.charges+.001);if(p!==this.lastSh){this.lastSh=p;let m=Ve("shN");m&&(m.textContent=p)}if(this.R.dashMax>1){let m=Math.floor(u.dash+.001);if(m!==this.lastDs){this.lastDs=m;let g=Ve("dsN");g&&(g.textContent=m)}}d!==this.lastAlive&&(this.lastAlive=d,Ve("btns").style.opacity=d?1:.35);let v=Ve("count");if(e.phase===0){let m=Math.ceil(e.count);if(m!==this.lastCount){this.lastCount=m,v.classList.remove("hide");let g=ni[l%2],x=ni[1-l%2];v.innerHTML=(m>3?"\xB7\xB7\xB7":m)+'<small>Equipo <b style="color:'+gt[l].css+'">'+gt[l].name+'</b><br>Tienen el pergamino <b style="color:'+g.css+'">'+g.name+'</b> \xB7 les falta el <b style="color:'+x.css+'">'+x.name+"</b></small>",m<=3&&m>0&&this.h.sound("beep")}}else this.lastCount!==-2&&(this.lastCount=-2,v.classList.add("hide"));this.slow-=n,this.slow<=0&&(this.slow=.2,this.slowUpdate(e,s,r)),this.mmT-=n,this.mmT<=0&&(this.mmT=.1,this.drawMini(e,s))}slowUpdate(e,t,n){let s=this.g,r=e.ninjas[s.me],o=s.myTeam,a=e.ninjas,l=e.zone,h=this.R,c=h.resurge,u=e.sealed,f=r.st===Te&&r.pw?r.pw.join(""):"";if(f!==this.lastPw){this.lastPw=f;let T="";for(let N=0;N<f.length;N++){let U=_n[+f[N]];T+='<i style="background:'+U.css+'">'+U.name+"</i>"}Ve("pows").innerHTML=T}for(let T=0;T<a.length;T++){if(a[T].team!==o)continue;let N=Ve("tp"+T);if(!N)continue;let U=a[T];N.className="tp"+(U.st===Ot?" down":U.st===Yt?" out":""),N.querySelector(".hb i").style.width=(U.st===Te?U.hp:U.st===Ot?U.revP*100:0)+"%";let F="";for(let B=0;B<e.scrolls.length;B++)e.scrolls[B].carrier===T&&(F+=e.scrolls[B].kind===0?pn.sol:pn.luna);let J=N.querySelector(".sc");J.getAttribute("data-k")!==F.length+""&&(J.setAttribute("data-k",F.length+""),J.innerHTML=F,J.style.width=F?F.length>400?"30px":"15px":"0")}let d=Ve("phase"),p=c?e.lastLife?"\xDALTIMA VIDA":"FRENES\xCD":u?"CACER\xCDA":"MUERTE S\xDABITA",v=c?e.lastLife?"sd":"fr":u?"":"sd";d.textContent!==p&&(d.textContent=p,d.className=v),Ve("clock").textContent=l.stage>=5?"0:00":Fm(l.timer),Ve("clockSub").textContent=l.stage>=5?"niebla total":l.shrinking?"la niebla se est\xE1 cerrando":c?!e.lastLife&&l.stage===h.lastLifeStage?"para la \xFAltima vida":"para que se cierre la niebla":u?"para la muerte s\xFAbita":"para que se cierre la niebla";let m="",g=0,x={};for(let T=0;T<this.nTeams;T++){let N=!0;for(let F=0;F<a.length;F++)a[F].team===T&&a[F].st!==Yt&&(N=!1);N||g++,m+='<i style="background:'+gt[T].css+'" class="'+(N?"x":"")+'"></i>';let U=lh(e,T);x[T]=U.sol&&U.luna,x[T]&&!this.hadBoth[T]&&e.phase===1&&(T===o?this.banner("\xA1Tienen los dos pergaminos!",u?"Prot\xE9janlos hasta que abra el santuario":"\xA1Al santuario!","#ffcf4a",3):(this.banner("\xA1"+gt[T].name+" tiene los dos pergaminos!",u?c?"Qu\xEDtenselos antes de que abra el santuario":"Qu\xEDtenselos antes de la muerte s\xFAbita":"No los dejen llegar al santuario",gt[T].css,3),this.h.sound("alarm"))),this.hadBoth[T]=x[T]}Ve("alive").innerHTML=m;let _=lh(e,o);Ve("oSol").className="s"+(_.sol?" on":""),Ve("oLuna").className="s"+(_.luna?" on":"");let b,C=null;if(_.sol&&_.luna)b=u?"Protege los dos pergaminos":"\xA1Ll\xE9valos al santuario!",C={x:48,z:48,color:16766826};else{let T=_.sol?1:_.luna?0:-1;b=T<0?"Sin pergaminos: qu\xEDtale uno a un rival":"Consigue el pergamino "+ni[T].name;let N=1e9,U=e.ninjas[t]||r;for(let F=0;F<e.scrolls.length;F++){let J=e.scrolls[F];if(T>=0&&J.kind!==T||J.carrier>=0&&a[J.carrier].team===o)continue;let B=(J.x-U.x)*(J.x-U.x)+(J.z-U.z)*(J.z-U.z);B<N&&(N=B,C={x:J.x,z:J.z,color:ni[J.kind].color,sc:J})}}b!==this.lastObj&&(this.lastObj=b,Ve("oTxt").textContent=b),this.objective=C;let I=-1,M=0;for(let T=0;T<e.deliver.length;T++)e.deliver[T]>M&&(M=e.deliver[T],I=T);let w=Ve("deliver");M>.01&&!e.end?(w.classList.remove("hide"),w.querySelector("span").textContent=I===o?"\xA1Entregando! No salgas del c\xEDrculo":"\xA1"+gt[I].name+" est\xE1 entregando! Entra al c\xEDrculo para frenarlo",w.querySelector("i").style.width=Math.round(M*100)+"%",w.querySelector("i").style.background=gt[I].css):w.classList.add("hide");let A=Ve("downed"),y=Ve("spect");r.st===Ot?(A.classList.remove("hide"),A.innerHTML="\xA1Has ca\xEDdo!<small>"+(c?"Vuelves junto a tu equipo en "+Math.max(1,Math.ceil(r.downT))+" s":r.revP>.02?"Te est\xE1n levantando\u2026 "+Math.round(r.revP*100)+"%":u?"Reapareces en "+Math.ceil(r.downT)+" s (o antes si un compa\xF1ero te levanta)":"Un compa\xF1ero puede levantarte \xB7 "+Math.ceil(r.downT)+" s")+"</small>"):A.classList.add("hide"),r.st===Yt&&!e.end?(y.classList.remove("hide"),y.textContent=t!==s.me&&e.ninjas[t]?"Est\xE1s fuera \xB7 Viendo a "+e.ninjas[t].name:"Est\xE1s fuera"):y.classList.add("hide");let S=r.x-48,P=r.z-48;Ve("vig").style.opacity=r.st===Te&&S*S+P*P>l.r*l.r?1:0;let L=e.stale>2.5&&!e.end;Ve("stale").classList.toggle("hide",!L),Ve("ping").textContent=n!=null?n+" ms":""}drawMini(e,t){let n=Ve("mini"),s=n.getContext("2d"),r=n.width,o=this.g,a=o.myTeam,l=e.ninjas,h=e.zone,c=o.map.mmHalf||this.R.mmHalf,u=r/(c*2),f=48-c,d=48-c;s.imageSmoothingEnabled=!1,s.drawImage(this.mapImg,f,d,c*2,c*2,0,0,r,r),s.save(),s.translate(-f*u,-d*u),s.fillStyle="rgba(120,50,200,0.5)",s.beginPath(),s.rect(f*u,d*u,r,r),s.arc(48*u,48*u,Math.max(.5,h.r*u),0,6.2832,!0),s.fill("evenodd"),h.to<h.r-.5&&(s.strokeStyle="rgba(255,255,255,0.8)",s.lineWidth=1.5,s.beginPath(),s.arc(48*u,48*u,Math.max(.5,h.to*u),0,6.2832),s.stroke()),s.strokeStyle="#ffd76a",s.lineWidth=2.5,s.beginPath(),s.arc(48*u,48*u,5,0,6.2832),s.stroke(),s.fillStyle="#7dff9a";for(let x=0;x<o.map.pickups.length;x++)if(e.food>>x&1){let _=o.map.pickups[x];s.fillRect(_.x*u-2,_.z*u-2,4,4)}let p=e.mobs||[];for(let x=0;x<p.length;x++){let _=p[x];if(_.st===0)continue;let b=st[_.kind].tier>0;s.fillStyle=st[_.kind].css,s.strokeStyle="#000",s.lineWidth=1.2,s.beginPath(),s.arc(_.x*u,_.z*u,b?5:2.8,0,6.2832),s.fill(),s.stroke(),b&&(s.fillStyle="#000",s.fillRect(_.x*u-1,_.z*u-3,2,3.5))}let v=o.map.items||[];for(let x=0;x<v.length;x++){let _=(e.items[x]||0)-1;_<0||(s.fillStyle=_n[_].css,s.strokeStyle="rgba(0,0,0,.7)",s.lineWidth=1,s.beginPath(),s.arc(v[x].x*u,v[x].z*u,3.4,0,6.2832),s.fill(),s.stroke())}for(let x=0;x<l.length;x++){let _=l[x];if(!(_.st===Yt||x===o.me)){if(_.team!==a){if(_.hidden)continue;let b=!1;for(let C=0;C<l.length;C++){let I=l[C];if(!(I.team!==a||I.st===Yt)&&(I.x-_.x)*(I.x-_.x)+(I.z-_.z)*(I.z-_.z)<(Z.VIEW+3)*(Z.VIEW+3)){b=!0;break}}if(!b)continue}s.fillStyle=gt[_.team].css,s.globalAlpha=_.st===Ot?.5:1,s.beginPath(),s.arc(_.x*u,_.z*u,_.team===a?5:4.2,0,6.2832),s.fill(),_.team===a&&(s.strokeStyle="#fff",s.lineWidth=1.5,s.stroke()),s.globalAlpha=1}}let m=Date.now()%800<520;for(let x=0;x<e.scrolls.length;x++){let _=e.scrolls[x],b=_.x*u,C=_.z*u-(_.carrier>=0?9:0);s.fillStyle=ni[_.kind].css,s.strokeStyle="#000",s.lineWidth=1.5,s.beginPath(),s.moveTo(b,C-6),s.lineTo(b+5,C),s.lineTo(b,C+6),s.lineTo(b-5,C),s.closePath(),(_.carrier>=0||m)&&(s.fill(),s.stroke())}let g=l[t]||l[o.me];g&&g.st!==Yt&&(s.save(),s.translate(g.x*u,g.z*u),s.rotate(-g.f),s.fillStyle="#fff",s.strokeStyle="#000",s.lineWidth=1.5,s.beginPath(),s.moveTo(0,8),s.lineTo(5.5,-5),s.lineTo(0,-2),s.lineTo(-5.5,-5),s.closePath(),s.fill(),s.stroke(),s.restore()),s.restore()}};function Bu(i){return i<0?0:i>1?1:i}var Hu=class{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){let e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){let e=[];for(let t of this._parts)e.push(t);return Lb(e).buffer}};function Lb(i){let e=0;for(let s of i)e+=s.byteLength;let t=new Uint8Array(e),n=0;for(let s of i){let r=new Uint8Array(s.buffer,s.byteOffset,s.byteLength);t.set(r,n),n+=s.byteLength}return t}function Wu(i){return new Gu(i).unpack()}function Xu(i){let e=new Vu,t=e.pack(i);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}var Gu=class{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){let e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){let e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){let e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){let e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){let e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){let e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){let e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){let e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){let e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);let t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){let t=this.read(e),n=0,s="",r,o;for(;n<e;)r=t[n],r<160?(o=r,n++):(r^192)<32?(o=(r&31)<<6|t[n+1]&63,n+=2):(r^224)<16?(o=(r&15)<<12|(t[n+1]&63)<<6|t[n+2]&63,n+=3):(o=(r&7)<<18|(t[n+1]&63)<<12|(t[n+2]&63)<<6|t[n+3]&63,n+=4),s+=String.fromCodePoint(o);return this.index+=e,s}unpack_array(e){let t=new Array(e);for(let n=0;n<e;n++)t[n]=this.unpack();return t}unpack_map(e){let t={};for(let n=0;n<e;n++){let s=this.unpack();t[s]=this.unpack()}return t}unpack_float(){let e=this.unpack_uint32(),t=e>>31,n=(e>>23&255)-127,s=e&8388607|8388608;return(t===0?1:-1)*s*2**(n-23)}unpack_double(){let e=this.unpack_uint32(),t=this.unpack_uint32(),n=e>>31,s=(e>>20&2047)-1023,o=(e&1048575|1048576)*2**(s-20)+t*2**(s-52);return(n===0?1:-1)*o}read(e){let t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}},Vu=class{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{let t=e.constructor;if(e instanceof Array){let n=this.pack_array(e);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){let n=e;this.pack_bin(new Uint8Array(n.buffer,n.byteOffset,n.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(n=>{this.pack_bin(new Uint8Array(n)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){let n=this.pack_object(e);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){let t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){let t=this._textEncoder.encode(e),n=t.length;if(n<=15)this.pack_uint8(176+n);else if(n<=65535)this._bufferBuilder.append(216),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(n);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){let t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");let n=s=>{if(s<t){let r=this.pack(e[s]);return r instanceof Promise?r.then(()=>n(s+1)):n(s+1)}};return n(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);let n=Math.floor(Math.log(e)/Math.LN2),s=e/2**n-1,r=Math.floor(s*2**52),o=2**32,a=t<<31|n+1023<<20|r/o&1048575,l=r%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(l)}pack_object(e){let t=Object.keys(e),n=t.length;if(n<=15)this.pack_uint8(128+n);else if(n<=65535)this._bufferBuilder.append(222),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(n);else throw new Error("Invalid length");let s=r=>{if(r<t.length){let o=t[r];if(e.hasOwnProperty(o)){this.pack(o);let a=this.pack(e[o]);if(a instanceof Promise)return a.then(()=>s(r+1))}return s(r+1)}};return s(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){let t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){let t=e/4294967296,n=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){let t=Math.floor(e/4294967296),n=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}constructor(){this._bufferBuilder=new Hu,this._textEncoder=new TextEncoder}};var zm=!0,Bm=!0;function Sr(i,e,t){let n=i.match(e);return n&&n.length>=t&&parseFloat(n[t],10)}function Ai(i,e,t){if(!i.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Oo("Unable to polyfill events");return}let s=i.RTCPeerConnection.prototype,r=s.addEventListener;s.addEventListener=function(a,l){if(a!==e)return r.apply(this,arguments);let h=c=>{let u=t(c);u&&(l.handleEvent?l.handleEvent(u):l(u))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(l,h),r.apply(this,[a,h])};let o=s.removeEventListener;s.removeEventListener=function(a,l){if(a!==e||!this._eventMap||!this._eventMap[e])return o.apply(this,arguments);if(!this._eventMap[e].has(l))return o.apply(this,arguments);let h=this._eventMap[e].get(l);return this._eventMap[e].delete(l),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,h])},Object.defineProperty(s,"on"+e,{get(){return this["_on"+e]},set(a){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),a&&this.addEventListener(e,this["_on"+e]=a)},enumerable:!0,configurable:!0})}function Hm(i){return typeof i!="boolean"?new Error("Argument type: "+typeof i+". Please use a boolean."):(zm=i,i?"adapter.js logging disabled":"adapter.js logging enabled")}function Gm(i){return typeof i!="boolean"?new Error("Argument type: "+typeof i+". Please use a boolean."):(Bm=!i,"adapter.js deprecation warnings "+(i?"disabled":"enabled"))}function Oo(){if(typeof window=="object"){if(zm)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function Tr(i,e){Bm&&console.warn(i+" is deprecated, please use "+e+" instead.")}function Vm(i){let e={browser:null,version:null};if(typeof i>"u"||!i.navigator||!i.navigator.userAgent)return e.browser="Not a browser.",e;let{navigator:t}=i;if(t.userAgentData&&t.userAgentData.brands){let n=t.userAgentData.brands.find(s=>s.brand==="Chromium");if(n){let s=parseInt(n.version,10);if(s>=90)return{browser:"chrome",version:s}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(Sr(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||i.isSecureContext===!1&&i.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(Sr(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(i.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(Sr(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=i.RTCRtpTransceiver&&"currentDirection"in i.RTCRtpTransceiver.prototype,e._safariVersion=Sr(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function km(i){return Object.prototype.toString.call(i)==="[object Object]"}function Yu(i){return km(i)?Object.keys(i).reduce(function(e,t){let n=km(i[t]),s=n?Yu(i[t]):i[t],r=n&&!Object.keys(s).length;return s===void 0||r?e:Object.assign(e,{[t]:s})},{}):i}function qu(i,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(n=>{n.endsWith("Id")?qu(i,i.get(e[n]),t):n.endsWith("Ids")&&e[n].forEach(s=>{qu(i,i.get(s),t)})}))}function ju(i,e,t){let n=t?"outbound-rtp":"inbound-rtp",s=new Map;if(e===null)return s;let r=[];return i.forEach(o=>{o.type==="track"&&o.trackIdentifier===e.id&&r.push(o)}),r.forEach(o=>{i.forEach(a=>{a.type===n&&a.trackId===o.id&&qu(i,a,s)})}),s}var wl={};Qo(wl,{fixNegotiationNeeded:()=>ef,shimAddTrackRemoveTrack:()=>Qu,shimAddTrackRemoveTrackWithNative:()=>Xm,shimGetSendersWithDtmf:()=>$u,shimGetUserMedia:()=>El,shimMediaStream:()=>Ju,shimOnTrack:()=>Zu,shimPeerConnection:()=>Al,shimSenderReceiverGetStats:()=>Ku});var Wm=Oo;function El(i,e){if(e.version>=64)return;let t=i&&i.navigator;if(!t.mediaDevices)return;let n=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;let l={};return Object.keys(a).forEach(h=>{if(h==="require"||h==="advanced"||h==="mediaSource")return;let c=typeof a[h]=="object"?a[h]:{ideal:a[h]};c.exact!==void 0&&typeof c.exact=="number"&&(c.min=c.max=c.exact);let u=function(f,d){return f?f+d.charAt(0).toUpperCase()+d.slice(1):d==="deviceId"?"sourceId":d};if(c.ideal!==void 0){l.optional=l.optional||[];let f={};typeof c.ideal=="number"?(f[u("min",h)]=c.ideal,l.optional.push(f),f={},f[u("max",h)]=c.ideal,l.optional.push(f)):(f[u("",h)]=c.ideal,l.optional.push(f))}c.exact!==void 0&&typeof c.exact!="number"?(l.mandatory=l.mandatory||{},l.mandatory[u("",h)]=c.exact):["min","max"].forEach(f=>{c[f]!==void 0&&(l.mandatory=l.mandatory||{},l.mandatory[u(f,h)]=c[f])})}),a.advanced&&(l.optional=(l.optional||[]).concat(a.advanced)),l},s=function(a,l){if(e.version>=61)return l(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){let h=function(c,u,f){u in c&&!(f in c)&&(c[f]=c[u],delete c[u])};a=JSON.parse(JSON.stringify(a)),h(a.audio,"autoGainControl","googAutoGainControl"),h(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=n(a.audio)}if(a&&typeof a.video=="object"){let h=a.video.facingMode;h=h&&(typeof h=="object"?h:{ideal:h});let c=e.version<66;if(h&&(h.exact==="user"||h.exact==="environment"||h.ideal==="user"||h.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!c)){delete a.video.facingMode;let u;if(h.exact==="environment"||h.ideal==="environment"?u=["back","rear"]:(h.exact==="user"||h.ideal==="user")&&(u=["front"]),u)return t.mediaDevices.enumerateDevices().then(f=>{f=f.filter(p=>p.kind==="videoinput");let d=f.find(p=>u.some(v=>p.label.toLowerCase().includes(v)));return!d&&f.length&&u.includes("back")&&(d=f[f.length-1]),d&&(a.video.deviceId=h.exact?{exact:d.deviceId}:{ideal:d.deviceId}),a.video=n(a.video),Wm("chrome: "+JSON.stringify(a)),l(a)})}a.video=n(a.video)}return Wm("chrome: "+JSON.stringify(a)),l(a)},r=function(a){return e.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,l,h){s(a,c=>{t.webkitGetUserMedia(c,l,u=>{h&&h(r(u))})})};if(t.getUserMedia=o.bind(t),t.mediaDevices.getUserMedia){let a=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(l){return s(l,h=>a(h).then(c=>{if(h.audio&&!c.getAudioTracks().length||h.video&&!c.getVideoTracks().length)throw c.getTracks().forEach(u=>{u.stop()}),new DOMException("","NotFoundError");return c},c=>Promise.reject(r(c))))}}}function Ju(i){i.MediaStream=i.MediaStream||i.webkitMediaStream}function Zu(i,e){if(!(e.version>102))if(typeof i=="object"&&i.RTCPeerConnection&&!("ontrack"in i.RTCPeerConnection.prototype)){Object.defineProperty(i.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(n){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=n)},enumerable:!0,configurable:!0});let t=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=s=>{s.stream.addEventListener("addtrack",r=>{let o;i.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(l=>l.track&&l.track.id===r.track.id):o={track:r.track};let a=new Event("track");a.track=r.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)}),s.stream.getTracks().forEach(r=>{let o;i.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(l=>l.track&&l.track.id===r.id):o={track:r};let a=new Event("track");a.track=r,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else Ai(i,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function $u(i){if(typeof i=="object"&&i.RTCPeerConnection&&!("getSenders"in i.RTCPeerConnection.prototype)&&"createDTMFSender"in i.RTCPeerConnection.prototype){let e=function(s,r){return{track:r,get dtmf(){return this._dtmf===void 0&&(r.kind==="audio"?this._dtmf=s.createDTMFSender(r):this._dtmf=null),this._dtmf},_pc:s}};if(!i.RTCPeerConnection.prototype.getSenders){i.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};let s=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addTrack=function(a,l){let h=s.apply(this,arguments);return h||(h=e(this,a),this._senders.push(h)),h};let r=i.RTCPeerConnection.prototype.removeTrack;i.RTCPeerConnection.prototype.removeTrack=function(a){r.apply(this,arguments);let l=this._senders.indexOf(a);l!==-1&&this._senders.splice(l,1)}}let t=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(r){this._senders=this._senders||[],t.apply(this,[r]),r.getTracks().forEach(o=>{this._senders.push(e(this,o))})};let n=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(r){this._senders=this._senders||[],n.apply(this,[r]),r.getTracks().forEach(o=>{let a=this._senders.find(l=>l.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof i=="object"&&i.RTCPeerConnection&&"getSenders"in i.RTCPeerConnection.prototype&&"createDTMFSender"in i.RTCPeerConnection.prototype&&i.RTCRtpSender&&!("dtmf"in i.RTCRtpSender.prototype)){let e=i.RTCPeerConnection.prototype.getSenders;i.RTCPeerConnection.prototype.getSenders=function(){let n=e.apply(this,[]);return n.forEach(s=>s._pc=this),n},Object.defineProperty(i.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function Ku(i,e){if(e.version>=67||!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender&&i.RTCRtpReceiver))return;if(!("getStats"in i.RTCRtpSender.prototype)){let n=i.RTCPeerConnection.prototype.getSenders;n&&(i.RTCPeerConnection.prototype.getSenders=function(){let o=n.apply(this,[]);return o.forEach(a=>a._pc=this),o});let s=i.RTCPeerConnection.prototype.addTrack;s&&(i.RTCPeerConnection.prototype.addTrack=function(){let o=s.apply(this,arguments);return o._pc=this,o}),i.RTCRtpSender.prototype.getStats=function(){let o=this;return this._pc.getStats().then(a=>ju(a,o.track,!0))}}if(!("getStats"in i.RTCRtpReceiver.prototype)){let n=i.RTCPeerConnection.prototype.getReceivers;n&&(i.RTCPeerConnection.prototype.getReceivers=function(){let r=n.apply(this,[]);return r.forEach(o=>o._pc=this),r}),Ai(i,"track",s=>(s.receiver._pc=s.srcElement,s)),i.RTCRtpReceiver.prototype.getStats=function(){let r=this;return this._pc.getStats().then(o=>ju(o,r.track,!1))}}if(!("getStats"in i.RTCRtpSender.prototype&&"getStats"in i.RTCRtpReceiver.prototype))return;let t=i.RTCPeerConnection.prototype.getStats;i.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof i.MediaStreamTrack){let s=arguments[0],r,o,a;return this.getSenders().forEach(l=>{l.track===s&&(r?a=!0:r=l)}),this.getReceivers().forEach(l=>(l.track===s&&(o?a=!0:o=l),l.track===s)),a||r&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):r?r.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function Xm(i){i.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};let e=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};let l=e.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(l)===-1&&this._shimmedLocalStreams[a.id].push(l):this._shimmedLocalStreams[a.id]=[a,l],l};let t=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(h=>{if(this.getSenders().find(u=>u.track===h))throw new DOMException("Track already exists.","InvalidAccessError")});let a=this.getSenders();t.apply(this,arguments);let l=this.getSenders().filter(h=>a.indexOf(h)===-1);this._shimmedLocalStreams[o.id]=[o].concat(l)};let n=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],n.apply(this,arguments)};let s=i.RTCPeerConnection.prototype.removeTrack;i.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{let l=this._shimmedLocalStreams[a].indexOf(o);l!==-1&&this._shimmedLocalStreams[a].splice(l,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),s.apply(this,arguments)}}function Qu(i,e){if(!i.RTCPeerConnection)return;if(i.RTCPeerConnection.prototype.addTrack&&e.version>=65)return Xm(i);let t=i.RTCPeerConnection.prototype.getLocalStreams;i.RTCPeerConnection.prototype.getLocalStreams=function(){let c=t.apply(this);return this._reverseStreams=this._reverseStreams||{},c.map(u=>this._reverseStreams[u.id])};let n=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(c){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},c.getTracks().forEach(u=>{if(this.getSenders().find(d=>d.track===u))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[c.id]){let u=new i.MediaStream(c.getTracks());this._streams[c.id]=u,this._reverseStreams[u.id]=c,c=u}n.apply(this,[c])};let s=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(c){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},s.apply(this,[this._streams[c.id]||c]),delete this._reverseStreams[this._streams[c.id]?this._streams[c.id].id:c.id],delete this._streams[c.id]},i.RTCPeerConnection.prototype.addTrack=function(c,u){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");let f=[].slice.call(arguments,1);if(f.length!==1||!f[0].getTracks().find(v=>v===c))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(v=>v.track===c))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};let p=this._streams[u.id];if(p)p.addTrack(c),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{let v=new i.MediaStream([c]);this._streams[u.id]=v,this._reverseStreams[v.id]=u,this.addStream(v)}return this.getSenders().find(v=>v.track===c)};function r(h,c){let u=c.sdp;return Object.keys(h._reverseStreams||[]).forEach(f=>{let d=h._reverseStreams[f],p=h._streams[d.id];u=u.replace(new RegExp(p.id,"g"),d.id)}),new RTCSessionDescription({type:c.type,sdp:u})}function o(h,c){let u=c.sdp;return Object.keys(h._reverseStreams||[]).forEach(f=>{let d=h._reverseStreams[f],p=h._streams[d.id];u=u.replace(new RegExp(d.id,"g"),p.id)}),new RTCSessionDescription({type:c.type,sdp:u})}["createOffer","createAnswer"].forEach(function(h){let c=i.RTCPeerConnection.prototype[h],u={[h](){let f=arguments;return arguments.length&&typeof arguments[0]=="function"?c.apply(this,[p=>{let v=r(this,p);f[0].apply(null,[v])},p=>{f[1]&&f[1].apply(null,p)},arguments[2]]):c.apply(this,arguments).then(p=>r(this,p))}};i.RTCPeerConnection.prototype[h]=u[h]});let a=i.RTCPeerConnection.prototype.setLocalDescription;i.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};let l=Object.getOwnPropertyDescriptor(i.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(i.RTCPeerConnection.prototype,"localDescription",{get(){let h=l.get.apply(this);return h.type===""?h:r(this,h)}}),i.RTCPeerConnection.prototype.removeTrack=function(c){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!c._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(c._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let f;Object.keys(this._streams).forEach(d=>{this._streams[d].getTracks().find(v=>c.track===v)&&(f=this._streams[d])}),f&&(f.getTracks().length===1?this.removeStream(this._reverseStreams[f.id]):f.removeTrack(c.track),this.dispatchEvent(new Event("negotiationneeded")))}}function Al(i,e){!i.RTCPeerConnection&&i.webkitRTCPeerConnection&&(i.RTCPeerConnection=i.webkitRTCPeerConnection),i.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let n=i.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?i.RTCIceCandidate:i.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};i.RTCPeerConnection.prototype[t]=s[t]})}function ef(i,e){e.version>102||Ai(i,"negotiationneeded",t=>{let n=t.target;if(!((e.version<72||n.getConfiguration&&n.getConfiguration().sdpSemantics==="plan-b")&&n.signalingState!=="stable"))return t})}var Pl={};Qo(Pl,{shimAddTransceiver:()=>cf,shimCreateAnswer:()=>uf,shimCreateOffer:()=>hf,shimGetDisplayMedia:()=>qm,shimGetParameters:()=>lf,shimGetStats:()=>nf,shimGetUserMedia:()=>Rl,shimOnTrack:()=>tf,shimPeerConnection:()=>Cl,shimRTCDataChannel:()=>af,shimReceiverGetStats:()=>rf,shimRemoveStream:()=>of,shimSenderGetStats:()=>sf});function Rl(i,e){let t=i&&i.navigator;if(!t.mediaDevices)return;let n=i&&i.MediaStreamTrack;if(t.getUserMedia=function(s,r,o){Tr("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(s).then(r,o)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){let s=function(o,a,l){a in o&&!(l in o)&&(o[l]=o[a],delete o[a])},r=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),s(o.audio,"autoGainControl","mozAutoGainControl"),s(o.audio,"noiseSuppression","mozNoiseSuppression")),r(o)},n&&n.prototype.getSettings){let o=n.prototype.getSettings;n.prototype.getSettings=function(){let a=o.apply(this,arguments);return s(a,"mozAutoGainControl","autoGainControl"),s(a,"mozNoiseSuppression","noiseSuppression"),a}}if(n&&n.prototype.applyConstraints){let o=n.prototype.applyConstraints;n.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),s(a,"autoGainControl","mozAutoGainControl"),s(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function qm(i,e){i.navigator.mediaDevices&&(i.navigator.mediaDevices&&"getDisplayMedia"in i.navigator.mediaDevices||(i.navigator.mediaDevices.getDisplayMedia=function(n){if(!(n&&n.video)){let s=new DOMException("getDisplayMedia without video constraints is undefined");return s.name="NotFoundError",s.code=8,Promise.reject(s)}return n.video===!0?n.video={mediaSource:e}:n.video.mediaSource=e,i.navigator.mediaDevices.getUserMedia(n)}))}function tf(i){typeof i=="object"&&i.RTCTrackEvent&&"receiver"in i.RTCTrackEvent.prototype&&!("transceiver"in i.RTCTrackEvent.prototype)&&Object.defineProperty(i.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Cl(i,e){typeof i!="object"||!(i.RTCPeerConnection||i.mozRTCPeerConnection)||(!i.RTCPeerConnection&&i.mozRTCPeerConnection&&(i.RTCPeerConnection=i.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let n=i.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?i.RTCIceCandidate:i.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};i.RTCPeerConnection.prototype[t]=s[t]}))}function nf(i,e){if(typeof i!="object"||!(i.RTCPeerConnection||i.mozRTCPeerConnection)||e.version>=151)return;let t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},n=i.RTCPeerConnection.prototype.getStats;i.RTCPeerConnection.prototype.getStats=function(){let[r,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):n.apply(this,[r||null]).then(l=>{if(e.version<53&&!o)try{l.forEach(h=>{h.type=t[h.type]||h.type})}catch(h){if(h.name!=="TypeError")throw h;l.forEach((c,u)=>{l.set(u,Object.assign({},c,{type:t[c.type]||c.type}))})}return l}).then(o,a)}}function sf(i){if(!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender)||i.RTCRtpSender&&"getStats"in i.RTCRtpSender.prototype)return;let e=i.RTCPeerConnection.prototype.getSenders;e&&(i.RTCPeerConnection.prototype.getSenders=function(){let s=e.apply(this,[]);return s.forEach(r=>r._pc=this),s});let t=i.RTCPeerConnection.prototype.addTrack;t&&(i.RTCPeerConnection.prototype.addTrack=function(){let s=t.apply(this,arguments);return s._pc=this,s}),i.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function rf(i){if(!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender)||i.RTCRtpSender&&"getStats"in i.RTCRtpReceiver.prototype)return;let e=i.RTCPeerConnection.prototype.getReceivers;e&&(i.RTCPeerConnection.prototype.getReceivers=function(){let n=e.apply(this,[]);return n.forEach(s=>s._pc=this),n}),Ai(i,"track",t=>(t.receiver._pc=t.srcElement,t)),i.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function of(i){!i.RTCPeerConnection||"removeStream"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.removeStream=function(t){Tr("removeStream","removeTrack"),this.getSenders().forEach(n=>{n.track&&t.getTracks().includes(n.track)&&this.removeTrack(n)})})}function af(i){i.DataChannel&&!i.RTCDataChannel&&(i.RTCDataChannel=i.DataChannel)}function cf(i,e){if(!(typeof i=="object"&&i.RTCPeerConnection)||e.version>=110)return;let t=i.RTCPeerConnection.prototype.addTransceiver;t&&(i.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let s=arguments[1]&&arguments[1].sendEncodings;s===void 0&&(s=[]),s=[...s];let r=s.length>0;r&&s.forEach(a=>{if("rid"in a&&!/^[a-z0-9]{0,16}$/i.test(a.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in a&&!(parseFloat(a.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in a&&!(parseFloat(a.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});let o=t.apply(this,arguments);if(r){let{sender:a}=o,l=a.getParameters();(!("encodings"in l)||l.encodings.length===1&&Object.keys(l.encodings[0]).length===0)&&(l.encodings=s,a.sendEncodings=s,this.setParametersPromises.push(a.setParameters(l).then(()=>{delete a.sendEncodings}).catch(()=>{delete a.sendEncodings})))}return o})}function lf(i,e){if(!(typeof i=="object"&&i.RTCRtpSender)||e.version>=110)return;let t=i.RTCRtpSender.prototype.getParameters;t&&(i.RTCRtpSender.prototype.getParameters=function(){let s=t.apply(this,arguments);return"encodings"in s||(s.encodings=[].concat(this.sendEncodings||[{}])),s})}function hf(i,e){if(!(typeof i=="object"&&i.RTCPeerConnection)||e.version>=110)return;let t=i.RTCPeerConnection.prototype.createOffer;i.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function uf(i,e){if(!(typeof i=="object"&&i.RTCPeerConnection)||e.version>=110)return;let t=i.RTCPeerConnection.prototype.createAnswer;i.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}var Il={};Qo(Il,{shimAudioContext:()=>yf,shimCallbacksAPI:()=>pf,shimConstraints:()=>Ym,shimCreateOfferLegacy:()=>_f,shimGetUserMedia:()=>mf,shimLocalStreamsAPI:()=>ff,shimRTCIceServerUrls:()=>gf,shimRemoteStreamsAPI:()=>df,shimTrackEventTransceiver:()=>xf});function ff(i){if(!(typeof i!="object"||!i.RTCPeerConnection)){if("getLocalStreams"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in i.RTCPeerConnection.prototype)){let e=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addStream=function(n){this._localStreams||(this._localStreams=[]),this._localStreams.includes(n)||this._localStreams.push(n),n.getAudioTracks().forEach(s=>e.call(this,s,n)),n.getVideoTracks().forEach(s=>e.call(this,s,n))},i.RTCPeerConnection.prototype.addTrack=function(n,...s){return s&&s.forEach(r=>{this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]}),e.apply(this,arguments)}}"removeStream"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);let n=this._localStreams.indexOf(t);if(n===-1)return;this._localStreams.splice(n,1);let s=t.getTracks();this.getSenders().forEach(r=>{s.includes(r.track)&&this.removeTrack(r)})})}}function df(i){if(!(typeof i!="object"||!i.RTCPeerConnection)&&("getRemoteStreams"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in i.RTCPeerConnection.prototype))){Object.defineProperty(i.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=n=>{n.streams.forEach(s=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(s))return;this._remoteStreams.push(s);let r=new Event("addstream");r.stream=s,this.dispatchEvent(r)})})}});let e=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){let n=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(s){s.streams.forEach(r=>{if(n._remoteStreams||(n._remoteStreams=[]),n._remoteStreams.indexOf(r)>=0)return;n._remoteStreams.push(r);let o=new Event("addstream");o.stream=r,n.dispatchEvent(o)})}),e.apply(n,arguments)}}}function pf(i){if(typeof i!="object"||!i.RTCPeerConnection)return;let e=i.RTCPeerConnection.prototype,t=e.createOffer,n=e.createAnswer,s=e.setLocalDescription,r=e.setRemoteDescription,o=e.addIceCandidate;e.createOffer=function(h,c){let u=arguments.length>=2?arguments[2]:arguments[0],f=t.apply(this,[u]);return c?(f.then(h,c),Promise.resolve()):f},e.createAnswer=function(h,c){let u=arguments.length>=2?arguments[2]:arguments[0],f=n.apply(this,[u]);return c?(f.then(h,c),Promise.resolve()):f};let a=function(l,h,c){let u=s.apply(this,[l]);return c?(u.then(h,c),Promise.resolve()):u};e.setLocalDescription=a,a=function(l,h,c){let u=r.apply(this,[l]);return c?(u.then(h,c),Promise.resolve()):u},e.setRemoteDescription=a,a=function(l,h,c){let u=o.apply(this,[l]);return c?(u.then(h,c),Promise.resolve()):u},e.addIceCandidate=a}function mf(i){let e=i&&i.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){let t=e.mediaDevices,n=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=s=>n(Ym(s))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=(function(n,s,r){e.mediaDevices.getUserMedia(n).then(s,r)}).bind(e))}function Ym(i){return i&&i.video!==void 0?Object.assign({},i,{video:Yu(i.video)}):i}function gf(i){if(!i.RTCPeerConnection)return;let e=i.RTCPeerConnection;i.RTCPeerConnection=function(n,s){if(n&&n.iceServers){let r=[];for(let o=0;o<n.iceServers.length;o++){let a=n.iceServers[o];a.urls===void 0&&a.url?(Tr("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,r.push(a)):r.push(n.iceServers[o])}n.iceServers=r}return new e(n,s)},i.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(i.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function xf(i){typeof i=="object"&&i.RTCTrackEvent&&"receiver"in i.RTCTrackEvent.prototype&&!("transceiver"in i.RTCTrackEvent.prototype)&&Object.defineProperty(i.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function _f(i){let e=i.RTCPeerConnection.prototype.createOffer;i.RTCPeerConnection.prototype.createOffer=function(n){if(n){typeof n.offerToReceiveAudio<"u"&&(n.offerToReceiveAudio=!!n.offerToReceiveAudio);let s=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");n.offerToReceiveAudio===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):n.offerToReceiveAudio===!0&&!s&&this.addTransceiver("audio",{direction:"recvonly"}),typeof n.offerToReceiveVideo<"u"&&(n.offerToReceiveVideo=!!n.offerToReceiveVideo);let r=this.getTransceivers().find(o=>o.receiver.track.kind==="video");n.offerToReceiveVideo===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):n.offerToReceiveVideo===!0&&!r&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function yf(i){typeof i!="object"||i.AudioContext||(i.AudioContext=i.webkitAudioContext)}var Mf={};Qo(Mf,{removeExtmapAllowMixed:()=>Nl,shimAddIceCandidateNullOrEmpty:()=>Bo,shimConnectionState:()=>Dl,shimMaxMessageSize:()=>ko,shimParameterlessSetLocalDescription:()=>Ho,shimRTCIceCandidate:()=>Fo,shimRTCIceCandidateRelayProtocol:()=>Ll,shimSendThrowTypeError:()=>zo});var Er=ed(bf());function Fo(i){if(!i.RTCIceCandidate||i.RTCIceCandidate&&"foundation"in i.RTCIceCandidate.prototype)return;let e=i.RTCIceCandidate;i.RTCIceCandidate=function(n){if(typeof n=="object"&&n.candidate&&n.candidate.indexOf("a=")===0&&(n=JSON.parse(JSON.stringify(n)),n.candidate=n.candidate.substring(2)),n.candidate&&n.candidate.length){let s=new e(n),r=Er.default.parseCandidate(n.candidate);for(let o in r)o in s||Object.defineProperty(s,o,{value:r[o]});return s.toJSON=function(){return{candidate:s.candidate,sdpMid:s.sdpMid,sdpMLineIndex:s.sdpMLineIndex,usernameFragment:s.usernameFragment}},s}return new e(n)},i.RTCIceCandidate.prototype=e.prototype,Ai(i,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new i.RTCIceCandidate(t.candidate),writable:"false"}),t))}function Ll(i){!i.RTCIceCandidate||i.RTCIceCandidate&&"relayProtocol"in i.RTCIceCandidate.prototype||Ai(i,"icecandidate",e=>{if(e.candidate){let t=Er.default.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function ko(i,e){if(!i.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in i.RTCPeerConnection.prototype||Object.defineProperty(i.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});let t=function(a){if(!a||!a.sdp)return!1;let l=Er.default.splitSections(a.sdp);return l.shift(),l.some(h=>{let c=Er.default.parseMLine(h);return c&&c.kind==="application"&&c.protocol.indexOf("SCTP")!==-1})},n=function(a){let l=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(l===null||l.length<2)return-1;let h=parseInt(l[1],10);return h!==h?-1:h},s=function(a){let l=65536;return e.browser==="firefox"&&(e.version<57?a===-1?l=16384:l=2147483637:e.version<60?l=e.version===57?65535:65536:l=2147483637),l},r=function(a,l){let h=65536;e.browser==="firefox"&&e.version===57&&(h=65535);let c=Er.default.matchPrefix(a.sdp,"a=max-message-size:");return c.length>0?h=parseInt(c[0].substring(19),10):e.browser==="firefox"&&l!==-1&&(h=2147483637),h},o=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){let{sdpSemantics:l}=this.getConfiguration();l==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){let l=n(arguments[0]),h=s(l),c=r(arguments[0],l),u;h===0&&c===0?u=Number.POSITIVE_INFINITY:h===0||c===0?u=Math.max(h,c):u=Math.min(h,c);let f={};Object.defineProperty(f,"maxMessageSize",{get(){return u}}),this._sctp=f}return o.apply(this,arguments)}}function zo(i,e){if(!(i.RTCPeerConnection&&"createDataChannel"in i.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(s,r){let o=s.send;s.send=function(){let l=arguments[0],h=l.length||l.size||l.byteLength;if(s.readyState==="open"&&r.sctp&&h>r.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+r.sctp.maxMessageSize+" bytes)");return o.apply(s,arguments)}}let n=i.RTCPeerConnection.prototype.createDataChannel;i.RTCPeerConnection.prototype.createDataChannel=function(){let r=n.apply(this,arguments);return t(r,this),r},Ai(i,"datachannel",s=>(t(s.channel,s.target),s))}function Dl(i){if(!i.RTCPeerConnection||"connectionState"in i.RTCPeerConnection.prototype)return;let e=i.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{let n=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=s=>{let r=s.target;if(r._lastConnectionState!==r.connectionState){r._lastConnectionState=r.connectionState;let o=new Event("connectionstatechange",s);r.dispatchEvent(o)}return s},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),n.apply(this,arguments)}})}function Nl(i,e){if(!i.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;let t=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(s){if(s&&s.sdp&&s.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){let r=s.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);i.RTCSessionDescription&&s instanceof i.RTCSessionDescription?arguments[0]=new i.RTCSessionDescription({type:s.type,sdp:r}):s.sdp=r}return t.apply(this,arguments)}}function Bo(i,e){if(!(i.RTCPeerConnection&&i.RTCPeerConnection.prototype))return;let t=i.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(i.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function Ho(i,e){if(!(i.RTCPeerConnection&&i.RTCPeerConnection.prototype))return;let t=i.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(i.RTCPeerConnection.prototype.setLocalDescription=function(){let s=arguments[0]||{};if(typeof s!="object"||s.type&&s.sdp)return t.apply(this,arguments);if(s={type:s.type,sdp:s.sdp},!s.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":s.type="offer";break;default:s.type="answer";break}return s.sdp||s.type!=="offer"&&s.type!=="answer"?t.apply(this,[s]):(s.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>t.apply(this,[o]))})}var Db=ed(bf());function jm({window:i}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){let t=Oo,n=Vm(i),s={browserDetails:n,commonShim:Mf,extractVersion:Sr,disableLog:Hm,disableWarnings:Gm,sdp:Db};switch(n.browser){case"chrome":if(!wl||!Al||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),s;if(n.version===null)return t("Chrome shim can not determine version, not shimming."),s;t("adapter.js shimming chrome."),s.browserShim=wl,Bo(i,n),Ho(i,n),El(i,n),Ju(i,n),Al(i,n),Zu(i,n),Qu(i,n),$u(i,n),Ku(i,n),ef(i,n),Fo(i,n),Ll(i,n),Dl(i,n),ko(i,n),zo(i,n),Nl(i,n);break;case"firefox":if(!Pl||!Cl||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),s;t("adapter.js shimming firefox."),s.browserShim=Pl,Bo(i,n),Ho(i,n),Rl(i,n),Cl(i,n),nf(i,n),tf(i,n),of(i,n),sf(i,n),rf(i,n),af(i,n),cf(i,n),lf(i,n),hf(i,n),uf(i,n),Fo(i,n),Dl(i,n),ko(i,n),zo(i,n);break;case"safari":if(!Il||!e.shimSafari)return t("Safari shim is not included in this adapter release."),s;t("adapter.js shimming safari."),s.browserShim=Il,Bo(i,n),Ho(i,n),gf(i,n),_f(i,n),pf(i,n),ff(i,n),df(i,n),xf(i,n),mf(i,n),yf(i,n),Fo(i,n),Ll(i,n),ko(i,n),zo(i,n),Nl(i,n);break;default:t("Unsupported browser!");break}return s}var Nb=jm({window:typeof window>"u"?void 0:window}),Sf=Nb;function Ls(i,e,t,n){Object.defineProperty(i,e,{get:t,set:n,enumerable:!0,configurable:!0})}var Ol=class{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{let t=[],n=e.byteLength,s=Math.ceil(n/this.chunkedMTU),r=0,o=0;for(;o<n;){let a=Math.min(n,o+this.chunkedMTU),l=e.slice(o,a),h={__peerData:this._dataCount,n:r,data:l,total:s};t.push(h),o=a,r++}return this._dataCount++,t}}};function Ub(i){let e=0;for(let s of i)e+=s.byteLength;let t=new Uint8Array(e),n=0;for(let s of i)t.set(s,n),n+=s.byteLength;return t}var Tf=Sf.default||Sf,Go=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){let i=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(i)?i==="chrome"?e>=this.minChromeVersion:i==="firefox"?e>=this.minFirefoxVersion:i==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return Tf.browserDetails.browser}getVersion(){return Tf.browserDetails.version||0}isUnifiedPlanSupported(){let i=this.getBrowser(),e=Tf.browserDetails.version||0;if(i==="chrome"&&e<this.minChromeVersion)return!1;if(i==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,n=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),n=!0}catch{}finally{t&&t.close()}return n}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},Ob=i=>!i||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(i),Zm=()=>Math.random().toString(36).slice(2),Jm={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"},Ef=class extends Ol{noop(){}blobToArrayBuffer(e,t){let n=new FileReader;return n.onload=function(s){s.target&&t(s.target.result)},n.readAsArrayBuffer(e),n}binaryStringToArrayBuffer(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=Jm,this.browser=Go.getBrowser(),this.browserVersion=Go.getVersion(),this.pack=Xu,this.unpack=Wu,this.supports=(function(){let t={browser:Go.isBrowserSupported(),webRTC:Go.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let n;try{n=new RTCPeerConnection(Jm),t.audioVideo=!0;let s;try{s=n.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!s.ordered;try{s.binaryType="blob",t.binaryBlob=!Go.isIOS}catch{}}catch{}finally{s&&s.close()}}catch{}finally{n&&n.close()}return t})(),this.validateId=Ob,this.randomToken=Zm}},In=new Ef,Fb="PeerJS: ";var Af=class{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){let n=[Fb,...t];for(let s in n)n[s]instanceof Error&&(n[s]="("+n[s].name+") "+n[s].message);e>=3?console.log(...n):e>=2?console.warn("WARNING",...n):e>=1&&console.error("ERROR",...n)}constructor(){this._logLevel=0}},Pe=new Af,Df={},kb=Object.prototype.hasOwnProperty,An="~";function Wo(){}Object.create&&(Wo.prototype=Object.create(null),new Wo().__proto__||(An=!1));function zb(i,e,t){this.fn=i,this.context=e,this.once=t||!1}function $m(i,e,t,n,s){if(typeof t!="function")throw new TypeError("The listener must be a function");var r=new zb(t,n||i,s),o=An?An+e:e;return i._events[o]?i._events[o].fn?i._events[o]=[i._events[o],r]:i._events[o].push(r):(i._events[o]=r,i._eventsCount++),i}function Ul(i,e){--i._eventsCount===0?i._events=new Wo:delete i._events[e]}function gn(){this._events=new Wo,this._eventsCount=0}gn.prototype.eventNames=function(){var e=[],t,n;if(this._eventsCount===0)return e;for(n in t=this._events)kb.call(t,n)&&e.push(An?n.slice(1):n);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};gn.prototype.listeners=function(e){var t=An?An+e:e,n=this._events[t];if(!n)return[];if(n.fn)return[n.fn];for(var s=0,r=n.length,o=new Array(r);s<r;s++)o[s]=n[s].fn;return o};gn.prototype.listenerCount=function(e){var t=An?An+e:e,n=this._events[t];return n?n.fn?1:n.length:0};gn.prototype.emit=function(e,t,n,s,r,o){var a=An?An+e:e;if(!this._events[a])return!1;var l=this._events[a],h=arguments.length,c,u;if(l.fn){switch(l.once&&this.removeListener(e,l.fn,void 0,!0),h){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,t),!0;case 3:return l.fn.call(l.context,t,n),!0;case 4:return l.fn.call(l.context,t,n,s),!0;case 5:return l.fn.call(l.context,t,n,s,r),!0;case 6:return l.fn.call(l.context,t,n,s,r,o),!0}for(u=1,c=new Array(h-1);u<h;u++)c[u-1]=arguments[u];l.fn.apply(l.context,c)}else{var f=l.length,d;for(u=0;u<f;u++)switch(l[u].once&&this.removeListener(e,l[u].fn,void 0,!0),h){case 1:l[u].fn.call(l[u].context);break;case 2:l[u].fn.call(l[u].context,t);break;case 3:l[u].fn.call(l[u].context,t,n);break;case 4:l[u].fn.call(l[u].context,t,n,s);break;default:if(!c)for(d=1,c=new Array(h-1);d<h;d++)c[d-1]=arguments[d];l[u].fn.apply(l[u].context,c)}}return!0};gn.prototype.on=function(e,t,n){return $m(this,e,t,n,!1)};gn.prototype.once=function(e,t,n){return $m(this,e,t,n,!0)};gn.prototype.removeListener=function(e,t,n,s){var r=An?An+e:e;if(!this._events[r])return this;if(!t)return Ul(this,r),this;var o=this._events[r];if(o.fn)o.fn===t&&(!s||o.once)&&(!n||o.context===n)&&Ul(this,r);else{for(var a=0,l=[],h=o.length;a<h;a++)(o[a].fn!==t||s&&!o[a].once||n&&o[a].context!==n)&&l.push(o[a]);l.length?this._events[r]=l.length===1?l[0]:l:Ul(this,r)}return this};gn.prototype.removeAllListeners=function(e){var t;return e?(t=An?An+e:e,this._events[t]&&Ul(this,t)):(this._events=new Wo,this._eventsCount=0),this};gn.prototype.off=gn.prototype.removeListener;gn.prototype.addListener=gn.prototype.on;gn.prefixed=An;gn.EventEmitter=gn;Df=gn;var Ds={};Ls(Ds,"ConnectionType",()=>fs);Ls(Ds,"PeerErrorType",()=>Vt);Ls(Ds,"BaseConnectionErrorType",()=>wf);Ls(Ds,"DataConnectionErrorType",()=>Nf);Ls(Ds,"SerializationType",()=>Gl);Ls(Ds,"SocketEventType",()=>us);Ls(Ds,"ServerMessageType",()=>mn);var fs=(function(i){return i.Data="data",i.Media="media",i})({}),Vt=(function(i){return i.BrowserIncompatible="browser-incompatible",i.Disconnected="disconnected",i.InvalidID="invalid-id",i.InvalidKey="invalid-key",i.Network="network",i.PeerUnavailable="peer-unavailable",i.SslUnavailable="ssl-unavailable",i.ServerError="server-error",i.SocketError="socket-error",i.SocketClosed="socket-closed",i.UnavailableID="unavailable-id",i.WebRTC="webrtc",i})({}),wf=(function(i){return i.NegotiationFailed="negotiation-failed",i.ConnectionClosed="connection-closed",i})({}),Nf=(function(i){return i.NotOpenYet="not-open-yet",i.MessageToBig="message-too-big",i})({}),Gl=(function(i){return i.Binary="binary",i.BinaryUTF8="binary-utf8",i.JSON="json",i.None="raw",i})({}),us=(function(i){return i.Message="message",i.Disconnected="disconnected",i.Error="error",i.Close="close",i})({}),mn=(function(i){return i.Heartbeat="HEARTBEAT",i.Candidate="CANDIDATE",i.Offer="OFFER",i.Answer="ANSWER",i.Open="OPEN",i.Error="ERROR",i.IdTaken="ID-TAKEN",i.InvalidKey="INVALID-KEY",i.Leave="LEAVE",i.Expire="EXPIRE",i})({}),Km="1.5.5",Rf=class extends Df.EventEmitter{constructor(e,t,n,s,r,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];let a=e?"wss://":"ws://";this._baseUrl=a+t+":"+n+s+"peerjs?key="+r}start(e,t){this._id=e;let n=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(n+"&version="+Km),this._disconnected=!1,this._socket.onmessage=s=>{let r;try{r=JSON.parse(s.data),Pe.log("Server message received:",r)}catch{Pe.log("Invalid server message",s.data);return}this.emit(us.Message,r)},this._socket.onclose=s=>{this._disconnected||(Pe.log("Socket closed.",s),this._cleanup(),this._disconnected=!0,this.emit(us.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),Pe.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){Pe.log("Cannot send heartbeat, because socket closed");return}let e=JSON.stringify({type:mn.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){let e=[...this._messagesQueue];this._messagesQueue=[];for(let t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(us.Error,"Invalid message");return}if(!this._wsOpen())return;let t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}},Fl=class{constructor(e){this.connection=e}startConnection(e){let t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===fs.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){let n=this.connection,s={ordered:!!e.reliable},r=t.createDataChannel(n.label,s);n._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){Pe.log("Creating RTCPeerConnection.");let e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){let t=this.connection.peer,n=this.connection.connectionId,s=this.connection.type,r=this.connection.provider;Pe.log("Listening for ICE candidates."),e.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(Pe.log(`Received ICE candidates for ${t}:`,o.candidate),r.socket.send({type:mn.Candidate,payload:{candidate:o.candidate,type:s,connectionId:n},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":Pe.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(wf.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":Pe.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(wf.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":Pe.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},Pe.log("Listening for data channel"),e.ondatachannel=o=>{Pe.log("Received data channel");let a=o.channel;r.getConnection(t,n)._initializeDataChannel(a)},Pe.log("Listening for remote stream"),e.ontrack=o=>{Pe.log("Received remote stream");let a=o.streams[0],l=r.getConnection(t,n);if(l.type===fs.Media){let h=l;this._addStreamToMediaConnection(a,h)}}}cleanup(){Pe.log("Cleaning up PeerConnection to "+this.connection.peer);let e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};let t=e.signalingState!=="closed",n=!1,s=this.connection.dataChannel;s&&(n=!!s.readyState&&s.readyState!=="closed"),(t||n)&&e.close()}async _makeOffer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let n=await e.createOffer(this.connection.options.constraints);Pe.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await e.setLocalDescription(n),Pe.log("Set localDescription:",n,`for:${this.connection.peer}`);let s={sdp:n,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===fs.Data){let r=this.connection;s={...s,label:r.label,reliable:r.reliable,serialization:r.serialization}}t.socket.send({type:mn.Offer,payload:s,dst:this.connection.peer})}catch(s){s!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(Vt.WebRTC,s),Pe.log("Failed to setLocalDescription, ",s))}}catch(n){t.emitError(Vt.WebRTC,n),Pe.log("Failed to createOffer, ",n)}}async _makeAnswer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let n=await e.createAnswer();Pe.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await e.setLocalDescription(n),Pe.log("Set localDescription:",n,`for:${this.connection.peer}`),t.socket.send({type:mn.Answer,payload:{sdp:n,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(s){t.emitError(Vt.WebRTC,s),Pe.log("Failed to setLocalDescription, ",s)}}catch(n){t.emitError(Vt.WebRTC,n),Pe.log("Failed to create answer, ",n)}}async handleSDP(e,t){t=new RTCSessionDescription(t);let n=this.connection.peerConnection,s=this.connection.provider;Pe.log("Setting remote description",t);let r=this;try{await n.setRemoteDescription(t),Pe.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await r._makeAnswer()}catch(o){s.emitError(Vt.WebRTC,o),Pe.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(e){Pe.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),Pe.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(Vt.WebRTC,t),Pe.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(Pe.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return Pe.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(n=>{t.addTrack(n,e)})}_addStreamToMediaConnection(e,t){Pe.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}},kl=class extends Df.EventEmitter{emitError(e,t){Pe.error("Error:",t),this.emit("error",new Cf(`${e}`,t))}},Cf=class extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}},zl=class extends kl{get open(){return this._open}constructor(e,t,n){super(),this.peer=e,this.provider=t,this.options=n,this._open=!1,this.metadata=n.metadata}},Bl=class i extends zl{static#e=this.ID_PREFIX="mc_";get type(){return fs.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,n){super(e,t,n),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||i.ID_PREFIX+In.randomToken(),this._negotiator=new Fl(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Pe.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{Pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){Pe.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){let t=e.type,n=e.payload;switch(e.type){case mn.Answer:this._negotiator.handleSDP(t,n.sdp),this._open=!0;break;case mn.Candidate:this._negotiator.handleCandidate(n.candidate);break;default:Pe.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){Pe.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});let n=this.provider._getMessages(this.connectionId);for(let s of n)this.handleMessage(s);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}},Pf=class{constructor(e){this._options=e}_buildRequest(e){let t=this._options.secure?"https":"http",{host:n,port:s,path:r,key:o}=this._options,a=new URL(`${t}://${n}:${s}${r}${o}/${e}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",Km),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{let e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){Pe.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==In.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{let e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===In.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw Pe.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}},Hl=class i extends zl{static#e=this.ID_PREFIX="dc_";static#t=this.MAX_BUFFERED_AMOUNT=8388608;get type(){return fs.Data}constructor(e,t,n){super(e,t,n),this.connectionId=this.options.connectionId||i.ID_PREFIX+Zm(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Fl(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Pe.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{Pe.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{Pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(Nf.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){let t=e.payload;switch(e.type){case mn.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case mn.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:Pe.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}},Xo=class extends Hl{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>Hl.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return Pe.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;let e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}},Vo=class extends Xo{close(e){super.close(e),this._chunkedData={}}constructor(e,t,n){super(e,t,n),this.chunker=new Ol,this.serialization=Gl.Binary,this._chunkedData={}}_handleDataMessage({data:e}){let t=Wu(e),n=t.__peerData;if(n){if(n.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){let t=e.__peerData,n=this._chunkedData[t]||{data:[],count:0,total:e.total};if(n.data[e.n]=new Uint8Array(e.data),n.count++,this._chunkedData[t]=n,n.total===n.count){delete this._chunkedData[t];let s=Ub(n.data);this._handleDataMessage({data:s})}}_send(e,t){let n=Xu(e);if(n instanceof Promise)return this._send_blob(n);if(!t&&n.byteLength>this.chunker.chunkedMTU){this._sendChunks(n);return}this._bufferedSend(n)}async _send_blob(e){let t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){let t=this.chunker.chunk(e);Pe.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(let n of t)this.send(n,!0)}},If=class extends Xo{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=Gl.None}},Lf=class extends Xo{_handleDataMessage({data:e}){let t=this.parse(this.decoder.decode(e)),n=t.__peerData;if(n&&n.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){let n=this.encoder.encode(this.stringify(e));if(n.byteLength>=In.chunkedMTU){this.emitError(Nf.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(n)}constructor(...e){super(...e),this.serialization=Gl.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}};var qo=class i extends kl{static#e=this.DEFAULT_KEY="peerjs";get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){let e=Object.create(null);for(let[t,n]of this._connections)e[t]=n;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:If,json:Lf,binary:Vo,"binary-utf8":Vo,default:Vo},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let n;if(e&&e.constructor==Object?t=e:e&&(n=e.toString()),t={debug:0,host:In.CLOUD_HOST,port:In.CLOUD_PORT,path:"/",key:i.DEFAULT_KEY,token:In.randomToken(),config:In.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==In.CLOUD_HOST?this._options.secure=In.isSecure():this._options.host==In.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&Pe.setLogFunction(this._options.logFunction),Pe.logLevel=this._options.debug||0,this._api=new Pf(t),this._socket=this._createServerConnection(),!In.supports.audioVideo&&!In.supports.data){this._delayedAbort(Vt.BrowserIncompatible,"The current browser does not support WebRTC");return}if(n&&!In.validateId(n)){this._delayedAbort(Vt.InvalidID,`ID "${n}" is invalid`);return}n?this._initialize(n):this._api.retrieveId().then(s=>this._initialize(s)).catch(s=>this._abort(Vt.ServerError,s))}_createServerConnection(){let e=new Rf(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(us.Message,t=>{this._handleMessage(t)}),e.on(us.Error,t=>{this._abort(Vt.SocketError,t)}),e.on(us.Disconnected,()=>{this.disconnected||(this.emitError(Vt.Network,"Lost connection to server."),this.disconnect())}),e.on(us.Close,()=>{this.disconnected||this._abort(Vt.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){let t=e.type,n=e.payload,s=e.src;switch(t){case mn.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case mn.Error:this._abort(Vt.ServerError,n.msg);break;case mn.IdTaken:this._abort(Vt.UnavailableID,`ID "${this.id}" is taken`);break;case mn.InvalidKey:this._abort(Vt.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case mn.Leave:Pe.log(`Received leave message from ${s}`),this._cleanupPeer(s),this._connections.delete(s);break;case mn.Expire:this.emitError(Vt.PeerUnavailable,`Could not connect to peer ${s}`);break;case mn.Offer:{let r=n.connectionId,o=this.getConnection(s,r);if(o&&(o.close(),Pe.warn(`Offer received for existing Connection ID:${r}`)),n.type===fs.Media){let l=new Bl(s,this,{connectionId:r,_payload:n,metadata:n.metadata});o=l,this._addConnection(s,o),this.emit("call",l)}else if(n.type===fs.Data){let l=new this._serializers[n.serialization](s,this,{connectionId:r,_payload:n,metadata:n.metadata,label:n.label,serialization:n.serialization,reliable:n.reliable});o=l,this._addConnection(s,o),this.emit("connection",l)}else{Pe.warn(`Received malformed connection type:${n.type}`);return}let a=this._getMessages(r);for(let l of a)o.handleMessage(l);break}default:{if(!n){Pe.warn(`You received a malformed message from ${s} of type ${t}`);return}let r=n.connectionId,o=this.getConnection(s,r);o&&o.peerConnection?o.handleMessage(e):r?this._storeMessage(r,e):Pe.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){let t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){Pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Vt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}let n=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,n),n}call(e,t,n={}){if(this.disconnected){Pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Vt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){Pe.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}let s=new Bl(e,this,{...n,_stream:t});return this._addConnection(e,s),s}_addConnection(e,t){Pe.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){let t=this._connections.get(e.peer);if(t){let n=t.indexOf(e);n!==-1&&t.splice(n,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){let n=this._connections.get(e);if(!n)return null;for(let s of n)if(s.connectionId===t)return s;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){Pe.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(Pe.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(let e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){let t=this._connections.get(e);if(t)for(let n of t)n.close()}disconnect(){if(this.disconnected)return;let e=this.id;Pe.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)Pe.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)Pe.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(Vt.ServerError,t))}};var Uf="sendaninja-v"+7+"-",Qm="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",Of=47800;function Vl(){let i="";for(let e=0;e<5;e++)i+=Qm.charAt(Math.floor(Math.random()*Qm.length));return i}function e0(){let i={debug:0},e=typeof window<"u"&&window.__peerOpts;if(e)for(let t in e)i[t]=e[t];return i}function Yo(){return typeof window<"u"?window.SendaNative:null}function Ar(){return!!Yo()}function t0(){return Yo()?"app":typeof location<"u"&&location.protocol==="http:"&&location.port===String(Of)?"lan":"web"}var Wl=class{constructor(){this.conns={},this.peer=null,this.closed=!1,this.onJoin=null,this.onLeave=null,this.onMsg=null,this.onDown=null}open(){let e=this;return new Promise(function(t,n){let s=0,r=!1,o=setTimeout(function(){r||(r=!0,e.close(),n(new Error("timeout")))},2e4);function a(){let l=Vl(),h=new qo(Uf+l,e0());e.peer=h,h.on("open",function(){r||(r=!0,clearTimeout(o),t(l))}),h.on("connection",function(c){e.accept(c)}),h.on("disconnected",function(){e.closed||setTimeout(function(){if(!e.closed&&e.peer===h&&!h.destroyed)try{h.reconnect()}catch{}},1500)}),h.on("error",function(c){if(r){c&&c.type==="network"&&e.onDown&&e.onDown();return}if(c&&c.type==="unavailable-id"&&s++<4){try{h.destroy()}catch{}a();return}r=!0,clearTimeout(o);try{h.destroy()}catch{}n(c)})}a()})}accept(e){let t=this,n=e.peer;e.on("open",function(){t.conns[n]=e,t.onJoin&&t.onJoin(n)}),e.on("data",function(r){t.conns[n]&&t.onMsg&&t.onMsg(n,r)});let s=function(){t.conns[n]&&(delete t.conns[n],t.onLeave&&t.onLeave(n))};e.on("close",s),e.on("error",s)}send(e,t){let n=this.conns[e];if(n&&n.open)try{n.send(t)}catch{}}broadcast(e){for(let t in this.conns)this.send(t,e)}kick(e){let t=this.conns[e];if(t){delete this.conns[e];try{t.close()}catch{}}}close(){if(this.closed=!0,this.peer)try{this.peer.destroy()}catch{}this.conns={}}},Xl=class{constructor(){this.peer=null,this.conn=null,this.onMsg=null,this.onClose=null,this.closed=!1}connect(e){let t=this;return new Promise(function(n,s){let r=!1,o=function(h){r||(r=!0,clearTimeout(a),t.close(),s(h))},a=setTimeout(function(){o(new Error("timeout"))},22e3),l=new qo(Uf+"j-"+Vl()+Vl()+Vl(),e0());t.peer=l,l.on("open",function(){let h=l.connect(Uf+e,{reliable:!0,serialization:"raw"});t.conn=h,h.on("open",function(){r||(r=!0,clearTimeout(a),n())}),h.on("data",function(u){t.onMsg&&t.onMsg(u)});let c=function(){r?!t.closed&&t.onClose&&(t.closed=!0,t.onClose()):o(new Error("closed"))};h.on("close",c),h.on("error",c)}),l.on("error",function(h){r||o(h)})})}send(e){if(this.conn&&this.conn.open)try{this.conn.send(e)}catch{}}close(){if(this.closed=!0,this.peer)try{this.peer.destroy()}catch{}}},ql=class{constructor(){this.ws=null,this.onJoin=null,this.onLeave=null,this.onMsg=null,this.onDown=null,this.closed=!1,this.ids={}}open(e){let t=this,n=Yo();return new Promise(function(s,r){if(!n){r(new Error("nolan"));return}let o;try{o=JSON.parse(n.lanStart(String(e||"Sala")))}catch(h){r(h);return}if(!o||!o.ok){r(new Error(o&&o.err?o.err:"lanfail"));return}let a=new WebSocket("ws://127.0.0.1:"+o.port+"/host");t.ws=a;let l=!1;a.onopen=function(){l=!0,s(o.ips&&o.ips.length?o.ips.join("  \xB7  "):"sin Wi-Fi")},a.onerror=function(){l||r(new Error("lanws"))},a.onclose=function(){l&&!t.closed&&t.onDown&&t.onDown()},a.onmessage=function(h){let c=h.data;if(typeof c!="string"||!c.length)return;let u=c.charAt(0);if(u==="+"){let d=c.slice(1);t.ids[d]=1,t.onJoin&&t.onJoin(d);return}if(u==="-"){let d=c.slice(1);t.ids[d]&&(delete t.ids[d],t.onLeave&&t.onLeave(d));return}let f=c.indexOf("|");if(f>0){let d=c.slice(0,f);t.ids[d]&&t.onMsg&&t.onMsg(d,c.slice(f+1))}}})}send(e,t){this.ws&&this.ws.readyState===1&&this.ws.send(e+"|"+t)}broadcast(e){this.ws&&this.ws.readyState===1&&this.ws.send("*|"+e)}kick(e){delete this.ids[e],this.ws&&this.ws.readyState===1&&this.ws.send("!"+e)}close(){if(this.closed=!0,this.ws)try{this.ws.close()}catch{}let e=Yo();if(e)try{e.lanStop()}catch{}}},Yl=class{constructor(){this.ws=null,this.onMsg=null,this.onClose=null,this.closed=!1}connect(e){let t=this;return new Promise(function(n,s){let r=String(e||"").replace(/^\s*(ws|http)s?:\/\//,"").replace(/[\s/]+$/g,"");if(!/^[0-9a-zA-Z.\-:]+$/.test(r)){s(new Error("badaddr"));return}r.indexOf(":")<0&&(r+=":"+Of);let o=!1,a;try{a=new WebSocket("ws://"+r+"/join")}catch(h){s(h);return}t.ws=a;let l=setTimeout(function(){if(!o){o=!0;try{a.close()}catch{}s(new Error("timeout"))}},7e3);a.onopen=function(){o||(o=!0,clearTimeout(l),n())},a.onerror=function(){o||(o=!0,clearTimeout(l),s(new Error("lanws")))},a.onclose=function(){o&&!t.closed&&t.onClose&&(t.closed=!0,t.onClose())},a.onmessage=function(h){typeof h.data=="string"&&t.onMsg&&t.onMsg(h.data)}})}send(e){this.ws&&this.ws.readyState===1&&this.ws.send(e)}close(){if(this.closed=!0,this.ws)try{this.ws.close()}catch{}}};function n0(i,e){let t=Yo(),n=[];if(t)try{n=JSON.parse(t.lanIps())||[]}catch{n=[]}let s=[],r=typeof window<"u"&&window.__lanScanHosts;if(r){for(let f=0;f<r.length;f++)s.push(r[f]);n=[]}for(let f=0;f<n.length;f++){let d=String(n[f]).split(".");if(d.length!==4){s.push(String(n[f]));continue}for(let p=1;p<255;p++)s.push(d[0]+"."+d[1]+"."+d[2]+"."+p)}if(!s.length){e(!1);return}let o=0,a=0,l=!1,h={};function c(){for(;a<48&&o<s.length;)u(s[o++]);!a&&o>=s.length&&!l&&(l=!0,e(!0))}function u(f){a++;let d=!1,p,v=function(){if(!d){d=!0,a--;try{p.close()}catch{}c()}};try{p=new WebSocket("ws://"+(f.indexOf(":")<0?f+":"+Of:f)+"/probe")}catch{d=!0,a--;return}let m=setTimeout(v,1300);p.onmessage=function(g){let x=String(g.data);if(x.indexOf("senda|")===0&&!h[f]){h[f]=1;let _=x.split("|");i({ip:f,name:_[1]||"Sala",n:+_[2]||0})}clearTimeout(m),v()},p.onerror=function(){clearTimeout(m),v()},p.onclose=function(){clearTimeout(m),v()}}c()}var jl=class{constructor(e,t,n,s,r){this.tr=e,this.cb=r,this.lobby={mode:t,code:n,teams:s.teams,diff:s.diff,gmode:s.mode===0?0:1,gmap:s.map|0,players:[{id:0,name:s.name,cls:s.cls,team:0,slot:0,host:!0}]},this.ids={},this.nextId=1,this.seen={},this.started=!1,this.ninjaOf={};let o=this;e.onJoin=function(){},e.onLeave=function(a){o.drop(a)},e.onMsg=function(a,l){o.recv(a,l)},e.onDown=function(){o.cb.down&&o.cb.down()},this.timer=setInterval(function(){o.sweep()},2e3)}player(e){let t=this.lobby.players;for(let n=0;n<t.length;n++)if(t[n].id===e)return t[n];return null}taken(e,t){let n=this.lobby.players;for(let s=0;s<n.length;s++)if(n[s].team===e&&n[s].slot===t)return!0;return!1}freeSlot(){for(let e=0;e<this.lobby.teams;e++)for(let t=0;t<3;t++)if(!this.taken(e,t))return{team:e,slot:t};return null}recv(e,t){let n;try{n=JSON.parse(t)}catch{return}if(!Array.isArray(n))return;this.seen[e]=Date.now();let s=this.ids[e],r=n[0];if(r==="hello"){if(s!=null)return;if(n[1]!==7){this.tr.send(e,JSON.stringify(["no","ver"]));return}if(this.started){this.tr.send(e,JSON.stringify(["no","busy"]));return}let a=this.freeSlot();if(!a){this.tr.send(e,JSON.stringify(["no","full"]));return}let l=this.nextId++;this.ids[e]=l;let h=String(n[2]||"Ninja").replace(/[<>&"]/g,"").slice(0,12)||"Ninja",c=2,u=h;for(;this.lobby.players.some(function(f){return f.name===h});)h=u.slice(0,10)+c++;this.lobby.players.push({id:l,name:h,cls:(n[3]|0)%3,team:a.team,slot:a.slot,host:!1}),this.tr.send(e,JSON.stringify(["welcome",l,this.lobby])),this.sync();return}if(s==null)return;if(r==="p"){this.tr.send(e,JSON.stringify(["p",n[1]]));return}if(r==="i"||r==="a"){let a=this.ninjaOf[s];this.started&&a!=null&&this.cb.input&&this.cb.input(a,n);return}if(this.started)return;let o=this.player(s);o&&(r==="slot"?this.setSlot(s,n[1]|0,n[2]|0):r==="cls"&&(o.cls=(n[1]|0)%3,this.sync()))}setSlot(e,t,n){let s=this.player(e);!s||t<0||t>=this.lobby.teams||n<0||n>2||this.taken(t,n)||(s.team=t,s.slot=n,this.sync())}setCls(e,t){let n=this.player(e);n&&(n.cls=t,this.sync())}setOpt(e,t,n,s){if(this.lobby.diff=t,(n===0||n===1)&&(this.lobby.gmode=n),s>=0&&s<=2&&(this.lobby.gmap=s),e!==this.lobby.teams){this.lobby.teams=e;let r=this.lobby.players;for(let o=0;o<r.length;o++)r[o].team>=e&&(r[o].team=-1);for(let o=0;o<r.length;o++)if(r[o].team<0){let a=this.freeSlot();a&&(r[o].team=a.team,r[o].slot=a.slot)}for(let o=r.length-1;o>=0;o--)if(r[o].team<0){let a=r[o];r.splice(o,1);for(let l in this.ids)this.ids[l]===a.id&&(this.tr.send(l,JSON.stringify(["no","full"])),this.tr.kick(l),delete this.ids[l])}}this.sync()}sync(){this.tr.broadcast(JSON.stringify(["lobby",this.lobby])),this.cb.lobby&&this.cb.lobby(this.lobby)}drop(e){let t=this.ids[e];if(t==null)return;delete this.ids[e],delete this.seen[e];let n=this.lobby.players;for(let s=0;s<n.length;s++)if(n[s].id===t){n.splice(s,1);break}if(this.started){let s=this.ninjaOf[t];s!=null&&this.cb.left&&this.cb.left(s),delete this.ninjaOf[t]}this.sync()}sweep(){let e=Date.now();for(let t in this.ids)this.seen[t]&&e-this.seen[t]>9e3&&(this.tr.kick(t),this.drop(t))}start(){let e=this.lobby,t=Math.random()*2147483647|0,n=e.players.map(function(o){return{team:o.team,slot:o.slot,cls:o.cls,name:o.name,owner:o.id}}),s=da(e.teams,n,si(t^119),na);this.started=!0,this.ninjaOf={};for(let o=0;o<s.length;o++)s[o].bot||(this.ninjaOf[s[o].owner]=s[o].id);let r={seed:t,teams:e.teams,diff:e.diff,mode:e.gmode,map:e.gmap|0,roster:s};for(let o in this.ids){let a=this.ninjaOf[this.ids[o]];this.tr.send(o,JSON.stringify(["start",{seed:t,teams:e.teams,diff:e.diff,mode:e.gmode,map:e.gmap|0,roster:s,you:a}]))}return{seed:r.seed,teams:r.teams,diff:r.diff,mode:r.mode,map:r.map,roster:s,you:this.ninjaOf[0]}}snap(e){this.tr.broadcast(JSON.stringify(e))}hasRemotes(){for(let e in this.ids)return!0;return!1}backToLobby(){this.started=!1,this.ninjaOf={},this.tr.broadcast(JSON.stringify(["back"])),this.sync()}close(){clearInterval(this.timer);try{this.tr.broadcast(JSON.stringify(["bye"]))}catch{}let e=this.tr;setTimeout(function(){e.close()},150)}},Jl=class{constructor(e,t,n){this.tr=e,this.cb=n,this.id=null,this.lobby=null,this.ping=null,this.closed=!1;let s=this;e.onMsg=function(r){s.recv(r)},e.onClose=function(){!s.closed&&s.cb.closed&&s.cb.closed("lost")},this.send(["hello",7,t.name,t.cls]),this.timer=setInterval(function(){s.send(["p",Date.now()%1e6])},2e3)}recv(e){let t;try{t=JSON.parse(e)}catch{return}if(!Array.isArray(t)){t&&t.k==="s"&&this.cb.snap&&this.cb.snap(t);return}let n=t[0];if(n==="welcome")this.id=t[1],this.lobby=t[2],this.cb.lobby&&this.cb.lobby(this.lobby,this.id);else if(n==="lobby")this.lobby=t[1],this.cb.lobby&&this.id!=null&&this.cb.lobby(this.lobby,this.id);else if(n==="start")this.cb.start&&this.cb.start(t[1]);else if(n==="back")this.cb.back&&this.cb.back();else if(n==="p"){let s=Date.now()%1e6-t[1];s<0&&(s+=1e6),this.ping=s}else n==="no"?(this.closed=!0,this.cb.closed&&this.cb.closed(t[1]),this.tr.close()):n==="bye"&&(this.closed=!0,this.cb.closed&&this.cb.closed("bye"),this.tr.close())}send(e){this.tr.send(JSON.stringify(e))}close(){this.closed=!0,clearInterval(this.timer),this.tr.close()}};var Bb="1.4",i0=t0(),Hb=/iPhone|iPad|iPod/.test(navigator.userAgent||"")||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,r0="sendaNinja.v1";function wr(i){return document.getElementById(i)}var tt={name:"",cls:0,diff:1,teams:4,mode:1,map:1,sfx:!0,music:!0,hq:!0};try{let i=window.localStorage.getItem(r0);if(i){let e=JSON.parse(i);for(let t in tt)e[t]!=null&&typeof e[t]==typeof tt[t]&&(tt[t]=e[t])}}catch{}tt.name||(tt.name="Ninja"+(100+Math.floor(Math.random()*900)));tt.cls=yt(tt.cls|0,0,2);tt.diff=yt(tt.diff|0,0,2);tt.teams=yt(tt.teams|0,2,4);tt.mode=tt.mode===0?0:1;tt.map=yt(tt.map|0,0,2);function Gb(){try{window.localStorage.setItem(r0,JSON.stringify(tt))}catch{}}var Vb=wr("c"),Wt=null;try{Wt=new bl(Vb)}catch(i){throw document.body.innerHTML='<div style="padding:30px;font:16px sans-serif;color:#fff">Este celular no pudo iniciar los gr\xE1ficos 3D (WebGL). Actualiza "WebView del sistema Android" desde Play Store e int\xE9ntalo de nuevo.</div>',i}var cn=new Sl,ei=new Ml;ei.attach(wr("joy"),wr("joyB"),wr("joyK"),document.querySelectorAll(".ab"));var rn="menu",Hn=null,ct=null,Ke=null,Gn=!1,Ln=!1,mi=!1,Ns=!1,ps=null,ds=0,Wb=null,kf=null;function o0(){cn.setSfx(tt.sfx),cn.setMusic(tt.music),$l=1,Wt.setQuality(tt.hq?1:.7)}var De=new Tl({click:function(){cn.unlock(),cn.play("click")},sound:function(i){cn.play(i)},save:Gb,applySettings:o0,back:function(i){i==="lan"?De.show("mp",{lanOk:Ar()}):De.show("title")},solo:s0,host:qb,join:Yb,lanScan:jb,lobbySlot:function(i,e){Ke&&(Ln?Ke.setSlot(0,i,e):Ke.send(["slot",i,e]))},lobbyCls:function(i){Ke&&(Ln?Ke.setCls(0,i):Ke.send(["cls",i]))},lobbyOpt:function(){Ke&&Ln&&Ke.setOpt(tt.teams,tt.diff,tt.mode,tt.map)},start:function(){Ke&&Ln&&rn==="lobby"&&Gf(Ke.start())},again:function(){Gn?s0():Ln&&Ke&&(Jo(),Ke.backToLobby(),Zo(Ke.lobby,0))},leave:zf,pause:function(){rn==="game"&&!Ns&&(mi=!0,ei.reset(),De.data.solo=Gn,De.showOverlay("pause"))},resume:function(){mi=!1,De.hide()}},tt);function a0(){let i=Ir(20261);Wt.buildWorld(i,4);let e=[],t=[[-2.2,1.6,.9],[0,2.4,3.14],[2.2,1.6,-.9],[-2.4,-1.2,1.9],[0,-2.2,0],[2.4,-1.2,-1.9]];for(let n=0;n<6;n++)e.push({id:n,team:n<3?0:1,slot:n%3,cls:n%3,name:"",bot:!0});Wt.buildMatch(e,2,-1),kf={ninjas:e.map(function(n,s){return{id:s,team:n.team,cls:n.cls,x:48+t[s][0],z:48+t[s][1],f:t[s][2],hp:100,st:Te,fl:0,cM:0,cS:0,cX:0,cH:0,cD:0,moving:!1,hidden:!1}}),scrolls:[{kind:0,carrier:1,x:48,z:48+2.4},{kind:1,carrier:4,x:48,z:48-2.2}],proj:[],areas:[],food:255,zone:{r:Z.ZONE_R0,to:Z.ZONE_R0,timer:0,shrinking:!1,stage:0},deliver:[0,0],events:[],stars:[],items:[],mode:0,sealed:!1,lastLife:!1}}function eh(i,e){rn="menu",ei.enabled=!1,ei.reset(),De.hudStop(),a0(),cn.setMood(0),De.show(i||"title",e)}function Gf(i){ps&&(clearTimeout(ps),ps=null),Wb=i,Ns=!1,mi=!1;let e;if(Ln||Gn){Hn=new fa(i);let t=i.you;e=function(n){Hn.input(t,n)},ct=new Dr(i,e,.075),Hn.onSnap=function(n){ct.onSnap(n),Ke&&Ke.hasRemotes()&&Ke.snap(n)}}else Hn=null,e=function(t){Ke&&Ke.send(t)},ct=new Dr(i,e,.13);Wt.buildWorld(ct.map,i.teams,ct.mode),Wt.buildMatch(i.roster,i.teams,i.you),Wt.cam.x=ct.p.x,Wt.cam.z=ct.p.z,ds=i.you,De.hide(),De.hudStart(ct,i.roster,i.teams),ei.reset(),ei.enabled=!0,rn="game",cn.setMood(1)}function Jo(){ps&&(clearTimeout(ps),ps=null),Hn=null,ct=null,Ns=!1,mi=!1,ei.enabled=!1,ei.reset(),De.hudStop()}function s0(){Ke&&(Ke.close(),Ke=null),Gn=!0,Ln=!1;let i=Math.random()*2147483647|0,e=si(i^119),t=Math.floor(Math.random()*tt.teams),n=da(tt.teams,[{team:t,slot:0,cls:tt.cls,name:tt.name,owner:0}],e,na);Gf({seed:i,teams:tt.teams,diff:tt.diff,mode:tt.mode,map:tt.map,roster:n,you:t*3})}function Xb(){if(ps=null,rn!=="game"||!ct||!ct.view.end)return;let i=ct.view.end,e=ct.start;ei.enabled=!1,ei.reset(),De.hudStop(),cn.setMood(0),cn.play(i.winner===ct.myTeam?"win":"lose"),De.show("results",{end:i,roster:e.roster,myTeam:ct.myTeam,me:ct.me,canAgain:Gn||Ln,solo:Gn,mode:ct.mode})}function zf(){Ke&&(Ke.close(),Ke=null),Jo(),Gn=!1,Ln=!1,eh("title")}var Bf={ver:"Esa sala usa otra versi\xF3n del juego. Todos deben instalar la misma APK.",busy:"Esa sala ya empez\xF3 la partida. Espera a que termine.",full:"La sala est\xE1 llena.",bye:"El anfitri\xF3n cerr\xF3 la sala.",lost:"Se perdi\xF3 la conexi\xF3n con el anfitri\xF3n."};function c0(i,e){let t=i&&(i.type||i.message);return t==="peer-unavailable"?"No existe una sala con ese c\xF3digo. Rev\xEDsalo e int\xE9ntalo otra vez.":t==="nolan"?"El modo Wi-Fi local solo funciona dentro de la app instalada.":t==="lanws"||t==="badaddr"?e?"No se pudo abrir la sala local.":"No se pudo conectar con esa direcci\xF3n. \xBFEst\xE1n en el mismo Wi-Fi?":t==="timeout"||t==="closed"?e?"No hubo respuesta del servicio de salas. Revisa tu conexi\xF3n e int\xE9ntalo otra vez.":"No se logr\xF3 conectar con el anfitri\xF3n. Algunas redes (sobre todo datos m\xF3viles) bloquean la conexi\xF3n directa: prueben con otro Wi-Fi o con el modo Wi-Fi local.":t==="network"||t==="server-error"||t==="socket-error"||t==="socket-closed"?"No se pudo contactar el servicio de salas por internet. Int\xE9ntalo m\xE1s tarde o usen Wi-Fi local.":t==="browser-incompatible"||t==="webrtc"?"Este celular no pudo abrir la conexi\xF3n directa. Prueben el modo Wi-Fi local.":(e?"No se pudo crear la sala":"No se pudo entrar a la sala")+" ("+(t||"error")+")."}function Zo(i,e){rn==="game"&&(a0(),cn.setMood(0)),rn="lobby";let t=De.name==="lobby"?De.data:{};De.show("lobby",{lobby:i,myId:e,isHost:Ln,msg:t.msg,err:t.err})}function qb(i){if(Ke)return;De.msg(i==="net"?"Creando sala por internet\u2026":"Abriendo sala en el Wi-Fi\u2026");let e=i==="net"?new Wl:new ql;(i==="net"?e.open():e.open(tt.name)).then(function(n){if(De.name!=="mp"){e.close();return}Gn=!1,Ln=!0,Ke=new jl(e,i,n,tt,{lobby:function(s){rn==="lobby"&&Zo(s,0)},input:function(s,r){Hn&&Hn.input(s,r)},left:function(s){Hn&&Hn.toBot(s)},down:function(){rn==="lobby"&&De.msg("Se cort\xF3 la conexi\xF3n con el servicio de salas. Los que ya entraron siguen conectados.",!0)}}),Zo(Ke.lobby,0)}).catch(function(n){De.msg(c0(n,!0),!0)})}function Yb(i,e){if(Ke)return;if(i==="net"&&(!e||e.length<4)){De.msg("Escribe el c\xF3digo de la sala.",!0);return}if(i==="lan"&&!e){De.msg("Escribe la direcci\xF3n del anfitri\xF3n.",!0);return}De.msg("Conectando\u2026");let t=De.name,n=i==="net"?new Xl:new Yl;n.connect(e).then(function(){if(De.name!==t){n.close();return}Gn=!1,Ln=!1,Ke=new Jl(n,tt,{lobby:function(s,r){rn!=="game"&&Zo(s,r)},start:function(s){Gf(s)},snap:function(s){ct&&rn==="game"&&ct.onSnap(s)},back:function(){Jo(),Ke&&Ke.lobby&&Zo(Ke.lobby,Ke.id)},closed:function(s){Ke=null,Jo(),eh("mp",{lanOk:Ar(),msg:Bf[s]||Bf.lost,err:!0})}})}).catch(function(s){De.msg(c0(s,!1),!0)})}function jb(){De.name==="lan"&&(De.data.found=[],De.data.scanning=!0,De.data.msg="",De.render(),n0(function(i){De.name==="lan"&&(De.data.found.push(i),De.render())},function(i){De.name==="lan"&&(De.data.scanning=!1,i||(De.data.msg="No se detect\xF3 una red Wi-Fi. Escribe la direcci\xF3n que muestra el anfitri\xF3n.",De.data.err=!1),De.render())}))}var Hf=performance.now(),Zl=0,Ff=0,$l=1,Ql={x:0,z:0};function Kl(i,e){let t=i-Ql.x,n=e-Ql.z;return yt(1.15-Math.sqrt(t*t+n*n)/15,0,1)}Wt.onCue=function(i,e,t){if(rn!=="game")return;let n=ct&&t===ct.me;cn.play(i,(n?1:.7)*Kl(e.x,e.z))};function Jb(i){if(i.ninjas[ct.me].st!==Yt)return ct.me;let t=i.ninjas[ds];if(t&&ds!==ct.me&&t.st===Te&&(t.team===ct.myTeam||!Zb(i)))return ds;for(let n=0;n<i.ninjas.length;n++)if(i.ninjas[n].team===ct.myTeam&&i.ninjas[n].st!==Yt)return n;for(let n=0;n<i.ninjas.length;n++)if(i.ninjas[n].st===Te)return n;return ct.me}function Zb(i){for(let e=0;e<i.ninjas.length;e++)if(i.ninjas[e].team===ct.myTeam&&i.ninjas[e].st!==Yt)return!0;return!1}var $b=0;function th(i){if($b++>=3)return;let e=wr("errbox");e||(e=document.createElement("div"),e.id="errbox",e.style.cssText="position:absolute;left:8px;right:8px;bottom:8px;z-index:99;background:rgba(120,20,20,.92);color:#fff;font:12px/1.35 monospace;padding:8px 10px;border-radius:8px;pointer-events:none;white-space:pre-wrap;word-break:break-word",document.body.appendChild(e)),e.textContent=`Error del juego (cu\xE9ntaselo a quien te pas\xF3 la app):
`+String(i).slice(0,300),e.style.display="block",setTimeout(function(){e.style.display="none"},12e3)}window.addEventListener("error",function(i){th((i&&i.message?i.message:"error")+(i&&i.lineno?" @"+i.lineno+":"+i.colno:""))});window.addEventListener("unhandledrejection",function(i){th("promesa: "+(i&&i.reason&&i.reason.message?i.reason.message:i&&i.reason))});function l0(i){requestAnimationFrame(l0);try{Kb(i)}catch(e){th((e&&e.message?e.message:e)+(e&&e.stack?`
`+String(e.stack).split(`
`).slice(1,3).join(`
`):"")),window.console&&console.error(e)}}function Kb(i){(window.innerWidth!==Wt.w||window.innerHeight!==Wt.h)&&nh();let e=(i-Hf)/1e3;if(Hf=i,e>0||(e=.016),e>.1&&(e=.1),rn==="game"&&ct){let t=mi&&Gn;Hn&&!t&&Hn.advance(e);let n=ei.read();mi&&(n.mx=0,n.mz=0,n.melee=!1,n.shuriken=!1,n.dash=!1,n.special=!1);let s=ct.frame(t?0:e,n);ds=Jb(s);let r=s.ninjas[ds];Ql.x=r.x,Ql.z=r.z;for(let h=0;h<s.events.length;h++){let c=s.events[h];Wt.event(c,s);let u=De.hudEvent(c,s,Wt);if(u){let f=1;c[0]==="fx"?f=Kl(c[2]/100,c[3]/100):(c[0]==="mhit"||c[0]==="matk"||c[0]==="mob"||c[0]==="mspawn")&&s.mobs[c[1]]?(f=Kl(s.mobs[c[1]].x,s.mobs[c[1]].z),c[0]==="mob"&&s.ninjas[c[2]]&&s.ninjas[c[2]].team===ct.myTeam&&(f=1),c[0]==="mspawn"&&(f=Math.max(f,.45))):typeof c[1]=="number"&&s.ninjas[c[1]]&&(c[0]==="hit"||c[0]==="down"||c[0]==="food"||c[0]==="pick"||c[0]==="drop"||c[0]==="rev"||c[0]==="pw"||c[0]==="shield"||c[0]==="star")&&(f=Kl(s.ninjas[c[1]].x,s.ninjas[c[1]].z),(c[0]==="pick"||c[0]==="drop")&&(f=Math.max(f,.35))),cn.play(u,f)}}let o=s.sealed,l=s.ninjas[ct.me].st===Te&&s.phase===1?ct.autoAim(10.2,!0):null;if(Wt.update(s,t?0:e,ds,{sealed:o,target:l,objective:De.objective}),De.hudUpdate(s,Wt,e,ds,Ke&&!Ln?Ke.ping:null),cn.setMood(s.phase===1&&(s.mode===1||!o)?2:1),s.end&&!Ns&&(Ns=!0,ps=setTimeout(Xb,2200)),!Hn&&s.stale>12&&Ke){let h=Ke;Ke=null,h.close(),Jo(),eh("mp",{lanOk:Ar(),msg:Bf.lost,err:!0})}}else kf&&Wt.update(kf,e,-1,{orbit:!0,sealed:!1});if(Wt.render(),Zl+=e,Ff++,Zl>=3){let t=Ff/Zl;Zl=0,Ff=0,(t<26||t>=34&&t<46)&&$l>.55&&!document.hidden&&($l*=.82,Wt.setQuality((tt.hq?1:.7)*$l))}}function nh(){let i=window.innerWidth,e=window.innerHeight;if(!(i>0&&e>0))return;Wt.resize(i,e,window.devicePixelRatio||1);let t=(navigator.maxTouchPoints||0)>0;wr("rot").classList.toggle("hide",!(t&&i>e&&e<520))}window.addEventListener("resize",nh);window.addEventListener("orientationchange",function(){setTimeout(nh,200)});document.addEventListener("visibilitychange",function(){document.hidden?(cn.suspend(),rn==="game"&&Gn&&!Ns&&!mi&&(mi=!0,De.data.solo=!0,De.showOverlay("pause"))):(cn.resume(),Hf=performance.now())});document.addEventListener("pointerdown",function(){cn.unlock()},!0);["pointerup","touchend","click","keydown"].forEach(function(i){document.addEventListener(i,function(){cn.unlock()},!0)});document.addEventListener("gesturestart",function(i){i.preventDefault()});document.addEventListener("dblclick",function(i){i.preventDefault()});document.addEventListener("touchmove",function(i){rn==="game"&&!De.overlay&&De.name!=="results"&&i.preventDefault()},{passive:!1});document.addEventListener("contextmenu",function(i){i.preventDefault()});document.addEventListener("focusout",function(){setTimeout(function(){window.scrollTo(0,0)},60)});window.onAndroidBack=function(){return rn==="game"?(De.overlay==="phelp"?De.showOverlay("pause"):mi?(mi=!1,De.hide()):De.name==="results"?zf():(mi=!0,ei.reset(),De.data.solo=Gn,De.showOverlay("pause")),"ok"):rn==="lobby"?(zf(),"ok"):De.name&&De.name!=="title"?(De.name==="lan"?De.show("mp",{lanOk:Ar()}):De.show("title"),"ok"):"exit"};var Qb=De.show.bind(De);De.show=function(i,e){i==="mp"&&(e=e||{},e.lanOk=Ar(),e.env=i0),i==="title"&&(e=e||{},e.iosTip=i0==="web"&&Hb&&!window.navigator.standalone),i==="opts"&&(e=e||{},e.ver=Bb+" \xB7 red "+7),Qb(i,e)};o0();nh();eh("title");requestAnimationFrame(l0);window.__senda={state:function(){return{mode:rn,screen:De.name,overlay:De.overlay,solo:Gn,isHost:Ln,ended:Ns}},client:function(){return ct},host:function(){return Hn},session:function(){return Ke},settings:tt,rend:Wt,reportError:th};})();
