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
  const QUESTION_BANK_VERSION = "v2-40";
  const ENVIRONMENT_KEYS = ["life", "work", "leadership"].filter(function (key) {
    return QUESTION_BANKS[key];
  });
  const DEFAULT_ENVIRONMENT_KEY = QUESTION_BANKS.work
    ? "work"
    : ENVIRONMENT_KEYS[0] || "life";

  const DISC_TYPES = {
    D: {
      key: "D",
      nameVi: "NhÃ³m D",
      fullName: "Dominance - Thá»‘ng lÄ©nh",
      color: "#ffb632",
      tone: "NgÆ°á»i quyáº¿t Ä‘oÃ¡n, Ä‘á»‹nh hÆ°á»›ng káº¿t quáº£ vÃ  thÃ­ch chinh phá»¥c thá»­ thÃ¡ch.",
      description:
        "NhÃ³m D ná»•i báº­t á»Ÿ sá»± máº¡nh máº½, trá»±c diá»‡n, thÃ­ch dáº«n dáº¯t vÃ  Æ°u tiÃªn hiá»‡u quáº£. Há» pháº£n á»©ng nhanh, thÃ­ch kiá»ƒm soÃ¡t tÃ¬nh huá»‘ng vÃ  thÆ°á»ng sáºµn sÃ ng nháº­n viá»‡c khÃ³ khi tháº¥y má»¥c tiÃªu Ä‘á»§ lá»›n.",
      highlights: [
        "Quyáº¿t Ä‘oÃ¡n, pháº£n á»©ng nhanh vÃ  táº­p trung má»¥c tiÃªu",
        "Æ¯a thá»­ thÃ¡ch, thÃ­ch tá»± chá»§ vÃ  thÃ­ch vai trÃ² dáº«n dáº¯t",
        "Giao tiáº¿p trá»±c tiáº¿p, rÃµ rÃ ng vÃ  thiÃªn vá» hiá»‡u quáº£",
      ],
      strengths: [
        "Ra quyáº¿t Ä‘á»‹nh nhanh trong Ã¡p lá»±c",
        "Tinh tháº§n chá»§ Ä‘á»™ng, dÃ¡m chá»‹u trÃ¡ch nhiá»‡m",
        "CÃ³ tá»‘ cháº¥t lÃ£nh Ä‘áº¡o vÃ  Ä‘á»‹nh hÆ°á»›ng káº¿t quáº£ rÃµ rÃ ng",
        "Há»£p vá»›i mÃ´i trÆ°á»ng tá»‘c Ä‘á»™ cao, nhiá»u má»¥c tiÃªu lá»›n",
      ],
      weaknesses: [
        "Dá»… thiáº¿u kiÃªn nháº«n khi ngÆ°á»i khÃ¡c cháº­m nhá»‹p",
        "CÃ³ thá»ƒ quÃ¡ tháº³ng vÃ  táº¡o cáº£m giÃ¡c Ã¡p lá»±c",
        "KhÃ³ tiáº¿p nháº­n gÃ³p Ã½ khi Ä‘ang quÃ¡ tin vÃ o hÆ°á»›ng Ä‘i cá»§a mÃ¬nh",
        "ThÆ°á»ng Æ°u tiÃªn má»¥c tiÃªu hÆ¡n cáº£m xÃºc con ngÆ°á»i",
      ],
      workStyle:
        "Trong cÃ´ng viá»‡c, nhÃ³m D thÃ­ch tá»‘c Ä‘á»™, quyá»n chá»§ Ä‘á»™ng vÃ  cÃ¡c má»¥c tiÃªu Ä‘o Ä‘áº¿m rÃµ rÃ ng. Há» thÆ°á»ng muá»‘n quyáº¿t nhanh, lÃ m nhanh vÃ  nhÃ¬n vÃ o bá»©c tranh lá»›n thay vÃ¬ sa vÃ o tiá»ƒu tiáº¿t.",
      career: [
        "Quáº£n lÃ½ / Ä‘iá»u hÃ nh",
        "Kinh doanh",
        "Quáº£n lÃ½ dá»± Ã¡n",
        "Báº¥t Ä‘á»™ng sáº£n",
        "Logistics / váº­n hÃ nh",
      ],
      advice:
        "Äá»ƒ Ä‘i xa hÆ¡n, nhÃ³m D nÃªn luyá»‡n thÃªm láº¯ng nghe, chia sáº» quyá»n kiá»ƒm soÃ¡t vÃ  cÃ¢n báº±ng giá»¯a káº¿t quáº£ vá»›i tráº£i nghiá»‡m cá»§a ngÆ°á»i xung quanh.",
    },
    I: {
      key: "I",
      nameVi: "NhÃ³m I",
      fullName: "Influence - áº¢nh hÆ°á»Ÿng",
      color: "#ff8a3d",
      tone: "NgÆ°á»i truyá»n nÄƒng lÆ°á»£ng, thÃ­ch káº¿t ná»‘i vÃ  táº¡o cáº£m há»©ng cho Ä‘Ã¡m Ä‘Ã´ng.",
      description:
        "NhÃ³m I thÆ°á»ng cá»Ÿi má»Ÿ, giÃ u nhiá»‡t huyáº¿t vÃ  dá»… táº¡o áº£nh hÆ°á»Ÿng tÃ­ch cá»±c lÃªn ngÆ°á»i khÃ¡c. Há» thÃ­ch giao tiáº¿p, thÃ­ch Ä‘Æ°á»£c ghi nháº­n vÃ  thÆ°á»ng mang láº¡i sá»©c sá»‘ng cho mÃ´i trÆ°á»ng lÃ m viá»‡c.",
      highlights: [
        "Giá»i giao tiáº¿p, káº¿t ná»‘i vÃ  táº¡o thiá»‡n cáº£m",
        "Nhiá»‡t tÃ¬nh, truyá»n cáº£m há»©ng vÃ  mang nhiá»u nÄƒng lÆ°á»£ng tÃ­ch cá»±c",
        "Cá»Ÿi má»Ÿ vá»›i tráº£i nghiá»‡m má»›i vÃ  thÃ­ch mÃ´i trÆ°á»ng cÃ³ tÆ°Æ¡ng tÃ¡c",
      ],
      strengths: [
        "Kháº£ nÄƒng thuyáº¿t phá»¥c vÃ  lan tá»a Ä‘á»™ng lá»±c tá»‘t",
        "Dá»… thÃ­ch nghi vá»›i bá»‘i cáº£nh nhiá»u ngÆ°á»i vÃ  nhiá»u thay Ä‘á»•i",
        "PhÃ¹ há»£p vá»›i vai trÃ² cáº§n giao tiáº¿p, sÃ¡ng táº¡o, truyá»n cáº£m há»©ng",
        "Táº¡o khÃ´ng khÃ­ tÃ­ch cá»±c vÃ  kÃ©o nhá»‹p Ä‘á»™i nhÃ³m lÃªn nhanh",
      ],
      weaknesses: [
        "Dá»… cáº£m tÃ­nh hoáº·c bá»‘c Ä‘á»“ng khi quÃ¡ há»©ng khá»Ÿi",
        "KhÃ³ giá»¯ táº­p trung lÃ¢u vÃ o viá»‡c láº·p láº¡i, tá»‰ má»‰",
        "CÃ³ thá»ƒ thiáº¿u ká»· luáº­t theo Ä‘uá»•i Ä‘áº¿n cÃ¹ng náº¿u khÃ´ng cÃ³ cáº¥u trÃºc há»— trá»£",
        "Dá»… bá»‹ áº£nh hÆ°á»Ÿng bá»Ÿi sá»± cÃ´ng nháº­n cá»§a ngÆ°á»i khÃ¡c",
      ],
      workStyle:
        "NhÃ³m I lÃ m tá»‘t nháº¥t trong mÃ´i trÆ°á»ng thÃ¢n thiá»‡n, giÃ u tÆ°Æ¡ng tÃ¡c, cÃ³ khÃ´ng gian biá»ƒu Ä‘áº¡t vÃ  khuyáº¿n khÃ­ch sÃ¡ng táº¡o. Há» thÃ­ch Ä‘Æ°á»£c nÃ³i, Ä‘Æ°á»£c chia sáº» vÃ  Ä‘Æ°á»£c nhÃ¬n tháº¥y tÃ¡c Ä‘á»™ng mÃ¬nh táº¡o ra.",
      career: [
        "Marketing / truyá»n thÃ´ng",
        "Kinh doanh / phÃ¡t triá»ƒn thá»‹ trÆ°á»ng",
        "ÄÃ o táº¡o / giáº£ng dáº¡y",
        "ChÄƒm sÃ³c khÃ¡ch hÃ ng",
        "Sá»± kiá»‡n / cá»™ng Ä‘á»“ng",
      ],
      advice:
        "NhÃ³m I sáº½ phÃ¡t triá»ƒn bá»n vá»¯ng hÆ¡n khi rÃ¨n kháº£ nÄƒng Æ°u tiÃªn, giá»¯ cam káº¿t Ä‘áº¿n cÃ¹ng vÃ  Ä‘Æ°a cáº£m há»©ng Ä‘i cÃ¹ng ká»· luáº­t thá»±c thi.",
    },
    S: {
      key: "S",
      nameVi: "NhÃ³m S",
      fullName: "Steadiness - á»”n Ä‘á»‹nh",
      color: "#7bc96f",
      tone: "NgÆ°á»i kiÃªn nháº«n, táº­n tÃ¢m vÃ  táº¡o cáº£m giÃ¡c yÃªn tÃ¢m cho táº­p thá»ƒ.",
      description:
        "NhÃ³m S Ä‘iá»m Ä‘áº¡m, kiÃªn nháº«n vÃ  Ä‘Ã¡ng tin cáº­y. Há» coi trá»ng sá»± á»•n Ä‘á»‹nh, lÃ²ng trung thÃ nh vÃ  cÃ¡c má»‘i quan há»‡ bá»n vá»¯ng; thÆ°á»ng Ä‘Ã³ng vai trÃ² ngÆ°á»i giá»¯ nhá»‹p vÃ  há»— trá»£ Ã¢m tháº§m trong Ä‘á»™i nhÃ³m.",
      highlights: [
        "Ã”n hÃ²a, kiÃªn nháº«n vÃ  thÃ­ch mÃ´i trÆ°á»ng hÃ²a thuáº­n",
        "Trung thÃ nh, Ä‘Ã¡ng tin cáº­y vÃ  bá»n bá»‰ vá»›i cam káº¿t",
        "Láº¯ng nghe tá»‘t, há»— trá»£ tá»‘t vÃ  Ã­t thÃ­ch xung Ä‘á»™t",
      ],
      strengths: [
        "Giá»¯ sá»± á»•n Ä‘á»‹nh khi mÃ´i trÆ°á»ng nhiá»u Ã¡p lá»±c",
        "Phá»‘i há»£p nhÃ³m tá»‘t vÃ  táº¡o cáº£m giÃ¡c an tÃ¢m cho ngÆ°á»i khÃ¡c",
        "LÃ m viá»‡c Ä‘á»u tay, cÃ³ trÃ¡ch nhiá»‡m vÃ  Ä‘Ã¡ng tin cáº­y",
        "PhÃ¹ há»£p vá»›i vai trÃ² cáº§n há»— trá»£, duy trÃ¬ vÃ  chÄƒm sÃ³c lÃ¢u dÃ i",
      ],
      weaknesses: [
        "Ngáº¡i thay Ä‘á»•i Ä‘á»™t ngá»™t vÃ  khÃ³ thÃ­ch nghi quÃ¡ nhanh",
        "Dá»… nÃ© trÃ¡nh xung Ä‘á»™t hoáº·c cháº­m bÃ y tá» chÃ­nh kiáº¿n",
        "CÃ³ thá»ƒ Ä‘áº·t nhu cáº§u ngÆ°á»i khÃ¡c lÃªn trÃªn báº£n thÃ¢n quÃ¡ má»©c",
        "Hay cháº§n chá»« trong cÃ¡c tÃ¬nh huá»‘ng cáº§n quyáº¿t ráº¥t nhanh",
      ],
      workStyle:
        "NhÃ³m S thÃ­ch quy trÃ¬nh rÃµ, nhá»‹p lÃ m viá»‡c á»•n Ä‘á»‹nh vÃ  mÃ´i trÆ°á»ng tá»­ táº¿. Há» phÃ¡t huy ráº¥t tá»‘t khi Ä‘Æ°á»£c tin tÆ°á»Ÿng, cÃ³ thá»i gian thÃ­ch nghi vÃ  Ä‘Æ°á»£c lÃ m viá»‡c trong táº­p thá»ƒ coi trá»ng sá»± há»— trá»£ láº«n nhau.",
      career: [
        "NhÃ¢n sá»±",
        "Dá»‹ch vá»¥ khÃ¡ch hÃ ng",
        "HÃ nh chÃ­nh - vÄƒn phÃ²ng",
        "Y táº¿ / chÄƒm sÃ³c",
        "Äiá»u phá»‘i / há»— trá»£ váº­n hÃ nh",
      ],
      advice:
        "Muá»‘n bá»©t lÃªn máº¡nh hÆ¡n, nhÃ³m S nÃªn táº­p nÃ³i rÃµ nhu cáº§u cá»§a mÃ¬nh, Ä‘áº·t ranh giá»›i lÃ nh máº¡nh vÃ  táº­p thÃ­ch nghi dáº§n vá»›i thay Ä‘á»•i thay vÃ¬ nÃ© trÃ¡nh hoÃ n toÃ n.",
    },
    C: {
      key: "C",
      nameVi: "NhÃ³m C",
      fullName: "Conscientiousness - TuÃ¢n thá»§",
      color: "#64748b",
      tone: "NgÆ°á»i nguyÃªn táº¯c, lÃ½ trÃ­ vÃ  theo Ä‘uá»•i sá»± chÃ­nh xÃ¡c.",
      description:
        "NhÃ³m C thÆ°á»ng hÃ nh Ä‘á»™ng dá»±a trÃªn logic, tiÃªu chuáº©n vÃ  quy táº¯c rÃµ rÃ ng. Há» cáº©n tháº­n, tá»‰ má»‰, thÃ­ch phÃ¢n tÃ­ch sÃ¢u vÃ  luÃ´n muá»‘n Ä‘áº£m báº£o cháº¥t lÆ°á»£ng, tÃ­nh chÃ­nh xÃ¡c trong má»i viá»‡c.",
      highlights: [
        "ChÃ­nh xÃ¡c, phÃ¢n tÃ­ch tá»‘t vÃ  chÃº trá»ng chi tiáº¿t",
        "TÃ´n trá»ng quy trÃ¬nh, tiÃªu chuáº©n vÃ  cáº¥u trÃºc rÃµ rÃ ng",
        "Táº­p trung cao, lÃ m viá»‡c Ä‘á»™c láº­p tá»‘t vÃ  Ä‘Ã¡ng tin cáº­y",
      ],
      strengths: [
        "TÆ° duy logic, nhÃ¬n tháº¥y rá»§i ro vÃ  lá»— há»•ng nhanh",
        "LÃ m viá»‡c cÃ³ há»‡ thá»‘ng, giá»¯ chuáº©n ráº¥t tá»‘t",
        "PhÃ¹ há»£p vá»›i viá»‡c cáº§n kiá»ƒm soÃ¡t cháº¥t lÆ°á»£ng vÃ  dá»¯ liá»‡u",
        "Ãt bá»‹ cuá»‘n theo cáº£m xÃºc khi ra quyáº¿t Ä‘á»‹nh",
      ],
      weaknesses: [
        "Dá»… cáº§u toÃ n vÃ  cháº­m quyáº¿t khi thiáº¿u Ä‘á»§ dá»¯ liá»‡u",
        "KhÃ´ng thoáº£i mÃ¡i vá»›i mÃ´i trÆ°á»ng mÆ¡ há»“ hoáº·c thay Ä‘á»•i Ä‘á»™t ngá»™t",
        "Giao tiáº¿p cÃ³ thá»ƒ hÆ¡i láº¡nh vÃ  quÃ¡ tháº­n trá»ng",
        "CÃ³ lÃºc Ä‘áº·t tiÃªu chuáº©n quÃ¡ cao cho báº£n thÃ¢n vÃ  ngÆ°á»i khÃ¡c",
      ],
      workStyle:
        "NhÃ³m C thÃ­ch mÃ´i trÆ°á»ng cÃ³ quy trÃ¬nh rÃµ, Ã­t nhiá»…u vÃ  Ä‘á»§ thá»i gian Ä‘á»ƒ suy nghÄ© tháº¥u Ä‘Ã¡o. Há» phÃ¹ há»£p vá»›i vai trÃ² cáº§n cháº¥t lÆ°á»£ng, sá»± chuáº©n xÃ¡c vÃ  kháº£ nÄƒng tá»• chá»©c tá»‘t.",
      career: [
        "PhÃ¢n tÃ­ch dá»¯ liá»‡u",
        "Kiá»ƒm soÃ¡t cháº¥t lÆ°á»£ng",
        "TÃ i chÃ­nh / káº¿ toÃ¡n",
        "PhÃ¡p cháº¿ / tuÃ¢n thá»§",
        "Ká»¹ thuáº­t / quy trÃ¬nh",
      ],
      advice:
        "Äá»ƒ phÃ¡t huy trá»n váº¹n, nhÃ³m C nÃªn há»c cÃ¡ch cháº¥p nháº­n má»©c Ä‘á»§ tá»‘t, giao tiáº¿p dá»… gáº§n hÆ¡n vÃ  linh hoáº¡t hÆ¡n trÆ°á»›c cÃ¡c tÃ¬nh huá»‘ng chÆ°a hoÃ n háº£o.",
    },
  };

  const COMBINATION_LABELS = {
    DI: ["NgÆ°á»i dáº«n dáº¯t truyá»n lá»­a", "Quyáº¿t Ä‘oÃ¡n, giÃ u nÄƒng lÆ°á»£ng, thÃ­ch bá»©t phÃ¡ vÃ  táº¡o áº£nh hÆ°á»Ÿng."],
    DC: ["NgÆ°á»i chá»‰ huy chiáº¿n lÆ°á»£c", "Máº¡nh máº½, chuáº©n xÃ¡c, quyáº¿t theo má»¥c tiÃªu nhÆ°ng váº«n giá»¯ nguyÃªn táº¯c."],
    DS: ["NgÆ°á»i Ä‘áº¡t má»¥c tiÃªu", "Máº¡nh máº½, kiÃªn trÃ¬, trÃ¡ch nhiá»‡m, hÆ°á»›ng tá»›i káº¿t quáº£ vÃ  táº¡o sá»± cÃ¢n báº±ng."],
    ID: ["NgÆ°á»i lan tá»a vÃ  chinh phá»¥c", "SÃ´i ná»•i, tá»± tin, thÃ­ch káº¿t ná»‘i vÃ  khÃ´ng ngáº¡i dáº«n dáº¯t."],
    IC: ["NgÆ°á»i thuyáº¿t phá»¥c tinh táº¿", "Giá»i káº¿t ná»‘i, nÃ³i cÃ³ sá»©c náº·ng vÃ  váº«n chÃº Ã½ chuáº©n má»±c."],
    IS: ["NgÆ°á»i káº¿t ná»‘i chÃ¢n thÃ nh", "áº¤m Ã¡p, tÃ­ch cá»±c, dá»… gáº§n vÃ  luÃ´n muá»‘n táº¡o báº§u khÃ´ng khÃ­ hÃ i hÃ²a."],
    SD: ["NgÆ°á»i bá»n bá»‰ hÃ nh Ä‘á»™ng", "Äiá»m tÄ©nh nhÆ°ng cháº¯c tay, biáº¿t giá»¯ nhá»‹p vÃ  váº«n theo Ä‘uá»•i má»¥c tiÃªu."],
    SI: ["NgÆ°á»i gáº¯n káº¿t con ngÆ°á»i", "ChÃ¢n thÃ nh, kiÃªn nháº«n, giÃ u tinh tháº§n há»— trá»£ vÃ  káº¿t ná»‘i."],
    SC: ["NgÆ°á»i á»•n Ä‘á»‹nh chuáº©n má»±c", "Cáº©n trá»ng, kiÃªn nháº«n vÃ  thÃ­ch sá»± rÃµ rÃ ng, tráº­t tá»±."],
    CD: ["NgÆ°á»i nguyÃªn táº¯c Ä‘á»‹nh hÆ°á»›ng", "LÃ½ trÃ­, máº¡nh máº½ vÃ  cÃ³ xu hÆ°á»›ng kiá»ƒm soÃ¡t cháº¥t lÆ°á»£ng láº«n má»¥c tiÃªu."],
    CI: ["NgÆ°á»i chuáº©n xÃ¡c thuyáº¿t phá»¥c", "PhÃ¢n tÃ­ch tá»‘t nhÆ°ng váº«n cÃ³ kháº£ nÄƒng táº¡o áº£nh hÆ°á»Ÿng nháº¹ nhÃ ng."],
    CS: ["NgÆ°á»i cáº©n trá»ng táº­n tÃ¢m", "Tá»‰ má»‰, Ä‘Ã¡ng tin, há»— trá»£ bá»n bá»‰ vÃ  thÃ­ch mÃ´i trÆ°á»ng cÃ³ cáº¥u trÃºc."],
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
      '<div class="eyebrow">KhÃ´ng tÃ¬m tháº¥y</div>' +
      '<h2 class="section-title">Trang nÃ y hiá»‡n khÃ´ng tá»“n táº¡i.</h2>' +
      '<p class="section-copy">' +
      escapeHtml(message || "ÄÆ°á»ng dáº«n khÃ´ng há»£p lá»‡.") +
      "</p>" +
      '<div class="card-actions"><a class="btn btn-primary" href="#/">Vá» trang chá»§</a></div>' +
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
        return { questionId: question.id, most: null, least: null };
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

    if (mode === "most") {
      response.most = response.most === itemId ? null : itemId;
      if (response.least === response.most) response.least = null;
    } else {
      response.least = response.least === itemId ? null : itemId;
      if (response.most === response.least) response.most = null;
    }
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
      return item.most && item.least;
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
      "</div></header>"
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
    return (
      "<main>" +
      '<section class="hero hero-centered"><div class="container"><div class="hero-stack"><div class="eyebrow">C?ng c? ??nh gi? t?nh c?ch DISC</div><h1 class="hero-title hero-title-center">Kh?m ph? <span class="text-accent">t?nh c?ch</span><br>c?a b?n</h1><p class="hero-copy hero-copy-center">Ch?n m?i tr??ng ph? h?p ?? hi?u r? h?n c?ch b?n ph?n ?ng, giao ti?p v? ph?t huy th? m?nh c?a m?nh.</p><div class="hero-actions hero-actions-center"><button class="btn btn-primary" data-action="start-quiz" data-environment="' +
      escapeHtml(DEFAULT_ENVIRONMENT_KEY) +
      '">' +
      escapeHtml(SETTINGS.startButton) +
      '</button><a class="btn btn-secondary" href="#/disc">Xem 4 nh?m DISC</a></div><div class="hero-copy hero-copy-center hero-footnote">3 m?i tr??ng ??nh gi? ? 40 c?u h?i m?i b? ? K?t qu? chi ti?t sau khi ho?n th?nh</div></div></div></section>' +
      '<section class="section"><div class="container"><div class="section-header section-header-center"><div style="width:100%"><div class="eyebrow">3 M?i Tr??ng ??nh Gi?</div><h2 class="section-title section-title-center">Ch?n m?i tr??ng ph? h?p</h2><p class="section-copy section-copy-center">M?i m?i tr??ng c? b? c?u h?i ri?ng bi?t ?? gi?p b?n hi?u s?u h?n v? b?n th?n trong t?ng l?nh v?c.</p></div></div><div class="environment-grid">' +
      environments.map(function (environment) {
        return '<article class="environment-card" style="--accent:' +
          escapeHtml(environment.accent || '#ff7a1a') +
          '"><div class="environment-top"><div class="environment-icon">' +
          escapeHtml(environment.icon || '?') +
          '</div><span class="environment-badge">' +
          escapeHtml(environment.badge || '') +
          '</span></div><h3>' +
          escapeHtml(environment.label) +
          '</h3><p class="card-copy">' +
          escapeHtml(environment.shortDescription || '') +
          '</p><button class="btn btn-primary environment-btn" data-action="start-quiz" data-environment="' +
          escapeHtml(environment.key) +
          '">B?t ??u ki?m tra</button></article>';
      }).join('') +
      '</div></div></section>' +
      '<section class="section"><div class="container"><div class="section-header section-header-center"><div style="width:100%"><div class="eyebrow">4 ki?u t?nh c?ch</div><h2 class="section-title section-title-center">4 Ki?u T?nh C?ch DISC</h2><p class="section-copy section-copy-center">M?i ng??i ??u c? s? k?t h?p ri?ng gi?a 4 nh?m t?nh c?ch n?y.</p></div></div><div class="disc-card-grid">' +
      discSummaryCard("D", "Th?ng L?nh", "DOMINANCE", "Quy?t ?o?n, m?nh m?, h??ng ??n k?t qu?. Lu?n d?n ??u v? kh?ng ng?i th? th?ch.", "13%") +
      discSummaryCard("I", "?nh H??ng", "INFLUENCE", "Nhi?t t?nh, ho?t b?t, truy?n c?m h?ng. K?t n?i m?i ng??i v? t?o n?ng l??ng t?ch c?c.", "28%") +
      discSummaryCard("S", "?n ??nh", "STEADINESS", "Ki?n nh?n, ??ng tin, quan t?m ng??i kh?c. G?n k?t ??i nh?m v? duy tr? s? h?i h?a.", "47%") +
      discSummaryCard("C", "C?n Th?n", "CONSCIENTIOUSNESS", "Ch?nh x?c, t? m?, c? h? th?ng. ??m b?o ch?t l??ng v? tu?n th? ti?u chu?n cao.", "12%") +
      '</div></div></section>' +
      '<section class="section"><div class="container"><div class="section-header"><div style="width:100%"><div class="eyebrow">L?i ?ch khi l?m b?i test DISC</div></div></div><div class="benefit-grid">' +
      infoCard("01", "Nh?m DISC n?i tr?i", "Bi?t nh?m n?o ?ang l? xu h??ng h?nh vi n?i b?t nh?t c?a b?n trong 4 nh?m D, I, S, C.") +
      infoCard("02", "?i?m m?nh t? nhi?n", "Nh?n r? nh?ng ?i?m b?n c? th? ph?t huy trong c?ng vi?c, ph?i h?p v? giao ti?p.") +
      infoCard("03", "?i?m c?n c?n b?ng", "Nh?n ra nh?ng ?i?u d? t?o l?ch nh?p ho?c g?y kh? kh?n khi l?m vi?c v?i ng??i kh?c.") +
      infoCard("04", "G?i ? ph?t tri?n", "C? th?m ??nh h??ng ?? ?i?u ch?nh phong c?ch c?a m?nh theo h??ng hi?u qu? h?n.") +
      '</div></div></section>' +
      '</main>'
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
    const title = mode === "login" ? "ÄÄƒng nháº­p" : "ÄÄƒng kÃ½ tÃ i khoáº£n";
    const subtitle =
      mode === "login"
        ? "ÄÄƒng nháº­p Ä‘á»ƒ xem lá»‹ch sá»­ bÃ i test, nháº­n káº¿t quáº£ vÃ  cáº­p nháº­t email náº¿u cáº§n."
        : "ÄÄƒng kÃ½ ngay táº¡i trang chá»§ Ä‘á»ƒ lÆ°u há»“ sÆ¡, Ä‘á»“ng bá»™ lá»‹ch sá»­ bÃ i test vÃ  nháº­n káº¿t quáº£ qua email.";
    const hasPendingComplete = isPendingComplete();

    return (
      '<main class="type-page"><div class="container"><section class="panel section-card"><div class="eyebrow">' +
      (mode === "login" ? "TÃ i khoáº£n Ä‘Ã£ cÃ³" : "Táº¡o tÃ i khoáº£n má»›i") +
      '</div><h2 class="section-title">' +
      title +
      '</h2><p class="section-copy">' +
      subtitle +
      (hasPendingComplete
        ? " Báº¡n Ä‘ang cÃ³ má»™t bÃ i test Ä‘Ã£ hoÃ n thÃ nh vÃ  sáº½ Ä‘Æ°á»£c gá»­i Ä‘i ngay sau khi xÃ¡c thá»±c thÃ nh cÃ´ng."
        : "") +
      '</p><form id="' +
      mode +
      '-form" class="form-grid" style="margin-top:20px">' +
      (mode === "register"
        ? '<div class="field"><label class="label">Há» vÃ  tÃªn</label><input class="input" name="full_name" required></div><div class="field"><label class="label">Sá»‘ Ä‘iá»‡n thoáº¡i</label><input class="input" name="phone"></div>'
        : "") +
      '<div class="field"><label class="label">Email</label><input class="input" name="email" type="email" required></div><div class="field"><label class="label">Máº­t kháº©u</label><input class="input" name="password" type="password" required></div><div class="field full"><button class="btn btn-primary" type="submit">' +
      (mode === "login" ? "ÄÄƒng nháº­p" : "ÄÄƒng kÃ½ vÃ  tiáº¿p tá»¥c") +
      '</button></div></form><div class="card-actions" style="margin-top:12px">' +
      (mode === "login"
        ? '<a class="btn btn-ghost" href="#/register">ChÆ°a cÃ³ tÃ i khoáº£n? ÄÄƒng kÃ½</a>'
        : '<a class="btn btn-ghost" href="#/login">ÄÃ£ cÃ³ tÃ i khoáº£n? ÄÄƒng nháº­p</a>') +
      '</div></section></div></main>'
    );
  }

  function renderQuiz(environmentKey, stepText) {
    const bank = getQuestionBank(environmentKey);
    const questions = getQuestionList(bank.key);
    const pending = ensurePendingSession(bank.key);
    const step = Math.max(1, Math.min(questions.length || 1, Number(stepText || 1)));
    const question = questions[step - 1];
    const response = getPendingResponse(question.id, bank.key) || { most: null, least: null };
    const isReady = response.most && response.least;
    const accordionOpen = sessionStorage.getItem("disc_guide_open") !== "0";
    const progress = questions.length ? Math.round((step / questions.length) * 100) : 0;

    return (
      '<main class="quiz-page"><div class="container"><a class="back-link" href="#/">&larr; Quay l?i</a><section class="accordion"><button class="accordion-head" data-action="toggle-guide"><span>H??ng d?n th?c hi?n</span><span>' +
      (accordionOpen ? "&#8963;" : "&#8964;") +
      '</span></button><div class="accordion-body ' +
      (accordionOpen ? "" : "hidden") +
      '"><p>B?i ??nh gi? n?y thu?c m?i tr??ng <strong>' +
      escapeHtml(bank.label) +
      '</strong> v? g?m ' +
      questions.length +
      ' c?u h?i, m?i c?u c? 4 m? t? kh?c nhau.</p><ul><li>H?y ??c k? t?t c? m? t?</li><li>M?i c?u ch?n 1 m? t? ?gi?ng b?n nh?t? v? 1 m? t? ?kh?c b?n nh?t?</li></ul><p>Kh?ng c? ??p ?n ??ng hay sai. H?y ch?n c?ch b?n th??ng th? hi?n nh?t trong th?c t? ?? k?t qu? ph?n ?nh ??ng con ng??i b?n.</p></div></section><section class="question-wrap quiz-no-reveal"><div class="quiz-head"><div><div class="eyebrow">' +
      escapeHtml(bank.label) +
      '</div><h1 class="quiz-title">B?i tr?c nghi?m DISC</h1></div><div class="quiz-progress-text">' +
      step +
      '/' +
      questions.length +
      '</div><div class="progress-track"><span style="width:' +
      progress +
      '%"></span></div></div><div class="quiz-table-head"><div>M? t?</div><div>Kh?c nh?t</div><div>Gi?ng nh?t</div></div><div class="quiz-body">' +
      question.items.map(function (item) {
        return '<div class="quiz-row"><div class="quiz-row-title">' +
          escapeHtml(item.text) +
          '</div><button class="vote-btn ' +
          (response.least === item.id ? 'active-least' : '') +
          '" data-action="pick-choice" data-environment="' +
          bank.key +
          '" data-question="' +
          question.id +
          '" data-mode="least" data-item="' +
          item.id +
          '">&#128078;</button><button class="vote-btn ' +
          (response.most === item.id ? 'active-most' : '') +
          '" data-action="pick-choice" data-environment="' +
          bank.key +
          '" data-question="' +
          question.id +
          '" data-mode="most" data-item="' +
          item.id +
          '">&#128077;</button></div>';
      }).join('') +
      '</div><div class="quiz-footer">' +
      (step > 1
        ? '<a class="btn btn-secondary" href="#' + getEnvironmentRoute(bank.key, step - 1) + '">&larr; C?u tr??c</a>'
        : '<span></span>') +
      (step < questions.length
        ? '<a class="btn btn-primary ' +
          (isReady ? '' : 'disabled') +
          '" ' +
          (isReady ? 'href="#' + getEnvironmentRoute(bank.key, step + 1) + '"' : '') +
          '>C?u sau &rarr;</a>'
        : '<button class="btn btn-primary" data-action="complete-pending" data-environment="' +
          bank.key +
          '" ' +
          (isReady ? '' : 'disabled') +
          '>Nh?n k?t qu?</button>') +
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
      '<main class="result-page result-page-v2"><div class="container"><section class="result-summary-hero reveal-up"><div class="result-summary-main"><div class="eyebrow">Kiểu tính cách chính của bạn</div><div class="result-summary-title-row"><div class="result-summary-icon" style="background:' +
      primary.color +
      '">' +
      primary.icon +
      '</div><div><h1 class="result-summary-title">' +
      escapeHtml(primary.shortName) +
      '</h1><p class="result-summary-english">' +
      escapeHtml(primary.english) +
      '</p></div></div><p class="result-summary-line">' +
      escapeHtml(primary.heroLine) +
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
      resultTabButton("sales", "Bán Hàng", activeTab) +
      '</div><div class="result-tab-content">' +
      renderResultTabContent(activeTab, detail, primary, secondary, combo, sortedScores) +
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

  function renderResultTabContent(activeTab, detail, primary, secondary, combo, sortedScores) {
    if (activeTab === "strengths") {
      return (
        '<section class="result-tab-panel"><div class="result-list-block"><h3 class="result-block-title good">Điểm mạnh nổi bật</h3>' +
        renderListRows(primary.strengths, "good") +
        '</div><div class="result-list-block"><h3 class="result-block-title warn">Điểm cần phát triển</h3>' +
        renderListRows(primary.growth, "warn") +
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
        escapeHtml(primary.communicationStyle) +
        '</p></div><div class="result-copy-block"><h3 class="result-block-title">Cách giao tiếp hiệu quả với bạn</h3>' +
        renderArrowRows(primary.communicationTips) +
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
        '<section class="result-tab-panel"><div class="result-list-block"><h3 class="result-block-title good">Điểm mạnh trong bán hàng</h3>' +
        renderListRows(primary.salesStrengths, "good") +
        '</div><div class="result-list-block"><h3 class="result-block-title warn">Điểm cần chú ý</h3>' +
        renderListRows(primary.salesCautions, "warn") +
        '</div><div class="result-advice-bar"><strong>Lời khuyên:</strong> ' +
        escapeHtml(primary.salesAdvice) +
        "</div></section>"
      );
    }

    return (
      '<section class="result-tab-panel"><div class="result-copy-block"><h3 class="result-block-title">Nhận xét tổng quan</h3><p class="type-copy">Kiểu ' +
      escapeHtml(primary.english + " (" + primary.shortName + ")") +
      ": " +
      escapeHtml(primary.overview) +
      " Kiểu phụ của bạn là " +
      escapeHtml(secondary.shortName) +
      ".</p></div><div class=\"result-copy-block\"><h3 class=\"result-block-title\">Phong cách làm việc</h3><p class=\"type-copy\">" +
      escapeHtml(primary.workStyle) +
      '</p></div><div class="result-two-col"><div class="result-copy-block"><h3 class="result-block-title">Điều thúc đẩy bạn</h3>' +
      renderMiniPills(primary.motivators, "good") +
      '</div><div class="result-copy-block"><h3 class="result-block-title">Điều bạn lo ngại</h3>' +
      renderMiniPills(primary.concerns, "warn") +
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
      return '<main class="type-page"><div class="container"><section class="panel section-card"><h2 class="section-title">Äang táº£i há»“ sÆ¡...</h2></section></div></main>';
    }

    return (
      '<main class="type-page"><div class="container"><div class="result-layout"><aside class="panel section-card"><div class="eyebrow">Há»“ sÆ¡</div><h3>' +
      escapeHtml((state.auth.user && state.auth.user.full_name) || 'NgÆ°á»i dÃ¹ng') +
      '</h3><p class="card-copy">' +
      escapeHtml((state.auth.user && state.auth.user.email) || '') +
      '</p><div class="card-actions" style="margin-top:12px"><a class="btn btn-ghost" href="#/profile">BÃ i kiá»ƒm tra</a><button class="btn btn-ghost" data-action="logout">ÄÄƒng xuáº¥t</button></div></aside><section class="panel section-card"><div class="section-header"><div><div class="eyebrow">Há»“ sÆ¡ cÃ¡ nhÃ¢n</div><h2 class="section-title">BÃ i tráº¯c nghiá»‡m Ä‘Ã£ lÃ m</h2></div></div>' +
      (history.items && history.items.length
        ? history.items
            .map(function (item) {
              const resultVisible =
                item.result_visible_to_user === true ||
                item.result_visible_to_user === "TRUE" ||
                item.result_visible_to_user === "true" ||
                item.email_status === 'sent';
              const locked = !resultVisible;
              const comboTitle =
                (RESULT_COMBOS[item.disc_code] && RESULT_COMBOS[item.disc_code][0]) ||
                item.result_title ||
                'Äang chá» káº¿t quáº£';
              const status = item.email_status_text || (item.email_status === 'sent' ? 'ÄÃ£ gá»­i káº¿t quáº£' : 'Sai thÃ´ng tin ngÆ°á»i nháº­n');
              return (
                '<article class="share-card" style="margin-top:16px"><div class="header-actions"><strong>' +
                escapeHtml((item.disc_code || '--') + ' - ' + comboTitle) +
                '</strong>' +
                (locked
                  ? '<span class="small-note" style="color:#ef4444">' + escapeHtml(status) + '</span>'
                  : '<a class="btn btn-secondary" href="#/result/' + item.assessment_id + '">Xem chi tiáº¿t</a>') +
                '</div><div class="card-copy" style="margin:12px 0">' +
                escapeHtml((item.environment_label ? item.environment_label + " • " : "") + (item.submitted_at_text || '')) +
                '</div><div class="card-actions">' +
                (locked
                  ? '<form class="inline-email-form" data-action="update-email" data-assessment="' + item.assessment_id + '"><input class="input" name="email" type="email" placeholder="Nháº­p láº¡i email Ä‘Ãºng" required style="min-width:280px"><button class="btn btn-primary" type="submit">Cáº­p nháº­t Ä‘á»ƒ nháº­n káº¿t quáº£</button></form>'
                  : '<span class="small-note">Email Ä‘Ã£ gá»­i thÃ nh cÃ´ng. Káº¿t quáº£ Ä‘Ã£ Ä‘Æ°á»£c má»Ÿ.</span>') +
                '</div></article>'
              );
            })
            .join('')
        : '<div class="empty-state">Báº¡n chÆ°a cÃ³ bÃ i test nÃ o Ä‘Æ°á»£c lÆ°u.</div>') +
      '</section></div></div></main>'
    );
  }

  function renderRequireLogin() {
    return '<main class="type-page"><div class="container"><section class="panel section-card"><div class="eyebrow">Cáº§n Ä‘Äƒng nháº­p</div><h2 class="section-title">Vui lÃ²ng Ä‘Äƒng nháº­p Ä‘á»ƒ tiáº¿p tá»¥c.</h2><div class="card-actions"><a class="btn btn-primary" href="#/login">ÄÄƒng nháº­p</a><a class="btn btn-secondary" href="#/register">ÄÄƒng kÃ½</a></div></section></div></main>';
  }

  function renderAdminPage() {
    if (!state.auth) return renderRequireLogin();
    if (!state.auth.user || state.auth.user.role !== 'admin') {
      return '<main class="type-page"><div class="container"><section class="panel section-card"><div class="eyebrow">KhÃ´ng cÃ³ quyá»n</div><h2 class="section-title">Chá»‰ admin má»›i Ä‘Æ°á»£c xem bÃ¡o cÃ¡o.</h2></section></div></main>';
    }
    const dashboard = state.routeData.admin;
    if (!dashboard) {
      loadAdminDashboard();
      return '<main class="type-page"><div class="container"><section class="panel section-card"><h2 class="section-title">Äang táº£i dashboard...</h2></section></div></main>';
    }

    return (
      '<main class="type-page"><div class="container"><section class="panel section-card"><div class="section-header"><div><div class="eyebrow">BÃ¡o cÃ¡o admin</div><h2 class="section-title">HÃ´m nay cÃ³ bao nhiÃªu ngÆ°á»i Ä‘Ã£ lÃ m bÃ i test, há» lÃ  ai?</h2></div></div><div class="metric-grid">' +
      metricCard(String(dashboard.today_count || 0), 'Sá»‘ bÃ i test hÃ´m nay') +
      metricCard(String(dashboard.email_sent_count || 0), 'Email gá»­i thÃ nh cÃ´ng') +
      metricCard(String(dashboard.email_failed_count || 0), 'Email lá»—i / cáº§n cáº­p nháº­t') +
      '</div><div class="section-header" style="margin-top:20px"><div><div class="eyebrow">Danh sÃ¡ch gáº§n Ä‘Ã¢y</div></div></div>' +
      ((dashboard.recent || []).length
        ? dashboard.recent.map(function (item) {
            return (
              '<article class="share-card" style="margin-top:14px"><div class="header-actions"><strong>' +
              escapeHtml(item.full_name || '(Ch?a c? t?n)') +
              '</strong><span class="small-note">' +
              escapeHtml(item.disc_code || '--') +
              '</span></div><div class="card-copy">' +
              escapeHtml((item.email || '') + ' â€¢ ' + (item.submitted_at_text || '')) +
              '</div><div class="chip-row" style="margin-top:12px"><span class="btn btn-ghost">Mail: ' +
              escapeHtml(item.email_status || '') +
              '</span><span class="btn btn-ghost">Visible: ' +
              (item.result_visible_to_user ? 'yes' : 'no') +
              '</span><span class="btn btn-ghost">' +
              escapeHtml(item.environment_label || 'Legacy') +
              '</span></div></article>'
            );
          }).join('')
        : '<div class="empty-state">ChÆ°a cÃ³ dá»¯ liá»‡u bÃ¡o cÃ¡o.</div>') +
      '</section></div></main>'
    );
  }

  function renderDiscHub() {
    return (
      '<main class="type-page"><div class="container"><section class="panel section-card"><div class="section-header"><div><div class="eyebrow">KhÃ¡m phÃ¡ 4 nhÃ³m</div><h2 class="section-title">Chá»n nhÃ³m DISC báº¡n muá»‘n xem chi tiáº¿t.</h2></div><p class="section-copy">Tá»« trang nÃ y, ngÆ°á»i dÃ¹ng cÃ³ thá»ƒ Ä‘i vÃ o Ä‘áº§y Ä‘á»§ 4 nhÃ³m tÃ­nh cÃ¡ch D, I, S, C thay vÃ¬ chá»‰ má»™t trang mÃ´ táº£ duy nháº¥t.</p></div><div class="type-grid">' +
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
            '">Xem nhÃ³m ' +
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
      return '<main class="type-page"><div class="container"><section class="panel section-card"><h2 class="section-title">KhÃ´ng tÃ¬m tháº¥y nhÃ³m DISC.</h2></section></div></main>';
    }
    return (
      '<main class="type-page"><div class="container"><a class="back-link" href="#/">&larr; Quay láº¡i</a><section class="result-hero"><div><div class="eyebrow">' +
      escapeHtml(style.nameVi) +
      '</div><h1 class="combo-code" style="color:' +
      style.color +
      '">' +
      escapeHtml(style.fullName) +
      '</h1><p class="combo-subtitle">' +
      escapeHtml(style.description) +
      '</p></div><div class="result-illustration"><div class="figure"></div></div></section><div class="article-grid">' +
      articleCard('Äáº·c Ä‘iá»ƒm ná»•i báº­t', style.highlights) +
      articleCard('Äiá»ƒm máº¡nh', style.strengths) +
      articleCard('Äiá»ƒm cáº§n cÃ¢n báº±ng', style.weaknesses) +
      articleCard('Phong cÃ¡ch lÃ m viá»‡c', [style.workStyle]) +
      articleCard('Nghá» nghiá»‡p phÃ¹ há»£p', style.career) +
      articleCard('Lá»i khuyÃªn phÃ¡t triá»ƒn', [style.advice]) +
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
    if (value >= 6.2) return "Ráº¥t cao";
    if (value >= 3.2) return "Trung bÃ¬nh";
    return "Tháº¥p";
  }

  function emotionNeed(key) {
    return {
      D: "Ä‘Æ°á»£c lÃ m chá»§ tÃ¬nh huá»‘ng vÃ  tiáº¿n vá» Ä‘Ã­ch nhanh",
      I: "Ä‘Æ°á»£c káº¿t ná»‘i, ghi nháº­n vÃ  táº¡o áº£nh hÆ°á»Ÿng tÃ­ch cá»±c",
      S: "giá»¯ sá»± hÃ i hÃ²a, á»•n Ä‘á»‹nh vÃ  cáº£m giÃ¡c an toÃ n",
      C: "Ä‘áº£m báº£o tÃ­nh Ä‘Ãºng Ä‘áº¯n, logic vÃ  tiÃªu chuáº©n rÃµ rÃ ng",
    }[key];
  }

  function goalText(key) {
    return {
      D: "Ä‘áº¡t káº¿t quáº£, dáº«n dáº¯t vÃ  táº¡o chuyá»ƒn Ä‘á»™ng rÃµ rÃ ng",
      I: "káº¿t ná»‘i, truyá»n Ä‘á»™ng lá»±c vÃ  kÃ©o má»i ngÆ°á»i cÃ¹ng nháº­p cuá»™c",
      S: "duy trÃ¬ sá»± á»•n Ä‘á»‹nh, Ä‘Ã¡ng tin vÃ  há»— trá»£ táº­p thá»ƒ Ä‘i Ä‘Æ°á»ng dÃ i",
      C: "lÃ m Ä‘Ãºng, lÃ m cháº¯c vÃ  giá»¯ cháº¥t lÆ°á»£ng á»Ÿ má»©c cao",
    }[key];
  }

  function evaluationText(key) {
    return {
      D: "Báº¡n thÆ°á»ng Ä‘Ã¡nh giÃ¡ cao ngÆ°á»i chá»§ Ä‘á»™ng, nhanh nháº¡y, biáº¿t nháº­n trÃ¡ch nhiá»‡m vÃ  khÃ´ng vÃ²ng vo.",
      I: "Báº¡n bá»‹ thu hÃºt bá»Ÿi nhá»¯ng ngÆ°á»i cÃ³ nÄƒng lÆ°á»£ng, giao tiáº¿p cuá»‘n hÃºt, biáº¿t lan tá»a tinh tháº§n tÃ­ch cá»±c.",
      S: "Báº¡n Ä‘Ã¡nh giÃ¡ cao ngÆ°á»i chÃ¢n thÃ nh, bá»n bá»‰, Ä‘Ã¡ng tin vÃ  biáº¿t nghÄ© cho táº­p thá»ƒ.",
      C: "Báº¡n tin tÆ°á»Ÿng hÆ¡n vÃ o ngÆ°á»i cÃ³ logic, cáº©n tháº­n, Ä‘Ãºng háº¹n vÃ  tÃ´n trá»ng tiÃªu chuáº©n.",
    }[key];
  }

  function influenceText(primaryKey, secondaryKey) {
    const primaryText = {
      D: "sá»± tháº³ng tháº¯n, Ä‘á»‹nh hÆ°á»›ng rÃµ vÃ  nhá»‹p hÃ nh Ä‘á»™ng máº¡nh",
      I: "nÄƒng lÆ°á»£ng tÃ­ch cá»±c, sá»± lÃ´i cuá»‘n vÃ  kháº£ nÄƒng káº¿t ná»‘i tá»± nhiÃªn",
      S: "sá»± á»•n Ä‘á»‹nh, chÃ¢n thÃ nh vÃ  cáº£m giÃ¡c dá»… chá»‹u khi phá»‘i há»£p",
      C: "láº­p luáº­n cháº·t cháº½, sá»± chuáº©n xÃ¡c vÃ  cáº£m giÃ¡c Ä‘Ã¡ng tin vá» chuyÃªn mÃ´n",
    }[primaryKey];
    const secondaryText = {
      D: "quyáº¿t Ä‘oÃ¡n hÆ¡n khi cáº§n chá»‘t háº¡",
      I: "má»m hÆ¡n nhá» kháº£ nÄƒng táº¡o thiá»‡n cáº£m",
      S: "Ãªm hÆ¡n nhá» sá»± kiÃªn nháº«n vÃ  á»•n Ä‘á»‹nh",
      C: "thuyáº¿t phá»¥c hÆ¡n nhá» lÃ½ láº½ vÃ  cáº¥u trÃºc rÃµ",
    }[secondaryKey];
    return "Báº¡n thÆ°á»ng áº£nh hÆ°á»Ÿng ngÆ°á»i khÃ¡c báº±ng " + primaryText + ", vÃ  Ä‘iá»u Ä‘Ã³ trá»Ÿ nÃªn " + secondaryText + ".";
  }

  function fearText(primaryKey, secondaryKey) {
    const primaryFear = {
      D: "bá»‹ cháº­m nhá»‹p, máº¥t quyá»n chá»§ Ä‘á»™ng hoáº·c khÃ´ng cháº¡m tá»›i má»¥c tiÃªu",
      I: "bá»‹ phá»›t lá», bá»‹ tÃ¡ch khá»i táº­p thá»ƒ hoáº·c khÃ´ng cÃ²n sá»©c áº£nh hÆ°á»Ÿng",
      S: "xung Ä‘á»™t kÃ©o dÃ i, thay Ä‘á»•i Ä‘á»™t ngá»™t vÃ  cáº£m giÃ¡c máº¥t an toÃ n",
      C: "sai sÃ³t, mÆ¡ há»“, thiáº¿u chuáº©n hoáº·c bá»‹ buá»™c quyáº¿t khi chÆ°a Ä‘á»§ dá»¯ liá»‡u",
    }[primaryKey];
    const secondaryFear = {
      D: " Äiá»u nÃ y lÃ m báº¡n cÃ ng khÃ³ cháº¥p nháº­n sá»± trÃ¬ trá»‡.",
      I: " Äiá»u nÃ y khiáº¿n báº¡n nháº¡y hÆ¡n vá»›i pháº£n á»©ng cá»§a ngÆ°á»i xung quanh.",
      S: " Äiá»u nÃ y khiáº¿n báº¡n muá»‘n giá»¯ nhá»‹p an toÃ n nhiá»u hÆ¡n.",
      C: " Äiá»u nÃ y lÃ m báº¡n cÃ³ xu hÆ°á»›ng tá»± kiá»ƒm tra láº¡i má»i thá»© ká»¹ hÆ¡n.",
    }[secondaryKey];
    return "Ná»—i sá»£ cá»‘t lÃµi thÆ°á»ng lÃ  " + primaryFear + "." + secondaryFear;
  }

  function pressureFlavor(key) {
    return {
      D: "dá»… bá»™c phÃ¡t trá»±c diá»‡n hÆ¡n",
      I: "dá»… biá»ƒu lá»™ cáº£m xÃºc rÃµ hÆ¡n",
      S: "thÆ°á»ng cháº­m láº¡i vÃ  thu mÃ¬nh hÆ¡n",
      C: "thÆ°á»ng trá»Ÿ nÃªn kháº¯t khe vÃ  kiá»ƒm tra ká»¹ hÆ¡n",
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
          const mostItem =
            question &&
            question.items.find(function (item) {
              return item.id === response.most;
            });
          const leastItem =
            question &&
            question.items.find(function (item) {
              return item.id === response.least;
            });
          return {
            questionId: response.questionId,
            most: response.most,
            least: response.least,
            most_disc: mostItem ? mostItem.disc : "",
            least_disc: leastItem ? leastItem.disc : "",
          };
        }),
      });
      setPending(null);
      state.routeData.history = null;
      if (result.result_visible_to_user) {
        navigate("/result/" + result.assessment_id);
      } else {
        pushNotice("info", "Há»‡ thá»‘ng Ä‘Ã£ ghi nháº­n bÃ i test, nhÆ°ng email chÆ°a gá»­i thÃ nh cÃ´ng. VÃ o Há»“ sÆ¡ Ä‘á»ƒ cáº­p nháº­t email.");
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
          button.dataset.mode,
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
        pushNotice("info", "ÄÃ£ Ä‘Äƒng xuáº¥t.");
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
          pushNotice("info", "ÄÄƒng nháº­p thÃ nh cÃ´ng.");
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
          pushNotice("info", "ÄÄƒng kÃ½ thÃ nh cÃ´ng.");
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
          pushNotice("info", "ÄÃ£ cáº­p nháº­t email vÃ  gá»­i láº¡i káº¿t quáº£.");
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
          button.textContent = "ÄÃ£ sao chÃ©p";
          setTimeout(function () {
            button.textContent = "Chia s?";
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

