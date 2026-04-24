(function () {
  const CONFIG = window.DISC_CONFIG || {};
  const STORAGE_KEYS = {
    auth: "disc_auth_v4",
    pending: "disc_pending_v4",
  };

  const SETTINGS = {
    siteTitle: "DISC Nội Bộ",
    startButton: "Bắt đầu kiểm tra",
  };

  const QUESTION_BANKS = window.DISC_QUESTION_BANKS || {};
  const QUESTION_BANK_VERSION = "v3-40";
  const ENVIRONMENT_KEYS = ["life", "work", "leadership"].filter(function (key) {
    return QUESTION_BANKS[key];
  });
  const DEFAULT_ENVIRONMENT_KEY = QUESTION_BANKS.work
    ? "work"
    : ENVIRONMENT_KEYS[0] || "life";

  const DISC_TYPES = {
    D: {
      key: "D",
      nameVi: "Nhóm D",
      fullName: "Dominance - Thống lĩnh",
      color: "#ffb632",
      tone: "Người quyết đoán, hướng kết quả và thích chinh phục thử thách.",
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
      career: ["Quản lý / điều hành", "Kinh doanh", "Quản lý dự án", "Bất động sản", "Logistics / vận hành"],
      advice:
        "Để đi xa hơn, nhóm D nên luyện thêm lắng nghe, chia sẻ quyền kiểm soát và cân bằng giữa kết quả với trải nghiệm của người xung quanh.",
    },
    I: {
      key: "I",
      nameVi: "Nhóm I",
      fullName: "Influence - Ảnh hưởng",
      color: "#ff8a3d",
      tone: "Người truyền năng lượng, thích kết nối và tạo cảm hứng.",
      description:
        "Nhóm I thường cởi mở, giàu nhiệt huyết và dễ tạo ảnh hưởng tích cực lên người khác. Họ thích giao tiếp, thích được ghi nhận và thường mang lại sức sống cho môi trường làm việc.",
      highlights: [
        "Giỏi giao tiếp, kết nối và tạo thiện cảm",
        "Nhiệt tình, truyền cảm hứng và giàu năng lượng tích cực",
        "Cởi mở với trải nghiệm mới và thích môi trường nhiều tương tác",
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
      career: ["Marketing / truyền thông", "Kinh doanh / phát triển thị trường", "Đào tạo / giảng dạy", "Chăm sóc khách hàng", "Sự kiện / cộng đồng"],
      advice:
        "Nhóm I sẽ phát triển bền vững hơn khi rèn khả năng ưu tiên, giữ cam kết đến cùng và đưa cảm hứng đi cùng kỷ luật thực thi.",
    },
    S: {
      key: "S",
      nameVi: "Nhóm S",
      fullName: "Steadiness - Ổn định",
      color: "#7bc96f",
      tone: "Người kiên nhẫn, tận tâm và tạo cảm giác an tâm cho tập thể.",
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
      career: ["Nhân sự", "Dịch vụ khách hàng", "Hành chính - văn phòng", "Y tế / chăm sóc", "Điều phối / hỗ trợ vận hành"],
      advice:
        "Muốn bật lên mạnh hơn, nhóm S nên tập nói rõ nhu cầu của mình, đặt ranh giới lành mạnh và tập thích nghi dần với thay đổi thay vì né tránh hoàn toàn.",
    },
    C: {
      key: "C",
      nameVi: "Nhóm C",
      fullName: "Conscientiousness - Cẩn thận",
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
        "Giao tiếp có thể hơi lạnh vì quá thận trọng",
        "Có lúc đặt tiêu chuẩn quá cao cho bản thân và người khác",
      ],
      workStyle:
        "Nhóm C thích môi trường có quy trình rõ, ít nhiễu và đủ thời gian để suy nghĩ thấu đáo. Họ phù hợp với vai trò cần chất lượng, sự chuẩn xác và khả năng tổ chức tốt.",
      career: ["Phân tích dữ liệu", "Kiểm soát chất lượng", "Tài chính / kế toán", "Pháp chế / tuân thủ", "Kỹ thuật / quy trình"],
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
  const RESULT_DISC_META = {
    D: {
      key: "D",
      shortName: "Thống lĩnh",
      english: "Dominance",
      color: "#4f86f7",
      soft: "#eaf2ff",
      icon: "⚡",
      tone: "Quyết đoán · Lãnh đạo",
      heroLine: "Người hành động — thấy mục tiêu và đạt được nó",
      chips: ["Quyết đoán", "Kết quả", "Lãnh đạo", "Thách thức", "Tự tin"],
      overview: "Bạn có xu hướng quyết đoán, thích dẫn dắt và muốn nhìn thấy kết quả rõ ràng. Khi bước vào một tình huống mới, bạn thường nhanh chóng xác định hướng đi và chủ động tạo chuyển động cho mọi việc.",
      workStyle: "Bạn làm việc hiệu quả nhất khi có quyền tự chủ cao, mục tiêu rõ ràng và được trao trách nhiệm lớn. Bạn cần thử thách để duy trì động lực và không thích bị ràng buộc bởi quy trình không cần thiết.",
      motivators: ["Thách thức lớn và mục tiêu rõ ràng", "Quyền tự chủ và kiểm soát tình huống", "Được công nhận về kết quả đạt được", "Cạnh tranh và cơ hội chiến thắng"],
      concerns: ["Mất kiểm soát tình huống", "Bị người khác lợi dụng hoặc khai thác", "Thất bại trước mắt người khác", "Bị ràng buộc bởi quy trình không cần thiết"],
      behavior: [["Tốc độ ra quyết định", "Rất nhanh"], ["Mối quan tâm chính", "Kết quả & mục tiêu"], ["Phong cách giao tiếp", "Trực tiếp, ngắn gọn"], ["Thái độ với rủi ro", "Chấp nhận cao"], ["Nhu cầu kiểm soát", "Rất cao"], ["Định hướng", "Hành động & kết quả"]],
      strengths: ["Ra quyết định nhanh và quyết đoán trong mọi tình huống", "Thúc đẩy đội nhóm đạt kết quả vượt mong đợi", "Không ngại đối mặt với thách thức và rủi ro", "Tư duy chiến lược và tầm nhìn xa", "Dám chịu trách nhiệm và đứng ra giải quyết vấn đề"],
      growth: ["Đôi khi thiếu kiên nhẫn với người làm việc chậm hơn", "Có thể bỏ qua cảm xúc và nhu cầu của đồng đội", "Xu hướng kiểm soát quá mức, khó ủy quyền", "Đôi khi quá thẳng, gây khó chịu cho người khác"],
      communicationStyle: "Giao tiếp trực tiếp, ngắn gọn, đi thẳng vào vấn đề. Bạn tập trung vào kết quả và tác động thực tế, không thích vòng vo hay mất thời gian vào chi tiết không quan trọng.",
      communicationTips: ["Đi thẳng vào vấn đề, không vòng vo", "Tập trung vào kết quả và lợi ích cụ thể", "Tôn trọng thời gian và sự bận rộn của họ", "Đưa ra lựa chọn, không ép buộc", "Thể hiện sự tôn trọng năng lực và quyết định của họ"],
      salesStrengths: ["Chốt đơn nhanh và quyết đoán, không ngại từ chối", "Tạo cảm giác cấp bách và thúc đẩy quyết định mua hàng", "Tự tin cao, thuyết phục mạnh mẽ và nhất quán", "Không bỏ cuộc dễ dàng khi gặp phản đối"],
      salesCautions: ["Đôi khi quá mạnh, khiến khách hàng cảm thấy bị áp lực", "Thiếu kiên nhẫn với khách hàng cần thời gian suy nghĩ", "Có thể bỏ qua nhu cầu cảm xúc của khách hàng"],
      salesAdvice: "Hiểu rõ kiểu DISC của khách hàng sẽ giúp bạn điều chỉnh cách tiếp cận và tăng tỷ lệ chốt đơn đáng kể. Mỗi nhóm có cách ra quyết định khác nhau — hãy giao tiếp theo ngôn ngữ của họ.",
    },
    I: {
      key: "I",
      shortName: "Ảnh hưởng",
      english: "Influence",
      color: "#f59e0b",
      soft: "#fff4df",
      icon: "✦",
      tone: "Nhiệt tình · Giao tiếp",
      heroLine: "Người lan tỏa năng lượng và kết nối mọi người",
      chips: ["Cởi mở", "Lôi cuốn", "Kết nối", "Truyền cảm hứng", "Tích cực"],
      overview: "Bạn có xu hướng cởi mở, nhiều năng lượng và thích tạo kết nối với mọi người. Khi bước vào một môi trường mới, bạn thường nhanh chóng làm nóng bầu không khí và kéo người khác cùng nhập cuộc.",
      workStyle: "Bạn phát huy tốt trong môi trường giàu tương tác, nơi ý tưởng được chia sẻ liên tục và mọi người khuyến khích nhau hành động. Bạn thích được ghi nhận, được nhìn thấy tác động mình tạo ra và được làm việc cùng người khác.",
      motivators: ["Được giao tiếp, kết nối và chia sẻ ý tưởng", "Được ghi nhận và khuyến khích kịp thời", "Môi trường sôi động, có nhiều tương tác", "Cơ hội tạo ảnh hưởng và lan tỏa cảm hứng"],
      concerns: ["Bị phớt lờ hoặc thiếu sự ghi nhận", "Bầu không khí lạnh, ít tương tác", "Làm việc đơn độc quá lâu", "Bị giới hạn bởi quy trình quá cứng"],
      behavior: [["Tốc độ ra quyết định", "Nhanh"], ["Mối quan tâm chính", "Con người & ảnh hưởng"], ["Phong cách giao tiếp", "Cởi mở, giàu cảm xúc"], ["Thái độ với rủi ro", "Khá cao"], ["Nhu cầu ghi nhận", "Cao"], ["Định hướng", "Kết nối & lan tỏa"]],
      strengths: ["Tạo thiện cảm nhanh và xây dựng quan hệ dễ dàng", "Truyền cảm hứng và khích lệ người khác hành động", "Tư duy tích cực, dễ thích nghi với môi trường mới", "Thuyết phục tốt bằng cảm xúc và sự lôi cuốn", "Đưa năng lượng vào tập thể khi đội nhóm chững lại"],
      growth: ["Dễ mất tập trung nếu công việc quá lặp lại", "Có thể hứa nhanh hơn khả năng theo sát đến cùng", "Đôi khi né chi tiết hoặc quy trình chặt chẽ", "Bị ảnh hưởng bởi cảm xúc và phản hồi xung quanh"],
      communicationStyle: "Bạn giao tiếp ấm áp, linh hoạt và giàu cảm xúc. Bạn thích tương tác hai chiều, thích tạo sự gần gũi và thường bắt đầu bằng kết nối con người trước khi đi sâu vào nội dung công việc.",
      communicationTips: ["Bắt đầu bằng sự thân thiện và ghi nhận", "Tạo không khí tích cực, dễ trò chuyện", "Cho phép chia sẻ ý tưởng và cảm xúc", "Nhấn vào tầm ảnh hưởng và giá trị lan tỏa", "Giữ nhịp trao đổi sống động, đừng quá khô cứng"],
      salesStrengths: ["Tạo thiện cảm nhanh với khách hàng", "Dễ xây dựng sự hứng thú với sản phẩm", "Thuyết phục tốt thông qua cảm xúc và hình dung tích cực", "Khả năng duy trì cuộc trò chuyện tự nhiên, hấp dẫn"],
      salesCautions: ["Đôi khi nói nhiều hơn nghe", "Có thể thiếu cấu trúc khi trình bày lợi ích", "Dễ bỏ sót chi tiết cam kết hoặc điều kiện quan trọng"],
      salesAdvice: "Bạn bán hàng hiệu quả nhất khi kết hợp sự nhiệt tình với một cấu trúc rõ ràng. Càng giữ được nhịp kết nối mà vẫn chốt lại lợi ích cụ thể, bạn càng dễ tạo niềm tin và chuyển đổi.",
    },
    S: {
      key: "S",
      shortName: "Ổn định",
      english: "Steadiness",
      color: "#10b981",
      soft: "#e8fbf4",
      icon: "☘",
      tone: "Kiên nhẫn · Hỗ trợ",
      heroLine: "Người tạo cảm giác an toàn và giữ nhịp ổn định cho tập thể",
      chips: ["Kiên nhẫn", "Hỗ trợ", "Ổn định", "Tin cậy", "Hài hòa"],
      overview: "Bạn có xu hướng điềm tĩnh, giàu tinh thần hỗ trợ và tạo cảm giác đáng tin cậy cho người khác. Trong tập thể, bạn thường là người giữ nhịp, lắng nghe và giúp mọi việc diễn ra mượt mà hơn.",
      workStyle: "Bạn phù hợp với môi trường ổn định, có sự tôn trọng lẫn nhau và nhịp làm việc rõ ràng. Bạn làm tốt khi có thời gian thích nghi, được tin tưởng và có cơ hội hỗ trợ người khác một cách bền bỉ.",
      motivators: ["Môi trường làm việc hòa nhã và đáng tin cậy", "Sự ổn định, rõ ràng và nhịp làm việc bền vững", "Được hỗ trợ lẫn nhau trong tập thể", "Cảm giác mình đang giúp ích thật sự cho người khác"],
      concerns: ["Xung đột gay gắt hoặc áp lực quá đột ngột", "Bị ép thay đổi quá nhanh", "Không khí thiếu chân thành hoặc thiếu tin cậy", "Bị thúc ép quyết định khi chưa sẵn sàng"],
      behavior: [["Tốc độ ra quyết định", "Điềm tĩnh"], ["Mối quan tâm chính", "Con người & sự ổn định"], ["Phong cách giao tiếp", "Nhẹ nhàng, chân thành"], ["Thái độ với rủi ro", "Thấp"], ["Nhu cầu an toàn", "Cao"], ["Định hướng", "Hỗ trợ & duy trì"]],
      strengths: ["Kiên nhẫn, ổn định và rất đáng tin cậy", "Tạo cảm giác an tâm cho đồng nghiệp và khách hàng", "Lắng nghe tốt và hỗ trợ tập thể bền bỉ", "Giữ nhịp đội nhóm trong những giai đoạn dài", "Ít bị cuốn theo cảm xúc bốc đồng nhất thời"],
      growth: ["Dễ né xung đột hoặc chậm nói ra nhu cầu của mình", "Ngại thay đổi quá nhanh hoặc tình huống thiếu chắc chắn", "Đôi khi ưu tiên hòa khí hơn hiệu quả quyết định", "Có thể nhận quá nhiều việc vì khó từ chối"],
      communicationStyle: "Bạn giao tiếp nhẹ nhàng, chân thành và thiên về lắng nghe. Bạn ít áp đặt, thích sự tôn trọng lẫn nhau và thường tạo cảm giác dễ chịu trong các cuộc trao đổi dài hơi.",
      communicationTips: ["Giữ nhịp trao đổi bình tĩnh và tôn trọng", "Cho thời gian suy nghĩ trước khi cần quyết định", "Thể hiện sự chân thành và đáng tin cậy", "Tránh gây áp lực quá nhanh hoặc quá gay gắt", "Nhấn vào lợi ích lâu dài và sự ổn định"],
      salesStrengths: ["Tạo lòng tin và cảm giác an tâm cho khách hàng", "Kiên nhẫn theo sát quá trình ra quyết định", "Khả năng duy trì quan hệ bền vững sau bán hàng", "Lắng nghe sâu để hiểu nhu cầu thật"],
      salesCautions: ["Đôi khi thiếu sự thúc đẩy để chốt đúng thời điểm", "Ngại tạo áp lực tích cực khi khách hàng chần chừ", "Có thể nhượng bộ quá nhiều để giữ hòa khí"],
      salesAdvice: "Lợi thế lớn nhất của bạn là sự tin cậy. Khi biết kết hợp sự chân thành với một nhịp chốt rõ ràng hơn, bạn sẽ vừa giữ được thiện cảm vừa không bỏ lỡ cơ hội chuyển đổi.",
    },
    C: {
      key: "C",
      shortName: "Cẩn thận",
      english: "Conscientiousness",
      color: "#8b5cf6",
      soft: "#f3efff",
      icon: "◈",
      tone: "Chính xác · Phân tích",
      heroLine: "Người theo đuổi chuẩn mực, logic và tính chính xác cao",
      chips: ["Chính xác", "Logic", "Tiêu chuẩn", "Phân tích", "Kỷ luật"],
      overview: "Bạn có xu hướng lý trí, cẩn trọng và ưu tiên sự chính xác. Khi tiếp cận vấn đề, bạn thường muốn hiểu rõ bản chất, dữ liệu và tiêu chuẩn trước khi đưa ra quyết định.",
      workStyle: "Bạn làm việc tốt trong môi trường có quy trình rõ ràng, tiêu chuẩn cụ thể và không gian để suy nghĩ thấu đáo. Bạn phù hợp với những công việc cần tính chính xác, kiểm soát chất lượng và chiều sâu phân tích.",
      motivators: ["Dữ liệu rõ ràng và tiêu chuẩn minh bạch", "Môi trường làm việc có hệ thống", "Chất lượng đầu ra được coi trọng", "Có thời gian để phân tích trước khi hành động"],
      concerns: ["Sai sót do làm vội hoặc thiếu dữ liệu", "Môi trường mơ hồ, thay đổi thiếu kiểm soát", "Bị ép quyết định khi chưa đủ thông tin", "Làm việc với người thiếu kỷ luật và tùy tiện"],
      behavior: [["Tốc độ ra quyết định", "Thận trọng"], ["Mối quan tâm chính", "Độ chính xác & chất lượng"], ["Phong cách giao tiếp", "Lý trí, có cấu trúc"], ["Thái độ với rủi ro", "Thấp"], ["Nhu cầu chuẩn mực", "Rất cao"], ["Định hướng", "Phân tích & kiểm soát"]],
      strengths: ["Phân tích tốt, nhìn ra lỗi và rủi ro sớm", "Làm việc có hệ thống và đáng tin cậy", "Giữ chất lượng đầu ra ở mức cao", "Tôn trọng quy trình và chuẩn mực", "Bình tĩnh khi cần xem xét chi tiết phức tạp"],
      growth: ["Dễ cầu toàn hoặc chậm quyết định khi thiếu dữ liệu", "Có thể tạo cảm giác khó gần nếu quá lý trí", "Khó chịu khi người khác làm việc thiếu chuẩn", "Đôi khi linh hoạt chưa đủ trong bối cảnh thay đổi nhanh"],
      communicationStyle: "Bạn giao tiếp có cấu trúc, ưu tiên nội dung rõ ràng và bằng chứng cụ thể. Bạn ít nói dư thừa, thích trao đổi dựa trên dữ liệu, tiêu chuẩn và logic nhất quán.",
      communicationTips: ["Trình bày rõ ràng, có cấu trúc", "Dùng dữ liệu, ví dụ và bằng chứng cụ thể", "Tránh cảm tính hoặc hứa hẹn mơ hồ", "Cho thời gian kiểm tra, đối chiếu", "Tôn trọng tiêu chuẩn và quy trình của họ"],
      salesStrengths: ["Xây dựng niềm tin bằng sự chính xác và chuyên nghiệp", "Trình bày logic, có luận cứ rõ ràng", "Phù hợp với sản phẩm cần tư vấn kỹ", "Giảm rủi ro nhờ kiểm tra kỹ thông tin cam kết"],
      salesCautions: ["Dễ sa vào quá nhiều chi tiết kỹ thuật", "Có thể chậm tạo cảm xúc mua hàng", "Quá thận trọng nên bỏ lỡ thời điểm chốt"],
      salesAdvice: "Bạn tạo lợi thế lớn bằng độ tin cậy và chuẩn xác. Khi kết hợp logic tốt với một nhịp tư vấn ngắn gọn, dễ hiểu và gần gũi hơn, hiệu quả bán hàng sẽ tăng rõ rệt.",
    }
  };

  const RESULT_COMBOS = {
    DI: ["Người dẫn dắt truyền lửa", "Quyết đoán, nhiều năng lượng và luôn muốn tạo chuyển động rõ ràng."],
    DC: ["Người chỉ huy chiến lược", "Mạnh mẽ, chuẩn xác và theo đuổi mục tiêu bằng tư duy có cấu trúc."],
    DS: ["Người đạt mục tiêu", "Kiên định, thực tế và biết giữ nhịp để tiến về kết quả bền vững."],
    ID: ["Người lan tỏa và chinh phục", "Tự tin, truyền cảm hứng và không ngại bước lên dẫn dắt."],
    IC: ["Người thuyết phục tinh tế", "Giỏi kết nối, nói có sức nặng và vẫn chú ý chuẩn mực."],
    IS: ["Người kết nối chân thành", "Ấm áp, tích cực, dễ gần và luôn muốn tạo bầu không khí hài hòa."],
    SD: ["Người bền bỉ hành động", "Điềm tĩnh nhưng chắc tay, biết giữ nhịp và vẫn theo đuổi mục tiêu."],
    SI: ["Người gắn kết con người", "Chân thành, kiên nhẫn, giàu tinh thần hỗ trợ và kết nối."],
    SC: ["Người ổn định chuẩn mực", "Cẩn trọng, kiên nhẫn và thích sự rõ ràng, trật tự."],
    CD: ["Người nguyên tắc định hướng", "Lý trí, mạnh mẽ và có xu hướng kiểm soát chất lượng lẫn mục tiêu."],
    CI: ["Người chuẩn xác thuyết phục", "Phân tích tốt nhưng vẫn có khả năng tạo ảnh hưởng nhẹ nhàng."],
    CS: ["Người cẩn trọng tận tâm", "Tỉ mỉ, đáng tin, hỗ trợ bền bỉ và thích môi trường có cấu trúc."]
  };

  const ENVIRONMENT_THEMES = {
    life: {
      key: "life",
      label: "Cuộc sống",
      badge: "Phổ biến nhất",
      accent: "#ff2d7a",
      accentStrong: "#ff5a96",
      soft: "#fff1f6",
      border: "#ffc6d9",
      shadow: "rgba(255, 45, 122, 0.18)",
      gradient: "linear-gradient(135deg, #ff2d7a, #f03aa1)",
      icon: "♡",
      resultLabel: "Ứng dụng trong cuộc sống",
      quizNote: "Hãy chọn theo cách bạn thường phản ứng trong gia đình, bạn bè và các tình huống thường ngày.",
    },
    work: {
      key: "work",
      label: "Công việc",
      badge: "Được khuyến nghị",
      accent: "#ff8a00",
      accentStrong: "#ff9f2f",
      soft: "#fff5e8",
      border: "#ffd3a4",
      shadow: "rgba(255, 138, 0, 0.18)",
      gradient: "linear-gradient(135deg, #ff8a00, #ffae00)",
      icon: "□",
      resultLabel: "Ứng dụng trong công việc",
      quizNote: "Ưu tiên chọn cách bạn làm việc, phối hợp và xử lý mục tiêu trong môi trường nghề nghiệp.",
    },
    leadership: {
      key: "leadership",
      label: "Lãnh đạo",
      badge: "Dành cho quản lý",
      accent: "#7c4dff",
      accentStrong: "#9a3cff",
      soft: "#f4efff",
      border: "#d7c7ff",
      shadow: "rgba(124, 77, 255, 0.18)",
      gradient: "linear-gradient(135deg, #6858f5, #a13dff)",
      icon: "♕",
      resultLabel: "Ứng dụng trong lãnh đạo",
      quizNote: "Hãy chọn theo cách bạn dẫn dắt, ra quyết định và phát triển đội ngũ khi giữ vai trò lãnh đạo.",
    },
  };

  const RESULT_ENVIRONMENT_KNOWLEDGE = {
    life: {
      contextTitle: "Bạn thể hiện rõ nhất trong đời sống cá nhân",
      applicationTitle: "Gợi ý ứng dụng trong cuộc sống",
      profiles: {
        D: {
          summary: "Trong cuộc sống cá nhân, bạn thường chủ động tạo nhịp, muốn mọi việc rõ ràng và thích xử lý vấn đề dứt điểm.",
          strengths: ["Biết đứng ra gánh việc khi gia đình hoặc bạn bè cần người quyết nhanh", "Giỏi chốt hướng đi trong các tình huống rối", "Mang lại cảm giác mạnh mẽ, bảo vệ và đáng tin khi có biến động"],
          growth: ["Cần mềm hơn khi người thân cần được lắng nghe trước khi giải quyết", "Dễ nóng ruột khi mọi thứ diễn ra chậm", "Nên giảm xu hướng áp quyết định thay cho người khác"],
          communicationTips: ["Nói rõ nhưng giữ giọng điệu ấm hơn với người thân", "Thêm một bước hỏi cảm xúc trước khi đưa giải pháp", "Cho người khác không gian bày tỏ thay vì chốt quá nhanh"],
          motivators: ["Sự chủ động", "Cảm giác làm chủ tình huống", "Kết quả rõ ràng trong các việc gia đình và cá nhân"],
          concerns: ["Sự trì trệ", "Mập mờ kéo dài", "Cảm giác bị phụ thuộc hoặc bị cản nhịp"],
          stress: "Khi căng thẳng, bạn dễ phản ứng mạnh, nói ngắn và muốn cắt bỏ những điều mình xem là không cần thiết.",
          application: ["Trong mâu thuẫn gia đình, hãy chậm lại một nhịp trước khi kết luận", "Khi làm đầu mối tổ chức việc chung, nên phân vai rõ nhưng vẫn để người khác góp ý", "Trong quan hệ bạn bè, sự quyết đoán của bạn hiệu quả hơn khi đi cùng sự tôn trọng cảm xúc"],
        },
        I: {
          summary: "Trong cuộc sống cá nhân, bạn mang nhiều năng lượng tích cực, thích kết nối và thường là người làm không khí trở nên dễ chịu hơn.",
          strengths: ["Dễ tạo cảm giác gần gũi với người thân và bạn bè", "Biết kéo mọi người cùng tham gia, cùng vui", "Thường mang tinh thần lạc quan vào những lúc tập thể chùng xuống"],
          growth: ["Cần giữ lời hứa và theo sát đến cùng những điều đã nhận", "Dễ tránh chi tiết thực tế khi quá hứng khởi", "Nên lắng nghe sâu hơn thay vì chỉ làm không khí dễ chịu"],
          communicationTips: ["Giữ sự chân thành, đừng che cảm xúc thật bằng sự vui vẻ quá mức", "Khi hứa điều gì với người thân, hãy xác nhận rõ để tránh quên", "Trong xung đột, lắng nghe hết rồi mới chuyển sang xoa dịu"],
          motivators: ["Sự gắn kết", "Không khí vui vẻ", "Cảm giác được yêu quý và ghi nhận"],
          concerns: ["Bị lạnh nhạt", "Không khí căng thẳng kéo dài", "Sự cô lập hoặc thiếu kết nối"],
          stress: "Khi căng thẳng, bạn có thể nói nhiều hơn bình thường, cảm xúc dao động rõ và cần sự phản hồi tích cực để cân bằng lại.",
          application: ["Trong các cuộc gặp mặt, bạn rất hợp vai trò kết nối mọi người", "Khi xử lý chuyện buồn của người thân, hãy giảm việc làm nhẹ tình huống quá sớm", "Bạn sẽ tỏa sáng trong đời sống cá nhân khi giữ được nhiệt huyết đi cùng độ tin cậy"],
        },
        S: {
          summary: "Trong cuộc sống cá nhân, bạn thiên về sự ổn định, chân thành và thường là người âm thầm giữ hòa khí cho các mối quan hệ.",
          strengths: ["Biết lắng nghe, đồng hành và tạo cảm giác an toàn", "Kiên nhẫn trong các mối quan hệ dài lâu", "Thường là người giữ nhịp và chăm lo cho tập thể một cách bền bỉ"],
          growth: ["Cần nói ra nhu cầu của mình rõ hơn", "Dễ chịu phần thiệt để giữ hòa khí", "Có thể chậm phản hồi khi tình huống cần quyết nhanh"],
          communicationTips: ["Nói thẳng điều bạn cần thay vì chờ người khác tự hiểu", "Khi không đồng ý, hãy bày tỏ sớm hơn để tránh tích tụ", "Giữ sự ấm áp nhưng đừng quên đặt ranh giới lành mạnh"],
          motivators: ["Sự yên ổn", "Những mối quan hệ bền vững", "Cảm giác được tin tưởng và cần đến"],
          concerns: ["Xung đột gay gắt", "Thay đổi đột ngột", "Không khí thiếu chân thành"],
          stress: "Khi căng thẳng, bạn dễ thu mình, im lặng nhiều hơn và cố gắng gồng để giữ mọi thứ không đổ vỡ.",
          application: ["Trong gia đình, bạn rất mạnh ở vai trò giữ sự gắn kết", "Khi bị dồn nén lâu, hãy chọn thời điểm bình tĩnh để nói rõ nhu cầu", "Nếu luyện được sự dứt khoát đúng lúc, bạn sẽ vừa giữ được hòa khí vừa bảo vệ được bản thân"],
        },
        C: {
          summary: "Trong cuộc sống cá nhân, bạn quan sát kỹ, suy nghĩ sâu và thường muốn mọi điều rõ ràng trước khi đặt niềm tin hoặc đưa ra quyết định.",
          strengths: ["Biết cân nhắc kỹ trước những quyết định quan trọng", "Giữ lời hứa và tiêu chuẩn cá nhân khá cao", "Thường nhìn ra rủi ro hoặc điểm chưa hợp lý mà người khác bỏ qua"],
          growth: ["Cần mềm hơn trong cách thể hiện để tránh tạo khoảng cách", "Dễ suy nghĩ quá kỹ trước những việc cần linh hoạt", "Có thể đặt chuẩn quá cao cho bản thân và người thân"],
          communicationTips: ["Giải thích ngắn gọn hơn khi góp ý với người thân", "Đừng chờ đủ hoàn hảo mới chia sẻ suy nghĩ", "Khi cảm thấy chưa chắc, hãy nói mình cần thêm thời gian thay vì im lặng kéo dài"],
          motivators: ["Sự rõ ràng", "Độ tin cậy", "Mọi việc được làm đúng và có trật tự"],
          concerns: ["Sai sót", "Mơ hồ", "Những quyết định vội vàng thiếu căn cứ"],
          stress: "Khi căng thẳng, bạn thường tự kiểm tra lại quá mức, khó thả lỏng và có xu hướng khắt khe hơn với lỗi nhỏ.",
          application: ["Trong các quyết định gia đình, bạn giúp tập thể tránh những lựa chọn cảm tính", "Bạn phù hợp với việc lên kế hoạch tài chính, lịch trình và các cam kết cần độ chắc chắn", "Sự ấm áp hơn trong giao tiếp sẽ giúp trí tuệ của bạn được đón nhận dễ dàng hơn"],
        },
      },
    },
    work: {
      contextTitle: "Bạn thể hiện rõ nhất trong môi trường công việc",
      applicationTitle: "Gợi ý ứng dụng trong công việc",
      profiles: {
        D: {
          summary: "Trong công việc, bạn thiên về tốc độ, hiệu quả và thường muốn đi thẳng vào mục tiêu thay vì vòng vo.",
          strengths: ["Ra quyết định nhanh khi công việc có áp lực", "Thúc đẩy tiến độ và tạo động lực hành động", "Không ngại chịu trách nhiệm với những việc khó"],
          growth: ["Cần tránh tạo áp lực quá mạnh cho đồng nghiệp", "Dễ bỏ qua chi tiết hoặc cảm xúc đội nhóm", "Nên ủy quyền tốt hơn thay vì ôm quyền quyết định"],
          communicationTips: ["Tập trung vào mục tiêu nhưng giữ sự tôn trọng trong cách nói", "Chốt việc rõ ràng kèm theo tiêu chí thành công", "Dành thời gian phản hồi hai chiều thay vì chỉ giao lệnh"],
          motivators: ["Mục tiêu cao", "Quyền chủ động", "Kết quả đo đếm được"],
          concerns: ["Trì hoãn", "Quy trình rườm rà", "Thiếu quyền quyết định"],
          stress: "Khi căng thẳng, bạn dễ đẩy tốc độ lên rất cao, trở nên cứng và thiếu kiên nhẫn với người chậm nhịp.",
          application: ["Phù hợp với các vai trò dẫn dự án, mở thị trường hoặc xử lý việc gấp", "Khi quản lý đồng nghiệp, hãy rõ kỳ vọng nhưng không bỏ qua phần hỗ trợ", "Bạn bứt phá mạnh nhất khi kết hợp sự quyết đoán với lắng nghe dữ liệu và con người"],
        },
        I: {
          summary: "Trong công việc, bạn nổi bật ở khả năng kết nối, tạo ảnh hưởng và truyền năng lượng cho tập thể.",
          strengths: ["Tạo thiện cảm nhanh với đồng nghiệp và khách hàng", "Giỏi trình bày ý tưởng, thuyết phục và mở rộng quan hệ", "Mang lại không khí tích cực cho đội nhóm"],
          growth: ["Cần tăng tính kỷ luật với việc theo dõi chi tiết", "Dễ hứa nhanh hơn khả năng triển khai", "Nên giữ trọng tâm tốt hơn khi công việc lặp lại hoặc cần độ sâu"],
          communicationTips: ["Tận dụng điểm mạnh kể chuyện nhưng nhớ chốt lại đầu việc cụ thể", "Sau mỗi cuộc trao đổi, xác nhận rõ việc ai làm và khi nào xong", "Giữ năng lượng tích cực nhưng không né phản hồi khó"],
          motivators: ["Sự ghi nhận", "Môi trường nhiều tương tác", "Cơ hội tạo ảnh hưởng"],
          concerns: ["Bị xem nhẹ", "Không khí khô cứng", "Làm việc cô lập quá lâu"],
          stress: "Khi căng thẳng, bạn dễ phân tán, tìm nhiều điểm tựa bên ngoài và cần được trấn an bằng phản hồi rõ ràng.",
          application: ["Rất hợp với các vai trò cần giao tiếp, bán hàng, đào tạo hoặc kết nối nội bộ", "Bạn tạo giá trị lớn khi biến ý tưởng thành năng lượng hành động cho đội nhóm", "Nếu kết hợp được sự sáng tạo với kỷ luật thực thi, hiệu quả của bạn tăng rất mạnh"],
        },
        S: {
          summary: "Trong công việc, bạn tạo cảm giác ổn định, bền bỉ và là người giữ nhịp đáng tin cho tập thể.",
          strengths: ["Phối hợp nhóm tốt và hỗ trợ đồng nghiệp bền bỉ", "Kiên nhẫn với các đầu việc cần chăm sóc dài hạn", "Duy trì chất lượng công việc ổn định trong thời gian dài"],
          growth: ["Cần đẩy tốc độ phản hồi khi bối cảnh thay đổi nhanh", "Dễ nhận nhiều việc vì khó từ chối", "Nên nói rõ chính kiến hơn trong cuộc họp hoặc lúc phân công việc"],
          communicationTips: ["Xác nhận rõ ưu tiên để tránh ôm việc quá mức", "Khi không đồng ý, hãy nói sớm và cụ thể", "Dùng sự bình tĩnh của mình để tạo ổn định, không phải để né xung đột cần thiết"],
          motivators: ["Môi trường tử tế", "Sự rõ ràng", "Quan hệ đồng đội tin cậy"],
          concerns: ["Xáo trộn liên tục", "Áp lực gấp gáp", "Xung đột trực diện kéo dài"],
          stress: "Khi căng thẳng, bạn có xu hướng chậm lại, ít nói hơn và cố chịu một mình thay vì nhờ hỗ trợ.",
          application: ["Phù hợp với vận hành, chăm sóc khách hàng, hỗ trợ đội nhóm và các vai trò cần độ bền", "Bạn giúp tổ chức vận hành mượt hơn nhờ sự đều đặn và đáng tin", "Nếu rèn được khả năng lên tiếng đúng lúc, bạn sẽ có ảnh hưởng tích cực hơn nhiều trong công việc"],
        },
        C: {
          summary: "Trong công việc, bạn ưu tiên tính chuẩn xác, logic và thích làm việc trên cơ sở dữ liệu, quy trình rõ ràng.",
          strengths: ["Phân tích tốt và nhìn ra lỗ hổng sớm", "Giữ chuẩn chất lượng cao", "Làm việc có cấu trúc và đáng tin cậy"],
          growth: ["Cần linh hoạt hơn với bối cảnh mơ hồ hoặc thay đổi nhanh", "Dễ chậm quyết khi muốn đủ dữ liệu", "Nên diễn đạt gần gũi hơn để người khác dễ tiếp nhận"],
          communicationTips: ["Trình bày ngắn, rõ và đủ ý thay vì quá dày chi tiết", "Khi cần phản biện, hãy bắt đầu từ mục tiêu chung", "Chấp nhận mức đủ tốt ở những việc không cần độ hoàn hảo tuyệt đối"],
          motivators: ["Tiêu chuẩn rõ", "Dữ liệu chắc chắn", "Môi trường làm việc có hệ thống"],
          concerns: ["Sai sót", "Thiếu quy trình", "Áp lực phải quyết định khi chưa đủ thông tin"],
          stress: "Khi căng thẳng, bạn dễ kiểm tra quá kỹ, khó buông và trở nên khắt khe hơn với bản thân lẫn người khác.",
          application: ["Rất phù hợp với phân tích, kiểm soát chất lượng, tài chính, vận hành chuẩn hóa", "Bạn tạo giá trị lớn khi biến sự phức tạp thành cấu trúc rõ ràng", "Nếu kết hợp được sự chuẩn xác với nhịp hợp tác mềm hơn, ảnh hưởng chuyên môn của bạn sẽ mạnh hơn"],
        },
      },
    },
    leadership: {
      contextTitle: "Bạn thể hiện rõ nhất trong vai trò lãnh đạo",
      applicationTitle: "Gợi ý ứng dụng trong lãnh đạo",
      profiles: {
        D: {
          summary: "Khi lãnh đạo, bạn thiên về định hướng mạnh, ra quyết định nhanh và thúc đẩy đội ngũ tiến về phía kết quả.",
          strengths: ["Dám chịu trách nhiệm và chốt hướng đi khi tập thể cần người dẫn", "Tạo động lực hành động mạnh trong các giai đoạn cần bứt tốc", "Không ngại xử lý vấn đề khó hoặc mâu thuẫn trực diện"],
          growth: ["Cần giảm áp lực quyền lực khi đội ngũ cần được phát triển", "Dễ đẩy nhịp quá nhanh so với khả năng thích nghi của người khác", "Nên tăng lắng nghe trước các quyết định ảnh hưởng rộng"],
          communicationTips: ["Rõ ràng về kỳ vọng nhưng đừng biến phản hồi thành mệnh lệnh một chiều", "Khi góp ý khó, hãy tách con người ra khỏi vấn đề", "Cho đội ngũ thấy lý do phía sau quyết định để tăng cam kết"],
          motivators: ["Kết quả lớn", "Thử thách", "Quyền tạo tác động rõ ràng"],
          concerns: ["Bộ máy chậm", "Thiếu quyết đoán", "Không kiểm soát được tiến độ chiến lược"],
          stress: "Dưới áp lực, bạn có thể trở nên cứng hơn, kiểm soát mạnh hơn và ít kiên nhẫn với các bước phát triển dài hơi.",
          application: ["Mạnh ở giai đoạn khởi động, đổi mới hoặc xử lý khủng hoảng", "Hiệu quả lãnh đạo tăng cao khi bạn kết hợp sự quyết liệt với coaching", "Đội ngũ sẽ theo bạn bền hơn nếu họ vừa thấy mục tiêu rõ vừa thấy mình được tôn trọng"],
        },
        I: {
          summary: "Khi lãnh đạo, bạn truyền cảm hứng tốt, kết nối con người nhanh và thường là người tạo ra động lực tập thể.",
          strengths: ["Khơi dậy tinh thần và tạo niềm tin cho đội ngũ", "Giỏi truyền tầm nhìn theo cách dễ hiểu, dễ nhập cuộc", "Tạo môi trường có năng lượng và nhiều tương tác tích cực"],
          growth: ["Cần tăng độ nhất quán trong theo dõi cam kết", "Dễ mềm trước việc khó ra quyết định nếu quá chú trọng cảm xúc", "Nên bổ sung cấu trúc để ý tưởng được triển khai tới cùng"],
          communicationTips: ["Tận dụng khả năng truyền cảm hứng nhưng chốt rõ KPI và trách nhiệm", "Trong phản hồi hiệu suất, giữ sự ấm áp đi cùng tính cụ thể", "Khi đội ngũ rối, hãy giảm độ ngẫu hứng và tăng độ rõ ràng"],
          motivators: ["Tầm ảnh hưởng", "Tinh thần đội nhóm", "Sự công nhận và cộng hưởng"],
          concerns: ["Đội ngũ mất lửa", "Bầu không khí tiêu cực", "Tầm nhìn không được đón nhận"],
          stress: "Khi căng thẳng, bạn dễ tản năng lượng, nhạy với phản ứng của đội ngũ và cần quay lại các ưu tiên cốt lõi.",
          application: ["Rất hợp với các vai trò dẫn đội ngũ sáng tạo, kinh doanh, dịch vụ hoặc văn hóa nội bộ", "Bạn tạo sức bật lớn khi truyền được niềm tin về tương lai", "Nếu thêm kỷ luật vận hành vào sức hút tự nhiên, phong cách lãnh đạo của bạn sẽ rất thuyết phục"],
        },
        S: {
          summary: "Khi lãnh đạo, bạn thiên về xây nền, giữ sự gắn kết và giúp đội ngũ phát triển theo nhịp bền vững.",
          strengths: ["Tạo môi trường an toàn tâm lý và đáng tin cậy", "Lắng nghe tốt, hỗ trợ tốt và giữ được lòng trung thành của đội ngũ", "Bền bỉ trong việc phát triển con người dài hạn"],
          growth: ["Cần quyết liệt hơn khi đội ngũ cần thay đổi hoặc chấn chỉnh", "Dễ trì hoãn phản hồi khó để giữ hòa khí", "Nên rõ ràng hơn trong ưu tiên và chuẩn hiệu suất"],
          communicationTips: ["Giữ sự chân thành nhưng đừng né đối thoại khó", "Khi quyết định xong, hãy nói dứt khoát để đội ngũ yên tâm bám theo", "Bảo vệ sự ổn định của đội ngũ bằng kỳ vọng rõ ràng, không chỉ bằng sự cảm thông"],
          motivators: ["Đội ngũ gắn kết", "Sự ổn định lâu dài", "Niềm tin và sự trung thành"],
          concerns: ["Rạn nứt nội bộ", "Biến động quá nhanh", "Quyết định gây tổn thương tập thể"],
          stress: "Khi căng thẳng, bạn có thể ôm vai trò nâng đỡ quá nhiều và tự đặt mình vào vị trí chịu đựng thay cho cả đội.",
          application: ["Rất mạnh ở vai trò xây đội ngũ bền, coaching và giữ văn hóa", "Bạn giúp người khác phát triển nhờ sự nhất quán và chân thành", "Hiệu quả lãnh đạo sẽ tăng mạnh khi bạn kết hợp lòng người với chuẩn hiệu suất rõ ràng"],
        },
        C: {
          summary: "Khi lãnh đạo, bạn dẫn dắt bằng tư duy hệ thống, tiêu chuẩn rõ ràng và mong muốn mọi quyết định có căn cứ vững chắc.",
          strengths: ["Giữ chuẩn chất lượng và tư duy chiến lược có cấu trúc", "Nhìn ra rủi ro, phụ thuộc và lỗ hổng từ sớm", "Giúp đội ngũ làm việc bài bản, rõ vai và rõ quy trình"],
          growth: ["Cần tránh để tiêu chuẩn quá cao làm chậm quyết định", "Dễ tạo khoảng cách nếu giao tiếp quá lý trí", "Nên cho phép thử nghiệm nhiều hơn trong các giai đoạn đổi mới"],
          communicationTips: ["Truyền đạt tiêu chuẩn bằng ngôn ngữ dễ hiểu hơn", "Khi góp ý, nêu rõ điều cần sửa và cách để đạt chuẩn", "Đừng đợi mọi dữ liệu hoàn hảo mới hành động ở những quyết định cần tốc độ"],
          motivators: ["Chất lượng", "Tính đúng đắn", "Tổ chức vận hành có hệ thống"],
          concerns: ["Sai số chiến lược", "Quy trình lỏng lẻo", "Ra quyết định thiếu căn cứ"],
          stress: "Khi căng thẳng, bạn có xu hướng siết chuẩn, kiểm tra sát và khó chấp nhận các cách làm chưa đủ chín.",
          application: ["Phù hợp với lãnh đạo chức năng, chiến lược, kiểm soát chất lượng, tài chính và vận hành", "Bạn tạo giá trị lớn khi giúp đội ngũ làm đúng ngay từ đầu", "Nếu tăng thêm sự gần gũi trong giao tiếp, chuẩn mực của bạn sẽ trở thành nguồn tin cậy thay vì áp lực"],
        },
      },
    },
  };

  function getQuestionBank(environmentKey) {
    return QUESTION_BANKS[environmentKey] || QUESTION_BANKS[DEFAULT_ENVIRONMENT_KEY] || {
      key: DEFAULT_ENVIRONMENT_KEY,
      label: "C?ng vi?c",
      badge: "",
      shortDescription: "",
      icon: "?",
      accent: "#ff7a1a",
      questions: [],
    };
  }

  function getQuestionList(environmentKey) {
    return getQuestionBank(environmentKey).questions || [];
  }

  function getEnvironmentRoute(environmentKey, step) {
    return "/quiz/" + environmentKey + "/" + String(step || 1);
  }

  function getEnvironmentOptions() {
    return ENVIRONMENT_KEYS.map(function (key) {
      return getQuestionBank(key);
    });
  }

  function getEnvironmentTheme(environmentKey) {
    const key = ENVIRONMENT_THEMES[environmentKey] ? environmentKey : DEFAULT_ENVIRONMENT_KEY;
    return ENVIRONMENT_THEMES[key] || ENVIRONMENT_THEMES.work;
  }

  function getEnvironmentLabel(environmentKey) {
    return getEnvironmentTheme(environmentKey).label;
  }

  function getEnvironmentResultLabel(environmentKey) {
    return getEnvironmentTheme(environmentKey).resultLabel;
  }

  function getEnvironmentKnowledge(environmentKey, discKey) {
    const normalizedEnvironment = RESULT_ENVIRONMENT_KNOWLEDGE[environmentKey]
      ? environmentKey
      : DEFAULT_ENVIRONMENT_KEY;
    const profileSet = RESULT_ENVIRONMENT_KNOWLEDGE[normalizedEnvironment] || RESULT_ENVIRONMENT_KNOWLEDGE.work;
    return {
      environment: profileSet,
      profile: (profileSet.profiles && profileSet.profiles[discKey]) || profileSet.profiles.D,
    };
  }

  function mergeUniqueItems(base, extra, limit) {
    const seen = {};
    const merged = [];
    (base || []).concat(extra || []).forEach(function (item) {
      const key = String(item || "").trim();
      if (!key) return;
      const normalized = key.toLowerCase();
      if (seen[normalized]) return;
      seen[normalized] = true;
      merged.push(key);
    });
    return typeof limit === "number" ? merged.slice(0, limit) : merged;
  }

  function getSecondaryBlendLine(primaryKey, secondaryKey, environmentKey) {
    const environmentLabel = getEnvironmentLabel(environmentKey).toLowerCase();
    const primaryName = getResultMeta(primaryKey).shortName.toLowerCase();
    const secondaryLines = {
      D: "Sắc thái phụ D làm nổi rõ sự quyết liệt, nhu cầu chủ động và khả năng chốt hướng nhanh trong " + environmentLabel + ".",
      I: "Sắc thái phụ I làm tăng khả năng kết nối, truyền cảm hứng và tạo ảnh hưởng tích cực trong " + environmentLabel + ".",
      S: "Sắc thái phụ S giúp bạn giữ sự điềm tĩnh, bền bỉ và chú trọng tính hài hòa hơn trong " + environmentLabel + ".",
      C: "Sắc thái phụ C bổ sung tư duy phân tích, sự cẩn trọng và độ chuẩn xác cao hơn trong " + environmentLabel + ".",
    };
    return "Kiểu chính của bạn là " + primaryName + ". " + (secondaryLines[secondaryKey] || "");
  }

  function buildResultKnowledge(detail, primary, secondary) {
    const environmentKey = detail.environment_key || DEFAULT_ENVIRONMENT_KEY;
    const knowledge = getEnvironmentKnowledge(environmentKey, primary.key);
    const overlay = knowledge.profile;
    const environmentProfile = knowledge.environment;
    return {
      summary: overlay.summary,
      blendLine: getSecondaryBlendLine(primary.key, secondary.key, environmentKey),
      strengths: mergeUniqueItems(primary.strengths, overlay.strengths, 6),
      growth: mergeUniqueItems(primary.growth, overlay.growth, 6),
      communicationStyle: overlay.summary + " " + primary.communicationStyle,
      communicationTips: mergeUniqueItems(overlay.communicationTips, primary.communicationTips, 6),
      motivators: mergeUniqueItems(overlay.motivators, primary.motivators, 5),
      concerns: mergeUniqueItems(overlay.concerns, primary.concerns, 5),
      stress: overlay.stress,
      focusTitle: environmentProfile.contextTitle,
      focusBody: overlay.summary + " " + primary.workStyle,
      applicationTitle: environmentProfile.applicationTitle,
      application: overlay.application,
    };
  }

  const app = document.getElementById("app");
  const state = {
    auth: loadFromStorage(STORAGE_KEYS.auth, null),
    pending: loadFromStorage(STORAGE_KEYS.pending, null),
    routeData: {},
    notices: [],
  };
  normalizePendingState();
  let revealObserver = null;
  let skipNextReveal = false;

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

  function normalizeBackendMessage(message) {
    const text = String(message == null ? "" : message);
    if (!/[ÃÄÂÊÔÆØÐ]/.test(text)) return text;
    try {
      return decodeURIComponent(escape(text));
    } catch (_error) {
      return text
        .replace(/Ä‘/g, "đ")
        .replace(/Ä/g, "Đ")
        .replace(/Ã¡/g, "á")
        .replace(/Ã /g, "à")
        .replace(/áº¡/g, "ạ")
        .replace(/áº£/g, "ả")
        .replace(/Ã£/g, "ã")
        .replace(/Ã¢/g, "â")
        .replace(/áº¥/g, "ấ")
        .replace(/áº§/g, "ầ")
        .replace(/áº­/g, "ậ")
        .replace(/áº©/g, "ẩ")
        .replace(/áº«/g, "ẫ")
        .replace(/Äƒ/g, "ă")
        .replace(/áº¯/g, "ắ")
        .replace(/áº±/g, "ằ")
        .replace(/áº·/g, "ặ")
        .replace(/áº³/g, "ẳ")
        .replace(/áºµ/g, "ẵ")
        .replace(/Ã©/g, "é")
        .replace(/Ã¨/g, "è")
        .replace(/áº¹/g, "ẹ")
        .replace(/áº»/g, "ẻ")
        .replace(/áº½/g, "ẽ")
        .replace(/Ãª/g, "ê")
        .replace(/áº¿/g, "ế")
        .replace(/á»/g, "ề")
        .replace(/á»‡/g, "ệ")
        .replace(/á»ƒ/g, "ể")
        .replace(/á»…/g, "ễ")
        .replace(/Ã­/g, "í")
        .replace(/Ã¬/g, "ì")
        .replace(/á»‹/g, "ị")
        .replace(/á»‰/g, "ỉ")
        .replace(/Ä©/g, "ĩ")
        .replace(/Ã³/g, "ó")
        .replace(/Ã²/g, "ò")
        .replace(/á»/g, "ọ")
        .replace(/á»/g, "ỏ")
        .replace(/Ãµ/g, "õ")
        .replace(/Ã´/g, "ô")
        .replace(/á»‘/g, "ố")
        .replace(/á»“/g, "ồ")
        .replace(/á»™/g, "ộ")
        .replace(/á»•/g, "ổ")
        .replace(/á»—/g, "ỗ")
        .replace(/Æ¡/g, "ơ")
        .replace(/á»›/g, "ớ")
        .replace(/á»/g, "ờ")
        .replace(/á»£/g, "ợ")
        .replace(/á»Ÿ/g, "ở")
        .replace(/á»¡/g, "ỡ")
        .replace(/Ãº/g, "ú")
        .replace(/Ã¹/g, "ù")
        .replace(/á»¥/g, "ụ")
        .replace(/á»§/g, "ủ")
        .replace(/Å©/g, "ũ")
        .replace(/Æ°/g, "ư")
        .replace(/á»©/g, "ứ")
        .replace(/á»«/g, "ừ")
        .replace(/á»±/g, "ự")
        .replace(/á»­/g, "ử")
        .replace(/á»¯/g, "ữ")
        .replace(/Ã½/g, "ý")
        .replace(/á»³/g, "ỳ")
        .replace(/á»µ/g, "ỵ")
        .replace(/á»·/g, "ỷ")
        .replace(/á»¹/g, "ỹ");
    }
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
      throw new Error(normalizeBackendMessage((data && data.error) || "Yeu cau that bai."));
    }
    return data.data;
  }

  function normalizePendingState() {
    if (!state.pending || !state.pending.responses) return;
    const bank = QUESTION_BANKS[state.pending.environmentKey];
    if (
      !bank ||
      state.pending.questionBankVersion !== QUESTION_BANK_VERSION ||
      state.pending.responses.length !== bank.questions.length
    ) {
      setPending(null);
    }
  }

  function setButtonLoading(button, loading, loadingText) {
    if (!button) return;
    if (loading) {
      if (!button.dataset.originalLabel) button.dataset.originalLabel = button.innerHTML;
      button.disabled = true;
      button.classList.add("is-loading");
      button.innerHTML =
        '<span class="btn-spinner" aria-hidden="true"></span><span>' +
        escapeHtml(loadingText || "Đang xử lý...") +
        "</span>";
    } else {
      button.disabled = false;
      button.classList.remove("is-loading");
      if (button.dataset.originalLabel) {
        button.innerHTML = button.dataset.originalLabel;
      }
    }
  }

  function ensurePendingSession(environmentKey) {
    const normalizedEnvironment = QUESTION_BANKS[environmentKey]
      ? environmentKey
      : DEFAULT_ENVIRONMENT_KEY;
    const questions = getQuestionList(normalizedEnvironment);
    if (
      state.pending &&
      state.pending.environmentKey === normalizedEnvironment &&
      state.pending.responses &&
      state.pending.responses.length === questions.length
    ) {
      return state.pending;
    }
    const pending = {
      id: uid(),
      createdAt: new Date().toISOString(),
      environmentKey: normalizedEnvironment,
      questionBankVersion: QUESTION_BANK_VERSION,
      responses: questions.map(function (question) {
        return { questionId: question.id, choice: null };
      }),
    };
    setPending(pending);
    return pending;
  }

  function getPendingResponse(questionId, environmentKey) {
    const pending = ensurePendingSession(environmentKey);
    return pending.responses.find(function (item) {
      return item.questionId === questionId;
    });
  }

  function savePendingChoice(environmentKey, questionId, mode, itemId) {
    const pending = ensurePendingSession(environmentKey);
    const response = pending.responses.find(function (item) {
      return item.questionId === questionId;
    });
    if (!response) return;
    response.choice = response.choice === itemId ? null : itemId;
    setPending(pending);
    skipNextReveal = true;
    render();
  }

  function isPendingComplete(environmentKey) {
    if (!state.pending) return false;
    const targetEnvironment = environmentKey || state.pending.environmentKey;
    if (!targetEnvironment || state.pending.environmentKey !== targetEnvironment) return false;
    const pending = state.pending;
    if (!pending) return false;
    return pending.responses.every(function (item) {
      return item.choice;
    });
  }

  function renderTopbar() {
    const auth = state.auth;
    const mobileOpen = !!state.routeData.mobileNavOpen;
    const authLinks = auth
      ? '<a class="nav-link" href="#/profile">Hồ sơ</a>' +
        (auth.user && auth.user.role === "admin"
          ? '<a class="nav-link" href="#/admin">Báo cáo admin</a>'
          : "") +
        '<button class="btn btn-secondary" data-action="logout">Đăng xuất</button>'
      : '<a class="nav-link" href="#/login">Đăng nhập</a><a class="btn btn-primary" href="#/register">Đăng ký</a>';
    return (
      '<header class="topbar"><div class="topbar-inner"><a class="brand" href="#/"><div class="brand-mark">DC</div><div class="brand-copy"><strong>' +
      escapeHtml(SETTINGS.siteTitle) +
      '</strong><span>Trắc nghiệm DISC theo 3 môi trường</span></div></a><button class="nav-toggle" data-action="toggle-mobile-nav" aria-expanded="' +
      String(mobileOpen) +
      '" aria-label="Mở menu điều hướng"><span></span><span></span><span></span></button><nav class="topnav"><a class="nav-link" href="#/">Trang chủ</a><div class="nav-group"><a class="nav-link" href="#/disc">Nhóm DISC</a><div class="nav-chip-row"><a class="nav-chip" href="#/disc/d">D</a><a class="nav-chip" href="#/disc/i">I</a><a class="nav-chip" href="#/disc/s">S</a><a class="nav-chip" href="#/disc/c">C</a></div></div>' +
      authLinks +
      '</nav></div><div class="mobile-nav ' +
      (mobileOpen ? "is-open" : "") +
      '"><a class="nav-link" href="#/">Trang chủ</a><a class="nav-link" href="#/disc">Nhóm DISC</a><div class="nav-chip-row"><a class="nav-chip" href="#/disc/d">D</a><a class="nav-chip" href="#/disc/i">I</a><a class="nav-chip" href="#/disc/s">S</a><a class="nav-chip" href="#/disc/c">C</a></div>' +
      authLinks +
      '</div></header>'
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
    const environments = getEnvironmentOptions();
    const defaultQuestionCount = getQuestionList(DEFAULT_ENVIRONMENT_KEY).length;

    return (
      '<main>' +
      '<section class="hero hero-centered hero-home"><div class="container"><div class="hero-stack hero-home-stack"><div class="eyebrow">Công cụ đánh giá tính cách chuyên nghiệp</div><h1 class="hero-title hero-title-center">Khám Phá <span class="text-accent">Tính Cách</span><br>Của Bạn</h1><div class="hero-copy hero-copy-center"><p>Bài đánh giá DISC giúp bạn hiểu rõ phong cách hành vi, điểm mạnh và cách giao tiếp hiệu quả nhất.</p><p>Được áp dụng bởi hàng triệu người trên toàn thế giới.</p></div><div class="hero-home-prompt">Chọn môi trường phù hợp với bạn</div><div class="hero-actions hero-actions-center hero-home-actions">' +
      environments.map(function (environment) {
        const buttonLabel = environment.key === "life"
          ? "Cuộc Sống"
          : environment.key === "work"
            ? "Công Việc"
            : "Lãnh Đạo";
        const buttonIcon = environment.key === "life"
          ? "♡"
          : environment.key === "work"
            ? "◫"
            : "♛";
        return '<a class="btn hero-home-cta hero-home-cta-' +
          escapeHtml(environment.key) +
          '" href="#' +
          getEnvironmentRoute(environment.key, 1) +
          '"><span class="hero-home-cta-icon" aria-hidden="true">' +
          buttonIcon +
          '</span><span>' +
          buttonLabel +
          '</span><span aria-hidden="true">→</span></a>';
      }).join('') +
      '</div><div class="hero-footnote hero-home-note">Miễn phí · 10-15 phút · Kết quả tức thì</div><div class="hero-stat-row hero-home-stats"><div class="hero-stat"><strong>' +
      String(defaultQuestionCount || 0) +
      '</strong><span>Câu hỏi chuyên sâu</span></div><div class="hero-stat"><strong>' +
      String(Object.keys(DISC_TYPES).length) +
      '</strong><span>Chiều tính cách DISC</span></div><div class="hero-stat"><strong>100%</strong><span>Miễn phí hoàn toàn</span></div></div></div></div></section>' +
      '<section class="environment-showcase"><div class="container"><div class="environment-showcase-head"><div class="eyebrow">3 Môi Trường Đánh Giá</div><h1 class="environment-showcase-title">Chọn Môi Trường Phù Hợp</h1><p class="environment-showcase-copy">Mỗi môi trường có bộ câu hỏi riêng biệt, giúp bạn hiểu sâu hơn về tính cách trong từng lĩnh vực cuộc sống.</p></div><div class="environment-grid environment-grid-v3">' +
      environments.map(function (environment) {
        const theme = getEnvironmentTheme(environment.key);
        return '<article class="environment-card environment-card-v3" style="--accent:' +
          escapeHtml(theme.accent) +
          ';--accent-strong:' +
          escapeHtml(theme.accentStrong) +
          ';--accent-soft:' +
          escapeHtml(theme.soft) +
          ';--accent-border:' +
          escapeHtml(theme.border) +
          ';--accent-shadow:' +
          escapeHtml(theme.shadow) +
          '"><div class="environment-top"><div class="environment-icon">' +
          escapeHtml(theme.icon || environment.icon || '●') +
          '</div><span class="environment-badge">' +
          escapeHtml(theme.badge || environment.badge || '') +
          '</span></div><h3>' +
          escapeHtml(environment.label) +
          '</h3><p class="card-copy">' +
          escapeHtml(environment.shortDescription || '') +
          '</p><button class="btn environment-btn environment-btn-v3" data-action="start-quiz" data-environment="' +
          escapeHtml(environment.key) +
          '">Bắt Đầu Kiểm Tra <span aria-hidden="true">→</span></button></article>';
      }).join('') +
      '</div><div class="environment-showcase-foot"><button class="btn btn-primary" data-action="start-quiz" data-environment="' +
      escapeHtml(DEFAULT_ENVIRONMENT_KEY) +
      '">' +
      escapeHtml(SETTINGS.startButton) +
      '</button><a class="btn btn-secondary" href="#/disc">Xem 4 nhóm DISC</a></div></div></section>' +
      '<section class="section"><div class="container"><div class="section-header section-header-center"><div style="width:100%"><div class="eyebrow">4 kiểu tính cách</div><h2 class="section-title section-title-center">4 Kiểu Tính Cách DISC</h2><p class="section-copy section-copy-center">Mỗi người đều có sự kết hợp riêng giữa 4 nhóm tính cách này.</p></div></div><div class="disc-card-grid">' +
      discSummaryCard('D', 'Thống Lĩnh', 'DOMINANCE', 'Quyết đoán, mạnh mẽ, hướng đến kết quả. Luôn dẫn đầu và không ngại thử thách.', '13%') +
      discSummaryCard('I', 'Ảnh Hưởng', 'INFLUENCE', 'Nhiệt tình, hoạt bát, truyền cảm hứng. Kết nối mọi người và tạo năng lượng tích cực.', '28%') +
      discSummaryCard('S', 'Ổn Định', 'STEADINESS', 'Kiên nhẫn, đáng tin, quan tâm người khác. Gắn kết đội nhóm và duy trì sự hài hòa.', '47%') +
      discSummaryCard('C', 'Cẩn Thận', 'CONSCIENTIOUSNESS', 'Chính xác, tỉ mỉ, có hệ thống. Đảm bảo chất lượng và tuân thủ tiêu chuẩn cao.', '12%') +
      '</div></div></section>' +
      '<section class="section"><div class="container"><div class="section-header"><div style="width:100%"><div class="eyebrow">Lợi ích khi làm bài test DISC</div></div></div><div class="benefit-grid">' +
      infoCard('01', 'Nhóm DISC nổi trội', 'Biết nhóm nào đang là xu hướng hành vi nổi bật nhất của bạn trong 4 nhóm D, I, S, C.') +
      infoCard('02', 'Điểm mạnh tự nhiên', 'Nhìn rõ những điểm bạn có thể phát huy trong công việc, phối hợp và giao tiếp.') +
      infoCard('03', 'Điểm cần cân bằng', 'Nhận ra những điều dễ tạo lệch nhịp hoặc gây khó khăn khi làm việc với người khác.') +
      infoCard('04', 'Gợi ý phát triển', 'Có thêm định hướng để điều chỉnh phong cách của mình theo hướng hiệu quả hơn.') +
      '</div></div></section>' +
      '</main>'
    );
  }

  function visualRow(icon, title, copy) {
    return '<div class="visual-row"><div class="visual-tag"><span class="visual-icon" style="background:#ff8a3d">' + icon + '</span><div><strong>' + title + '</strong><div class="helper">' + copy + '</div></div></div></div>';
  }

  function metricCard(title, text) {
    return '<div class="metric-card"><strong>' + title + '</strong><span>' + text + '</span></div>';
  }

  function infoCard(icon, title, text) {
    return '<article class="section-card"><div class="badge-circle">' + icon + '</div><h3>' + title + '</h3><p class="card-copy">' + text + '</p></article>';
  }

  function discSummaryCard(letter, title, subtitle, copy, percent) {
    return '<a class="disc-summary-card" data-style="' + letter + '" href="#/disc/' + letter.toLowerCase() + '"><div class="disc-summary-top"><div class="disc-summary-letter">' + letter + '</div><div class="disc-summary-percent">' + percent + '</div></div><h3>' + title + '</h3><div class="disc-summary-subtitle">' + subtitle + '</div><p class="card-copy">' + copy + '</p></a>';
  }


function applyPageEffects() {
    if (skipNextReveal) {
      skipNextReveal = false;
      return;
    }

    const targets = document.querySelectorAll(
      '.hero-stack, .panel, .section-card, .metric-card, .visual-row, .disc-summary-card, .article-card, .trait-card, .share-card, .result-hero'
    );

    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (node) {
        node.classList.add("reveal-up", "is-visible");
      });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
    }

    targets.forEach(function (node, index) {
      node.classList.add("reveal-up");
      node.style.transitionDelay = Math.min(index * 40, 240) + "ms";
      revealObserver.observe(node);
    });
  }

  function renderAuthPage(mode) {
    const title = mode === "login" ? "Đăng nhập" : "Đăng ký tài khoản";
    const subtitle =
      mode === "login"
        ? "Đăng nhập để xem lịch sử bài test, nhận kết quả và cập nhật email nếu cần."
        : "Đăng ký để lưu hồ sơ, đồng bộ lịch sử bài test và nhận kết quả qua email.";
    const pendingEnvironment = state.pending && state.pending.environmentKey;
    const hasPendingComplete = isPendingComplete(pendingEnvironment || DEFAULT_ENVIRONMENT_KEY);

    return (
      '<main class="type-page"><div class="container"><section class="panel section-card"><div class="eyebrow">' +
      (mode === "login" ? "Tài khoản đã có" : "Tạo tài khoản mới") +
      '</div><h2 class="section-title">' +
      title +
      '</h2><p class="section-copy">' +
      subtitle +
      (hasPendingComplete ? ' Bạn đang có một bài test đã hoàn thành và hệ thống sẽ gửi đi ngay sau khi xác thực thành công.' : '') +
      '</p><form id="' +
      mode +
      '-form" class="form-grid" style="margin-top:20px">' +
      (mode === "register" ? '<div class="field"><label class="label">Họ và tên</label><input class="input" name="full_name" required></div><div class="field"><label class="label">Số điện thoại</label><input class="input" name="phone"></div>' : '') +
      '<div class="field"><label class="label">Email</label><input class="input" name="email" type="email" required></div><div class="field"><label class="label">Mật khẩu</label><input class="input" name="password" type="password" required></div><div class="field full"><button class="btn btn-primary" type="submit">' +
      (mode === "login" ? "Đăng nhập" : "Đăng ký và tiếp tục") +
      '</button></div></form><div class="card-actions" style="margin-top:12px">' +
      (mode === "login" ? '<a class="btn btn-ghost" href="#/register">Chưa có tài khoản? Đăng ký</a>' : '<a class="btn btn-ghost" href="#/login">Đã có tài khoản? Đăng nhập</a>') +
      '</div></section></div></main>'
    );
  }

  function renderQuiz(environmentKey, stepText) {
    const bank = getQuestionBank(environmentKey);
    const theme = getEnvironmentTheme(bank.key);
    const questions = getQuestionList(bank.key);
    const pending = ensurePendingSession(bank.key);
    const step = Math.max(1, Math.min(questions.length || 1, Number(stepText || 1)));
    const question = questions[step - 1];
    const response = question ? getPendingResponse(question.id, bank.key) : { choice: null };
    const isReady = !!response.choice;
    const accordionOpen = sessionStorage.getItem("disc_guide_open") !== "0";
    const progress = questions.length ? Math.round((step / questions.length) * 100) : 0;

    if (!question) {
      return '<main class="type-page"><div class="container"><section class="panel section-card"><h2 class="section-title">Không tìm thấy bộ câu hỏi cho môi trường này.</h2></section></div></main>';
    }

    return (
      '<main class="quiz-page"><div class="container"><a class="back-link" href="#/">&larr; Quay lại</a><section class="accordion quiz-guide" style="--quiz-accent:' +
      escapeHtml(theme.accent) +
      ';--quiz-soft:' +
      escapeHtml(theme.soft) +
      ';--quiz-border:' +
      escapeHtml(theme.border) +
      '"><button class="accordion-head" data-action="toggle-guide"><span>Hướng dẫn thực hiện</span><span>' +
      (accordionOpen ? '&#8963;' : '&#8964;') +
      '</span></button><div class="accordion-body ' +
      (accordionOpen ? '' : 'hidden') +
      '"><p>Bài đánh giá này thuộc môi trường <strong>' +
      escapeHtml(bank.label) +
      '</strong> và gồm ' +
      questions.length +
      ' câu hỏi, mỗi câu có 4 đáp án A, B, C, D.</p><ul><li>Hãy đọc kỹ câu hỏi trước khi chọn.</li><li>Mỗi câu chỉ chọn 1 đáp án phù hợp nhất với bạn.</li></ul><p>' +
      escapeHtml(theme.quizNote) +
      '</p></div></section><section class="question-wrap quiz-no-reveal quiz-surface" style="--quiz-accent:' +
      escapeHtml(theme.accent) +
      ';--quiz-accent-strong:' +
      escapeHtml(theme.accentStrong) +
      ';--quiz-soft:' +
      escapeHtml(theme.soft) +
      ';--quiz-border:' +
      escapeHtml(theme.border) +
      ';--quiz-gradient:' +
      escapeHtml(theme.gradient) +
      '"><div class="quiz-head quiz-head-v2"><div class="quiz-head-main"><div class="quiz-theme-badge">' +
      escapeHtml(theme.badge) +
      '</div><div class="quiz-title-wrap"><div class="quiz-environment-mark">' +
      escapeHtml(bank.label) +
      '</div><h1 class="quiz-title quiz-title-v2">Bài trắc nghiệm DISC</h1><p class="quiz-prompt-intro">Mỗi câu chỉ chọn một đáp án A, B, C hoặc D.</p></div></div><div class="quiz-progress-card"><div class="quiz-progress-label">Tiến độ</div><strong>' +
      step + '/' + questions.length +
      '</strong><div class="progress-track"><span style="width:' + progress + '%"></span></div></div></div><div class="quiz-question-card"><div class="quiz-question-label">Câu hỏi ' +
      step +
      '</div><h2 class="quiz-question-text">' +
      escapeHtml(question.prompt) +
      '</h2></div><div class="quiz-body quiz-body-v2 quiz-answer-list">' +
      question.items.map(function (item) {
        return '<button class="quiz-answer-btn ' +
          (response.choice === item.id ? 'is-selected' : '') +
          '" data-action="pick-choice" data-environment="' +
          bank.key +
          '" data-question="' +
          question.id +
          '" data-item="' +
          item.id +
          '"><span class="quiz-answer-key">' +
          escapeHtml(String(item.id || '').toUpperCase()) +
          '</span><span class="quiz-answer-copy">' +
          escapeHtml(item.text) +
          '</span></button>';
      }).join('') +
      '</div><div class="quiz-footer quiz-footer-v2">' +
      (step > 1 ? '<a class="btn btn-secondary" href="#' + getEnvironmentRoute(bank.key, step - 1) + '">&larr; Câu trước</a>' : '<span></span>') +
      (step < questions.length
        ? '<a class="btn btn-primary ' + (isReady ? '' : 'disabled') + '" ' + (isReady ? 'href="#' + getEnvironmentRoute(bank.key, step + 1) + '"' : '') + '>Câu sau &rarr;</a>'
        : '<button class="btn btn-primary" data-action="complete-pending" data-environment="' + bank.key + '" ' + (isReady ? '' : 'disabled') + '>Nhận kết quả</button>') +
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
      return renderLockedResult(detail.assessment_id, detail.email_status_text || "Email gửi chưa thành công.");
    }

    const activeTab = state.routeData.resultTab || "overview";
    const combo = RESULT_COMBOS[detail.disc_code] || ["Phong cách kết hợp", "Sự pha trộn giữa hai động lực hành vi nổi trội."];
    const primary = getResultMeta(detail.disc_primary);
    const secondary = getResultMeta(detail.disc_secondary);
    const environmentTheme = getEnvironmentTheme(detail.environment_key || DEFAULT_ENVIRONMENT_KEY);
    const resultKnowledge = buildResultKnowledge(detail, primary, secondary);
    const scores = getResultScores(detail);
    const orderedScores = ["D", "I", "S", "C"].map(function (key) {
      return {
        key: key,
        meta: getResultMeta(key),
        value: scores[key],
        percent: Math.round((scores[key] / 40) * 100),
      };
    });
    const sortedScores = orderedScores.slice().sort(function (a, b) { return b.value - a.value; });

    return (
      '<main class="result-page result-page-v2"><div class="container"><section class="result-summary-hero reveal-up" style="--result-env:' +
      escapeHtml(environmentTheme.accent) +
      ';--result-env-soft:' +
      escapeHtml(environmentTheme.soft) +
      ';--result-env-border:' +
      escapeHtml(environmentTheme.border) +
      '"><div class="result-summary-main"><div class="eyebrow result-environment-eyebrow">' +
      escapeHtml(environmentTheme.resultLabel) +
      '</div><div class="result-summary-title-row"><div class="result-summary-icon" style="background:' +
      primary.color +
      '">' +
      primary.icon +
      '</div><div><h1 class="result-summary-title">' +
      escapeHtml(primary.shortName) +
      '</h1><p class="result-summary-english">' +
      escapeHtml(primary.english) +
      '</p></div></div><p class="result-summary-line">' +
      escapeHtml(resultKnowledge.summary) +
      '</p><p class="result-summary-context">' +
      escapeHtml(resultKnowledge.blendLine) +
      '</p><div class="result-chip-row">' +
      primary.chips.map(function (chip) {
        return '<span class="result-keyword-chip">' + escapeHtml(chip) + "</span>";
      }).join("") +
      '</div></div><aside class="result-secondary-card"><div class="result-secondary-icon" style="background:' +
      secondary.soft +
      "; color:" +
      secondary.color +
      '">' +
      secondary.icon +
      '</div><div><span class="small-note">Kiểu phụ</span><strong>' +
      escapeHtml(secondary.shortName) +
      "</strong></div></aside></section>" +
      '<section class="result-chart-panel panel section-card reveal-up"><div class="result-section-head"><div><h2 class="result-section-title">Biểu đồ điểm số DISC</h2><p class="small-note">Điểm số của bạn trên 4 chiều tính cách.</p></div></div><div class="result-bar-chart">' +
      orderedScores.map(function (item) {
        return '<div class="result-bar-item"><div class="result-bar-track"><span style="height:' + Math.max(12, Math.round((item.value / 40) * 220)) + 'px;background:' + item.meta.color + '"></span></div><div class="result-bar-label">' + item.key + "</div></div>";
      }).join("") +
      '</div><div class="result-score-cards">' +
      orderedScores.map(function (item, index) {
        return (
          '<article class="result-score-card ' +
          (index === 0 ? "is-active" : "") +
          '"><div class="result-score-card-head"><div class="result-score-pill" style="background:' +
          item.meta.color +
          '">' +
          item.key +
          '</div><div><strong>' +
          escapeHtml(item.meta.shortName) +
          '</strong><p>' +
          escapeHtml(item.meta.tone) +
          '</p></div></div><div class="result-score-value">' +
          item.value +
          '</div><div class="result-score-progress"><span style="width:' +
          item.percent +
          "%;background:" +
          item.meta.color +
          '"></span></div><div class="result-score-percent">' +
          item.percent +
          "%</div></article>"
        );
      }).join("") +
      '</div></section><section class="result-radar-panel panel section-card reveal-up"><div class="result-section-head"><div><h2 class="result-section-title">Biểu đồ nhện DISC</h2><p class="small-note">Hình dạng biểu đồ thể hiện hồ sơ tính cách tổng thể của bạn.</p></div><div class="result-legend">' +
      orderedScores.map(function (item) {
        return '<span><i style="background:' + item.meta.color + '"></i>' + item.key + " " + item.value + "</span>";
      }).join("") +
      '</div></div><div class="result-radar-wrap">' +
      renderDiscRadar(scores) +
      '</div><div class="result-radar-cards">' +
      orderedScores.map(function (item, index) {
        return (
          '<article class="radar-mini-card ' +
          (index === 0 ? "is-active" : "") +
          '"><div class="result-score-card-head"><div class="result-score-pill" style="background:' +
          item.meta.color +
          '">' +
          item.key +
          '</div><div><strong>' +
          escapeHtml(item.meta.shortName) +
          '</strong><p>' +
          escapeHtml(item.meta.tone) +
          '</p></div></div><div class="result-score-progress"><span style="width:' +
          item.percent +
          "%;background:" +
          item.meta.color +
          '"></span></div><div class="result-mini-value" style="color:' +
          item.meta.color +
          '">' +
          item.value +
          "</div></article>"
        );
      }).join("") +
      '</div></section><section class="result-tabs panel section-card reveal-up"><div class="result-tab-nav">' +
      resultTabButton("overview", "Tổng Quan", activeTab) +
      resultTabButton("strengths", "Điểm Mạnh & Yếu", activeTab) +
      resultTabButton("communication", "Giao Tiếp", activeTab) +
      resultTabButton("sales", "Ứng Dụng", activeTab) +
      '</div><div class="result-tab-content">' +
      renderResultTabContent(activeTab, detail, primary, secondary, combo, sortedScores, resultKnowledge) +
      '</div></section><div class="result-bottom-actions reveal-up"><a class="btn btn-secondary result-bottom-btn" href="#/"><span>⌂</span>Trang Chủ</a><button class="btn btn-primary result-bottom-btn" data-action="start-quiz"><span>↻</span>Làm Bài Lại</button></div></div></main>'
    );
  }

  function getResultMeta(key) {
    return RESULT_DISC_META[key] || RESULT_DISC_META.D;
  }

  function getResultScores(detail) {
    if (detail.raw_scores) {
      return {
        D: clampScore(detail.raw_scores.D),
        I: clampScore(detail.raw_scores.I),
        S: clampScore(detail.raw_scores.S),
        C: clampScore(detail.raw_scores.C),
      };
    }
    return {
      D: fallbackRawScore(detail, "D"),
      I: fallbackRawScore(detail, "I"),
      S: fallbackRawScore(detail, "S"),
      C: fallbackRawScore(detail, "C"),
    };
  }

  function clampScore(value) {
    return Math.max(0, Math.min(40, Number(value) || 0));
  }

  function fallbackRawScore(detail, key) {
    const chartValue =
      (detail.chart_scores && detail.chart_scores[key]) ||
      detail["chart_" + key.toLowerCase()] ||
      4;
    return clampScore(Math.round((Number(chartValue) / 7) * 12) + 4);
  }

  function resultTabButton(tab, label, activeTab) {
    return '<button class="result-tab-btn ' + (tab === activeTab ? "is-active" : "") + '" data-action="switch-result-tab" data-tab="' + tab + '">' + escapeHtml(label) + "</button>";
  }

  function renderResultTabContent(activeTab, detail, primary, secondary, combo, sortedScores, resultKnowledge) {
    if (activeTab === "strengths") {
      return (
        '<section class="result-tab-panel"><div class="result-list-block"><h3 class="result-block-title good">Điểm mạnh nổi bật</h3>' +
        renderListRows(resultKnowledge.strengths, "good") +
        '</div><div class="result-list-block"><h3 class="result-block-title warn">Điểm cần phát triển</h3>' +
        renderListRows(resultKnowledge.growth, "warn") +
        '</div><div class="result-compare"><h3 class="result-block-title">So sánh 4 chiều</h3>' +
        sortedScores.map(function (item, index) {
          return '<div class="compare-row"><span class="compare-rank">' + (index + 1) + '</span><span class="compare-letter" style="background:' + item.meta.color + '">' + item.key + '</span><span class="compare-name">' + escapeHtml(item.meta.shortName) + '</span><div class="compare-bar"><span style="width:' + Math.round((item.value / 40) * 100) + "%;background:" + item.meta.color + '"></span></div><strong style="color:' + item.meta.color + '">' + item.value + '/40</strong></div>';
        }).join("") +
        "</div></section>"
      );
    }
    if (activeTab === "communication") {
      return (
        '<section class="result-tab-panel"><div class="result-copy-block"><h3 class="result-block-title">Phong cách giao tiếp của bạn</h3><p class="type-copy">' +
        escapeHtml(resultKnowledge.communicationStyle) +
        '</p></div><div class="result-copy-block"><h3 class="result-block-title">Cách giao tiếp hiệu quả với bạn</h3>' +
        renderArrowRows(resultKnowledge.communicationTips) +
        '</div><div class="result-highlight" style="background:' +
        secondary.soft +
        '; border-color:' +
        secondary.color +
        '33"><strong>Ảnh hưởng từ kiểu phụ (' +
        secondary.key +
        " — " +
        escapeHtml(secondary.shortName) +
        ')</strong><p>' +
        escapeHtml(secondaryCommunicationText(secondary.key)) +
        "</p></div></section>"
      );
    }
    if (activeTab === "sales") {
      return (
        '<section class="result-tab-panel"><div class="result-list-block"><h3 class="result-block-title good">' +
        escapeHtml(resultKnowledge.applicationTitle) +
        '</h3>' +
        renderListRows(resultKnowledge.application, "good") +
        '</div><div class="result-copy-block"><h3 class="result-block-title">Khi bị căng thẳng</h3><p class="type-copy">' +
        escapeHtml(resultKnowledge.stress) +
        '</p></div><div class="result-advice-bar"><strong>Gợi ý trọng tâm:</strong> ' +
        escapeHtml(primary.advice || primary.salesAdvice) +
        "</div></section>"
      );
    }

    return (
      '<section class="result-tab-panel"><div class="result-copy-block"><h3 class="result-block-title">Nhận xét tổng quan</h3><p class="type-copy">Kiểu ' +
      escapeHtml(primary.english + " (" + primary.shortName + ")") +
      ": " +
      escapeHtml(resultKnowledge.summary) +
      " Kiểu phụ của bạn là " +
      escapeHtml(secondary.shortName) +
      ".</p></div><div class=\"result-copy-block\"><h3 class=\"result-block-title\">" +
      escapeHtml(resultKnowledge.focusTitle) +
      "</h3><p class=\"type-copy\">" +
      escapeHtml(resultKnowledge.focusBody) +
      '</p></div><div class="result-two-col"><div class="result-copy-block"><h3 class="result-block-title">Điều thúc đẩy bạn</h3>' +
      renderMiniPills(resultKnowledge.motivators, "good") +
      '</div><div class="result-copy-block"><h3 class="result-block-title">Điều bạn lo ngại</h3>' +
      renderMiniPills(resultKnowledge.concerns, "warn") +
      '</div></div><div class="result-copy-block"><h3 class="result-block-title">Đặc điểm hành vi</h3><div class="behavior-grid">' +
      primary.behavior.map(function (item) {
        return '<div class="behavior-item"><span>' + escapeHtml(item[0]) + '</span><strong>' + escapeHtml(item[1]) + "</strong></div>";
      }).join("") +
      "</div></div></section>"
    );
  }

  function renderListRows(items, tone) {
    return items.map(function (item) {
      return '<div class="result-list-row ' + tone + '"><span class="result-list-icon">' + (tone === "good" ? "✓" : "→") + "</span><span>" + escapeHtml(item) + "</span></div>";
    }).join("");
  }

  function renderArrowRows(items) {
    return items.map(function (item) {
      return '<div class="result-arrow-row"><span>→</span><span>' + escapeHtml(item) + "</span></div>";
    }).join("");
  }

  function renderMiniPills(items, tone) {
    return '<div class="result-mini-grid">' + items.map(function (item) {
      return '<div class="result-mini-pill ' + tone + '"><span>' + (tone === "good" ? "◌" : "•") + '</span>' + escapeHtml(item) + "</div>";
    }).join("") + "</div>";
  }

  function secondaryCommunicationText(key) {
    return {
      D: "Kiểu phụ D khiến bạn quyết đoán hơn khi cần ra quyết định, thích chốt nhanh và muốn giữ quyền chủ động trong trao đổi.",
      I: "Kiểu phụ I khiến cách giao tiếp của bạn mềm hơn, giàu tương tác hơn và dễ tạo cảm giác gần gũi cho người đối diện.",
      S: "Kiểu phụ S khiến bạn giao tiếp nhẹ nhàng, an toàn và lắng nghe nhiều hơn. Bạn ưu tiên sự chân thành, nhịp ổn định và sự tin tưởng lâu dài.",
      C: "Kiểu phụ C khiến bạn chú ý hơn tới tính đúng đắn, logic và cách diễn đạt rõ ràng trước khi đưa ra kết luận.",
    }[key] || "";
  }

  function renderDiscRadar(scores) {
    const max = 40;
    const centerX = 260;
    const centerY = 210;
    const maxR = 118;
    const axes = {
      D: { x: centerX, y: centerY - (scores.D / max) * maxR },
      I: { x: centerX + (scores.I / max) * maxR, y: centerY },
      S: { x: centerX, y: centerY + (scores.S / max) * maxR },
      C: { x: centerX - (scores.C / max) * maxR, y: centerY },
    };
    const polygon = [axes.D, axes.I, axes.S, axes.C].map(function (p) { return p.x + "," + p.y; }).join(" ");
    return '<svg class="radar-svg" viewBox="0 0 520 420" aria-hidden="true"><g class="radar-grid"><polygon points="260,92 378,210 260,328 142,210"></polygon><polygon points="260,132 338,210 260,288 182,210"></polygon><polygon points="260,172 298,210 260,248 222,210"></polygon><line x1="260" y1="92" x2="260" y2="328"></line><line x1="142" y1="210" x2="378" y2="210"></line></g><polygon class="radar-shape" points="' + polygon + '"></polygon>' +
      ["D","I","S","C"].map(function (key) {
        const point = axes[key];
        const meta = getResultMeta(key);
        const lx = key === "I" ? 420 : key === "C" ? 98 : 260;
        const ly = key === "D" ? 72 : key === "S" ? 364 : 210;
        return '<g><circle cx="' + point.x + '" cy="' + point.y + '" r="8" fill="#fff" stroke="' + meta.color + '" stroke-width="3"></circle><circle cx="' + point.x + '" cy="' + point.y + '" r="4" fill="' + meta.color + '"></circle><text x="' + lx + '" y="' + ly + '" class="radar-label" style="fill:' + meta.color + '">' + key + '</text><text x="' + lx + '" y="' + (ly + 22) + '" class="radar-name" style="fill:' + meta.color + '">' + escapeHtml(meta.shortName) + '</text><text x="' + lx + '" y="' + (ly + 44) + '" class="radar-score" style="fill:' + meta.color + '">' + scores[key] + '</text></g>';
      }).join("") +
      "</svg>";
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
        ? history.items.map(function (item) {
            const resultVisible = item.result_visible_to_user === true || item.result_visible_to_user === 'TRUE' || item.result_visible_to_user === 'true' || item.email_status === 'sent';
            const locked = !resultVisible;
            const comboTitle = (RESULT_COMBOS[item.disc_code] && RESULT_COMBOS[item.disc_code][0]) || item.result_title || 'Đang chờ kết quả';
            const status = item.email_status_text || (item.email_status === 'sent' ? 'Đã gửi kết quả' : 'Sai thông tin người nhận');
            return '<article class="share-card" style="margin-top:16px"><div class="header-actions"><strong>' +
              escapeHtml((item.disc_code || '--') + ' - ' + comboTitle) +
              '</strong>' +
              (locked ? '<span class="small-note" style="color:#ef4444">' + escapeHtml(status) + '</span>' : '<a class="btn btn-secondary" href="#/result/' + item.assessment_id + '">Xem chi tiết</a>') +
              '</div><div class="card-copy" style="margin:12px 0">' +
              escapeHtml((item.environment_label ? item.environment_label + ' • ' : '') + (item.submitted_at_text || '')) +
              '</div><div class="card-actions">' +
              (locked ? '<form class="inline-email-form" data-action="update-email" data-assessment="' + item.assessment_id + '"><input class="input" name="email" type="email" placeholder="Nhập lại email đúng" required style="min-width:280px"><button class="btn btn-primary" type="submit">Cập nhật để nhận kết quả</button></form>' : '<span class="small-note">Email đã gửi thành công. Kết quả đã được mở.</span>') +
              '</div></article>';
          }).join('')
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
            return '<article class="share-card" style="margin-top:14px"><div class="header-actions"><strong>' +
              escapeHtml(item.full_name || '(Chưa có tên)') +
              '</strong><span class="small-note">' + escapeHtml(item.disc_code || '--') + '</span></div><div class="card-copy">' +
              escapeHtml((item.email || '') + ' • ' + (item.submitted_at_text || '')) +
              '</div><div class="chip-row" style="margin-top:12px"><span class="btn btn-ghost">Mail: ' + escapeHtml(item.email_status || '') + '</span><span class="btn btn-ghost">Visible: ' + (item.result_visible_to_user ? 'yes' : 'no') + '</span><span class="btn btn-ghost">' + escapeHtml(item.environment_label || 'Legacy') + '</span></div></article>';
          }).join('')
        : '<div class="empty-state">Chưa có dữ liệu gần đây.</div>') +
      '</section></div></main>'
    );
  }

  function renderDiscHub() {
    return (
      '<main class="type-page"><div class="container"><section class="panel section-card"><div class="section-header"><div><div class="eyebrow">Khám phá 4 nhóm</div><h2 class="section-title">Chọn nhóm DISC bạn muốn xem chi tiết.</h2></div><p class="section-copy">Từ trang này, người dùng có thể đi vào đầy đủ 4 nhóm tính cách D, I, S, C thay vì chỉ một trang mô tả duy nhất.</p></div><div class="type-grid">' +
      Object.keys(DISC_TYPES).map(function (key) {
        const style = DISC_TYPES[key];
        return '<article class="type-card" data-style="' + style.key + '"><div class="type-letter" style="background:' + style.color + '">' + style.key + '</div><h3>' + escapeHtml(style.fullName) + '</h3><p class="card-copy">' + escapeHtml(style.tone) + '</p><div class="card-actions" style="margin-top:12px"><a class="btn btn-secondary" href="#/disc/' + style.key.toLowerCase() + '">Xem nhóm ' + style.key + '</a></div></article>';
      }).join('') +
      '</div></section></div></main>'
    );
  }

  function renderDiscType(typeKey) {
    const style = DISC_TYPES[(typeKey || '').toUpperCase()];
    if (!style) {
      return '<main class="type-page"><div class="container"><section class="panel section-card"><h2 class="section-title">Không tìm thấy nhóm DISC.</h2></section></div></main>';
    }
    return (
      '<main class="type-page"><div class="container"><a class="back-link" href="#/">&larr; Quay lại</a><section class="result-hero"><div><div class="eyebrow">' + escapeHtml(style.nameVi) + '</div><h1 class="combo-code" style="color:' + style.color + '">' + escapeHtml(style.fullName) + '</h1><p class="combo-subtitle">' + escapeHtml(style.description) + '</p></div><div class="result-illustration"><div class="figure"></div></div></section><div class="article-grid">' +
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
      D: "được làm chủ tình huống và tiến về đích nhanh",
      I: "được kết nối, ghi nhận và tạo ảnh hưởng tích cực",
      S: "giữ sự hài hòa, ổn định và cảm giác an toàn",
      C: "đảm bảo tính đúng đắn, logic và tiêu chuẩn rõ ràng",
    }[key];
  }

  function goalText(key) {
    return {
      D: "đạt kết quả, dẫn dắt và tạo chuyển động rõ ràng",
      I: "kết nối, truyền động lực và kéo mọi người cùng nhập cuộc",
      S: "duy trì sự ổn định, đáng tin và hỗ trợ tập thể đi đường dài",
      C: "làm đúng, làm chắc và giữ chất lượng ở mức cao",
    }[key];
  }

  function evaluationText(key) {
    return {
      D: "Bạn thường đánh giá cao người chủ động, nhanh nhạy, biết nhận trách nhiệm và không vòng vo.",
      I: "Bạn bị thu hút bởi những người có năng lượng, giao tiếp cuốn hút, biết lan tỏa tinh thần tích cực.",
      S: "Bạn đánh giá cao người chân thành, bền bỉ, đáng tin và biết nghĩ cho tập thể.",
      C: "Bạn tin tưởng hơn vào người có logic, cẩn thận, đúng hẹn và tôn trọng tiêu chuẩn.",
    }[key];
  }

  function influenceText(primaryKey, secondaryKey) {
    const primaryText = {
      D: "sự thẳng thắn, định hướng rõ và nhịp hành động mạnh",
      I: "năng lượng tích cực, sự lôi cuốn và khả năng kết nối tự nhiên",
      S: "sự ổn định, chân thành và cảm giác dễ chịu khi phối hợp",
      C: "lập luận chặt chẽ, sự chuẩn xác và cảm giác đáng tin về chuyên môn",
    }[primaryKey];
    const secondaryText = {
      D: "quyết đoán hơn khi cần chốt hạ",
      I: "mềm hơn nhờ khả năng tạo thiện cảm",
      S: "êm hơn nhờ sự kiên nhẫn và ổn định",
      C: "thuyết phục hơn nhờ lý lẽ và cấu trúc rõ",
    }[secondaryKey];
    return "Bạn thường ảnh hưởng người khác bằng " + primaryText + ", và điều đó trở nên " + secondaryText + ".";
  }

  function fearText(primaryKey, secondaryKey) {
    const primaryFear = {
      D: "bị chậm nhịp, mất quyền chủ động hoặc không chạm tới mục tiêu",
      I: "bị phớt lờ, bị tách khỏi tập thể hoặc không còn sức ảnh hưởng",
      S: "xung đột kéo dài, thay đổi đột ngột và cảm giác mất an toàn",
      C: "sai sót, mơ hồ, thiếu chuẩn hoặc bị buộc quyết khi chưa đủ dữ liệu",
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
      D: "dễ bộc phát trực diện hơn",
      I: "dễ biểu lộ cảm xúc rõ hơn",
      S: "thường chậm lại và thu mình hơn",
      C: "thường trở nên khắt khe và kiểm tra kỹ hơn",
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
    const questions = pending ? getQuestionList(pending.environmentKey) : [];
    if (!pending || !isPendingComplete(pending.environmentKey)) {
      pushNotice("error", "Bạn chưa hoàn thành hết bộ câu hỏi hiện tại.");
      render();
      return;
    }
    try {
      const answerLookup = {};
      questions.forEach(function (question) {
        answerLookup[question.id] = question;
      });
      const result = await apiRequest("submitAssessment", {
        session_id: pending.id,
        environment_key: pending.environmentKey,
        environment_label: getQuestionBank(pending.environmentKey).label,
        question_bank_version: QUESTION_BANK_VERSION,
        answers: pending.responses.map(function (response) {
          const question = answerLookup[response.questionId];
          const selectedItem =
            question &&
            question.items.find(function (item) {
              return item.id === response.choice;
            });
          return {
            questionId: response.questionId,
            choice: response.choice,
            choice_disc: selectedItem ? selectedItem.disc : "",
          };
        }),
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
    else if (first === "quiz") content = renderQuiz(route.parts[1], route.parts[2]);
    else if (first === "profile") content = renderProfilePage();
    else if (first === "admin") content = renderAdminPage();
    else if (first === "result") content = renderResultPage();
    else if (first === "disc") content = route.parts[1] ? renderDiscType(route.parts[1]) : renderDiscHub();
    else content = renderNotFound("Đường dẫn không hợp lệ.");

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
        const environmentKey = button.dataset.environment || DEFAULT_ENVIRONMENT_KEY;
        ensurePendingSession(environmentKey);
        state.routeData.mobileNavOpen = false;
        navigate(getEnvironmentRoute(environmentKey, 1));
      });
    });

    document.querySelectorAll('[data-action="pick-choice"]').forEach(function (button) {
      button.addEventListener("click", function () {
        savePendingChoice(
          button.dataset.environment || (state.pending && state.pending.environmentKey) || DEFAULT_ENVIRONMENT_KEY,
          button.dataset.question,
          "choice",
          button.dataset.item
        );
      });
    });

    document.querySelectorAll('[data-action="complete-pending"]').forEach(function (button) {
      button.addEventListener("click", async function () {
        if (button.disabled || button.dataset.loading === "1") return;
        if (!state.auth) {
          navigate("/register");
          return;
        }
        button.dataset.loading = "1";
        setButtonLoading(button, true, "Đang xử lý kết quả...");
        try {
          await submitPendingToBackend();
        } finally {
          button.dataset.loading = "0";
          setButtonLoading(button, false);
        }
      });
    });

    document.querySelectorAll('[data-action="toggle-mobile-nav"]').forEach(function (button) {
      button.addEventListener("click", function () {
        state.routeData.mobileNavOpen = !state.routeData.mobileNavOpen;
        skipNextReveal = true;
        render();
      });
    });

    document.querySelectorAll('[data-action="toggle-guide"]').forEach(function (button) {
      button.addEventListener("click", function () {
        const open = sessionStorage.getItem("disc_guide_open") !== "0";
        sessionStorage.setItem("disc_guide_open", open ? "0" : "1");
        render();
      });
    });

    document.querySelectorAll('[data-action="switch-result-tab"]').forEach(function (button) {
      button.addEventListener("click", function () {
        state.routeData.resultTab = button.dataset.tab || "overview";
        skipNextReveal = true;
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
        if (loginForm.dataset.loading === "1") return;
        const form = new FormData(loginForm);
        const submitButton = loginForm.querySelector('button[type="submit"]');
        loginForm.dataset.loading = "1";
        setButtonLoading(submitButton, true, "Đang đăng nhập...");
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
        } finally {
          loginForm.dataset.loading = "0";
          setButtonLoading(submitButton, false);
        }
      });
    }

    const registerForm = document.getElementById("register-form");
    if (registerForm) {
      registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        if (registerForm.dataset.loading === "1") return;
        const form = new FormData(registerForm);
        const submitButton = registerForm.querySelector('button[type="submit"]');
        registerForm.dataset.loading = "1";
        setButtonLoading(submitButton, true, "Đang tạo tài khoản...");
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
        } finally {
          registerForm.dataset.loading = "0";
          setButtonLoading(submitButton, false);
        }
      });
    }

    document.querySelectorAll('[data-action="update-email"]').forEach(function (form) {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        if (form.dataset.loading === "1") return;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        form.dataset.loading = "1";
        setButtonLoading(submitButton, true, "Đang gửi lại kết quả...");
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
        } finally {
          form.dataset.loading = "0";
          setButtonLoading(submitButton, false);
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
            button.textContent = "Chia sẻ";
          }, 1200);
        }
      });
    });
  }

  function render() {
    renderPage();
    applyPageEffects();
  }

  window.addEventListener("hashchange", function () {
    resetRouteData();
    state.routeData.mobileNavOpen = false;
    render();
  });

  window.addEventListener("load", function () {
    render();
  });
})();

