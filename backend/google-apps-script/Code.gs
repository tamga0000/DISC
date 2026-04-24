var SHEETS = {
  USERS: "users",
  SESSIONS: "sessions",
  ASSESSMENTS: "assessments",
  EMAIL_LOGS: "email_logs",
};

// Use the actual spreadsheet explicitly so the web app works even when the
// Apps Script project is standalone and not container-bound.
var SPREADSHEET_ID = "1ChwU9e9Mnb3r2kjmAhSSSQg7Z-GUwpfwVseKryMeSd4";
var FRONTEND_URL = "https://vagavydisctest.netlify.app/#/";

var QUESTION_BANK = [
  ["q1", [["a", "I"], ["b", "I"], ["c", "D"], ["d", "C"]]],
  ["q2", [["a", "D"], ["b", "S"], ["c", "I"], ["d", "S"]]],
  ["q3", [["a", "C"], ["b", "D"], ["c", "D"], ["d", "I"]]],
  ["q4", [["a", "I"], ["b", "D"], ["c", "S"], ["d", "C"]]],
  ["q5", [["a", "I"], ["b", "D"], ["c", "S"], ["d", "C"]]],
  ["q6", [["a", "D"], ["b", "S"], ["c", "C"], ["d", "C"]]],
  ["q7", [["a", "C"], ["b", "D"], ["c", "S"], ["d", "D"]]],
  ["q8", [["a", "C"], ["b", "D"], ["c", "S"], ["d", "D"]]],
  ["q9", [["a", "I"], ["b", "C"], ["c", "S"], ["d", "D"]]],
  ["q10", [["a", "S"], ["b", "C"], ["c", "I"], ["d", "D"]]],
  ["q11", [["a", "D"], ["b", "C"], ["c", "S"], ["d", "I"]]],
  ["q12", [["a", "S"], ["b", "I"], ["c", "S"], ["d", "C"]]],
  ["q13", [["a", "I"], ["b", "D"], ["c", "C"], ["d", "S"]]],
  ["q14", [["a", "I"], ["b", "C"], ["c", "I"], ["d", "D"]]],
  ["q15", [["a", "D"], ["b", "I"], ["c", "C"], ["d", "S"]]],
  ["q16", [["a", "I"], ["b", "S"], ["c", "D"], ["d", "I"]]],
  ["q17", [["a", "S"], ["b", "D"], ["c", "I"], ["d", "C"]]],
  ["q18", [["a", "D"], ["b", "I"], ["c", "C"], ["d", "I"]]],
  ["q19", [["a", "S"], ["b", "D"], ["c", "C"], ["d", "S"]]],
  ["q20", [["a", "I"], ["b", "D"], ["c", "S"], ["d", "I"]]],
  ["q21", [["a", "I"], ["b", "S"], ["c", "D"], ["d", "C"]]],
  ["q22", [["a", "C"], ["b", "I"], ["c", "C"], ["d", "S"]]],
  ["q23", [["a", "I"], ["b", "D"], ["c", "S"], ["d", "C"]]],
  ["q24", [["a", "D"], ["b", "S"], ["c", "C"], ["d", "D"]]],
  ["q25", [["a", "S"], ["b", "I"], ["c", "D"], ["d", "C"]]],
  ["q26", [["a", "S"], ["b", "S"], ["c", "I"], ["d", "D"]]],
  ["q27", [["a", "S"], ["b", "D"], ["c", "S"], ["d", "I"]]],
  ["q28", [["a", "D"], ["b", "C"], ["c", "C"], ["d", "I"]]],
];

var COMBO_LABELS = {
  DI: ["Người dẫn dắt truyền lửa", "Quyết đoán, giàu năng lượng, thích bứt phá và tạo ảnh hưởng."],
  DC: ["Người chỉ huy chiến lược", "Mạnh mẽ, chuẩn xác, quyết theo mục tiêu nhưng vẫn giữ nguyên tắc."],
  DS: ["Người đạt mục tiêu", "Mạnh mẽ, kiên trì, trách nhiệm, hướng tới kết quả và tạo sự cân bằng."],
  ID: ["Người lan tỏa và chinh phục", "Sôi nổi, tự tin, thích kết nối và không ngại dẫn dắt."],
  IC: ["Người thuyết phục tinh tế", "Giỏi kết nối, nói có sức nặng và vẫn chú ý chuẩn mực."],
  IS: ["Người kết nối chân thành", "Ấm áp, tích cực, dễ gần và luôn muốn tạo bầu không khí hài hòa."],
  SD: ["Người bền bỉ hành động", "Điềm tĩnh nhưng chắc tay, biết giữ nhịp và vẫn theo đuổi mục tiêu."],
  SI: ["Người gắn kết con người", "Chân thành, kiên nhẫn, giàu tinh thần hỗ trợ và kết nối."],
  SC: ["Người ổn định chuẩn mực", "Cẩn trọng, kiên nhẫn và thích sự rõ ràng, trật tự."],
  CD: ["Người nguyên tắc định hướng", "Lý trí, mạnh mẽ và có xu hướng kiểm soát chất lượng lẫn mục tiêu."],
  CI: ["Người chuẩn xác thuyết phục", "Phân tích tốt nhưng vẫn có khả năng tạo ảnh hưởng nhẹ nhàng."],
  CS: ["Người cẩn trọng tận tâm", "Tỉ mỉ, đáng tin, hỗ trợ bền bỉ và thích môi trường có cấu trúc."],
};

function doPost(e) {
  try {
    var request = JSON.parse(e.postData.contents || "{}");
    var action = request.action;
    var token = request.token;
    var payload = request.payload || {};

    var data;
    if (action === "register") data = handleRegister(payload);
    else if (action === "login") data = handleLogin(payload);
    else if (action === "submitAssessment") data = handleSubmitAssessment(token, payload);
    else if (action === "getMyHistory") data = handleGetMyHistory(token);
    else if (action === "getAssessmentDetail") data = handleGetAssessmentDetail(token, payload);
    else if (action === "updateAssessmentEmail") data = handleUpdateAssessmentEmail(token, payload);
    else if (action === "getAdminDashboard") data = handleGetAdminDashboard(token);
    else throw new Error("Unsupported action.");

    return jsonOutput({ ok: true, data: data });
  } catch (error) {
    return jsonOutput({ ok: false, error: error.message || "Unknown error." });
  }
}

function jsonOutput(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function setupSpreadsheet() {
  getSheet_(SHEETS.USERS, [
    "user_id",
    "full_name",
    "email",
    "phone",
    "password_hash",
    "role",
    "status",
    "created_at",
  ]);
  getSheet_(SHEETS.SESSIONS, [
    "token",
    "user_id",
    "created_at",
    "expires_at",
  ]);
  getSheet_(SHEETS.ASSESSMENTS, [
    "assessment_id",
    "user_id",
    "session_id",
    "recipient_email",
    "submitted_at",
    "disc_code",
    "disc_primary",
    "disc_secondary",
    "raw_d",
    "raw_i",
    "raw_s",
    "raw_c",
    "chart_d",
    "chart_i",
    "chart_s",
    "chart_c",
    "result_title",
    "result_subtitle",
    "email_status",
    "email_status_text",
    "email_sent_at",
    "email_error",
    "result_visible_to_user",
    "environment_key",
    "environment_label",
    "question_bank_version",
  ]);
  getSheet_(SHEETS.EMAIL_LOGS, [
    "log_id",
    "assessment_id",
    "recipient_email",
    "status",
    "error_message",
    "created_at",
  ]);
  ensureColumns_(SHEETS.ASSESSMENTS, [
    "assessment_id",
    "user_id",
    "session_id",
    "recipient_email",
    "submitted_at",
    "disc_code",
    "disc_primary",
    "disc_secondary",
    "raw_d",
    "raw_i",
    "raw_s",
    "raw_c",
    "chart_d",
    "chart_i",
    "chart_s",
    "chart_c",
    "result_title",
    "result_subtitle",
    "email_status",
    "email_status_text",
    "email_sent_at",
    "email_error",
    "result_visible_to_user",
    "environment_key",
    "environment_label",
    "question_bank_version",
  ]);
}

function seedAdmin(email, password, fullName) {
  setupSpreadsheet();
  var usersSheet = getSheet_(SHEETS.USERS);
  var rows = usersSheet.getDataRange().getValues();
  var existing = findRowByValue_(rows, 2, email.toLowerCase());
  if (existing) throw new Error("Admin email already exists.");
  usersSheet.appendRow([
    makeId_("usr"),
    fullName || "Admin",
    email.toLowerCase(),
    "",
    hashPassword_(password),
    "admin",
    "active",
    nowIso_(),
  ]);
}

function handleRegister(payload) {
  setupSpreadsheet();
  validateEmail_(payload.email);
  if (!payload.password) throw new Error("Password is required.");
  var usersSheet = getSheet_(SHEETS.USERS);
  var rows = usersSheet.getDataRange().getValues();
  if (findRowByValue_(rows, 2, String(payload.email).toLowerCase())) {
    throw new Error("Email da ton tai.");
  }
  var userId = makeId_("usr");
  usersSheet.appendRow([
    userId,
    payload.full_name || "",
    String(payload.email).toLowerCase(),
    payload.phone || "",
    hashPassword_(payload.password),
    "user",
    "active",
    nowIso_(),
  ]);
  return createSessionForUser_(userId);
}

function handleLogin(payload) {
  setupSpreadsheet();
  validateEmail_(payload.email);
  var user = findUserByEmail_(payload.email);
  if (!user || user.password_hash !== hashPassword_(payload.password)) {
    throw new Error("Thong tin dang nhap khong dung.");
  }
  return createSessionForUser_(user.user_id);
}

function handleSubmitAssessment(token, payload) {
  setupSpreadsheet();
  var session = requireSession_(token);
  if (!payload.answers || !payload.answers.length) throw new Error("Answers are required.");
  if (!payload.environment_key) throw new Error("Environment is required.");

  var scoring = scoreAnswers_(payload.answers);
  var assessmentId = makeId_("asm");
  var user = getUserById_(session.user_id);
  var combo = COMBO_LABELS[scoring.code] || ["Phong cach ket hop", "Su pha tron giua hai dong luc hanh vi noi troi."];
  var emailResult = sendResultEmail_({
    fullName: user.full_name || "Ban",
    email: user.email,
    discCode: scoring.code,
    title: combo[0],
    subtitle: combo[1],
    primary: scoring.primary,
    secondary: scoring.secondary,
  });

  var emailStatus = emailResult.sent ? "sent" : "failed";
  var visible = emailResult.sent ? "TRUE" : "FALSE";
  getSheet_(SHEETS.ASSESSMENTS).appendRow([
    assessmentId,
    session.user_id,
    payload.session_id || "",
    user.email,
    nowIso_(),
    scoring.code,
    scoring.primary,
    scoring.secondary,
    scoring.raw.D,
    scoring.raw.I,
    scoring.raw.S,
    scoring.raw.C,
    scoring.chart.D,
    scoring.chart.I,
    scoring.chart.S,
    scoring.chart.C,
    combo[0],
    combo[1],
    emailStatus,
    emailResult.sent ? "Da gui ket qua thanh cong" : "Sai thong tin nguoi nhan / gui mail that bai",
    emailResult.sent ? nowIso_() : "",
    emailResult.error || "",
    visible,
    payload.environment_key || "",
    payload.environment_label || "",
    payload.question_bank_version || "v2-40",
  ]);

  getSheet_(SHEETS.EMAIL_LOGS).appendRow([
    makeId_("log"),
    assessmentId,
    user.email,
    emailStatus,
    emailResult.error || "",
    nowIso_(),
  ]);

  return {
    assessment_id: assessmentId,
    result_visible_to_user: emailResult.sent,
    email_status: emailStatus,
    email_status_text: emailResult.sent
      ? "Da gui ket qua thanh cong"
      : "Sai thong tin nguoi nhan / gui mail that bai",
  };
}

function handleGetMyHistory(token) {
  var session = requireSession_(token);
  var sheet = getSheet_(SHEETS.ASSESSMENTS);
  var rows = sheet.getDataRange().getValues();
  var items = [];
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][1] !== session.user_id) continue;
    if (String(rows[i][25] || "") !== "v2-40") continue;
    items.push({
      assessment_id: rows[i][0],
      submitted_at_text: formatDate_(rows[i][4]),
      disc_code: rows[i][5],
      result_title: rows[i][16],
      email_status: rows[i][18],
      email_status_text: rows[i][19],
      result_visible_to_user: isVisible_(rows[i][22]) || rows[i][18] === "sent",
      environment_key: rows[i][23] || "",
      environment_label: rows[i][24] || "",
    });
  }
  return { items: items };
}

function handleGetAssessmentDetail(token, payload) {
  var session = requireSession_(token);
  var row = getAssessmentRow_(payload.assessment_id);
  if (!row) throw new Error("Assessment not found.");
  if (String(row[25] || "") !== "v2-40") throw new Error("Assessment legacy is no longer supported.");
  var isOwner = row[1] === session.user_id;
  var isAdmin = getUserById_(session.user_id).role === "admin";
  if (!isOwner && !isAdmin) throw new Error("Khong co quyen truy cap.");

  return {
    assessment_id: row[0],
    disc_code: row[5],
    disc_primary: row[6],
    disc_secondary: row[7],
    raw_scores: {
      D: Number(row[8]) || 0,
      I: Number(row[9]) || 0,
      S: Number(row[10]) || 0,
      C: Number(row[11]) || 0,
    },
    chart_scores: {
      D: Number(row[12]) || 4,
      I: Number(row[13]) || 4,
      S: Number(row[14]) || 4,
      C: Number(row[15]) || 4,
    },
    result_title: row[16],
    result_subtitle: row[17],
    email_status: row[18],
    email_status_text: row[19],
    result_visible_to_user: isVisible_(row[22]) || row[18] === "sent",
    environment_key: row[23] || "",
    environment_label: row[24] || "",
    question_bank_version: row[25] || "",
  };
}

function handleUpdateAssessmentEmail(token, payload) {
  var session = requireSession_(token);
  validateEmail_(payload.email);
  var assessmentMeta = getAssessmentMeta_(payload.assessment_id);
  if (!assessmentMeta) throw new Error("Assessment not found.");
  if (assessmentMeta.row[1] !== session.user_id) throw new Error("Khong co quyen cap nhat.");

  var userMeta = getUserMetaById_(session.user_id);
  getSheet_(SHEETS.USERS).getRange(userMeta.rowIndex, 3).setValue(String(payload.email).toLowerCase());
  assessmentMeta.sheet.getRange(assessmentMeta.rowIndex, 4).setValue(String(payload.email).toLowerCase());

  var emailResult = sendResultEmail_({
    fullName: userMeta.row[1] || "Ban",
    email: String(payload.email).toLowerCase(),
    discCode: assessmentMeta.row[5],
    title: assessmentMeta.row[16],
    subtitle: assessmentMeta.row[17],
    primary: assessmentMeta.row[6],
    secondary: assessmentMeta.row[7],
  });

  assessmentMeta.sheet.getRange(assessmentMeta.rowIndex, 19).setValue(emailResult.sent ? "sent" : "failed");
  assessmentMeta.sheet.getRange(assessmentMeta.rowIndex, 20).setValue(
    emailResult.sent ? "Da gui ket qua thanh cong" : "Sai thong tin nguoi nhan / gui mail that bai"
  );
  assessmentMeta.sheet.getRange(assessmentMeta.rowIndex, 21).setValue(emailResult.sent ? nowIso_() : "");
  assessmentMeta.sheet.getRange(assessmentMeta.rowIndex, 22).setValue(emailResult.error || "");
  assessmentMeta.sheet.getRange(assessmentMeta.rowIndex, 23).setValue(emailResult.sent ? "TRUE" : "FALSE");

  getSheet_(SHEETS.EMAIL_LOGS).appendRow([
    makeId_("log"),
    payload.assessment_id,
    String(payload.email).toLowerCase(),
    emailResult.sent ? "sent" : "failed",
    emailResult.error || "",
    nowIso_(),
  ]);

  return { ok: true };
}

function handleGetAdminDashboard(token) {
  var session = requireSession_(token);
  var user = getUserById_(session.user_id);
  if (user.role !== "admin") throw new Error("Admin only.");

  var rows = getSheet_(SHEETS.ASSESSMENTS).getDataRange().getValues();
  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  var recent = [];
  var todayCount = 0;
  var sentCount = 0;
  var failedCount = 0;

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    if (String(row[25] || "") !== "v2-40") continue;
    var dateText = Utilities.formatDate(new Date(row[4]), Session.getScriptTimeZone(), "yyyy-MM-dd");
    if (dateText === today) todayCount += 1;
    if (row[18] === "sent") sentCount += 1;
    if (row[18] === "failed") failedCount += 1;
    recent.push({
      full_name: getUserById_(row[1]).full_name,
      email: row[3],
      submitted_at_text: formatDate_(row[4]),
      disc_code: row[5],
      email_status: row[18],
      result_visible_to_user: isVisible_(row[22]) || row[18] === "sent",
      environment_key: row[23] || "",
      environment_label: row[24] || "",
    });
  }

  recent.reverse();
  recent = recent.slice(0, 20);
  return {
    today_count: todayCount,
    email_sent_count: sentCount,
    email_failed_count: failedCount,
    recent: recent,
  };
}

function scoreAnswers_(answers) {
  var mostCounts = { D: 0, I: 0, S: 0, C: 0 };
  var leastCounts = { D: 0, I: 0, S: 0, C: 0 };
  for (var k = 0; k < answers.length; k++) {
    var answer = answers[k];
    if (answer.most_disc && mostCounts[answer.most_disc] !== undefined) {
      mostCounts[answer.most_disc] += 1;
    }
    if (answer.least_disc && leastCounts[answer.least_disc] !== undefined) {
      leastCounts[answer.least_disc] += 1;
    }
  }

  var raw = {
    D: mostCounts.D * 2 - leastCounts.D,
    I: mostCounts.I * 2 - leastCounts.I,
    S: mostCounts.S * 2 - leastCounts.S,
    C: mostCounts.C * 2 - leastCounts.C,
  };
  var sorted = ["D", "I", "S", "C"].sort(function (a, b) {
    return raw[b] - raw[a];
  });
  return {
    raw: raw,
    primary: sorted[0],
    secondary: sorted[1],
    code: sorted[0] + sorted[1],
    chart: normalizeScores_(raw),
  };
}

function normalizeScores_(raw) {
  var values = [raw.D, raw.I, raw.S, raw.C];
  var min = Math.min.apply(null, values);
  var max = Math.max.apply(null, values);
  var out = { D: 4, I: 4, S: 4, C: 4 };
  if (max === min) return out;
  ["D", "I", "S", "C"].forEach(function (key) {
    var scaled = 1 + ((raw[key] - min) / (max - min)) * 6;
    out[key] = Math.max(1, Math.min(7, Math.round(scaled * 10) / 10));
  });
  return out;
}

function sendResultEmail_(payload) {
  try {
    validateEmail_(payload.email);
    var subject = "Kết quả DISC của " + payload.fullName + " đã sẵn sàng";
    var detail = buildEmailDetail_(payload.primary, payload.secondary);
    var html =
      '<!doctype html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f7f9fc;font-family:Arial,sans-serif;color:#1f3554;">' +
      '<div style="padding:32px 16px;background:#f7f9fc;">' +
      '<div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #dbe4f0;border-radius:24px;overflow:hidden;">' +
      '<div style="padding:30px;background:linear-gradient(135deg,#fff1e8,#ffffff);border-bottom:1px solid #eef2f7;">' +
      '<div style="display:inline-block;padding:8px 14px;border-radius:999px;background:#fff1e8;color:#ff640a;font-weight:700;">Kết quả DISC</div>' +
      '<h1 style="margin:18px 0 10px;font-size:32px;line-height:1.15;color:#ef4444;">' + escapeHtmlEmail_(payload.discCode + " - " + payload.title) + '</h1>' +
      '<p style="margin:0;font-size:16px;line-height:1.8;color:#4b5f7c;">Xin chào <strong>' + escapeHtmlEmail_(payload.fullName) + '</strong>, bài trắc nghiệm DISC 28 câu của bạn đã được xử lý thành công. Dưới đây là phần tóm tắt nhanh để bạn nhìn rõ hơn phong cách hành vi nổi bật của mình.</p>' +
      '</div>' +
      '<div style="padding:30px;">' +
      '<div style="padding:18px 20px;border:1px solid #e5edf6;border-radius:18px;background:#fbfdff;">' +
      '<p style="margin:0 0 10px;font-size:15px;line-height:1.8;"><strong>Mã DISC của bạn:</strong> ' + escapeHtmlEmail_(payload.discCode) + '</p>' +
      '<p style="margin:0 0 10px;font-size:15px;line-height:1.8;"><strong>Phong cách tổng quan:</strong> ' + escapeHtmlEmail_(payload.subtitle) + '</p>' +
      '<p style="margin:0;font-size:15px;line-height:1.8;color:#4b5f7c;">' + escapeHtmlEmail_(detail.summary) + '</p>' +
      '</div>' +
      '<div style="margin-top:24px;display:grid;grid-template-columns:1fr;gap:16px;">' +
      emailListCard_("Điểm mạnh nổi bật", detail.strengths, "#d97706") +
      emailListCard_("Điểm cần cân bằng", detail.watchouts, "#ec4899") +
      emailParagraphCard_("Phong cách làm việc", detail.workStyle, "#0ea5e9") +
      emailParagraphCard_("Gợi ý phát triển", detail.guidance, "#14b8a6") +
      '</div>' +
      '<div style="margin-top:24px;padding:18px 20px;border-radius:18px;background:#fff7ed;border:1px solid #fed7aa;">' +
      '<p style="margin:0;font-size:15px;line-height:1.8;color:#7c2d12;">Bạn có thể quay lại website để xem đầy đủ hơn phần biểu đồ, mô tả chi tiết, lịch sử bài test và các nội dung mở rộng cho nhóm DISC của mình.</p>' +
      '<div style="margin-top:18px;"><a href="' + escapeHtmlEmail_(FRONTEND_URL) + '" style="display:inline-block;padding:13px 20px;border-radius:14px;background:#ff640a;color:#ffffff;text-decoration:none;font-weight:700;">Mở trang chủ DISC</a></div>' +
      '</div>' +
      '</div></div></div></body></html>';

    MailApp.sendEmail({
      to: payload.email,
      subject: subject,
      htmlBody: html,
    });
    return { sent: true };
  } catch (error) {
    return { sent: false, error: error.message || "Email send failed." };
  }
}

function createSessionForUser_(userId) {
  var user = getUserById_(userId);
  var token = Utilities.getUuid();
  getSheet_(SHEETS.SESSIONS).appendRow([
    token,
    userId,
    nowIso_(),
    "",
  ]);
  return {
    token: token,
    user: {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    },
  };
}

function requireSession_(token) {
  if (!token) throw new Error("Unauthorized.");
  var sheet = getSheet_(SHEETS.SESSIONS);
  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === token) {
      return { token: rows[i][0], user_id: rows[i][1] };
    }
  }
  throw new Error("Session expired or invalid.");
}

function findUserByEmail_(email) {
  var rows = getSheet_(SHEETS.USERS).getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][2]).toLowerCase() === String(email).toLowerCase()) {
      return rowToUser_(rows[i]);
    }
  }
  return null;
}

function getUserById_(userId) {
  var meta = getUserMetaById_(userId);
  return rowToUser_(meta.row);
}

function getUserMetaById_(userId) {
  var sheet = getSheet_(SHEETS.USERS);
  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === userId) {
      return { sheet: sheet, row: rows[i], rowIndex: i + 1 };
    }
  }
  throw new Error("User not found.");
}

function rowToUser_(row) {
  return {
    user_id: row[0],
    full_name: row[1],
    email: row[2],
    phone: row[3],
    password_hash: row[4],
    role: row[5],
    status: row[6],
  };
}

function getAssessmentRow_(assessmentId) {
  var rows = getSheet_(SHEETS.ASSESSMENTS).getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === assessmentId) return rows[i];
  }
  return null;
}

function getAssessmentMeta_(assessmentId) {
  var sheet = getSheet_(SHEETS.ASSESSMENTS);
  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === assessmentId) {
      return { sheet: sheet, row: rows[i], rowIndex: i + 1 };
    }
  }
  return null;
}

function getSheet_(name, headers) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(name);
  if (!sheet && headers) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sheet;
}

function ensureColumns_(name, headers) {
  var sheet = getSheet_(name);
  var current = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
  for (var i = 0; i < headers.length; i++) {
    if (current[i] !== headers[i]) {
      sheet.getRange(1, i + 1).setValue(headers[i]);
    }
  }
}

function isVisible_(value) {
  return value === true || String(value).toUpperCase() === "TRUE";
}

function buildEmailDetail_(primary, secondary) {
  var profiles = {
    D: {
      summary: "Bạn thiên về sự quyết đoán, chủ động và mong muốn nhìn thấy kết quả rõ ràng trong công việc.",
      strengths: [
        "Quyết định nhanh khi áp lực tăng cao",
        "Chủ động dẫn dắt và giữ nhịp công việc",
        "Tập trung mạnh vào mục tiêu và hiệu quả",
      ],
      watchouts: [
        "Dễ thiếu kiên nhẫn khi người khác chậm nhịp",
        "Có thể tạo cảm giác áp lực vì cách nói quá thẳng",
        "Đôi lúc ưu tiên mục tiêu hơn cảm xúc con người",
      ],
      workStyle: "Phù hợp với môi trường có tốc độ cao, quyền chủ động rõ ràng và mục tiêu đo đếm được.",
      guidance: "Rèn thêm lắng nghe, chia sẻ quyền kiểm soát và cân bằng giữa hiệu quả với trải nghiệm của đội nhóm.",
    },
    I: {
      summary: "Bạn thiên về giao tiếp, kết nối và có xu hướng lan tỏa năng lượng tích cực tới người xung quanh.",
      strengths: [
        "Tạo thiện cảm và kết nối nhanh với người khác",
        "Truyền cảm hứng tốt trong môi trường tập thể",
        "Linh hoạt, cởi mở với thay đổi và tương tác mới",
      ],
      watchouts: [
        "Dễ cảm tính hoặc bốc đồng khi quá hứng khởi",
        "Có thể thiếu bền bỉ ở các việc lặp lại, tỉ mỉ",
        "Dễ bị ảnh hưởng bởi phản hồi và sự ghi nhận từ bên ngoài",
      ],
      workStyle: "Phát huy tốt trong môi trường thân thiện, nhiều tương tác, có không gian để thuyết phục và chia sẻ ý tưởng.",
      guidance: "Tăng khả năng ưu tiên, theo đuổi đến cùng và kết hợp cảm hứng với tính kỷ luật trong thực thi.",
    },
    S: {
      summary: "Bạn thiên về sự điềm tĩnh, ổn định và thường tạo cảm giác an tâm, dễ chịu cho người khác khi phối hợp cùng.",
      strengths: [
        "Kiên nhẫn, bền bỉ và đáng tin cậy",
        "Phối hợp nhóm tốt, biết lắng nghe và hỗ trợ",
        "Giữ được sự ổn định trong môi trường có áp lực",
      ],
      watchouts: [
        "Ngại thay đổi đột ngột hoặc xung đột trực diện",
        "Dễ chậm bày tỏ chính kiến khi cần quyết nhanh",
        "Có xu hướng ưu tiên sự hài hòa hơn nhu cầu của bản thân",
      ],
      workStyle: "Hợp với môi trường có nhịp làm việc ổn định, quy trình rõ ràng và đề cao sự hỗ trợ lẫn nhau.",
      guidance: "Tập nói rõ nhu cầu của mình, đặt ranh giới lành mạnh và nâng dần tốc độ thích nghi với thay đổi.",
    },
    C: {
      summary: "Bạn thiên về logic, chuẩn mực và có xu hướng muốn mọi việc rõ ràng, chính xác trước khi đưa ra kết luận.",
      strengths: [
        "Tư duy phân tích và nhìn ra rủi ro nhanh",
        "Làm việc có hệ thống, chú ý chi tiết tốt",
        "Giữ chuẩn chất lượng và sự chính xác cao",
      ],
      watchouts: [
        "Dễ cầu toàn hoặc chậm quyết khi thiếu dữ liệu",
        "Không thoải mái với môi trường mơ hồ, thay đổi gấp",
        "Cách giao tiếp đôi lúc có thể bị cảm nhận là lạnh hoặc quá thận trọng",
      ],
      workStyle: "Phù hợp với công việc cần cấu trúc rõ, dữ liệu đáng tin và thời gian đủ để suy nghĩ thấu đáo.",
      guidance: "Luyện sự linh hoạt, chấp nhận mức đủ tốt trong một số tình huống và giao tiếp dễ gần hơn với người khác.",
    },
  };

  var primaryProfile = profiles[primary] || profiles.D;
  var secondaryFlavor = {
    D: "Khi đi cùng sắc thái D, bạn có thêm nét quyết liệt, rõ định hướng và thích tạo chuyển động nhanh.",
    I: "Khi đi cùng sắc thái I, bạn có thêm nét cởi mở, dễ tạo thiện cảm và lan tỏa năng lượng tích cực.",
    S: "Khi đi cùng sắc thái S, bạn có thêm nét điềm tĩnh, biết giữ nhịp và coi trọng sự hài hòa khi phối hợp.",
    C: "Khi đi cùng sắc thái C, bạn có thêm nét phân tích, thận trọng và chú ý nhiều hơn tới tiêu chuẩn.",
  };

  return {
    summary: primaryProfile.summary + " " + (secondaryFlavor[secondary] || ""),
    strengths: primaryProfile.strengths,
    watchouts: primaryProfile.watchouts,
    workStyle: primaryProfile.workStyle,
    guidance: primaryProfile.guidance,
  };
}

function emailListCard_(title, items, color) {
  return (
    '<div style="padding:18px 20px;border:1px solid #e5edf6;border-radius:18px;background:#ffffff;">' +
    '<div style="display:inline-block;padding:7px 12px;border-radius:999px;background:#fff7ed;color:' + color + ';font-weight:700;font-size:13px;">' + escapeHtmlEmail_(title) + '</div>' +
    '<ul style="margin:14px 0 0;padding-left:18px;color:#334155;line-height:1.9;">' +
    items.map(function (item) { return '<li>' + escapeHtmlEmail_(item) + '</li>'; }).join('') +
    '</ul></div>'
  );
}

function emailParagraphCard_(title, text, color) {
  return (
    '<div style="padding:18px 20px;border:1px solid #e5edf6;border-radius:18px;background:#ffffff;">' +
    '<div style="display:inline-block;padding:7px 12px;border-radius:999px;background:#eff6ff;color:' + color + ';font-weight:700;font-size:13px;">' + escapeHtmlEmail_(title) + '</div>' +
    '<p style="margin:14px 0 0;color:#334155;line-height:1.9;">' + escapeHtmlEmail_(text) + '</p>' +
    '</div>'
  );
}

function escapeHtmlEmail_(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function findRowByValue_(rows, columnIndex, value) {
  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][columnIndex]).toLowerCase() === String(value).toLowerCase()) return rows[i];
  }
  return null;
}

function hashPassword_(text) {
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text, Utilities.Charset.UTF_8);
  return digest.map(function (byte) {
    var v = (byte < 0 ? byte + 256 : byte).toString(16);
    return v.length === 1 ? "0" + v : v;
  }).join("");
}

function validateEmail_(email) {
  var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
  if (!ok) throw new Error("Email khong hop le.");
}

function nowIso_() {
  return new Date().toISOString();
}

function makeId_(prefix) {
  return prefix + "_" + Utilities.getUuid().slice(0, 8);
}

function formatDate_(value) {
  if (!value) return "";
  var date = new Date(value);
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "HH:mm, dd/MM/yyyy");
}
