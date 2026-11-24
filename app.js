(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const copy = {
    th: {
      topline: "STUDENT VOICE · SHARED IDEAS · REAL ACTION", toplink: "ส่งเสียงของคุณ <span aria-hidden=\"true\">↗</span>", brandSub: "STUDENT COUNCIL",
      navAbout: "รู้จักเรา", navTeam: "ทีมสภา", navWork: "โครงการ", navNews: "ข่าวสาร", navContact: "ติดต่อ", adminLink: "ผู้ดูแล <span aria-hidden=\"true\">↗</span>",
      heroEyebrow: "สภานักเรียน · โรงเรียนสุรวิทยาคาร", heroTitle: "เสียงของเรา<br>สร้างโรงเรียนที่<span class=\"blue-text\">ดีกว่า</span>", heroLead: "พื้นที่ของนักเรียนทุกคน เพื่อรับฟังความคิด เชื่อมโยงผู้คน และเปลี่ยนข้อเสนอให้เป็นการลงมือทำที่จับต้องได้",
      exploreWork: "สำรวจโครงการ", learnMore: "รู้จักสภานักเรียน", heroFootnote: "รับฟังอย่างตั้งใจ · ทำงานอย่างโปร่งใส · เติบโตไปด้วยกัน", visualNoteOne: "ฟังเสียงนักเรียน", visualNoteTwo: "ลงมือเปลี่ยนแปลง",
      principleOne: "ฟังทุกเสียง", principleOneSub: "รับฟังด้วยความเข้าใจ", principleTwo: "คิดร่วมกัน", principleTwoSub: "เปิดพื้นที่ให้ทุกคนมีส่วนร่วม", principleThree: "ทำให้เกิดขึ้น", principleThreeSub: "สื่อสารความคืบหน้าอย่างโปร่งใส",
      aboutKicker: "รู้จักสภานักเรียน", aboutTitle: "โรงเรียนที่ดีขึ้น<br>เริ่มจาก<span class=\"blue-text\">การร่วมมือ</span>", aboutText: "สภานักเรียนเป็นตัวแทนและพื้นที่กลางของนักเรียน เราประสานความคิดเห็นกับโรงเรียน สนับสนุนกิจกรรม และผลักดันแนวคิดที่ช่วยให้ชีวิตในโรงเรียนดีขึ้นสำหรับทุกคน", shareIdea: "แบ่งปันความคิดกับเรา",
      valueListen: "รับฟัง", valueListenText: "เปิดใจต่อทุกมุมมอง และนำเสียงของนักเรียนไปสื่อสารอย่างสร้างสรรค์", valueConnect: "เชื่อมโยง", valueConnectText: "ทำงานร่วมกันระหว่างนักเรียน คณะครู และชุมชนโรงเรียน", valueAct: "ลงมือทำ", valueActText: "เปลี่ยนไอเดียเป็นกิจกรรมและโครงการ พร้อมอัปเดตผลการดำเนินงาน",
      teamKicker: "ผู้แทนนักเรียน", teamTitle: "ทีมที่พร้อม<br><span class=\"blue-text\">ทำงานเพื่อทุกคน</span>", teamIntro: "พบกับคณะกรรมการสภานักเรียนและทีมงานแต่ละฝ่าย เราทำงานร่วมกันเพื่อให้ความคิดของนักเรียนเดินหน้าได้จริง", teamTail: "โครงสร้างคณะกรรมการ",
      workKicker: "โครงการและกิจกรรม", workTitle: "ไอเดียที่กำลัง<br><span class=\"blue-text\">เกิดขึ้นจริง</span>", workIntro: "ติดตามโครงการ กิจกรรม และประเด็นที่สภานักเรียนกำลังผลักดัน", workTail: "โครงการของสภานักเรียน", suggestProject: "เสนอไอเดียโครงการ ↗",
      newsKicker: "อัปเดตจากเรา", newsTitle: "ข่าวสารและ<br><span class=\"blue-text\">เรื่องราวในโรงเรียน</span>", newsIntro: "ความเคลื่อนไหวล่าสุดจากสภานักเรียนและกิจกรรมที่ชวนทุกคนมามีส่วนร่วม", galleryKicker: "ภาพกิจกรรม", galleryTitle: "ช่วงเวลาที่เรา<br><span class=\"blue-text\">สร้างไปด้วยกัน</span>", galleryIntro: "บันทึกภาพกิจกรรมและบรรยากาศการทำงานของสภานักเรียน",
      contactKicker: "ร่วมส่งเสียง", contactTitle: "มีไอเดียหรือ<br>อยากบอกอะไรกับเรา<span class=\"blue-text\">ไหม?</span>", contactText: "ทุกความคิดเห็นช่วยให้เราเข้าใจสิ่งที่นักเรียนต้องการมากขึ้น ส่งข้อเสนอแนะหรือคำถามถึงทีมสภานักเรียนได้ที่นี่", contactAside: "ข้อความของคุณจะถูกส่งถึงทีมสภานักเรียน",
      formName: "ชื่อที่ต้องการให้เราเรียก", formEmail: "อีเมล (ถ้าต้องการให้ติดต่อกลับ)", formTopic: "หัวข้อ", selectTopic: "เลือกหัวข้อ", topicSuggestion: "ข้อเสนอแนะ", topicQuestion: "สอบถาม", topicProject: "เสนอไอเดียโครงการ", formMessage: "ข้อความ", sendMessage: "ส่งข้อความ", privacyNote: "ใช้ข้อมูลเท่าที่จำเป็นเพื่ออ่านข้อความและติดต่อกลับตามที่คุณร้องขอ", footerLine: "รับฟังทุกเสียง สร้างโรงเรียนไปด้วยกัน",
      noTeam: "ยังไม่มีข้อมูลคณะกรรมการที่เผยแพร่", noProjects: "ยังไม่มีโครงการที่เผยแพร่", noNews: "กำลังเตรียมข่าวสารจากสภานักเรียน", noGallery: "กำลังเตรียมภาพกิจกรรม", readMore: "อ่านเพิ่มเติม", sendSuccess: "ส่งข้อความเรียบร้อยแล้ว ขอบคุณที่ร่วมแสดงความคิดเห็น", sendError: "ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", setupContact: "แบบฟอร์มจะพร้อมใช้งานหลังตั้งค่า Supabase ของเว็บไซต์", projectCategory: "โครงการ", committeeFallback: "สภานักเรียน", upcoming: "กำลังดำเนินการ"
    },
    en: {
      topline: "STUDENT VOICE · SHARED IDEAS · REAL ACTION", toplink: "Share your voice <span aria-hidden=\"true\">↗</span>", brandSub: "STUDENT COUNCIL",
      navAbout: "About", navTeam: "Our team", navWork: "Projects", navNews: "Updates", navContact: "Contact", adminLink: "Admin <span aria-hidden=\"true\">↗</span>",
      heroEyebrow: "Student Council · Surawittayakarn School", heroTitle: "Our voices<br>make school <span class=\"blue-text\">better</span>", heroLead: "A space for every student to share ideas, connect with one another, and turn thoughtful suggestions into action.",
      exploreWork: "Explore projects", learnMore: "Meet the student council", heroFootnote: "Listen with care · Work transparently · Grow together", visualNoteOne: "Listen to students", visualNoteTwo: "Make change happen",
      principleOne: "Listen to every voice", principleOneSub: "Lead with understanding", principleTwo: "Think together", principleTwoSub: "Make room for everyone", principleThree: "Take action", principleThreeSub: "Share progress openly",
      aboutKicker: "About the council", aboutTitle: "A better school<br>starts with <span class=\"blue-text\">working together</span>", aboutText: "The student council represents students and gives them a place to be heard. We connect ideas with the school, support activities, and champion changes that make school life better for everyone.", shareIdea: "Share an idea with us",
      valueListen: "Listen", valueListenText: "We welcome different perspectives and bring student voices forward constructively.", valueConnect: "Connect", valueConnectText: "We work together with students, teachers, and the wider school community.", valueAct: "Take action", valueActText: "We turn ideas into activities and projects, then share our progress.",
      teamKicker: "Student representatives", teamTitle: "A team ready to<br><span class=\"blue-text\">work for everyone</span>", teamIntro: "Meet the student council and its working groups. Together, we help student ideas move forward.", teamTail: "Council structure",
      workKicker: "Projects & activities", workTitle: "Ideas becoming<br><span class=\"blue-text\">real change</span>", workIntro: "Follow the projects, activities, and issues the student council is working on.", workTail: "Student council projects", suggestProject: "Suggest a project ↗",
      newsKicker: "From the council", newsTitle: "News and<br><span class=\"blue-text\">school stories</span>", newsIntro: "The latest updates from the student council and activities for everyone to join.", galleryKicker: "Photo gallery", galleryTitle: "Moments we<br><span class=\"blue-text\">make together</span>", galleryIntro: "A look back at student council activities and the people behind them.",
      contactKicker: "Join the conversation", contactTitle: "Have an idea<br>or something to tell us<span class=\"blue-text\">?</span>", contactText: "Every message helps us understand what students need. Send a suggestion or question to the student council here.", contactAside: "Your message will be sent to the student council team",
      formName: "What should we call you?", formEmail: "Email (if you'd like a reply)", formTopic: "Topic", selectTopic: "Choose a topic", topicSuggestion: "Suggestion", topicQuestion: "Question", topicProject: "Project idea", formMessage: "Message", sendMessage: "Send message", privacyNote: "We only use the information needed to read your message and reply when requested.", footerLine: "Every voice matters. Let's build a better school together.",
      noTeam: "No council profiles have been published yet.", noProjects: "No projects have been published yet.", noNews: "Student council updates are coming soon.", noGallery: "Activity photos are coming soon.", readMore: "Read more", sendSuccess: "Message sent. Thank you for sharing your thoughts.", sendError: "Message could not be sent. Please try again.", setupContact: "The form will be available once Supabase is configured for this website.", projectCategory: "Project", committeeFallback: "Student Council", upcoming: "In progress"
    }
  };

  const demo = {
    council_members: [],
    committees: [
      { id: "group-1", name: "ประธานและคณะกรรมการ", name_en: "Council leadership", description: "ประสานงานภาพรวมและเป็นตัวแทนสื่อสารความคิดเห็นของนักเรียน", description_en: "Coordinate the council and represent student perspectives.", sort_order: 1 },
      { id: "group-2", name: "ฝ่ายกิจกรรม", name_en: "Activities team", description: "สนับสนุนกิจกรรมที่เปิดโอกาสให้นักเรียนได้มีส่วนร่วม", description_en: "Create activities that invite students to take part.", sort_order: 2 },
      { id: "group-3", name: "ฝ่ายสื่อสารและประชาสัมพันธ์", name_en: "Communications team", description: "แบ่งปันข่าวสาร รับฟังข้อเสนอแนะ และอัปเดตความคืบหน้า", description_en: "Share updates, collect ideas, and communicate progress.", sort_order: 3 }
    ],
    projects: [
      { id: "idea-1", title: "ช่องทางรับฟังความคิดเห็นนักเรียน", title_en: "Student voice and feedback", category: "การมีส่วนร่วม", category_en: "Participation", summary: "เปิดพื้นที่ให้นักเรียนส่งปัญหา คำถาม และข้อเสนอแนะถึงสภานักเรียน", summary_en: "A place for students to send questions, concerns, and ideas to the council.", status: "กำลังดำเนินการ", status_en: "In progress", sort_order: 1 },
      { id: "idea-2", title: "คลังแบ่งปันสรุปบทเรียน", title_en: "Shared study notes", category: "การเรียนรู้", category_en: "Learning", summary: "รวบรวมสรุปบทเรียนจากนักเรียน เพื่อแบ่งปันและทบทวนร่วมกัน", summary_en: "Collect student-made notes to share and learn from one another.", status: "แนวคิด", status_en: "Idea", sort_order: 2 },
      { id: "idea-3", title: "กิจกรรมหลากหลายสำหรับทุกความสนใจ", title_en: "Activities for every interest", category: "กิจกรรม", category_en: "Activities", summary: "สนับสนุนพื้นที่ให้ความสนใจทั้งด้านวิชาการ ศิลปะ และกีฬา", summary_en: "Make room for academic, creative, and sports interests.", status: "แนวคิด", status_en: "Idea", sort_order: 3 }
    ],
    news: [],
    gallery: []
  };

  let language = localStorage.getItem("sc-language") === "en" ? "en" : "th";
  const config = window.SC_SUPABASE_CONFIG || {};
  const hasSupabase = Boolean(window.supabase?.createClient && config.url && config.anonKey);
  const client = hasSupabase ? window.supabase.createClient(config.url, config.anonKey) : null;
  const langValue = (item, base) => language === "en" ? (item[`${base}_en`] || item[base] || "") : (item[base] || "");

  function applyLanguage() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach(node => {
      const value = copy[language][node.dataset.i18n];
      if (value !== undefined) node.innerHTML = value;
    });
    const toggle = $("#languageToggle");
    if (toggle) toggle.textContent = language === "th" ? "EN" : "TH";
    renderAll();
  }

  async function loadCollection(table) {
    if (!client) return demo[table] || [];
    const orderColumn = table === "news" ? "published_at" : "sort_order";
    const { data, error } = await client.from(table).select("*").eq("is_published", true).order(orderColumn, { ascending: table !== "news", nullsFirst: false });
    if (error) {
      console.warn(`Could not load ${table}:`, error.message);
      return [];
    }
    return data || [];
  }

  function emptyCard(message, className = "content-empty") { return `<div class="${className}">${escapeHtml(message)}</div>`; }
  function renderCommittees(items, members) {
    const entries = [
      ...members.map(item => ({ ...item, entryType: "member" })),
      ...items.map(item => ({ ...item, entryType: "committee" }))
    ].sort((a,b) => (a.sort_order || 0) - (b.sort_order || 0));
    const grid = $("#committeeGrid");
    if (!grid) return;
    if (!entries.length) { grid.innerHTML = emptyCard(copy[language].noTeam); return; }
    grid.innerHTML = entries.map((item,index) => {
      const title = item.entryType === "member" ? langValue(item,"full_name") : langValue(item,"name");
      const subtitle = item.entryType === "member" ? [langValue(item,"role_title"),item.class_name ? `${language === "en" ? "Class" : "ม."} ${item.class_name}` : ""].filter(Boolean).join(" · ") : langValue(item,"description");
      const photo = item.entryType === "member" ? validImageUrl(item.photo_url) : "";
      const symbol = item.entryType === "member" ? (title || "SC").slice(0,2) : ["◎","⌘","↗"][index % 3];
      const ordinal = String(index + 1).padStart(2,"0");
      return `<article class="committee-card"><div class="committee-top"><span class="committee-symbol ${photo ? "has-photo" : ""}">${photo ? `<img src="${escapeHtml(photo)}" alt="">` : escapeHtml(symbol)}</span><span class="committee-order">${ordinal} / ${item.entryType === "member" ? "COUNCIL" : "TEAM"}</span></div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(subtitle)}</p></article>`;
    }).join("");
  }

  function renderProjects(items) {
    const grid = $("#projectGrid");
    if (!grid) return;
    if (!items.length) { grid.innerHTML = emptyCard(copy[language].noProjects); return; }
    grid.innerHTML = items.map((item,index) => {
      const title = langValue(item,"title");
      const summary = langValue(item,"summary");
      const category = langValue(item,"category") || copy[language].projectCategory;
      const status = langValue(item,"status") || copy[language].upcoming;
      return `<article class="project-card"><div class="project-meta"><span class="project-index">PROJECT / ${String(index+1).padStart(2,"0")}</span><span class="project-category">${escapeHtml(category)}</span></div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(summary)}</p><div class="project-foot"><span class="project-status">${escapeHtml(status)}</span><button class="project-link" type="button" data-project="${escapeHtml(item.id)}"><span>${escapeHtml(copy[language].readMore)}</span><span>↗</span></button></div></article>`;
    }).join("");
    grid.querySelectorAll("[data-project]").forEach(button => button.addEventListener("click",() => showProject(items.find(item => String(item.id) === button.dataset.project))));
  }

  function showProject(item) {
    if (!item) return;
    const title = langValue(item,"title");
    const category = langValue(item,"category") || copy[language].projectCategory;
    const summary = langValue(item,"summary");
    const body = langValue(item,"body") || summary;
    const status = langValue(item,"status") || copy[language].upcoming;
    $("#projectDetail").innerHTML = `<span class="pill">${escapeHtml(category)}</span><h2 id="projectDialogTitle">${escapeHtml(title)}</h2><p class="project-dialog-summary">${escapeHtml(summary)}</p><p class="project-dialog-body-copy">${escapeHtml(body)}</p><span class="project-dialog-status">${escapeHtml(status)}</span>`;
    $("#projectDialog").showModal();
  }

  function renderNews(items) {
    const grid = $("#newsGrid");
    if (!grid) return;
    if (!items.length) { grid.innerHTML = emptyCard(copy[language].noNews,"news-empty"); return; }
    grid.innerHTML = items.slice(0,3).map(item => {
      const image = validImageUrl(item.image_url);
      const date = item.published_at ? new Intl.DateTimeFormat(language === "th" ? "th-TH" : "en-US", { year: "numeric", month: "short", day: "numeric" }).format(new Date(item.published_at)) : "";
      const title = langValue(item,"title");
      const excerpt = langValue(item,"excerpt");
      return `<article class="news-card"><div class="news-image">${image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">` : `<span class="news-image-mark">SC</span>`}</div><div class="news-content"><span class="news-date">${escapeHtml(date)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(excerpt)}</p></div></article>`;
    }).join("");
  }

  function validImageUrl(value) {
    if (!value) return "";
    try { const url = new URL(value, location.href); return ["https:","http:"].includes(url.protocol) ? url.href : ""; } catch { return ""; }
  }

  function renderGallery(items) {
    const grid = $("#galleryGrid");
    if (!grid) return;
    if (!items.length) { grid.innerHTML = emptyCard(copy[language].noGallery); return; }
    grid.innerHTML = items.slice(0,5).map(item => {
      const image = validImageUrl(item.image_url);
      const title = langValue(item,"title") || item.alt_text || "";
      const alt = language === "en" ? (item.alt_text_en || item.alt_text || title) : (item.alt_text || title);
      return `<figure class="gallery-card">${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(alt)}" loading="lazy">` : `<span class="gallery-placeholder" aria-hidden="true">SC</span>`}<figcaption class="gallery-caption">${escapeHtml(title)}</figcaption></figure>`;
    }).join("");
  }

  async function renderAll() {
    const [members, committees, projects, news, gallery] = await Promise.all([
      loadCollection("council_members"), loadCollection("committees"), loadCollection("projects"), loadCollection("news"), loadCollection("gallery")
    ]);
    renderCommittees(committees,members);
    renderProjects(projects);
    renderNews(news);
    renderGallery(gallery);
  }

  const menuToggle = $("#menuToggle");
  menuToggle?.addEventListener("click", () => {
    const nav = $("#siteNav");
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  document.querySelectorAll("#siteNav a").forEach(link => link.addEventListener("click", () => {
    $("#siteNav")?.classList.remove("open"); menuToggle?.setAttribute("aria-expanded","false");
  }));
  $("#languageToggle")?.addEventListener("click", () => {
    language = language === "th" ? "en" : "th";
    localStorage.setItem("sc-language",language);
    applyLanguage();
  });
  $("#year").textContent = String(new Date().getFullYear());

  $("#contactForm")?.addEventListener("submit", async event => {
    event.preventDefault();
    const status = $("#contactStatus");
    if (!client) { status.textContent = copy[language].setupContact; return; }
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim() || null,
      topic: String(formData.get("topic") || ""),
      message: String(formData.get("message") || "").trim()
    };
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    status.textContent = "…";
    const { error } = await client.from("contact_messages").insert(payload);
    button.disabled = false;
    if (error) { console.error(error); status.textContent = copy[language].sendError; return; }
    form.reset();
    status.textContent = copy[language].sendSuccess;
  });

  applyLanguage();
})();
