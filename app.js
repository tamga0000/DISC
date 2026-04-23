(function () {
  const CONFIG = window.DISC_CONFIG || {};
  const STORAGE_KEYS = {
    auth: "disc_auth_v4",
    pending: "disc_pending_v4",
  };

  const SETTINGS = {
    siteTitle: "DISC Nội Bộ",
    heroTitle: "Khám phá phong cách hành vi của bạn với bài trắc nghiệm DISC 28 câu.",
    heroCopy:
      "Phiên bản nội bộ này mô phỏng trải nghiệm sáng, gọn và trực quan theo hướng iVIEC: mỗi câu có 4 mô tả, bạn chọn 1 mô tả giống bạn nhất và 1 mô tả khác bạn nhất để hệ thống dựng hồ sơ DISC rõ ràng hơn.",
    startButton: "Làm trắc nghiệm ngay",
  };

  const DISC_TYPES = {
    D: {
      key: "D",
      nameVi: "Nhóm D",
      fullName: "Dominance - Thống lĩnh",
      color: "#ffb632",
      tone: "Người quyết đoán, định hướng kết quả và thích chinh phục thử thách.",
      description:
        "Nhóm D nổi bật ở sự mạnh mẽ, trực diện, thích dẫn dắt và ưu tiên hiệu quả. Họ phản ứng nhanh, thích kiểm soát tình huống và thường sẵn sàng nhận việc khó khi thấy mục tiêu đủ lớn.",
      highlights: [
        "Quyet doan, phan ung nhanh va tap trung muc tieu",
        "Ua thu thach, thich tu chu va thich vai tro dan dat",
        "Giao tiep truc tiep, ro rang va thien ve hieu qua",
      ],
      strengths: [
        "Ra quyet dinh nhanh trong ap luc",
        "Tinh than chu dong, dam chiu trach nhiem",
        "Co to chat lanh dao va dinh huong ket qua ro rang",
        "Hop voi moi truong toc do cao, nhieu muc tieu lon",
      ],
      weaknesses: [
        "De thieu kien nhan khi nguoi khac cham nhip",
        "Co the qua thang va tao cam giac ap luc",
        "Kho tiep nhan gop y khi dang qua tin vao huong di cua minh",
        "Thuong uu tien muc tieu hon cam xuc con nguoi",
      ],
      workStyle:
        "Trong cong viec, nhom D thich toc do, quyen chu dong va cac muc tieu do dem ro rang. Ho thuong muon quyet nhanh, lam nhanh va nhin vao buc tranh lon thay vi sa vao tieu tiet.",
      career: [
        "Quan ly / dieu hanh",
        "Kinh doanh",
        "Quan ly du an",
        "Bat dong san",
        "Logistics / van hanh",
      ],
      advice:
        "De di xa hon, nhom D nen luyen them lang nghe, chia se quyen kiem soat va can bang giua ket qua voi trai nghiem cua nguoi xung quanh.",
    },
    I: {
      key: "I",
      nameVi: "Nhóm I",
      fullName: "Influence - Ảnh hưởng",
      color: "#ff8a3d",
      tone: "Người truyền năng lượng, thích kết nối và tạo cảm hứng cho đám đông.",
      description:
        "Nhóm I thường cởi mở, giàu nhiệt huyết và dễ tạo ảnh hưởng tích cực lên người khác. Họ thích giao tiếp, thích được ghi nhận và thường mang lại sức sống cho môi trường làm việc.",
      highlights: [
        "Gioi giao tiep, ket noi va tao thien cam",
        "Nhiet tinh, truyen cam hung va mang nhieu nang luong tich cuc",
        "Coi mo voi trai nghiem moi va thich moi truong co tuong tac",
      ],
      strengths: [
        "Kha nang thuyet phuc va lan toa dong luc tot",
        "De thich nghi voi boi canh nhieu nguoi va nhieu thay doi",
        "Phu hop voi vai tro can giao tiep, sang tao, truyen cam hung",
        "Tao khong khi tich cuc va keo nhip doi nhom len nhanh",
      ],
      weaknesses: [
        "De cam tinh hoac boc dong khi qua hung khoi",
        "Kho giu tap trung lau vao viec lap lai, te nhat",
        "Co the thieu ky luat follow-up neu khong co cau truc ho tro",
        "De bi anh huong boi su cong nhan cua nguoi khac",
      ],
      workStyle:
        "Nhom I lam tot nhat trong moi truong than thien, giau tuong tac, co khong gian bieu dat va khuyen khich sang tao. Ho thich duoc noi, duoc chia se va duoc nhin thay tac dong minh tao ra.",
      career: [
        "Marketing / truyen thong",
        "Kinh doanh / phat trien thi truong",
        "Dao tao / giang day",
        "Cham soc khach hang",
        "Su kien / cong dong",
      ],
      advice:
        "Nhom I se phat trien ben vung hon khi ren kha nang uu tien, giu cam ket den cung va dua cam hung di cung ky luat thuc thi.",
    },
    S: {
      key: "S",
      nameVi: "Nhóm S",
      fullName: "Steadiness - Ổn định",
      color: "#7bc96f",
      tone: "Người kiên nhẫn, tận tâm và tạo cảm giác yên tâm cho tập thể.",
      description:
        "Nhóm S điềm đạm, kiên nhẫn và đáng tin cậy. Họ coi trọng sự ổn định, lòng trung thành và các mối quan hệ bền vững; thường đóng vai trò người giữ nhịp và hỗ trợ âm thầm trong đội nhóm.",
      highlights: [
        "On hoa, kien nhan va thich moi truong hoa thuan",
        "Trung thanh, dang tin cay va ben bi voi cam ket",
        "Lang nghe tot, ho tro tot va it thich xung dot",
      ],
      strengths: [
        "Giu su on dinh khi moi truong nhieu ap luc",
        "Phoi hop nhom tot va tao cam giac an tam cho nguoi khac",
        "Lam viec deu tay, co trach nhiem va dang tin cay",
        "Phu hop voi vai tro can ho tro, duy tri va cham soc lau dai",
      ],
      weaknesses: [
        "Ngai thay doi dot ngot va kho thich nghi qua nhanh",
        "De ne tranh xung dot hoac cham bay to chinh kien",
        "Co the dat nhu cau nguoi khac len tren ban than qua muc",
        "Hay chan chu trong cac tinh huong can quyet rat nhanh",
      ],
      workStyle:
        "Nhom S thich quy trinh ro, nhip lam viec on dinh va moi truong tu te. Ho phat huy rat tot khi duoc tin tuong, co thoi gian thich nghi va duoc lam viec trong tap the coi trong su ho tro lan nhau.",
      career: [
        "Nhan su",
        "Dich vu khach hang",
        "Hanh chinh - van phong",
        "Y te / cham soc",
        "Dieu phoi / ho tro van hanh",
      ],
      advice:
        "Muon but len manh hon, nhom S nen tap noi ro nhu cau cua minh, dat ranh gioi lanh manh va tap thich nghi dan voi thay doi thay vi ne tranh hoan toan.",
    },
    C: {
      key: "C",
      nameVi: "Nhóm C",
      fullName: "Conscientiousness - Tuân thủ",
      color: "#64748b",
      tone: "Người nguyên tắc, lý trí và theo đuổi sự chính xác.",
      description:
        "Nhóm C thường hành động dựa trên logic, tiêu chuẩn và quy tắc rõ ràng. Họ cẩn thận, tỉ mỉ, thích phân tích sâu và luôn muốn đảm bảo chất lượng, tính chính xác trong mọi việc.",
      highlights: [
        "Chinh xac, phan tich tot va chu trong chi tiet",
        "Ton trong quy trinh, tieu chuan va cau truc ro rang",
        "Tap trung cao, lam viec doc lap tot va dang tin cay",
      ],
      strengths: [
        "Tu duy logic, nhin thay rui ro va lo hong nhanh",
        "Lam viec co he thong, giu chuan rat tot",
        "Phu hop voi viec can kiem soat chat luong va du lieu",
        "It bi cuon theo cam xuc khi ra quyet dinh",
      ],
      weaknesses: [
        "De cau toan va cham quyet khi thieu du du lieu",
        "Khong thoai mai voi moi truong mo ho hoac thay doi dot ngot",
        "Giao tiep co the hoi lanh va qua than trong",
        "Co luc dat tieu chuan qua cao cho ban than va nguoi khac",
      ],
      workStyle:
        "Nhom C thich moi truong co quy trinh ro, it nhieu va du thoi gian de suy nghi thau dao. Ho phu hop voi vai tro can chat luong, su chuan xac va kha nang to chuc tot.",
      career: [
        "Phan tich du lieu",
        "Kiem soat chat luong",
        "Tai chinh / ke toan",
        "Phap che / tuan thu",
        "Ky thuat / quy trinh",
      ],
      advice:
        "De phat huy tron ven, nhom C nen hoc cach chap nhan muc du tot, giao tiep de gan hon va linh hoat hon truoc cac tinh huong chua hoan hao.",
    },
  };

  const COMBINATION_LABELS = {
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

  const RAW_QUESTIONS = [
    [["Khéo léo thuyết phục", "I"], ["Hào hứng, nhiệt tình", "I"], ["Thử cách táo bạo mới", "D"], ["Hài lòng với kế hoạch", "C"]],
    [["Thẳng thắn", "D"], ["Nhẹ nhàng, tinh tế", "S"], ["Thuyết phục khéo léo", "I"], ["Khiêm tốn, chia sẻ", "S"]],
    [["Phân tích, tự đánh giá", "C"], ["Kiên định ý kiến", "D"], ["Quyết định nhất quán", "D"], ["Tạo cảm hứng", "I"]],
    [["Tinh tế, tích cực", "I"], ["Mạnh dạn, dám thay đổi", "D"], ["Kiên định, trung thành", "S"], ["Lý trí, có cơ sở", "C"]],
    [["Hòa đồng, thoải mái", "I"], ["Kiên định, quyết tâm", "D"], ["Linh hoạt, cảm thông", "S"], ["Chu toàn, tỉ mỉ", "C"]],
    [["Quyết tâm, kiên định", "D"], ["Hỗ trợ, điềm tĩnh", "S"], ["Xem xét kỹ lưỡng", "C"], ["Có logic, thuyết phục cao", "C"]],
    [["Tìm hiểu kỹ lưỡng", "C"], ["Hành động nhanh", "D"], ["Ổn định, cân bằng", "S"], ["Thích thử thách", "D"]],
    [["Nhạy bén, quan sát tinh tế", "C"], ["Thử thách cái mới", "D"], ["Tử tế, sẵn sàng giúp đỡ", "S"], ["Độc lập, quyết đoán", "D"]],
    [["Vui vẻ, truyền cảm hứng", "I"], ["Ít chia sẻ về cuộc sống", "C"], ["Quan tâm đến người khác", "S"], ["Cạnh tranh", "D"]],
    [["Điềm đạm và ổn định", "S"], ["Làm việc cẩn trọng", "C"], ["Rất dễ gần", "I"], ["Đi thẳng vào vấn đề", "D"]],
    [["Thẳng thắn nói ra suy nghĩ", "D"], ["Ưu tiên tính chính xác", "C"], ["Luôn ổn định cảm xúc", "S"], ["Dễ dàng bắt chuyện", "I"]],
    [["Dễ nghe theo người khác", "S"], ["Lôi cuốn, có sức hút riêng", "I"], ["Hài lòng với hiện tại", "S"], ["Kỳ vọng và tiêu chuẩn cao", "C"]],
    [["Hành động theo cảm xúc", "I"], ["Mạnh mẽ và quyết liệt", "D"], ["Hướng nội", "C"], ["Dễ tính", "S"]],
    [["Hăng hái và nhiệt tình", "I"], ["Làm việc rất cẩn trọng", "C"], ["Luôn tràn đầy năng lượng", "I"], ["Chủ động nhận nhiệm vụ", "D"]],
    [["Dũng cảm, gan dạ", "D"], ["Mang ảnh hưởng tích cực", "I"], ["Ngại thể hiện bản thân", "C"], ["Chấp nhận sự điều phối", "S"]],
    [["Hướng ngoại", "I"], ["E ngại trước khó khăn", "S"], ["Mạnh mẽ và quyết liệt", "D"], ["Được nhận xét là dễ mến", "I"]],
    [["Làm việc theo thói quen", "S"], ["Không do dự khi quyết định", "D"], ["Thích trò chuyện, chia sẻ", "I"], ["Biết điều chỉnh cảm xúc", "C"]],
    [["Theo đuổi đến cùng mục tiêu", "D"], ["Hào phóng, hào sảng", "I"], ["Kỷ luật và nề nếp", "C"], ["Luôn nhiều năng lượng", "I"]],
    [["Điềm tĩnh trong mọi tình huống", "S"], ["Thiếu kiên nhẫn", "D"], ["Tinh ý, quan sát tốt", "C"], ["Khiêm tốn và giản dị", "S"]],
    [["Giao tiếp khéo léo", "I"], ["Giữ vững lập trường", "D"], ["Dễ nghe theo người khác", "S"], ["Mọi người muốn hợp tác cùng", "I"]],
    [["Vui tính và thoải mái", "I"], ["Sẵn sàng phối hợp làm việc", "S"], ["Đưa ra và bảo vệ quan điểm", "D"], ["Làm việc có hệ thống", "C"]],
    [["Luôn cảm thấy bất an", "C"], ["Nhận được sự chú ý", "I"], ["Để ý tiểu tiết", "C"], ["Thân thiện, hòa nhã", "S"]],
    [["Luôn vui vẻ, lạc quan", "I"], ["Kiên trì theo đuổi mục tiêu", "D"], ["Nhiệt tình hỗ trợ người khác", "S"], ["Ít bộc lộ cảm xúc", "C"]],
    [["Thẳng thắn bày tỏ quan điểm", "D"], ["Đặt mình vào người khác", "S"], ["Công bằng và khách quan", "C"], ["Tự tin và vững vàng", "D"]],
    [["Luôn tận tâm, chu đáo", "S"], ["Dễ dàng bày tỏ cảm xúc", "I"], ["Quyết đoán và dẫn dắt", "D"], ["Nhanh nhạy, phản ứng tốt", "C"]],
    [["Luôn giúp đỡ mọi người", "S"], ["Tôn trọng mọi người xung quanh", "S"], ["Lạc quan trong cuộc sống", "I"], ["Dẫn đầu, tạo ra sự thay đổi", "D"]],
    [["Nhẹ nhàng và điềm đạm", "S"], ["Chủ động và tự lập", "D"], ["Kiên nhẫn và bình tĩnh", "S"], ["Luôn cởi mở, hòa đồng", "I"]],
    [["Luôn giữ vững lập trường", "D"], ["Tỉ mỉ và cầu toàn", "C"], ["Làm việc theo nguyên tắc", "C"], ["Mang năng lượng tích cực", "I"]],
  ];

  const QUESTIONS = RAW_QUESTIONS.map(function (items, index) {
    return {
      id: "q" + (index + 1),
      order: index + 1,
      items: items.map(function (item, itemIndex) {
        return { id: String.fromCharCode(97 + itemIndex), text: item[0], disc: item[1] };
      }),
    };
  });

  const app = document.getElementById("app");
  const state = {
    auth: loadFromStorage(STORAGE_KEYS.auth, null),
    pending: loadFromStorage(STORAGE_KEYS.pending, null),
    routeData: {},
    notices: [],
  };

  function loadFromStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function saveToStorage(key, value) {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  function setAuth(payload) {
    state.auth = payload;
    saveToStorage(STORAGE_KEYS.auth, payload);
  }

  function setPending(payload) {
    state.pending = payload;
    saveToStorage(STORAGE_KEYS.pending, payload);
  }

  function pushNotice(type, message) {
    state.notices = [{ id: uid(), type: type, message: message }];
  }

  function getRoute() {
    const hash = window.location.hash.replace(/^#/, "") || "/";
    return { hash: hash, parts: hash.split("/").filter(Boolean) };
  }

  function navigate(path) {
    window.location.hash = path.startsWith("/") ? path : "/" + path;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderNotFound(message) {
    return (
      '<main class="type-page">' +
      '<div class="container">' +
      '<section class="panel section-card">' +
      '<div class="eyebrow">Không tìm thấy</div>' +
      '<h2 class="section-title">Trang này hiện không tồn tại.</h2>' +
      '<p class="section-copy">' +
      escapeHtml(message || "Đường dẫn không hợp lệ.") +
      "</p>" +
      '<div class="card-actions"><a class="btn btn-primary" href="#/">Về trang chủ</a></div>' +
      "</section>" +
      "</div>" +
      "</main>"
    );
  }

  function highlightAccent(text) {
    const safeText = escapeHtml(text || "");
    return safeText.replace(/DISC/gi, '<span class="text-accent">$&</span>');
  }

  async function apiRequest(action, payload, options) {
    options = options || {};
    if (!CONFIG.apiBase) {
      throw new Error("Khong cau hinh duoc DISC_CONFIG.apiBase de gui Google Apps Script.");
    }

    let response;
    try {
      response = await fetch(CONFIG.apiBase, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: action,
          token: options.skipAuth ? null : state.auth && state.auth.token,
          payload: payload || {},
        }),
      });
    } catch (_networkError) {
      throw new Error("Khong ket noi duoc Apps Script. Hay kiem tra lai link deploy hoac quyen truy cap Web App.");
    }

    let data;
    try {
      data = await response.json();
    } catch (_parseError) {
      throw new Error("Apps Script khong tra ve JSON hop le. Hay deploy lai Web App ban moi nhat.");
    }

    if (!response.ok || !data.ok) {
      throw new Error((data && data.error) || "Yeu cau that bai.");
    }
    return data.data;
  }

  function ensurePendingSession() {
    if (state.pending && state.pending.responses && state.pending.responses.length === QUESTIONS.length) {
      return state.pending;
    }
    const pending = {
      id: uid(),
      createdAt: new Date().toISOString(),
      responses: QUESTIONS.map(function (question) {
        return { questionId: question.id, most: null, least: null };
      }),
    };
    setPending(pending);
    return pending;
  }

  function getPendingResponse(questionId) {
    const pending = ensurePendingSession();
    return pending.responses.find(function (item) {
      return item.questionId === questionId;
    });
  }

  function savePendingChoice(questionId, mode, itemId) {
    const pending = ensurePendingSession();
    const response = pending.responses.find(function (item) {
      return item.questionId === questionId;
    });
    if (!response) return;

    if (mode === "most") {
      response.most = response.most === itemId ? null : itemId;
      if (response.least === response.most) response.least = null;
    } else {
      response.least = response.least === itemId ? null : itemId;
      if (response.most === response.least) response.most = null;
    }
    setPending(pending);
    render();
  }

  function isPendingComplete() {
    if (!state.pending) return false;
    return state.pending.responses.every(function (item) {
      return item.most && item.least;
    });
  }

  function renderTopbar() {
    const auth = state.auth;
    return (
      '<header class="topbar"><div class="topbar-inner"><a class="brand" href="#/"><div class="brand-mark">DC</div><div class="brand-copy"><strong>' +
      escapeHtml(SETTINGS.siteTitle) +
      '</strong><span>Trắc nghiệm DISC 28 câu nội bộ</span></div></a><nav class="topnav"><a class="nav-link" href="#/">Trang chủ</a><a class="nav-link" href="#/disc/d">Nhóm DISC</a>' +
      (auth
        ? '<a class="nav-link" href="#/profile">Hồ sơ</a>' +
          (auth.user && auth.user.role === "admin"
            ? '<a class="nav-link" href="#/admin">Báo cáo admin</a>'
            : "") +
          '<button class="btn btn-secondary" data-action="logout">Đăng xuất</button>'
        : '<a class="nav-link" href="#/login">Đăng nhập</a><a class="btn btn-primary" href="#/register">Đăng ký</a>') +
      "</nav></div></header>"
    );
  }

  function renderFooter() {
    return "";
  }

  function renderNotices() {
    if (!state.notices.length) return "";
    return (
      '<div class="container" style="padding-top:14px">' +
      state.notices
        .map(function (notice) {
          return (
            '<div class="panel" style="padding:14px 18px; border-left:4px solid ' +
            (notice.type === "error" ? "#ef4444" : "#ff640a") +
            '">' +
            escapeHtml(notice.message) +
            "</div>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function renderHome() {
    return (
      "<main>" +
      '<section class="hero"><div class="container hero-grid"><div><div class="eyebrow">Google Sheet + Email + Admin dashboard</div><h1 class="hero-title">' +
      highlightAccent(SETTINGS.heroTitle) +
      '</h1><p class="hero-copy">' +
      escapeHtml(SETTINGS.heroCopy) +
      '</p><div class="hero-actions"><button class="btn btn-primary" data-action="start-quiz">' +
      escapeHtml(SETTINGS.startButton) +
      '</button><a class="btn btn-secondary" href="#/register">Đăng ký ngay tại trang chủ</a></div><div class="metric-grid">' +
      metricCard("Đăng ký tại chỗ", "Người dùng có thể tạo tài khoản ngay tại trang chủ và lưu hồ sơ trên Google Sheet.") +
      metricCard("Gửi kết quả qua mail", "Sau bài test, kết quả chỉ mở nếu email gửi thành công.") +
      metricCard("Admin tách riêng", "Tài khoản admin có dashboard xem hôm nay có bao nhiêu người đã làm bài, họ là ai.") +
      '</div></div><div class="hero-visual panel"><div class="visual-card">' +
      visualRow("A", "Đăng ký / Đăng nhập", "Tài khoản user và admin tách biệt rõ") +
      visualRow("Q", "28 câu hỏi", "Chọn Giống nhất và Khác nhất") +
      visualRow("M", "Email kết quả", "Gửi mail đẹp, cá nhân hóa theo mã DISC") +
      visualRow("R", "Báo cáo admin", "Thống kê hôm nay, danh sách người làm bài, trạng thái gửi mail") +
      "</div></div></div></section>" +
      '<section class="section"><div class="container"><div class="section-header"><div><div class="eyebrow">Luồng sản phẩm</div><h2 class="section-title">Đúng luồng nghiệp vụ mà anh/chị vừa mô tả.</h2></div><p class="section-copy">Frontend này đã được chuyển thành giao diện kết nối backend thật. Phần xác thực, phân quyền, ghi Google Sheet và gửi email được thiết kế để chạy với Google Apps Script.</p></div><div class="benefit-grid">' +
      infoCard("01", "Đăng ký ngay trang chủ", "Lưu hồ sơ người dùng vào Google Sheet qua backend Apps Script.") +
      infoCard("02", "Làm xong mới bắt đăng ký", "Nếu chưa đăng nhập, người dùng vẫn làm bài được và sẽ bị chặn ở bước nhận kết quả.") +
      infoCard("03", "Chỉ show kết quả nếu mail thành công", "Nếu email sai hoặc gửi thất bại, hồ sơ chỉ hiện trạng thái lỗi và nút cập nhật email.") +
      infoCard("04", "Admin xem được báo cáo", "User thường không thể thấy nội dung thống kê, lịch sử người khác hay dashboard.") +
      "</div></div></section>" +
      '<section class="section"><div class="container info-grid"><article class="panel section-card"><div class="eyebrow">Dành cho người dùng</div><h3>Làm bài test, nhận kết quả, xem lịch sử và cập nhật email nếu gửi thất bại.</h3><ul class="bullet-list"><li>Người dùng không đăng nhập vẫn được làm hết 28 câu.</li><li>Sau câu 28, hệ thống bắt buộc đăng ký / đăng nhập để nhận kết quả.</li><li>Nếu email gửi thành công, kết quả hiện trong hồ sơ và có link xem chi tiết.</li><li>Nếu email sai, hồ sơ đánh dấu sai thông tin người nhận và cho cập nhật lại.</li></ul></article><article class="panel section-card"><div class="eyebrow">Dành cho admin</div><h3>Admin có tài khoản riêng, dashboard riêng và quyền xem báo cáo tổng hợp.</h3><ul class="bullet-list"><li>Xem hôm nay có bao nhiêu người làm bài.</li><li>Xem họ là ai, email nào, thời gian nào, mã DISC gì.</li><li>Xem trạng thái mail: thành công / lỗi / đang chờ gửi lại.</li><li>Không user thường nào có quyền vào luồng này.</li></ul></article></div></section>' +
      "</main>"
    );
  }

  function visualRow(icon, title, copy) {
    return '<div class="visual-row"><div class="visual-tag"><span class="visual-icon" style="background:#ff8a3d">' + icon + '</span><div><strong>' + title + '</strong><div class="helper">' + copy + "</div></div></div></div>";
  }

  function metricCard(title, text) {
    return '<div class="metric-card"><strong>' + title + "</strong><span>" + text + "</span></div>";
  }

  function infoCard(icon, title, text) {
    return '<article class="section-card"><div class="badge-circle">' + icon + "</div><h3>" + title + '</h3><p class="card-copy">' + text + "</p></article>";
  }

  function renderAuthPage(mode) {
    const title = mode === "login" ? "Đăng nhập" : "Đăng ký tài khoản";
    const subtitle =
      mode === "login"
        ? "Đăng nhập để xem lịch sử bài test, nhận kết quả và cập nhật email nếu cần."
        : "Đăng ký ngay tại trang chủ để lưu hồ sơ, đồng bộ lịch sử bài test và nhận kết quả qua email.";
    const hasPendingComplete = isPendingComplete();

    return (
      '<main class="type-page"><div class="container"><section class="panel section-card"><div class="eyebrow">' +
      (mode === "login" ? "Tài khoản đã có" : "Tạo tài khoản mới") +
      '</div><h2 class="section-title">' +
      title +
      '</h2><p class="section-copy">' +
      subtitle +
      (hasPendingComplete
        ? " Bạn đang có một bài test đã hoàn thành và sẽ được gửi đi ngay sau khi xác thực thành công."
        : "") +
      '</p><form id="' +
      mode +
      '-form" class="form-grid" style="margin-top:20px">' +
      (mode === "register"
        ? '<div class="field"><label class="label">Họ và tên</label><input class="input" name="full_name" required></div><div class="field"><label class="label">Số điện thoại</label><input class="input" name="phone"></div>'
        : "") +
      '<div class="field"><label class="label">Email</label><input class="input" name="email" type="email" required></div><div class="field"><label class="label">Mật khẩu</label><input class="input" name="password" type="password" required></div><div class="field full"><button class="btn btn-primary" type="submit">' +
      (mode === "login" ? "Đăng nhập" : "Đăng ký và tiếp tục") +
      '</button></div></form><div class="card-actions" style="margin-top:12px">' +
      (mode === "login"
        ? '<a class="btn btn-ghost" href="#/register">Chưa có tài khoản? Đăng ký</a>'
        : '<a class="btn btn-ghost" href="#/login">Đã có tài khoản? Đăng nhập</a>') +
      '</div></section></div></main>'
    );
  }

  function renderQuiz(stepText) {
    ensurePendingSession();
    const step = Math.max(1, Math.min(QUESTIONS.length, Number(stepText || 1)));
    const question = QUESTIONS[step - 1];
    const response = getPendingResponse(question.id);
    const isReady = response && response.most && response.least;
    const accordionOpen = sessionStorage.getItem("disc_guide_open") !== "0";
    const progress = Math.round((step / QUESTIONS.length) * 100);

    return (
      '<main class="quiz-page"><div class="container"><a class="back-link" href="#/">&larr; Quay lại</a><section class="accordion"><button class="accordion-head" data-action="toggle-guide"><span>Hướng dẫn thực hiện</span><span>' +
      (accordionOpen ? "&#8963;" : "&#8964;") +
      '</span></button><div class="accordion-body ' +
      (accordionOpen ? "" : "hidden") +
      '"><p>Bài đánh giá này gồm 28 câu, mỗi câu có 4 mô tả khác nhau.</p><ul><li>Hãy đọc kỹ tất cả mô tả</li><li>Với mỗi câu, bạn chỉ chọn 1 mô tả “giống bạn nhất” và 1 mô tả “khác bạn nhất”.</li></ul><p>Đôi khi bạn có thể thấy hơi khó để đưa ra lựa chọn, nhưng đừng lo vì bài trắc nghiệm DISC này không có đúng hay sai. Hãy chọn những mô tả nào bạn cảm thấy phản ánh đúng con người mình nhất.</p></div></section><section class="question-wrap"><div class="quiz-head"><h1 class="quiz-title">Bài trắc nghiệm DISC</h1><div class="quiz-progress-text">' +
      step +
      '/28</div><div class="progress-track"><span style="width:' +
      progress +
      '%"></span></div></div><div class="quiz-table-head"><div>Mô tả</div><div>Khác nhất</div><div>Giống nhất</div></div><div class="quiz-body">' +
      question.items
        .map(function (item) {
          return (
            '<div class="quiz-row"><div class="quiz-row-title">' +
            escapeHtml(item.text) +
            '</div><button class="vote-btn ' +
            (response.least === item.id ? "active-least" : "") +
            '" data-action="pick-choice" data-question="' +
            question.id +
            '" data-mode="least" data-item="' +
            item.id +
            '">&#128078;</button><button class="vote-btn ' +
            (response.most === item.id ? "active-most" : "") +
            '" data-action="pick-choice" data-question="' +
            question.id +
            '" data-mode="most" data-item="' +
            item.id +
            '">&#128077;</button></div>'
          );
        })
        .join("") +
      '</div><div class="quiz-footer">' +
      (step > 1
        ? '<a class="btn btn-secondary" href="#/quiz/' + (step - 1) + '">&larr; Câu trước</a>'
        : '<span></span>') +
      (step < QUESTIONS.length
        ? '<a class="btn btn-primary ' +
          (isReady ? "" : "disabled") +
          '" ' +
          (isReady ? 'href="#/quiz/' + (step + 1) + '"' : "") +
          '>Câu sau &rarr;</a>'
        : '<button class="btn btn-primary" data-action="complete-pending" ' +
          (isReady ? "" : "disabled") +
          '>Nhận kết quả</button>') +
      '</div></section></div></main>'
    );
  }

  function renderLockedResult(assessmentId, statusText) {
    return (
      '<main class="type-page"><div class="container"><section class="panel section-card"><div class="eyebrow">Kết quả đang bị khóa</div><h2 class="section-title">Hệ thống chưa mở kết quả này cho người dùng.</h2><p class="section-copy">' +
      escapeHtml(statusText) +
      ' Nếu email gửi thất bại hoặc sai thông tin người nhận, vui lòng vào Hồ sơ để cập nhật lại email và gửi lại kết quả.</p><div class="card-actions"><a class="btn btn-primary" href="#/profile">Mở hồ sơ</a></div></section></div></main>'
    );
  }

  function renderResultPage() {
    const detail = state.routeData.result;
    if (!detail) {
      loadResult();
      return '<main class="type-page"><div class="container"><section class="panel section-card"><h2 class="section-title">Đang tải kết quả...</h2></section></div></main>';
    }
    if (!detail.result_visible_to_user) {
      return renderLockedResult(detail.assessment_id, detail.email_status_text || 'Email gửi chưa thành công.');
    }

    const combo = COMBINATION_LABELS[detail.disc_code] || ['Phong cách kết hợp', 'Sự pha trộn giữa hai động lực hành vi nổi trội.'];
    const primary = DISC_TYPES[detail.disc_primary];
    const secondary = DISC_TYPES[detail.disc_secondary];
    const detailText =
      primary.description +
      ' Khi kết hợp với sắc thái ' +
      secondary.nameVi.toLowerCase() +
      ', hồ sơ của bạn có thêm xu hướng ' +
      secondary.tone.toLowerCase();

    return (
      '<main class="result-page"><div class="container"><a class="back-link" href="#/profile">&larr; Quay lại</a><section class="result-hero"><div><div class="eyebrow">Kết quả DISC</div><h1 class="combo-code">' +
      escapeHtml(detail.disc_code) +
      ' - ' +
      escapeHtml(combo[0]) +
      '</h1><p class="combo-subtitle">' +
      escapeHtml(combo[1]) +
      '</p></div><div class="result-illustration"><div class="figure"></div></div></section><section class="section"><div class="result-layout"><div class="left-panel"><div class="share-card"><div class="left-title-card"><div class="type-letter" style="background:' +
      primary.color +
      '">' +
      detail.disc_code +
      '</div><div><strong>' +
      escapeHtml(detail.disc_code + ' - ' + combo[0]) +
      '</strong></div></div><div class="toggle-row"><span class="toggle-switch"></span>Hiển thị huy hiệu trên hồ sơ</div><div class="card-actions"><button class="btn btn-secondary" data-action="copy-link" data-link="' +
      window.location.href +
      '">Chia sẻ</button><button class="btn btn-primary" data-action="start-quiz">Làm lại trắc nghiệm</button></div></div><div class="score-card"><div class="small-note">Mức độ của từng loại đặc điểm</div><div class="score-chart"><div class="score-chart-left">' +
      ['D', 'I', 'S', 'C'].map(function (key) {
        return '<span class="score-pill" style="background:' + DISC_TYPES[key].color + '">' + key + '</span>';
      }).join('') +
      '</div><div><div class="chart-grid">' +
      renderChartSvg(detail.chart_scores || {
        D: detail.chart_d || 4,
        I: detail.chart_i || 4,
        S: detail.chart_s || 4,
        C: detail.chart_c || 4,
      }) +
      '</div><div class="score-scale">' +
      [1,2,3,4,5,6,7].map(function (n) { return '<span>' + n + '</span>'; }).join('') +
      '</div></div><div class="score-chart-right">' +
      ['D', 'I', 'S', 'C'].map(function (key) {
        const value = (detail.chart_scores && detail.chart_scores[key]) || detail['chart_' + key.toLowerCase()] || 4;
        return '<span class="small-note">' + levelLabel(value) + '</span>';
      }).join('') +
      '</div></div></div></div><div><article class="result-panel"><div class="eyebrow">M? t? chi ti?t</div><h2>' +
      escapeHtml(detail.disc_code + ' - ' + combo[0]) +
      '</h2><p class="type-copy">' +
      escapeHtml(detailText) +
      '</p></article><div class="trait-grid">' +
      traitCard('warm', 'Giá trị mang lại', 'Bạn thường tạo giá trị nhất khi ' + lowerFirst(primary.highlights[0]) + ', đồng thời được bổ sung bởi nét ' + lowerFirst(secondary.highlights[0]) + '.', '#d4a62c') +
      traitCard('mint', 'Cảm xúc đặc trưng', 'Cảm xúc quen thuộc của bạn thường xoay quanh nhu cầu ' + emotionNeed(primary.key) + '.', '#22c55e') +
      traitCard('rose', 'Dưới áp lực', lowerFirst(primary.weaknesses[0]) + '; khi kết hợp với ' + secondary.nameVi + ', phản ứng này ' + pressureFlavor(secondary.key) + '.', '#ec4899') +
      traitCard('blue', 'Mục tiêu', 'Bạn thường hướng tới việc ' + goalText(primary.key) + '.', '#0ea5e9') +
      traitCard('teal', 'Cải thiện qua', lowerFirst(primary.advice), '#14b8a6') +
      traitCard('sky', 'Đánh giá người khác qua', evaluationText(primary.key), '#3b82f6') +
      traitCard('violet', 'Nỗi sợ', fearText(primary.key, secondary.key), '#8b5cf6') +
      traitCard('lime', 'Ảnh hưởng người khác bằng', influenceText(primary.key, secondary.key), '#84cc16') +
      '</div></div></div></section></div></main>'
    );
  }

  function renderProfilePage() {
    if (!state.auth) return renderRequireLogin();
    const history = state.routeData.history;
    if (!history) {
      loadHistory();
      return '<main class="type-page"><div class="container"><section class="panel section-card"><h2 class="section-title">Đang tải hồ sơ...</h2></section></div></main>';
    }

    return (
      '<main class="type-page"><div class="container"><div class="result-layout"><aside class="panel section-card"><div class="eyebrow">Hồ sơ</div><h3>' +
      escapeHtml((state.auth.user && state.auth.user.full_name) || 'Người dùng') +
      '</h3><p class="card-copy">' +
      escapeHtml((state.auth.user && state.auth.user.email) || '') +
      '</p><div class="card-actions" style="margin-top:12px"><a class="btn btn-ghost" href="#/profile">Bài kiểm tra</a><button class="btn btn-ghost" data-action="logout">Đăng xuất</button></div></aside><section class="panel section-card"><div class="section-header"><div><div class="eyebrow">Hồ sơ cá nhân</div><h2 class="section-title">Bài trắc nghiệm đã làm</h2></div></div>' +
      (history.items && history.items.length
        ? history.items
            .map(function (item) {
              const locked = !item.result_visible_to_user;
              const status = item.email_status_text || (item.email_status === 'sent' ? 'Đã gửi kết quả' : 'Sai thông tin người nhận');
              return (
                '<article class="share-card" style="margin-top:16px"><div class="header-actions"><strong>' +
                escapeHtml((item.disc_code || '--') + ' - ' + (item.result_title || 'Đang chờ kết quả')) +
                '</strong>' +
                (locked
                  ? '<span class="small-note" style="color:#ef4444">' + escapeHtml(status) + '</span>'
                  : '<a class="btn btn-secondary" href="#/result/' + item.assessment_id + '">Xem chi tiết</a>') +
                '</div><div class="card-copy" style="margin:12px 0">' +
                escapeHtml(item.submitted_at_text || '') +
                '</div><div class="card-actions">' +
                (locked
                  ? '<form class="inline-email-form" data-action="update-email" data-assessment="' + item.assessment_id + '"><input class="input" name="email" type="email" placeholder="Nhập lại email đúng" required style="min-width:280px"><button class="btn btn-primary" type="submit">Cập nhật để nhận kết quả</button></form>'
                  : '<span class="small-note">Email đã gửi thành công. Kết quả đã được mở.</span>') +
                '</div></article>'
              );
            })
            .join('')
        : '<div class="empty-state">Bạn chưa có bài test nào được lưu.</div>') +
      '</section></div></div></main>'
    );
  }

  function renderRequireLogin() {
    return '<main class="type-page"><div class="container"><section class="panel section-card"><div class="eyebrow">Cần đăng nhập</div><h2 class="section-title">Vui lòng đăng nhập để tiếp tục.</h2><div class="card-actions"><a class="btn btn-primary" href="#/login">Đăng nhập</a><a class="btn btn-secondary" href="#/register">Đăng ký</a></div></section></div></main>';
  }

  function renderAdminPage() {
    if (!state.auth) return renderRequireLogin();
    if (!state.auth.user || state.auth.user.role !== 'admin') {
      return '<main class="type-page"><div class="container"><section class="panel section-card"><div class="eyebrow">Không có quyền</div><h2 class="section-title">Chỉ admin mới được xem báo cáo.</h2></section></div></main>';
    }
    const dashboard = state.routeData.admin;
    if (!dashboard) {
      loadAdminDashboard();
      return '<main class="type-page"><div class="container"><section class="panel section-card"><h2 class="section-title">Đang tải dashboard...</h2></section></div></main>';
    }

    return (
      '<main class="type-page"><div class="container"><section class="panel section-card"><div class="section-header"><div><div class="eyebrow">Báo cáo admin</div><h2 class="section-title">Hôm nay có bao nhiêu người đã làm bài test, họ là ai?</h2></div></div><div class="metric-grid">' +
      metricCard(String(dashboard.today_count || 0), 'Số bài test hôm nay') +
      metricCard(String(dashboard.email_sent_count || 0), 'Email gửi thành công') +
      metricCard(String(dashboard.email_failed_count || 0), 'Email lỗi / cần cập nhật') +
      '</div><div class="section-header" style="margin-top:20px"><div><div class="eyebrow">Danh sách gần đây</div></div></div>' +
      ((dashboard.recent || []).length
        ? dashboard.recent.map(function (item) {
            return (
              '<article class="share-card" style="margin-top:14px"><div class="header-actions"><strong>' +
              escapeHtml(item.full_name || '(Ch?a c? t?n)') +
              '</strong><span class="small-note">' +
              escapeHtml(item.disc_code || '--') +
              '</span></div><div class="card-copy">' +
              escapeHtml((item.email || '') + ' • ' + (item.submitted_at_text || '')) +
              '</div><div class="chip-row" style="margin-top:12px"><span class="btn btn-ghost">Mail: ' +
              escapeHtml(item.email_status || '') +
              '</span><span class="btn btn-ghost">Visible: ' +
              (item.result_visible_to_user ? 'yes' : 'no') +
              '</span></div></article>'
            );
          }).join('')
        : '<div class="empty-state">Chưa có dữ liệu báo cáo.</div>') +
      '</section></div></main>'
    );
  }

  function renderDiscType(typeKey) {
    const style = DISC_TYPES[(typeKey || '').toUpperCase()];
    if (!style) {
      return '<main class="type-page"><div class="container"><section class="panel section-card"><h2 class="section-title">Không tìm thấy nhóm DISC.</h2></section></div></main>';
    }
    return (
      '<main class="type-page"><div class="container"><a class="back-link" href="#/">&larr; Quay lại</a><section class="result-hero"><div><div class="eyebrow">' +
      escapeHtml(style.nameVi) +
      '</div><h1 class="combo-code" style="color:' +
      style.color +
      '">' +
      escapeHtml(style.fullName) +
      '</h1><p class="combo-subtitle">' +
      escapeHtml(style.description) +
      '</p></div><div class="result-illustration"><div class="figure"></div></div></section><div class="article-grid">' +
      articleCard('Đặc điểm nổi bật', style.highlights) +
      articleCard('Điểm mạnh', style.strengths) +
      articleCard('Điểm cần cân bằng', style.weaknesses) +
      articleCard('Phong cách làm việc', [style.workStyle]) +
      articleCard('Nghề nghiệp phù hợp', style.career) +
      articleCard('Lời khuyên phát triển', [style.advice]) +
      '</div></div></main>'
    );
  }

  function articleCard(title, list) {
    return '<article class="article-card"><div class="eyebrow">' + title + "</div><h3>" + title + "</h3><ul>" + list.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") + "</ul></article>";
  }

  function renderChartSvg(scores) {
    const points = ["D", "I", "S", "C"].map(function (key, index) {
      const value = scores[key] || 4;
      const x = 15 + ((value - 1) / 6) * 70;
      const y = 18 + index * 26;
      return { x: x, y: y };
    });
    const line = points.map(function (point) { return point.x + "," + point.y; }).join(" ");
    return '<svg class="chart-svg" viewBox="0 0 100 120" preserveAspectRatio="none"><polyline points="' + line + '" fill="none" stroke="#ffb632" stroke-width="1.8" vector-effect="non-scaling-stroke"></polyline>' + points.map(function (point) { return '<circle cx="' + point.x + '" cy="' + point.y + '" r="2.5" fill="#fff" stroke="#ffb632" stroke-width="1.4" vector-effect="non-scaling-stroke"></circle>'; }).join("") + "</svg>";
  }

  function levelLabel(value) {
    if (value >= 6.2) return "Rất cao";
    if (value >= 3.2) return "Trung bình";
    return "Thấp";
  }

  function emotionNeed(key) {
    return {
      D: "duoc lam chu tinh huong va tien ve dich nhanh",
      I: "duoc ket noi, ghi nhan va tao anh huong tich cuc",
      S: "giu su hai hoa, on dinh va cam giac an toan",
      C: "dam bao tinh dung dan, logic va tieu chuan ro rang",
    }[key];
  }

  function goalText(key) {
    return {
      D: "dat ket qua, dan dat va tao chuyen dong ro rang",
      I: "ket noi, truyen dong luc va keo moi nguoi cung nhap cuoc",
      S: "duy tri su on dinh, dang tin va ho tro tap the di duong dai",
      C: "lam dung, lam chac va giu chat luong o muc cao",
    }[key];
  }

  function evaluationText(key) {
    return {
      D: "Ban thuong danh gia cao nguoi chu dong, nhanh nhay, biet nhan trach nhiem va khong vong vo.",
      I: "Ban bi thu hut boi nhung nguoi co nang luong, giao tiep cuon hut, biet lan toa tinh than tich cuc.",
      S: "Ban danh gia cao nguoi chan thanh, ben bi, dang tin va biet nghi cho tap the.",
      C: "Ban tin tuong hon vao nguoi co logic, can than, dung hen va ton trong tieu chuan.",
    }[key];
  }

  function influenceText(primaryKey, secondaryKey) {
    const primaryText = {
      D: "su thang than, dinh huong ro va nhip hanh dong manh",
      I: "nang luong tich cuc, su loi cuon va kha nang ket noi tu nhien",
      S: "su on dinh, chan thanh va cam giac de chiu khi phoi hop",
      C: "lap luan chat che, su chuan xac va cam giac dang tin ve chuyen mon",
    }[primaryKey];
    const secondaryText = {
      D: "quyet doan hon khi can chot ha",
      I: "mem hon nho kha nang tao thien cam",
      S: "em hon nho su kien nhan va on dinh",
      C: "thuyet phuc hon nho ly le va cau truc ro",
    }[secondaryKey];
    return "Ban thuong anh huong nguoi khac bang " + primaryText + ", va dieu do tro nen " + secondaryText + ".";
  }

  function fearText(primaryKey, secondaryKey) {
    const primaryFear = {
      D: "bi cham nhip, mat quyen chu dong hoac khong cham toi muc tieu",
      I: "bi phot lo, bi tach khoi tap the hoac khong con suc anh huong",
      S: "xung dot keo dai, thay doi dot ngot va cam giac mat an toan",
      C: "sai sot, mo ho, thieu chuan hoac bi buoc quyet khi chua du du lieu",
    }[primaryKey];
    const secondaryFear = {
      D: " Điều này làm bạn càng khó chấp nhận sự trì trệ.",
      I: " Điều này khiến bạn nhạy hơn với phản ứng của người xung quanh.",
      S: " Điều này khiến bạn muốn giữ nhịp an toàn nhiều hơn.",
      C: " Điều này làm bạn có xu hướng tự kiểm tra lại mọi thứ kỹ hơn.",
    }[secondaryKey];
    return "Nỗi sợ cốt lõi thường là " + primaryFear + "." + secondaryFear;
  }

  function pressureFlavor(key) {
    return {
      D: "de boc phat truc dien hon",
      I: "de bieu lo cam xuc ro hon",
      S: "thuong cham lai va thu minh hon",
      C: "thuong tro nen khat khe va kiem tra ky hon",
    }[key];
  }

  function uid() {
    return Math.random().toString(36).substr(2, 9);
  }

  function lowerFirst(str) {
    if (!str) return "";
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  function traitCard(tone, title, text, color) {
    return (
      '<article class="trait-card" data-tone="' +
      tone +
      '">' +
      '<div class="trait-chip"><span class="trait-dot" style="background:' +
      color +
      '"></span>' +
      title +
      "</div>" +
      '<p class="card-copy">' +
      text +
      "</p>" +
      "</article>"
    );
  }

  async function submitPendingToBackend() {
    const pending = state.pending;
    if (!pending || !isPendingComplete()) {
      pushNotice("error", "Bạn chưa hoàn thành hết 28 câu hỏi.");
      render();
      return;
    }
    try {
      const result = await apiRequest("submitAssessment", {
        session_id: pending.id,
        answers: pending.responses,
      });
      setPending(null);
      state.routeData.history = null;
      if (result.result_visible_to_user) {
        navigate("/result/" + result.assessment_id);
      } else {
        pushNotice("info", "Hệ thống đã ghi nhận bài test, nhưng email chưa gửi thành công. Vào Hồ sơ để cập nhật email.");
        navigate("/profile");
      }
    } catch (error) {
      pushNotice("error", error.message);
      render();
    }
  }

  async function loadHistory() {
    if (!state.auth) return;
    if (state.routeData.historyLoading) return;
    state.routeData.historyLoading = true;
    try {
      state.routeData.history = await apiRequest("getMyHistory", {});
    } catch (error) {
      state.routeData.history = { items: [] };
      pushNotice("error", error.message);
    } finally {
      state.routeData.historyLoading = false;
      render();
    }
  }

  async function loadAdminDashboard() {
    if (!state.auth) return;
    if (state.routeData.adminLoading) return;
    state.routeData.adminLoading = true;
    try {
      state.routeData.admin = await apiRequest("getAdminDashboard", {});
    } catch (error) {
      state.routeData.admin = { recent: [] };
      pushNotice("error", error.message);
    } finally {
      state.routeData.adminLoading = false;
      render();
    }
  }

  async function loadResult() {
    const route = getRoute();
    const assessmentId = route.parts[1];
    if (!assessmentId || state.routeData.resultLoading) return;
    state.routeData.resultLoading = true;
    try {
      state.routeData.result = await apiRequest("getAssessmentDetail", {
        assessment_id: assessmentId,
      });
    } catch (error) {
      state.routeData.result = {
        assessment_id: assessmentId,
        result_visible_to_user: false,
        email_status_text: error.message,
      };
      pushNotice("error", error.message);
    } finally {
      state.routeData.resultLoading = false;
      render();
    }
  }

  function resetRouteData() {
    state.routeData = {};
  }

  function renderPage() {
    const route = getRoute();
    const first = route.parts[0];
    let content = "";

    if (!first) content = renderHome();
    else if (first === "login") content = renderAuthPage("login");
    else if (first === "register") content = renderAuthPage("register");
    else if (first === "quiz") content = renderQuiz(route.parts[1]);
    else if (first === "profile") content = renderProfilePage();
    else if (first === "admin") content = renderAdminPage();
    else if (first === "result") content = renderResultPage();
    else if (first === "disc") content = renderDiscType(route.parts[1]);
    else content = renderNotFound("???ng d?n kh?ng h?p l?.");

    app.innerHTML =
      '<div class="app-shell">' +
      renderTopbar() +
      renderNotices() +
      content +
      renderFooter() +
      "</div>";
    bindActions();
  }

  function bindActions() {
    document.querySelectorAll('[data-action="start-quiz"]').forEach(function (button) {
      button.addEventListener("click", function () {
        ensurePendingSession();
        navigate("/quiz/1");
      });
    });

    document.querySelectorAll('[data-action="pick-choice"]').forEach(function (button) {
      button.addEventListener("click", function () {
        savePendingChoice(button.dataset.question, button.dataset.mode, button.dataset.item);
      });
    });

    document.querySelectorAll('[data-action="complete-pending"]').forEach(function (button) {
      button.addEventListener("click", function () {
        if (!state.auth) {
          navigate("/register");
          return;
        }
        submitPendingToBackend();
      });
    });

    document.querySelectorAll('[data-action="toggle-guide"]').forEach(function (button) {
      button.addEventListener("click", function () {
        const open = sessionStorage.getItem("disc_guide_open") !== "0";
        sessionStorage.setItem("disc_guide_open", open ? "0" : "1");
        render();
      });
    });

    document.querySelectorAll('[data-action="logout"]').forEach(function (button) {
      button.addEventListener("click", function () {
        setAuth(null);
        resetRouteData();
        pushNotice("info", "Đã đăng xuất.");
        navigate("/");
      });
    });

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const form = new FormData(loginForm);
        try {
          const data = await apiRequest(
            "login",
            {
              email: String(form.get("email") || "").trim(),
              password: String(form.get("password") || ""),
            },
            { skipAuth: true }
          );
          setAuth({ token: data.token, user: data.user });
          pushNotice("info", "Đăng nhập thành công.");
          if (isPendingComplete()) {
            await submitPendingToBackend();
          } else {
            navigate("/profile");
          }
        } catch (error) {
          pushNotice("error", error.message);
          render();
        }
      });
    }

    const registerForm = document.getElementById("register-form");
    if (registerForm) {
      registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const form = new FormData(registerForm);
        try {
          const data = await apiRequest(
            "register",
            {
              full_name: String(form.get("full_name") || "").trim(),
              phone: String(form.get("phone") || "").trim(),
              email: String(form.get("email") || "").trim(),
              password: String(form.get("password") || ""),
            },
            { skipAuth: true }
          );
          setAuth({ token: data.token, user: data.user });
          pushNotice("info", "Đăng ký thành công.");
          if (isPendingComplete()) {
            await submitPendingToBackend();
          } else {
            navigate("/profile");
          }
        } catch (error) {
          pushNotice("error", error.message);
          render();
        }
      });
    }

    document.querySelectorAll('[data-action="update-email"]').forEach(function (form) {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        try {
          await apiRequest("updateAssessmentEmail", {
            assessment_id: form.dataset.assessment,
            email: String(formData.get("email") || "").trim(),
          });
          pushNotice("info", "Đã cập nhật email và gửi lại kết quả.");
          state.routeData.history = null;
          await loadHistory();
        } catch (error) {
          pushNotice("error", error.message);
          render();
        }
      });
    });

    document.querySelectorAll('[data-action="copy-link"]').forEach(function (button) {
      button.addEventListener("click", function () {
        const link = button.dataset.link || window.location.href;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(link);
          button.textContent = "Đã sao chép";
          setTimeout(function () {
            button.textContent = "Chia s?";
          }, 1200);
        }
      });
    });
  }

  function render() {
    renderPage();
  }

  window.addEventListener("hashchange", function () {
    resetRouteData();
    render();
  });

  window.addEventListener("load", function () {
    render();
  });
})();
