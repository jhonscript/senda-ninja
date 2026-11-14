(()=>{var $m=Object.create;var Yl=Object.defineProperty;var Km=Object.getOwnPropertyDescriptor;var Qm=Object.getOwnPropertyNames;var e0=Object.getPrototypeOf,t0=Object.prototype.hasOwnProperty;var n0=(i,e)=>()=>{try{return e||i((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},Wo=(i,e)=>{for(var t in e)Yl(i,t,{get:e[t],enumerable:!0})},i0=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Qm(e))!t0.call(i,s)&&s!==t&&Yl(i,s,{get:()=>e[s],enumerable:!(n=Km(e,s))||n.enumerable});return i};var Vf=(i,e,t)=>(t=i!=null?$m(e0(i)):{},i0(e||!i||!i.__esModule?Yl(t,"default",{value:i,enumerable:!0}):t,i));var lf=n0((SE,cf)=>{"use strict";var ne={};ne.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)};ne.localCName=ne.generateIdentifier();ne.splitLines=function(i){return i.trim().split(`
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
`),e};ne.parseRtpParameters=function(i){let e={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},n=ne.splitLines(i)[0].split(" ");e.profile=n[2];for(let r=3;r<n.length;r++){let o=n[r],c=ne.matchPrefix(i,"a=rtpmap:"+o+" ")[0];if(c){let a=ne.parseRtpMap(c),l=ne.matchPrefix(i,"a=fmtp:"+o+" ");switch(a.parameters=l.length?ne.parseFmtp(l[0]):{},a.rtcpFeedback=ne.matchPrefix(i,"a=rtcp-fb:"+o+" ").map(ne.parseRtcpFb),e.codecs.push(a),a.name.toUpperCase()){case"RED":case"ULPFEC":e.fecMechanisms.push(a.name.toUpperCase());break;default:break}}}ne.matchPrefix(i,"a=extmap:").forEach(r=>{e.headerExtensions.push(ne.parseExtmap(r))});let s=ne.matchPrefix(i,"a=rtcp-fb:* ").map(ne.parseRtcpFb);return e.codecs.forEach(r=>{s.forEach(o=>{r.rtcpFeedback.find(a=>a.type===o.type&&a.parameter===o.parameter)||r.rtcpFeedback.push(o)})}),e};ne.writeRtpDescription=function(i,e){let t="";t+="m="+i+" ",t+=e.codecs.length>0?"9":"0",t+=" "+(e.profile||"UDP/TLS/RTP/SAVPF")+" ",t+=e.codecs.map(s=>s.preferredPayloadType!==void 0?s.preferredPayloadType:s.payloadType).join(" ")+`\r
`,t+=`c=IN IP4 0.0.0.0\r
`,t+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,e.codecs.forEach(s=>{t+=ne.writeRtpMap(s),t+=ne.writeFmtp(s),t+=ne.writeRtcpFb(s)});let n=0;return e.codecs.forEach(s=>{s.maxptime>n&&(n=s.maxptime)}),n>0&&(t+="a=maxptime:"+n+`\r
`),e.headerExtensions&&e.headerExtensions.forEach(s=>{t+=ne.writeExtmap(s)}),t};ne.parseRtpEncodingParameters=function(i){let e=[],t=ne.parseRtpParameters(i),n=t.fecMechanisms.indexOf("RED")!==-1,s=t.fecMechanisms.indexOf("ULPFEC")!==-1,r=ne.matchPrefix(i,"a=ssrc:").map(h=>ne.parseSsrcMedia(h)).filter(h=>h.attribute==="cname"),o=r.length>0&&r[0].ssrc,c,a=ne.matchPrefix(i,"a=ssrc-group:FID").map(h=>h.substring(17).split(" ").map(f=>parseInt(f,10)));a.length>0&&a[0].length>1&&a[0][0]===o&&(c=a[0][1]),t.codecs.forEach(h=>{if(h.name.toUpperCase()==="RTX"&&h.parameters.apt){let u={ssrc:o,codecPayloadType:parseInt(h.parameters.apt,10)};o&&c&&(u.rtx={ssrc:c}),e.push(u),n&&(u=JSON.parse(JSON.stringify(u)),u.fec={ssrc:o,mechanism:s?"red+ulpfec":"red"},e.push(u))}}),e.length===0&&o&&e.push({ssrc:o});let l=ne.matchPrefix(i,"b=");return l.length&&(l[0].indexOf("b=TIAS:")===0?l=parseInt(l[0].substring(7),10):l[0].indexOf("b=AS:")===0?l=parseInt(l[0].substring(5),10)*1e3*.95-2e3*8:l=void 0,e.forEach(h=>{h.maxBitrate=l})),e};ne.parseRtcpParameters=function(i){let e={},t=ne.matchPrefix(i,"a=ssrc:").map(r=>ne.parseSsrcMedia(r)).filter(r=>r.attribute==="cname")[0];t&&(e.cname=t.value,e.ssrc=t.ssrc);let n=ne.matchPrefix(i,"a=rtcp-rsize");e.reducedSize=n.length>0,e.compound=n.length===0;let s=ne.matchPrefix(i,"a=rtcp-mux");return e.mux=s.length>0,e};ne.writeRtcpParameters=function(i){let e="";return i.reducedSize&&(e+=`a=rtcp-rsize\r
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
`};ne.getDirection=function(i,e){let t=ne.splitLines(i);for(let n=0;n<t.length;n++)switch(t[n]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return t[n].substring(2);default:}return e?ne.getDirection(e):"sendrecv"};ne.getKind=function(i){return ne.splitLines(i)[0].split(" ")[0].substring(2)};ne.isRejected=function(i){return i.split(" ",2)[1]==="0"};ne.parseMLine=function(i){let t=ne.splitLines(i)[0].substring(2).split(" ");return{kind:t[0],port:parseInt(t[1],10),protocol:t[2],fmt:t.slice(3).join(" ")}};ne.parseOLine=function(i){let t=ne.matchPrefix(i,"o=")[0].substring(2).split(" ");return{username:t[0],sessionId:t[1],sessionVersion:parseInt(t[2],10),netType:t[3],addressType:t[4],address:t[5]}};ne.isValidSDP=function(i){if(typeof i!="string"||i.length===0)return!1;let e=ne.splitLines(i);for(let t=0;t<e.length;t++)if(e[t].length<2||e[t].charAt(1)!=="=")return!1;return!0};typeof cf=="object"&&(cf.exports=ne)});var Ms=.03333333333333333,Wf=2,gt=[{name:"Grulla",color:15026253,css:"#ef5a5f"},{name:"Carpa",color:3900150,css:"#5b9bff"},{name:"Mantis",color:4176208,css:"#4cc764"},{name:"B\xFAho",color:16098596,css:"#f7b23b"}],kt=[{name:"Brasa",role:"Ataque",spec:"Estallido",cd:9,color:16742959,css:"#ff8a3d",desc:"Lanza una bola de fuego que explota y deja ardiendo a los rivales."},{name:"Marea",role:"Apoyo",spec:"Manantial",cd:12,color:3720948,css:"#4fd0ff",desc:"Cura a todo tu equipo cercano y limpia quemaduras y enredos."},{name:"Ra\xEDz",role:"Control",spec:"Zarza",cd:10,color:10212938,css:"#a8e05a",desc:"Hace brotar zarzas que atrapan y frenan a los rivales."}],Yn=[{name:"Sol",color:16762941,css:"#ffcf4a"},{name:"Luna",color:12175615,css:"#c3d0ff"}],Y={HP:100,SPEED:5,RADIUS:.34,OBST_R:.4,MELEE_R:1.8,MELEE_ARC:1,MELEE_DMG:14,MELEE_CD:.42,LUNGE:.45,SH_DMG:9,SH_SPEED:17,SH_TTL:.62,SH_MAX:3,SH_RECH:2.2,SH_HIT:.5,DASH_T:.16,DASH_MULT:3.4,DASH_INV:.26,DASH_CD:4.5,SPEC_RANGE:7.5,FIRE_T:.45,FIRE_R:2.3,FIRE_DMG:24,BURN_T:3,BURN_DPS:4,HEAL_R:3.6,HEAL_AMT:32,SEED_T:.4,BRAMBLE_R:2.3,BRAMBLE_T:4.5,BRAMBLE_DMG:7,ROOT_T:1.4,SLOW_MULT:.55,DOWN_T:18,DOWN_EARLY:8,RESPAWN_INV:2.5,REVIVE_T:2.6,REVIVE_R:1.5,REVIVE_HP:45,REVIVE_INV:1.2,REGEN_DELAY:6,REGEN:2,PICK_R:.95,FOOD_HP:40,FOOD_RESPAWN:25,SHRINE_R:3.4,PLAZA_R:6.5,DELIVER_T:6,VIEW:11,BUSH_SEE:2.3,REVEAL_T:1.1,COUNTDOWN:4,ZONE_R0:72},_i=[{wait:90,shrink:35,r:44,dps:4},{wait:20,shrink:28,r:28,dps:6},{wait:20,shrink:25,r:15,dps:9},{wait:20,shrink:22,r:6.5,dps:12},{wait:22,shrink:22,r:.5,dps:18}],gr=[{name:"F\xE1cil",react:.5,aim:.32,dmg:.55,special:.35,dash:.2},{name:"Normal",react:.3,aim:.17,dmg:.8,special:.7,dash:.5},{name:"Dif\xEDcil",react:.16,aim:.07,dmg:1,special:1,dash:.85}],Xo=["Aki","Ren","Taro","Mika","Nao","Daigo","Kaede","Jin","Goro","Emi","Riku","Suzu","Tetsu","Kohaku","Asahi","Kenta","Toma","Ryu","Noa","Yori","Isamu","Momo","Kiyo","Hiro","Yuna","Reo","Kazu","Mai","Eiji","Fumi","Nori","Saki","Tomo","Umi"],Ne=0,nn=1,qt=2,qo=1,Yo=2,bs=4,jo=8,Jo=16,Ts=32,Zo=64;function xi(i){let e=i>>>0;return function(){e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Es(i,e){let t=i-e;for(;t>Math.PI;)t-=2*Math.PI;for(;t<-Math.PI;)t+=2*Math.PI;return t}function _t(i,e,t){return i<e?e:i>t?t:i}var xr=0,os=1,yi=2,jn=3,ri=4,oi=5,as=6,yr=7,_n=8,Bn=9,s0=.8,It=96/2,_r=11,Xf=5.2,qf=21,Yf=31;function Fi(i){return i===jn||i===ri||i===oi||i===_n||i===Bn}function jl(i,e,t){for(;t>0;t--){let n=96-e;e=i,i=n}return{x:i,z:e}}function Jl(i,e,t,n){let s=e,r=t;for(let o=0;o<4;o++){i[r*96+s]=n;let c=95-r;r=s,s=c}}function Zl(i,e){let t=e+1,n=new Float32Array(t*t);for(let s=0;s<n.length;s++)n[s]=i();return function(s,r){let o=_t(s,0,1)*e,c=_t(r,0,1)*e,a=Math.floor(o),l=Math.floor(c);a>=e&&(a=e-1),l>=e&&(l=e-1);let h=o-a,u=c-l,f=h*h*(3-2*h),d=u*u*(3-2*u),p=n[l*t+a],y=n[l*t+a+1],m=n[(l+1)*t+a],g=n[(l+1)*t+a+1];return p+(y-p)*f+(m-p)*d+(p-y-m+g)*f*d}}function vr(i){let e=xi(i),t=new Uint8Array(9216),n=new Uint8Array(9216),s=xi((i^5369127)>>>0);for(let m=0;m<n.length;m++)n[m]=s()*256|0;let r=Zl(e,6),o=Zl(e,7),c=Zl(e,8),a=new Float32Array(It+2);{let m=0;for(let g=0;g<a.length;g++){m+=(e()-.5)*1.1,m=_t(m,-3.2,3.2);let S=_t((g-15)/5,0,1)*_t((42-g)/5,0,1);a[g]=m*S}}for(let m=0;m<It;m++)for(let g=0;g<It;g++){let S=It-(g+.5),A=It-(m+.5),v=Math.sqrt(S*S+A*A),b=g/(It-1),M=m/(It-1),_=g+.5-_r,x=m+.5-_r,E=Math.sqrt(_*_+x*x),C=g+m>>1,P=Math.round(a[C]),I=Math.abs(g-m-P)<=1&&C>=_r-1,O=_t(Math.min(S,A)/7,0,1),L=qf+(r(b,M)-.5)*5*O,U=Math.abs(v-L)<1.3,k=(g>=It-2||m>=It-2)&&v<Yf+1,W=Math.abs(v-Yf)<1.15,ee=e(),V=e(),q=xr;if(g<3||m<3)q=_n;else if(v<Y.PLAZA_R)q=yr;else if(U)q=I||k?as:oi;else if(E<Xf)q=os;else if(I||k||W)q=os;else{let te=o(b,M),ue=c(b,M),Pe=v<qf-2.5,J=v<10.5,ge=E<Xf+1.5,Me=Math.abs(v-L)<2.4;if(!J&&!ge){let Re=te>.62?.42:te>.48?.17:.05;Pe&&(Re*=.5),Me&&(Re*=.4),(g<6||m<6)&&(Re=Math.max(Re,.55)),ee<Re?q=jn:ee<Re+(Pe?.04:.02)?q=ri:(ue>.68||ue>.6&&V<.35)&&(q=yi)}}Jl(t,g,m,q)}Jl(t,43,43,Bn),t[4174]=Bn,t[4177]=Bn;let l=[],h=[{x:38.5,z:38.5},{x:24.5,z:27.5}];for(let m=0;m<h.length;m++){let g=Math.floor(h[m].x),S=Math.floor(h[m].z);(Fi(t[S*96+g])||t[S*96+g]===yi)&&Jl(t,g,S,os);for(let A=0;A<4;A++)l.push(jl(h[m].x,h[m].z,A))}let u=[{x:10.5,z:10.5},{x:12.6,z:10.2},{x:10.2,z:12.6}],f=[],d=[];for(let m=0;m<4;m++)f.push(u.map(function(g){return jl(g.x,g.z,m)})),d.push(jl(_r,_r,m));let p=new Uint8Array(9216),y=[It*96+It];for(p[It*96+It]=1;y.length;){let m=y.pop(),g=m%96,S=m/96|0,A=[g>0?m-1:-1,g<95?m+1:-1,S>0?m-96:-1,S<95?m+96:-1];for(let v=0;v<4;v++){let b=A[v];b<0||p[b]||Fi(t[b])||(p[b]=1,y.push(b))}}for(let m=0;m<t.length;m++)!p[m]&&!Fi(t[m])&&(t[m]=jn);return{seed:i,tiles:t,vari:n,pickups:l,spawns:f,camps:d}}function As(i,e,t,n){let s=e===2?t*2:t;return i.spawns[s%4][n%3]}function Jf(i,e,t){return i.camps[(e===2?t*2:t)%4]}function Bi(i,e,t){let n=Math.floor(e),s=Math.floor(t);return n<0||s<0||n>=96||s>=96?_n:i.tiles[s*96+n]}function jf(i,e,t){let n=i.tiles;{let s=e.x-It,r=e.z-It,o=s*s+r*r,c=t+s0;if(o<c*c)if(o<1e-9)e.z=It+c;else{let a=Math.sqrt(o);e.x=It+s/a*c,e.z=It+r/a*c}}for(let s=0;s<2;s++){let r=Math.floor(e.x),o=Math.floor(e.z);for(let c=o-1;c<=o+1;c++)for(let a=r-1;a<=r+1;a++){let l=a<0||c<0||a>=96||c>=96?_n:n[c*96+a];if(l===jn||l===ri||l===Bn){let h=a+.5,u=c+.5,f=e.x-h,d=e.z-u,p=f*f+d*d,y=t+Y.OBST_R;if(p<y*y)if(p<1e-9)e.x=h+y;else{let m=Math.sqrt(p);e.x=h+f/m*y,e.z=u+d/m*y}}else if(l===oi||l===_n){let h=_t(e.x,a,a+1),u=_t(e.z,c,c+1),f=e.x-h,d=e.z-u,p=f*f+d*d;if(p<t*t)if(p>1e-9){let y=Math.sqrt(p);e.x=h+f/y*t,e.z=u+d/y*t}else{let y=e.x-a,m=a+1-e.x,g=e.z-c,S=c+1-e.z,A=Math.min(y,m,g,S);A===y?e.x=a-t:A===m?e.x=a+1+t:A===g?e.z=c-t:e.z=c+1+t}}}}}function Sr(i,e,t,n,s){let r=Math.sqrt(t*t+n*n);if(r<1e-6){jf(i,e,s);return}let o=Math.max(1,Math.ceil(r/.2)),c=t/o,a=n/o;for(let l=0;l<o;l++)e.x+=c,e.z+=a,jf(i,e,s);e.x=_t(e.x,.5,96-.5),e.z=_t(e.z,.5,96-.5)}function Ko(i,e,t,n,s){let r=n-e,o=s-t,c=Math.sqrt(r*r+o*o),a=Math.ceil(c/.3);for(let l=1;l<a;l++){let h=e+r*l/a,u=t+o*l/a,f=Bi(i,h,u);if(f===_n)return!1;if(f===jn||f===ri||f===Bn){let d=h-(Math.floor(h)+.5),p=u-(Math.floor(u)+.5);if(d*d+p*p<.2)return!1}}return!0}function $l(i,e,t,n,s){let r=n-e,o=s-t,c=Math.sqrt(r*r+o*o);if(c<1e-6)return!0;let a=Math.ceil(c/.25),l=-o/c*.36,h=r/c*.36;for(let u=0;u<=a;u++){let f=e+r*u/a,d=t+o*u/a;if(Fi(Bi(i,f,d))||Fi(Bi(i,f+l,d+h))||Fi(Bi(i,f-l,d-h)))return!1}return!0}function Mr(i,e,t){let n=Math.floor(e),s=Math.floor(t);for(let r=0;r<12;r++){let o=null,c=1e9;for(let a=s-r;a<=s+r;a++)for(let l=n-r;l<=n+r;l++){if(Math.max(Math.abs(l-n),Math.abs(a-s))!==r||l<0||a<0||l>=96||a>=96||Fi(i.tiles[a*96+l]))continue;let h=l+.5-e,u=a+.5-t,f=h*h+u*u;f<c&&(c=f,o={x:l+.5,z:a+.5})}if(o)return o}return{x:It,z:It}}var $o=class{constructor(e){this.map=e;let t=9216;this.walk=new Uint8Array(t);for(let n=0;n<t;n++)this.walk[n]=Fi(e.tiles[n])?0:1;this.g=new Float32Array(t),this.from=new Int32Array(t),this.mark=new Uint32Array(t),this.done=new Uint32Array(t),this.gen=0,this.hk=new Int32Array(t*4),this.hf=new Float32Array(t*4),this.hn=0}_push(e,t){let n=this.hk,s=this.hf,r=this.hn++;if(r>=n.length){this.hn--;return}for(;r>0;){let o=r-1>>1;if(s[o]<=t)break;n[r]=n[o],s[r]=s[o],r=o}n[r]=e,s[r]=t}_pop(){let e=this.hk,t=this.hf,n=e[0],s=--this.hn;if(s>0){let r=e[s],o=t[s],c=0;for(;;){let a=c*2+1;if(a>=s||(a+1<s&&t[a+1]<t[a]&&a++,t[a]>=o))break;e[c]=e[a],t[c]=t[a],c=a}e[c]=r,t[c]=o}return n}_free(e,t){let n=Math.floor(e),s=Math.floor(t);if(n>=0&&s>=0&&n<96&&s<96&&this.walk[s*96+n])return s*96+n;let r=Mr(this.map,e,t);return Math.floor(r.z)*96+Math.floor(r.x)}find(e,t,n,s){let r=this.walk,o=this.g,c=this.from,a=this.mark,l=this.done,h=this._free(e,t),u=this._free(n,s),f=u%96,d=u/96|0;if(h===u)return[f+.5,d+.5];let p=++this.gen;this.hn=0,o[h]=0,a[h]=p,c[h]=-1,this._push(h,0);let y=0,m=!1;for(;this.hn>0&&y++<14e3;){let v=this._pop();if(l[v]===p)continue;if(l[v]=p,v===u){m=!0;break}let b=v%96,M=v/96|0;for(let _=-1;_<=1;_++)for(let x=-1;x<=1;x++){if(!x&&!_)continue;let E=b+x,C=M+_;if(E<0||C<0||E>=96||C>=96)continue;let P=C*96+E;if(!r[P]||l[P]===p)continue;let I=x!==0&&_!==0;if(I&&(!r[M*96+E]||!r[C*96+b]))continue;let O=o[v]+(I?1.4142:1);if(a[P]!==p||O<o[P]){o[P]=O,a[P]=p,c[P]=v;let L=Math.abs(E-f),U=Math.abs(C-d),k=L>U?L+U*.4142:U+L*.4142;this._push(P,O+k*1.001)}}}if(!m)return null;let g=[],S=u;for(;S!==h&&S>=0;)g.push(S),S=c[S];let A=[];for(let v=g.length-1;v>=0;v--)A.push(g[v]%96+.5,(g[v]/96|0)+.5);return A}};function wt(i){return Math.round(i*100)}var Qo=class{constructor(e,t,n){this.map=e,this.nTeams=n.teams,this.diff=gr[n.diff==null?1:n.diff],this.rng=xi(((n.seed|0)^625341585)>>>0),this.clock=0,this.t=0,this.phase=0,this.count=Y.COUNTDOWN,this.events=[],this.nextId=1,this.ninjas=[];for(let s=0;s<t.length;s++){let r=t[s],o=As(e,this.nTeams,r.team,r.slot);this.ninjas.push({id:r.id,team:r.team,slot:r.slot,cls:r.cls,name:r.name,bot:!!r.bot,x:o.x,z:o.z,f:Math.atan2(48-o.x,48-o.z),px:o.x,pz:o.z,vx:0,vz:0,mx:0,mz:0,moving:!1,hp:Y.HP,st:Ne,downT:0,revP:0,meleeCd:0,charges:Y.SH_MAX,throwCd:0,dashCd:0,dashT:0,dashA:0,specCd:2.5,invT:0,burnT:0,burnBy:-1,burnAcc:0,rootT:0,slowT:0,revealT:0,zoneAcc:0,hurtT:-99,combatT:-99,bush:!1,cM:0,cS:0,cX:0,cH:0,cD:0,kills:0,dmg:0,revs:0})}this.teamOut=[],this.outOrder=[],this.scrolls=[];for(let s=0;s<this.nTeams;s++){this.teamOut.push(!1);let r=this.ninjas[s*3];this.scrolls.push({id:s,kind:s%2,carrier:r.id,x:r.x,z:r.z,lock:0})}this.pickups=e.pickups.map(function(s){return{x:s.x,z:s.z,on:!0,t:0}}),this.proj=[],this.areas=[],this.zone={r:Y.ZONE_R0,from:Y.ZONE_R0,to:_i[0].r,stage:0,timer:_i[0].wait,shrinking:!1,dps:_i[0].dps},this.deliver=[];for(let s=0;s<this.nTeams;s++)this.deliver.push(0);this.winner=-1}ev(e){this.events.push(e)}hunting(){return this.zone.stage===0&&!this.zone.shrinking}respawn(e){let t=As(this.map,this.nTeams,e.team,e.slot);e.x=t.x,e.z=t.z,e.px=t.x,e.pz=t.z,e.f=Math.atan2(48-t.x,48-t.z),e.st=Ne,e.hp=Y.HP,e.invT=Y.RESPAWN_INV,e.revP=0,e.downT=0,e.charges=Y.SH_MAX,e.meleeCd=0,e.dashCd=0,e.combatT=this.t,this.ev(["resp",e.id])}setHuman(e,t,n,s,r){let o=this.ninjas[e];if(!o||o.bot||o.st!==Ne||!(t>.4&&n>.4&&t<96-.4&&n<96-.4))return;let c=t-o.x,a=n-o.z;if(c*c+a*a>49)return;let l=Bi(this.map,t,n);l===oi||l===_n||(o.x=t,o.z=n,o.f=s,o.moving=!!r)}act(e,t,n,s,r){let o=this.ninjas[e];if(!o||o.st!==Ne||this.phase!==1)return!1;n!==n&&(n=o.f);let c=this.ninjas;if(t==="m"){if(o.meleeCd>.1)return!1;o.meleeCd=Y.MELEE_CD,o.f=n,o.cM++,o.revealT=Y.REVEAL_T;for(let a=0;a<c.length;a++){let l=c[a];if(l.team===o.team||l.st!==Ne)continue;let h=l.x-o.x,u=l.z-o.z,f=h*h+u*u;f>(Y.MELEE_R+.25)*(Y.MELEE_R+.25)||f>.7&&Math.abs(Es(Math.atan2(h,u),n))>Y.MELEE_ARC||this.damage(l,Y.MELEE_DMG,o,0)}return!0}if(t==="s"){if(o.charges<1||o.throwCd>.05)return!1;o.charges-=1,o.throwCd=.22,o.f=n,o.cS++,o.revealT=Y.REVEAL_T;let a=Math.sin(n),l=Math.cos(n);return this.proj.push({id:this.nextId++,kind:0,owner:o.id,team:o.team,x:o.x+a*.45,z:o.z+l*.45,vx:a*Y.SH_SPEED,vz:l*Y.SH_SPEED,ttl:Y.SH_TTL,tx:0,tz:0}),!0}if(t==="d")return o.dashCd>.1||o.rootT>0?!1:(o.dashCd=Y.DASH_CD,o.invT=Math.max(o.invT,Y.DASH_INV),o.cD++,o.bot&&(o.dashT=Y.DASH_T,o.dashA=n),!0);if(t==="x"){if(o.specCd>.1)return!1;if(o.specCd=kt[o.cls].cd,o.cX++,o.revealT=Y.REVEAL_T,o.f=n,o.cls===1){for(let f=0;f<c.length;f++){let d=c[f];if(d.team!==o.team||d.st!==Ne)continue;let p=d.x-o.x,y=d.z-o.z;if(p*p+y*y>Y.HEAL_R*Y.HEAL_R)continue;let m=d.hp;d.hp=Math.min(Y.HP,d.hp+Y.HEAL_AMT),d.burnT=0,d.rootT=0,d.slowT=0,d.hp-m>=1&&this.ev(["heal",d.id,Math.round(d.hp-m)])}return this.ev(["fx","heal",wt(o.x),wt(o.z),o.team]),!0}(s!==s||r!==r)&&(s=o.x+Math.sin(n)*5.5,r=o.z+Math.cos(n)*5.5);let a=s-o.x,l=r-o.z,h=Math.sqrt(a*a+l*l);h>Y.SPEC_RANGE&&(a*=Y.SPEC_RANGE/h,l*=Y.SPEC_RANGE/h);let u=o.cls===0?Y.FIRE_T:Y.SEED_T;return this.proj.push({id:this.nextId++,kind:o.cls===0?1:2,owner:o.id,team:o.team,x:o.x,z:o.z,vx:a/u,vz:l/u,ttl:u,tx:o.x+a,tz:o.z+l}),!0}return!1}damage(e,t,n,s,r){e.st===Ne&&(e.invT>0&&!r||(n&&n.bot&&s!==4&&(t*=this.diff.dmg),t=Math.max(1,Math.round(t)),e.hp-=t,e.cH++,e.hurtT=this.t,e.combatT=this.t,n&&(n.combatT=this.t,n.dmg+=t),this.ev(["hit",e.id,t,s,n?n.id:-1]),e.hp<=0&&this.down(e,n)))}down(e,t){e.hp=0,e.st=nn,e.downT=this.hunting()?Y.DOWN_EARLY:Y.DOWN_T,e.revP=0,e.burnT=0,e.rootT=0,e.slowT=0,e.dashT=0,e.mx=0,e.mz=0,e.moving=!1,t&&t.team!==e.team&&t.kills++,this.ev(["down",e.id,t?t.id:-1]);for(let n=0;n<this.scrolls.length;n++){let s=this.scrolls[n];if(s.carrier!==e.id)continue;s.carrier=-1,s.lock=.9;let r={x:e.x+(this.rng()-.5)*.8,z:e.z+(this.rng()-.5)*.8};Sr(this.map,r,0,0,.3),s.x=r.x,s.z=r.z,this.ev(["drop",e.id,s.id])}this.checkTeam(e.team)}checkTeam(e){if(this.teamOut[e]||this.phase!==1||this.hunting())return;let t=this.ninjas;for(let r=0;r<t.length;r++)if(t[r].team===e&&t[r].st===Ne)return;this.teamOut[e]=!0,this.outOrder.push(e);for(let r=0;r<t.length;r++)t[r].team===e&&t[r].st===nn&&(t[r].st=qt,this.ev(["out",t[r].id]));let n=-1,s=0;for(let r=0;r<this.nTeams;r++)this.teamOut[r]||(n=r,s++);this.ev(["tout",e,s+1]),s===1?this.win(n,"last"):s===0&&this.win(e,"last")}win(e,t){if(this.phase===2)return;this.phase=2,this.winner=e;let n=this.ninjas,s=this,r=[];for(let l=0;l<this.nTeams;l++)l!==e&&!this.teamOut[l]&&r.push(l);function o(l){let h=0;for(let u=0;u<n.length;u++)n[u].team===l&&n[u].st===Ne&&(h+=n[u].hp);for(let u=0;u<s.scrolls.length;u++){let f=s.scrolls[u].carrier;f>=0&&n[f].team===l&&(h+=1e3)}return h}r.sort(function(l,h){return o(h)-o(l)});let c=[e].concat(r);for(let l=this.outOrder.length-1;l>=0;l--)this.outOrder[l]!==e&&c.push(this.outOrder[l]);let a=n.map(function(l){return[l.kills,Math.round(l.dmg),l.revs]});this.ev(["end",e,t,c,a,Math.round(this.t)])}step(){let e=Ms;if(this.clock+=e,this.phase===0){this.count-=e,this.count<=0&&(this.phase=1,this.ev(["go"]));return}if(this.phase===2)return;this.t+=e;let t=this.ninjas,n=this.map,s=this.zone;for(let c=0;c<t.length;c++){let a=t[c];if(a.st!==Ne){a.vx=0,a.vz=0,a.px=a.x,a.pz=a.z;continue}if(a.meleeCd>0&&(a.meleeCd-=e),a.throwCd>0&&(a.throwCd-=e),a.charges<Y.SH_MAX&&(a.charges=Math.min(Y.SH_MAX,a.charges+e/Y.SH_RECH)),a.dashCd>0&&(a.dashCd-=e),a.specCd>0&&(a.specCd-=e),a.invT>0&&(a.invT-=e),a.rootT>0&&(a.rootT-=e),a.slowT>0&&(a.slowT-=e),a.revealT>0&&(a.revealT-=e),a.bot){let l=Y.SPEED*(a.slowT>0?Y.SLOW_MULT:1),h=a.mx*l,u=a.mz*l;a.rootT>0&&(h=0,u=0),a.dashT>0&&(a.dashT-=e,h=Math.sin(a.dashA)*Y.SPEED*Y.DASH_MULT,u=Math.cos(a.dashA)*Y.SPEED*Y.DASH_MULT),h||u?(Sr(n,a,h*e,u*e,Y.RADIUS),a.moving=!0):a.moving=!1}a.vx+=((a.x-a.px)/e-a.vx)*.35,a.vz+=((a.z-a.pz)/e-a.vz)*.35,a.px=a.x,a.pz=a.z,a.bush=Bi(n,a.x,a.z)===yi,a.burnT>0&&(a.burnT-=e,a.burnAcc+=Y.BURN_DPS*e,a.burnAcc>=2&&(a.burnAcc-=2,this.damage(a,2,t[a.burnBy]||null,2,!0))),a.st===Ne&&this.t-a.combatT>Y.REGEN_DELAY&&a.hp<Y.HP&&(a.hp=Math.min(Y.HP,a.hp+Y.REGEN*e))}for(let c=this.proj.length-1;c>=0;c--){let a=this.proj[c];a.ttl-=e;let l=!1;if(a.kind===0){for(let h=0;h<2&&!l;h++){a.x+=a.vx*e*.5,a.z+=a.vz*e*.5;let u=Bi(n,a.x,a.z);if(u===_n)l=!0;else if(u===jn||u===ri||u===Bn){let f=a.x-(Math.floor(a.x)+.5),d=a.z-(Math.floor(a.z)+.5);f*f+d*d<.2&&(l=!0)}if(l){this.ev(["fx","clink",wt(a.x),wt(a.z),a.team]);break}for(let f=0;f<t.length;f++){let d=t[f];if(d.team===a.team||d.st!==Ne)continue;let p=d.x-a.x,y=d.z-a.z;if(p*p+y*y<Y.SH_HIT*Y.SH_HIT){this.damage(d,Y.SH_DMG,t[a.owner],1),l=!0;break}}}a.ttl<=0&&(l=!0)}else if(a.x+=a.vx*e,a.z+=a.vz*e,a.ttl<=0){l=!0;let h=t[a.owner];if(a.kind===1){this.ev(["fx","boom",wt(a.tx),wt(a.tz),a.team]);for(let u=0;u<t.length;u++){let f=t[u];if(f.team===a.team||f.st!==Ne)continue;let d=f.x-a.tx,p=f.z-a.tz,y=Math.sqrt(d*d+p*p);y>Y.FIRE_R+.3||(this.damage(f,Y.FIRE_DMG*(1-.35*y/Y.FIRE_R),h,2),f.st===Ne&&f.invT<=0&&(f.burnT=Y.BURN_T,f.burnBy=a.owner))}}else this.areas.push({id:this.nextId++,kind:0,team:a.team,owner:a.owner,x:a.tx,z:a.tz,r:Y.BRAMBLE_R,ttl:Y.BRAMBLE_T,hit:{}}),this.ev(["fx","bram",wt(a.tx),wt(a.tz),a.team])}l&&this.proj.splice(c,1)}for(let c=this.areas.length-1;c>=0;c--){let a=this.areas[c];if(a.ttl-=e,a.ttl<=0){this.areas.splice(c,1);continue}for(let l=0;l<t.length;l++){let h=t[l];if(h.team===a.team||h.st!==Ne)continue;let u=h.x-a.x,f=h.z-a.z;u*u+f*f>a.r*a.r||h.invT>0||(a.hit[h.id]||(a.hit[h.id]=1,h.rootT=Y.ROOT_T,this.damage(h,Y.BRAMBLE_DMG,t[a.owner],3)),h.slowT<.3&&(h.slowT=.3))}}for(let c=0;c<t.length;c++){let a=t[c];if(a.st!==nn)continue;let l=a.x-48,h=a.z-48,u=l*l+h*h>s.r*s.r,f=null;for(let d=0;d<t.length;d++){let p=t[d];if(p.team!==a.team||p.st!==Ne)continue;let y=p.x-a.x,m=p.z-a.z;if(y*y+m*m<Y.REVIVE_R*Y.REVIVE_R&&this.t-p.hurtT>.7){f=p;break}}f?(a.revP+=e/Y.REVIVE_T,a.revP>=1&&(a.st=Ne,a.hp=Y.REVIVE_HP,a.invT=Y.REVIVE_INV,a.revP=0,a.combatT=this.t,f.revs++,this.ev(["rev",a.id,f.id]))):(a.revP=Math.max(0,a.revP-e*.6),a.downT-=e*(u?3:1),a.downT<=0&&(this.hunting()?this.respawn(a):(a.st=qt,this.ev(["out",a.id]))))}for(let c=0;c<this.scrolls.length;c++){let a=this.scrolls[c];if(a.carrier>=0){a.x=t[a.carrier].x,a.z=t[a.carrier].z;continue}a.lock>0&&(a.lock-=e);let l=a.x-48,h=a.z-48,u=Math.sqrt(l*l+h*h);if(u>s.r-1&&u>2){let p=Math.max(1,s.r-2.5),y=Mr(n,48+l/u*p,48+h/u*p);a.x=y.x,a.z=y.z;continue}if(a.lock>0)continue;let f=null,d=Y.PICK_R*Y.PICK_R;for(let p=0;p<t.length;p++){let y=t[p];if(y.st!==Ne)continue;let m=y.x-a.x,g=y.z-a.z,S=m*m+g*g;S<d&&(d=S,f=y)}f&&(a.carrier=f.id,this.ev(["pick",f.id,a.id]))}for(let c=0;c<this.pickups.length;c++){let a=this.pickups[c];if(!a.on){a.t-=e,a.t<=0&&(a.on=!0);continue}for(let l=0;l<t.length;l++){let h=t[l];if(h.st!==Ne||h.hp>Y.HP-2)continue;let u=h.x-a.x,f=h.z-a.z;if(u*u+f*f<Y.PICK_R*Y.PICK_R){let d=h.hp;h.hp=Math.min(Y.HP,h.hp+Y.FOOD_HP),a.on=!1,a.t=Y.FOOD_RESPAWN,this.ev(["food",h.id,c,Math.round(h.hp-d)]);break}}}if(s.stage<_i.length){s.timer-=e;let c=_i[s.stage];if(s.shrinking){let a=1-Math.max(0,s.timer)/c.shrink;s.r=s.from+(s.to-s.from)*a,s.timer<=0&&(s.r=s.to,s.shrinking=!1,s.stage++,s.stage<_i.length?(s.timer=_i[s.stage].wait,s.to=_i[s.stage].r):s.timer=0,this.ev(["zone",0,s.stage]))}else if(s.timer<=0){if(s.stage===0)for(let a=0;a<t.length;a++)t[a].st===nn&&this.respawn(t[a]);s.shrinking=!0,s.timer=c.shrink,s.from=s.r,s.to=c.r,s.dps=c.dps,this.ev(["zone",1,s.stage])}}for(let c=0;c<t.length;c++){let a=t[c];if(a.st!==Ne)continue;let l=a.x-48,h=a.z-48;if(l*l+h*h>s.r*s.r){if(a.zoneAcc+=s.dps*e,a.zoneAcc>=2){let u=Math.floor(a.zoneAcc);a.zoneAcc-=u,this.damage(a,u,null,4,!0)}}else a.zoneAcc=0;if(this.phase!==1)return}let r=Y.SHRINE_R*Y.SHRINE_R,o=this.hunting();for(let c=0;c<this.nTeams;c++){if(this.teamOut[c]||o){this.deliver[c]=0;continue}let a=!1,l=!1;for(let h=0;h<this.scrolls.length;h++){let u=this.scrolls[h];if(u.carrier<0)continue;let f=t[u.carrier];if(f.team!==c||f.st!==Ne)continue;let d=f.x-48,p=f.z-48;d*d+p*p<r&&(u.kind===0?a=!0:l=!0)}if(a&&l){let h=!1;for(let u=0;u<t.length;u++){let f=t[u];if(f.team===c||f.st!==Ne)continue;let d=f.x-48,p=f.z-48;if(d*d+p*p<r){h=!0;break}}if(!h&&(this.deliver[c]+=e/Y.DELIVER_T,this.deliver[c]>=1)){this.deliver[c]=1,this.win(c,"deliver");return}}else this.deliver[c]>0&&(this.deliver[c]=Math.max(0,this.deliver[c]-e*.8))}}snapshot(){let e=[];for(let l=0;l<this.ninjas.length;l++){let h=this.ninjas[l],u=0;h.moving&&(u|=qo),h.burnT>0&&(u|=Yo),h.rootT>0&&(u|=bs),h.invT>0&&(u|=jo),h.revealT>0&&(u|=Jo),h.slowT>0&&(u|=Ts),h.bush&&(u|=Zo),e.push([wt(h.x),wt(h.z),Math.round(h.f*100),Math.max(0,Math.ceil(h.hp)),h.st,u,Math.round(Math.max(0,h.downT)*10),Math.round(h.revP*100),h.cM&255,h.cS&255,h.cX&255,h.cH&255,h.cD&255,Math.round(h.charges*10),Math.round(Math.max(0,h.dashCd)*10),Math.round(Math.max(0,h.specCd)*10),h.kills])}let t=[];for(let l=0;l<this.proj.length;l++){let h=this.proj[l];t.push([h.id,h.kind,wt(h.x),wt(h.z),wt(h.vx),wt(h.vz),h.team,wt(h.tx),wt(h.tz),Math.round(h.ttl*100)])}let n=[];for(let l=0;l<this.areas.length;l++){let h=this.areas[l];n.push([h.id,h.kind,wt(h.x),wt(h.z),wt(h.r),Math.round(h.ttl*10),h.team])}let s=[];for(let l=0;l<this.scrolls.length;l++){let h=this.scrolls[l];s.push([h.carrier,wt(h.x),wt(h.z)])}let r=0;for(let l=0;l<this.pickups.length;l++)this.pickups[l].on&&(r|=1<<l);let o=this.zone,c=[];for(let l=0;l<this.nTeams;l++)c.push(Math.round(this.deliver[l]*100));let a=this.events;return this.events=[],{k:"s",t:Math.round(this.clock*1e3),ph:this.phase,c:Math.max(0,Math.ceil(this.count*10)),gt:Math.round(this.t*10),n:e,p:t,a:n,s,h:r,z:[Math.round(o.r*10),Math.round(o.to*10),Math.round(Math.max(0,o.timer)*10),o.shrinking?1:0,o.stage,o.dps],d:c,e:a}}};function un(i,e,t,n){let s=i-t,r=e-n;return Math.sqrt(s*s+r*r)}var ea=class{constructor(e){this.sim=e,this.nav=new $o(e.map),this.mem=e.ninjas.map(function(t,n){return{think:n*.037%.12,react:.4+n%5*.1,path:null,pi:0,pathT:0,gx:t.x,gz:t.z,tx:t.x,tz:t.z,stopAt:0,face:null,lastX:t.x,lastZ:t.z,stuckT:0,jit:0,jx:0,jz:0,strafe:n%2?1:-1,strafeT:0,force:!1}}),this.goals=[],this.goalT=0}update(e){let t=this.sim,n=t.ninjas;if(t.phase!==1){for(let s=0;s<n.length;s++)n[s].bot&&(n[s].mx=0,n[s].mz=0);return}this.goalT-=e,this.goalT<=0&&(this.goalT=.4,this.computeGoals());for(let s=0;s<n.length;s++){let r=n[s];if(!r.bot)continue;if(r.st!==Ne){r.mx=0,r.mz=0;continue}let o=this.mem[r.id];o.think-=e,o.react-=e,o.think<=0&&(o.think+=.12,o.think<0&&(o.think=.12),this.think(r,o)),this.steer(r,o,e)}}computeGoals(){let e=this.sim,t=e.ninjas;for(let n=0;n<e.nTeams;n++){let s=this.goals[n]||(this.goals[n]={}),r=0,o=0,c=0,a=null;for(let d=0;d<t.length;d++){let p=t[d];p.team!==n||p.st!==Ne||(r+=p.x,o+=p.z,c++,!p.bot&&!a&&(a=p))}if(s.lead=a,s.type="none",!c)continue;r/=c,o/=c;let l=!1,h=!1;for(let d=0;d<e.scrolls.length;d++){let p=e.scrolls[d];if(p.carrier<0)continue;let y=t[p.carrier];y.team===n&&y.st===Ne&&(p.kind===0?l=!0:h=!0)}if(s.has0=l,s.has1=h,l&&h){s.type="deliver",s.x=48,s.z=48,s.scroll=null;continue}let u=null,f=1e9;for(let d=0;d<e.scrolls.length;d++){let p=e.scrolls[d];if(p.carrier>=0&&t[p.carrier].team===n||p.kind===0&&l||p.kind===1&&h)continue;let y=un(r,o,p.x,p.z);p.carrier<0&&(y*=.6),s.scroll===p&&(y*=.8),y<f&&(f=y,u=p)}u?(s.type="hunt",s.scroll=u,s.x=u.x,s.z=u.z):(s.type="hold",s.scroll=null,s.x=48,s.z=48)}}think(e,t){let n=this.sim,s=n.ninjas,r=n.map,o=n.diff,c=n.zone,a=n.rng,l=this.goals[e.team]||{type:"none"},h=un(e.x,e.z,48,48),u=null,f=1e9,d=0,p=null,y=1e9,m=!1;for(let x=0;x<s.length;x++){let E=s[x];if(E===e)continue;let C=un(e.x,e.z,E.x,E.z);if(E.team===e.team){E.st===nn&&C<y&&(y=C,p=E),E.st===Ne&&C<Y.HEAL_R&&E.hp<62&&(m=!0);continue}E.st!==Ne||C>Y.VIEW||E.bush&&E.revealT<=0&&C>Y.BUSH_SEE||(d++,C<f&&(f=C,u=E))}e.hp<62&&(m=!0);let g=e.x,S=e.z,A=0,v=!1;t.face=null;let b=this.carries(e),M=Math.max(1.2,(c.shrinking?c.to:c.r)-2.5);if(h>M&&(c.shrinking||h>c.r-1.5)){let x=Math.max(.5,M*.8);l.type!=="none"&&l.x!=null&&un(l.x,l.z,48,48)<M?(g=l.x,S=l.z):(g=48+(e.x-48)/h*x,S=48+(e.z-48)/h*x),v=!0}if(!v&&u&&e.hp<32&&f<7){let x=null,E=14;for(let C=0;C<n.pickups.length;C++){let P=n.pickups[C];if(!P.on)continue;let I=un(e.x,e.z,P.x,P.z);I<E&&un(u.x,u.z,P.x,P.z)>I&&(E=I,x=P)}if(x)g=x.x,S=x.z;else{let C=Mr(r,_t(e.x+(e.x-u.x)/f*6,4,92),_t(e.z+(e.z-u.z)/f*6,4,92));g=C.x,S=C.z}v=!0}if(!v&&p&&y<16&&(d===0||f>4.5&&e.hp>40)&&(g=p.x,S=p.z,A=.8,v=!0),!v&&u){if(f>1.35)g=u.x,S=u.z;else{t.strafeT-=.12,t.strafeT<=0&&(t.strafeT=.6+a()*.9,a()<.5&&(t.strafe=-t.strafe));let x=(u.x-e.x)/(f||1),E=(u.z-e.z)/(f||1);g=e.x-E*t.strafe*1.2+x*.2,S=e.z+x*t.strafe*1.2+E*.2}v=!0}if(!v&&e.hp<60){let x=12;for(let E=0;E<n.pickups.length;E++){let C=n.pickups[E];if(!C.on)continue;let P=un(e.x,e.z,C.x,C.z);P<x&&un(C.x,C.z,48,48)<c.r-1&&(x=P,g=C.x,S=C.z,v=!0)}}if(!v){let x=l.lead;if(x&&x!==e){let E=un(e.x,e.z,x.x,x.z),C=un(x.x,x.z,48,48)<Y.SHRINE_R+1.5;if(l.type==="deliver"&&b&&C)g=48+(e.slot-1)*1.5,S=48+(e.slot===1?1.8:.9),A=.5;else{let P=e.slot===1?1:-1,I=Math.sin(x.f),O=Math.cos(x.f);g=x.x-I*1.5-O*P*1.4,S=x.z-O*1.5+I*P*1.4,A=E<3.2?5:.9}}else l.type==="deliver"?b?(g=48+(e.slot-1)*1.5,S=48+(e.slot===1?1.8:.9),A=.45):(g=48+(e.slot-1)*2.4,S=48+2.4,A=.6):l.type==="hunt"?(g=l.x+(e.slot-1)*.7,S=l.z+(e.slot===1?.6:-.4),A=.3):l.type==="hold"&&(g=48+(e.slot-1)*3,S=52,A=.8)}if(u){let x=Math.atan2(u.x-e.x,u.z-e.z);t.face=x;let E=Ko(r,e.x,e.z,u.x,u.z);if(f<Y.MELEE_R-.15&&e.meleeCd<=0&&t.react<=0)n.act(e.id,"m",x),t.react=o.react*.55+a()*.12;else if(E&&f>2.1&&f<9.5&&e.charges>=1&&t.react<=0){let C=f/Y.SH_SPEED,P=u.x+u.vx*C-e.x,I=u.z+u.vz*C-e.z;n.act(e.id,"s",Math.atan2(P,I)+(a()-.5)*2*o.aim),t.react=o.react+a()*.45}if(e.specCd<=0&&e.cls!==1&&f>2&&f<Y.SPEC_RANGE&&a()<o.special*.3){let C=e.cls===0?Y.FIRE_T:Y.SEED_T,P=u.x+u.vx*C*.7+(a()-.5)*o.aim*6,I=u.z+u.vz*C*.7+(a()-.5)*o.aim*6;n.act(e.id,"x",Math.atan2(P-e.x,I-e.z),P,I)}e.dashCd<=0&&e.rootT<=0&&a()<o.dash*.14&&(e.hp<30&&f<4.5?n.act(e.id,"d",Math.atan2(e.x-u.x,e.z-u.z)):f>3&&f<6.5&&e.hp>35&&E&&n.act(e.id,"d",x))}if(e.cls===1&&e.specCd<=0&&m&&a()<.5&&n.act(e.id,"x",e.f,e.x,e.z),t.tx=g,t.tz=S,t.stopAt=A,t.pathT-=.12,un(e.x,e.z,g,S)<.2||$l(r,e.x,e.z,g,S)?t.path=null:(!t.path||t.pathT<=0||t.force||un(t.gx,t.gz,g,S)>2.5)&&(t.path=this.nav.find(e.x,e.z,g,S),t.pi=0,t.gx=g,t.gz=S,t.pathT=.9+a()*.5,t.force=!1),t.path)for(;t.pi+2<t.path.length&&$l(r,e.x,e.z,t.path[t.pi+2],t.path[t.pi+3]);)t.pi+=2}carries(e){let t=this.sim.scrolls;for(let n=0;n<t.length;n++)if(t[n].carrier===e.id)return!0;return!1}steer(e,t,n){let s=this.sim.ninjas,r=t.tx,o=t.tz;if(t.path){for(;t.pi<t.path.length-2&&un(e.x,e.z,t.path[t.pi],t.path[t.pi+1])<.55;)t.pi+=2;t.pi<t.path.length&&(r=t.path[t.pi],o=t.path[t.pi+1])}let c=r-e.x,a=o-e.z,l=Math.sqrt(c*c+a*a);un(e.x,e.z,t.tx,t.tz)<Math.max(.12,t.stopAt)||l<.05?(c=0,a=0):(c/=l,a/=l);let u=c!==0||a!==0;for(let p=0;p<s.length;p++){let y=s[p];if(y===e||y.team!==e.team||y.st!==Ne)continue;let m=e.x-y.x,g=e.z-y.z,S=m*m+g*g;if(S<.64&&S>1e-4){let A=Math.sqrt(S);c+=m/A*.6,a+=g/A*.6}}t.jit>0&&(t.jit-=n,c+=t.jx,a+=t.jz);let f=Math.sqrt(c*c+a*a);f>1&&(c/=f,a/=f),f<.08&&(c=0,a=0),e.mx=c,e.mz=a;let d=t.face!=null?t.face:c||a?Math.atan2(c,a):e.f;if(e.f+=_t(Es(d,e.f),-12*n,12*n),t.stuckT+=n,t.stuckT>.9){if(u&&un(e.x,e.z,t.lastX,t.lastZ)<.3){t.force=!0,t.jit=.45;let p=this.sim.rng()*6.283;t.jx=Math.sin(p)*.9,t.jz=Math.cos(p)*.9}t.lastX=e.x,t.lastZ=e.z,t.stuckT=0}}};var ta=class{constructor(e){this.start=e,this.map=vr(e.seed),this.sim=new Qo(this.map,e.roster,e),this.bots=new ea(this.sim),this.acc=0,this.snapN=0,this.onSnap=null}advance(e){for(this.acc+=Math.min(e,.25);this.acc>=Ms;)if(this.acc-=Ms,this.bots.update(Ms),this.sim.step(),++this.snapN>=Wf){this.snapN=0;let t=this.sim.snapshot();this.onSnap&&this.onSnap(t)}}input(e,t){let n=this.sim;!t||!n.ninjas[e]||(t[0]==="i"?n.setHuman(e,t[1]/100,t[2]/100,t[3]/100,t[4]):t[0]==="a"&&(n.setHuman(e,t[3]/100,t[4]/100,t[2]/100,1),n.act(e,t[1],t[2]/100,t[5]!=null?t[5]/100:NaN,t[6]!=null?t[6]/100:NaN)))}toBot(e){let t=this.sim.ninjas[e];t&&(t.bot=!0,t.mx=0,t.mz=0)}};function Zf(i,e,t){return i+Es(e,i)*t}var br=class{constructor(e,t,n){this.start=e,this.map=vr(e.seed),this.nTeams=e.teams,this.me=e.you,this.send=t,this.delay=n??.11;let s=e.roster;this.myTeam=s[this.me].team,this.cls=s[this.me].cls,this.snaps=[],this.off=null,this.localT=0,this.lastSnapAt=0;let r=As(this.map,this.nTeams,s[this.me].team,s[this.me].slot);this.p={x:r.x,z:r.z,f:Math.atan2(48-r.x,48-r.z)},this.cd={melee:0,charges:Y.SH_MAX,gap:0,dash:0,spec:2.5},this.dashT=0,this.dashA=0,this.lungeT=0,this.aimLock=0,this.sendAcc=0,this.moving=!1,this.farT=0,this.local={cM:0,cS:0,cX:0,cD:0},this.queue=[];let o=this.map,c=this.nTeams;this.view={phase:0,count:Y.COUNTDOWN,time:0,ninjas:s.map(function(a){let l=As(o,c,a.team,a.slot);return{id:a.id,team:a.team,slot:a.slot,cls:a.cls,name:a.name,bot:!!a.bot,x:l.x,z:l.z,f:Math.atan2(48-l.x,48-l.z),hp:Y.HP,st:Ne,fl:0,downT:0,revP:0,cM:0,cS:0,cX:0,cH:0,cD:0,kills:0,moving:!1,hidden:!1}}),proj:[],areas:[],scrolls:[],food:255,zone:{r:Y.ZONE_R0,to:Y.ZONE_R0,timer:0,shrinking:!1,stage:0,dps:0},deliver:[],events:[],end:null,stale:0,cd:this.cd};for(let a=0;a<c;a++)this.view.scrolls.push({id:a,kind:a%2,carrier:a*3,x:0,z:0}),this.view.deliver.push(0)}onSnap(e){let t=e.t/1e3-this.localT;if(this.off=this.off==null?t:Math.max(this.off-.002,t),this.snaps.push(e),this.snaps.length>24&&this.snaps.shift(),e.e&&e.e.length)for(let n=0;n<e.e.length;n++)this.queue.push({t:e.t,e:e.e[n]});this.lastSnapAt=this.localT}autoAim(e,t){let n=this.view,s=this.p,r=null,o=e;for(let c=0;c<n.ninjas.length;c++){let a=n.ninjas[c];if(a.team===this.myTeam||a.st!==Ne||a.hidden)continue;let l=a.x-s.x,h=a.z-s.z,u=Math.sqrt(l*l+h*h);u>=o||t&&!Ko(this.map,s.x,s.z,a.x,a.z)||(o=u,r=a)}return r}sendAct(e,t,n,s){let r=this.p,o=["a",e,Math.round(t*100),Math.round(r.x*100),Math.round(r.z*100)];n!=null&&o.push(Math.round(n*100),Math.round(s*100)),this.send(o),this.sendAcc=0}frame(e,t){this.localT+=e;let n=this.view,s=this.p,r=this.cd,o=this.map;n.events.length=0;let c=this.snaps.length?this.snaps[this.snaps.length-1]:null;n.stale=this.localT-this.lastSnapAt;let a=Ne,l=0;if(c){let x=c.n[this.me];if(a=x[4],l=x[5],n.phase=c.ph,n.count=c.c/10,n.time=c.gt/10,Math.abs(r.charges-x[13]/10)>.8&&(r.charges=x[13]/10),Math.abs(r.dash-x[14]/10)>.7&&(r.dash=x[14]/10),Math.abs(r.spec-x[15]/10)>.7&&(r.spec=x[15]/10),a!==Ne)s.x=x[0]/100,s.z=x[1]/100,this.farT=0;else{let E=x[0]/100-s.x,C=x[1]/100-s.z;E*E+C*C>25?(this.farT+=e,this.farT>1.2&&(s.x=x[0]/100,s.z=x[1]/100,this.farT=0)):this.farT=0}}r.melee>0&&(r.melee-=e),r.gap>0&&(r.gap-=e),r.dash>0&&(r.dash-=e),r.spec>0&&(r.spec-=e),r.charges<Y.SH_MAX&&(r.charges=Math.min(Y.SH_MAX,r.charges+e/Y.SH_RECH));let h=c&&c.ph===1&&a===Ne,u=!1,f=!1;if(h){let x=(l&bs)!==0;if(t.melee&&r.melee<=0){let I=this.autoAim(Y.MELEE_R+1,!1),O=I?Math.atan2(I.x-s.x,I.z-s.z):s.f;s.f=O,this.aimLock=.22,r.melee=Y.MELEE_CD,x||(this.lungeT=.09),this.local.cM++,this.sendAct("m",O),f=!0}if(t.shuriken&&r.charges>=1&&r.gap<=0){let I=this.autoAim(10.2,!0),O=s.f;if(I){let L=Math.sqrt((I.x-s.x)*(I.x-s.x)+(I.z-s.z)*(I.z-s.z))/Y.SH_SPEED;O=Math.atan2(I.x+(I.vx||0)*L-s.x,I.z+(I.vz||0)*L-s.z)}s.f=O,this.aimLock=.18,r.charges-=1,r.gap=.26,this.local.cS++,this.sendAct("s",O),f=!0}if(t.dash&&r.dash<=0&&!x){let I=t.mx||t.mz?Math.atan2(t.mx,t.mz):s.f;this.dashT=Y.DASH_T,this.dashA=I,r.dash=Y.DASH_CD,this.local.cD++,this.sendAct("d",I),f=!0}if(t.special&&r.spec<=0){if(r.spec=kt[this.cls].cd,this.local.cX++,this.cls===1)this.sendAct("x",s.f,s.x,s.z);else{let I=this.autoAim(Y.SPEC_RANGE+.5,!1),O,L;I?(O=I.x+(I.vx||0)*.3,L=I.z+(I.vz||0)*.3):(O=s.x+Math.sin(s.f)*5.5,L=s.z+Math.cos(s.f)*5.5);let U=Math.atan2(O-s.x,L-s.z);s.f=U,this.aimLock=.25,this.sendAct("x",U,O,L)}f=!0}let E=Y.SPEED*(l&Ts?Y.SLOW_MULT:1),C=t.mx*E,P=t.mz*E;x&&(C=0,P=0),this.dashT>0&&(this.dashT-=e,C=Math.sin(this.dashA)*Y.SPEED*Y.DASH_MULT,P=Math.cos(this.dashA)*Y.SPEED*Y.DASH_MULT),this.lungeT>0&&!x&&(this.lungeT-=e,C+=Math.sin(s.f)*Y.LUNGE/.09,P+=Math.cos(s.f)*Y.LUNGE/.09),(C||P)&&Sr(o,s,C*e,P*e,Y.RADIUS),u=t.mx*t.mx+t.mz*t.mz>.02&&!x,this.aimLock>0?this.aimLock-=e:u&&(s.f=Zf(s.f,Math.atan2(t.mx,t.mz),Math.min(1,e*16)))}else this.dashT=0,this.lungeT=0;if(this.moving=u,this.sendAcc+=e,!f&&this.sendAcc>=1/15&&h&&(this.sendAcc=0,this.send(["i",Math.round(s.x*100),Math.round(s.z*100),Math.round(s.f*100),u?1:0])),!c)return n;let d=(this.localT+this.off-this.delay)*1e3,p=this.snaps,y=p.length-1;for(;y>0&&p[y-1].t>d;)y--;let m=p[y],g=y>0?p[y-1]:m,S=m.t>g.t?_t((d-g.t)/(m.t-g.t),0,1):1,A=Math.max(1,m.t-g.t)/1e3;for(let x=0;x<n.ninjas.length;x++){let E=n.ninjas[x],C=g.n[x],P=m.n[x];if(x===this.me){E.x=s.x,E.z=s.z,E.f=s.f;let I=c.n[x];E.hp=I[3],E.st=I[4],E.fl=I[5],E.downT=I[6]/10,E.revP=I[7]/100,E.cH=I[11],E.kills=I[16],E.cM=this.local.cM,E.cS=this.local.cS,E.cX=this.local.cX,E.cD=this.local.cD,E.moving=u,E.hidden=!1,E.vx=0,E.vz=0;continue}E.x=(C[0]+(P[0]-C[0])*S)/100,E.z=(C[1]+(P[1]-C[1])*S)/100,E.f=Zf(C[2]/100,P[2]/100,S),E.vx=(P[0]-C[0])/100/A,E.vz=(P[1]-C[1])/100/A,E.hp=P[3],E.st=P[4],E.fl=P[5],E.downT=P[6]/10,E.revP=P[7]/100,E.cM=P[8],E.cS=P[9],E.cX=P[10],E.cH=P[11],E.cD=P[12],E.kills=P[16],E.moving=(P[5]&qo)!==0||E.vx*E.vx+E.vz*E.vz>1}let v=!1;for(let x=0;x<n.ninjas.length;x++)n.ninjas[x].team===this.myTeam&&n.ninjas[x].st===Ne&&(v=!0);for(let x=0;x<n.ninjas.length;x++){let E=n.ninjas[x];if(E.team===this.myTeam){E.hidden=!1;continue}let C=v&&E.st===Ne&&(E.fl&Zo)!==0&&(E.fl&Jo)===0;if(C)for(let P=0;P<n.ninjas.length;P++){let I=n.ninjas[P];if(I.team!==this.myTeam||I.st!==Ne)continue;let O=I.x-E.x,L=I.z-E.z;if(O*O+L*L<Y.BUSH_SEE*Y.BUSH_SEE){C=!1;break}}E.hidden=C}let b=(d-g.t)/1e3;n.proj.length=0;for(let x=0;x<g.p.length;x++){let E=g.p[x],C=E[9]/100-b;C<-.02||n.proj.push({id:E[0],kind:E[1],x:E[2]/100+E[4]/100*b,z:E[3]/100+E[5]/100*b,team:E[6],tx:E[7]/100,tz:E[8]/100,ttl:C,vx:E[4]/100,vz:E[5]/100})}n.areas.length=0;for(let x=0;x<m.a.length;x++){let E=m.a[x];n.areas.push({id:E[0],kind:E[1],x:E[2]/100,z:E[3]/100,r:E[4]/100,ttl:E[5]/10,team:E[6]})}for(let x=0;x<n.scrolls.length;x++){let E=m.s[x],C=n.scrolls[x];C.carrier=E[0],E[0]>=0?(C.x=n.ninjas[E[0]].x,C.z=n.ninjas[E[0]].z):(C.x=E[1]/100,C.z=E[2]/100)}n.food=m.h;let M=g.z,_=m.z;n.zone.r=(M[0]+(_[0]-M[0])*S)/10,n.zone.to=_[1]/10,n.zone.timer=_[2]/10,n.zone.shrinking=_[3]===1,n.zone.stage=_[4],n.zone.dps=_[5];for(let x=0;x<n.deliver.length;x++)n.deliver[x]=m.d[x]/100;for(;this.queue.length&&this.queue[0].t<=d+2;){let x=this.queue.shift().e;n.events.push(x),x[0]==="end"&&(n.end={winner:x[1],how:x[2],rank:x[3],stats:x[4],time:x[5]})}return n}};function Kl(i,e){let t=!1,n=!1;for(let s=0;s<i.scrolls.length;s++){let r=i.scrolls[s];if(r.carrier<0)continue;let o=i.ninjas[r.carrier];o.team===e&&o.st===Ne&&(r.kind===0?t=!0:n=!0)}return{sol:t,luna:n}}function na(i,e,t,n){let s=[],r={};for(let a=0;a<e.length;a++)r[e[a].name]=1;let o=n.slice();for(let a=o.length-1;a>0;a--){let l=Math.floor(t()*(a+1)),h=o[a];o[a]=o[l],o[l]=h}let c=0;for(let a=0;a<i;a++){let l={};for(let h=0;h<e.length;h++)e[h].team===a&&(l[e[h].cls]=1);for(let h=0;h<3;h++){let u=null;for(let p=0;p<e.length;p++)e[p].team===a&&e[p].slot===h&&(u=e[p]);if(u){s.push({id:a*3+h,team:a,slot:h,cls:u.cls,name:u.name,bot:!1,owner:u.owner});continue}let f=0;for(let p=0;p<3;p++){let y=(p+h+a)%3;if(!l[y]){f=y;break}}for(l[f]=1;c<o.length&&r[o[c]];)c++;let d=o[c++%o.length];s.push({id:a*3+h,team:a,slot:h,cls:f,name:d,bot:!0,owner:null})}}return s}var Id=0,Uh=1,Ld=2;var po=1,Dd=2,nr=3,Zi=0,pn=1,Jt=2,ds=0,ir=1,sr=2,Oh=3,Fh=4,dc=5;var ps=100,Nd=101,Ud=102,Od=103,Fd=104,Bd=200,kd=201,zd=202,Hd=203,Bh=204,kh=205,Gd=206,Vd=207,Wd=208,Xd=209,qd=210,Yd=211,jd=212,Jd=213,Zd=214,Pa=0,Ia=1,La=2,Vs=3,Da=4,Na=5,Ws=6,Ua=7,pc=0,$d=1,Kd=2,fi=0,zh=1,Hh=2,Gh=3,Vh=4,Wh=5,Xh=6,qh=7;var Yh=300,ms=301,rr=302,mc=303,gc=304,Oa=1e3,ci=1001,Fa=1002,jt=1003,Qd=1004;var mo=1005;var dn=1006,_c=1007;var Ii=1008;var vn=1009,jh=1010,Jh=1011,or=1012,xc=1013,ei=1014,Wn=1015,ti=1016,yc=1017,vc=1018,gs=1020,Zh=35902,$h=35899,Kh=1021,Qh=1022,ni=1023,Ai=1026,Li=1027,Sc=1028,Mc=1029,$i=1030,bc=1031;var Tc=1033,go=33776,_o=33777,xo=33778,yo=33779,Ec=35840,Ac=35841,wc=35842,Cc=35843,Rc=36196,Pc=37492,Ic=37496,Lc=37488,Dc=37489,vo=37490,Nc=37491,Uc=37808,Oc=37809,Fc=37810,Bc=37811,kc=37812,zc=37813,Hc=37814,Gc=37815,Vc=37816,Wc=37817,Xc=37818,qc=37819,Yc=37820,jc=37821,Jc=36492,Zc=36494,$c=36495,Kc=36283,Qc=36284,So=36285,el=36286;var Nr=2300,Ba=2301,Ca=2302,Th=2303,Eh=2400,Ah=2401,wh=2402;var ep=3200;var tl=0,tp=1,Di="",wn="srgb",Ur="srgb-linear",Or="linear",lt="srgb";var Ra=7680;var np=519,ip=512,sp=513,rp=514,eu=515,op=516,ap=517,tu=518,nu=519,cp=35044;var iu="300 es",zn=2e3,Xs=2001;function r0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function o0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function lp(){let i=Fr("canvas");return i.style.display="block",i}var $f={},qs=null;function su(...i){let e="THREE."+i.shift();qs?qs("log",e,...i):console.log(e,...i)}function hp(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Oe(...i){i=hp(i);let e="THREE."+i.shift();if(qs)qs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function ze(...i){i=hp(i);let e="THREE."+i.shift();if(qs)qs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ir(...i){let e=i.join(" ");e in $f||($f[e]=!0,Oe(...i))}function up(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var fp={[Pa]:Pa,[La]:Ws,[Da]:Da,[Vs]:Na,[Ia]:Ia,[Ws]:La,[Ua]:Ua,[Na]:Vs},li=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ql=Math.PI/180,ka=180/Math.PI;function ar(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]).toLowerCase()}function Ke(i,e,t){return Math.max(e,Math.min(t,i))}function a0(i,e){return(i%e+e)%e}function eh(i,e,t){return(1-t)*i+t*e}function dp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ru(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function c0(i,e){if(e.constructor===Float32Array)return i;let t=ru(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function l0(i,e){if(e.constructor===Float32Array)return i;let t=ru(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var uu=class uu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};uu.prototype.isVector2=!0;var Se=uu,hi=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,c){let a=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],p=r[o+2],y=r[o+3];if(u!==y||a!==f||l!==d||h!==p){let m=a*f+l*d+h*p+u*y;m<0&&(f=-f,d=-d,p=-p,y=-y,m=-m);let g=1-c;if(m<.9995){let S=Math.acos(m),A=Math.sin(S);g=Math.sin(g*S)/A,c=Math.sin(c*S)/A,a=a*g+f*c,l=l*g+d*c,h=h*g+p*c,u=u*g+y*c}else{a=a*g+f*c,l=l*g+d*c,h=h*g+p*c,u=u*g+y*c;let S=1/Math.sqrt(a*a+l*l+h*h+u*u);a*=S,l*=S,h*=S,u*=S}}e[t]=a,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let c=n[s],a=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return e[t]=c*p+h*u+a*d-l*f,e[t+1]=a*p+h*f+l*u-c*d,e[t+2]=l*p+h*d+c*f-a*u,e[t+3]=h*p-c*u-a*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,c=Math.cos,a=Math.sin,l=c(n/2),h=c(s/2),u=c(r/2),f=a(n/2),d=a(s/2),p=a(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*p,this._y=l*d*u-f*h*p,this._z=l*h*p+f*d*u,this._w=l*h*u-f*d*p;break;case"YXZ":this._x=f*h*u+l*d*p,this._y=l*d*u-f*h*p,this._z=l*h*p-f*d*u,this._w=l*h*u+f*d*p;break;case"ZXY":this._x=f*h*u-l*d*p,this._y=l*d*u+f*h*p,this._z=l*h*p+f*d*u,this._w=l*h*u-f*d*p;break;case"ZYX":this._x=f*h*u-l*d*p,this._y=l*d*u+f*h*p,this._z=l*h*p-f*d*u,this._w=l*h*u+f*d*p;break;case"YZX":this._x=f*h*u+l*d*p,this._y=l*d*u+f*h*p,this._z=l*h*p-f*d*u,this._w=l*h*u-f*d*p;break;case"XZY":this._x=f*h*u-l*d*p,this._y=l*d*u-f*h*p,this._z=l*h*p+f*d*u,this._w=l*h*u+f*d*p;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],c=t[5],a=t[9],l=t[2],h=t[6],u=t[10],f=n+c+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-a)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>c&&n>u){let d=2*Math.sqrt(1+n-c-u);this._w=(h-a)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(c>u){let d=2*Math.sqrt(1+c-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(a+h)/d}else{let d=2*Math.sqrt(1+u-n-c);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(a+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,c=t._x,a=t._y,l=t._z,h=t._w;return this._x=n*h+o*c+s*l-r*a,this._y=s*h+o*a+r*c-n*l,this._z=r*h+o*l+n*a-s*c,this._w=o*h-n*c-s*a-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,c=this.dot(e);c<0&&(n=-n,s=-s,r=-r,o=-o,c=-c);let a=1-t;if(c<.9995){let l=Math.acos(c),h=Math.sin(l);a=Math.sin(a*l)/h,t=Math.sin(t*l)/h,this._x=this._x*a+n*t,this._y=this._y*a+s*t,this._z=this._z*a+r*t,this._w=this._w*a+o*t,this._onChangeCallback()}else this._x=this._x*a+n*t,this._y=this._y*a+s*t,this._z=this._z*a+r*t,this._w=this._w*a+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},fu=class fu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Kf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Kf.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,c=e.z,a=e.w,l=2*(o*s-c*n),h=2*(c*t-r*s),u=2*(r*n-o*t);return this.x=t+a*l+o*u-c*h,this.y=n+a*h+c*l-r*u,this.z=s+a*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,c=t.y,a=t.z;return this.x=s*a-r*c,this.y=r*o-n*a,this.z=n*c-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return th.copy(this).projectOnVector(e),this.sub(th)}reflect(e){return this.sub(th.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};fu.prototype.isVector3=!0;var B=fu,th=new B,Kf=new hi,du=class du{constructor(e,t,n,s,r,o,c,a,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,c,a,l)}set(e,t,n,s,r,o,c,a,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=c,h[3]=t,h[4]=r,h[5]=a,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],c=n[3],a=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],p=n[8],y=s[0],m=s[3],g=s[6],S=s[1],A=s[4],v=s[7],b=s[2],M=s[5],_=s[8];return r[0]=o*y+c*S+a*b,r[3]=o*m+c*A+a*M,r[6]=o*g+c*v+a*_,r[1]=l*y+h*S+u*b,r[4]=l*m+h*A+u*M,r[7]=l*g+h*v+u*_,r[2]=f*y+d*S+p*b,r[5]=f*m+d*A+p*M,r[8]=f*g+d*v+p*_,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],c=e[5],a=e[6],l=e[7],h=e[8];return t*o*h-t*c*l-n*r*h+n*c*a+s*r*l-s*o*a}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],c=e[5],a=e[6],l=e[7],h=e[8],u=h*o-c*l,f=c*a-h*r,d=l*r-o*a,p=t*u+n*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return e[0]=u*y,e[1]=(s*l-h*n)*y,e[2]=(c*n-s*o)*y,e[3]=f*y,e[4]=(h*t-s*a)*y,e[5]=(s*r-c*t)*y,e[6]=d*y,e[7]=(n*a-l*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,c){let a=Math.cos(r),l=Math.sin(r);return this.set(n*a,n*l,-n*(a*o+l*c)+o+e,-s*l,s*a,-s*(-l*o+a*c)+c+t,0,0,1),this}scale(e,t){return Ir("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(nh.makeScale(e,t)),this}rotate(e){return Ir("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(nh.makeRotation(-e)),this}translate(e,t){return Ir("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(nh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};du.prototype.isMatrix3=!0;var Ge=du,nh=new Ge,Qf=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ed=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function h0(){let i={enabled:!0,workingColorSpace:Ur,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===lt&&(s.r=Ei(s.r),s.g=Ei(s.g),s.b=Ei(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===lt&&(s.r=Hs(s.r),s.g=Hs(s.g),s.b=Hs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Di?Or:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ur]:{primaries:e,whitePoint:n,transfer:Or,toXYZ:Qf,fromXYZ:ed,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wn},outputColorSpaceConfig:{drawingBufferColorSpace:wn}},[wn]:{primaries:e,whitePoint:n,transfer:lt,toXYZ:Qf,fromXYZ:ed,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wn}}}),i}var nt=h0();function Ei(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Hs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ws,za=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ws===void 0&&(ws=Fr("canvas")),ws.width=e.width,ws.height=e.height;let s=ws.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ws}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Fr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ei(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ei(t[n]/255)*255):t[n]=Ei(t[n]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},u0=0,Ys=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=ar(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,c=s.length;o<c;o++)s[o].isDataTexture?r.push(ih(s[o].image)):r.push(ih(s[o]))}else r=ih(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function ih(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?za.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}var f0=0,sh=new B,yn=class i extends li{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=ci,s=ci,r=dn,o=Ii,c=ni,a=vn,l=i.DEFAULT_ANISOTROPY,h=Di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=ar(),this.name="",this.source=new Ys(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=a,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(sh).x}get height(){return this.source.getSize(sh).y}get depth(){return this.source.getSize(sh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Oa:e.x=e.x-Math.floor(e.x);break;case ci:e.x=e.x<0?0:1;break;case Fa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Oa:e.y=e.y-Math.floor(e.y);break;case ci:e.y=e.y<0?0:1;break;case Fa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=Yh;yn.DEFAULT_ANISOTROPY=1;var pu=class pu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,a=e.elements,l=a[0],h=a[4],u=a[8],f=a[1],d=a[5],p=a[9],y=a[2],m=a[6],g=a[10];if(Math.abs(h-f)<.01&&Math.abs(u-y)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+y)<.1&&Math.abs(p+m)<.1&&Math.abs(l+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(l+1)/2,v=(d+1)/2,b=(g+1)/2,M=(h+f)/4,_=(u+y)/4,x=(p+m)/4;return A>v&&A>b?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=M/n,r=_/n):v>b?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=M/s,r=x/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=_/r,s=x/r),this.set(n,s,r,t),this}let S=Math.sqrt((m-p)*(m-p)+(u-y)*(u-y)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(m-p)/S,this.y=(u-y)/S,this.z=(f-h)/S,this.w=Math.acos((l+d+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};pu.prototype.isVector4=!0;var St=pu,Ha=class extends li{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new yn({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:dn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ys(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Cn=class extends Ha{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Br=class extends yn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=jt,this.minFilter=jt,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ga=class extends yn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=jt,this.minFilter=jt,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var fc=class fc{constructor(e,t,n,s,r,o,c,a,l,h,u,f,d,p,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,c,a,l,h,u,f,d,p,y,m)}set(e,t,n,s,r,o,c,a,l,h,u,f,d,p,y,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=c,g[13]=a,g[2]=l,g[6]=h,g[10]=u,g[14]=f,g[3]=d,g[7]=p,g[11]=y,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fc().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Cs.setFromMatrixColumn(e,0).length(),r=1/Cs.setFromMatrixColumn(e,1).length(),o=1/Cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),c=Math.sin(n),a=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*h,d=o*u,p=c*h,y=c*u;t[0]=a*h,t[4]=-a*u,t[8]=l,t[1]=d+p*l,t[5]=f-y*l,t[9]=-c*a,t[2]=y-f*l,t[6]=p+d*l,t[10]=o*a}else if(e.order==="YXZ"){let f=a*h,d=a*u,p=l*h,y=l*u;t[0]=f+y*c,t[4]=p*c-d,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-c,t[2]=d*c-p,t[6]=y+f*c,t[10]=o*a}else if(e.order==="ZXY"){let f=a*h,d=a*u,p=l*h,y=l*u;t[0]=f-y*c,t[4]=-o*u,t[8]=p+d*c,t[1]=d+p*c,t[5]=o*h,t[9]=y-f*c,t[2]=-o*l,t[6]=c,t[10]=o*a}else if(e.order==="ZYX"){let f=o*h,d=o*u,p=c*h,y=c*u;t[0]=a*h,t[4]=p*l-d,t[8]=f*l+y,t[1]=a*u,t[5]=y*l+f,t[9]=d*l-p,t[2]=-l,t[6]=c*a,t[10]=o*a}else if(e.order==="YZX"){let f=o*a,d=o*l,p=c*a,y=c*l;t[0]=a*h,t[4]=y-f*u,t[8]=p*u+d,t[1]=u,t[5]=o*h,t[9]=-c*h,t[2]=-l*h,t[6]=d*u+p,t[10]=f-y*u}else if(e.order==="XZY"){let f=o*a,d=o*l,p=c*a,y=c*l;t[0]=a*h,t[4]=-u,t[8]=l*h,t[1]=f*u+y,t[5]=o*h,t[9]=d*u-p,t[2]=p*u-d,t[6]=c*h,t[10]=y*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(d0,e,p0)}lookAt(e,t,n){let s=this.elements;return En.subVectors(e,t),En.lengthSq()===0&&(En.z=1),En.normalize(),ki.crossVectors(n,En),ki.lengthSq()===0&&(Math.abs(n.z)===1?En.x+=1e-4:En.z+=1e-4,En.normalize(),ki.crossVectors(n,En)),ki.normalize(),ia.crossVectors(En,ki),s[0]=ki.x,s[4]=ia.x,s[8]=En.x,s[1]=ki.y,s[5]=ia.y,s[9]=En.y,s[2]=ki.z,s[6]=ia.z,s[10]=En.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],c=n[4],a=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],p=n[2],y=n[6],m=n[10],g=n[14],S=n[3],A=n[7],v=n[11],b=n[15],M=s[0],_=s[4],x=s[8],E=s[12],C=s[1],P=s[5],I=s[9],O=s[13],L=s[2],U=s[6],k=s[10],W=s[14],ee=s[3],V=s[7],q=s[11],te=s[15];return r[0]=o*M+c*C+a*L+l*ee,r[4]=o*_+c*P+a*U+l*V,r[8]=o*x+c*I+a*k+l*q,r[12]=o*E+c*O+a*W+l*te,r[1]=h*M+u*C+f*L+d*ee,r[5]=h*_+u*P+f*U+d*V,r[9]=h*x+u*I+f*k+d*q,r[13]=h*E+u*O+f*W+d*te,r[2]=p*M+y*C+m*L+g*ee,r[6]=p*_+y*P+m*U+g*V,r[10]=p*x+y*I+m*k+g*q,r[14]=p*E+y*O+m*W+g*te,r[3]=S*M+A*C+v*L+b*ee,r[7]=S*_+A*P+v*U+b*V,r[11]=S*x+A*I+v*k+b*q,r[15]=S*E+A*O+v*W+b*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],c=e[5],a=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],p=e[3],y=e[7],m=e[11],g=e[15],S=a*d-l*f,A=c*d-l*u,v=c*f-a*u,b=o*d-l*h,M=o*f-a*h,_=o*u-c*h;return t*(y*S-m*A+g*v)-n*(p*S-m*b+g*M)+s*(p*A-y*b+g*_)-r*(p*v-y*M+m*_)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],c=e[9],a=e[2],l=e[6],h=e[10];return t*(o*h-c*l)-n*(r*h-c*a)+s*(r*l-o*a)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],c=e[5],a=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],p=e[12],y=e[13],m=e[14],g=e[15],S=t*c-n*o,A=t*a-s*o,v=t*l-r*o,b=n*a-s*c,M=n*l-r*c,_=s*l-r*a,x=h*y-u*p,E=h*m-f*p,C=h*g-d*p,P=u*m-f*y,I=u*g-d*y,O=f*g-d*m,L=S*O-A*I+v*P+b*C-M*E+_*x;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/L;return e[0]=(c*O-a*I+l*P)*U,e[1]=(s*I-n*O-r*P)*U,e[2]=(y*_-m*M+g*b)*U,e[3]=(f*M-u*_-d*b)*U,e[4]=(a*C-o*O-l*E)*U,e[5]=(t*O-s*C+r*E)*U,e[6]=(m*v-p*_-g*A)*U,e[7]=(h*_-f*v+d*A)*U,e[8]=(o*I-c*C+l*x)*U,e[9]=(n*C-t*I-r*x)*U,e[10]=(p*M-y*v+g*S)*U,e[11]=(u*v-h*M-d*S)*U,e[12]=(c*E-o*P-a*x)*U,e[13]=(t*P-n*E+s*x)*U,e[14]=(y*A-p*b-m*S)*U,e[15]=(h*b-u*A+f*S)*U,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,c=e.y,a=e.z,l=r*o,h=r*c;return this.set(l*o+n,l*c-s*a,l*a+s*c,0,l*c+s*a,h*c+n,h*a-s*o,0,l*a-s*c,h*a+s*o,r*a*a+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,c=t._z,a=t._w,l=r+r,h=o+o,u=c+c,f=r*l,d=r*h,p=r*u,y=o*h,m=o*u,g=c*u,S=a*l,A=a*h,v=a*u,b=n.x,M=n.y,_=n.z;return s[0]=(1-(y+g))*b,s[1]=(d+v)*b,s[2]=(p-A)*b,s[3]=0,s[4]=(d-v)*M,s[5]=(1-(f+g))*M,s[6]=(m+S)*M,s[7]=0,s[8]=(p+A)*_,s[9]=(m-S)*_,s[10]=(1-(f+y))*_,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Cs.set(s[0],s[1],s[2]).length(),c=Cs.set(s[4],s[5],s[6]).length(),a=Cs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Jn.copy(this);let l=1/o,h=1/c,u=1/a;return Jn.elements[0]*=l,Jn.elements[1]*=l,Jn.elements[2]*=l,Jn.elements[4]*=h,Jn.elements[5]*=h,Jn.elements[6]*=h,Jn.elements[8]*=u,Jn.elements[9]*=u,Jn.elements[10]*=u,t.setFromRotationMatrix(Jn),n.x=o,n.y=c,n.z=a,this}makePerspective(e,t,n,s,r,o,c=zn,a=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s),p,y;if(a)p=r/(o-r),y=o*r/(o-r);else if(c===zn)p=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(c===Xs)p=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,c=zn,a=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s),p,y;if(a)p=1/(o-r),y=o/(o-r);else if(c===zn)p=-2/(o-r),y=-(o+r)/(o-r);else if(c===Xs)p=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};fc.prototype.isMatrix4=!0;var ot=fc,Cs=new B,Jn=new ot,d0=new B(0,0,0),p0=new B(1,1,1),ki=new B,ia=new B,En=new B,td=new ot,nd=new hi,Qn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],c=s[8],a=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,d),this._z=Math.atan2(a,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(a,r));break;case"ZYX":this._y=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(a,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(c,d));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return td.makeRotationFromQuaternion(e),this.setFromRotationMatrix(td,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return nd.setFromEuler(this),this.setFromQuaternion(nd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qn.DEFAULT_ORDER="XYZ";var kr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},m0=0,id=new B,Rs=new hi,vi=new ot,sa=new B,Tr=new B,g0=new B,_0=new hi,sd=new B(1,0,0),rd=new B(0,1,0),od=new B(0,0,1),ad={type:"added"},x0={type:"removed"},Ps={type:"childadded",child:null},rh={type:"childremoved",child:null},zt=class i extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:m0++}),this.uuid=ar(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new B,t=new Qn,n=new hi,s=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ge}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.multiply(Rs),this}rotateOnWorldAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.premultiply(Rs),this}rotateX(e){return this.rotateOnAxis(sd,e)}rotateY(e){return this.rotateOnAxis(rd,e)}rotateZ(e){return this.rotateOnAxis(od,e)}translateOnAxis(e,t){return id.copy(e).applyQuaternion(this.quaternion),this.position.add(id.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(sd,e)}translateY(e){return this.translateOnAxis(rd,e)}translateZ(e){return this.translateOnAxis(od,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?sa.copy(e):sa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(Tr,sa,this.up):vi.lookAt(sa,Tr,this.up),this.quaternion.setFromRotationMatrix(vi),s&&(vi.extractRotation(s.matrixWorld),Rs.setFromRotationMatrix(vi),this.quaternion.premultiply(Rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ad),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null):ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(x0),rh.child=e,this.dispatchEvent(rh),rh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ad),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,e,g0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,_0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,c=r.length;o<c;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,a){return c[a.uuid]===void 0&&(c[a.uuid]=a.toJSON(e)),a.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let a=c.shapes;if(Array.isArray(a))for(let l=0,h=a.length;l<h;l++){let u=a[l];r(e.shapes,u)}else r(e.shapes,a)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let a=0,l=this.material.length;a<l;a++)c.push(r(e.materials,this.material[a]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){let a=this.animations[c];s.animations.push(r(e.animations,a))}}if(t){let c=o(e.geometries),a=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),p=o(e.nodes);c.length>0&&(n.geometries=c),a.length>0&&(n.materials=a),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(c){let a=[];for(let l in c){let h=c[l];delete h.metadata,a.push(h)}return a}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};zt.DEFAULT_UP=new B(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var xn=class extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}},y0={type:"move"},js=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,c=this._targetRay,a=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),g=this._getHandJoint(l,y);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,p=.005;l.inputState.pinching&&f>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else a!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,a.eventsEnabled&&a.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(y0)))}return c!==null&&(c.visible=s!==null),a!==null&&(a.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new xn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},pp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},ra={h:0,s:0,l:0};function oh(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var He=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=nt.workingColorSpace){if(e=a0(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=oh(o,r,e+1/3),this.g=oh(o,r,e),this.b=oh(o,r,e-1/3)}return nt.colorSpaceToWorking(this,s),this}setStyle(e,t=wn){function n(r){r!==void 0&&parseFloat(r)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],c=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(c))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wn){let n=pp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}copyLinearToSRGB(e){return this.r=Hs(e.r),this.g=Hs(e.g),this.b=Hs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wn){return nt.workingToColorSpace(rn.copy(this),e),Math.round(Ke(rn.r*255,0,255))*65536+Math.round(Ke(rn.g*255,0,255))*256+Math.round(Ke(rn.b*255,0,255))}getHexString(e=wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(rn.copy(this),t);let n=rn.r,s=rn.g,r=rn.b,o=Math.max(n,s,r),c=Math.min(n,s,r),a,l,h=(c+o)/2;if(c===o)a=0,l=0;else{let u=o-c;switch(l=h<=.5?u/(o+c):u/(2-o-c),o){case n:a=(s-r)/u+(s<r?6:0);break;case s:a=(r-n)/u+2;break;case r:a=(n-s)/u+4;break}a/=6}return e.h=a,e.s=l,e.l=h,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(rn.copy(this),t),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e=wn){nt.workingToColorSpace(rn.copy(this),e);let t=rn.r,n=rn.g,s=rn.b;return e!==wn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(zi),this.setHSL(zi.h+e,zi.s+t,zi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zi),e.getHSL(ra);let n=eh(zi.h,ra.h,t),s=eh(zi.s,ra.s,t),r=eh(zi.l,ra.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},rn=new He;He.NAMES=pp;var zr=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new He(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Hr=class extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Zn=new B,Si=new B,ah=new B,Mi=new B,Is=new B,Ls=new B,cd=new B,ch=new B,lh=new B,hh=new B,uh=new St,fh=new St,dh=new St,Wi=class i{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Zn.subVectors(e,t),s.cross(Zn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Zn.subVectors(s,t),Si.subVectors(n,t),ah.subVectors(e,t);let o=Zn.dot(Zn),c=Zn.dot(Si),a=Zn.dot(ah),l=Si.dot(Si),h=Si.dot(ah),u=o*l-c*c;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*a-c*h)*f,p=(o*h-c*a)*f;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Mi)===null?!1:Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getInterpolation(e,t,n,s,r,o,c,a){return this.getBarycoord(e,t,n,s,Mi)===null?(a.x=0,a.y=0,"z"in a&&(a.z=0),"w"in a&&(a.w=0),null):(a.setScalar(0),a.addScaledVector(r,Mi.x),a.addScaledVector(o,Mi.y),a.addScaledVector(c,Mi.z),a)}static getInterpolatedAttribute(e,t,n,s,r,o){return uh.setScalar(0),fh.setScalar(0),dh.setScalar(0),uh.fromBufferAttribute(e,t),fh.fromBufferAttribute(e,n),dh.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(uh,r.x),o.addScaledVector(fh,r.y),o.addScaledVector(dh,r.z),o}static isFrontFacing(e,t,n,s){return Zn.subVectors(n,t),Si.subVectors(e,t),Zn.cross(Si).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zn.subVectors(this.c,this.b),Si.subVectors(this.a,this.b),Zn.cross(Si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,c;Is.subVectors(s,n),Ls.subVectors(r,n),ch.subVectors(e,n);let a=Is.dot(ch),l=Ls.dot(ch);if(a<=0&&l<=0)return t.copy(n);lh.subVectors(e,s);let h=Is.dot(lh),u=Ls.dot(lh);if(h>=0&&u<=h)return t.copy(s);let f=a*u-h*l;if(f<=0&&a>=0&&h<=0&&a-h>0)return o=a/(a-h),t.copy(n).addScaledVector(Is,o);hh.subVectors(e,r);let d=Is.dot(hh),p=Ls.dot(hh);if(p>=0&&d<=p)return t.copy(r);let y=d*l-a*p;if(y<=0&&l>=0&&p<=0)return c=l/(l-p),t.copy(n).addScaledVector(Ls,c);let m=h*p-d*u;if(m<=0&&u-h>=0&&d-p>=0)return cd.subVectors(r,s),c=(u-h)/(u-h+(d-p)),t.copy(s).addScaledVector(cd,c);let g=1/(m+y+f);return o=y*g,c=f*g,t.copy(n).addScaledVector(Is,o).addScaledVector(Ls,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ui=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint($n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint($n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=$n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,c=r.count;o<c;o++)e.isMesh===!0?e.getVertexPosition(o,$n):$n.fromBufferAttribute(r,o),$n.applyMatrix4(e.matrixWorld),this.expandByPoint($n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),oa.copy(n.boundingBox)),oa.applyMatrix4(e.matrixWorld),this.union(oa)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$n),$n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Er),aa.subVectors(this.max,Er),Ds.subVectors(e.a,Er),Ns.subVectors(e.b,Er),Us.subVectors(e.c,Er),Hi.subVectors(Ns,Ds),Gi.subVectors(Us,Ns),cs.subVectors(Ds,Us);let t=[0,-Hi.z,Hi.y,0,-Gi.z,Gi.y,0,-cs.z,cs.y,Hi.z,0,-Hi.x,Gi.z,0,-Gi.x,cs.z,0,-cs.x,-Hi.y,Hi.x,0,-Gi.y,Gi.x,0,-cs.y,cs.x,0];return!ph(t,Ds,Ns,Us,aa)||(t=[1,0,0,0,1,0,0,0,1],!ph(t,Ds,Ns,Us,aa))?!1:(ca.crossVectors(Hi,Gi),t=[ca.x,ca.y,ca.z],ph(t,Ds,Ns,Us,aa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},bi=[new B,new B,new B,new B,new B,new B,new B,new B],$n=new B,oa=new ui,Ds=new B,Ns=new B,Us=new B,Hi=new B,Gi=new B,cs=new B,Er=new B,aa=new B,ca=new B,ls=new B;function ph(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ls.fromArray(i,r);let c=s.x*Math.abs(ls.x)+s.y*Math.abs(ls.y)+s.z*Math.abs(ls.z),a=e.dot(ls),l=t.dot(ls),h=n.dot(ls);if(Math.max(-Math.max(a,l,h),Math.min(a,l,h))>c)return!1}return!0}var Lt=new B,la=new Se,v0=0,Dt=class extends li{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:v0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=cp,this.updateRanges=[],this.gpuType=Wn,this.version=0,this._normalizationScale=e!==void 0?ru(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)la.fromBufferAttribute(this,t),la.applyMatrix3(e),this.setXY(t,la.x,la.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):c0(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):l0(e,this.array)}};var Gr=class extends Dt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Vr=class extends Dt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var st=class extends Dt{constructor(e,t,n){super(new Float32Array(e),t,n)}},S0=new ui,Ar=new B,mh=new B,wi=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):S0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ar.subVectors(e,this.center);let t=Ar.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ar,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(mh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ar.copy(e.center).add(mh)),this.expandByPoint(Ar.copy(e.center).sub(mh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},M0=0,kn=new ot,gh=new zt,Os=new B,An=new ui,wr=new ui,Yt=new B,Ct=class i extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=ar(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(r0(e)?Vr:Gr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ge().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return kn.makeRotationFromQuaternion(e),this.applyMatrix4(kn),this}rotateX(e){return kn.makeRotationX(e),this.applyMatrix4(kn),this}rotateY(e){return kn.makeRotationY(e),this.applyMatrix4(kn),this}rotateZ(e){return kn.makeRotationZ(e),this.applyMatrix4(kn),this}translate(e,t,n){return kn.makeTranslation(e,t,n),this.applyMatrix4(kn),this}scale(e,t,n){return kn.makeScale(e,t,n),this.applyMatrix4(kn),this}lookAt(e){return gh.lookAt(e),gh.updateMatrix(),this.applyMatrix4(gh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Os).negate(),this.translate(Os.x,Os.y,Os.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new st(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];An.setFromBufferAttribute(r),this.morphTargetsRelative?(Yt.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(Yt),Yt.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(Yt)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(An.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let c=t[r];wr.setFromBufferAttribute(c),this.morphTargetsRelative?(Yt.addVectors(An.min,wr.min),An.expandByPoint(Yt),Yt.addVectors(An.max,wr.max),An.expandByPoint(Yt)):(An.expandByPoint(wr.min),An.expandByPoint(wr.max))}An.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Yt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Yt));if(t)for(let r=0,o=t.length;r<o;r++){let c=t[r],a=this.morphTargetsRelative;for(let l=0,h=c.count;l<h;l++)Yt.fromBufferAttribute(c,l),a&&(Os.fromBufferAttribute(e,l),Yt.add(Os)),s=Math.max(s,n.distanceToSquared(Yt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Dt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let c=[],a=[],l=new Uint8Array(n.count);for(let E=0;E<n.count;E++)c[E]=new B,a[E]=new B;let h=new B,u=new B,f=new B,d=new Se,p=new Se,y=new Se,m=new B,g=new B;function S(E,C,P){l[E]=l[C]=l[P]=1,h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,C),f.fromBufferAttribute(n,P),d.fromBufferAttribute(r,E),p.fromBufferAttribute(r,C),y.fromBufferAttribute(r,P),u.sub(h),f.sub(h),p.sub(d),y.sub(d);let I=1/(p.x*y.y-y.x*p.y);isFinite(I)&&(m.copy(u).multiplyScalar(y.y).addScaledVector(f,-p.y).multiplyScalar(I),g.copy(f).multiplyScalar(p.x).addScaledVector(u,-y.x).multiplyScalar(I),c[E].add(m),c[C].add(m),c[P].add(m),a[E].add(g),a[C].add(g),a[P].add(g))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let E=0,C=A.length;E<C;++E){let P=A[E],I=P.start,O=P.count;for(let L=I,U=I+O;L<U;L+=3)S(e.getX(L+0),e.getX(L+1),e.getX(L+2))}let v=new B,b=new B,M=new B,_=new B;function x(E){M.fromBufferAttribute(s,E),_.copy(M);let C=c[E];v.copy(C),v.sub(M.multiplyScalar(M.dot(C))).normalize(),b.crossVectors(_,C);let I=b.dot(a[E])<0?-1:1;o.setXYZW(E,v.x,v.y,v.z,I)}for(let E=0,C=n.count;E<C;++E)l[E]&&x(E);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Dt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new B,r=new B,o=new B,c=new B,a=new B,l=new B,h=new B,u=new B;if(e)for(let f=0,d=e.count;f<d;f+=3){let p=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),c.fromBufferAttribute(n,p),a.fromBufferAttribute(n,y),l.fromBufferAttribute(n,m),c.add(h),a.add(h),l.add(h),n.setXYZ(p,c.x,c.y,c.z),n.setXYZ(y,a.x,a.y,a.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Yt.fromBufferAttribute(e,t),Yt.normalize(),e.setXYZ(t,Yt.x,Yt.y,Yt.z)}toNonIndexed(){function e(c,a){let l=c.array,h=c.itemSize,u=c.normalized,f=new l.constructor(a.length*h),d=0,p=0;for(let y=0,m=a.length;y<m;y++){c.isInterleavedBufferAttribute?d=a[y]*c.data.stride+c.offset:d=a[y]*h;for(let g=0;g<h;g++)f[p++]=l[d++]}return new Dt(f,h,u)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let c in s){let a=s[c],l=e(a,n);t.setAttribute(c,l)}let r=this.morphAttributes;for(let c in r){let a=[],l=r[c];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=e(f,n);a.push(d)}t.morphAttributes[c]=a}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let c=0,a=o.length;c<a;c++){let l=o[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let a=this.parameters;for(let l in a)a[l]!==void 0&&(e[l]=a[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let a in n){let l=n[a];e.data.attributes[a]=l.toJSON(e.data)}let s={},r=!1;for(let a in this.morphAttributes){let l=this.morphAttributes[a],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(s[a]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());let a=e.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var _h=new B,b0=new B,T0=new Ge,Kn=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=_h.subVectors(n,t).cross(b0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(_h),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||T0.getNormalMatrix(e),s=this.coplanarPoint(_h).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},E0=0,Ci=class extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:E0++}),this.uuid=ar(),this.name="",this.type="Material",this.blending=ir,this.side=Zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bh,this.blendDst=kh,this.blendEquation=ps,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=Vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=np,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ra,this.stencilZFail=Ra,this.stencilZPass=Ra,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let c in r){let a=r[c];delete a.metadata,o.push(a)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new He().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Kn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Se().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Se().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Ti=new B,xh=new B,ha=new B,ua=new B,Wr=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ti.copy(this.origin).addScaledVector(this.direction,t),Ti.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){xh.copy(e).add(t).multiplyScalar(.5),ha.copy(t).sub(e).normalize(),ua.copy(this.origin).sub(xh);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ha),c=ua.dot(this.direction),a=-ua.dot(ha),l=ua.lengthSq(),h=Math.abs(1-o*o),u,f,d,p;if(h>0)if(u=o*a-c,f=o*c-a,p=r*h,u>=0)if(f>=-p)if(f<=p){let y=1/h;u*=y,f*=y,d=u*(u+o*f+2*c)+f*(o*u+f+2*a)+l}else f=r,u=Math.max(0,-(o*f+c)),d=-u*u+f*(f+2*a)+l;else f=-r,u=Math.max(0,-(o*f+c)),d=-u*u+f*(f+2*a)+l;else f<=-p?(u=Math.max(0,-(-o*r+c)),f=u>0?-r:Math.min(Math.max(-r,-a),r),d=-u*u+f*(f+2*a)+l):f<=p?(u=0,f=Math.min(Math.max(-r,-a),r),d=f*(f+2*a)+l):(u=Math.max(0,-(o*r+c)),f=u>0?r:Math.min(Math.max(-r,-a),r),d=-u*u+f*(f+2*a)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+c)),d=-u*u+f*(f+2*a)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(xh).addScaledVector(ha,f),d}intersectSphere(e,t){if(e.radius<0)return null;Ti.subVectors(e.center,this.origin);let n=Ti.dot(this.direction),s=Ti.dot(Ti)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),c=n-o,a=n+o;return a<0?null:c<0?this.at(a,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,c,a,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(c=(e.min.z-f.z)*u,a=(e.max.z-f.z)*u):(c=(e.max.z-f.z)*u,a=(e.min.z-f.z)*u),n>a||c>s)||((c>n||n!==n)&&(n=c),(a<s||s!==s)&&(s=a),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ti)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,c=this.direction,a=c.x,l=c.y,h=c.z,u=e.x-o.x,f=e.y-o.y,d=e.z-o.z,p=t.x-o.x,y=t.y-o.y,m=t.z-o.z,g=n.x-o.x,S=n.y-o.y,A=n.z-o.z,v=Math.abs(a),b=Math.abs(l),M=Math.abs(h),_,x,E,C,P,I,O,L,U,k,W,ee;if(v>=b&&v>=M?(E=a,I=u,U=p,ee=g,a>=0?(_=l,x=h,C=f,P=d,O=y,L=m,k=S,W=A):(_=h,x=l,C=d,P=f,O=m,L=y,k=A,W=S)):b>=M?(E=l,I=f,U=y,ee=S,l>=0?(_=h,x=a,C=d,P=u,O=m,L=p,k=A,W=g):(_=a,x=h,C=u,P=d,O=p,L=m,k=g,W=A)):(E=h,I=d,U=m,ee=A,h>=0?(_=a,x=l,C=u,P=f,O=p,L=y,k=g,W=S):(_=l,x=a,C=f,P=u,O=y,L=p,k=S,W=g)),E===0)return null;let V=_/E,q=x/E,te=1/E,ue=C-V*I,Pe=P-q*I,J=O-V*U,ge=L-q*U,Me=k-V*ee,Re=W-q*ee,ye=Me*ge-Re*J,Ye=ue*Re-Pe*Me,Rt=J*Pe-ge*ue;if(s){if(ye<0||Ye<0||Rt<0)return null}else if((ye<0||Ye<0||Rt<0)&&(ye>0||Ye>0||Rt>0))return null;let Fe=ye+Ye+Rt;if(Fe===0)return null;let ht=te*(ye*I+Ye*U+Rt*ee);return(Fe>0?ht<0:ht>0)?null:this.at(ht/Fe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Et=class extends Ci{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=pc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ld=new ot,hs=new Wr,fa=new wi,hd=new B,da=new B,pa=new B,ma=new B,yh=new B,ga=new B,ud=new B,_a=new B,Ve=class extends zt{constructor(e=new Ct,t=new Et){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let c=this.morphTargetInfluences;if(r&&c){ga.set(0,0,0);for(let a=0,l=r.length;a<l;a++){let h=c[a],u=r[a];h!==0&&(yh.fromBufferAttribute(u,e),o?ga.addScaledVector(yh,h):ga.addScaledVector(yh.sub(t),h))}t.add(ga)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fa.copy(n.boundingSphere),fa.applyMatrix4(r),hs.copy(e.ray).recast(e.near),!(fa.containsPoint(hs.origin)===!1&&(hs.intersectSphere(fa,hd)===null||hs.origin.distanceToSquared(hd)>(e.far-e.near)**2))&&(ld.copy(r).invert(),hs.copy(e.ray).applyMatrix4(ld),!(n.boundingBox!==null&&hs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,hs)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,c=r.index,a=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(c!==null)if(Array.isArray(o))for(let p=0,y=f.length;p<y;p++){let m=f[p],g=o[m.materialIndex],S=Math.max(m.start,d.start),A=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let v=S,b=A;v<b;v+=3){let M=c.getX(v),_=c.getX(v+1),x=c.getX(v+2);s=xa(this,g,e,n,l,h,u,M,_,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),y=Math.min(c.count,d.start+d.count);for(let m=p,g=y;m<g;m+=3){let S=c.getX(m),A=c.getX(m+1),v=c.getX(m+2);s=xa(this,o,e,n,l,h,u,S,A,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(a!==void 0)if(Array.isArray(o))for(let p=0,y=f.length;p<y;p++){let m=f[p],g=o[m.materialIndex],S=Math.max(m.start,d.start),A=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=S,b=A;v<b;v+=3){let M=v,_=v+1,x=v+2;s=xa(this,g,e,n,l,h,u,M,_,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),y=Math.min(a.count,d.start+d.count);for(let m=p,g=y;m<g;m+=3){let S=m,A=m+1,v=m+2;s=xa(this,o,e,n,l,h,u,S,A,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function A0(i,e,t,n,s,r,o,c){let a;if(e.side===pn?a=n.intersectTriangle(o,r,s,!0,c):a=n.intersectTriangle(s,r,o,e.side===Zi,c),a===null)return null;_a.copy(c),_a.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(_a);return l<t.near||l>t.far?null:{distance:l,point:_a.clone(),object:i}}function xa(i,e,t,n,s,r,o,c,a,l){i.getVertexPosition(c,da),i.getVertexPosition(a,pa),i.getVertexPosition(l,ma);let h=A0(i,e,t,n,da,pa,ma,ud);if(h){let u=new B;Wi.getBarycoord(ud,da,pa,ma,u),s&&(h.uv=Wi.getInterpolatedAttribute(s,c,a,l,u,new Se)),r&&(h.uv1=Wi.getInterpolatedAttribute(r,c,a,l,u,new Se)),o&&(h.normal=Wi.getInterpolatedAttribute(o,c,a,l,u,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:c,b:a,c:l,normal:new B,materialIndex:0};Wi.getNormal(da,pa,ma,f.normal),h.face=f,h.barycoord=u}return h}var Xr=class extends yn{constructor(e=null,t=1,n=1,s,r,o,c,a,l=jt,h=jt,u,f){super(null,o,c,a,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Js=class extends Dt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Fs=new ot,fd=new ot,ya=[],dd=new ui,w0=new ot,Cr=new Ve,Rr=new wi,qr=class extends Ve{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Js(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,w0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fs),dd.copy(e.boundingBox).applyMatrix4(Fs),this.boundingBox.union(dd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new wi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fs),Rr.copy(e.boundingSphere).applyMatrix4(Fs),this.boundingSphere.union(Rr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let c=0;c<n.length;c++)n[c]=s[o+c]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Cr.geometry=this.geometry,Cr.material=this.material,Cr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rr.copy(this.boundingSphere),Rr.applyMatrix4(n),e.ray.intersectsSphere(Rr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Fs),fd.multiplyMatrices(n,Fs),Cr.matrixWorld=fd,Cr.raycast(e,ya);for(let o=0,c=ya.length;o<c;o++){let a=ya[o];a.instanceId=r,a.object=this,t.push(a)}ya.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Js(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Xr(new Float32Array(s*this.count),s,this.count,Sc,Wn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let c=this.geometry.morphTargetsRelative?1:1-o,a=s*e;return r[a]=c,r.set(n,a+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},us=new wi,C0=new Se(.5,.5),va=new B,Xi=class{constructor(e=new Kn,t=new Kn,n=new Kn,s=new Kn,r=new Kn,o=new Kn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(s),c[4].copy(r),c[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn,n=!1){let s=this.planes,r=e.elements,o=r[0],c=r[1],a=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],p=r[8],y=r[9],m=r[10],g=r[11],S=r[12],A=r[13],v=r[14],b=r[15];if(s[0].setComponents(l-o,d-h,g-p,b-S).normalize(),s[1].setComponents(l+o,d+h,g+p,b+S).normalize(),s[2].setComponents(l+c,d+u,g+y,b+A).normalize(),s[3].setComponents(l-c,d-u,g-y,b-A).normalize(),n)s[4].setComponents(a,f,m,v).normalize(),s[5].setComponents(l-a,d-f,g-m,b-v).normalize();else if(s[4].setComponents(l-a,d-f,g-m,b-v).normalize(),t===zn)s[5].setComponents(l+a,d+f,g+m,b+v).normalize();else if(t===Xs)s[5].setComponents(a,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),us.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),us.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(us)}intersectsSprite(e){us.center.set(0,0,0);let t=C0.distanceTo(e.center);return us.radius=.7071067811865476+t,us.applyMatrix4(e.matrixWorld),this.intersectsSphere(us)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(va.x=s.normal.x>0?e.max.x:e.min.x,va.y=s.normal.y>0?e.max.y:e.min.y,va.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(va)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},pd=new ot,Va=class i{constructor(){this.coordinateSystem=zn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];pd.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Xi),n[s].setFromProjectionMatrix(pd,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Xi),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var Wa=class extends Ci{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},md=new ot,Ch=new Wr,Sa=new wi,Ma=new B,Yr=class extends zt{constructor(e=new Ct,t=new Wa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sa.copy(n.boundingSphere),Sa.applyMatrix4(s),Sa.radius+=r,e.ray.intersectsSphere(Sa)===!1)return;md.copy(s).invert(),Ch.copy(e.ray).applyMatrix4(md);let c=r/((this.scale.x+this.scale.y+this.scale.z)/3),a=c*c,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let p=f,y=d;p<y;p++){let m=l.getX(p);Ma.fromBufferAttribute(u,m),gd(Ma,m,a,s,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let p=f,y=d;p<y;p++)Ma.fromBufferAttribute(u,p),gd(Ma,p,a,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}};function gd(i,e,t,n,s,r,o){let c=Ch.distanceSqToPoint(i);if(c<t){let a=new B;Ch.closestPointToPoint(i,a),a.applyMatrix4(n);let l=s.ray.origin.distanceTo(a);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(c),point:a,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var jr=class extends yn{constructor(e=[],t=ms,n,s,r,o,c,a,l,h){super(e,t,n,s,r,o,c,a,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Ri=class extends yn{constructor(e,t,n=ei,s,r,o,c=jt,a=jt,l,h=Ai,u=1){if(h!==Ai&&h!==Li)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,o,c,a,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ys(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Jr=class extends Ri{constructor(e,t=ei,n=ms,s,r,o=jt,c=jt,a,l=Ai){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,c,a,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Zr=class extends yn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},at=class i extends Ct{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let c=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let a=[],l=[],h=[],u=[],f=0,d=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,s,o,2),p("x","z","y",1,-1,e,n,-t,s,o,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(a),this.setAttribute("position",new st(l,3)),this.setAttribute("normal",new st(h,3)),this.setAttribute("uv",new st(u,2));function p(y,m,g,S,A,v,b,M,_,x,E){let C=v/_,P=b/x,I=v/2,O=b/2,L=M/2,U=_+1,k=x+1,W=0,ee=0,V=new B;for(let q=0;q<k;q++){let te=q*P-O;for(let ue=0;ue<U;ue++){let Pe=ue*C-I;V[y]=Pe*S,V[m]=te*A,V[g]=L,l.push(V.x,V.y,V.z),V[y]=0,V[m]=0,V[g]=M>0?1:-1,h.push(V.x,V.y,V.z),u.push(ue/_),u.push(1-q/x),W+=1}}for(let q=0;q<x;q++)for(let te=0;te<_;te++){let ue=f+te+U*q,Pe=f+te+U*(q+1),J=f+(te+1)+U*(q+1),ge=f+(te+1)+U*q;a.push(ue,Pe,ge),a.push(Pe,J,ge),ee+=6}c.addGroup(d,ee,E),d+=ee,f+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Zs=class i extends Ct{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],c=[],a=[],l=new B,h=new Se;o.push(0,0,0),c.push(0,0,1),a.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let d=n+u/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),o.push(l.x,l.y,l.z),c.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,a.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new st(o,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},At=class i extends Ct{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,c=0,a=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:c,thetaLength:a};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],p=0,y=[],m=n/2,g=0;S(),o===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new st(u,3)),this.setAttribute("normal",new st(f,3)),this.setAttribute("uv",new st(d,2));function S(){let v=new B,b=new B,M=0,_=(t-e)/n;for(let x=0;x<=r;x++){let E=[],C=x/r,P=C*(t-e)+e;for(let I=0;I<=s;I++){let O=I/s,L=O*a+c,U=Math.sin(L),k=Math.cos(L);b.x=P*U,b.y=-C*n+m,b.z=P*k,u.push(b.x,b.y,b.z),v.set(U,_,k).normalize(),f.push(v.x,v.y,v.z),d.push(O,1-C),E.push(p++)}y.push(E)}for(let x=0;x<s;x++)for(let E=0;E<r;E++){let C=y[E][x],P=y[E+1][x],I=y[E+1][x+1],O=y[E][x+1];(e>0||E!==0)&&(h.push(C,P,O),M+=3),(t>0||E!==r-1)&&(h.push(P,I,O),M+=3)}l.addGroup(g,M,0),g+=M}function A(v){let b=p,M=new Se,_=new B,x=0,E=v===!0?e:t,C=v===!0?1:-1;for(let I=1;I<=s;I++)u.push(0,m*C,0),f.push(0,C,0),d.push(.5,.5),p++;let P=p;for(let I=0;I<=s;I++){let L=I/s*a+c,U=Math.cos(L),k=Math.sin(L);_.x=E*k,_.y=m*C,_.z=E*U,u.push(_.x,_.y,_.z),f.push(0,C,0),M.x=U*.5+.5,M.y=k*.5*C+.5,d.push(M.x,M.y),p++}for(let I=0;I<s;I++){let O=b+I,L=P+I;v===!0?h.push(L,L+1,O):h.push(L+1,L,O),x+=3}l.addGroup(g,x,v===!0?1:2),g+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Hn=class i extends At{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,c=Math.PI*2){super(0,e,t,n,s,r,o,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:c}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},$r=class i extends Ct{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];c(s),l(n),h(),this.setAttribute("position",new st(r,3)),this.setAttribute("normal",new st(r.slice(),3)),this.setAttribute("uv",new st(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function c(S){let A=new B,v=new B,b=new B;for(let M=0;M<t.length;M+=3)d(t[M+0],A),d(t[M+1],v),d(t[M+2],b),a(A,v,b,S)}function a(S,A,v,b){let M=b+1,_=[];for(let x=0;x<=M;x++){_[x]=[];let E=S.clone().lerp(v,x/M),C=A.clone().lerp(v,x/M),P=M-x;for(let I=0;I<=P;I++)I===0&&x===M?_[x][I]=E:_[x][I]=E.clone().lerp(C,I/P)}for(let x=0;x<M;x++)for(let E=0;E<2*(M-x)-1;E++){let C=Math.floor(E/2);E%2===0?(f(_[x][C+1]),f(_[x+1][C]),f(_[x][C])):(f(_[x][C+1]),f(_[x+1][C+1]),f(_[x+1][C]))}}function l(S){let A=new B;for(let v=0;v<r.length;v+=3)A.x=r[v+0],A.y=r[v+1],A.z=r[v+2],A.normalize().multiplyScalar(S),r[v+0]=A.x,r[v+1]=A.y,r[v+2]=A.z}function h(){let S=new B;for(let A=0;A<r.length;A+=3){S.x=r[A+0],S.y=r[A+1],S.z=r[A+2];let v=m(S)/2/Math.PI+.5,b=g(S)/Math.PI+.5;o.push(v,1-b)}p(),u()}function u(){for(let S=0;S<o.length;S+=6){let A=o[S+0],v=o[S+2],b=o[S+4],M=Math.max(A,v,b),_=Math.min(A,v,b);M>.9&&_<.1&&(A<.2&&(o[S+0]+=1),v<.2&&(o[S+2]+=1),b<.2&&(o[S+4]+=1))}}function f(S){r.push(S.x,S.y,S.z)}function d(S,A){let v=S*3;A.x=e[v+0],A.y=e[v+1],A.z=e[v+2]}function p(){let S=new B,A=new B,v=new B,b=new B,M=new Se,_=new Se,x=new Se;for(let E=0,C=0;E<r.length;E+=9,C+=6){S.set(r[E+0],r[E+1],r[E+2]),A.set(r[E+3],r[E+4],r[E+5]),v.set(r[E+6],r[E+7],r[E+8]),M.set(o[C+0],o[C+1]),_.set(o[C+2],o[C+3]),x.set(o[C+4],o[C+5]),b.copy(S).add(A).add(v).divideScalar(3);let P=m(b);y(M,C+0,S,P),y(_,C+2,A,P),y(x,C+4,v,P)}}function y(S,A,v,b){b<0&&S.x===1&&(o[A]=S.x-1),v.x===0&&v.z===0&&(o[A]=b/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function g(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},$s=class i extends $r{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Rn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Oe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let c=0,a=r-1,l;for(;c<=a;)if(s=Math.floor(c+(a-c)/2),l=n[s]-o,l<0)c=s+1;else if(l>0)a=s-1;else{a=s;break}if(s=a,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),c=this.getPoint(r),a=t||(o.isVector2?new Se:new B);return a.copy(c).sub(o).normalize(),a}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new B,s=[],r=[],o=[],c=new B,a=new ot;for(let d=0;d<=e;d++){let p=d/e;s[d]=this.getTangentAt(p,new B)}r[0]=new B,o[0]=new B;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],c),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),c.crossVectors(s[d-1],s[d]),c.length()>Number.EPSILON){c.normalize();let p=Math.acos(Ke(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(a.makeRotationAxis(c,p))}o[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(Ke(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(c.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(a.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Ks=class extends Rn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,c=!1,a=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=c,this.aRotation=a}getPoint(e,t=new Se){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let c=this.aStartAngle+e*r,a=this.aX+this.xRadius*Math.cos(c),l=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=a-this.aX,d=l-this.aY;a=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(a,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Xa=class extends Ks{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function ou(){let i=0,e=0,t=0,n=0;function s(r,o,c,a){i=r,e=c,t=-3*r+3*o-2*c-a,n=2*r-2*o+c+a}return{initCatmullRom:function(r,o,c,a,l){s(o,c,l*(c-r),l*(a-o))},initNonuniformCatmullRom:function(r,o,c,a,l,h,u){let f=(o-r)/l-(c-r)/(l+h)+(c-o)/h,d=(c-o)/h-(a-o)/(h+u)+(a-c)/u;f*=h,d*=h,s(o,c,f,d)},calc:function(r){let o=r*r,c=o*r;return i+e*r+t*o+n*c}}}var _d=new B,xd=new B,vh=new ou,Sh=new ou,Mh=new ou,qa=class extends Rn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new B){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,c=Math.floor(o),a=o-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/r)+1)*r:a===0&&c===r-1&&(c=r-2,a=1);let l,h;this.closed||c>0?l=s[(c-1)%r]:(xd.subVectors(s[0],s[1]).add(s[0]),l=xd);let u=s[c%r],f=s[(c+1)%r];if(this.closed||c+2<r?h=s[(c+2)%r]:(_d.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=_d),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(u),d),y=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);y<1e-4&&(y=1),p<1e-4&&(p=y),m<1e-4&&(m=y),vh.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,p,y,m),Sh.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,p,y,m),Mh.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,p,y,m)}else this.curveType==="catmullrom"&&(vh.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Sh.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Mh.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(vh.calc(a),Sh.calc(a),Mh.calc(a)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new B().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function yd(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,c=i*i,a=i*c;return(2*t-2*n+r+o)*a+(-3*t+3*n-2*r-o)*c+r*i+t}function R0(i,e){let t=1-i;return t*t*e}function P0(i,e){return 2*(1-i)*i*e}function I0(i,e){return i*i*e}function Lr(i,e,t,n){return R0(i,e)+P0(i,t)+I0(i,n)}function L0(i,e){let t=1-i;return t*t*t*e}function D0(i,e){let t=1-i;return 3*t*t*i*e}function N0(i,e){return 3*(1-i)*i*i*e}function U0(i,e){return i*i*i*e}function Dr(i,e,t,n,s){return L0(i,e)+D0(i,t)+N0(i,n)+U0(i,s)}var Kr=class extends Rn{constructor(e=new Se,t=new Se,n=new Se,s=new Se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Se){let n=t,s=this.v0,r=this.v1,o=this.v2,c=this.v3;return n.set(Dr(e,s.x,r.x,o.x,c.x),Dr(e,s.y,r.y,o.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ya=class extends Rn{constructor(e=new B,t=new B,n=new B,s=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new B){let n=t,s=this.v0,r=this.v1,o=this.v2,c=this.v3;return n.set(Dr(e,s.x,r.x,o.x,c.x),Dr(e,s.y,r.y,o.y,c.y),Dr(e,s.z,r.z,o.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Qr=class extends Rn{constructor(e=new Se,t=new Se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Se){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ja=class extends Rn{constructor(e=new B,t=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new B){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new B){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},eo=class extends Rn{constructor(e=new Se,t=new Se,n=new Se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Se){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Lr(e,s.x,r.x,o.x),Lr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ja=class extends Rn{constructor(e=new B,t=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new B){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Lr(e,s.x,r.x,o.x),Lr(e,s.y,r.y,o.y),Lr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},to=class extends Rn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Se){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),c=r-o,a=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(yd(c,a.x,l.x,h.x,u.x),yd(c,a.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new Se().fromArray(s))}return this}},vd=Object.freeze({__proto__:null,ArcCurve:Xa,CatmullRomCurve3:qa,CubicBezierCurve:Kr,CubicBezierCurve3:Ya,EllipseCurve:Ks,LineCurve:Qr,LineCurve3:ja,QuadraticBezierCurve:eo,QuadraticBezierCurve3:Ja,SplineCurve:to}),Za=class extends Rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new vd[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,c=this.curves[r],a=c.getLength(),l=a===0?0:1-o/a;return c.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],c=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,a=o.getPoints(c);for(let l=0;l<a.length;l++){let h=a[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new vd[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},no=class extends Za{constructor(e){super(),this.type="Path",this.currentPoint=new Se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Qr(this.currentPoint.clone(),new Se(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new eo(this.currentPoint.clone(),new Se(e,t),new Se(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let c=new Kr(this.currentPoint.clone(),new Se(e,t),new Se(n,s),new Se(r,o));return this.curves.push(c),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new to(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let c=this.currentPoint.x,a=this.currentPoint.y;return this.absarc(e+c,t+a,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,c,a){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,c,a),this}absellipse(e,t,n,s,r,o,c,a){let l=new Ks(e,t,n,s,r,o,c,a);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Qs=class extends no{constructor(e){super(e),this.uuid=ar(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new no().fromJSON(s))}return this}};function O0(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=mp(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let c,a,l;if(n&&(r=H0(i,e,r,t)),i.length>80*t){c=i[0],a=i[1];let h=c,u=a;for(let f=t;f<s;f+=t){let d=i[f],p=i[f+1];d<c&&(c=d),p<a&&(a=p),d>h&&(h=d),p>u&&(u=p)}l=Math.max(h-c,u-a),l=l!==0?32767/l:0}return io(r,o,t,c,a,l,0),o}function mp(i,e,t,n,s){let r;if(s===K0(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Sd(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Sd(o/n|0,i[o],i[o+1],r);return r&&er(r,r.next)&&(ro(r),r=r.next),r}function fs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(er(t,t.next)||Tt(t.prev,t,t.next)===0)){if(ro(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function io(i,e,t,n,s,r,o){if(!i)return;!o&&r&&q0(i,n,s,r);let c=i;for(;i.prev!==i.next;){let a=i.prev,l=i.next;if(r?B0(i,n,s,r):F0(i)){e.push(a.i,i.i,l.i),ro(i),i=l.next,c=l.next;continue}if(i=l,i===c){o?o===1?(i=k0(fs(i),e),io(i,e,t,n,s,r,2)):o===2&&z0(i,e,t,n,s,r):io(fs(i),e,t,n,s,r,1);break}}}function F0(i){let e=i.prev,t=i,n=i.next;if(Tt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,c=e.y,a=t.y,l=n.y,h=Math.min(s,r,o),u=Math.min(c,a,l),f=Math.max(s,r,o),d=Math.max(c,a,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=f&&p.y>=u&&p.y<=d&&Pr(s,c,r,a,o,l,p.x,p.y)&&Tt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function B0(i,e,t,n){let s=i.prev,r=i,o=i.next;if(Tt(s,r,o)>=0)return!1;let c=s.x,a=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(c,a,l),p=Math.min(h,u,f),y=Math.max(c,a,l),m=Math.max(h,u,f),g=Rh(d,p,e,t,n),S=Rh(y,m,e,t,n),A=i.prevZ,v=i.nextZ;for(;A&&A.z>=g&&v&&v.z<=S;){if(A.x>=d&&A.x<=y&&A.y>=p&&A.y<=m&&A!==s&&A!==o&&Pr(c,h,a,u,l,f,A.x,A.y)&&Tt(A.prev,A,A.next)>=0||(A=A.prevZ,v.x>=d&&v.x<=y&&v.y>=p&&v.y<=m&&v!==s&&v!==o&&Pr(c,h,a,u,l,f,v.x,v.y)&&Tt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;A&&A.z>=g;){if(A.x>=d&&A.x<=y&&A.y>=p&&A.y<=m&&A!==s&&A!==o&&Pr(c,h,a,u,l,f,A.x,A.y)&&Tt(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;v&&v.z<=S;){if(v.x>=d&&v.x<=y&&v.y>=p&&v.y<=m&&v!==s&&v!==o&&Pr(c,h,a,u,l,f,v.x,v.y)&&Tt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function k0(i,e){let t=i;do{let n=t.prev,s=t.next.next;!er(n,s)&&_p(n,t,t.next,s)&&so(n,s)&&so(s,n)&&(e.push(n.i,t.i,s.i),ro(t),ro(t.next),t=i=s),t=t.next}while(t!==i);return fs(t)}function z0(i,e,t,n,s,r){let o=i;do{let c=o.next.next;for(;c!==o.prev;){if(o.i!==c.i&&J0(o,c)){let a=xp(o,c);o=fs(o,o.next),a=fs(a,a.next),io(o,e,t,n,s,r,0),io(a,e,t,n,s,r,0);return}c=c.next}o=o.next}while(o!==i)}function H0(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let c=e[r]*n,a=r<o-1?e[r+1]*n:i.length,l=mp(i,c,a,n,!1);l===l.next&&(l.steiner=!0),s.push(j0(l))}s.sort(G0);for(let r=0;r<s.length;r++)t=V0(s[r],t);return t}function G0(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function V0(i,e){let t=W0(i,e);if(!t)return e;let n=xp(t,i);return fs(n,n.next),fs(t,t.next)}function W0(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(er(i,t))return t;do{if(er(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let c=o,a=o.x,l=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=a&&n!==t.x&&gp(s<l?n:r,s,a,l,s<l?r:n,s,t.x,t.y)){let u=Math.abs(s-t.y)/(n-t.x);so(t,i)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&X0(o,t)))&&(o=t,h=u)}t=t.next}while(t!==c);return o}function X0(i,e){return Tt(i.prev,i,e.prev)<0&&Tt(e.next,i,i.next)<0}function q0(i,e,t,n){let s=i;do s.z===0&&(s.z=Rh(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Y0(s)}function Y0(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,c=0;for(let l=0;l<t&&(c++,o=o.nextZ,!!o);l++);let a=t;for(;c>0||a>0&&o;)c!==0&&(a===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,c--):(s=o,o=o.nextZ,a--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Rh(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function j0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function gp(i,e,t,n,s,r,o,c){return(s-o)*(e-c)>=(i-o)*(r-c)&&(i-o)*(n-c)>=(t-o)*(e-c)&&(t-o)*(r-c)>=(s-o)*(n-c)}function Pr(i,e,t,n,s,r,o,c){return!(i===o&&e===c)&&gp(i,e,t,n,s,r,o,c)}function J0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Z0(i,e)&&(so(i,e)&&so(e,i)&&$0(i,e)&&(Tt(i.prev,i,e.prev)||Tt(i,e.prev,e))||er(i,e)&&Tt(i.prev,i,i.next)>0&&Tt(e.prev,e,e.next)>0)}function Tt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function er(i,e){return i.x===e.x&&i.y===e.y}function _p(i,e,t,n){let s=Ta(Tt(i,e,t)),r=Ta(Tt(i,e,n)),o=Ta(Tt(t,n,i)),c=Ta(Tt(t,n,e));return!!(s!==r&&o!==c||s===0&&ba(i,t,e)||r===0&&ba(i,n,e)||o===0&&ba(t,i,n)||c===0&&ba(t,e,n))}function ba(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ta(i){return i>0?1:i<0?-1:0}function Z0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&_p(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function so(i,e){return Tt(i.prev,i,i.next)<0?Tt(i,e,i.next)>=0&&Tt(i,i.prev,e)>=0:Tt(i,e,i.prev)<0||Tt(i,i.next,e)<0}function $0(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function xp(i,e){let t=Ph(i.i,i.x,i.y),n=Ph(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Sd(i,e,t,n){let s=Ph(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ro(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ph(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function K0(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Ih=class{static triangulate(e,t,n=2){return O0(e,t,n)}},Gs=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Md(e),bd(n,e);let o=e.length;t.forEach(Md);for(let a=0;a<t.length;a++)s.push(o),o+=t[a].length,bd(n,t[a]);let c=Ih.triangulate(n,s);for(let a=0;a<c.length;a+=3)r.push(c.slice(a,a+3));return r}};function Md(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function bd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Pn=class i extends $r{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var qi=class i extends Ct{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,c=Math.floor(n),a=Math.floor(s),l=c+1,h=a+1,u=e/c,f=t/a,d=[],p=[],y=[],m=[];for(let g=0;g<h;g++){let S=g*f-o;for(let A=0;A<l;A++){let v=A*u-r;p.push(v,-S,0),y.push(0,0,1),m.push(A/c),m.push(1-g/a)}}for(let g=0;g<a;g++)for(let S=0;S<c;S++){let A=S+l*g,v=S+l*(g+1),b=S+1+l*(g+1),M=S+1+l*g;d.push(A,v,M),d.push(v,b,M)}this.setIndex(d),this.setAttribute("position",new st(p,3)),this.setAttribute("normal",new st(y,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Gn=class i extends Ct{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let c=[],a=[],l=[],h=[],u=e,f=(t-e)/s,d=new B,p=new Se;for(let y=0;y<=s;y++){for(let m=0;m<=n;m++){let g=r+m/n*o;d.x=u*Math.cos(g),d.y=u*Math.sin(g),a.push(d.x,d.y,d.z),l.push(0,0,1),p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,h.push(p.x,p.y)}u+=f}for(let y=0;y<s;y++){let m=y*(n+1);for(let g=0;g<n;g++){let S=g+m,A=S,v=S+n+1,b=S+n+2,M=S+1;c.push(A,v,M),c.push(v,b,M)}}this.setIndex(c),this.setAttribute("position",new st(a,3)),this.setAttribute("normal",new st(l,3)),this.setAttribute("uv",new st(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},oo=class i extends Ct{constructor(e=new Qs([new Se(0,.5),new Se(-.5,-.5),new Se(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],o=[],c=0,a=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(c,a,h),c+=a,a=0;this.setIndex(n),this.setAttribute("position",new st(s,3)),this.setAttribute("normal",new st(r,3)),this.setAttribute("uv",new st(o,2));function l(h){let u=s.length/3,f=h.extractPoints(t),d=f.shape,p=f.holes;Gs.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,g=p.length;m<g;m++){let S=p[m];Gs.isClockWise(S)===!0&&(p[m]=S.reverse())}let y=Gs.triangulateShape(d,p);for(let m=0,g=p.length;m<g;m++){let S=p[m];d=d.concat(S)}for(let m=0,g=d.length;m<g;m++){let S=d[m];s.push(S.x,S.y,0),r.push(0,0,1),o.push(S.x,S.y)}for(let m=0,g=y.length;m<g;m++){let S=y[m],A=S[0]+u,v=S[1]+u,b=S[2]+u;n.push(A,v,b),a+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Q0(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let o=t[e.shapes[s]];n.push(o)}return new i(n,e.curveSegments)}};function Q0(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}function _s(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Td(s))s.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Td(s[0])){let r=[];for(let o=0,c=s.length;o<c;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function on(i){let e={};for(let t=0;t<i.length;t++){let n=_s(i[t]);for(let s in n)e[s]=n[s]}return e}function Td(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function eg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function au(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}var yp={clone:_s,merge:on},tg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ng=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Vn=class extends Ci{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tg,this.fragmentShader=ng,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_s(e.uniforms),this.uniformsGroups=eg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new He().setHex(s.value);break;case"v2":this.uniforms[n].value=new Se().fromArray(s.value);break;case"v3":this.uniforms[n].value=new B().fromArray(s.value);break;case"v4":this.uniforms[n].value=new St().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ge().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ot().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},$a=class extends Vn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Pi=class extends Ci{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tl,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=pc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ka=class extends Ci{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ep,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Qa=class extends Ci{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Bs(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ea(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Yi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let c=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===c)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let c=t[1];e<c&&(n=2,r=c);for(let a=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let c=n+o>>>1;e<t[c]?o=c:n=c+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ec=class extends Yi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Eh,endingEnd:Eh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,c=s[r],a=s[o];if(c===void 0)switch(this.getSettings_().endingStart){case Ah:r=e,c=2*t-n;break;case wh:r=s.length-2,c=t+s[r]-s[r+1];break;default:r=e,c=n}if(a===void 0)switch(this.getSettings_().endingEnd){case Ah:o=e,a=2*n-t;break;case wh:o=1,a=n+s[1]-s[0];break;default:o=e-1,a=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-c),this._weightNext=l/(a-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,c=this.valueSize,a=e*c,l=a-c,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-t)/(s-t),y=p*p,m=y*p,g=-f*m+2*f*y-f*p,S=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*p+1,A=(-1-d)*m+(1.5+d)*y+.5*p,v=d*m-d*y;for(let b=0;b!==c;++b)r[b]=g*o[h+b]+S*o[l+b]+A*o[a+b]+v*o[u+b];return r}},tc=class extends Yi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,c=this.valueSize,a=e*c,l=a-c,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==c;++f)r[f]=o[l+f]*u+o[a+f]*h;return r}},nc=class extends Yi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ic=class extends Yi{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,c=this.valueSize,a=e*c,l=a-c,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-t)/(s-t),y=1-p;for(let m=0;m!==c;++m)r[m]=o[l+m]*y+o[a+m]*p;return r}let f=c*2,d=e-1;for(let p=0;p!==c;++p){let y=o[l+p],m=o[a+p],g=d*f+p*2,S=u[g],A=u[g+1],v=e*f+p*2,b=h[v],M=h[v+1],_=sg(n,t,S,b,s);r[p]=vp(_,y,A,M,m)}return r}};function vp(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function ig(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function sg(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let c=vp(r,e,t,n,s)-i;if(Math.abs(c)<1e-10)break;let a=ig(r,e,t,n,s);if(Math.abs(a)<1e-10)break;r=Math.max(0,Math.min(1,r-c/a))}return r}var In=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Bs(t,this.TimeBufferType),this.values=Bs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Bs(e.times,Array),values:Bs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Ea(e.settings)&&(n.settings={inTangents:Bs(e.settings.inTangents,Array),outTangents:Bs(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new nc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new tc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ec(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ic(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Nr:t=this.InterpolantFactoryMethodDiscrete;break;case Ba:t=this.InterpolantFactoryMethodLinear;break;case Ca:t=this.InterpolantFactoryMethodSmooth;break;case Th:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Oe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Nr;case this.InterpolantFactoryMethodLinear:return Ba;case this.InterpolantFactoryMethodSmooth:return Ca;case this.InterpolantFactoryMethodBezier:return Th}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;Ea(this.settings)&&(Ed(this.settings.inTangents,e),Ed(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Ea(this.settings)&&(Ad(this.settings.inTangents,e),Ad(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let c=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*c,o*c)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(ze("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(ze("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let c=0;c!==r;c++){let a=n[c];if(typeof a=="number"&&isNaN(a)){ze("KeyframeTrack: Time is not a valid number.",this,c,a),e=!1;break}if(o!==null&&o>a){ze("KeyframeTrack: Out of order keys.",this,c,a,o),e=!1;break}o=a}if(s!==void 0&&o0(s))for(let c=0,a=s.length;c!==a;++c){let l=s[c];if(isNaN(l)){ze("KeyframeTrack: Value is not a valid number.",this,c,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ca,r=e.length-1,o=1;for(let c=1;c<r;++c){let a=!1,l=e[c],h=e[c+1];if(l!==h&&(c!==1||l!==e[0]))if(s)a=!0;else{let u=c*n,f=u-n,d=u+n;for(let p=0;p!==n;++p){let y=t[u+p];if(y!==t[f+p]||y!==t[d+p]){a=!0;break}}}if(a){if(c!==o){e[o]=e[c];let u=c*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++o}}if(r>0){e[o]=e[r];for(let c=r*n,a=o*n,l=0;l!==n;++l)t[a+l]=t[c+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Ea(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Ed(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function Ad(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}In.prototype.ValueTypeName="";In.prototype.TimeBufferType=Float32Array;In.prototype.ValueBufferType=Float32Array;In.prototype.DefaultInterpolation=Ba;var ji=class extends In{constructor(e,t,n){super(e,t,n)}};ji.prototype.ValueTypeName="bool";ji.prototype.ValueBufferType=Array;ji.prototype.DefaultInterpolation=Nr;ji.prototype.InterpolantFactoryMethodLinear=void 0;ji.prototype.InterpolantFactoryMethodSmooth=void 0;var sc=class extends In{constructor(e,t,n,s){super(e,t,n,s)}};sc.prototype.ValueTypeName="color";var rc=class extends In{constructor(e,t,n,s){super(e,t,n,s)}};rc.prototype.ValueTypeName="number";var oc=class extends Yi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,c=this.valueSize,a=(n-t)/(s-t),l=e*c;for(let h=l+c;l!==h;l+=4)hi.slerpFlat(r,0,o,l-c,o,l,a);return r}},ao=class extends In{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new oc(this.times,this.values,this.getValueSize(),e)}};ao.prototype.ValueTypeName="quaternion";ao.prototype.InterpolantFactoryMethodSmooth=void 0;var Ji=class extends In{constructor(e,t,n){super(e,t,n)}};Ji.prototype.ValueTypeName="string";Ji.prototype.ValueBufferType=Array;Ji.prototype.DefaultInterpolation=Nr;Ji.prototype.InterpolantFactoryMethodLinear=void 0;Ji.prototype.InterpolantFactoryMethodSmooth=void 0;var ac=class extends In{constructor(e,t,n,s){super(e,t,n,s)}};ac.prototype.ValueTypeName="vector";var cc=class{constructor(e,t,n){let s=this,r=!1,o=0,c=0,a,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){c++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,c),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,c),o===c&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),a?a(h):h},this.setURLModifier=function(h){return a=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],p=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Sp=new cc,lc=class{constructor(e){this.manager=e!==void 0?e:Sp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};lc.DEFAULT_MATERIAL_NAME="__DEFAULT";var co=class extends zt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},lo=class extends co{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new He(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},bh=new ot,wd=new B,Cd=new B,hc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.mapType=vn,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xi,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;wd.setFromMatrixPosition(e.matrixWorld),t.position.copy(wd),Cd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){bh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(bh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,c=s?s.w/r.y:1,a=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Xs||e.reversedDepth?t.set(.5*o,0,0,.5*o+a,0,.5*c,0,.5*c+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+a,0,.5*c,0,.5*c+l,0,0,.5,.5,0,0,0,1),t.multiply(bh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Aa=new B,wa=new hi,ai=new B,ho=class extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Aa,wa,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Aa,wa,ai.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Aa,wa,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Aa,wa,ai.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Vi=new B,Rd=new Se,Pd=new Se,fn=class extends ho{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ka*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ql*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ka*2*Math.atan(Math.tan(Ql*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z),Vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z)}getViewSize(e,t){return this.getViewBounds(e,Rd,Pd),t.subVectors(Pd,Rd)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ql*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let a=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/a,t-=o.offsetY*n/l,s*=o.width/a,n*=o.height/l}let c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var uo=class extends ho{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,c=s+t,a=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,c-=h*this.view.offsetY,a=c-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,c,a,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Lh=class extends hc{constructor(){super(new uo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},fo=class extends co{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new Lh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ks=-90,zs=1,tr=class extends zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new fn(ks,zs,e,t);s.layers=this.layers,this.add(s);let r=new fn(ks,zs,e,t);r.layers=this.layers,this.add(r);let o=new fn(ks,zs,e,t);o.layers=this.layers,this.add(o);let c=new fn(ks,zs,e,t);c.layers=this.layers,this.add(c);let a=new fn(ks,zs,e,t);a.layers=this.layers,this.add(a);let l=new fn(ks,zs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,c,a]=t;for(let l of t)this.remove(l);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),a.up.set(0,1,0),a.lookAt(0,0,-1);else if(e===Xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),a.up.set(0,-1,0),a.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,c,a,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=y,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},uc=class extends fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var cu="\\[\\]\\.:\\/",rg=new RegExp("["+cu+"]","g"),lu="[^"+cu+"]",og="[^"+cu.replace("\\.","")+"]",ag=/((?:WC+[\/:])*)/.source.replace("WC",lu),cg=/(WCOD+)?/.source.replace("WCOD",og),lg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",lu),hg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",lu),ug=new RegExp("^"+ag+cg+lg+hg+"$"),fg=["material","materials","bones","map"],Dh=class{constructor(e,t,n){let s=n||xt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},xt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(rg,"")}static parseTrackName(e){let t=ug.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);fg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let c=r[o];if(c.name===t||c.uuid===t)return c;let a=n(c.children);if(a)return a}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Oe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){ze("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){ze("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){ze("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){ze("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){ze("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;ze("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let c=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?c=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let a=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}a=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(a=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(a=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xt.Composite=Dh;xt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};xt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};xt.prototype.GetterByBindingType=[xt.prototype._getValue_direct,xt.prototype._getValue_array,xt.prototype._getValue_arrayElement,xt.prototype._getValue_toArray];xt.prototype.SetterByBindingTypeAndVersioning=[[xt.prototype._setValue_direct,xt.prototype._setValue_direct_setNeedsUpdate,xt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_array,xt.prototype._setValue_array_setNeedsUpdate,xt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_arrayElement,xt.prototype._setValue_arrayElement_setNeedsUpdate,xt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_fromArray,xt.prototype._setValue_fromArray_setNeedsUpdate,xt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ZS=new Float32Array(1);var mu=class mu{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};mu.prototype.isMatrix2=!0;var Nh=mu;function hu(i,e,t,n){let s=dg(n);switch(t){case Kh:return i*e;case Sc:return i*e/s.components*s.byteLength;case Mc:return i*e/s.components*s.byteLength;case $i:return i*e*2/s.components*s.byteLength;case bc:return i*e*2/s.components*s.byteLength;case Qh:return i*e*3/s.components*s.byteLength;case ni:return i*e*4/s.components*s.byteLength;case Tc:return i*e*4/s.components*s.byteLength;case go:case _o:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xo:case yo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ac:case Cc:return Math.max(i,16)*Math.max(e,8)/4;case Ec:case wc:return Math.max(i,8)*Math.max(e,8)/2;case Rc:case Pc:case Lc:case Dc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ic:case vo:case Nc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Uc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Fc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Bc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case kc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case zc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Hc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Gc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Vc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Wc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Xc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case qc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Yc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case jc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Jc:case Zc:case $c:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Kc:case Qc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case So:case el:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function dg(i){switch(i){case vn:case jh:return{byteLength:1,components:1};case or:case Jh:case ti:return{byteLength:2,components:1};case yc:case vc:return{byteLength:2,components:4};case ei:case xc:case Wn:return{byteLength:4,components:1};case Zh:case $h:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Vp(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Sg(i){let e=new WeakMap;function t(c,a){let l=c.array,h=c.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(a,f),i.bufferData(a,l,h),c.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:u}}function n(c,a,l){let h=a.array,u=a.updateRanges;if(i.bindBuffer(l,c),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){let p=u[f],y=u[d];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++f,u[f]=y)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){let y=u[d];i.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}a.clearUpdateRanges()}a.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);let a=e.get(c);a&&(i.deleteBuffer(a.buffer),e.delete(c))}function o(c,a){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){let h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}let l=e.get(c);if(l===void 0)e.set(c,t(c,a));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,c,a),l.version=c.version}}return{get:s,remove:r,update:o}}var Mg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bg=`#ifdef USE_ALPHAHASH
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
#endif`,Tg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Eg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ag=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cg=`#ifdef USE_AOMAP
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
#endif`,Rg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pg=`#ifdef USE_BATCHING
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
#endif`,Ig=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ng=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ug=`#ifdef USE_IRIDESCENCE
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
#endif`,Og=`#ifdef USE_BUMPMAP
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
#endif`,Fg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Gg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Vg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Wg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Xg=`#define PI 3.141592653589793
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
} // validated`,qg=`vec3 transformedNormal = objectNormal;
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
#endif`,Yg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$g="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qg=`#ifdef USE_ENVMAP
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
#endif`,e_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,t_=`#ifdef USE_ENVMAP
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
#endif`,n_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,i_=`#ifdef USE_ENVMAP
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
#endif`,s_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,r_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,o_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,a_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,c_=`#ifdef USE_GRADIENTMAP
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
}`,l_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,h_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,u_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,f_=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,d_=`#ifdef USE_ENVMAP
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
#endif`,p_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,m_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,g_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,__=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,x_=`PhysicalMaterial material;
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
#endif`,y_=`uniform sampler2D dfgLUT;
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
}`,v_=`
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
#endif`,S_=`#if defined( RE_IndirectDiffuse )
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
#endif`,M_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,b_=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,T_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,E_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,A_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,w_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,C_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,R_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,P_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,I_=`#if defined( USE_POINTS_UV )
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
#endif`,L_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,D_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,N_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,U_=`#if defined( USE_MORPHCOLORS )
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
#endif`,O_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,F_=`#ifdef USE_MORPHTARGETS
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
#endif`,B_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,k_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,z_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,H_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,G_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,V_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,W_=`#ifdef USE_NORMALMAP
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
#endif`,X_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,q_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Y_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,j_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,J_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Z_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,K_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Q_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ex=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ix=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ox=`float getShadowMask() {
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
}`,ax=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cx=`#ifdef USE_SKINNING
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
#endif`,lx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hx=`#ifdef USE_SKINNING
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
#endif`,ux=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,px=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mx=`#ifdef USE_TRANSMISSION
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
#endif`,gx=`#ifdef USE_TRANSMISSION
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
#endif`,_x=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Sx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mx=`uniform sampler2D t2D;
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
}`,bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tx=`uniform float backgroundBlurriness;
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
}`,Ex=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ax=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wx=`#include <common>
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
}`,Cx=`#if DEPTH_PACKING == 3200
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
}`,Rx=`#define DISTANCE
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
}`,Px=`#define DISTANCE
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
}`,Ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dx=`uniform float scale;
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
}`,Nx=`uniform vec3 diffuse;
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
}`,Ux=`#include <common>
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
}`,Ox=`uniform vec3 diffuse;
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
}`,Fx=`#define LAMBERT
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
}`,Bx=`#define LAMBERT
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
}`,kx=`#define MATCAP
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
}`,zx=`#define MATCAP
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
}`,Hx=`#define NORMAL
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
}`,Gx=`#define NORMAL
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
}`,Vx=`#define PHONG
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
}`,Wx=`#define PHONG
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
}`,Xx=`#define STANDARD
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
}`,qx=`#define STANDARD
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
}`,Yx=`#define TOON
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
}`,jx=`#define TOON
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
}`,Jx=`uniform float size;
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
}`,Zx=`uniform vec3 diffuse;
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
}`,$x=`#include <common>
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
}`,Kx=`uniform vec3 color;
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
}`,Qx=`uniform float rotation;
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
}`,ey=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:Mg,alphahash_pars_fragment:bg,alphamap_fragment:Tg,alphamap_pars_fragment:Eg,alphatest_fragment:Ag,alphatest_pars_fragment:wg,aomap_fragment:Cg,aomap_pars_fragment:Rg,batching_pars_vertex:Pg,batching_vertex:Ig,begin_vertex:Lg,beginnormal_vertex:Dg,bsdfs:Ng,iridescence_fragment:Ug,bumpmap_pars_fragment:Og,clipping_planes_fragment:Fg,clipping_planes_pars_fragment:Bg,clipping_planes_pars_vertex:kg,clipping_planes_vertex:zg,color_fragment:Hg,color_pars_fragment:Gg,color_pars_vertex:Vg,color_vertex:Wg,common:Xg,defaultnormal_vertex:qg,displacementmap_pars_vertex:Yg,displacementmap_vertex:jg,emissivemap_fragment:Jg,emissivemap_pars_fragment:Zg,colorspace_fragment:$g,colorspace_pars_fragment:Kg,envmap_fragment:Qg,envmap_common_pars_fragment:e_,envmap_pars_fragment:t_,envmap_pars_vertex:n_,envmap_physical_pars_fragment:d_,envmap_vertex:i_,fog_vertex:s_,fog_pars_vertex:r_,fog_fragment:o_,fog_pars_fragment:a_,gradientmap_pars_fragment:c_,lightmap_pars_fragment:l_,lights_lambert_fragment:h_,lights_lambert_pars_fragment:u_,lights_pars_begin:f_,lights_toon_fragment:p_,lights_toon_pars_fragment:m_,lights_phong_fragment:g_,lights_phong_pars_fragment:__,lights_physical_fragment:x_,lights_physical_pars_fragment:y_,lights_fragment_begin:v_,lights_fragment_maps:S_,lights_fragment_end:M_,lightprobes_pars_fragment:b_,logdepthbuf_fragment:T_,logdepthbuf_pars_fragment:E_,logdepthbuf_pars_vertex:A_,logdepthbuf_vertex:w_,map_fragment:C_,map_pars_fragment:R_,map_particle_fragment:P_,map_particle_pars_fragment:I_,metalnessmap_fragment:L_,metalnessmap_pars_fragment:D_,morphinstance_vertex:N_,morphcolor_vertex:U_,morphnormal_vertex:O_,morphtarget_pars_vertex:F_,morphtarget_vertex:B_,normal_fragment_begin:k_,normal_fragment_maps:z_,normal_pars_fragment:H_,normal_pars_vertex:G_,normal_vertex:V_,normalmap_pars_fragment:W_,clearcoat_normal_fragment_begin:X_,clearcoat_normal_fragment_maps:q_,clearcoat_pars_fragment:Y_,iridescence_pars_fragment:j_,opaque_fragment:J_,packing:Z_,premultiplied_alpha_fragment:$_,project_vertex:K_,dithering_fragment:Q_,dithering_pars_fragment:ex,roughnessmap_fragment:tx,roughnessmap_pars_fragment:nx,shadowmap_pars_fragment:ix,shadowmap_pars_vertex:sx,shadowmap_vertex:rx,shadowmask_pars_fragment:ox,skinbase_vertex:ax,skinning_pars_vertex:cx,skinning_vertex:lx,skinnormal_vertex:hx,specularmap_fragment:ux,specularmap_pars_fragment:fx,tonemapping_fragment:dx,tonemapping_pars_fragment:px,transmission_fragment:mx,transmission_pars_fragment:gx,uv_pars_fragment:_x,uv_pars_vertex:xx,uv_vertex:yx,worldpos_vertex:vx,background_vert:Sx,background_frag:Mx,backgroundCube_vert:bx,backgroundCube_frag:Tx,cube_vert:Ex,cube_frag:Ax,depth_vert:wx,depth_frag:Cx,distance_vert:Rx,distance_frag:Px,equirect_vert:Ix,equirect_frag:Lx,linedashed_vert:Dx,linedashed_frag:Nx,meshbasic_vert:Ux,meshbasic_frag:Ox,meshlambert_vert:Fx,meshlambert_frag:Bx,meshmatcap_vert:kx,meshmatcap_frag:zx,meshnormal_vert:Hx,meshnormal_frag:Gx,meshphong_vert:Vx,meshphong_frag:Wx,meshphysical_vert:Xx,meshphysical_frag:qx,meshtoon_vert:Yx,meshtoon_frag:jx,points_vert:Jx,points_frag:Zx,shadow_vert:$x,shadow_frag:Kx,sprite_vert:Qx,sprite_frag:ey},xe={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},pi={basic:{uniforms:on([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:on([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new He(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:on([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:on([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:on([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new He(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:on([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:on([xe.points,xe.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:on([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:on([xe.common,xe.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:on([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:on([xe.sprite,xe.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:on([xe.common,xe.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:on([xe.lights,xe.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};pi.physical={uniforms:on([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};var nl={r:0,b:0,g:0},ty=new ot,Wp=new Ge;Wp.set(-1,0,0,0,1,0,0,0,1);function ny(i,e,t,n,s,r){let o=new He(0),c=s===!0?0:1,a,l,h=null,u=0,f=null;function d(S){let A=S.isScene===!0?S.background:null;if(A&&A.isTexture){let v=S.backgroundBlurriness>0;A=e.get(A,v)}return A}function p(S){let A=!1,v=d(S);v===null?m(o,c):v&&v.isColor&&(m(v,1),A=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(S,A){let v=d(A);v&&v.isCubeTexture?(l===void 0&&(l=new Ve(new at(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:_s(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(b,M,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ty.makeRotationFromEuler(A.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Wp),l.material.toneMapped=nt.getTransfer(v.colorSpace)!==lt,(h!==v||u!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,f=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(a===void 0&&(a=new Ve(new qi(2,2),new Vn({name:"BackgroundMaterial",uniforms:_s(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:Zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),a.geometry.deleteAttribute("normal"),Object.defineProperty(a.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(a)),a.material.uniforms.t2D.value=v,a.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,a.material.toneMapped=nt.getTransfer(v.colorSpace)!==lt,v.matrixAutoUpdate===!0&&v.updateMatrix(),a.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||f!==i.toneMapping)&&(a.material.needsUpdate=!0,h=v,u=v.version,f=i.toneMapping),a.layers.enableAll(),S.unshift(a,a.geometry,a.material,0,0,null))}function m(S,A){S.getRGB(nl,au(i)),t.buffers.color.setClear(nl.r,nl.g,nl.b,A,r)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),a!==void 0&&(a.geometry.dispose(),a.material.dispose(),a=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,A=1){o.set(S),c=A,m(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,m(o,c)},render:p,addToRenderList:y,dispose:g}}function iy(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function c(P,I,O,L,U){let k=!1,W=u(P,L,O,I);r!==W&&(r=W,l(r.object)),k=d(P,L,O,U),k&&p(P,L,O,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,v(P,I,O,L),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function a(){return i.createVertexArray()}function l(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function u(P,I,O,L){let U=L.wireframe===!0,k=n[I.id];k===void 0&&(k={},n[I.id]=k);let W=P.isInstancedMesh===!0?P.id:0,ee=k[W];ee===void 0&&(ee={},k[W]=ee);let V=ee[O.id];V===void 0&&(V={},ee[O.id]=V);let q=V[U];return q===void 0&&(q=f(a()),V[U]=q),q}function f(P){let I=[],O=[],L=[];for(let U=0;U<t;U++)I[U]=0,O[U]=0,L[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:L,object:P,attributes:{},index:null}}function d(P,I,O,L){let U=r.attributes,k=I.attributes,W=0,ee=O.getAttributes();for(let V in ee)if(ee[V].location>=0){let te=U[V],ue=k[V];if(ue===void 0&&(V==="instanceMatrix"&&P.instanceMatrix&&(ue=P.instanceMatrix),V==="instanceColor"&&P.instanceColor&&(ue=P.instanceColor)),te===void 0||te.attribute!==ue||ue&&te.data!==ue.data)return!0;W++}return r.attributesNum!==W||r.index!==L}function p(P,I,O,L){let U={},k=I.attributes,W=0,ee=O.getAttributes();for(let V in ee)if(ee[V].location>=0){let te=k[V];te===void 0&&(V==="instanceMatrix"&&P.instanceMatrix&&(te=P.instanceMatrix),V==="instanceColor"&&P.instanceColor&&(te=P.instanceColor));let ue={};ue.attribute=te,te&&te.data&&(ue.data=te.data),U[V]=ue,W++}r.attributes=U,r.attributesNum=W,r.index=L}function y(){let P=r.newAttributes;for(let I=0,O=P.length;I<O;I++)P[I]=0}function m(P){g(P,0)}function g(P,I){let O=r.newAttributes,L=r.enabledAttributes,U=r.attributeDivisors;O[P]=1,L[P]===0&&(i.enableVertexAttribArray(P),L[P]=1),U[P]!==I&&(i.vertexAttribDivisor(P,I),U[P]=I)}function S(){let P=r.newAttributes,I=r.enabledAttributes;for(let O=0,L=I.length;O<L;O++)I[O]!==P[O]&&(i.disableVertexAttribArray(O),I[O]=0)}function A(P,I,O,L,U,k,W){W===!0?i.vertexAttribIPointer(P,I,O,U,k):i.vertexAttribPointer(P,I,O,L,U,k)}function v(P,I,O,L){y();let U=L.attributes,k=O.getAttributes(),W=I.defaultAttributeValues;for(let ee in k){let V=k[ee];if(V.location>=0){let q=U[ee];if(q===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(q=P.instanceColor)),q!==void 0){let te=q.normalized,ue=q.itemSize,Pe=e.get(q);if(Pe===void 0)continue;let J=Pe.buffer,ge=Pe.type,Me=Pe.bytesPerElement,Re=ge===i.INT||ge===i.UNSIGNED_INT||q.gpuType===xc;if(q.isInterleavedBufferAttribute){let ye=q.data,Ye=ye.isInterleavedBuffer===!0?ye.stride:ye.itemSize,Rt=q.offset;if(ye.isInstancedInterleavedBuffer||ye.isInstancedBufferAttribute){for(let Fe=0;Fe<V.locationSize;Fe++)g(V.location+Fe,ye.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let Fe=0;Fe<V.locationSize;Fe++)m(V.location+Fe);i.bindBuffer(i.ARRAY_BUFFER,J);for(let Fe=0;Fe<V.locationSize;Fe++)A(V.location+Fe,ue/V.locationSize,ge,te,Ye*Me,(Rt+ue/V.locationSize*Fe)*Me,Re)}else{if(q.isInstancedBufferAttribute){for(let ye=0;ye<V.locationSize;ye++)g(V.location+ye,q.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ye=0;ye<V.locationSize;ye++)m(V.location+ye);i.bindBuffer(i.ARRAY_BUFFER,J);for(let ye=0;ye<V.locationSize;ye++)A(V.location+ye,ue/V.locationSize,ge,te,ue*Me,ue/V.locationSize*ye*Me,Re)}}else if(W!==void 0){let te=W[ee];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv(V.location,te);break;case 3:i.vertexAttrib3fv(V.location,te);break;case 4:i.vertexAttrib4fv(V.location,te);break;default:i.vertexAttrib1fv(V.location,te)}}}}S()}function b(){E();for(let P in n){let I=n[P];for(let O in I){let L=I[O];for(let U in L){let k=L[U];for(let W in k)h(k[W].object),delete k[W];delete L[U]}}delete n[P]}}function M(P){if(n[P.id]===void 0)return;let I=n[P.id];for(let O in I){let L=I[O];for(let U in L){let k=L[U];for(let W in k)h(k[W].object),delete k[W];delete L[U]}}delete n[P.id]}function _(P){for(let I in n){let O=n[I];for(let L in O){let U=O[L];if(U[P.id]===void 0)continue;let k=U[P.id];for(let W in k)h(k[W].object),delete k[W];delete U[P.id]}}}function x(P){for(let I in n){let O=n[I],L=P.isInstancedMesh===!0?P.id:0,U=O[L];if(U!==void 0){for(let k in U){let W=U[k];for(let ee in W)h(W[ee].object),delete W[ee];delete U[k]}delete O[L],Object.keys(O).length===0&&delete n[I]}}}function E(){C(),o=!0,r!==s&&(r=s,l(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:E,resetDefaultState:C,dispose:b,releaseStatesOfGeometry:M,releaseStatesOfObject:x,releaseStatesOfProgram:_,initAttributes:y,enableAttribute:m,disableUnusedAttributes:S}}function sy(i,e,t){let n;function s(a){n=a}function r(a,l){i.drawArrays(n,a,l),t.update(l,n,1)}function o(a,l,h){h!==0&&(i.drawArraysInstanced(n,a,l,h),t.update(l,n,h))}function c(a,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,a,0,l,0,h);let f=0;for(let d=0;d<h;d++)f+=l[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=c}function ry(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let _=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(_){return!(_!==ni&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(_){let x=_===ti&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==vn&&_!==Wn&&!x&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function a(_){if(_==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=a(l);h!==l&&(Oe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&Oe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:a,textureFormatReadable:o,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:S,maxVaryings:A,maxFragmentUniforms:v,maxSamples:b,samples:M}}function oy(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Kn,c=new Ge,a={value:null,needsUpdate:!1};this.uniform=a,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){let p=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,g=i.get(u);if(!s||p===null||p.length===0||r&&!m)r?h(null):l();else{let S=r?0:n,A=S*4,v=g.clippingState||null;a.value=v,v=h(p,f,A,d);for(let b=0;b!==A;++b)v[b]=t[b];g.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function l(){a.value!==t&&(a.value=t,a.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,p){let y=u!==null?u.length:0,m=null;if(y!==0){if(m=a.value,p!==!0||m===null){let g=d+y*4,S=f.matrixWorldInverse;c.getNormalMatrix(S),(m===null||m.length<g)&&(m=new Float32Array(g));for(let A=0,v=d;A!==y;++A,v+=4)o.copy(u[A]).applyMatrix4(S,c),o.normal.toArray(m,v),m[v+3]=o.constant}a.value=m,a.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}var To=class extends Cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new jr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new at(5,5,5),r=new Vn({name:"CubemapFromEquirect",uniforms:_s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:pn,blending:ds});r.uniforms.tEquirect.value=t;let o=new Ve(s,r),c=t.minFilter;return t.minFilter===Ii&&(t.minFilter=dn),new tr(1,10,this).update(e,o),t.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Mp=256,ay=3,cy=20,Xp=256,qp=16,ly=3,hy=new B,uy=new He,sl=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new tr(1,10,null),this._boxMesh=new Ve(new at(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:c=hy}=r,a=this._renderer;this._setSize(o);let l=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let u=a.autoClear,f=a.autoClearColor,d=a.autoClearDepth,p=a.autoClearStencil,y=e.background;a.autoClear=!0,a.autoClearColor=!0,a.autoClearDepth=!0,a.autoClearStencil=!0,y===null&&(e.background=a.getClearColor(uy));let m=new tr(n,s,h);return m.position.copy(c),m.update(a,e),a.autoClear=u,a.autoClearColor=f,a.autoClearDepth=d,a.autoClearStencil=p,e.background=y,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ep(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Mp,dp(e))}_fromTexture(e,t){e.mapping===ms||e.mapping===rr?this._setSize(e.image.length===0?Mp:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=bp(e,!1,!1),n=Math.log2(e)-ay;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=bp(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===ms||e.mapping===rr?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ep()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Tp()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=fy(),this._integrationMaterial=dy());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/qp);for(let o=0;o<=n;o++){let c=i.lodToRoughness(o,n);if(o>n-ly)r.roughness.value=c,this._renderCube(e,o,this._integrationMaterial);else{let a=c>0?Math.log2(t)+.5*Math.log2(6/(Xp*Math.pow(c,4)))+.5:0;s.roughness.value=c,s.lodBias.value=a,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=py());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function bp(i,e,t){return new To(i,{minFilter:Ii,generateMipmaps:e,type:ti,colorSpace:Ur,depthBuffer:t})}function Eo(i,e,t){return new Vn({name:i,uniforms:e,vertexShader:Ze.cube_vert,fragmentShader:t,side:pn,blending:ds,depthTest:!1,depthWrite:!1})}function fy(){return Eo("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Xp}u

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
	`)}function dy(){return Eo("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:qp}},`

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
	`)}function py(){return Eo("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${cy}
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
	`)}function Tp(){return Eo("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Ep(){return Eo("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function my(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===mc||d===gc)if(e.has(f)){let p=e.get(f).texture;return c(p,f.mapping)}else{let p=f.image;if(p&&p.height>0){let y=new To(p.height);return y.fromEquirectangularTexture(i,f),e.set(f,y),f.addEventListener("dispose",l),c(y.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let d=f.mapping,p=d===mc||d===gc,y=d===ms||d===rr;if(p||y){let m=t.get(f),g=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new sl(i)),m=p?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{let S=f.image;return p&&S&&S.height>0||y&&S&&a(S)?(n===null&&(n=new sl(i)),m=p?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function c(f,d){return d===mc?f.mapping=ms:d===gc&&(f.mapping=rr),f}function a(f){let d=0,p=6;for(let y=0;y<p;y++)f[y]!==void 0&&d++;return d===p}function l(f){let d=f.target;d.removeEventListener("dispose",l);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function h(f){let d=f.target;d.removeEventListener("dispose",h);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function gy(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ir("WebGLRenderer: "+n+" extension not supported."),s}}}function _y(i,e,t,n){let s={},r=new WeakMap,o=new FinalizationRegistry(p=>delete s[p]);function c(p){a(p.target)}function a(p){p.index!==null&&e.remove(p.index);for(let m in p.attributes)e.remove(p.attributes[m]);p.removeEventListener("dispose",c),delete s[p.id],o.unregister(p);let y=r.get(p);y&&(e.remove(y),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function l(p,y){return s[y.id]!==void 0||(y.addEventListener("dispose",c),s[y.id]=new WeakRef(y),o.register(y,y.id,y),t.memory.geometries++),y}function h(p){let y=p.attributes;for(let m in y)e.update(y[m],i.ARRAY_BUFFER)}function u(p){let y=p.index,m=p.attributes.position,g=0;if(m===void 0)return;let S=y!==null?y.array.length:m.array.length/3-1,A=m.count>=65535?Vr:Gr,v=new A(Math.ceil(S/3)*6,1),b=v.array;if(y!==null){let _=y.array;g=y.version;for(let x=0,E=0;x<S;x+=3){let C=_[x+0],P=_[x+1],I=_[x+2];b[E++]=C,b[E++]=P,b[E++]=P,b[E++]=I,b[E++]=I,b[E++]=C}}else{g=m.version;for(let _=0,x=0;_<S;_+=3){let E=_+0,C=_+1,P=_+2;b[x++]=E,b[x++]=C,b[x++]=C,b[x++]=P,b[x++]=P,b[x++]=E}}v.version=g;let M=r.get(p);M&&e.remove(M),r.set(p,v)}function f(p){let y=r.get(p);if(y){let m=p.index;m!==null&&y.version<m.version&&u(p)}else u(p);return r.get(p)}function d(){for(let p in s){let y=s[p].deref();y!==void 0&&a(y)}}return{get:l,update:h,getWireframeAttribute:f,dispose:d}}function xy(i,e,t){let n;function s(u){n=u}let r,o;function c(u){r=u.type,o=u.bytesPerElement}function a(u,f){i.drawElements(n,f,r,u*o),t.update(f,n,1)}function l(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*o,d),t.update(f,n,d))}function h(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let y=0;for(let m=0;m<d;m++)y+=f[m];t.update(y,n,1)}this.setMode=s,this.setIndex=c,this.render=a,this.renderInstances=l,this.renderMultiDraw=h}function yy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,c){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=c*(r/3);break;case i.LINES:t.lines+=c*(r/2);break;case i.LINE_STRIP:t.lines+=c*(r-1);break;case i.LINE_LOOP:t.lines+=c*r;break;case i.POINTS:t.points+=c*r;break;default:ze("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function vy(i,e,t){let n=new WeakMap,s=new St;function r(o,c,a){let l=o.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(c);if(f===void 0||f.count!==u){let E=function(){_.dispose(),n.delete(c),c.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();let d=c.morphAttributes.position!==void 0,p=c.morphAttributes.normal!==void 0,y=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],g=c.morphAttributes.normal||[],S=c.morphAttributes.color||[],A=0;d===!0&&(A=1),p===!0&&(A=2),y===!0&&(A=3);let v=c.attributes.position.count*A,b=1;v>e.maxTextureSize&&(b=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let M=new Float32Array(v*b*4*u),_=new Br(M,v,b,u);_.type=Wn,_.needsUpdate=!0;let x=A*4;for(let C=0;C<u;C++){let P=m[C],I=g[C],O=S[C],L=v*b*4*C;for(let U=0;U<P.count;U++){let k=U*x;d===!0&&(s.fromBufferAttribute(P,U),M[L+k+0]=s.x,M[L+k+1]=s.y,M[L+k+2]=s.z,M[L+k+3]=0),p===!0&&(s.fromBufferAttribute(I,U),M[L+k+4]=s.x,M[L+k+5]=s.y,M[L+k+6]=s.z,M[L+k+7]=0),y===!0&&(s.fromBufferAttribute(O,U),M[L+k+8]=s.x,M[L+k+9]=s.y,M[L+k+10]=s.z,M[L+k+11]=O.itemSize===4?s.w:1)}}f={count:u,texture:_,size:new Se(v,b)},n.set(c,f),c.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)a.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let y=0;y<l.length;y++)d+=l[y];let p=c.morphTargetsRelative?1:1-d;a.getUniforms().setValue(i,"morphTargetBaseInfluence",p),a.getUniforms().setValue(i,"morphTargetInfluences",l)}a.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),a.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Sy(i,e,t,n,s){let r=new WeakMap;function o(l){let h=s.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function c(){r=new WeakMap}function a(l){let h=l.target;h.removeEventListener("dispose",a),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:c}}var My={[zh]:"LINEAR_TONE_MAPPING",[Hh]:"REINHARD_TONE_MAPPING",[Gh]:"CINEON_TONE_MAPPING",[Vh]:"ACES_FILMIC_TONE_MAPPING",[Xh]:"AGX_TONE_MAPPING",[qh]:"NEUTRAL_TONE_MAPPING",[Wh]:"CUSTOM_TONE_MAPPING"};function by(i,e,t,n,s,r){let o=new Cn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),c=null,a=null,l=null,h=new Ct;h.setAttribute("position",new st([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new st([0,2,0,0,2,0],2));let u=new $a({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Ve(h,u),d=new uo(-1,1,1,-1,0,1),p=null,y=null,m=!1,g,S=null,A=[],v=!1;this.setSize=function(b,M){o.setSize(b,M),c!==null&&c.setSize(b,M),a!==null&&a.setSize(b,M);for(let _=0;_<A.length;_++){let x=A[_];x.setSize&&x.setSize(b,M)}},this.setEffects=function(b){A=b,v=A.length>0&&A[0].isRenderPass===!0;let M=o.width,_=o.height;A.length>0&&c===null&&(c=new Cn(M,_,{type:ti,depthBuffer:!1,stencilBuffer:!1}),a=new Cn(M,_,{type:ti,depthBuffer:!1,stencilBuffer:!1}));let x=s===!0&&A.some(E=>E.needsDepthTexture===!0);x!==(o.depthTexture!==null)&&(x===!0&&l===null&&(l=new Ri(M,_),r===!0&&(l.format=Li,l.type=gs)),o.dispose(),o.depthTexture=x?l:null,o.resolveDepthBuffer=x,o.storeMultisampledDepthBuffer=x);for(let E=0;E<A.length;E++){let C=A[E];C.setSize&&C.setSize(M,_),x&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(l)}},this.begin=function(b,M){if(m||b.toneMapping===fi&&A.length===0)return!1;if(S=M,M!==null){let _=M.width,x=M.height;(o.width!==_||o.height!==x)&&this.setSize(_,x)}return v===!1&&b.setRenderTarget(o),g=b.toneMapping,b.toneMapping=fi,!0},this.hasRenderPass=function(){return v},this.end=function(b,M){b.toneMapping=g,m=!0;let _=o,x=c;for(let E=0;E<A.length;E++){let C=A[E];C.enabled!==!1&&(C.render(b,x,_,M),C.needsSwap!==!1&&(_=x,x=x===c?a:c))}if(p!==b.outputColorSpace||y!==b.toneMapping){p=b.outputColorSpace,y=b.toneMapping,u.defines={},nt.getTransfer(p)===lt&&(u.defines.SRGB_TRANSFER="");let E=My[y];E&&(u.defines[E]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=_.texture,b.setRenderTarget(S),b.render(f,d),S=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.dispose(),c!==null&&c.dispose(),a!==null&&a.dispose(),h.dispose(),u.dispose()}}var Yp=new yn,jp=new Ri(1,1),Jp=new Jr(1),Zp=new Br,$p=new Ga,Kp=new jr,Ap=[],wp=[],Cp=new Float32Array(16),Rp=new Float32Array(9),Pp=new Float32Array(4);function lr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Ap[s];if(r===void 0&&(r=new Float32Array(s),Ap[s]=r),e!==0){n.toArray(r,0);for(let o=1,c=0;o!==e;++o)c+=t,i[o].toArray(r,c)}return r}function Ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ol(i,e){let t=wp[e];t===void 0&&(t=new Int32Array(e),wp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ty(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ey(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2fv(this.addr,e),Gt(t,e)}}function Ay(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;i.uniform3fv(this.addr,e),Gt(t,e)}}function wy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4fv(this.addr,e),Gt(t,e)}}function Cy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Ht(t,n))return;Pp.set(n),i.uniformMatrix2fv(this.addr,!1,Pp),Gt(t,n)}}function Ry(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Ht(t,n))return;Rp.set(n),i.uniformMatrix3fv(this.addr,!1,Rp),Gt(t,n)}}function Py(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Ht(t,n))return;Cp.set(n),i.uniformMatrix4fv(this.addr,!1,Cp),Gt(t,n)}}function Iy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Ly(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2iv(this.addr,e),Gt(t,e)}}function Dy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3iv(this.addr,e),Gt(t,e)}}function Ny(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4iv(this.addr,e),Gt(t,e)}}function Uy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Oy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2uiv(this.addr,e),Gt(t,e)}}function Fy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3uiv(this.addr,e),Gt(t,e)}}function By(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4uiv(this.addr,e),Gt(t,e)}}function al(i){return i.version===0&&(i.compareFunction=nu,i.needsUpdate=!0),i}function ky(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=al(jp):r=Yp,t.setTexture2D(e||r,s)}function zy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||$p,s)}function Hy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=al(Jp):r=Kp,t.setTextureCube(e||r,s)}function Gy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Zp,s)}function Vy(i){switch(i){case 5126:return Ty;case 35664:return Ey;case 35665:return Ay;case 35666:return wy;case 35674:return Cy;case 35675:return Ry;case 35676:return Py;case 5124:case 35670:return Iy;case 35667:case 35671:return Ly;case 35668:case 35672:return Dy;case 35669:case 35673:return Ny;case 5125:return Uy;case 36294:return Oy;case 36295:return Fy;case 36296:return By;case 35678:case 36198:case 36298:case 36306:case 35682:return ky;case 35679:case 36299:case 36307:return zy;case 35680:case 36300:case 36308:case 36293:return Hy;case 36289:case 36303:case 36311:case 36292:return Gy}}function Wy(i,e){i.uniform1fv(this.addr,e)}function Xy(i,e){let t=lr(e,this.size,2);i.uniform2fv(this.addr,t)}function qy(i,e){let t=lr(e,this.size,3);i.uniform3fv(this.addr,t)}function Yy(i,e){let t=lr(e,this.size,4);i.uniform4fv(this.addr,t)}function jy(i,e){let t=lr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Jy(i,e){let t=lr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Zy(i,e){let t=lr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function $y(i,e){i.uniform1iv(this.addr,e)}function Ky(i,e){i.uniform2iv(this.addr,e)}function Qy(i,e){i.uniform3iv(this.addr,e)}function ev(i,e){i.uniform4iv(this.addr,e)}function tv(i,e){i.uniform1uiv(this.addr,e)}function nv(i,e){i.uniform2uiv(this.addr,e)}function iv(i,e){i.uniform3uiv(this.addr,e)}function sv(i,e){i.uniform4uiv(this.addr,e)}function rv(i,e,t){let n=this.cache,s=e.length,r=ol(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=al(jp):o=Yp;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||o,r[c])}function ov(i,e,t){let n=this.cache,s=e.length,r=ol(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||$p,r[o])}function av(i,e,t){let n=this.cache,s=e.length,r=ol(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=al(Jp):o=Kp;for(let c=0;c!==s;++c)t.setTextureCube(e[c]||o,r[c])}function cv(i,e,t){let n=this.cache,s=e.length,r=ol(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Zp,r[o])}function lv(i){switch(i){case 5126:return Wy;case 35664:return Xy;case 35665:return qy;case 35666:return Yy;case 35674:return jy;case 35675:return Jy;case 35676:return Zy;case 5124:case 35670:return $y;case 35667:case 35671:return Ky;case 35668:case 35672:return Qy;case 35669:case 35673:return ev;case 5125:return tv;case 36294:return nv;case 36295:return iv;case 36296:return sv;case 35678:case 36198:case 36298:case 36306:case 35682:return rv;case 35679:case 36299:case 36307:return ov;case 35680:case 36300:case 36308:case 36293:return av;case 36289:case 36303:case 36311:case 36292:return cv}}var xu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Vy(t.type)}},yu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=lv(t.type)}},vu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let c=s[r];c.setValue(e,t[c.id],n)}}},gu=/(\w+)(\])?(\[|\.)?/g;function Ip(i,e){i.seq.push(e),i.map[e.id]=e}function hv(i,e,t){let n=i.name,s=n.length;for(gu.lastIndex=0;;){let r=gu.exec(n),o=gu.lastIndex,c=r[1],a=r[2]==="]",l=r[3];if(a&&(c=c|0),l===void 0||l==="["&&o+2===s){Ip(t,l===void 0?new xu(c,i,e):new yu(c,i,e));break}else{let u=t.map[c];u===void 0&&(u=new vu(c),Ip(t,u)),t=u}}}var cr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let c=e.getActiveUniform(t,o),a=e.getUniformLocation(t,c.name);hv(c,a,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let c=t[r],a=n[c.id];a.needsUpdate!==!1&&c.setValue(e,a.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Lp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var uv=37297,fv=0;function dv(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let c=o+1;n.push(`${c===e?">":" "} ${c}: ${t[o]}`)}return n.join(`
`)}var Dp=new Ge;function pv(i){nt._getMatrix(Dp,nt.workingColorSpace,i);let e=`mat3( ${Dp.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(i)){case Or:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Np(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let c=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+dv(i.getShaderSource(e),c)}else return r}function mv(i,e){let t=pv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var gv={[zh]:"Linear",[Hh]:"Reinhard",[Gh]:"Cineon",[Vh]:"ACESFilmic",[Xh]:"AgX",[qh]:"Neutral",[Wh]:"Custom"};function _v(i,e){let t=gv[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var il=new B;function xv(){nt.getLuminanceCoefficients(il);let i=il.x.toFixed(4),e=il.y.toFixed(4),t=il.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(bo).join(`
`)}function vv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Sv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,c=1;r.type===i.FLOAT_MAT2&&(c=2),r.type===i.FLOAT_MAT3&&(c=3),r.type===i.FLOAT_MAT4&&(c=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:c}}return t}function bo(i){return i!==""}function Up(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Op(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Mv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Su(i){return i.replace(Mv,bv)}function bv(i,e){let t=Ze[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Su(t)}var Tv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fp(i){return i.replace(Tv,Ev)}function Ev(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bp(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Av={[po]:"SHADOWMAP_TYPE_PCF",[nr]:"SHADOWMAP_TYPE_VSM"};function wv(i){return Av[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Cv={[rr]:"ENVMAP_MODE_REFRACTION"};function Rv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Cv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Pv={[pc]:"ENVMAP_BLENDING_MULTIPLY",[$d]:"ENVMAP_BLENDING_MIX",[Kd]:"ENVMAP_BLENDING_ADD"};function Iv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Pv[i.combine]||"ENVMAP_BLENDING_NONE"}function Lv(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,c=t.fragmentShader,a=wv(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Rv(t),u=Iv(t),f=yv(t),d=vv(r),p=s.createProgram(),y,m,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(bo).join(`
`),y.length>0&&(y+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(bo).join(`
`),m.length>0&&(m+=`
`)):(y=[Bp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+a:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bo).join(`
`),m=[Bp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+a:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fi?"#define TONE_MAPPING":"",t.toneMapping!==fi?Ze.tonemapping_pars_fragment:"",t.toneMapping!==fi?_v("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,mv("linearToOutputTexel",t.outputColorSpace),xv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(bo).join(`
`)),o=Su(o),o=Up(o,t),o=Op(o,t),c=Su(c),c=Up(c,t),c=Op(c,t),o=Fp(o),c=Fp(c),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,y=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,m=["#define varying in",t.glslVersion===iu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===iu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let S=g+y+o,A=g+m+c,v=Lp(s,s.VERTEX_SHADER,S),b=Lp(s,s.FRAGMENT_SHADER,A);s.attachShader(p,v),s.attachShader(p,b),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function M(C){if(i.debug.checkShaderErrors){let P=s.getProgramInfoLog(p)||"",I=s.getShaderInfoLog(v)||"",O=s.getShaderInfoLog(b)||"",L=P.trim(),U=I.trim(),k=O.trim(),W=!0,ee=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,v,b);else{let V=Np(s,v,"vertex"),q=Np(s,b,"fragment");ze("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+L+`
`+V+`
`+q)}else L!==""?Oe("WebGLProgram: Program Info Log:",L):(U===""||k==="")&&(ee=!1);ee&&(C.diagnostics={runnable:W,programLog:L,vertexShader:{log:U,prefix:y},fragmentShader:{log:k,prefix:m}})}s.deleteShader(v),s.deleteShader(b),_=new cr(s,p),x=Sv(s,p)}let _;this.getUniforms=function(){return _===void 0&&M(this),_};let x;this.getAttributes=function(){return x===void 0&&M(this),x};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(p,uv)),E},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=fv++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=v,this.fragmentShader=b,this}var Dv=0,Mu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new bu(e),t.set(e,n)),n}},bu=class{constructor(e){this.id=Dv++,this.code=e,this.usedTimes=0}};function Nv(i){return i===$i||i===vo||i===So}function Uv(i,e,t,n,s,r){let o=new kr,c=new Mu,a=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(_){return a.add(_),_===0?"uv":`uv${_}`}function p(_,x,E,C,P,I){let O=C.fog,L=P.geometry,U=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?C.environment:null,k=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,W=e.get(_.envMap||U,k),ee=f[_.type],V=n.precision;_.precision!==null&&(V=n.getMaxPrecision(_.precision),V!==_.precision&&Oe("WebGLProgram.getParameters:",_.precision,"not supported, using",V,"instead."));let q=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,te=q!==void 0?q.length:0,ue=0;L.morphAttributes.position!==void 0&&(ue=1),L.morphAttributes.normal!==void 0&&(ue=2),L.morphAttributes.color!==void 0&&(ue=3);let Pe,J,ge,Me;if(ee){let _e=pi[ee];Pe=_e.vertexShader,J=_e.fragmentShader}else{Pe=_.vertexShader,J=_.fragmentShader;let _e=c.getVertexShaderStage(_),ut=c.getFragmentShaderStage(_);c.update(_,_e,ut),ge=_e.id,Me=ut.id}let Re=i.getRenderTarget(),ye=i.state.buffers.depth.getReversed(),Ye=P.isInstancedMesh===!0,Rt=P.isBatchedMesh===!0,Fe=!!_.map,ht=!!_.matcap,dt=!!W,Qe=dt&&W.isPMREMTexture===!0,$t=!!_.aoMap,Ft=!!_.lightMap,gn=!!_.bumpMap&&_.wireframe===!1,Mt=!!_.normalMap,si=!!_.displacementMap,Vt=!!_.emissiveMap,Nn=!!_.metalnessMap,Un=!!_.roughnessMap,On=_.anisotropy>0,F=_.clearcoat>0,Fn=_.diffuseRoughness>0,yt=_.dispersion>0,vt=_.retroreflectivity>0,me=_.iridescence>0,Bt=_.sheen>0,Ue=_.transmission>0,Xe=On&&!!_.anisotropyMap,R=F&&!!_.clearcoatMap,T=F&&!!_.clearcoatNormalMap,H=F&&!!_.clearcoatRoughnessMap,ie=Fn&&!!_.diffuseRoughnessMap,Q=me&&!!_.iridescenceMap,oe=me&&!!_.iridescenceThicknessMap,fe=Bt&&!!_.sheenColorMap,Z=Bt&&!!_.sheenRoughnessMap,$=!!_.specularMap,ce=!!_.specularColorMap,D=!!_.specularIntensityMap,K=Ue&&!!_.transmissionMap,j=Ue&&!!_.thicknessMap,le=!!_.gradientMap,re=!!_.alphaMap,ae=_.alphaTest>0,Ie=!!_.alphaHash,Je=!!_.extensions,se=fi;_.toneMapped&&(Re===null||Re.isXRRenderTarget===!0)&&(se=i.toneMapping);let De=Qe?W.isCompressedCubeTexture?W.image[0].mipmaps:W.mipmaps:null,je={shaderID:ee,shaderType:_.type,shaderName:_.name,vertexShader:Pe,fragmentShader:J,defines:_.defines,customVertexShaderID:ge,customFragmentShaderID:Me,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:V,batching:Rt,batchingColor:Rt&&P._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&P.instanceColor!==null,instancingMorph:Ye&&P.morphTexture!==null,outputColorSpace:Re===null?i.outputColorSpace:Re.isXRRenderTarget===!0?Re.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Fe,matcap:ht,envMap:dt,envMapMode:dt&&W.mapping,envMapPMREM:Qe,envMapMaxLod:Qe?De.length-1:null,envMapSize:Qe?De[0].width:null,aoMap:$t,lightMap:Ft,bumpMap:gn,normalMap:Mt,displacementMap:si,emissiveMap:Vt,normalMapObjectSpace:Mt&&_.normalMapType===tp,normalMapTangentSpace:Mt&&_.normalMapType===tl,packedNormalMap:Mt&&_.normalMapType===tl&&Nv(_.normalMap.format),metalnessMap:Nn,roughnessMap:Un,anisotropy:On,anisotropyMap:Xe,clearcoat:F,clearcoatMap:R,clearcoatNormalMap:T,clearcoatRoughnessMap:H,diffuseRoughness:Fn,diffuseRoughnessMap:ie,dispersion:yt,retroreflection:vt,iridescence:me,iridescenceMap:Q,iridescenceThicknessMap:oe,sheen:Bt,sheenColorMap:fe,sheenRoughnessMap:Z,specularMap:$,specularColorMap:ce,specularIntensityMap:D,transmission:Ue,transmissionMap:K,thicknessMap:j,gradientMap:le,opaque:_.transparent===!1&&_.blending===ir&&_.alphaToCoverage===!1,alphaMap:re,alphaTest:ae,alphaHash:Ie,combine:_.combine,mapUv:Fe&&d(_.map.channel),aoMapUv:$t&&d(_.aoMap.channel),lightMapUv:Ft&&d(_.lightMap.channel),bumpMapUv:gn&&d(_.bumpMap.channel),normalMapUv:Mt&&d(_.normalMap.channel),displacementMapUv:si&&d(_.displacementMap.channel),emissiveMapUv:Vt&&d(_.emissiveMap.channel),metalnessMapUv:Nn&&d(_.metalnessMap.channel),roughnessMapUv:Un&&d(_.roughnessMap.channel),anisotropyMapUv:Xe&&d(_.anisotropyMap.channel),clearcoatMapUv:R&&d(_.clearcoatMap.channel),clearcoatNormalMapUv:T&&d(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:H&&d(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ie&&d(_.diffuseRoughnessMap.channel),iridescenceMapUv:Q&&d(_.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&d(_.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&d(_.sheenColorMap.channel),sheenRoughnessMapUv:Z&&d(_.sheenRoughnessMap.channel),specularMapUv:$&&d(_.specularMap.channel),specularColorMapUv:ce&&d(_.specularColorMap.channel),specularIntensityMapUv:D&&d(_.specularIntensityMap.channel),transmissionMapUv:K&&d(_.transmissionMap.channel),thicknessMapUv:j&&d(_.thicknessMap.channel),alphaMapUv:re&&d(_.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Mt||On),vertexNormals:!!L.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!L.attributes.uv&&(Fe||re),fog:!!O,useFog:_.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||L.attributes.normal===void 0&&Mt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ye,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ue,numSunLights:x.sun.length,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numSunLightShadows:x.sunShadowMap.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numLightProbeGrids:I.filter(_e=>_e.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&E.length>0,shadowMapType:i.shadowMap.type,toneMapping:se,decodeVideoTexture:Fe&&_.map.isVideoTexture===!0&&nt.getTransfer(_.map.colorSpace)===lt,decodeVideoTextureEmissive:Vt&&_.emissiveMap.isVideoTexture===!0&&nt.getTransfer(_.emissiveMap.colorSpace)===lt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Jt,flipSided:_.side===pn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Je&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&_.extensions.multiDraw===!0||Rt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return je.vertexUv1s=a.has(1),je.vertexUv2s=a.has(2),je.vertexUv3s=a.has(3),a.clear(),je}function y(_){let x=[];if(_.shaderID?x.push(_.shaderID):(x.push(_.customVertexShaderID),x.push(_.customFragmentShaderID)),_.defines!==void 0)for(let E in _.defines)x.push(E),x.push(_.defines[E]);return _.isRawShaderMaterial===!1&&(m(x,_),g(x,_),x.push(i.outputColorSpace)),x.push(_.customProgramCacheKey),x.join()}function m(_,x){_.push(x.precision),_.push(x.outputColorSpace),_.push(x.envMapMode),_.push(x.envMapPMREM),_.push(x.envMapMaxLod),_.push(x.envMapSize),_.push(x.mapUv),_.push(x.alphaMapUv),_.push(x.lightMapUv),_.push(x.aoMapUv),_.push(x.bumpMapUv),_.push(x.normalMapUv),_.push(x.displacementMapUv),_.push(x.emissiveMapUv),_.push(x.metalnessMapUv),_.push(x.roughnessMapUv),_.push(x.anisotropyMapUv),_.push(x.clearcoatMapUv),_.push(x.clearcoatNormalMapUv),_.push(x.clearcoatRoughnessMapUv),_.push(x.diffuseRoughnessMapUv),_.push(x.iridescenceMapUv),_.push(x.iridescenceThicknessMapUv),_.push(x.sheenColorMapUv),_.push(x.sheenRoughnessMapUv),_.push(x.specularMapUv),_.push(x.specularColorMapUv),_.push(x.specularIntensityMapUv),_.push(x.transmissionMapUv),_.push(x.thicknessMapUv),_.push(x.combine),_.push(x.fogExp2),_.push(x.sizeAttenuation),_.push(x.morphTargetsCount),_.push(x.numSunLights),_.push(x.numDirLights),_.push(x.numPointLights),_.push(x.numSpotLights),_.push(x.numSpotLightMaps),_.push(x.numHemiLights),_.push(x.numRectAreaLights),_.push(x.numSunLightShadows),_.push(x.numDirLightShadows),_.push(x.numPointLightShadows),_.push(x.numSpotLightShadows),_.push(x.numSpotLightShadowsWithMaps),_.push(x.numLightProbes),_.push(x.numLightProbeGrids),_.push(x.shadowMapType),_.push(x.toneMapping),_.push(x.numClippingPlanes),_.push(x.numClipIntersection),_.push(x.depthPacking)}function g(_,x){o.disableAll(),x.instancing&&o.enable(0),x.instancingColor&&o.enable(1),x.instancingMorph&&o.enable(2),x.matcap&&o.enable(3),x.envMap&&o.enable(4),x.normalMapObjectSpace&&o.enable(5),x.normalMapTangentSpace&&o.enable(6),x.clearcoat&&o.enable(7),x.iridescence&&o.enable(8),x.alphaTest&&o.enable(9),x.vertexColors&&o.enable(10),x.vertexAlphas&&o.enable(11),x.vertexUv1s&&o.enable(12),x.vertexUv2s&&o.enable(13),x.vertexUv3s&&o.enable(14),x.vertexTangents&&o.enable(15),x.anisotropy&&o.enable(16),x.alphaHash&&o.enable(17),x.batching&&o.enable(18),x.dispersion&&o.enable(19),x.retroreflection&&o.enable(24),x.diffuseRoughness&&o.enable(25),x.batchingColor&&o.enable(20),x.gradientMap&&o.enable(21),x.packedNormalMap&&o.enable(22),x.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),x.numLightProbeGrids>0&&o.enable(22),x.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function S(_){let x=f[_.type],E;if(x){let C=pi[x];E=yp.clone(C.uniforms)}else E=_.uniforms;return E}function A(_,x){let E=h.get(x);return E!==void 0?++E.usedTimes:(E=new Lv(i,x,_,s),l.push(E),h.set(x,E)),E}function v(_){if(--_.usedTimes===0){let x=l.indexOf(_);l[x]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function b(_){c.remove(_)}function M(){c.dispose()}return{getParameters:p,getProgramCacheKey:y,getUniforms:S,acquireProgram:A,releaseProgram:v,releaseShaderCache:b,programs:l,dispose:M}}function Ov(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let c=i.get(o);return c===void 0&&(c={},i.set(o,c)),c}function n(o){i.delete(o)}function s(o,c,a){i.get(o)[c]=a}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Fv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function kp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function zp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function c(f,d,p,y,m,g){let S=i[e];return S===void 0?(S={id:f.id,object:f,geometry:d,material:p,materialVariant:o(f),groupOrder:y,renderOrder:f.renderOrder,z:m,group:g},i[e]=S):(S.id=f.id,S.object=f,S.geometry=d,S.material=p,S.materialVariant=o(f),S.groupOrder=y,S.renderOrder=f.renderOrder,S.z=m,S.group=g),e++,S}function a(f,d,p,y,m,g,S){S.reversedDepth===!0&&(m=-m);let A=c(f,d,p,y,m,g);p.transmission>0?n.push(A):p.transparent===!0?s.push(A):t.push(A)}function l(f,d,p,y,m,g){let S=c(f,d,p,y,m,g);p.transmission>0?n.unshift(S):p.transparent===!0?s.unshift(S):t.unshift(S)}function h(f,d){t.length>1&&t.sort(f||Fv),n.length>1&&n.sort(d||kp),s.length>1&&s.sort(d||kp)}function u(){for(let f=e,d=i.length;f<d;f++){let p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:u,sort:h}}function Bv(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new zp,i.set(n,[o])):s>=r.length?(o=new zp,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function kv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new B,color:new He};break;case"SpotLight":t={position:new B,direction:new B,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function zv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Hv=0;function Gv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Vv(i){let e=new kv,t=zv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new B);let s=new B,r=new ot,o=new ot;function c(l){let h=0,u=0,f=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let d=0,p=0,y=0,m=0,g=0,S=0,A=0,v=0,b=0,M=0,_=0,x=0,E=0,C=0;l.sort(Gv);for(let I=0,O=l.length;I<O;I++){let L=l[I],U=L.color,k=L.intensity,W=L.distance,ee=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===$i?ee=L.shadow.map.texture:ee=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=U.r*k,u+=U.g*k,f+=U.b*k;else if(L.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(L.sh.coefficients[V],k);C++}else if(L.isSunLight){let V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let q=L.shadow,te=t.get(L);te.shadowIntensity=q.intensity,te.shadowBias=q.bias,te.shadowNormalBias=q.normalBias,te.shadowRadius=q.radius,te.shadowMapSize.copy(q.mapSize).multiply(q.getFrameExtents()),n.sunShadow[p]=te,n.sunShadowMap[p]=ee;let ue=q.getViewportCount();for(let Pe=0;Pe<ue;Pe++)n.sunShadowMatrix[y+Pe]=q.getMatrix(Pe),n.sunShadowCascade[y+Pe]=q._cascadeData[Pe];y+=ue,p++}n.sun[d]=V,d++}else if(L.isDirectionalLight){let V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let q=L.shadow,te=t.get(L);te.shadowIntensity=q.intensity,te.shadowBias=q.bias,te.shadowNormalBias=q.normalBias,te.shadowRadius=q.radius,te.shadowMapSize=q.mapSize,n.directionalShadow[m]=te,n.directionalShadowMap[m]=ee,n.directionalShadowMatrix[m]=L.shadow.matrix,b++}n.directional[m]=V,m++}else if(L.isSpotLight){let V=e.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(U).multiplyScalar(k),V.distance=W,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,n.spot[S]=V;let q=L.shadow;if(L.map&&(n.spotLightMap[x]=L.map,x++,q.updateMatrices(L),L.castShadow&&E++),n.spotLightMatrix[S]=q.matrix,L.castShadow){let te=t.get(L);te.shadowIntensity=q.intensity,te.shadowBias=q.bias,te.shadowNormalBias=q.normalBias,te.shadowRadius=q.radius,te.shadowMapSize=q.mapSize,n.spotShadow[S]=te,n.spotShadowMap[S]=ee,_++}S++}else if(L.isRectAreaLight){let V=e.get(L);V.color.copy(U).multiplyScalar(k),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),n.rectArea[A]=V,A++}else if(L.isPointLight){let V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),V.distance=L.distance,V.decay=L.decay,L.castShadow){let q=L.shadow,te=t.get(L);te.shadowIntensity=q.intensity,te.shadowBias=q.bias,te.shadowNormalBias=q.normalBias,te.shadowRadius=q.radius,te.shadowMapSize=q.mapSize,te.shadowCameraNear=q.camera.near,te.shadowCameraFar=q.camera.far,n.pointShadow[g]=te,n.pointShadowMap[g]=ee,n.pointShadowMatrix[g]=L.shadow.matrix,M++}n.point[g]=V,g++}else if(L.isHemisphereLight){let V=e.get(L);V.skyColor.copy(L.color).multiplyScalar(k),V.groundColor.copy(L.groundColor).multiplyScalar(k),n.hemi[v]=V,v++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let P=n.hash;(P.sunLength!==d||P.directionalLength!==m||P.pointLength!==g||P.spotLength!==S||P.rectAreaLength!==A||P.hemiLength!==v||P.numSunShadows!==p||P.numDirectionalShadows!==b||P.numPointShadows!==M||P.numSpotShadows!==_||P.numSpotMaps!==x||P.numLightProbes!==C)&&(n.sun.length=d,n.directional.length=m,n.spot.length=S,n.rectArea.length=A,n.point.length=g,n.hemi.length=v,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.pointShadowMatrix.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.spotLightMatrix.length=_+x-E,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,P.sunLength=d,P.directionalLength=m,P.pointLength=g,P.spotLength=S,P.rectAreaLength=A,P.hemiLength=v,P.numSunShadows=p,P.numDirectionalShadows=b,P.numPointShadows=M,P.numSpotShadows=_,P.numSpotMaps=x,P.numLightProbes=C,n.version=Hv++)}function a(l,h){let u=0,f=0,d=0,p=0,y=0,m=0,g=h.matrixWorldInverse;for(let S=0,A=l.length;S<A;S++){let v=l[S];if(v.isSunLight){let b=n.sun[u];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(g),u++}else if(v.isDirectionalLight){let b=n.directional[f];b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),f++}else if(v.isSpotLight){let b=n.spot[p];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),p++}else if(v.isRectAreaLight){let b=n.rectArea[y];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),b.halfWidth.set(v.width*.5,0,0),b.halfHeight.set(0,v.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),y++}else if(v.isPointLight){let b=n.point[d];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(g),d++}else if(v.isHemisphereLight){let b=n.hemi[m];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(g),m++}}}return{setup:c,setupView:a,state:n}}function Hp(i){let e=new Vv(i),t=[],n=[],s=[];function r(u){h.camera=u,t.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):t.push(u)}function c(u){n.push(u)}function a(){e.setup(t),s.sort((u,f)=>u.priority-f.priority||u.id-f.id)}function l(u){e.setupView(t,u)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:c}}function Wv(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),c;return o===void 0?(c=new Hp(i),e.set(s,[c])):r>=o.length?(c=new Hp(i),o.push(c)):c=o[r],c}function n(){e=new WeakMap}return{get:t,dispose:n}}var Xv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qv=`uniform sampler2D shadow_pass;
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
}`,Yv=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],jv=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],Gp=new ot,Mo=new B,_u=new B;function Jv(i,e,t){let n=new Xi,s=new Se,r=new Se,o=new St,c=new Ka,a=new Qa,l={},h=t.maxTextureSize,u={[Zi]:pn,[pn]:Zi,[Jt]:Jt},f=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:Xv,fragmentShader:qv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let p=new Ct;p.setAttribute("position",new Dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Ve(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=po;let g=this.type;this.render=function(M,_,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===Dd&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=po);let E=i.getRenderTarget(),C=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),I=i.state;I.setBlending(ds),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let O=g!==this.type;O&&_.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(U=>U.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,U=M.length;L<U;L++){let k=M[L],W=k.shadow;if(W===void 0){Oe("WebGLShadowMap:",k,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let ee=W.getFrameExtents();s.multiply(ee),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ee.x),s.x=r.x*ee.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ee.y),s.y=r.y*ee.y,W.mapSize.y=r.y));let V=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=V,W.map===null||O===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===nr){if(k.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Cn(s.x,s.y,{format:$i,type:ti,minFilter:dn,magFilter:dn,generateMipmaps:!1}),W.map.texture.name=k.name+".shadowMap",W.map.depthTexture=new Ri(s.x,s.y,Wn),W.map.depthTexture.name=k.name+".shadowMapDepth",W.map.depthTexture.format=Ai,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=jt,W.map.depthTexture.magFilter=jt}else k.isPointLight?(W.map=new To(s.x),W.map.depthTexture=new Jr(s.x,ei)):(W.map=new Cn(s.x,s.y),W.map.depthTexture=new Ri(s.x,s.y,ei)),W.map.depthTexture.name=k.name+".shadowMap",W.map.depthTexture.format=Ai,this.type===po?(W.map.depthTexture.compareFunction=V?tu:eu,W.map.depthTexture.minFilter=dn,W.map.depthTexture.magFilter=dn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=jt,W.map.depthTexture.magFilter=jt);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let q=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();k.isPointLight!==!0&&W.updateMatrices(k,x);let te=(W.camera.layers.mask&4294967294)!==0?W.camera.layers:x.layers;for(let ue=0;ue<q;ue++){let Pe=W.getCamera(ue);if(k.isPointLight){let J=W.camera,ge=W.matrix,Me=k.distance||J.far;Me!==J.far&&(J.far=Me,J.updateProjectionMatrix()),Mo.setFromMatrixPosition(k.matrixWorld),J.position.copy(Mo),_u.copy(J.position),_u.add(Yv[ue]),J.up.copy(jv[ue]),J.lookAt(_u),J.updateMatrixWorld(),ge.makeTranslation(-Mo.x,-Mo.y,-Mo.z),Gp.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Gp,J.coordinateSystem,J.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,ue),i.clear();else{ue===0&&(i.setRenderTarget(W.map),i.clear());let J=W.getViewport(ue);o.set(r.x*J.x,r.y*J.y,r.x*J.z,r.y*J.w),I.viewport(o)}n=W.getFrustum(ue),v(_,x,Pe,k,te,this.type)}W.isPointLightShadow!==!0&&this.type===nr&&S(W,x),W.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(E,C,P)};function S(M,_){let x=e.update(y);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,d.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),M.mapPass===null?M.mapPass=new Cn(s.x,s.y,{format:$i,type:ti}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),f.uniforms.shadow_pass.value=M.map.depthTexture,f.uniforms.resolution.value.set(M.map.width,M.map.height),f.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(_,null,x,f,y,null),d.uniforms.shadow_pass.value=M.mapPass.texture,d.uniforms.resolution.value.set(M.map.width,M.map.height),d.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(_,null,x,d,y,null)}function A(M,_,x,E){let C=null,P=x.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(P!==void 0)C=P;else if(C=x.isPointLight===!0?a:c,i.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){let I=C.uuid,O=_.uuid,L=l[I];L===void 0&&(L={},l[I]=L);let U=L[O];U===void 0&&(U=C.clone(),L[O]=U,_.addEventListener("dispose",b)),C=U}if(C.visible=_.visible,C.wireframe=_.wireframe,E===nr?C.side=_.shadowSide!==null?_.shadowSide:_.side:C.side=_.shadowSide!==null?_.shadowSide:u[_.side],C.alphaMap=_.alphaMap,C.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,C.map=_.map,C.clipShadows=_.clipShadows,C.clippingPlanes=_.clippingPlanes,C.clipIntersection=_.clipIntersection,C.displacementMap=_.displacementMap,C.displacementScale=_.displacementScale,C.displacementBias=_.displacementBias,C.wireframeLinewidth=_.wireframeLinewidth,C.linewidth=_.linewidth,x.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let I=i.properties.get(C);I.light=x}return C}function v(M,_,x,E,C,P){if(M.visible===!1)return;if(M.layers.test(C)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&P===nr)&&(!M.frustumCulled||M.intersectsFrustum(n))){M.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,M.matrixWorld);let L=e.update(M),U=M.material;if(Array.isArray(U)){let k=L.groups;for(let W=0,ee=k.length;W<ee;W++){let V=k[W],q=U[V.materialIndex];if(q&&q.visible){let te=A(M,q,E,P);M.onBeforeShadow(i,M,_,x,L,te,V),i.renderBufferDirect(x,null,L,te,M,V),M.onAfterShadow(i,M,_,x,L,te,V)}}}else if(U.visible){let k=A(M,U,E,P);M.onBeforeShadow(i,M,_,x,L,k,null),i.renderBufferDirect(x,null,L,k,M,null),M.onAfterShadow(i,M,_,x,L,k,null)}}let O=M.children;for(let L=0,U=O.length;L<U;L++)v(O[L],_,x,E,C,P)}function b(M){M.target.removeEventListener("dispose",b);for(let x in l){let E=l[x],C=M.target.uuid;C in E&&(E[C].dispose(),delete E[C])}}}function Zv(i,e){function t(){let D=!1,K=new St,j=null,le=new St(0,0,0,0);return{setMask:function(re){j!==re&&!D&&(i.colorMask(re,re,re,re),j=re)},setLocked:function(re){D=re},setClear:function(re,ae,Ie,Je,se){se===!0&&(re*=Je,ae*=Je,Ie*=Je),K.set(re,ae,Ie,Je),le.equals(K)===!1&&(i.clearColor(re,ae,Ie,Je),le.copy(K))},reset:function(){D=!1,j=null,le.set(-1,0,0,0)}}}function n(){let D=!1,K=!1,j=null,le=null,re=null;return{setReversed:function(ae){if(K!==ae){let Ie=e.get("EXT_clip_control");ae?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),K=ae;let Je=re;re=null,this.setClear(Je)}},getReversed:function(){return K},setTest:function(ae){ae?ye(i.DEPTH_TEST):Ye(i.DEPTH_TEST)},setMask:function(ae){j!==ae&&!D&&(i.depthMask(ae),j=ae)},setFunc:function(ae){if(K&&(ae=fp[ae]),le!==ae){switch(ae){case Pa:i.depthFunc(i.NEVER);break;case Ia:i.depthFunc(i.ALWAYS);break;case La:i.depthFunc(i.LESS);break;case Vs:i.depthFunc(i.LEQUAL);break;case Da:i.depthFunc(i.EQUAL);break;case Na:i.depthFunc(i.GEQUAL);break;case Ws:i.depthFunc(i.GREATER);break;case Ua:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}le=ae}},setLocked:function(ae){D=ae},setClear:function(ae){re!==ae&&(re=ae,K&&(ae=1-ae),i.clearDepth(ae))},reset:function(){D=!1,j=null,le=null,re=null,K=!1}}}function s(){let D=!1,K=null,j=null,le=null,re=null,ae=null,Ie=null,Je=null,se=null;return{setTest:function(De){D||(De?ye(i.STENCIL_TEST):Ye(i.STENCIL_TEST))},setMask:function(De){K!==De&&!D&&(i.stencilMask(De),K=De)},setFunc:function(De,je,_e){(j!==De||le!==je||re!==_e)&&(i.stencilFunc(De,je,_e),j=De,le=je,re=_e)},setOp:function(De,je,_e){(ae!==De||Ie!==je||Je!==_e)&&(i.stencilOp(De,je,_e),ae=De,Ie=je,Je=_e)},setLocked:function(De){D=De},setClear:function(De){se!==De&&(i.clearStencil(De),se=De)},reset:function(){D=!1,K=null,j=null,le=null,re=null,ae=null,Ie=null,Je=null,se=null}}}let r=new t,o=new n,c=new s,a={},l=new WeakMap,h={},u={},f={},d=new WeakMap,p=[],y=null,m=!1,g=null,S=null,A=null,v=null,b=null,M=null,_=null,x=new He(0,0,0),E=0,C=!1,P=null,I=null,O=null,L=null,U=null,k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,ee=0,V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=ee>=1):V.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=ee>=2);let q=null,te={},ue=i.getParameter(i.SCISSOR_BOX),Pe=i.getParameter(i.VIEWPORT),J=new St().fromArray(ue),ge=new St().fromArray(Pe);function Me(D,K,j,le){let re=new Uint8Array(4),ae=i.createTexture();i.bindTexture(D,ae),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ie=0;Ie<j;Ie++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(K,0,i.RGBA,1,1,le,0,i.RGBA,i.UNSIGNED_BYTE,re):i.texImage2D(K+Ie,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,re);return ae}let Re={};Re[i.TEXTURE_2D]=Me(i.TEXTURE_2D,i.TEXTURE_2D,1),Re[i.TEXTURE_CUBE_MAP]=Me(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Re[i.TEXTURE_2D_ARRAY]=Me(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Re[i.TEXTURE_3D]=Me(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),c.setClear(0),ye(i.DEPTH_TEST),o.setFunc(Vs),gn(!1),Mt(Uh),ye(i.CULL_FACE),$t(ds);function ye(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function Ye(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Rt(D,K){return f[D]!==K?(i.bindFramebuffer(D,K),f[D]=K,D===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=K),D===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=K),!0):!1}function Fe(D,K){let j=p,le=!1;if(D){j=d.get(K),j===void 0&&(j=[],d.set(K,j));let re=D.textures;if(j.length!==re.length||j[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,Ie=re.length;ae<Ie;ae++)j[ae]=i.COLOR_ATTACHMENT0+ae;j.length=re.length,le=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,le=!0);le&&i.drawBuffers(j)}function ht(D){return y!==D?(i.useProgram(D),y=D,!0):!1}let dt={[ps]:i.FUNC_ADD,[Nd]:i.FUNC_SUBTRACT,[Ud]:i.FUNC_REVERSE_SUBTRACT};dt[Od]=i.MIN,dt[Fd]=i.MAX;let Qe={[Bd]:i.ZERO,[kd]:i.ONE,[zd]:i.SRC_COLOR,[Bh]:i.SRC_ALPHA,[qd]:i.SRC_ALPHA_SATURATE,[Wd]:i.DST_COLOR,[Gd]:i.DST_ALPHA,[Hd]:i.ONE_MINUS_SRC_COLOR,[kh]:i.ONE_MINUS_SRC_ALPHA,[Xd]:i.ONE_MINUS_DST_COLOR,[Vd]:i.ONE_MINUS_DST_ALPHA,[Yd]:i.CONSTANT_COLOR,[jd]:i.ONE_MINUS_CONSTANT_COLOR,[Jd]:i.CONSTANT_ALPHA,[Zd]:i.ONE_MINUS_CONSTANT_ALPHA};function $t(D,K,j,le,re,ae,Ie,Je,se,De){if(D===ds){m===!0&&(Ye(i.BLEND),m=!1);return}if(m===!1&&(ye(i.BLEND),m=!0),D!==dc){if(D!==g||De!==C){if((S!==ps||b!==ps)&&(i.blendEquation(i.FUNC_ADD),S=ps,b=ps),De)switch(D){case ir:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case sr:i.blendFunc(i.ONE,i.ONE);break;case Oh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ze("WebGLState: Invalid blending: ",D);break}else switch(D){case ir:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case sr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Oh:ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Fh:ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ze("WebGLState: Invalid blending: ",D);break}A=null,v=null,M=null,_=null,x.set(0,0,0),E=0,g=D,C=De}return}re=re||K,ae=ae||j,Ie=Ie||le,(K!==S||re!==b)&&(i.blendEquationSeparate(dt[K],dt[re]),S=K,b=re),(j!==A||le!==v||ae!==M||Ie!==_)&&(i.blendFuncSeparate(Qe[j],Qe[le],Qe[ae],Qe[Ie]),A=j,v=le,M=ae,_=Ie),(Je.equals(x)===!1||se!==E)&&(i.blendColor(Je.r,Je.g,Je.b,se),x.copy(Je),E=se),g=D,C=!1}function Ft(D,K){D.side===Jt?Ye(i.CULL_FACE):ye(i.CULL_FACE);let j=D.side===pn;K&&(j=!j),gn(j),D.blending===ir&&D.transparent===!1?$t(ds):$t(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let le=D.stencilWrite;c.setTest(le),le&&(c.setMask(D.stencilWriteMask),c.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),c.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Vt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ye(i.SAMPLE_ALPHA_TO_COVERAGE):Ye(i.SAMPLE_ALPHA_TO_COVERAGE)}function gn(D){P!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),P=D)}function Mt(D){D!==Id?(ye(i.CULL_FACE),D!==I&&(D===Uh?i.cullFace(i.BACK):D===Ld?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ye(i.CULL_FACE),I=D}function si(D){D!==O&&(W&&i.lineWidth(D),O=D)}function Vt(D,K,j){D?(ye(i.POLYGON_OFFSET_FILL),(L!==K||U!==j)&&(L=K,U=j,o.getReversed()&&(K=-K,j=-j),i.polygonOffset(K,j))):Ye(i.POLYGON_OFFSET_FILL)}function Nn(D){D?ye(i.SCISSOR_TEST):Ye(i.SCISSOR_TEST)}function Un(D){D===void 0&&(D=i.TEXTURE0+k-1),q!==D&&(i.activeTexture(D),q=D)}function On(D,K,j){j===void 0&&(q===null?j=i.TEXTURE0+k-1:j=q);let le=te[j];le===void 0&&(le={type:void 0,texture:void 0},te[j]=le),(le.type!==D||le.texture!==K)&&(q!==j&&(i.activeTexture(j),q=j),i.bindTexture(D,K||Re[D]),le.type=D,le.texture=K)}function F(){let D=te[q];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Fn(){try{i.compressedTexImage2D(...arguments)}catch(D){ze("WebGLState:",D)}}function yt(){try{i.compressedTexImage3D(...arguments)}catch(D){ze("WebGLState:",D)}}function vt(){try{i.texSubImage2D(...arguments)}catch(D){ze("WebGLState:",D)}}function me(){try{i.texSubImage3D(...arguments)}catch(D){ze("WebGLState:",D)}}function Bt(){try{i.compressedTexSubImage2D(...arguments)}catch(D){ze("WebGLState:",D)}}function Ue(){try{i.compressedTexSubImage3D(...arguments)}catch(D){ze("WebGLState:",D)}}function Xe(){try{i.texStorage2D(...arguments)}catch(D){ze("WebGLState:",D)}}function R(){try{i.texStorage3D(...arguments)}catch(D){ze("WebGLState:",D)}}function T(){try{i.texImage2D(...arguments)}catch(D){ze("WebGLState:",D)}}function H(){try{i.texImage3D(...arguments)}catch(D){ze("WebGLState:",D)}}function ie(D){return u[D]!==void 0?u[D]:i.getParameter(D)}function Q(D,K){u[D]!==K&&(i.pixelStorei(D,K),u[D]=K)}function oe(D){J.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),J.copy(D))}function fe(D){ge.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),ge.copy(D))}function Z(D,K){let j=l.get(K);j===void 0&&(j=new WeakMap,l.set(K,j));let le=j.get(D);le===void 0&&(le=i.getUniformBlockIndex(K,D.name),i.uniformBlockBinding(K,le,le),j.set(D,le))}function $(D,K,j){let re=l.get(K).get(D);a[re]!==j&&(i.bindBufferBase(i.UNIFORM_BUFFER,re,j),a[re]=j)}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},q=null,te={},f={},a={},d=new WeakMap,p=[],y=null,m=!1,g=null,S=null,A=null,v=null,b=null,M=null,_=null,x=new He(0,0,0),E=0,C=!1,P=null,I=null,O=null,L=null,U=null,J.set(0,0,i.canvas.width,i.canvas.height),ge.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),c.reset()}return{buffers:{color:r,depth:o,stencil:c},enable:ye,disable:Ye,bindFramebuffer:Rt,drawBuffers:Fe,useProgram:ht,setBlending:$t,setMaterial:Ft,setFlipSided:gn,setCullFace:Mt,setLineWidth:si,setPolygonOffset:Vt,setScissorTest:Nn,activeTexture:Un,bindTexture:On,unbindTexture:F,compressedTexImage2D:Fn,compressedTexImage3D:yt,texImage2D:T,texImage3D:H,pixelStorei:Q,getParameter:ie,updateUBOMapping:Z,uniformBlockBinding:$,texStorage2D:Xe,texStorage3D:R,texSubImage2D:vt,texSubImage3D:me,compressedTexSubImage2D:Bt,compressedTexSubImage3D:Ue,scissor:oe,viewport:fe,reset:ce}}function $v(i,e,t,n,s,r,o){let c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,a=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Se,h=new WeakMap,u=new Set,f,d=new WeakMap,p=new Set,y=new FinalizationRegistry(R=>p.delete(R)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,T){return m?new OffscreenCanvas(R,T):Fr("canvas")}function S(R,T,H){let ie=1,Q=Xe(R);if((Q.width>H||Q.height>H)&&(ie=H/Math.max(Q.width,Q.height)),ie<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let oe=Math.floor(ie*Q.width),fe=Math.floor(ie*Q.height);f===void 0&&(f=g(oe,fe));let Z=T?g(oe,fe):f;return Z.width=oe,Z.height=fe,Z.getContext("2d").drawImage(R,0,0,oe,fe),Oe("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+oe+"x"+fe+")."),Z}else return"data"in R&&Oe("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function A(R){return R.generateMipmaps}function v(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(R,T,H,ie,Q,oe=!1){if(R!==null){if(i[R]!==void 0)return i[R];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let fe;ie&&(fe=e.get("EXT_texture_norm16"),fe||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=T;if(T===i.RED&&(H===i.FLOAT&&(Z=i.R32F),H===i.HALF_FLOAT&&(Z=i.R16F),H===i.UNSIGNED_BYTE&&(Z=i.R8),H===i.UNSIGNED_SHORT&&fe&&(Z=fe.R16_EXT),H===i.SHORT&&fe&&(Z=fe.R16_SNORM_EXT)),T===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.R8UI),H===i.UNSIGNED_SHORT&&(Z=i.R16UI),H===i.UNSIGNED_INT&&(Z=i.R32UI),H===i.BYTE&&(Z=i.R8I),H===i.SHORT&&(Z=i.R16I),H===i.INT&&(Z=i.R32I)),T===i.RG&&(H===i.FLOAT&&(Z=i.RG32F),H===i.HALF_FLOAT&&(Z=i.RG16F),H===i.UNSIGNED_BYTE&&(Z=i.RG8),H===i.UNSIGNED_SHORT&&fe&&(Z=fe.RG16_EXT),H===i.SHORT&&fe&&(Z=fe.RG16_SNORM_EXT)),T===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RG8UI),H===i.UNSIGNED_SHORT&&(Z=i.RG16UI),H===i.UNSIGNED_INT&&(Z=i.RG32UI),H===i.BYTE&&(Z=i.RG8I),H===i.SHORT&&(Z=i.RG16I),H===i.INT&&(Z=i.RG32I)),T===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),H===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),H===i.UNSIGNED_INT&&(Z=i.RGB32UI),H===i.BYTE&&(Z=i.RGB8I),H===i.SHORT&&(Z=i.RGB16I),H===i.INT&&(Z=i.RGB32I)),T===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),H===i.UNSIGNED_INT&&(Z=i.RGBA32UI),H===i.BYTE&&(Z=i.RGBA8I),H===i.SHORT&&(Z=i.RGBA16I),H===i.INT&&(Z=i.RGBA32I)),T===i.RGB&&(H===i.UNSIGNED_SHORT&&fe&&(Z=fe.RGB16_EXT),H===i.SHORT&&fe&&(Z=fe.RGB16_SNORM_EXT),H===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),T===i.RGBA){let $=oe?Or:nt.getTransfer(Q);H===i.FLOAT&&(Z=i.RGBA32F),H===i.HALF_FLOAT&&(Z=i.RGBA16F),H===i.UNSIGNED_BYTE&&(Z=$===lt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT&&fe&&(Z=fe.RGBA16_EXT),H===i.SHORT&&fe&&(Z=fe.RGBA16_SNORM_EXT),H===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function _(R,T){let H;return R?T===null||T===ei||T===gs?H=i.DEPTH24_STENCIL8:T===Wn?H=i.DEPTH32F_STENCIL8:T===or&&(H=i.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===ei||T===gs?H=i.DEPTH_COMPONENT24:T===Wn?H=i.DEPTH_COMPONENT32F:T===or&&(H=i.DEPTH_COMPONENT16),H}function x(R,T){return A(R)===!0||R.isFramebufferTexture&&R.minFilter!==jt&&R.minFilter!==dn?Math.log2(Math.max(T.width,T.height))+1:R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?T.mipmaps.length:1}function E(R){let T=new WeakRef(R);n.get(R).__ref=T,p.add(T),y.register(R,T,T)}function C(R){let T=n.get(R).__ref;T!==void 0&&(p.delete(T),y.unregister(T))}function P(R){O(R.target)}function I(R){L(R.target)}function O(R){R.removeEventListener("dispose",P),C(R),k(R),R.isVideoTexture&&h.delete(R),R.isHTMLTexture&&u.delete(R)}function L(R){R.removeEventListener("dispose",I),C(R),ee(R)}function U(){for(let R of p){let T=R.deref();T!==void 0&&(T.isRenderTarget===!0?L(T):O(T))}p.clear(),u.clear()}function k(R){let T=n.get(R);if(T.__webglInit===void 0)return;let H=R.source,ie=d.get(H);if(ie){let Q=ie[T.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&W(R),Object.keys(ie).length===0&&d.delete(H)}n.remove(R)}function W(R){let T=n.get(R);i.deleteTexture(T.__webglTexture);let H=R.source,ie=d.get(H);delete ie[T.__cacheKey],o.memory.textures--}function ee(R){let T=n.get(R);T.__depthDisposeCallback&&T.__depthDisposeCallback();let H=R.depthTexture;if(H&&H.renderTarget===R&&O(H),R.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(T.__webglFramebuffer[Q]))for(let oe=0;oe<T.__webglFramebuffer[Q].length;oe++)i.deleteFramebuffer(T.__webglFramebuffer[Q][oe]);else i.deleteFramebuffer(T.__webglFramebuffer[Q]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[Q])}else{if(Array.isArray(T.__webglFramebuffer))for(let Q=0;Q<T.__webglFramebuffer.length;Q++)i.deleteFramebuffer(T.__webglFramebuffer[Q]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let Q=0;Q<T.__webglColorRenderbuffer.length;Q++)T.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[Q]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}let ie=R.textures;for(let Q=0,oe=ie.length;Q<oe;Q++){let fe=n.get(ie[Q]);fe.__webglTexture&&(i.deleteTexture(fe.__webglTexture),o.memory.textures--),n.remove(ie[Q])}n.remove(R)}let V=0;function q(){V=0}function te(){return V}function ue(R){V=R}function Pe(){let R=V;return R>=s.maxTextures&&Oe("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),V+=1,R}function J(R){let T=[];return T.push(R.wrapS),T.push(R.wrapT),T.push(R.wrapR||0),T.push(R.magFilter),T.push(R.minFilter),T.push(R.anisotropy),T.push(R.internalFormat),T.push(R.format),T.push(R.type),T.push(R.generateMipmaps),T.push(R.mipmapsAutoUpdate),T.push(R.premultiplyAlpha),T.push(R.flipY),T.push(R.unpackAlignment),T.push(R.colorSpace),T.join()}function ge(R,T){let H=n.get(R);if(R.isVideoTexture&&Bt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&H.__version!==R.version){let ie=R.image;if(ie===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{Ft(H,R,T);return}}else R.isExternalTexture&&(H.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+T)}function Me(R,T){let H=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){Ft(H,R,T);return}else R.isExternalTexture&&(H.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+T)}function Re(R,T){let H=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){Ft(H,R,T);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+T)}function ye(R,T){let H=n.get(R);if(R.version>0&&H.__version!==R.version){gn(H,R,T);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+T)}let Ye={[Oa]:i.REPEAT,[ci]:i.CLAMP_TO_EDGE,[Fa]:i.MIRRORED_REPEAT},Rt={[jt]:i.NEAREST,[Qd]:i.NEAREST_MIPMAP_NEAREST,[mo]:i.NEAREST_MIPMAP_LINEAR,[dn]:i.LINEAR,[_c]:i.LINEAR_MIPMAP_NEAREST,[Ii]:i.LINEAR_MIPMAP_LINEAR},Fe={[ip]:i.NEVER,[nu]:i.ALWAYS,[sp]:i.LESS,[eu]:i.LEQUAL,[rp]:i.EQUAL,[tu]:i.GEQUAL,[op]:i.GREATER,[ap]:i.NOTEQUAL};function ht(R,T){if(T.type===Wn&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===dn||T.magFilter===_c||T.magFilter===mo||T.magFilter===Ii||T.minFilter===dn||T.minFilter===_c||T.minFilter===mo||T.minFilter===Ii)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Ye[T.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Ye[T.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Ye[T.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Rt[T.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Rt[T.minFilter]),T.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Fe[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===jt||T.minFilter!==mo&&T.minFilter!==Ii||T.type===Wn&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function dt(R,T){let H=!1;R.__webglInit===void 0&&(R.__webglInit=!0,T.addEventListener("dispose",P),E(T));let ie=T.source,Q=d.get(ie);Q===void 0&&(Q={},d.set(ie,Q));let oe=J(T);if(oe!==R.__cacheKey){Q[oe]===void 0&&(Q[oe]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),Q[oe].usedTimes++;let fe=Q[R.__cacheKey];fe!==void 0&&(Q[R.__cacheKey].usedTimes--,fe.usedTimes===0&&W(T)),R.__cacheKey=oe,R.__webglTexture=Q[oe].texture}return H}function Qe(R,T,H){return Math.floor(Math.floor(R/H)/T)}function $t(R,T,H,ie){let oe=R.updateRanges;if(oe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,T.width,T.height,H,ie,T.data);else{oe.sort((D,K)=>D.start-K.start);let fe=0;for(let D=1;D<oe.length;D++){let K=oe[fe],j=oe[D],le=K.start+K.count,re=Qe(j.start,T.width,4),ae=Qe(K.start,T.width,4);j.start<=le+1&&re===ae&&Qe(j.start+j.count-1,T.width,4)===re?K.count=Math.max(K.count,j.start+j.count-K.start):(++fe,oe[fe]=j)}oe.length=fe+1;let Z=t.getParameter(i.UNPACK_ROW_LENGTH),$=t.getParameter(i.UNPACK_SKIP_PIXELS),ce=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,T.width);for(let D=0,K=oe.length;D<K;D++){let j=oe[D],le=Math.floor(j.start/4),re=Math.ceil(j.count/4),ae=le%T.width,Ie=Math.floor(le/T.width),Je=re,se=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ae),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ie),t.texSubImage2D(i.TEXTURE_2D,0,ae,Ie,Je,se,H,ie,T.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Z),t.pixelStorei(i.UNPACK_SKIP_PIXELS,$),t.pixelStorei(i.UNPACK_SKIP_ROWS,ce)}}function Ft(R,T,H){let ie=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ie=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ie=i.TEXTURE_3D);let Q=dt(R,T),oe=T.source;t.bindTexture(ie,R.__webglTexture,i.TEXTURE0+H);let fe=n.get(oe);if(oe.version!==fe.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+H),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){let se=nt.getPrimaries(nt.workingColorSpace),De=T.colorSpace===Di?null:nt.getPrimaries(T.colorSpace),je=T.colorSpace===Di||se===De?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,je)}t.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment);let $=S(T.image,!1,s.maxTextureSize);$=Ue(T,$);let ce=r.convert(T.format,T.colorSpace),D=r.convert(T.type),K=M(T.internalFormat,ce,D,T.normalized,T.colorSpace,T.isVideoTexture);ht(ie,T);let j,le=T.mipmaps,re=T.isVideoTexture!==!0,ae=fe.__version===void 0||Q===!0,Ie=oe.dataReady,Je=x(T,$);if(T.isDepthTexture)K=_(T.format===Li,T.type),ae&&(re?t.texStorage2D(i.TEXTURE_2D,1,K,$.width,$.height):t.texImage2D(i.TEXTURE_2D,0,K,$.width,$.height,0,ce,D,null));else if(T.isDataTexture)if(le.length>0){re&&ae&&t.texStorage2D(i.TEXTURE_2D,Je,K,le[0].width,le[0].height);for(let se=0,De=le.length;se<De;se++)j=le[se],re?Ie&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,j.width,j.height,ce,D,j.data):t.texImage2D(i.TEXTURE_2D,se,K,j.width,j.height,0,ce,D,j.data);T.generateMipmaps=!1}else re?(ae&&t.texStorage2D(i.TEXTURE_2D,Je,K,$.width,$.height),Ie&&$t(T,$,ce,D)):t.texImage2D(i.TEXTURE_2D,0,K,$.width,$.height,0,ce,D,$.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){re&&ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Je,K,le[0].width,le[0].height,$.depth);for(let se=0,De=le.length;se<De;se++)if(j=le[se],T.format!==ni)if(ce!==null)if(re){if(Ie)if(T.layerUpdates.size>0){let je=hu(j.width,j.height,T.format,T.type);for(let _e of T.layerUpdates){let ut=j.data.subarray(_e*je/j.data.BYTES_PER_ELEMENT,(_e+1)*je/j.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,_e,j.width,j.height,1,ce,ut)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,j.width,j.height,$.depth,ce,j.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,K,j.width,j.height,$.depth,0,j.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else re?Ie&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,j.width,j.height,$.depth,ce,D,j.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,K,j.width,j.height,$.depth,0,ce,D,j.data);T.layerUpdates.size>0&&T.clearLayerUpdates()}else{re&&ae&&t.texStorage2D(i.TEXTURE_2D,Je,K,le[0].width,le[0].height);for(let se=0,De=le.length;se<De;se++)j=le[se],T.format!==ni?ce!==null?re?Ie&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,j.width,j.height,ce,j.data):t.compressedTexImage2D(i.TEXTURE_2D,se,K,j.width,j.height,0,j.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?Ie&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,j.width,j.height,ce,D,j.data):t.texImage2D(i.TEXTURE_2D,se,K,j.width,j.height,0,ce,D,j.data)}else if(T.isDataArrayTexture)if(re){if(ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Je,K,$.width,$.height,$.depth),Ie)if(T.layerUpdates.size>0){let se=hu($.width,$.height,T.format,T.type);for(let De of T.layerUpdates){let je=$.data.subarray(De*se/$.data.BYTES_PER_ELEMENT,(De+1)*se/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,De,$.width,$.height,1,ce,D,je)}T.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,ce,D,$.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,K,$.width,$.height,$.depth,0,ce,D,$.data);else if(T.isData3DTexture)re?(ae&&t.texStorage3D(i.TEXTURE_3D,Je,K,$.width,$.height,$.depth),Ie&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,ce,D,$.data)):t.texImage3D(i.TEXTURE_3D,0,K,$.width,$.height,$.depth,0,ce,D,$.data);else if(T.isFramebufferTexture){if(ae)if(re)t.texStorage2D(i.TEXTURE_2D,Je,K,$.width,$.height);else{let se=$.width,De=$.height;for(let je=0;je<Je;je++)t.texImage2D(i.TEXTURE_2D,je,K,se,De,0,ce,D,null),se>>=1,De>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in i){let se=i.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),$.parentNode!==se){se.appendChild($),u.add(T),se.onpaint=De=>{let je=De.changedElements;for(let _e of u)je.includes(_e.image)&&(_e.needsUpdate=!0)},se.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,$);else{let je=i.RGBA,_e=i.RGBA,ut=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,je,_e,ut,$)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(le.length>0){if(re&&ae){let se=Xe(le[0]);t.texStorage2D(i.TEXTURE_2D,Je,K,se.width,se.height)}for(let se=0,De=le.length;se<De;se++)j=le[se],re?Ie&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ce,D,j):t.texImage2D(i.TEXTURE_2D,se,K,ce,D,j);T.generateMipmaps=!1}else if(re){if(ae){let se=Xe($);t.texStorage2D(i.TEXTURE_2D,Je,K,se.width,se.height)}Ie&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ce,D,$)}else t.texImage2D(i.TEXTURE_2D,0,K,ce,D,$);A(T)&&T.mipmapsAutoUpdate===!0&&v(ie),fe.__version=oe.version,T.onUpdate&&T.onUpdate(T)}R.__version=T.version}function gn(R,T,H){if(T.image.length!==6)return;let ie=dt(R,T),Q=T.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+H);let oe=n.get(Q);if(Q.version!==oe.__version||ie===!0){t.activeTexture(i.TEXTURE0+H);let fe=nt.getPrimaries(nt.workingColorSpace),Z=T.colorSpace===Di?null:nt.getPrimaries(T.colorSpace),$=T.colorSpace===Di||fe===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let ce=T.isCompressedTexture||T.image[0].isCompressedTexture,D=T.image[0]&&T.image[0].isDataTexture,K=[];for(let _e=0;_e<6;_e++)!ce&&!D?K[_e]=S(T.image[_e],!0,s.maxCubemapSize):K[_e]=D?T.image[_e].image:T.image[_e],K[_e]=Ue(T,K[_e]);let j=K[0],le=r.convert(T.format,T.colorSpace),re=r.convert(T.type),ae=M(T.internalFormat,le,re,T.normalized,T.colorSpace),Ie=T.isVideoTexture!==!0,Je=oe.__version===void 0||ie===!0,se=Q.dataReady,De=x(T,j);ht(i.TEXTURE_CUBE_MAP,T);let je;if(T.isDepthTexture){if(ae=_(T.format===Li,T.type),Je)if(Ie)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,ae,j.width,j.height);else for(let _e=0;_e<6;_e++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,ae,j.width,j.height,0,le,re,null)}else if(ce){Ie&&Je&&t.texStorage2D(i.TEXTURE_CUBE_MAP,De,ae,j.width,j.height);for(let _e=0;_e<6;_e++){je=K[_e].mipmaps;for(let ut=0;ut<je.length;ut++){let Wt=je[ut];T.format!==ni?le!==null?Ie?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ut,0,0,Wt.width,Wt.height,le,Wt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ut,ae,Wt.width,Wt.height,0,Wt.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ie?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ut,0,0,Wt.width,Wt.height,le,re,Wt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ut,ae,Wt.width,Wt.height,0,le,re,Wt.data)}}}else{if(je=T.mipmaps,Ie&&Je){je.length>0&&De++;let _e=Xe(K[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,De,ae,_e.width,_e.height)}for(let _e=0;_e<6;_e++)if(D){Ie?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,K[_e].width,K[_e].height,le,re,K[_e].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,ae,K[_e].width,K[_e].height,0,le,re,K[_e].data);for(let ut=0;ut<je.length;ut++){let Ui=je[ut].image[_e].image;Ie?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ut+1,0,0,Ui.width,Ui.height,le,re,Ui.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ut+1,ae,Ui.width,Ui.height,0,le,re,Ui.data)}}else{Ie?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,le,re,K[_e]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,ae,le,re,K[_e]);for(let ut=0;ut<je.length;ut++){let Wt=je[ut];Ie?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ut+1,0,0,le,re,Wt.image[_e]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ut+1,ae,le,re,Wt.image[_e])}}}A(T)&&T.mipmapsAutoUpdate===!0&&v(i.TEXTURE_CUBE_MAP),oe.__version=Q.version,T.onUpdate&&T.onUpdate(T)}R.__version=T.version}function Mt(R,T,H,ie,Q,oe){let fe=r.convert(H.format,H.colorSpace),Z=r.convert(H.type),$=M(H.internalFormat,fe,Z,H.normalized,H.colorSpace),ce=n.get(T),D=n.get(H);if(D.__renderTarget=T,!ce.__hasExternalTextures){let K=Math.max(1,T.width>>oe),j=Math.max(1,T.height>>oe);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,oe,$,K,j,T.depth,0,fe,Z,null):t.texImage2D(Q,oe,$,K,j,0,fe,Z,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),me(T)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,Q,D.__webglTexture,0,vt(T)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ie,Q,D.__webglTexture,oe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function si(R,T,H){if(i.bindRenderbuffer(i.RENDERBUFFER,R),T.depthBuffer){let ie=T.depthTexture,Q=ie&&ie.isDepthTexture?ie.type:null,oe=_(T.stencilBuffer,Q),fe=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;me(T)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,vt(T),oe,T.width,T.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,vt(T),oe,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,oe,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,R)}else{let ie=T.textures;for(let Q=0;Q<ie.length;Q++){let oe=ie[Q],fe=r.convert(oe.format,oe.colorSpace),Z=r.convert(oe.type),$=M(oe.internalFormat,fe,Z,oe.normalized,oe.colorSpace);me(T)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,vt(T),$,T.width,T.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,vt(T),$,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,$,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Vt(R,T,H){let ie=T.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(T.depthTexture);Q.__renderTarget=T;let oe=ie?T.depthTexture.image[0]:T.depthTexture.image;(!Q.__webglTexture||oe.width!==T.width||oe.height!==T.height)&&(oe.width=T.width,oe.height=T.height,T.depthTexture.needsUpdate=!0),ie?ye(T.depthTexture,0):ge(T.depthTexture,0);let fe=Q.__webglTexture,Z=vt(T),$=ie?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,ce=T.depthTexture.format===Li?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(T.depthTexture.format===Ai)me(T)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,$,fe,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,ce,$,fe,0);else if(T.depthTexture.format===Li)me(T)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,$,fe,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,ce,$,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Nn(R){let T=n.get(R),H=R.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==R.depthTexture){let ie=R.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ie){let Q=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ie.removeEventListener("dispose",Q)};ie.addEventListener("dispose",Q),T.__depthDisposeCallback=Q}T.__boundDepthTexture=ie}if(R.depthTexture&&!T.__autoAllocateDepthBuffer)if(H)for(let ie=0;ie<6;ie++)Vt(T.__webglFramebuffer[ie],R,ie);else R.texture.mipmaps.length>0?Vt(T.__webglFramebuffer[0],R,0):Vt(T.__webglFramebuffer,R,0);else if(H){T.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[ie]),T.__webglDepthbuffer[ie]===void 0)T.__webglDepthbuffer[ie]=i.createRenderbuffer(),si(T.__webglDepthbuffer[ie],R,!1);else{let Q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=T.__webglDepthbuffer[ie];i.bindRenderbuffer(i.RENDERBUFFER,oe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,oe)}}else if(R.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),si(T.__webglDepthbuffer,R,!1);else{let Q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,oe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,oe)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Un(R,T,H){let ie=n.get(R);T!==void 0&&Mt(ie.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Nn(R)}function On(R){let T=R.texture,H=n.get(R),ie=n.get(T);R.addEventListener("dispose",I),E(R);let Q=R.textures,oe=R.isWebGLCubeRenderTarget===!0,fe=Q.length>1;if(fe||(ie.__webglTexture===void 0&&(ie.__webglTexture=i.createTexture()),ie.__version=T.version,o.memory.textures++),oe){H.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(T.mipmaps.length>0){H.__webglFramebuffer[Z]=[];for(let $=0;$<T.mipmaps.length;$++)H.__webglFramebuffer[Z][$]=i.createFramebuffer()}else H.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(T.mipmaps.length>0){H.__webglFramebuffer=[];for(let Z=0;Z<T.mipmaps.length;Z++)H.__webglFramebuffer[Z]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(fe)for(let Z=0,$=Q.length;Z<$;Z++){let ce=n.get(Q[Z]);ce.__webglTexture===void 0&&(ce.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&me(R)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let Z=0;Z<Q.length;Z++){let $=Q[Z];H.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[Z]);let ce=r.convert($.format,$.colorSpace),D=r.convert($.type),K=M($.internalFormat,ce,D,$.normalized,$.colorSpace,R.isXRRenderTarget===!0),j=vt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,j,K,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,H.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),si(H.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(oe){t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture),ht(i.TEXTURE_CUBE_MAP,T);for(let Z=0;Z<6;Z++)if(T.mipmaps.length>0)for(let $=0;$<T.mipmaps.length;$++)Mt(H.__webglFramebuffer[Z][$],R,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,$);else Mt(H.__webglFramebuffer[Z],R,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);A(T)?v(i.TEXTURE_CUBE_MAP):T.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,T.mipmaps.length-1),t.unbindTexture()}else if(fe){for(let Z=0,$=Q.length;Z<$;Z++){let ce=Q[Z],D=n.get(ce),K=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(K=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,D.__webglTexture),ht(K,ce),Mt(H.__webglFramebuffer,R,ce,i.COLOR_ATTACHMENT0+Z,K,0),A(ce)&&v(K)}t.unbindTexture()}else{let Z=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Z=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Z,ie.__webglTexture),ht(Z,T),T.mipmaps.length>0)for(let $=0;$<T.mipmaps.length;$++)Mt(H.__webglFramebuffer[$],R,T,i.COLOR_ATTACHMENT0,Z,$);else Mt(H.__webglFramebuffer,R,T,i.COLOR_ATTACHMENT0,Z,0);A(T)?v(Z):T.mipmaps.length>0&&i.texParameteri(Z,i.TEXTURE_MAX_LEVEL,T.mipmaps.length-1),t.unbindTexture()}R.depthBuffer&&Nn(R)}function F(R){let T=R.textures;for(let H=0,ie=T.length;H<ie;H++){let Q=T[H];if(A(Q)&&Q.mipmapsAutoUpdate===!0){let oe=b(R),fe=n.get(Q).__webglTexture;t.bindTexture(oe,fe),v(oe),t.unbindTexture()}}}let Fn=[];function yt(R){if(R.samples>0){if(me(R)===!1){let T=R.textures,H=R.width,ie=R.height,Q=i.COLOR_BUFFER_BIT,oe=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=n.get(R),Z=T.length>1;if(Z)for(let ce=0;ce<T.length;ce++)t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer),R.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let ce=0;ce<T.length;ce++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,fe.__webglColorRenderbuffer[ce]);let D=n.get(T[ce]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,D,0)}i.blitFramebuffer(0,0,H,ie,0,0,H,ie,Q,i.NEAREST),a===!0&&(Fn.length=0,Fn.push(i.COLOR_ATTACHMENT0+ce),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&Fn.push(oe),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Fn))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ce=0;ce<T.length;ce++){t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,fe.__webglColorRenderbuffer[ce]);let D=n.get(T[ce]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,D,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&a){let T=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function vt(R){return Math.min(s.maxSamples,R.samples)}function me(R){let T=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Bt(R){let T=o.render.frame;h.get(R)!==T&&(h.set(R,T),R.update())}function Ue(R,T){let H=R.colorSpace,ie=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||H!==Ur&&H!==Di&&(nt.getTransfer(H)===lt?(ie!==ni||Q!==vn)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ze("WebGLTextures: Unsupported texture color space:",H)),T}function Xe(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=Pe,this.resetTextureUnits=q,this.getTextureUnits=te,this.setTextureUnits=ue,this.setTexture2D=ge,this.setTexture2DArray=Me,this.setTexture3D=Re,this.setTextureCube=ye,this.rebindTextures=Un,this.setupRenderTarget=On,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=yt,this.setupDepthRenderbuffer=Nn,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=me,this.dispose=U}function Kv(i,e){function t(n,s=Di){let r,o=nt.getTransfer(s);if(n===vn)return i.UNSIGNED_BYTE;if(n===yc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===vc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Zh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===$h)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===jh)return i.BYTE;if(n===Jh)return i.SHORT;if(n===or)return i.UNSIGNED_SHORT;if(n===xc)return i.INT;if(n===ei)return i.UNSIGNED_INT;if(n===Wn)return i.FLOAT;if(n===ti)return i.HALF_FLOAT;if(n===Kh)return i.ALPHA;if(n===Qh)return i.RGB;if(n===ni)return i.RGBA;if(n===Ai)return i.DEPTH_COMPONENT;if(n===Li)return i.DEPTH_STENCIL;if(n===Sc)return i.RED;if(n===Mc)return i.RED_INTEGER;if(n===$i)return i.RG;if(n===bc)return i.RG_INTEGER;if(n===Tc)return i.RGBA_INTEGER;if(n===go||n===_o||n===xo||n===yo)if(o===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===go)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===yo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===go)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_o)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===yo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ec||n===Ac||n===wc||n===Cc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ec)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ac)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Cc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Rc||n===Pc||n===Ic||n===Lc||n===Dc||n===vo||n===Nc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Rc||n===Pc)return o===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ic)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Lc)return r.COMPRESSED_R11_EAC;if(n===Dc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===vo)return r.COMPRESSED_RG11_EAC;if(n===Nc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Uc||n===Oc||n===Fc||n===Bc||n===kc||n===zc||n===Hc||n===Gc||n===Vc||n===Wc||n===Xc||n===qc||n===Yc||n===jc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Uc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Oc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Bc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===kc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===zc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Hc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Gc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Vc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Wc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Xc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===qc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Yc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===jc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Jc||n===Zc||n===$c)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Jc)return o===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Zc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$c)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Kc||n===Qc||n===So||n===el)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Kc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Qc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===So)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===el)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===gs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Qv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,eS=`
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

}`,Tu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Zr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Vn({vertexShader:Qv,fragmentShader:eS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ve(new qi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Eu=class extends li{constructor(e,t){super();let n=this,s=null,r=1,o=null,c="local-floor",a=1,l=null,h=null,u=null,f=null,d=null,p=null,y=typeof XRWebGLBinding<"u",m=new Tu,g={},S=t.getContextAttributes(),A=null,v=null,b=[],M=[],_=new Se,x=null,E=null,C=new fn;C.viewport=new St;let P=new fn;P.viewport=new St;let I=[C,P],O=new uc,L=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ge=b[J];return ge===void 0&&(ge=new js,b[J]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(J){let ge=b[J];return ge===void 0&&(ge=new js,b[J]=ge),ge.getGripSpace()},this.getHand=function(J){let ge=b[J];return ge===void 0&&(ge=new js,b[J]=ge),ge.getHandSpace()};function k(J){let ge=M.indexOf(J.inputSource);if(ge===-1)return;let Me=b[ge];Me!==void 0&&(Me.update(J.inputSource,J.frame,l||o),Me.dispatchEvent({type:J.type,data:J.inputSource}))}function W(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",ee);for(let J=0;J<b.length;J++){let ge=M[J];ge!==null&&(M[J]=null,b[J].disconnect(ge))}L=null,U=null,m.reset();for(let J in g)delete g[J];if(e.setRenderTarget(A),d=null,f=null,u=null,s=null,v=null,Pe.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(_.width,_.height,!1),E!==null){let J=E.camera;J.fov=E.fov,J.zoom=E.zoom,J.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){c=J,n.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",W),s.addEventListener("inputsourceschange",ee),S.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(_),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Re=null,ye=null;S.depth&&(ye=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=S.stencil?Li:Ai,Re=S.stencil?gs:ei);let Ye={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Ye),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Cn(f.textureWidth,f.textureHeight,{format:ni,type:vn,depthTexture:new Ri(f.textureWidth,f.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let Me={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,Me),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Cn(d.framebufferWidth,d.framebufferHeight,{format:ni,type:vn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(a),l=null,o=await s.requestReferenceSpace(c),Pe.setContext(s),Pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ee(J){for(let ge=0;ge<J.removed.length;ge++){let Me=J.removed[ge],Re=M.indexOf(Me);Re>=0&&(M[Re]=null,b[Re].disconnect(Me))}for(let ge=0;ge<J.added.length;ge++){let Me=J.added[ge],Re=M.indexOf(Me);if(Re===-1){for(let Ye=0;Ye<b.length;Ye++)if(Ye>=M.length){M.push(Me),Re=Ye;break}else if(M[Ye]===null){M[Ye]=Me,Re=Ye;break}if(Re===-1)break}let ye=b[Re];ye&&ye.connect(Me)}}function V(J,ge){ge===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ge.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let ge=J.near,Me=J.far;m.texture!==null&&(m.depthNear>0&&(ge=m.depthNear),m.depthFar>0&&(Me=m.depthFar)),O.near=P.near=C.near=ge,O.far=P.far=C.far=Me,(L!==O.near||U!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),L=O.near,U=O.far),O.layers.mask=J.layers.mask|6,C.layers.mask=O.layers.mask&-5,P.layers.mask=O.layers.mask&-3;let Re=J.parent,ye=O.cameras;V(O,Re);for(let Ye=0;Ye<ye.length;Ye++)V(ye[Ye],Re);O.projectionMatrix.copy(C.projectionMatrix),O.projectionMatrixInverse.copy(C.projectionMatrixInverse),E===null&&J.isPerspectiveCamera&&(E={camera:J,fov:J.fov,zoom:J.zoom}),q(J,O,Re)};function q(J,ge,Me){Me===null?J.matrix.copy(ge.matrixWorld):(J.matrix.copy(Me.matrixWorld),J.matrix.invert(),J.matrix.multiply(ge.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ge.projectionMatrix),J.projectionMatrixInverse.copy(ge.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=ka*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&d===null))return a},this.setFoveation=function(J){a=J,f!==null&&(f.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(J){return g[J]};let te=null;function ue(J,ge){if(h=ge.getViewerPose(l||o),p=ge,h!==null){let Me=h.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let Re=!1;Me.length!==O.cameras.length&&(O.cameras.length=0,Re=!0);for(let Fe=0;Fe<Me.length;Fe++){let ht=Me[Fe],dt=null;if(d!==null)dt=d.getViewport(ht);else{let $t=u.getViewSubImage(f,ht);dt=$t.viewport,Fe===0&&(e.setRenderTargetTextures(v,$t.colorTexture,$t.depthStencilTexture),e.setRenderTarget(v))}let Qe=I[Fe];Qe===void 0&&(Qe=new fn,Qe.layers.enable(Fe),Qe.viewport=new St,I[Fe]=Qe),Qe.matrix.fromArray(ht.transform.matrix),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Qe.projectionMatrix.fromArray(ht.projectionMatrix),Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(),Qe.viewport.set(dt.x,dt.y,dt.width,dt.height),Fe===0&&(O.matrix.copy(Qe.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Re===!0&&O.cameras.push(Qe)}let ye=s.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let Fe=u.getDepthInformation(Me[0]);Fe&&Fe.isValid&&Fe.texture&&m.init(Fe,s.renderState)}if(ye&&ye.includes("camera-access")&&y){e.state.unbindTexture(),u=n.getBinding();for(let Fe=0;Fe<Me.length;Fe++){let ht=Me[Fe].camera;if(ht){let dt=g[ht];dt||(dt=new Zr,g[ht]=dt);let Qe=u.getCameraImage(ht);dt.sourceTexture=Qe}}}}for(let Me=0;Me<b.length;Me++){let Re=M[Me],ye=b[Me];Re!==null&&ye!==void 0&&ye.update(Re,ge,l||o)}te&&te(J,ge),ge.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ge}),p=null}let Pe=new Vp;Pe.setAnimationLoop(ue),this.setAnimationLoop=function(J){te=J},this.dispose=function(){}}},tS=new ot,Qp=new Ge;Qp.set(-1,0,0,0,1,0,0,0,1);function nS(i,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,au(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,S,A,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,v)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),y(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&c(m,g)):g.isPointsMaterial?a(m,g,S,A):g.isSpriteMaterial?l(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===pn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===pn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let S=e.get(g),A=S.envMap,v=S.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(tS.makeRotationFromEuler(v)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Qp),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function c(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function a(m,g,S,A){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*S,m.scale.value=A*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,S){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,t(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===pn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function y(m,g){let S=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function iS(i,e,t,n){let s={},r={};function o(S,A){let v=A.program;n.uniformBlockBinding(S,v,s[S.id])}function c(S,A){let v=s[S.id];v===void 0&&(p(S),v=a(S),s[S.id]=v,S.addEventListener("dispose",m));let b=A.program;n.updateUBOMapping(S,b);let M=e.render.frame;r[S.id]!==M&&(l(S),r[S.id]=M)}function a(S){let A=i.createBuffer(),v=S.__size,b=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,v,b),i.bindBuffer(i.UNIFORM_BUFFER,null),A}function l(S){let A=s[S.id],v=S.uniforms,b=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let M=0,_=v.length;M<_;M++){let x=v[M];if(Array.isArray(x))for(let E=0,C=x.length;E<C;E++)h(x[E],M,E,b);else h(x,M,0,b)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(S,A,v,b){if(f(S,A,v,b)===!0){let M=S.__offset,_=S.value;if(Array.isArray(_)){let x=0;for(let E=0;E<_.length;E++){let C=_[E],P=y(C,!0);u(C,S.__data,x),x+=P.storage/Float32Array.BYTES_PER_ELEMENT}}else u(_,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,M,S.__data)}}function u(S,A,v){typeof S=="number"||typeof S=="boolean"?A[v]=S:S.isMatrix3?(A[v]=S.elements[0],A[v+1]=S.elements[1],A[v+2]=S.elements[2],A[v+3]=0,A[v+4]=S.elements[3],A[v+5]=S.elements[4],A[v+6]=S.elements[5],A[v+7]=0,A[v+8]=S.elements[6],A[v+9]=S.elements[7],A[v+10]=S.elements[8],A[v+11]=0):ArrayBuffer.isView(S)?A.set(S.subarray(0,A.length-v),v):S.toArray(A,v)}function f(S,A,v,b){let M=S.value,_=A+"_"+v;if(Array.isArray(M)){b[_]===void 0&&(b[_]=[]);let x=b[_],E=!1;for(let C=0;C<M.length;C++)d(M[C],x,C)===!0&&(E=!0);return E}return d(M,b,_)}function d(S,A,v){if(A[v]===void 0)return typeof S=="number"||typeof S=="boolean"?A[v]=S:ArrayBuffer.isView(S)?A[v]=S.slice():A[v]=S.clone(),!0;{let b=A[v];if(typeof S=="number"||typeof S=="boolean"){if(b!==S)return A[v]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(b.equals(S)===!1)return b.copy(S),!0}}return!1}function p(S){let A=S.uniforms,v=0,b=16;for(let _=0,x=A.length;_<x;_++){let E=Array.isArray(A[_])?A[_]:[A[_]];for(let C=0,P=E.length;C<P;C++){let I=E[C],O=Array.isArray(I.value)?I.value:[I.value],L=Array.isArray(A[_])||Array.isArray(I.value),U=v;for(let W=0,ee=O.length;W<ee;W++){let V=O[W],q=y(V,L),te=v%b,ue=te%q.boundary,Pe=te+ue;v+=ue,Pe!==0&&b-Pe<q.storage&&(v+=b-Pe),W===0&&(U=v),v+=q.storage}let k=I.type==="int"?Int32Array:I.type==="uint"?Uint32Array:Float32Array;I.__data=new k((v-U)/Float32Array.BYTES_PER_ELEMENT),I.__offset=U}}let M=v%b;return M>0&&(v+=b-M),S.__size=v,S.__cache={},this}function y(S,A){let v={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(v.boundary=4,v.storage=4):S.isVector2?(v.boundary=8,v.storage=8):S.isVector3||S.isColor?(v.boundary=16,v.storage=12):S.isVector4?(v.boundary=16,v.storage=16):S.isMatrix3?(v.boundary=16,v.storage=48):S.isMatrix4?(v.boundary=16,v.storage=64):S.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(v.boundary=16,v.storage=S.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",S),A===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function m(S){let A=S.target;A.removeEventListener("dispose",m),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function g(){for(let S in s)i.deleteBuffer(s[S]);s={},r={}}return{bind:o,update:c,dispose:g}}var sS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),di=null;function rS(){return di===null&&(di=new Xr(sS,16,16,$i,ti),di.name="DFG_LUT",di.minFilter=dn,di.magFilter=dn,di.wrapS=ci,di.wrapT=ci,di.generateMipmaps=!1,di.needsUpdate=!0),di}var rl=class{constructor(e={}){let{canvas:t=lp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:a=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=vn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let y=d,m=new Set([Tc,bc,Mc]),g=new Set([vn,ei,or,gs,yc,vc]),S=new Uint32Array(4),A=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]},b=null,M=null,_=[],x=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,P=!1,I=null,O=null,L=null,U=null;this._outputColorSpace=wn;let k=0,W=0,ee=null,V=-1,q=null,te=new St,ue=new St,Pe=null,J=new He(0),ge=0,Me=t.width,Re=t.height,ye=1,Ye=null,Rt=null,Fe=new St(0,0,Me,Re),ht=new St(0,0,Me,Re),dt=!1,Qe=new Xi,$t=new Va,Ft=!1,gn=!1,Mt=new ot,si=new B,Vt=new St,Nn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Un=!1;function On(){return ee===null?ye:1}let F=n;function Fn(w,N){return t.getContext(w,N)}let yt,vt,me,Bt,Ue,Xe,R,T,H,ie,Q,oe,fe,Z,$,ce,D,K,j,le,re,ae,Ie;try{let w={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:a,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",De,!1),t.addEventListener("webglcontextrestored",je,!1),t.addEventListener("webglcontextcreationerror",_e,!1),F===null){let N="webgl2";if(F=Fn(N,w),F===null)throw Fn(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Je()}catch(w){throw t.removeEventListener("webglcontextlost",De,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),ze("WebGLRenderer: "+w.message),w}function Je(){yt=new gy(F),yt.init(),re=new Kv(F,yt),vt=new ry(F,yt,e,re),me=new Zv(F,yt),vt.reversedDepthBuffer&&f&&me.buffers.depth.setReversed(!0),O=F.createFramebuffer(),L=F.createFramebuffer(),U=F.createFramebuffer(),Bt=new yy(F),Ue=new Ov,Xe=new $v(F,yt,me,Ue,vt,re,Bt),R=new my(C),T=new Sg(F),ae=new iy(F,T),H=new _y(F,T,Bt,ae),ie=new Sy(F,H,T,ae,Bt),K=new vy(F,vt,Xe),$=new oy(Ue),Q=new Uv(C,R,yt,vt,ae,$),oe=new nS(C,Ue),fe=new Bv,Z=new Wv(yt),D=new ny(C,R,me,ie,p,a),ce=new Jv(C,ie,vt),Ie=new iS(F,Bt,vt,me),j=new sy(F,yt,Bt),le=new xy(F,yt,Bt),Bt.programs=Q.programs,C.capabilities=vt,C.extensions=yt,C.properties=Ue,C.renderLists=fe,C.shadowMap=ce,C.state=me,C.info=Bt}y!==vn&&(E=new by(y,t.width,t.height,c,s,r));let se=new Eu(C,F);this.xr=se,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let w=yt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=yt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(w){w!==void 0&&(ye=w,this.setSize(Me,Re,!1))},this.getSize=function(w){return w.set(Me,Re)},this.setSize=function(w,N,X=!0){if(se.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}Me=w,Re=N,t.width=Math.floor(w*ye),t.height=Math.floor(N*ye),X===!0&&(t.style.width=w+"px",t.style.height=N+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(Me*ye,Re*ye).floor()},this.setDrawingBufferSize=function(w,N,X){Me=w,Re=N,ye=X,t.width=Math.floor(w*X),t.height=Math.floor(N*X),this.setViewport(0,0,w,N)},this.setEffects=function(w){if(y===vn){ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let N=0;N<w.length;N++)if(w[N].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(te)},this.getViewport=function(w){return w.copy(Fe)},this.setViewport=function(w,N,X,z){w.isVector4?Fe.set(w.x,w.y,w.z,w.w):Fe.set(w,N,X,z),me.viewport(te.copy(Fe).multiplyScalar(On()).round())},this.getScissor=function(w){return w.copy(ht)},this.setScissor=function(w,N,X,z){w.isVector4?ht.set(w.x,w.y,w.z,w.w):ht.set(w,N,X,z),me.scissor(ue.copy(ht).multiplyScalar(On()).round())},this.getScissorTest=function(){return dt},this.setScissorTest=function(w){me.setScissorTest(dt=w)},this.setOpaqueSort=function(w){Ye=w},this.setTransparentSort=function(w){Rt=w},this.getClearColor=function(w){return w.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(w=!0,N=!0,X=!0){let z=0;if(w){let G=!1;if(ee!==null){let de=ee.texture.format;G=m.has(de)}if(G){let de=ee.texture.type,be=g.has(de),he=D.getClearColor(),ve=D.getClearAlpha(),Ce=he.r,qe=he.g,et=he.b;be?(S[0]=Ce,S[1]=qe,S[2]=et,S[3]=ve,F.clearBufferuiv(F.COLOR,0,S)):(A[0]=Ce,A[1]=qe,A[2]=et,A[3]=ve,F.clearBufferiv(F.COLOR,0,A))}else z|=F.COLOR_BUFFER_BIT}N&&(z|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(z|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&F.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),I=w},this.dispose=function(){t.removeEventListener("webglcontextlost",De,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),D.dispose(),fe.dispose(),Z.dispose(),Xe.dispose(),Ue.dispose(),R.dispose(),ie.dispose(),H.dispose(),ae.dispose(),Ie.dispose(),Q.dispose(),se.dispose(),se.removeEventListener("sessionstart",Df),se.removeEventListener("sessionend",Nf),is.stop()};function De(w){w.preventDefault(),su("WebGLRenderer: Context Lost."),P=!0}function je(){su("WebGLRenderer: Context Restored."),P=!1;let w=Bt.autoReset,N=ce.enabled,X=ce.autoUpdate,z=ce.needsUpdate,G=ce.type;Je(),Bt.autoReset=w,ce.enabled=N,ce.autoUpdate=X,ce.needsUpdate=z,ce.type=G}function _e(w){ze("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ut(w){let N=w.target;N.removeEventListener("dispose",ut),Wt(N)}function Wt(w){Ui(w),Ue.remove(w)}function Ui(w){let N=Ue.get(w).programs;N!==void 0&&(N.forEach(function(X){Q.releaseProgram(X)}),w.isShaderMaterial&&Q.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,X,z,G,de){N===null&&(N=Nn);let be=G.isMesh&&G.matrixWorld.determinantAffine()<0,he=jm(w,N,X,z,G);me.setMaterial(z,be);let ve=X.index,Ce=1;if(z.wireframe===!0){if(ve=H.getWireframeAttribute(X),ve===void 0)return;Ce=2}let qe=X.drawRange,et=X.attributes.position,Te=qe.start*Ce,tt=(qe.start+qe.count)*Ce;de!==null&&(Te=Math.max(Te,de.start*Ce),tt=Math.min(tt,(de.start+de.count)*Ce)),ve!==null?(Te=Math.max(Te,0),tt=Math.min(tt,ve.count)):et!=null&&(Te=Math.max(Te,0),tt=Math.min(tt,et.count));let Pt=tt-Te;if(Pt<0||Pt===1/0)return;ae.setup(G,z,he,X,ve);let mt,pt=j;if(ve!==null&&(mt=T.get(ve),pt=le,pt.setIndex(mt)),G.isMesh)z.wireframe===!0?(me.setLineWidth(z.wireframeLinewidth*On()),pt.setMode(F.LINES)):pt.setMode(F.TRIANGLES);else if(G.isLine){let en=z.linewidth;en===void 0&&(en=1),me.setLineWidth(en*On()),G.isLineSegments?pt.setMode(F.LINES):G.isLineLoop?pt.setMode(F.LINE_LOOP):pt.setMode(F.LINE_STRIP)}else G.isPoints?pt.setMode(F.POINTS):G.isSprite&&pt.setMode(F.TRIANGLES);if(G.isBatchedMesh)if(yt.get("WEBGL_multi_draw"))pt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let en=G._multiDrawStarts,Ee=G._multiDrawCounts,hn=G._multiDrawCount,rt=ve?T.get(ve).bytesPerElement:1,ss=Ue.get(z).currentProgram.getUniforms();for(let tn=0;tn<hn;tn++)ss.setValue(F,"_gl_DrawID",tn),pt.render(en[tn]/rt,Ee[tn])}else if(G.isInstancedMesh)pt.renderInstances(Te,Pt,G.count);else if(X.isInstancedBufferGeometry){let en=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ee=Math.min(X.instanceCount,en);pt.renderInstances(Te,Pt,Ee)}else pt.render(Te,Pt)};function Lf(w,N,X,z){I!==null&&w.isNodeMaterial&&I.setObject(z,w),Ft===!0&&$.setState(w,X,!1),w.transparent===!0&&w.side===Jt&&w.forceSinglePass===!1?(w.side=pn,w.needsUpdate=!0,mr(w,N,z),w.side=Zi,w.needsUpdate=!0,mr(w,N,z),w.side=Jt):mr(w,N,z)}this.compile=function(w,N,X=null){X===null&&(X=w),I!==null&&I.renderStart(w,N,X),M=Z.get(X),M.init(N),x.push(M),X.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(M.pushLight(G),G.castShadow&&M.pushShadow(G))}),w!==X&&w.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(M.pushLight(G),G.castShadow&&M.pushShadow(G))}),M.setupLights(),I!==null&&I.updateLights(M.state.lightsArray),gn=this.localClippingEnabled,Ft=$.init(this.clippingPlanes,gn),Ft===!0&&$.setGlobalState(this.clippingPlanes,N),I!==null&&ce.render(M.state.shadowsArray,X,N);let z=new Set;return w.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let de=G.material;if(de)if(Array.isArray(de))for(let be=0;be<de.length;be++){let he=de[be];Lf(he,X,N,G),z.add(he)}else Lf(de,X,N,G),z.add(de)}),M=x.pop(),I!==null&&I.renderEnd(),z},this.compileAsync=function(w,N,X=null){let z=this.compile(w,N,X);return new Promise(G=>{function de(){if(z.forEach(function(be){let ve=Ue.get(be).currentProgram;(ve===void 0||ve.isReady())&&z.delete(be)}),z.size===0){G(w);return}setTimeout(de,10)}yt.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Xl=null;function qm(w){Xl&&Xl(w)}function Df(){is.stop()}function Nf(){is.start()}let is=new Vp;is.setAnimationLoop(qm),typeof self<"u"&&is.setContext(self),this.setAnimationLoop=function(w){Xl=w,se.setAnimationLoop(w),w===null?is.stop():is.start()},se.addEventListener("sessionstart",Df),se.addEventListener("sessionend",Nf),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;I!==null&&I.renderStart(w,N);let X=se.enabled===!0&&se.isPresenting===!0,z=E!==null&&(ee===null||X)&&E.begin(C,ee);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(se.cameraAutoUpdate===!0&&se.updateCamera(N),N=se.getCamera()),w.isScene===!0&&w.onBeforeRender(C,w,N,ee),M=Z.get(w,x.length),M.init(N),M.state.textureUnits=Xe.getTextureUnits(),x.push(M),Mt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),N.isArrayCamera?$t.setFromArrayCamera(N):Qe.setFromProjectionMatrix(Mt,zn,N.reversedDepth),gn=this.localClippingEnabled,Ft=$.init(this.clippingPlanes,gn),b=fe.get(w,_.length),b.init(),_.push(b),this.info.render.frame++,se.enabled===!0&&se.isPresenting===!0){let be=C.xr.getDepthSensingMesh();be!==null&&ql(be,N,-1/0,C.sortObjects)}ql(w,N,0,C.sortObjects),b.finish(),I!==null&&I.updateLights(M.state.lightsArray),C.sortObjects===!0&&b.sort(Ye,Rt),Un=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Un&&D.addToRenderList(b,w),this.info.autoReset===!0&&this.info.reset(),Ft===!0&&$.beginShadows();let G=M.state.shadowsArray;if(ce.render(G,w,N),Ft===!0&&$.endShadows(),(z&&E.hasRenderPass())===!1){let be=b.opaque,he=b.transmissive;if(M.setupLights(),N.isArrayCamera){let ve=N.cameras;if(he.length>0)for(let Ce=0,qe=ve.length;Ce<qe;Ce++){let et=ve[Ce];Of(be,he,w,et)}Un&&D.render(w);for(let Ce=0,qe=ve.length;Ce<qe;Ce++){let et=ve[Ce];Uf(b,w,et,et.viewport)}}else he.length>0&&Of(be,he,w,N),Un&&D.render(w),Uf(b,w,N)}ee!==null&&W===0&&(Xe.updateMultisampleRenderTarget(ee),Xe.updateRenderTargetMipmap(ee)),z&&E.end(C),w.isScene===!0&&w.onAfterRender(C,w,N),ae.resetDefaultState(),V=-1,q=null,x.pop(),x.length>0?(M=x[x.length-1],Xe.setTextureUnits(M.state.textureUnits),Ft===!0&&$.setGlobalState(C.clippingPlanes,M.state.camera)):M=null,_.pop(),_.length>0?b=_[_.length-1]:b=null,I!==null&&I.renderEnd()};function ql(w,N,X,z){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)X=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLight)M.pushLight(w),w.castShadow&&M.pushShadow(w);else if(w.isSprite){let be=N.isArrayCamera?$t:Qe;if(!w.frustumCulled||w.intersectsFrustum(be)){z&&Vt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Mt);let he=ie.update(w),ve=w.material;ve.visible&&b.push(w,he,ve,X,Vt.z,null,N)}}else if(w.isMesh||w.isLine||w.isPoints){let be=N.isArrayCamera?$t:Qe;if(!w.frustumCulled||w.intersectsFrustum(be)){let he=ie.update(w),ve=w.material;if(z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Vt.copy(w.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),Vt.copy(he.boundingSphere.center)),Vt.applyMatrix4(w.matrixWorld).applyMatrix4(Mt)),Array.isArray(ve)){let Ce=he.groups;for(let qe=0,et=Ce.length;qe<et;qe++){let Te=Ce[qe],tt=ve[Te.materialIndex];tt&&tt.visible&&b.push(w,he,tt,X,Vt.z,Te,N)}}else ve.visible&&b.push(w,he,ve,X,Vt.z,null,N)}}}let de=w.children;for(let be=0,he=de.length;be<he;be++)ql(de[be],N,X,z)}function Uf(w,N,X,z){let{opaque:G,transmissive:de,transparent:be}=w;M.setupLightsView(X),Ft===!0&&$.setGlobalState(C.clippingPlanes,X),z&&me.viewport(te.copy(z)),G.length>0&&Go(G,N,X),de.length>0&&Go(de,N,X),be.length>0&&Go(be,N,X),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Of(w,N,X,z){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[z.id]===void 0){let Te=yt.has("EXT_color_buffer_half_float")||yt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[z.id]=new Cn(1,1,{generateMipmaps:!0,type:Te?ti:vn,minFilter:Ii,samples:Math.max(4,vt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:nt.workingColorSpace})}let de=M.state.transmissionRenderTarget[z.id],be=z.viewport||te;de.setSize(be.z*C.transmissionResolutionScale,be.w*C.transmissionResolutionScale);let he=C.getRenderTarget(),ve=C.getActiveCubeFace(),Ce=C.getActiveMipmapLevel();C.setRenderTarget(de),C.getClearColor(J),ge=C.getClearAlpha(),ge<1&&C.setClearColor(16777215,.5),C.clear(),Un&&D.render(X);let qe=C.toneMapping;C.toneMapping=fi;let et=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),M.setupLightsView(z),Ft===!0&&$.setGlobalState(C.clippingPlanes,z),Go(w,X,z),Xe.updateMultisampleRenderTarget(de),Xe.updateRenderTargetMipmap(de),yt.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let tt=0,Pt=N.length;tt<Pt;tt++){let mt=N[tt],{object:pt,geometry:en,material:Ee,group:hn}=mt;if(Ee.side===Jt&&pt.layers.test(z.layers)){let rt=Ee.side;Ee.side=pn,Ee.needsUpdate=!0,Ff(pt,X,z,en,Ee,hn),Ee.side=rt,Ee.needsUpdate=!0,Te=!0}}Te===!0&&(Xe.updateMultisampleRenderTarget(de),Xe.updateRenderTargetMipmap(de))}C.setRenderTarget(he,ve,Ce),C.setClearColor(J,ge),et!==void 0&&(z.viewport=et),C.toneMapping=qe}function Go(w,N,X){let z=N.isScene===!0?N.overrideMaterial:null;for(let G=0,de=w.length;G<de;G++){let be=w[G],{object:he,geometry:ve,group:Ce}=be,qe=be.material;qe.allowOverride===!0&&z!==null&&(qe=z),he.layers.test(X.layers)&&Ff(he,N,X,ve,qe,Ce)}}function Ff(w,N,X,z,G,de){I!==null&&G.isNodeMaterial&&I.setObject(w,G),w.onBeforeRender(C,N,X,z,G,de),w.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),G.onBeforeRender(C,N,X,z,w,de),G.transparent===!0&&G.side===Jt&&G.forceSinglePass===!1?(G.side=pn,G.needsUpdate=!0,C.renderBufferDirect(X,N,z,G,w,de),G.side=Zi,G.needsUpdate=!0,C.renderBufferDirect(X,N,z,G,w,de),G.side=Jt):C.renderBufferDirect(X,N,z,G,w,de),w.onAfterRender(C,N,X,z,G,de)}function Bf(w){let N=0;for(let X of w)X.texture!==null&&N++;return N}function mr(w,N,X){N.isScene!==!0&&(N=Nn);let z=Ue.get(w),G=M.state.lights,de=M.state.shadowsArray,be=G.state.version,he=Q.getParameters(w,G.state,de,N,X,M.state.lightProbeGridArray),ve=Q.getProgramCacheKey(he),Ce=z.programs;z.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?N.environment:null,z.fog=N.fog;let qe=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;z.envMap=R.get(w.envMap||z.environment,qe),z.envMapRotation=z.environment!==null&&w.envMap===null?N.environmentRotation:w.envMapRotation,Ce===void 0&&(w.addEventListener("dispose",ut),Ce=new Map,z.programs=Ce,z.programVariants=new Map);let et=Ce.get(ve);if(et!==void 0){if(z.currentProgram===et&&z.lightsStateVersion===be)return zf(w,he),et}else he.uniforms=Q.getUniforms(w),I!==null&&w.isNodeMaterial&&I.build(w,X,he),w.onBeforeCompile(he,C),et=Q.acquireProgram(he,ve),Ce.set(ve,et),z.uniforms=he.uniforms;let Te=z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Te.clippingPlanes=$.uniform),zf(w,he),z.needsLights=Zm(w),z.lightsStateVersion=be,z.needsLights&&(Te.ambientLightColor.value=G.state.ambient,Te.lightProbe.value=G.state.probe,Te.sunLights.value=G.state.sun,Te.sunLightShadows.value=G.state.sunShadow,Te.directionalLights.value=G.state.directional,Te.directionalLightShadows.value=G.state.directionalShadow,Te.spotLights.value=G.state.spot,Te.spotLightShadows.value=G.state.spotShadow,Te.rectAreaLights.value=G.state.rectArea,Te.ltc_1.value=G.state.rectAreaLTC1,Te.ltc_2.value=G.state.rectAreaLTC2,Te.pointLights.value=G.state.point,Te.pointLightShadows.value=G.state.pointShadow,Te.hemisphereLights.value=G.state.hemi,Te.sunShadowMatrix.value=G.state.sunShadowMatrix,Te.sunShadowCascade.value=G.state.sunShadowCascade,Te.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Te.spotLightMatrix.value=G.state.spotLightMatrix,Te.spotLightMap.value=G.state.spotLightMap,Te.pointShadowMatrix.value=G.state.pointShadowMatrix),z.numLightProbeGrids=Bf(M.state.lightProbeGridArray),z.currentProgram=et,z.uniformsList=null,et}function Ym(w,N,X,z,G){let de=Ue.get(w),be=de.currentProgram.id+","+z+","+G,he=de.programVariants.get(be);return he===void 0?(he=mr(w,N,X),de.programVariants.set(be,he)):(de.currentProgram=he,de.uniformsList=null,de.outputColorSpace=z,de.toneMapping=G),he}function kf(w){if(w.uniformsList===null){let N=w.currentProgram.getUniforms();w.uniformsList=cr.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function zf(w,N){let X=Ue.get(w);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}function jm(w,N,X,z,G){N.isScene!==!0&&(N=Nn),Xe.resetTextureUnits();let de=N.fog,be=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?N.environment:null,he=ee===null?C.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:nt.workingColorSpace,ve=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ce=R.get(z.envMap||be,ve),qe=z.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,et=!!X.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Te=!!X.morphAttributes.position,tt=!!X.morphAttributes.normal,Pt=!!X.morphAttributes.color,mt=fi;z.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(mt=C.toneMapping);let pt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,en=pt!==void 0?pt.length:0,Ee=Ue.get(z),hn=M.state.lights;if(Ft===!0&&(gn===!0||w!==q)){let bt=w===q&&z.id===V;$.setState(z,w,bt)}let rt=!1,ss=!1;z.version===Ee.__version?Ee.needsLights&&Ee.lightsStateVersion!==hn.state.version||G.isBatchedMesh&&Ee.batching===!1||!G.isBatchedMesh&&Ee.batching===!0||G.isBatchedMesh&&Ee.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&Ee.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&Ee.instancing===!1||!G.isInstancedMesh&&Ee.instancing===!0||G.isSkinnedMesh&&Ee.skinning===!1||!G.isSkinnedMesh&&Ee.skinning===!0||G.isInstancedMesh&&Ee.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ee.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ee.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ee.instancingMorph===!1&&G.morphTexture!==null||Ee.envMap!==Ce||z.fog===!0&&Ee.fog!==de||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==$.numPlanes||Ee.numIntersection!==$.numIntersection)||Ee.vertexAlphas!==qe||Ee.vertexTangents!==et||Ee.morphTargets!==Te||Ee.morphNormals!==tt||Ee.morphColors!==Pt||Ee.morphTargetsCount!==en||Ee.numLightProbeGrids!==Bf(M.state.lightProbeGridArray)?rt=!0:(Ee.outputColorSpace!==he||Ee.toneMapping!==mt)&&(ss=!0):(rt=!0,Ee.__version=z.version);let tn=Ee.currentProgram;(rt===!0||ss===!0)&&(tn=ss===!0?Ym(z,N,G,he,mt):mr(z,N,G),I&&z.isNodeMaterial&&I.onUpdateProgram(z,tn,Ee));let Vo=!1,Oi=!1,rs=!1,it=tn.getUniforms(),Kt=Ee.uniforms;if(me.useProgram(tn.program)&&(Vo=!0,Oi=!0,rs=!0),z.id!==V&&(V=z.id,Oi=!0),Vo||q!==w){me.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),it.setValue(F,"projectionMatrix",w.projectionMatrix),it.setValue(F,"viewMatrix",w.matrixWorldInverse);let Xt=it.map.cameraPosition;Xt!==void 0&&Xt.setValue(F,si.setFromMatrixPosition(w.matrixWorld)),vt.logarithmicDepthBuffer&&it.setValue(F,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&it.setValue(F,"isOrthographic",w.isOrthographicCamera===!0),q!==w&&(q=w,Oi=!0,rs=!0)}if(Ee.needsLights&&(hn.state.sunShadowMap.length>0&&it.setValue(F,"sunShadowMap",hn.state.sunShadowMap,Xe),hn.state.directionalShadowMap.length>0&&it.setValue(F,"directionalShadowMap",hn.state.directionalShadowMap,Xe),hn.state.spotShadowMap.length>0&&it.setValue(F,"spotShadowMap",hn.state.spotShadowMap,Xe),hn.state.pointShadowMap.length>0&&it.setValue(F,"pointShadowMap",hn.state.pointShadowMap,Xe)),G.isSkinnedMesh){it.setOptional(F,G,"bindMatrix"),it.setOptional(F,G,"bindMatrixInverse");let bt=G.skeleton;bt&&(bt.boneTexture===null&&bt.computeBoneTexture(),it.setValue(F,"boneTexture",bt.boneTexture,Xe))}G.isBatchedMesh&&(it.setOptional(F,G,"batchingTexture"),it.setValue(F,"batchingTexture",G._matricesTexture,Xe),it.setOptional(F,G,"batchingIdTexture"),it.setValue(F,"batchingIdTexture",G._indirectTexture,Xe),it.setOptional(F,G,"batchingColorTexture"),G._colorsTexture!==null&&it.setValue(F,"batchingColorTexture",G._colorsTexture,Xe));let qn=X.morphAttributes;if((qn.position!==void 0||qn.normal!==void 0||qn.color!==void 0)&&K.update(G,X,tn),(Oi||Ee.receiveShadow!==G.receiveShadow)&&(Ee.receiveShadow=G.receiveShadow,it.setValue(F,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&N.environment!==null&&(Kt.envMapIntensity.value=N.environmentIntensity),Kt.dfgLUT!==void 0&&(Kt.dfgLUT.value=rS()),Oi){if(it.setValue(F,"toneMappingExposure",C.toneMappingExposure),Ee.needsLights&&Jm(Kt,rs),de&&z.fog===!0&&oe.refreshFogUniforms(Kt,de),oe.refreshMaterialUniforms(Kt,z,ye,Re,M.state.transmissionRenderTarget[w.id]),Ee.needsLights&&Ee.numLightProbeGrids>0){let bt=v,Xt=0;for(let gi of M.state.lightProbeGridArray)gi.texture!==null&&(bt.textures[Xt]=gi.texture,bt.min[Xt]=gi.boundingBox.min,bt.max[Xt]=gi.boundingBox.max,bt.resolution[Xt]=gi.resolution,Xt++);for(let gi in bt)bt[gi].length=Xt;Kt.probesSH.value=bt.textures,Kt.probesMin.value=bt.min,Kt.probesMax.value=bt.max,Kt.probesResolution.value=bt.resolution}cr.upload(F,kf(Ee),Kt,Xe)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(cr.upload(F,kf(Ee),Kt,Xe),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&it.setValue(F,"center",G.center),it.setValue(F,"modelViewMatrix",G.modelViewMatrix),it.setValue(F,"normalMatrix",G.normalMatrix),it.setValue(F,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){let bt=z.uniformsGroups;for(let Xt=0,gi=bt.length;Xt<gi;Xt++){let Gf=bt[Xt];Ie.update(Gf,tn),Ie.bind(Gf,tn)}}return tn}function Jm(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.sunLights.needsUpdate=N,w.sunLightShadows.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function Zm(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ee},this.setRenderTargetTextures=function(w,N,X){let z=Ue.get(w);z.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),Ue.get(w.texture).__webglTexture=N,Ue.get(w.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:X,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,N){let X=Ue.get(w);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(w,N=0,X=0){ee=w,k=N,W=X;let z=null,G=!1,de=!1;if(w){let he=Ue.get(w);if(he.__useDefaultFramebuffer!==void 0){me.bindFramebuffer(F.FRAMEBUFFER,he.__webglFramebuffer),te.copy(w.viewport),ue.copy(w.scissor),Pe=w.scissorTest,me.viewport(te),me.scissor(ue),me.setScissorTest(Pe),V=-1;return}else if(he.__webglFramebuffer===void 0)Xe.setupRenderTarget(w);else if(he.__hasExternalTextures)Xe.rebindTextures(w,Ue.get(w.texture).__webglTexture,Ue.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let qe=w.depthTexture;if(he.__boundDepthTexture!==qe){if(qe!==null&&Ue.has(qe)&&(w.width!==qe.image.width||w.height!==qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Xe.setupDepthRenderbuffer(w)}}let ve=w.texture;(ve.isData3DTexture||ve.isDataArrayTexture||ve.isCompressedArrayTexture)&&(de=!0);let Ce=Ue.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ce[N])?z=Ce[N][X]:z=Ce[N],G=!0):w.samples>0&&Xe.useMultisampledRTT(w)===!1?z=Ue.get(w).__webglMultisampledFramebuffer:Array.isArray(Ce)?z=Ce[X]:z=Ce,te.copy(w.viewport),ue.copy(w.scissor),Pe=w.scissorTest}else te.copy(Fe).multiplyScalar(ye).floor(),ue.copy(ht).multiplyScalar(ye).floor(),Pe=dt;if(X!==0&&(z=O),me.bindFramebuffer(F.FRAMEBUFFER,z)&&me.drawBuffers(w,z),me.viewport(te),me.scissor(ue),me.setScissorTest(Pe),G){let he=Ue.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+N,he.__webglTexture,X)}else if(de){let he=N;for(let ve=0;ve<w.textures.length;ve++){let Ce=Ue.get(w.textures[ve]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+ve,Ce.__webglTexture,X,he)}}else if(w!==null&&X!==0){let he=Ue.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,he.__webglTexture,X)}V=-1};function Hf(w){let N=Ue.get(w);return(N.__readFormat!==w.format||N.__readType!==w.type)&&(N.__readFormat=w.format,N.__readType=w.type,N.__formatReadable=vt.textureFormatReadable(w.format),N.__typeReadable=vt.textureTypeReadable(w.type)),N}this.readRenderTargetPixels=function(w,N,X,z,G,de,be,he=0){if(!(w&&w.isWebGLRenderTarget)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=Ue.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(ve=ve[be],Array.isArray(ve)&&(ve=ve[0])),ve){me.bindFramebuffer(F.FRAMEBUFFER,ve);try{let Ce=w.textures[he],qe=Ce.format,et=Ce.type;w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+he);let Te=Hf(Ce);if(Te.__formatReadable===!1){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Te.__typeReadable===!1){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-z&&X>=0&&X<=w.height-G&&F.readPixels(N,X,z,G,re.convert(qe),re.convert(et),de)}finally{let Ce=ee!==null?Ue.get(ee).__webglFramebuffer:null;me.bindFramebuffer(F.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(w,N,X,z,G,de,be,he=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=Ue.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(ve=ve[be],Array.isArray(ve)&&(ve=ve[0])),ve)if(N>=0&&N<=w.width-z&&X>=0&&X<=w.height-G){me.bindFramebuffer(F.FRAMEBUFFER,ve);let Ce=w.textures[he],qe=Ce.format,et=Ce.type;w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+he);let Te=Hf(Ce);if(Te.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Te.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let tt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,tt),F.bufferData(F.PIXEL_PACK_BUFFER,de.byteLength,F.STREAM_READ),F.readPixels(N,X,z,G,re.convert(qe),re.convert(et),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Pt=ee!==null?Ue.get(ee).__webglFramebuffer:null;me.bindFramebuffer(F.FRAMEBUFFER,Pt);let mt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await up(F,mt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,tt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,de),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(tt),F.deleteSync(mt),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,N=null,X=0){let z=Math.pow(2,-X),G=Math.floor(w.image.width*z),de=Math.floor(w.image.height*z),be=N!==null?N.x:0,he=N!==null?N.y:0;Xe.setTexture2D(w,0),F.copyTexSubImage2D(F.TEXTURE_2D,X,0,0,be,he,G,de),me.unbindTexture()},this.copyTextureToTexture=function(w,N,X=null,z=null,G=0,de=0){let be,he,ve,Ce,qe,et,Te,tt,Pt,mt=w.isCompressedTexture?w.mipmaps[de]:w.image;if(X!==null)be=X.max.x-X.min.x,he=X.max.y-X.min.y,ve=X.isBox3?X.max.z-X.min.z:1,Ce=X.min.x,qe=X.min.y,et=X.isBox3?X.min.z:0;else{let it=Math.pow(2,-G);be=Math.floor(mt.width*it),he=Math.floor(mt.height*it),w.isDataArrayTexture?ve=mt.depth:w.isData3DTexture?ve=Math.floor(mt.depth*it):ve=1,Ce=0,qe=0,et=0}z!==null?(Te=z.x,tt=z.y,Pt=z.z):(Te=0,tt=0,Pt=0);let pt=re.convert(N.format),en=re.convert(N.type),Ee;N.isData3DTexture?(Xe.setTexture3D(N,0),Ee=F.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Xe.setTexture2DArray(N,0),Ee=F.TEXTURE_2D_ARRAY):(Xe.setTexture2D(N,0),Ee=F.TEXTURE_2D),me.activeTexture(F.TEXTURE0),me.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,N.flipY),me.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),me.pixelStorei(F.UNPACK_ALIGNMENT,N.unpackAlignment);let hn=me.getParameter(F.UNPACK_ROW_LENGTH),rt=me.getParameter(F.UNPACK_IMAGE_HEIGHT),ss=me.getParameter(F.UNPACK_SKIP_PIXELS),tn=me.getParameter(F.UNPACK_SKIP_ROWS),Vo=me.getParameter(F.UNPACK_SKIP_IMAGES);me.pixelStorei(F.UNPACK_ROW_LENGTH,mt.width),me.pixelStorei(F.UNPACK_IMAGE_HEIGHT,mt.height),me.pixelStorei(F.UNPACK_SKIP_PIXELS,Ce),me.pixelStorei(F.UNPACK_SKIP_ROWS,qe),me.pixelStorei(F.UNPACK_SKIP_IMAGES,et);let Oi=w.isDataArrayTexture||w.isData3DTexture,rs=N.isDataArrayTexture||N.isData3DTexture;if(w.isDepthTexture){let it=Ue.get(w),Kt=Ue.get(N),qn=Ue.get(it.__renderTarget),bt=Ue.get(Kt.__renderTarget);me.bindFramebuffer(F.READ_FRAMEBUFFER,qn.__webglFramebuffer),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let Xt=0;Xt<ve;Xt++)Oi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ue.get(w).__webglTexture,G,et+Xt),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ue.get(N).__webglTexture,de,Pt+Xt)),F.blitFramebuffer(Ce,qe,Ce+be,qe+he,Te,tt,Te+be,tt+he,F.DEPTH_BUFFER_BIT,F.NEAREST);me.bindFramebuffer(F.READ_FRAMEBUFFER,null),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(G!==0||w.isRenderTargetTexture||Ue.has(w)){let it=Ue.get(w),Kt=Ue.get(N);me.bindFramebuffer(F.READ_FRAMEBUFFER,L),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,U);for(let qn=0;qn<ve;qn++)Oi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,it.__webglTexture,G,et+qn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,it.__webglTexture,G),rs?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Kt.__webglTexture,de,Pt+qn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Kt.__webglTexture,de),G!==0?F.blitFramebuffer(Ce,qe,Ce+be,qe+he,Te,tt,Te+be,tt+he,F.COLOR_BUFFER_BIT,F.NEAREST):rs?F.copyTexSubImage3D(Ee,de,Te,tt,Pt+qn,Ce,qe,be,he):F.copyTexSubImage2D(Ee,de,Te,tt,Ce,qe,be,he);me.bindFramebuffer(F.READ_FRAMEBUFFER,null),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else rs?w.isDataTexture||w.isData3DTexture?F.texSubImage3D(Ee,de,Te,tt,Pt,be,he,ve,pt,en,mt.data):N.isCompressedArrayTexture?F.compressedTexSubImage3D(Ee,de,Te,tt,Pt,be,he,ve,pt,mt.data):F.texSubImage3D(Ee,de,Te,tt,Pt,be,he,ve,pt,en,mt):w.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,de,Te,tt,be,he,pt,en,mt.data):w.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,de,Te,tt,mt.width,mt.height,pt,mt.data):F.texSubImage2D(F.TEXTURE_2D,de,Te,tt,be,he,pt,en,mt);me.pixelStorei(F.UNPACK_ROW_LENGTH,hn),me.pixelStorei(F.UNPACK_IMAGE_HEIGHT,rt),me.pixelStorei(F.UNPACK_SKIP_PIXELS,ss),me.pixelStorei(F.UNPACK_SKIP_ROWS,tn),me.pixelStorei(F.UNPACK_SKIP_IMAGES,Vo),de===0&&N.generateMipmaps===!0&&N.mipmapsAutoUpdate===!0&&F.generateMipmap(Ee),me.unbindTexture()},this.initRenderTarget=function(w){Ue.get(w).__webglFramebuffer===void 0&&Xe.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Xe.setTextureCube(w,0):w.isData3DTexture?Xe.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Xe.setTexture2DArray(w,0):Xe.setTexture2D(w,0),me.unbindTexture()},this.resetState=function(){k=0,W=0,ee=null,me.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}};function nm(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},c=i[0].morphTargetsRelative,a=new Ct;a.morphTargetsRelative=c;let l=0;for(let h=0;h<i.length;++h){let u=i[h],f=0,d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(c!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(u.morphAttributes[p].length!==i[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;o[p]===void 0&&(o[p]=[]),o[p].push(u.morphAttributes[p]),d++}if(d!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;a.addGroup(l,p,h),l+=p}}if(t){let h=0,u=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let p=0;p<d.count;++p)u.push(d.getX(p)+h);h+=i[f].attributes.position.count}a.setIndex(u)}for(let h in r){let u=tm(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;a.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u!==0){a.morphAttributes=a.morphAttributes||{},a.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let y=0;y<o[h].length;++y)d.push(o[h][y][f]);let p=tm(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;a.morphAttributes[h].push(p)}}}return a}function tm(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),c=new Dt(o,t,n),a=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let u=a/t;for(let f=0,d=h.count;f<d;f++)for(let p=0;p<t;p++){let y=h.getComponent(f,p);c.setComponent(f+u,p,y)}}else o.set(h.array,a);a+=h.count*t}return s!==void 0&&(c.gpuType=s),c}var cl=new He;function Le(i,e,t,n,s,r,o,c){let a=i.index?i.toNonIndexed():i;(r||o||c)&&a.applyMatrix4(new ot().makeRotationFromEuler(new Qn(r||0,o||0,c||0))),a.translate(t||0,n||0,s||0),cl.set(e);let l=a.attributes.position.count,h=new Float32Array(l*3);for(let u=0;u<l;u++)h[u*3]=cl.r,h[u*3+1]=cl.g,h[u*3+2]=cl.b;return a.setAttribute("color",new Dt(h,3)),a.attributes.uv||a.setAttribute("uv",new Dt(new Float32Array(l*2),2)),a}function Sn(i){let e=nm(i,!1);for(let t=0;t<i.length;t++)i[t].dispose();return e.computeVertexNormals(),e}function Ao(i,e,t){let n=new He(i),s=new He(e);return n.lerp(s,t).getHex()}var im=15845280,ll=1842987,oS=14212841,aS=8016432;function sm(i,e,t){let n=Ao(i,1184796,.62),s=Ao(i,723986,.74),r=[Le(new at(.44,.46,.28),n,0,.6,0),Le(new at(.47,.09,.31),e,0,.44,0),Le(new Pn(.27,1),s,0,1.08,0),Le(new at(.34,.11,.08),im,0,1.1,.212),Le(new at(.05,.06,.03),ll,-.085,1.1,.25),Le(new at(.05,.06,.03),ll,.085,1.1,.25),Le(new At(.235,.265,.13,8),i,0,.87,0)];return t===0?r.push(Le(new Hn(.1,.3,5),e,0,.7,-.2,-.5,0,0)):t===1?r.push(Le(new Pn(.12,0),e,0,.66,-.22)):r.push(Le(new at(.06,.78,.06),Ao(e,aS,.5),0,.72,-.19,0,0,.55)),Sn(r)}function Au(i,e){let t=Ao(i,1184796,.56),n=[Le(new at(.12,.3,.14),t,0,-.15,0),Le(new at(.11,.1,.12),im,0,-.35,0)];return e&&(n.push(Le(new at(.035,.07,.6),oS,0,-.38,.36)),n.push(Le(new at(.13,.035,.05),ll,0,-.38,.07))),Sn(n)}function rm(i){let e=Ao(i,1184796,.68);return Sn([Le(new at(.15,.3,.17),e,0,-.15,0),Le(new at(.16,.08,.22),ll,0,-.33,.03)])}function om(i){return Sn([Le(new at(.11,.05,.46),i,0,0,-.23)])}function am(){return Sn([Le(new At(.1,.15,.6,5,1,!0),7031339,0,.3,0),Le(new Hn(.66,1.05,6,1,!0),3112259,0,1.05,0),Le(new Hn(.5,.9,6,1,!0),3639883,0,1.6,0),Le(new Hn(.33,.75,6,1,!0),4167251,0,2.1,0)])}function cm(){let i=new Pn(.66,0);i.scale(1,.82,1);let e=new Pn(.44,0);return e.scale(1,.85,1),Sn([Le(new At(.11,.16,.8,5,1,!0),7360559,0,.4,0),Le(i,4034367,0,1.25,0),Le(e,4890698,.3,1.72,.12)])}function lm(){let i=new Pn(.46,0);i.scale(1,.66,1);let e=new Pn(.3,0);return e.scale(1,.7,1),Sn([Le(i,3116862,0,.26,0),Le(e,3909196,.3,.2,.2)])}function hm(){let i=new $s(.44,0);i.scale(1,.72,.9);let e=new $s(.24,0);return Sn([Le(i,9146521,0,.26,0),Le(e,10133674,.32,.14,.22)])}function um(i){return Sn([Le(new At(.1,.1,.5,10),15984324,0,0,0,0,0,Math.PI/2),Le(new At(.115,.115,.15,10),i,0,0,0,0,0,Math.PI/2),Le(new At(.06,.06,.08,8),3811868,-.29,0,0,0,0,Math.PI/2),Le(new At(.06,.06,.08,8),3811868,.29,0,0,0,0,Math.PI/2)])}function fm(){let i=new Pn(.25,1);return i.scale(1,.92,.8),Sn([Le(i,16448250,0,0,0),Le(new at(.3,.2,.43),2046762,0,-.1,0)])}function dm(){return Sn([Le(new at(.42,.03,.1),14673648,0,0,0),Le(new at(.1,.03,.42),14673648,0,0,0),Le(new At(.07,.07,.04,6),3752013,0,0,0)])}function pm(){let i=[],e=7;function t(){return e=e*16807%2147483647,e/2147483647}for(let n=0;n<16;n++){let s=t()*6.283,r=.25+t()*1.75,o=.5+t()*.7;i.push(Le(new Hn(.13,o,4),n%3?5209903:7031339,Math.sin(s)*r,o/2,Math.cos(s)*r,(t()-.5)*.7,0,(t()-.5)*.7))}return Sn(i)}function mm(){let s=[Le(new At(3.75,3.95,.14,40),13225430,0,.07,0),Le(new At(.62,.74,.5,8),12173e3,0,.39,0),Le(new At(.46,.5,.16,8),2763830,0,.72,0),Le(new At(.17,.2,3,8),13911338,-1.5,1.5,-4.5),Le(new At(.17,.2,3,8),13911338,1.5,1.5,-4.5),Le(new at(4.5,.24,.42),2763830,0,3.08,-4.5),Le(new at(3.9,.16,.3),13911338,0,2.86,-4.5),Le(new at(3.5,.18,.22),13911338,0,2.3,-4.5)],r=[[-4.5,-4.5],[4.5,-4.5],[-4.5,4.5],[4.5,4.5]];for(let o=0;o<4;o++){let c=r[o][0],a=r[o][1];s.push(Le(new at(.5,.16,.5),12173e3,c,.08,a)),s.push(Le(new at(.2,.7,.2),12173e3,c,.5,a)),s.push(Le(new at(.42,.34,.42),16766826,c,1.02,a)),s.push(Le(new Hn(.44,.3,4),2763830,c,1.34,a,0,Math.PI/4,0))}return Sn(s)}function gm(i){return Sn([Le(new At(.05,.06,2.6,6),5916208,0,1.3,0),Le(new at(.9,.55,.05),i,.5,2.25,0),Le(new Hn(1.15,1.25,4),14272931,-1.9,.62,-.6,0,Math.PI/4,0),Le(new at(1.7,.12,1.7),i,-1.9,.06,-.6,0,Math.PI/4,0),Le(new At(.34,.4,.14,7),5988200,1.3,.07,1.2),Le(new Hn(.2,.5,5),16751165,1.3,.38,1.2)])}var Ki=16,wu=26,_m=1.17,Ni=420;function Mn(i){return new He(i)}var Cu=class{constructor(e){this.n=0,this.pos=new Float32Array(Ni*3),this.colr=new Float32Array(Ni*4),this.size=new Float32Array(Ni),this.vel=new Float32Array(Ni*3),this.life=new Float32Array(Ni),this.max=new Float32Array(Ni),this.base=new Float32Array(Ni*2);let t=new Ct;t.setAttribute("position",new Dt(this.pos,3)),t.setAttribute("pcolor",new Dt(this.colr,4)),t.setAttribute("size",new Dt(this.size,1)),t.setDrawRange(0,0),this.mat=new Vn({uniforms:{scale:{value:600}},vertexShader:`attribute float size; attribute vec4 pcolor; varying vec4 vColor; uniform float scale;
void main(){ vColor = pcolor; vec4 mv = modelViewMatrix * vec4(position, 1.0);
gl_PointSize = size * scale / -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:`varying vec4 vColor;
void main(){ vec2 d = gl_PointCoord - 0.5; float r = dot(d, d); if (r > 0.25) discard;
gl_FragColor = vec4(vColor.rgb, vColor.a * smoothstep(0.25, 0.12, r));
#include <colorspace_fragment>
}`,transparent:!0,depthWrite:!1}),this.points=new Yr(t,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=5,e.add(this.points),this.geo=t,this._c=new He}add(e,t,n,s,r,o,c,a,l,h){let u=this.n;u>=Ni?u=Math.floor(Math.random()*Ni):this.n++,this.pos[u*3]=e,this.pos[u*3+1]=t,this.pos[u*3+2]=n,this.vel[u*3]=s,this.vel[u*3+1]=r,this.vel[u*3+2]=o,this.life[u]=c,this.max[u]=c,this.base[u*2]=a,this.base[u*2+1]=h||0,this._c.set(l),this.colr[u*4]=this._c.r,this.colr[u*4+1]=this._c.g,this.colr[u*4+2]=this._c.b,this.colr[u*4+3]=1,this.size[u]=a}burst(e,t,n,s,r,o,c,a,l,h){for(let u=0;u<s;u++){let f=Math.random()*6.283,d=r*(.4+Math.random()*.6);this.add(e,t,n,Math.sin(f)*d,(h||0)+(Math.random()-.3)*r*.6,Math.cos(f)*d,o*(.6+Math.random()*.4),c*(.6+Math.random()*.6),a,l)}}update(e){let t=this.n;for(let n=0;n<t;n++){if(this.life[n]-=e,this.life[n]<=0){if(t--,n!==t){for(let r=0;r<3;r++)this.pos[n*3+r]=this.pos[t*3+r],this.vel[n*3+r]=this.vel[t*3+r];for(let r=0;r<4;r++)this.colr[n*4+r]=this.colr[t*4+r];this.life[n]=this.life[t],this.max[n]=this.max[t],this.base[n*2]=this.base[t*2],this.base[n*2+1]=this.base[t*2+1]}n--;continue}this.vel[n*3+1]-=this.base[n*2+1]*e,this.pos[n*3]+=this.vel[n*3]*e,this.pos[n*3+1]+=this.vel[n*3+1]*e,this.pos[n*3+2]+=this.vel[n*3+2]*e,this.pos[n*3+1]<.03&&(this.pos[n*3+1]=.03,this.vel[n*3+1]=0);let s=this.life[n]/this.max[n];this.colr[n*4+3]=s<.5?s*2:1,this.size[n]=this.base[n*2]*(.6+.4*s)}this.n=t,this.geo.setDrawRange(0,t),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.pcolor.needsUpdate=!0,this.geo.attributes.size.needsUpdate=!0}},hl=class{constructor(e){this.canvas=e,this.renderer=new rl({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.quality=1,this.scene=new Hr;let t=1384750;this.scene.background=Mn(t),this.scene.fog=new zr(t,31,54),this.camera=new fn(50,.5,1,140),this.scene.add(new lo(14676479,3889717,2.1));let n=new fo(16773590,2.4);n.position.set(-.55,1,.45),this.scene.add(n),this.matFlat=new Pi({vertexColors:!0,flatShading:!0}),this.matGround=new Pi({vertexColors:!0,side:Jt}),this.geo={conifer:am(),broad:cm(),bush:lm(),rock:hm(),shuriken:dm(),bramble:pm(),food:fm(),ring:new Gn(.43,.54,22),disc:new Zs(.36,14),ball:new Pn(1,1)},this.geo.ring.rotateX(-Math.PI/2),this.geo.disc.rotateX(-Math.PI/2),this.matShadow=new Et({color:0,transparent:!0,opacity:.26,depthWrite:!1}),this.world=null,this.dyn=new xn,this.scene.add(this.dyn),this.fx=new Cu(this.scene),this.ninjas=[],this.projs={},this.areas={},this.slashes=[],this.rings=[],this.time=0,this.cam={x:48,z:48,shake:0},this.orbit=0,this._v=new B,this.w=1,this.h=1,this.deliverP=-1,this.onCue=null}resize(e,t,n){this.w=e,this.h=t;let s=Math.min(n||1,2)*this.quality;this.renderer.setPixelRatio(Math.max(.6,s)),this.renderer.setSize(e,t,!1);let r=e/t;this.camera.aspect=r;let o=6.3/wu/r;this.camera.fov=_t(2*Math.atan(o)*180/Math.PI,30,58),this.camera.updateProjectionMatrix(),this.fx.mat.uniforms.scale.value=t*Math.max(.6,s)/(2*Math.tan(this.camera.fov*Math.PI/360))}setQuality(e){this.quality=e,this.resize(this.w,this.h,window.devicePixelRatio||1)}buildWorld(e,t){this.world&&(this.scene.remove(this.world),this.world.traverse(function(v){v.geometry&&v.userData.own&&v.geometry.dispose()}));let n=new xn;this.world=n,this.scene.add(n);let s=e.tiles,r=e.vari,o={g1:Mn(6793551),g2:Mn(6069318),gb:Mn(4885052),path1:Mn(13610612),path2:Mn(12886632),st1:Mn(10988982),st2:Mn(9870502),wall:Mn(2973491),bed:Mn(2776975),bank:Mn(8021312),wood1:Mn(11566917),wood2:Mn(10252090)},c=new He,a=new zt,l=this;function h(v,b){if(!b.length)return;let M=new qr(v,l.matFlat,b.length);for(let _=0;_<b.length;_++){let x=b[_];a.position.set(x.x,0,x.z),a.rotation.set(0,x.r,0),a.scale.set(x.s,x.sy||x.s,x.s),a.updateMatrix(),M.setMatrixAt(_,a.matrix),c.setRGB(x.c,x.c*(x.cg||1),x.c),M.setColorAt(_,c)}M.instanceMatrix.needsUpdate=!0,M.instanceColor&&(M.instanceColor.needsUpdate=!0),M.computeBoundingSphere(),n.add(M)}function u(v,b,M,_,x,E,C,P,I,O,L,U,k,W,ee,V,q,te,ue){v.push(_,x,E,C,P,I,O,L,U,_,x,E,O,L,U,k,W,ee);for(let Pe=0;Pe<6;Pe++)b.push(V,q,te),M.push(ue.r,ue.g,ue.b)}function f(v,b){if(v<0||b<0||v>=96||b>=96)return!1;let M=s[b*96+v];return M===oi||M===as}for(let v=0;v<96/Ki;v++)for(let b=0;b<96/Ki;b++){let M=[],_=[],x=[],E=[],C=[],P=[],I=[];for(let U=v*Ki;U<(v+1)*Ki;U++)for(let k=b*Ki;k<(b+1)*Ki;k++){let W=U*96+k,ee=s[W],V=r[W]/255,q=r[(W*7+13)%9216]/255,te,ue=0;if(ee===oi||ee===as){if(ue=-.5,te=o.bed,f(k,U-1)||u(M,_,x,k,0,U,k+1,0,U,k+1,ue,U,k,ue,U,0,0,1,o.bank),f(k,U+1)||u(M,_,x,k,0,U+1,k+1,0,U+1,k+1,ue,U+1,k,ue,U+1,0,0,-1,o.bank),f(k-1,U)||u(M,_,x,k,0,U,k,0,U+1,k,ue,U+1,k,ue,U,1,0,0,o.bank),f(k+1,U)||u(M,_,x,k+1,0,U,k+1,0,U+1,k+1,ue,U+1,k+1,ue,U,-1,0,0,o.bank),ee===as){let J=(k+U)%2?o.wood1:o.wood2;u(M,_,x,k,.05,U,k,.05,U+1,k+1,.05,U+1,k+1,.05,U,0,1,0,J)}}else ee===os?te=c.copy(o.path1).lerp(o.path2,V).clone():ee===yr||ee===Bn?te=(k+U)%2?o.st1:o.st2:ee===_n?te=o.wall:ee===yi?te=o.gb:te=c.copy((k+U)%2?o.g1:o.g2).lerp(o.gb,V*.35).clone();u(M,_,x,k,ue,U,k,ue,U+1,k+1,ue,U+1,k+1,ue,U,0,1,0,te);let Pe=V*6.283;if(ee===jn){let J={x:k+.5+(V-.5)*.12,z:U+.5+(q-.5)*.12,r:Pe,s:.8+q*.26,c:.86+V*.3,cg:1};(q>.34?E:C).push(J)}else if(ee===_n){let J={x:k+.5+(V-.5)*.5,z:U+.5+(q-.5)*.5,r:Pe,s:1.25+q*.5,c:.6+V*.22,cg:1};(q>.2?E:C).push(J)}else ee===ri?P.push({x:k+.5,z:U+.5,r:Pe,s:.95+q*.35,c:.88+V*.22}):ee===yi?(I.push({x:k+.3+V*.12,z:U+.32+q*.12,r:Pe,s:.95+q*.3,c:.85+V*.3}),I.push({x:k+.72-q*.1,z:U+.7-V*.1,r:Pe+2,s:.8+V*.3,c:.8+q*.3})):ee===xr&&V>.93&&I.push({x:k+.5,z:U+.5,r:Pe,s:.3,sy:.22,c:1.25,cg:1.1})}let O=new Ct;O.setAttribute("position",new st(M,3)),O.setAttribute("normal",new st(_,3)),O.setAttribute("color",new st(x,3));let L=new Ve(O,this.matGround);L.userData.own=!0,n.add(L),h(this.geo.conifer,E),h(this.geo.broad,C),h(this.geo.rock,P),h(this.geo.bush,I)}{let v=99991,b=function(){return v=v*16807%2147483647,v/2147483647},M={};for(let _=-7;_<103;_++)for(let x=-7;x<103;x++){if(x>=0&&_>=0&&x<96&&_<96||b()>.62)continue;let E=Math.floor((x+16)/Ki)+"_"+Math.floor((_+16)/Ki);(M[E]||(M[E]=[])).push({x:x+.2+b()*.6,z:_+.2+b()*.6,r:b()*6.283,s:1.3+b()*.6,c:.5+b()*.2,cg:1})}for(let _ in M)h(this.geo.conifer,M[_])}let d=new Ve(new qi(96,96),new Pi({color:4565228,transparent:!0,opacity:.8}));d.rotation.x=-Math.PI/2,d.position.set(96/2,-.16,96/2),d.userData.own=!0,n.add(d),this.water=d;let p=new Ve(new qi(420,420),new Pi({color:2380075}));p.rotation.x=-Math.PI/2,p.position.set(96/2,-.62,96/2),p.userData.own=!0,n.add(p);let y=new Ve(mm(),this.matFlat);y.position.set(48,0,48),y.userData.own=!0,n.add(y),this.orb=new Ve(this.geo.ball,new Et({color:16773808})),this.orb.position.set(48,1.12,48),this.orb.scale.setScalar(.27),n.add(this.orb);let m=new Gn(Y.SHRINE_R-.14,Y.SHRINE_R,72);m.rotateX(-Math.PI/2),this.shrineRing=new Ve(m,new Et({color:16766826,transparent:!0,opacity:.9,depthWrite:!1})),this.shrineRing.position.set(48,.17,48),this.shrineRing.userData.own=!0,n.add(this.shrineRing),this.progRing=new Ve(new Ct,new Et({color:16777215,transparent:!0,opacity:.95,depthWrite:!1,side:Jt})),this.progRing.position.set(48,.18,48),this.progRing.visible=!1,n.add(this.progRing),this.deliverP=-1;for(let v=0;v<t;v++){let b=Jf(e,t,v),M=new Ve(gm(gt[v].color),this.matFlat),_=b.x-48,x=b.z-48,E=Math.sqrt(_*_+x*x);M.position.set(b.x+_/E*3.4,0,b.z+x/E*3.4),M.rotation.y=Math.atan2(48-b.x,48-b.z),M.userData.own=!0,n.add(M)}this.food=[];for(let v=0;v<e.pickups.length;v++){let b=e.pickups[v],M=new Ve(this.geo.food,this.matFlat);M.position.set(b.x,.6,b.z);let _=new Ve(this.geo.ring,new Et({color:7208847,transparent:!0,opacity:.7,depthWrite:!1}));_.position.set(b.x,.04,b.z),_.scale.setScalar(.9),n.add(M),n.add(_),this.food.push({m:M,sh:_})}let g=new At(1,1,5,72,1,!0);this.zoneWall=new Ve(g,new Et({color:10640639,transparent:!0,opacity:.28,side:Jt,depthWrite:!1,fog:!1})),this.zoneWall.position.set(48,2.5,48),this.zoneWall.userData.own=!0,this.zoneWall.renderOrder=3,n.add(this.zoneWall);let S=new Gn(1,90,72,1);S.rotateX(-Math.PI/2),this.zoneOut=new Ve(S,new Et({color:6959032,transparent:!0,opacity:.4,depthWrite:!1})),this.zoneOut.position.set(48,.1,48),this.zoneOut.userData.own=!0,this.zoneOut.renderOrder=2,n.add(this.zoneOut);let A=new Gn(.992,1,96,1);A.rotateX(-Math.PI/2),this.zoneNext=new Ve(A,new Et({color:14137087,transparent:!0,opacity:.4,depthWrite:!1})),this.zoneNext.position.set(48,.12,48),this.zoneNext.userData.own=!0,n.add(this.zoneNext)}buildMatch(e,t,n){for(;this.dyn.children.length;)this.dyn.remove(this.dyn.children[0]);for(let c=0;c<this.ninjas.length;c++){let a=this.ninjas[c];a.mat.dispose(),a.ghostMat.dispose(),a.ringMat.dispose(),a.geos.forEach(function(l){l.dispose()})}this.ninjas=[],this.projs={},this.areas={},this.slashes=[],this.rings=[],this.myId=n,this.myTeam=n>=0?e[n].team:-1;for(let c=0;c<e.length;c++){let a=e[c],l=gt[a.team].color,h=kt[a.cls].color,u=new Pi({vertexColors:!0,flatShading:!0}),f=sm(l,h,a.cls),d=Au(l,!0),p=Au(l,!1),y=rm(l),m=om(l),g=new xn,S=new xn,A=new Ve(f,u),v=new Ve(p,u),b=new Ve(d,u),M=new Ve(y,u),_=new Ve(y,u),x=new Ve(m,u);v.position.set(.29,.81,0),b.position.set(-.29,.81,0),M.position.set(.115,.37,0),_.position.set(-.115,.37,0),x.position.set(0,.88,-.2),S.add(A,v,b,M,_,x);let E=new Et({color:c===n?16777215:l,transparent:!1,blending:dc,opacity:.62,depthFunc:Ws,depthWrite:!1,fog:!1}),C=new Ve(f,E);C.renderOrder=1,A.renderOrder=2,v.renderOrder=2,b.renderOrder=2,M.renderOrder=2,_.renderOrder=2,x.renderOrder=2,S.add(C);let P=new Et({color:c===n?16777215:l,transparent:!0,opacity:.9,depthWrite:!1}),I=new Ve(this.geo.ring,P);I.position.y=.05,c===n&&I.scale.setScalar(1.18);let O=new Ve(this.geo.disc,this.matShadow);O.position.y=.035,g.add(S,I,O),g.scale.setScalar(1.12),this.dyn.add(g),this.ninjas.push({root:g,body:S,torso:A,armL:v,armR:b,legL:M,legR:_,tail:x,ring:I,ringMat:P,mat:u,ghostMat:E,geos:[f,d,p,y,m],cM:0,cS:0,cX:0,cH:0,cD:0,first:!0,phase:c*1.7,run:0,atkT:0,thrT:0,castT:0,dashT:0,hurtT:0,downK:0,seed:c*2.3,wasSt:Ne,stepT:0,trail:0})}this.scrolls=[];for(let c=0;c<t;c++){let a=Yn[c%2].color,l=new xn,h=um(a),u=new Ve(h,this.matFlat),f=new Ve(new At(.1,.34,7,8,1,!0),new Et({color:a,transparent:!0,opacity:.35,depthWrite:!1,blending:sr,side:Jt}));f.position.y=3.2;let d=new Ve(this.geo.ring,new Et({color:a,transparent:!0,opacity:.9,depthWrite:!1}));d.position.y=.06,d.scale.setScalar(1.5),l.add(u,f,d),this.dyn.add(l),this.scrolls.push({grp:l,m:u,beam:f,halo:d})}let s=new Gn(.6,.72,24);s.rotateX(-Math.PI/2),this.targetRing=new Ve(s,new Et({color:16731469,transparent:!0,opacity:.85,depthWrite:!1})),this.targetRing.visible=!1,this.dyn.add(this.targetRing);let r=new Qs;r.moveTo(0,.42),r.lineTo(.3,-.12),r.lineTo(.1,-.05),r.lineTo(.1,-.3),r.lineTo(-.1,-.3),r.lineTo(-.1,-.05),r.lineTo(-.3,-.12);let o=new oo(r);o.rotateX(Math.PI/2),this.arrow=new Ve(o,new Et({color:16777215,transparent:!0,opacity:.95,depthWrite:!1,side:Jt,fog:!1})),this.arrow.visible=!1,this.arrow.renderOrder=4,this.dyn.add(this.arrow)}slash(e,t,n,s){let r=null;for(let o=0;o<this.slashes.length;o++)if(this.slashes[o].t<=0){r=this.slashes[o];break}if(!r){if(this.slashes.length>10)return;let o=new Gn(.75,Y.MELEE_R,16,1,Math.PI/2-Y.MELEE_ARC,Y.MELEE_ARC*2);o.rotateX(-Math.PI/2);let c=new Ve(o,new Et({color:16777215,transparent:!0,opacity:.8,depthWrite:!1,side:Jt,blending:sr}));r={m:c,t:0},this.slashes.push(r),this.scene.add(c)}r.t=.2,r.m.material.color.set(s).lerp(Mn(16777215),.6),r.m.position.set(e,.75,t),r.m.rotation.y=n-Math.PI/2,r.m.visible=!0}ringFx(e,t,n,s,r,o){let c=null;for(let a=0;a<this.rings.length;a++)if(this.rings[a].t<=0){c=this.rings[a];break}if(!c){if(this.rings.length>12)return;let a=new Gn(.8,1,40);a.rotateX(-Math.PI/2);let l=new Ve(a,new Et({color:16777215,transparent:!0,opacity:.9,depthWrite:!1,side:Jt}));c={m:l,t:0,life:1,r:1},this.rings.push(c),this.scene.add(l)}c.t=r,c.life=r,c.r=n,c.m.material.color.set(s),c.m.position.set(e,o||.2,t),c.m.visible=!0}event(e,t){let n=this.fx,s=t.ninjas,r=e[0];if(r==="hit"){let o=s[e[1]];if(!o||o.hidden)return;let c=e[3],a=c===2?16747069:c===3?9425231:c===4?11565823:16777215;n.burst(o.x,.9,o.z,c===4?3:7,3.2,.3,.2,a,6,1),e[1]===this.myId&&(this.cam.shake=Math.min(.5,this.cam.shake+.22))}else if(r==="down"||r==="out"){let o=s[e[1]];o&&n.burst(o.x,.6,o.z,r==="out"?22:14,2.6,.7,.42,r==="out"?10134453:14541806,0,.6)}else if(r==="rev"||r==="resp"){let o=s[e[1]];o&&(this.ringFx(o.x,o.z,1.6,10354608,.5),n.burst(o.x,.4,o.z,14,1.4,.8,.22,10354608,-3,1.5))}else if(r==="heal"||r==="food"){let o=s[e[1]];o&&!o.hidden&&n.burst(o.x,.5,o.z,9,.9,.8,.2,8257434,-4,1.2)}else if(r==="pick"||r==="drop"){let o=s[e[1]];if(o){let c=Yn[e[2]%2].color;this.ringFx(o.x,o.z,1.4,c,.45),n.burst(o.x,1.2,o.z,12,2.2,.6,.2,c,3,1.5)}}else if(r==="fx"){let o=e[2]/100,c=e[3]/100;if(e[1]==="boom"){this.ringFx(o,c,Y.FIRE_R,16757575,.35),n.burst(o,.5,c,26,6,.55,.55,16742959,4,2),n.burst(o,.5,c,12,3,.7,.5,16769162,2,3);let a=o-this.cam.x,l=c-this.cam.z;a*a+l*l<90&&(this.cam.shake=Math.min(.5,this.cam.shake+.25))}else e[1]==="heal"?(this.ringFx(o,c,Y.HEAL_R,5230847,.55),n.burst(o,.3,c,20,3.2,.8,.26,9430015,-3,1.5)):e[1]==="bram"?n.burst(o,.3,c,16,3.2,.5,.3,9425231,6,2):e[1]==="clink"&&n.burst(o,.8,c,4,2,.2,.14,16777215,5,1)}}update(e,t,n,s){this.time+=t;let r=this.time,o=this.fx,c=e.ninjas;for(let b=0;b<this.ninjas.length;b++)c[b]?this.updateNinja(this.ninjas[b],c[b],t,b):this.ninjas[b].root.visible=!1;for(let b=0;b<this.scrolls.length;b++){let M=this.scrolls[b],_=e.scrolls[b];if(!_){M.grp.visible=!1;continue}let x=_.carrier>=0,E=x?c[_.carrier]:null,C=!(x&&(E.hidden||E.st===qt));if(M.grp.visible=C,!!C){if(M.grp.position.set(_.x,0,_.z),M.beam.visible=!x,M.halo.visible=!x,M.m.position.y=x?1.95+Math.sin(r*3+b)*.05:.75+Math.sin(r*2.4+b)*.12,x){let P=0;for(let I=0;I<b;I++)e.scrolls[I].carrier===_.carrier&&P++;M.m.position.y+=P*.3}M.m.rotation.y=r*1.6+b,M.m.scale.setScalar(x?.85:1.25),x||M.halo.scale.setScalar(1.4+Math.sin(r*5)*.2)}}for(let b=0;b<this.food.length;b++){let M=this.food[b],_=e.food>>b&1;M.m.visible=!!_,M.sh.visible=!!_,_&&(M.m.position.y=.62+Math.sin(r*2.6+b)*.1,M.m.rotation.y=r*1.3+b)}let a={};for(let b=0;b<e.proj.length;b++){let M=e.proj[b];a[M.id]=1;let _=this.projs[M.id];if(!_){let x;M.kind===0?x=new Ve(this.geo.shuriken,this.matFlat):(x=new Ve(this.geo.ball,new Et({color:M.kind===1?16753213:10212938})),x.scale.setScalar(M.kind===1?.3:.18)),_=this.projs[M.id]={m:x,kind:M.kind,life:Math.max(.05,M.ttl),t:0},this.scene.add(x)}if(_.t+=t,M.kind===0)_.m.position.set(M.x,.85,M.z),_.m.rotation.y=r*30,Math.random()<.5&&o.add(M.x,.85,M.z,0,0,0,.14,.11,13621478,0);else{let x=M.kind===1?Y.FIRE_T:Y.SEED_T,E=_t(1-M.ttl/x,0,1),C=.9+Math.sin(E*Math.PI)*2.2;_.m.position.set(M.x,C,M.z),o.add(M.x,C,M.z,Math.random()-.5,.4,Math.random()-.5,.3,M.kind===1?.36:.2,M.kind===1?16742959:8372031,0)}}for(let b in this.projs)if(!a[b]){let M=this.projs[b];this.scene.remove(M.m),M.kind!==0&&M.m.material.dispose(),delete this.projs[b]}let l={};for(let b=0;b<e.areas.length;b++){let M=e.areas[b];l[M.id]=1;let _=this.areas[M.id];if(!_){let E=new Ve(this.geo.bramble,this.matFlat),C=new Zs(M.r,28);C.rotateX(-Math.PI/2);let P=new Ve(C,new Et({color:M.team===this.myTeam?7323450:12597547,transparent:!0,opacity:.25,depthWrite:!1}));P.position.y=.07;let I=new xn;I.add(E,P),I.position.set(M.x,0,M.z),_=this.areas[M.id]={grp:I,m:E,d:P,grow:0},this.scene.add(I)}_.grow=Math.min(1,_.grow+t*6);let x=_.grow*Math.min(1,M.ttl*2.5);_.m.scale.set(1,Math.max(.01,x),1)}for(let b in this.areas)if(!l[b]){let M=this.areas[b];this.scene.remove(M.grp),M.d.geometry.dispose(),M.d.material.dispose(),delete this.areas[b]}for(let b=0;b<this.slashes.length;b++){let M=this.slashes[b];M.t<=0||(M.t-=t,M.m.material.opacity=Math.max(0,M.t/.2)*.8,M.t<=0&&(M.m.visible=!1))}for(let b=0;b<this.rings.length;b++){let M=this.rings[b];if(M.t<=0)continue;M.t-=t;let _=1-Math.max(0,M.t)/M.life;M.m.scale.setScalar(.2+_*M.r),M.m.material.opacity=(1-_)*.9,M.t<=0&&(M.m.visible=!1)}let h=e.zone,u=Math.max(.3,h.r);this.zoneWall.scale.set(u,1,u),this.zoneOut.scale.set(u,1,u),this.zoneWall.material.opacity=.22+Math.sin(r*2.2)*.06;let f=h.to<h.r-.5&&h.stage<5;this.zoneNext.visible=f,f&&this.zoneNext.scale.set(Math.max(.3,h.to),1,Math.max(.3,h.to));let d=s&&s.sealed;this.shrineRing.material.color.set(d?9410211:16766826),this.shrineRing.material.opacity=d?.5:.7+Math.sin(r*4)*.25,this.orb.scale.setScalar(d?.2:.27+Math.sin(r*3)*.035),this.orb.material.color.set(d?10134453:16773808);let p=0,y=-1;for(let b=0;b<e.deliver.length;b++)e.deliver[b]>p&&(p=e.deliver[b],y=b);let m=Math.round(p*50);if(m!==this.deliverP)if(this.deliverP=m,this.progRing.geometry.dispose(),m>0){let b=new Gn(Y.SHRINE_R-.75,Y.SHRINE_R-.25,64,1,0,Math.PI*2*m/50);b.rotateX(-Math.PI/2),this.progRing.geometry=b,this.progRing.material.color.set(gt[y].color),this.progRing.visible=!0}else this.progRing.geometry=new Ct,this.progRing.visible=!1;this.water&&(this.water.position.y=-.17+Math.sin(r*1.3)*.02);let g=n>=0?c[n]:null,S=s&&s.target;this.targetRing.visible=!!S,S&&(this.targetRing.position.set(S.x,.06,S.z),this.targetRing.scale.setScalar(1+Math.sin(r*9)*.07));let A=s&&s.objective;if(this.arrow.visible=!!(A&&g&&g.st===Ne),this.arrow.visible){let b=A.x-g.x,M=A.z-g.z;if(Math.sqrt(b*b+M*M)<3.2)this.arrow.visible=!1;else{let x=Math.atan2(b,M),E=1.5+Math.sin(r*5)*.08;this.arrow.position.set(g.x+Math.sin(x)*E,.2,g.z+Math.cos(x)*E),this.arrow.rotation.y=x,this.arrow.material.color.set(A.color)}}o.update(t);let v=this.cam;if(s&&s.orbit){this.orbit+=t*.07;let b=17;this.camera.position.set(48+Math.sin(this.orbit)*b,12,48+Math.cos(this.orbit)*b),this.camera.lookAt(48,1.2,48)}else{if(g){let E=1-Math.exp(-t*9),C=g.x-v.x,P=g.z-v.z;C*C+P*P>400?(v.x=g.x,v.z=g.z):(v.x+=C*E,v.z+=P*E)}let b=0,M=0;v.shake>0&&(v.shake=Math.max(0,v.shake-t*1.6),b=(Math.random()-.5)*v.shake,M=(Math.random()-.5)*v.shake);let _=.8,x=v.z+1.6;this.camera.position.set(v.x+b,_+Math.sin(_m)*wu,x+Math.cos(_m)*wu+M),this.camera.lookAt(v.x+b,_,x+M)}this.camera.updateMatrixWorld()}updateNinja(e,t,n,s){let r=t.st!==qt&&!t.hidden;if(e.root.visible=r,(e.first||!r)&&(e.cM=t.cM,e.cS=t.cS,e.cX=t.cX,e.cH=t.cH,e.cD=t.cD,e.first=!1,e.wasSt=t.st,!r))return;let o=this.time,c=this.fx;e.root.position.set(t.x,0,t.z),e.root.rotation.y=t.f;let a=gt[t.team].color;t.cM!==e.cM&&(e.cM=t.cM,e.atkT=.26,this.slash(t.x,t.z,t.f,a),this.onCue&&this.onCue("swing",t,s)),t.cS!==e.cS&&(e.cS=t.cS,e.thrT=.2,this.onCue&&this.onCue("throw",t,s)),t.cX!==e.cX&&(e.cX=t.cX,e.castT=.42,this.ringFx(t.x,t.z,1.3,kt[t.cls].color,.35),this.onCue&&this.onCue("cast",t,s)),t.cD!==e.cD&&(e.cD=t.cD,e.dashT=.24,c.burst(t.x,.2,t.z,9,2.2,.45,.34,15265527,0,.5),this.onCue&&this.onCue("dash",t,s)),t.cH!==e.cH&&(e.cH=t.cH,e.hurtT=.16),e.run+=((t.moving&&t.st===Ne?1:0)-e.run)*Math.min(1,n*12),e.phase+=n*13.5*e.run;let l=Math.sin(e.phase)*.95*e.run;e.legL.rotation.x=l,e.legR.rotation.x=-l,e.armL.rotation.x=-l*.8,e.armR.rotation.x=l*.8,e.armL.rotation.z=0,e.armR.rotation.z=0;let h=Math.abs(Math.sin(e.phase))*.07*e.run+Math.sin(o*2.2+e.seed)*.012,u=.14*e.run,f=0;if(e.atkT>0){e.atkT-=n;let A=1-Math.max(0,e.atkT)/.26;e.armR.rotation.x=-2.5+A*3.3,e.armR.rotation.z=-.35,f=(.5-A)*1,u+=.18}if(e.thrT>0){e.thrT-=n;let A=1-Math.max(0,e.thrT)/.2;e.armL.rotation.x=-2.7+A*2.5}if(e.castT>0){e.castT-=n;let A=Math.sin((1-Math.max(0,e.castT)/.42)*Math.PI);e.armL.rotation.x=-2.9*A,e.armR.rotation.x=-2.9*A,e.armL.rotation.z=.3*A,e.armR.rotation.z=-.3*A,h+=.12*A}let d=1;e.dashT>0&&(e.dashT-=n,u=.75,d=1.3,Math.random()<.8&&c.add(t.x,.6,t.z,0,.2,0,.25,.4,a,0)),e.run>.6&&(e.stepT-=n,e.stepT<=0&&(e.stepT=.23,Math.random()<.5&&c.add(t.x,.06,t.z,0,.3,0,.3,.2,13220239,0),this.onCue&&s===this.myId&&this.onCue("step",t,s)));let p=t.st===nn?1:0;e.downK+=(p-e.downK)*Math.min(1,n*10),e.body.rotation.x=u*(1-e.downK)-1.5*e.downK,e.body.rotation.y=f,e.body.position.y=h*(1-e.downK)+.2*e.downK,e.body.scale.set(1,1,d),e.tail.rotation.x=-.25-e.run*.8+Math.sin(o*11+e.seed)*.13*(.3+e.run),e.ring.visible=!p,s===this.myId&&e.ring.scale.setScalar(1.18+Math.sin(o*4)*.05);let y=e.mat.emissive,m=0,g=0,S=0;if(t.fl&Yo){let A=.25+Math.sin(o*18)*.12;m+=A,g+=A*.35,Math.random()<.3&&c.add(t.x+(Math.random()-.5)*.4,.5+Math.random()*.8,t.z+(Math.random()-.5)*.4,0,1.4,0,.4,.22,16747069,-1)}if(t.fl&bs?g+=.1:t.fl&Ts&&(g+=.05),e.hurtT>0){e.hurtT-=n;let A=Math.max(0,e.hurtT)/.16;m+=A*.9,g+=A*.9,S+=A*.9}p&&(m*=.3,g*=.3,S*=.3),y.setRGB(m,g,S),t.fl&jo&&e.dashT<=0?e.body.visible=Math.sin(o*40)>-.3:e.body.visible=!0,e.wasSt!==t.st&&(e.wasSt=t.st)}project(e,t,n,s){let r=this._v.set(e,t,n).project(this.camera);return s.x=(r.x*.5+.5)*this.w,s.y=(-r.y*.5+.5)*this.h,s.vis=r.z>-1&&r.z<1&&r.x>-1.15&&r.x<1.15&&r.y>-1.15&&r.y<1.15,s}render(){this.renderer.render(this.scene,this.camera)}};var ul=class{constructor(){this.jx=0,this.jz=0,this.held={melee:!1,shuriken:!1,dash:!1,special:!1},this.edge={dash:!1,special:!1,melee:!1,shuriken:!1},this.keys={},this.joyId=null,this.ox=0,this.oy=0,this.out={mx:0,mz:0,melee:!1,shuriken:!1,dash:!1,special:!1},this.enabled=!1,this.R=54}attach(e,t,n,s){this.zone=e,this.base=t,this.knob=n;let r=this,o={passive:!1};e.addEventListener("pointerdown",function(a){if(a.preventDefault(),r.joyId!==null)return;r.joyId=a.pointerId,r.ox=a.clientX,r.oy=a.clientY;try{e.setPointerCapture(a.pointerId)}catch{}let l=e.getBoundingClientRect();t.style.left=a.clientX-l.left+"px",t.style.top=a.clientY-l.top+"px",t.classList.add("on"),r.moveJoy(a)},o),e.addEventListener("pointermove",function(a){a.pointerId===r.joyId&&(a.preventDefault(),r.moveJoy(a))},o);function c(a){a.pointerId===r.joyId&&(r.joyId=null,r.jx=0,r.jz=0,t.classList.remove("on"),t.style.left="",t.style.top="",n.style.transform="translate(-50%,-50%)")}e.addEventListener("pointerup",c),e.addEventListener("pointercancel",c),e.addEventListener("lostpointercapture",c);for(let a=0;a<s.length;a++){let l=s[a],h=l.getAttribute("data-act"),u=function(d){d.preventDefault(),r.held[h]=!0,h in r.edge&&(r.edge[h]=!0),l.classList.add("down");try{l.setPointerCapture(d.pointerId)}catch{}},f=function(){r.held[h]=!1,l.classList.remove("down")};l.addEventListener("pointerdown",u,o),l.addEventListener("pointerup",f),l.addEventListener("pointercancel",f),l.addEventListener("lostpointercapture",f),l.addEventListener("contextmenu",function(d){d.preventDefault()})}window.addEventListener("keydown",function(a){a.repeat||(r.keys[a.code]=!0,(a.code==="KeyL"||a.code==="Space")&&(r.edge.dash=!0),(a.code==="KeyI"||a.code==="KeyU")&&(r.edge.special=!0),a.code==="KeyJ"&&(r.edge.melee=!0),a.code==="KeyK"&&(r.edge.shuriken=!0))}),window.addEventListener("keyup",function(a){r.keys[a.code]=!1}),window.addEventListener("blur",function(){r.reset()})}moveJoy(e){let t=e.clientX-this.ox,n=e.clientY-this.oy,s=Math.sqrt(t*t+n*n),r=this.R,o=s>r?r/s:1;this.knob.style.transform="translate(calc(-50% + "+t*o+"px), calc(-50% + "+n*o+"px))";let c=Math.min(1,s/r);if(c<.2){this.jx=0,this.jz=0;return}let a=Math.min(1,(c-.2)/.45);this.jx=t/s*a,this.jz=n/s*a}reset(){this.jx=0,this.jz=0,this.joyId=null,this.keys={};for(let e in this.held)this.held[e]=!1;this.edge.dash=!1,this.edge.special=!1,this.edge.melee=!1,this.edge.shuriken=!1,this.base&&(this.base.classList.remove("on"),this.base.style.left="",this.base.style.top=""),this.knob&&(this.knob.style.transform="translate(-50%,-50%)")}read(){let e=this.out,t=this.keys,n=this.jx,s=this.jz,r=(t.KeyD||t.ArrowRight?1:0)-(t.KeyA||t.ArrowLeft?1:0),o=(t.KeyS||t.ArrowDown?1:0)-(t.KeyW||t.ArrowUp?1:0);if(r||o){let c=Math.sqrt(r*r+o*o);n=r/c,s=o/c}return this.enabled||(n=0,s=0),e.mx=n,e.mz=s,e.melee=this.enabled&&(this.held.melee||!!t.KeyJ||this.edge.melee),e.shuriken=this.enabled&&(this.held.shuriken||!!t.KeyK||this.edge.shuriken),e.dash=this.enabled&&this.edge.dash,e.special=this.enabled&&this.edge.special,this.edge.dash=!1,this.edge.special=!1,this.edge.melee=!1,this.edge.shuriken=!1,e}};var fl=class{constructor(){this.ctx=null,this.sfxOn=!0,this.musicOn=!0,this.master=null,this.musicGain=null,this.timer=null,this.step=0,this.nextT=0,this.mood=0,this.noiseBuf=null,this.last={}}unlock(){if(!this.ctx){let e=window.AudioContext||window.webkitAudioContext;if(!e)return;try{this.ctx=new e}catch{return}this.master=this.ctx.createGain(),this.master.gain.value=.9;let t=this.ctx.createDynamicsCompressor();this.master.connect(t),t.connect(this.ctx.destination),this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=this.musicOn?.5:0,this.musicGain.connect(this.master);let n=this.ctx.sampleRate*1;this.noiseBuf=this.ctx.createBuffer(1,n,this.ctx.sampleRate);let s=this.noiseBuf.getChannelData(0);for(let r=0;r<n;r++)s[r]=Math.random()*2-1;this.startMusic()}if(this.ctx.state!=="running")try{this.ctx.resume()}catch{}}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend()}resume(){if(this.ctx&&this.ctx.state!=="running")try{this.ctx.resume()}catch{}}setSfx(e){this.sfxOn=e}setMusic(e){this.musicOn=e,this.musicGain&&this.musicGain.gain.setTargetAtTime(e?.5:0,this.ctx.currentTime,.1)}setMood(e){this.mood=e}tone(e,t,n,s,r,o,c){let a=this.ctx;if(!a)return;let l=a.currentTime+(o||0),h=a.createOscillator(),u=a.createGain();h.type=n||"sine",h.frequency.setValueAtTime(e,l),r&&h.frequency.exponentialRampToValueAtTime(Math.max(20,r),l+t),u.gain.setValueAtTime(1e-4,l),u.gain.exponentialRampToValueAtTime(Math.max(2e-4,s),l+.008),u.gain.exponentialRampToValueAtTime(1e-4,l+t),h.connect(u),u.connect(c||this.master),h.start(l),h.stop(l+t+.03)}noise(e,t,n,s,r,o,c,a){let l=this.ctx;if(!l)return;let h=l.currentTime+(c||0),u=l.createBufferSource(),f=l.createBiquadFilter(),d=l.createGain();u.buffer=this.noiseBuf,u.loop=!0,f.type=n||"lowpass",f.Q.value=o||.8,f.frequency.setValueAtTime(s,h),r&&f.frequency.exponentialRampToValueAtTime(Math.max(30,r),h+e),d.gain.setValueAtTime(1e-4,h),d.gain.exponentialRampToValueAtTime(Math.max(2e-4,t),h+.01),d.gain.exponentialRampToValueAtTime(1e-4,h+e),u.connect(f),f.connect(d),d.connect(a||this.master),u.start(h,Math.random()*.5),u.stop(h+e+.03)}play(e,t){if(!this.ctx||!this.sfxOn||this.ctx.state!=="running"||(t==null&&(t=1),t<=.03))return;let n=this.ctx.currentTime;if(!(this.last[e]&&n-this.last[e]<.035))switch(this.last[e]=n,e){case"click":this.tone(880,.05,"triangle",.12*t);break;case"step":this.noise(.05,.035*t,"lowpass",500,200,.7);break;case"swing":this.noise(.13,.2*t,"bandpass",900,3200,1.2);break;case"throw":this.noise(.09,.14*t,"highpass",2500,6e3,.8),this.tone(1400,.07,"triangle",.05*t,2200);break;case"clink":this.tone(2600,.06,"square",.04*t,1800);break;case"hit":this.tone(190,.1,"sine",.3*t,60),this.noise(.06,.16*t,"lowpass",2400,500,.7);break;case"hurt":this.tone(240,.16,"sawtooth",.16*t,70),this.noise(.1,.22*t,"lowpass",1800,300,.7);break;case"dash":this.noise(.2,.2*t,"bandpass",2600,500,1.4);break;case"cast":this.tone(330,.22,"triangle",.14*t,880);break;case"boom":this.tone(130,.45,"sine",.42*t,34),this.noise(.5,.36*t,"lowpass",2600,120,.6);break;case"heal":this.tone(523,.14,"sine",.13*t),this.tone(659,.14,"sine",.13*t,0,.08),this.tone(784,.22,"sine",.13*t,0,.16);break;case"bram":this.tone(220,.25,"sawtooth",.09*t,90),this.noise(.25,.14*t,"bandpass",700,1800,2);break;case"food":this.tone(660,.08,"triangle",.14*t),this.tone(990,.12,"triangle",.14*t,0,.07);break;case"pick":this.tone(880,.12,"triangle",.16*t),this.tone(1175,.12,"triangle",.16*t,0,.09),this.tone(1568,.3,"triangle",.16*t,0,.18);break;case"drop":this.tone(700,.14,"triangle",.14*t,350),this.tone(440,.24,"triangle",.12*t,220,.12);break;case"down":this.tone(392,.16,"square",.07*t,300),this.tone(262,.3,"square",.07*t,130,.14);break;case"revive":this.tone(392,.12,"triangle",.14*t),this.tone(523,.12,"triangle",.14*t,0,.1),this.tone(784,.3,"triangle",.14*t,0,.2);break;case"beep":this.tone(620,.12,"square",.07*t);break;case"go":this.tone(930,.4,"square",.08*t),this.tone(1240,.4,"triangle",.1*t);break;case"alarm":this.tone(440,.22,"sawtooth",.07*t),this.tone(349,.3,"sawtooth",.07*t,0,.24);break;case"gong":this.tone(98,1.6,"sine",.3*t,92),this.tone(196,1.2,"triangle",.1*t,190),this.noise(.5,.08*t,"bandpass",900,400,3);break;case"win":[523,659,784,1047,1319].forEach((s,r)=>this.tone(s,.3,"triangle",.16*t,0,r*.13));break;case"lose":[392,330,262,196].forEach((s,r)=>this.tone(s,.4,"triangle",.14*t,0,r*.2));break;default:break}}startMusic(){this.timer||(this.nextT=this.ctx.currentTime+.1,this.seed=12345,this.timer=setInterval(()=>this.schedule(),90))}rnd(){return this.seed=this.seed*16807%2147483647,this.seed/2147483647}schedule(){let e=this.ctx;if(!e||e.state!=="running")return;this.nextT<e.currentTime&&(this.nextT=e.currentTime+.05);let n=60/(this.mood===2?132:this.mood===1?104:84)/2,s=[146.83,174.61,196,220,261.63,293.66,349.23,392,440,523.25];for(;this.nextT<e.currentTime+.3;){let r=this.step++%32,o=this.nextT-e.currentTime,c=Math.floor(r/8);if((r%8===0||this.mood===2&&r%4===0||this.mood>=1&&r%16===6)&&(this.tone(96,.22,"sine",.3,42,o,this.musicGain),this.noise(.05,.05,"lowpass",900,200,.7,o,this.musicGain)),this.mood>=1&&r%4===2&&this.noise(.03,.03,"highpass",6e3,0,.7,o,this.musicGain),r%8===0){let l=[0,0,2,1][c];this.tone(s[l]/2,n*7,"triangle",.12,0,o,this.musicGain)}let a=this.mood===2?.62:this.mood===1?.5:.36;(r%2===0?this.rnd()<a+.2:this.rnd()<a-.25)&&(this.note=this.note==null?5:this.note+Math.round((this.rnd()-.5)*4),this.note<2&&(this.note=3),this.note>9&&(this.note=7),this.tone(s[this.note],.5,"triangle",.075,0,o,this.musicGain),this.tone(s[this.note]*2,.12,"sine",.02,0,o,this.musicGain)),this.nextT+=n}}};var an={melee:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.5 2.5l1 1L10 15l-1.6-1.6z"/><path fill="currentColor" d="M5.8 12.6l5.6 5.6-1.5 1.4-2-2-2.6 2.7-1.6-1.6 2.7-2.6-2-2z"/></svg>',shuriken:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6-2.6 7.9-2.6-7.9L1.5 12l7.9-2.6z"/><circle cx="12" cy="12" r="1.9" fill="#182033"/></svg>',dash:'<svg viewBox="0 0 24 24"><path d="M4 5l7 7-7 7M12.5 5l7 7-7 7" stroke="currentColor" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',cls:['<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12.6 1.5c.9 4.1 5.4 5.9 5.4 11.4a6 6 0 0 1-12 0c0-2.3 1.2-3.8 2.4-4.9.1 2.2 1 3.4 2.2 3.4.2-3.300-.9-5.600 2-9.900z"/></svg>','<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.800c4.300 6.100 6.500 8.800 6.500 12.400a6.500 6.500 0 0 1-13 0c0-3.600 2.200-6.300 6.500-12.400z"/></svg>','<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3.500 20.500C3.500 10 9.500 3.500 20.500 3.500c0 11-6.500 17-17 17z"/><path d="M4.500 19.500L14 10" stroke="#182033" stroke-width="1.700" fill="none"/></svg>'],sol:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#ffcf4a"/><g stroke="#ffcf4a" stroke-width="2.200" stroke-linecap="round"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.900 4.900l2.100 2.100M17 17l2.100 2.100M4.900 19.100L7 17M17 7l2.100-2.100"/></g></svg>',luna:'<svg viewBox="0 0 24 24"><path fill="#c3d0ff" d="M15 2.500a9.500 9.500 0 1 0 6.500 16.200A8.300 8.300 0 0 1 15 2.500z"/></svg>'};function We(i){return document.getElementById(i)}function Nt(i){return String(i).replace(/[&<>"]/g,function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[e]})}function xm(i){i=Math.max(0,Math.ceil(i));let e=Math.floor(i/60),t=i%60;return e+":"+(t<10?"0":"")+t}var dl=class{constructor(e,t){this.h=e,this.set=t,this.root=We("ui"),this.hud=We("hud"),this.name=null,this.data={},this.overlay=null;let n=this;this.root.addEventListener("click",function(s){let r=s.target;for(;r&&r!==n.root&&!(r.getAttribute&&r.getAttribute("data-a"));)r=r.parentNode;!r||r===n.root||(n.h.click(),n.action(r.getAttribute("data-a"),r.getAttribute("data-v"),r))}),We("bMenu").addEventListener("click",function(){n.h.click(),n.h.pause()}),this.bannerT=0,this.feed=[],this.slow=0,this.mmT=0,this.lb=[],this.dmgPool=[],this.dmgI=0,this._p={x:0,y:0,vis:!1},this.mapImg=null}show(e,t){this.name=e,this.data=t||{},this.overlay=null,this.render()}hide(){this.name=null,this.overlay=null,this.root.innerHTML=""}showOverlay(e){this.overlay=e,this.render()}closeOverlay(){this.overlay=null,this.render()}action(e,t,n){let s=this.set,r=this.data,o=this.h;switch((this.name==="mp"||this.name==="opts")&&this.readName(),e){case"go":this.show(t),t==="lan"&&o.lanScan();break;case"back":o.back(this.name);break;case"cls":s.cls=+t,o.save(),this.name==="lobby"&&o.lobbyCls(+t),this.render();break;case"diff":s.diff=+t,o.save(),this.name==="lobby"&&o.lobbyOpt(),this.render();break;case"teams":s.teams=+t,o.save(),this.name==="lobby"&&o.lobbyOpt(),this.render();break;case"solo":o.solo();break;case"host":this.readName(),o.host(t);break;case"join":this.readName(),o.join("net",(We("fCode").value||"").trim().toUpperCase());break;case"joinip":this.readName(),o.join("lan",t||(We("fIp").value||"").trim());break;case"joinhere":this.readName(),o.join("lan",location.host);break;case"scan":o.lanScan();break;case"slot":{let c=t.split(",");o.lobbySlot(+c[0],+c[1]);break}case"start":o.start();break;case"again":o.again();break;case"leave":o.leave();break;case"resume":o.resume();break;case"tog":s[t]=!s[t],o.save(),o.applySettings(),this.render();break;case"ov":this.showOverlay(t);break;case"ovx":this.closeOverlay();break;default:break}}readName(){let e=We("fName");if(!e)return;let t=e.value.replace(/[<>&"]/g,"").trim().slice(0,12);t&&(this.set.name=t,this.h.save())}msg(e,t){let n=We("msg");n&&(n.textContent=e||"",n.className="msg"+(t?" err":"")),this.data.msg=e,this.data.err=t}clsCards(){let e=this.set,t='<div class="cards">';for(let n=0;n<3;n++)t+='<button class="card'+(e.cls===n?" on":"")+'" data-a="cls" data-v="'+n+'" style="color:'+kt[n].css+'">'+an.cls[n]+"<b>"+kt[n].name+"</b><i>"+kt[n].role+"</i></button>";return t+'</div><div class="note"><b style="color:'+kt[e.cls].css+'">'+kt[e.cls].spec+":</b> "+kt[e.cls].desc+"</div>"}chips(e,t,n,s){let r='<div class="chips">';for(let o=0;o<t.length;o++){let c=s?s[o]:o;r+='<button class="chip'+(n===c?" on":"")+'" data-a="'+e+'" data-v="'+c+'">'+t[o]+"</button>"}return r+"</div>"}toggles(){let e=this.set;function t(n,s){return'<div class="toggle"><span>'+s+'</span><button class="sw'+(e[n]?" on":"")+'" data-a="tog" data-v="'+n+'"></button></div>'}return t("sfx","Sonidos")+t("music","M\xFAsica")+t("hq","Gr\xE1ficos n\xEDtidos")}helpHtml(){return'<div class="help"><p><b>Objetivo.</b> Cada equipo de 3 empieza con un pergamino: '+this.i(an.sol)+" Sol o "+this.i(an.luna)+" Luna. Gana el primero que lleve <b>uno de cada tipo</b> al santuario del centro, o el \xFAltimo equipo en pie.</p><p><b>1 \xB7 Cacer\xEDa (1:30).</b> Derriba a quien lleve el pergamino que te falta para quit\xE1rselo. Los ca\xEDdos reaparecen en su campamento y el santuario est\xE1 sellado.</p><p><b>2 \xB7 Muerte s\xFAbita.</b> La niebla morada se cierra, ya nadie reaparece y el santuario se abre. Qu\xE9date dentro del c\xEDrculo dorado con los dos pergaminos para ganar.</p><p><b>Controles.</b> Palanca a la izquierda para moverte. "+this.i(an.melee)+" espada, "+this.i(an.shuriken)+" estrellas, "+this.i(an.dash)+" esquiva y tu t\xE9cnica especial. Apuntas solo al rival m\xE1s cercano.</p><p><b>Trucos.</b> En los matorrales no te ven. P\xE1rate junto a un compa\xF1ero ca\xEDdo para levantarlo. Las bolas de arroz curan. Los pergaminos siempre se ven en el minimapa.</p>"+((navigator.maxTouchPoints||0)>0?"":"<p><b>Con teclado.</b> WASD o flechas para moverte, J espada, K estrellas, L esquiva, I t\xE9cnica especial.</p>")+"</div>"}i(e){return'<span class="ic">'+e+"</span>"}render(){let e=this.set,t=this.data,n=this.name,s="";if(n==="title")s='<div class="screen title"><div class="logo"><div class="k">BATALLA DEL BOSQUE</div><h1>SENDA<span>NINJA</span></h1><p>Equipos de 3 \xB7 Roba el pergamino que te falta</p></div><div class="stack"><button class="btn pri" data-a="go" data-v="solo">Jugar solo</button><button class="btn gold" data-a="go" data-v="mp">Multijugador</button><div class="row"><button class="btn sm" data-a="go" data-v="help">C\xF3mo jugar</button><button class="btn sm" data-a="go" data-v="opts">Opciones</button></div>'+(t.iosTip?'<div class="tip">En iPhone: toca <b>Compartir</b> y luego <b>A\xF1adir a pantalla de inicio</b> para jugar a pantalla completa.</div>':"")+"</div></div>";else if(n==="solo")s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>Jugar solo</h2><div class="sub">T\xFA y dos bots contra otros equipos de bots.</div><div class="panel"><h3 style="margin-top:0">Tu estilo</h3>'+this.clsCards()+"<h3>Dificultad</h3>"+this.chips("diff",gr.map(function(r){return r.name}),e.diff)+"<h3>Equipos en el bosque</h3>"+this.chips("teams",["2","3","4"],e.teams,[2,3,4])+'<button class="btn pri" data-a="solo" style="margin-top:16px">\xA1Al bosque!</button></div></div>';else if(n==="mp"){let r=t.env||"app";s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>Multijugador</h2><div class="panel"><h3 style="margin-top:0">Tu nombre</h3><input id="fName" class="field" maxlength="12" value="'+Nt(e.name)+'" autocomplete="off" spellcheck="false">'+(r==="lan"?'<button class="btn gold" data-a="joinhere" style="margin-top:14px">Entrar a la sala de este Wi-Fi</button>':"")+'<h3>Unirse con c\xF3digo (internet)</h3><div class="row"><input id="fCode" class="field code" maxlength="5" placeholder="C\xD3DIGO" autocomplete="off" autocapitalize="characters" spellcheck="false" style="flex:1.6"><button class="btn sm pri" data-a="join" style="margin-top:0;height:48px">Entrar</button></div>'+(r==="app"?'<button class="btn sm" data-a="go" data-v="lan">Buscar sala en mi Wi-Fi</button>':"")+'<h3>Crear una sala</h3><div class="row"><button class="btn sm gold" data-a="host" data-v="net">Por internet</button>'+(r==="app"?'<button class="btn sm gold" data-a="host" data-v="lan">Wi-Fi local</button>':"")+'</div><div id="msg" class="msg'+(t.err?" err":"")+'">'+Nt(t.msg||"")+'</div></div><div class="sub" style="max-width:380px;margin-top:10px">'+(r==="app"?"Por internet: uno crea la sala y comparte el c\xF3digo. Wi-Fi local: todos en la misma red o en el hotspot de un celular; no gasta datos.":r==="lan"?"Est\xE1s conectado al celular que cre\xF3 la sala en este Wi-Fi. Tambi\xE9n puedes usar salas por internet con c\xF3digo.":"Uno crea la sala y comparte el c\xF3digo: sirve entre iPhone, Android y PC. Las salas de Wi-Fi local se crean desde la app de Android.")+"</div></div>"}else if(n==="lan"){let r="",o=t.found||[];for(let c=0;c<o.length;c++)r+='<button class="it" data-a="joinip" data-v="'+Nt(o[c].ip)+'"><span>Sala de '+Nt(o[c].name)+'</span><span style="color:var(--mut);font-size:12px">'+Nt(o[c].ip)+"</span></button>";s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>Wi-Fi local</h2><div class="sub">Con\xE9ctate al mismo Wi-Fi (o al hotspot) del celular que cre\xF3 la sala.</div><div class="panel"><h3 style="margin-top:0">Direcci\xF3n que muestra el anfitri\xF3n</h3><div class="row"><input id="fIp" class="field" placeholder="192.168.1.20" inputmode="decimal" autocomplete="off" style="flex:1.6;font-size:16px"><button class="btn sm pri" data-a="joinip" style="margin-top:0;height:48px">Entrar</button></div><h3>Salas encontradas en tu red</h3><div class="list">'+(r||'<div class="sub">'+(t.scanning?"Buscando\u2026":"Ninguna todav\xEDa.")+"</div>")+'</div><button class="btn sm" data-a="scan"'+(t.scanning?" disabled":"")+">"+(t.scanning?"Buscando\u2026":"Buscar otra vez")+'</button><div id="msg" class="msg'+(t.err?" err":"")+'">'+Nt(t.msg||"")+"</div></div></div>"}else if(n==="lobby"){let r=t.lobby,o="";for(let a=0;a<r.teams;a++){o+='<div class="tm" style="border-top-color:'+gt[a].css+'"><h4><span style="color:'+gt[a].css+'">'+gt[a].name+"</span><small>"+(a%2?an.luna:an.sol).replace("<svg",'<svg width="15" height="15"')+"</small></h4>";for(let l=0;l<3;l++){let h=null;for(let u=0;u<r.players.length;u++)r.players[u].team===a&&r.players[u].slot===l&&(h=r.players[u]);h?o+='<div class="slot'+(h.id===t.myId?" me":"")+'"><i class="d" style="background:'+kt[h.cls].css+'"></i><span>'+Nt(h.name)+(h.host?" \u2605":"")+"</span></div>":o+='<button class="slot bot" data-a="slot" data-v="'+a+","+l+'"><i class="d" style="background:#4a556e"></i><span>Bot \xB7 unirme</span></button>'}o+="</div>"}s='<div class="screen dim"><button class="back" data-a="leave">\u2039</button><h2>Sala de espera</h2><div class="panel">'+(r.mode==="net"?'<div class="codebox"><small>C\xF3digo de la sala</small><b>'+Nt(r.code)+"</b></div>":'<div class="codebox"><small>Sala Wi-Fi \xB7 direcci\xF3n del anfitri\xF3n</small><b class="ip">'+Nt(r.code)+'</b></div><div class="sub" style="margin-top:8px">\xBFiPhone o PC en este Wi-Fi? Sin instalar nada: abrir en el navegador<br><b style="color:var(--ink)">http://'+Nt(String(r.code).split("\xB7")[0].trim())+":47800</b></div>")+"<h3>Equipos \xB7 "+r.players.length+" jugador"+(r.players.length===1?"":"es")+'</h3><div class="teams">'+o+"</div><h3>Tu estilo</h3>"+this.clsCards()+(t.isHost?"<h3>Equipos</h3>"+this.chips("teams",["2","3","4"],r.teams,[2,3,4])+"<h3>Dificultad de los bots</h3>"+this.chips("diff",gr.map(function(a){return a.name}),r.diff)+'<button class="btn pri" data-a="start" style="margin-top:16px">Empezar partida</button>':'<div class="msg">Esperando a que el anfitri\xF3n empiece\u2026</div>')+'<div id="msg" class="msg'+(t.err?" err":"")+'">'+Nt(t.msg||"")+"</div></div></div>"}else if(n==="results"){let r=t.end,o=t.roster,c=t.myTeam,a=r.winner===c,l="";for(let u=0;u<r.rank.length;u++){let f=r.rank[u],d="",p=0;for(let y=0;y<o.length;y++)o[y].team===f&&(d+=(d?", ":"")+Nt(o[y].name),p+=r.stats[y][0]);l+='<div class="r" style="border-left-color:'+gt[f].css+'"><b>'+(u+1)+"\xBA</b><span>"+gt[f].name+(f===c?" (tu equipo)":"")+'<br><small style="font-weight:600;color:var(--mut)">'+d+"</small></span><small>"+p+" derribos</small></div>"}let h=r.stats[t.me];s='<div class="screen dim"><div class="big" style="color:'+(a?"var(--gold)":"#ff8f7a")+'">'+(a?"\xA1VICTORIA!":"Derrota")+'</div><div class="sub">'+(r.how==="deliver"?"El equipo "+gt[r.winner].name+" entreg\xF3 los dos pergaminos":"El equipo "+gt[r.winner].name+" fue el \xFAltimo en pie")+" \xB7 "+xm(r.time)+'</div><div class="panel"><div class="rank">'+l+"</div>"+(h?'<div class="note" style="min-height:0;margin-top:12px">T\xFA: <b>'+h[0]+"</b> derribos \xB7 <b>"+h[1]+"</b> de da\xF1o \xB7 <b>"+h[2]+"</b> compa\xF1eros levantados</div>":"")+(t.canAgain?'<button class="btn pri" data-a="again" style="margin-top:14px">'+(t.solo?"Jugar otra vez":"Volver a la sala")+"</button>":'<div class="msg">Esperando al anfitri\xF3n\u2026</div>')+'<button class="btn sm" data-a="leave">Salir al men\xFA</button></div></div>'}else n==="help"?s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>C\xF3mo jugar</h2><div class="panel">'+this.helpHtml()+"</div></div>":n==="opts"&&(s='<div class="screen dim"><button class="back" data-a="back">\u2039</button><h2>Opciones</h2><div class="panel"><h3 style="margin-top:0">Tu nombre</h3><input id="fName" class="field" maxlength="12" value="'+Nt(e.name)+'" autocomplete="off" spellcheck="false"><div style="height:8px"></div>'+this.toggles()+'</div><div class="sub" style="margin-top:14px">Senda Ninja \xB7 versi\xF3n '+Nt(t.ver||"1.0")+"</div></div>");this.overlay==="pause"?s+='<div class="screen dim" style="justify-content:center"><h2>Pausa</h2>'+(t.solo?"":'<div class="sub">La partida sigue para los dem\xE1s.</div>')+'<div class="panel">'+this.toggles()+'<button class="btn pri" data-a="resume" style="margin-top:14px">Continuar</button><button class="btn sm" data-a="ov" data-v="phelp">C\xF3mo jugar</button><button class="btn sm" data-a="leave">Salir de la partida</button></div></div>':this.overlay==="phelp"&&(s+='<div class="screen dim"><button class="back" data-a="ov" data-v="pause">\u2039</button><h2>C\xF3mo jugar</h2><div class="panel">'+this.helpHtml()+"</div></div>"),this.root.innerHTML=s}hudStart(e,t,n){this.g=e,this.roster=t,this.nTeams=n;let s=t[e.me];this.hud.classList.remove("hide"),We("bSpec").innerHTML=an.cls[s.cls]+"<em>"+Nt(kt[s.cls].spec)+"</em>",We("bSpec").style.color=kt[s.cls].css,We("bDash").innerHTML=an.dash+"<em>Esquiva</em>",We("bShur").innerHTML=an.shuriken+'<em id="shN">3</em>',We("bMelee").innerHTML=an.melee,this.lastSh=-1,this.lastAlive=null;let r="";for(let c=0;c<t.length;c++)t[c].team===s.team&&(r+='<div class="tp" id="tp'+c+'" style="border-left-color:'+kt[t[c].cls].css+'"><div class="n"><b>'+Nt(t[c].name)+(c===e.me?" (t\xFA)":"")+'</b><div class="hb"><i></i></div></div><span class="sc"></span></div>');We("team").innerHTML=r;let o="";for(let c=0;c<t.length;c++){let a=t[c].team===s.team;o+='<div class="lb '+(c===e.me?"me":a?"ally":"")+'" id="lb'+c+'"><div class="nm" style="color:'+gt[t[c].team].css+'">'+Nt(t[c].name)+'</div><div class="hb"><i></i></div><div class="st"></div></div>'}We("labels").innerHTML=o,this.lb=[];for(let c=0;c<t.length;c++){let a=We("lb"+c);this.lb.push({el:a,bar:a.querySelector(".hb i"),st:a.querySelector(".st"),hp:-1,txt:"",shown:!0})}We("dmg").innerHTML="",this.dmgPool=[];for(let c=0;c<18;c++){let a=document.createElement("div");a.className="dn",a.style.display="none",We("dmg").appendChild(a),this.dmgPool.push(a)}We("feed").innerHTML="",this.feed=[],We("banner").className="",this.bannerT=0,We("obj").innerHTML='<span class="s" id="oSol">'+an.sol+'</span><span class="s" id="oLuna">'+an.luna+'</span><span id="oTxt"></span>',this.hadBoth={},this.lastCount=-1,this.objective=null,this.hurtA=0,this.lastObj="",this.mapImg=this.makeMapImg(e.map),this.slow=0,this.mmT=0,["deliver","downed","stale","spect","count"].forEach(function(c){We(c).classList.add("hide")})}hudStop(){this.hud.classList.add("hide")}makeMapImg(e){let t=document.createElement("canvas");t.width=96,t.height=96;let n=t.getContext("2d"),s=n.createImageData(96,96),r={};r[xr]=[70,122,62],r[os]=[176,148,98],r[yi]=[46,98,50],r[jn]=[34,78,44],r[ri]=[120,126,136],r[oi]=[52,128,208],r[as]=[150,108,60],r[yr]=[160,166,176],r[_n]=[20,44,28],r[Bn]=[160,166,176];for(let o=0;o<9216;o++){let c=r[e.tiles[o]];s.data[o*4]=c[0],s.data[o*4+1]=c[1],s.data[o*4+2]=c[2],s.data[o*4+3]=255}return n.putImageData(s,0,0),t}banner(e,t,n,s){let r=We("banner");r.innerHTML=Nt(e)+(t?"<small>"+Nt(t)+"</small>":""),r.style.color=n||"#fff",r.className="on",this.bannerT=s||2.6}addFeed(e){let t=We("feed"),n=document.createElement("div");for(n.innerHTML=e,t.appendChild(n),this.feed.push({e:n,t:4.5});this.feed.length>4;){let s=this.feed.shift();s.e.parentNode&&t.removeChild(s.e)}}nm(e){let t=this.roster[e];return'<span style="color:'+gt[t.team].css+'">'+Nt(t.name)+"</span>"}dmg(e,t,n,s){let r=this.dmgPool[this.dmgI++%this.dmgPool.length];r.style.display="none",r.offsetWidth,r.className="dn"+(s?" "+s:""),r.textContent=n,r.style.transform="translate3d("+Math.round(e-8)+"px,"+Math.round(t)+"px,0)",r.style.display="block"}hudEvent(e,t,n){let s=this.g,r=s.me,o=s.myTeam,c=this.roster,a=e[0];if(a==="hit"){let l=t.ninjas[e[1]];return l&&!l.hidden&&(n.project(l.x,1.7,l.z,this._p),this._p.vis&&this.dmg(this._p.x+(Math.random()-.5)*16,this._p.y,"-"+e[2],e[1]===r?"me":"")),e[1]===r?(this.hurtA=Math.min(1,this.hurtA+.5),"hurt"):e[3]===4?null:"hit"}if(a==="heal"||a==="food"){let l=t.ninjas[e[1]],h=a==="heal"?e[2]:e[3];return l&&!l.hidden&&h>0&&(n.project(l.x,1.7,l.z,this._p),this._p.vis&&this.dmg(this._p.x,this._p.y,"+"+h,"heal")),a==="food"?"food":null}if(a==="down"){let l=e[2];return this.addFeed((l>=0?this.nm(l)+" derrib\xF3 a ":"La niebla derrib\xF3 a ")+this.nm(e[1])),l===r&&this.banner("\xA1Derribaste a "+c[e[1]].name+"!","","#ffcf4a",1.6),"down"}if(a==="out")return this.addFeed(this.nm(e[1])+" qued\xF3 fuera"),null;if(a==="rev")return e[1]===r&&this.banner("\xA1De pie otra vez!",c[e[2]].name+" te levant\xF3","#7dff9a",1.8),"revive";if(a==="resp")return e[1]===r&&this.banner("Reapareces en tu campamento","","#7dff9a",1.8),e[1]===r?"revive":null;if(a==="pick"){let l=c[e[1]],h=Yn[e[2]%2];return l.team===o?this.banner("\xA1Pergamino "+h.name+" conseguido!",l.name+" lo lleva",h.css,2.2):this.addFeed(this.nm(e[1])+" tom\xF3 el pergamino "+h.name),"pick"}if(a==="drop"){let l=c[e[1]],h=Yn[e[2]%2];return l.team===o&&this.banner("\xA1Perdimos el pergamino "+h.name+"!","Qued\xF3 en el suelo: recup\xE9ralo","#ff8f7a",2.4),"drop"}if(a==="tout")return e[1]===o?this.banner("Tu equipo fue eliminado","Puesto "+e[2]+"\xBA","#ff8f7a",4):this.banner("Equipo "+gt[e[1]].name+" eliminado","",gt[e[1]].css,2.4),"down";if(a==="zone")return e[1]===1&&e[2]===0?(this.banner("MUERTE S\xDABITA","Ya nadie reaparece \xB7 El santuario est\xE1 abierto","#ffcf4a",4),"gong"):e[1]===1?(this.banner("La niebla se cierra","Corre hacia el centro","#c79bff",2.6),"alarm"):null;if(a==="go")return this.banner("\xA1A pelear!","Consigue el pergamino que te falta","#fff",2.6),"go";if(a==="fx"){if(e[1]==="boom")return"boom";if(e[1]==="heal")return"heal";if(e[1]==="bram")return"bram";if(e[1]==="clink")return"clink"}return null}hudUpdate(e,t,n,s,r){let o=this.g,c=e.ninjas[o.me],a=o.myTeam,l=e.ninjas;for(let y=0;y<l.length;y++){let m=l[y],g=this.lb[y],S=m.st!==qt&&!m.hidden;if(S&&(t.project(m.x,m.st===nn?1.1:2.25,m.z,this._p),S=this._p.vis),S!==g.shown&&(g.shown=S,g.el.style.display=S?"block":"none"),!S)continue;g.el.style.transform="translate3d("+Math.round(this._p.x)+"px,"+Math.round(this._p.y-22)+"px,0)",m.hp!==g.hp&&(g.hp=m.hp,g.bar.style.width=Math.max(0,m.hp)+"%");let A="";m.st===nn&&(A=m.revP>.02?"Levantando "+Math.round(m.revP*100)+"%":"Ca\xEDdo "+Math.ceil(m.downT)+"s"),A!==g.txt&&(g.txt=A,g.st.textContent=A)}this.bannerT>0&&(this.bannerT-=n,this.bannerT<=0&&(We("banner").className=""));for(let y=this.feed.length-1;y>=0;y--){let m=this.feed[y];m.t-=n,m.t<=0&&(m.e.parentNode&&m.e.parentNode.removeChild(m.e),this.feed.splice(y,1))}this.hurtA>0&&(this.hurtA=Math.max(0,this.hurtA-n*1.8)),We("hurt").style.opacity=this.hurtA.toFixed(2);let h=e.cd,u=this.roster[o.me].cls,f=c.st===Ne&&e.phase===1;We("bSpec").style.setProperty("--cd",ym(h.spec/kt[u].cd)),We("bDash").style.setProperty("--cd",ym(h.dash/Y.DASH_CD)),We("bShur").style.setProperty("--cd",h.charges>=1?0:1-h.charges);let d=Math.floor(h.charges+.001);if(d!==this.lastSh){this.lastSh=d;let y=We("shN");y&&(y.textContent=d)}f!==this.lastAlive&&(this.lastAlive=f,We("btns").style.opacity=f?1:.35);let p=We("count");if(e.phase===0){let y=Math.ceil(e.count);if(y!==this.lastCount){this.lastCount=y,p.classList.remove("hide");let m=Yn[a%2],g=Yn[1-a%2];p.innerHTML=(y>3?"\xB7\xB7\xB7":y)+'<small>Equipo <b style="color:'+gt[a].css+'">'+gt[a].name+'</b><br>Tienen el pergamino <b style="color:'+m.css+'">'+m.name+'</b> \xB7 les falta el <b style="color:'+g.css+'">'+g.name+"</b></small>",y<=3&&y>0&&this.h.sound("beep")}}else this.lastCount!==-2&&(this.lastCount=-2,p.classList.add("hide"));this.slow-=n,this.slow<=0&&(this.slow=.2,this.slowUpdate(e,s,r)),this.mmT-=n,this.mmT<=0&&(this.mmT=.1,this.drawMini(e,s))}slowUpdate(e,t,n){let s=this.g,r=e.ninjas[s.me],o=s.myTeam,c=e.ninjas,a=e.zone,l=a.stage===0&&!a.shrinking;for(let E=0;E<c.length;E++){if(c[E].team!==o)continue;let C=We("tp"+E);if(!C)continue;let P=c[E];C.className="tp"+(P.st===nn?" down":P.st===qt?" out":""),C.querySelector(".hb i").style.width=(P.st===Ne?P.hp:P.st===nn?P.revP*100:0)+"%";let I="";for(let L=0;L<e.scrolls.length;L++)e.scrolls[L].carrier===E&&(I+=e.scrolls[L].kind===0?an.sol:an.luna);let O=C.querySelector(".sc");O.getAttribute("data-k")!==I.length+""&&(O.setAttribute("data-k",I.length+""),O.innerHTML=I,O.style.width=I?I.length>400?"30px":"15px":"0")}let h=We("phase");h.textContent=l?"CACER\xCDA":"MUERTE S\xDABITA",h.className=l?"":"sd",We("clock").textContent=a.stage>=5?"0:00":xm(a.timer),We("clockSub").textContent=l?"para la muerte s\xFAbita":a.stage>=5?"niebla total":a.shrinking?"la niebla se est\xE1 cerrando":"para que se cierre la niebla";let u="",f=0,d={};for(let E=0;E<this.nTeams;E++){let C=!0;for(let I=0;I<c.length;I++)c[I].team===E&&c[I].st!==qt&&(C=!1);C||f++,u+='<i style="background:'+gt[E].css+'" class="'+(C?"x":"")+'"></i>';let P=Kl(e,E);d[E]=P.sol&&P.luna,d[E]&&!this.hadBoth[E]&&e.phase===1&&(E===o?this.banner("\xA1Tienen los dos pergaminos!",l?"Prot\xE9janlos hasta que abra el santuario":"\xA1Al santuario!","#ffcf4a",3):(this.banner("\xA1"+gt[E].name+" tiene los dos pergaminos!",l?"Qu\xEDtenselos antes de la muerte s\xFAbita":"No los dejen llegar al santuario",gt[E].css,3),this.h.sound("alarm"))),this.hadBoth[E]=d[E]}We("alive").innerHTML=u;let p=Kl(e,o);We("oSol").className="s"+(p.sol?" on":""),We("oLuna").className="s"+(p.luna?" on":"");let y,m=null;if(p.sol&&p.luna)y=l?"Protege los dos pergaminos":"\xA1Ll\xE9valos al santuario!",m={x:48,z:48,color:16766826};else{let E=p.sol?1:p.luna?0:-1;y=E<0?"Sin pergaminos: qu\xEDtale uno a un rival":"Consigue el pergamino "+Yn[E].name;let C=1e9,P=e.ninjas[t]||r;for(let I=0;I<e.scrolls.length;I++){let O=e.scrolls[I];if(E>=0&&O.kind!==E||O.carrier>=0&&c[O.carrier].team===o)continue;let L=(O.x-P.x)*(O.x-P.x)+(O.z-P.z)*(O.z-P.z);L<C&&(C=L,m={x:O.x,z:O.z,color:Yn[O.kind].color,sc:O})}}y!==this.lastObj&&(this.lastObj=y,We("oTxt").textContent=y),this.objective=m;let g=-1,S=0;for(let E=0;E<e.deliver.length;E++)e.deliver[E]>S&&(S=e.deliver[E],g=E);let A=We("deliver");S>.01&&!e.end?(A.classList.remove("hide"),A.querySelector("span").textContent=g===o?"\xA1Entregando! No salgas del c\xEDrculo":"\xA1"+gt[g].name+" est\xE1 entregando! Entra al c\xEDrculo para frenarlo",A.querySelector("i").style.width=Math.round(S*100)+"%",A.querySelector("i").style.background=gt[g].css):A.classList.add("hide");let v=We("downed"),b=We("spect");r.st===nn?(v.classList.remove("hide"),v.innerHTML="\xA1Has ca\xEDdo!<small>"+(r.revP>.02?"Te est\xE1n levantando\u2026 "+Math.round(r.revP*100)+"%":l?"Reapareces en "+Math.ceil(r.downT)+" s (o antes si un compa\xF1ero te levanta)":"Un compa\xF1ero puede levantarte \xB7 "+Math.ceil(r.downT)+" s")+"</small>"):v.classList.add("hide"),r.st===qt&&!e.end?(b.classList.remove("hide"),b.textContent=t!==s.me&&e.ninjas[t]?"Est\xE1s fuera \xB7 Viendo a "+e.ninjas[t].name:"Est\xE1s fuera"):b.classList.add("hide");let M=r.x-48,_=r.z-48;We("vig").style.opacity=r.st===Ne&&M*M+_*_>a.r*a.r?1:0;let x=e.stale>2.5&&!e.end;We("stale").classList.toggle("hide",!x),We("ping").textContent=n!=null?n+" ms":""}drawMini(e,t){let n=We("mini"),s=n.getContext("2d"),r=n.width,o=r/96,c=this.g,a=c.myTeam,l=e.ninjas,h=e.zone;s.imageSmoothingEnabled=!1,s.drawImage(this.mapImg,0,0,r,r),s.fillStyle="rgba(120,50,200,0.5)",s.beginPath(),s.rect(0,0,r,r),s.arc(48*o,48*o,Math.max(.5,h.r*o),0,6.2832,!0),s.fill("evenodd"),h.to<h.r-.5&&(s.strokeStyle="rgba(255,255,255,0.8)",s.lineWidth=1.5,s.beginPath(),s.arc(48*o,48*o,Math.max(.5,h.to*o),0,6.2832),s.stroke()),s.strokeStyle="#ffd76a",s.lineWidth=2.5,s.beginPath(),s.arc(48*o,48*o,5,0,6.2832),s.stroke(),s.fillStyle="#7dff9a";for(let d=0;d<c.map.pickups.length;d++)if(e.food>>d&1){let p=c.map.pickups[d];s.fillRect(p.x*o-2,p.z*o-2,4,4)}for(let d=0;d<l.length;d++){let p=l[d];if(!(p.st===qt||d===c.me)){if(p.team!==a){if(p.hidden)continue;let y=!1;for(let m=0;m<l.length;m++){let g=l[m];if(!(g.team!==a||g.st===qt)&&(g.x-p.x)*(g.x-p.x)+(g.z-p.z)*(g.z-p.z)<(Y.VIEW+3)*(Y.VIEW+3)){y=!0;break}}if(!y)continue}s.fillStyle=gt[p.team].css,s.globalAlpha=p.st===nn?.5:1,s.beginPath(),s.arc(p.x*o,p.z*o,p.team===a?5:4.2,0,6.2832),s.fill(),p.team===a&&(s.strokeStyle="#fff",s.lineWidth=1.5,s.stroke()),s.globalAlpha=1}}let u=Date.now()%800<520;for(let d=0;d<e.scrolls.length;d++){let p=e.scrolls[d],y=p.x*o,m=p.z*o-(p.carrier>=0?9:0);s.fillStyle=Yn[p.kind].css,s.strokeStyle="#000",s.lineWidth=1.5,s.beginPath(),s.moveTo(y,m-6),s.lineTo(y+5,m),s.lineTo(y,m+6),s.lineTo(y-5,m),s.closePath(),(p.carrier>=0||u)&&(s.fill(),s.stroke())}let f=l[t]||l[c.me];f&&f.st!==qt&&(s.save(),s.translate(f.x*o,f.z*o),s.rotate(-f.f),s.fillStyle="#fff",s.strokeStyle="#000",s.lineWidth=1.5,s.beginPath(),s.moveTo(0,8),s.lineTo(5.5,-5),s.lineTo(0,-2),s.lineTo(-5.5,-5),s.closePath(),s.fill(),s.stroke(),s.restore())}};function ym(i){return i<0?0:i>1?1:i}var Ru=class{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){let e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){let e=[];for(let t of this._parts)e.push(t);return lS(e).buffer}};function lS(i){let e=0;for(let s of i)e+=s.byteLength;let t=new Uint8Array(e),n=0;for(let s of i){let r=new Uint8Array(s.buffer,s.byteOffset,s.byteLength);t.set(r,n),n+=s.byteLength}return t}function Lu(i){return new Pu(i).unpack()}function Du(i){let e=new Iu,t=e.pack(i);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}var Pu=class{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){let e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){let e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){let e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){let e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){let e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){let e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){let e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){let e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){let e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);let t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){let t=this.read(e),n=0,s="",r,o;for(;n<e;)r=t[n],r<160?(o=r,n++):(r^192)<32?(o=(r&31)<<6|t[n+1]&63,n+=2):(r^224)<16?(o=(r&15)<<12|(t[n+1]&63)<<6|t[n+2]&63,n+=3):(o=(r&7)<<18|(t[n+1]&63)<<12|(t[n+2]&63)<<6|t[n+3]&63,n+=4),s+=String.fromCodePoint(o);return this.index+=e,s}unpack_array(e){let t=new Array(e);for(let n=0;n<e;n++)t[n]=this.unpack();return t}unpack_map(e){let t={};for(let n=0;n<e;n++){let s=this.unpack();t[s]=this.unpack()}return t}unpack_float(){let e=this.unpack_uint32(),t=e>>31,n=(e>>23&255)-127,s=e&8388607|8388608;return(t===0?1:-1)*s*2**(n-23)}unpack_double(){let e=this.unpack_uint32(),t=this.unpack_uint32(),n=e>>31,s=(e>>20&2047)-1023,o=(e&1048575|1048576)*2**(s-20)+t*2**(s-52);return(n===0?1:-1)*o}read(e){let t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}},Iu=class{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{let t=e.constructor;if(e instanceof Array){let n=this.pack_array(e);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){let n=e;this.pack_bin(new Uint8Array(n.buffer,n.byteOffset,n.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(n=>{this.pack_bin(new Uint8Array(n)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){let n=this.pack_object(e);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){let t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){let t=this._textEncoder.encode(e),n=t.length;if(n<=15)this.pack_uint8(176+n);else if(n<=65535)this._bufferBuilder.append(216),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(n);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){let t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");let n=s=>{if(s<t){let r=this.pack(e[s]);return r instanceof Promise?r.then(()=>n(s+1)):n(s+1)}};return n(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);let n=Math.floor(Math.log(e)/Math.LN2),s=e/2**n-1,r=Math.floor(s*2**52),o=2**32,c=t<<31|n+1023<<20|r/o&1048575,a=r%o;this._bufferBuilder.append(203),this.pack_int32(c),this.pack_int32(a)}pack_object(e){let t=Object.keys(e),n=t.length;if(n<=15)this.pack_uint8(128+n);else if(n<=65535)this._bufferBuilder.append(222),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(n);else throw new Error("Invalid length");let s=r=>{if(r<t.length){let o=t[r];if(e.hasOwnProperty(o)){this.pack(o);let c=this.pack(e[o]);if(c instanceof Promise)return c.then(()=>s(r+1))}return s(r+1)}};return s(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){let t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){let t=e/4294967296,n=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){let t=Math.floor(e/4294967296),n=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}constructor(){this._bufferBuilder=new Ru,this._textEncoder=new TextEncoder}};var Sm=!0,Mm=!0;function hr(i,e,t){let n=i.match(e);return n&&n.length>=t&&parseFloat(n[t],10)}function mi(i,e,t){if(!i.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){wo("Unable to polyfill events");return}let s=i.RTCPeerConnection.prototype,r=s.addEventListener;s.addEventListener=function(c,a){if(c!==e)return r.apply(this,arguments);let l=h=>{let u=t(h);u&&(a.handleEvent?a.handleEvent(u):a(u))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(a,l),r.apply(this,[c,l])};let o=s.removeEventListener;s.removeEventListener=function(c,a){if(c!==e||!this._eventMap||!this._eventMap[e])return o.apply(this,arguments);if(!this._eventMap[e].has(a))return o.apply(this,arguments);let l=this._eventMap[e].get(a);return this._eventMap[e].delete(a),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[c,l])},Object.defineProperty(s,"on"+e,{get(){return this["_on"+e]},set(c){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),c&&this.addEventListener(e,this["_on"+e]=c)},enumerable:!0,configurable:!0})}function bm(i){return typeof i!="boolean"?new Error("Argument type: "+typeof i+". Please use a boolean."):(Sm=i,i?"adapter.js logging disabled":"adapter.js logging enabled")}function Tm(i){return typeof i!="boolean"?new Error("Argument type: "+typeof i+". Please use a boolean."):(Mm=!i,"adapter.js deprecation warnings "+(i?"disabled":"enabled"))}function wo(){if(typeof window=="object"){if(Sm)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function ur(i,e){Mm&&console.warn(i+" is deprecated, please use "+e+" instead.")}function Em(i){let e={browser:null,version:null};if(typeof i>"u"||!i.navigator||!i.navigator.userAgent)return e.browser="Not a browser.",e;let{navigator:t}=i;if(t.userAgentData&&t.userAgentData.brands){let n=t.userAgentData.brands.find(s=>s.brand==="Chromium");if(n){let s=parseInt(n.version,10);if(s>=90)return{browser:"chrome",version:s}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(hr(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||i.isSecureContext===!1&&i.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(hr(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(i.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(hr(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=i.RTCRtpTransceiver&&"currentDirection"in i.RTCRtpTransceiver.prototype,e._safariVersion=hr(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function vm(i){return Object.prototype.toString.call(i)==="[object Object]"}function Uu(i){return vm(i)?Object.keys(i).reduce(function(e,t){let n=vm(i[t]),s=n?Uu(i[t]):i[t],r=n&&!Object.keys(s).length;return s===void 0||r?e:Object.assign(e,{[t]:s})},{}):i}function Nu(i,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(n=>{n.endsWith("Id")?Nu(i,i.get(e[n]),t):n.endsWith("Ids")&&e[n].forEach(s=>{Nu(i,i.get(s),t)})}))}function Ou(i,e,t){let n=t?"outbound-rtp":"inbound-rtp",s=new Map;if(e===null)return s;let r=[];return i.forEach(o=>{o.type==="track"&&o.trackIdentifier===e.id&&r.push(o)}),r.forEach(o=>{i.forEach(c=>{c.type===n&&c.trackId===o.id&&Nu(i,c,s)})}),s}var gl={};Wo(gl,{fixNegotiationNeeded:()=>Gu,shimAddTrackRemoveTrack:()=>Hu,shimAddTrackRemoveTrackWithNative:()=>wm,shimGetSendersWithDtmf:()=>ku,shimGetUserMedia:()=>pl,shimMediaStream:()=>Fu,shimOnTrack:()=>Bu,shimPeerConnection:()=>ml,shimSenderReceiverGetStats:()=>zu});var Am=wo;function pl(i,e){if(e.version>=64)return;let t=i&&i.navigator;if(!t.mediaDevices)return;let n=function(c){if(typeof c!="object"||c.mandatory||c.optional)return c;let a={};return Object.keys(c).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;let h=typeof c[l]=="object"?c[l]:{ideal:c[l]};h.exact!==void 0&&typeof h.exact=="number"&&(h.min=h.max=h.exact);let u=function(f,d){return f?f+d.charAt(0).toUpperCase()+d.slice(1):d==="deviceId"?"sourceId":d};if(h.ideal!==void 0){a.optional=a.optional||[];let f={};typeof h.ideal=="number"?(f[u("min",l)]=h.ideal,a.optional.push(f),f={},f[u("max",l)]=h.ideal,a.optional.push(f)):(f[u("",l)]=h.ideal,a.optional.push(f))}h.exact!==void 0&&typeof h.exact!="number"?(a.mandatory=a.mandatory||{},a.mandatory[u("",l)]=h.exact):["min","max"].forEach(f=>{h[f]!==void 0&&(a.mandatory=a.mandatory||{},a.mandatory[u(f,l)]=h[f])})}),c.advanced&&(a.optional=(a.optional||[]).concat(c.advanced)),a},s=function(c,a){if(e.version>=61)return a(c);if(c=JSON.parse(JSON.stringify(c)),c&&typeof c.audio=="object"){let l=function(h,u,f){u in h&&!(f in h)&&(h[f]=h[u],delete h[u])};c=JSON.parse(JSON.stringify(c)),l(c.audio,"autoGainControl","googAutoGainControl"),l(c.audio,"noiseSuppression","googNoiseSuppression"),c.audio=n(c.audio)}if(c&&typeof c.video=="object"){let l=c.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});let h=e.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!h)){delete c.video.facingMode;let u;if(l.exact==="environment"||l.ideal==="environment"?u=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(u=["front"]),u)return t.mediaDevices.enumerateDevices().then(f=>{f=f.filter(p=>p.kind==="videoinput");let d=f.find(p=>u.some(y=>p.label.toLowerCase().includes(y)));return!d&&f.length&&u.includes("back")&&(d=f[f.length-1]),d&&(c.video.deviceId=l.exact?{exact:d.deviceId}:{ideal:d.deviceId}),c.video=n(c.video),Am("chrome: "+JSON.stringify(c)),a(c)})}c.video=n(c.video)}return Am("chrome: "+JSON.stringify(c)),a(c)},r=function(c){return e.version>=64?c:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[c.name]||c.name,message:c.message,constraint:c.constraint||c.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(c,a,l){s(c,h=>{t.webkitGetUserMedia(h,a,u=>{l&&l(r(u))})})};if(t.getUserMedia=o.bind(t),t.mediaDevices.getUserMedia){let c=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(a){return s(a,l=>c(l).then(h=>{if(l.audio&&!h.getAudioTracks().length||l.video&&!h.getVideoTracks().length)throw h.getTracks().forEach(u=>{u.stop()}),new DOMException("","NotFoundError");return h},h=>Promise.reject(r(h))))}}}function Fu(i){i.MediaStream=i.MediaStream||i.webkitMediaStream}function Bu(i,e){if(!(e.version>102))if(typeof i=="object"&&i.RTCPeerConnection&&!("ontrack"in i.RTCPeerConnection.prototype)){Object.defineProperty(i.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(n){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=n)},enumerable:!0,configurable:!0});let t=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=s=>{s.stream.addEventListener("addtrack",r=>{let o;i.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(a=>a.track&&a.track.id===r.track.id):o={track:r.track};let c=new Event("track");c.track=r.track,c.receiver=o,c.transceiver={receiver:o},c.streams=[s.stream],this.dispatchEvent(c)}),s.stream.getTracks().forEach(r=>{let o;i.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(a=>a.track&&a.track.id===r.id):o={track:r};let c=new Event("track");c.track=r,c.receiver=o,c.transceiver={receiver:o},c.streams=[s.stream],this.dispatchEvent(c)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else mi(i,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function ku(i){if(typeof i=="object"&&i.RTCPeerConnection&&!("getSenders"in i.RTCPeerConnection.prototype)&&"createDTMFSender"in i.RTCPeerConnection.prototype){let e=function(s,r){return{track:r,get dtmf(){return this._dtmf===void 0&&(r.kind==="audio"?this._dtmf=s.createDTMFSender(r):this._dtmf=null),this._dtmf},_pc:s}};if(!i.RTCPeerConnection.prototype.getSenders){i.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};let s=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addTrack=function(c,a){let l=s.apply(this,arguments);return l||(l=e(this,c),this._senders.push(l)),l};let r=i.RTCPeerConnection.prototype.removeTrack;i.RTCPeerConnection.prototype.removeTrack=function(c){r.apply(this,arguments);let a=this._senders.indexOf(c);a!==-1&&this._senders.splice(a,1)}}let t=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(r){this._senders=this._senders||[],t.apply(this,[r]),r.getTracks().forEach(o=>{this._senders.push(e(this,o))})};let n=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(r){this._senders=this._senders||[],n.apply(this,[r]),r.getTracks().forEach(o=>{let c=this._senders.find(a=>a.track===o);c&&this._senders.splice(this._senders.indexOf(c),1)})}}else if(typeof i=="object"&&i.RTCPeerConnection&&"getSenders"in i.RTCPeerConnection.prototype&&"createDTMFSender"in i.RTCPeerConnection.prototype&&i.RTCRtpSender&&!("dtmf"in i.RTCRtpSender.prototype)){let e=i.RTCPeerConnection.prototype.getSenders;i.RTCPeerConnection.prototype.getSenders=function(){let n=e.apply(this,[]);return n.forEach(s=>s._pc=this),n},Object.defineProperty(i.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function zu(i,e){if(e.version>=67||!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender&&i.RTCRtpReceiver))return;if(!("getStats"in i.RTCRtpSender.prototype)){let n=i.RTCPeerConnection.prototype.getSenders;n&&(i.RTCPeerConnection.prototype.getSenders=function(){let o=n.apply(this,[]);return o.forEach(c=>c._pc=this),o});let s=i.RTCPeerConnection.prototype.addTrack;s&&(i.RTCPeerConnection.prototype.addTrack=function(){let o=s.apply(this,arguments);return o._pc=this,o}),i.RTCRtpSender.prototype.getStats=function(){let o=this;return this._pc.getStats().then(c=>Ou(c,o.track,!0))}}if(!("getStats"in i.RTCRtpReceiver.prototype)){let n=i.RTCPeerConnection.prototype.getReceivers;n&&(i.RTCPeerConnection.prototype.getReceivers=function(){let r=n.apply(this,[]);return r.forEach(o=>o._pc=this),r}),mi(i,"track",s=>(s.receiver._pc=s.srcElement,s)),i.RTCRtpReceiver.prototype.getStats=function(){let r=this;return this._pc.getStats().then(o=>Ou(o,r.track,!1))}}if(!("getStats"in i.RTCRtpSender.prototype&&"getStats"in i.RTCRtpReceiver.prototype))return;let t=i.RTCPeerConnection.prototype.getStats;i.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof i.MediaStreamTrack){let s=arguments[0],r,o,c;return this.getSenders().forEach(a=>{a.track===s&&(r?c=!0:r=a)}),this.getReceivers().forEach(a=>(a.track===s&&(o?c=!0:o=a),a.track===s)),c||r&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):r?r.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function wm(i){i.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};let e=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addTrack=function(o,c){if(!c)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};let a=e.apply(this,arguments);return this._shimmedLocalStreams[c.id]?this._shimmedLocalStreams[c.id].indexOf(a)===-1&&this._shimmedLocalStreams[c.id].push(a):this._shimmedLocalStreams[c.id]=[c,a],a};let t=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(l=>{if(this.getSenders().find(u=>u.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});let c=this.getSenders();t.apply(this,arguments);let a=this.getSenders().filter(l=>c.indexOf(l)===-1);this._shimmedLocalStreams[o.id]=[o].concat(a)};let n=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],n.apply(this,arguments)};let s=i.RTCPeerConnection.prototype.removeTrack;i.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(c=>{let a=this._shimmedLocalStreams[c].indexOf(o);a!==-1&&this._shimmedLocalStreams[c].splice(a,1),this._shimmedLocalStreams[c].length===1&&delete this._shimmedLocalStreams[c]}),s.apply(this,arguments)}}function Hu(i,e){if(!i.RTCPeerConnection)return;if(i.RTCPeerConnection.prototype.addTrack&&e.version>=65)return wm(i);let t=i.RTCPeerConnection.prototype.getLocalStreams;i.RTCPeerConnection.prototype.getLocalStreams=function(){let h=t.apply(this);return this._reverseStreams=this._reverseStreams||{},h.map(u=>this._reverseStreams[u.id])};let n=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(h){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},h.getTracks().forEach(u=>{if(this.getSenders().find(d=>d.track===u))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[h.id]){let u=new i.MediaStream(h.getTracks());this._streams[h.id]=u,this._reverseStreams[u.id]=h,h=u}n.apply(this,[h])};let s=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(h){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},s.apply(this,[this._streams[h.id]||h]),delete this._reverseStreams[this._streams[h.id]?this._streams[h.id].id:h.id],delete this._streams[h.id]},i.RTCPeerConnection.prototype.addTrack=function(h,u){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");let f=[].slice.call(arguments,1);if(f.length!==1||!f[0].getTracks().find(y=>y===h))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(y=>y.track===h))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};let p=this._streams[u.id];if(p)p.addTrack(h),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{let y=new i.MediaStream([h]);this._streams[u.id]=y,this._reverseStreams[y.id]=u,this.addStream(y)}return this.getSenders().find(y=>y.track===h)};function r(l,h){let u=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(f=>{let d=l._reverseStreams[f],p=l._streams[d.id];u=u.replace(new RegExp(p.id,"g"),d.id)}),new RTCSessionDescription({type:h.type,sdp:u})}function o(l,h){let u=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(f=>{let d=l._reverseStreams[f],p=l._streams[d.id];u=u.replace(new RegExp(d.id,"g"),p.id)}),new RTCSessionDescription({type:h.type,sdp:u})}["createOffer","createAnswer"].forEach(function(l){let h=i.RTCPeerConnection.prototype[l],u={[l](){let f=arguments;return arguments.length&&typeof arguments[0]=="function"?h.apply(this,[p=>{let y=r(this,p);f[0].apply(null,[y])},p=>{f[1]&&f[1].apply(null,p)},arguments[2]]):h.apply(this,arguments).then(p=>r(this,p))}};i.RTCPeerConnection.prototype[l]=u[l]});let c=i.RTCPeerConnection.prototype.setLocalDescription;i.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?c.apply(this,arguments):(arguments[0]=o(this,arguments[0]),c.apply(this,arguments))};let a=Object.getOwnPropertyDescriptor(i.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(i.RTCPeerConnection.prototype,"localDescription",{get(){let l=a.get.apply(this);return l.type===""?l:r(this,l)}}),i.RTCPeerConnection.prototype.removeTrack=function(h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!h._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(h._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let f;Object.keys(this._streams).forEach(d=>{this._streams[d].getTracks().find(y=>h.track===y)&&(f=this._streams[d])}),f&&(f.getTracks().length===1?this.removeStream(this._reverseStreams[f.id]):f.removeTrack(h.track),this.dispatchEvent(new Event("negotiationneeded")))}}function ml(i,e){!i.RTCPeerConnection&&i.webkitRTCPeerConnection&&(i.RTCPeerConnection=i.webkitRTCPeerConnection),i.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let n=i.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?i.RTCIceCandidate:i.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};i.RTCPeerConnection.prototype[t]=s[t]})}function Gu(i,e){e.version>102||mi(i,"negotiationneeded",t=>{let n=t.target;if(!((e.version<72||n.getConfiguration&&n.getConfiguration().sdpSemantics==="plan-b")&&n.signalingState!=="stable"))return t})}var yl={};Wo(yl,{shimAddTransceiver:()=>Ju,shimCreateAnswer:()=>Ku,shimCreateOffer:()=>$u,shimGetDisplayMedia:()=>Cm,shimGetParameters:()=>Zu,shimGetStats:()=>Wu,shimGetUserMedia:()=>_l,shimOnTrack:()=>Vu,shimPeerConnection:()=>xl,shimRTCDataChannel:()=>ju,shimReceiverGetStats:()=>qu,shimRemoveStream:()=>Yu,shimSenderGetStats:()=>Xu});function _l(i,e){let t=i&&i.navigator;if(!t.mediaDevices)return;let n=i&&i.MediaStreamTrack;if(t.getUserMedia=function(s,r,o){ur("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(s).then(r,o)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){let s=function(o,c,a){c in o&&!(a in o)&&(o[a]=o[c],delete o[c])},r=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),s(o.audio,"autoGainControl","mozAutoGainControl"),s(o.audio,"noiseSuppression","mozNoiseSuppression")),r(o)},n&&n.prototype.getSettings){let o=n.prototype.getSettings;n.prototype.getSettings=function(){let c=o.apply(this,arguments);return s(c,"mozAutoGainControl","autoGainControl"),s(c,"mozNoiseSuppression","noiseSuppression"),c}}if(n&&n.prototype.applyConstraints){let o=n.prototype.applyConstraints;n.prototype.applyConstraints=function(c){return this.kind==="audio"&&typeof c=="object"&&(c=JSON.parse(JSON.stringify(c)),s(c,"autoGainControl","mozAutoGainControl"),s(c,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[c])}}}}function Cm(i,e){i.navigator.mediaDevices&&(i.navigator.mediaDevices&&"getDisplayMedia"in i.navigator.mediaDevices||(i.navigator.mediaDevices.getDisplayMedia=function(n){if(!(n&&n.video)){let s=new DOMException("getDisplayMedia without video constraints is undefined");return s.name="NotFoundError",s.code=8,Promise.reject(s)}return n.video===!0?n.video={mediaSource:e}:n.video.mediaSource=e,i.navigator.mediaDevices.getUserMedia(n)}))}function Vu(i){typeof i=="object"&&i.RTCTrackEvent&&"receiver"in i.RTCTrackEvent.prototype&&!("transceiver"in i.RTCTrackEvent.prototype)&&Object.defineProperty(i.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function xl(i,e){typeof i!="object"||!(i.RTCPeerConnection||i.mozRTCPeerConnection)||(!i.RTCPeerConnection&&i.mozRTCPeerConnection&&(i.RTCPeerConnection=i.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let n=i.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?i.RTCIceCandidate:i.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};i.RTCPeerConnection.prototype[t]=s[t]}))}function Wu(i,e){if(typeof i!="object"||!(i.RTCPeerConnection||i.mozRTCPeerConnection)||e.version>=151)return;let t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},n=i.RTCPeerConnection.prototype.getStats;i.RTCPeerConnection.prototype.getStats=function(){let[r,o,c]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):n.apply(this,[r||null]).then(a=>{if(e.version<53&&!o)try{a.forEach(l=>{l.type=t[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;a.forEach((h,u)=>{a.set(u,Object.assign({},h,{type:t[h.type]||h.type}))})}return a}).then(o,c)}}function Xu(i){if(!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender)||i.RTCRtpSender&&"getStats"in i.RTCRtpSender.prototype)return;let e=i.RTCPeerConnection.prototype.getSenders;e&&(i.RTCPeerConnection.prototype.getSenders=function(){let s=e.apply(this,[]);return s.forEach(r=>r._pc=this),s});let t=i.RTCPeerConnection.prototype.addTrack;t&&(i.RTCPeerConnection.prototype.addTrack=function(){let s=t.apply(this,arguments);return s._pc=this,s}),i.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function qu(i){if(!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender)||i.RTCRtpSender&&"getStats"in i.RTCRtpReceiver.prototype)return;let e=i.RTCPeerConnection.prototype.getReceivers;e&&(i.RTCPeerConnection.prototype.getReceivers=function(){let n=e.apply(this,[]);return n.forEach(s=>s._pc=this),n}),mi(i,"track",t=>(t.receiver._pc=t.srcElement,t)),i.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function Yu(i){!i.RTCPeerConnection||"removeStream"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.removeStream=function(t){ur("removeStream","removeTrack"),this.getSenders().forEach(n=>{n.track&&t.getTracks().includes(n.track)&&this.removeTrack(n)})})}function ju(i){i.DataChannel&&!i.RTCDataChannel&&(i.RTCDataChannel=i.DataChannel)}function Ju(i,e){if(!(typeof i=="object"&&i.RTCPeerConnection)||e.version>=110)return;let t=i.RTCPeerConnection.prototype.addTransceiver;t&&(i.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let s=arguments[1]&&arguments[1].sendEncodings;s===void 0&&(s=[]),s=[...s];let r=s.length>0;r&&s.forEach(c=>{if("rid"in c&&!/^[a-z0-9]{0,16}$/i.test(c.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in c&&!(parseFloat(c.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in c&&!(parseFloat(c.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});let o=t.apply(this,arguments);if(r){let{sender:c}=o,a=c.getParameters();(!("encodings"in a)||a.encodings.length===1&&Object.keys(a.encodings[0]).length===0)&&(a.encodings=s,c.sendEncodings=s,this.setParametersPromises.push(c.setParameters(a).then(()=>{delete c.sendEncodings}).catch(()=>{delete c.sendEncodings})))}return o})}function Zu(i,e){if(!(typeof i=="object"&&i.RTCRtpSender)||e.version>=110)return;let t=i.RTCRtpSender.prototype.getParameters;t&&(i.RTCRtpSender.prototype.getParameters=function(){let s=t.apply(this,arguments);return"encodings"in s||(s.encodings=[].concat(this.sendEncodings||[{}])),s})}function $u(i,e){if(!(typeof i=="object"&&i.RTCPeerConnection)||e.version>=110)return;let t=i.RTCPeerConnection.prototype.createOffer;i.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function Ku(i,e){if(!(typeof i=="object"&&i.RTCPeerConnection)||e.version>=110)return;let t=i.RTCPeerConnection.prototype.createAnswer;i.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}var vl={};Wo(vl,{shimAudioContext:()=>af,shimCallbacksAPI:()=>tf,shimConstraints:()=>Rm,shimCreateOfferLegacy:()=>of,shimGetUserMedia:()=>nf,shimLocalStreamsAPI:()=>Qu,shimRTCIceServerUrls:()=>sf,shimRemoteStreamsAPI:()=>ef,shimTrackEventTransceiver:()=>rf});function Qu(i){if(!(typeof i!="object"||!i.RTCPeerConnection)){if("getLocalStreams"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in i.RTCPeerConnection.prototype)){let e=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addStream=function(n){this._localStreams||(this._localStreams=[]),this._localStreams.includes(n)||this._localStreams.push(n),n.getAudioTracks().forEach(s=>e.call(this,s,n)),n.getVideoTracks().forEach(s=>e.call(this,s,n))},i.RTCPeerConnection.prototype.addTrack=function(n,...s){return s&&s.forEach(r=>{this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]}),e.apply(this,arguments)}}"removeStream"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);let n=this._localStreams.indexOf(t);if(n===-1)return;this._localStreams.splice(n,1);let s=t.getTracks();this.getSenders().forEach(r=>{s.includes(r.track)&&this.removeTrack(r)})})}}function ef(i){if(!(typeof i!="object"||!i.RTCPeerConnection)&&("getRemoteStreams"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in i.RTCPeerConnection.prototype))){Object.defineProperty(i.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=n=>{n.streams.forEach(s=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(s))return;this._remoteStreams.push(s);let r=new Event("addstream");r.stream=s,this.dispatchEvent(r)})})}});let e=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){let n=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(s){s.streams.forEach(r=>{if(n._remoteStreams||(n._remoteStreams=[]),n._remoteStreams.indexOf(r)>=0)return;n._remoteStreams.push(r);let o=new Event("addstream");o.stream=r,n.dispatchEvent(o)})}),e.apply(n,arguments)}}}function tf(i){if(typeof i!="object"||!i.RTCPeerConnection)return;let e=i.RTCPeerConnection.prototype,t=e.createOffer,n=e.createAnswer,s=e.setLocalDescription,r=e.setRemoteDescription,o=e.addIceCandidate;e.createOffer=function(l,h){let u=arguments.length>=2?arguments[2]:arguments[0],f=t.apply(this,[u]);return h?(f.then(l,h),Promise.resolve()):f},e.createAnswer=function(l,h){let u=arguments.length>=2?arguments[2]:arguments[0],f=n.apply(this,[u]);return h?(f.then(l,h),Promise.resolve()):f};let c=function(a,l,h){let u=s.apply(this,[a]);return h?(u.then(l,h),Promise.resolve()):u};e.setLocalDescription=c,c=function(a,l,h){let u=r.apply(this,[a]);return h?(u.then(l,h),Promise.resolve()):u},e.setRemoteDescription=c,c=function(a,l,h){let u=o.apply(this,[a]);return h?(u.then(l,h),Promise.resolve()):u},e.addIceCandidate=c}function nf(i){let e=i&&i.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){let t=e.mediaDevices,n=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=s=>n(Rm(s))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=(function(n,s,r){e.mediaDevices.getUserMedia(n).then(s,r)}).bind(e))}function Rm(i){return i&&i.video!==void 0?Object.assign({},i,{video:Uu(i.video)}):i}function sf(i){if(!i.RTCPeerConnection)return;let e=i.RTCPeerConnection;i.RTCPeerConnection=function(n,s){if(n&&n.iceServers){let r=[];for(let o=0;o<n.iceServers.length;o++){let c=n.iceServers[o];c.urls===void 0&&c.url?(ur("RTCIceServer.url","RTCIceServer.urls"),c=JSON.parse(JSON.stringify(c)),c.urls=c.url,delete c.url,r.push(c)):r.push(n.iceServers[o])}n.iceServers=r}return new e(n,s)},i.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(i.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function rf(i){typeof i=="object"&&i.RTCTrackEvent&&"receiver"in i.RTCTrackEvent.prototype&&!("transceiver"in i.RTCTrackEvent.prototype)&&Object.defineProperty(i.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function of(i){let e=i.RTCPeerConnection.prototype.createOffer;i.RTCPeerConnection.prototype.createOffer=function(n){if(n){typeof n.offerToReceiveAudio<"u"&&(n.offerToReceiveAudio=!!n.offerToReceiveAudio);let s=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");n.offerToReceiveAudio===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):n.offerToReceiveAudio===!0&&!s&&this.addTransceiver("audio",{direction:"recvonly"}),typeof n.offerToReceiveVideo<"u"&&(n.offerToReceiveVideo=!!n.offerToReceiveVideo);let r=this.getTransceivers().find(o=>o.receiver.track.kind==="video");n.offerToReceiveVideo===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):n.offerToReceiveVideo===!0&&!r&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function af(i){typeof i!="object"||i.AudioContext||(i.AudioContext=i.webkitAudioContext)}var hf={};Wo(hf,{removeExtmapAllowMixed:()=>bl,shimAddIceCandidateNullOrEmpty:()=>Io,shimConnectionState:()=>Ml,shimMaxMessageSize:()=>Ro,shimParameterlessSetLocalDescription:()=>Lo,shimRTCIceCandidate:()=>Co,shimRTCIceCandidateRelayProtocol:()=>Sl,shimSendThrowTypeError:()=>Po});var fr=Vf(lf());function Co(i){if(!i.RTCIceCandidate||i.RTCIceCandidate&&"foundation"in i.RTCIceCandidate.prototype)return;let e=i.RTCIceCandidate;i.RTCIceCandidate=function(n){if(typeof n=="object"&&n.candidate&&n.candidate.indexOf("a=")===0&&(n=JSON.parse(JSON.stringify(n)),n.candidate=n.candidate.substring(2)),n.candidate&&n.candidate.length){let s=new e(n),r=fr.default.parseCandidate(n.candidate);for(let o in r)o in s||Object.defineProperty(s,o,{value:r[o]});return s.toJSON=function(){return{candidate:s.candidate,sdpMid:s.sdpMid,sdpMLineIndex:s.sdpMLineIndex,usernameFragment:s.usernameFragment}},s}return new e(n)},i.RTCIceCandidate.prototype=e.prototype,mi(i,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new i.RTCIceCandidate(t.candidate),writable:"false"}),t))}function Sl(i){!i.RTCIceCandidate||i.RTCIceCandidate&&"relayProtocol"in i.RTCIceCandidate.prototype||mi(i,"icecandidate",e=>{if(e.candidate){let t=fr.default.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function Ro(i,e){if(!i.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in i.RTCPeerConnection.prototype||Object.defineProperty(i.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});let t=function(c){if(!c||!c.sdp)return!1;let a=fr.default.splitSections(c.sdp);return a.shift(),a.some(l=>{let h=fr.default.parseMLine(l);return h&&h.kind==="application"&&h.protocol.indexOf("SCTP")!==-1})},n=function(c){let a=c.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(a===null||a.length<2)return-1;let l=parseInt(a[1],10);return l!==l?-1:l},s=function(c){let a=65536;return e.browser==="firefox"&&(e.version<57?c===-1?a=16384:a=2147483637:e.version<60?a=e.version===57?65535:65536:a=2147483637),a},r=function(c,a){let l=65536;e.browser==="firefox"&&e.version===57&&(l=65535);let h=fr.default.matchPrefix(c.sdp,"a=max-message-size:");return h.length>0?l=parseInt(h[0].substring(19),10):e.browser==="firefox"&&a!==-1&&(l=2147483637),l},o=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){let{sdpSemantics:a}=this.getConfiguration();a==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){let a=n(arguments[0]),l=s(a),h=r(arguments[0],a),u;l===0&&h===0?u=Number.POSITIVE_INFINITY:l===0||h===0?u=Math.max(l,h):u=Math.min(l,h);let f={};Object.defineProperty(f,"maxMessageSize",{get(){return u}}),this._sctp=f}return o.apply(this,arguments)}}function Po(i,e){if(!(i.RTCPeerConnection&&"createDataChannel"in i.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(s,r){let o=s.send;s.send=function(){let a=arguments[0],l=a.length||a.size||a.byteLength;if(s.readyState==="open"&&r.sctp&&l>r.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+r.sctp.maxMessageSize+" bytes)");return o.apply(s,arguments)}}let n=i.RTCPeerConnection.prototype.createDataChannel;i.RTCPeerConnection.prototype.createDataChannel=function(){let r=n.apply(this,arguments);return t(r,this),r},mi(i,"datachannel",s=>(t(s.channel,s.target),s))}function Ml(i){if(!i.RTCPeerConnection||"connectionState"in i.RTCPeerConnection.prototype)return;let e=i.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{let n=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=s=>{let r=s.target;if(r._lastConnectionState!==r.connectionState){r._lastConnectionState=r.connectionState;let o=new Event("connectionstatechange",s);r.dispatchEvent(o)}return s},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),n.apply(this,arguments)}})}function bl(i,e){if(!i.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;let t=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(s){if(s&&s.sdp&&s.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){let r=s.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);i.RTCSessionDescription&&s instanceof i.RTCSessionDescription?arguments[0]=new i.RTCSessionDescription({type:s.type,sdp:r}):s.sdp=r}return t.apply(this,arguments)}}function Io(i,e){if(!(i.RTCPeerConnection&&i.RTCPeerConnection.prototype))return;let t=i.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(i.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function Lo(i,e){if(!(i.RTCPeerConnection&&i.RTCPeerConnection.prototype))return;let t=i.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(i.RTCPeerConnection.prototype.setLocalDescription=function(){let s=arguments[0]||{};if(typeof s!="object"||s.type&&s.sdp)return t.apply(this,arguments);if(s={type:s.type,sdp:s.sdp},!s.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":s.type="offer";break;default:s.type="answer";break}return s.sdp||s.type!=="offer"&&s.type!=="answer"?t.apply(this,[s]):(s.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>t.apply(this,[o]))})}var hS=Vf(lf());function Pm({window:i}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){let t=wo,n=Em(i),s={browserDetails:n,commonShim:hf,extractVersion:hr,disableLog:bm,disableWarnings:Tm,sdp:hS};switch(n.browser){case"chrome":if(!gl||!ml||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),s;if(n.version===null)return t("Chrome shim can not determine version, not shimming."),s;t("adapter.js shimming chrome."),s.browserShim=gl,Io(i,n),Lo(i,n),pl(i,n),Fu(i,n),ml(i,n),Bu(i,n),Hu(i,n),ku(i,n),zu(i,n),Gu(i,n),Co(i,n),Sl(i,n),Ml(i,n),Ro(i,n),Po(i,n),bl(i,n);break;case"firefox":if(!yl||!xl||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),s;t("adapter.js shimming firefox."),s.browserShim=yl,Io(i,n),Lo(i,n),_l(i,n),xl(i,n),Wu(i,n),Vu(i,n),Yu(i,n),Xu(i,n),qu(i,n),ju(i,n),Ju(i,n),Zu(i,n),$u(i,n),Ku(i,n),Co(i,n),Ml(i,n),Ro(i,n),Po(i,n);break;case"safari":if(!vl||!e.shimSafari)return t("Safari shim is not included in this adapter release."),s;t("adapter.js shimming safari."),s.browserShim=vl,Io(i,n),Lo(i,n),sf(i,n),of(i,n),tf(i,n),Qu(i,n),ef(i,n),rf(i,n),nf(i,n),af(i,n),Co(i,n),Sl(i,n),Ro(i,n),Po(i,n),bl(i,n);break;default:t("Unsupported browser!");break}return s}var uS=Pm({window:typeof window>"u"?void 0:window}),uf=uS;function ys(i,e,t,n){Object.defineProperty(i,e,{get:t,set:n,enumerable:!0,configurable:!0})}var El=class{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{let t=[],n=e.byteLength,s=Math.ceil(n/this.chunkedMTU),r=0,o=0;for(;o<n;){let c=Math.min(n,o+this.chunkedMTU),a=e.slice(o,c),l={__peerData:this._dataCount,n:r,data:a,total:s};t.push(l),o=c,r++}return this._dataCount++,t}}};function fS(i){let e=0;for(let s of i)e+=s.byteLength;let t=new Uint8Array(e),n=0;for(let s of i)t.set(s,n),n+=s.byteLength;return t}var ff=uf.default||uf,Do=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){let i=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(i)?i==="chrome"?e>=this.minChromeVersion:i==="firefox"?e>=this.minFirefoxVersion:i==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return ff.browserDetails.browser}getVersion(){return ff.browserDetails.version||0}isUnifiedPlanSupported(){let i=this.getBrowser(),e=ff.browserDetails.version||0;if(i==="chrome"&&e<this.minChromeVersion)return!1;if(i==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,n=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),n=!0}catch{}finally{t&&t.close()}return n}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},dS=i=>!i||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(i),Lm=()=>Math.random().toString(36).slice(2),Im={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"},df=class extends El{noop(){}blobToArrayBuffer(e,t){let n=new FileReader;return n.onload=function(s){s.target&&t(s.target.result)},n.readAsArrayBuffer(e),n}binaryStringToArrayBuffer(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=Im,this.browser=Do.getBrowser(),this.browserVersion=Do.getVersion(),this.pack=Du,this.unpack=Lu,this.supports=(function(){let t={browser:Do.isBrowserSupported(),webRTC:Do.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let n;try{n=new RTCPeerConnection(Im),t.audioVideo=!0;let s;try{s=n.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!s.ordered;try{s.binaryType="blob",t.binaryBlob=!Do.isIOS}catch{}}catch{}finally{s&&s.close()}}catch{}finally{n&&n.close()}return t})(),this.validateId=dS,this.randomToken=Lm}},bn=new df,pS="PeerJS: ";var pf=class{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){let n=[pS,...t];for(let s in n)n[s]instanceof Error&&(n[s]="("+n[s].name+") "+n[s].message);e>=3?console.log(...n):e>=2?console.warn("WARNING",...n):e>=1&&console.error("ERROR",...n)}constructor(){this._logLevel=0}},Ae=new pf,Sf={},mS=Object.prototype.hasOwnProperty,mn="~";function Uo(){}Object.create&&(Uo.prototype=Object.create(null),new Uo().__proto__||(mn=!1));function gS(i,e,t){this.fn=i,this.context=e,this.once=t||!1}function Dm(i,e,t,n,s){if(typeof t!="function")throw new TypeError("The listener must be a function");var r=new gS(t,n||i,s),o=mn?mn+e:e;return i._events[o]?i._events[o].fn?i._events[o]=[i._events[o],r]:i._events[o].push(r):(i._events[o]=r,i._eventsCount++),i}function Tl(i,e){--i._eventsCount===0?i._events=new Uo:delete i._events[e]}function ln(){this._events=new Uo,this._eventsCount=0}ln.prototype.eventNames=function(){var e=[],t,n;if(this._eventsCount===0)return e;for(n in t=this._events)mS.call(t,n)&&e.push(mn?n.slice(1):n);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};ln.prototype.listeners=function(e){var t=mn?mn+e:e,n=this._events[t];if(!n)return[];if(n.fn)return[n.fn];for(var s=0,r=n.length,o=new Array(r);s<r;s++)o[s]=n[s].fn;return o};ln.prototype.listenerCount=function(e){var t=mn?mn+e:e,n=this._events[t];return n?n.fn?1:n.length:0};ln.prototype.emit=function(e,t,n,s,r,o){var c=mn?mn+e:e;if(!this._events[c])return!1;var a=this._events[c],l=arguments.length,h,u;if(a.fn){switch(a.once&&this.removeListener(e,a.fn,void 0,!0),l){case 1:return a.fn.call(a.context),!0;case 2:return a.fn.call(a.context,t),!0;case 3:return a.fn.call(a.context,t,n),!0;case 4:return a.fn.call(a.context,t,n,s),!0;case 5:return a.fn.call(a.context,t,n,s,r),!0;case 6:return a.fn.call(a.context,t,n,s,r,o),!0}for(u=1,h=new Array(l-1);u<l;u++)h[u-1]=arguments[u];a.fn.apply(a.context,h)}else{var f=a.length,d;for(u=0;u<f;u++)switch(a[u].once&&this.removeListener(e,a[u].fn,void 0,!0),l){case 1:a[u].fn.call(a[u].context);break;case 2:a[u].fn.call(a[u].context,t);break;case 3:a[u].fn.call(a[u].context,t,n);break;case 4:a[u].fn.call(a[u].context,t,n,s);break;default:if(!h)for(d=1,h=new Array(l-1);d<l;d++)h[d-1]=arguments[d];a[u].fn.apply(a[u].context,h)}}return!0};ln.prototype.on=function(e,t,n){return Dm(this,e,t,n,!1)};ln.prototype.once=function(e,t,n){return Dm(this,e,t,n,!0)};ln.prototype.removeListener=function(e,t,n,s){var r=mn?mn+e:e;if(!this._events[r])return this;if(!t)return Tl(this,r),this;var o=this._events[r];if(o.fn)o.fn===t&&(!s||o.once)&&(!n||o.context===n)&&Tl(this,r);else{for(var c=0,a=[],l=o.length;c<l;c++)(o[c].fn!==t||s&&!o[c].once||n&&o[c].context!==n)&&a.push(o[c]);a.length?this._events[r]=a.length===1?a[0]:a:Tl(this,r)}return this};ln.prototype.removeAllListeners=function(e){var t;return e?(t=mn?mn+e:e,this._events[t]&&Tl(this,t)):(this._events=new Uo,this._eventsCount=0),this};ln.prototype.off=ln.prototype.removeListener;ln.prototype.addListener=ln.prototype.on;ln.prefixed=mn;ln.EventEmitter=ln;Sf=ln;var vs={};ys(vs,"ConnectionType",()=>es);ys(vs,"PeerErrorType",()=>Ut);ys(vs,"BaseConnectionErrorType",()=>mf);ys(vs,"DataConnectionErrorType",()=>Mf);ys(vs,"SerializationType",()=>Il);ys(vs,"SocketEventType",()=>Qi);ys(vs,"ServerMessageType",()=>cn);var es=(function(i){return i.Data="data",i.Media="media",i})({}),Ut=(function(i){return i.BrowserIncompatible="browser-incompatible",i.Disconnected="disconnected",i.InvalidID="invalid-id",i.InvalidKey="invalid-key",i.Network="network",i.PeerUnavailable="peer-unavailable",i.SslUnavailable="ssl-unavailable",i.ServerError="server-error",i.SocketError="socket-error",i.SocketClosed="socket-closed",i.UnavailableID="unavailable-id",i.WebRTC="webrtc",i})({}),mf=(function(i){return i.NegotiationFailed="negotiation-failed",i.ConnectionClosed="connection-closed",i})({}),Mf=(function(i){return i.NotOpenYet="not-open-yet",i.MessageToBig="message-too-big",i})({}),Il=(function(i){return i.Binary="binary",i.BinaryUTF8="binary-utf8",i.JSON="json",i.None="raw",i})({}),Qi=(function(i){return i.Message="message",i.Disconnected="disconnected",i.Error="error",i.Close="close",i})({}),cn=(function(i){return i.Heartbeat="HEARTBEAT",i.Candidate="CANDIDATE",i.Offer="OFFER",i.Answer="ANSWER",i.Open="OPEN",i.Error="ERROR",i.IdTaken="ID-TAKEN",i.InvalidKey="INVALID-KEY",i.Leave="LEAVE",i.Expire="EXPIRE",i})({}),Nm="1.5.5",gf=class extends Sf.EventEmitter{constructor(e,t,n,s,r,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];let c=e?"wss://":"ws://";this._baseUrl=c+t+":"+n+s+"peerjs?key="+r}start(e,t){this._id=e;let n=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(n+"&version="+Nm),this._disconnected=!1,this._socket.onmessage=s=>{let r;try{r=JSON.parse(s.data),Ae.log("Server message received:",r)}catch{Ae.log("Invalid server message",s.data);return}this.emit(Qi.Message,r)},this._socket.onclose=s=>{this._disconnected||(Ae.log("Socket closed.",s),this._cleanup(),this._disconnected=!0,this.emit(Qi.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),Ae.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){Ae.log("Cannot send heartbeat, because socket closed");return}let e=JSON.stringify({type:cn.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){let e=[...this._messagesQueue];this._messagesQueue=[];for(let t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(Qi.Error,"Invalid message");return}if(!this._wsOpen())return;let t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}},Al=class{constructor(e){this.connection=e}startConnection(e){let t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===es.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){let n=this.connection,s={ordered:!!e.reliable},r=t.createDataChannel(n.label,s);n._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){Ae.log("Creating RTCPeerConnection.");let e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){let t=this.connection.peer,n=this.connection.connectionId,s=this.connection.type,r=this.connection.provider;Ae.log("Listening for ICE candidates."),e.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(Ae.log(`Received ICE candidates for ${t}:`,o.candidate),r.socket.send({type:cn.Candidate,payload:{candidate:o.candidate,type:s,connectionId:n},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":Ae.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(mf.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":Ae.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(mf.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":Ae.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},Ae.log("Listening for data channel"),e.ondatachannel=o=>{Ae.log("Received data channel");let c=o.channel;r.getConnection(t,n)._initializeDataChannel(c)},Ae.log("Listening for remote stream"),e.ontrack=o=>{Ae.log("Received remote stream");let c=o.streams[0],a=r.getConnection(t,n);if(a.type===es.Media){let l=a;this._addStreamToMediaConnection(c,l)}}}cleanup(){Ae.log("Cleaning up PeerConnection to "+this.connection.peer);let e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};let t=e.signalingState!=="closed",n=!1,s=this.connection.dataChannel;s&&(n=!!s.readyState&&s.readyState!=="closed"),(t||n)&&e.close()}async _makeOffer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let n=await e.createOffer(this.connection.options.constraints);Ae.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await e.setLocalDescription(n),Ae.log("Set localDescription:",n,`for:${this.connection.peer}`);let s={sdp:n,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===es.Data){let r=this.connection;s={...s,label:r.label,reliable:r.reliable,serialization:r.serialization}}t.socket.send({type:cn.Offer,payload:s,dst:this.connection.peer})}catch(s){s!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(Ut.WebRTC,s),Ae.log("Failed to setLocalDescription, ",s))}}catch(n){t.emitError(Ut.WebRTC,n),Ae.log("Failed to createOffer, ",n)}}async _makeAnswer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let n=await e.createAnswer();Ae.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await e.setLocalDescription(n),Ae.log("Set localDescription:",n,`for:${this.connection.peer}`),t.socket.send({type:cn.Answer,payload:{sdp:n,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(s){t.emitError(Ut.WebRTC,s),Ae.log("Failed to setLocalDescription, ",s)}}catch(n){t.emitError(Ut.WebRTC,n),Ae.log("Failed to create answer, ",n)}}async handleSDP(e,t){t=new RTCSessionDescription(t);let n=this.connection.peerConnection,s=this.connection.provider;Ae.log("Setting remote description",t);let r=this;try{await n.setRemoteDescription(t),Ae.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await r._makeAnswer()}catch(o){s.emitError(Ut.WebRTC,o),Ae.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(e){Ae.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),Ae.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(Ut.WebRTC,t),Ae.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(Ae.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return Ae.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(n=>{t.addTrack(n,e)})}_addStreamToMediaConnection(e,t){Ae.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}},wl=class extends Sf.EventEmitter{emitError(e,t){Ae.error("Error:",t),this.emit("error",new _f(`${e}`,t))}},_f=class extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}},Cl=class extends wl{get open(){return this._open}constructor(e,t,n){super(),this.peer=e,this.provider=t,this.options=n,this._open=!1,this.metadata=n.metadata}},Rl=class i extends Cl{static#e=this.ID_PREFIX="mc_";get type(){return es.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,n){super(e,t,n),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||i.ID_PREFIX+bn.randomToken(),this._negotiator=new Al(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Ae.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{Ae.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){Ae.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){let t=e.type,n=e.payload;switch(e.type){case cn.Answer:this._negotiator.handleSDP(t,n.sdp),this._open=!0;break;case cn.Candidate:this._negotiator.handleCandidate(n.candidate);break;default:Ae.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){Ae.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});let n=this.provider._getMessages(this.connectionId);for(let s of n)this.handleMessage(s);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}},xf=class{constructor(e){this._options=e}_buildRequest(e){let t=this._options.secure?"https":"http",{host:n,port:s,path:r,key:o}=this._options,c=new URL(`${t}://${n}:${s}${r}${o}/${e}`);return c.searchParams.set("ts",`${Date.now()}${Math.random()}`),c.searchParams.set("version",Nm),fetch(c.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{let e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){Ae.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==bn.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{let e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===bn.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw Ae.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}},Pl=class i extends Cl{static#e=this.ID_PREFIX="dc_";static#t=this.MAX_BUFFERED_AMOUNT=8388608;get type(){return es.Data}constructor(e,t,n){super(e,t,n),this.connectionId=this.options.connectionId||i.ID_PREFIX+Lm(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Al(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Ae.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{Ae.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{Ae.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(Mf.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){let t=e.payload;switch(e.type){case cn.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case cn.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:Ae.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}},Oo=class extends Pl{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>Pl.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return Ae.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;let e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}},No=class extends Oo{close(e){super.close(e),this._chunkedData={}}constructor(e,t,n){super(e,t,n),this.chunker=new El,this.serialization=Il.Binary,this._chunkedData={}}_handleDataMessage({data:e}){let t=Lu(e),n=t.__peerData;if(n){if(n.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){let t=e.__peerData,n=this._chunkedData[t]||{data:[],count:0,total:e.total};if(n.data[e.n]=new Uint8Array(e.data),n.count++,this._chunkedData[t]=n,n.total===n.count){delete this._chunkedData[t];let s=fS(n.data);this._handleDataMessage({data:s})}}_send(e,t){let n=Du(e);if(n instanceof Promise)return this._send_blob(n);if(!t&&n.byteLength>this.chunker.chunkedMTU){this._sendChunks(n);return}this._bufferedSend(n)}async _send_blob(e){let t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){let t=this.chunker.chunk(e);Ae.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(let n of t)this.send(n,!0)}},yf=class extends Oo{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=Il.None}},vf=class extends Oo{_handleDataMessage({data:e}){let t=this.parse(this.decoder.decode(e)),n=t.__peerData;if(n&&n.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){let n=this.encoder.encode(this.stringify(e));if(n.byteLength>=bn.chunkedMTU){this.emitError(Mf.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(n)}constructor(...e){super(...e),this.serialization=Il.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}};var Fo=class i extends wl{static#e=this.DEFAULT_KEY="peerjs";get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){let e=Object.create(null);for(let[t,n]of this._connections)e[t]=n;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:yf,json:vf,binary:No,"binary-utf8":No,default:No},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let n;if(e&&e.constructor==Object?t=e:e&&(n=e.toString()),t={debug:0,host:bn.CLOUD_HOST,port:bn.CLOUD_PORT,path:"/",key:i.DEFAULT_KEY,token:bn.randomToken(),config:bn.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==bn.CLOUD_HOST?this._options.secure=bn.isSecure():this._options.host==bn.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&Ae.setLogFunction(this._options.logFunction),Ae.logLevel=this._options.debug||0,this._api=new xf(t),this._socket=this._createServerConnection(),!bn.supports.audioVideo&&!bn.supports.data){this._delayedAbort(Ut.BrowserIncompatible,"The current browser does not support WebRTC");return}if(n&&!bn.validateId(n)){this._delayedAbort(Ut.InvalidID,`ID "${n}" is invalid`);return}n?this._initialize(n):this._api.retrieveId().then(s=>this._initialize(s)).catch(s=>this._abort(Ut.ServerError,s))}_createServerConnection(){let e=new gf(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(Qi.Message,t=>{this._handleMessage(t)}),e.on(Qi.Error,t=>{this._abort(Ut.SocketError,t)}),e.on(Qi.Disconnected,()=>{this.disconnected||(this.emitError(Ut.Network,"Lost connection to server."),this.disconnect())}),e.on(Qi.Close,()=>{this.disconnected||this._abort(Ut.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){let t=e.type,n=e.payload,s=e.src;switch(t){case cn.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case cn.Error:this._abort(Ut.ServerError,n.msg);break;case cn.IdTaken:this._abort(Ut.UnavailableID,`ID "${this.id}" is taken`);break;case cn.InvalidKey:this._abort(Ut.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case cn.Leave:Ae.log(`Received leave message from ${s}`),this._cleanupPeer(s),this._connections.delete(s);break;case cn.Expire:this.emitError(Ut.PeerUnavailable,`Could not connect to peer ${s}`);break;case cn.Offer:{let r=n.connectionId,o=this.getConnection(s,r);if(o&&(o.close(),Ae.warn(`Offer received for existing Connection ID:${r}`)),n.type===es.Media){let a=new Rl(s,this,{connectionId:r,_payload:n,metadata:n.metadata});o=a,this._addConnection(s,o),this.emit("call",a)}else if(n.type===es.Data){let a=new this._serializers[n.serialization](s,this,{connectionId:r,_payload:n,metadata:n.metadata,label:n.label,serialization:n.serialization,reliable:n.reliable});o=a,this._addConnection(s,o),this.emit("connection",a)}else{Ae.warn(`Received malformed connection type:${n.type}`);return}let c=this._getMessages(r);for(let a of c)o.handleMessage(a);break}default:{if(!n){Ae.warn(`You received a malformed message from ${s} of type ${t}`);return}let r=n.connectionId,o=this.getConnection(s,r);o&&o.peerConnection?o.handleMessage(e):r?this._storeMessage(r,e):Ae.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){let t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){Ae.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Ut.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}let n=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,n),n}call(e,t,n={}){if(this.disconnected){Ae.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Ut.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){Ae.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}let s=new Rl(e,this,{...n,_stream:t});return this._addConnection(e,s),s}_addConnection(e,t){Ae.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){let t=this._connections.get(e.peer);if(t){let n=t.indexOf(e);n!==-1&&t.splice(n,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){let n=this._connections.get(e);if(!n)return null;for(let s of n)if(s.connectionId===t)return s;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){Ae.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(Ae.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(let e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){let t=this._connections.get(e);if(t)for(let n of t)n.close()}disconnect(){if(this.disconnected)return;let e=this.id;Ae.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)Ae.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)Ae.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(Ut.ServerError,t))}};var bf="sendaninja-v"+4+"-",Um="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",Tf=47800;function Ll(){let i="";for(let e=0;e<5;e++)i+=Um.charAt(Math.floor(Math.random()*Um.length));return i}function Om(){let i={debug:0},e=typeof window<"u"&&window.__peerOpts;if(e)for(let t in e)i[t]=e[t];return i}function Bo(){return typeof window<"u"?window.SendaNative:null}function dr(){return!!Bo()}function Fm(){return Bo()?"app":typeof location<"u"&&location.protocol==="http:"&&location.port===String(Tf)?"lan":"web"}var Dl=class{constructor(){this.conns={},this.peer=null,this.closed=!1,this.onJoin=null,this.onLeave=null,this.onMsg=null,this.onDown=null}open(){let e=this;return new Promise(function(t,n){let s=0,r=!1,o=setTimeout(function(){r||(r=!0,e.close(),n(new Error("timeout")))},2e4);function c(){let a=Ll(),l=new Fo(bf+a,Om());e.peer=l,l.on("open",function(){r||(r=!0,clearTimeout(o),t(a))}),l.on("connection",function(h){e.accept(h)}),l.on("disconnected",function(){e.closed||setTimeout(function(){if(!e.closed&&e.peer===l&&!l.destroyed)try{l.reconnect()}catch{}},1500)}),l.on("error",function(h){if(r){h&&h.type==="network"&&e.onDown&&e.onDown();return}if(h&&h.type==="unavailable-id"&&s++<4){try{l.destroy()}catch{}c();return}r=!0,clearTimeout(o);try{l.destroy()}catch{}n(h)})}c()})}accept(e){let t=this,n=e.peer;e.on("open",function(){t.conns[n]=e,t.onJoin&&t.onJoin(n)}),e.on("data",function(r){t.conns[n]&&t.onMsg&&t.onMsg(n,r)});let s=function(){t.conns[n]&&(delete t.conns[n],t.onLeave&&t.onLeave(n))};e.on("close",s),e.on("error",s)}send(e,t){let n=this.conns[e];if(n&&n.open)try{n.send(t)}catch{}}broadcast(e){for(let t in this.conns)this.send(t,e)}kick(e){let t=this.conns[e];if(t){delete this.conns[e];try{t.close()}catch{}}}close(){if(this.closed=!0,this.peer)try{this.peer.destroy()}catch{}this.conns={}}},Nl=class{constructor(){this.peer=null,this.conn=null,this.onMsg=null,this.onClose=null,this.closed=!1}connect(e){let t=this;return new Promise(function(n,s){let r=!1,o=function(l){r||(r=!0,clearTimeout(c),t.close(),s(l))},c=setTimeout(function(){o(new Error("timeout"))},22e3),a=new Fo(bf+"j-"+Ll()+Ll()+Ll(),Om());t.peer=a,a.on("open",function(){let l=a.connect(bf+e,{reliable:!0,serialization:"raw"});t.conn=l,l.on("open",function(){r||(r=!0,clearTimeout(c),n())}),l.on("data",function(u){t.onMsg&&t.onMsg(u)});let h=function(){r?!t.closed&&t.onClose&&(t.closed=!0,t.onClose()):o(new Error("closed"))};l.on("close",h),l.on("error",h)}),a.on("error",function(l){r||o(l)})})}send(e){if(this.conn&&this.conn.open)try{this.conn.send(e)}catch{}}close(){if(this.closed=!0,this.peer)try{this.peer.destroy()}catch{}}},Ul=class{constructor(){this.ws=null,this.onJoin=null,this.onLeave=null,this.onMsg=null,this.onDown=null,this.closed=!1,this.ids={}}open(e){let t=this,n=Bo();return new Promise(function(s,r){if(!n){r(new Error("nolan"));return}let o;try{o=JSON.parse(n.lanStart(String(e||"Sala")))}catch(l){r(l);return}if(!o||!o.ok){r(new Error(o&&o.err?o.err:"lanfail"));return}let c=new WebSocket("ws://127.0.0.1:"+o.port+"/host");t.ws=c;let a=!1;c.onopen=function(){a=!0,s(o.ips&&o.ips.length?o.ips.join("  \xB7  "):"sin Wi-Fi")},c.onerror=function(){a||r(new Error("lanws"))},c.onclose=function(){a&&!t.closed&&t.onDown&&t.onDown()},c.onmessage=function(l){let h=l.data;if(typeof h!="string"||!h.length)return;let u=h.charAt(0);if(u==="+"){let d=h.slice(1);t.ids[d]=1,t.onJoin&&t.onJoin(d);return}if(u==="-"){let d=h.slice(1);t.ids[d]&&(delete t.ids[d],t.onLeave&&t.onLeave(d));return}let f=h.indexOf("|");if(f>0){let d=h.slice(0,f);t.ids[d]&&t.onMsg&&t.onMsg(d,h.slice(f+1))}}})}send(e,t){this.ws&&this.ws.readyState===1&&this.ws.send(e+"|"+t)}broadcast(e){this.ws&&this.ws.readyState===1&&this.ws.send("*|"+e)}kick(e){delete this.ids[e],this.ws&&this.ws.readyState===1&&this.ws.send("!"+e)}close(){if(this.closed=!0,this.ws)try{this.ws.close()}catch{}let e=Bo();if(e)try{e.lanStop()}catch{}}},Ol=class{constructor(){this.ws=null,this.onMsg=null,this.onClose=null,this.closed=!1}connect(e){let t=this;return new Promise(function(n,s){let r=String(e||"").replace(/^\s*(ws|http)s?:\/\//,"").replace(/[\s/]+$/g,"");if(!/^[0-9a-zA-Z.\-:]+$/.test(r)){s(new Error("badaddr"));return}r.indexOf(":")<0&&(r+=":"+Tf);let o=!1,c;try{c=new WebSocket("ws://"+r+"/join")}catch(l){s(l);return}t.ws=c;let a=setTimeout(function(){if(!o){o=!0;try{c.close()}catch{}s(new Error("timeout"))}},7e3);c.onopen=function(){o||(o=!0,clearTimeout(a),n())},c.onerror=function(){o||(o=!0,clearTimeout(a),s(new Error("lanws")))},c.onclose=function(){o&&!t.closed&&t.onClose&&(t.closed=!0,t.onClose())},c.onmessage=function(l){typeof l.data=="string"&&t.onMsg&&t.onMsg(l.data)}})}send(e){this.ws&&this.ws.readyState===1&&this.ws.send(e)}close(){if(this.closed=!0,this.ws)try{this.ws.close()}catch{}}};function Bm(i,e){let t=Bo(),n=[];if(t)try{n=JSON.parse(t.lanIps())||[]}catch{n=[]}let s=[],r=typeof window<"u"&&window.__lanScanHosts;if(r){for(let f=0;f<r.length;f++)s.push(r[f]);n=[]}for(let f=0;f<n.length;f++){let d=String(n[f]).split(".");if(d.length!==4){s.push(String(n[f]));continue}for(let p=1;p<255;p++)s.push(d[0]+"."+d[1]+"."+d[2]+"."+p)}if(!s.length){e(!1);return}let o=0,c=0,a=!1,l={};function h(){for(;c<48&&o<s.length;)u(s[o++]);!c&&o>=s.length&&!a&&(a=!0,e(!0))}function u(f){c++;let d=!1,p,y=function(){if(!d){d=!0,c--;try{p.close()}catch{}h()}};try{p=new WebSocket("ws://"+(f.indexOf(":")<0?f+":"+Tf:f)+"/probe")}catch{d=!0,c--;return}let m=setTimeout(y,1300);p.onmessage=function(g){let S=String(g.data);if(S.indexOf("senda|")===0&&!l[f]){l[f]=1;let A=S.split("|");i({ip:f,name:A[1]||"Sala",n:+A[2]||0})}clearTimeout(m),y()},p.onerror=function(){clearTimeout(m),y()},p.onclose=function(){clearTimeout(m),y()}}h()}var Fl=class{constructor(e,t,n,s,r){this.tr=e,this.cb=r,this.lobby={mode:t,code:n,teams:s.teams,diff:s.diff,players:[{id:0,name:s.name,cls:s.cls,team:0,slot:0,host:!0}]},this.ids={},this.nextId=1,this.seen={},this.started=!1,this.ninjaOf={};let o=this;e.onJoin=function(){},e.onLeave=function(c){o.drop(c)},e.onMsg=function(c,a){o.recv(c,a)},e.onDown=function(){o.cb.down&&o.cb.down()},this.timer=setInterval(function(){o.sweep()},2e3)}player(e){let t=this.lobby.players;for(let n=0;n<t.length;n++)if(t[n].id===e)return t[n];return null}taken(e,t){let n=this.lobby.players;for(let s=0;s<n.length;s++)if(n[s].team===e&&n[s].slot===t)return!0;return!1}freeSlot(){for(let e=0;e<this.lobby.teams;e++)for(let t=0;t<3;t++)if(!this.taken(e,t))return{team:e,slot:t};return null}recv(e,t){let n;try{n=JSON.parse(t)}catch{return}if(!Array.isArray(n))return;this.seen[e]=Date.now();let s=this.ids[e],r=n[0];if(r==="hello"){if(s!=null)return;if(n[1]!==4){this.tr.send(e,JSON.stringify(["no","ver"]));return}if(this.started){this.tr.send(e,JSON.stringify(["no","busy"]));return}let c=this.freeSlot();if(!c){this.tr.send(e,JSON.stringify(["no","full"]));return}let a=this.nextId++;this.ids[e]=a;let l=String(n[2]||"Ninja").replace(/[<>&"]/g,"").slice(0,12)||"Ninja",h=2,u=l;for(;this.lobby.players.some(function(f){return f.name===l});)l=u.slice(0,10)+h++;this.lobby.players.push({id:a,name:l,cls:(n[3]|0)%3,team:c.team,slot:c.slot,host:!1}),this.tr.send(e,JSON.stringify(["welcome",a,this.lobby])),this.sync();return}if(s==null)return;if(r==="p"){this.tr.send(e,JSON.stringify(["p",n[1]]));return}if(r==="i"||r==="a"){let c=this.ninjaOf[s];this.started&&c!=null&&this.cb.input&&this.cb.input(c,n);return}if(this.started)return;let o=this.player(s);o&&(r==="slot"?this.setSlot(s,n[1]|0,n[2]|0):r==="cls"&&(o.cls=(n[1]|0)%3,this.sync()))}setSlot(e,t,n){let s=this.player(e);!s||t<0||t>=this.lobby.teams||n<0||n>2||this.taken(t,n)||(s.team=t,s.slot=n,this.sync())}setCls(e,t){let n=this.player(e);n&&(n.cls=t,this.sync())}setOpt(e,t){if(this.lobby.diff=t,e!==this.lobby.teams){this.lobby.teams=e;let n=this.lobby.players;for(let s=0;s<n.length;s++)n[s].team>=e&&(n[s].team=-1);for(let s=0;s<n.length;s++)if(n[s].team<0){let r=this.freeSlot();r&&(n[s].team=r.team,n[s].slot=r.slot)}for(let s=n.length-1;s>=0;s--)if(n[s].team<0){let r=n[s];n.splice(s,1);for(let o in this.ids)this.ids[o]===r.id&&(this.tr.send(o,JSON.stringify(["no","full"])),this.tr.kick(o),delete this.ids[o])}}this.sync()}sync(){this.tr.broadcast(JSON.stringify(["lobby",this.lobby])),this.cb.lobby&&this.cb.lobby(this.lobby)}drop(e){let t=this.ids[e];if(t==null)return;delete this.ids[e],delete this.seen[e];let n=this.lobby.players;for(let s=0;s<n.length;s++)if(n[s].id===t){n.splice(s,1);break}if(this.started){let s=this.ninjaOf[t];s!=null&&this.cb.left&&this.cb.left(s),delete this.ninjaOf[t]}this.sync()}sweep(){let e=Date.now();for(let t in this.ids)this.seen[t]&&e-this.seen[t]>9e3&&(this.tr.kick(t),this.drop(t))}start(){let e=this.lobby,t=Math.random()*2147483647|0,n=e.players.map(function(o){return{team:o.team,slot:o.slot,cls:o.cls,name:o.name,owner:o.id}}),s=na(e.teams,n,xi(t^119),Xo);this.started=!0,this.ninjaOf={};for(let o=0;o<s.length;o++)s[o].bot||(this.ninjaOf[s[o].owner]=s[o].id);let r={seed:t,teams:e.teams,diff:e.diff,roster:s};for(let o in this.ids){let c=this.ninjaOf[this.ids[o]];this.tr.send(o,JSON.stringify(["start",{seed:t,teams:e.teams,diff:e.diff,roster:s,you:c}]))}return{seed:r.seed,teams:r.teams,diff:r.diff,roster:s,you:this.ninjaOf[0]}}snap(e){this.tr.broadcast(JSON.stringify(e))}hasRemotes(){for(let e in this.ids)return!0;return!1}backToLobby(){this.started=!1,this.ninjaOf={},this.tr.broadcast(JSON.stringify(["back"])),this.sync()}close(){clearInterval(this.timer);try{this.tr.broadcast(JSON.stringify(["bye"]))}catch{}let e=this.tr;setTimeout(function(){e.close()},150)}},Bl=class{constructor(e,t,n){this.tr=e,this.cb=n,this.id=null,this.lobby=null,this.ping=null,this.closed=!1;let s=this;e.onMsg=function(r){s.recv(r)},e.onClose=function(){!s.closed&&s.cb.closed&&s.cb.closed("lost")},this.send(["hello",4,t.name,t.cls]),this.timer=setInterval(function(){s.send(["p",Date.now()%1e6])},2e3)}recv(e){let t;try{t=JSON.parse(e)}catch{return}if(!Array.isArray(t)){t&&t.k==="s"&&this.cb.snap&&this.cb.snap(t);return}let n=t[0];if(n==="welcome")this.id=t[1],this.lobby=t[2],this.cb.lobby&&this.cb.lobby(this.lobby,this.id);else if(n==="lobby")this.lobby=t[1],this.cb.lobby&&this.id!=null&&this.cb.lobby(this.lobby,this.id);else if(n==="start")this.cb.start&&this.cb.start(t[1]);else if(n==="back")this.cb.back&&this.cb.back();else if(n==="p"){let s=Date.now()%1e6-t[1];s<0&&(s+=1e6),this.ping=s}else n==="no"?(this.closed=!0,this.cb.closed&&this.cb.closed(t[1]),this.tr.close()):n==="bye"&&(this.closed=!0,this.cb.closed&&this.cb.closed("bye"),this.tr.close())}send(e){this.tr.send(JSON.stringify(e))}close(){this.closed=!0,clearInterval(this.timer),this.tr.close()}};var _S="1.1",km=Fm(),xS=/iPhone|iPad|iPod/.test(navigator.userAgent||"")||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,Hm="sendaNinja.v1";function pr(i){return document.getElementById(i)}var ft={name:"",cls:0,diff:1,teams:4,sfx:!0,music:!0,hq:!0};try{let i=window.localStorage.getItem(Hm);if(i){let e=JSON.parse(i);for(let t in ft)e[t]!=null&&typeof e[t]==typeof ft[t]&&(ft[t]=e[t])}}catch{}ft.name||(ft.name="Ninja"+(100+Math.floor(Math.random()*900)));ft.cls=_t(ft.cls|0,0,2);ft.diff=_t(ft.diff|0,0,2);ft.teams=_t(ft.teams|0,2,4);function yS(){try{window.localStorage.setItem(Hm,JSON.stringify(ft))}catch{}}var vS=pr("c"),Ot=null;try{Ot=new hl(vS)}catch(i){throw document.body.innerHTML='<div style="padding:30px;font:16px sans-serif;color:#fff">Este celular no pudo iniciar los gr\xE1ficos 3D (WebGL). Actualiza "WebView del sistema Android" desde Play Store e int\xE9ntalo de nuevo.</div>',i}var Qt=new fl,Xn=new ul;Xn.attach(pr("joy"),pr("joyB"),pr("joyK"),document.querySelectorAll(".ab"));var Zt="menu",Ln=null,ct=null,$e=null,Dn=!1,Tn=!1,ii=!1,Ss=!1,ns=null,ts=0,SS=null,Af=null;function Gm(){Qt.setSfx(ft.sfx),Qt.setMusic(ft.music),zl=1,Ot.setQuality(ft.hq?1:.7)}var we=new dl({click:function(){Qt.unlock(),Qt.play("click")},sound:function(i){Qt.play(i)},save:yS,applySettings:Gm,back:function(i){i==="lan"?we.show("mp",{lanOk:dr()}):we.show("title")},solo:zm,host:bS,join:TS,lanScan:ES,lobbySlot:function(i,e){$e&&(Tn?$e.setSlot(0,i,e):$e.send(["slot",i,e]))},lobbyCls:function(i){$e&&(Tn?$e.setCls(0,i):$e.send(["cls",i]))},lobbyOpt:function(){$e&&Tn&&$e.setOpt(ft.teams,ft.diff)},start:function(){$e&&Tn&&Zt==="lobby"&&If($e.start())},again:function(){Dn?zm():Tn&&$e&&(zo(),$e.backToLobby(),Ho($e.lobby,0))},leave:wf,pause:function(){Zt==="game"&&!Ss&&(ii=!0,Xn.reset(),we.data.solo=Dn,we.showOverlay("pause"))},resume:function(){ii=!1,we.hide()}},ft);function Vm(){let i=vr(20261);Ot.buildWorld(i,4);let e=[],t=[[-2.2,1.6,.9],[0,2.4,3.14],[2.2,1.6,-.9],[-2.4,-1.2,1.9],[0,-2.2,0],[2.4,-1.2,-1.9]];for(let n=0;n<6;n++)e.push({id:n,team:n<3?0:1,slot:n%3,cls:n%3,name:"",bot:!0});Ot.buildMatch(e,2,-1),Af={ninjas:e.map(function(n,s){return{id:s,team:n.team,cls:n.cls,x:48+t[s][0],z:48+t[s][1],f:t[s][2],hp:100,st:Ne,fl:0,cM:0,cS:0,cX:0,cH:0,cD:0,moving:!1,hidden:!1}}),scrolls:[{kind:0,carrier:1,x:48,z:48+2.4},{kind:1,carrier:4,x:48,z:48-2.2}],proj:[],areas:[],food:255,zone:{r:Y.ZONE_R0,to:Y.ZONE_R0,timer:0,shrinking:!1,stage:0},deliver:[0,0],events:[]}}function Gl(i,e){Zt="menu",Xn.enabled=!1,Xn.reset(),we.hudStop(),Vm(),Qt.setMood(0),we.show(i||"title",e)}function If(i){ns&&(clearTimeout(ns),ns=null),SS=i,Ss=!1,ii=!1;let e;if(Tn||Dn){Ln=new ta(i);let t=i.you;e=function(n){Ln.input(t,n)},ct=new br(i,e,.075),Ln.onSnap=function(n){ct.onSnap(n),$e&&$e.hasRemotes()&&$e.snap(n)}}else Ln=null,e=function(t){$e&&$e.send(t)},ct=new br(i,e,.13);Ot.buildWorld(ct.map,i.teams),Ot.buildMatch(i.roster,i.teams,i.you),Ot.cam.x=ct.p.x,Ot.cam.z=ct.p.z,ts=i.you,we.hide(),we.hudStart(ct,i.roster,i.teams),Xn.reset(),Xn.enabled=!0,Zt="game",Qt.setMood(1)}function zo(){ns&&(clearTimeout(ns),ns=null),Ln=null,ct=null,Ss=!1,ii=!1,Xn.enabled=!1,Xn.reset(),we.hudStop()}function zm(){$e&&($e.close(),$e=null),Dn=!0,Tn=!1;let i=Math.random()*2147483647|0,e=xi(i^119),t=Math.floor(Math.random()*ft.teams),n=na(ft.teams,[{team:t,slot:0,cls:ft.cls,name:ft.name,owner:0}],e,Xo);If({seed:i,teams:ft.teams,diff:ft.diff,roster:n,you:t*3})}function MS(){if(ns=null,Zt!=="game"||!ct||!ct.view.end)return;let i=ct.view.end,e=ct.start;Xn.enabled=!1,Xn.reset(),we.hudStop(),Qt.setMood(0),Qt.play(i.winner===ct.myTeam?"win":"lose"),we.show("results",{end:i,roster:e.roster,myTeam:ct.myTeam,me:ct.me,canAgain:Dn||Tn,solo:Dn})}function wf(){$e&&($e.close(),$e=null),zo(),Dn=!1,Tn=!1,Gl("title")}var Cf={ver:"Esa sala usa otra versi\xF3n del juego. Todos deben instalar la misma APK.",busy:"Esa sala ya empez\xF3 la partida. Espera a que termine.",full:"La sala est\xE1 llena.",bye:"El anfitri\xF3n cerr\xF3 la sala.",lost:"Se perdi\xF3 la conexi\xF3n con el anfitri\xF3n."};function Wm(i,e){let t=i&&(i.type||i.message);return t==="peer-unavailable"?"No existe una sala con ese c\xF3digo. Rev\xEDsalo e int\xE9ntalo otra vez.":t==="nolan"?"El modo Wi-Fi local solo funciona dentro de la app instalada.":t==="lanws"||t==="badaddr"?e?"No se pudo abrir la sala local.":"No se pudo conectar con esa direcci\xF3n. \xBFEst\xE1n en el mismo Wi-Fi?":t==="timeout"||t==="closed"?e?"No hubo respuesta del servicio de salas. Revisa tu conexi\xF3n e int\xE9ntalo otra vez.":"No se logr\xF3 conectar con el anfitri\xF3n. Algunas redes (sobre todo datos m\xF3viles) bloquean la conexi\xF3n directa: prueben con otro Wi-Fi o con el modo Wi-Fi local.":t==="network"||t==="server-error"||t==="socket-error"||t==="socket-closed"?"No se pudo contactar el servicio de salas por internet. Int\xE9ntalo m\xE1s tarde o usen Wi-Fi local.":t==="browser-incompatible"||t==="webrtc"?"Este celular no pudo abrir la conexi\xF3n directa. Prueben el modo Wi-Fi local.":(e?"No se pudo crear la sala":"No se pudo entrar a la sala")+" ("+(t||"error")+")."}function Ho(i,e){Zt==="game"&&(Vm(),Qt.setMood(0)),Zt="lobby";let t=we.name==="lobby"?we.data:{};we.show("lobby",{lobby:i,myId:e,isHost:Tn,msg:t.msg,err:t.err})}function bS(i){if($e)return;we.msg(i==="net"?"Creando sala por internet\u2026":"Abriendo sala en el Wi-Fi\u2026");let e=i==="net"?new Dl:new Ul;(i==="net"?e.open():e.open(ft.name)).then(function(n){if(we.name!=="mp"){e.close();return}Dn=!1,Tn=!0,$e=new Fl(e,i,n,ft,{lobby:function(s){Zt==="lobby"&&Ho(s,0)},input:function(s,r){Ln&&Ln.input(s,r)},left:function(s){Ln&&Ln.toBot(s)},down:function(){Zt==="lobby"&&we.msg("Se cort\xF3 la conexi\xF3n con el servicio de salas. Los que ya entraron siguen conectados.",!0)}}),Ho($e.lobby,0)}).catch(function(n){we.msg(Wm(n,!0),!0)})}function TS(i,e){if($e)return;if(i==="net"&&(!e||e.length<4)){we.msg("Escribe el c\xF3digo de la sala.",!0);return}if(i==="lan"&&!e){we.msg("Escribe la direcci\xF3n del anfitri\xF3n.",!0);return}we.msg("Conectando\u2026");let t=we.name,n=i==="net"?new Nl:new Ol;n.connect(e).then(function(){if(we.name!==t){n.close();return}Dn=!1,Tn=!1,$e=new Bl(n,ft,{lobby:function(s,r){Zt!=="game"&&Ho(s,r)},start:function(s){If(s)},snap:function(s){ct&&Zt==="game"&&ct.onSnap(s)},back:function(){zo(),$e&&$e.lobby&&Ho($e.lobby,$e.id)},closed:function(s){$e=null,zo(),Gl("mp",{lanOk:dr(),msg:Cf[s]||Cf.lost,err:!0})}})}).catch(function(s){we.msg(Wm(s,!1),!0)})}function ES(){we.name==="lan"&&(we.data.found=[],we.data.scanning=!0,we.data.msg="",we.render(),Bm(function(i){we.name==="lan"&&(we.data.found.push(i),we.render())},function(i){we.name==="lan"&&(we.data.scanning=!1,i||(we.data.msg="No se detect\xF3 una red Wi-Fi. Escribe la direcci\xF3n que muestra el anfitri\xF3n.",we.data.err=!1),we.render())}))}var Rf=performance.now(),kl=0,Ef=0,zl=1,Hl={x:0,z:0};function Pf(i,e){let t=i-Hl.x,n=e-Hl.z;return _t(1.15-Math.sqrt(t*t+n*n)/15,0,1)}Ot.onCue=function(i,e,t){if(Zt!=="game")return;let n=ct&&t===ct.me;Qt.play(i,(n?1:.7)*Pf(e.x,e.z))};function AS(i){if(i.ninjas[ct.me].st!==qt)return ct.me;let t=i.ninjas[ts];if(t&&ts!==ct.me&&t.st===Ne&&(t.team===ct.myTeam||!wS(i)))return ts;for(let n=0;n<i.ninjas.length;n++)if(i.ninjas[n].team===ct.myTeam&&i.ninjas[n].st!==qt)return n;for(let n=0;n<i.ninjas.length;n++)if(i.ninjas[n].st===Ne)return n;return ct.me}function wS(i){for(let e=0;e<i.ninjas.length;e++)if(i.ninjas[e].team===ct.myTeam&&i.ninjas[e].st!==qt)return!0;return!1}var CS=0;function Vl(i){if(CS++>=3)return;let e=pr("errbox");e||(e=document.createElement("div"),e.id="errbox",e.style.cssText="position:absolute;left:8px;right:8px;bottom:8px;z-index:99;background:rgba(120,20,20,.92);color:#fff;font:12px/1.35 monospace;padding:8px 10px;border-radius:8px;pointer-events:none;white-space:pre-wrap;word-break:break-word",document.body.appendChild(e)),e.textContent=`Error del juego (cu\xE9ntaselo a quien te pas\xF3 la app):
`+String(i).slice(0,300),e.style.display="block",setTimeout(function(){e.style.display="none"},12e3)}window.addEventListener("error",function(i){Vl((i&&i.message?i.message:"error")+(i&&i.lineno?" @"+i.lineno+":"+i.colno:""))});window.addEventListener("unhandledrejection",function(i){Vl("promesa: "+(i&&i.reason&&i.reason.message?i.reason.message:i&&i.reason))});function Xm(i){requestAnimationFrame(Xm);try{RS(i)}catch(e){Vl((e&&e.message?e.message:e)+(e&&e.stack?`
`+String(e.stack).split(`
`).slice(1,3).join(`
`):"")),window.console&&console.error(e)}}function RS(i){(window.innerWidth!==Ot.w||window.innerHeight!==Ot.h)&&Wl();let e=(i-Rf)/1e3;if(Rf=i,e>0||(e=.016),e>.1&&(e=.1),Zt==="game"&&ct){let t=ii&&Dn;Ln&&!t&&Ln.advance(e);let n=Xn.read();ii&&(n.mx=0,n.mz=0,n.melee=!1,n.shuriken=!1,n.dash=!1,n.special=!1);let s=ct.frame(t?0:e,n);ts=AS(s);let r=s.ninjas[ts];Hl.x=r.x,Hl.z=r.z;for(let h=0;h<s.events.length;h++){let u=s.events[h];Ot.event(u,s);let f=we.hudEvent(u,s,Ot);if(f){let d=1;u[0]==="fx"?d=Pf(u[2]/100,u[3]/100):typeof u[1]=="number"&&s.ninjas[u[1]]&&(u[0]==="hit"||u[0]==="down"||u[0]==="food"||u[0]==="pick"||u[0]==="drop"||u[0]==="rev")&&(d=Pf(s.ninjas[u[1]].x,s.ninjas[u[1]].z),(u[0]==="pick"||u[0]==="drop")&&(d=Math.max(d,.35))),Qt.play(f,d)}}let o=s.zone,c=o.stage===0&&!o.shrinking,l=s.ninjas[ct.me].st===Ne&&s.phase===1?ct.autoAim(10.2,!0):null;if(Ot.update(s,t?0:e,ts,{sealed:c,target:l,objective:we.objective}),we.hudUpdate(s,Ot,e,ts,$e&&!Tn?$e.ping:null),Qt.setMood(s.phase===1&&!c?2:1),s.end&&!Ss&&(Ss=!0,ns=setTimeout(MS,2200)),!Ln&&s.stale>12&&$e){let h=$e;$e=null,h.close(),zo(),Gl("mp",{lanOk:dr(),msg:Cf.lost,err:!0})}}else Af&&Ot.update(Af,e,-1,{orbit:!0,sealed:!1});if(Ot.render(),kl+=e,Ef++,kl>=3){let t=Ef/kl;kl=0,Ef=0,(t<26||t>=34&&t<46)&&zl>.55&&!document.hidden&&(zl*=.82,Ot.setQuality((ft.hq?1:.7)*zl))}}function Wl(){let i=window.innerWidth,e=window.innerHeight;if(!(i>0&&e>0))return;Ot.resize(i,e,window.devicePixelRatio||1);let t=(navigator.maxTouchPoints||0)>0;pr("rot").classList.toggle("hide",!(t&&i>e&&e<520))}window.addEventListener("resize",Wl);window.addEventListener("orientationchange",function(){setTimeout(Wl,200)});document.addEventListener("visibilitychange",function(){document.hidden?(Qt.suspend(),Zt==="game"&&Dn&&!Ss&&!ii&&(ii=!0,we.data.solo=!0,we.showOverlay("pause"))):(Qt.resume(),Rf=performance.now())});document.addEventListener("pointerdown",function(){Qt.unlock()},!0);["pointerup","touchend","click","keydown"].forEach(function(i){document.addEventListener(i,function(){Qt.unlock()},!0)});document.addEventListener("gesturestart",function(i){i.preventDefault()});document.addEventListener("dblclick",function(i){i.preventDefault()});document.addEventListener("touchmove",function(i){Zt==="game"&&!we.overlay&&we.name!=="results"&&i.preventDefault()},{passive:!1});document.addEventListener("contextmenu",function(i){i.preventDefault()});document.addEventListener("focusout",function(){setTimeout(function(){window.scrollTo(0,0)},60)});window.onAndroidBack=function(){return Zt==="game"?(we.overlay==="phelp"?we.showOverlay("pause"):ii?(ii=!1,we.hide()):we.name==="results"?wf():(ii=!0,Xn.reset(),we.data.solo=Dn,we.showOverlay("pause")),"ok"):Zt==="lobby"?(wf(),"ok"):we.name&&we.name!=="title"?(we.name==="lan"?we.show("mp",{lanOk:dr()}):we.show("title"),"ok"):"exit"};var PS=we.show.bind(we);we.show=function(i,e){i==="mp"&&(e=e||{},e.lanOk=dr(),e.env=km),i==="title"&&(e=e||{},e.iosTip=km==="web"&&xS&&!window.navigator.standalone),i==="opts"&&(e=e||{},e.ver=_S+" \xB7 red "+4),PS(i,e)};Gm();Wl();Gl("title");requestAnimationFrame(Xm);window.__senda={state:function(){return{mode:Zt,screen:we.name,overlay:we.overlay,solo:Dn,isHost:Tn,ended:Ss}},client:function(){return ct},host:function(){return Ln},session:function(){return $e},settings:ft,rend:Ot,reportError:Vl};})();
