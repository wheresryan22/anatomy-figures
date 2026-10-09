"use client";
var $=`precision highp float;
uniform vec2 uCanvas;
uniform vec2 uView;
uniform vec2 uOrigin;
uniform float uK;
uniform vec4 uCam;
uniform float uTime;
vec2 viewOf(vec2 frag){return vec2(frag.x,uCanvas.y-frag.y)*(uView.x/uCanvas.x);}
vec2 project(vec3 p){return uOrigin+uK*vec2(p.x*uCam.x-p.y*uCam.y,(p.x*uCam.y+p.y*uCam.x)*uCam.z-p.z*uCam.w);}
vec3 towardViewer(){return vec3(uCam.y*uCam.w,uCam.x*uCam.w,uCam.z);}
vec3 rayOf(vec2 vb){vec2 q=(vb-uOrigin)/uK;return vec3(q.x*uCam.x,-q.x*uCam.y,-q.y/uCam.w);}
float pixelOf(){return (uView.x/uCanvas.x)/uK;}
vec3 lightDir(){return normalize(vec3(-uCam.x,uCam.y,1.2));}
vec3 onFloor(vec2 vb,float h){vec2 q=(vb-uOrigin)/uK;float b=(q.y+h*uCam.w)/uCam.z;return vec3(q.x*uCam.x+b*uCam.y,-q.x*uCam.y+b*uCam.x,h);}
vec3 onWallY(vec2 vb,float y){vec2 q=(vb-uOrigin)/uK;float x=(q.x+y*uCam.y)/uCam.x;return vec3(x,y,((x*uCam.y+y*uCam.x)*uCam.z-q.y)/uCam.w);}
vec3 onWallX(vec2 vb,float x){vec2 q=(vb-uOrigin)/uK;float y=(x*uCam.x-q.x)/uCam.y;return vec3(x,y,((x*uCam.y+y*uCam.x)*uCam.z-q.y)/uCam.w);}
float hash12(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float hash13(vec3 p){p=fract(p*.1031);p+=dot(p,p.zyx+31.32);return fract((p.x+p.y)*p.z);}
float noise2(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash12(i),hash12(i+vec2(1.,0.)),f.x),mix(hash12(i+vec2(0.,1.)),hash12(i+vec2(1.,1.)),f.x),f.y);}
float noise3(vec3 p){vec3 i=floor(p);vec3 f=fract(p);f=f*f*(3.-2.*f);
  float a=mix(mix(hash13(i),hash13(i+vec3(1.,0.,0.)),f.x),mix(hash13(i+vec3(0.,1.,0.)),hash13(i+vec3(1.,1.,0.)),f.x),f.y);
  float b=mix(mix(hash13(i+vec3(0.,0.,1.)),hash13(i+vec3(1.,0.,1.)),f.x),mix(hash13(i+vec3(0.,1.,1.)),hash13(i+vec3(1.,1.,1.)),f.x),f.y);
  return mix(a,b,f.z);}
float fbm2(vec2 p){float s=0.;float a=.5;for(int i=0;i<4;i++){s+=a*noise2(p);p=p*2.07+vec2(17.1,9.2);a*=.5;}return s/.9375;}
float fbm3(vec3 p){float s=0.;float a=.5;for(int i=0;i<4;i++){s+=a*noise3(p);p=p*2.07+vec3(17.1,9.2,4.7);a*=.5;}return s/.9375;}
float window(float x,float a,float b,float soft){return smoothstep(a-soft,a+soft,x)*(1.-smoothstep(b-soft,b+soft,x));}
vec3 tonemap(vec3 c,float exposure){return 1.-exp(-c*exposure);}
`,S=`uniform vec3 uGroupX;
uniform vec3 uGroupY;
uniform vec3 uGroupZ;
uniform vec3 uGroupT;
uniform vec3 uCoverEdge[60];
uniform float uCoverCount[6];
vec3 toGroup(vec3 p){vec3 q=p-uGroupT;return vec3(dot(q,uGroupX),dot(q,uGroupY),dot(q,uGroupZ));}
vec3 toWorld(vec3 g){return uGroupT+g.x*uGroupX+g.y*uGroupY+g.z*uGroupZ;}
vec3 dirToGroup(vec3 d){return vec3(dot(d,uGroupX),dot(d,uGroupY),dot(d,uGroupZ));}
vec3 dirToWorld(vec3 d){return d.x*uGroupX+d.y*uGroupY+d.z*uGroupZ;}
float coverOf(vec2 vb,float soft){float c=0.;for(int p=0;p<6;p++){float n=uCoverCount[p];float inside=-1e4;for(int e=0;e<10;e++){if(float(e)>=n)break;vec3 h=uCoverEdge[p*10+e];inside=max(inside,h.x*vb.x+h.y*vb.y+h.z);}if(n>0.)c=max(c,1.-smoothstep(-soft,soft,inside));}return c;}
`;function z(t,r=`u${t}`){return`uniform vec3 ${r}X;uniform vec3 ${r}Y;uniform vec3 ${r}Z;uniform vec3 ${r}T;
vec3 to${t}(vec3 p){vec3 q=p-${r}T;return vec3(dot(q,${r}X),dot(q,${r}Y),dot(q,${r}Z));}
vec3 from${t}(vec3 g){return ${r}T+g.x*${r}X+g.y*${r}Y+g.z*${r}Z;}
vec3 dirTo${t}(vec3 d){return vec3(dot(d,${r}X),dot(d,${r}Y),dot(d,${r}Z));}
vec3 dirFrom${t}(vec3 d){return d.x*${r}X+d.y*${r}Y+d.z*${r}Z;}
`}var M="attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";function E({canvas:t,fragment:r,view:s,camera:a,uniforms:h=[],fixed:m={},extensions:v=[],maxRatio:l=1.5,onError:d=e=>console.error(e)}){let e=t.getContext("webgl",{premultipliedAlpha:!0,alpha:!0,antialias:!1,preserveDrawingBuffer:!1});if(!e)return null;let g=(n,o)=>{let u=e.createShader(n);return e.shaderSource(u,o),e.compileShader(u),e.getShaderParameter(u,e.COMPILE_STATUS)?u:(d(e.getShaderInfoLog(u)),null)},C=g(e.VERTEX_SHADER,M),y=v.filter(n=>e.getExtension(n.replace(/^GL_/,""))),b=g(e.FRAGMENT_SHADER,y.map(n=>`#extension ${n} : enable
`).join("")+$+r);if(!C||!b)return null;let i=e.createProgram();if(e.attachShader(i,C),e.attachShader(i,b),e.linkProgram(i),!e.getProgramParameter(i,e.LINK_STATUS))return d(e.getProgramInfoLog(i)),null;e.useProgram(i);let A=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);let w=e.getAttribLocation(i,"p");e.enableVertexAttribArray(w),e.vertexAttribPointer(w,2,e.FLOAT,!1,0,0);let q={};for(let n of["uCanvas","uView","uOrigin","uK","uCam","uTime",...h,...Object.keys(m)])q[n]=e.getUniformLocation(i,n);let T={},G=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let n=0;n<G;n++){let o=e.getActiveUniform(i,n);o&&(T[o.name.replace(/\[0\]$/,"")]=o.type)}let p=!1,O=()=>{let n=t.getBoundingClientRect(),o=Math.min(l,window.devicePixelRatio||1),u=Math.max(1,Math.round(n.width*o)),c=Math.max(1,Math.round(n.height*o));(t.width!==u||t.height!==c)&&(t.width=u,t.height=c)},f=(n,o)=>{let u=q[n];if(u!=null)if(typeof o=="number")e.uniform1f(u,o);else if(o.length>4){let c=o instanceof Float32Array?o:new Float32Array(o),x=T[n];x===e.FLOAT_VEC2?e.uniform2fv(u,c):x===e.FLOAT_VEC3?e.uniform3fv(u,c):x===e.FLOAT_VEC4?e.uniform4fv(u,c):e.uniform1fv(u,c)}else o.length===1?e.uniform1f(u,o[0]):o.length===2?e.uniform2f(u,o[0],o[1]):o.length===3?e.uniform3f(u,o[0],o[1],o[2]):o.length===4&&e.uniform4f(u,o[0],o[1],o[2],o[3])};for(let[n,o]of Object.entries(m))f(n,o);return{gl:e,extensions:y,set(n={}){for(let[o,u]of Object.entries(n))f(o,u)},draw(n={},o=0){O(),e.viewport(0,0,t.width,t.height),f("uCanvas",[t.width,t.height]),f("uView",s),f("uOrigin",a.origin),f("uK",a.k),f("uCam",a.cam),f("uTime",o);for(let[u,c]of Object.entries(n))f(u,c);e.drawArrays(e.TRIANGLES,0,3),p=!0},clear(){p&&(e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),p=!1)}}}var R=(t,r,s)=>{let a=Math.min(1,Math.max(0,(s-t)/(r-t)));return a*a*(3-2*a)},L=(t,r,s)=>t>0?R(0,r,t)*Math.exp(-Math.max(0,t-r)/s):0;function F(t,r,s,a,h=!1){if(h)return t.x=r,t.v=0,!1;let m=1/a;for(let v=0;v<4;v++){let l=s/4;t.v+=(m*m*(r-t.x)-2*m*t.v)*l,t.x+=t.v*l}return Math.abs(r-t.x)<1e-4&&Math.abs(t.v)<1e-4?(t.x=r,t.v=0,!1):!0}export{S as a,z as b,E as c,R as d,L as e,F as f};
