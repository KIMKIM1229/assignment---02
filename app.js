const items = [
  {
    title: "下犬式",
    level: "中階",
    benefits: "伸展脊椎、腿後肌群，強化肩膀、腕部力量",
    caution: "有肩膀、脊椎、腿部傷痛者應謹慎練習",
    practiceNote:
      "腿部保持平衡，慢慢放開，避免強迫雙腿完全伸直，根據自己的靈活度進行調整",
    category: "中階",
    type: "拉伸",
    bodypart: ["腿部", "背部", "肩部"],
    tags: ["拉伸", "腿部", "背部", "肩部"],
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1066259462-665f07385f296.jpg?crop=1.00xw:0.755xh;0,0&resize=1200:*",
    videoUrl: "https://www.youtube.com/watch?v=YwFOL6vFfhE",
  },
  {
    title: "山式",
    level: "初階",
    benefits: "改善姿勢、減少背部疼痛",
    caution: "坐骨神經痛、或骶骨有病變的人謹慎練習",
    practiceNote:
      "保持全身放鬆，注意腳跟與腳尖對齊，避免過度緊張或脊椎彎曲，專注於穩定和平衡",
    category: "初階",
    type: "拉伸",
    bodypart: ["腿部", "臀腿肌"],
    tags: ["拉伸", "腿部", "臀腿肌"],
    imageUrl:
      "https://www.myprotein.cn/images?url=https://blogscdn.thehut.net/app/uploads/sites/496/2020/09/iStock-664637374opt_blog_1594303946_1599036799.jpg&format=webp&auto=avif&width=750&height=500&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=oZPIr7HTmtc",
  },
  {
    title: "戰士二式",
    level: "中階",
    benefits: "強化腿部、提升穩定性",
    caution: "膝蓋問題請注意角度",
    practiceNote:
      "保持膝蓋與腳尖對齊，保持穩定，避免過度彎曲膝蓋，確保雙腳位置穩定，呼吸平穩",
    category: "中階",
    type: "強化",
    bodypart: ["腿部"],
    tags: ["強化", "腿部", "核心"],
    imageUrl:
      "https://im.marieclaire.com.tw/s1200c675h100b0/assets/mc/202405/663B516B507C21715163499.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=gIWl8Ptc3Po",
  },
  {
    title: "樹式",
    level: "初階",
    benefits: "提升平衡感、強化腿部、集中注意力",
    caution: "避免站不穩時跌倒，保持穩定性",
    practiceNote:
      "保持雙腳穩定，將一腳放在另一腳的大腿內側，避免膝蓋過度彎曲，專注於呼吸和平衡",
    category: "初階",
    type: "平衡",
    bodypart: ["腿部"],
    tags: ["平衡", "集中", "腿部"],
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/young-woman-practicing-yoga-tree-pose-vrikshasana-royalty-free-image-1692262674.jpg?crop=1xw:1xh;center,top&resize=980:*",
    videoUrl: "https://www.youtube.com/watch?v=B-YlXgKoF5s",
  },
  {
    title: "眼鏡蛇式",
    level: "初階",
    benefits: "強化脊椎、舒緩背部痛，增加脊椎靈活性",
    caution: "避免腰椎受傷者進行過度彎曲，練習時保持脊椎穩定",
    practiceNote:
      "練習時保持背部伸展，胸部打開，避免過度使用腰部力量，專注於脊椎的伸展",
    category: "初階",
    type: "強化",
    bodypart: ["背部", "脊椎"],
    tags: ["強化", "背部", "脊椎", "柔軟度"],
    imageUrl:
      "https://sportsplanetmag-aws.hmgcdn.com/public/article/atl_20190325161148_131.JPG",
    videoUrl: "https://www.youtube.com/watch?v=uom1GB5uCPE",
  },
  {
    title: "嬰兒式",
    level: "初階",
    benefits: "有助於放鬆脊椎，舒緩背部和頸部壓力，增進身心平衡",
    caution: "如果有膝蓋或臀部傷痛，請避免過度屈膝",
    practiceNote:
      "練習時放鬆全身，讓額頭輕輕接觸地面，呼吸深長，專注於釋放緊張",
    category: "初階",
    type: "放鬆",
    bodypart: ["脊椎", "背部"],
    tags: ["放鬆", "脊椎", "背部"],
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:873/format:webp/0*7CF5CTAZAI6uPjet.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=XBrgOjArdFs",
  },
  {
    title: "駱駝式",
    level: "中階",
    benefits: "增加脊椎的彈性，舒展胸部，改善姿勢，緩解背部和肩膀的緊張",
    caution: "有脊椎、肩膀或頸部問題的人應避免過度後仰",
    practiceNote:
      "保持穩定的呼吸，逐步加深後彎，避免過度拉伸，並注意脊椎的自然弧度",
    category: "中階",
    type: "拉伸",
    bodypart: ["胸部", "背部"],
    tags: ["拉伸", "背部", "胸部"],
    imageUrl:
      "https://helloyogis.com/magazine/wp-content/uploads/sites/2/2022/09/image2-7-1536x839.jpg",
    videoUrl: "https://www.youtube.com/watch?v=KhFCRMFn6cg",
  },
  {
    title: "橋式",
    level: "初階",
    benefits: "強化臀部、腿部和背部肌群，提升脊椎靈活性，改善血液循環",
    caution: "有脊椎、腰部問題的人應謹慎練習，避免過度拉伸",
    practiceNote: "保持雙腳平行，腿部穩定，逐步提高臀部，避免腰部過度承受壓力",
    category: "初階",
    type: "強化",
    bodypart: ["臀部", "腿部", "背部"],
    tags: ["強化", "臀部", "腿部", "背部"],
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/attractive-blonde-woman-in-sports-beige-leggings-royalty-free-image-1644486111.jpg?crop=1.00xw:0.756xh;0,0.125xh&resize=1200:*",
    videoUrl: "https://www.youtube.com/watch?v=D7iqica9coI",
  },
  {
    title: "魚式",
    level: "中階",
    benefits:
      "增強脊柱彈性，改善胸部和肩部的柔韌性，有助於打開胸腔，緩解頸部和背部的緊張",
    caution: "有頸部或脊椎問題的人應謹慎練習，避免過度伸展脖部",
    practiceNote:
      "保持雙腿伸直，腳尖指向天花板，慢慢放下頭部並感覺脊椎拉伸，避免過度施力",
    category: "中階",
    type: "拉伸",
    bodypart: ["脊柱", "胸部", "頸部"],
    tags: ["拉伸", "脊柱", "胸部", "頸部"],
    imageUrl:
      "https://sportsplanetmag-aws.hmgcdn.com/public/article/atl_20190325161054_834.jpg",
    videoUrl: "https://www.youtube.com/watch?v=V2SrE21zY5Y",
  },
  {
    title: "扭轉三角式",
    level: "中階",
    benefits:
      "增強脊柱靈活性，改善消化系統功能，伸展腿部和背部肌肉，有助於平衡體內能量",
    caution:
      "有脊椎、頸部或背部問題的人應避免強力扭轉，進行練習時應保持頸部和脊椎的中立位置",
    practiceNote:
      "保持雙腿伸直，腳尖指向正前方，逐漸轉動上半身，保持骨盆穩定，避免過度扭轉",
    category: "中階",
    type: "拉伸",
    bodypart: ["脊柱", "腿部", "背部"],
    tags: ["拉伸", "脊柱", "腿部", "背部"],
    imageUrl:
      "https://im.marieclaire.com.tw/m800c533h100b0/assets/mc/202408/66B1ECB6D0FBC1722936502.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=HOQHXXUAYks",
  },
  {
    title: "椅子式",
    level: "初階",
    benefits: "增強腿部、臀部和核心肌群的力量，改善姿勢，幫助提升穩定性和平衡",
    caution: "有膝蓋或下背部問題的人應注意膝關節的角度，避免過度彎曲",
    practiceNote:
      "膝蓋應該對齊腳尖，背部保持挺直，臀部向後坐，避免讓膝蓋過度向前延伸",
    category: "初階",
    type: "強化",
    bodypart: ["腿部", "臀部"],
    tags: ["強化", "腿部", "臀部", "核心"],
    imageUrl:
      "https://sportsplanetmag-aws.hmgcdn.com/public/article/atl_20190325161100_179.jpg",
    videoUrl: "https://www.youtube.com/watch?v=lenzTexk1uk",
  },
  {
    title: "展臂式",
    level: "中階",
    benefits: "增強肩部和上背部的靈活性，改善胸部開展，提升身體的穩定性",
    caution: "肩膀受傷者應該避免過度伸展，保持適當的姿勢，避免過度用力",
    practiceNote:
      "保持雙腳穩定，將手臂展開並平行於地面，保持呼吸平穩，避免肩膀過度緊張",
    category: "中階",
    type: "拉伸",
    bodypart: ["胸部", "背部", "肩部"],
    tags: ["拉伸", "肩部", "胸部", "背部"],
    imageUrl:
      "https://as.chdev.tw/web/images/article_data/picture_path/img_77463_c5348da0-32e9-48ad-9c04-bbb1803abd90.jpg",
    videoUrl: "https://www.youtube.com/watch?v=d8u0O1CbXr8",
  },
  {
    title: "前屈式",
    level: "初階",
    benefits: "伸展腿部、背部，改善脊椎靈活性，有助於舒緩壓力，放鬆身心",
    caution: "若有腰部或膝蓋問題，應避免過度前屈，保持姿勢時避免過度用力",
    practiceNote:
      "雙腳保持適當距離，慢慢向前彎曲身體，保持脊椎自然伸展，避免拱背",
    category: "初階",
    type: "拉伸",
    bodypart: ["腿部", "背部", "脊椎"],
    tags: ["拉伸", "腿部", "背部", "脊椎"],
    imageUrl:
      "https://www.myprotein.cn/images?url=https://blogscdn.thehut.net/app/uploads/sites/496/2020/09/iStock-546803996opt_blog_1594304341_1599037620.jpg&format=webp&auto=avif&width=750&height=500&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=ziHqIVfBADA",
  },
  {
    title: "花環式",
    level: "高階",
    benefits: "強化腿部、背部和肩膀，提高脊椎的靈活性，促進血液循環",
    caution: "有肩膀或背部問題的人應避免過度強迫伸展，保持脊椎的自然弧度",
    practiceNote:
      "進入姿勢時，雙腳穩定，肩膀向後拉開，保持脊椎挺直。避免過度用力，保持呼吸均勻",
    category: "高階",
    type: "強化",
    bodypart: ["腿部", "背部", "肩膀"],
    tags: ["強化", "腿部", "背部", "肩膀"],
    imageUrl:
      "https://www.myprotein.cn/images?url=https://blogscdn.thehut.net/app/uploads/sites/496/2020/09/iStock-1203232207opt_blog_1594304416_1599037856.jpg&format=webp&auto=avif&width=750&height=500&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=rD2-EiJqT28",
  },
  {
    title: "平板式",
    level: "中階",
    benefits: "增強核心力量，穩定肩膀，改善脊椎健康，提升身體協調性",
    caution:
      "保持肩膀與手腕對齊，避免臀部上升或下沉。若有手腕或肩膀傷痛，應謹慎練習",
    practiceNote:
      "保持身體一條直線，從頭到腳要均衡用力，避免脊椎下沉或拱起，並專注於呼吸",
    category: "中階",
    type: "強化",
    bodypart: ["肩膀", "背部"],
    tags: ["強化", "核心", "肩膀", "背部"],
    imageUrl:
      "https://today-obs.line-scdn.net/0hwdIq_ozAKEt0CDixqE9XHExeJDpHbjJCVmxgJAQOcHtbJGtPQGl7KFMJcGdQMWYaVG1jK1ZcdS9QPWZNGA/w1200",
    videoUrl: "https://www.youtube.com/watch?v=75WMMqgYcbQ",
  },
  {
    title: "手杖式",
    level: "初階",
    benefits: "增強下背部、脊椎的穩定性，改善姿勢，開展肩部及胸部",
    caution: "若有腰部或脊椎傷害，請在醫生指導下練習，避免過度伸展",
    practiceNote:
      "保持脊椎延伸，胸部向上打開，避免肩膀緊繃，專注於呼吸並保持穩定",
    category: "初階",
    type: "拉伸",
    bodypart: ["背部", "肩部"],
    tags: ["拉伸", "背部", "肩部"],
    imageUrl:
      "https://p0.itc.cn/q_70/images03/20210119/ebcaf2cf14d349c19fb9994a508340f7.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=_vpi1wsuQ1c",
  },
  {
    title: "蛙式",
    level: "中階",
    benefits: "伸展大腿內側，改善髖部靈活性，增加髖關節活動範圍",
    caution: "如果有膝部或髖部傷害，應避免進行此姿勢，或在專業指導下進行練習",
    practiceNote:
      "雙腿屈膝，膝蓋向兩側展開，保持背部直立，避免壓迫膝部，並根據個人靈活度調整角度",
    category: "中階",
    type: "拉伸",
    bodypart: ["大腿", "腹部"],
    tags: ["拉伸", "大腿", "腹部"],
    imageUrl:
      "https://s.yimg.com/ny/api/res/1.2/fbnv6UPkFMzGRpg6yxQgqQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTYwMDtjZj13ZWJw/https://media.zenfs.com/en/ctwant_fashion_656/b307af959524f2878ee14521ed28d956",
    videoUrl: "https://www.youtube.com/watch?v=6Qd9ycfG5c0",
  },
  {
    title: "半鴿式",
    level: "中階",
    benefits:
      "有效伸展髖部、臀部及大腿後側，改善髖關節活動度，釋放緊繃的背部和腿部肌肉",
    caution: "避有膝部或髖部問題的人應避免此姿勢，或者在專業指導下進行練習",
    practiceNote:
      "將一條腿屈膝置於前，另一條腿向後延伸，保持骨盆穩定，避免背部過度彎曲，保持呼吸均勻",
    category: "中階",
    type: "拉伸",
    bodypart: ["臀部", "腹部", "大腿"],
    tags: ["拉伸", "臀部", "腹部", "大腿"],
    imageUrl:
      "https://media.vogue.com.tw/photos/5db7e542c2e36100085af5dc/master/w_1600,c_limit/2018010348835249.jpg",
    videoUrl: "https://www.youtube.com/watch?v=3mY-6KK_-8s",
  },
  {
    title: "穿針式",
    level: "中階",
    benefits:
      "增強肩膀、上背部和胸部的靈活性，伸展脊椎、改善肩膀的活動度，放鬆背部和頸部的緊繃",
    caution: "肩膀或脊椎有傷病者應謹慎練習，避免過度旋轉或強迫脊椎彎曲",
    practiceNote:
      "將一隻手從身體下方伸出，向上拉伸並旋轉上半身，另一隻手放在背部或地板上，保持穩定的呼吸，避免過度扭轉脊椎",
    category: "中階",
    type: "拉伸",
    bodypart: ["脊椎", "背部", "肩部"],
    tags: ["拉伸", "肩部", "背部", "脊椎"],
    imageUrl:
      "https://image.hkhl.hk/f/1024p0/0x0/100/none/c5806355bc62b98632869bc568d9f7a9/images/_2021103015322989092.jpg",
    videoUrl: "https://www.youtube.com/watch?v=eml2jDNe8mc",
  },
  {
    title: "船式",
    level: "初階",
    benefits:
      "強化腹部、腰部、背部和臀部肌肉，提升核心穩定性，改善平衡能力，促進消化",
    caution: "避免背部過度弓起，保持正確姿勢，若有腰部或背部受傷，應謹慎練習",
    practiceNote:
      "雙手可輔助支撐在地面上協助平衡，逐漸練習將雙腳抬離地面，專注收緊核心，保持自然呼吸",
    category: "初階",
    type: "強化",
    bodypart: ["腹部", "背部"],
    tags: ["強化", "腹部", "核心", "背部"],
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/young-attractive-sporty-woman-doing-boat-pose-grey-royalty-free-image-1656298379.jpg?crop=1.00xw:0.756xh;0,0.159xh&resize=1200:*",
    videoUrl: "https://www.youtube.com/watch?v=NH78J_dhO94",
  },
];

let searchKeyword = "";
let selectedCategory = "";
let selectedType = "";
let selectedBodyPart = "";

function extractYouTubeID(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? match[1] : "";
}

function updateList() {
  const list = document.getElementById("poseList");
  list.innerHTML = "";

  const filteredItems = items.filter((item) => {
    const matchKeyword =
      item.title.toLowerCase().includes(searchKeyword) ||
      item.benefits.toLowerCase().includes(searchKeyword) ||
      item.practiceNote?.toLowerCase().includes(searchKeyword) ||
      item.caution?.toLowerCase().includes(searchKeyword);

    const matchCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    const matchType =
      selectedType && selectedType !== "全部"
        ? item.type === selectedType
        : true;
    const matchBodyPart =
      selectedBodyPart && selectedBodyPart !== "全部"
        ? item.tags.includes(selectedBodyPart)
        : true;

    return matchKeyword && matchCategory && matchType && matchBodyPart;
  });

  filteredItems.forEach((item) => {
    const ionItem = document.createElement("ion-item");
    ionItem.innerHTML = `
        <div class="card item-content">
          <div class="item-title">${item.title}</div>
          <div class="item-subtitle">難度：${item.level}</div>
          <div class="item-details">
            效果：${item.benefits}
          </div>
          <div class="caution-details">
            練習時建議：${item.practiceNote}
          </div>
          <div class="caution-details" style="color: red;">
            注意: ${item.caution}
          </div>
          <img src="${item.imageUrl}" alt="${item.title}" />
          <iframe src="https://www.youtube.com/embed/${extractYouTubeID(
            item.videoUrl
          )}" frameborder="0" allowfullscreen></iframe>
          <div class="tag-container">
            <ion-chip color="primary">${item.category}</ion-chip>
            ${item.tags.map((tag) => `<ion-chip>${tag}</ion-chip>`).join("")}
          </div>
        </div>
      `;
    list.appendChild(ionItem);
  });
}

function resetFilters() {
  // Reset all filter values
  searchKeyword = "";
  selectedCategory = "";
  selectedType = "";
  selectedBodyPart = "";

  // Reset UI input values
  document.getElementById("searchBar").value = "";
  document.getElementById("categorySelect").value = "";
  document.getElementById("typeSelect").value = "";
  document.getElementById("bodyPartSelect").value = "";

  // Reset type button UI
  document.querySelectorAll("#typeButtons ion-button").forEach((btn) => {
    btn.setAttribute("fill", "outline");
    btn.removeAttribute("color");
  });

  updateList();
}

async function fetchData() {
  try {
    // 嘗試從 API 請求資料
    let response = await fetch("https://example.com/api/yogaposes");

    if (!response.ok) {
      // 如果 API 回應錯誤（如 404、500 等）
      throw new Error("無法獲取資料，請稍後再試！");
    }

    // 如果成功，解析 JSON 資料
    let data = await response.json();
    return data; // 返回數據給調用者
  } catch (error) {
    // 捕獲錯誤，並顯示提示
    console.error("API 錯誤:", error);
    alert("無法加載資料，請稍後再試。");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateList();

  document.getElementById("searchBar").addEventListener("ionInput", (e) => {
    searchKeyword = e.target.value.toLowerCase();
    updateList();
  });

  document
    .getElementById("categorySelect")
    .addEventListener("ionChange", (e) => {
      selectedCategory = e.target.value;
      updateList();
    });

  document.getElementById("typeSelect").addEventListener("ionChange", (e) => {
    selectedType = e.target.value;
    updateList();
  });

  document
    .getElementById("bodyPartSelect")
    .addEventListener("ionChange", (e) => {
      selectedBodyPart = e.target.value;
      updateList();
    });

  // 重設按鈕
  document
    .getElementById("resetButton")
    .addEventListener("click", resetFilters);

  // 類型按鈕
  document.querySelectorAll("#typeButtons ion-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedType = button.value;
      updateList();

      document.querySelectorAll("#typeButtons ion-button").forEach((btn) => {
        btn.setAttribute("fill", "outline");
        btn.removeAttribute("color");
      });

      button.setAttribute("fill", "solid");
      button.setAttribute("color", "primary");
    });
  });
});
