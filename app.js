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
        "Quyết đoán, phản ứng nhanh và tập trung mục tiêu",
        "Ưa thử thách, thích tự chủ và thích vai trò dẫn dắt",
        "Giao tiếp trực tiếp, rõ ràng và thiên về hiệu quả",
      ],
      strengths: [
        "Ra quyết định nhanh trong áp lực",
        "Tinh thần chủ động, dám chịu trách nhiệm",
        "Có tố chất lãnh đạo và định hướng kết quả rõ ràng",
        "Hợp với môi trường tốc độ cao, nhiều mục tiêu lớn",
      ],
      weaknesses: [
        "Dễ thiếu kiên nhẫn khi người khác chậm nhịp",
        "Có thể quá thẳng và tạo cảm giác áp lực",
        "Khó tiếp nhận góp ý khi đang quá tin vào hướng đi của mình",
        "Thường ưu tiên mục tiêu hơn cảm xúc con người",
      ],
      workStyle:
        "Trong công việc, nhóm D thích tốc độ, quyền chủ động và các mục tiêu đo đếm rõ ràng. Họ thường muốn quyết nhanh, làm nhanh và nhìn vào bức tranh lớn thay vì sa vào tiểu tiết.",
      career: [
        "Quản lý / điều hành",
        "Kinh doanh",
        "Quản lý dự án",
        "Bất động sản",
        "Logistics / vận hành",
      ],
      advice:
        "Để đi xa hơn, nhóm D nên luyện thêm lắng nghe, chia sẻ quyền kiểm soát và cân bằng giữa kết quả với trải nghiệm của người xung quanh.",
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
        "Giỏi giao tiếp, kết nối và tạo thiện cảm",
        "Nhiệt tình, truyền cảm hứng và mang nhiều năng lượng tích cực",
        "Cởi mở với trải nghiệm mới và thích môi trường có tương tác",
      ],
      strengths: [
        "Khả năng thuyết phục và lan tỏa động lực tốt",
        "Dễ thích nghi với bối cảnh nhiều người và nhiều thay đổi",
        "Phù hợp với vai trò cần giao tiếp, sáng tạo, truyền cảm hứng",
        "Tạo không khí tích cực và kéo nhịp đội nhóm lên nhanh",
      ],
      weaknesses: [
        "Dễ cảm tính hoặc bốc đồng khi quá hứng khởi",
        "Khó giữ tập trung lâu vào việc lặp lại, tỉ mỉ",
        "Có thể thiếu kỷ luật theo đuổi đến cùng nếu không có cấu trúc hỗ trợ",
        "Dễ bị ảnh hưởng bởi sự công nhận của người khác",
      ],
      workStyle:
        "Nhóm I làm tốt nhất trong môi trường thân thiện, giàu tương tác, có không gian biểu đạt và khuyến khích sáng tạo. Họ thích được nói, được chia sẻ và được nhìn thấy tác động mình tạo ra.",
      career: [
        "Marketing / truyền thông",
        "Kinh doanh / phát triển thị trường",
        "Đào tạo / giảng dạy",
        "Chăm sóc khách hàng",
        "Sự kiện / cộng đồng",
      ],
      advice:
        "Nhóm I sẽ phát triển bền vững hơn khi rèn khả năng ưu tiên, giữ cam kết đến cùng và đưa cảm hứng đi cùng kỷ luật thực thi.",
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
        "Ôn hòa, kiên nhẫn và thích môi trường hòa thuận",
        "Trung thành, đáng tin cậy và bền bỉ với cam kết",
        "Lắng nghe tốt, hỗ trợ tốt và ít thích xung đột",
      ],
      strengths: [
        "Giữ sự ổn định khi môi trường nhiều áp lực",
        "Phối hợp nhóm tốt và tạo cảm giác an tâm cho người khác",
        "Làm việc đều tay, có trách nhiệm và đáng tin cậy",
        "Phù hợp với vai trò cần hỗ trợ, duy trì và chăm sóc lâu dài",
      ],
      weaknesses: [
        "Ngại thay đổi đột ngột và khó thích nghi quá nhanh",
        "Dễ né tránh xung đột hoặc chậm bày tỏ chính kiến",
        "Có thể đặt nhu cầu người khác lên trên bản thân quá mức",
        "Hay chần chừ trong các tình huống cần quyết rất nhanh",
      ],
      workStyle:
        "Nhóm S thích quy trình rõ, nhịp làm việc ổn định và môi trường tử tế. Họ phát huy rất tốt khi được tin tưởng, có thời gian thích nghi và được làm việc trong tập thể coi trọng sự hỗ trợ lẫn nhau.",
      career: [
        "Nhân sự",
        "Dịch vụ khách hàng",
        "Hành chính - văn phòng",
        "Y tế / chăm sóc",
        "Điều phối / hỗ trợ vận hành",
      ],
      advice:
        "Muốn bứt lên mạnh hơn, nhóm S nên tập nói rõ nhu cầu của mình, đặt ranh giới lành mạnh và tập thích nghi dần với thay đổi thay vì né tránh hoàn toàn.",
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
        "Chính xác, phân tích tốt và chú trọng chi tiết",
        "Tôn trọng quy trình, tiêu chuẩn và cấu trúc rõ ràng",
        "Tập trung cao, làm việc độc lập tốt và đáng tin cậy",
      ],
      strengths: [
        "Tư duy logic, nhìn thấy rủi ro và lỗ hổng nhanh",
        "Làm việc có hệ thống, giữ chuẩn rất tốt",
        "Phù hợp với việc cần kiểm soát chất lượng và dữ liệu",
        "Ít bị cuốn theo cảm xúc khi ra quyết định",
      ],
      weaknesses: [
        "Dễ cầu toàn và chậm quyết khi thiếu đủ dữ liệu",
        "Không thoải mái với môi trường mơ hồ hoặc thay đổi đột ngột",
        "Giao tiếp có thể hơi lạnh và quá thận trọng",
        "Có lúc đặt tiêu chuẩn quá cao cho bản thân và người khác",
      ],
      workStyle:
        "Nhóm C thích môi trường có quy trình rõ, ít nhiễu và đủ thời gian để suy nghĩ thấu đáo. Họ phù hợp với vai trò cần chất lượng, sự chuẩn xác và khả năng tổ chức tốt.",
      career: [
        "Phân tích dữ liệu",
        "Kiểm soát chất lượng",
        "Tài chính / kế toán",
        "Pháp chế / tuân thủ",
        "Kỹ thuật / quy trình",
      ],
      advice:
        "Để phát huy trọn vẹn, nhóm C nên học cách chấp nhận mức đủ tốt, giao tiếp dễ gần hơn và linh hoạt hơn trước các tình huống chưa hoàn hảo.",
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
      '</strong><span>Trắc nghiệm DISC 28 câu nội bộ</span></div></a><nav class="topnav"><a class="nav-link" href="#/">Trang chủ</a><div class="nav-group"><a class="nav-link" href="#/disc">Nhóm DISC</a><div class="nav-chip-row"><a class="nav-chip" href="#/disc/d">D</a><a class="nav-chip" href="#/disc/i">I</a><a class="nav-chip" href="#/disc/s">S</a><a class="nav-chip" href="#/disc/c">C</a></div></div>' +
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
      '<section class="hero hero-centered"><div class="container"><div class="hero-stack"><div class="eyebrow">Công cụ đánh giá tính cách DISC</div><h1 class="hero-title hero-title-center">Khám phá <span class="text-accent">tính cách</span><br>của bạn</h1><p class="hero-copy hero-copy-center">Bài đánh giá DISC giúp bạn hiểu rõ hơn phong cách hành vi, điểm mạnh tự nhiên và cách giao tiếp hiệu quả hơn trong học tập, công việc và phối hợp với người khác.</p><p class="hero-copy hero-copy-center">Bài test hiện tại gồm 28 câu hỏi. Mỗi câu có 4 mô tả ngắn, bạn chọn 1 mô tả giống mình nhất và 1 mô tả khác mình nhất để hệ thống đưa ra phần đánh giá phù hợp hơn với phong cách của bạn.</p><div class="hero-chip-line"><span class="hero-mini-note">Chọn cách khám phá phù hợp với nhu cầu của bạn</span></div><div class="hero-actions hero-actions-center"><button class="btn btn-primary" data-action="start-quiz">' +
      escapeHtml(SETTINGS.startButton) +
      '</button><a class="btn btn-secondary" href="#/disc">Xem 4 nhóm DISC</a></div><div class="hero-copy hero-copy-center hero-footnote">Miễn phí · 28 câu hỏi · Kết quả chi tiết hơn sau khi hoàn thành</div><div class="hero-stat-row"><div class="hero-stat"><strong>28</strong><span>Câu hỏi đánh giá</span></div><div class="hero-stat"><strong>4</strong><span>Nhóm tính cách DISC</span></div><div class="hero-stat"><strong>100%</strong><span>Phù hợp trải nghiệm nội bộ</span></div></div></div></div></section>' +
      '<section class="section"><div class="container"><div class="section-header section-header-center"><div style="width:100%"><div class="eyebrow">4 kiểu tính cách</div><h2 class="section-title section-title-center">4 Kiểu Tính Cách DISC</h2><p class="section-copy section-copy-center">Mỗi người đều có sự kết hợp riêng giữa 4 nhóm tính cách này.</p></div></div><div class="disc-card-grid">' +
      discSummaryCard("D", "Thống Lĩnh", "DOMINANCE", "Quyết đoán, mạnh mẽ, hướng đến kết quả. Luôn dẫn đầu và không ngại thử thách.", "13%") +
      discSummaryCard("I", "Ảnh Hưởng", "INFLUENCE", "Nhiệt tình, hoạt bát, truyền cảm hứng. Kết nối mọi người và tạo năng lượng tích cực.", "28%") +
      discSummaryCard("S", "Ổn Định", "STEADINESS", "Kiên nhẫn, đáng tin, quan tâm người khác. Gắn kết đội nhóm và duy trì sự hài hòa.", "47%") +
      discSummaryCard("C", "Cẩn Thận", "CONSCIENTIOUSNESS", "Chính xác, tỉ mỉ, có hệ thống. Đảm bảo chất lượng và tuân thủ tiêu chuẩn cao.", "12%") +
      '</div></div></section>' +
      '<section class="section"><div class="container"><div class="section-header"><div style="width:100%"><div class="eyebrow">Lợi ích khi làm bài test DISC</div></div></div><div class="benefit-grid">' +
      infoCard("01", "Nhóm DISC nổi trội", "Biết nhóm nào đang là xu hướng hành vi nổi bật nhất của bạn trong 4 nhóm D, I, S, C.") +
      infoCard("02", "Điểm mạnh tự nhiên", "Nhìn rõ những điểm bạn có thể phát huy trong công việc, phối hợp và giao tiếp.") +
      infoCard("03", "Điểm cần cân bằng", "Nhận ra những điều dễ tạo lệch nhịp hoặc gây khó khăn khi làm việc với người khác.") +
      infoCard("04", "Gợi ý phát triển", "Có thêm định hướng để điều chỉnh phong cách của mình theo hướng hiệu quả hơn.") +
      '</div></div></section>' +
      '<section class="section"><div class="container"><div class="panel section-card"><div class="eyebrow">Phù hợp với ai?</div><h3>Bài test này phù hợp với những ai muốn hiểu mình rõ hơn trong công việc và giao tiếp.</h3><ul class="bullet-list"><li>Người đi làm muốn hiểu phong cách làm việc và cách phối hợp của bản thân.</li><li>Ứng viên muốn nhìn rõ hơn điểm mạnh tự nhiên trước khi ứng tuyển hoặc phỏng vấn.</li><li>Người quản lý muốn hiểu cách mình ra quyết định, dẫn dắt và phản hồi với đội nhóm.</li><li>Bất kỳ ai muốn có thêm một góc nhìn để hiểu mình và hiểu người khác tốt hơn.</li></ul></div></div></section>' +
      '<section class="section"><div class="container"><div class="panel section-card" style="text-align:center"><div class="eyebrow">Sẵn sàng bắt đầu?</div><h2 class="section-title">Làm bài trắc nghiệm DISC 28 câu để khám phá phong cách hành vi của bạn.</h2><p class="section-copy">Chỉ cần hoàn thành lần lượt 28 câu hỏi, hệ thống sẽ trả về kết quả chi tiết hơn để bạn hiểu rõ chính mình.</p><div class="hero-actions" style="justify-content:center;margin-top:18px"><button class="btn btn-primary" data-action="start-quiz">Bắt đầu làm bài</button><a class="btn btn-secondary" href="#/disc">Xem trước 4 nhóm DISC</a></div></div></div></section>' +
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

  function discSummaryCard(letter, title, subtitle, copy, percent) {
    return '<article class="disc-summary-card" data-style="' + letter + '"><div class="disc-summary-top"><div class="disc-summary-letter">' + letter + '</div><div class="disc-summary-percent">' + percent + '</div></div><h3>' + title + '</h3><div class="disc-summary-subtitle">' + subtitle + '</div><p class="card-copy">' + copy + '</p></article>';
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
              const resultVisible =
                item.result_visible_to_user === true ||
                item.result_visible_to_user === "TRUE" ||
                item.result_visible_to_user === "true" ||
                item.email_status === 'sent';
              const locked = !resultVisible;
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

  function renderDiscHub() {
    return (
      '<main class="type-page"><div class="container"><section class="panel section-card"><div class="section-header"><div><div class="eyebrow">Khám phá 4 nhóm</div><h2 class="section-title">Chọn nhóm DISC bạn muốn xem chi tiết.</h2></div><p class="section-copy">Từ trang này, người dùng có thể đi vào đầy đủ 4 nhóm tính cách D, I, S, C thay vì chỉ một trang mô tả duy nhất.</p></div><div class="type-grid">' +
      Object.keys(DISC_TYPES)
        .map(function (key) {
          const style = DISC_TYPES[key];
          return (
            '<article class="type-card" data-style="' +
            style.key +
            '"><div class="type-letter" style="background:' +
            style.color +
            '">' +
            style.key +
            '</div><h3>' +
            escapeHtml(style.fullName) +
            '</h3><p class="card-copy">' +
            escapeHtml(style.tone) +
            '</p><div class="card-actions" style="margin-top:12px"><a class="btn btn-secondary" href="#/disc/' +
            style.key.toLowerCase() +
            '">Xem nhóm ' +
            style.key +
            '</a></div></article>'
          );
        })
        .join('') +
      '</div></section></div></main>'
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
    else if (first === "disc") content = route.parts[1] ? renderDiscType(route.parts[1]) : renderDiscHub();
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
