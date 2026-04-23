var SHEETS = {
  USERS: "users",
  SESSIONS: "sessions",
  ASSESSMENTS: "assessments",
  EMAIL_LOGS: "email_logs",
};

// Use the actual spreadsheet explicitly so the web app works even when the
// Apps Script project is standalone and not container-bound.
var SPREADSHEET_ID = "1ChwU9e9Mnb3r2kjmAhSSSQg7Z-GUwpfwVseKryMeSd4";

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
  DI: ["Nguoi dan dat truyen lua", "Quyet doan, giau nang luong, thich but pha va tao anh huong."],
  DC: ["Nguoi chi huy chien luoc", "Manh me, chuan xac, quyet theo muc tieu nhung van giu nguyen tac."],
  DS: ["Nguoi dat muc tieu", "Manh me, kien tri, trach nhiem, huong toi ket qua va tao su can bang."],
  ID: ["Nguoi lan toa va chinh phuc", "Soi noi, tu tin, thich ket noi va khong ngai dan dat."],
  IC: ["Nguoi thuyet phuc tinh te", "Gioi ket noi, noi co suc nang va van chu y chuan muc."],
  IS: ["Nguoi ket noi chan thanh", "Am ap, tich cuc, de gan va luon muon tao bau khong khi hai hoa."],
  SD: ["Nguoi ben bi hanh dong", "Diem tinh nhung chac tay, biet giu nhip va van theo duoi muc tieu."],
  SI: ["Nguoi gan ket con nguoi", "Chan thanh, kien nhan, giau tinh than ho tro va ket noi."],
  SC: ["Nguoi on dinh chuan muc", "Can trong, kien nhan va thich su ro rang, trat tu."],
  CD: ["Nguoi nguyen tac dinh huong", "Ly tri, manh me va co xu huong kiem soat chat luong lan muc tieu."],
  CI: ["Nguoi chuan xac thuyet phuc", "Phan tich tot nhung van co kha nang tao anh huong nhe nhang."],
  CS: ["Nguoi can trong tan tam", "Ti mi, dang tin, ho tro ben bi va thich moi truong co cau truc."],
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
  ]);
  getSheet_(SHEETS.EMAIL_LOGS, [
    "log_id",
    "assessment_id",
    "recipient_email",
    "status",
    "error_message",
    "created_at",
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
    items.push({
      assessment_id: rows[i][0],
      submitted_at_text: formatDate_(rows[i][4]),
      disc_code: rows[i][5],
      result_title: rows[i][16],
      email_status: rows[i][18],
      email_status_text: rows[i][19],
      result_visible_to_user: String(rows[i][22]) === "TRUE",
    });
  }
  return { items: items };
}

function handleGetAssessmentDetail(token, payload) {
  var session = requireSession_(token);
  var row = getAssessmentRow_(payload.assessment_id);
  if (!row) throw new Error("Assessment not found.");
  var isOwner = row[1] === session.user_id;
  var isAdmin = getUserById_(session.user_id).role === "admin";
  if (!isOwner && !isAdmin) throw new Error("Khong co quyen truy cap.");

  return {
    assessment_id: row[0],
    disc_code: row[5],
    disc_primary: row[6],
    disc_secondary: row[7],
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
    result_visible_to_user: String(row[22]) === "TRUE",
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
      result_visible_to_user: String(row[22]) === "TRUE",
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
  var map = {};
  for (var i = 0; i < QUESTION_BANK.length; i++) {
    var questionId = QUESTION_BANK[i][0];
    map[questionId] = {};
    for (var j = 0; j < QUESTION_BANK[i][1].length; j++) {
      map[questionId][QUESTION_BANK[i][1][j][0]] = QUESTION_BANK[i][1][j][1];
    }
  }

  for (var k = 0; k < answers.length; k++) {
    var answer = answers[k];
    var answerMap = map[answer.questionId] || {};
    if (answer.most && answerMap[answer.most]) mostCounts[answerMap[answer.most]] += 1;
    if (answer.least && answerMap[answer.least]) leastCounts[answerMap[answer.least]] += 1;
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
    var subject = "Ket qua DISC cua " + payload.fullName + " da san sang";
    var html =
      '<div style="font-family:Arial,sans-serif;background:#f7f9fc;padding:32px;color:#1f3554">' +
      '<div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dbe4f0;border-radius:20px;overflow:hidden">' +
      '<div style="padding:28px;background:linear-gradient(135deg,#fff1e8,#ffffff)"><div style="display:inline-block;padding:8px 14px;border-radius:999px;background:#fff1e8;color:#ff640a;font-weight:700">DISC ket qua</div>' +
      '<h1 style="margin:16px 0 8px;font-size:28px;color:#ef4444">' + payload.discCode + " - " + payload.title + "</h1>" +
      "<p style=\"margin:0;line-height:1.7;color:#4b5f7c\">Xin chao " + payload.fullName + ", ket qua DISC cua ban da duoc xu ly thanh cong. Day la ban tom tat ngan gon va ca nhan hoa de ban de dang nhin ra xu huong hanh vi noi troi cua minh.</p></div>" +
      '<div style="padding:28px"><p style="line-height:1.8;margin-top:0"><strong>Ma DISC cua ban:</strong> ' + payload.discCode + "</p>" +
      '<p style="line-height:1.8"><strong>Phong cach:</strong> ' + payload.subtitle + "</p>" +
      '<p style="line-height:1.8">Ban vui long quay lai he thong de xem day du bieu do, cac diem manh, diem can can bang, lich su bai test va cac goi y phat trien ca nhan.</p>' +
      '<div style="margin-top:22px"><a href="' + ScriptApp.getService().getUrl() + '" style="display:inline-block;padding:12px 18px;border-radius:12px;background:#ff640a;color:#fff;text-decoration:none;font-weight:700">Mo he thong DISC</a></div></div></div></div>';

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
