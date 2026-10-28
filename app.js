const people = [
  {
    "number": 15,
    "name": "นัท",
    "room": "5/13"
  },
  {
    "number": 16,
    "name": "แก้ม",
    "room": "5/7"
  },
  {
    "number": 17,
    "name": "ปุน",
    "room": "5/10"
  },
  {
    "number": 18,
    "name": "ข้าวจ้าว",
    "room": "4/1"
  },
  {
    "number": 19,
    "name": "แพทตี้",
    "room": "4/2"
  },
  {
    "number": 20,
    "name": "โดนัท",
    "room": "4/2"
  },
  {
    "number": 21,
    "name": "โดนัท",
    "room": "4/5"
  },
  {
    "number": 22,
    "name": "แพน",
    "room": "4/5"
  },
  {
    "number": 23,
    "name": "พลอย",
    "room": "4/6"
  },
  {
    "number": 24,
    "name": "เชียร์",
    "room": "4/7"
  },
  {
    "number": 25,
    "name": "อิม",
    "room": "4/7"
  },
  {
    "number": 26,
    "name": "กีตาร์",
    "room": "4/7"
  },
  {
    "number": 27,
    "name": "แอ๋ม",
    "room": "4/7"
  },
  {
    "number": 28,
    "name": "เกิ้ล",
    "room": "4/16"
  },
  {
    "number": 29,
    "name": "อิค",
    "room": "4/5"
  },
  {
    "number": 30,
    "name": "คิว",
    "room": "4/7"
  },
  {
    "number": 31,
    "name": "ปิ๊ง",
    "room": "4/2"
  },
  {
    "number": 32,
    "name": "ไอริณ",
    "room": "4/3"
  },
  {
    "number": 33,
    "name": "ข้าวปั้น",
    "room": "4/5"
  },
  {
    "number": 34,
    "name": "เว",
    "room": "4/9"
  },
  {
    "number": 35,
    "name": "ฟ้า",
    "room": "4/6"
  },
  {
    "number": 36,
    "name": "อิง",
    "room": "4/15"
  },
  {
    "number": 37,
    "name": "แบม",
    "room": "4/6"
  },
  {
    "number": 38,
    "name": "เติ้ล",
    "room": "4/5"
  },
  {
    "number": 39,
    "name": "ต้นตาล",
    "room": "4/2"
  },
  {
    "number": 40,
    "name": "เอมี่",
    "room": "4/3"
  },
  {
    "number": 41,
    "name": "ออมสิน",
    "room": "4/5"
  },
  {
    "number": 42,
    "name": "ชีตาร์",
    "room": "4/1"
  },
  {
    "number": 43,
    "name": "เอย",
    "room": "4/9"
  },
  {
    "number": 44,
    "name": "เอย",
    "room": "4/6"
  },
  {
    "number": 45,
    "name": "ได๋",
    "room": "4/5"
  },
  {
    "number": 46,
    "name": "อิค",
    "room": "4/1"
  },
  {
    "number": 47,
    "name": "ข้าวหอม",
    "room": "4/9"
  },
  {
    "number": 48,
    "name": "นุช",
    "room": "4/9"
  },
  {
    "number": 49,
    "name": "ปันปัน",
    "room": "4/9"
  },
  {
    "number": 50,
    "name": "ไตเติ้ล",
    "room": "4/2"
  },
  {
    "number": 51,
    "name": "เอิร์ธ",
    "room": "4/5"
  },
  {
    "number": 52,
    "name": "เชค",
    "room": "4/3"
  },
  {
    "number": 53,
    "name": "กัน",
    "room": "4/16"
  },
  {
    "number": 54,
    "name": "อีฟ",
    "room": "4/5"
  },
  {
    "number": 55,
    "name": "ตาล",
    "room": "4/7"
  },
  {
    "number": 56,
    "name": "มิก",
    "room": "4/5"
  },
  {
    "number": 57,
    "name": "ฮาร์ท",
    "room": "4/5"
  },
  {
    "number": 58,
    "name": "อาร์ท",
    "room": "4/2"
  },
  {
    "number": 59,
    "name": "นะโม",
    "room": "4/2"
  },
  {
    "number": 60,
    "name": "เจมส์",
    "room": "4/5"
  },
  {
    "number": 61,
    "name": "เอิน",
    "room": "4/7"
  },
  {
    "number": 62,
    "name": "วิว",
    "room": "4/4"
  },
  {
    "number": 63,
    "name": "ไทม์",
    "room": "4/9"
  },
  {
    "number": 64,
    "name": "เมฆ",
    "room": "4/5"
  },
  {
    "number": 65,
    "name": "แทน",
    "room": "4/4"
  },
  {
    "number": 66,
    "name": "ภูผา",
    "room": "4/9"
  },
  {
    "number": 67,
    "name": "เหนือ",
    "room": "4/8"
  }
];
const policies = [
  {
    "id": "complaint",
    "title": "เว็บไซต์ร้องเรียนและรับฟังความคิดเห็นนักเรียนออนไลน์",
    "category": "การมีส่วนร่วม",
    "summary": "เปิดช่องทางออนไลน์ให้แจ้งปัญหาและข้อเสนอแนะได้ตลอด 24 ชั่วโมง พร้อมรหัสติดตามสถานะ",
    "details": "แนวคิดคือสร้างช่องทางกลางสำหรับแจ้งปัญหาด้านการเรียน ชีวิตในโรงเรียน อาคารสถานที่ สวัสดิการ และกิจกรรม โดยรองรับการไม่ระบุตัวตน มีรหัสติดตามสถานะ และประสานเรื่องไปยังฝ่ายที่เกี่ยวข้อง เป้าหมายคือให้นักเรียนติดตามความคืบหน้าได้ และให้ทีมงานรวบรวมสถิติเพื่อเสนอแนวทางพัฒนาโรงเรียน"
  },
  {
    "id": "wrapping",
    "title": "กระดาษห่อผ้าอนามัย",
    "category": "สุขอนามัยและสิ่งแวดล้อม",
    "summary": "จัดเตรียมกระดาษห่อผ้าอนามัยในห้องน้ำหญิง โดยรับบริจาคกระดาษที่ใช้แล้วด้านเดียว",
    "details": "รับบริจาคกระดาษเหลือใช้ เช่น กระดาษ A4 หน้าเดียวหรือกระดาษสมุดที่ไม่ใช้แล้ว คัดแยกและเตรียมเป็นขนาดเหมาะสม แล้วนำไปวางในจุดที่จัดไว้ภายในห้องน้ำหญิง พร้อมตรวจสอบและเติมกระดาษอย่างสม่ำเสมอ เพื่อช่วยให้ทิ้งได้มิดชิด ถูกสุขลักษณะ และลดการใช้กระดาษใหม่"
  },
  {
    "id": "shortnote",
    "title": "ชีทสรุป Short Note ต่าง ๆ",
    "category": "การเรียนรู้",
    "summary": "รวบรวมและจัดหมวดหมู่ชีทสรุปจากนักเรียน เพื่อช่วยให้ทบทวนบทเรียนและเตรียมสอบสะดวกขึ้น",
    "details": "เชิญชวนนักเรียนที่ต้องการแบ่งปันความรู้ส่งชีทสรุปในรูปแบบดิจิทัล เช่น PDF หรือรูปภาพ คัดกรองความถูกต้องและความเหมาะสม จากนั้นจัดเก็บแยกตามระดับชั้น รายวิชา และบทเรียนในพื้นที่ออนไลน์ เช่น Google Drive เพื่อให้นักเรียนเข้าถึงและทบทวนได้ง่าย"
  },
  {
    "id": "water",
    "title": "ดูแลความสะอาดบริเวณจุดเติมน้ำดื่มของโรงเรียน",
    "category": "สุขอนามัยและสิ่งแวดล้อม",
    "summary": "ตรวจสอบและทำความสะอาดตู้กดน้ำ หัวจ่ายน้ำ และพื้นที่โดยรอบอย่างสม่ำเสมอ",
    "details": "สำรวจจุดเติมน้ำดื่มทุกจุด จัดเตรียมอุปกรณ์ทำความสะอาด ดูแลตู้กดน้ำ หัวจ่ายน้ำ และพื้นที่โดยรอบ พร้อมแจ้งซ่อมเมื่อพบอุปกรณ์ชำรุดหรือปิดไม่มิดชิด จากนั้นติดตามประเมินความสะอาดเป็นระยะ เพื่อช่วยลดความเสี่ยงจากสิ่งปนเปื้อนและเพิ่มความมั่นใจในการใช้น้ำดื่ม"
  },
  {
    "id": "pool",
    "title": "จัดหาอุปกรณ์ไว้เก็บของที่ตกลงไปในสระน้ำ",
    "category": "ความปลอดภัย",
    "summary": "เตรียมอุปกรณ์ที่เหมาะสมสำหรับเก็บลูกบอลหรืออุปกรณ์กีฬาที่ตกลงไปในสระน้ำอย่างปลอดภัย",
    "details": "สำรวจพื้นที่สระน้ำและสิ่งของที่มักตกลงไป เลือกหรือจัดทำอุปกรณ์ที่แข็งแรงและใช้งานง่าย จัดวางไว้ในจุดที่เหมาะสมพร้อมป้ายวิธีใช้และข้อควรระวัง รวมทั้งประชาสัมพันธ์ให้นักเรียนใช้อุปกรณ์อย่างถูกต้อง เพื่อลดความเสี่ยงอุบัติเหตุและลดการสูญหายของอุปกรณ์กีฬา"
  },
  {
    "id": "activities",
    "title": "จัดกิจกรรมที่หลากหลายครอบคลุมทั้งสายวิชาการ สายศิลปะ และสายกีฬา",
    "category": "กิจกรรมโรงเรียน",
    "summary": "ส่งเสริมกิจกรรมที่เปิดโอกาสให้นักเรียนหลายความสนใจได้เข้าร่วม",
    "details": "แนวคิดนโยบายนี้คือการจัดกิจกรรมให้ครอบคลุมทั้งด้านวิชาการ ศิลปะ และกีฬา เพื่อเปิดพื้นที่ให้นักเรียนได้แสดงความสามารถ ทดลองสิ่งใหม่ และมีส่วนร่วมกับกิจกรรมในโรงเรียน รายละเอียดการดำเนินงานเพิ่มเติมยังไม่ได้ระบุไว้ในข้อความนโยบายที่ได้รับ"
  }
];
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function initClassFilter(){const rooms=[...new Set(people.map(p=>p.room))].sort((a,b)=>a.localeCompare(b,"th",{numeric:true}));$("classFilter").innerHTML='<option value="">ทุกห้องเรียน</option>'+rooms.map(r=>'<option value="'+esc(r)+'">ม.'+esc(r)+'</option>').join("")}
function peopleRender(){const q=$("peopleSearch").value.trim().toLocaleLowerCase("th"),room=$("classFilter").value;const list=people.filter(p=>(!room||p.room===room)&&[p.name,p.room,String(p.number)].some(s=>s.toLocaleLowerCase("th").includes(q)));$("peopleEmpty").classList.toggle("hidden",!!list.length);$("peopleGrid").innerHTML=list.map(p=>'<article class="card person"><div class="avatar">'+esc(p.name.slice(0,2))+'</div><span class="pill">สมาชิก</span><h3>'+esc(p.name)+'</h3><p class="person-role">ห้อง ม.'+esc(p.room)+'</p><div class="member-number">หมายเลขสมาชิก '+esc(p.number)+'</div></article>').join("")}
function policyRender(){const q=$("policySearch").value.trim().toLocaleLowerCase("th");const list=policies.filter(p=>[p.title,p.category,p.summary,p.details].some(s=>s.toLocaleLowerCase("th").includes(q)));$("policyEmpty").classList.toggle("hidden",!!list.length);$("policyGrid").innerHTML=list.map(p=>'<article class="card" tabindex="0" role="button" data-policy="'+esc(p.id)+'"><span class="pill">'+esc(p.category)+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.summary)+'</p><div class="card-foot">อ่านรายละเอียดโครงการ ↓</div></article>').join("");document.querySelectorAll("[data-policy]").forEach(el=>{el.onclick=()=>showDetail(el.dataset.policy);el.onkeydown=e=>{if(e.key==="Enter"||e.key===" ") {e.preventDefault();showDetail(el.dataset.policy)}}})}
function showDetail(id){const p=policies.find(x=>x.id===id);if(!p)return;$("detail").innerHTML='<span class="pill">'+esc(p.category)+'</span><h2>'+esc(p.title)+'</h2><p>'+esc(p.summary)+'</p><p>'+esc(p.details)+'</p>';$("detailDialog").showModal()}
$("peopleSearch").addEventListener("input",peopleRender);$("classFilter").addEventListener("change",peopleRender);$("policySearch").addEventListener("input",policyRender);$("menuToggle").onclick=()=>$("nav").classList.toggle("open");document.querySelectorAll("#nav a").forEach(a=>a.onclick=()=>$("nav").classList.remove("open"));initClassFilter();peopleRender();policyRender();