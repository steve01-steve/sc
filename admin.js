(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const schema = {
    projects: { table: "projects", title: "โครงการ", fields: [
      { key: "title", label: "ชื่อโครงการ (ไทย)", required: true }, { key: "title_en", label: "ชื่อโครงการ (English)" }, { key: "category", label: "หมวดหมู่ (ไทย)" }, { key: "category_en", label: "หมวดหมู่ (English)" },
      { key: "summary", label: "คำอธิบายสั้น (ไทย)", type: "textarea", wide: true }, { key: "summary_en", label: "คำอธิบายสั้น (English)", type: "textarea", wide: true }, { key: "body", label: "รายละเอียด (ไทย)", type: "textarea", wide: true }, { key: "body_en", label: "รายละเอียด (English)", type: "textarea", wide: true }, { key: "status", label: "สถานะ (ไทย)" }, { key: "status_en", label: "สถานะ (English)" }, { key: "image_url", label: "ภาพโครงการ", type: "image", wide: true }, { key: "sort_order", label: "ลำดับ", type: "number" }, { key: "is_published", label: "เผยแพร่บนเว็บไซต์", type: "checkbox" }
    ] },
    members: { table: "council_members", title: "คณะกรรมการ", fields: [
      { key: "full_name", label: "ชื่อ (ไทย)", required: true }, { key: "full_name_en", label: "ชื่อ (English)" }, { key: "role_title", label: "ตำแหน่ง (ไทย)" }, { key: "role_title_en", label: "ตำแหน่ง (English)" }, { key: "class_name", label: "ห้องเรียน" }, { key: "photo_url", label: "ภาพบุคคล", type: "image", wide: true }, { key: "bio", label: "แนะนำตัว (ไทย)", type: "textarea", wide: true }, { key: "bio_en", label: "แนะนำตัว (English)", type: "textarea", wide: true }, { key: "sort_order", label: "ลำดับ", type: "number" }, { key: "is_published", label: "เผยแพร่บนเว็บไซต์", type: "checkbox" }
    ] },
    committees: { table: "committees", title: "ฝ่ายงาน", fields: [
      { key: "name", label: "ชื่อฝ่าย (ไทย)", required: true }, { key: "name_en", label: "ชื่อฝ่าย (English)" }, { key: "description", label: "รายละเอียด (ไทย)", type: "textarea", wide: true }, { key: "description_en", label: "รายละเอียด (English)", type: "textarea", wide: true }, { key: "sort_order", label: "ลำดับ", type: "number" }, { key: "is_published", label: "เผยแพร่บนเว็บไซต์", type: "checkbox" }
    ] },
    news: { table: "news", title: "ข่าวสาร", fields: [
      { key: "title", label: "หัวข้อ (ไทย)", required: true }, { key: "title_en", label: "หัวข้อ (English)" }, { key: "excerpt", label: "ข้อความสรุป (ไทย)", type: "textarea", wide: true }, { key: "excerpt_en", label: "ข้อความสรุป (English)", type: "textarea", wide: true }, { key: "body", label: "เนื้อหา (ไทย)", type: "textarea", wide: true }, { key: "body_en", label: "เนื้อหา (English)", type: "textarea", wide: true }, { key: "image_url", label: "ภาพข่าว", type: "image", wide: true }, { key: "published_at", label: "วันที่เผยแพร่", type: "datetime-local" }, { key: "is_published", label: "เผยแพร่บนเว็บไซต์", type: "checkbox" }
    ] },
    gallery: { table: "gallery", title: "แกลเลอรี", fields: [
      { key: "title", label: "คำบรรยาย (ไทย)", required: true }, { key: "title_en", label: "คำบรรยาย (English)" }, { key: "image_url", label: "ภาพกิจกรรม", type: "image", required: true, wide: true }, { key: "alt_text", label: "คำอธิบายภาพ (ไทย)" }, { key: "alt_text_en", label: "คำอธิบายภาพ (English)" }, { key: "album", label: "อัลบั้ม" }, { key: "sort_order", label: "ลำดับ", type: "number" }, { key: "is_published", label: "เผยแพร่บนเว็บไซต์", type: "checkbox" }
    ] }
  };

  const config = window.SC_SUPABASE_CONFIG || {};
  const ready = Boolean(window.supabase?.createClient && config.url && config.anonKey);
  const client = ready ? window.supabase.createClient(config.url, config.anonKey) : null;
  let user = null;
  let profile = null;
  let currentView = "projects";
  let editingRecord = null;
  let cachedRows = [];
  const editor = $("#editorDialog");

  function setStatus(message, target = "#contentStatus", isError = false) {
    const el = $(target); if (!el) return;
    el.textContent = message;
    el.style.color = isError ? "#a74b4b" : "";
  }
  function roleLabel(role) { return ({ super_admin: "Super Admin", admin: "Admin", editor: "Editor" })[role] || "รออนุมัติ"; }
  function canManageContent() { return ["super_admin","admin"].includes(profile?.role); }
  function canEdit() { return ["super_admin","admin","editor"].includes(profile?.role) && profile?.is_active; }

  function showLogin(message = "") {
    $("#loginView").classList.remove("hidden");
    $("#dashboardView").classList.add("hidden");
    setStatus(message,"#loginStatus",Boolean(message));
  }
  function showDashboard() {
    $("#loginView").classList.add("hidden");
    $("#dashboardView").classList.remove("hidden");
    $("#signedInAs").textContent = user?.email || "";
    $("#currentRole").textContent = roleLabel(profile.role);
    if (profile.role === "super_admin") document.querySelectorAll(".super-admin-only").forEach(node => node.classList.remove("hidden"));
    $("#createButton").classList.toggle("hidden",!canEdit() || ["messages","users"].includes(currentView));
  }

  async function openSession(session) {
    if (!session?.user) { user = null; profile = null; showLogin(); return; }
    user = session.user;
    const { data, error } = await client.from("profiles").select("id,display_name,email,role,is_active").eq("id",user.id).maybeSingle();
    if (error || !data || !data.is_active) {
      await client.auth.signOut();
      user = null; profile = null;
      showLogin("บัญชีนี้ยังไม่ได้รับสิทธิ์เข้าใช้งาน โปรดติดต่อ Super Admin");
      return;
    }
    profile = data;
    showDashboard();
    await loadView(currentView);
  }

  function selectView(view) {
    currentView = view;
    document.querySelectorAll("#dashboardNav button").forEach(button => button.classList.toggle("active",button.dataset.view === view));
    const title = view === "users" ? "บัญชีผู้ดูแล" : view === "messages" ? "ข้อความติดต่อ" : schema[view]?.title || "จัดการเว็บไซต์";
    $("#contentTitle").textContent = title;
    $("#contentEyebrow").textContent = view === "users" ? "ACCOUNT ACCESS" : view === "messages" ? "INCOMING MESSAGES" : "PUBLISHED CONTENT";
    $("#createButton").classList.toggle("hidden",!canEdit() || ["messages","users"].includes(view));
  }

  async function loadView(view) {
    selectView(view);
    setStatus("กำลังโหลดข้อมูล…");
    $("#contentList").innerHTML = "";
    if (!client) return;
    if (view === "users") return loadUsers();
    if (view === "messages") return loadMessages();
    const definition = schema[view];
    if (!definition) return;
    const orderColumn = view === "news" ? "published_at" : "sort_order";
    const { data, error } = await client.from(definition.table).select("*").order(orderColumn,{ascending:view !== "news",nullsFirst:false});
    if (error) { setStatus("โหลดรายการไม่สำเร็จ: " + error.message,"#contentStatus",true); return; }
    cachedRows = data || [];
    renderRows(view,cachedRows);
  }

  function renderRows(view, rows) {
    const list = $("#contentList");
    if (!rows.length) { list.innerHTML = `<div class="content-empty">ยังไม่มีรายการ เพิ่มเนื้อหาใหม่ได้จากปุ่มด้านบน</div>`; setStatus(""); return; }
    const definition = schema[view];
    list.innerHTML = rows.map(item => {
      const titleKey = view === "members" ? "full_name" : "title";
      const title = item[titleKey] || item.name || "(ไม่มีชื่อ)";
      const subtitle = item.role_title || item.summary || item.description || item.category || item.excerpt || item.image_url || "";
      const badge = item.is_published ? `<span class="status-badge">เผยแพร่</span>` : `<span class="status-badge draft">ฉบับร่าง</span>`;
      const actions = `<div class="row-actions">${canEdit() ? `<button type="button" data-edit="${escapeHtml(item.id)}">แก้ไข</button>` : ""}${canManageContent() ? `<button type="button" class="danger" data-delete="${escapeHtml(item.id)}">ลบ</button>` : ""}</div>`;
      return `<article class="content-row"><div><h3>${badge}${escapeHtml(title)}</h3><p>${escapeHtml(subtitle)}</p></div>${actions}</article>`;
    }).join("");
    list.querySelectorAll("[data-edit]").forEach(button => button.addEventListener("click",() => openEditor(rows.find(row => row.id === button.dataset.edit))));
    list.querySelectorAll("[data-delete]").forEach(button => button.addEventListener("click",() => deleteRow(definition,button.dataset.delete)));
    setStatus(`${rows.length} รายการ`);
  }

  async function loadMessages() {
    if (!canManageContent()) { setStatus("คุณไม่มีสิทธิ์ดูข้อความติดต่อ","#contentStatus",true); return; }
    const { data, error } = await client.from("contact_messages").select("*").order("created_at",{ascending:false});
    if (error) { setStatus("โหลดข้อความไม่สำเร็จ: " + error.message,"#contentStatus",true); return; }
    const list = $("#contentList");
    if (!data?.length) { list.innerHTML = `<div class="content-empty">ยังไม่มีข้อความติดต่อ</div>`; setStatus(""); return; }
    list.innerHTML = data.map(item => {
      const when = item.created_at ? new Date(item.created_at).toLocaleString("th-TH") : "";
      const action = item.status === "new" ? `<button type="button" data-message="${escapeHtml(item.id)}" data-status="reviewed">ทำเครื่องหมายว่าอ่านแล้ว</button>` : item.status === "reviewed" ? `<button type="button" data-message="${escapeHtml(item.id)}" data-status="closed">ปิดเรื่อง</button>` : `<span class="status-badge">ปิดเรื่อง</span>`;
      return `<article class="content-row message-row"><div><h3>${escapeHtml(item.name)} · ${escapeHtml(item.topic)}</h3><p class="message-content">${escapeHtml(item.message)}</p><p class="message-meta">${escapeHtml(item.email || "ไม่ระบุอีเมล")} · ${escapeHtml(when)}</p></div><div class="row-actions">${action}</div></article>`;
    }).join("");
    list.querySelectorAll("[data-message]").forEach(button => button.addEventListener("click",() => updateMessageStatus(button.dataset.message,button.dataset.status)));
    setStatus(`${data.length} ข้อความ`);
  }

  async function updateMessageStatus(id,status) {
    const { error } = await client.from("contact_messages").update({status}).eq("id",id);
    if (error) { setStatus("อัปเดตสถานะไม่สำเร็จ: " + error.message,"#contentStatus",true); return; }
    await loadMessages();
  }

  async function loadUsers() {
    if (profile?.role !== "super_admin") { setStatus("เฉพาะ Super Admin เท่านั้น","#contentStatus",true); return; }
    const { data, error } = await client.from("profiles").select("id,display_name,email,role,is_active,created_at").order("created_at",{ascending:false});
    if (error) { setStatus("โหลดบัญชีไม่สำเร็จ: " + error.message,"#contentStatus",true); return; }
    const list = $("#contentList");
    if (!data?.length) { list.innerHTML = `<div class="content-empty">ยังไม่มีบัญชีผู้ดูแล</div>`; return; }
    list.innerHTML = data.map(item => `<article class="content-row user-row" data-user="${escapeHtml(item.id)}"><div><h3>${escapeHtml(item.display_name || item.email || "ผู้ใช้")}</h3><p>${escapeHtml(item.email || "")}</p></div><select class="role-select" aria-label="บทบาท" data-user-id="${escapeHtml(item.id)}"><option value="editor" ${item.role === "editor" ? "selected" : ""}>Editor</option><option value="admin" ${item.role === "admin" ? "selected" : ""}>Admin</option><option value="super_admin" ${item.role === "super_admin" ? "selected" : ""}>Super Admin</option></select><label class="active-control"><input type="checkbox" data-active-id="${escapeHtml(item.id)}" ${item.is_active ? "checked" : ""}> ใช้งาน</label><span class="row-actions"><button type="button" data-save-user="${escapeHtml(item.id)}">บันทึก</button></span></article>`).join("");
    list.querySelectorAll("[data-save-user]").forEach(button => button.addEventListener("click",() => saveUser(button.dataset.saveUser)));
    setStatus(`${data.length} บัญชี`);
  }

  async function saveUser(id) {
    const row = $(`[data-user="${CSS.escape(id)}"]`);
    const targetRole = $(".role-select",row).value;
    const targetActive = $(".active-control input",row).checked;
    if (id === user.id && (!targetActive || targetRole !== "super_admin")) {
      setStatus("ไม่สามารถลดสิทธิ์หรือปิดบัญชี Super Admin ที่กำลังใช้งานอยู่","#contentStatus",true); return;
    }
    const { error } = await client.rpc("set_user_role",{target_profile_id:id,target_role:targetRole,target_active:targetActive});
    if (error) { setStatus("บันทึกสิทธิ์ไม่สำเร็จ: " + error.message,"#contentStatus",true); return; }
    setStatus("บันทึกสิทธิ์แล้ว");
    await loadUsers();
  }

  function openEditor(record = null) {
    if (!canEdit() || !schema[currentView]) return;
    const definition = schema[currentView];
    editingRecord = record;
    $("#editorTitle").textContent = record ? "แก้ไขรายการ" : "เพิ่มรายการใหม่";
    $("#editorStatus").textContent = "";
    const fields = $("#editorFields");
    fields.innerHTML = definition.fields.map(field => {
      const value = record?.[field.key] ?? (field.key === "is_published" ? false : field.key === "sort_order" ? 0 : "");
      const className = `${field.wide ? "full-width" : ""} ${field.type === "checkbox" ? "check-field" : ""}`;
      if (field.type === "checkbox") return `<label class="${className}"><input name="${field.key}" type="checkbox" ${value ? "checked" : ""} ${profile?.role === "editor" ? "disabled" : ""}>${escapeHtml(field.label)}${profile?.role === "editor" ? " (เผยแพร่ได้โดย Admin)" : ""}</label>`;
      if (field.type === "image") return `<label class="${className}">${escapeHtml(field.label)}<input name="${field.key}" type="url" value="${escapeHtml(value)}" ${field.required ? "required" : ""} placeholder="https://..."><input type="file" data-upload-for="${field.key}" accept="image/jpeg,image/png,image/webp,image/gif" aria-label="อัปโหลด${escapeHtml(field.label)}"></label>`;
      const type = field.type || "text";
      let displayValue = value;
      if (type === "datetime-local" && value) displayValue = new Date(value).toISOString().slice(0,16);
      if (type === "textarea") return `<label class="${className}">${escapeHtml(field.label)}<textarea name="${field.key}" ${field.required ? "required" : ""} maxlength="5000">${escapeHtml(displayValue)}</textarea></label>`;
      return `<label class="${className}">${escapeHtml(field.label)}<input name="${field.key}" type="${type}" value="${escapeHtml(displayValue)}" ${field.required ? "required" : ""} ${field.type === "number" ? "min=\"0\" step=\"1\"" : ""} ${field.type === "url" ? "placeholder=\"https://...\"" : ""}></label>`;
    }).join("");
    if (profile?.role === "editor") {
      const publish = fields.querySelector('[name="is_published"]');
      if (publish) publish.checked = false;
    }
    editor.showModal();
  }

  async function saveEditor(event) {
    event.preventDefault();
    const definition = schema[currentView];
    if (!definition) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    setStatus("กำลังบันทึก…","#editorStatus");
    const payload = {};
    for (const field of definition.fields) {
      if (field.type === "checkbox") payload[field.key] = profile?.role === "editor" ? false : Boolean(formData.has(field.key));
      else {
        let value = String(formData.get(field.key) ?? "").trim();
        if (field.type === "image") {
          const file = $(`[data-upload-for="${CSS.escape(field.key)}"]`,form).files?.[0];
          if (file) {
            if (!["image/jpeg","image/png","image/webp","image/gif"].includes(file.type) || file.size > 5 * 1024 * 1024) {
              button.disabled = false; setStatus("เลือกไฟล์ JPG, PNG, WebP หรือ GIF ขนาดไม่เกิน 5 MB","#editorStatus",true); return;
            }
            const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g,"-");
            const path = `${user.id}/${Date.now()}-${safeName}`;
            const { error:uploadError } = await client.storage.from("sc-media").upload(path,file,{contentType:file.type,upsert:false});
            if (uploadError) { button.disabled = false; setStatus("อัปโหลดภาพไม่สำเร็จ: " + uploadError.message,"#editorStatus",true); return; }
            value = client.storage.from("sc-media").getPublicUrl(path).data.publicUrl;
          }
        }
        if (field.type === "number") value = value === "" ? 0 : Number(value);
        if (field.type === "datetime-local") value = value ? new Date(value).toISOString() : null;
        if (field.key === "status" && !value) value = "แนวคิด";
        if (field.key === "status_en" && !value) value = "Idea";
        if (field.key === "sort_order" && !Number.isFinite(value)) value = 0;
        if (field.type === "datetime-local" && !value) continue;
        payload[field.key] = value === "" ? null : value;
      }
    }
    const query = editingRecord
      ? client.from(definition.table).update(payload).eq("id",editingRecord.id)
      : client.from(definition.table).insert(payload);
    const { error } = await query;
    button.disabled = false;
    if (error) { setStatus("บันทึกไม่สำเร็จ: " + error.message,"#editorStatus",true); return; }
    editor.close();
    await loadView(currentView);
  }

  async function deleteRow(definition,id) {
    if (!canManageContent() || !window.confirm("ลบรายการนี้ออกจากเว็บไซต์หรือไม่?")) return;
    const { error } = await client.from(definition.table).delete().eq("id",id);
    if (error) { setStatus("ลบรายการไม่สำเร็จ: " + error.message,"#contentStatus",true); return; }
    await loadView(currentView);
  }

  $("#loginForm").addEventListener("submit",async event => {
    event.preventDefault();
    if (!client) return;
    const data = new FormData(event.currentTarget);
    const { data:result,error } = await client.auth.signInWithPassword({email:String(data.get("email")).trim(),password:String(data.get("password"))});
    if (error) { showLogin("เข้าสู่ระบบไม่สำเร็จ ตรวจสอบอีเมลและรหัสผ่านอีกครั้ง"); return; }
    await openSession(result.session);
  });
  $("#dashboardNav").addEventListener("click",event => {
    const button = event.target.closest("[data-view]");
    if (button) loadView(button.dataset.view);
  });
  $("#createButton").addEventListener("click",() => openEditor());
  $("#editorForm").addEventListener("submit",saveEditor);
  $("#editorClose").addEventListener("click",() => editor.close());
  $("#cancelEdit").addEventListener("click",() => editor.close());
  $("#signOutButton").addEventListener("click",() => client?.auth.signOut());

  if (!ready) {
    $("#setupNotice").classList.remove("hidden");
    $("#loginForm button").disabled = true;
    showLogin("ยังไม่ได้ตั้งค่า Supabase");
  } else {
    client.auth.getSession().then(({data}) => openSession(data.session));
    client.auth.onAuthStateChange((_event,session) => {
      // Supabase recommends deferring follow-up auth work to avoid blocking its auth lock.
      window.setTimeout(() => openSession(session),0);
    });
  }
})();
