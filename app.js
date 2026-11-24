(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

  const copy = {
    th: {
      topline: "STUDENT VOICE · SHARED IDEAS · REAL ACTION", toplink: "ส่งเสียงของคุณ <span aria-hidden=\"true\">↗</span>", brandSub: "STUDENT COUNCIL",
      navAbout: "รู้จักเรา", navTeam: "ทีมสภา", navWork: "โครงการ", navNews: "ข่าวสาร", navContact: "ติดต่อ",
      heroEyebrow: "สภานักเรียน · โรงเรียนสุรวิทยาคาร", heroTitle: "เสียงของเรา<br>สร้างโรงเรียนที่<span class=\"blue-text\">ดีกว่า</span>", heroLead: "พื้นที่ของนักเรียนทุกคน เพื่อรับฟังความคิด เชื่อมโยงผู้คน และเปลี่ยนข้อเสนอให้เป็นการลงมือทำที่จับต้องได้",
      exploreWork: "สำรวจโครงการ", learnMore: "รู้จักสภานักเรียน", heroFootnote: "รับฟังอย่างตั้งใจ · ทำงานอย่างโปร่งใส · เติบโตไปด้วยกัน", visualNoteOne: "ฟังเสียงนักเรียน", visualNoteTwo: "ลงมือเปลี่ยนแปลง",
      principleOne: "ฟังทุกเสียง", principleOneSub: "รับฟังด้วยความเข้าใจ", principleTwo: "คิดร่วมกัน", principleTwoSub: "เปิดพื้นที่ให้ทุกคนมีส่วนร่วม", principleThree: "ทำให้เกิดขึ้น", principleThreeSub: "สื่อสารความคืบหน้าอย่างโปร่งใส",
      aboutKicker: "รู้จักสภานักเรียน", aboutTitle: "โรงเรียนที่ดีขึ้น<br>เริ่มจาก<span class=\"blue-text\">การร่วมมือ</span>", aboutText: "สภานักเรียนเป็นตัวแทนและพื้นที่กลางของนักเรียน เราประสานความคิดเห็นกับโรงเรียน สนับสนุนกิจกรรม และผลักดันแนวคิดที่ช่วยให้ชีวิตในโรงเรียนดีขึ้นสำหรับทุกคน", shareIdea: "แบ่งปันความคิดกับเรา",
      valueListen: "รับฟัง", valueListenText: "เปิดใจต่อทุกมุมมอง และนำเสียงของนักเรียนไปสื่อสารอย่างสร้างสรรค์", valueConnect: "เชื่อมโยง", valueConnectText: "ทำงานร่วมกันระหว่างนักเรียน คณะครู และชุมชนโรงเรียน", valueAct: "ลงมือทำ", valueActText: "เปลี่ยนไอเดียเป็นกิจกรรมและโครงการ พร้อมอัปเดตผลการดำเนินงาน",
      teamKicker: "ผู้แทนนักเรียน", teamTitle: "ทีมที่พร้อม<br><span class=\"blue-text\">ทำงานเพื่อทุกคน</span>", teamIntro: "พบกับคณะกรรมการสภานักเรียนและทีมงานแต่ละฝ่าย เราทำงานร่วมกันเพื่อให้ความคิดของนักเรียนเดินหน้าได้จริง", teamTail: "โครงสร้างคณะกรรมการ",
      workKicker: "โครงการและกิจกรรม", workTitle: "ไอเดียที่กำลัง<br><span class=\"blue-text\">เกิดขึ้นจริง</span>", workIntro: "ติดตามโครงการ กิจกรรม และประเด็นที่สภานักเรียนกำลังผลักดัน", workTail: "โครงการของสภานักเรียน", suggestProject: "เสนอไอเดียโครงการ ↗",
      newsKicker: "อัปเดตจากเรา", newsTitle: "ข่าวสารและ<br><span class=\"blue-text\">เรื่องราวในโรงเรียน</span>", newsIntro: "ความเคลื่อนไหวล่าสุดจากสภานักเรียนและกิจกรรมที่ชวนทุกคนมามีส่วนร่วม", galleryKicker: "ภาพกิจกรรม", galleryTitle: "ช่วงเวลาที่เรา<br><span class=\"blue-text\">สร้างไปด้วยกัน</span>", galleryIntro: "บันทึกภาพกิจกรรมและบรรยากาศการทำงานของสภานักเรียน",
      contactKicker: "ร่วมส่งเสียง", contactTitle: "มีไอเดียหรือ<br>อยากบอกอะไรกับเรา<span class=\"blue-text\">ไหม?</span>", contactText: "ทุกความคิดเห็นช่วยให้เราเข้าใจสิ่งที่นักเรียนต้องการมากขึ้น ช่องทางติดต่อจะประกาศเมื่อพร้อมให้บริการ", contactAside: "ทุกเสียงช่วยให้โรงเรียนดีขึ้นได้",
      contactCardLabel: "OPEN CHANNEL · COMING SOON", contactCardTitle: "พื้นที่รับฟังความคิดเห็น", contactCardText: "ช่องทางติดต่อของสภานักเรียนจะประกาศที่นี่เมื่อพร้อมให้บริการ", contactCardBottom: "VOICE · IDEAS · ACTION",
      noTeam: "ยังไม่มีข้อมูลคณะกรรมการที่เผยแพร่", noProjects: "ยังไม่มีโครงการที่เผยแพร่", noNews: "กำลังเตรียมข่าวสารจากสภานักเรียน", noGallery: "กำลังเตรียมภาพกิจกรรม", readMore: "อ่านรายละเอียด", projectCategory: "โครงการ", upcoming: "กำลังดำเนินการ", projectIdea: "แนวคิดโครงการ"
    },
    en: {
      topline: "STUDENT VOICE · SHARED IDEAS · REAL ACTION", toplink: "Share your voice <span aria-hidden=\"true\">↗</span>", brandSub: "STUDENT COUNCIL",
      navAbout: "About", navTeam: "Our team", navWork: "Projects", navNews: "Updates", navContact: "Contact",
      heroEyebrow: "Student Council · Surawittayakarn School", heroTitle: "Our voices<br>make school <span class=\"blue-text\">better</span>", heroLead: "A space for every student to share ideas, connect with one another, and turn thoughtful suggestions into action.",
      exploreWork: "Explore projects", learnMore: "Meet the student council", heroFootnote: "Listen with care · Work transparently · Grow together", visualNoteOne: "Listen to students", visualNoteTwo: "Make change happen",
      principleOne: "Listen to every voice", principleOneSub: "Lead with understanding", principleTwo: "Think together", principleTwoSub: "Make room for everyone", principleThree: "Take action", principleThreeSub: "Share progress openly",
      aboutKicker: "About the council", aboutTitle: "A better school<br>starts with <span class=\"blue-text\">working together</span>", aboutText: "The student council represents students and gives them a place to be heard. We connect ideas with the school, support activities, and champion changes that make school life better for everyone.", shareIdea: "Share an idea with us",
      valueListen: "Listen", valueListenText: "We welcome different perspectives and bring student voices forward constructively.", valueConnect: "Connect", valueConnectText: "We work together with students, teachers, and the wider school community.", valueAct: "Take action", valueActText: "We turn ideas into activities and projects, then share our progress.",
      teamKicker: "Student representatives", teamTitle: "A team ready to<br><span class=\"blue-text\">work for everyone</span>", teamIntro: "Meet the student council and its working groups. Together, we help student ideas move forward.", teamTail: "Council structure",
      workKicker: "Projects & activities", workTitle: "Ideas becoming<br><span class=\"blue-text\">real change</span>", workIntro: "Follow the projects, activities, and issues the student council is working on.", workTail: "Student council projects", suggestProject: "Suggest a project ↗",
      newsKicker: "From the council", newsTitle: "News and<br><span class=\"blue-text\">school stories</span>", newsIntro: "The latest updates from the student council and activities for everyone to join.", galleryKicker: "Photo gallery", galleryTitle: "Moments we<br><span class=\"blue-text\">make together</span>", galleryIntro: "A look back at student council activities and the people behind them.",
      contactKicker: "Join the conversation", contactTitle: "Have an idea<br>or something to tell us<span class=\"blue-text\">?</span>", contactText: "Every message helps us understand what students need. Contact channels will be announced when they are ready.", contactAside: "Every voice can help make school better",
      contactCardLabel: "OPEN CHANNEL · COMING SOON", contactCardTitle: "A space to be heard", contactCardText: "Student council contact channels will be announced here when available.", contactCardBottom: "VOICE · IDEAS · ACTION",
      noTeam: "No council profiles have been published yet.", noProjects: "No projects have been published yet.", noNews: "Student council updates are coming soon.", noGallery: "Activity photos are coming soon.", readMore: "Read details", projectCategory: "Project", upcoming: "In progress", projectIdea: "Project idea"
    }
  };

  const committees = [
    { name: "ประธานและคณะกรรมการ", name_en: "Council leadership", description: "ประสานงานภาพรวมและเป็นตัวแทนสื่อสารความคิดเห็นของนักเรียน", description_en: "Coordinate the council and represent student perspectives." },
    { name: "ฝ่ายกิจกรรม", name_en: "Activities team", description: "สนับสนุนกิจกรรมที่เปิดโอกาสให้นักเรียนได้มีส่วนร่วม", description_en: "Create activities that invite students to take part." },
    { name: "ฝ่ายสื่อสารและประชาสัมพันธ์", name_en: "Communications team", description: "แบ่งปันข่าวสาร รับฟังข้อเสนอแนะ และอัปเดตความคืบหน้า", description_en: "Share updates, collect ideas, and communicate progress." }
  ];

  const projects = [
    { title: "เว็บไซต์รับฟังความคิดเห็นและแจ้งปัญหานักเรียน", title_en: "Student feedback and issue reporting", category: "การมีส่วนร่วม", category_en: "Participation", summary: "ช่องทางให้นักเรียนส่งปัญหาและข้อเสนอแนะ พร้อมระบบติดตามความคืบหน้า", summary_en: "A place for students to share concerns and ideas, with a way to follow progress.", body: "รวบรวมประเด็นด้านการเรียน อาคารสถานที่ สวัสดิการ และกิจกรรม พร้อมประสานงานกับฝ่ายที่เกี่ยวข้องและแจ้งความคืบหน้าให้ผู้ส่งทราบ", body_en: "Collect learning, facilities, welfare, and activity concerns, coordinate with the relevant teams, and share progress with students.", status: "แนวคิดโครงการ", status_en: "Project idea" },
    { title: "กระดาษห่อผ้าอนามัย", title_en: "Sanitary product disposal supplies", category: "สุขอนามัยและสิ่งแวดล้อม", category_en: "Wellbeing", summary: "พิจารณาวัสดุที่เหมาะสมสำหรับจุดบริการในห้องน้ำ", summary_en: "Consider suitable materials for selected restroom locations.", body: "ตรวจสอบวัสดุและขั้นตอนที่เหมาะสมกับสุขอนามัยร่วมกับโรงเรียน ก่อนจัดเตรียมและดูแลจุดบริการ", body_en: "Review suitable materials and hygienic procedures with the school before setting up and maintaining the service.", status: "แนวคิดโครงการ", status_en: "Project idea" },
    { title: "คลังแบ่งปันชีทสรุป Short Note", title_en: "Shared short-note library", category: "การเรียนรู้", category_en: "Learning", summary: "รวบรวมชีทสรุปจากนักเรียนเพื่อแบ่งปันและทบทวนบทเรียน", summary_en: "Collect and organize student-made notes for revision.", body: "เปิดรับสรุปบทเรียนในรูปแบบดิจิทัล ตรวจสอบความเหมาะสม และจัดหมวดหมู่ตามระดับชั้น รายวิชา และบทเรียน", body_en: "Collect digital study notes, review them for suitability, and organize them by grade, subject, and lesson.", status: "แนวคิดโครงการ", status_en: "Project idea" },
    { title: "ดูแลความสะอาดบริเวณจุดเติมน้ำดื่ม", title_en: "Water station cleanliness", category: "สุขอนามัยและสิ่งแวดล้อม", category_en: "Wellbeing", summary: "ตรวจดูความสะอาดของตู้กดน้ำ จุดเติมน้ำ และพื้นที่โดยรอบ", summary_en: "Check the cleanliness of drinking-water stations and nearby areas.", body: "ตรวจสอบจุดเติมน้ำอย่างสม่ำเสมอ ประสานงานเมื่อพบอุปกรณ์ชำรุด และติดตามการดูแลรักษาร่วมกับโรงเรียน", body_en: "Inspect water stations regularly, report damaged equipment, and coordinate maintenance with the school.", status: "แนวคิดโครงการ", status_en: "Project idea" },
    { title: "อุปกรณ์ช่วยเก็บสิ่งของบริเวณสระน้ำ", title_en: "Poolside retrieval equipment", category: "ความปลอดภัย", category_en: "Safety", summary: "พิจารณาอุปกรณ์สำหรับเก็บสิ่งของโดยไม่เสี่ยงลงไปในน้ำ", summary_en: "Consider safe equipment for retrieving objects without entering the water.", body: "สำรวจพื้นที่และข้อกำหนดด้านความปลอดภัย เลือกอุปกรณ์ที่เหมาะสม พร้อมวิธีใช้และการจัดเก็บที่ชัดเจน", body_en: "Review the area and safety requirements, then select suitable equipment with clear use and storage instructions.", status: "แนวคิดโครงการ", status_en: "Project idea" },
    { title: "กิจกรรมหลากหลายสำหรับทุกความสนใจ", title_en: "Activities for every interest", category: "กิจกรรมโรงเรียน", category_en: "School activities", summary: "สนับสนุนกิจกรรมด้านวิชาการ ศิลปะ และกีฬาให้ครอบคลุมความสนใจของนักเรียน", summary_en: "Support academic, arts, and sports activities for a range of student interests.", body: "สำรวจความสนใจของนักเรียนและร่วมวางแผนกิจกรรมที่เปิดโอกาสให้หลายกลุ่มได้เข้าร่วม", body_en: "Ask students about their interests and plan activities that welcome a wide range of participants.", status: "แนวคิดโครงการ", status_en: "Project idea" }
  ];

  let language = localStorage.getItem("sc-language") === "en" ? "en" : "th";
  let revealObserver;
  const localized = (item,key) => language === "en" ? (item[`${key}_en`] || item[key] || "") : (item[key] || "");

  function animateOnScroll() {
    revealObserver?.disconnect();
    const targets = document.querySelectorAll(".hero-copy,.hero-visual,.principles-band > div,.section-heading,.value-card,.committee-card,.project-card,.news-card,.gallery-card,.contact-card");
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduceMotion) {
      targets.forEach(el => el.classList.add("is-visible"));
      return;
    }
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -30px 0px" });
    targets.forEach((el,index) => {
      el.classList.add("reveal");
      el.style.setProperty("--reveal-delay",`${Math.min(index % 6,5) * 65}ms`);
      revealObserver.observe(el);
    });
  }

  function renderCommittees() {
    const grid = $("#committeeGrid");
    if (!grid) return;
    grid.innerHTML = committees.map((item,index) => `<article class="committee-card"><div class="committee-top"><span class="committee-symbol">${["◎","⌘","↗"][index % 3]}</span><span class="committee-order">${String(index+1).padStart(2,"0")} / TEAM</span></div><h3>${escapeHtml(localized(item,"name"))}</h3><p>${escapeHtml(localized(item,"description"))}</p></article>`).join("");
  }

  function renderProjects() {
    const grid = $("#projectGrid");
    if (!grid) return;
    grid.innerHTML = projects.map((item,index) => `<article class="project-card"><div class="project-meta"><span class="project-index">PROJECT / ${String(index+1).padStart(2,"0")}</span><span class="project-category">${escapeHtml(localized(item,"category"))}</span></div><h3>${escapeHtml(localized(item,"title"))}</h3><p>${escapeHtml(localized(item,"summary"))}</p><div class="project-foot"><span class="project-status">${escapeHtml(localized(item,"status"))}</span><button class="project-link" type="button" data-project="${index}"><span>${escapeHtml(copy[language].readMore)}</span><span>↗</span></button></div></article>`).join("");
    grid.querySelectorAll("[data-project]").forEach(button => button.addEventListener("click",() => showProject(projects[Number(button.dataset.project)])));
  }

  function renderNews() {
    const grid = $("#newsGrid");
    if (grid) grid.innerHTML = `<div class="news-empty">${escapeHtml(copy[language].noNews)}</div>`;
  }

  function renderGallery() {
    const grid = $("#galleryGrid");
    if (grid) grid.innerHTML = `<div class="content-empty">${escapeHtml(copy[language].noGallery)}</div>`;
  }

  function showProject(item) {
    if (!item) return;
    $("#projectDetail").innerHTML = `<span class="pill">${escapeHtml(localized(item,"category"))}</span><h2 id="projectDialogTitle">${escapeHtml(localized(item,"title"))}</h2><p class="project-dialog-summary">${escapeHtml(localized(item,"summary"))}</p><p class="project-dialog-body-copy">${escapeHtml(localized(item,"body"))}</p><span class="project-dialog-status">${escapeHtml(localized(item,"status"))}</span>`;
    $("#projectDialog").showModal();
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach(node => {
      const value = copy[language][node.dataset.i18n];
      if (value !== undefined) node.innerHTML = value;
    });
    const toggle = $("#languageToggle");
    if (toggle) toggle.textContent = language === "th" ? "EN" : "TH";
    renderCommittees();
    renderProjects();
    renderNews();
    renderGallery();
    animateOnScroll();
  }

  const menuToggle = $("#menuToggle");
  menuToggle?.addEventListener("click",() => {
    const nav = $("#siteNav");
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded",String(isOpen));
  });
  document.querySelectorAll("#siteNav a").forEach(link => link.addEventListener("click",() => {
    $("#siteNav")?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded","false");
  }));
  $("#languageToggle")?.addEventListener("click",() => {
    language = language === "th" ? "en" : "th";
    localStorage.setItem("sc-language",language);
    applyLanguage();
  });
  $("#year").textContent = String(new Date().getFullYear());
  applyLanguage();
})();
