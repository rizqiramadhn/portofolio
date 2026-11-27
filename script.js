/*
  HUBUNGKAN GOOGLE SHEETS:
  1. Buat spreadsheet dan satu tab bernama Portfolio.
  2. Isi header sesuai README.md.
  3. File > Share > Publish to web, pilih tab Portfolio dan format CSV.
  4. Tempel URL CSV hasil publish di bawah.
  Website tetap punya konten contoh jika URL kosong atau sheet gagal dimuat.
*/
const SHEET_CSV_URL = ""; // contoh: https://docs.google.com/spreadsheets/d/e/XXXXX/pub?gid=0&single=true&output=csv

const fallback = [
  {section:"hero",title:"Ali Hamza",subtitle:"Software Engineer & Full-Stack Developer",description:"Saya membangun produk digital yang menyelesaikan masalah nyata dan menciptakan dampak bermakna. Dari ide hingga deployment, saya mengubah tantangan kompleks menjadi solusi yang sederhana dan indah.",link:"#",image:""},
  {section:"about",description:"Bersemangat menciptakan solusi yang bersih, efisien, dan scalable dengan pengalaman pengguna yang baik. Saya senang bekerja dengan teknologi yang mendorong web ke depan."},
  ...["JavaScript","TypeScript","React.js","Next.js","Node.js","MongoDB","Tailwind CSS","Git & GitHub","More"].map((title,i)=>({section:"skill",title,icon:["</>","TS","⚛","Ⓝ","JS","◉","≋","⑂","•••"][i],order:i})),
  {section:"project",title:"BigBrains",description:"Platform e-learning dengan kursus interaktif, analitik, dan pembayaran.",image:"",link:"#",meta:"Next.js · TypeScript · Tailwind"},
  {section:"project",title:"BoardInsight Lahore",description:"Dashboard visualisasi data untuk hasil BISE Lahore (2016–2025).",image:"",link:"#",meta:"Next.js · Recharts · Node.js"},
  {section:"project",title:"PGS Learning App",description:"Aplikasi belajar aman dengan proteksi DRM dan akses berbasis role.",image:"",link:"#",meta:"Next.js · MongoDB · Stripe"},
  {section:"experience",title:"Web Developer",subtitle:"CodeWingz",description:"Membangun aplikasi web dan dashboard admin yang scalable untuk klien.",meta:"2024 – Present",icon:"▣"},
  {section:"experience",title:"Full Stack Intern",subtitle:"Various Projects",description:"Mengerjakan proyek real-world dan API menggunakan MERN stack.",meta:"2023 – 2024",icon:"⌘"},
  {section:"experience",title:"Freelance Developer",subtitle:"Self Employed",description:"Mengembangkan website dan solusi untuk startup dan bisnis.",meta:"2022 – 2023",icon:"♙"},
  ...[["Discover","Memahami masalah secara mendalam.","⌕"],["Design","Merencanakan dan merancang solusi.","✎"],["Develop","Menulis clean code dan membangun fitur.","</>"],["Deploy","Menguji secara menyeluruh dan meluncurkan.","♧"],["Improve","Memantau, mengiterasi, dan meningkatkan.","▥"]].map((x,i)=>({section:"process",title:x[0],description:x[1],icon:x[2],meta:String(i+1).padStart(2,"0"),order:i})),
  {section:"contact",title:"Email",subtitle:"hello@example.com",link:"mailto:hello@example.com",icon:"✉"},
  {section:"contact",title:"WhatsApp",subtitle:"+62 000 0000 0000",link:"https://wa.me/62000000000",icon:"⌕"},
  {section:"contact",title:"Location",subtitle:"Bandung, Indonesia",icon:"⌖"},
  {section:"social",title:"GitHub",link:"https://github.com/",icon:"⌘"},
  {section:"social",title:"LinkedIn",link:"https://linkedin.com/",icon:"in"},
  {section:"social",title:"Twitter",link:"https://x.com/",icon:"♥"},
  {section:"social",title:"Email",link:"mailto:hello@example.com",icon:"✉"}
];

function parseCSV(text){
  const rows=[];let row=[],cell="",quoted=false;
  for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];
    if(c==='"'&&quoted&&n==='"'){cell+='"';i++}
    else if(c==='"')quoted=!quoted;
    else if(c===","&&!quoted){row.push(cell);cell=""}
    else if((c==="\n"||c==="\r")&&!quoted){if(c==="\r"&&n==="\n")i++;row.push(cell);if(row.some(v=>v.trim()))rows.push(row);row=[];cell=""}
    else cell+=c;
  }
  row.push(cell);if(row.some(v=>v.trim()))rows.push(row);
  if(!rows.length)return [];
  const headers=rows.shift().map(h=>h.trim().toLowerCase());
  return rows.map(r=>Object.fromEntries(headers.map((h,i)=>[h,(r[i]||"").trim()])));
}
const bySection=(data,name)=>data.filter(x=>x.section?.toLowerCase()===name).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
function setText(id,value){if(value)document.getElementById(id).textContent=value}
function safeLink(url){return /^(https?:|mailto:|tel:|#)/i.test(url||"")?url:"#"}
// Ubah link berbagi Google Drive menjadi URL thumbnail untuk elemen <img>.
function imageUrl(url){
  if(!url) return "";
  const value=url.trim();
  let id="";
  const patterns=[
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/uc\?.*?id=([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/thumbnail\?.*?id=([a-zA-Z0-9_-]+)/
  ];
  for(const pattern of patterns){const match=value.match(pattern);if(match){id=match[1];break}}
  if(id) return `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
  return value;
}
function render(data){
  const hero=bySection(data,"hero")[0]||{};
  const fullName=hero.title||"Your Name", parts=fullName.trim().split(/\s+/), first=parts.shift()||"", rest=parts.join(" ");
  const h=document.getElementById("hero-name");h.replaceChildren(document.createTextNode(first+" "));const accent=el("span","",rest);h.append(accent);
  setText("hero-role",hero.subtitle);setText("hero-description",hero.description);setText("footer-name",fullName);
  document.title=`${fullName} — Portfolio`;
  const cv=document.getElementById("cv-button");cv.href=safeLink(hero.link);if(!hero.link||hero.link==="#")cv.hidden=true;
  const heroImg=document.getElementById("hero-image");if(hero.image){heroImg.src=imageUrl(hero.image);heroImg.hidden=false;document.querySelector(".art-placeholder").hidden=true}
  const about=bySection(data,"about")[0]||{};setText("about-description",about.description);
  if(about.image){const img=document.getElementById("about-image");img.src=imageUrl(about.image);img.hidden=false;document.querySelector(".about-placeholder").hidden=true}
  const skills=document.getElementById("skills-list");skills.replaceChildren();
  bySection(data,"skill").forEach(x=>{const card=el("div","skill-card");card.append(el("span","skill-icon",x.icon||"✳"),el("span","",x.title));skills.append(card)});
  const projects=document.getElementById("projects-list");projects.replaceChildren();
  bySection(data,"project").forEach(x=>{const card=el("article","project-card"),visual=el("div","project-image");
    if(x.image){const img=el("img");img.src=imageUrl(x.image);img.alt=x.title||"Project";img.loading="lazy";visual.append(img)}else visual.append(el("span","project-fallback","▧"));
    const body=el("div","project-body"),title=el("h3");title.append(document.createTextNode(x.title||"Project"));
    if(x.link){const a=el("a","","↗");a.href=safeLink(x.link);a.target="_blank";a.rel="noreferrer";title.append(a)}
    body.append(title,el("p","",x.description||""),el("div","project-meta",x.meta||""));card.append(visual,body);projects.append(card)});
  const exp=document.getElementById("experience-list");exp.replaceChildren();
  bySection(data,"experience").forEach(x=>{const card=el("article","experience-card");card.append(el("div","experience-icon",x.icon||"▣"));const body=el("div");
    body.append(el("div","experience-period",x.meta||""),el("h3","",x.title||""),el("div","experience-company",x.subtitle||""),el("p","",x.description||""));card.append(body);exp.append(card)});
  const process=document.getElementById("process-list");process.replaceChildren();
  bySection(data,"process").forEach((x,i)=>{const card=el("article","process-card");card.append(el("div","process-icon",x.icon||"✳"),el("div","process-number",x.meta||String(i+1).padStart(2,"0")),el("h3","",x.title||""),el("p","",x.description||""));process.append(card)});
  const contacts=bySection(data,"contact"),contactList=document.getElementById("contact-list");contactList.replaceChildren();
  contacts.forEach(x=>{const a=el(x.link?"a":"div","", "");if(x.link)a.href=safeLink(x.link);a.append(el("span","",x.icon||"✳"),el("span","",x.subtitle||x.title||""));contactList.append(a)});
  const socials=document.getElementById("social-list");socials.replaceChildren();
  bySection(data,"social").forEach(x=>{const a=el("a","","");a.href=safeLink(x.link);a.target="_blank";a.rel="noreferrer";a.title=x.title||"Social";a.setAttribute("aria-label",a.title);a.textContent=x.icon||x.title?.slice(0,2)||"↗";socials.append(a)});
}
async function init(){
  render(fallback);
  if(SHEET_CSV_URL){try{const response=await fetch(SHEET_CSV_URL,{cache:"no-store"});if(!response.ok)throw new Error("Sheet tidak bisa diakses");const rows=parseCSV(await response.text());if(rows.length)render(rows)}catch(error){console.warn("Menggunakan konten contoh:",error)}}
  document.getElementById("year").textContent=new Date().getFullYear();
}
const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false")}));
init();
