(()=>{var s0=Object.create;var eh=Object.defineProperty;var r0=Object.getOwnPropertyDescriptor;var o0=Object.getOwnPropertyNames;var a0=Object.getPrototypeOf,c0=Object.prototype.hasOwnProperty;var l0=(i,e)=>()=>{try{return e||i((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},jo=(i,e)=>{for(var t in e)eh(i,t,{get:e[t],enumerable:!0})},h0=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of o0(e))!c0.call(i,s)&&s!==t&&eh(i,s,{get:()=>e[s],enumerable:!(n=r0(e,s))||n.enumerable});return i};var Jf=(i,e,t)=>(t=i!=null?s0(a0(i)):{},h0(e||!i||!i.__esModule?eh(t,"default",{value:i,enumerable:!0}):t,i));var mf=l0((R1,pf)=>{"use strict";var ne={};ne.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)};ne.localCName=ne.generateIdentifier();ne.splitLines=function(i){return i.trim().split(`
`).map(e=>e.trim())};ne.splitSections=function(i){return i.split(`
m=`).map((t,n)=>(n>0?"m="+t:t).trim()+`\r
`)};ne.getDescription=function(i){let e=ne.splitSections(i);return e&&e[0]};ne.getMediaSections=function(i){let e=ne.splitSections(i);return e.shift(),e};ne.matchPrefix=function(i,e){return ne.splitLines(i).filter(t=>t.indexOf(e)===0)};ne.parseCandidate=function(i){let e;i.indexOf("a=candidate:")===0?e=i.substring(12).split(" "):e=i.substring(10).split(" ");let t={foundation:e[0],component:{1:"rtp",2:"rtcp"}[e[1]]||e[1],protocol:e[2].toLowerCase(),priority:parseInt(e[3],10),ip:e[4],address:e[4],port:parseInt(e[5],10),type:e[7]};for(let n=8;n<e.length;n+=2)switch(e[n]){case"raddr":t.relatedAddress=e[n+1];break;case"rport":t.relatedPort=parseInt(e[n+1],10);break;case"tcptype":t.tcpType=e[n+1];break;case"ufrag":t.ufrag=e[n+1],t.usernameFragment=e[n+1];break;default:t[e[n]]===void 0&&(t[e[n]]=e[n+1]);break}return t};ne.writeCandidate=function(i){let e=[];e.push(i.foundation);let t=i.component;t==="rtp"?e.push(1):t==="rtcp"?e.push(2):e.push(t),e.push(i.protocol.toUpperCase()),e.push(i.priority),e.push(i.address||i.ip),e.push(i.port);let n=i.type;return e.push("typ"),e.push(n),n!=="host"&&i.relatedAddress&&i.relatedPort!==void 0&&(e.push("raddr"),e.push(i.relatedAddress),e.push("rport"),e.push(i.relatedPort)),i.tcpType&&i.protocol.toLowerCase()==="tcp"&&(e.push("tcptype"),e.push(i.tcpType)),(i.usernameFragment||i.ufrag)&&(e.push("ufrag"),e.push(i.usernameFragment||i.ufrag)),"candidate:"+e.join(" ")};ne.parseIceOptions=function(i){return i.substring(14).split(" ")};ne.parseRtpMap=function(i){let e=i.substring(9).split(" "),t={payloadType:parseInt(e.shift(),10)};return e=e[0].split("/"),t.name=e[0],t.clockRate=parseInt(e[1],10),t.channels=e.length===3?parseInt(e[2],10):1,t.numChannels=t.channels,t};ne.writeRtpMap=function(i){let e=i.payloadType;i.preferredPayloadType!==void 0&&(e=i.preferredPayloadType);let t=i.channels||i.numChannels||1;return"a=rtpmap:"+e+" "+i.name+"/"+i.clockRate+(t!==1?"/"+t:"")+`\r
`};ne.parseExtmap=function(i){let e=i.substring(9).split(" ");return{id:parseInt(e[0],10),direction:e[0].indexOf("/")>0?e[0].split("/")[1]:"sendrecv",uri:e[1],attributes:e.slice(2).join(" ")}};ne.writeExtmap=function(i){return"a=extmap:"+(i.id||i.preferredId)+(i.direction&&i.direction!=="sendrecv"?"/"+i.direction:"")+" "+i.uri+(i.attributes?" "+i.attributes:"")+`\r
`};ne.parseFmtp=function(i){let e={},t=i.substring(i.indexOf(" ")+1).split(";");for(let n=0;n<t.length;n++){let[s,...r]=t[n].trim().split("=");e[s.trim()]=r.length?r.join("="):void 0}return e};ne.writeFmtp=function(i){let e="",t=i.payloadType;if(i.preferredPayloadType!==void 0&&(t=i.preferredPayloadType),i.parameters&&Object.keys(i.parameters).length){let n=[];Object.keys(i.parameters).forEach(s=>{i.parameters[s]!==void 0?n.push(s+"="+i.parameters[s]):n.push(s)}),e+="a=fmtp:"+t+" "+n.join(";")+`\r
`}return e};ne.parseRtcpFb=function(i){let e=i.substring(i.indexOf(" ")+1).split(" ");return{type:e.shift(),parameter:e.join(" ")}};ne.writeRtcpFb=function(i){let e="",t=i.payloadType;return i.preferredPayloadType!==void 0&&(t=i.preferredPayloadType),i.rtcpFeedback&&i.rtcpFeedback.length&&i.rtcpFeedback.forEach(n=>{e+="a=rtcp-fb:"+t+" "+n.type+(n.parameter&&n.parameter.length?" "+n.parameter:"")+`\r
`}),e};ne.parseSsrcMedia=function(i){let e=i.indexOf(" "),t={ssrc:parseInt(i.substring(7,e),10)},n=i.indexOf(":",e);return n>-1?(t.attribute=i.substring(e+1,n),t.value=i.substring(n+1)):t.attribute=i.substring(e+1),t};ne.parseSsrcGroup=function(i){let e=i.substring(13).split(" ");return{semantics:e.shift(),ssrcs:e.map(t=>parseInt(t,10))}};ne.getMid=function(i){let e=ne.matchPrefix(i,"a=mid:")[0];if(e)return e.substring(6)};ne.parseFingerprint=function(i){let e=i.substring(14).split(" ");return{algorithm:e[0].toLowerCase(),value:e[1].toUpperCase()}};ne.getDtlsParameters=function(i,e){return{role:"auto",fingerprints:ne.matchPrefix(i+e,"a=fingerprint:").map(ne.parseFingerprint)}};ne.writeDtlsParameters=function(i,e){let t="a=setup:"+e+`\r
`;return i.fingerprints.forEach(n=>{t+="a=fingerprint:"+n.algorithm+" "+n.value+`\r
`}),t};ne.parseCryptoLine=function(i){let e=i.substring(9).split(" ");return{tag:parseInt(e[0],10),cryptoSuite:e[1],keyParams:e[2],sessionParams:e.slice(3)}};ne.writeCryptoLine=function(i){return"a=crypto:"+i.tag+" "+i.cryptoSuite+" "+(typeof i.keyParams=="object"?ne.writeCryptoKeyParams(i.keyParams):i.keyParams)+(i.sessionParams?" "+i.sessionParams.join(" "):"")+`\r
`};ne.parseCryptoKeyParams=function(i){if(i.indexOf("inline:")!==0)return null;let e=i.substring(7).split("|");return{keyMethod:"inline",keySalt:e[0],lifeTime:e[1],mkiValue:e[2]?e[2].split(":")[0]:void 0,mkiLength:e[2]?e[2].split(":")[1]:void 0}};ne.writeCryptoKeyParams=function(i){return i.keyMethod+":"+i.keySalt+(i.lifeTime?"|"+i.lifeTime:"")+(i.mkiValue&&i.mkiLength?"|"+i.mkiValue+":"+i.mkiLength:"")};ne.getCryptoParameters=function(i,e){return ne.matchPrefix(i+e,"a=crypto:").map(ne.parseCryptoLine)};ne.getIceParameters=function(i,e){let t=ne.matchPrefix(i+e,"a=ice-ufrag:")[0],n=ne.matchPrefix(i+e,"a=ice-pwd:")[0];return t&&n?{usernameFragment:t.substring(12),password:n.substring(10)}:null};ne.writeIceParameters=function(i){let e="a=ice-ufrag:"+i.usernameFragment+`\r
a=ice-pwd:`+i.password+`\r
`;return i.iceLite&&(e+=`a=ice-lite\r
`),e};ne.parseRtpParameters=function(i){let e={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},n=ne.splitLines(i)[0].split(" ");e.profile=n[2];for(let r=3;r<n.length;r++){let o=n[r],a=ne.matchPrefix(i,"a=rtpmap:"+o+" ")[0];if(a){let c=ne.parseRtpMap(a),h=ne.matchPrefix(i,"a=fmtp:"+o+" ");switch(c.parameters=h.length?ne.parseFmtp(h[0]):{},c.rtcpFeedback=ne.matchPrefix(i,"a=rtcp-fb:"+o+" ").map(ne.parseRtcpFb),e.codecs.push(c),c.name.toUpperCase()){case"RED":case"ULPFEC":e.fecMechanisms.push(c.name.toUpperCase());break;default:break}}}ne.matchPrefix(i,"a=extmap:").forEach(r=>{e.headerExtensions.push(ne.parseExtmap(r))});let s=ne.matchPrefix(i,"a=rtcp-fb:* ").map(ne.parseRtcpFb);return e.codecs.forEach(r=>{s.forEach(o=>{r.rtcpFeedback.find(c=>c.type===o.type&&c.parameter===o.parameter)||r.rtcpFeedback.push(o)})}),e};ne.writeRtpDescription=function(i,e){let t="";t+="m="+i+" ",t+=e.codecs.length>0?"9":"0",t+=" "+(e.profile||"UDP/TLS/RTP/SAVPF")+" ",t+=e.codecs.map(s=>s.preferredPayloadType!==void 0?s.preferredPayloadType:s.payloadType).join(" ")+`\r
`,t+=`c=IN IP4 0.0.0.0\r
`,t+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,e.codecs.forEach(s=>{t+=ne.writeRtpMap(s),t+=ne.writeFmtp(s),t+=ne.writeRtcpFb(s)});let n=0;return e.codecs.forEach(s=>{s.maxptime>n&&(n=s.maxptime)}),n>0&&(t+="a=maxptime:"+n+`\r
`),e.headerExtensions&&e.headerExtensions.forEach(s=>{t+=ne.writeExtmap(s)}),t};ne.parseRtpEncodingParameters=function(i){let e=[],t=ne.parseRtpParameters(i),n=t.fecMechanisms.indexOf("RED")!==-1,s=t.fecMechanisms.indexOf("ULPFEC")!==-1,r=ne.matchPrefix(i,"a=ssrc:").map(l=>ne.parseSsrcMedia(l)).filter(l=>l.attribute==="cname"),o=r.length>0&&r[0].ssrc,a,c=ne.matchPrefix(i,"a=ssrc-group:FID").map(l=>l.substring(17).split(" ").map(f=>parseInt(f,10)));c.length>0&&c[0].length>1&&c[0][0]===o&&(a=c[0][1]),t.codecs.forEach(l=>{if(l.name.toUpperCase()==="RTX"&&l.parameters.apt){let u={ssrc:o,codecPayloadType:parseInt(l.parameters.apt,10)};o&&a&&(u.rtx={ssrc:a}),e.push(u),n&&(u=JSON.parse(JSON.stringify(u)),u.fec={ssrc:o,mechanism:s?"red+ulpfec":"red"},e.push(u))}}),e.length===0&&o&&e.push({ssrc:o});let h=ne.matchPrefix(i,"b=");return h.length&&(h[0].indexOf("b=TIAS:")===0?h=parseInt(h[0].substring(7),10):h[0].indexOf("b=AS:")===0?h=parseInt(h[0].substring(5),10)*1e3*.95-2e3*8:h=void 0,e.forEach(l=>{l.maxBitrate=h})),e};ne.parseRtcpParameters=function(i){let e={},t=ne.matchPrefix(i,"a=ssrc:").map(r=>ne.parseSsrcMedia(r)).filter(r=>r.attribute==="cname")[0];t&&(e.cname=t.value,e.ssrc=t.ssrc);let n=ne.matchPrefix(i,"a=rtcp-rsize");e.reducedSize=n.length>0,e.compound=n.length===0;let s=ne.matchPrefix(i,"a=rtcp-mux");return e.mux=s.length>0,e};ne.writeRtcpParameters=function(i){let e="";return i.reducedSize&&(e+=`a=rtcp-rsize\r
`),i.mux&&(e+=`a=rtcp-mux\r
`),i.ssrc!==void 0&&i.cname&&(e+="a=ssrc:"+i.ssrc+" cname:"+i.cname+`\r
`),e};ne.parseMsid=function(i){let e,t=ne.matchPrefix(i,"a=msid:");if(t.length===1)return e=t[0].substring(7).split(" "),{stream:e[0],track:e[1]};let n=ne.matchPrefix(i,"a=ssrc:").map(s=>ne.parseSsrcMedia(s)).filter(s=>s.attribute==="msid");if(n.length>0)return e=n[0].value.split(" "),{stream:e[0],track:e[1]}};ne.parseSctpDescription=function(i){let e=ne.parseMLine(i),t=ne.matchPrefix(i,"a=max-message-size:"),n;t.length>0&&(n=parseInt(t[0].substring(19),10)),isNaN(n)&&(n=65536);let s=ne.matchPrefix(i,"a=sctp-port:");if(s.length>0)return{port:parseInt(s[0].substring(12),10),protocol:e.fmt,maxMessageSize:n};let r=ne.matchPrefix(i,"a=sctpmap:");if(r.length>0){let o=r[0].substring(10).split(" ");return{port:parseInt(o[0],10),protocol:o[1],maxMessageSize:n}}};ne.writeSctpDescription=function(i,e){let t=[];return i.protocol!=="DTLS/SCTP"?t=["m="+i.kind+" 9 "+i.protocol+" "+e.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+e.port+`\r
`]:t=["m="+i.kind+" 9 "+i.protocol+" "+e.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+e.port+" "+e.protocol+` 65535\r
`],e.maxMessageSize!==void 0&&t.push("a=max-message-size:"+e.maxMessageSize+`\r
`),t.join("")};ne.generateSessionId=function(){return Math.random().toString().substr(2,22)};ne.writeSessionBoilerplate=function(i,e,t){let n,s=e!==void 0?e:2;return i?n=i:n=ne.generateSessionId(),`v=0\r
o=`+(t||"thisisadapterortc")+" "+n+" "+s+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`};ne.getDirection=function(i,e){let t=ne.splitLines(i);for(let n=0;n<t.length;n++)switch(t[n]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return t[n].substring(2);default:}return e?ne.getDirection(e):"sendrecv"};ne.getKind=function(i){return ne.splitLines(i)[0].split(" ")[0].substring(2)};ne.isRejected=function(i){return i.split(" ",2)[1]==="0"};ne.parseMLine=function(i){let t=ne.splitLines(i)[0].substring(2).split(" ");return{kind:t[0],port:parseInt(t[1],10),protocol:t[2],fmt:t.slice(3).join(" ")}};ne.parseOLine=function(i){let t=ne.matchPrefix(i,"o=")[0].substring(2).split(" ");return{username:t[0],sessionId:t[1],sessionVersion:parseInt(t[2],10),netType:t[3],addressType:t[4],address:t[5]}};ne.isValidSDP=function(i){if(typeof i!="string"||i.length===0)return!1;let e=ne.splitLines(i);for(let t=0;t<e.length;t++)if(e[t].length<2||e[t].charAt(1)!=="=")return!1;return!0};typeof pf=="object"&&(pf.exports=ne)});var Cs=.03333333333333333,Zf=2,dt=[{name:"Grulla",color:15026253,css:"#ef5a5f"},{name:"Carpa",color:3900150,css:"#5b9bff"},{name:"Mantis",color:4176208,css:"#4cc764"},{name:"B\xFAho",color:16098596,css:"#f7b23b"}],Gt=[{name:"Brasa",role:"Ataque",spec:"Estallido",cd:9,color:16742959,css:"#ff8a3d",desc:"Lanza una bola de fuego que explota y deja ardiendo a los rivales."},{name:"Marea",role:"Apoyo",spec:"Manantial",cd:12,color:3720948,css:"#4fd0ff",desc:"Cura a todo tu equipo cercano y limpia quemaduras y enredos."},{name:"Ra\xEDz",role:"Control",spec:"Zarza",cd:10,color:10212938,css:"#a8e05a",desc:"Hace brotar zarzas que atrapan y frenan a los rivales."}],Zn=[{name:"Sol",color:16762941,css:"#ffcf4a"},{name:"Luna",color:12175615,css:"#c3d0ff"}],J={HP:100,SPEED:5,RADIUS:.34,OBST_R:.4,MELEE_R:1.8,MELEE_ARC:1,MELEE_DMG:14,MELEE_CD:.42,LUNGE:.45,SH_DMG:9,SH_SPEED:17,SH_TTL:.62,SH_MAX:3,SH_RECH:2.2,SH_HIT:.5,DASH_T:.16,DASH_MULT:3.4,DASH_INV:.26,DASH_CD:4.5,SPEC_RANGE:7.5,FIRE_T:.45,FIRE_R:2.3,FIRE_DMG:24,BURN_T:3,BURN_DPS:4,HEAL_R:3.6,HEAL_AMT:32,SEED_T:.4,BRAMBLE_R:2.3,BRAMBLE_T:4.5,BRAMBLE_DMG:7,ROOT_T:1.4,SLOW_MULT:.55,DOWN_T:18,DOWN_EARLY:8,RESPAWN_INV:2.5,REVIVE_T:2.6,REVIVE_R:1.5,REVIVE_HP:45,REVIVE_INV:1.2,REGEN_DELAY:6,REGEN:2,PICK_R:.95,FOOD_HP:40,FOOD_RESPAWN:25,SHRINE_R:3.4,PLAZA_R:6.5,DELIVER_T:6,VIEW:11,BUSH_SEE:2.3,REVEAL_T:1.1,COUNTDOWN:4,ZONE_R0:72,POW_MAX:3,POW_SPEED:.18,POW_RESPAWN:12,BOOM_R:1.7,STAR_PICK:.85,STAR_LOCK:.5},u0=[{wait:90,shrink:35,r:44,dps:4},{wait:20,shrink:28,r:28,dps:6},{wait:20,shrink:25,r:15,dps:9},{wait:20,shrink:22,r:6.5,dps:12},{wait:22,shrink:22,r:.5,dps:18}],f0=[{wait:20,shrink:25,r:27,dps:6},{wait:25,shrink:22,r:19,dps:9},{wait:25,shrink:20,r:12,dps:12},{wait:22,shrink:20,r:6.5,dps:16},{wait:12,shrink:16,r:.5,dps:22}],$n=[{id:0,name:"Cl\xE1sico",tag:"T\xE1ctico: cacer\xEDa, muerte s\xFAbita y peleas largas.",speed:5,dashMax:1,dashCd:4.5,dashInv:.26,lunge:.45,meleeReach:0,meleeDmg:14,shDmg:9,fireDmg:24,brambleDmg:7,healAmt:32,starPickup:!1,starLife:0,resurge:!1,powerups:!1,half:!1,zoneR0:72,zone:u0,deliverT:6,mmHalf:48},{id:1,name:"Frenes\xED",tag:"R\xE1pido: dos golpes derriban, esquiva constante y reapareces junto a tu equipo.",speed:6,dashMax:2,dashCd:1,dashInv:.18,lunge:1,meleeReach:.5,meleeDmg:50,shDmg:34,fireDmg:55,brambleDmg:20,healAmt:50,starPickup:!0,starLife:10,resurge:!0,powerups:!0,half:!0,respBase:2,respStage:.5,respKill:.5,respMin:1,respInv:1.5,wipeT:4,lastLifeStage:3,openStage:1,zoneR0:38,zone:f0,deliverT:4,mmHalf:38}],fn=[{name:"Viento",desc:"Corres m\xE1s r\xE1pido",color:8315135,css:"#7ee0ff"},{name:"Sombra",desc:"Una esquiva m\xE1s",color:11898111,css:"#b58cff"},{name:"P\xF3lvora",desc:"Tus estrellas explotan",color:16751165,css:"#ff9a3d"},{name:"Coraza",desc:"Aguanta un golpe",color:16769162,css:"#ffe08a"}];function $f(i){let e=0;for(let t=i.length-1;t>=0;t--)e=e*5+(i[t]+1);return e}function Jo(i,e){for(e.length=0;i>0;)e.push(i%5-1),i=Math.floor(i/5);return e}function us(i,e){let t=0;for(let n=0;n<i.length;n++)i[n]===e&&t++;return t}var Tr=[{name:"F\xE1cil",react:.5,aim:.32,dmg:.55,special:.35,dash:.2},{name:"Normal",react:.3,aim:.17,dmg:.8,special:.7,dash:.5},{name:"Dif\xEDcil",react:.16,aim:.07,dmg:1,special:1,dash:.85}],Zo=["Aki","Ren","Taro","Mika","Nao","Daigo","Kaede","Jin","Goro","Emi","Riku","Suzu","Tetsu","Kohaku","Asahi","Kenta","Toma","Ryu","Noa","Yori","Isamu","Momo","Kiyo","Hiro","Yuna","Reo","Kazu","Mai","Eiji","Fumi","Nori","Saki","Tomo","Umi"],Me=0,Pt=1,Vt=2,$o=1,Ko=2,Rs=4,Qo=8,ea=16,Ps=32,ta=64;function Mi(i){let e=i>>>0;return function(){e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Is(i,e){let t=i-e;for(;t>Math.PI;)t-=2*Math.PI;for(;t<-Math.PI;)t+=2*Math.PI;return t}function gt(i,e,t){return i<e?e:i>t?t:i}var Ar=0,bi=1,Ei=2,Kn=3,hi=4,zn=5,Ti=6,Ls=7,dn=8,Hn=9,d0=.8,bt=96/2,Er=11,Kf=5.2,Qf=21,ed=31,p0=35.5,Gi=27;function Bn(i){return i===Kn||i===hi||i===zn||i===dn||i===Hn}function na(i,e,t){for(;t>0;t--){let n=96-e;e=i,i=n}return{x:i,z:e}}function ia(i,e,t,n){let s=e,r=t;for(let o=0;o<4;o++){i[r*96+s]=n;let a=95-r;r=s,s=a}}function th(i,e){let t=e+1,n=new Float32Array(t*t);for(let s=0;s<n.length;s++)n[s]=i();return function(s,r){let o=gt(s,0,1)*e,a=gt(r,0,1)*e,c=Math.floor(o),h=Math.floor(a);c>=e&&(c=e-1),h>=e&&(h=e-1);let l=o-c,u=a-h,f=l*l*(3-2*l),d=u*u*(3-2*u),p=n[h*t+c],y=n[h*t+c+1],m=n[(h+1)*t+c],g=n[(h+1)*t+c+1];return p+(y-p)*f+(m-p)*d+(p-y-m+g)*f*d}}function wr(i,e){let t=e===1,n=Mi(i),s=new Uint8Array(9216),r=new Uint8Array(9216),o=Mi((i^5369127)>>>0);for(let w=0;w<r.length;w++)r[w]=o()*256|0;let a=th(n,6),c=th(n,7),h=th(n,8),l=new Float32Array(bt+2);{let w=0;for(let E=0;E<l.length;E++){w+=(n()-.5)*1.1,w=gt(w,-3.2,3.2);let x=gt((E-15)/5,0,1)*gt((42-E)/5,0,1);l[E]=w*x}}for(let w=0;w<bt;w++)for(let E=0;E<bt;E++){let x=bt-(E+.5),M=bt-(w+.5),S=Math.sqrt(x*x+M*M),_=E/(bt-1),R=w/(bt-1),I=E+.5-Er,D=w+.5-Er,P=Math.sqrt(I*I+D*D),F=E+w>>1,z=Math.round(l[F]),O=Math.abs(E-w-z)<=1&&F>=Er-1,W=gt(Math.min(x,M)/7,0,1),X=Qf+(a(_,R)-.5)*5*W,Z=Math.abs(S-X)<1.3,ee=(E>=bt-2||w>=bt-2)&&S<ed+1,_e=Math.abs(S-ed)<1.15,Le=n(),Y=n(),se=Ar;if(E<3||w<3)se=dn;else if(S<J.PLAZA_R)se=Ls;else if(Z)se=O||ee?Ti:zn;else if(P<Kf)se=bi;else if(O||ee||_e)se=bi;else{let ve=c(_,R),De=h(_,R),de=S<Qf-2.5,Ge=S<10.5,xt=P<Kf+1.5,Fe=Math.abs(S-X)<2.4;if(!Ge&&!xt){let Qe=ve>.62?.42:ve>.48?.17:.05;de&&(Qe*=.5),Fe&&(Qe*=.4),(E<6||w<6)&&(Qe=Math.max(Qe,.55)),Le<Qe?se=Kn:Le<Qe+(de?.04:.02)?se=hi:(De>.68||De>.6&&Y<.35)&&(se=Ei)}}ia(s,E,w,se)}if(ia(s,43,43,Hn),s[4174]=Hn,s[4177]=Hn,t){for(let w=0;w<96;w++)for(let E=0;E<96;E++){let x=bt-(E+.5),M=bt-(w+.5),S=p0+(r[w*96+E]/255-.5)*1.6;x*x+M*M>S*S&&(s[w*96+E]=dn)}for(let w=Gi-4;w<=Gi+4;w++)for(let E=Gi-4;E<=Gi+4;E++){let x=E+.5-Gi,M=w+.5-Gi,S=s[w*96+E];x*x+M*M<2.7*2.7&&S!==zn&&S!==Ti&&S!==Ls&&ia(s,E,w,bi)}}function u(w,E){let x=[];for(let M=0;M<w.length;M++){let S=Math.floor(w[M].x),_=Math.floor(w[M].z);E&&(Bn(s[_*96+S])||s[_*96+S]===Ei)&&ia(s,S,_,bi);for(let R=0;R<4;R++)x.push(na(w[M].x,w[M].z,R))}return x}let f=u([{x:38.5,z:38.5},{x:24.5,z:27.5}],!0),d=t?u([{x:29.5,z:29.5},{x:40.5,z:33.5},{x:20.5,z:40.5}],!0):[],p=t?[{x:26.5,z:26.5},{x:28.3,z:26.3},{x:26.3,z:28.3}]:[{x:10.5,z:10.5},{x:12.6,z:10.2},{x:10.2,z:12.6}],y=[],m=[];for(let w=0;w<4;w++)y.push(p.map(function(E){return na(E.x,E.z,w)})),m.push(t?na(Gi,Gi,w):na(Er,Er,w));let g=new Uint8Array(9216);function v(){g.fill(0);let w=[bt*96+bt];for(g[bt*96+bt]=1;w.length;){let E=w.pop(),x=E%96,M=E/96|0,S=[x>0?E-1:-1,x<95?E+1:-1,M>0?E-96:-1,M<95?E+96:-1];for(let _=0;_<4;_++){let R=S[_];R<0||g[R]||Bn(s[R])||(g[R]=1,w.push(R))}}}v();let T=!1,b=f.concat(d);for(let w=0;w<4;w++)for(let E=0;E<3;E++)b.push(y[w][E]);for(let w=0;w<b.length;w++){let E=Math.floor(b[w].x),x=Math.floor(b[w].z),M=0;for(;!g[x*96+E]&&M++<200;){let S=s[x*96+E];S===zn?s[x*96+E]=Ti:Bn(S)&&(s[x*96+E]=bi),T=!0;let _=bt-E,R=bt-x;Math.abs(_)>=Math.abs(R)?E+=_>0?1:-1:x+=R>0?1:-1}}T&&v();for(let w=0;w<s.length;w++)!g[w]&&!Bn(s[w])&&(s[w]=Kn);return{seed:i,tiles:s,vari:r,pickups:f,spawns:y,camps:m,items:d,half:t}}function fs(i,e,t,n){let s=e===2?t*2:t;return i.spawns[s%4][n%3]}function nd(i,e,t){return i.camps[(e===2?t*2:t)%4]}function li(i,e,t){let n=Math.floor(e),s=Math.floor(t);return n<0||s<0||n>=96||s>=96?dn:i.tiles[s*96+n]}function td(i,e,t){let n=i.tiles;{let s=e.x-bt,r=e.z-bt,o=s*s+r*r,a=t+d0;if(o<a*a)if(o<1e-9)e.z=bt+a;else{let c=Math.sqrt(o);e.x=bt+s/c*a,e.z=bt+r/c*a}}for(let s=0;s<2;s++){let r=Math.floor(e.x),o=Math.floor(e.z);for(let a=o-1;a<=o+1;a++)for(let c=r-1;c<=r+1;c++){let h=c<0||a<0||c>=96||a>=96?dn:n[a*96+c];if(h===Kn||h===hi||h===Hn){let l=c+.5,u=a+.5,f=e.x-l,d=e.z-u,p=f*f+d*d,y=t+J.OBST_R;if(p<y*y)if(p<1e-9)e.x=l+y;else{let m=Math.sqrt(p);e.x=l+f/m*y,e.z=u+d/m*y}}else if(h===zn||h===dn){let l=gt(e.x,c,c+1),u=gt(e.z,a,a+1),f=e.x-l,d=e.z-u,p=f*f+d*d;if(p<t*t)if(p>1e-9){let y=Math.sqrt(p);e.x=l+f/y*t,e.z=u+d/y*t}else{let y=e.x-c,m=c+1-e.x,g=e.z-a,v=a+1-e.z,T=Math.min(y,m,g,v);T===y?e.x=c-t:T===m?e.x=c+1+t:T===g?e.z=a-t:e.z=a+1+t}}}}}function Ds(i,e,t,n,s){let r=Math.sqrt(t*t+n*n);if(r<1e-6){td(i,e,s);return}let o=Math.max(1,Math.ceil(r/.2)),a=t/o,c=n/o;for(let h=0;h<o;h++)e.x+=a,e.z+=c,td(i,e,s);e.x=gt(e.x,.5,96-.5),e.z=gt(e.z,.5,96-.5)}function ra(i,e,t,n,s){let r=n-e,o=s-t,a=Math.sqrt(r*r+o*o),c=Math.ceil(a/.3);for(let h=1;h<c;h++){let l=e+r*h/c,u=t+o*h/c,f=li(i,l,u);if(f===dn)return!1;if(f===Kn||f===hi||f===Hn){let d=l-(Math.floor(l)+.5),p=u-(Math.floor(u)+.5);if(d*d+p*p<.2)return!1}}return!0}function nh(i,e,t,n,s){let r=n-e,o=s-t,a=Math.sqrt(r*r+o*o);if(a<1e-6)return!0;let c=Math.ceil(a/.25),h=-o/a*.36,l=r/a*.36;for(let u=0;u<=c;u++){let f=e+r*u/c,d=t+o*u/c;if(Bn(li(i,f,d))||Bn(li(i,f+h,d+l))||Bn(li(i,f-h,d-l)))return!1}return!0}function Vi(i,e,t){let n=Math.floor(e),s=Math.floor(t);for(let r=0;r<12;r++){let o=null,a=1e9;for(let c=s-r;c<=s+r;c++)for(let h=n-r;h<=n+r;h++){if(Math.max(Math.abs(h-n),Math.abs(c-s))!==r||h<0||c<0||h>=96||c>=96||Bn(i.tiles[c*96+h]))continue;let l=h+.5-e,u=c+.5-t,f=l*l+u*u;f<a&&(a=f,o={x:h+.5,z:c+.5})}if(o)return o}return{x:bt,z:bt}}var sa=class{constructor(e){this.map=e;let t=9216;this.walk=new Uint8Array(t);for(let n=0;n<t;n++)this.walk[n]=Bn(e.tiles[n])?0:1;this.g=new Float32Array(t),this.from=new Int32Array(t),this.mark=new Uint32Array(t),this.done=new Uint32Array(t),this.gen=0,this.hk=new Int32Array(t*4),this.hf=new Float32Array(t*4),this.hn=0}_push(e,t){let n=this.hk,s=this.hf,r=this.hn++;if(r>=n.length){this.hn--;return}for(;r>0;){let o=r-1>>1;if(s[o]<=t)break;n[r]=n[o],s[r]=s[o],r=o}n[r]=e,s[r]=t}_pop(){let e=this.hk,t=this.hf,n=e[0],s=--this.hn;if(s>0){let r=e[s],o=t[s],a=0;for(;;){let c=a*2+1;if(c>=s||(c+1<s&&t[c+1]<t[c]&&c++,t[c]>=o))break;e[a]=e[c],t[a]=t[c],a=c}e[a]=r,t[a]=o}return n}_free(e,t){let n=Math.floor(e),s=Math.floor(t);if(n>=0&&s>=0&&n<96&&s<96&&this.walk[s*96+n])return s*96+n;let r=Vi(this.map,e,t);return Math.floor(r.z)*96+Math.floor(r.x)}find(e,t,n,s){let r=this.walk,o=this.g,a=this.from,c=this.mark,h=this.done,l=this._free(e,t),u=this._free(n,s),f=u%96,d=u/96|0;if(l===u)return[f+.5,d+.5];let p=++this.gen;this.hn=0,o[l]=0,c[l]=p,a[l]=-1,this._push(l,0);let y=0,m=!1;for(;this.hn>0&&y++<14e3;){let b=this._pop();if(h[b]===p)continue;if(h[b]=p,b===u){m=!0;break}let w=b%96,E=b/96|0;for(let x=-1;x<=1;x++)for(let M=-1;M<=1;M++){if(!M&&!x)continue;let S=w+M,_=E+x;if(S<0||_<0||S>=96||_>=96)continue;let R=_*96+S;if(!r[R]||h[R]===p)continue;let I=M!==0&&x!==0;if(I&&(!r[E*96+S]||!r[_*96+w]))continue;let D=o[b]+(I?1.4142:1);if(c[R]!==p||D<o[R]){o[R]=D,c[R]=p,a[R]=b;let P=Math.abs(S-f),F=Math.abs(_-d),z=P>F?P+F*.4142:F+P*.4142;this._push(R,D+z*1.001)}}}if(!m)return null;let g=[],v=u;for(;v!==l&&v>=0;)g.push(v),v=a[v];let T=[];for(let b=g.length-1;b>=0;b--)T.push(g[b]%96+.5,(g[b]/96|0)+.5);return T}};function wt(i){return Math.round(i*100)}var oa=class{constructor(e,t,n){this.map=e,this.mode=n.mode===1?1:0;let s=this.R=$n[this.mode];this.lastLife=!1,this.nTeams=n.teams,this.diff=Tr[n.diff==null?1:n.diff],this.rng=Mi(((n.seed|0)^625341585)>>>0),this.clock=0,this.t=0,this.phase=0,this.count=J.COUNTDOWN,this.events=[],this.nextId=1,this.ninjas=[];for(let a=0;a<t.length;a++){let c=t[a],h=fs(e,this.nTeams,c.team,c.slot);this.ninjas.push({id:c.id,team:c.team,slot:c.slot,cls:c.cls,name:c.name,bot:!!c.bot,x:h.x,z:h.z,f:Math.atan2(48-h.x,48-h.z),px:h.x,pz:h.z,vx:0,vz:0,mx:0,mz:0,moving:!1,hp:J.HP,st:Me,downT:0,revP:0,meleeCd:0,charges:J.SH_MAX,throwCd:0,dash:s.dashMax,dashGap:0,dashT:0,dashA:0,lungeT:0,lungeA:0,specCd:2.5,invT:0,pw:[],life:0,burnT:0,burnBy:-1,burnAcc:0,rootT:0,slowT:0,revealT:0,zoneAcc:0,hurtT:-99,combatT:-99,bush:!1,cM:0,cS:0,cX:0,cH:0,cD:0,kills:0,dmg:0,revs:0})}this.teamOut=[],this.outOrder=[],this.scrolls=[];for(let a=0;a<this.nTeams;a++){this.teamOut.push(!1);let c=this.ninjas[a*3];this.scrolls.push({id:a,kind:a%2,carrier:c.id,x:c.x,z:c.z,lock:0})}this.pickups=e.pickups.map(function(a){return{x:a.x,z:a.z,on:!0,t:0}});let r=this.rng;this.items=s.powerups?e.items.map(function(a){return{x:a.x,z:a.z,type:Math.floor(r()*4),on:!0,t:0}}):[],this.stars=[],this.proj=[],this.areas=[];let o=s.zone;this.zone={r:s.zoneR0,from:s.zoneR0,to:o[0].r,stage:0,timer:o[0].wait,shrinking:!1,dps:o[0].dps},this.deliver=[];for(let a=0;a<this.nTeams;a++)this.deliver.push(0);this.winner=-1}ev(e){this.events.push(e)}hunting(){return this.zone.stage===0&&!this.zone.shrinking}sealed(){return this.R.resurge?this.zone.stage<this.R.openStage:this.hunting()}speedOf(e){return this.R.speed*(1+J.POW_SPEED*us(e.pw,0))*(e.slowT>0?J.SLOW_MULT:1)}dashMaxOf(e){return this.R.dashMax+us(e.pw,1)}fresh(e,t,n,s){e.x=t,e.z=n,e.px=t,e.pz=n,e.vx=0,e.vz=0,e.f=Math.atan2(48-t,48-n),e.st=Me,e.hp=J.HP,e.invT=s,e.revP=0,e.downT=0,e.charges=J.SH_MAX,e.meleeCd=0,e.dash=this.dashMaxOf(e),e.dashGap=0,e.combatT=this.t,this.ev(["resp",e.id])}respawn(e){let t=fs(this.map,this.nTeams,e.team,e.slot);this.fresh(e,t.x,t.z,J.RESPAWN_INV)}resurge(e){let t=this.ninjas,n=this.map,s=null,r=-1;for(let h=0;h<t.length;h++){let l=t[h];if(l.team!==e.team||l.st!==Me)continue;let u=99;for(let f=0;f<t.length;f++){let d=t[f];if(d.team===e.team||d.st!==Me)continue;let p=Math.sqrt((d.x-l.x)*(d.x-l.x)+(d.z-l.z)*(d.z-l.z));p<u&&(u=p)}u>r&&(r=u,s=l)}if(!s){let h=fs(n,this.nTeams,e.team,e.slot),l=h.x-48,u=h.z-48,f=Math.sqrt(l*l+u*u)||1,d=Math.min(f,Math.max(2,this.zone.r-3)),p=Vi(n,48+l/f*d,48+u/f*d);this.fresh(e,p.x,p.z,this.R.respInv);return}let o=s.x,a=s.z,c=-1;for(let h=0;h<8;h++){let l=h*Math.PI/4+e.slot,u={x:s.x+Math.sin(l)*2.1,z:s.z+Math.cos(l)*2.1};if(Bn(li(n,u.x,u.z)))continue;Ds(n,u,0,0,J.RADIUS);let f=Math.sqrt((u.x-48)*(u.x-48)+(u.z-48)*(u.z-48)),d=30;for(let y=0;y<t.length;y++){let m=t[y];if(m.team===e.team||m.st!==Me)continue;let g=Math.sqrt((m.x-u.x)*(m.x-u.x)+(m.z-u.z)*(m.z-u.z));g<d&&(d=g)}let p=d-(f>this.zone.r?20:0);p>c&&(c=p,o=u.x,a=u.z)}this.fresh(e,o,a,this.R.respInv)}setHuman(e,t,n,s,r){let o=this.ninjas[e];if(!o||o.bot||o.st!==Me||!(t>.4&&n>.4&&t<96-.4&&n<96-.4))return;let a=t-o.x,c=n-o.z;if(a*a+c*c>49)return;let h=li(this.map,t,n);h===zn||h===dn||(o.x=t,o.z=n,o.f=s,o.moving=!!r)}act(e,t,n,s,r){let o=this.ninjas[e];if(!o||o.st!==Me||this.phase!==1)return!1;n!==n&&(n=o.f);let a=this.ninjas,c=this.R;if(t==="m"){if(o.meleeCd>.1)return!1;o.meleeCd=J.MELEE_CD,o.f=n,o.cM++,o.revealT=J.REVEAL_T,o.bot&&o.rootT<=0&&(o.lungeT=.1,o.lungeA=n);let h=J.MELEE_R+.25+c.meleeReach;for(let l=0;l<a.length;l++){let u=a[l];if(u.team===o.team||u.st!==Me)continue;let f=u.x-o.x,d=u.z-o.z,p=f*f+d*d;p>h*h||p>.7&&Math.abs(Is(Math.atan2(f,d),n))>J.MELEE_ARC||this.damage(u,c.meleeDmg,o,0)}return!0}if(t==="s"){if(o.charges<1||o.throwCd>.05)return!1;o.charges-=1,o.throwCd=.22,o.f=n,o.cS++,o.revealT=J.REVEAL_T;let h=Math.sin(n),l=Math.cos(n);return this.proj.push({id:this.nextId++,kind:0,owner:o.id,team:o.team,x:o.x+h*.45,z:o.z+l*.45,vx:h*J.SH_SPEED,vz:l*J.SH_SPEED,ttl:J.SH_TTL,tx:0,tz:0,boom:us(o.pw,2)>0,life:o.life}),!0}if(t==="d")return o.dash<1-.1/c.dashCd||o.dashGap>.05||o.rootT>0?!1:(o.dash=Math.max(0,o.dash-1),o.dashGap=.2,o.invT=Math.max(o.invT,c.dashInv),o.cD++,o.bot&&(o.dashT=J.DASH_T,o.dashA=n),!0);if(t==="x"){if(o.specCd>.1)return!1;if(o.specCd=Gt[o.cls].cd,o.cX++,o.revealT=J.REVEAL_T,o.f=n,o.cls===1){for(let d=0;d<a.length;d++){let p=a[d];if(p.team!==o.team||p.st!==Me)continue;let y=p.x-o.x,m=p.z-o.z;if(y*y+m*m>J.HEAL_R*J.HEAL_R)continue;let g=p.hp;p.hp=Math.min(J.HP,p.hp+c.healAmt),p.burnT=0,p.rootT=0,p.slowT=0,p.hp-g>=1&&this.ev(["heal",p.id,Math.round(p.hp-g)])}return this.ev(["fx","heal",wt(o.x),wt(o.z),o.team]),!0}(s!==s||r!==r)&&(s=o.x+Math.sin(n)*5.5,r=o.z+Math.cos(n)*5.5);let h=s-o.x,l=r-o.z,u=Math.sqrt(h*h+l*l);u>J.SPEC_RANGE&&(h*=J.SPEC_RANGE/u,l*=J.SPEC_RANGE/u);let f=o.cls===0?J.FIRE_T:J.SEED_T;return this.proj.push({id:this.nextId++,kind:o.cls===0?1:2,owner:o.id,team:o.team,x:o.x,z:o.z,vx:h/f,vz:l/f,ttl:f,tx:o.x+h,tz:o.z+l}),!0}return!1}damage(e,t,n,s,r){if(e.st===Me&&!(e.invT>0&&!r)){if(!r&&s!==4){let o=e.pw.indexOf(3);if(o>=0){e.pw.splice(o,1),e.invT=Math.max(e.invT,.35),e.hurtT=this.t,e.combatT=this.t,n&&(n.combatT=this.t),this.ev(["shield",e.id]);return}}n&&n.bot&&s!==4&&(t*=this.diff.dmg),t=Math.max(1,Math.round(t)),e.hp-=t,e.cH++,e.hurtT=this.t,e.combatT=this.t,n&&(n.combatT=this.t,n.dmg+=t),this.ev(["hit",e.id,t,s,n?n.id:-1]),e.hp<=0&&this.down(e,n)}}down(e,t){let n=this.R;if(e.hp=0,e.st=Pt,e.revP=0,e.burnT=0,e.rootT=0,e.slowT=0,e.dashT=0,e.lungeT=0,e.mx=0,e.mz=0,e.moving=!1,t&&t.team!==e.team&&(t.kills++,n.resurge))for(let s=0;s<this.ninjas.length;s++){let r=this.ninjas[s];r.team===t.team&&r.st===Pt&&r.downT>n.respMin&&(r.downT=Math.max(n.respMin,r.downT-n.respKill))}if(this.ev(["down",e.id,t?t.id:-1]),n.resurge){e.pw.length=0,e.life++;for(let s=this.stars.length-1;s>=0;s--)this.stars[s].owner===e.id&&this.stars.splice(s,1);if(this.lastLife)e.st=Vt,this.ev(["out",e.id]);else{e.downT=n.respBase+n.respStage*Math.min(this.zone.stage,4);let s=!1;for(let r=0;r<this.ninjas.length;r++)this.ninjas[r].team===e.team&&this.ninjas[r].st===Me&&(s=!0);if(!s&&this.phase===1){for(let r=0;r<this.ninjas.length;r++){let o=this.ninjas[r];o.team===e.team&&o.st===Pt&&(o.downT=Math.max(o.downT,n.wipeT))}this.ev(["wipe",e.team])}}}else e.downT=this.hunting()?J.DOWN_EARLY:J.DOWN_T;for(let s=0;s<this.scrolls.length;s++){let r=this.scrolls[s];if(r.carrier!==e.id)continue;r.carrier=-1,r.lock=.9;let o={x:e.x+(this.rng()-.5)*.8,z:e.z+(this.rng()-.5)*.8};Ds(this.map,o,0,0,.3),r.x=o.x,r.z=o.z,this.ev(["drop",e.id,r.id])}this.checkTeam(e.team)}checkTeam(e){if(this.teamOut[e]||this.phase!==1||!this.R.resurge&&this.hunting()||this.R.resurge&&!this.lastLife)return;let t=this.ninjas;for(let r=0;r<t.length;r++)if(t[r].team===e&&t[r].st===Me)return;this.teamOut[e]=!0,this.outOrder.push(e);for(let r=0;r<t.length;r++)t[r].team===e&&t[r].st===Pt&&(t[r].st=Vt,this.ev(["out",t[r].id]));let n=-1,s=0;for(let r=0;r<this.nTeams;r++)this.teamOut[r]||(n=r,s++);this.ev(["tout",e,s+1]),s===1?this.win(n,"last"):s===0&&this.win(e,"last")}win(e,t){if(this.phase===2)return;this.phase=2,this.winner=e;let n=this.ninjas,s=this,r=[];for(let h=0;h<this.nTeams;h++)h!==e&&!this.teamOut[h]&&r.push(h);function o(h){let l=0;for(let u=0;u<n.length;u++)n[u].team===h&&n[u].st===Me&&(l+=n[u].hp);for(let u=0;u<s.scrolls.length;u++){let f=s.scrolls[u].carrier;f>=0&&n[f].team===h&&(l+=1e3)}return l}r.sort(function(h,l){return o(l)-o(h)});let a=[e].concat(r);for(let h=this.outOrder.length-1;h>=0;h--)this.outOrder[h]!==e&&a.push(this.outOrder[h]);let c=n.map(function(h){return[h.kills,Math.round(h.dmg),h.revs]});this.ev(["end",e,t,a,c,Math.round(this.t)])}step(){let e=Cs;if(this.clock+=e,this.phase===0){this.count-=e,this.count<=0&&(this.phase=1,this.ev(["go"]));return}if(this.phase===2)return;this.t+=e;let t=this.ninjas,n=this.map,s=this.zone,r=this.R,o=r.zone;for(let h=0;h<t.length;h++){let l=t[h];if(l.st!==Me){l.vx=0,l.vz=0,l.px=l.x,l.pz=l.z;continue}l.meleeCd>0&&(l.meleeCd-=e),l.throwCd>0&&(l.throwCd-=e),!r.starPickup&&l.charges<J.SH_MAX&&(l.charges=Math.min(J.SH_MAX,l.charges+e/J.SH_RECH));let u=this.dashMaxOf(l);if(l.dash<u?l.dash=Math.min(u,l.dash+e/r.dashCd):l.dash>u&&(l.dash=u),l.dashGap>0&&(l.dashGap-=e),l.specCd>0&&(l.specCd-=e),l.invT>0&&(l.invT-=e),l.rootT>0&&(l.rootT-=e),l.slowT>0&&(l.slowT-=e),l.revealT>0&&(l.revealT-=e),l.bot){let f=this.speedOf(l),d=l.mx*f,p=l.mz*f;l.rootT>0&&(d=0,p=0,l.lungeT=0),l.dashT>0&&(l.dashT-=e,d=Math.sin(l.dashA)*r.speed*J.DASH_MULT,p=Math.cos(l.dashA)*r.speed*J.DASH_MULT),l.lungeT>0&&(l.lungeT-=e,d+=Math.sin(l.lungeA)*r.lunge/.1,p+=Math.cos(l.lungeA)*r.lunge/.1),d||p?(Ds(n,l,d*e,p*e,J.RADIUS),l.moving=!0):l.moving=!1}l.vx+=((l.x-l.px)/e-l.vx)*.35,l.vz+=((l.z-l.pz)/e-l.vz)*.35,l.px=l.x,l.pz=l.z,l.bush=li(n,l.x,l.z)===Ei,l.burnT>0&&(l.burnT-=e,l.burnAcc+=J.BURN_DPS*e,l.burnAcc>=2&&(l.burnAcc-=2,this.damage(l,2,t[l.burnBy]||null,2,!0))),l.st===Me&&this.t-l.combatT>J.REGEN_DELAY&&l.hp<J.HP&&(l.hp=Math.min(J.HP,l.hp+J.REGEN*e))}for(let h=this.proj.length-1;h>=0;h--){let l=this.proj[h];l.ttl-=e;let u=!1;if(l.kind===0){for(let f=0;f<2&&!u;f++){l.x+=l.vx*e*.5,l.z+=l.vz*e*.5;let d=li(n,l.x,l.z);if(d===dn)u=!0;else if(d===Kn||d===hi||d===Hn){let p=l.x-(Math.floor(l.x)+.5),y=l.z-(Math.floor(l.z)+.5);p*p+y*y<.2&&(u=!0)}if(u){this.ev(["fx","clink",wt(l.x),wt(l.z),l.team]),l.boom&&this.starBoom(l,null),l.x-=l.vx*e*.5,l.z-=l.vz*e*.5;break}for(let p=0;p<t.length;p++){let y=t[p];if(y.team===l.team||y.st!==Me)continue;let m=y.x-l.x,g=y.z-l.z;if(m*m+g*g<J.SH_HIT*J.SH_HIT){this.damage(y,r.shDmg,t[l.owner],1),l.boom&&this.starBoom(l,y),u=!0;break}}}if(l.ttl<=0&&(u=!0),u&&r.starPickup&&t[l.owner]&&t[l.owner].st===Me&&l.life===t[l.owner].life){let f=Bn(li(n,l.x,l.z))?Vi(n,l.x,l.z):l;this.stars.push({x:f.x,z:f.z,owner:l.owner,ttl:r.starLife,lock:J.STAR_LOCK})}}else if(l.x+=l.vx*e,l.z+=l.vz*e,l.ttl<=0){u=!0;let f=t[l.owner];if(l.kind===1){this.ev(["fx","boom",wt(l.tx),wt(l.tz),l.team]);for(let d=0;d<t.length;d++){let p=t[d];if(p.team===l.team||p.st!==Me)continue;let y=p.x-l.tx,m=p.z-l.tz,g=Math.sqrt(y*y+m*m);g>J.FIRE_R+.3||(this.damage(p,r.fireDmg*(1-.35*g/J.FIRE_R),f,2),p.st===Me&&p.invT<=0&&(p.burnT=J.BURN_T,p.burnBy=l.owner))}}else this.areas.push({id:this.nextId++,kind:0,team:l.team,owner:l.owner,x:l.tx,z:l.tz,r:J.BRAMBLE_R,ttl:J.BRAMBLE_T,hit:{}}),this.ev(["fx","bram",wt(l.tx),wt(l.tz),l.team])}u&&this.proj.splice(h,1)}for(let h=this.areas.length-1;h>=0;h--){let l=this.areas[h];if(l.ttl-=e,l.ttl<=0){this.areas.splice(h,1);continue}for(let u=0;u<t.length;u++){let f=t[u];if(f.team===l.team||f.st!==Me)continue;let d=f.x-l.x,p=f.z-l.z;d*d+p*p>l.r*l.r||f.invT>0||(l.hit[f.id]||(l.hit[f.id]=1,f.rootT=J.ROOT_T,this.damage(f,r.brambleDmg,t[l.owner],3)),f.slowT<.3&&(f.slowT=.3))}}for(let h=0;h<t.length;h++){let l=t[h];if(l.st!==Pt)continue;if(r.resurge){l.downT-=e,l.downT<=0&&this.resurge(l);continue}let u=l.x-48,f=l.z-48,d=u*u+f*f>s.r*s.r,p=null;for(let y=0;y<t.length;y++){let m=t[y];if(m.team!==l.team||m.st!==Me)continue;let g=m.x-l.x,v=m.z-l.z;if(g*g+v*v<J.REVIVE_R*J.REVIVE_R&&this.t-m.hurtT>.7){p=m;break}}p?(l.revP+=e/J.REVIVE_T,l.revP>=1&&(l.st=Me,l.hp=J.REVIVE_HP,l.invT=J.REVIVE_INV,l.revP=0,l.combatT=this.t,p.revs++,this.ev(["rev",l.id,p.id]))):(l.revP=Math.max(0,l.revP-e*.6),l.downT-=e*(d?3:1),l.downT<=0&&(this.hunting()?this.respawn(l):(l.st=Vt,this.ev(["out",l.id]))))}for(let h=0;h<this.scrolls.length;h++){let l=this.scrolls[h];if(l.carrier>=0){l.x=t[l.carrier].x,l.z=t[l.carrier].z;continue}l.lock>0&&(l.lock-=e);let u=l.x-48,f=l.z-48,d=Math.sqrt(u*u+f*f);if(d>s.r-1&&d>2){let m=Math.max(1,s.r-2.5),g=Vi(n,48+u/d*m,48+f/d*m);l.x=g.x,l.z=g.z;continue}if(l.lock>0)continue;let p=null,y=J.PICK_R*J.PICK_R;for(let m=0;m<t.length;m++){let g=t[m];if(g.st!==Me)continue;let v=g.x-l.x,T=g.z-l.z,b=v*v+T*T;b<y&&(y=b,p=g)}p&&(l.carrier=p.id,this.ev(["pick",p.id,l.id]))}for(let h=0;h<this.pickups.length;h++){let l=this.pickups[h];if(!l.on){l.t-=e,l.t<=0&&(l.on=!0);continue}for(let u=0;u<t.length;u++){let f=t[u];if(f.st!==Me||f.hp>J.HP-2)continue;let d=f.x-l.x,p=f.z-l.z;if(d*d+p*p<J.PICK_R*J.PICK_R){let y=f.hp;f.hp=Math.min(J.HP,f.hp+J.FOOD_HP),l.on=!1,l.t=J.FOOD_RESPAWN,this.ev(["food",f.id,h,Math.round(f.hp-y)]);break}}}for(let h=this.stars.length-1;h>=0;h--){let l=this.stars[h];l.ttl-=e,l.lock>0&&(l.lock-=e);let u=null;if(l.lock<=0){let f=J.STAR_PICK*J.STAR_PICK;for(let d=0;d<t.length;d++){let p=t[d];if(p.st!==Me||p.charges>J.SH_MAX-1)continue;let y=p.x-l.x,m=p.z-l.z,g=y*y+m*m;g<f&&(f=g,u=p)}}if(!u&&l.ttl<=0){let f=t[l.owner];f&&f.st===Me&&f.charges<=J.SH_MAX-1&&(f.charges+=1),this.stars.splice(h,1);continue}u&&(u.charges=Math.min(J.SH_MAX,u.charges+1),this.ev(["star",u.id]),this.stars.splice(h,1))}for(let h=0;h<this.items.length;h++){let l=this.items[h];if(!l.on){l.t-=e,l.t<=0&&(l.on=!0,l.type=Math.floor(this.rng()*4));continue}for(let u=0;u<t.length;u++){let f=t[u];if(f.st!==Me)continue;let d=f.x-l.x,p=f.z-l.z;if(d*d+p*p<J.PICK_R*J.PICK_R){f.pw.push(l.type),f.pw.length>J.POW_MAX&&f.pw.shift(),l.type===1&&(f.dash=Math.min(this.dashMaxOf(f),f.dash+1)),l.on=!1,l.t=J.POW_RESPAWN,this.ev(["pw",f.id,l.type]);break}}}if(s.stage<o.length){s.timer-=e;let h=o[s.stage];if(s.shrinking){let l=1-Math.max(0,s.timer)/h.shrink;s.r=s.from+(s.to-s.from)*l,s.timer<=0&&(s.r=s.to,s.shrinking=!1,s.stage++,s.stage<o.length?(s.timer=o[s.stage].wait,s.to=o[s.stage].r):s.timer=0,this.ev(["zone",0,s.stage]))}else if(s.timer<=0){if(!r.resurge&&s.stage===0)for(let l=0;l<t.length;l++)t[l].st===Pt&&this.respawn(t[l]);if(r.resurge&&s.stage===r.lastLifeStage&&!this.lastLife){for(let l=0;l<t.length;l++)t[l].st===Pt&&this.resurge(t[l]);for(let l=0;l<t.length;l++){let u=t[l];u.st===Me&&(u.hp=J.HP,u.burnT=0,u.invT=Math.max(u.invT,2),u.pw.indexOf(3)<0&&(u.pw.push(3),u.pw.length>J.POW_MAX&&u.pw.shift()))}this.lastLife=!0,this.ev(["last"])}s.shrinking=!0,s.timer=h.shrink,s.from=s.r,s.to=h.r,s.dps=h.dps,this.ev(["zone",1,s.stage])}}for(let h=0;h<t.length;h++){let l=t[h];if(l.st!==Me)continue;let u=l.x-48,f=l.z-48;if(u*u+f*f>s.r*s.r){if(l.zoneAcc+=s.dps*e,l.zoneAcc>=2){let d=Math.floor(l.zoneAcc);l.zoneAcc-=d,this.damage(l,d,null,4,!0)}}else l.zoneAcc=0;if(this.phase!==1)return}let a=J.SHRINE_R*J.SHRINE_R,c=this.sealed();for(let h=0;h<this.nTeams;h++){if(this.teamOut[h]||c){this.deliver[h]=0;continue}let l=!1,u=!1;for(let f=0;f<this.scrolls.length;f++){let d=this.scrolls[f];if(d.carrier<0)continue;let p=t[d.carrier];if(p.team!==h||p.st!==Me)continue;let y=p.x-48,m=p.z-48;y*y+m*m<a&&(d.kind===0?l=!0:u=!0)}if(l&&u){let f=!1;for(let d=0;d<t.length;d++){let p=t[d];if(p.team===h||p.st!==Me)continue;let y=p.x-48,m=p.z-48;if(y*y+m*m<a){f=!0;break}}if(!f&&(this.deliver[h]+=e/r.deliverT,this.deliver[h]>=1)){this.deliver[h]=1,this.win(h,"deliver");return}}else this.deliver[h]>0&&(this.deliver[h]=Math.max(0,this.deliver[h]-e*.8))}}starBoom(e,t){let n=this.ninjas;this.ev(["fx","boom2",wt(e.x),wt(e.z),e.team]);for(let s=0;s<n.length;s++){let r=n[s];if(r===t||r.team===e.team||r.st!==Me)continue;let o=r.x-e.x,a=r.z-e.z;o*o+a*a<J.BOOM_R*J.BOOM_R&&this.damage(r,this.R.shDmg*.75,n[e.owner],2)}}snapshot(){let e=[];for(let u=0;u<this.ninjas.length;u++){let f=this.ninjas[u],d=0;f.moving&&(d|=$o),f.burnT>0&&(d|=Ko),f.rootT>0&&(d|=Rs),f.invT>0&&(d|=Qo),f.revealT>0&&(d|=ea),f.slowT>0&&(d|=Ps),f.bush&&(d|=ta),e.push([wt(f.x),wt(f.z),Math.round(f.f*100),Math.max(0,Math.ceil(f.hp)),f.st,d,Math.round(Math.max(0,f.downT)*10),Math.round(f.revP*100),f.cM&255,f.cS&255,f.cX&255,f.cH&255,f.cD&255,Math.round(f.charges*10),Math.round(Math.max(0,f.dash)*10),Math.round(Math.max(0,f.specCd)*10),f.kills,$f(f.pw)])}let t=[];for(let u=0;u<this.proj.length;u++){let f=this.proj[u];t.push([f.id,f.kind,wt(f.x),wt(f.z),wt(f.vx),wt(f.vz),f.team,wt(f.tx),wt(f.tz),Math.round(f.ttl*100),f.boom?1:0])}let n=[];for(let u=0;u<this.areas.length;u++){let f=this.areas[u];n.push([f.id,f.kind,wt(f.x),wt(f.z),wt(f.r),Math.round(f.ttl*10),f.team])}let s=[];for(let u=0;u<this.scrolls.length;u++){let f=this.scrolls[u];s.push([f.carrier,wt(f.x),wt(f.z)])}let r=0;for(let u=0;u<this.pickups.length;u++)this.pickups[u].on&&(r|=1<<u);let o=this.zone,a=[];for(let u=0;u<this.nTeams;u++)a.push(Math.round(this.deliver[u]*100));let c=[];for(let u=0;u<this.stars.length;u++)c.push(Math.round(this.stars[u].x*10),Math.round(this.stars[u].z*10));let h=[];for(let u=0;u<this.items.length;u++)h.push(this.items[u].on?this.items[u].type+1:0);let l=this.events;return this.events=[],{k:"s",t:Math.round(this.clock*1e3),ph:this.phase,c:Math.max(0,Math.ceil(this.count*10)),gt:Math.round(this.t*10),n:e,p:t,a:n,s,h:r,z:[Math.round(o.r*10),Math.round(o.to*10),Math.round(Math.max(0,o.timer)*10),o.shrinking?1:0,o.stage,o.dps],d:a,e:l,g:c,it:h,ll:this.lastLife?1:0}}};function Dt(i,e,t,n){let s=i-t,r=e-n;return Math.sqrt(s*s+r*r)}var aa=class{constructor(e){this.sim=e,this.nav=new sa(e.map),this.mem=e.ninjas.map(function(t,n){return{think:n*.037%.12,react:.4+n%5*.1,path:null,pi:0,pathT:0,gx:t.x,gz:t.z,tx:t.x,tz:t.z,stopAt:0,face:null,lastX:t.x,lastZ:t.z,stuckT:0,jit:0,jx:0,jz:0,strafe:n%2?1:-1,strafeT:0,force:!1}}),this.goals=[],this.goalT=0}update(e){let t=this.sim,n=t.ninjas;if(t.phase!==1){for(let s=0;s<n.length;s++)n[s].bot&&(n[s].mx=0,n[s].mz=0);return}this.goalT-=e,this.goalT<=0&&(this.goalT=.4,this.computeGoals());for(let s=0;s<n.length;s++){let r=n[s];if(!r.bot)continue;if(r.st!==Me){r.mx=0,r.mz=0;continue}let o=this.mem[r.id];o.think-=e,o.react-=e,o.think<=0&&(o.think+=.12,o.think<0&&(o.think=.12),this.think(r,o)),this.steer(r,o,e)}}computeGoals(){let e=this.sim,t=e.ninjas;for(let n=0;n<e.nTeams;n++){let s=this.goals[n]||(this.goals[n]={}),r=0,o=0,a=0,c=null;for(let d=0;d<t.length;d++){let p=t[d];p.team!==n||p.st!==Me||(r+=p.x,o+=p.z,a++,!p.bot&&!c&&(c=p))}if(s.lead=c,s.type="none",!a)continue;r/=a,o/=a;let h=!1,l=!1;for(let d=0;d<e.scrolls.length;d++){let p=e.scrolls[d];if(p.carrier<0)continue;let y=t[p.carrier];y.team===n&&y.st===Me&&(p.kind===0?h=!0:l=!0)}if(s.has0=h,s.has1=l,h&&l){s.type="deliver",s.x=48,s.z=48,s.scroll=null;continue}let u=null,f=1e9;for(let d=0;d<e.scrolls.length;d++){let p=e.scrolls[d];if(p.carrier>=0&&t[p.carrier].team===n||p.kind===0&&h||p.kind===1&&l)continue;let y=Dt(r,o,p.x,p.z);p.carrier<0&&(y*=.6),s.scroll===p&&(y*=.8),y<f&&(f=y,u=p)}u?(s.type="hunt",s.scroll=u,s.x=u.x,s.z=u.z):(s.type="hold",s.scroll=null,s.x=48,s.z=48)}}think(e,t){let n=this.sim,s=n.ninjas,r=n.map,o=n.diff,a=n.zone,c=n.rng,h=n.R,l=this.goals[e.team]||{type:"none"},u=Dt(e.x,e.z,48,48),f=null,d=1e9,p=0,y=null,m=1e9,g=!1;for(let _=0;_<s.length;_++){let R=s[_];if(R===e)continue;let I=Dt(e.x,e.z,R.x,R.z);if(R.team===e.team){!h.resurge&&R.st===Pt&&I<m&&(m=I,y=R),R.st===Me&&I<J.HEAL_R&&R.hp<62&&(g=!0);continue}R.st!==Me||I>J.VIEW||R.bush&&R.revealT<=0&&I>J.BUSH_SEE||(p++,I<d&&(d=I,f=R))}e.hp<62&&(g=!0);let v=e.x,T=e.z,b=0,w=!1;t.face=null;let E=this.carries(e),x=Math.max(1.2,(a.shrinking?a.to:a.r)-2.5);if(u>x&&(a.shrinking||u>a.r-1.5)){let _=Math.max(.5,x*.8);l.type!=="none"&&l.x!=null&&Dt(l.x,l.z,48,48)<x?(v=l.x,T=l.z):(v=48+(e.x-48)/u*_,T=48+(e.z-48)/u*_),w=!0}let M=h.resurge?n.lastLife&&p>1?51:0:32;if(!w&&f&&e.hp<M&&d<7){let _=null,R=14;for(let I=0;I<n.pickups.length;I++){let D=n.pickups[I];if(!D.on)continue;let P=Dt(e.x,e.z,D.x,D.z);P<R&&Dt(f.x,f.z,D.x,D.z)>P&&(R=P,_=D)}if(_)v=_.x,T=_.z;else{let I=Vi(r,gt(e.x+(e.x-f.x)/d*6,4,92),gt(e.z+(e.z-f.z)/d*6,4,92));v=I.x,T=I.z}w=!0}if(!w&&y&&m<16&&(p===0||d>4.5&&e.hp>40)&&(v=y.x,T=y.z,b=.8,w=!0),!w&&h.starPickup&&e.charges<1&&(!f||d>2.6)){let _=this.nearStar(e,10);_&&(v=_.x,T=_.z,w=!0)}if(!w&&f&&n.lastLife&&e.hp<=50&&f.hp>50&&d<5.5){let _=Vi(r,gt(e.x+(e.x-f.x)/(d||1)*4,4,92),gt(e.z+(e.z-f.z)/(d||1)*4,4,92));Dt(_.x,_.z,48,48)<a.r-1.5&&(v=_.x,T=_.z,w=!0)}if(!w&&f){if(d>1.35)v=f.x,T=f.z;else{t.strafeT-=.12,t.strafeT<=0&&(t.strafeT=.6+c()*.9,c()<.5&&(t.strafe=-t.strafe));let _=(f.x-e.x)/(d||1),R=(f.z-e.z)/(d||1);v=e.x-R*t.strafe*1.2+_*.2,T=e.z+_*t.strafe*1.2+R*.2}w=!0}if(!w&&h.powerups){let _=9;for(let R=0;R<n.items.length;R++){let I=n.items[R];if(!I.on)continue;let D=Dt(e.x,e.z,I.x,I.z);D<_&&Dt(I.x,I.z,48,48)<a.r-1&&(_=D,v=I.x,T=I.z,w=!0)}}if(!w&&h.starPickup&&e.charges<=J.SH_MAX-1){let _=this.nearStar(e,5);_&&(v=_.x,T=_.z,w=!0)}if(!w&&e.hp<60){let _=12;for(let R=0;R<n.pickups.length;R++){let I=n.pickups[R];if(!I.on)continue;let D=Dt(e.x,e.z,I.x,I.z);D<_&&Dt(I.x,I.z,48,48)<a.r-1&&(_=D,v=I.x,T=I.z,w=!0)}}if(!w){let _=l.lead;if(_&&_!==e){let R=Dt(e.x,e.z,_.x,_.z),I=Dt(_.x,_.z,48,48)<J.SHRINE_R+1.5;if(l.type==="deliver"&&E&&I)v=48+(e.slot-1)*1.5,T=48+(e.slot===1?1.8:.9),b=.5;else{let D=e.slot===1?1:-1,P=Math.sin(_.f),F=Math.cos(_.f);v=_.x-P*1.5-F*D*1.4,T=_.z-F*1.5+P*D*1.4,b=R<3.2?5:.9}}else l.type==="deliver"?E?(v=48+(e.slot-1)*1.5,T=48+(e.slot===1?1.8:.9),b=.45):(v=48+(e.slot-1)*2.4,T=48+2.4,b=.6):l.type==="hunt"?(v=l.x+(e.slot-1)*.7,T=l.z+(e.slot===1?.6:-.4),b=.3):l.type==="hold"&&(v=48+(e.slot-1)*3,T=52,b=.8)}if(f){let _=Math.atan2(f.x-e.x,f.z-e.z);t.face=_;let R=ra(r,e.x,e.z,f.x,f.z);if(d<J.MELEE_R-.15+h.meleeReach*.6&&e.meleeCd<=0&&t.react<=0)n.act(e.id,"m",_),t.react=h.resurge?J.MELEE_CD*.5+o.react*(.9+c()*.5):o.react*.55+c()*.12;else if(R&&d>2.1&&d<9.5&&e.charges>=1&&t.react<=0){let I=d/J.SH_SPEED,D=f.x+f.vx*I-e.x,P=f.z+f.vz*I-e.z;n.act(e.id,"s",Math.atan2(D,P)+(c()-.5)*2*o.aim),t.react=o.react+c()*.45}if(e.specCd<=0&&e.cls!==1&&d>2&&d<J.SPEC_RANGE&&c()<o.special*.3){let I=e.cls===0?J.FIRE_T:J.SEED_T,D=f.x+f.vx*I*.7+(c()-.5)*o.aim*6,P=f.z+f.vz*I*.7+(c()-.5)*o.aim*6;n.act(e.id,"x",Math.atan2(D-e.x,P-e.z),D,P)}e.dash>=1&&e.rootT<=0&&c()<o.dash*(h.dashMax>1?.3:.14)&&(!h.resurge&&e.hp<30&&d<4.5?n.act(e.id,"d",Math.atan2(e.x-f.x,e.z-f.z)):d>3&&d<6.5&&(h.resurge||e.hp>35)&&R&&n.act(e.id,"d",_))}if(h.dashMax>1&&e.dash>=1&&e.rootT<=0)for(let _=0;_<n.proj.length;_++){let R=n.proj[_];if(R.kind!==0||R.team===e.team)continue;let I=e.x-R.x,D=e.z-R.z,P=Math.sqrt(I*I+D*D);if(P>4.5||P<.6)continue;let F=Math.sqrt(R.vx*R.vx+R.vz*R.vz)||1;if(!((I*R.vx+D*R.vz)/(P*F)<.93)){c()<o.dash*.55&&n.act(e.id,"d",Math.atan2(R.vx,R.vz)+(t.strafe>0?1.57:-1.57));break}}if(e.cls===1&&e.specCd<=0&&g&&c()<.5&&n.act(e.id,"x",e.f,e.x,e.z),t.tx=v,t.tz=T,t.stopAt=b,t.pathT-=.12,Dt(e.x,e.z,v,T)<.2||nh(r,e.x,e.z,v,T)?t.path=null:(!t.path||t.pathT<=0||t.force||Dt(t.gx,t.gz,v,T)>2.5)&&(t.path=this.nav.find(e.x,e.z,v,T),t.pi=0,t.gx=v,t.gz=T,t.pathT=.9+c()*.5,t.force=!1),t.path)for(;t.pi+2<t.path.length&&nh(r,e.x,e.z,t.path[t.pi+2],t.path[t.pi+3]);)t.pi+=2}nearStar(e,t){let n=this.sim.stars,s=null,r=t;for(let o=0;o<n.length;o++){let a=Dt(e.x,e.z,n[o].x,n[o].z);a<r&&Dt(n[o].x,n[o].z,48,48)<this.sim.zone.r-.5&&(r=a,s=n[o])}return s}carries(e){let t=this.sim.scrolls;for(let n=0;n<t.length;n++)if(t[n].carrier===e.id)return!0;return!1}steer(e,t,n){let s=this.sim.ninjas,r=t.tx,o=t.tz;if(t.path){for(;t.pi<t.path.length-2&&Dt(e.x,e.z,t.path[t.pi],t.path[t.pi+1])<.55;)t.pi+=2;t.pi<t.path.length&&(r=t.path[t.pi],o=t.path[t.pi+1])}let a=r-e.x,c=o-e.z,h=Math.sqrt(a*a+c*c);Dt(e.x,e.z,t.tx,t.tz)<Math.max(.12,t.stopAt)||h<.05?(a=0,c=0):(a/=h,c/=h);let u=a!==0||c!==0;for(let p=0;p<s.length;p++){let y=s[p];if(y===e||y.team!==e.team||y.st!==Me)continue;let m=e.x-y.x,g=e.z-y.z,v=m*m+g*g;if(v<.64&&v>1e-4){let T=Math.sqrt(v);a+=m/T*.6,c+=g/T*.6}}t.jit>0&&(t.jit-=n,a+=t.jx,c+=t.jz);let f=Math.sqrt(a*a+c*c);f>1&&(a/=f,c/=f),f<.08&&(a=0,c=0),e.mx=a,e.mz=c;let d=t.face!=null?t.face:a||c?Math.atan2(a,c):e.f;if(e.f+=gt(Is(d,e.f),-12*n,12*n),t.stuckT+=n,t.stuckT>.9){if(u&&Dt(e.x,e.z,t.lastX,t.lastZ)<.3){t.force=!0,t.jit=.45;let p=this.sim.rng()*6.283;t.jx=Math.sin(p)*.9,t.jz=Math.cos(p)*.9}t.lastX=e.x,t.lastZ=e.z,t.stuckT=0}}};var ca=class{constructor(e){this.start=e,this.map=wr(e.seed,e.mode),this.sim=new oa(this.map,e.roster,e),this.bots=new aa(this.sim),this.acc=0,this.snapN=0,this.onSnap=null}advance(e){for(this.acc+=Math.min(e,.25);this.acc>=Cs;)if(this.acc-=Cs,this.bots.update(Cs),this.sim.step(),++this.snapN>=Zf){this.snapN=0;let t=this.sim.snapshot();this.onSnap&&this.onSnap(t)}}input(e,t){let n=this.sim;!t||!n.ninjas[e]||(t[0]==="i"?n.setHuman(e,t[1]/100,t[2]/100,t[3]/100,t[4]):t[0]==="a"&&(n.setHuman(e,t[3]/100,t[4]/100,t[2]/100,1),n.act(e,t[1],t[2]/100,t[5]!=null?t[5]/100:NaN,t[6]!=null?t[6]/100:NaN)))}toBot(e){let t=this.sim.ninjas[e];t&&(t.bot=!0,t.mx=0,t.mz=0)}};function id(i,e,t){return i+Is(e,i)*t}var Cr=class{constructor(e,t,n){this.start=e,this.mode=e.mode===1?1:0;let s=this.R=$n[this.mode];this.map=wr(e.seed,this.mode),this.nTeams=e.teams,this.me=e.you,this.send=t,this.delay=n??.11;let r=e.roster;this.myTeam=r[this.me].team,this.cls=r[this.me].cls,this.snaps=[],this.off=null,this.localT=0,this.lastSnapAt=0;let o=fs(this.map,this.nTeams,r[this.me].team,r[this.me].slot);this.p={x:o.x,z:o.z,f:Math.atan2(48-o.x,48-o.z)},this.cd={melee:0,charges:J.SH_MAX,gap:0,dash:s.dashMax,dashMax:s.dashMax,dgap:0,spec:2.5},this.dashT=0,this.dashA=0,this.lungeT=0,this.lungeD=0,this.aimLock=0,this.sendAcc=0,this.moving=!1,this.farT=0,this.chargeHold=0,this.dashHold=0,this.prevSt=Me,this.myPw=[],this.local={cM:0,cS:0,cX:0,cD:0},this.queue=[];let a=this.map,c=this.nTeams;this.view={phase:0,count:J.COUNTDOWN,time:0,ninjas:r.map(function(h){let l=fs(a,c,h.team,h.slot);return{id:h.id,team:h.team,slot:h.slot,cls:h.cls,name:h.name,bot:!!h.bot,x:l.x,z:l.z,f:Math.atan2(48-l.x,48-l.z),hp:J.HP,st:Me,fl:0,downT:0,revP:0,cM:0,cS:0,cX:0,cH:0,cD:0,kills:0,moving:!1,hidden:!1,pw:[]}}),proj:[],areas:[],scrolls:[],food:255,stars:[],items:[],zone:{r:s.zoneR0,to:s.zoneR0,timer:s.zone[0].wait,shrinking:!1,stage:0,dps:0},deliver:[],events:[],end:null,stale:0,cd:this.cd,mode:this.mode,sealed:!0,lastLife:!1};for(let h=0;h<c;h++)this.view.scrolls.push({id:h,kind:h%2,carrier:h*3,x:0,z:0}),this.view.deliver.push(0)}onSnap(e){let t=e.t/1e3-this.localT;if(this.off=this.off==null?t:Math.max(this.off-.002,t),this.snaps.push(e),this.snaps.length>24&&this.snaps.shift(),e.e&&e.e.length)for(let n=0;n<e.e.length;n++)this.queue.push({t:e.t,e:e.e[n]});this.lastSnapAt=this.localT}autoAim(e,t){let n=this.view,s=this.p,r=null,o=e;for(let a=0;a<n.ninjas.length;a++){let c=n.ninjas[a];if(c.team===this.myTeam||c.st!==Me||c.hidden)continue;let h=c.x-s.x,l=c.z-s.z,u=Math.sqrt(h*h+l*l);u>=o||t&&!ra(this.map,s.x,s.z,c.x,c.z)||(o=u,r=c)}return r}sendAct(e,t,n,s){let r=this.p,o=["a",e,Math.round(t*100),Math.round(r.x*100),Math.round(r.z*100)];n!=null&&o.push(Math.round(n*100),Math.round(s*100)),this.send(o),this.sendAcc=0}frame(e,t){this.localT+=e;let n=this.view,s=this.p,r=this.cd,o=this.map,a=this.R;n.events.length=0;let c=this.snaps.length?this.snaps[this.snaps.length-1]:null;n.stale=this.localT-this.lastSnapAt;let h=Me,l=0;if(c){let S=c.n[this.me];if(h=S[4],l=S[5],n.phase=c.ph,n.count=c.c/10,n.time=c.gt/10,Jo(S[17]||0,this.myPw),r.dashMax=a.dashMax+us(this.myPw,1),this.chargeHold>0?this.chargeHold-=e:(a.starPickup||Math.abs(r.charges-S[13]/10)>.8)&&(r.charges=S[13]/10),this.dashHold>0?this.dashHold-=e:Math.abs(r.dash-S[14]/10)>.35&&(r.dash=S[14]/10),Math.abs(r.spec-S[15]/10)>.7&&(r.spec=S[15]/10),this.prevSt!==Me&&h===Me&&(s.x=S[0]/100,s.z=S[1]/100,s.f=S[2]/100,this.farT=0,r.charges=S[13]/10,r.dash=S[14]/10,this.chargeHold=0,this.dashHold=0),this.prevSt=h,h!==Me)s.x=S[0]/100,s.z=S[1]/100,this.farT=0;else{let _=S[0]/100-s.x,R=S[1]/100-s.z;_*_+R*R>25?(this.farT+=e,this.farT>1.2&&(s.x=S[0]/100,s.z=S[1]/100,this.farT=0)):this.farT=0}}r.melee>0&&(r.melee-=e),r.gap>0&&(r.gap-=e),r.dgap>0&&(r.dgap-=e),r.dash<r.dashMax?r.dash=Math.min(r.dashMax,r.dash+e/a.dashCd):r.dash>r.dashMax&&(r.dash=r.dashMax),r.spec>0&&(r.spec-=e),!a.starPickup&&r.charges<J.SH_MAX&&(r.charges=Math.min(J.SH_MAX,r.charges+e/J.SH_RECH));let u=c&&c.ph===1&&h===Me,f=!1,d=!1;if(u){let S=(l&Rs)!==0;if(t.melee&&r.melee<=0){let D=this.autoAim(J.MELEE_R+1+a.meleeReach,!1),P=D?Math.atan2(D.x-s.x,D.z-s.z):s.f;s.f=P,this.aimLock=.22,r.melee=J.MELEE_CD,S||(this.lungeT=.1,this.lungeD=D?a.lunge:Math.min(a.lunge,.45)*.6),this.local.cM++,this.sendAct("m",P),d=!0}if(t.shuriken&&r.charges>=1&&r.gap<=0){let D=this.autoAim(10.2,!0),P=s.f;if(D){let F=Math.sqrt((D.x-s.x)*(D.x-s.x)+(D.z-s.z)*(D.z-s.z))/J.SH_SPEED;P=Math.atan2(D.x+(D.vx||0)*F-s.x,D.z+(D.vz||0)*F-s.z)}s.f=P,this.aimLock=.18,r.charges-=1,r.gap=.26,this.chargeHold=.45,this.local.cS++,this.sendAct("s",P),d=!0}if(t.dash&&r.dash>=1&&r.dgap<=0&&!S){let D=t.mx||t.mz?Math.atan2(t.mx,t.mz):s.f;this.dashT=J.DASH_T,this.dashA=D,r.dash-=1,r.dgap=.2,this.dashHold=.45,this.local.cD++,this.sendAct("d",D),d=!0}if(t.special&&r.spec<=0){if(r.spec=Gt[this.cls].cd,this.local.cX++,this.cls===1)this.sendAct("x",s.f,s.x,s.z);else{let D=this.autoAim(J.SPEC_RANGE+.5,!1),P,F;D?(P=D.x+(D.vx||0)*.3,F=D.z+(D.vz||0)*.3):(P=s.x+Math.sin(s.f)*5.5,F=s.z+Math.cos(s.f)*5.5);let z=Math.atan2(P-s.x,F-s.z);s.f=z,this.aimLock=.25,this.sendAct("x",z,P,F)}d=!0}let _=a.speed*(1+J.POW_SPEED*us(this.myPw,0))*(l&Ps?J.SLOW_MULT:1),R=t.mx*_,I=t.mz*_;S&&(R=0,I=0),this.dashT>0&&(this.dashT-=e,R=Math.sin(this.dashA)*a.speed*J.DASH_MULT,I=Math.cos(this.dashA)*a.speed*J.DASH_MULT),this.lungeT>0&&!S&&(this.lungeT-=e,R+=Math.sin(s.f)*this.lungeD/.1,I+=Math.cos(s.f)*this.lungeD/.1),(R||I)&&Ds(o,s,R*e,I*e,J.RADIUS),f=t.mx*t.mx+t.mz*t.mz>.02&&!S,this.aimLock>0?this.aimLock-=e:f&&(s.f=id(s.f,Math.atan2(t.mx,t.mz),Math.min(1,e*16)))}else this.dashT=0,this.lungeT=0;if(this.moving=f,this.sendAcc+=e,!d&&this.sendAcc>=1/15&&u&&(this.sendAcc=0,this.send(["i",Math.round(s.x*100),Math.round(s.z*100),Math.round(s.f*100),f?1:0])),!c)return n;let p=(this.localT+this.off-this.delay)*1e3,y=this.snaps,m=y.length-1;for(;m>0&&y[m-1].t>p;)m--;let g=y[m],v=m>0?y[m-1]:g,T=g.t>v.t?gt((p-v.t)/(g.t-v.t),0,1):1,b=Math.max(1,g.t-v.t)/1e3;for(let S=0;S<n.ninjas.length;S++){let _=n.ninjas[S],R=v.n[S],I=g.n[S];if(S===this.me){_.x=s.x,_.z=s.z,_.f=s.f;let D=c.n[S];_.hp=D[3],_.st=D[4],_.fl=D[5],_.downT=D[6]/10,_.revP=D[7]/100,_.cH=D[11],_.kills=D[16],_.cM=this.local.cM,_.cS=this.local.cS,_.cX=this.local.cX,_.cD=this.local.cD,_.moving=f,_.hidden=!1,_.vx=0,_.vz=0,Jo(D[17]||0,_.pw);continue}_.x=(R[0]+(I[0]-R[0])*T)/100,_.z=(R[1]+(I[1]-R[1])*T)/100,_.f=id(R[2]/100,I[2]/100,T),_.vx=(I[0]-R[0])/100/b,_.vz=(I[1]-R[1])/100/b,_.hp=I[3],_.st=I[4],_.fl=I[5],_.downT=I[6]/10,_.revP=I[7]/100,_.cM=I[8],_.cS=I[9],_.cX=I[10],_.cH=I[11],_.cD=I[12],_.kills=I[16],Jo(I[17]||0,_.pw),Math.abs(I[0]-R[0])+Math.abs(I[1]-R[1])>600&&(_.x=I[0]/100,_.z=I[1]/100,_.vx=0,_.vz=0),_.moving=(I[5]&$o)!==0||_.vx*_.vx+_.vz*_.vz>1}let w=!1;for(let S=0;S<n.ninjas.length;S++)n.ninjas[S].team===this.myTeam&&n.ninjas[S].st===Me&&(w=!0);for(let S=0;S<n.ninjas.length;S++){let _=n.ninjas[S];if(_.team===this.myTeam){_.hidden=!1;continue}let R=w&&_.st===Me&&(_.fl&ta)!==0&&(_.fl&ea)===0;if(R)for(let I=0;I<n.ninjas.length;I++){let D=n.ninjas[I];if(D.team!==this.myTeam||D.st!==Me)continue;let P=D.x-_.x,F=D.z-_.z;if(P*P+F*F<J.BUSH_SEE*J.BUSH_SEE){R=!1;break}}_.hidden=R}let E=(p-v.t)/1e3;n.proj.length=0;for(let S=0;S<v.p.length;S++){let _=v.p[S],R=_[9]/100-E;R<-.02||n.proj.push({id:_[0],kind:_[1],x:_[2]/100+_[4]/100*E,z:_[3]/100+_[5]/100*E,team:_[6],tx:_[7]/100,tz:_[8]/100,ttl:R,vx:_[4]/100,vz:_[5]/100,boom:_[10]===1})}n.areas.length=0;for(let S=0;S<g.a.length;S++){let _=g.a[S];n.areas.push({id:_[0],kind:_[1],x:_[2]/100,z:_[3]/100,r:_[4]/100,ttl:_[5]/10,team:_[6]})}for(let S=0;S<n.scrolls.length;S++){let _=g.s[S],R=n.scrolls[S];R.carrier=_[0],_[0]>=0?(R.x=n.ninjas[_[0]].x,R.z=n.ninjas[_[0]].z):(R.x=_[1]/100,R.z=_[2]/100)}n.food=g.h;let x=v.z,M=g.z;n.zone.r=(x[0]+(M[0]-x[0])*T)/10,n.zone.to=M[1]/10,n.zone.timer=M[2]/10,n.zone.shrinking=M[3]===1,n.zone.stage=M[4],n.zone.dps=M[5];for(let S=0;S<n.deliver.length;S++)n.deliver[S]=g.d[S]/100;for(n.stars=g.g||n.stars,n.items=g.it||n.items,n.lastLife=g.ll===1,n.sealed=a.resurge?n.zone.stage<a.openStage:n.zone.stage===0&&!n.zone.shrinking;this.queue.length&&this.queue[0].t<=p+2;){let S=this.queue.shift().e;n.events.push(S),S[0]==="end"&&(n.end={winner:S[1],how:S[2],rank:S[3],stats:S[4],time:S[5]})}return n}};function ih(i,e){let t=!1,n=!1;for(let s=0;s<i.scrolls.length;s++){let r=i.scrolls[s];if(r.carrier<0)continue;let o=i.ninjas[r.carrier];o.team===e&&o.st===Me&&(r.kind===0?t=!0:n=!0)}return{sol:t,luna:n}}function la(i,e,t,n){let s=[],r={};for(let c=0;c<e.length;c++)r[e[c].name]=1;let o=n.slice();for(let c=o.length-1;c>0;c--){let h=Math.floor(t()*(c+1)),l=o[c];o[c]=o[h],o[h]=l}let a=0;for(let c=0;c<i;c++){let h={};for(let l=0;l<e.length;l++)e[l].team===c&&(h[e[l].cls]=1);for(let l=0;l<3;l++){let u=null;for(let p=0;p<e.length;p++)e[p].team===c&&e[p].slot===l&&(u=e[p]);if(u){s.push({id:c*3+l,team:c,slot:l,cls:u.cls,name:u.name,bot:!1,owner:u.owner});continue}let f=0;for(let p=0;p<3;p++){let y=(p+l+c)%3;if(!h[y]){f=y;break}}for(h[f]=1;a<o.length&&r[o[a]];)a++;let d=o[a++%o.length];s.push({id:c*3+l,team:c,slot:l,cls:f,name:d,bot:!0,owner:null})}}return s}var kd=0,zh=1,Bd=2;var xo=1,zd=2,ur=3,ts=0,gn=1,$t=2,xs=0,fr=1,ys=2,Hh=3,Gh=4,vc=5;var vs=100,Hd=101,Gd=102,Vd=103,Wd=104,Xd=200,qd=201,Yd=202,jd=203,Vh=204,Wh=205,Jd=206,Zd=207,$d=208,Kd=209,Qd=210,ep=211,tp=212,np=213,ip=214,Fa=0,ka=1,Ba=2,Zs=3,za=4,Ha=5,$s=6,Ga=7,Sc=0,sp=1,rp=2,_i=0,Xh=1,qh=2,Yh=3,jh=4,Jh=5,Zh=6,$h=7;var Kh=300,Ss=301,dr=302,Mc=303,bc=304,Va=1e3,fi=1001,Wa=1002,Zt=1003,op=1004;var yo=1005;var mn=1006,Tc=1007;var Oi=1008;var Sn=1009,Qh=1010,eu=1011,pr=1012,Ec=1013,si=1014,Yn=1015,ri=1016,Ac=1017,wc=1018,Ms=1020,tu=35902,nu=35899,iu=1021,su=1022,oi=1023,Li=1026,Fi=1027,Cc=1028,Rc=1029,ns=1030,Pc=1031;var Ic=1033,vo=33776,So=33777,Mo=33778,bo=33779,Lc=35840,Dc=35841,Nc=35842,Uc=35843,Oc=36196,Fc=37492,kc=37496,Bc=37488,zc=37489,To=37490,Hc=37491,Gc=37808,Vc=37809,Wc=37810,Xc=37811,qc=37812,Yc=37813,jc=37814,Jc=37815,Zc=37816,$c=37817,Kc=37818,Qc=37819,el=37820,tl=37821,nl=36492,il=36494,sl=36495,rl=36283,ol=36284,Eo=36285,al=36286;var Br=2300,Xa=2301,Ua=2302,Rh=2303,Ph=2400,Ih=2401,Lh=2402;var ap=3200;var cl=0,cp=1,ki="",Cn="srgb",zr="srgb-linear",Hr="linear",ut="srgb";var Oa=7680;var lp=519,hp=512,up=513,fp=514,ru=515,dp=516,pp=517,ou=518,au=519,mp=35044;var cu="300 es",Vn=2e3,Ks=2001;function m0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function g0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Gr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function gp(){let i=Gr("canvas");return i.style.display="block",i}var sd={},Qs=null;function lu(...i){let e="THREE."+i.shift();Qs?Qs("log",e,...i):console.log(e,...i)}function _p(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Be(...i){i=_p(i);let e="THREE."+i.shift();if(Qs)Qs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ve(...i){i=_p(i);let e="THREE."+i.shift();if(Qs)Qs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Or(...i){let e=i.join(" ");e in sd||(sd[e]=!0,Be(...i))}function xp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var yp={[Fa]:Fa,[Ba]:$s,[za]:za,[Zs]:Ha,[ka]:ka,[$s]:Ba,[Ga]:Ga,[Ha]:Zs},di=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var sh=Math.PI/180,qa=180/Math.PI;function mr(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(rn[i&255]+rn[i>>8&255]+rn[i>>16&255]+rn[i>>24&255]+"-"+rn[e&255]+rn[e>>8&255]+"-"+rn[e>>16&15|64]+rn[e>>24&255]+"-"+rn[t&63|128]+rn[t>>8&255]+"-"+rn[t>>16&255]+rn[t>>24&255]+rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]).toLowerCase()}function Ke(i,e,t){return Math.max(e,Math.min(t,i))}function _0(i,e){return(i%e+e)%e}function rh(i,e,t){return(1-t)*i+t*e}function vp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function hu(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function x0(i,e){if(e.constructor===Float32Array)return i;let t=hu(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function y0(i,e){if(e.constructor===Float32Array)return i;let t=hu(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var gu=class gu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};gu.prototype.isVector2=!0;var be=gu,pi=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],h=n[s+1],l=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],p=r[o+2],y=r[o+3];if(u!==y||c!==f||h!==d||l!==p){let m=c*f+h*d+l*p+u*y;m<0&&(f=-f,d=-d,p=-p,y=-y,m=-m);let g=1-a;if(m<.9995){let v=Math.acos(m),T=Math.sin(v);g=Math.sin(g*v)/T,a=Math.sin(a*v)/T,c=c*g+f*a,h=h*g+d*a,l=l*g+p*a,u=u*g+y*a}else{c=c*g+f*a,h=h*g+d*a,l=l*g+p*a,u=u*g+y*a;let v=1/Math.sqrt(c*c+h*h+l*l+u*u);c*=v,h*=v,l*=v,u*=v}}e[t]=c,e[t+1]=h,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],h=n[s+2],l=n[s+3],u=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return e[t]=a*p+l*u+c*d-h*f,e[t+1]=c*p+l*f+h*u-a*d,e[t+2]=h*p+l*d+a*f-c*u,e[t+3]=l*p-a*u-c*f-h*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,h=a(n/2),l=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=f*l*u+h*d*p,this._y=h*d*u-f*l*p,this._z=h*l*p+f*d*u,this._w=h*l*u-f*d*p;break;case"YXZ":this._x=f*l*u+h*d*p,this._y=h*d*u-f*l*p,this._z=h*l*p-f*d*u,this._w=h*l*u+f*d*p;break;case"ZXY":this._x=f*l*u-h*d*p,this._y=h*d*u+f*l*p,this._z=h*l*p+f*d*u,this._w=h*l*u-f*d*p;break;case"ZYX":this._x=f*l*u-h*d*p,this._y=h*d*u+f*l*p,this._z=h*l*p-f*d*u,this._w=h*l*u+f*d*p;break;case"YZX":this._x=f*l*u+h*d*p,this._y=h*d*u+f*l*p,this._z=h*l*p-f*d*u,this._w=h*l*u-f*d*p;break;case"XZY":this._x=f*l*u-h*d*p,this._y=h*d*u-f*l*p,this._z=h*l*p+f*d*u,this._w=h*l*u+f*d*p;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],h=t[2],l=t[6],u=t[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(l-c)*d,this._y=(r-h)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(l-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+h)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-h)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+l)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+h)/d,this._y=(c+l)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,h=t._z,l=t._w;return this._x=n*l+o*a+s*h-r*c,this._y=s*l+o*c+r*a-n*h,this._z=r*l+o*h+n*c-s*a,this._w=o*l-n*a-s*c-r*h,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let h=Math.acos(a),l=Math.sin(h);c=Math.sin(c*h)/l,t=Math.sin(t*h)/l,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},_u=class _u{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,h=2*(o*s-a*n),l=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*h+o*u-a*l,this.y=n+c*l+a*h-r*u,this.z=s+c*u+r*l-o*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return oh.copy(this).projectOnVector(e),this.sub(oh)}reflect(e){return this.sub(oh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};_u.prototype.isVector3=!0;var B=_u,oh=new B,rd=new pi,xu=class xu{constructor(e,t,n,s,r,o,a,c,h){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,h)}set(e,t,n,s,r,o,a,c,h){let l=this.elements;return l[0]=e,l[1]=s,l[2]=a,l[3]=t,l[4]=r,l[5]=c,l[6]=n,l[7]=o,l[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],h=n[1],l=n[4],u=n[7],f=n[2],d=n[5],p=n[8],y=s[0],m=s[3],g=s[6],v=s[1],T=s[4],b=s[7],w=s[2],E=s[5],x=s[8];return r[0]=o*y+a*v+c*w,r[3]=o*m+a*T+c*E,r[6]=o*g+a*b+c*x,r[1]=h*y+l*v+u*w,r[4]=h*m+l*T+u*E,r[7]=h*g+l*b+u*x,r[2]=f*y+d*v+p*w,r[5]=f*m+d*T+p*E,r[8]=f*g+d*b+p*x,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],h=e[7],l=e[8];return t*o*l-t*a*h-n*r*l+n*a*c+s*r*h-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],h=e[7],l=e[8],u=l*o-a*h,f=a*c-l*r,d=h*r-o*c,p=t*u+n*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return e[0]=u*y,e[1]=(s*h-l*n)*y,e[2]=(a*n-s*o)*y,e[3]=f*y,e[4]=(l*t-s*c)*y,e[5]=(s*r-a*t)*y,e[6]=d*y,e[7]=(n*c-h*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),h=Math.sin(r);return this.set(n*c,n*h,-n*(c*o+h*a)+o+e,-s*h,s*c,-s*(-h*o+c*a)+a+t,0,0,1),this}scale(e,t){return Or("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ah.makeScale(e,t)),this}rotate(e){return Or("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ah.makeRotation(-e)),this}translate(e,t){return Or("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ah.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};xu.prototype.isMatrix3=!0;var Xe=xu,ah=new Xe,od=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ad=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function v0(){let i={enabled:!0,workingColorSpace:zr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ut&&(s.r=Ii(s.r),s.g=Ii(s.g),s.b=Ii(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ut&&(s.r=js(s.r),s.g=js(s.g),s.b=js(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ki?Hr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[zr]:{primaries:e,whitePoint:n,transfer:Hr,toXYZ:od,fromXYZ:ad,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Cn},outputColorSpaceConfig:{drawingBufferColorSpace:Cn}},[Cn]:{primaries:e,whitePoint:n,transfer:ut,toXYZ:od,fromXYZ:ad,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Cn}}}),i}var it=v0();function Ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function js(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ns,Ya=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ns===void 0&&(Ns=Gr("canvas")),Ns.width=e.width,Ns.height=e.height;let s=Ns.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ns}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Gr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ii(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ii(t[n]/255)*255):t[n]=Ii(t[n]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},S0=0,er=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:S0++}),this.uuid=mr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ch(s[o].image)):r.push(ch(s[o]))}else r=ch(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function ch(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ya.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}var M0=0,lh=new B,vn=class i extends di{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=fi,s=fi,r=mn,o=Oi,a=oi,c=Sn,h=i.DEFAULT_ANISOTROPY,l=ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=mr(),this.name="",this.source=new er(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=c,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(lh).x}get height(){return this.source.getSize(lh).y}get depth(){return this.source.getSize(lh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Va:e.x=e.x-Math.floor(e.x);break;case fi:e.x=e.x<0?0:1;break;case Wa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Va:e.y=e.y-Math.floor(e.y);break;case fi:e.y=e.y<0?0:1;break;case Wa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=Kh;vn.DEFAULT_ANISOTROPY=1;var yu=class yu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,h=c[0],l=c[4],u=c[8],f=c[1],d=c[5],p=c[9],y=c[2],m=c[6],g=c[10];if(Math.abs(l-f)<.01&&Math.abs(u-y)<.01&&Math.abs(p-m)<.01){if(Math.abs(l+f)<.1&&Math.abs(u+y)<.1&&Math.abs(p+m)<.1&&Math.abs(h+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(h+1)/2,b=(d+1)/2,w=(g+1)/2,E=(l+f)/4,x=(u+y)/4,M=(p+m)/4;return T>b&&T>w?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=E/n,r=x/n):b>w?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=E/s,r=M/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=x/r,s=M/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-p)*(m-p)+(u-y)*(u-y)+(f-l)*(f-l));return Math.abs(v)<.001&&(v=1),this.x=(m-p)/v,this.y=(u-y)/v,this.z=(f-l)/v,this.w=Math.acos((h+d+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};yu.prototype.isVector4=!0;var Tt=yu,ja=class extends di{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new vn({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:mn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new er(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Rn=class extends ja{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Vr=class extends vn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ja=class extends vn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var yc=class yc{constructor(e,t,n,s,r,o,a,c,h,l,u,f,d,p,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,h,l,u,f,d,p,y,m)}set(e,t,n,s,r,o,a,c,h,l,u,f,d,p,y,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=h,g[6]=l,g[10]=u,g[14]=f,g[3]=d,g[7]=p,g[11]=y,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yc().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Us.setFromMatrixColumn(e,0).length(),r=1/Us.setFromMatrixColumn(e,1).length(),o=1/Us.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),h=Math.sin(s),l=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*l,d=o*u,p=a*l,y=a*u;t[0]=c*l,t[4]=-c*u,t[8]=h,t[1]=d+p*h,t[5]=f-y*h,t[9]=-a*c,t[2]=y-f*h,t[6]=p+d*h,t[10]=o*c}else if(e.order==="YXZ"){let f=c*l,d=c*u,p=h*l,y=h*u;t[0]=f+y*a,t[4]=p*a-d,t[8]=o*h,t[1]=o*u,t[5]=o*l,t[9]=-a,t[2]=d*a-p,t[6]=y+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*l,d=c*u,p=h*l,y=h*u;t[0]=f-y*a,t[4]=-o*u,t[8]=p+d*a,t[1]=d+p*a,t[5]=o*l,t[9]=y-f*a,t[2]=-o*h,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*l,d=o*u,p=a*l,y=a*u;t[0]=c*l,t[4]=p*h-d,t[8]=f*h+y,t[1]=c*u,t[5]=y*h+f,t[9]=d*h-p,t[2]=-h,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,d=o*h,p=a*c,y=a*h;t[0]=c*l,t[4]=y-f*u,t[8]=p*u+d,t[1]=u,t[5]=o*l,t[9]=-a*l,t[2]=-h*l,t[6]=d*u+p,t[10]=f-y*u}else if(e.order==="XZY"){let f=o*c,d=o*h,p=a*c,y=a*h;t[0]=c*l,t[4]=-u,t[8]=h*l,t[1]=f*u+y,t[5]=o*l,t[9]=d*u-p,t[2]=p*u-d,t[6]=a*l,t[10]=y*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(b0,e,T0)}lookAt(e,t,n){let s=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),Wi.crossVectors(n,An),Wi.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),Wi.crossVectors(n,An)),Wi.normalize(),ha.crossVectors(An,Wi),s[0]=Wi.x,s[4]=ha.x,s[8]=An.x,s[1]=Wi.y,s[5]=ha.y,s[9]=An.y,s[2]=Wi.z,s[6]=ha.z,s[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],h=n[12],l=n[1],u=n[5],f=n[9],d=n[13],p=n[2],y=n[6],m=n[10],g=n[14],v=n[3],T=n[7],b=n[11],w=n[15],E=s[0],x=s[4],M=s[8],S=s[12],_=s[1],R=s[5],I=s[9],D=s[13],P=s[2],F=s[6],z=s[10],O=s[14],W=s[3],X=s[7],Z=s[11],ee=s[15];return r[0]=o*E+a*_+c*P+h*W,r[4]=o*x+a*R+c*F+h*X,r[8]=o*M+a*I+c*z+h*Z,r[12]=o*S+a*D+c*O+h*ee,r[1]=l*E+u*_+f*P+d*W,r[5]=l*x+u*R+f*F+d*X,r[9]=l*M+u*I+f*z+d*Z,r[13]=l*S+u*D+f*O+d*ee,r[2]=p*E+y*_+m*P+g*W,r[6]=p*x+y*R+m*F+g*X,r[10]=p*M+y*I+m*z+g*Z,r[14]=p*S+y*D+m*O+g*ee,r[3]=v*E+T*_+b*P+w*W,r[7]=v*x+T*R+b*F+w*X,r[11]=v*M+T*I+b*z+w*Z,r[15]=v*S+T*D+b*O+w*ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],h=e[13],l=e[2],u=e[6],f=e[10],d=e[14],p=e[3],y=e[7],m=e[11],g=e[15],v=c*d-h*f,T=a*d-h*u,b=a*f-c*u,w=o*d-h*l,E=o*f-c*l,x=o*u-a*l;return t*(y*v-m*T+g*b)-n*(p*v-m*w+g*E)+s*(p*T-y*w+g*x)-r*(p*b-y*E+m*x)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],c=e[2],h=e[6],l=e[10];return t*(o*l-a*h)-n*(r*l-a*c)+s*(r*h-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],h=e[7],l=e[8],u=e[9],f=e[10],d=e[11],p=e[12],y=e[13],m=e[14],g=e[15],v=t*a-n*o,T=t*c-s*o,b=t*h-r*o,w=n*c-s*a,E=n*h-r*a,x=s*h-r*c,M=l*y-u*p,S=l*m-f*p,_=l*g-d*p,R=u*m-f*y,I=u*g-d*y,D=f*g-d*m,P=v*D-T*I+b*R+w*_-E*S+x*M;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/P;return e[0]=(a*D-c*I+h*R)*F,e[1]=(s*I-n*D-r*R)*F,e[2]=(y*x-m*E+g*w)*F,e[3]=(f*E-u*x-d*w)*F,e[4]=(c*_-o*D-h*S)*F,e[5]=(t*D-s*_+r*S)*F,e[6]=(m*b-p*x-g*T)*F,e[7]=(l*x-f*b+d*T)*F,e[8]=(o*I-a*_+h*M)*F,e[9]=(n*_-t*I-r*M)*F,e[10]=(p*E-y*b+g*v)*F,e[11]=(u*b-l*E-d*v)*F,e[12]=(a*S-o*R-c*M)*F,e[13]=(t*R-n*S+s*M)*F,e[14]=(y*T-p*w-m*v)*F,e[15]=(l*w-u*T+f*v)*F,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,h=r*o,l=r*a;return this.set(h*o+n,h*a-s*c,h*c+s*a,0,h*a+s*c,l*a+n,l*c-s*o,0,h*c-s*a,l*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,h=r+r,l=o+o,u=a+a,f=r*h,d=r*l,p=r*u,y=o*l,m=o*u,g=a*u,v=c*h,T=c*l,b=c*u,w=n.x,E=n.y,x=n.z;return s[0]=(1-(y+g))*w,s[1]=(d+b)*w,s[2]=(p-T)*w,s[3]=0,s[4]=(d-b)*E,s[5]=(1-(f+g))*E,s[6]=(m+v)*E,s[7]=0,s[8]=(p+T)*x,s[9]=(m-v)*x,s[10]=(1-(f+y))*x,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Us.set(s[0],s[1],s[2]).length(),a=Us.set(s[4],s[5],s[6]).length(),c=Us.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Qn.copy(this);let h=1/o,l=1/a,u=1/c;return Qn.elements[0]*=h,Qn.elements[1]*=h,Qn.elements[2]*=h,Qn.elements[4]*=l,Qn.elements[5]*=l,Qn.elements[6]*=l,Qn.elements[8]*=u,Qn.elements[9]*=u,Qn.elements[10]*=u,t.setFromRotationMatrix(Qn),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,s,r,o,a=Vn,c=!1){let h=this.elements,l=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s),p,y;if(c)p=r/(o-r),y=o*r/(o-r);else if(a===Vn)p=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Ks)p=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return h[0]=l,h[4]=0,h[8]=f,h[12]=0,h[1]=0,h[5]=u,h[9]=d,h[13]=0,h[2]=0,h[6]=0,h[10]=p,h[14]=y,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Vn,c=!1){let h=this.elements,l=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s),p,y;if(c)p=1/(o-r),y=o/(o-r);else if(a===Vn)p=-2/(o-r),y=-(o+r)/(o-r);else if(a===Ks)p=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return h[0]=l,h[4]=0,h[8]=0,h[12]=f,h[1]=0,h[5]=u,h[9]=0,h[13]=d,h[2]=0,h[6]=0,h[10]=p,h[14]=y,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};yc.prototype.isMatrix4=!0;var lt=yc,Us=new B,Qn=new lt,b0=new B(0,0,0),T0=new B(1,1,1),Wi=new B,ha=new B,An=new B,cd=new lt,ld=new pi,ii=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],h=s[5],l=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-l,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(Ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,h),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-l,d),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ld.setFromEuler(this),this.setFromQuaternion(ld,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ii.DEFAULT_ORDER="XYZ";var Wr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},E0=0,hd=new B,Os=new pi,Ai=new lt,ua=new B,Rr=new B,A0=new B,w0=new pi,ud=new B(1,0,0),fd=new B(0,1,0),dd=new B(0,0,1),pd={type:"added"},C0={type:"removed"},Fs={type:"childadded",child:null},hh={type:"childremoved",child:null},Ot=class i extends di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:E0++}),this.uuid=mr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new B,t=new ii,n=new pi,s=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new lt},normalMatrix:{value:new Xe}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.multiply(Os),this}rotateOnWorldAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.premultiply(Os),this}rotateX(e){return this.rotateOnAxis(ud,e)}rotateY(e){return this.rotateOnAxis(fd,e)}rotateZ(e){return this.rotateOnAxis(dd,e)}translateOnAxis(e,t){return hd.copy(e).applyQuaternion(this.quaternion),this.position.add(hd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ud,e)}translateY(e){return this.translateOnAxis(fd,e)}translateZ(e){return this.translateOnAxis(dd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ai.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ua.copy(e):ua.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ai.lookAt(Rr,ua,this.up):Ai.lookAt(ua,Rr,this.up),this.quaternion.setFromRotationMatrix(Ai),s&&(Ai.extractRotation(s.matrixWorld),Os.setFromRotationMatrix(Ai),this.quaternion.premultiply(Os.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ve("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pd),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null):Ve("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(C0),hh.child=e,this.dispatchEvent(hh),hh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pd),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rr,e,A0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rr,w0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let h=0,l=c.length;h<l;h++){let u=c[h];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,h=this.material.length;c<h;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),h=o(e.textures),l=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),h.length>0&&(n.textures=h),l.length>0&&(n.images=l),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){let c=[];for(let h in a){let l=a[h];delete l.metadata,c.push(l)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ot.DEFAULT_UP=new B(0,1,0);Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var yn=class extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}},R0={type:"move"},tr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){o=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),g=this._getHandJoint(h,y);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let l=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],f=l.position.distanceTo(u.position),d=.02,p=.005;h.inputState.pinching&&f>d+p?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&f<=d-p&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(R0)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new yn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Sp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},fa={h:0,s:0,l:0};function uh(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var We=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=_0(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=uh(o,r,e+1/3),this.g=uh(o,r,e),this.b=uh(o,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=Cn){function n(r){r!==void 0&&parseFloat(r)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Cn){let n=Sp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ii(e.r),this.g=Ii(e.g),this.b=Ii(e.b),this}copyLinearToSRGB(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Cn){return it.workingToColorSpace(on.copy(this),e),Math.round(Ke(on.r*255,0,255))*65536+Math.round(Ke(on.g*255,0,255))*256+Math.round(Ke(on.b*255,0,255))}getHexString(e=Cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(on.copy(this),t);let n=on.r,s=on.g,r=on.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,h,l=(a+o)/2;if(a===o)c=0,h=0;else{let u=o-a;switch(h=l<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=h,e.l=l,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=Cn){it.workingToColorSpace(on.copy(this),e);let t=on.r,n=on.g,s=on.b;return e!==Cn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Xi),this.setHSL(Xi.h+e,Xi.s+t,Xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xi),e.getHSL(fa);let n=rh(Xi.h,fa.h,t),s=rh(Xi.s,fa.s,t),r=rh(Xi.l,fa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},on=new We;We.NAMES=Sp;var Xr=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new We(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},qr=class extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ei=new B,wi=new B,fh=new B,Ci=new B,ks=new B,Bs=new B,md=new B,dh=new B,ph=new B,mh=new B,gh=new Tt,_h=new Tt,xh=new Tt,Ji=class i{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ei.subVectors(e,t),s.cross(ei);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ei.subVectors(s,t),wi.subVectors(n,t),fh.subVectors(e,t);let o=ei.dot(ei),a=ei.dot(wi),c=ei.dot(fh),h=wi.dot(wi),l=wi.dot(fh),u=o*h-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(h*c-a*l)*f,p=(o*l-a*c)*f;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Ci)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ci.x),c.addScaledVector(o,Ci.y),c.addScaledVector(a,Ci.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return gh.setScalar(0),_h.setScalar(0),xh.setScalar(0),gh.fromBufferAttribute(e,t),_h.fromBufferAttribute(e,n),xh.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(gh,r.x),o.addScaledVector(_h,r.y),o.addScaledVector(xh,r.z),o}static isFrontFacing(e,t,n,s){return ei.subVectors(n,t),wi.subVectors(e,t),ei.cross(wi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ei.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),ei.cross(wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;ks.subVectors(s,n),Bs.subVectors(r,n),dh.subVectors(e,n);let c=ks.dot(dh),h=Bs.dot(dh);if(c<=0&&h<=0)return t.copy(n);ph.subVectors(e,s);let l=ks.dot(ph),u=Bs.dot(ph);if(l>=0&&u<=l)return t.copy(s);let f=c*u-l*h;if(f<=0&&c>=0&&l<=0&&c-l>0)return o=c/(c-l),t.copy(n).addScaledVector(ks,o);mh.subVectors(e,r);let d=ks.dot(mh),p=Bs.dot(mh);if(p>=0&&d<=p)return t.copy(r);let y=d*h-c*p;if(y<=0&&h>=0&&p<=0)return a=h/(h-p),t.copy(n).addScaledVector(Bs,a);let m=l*p-d*u;if(m<=0&&u-l>=0&&d-p>=0)return md.subVectors(r,s),a=(u-l)/(u-l+(d-p)),t.copy(s).addScaledVector(md,a);let g=1/(m+y+f);return o=y*g,a=f*g,t.copy(n).addScaledVector(ks,o).addScaledVector(Bs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},mi=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ti):ti.fromBufferAttribute(r,o),ti.applyMatrix4(e.matrixWorld),this.expandByPoint(ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),da.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),da.copy(n.boundingBox)),da.applyMatrix4(e.matrixWorld),this.union(da)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ti),ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Pr),pa.subVectors(this.max,Pr),zs.subVectors(e.a,Pr),Hs.subVectors(e.b,Pr),Gs.subVectors(e.c,Pr),qi.subVectors(Hs,zs),Yi.subVectors(Gs,Hs),ds.subVectors(zs,Gs);let t=[0,-qi.z,qi.y,0,-Yi.z,Yi.y,0,-ds.z,ds.y,qi.z,0,-qi.x,Yi.z,0,-Yi.x,ds.z,0,-ds.x,-qi.y,qi.x,0,-Yi.y,Yi.x,0,-ds.y,ds.x,0];return!yh(t,zs,Hs,Gs,pa)||(t=[1,0,0,0,1,0,0,0,1],!yh(t,zs,Hs,Gs,pa))?!1:(ma.crossVectors(qi,Yi),t=[ma.x,ma.y,ma.z],yh(t,zs,Hs,Gs,pa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ri=[new B,new B,new B,new B,new B,new B,new B,new B],ti=new B,da=new mi,zs=new B,Hs=new B,Gs=new B,qi=new B,Yi=new B,ds=new B,Pr=new B,pa=new B,ma=new B,ps=new B;function yh(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ps.fromArray(i,r);let a=s.x*Math.abs(ps.x)+s.y*Math.abs(ps.y)+s.z*Math.abs(ps.z),c=e.dot(ps),h=t.dot(ps),l=n.dot(ps);if(Math.max(-Math.max(c,h,l),Math.min(c,h,l))>a)return!1}return!0}var Nt=new B,ga=new be,P0=0,Ut=class extends di{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:P0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=mp,this.updateRanges=[],this.gpuType=Yn,this.version=0,this._normalizationScale=e!==void 0?hu(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ga.fromBufferAttribute(this,t),ga.applyMatrix3(e),this.setXY(t,ga.x,ga.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):x0(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):y0(e,this.array)}};var Yr=class extends Ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var jr=class extends Ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ot=class extends Ut{constructor(e,t,n){super(new Float32Array(e),t,n)}},I0=new mi,Ir=new B,vh=new B,Di=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):I0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ir.subVectors(e,this.center);let t=Ir.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ir,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ir.copy(e.center).add(vh)),this.expandByPoint(Ir.copy(e.center).sub(vh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},L0=0,Gn=new lt,Sh=new Ot,Vs=new B,wn=new mi,Lr=new mi,Jt=new B,It=class i extends di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:L0++}),this.uuid=mr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(m0(e)?jr:Yr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Xe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Gn.makeRotationFromQuaternion(e),this.applyMatrix4(Gn),this}rotateX(e){return Gn.makeRotationX(e),this.applyMatrix4(Gn),this}rotateY(e){return Gn.makeRotationY(e),this.applyMatrix4(Gn),this}rotateZ(e){return Gn.makeRotationZ(e),this.applyMatrix4(Gn),this}translate(e,t,n){return Gn.makeTranslation(e,t,n),this.applyMatrix4(Gn),this}scale(e,t,n){return Gn.makeScale(e,t,n),this.applyMatrix4(Gn),this}lookAt(e){return Sh.lookAt(e),Sh.updateMatrix(),this.applyMatrix4(Sh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ot(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];wn.setFromBufferAttribute(r),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ve('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Di);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(wn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Lr.setFromBufferAttribute(a),this.morphTargetsRelative?(Jt.addVectors(wn.min,Lr.min),wn.expandByPoint(Jt),Jt.addVectors(wn.max,Lr.max),wn.expandByPoint(Jt)):(wn.expandByPoint(Lr.min),wn.expandByPoint(Lr.max))}wn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Jt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Jt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let h=0,l=a.count;h<l;h++)Jt.fromBufferAttribute(a,h),c&&(Vs.fromBufferAttribute(e,h),Jt.add(Vs)),s=Math.max(s,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ve('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ve("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Ut(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[],h=new Uint8Array(n.count);for(let S=0;S<n.count;S++)a[S]=new B,c[S]=new B;let l=new B,u=new B,f=new B,d=new be,p=new be,y=new be,m=new B,g=new B;function v(S,_,R){h[S]=h[_]=h[R]=1,l.fromBufferAttribute(n,S),u.fromBufferAttribute(n,_),f.fromBufferAttribute(n,R),d.fromBufferAttribute(r,S),p.fromBufferAttribute(r,_),y.fromBufferAttribute(r,R),u.sub(l),f.sub(l),p.sub(d),y.sub(d);let I=1/(p.x*y.y-y.x*p.y);isFinite(I)&&(m.copy(u).multiplyScalar(y.y).addScaledVector(f,-p.y).multiplyScalar(I),g.copy(f).multiplyScalar(p.x).addScaledVector(u,-y.x).multiplyScalar(I),a[S].add(m),a[_].add(m),a[R].add(m),c[S].add(g),c[_].add(g),c[R].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let S=0,_=T.length;S<_;++S){let R=T[S],I=R.start,D=R.count;for(let P=I,F=I+D;P<F;P+=3)v(e.getX(P+0),e.getX(P+1),e.getX(P+2))}let b=new B,w=new B,E=new B,x=new B;function M(S){E.fromBufferAttribute(s,S),x.copy(E);let _=a[S];b.copy(_),b.sub(E.multiplyScalar(E.dot(_))).normalize(),w.crossVectors(x,_);let I=w.dot(c[S])<0?-1:1;o.setXYZW(S,b.x,b.y,b.z,I)}for(let S=0,_=n.count;S<_;++S)h[S]&&M(S);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new B,r=new B,o=new B,a=new B,c=new B,h=new B,l=new B,u=new B;if(e)for(let f=0,d=e.count;f<d;f+=3){let p=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),l.subVectors(o,r),u.subVectors(s,r),l.cross(u),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,y),h.fromBufferAttribute(n,m),a.add(l),c.add(l),h.add(l),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),l.subVectors(o,r),u.subVectors(s,r),l.cross(u),n.setXYZ(f+0,l.x,l.y,l.z),n.setXYZ(f+1,l.x,l.y,l.z),n.setXYZ(f+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(a,c){let h=a.array,l=a.itemSize,u=a.normalized,f=new h.constructor(c.length*l),d=0,p=0;for(let y=0,m=c.length;y<m;y++){a.isInterleavedBufferAttribute?d=c[y]*a.data.stride+a.offset:d=c[y]*l;for(let g=0;g<l;g++)f[p++]=h[d++]}return new Ut(f,l,u)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],h=e(c,n);t.setAttribute(a,h)}let r=this.morphAttributes;for(let a in r){let c=[],h=r[a];for(let l=0,u=h.length;l<u;l++){let f=h[l],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let h=o[a];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let h in c)c[h]!==void 0&&(e[h]=c[h]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let h=n[c];e.data.attributes[c]=h.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let h=this.morphAttributes[c],l=[];for(let u=0,f=h.length;u<f;u++){let d=h[u];l.push(d.toJSON(e.data))}l.length>0&&(s[c]=l,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let h in s){let l=s[h];this.setAttribute(h,l.clone(t))}let r=e.morphAttributes;for(let h in r){let l=[],u=r[h];for(let f=0,d=u.length;f<d;f++)l.push(u[f].clone(t));this.morphAttributes[h]=l}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let h=0,l=o.length;h<l;h++){let u=o[h];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Mh=new B,D0=new B,N0=new Xe,ni=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Mh.subVectors(n,t).cross(D0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Mh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||N0.getNormalMatrix(e),s=this.coplanarPoint(Mh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},U0=0,Ni=class extends di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:U0++}),this.uuid=mr(),this.name="",this.type="Material",this.blending=fr,this.side=ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vh,this.blendDst=Wh,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=Zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oa,this.stencilZFail=Oa,this.stencilZPass=Oa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new We().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ni().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new be().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new be().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Pi=new B,bh=new B,_a=new B,xa=new B,Jr=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,t),Pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){bh.copy(e).add(t).multiplyScalar(.5),_a.copy(t).sub(e).normalize(),xa.copy(this.origin).sub(bh);let r=e.distanceTo(t)*.5,o=-this.direction.dot(_a),a=xa.dot(this.direction),c=-xa.dot(_a),h=xa.lengthSq(),l=Math.abs(1-o*o),u,f,d,p;if(l>0)if(u=o*c-a,f=o*a-c,p=r*l,u>=0)if(f>=-p)if(f<=p){let y=1/l;u*=y,f*=y,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+h}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+h;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+h;else f<=-p?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+h):f<=p?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+h):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+h);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(bh).addScaledVector(_a,f),d}intersectSphere(e,t){if(e.radius<0)return null;Pi.subVectors(e.center,this.origin);let n=Pi.dot(this.direction),s=Pi.dot(Pi)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,h=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,f=this.origin;return h>=0?(n=(e.min.x-f.x)*h,s=(e.max.x-f.x)*h):(n=(e.max.x-f.x)*h,s=(e.min.x-f.x)*h),l>=0?(r=(e.min.y-f.y)*l,o=(e.max.y-f.y)*l):(r=(e.max.y-f.y)*l,o=(e.min.y-f.y)*l),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,c=a.x,h=a.y,l=a.z,u=e.x-o.x,f=e.y-o.y,d=e.z-o.z,p=t.x-o.x,y=t.y-o.y,m=t.z-o.z,g=n.x-o.x,v=n.y-o.y,T=n.z-o.z,b=Math.abs(c),w=Math.abs(h),E=Math.abs(l),x,M,S,_,R,I,D,P,F,z,O,W;if(b>=w&&b>=E?(S=c,I=u,F=p,W=g,c>=0?(x=h,M=l,_=f,R=d,D=y,P=m,z=v,O=T):(x=l,M=h,_=d,R=f,D=m,P=y,z=T,O=v)):w>=E?(S=h,I=f,F=y,W=v,h>=0?(x=l,M=c,_=d,R=u,D=m,P=p,z=T,O=g):(x=c,M=l,_=u,R=d,D=p,P=m,z=g,O=T)):(S=l,I=d,F=m,W=T,l>=0?(x=c,M=h,_=u,R=f,D=p,P=y,z=g,O=v):(x=h,M=c,_=f,R=u,D=y,P=p,z=v,O=g)),S===0)return null;let X=x/S,Z=M/S,ee=1/S,_e=_-X*I,Le=R-Z*I,Y=D-X*F,se=P-Z*F,ve=z-X*W,De=O-Z*W,de=ve*se-De*Y,Ge=_e*De-Le*ve,xt=Y*Le-se*_e;if(s){if(de<0||Ge<0||xt<0)return null}else if((de<0||Ge<0||xt<0)&&(de>0||Ge>0||xt>0))return null;let Fe=de+Ge+xt;if(Fe===0)return null;let Qe=ee*(de*I+Ge*F+xt*W);return(Fe>0?Qe<0:Qe>0)?null:this.at(Qe/Fe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},vt=class extends Ni{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=Sc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},gd=new lt,ms=new Jr,ya=new Di,_d=new B,va=new B,Sa=new B,Ma=new B,Th=new B,ba=new B,xd=new B,Ta=new B,ze=class extends Ot{constructor(e=new It,t=new vt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){ba.set(0,0,0);for(let c=0,h=r.length;c<h;c++){let l=a[c],u=r[c];l!==0&&(Th.fromBufferAttribute(u,e),o?ba.addScaledVector(Th,l):ba.addScaledVector(Th.sub(t),l))}t.add(ba)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ya.copy(n.boundingSphere),ya.applyMatrix4(r),ms.copy(e.ray).recast(e.near),!(ya.containsPoint(ms.origin)===!1&&(ms.intersectSphere(ya,_d)===null||ms.origin.distanceToSquared(_d)>(e.far-e.near)**2))&&(gd.copy(r).invert(),ms.copy(e.ray).applyMatrix4(gd),!(n.boundingBox!==null&&ms.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ms)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,h=r.attributes.uv,l=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,y=f.length;p<y;p++){let m=f[p],g=o[m.materialIndex],v=Math.max(m.start,d.start),T=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let b=v,w=T;b<w;b+=3){let E=a.getX(b),x=a.getX(b+1),M=a.getX(b+2);s=Ea(this,g,e,n,h,l,u,E,x,M),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),y=Math.min(a.count,d.start+d.count);for(let m=p,g=y;m<g;m+=3){let v=a.getX(m),T=a.getX(m+1),b=a.getX(m+2);s=Ea(this,o,e,n,h,l,u,v,T,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,y=f.length;p<y;p++){let m=f[p],g=o[m.materialIndex],v=Math.max(m.start,d.start),T=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let b=v,w=T;b<w;b+=3){let E=b,x=b+1,M=b+2;s=Ea(this,g,e,n,h,l,u,E,x,M),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),y=Math.min(c.count,d.start+d.count);for(let m=p,g=y;m<g;m+=3){let v=m,T=m+1,b=m+2;s=Ea(this,o,e,n,h,l,u,v,T,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function O0(i,e,t,n,s,r,o,a){let c;if(e.side===gn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===ts,a),c===null)return null;Ta.copy(a),Ta.applyMatrix4(i.matrixWorld);let h=t.ray.origin.distanceTo(Ta);return h<t.near||h>t.far?null:{distance:h,point:Ta.clone(),object:i}}function Ea(i,e,t,n,s,r,o,a,c,h){i.getVertexPosition(a,va),i.getVertexPosition(c,Sa),i.getVertexPosition(h,Ma);let l=O0(i,e,t,n,va,Sa,Ma,xd);if(l){let u=new B;Ji.getBarycoord(xd,va,Sa,Ma,u),s&&(l.uv=Ji.getInterpolatedAttribute(s,a,c,h,u,new be)),r&&(l.uv1=Ji.getInterpolatedAttribute(r,a,c,h,u,new be)),o&&(l.normal=Ji.getInterpolatedAttribute(o,a,c,h,u,new B),l.normal.dot(n.direction)>0&&l.normal.multiplyScalar(-1));let f={a,b:c,c:h,normal:new B,materialIndex:0};Ji.getNormal(va,Sa,Ma,f.normal),l.face=f,l.barycoord=u}return l}var Zr=class extends vn{constructor(e=null,t=1,n=1,s,r,o,a,c,h=Zt,l=Zt,u,f){super(null,o,a,c,h,l,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var nr=class extends Ut{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ws=new lt,yd=new lt,Aa=[],vd=new mi,F0=new lt,Dr=new ze,Nr=new Di,ir=class extends ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new nr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,F0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new mi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ws),vd.copy(e.boundingBox).applyMatrix4(Ws),this.boundingBox.union(vd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Di),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ws),Nr.copy(e.boundingSphere).applyMatrix4(Ws),this.boundingSphere.union(Nr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Dr.geometry=this.geometry,Dr.material=this.material,Dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Nr.copy(this.boundingSphere),Nr.applyMatrix4(n),e.ray.intersectsSphere(Nr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ws),yd.multiplyMatrices(n,Ws),Dr.matrixWorld=yd,Dr.raycast(e,Aa);for(let o=0,a=Aa.length;o<a;o++){let c=Aa[o];c.instanceId=r,c.object=this,t.push(c)}Aa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new nr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Zr(new Float32Array(s*this.count),s,this.count,Cc,Yn));let r=this.morphTexture.source.data.data,o=0;for(let h=0;h<n.length;h++)o+=n[h];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},gs=new Di,k0=new be(.5,.5),wa=new B,Zi=class{constructor(e=new ni,t=new ni,n=new ni,s=new ni,r=new ni,o=new ni){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Vn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],h=r[3],l=r[4],u=r[5],f=r[6],d=r[7],p=r[8],y=r[9],m=r[10],g=r[11],v=r[12],T=r[13],b=r[14],w=r[15];if(s[0].setComponents(h-o,d-l,g-p,w-v).normalize(),s[1].setComponents(h+o,d+l,g+p,w+v).normalize(),s[2].setComponents(h+a,d+u,g+y,w+T).normalize(),s[3].setComponents(h-a,d-u,g-y,w-T).normalize(),n)s[4].setComponents(c,f,m,b).normalize(),s[5].setComponents(h-c,d-f,g-m,w-b).normalize();else if(s[4].setComponents(h-c,d-f,g-m,w-b).normalize(),t===Vn)s[5].setComponents(h+c,d+f,g+m,w+b).normalize();else if(t===Ks)s[5].setComponents(c,f,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gs)}intersectsSprite(e){gs.center.set(0,0,0);let t=k0.distanceTo(e.center);return gs.radius=.7071067811865476+t,gs.applyMatrix4(e.matrixWorld),this.intersectsSphere(gs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(wa.x=s.normal.x>0?e.max.x:e.min.x,wa.y=s.normal.y>0?e.max.y:e.min.y,wa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(wa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Sd=new lt,Za=class i{constructor(){this.coordinateSystem=Vn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Sd.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Zi),n[s].setFromProjectionMatrix(Sd,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Zi),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var $a=class extends Ni{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Md=new lt,Dh=new Jr,Ca=new Di,Ra=new B,$r=class extends Ot{constructor(e=new It,t=new $a){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ca.copy(n.boundingSphere),Ca.applyMatrix4(s),Ca.radius+=r,e.ray.intersectsSphere(Ca)===!1)return;Md.copy(s).invert(),Dh.copy(e.ray).applyMatrix4(Md);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let p=f,y=d;p<y;p++){let m=h.getX(p);Ra.fromBufferAttribute(u,m),bd(Ra,m,c,s,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let p=f,y=d;p<y;p++)Ra.fromBufferAttribute(u,p),bd(Ra,p,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function bd(i,e,t,n,s,r,o){let a=Dh.distanceSqToPoint(i);if(a<t){let c=new B;Dh.closestPointToPoint(i,c),c.applyMatrix4(n);let h=s.ray.origin.distanceTo(c);if(h<s.near||h>s.far)return;r.push({distance:h,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Kr=class extends vn{constructor(e=[],t=Ss,n,s,r,o,a,c,h,l){super(e,t,n,s,r,o,a,c,h,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Ui=class extends vn{constructor(e,t,n=si,s,r,o,a=Zt,c=Zt,h,l=Li,u=1){if(l!==Li&&l!==Fi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,o,a,c,l,n,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new er(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Qr=class extends Ui{constructor(e,t=si,n=Ss,s,r,o=Zt,a=Zt,c,h=Li){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,s,r,o,a,c,h),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},eo=class extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ht=class i extends It{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],h=[],l=[],u=[],f=0,d=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,s,o,2),p("x","z","y",1,-1,e,n,-t,s,o,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ot(h,3)),this.setAttribute("normal",new ot(l,3)),this.setAttribute("uv",new ot(u,2));function p(y,m,g,v,T,b,w,E,x,M,S){let _=b/x,R=w/M,I=b/2,D=w/2,P=E/2,F=x+1,z=M+1,O=0,W=0,X=new B;for(let Z=0;Z<z;Z++){let ee=Z*R-D;for(let _e=0;_e<F;_e++){let Le=_e*_-I;X[y]=Le*v,X[m]=ee*T,X[g]=P,h.push(X.x,X.y,X.z),X[y]=0,X[m]=0,X[g]=E>0?1:-1,l.push(X.x,X.y,X.z),u.push(_e/x),u.push(1-Z/M),O+=1}}for(let Z=0;Z<M;Z++)for(let ee=0;ee<x;ee++){let _e=f+ee+F*Z,Le=f+ee+F*(Z+1),Y=f+(ee+1)+F*(Z+1),se=f+(ee+1)+F*Z;c.push(_e,Le,se),c.push(Le,Y,se),W+=6}a.addGroup(d,W,S),d+=W,f+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var sr=class i extends It{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],h=new B,l=new be;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let d=n+u/t*s;h.x=e*Math.cos(d),h.y=e*Math.sin(d),o.push(h.x,h.y,h.z),a.push(0,0,1),l.x=(o[f]/e+1)/2,l.y=(o[f+1]/e+1)/2,c.push(l.x,l.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ot(o,3)),this.setAttribute("normal",new ot(a,3)),this.setAttribute("uv",new ot(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Rt=class i extends It{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let h=this;s=Math.floor(s),r=Math.floor(r);let l=[],u=[],f=[],d=[],p=0,y=[],m=n/2,g=0;v(),o===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(l),this.setAttribute("position",new ot(u,3)),this.setAttribute("normal",new ot(f,3)),this.setAttribute("uv",new ot(d,2));function v(){let b=new B,w=new B,E=0,x=(t-e)/n;for(let M=0;M<=r;M++){let S=[],_=M/r,R=_*(t-e)+e;for(let I=0;I<=s;I++){let D=I/s,P=D*c+a,F=Math.sin(P),z=Math.cos(P);w.x=R*F,w.y=-_*n+m,w.z=R*z,u.push(w.x,w.y,w.z),b.set(F,x,z).normalize(),f.push(b.x,b.y,b.z),d.push(D,1-_),S.push(p++)}y.push(S)}for(let M=0;M<s;M++)for(let S=0;S<r;S++){let _=y[S][M],R=y[S+1][M],I=y[S+1][M+1],D=y[S][M+1];(e>0||S!==0)&&(l.push(_,R,D),E+=3),(t>0||S!==r-1)&&(l.push(R,I,D),E+=3)}h.addGroup(g,E,0),g+=E}function T(b){let w=p,E=new be,x=new B,M=0,S=b===!0?e:t,_=b===!0?1:-1;for(let I=1;I<=s;I++)u.push(0,m*_,0),f.push(0,_,0),d.push(.5,.5),p++;let R=p;for(let I=0;I<=s;I++){let P=I/s*c+a,F=Math.cos(P),z=Math.sin(P);x.x=S*z,x.y=m*_,x.z=S*F,u.push(x.x,x.y,x.z),f.push(0,_,0),E.x=F*.5+.5,E.y=z*.5*_+.5,d.push(E.x,E.y),p++}for(let I=0;I<s;I++){let D=w+I,P=R+I;b===!0?l.push(P,P+1,D):l.push(P+1,P,D),M+=3}h.addGroup(g,M,b===!0?1:2),g+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Wn=class i extends Rt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},rr=class i extends It{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),h(n),l(),this.setAttribute("position",new ot(r,3)),this.setAttribute("normal",new ot(r.slice(),3)),this.setAttribute("uv",new ot(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let T=new B,b=new B,w=new B;for(let E=0;E<t.length;E+=3)d(t[E+0],T),d(t[E+1],b),d(t[E+2],w),c(T,b,w,v)}function c(v,T,b,w){let E=w+1,x=[];for(let M=0;M<=E;M++){x[M]=[];let S=v.clone().lerp(b,M/E),_=T.clone().lerp(b,M/E),R=E-M;for(let I=0;I<=R;I++)I===0&&M===E?x[M][I]=S:x[M][I]=S.clone().lerp(_,I/R)}for(let M=0;M<E;M++)for(let S=0;S<2*(E-M)-1;S++){let _=Math.floor(S/2);S%2===0?(f(x[M][_+1]),f(x[M+1][_]),f(x[M][_])):(f(x[M][_+1]),f(x[M+1][_+1]),f(x[M+1][_]))}}function h(v){let T=new B;for(let b=0;b<r.length;b+=3)T.x=r[b+0],T.y=r[b+1],T.z=r[b+2],T.normalize().multiplyScalar(v),r[b+0]=T.x,r[b+1]=T.y,r[b+2]=T.z}function l(){let v=new B;for(let T=0;T<r.length;T+=3){v.x=r[T+0],v.y=r[T+1],v.z=r[T+2];let b=m(v)/2/Math.PI+.5,w=g(v)/Math.PI+.5;o.push(b,1-w)}p(),u()}function u(){for(let v=0;v<o.length;v+=6){let T=o[v+0],b=o[v+2],w=o[v+4],E=Math.max(T,b,w),x=Math.min(T,b,w);E>.9&&x<.1&&(T<.2&&(o[v+0]+=1),b<.2&&(o[v+2]+=1),w<.2&&(o[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function d(v,T){let b=v*3;T.x=e[b+0],T.y=e[b+1],T.z=e[b+2]}function p(){let v=new B,T=new B,b=new B,w=new B,E=new be,x=new be,M=new be;for(let S=0,_=0;S<r.length;S+=9,_+=6){v.set(r[S+0],r[S+1],r[S+2]),T.set(r[S+3],r[S+4],r[S+5]),b.set(r[S+6],r[S+7],r[S+8]),E.set(o[_+0],o[_+1]),x.set(o[_+2],o[_+3]),M.set(o[_+4],o[_+5]),w.copy(v).add(T).add(b).divideScalar(3);let R=m(w);y(E,_+0,v,R),y(x,_+2,T,R),y(M,_+4,b,R)}}function y(v,T,b,w){w<0&&v.x===1&&(o[T]=v.x-1),b.x===0&&b.z===0&&(o[T]=w/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function g(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},or=class i extends rr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Pn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Be("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,h;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),h=n[s]-o,h<0)a=s+1;else if(h>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let l=n[s],f=n[s+1]-l,d=(o-l)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new be:new B);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new B,s=[],r=[],o=[],a=new B,c=new lt;for(let d=0;d<=e;d++){let p=d/e;s[d]=this.getTangentAt(p,new B)}r[0]=new B,o[0]=new B;let h=Number.MAX_VALUE,l=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);l<=h&&(h=l,n.set(1,0,0)),u<=h&&(h=u,n.set(0,1,0)),f<=h&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(Ke(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,p))}o[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(Ke(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},ar=class extends Pn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new be){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),h=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let l=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=h-this.aY;c=f*l-d*u+this.aX,h=f*u+d*l+this.aY}return n.set(c,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ka=class extends ar{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function uu(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,h){s(o,a,h*(a-r),h*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,h,l,u){let f=(o-r)/h-(a-r)/(h+l)+(a-o)/l,d=(a-o)/l-(c-o)/(l+u)+(c-a)/u;f*=l,d*=l,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var Td=new B,Ed=new B,Eh=new uu,Ah=new uu,wh=new uu,Qa=class extends Pn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new B){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let h,l;this.closed||a>0?h=s[(a-1)%r]:(Ed.subVectors(s[0],s[1]).add(s[0]),h=Ed);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?l=s[(a+2)%r]:(Td.subVectors(s[r-1],s[r-2]).add(s[r-1]),l=Td),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(h.distanceToSquared(u),d),y=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(l),d);y<1e-4&&(y=1),p<1e-4&&(p=y),m<1e-4&&(m=y),Eh.initNonuniformCatmullRom(h.x,u.x,f.x,l.x,p,y,m),Ah.initNonuniformCatmullRom(h.y,u.y,f.y,l.y,p,y,m),wh.initNonuniformCatmullRom(h.z,u.z,f.z,l.z,p,y,m)}else this.curveType==="catmullrom"&&(Eh.initCatmullRom(h.x,u.x,f.x,l.x,this.tension),Ah.initCatmullRom(h.y,u.y,f.y,l.y,this.tension),wh.initCatmullRom(h.z,u.z,f.z,l.z,this.tension));return n.set(Eh.calc(c),Ah.calc(c),wh.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new B().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ad(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function B0(i,e){let t=1-i;return t*t*e}function z0(i,e){return 2*(1-i)*i*e}function H0(i,e){return i*i*e}function Fr(i,e,t,n){return B0(i,e)+z0(i,t)+H0(i,n)}function G0(i,e){let t=1-i;return t*t*t*e}function V0(i,e){let t=1-i;return 3*t*t*i*e}function W0(i,e){return 3*(1-i)*i*i*e}function X0(i,e){return i*i*i*e}function kr(i,e,t,n,s){return G0(i,e)+V0(i,t)+W0(i,n)+X0(i,s)}var to=class extends Pn{constructor(e=new be,t=new be,n=new be,s=new be){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new be){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(kr(e,s.x,r.x,o.x,a.x),kr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ec=class extends Pn{constructor(e=new B,t=new B,n=new B,s=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new B){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(kr(e,s.x,r.x,o.x,a.x),kr(e,s.y,r.y,o.y,a.y),kr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},no=class extends Pn{constructor(e=new be,t=new be){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new be){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new be){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},tc=class extends Pn{constructor(e=new B,t=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new B){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new B){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},io=class extends Pn{constructor(e=new be,t=new be,n=new be){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new be){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Fr(e,s.x,r.x,o.x),Fr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},nc=class extends Pn{constructor(e=new B,t=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new B){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Fr(e,s.x,r.x,o.x),Fr(e,s.y,r.y,o.y),Fr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},so=class extends Pn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new be){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],h=s[o],l=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Ad(a,c.x,h.x,l.x,u.x),Ad(a,c.y,h.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new be().fromArray(s))}return this}},wd=Object.freeze({__proto__:null,ArcCurve:Ka,CatmullRomCurve3:Qa,CubicBezierCurve:to,CubicBezierCurve3:ec,EllipseCurve:ar,LineCurve:no,LineCurve3:tc,QuadraticBezierCurve:io,QuadraticBezierCurve3:nc,SplineCurve:so}),ic=class extends Pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wd[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),h=c===0?0:1-o/c;return a.getPointAt(h,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let h=0;h<c.length;h++){let l=c[h];n&&n.equals(l)||(t.push(l),n=l)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new wd[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},ro=class extends ic{constructor(e){super(),this.type="Path",this.currentPoint=new be,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new no(this.currentPoint.clone(),new be(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new io(this.currentPoint.clone(),new be(e,t),new be(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new to(this.currentPoint.clone(),new be(e,t),new be(n,s),new be(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new so(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){let h=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+h,t+l,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){let h=new ar(e,t,n,s,r,o,a,c);if(this.curves.length>0){let u=h.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(h);let l=h.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},cr=class extends ro{constructor(e){super(e),this.uuid=mr(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new ro().fromJSON(s))}return this}};function q0(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Mp(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,h;if(n&&(r=$0(i,e,r,t)),i.length>80*t){a=i[0],c=i[1];let l=a,u=c;for(let f=t;f<s;f+=t){let d=i[f],p=i[f+1];d<a&&(a=d),p<c&&(c=p),d>l&&(l=d),p>u&&(u=p)}h=Math.max(l-a,u-c),h=h!==0?32767/h:0}return oo(r,o,t,a,c,h,0),o}function Mp(i,e,t,n,s){let r;if(s===cg(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Cd(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Cd(o/n|0,i[o],i[o+1],r);return r&&lr(r,r.next)&&(co(r),r=r.next),r}function _s(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(lr(t,t.next)||Ct(t.prev,t,t.next)===0)){if(co(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function oo(i,e,t,n,s,r,o){if(!i)return;!o&&r&&ng(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,h=i.next;if(r?j0(i,n,s,r):Y0(i)){e.push(c.i,i.i,h.i),co(i),i=h.next,a=h.next;continue}if(i=h,i===a){o?o===1?(i=J0(_s(i),e),oo(i,e,t,n,s,r,2)):o===2&&Z0(i,e,t,n,s,r):oo(_s(i),e,t,n,s,r,1);break}}}function Y0(i){let e=i.prev,t=i,n=i.next;if(Ct(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,h=n.y,l=Math.min(s,r,o),u=Math.min(a,c,h),f=Math.max(s,r,o),d=Math.max(a,c,h),p=n.next;for(;p!==e;){if(p.x>=l&&p.x<=f&&p.y>=u&&p.y<=d&&Ur(s,a,r,c,o,h,p.x,p.y)&&Ct(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function j0(i,e,t,n){let s=i.prev,r=i,o=i.next;if(Ct(s,r,o)>=0)return!1;let a=s.x,c=r.x,h=o.x,l=s.y,u=r.y,f=o.y,d=Math.min(a,c,h),p=Math.min(l,u,f),y=Math.max(a,c,h),m=Math.max(l,u,f),g=Nh(d,p,e,t,n),v=Nh(y,m,e,t,n),T=i.prevZ,b=i.nextZ;for(;T&&T.z>=g&&b&&b.z<=v;){if(T.x>=d&&T.x<=y&&T.y>=p&&T.y<=m&&T!==s&&T!==o&&Ur(a,l,c,u,h,f,T.x,T.y)&&Ct(T.prev,T,T.next)>=0||(T=T.prevZ,b.x>=d&&b.x<=y&&b.y>=p&&b.y<=m&&b!==s&&b!==o&&Ur(a,l,c,u,h,f,b.x,b.y)&&Ct(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;T&&T.z>=g;){if(T.x>=d&&T.x<=y&&T.y>=p&&T.y<=m&&T!==s&&T!==o&&Ur(a,l,c,u,h,f,T.x,T.y)&&Ct(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;b&&b.z<=v;){if(b.x>=d&&b.x<=y&&b.y>=p&&b.y<=m&&b!==s&&b!==o&&Ur(a,l,c,u,h,f,b.x,b.y)&&Ct(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function J0(i,e){let t=i;do{let n=t.prev,s=t.next.next;!lr(n,s)&&Tp(n,t,t.next,s)&&ao(n,s)&&ao(s,n)&&(e.push(n.i,t.i,s.i),co(t),co(t.next),t=i=s),t=t.next}while(t!==i);return _s(t)}function Z0(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&rg(o,a)){let c=Ep(o,a);o=_s(o,o.next),c=_s(c,c.next),oo(o,e,t,n,s,r,0),oo(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function $0(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,h=Mp(i,a,c,n,!1);h===h.next&&(h.steiner=!0),s.push(sg(h))}s.sort(K0);for(let r=0;r<s.length;r++)t=Q0(s[r],t);return t}function K0(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Q0(i,e){let t=eg(i,e);if(!t)return e;let n=Ep(t,i);return _s(n,n.next),_s(t,t.next)}function eg(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(lr(i,t))return t;do{if(lr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,c=o.x,h=o.y,l=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&bp(s<h?n:r,s,c,h,s<h?r:n,s,t.x,t.y)){let u=Math.abs(s-t.y)/(n-t.x);ao(t,i)&&(u<l||u===l&&(t.x>o.x||t.x===o.x&&tg(o,t)))&&(o=t,l=u)}t=t.next}while(t!==a);return o}function tg(i,e){return Ct(i.prev,i,e.prev)<0&&Ct(e.next,i,i.next)<0}function ng(i,e,t,n){let s=i;do s.z===0&&(s.z=Nh(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,ig(s)}function ig(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let h=0;h<t&&(a++,o=o.nextZ,!!o);h++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Nh(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function sg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function bp(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Ur(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&bp(i,e,t,n,s,r,o,a)}function rg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!og(i,e)&&(ao(i,e)&&ao(e,i)&&ag(i,e)&&(Ct(i.prev,i,e.prev)||Ct(i,e.prev,e))||lr(i,e)&&Ct(i.prev,i,i.next)>0&&Ct(e.prev,e,e.next)>0)}function Ct(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function lr(i,e){return i.x===e.x&&i.y===e.y}function Tp(i,e,t,n){let s=Ia(Ct(i,e,t)),r=Ia(Ct(i,e,n)),o=Ia(Ct(t,n,i)),a=Ia(Ct(t,n,e));return!!(s!==r&&o!==a||s===0&&Pa(i,t,e)||r===0&&Pa(i,n,e)||o===0&&Pa(t,i,n)||a===0&&Pa(t,e,n))}function Pa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ia(i){return i>0?1:i<0?-1:0}function og(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Tp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function ao(i,e){return Ct(i.prev,i,i.next)<0?Ct(i,e,i.next)>=0&&Ct(i,i.prev,e)>=0:Ct(i,e,i.prev)<0||Ct(i,i.next,e)<0}function ag(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ep(i,e){let t=Uh(i.i,i.x,i.y),n=Uh(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Cd(i,e,t,n){let s=Uh(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function co(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Uh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function cg(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Oh=class{static triangulate(e,t,n=2){return q0(e,t,n)}},Js=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Rd(e),Pd(n,e);let o=e.length;t.forEach(Rd);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,Pd(n,t[c]);let a=Oh.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Rd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Pd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var In=class i extends rr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var lo=class i extends rr{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},$i=class i extends It{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),h=a+1,l=c+1,u=e/a,f=t/c,d=[],p=[],y=[],m=[];for(let g=0;g<l;g++){let v=g*f-o;for(let T=0;T<h;T++){let b=T*u-r;p.push(b,-v,0),y.push(0,0,1),m.push(T/a),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<a;v++){let T=v+h*g,b=v+h*(g+1),w=v+1+h*(g+1),E=v+1+h*g;d.push(T,b,E),d.push(b,w,E)}this.setIndex(d),this.setAttribute("position",new ot(p,3)),this.setAttribute("normal",new ot(y,3)),this.setAttribute("uv",new ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Xn=class i extends It{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],h=[],l=[],u=e,f=(t-e)/s,d=new B,p=new be;for(let y=0;y<=s;y++){for(let m=0;m<=n;m++){let g=r+m/n*o;d.x=u*Math.cos(g),d.y=u*Math.sin(g),c.push(d.x,d.y,d.z),h.push(0,0,1),p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,l.push(p.x,p.y)}u+=f}for(let y=0;y<s;y++){let m=y*(n+1);for(let g=0;g<n;g++){let v=g+m,T=v,b=v+n+1,w=v+n+2,E=v+1;a.push(T,b,E),a.push(b,w,E)}}this.setIndex(a),this.setAttribute("position",new ot(c,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},ho=class i extends It{constructor(e=new cr([new be(0,.5),new be(-.5,-.5),new be(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(e)===!1)h(e);else for(let l=0;l<e.length;l++)h(e[l]),this.addGroup(a,c,l),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new ot(s,3)),this.setAttribute("normal",new ot(r,3)),this.setAttribute("uv",new ot(o,2));function h(l){let u=s.length/3,f=l.extractPoints(t),d=f.shape,p=f.holes;Js.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,g=p.length;m<g;m++){let v=p[m];Js.isClockWise(v)===!0&&(p[m]=v.reverse())}let y=Js.triangulateShape(d,p);for(let m=0,g=p.length;m<g;m++){let v=p[m];d=d.concat(v)}for(let m=0,g=d.length;m<g;m++){let v=d[m];s.push(v.x,v.y,0),r.push(0,0,1),o.push(v.x,v.y)}for(let m=0,g=y.length;m<g;m++){let v=y[m],T=v[0]+u,b=v[1]+u,w=v[2]+u;n.push(T,b,w),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return lg(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let o=t[e.shapes[s]];n.push(o)}return new i(n,e.curveSegments)}};function lg(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}function bs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Id(s))s.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Id(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function an(i){let e={};for(let t=0;t<i.length;t++){let n=bs(i[t]);for(let s in n)e[s]=n[s]}return e}function Id(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function hg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function fu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var Ap={clone:bs,merge:an},ug=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qn=class extends Ni{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ug,this.fragmentShader=fg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=bs(e.uniforms),this.uniformsGroups=hg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new We().setHex(s.value);break;case"v2":this.uniforms[n].value=new be().fromArray(s.value);break;case"v3":this.uniforms[n].value=new B().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Tt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Xe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new lt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},sc=class extends qn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var gi=class extends Ni{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cl,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=Sc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},rc=class extends Ni{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ap,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},oc=class extends Ni{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Xs(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function La(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ki=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ac=class extends Ki{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ph,endingEnd:Ph}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ih:r=e,a=2*t-n;break;case Lh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ih:o=e,c=2*n-t;break;case Lh:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let h=(n-t)*.5,l=this.valueSize;this._weightPrev=h/(t-a),this._weightNext=h/(c-n),this._offsetPrev=r*l,this._offsetNext=o*l}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,h=c-a,l=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-t)/(s-t),y=p*p,m=y*p,g=-f*m+2*f*y-f*p,v=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*p+1,T=(-1-d)*m+(1.5+d)*y+.5*p,b=d*m-d*y;for(let w=0;w!==a;++w)r[w]=g*o[l+w]+v*o[h+w]+T*o[c+w]+b*o[u+w];return r}},cc=class extends Ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,h=c-a,l=(n-t)/(s-t),u=1-l;for(let f=0;f!==a;++f)r[f]=o[h+f]*u+o[c+f]*l;return r}},lc=class extends Ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},hc=class extends Ki{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,h=c-a,l=this.inTangents,u=this.outTangents;if(!l||!u){let p=(n-t)/(s-t),y=1-p;for(let m=0;m!==a;++m)r[m]=o[h+m]*y+o[c+m]*p;return r}let f=a*2,d=e-1;for(let p=0;p!==a;++p){let y=o[h+p],m=o[c+p],g=d*f+p*2,v=u[g],T=u[g+1],b=e*f+p*2,w=l[b],E=l[b+1],x=pg(n,t,v,w,s);r[p]=wp(x,y,T,E,m)}return r}};function wp(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function dg(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function pg(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=wp(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let c=dg(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var Ln=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Xs(t,this.TimeBufferType),this.values=Xs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Xs(e.times,Array),values:Xs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),La(e.settings)&&(n.settings={inTangents:Xs(e.settings.inTangents,Array),outTangents:Xs(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new lc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new cc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ac(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new hc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Br:t=this.InterpolantFactoryMethodDiscrete;break;case Xa:t=this.InterpolantFactoryMethodLinear;break;case Ua:t=this.InterpolantFactoryMethodSmooth;break;case Rh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Be("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Br;case this.InterpolantFactoryMethodLinear:return Xa;case this.InterpolantFactoryMethodSmooth:return Ua;case this.InterpolantFactoryMethodBezier:return Rh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;La(this.settings)&&(Ld(this.settings.inTangents,e),Ld(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;La(this.settings)&&(Dd(this.settings.inTangents,e),Dd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ve("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ve("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Ve("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Ve("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&g0(s))for(let a=0,c=s.length;a!==c;++a){let h=s[a];if(isNaN(h)){Ve("KeyframeTrack: Value is not a valid number.",this,a,h),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ua,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,h=e[a],l=e[a+1];if(h!==l&&(a!==1||h!==e[0]))if(s)c=!0;else{let u=a*n,f=u-n,d=u+n;for(let p=0;p!==n;++p){let y=t[u+p];if(y!==t[f+p]||y!==t[d+p]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,h=0;h!==n;++h)t[c+h]=t[a+h];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,La(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Ld(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function Dd(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Ln.prototype.ValueTypeName="";Ln.prototype.TimeBufferType=Float32Array;Ln.prototype.ValueBufferType=Float32Array;Ln.prototype.DefaultInterpolation=Xa;var Qi=class extends Ln{constructor(e,t,n){super(e,t,n)}};Qi.prototype.ValueTypeName="bool";Qi.prototype.ValueBufferType=Array;Qi.prototype.DefaultInterpolation=Br;Qi.prototype.InterpolantFactoryMethodLinear=void 0;Qi.prototype.InterpolantFactoryMethodSmooth=void 0;var uc=class extends Ln{constructor(e,t,n,s){super(e,t,n,s)}};uc.prototype.ValueTypeName="color";var fc=class extends Ln{constructor(e,t,n,s){super(e,t,n,s)}};fc.prototype.ValueTypeName="number";var dc=class extends Ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),h=e*a;for(let l=h+a;h!==l;h+=4)pi.slerpFlat(r,0,o,h-a,o,h,c);return r}},uo=class extends Ln{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new dc(this.times,this.values,this.getValueSize(),e)}};uo.prototype.ValueTypeName="quaternion";uo.prototype.InterpolantFactoryMethodSmooth=void 0;var es=class extends Ln{constructor(e,t,n){super(e,t,n)}};es.prototype.ValueTypeName="string";es.prototype.ValueBufferType=Array;es.prototype.DefaultInterpolation=Br;es.prototype.InterpolantFactoryMethodLinear=void 0;es.prototype.InterpolantFactoryMethodSmooth=void 0;var pc=class extends Ln{constructor(e,t,n,s){super(e,t,n,s)}};pc.prototype.ValueTypeName="vector";var mc=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,h=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(l){a++,r===!1&&s.onStart!==void 0&&s.onStart(l,o,a),r=!0},this.itemEnd=function(l){o++,s.onProgress!==void 0&&s.onProgress(l,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(l){s.onError!==void 0&&s.onError(l)},this.resolveURL=function(l){return l=l.normalize("NFC"),c?c(l):l},this.setURLModifier=function(l){return c=l,this},this.addHandler=function(l,u){return h.push(l,u),this},this.removeHandler=function(l){let u=h.indexOf(l);return u!==-1&&h.splice(u,2),this},this.getHandler=function(l){for(let u=0,f=h.length;u<f;u+=2){let d=h[u],p=h[u+1];if(d.global&&(d.lastIndex=0),d.test(l))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Cp=new mc,gc=class{constructor(e){this.manager=e!==void 0?e:Cp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};gc.DEFAULT_MATERIAL_NAME="__DEFAULT";var fo=class extends Ot{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},po=class extends fo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Ch=new lt,Nd=new B,Ud=new B,_c=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.mapType=Sn,this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zi,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Nd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Nd),Ud.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ud),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Ch.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ch,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,h=s?s.y/r.y:0;e.coordinateSystem===Ks||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+h,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+h,0,0,.5,.5,0,0,0,1),t.multiply(Ch)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Da=new B,Na=new pi,ui=new B,mo=class extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=Vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Da,Na,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Da,Na,ui.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Da,Na,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Da,Na,ui.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ji=new B,Od=new be,Fd=new be,pn=class extends mo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=qa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(sh*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qa*2*Math.atan(Math.tan(sh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ji.x,ji.y).multiplyScalar(-e/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ji.x,ji.y).multiplyScalar(-e/ji.z)}getViewSize(e,t){return this.getViewBounds(e,Od,Fd),t.subVectors(Fd,Od)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(sh*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,h=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/h,s*=o.width/c,n*=o.height/h}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var go=class extends mo{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let h=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,o=r+h*this.view.width,a-=l*this.view.offsetY,c=a-l*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Fh=class extends _c{constructor(){super(new go(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},_o=class extends fo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.target=new Ot,this.shadow=new Fh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var qs=-90,Ys=1,hr=class extends Ot{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new pn(qs,Ys,e,t);s.layers=this.layers,this.add(s);let r=new pn(qs,Ys,e,t);r.layers=this.layers,this.add(r);let o=new pn(qs,Ys,e,t);o.layers=this.layers,this.add(o);let a=new pn(qs,Ys,e,t);a.layers=this.layers,this.add(a);let c=new pn(qs,Ys,e,t);c.layers=this.layers,this.add(c);let h=new pn(qs,Ys,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let h of t)this.remove(h);if(e===Vn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ks)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,h,l]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),n.texture.mipmapsAutoUpdate=y,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,f,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},xc=class extends pn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var du="\\[\\]\\.:\\/",mg=new RegExp("["+du+"]","g"),pu="[^"+du+"]",gg="[^"+du.replace("\\.","")+"]",_g=/((?:WC+[\/:])*)/.source.replace("WC",pu),xg=/(WCOD+)?/.source.replace("WCOD",gg),yg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pu),vg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pu),Sg=new RegExp("^"+_g+xg+yg+vg+"$"),Mg=["material","materials","bones","map"],kh=class{constructor(e,t,n){let s=n||yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},yt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(mg,"")}static parseTrackName(e){let t=Sg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Mg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Be("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let h=t.objectIndex;switch(n){case"materials":if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ve("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ve("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let l=0;l<e.length;l++)if(e[l].name===h){h=l;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ve("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ve("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(h!==void 0){if(e[h]===void 0){Ve("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}let o=e[s];if(o===void 0){let h=t.nodeName;Ve("PropertyBinding: Trying to update property for track: "+h+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};yt.Composite=kh;yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};yt.prototype.GetterByBindingType=[yt.prototype._getValue_direct,yt.prototype._getValue_array,yt.prototype._getValue_arrayElement,yt.prototype._getValue_toArray];yt.prototype.SetterByBindingTypeAndVersioning=[[yt.prototype._setValue_direct,yt.prototype._setValue_direct_setNeedsUpdate,yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_array,yt.prototype._setValue_array_setNeedsUpdate,yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_arrayElement,yt.prototype._setValue_arrayElement_setNeedsUpdate,yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_fromArray,yt.prototype._setValue_fromArray_setNeedsUpdate,yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var rM=new Float32Array(1);var vu=class vu{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};vu.prototype.isMatrix2=!0;var Bh=vu;function mu(i,e,t,n){let s=bg(n);switch(t){case iu:return i*e;case Cc:return i*e/s.components*s.byteLength;case Rc:return i*e/s.components*s.byteLength;case ns:return i*e*2/s.components*s.byteLength;case Pc:return i*e*2/s.components*s.byteLength;case su:return i*e*3/s.components*s.byteLength;case oi:return i*e*4/s.components*s.byteLength;case Ic:return i*e*4/s.components*s.byteLength;case vo:case So:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Mo:case bo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Dc:case Uc:return Math.max(i,16)*Math.max(e,8)/4;case Lc:case Nc:return Math.max(i,8)*Math.max(e,8)/2;case Oc:case Fc:case Bc:case zc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case kc:case To:case Hc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Gc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Vc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Wc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Xc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case qc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Yc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case jc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Jc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Zc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case $c:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Kc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Qc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case el:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case tl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case nl:case il:case sl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case rl:case ol:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Eo:case al:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function bg(i){switch(i){case Sn:case Qh:return{byteLength:1,components:1};case pr:case eu:case ri:return{byteLength:2,components:1};case Ac:case wc:return{byteLength:2,components:4};case si:case Ec:case Yn:return{byteLength:4,components:1};case tu:case nu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Zp(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Ig(i){let e=new WeakMap;function t(a,c){let h=a.array,l=a.usage,u=h.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,h,l),a.onUploadCallback();let d;if(h instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)d=i.HALF_FLOAT;else if(h instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)d=i.SHORT;else if(h instanceof Uint32Array)d=i.UNSIGNED_INT;else if(h instanceof Int32Array)d=i.INT;else if(h instanceof Int8Array)d=i.BYTE;else if(h instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:f,type:d,bytesPerElement:h.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,h){let l=c.array,u=c.updateRanges;if(i.bindBuffer(h,a),u.length===0)i.bufferSubData(h,0,l);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){let p=u[f],y=u[d];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++f,u[f]=y)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){let y=u[d];i.bufferSubData(h,y.start*l.BYTES_PER_ELEMENT,l,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let l=e.get(a);(!l||l.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let h=e.get(a);if(h===void 0)e.set(a,t(a,c));else if(h.version<a.version){if(h.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,a,c),h.version=a.version}}return{get:s,remove:r,update:o}}var Lg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dg=`#ifdef USE_ALPHAHASH
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
#endif`,Ng=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ug=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Og=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Fg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kg=`#ifdef USE_AOMAP
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
#endif`,Bg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zg=`#ifdef USE_BATCHING
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
#endif`,Hg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xg=`#ifdef USE_IRIDESCENCE
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
#endif`,qg=`#ifdef USE_BUMPMAP
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
#endif`,Yg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$g=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Kg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Qg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,e_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,t_=`#define PI 3.141592653589793
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
} // validated`,n_=`vec3 transformedNormal = objectNormal;
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
#endif`,i_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,s_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,r_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,o_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,a_="gl_FragColor = linearToOutputTexel( gl_FragColor );",c_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,l_=`#ifdef USE_ENVMAP
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
#endif`,h_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,u_=`#ifdef USE_ENVMAP
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
#endif`,f_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,d_=`#ifdef USE_ENVMAP
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
#endif`,p_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,m_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,g_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,__=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,x_=`#ifdef USE_GRADIENTMAP
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
}`,y_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,v_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,S_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,M_=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,b_=`#ifdef USE_ENVMAP
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
#endif`,T_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,E_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,A_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,w_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,C_=`PhysicalMaterial material;
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
#endif`,R_=`uniform sampler2D dfgLUT;
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
}`,P_=`
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
#endif`,I_=`#if defined( RE_IndirectDiffuse )
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
#endif`,L_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,D_=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,N_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,U_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,O_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,F_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,k_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,B_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,z_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,H_=`#if defined( USE_POINTS_UV )
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
#endif`,G_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,V_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,W_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,X_=`#if defined( USE_MORPHCOLORS )
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
#endif`,q_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Y_=`#ifdef USE_MORPHTARGETS
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
#endif`,j_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,J_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Z_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Q_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ex=`#ifdef USE_NORMALMAP
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
#endif`,tx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ix=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ox=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ax=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ux=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,px=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gx=`float getShadowMask() {
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
}`,_x=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xx=`#ifdef USE_SKINNING
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
#endif`,yx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vx=`#ifdef USE_SKINNING
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
#endif`,Sx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ex=`#ifdef USE_TRANSMISSION
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
#endif`,Ax=`#ifdef USE_TRANSMISSION
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
#endif`,wx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Px=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ix=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lx=`uniform sampler2D t2D;
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
}`,Dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nx=`uniform float backgroundBlurriness;
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
}`,Ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ox=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fx=`#include <common>
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
}`,kx=`#if DEPTH_PACKING == 3200
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
}`,Bx=`#define DISTANCE
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
}`,zx=`#define DISTANCE
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
}`,Hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vx=`uniform float scale;
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
}`,Wx=`uniform vec3 diffuse;
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
}`,Xx=`#include <common>
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
}`,qx=`uniform vec3 diffuse;
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
}`,Yx=`#define LAMBERT
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
}`,jx=`#define LAMBERT
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
}`,Jx=`#define MATCAP
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
}`,Zx=`#define MATCAP
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
}`,$x=`#define NORMAL
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
}`,Kx=`#define NORMAL
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
}`,Qx=`#define PHONG
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
}`,ey=`#define PHONG
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
}`,ty=`#define STANDARD
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
}`,ny=`#define STANDARD
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
}`,iy=`#define TOON
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
}`,sy=`#define TOON
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
}`,ry=`uniform float size;
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
}`,oy=`uniform vec3 diffuse;
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
}`,ay=`#include <common>
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
}`,cy=`uniform vec3 color;
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
}`,ly=`uniform float rotation;
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
}`,hy=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:Lg,alphahash_pars_fragment:Dg,alphamap_fragment:Ng,alphamap_pars_fragment:Ug,alphatest_fragment:Og,alphatest_pars_fragment:Fg,aomap_fragment:kg,aomap_pars_fragment:Bg,batching_pars_vertex:zg,batching_vertex:Hg,begin_vertex:Gg,beginnormal_vertex:Vg,bsdfs:Wg,iridescence_fragment:Xg,bumpmap_pars_fragment:qg,clipping_planes_fragment:Yg,clipping_planes_pars_fragment:jg,clipping_planes_pars_vertex:Jg,clipping_planes_vertex:Zg,color_fragment:$g,color_pars_fragment:Kg,color_pars_vertex:Qg,color_vertex:e_,common:t_,defaultnormal_vertex:n_,displacementmap_pars_vertex:i_,displacementmap_vertex:s_,emissivemap_fragment:r_,emissivemap_pars_fragment:o_,colorspace_fragment:a_,colorspace_pars_fragment:c_,envmap_fragment:l_,envmap_common_pars_fragment:h_,envmap_pars_fragment:u_,envmap_pars_vertex:f_,envmap_physical_pars_fragment:b_,envmap_vertex:d_,fog_vertex:p_,fog_pars_vertex:m_,fog_fragment:g_,fog_pars_fragment:__,gradientmap_pars_fragment:x_,lightmap_pars_fragment:y_,lights_lambert_fragment:v_,lights_lambert_pars_fragment:S_,lights_pars_begin:M_,lights_toon_fragment:T_,lights_toon_pars_fragment:E_,lights_phong_fragment:A_,lights_phong_pars_fragment:w_,lights_physical_fragment:C_,lights_physical_pars_fragment:R_,lights_fragment_begin:P_,lights_fragment_maps:I_,lights_fragment_end:L_,lightprobes_pars_fragment:D_,logdepthbuf_fragment:N_,logdepthbuf_pars_fragment:U_,logdepthbuf_pars_vertex:O_,logdepthbuf_vertex:F_,map_fragment:k_,map_pars_fragment:B_,map_particle_fragment:z_,map_particle_pars_fragment:H_,metalnessmap_fragment:G_,metalnessmap_pars_fragment:V_,morphinstance_vertex:W_,morphcolor_vertex:X_,morphnormal_vertex:q_,morphtarget_pars_vertex:Y_,morphtarget_vertex:j_,normal_fragment_begin:J_,normal_fragment_maps:Z_,normal_pars_fragment:$_,normal_pars_vertex:K_,normal_vertex:Q_,normalmap_pars_fragment:ex,clearcoat_normal_fragment_begin:tx,clearcoat_normal_fragment_maps:nx,clearcoat_pars_fragment:ix,iridescence_pars_fragment:sx,opaque_fragment:rx,packing:ox,premultiplied_alpha_fragment:ax,project_vertex:cx,dithering_fragment:lx,dithering_pars_fragment:hx,roughnessmap_fragment:ux,roughnessmap_pars_fragment:fx,shadowmap_pars_fragment:dx,shadowmap_pars_vertex:px,shadowmap_vertex:mx,shadowmask_pars_fragment:gx,skinbase_vertex:_x,skinning_pars_vertex:xx,skinning_vertex:yx,skinnormal_vertex:vx,specularmap_fragment:Sx,specularmap_pars_fragment:Mx,tonemapping_fragment:bx,tonemapping_pars_fragment:Tx,transmission_fragment:Ex,transmission_pars_fragment:Ax,uv_pars_fragment:wx,uv_pars_vertex:Cx,uv_vertex:Rx,worldpos_vertex:Px,background_vert:Ix,background_frag:Lx,backgroundCube_vert:Dx,backgroundCube_frag:Nx,cube_vert:Ux,cube_frag:Ox,depth_vert:Fx,depth_frag:kx,distance_vert:Bx,distance_frag:zx,equirect_vert:Hx,equirect_frag:Gx,linedashed_vert:Vx,linedashed_frag:Wx,meshbasic_vert:Xx,meshbasic_frag:qx,meshlambert_vert:Yx,meshlambert_frag:jx,meshmatcap_vert:Jx,meshmatcap_frag:Zx,meshnormal_vert:$x,meshnormal_frag:Kx,meshphong_vert:Qx,meshphong_frag:ey,meshphysical_vert:ty,meshphysical_frag:ny,meshtoon_vert:iy,meshtoon_frag:sy,points_vert:ry,points_frag:oy,shadow_vert:ay,shadow_frag:cy,sprite_vert:ly,sprite_frag:hy},ye={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},yi={basic:{uniforms:an([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:an([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new We(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:an([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:an([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:an([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new We(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:an([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:an([ye.points,ye.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:an([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:an([ye.common,ye.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:an([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:an([ye.sprite,ye.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:an([ye.common,ye.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:an([ye.lights,ye.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};yi.physical={uniforms:an([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Xe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};var ll={r:0,b:0,g:0},uy=new lt,$p=new Xe;$p.set(-1,0,0,0,1,0,0,0,1);function fy(i,e,t,n,s,r){let o=new We(0),a=s===!0?0:1,c,h,l=null,u=0,f=null;function d(v){let T=v.isScene===!0?v.background:null;if(T&&T.isTexture){let b=v.backgroundBlurriness>0;T=e.get(T,b)}return T}function p(v){let T=!1,b=d(v);b===null?m(o,a):b&&b.isColor&&(m(b,1),T=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(v,T){let b=d(T);b&&b.isCubeTexture?(h===void 0&&(h=new ze(new ht(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:bs(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,E,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=b,h.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(uy.makeRotationFromEuler(T.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply($p),h.material.toneMapped=it.getTransfer(b.colorSpace)!==ut,(l!==b||u!==b.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,l=b,u=b.version,f=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new ze(new $i(2,2),new qn({name:"BackgroundMaterial",uniforms:bs(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:ts,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=it.getTransfer(b.colorSpace)!==ut,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(l!==b||u!==b.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,l=b,u=b.version,f=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,T){v.getRGB(ll,fu(i)),t.buffers.color.setClear(ll.r,ll.g,ll.b,T,r)}function g(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,T=1){o.set(v),a=T,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,m(o,a)},render:p,addToRenderList:y,dispose:g}}function dy(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(R,I,D,P,F){let z=!1,O=u(R,P,D,I);r!==O&&(r=O,h(r.object)),z=d(R,P,D,F),z&&p(R,P,D,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,b(R,I,D,P),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function c(){return i.createVertexArray()}function h(R){return i.bindVertexArray(R)}function l(R){return i.deleteVertexArray(R)}function u(R,I,D,P){let F=P.wireframe===!0,z=n[I.id];z===void 0&&(z={},n[I.id]=z);let O=R.isInstancedMesh===!0?R.id:0,W=z[O];W===void 0&&(W={},z[O]=W);let X=W[D.id];X===void 0&&(X={},W[D.id]=X);let Z=X[F];return Z===void 0&&(Z=f(c()),X[F]=Z),Z}function f(R){let I=[],D=[],P=[];for(let F=0;F<t;F++)I[F]=0,D[F]=0,P[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:D,attributeDivisors:P,object:R,attributes:{},index:null}}function d(R,I,D,P){let F=r.attributes,z=I.attributes,O=0,W=D.getAttributes();for(let X in W)if(W[X].location>=0){let ee=F[X],_e=z[X];if(_e===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(_e=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(_e=R.instanceColor)),ee===void 0||ee.attribute!==_e||_e&&ee.data!==_e.data)return!0;O++}return r.attributesNum!==O||r.index!==P}function p(R,I,D,P){let F={},z=I.attributes,O=0,W=D.getAttributes();for(let X in W)if(W[X].location>=0){let ee=z[X];ee===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(ee=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(ee=R.instanceColor));let _e={};_e.attribute=ee,ee&&ee.data&&(_e.data=ee.data),F[X]=_e,O++}r.attributes=F,r.attributesNum=O,r.index=P}function y(){let R=r.newAttributes;for(let I=0,D=R.length;I<D;I++)R[I]=0}function m(R){g(R,0)}function g(R,I){let D=r.newAttributes,P=r.enabledAttributes,F=r.attributeDivisors;D[R]=1,P[R]===0&&(i.enableVertexAttribArray(R),P[R]=1),F[R]!==I&&(i.vertexAttribDivisor(R,I),F[R]=I)}function v(){let R=r.newAttributes,I=r.enabledAttributes;for(let D=0,P=I.length;D<P;D++)I[D]!==R[D]&&(i.disableVertexAttribArray(D),I[D]=0)}function T(R,I,D,P,F,z,O){O===!0?i.vertexAttribIPointer(R,I,D,F,z):i.vertexAttribPointer(R,I,D,P,F,z)}function b(R,I,D,P){y();let F=P.attributes,z=D.getAttributes(),O=I.defaultAttributeValues;for(let W in z){let X=z[W];if(X.location>=0){let Z=F[W];if(Z===void 0&&(W==="instanceMatrix"&&R.instanceMatrix&&(Z=R.instanceMatrix),W==="instanceColor"&&R.instanceColor&&(Z=R.instanceColor)),Z!==void 0){let ee=Z.normalized,_e=Z.itemSize,Le=e.get(Z);if(Le===void 0)continue;let Y=Le.buffer,se=Le.type,ve=Le.bytesPerElement,De=se===i.INT||se===i.UNSIGNED_INT||Z.gpuType===Ec;if(Z.isInterleavedBufferAttribute){let de=Z.data,Ge=de.isInterleavedBuffer===!0?de.stride:de.itemSize,xt=Z.offset;if(de.isInstancedInterleavedBuffer||de.isInstancedBufferAttribute){for(let Fe=0;Fe<X.locationSize;Fe++)g(X.location+Fe,de.meshPerAttribute);R.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Fe=0;Fe<X.locationSize;Fe++)m(X.location+Fe);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let Fe=0;Fe<X.locationSize;Fe++)T(X.location+Fe,_e/X.locationSize,se,ee,Ge*ve,(xt+_e/X.locationSize*Fe)*ve,De)}else{if(Z.isInstancedBufferAttribute){for(let de=0;de<X.locationSize;de++)g(X.location+de,Z.meshPerAttribute);R.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let de=0;de<X.locationSize;de++)m(X.location+de);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let de=0;de<X.locationSize;de++)T(X.location+de,_e/X.locationSize,se,ee,_e*ve,_e/X.locationSize*de*ve,De)}}else if(O!==void 0){let ee=O[W];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(X.location,ee);break;case 3:i.vertexAttrib3fv(X.location,ee);break;case 4:i.vertexAttrib4fv(X.location,ee);break;default:i.vertexAttrib1fv(X.location,ee)}}}}v()}function w(){S();for(let R in n){let I=n[R];for(let D in I){let P=I[D];for(let F in P){let z=P[F];for(let O in z)l(z[O].object),delete z[O];delete P[F]}}delete n[R]}}function E(R){if(n[R.id]===void 0)return;let I=n[R.id];for(let D in I){let P=I[D];for(let F in P){let z=P[F];for(let O in z)l(z[O].object),delete z[O];delete P[F]}}delete n[R.id]}function x(R){for(let I in n){let D=n[I];for(let P in D){let F=D[P];if(F[R.id]===void 0)continue;let z=F[R.id];for(let O in z)l(z[O].object),delete z[O];delete F[R.id]}}}function M(R){for(let I in n){let D=n[I],P=R.isInstancedMesh===!0?R.id:0,F=D[P];if(F!==void 0){for(let z in F){let O=F[z];for(let W in O)l(O[W].object),delete O[W];delete F[z]}delete D[P],Object.keys(D).length===0&&delete n[I]}}}function S(){_(),o=!0,r!==s&&(r=s,h(r.object))}function _(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:S,resetDefaultState:_,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:M,releaseStatesOfProgram:x,initAttributes:y,enableAttribute:m,disableUnusedAttributes:v}}function py(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,l){l!==0&&(i.drawArraysInstanced(n,c,h,l),t.update(h,n,l))}function a(c,h,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,l);let f=0;for(let d=0;d<l;d++)f+=h[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function my(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let x=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(x){return!(x!==oi&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let M=x===ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(x!==Sn&&x!==Yn&&!M&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp",l=c(h);l!==h&&(Be("WebGLRenderer:",h,"not supported, using",l,"instead."),h=l);let u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&Be("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:h,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:v,maxVaryings:T,maxFragmentUniforms:b,maxSamples:w,samples:E}}function gy(i){let e=this,t=null,n=0,s=!1,r=!1,o=new ni,a=new Xe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,l(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=l(u,f,0)},this.setState=function(u,f,d){let p=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,g=i.get(u);if(!s||p===null||p.length===0||r&&!m)r?l(null):h();else{let v=r?0:n,T=v*4,b=g.clippingState||null;c.value=b,b=l(p,f,T,d);for(let w=0;w!==T;++w)b[w]=t[w];g.clippingState=b,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function h(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function l(u,f,d,p){let y=u!==null?u.length:0,m=null;if(y!==0){if(m=c.value,p!==!0||m===null){let g=d+y*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<g)&&(m=new Float32Array(g));for(let T=0,b=d;T!==y;++T,b+=4)o.copy(u[T]).applyMatrix4(v,a),o.normal.toArray(m,b),m[b+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}var Co=class extends Rn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Kr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ht(5,5,5),r=new qn({name:"CubemapFromEquirect",uniforms:bs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:xs});r.uniforms.tEquirect.value=t;let o=new ze(s,r),a=t.minFilter;return t.minFilter===Oi&&(t.minFilter=mn),new hr(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Rp=256,_y=3,xy=20,Kp=256,Qp=16,yy=3,vy=new B,Sy=new We,ul=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new hr(1,10,null),this._boxMesh=new ze(new ht(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=vy}=r,c=this._renderer;this._setSize(o);let h=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=c.autoClear,f=c.autoClearColor,d=c.autoClearDepth,p=c.autoClearStencil,y=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,y===null&&(e.background=c.getClearColor(Sy));let m=new hr(n,s,l);return m.position.copy(a),m.update(c,e),c.autoClear=u,c.autoClearColor=f,c.autoClearDepth=d,c.autoClearStencil=p,e.background=y,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(h,t)),this._applyPMREM(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ip(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Rp,vp(e))}_fromTexture(e,t){e.mapping===Ss||e.mapping===dr?this._setSize(e.image.length===0?Rp:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Pp(e,!1,!1),n=Math.log2(e)-_y;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Pp(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Ss||e.mapping===dr?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lp()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Ip()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=My(),this._integrationMaterial=by());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Qp);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-yy)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let c=a>0?Math.log2(t)+.5*Math.log2(6/(Kp*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Ty());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function Pp(i,e,t){return new Co(i,{minFilter:Oi,generateMipmaps:e,type:ri,colorSpace:zr,depthBuffer:t})}function Ro(i,e,t){return new qn({name:i,uniforms:e,vertexShader:Ze.cube_vert,fragmentShader:t,side:gn,blending:xs,depthTest:!1,depthWrite:!1})}function My(){return Ro("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Kp}u

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
	`)}function by(){return Ro("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Qp}},`

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
	`)}function Ty(){return Ro("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${xy}
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
	`)}function Ip(){return Ro("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Lp(){return Ro("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Ey(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===Mc||d===bc)if(e.has(f)){let p=e.get(f).texture;return a(p,f.mapping)}else{let p=f.image;if(p&&p.height>0){let y=new Co(p.height);return y.fromEquirectangularTexture(i,f),e.set(f,y),f.addEventListener("dispose",h),a(y.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let d=f.mapping,p=d===Mc||d===bc,y=d===Ss||d===dr;if(p||y){let m=t.get(f),g=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new ul(i)),m=p?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{let v=f.image;return p&&v&&v.height>0||y&&v&&c(v)?(n===null&&(n=new ul(i)),m=p?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",l),m.texture):null}}}return f}function a(f,d){return d===Mc?f.mapping=Ss:d===bc&&(f.mapping=dr),f}function c(f){let d=0,p=6;for(let y=0;y<p;y++)f[y]!==void 0&&d++;return d===p}function h(f){let d=f.target;d.removeEventListener("dispose",h);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function l(f){let d=f.target;d.removeEventListener("dispose",l);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Ay(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Or("WebGLRenderer: "+n+" extension not supported."),s}}}function wy(i,e,t,n){let s={},r=new WeakMap,o=new FinalizationRegistry(p=>delete s[p]);function a(p){c(p.target)}function c(p){p.index!==null&&e.remove(p.index);for(let m in p.attributes)e.remove(p.attributes[m]);p.removeEventListener("dispose",a),delete s[p.id],o.unregister(p);let y=r.get(p);y&&(e.remove(y),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function h(p,y){return s[y.id]!==void 0||(y.addEventListener("dispose",a),s[y.id]=new WeakRef(y),o.register(y,y.id,y),t.memory.geometries++),y}function l(p){let y=p.attributes;for(let m in y)e.update(y[m],i.ARRAY_BUFFER)}function u(p){let y=p.index,m=p.attributes.position,g=0;if(m===void 0)return;let v=y!==null?y.array.length:m.array.length/3-1,T=m.count>=65535?jr:Yr,b=new T(Math.ceil(v/3)*6,1),w=b.array;if(y!==null){let x=y.array;g=y.version;for(let M=0,S=0;M<v;M+=3){let _=x[M+0],R=x[M+1],I=x[M+2];w[S++]=_,w[S++]=R,w[S++]=R,w[S++]=I,w[S++]=I,w[S++]=_}}else{g=m.version;for(let x=0,M=0;x<v;x+=3){let S=x+0,_=x+1,R=x+2;w[M++]=S,w[M++]=_,w[M++]=_,w[M++]=R,w[M++]=R,w[M++]=S}}b.version=g;let E=r.get(p);E&&e.remove(E),r.set(p,b)}function f(p){let y=r.get(p);if(y){let m=p.index;m!==null&&y.version<m.version&&u(p)}else u(p);return r.get(p)}function d(){for(let p in s){let y=s[p].deref();y!==void 0&&c(y)}}return{get:h,update:l,getWireframeAttribute:f,dispose:d}}function Cy(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*o),t.update(f,n,1)}function h(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*o,d),t.update(f,n,d))}function l(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let y=0;for(let m=0;m<d;m++)y+=f[m];t.update(y,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=h,this.renderMultiDraw=l}function Ry(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Ve("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Py(i,e,t){let n=new WeakMap,s=new Tt;function r(o,a,c){let h=o.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=l!==void 0?l.length:0,f=n.get(a);if(f===void 0||f.count!==u){let S=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],T=0;d===!0&&(T=1),p===!0&&(T=2),y===!0&&(T=3);let b=a.attributes.position.count*T,w=1;b>e.maxTextureSize&&(w=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let E=new Float32Array(b*w*4*u),x=new Vr(E,b,w,u);x.type=Yn,x.needsUpdate=!0;let M=T*4;for(let _=0;_<u;_++){let R=m[_],I=g[_],D=v[_],P=b*w*4*_;for(let F=0;F<R.count;F++){let z=F*M;d===!0&&(s.fromBufferAttribute(R,F),E[P+z+0]=s.x,E[P+z+1]=s.y,E[P+z+2]=s.z,E[P+z+3]=0),p===!0&&(s.fromBufferAttribute(I,F),E[P+z+4]=s.x,E[P+z+5]=s.y,E[P+z+6]=s.z,E[P+z+7]=0),y===!0&&(s.fromBufferAttribute(D,F),E[P+z+8]=s.x,E[P+z+9]=s.y,E[P+z+10]=s.z,E[P+z+11]=D.itemSize===4?s.w:1)}}f={count:u,texture:x,size:new be(b,w)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let y=0;y<h.length;y++)d+=h[y];let p=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",p),c.getUniforms().setValue(i,"morphTargetInfluences",h)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Iy(i,e,t,n,s){let r=new WeakMap;function o(h){let l=s.render.frame,u=h.geometry,f=e.get(h,u);if(r.get(f)!==l&&(e.update(f),r.set(f,l)),h.isInstancedMesh&&(h.hasEventListener("dispose",c)===!1&&h.addEventListener("dispose",c),r.get(h)!==l&&(t.update(h.instanceMatrix,i.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,i.ARRAY_BUFFER),r.set(h,l))),h.isSkinnedMesh){let d=h.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return f}function a(){r=new WeakMap}function c(h){let l=h.target;l.removeEventListener("dispose",c),n.releaseStatesOfObject(l),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:o,dispose:a}}var Ly={[Xh]:"LINEAR_TONE_MAPPING",[qh]:"REINHARD_TONE_MAPPING",[Yh]:"CINEON_TONE_MAPPING",[jh]:"ACES_FILMIC_TONE_MAPPING",[Zh]:"AGX_TONE_MAPPING",[$h]:"NEUTRAL_TONE_MAPPING",[Jh]:"CUSTOM_TONE_MAPPING"};function Dy(i,e,t,n,s,r){let o=new Rn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,h=null,l=new It;l.setAttribute("position",new ot([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ot([0,2,0,0,2,0],2));let u=new sc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new ze(l,u),d=new go(-1,1,1,-1,0,1),p=null,y=null,m=!1,g,v=null,T=[],b=!1;this.setSize=function(w,E){o.setSize(w,E),a!==null&&a.setSize(w,E),c!==null&&c.setSize(w,E);for(let x=0;x<T.length;x++){let M=T[x];M.setSize&&M.setSize(w,E)}},this.setEffects=function(w){T=w,b=T.length>0&&T[0].isRenderPass===!0;let E=o.width,x=o.height;T.length>0&&a===null&&(a=new Rn(E,x,{type:ri,depthBuffer:!1,stencilBuffer:!1}),c=new Rn(E,x,{type:ri,depthBuffer:!1,stencilBuffer:!1}));let M=s===!0&&T.some(S=>S.needsDepthTexture===!0);M!==(o.depthTexture!==null)&&(M===!0&&h===null&&(h=new Ui(E,x),r===!0&&(h.format=Fi,h.type=Ms)),o.dispose(),o.depthTexture=M?h:null,o.resolveDepthBuffer=M,o.storeMultisampledDepthBuffer=M);for(let S=0;S<T.length;S++){let _=T[S];_.setSize&&_.setSize(E,x),M&&_.needsDepthTexture===!0&&_.setDepthTexture&&_.setDepthTexture(h)}},this.begin=function(w,E){if(m||w.toneMapping===_i&&T.length===0)return!1;if(v=E,E!==null){let x=E.width,M=E.height;(o.width!==x||o.height!==M)&&this.setSize(x,M)}return b===!1&&w.setRenderTarget(o),g=w.toneMapping,w.toneMapping=_i,!0},this.hasRenderPass=function(){return b},this.end=function(w,E){w.toneMapping=g,m=!0;let x=o,M=a;for(let S=0;S<T.length;S++){let _=T[S];_.enabled!==!1&&(_.render(w,M,x,E),_.needsSwap!==!1&&(x=M,M=M===a?c:a))}if(p!==w.outputColorSpace||y!==w.toneMapping){p=w.outputColorSpace,y=w.toneMapping,u.defines={},it.getTransfer(p)===ut&&(u.defines.SRGB_TRANSFER="");let S=Ly[y];S&&(u.defines[S]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=x.texture,w.setRenderTarget(v),w.render(f,d),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var em=new vn,tm=new Ui(1,1),nm=new Qr(1),im=new Vr,sm=new Ja,rm=new Kr,Dp=[],Np=[],Up=new Float32Array(16),Op=new Float32Array(9),Fp=new Float32Array(4);function _r(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Dp[s];if(r===void 0&&(r=new Float32Array(s),Dp[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function dl(i,e){let t=Np[e];t===void 0&&(t=new Int32Array(e),Np[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ny(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Uy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2fv(this.addr,e),Xt(t,e)}}function Oy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;i.uniform3fv(this.addr,e),Xt(t,e)}}function Fy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4fv(this.addr,e),Xt(t,e)}}function ky(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Fp.set(n),i.uniformMatrix2fv(this.addr,!1,Fp),Xt(t,n)}}function By(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Op.set(n),i.uniformMatrix3fv(this.addr,!1,Op),Xt(t,n)}}function zy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Up.set(n),i.uniformMatrix4fv(this.addr,!1,Up),Xt(t,n)}}function Hy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Gy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2iv(this.addr,e),Xt(t,e)}}function Vy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3iv(this.addr,e),Xt(t,e)}}function Wy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4iv(this.addr,e),Xt(t,e)}}function Xy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function qy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2uiv(this.addr,e),Xt(t,e)}}function Yy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3uiv(this.addr,e),Xt(t,e)}}function jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4uiv(this.addr,e),Xt(t,e)}}function pl(i){return i.version===0&&(i.compareFunction=au,i.needsUpdate=!0),i}function Jy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=pl(tm):r=em,t.setTexture2D(e||r,s)}function Zy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||sm,s)}function $y(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=pl(nm):r=rm,t.setTextureCube(e||r,s)}function Ky(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||im,s)}function Qy(i){switch(i){case 5126:return Ny;case 35664:return Uy;case 35665:return Oy;case 35666:return Fy;case 35674:return ky;case 35675:return By;case 35676:return zy;case 5124:case 35670:return Hy;case 35667:case 35671:return Gy;case 35668:case 35672:return Vy;case 35669:case 35673:return Wy;case 5125:return Xy;case 36294:return qy;case 36295:return Yy;case 36296:return jy;case 35678:case 36198:case 36298:case 36306:case 35682:return Jy;case 35679:case 36299:case 36307:return Zy;case 35680:case 36300:case 36308:case 36293:return $y;case 36289:case 36303:case 36311:case 36292:return Ky}}function ev(i,e){i.uniform1fv(this.addr,e)}function tv(i,e){let t=_r(e,this.size,2);i.uniform2fv(this.addr,t)}function nv(i,e){let t=_r(e,this.size,3);i.uniform3fv(this.addr,t)}function iv(i,e){let t=_r(e,this.size,4);i.uniform4fv(this.addr,t)}function sv(i,e){let t=_r(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function rv(i,e){let t=_r(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ov(i,e){let t=_r(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function av(i,e){i.uniform1iv(this.addr,e)}function cv(i,e){i.uniform2iv(this.addr,e)}function lv(i,e){i.uniform3iv(this.addr,e)}function hv(i,e){i.uniform4iv(this.addr,e)}function uv(i,e){i.uniform1uiv(this.addr,e)}function fv(i,e){i.uniform2uiv(this.addr,e)}function dv(i,e){i.uniform3uiv(this.addr,e)}function pv(i,e){i.uniform4uiv(this.addr,e)}function mv(i,e,t){let n=this.cache,s=e.length,r=dl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=pl(tm):o=em;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function gv(i,e,t){let n=this.cache,s=e.length,r=dl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||sm,r[o])}function _v(i,e,t){let n=this.cache,s=e.length,r=dl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=pl(nm):o=rm;for(let a=0;a!==s;++a)t.setTextureCube(e[a]||o,r[a])}function xv(i,e,t){let n=this.cache,s=e.length,r=dl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||im,r[o])}function yv(i){switch(i){case 5126:return ev;case 35664:return tv;case 35665:return nv;case 35666:return iv;case 35674:return sv;case 35675:return rv;case 35676:return ov;case 5124:case 35670:return av;case 35667:case 35671:return cv;case 35668:case 35672:return lv;case 35669:case 35673:return hv;case 5125:return uv;case 36294:return fv;case 36295:return dv;case 36296:return pv;case 35678:case 36198:case 36298:case 36306:case 35682:return mv;case 35679:case 36299:case 36307:return gv;case 35680:case 36300:case 36308:case 36293:return _v;case 36289:case 36303:case 36311:case 36292:return xv}}var bu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Qy(t.type)}},Tu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=yv(t.type)}},Eu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Su=/(\w+)(\])?(\[|\.)?/g;function kp(i,e){i.seq.push(e),i.map[e.id]=e}function vv(i,e,t){let n=i.name,s=n.length;for(Su.lastIndex=0;;){let r=Su.exec(n),o=Su.lastIndex,a=r[1],c=r[2]==="]",h=r[3];if(c&&(a=a|0),h===void 0||h==="["&&o+2===s){kp(t,h===void 0?new bu(a,i,e):new Tu(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Eu(a),kp(t,u)),t=u}}}var gr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);vv(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Bp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Sv=37297,Mv=0;function bv(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var zp=new Xe;function Tv(i){it._getMatrix(zp,it.workingColorSpace,i);let e=`mat3( ${zp.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case Hr:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Hp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+bv(i.getShaderSource(e),a)}else return r}function Ev(i,e){let t=Tv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Av={[Xh]:"Linear",[qh]:"Reinhard",[Yh]:"Cineon",[jh]:"ACESFilmic",[Zh]:"AgX",[$h]:"Neutral",[Jh]:"Custom"};function wv(i,e){let t=Av[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var hl=new B;function Cv(){it.getLuminanceCoefficients(hl);let i=hl.x.toFixed(4),e=hl.y.toFixed(4),t=hl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Rv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wo).join(`
`)}function Pv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Iv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function wo(i){return i!==""}function Gp(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Vp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Lv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Au(i){return i.replace(Lv,Dv)}function Dv(i,e){let t=Ze[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Au(t)}var Nv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wp(i){return i.replace(Nv,Uv)}function Uv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xp(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Ov={[xo]:"SHADOWMAP_TYPE_PCF",[ur]:"SHADOWMAP_TYPE_VSM"};function Fv(i){return Ov[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var kv={[dr]:"ENVMAP_MODE_REFRACTION"};function Bv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":kv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var zv={[Sc]:"ENVMAP_BLENDING_MULTIPLY",[sp]:"ENVMAP_BLENDING_MIX",[rp]:"ENVMAP_BLENDING_ADD"};function Hv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":zv[i.combine]||"ENVMAP_BLENDING_NONE"}function Gv(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Fv(t),h=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",l=Bv(t),u=Hv(t),f=Rv(t),d=Pv(r),p=s.createProgram(),y,m,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(wo).join(`
`),y.length>0&&(y+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(wo).join(`
`),m.length>0&&(m+=`
`)):(y=[Xp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wo).join(`
`),m=[Xp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_i?"#define TONE_MAPPING":"",t.toneMapping!==_i?Ze.tonemapping_pars_fragment:"",t.toneMapping!==_i?wv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,Ev("linearToOutputTexel",t.outputColorSpace),Cv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wo).join(`
`)),o=Au(o),o=Gp(o,t),o=Vp(o,t),a=Au(a),a=Gp(a,t),a=Vp(a,t),o=Wp(o),a=Wp(a),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,y=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,m=["#define varying in",t.glslVersion===cu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===cu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let v=g+y+o,T=g+m+a,b=Bp(s,s.VERTEX_SHADER,v),w=Bp(s,s.FRAGMENT_SHADER,T);s.attachShader(p,b),s.attachShader(p,w),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function E(_){if(i.debug.checkShaderErrors){let R=s.getProgramInfoLog(p)||"",I=s.getShaderInfoLog(b)||"",D=s.getShaderInfoLog(w)||"",P=R.trim(),F=I.trim(),z=D.trim(),O=!0,W=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,b,w);else{let X=Hp(s,b,"vertex"),Z=Hp(s,w,"fragment");Ve("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+_.name+`
Material Type: `+_.type+`

Program Info Log: `+P+`
`+X+`
`+Z)}else P!==""?Be("WebGLProgram: Program Info Log:",P):(F===""||z==="")&&(W=!1);W&&(_.diagnostics={runnable:O,programLog:P,vertexShader:{log:F,prefix:y},fragmentShader:{log:z,prefix:m}})}s.deleteShader(b),s.deleteShader(w),x=new gr(s,p),M=Iv(s,p)}let x;this.getUniforms=function(){return x===void 0&&E(this),x};let M;this.getAttributes=function(){return M===void 0&&E(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(p,Sv)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Mv++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=b,this.fragmentShader=w,this}var Vv=0,wu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Cu(e),t.set(e,n)),n}},Cu=class{constructor(e){this.id=Vv++,this.code=e,this.usedTimes=0}};function Wv(i){return i===ns||i===To||i===Eo}function Xv(i,e,t,n,s,r){let o=new Wr,a=new wu,c=new Set,h=[],l=new Map,u=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(x){return c.add(x),x===0?"uv":`uv${x}`}function p(x,M,S,_,R,I){let D=_.fog,P=R.geometry,F=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?_.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,O=e.get(x.envMap||F,z),W=f[x.type],X=n.precision;x.precision!==null&&(X=n.getMaxPrecision(x.precision),X!==x.precision&&Be("WebGLProgram.getParameters:",x.precision,"not supported, using",X,"instead."));let Z=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,ee=Z!==void 0?Z.length:0,_e=0;P.morphAttributes.position!==void 0&&(_e=1),P.morphAttributes.normal!==void 0&&(_e=2),P.morphAttributes.color!==void 0&&(_e=3);let Le,Y,se,ve;if(W){let xe=yi[W];Le=xe.vertexShader,Y=xe.fragmentShader}else{Le=x.vertexShader,Y=x.fragmentShader;let xe=a.getVertexShaderStage(x),ft=a.getFragmentShaderStage(x);a.update(x,xe,ft),se=xe.id,ve=ft.id}let De=i.getRenderTarget(),de=i.state.buffers.depth.getReversed(),Ge=R.isInstancedMesh===!0,xt=R.isBatchedMesh===!0,Fe=!!x.map,Qe=!!x.matcap,pt=!!O,et=pt&&O.isPMREMTexture===!0,Qt=!!x.aoMap,zt=!!x.lightMap,xn=!!x.bumpMap&&x.wireframe===!1,Et=!!x.normalMap,ci=!!x.displacementMap,qt=!!x.emissiveMap,Un=!!x.metalnessMap,On=!!x.roughnessMap,Fn=x.anisotropy>0,k=x.clearcoat>0,kn=x.diffuseRoughness>0,St=x.dispersion>0,Mt=x.retroreflectivity>0,ge=x.iridescence>0,Ht=x.sheen>0,ke=x.transmission>0,qe=Fn&&!!x.anisotropyMap,L=k&&!!x.clearcoatMap,A=k&&!!x.clearcoatNormalMap,G=k&&!!x.clearcoatRoughnessMap,ie=kn&&!!x.diffuseRoughnessMap,te=ge&&!!x.iridescenceMap,ce=ge&&!!x.iridescenceThicknessMap,pe=Ht&&!!x.sheenColorMap,$=Ht&&!!x.sheenRoughnessMap,K=!!x.specularMap,he=!!x.specularColorMap,N=!!x.specularIntensityMap,Q=ke&&!!x.transmissionMap,j=ke&&!!x.thicknessMap,ue=!!x.gradientMap,ae=!!x.alphaMap,le=x.alphaTest>0,Ne=!!x.alphaHash,Je=!!x.extensions,re=_i;x.toneMapped&&(De===null||De.isXRRenderTarget===!0)&&(re=i.toneMapping);let Oe=et?O.isCompressedCubeTexture?O.image[0].mipmaps:O.mipmaps:null,je={shaderID:W,shaderType:x.type,shaderName:x.name,vertexShader:Le,fragmentShader:Y,defines:x.defines,customVertexShaderID:se,customFragmentShaderID:ve,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:X,batching:xt,batchingColor:xt&&R._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&R.instanceColor!==null,instancingMorph:Ge&&R.morphTexture!==null,outputColorSpace:De===null?i.outputColorSpace:De.isXRRenderTarget===!0?De.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Fe,matcap:Qe,envMap:pt,envMapMode:pt&&O.mapping,envMapPMREM:et,envMapMaxLod:et?Oe.length-1:null,envMapSize:et?Oe[0].width:null,aoMap:Qt,lightMap:zt,bumpMap:xn,normalMap:Et,displacementMap:ci,emissiveMap:qt,normalMapObjectSpace:Et&&x.normalMapType===cp,normalMapTangentSpace:Et&&x.normalMapType===cl,packedNormalMap:Et&&x.normalMapType===cl&&Wv(x.normalMap.format),metalnessMap:Un,roughnessMap:On,anisotropy:Fn,anisotropyMap:qe,clearcoat:k,clearcoatMap:L,clearcoatNormalMap:A,clearcoatRoughnessMap:G,diffuseRoughness:kn,diffuseRoughnessMap:ie,dispersion:St,retroreflection:Mt,iridescence:ge,iridescenceMap:te,iridescenceThicknessMap:ce,sheen:Ht,sheenColorMap:pe,sheenRoughnessMap:$,specularMap:K,specularColorMap:he,specularIntensityMap:N,transmission:ke,transmissionMap:Q,thicknessMap:j,gradientMap:ue,opaque:x.transparent===!1&&x.blending===fr&&x.alphaToCoverage===!1,alphaMap:ae,alphaTest:le,alphaHash:Ne,combine:x.combine,mapUv:Fe&&d(x.map.channel),aoMapUv:Qt&&d(x.aoMap.channel),lightMapUv:zt&&d(x.lightMap.channel),bumpMapUv:xn&&d(x.bumpMap.channel),normalMapUv:Et&&d(x.normalMap.channel),displacementMapUv:ci&&d(x.displacementMap.channel),emissiveMapUv:qt&&d(x.emissiveMap.channel),metalnessMapUv:Un&&d(x.metalnessMap.channel),roughnessMapUv:On&&d(x.roughnessMap.channel),anisotropyMapUv:qe&&d(x.anisotropyMap.channel),clearcoatMapUv:L&&d(x.clearcoatMap.channel),clearcoatNormalMapUv:A&&d(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:G&&d(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ie&&d(x.diffuseRoughnessMap.channel),iridescenceMapUv:te&&d(x.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&d(x.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&d(x.sheenColorMap.channel),sheenRoughnessMapUv:$&&d(x.sheenRoughnessMap.channel),specularMapUv:K&&d(x.specularMap.channel),specularColorMapUv:he&&d(x.specularColorMap.channel),specularIntensityMapUv:N&&d(x.specularIntensityMap.channel),transmissionMapUv:Q&&d(x.transmissionMap.channel),thicknessMapUv:j&&d(x.thicknessMap.channel),alphaMapUv:ae&&d(x.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(Et||Fn),vertexNormals:!!P.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!P.attributes.uv&&(Fe||ae),fog:!!D,useFog:x.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||P.attributes.normal===void 0&&Et===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:de,skinning:R.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:_e,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:I.filter(xe=>xe.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&S.length>0,shadowMapType:i.shadowMap.type,toneMapping:re,decodeVideoTexture:Fe&&x.map.isVideoTexture===!0&&it.getTransfer(x.map.colorSpace)===ut,decodeVideoTextureEmissive:qt&&x.emissiveMap.isVideoTexture===!0&&it.getTransfer(x.emissiveMap.colorSpace)===ut,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===$t,flipSided:x.side===gn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Je&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&x.extensions.multiDraw===!0||xt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return je.vertexUv1s=c.has(1),je.vertexUv2s=c.has(2),je.vertexUv3s=c.has(3),c.clear(),je}function y(x){let M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(let S in x.defines)M.push(S),M.push(x.defines[S]);return x.isRawShaderMaterial===!1&&(m(M,x),g(M,x),M.push(i.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function m(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapPMREM),x.push(M.envMapMaxLod),x.push(M.envMapSize),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.diffuseRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.numSunLights),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numSunLightShadows),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.numLightProbeGrids),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function g(x,M){o.disableAll(),M.instancing&&o.enable(0),M.instancingColor&&o.enable(1),M.instancingMorph&&o.enable(2),M.matcap&&o.enable(3),M.envMap&&o.enable(4),M.normalMapObjectSpace&&o.enable(5),M.normalMapTangentSpace&&o.enable(6),M.clearcoat&&o.enable(7),M.iridescence&&o.enable(8),M.alphaTest&&o.enable(9),M.vertexColors&&o.enable(10),M.vertexAlphas&&o.enable(11),M.vertexUv1s&&o.enable(12),M.vertexUv2s&&o.enable(13),M.vertexUv3s&&o.enable(14),M.vertexTangents&&o.enable(15),M.anisotropy&&o.enable(16),M.alphaHash&&o.enable(17),M.batching&&o.enable(18),M.dispersion&&o.enable(19),M.retroreflection&&o.enable(24),M.diffuseRoughness&&o.enable(25),M.batchingColor&&o.enable(20),M.gradientMap&&o.enable(21),M.packedNormalMap&&o.enable(22),M.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),M.numLightProbeGrids>0&&o.enable(22),M.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function v(x){let M=f[x.type],S;if(M){let _=yi[M];S=Ap.clone(_.uniforms)}else S=x.uniforms;return S}function T(x,M){let S=l.get(M);return S!==void 0?++S.usedTimes:(S=new Gv(i,M,x,s),h.push(S),l.set(M,S)),S}function b(x){if(--x.usedTimes===0){let M=h.indexOf(x);h[M]=h[h.length-1],h.pop(),l.delete(x.cacheKey),x.destroy()}}function w(x){a.remove(x)}function E(){a.dispose()}return{getParameters:p,getProgramCacheKey:y,getUniforms:v,acquireProgram:T,releaseProgram:b,releaseShaderCache:w,programs:h,dispose:E}}function qv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Yv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function qp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Yp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,p,y,m,g){let v=i[e];return v===void 0?(v={id:f.id,object:f,geometry:d,material:p,materialVariant:o(f),groupOrder:y,renderOrder:f.renderOrder,z:m,group:g},i[e]=v):(v.id=f.id,v.object=f,v.geometry=d,v.material=p,v.materialVariant=o(f),v.groupOrder=y,v.renderOrder=f.renderOrder,v.z=m,v.group=g),e++,v}function c(f,d,p,y,m,g,v){v.reversedDepth===!0&&(m=-m);let T=a(f,d,p,y,m,g);p.transmission>0?n.push(T):p.transparent===!0?s.push(T):t.push(T)}function h(f,d,p,y,m,g){let v=a(f,d,p,y,m,g);p.transmission>0?n.unshift(v):p.transparent===!0?s.unshift(v):t.unshift(v)}function l(f,d){t.length>1&&t.sort(f||Yv),n.length>1&&n.sort(d||qp),s.length>1&&s.sort(d||qp)}function u(){for(let f=e,d=i.length;f<d;f++){let p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:h,finish:u,sort:l}}function jv(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Yp,i.set(n,[o])):s>=r.length?(o=new Yp,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Jv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new B,color:new We};break;case"SpotLight":t={position:new B,direction:new B,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function Zv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var $v=0;function Kv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Qv(i){let e=new Jv,t=Zv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new B);let s=new B,r=new lt,o=new lt;function a(h){let l=0,u=0,f=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let d=0,p=0,y=0,m=0,g=0,v=0,T=0,b=0,w=0,E=0,x=0,M=0,S=0,_=0;h.sort(Kv);for(let I=0,D=h.length;I<D;I++){let P=h[I],F=P.color,z=P.intensity,O=P.distance,W=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===ns?W=P.shadow.map.texture:W=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)l+=F.r*z,u+=F.g*z,f+=F.b*z;else if(P.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(P.sh.coefficients[X],z);_++}else if(P.isSunLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Z=P.shadow,ee=t.get(P);ee.shadowIntensity=Z.intensity,ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),n.sunShadow[p]=ee,n.sunShadowMap[p]=W;let _e=Z.getViewportCount();for(let Le=0;Le<_e;Le++)n.sunShadowMatrix[y+Le]=Z.getMatrix(Le),n.sunShadowCascade[y+Le]=Z._cascadeData[Le];y+=_e,p++}n.sun[d]=X,d++}else if(P.isDirectionalLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Z=P.shadow,ee=t.get(P);ee.shadowIntensity=Z.intensity,ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,n.directionalShadow[m]=ee,n.directionalShadowMap[m]=W,n.directionalShadowMatrix[m]=P.shadow.matrix,w++}n.directional[m]=X,m++}else if(P.isSpotLight){let X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(F).multiplyScalar(z),X.distance=O,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,n.spot[v]=X;let Z=P.shadow;if(P.map&&(n.spotLightMap[M]=P.map,M++,Z.updateMatrices(P),P.castShadow&&S++),n.spotLightMatrix[v]=Z.matrix,P.castShadow){let ee=t.get(P);ee.shadowIntensity=Z.intensity,ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,n.spotShadow[v]=ee,n.spotShadowMap[v]=W,x++}v++}else if(P.isRectAreaLight){let X=e.get(P);X.color.copy(F).multiplyScalar(z),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),n.rectArea[T]=X,T++}else if(P.isPointLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){let Z=P.shadow,ee=t.get(P);ee.shadowIntensity=Z.intensity,ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,ee.shadowCameraNear=Z.camera.near,ee.shadowCameraFar=Z.camera.far,n.pointShadow[g]=ee,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=P.shadow.matrix,E++}n.point[g]=X,g++}else if(P.isHemisphereLight){let X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(z),X.groundColor.copy(P.groundColor).multiplyScalar(z),n.hemi[b]=X,b++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=u,n.ambient[2]=f;let R=n.hash;(R.sunLength!==d||R.directionalLength!==m||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==T||R.hemiLength!==b||R.numSunShadows!==p||R.numDirectionalShadows!==w||R.numPointShadows!==E||R.numSpotShadows!==x||R.numSpotMaps!==M||R.numLightProbes!==_)&&(n.sun.length=d,n.directional.length=m,n.spot.length=v,n.rectArea.length=T,n.point.length=g,n.hemi.length=b,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+M-S,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=_,R.sunLength=d,R.directionalLength=m,R.pointLength=g,R.spotLength=v,R.rectAreaLength=T,R.hemiLength=b,R.numSunShadows=p,R.numDirectionalShadows=w,R.numPointShadows=E,R.numSpotShadows=x,R.numSpotMaps=M,R.numLightProbes=_,n.version=$v++)}function c(h,l){let u=0,f=0,d=0,p=0,y=0,m=0,g=l.matrixWorldInverse;for(let v=0,T=h.length;v<T;v++){let b=h[v];if(b.isSunLight){let w=n.sun[u];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(g),u++}else if(b.isDirectionalLight){let w=n.directional[f];w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),f++}else if(b.isSpotLight){let w=n.spot[p];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),p++}else if(b.isRectAreaLight){let w=n.rectArea[y];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(g),o.identity(),r.copy(b.matrixWorld),r.premultiply(g),o.extractRotation(r),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),y++}else if(b.isPointLight){let w=n.point[d];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(g),d++}else if(b.isHemisphereLight){let w=n.hemi[m];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(g),m++}}}return{setup:a,setupView:c,state:n}}function jp(i){let e=new Qv(i),t=[],n=[],s=[];function r(u){l.camera=u,t.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):t.push(u)}function a(u){n.push(u)}function c(){e.setup(t),s.sort((u,f)=>u.priority-f.priority||u.id-f.id)}function h(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:l,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a}}function eS(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new jp(i),e.set(s,[a])):r>=o.length?(a=new jp(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var tS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nS=`uniform sampler2D shadow_pass;
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
}`,iS=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],sS=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],Jp=new lt,Ao=new B,Mu=new B;function rS(i,e,t){let n=new Zi,s=new be,r=new be,o=new Tt,a=new rc,c=new oc,h={},l=t.maxTextureSize,u={[ts]:gn,[gn]:ts,[$t]:$t},f=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:tS,fragmentShader:nS}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let p=new It;p.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ze(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xo;let g=this.type;this.render=function(E,x,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===zd&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=xo);let S=i.getRenderTarget(),_=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),I=i.state;I.setBlending(xs),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let D=g!==this.type;D&&x.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(F=>F.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,F=E.length;P<F;P++){let z=E[P],O=z.shadow;if(O===void 0){Be("WebGLShadowMap:",z,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);let W=O.getFrameExtents();s.multiply(W),r.copy(O.mapSize),(s.x>l||s.y>l)&&(s.x>l&&(r.x=Math.floor(l/W.x),s.x=r.x*W.x,O.mapSize.x=r.x),s.y>l&&(r.y=Math.floor(l/W.y),s.y=r.y*W.y,O.mapSize.y=r.y));let X=i.state.buffers.depth.getReversed();if(O.camera._reversedDepth=X,O.map===null||D===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===ur){if(z.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new Rn(s.x,s.y,{format:ns,type:ri,minFilter:mn,magFilter:mn,generateMipmaps:!1}),O.map.texture.name=z.name+".shadowMap",O.map.depthTexture=new Ui(s.x,s.y,Yn),O.map.depthTexture.name=z.name+".shadowMapDepth",O.map.depthTexture.format=Li,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Zt,O.map.depthTexture.magFilter=Zt}else z.isPointLight?(O.map=new Co(s.x),O.map.depthTexture=new Qr(s.x,si)):(O.map=new Rn(s.x,s.y),O.map.depthTexture=new Ui(s.x,s.y,si)),O.map.depthTexture.name=z.name+".shadowMap",O.map.depthTexture.format=Li,this.type===xo?(O.map.depthTexture.compareFunction=X?ou:ru,O.map.depthTexture.minFilter=mn,O.map.depthTexture.magFilter=mn):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Zt,O.map.depthTexture.magFilter=Zt);O.camera.updateProjectionMatrix()}O.map.isWebGLCubeRenderTarget!==!0&&(O.map.width!==s.x||O.map.height!==s.y)&&O.map.setSize(s.x,s.y);let Z=O.map.isWebGLCubeRenderTarget?6:O.getViewportCount();z.isPointLight!==!0&&O.updateMatrices(z,M);let ee=(O.camera.layers.mask&4294967294)!==0?O.camera.layers:M.layers;for(let _e=0;_e<Z;_e++){let Le=O.getCamera(_e);if(z.isPointLight){let Y=O.camera,se=O.matrix,ve=z.distance||Y.far;ve!==Y.far&&(Y.far=ve,Y.updateProjectionMatrix()),Ao.setFromMatrixPosition(z.matrixWorld),Y.position.copy(Ao),Mu.copy(Y.position),Mu.add(iS[_e]),Y.up.copy(sS[_e]),Y.lookAt(Mu),Y.updateMatrixWorld(),se.makeTranslation(-Ao.x,-Ao.y,-Ao.z),Jp.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),O._frustum.setFromProjectionMatrix(Jp,Y.coordinateSystem,Y.reversedDepth)}if(O.map.isWebGLCubeRenderTarget)i.setRenderTarget(O.map,_e),i.clear();else{_e===0&&(i.setRenderTarget(O.map),i.clear());let Y=O.getViewport(_e);o.set(r.x*Y.x,r.y*Y.y,r.x*Y.z,r.y*Y.w),I.viewport(o)}n=O.getFrustum(_e),b(x,M,Le,z,ee,this.type)}O.isPointLightShadow!==!0&&this.type===ur&&v(O,M),O.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(S,_,R)};function v(E,x){let M=e.update(y);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null?E.mapPass=new Rn(s.x,s.y,{format:ns,type:ri}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(x,null,M,f,y,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(x,null,M,d,y,null)}function T(E,x,M,S){let _=null,R=M.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)_=R;else if(_=M.isPointLight===!0?c:a,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let I=_.uuid,D=x.uuid,P=h[I];P===void 0&&(P={},h[I]=P);let F=P[D];F===void 0&&(F=_.clone(),P[D]=F,x.addEventListener("dispose",w)),_=F}if(_.visible=x.visible,_.wireframe=x.wireframe,S===ur?_.side=x.shadowSide!==null?x.shadowSide:x.side:_.side=x.shadowSide!==null?x.shadowSide:u[x.side],_.alphaMap=x.alphaMap,_.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,_.map=x.map,_.clipShadows=x.clipShadows,_.clippingPlanes=x.clippingPlanes,_.clipIntersection=x.clipIntersection,_.displacementMap=x.displacementMap,_.displacementScale=x.displacementScale,_.displacementBias=x.displacementBias,_.wireframeLinewidth=x.wireframeLinewidth,_.linewidth=x.linewidth,M.isPointLight===!0&&_.isMeshDistanceMaterial===!0){let I=i.properties.get(_);I.light=M}return _}function b(E,x,M,S,_,R){if(E.visible===!1)return;if(E.layers.test(_)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&R===ur)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,E.matrixWorld);let P=e.update(E),F=E.material;if(Array.isArray(F)){let z=P.groups;for(let O=0,W=z.length;O<W;O++){let X=z[O],Z=F[X.materialIndex];if(Z&&Z.visible){let ee=T(E,Z,S,R);E.onBeforeShadow(i,E,x,M,P,ee,X),i.renderBufferDirect(M,null,P,ee,E,X),E.onAfterShadow(i,E,x,M,P,ee,X)}}}else if(F.visible){let z=T(E,F,S,R);E.onBeforeShadow(i,E,x,M,P,z,null),i.renderBufferDirect(M,null,P,z,E,null),E.onAfterShadow(i,E,x,M,P,z,null)}}let D=E.children;for(let P=0,F=D.length;P<F;P++)b(D[P],x,M,S,_,R)}function w(E){E.target.removeEventListener("dispose",w);for(let M in h){let S=h[M],_=E.target.uuid;_ in S&&(S[_].dispose(),delete S[_])}}}function oS(i,e){function t(){let N=!1,Q=new Tt,j=null,ue=new Tt(0,0,0,0);return{setMask:function(ae){j!==ae&&!N&&(i.colorMask(ae,ae,ae,ae),j=ae)},setLocked:function(ae){N=ae},setClear:function(ae,le,Ne,Je,re){re===!0&&(ae*=Je,le*=Je,Ne*=Je),Q.set(ae,le,Ne,Je),ue.equals(Q)===!1&&(i.clearColor(ae,le,Ne,Je),ue.copy(Q))},reset:function(){N=!1,j=null,ue.set(-1,0,0,0)}}}function n(){let N=!1,Q=!1,j=null,ue=null,ae=null;return{setReversed:function(le){if(Q!==le){let Ne=e.get("EXT_clip_control");le?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),Q=le;let Je=ae;ae=null,this.setClear(Je)}},getReversed:function(){return Q},setTest:function(le){le?de(i.DEPTH_TEST):Ge(i.DEPTH_TEST)},setMask:function(le){j!==le&&!N&&(i.depthMask(le),j=le)},setFunc:function(le){if(Q&&(le=yp[le]),ue!==le){switch(le){case Fa:i.depthFunc(i.NEVER);break;case ka:i.depthFunc(i.ALWAYS);break;case Ba:i.depthFunc(i.LESS);break;case Zs:i.depthFunc(i.LEQUAL);break;case za:i.depthFunc(i.EQUAL);break;case Ha:i.depthFunc(i.GEQUAL);break;case $s:i.depthFunc(i.GREATER);break;case Ga:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ue=le}},setLocked:function(le){N=le},setClear:function(le){ae!==le&&(ae=le,Q&&(le=1-le),i.clearDepth(le))},reset:function(){N=!1,j=null,ue=null,ae=null,Q=!1}}}function s(){let N=!1,Q=null,j=null,ue=null,ae=null,le=null,Ne=null,Je=null,re=null;return{setTest:function(Oe){N||(Oe?de(i.STENCIL_TEST):Ge(i.STENCIL_TEST))},setMask:function(Oe){Q!==Oe&&!N&&(i.stencilMask(Oe),Q=Oe)},setFunc:function(Oe,je,xe){(j!==Oe||ue!==je||ae!==xe)&&(i.stencilFunc(Oe,je,xe),j=Oe,ue=je,ae=xe)},setOp:function(Oe,je,xe){(le!==Oe||Ne!==je||Je!==xe)&&(i.stencilOp(Oe,je,xe),le=Oe,Ne=je,Je=xe)},setLocked:function(Oe){N=Oe},setClear:function(Oe){re!==Oe&&(i.clearStencil(Oe),re=Oe)},reset:function(){N=!1,Q=null,j=null,ue=null,ae=null,le=null,Ne=null,Je=null,re=null}}}let r=new t,o=new n,a=new s,c={},h=new WeakMap,l={},u={},f={},d=new WeakMap,p=[],y=null,m=!1,g=null,v=null,T=null,b=null,w=null,E=null,x=null,M=new We(0,0,0),S=0,_=!1,R=null,I=null,D=null,P=null,F=null,z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),O=!1,W=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(X)[1]),O=W>=1):X.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),O=W>=2);let Z=null,ee={},_e=i.getParameter(i.SCISSOR_BOX),Le=i.getParameter(i.VIEWPORT),Y=new Tt().fromArray(_e),se=new Tt().fromArray(Le);function ve(N,Q,j,ue){let ae=new Uint8Array(4),le=i.createTexture();i.bindTexture(N,le),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ne=0;Ne<j;Ne++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(Q,0,i.RGBA,1,1,ue,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(Q+Ne,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return le}let De={};De[i.TEXTURE_2D]=ve(i.TEXTURE_2D,i.TEXTURE_2D,1),De[i.TEXTURE_CUBE_MAP]=ve(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),De[i.TEXTURE_2D_ARRAY]=ve(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),De[i.TEXTURE_3D]=ve(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),de(i.DEPTH_TEST),o.setFunc(Zs),xn(!1),Et(zh),de(i.CULL_FACE),Qt(xs);function de(N){l[N]!==!0&&(i.enable(N),l[N]=!0)}function Ge(N){l[N]!==!1&&(i.disable(N),l[N]=!1)}function xt(N,Q){return f[N]!==Q?(i.bindFramebuffer(N,Q),f[N]=Q,N===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=Q),N===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=Q),!0):!1}function Fe(N,Q){let j=p,ue=!1;if(N){j=d.get(Q),j===void 0&&(j=[],d.set(Q,j));let ae=N.textures;if(j.length!==ae.length||j[0]!==i.COLOR_ATTACHMENT0){for(let le=0,Ne=ae.length;le<Ne;le++)j[le]=i.COLOR_ATTACHMENT0+le;j.length=ae.length,ue=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,ue=!0);ue&&i.drawBuffers(j)}function Qe(N){return y!==N?(i.useProgram(N),y=N,!0):!1}let pt={[vs]:i.FUNC_ADD,[Hd]:i.FUNC_SUBTRACT,[Gd]:i.FUNC_REVERSE_SUBTRACT};pt[Vd]=i.MIN,pt[Wd]=i.MAX;let et={[Xd]:i.ZERO,[qd]:i.ONE,[Yd]:i.SRC_COLOR,[Vh]:i.SRC_ALPHA,[Qd]:i.SRC_ALPHA_SATURATE,[$d]:i.DST_COLOR,[Jd]:i.DST_ALPHA,[jd]:i.ONE_MINUS_SRC_COLOR,[Wh]:i.ONE_MINUS_SRC_ALPHA,[Kd]:i.ONE_MINUS_DST_COLOR,[Zd]:i.ONE_MINUS_DST_ALPHA,[ep]:i.CONSTANT_COLOR,[tp]:i.ONE_MINUS_CONSTANT_COLOR,[np]:i.CONSTANT_ALPHA,[ip]:i.ONE_MINUS_CONSTANT_ALPHA};function Qt(N,Q,j,ue,ae,le,Ne,Je,re,Oe){if(N===xs){m===!0&&(Ge(i.BLEND),m=!1);return}if(m===!1&&(de(i.BLEND),m=!0),N!==vc){if(N!==g||Oe!==_){if((v!==vs||w!==vs)&&(i.blendEquation(i.FUNC_ADD),v=vs,w=vs),Oe)switch(N){case fr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ys:i.blendFunc(i.ONE,i.ONE);break;case Hh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ve("WebGLState: Invalid blending: ",N);break}else switch(N){case fr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ys:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Hh:Ve("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Gh:Ve("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ve("WebGLState: Invalid blending: ",N);break}T=null,b=null,E=null,x=null,M.set(0,0,0),S=0,g=N,_=Oe}return}ae=ae||Q,le=le||j,Ne=Ne||ue,(Q!==v||ae!==w)&&(i.blendEquationSeparate(pt[Q],pt[ae]),v=Q,w=ae),(j!==T||ue!==b||le!==E||Ne!==x)&&(i.blendFuncSeparate(et[j],et[ue],et[le],et[Ne]),T=j,b=ue,E=le,x=Ne),(Je.equals(M)===!1||re!==S)&&(i.blendColor(Je.r,Je.g,Je.b,re),M.copy(Je),S=re),g=N,_=!1}function zt(N,Q){N.side===$t?Ge(i.CULL_FACE):de(i.CULL_FACE);let j=N.side===gn;Q&&(j=!j),xn(j),N.blending===fr&&N.transparent===!1?Qt(xs):Qt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let ue=N.stencilWrite;a.setTest(ue),ue&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),qt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?de(i.SAMPLE_ALPHA_TO_COVERAGE):Ge(i.SAMPLE_ALPHA_TO_COVERAGE)}function xn(N){R!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),R=N)}function Et(N){N!==kd?(de(i.CULL_FACE),N!==I&&(N===zh?i.cullFace(i.BACK):N===Bd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ge(i.CULL_FACE),I=N}function ci(N){N!==D&&(O&&i.lineWidth(N),D=N)}function qt(N,Q,j){N?(de(i.POLYGON_OFFSET_FILL),(P!==Q||F!==j)&&(P=Q,F=j,o.getReversed()&&(Q=-Q,j=-j),i.polygonOffset(Q,j))):Ge(i.POLYGON_OFFSET_FILL)}function Un(N){N?de(i.SCISSOR_TEST):Ge(i.SCISSOR_TEST)}function On(N){N===void 0&&(N=i.TEXTURE0+z-1),Z!==N&&(i.activeTexture(N),Z=N)}function Fn(N,Q,j){j===void 0&&(Z===null?j=i.TEXTURE0+z-1:j=Z);let ue=ee[j];ue===void 0&&(ue={type:void 0,texture:void 0},ee[j]=ue),(ue.type!==N||ue.texture!==Q)&&(Z!==j&&(i.activeTexture(j),Z=j),i.bindTexture(N,Q||De[N]),ue.type=N,ue.texture=Q)}function k(){let N=ee[Z];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function kn(){try{i.compressedTexImage2D(...arguments)}catch(N){Ve("WebGLState:",N)}}function St(){try{i.compressedTexImage3D(...arguments)}catch(N){Ve("WebGLState:",N)}}function Mt(){try{i.texSubImage2D(...arguments)}catch(N){Ve("WebGLState:",N)}}function ge(){try{i.texSubImage3D(...arguments)}catch(N){Ve("WebGLState:",N)}}function Ht(){try{i.compressedTexSubImage2D(...arguments)}catch(N){Ve("WebGLState:",N)}}function ke(){try{i.compressedTexSubImage3D(...arguments)}catch(N){Ve("WebGLState:",N)}}function qe(){try{i.texStorage2D(...arguments)}catch(N){Ve("WebGLState:",N)}}function L(){try{i.texStorage3D(...arguments)}catch(N){Ve("WebGLState:",N)}}function A(){try{i.texImage2D(...arguments)}catch(N){Ve("WebGLState:",N)}}function G(){try{i.texImage3D(...arguments)}catch(N){Ve("WebGLState:",N)}}function ie(N){return u[N]!==void 0?u[N]:i.getParameter(N)}function te(N,Q){u[N]!==Q&&(i.pixelStorei(N,Q),u[N]=Q)}function ce(N){Y.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Y.copy(N))}function pe(N){se.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),se.copy(N))}function $(N,Q){let j=h.get(Q);j===void 0&&(j=new WeakMap,h.set(Q,j));let ue=j.get(N);ue===void 0&&(ue=i.getUniformBlockIndex(Q,N.name),i.uniformBlockBinding(Q,ue,ue),j.set(N,ue))}function K(N,Q,j){let ae=h.get(Q).get(N);c[ae]!==j&&(i.bindBufferBase(i.UNIFORM_BUFFER,ae,j),c[ae]=j)}function he(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),l={},u={},Z=null,ee={},f={},c={},d=new WeakMap,p=[],y=null,m=!1,g=null,v=null,T=null,b=null,w=null,E=null,x=null,M=new We(0,0,0),S=0,_=!1,R=null,I=null,D=null,P=null,F=null,Y.set(0,0,i.canvas.width,i.canvas.height),se.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:de,disable:Ge,bindFramebuffer:xt,drawBuffers:Fe,useProgram:Qe,setBlending:Qt,setMaterial:zt,setFlipSided:xn,setCullFace:Et,setLineWidth:ci,setPolygonOffset:qt,setScissorTest:Un,activeTexture:On,bindTexture:Fn,unbindTexture:k,compressedTexImage2D:kn,compressedTexImage3D:St,texImage2D:A,texImage3D:G,pixelStorei:te,getParameter:ie,updateUBOMapping:$,uniformBlockBinding:K,texStorage2D:qe,texStorage3D:L,texSubImage2D:Mt,texSubImage3D:ge,compressedTexSubImage2D:Ht,compressedTexSubImage3D:ke,scissor:ce,viewport:pe,reset:he}}function aS(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new be,l=new WeakMap,u=new Set,f,d=new WeakMap,p=new Set,y=new FinalizationRegistry(L=>p.delete(L)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,A){return m?new OffscreenCanvas(L,A):Gr("canvas")}function v(L,A,G){let ie=1,te=qe(L);if((te.width>G||te.height>G)&&(ie=G/Math.max(te.width,te.height)),ie<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let ce=Math.floor(ie*te.width),pe=Math.floor(ie*te.height);f===void 0&&(f=g(ce,pe));let $=A?g(ce,pe):f;return $.width=ce,$.height=pe,$.getContext("2d").drawImage(L,0,0,ce,pe),Be("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+ce+"x"+pe+")."),$}else return"data"in L&&Be("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),L;return L}function T(L){return L.generateMipmaps}function b(L){i.generateMipmap(L)}function w(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(L,A,G,ie,te,ce=!1){if(L!==null){if(i[L]!==void 0)return i[L];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let pe;ie&&(pe=e.get("EXT_texture_norm16"),pe||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=A;if(A===i.RED&&(G===i.FLOAT&&($=i.R32F),G===i.HALF_FLOAT&&($=i.R16F),G===i.UNSIGNED_BYTE&&($=i.R8),G===i.UNSIGNED_SHORT&&pe&&($=pe.R16_EXT),G===i.SHORT&&pe&&($=pe.R16_SNORM_EXT)),A===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&($=i.R8UI),G===i.UNSIGNED_SHORT&&($=i.R16UI),G===i.UNSIGNED_INT&&($=i.R32UI),G===i.BYTE&&($=i.R8I),G===i.SHORT&&($=i.R16I),G===i.INT&&($=i.R32I)),A===i.RG&&(G===i.FLOAT&&($=i.RG32F),G===i.HALF_FLOAT&&($=i.RG16F),G===i.UNSIGNED_BYTE&&($=i.RG8),G===i.UNSIGNED_SHORT&&pe&&($=pe.RG16_EXT),G===i.SHORT&&pe&&($=pe.RG16_SNORM_EXT)),A===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&($=i.RG8UI),G===i.UNSIGNED_SHORT&&($=i.RG16UI),G===i.UNSIGNED_INT&&($=i.RG32UI),G===i.BYTE&&($=i.RG8I),G===i.SHORT&&($=i.RG16I),G===i.INT&&($=i.RG32I)),A===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&($=i.RGB8UI),G===i.UNSIGNED_SHORT&&($=i.RGB16UI),G===i.UNSIGNED_INT&&($=i.RGB32UI),G===i.BYTE&&($=i.RGB8I),G===i.SHORT&&($=i.RGB16I),G===i.INT&&($=i.RGB32I)),A===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&($=i.RGBA8UI),G===i.UNSIGNED_SHORT&&($=i.RGBA16UI),G===i.UNSIGNED_INT&&($=i.RGBA32UI),G===i.BYTE&&($=i.RGBA8I),G===i.SHORT&&($=i.RGBA16I),G===i.INT&&($=i.RGBA32I)),A===i.RGB&&(G===i.UNSIGNED_SHORT&&pe&&($=pe.RGB16_EXT),G===i.SHORT&&pe&&($=pe.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),A===i.RGBA){let K=ce?Hr:it.getTransfer(te);G===i.FLOAT&&($=i.RGBA32F),G===i.HALF_FLOAT&&($=i.RGBA16F),G===i.UNSIGNED_BYTE&&($=K===ut?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&pe&&($=pe.RGBA16_EXT),G===i.SHORT&&pe&&($=pe.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function x(L,A){let G;return L?A===null||A===si||A===Ms?G=i.DEPTH24_STENCIL8:A===Yn?G=i.DEPTH32F_STENCIL8:A===pr&&(G=i.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===si||A===Ms?G=i.DEPTH_COMPONENT24:A===Yn?G=i.DEPTH_COMPONENT32F:A===pr&&(G=i.DEPTH_COMPONENT16),G}function M(L,A){return T(L)===!0||L.isFramebufferTexture&&L.minFilter!==Zt&&L.minFilter!==mn?Math.log2(Math.max(A.width,A.height))+1:L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?A.mipmaps.length:1}function S(L){let A=new WeakRef(L);n.get(L).__ref=A,p.add(A),y.register(L,A,A)}function _(L){let A=n.get(L).__ref;A!==void 0&&(p.delete(A),y.unregister(A))}function R(L){D(L.target)}function I(L){P(L.target)}function D(L){L.removeEventListener("dispose",R),_(L),z(L),L.isVideoTexture&&l.delete(L),L.isHTMLTexture&&u.delete(L)}function P(L){L.removeEventListener("dispose",I),_(L),W(L)}function F(){for(let L of p){let A=L.deref();A!==void 0&&(A.isRenderTarget===!0?P(A):D(A))}p.clear(),u.clear()}function z(L){let A=n.get(L);if(A.__webglInit===void 0)return;let G=L.source,ie=d.get(G);if(ie){let te=ie[A.__cacheKey];te.usedTimes--,te.usedTimes===0&&O(L),Object.keys(ie).length===0&&d.delete(G)}n.remove(L)}function O(L){let A=n.get(L);i.deleteTexture(A.__webglTexture);let G=L.source,ie=d.get(G);delete ie[A.__cacheKey],o.memory.textures--}function W(L){let A=n.get(L);A.__depthDisposeCallback&&A.__depthDisposeCallback();let G=L.depthTexture;if(G&&G.renderTarget===L&&D(G),L.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(A.__webglFramebuffer[te]))for(let ce=0;ce<A.__webglFramebuffer[te].length;ce++)i.deleteFramebuffer(A.__webglFramebuffer[te][ce]);else i.deleteFramebuffer(A.__webglFramebuffer[te]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[te])}else{if(Array.isArray(A.__webglFramebuffer))for(let te=0;te<A.__webglFramebuffer.length;te++)i.deleteFramebuffer(A.__webglFramebuffer[te]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let te=0;te<A.__webglColorRenderbuffer.length;te++)A.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[te]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}let ie=L.textures;for(let te=0,ce=ie.length;te<ce;te++){let pe=n.get(ie[te]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),o.memory.textures--),n.remove(ie[te])}n.remove(L)}let X=0;function Z(){X=0}function ee(){return X}function _e(L){X=L}function Le(){let L=X;return L>=s.maxTextures&&Be("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+s.maxTextures),X+=1,L}function Y(L){let A=[];return A.push(L.wrapS),A.push(L.wrapT),A.push(L.wrapR||0),A.push(L.magFilter),A.push(L.minFilter),A.push(L.anisotropy),A.push(L.internalFormat),A.push(L.format),A.push(L.type),A.push(L.generateMipmaps),A.push(L.mipmapsAutoUpdate),A.push(L.premultiplyAlpha),A.push(L.flipY),A.push(L.unpackAlignment),A.push(L.colorSpace),A.join()}function se(L,A){let G=n.get(L);if(L.isVideoTexture&&Ht(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&G.__version!==L.version){let ie=L.image;if(ie===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{zt(G,L,A);return}}else L.isExternalTexture&&(G.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+A)}function ve(L,A){let G=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&G.__version!==L.version){zt(G,L,A);return}else L.isExternalTexture&&(G.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+A)}function De(L,A){let G=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&G.__version!==L.version){zt(G,L,A);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+A)}function de(L,A){let G=n.get(L);if(L.version>0&&G.__version!==L.version){xn(G,L,A);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+A)}let Ge={[Va]:i.REPEAT,[fi]:i.CLAMP_TO_EDGE,[Wa]:i.MIRRORED_REPEAT},xt={[Zt]:i.NEAREST,[op]:i.NEAREST_MIPMAP_NEAREST,[yo]:i.NEAREST_MIPMAP_LINEAR,[mn]:i.LINEAR,[Tc]:i.LINEAR_MIPMAP_NEAREST,[Oi]:i.LINEAR_MIPMAP_LINEAR},Fe={[hp]:i.NEVER,[au]:i.ALWAYS,[up]:i.LESS,[ru]:i.LEQUAL,[fp]:i.EQUAL,[ou]:i.GEQUAL,[dp]:i.GREATER,[pp]:i.NOTEQUAL};function Qe(L,A){if(A.type===Yn&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===mn||A.magFilter===Tc||A.magFilter===yo||A.magFilter===Oi||A.minFilter===mn||A.minFilter===Tc||A.minFilter===yo||A.minFilter===Oi)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,Ge[A.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,Ge[A.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,Ge[A.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,xt[A.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,xt[A.minFilter]),A.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,Fe[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Zt||A.minFilter!==yo&&A.minFilter!==Oi||A.type===Yn&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function pt(L,A){let G=!1;L.__webglInit===void 0&&(L.__webglInit=!0,A.addEventListener("dispose",R),S(A));let ie=A.source,te=d.get(ie);te===void 0&&(te={},d.set(ie,te));let ce=Y(A);if(ce!==L.__cacheKey){te[ce]===void 0&&(te[ce]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,G=!0),te[ce].usedTimes++;let pe=te[L.__cacheKey];pe!==void 0&&(te[L.__cacheKey].usedTimes--,pe.usedTimes===0&&O(A)),L.__cacheKey=ce,L.__webglTexture=te[ce].texture}return G}function et(L,A,G){return Math.floor(Math.floor(L/G)/A)}function Qt(L,A,G,ie){let ce=L.updateRanges;if(ce.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,A.width,A.height,G,ie,A.data);else{ce.sort((N,Q)=>N.start-Q.start);let pe=0;for(let N=1;N<ce.length;N++){let Q=ce[pe],j=ce[N],ue=Q.start+Q.count,ae=et(j.start,A.width,4),le=et(Q.start,A.width,4);j.start<=ue+1&&ae===le&&et(j.start+j.count-1,A.width,4)===ae?Q.count=Math.max(Q.count,j.start+j.count-Q.start):(++pe,ce[pe]=j)}ce.length=pe+1;let $=t.getParameter(i.UNPACK_ROW_LENGTH),K=t.getParameter(i.UNPACK_SKIP_PIXELS),he=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,A.width);for(let N=0,Q=ce.length;N<Q;N++){let j=ce[N],ue=Math.floor(j.start/4),ae=Math.ceil(j.count/4),le=ue%A.width,Ne=Math.floor(ue/A.width),Je=ae,re=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,le),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ne),t.texSubImage2D(i.TEXTURE_2D,0,le,Ne,Je,re,G,ie,A.data)}L.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,$),t.pixelStorei(i.UNPACK_SKIP_PIXELS,K),t.pixelStorei(i.UNPACK_SKIP_ROWS,he)}}function zt(L,A,G){let ie=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ie=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ie=i.TEXTURE_3D);let te=pt(L,A),ce=A.source;t.bindTexture(ie,L.__webglTexture,i.TEXTURE0+G);let pe=n.get(ce);if(ce.version!==pe.__version||te===!0){if(t.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&A.image instanceof ImageBitmap)===!1){let re=it.getPrimaries(it.workingColorSpace),Oe=A.colorSpace===ki?null:it.getPrimaries(A.colorSpace),je=A.colorSpace===ki||re===Oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,je)}t.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment);let K=v(A.image,!1,s.maxTextureSize);K=ke(A,K);let he=r.convert(A.format,A.colorSpace),N=r.convert(A.type),Q=E(A.internalFormat,he,N,A.normalized,A.colorSpace,A.isVideoTexture);Qe(ie,A);let j,ue=A.mipmaps,ae=A.isVideoTexture!==!0,le=pe.__version===void 0||te===!0,Ne=ce.dataReady,Je=M(A,K);if(A.isDepthTexture)Q=x(A.format===Fi,A.type),le&&(ae?t.texStorage2D(i.TEXTURE_2D,1,Q,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,Q,K.width,K.height,0,he,N,null));else if(A.isDataTexture)if(ue.length>0){ae&&le&&t.texStorage2D(i.TEXTURE_2D,Je,Q,ue[0].width,ue[0].height);for(let re=0,Oe=ue.length;re<Oe;re++)j=ue[re],ae?Ne&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,j.width,j.height,he,N,j.data):t.texImage2D(i.TEXTURE_2D,re,Q,j.width,j.height,0,he,N,j.data);A.generateMipmaps=!1}else ae?(le&&t.texStorage2D(i.TEXTURE_2D,Je,Q,K.width,K.height),Ne&&Qt(A,K,he,N)):t.texImage2D(i.TEXTURE_2D,0,Q,K.width,K.height,0,he,N,K.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){ae&&le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Je,Q,ue[0].width,ue[0].height,K.depth);for(let re=0,Oe=ue.length;re<Oe;re++)if(j=ue[re],A.format!==oi)if(he!==null)if(ae){if(Ne)if(A.layerUpdates.size>0){let je=mu(j.width,j.height,A.format,A.type);for(let xe of A.layerUpdates){let ft=j.data.subarray(xe*je/j.data.BYTES_PER_ELEMENT,(xe+1)*je/j.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,xe,j.width,j.height,1,he,ft)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,j.width,j.height,K.depth,he,j.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,re,Q,j.width,j.height,K.depth,0,j.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ae?Ne&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,j.width,j.height,K.depth,he,N,j.data):t.texImage3D(i.TEXTURE_2D_ARRAY,re,Q,j.width,j.height,K.depth,0,he,N,j.data);A.layerUpdates.size>0&&A.clearLayerUpdates()}else{ae&&le&&t.texStorage2D(i.TEXTURE_2D,Je,Q,ue[0].width,ue[0].height);for(let re=0,Oe=ue.length;re<Oe;re++)j=ue[re],A.format!==oi?he!==null?ae?Ne&&t.compressedTexSubImage2D(i.TEXTURE_2D,re,0,0,j.width,j.height,he,j.data):t.compressedTexImage2D(i.TEXTURE_2D,re,Q,j.width,j.height,0,j.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?Ne&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,j.width,j.height,he,N,j.data):t.texImage2D(i.TEXTURE_2D,re,Q,j.width,j.height,0,he,N,j.data)}else if(A.isDataArrayTexture)if(ae){if(le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Je,Q,K.width,K.height,K.depth),Ne)if(A.layerUpdates.size>0){let re=mu(K.width,K.height,A.format,A.type);for(let Oe of A.layerUpdates){let je=K.data.subarray(Oe*re/K.data.BYTES_PER_ELEMENT,(Oe+1)*re/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Oe,K.width,K.height,1,he,N,je)}A.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,he,N,K.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Q,K.width,K.height,K.depth,0,he,N,K.data);else if(A.isData3DTexture)ae?(le&&t.texStorage3D(i.TEXTURE_3D,Je,Q,K.width,K.height,K.depth),Ne&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,he,N,K.data)):t.texImage3D(i.TEXTURE_3D,0,Q,K.width,K.height,K.depth,0,he,N,K.data);else if(A.isFramebufferTexture){if(le)if(ae)t.texStorage2D(i.TEXTURE_2D,Je,Q,K.width,K.height);else{let re=K.width,Oe=K.height;for(let je=0;je<Je;je++)t.texImage2D(i.TEXTURE_2D,je,Q,re,Oe,0,he,N,null),re>>=1,Oe>>=1}}else if(A.isHTMLTexture){if("texElementImage2D"in i){let re=i.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),K.parentNode!==re){re.appendChild(K),u.add(A),re.onpaint=Oe=>{let je=Oe.changedElements;for(let xe of u)je.includes(xe.image)&&(xe.needsUpdate=!0)},re.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,K);else{let je=i.RGBA,xe=i.RGBA,ft=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,je,xe,ft,K)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ue.length>0){if(ae&&le){let re=qe(ue[0]);t.texStorage2D(i.TEXTURE_2D,Je,Q,re.width,re.height)}for(let re=0,Oe=ue.length;re<Oe;re++)j=ue[re],ae?Ne&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,he,N,j):t.texImage2D(i.TEXTURE_2D,re,Q,he,N,j);A.generateMipmaps=!1}else if(ae){if(le){let re=qe(K);t.texStorage2D(i.TEXTURE_2D,Je,Q,re.width,re.height)}Ne&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,N,K)}else t.texImage2D(i.TEXTURE_2D,0,Q,he,N,K);T(A)&&A.mipmapsAutoUpdate===!0&&b(ie),pe.__version=ce.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function xn(L,A,G){if(A.image.length!==6)return;let ie=pt(L,A),te=A.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+G);let ce=n.get(te);if(te.version!==ce.__version||ie===!0){t.activeTexture(i.TEXTURE0+G);let pe=it.getPrimaries(it.workingColorSpace),$=A.colorSpace===ki?null:it.getPrimaries(A.colorSpace),K=A.colorSpace===ki||pe===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let he=A.isCompressedTexture||A.image[0].isCompressedTexture,N=A.image[0]&&A.image[0].isDataTexture,Q=[];for(let xe=0;xe<6;xe++)!he&&!N?Q[xe]=v(A.image[xe],!0,s.maxCubemapSize):Q[xe]=N?A.image[xe].image:A.image[xe],Q[xe]=ke(A,Q[xe]);let j=Q[0],ue=r.convert(A.format,A.colorSpace),ae=r.convert(A.type),le=E(A.internalFormat,ue,ae,A.normalized,A.colorSpace),Ne=A.isVideoTexture!==!0,Je=ce.__version===void 0||ie===!0,re=te.dataReady,Oe=M(A,j);Qe(i.TEXTURE_CUBE_MAP,A);let je;if(A.isDepthTexture){if(le=x(A.format===Fi,A.type),Je)if(Ne)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,le,j.width,j.height);else for(let xe=0;xe<6;xe++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,le,j.width,j.height,0,ue,ae,null)}else if(he){Ne&&Je&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Oe,le,j.width,j.height);for(let xe=0;xe<6;xe++){je=Q[xe].mipmaps;for(let ft=0;ft<je.length;ft++){let Yt=je[ft];A.format!==oi?ue!==null?Ne?re&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ft,0,0,Yt.width,Yt.height,ue,Yt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ft,le,Yt.width,Yt.height,0,Yt.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ft,0,0,Yt.width,Yt.height,ue,ae,Yt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ft,le,Yt.width,Yt.height,0,ue,ae,Yt.data)}}}else{if(je=A.mipmaps,Ne&&Je){je.length>0&&Oe++;let xe=qe(Q[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Oe,le,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(N){Ne?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,Q[xe].width,Q[xe].height,ue,ae,Q[xe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,le,Q[xe].width,Q[xe].height,0,ue,ae,Q[xe].data);for(let ft=0;ft<je.length;ft++){let zi=je[ft].image[xe].image;Ne?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ft+1,0,0,zi.width,zi.height,ue,ae,zi.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ft+1,le,zi.width,zi.height,0,ue,ae,zi.data)}}else{Ne?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,ue,ae,Q[xe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,le,ue,ae,Q[xe]);for(let ft=0;ft<je.length;ft++){let Yt=je[ft];Ne?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ft+1,0,0,ue,ae,Yt.image[xe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ft+1,le,ue,ae,Yt.image[xe])}}}T(A)&&A.mipmapsAutoUpdate===!0&&b(i.TEXTURE_CUBE_MAP),ce.__version=te.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function Et(L,A,G,ie,te,ce){let pe=r.convert(G.format,G.colorSpace),$=r.convert(G.type),K=E(G.internalFormat,pe,$,G.normalized,G.colorSpace),he=n.get(A),N=n.get(G);if(N.__renderTarget=A,!he.__hasExternalTextures){let Q=Math.max(1,A.width>>ce),j=Math.max(1,A.height>>ce);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,ce,K,Q,j,A.depth,0,pe,$,null):t.texImage2D(te,ce,K,Q,j,0,pe,$,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),ge(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,te,N.__webglTexture,0,Mt(A)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ie,te,N.__webglTexture,ce),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ci(L,A,G){if(i.bindRenderbuffer(i.RENDERBUFFER,L),A.depthBuffer){let ie=A.depthTexture,te=ie&&ie.isDepthTexture?ie.type:null,ce=x(A.stencilBuffer,te),pe=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ge(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt(A),ce,A.width,A.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt(A),ce,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,ce,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,pe,i.RENDERBUFFER,L)}else{let ie=A.textures;for(let te=0;te<ie.length;te++){let ce=ie[te],pe=r.convert(ce.format,ce.colorSpace),$=r.convert(ce.type),K=E(ce.internalFormat,pe,$,ce.normalized,ce.colorSpace);ge(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt(A),K,A.width,A.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt(A),K,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,K,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function qt(L,A,G){let ie=A.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let te=n.get(A.depthTexture);te.__renderTarget=A;let ce=ie?A.depthTexture.image[0]:A.depthTexture.image;(!te.__webglTexture||ce.width!==A.width||ce.height!==A.height)&&(ce.width=A.width,ce.height=A.height,A.depthTexture.needsUpdate=!0),ie?de(A.depthTexture,0):se(A.depthTexture,0);let pe=te.__webglTexture,$=Mt(A),K=ie?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,he=A.depthTexture.format===Fi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(A.depthTexture.format===Li)ge(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,he,K,pe,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,he,K,pe,0);else if(A.depthTexture.format===Fi)ge(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,he,K,pe,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,he,K,pe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Un(L){let A=n.get(L),G=L.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==L.depthTexture){let ie=L.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),ie){let te=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,ie.removeEventListener("dispose",te)};ie.addEventListener("dispose",te),A.__depthDisposeCallback=te}A.__boundDepthTexture=ie}if(L.depthTexture&&!A.__autoAllocateDepthBuffer)if(G)for(let ie=0;ie<6;ie++)qt(A.__webglFramebuffer[ie],L,ie);else L.texture.mipmaps.length>0?qt(A.__webglFramebuffer[0],L,0):qt(A.__webglFramebuffer,L,0);else if(G){A.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[ie]),A.__webglDepthbuffer[ie]===void 0)A.__webglDepthbuffer[ie]=i.createRenderbuffer(),ci(A.__webglDepthbuffer[ie],L,!1);else{let te=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=A.__webglDepthbuffer[ie];i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,ce)}}else if(L.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),ci(A.__webglDepthbuffer,L,!1);else{let te=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,ce)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function On(L,A,G){let ie=n.get(L);A!==void 0&&Et(ie.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Un(L)}function Fn(L){let A=L.texture,G=n.get(L),ie=n.get(A);L.addEventListener("dispose",I),S(L);let te=L.textures,ce=L.isWebGLCubeRenderTarget===!0,pe=te.length>1;if(pe||(ie.__webglTexture===void 0&&(ie.__webglTexture=i.createTexture()),ie.__version=A.version,o.memory.textures++),ce){G.__webglFramebuffer=[];for(let $=0;$<6;$++)if(A.mipmaps.length>0){G.__webglFramebuffer[$]=[];for(let K=0;K<A.mipmaps.length;K++)G.__webglFramebuffer[$][K]=i.createFramebuffer()}else G.__webglFramebuffer[$]=i.createFramebuffer()}else{if(A.mipmaps.length>0){G.__webglFramebuffer=[];for(let $=0;$<A.mipmaps.length;$++)G.__webglFramebuffer[$]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(pe)for(let $=0,K=te.length;$<K;$++){let he=n.get(te[$]);he.__webglTexture===void 0&&(he.__webglTexture=i.createTexture(),o.memory.textures++)}if(L.samples>0&&ge(L)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let $=0;$<te.length;$++){let K=te[$];G.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[$]);let he=r.convert(K.format,K.colorSpace),N=r.convert(K.type),Q=E(K.internalFormat,he,N,K.normalized,K.colorSpace,L.isXRRenderTarget===!0),j=Mt(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,j,Q,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,G.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),ci(G.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ce){t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture),Qe(i.TEXTURE_CUBE_MAP,A);for(let $=0;$<6;$++)if(A.mipmaps.length>0)for(let K=0;K<A.mipmaps.length;K++)Et(G.__webglFramebuffer[$][K],L,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,K);else Et(G.__webglFramebuffer[$],L,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);T(A)?b(i.TEXTURE_CUBE_MAP):A.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,A.mipmaps.length-1),t.unbindTexture()}else if(pe){for(let $=0,K=te.length;$<K;$++){let he=te[$],N=n.get(he),Q=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Q=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Q,N.__webglTexture),Qe(Q,he),Et(G.__webglFramebuffer,L,he,i.COLOR_ATTACHMENT0+$,Q,0),T(he)&&b(Q)}t.unbindTexture()}else{let $=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&($=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture($,ie.__webglTexture),Qe($,A),A.mipmaps.length>0)for(let K=0;K<A.mipmaps.length;K++)Et(G.__webglFramebuffer[K],L,A,i.COLOR_ATTACHMENT0,$,K);else Et(G.__webglFramebuffer,L,A,i.COLOR_ATTACHMENT0,$,0);T(A)?b($):A.mipmaps.length>0&&i.texParameteri($,i.TEXTURE_MAX_LEVEL,A.mipmaps.length-1),t.unbindTexture()}L.depthBuffer&&Un(L)}function k(L){let A=L.textures;for(let G=0,ie=A.length;G<ie;G++){let te=A[G];if(T(te)&&te.mipmapsAutoUpdate===!0){let ce=w(L),pe=n.get(te).__webglTexture;t.bindTexture(ce,pe),b(ce),t.unbindTexture()}}}let kn=[];function St(L){if(L.samples>0){if(ge(L)===!1){let A=L.textures,G=L.width,ie=L.height,te=i.COLOR_BUFFER_BIT,ce=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=n.get(L),$=A.length>1;if($)for(let he=0;he<A.length;he++)t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer),L.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let he=0;he<A.length;he++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,pe.__webglColorRenderbuffer[he]);let N=n.get(A[he]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,N,0)}i.blitFramebuffer(0,0,G,ie,0,0,G,ie,te,i.NEAREST),c===!0&&(kn.length=0,kn.push(i.COLOR_ATTACHMENT0+he),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&kn.push(ce),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,kn))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let he=0;he<A.length;he++){t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,pe.__webglColorRenderbuffer[he]);let N=n.get(A[he]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,N,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&c){let A=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function Mt(L){return Math.min(s.maxSamples,L.samples)}function ge(L){let A=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Ht(L){let A=o.render.frame;l.get(L)!==A&&(l.set(L,A),L.update())}function ke(L,A){let G=L.colorSpace,ie=L.format,te=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||G!==zr&&G!==ki&&(it.getTransfer(G)===ut?(ie!==oi||te!==Sn)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ve("WebGLTextures: Unsupported texture color space:",G)),A}function qe(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(h.width=L.naturalWidth||L.width,h.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(h.width=L.displayWidth,h.height=L.displayHeight):(h.width=L.width,h.height=L.height),h}this.allocateTextureUnit=Le,this.resetTextureUnits=Z,this.getTextureUnits=ee,this.setTextureUnits=_e,this.setTexture2D=se,this.setTexture2DArray=ve,this.setTexture3D=De,this.setTextureCube=de,this.rebindTextures=On,this.setupRenderTarget=Fn,this.updateRenderTargetMipmap=k,this.updateMultisampleRenderTarget=St,this.setupDepthRenderbuffer=Un,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=ge,this.dispose=F}function cS(i,e){function t(n,s=ki){let r,o=it.getTransfer(s);if(n===Sn)return i.UNSIGNED_BYTE;if(n===Ac)return i.UNSIGNED_SHORT_4_4_4_4;if(n===wc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===tu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===nu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Qh)return i.BYTE;if(n===eu)return i.SHORT;if(n===pr)return i.UNSIGNED_SHORT;if(n===Ec)return i.INT;if(n===si)return i.UNSIGNED_INT;if(n===Yn)return i.FLOAT;if(n===ri)return i.HALF_FLOAT;if(n===iu)return i.ALPHA;if(n===su)return i.RGB;if(n===oi)return i.RGBA;if(n===Li)return i.DEPTH_COMPONENT;if(n===Fi)return i.DEPTH_STENCIL;if(n===Cc)return i.RED;if(n===Rc)return i.RED_INTEGER;if(n===ns)return i.RG;if(n===Pc)return i.RG_INTEGER;if(n===Ic)return i.RGBA_INTEGER;if(n===vo||n===So||n===Mo||n===bo)if(o===ut)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===vo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===So)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===vo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===So)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Mo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===bo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Lc||n===Dc||n===Nc||n===Uc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Lc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Dc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Nc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Uc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Oc||n===Fc||n===kc||n===Bc||n===zc||n===To||n===Hc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Oc||n===Fc)return o===ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===kc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Bc)return r.COMPRESSED_R11_EAC;if(n===zc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===To)return r.COMPRESSED_RG11_EAC;if(n===Hc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Gc||n===Vc||n===Wc||n===Xc||n===qc||n===Yc||n===jc||n===Jc||n===Zc||n===$c||n===Kc||n===Qc||n===el||n===tl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Gc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Vc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Yc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===jc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Jc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Zc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$c)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Kc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===el)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===tl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===nl||n===il||n===sl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===nl)return o===ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===sl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===rl||n===ol||n===Eo||n===al)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===rl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Eo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===al)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ms?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var lS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hS=`
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

}`,Ru=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new eo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new qn({vertexShader:lS,fragmentShader:hS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ze(new $i(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Pu=class extends di{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,h=null,l=null,u=null,f=null,d=null,p=null,y=typeof XRWebGLBinding<"u",m=new Ru,g={},v=t.getContextAttributes(),T=null,b=null,w=[],E=[],x=new be,M=null,S=null,_=new pn;_.viewport=new Tt;let R=new pn;R.viewport=new Tt;let I=[_,R],D=new xc,P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let se=w[Y];return se===void 0&&(se=new tr,w[Y]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Y){let se=w[Y];return se===void 0&&(se=new tr,w[Y]=se),se.getGripSpace()},this.getHand=function(Y){let se=w[Y];return se===void 0&&(se=new tr,w[Y]=se),se.getHandSpace()};function z(Y){let se=E.indexOf(Y.inputSource);if(se===-1)return;let ve=w[se];ve!==void 0&&(ve.update(Y.inputSource,Y.frame,h||o),ve.dispatchEvent({type:Y.type,data:Y.inputSource}))}function O(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",W);for(let Y=0;Y<w.length;Y++){let se=E[Y];se!==null&&(E[Y]=null,w[Y].disconnect(se))}P=null,F=null,m.reset();for(let Y in g)delete g[Y];if(e.setRenderTarget(T),d=null,f=null,u=null,s=null,b=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(x.width,x.height,!1),S!==null){let Y=S.camera;Y.fov=S.fov,Y.zoom=S.zoom,Y.updateProjectionMatrix(),S=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(Y){h=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",O),s.addEventListener("inputsourceschange",W),v.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(x),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,De=null,de=null;v.depth&&(de=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=v.stencil?Fi:Li,De=v.stencil?Ms:si);let Ge={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Ge),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new Rn(f.textureWidth,f.textureHeight,{format:oi,type:Sn,depthTexture:new Ui(f.textureWidth,f.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let ve={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ve),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new Rn(d.framebufferWidth,d.framebufferHeight,{format:oi,type:Sn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),h=null,o=await s.requestReferenceSpace(a),Le.setContext(s),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function W(Y){for(let se=0;se<Y.removed.length;se++){let ve=Y.removed[se],De=E.indexOf(ve);De>=0&&(E[De]=null,w[De].disconnect(ve))}for(let se=0;se<Y.added.length;se++){let ve=Y.added[se],De=E.indexOf(ve);if(De===-1){for(let Ge=0;Ge<w.length;Ge++)if(Ge>=E.length){E.push(ve),De=Ge;break}else if(E[Ge]===null){E[Ge]=ve,De=Ge;break}if(De===-1)break}let de=w[De];de&&de.connect(ve)}}function X(Y,se){se===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(se.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let se=Y.near,ve=Y.far;m.texture!==null&&(m.depthNear>0&&(se=m.depthNear),m.depthFar>0&&(ve=m.depthFar)),D.near=R.near=_.near=se,D.far=R.far=_.far=ve,(P!==D.near||F!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),P=D.near,F=D.far),D.layers.mask=Y.layers.mask|6,_.layers.mask=D.layers.mask&-5,R.layers.mask=D.layers.mask&-3;let De=Y.parent,de=D.cameras;X(D,De);for(let Ge=0;Ge<de.length;Ge++)X(de[Ge],De);D.projectionMatrix.copy(_.projectionMatrix),D.projectionMatrixInverse.copy(_.projectionMatrixInverse),S===null&&Y.isPerspectiveCamera&&(S={camera:Y,fov:Y.fov,zoom:Y.zoom}),Z(Y,D,De)};function Z(Y,se,ve){ve===null?Y.matrix.copy(se.matrixWorld):(Y.matrix.copy(ve.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(se.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(se.projectionMatrix),Y.projectionMatrixInverse.copy(se.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=qa*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(Y){return g[Y]};let ee=null;function _e(Y,se){if(l=se.getViewerPose(h||o),p=se,l!==null){let ve=l.views;d!==null&&(e.setRenderTargetFramebuffer(b,d.framebuffer),e.setRenderTarget(b));let De=!1;ve.length!==D.cameras.length&&(D.cameras.length=0,De=!0);for(let Fe=0;Fe<ve.length;Fe++){let Qe=ve[Fe],pt=null;if(d!==null)pt=d.getViewport(Qe);else{let Qt=u.getViewSubImage(f,Qe);pt=Qt.viewport,Fe===0&&(e.setRenderTargetTextures(b,Qt.colorTexture,Qt.depthStencilTexture),e.setRenderTarget(b))}let et=I[Fe];et===void 0&&(et=new pn,et.layers.enable(Fe),et.viewport=new Tt,I[Fe]=et),et.matrix.fromArray(Qe.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(Qe.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(pt.x,pt.y,pt.width,pt.height),Fe===0&&(D.matrix.copy(et.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),De===!0&&D.cameras.push(et)}let de=s.enabledFeatures;if(de&&de.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let Fe=u.getDepthInformation(ve[0]);Fe&&Fe.isValid&&Fe.texture&&m.init(Fe,s.renderState)}if(de&&de.includes("camera-access")&&y){e.state.unbindTexture(),u=n.getBinding();for(let Fe=0;Fe<ve.length;Fe++){let Qe=ve[Fe].camera;if(Qe){let pt=g[Qe];pt||(pt=new eo,g[Qe]=pt);let et=u.getCameraImage(Qe);pt.sourceTexture=et}}}}for(let ve=0;ve<w.length;ve++){let De=E[ve],de=w[ve];De!==null&&de!==void 0&&de.update(De,se,h||o)}ee&&ee(Y,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),p=null}let Le=new Zp;Le.setAnimationLoop(_e),this.setAnimationLoop=function(Y){ee=Y},this.dispose=function(){}}},uS=new lt,om=new Xe;om.set(-1,0,0,0,1,0,0,0,1);function fS(i,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,fu(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,v,T,b){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),l(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,b)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),y(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?c(m,g,v,T):g.isSpriteMaterial?h(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===gn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===gn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let v=e.get(g),T=v.envMap,b=v.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(uS.makeRotationFromEuler(b)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(om),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,v,T){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*v,m.scale.value=T*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,v){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,t(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===gn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function y(m,g){let v=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function dS(i,e,t,n){let s={},r={};function o(v,T){let b=T.program;n.uniformBlockBinding(v,b,s[v.id])}function a(v,T){let b=s[v.id];b===void 0&&(p(v),b=c(v),s[v.id]=b,v.addEventListener("dispose",m));let w=T.program;n.updateUBOMapping(v,w);let E=e.render.frame;r[v.id]!==E&&(h(v),r[v.id]=E)}function c(v){let T=i.createBuffer(),b=v.__size,w=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,b,w),i.bindBuffer(i.UNIFORM_BUFFER,null),T}function h(v){let T=s[v.id],b=v.uniforms,w=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let E=0,x=b.length;E<x;E++){let M=b[E];if(Array.isArray(M))for(let S=0,_=M.length;S<_;S++)l(M[S],E,S,w);else l(M,E,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function l(v,T,b,w){if(f(v,T,b,w)===!0){let E=v.__offset,x=v.value;if(Array.isArray(x)){let M=0;for(let S=0;S<x.length;S++){let _=x[S],R=y(_,!0);u(_,v.__data,M),M+=R.storage/Float32Array.BYTES_PER_ELEMENT}}else u(x,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,v.__data)}}function u(v,T,b){typeof v=="number"||typeof v=="boolean"?T[b]=v:v.isMatrix3?(T[b]=v.elements[0],T[b+1]=v.elements[1],T[b+2]=v.elements[2],T[b+3]=0,T[b+4]=v.elements[3],T[b+5]=v.elements[4],T[b+6]=v.elements[5],T[b+7]=0,T[b+8]=v.elements[6],T[b+9]=v.elements[7],T[b+10]=v.elements[8],T[b+11]=0):ArrayBuffer.isView(v)?T.set(v.subarray(0,T.length-b),b):v.toArray(T,b)}function f(v,T,b,w){let E=v.value,x=T+"_"+b;if(Array.isArray(E)){w[x]===void 0&&(w[x]=[]);let M=w[x],S=!1;for(let _=0;_<E.length;_++)d(E[_],M,_)===!0&&(S=!0);return S}return d(E,w,x)}function d(v,T,b){if(T[b]===void 0)return typeof v=="number"||typeof v=="boolean"?T[b]=v:ArrayBuffer.isView(v)?T[b]=v.slice():T[b]=v.clone(),!0;{let w=T[b];if(typeof v=="number"||typeof v=="boolean"){if(w!==v)return T[b]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(w.equals(v)===!1)return w.copy(v),!0}}return!1}function p(v){let T=v.uniforms,b=0,w=16;for(let x=0,M=T.length;x<M;x++){let S=Array.isArray(T[x])?T[x]:[T[x]];for(let _=0,R=S.length;_<R;_++){let I=S[_],D=Array.isArray(I.value)?I.value:[I.value],P=Array.isArray(T[x])||Array.isArray(I.value),F=b;for(let O=0,W=D.length;O<W;O++){let X=D[O],Z=y(X,P),ee=b%w,_e=ee%Z.boundary,Le=ee+_e;b+=_e,Le!==0&&w-Le<Z.storage&&(b+=w-Le),O===0&&(F=b),b+=Z.storage}let z=I.type==="int"?Int32Array:I.type==="uint"?Uint32Array:Float32Array;I.__data=new z((b-F)/Float32Array.BYTES_PER_ELEMENT),I.__offset=F}}let E=b%w;return E>0&&(b+=w-E),v.__size=b,v.__cache={},this}function y(v,T){let b={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(b.boundary=4,b.storage=4):v.isVector2?(b.boundary=8,b.storage=8):v.isVector3||v.isColor?(b.boundary=16,b.storage=12):v.isVector4?(b.boundary=16,b.storage=16):v.isMatrix3?(b.boundary=16,b.storage=48):v.isMatrix4?(b.boundary=16,b.storage=64):v.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(b.boundary=16,b.storage=v.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",v),T===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function m(v){let T=v.target;T.removeEventListener("dispose",m),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function g(){for(let v in s)i.deleteBuffer(s[v]);s={},r={}}return{bind:o,update:a,dispose:g}}var pS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),xi=null;function mS(){return xi===null&&(xi=new Zr(pS,16,16,ns,ri),xi.name="DFG_LUT",xi.minFilter=mn,xi.magFilter=mn,xi.wrapS=fi,xi.wrapT=fi,xi.generateMipmaps=!1,xi.needsUpdate=!0),xi}var fl=class{constructor(e={}){let{canvas:t=gp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Sn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let y=d,m=new Set([Ic,Pc,Rc]),g=new Set([Sn,si,pr,Ms,Ac,wc]),v=new Uint32Array(4),T=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]},w=null,E=null,x=[],M=[],S=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,R=!1,I=null,D=null,P=null,F=null;this._outputColorSpace=Cn;let z=0,O=0,W=null,X=-1,Z=null,ee=new Tt,_e=new Tt,Le=null,Y=new We(0),se=0,ve=t.width,De=t.height,de=1,Ge=null,xt=null,Fe=new Tt(0,0,ve,De),Qe=new Tt(0,0,ve,De),pt=!1,et=new Zi,Qt=new Za,zt=!1,xn=!1,Et=new lt,ci=new B,qt=new Tt,Un={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},On=!1;function Fn(){return W===null?de:1}let k=n;function kn(C,U){return t.getContext(C,U)}let St,Mt,ge,Ht,ke,qe,L,A,G,ie,te,ce,pe,$,K,he,N,Q,j,ue,ae,le,Ne;try{let C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:l,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Oe,!1),t.addEventListener("webglcontextrestored",je,!1),t.addEventListener("webglcontextcreationerror",xe,!1),k===null){let U="webgl2";if(k=kn(U,C),k===null)throw kn(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Je()}catch(C){throw t.removeEventListener("webglcontextlost",Oe,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),Ve("WebGLRenderer: "+C.message),C}function Je(){St=new Ay(k),St.init(),ae=new cS(k,St),Mt=new my(k,St,e,ae),ge=new oS(k,St),Mt.reversedDepthBuffer&&f&&ge.buffers.depth.setReversed(!0),D=k.createFramebuffer(),P=k.createFramebuffer(),F=k.createFramebuffer(),Ht=new Ry(k),ke=new qv,qe=new aS(k,St,ge,ke,Mt,ae,Ht),L=new Ey(_),A=new Ig(k),le=new dy(k,A),G=new wy(k,A,Ht,le),ie=new Iy(k,G,A,le,Ht),Q=new Py(k,Mt,qe),K=new gy(ke),te=new Xv(_,L,St,Mt,le,K),ce=new fS(_,ke),pe=new jv,$=new eS(St),N=new fy(_,L,ge,ie,p,c),he=new rS(_,ie,Mt),Ne=new dS(k,Ht,Mt,ge),j=new py(k,St,Ht),ue=new Cy(k,St,Ht),Ht.programs=te.programs,_.capabilities=Mt,_.extensions=St,_.properties=ke,_.renderLists=pe,_.shadowMap=he,_.state=ge,_.info=Ht}y!==Sn&&(S=new Dy(y,t.width,t.height,a,s,r));let re=new Pu(_,k);this.xr=re,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let C=St.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=St.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(C){C!==void 0&&(de=C,this.setSize(ve,De,!1))},this.getSize=function(C){return C.set(ve,De)},this.setSize=function(C,U,q=!0){if(re.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}ve=C,De=U,t.width=Math.floor(C*de),t.height=Math.floor(U*de),q===!0&&(t.style.width=C+"px",t.style.height=U+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,C,U)},this.getDrawingBufferSize=function(C){return C.set(ve*de,De*de).floor()},this.setDrawingBufferSize=function(C,U,q){ve=C,De=U,de=q,t.width=Math.floor(C*q),t.height=Math.floor(U*q),this.setViewport(0,0,C,U)},this.setEffects=function(C){if(y===Sn){Ve("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let U=0;U<C.length;U++)if(C[U].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(ee)},this.getViewport=function(C){return C.copy(Fe)},this.setViewport=function(C,U,q,H){C.isVector4?Fe.set(C.x,C.y,C.z,C.w):Fe.set(C,U,q,H),ge.viewport(ee.copy(Fe).multiplyScalar(Fn()).round())},this.getScissor=function(C){return C.copy(Qe)},this.setScissor=function(C,U,q,H){C.isVector4?Qe.set(C.x,C.y,C.z,C.w):Qe.set(C,U,q,H),ge.scissor(_e.copy(Qe).multiplyScalar(Fn()).round())},this.getScissorTest=function(){return pt},this.setScissorTest=function(C){ge.setScissorTest(pt=C)},this.setOpaqueSort=function(C){Ge=C},this.setTransparentSort=function(C){xt=C},this.getClearColor=function(C){return C.copy(N.getClearColor())},this.setClearColor=function(){N.setClearColor(...arguments)},this.getClearAlpha=function(){return N.getClearAlpha()},this.setClearAlpha=function(){N.setClearAlpha(...arguments)},this.clear=function(C=!0,U=!0,q=!0){let H=0;if(C){let V=!1;if(W!==null){let me=W.texture.format;V=m.has(me)}if(V){let me=W.texture.type,Te=g.has(me),fe=N.getClearColor(),Se=N.getClearAlpha(),Re=fe.r,Ye=fe.g,tt=fe.b;Te?(v[0]=Re,v[1]=Ye,v[2]=tt,v[3]=Se,k.clearBufferuiv(k.COLOR,0,v)):(T[0]=Re,T[1]=Ye,T[2]=tt,T[3]=Se,k.clearBufferiv(k.COLOR,0,T))}else H|=k.COLOR_BUFFER_BIT}U&&(H|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(H|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&k.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),I=C},this.dispose=function(){t.removeEventListener("webglcontextlost",Oe,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),N.dispose(),pe.dispose(),$.dispose(),qe.dispose(),ke.dispose(),L.dispose(),ie.dispose(),G.dispose(),le.dispose(),Ne.dispose(),te.dispose(),re.dispose(),re.removeEventListener("sessionstart",Bf),re.removeEventListener("sessionend",zf),cs.stop()};function Oe(C){C.preventDefault(),lu("WebGLRenderer: Context Lost."),R=!0}function je(){lu("WebGLRenderer: Context Restored."),R=!1;let C=Ht.autoReset,U=he.enabled,q=he.autoUpdate,H=he.needsUpdate,V=he.type;Je(),Ht.autoReset=C,he.enabled=U,he.autoUpdate=q,he.needsUpdate=H,he.type=V}function xe(C){Ve("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ft(C){let U=C.target;U.removeEventListener("dispose",ft),Yt(U)}function Yt(C){zi(C),ke.remove(C)}function zi(C){let U=ke.get(C).programs;U!==void 0&&(U.forEach(function(q){te.releaseProgram(q)}),C.isShaderMaterial&&te.releaseShaderCache(C))}this.renderBufferDirect=function(C,U,q,H,V,me){U===null&&(U=Un);let Te=V.isMesh&&V.matrixWorld.determinantAffine()<0,fe=t0(C,U,q,H,V);ge.setMaterial(H,Te);let Se=q.index,Re=1;if(H.wireframe===!0){if(Se=G.getWireframeAttribute(q),Se===void 0)return;Re=2}let Ye=q.drawRange,tt=q.attributes.position,Ee=Ye.start*Re,nt=(Ye.start+Ye.count)*Re;me!==null&&(Ee=Math.max(Ee,me.start*Re),nt=Math.min(nt,(me.start+me.count)*Re)),Se!==null?(Ee=Math.max(Ee,0),nt=Math.min(nt,Se.count)):tt!=null&&(Ee=Math.max(Ee,0),nt=Math.min(nt,tt.count));let Lt=nt-Ee;if(Lt<0||Lt===1/0)return;le.setup(V,H,fe,q,Se);let _t,mt=j;if(Se!==null&&(_t=A.get(Se),mt=ue,mt.setIndex(_t)),V.isMesh)H.wireframe===!0?(ge.setLineWidth(H.wireframeLinewidth*Fn()),mt.setMode(k.LINES)):mt.setMode(k.TRIANGLES);else if(V.isLine){let nn=H.linewidth;nn===void 0&&(nn=1),ge.setLineWidth(nn*Fn()),V.isLineSegments?mt.setMode(k.LINES):V.isLineLoop?mt.setMode(k.LINE_LOOP):mt.setMode(k.LINE_STRIP)}else V.isPoints?mt.setMode(k.POINTS):V.isSprite&&mt.setMode(k.TRIANGLES);if(V.isBatchedMesh)if(St.get("WEBGL_multi_draw"))mt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let nn=V._multiDrawStarts,Ae=V._multiDrawCounts,un=V._multiDrawCount,ct=Se?A.get(Se).bytesPerElement:1,ls=ke.get(H).currentProgram.getUniforms();for(let sn=0;sn<un;sn++)ls.setValue(k,"_gl_DrawID",sn),mt.render(nn[sn]/ct,Ae[sn])}else if(V.isInstancedMesh)mt.renderInstances(Ee,Lt,V.count);else if(q.isInstancedBufferGeometry){let nn=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ae=Math.min(q.instanceCount,nn);mt.renderInstances(Ee,Lt,Ae)}else mt.render(Ee,Lt)};function kf(C,U,q,H){I!==null&&C.isNodeMaterial&&I.setObject(H,C),zt===!0&&K.setState(C,q,!1),C.transparent===!0&&C.side===$t&&C.forceSinglePass===!1?(C.side=gn,C.needsUpdate=!0,br(C,U,H),C.side=ts,C.needsUpdate=!0,br(C,U,H),C.side=$t):br(C,U,H)}this.compile=function(C,U,q=null){q===null&&(q=C),I!==null&&I.renderStart(C,U,q),E=$.get(q),E.init(U),M.push(E),q.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),C!==q&&C.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),E.setupLights(),I!==null&&I.updateLights(E.state.lightsArray),xn=this.localClippingEnabled,zt=K.init(this.clippingPlanes,xn),zt===!0&&K.setGlobalState(this.clippingPlanes,U),I!==null&&he.render(E.state.shadowsArray,q,U);let H=new Set;return C.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let me=V.material;if(me)if(Array.isArray(me))for(let Te=0;Te<me.length;Te++){let fe=me[Te];kf(fe,q,U,V),H.add(fe)}else kf(me,q,U,V),H.add(me)}),E=M.pop(),I!==null&&I.renderEnd(),H},this.compileAsync=function(C,U,q=null){let H=this.compile(C,U,q);return new Promise(V=>{function me(){if(H.forEach(function(Te){let Se=ke.get(Te).currentProgram;(Se===void 0||Se.isReady())&&H.delete(Te)}),H.size===0){V(C);return}setTimeout(me,10)}St.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let Kl=null;function Qm(C){Kl&&Kl(C)}function Bf(){cs.stop()}function zf(){cs.start()}let cs=new Zp;cs.setAnimationLoop(Qm),typeof self<"u"&&cs.setContext(self),this.setAnimationLoop=function(C){Kl=C,re.setAnimationLoop(C),C===null?cs.stop():cs.start()},re.addEventListener("sessionstart",Bf),re.addEventListener("sessionend",zf),this.render=function(C,U){if(U!==void 0&&U.isCamera!==!0){Ve("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;I!==null&&I.renderStart(C,U);let q=re.enabled===!0&&re.isPresenting===!0,H=S!==null&&(W===null||q)&&S.begin(_,W);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(re.cameraAutoUpdate===!0&&re.updateCamera(U),U=re.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,U,W),E=$.get(C,M.length),E.init(U),E.state.textureUnits=qe.getTextureUnits(),M.push(E),Et.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?Qt.setFromArrayCamera(U):et.setFromProjectionMatrix(Et,Vn,U.reversedDepth),xn=this.localClippingEnabled,zt=K.init(this.clippingPlanes,xn),w=pe.get(C,x.length),w.init(),x.push(w),this.info.render.frame++,re.enabled===!0&&re.isPresenting===!0){let Te=_.xr.getDepthSensingMesh();Te!==null&&Ql(Te,U,-1/0,_.sortObjects)}Ql(C,U,0,_.sortObjects),w.finish(),I!==null&&I.updateLights(E.state.lightsArray),_.sortObjects===!0&&w.sort(Ge,xt),On=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,On&&N.addToRenderList(w,C),this.info.autoReset===!0&&this.info.reset(),zt===!0&&K.beginShadows();let V=E.state.shadowsArray;if(he.render(V,C,U),zt===!0&&K.endShadows(),(H&&S.hasRenderPass())===!1){let Te=w.opaque,fe=w.transmissive;if(E.setupLights(),U.isArrayCamera){let Se=U.cameras;if(fe.length>0)for(let Re=0,Ye=Se.length;Re<Ye;Re++){let tt=Se[Re];Gf(Te,fe,C,tt)}On&&N.render(C);for(let Re=0,Ye=Se.length;Re<Ye;Re++){let tt=Se[Re];Hf(w,C,tt,tt.viewport)}}else fe.length>0&&Gf(Te,fe,C,U),On&&N.render(C),Hf(w,C,U)}W!==null&&O===0&&(qe.updateMultisampleRenderTarget(W),qe.updateRenderTargetMipmap(W)),H&&S.end(_),C.isScene===!0&&C.onAfterRender(_,C,U),le.resetDefaultState(),X=-1,Z=null,M.pop(),M.length>0?(E=M[M.length-1],qe.setTextureUnits(E.state.textureUnits),zt===!0&&K.setGlobalState(_.clippingPlanes,E.state.camera)):E=null,x.pop(),x.length>0?w=x[x.length-1]:w=null,I!==null&&I.renderEnd()};function Ql(C,U,q,H){if(C.visible===!1)return;if(C.layers.test(U.layers)){if(C.isGroup)q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(U);else if(C.isLight)E.pushLight(C),C.castShadow&&E.pushShadow(C);else if(C.isSprite){let Te=U.isArrayCamera?Qt:et;if(!C.frustumCulled||C.intersectsFrustum(Te)){H&&qt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Et);let fe=ie.update(C),Se=C.material;Se.visible&&w.push(C,fe,Se,q,qt.z,null,U)}}else if(C.isMesh||C.isLine||C.isPoints){let Te=U.isArrayCamera?Qt:et;if(!C.frustumCulled||C.intersectsFrustum(Te)){let fe=ie.update(C),Se=C.material;if(H&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),qt.copy(C.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),qt.copy(fe.boundingSphere.center)),qt.applyMatrix4(C.matrixWorld).applyMatrix4(Et)),Array.isArray(Se)){let Re=fe.groups;for(let Ye=0,tt=Re.length;Ye<tt;Ye++){let Ee=Re[Ye],nt=Se[Ee.materialIndex];nt&&nt.visible&&w.push(C,fe,nt,q,qt.z,Ee,U)}}else Se.visible&&w.push(C,fe,Se,q,qt.z,null,U)}}}let me=C.children;for(let Te=0,fe=me.length;Te<fe;Te++)Ql(me[Te],U,q,H)}function Hf(C,U,q,H){let{opaque:V,transmissive:me,transparent:Te}=C;E.setupLightsView(q),zt===!0&&K.setGlobalState(_.clippingPlanes,q),H&&ge.viewport(ee.copy(H)),V.length>0&&qo(V,U,q),me.length>0&&qo(me,U,q),Te.length>0&&qo(Te,U,q),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Gf(C,U,q,H){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[H.id]===void 0){let Ee=St.has("EXT_color_buffer_half_float")||St.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[H.id]=new Rn(1,1,{generateMipmaps:!0,type:Ee?ri:Sn,minFilter:Oi,samples:Math.max(4,Mt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:it.workingColorSpace})}let me=E.state.transmissionRenderTarget[H.id],Te=H.viewport||ee;me.setSize(Te.z*_.transmissionResolutionScale,Te.w*_.transmissionResolutionScale);let fe=_.getRenderTarget(),Se=_.getActiveCubeFace(),Re=_.getActiveMipmapLevel();_.setRenderTarget(me),_.getClearColor(Y),se=_.getClearAlpha(),se<1&&_.setClearColor(16777215,.5),_.clear(),On&&N.render(q);let Ye=_.toneMapping;_.toneMapping=_i;let tt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),E.setupLightsView(H),zt===!0&&K.setGlobalState(_.clippingPlanes,H),qo(C,q,H),qe.updateMultisampleRenderTarget(me),qe.updateRenderTargetMipmap(me),St.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let nt=0,Lt=U.length;nt<Lt;nt++){let _t=U[nt],{object:mt,geometry:nn,material:Ae,group:un}=_t;if(Ae.side===$t&&mt.layers.test(H.layers)){let ct=Ae.side;Ae.side=gn,Ae.needsUpdate=!0,Vf(mt,q,H,nn,Ae,un),Ae.side=ct,Ae.needsUpdate=!0,Ee=!0}}Ee===!0&&(qe.updateMultisampleRenderTarget(me),qe.updateRenderTargetMipmap(me))}_.setRenderTarget(fe,Se,Re),_.setClearColor(Y,se),tt!==void 0&&(H.viewport=tt),_.toneMapping=Ye}function qo(C,U,q){let H=U.isScene===!0?U.overrideMaterial:null;for(let V=0,me=C.length;V<me;V++){let Te=C[V],{object:fe,geometry:Se,group:Re}=Te,Ye=Te.material;Ye.allowOverride===!0&&H!==null&&(Ye=H),fe.layers.test(q.layers)&&Vf(fe,U,q,Se,Ye,Re)}}function Vf(C,U,q,H,V,me){I!==null&&V.isNodeMaterial&&I.setObject(C,V),C.onBeforeRender(_,U,q,H,V,me),C.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),V.onBeforeRender(_,U,q,H,C,me),V.transparent===!0&&V.side===$t&&V.forceSinglePass===!1?(V.side=gn,V.needsUpdate=!0,_.renderBufferDirect(q,U,H,V,C,me),V.side=ts,V.needsUpdate=!0,_.renderBufferDirect(q,U,H,V,C,me),V.side=$t):_.renderBufferDirect(q,U,H,V,C,me),C.onAfterRender(_,U,q,H,V,me)}function Wf(C){let U=0;for(let q of C)q.texture!==null&&U++;return U}function br(C,U,q){U.isScene!==!0&&(U=Un);let H=ke.get(C),V=E.state.lights,me=E.state.shadowsArray,Te=V.state.version,fe=te.getParameters(C,V.state,me,U,q,E.state.lightProbeGridArray),Se=te.getProgramCacheKey(fe),Re=H.programs;H.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?U.environment:null,H.fog=U.fog;let Ye=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;H.envMap=L.get(C.envMap||H.environment,Ye),H.envMapRotation=H.environment!==null&&C.envMap===null?U.environmentRotation:C.envMapRotation,Re===void 0&&(C.addEventListener("dispose",ft),Re=new Map,H.programs=Re,H.programVariants=new Map);let tt=Re.get(Se);if(tt!==void 0){if(H.currentProgram===tt&&H.lightsStateVersion===Te)return qf(C,fe),tt}else fe.uniforms=te.getUniforms(C),I!==null&&C.isNodeMaterial&&I.build(C,q,fe),C.onBeforeCompile(fe,_),tt=te.acquireProgram(fe,Se),Re.set(Se,tt),H.uniforms=fe.uniforms;let Ee=H.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ee.clippingPlanes=K.uniform),qf(C,fe),H.needsLights=i0(C),H.lightsStateVersion=Te,H.needsLights&&(Ee.ambientLightColor.value=V.state.ambient,Ee.lightProbe.value=V.state.probe,Ee.sunLights.value=V.state.sun,Ee.sunLightShadows.value=V.state.sunShadow,Ee.directionalLights.value=V.state.directional,Ee.directionalLightShadows.value=V.state.directionalShadow,Ee.spotLights.value=V.state.spot,Ee.spotLightShadows.value=V.state.spotShadow,Ee.rectAreaLights.value=V.state.rectArea,Ee.ltc_1.value=V.state.rectAreaLTC1,Ee.ltc_2.value=V.state.rectAreaLTC2,Ee.pointLights.value=V.state.point,Ee.pointLightShadows.value=V.state.pointShadow,Ee.hemisphereLights.value=V.state.hemi,Ee.sunShadowMatrix.value=V.state.sunShadowMatrix,Ee.sunShadowCascade.value=V.state.sunShadowCascade,Ee.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ee.spotLightMatrix.value=V.state.spotLightMatrix,Ee.spotLightMap.value=V.state.spotLightMap,Ee.pointShadowMatrix.value=V.state.pointShadowMatrix),H.numLightProbeGrids=Wf(E.state.lightProbeGridArray),H.currentProgram=tt,H.uniformsList=null,tt}function e0(C,U,q,H,V){let me=ke.get(C),Te=me.currentProgram.id+","+H+","+V,fe=me.programVariants.get(Te);return fe===void 0?(fe=br(C,U,q),me.programVariants.set(Te,fe)):(me.currentProgram=fe,me.uniformsList=null,me.outputColorSpace=H,me.toneMapping=V),fe}function Xf(C){if(C.uniformsList===null){let U=C.currentProgram.getUniforms();C.uniformsList=gr.seqWithValue(U.seq,C.uniforms)}return C.uniformsList}function qf(C,U){let q=ke.get(C);q.outputColorSpace=U.outputColorSpace,q.batching=U.batching,q.batchingColor=U.batchingColor,q.instancing=U.instancing,q.instancingColor=U.instancingColor,q.instancingMorph=U.instancingMorph,q.skinning=U.skinning,q.morphTargets=U.morphTargets,q.morphNormals=U.morphNormals,q.morphColors=U.morphColors,q.morphTargetsCount=U.morphTargetsCount,q.numClippingPlanes=U.numClippingPlanes,q.numIntersection=U.numClipIntersection,q.vertexAlphas=U.vertexAlphas,q.vertexTangents=U.vertexTangents,q.toneMapping=U.toneMapping}function t0(C,U,q,H,V){U.isScene!==!0&&(U=Un),qe.resetTextureUnits();let me=U.fog,Te=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?U.environment:null,fe=W===null?_.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:it.workingColorSpace,Se=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Re=L.get(H.envMap||Te,Se),Ye=H.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,tt=!!q.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ee=!!q.morphAttributes.position,nt=!!q.morphAttributes.normal,Lt=!!q.morphAttributes.color,_t=_i;H.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(_t=_.toneMapping);let mt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,nn=mt!==void 0?mt.length:0,Ae=ke.get(H),un=E.state.lights;if(zt===!0&&(xn===!0||C!==Z)){let At=C===Z&&H.id===X;K.setState(H,C,At)}let ct=!1,ls=!1;H.version===Ae.__version?Ae.needsLights&&Ae.lightsStateVersion!==un.state.version||V.isBatchedMesh&&Ae.batching===!1||!V.isBatchedMesh&&Ae.batching===!0||V.isBatchedMesh&&Ae.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Ae.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Ae.instancing===!1||!V.isInstancedMesh&&Ae.instancing===!0||V.isSkinnedMesh&&Ae.skinning===!1||!V.isSkinnedMesh&&Ae.skinning===!0||V.isInstancedMesh&&Ae.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ae.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Ae.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Ae.instancingMorph===!1&&V.morphTexture!==null||Ae.envMap!==Re||H.fog===!0&&Ae.fog!==me||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==K.numPlanes||Ae.numIntersection!==K.numIntersection)||Ae.vertexAlphas!==Ye||Ae.vertexTangents!==tt||Ae.morphTargets!==Ee||Ae.morphNormals!==nt||Ae.morphColors!==Lt||Ae.morphTargetsCount!==nn||Ae.numLightProbeGrids!==Wf(E.state.lightProbeGridArray)?ct=!0:(Ae.outputColorSpace!==fe||Ae.toneMapping!==_t)&&(ls=!0):(ct=!0,Ae.__version=H.version);let sn=Ae.currentProgram;(ct===!0||ls===!0)&&(sn=ls===!0?e0(H,U,V,fe,_t):br(H,U,V),I&&H.isNodeMaterial&&I.onUpdateProgram(H,sn,Ae));let Yo=!1,Hi=!1,hs=!1,st=sn.getUniforms(),en=Ae.uniforms;if(ge.useProgram(sn.program)&&(Yo=!0,Hi=!0,hs=!0),H.id!==X&&(X=H.id,Hi=!0),Yo||Z!==C){ge.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),st.setValue(k,"projectionMatrix",C.projectionMatrix),st.setValue(k,"viewMatrix",C.matrixWorldInverse);let jt=st.map.cameraPosition;jt!==void 0&&jt.setValue(k,ci.setFromMatrixPosition(C.matrixWorld)),Mt.logarithmicDepthBuffer&&st.setValue(k,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&st.setValue(k,"isOrthographic",C.isOrthographicCamera===!0),Z!==C&&(Z=C,Hi=!0,hs=!0)}if(Ae.needsLights&&(un.state.sunShadowMap.length>0&&st.setValue(k,"sunShadowMap",un.state.sunShadowMap,qe),un.state.directionalShadowMap.length>0&&st.setValue(k,"directionalShadowMap",un.state.directionalShadowMap,qe),un.state.spotShadowMap.length>0&&st.setValue(k,"spotShadowMap",un.state.spotShadowMap,qe),un.state.pointShadowMap.length>0&&st.setValue(k,"pointShadowMap",un.state.pointShadowMap,qe)),V.isSkinnedMesh){st.setOptional(k,V,"bindMatrix"),st.setOptional(k,V,"bindMatrixInverse");let At=V.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),st.setValue(k,"boneTexture",At.boneTexture,qe))}V.isBatchedMesh&&(st.setOptional(k,V,"batchingTexture"),st.setValue(k,"batchingTexture",V._matricesTexture,qe),st.setOptional(k,V,"batchingIdTexture"),st.setValue(k,"batchingIdTexture",V._indirectTexture,qe),st.setOptional(k,V,"batchingColorTexture"),V._colorsTexture!==null&&st.setValue(k,"batchingColorTexture",V._colorsTexture,qe));let Jn=q.morphAttributes;if((Jn.position!==void 0||Jn.normal!==void 0||Jn.color!==void 0)&&Q.update(V,q,sn),(Hi||Ae.receiveShadow!==V.receiveShadow)&&(Ae.receiveShadow=V.receiveShadow,st.setValue(k,"receiveShadow",V.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&U.environment!==null&&(en.envMapIntensity.value=U.environmentIntensity),en.dfgLUT!==void 0&&(en.dfgLUT.value=mS()),Hi){if(st.setValue(k,"toneMappingExposure",_.toneMappingExposure),Ae.needsLights&&n0(en,hs),me&&H.fog===!0&&ce.refreshFogUniforms(en,me),ce.refreshMaterialUniforms(en,H,de,De,E.state.transmissionRenderTarget[C.id]),Ae.needsLights&&Ae.numLightProbeGrids>0){let At=b,jt=0;for(let Si of E.state.lightProbeGridArray)Si.texture!==null&&(At.textures[jt]=Si.texture,At.min[jt]=Si.boundingBox.min,At.max[jt]=Si.boundingBox.max,At.resolution[jt]=Si.resolution,jt++);for(let Si in At)At[Si].length=jt;en.probesSH.value=At.textures,en.probesMin.value=At.min,en.probesMax.value=At.max,en.probesResolution.value=At.resolution}gr.upload(k,Xf(Ae),en,qe)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(gr.upload(k,Xf(Ae),en,qe),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&st.setValue(k,"center",V.center),st.setValue(k,"modelViewMatrix",V.modelViewMatrix),st.setValue(k,"normalMatrix",V.normalMatrix),st.setValue(k,"modelMatrix",V.matrixWorld),H.uniformsGroups!==void 0){let At=H.uniformsGroups;for(let jt=0,Si=At.length;jt<Si;jt++){let jf=At[jt];Ne.update(jf,sn),Ne.bind(jf,sn)}}return sn}function n0(C,U){C.ambientLightColor.needsUpdate=U,C.lightProbe.needsUpdate=U,C.sunLights.needsUpdate=U,C.sunLightShadows.needsUpdate=U,C.directionalLights.needsUpdate=U,C.directionalLightShadows.needsUpdate=U,C.pointLights.needsUpdate=U,C.pointLightShadows.needsUpdate=U,C.spotLights.needsUpdate=U,C.spotLightShadows.needsUpdate=U,C.rectAreaLights.needsUpdate=U,C.hemisphereLights.needsUpdate=U}function i0(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(C,U,q){let H=ke.get(C);H.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),ke.get(C.texture).__webglTexture=U,ke.get(C.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:q,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,U){let q=ke.get(C);q.__webglFramebuffer=U,q.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(C,U=0,q=0){W=C,z=U,O=q;let H=null,V=!1,me=!1;if(C){let fe=ke.get(C);if(fe.__useDefaultFramebuffer!==void 0){ge.bindFramebuffer(k.FRAMEBUFFER,fe.__webglFramebuffer),ee.copy(C.viewport),_e.copy(C.scissor),Le=C.scissorTest,ge.viewport(ee),ge.scissor(_e),ge.setScissorTest(Le),X=-1;return}else if(fe.__webglFramebuffer===void 0)qe.setupRenderTarget(C);else if(fe.__hasExternalTextures)qe.rebindTextures(C,ke.get(C.texture).__webglTexture,ke.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let Ye=C.depthTexture;if(fe.__boundDepthTexture!==Ye){if(Ye!==null&&ke.has(Ye)&&(C.width!==Ye.image.width||C.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");qe.setupDepthRenderbuffer(C)}}let Se=C.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(me=!0);let Re=ke.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Re[U])?H=Re[U][q]:H=Re[U],V=!0):C.samples>0&&qe.useMultisampledRTT(C)===!1?H=ke.get(C).__webglMultisampledFramebuffer:Array.isArray(Re)?H=Re[q]:H=Re,ee.copy(C.viewport),_e.copy(C.scissor),Le=C.scissorTest}else ee.copy(Fe).multiplyScalar(de).floor(),_e.copy(Qe).multiplyScalar(de).floor(),Le=pt;if(q!==0&&(H=D),ge.bindFramebuffer(k.FRAMEBUFFER,H)&&ge.drawBuffers(C,H),ge.viewport(ee),ge.scissor(_e),ge.setScissorTest(Le),V){let fe=ke.get(C.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+U,fe.__webglTexture,q)}else if(me){let fe=U;for(let Se=0;Se<C.textures.length;Se++){let Re=ke.get(C.textures[Se]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Se,Re.__webglTexture,q,fe)}}else if(C!==null&&q!==0){let fe=ke.get(C.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,fe.__webglTexture,q)}X=-1};function Yf(C){let U=ke.get(C);return(U.__readFormat!==C.format||U.__readType!==C.type)&&(U.__readFormat=C.format,U.__readType=C.type,U.__formatReadable=Mt.textureFormatReadable(C.format),U.__typeReadable=Mt.textureTypeReadable(C.type)),U}this.readRenderTargetPixels=function(C,U,q,H,V,me,Te,fe=0){if(!(C&&C.isWebGLRenderTarget)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=ke.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Te!==void 0&&(Se=Se[Te],Array.isArray(Se)&&(Se=Se[0])),Se){ge.bindFramebuffer(k.FRAMEBUFFER,Se);try{let Re=C.textures[fe],Ye=Re.format,tt=Re.type;C.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+fe);let Ee=Yf(Re);if(Ee.__formatReadable===!1){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ee.__typeReadable===!1){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=C.width-H&&q>=0&&q<=C.height-V&&k.readPixels(U,q,H,V,ae.convert(Ye),ae.convert(tt),me)}finally{let Re=W!==null?ke.get(W).__webglFramebuffer:null;ge.bindFramebuffer(k.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(C,U,q,H,V,me,Te,fe=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=ke.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Te!==void 0&&(Se=Se[Te],Array.isArray(Se)&&(Se=Se[0])),Se)if(U>=0&&U<=C.width-H&&q>=0&&q<=C.height-V){ge.bindFramebuffer(k.FRAMEBUFFER,Se);let Re=C.textures[fe],Ye=Re.format,tt=Re.type;C.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+fe);let Ee=Yf(Re);if(Ee.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ee.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let nt=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,nt),k.bufferData(k.PIXEL_PACK_BUFFER,me.byteLength,k.STREAM_READ),k.readPixels(U,q,H,V,ae.convert(Ye),ae.convert(tt),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);let Lt=W!==null?ke.get(W).__webglFramebuffer:null;ge.bindFramebuffer(k.FRAMEBUFFER,Lt);let _t=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await xp(k,_t,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,nt),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,me),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(nt),k.deleteSync(_t),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,U=null,q=0){let H=Math.pow(2,-q),V=Math.floor(C.image.width*H),me=Math.floor(C.image.height*H),Te=U!==null?U.x:0,fe=U!==null?U.y:0;qe.setTexture2D(C,0),k.copyTexSubImage2D(k.TEXTURE_2D,q,0,0,Te,fe,V,me),ge.unbindTexture()},this.copyTextureToTexture=function(C,U,q=null,H=null,V=0,me=0){let Te,fe,Se,Re,Ye,tt,Ee,nt,Lt,_t=C.isCompressedTexture?C.mipmaps[me]:C.image;if(q!==null)Te=q.max.x-q.min.x,fe=q.max.y-q.min.y,Se=q.isBox3?q.max.z-q.min.z:1,Re=q.min.x,Ye=q.min.y,tt=q.isBox3?q.min.z:0;else{let st=Math.pow(2,-V);Te=Math.floor(_t.width*st),fe=Math.floor(_t.height*st),C.isDataArrayTexture?Se=_t.depth:C.isData3DTexture?Se=Math.floor(_t.depth*st):Se=1,Re=0,Ye=0,tt=0}H!==null?(Ee=H.x,nt=H.y,Lt=H.z):(Ee=0,nt=0,Lt=0);let mt=ae.convert(U.format),nn=ae.convert(U.type),Ae;U.isData3DTexture?(qe.setTexture3D(U,0),Ae=k.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(qe.setTexture2DArray(U,0),Ae=k.TEXTURE_2D_ARRAY):(qe.setTexture2D(U,0),Ae=k.TEXTURE_2D),ge.activeTexture(k.TEXTURE0),ge.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,U.flipY),ge.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),ge.pixelStorei(k.UNPACK_ALIGNMENT,U.unpackAlignment);let un=ge.getParameter(k.UNPACK_ROW_LENGTH),ct=ge.getParameter(k.UNPACK_IMAGE_HEIGHT),ls=ge.getParameter(k.UNPACK_SKIP_PIXELS),sn=ge.getParameter(k.UNPACK_SKIP_ROWS),Yo=ge.getParameter(k.UNPACK_SKIP_IMAGES);ge.pixelStorei(k.UNPACK_ROW_LENGTH,_t.width),ge.pixelStorei(k.UNPACK_IMAGE_HEIGHT,_t.height),ge.pixelStorei(k.UNPACK_SKIP_PIXELS,Re),ge.pixelStorei(k.UNPACK_SKIP_ROWS,Ye),ge.pixelStorei(k.UNPACK_SKIP_IMAGES,tt);let Hi=C.isDataArrayTexture||C.isData3DTexture,hs=U.isDataArrayTexture||U.isData3DTexture;if(C.isDepthTexture){let st=ke.get(C),en=ke.get(U),Jn=ke.get(st.__renderTarget),At=ke.get(en.__renderTarget);ge.bindFramebuffer(k.READ_FRAMEBUFFER,Jn.__webglFramebuffer),ge.bindFramebuffer(k.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let jt=0;jt<Se;jt++)Hi&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ke.get(C).__webglTexture,V,tt+jt),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ke.get(U).__webglTexture,me,Lt+jt)),k.blitFramebuffer(Re,Ye,Re+Te,Ye+fe,Ee,nt,Ee+Te,nt+fe,k.DEPTH_BUFFER_BIT,k.NEAREST);ge.bindFramebuffer(k.READ_FRAMEBUFFER,null),ge.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(V!==0||C.isRenderTargetTexture||ke.has(C)){let st=ke.get(C),en=ke.get(U);ge.bindFramebuffer(k.READ_FRAMEBUFFER,P),ge.bindFramebuffer(k.DRAW_FRAMEBUFFER,F);for(let Jn=0;Jn<Se;Jn++)Hi?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,st.__webglTexture,V,tt+Jn):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,st.__webglTexture,V),hs?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,en.__webglTexture,me,Lt+Jn):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,en.__webglTexture,me),V!==0?k.blitFramebuffer(Re,Ye,Re+Te,Ye+fe,Ee,nt,Ee+Te,nt+fe,k.COLOR_BUFFER_BIT,k.NEAREST):hs?k.copyTexSubImage3D(Ae,me,Ee,nt,Lt+Jn,Re,Ye,Te,fe):k.copyTexSubImage2D(Ae,me,Ee,nt,Re,Ye,Te,fe);ge.bindFramebuffer(k.READ_FRAMEBUFFER,null),ge.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else hs?C.isDataTexture||C.isData3DTexture?k.texSubImage3D(Ae,me,Ee,nt,Lt,Te,fe,Se,mt,nn,_t.data):U.isCompressedArrayTexture?k.compressedTexSubImage3D(Ae,me,Ee,nt,Lt,Te,fe,Se,mt,_t.data):k.texSubImage3D(Ae,me,Ee,nt,Lt,Te,fe,Se,mt,nn,_t):C.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,me,Ee,nt,Te,fe,mt,nn,_t.data):C.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,me,Ee,nt,_t.width,_t.height,mt,_t.data):k.texSubImage2D(k.TEXTURE_2D,me,Ee,nt,Te,fe,mt,nn,_t);ge.pixelStorei(k.UNPACK_ROW_LENGTH,un),ge.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ct),ge.pixelStorei(k.UNPACK_SKIP_PIXELS,ls),ge.pixelStorei(k.UNPACK_SKIP_ROWS,sn),ge.pixelStorei(k.UNPACK_SKIP_IMAGES,Yo),me===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&k.generateMipmap(Ae),ge.unbindTexture()},this.initRenderTarget=function(C){ke.get(C).__webglFramebuffer===void 0&&qe.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?qe.setTextureCube(C,0):C.isData3DTexture?qe.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?qe.setTexture2DArray(C,0):qe.setTexture2D(C,0),ge.unbindTexture()},this.resetState=function(){z=0,O=0,W=null,ge.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};function lm(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new It;c.morphTargetsRelative=a;let h=0;for(let l=0;l<i.length;++l){let u=i[l],f=0,d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+".  .morphAttributes must be consistent throughout all geometries."),null;if(u.morphAttributes[p].length!==i[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;o[p]===void 0&&(o[p]=[]),o[p].push(u.morphAttributes[p]),d++}if(d!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". Make sure all geometries have the same number of morph attributes."),null;if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". The geometry must have either an index or a position attribute"),null;c.addGroup(h,p,l),h+=p}}if(t){let l=0,u=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let p=0;p<d.count;++p)u.push(d.getX(p)+l);l+=i[f].attributes.position.count}c.setIndex(u)}for(let l in r){let u=cm(r[l]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" attribute."),null;c.setAttribute(l,u)}for(let l in o){let u=o[l][0].length;if(u!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[l]=[];for(let f=0;f<u;++f){let d=[];for(let y=0;y<o[l].length;++y)d.push(o[l][y][f]);let p=cm(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" morphAttribute."),null;c.morphAttributes[l].push(p)}}}return c}function cm(i){let e,t,n,s=-1,r=0;for(let h=0;h<i.length;++h){let l=i[h];if(e===void 0&&(e=l.array.constructor),e!==l.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=l.itemSize),t!==l.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=l.normalized),n!==l.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=l.gpuType),s!==l.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=l.count*t}let o=new e(r),a=new Ut(o,t,n),c=0;for(let h=0;h<i.length;++h){let l=i[h];if(l.isInterleavedBufferAttribute){let u=c/t;for(let f=0,d=l.count;f<d;f++)for(let p=0;p<t;p++){let y=l.getComponent(f,p);a.setComponent(f+u,p,y)}}else o.set(l.array,c);c+=l.count*t}return s!==void 0&&(a.gpuType=s),a}var ml=new We;function Ue(i,e,t,n,s,r,o,a){let c=i.index?i.toNonIndexed():i;(r||o||a)&&c.applyMatrix4(new lt().makeRotationFromEuler(new ii(r||0,o||0,a||0))),c.translate(t||0,n||0,s||0),ml.set(e);let h=c.attributes.position.count,l=new Float32Array(h*3);for(let u=0;u<h;u++)l[u*3]=ml.r,l[u*3+1]=ml.g,l[u*3+2]=ml.b;return c.setAttribute("color",new Ut(l,3)),c.attributes.uv||c.setAttribute("uv",new Ut(new Float32Array(h*2),2)),c}function Mn(i){let e=lm(i,!1);for(let t=0;t<i.length;t++)i[t].dispose();return e.computeVertexNormals(),e}function Po(i,e,t){let n=new We(i),s=new We(e);return n.lerp(s,t).getHex()}var hm=15845280,gl=1842987,gS=14212841,_S=8016432;function um(i,e,t){let n=Po(i,1184796,.62),s=Po(i,723986,.74),r=[Ue(new ht(.44,.46,.28),n,0,.6,0),Ue(new ht(.47,.09,.31),e,0,.44,0),Ue(new In(.27,1),s,0,1.08,0),Ue(new ht(.34,.11,.08),hm,0,1.1,.212),Ue(new ht(.05,.06,.03),gl,-.085,1.1,.25),Ue(new ht(.05,.06,.03),gl,.085,1.1,.25),Ue(new Rt(.235,.265,.13,8),i,0,.87,0)];return t===0?r.push(Ue(new Wn(.1,.3,5),e,0,.7,-.2,-.5,0,0)):t===1?r.push(Ue(new In(.12,0),e,0,.66,-.22)):r.push(Ue(new ht(.06,.78,.06),Po(e,_S,.5),0,.72,-.19,0,0,.55)),Mn(r)}function Iu(i,e){let t=Po(i,1184796,.56),n=[Ue(new ht(.12,.3,.14),t,0,-.15,0),Ue(new ht(.11,.1,.12),hm,0,-.35,0)];return e&&(n.push(Ue(new ht(.035,.07,.6),gS,0,-.38,.36)),n.push(Ue(new ht(.13,.035,.05),gl,0,-.38,.07))),Mn(n)}function fm(i){let e=Po(i,1184796,.68);return Mn([Ue(new ht(.15,.3,.17),e,0,-.15,0),Ue(new ht(.16,.08,.22),gl,0,-.33,.03)])}function dm(i){return Mn([Ue(new ht(.11,.05,.46),i,0,0,-.23)])}function pm(){return Mn([Ue(new Rt(.1,.15,.6,5,1,!0),7031339,0,.3,0),Ue(new Wn(.66,1.05,6,1,!0),3112259,0,1.05,0),Ue(new Wn(.5,.9,6,1,!0),3639883,0,1.6,0),Ue(new Wn(.33,.75,6,1,!0),4167251,0,2.1,0)])}function mm(){let i=new In(.66,0);i.scale(1,.82,1);let e=new In(.44,0);return e.scale(1,.85,1),Mn([Ue(new Rt(.11,.16,.8,5,1,!0),7360559,0,.4,0),Ue(i,4034367,0,1.25,0),Ue(e,4890698,.3,1.72,.12)])}function gm(){let i=new In(.46,0);i.scale(1,.66,1);let e=new In(.3,0);return e.scale(1,.7,1),Mn([Ue(i,3116862,0,.26,0),Ue(e,3909196,.3,.2,.2)])}function _m(){let i=new or(.44,0);i.scale(1,.72,.9);let e=new or(.24,0);return Mn([Ue(i,9146521,0,.26,0),Ue(e,10133674,.32,.14,.22)])}function xm(i){return Mn([Ue(new Rt(.1,.1,.5,10),15984324,0,0,0,0,0,Math.PI/2),Ue(new Rt(.115,.115,.15,10),i,0,0,0,0,0,Math.PI/2),Ue(new Rt(.06,.06,.08,8),3811868,-.29,0,0,0,0,Math.PI/2),Ue(new Rt(.06,.06,.08,8),3811868,.29,0,0,0,0,Math.PI/2)])}function ym(){let i=new In(.25,1);return i.scale(1,.92,.8),Mn([Ue(i,16448250,0,0,0),Ue(new ht(.3,.2,.43),2046762,0,-.1,0)])}function vm(){return Mn([Ue(new ht(.42,.03,.1),14673648,0,0,0),Ue(new ht(.1,.03,.42),14673648,0,0,0),Ue(new Rt(.07,.07,.04,6),3752013,0,0,0)])}function Sm(){let i=[],e=7;function t(){return e=e*16807%2147483647,e/2147483647}for(let n=0;n<16;n++){let s=t()*6.283,r=.25+t()*1.75,o=.5+t()*.7;i.push(Ue(new Wn(.13,o,4),n%3?5209903:7031339,Math.sin(s)*r,o/2,Math.cos(s)*r,(t()-.5)*.7,0,(t()-.5)*.7))}return Mn(i)}function Mm(){let s=[Ue(new Rt(3.75,3.95,.14,40),13225430,0,.07,0),Ue(new Rt(.62,.74,.5,8),12173e3,0,.39,0),Ue(new Rt(.46,.5,.16,8),2763830,0,.72,0),Ue(new Rt(.17,.2,3,8),13911338,-1.5,1.5,-4.5),Ue(new Rt(.17,.2,3,8),13911338,1.5,1.5,-4.5),Ue(new ht(4.5,.24,.42),2763830,0,3.08,-4.5),Ue(new ht(3.9,.16,.3),13911338,0,2.86,-4.5),Ue(new ht(3.5,.18,.22),13911338,0,2.3,-4.5)],r=[[-4.5,-4.5],[4.5,-4.5],[-4.5,4.5],[4.5,4.5]];for(let o=0;o<4;o++){let a=r[o][0],c=r[o][1];s.push(Ue(new ht(.5,.16,.5),12173e3,a,.08,c)),s.push(Ue(new ht(.2,.7,.2),12173e3,a,.5,c)),s.push(Ue(new ht(.42,.34,.42),16766826,a,1.02,c)),s.push(Ue(new Wn(.44,.3,4),2763830,a,1.34,c,0,Math.PI/4,0))}return Mn(s)}function bm(i){return Mn([Ue(new Rt(.05,.06,2.6,6),5916208,0,1.3,0),Ue(new ht(.9,.55,.05),i,.5,2.25,0),Ue(new Wn(1.15,1.25,4),14272931,-1.9,.62,-.6,0,Math.PI/4,0),Ue(new ht(1.7,.12,1.7),i,-1.9,.06,-.6,0,Math.PI/4,0),Ue(new Rt(.34,.4,.14,7),5988200,1.3,.07,1.2),Ue(new Wn(.2,.5,5),16751165,1.3,.38,1.2)])}var is=16,Lu=26,Tm=1.17,Bi=420,Em=96;function bn(i){return new We(i)}var Du=class{constructor(e){this.n=0,this.pos=new Float32Array(Bi*3),this.colr=new Float32Array(Bi*4),this.size=new Float32Array(Bi),this.vel=new Float32Array(Bi*3),this.life=new Float32Array(Bi),this.max=new Float32Array(Bi),this.base=new Float32Array(Bi*2);let t=new It;t.setAttribute("position",new Ut(this.pos,3)),t.setAttribute("pcolor",new Ut(this.colr,4)),t.setAttribute("size",new Ut(this.size,1)),t.setDrawRange(0,0),this.mat=new qn({uniforms:{scale:{value:600}},vertexShader:`attribute float size; attribute vec4 pcolor; varying vec4 vColor; uniform float scale;
void main(){ vColor = pcolor; vec4 mv = modelViewMatrix * vec4(position, 1.0);
gl_PointSize = size * scale / -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:`varying vec4 vColor;
void main(){ vec2 d = gl_PointCoord - 0.5; float r = dot(d, d); if (r > 0.25) discard;
gl_FragColor = vec4(vColor.rgb, vColor.a * smoothstep(0.25, 0.12, r));
#include <colorspace_fragment>
}`,transparent:!0,depthWrite:!1}),this.points=new $r(t,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=5,e.add(this.points),this.geo=t,this._c=new We}add(e,t,n,s,r,o,a,c,h,l){let u=this.n;u>=Bi?u=Math.floor(Math.random()*Bi):this.n++,this.pos[u*3]=e,this.pos[u*3+1]=t,this.pos[u*3+2]=n,this.vel[u*3]=s,this.vel[u*3+1]=r,this.vel[u*3+2]=o,this.life[u]=a,this.max[u]=a,this.base[u*2]=c,this.base[u*2+1]=l||0,this._c.set(h),this.colr[u*4]=this._c.r,this.colr[u*4+1]=this._c.g,this.colr[u*4+2]=this._c.b,this.colr[u*4+3]=1,this.size[u]=c}burst(e,t,n,s,r,o,a,c,h,l){for(let u=0;u<s;u++){let f=Math.random()*6.283,d=r*(.4+Math.random()*.6);this.add(e,t,n,Math.sin(f)*d,(l||0)+(Math.random()-.3)*r*.6,Math.cos(f)*d,o*(.6+Math.random()*.4),a*(.6+Math.random()*.6),c,h)}}update(e){let t=this.n;for(let n=0;n<t;n++){if(this.life[n]-=e,this.life[n]<=0){if(t--,n!==t){for(let r=0;r<3;r++)this.pos[n*3+r]=this.pos[t*3+r],this.vel[n*3+r]=this.vel[t*3+r];for(let r=0;r<4;r++)this.colr[n*4+r]=this.colr[t*4+r];this.life[n]=this.life[t],this.max[n]=this.max[t],this.base[n*2]=this.base[t*2],this.base[n*2+1]=this.base[t*2+1]}n--;continue}this.vel[n*3+1]-=this.base[n*2+1]*e,this.pos[n*3]+=this.vel[n*3]*e,this.pos[n*3+1]+=this.vel[n*3+1]*e,this.pos[n*3+2]+=this.vel[n*3+2]*e,this.pos[n*3+1]<.03&&(this.pos[n*3+1]=.03,this.vel[n*3+1]=0);let s=this.life[n]/this.max[n];this.colr[n*4+3]=s<.5?s*2:1,this.size[n]=this.base[n*2]*(.6+.4*s)}this.n=t,this.geo.setDrawRange(0,t),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.pcolor.needsUpdate=!0,this.geo.attributes.size.needsUpdate=!0}},_l=class{constructor(e){this.canvas=e,this.renderer=new fl({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.quality=1,this.scene=new qr;let t=1384750;this.scene.background=bn(t),this.scene.fog=new Xr(t,31,54),this.camera=new pn(50,.5,1,140),this.scene.add(new po(14676479,3889717,2.1));let n=new _o(16773590,2.4);n.position.set(-.55,1,.45),this.scene.add(n),this.matFlat=new gi({vertexColors:!0,flatShading:!0}),this.matGround=new gi({vertexColors:!0,side:$t}),this.geo={conifer:pm(),broad:mm(),bush:gm(),rock:_m(),shuriken:vm(),bramble:Sm(),food:ym(),ring:new Xn(.43,.54,22),disc:new sr(.36,14),ball:new In(1,1),gem:new lo(.34)},this.geo.gem.scale(1,1.35,1),this.geo.ring.rotateX(-Math.PI/2),this.geo.disc.rotateX(-Math.PI/2),this.matShadow=new vt({color:0,transparent:!0,opacity:.26,depthWrite:!1}),this.matShield=new vt({color:fn[3].color,transparent:!0,opacity:.24,depthWrite:!1,blending:ys}),this.starMesh=new ir(this.geo.shuriken,this.matFlat,Em),this.starMesh.frustumCulled=!1,this.starMesh.count=0,this._d=new Ot,this.items=[],this.resurge=!1,this.world=null,this.dyn=new yn,this.scene.add(this.dyn),this.fx=new Du(this.scene),this.ninjas=[],this.projs={},this.areas={},this.slashes=[],this.rings=[],this.time=0,this.cam={x:48,z:48,shake:0},this.orbit=0,this._v=new B,this.w=1,this.h=1,this.deliverP=-1,this.onCue=null}resize(e,t,n){this.w=e,this.h=t;let s=Math.min(n||1,2)*this.quality;this.renderer.setPixelRatio(Math.max(.6,s)),this.renderer.setSize(e,t,!1);let r=e/t;this.camera.aspect=r;let o=6.3/Lu/r;this.camera.fov=gt(2*Math.atan(o)*180/Math.PI,30,58),this.camera.updateProjectionMatrix(),this.fx.mat.uniforms.scale.value=t*Math.max(.6,s)/(2*Math.tan(this.camera.fov*Math.PI/360))}setQuality(e){this.quality=e,this.resize(this.w,this.h,window.devicePixelRatio||1)}buildWorld(e,t){this.world&&(this.scene.remove(this.world),this.world.traverse(function(E){E.geometry&&E.userData.own&&E.geometry.dispose()}));for(let E=0;E<this.items.length;E++)this.items[E].mat.dispose(),this.items[E].ringMat.dispose();this.items=[];let n=!!e.half;this.resurge=n;let s=new yn;this.world=s,this.scene.add(s);let r=e.tiles,o=e.vari,a={g1:bn(6793551),g2:bn(6069318),gb:bn(4885052),path1:bn(13610612),path2:bn(12886632),st1:bn(10988982),st2:bn(9870502),wall:bn(2973491),bed:bn(2776975),bank:bn(8021312),wood1:bn(11566917),wood2:bn(10252090)},c=new We,h=new Ot,l=this;function u(E,x){if(!x.length)return;let M=new ir(E,l.matFlat,x.length);for(let S=0;S<x.length;S++){let _=x[S];h.position.set(_.x,0,_.z),h.rotation.set(0,_.r,0),h.scale.set(_.s,_.sy||_.s,_.s),h.updateMatrix(),M.setMatrixAt(S,h.matrix),c.setRGB(_.c,_.c*(_.cg||1),_.c),M.setColorAt(S,c)}M.instanceMatrix.needsUpdate=!0,M.instanceColor&&(M.instanceColor.needsUpdate=!0),M.computeBoundingSphere(),s.add(M)}function f(E,x,M,S,_,R,I,D,P,F,z,O,W,X,Z,ee,_e,Le,Y){E.push(S,_,R,I,D,P,F,z,O,S,_,R,F,z,O,W,X,Z);for(let se=0;se<6;se++)x.push(ee,_e,Le),M.push(Y.r,Y.g,Y.b)}function d(E,x){if(E<0||x<0||E>=96||x>=96)return!1;let M=r[x*96+E];return M===zn||M===Ti}for(let E=0;E<96/is;E++)for(let x=0;x<96/is;x++){let M=[],S=[],_=[],R=[],I=[],D=[],P=[];for(let O=E*is;O<(E+1)*is;O++)for(let W=x*is;W<(x+1)*is;W++){let X=O*96+W,Z=r[X],ee=o[X]/255,_e=o[(X*7+13)%9216]/255,Le,Y=0;if(Z===zn||Z===Ti){if(Y=-.5,Le=a.bed,d(W,O-1)||f(M,S,_,W,0,O,W+1,0,O,W+1,Y,O,W,Y,O,0,0,1,a.bank),d(W,O+1)||f(M,S,_,W,0,O+1,W+1,0,O+1,W+1,Y,O+1,W,Y,O+1,0,0,-1,a.bank),d(W-1,O)||f(M,S,_,W,0,O,W,0,O+1,W,Y,O+1,W,Y,O,1,0,0,a.bank),d(W+1,O)||f(M,S,_,W+1,0,O,W+1,0,O+1,W+1,Y,O+1,W+1,Y,O,-1,0,0,a.bank),Z===Ti){let ve=(W+O)%2?a.wood1:a.wood2;f(M,S,_,W,.05,O,W,.05,O+1,W+1,.05,O+1,W+1,.05,O,0,1,0,ve)}}else Z===bi?Le=c.copy(a.path1).lerp(a.path2,ee).clone():Z===Ls||Z===Hn?Le=(W+O)%2?a.st1:a.st2:Z===dn?Le=a.wall:Z===Ei?Le=a.gb:Le=c.copy((W+O)%2?a.g1:a.g2).lerp(a.gb,ee*.35).clone();f(M,S,_,W,Y,O,W,Y,O+1,W+1,Y,O+1,W+1,Y,O,0,1,0,Le);let se=ee*6.283;if(Z===Kn){let ve={x:W+.5+(ee-.5)*.12,z:O+.5+(_e-.5)*.12,r:se,s:.8+_e*.26,c:.86+ee*.3,cg:1};(_e>.34?R:I).push(ve)}else if(Z===dn){let ve=!0,De=1;if(n){let de=W+.5-48,Ge=O+.5-48,xt=de*de+Ge*Ge;xt>3025?ve=!1:xt>1681&&(ve=_e<.5,De=1.25)}if(ve){let de={x:W+.5+(ee-.5)*.5,z:O+.5+(_e-.5)*.5,r:se,s:(1.25+_e*.5)*De,c:.6+ee*.22,cg:1};(_e>.2?R:I).push(de)}}else Z===hi?D.push({x:W+.5,z:O+.5,r:se,s:.95+_e*.35,c:.88+ee*.22}):Z===Ei?(P.push({x:W+.3+ee*.12,z:O+.32+_e*.12,r:se,s:.95+_e*.3,c:.85+ee*.3}),P.push({x:W+.72-_e*.1,z:O+.7-ee*.1,r:se+2,s:.8+ee*.3,c:.8+_e*.3})):Z===Ar&&ee>.93&&P.push({x:W+.5,z:O+.5,r:se,s:.3,sy:.22,c:1.25,cg:1.1})}let F=new It;F.setAttribute("position",new ot(M,3)),F.setAttribute("normal",new ot(S,3)),F.setAttribute("color",new ot(_,3));let z=new ze(F,this.matGround);z.userData.own=!0,s.add(z),u(this.geo.conifer,R),u(this.geo.broad,I),u(this.geo.rock,D),u(this.geo.bush,P)}{let E=99991,x=function(){return E=E*16807%2147483647,E/2147483647},M={};for(let S=-7;S<103;S++)for(let _=-7;_<103;_++){if(_>=0&&S>=0&&_<96&&S<96||x()>.62||n&&(_-48)*(_-48)+(S-48)*(S-48)>3025)continue;let R=Math.floor((_+16)/is)+"_"+Math.floor((S+16)/is);(M[R]||(M[R]=[])).push({x:_+.2+x()*.6,z:S+.2+x()*.6,r:x()*6.283,s:1.3+x()*.6,c:.5+x()*.2,cg:1})}for(let S in M)u(this.geo.conifer,M[S])}let p=new ze(new $i(96,96),new gi({color:4565228,transparent:!0,opacity:.8}));p.rotation.x=-Math.PI/2,p.position.set(96/2,-.16,96/2),p.userData.own=!0,s.add(p),this.water=p;let y=new ze(new $i(420,420),new gi({color:2380075}));y.rotation.x=-Math.PI/2,y.position.set(96/2,-.62,96/2),y.userData.own=!0,s.add(y);let m=new ze(Mm(),this.matFlat);m.position.set(48,0,48),m.userData.own=!0,s.add(m),this.orb=new ze(this.geo.ball,new vt({color:16773808})),this.orb.position.set(48,1.12,48),this.orb.scale.setScalar(.27),s.add(this.orb);let g=new Xn(J.SHRINE_R-.14,J.SHRINE_R,72);g.rotateX(-Math.PI/2),this.shrineRing=new ze(g,new vt({color:16766826,transparent:!0,opacity:.9,depthWrite:!1})),this.shrineRing.position.set(48,.17,48),this.shrineRing.userData.own=!0,s.add(this.shrineRing),this.progRing=new ze(new It,new vt({color:16777215,transparent:!0,opacity:.95,depthWrite:!1,side:$t})),this.progRing.position.set(48,.18,48),this.progRing.visible=!1,s.add(this.progRing),this.deliverP=-1;for(let E=0;E<(n?0:t);E++){let x=nd(e,t,E),M=new ze(bm(dt[E].color),this.matFlat),S=x.x-48,_=x.z-48,R=Math.sqrt(S*S+_*_);M.position.set(x.x+S/R*3.4,0,x.z+_/R*3.4),M.rotation.y=Math.atan2(48-x.x,48-x.z),M.userData.own=!0,s.add(M)}this.food=[];for(let E=0;E<e.pickups.length;E++){let x=e.pickups[E],M=new ze(this.geo.food,this.matFlat);M.position.set(x.x,.6,x.z);let S=new ze(this.geo.ring,new vt({color:7208847,transparent:!0,opacity:.7,depthWrite:!1}));S.position.set(x.x,.04,x.z),S.scale.setScalar(.9),s.add(M),s.add(S),this.food.push({m:M,sh:S})}let v=e.items||[];for(let E=0;E<v.length;E++){let x=new gi({color:16777215,flatShading:!0}),M=new ze(this.geo.gem,x);M.position.set(v[E].x,.85,v[E].z),M.visible=!1;let S=new vt({color:16777215,transparent:!0,opacity:.75,depthWrite:!1}),_=new ze(this.geo.ring,S);_.position.set(v[E].x,.045,v[E].z),_.visible=!1,s.add(M),s.add(_),this.items.push({m:M,sh:_,mat:x,ringMat:S,type:-1})}let T=new Rt(1,1,5,72,1,!0);this.zoneWall=new ze(T,new vt({color:10640639,transparent:!0,opacity:.28,side:$t,depthWrite:!1,fog:!1})),this.zoneWall.position.set(48,2.5,48),this.zoneWall.userData.own=!0,this.zoneWall.renderOrder=3,s.add(this.zoneWall);let b=new Xn(1,90,72,1);b.rotateX(-Math.PI/2),this.zoneOut=new ze(b,new vt({color:6959032,transparent:!0,opacity:.4,depthWrite:!1})),this.zoneOut.position.set(48,.1,48),this.zoneOut.userData.own=!0,this.zoneOut.renderOrder=2,s.add(this.zoneOut);let w=new Xn(.992,1,96,1);w.rotateX(-Math.PI/2),this.zoneNext=new ze(w,new vt({color:14137087,transparent:!0,opacity:.4,depthWrite:!1})),this.zoneNext.position.set(48,.12,48),this.zoneNext.userData.own=!0,s.add(this.zoneNext)}buildMatch(e,t,n){for(;this.dyn.children.length;)this.dyn.remove(this.dyn.children[0]);for(let a=0;a<this.ninjas.length;a++){let c=this.ninjas[a];c.mat.dispose(),c.ghostMat.dispose(),c.ringMat.dispose(),c.geos.forEach(function(h){h.dispose()})}this.ninjas=[],this.projs={},this.areas={},this.slashes=[],this.rings=[],this.myId=n,this.myTeam=n>=0?e[n].team:-1;for(let a=0;a<e.length;a++){let c=e[a],h=dt[c.team].color,l=Gt[c.cls].color,u=new gi({vertexColors:!0,flatShading:!0}),f=um(h,l,c.cls),d=Iu(h,!0),p=Iu(h,!1),y=fm(h),m=dm(h),g=new yn,v=new yn,T=new ze(f,u),b=new ze(p,u),w=new ze(d,u),E=new ze(y,u),x=new ze(y,u),M=new ze(m,u);b.position.set(.29,.81,0),w.position.set(-.29,.81,0),E.position.set(.115,.37,0),x.position.set(-.115,.37,0),M.position.set(0,.88,-.2),v.add(T,b,w,E,x,M);let S=new vt({color:a===n?16777215:h,transparent:!1,blending:vc,opacity:.62,depthFunc:$s,depthWrite:!1,fog:!1}),_=new ze(f,S);_.renderOrder=1,T.renderOrder=2,b.renderOrder=2,w.renderOrder=2,E.renderOrder=2,x.renderOrder=2,M.renderOrder=2,v.add(_);let R=new vt({color:a===n?16777215:h,transparent:!0,opacity:.9,depthWrite:!1}),I=new ze(this.geo.ring,R);I.position.y=.05,a===n&&I.scale.setScalar(1.18);let D=new ze(this.geo.disc,this.matShadow);D.position.y=.035;let P=new ze(this.geo.ball,this.matShield);P.position.y=.8,P.scale.set(.62,.95,.62),P.visible=!1,P.renderOrder=4,g.add(v,I,D,P),g.scale.setScalar(1.12),this.dyn.add(g),this.ninjas.push({root:g,body:v,torso:T,armL:b,armR:w,legL:E,legR:x,tail:M,ring:I,ringMat:R,mat:u,ghostMat:S,shield:P,geos:[f,d,p,y,m],cM:0,cS:0,cX:0,cH:0,cD:0,first:!0,phase:a*1.7,run:0,atkT:0,thrT:0,castT:0,dashT:0,hurtT:0,dropT:0,downK:0,seed:a*2.3,wasSt:Me,stepT:0,trail:0})}this.starMesh.count=0,this.dyn.add(this.starMesh),this.scrolls=[];for(let a=0;a<t;a++){let c=Zn[a%2].color,h=new yn,l=xm(c),u=new ze(l,this.matFlat),f=new ze(new Rt(.1,.34,7,8,1,!0),new vt({color:c,transparent:!0,opacity:.35,depthWrite:!1,blending:ys,side:$t}));f.position.y=3.2;let d=new ze(this.geo.ring,new vt({color:c,transparent:!0,opacity:.9,depthWrite:!1}));d.position.y=.06,d.scale.setScalar(1.5),h.add(u,f,d),this.dyn.add(h),this.scrolls.push({grp:h,m:u,beam:f,halo:d})}let s=new Xn(.6,.72,24);s.rotateX(-Math.PI/2),this.targetRing=new ze(s,new vt({color:16731469,transparent:!0,opacity:.85,depthWrite:!1})),this.targetRing.visible=!1,this.dyn.add(this.targetRing);let r=new cr;r.moveTo(0,.42),r.lineTo(.3,-.12),r.lineTo(.1,-.05),r.lineTo(.1,-.3),r.lineTo(-.1,-.3),r.lineTo(-.1,-.05),r.lineTo(-.3,-.12);let o=new ho(r);o.rotateX(Math.PI/2),this.arrow=new ze(o,new vt({color:16777215,transparent:!0,opacity:.95,depthWrite:!1,side:$t,fog:!1})),this.arrow.visible=!1,this.arrow.renderOrder=4,this.dyn.add(this.arrow)}slash(e,t,n,s){let r=null;for(let o=0;o<this.slashes.length;o++)if(this.slashes[o].t<=0){r=this.slashes[o];break}if(!r){if(this.slashes.length>10)return;let o=new Xn(.75,J.MELEE_R,16,1,Math.PI/2-J.MELEE_ARC,J.MELEE_ARC*2);o.rotateX(-Math.PI/2);let a=new ze(o,new vt({color:16777215,transparent:!0,opacity:.8,depthWrite:!1,side:$t,blending:ys}));r={m:a,t:0},this.slashes.push(r),this.scene.add(a)}r.t=.2,r.m.material.color.set(s).lerp(bn(16777215),.6),r.m.position.set(e,.75,t),r.m.rotation.y=n-Math.PI/2,r.m.visible=!0}ringFx(e,t,n,s,r,o){let a=null;for(let c=0;c<this.rings.length;c++)if(this.rings[c].t<=0){a=this.rings[c];break}if(!a){if(this.rings.length>12)return;let c=new Xn(.8,1,40);c.rotateX(-Math.PI/2);let h=new ze(c,new vt({color:16777215,transparent:!0,opacity:.9,depthWrite:!1,side:$t}));a={m:h,t:0,life:1,r:1},this.rings.push(a),this.scene.add(h)}a.t=r,a.life=r,a.r=n,a.m.material.color.set(s),a.m.position.set(e,o||.2,t),a.m.visible=!0}event(e,t){let n=this.fx,s=t.ninjas,r=e[0];if(r==="hit"){let o=s[e[1]];if(!o||o.hidden)return;let a=e[3],c=a===2?16747069:a===3?9425231:a===4?11565823:16777215;n.burst(o.x,.9,o.z,a===4?3:7,3.2,.3,.2,c,6,1),e[1]===this.myId&&(this.cam.shake=Math.min(.5,this.cam.shake+.22))}else if(r==="down"||r==="out"){let o=s[e[1]];o&&(n.burst(o.x,.6,o.z,r==="out"?22:14,2.6,.7,.42,r==="out"?10134453:14541806,0,.6),this.resurge&&r==="down"&&(n.burst(o.x,.9,o.z,16,3.6,.5,.46,dt[o.team].color,3,1.4),this.ringFx(o.x,o.z,1.8,16777215,.28)))}else if(r==="rev"||r==="resp"){let o=s[e[1]];r==="resp"&&this.resurge?this.ninjas[e[1]]&&t.phase===1&&(this.ninjas[e[1]].dropT=.3):o&&(this.ringFx(o.x,o.z,1.6,10354608,.5),n.burst(o.x,.4,o.z,14,1.4,.8,.22,10354608,-3,1.5))}else if(r==="pw"){let o=s[e[1]],a=fn[e[2]];o&&a&&!o.hidden&&(this.ringFx(o.x,o.z,1.5,a.color,.4),n.burst(o.x,.5,o.z,12,1.6,.7,.24,a.color,-4,1.6))}else if(r==="shield"){let o=s[e[1]];o&&!o.hidden&&(this.ringFx(o.x,o.z,1.9,fn[3].color,.3,.8),n.burst(o.x,.9,o.z,16,4.2,.4,.26,fn[3].color,7,1.2))}else if(r==="star"){let o=s[e[1]];o&&!o.hidden&&n.burst(o.x,.3,o.z,4,1.4,.3,.14,16777215,-2,1)}else if(r==="heal"||r==="food"){let o=s[e[1]];o&&!o.hidden&&n.burst(o.x,.5,o.z,9,.9,.8,.2,8257434,-4,1.2)}else if(r==="pick"||r==="drop"){let o=s[e[1]];if(o){let a=Zn[e[2]%2].color;this.ringFx(o.x,o.z,1.4,a,.45),n.burst(o.x,1.2,o.z,12,2.2,.6,.2,a,3,1.5)}}else if(r==="fx"){let o=e[2]/100,a=e[3]/100;if(e[1]==="boom"){this.ringFx(o,a,J.FIRE_R,16757575,.35),n.burst(o,.5,a,26,6,.55,.55,16742959,4,2),n.burst(o,.5,a,12,3,.7,.5,16769162,2,3);let c=o-this.cam.x,h=a-this.cam.z;c*c+h*h<90&&(this.cam.shake=Math.min(.5,this.cam.shake+.25))}else if(e[1]==="heal")this.ringFx(o,a,J.HEAL_R,5230847,.55),n.burst(o,.3,a,20,3.2,.8,.26,9430015,-3,1.5);else if(e[1]==="bram")n.burst(o,.3,a,16,3.2,.5,.3,9425231,6,2);else if(e[1]==="clink")n.burst(o,.8,a,4,2,.2,.14,16777215,5,1);else if(e[1]==="boom2"){this.ringFx(o,a,J.BOOM_R,fn[2].color,.28),n.burst(o,.6,a,14,4.6,.4,.42,16742959,4,1.4),n.burst(o,.6,a,6,2.4,.5,.36,16769162,2,2);let c=o-this.cam.x,h=a-this.cam.z;c*c+h*h<60&&(this.cam.shake=Math.min(.5,this.cam.shake+.14))}}}update(e,t,n,s){this.time+=t;let r=this.time,o=this.fx,a=e.ninjas;for(let S=0;S<this.ninjas.length;S++)a[S]?this.updateNinja(this.ninjas[S],a[S],t,S):this.ninjas[S].root.visible=!1;for(let S=0;S<this.scrolls.length;S++){let _=this.scrolls[S],R=e.scrolls[S];if(!R){_.grp.visible=!1;continue}let I=R.carrier>=0,D=I?a[R.carrier]:null,P=!(I&&(D.hidden||D.st===Vt));if(_.grp.visible=P,!!P){if(_.grp.position.set(R.x,0,R.z),_.beam.visible=!I,_.halo.visible=!I,_.m.position.y=I?1.95+Math.sin(r*3+S)*.05:.75+Math.sin(r*2.4+S)*.12,I){let F=0;for(let z=0;z<S;z++)e.scrolls[z].carrier===R.carrier&&F++;_.m.position.y+=F*.3}_.m.rotation.y=r*1.6+S,_.m.scale.setScalar(I?.85:1.25),I||_.halo.scale.setScalar(1.4+Math.sin(r*5)*.2)}}for(let S=0;S<this.food.length;S++){let _=this.food[S],R=e.food>>S&1;_.m.visible=!!R,_.sh.visible=!!R,R&&(_.m.position.y=.62+Math.sin(r*2.6+S)*.1,_.m.rotation.y=r*1.3+S)}let c=e.items||[];for(let S=0;S<this.items.length;S++){let _=this.items[S],R=(c[S]||0)-1,I=R>=0;_.m.visible=I,_.sh.visible=I,I&&(R!==_.type&&(_.type=R,_.mat.color.set(fn[R].color),_.mat.emissive.set(fn[R].color).multiplyScalar(.4),_.ringMat.color.set(fn[R].color)),_.m.position.y=.85+Math.sin(r*3+S)*.12,_.m.rotation.y=r*2.2+S,_.sh.scale.setScalar(1.25+Math.sin(r*4+S)*.14))}let h=e.stars||[],l=Math.min(Em,h.length>>1),u=this._d;for(let S=0;S<l;S++){let _=h[S*2]/10,R=h[S*2+1]/10;u.position.set(_,.11,R),u.rotation.set(.22,(h[S*2]*.37+h[S*2+1]*.11)%6.283+r*1.4,0),u.scale.setScalar(1.3),u.updateMatrix(),this.starMesh.setMatrixAt(S,u.matrix),Math.random()<.022&&o.add(_,.25,R,0,.7,0,.4,.13,16777215,0)}this.starMesh.count=l,l&&(this.starMesh.instanceMatrix.needsUpdate=!0);let f={};for(let S=0;S<e.proj.length;S++){let _=e.proj[S];f[_.id]=1;let R=this.projs[_.id];if(!R){let I;_.kind===0?I=new ze(this.geo.shuriken,this.matFlat):(I=new ze(this.geo.ball,new vt({color:_.kind===1?16753213:10212938})),I.scale.setScalar(_.kind===1?.3:.18)),R=this.projs[_.id]={m:I,kind:_.kind,life:Math.max(.05,_.ttl),t:0},this.scene.add(I)}if(R.t+=t,_.kind===0)R.m.position.set(_.x,.85,_.z),R.m.rotation.y=r*30,_.boom?o.add(_.x,.85,_.z,0,.2,0,.22,.24,16747069,0):Math.random()<.5&&o.add(_.x,.85,_.z,0,0,0,.14,.11,13621478,0);else{let I=_.kind===1?J.FIRE_T:J.SEED_T,D=gt(1-_.ttl/I,0,1),P=.9+Math.sin(D*Math.PI)*2.2;R.m.position.set(_.x,P,_.z),o.add(_.x,P,_.z,Math.random()-.5,.4,Math.random()-.5,.3,_.kind===1?.36:.2,_.kind===1?16742959:8372031,0)}}for(let S in this.projs)if(!f[S]){let _=this.projs[S];this.scene.remove(_.m),_.kind!==0&&_.m.material.dispose(),delete this.projs[S]}let d={};for(let S=0;S<e.areas.length;S++){let _=e.areas[S];d[_.id]=1;let R=this.areas[_.id];if(!R){let D=new ze(this.geo.bramble,this.matFlat),P=new sr(_.r,28);P.rotateX(-Math.PI/2);let F=new ze(P,new vt({color:_.team===this.myTeam?7323450:12597547,transparent:!0,opacity:.25,depthWrite:!1}));F.position.y=.07;let z=new yn;z.add(D,F),z.position.set(_.x,0,_.z),R=this.areas[_.id]={grp:z,m:D,d:F,grow:0},this.scene.add(z)}R.grow=Math.min(1,R.grow+t*6);let I=R.grow*Math.min(1,_.ttl*2.5);R.m.scale.set(1,Math.max(.01,I),1)}for(let S in this.areas)if(!d[S]){let _=this.areas[S];this.scene.remove(_.grp),_.d.geometry.dispose(),_.d.material.dispose(),delete this.areas[S]}for(let S=0;S<this.slashes.length;S++){let _=this.slashes[S];_.t<=0||(_.t-=t,_.m.material.opacity=Math.max(0,_.t/.2)*.8,_.t<=0&&(_.m.visible=!1))}for(let S=0;S<this.rings.length;S++){let _=this.rings[S];if(_.t<=0)continue;_.t-=t;let R=1-Math.max(0,_.t)/_.life;_.m.scale.setScalar(.2+R*_.r),_.m.material.opacity=(1-R)*.9,_.t<=0&&(_.m.visible=!1)}let p=e.zone,y=Math.max(.3,p.r);this.zoneWall.scale.set(y,1,y),this.zoneOut.scale.set(y,1,y),this.zoneWall.material.opacity=.22+Math.sin(r*2.2)*.06;let m=p.to<p.r-.5&&p.stage<5;this.zoneNext.visible=m,m&&this.zoneNext.scale.set(Math.max(.3,p.to),1,Math.max(.3,p.to));let g=s&&s.sealed;this.shrineRing.material.color.set(g?9410211:16766826),this.shrineRing.material.opacity=g?.5:.7+Math.sin(r*4)*.25,this.orb.scale.setScalar(g?.2:.27+Math.sin(r*3)*.035),this.orb.material.color.set(g?10134453:16773808);let v=0,T=-1;for(let S=0;S<e.deliver.length;S++)e.deliver[S]>v&&(v=e.deliver[S],T=S);let b=Math.round(v*50);if(b!==this.deliverP)if(this.deliverP=b,this.progRing.geometry.dispose(),b>0){let S=new Xn(J.SHRINE_R-.75,J.SHRINE_R-.25,64,1,0,Math.PI*2*b/50);S.rotateX(-Math.PI/2),this.progRing.geometry=S,this.progRing.material.color.set(dt[T].color),this.progRing.visible=!0}else this.progRing.geometry=new It,this.progRing.visible=!1;this.water&&(this.water.position.y=-.17+Math.sin(r*1.3)*.02);let w=n>=0?a[n]:null,E=s&&s.target;this.targetRing.visible=!!E,E&&(this.targetRing.position.set(E.x,.06,E.z),this.targetRing.scale.setScalar(1+Math.sin(r*9)*.07));let x=s&&s.objective;if(this.arrow.visible=!!(x&&w&&w.st===Me),this.arrow.visible){let S=x.x-w.x,_=x.z-w.z;if(Math.sqrt(S*S+_*_)<3.2)this.arrow.visible=!1;else{let I=Math.atan2(S,_),D=1.5+Math.sin(r*5)*.08;this.arrow.position.set(w.x+Math.sin(I)*D,.2,w.z+Math.cos(I)*D),this.arrow.rotation.y=I,this.arrow.material.color.set(x.color)}}o.update(t);let M=this.cam;if(s&&s.orbit){this.orbit+=t*.07;let S=17;this.camera.position.set(48+Math.sin(this.orbit)*S,12,48+Math.cos(this.orbit)*S),this.camera.lookAt(48,1.2,48)}else{if(w){let D=1-Math.exp(-t*9),P=w.x-M.x,F=w.z-M.z;P*P+F*F>400?(M.x=w.x,M.z=w.z):(M.x+=P*D,M.z+=F*D)}let S=0,_=0;M.shake>0&&(M.shake=Math.max(0,M.shake-t*1.6),S=(Math.random()-.5)*M.shake,_=(Math.random()-.5)*M.shake);let R=.8,I=M.z+1.6;this.camera.position.set(M.x+S,R+Math.sin(Tm)*Lu,I+Math.cos(Tm)*Lu+_),this.camera.lookAt(M.x+S,R,I+_)}this.camera.updateMatrixWorld()}updateNinja(e,t,n,s){let r=t.st!==Vt&&!t.hidden&&!(this.resurge&&t.st===Pt);if(e.root.visible=r,(e.first||!r)&&(e.cM=t.cM,e.cS=t.cS,e.cX=t.cX,e.cH=t.cH,e.cD=t.cD,e.first=!1,e.wasSt=t.st,!r))return;let o=this.time,a=this.fx;e.root.position.set(t.x,0,t.z),e.root.rotation.y=t.f;let c=dt[t.team].color;t.cM!==e.cM&&(e.cM=t.cM,e.atkT=.26,this.slash(t.x,t.z,t.f,c),this.onCue&&this.onCue("swing",t,s)),t.cS!==e.cS&&(e.cS=t.cS,e.thrT=.2,this.onCue&&this.onCue("throw",t,s)),t.cX!==e.cX&&(e.cX=t.cX,e.castT=.42,this.ringFx(t.x,t.z,1.3,Gt[t.cls].color,.35),this.onCue&&this.onCue("cast",t,s)),t.cD!==e.cD&&(e.cD=t.cD,e.dashT=.24,a.burst(t.x,.2,t.z,9,2.2,.45,.34,15265527,0,.5),this.onCue&&this.onCue("dash",t,s)),t.cH!==e.cH&&(e.cH=t.cH,e.hurtT=.16),e.run+=((t.moving&&t.st===Me?1:0)-e.run)*Math.min(1,n*12),e.phase+=n*13.5*e.run;let h=Math.sin(e.phase)*.95*e.run;e.legL.rotation.x=h,e.legR.rotation.x=-h,e.armL.rotation.x=-h*.8,e.armR.rotation.x=h*.8,e.armL.rotation.z=0,e.armR.rotation.z=0;let l=Math.abs(Math.sin(e.phase))*.07*e.run+Math.sin(o*2.2+e.seed)*.012,u=.14*e.run,f=0;if(e.atkT>0){e.atkT-=n;let T=1-Math.max(0,e.atkT)/.26;e.armR.rotation.x=-2.5+T*3.3,e.armR.rotation.z=-.35,f=(.5-T)*1,u+=.18}if(e.thrT>0){e.thrT-=n;let T=1-Math.max(0,e.thrT)/.2;e.armL.rotation.x=-2.7+T*2.5}if(e.castT>0){e.castT-=n;let T=Math.sin((1-Math.max(0,e.castT)/.42)*Math.PI);e.armL.rotation.x=-2.9*T,e.armR.rotation.x=-2.9*T,e.armL.rotation.z=.3*T,e.armR.rotation.z=-.3*T,l+=.12*T}let d=1;if(e.dashT>0&&(e.dashT-=n,u=.75,d=1.3,Math.random()<.8&&a.add(t.x,.6,t.z,0,.2,0,.25,.4,c,0)),e.run>.6&&(e.stepT-=n,e.stepT<=0&&(e.stepT=.23,Math.random()<.5&&a.add(t.x,.06,t.z,0,.3,0,.3,.2,13220239,0),this.onCue&&s===this.myId&&this.onCue("step",t,s))),e.dropT>0){e.dropT-=n;let T=Math.max(0,e.dropT)/.3;l+=T*T*8,e.dropT<=0&&(a.burst(t.x,.15,t.z,12,2.8,.4,.34,15265527,0,.4),this.ringFx(t.x,t.z,1.5,c,.32),this.onCue&&this.onCue("land",t,s))}if(e.shield.visible=t.st===Me&&!!t.pw&&t.pw.indexOf(3)>=0,e.shield.visible){let T=1+Math.sin(o*6+e.seed)*.05;e.shield.scale.set(.62*T,.95,.62*T)}let p=t.st===Pt?1:0;e.downK+=(p-e.downK)*Math.min(1,n*10),e.body.rotation.x=u*(1-e.downK)-1.5*e.downK,e.body.rotation.y=f,e.body.position.y=l*(1-e.downK)+.2*e.downK,e.body.scale.set(1,1,d),e.tail.rotation.x=-.25-e.run*.8+Math.sin(o*11+e.seed)*.13*(.3+e.run),e.ring.visible=!p,s===this.myId&&e.ring.scale.setScalar(1.18+Math.sin(o*4)*.05);let y=e.mat.emissive,m=0,g=0,v=0;if(t.fl&Ko){let T=.25+Math.sin(o*18)*.12;m+=T,g+=T*.35,Math.random()<.3&&a.add(t.x+(Math.random()-.5)*.4,.5+Math.random()*.8,t.z+(Math.random()-.5)*.4,0,1.4,0,.4,.22,16747069,-1)}if(t.fl&Rs?g+=.1:t.fl&Ps&&(g+=.05),e.hurtT>0){e.hurtT-=n;let T=Math.max(0,e.hurtT)/.16;m+=T*.9,g+=T*.9,v+=T*.9}p&&(m*=.3,g*=.3,v*=.3),y.setRGB(m,g,v),t.fl&Qo&&e.dashT<=0?e.body.visible=Math.sin(o*40)>-.3:e.body.visible=!0,e.wasSt!==t.st&&(e.wasSt=t.st)}project(e,t,n,s){let r=this._v.set(e,t,n).project(this.camera);return s.x=(r.x*.5+.5)*this.w,s.y=(-r.y*.5+.5)*this.h,s.vis=r.z>-1&&r.z<1&&r.x>-1.15&&r.x<1.15&&r.y>-1.15&&r.y<1.15,s}render(){this.renderer.render(this.scene,this.camera)}};var xl=class{constructor(){this.jx=0,this.jz=0,this.held={melee:!1,shuriken:!1,dash:!1,special:!1},this.edge={dash:!1,special:!1,melee:!1,shuriken:!1},this.keys={},this.joyId=null,this.ox=0,this.oy=0,this.out={mx:0,mz:0,melee:!1,shuriken:!1,dash:!1,special:!1},this.enabled=!1,this.R=54}attach(e,t,n,s){this.zone=e,this.base=t,this.knob=n;let r=this,o={passive:!1};e.addEventListener("pointerdown",function(c){if(c.preventDefault(),r.joyId!==null)return;r.joyId=c.pointerId,r.ox=c.clientX,r.oy=c.clientY;try{e.setPointerCapture(c.pointerId)}catch{}let h=e.getBoundingClientRect();t.style.left=c.clientX-h.left+"px",t.style.top=c.clientY-h.top+"px",t.classList.add("on"),r.moveJoy(c)},o),e.addEventListener("pointermove",function(c){c.pointerId===r.joyId&&(c.preventDefault(),r.moveJoy(c))},o);function a(c){c.pointerId===r.joyId&&(r.joyId=null,r.jx=0,r.jz=0,t.classList.remove("on"),t.style.left="",t.style.top="",n.style.transform="translate(-50%,-50%)")}e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a),e.addEventListener("lostpointercapture",a);for(let c=0;c<s.length;c++){let h=s[c],l=h.getAttribute("data-act"),u=function(d){d.preventDefault(),r.held[l]=!0,l in r.edge&&(r.edge[l]=!0),h.classList.add("down");try{h.setPointerCapture(d.pointerId)}catch{}},f=function(){r.held[l]=!1,h.classList.remove("down")};h.addEventListener("pointerdown",u,o),h.addEventListener("pointerup",f),h.addEventListener("pointercancel",f),h.addEventListener("lostpointercapture",f),h.addEventListener("contextmenu",function(d){d.preventDefault()})}window.addEventListener("keydown",function(c){c.repeat||(r.keys[c.code]=!0,(c.code==="KeyL"||c.code==="Space")&&(r.edge.dash=!0),(c.code==="KeyI"||c.code==="KeyU")&&(r.edge.special=!0),c.code==="KeyJ"&&(r.edge.melee=!0),c.code==="KeyK"&&(r.edge.shuriken=!0))}),window.addEventListener("keyup",function(c){r.keys[c.code]=!1}),window.addEventListener("blur",function(){r.reset()})}moveJoy(e){let t=e.clientX-this.ox,n=e.clientY-this.oy,s=Math.sqrt(t*t+n*n),r=this.R,o=s>r?r/s:1;this.knob.style.transform="translate(calc(-50% + "+t*o+"px), calc(-50% + "+n*o+"px))";let a=Math.min(1,s/r);if(a<.2){this.jx=0,this.jz=0;return}let c=Math.min(1,(a-.2)/.45);this.jx=t/s*c,this.jz=n/s*c}reset(){this.jx=0,this.jz=0,this.joyId=null,this.keys={};for(let e in this.held)this.held[e]=!1;this.edge.dash=!1,this.edge.special=!1,this.edge.melee=!1,this.edge.shuriken=!1,this.base&&(this.base.classList.remove("on"),this.base.style.left="",this.base.style.top=""),this.knob&&(this.knob.style.transform="translate(-50%,-50%)")}read(){let e=this.out,t=this.keys,n=this.jx,s=this.jz,r=(t.KeyD||t.ArrowRight?1:0)-(t.KeyA||t.ArrowLeft?1:0),o=(t.KeyS||t.ArrowDown?1:0)-(t.KeyW||t.ArrowUp?1:0);if(r||o){let a=Math.sqrt(r*r+o*o);n=r/a,s=o/a}return this.enabled||(n=0,s=0),e.mx=n,e.mz=s,e.melee=this.enabled&&(this.held.melee||!!t.KeyJ||this.edge.melee),e.shuriken=this.enabled&&(this.held.shuriken||!!t.KeyK||this.edge.shuriken),e.dash=this.enabled&&this.edge.dash,e.special=this.enabled&&this.edge.special,this.edge.dash=!1,this.edge.special=!1,this.edge.melee=!1,this.edge.shuriken=!1,e}};var yl=class{constructor(){this.ctx=null,this.sfxOn=!0,this.musicOn=!0,this.master=null,this.musicGain=null,this.timer=null,this.step=0,this.nextT=0,this.mood=0,this.noiseBuf=null,this.last={}}unlock(){if(!this.ctx){let e=window.AudioContext||window.webkitAudioContext;if(!e)return;try{this.ctx=new e}catch{return}this.master=this.ctx.createGain(),this.master.gain.value=.9;let t=this.ctx.createDynamicsCompressor();this.master.connect(t),t.connect(this.ctx.destination),this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=this.musicOn?.5:0,this.musicGain.connect(this.master);let n=this.ctx.sampleRate*1;this.noiseBuf=this.ctx.createBuffer(1,n,this.ctx.sampleRate);let s=this.noiseBuf.getChannelData(0);for(let r=0;r<n;r++)s[r]=Math.random()*2-1;this.startMusic()}if(this.ctx.state!=="running")try{this.ctx.resume()}catch{}}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend()}resume(){if(this.ctx&&this.ctx.state!=="running")try{this.ctx.resume()}catch{}}setSfx(e){this.sfxOn=e}setMusic(e){this.musicOn=e,this.musicGain&&this.musicGain.gain.setTargetAtTime(e?.5:0,this.ctx.currentTime,.1)}setMood(e){this.mood=e}tone(e,t,n,s,r,o,a){let c=this.ctx;if(!c)return;let h=c.currentTime+(o||0),l=c.createOscillator(),u=c.createGain();l.type=n||"sine",l.frequency.setValueAtTime(e,h),r&&l.frequency.exponentialRampToValueAtTime(Math.max(20,r),h+t),u.gain.setValueAtTime(1e-4,h),u.gain.exponentialRampToValueAtTime(Math.max(2e-4,s),h+.008),u.gain.exponentialRampToValueAtTime(1e-4,h+t),l.connect(u),u.connect(a||this.master),l.start(h),l.stop(h+t+.03)}noise(e,t,n,s,r,o,a,c){let h=this.ctx;if(!h)return;let l=h.currentTime+(a||0),u=h.createBufferSource(),f=h.createBiquadFilter(),d=h.createGain();u.buffer=this.noiseBuf,u.loop=!0,f.type=n||"lowpass",f.Q.value=o||.8,f.frequency.setValueAtTime(s,l),r&&f.frequency.exponentialRampToValueAtTime(Math.max(30,r),l+e),d.gain.setValueAtTime(1e-4,l),d.gain.exponentialRampToValueAtTime(Math.max(2e-4,t),l+.01),d.gain.exponentialRampToValueAtTime(1e-4,l+e),u.connect(f),f.connect(d),d.connect(c||this.master),u.start(l,Math.random()*.5),u.stop(l+e+.03)}play(e,t){if(!this.ctx||!this.sfxOn||this.ctx.state!=="running"||(t==null&&(t=1),t<=.03))return;let n=this.ctx.currentTime;if(!(this.last[e]&&n-this.last[e]<.035))switch(this.last[e]=n,e){case"click":this.tone(880,.05,"triangle",.12*t);break;case"step":this.noise(.05,.035*t,"lowpass",500,200,.7);break;case"swing":this.noise(.13,.2*t,"bandpass",900,3200,1.2);break;case"throw":this.noise(.09,.14*t,"highpass",2500,6e3,.8),this.tone(1400,.07,"triangle",.05*t,2200);break;case"star":this.tone(1900,.05,"triangle",.1*t,2500);break;case"power":this.tone(523,.09,"square",.06*t),this.tone(784,.09,"square",.06*t,0,.07),this.tone(1047,.2,"triangle",.13*t,0,.14);break;case"shield":this.tone(1250,.22,"triangle",.16*t,900),this.noise(.08,.14*t,"highpass",3500,6e3,1);break;case"land":this.tone(150,.12,"sine",.22*t,70),this.noise(.1,.12*t,"lowpass",900,300,.7);break;case"clink":this.tone(2600,.06,"square",.04*t,1800);break;case"hit":this.tone(190,.1,"sine",.3*t,60),this.noise(.06,.16*t,"lowpass",2400,500,.7);break;case"hurt":this.tone(240,.16,"sawtooth",.16*t,70),this.noise(.1,.22*t,"lowpass",1800,300,.7);break;case"dash":this.noise(.2,.2*t,"bandpass",2600,500,1.4);break;case"cast":this.tone(330,.22,"triangle",.14*t,880);break;case"boom":this.tone(130,.45,"sine",.42*t,34),this.noise(.5,.36*t,"lowpass",2600,120,.6);break;case"heal":this.tone(523,.14,"sine",.13*t),this.tone(659,.14,"sine",.13*t,0,.08),this.tone(784,.22,"sine",.13*t,0,.16);break;case"bram":this.tone(220,.25,"sawtooth",.09*t,90),this.noise(.25,.14*t,"bandpass",700,1800,2);break;case"food":this.tone(660,.08,"triangle",.14*t),this.tone(990,.12,"triangle",.14*t,0,.07);break;case"pick":this.tone(880,.12,"triangle",.16*t),this.tone(1175,.12,"triangle",.16*t,0,.09),this.tone(1568,.3,"triangle",.16*t,0,.18);break;case"drop":this.tone(700,.14,"triangle",.14*t,350),this.tone(440,.24,"triangle",.12*t,220,.12);break;case"down":this.tone(392,.16,"square",.07*t,300),this.tone(262,.3,"square",.07*t,130,.14);break;case"revive":this.tone(392,.12,"triangle",.14*t),this.tone(523,.12,"triangle",.14*t,0,.1),this.tone(784,.3,"triangle",.14*t,0,.2);break;case"beep":this.tone(620,.12,"square",.07*t);break;case"go":this.tone(930,.4,"square",.08*t),this.tone(1240,.4,"triangle",.1*t);break;case"alarm":this.tone(440,.22,"sawtooth",.07*t),this.tone(349,.3,"sawtooth",.07*t,0,.24);break;case"gong":this.tone(98,1.6,"sine",.3*t,92),this.tone(196,1.2,"triangle",.1*t,190),this.noise(.5,.08*t,"bandpass",900,400,3);break;case"win":[523,659,784,1047,1319].forEach((s,r)=>this.tone(s,.3,"triangle",.16*t,0,r*.13));break;case"lose":[392,330,262,196].forEach((s,r)=>this.tone(s,.4,"triangle",.14*t,0,r*.2));break;default:break}}startMusic(){this.timer||(this.nextT=this.ctx.currentTime+.1,this.seed=12345,this.timer=setInterval(()=>this.schedule(),90))}rnd(){return this.seed=this.seed*16807%2147483647,this.seed/2147483647}schedule(){let e=this.ctx;if(!e||e.state!=="running")return;this.nextT<e.currentTime&&(this.nextT=e.currentTime+.05);let n=60/(this.mood===2?132:this.mood===1?104:84)/2,s=[146.83,174.61,196,220,261.63,293.66,349.23,392,440,523.25];for(;this.nextT<e.currentTime+.3;){let r=this.step++%32,o=this.nextT-e.currentTime,a=Math.floor(r/8);if((r%8===0||this.mood===2&&r%4===0||this.mood>=1&&r%16===6)&&(this.tone(96,.22,"sine",.3,42,o,this.musicGain),this.noise(.05,.05,"lowpass",900,200,.7,o,this.musicGain)),this.mood>=1&&r%4===2&&this.noise(.03,.03,"highpass",6e3,0,.7,o,this.musicGain),r%8===0){let h=[0,0,2,1][a];this.tone(s[h]/2,n*7,"triangle",.12,0,o,this.musicGain)}let c=this.mood===2?.62:this.mood===1?.5:.36;(r%2===0?this.rnd()<c+.2:this.rnd()<c-.25)&&(this.note=this.note==null?5:this.note+Math.round((this.rnd()-.5)*4),this.note<2&&(this.note=3),this.note>9&&(this.note=7),this.tone(s[this.note],.5,"triangle",.075,0,o,this.musicGain),this.tone(s[this.note]*2,.12,"sine",.02,0,o,this.musicGain)),this.nextT+=n}}};var cn={melee:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.5 2.5l1 1L10 15l-1.6-1.6z"/><path fill="currentColor" d="M5.8 12.6l5.6 5.6-1.5 1.4-2-2-2.6 2.7-1.6-1.6 2.7-2.6-2-2z"/></svg>',shuriken:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6-2.6 7.9-2.6-7.9L1.5 12l7.9-2.6z"/><circle cx="12" cy="12" r="1.9" fill="#182033"/></svg>',dash:'<svg viewBox="0 0 24 24"><path d="M4 5l7 7-7 7M12.5 5l7 7-7 7" stroke="currentColor" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',cls:['<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12.6 1.5c.9 4.1 5.4 5.9 5.4 11.4a6 6 0 0 1-12 0c0-2.3 1.2-3.8 2.4-4.9.1 2.2 1 3.4 2.2 3.4.2-3.300-.9-5.600 2-9.900z"/></svg>','<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.800c4.300 6.100 6.500 8.800 6.500 12.400a6.500 6.500 0 0 1-13 0c0-3.600 2.200-6.300 6.500-12.400z"/></svg>','<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3.500 20.500C3.500 10 9.500 3.500 20.500 3.500c0 11-6.500 17-17 17z"/><path d="M4.500 19.500L14 10" stroke="#182033" stroke-width="1.700" fill="none"/></svg>'],sol:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#ffcf4a"/><g stroke="#ffcf4a" stroke-width="2.200" stroke-linecap="round"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.900 4.900l2.100 2.100M17 17l2.100 2.100M4.900 19.100L7 17M17 7l2.100-2.100"/></g></svg>',luna:'<svg viewBox="0 0 24 24"><path fill="#c3d0ff" d="M15 2.500a9.500 9.500 0 1 0 6.500 16.200A8.300 8.300 0 0 1 15 2.500z"/></svg>'};function He(i){return document.getElementById(i)}function Ft(i){return String(i).replace(/[&<>"]/g,function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[e]})}function Am(i){i=Math.max(0,Math.ceil(i));let e=Math.floor(i/60),t=i%60;return e+":"+(t<10?"0":"")+t}var vl=class{constructor(e,t){this.h=e,this.set=t,this.root=He("ui"),this.hud=He("hud"),this.name=null,this.data={},this.overlay=null;let n=this;this.root.addEventListener("click",function(s){let r=s.target;for(;r&&r!==n.root&&!(r.getAttribute&&r.getAttribute("data-a"));)r=r.parentNode;!r||r===n.root||(n.h.click(),n.action(r.getAttribute("data-a"),r.getAttribute("data-v"),r))}),He("bMenu").addEventListener("click",function(){n.h.click(),n.h.pause()}),this.bannerT=0,this.feed=[],this.slow=0,this.mmT=0,this.lb=[],this.dmgPool=[],this.dmgI=0,this._p={x:0,y:0,vis:!1},this.mapImg=null}show(e,t){this.name=e,this.data=t||{},this.overlay=null,this.render()}hide(){this.name=null,this.overlay=null,this.root.innerHTML=""}showOverlay(e){this.overlay=e,this.render()}closeOverlay(){this.overlay=null,this.render()}action(e,t,n){let s=this.set,r=this.data,o=this.h;switch((this.name==="mp"||this.name==="opts")&&this.readName(),e){case"go":this.show(t),t==="lan"&&o.lanScan();break;case"back":o.back(this.name);break;case"cls":s.cls=+t,o.save(),this.name==="lobby"&&o.lobbyCls(+t),this.render();break;case"diff":s.diff=+t,o.save(),this.name==="lobby"&&o.lobbyOpt(),this.render();break;case"teams":s.teams=+t,o.save(),this.name==="lobby"&&o.lobbyOpt(),this.render();break;case"gmode":s.mode=+t==0?0:1,o.save(),this.name==="lobby"&&o.lobbyOpt(),this.render();break;case"solo":o.solo();break;case"host":this.readName(),o.host(t);break;case"join":this.readName(),o.join("net",(He("fCode").value||"").trim().toUpperCase());break;case"joinip":this.readName(),o.join("lan",t||(He("fIp").value||"").trim());break;case"joinhere":this.readName(),o.join("lan",location.host);break;case"scan":o.lanScan();break;case"slot":{let a=t.split(",");o.lobbySlot(+a[0],+a[1]);break}case"start":o.start();break;case"again":o.again();break;case"leave":o.leave();break;case"resume":o.resume();break;case"tog":s[t]=!s[t],o.save(),o.applySettings(),this.render();break;case"ov":this.showOverlay(t);break;case"ovx":this.closeOverlay();break;default:break}}readName(){let e=He("fName");if(!e)return;let t=e.value.replace(/[<>&"]/g,"").trim().slice(0,12);t&&(this.set.name=t,this.h.save())}msg(e,t){let n=He("msg");n&&(n.textContent=e||"",n.className="msg"+(t?" err":"")),this.data.msg=e,this.data.err=t}clsCards(){let e=this.set,t='<div class="cards">';for(let n=0;n<3;n++)t+='<button class="card'+(e.cls===n?" on":"")+'" data-a="cls" data-v="'+n+'" style="color:'+Gt[n].css+'">'+cn.cls[n]+"<b>"+Gt[n].name+"</b><i>"+Gt[n].role+"</i></button>";return t+'</div><div class="note"><b style="color:'+Gt[e.cls].css+'">'+Gt[e.cls].spec+":</b> "+Gt[e.cls].desc+"</div>"}chips(e,t,n,s){let r='<div class="chips">';for(let o=0;o<t.length;o++){let a=s?s[o]:o;r+='<button class="chip'+(n===a?" on":"")+'" data-a="'+e+'" data-v="'+a+'">'+t[o]+"</button>"}return r+"</div>"}modeBlock(e,t){return e=e===0?0:1,t?this.chips("gmode",[$n[1].name,$n[0].name],e,[1,0])+'<div class="note" style="min-height:0;margin-top:6px">'+$n[e].tag+"</div>":'<div class="note" style="min-height:0;margin-top:12px"><b style="color:var(--gold)">Modo '+$n[e].name+".</b> "+$n[e].tag+"</div>"}toggles(){let e=this.set;function t(n,s){return'<div class="toggle"><span>'+s+'</span><button class="sw'+(e[n]?" on":"")+'" data-a="tog" data-v="'+n+'"></button></div>'}return t("sfx","Sonidos")+t("music","M\xFAsica")+t("hq","Gr\xE1ficos n\xEDtidos")}helpHtml(){return'<div class="help"><p><b>Objetivo.</b> Cada equipo de 3 empieza con un pergamino: '+this.i(cn.sol)+" Sol o "+this.i(cn.luna)+" Luna. Gana el primero que lleve <b>uno de cada tipo</b> al santuario del centro, o el \xFAltimo equipo en pie.</p><p><b>Controles.</b> Palanca a la izquierda para moverte. "+this.i(cn.melee)+" espada, "+this.i(cn.shuriken)+" estrellas, "+this.i(cn.dash)+" esquiva y tu t\xE9cnica especial. Apuntas solo al rival m\xE1s cercano.</p><h3>Modo Frenes\xED</h3><p><b>Golpes.</b> Dos cortes o tres estrellas derriban, y el corte te lanza hacia el rival.</p><p><b>Esquiva.</b> Dos cargas que vuelven en un segundo: \xFAsala todo el tiempo.</p><p><b>Estrellas.</b> Llevas tres y no se recargan: quedan donde caen y hay que ir a recogerlas. Tambi\xE9n puedes quedarte con las del rival.</p><p><b>Reaparici\xF3n.</b> Si caes, vuelves en pocos segundos junto a un compa\xF1ero; cada derribo de tu equipo acorta la espera. Cuando llega la <b>\xFAltima vida</b>, quien cae queda fuera.</p><p><b>Potenciadores.</b> "+fn.map(function(e){return'<b style="color:'+e.css+'">'+e.name+"</b>: "+e.desc.toLowerCase()}).join(". ")+". Llevas hasta tres y los pierdes al caer.</p><p><b>Santuario.</b> Se abre cuando termina el primer cierre de la niebla.</p><h3>Modo Cl\xE1sico</h3><p><b>1 \xB7 Cacer\xEDa (1:30).</b> Derriba a quien lleve el pergamino que te falta para quit\xE1rselo. Los ca\xEDdos reaparecen en su campamento y el santuario est\xE1 sellado.</p><p><b>2 \xB7 Muerte s\xFAbita.</b> La niebla morada se cierra, ya nadie reaparece y el santuario se abre. P\xE1rate junto a un compa\xF1ero ca\xEDdo para levantarlo.</p><h3>Trucos</h3><p>En los matorrales no te ven. Las bolas de arroz curan. Los pergaminos siempre se ven en el minimapa. Para entregar, qu\xE9date dentro del c\xEDrculo dorado con los dos pergaminos.</p>"+((navigator.maxTouchPoints||0)>0?"":"<p><b>Con teclado.</b> WASD o flechas para moverte, J espada, K estrellas, L esquiva, I t\xE9cnica especial.</p>")+"</div>"}i(e){return'<span class="ic">'+e+"</span>"}render(){let e=this.set,t=this.data,n=this.name,s="";if(n==="title")s='<div class="screen title"><div class="logo"><div class="k">BATALLA DEL BOSQUE</div><h1>SENDA<span>NINJA</span></h1><p>Equipos de 3 \xB7 Roba el pergamino que te falta</p></div><div class="stack"><button class="btn pri" data-a="go" data-v="solo">Jugar solo</button><button class="btn gold" data-a="go" data-v="mp">Multijugador</button><div class="row"><button class="btn sm" data-a="go" data-v="help">C\xF3mo jugar</button><button class="btn sm" data-a="go" data-v="opts">Opciones</button></div>'+(t.iosTip?'<div class="tip">En iPhone: toca <b>Compartir</b> y luego <b>A\xF1adir a pantalla de inicio</b> para jugar a pantalla completa.</div>':"")+"</div></div>";else if(n==="solo")s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>Jugar solo</h2><div class="sub">T\xFA y dos bots contra otros equipos de bots.</div><div class="panel"><h3 style="margin-top:0">Modo</h3>'+this.modeBlock(e.mode,!0)+"<h3>Tu estilo</h3>"+this.clsCards()+"<h3>Dificultad</h3>"+this.chips("diff",Tr.map(function(r){return r.name}),e.diff)+"<h3>Equipos en el bosque</h3>"+this.chips("teams",["2","3","4"],e.teams,[2,3,4])+'<button class="btn pri" data-a="solo" style="margin-top:16px">\xA1Al bosque!</button></div></div>';else if(n==="mp"){let r=t.env||"app";s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>Multijugador</h2><div class="panel"><h3 style="margin-top:0">Tu nombre</h3><input id="fName" class="field" maxlength="12" value="'+Ft(e.name)+'" autocomplete="off" spellcheck="false">'+(r==="lan"?'<button class="btn gold" data-a="joinhere" style="margin-top:14px">Entrar a la sala de este Wi-Fi</button>':"")+'<h3>Unirse con c\xF3digo (internet)</h3><div class="row"><input id="fCode" class="field code" maxlength="5" placeholder="C\xD3DIGO" autocomplete="off" autocapitalize="characters" spellcheck="false" style="flex:1.6"><button class="btn sm pri" data-a="join" style="margin-top:0;height:48px">Entrar</button></div>'+(r==="app"?'<button class="btn sm" data-a="go" data-v="lan">Buscar sala en mi Wi-Fi</button>':"")+'<h3>Crear una sala</h3><div class="row"><button class="btn sm gold" data-a="host" data-v="net">Por internet</button>'+(r==="app"?'<button class="btn sm gold" data-a="host" data-v="lan">Wi-Fi local</button>':"")+'</div><div id="msg" class="msg'+(t.err?" err":"")+'">'+Ft(t.msg||"")+'</div></div><div class="sub" style="max-width:380px;margin-top:10px">'+(r==="app"?"Por internet: uno crea la sala y comparte el c\xF3digo. Wi-Fi local: todos en la misma red o en el hotspot de un celular; no gasta datos.":r==="lan"?"Est\xE1s conectado al celular que cre\xF3 la sala en este Wi-Fi. Tambi\xE9n puedes usar salas por internet con c\xF3digo.":"Uno crea la sala y comparte el c\xF3digo: sirve entre iPhone, Android y PC. Las salas de Wi-Fi local se crean desde la app de Android.")+"</div></div>"}else if(n==="lan"){let r="",o=t.found||[];for(let a=0;a<o.length;a++)r+='<button class="it" data-a="joinip" data-v="'+Ft(o[a].ip)+'"><span>Sala de '+Ft(o[a].name)+'</span><span style="color:var(--mut);font-size:12px">'+Ft(o[a].ip)+"</span></button>";s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>Wi-Fi local</h2><div class="sub">Con\xE9ctate al mismo Wi-Fi (o al hotspot) del celular que cre\xF3 la sala.</div><div class="panel"><h3 style="margin-top:0">Direcci\xF3n que muestra el anfitri\xF3n</h3><div class="row"><input id="fIp" class="field" placeholder="192.168.1.20" inputmode="decimal" autocomplete="off" style="flex:1.6;font-size:16px"><button class="btn sm pri" data-a="joinip" style="margin-top:0;height:48px">Entrar</button></div><h3>Salas encontradas en tu red</h3><div class="list">'+(r||'<div class="sub">'+(t.scanning?"Buscando\u2026":"Ninguna todav\xEDa.")+"</div>")+'</div><button class="btn sm" data-a="scan"'+(t.scanning?" disabled":"")+">"+(t.scanning?"Buscando\u2026":"Buscar otra vez")+'</button><div id="msg" class="msg'+(t.err?" err":"")+'">'+Ft(t.msg||"")+"</div></div></div>"}else if(n==="lobby"){let r=t.lobby,o="";for(let c=0;c<r.teams;c++){o+='<div class="tm" style="border-top-color:'+dt[c].css+'"><h4><span style="color:'+dt[c].css+'">'+dt[c].name+"</span><small>"+(c%2?cn.luna:cn.sol).replace("<svg",'<svg width="15" height="15"')+"</small></h4>";for(let h=0;h<3;h++){let l=null;for(let u=0;u<r.players.length;u++)r.players[u].team===c&&r.players[u].slot===h&&(l=r.players[u]);l?o+='<div class="slot'+(l.id===t.myId?" me":"")+'"><i class="d" style="background:'+Gt[l.cls].css+'"></i><span>'+Ft(l.name)+(l.host?" \u2605":"")+"</span></div>":o+='<button class="slot bot" data-a="slot" data-v="'+c+","+h+'"><i class="d" style="background:#4a556e"></i><span>Bot \xB7 unirme</span></button>'}o+="</div>"}s='<div class="screen dim"><button class="back" data-a="leave">\u2039</button><h2>Sala de espera</h2><div class="panel">'+(r.mode==="net"?'<div class="codebox"><small>C\xF3digo de la sala</small><b>'+Ft(r.code)+"</b></div>":'<div class="codebox"><small>Sala Wi-Fi \xB7 direcci\xF3n del anfitri\xF3n</small><b class="ip">'+Ft(r.code)+'</b></div><div class="sub" style="margin-top:8px">\xBFiPhone o PC en este Wi-Fi? Sin instalar nada: abrir en el navegador<br><b style="color:var(--ink)">http://'+Ft(String(r.code).split("\xB7")[0].trim())+":47800</b></div>")+"<h3>Equipos \xB7 "+r.players.length+" jugador"+(r.players.length===1?"":"es")+'</h3><div class="teams">'+o+"</div><h3>Tu estilo</h3>"+this.clsCards()+(t.isHost?"<h3>Modo</h3>"+this.modeBlock(r.gmode,!0)+"<h3>Equipos</h3>"+this.chips("teams",["2","3","4"],r.teams,[2,3,4])+"<h3>Dificultad de los bots</h3>"+this.chips("diff",Tr.map(function(c){return c.name}),r.diff)+'<button class="btn pri" data-a="start" style="margin-top:16px">Empezar partida</button>':this.modeBlock(r.gmode,!1)+'<div class="msg">Esperando a que el anfitri\xF3n empiece\u2026</div>')+'<div id="msg" class="msg'+(t.err?" err":"")+'">'+Ft(t.msg||"")+"</div></div></div>"}else if(n==="results"){let r=t.end,o=t.roster,a=t.myTeam,c=r.winner===a,h="";for(let u=0;u<r.rank.length;u++){let f=r.rank[u],d="",p=0;for(let y=0;y<o.length;y++)o[y].team===f&&(d+=(d?", ":"")+Ft(o[y].name),p+=r.stats[y][0]);h+='<div class="r" style="border-left-color:'+dt[f].css+'"><b>'+(u+1)+"\xBA</b><span>"+dt[f].name+(f===a?" (tu equipo)":"")+'<br><small style="font-weight:600;color:var(--mut)">'+d+"</small></span><small>"+p+" derribos</small></div>"}let l=r.stats[t.me];s='<div class="screen dim"><div class="big" style="color:'+(c?"var(--gold)":"#ff8f7a")+'">'+(c?"\xA1VICTORIA!":"Derrota")+'</div><div class="sub">'+(r.how==="deliver"?"El equipo "+dt[r.winner].name+" entreg\xF3 los dos pergaminos":"El equipo "+dt[r.winner].name+" fue el \xFAltimo en pie")+" \xB7 "+Am(r.time)+'</div><div class="panel"><div class="rank">'+h+"</div>"+(l?'<div class="note" style="min-height:0;margin-top:12px">T\xFA: <b>'+l[0]+"</b> derribos \xB7 <b>"+l[1]+"</b> de da\xF1o"+(t.mode===1?"":" \xB7 <b>"+l[2]+"</b> compa\xF1eros levantados")+"</div>":"")+(t.canAgain?'<button class="btn pri" data-a="again" style="margin-top:14px">'+(t.solo?"Jugar otra vez":"Volver a la sala")+"</button>":'<div class="msg">Esperando al anfitri\xF3n\u2026</div>')+'<button class="btn sm" data-a="leave">Salir al men\xFA</button></div></div>'}else n==="help"?s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>C\xF3mo jugar</h2><div class="panel">'+this.helpHtml()+"</div></div>":n==="opts"&&(s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>Opciones</h2><div class="panel"><h3 style="margin-top:0">Tu nombre</h3><input id="fName" class="field" maxlength="12" value="'+Ft(e.name)+'" autocomplete="off" spellcheck="false"><div style="height:8px"></div>'+this.toggles()+'</div><div class="sub" style="margin-top:14px">Senda Ninja \xB7 versi\xF3n '+Ft(t.ver||"1.0")+"</div></div>");this.overlay==="pause"?s+='<div class="screen dim" style="justify-content:center"><h2>Pausa</h2>'+(t.solo?"":'<div class="sub">La partida sigue para los dem\xE1s.</div>')+'<div class="panel">'+this.toggles()+'<button class="btn pri" data-a="resume" style="margin-top:14px">Continuar</button><button class="btn sm" data-a="ov" data-v="phelp">C\xF3mo jugar</button><button class="btn sm" data-a="leave">Salir de la partida</button></div></div>':this.overlay==="phelp"&&(s+='<div class="screen dim"><button class="back" data-a="ov" data-v="pause">\u2039</button><h2>C\xF3mo jugar</h2><div class="panel">'+this.helpHtml()+"</div></div>"),this.root.innerHTML=s}hudStart(e,t,n){this.g=e,this.roster=t,this.nTeams=n;let s=this.R=$n[e.mode===1?1:0],r=t[e.me];this.hud.classList.remove("hide"),He("bSpec").innerHTML=cn.cls[r.cls]+"<em>"+Ft(Gt[r.cls].spec)+"</em>",He("bSpec").style.color=Gt[r.cls].css,He("bDash").innerHTML=cn.dash+(s.dashMax>1?'<em id="dsN" class="n">'+s.dashMax+"</em>":"<em>Esquiva</em>"),He("bShur").innerHTML=cn.shuriken+'<em id="shN">3</em>',He("bMelee").innerHTML=cn.melee,this.lastSh=-1,this.lastDs=-1,this.lastAlive=null,this.lastPw="",He("pows").innerHTML="";let o="";for(let c=0;c<t.length;c++)t[c].team===r.team&&(o+='<div class="tp" id="tp'+c+'" style="border-left-color:'+Gt[t[c].cls].css+'"><div class="n"><b>'+Ft(t[c].name)+(c===e.me?" (t\xFA)":"")+'</b><div class="hb"><i></i></div></div><span class="sc"></span></div>');He("team").innerHTML=o;let a="";for(let c=0;c<t.length;c++){let h=t[c].team===r.team;a+='<div class="lb '+(c===e.me?"me":h?"ally":"")+'" id="lb'+c+'"><div class="nm" style="color:'+dt[t[c].team].css+'">'+Ft(t[c].name)+'</div><div class="hb"><i></i></div><div class="st"></div></div>'}He("labels").innerHTML=a,this.lb=[];for(let c=0;c<t.length;c++){let h=He("lb"+c);this.lb.push({el:h,bar:h.querySelector(".hb i"),st:h.querySelector(".st"),hp:-1,txt:"",shown:!0})}He("dmg").innerHTML="",this.dmgPool=[];for(let c=0;c<18;c++){let h=document.createElement("div");h.className="dn",h.style.display="none",He("dmg").appendChild(h),this.dmgPool.push(h)}He("feed").innerHTML="",this.feed=[],He("banner").className="",this.bannerT=0,He("obj").innerHTML='<span class="s" id="oSol">'+cn.sol+'</span><span class="s" id="oLuna">'+cn.luna+'</span><span id="oTxt"></span>',this.hadBoth={},this.lastCount=-1,this.objective=null,this.hurtA=0,this.lastObj="",this.mapImg=this.makeMapImg(e.map),this.slow=0,this.mmT=0,["deliver","downed","stale","spect","count"].forEach(function(c){He(c).classList.add("hide")})}hudStop(){this.hud.classList.add("hide")}makeMapImg(e){let t=document.createElement("canvas");t.width=96,t.height=96;let n=t.getContext("2d"),s=n.createImageData(96,96),r={};r[Ar]=[70,122,62],r[bi]=[176,148,98],r[Ei]=[46,98,50],r[Kn]=[34,78,44],r[hi]=[120,126,136],r[zn]=[52,128,208],r[Ti]=[150,108,60],r[Ls]=[160,166,176],r[dn]=[20,44,28],r[Hn]=[160,166,176];for(let o=0;o<9216;o++){let a=r[e.tiles[o]];s.data[o*4]=a[0],s.data[o*4+1]=a[1],s.data[o*4+2]=a[2],s.data[o*4+3]=255}return n.putImageData(s,0,0),t}banner(e,t,n,s){let r=He("banner");r.innerHTML=Ft(e)+(t?"<small>"+Ft(t)+"</small>":""),r.style.color=n||"#fff",r.className="on",this.bannerT=s||2.6}addFeed(e){let t=He("feed"),n=document.createElement("div");for(n.innerHTML=e,t.appendChild(n),this.feed.push({e:n,t:4.5});this.feed.length>4;){let s=this.feed.shift();s.e.parentNode&&t.removeChild(s.e)}}nm(e){let t=this.roster[e];return'<span style="color:'+dt[t.team].css+'">'+Ft(t.name)+"</span>"}dmg(e,t,n,s,r){let o=this.dmgPool[this.dmgI++%this.dmgPool.length];o.style.display="none",o.offsetWidth,o.className="dn"+(s?" "+s:""),o.style.color=r||"",o.textContent=n,o.style.transform="translate3d("+Math.round(e-8)+"px,"+Math.round(t)+"px,0)",o.style.display="block"}hudEvent(e,t,n){let s=this.g,r=s.me,o=s.myTeam,a=this.roster,c=e[0],h=this.R.resurge;if(c==="hit"){let l=t.ninjas[e[1]];return l&&!l.hidden&&(n.project(l.x,1.7,l.z,this._p),this._p.vis&&this.dmg(this._p.x+(Math.random()-.5)*16,this._p.y,"-"+e[2],e[1]===r?"me":"")),e[1]===r?(this.hurtA=Math.min(1,this.hurtA+.5),"hurt"):e[3]===4?null:"hit"}if(c==="heal"||c==="food"){let l=t.ninjas[e[1]],u=c==="heal"?e[2]:e[3];return l&&!l.hidden&&u>0&&(n.project(l.x,1.7,l.z,this._p),this._p.vis&&this.dmg(this._p.x,this._p.y,"+"+u,"heal")),c==="food"?"food":null}if(c==="down"){let l=e[2];return this.addFeed((l>=0?this.nm(l)+" derrib\xF3 a ":"La niebla derrib\xF3 a ")+this.nm(e[1])),l===r&&this.banner("\xA1Derribaste a "+a[e[1]].name+"!","","#ffcf4a",1.6),"down"}if(c==="out")return h||this.addFeed(this.nm(e[1])+" qued\xF3 fuera"),null;if(c==="rev")return e[1]===r&&this.banner("\xA1De pie otra vez!",a[e[2]].name+" te levant\xF3","#7dff9a",1.8),"revive";if(c==="resp")return e[1]===r&&t.phase===1&&this.banner(h?"\xA1De vuelta!":"Reapareces en tu campamento","","#7dff9a",h?1.1:1.8),e[1]===r?"revive":null;if(c==="star")return e[1]===r?"star":null;if(c==="pw"){let l=t.ninjas[e[1]],u=fn[e[2]];return l&&u&&!l.hidden&&(n.project(l.x,2.3,l.z,this._p),this._p.vis&&this.dmg(this._p.x-14,this._p.y,"+"+u.name,"pw",u.css)),"power"}if(c==="shield"){let l=t.ninjas[e[1]];return l&&!l.hidden&&(n.project(l.x,2.3,l.z,this._p),this._p.vis&&this.dmg(this._p.x-22,this._p.y,"\xA1Coraza!","pw",fn[3].css)),"shield"}if(c==="wipe")return e[1]===o?this.banner("\xA1Cay\xF3 el equipo entero!","Vuelven desde su esquina en "+this.R.wipeT+" s","#ff8f7a",2.6):this.addFeed('<span style="color:'+dt[e[1]].css+'">Equipo '+dt[e[1]].name+"</span> cay\xF3 entero"),e[1]===o?"lose":null;if(c==="last")return this.banner("\xDALTIMA VIDA","Ya nadie reaparece \xB7 Todos vuelven con la vida llena","#ffcf4a",4),"gong";if(c==="pick"){let l=a[e[1]],u=Zn[e[2]%2];return l.team===o?this.banner("\xA1Pergamino "+u.name+" conseguido!",l.name+" lo lleva",u.css,2.2):this.addFeed(this.nm(e[1])+" tom\xF3 el pergamino "+u.name),"pick"}if(c==="drop"){let l=a[e[1]],u=Zn[e[2]%2];return l.team===o&&this.banner("\xA1Perdimos el pergamino "+u.name+"!","Qued\xF3 en el suelo: recup\xE9ralo","#ff8f7a",2.4),"drop"}if(c==="tout")return e[1]===o?this.banner("Tu equipo fue eliminado","Puesto "+e[2]+"\xBA","#ff8f7a",4):this.banner("Equipo "+dt[e[1]].name+" eliminado","",dt[e[1]].css,2.4),"down";if(c==="zone")return h?e[1]===1&&e[2]===this.R.lastLifeStage?null:e[1]===0&&e[2]===this.R.openStage?(this.banner("El santuario est\xE1 abierto","Lleva all\xED los dos pergaminos","#ffcf4a",3),"gong"):e[1]===1?(this.banner("La niebla se cierra","Corre hacia el centro","#c79bff",2.2),"alarm"):null:e[1]===1&&e[2]===0?(this.banner("MUERTE S\xDABITA","Ya nadie reaparece \xB7 El santuario est\xE1 abierto","#ffcf4a",4),"gong"):e[1]===1?(this.banner("La niebla se cierra","Corre hacia el centro","#c79bff",2.6),"alarm"):null;if(c==="go")return this.banner("\xA1A pelear!",h?"Dos cortes derriban \xB7 Si caes, vuelves junto a tu equipo":"Consigue el pergamino que te falta","#fff",h?3.2:2.6),"go";if(c==="fx"){if(e[1]==="boom"||e[1]==="boom2")return"boom";if(e[1]==="heal")return"heal";if(e[1]==="bram")return"bram";if(e[1]==="clink")return"clink"}return null}hudUpdate(e,t,n,s,r){let o=this.g,a=e.ninjas[o.me],c=o.myTeam,h=e.ninjas;for(let y=0;y<h.length;y++){let m=h[y],g=this.lb[y],v=m.st!==Vt&&!m.hidden&&!(this.R.resurge&&m.st===Pt);if(v&&(t.project(m.x,m.st===Pt?1.1:2.25,m.z,this._p),v=this._p.vis),v!==g.shown&&(g.shown=v,g.el.style.display=v?"block":"none"),!v)continue;g.el.style.transform="translate3d("+Math.round(this._p.x)+"px,"+Math.round(this._p.y-22)+"px,0)",m.hp!==g.hp&&(g.hp=m.hp,g.bar.style.width=Math.max(0,m.hp)+"%");let T="";m.st===Pt&&(T=m.revP>.02?"Levantando "+Math.round(m.revP*100)+"%":"Ca\xEDdo "+Math.ceil(m.downT)+"s"),T!==g.txt&&(g.txt=T,g.st.textContent=T)}this.bannerT>0&&(this.bannerT-=n,this.bannerT<=0&&(He("banner").className=""));for(let y=this.feed.length-1;y>=0;y--){let m=this.feed[y];m.t-=n,m.t<=0&&(m.e.parentNode&&m.e.parentNode.removeChild(m.e),this.feed.splice(y,1))}this.hurtA>0&&(this.hurtA=Math.max(0,this.hurtA-n*1.8)),He("hurt").style.opacity=this.hurtA.toFixed(2);let l=e.cd,u=this.roster[o.me].cls,f=a.st===Me&&e.phase===1;He("bSpec").style.setProperty("--cd",Nu(l.spec/Gt[u].cd)),He("bDash").style.setProperty("--cd",l.dash>=1?0:Nu(1-l.dash)),He("bShur").style.setProperty("--cd",l.charges>=1?0:Nu(1-l.charges));let d=Math.floor(l.charges+.001);if(d!==this.lastSh){this.lastSh=d;let y=He("shN");y&&(y.textContent=d)}if(this.R.dashMax>1){let y=Math.floor(l.dash+.001);if(y!==this.lastDs){this.lastDs=y;let m=He("dsN");m&&(m.textContent=y)}}f!==this.lastAlive&&(this.lastAlive=f,He("btns").style.opacity=f?1:.35);let p=He("count");if(e.phase===0){let y=Math.ceil(e.count);if(y!==this.lastCount){this.lastCount=y,p.classList.remove("hide");let m=Zn[c%2],g=Zn[1-c%2];p.innerHTML=(y>3?"\xB7\xB7\xB7":y)+'<small>Equipo <b style="color:'+dt[c].css+'">'+dt[c].name+'</b><br>Tienen el pergamino <b style="color:'+m.css+'">'+m.name+'</b> \xB7 les falta el <b style="color:'+g.css+'">'+g.name+"</b></small>",y<=3&&y>0&&this.h.sound("beep")}}else this.lastCount!==-2&&(this.lastCount=-2,p.classList.add("hide"));this.slow-=n,this.slow<=0&&(this.slow=.2,this.slowUpdate(e,s,r)),this.mmT-=n,this.mmT<=0&&(this.mmT=.1,this.drawMini(e,s))}slowUpdate(e,t,n){let s=this.g,r=e.ninjas[s.me],o=s.myTeam,a=e.ninjas,c=e.zone,h=this.R,l=h.resurge,u=e.sealed,f=r.st===Me&&r.pw?r.pw.join(""):"";if(f!==this.lastPw){this.lastPw=f;let P="";for(let F=0;F<f.length;F++){let z=fn[+f[F]];P+='<i style="background:'+z.css+'">'+z.name+"</i>"}He("pows").innerHTML=P}for(let P=0;P<a.length;P++){if(a[P].team!==o)continue;let F=He("tp"+P);if(!F)continue;let z=a[P];F.className="tp"+(z.st===Pt?" down":z.st===Vt?" out":""),F.querySelector(".hb i").style.width=(z.st===Me?z.hp:z.st===Pt?z.revP*100:0)+"%";let O="";for(let X=0;X<e.scrolls.length;X++)e.scrolls[X].carrier===P&&(O+=e.scrolls[X].kind===0?cn.sol:cn.luna);let W=F.querySelector(".sc");W.getAttribute("data-k")!==O.length+""&&(W.setAttribute("data-k",O.length+""),W.innerHTML=O,W.style.width=O?O.length>400?"30px":"15px":"0")}let d=He("phase"),p=l?e.lastLife?"\xDALTIMA VIDA":"FRENES\xCD":u?"CACER\xCDA":"MUERTE S\xDABITA",y=l?e.lastLife?"sd":"fr":u?"":"sd";d.textContent!==p&&(d.textContent=p,d.className=y),He("clock").textContent=c.stage>=5?"0:00":Am(c.timer),He("clockSub").textContent=c.stage>=5?"niebla total":c.shrinking?"la niebla se est\xE1 cerrando":l?!e.lastLife&&c.stage===h.lastLifeStage?"para la \xFAltima vida":"para que se cierre la niebla":u?"para la muerte s\xFAbita":"para que se cierre la niebla";let m="",g=0,v={};for(let P=0;P<this.nTeams;P++){let F=!0;for(let O=0;O<a.length;O++)a[O].team===P&&a[O].st!==Vt&&(F=!1);F||g++,m+='<i style="background:'+dt[P].css+'" class="'+(F?"x":"")+'"></i>';let z=ih(e,P);v[P]=z.sol&&z.luna,v[P]&&!this.hadBoth[P]&&e.phase===1&&(P===o?this.banner("\xA1Tienen los dos pergaminos!",u?"Prot\xE9janlos hasta que abra el santuario":"\xA1Al santuario!","#ffcf4a",3):(this.banner("\xA1"+dt[P].name+" tiene los dos pergaminos!",u?l?"Qu\xEDtenselos antes de que abra el santuario":"Qu\xEDtenselos antes de la muerte s\xFAbita":"No los dejen llegar al santuario",dt[P].css,3),this.h.sound("alarm"))),this.hadBoth[P]=v[P]}He("alive").innerHTML=m;let T=ih(e,o);He("oSol").className="s"+(T.sol?" on":""),He("oLuna").className="s"+(T.luna?" on":"");let b,w=null;if(T.sol&&T.luna)b=u?"Protege los dos pergaminos":"\xA1Ll\xE9valos al santuario!",w={x:48,z:48,color:16766826};else{let P=T.sol?1:T.luna?0:-1;b=P<0?"Sin pergaminos: qu\xEDtale uno a un rival":"Consigue el pergamino "+Zn[P].name;let F=1e9,z=e.ninjas[t]||r;for(let O=0;O<e.scrolls.length;O++){let W=e.scrolls[O];if(P>=0&&W.kind!==P||W.carrier>=0&&a[W.carrier].team===o)continue;let X=(W.x-z.x)*(W.x-z.x)+(W.z-z.z)*(W.z-z.z);X<F&&(F=X,w={x:W.x,z:W.z,color:Zn[W.kind].color,sc:W})}}b!==this.lastObj&&(this.lastObj=b,He("oTxt").textContent=b),this.objective=w;let E=-1,x=0;for(let P=0;P<e.deliver.length;P++)e.deliver[P]>x&&(x=e.deliver[P],E=P);let M=He("deliver");x>.01&&!e.end?(M.classList.remove("hide"),M.querySelector("span").textContent=E===o?"\xA1Entregando! No salgas del c\xEDrculo":"\xA1"+dt[E].name+" est\xE1 entregando! Entra al c\xEDrculo para frenarlo",M.querySelector("i").style.width=Math.round(x*100)+"%",M.querySelector("i").style.background=dt[E].css):M.classList.add("hide");let S=He("downed"),_=He("spect");r.st===Pt?(S.classList.remove("hide"),S.innerHTML="\xA1Has ca\xEDdo!<small>"+(l?"Vuelves junto a tu equipo en "+Math.max(1,Math.ceil(r.downT))+" s":r.revP>.02?"Te est\xE1n levantando\u2026 "+Math.round(r.revP*100)+"%":u?"Reapareces en "+Math.ceil(r.downT)+" s (o antes si un compa\xF1ero te levanta)":"Un compa\xF1ero puede levantarte \xB7 "+Math.ceil(r.downT)+" s")+"</small>"):S.classList.add("hide"),r.st===Vt&&!e.end?(_.classList.remove("hide"),_.textContent=t!==s.me&&e.ninjas[t]?"Est\xE1s fuera \xB7 Viendo a "+e.ninjas[t].name:"Est\xE1s fuera"):_.classList.add("hide");let R=r.x-48,I=r.z-48;He("vig").style.opacity=r.st===Me&&R*R+I*I>c.r*c.r?1:0;let D=e.stale>2.5&&!e.end;He("stale").classList.toggle("hide",!D),He("ping").textContent=n!=null?n+" ms":""}drawMini(e,t){let n=He("mini"),s=n.getContext("2d"),r=n.width,o=this.g,a=o.myTeam,c=e.ninjas,h=e.zone,l=this.R.mmHalf,u=r/(l*2),f=48-l,d=48-l;s.imageSmoothingEnabled=!1,s.drawImage(this.mapImg,f,d,l*2,l*2,0,0,r,r),s.save(),s.translate(-f*u,-d*u),s.fillStyle="rgba(120,50,200,0.5)",s.beginPath(),s.rect(f*u,d*u,r,r),s.arc(48*u,48*u,Math.max(.5,h.r*u),0,6.2832,!0),s.fill("evenodd"),h.to<h.r-.5&&(s.strokeStyle="rgba(255,255,255,0.8)",s.lineWidth=1.5,s.beginPath(),s.arc(48*u,48*u,Math.max(.5,h.to*u),0,6.2832),s.stroke()),s.strokeStyle="#ffd76a",s.lineWidth=2.5,s.beginPath(),s.arc(48*u,48*u,5,0,6.2832),s.stroke(),s.fillStyle="#7dff9a";for(let g=0;g<o.map.pickups.length;g++)if(e.food>>g&1){let v=o.map.pickups[g];s.fillRect(v.x*u-2,v.z*u-2,4,4)}let p=o.map.items||[];for(let g=0;g<p.length;g++){let v=(e.items[g]||0)-1;v<0||(s.fillStyle=fn[v].css,s.strokeStyle="rgba(0,0,0,.7)",s.lineWidth=1,s.beginPath(),s.arc(p[g].x*u,p[g].z*u,3.4,0,6.2832),s.fill(),s.stroke())}for(let g=0;g<c.length;g++){let v=c[g];if(!(v.st===Vt||g===o.me)){if(v.team!==a){if(v.hidden)continue;let T=!1;for(let b=0;b<c.length;b++){let w=c[b];if(!(w.team!==a||w.st===Vt)&&(w.x-v.x)*(w.x-v.x)+(w.z-v.z)*(w.z-v.z)<(J.VIEW+3)*(J.VIEW+3)){T=!0;break}}if(!T)continue}s.fillStyle=dt[v.team].css,s.globalAlpha=v.st===Pt?.5:1,s.beginPath(),s.arc(v.x*u,v.z*u,v.team===a?5:4.2,0,6.2832),s.fill(),v.team===a&&(s.strokeStyle="#fff",s.lineWidth=1.5,s.stroke()),s.globalAlpha=1}}let y=Date.now()%800<520;for(let g=0;g<e.scrolls.length;g++){let v=e.scrolls[g],T=v.x*u,b=v.z*u-(v.carrier>=0?9:0);s.fillStyle=Zn[v.kind].css,s.strokeStyle="#000",s.lineWidth=1.5,s.beginPath(),s.moveTo(T,b-6),s.lineTo(T+5,b),s.lineTo(T,b+6),s.lineTo(T-5,b),s.closePath(),(v.carrier>=0||y)&&(s.fill(),s.stroke())}let m=c[t]||c[o.me];m&&m.st!==Vt&&(s.save(),s.translate(m.x*u,m.z*u),s.rotate(-m.f),s.fillStyle="#fff",s.strokeStyle="#000",s.lineWidth=1.5,s.beginPath(),s.moveTo(0,8),s.lineTo(5.5,-5),s.lineTo(0,-2),s.lineTo(-5.5,-5),s.closePath(),s.fill(),s.stroke(),s.restore()),s.restore()}};function Nu(i){return i<0?0:i>1?1:i}var Uu=class{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){let e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){let e=[];for(let t of this._parts)e.push(t);return yS(e).buffer}};function yS(i){let e=0;for(let s of i)e+=s.byteLength;let t=new Uint8Array(e),n=0;for(let s of i){let r=new Uint8Array(s.buffer,s.byteOffset,s.byteLength);t.set(r,n),n+=s.byteLength}return t}function ku(i){return new Ou(i).unpack()}function Bu(i){let e=new Fu,t=e.pack(i);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}var Ou=class{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){let e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){let e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){let e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){let e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){let e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){let e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){let e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){let e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){let e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);let t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){let t=this.read(e),n=0,s="",r,o;for(;n<e;)r=t[n],r<160?(o=r,n++):(r^192)<32?(o=(r&31)<<6|t[n+1]&63,n+=2):(r^224)<16?(o=(r&15)<<12|(t[n+1]&63)<<6|t[n+2]&63,n+=3):(o=(r&7)<<18|(t[n+1]&63)<<12|(t[n+2]&63)<<6|t[n+3]&63,n+=4),s+=String.fromCodePoint(o);return this.index+=e,s}unpack_array(e){let t=new Array(e);for(let n=0;n<e;n++)t[n]=this.unpack();return t}unpack_map(e){let t={};for(let n=0;n<e;n++){let s=this.unpack();t[s]=this.unpack()}return t}unpack_float(){let e=this.unpack_uint32(),t=e>>31,n=(e>>23&255)-127,s=e&8388607|8388608;return(t===0?1:-1)*s*2**(n-23)}unpack_double(){let e=this.unpack_uint32(),t=this.unpack_uint32(),n=e>>31,s=(e>>20&2047)-1023,o=(e&1048575|1048576)*2**(s-20)+t*2**(s-52);return(n===0?1:-1)*o}read(e){let t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}},Fu=class{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{let t=e.constructor;if(e instanceof Array){let n=this.pack_array(e);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){let n=e;this.pack_bin(new Uint8Array(n.buffer,n.byteOffset,n.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(n=>{this.pack_bin(new Uint8Array(n)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){let n=this.pack_object(e);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){let t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){let t=this._textEncoder.encode(e),n=t.length;if(n<=15)this.pack_uint8(176+n);else if(n<=65535)this._bufferBuilder.append(216),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(n);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){let t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");let n=s=>{if(s<t){let r=this.pack(e[s]);return r instanceof Promise?r.then(()=>n(s+1)):n(s+1)}};return n(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);let n=Math.floor(Math.log(e)/Math.LN2),s=e/2**n-1,r=Math.floor(s*2**52),o=2**32,a=t<<31|n+1023<<20|r/o&1048575,c=r%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(c)}pack_object(e){let t=Object.keys(e),n=t.length;if(n<=15)this.pack_uint8(128+n);else if(n<=65535)this._bufferBuilder.append(222),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(n);else throw new Error("Invalid length");let s=r=>{if(r<t.length){let o=t[r];if(e.hasOwnProperty(o)){this.pack(o);let a=this.pack(e[o]);if(a instanceof Promise)return a.then(()=>s(r+1))}return s(r+1)}};return s(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){let t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){let t=e/4294967296,n=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){let t=Math.floor(e/4294967296),n=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}constructor(){this._bufferBuilder=new Uu,this._textEncoder=new TextEncoder}};var Cm=!0,Rm=!0;function xr(i,e,t){let n=i.match(e);return n&&n.length>=t&&parseFloat(n[t],10)}function vi(i,e,t){if(!i.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Io("Unable to polyfill events");return}let s=i.RTCPeerConnection.prototype,r=s.addEventListener;s.addEventListener=function(a,c){if(a!==e)return r.apply(this,arguments);let h=l=>{let u=t(l);u&&(c.handleEvent?c.handleEvent(u):c(u))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,h),r.apply(this,[a,h])};let o=s.removeEventListener;s.removeEventListener=function(a,c){if(a!==e||!this._eventMap||!this._eventMap[e])return o.apply(this,arguments);if(!this._eventMap[e].has(c))return o.apply(this,arguments);let h=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,h])},Object.defineProperty(s,"on"+e,{get(){return this["_on"+e]},set(a){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),a&&this.addEventListener(e,this["_on"+e]=a)},enumerable:!0,configurable:!0})}function Pm(i){return typeof i!="boolean"?new Error("Argument type: "+typeof i+". Please use a boolean."):(Cm=i,i?"adapter.js logging disabled":"adapter.js logging enabled")}function Im(i){return typeof i!="boolean"?new Error("Argument type: "+typeof i+". Please use a boolean."):(Rm=!i,"adapter.js deprecation warnings "+(i?"disabled":"enabled"))}function Io(){if(typeof window=="object"){if(Cm)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function yr(i,e){Rm&&console.warn(i+" is deprecated, please use "+e+" instead.")}function Lm(i){let e={browser:null,version:null};if(typeof i>"u"||!i.navigator||!i.navigator.userAgent)return e.browser="Not a browser.",e;let{navigator:t}=i;if(t.userAgentData&&t.userAgentData.brands){let n=t.userAgentData.brands.find(s=>s.brand==="Chromium");if(n){let s=parseInt(n.version,10);if(s>=90)return{browser:"chrome",version:s}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(xr(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||i.isSecureContext===!1&&i.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(xr(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(i.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(xr(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=i.RTCRtpTransceiver&&"currentDirection"in i.RTCRtpTransceiver.prototype,e._safariVersion=xr(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function wm(i){return Object.prototype.toString.call(i)==="[object Object]"}function Hu(i){return wm(i)?Object.keys(i).reduce(function(e,t){let n=wm(i[t]),s=n?Hu(i[t]):i[t],r=n&&!Object.keys(s).length;return s===void 0||r?e:Object.assign(e,{[t]:s})},{}):i}function zu(i,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(n=>{n.endsWith("Id")?zu(i,i.get(e[n]),t):n.endsWith("Ids")&&e[n].forEach(s=>{zu(i,i.get(s),t)})}))}function Gu(i,e,t){let n=t?"outbound-rtp":"inbound-rtp",s=new Map;if(e===null)return s;let r=[];return i.forEach(o=>{o.type==="track"&&o.trackIdentifier===e.id&&r.push(o)}),r.forEach(o=>{i.forEach(a=>{a.type===n&&a.trackId===o.id&&zu(i,a,s)})}),s}var bl={};jo(bl,{fixNegotiationNeeded:()=>ju,shimAddTrackRemoveTrack:()=>Yu,shimAddTrackRemoveTrackWithNative:()=>Nm,shimGetSendersWithDtmf:()=>Xu,shimGetUserMedia:()=>Sl,shimMediaStream:()=>Vu,shimOnTrack:()=>Wu,shimPeerConnection:()=>Ml,shimSenderReceiverGetStats:()=>qu});var Dm=Io;function Sl(i,e){if(e.version>=64)return;let t=i&&i.navigator;if(!t.mediaDevices)return;let n=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;let c={};return Object.keys(a).forEach(h=>{if(h==="require"||h==="advanced"||h==="mediaSource")return;let l=typeof a[h]=="object"?a[h]:{ideal:a[h]};l.exact!==void 0&&typeof l.exact=="number"&&(l.min=l.max=l.exact);let u=function(f,d){return f?f+d.charAt(0).toUpperCase()+d.slice(1):d==="deviceId"?"sourceId":d};if(l.ideal!==void 0){c.optional=c.optional||[];let f={};typeof l.ideal=="number"?(f[u("min",h)]=l.ideal,c.optional.push(f),f={},f[u("max",h)]=l.ideal,c.optional.push(f)):(f[u("",h)]=l.ideal,c.optional.push(f))}l.exact!==void 0&&typeof l.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[u("",h)]=l.exact):["min","max"].forEach(f=>{l[f]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[u(f,h)]=l[f])})}),a.advanced&&(c.optional=(c.optional||[]).concat(a.advanced)),c},s=function(a,c){if(e.version>=61)return c(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){let h=function(l,u,f){u in l&&!(f in l)&&(l[f]=l[u],delete l[u])};a=JSON.parse(JSON.stringify(a)),h(a.audio,"autoGainControl","googAutoGainControl"),h(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=n(a.audio)}if(a&&typeof a.video=="object"){let h=a.video.facingMode;h=h&&(typeof h=="object"?h:{ideal:h});let l=e.version<66;if(h&&(h.exact==="user"||h.exact==="environment"||h.ideal==="user"||h.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!l)){delete a.video.facingMode;let u;if(h.exact==="environment"||h.ideal==="environment"?u=["back","rear"]:(h.exact==="user"||h.ideal==="user")&&(u=["front"]),u)return t.mediaDevices.enumerateDevices().then(f=>{f=f.filter(p=>p.kind==="videoinput");let d=f.find(p=>u.some(y=>p.label.toLowerCase().includes(y)));return!d&&f.length&&u.includes("back")&&(d=f[f.length-1]),d&&(a.video.deviceId=h.exact?{exact:d.deviceId}:{ideal:d.deviceId}),a.video=n(a.video),Dm("chrome: "+JSON.stringify(a)),c(a)})}a.video=n(a.video)}return Dm("chrome: "+JSON.stringify(a)),c(a)},r=function(a){return e.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,c,h){s(a,l=>{t.webkitGetUserMedia(l,c,u=>{h&&h(r(u))})})};if(t.getUserMedia=o.bind(t),t.mediaDevices.getUserMedia){let a=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return s(c,h=>a(h).then(l=>{if(h.audio&&!l.getAudioTracks().length||h.video&&!l.getVideoTracks().length)throw l.getTracks().forEach(u=>{u.stop()}),new DOMException("","NotFoundError");return l},l=>Promise.reject(r(l))))}}}function Vu(i){i.MediaStream=i.MediaStream||i.webkitMediaStream}function Wu(i,e){if(!(e.version>102))if(typeof i=="object"&&i.RTCPeerConnection&&!("ontrack"in i.RTCPeerConnection.prototype)){Object.defineProperty(i.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(n){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=n)},enumerable:!0,configurable:!0});let t=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=s=>{s.stream.addEventListener("addtrack",r=>{let o;i.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.track.id):o={track:r.track};let a=new Event("track");a.track=r.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)}),s.stream.getTracks().forEach(r=>{let o;i.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.id):o={track:r};let a=new Event("track");a.track=r,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else vi(i,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function Xu(i){if(typeof i=="object"&&i.RTCPeerConnection&&!("getSenders"in i.RTCPeerConnection.prototype)&&"createDTMFSender"in i.RTCPeerConnection.prototype){let e=function(s,r){return{track:r,get dtmf(){return this._dtmf===void 0&&(r.kind==="audio"?this._dtmf=s.createDTMFSender(r):this._dtmf=null),this._dtmf},_pc:s}};if(!i.RTCPeerConnection.prototype.getSenders){i.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};let s=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addTrack=function(a,c){let h=s.apply(this,arguments);return h||(h=e(this,a),this._senders.push(h)),h};let r=i.RTCPeerConnection.prototype.removeTrack;i.RTCPeerConnection.prototype.removeTrack=function(a){r.apply(this,arguments);let c=this._senders.indexOf(a);c!==-1&&this._senders.splice(c,1)}}let t=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(r){this._senders=this._senders||[],t.apply(this,[r]),r.getTracks().forEach(o=>{this._senders.push(e(this,o))})};let n=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(r){this._senders=this._senders||[],n.apply(this,[r]),r.getTracks().forEach(o=>{let a=this._senders.find(c=>c.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof i=="object"&&i.RTCPeerConnection&&"getSenders"in i.RTCPeerConnection.prototype&&"createDTMFSender"in i.RTCPeerConnection.prototype&&i.RTCRtpSender&&!("dtmf"in i.RTCRtpSender.prototype)){let e=i.RTCPeerConnection.prototype.getSenders;i.RTCPeerConnection.prototype.getSenders=function(){let n=e.apply(this,[]);return n.forEach(s=>s._pc=this),n},Object.defineProperty(i.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function qu(i,e){if(e.version>=67||!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender&&i.RTCRtpReceiver))return;if(!("getStats"in i.RTCRtpSender.prototype)){let n=i.RTCPeerConnection.prototype.getSenders;n&&(i.RTCPeerConnection.prototype.getSenders=function(){let o=n.apply(this,[]);return o.forEach(a=>a._pc=this),o});let s=i.RTCPeerConnection.prototype.addTrack;s&&(i.RTCPeerConnection.prototype.addTrack=function(){let o=s.apply(this,arguments);return o._pc=this,o}),i.RTCRtpSender.prototype.getStats=function(){let o=this;return this._pc.getStats().then(a=>Gu(a,o.track,!0))}}if(!("getStats"in i.RTCRtpReceiver.prototype)){let n=i.RTCPeerConnection.prototype.getReceivers;n&&(i.RTCPeerConnection.prototype.getReceivers=function(){let r=n.apply(this,[]);return r.forEach(o=>o._pc=this),r}),vi(i,"track",s=>(s.receiver._pc=s.srcElement,s)),i.RTCRtpReceiver.prototype.getStats=function(){let r=this;return this._pc.getStats().then(o=>Gu(o,r.track,!1))}}if(!("getStats"in i.RTCRtpSender.prototype&&"getStats"in i.RTCRtpReceiver.prototype))return;let t=i.RTCPeerConnection.prototype.getStats;i.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof i.MediaStreamTrack){let s=arguments[0],r,o,a;return this.getSenders().forEach(c=>{c.track===s&&(r?a=!0:r=c)}),this.getReceivers().forEach(c=>(c.track===s&&(o?a=!0:o=c),c.track===s)),a||r&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):r?r.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function Nm(i){i.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};let e=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};let c=e.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(c)===-1&&this._shimmedLocalStreams[a.id].push(c):this._shimmedLocalStreams[a.id]=[a,c],c};let t=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(h=>{if(this.getSenders().find(u=>u.track===h))throw new DOMException("Track already exists.","InvalidAccessError")});let a=this.getSenders();t.apply(this,arguments);let c=this.getSenders().filter(h=>a.indexOf(h)===-1);this._shimmedLocalStreams[o.id]=[o].concat(c)};let n=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],n.apply(this,arguments)};let s=i.RTCPeerConnection.prototype.removeTrack;i.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{let c=this._shimmedLocalStreams[a].indexOf(o);c!==-1&&this._shimmedLocalStreams[a].splice(c,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),s.apply(this,arguments)}}function Yu(i,e){if(!i.RTCPeerConnection)return;if(i.RTCPeerConnection.prototype.addTrack&&e.version>=65)return Nm(i);let t=i.RTCPeerConnection.prototype.getLocalStreams;i.RTCPeerConnection.prototype.getLocalStreams=function(){let l=t.apply(this);return this._reverseStreams=this._reverseStreams||{},l.map(u=>this._reverseStreams[u.id])};let n=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(l){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},l.getTracks().forEach(u=>{if(this.getSenders().find(d=>d.track===u))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[l.id]){let u=new i.MediaStream(l.getTracks());this._streams[l.id]=u,this._reverseStreams[u.id]=l,l=u}n.apply(this,[l])};let s=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(l){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},s.apply(this,[this._streams[l.id]||l]),delete this._reverseStreams[this._streams[l.id]?this._streams[l.id].id:l.id],delete this._streams[l.id]},i.RTCPeerConnection.prototype.addTrack=function(l,u){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");let f=[].slice.call(arguments,1);if(f.length!==1||!f[0].getTracks().find(y=>y===l))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(y=>y.track===l))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};let p=this._streams[u.id];if(p)p.addTrack(l),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{let y=new i.MediaStream([l]);this._streams[u.id]=y,this._reverseStreams[y.id]=u,this.addStream(y)}return this.getSenders().find(y=>y.track===l)};function r(h,l){let u=l.sdp;return Object.keys(h._reverseStreams||[]).forEach(f=>{let d=h._reverseStreams[f],p=h._streams[d.id];u=u.replace(new RegExp(p.id,"g"),d.id)}),new RTCSessionDescription({type:l.type,sdp:u})}function o(h,l){let u=l.sdp;return Object.keys(h._reverseStreams||[]).forEach(f=>{let d=h._reverseStreams[f],p=h._streams[d.id];u=u.replace(new RegExp(d.id,"g"),p.id)}),new RTCSessionDescription({type:l.type,sdp:u})}["createOffer","createAnswer"].forEach(function(h){let l=i.RTCPeerConnection.prototype[h],u={[h](){let f=arguments;return arguments.length&&typeof arguments[0]=="function"?l.apply(this,[p=>{let y=r(this,p);f[0].apply(null,[y])},p=>{f[1]&&f[1].apply(null,p)},arguments[2]]):l.apply(this,arguments).then(p=>r(this,p))}};i.RTCPeerConnection.prototype[h]=u[h]});let a=i.RTCPeerConnection.prototype.setLocalDescription;i.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};let c=Object.getOwnPropertyDescriptor(i.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(i.RTCPeerConnection.prototype,"localDescription",{get(){let h=c.get.apply(this);return h.type===""?h:r(this,h)}}),i.RTCPeerConnection.prototype.removeTrack=function(l){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!l._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(l._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let f;Object.keys(this._streams).forEach(d=>{this._streams[d].getTracks().find(y=>l.track===y)&&(f=this._streams[d])}),f&&(f.getTracks().length===1?this.removeStream(this._reverseStreams[f.id]):f.removeTrack(l.track),this.dispatchEvent(new Event("negotiationneeded")))}}function Ml(i,e){!i.RTCPeerConnection&&i.webkitRTCPeerConnection&&(i.RTCPeerConnection=i.webkitRTCPeerConnection),i.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let n=i.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?i.RTCIceCandidate:i.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};i.RTCPeerConnection.prototype[t]=s[t]})}function ju(i,e){e.version>102||vi(i,"negotiationneeded",t=>{let n=t.target;if(!((e.version<72||n.getConfiguration&&n.getConfiguration().sdpSemantics==="plan-b")&&n.signalingState!=="stable"))return t})}var Al={};jo(Al,{shimAddTransceiver:()=>tf,shimCreateAnswer:()=>rf,shimCreateOffer:()=>sf,shimGetDisplayMedia:()=>Um,shimGetParameters:()=>nf,shimGetStats:()=>Zu,shimGetUserMedia:()=>Tl,shimOnTrack:()=>Ju,shimPeerConnection:()=>El,shimRTCDataChannel:()=>ef,shimReceiverGetStats:()=>Ku,shimRemoveStream:()=>Qu,shimSenderGetStats:()=>$u});function Tl(i,e){let t=i&&i.navigator;if(!t.mediaDevices)return;let n=i&&i.MediaStreamTrack;if(t.getUserMedia=function(s,r,o){yr("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(s).then(r,o)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){let s=function(o,a,c){a in o&&!(c in o)&&(o[c]=o[a],delete o[a])},r=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),s(o.audio,"autoGainControl","mozAutoGainControl"),s(o.audio,"noiseSuppression","mozNoiseSuppression")),r(o)},n&&n.prototype.getSettings){let o=n.prototype.getSettings;n.prototype.getSettings=function(){let a=o.apply(this,arguments);return s(a,"mozAutoGainControl","autoGainControl"),s(a,"mozNoiseSuppression","noiseSuppression"),a}}if(n&&n.prototype.applyConstraints){let o=n.prototype.applyConstraints;n.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),s(a,"autoGainControl","mozAutoGainControl"),s(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function Um(i,e){i.navigator.mediaDevices&&(i.navigator.mediaDevices&&"getDisplayMedia"in i.navigator.mediaDevices||(i.navigator.mediaDevices.getDisplayMedia=function(n){if(!(n&&n.video)){let s=new DOMException("getDisplayMedia without video constraints is undefined");return s.name="NotFoundError",s.code=8,Promise.reject(s)}return n.video===!0?n.video={mediaSource:e}:n.video.mediaSource=e,i.navigator.mediaDevices.getUserMedia(n)}))}function Ju(i){typeof i=="object"&&i.RTCTrackEvent&&"receiver"in i.RTCTrackEvent.prototype&&!("transceiver"in i.RTCTrackEvent.prototype)&&Object.defineProperty(i.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function El(i,e){typeof i!="object"||!(i.RTCPeerConnection||i.mozRTCPeerConnection)||(!i.RTCPeerConnection&&i.mozRTCPeerConnection&&(i.RTCPeerConnection=i.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let n=i.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?i.RTCIceCandidate:i.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};i.RTCPeerConnection.prototype[t]=s[t]}))}function Zu(i,e){if(typeof i!="object"||!(i.RTCPeerConnection||i.mozRTCPeerConnection)||e.version>=151)return;let t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},n=i.RTCPeerConnection.prototype.getStats;i.RTCPeerConnection.prototype.getStats=function(){let[r,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):n.apply(this,[r||null]).then(c=>{if(e.version<53&&!o)try{c.forEach(h=>{h.type=t[h.type]||h.type})}catch(h){if(h.name!=="TypeError")throw h;c.forEach((l,u)=>{c.set(u,Object.assign({},l,{type:t[l.type]||l.type}))})}return c}).then(o,a)}}function $u(i){if(!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender)||i.RTCRtpSender&&"getStats"in i.RTCRtpSender.prototype)return;let e=i.RTCPeerConnection.prototype.getSenders;e&&(i.RTCPeerConnection.prototype.getSenders=function(){let s=e.apply(this,[]);return s.forEach(r=>r._pc=this),s});let t=i.RTCPeerConnection.prototype.addTrack;t&&(i.RTCPeerConnection.prototype.addTrack=function(){let s=t.apply(this,arguments);return s._pc=this,s}),i.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function Ku(i){if(!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender)||i.RTCRtpSender&&"getStats"in i.RTCRtpReceiver.prototype)return;let e=i.RTCPeerConnection.prototype.getReceivers;e&&(i.RTCPeerConnection.prototype.getReceivers=function(){let n=e.apply(this,[]);return n.forEach(s=>s._pc=this),n}),vi(i,"track",t=>(t.receiver._pc=t.srcElement,t)),i.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function Qu(i){!i.RTCPeerConnection||"removeStream"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.removeStream=function(t){yr("removeStream","removeTrack"),this.getSenders().forEach(n=>{n.track&&t.getTracks().includes(n.track)&&this.removeTrack(n)})})}function ef(i){i.DataChannel&&!i.RTCDataChannel&&(i.RTCDataChannel=i.DataChannel)}function tf(i,e){if(!(typeof i=="object"&&i.RTCPeerConnection)||e.version>=110)return;let t=i.RTCPeerConnection.prototype.addTransceiver;t&&(i.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let s=arguments[1]&&arguments[1].sendEncodings;s===void 0&&(s=[]),s=[...s];let r=s.length>0;r&&s.forEach(a=>{if("rid"in a&&!/^[a-z0-9]{0,16}$/i.test(a.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in a&&!(parseFloat(a.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in a&&!(parseFloat(a.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});let o=t.apply(this,arguments);if(r){let{sender:a}=o,c=a.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=s,a.sendEncodings=s,this.setParametersPromises.push(a.setParameters(c).then(()=>{delete a.sendEncodings}).catch(()=>{delete a.sendEncodings})))}return o})}function nf(i,e){if(!(typeof i=="object"&&i.RTCRtpSender)||e.version>=110)return;let t=i.RTCRtpSender.prototype.getParameters;t&&(i.RTCRtpSender.prototype.getParameters=function(){let s=t.apply(this,arguments);return"encodings"in s||(s.encodings=[].concat(this.sendEncodings||[{}])),s})}function sf(i,e){if(!(typeof i=="object"&&i.RTCPeerConnection)||e.version>=110)return;let t=i.RTCPeerConnection.prototype.createOffer;i.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function rf(i,e){if(!(typeof i=="object"&&i.RTCPeerConnection)||e.version>=110)return;let t=i.RTCPeerConnection.prototype.createAnswer;i.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}var wl={};jo(wl,{shimAudioContext:()=>df,shimCallbacksAPI:()=>cf,shimConstraints:()=>Om,shimCreateOfferLegacy:()=>ff,shimGetUserMedia:()=>lf,shimLocalStreamsAPI:()=>of,shimRTCIceServerUrls:()=>hf,shimRemoteStreamsAPI:()=>af,shimTrackEventTransceiver:()=>uf});function of(i){if(!(typeof i!="object"||!i.RTCPeerConnection)){if("getLocalStreams"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in i.RTCPeerConnection.prototype)){let e=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addStream=function(n){this._localStreams||(this._localStreams=[]),this._localStreams.includes(n)||this._localStreams.push(n),n.getAudioTracks().forEach(s=>e.call(this,s,n)),n.getVideoTracks().forEach(s=>e.call(this,s,n))},i.RTCPeerConnection.prototype.addTrack=function(n,...s){return s&&s.forEach(r=>{this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]}),e.apply(this,arguments)}}"removeStream"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);let n=this._localStreams.indexOf(t);if(n===-1)return;this._localStreams.splice(n,1);let s=t.getTracks();this.getSenders().forEach(r=>{s.includes(r.track)&&this.removeTrack(r)})})}}function af(i){if(!(typeof i!="object"||!i.RTCPeerConnection)&&("getRemoteStreams"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in i.RTCPeerConnection.prototype))){Object.defineProperty(i.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=n=>{n.streams.forEach(s=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(s))return;this._remoteStreams.push(s);let r=new Event("addstream");r.stream=s,this.dispatchEvent(r)})})}});let e=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){let n=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(s){s.streams.forEach(r=>{if(n._remoteStreams||(n._remoteStreams=[]),n._remoteStreams.indexOf(r)>=0)return;n._remoteStreams.push(r);let o=new Event("addstream");o.stream=r,n.dispatchEvent(o)})}),e.apply(n,arguments)}}}function cf(i){if(typeof i!="object"||!i.RTCPeerConnection)return;let e=i.RTCPeerConnection.prototype,t=e.createOffer,n=e.createAnswer,s=e.setLocalDescription,r=e.setRemoteDescription,o=e.addIceCandidate;e.createOffer=function(h,l){let u=arguments.length>=2?arguments[2]:arguments[0],f=t.apply(this,[u]);return l?(f.then(h,l),Promise.resolve()):f},e.createAnswer=function(h,l){let u=arguments.length>=2?arguments[2]:arguments[0],f=n.apply(this,[u]);return l?(f.then(h,l),Promise.resolve()):f};let a=function(c,h,l){let u=s.apply(this,[c]);return l?(u.then(h,l),Promise.resolve()):u};e.setLocalDescription=a,a=function(c,h,l){let u=r.apply(this,[c]);return l?(u.then(h,l),Promise.resolve()):u},e.setRemoteDescription=a,a=function(c,h,l){let u=o.apply(this,[c]);return l?(u.then(h,l),Promise.resolve()):u},e.addIceCandidate=a}function lf(i){let e=i&&i.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){let t=e.mediaDevices,n=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=s=>n(Om(s))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=(function(n,s,r){e.mediaDevices.getUserMedia(n).then(s,r)}).bind(e))}function Om(i){return i&&i.video!==void 0?Object.assign({},i,{video:Hu(i.video)}):i}function hf(i){if(!i.RTCPeerConnection)return;let e=i.RTCPeerConnection;i.RTCPeerConnection=function(n,s){if(n&&n.iceServers){let r=[];for(let o=0;o<n.iceServers.length;o++){let a=n.iceServers[o];a.urls===void 0&&a.url?(yr("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,r.push(a)):r.push(n.iceServers[o])}n.iceServers=r}return new e(n,s)},i.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(i.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function uf(i){typeof i=="object"&&i.RTCTrackEvent&&"receiver"in i.RTCTrackEvent.prototype&&!("transceiver"in i.RTCTrackEvent.prototype)&&Object.defineProperty(i.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function ff(i){let e=i.RTCPeerConnection.prototype.createOffer;i.RTCPeerConnection.prototype.createOffer=function(n){if(n){typeof n.offerToReceiveAudio<"u"&&(n.offerToReceiveAudio=!!n.offerToReceiveAudio);let s=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");n.offerToReceiveAudio===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):n.offerToReceiveAudio===!0&&!s&&this.addTransceiver("audio",{direction:"recvonly"}),typeof n.offerToReceiveVideo<"u"&&(n.offerToReceiveVideo=!!n.offerToReceiveVideo);let r=this.getTransceivers().find(o=>o.receiver.track.kind==="video");n.offerToReceiveVideo===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):n.offerToReceiveVideo===!0&&!r&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function df(i){typeof i!="object"||i.AudioContext||(i.AudioContext=i.webkitAudioContext)}var gf={};jo(gf,{removeExtmapAllowMixed:()=>Pl,shimAddIceCandidateNullOrEmpty:()=>Uo,shimConnectionState:()=>Rl,shimMaxMessageSize:()=>Do,shimParameterlessSetLocalDescription:()=>Oo,shimRTCIceCandidate:()=>Lo,shimRTCIceCandidateRelayProtocol:()=>Cl,shimSendThrowTypeError:()=>No});var vr=Jf(mf());function Lo(i){if(!i.RTCIceCandidate||i.RTCIceCandidate&&"foundation"in i.RTCIceCandidate.prototype)return;let e=i.RTCIceCandidate;i.RTCIceCandidate=function(n){if(typeof n=="object"&&n.candidate&&n.candidate.indexOf("a=")===0&&(n=JSON.parse(JSON.stringify(n)),n.candidate=n.candidate.substring(2)),n.candidate&&n.candidate.length){let s=new e(n),r=vr.default.parseCandidate(n.candidate);for(let o in r)o in s||Object.defineProperty(s,o,{value:r[o]});return s.toJSON=function(){return{candidate:s.candidate,sdpMid:s.sdpMid,sdpMLineIndex:s.sdpMLineIndex,usernameFragment:s.usernameFragment}},s}return new e(n)},i.RTCIceCandidate.prototype=e.prototype,vi(i,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new i.RTCIceCandidate(t.candidate),writable:"false"}),t))}function Cl(i){!i.RTCIceCandidate||i.RTCIceCandidate&&"relayProtocol"in i.RTCIceCandidate.prototype||vi(i,"icecandidate",e=>{if(e.candidate){let t=vr.default.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function Do(i,e){if(!i.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in i.RTCPeerConnection.prototype||Object.defineProperty(i.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});let t=function(a){if(!a||!a.sdp)return!1;let c=vr.default.splitSections(a.sdp);return c.shift(),c.some(h=>{let l=vr.default.parseMLine(h);return l&&l.kind==="application"&&l.protocol.indexOf("SCTP")!==-1})},n=function(a){let c=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;let h=parseInt(c[1],10);return h!==h?-1:h},s=function(a){let c=65536;return e.browser==="firefox"&&(e.version<57?a===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},r=function(a,c){let h=65536;e.browser==="firefox"&&e.version===57&&(h=65535);let l=vr.default.matchPrefix(a.sdp,"a=max-message-size:");return l.length>0?h=parseInt(l[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(h=2147483637),h},o=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){let{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){let c=n(arguments[0]),h=s(c),l=r(arguments[0],c),u;h===0&&l===0?u=Number.POSITIVE_INFINITY:h===0||l===0?u=Math.max(h,l):u=Math.min(h,l);let f={};Object.defineProperty(f,"maxMessageSize",{get(){return u}}),this._sctp=f}return o.apply(this,arguments)}}function No(i,e){if(!(i.RTCPeerConnection&&"createDataChannel"in i.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(s,r){let o=s.send;s.send=function(){let c=arguments[0],h=c.length||c.size||c.byteLength;if(s.readyState==="open"&&r.sctp&&h>r.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+r.sctp.maxMessageSize+" bytes)");return o.apply(s,arguments)}}let n=i.RTCPeerConnection.prototype.createDataChannel;i.RTCPeerConnection.prototype.createDataChannel=function(){let r=n.apply(this,arguments);return t(r,this),r},vi(i,"datachannel",s=>(t(s.channel,s.target),s))}function Rl(i){if(!i.RTCPeerConnection||"connectionState"in i.RTCPeerConnection.prototype)return;let e=i.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{let n=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=s=>{let r=s.target;if(r._lastConnectionState!==r.connectionState){r._lastConnectionState=r.connectionState;let o=new Event("connectionstatechange",s);r.dispatchEvent(o)}return s},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),n.apply(this,arguments)}})}function Pl(i,e){if(!i.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;let t=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(s){if(s&&s.sdp&&s.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){let r=s.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);i.RTCSessionDescription&&s instanceof i.RTCSessionDescription?arguments[0]=new i.RTCSessionDescription({type:s.type,sdp:r}):s.sdp=r}return t.apply(this,arguments)}}function Uo(i,e){if(!(i.RTCPeerConnection&&i.RTCPeerConnection.prototype))return;let t=i.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(i.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function Oo(i,e){if(!(i.RTCPeerConnection&&i.RTCPeerConnection.prototype))return;let t=i.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(i.RTCPeerConnection.prototype.setLocalDescription=function(){let s=arguments[0]||{};if(typeof s!="object"||s.type&&s.sdp)return t.apply(this,arguments);if(s={type:s.type,sdp:s.sdp},!s.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":s.type="offer";break;default:s.type="answer";break}return s.sdp||s.type!=="offer"&&s.type!=="answer"?t.apply(this,[s]):(s.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>t.apply(this,[o]))})}var vS=Jf(mf());function Fm({window:i}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){let t=Io,n=Lm(i),s={browserDetails:n,commonShim:gf,extractVersion:xr,disableLog:Pm,disableWarnings:Im,sdp:vS};switch(n.browser){case"chrome":if(!bl||!Ml||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),s;if(n.version===null)return t("Chrome shim can not determine version, not shimming."),s;t("adapter.js shimming chrome."),s.browserShim=bl,Uo(i,n),Oo(i,n),Sl(i,n),Vu(i,n),Ml(i,n),Wu(i,n),Yu(i,n),Xu(i,n),qu(i,n),ju(i,n),Lo(i,n),Cl(i,n),Rl(i,n),Do(i,n),No(i,n),Pl(i,n);break;case"firefox":if(!Al||!El||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),s;t("adapter.js shimming firefox."),s.browserShim=Al,Uo(i,n),Oo(i,n),Tl(i,n),El(i,n),Zu(i,n),Ju(i,n),Qu(i,n),$u(i,n),Ku(i,n),ef(i,n),tf(i,n),nf(i,n),sf(i,n),rf(i,n),Lo(i,n),Rl(i,n),Do(i,n),No(i,n);break;case"safari":if(!wl||!e.shimSafari)return t("Safari shim is not included in this adapter release."),s;t("adapter.js shimming safari."),s.browserShim=wl,Uo(i,n),Oo(i,n),hf(i,n),ff(i,n),cf(i,n),of(i,n),af(i,n),uf(i,n),lf(i,n),df(i,n),Lo(i,n),Cl(i,n),Do(i,n),No(i,n),Pl(i,n);break;default:t("Unsupported browser!");break}return s}var SS=Fm({window:typeof window>"u"?void 0:window}),_f=SS;function Es(i,e,t,n){Object.defineProperty(i,e,{get:t,set:n,enumerable:!0,configurable:!0})}var Ll=class{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{let t=[],n=e.byteLength,s=Math.ceil(n/this.chunkedMTU),r=0,o=0;for(;o<n;){let a=Math.min(n,o+this.chunkedMTU),c=e.slice(o,a),h={__peerData:this._dataCount,n:r,data:c,total:s};t.push(h),o=a,r++}return this._dataCount++,t}}};function MS(i){let e=0;for(let s of i)e+=s.byteLength;let t=new Uint8Array(e),n=0;for(let s of i)t.set(s,n),n+=s.byteLength;return t}var xf=_f.default||_f,Fo=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){let i=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(i)?i==="chrome"?e>=this.minChromeVersion:i==="firefox"?e>=this.minFirefoxVersion:i==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return xf.browserDetails.browser}getVersion(){return xf.browserDetails.version||0}isUnifiedPlanSupported(){let i=this.getBrowser(),e=xf.browserDetails.version||0;if(i==="chrome"&&e<this.minChromeVersion)return!1;if(i==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,n=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),n=!0}catch{}finally{t&&t.close()}return n}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},bS=i=>!i||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(i),Bm=()=>Math.random().toString(36).slice(2),km={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"},yf=class extends Ll{noop(){}blobToArrayBuffer(e,t){let n=new FileReader;return n.onload=function(s){s.target&&t(s.target.result)},n.readAsArrayBuffer(e),n}binaryStringToArrayBuffer(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=km,this.browser=Fo.getBrowser(),this.browserVersion=Fo.getVersion(),this.pack=Bu,this.unpack=ku,this.supports=(function(){let t={browser:Fo.isBrowserSupported(),webRTC:Fo.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let n;try{n=new RTCPeerConnection(km),t.audioVideo=!0;let s;try{s=n.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!s.ordered;try{s.binaryType="blob",t.binaryBlob=!Fo.isIOS}catch{}}catch{}finally{s&&s.close()}}catch{}finally{n&&n.close()}return t})(),this.validateId=bS,this.randomToken=Bm}},Tn=new yf,TS="PeerJS: ";var vf=class{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){let n=[TS,...t];for(let s in n)n[s]instanceof Error&&(n[s]="("+n[s].name+") "+n[s].message);e>=3?console.log(...n):e>=2?console.warn("WARNING",...n):e>=1&&console.error("ERROR",...n)}constructor(){this._logLevel=0}},we=new vf,wf={},ES=Object.prototype.hasOwnProperty,_n="~";function Bo(){}Object.create&&(Bo.prototype=Object.create(null),new Bo().__proto__||(_n=!1));function AS(i,e,t){this.fn=i,this.context=e,this.once=t||!1}function zm(i,e,t,n,s){if(typeof t!="function")throw new TypeError("The listener must be a function");var r=new AS(t,n||i,s),o=_n?_n+e:e;return i._events[o]?i._events[o].fn?i._events[o]=[i._events[o],r]:i._events[o].push(r):(i._events[o]=r,i._eventsCount++),i}function Il(i,e){--i._eventsCount===0?i._events=new Bo:delete i._events[e]}function hn(){this._events=new Bo,this._eventsCount=0}hn.prototype.eventNames=function(){var e=[],t,n;if(this._eventsCount===0)return e;for(n in t=this._events)ES.call(t,n)&&e.push(_n?n.slice(1):n);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};hn.prototype.listeners=function(e){var t=_n?_n+e:e,n=this._events[t];if(!n)return[];if(n.fn)return[n.fn];for(var s=0,r=n.length,o=new Array(r);s<r;s++)o[s]=n[s].fn;return o};hn.prototype.listenerCount=function(e){var t=_n?_n+e:e,n=this._events[t];return n?n.fn?1:n.length:0};hn.prototype.emit=function(e,t,n,s,r,o){var a=_n?_n+e:e;if(!this._events[a])return!1;var c=this._events[a],h=arguments.length,l,u;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),h){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,n),!0;case 4:return c.fn.call(c.context,t,n,s),!0;case 5:return c.fn.call(c.context,t,n,s,r),!0;case 6:return c.fn.call(c.context,t,n,s,r,o),!0}for(u=1,l=new Array(h-1);u<h;u++)l[u-1]=arguments[u];c.fn.apply(c.context,l)}else{var f=c.length,d;for(u=0;u<f;u++)switch(c[u].once&&this.removeListener(e,c[u].fn,void 0,!0),h){case 1:c[u].fn.call(c[u].context);break;case 2:c[u].fn.call(c[u].context,t);break;case 3:c[u].fn.call(c[u].context,t,n);break;case 4:c[u].fn.call(c[u].context,t,n,s);break;default:if(!l)for(d=1,l=new Array(h-1);d<h;d++)l[d-1]=arguments[d];c[u].fn.apply(c[u].context,l)}}return!0};hn.prototype.on=function(e,t,n){return zm(this,e,t,n,!1)};hn.prototype.once=function(e,t,n){return zm(this,e,t,n,!0)};hn.prototype.removeListener=function(e,t,n,s){var r=_n?_n+e:e;if(!this._events[r])return this;if(!t)return Il(this,r),this;var o=this._events[r];if(o.fn)o.fn===t&&(!s||o.once)&&(!n||o.context===n)&&Il(this,r);else{for(var a=0,c=[],h=o.length;a<h;a++)(o[a].fn!==t||s&&!o[a].once||n&&o[a].context!==n)&&c.push(o[a]);c.length?this._events[r]=c.length===1?c[0]:c:Il(this,r)}return this};hn.prototype.removeAllListeners=function(e){var t;return e?(t=_n?_n+e:e,this._events[t]&&Il(this,t)):(this._events=new Bo,this._eventsCount=0),this};hn.prototype.off=hn.prototype.removeListener;hn.prototype.addListener=hn.prototype.on;hn.prefixed=_n;hn.EventEmitter=hn;wf=hn;var As={};Es(As,"ConnectionType",()=>rs);Es(As,"PeerErrorType",()=>kt);Es(As,"BaseConnectionErrorType",()=>Sf);Es(As,"DataConnectionErrorType",()=>Cf);Es(As,"SerializationType",()=>kl);Es(As,"SocketEventType",()=>ss);Es(As,"ServerMessageType",()=>ln);var rs=(function(i){return i.Data="data",i.Media="media",i})({}),kt=(function(i){return i.BrowserIncompatible="browser-incompatible",i.Disconnected="disconnected",i.InvalidID="invalid-id",i.InvalidKey="invalid-key",i.Network="network",i.PeerUnavailable="peer-unavailable",i.SslUnavailable="ssl-unavailable",i.ServerError="server-error",i.SocketError="socket-error",i.SocketClosed="socket-closed",i.UnavailableID="unavailable-id",i.WebRTC="webrtc",i})({}),Sf=(function(i){return i.NegotiationFailed="negotiation-failed",i.ConnectionClosed="connection-closed",i})({}),Cf=(function(i){return i.NotOpenYet="not-open-yet",i.MessageToBig="message-too-big",i})({}),kl=(function(i){return i.Binary="binary",i.BinaryUTF8="binary-utf8",i.JSON="json",i.None="raw",i})({}),ss=(function(i){return i.Message="message",i.Disconnected="disconnected",i.Error="error",i.Close="close",i})({}),ln=(function(i){return i.Heartbeat="HEARTBEAT",i.Candidate="CANDIDATE",i.Offer="OFFER",i.Answer="ANSWER",i.Open="OPEN",i.Error="ERROR",i.IdTaken="ID-TAKEN",i.InvalidKey="INVALID-KEY",i.Leave="LEAVE",i.Expire="EXPIRE",i})({}),Hm="1.5.5",Mf=class extends wf.EventEmitter{constructor(e,t,n,s,r,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];let a=e?"wss://":"ws://";this._baseUrl=a+t+":"+n+s+"peerjs?key="+r}start(e,t){this._id=e;let n=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(n+"&version="+Hm),this._disconnected=!1,this._socket.onmessage=s=>{let r;try{r=JSON.parse(s.data),we.log("Server message received:",r)}catch{we.log("Invalid server message",s.data);return}this.emit(ss.Message,r)},this._socket.onclose=s=>{this._disconnected||(we.log("Socket closed.",s),this._cleanup(),this._disconnected=!0,this.emit(ss.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),we.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){we.log("Cannot send heartbeat, because socket closed");return}let e=JSON.stringify({type:ln.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){let e=[...this._messagesQueue];this._messagesQueue=[];for(let t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(ss.Error,"Invalid message");return}if(!this._wsOpen())return;let t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}},Dl=class{constructor(e){this.connection=e}startConnection(e){let t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===rs.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){let n=this.connection,s={ordered:!!e.reliable},r=t.createDataChannel(n.label,s);n._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){we.log("Creating RTCPeerConnection.");let e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){let t=this.connection.peer,n=this.connection.connectionId,s=this.connection.type,r=this.connection.provider;we.log("Listening for ICE candidates."),e.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(we.log(`Received ICE candidates for ${t}:`,o.candidate),r.socket.send({type:ln.Candidate,payload:{candidate:o.candidate,type:s,connectionId:n},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":we.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(Sf.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":we.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(Sf.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":we.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},we.log("Listening for data channel"),e.ondatachannel=o=>{we.log("Received data channel");let a=o.channel;r.getConnection(t,n)._initializeDataChannel(a)},we.log("Listening for remote stream"),e.ontrack=o=>{we.log("Received remote stream");let a=o.streams[0],c=r.getConnection(t,n);if(c.type===rs.Media){let h=c;this._addStreamToMediaConnection(a,h)}}}cleanup(){we.log("Cleaning up PeerConnection to "+this.connection.peer);let e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};let t=e.signalingState!=="closed",n=!1,s=this.connection.dataChannel;s&&(n=!!s.readyState&&s.readyState!=="closed"),(t||n)&&e.close()}async _makeOffer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let n=await e.createOffer(this.connection.options.constraints);we.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await e.setLocalDescription(n),we.log("Set localDescription:",n,`for:${this.connection.peer}`);let s={sdp:n,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===rs.Data){let r=this.connection;s={...s,label:r.label,reliable:r.reliable,serialization:r.serialization}}t.socket.send({type:ln.Offer,payload:s,dst:this.connection.peer})}catch(s){s!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(kt.WebRTC,s),we.log("Failed to setLocalDescription, ",s))}}catch(n){t.emitError(kt.WebRTC,n),we.log("Failed to createOffer, ",n)}}async _makeAnswer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let n=await e.createAnswer();we.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await e.setLocalDescription(n),we.log("Set localDescription:",n,`for:${this.connection.peer}`),t.socket.send({type:ln.Answer,payload:{sdp:n,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(s){t.emitError(kt.WebRTC,s),we.log("Failed to setLocalDescription, ",s)}}catch(n){t.emitError(kt.WebRTC,n),we.log("Failed to create answer, ",n)}}async handleSDP(e,t){t=new RTCSessionDescription(t);let n=this.connection.peerConnection,s=this.connection.provider;we.log("Setting remote description",t);let r=this;try{await n.setRemoteDescription(t),we.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await r._makeAnswer()}catch(o){s.emitError(kt.WebRTC,o),we.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(e){we.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),we.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(kt.WebRTC,t),we.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(we.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return we.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(n=>{t.addTrack(n,e)})}_addStreamToMediaConnection(e,t){we.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}},Nl=class extends wf.EventEmitter{emitError(e,t){we.error("Error:",t),this.emit("error",new bf(`${e}`,t))}},bf=class extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}},Ul=class extends Nl{get open(){return this._open}constructor(e,t,n){super(),this.peer=e,this.provider=t,this.options=n,this._open=!1,this.metadata=n.metadata}},Ol=class i extends Ul{static#e=this.ID_PREFIX="mc_";get type(){return rs.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,n){super(e,t,n),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||i.ID_PREFIX+Tn.randomToken(),this._negotiator=new Dl(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{we.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{we.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){we.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){let t=e.type,n=e.payload;switch(e.type){case ln.Answer:this._negotiator.handleSDP(t,n.sdp),this._open=!0;break;case ln.Candidate:this._negotiator.handleCandidate(n.candidate);break;default:we.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){we.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});let n=this.provider._getMessages(this.connectionId);for(let s of n)this.handleMessage(s);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}},Tf=class{constructor(e){this._options=e}_buildRequest(e){let t=this._options.secure?"https":"http",{host:n,port:s,path:r,key:o}=this._options,a=new URL(`${t}://${n}:${s}${r}${o}/${e}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",Hm),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{let e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){we.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==Tn.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{let e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===Tn.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw we.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}},Fl=class i extends Ul{static#e=this.ID_PREFIX="dc_";static#t=this.MAX_BUFFERED_AMOUNT=8388608;get type(){return rs.Data}constructor(e,t,n){super(e,t,n),this.connectionId=this.options.connectionId||i.ID_PREFIX+Bm(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Dl(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{we.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{we.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{we.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(Cf.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){let t=e.payload;switch(e.type){case ln.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case ln.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:we.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}},zo=class extends Fl{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>Fl.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return we.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;let e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}},ko=class extends zo{close(e){super.close(e),this._chunkedData={}}constructor(e,t,n){super(e,t,n),this.chunker=new Ll,this.serialization=kl.Binary,this._chunkedData={}}_handleDataMessage({data:e}){let t=ku(e),n=t.__peerData;if(n){if(n.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){let t=e.__peerData,n=this._chunkedData[t]||{data:[],count:0,total:e.total};if(n.data[e.n]=new Uint8Array(e.data),n.count++,this._chunkedData[t]=n,n.total===n.count){delete this._chunkedData[t];let s=MS(n.data);this._handleDataMessage({data:s})}}_send(e,t){let n=Bu(e);if(n instanceof Promise)return this._send_blob(n);if(!t&&n.byteLength>this.chunker.chunkedMTU){this._sendChunks(n);return}this._bufferedSend(n)}async _send_blob(e){let t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){let t=this.chunker.chunk(e);we.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(let n of t)this.send(n,!0)}},Ef=class extends zo{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=kl.None}},Af=class extends zo{_handleDataMessage({data:e}){let t=this.parse(this.decoder.decode(e)),n=t.__peerData;if(n&&n.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){let n=this.encoder.encode(this.stringify(e));if(n.byteLength>=Tn.chunkedMTU){this.emitError(Cf.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(n)}constructor(...e){super(...e),this.serialization=kl.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}};var Ho=class i extends Nl{static#e=this.DEFAULT_KEY="peerjs";get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){let e=Object.create(null);for(let[t,n]of this._connections)e[t]=n;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:Ef,json:Af,binary:ko,"binary-utf8":ko,default:ko},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let n;if(e&&e.constructor==Object?t=e:e&&(n=e.toString()),t={debug:0,host:Tn.CLOUD_HOST,port:Tn.CLOUD_PORT,path:"/",key:i.DEFAULT_KEY,token:Tn.randomToken(),config:Tn.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==Tn.CLOUD_HOST?this._options.secure=Tn.isSecure():this._options.host==Tn.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&we.setLogFunction(this._options.logFunction),we.logLevel=this._options.debug||0,this._api=new Tf(t),this._socket=this._createServerConnection(),!Tn.supports.audioVideo&&!Tn.supports.data){this._delayedAbort(kt.BrowserIncompatible,"The current browser does not support WebRTC");return}if(n&&!Tn.validateId(n)){this._delayedAbort(kt.InvalidID,`ID "${n}" is invalid`);return}n?this._initialize(n):this._api.retrieveId().then(s=>this._initialize(s)).catch(s=>this._abort(kt.ServerError,s))}_createServerConnection(){let e=new Mf(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(ss.Message,t=>{this._handleMessage(t)}),e.on(ss.Error,t=>{this._abort(kt.SocketError,t)}),e.on(ss.Disconnected,()=>{this.disconnected||(this.emitError(kt.Network,"Lost connection to server."),this.disconnect())}),e.on(ss.Close,()=>{this.disconnected||this._abort(kt.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){let t=e.type,n=e.payload,s=e.src;switch(t){case ln.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case ln.Error:this._abort(kt.ServerError,n.msg);break;case ln.IdTaken:this._abort(kt.UnavailableID,`ID "${this.id}" is taken`);break;case ln.InvalidKey:this._abort(kt.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case ln.Leave:we.log(`Received leave message from ${s}`),this._cleanupPeer(s),this._connections.delete(s);break;case ln.Expire:this.emitError(kt.PeerUnavailable,`Could not connect to peer ${s}`);break;case ln.Offer:{let r=n.connectionId,o=this.getConnection(s,r);if(o&&(o.close(),we.warn(`Offer received for existing Connection ID:${r}`)),n.type===rs.Media){let c=new Ol(s,this,{connectionId:r,_payload:n,metadata:n.metadata});o=c,this._addConnection(s,o),this.emit("call",c)}else if(n.type===rs.Data){let c=new this._serializers[n.serialization](s,this,{connectionId:r,_payload:n,metadata:n.metadata,label:n.label,serialization:n.serialization,reliable:n.reliable});o=c,this._addConnection(s,o),this.emit("connection",c)}else{we.warn(`Received malformed connection type:${n.type}`);return}let a=this._getMessages(r);for(let c of a)o.handleMessage(c);break}default:{if(!n){we.warn(`You received a malformed message from ${s} of type ${t}`);return}let r=n.connectionId,o=this.getConnection(s,r);o&&o.peerConnection?o.handleMessage(e):r?this._storeMessage(r,e):we.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){let t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){we.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(kt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}let n=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,n),n}call(e,t,n={}){if(this.disconnected){we.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(kt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){we.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}let s=new Ol(e,this,{...n,_stream:t});return this._addConnection(e,s),s}_addConnection(e,t){we.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){let t=this._connections.get(e.peer);if(t){let n=t.indexOf(e);n!==-1&&t.splice(n,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){let n=this._connections.get(e);if(!n)return null;for(let s of n)if(s.connectionId===t)return s;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){we.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(we.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(let e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){let t=this._connections.get(e);if(t)for(let n of t)n.close()}disconnect(){if(this.disconnected)return;let e=this.id;we.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)we.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)we.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(kt.ServerError,t))}};var Rf="sendaninja-v"+5+"-",Gm="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",Pf=47800;function Bl(){let i="";for(let e=0;e<5;e++)i+=Gm.charAt(Math.floor(Math.random()*Gm.length));return i}function Vm(){let i={debug:0},e=typeof window<"u"&&window.__peerOpts;if(e)for(let t in e)i[t]=e[t];return i}function Go(){return typeof window<"u"?window.SendaNative:null}function Sr(){return!!Go()}function Wm(){return Go()?"app":typeof location<"u"&&location.protocol==="http:"&&location.port===String(Pf)?"lan":"web"}var zl=class{constructor(){this.conns={},this.peer=null,this.closed=!1,this.onJoin=null,this.onLeave=null,this.onMsg=null,this.onDown=null}open(){let e=this;return new Promise(function(t,n){let s=0,r=!1,o=setTimeout(function(){r||(r=!0,e.close(),n(new Error("timeout")))},2e4);function a(){let c=Bl(),h=new Ho(Rf+c,Vm());e.peer=h,h.on("open",function(){r||(r=!0,clearTimeout(o),t(c))}),h.on("connection",function(l){e.accept(l)}),h.on("disconnected",function(){e.closed||setTimeout(function(){if(!e.closed&&e.peer===h&&!h.destroyed)try{h.reconnect()}catch{}},1500)}),h.on("error",function(l){if(r){l&&l.type==="network"&&e.onDown&&e.onDown();return}if(l&&l.type==="unavailable-id"&&s++<4){try{h.destroy()}catch{}a();return}r=!0,clearTimeout(o);try{h.destroy()}catch{}n(l)})}a()})}accept(e){let t=this,n=e.peer;e.on("open",function(){t.conns[n]=e,t.onJoin&&t.onJoin(n)}),e.on("data",function(r){t.conns[n]&&t.onMsg&&t.onMsg(n,r)});let s=function(){t.conns[n]&&(delete t.conns[n],t.onLeave&&t.onLeave(n))};e.on("close",s),e.on("error",s)}send(e,t){let n=this.conns[e];if(n&&n.open)try{n.send(t)}catch{}}broadcast(e){for(let t in this.conns)this.send(t,e)}kick(e){let t=this.conns[e];if(t){delete this.conns[e];try{t.close()}catch{}}}close(){if(this.closed=!0,this.peer)try{this.peer.destroy()}catch{}this.conns={}}},Hl=class{constructor(){this.peer=null,this.conn=null,this.onMsg=null,this.onClose=null,this.closed=!1}connect(e){let t=this;return new Promise(function(n,s){let r=!1,o=function(h){r||(r=!0,clearTimeout(a),t.close(),s(h))},a=setTimeout(function(){o(new Error("timeout"))},22e3),c=new Ho(Rf+"j-"+Bl()+Bl()+Bl(),Vm());t.peer=c,c.on("open",function(){let h=c.connect(Rf+e,{reliable:!0,serialization:"raw"});t.conn=h,h.on("open",function(){r||(r=!0,clearTimeout(a),n())}),h.on("data",function(u){t.onMsg&&t.onMsg(u)});let l=function(){r?!t.closed&&t.onClose&&(t.closed=!0,t.onClose()):o(new Error("closed"))};h.on("close",l),h.on("error",l)}),c.on("error",function(h){r||o(h)})})}send(e){if(this.conn&&this.conn.open)try{this.conn.send(e)}catch{}}close(){if(this.closed=!0,this.peer)try{this.peer.destroy()}catch{}}},Gl=class{constructor(){this.ws=null,this.onJoin=null,this.onLeave=null,this.onMsg=null,this.onDown=null,this.closed=!1,this.ids={}}open(e){let t=this,n=Go();return new Promise(function(s,r){if(!n){r(new Error("nolan"));return}let o;try{o=JSON.parse(n.lanStart(String(e||"Sala")))}catch(h){r(h);return}if(!o||!o.ok){r(new Error(o&&o.err?o.err:"lanfail"));return}let a=new WebSocket("ws://127.0.0.1:"+o.port+"/host");t.ws=a;let c=!1;a.onopen=function(){c=!0,s(o.ips&&o.ips.length?o.ips.join("  \xB7  "):"sin Wi-Fi")},a.onerror=function(){c||r(new Error("lanws"))},a.onclose=function(){c&&!t.closed&&t.onDown&&t.onDown()},a.onmessage=function(h){let l=h.data;if(typeof l!="string"||!l.length)return;let u=l.charAt(0);if(u==="+"){let d=l.slice(1);t.ids[d]=1,t.onJoin&&t.onJoin(d);return}if(u==="-"){let d=l.slice(1);t.ids[d]&&(delete t.ids[d],t.onLeave&&t.onLeave(d));return}let f=l.indexOf("|");if(f>0){let d=l.slice(0,f);t.ids[d]&&t.onMsg&&t.onMsg(d,l.slice(f+1))}}})}send(e,t){this.ws&&this.ws.readyState===1&&this.ws.send(e+"|"+t)}broadcast(e){this.ws&&this.ws.readyState===1&&this.ws.send("*|"+e)}kick(e){delete this.ids[e],this.ws&&this.ws.readyState===1&&this.ws.send("!"+e)}close(){if(this.closed=!0,this.ws)try{this.ws.close()}catch{}let e=Go();if(e)try{e.lanStop()}catch{}}},Vl=class{constructor(){this.ws=null,this.onMsg=null,this.onClose=null,this.closed=!1}connect(e){let t=this;return new Promise(function(n,s){let r=String(e||"").replace(/^\s*(ws|http)s?:\/\//,"").replace(/[\s/]+$/g,"");if(!/^[0-9a-zA-Z.\-:]+$/.test(r)){s(new Error("badaddr"));return}r.indexOf(":")<0&&(r+=":"+Pf);let o=!1,a;try{a=new WebSocket("ws://"+r+"/join")}catch(h){s(h);return}t.ws=a;let c=setTimeout(function(){if(!o){o=!0;try{a.close()}catch{}s(new Error("timeout"))}},7e3);a.onopen=function(){o||(o=!0,clearTimeout(c),n())},a.onerror=function(){o||(o=!0,clearTimeout(c),s(new Error("lanws")))},a.onclose=function(){o&&!t.closed&&t.onClose&&(t.closed=!0,t.onClose())},a.onmessage=function(h){typeof h.data=="string"&&t.onMsg&&t.onMsg(h.data)}})}send(e){this.ws&&this.ws.readyState===1&&this.ws.send(e)}close(){if(this.closed=!0,this.ws)try{this.ws.close()}catch{}}};function Xm(i,e){let t=Go(),n=[];if(t)try{n=JSON.parse(t.lanIps())||[]}catch{n=[]}let s=[],r=typeof window<"u"&&window.__lanScanHosts;if(r){for(let f=0;f<r.length;f++)s.push(r[f]);n=[]}for(let f=0;f<n.length;f++){let d=String(n[f]).split(".");if(d.length!==4){s.push(String(n[f]));continue}for(let p=1;p<255;p++)s.push(d[0]+"."+d[1]+"."+d[2]+"."+p)}if(!s.length){e(!1);return}let o=0,a=0,c=!1,h={};function l(){for(;a<48&&o<s.length;)u(s[o++]);!a&&o>=s.length&&!c&&(c=!0,e(!0))}function u(f){a++;let d=!1,p,y=function(){if(!d){d=!0,a--;try{p.close()}catch{}l()}};try{p=new WebSocket("ws://"+(f.indexOf(":")<0?f+":"+Pf:f)+"/probe")}catch{d=!0,a--;return}let m=setTimeout(y,1300);p.onmessage=function(g){let v=String(g.data);if(v.indexOf("senda|")===0&&!h[f]){h[f]=1;let T=v.split("|");i({ip:f,name:T[1]||"Sala",n:+T[2]||0})}clearTimeout(m),y()},p.onerror=function(){clearTimeout(m),y()},p.onclose=function(){clearTimeout(m),y()}}l()}var Wl=class{constructor(e,t,n,s,r){this.tr=e,this.cb=r,this.lobby={mode:t,code:n,teams:s.teams,diff:s.diff,gmode:s.mode===0?0:1,players:[{id:0,name:s.name,cls:s.cls,team:0,slot:0,host:!0}]},this.ids={},this.nextId=1,this.seen={},this.started=!1,this.ninjaOf={};let o=this;e.onJoin=function(){},e.onLeave=function(a){o.drop(a)},e.onMsg=function(a,c){o.recv(a,c)},e.onDown=function(){o.cb.down&&o.cb.down()},this.timer=setInterval(function(){o.sweep()},2e3)}player(e){let t=this.lobby.players;for(let n=0;n<t.length;n++)if(t[n].id===e)return t[n];return null}taken(e,t){let n=this.lobby.players;for(let s=0;s<n.length;s++)if(n[s].team===e&&n[s].slot===t)return!0;return!1}freeSlot(){for(let e=0;e<this.lobby.teams;e++)for(let t=0;t<3;t++)if(!this.taken(e,t))return{team:e,slot:t};return null}recv(e,t){let n;try{n=JSON.parse(t)}catch{return}if(!Array.isArray(n))return;this.seen[e]=Date.now();let s=this.ids[e],r=n[0];if(r==="hello"){if(s!=null)return;if(n[1]!==5){this.tr.send(e,JSON.stringify(["no","ver"]));return}if(this.started){this.tr.send(e,JSON.stringify(["no","busy"]));return}let a=this.freeSlot();if(!a){this.tr.send(e,JSON.stringify(["no","full"]));return}let c=this.nextId++;this.ids[e]=c;let h=String(n[2]||"Ninja").replace(/[<>&"]/g,"").slice(0,12)||"Ninja",l=2,u=h;for(;this.lobby.players.some(function(f){return f.name===h});)h=u.slice(0,10)+l++;this.lobby.players.push({id:c,name:h,cls:(n[3]|0)%3,team:a.team,slot:a.slot,host:!1}),this.tr.send(e,JSON.stringify(["welcome",c,this.lobby])),this.sync();return}if(s==null)return;if(r==="p"){this.tr.send(e,JSON.stringify(["p",n[1]]));return}if(r==="i"||r==="a"){let a=this.ninjaOf[s];this.started&&a!=null&&this.cb.input&&this.cb.input(a,n);return}if(this.started)return;let o=this.player(s);o&&(r==="slot"?this.setSlot(s,n[1]|0,n[2]|0):r==="cls"&&(o.cls=(n[1]|0)%3,this.sync()))}setSlot(e,t,n){let s=this.player(e);!s||t<0||t>=this.lobby.teams||n<0||n>2||this.taken(t,n)||(s.team=t,s.slot=n,this.sync())}setCls(e,t){let n=this.player(e);n&&(n.cls=t,this.sync())}setOpt(e,t,n){if(this.lobby.diff=t,(n===0||n===1)&&(this.lobby.gmode=n),e!==this.lobby.teams){this.lobby.teams=e;let s=this.lobby.players;for(let r=0;r<s.length;r++)s[r].team>=e&&(s[r].team=-1);for(let r=0;r<s.length;r++)if(s[r].team<0){let o=this.freeSlot();o&&(s[r].team=o.team,s[r].slot=o.slot)}for(let r=s.length-1;r>=0;r--)if(s[r].team<0){let o=s[r];s.splice(r,1);for(let a in this.ids)this.ids[a]===o.id&&(this.tr.send(a,JSON.stringify(["no","full"])),this.tr.kick(a),delete this.ids[a])}}this.sync()}sync(){this.tr.broadcast(JSON.stringify(["lobby",this.lobby])),this.cb.lobby&&this.cb.lobby(this.lobby)}drop(e){let t=this.ids[e];if(t==null)return;delete this.ids[e],delete this.seen[e];let n=this.lobby.players;for(let s=0;s<n.length;s++)if(n[s].id===t){n.splice(s,1);break}if(this.started){let s=this.ninjaOf[t];s!=null&&this.cb.left&&this.cb.left(s),delete this.ninjaOf[t]}this.sync()}sweep(){let e=Date.now();for(let t in this.ids)this.seen[t]&&e-this.seen[t]>9e3&&(this.tr.kick(t),this.drop(t))}start(){let e=this.lobby,t=Math.random()*2147483647|0,n=e.players.map(function(o){return{team:o.team,slot:o.slot,cls:o.cls,name:o.name,owner:o.id}}),s=la(e.teams,n,Mi(t^119),Zo);this.started=!0,this.ninjaOf={};for(let o=0;o<s.length;o++)s[o].bot||(this.ninjaOf[s[o].owner]=s[o].id);let r={seed:t,teams:e.teams,diff:e.diff,mode:e.gmode,roster:s};for(let o in this.ids){let a=this.ninjaOf[this.ids[o]];this.tr.send(o,JSON.stringify(["start",{seed:t,teams:e.teams,diff:e.diff,mode:e.gmode,roster:s,you:a}]))}return{seed:r.seed,teams:r.teams,diff:r.diff,mode:r.mode,roster:s,you:this.ninjaOf[0]}}snap(e){this.tr.broadcast(JSON.stringify(e))}hasRemotes(){for(let e in this.ids)return!0;return!1}backToLobby(){this.started=!1,this.ninjaOf={},this.tr.broadcast(JSON.stringify(["back"])),this.sync()}close(){clearInterval(this.timer);try{this.tr.broadcast(JSON.stringify(["bye"]))}catch{}let e=this.tr;setTimeout(function(){e.close()},150)}},Xl=class{constructor(e,t,n){this.tr=e,this.cb=n,this.id=null,this.lobby=null,this.ping=null,this.closed=!1;let s=this;e.onMsg=function(r){s.recv(r)},e.onClose=function(){!s.closed&&s.cb.closed&&s.cb.closed("lost")},this.send(["hello",5,t.name,t.cls]),this.timer=setInterval(function(){s.send(["p",Date.now()%1e6])},2e3)}recv(e){let t;try{t=JSON.parse(e)}catch{return}if(!Array.isArray(t)){t&&t.k==="s"&&this.cb.snap&&this.cb.snap(t);return}let n=t[0];if(n==="welcome")this.id=t[1],this.lobby=t[2],this.cb.lobby&&this.cb.lobby(this.lobby,this.id);else if(n==="lobby")this.lobby=t[1],this.cb.lobby&&this.id!=null&&this.cb.lobby(this.lobby,this.id);else if(n==="start")this.cb.start&&this.cb.start(t[1]);else if(n==="back")this.cb.back&&this.cb.back();else if(n==="p"){let s=Date.now()%1e6-t[1];s<0&&(s+=1e6),this.ping=s}else n==="no"?(this.closed=!0,this.cb.closed&&this.cb.closed(t[1]),this.tr.close()):n==="bye"&&(this.closed=!0,this.cb.closed&&this.cb.closed("bye"),this.tr.close())}send(e){this.tr.send(JSON.stringify(e))}close(){this.closed=!0,clearInterval(this.timer),this.tr.close()}};var wS="1.2",qm=Wm(),CS=/iPhone|iPad|iPod/.test(navigator.userAgent||"")||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,jm="sendaNinja.v1";function Mr(i){return document.getElementById(i)}var rt={name:"",cls:0,diff:1,teams:4,mode:1,sfx:!0,music:!0,hq:!0};try{let i=window.localStorage.getItem(jm);if(i){let e=JSON.parse(i);for(let t in rt)e[t]!=null&&typeof e[t]==typeof rt[t]&&(rt[t]=e[t])}}catch{}rt.name||(rt.name="Ninja"+(100+Math.floor(Math.random()*900)));rt.cls=gt(rt.cls|0,0,2);rt.diff=gt(rt.diff|0,0,2);rt.teams=gt(rt.teams|0,2,4);rt.mode=rt.mode===0?0:1;function RS(){try{window.localStorage.setItem(jm,JSON.stringify(rt))}catch{}}var PS=Mr("c"),Bt=null;try{Bt=new _l(PS)}catch(i){throw document.body.innerHTML='<div style="padding:30px;font:16px sans-serif;color:#fff">Este celular no pudo iniciar los gr\xE1ficos 3D (WebGL). Actualiza "WebView del sistema Android" desde Play Store e int\xE9ntalo de nuevo.</div>',i}var tn=new yl,jn=new xl;jn.attach(Mr("joy"),Mr("joyB"),Mr("joyK"),document.querySelectorAll(".ab"));var Kt="menu",Dn=null,at=null,$e=null,Nn=!1,En=!1,ai=!1,ws=!1,as=null,os=0,IS=null,Lf=null;function Jm(){tn.setSfx(rt.sfx),tn.setMusic(rt.music),Yl=1,Bt.setQuality(rt.hq?1:.7)}var Ce=new vl({click:function(){tn.unlock(),tn.play("click")},sound:function(i){tn.play(i)},save:RS,applySettings:Jm,back:function(i){i==="lan"?Ce.show("mp",{lanOk:Sr()}):Ce.show("title")},solo:Ym,host:DS,join:NS,lanScan:US,lobbySlot:function(i,e){$e&&(En?$e.setSlot(0,i,e):$e.send(["slot",i,e]))},lobbyCls:function(i){$e&&(En?$e.setCls(0,i):$e.send(["cls",i]))},lobbyOpt:function(){$e&&En&&$e.setOpt(rt.teams,rt.diff,rt.mode)},start:function(){$e&&En&&Kt==="lobby"&&Ff($e.start())},again:function(){Nn?Ym():En&&$e&&(Wo(),$e.backToLobby(),Xo($e.lobby,0))},leave:Df,pause:function(){Kt==="game"&&!ws&&(ai=!0,jn.reset(),Ce.data.solo=Nn,Ce.showOverlay("pause"))},resume:function(){ai=!1,Ce.hide()}},rt);function Zm(){let i=wr(20261);Bt.buildWorld(i,4);let e=[],t=[[-2.2,1.6,.9],[0,2.4,3.14],[2.2,1.6,-.9],[-2.4,-1.2,1.9],[0,-2.2,0],[2.4,-1.2,-1.9]];for(let n=0;n<6;n++)e.push({id:n,team:n<3?0:1,slot:n%3,cls:n%3,name:"",bot:!0});Bt.buildMatch(e,2,-1),Lf={ninjas:e.map(function(n,s){return{id:s,team:n.team,cls:n.cls,x:48+t[s][0],z:48+t[s][1],f:t[s][2],hp:100,st:Me,fl:0,cM:0,cS:0,cX:0,cH:0,cD:0,moving:!1,hidden:!1}}),scrolls:[{kind:0,carrier:1,x:48,z:48+2.4},{kind:1,carrier:4,x:48,z:48-2.2}],proj:[],areas:[],food:255,zone:{r:J.ZONE_R0,to:J.ZONE_R0,timer:0,shrinking:!1,stage:0},deliver:[0,0],events:[],stars:[],items:[],mode:0,sealed:!1,lastLife:!1}}function Jl(i,e){Kt="menu",jn.enabled=!1,jn.reset(),Ce.hudStop(),Zm(),tn.setMood(0),Ce.show(i||"title",e)}function Ff(i){as&&(clearTimeout(as),as=null),IS=i,ws=!1,ai=!1;let e;if(En||Nn){Dn=new ca(i);let t=i.you;e=function(n){Dn.input(t,n)},at=new Cr(i,e,.075),Dn.onSnap=function(n){at.onSnap(n),$e&&$e.hasRemotes()&&$e.snap(n)}}else Dn=null,e=function(t){$e&&$e.send(t)},at=new Cr(i,e,.13);Bt.buildWorld(at.map,i.teams),Bt.buildMatch(i.roster,i.teams,i.you),Bt.cam.x=at.p.x,Bt.cam.z=at.p.z,os=i.you,Ce.hide(),Ce.hudStart(at,i.roster,i.teams),jn.reset(),jn.enabled=!0,Kt="game",tn.setMood(1)}function Wo(){as&&(clearTimeout(as),as=null),Dn=null,at=null,ws=!1,ai=!1,jn.enabled=!1,jn.reset(),Ce.hudStop()}function Ym(){$e&&($e.close(),$e=null),Nn=!0,En=!1;let i=Math.random()*2147483647|0,e=Mi(i^119),t=Math.floor(Math.random()*rt.teams),n=la(rt.teams,[{team:t,slot:0,cls:rt.cls,name:rt.name,owner:0}],e,Zo);Ff({seed:i,teams:rt.teams,diff:rt.diff,mode:rt.mode,roster:n,you:t*3})}function LS(){if(as=null,Kt!=="game"||!at||!at.view.end)return;let i=at.view.end,e=at.start;jn.enabled=!1,jn.reset(),Ce.hudStop(),tn.setMood(0),tn.play(i.winner===at.myTeam?"win":"lose"),Ce.show("results",{end:i,roster:e.roster,myTeam:at.myTeam,me:at.me,canAgain:Nn||En,solo:Nn,mode:at.mode})}function Df(){$e&&($e.close(),$e=null),Wo(),Nn=!1,En=!1,Jl("title")}var Nf={ver:"Esa sala usa otra versi\xF3n del juego. Todos deben instalar la misma APK.",busy:"Esa sala ya empez\xF3 la partida. Espera a que termine.",full:"La sala est\xE1 llena.",bye:"El anfitri\xF3n cerr\xF3 la sala.",lost:"Se perdi\xF3 la conexi\xF3n con el anfitri\xF3n."};function $m(i,e){let t=i&&(i.type||i.message);return t==="peer-unavailable"?"No existe una sala con ese c\xF3digo. Rev\xEDsalo e int\xE9ntalo otra vez.":t==="nolan"?"El modo Wi-Fi local solo funciona dentro de la app instalada.":t==="lanws"||t==="badaddr"?e?"No se pudo abrir la sala local.":"No se pudo conectar con esa direcci\xF3n. \xBFEst\xE1n en el mismo Wi-Fi?":t==="timeout"||t==="closed"?e?"No hubo respuesta del servicio de salas. Revisa tu conexi\xF3n e int\xE9ntalo otra vez.":"No se logr\xF3 conectar con el anfitri\xF3n. Algunas redes (sobre todo datos m\xF3viles) bloquean la conexi\xF3n directa: prueben con otro Wi-Fi o con el modo Wi-Fi local.":t==="network"||t==="server-error"||t==="socket-error"||t==="socket-closed"?"No se pudo contactar el servicio de salas por internet. Int\xE9ntalo m\xE1s tarde o usen Wi-Fi local.":t==="browser-incompatible"||t==="webrtc"?"Este celular no pudo abrir la conexi\xF3n directa. Prueben el modo Wi-Fi local.":(e?"No se pudo crear la sala":"No se pudo entrar a la sala")+" ("+(t||"error")+")."}function Xo(i,e){Kt==="game"&&(Zm(),tn.setMood(0)),Kt="lobby";let t=Ce.name==="lobby"?Ce.data:{};Ce.show("lobby",{lobby:i,myId:e,isHost:En,msg:t.msg,err:t.err})}function DS(i){if($e)return;Ce.msg(i==="net"?"Creando sala por internet\u2026":"Abriendo sala en el Wi-Fi\u2026");let e=i==="net"?new zl:new Gl;(i==="net"?e.open():e.open(rt.name)).then(function(n){if(Ce.name!=="mp"){e.close();return}Nn=!1,En=!0,$e=new Wl(e,i,n,rt,{lobby:function(s){Kt==="lobby"&&Xo(s,0)},input:function(s,r){Dn&&Dn.input(s,r)},left:function(s){Dn&&Dn.toBot(s)},down:function(){Kt==="lobby"&&Ce.msg("Se cort\xF3 la conexi\xF3n con el servicio de salas. Los que ya entraron siguen conectados.",!0)}}),Xo($e.lobby,0)}).catch(function(n){Ce.msg($m(n,!0),!0)})}function NS(i,e){if($e)return;if(i==="net"&&(!e||e.length<4)){Ce.msg("Escribe el c\xF3digo de la sala.",!0);return}if(i==="lan"&&!e){Ce.msg("Escribe la direcci\xF3n del anfitri\xF3n.",!0);return}Ce.msg("Conectando\u2026");let t=Ce.name,n=i==="net"?new Hl:new Vl;n.connect(e).then(function(){if(Ce.name!==t){n.close();return}Nn=!1,En=!1,$e=new Xl(n,rt,{lobby:function(s,r){Kt!=="game"&&Xo(s,r)},start:function(s){Ff(s)},snap:function(s){at&&Kt==="game"&&at.onSnap(s)},back:function(){Wo(),$e&&$e.lobby&&Xo($e.lobby,$e.id)},closed:function(s){$e=null,Wo(),Jl("mp",{lanOk:Sr(),msg:Nf[s]||Nf.lost,err:!0})}})}).catch(function(s){Ce.msg($m(s,!1),!0)})}function US(){Ce.name==="lan"&&(Ce.data.found=[],Ce.data.scanning=!0,Ce.data.msg="",Ce.render(),Xm(function(i){Ce.name==="lan"&&(Ce.data.found.push(i),Ce.render())},function(i){Ce.name==="lan"&&(Ce.data.scanning=!1,i||(Ce.data.msg="No se detect\xF3 una red Wi-Fi. Escribe la direcci\xF3n que muestra el anfitri\xF3n.",Ce.data.err=!1),Ce.render())}))}var Uf=performance.now(),ql=0,If=0,Yl=1,jl={x:0,z:0};function Of(i,e){let t=i-jl.x,n=e-jl.z;return gt(1.15-Math.sqrt(t*t+n*n)/15,0,1)}Bt.onCue=function(i,e,t){if(Kt!=="game")return;let n=at&&t===at.me;tn.play(i,(n?1:.7)*Of(e.x,e.z))};function OS(i){if(i.ninjas[at.me].st!==Vt)return at.me;let t=i.ninjas[os];if(t&&os!==at.me&&t.st===Me&&(t.team===at.myTeam||!FS(i)))return os;for(let n=0;n<i.ninjas.length;n++)if(i.ninjas[n].team===at.myTeam&&i.ninjas[n].st!==Vt)return n;for(let n=0;n<i.ninjas.length;n++)if(i.ninjas[n].st===Me)return n;return at.me}function FS(i){for(let e=0;e<i.ninjas.length;e++)if(i.ninjas[e].team===at.myTeam&&i.ninjas[e].st!==Vt)return!0;return!1}var kS=0;function Zl(i){if(kS++>=3)return;let e=Mr("errbox");e||(e=document.createElement("div"),e.id="errbox",e.style.cssText="position:absolute;left:8px;right:8px;bottom:8px;z-index:99;background:rgba(120,20,20,.92);color:#fff;font:12px/1.35 monospace;padding:8px 10px;border-radius:8px;pointer-events:none;white-space:pre-wrap;word-break:break-word",document.body.appendChild(e)),e.textContent=`Error del juego (cu\xE9ntaselo a quien te pas\xF3 la app):
`+String(i).slice(0,300),e.style.display="block",setTimeout(function(){e.style.display="none"},12e3)}window.addEventListener("error",function(i){Zl((i&&i.message?i.message:"error")+(i&&i.lineno?" @"+i.lineno+":"+i.colno:""))});window.addEventListener("unhandledrejection",function(i){Zl("promesa: "+(i&&i.reason&&i.reason.message?i.reason.message:i&&i.reason))});function Km(i){requestAnimationFrame(Km);try{BS(i)}catch(e){Zl((e&&e.message?e.message:e)+(e&&e.stack?`
`+String(e.stack).split(`
`).slice(1,3).join(`
`):"")),window.console&&console.error(e)}}function BS(i){(window.innerWidth!==Bt.w||window.innerHeight!==Bt.h)&&$l();let e=(i-Uf)/1e3;if(Uf=i,e>0||(e=.016),e>.1&&(e=.1),Kt==="game"&&at){let t=ai&&Nn;Dn&&!t&&Dn.advance(e);let n=jn.read();ai&&(n.mx=0,n.mz=0,n.melee=!1,n.shuriken=!1,n.dash=!1,n.special=!1);let s=at.frame(t?0:e,n);os=OS(s);let r=s.ninjas[os];jl.x=r.x,jl.z=r.z;for(let h=0;h<s.events.length;h++){let l=s.events[h];Bt.event(l,s);let u=Ce.hudEvent(l,s,Bt);if(u){let f=1;l[0]==="fx"?f=Of(l[2]/100,l[3]/100):typeof l[1]=="number"&&s.ninjas[l[1]]&&(l[0]==="hit"||l[0]==="down"||l[0]==="food"||l[0]==="pick"||l[0]==="drop"||l[0]==="rev"||l[0]==="pw"||l[0]==="shield"||l[0]==="star")&&(f=Of(s.ninjas[l[1]].x,s.ninjas[l[1]].z),(l[0]==="pick"||l[0]==="drop")&&(f=Math.max(f,.35))),tn.play(u,f)}}let o=s.sealed,c=s.ninjas[at.me].st===Me&&s.phase===1?at.autoAim(10.2,!0):null;if(Bt.update(s,t?0:e,os,{sealed:o,target:c,objective:Ce.objective}),Ce.hudUpdate(s,Bt,e,os,$e&&!En?$e.ping:null),tn.setMood(s.phase===1&&(s.mode===1||!o)?2:1),s.end&&!ws&&(ws=!0,as=setTimeout(LS,2200)),!Dn&&s.stale>12&&$e){let h=$e;$e=null,h.close(),Wo(),Jl("mp",{lanOk:Sr(),msg:Nf.lost,err:!0})}}else Lf&&Bt.update(Lf,e,-1,{orbit:!0,sealed:!1});if(Bt.render(),ql+=e,If++,ql>=3){let t=If/ql;ql=0,If=0,(t<26||t>=34&&t<46)&&Yl>.55&&!document.hidden&&(Yl*=.82,Bt.setQuality((rt.hq?1:.7)*Yl))}}function $l(){let i=window.innerWidth,e=window.innerHeight;if(!(i>0&&e>0))return;Bt.resize(i,e,window.devicePixelRatio||1);let t=(navigator.maxTouchPoints||0)>0;Mr("rot").classList.toggle("hide",!(t&&i>e&&e<520))}window.addEventListener("resize",$l);window.addEventListener("orientationchange",function(){setTimeout($l,200)});document.addEventListener("visibilitychange",function(){document.hidden?(tn.suspend(),Kt==="game"&&Nn&&!ws&&!ai&&(ai=!0,Ce.data.solo=!0,Ce.showOverlay("pause"))):(tn.resume(),Uf=performance.now())});document.addEventListener("pointerdown",function(){tn.unlock()},!0);["pointerup","touchend","click","keydown"].forEach(function(i){document.addEventListener(i,function(){tn.unlock()},!0)});document.addEventListener("gesturestart",function(i){i.preventDefault()});document.addEventListener("dblclick",function(i){i.preventDefault()});document.addEventListener("touchmove",function(i){Kt==="game"&&!Ce.overlay&&Ce.name!=="results"&&i.preventDefault()},{passive:!1});document.addEventListener("contextmenu",function(i){i.preventDefault()});document.addEventListener("focusout",function(){setTimeout(function(){window.scrollTo(0,0)},60)});window.onAndroidBack=function(){return Kt==="game"?(Ce.overlay==="phelp"?Ce.showOverlay("pause"):ai?(ai=!1,Ce.hide()):Ce.name==="results"?Df():(ai=!0,jn.reset(),Ce.data.solo=Nn,Ce.showOverlay("pause")),"ok"):Kt==="lobby"?(Df(),"ok"):Ce.name&&Ce.name!=="title"?(Ce.name==="lan"?Ce.show("mp",{lanOk:Sr()}):Ce.show("title"),"ok"):"exit"};var zS=Ce.show.bind(Ce);Ce.show=function(i,e){i==="mp"&&(e=e||{},e.lanOk=Sr(),e.env=qm),i==="title"&&(e=e||{},e.iosTip=qm==="web"&&CS&&!window.navigator.standalone),i==="opts"&&(e=e||{},e.ver=wS+" \xB7 red "+5),zS(i,e)};Jm();$l();Jl("title");requestAnimationFrame(Km);window.__senda={state:function(){return{mode:Kt,screen:Ce.name,overlay:Ce.overlay,solo:Nn,isHost:En,ended:ws}},client:function(){return at},host:function(){return Dn},session:function(){return $e},settings:rt,rend:Bt,reportError:Zl};})();
