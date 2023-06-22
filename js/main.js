import {
  ref as dbRef,
  push,
  set,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

import { app, db, storage } from "./firebase.js";
// -------------------------------6/22課題-------------------------------------





// -------------------------------6/22課題-------------------------------------

const customerDbRef = dbRef(db, "customerDb");
const inputRef = $(".option6")[0];

const handleChange = () => {
  const file = $(inputRef).prop("files")[0];
  console.log(file.name);
  console.log(file.type);
  console.log(file.size);
};

const c = $("#canvas")[0];

$(".option6").on("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = async function () {
      $("#img").attr("src", this.src);

      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      console.log(predictions, "tensor");

      c.width = img.width;
      c.height = img.height;
      const context = c.getContext("2d");
      context.drawImage(img, 0, 0, img.width, img.height);
      context.font = "15px Arial";

      console.log("number of detections:", predictions.length);
      for (const p of predictions) {
        if (p.class === "person") {
          context.beginPath();
          context.rect(...p.bbox);
          context.lineWidth = 1;
          context.strokeStyle = "green";
          context.fillStyle = "green";
          context.stroke();
          context.fillText(
            p.score.toFixed(3) + " " + p.class,
            p.bbox[0],
            p.bbox[1] > 10 ? p.bbox[1] - 5 : 10
          );
        }
      }

      handleChange();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

const handleSubmit = async (e) => {
  const dataUrl = c.toDataURL("image/png");
  const imageBlob = dataUrlToBlob(dataUrl);
  const fileName = `${Date.now()}.png`;
  const filePath = `images/${fileName}`;
  const imageRef = storageRef(storage, filePath);

  try {
    const snapshot = await uploadBytes(imageRef, imageBlob);
    console.log("Upload is done");

    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File available at", downloadURL);

    console.log("imakoko2113");
    window.location.href = "easy_result.html";
    return filePath;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

$(".f-submit").on("click", async function (event) {
  if (document.URL.match(/easy_sim.html/)) {
    event.preventDefault();
    let fileInput = $(".option6")[0];
    const file = $(".option6").prop("files")[0];

    let filePath;
    if (fileInput.files.length > 0) {
      filePath = await handleSubmit(file);
    } else {
      window.location.href = "easy_result.html";
      return;
    }

    const msg = {
      option1: $(".option1").val(),
      option2: $(".option2").val(),
      option3: $(".option3").val(),
      option4: $(".option4").val(),
      option5: $(".option5").val(),
      image: filePath,
    };

    console.log(msg);
    const newPostRef = push(customerDbRef);
    set(newPostRef, msg);
  }
});

function dataUrlToBlob(dataUrl) {
  const binaryString = atob(dataUrl.split(",")[1]);
  const mimeType = dataUrl.split(",")[0].split(":")[1].split(";")[0];
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryString.length; i++) {
    intArray[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([intArray], { type: mimeType });
  console.log(blob);
  return blob;
}

// -------------------------------前回まで-------------------------------------

// シミュレーションページを開いたときにLocal storage 保存されていれば反映
// Local storageのvalueと一致するoptionを反映させる
$(window).on("load", function () {
  if (document.URL.match(/easy_sim.html/)) {
    for (let i = 1; i <= 6; i++) {
      const option = "selectedOption" + i;
      const value = localStorage.getItem(option);

      if (i <= 5) {
        // まだ選択していないときはLocal storage内容は反映させない
        if (
          value !== null &&
          value !== "" &&
          value !== "notanswer" &&
          value !== "undefined"
        ) {
          const optionText = $(
            ".option" + i + " option[value='" + value + "']"
          ).text();
          $(".option" + i)
            .val(value)
            .find("option[value='" + value + "']")
            .text(optionText);
          if ($(".btn").hasClass("disable")) {
            $(".btn").addClass("disable");
            $(".btn_hearing").removeClass("disable");
          }
        }
      }
    }
  }
});

// Option2(年代)の関数
function selectBox(start, end) {
  let str = `<option value="notanswer" selected>-</option>`;
  for (let i = start; i < end; i += 10) {
    str += `<option>${i}歳～</option>`;
  }
  return str;
}

// Option2(年代)の処理
$(document).ready(function () {
  const age = selectBox(10, 100);
  $(".era").html(age);
});

// LocalStorageへ保存（Option1-5まで）
$(document).ready(function () {
  if (document.URL.match(/easy_sim.html/)) {
    setInterval(function () {
      for (let i = 1; i < 6; i++) {
        let element = $(".option" + i);
        if (element.length > 0) {
          let selectedOption = element.val();
          if (selectedOption) {
            localStorage.setItem("selectedOption" + i, selectedOption);
          }
        } else {
          console.log(".option" + i + " does not exist.");
        }
        // console.log(localStorage)
      }
    }, 5000); // 5000ミリ秒 = 5秒
  }
});

// 必須の項目が選択されていないとボタンを押せない
// $(".s-form-e-option").change(function () {
//   let flag = false;
//   $(".s-form-e-option").each(function () {
//     let selected = $(this).find("option:selected").val();
//     console.log(selected, "選択個数");

//     if (selected === "notanswer") {
//       flag = true;
//       return false;
//     }
//   });

//   if (flag) {
//     if (!$(".btn").hasClass("disable")) {
//       $(".btn").addClass("disable");
//       $(".btn_hearing").removeClass("disable");
//     }
//   } else {
//     $(".btn_hearing").addClass("disable");
//     $(".btn").removeClass("disable");
//   }
// });

// 写真のプレビュー
function previewFile(inputElement) {
  let fileData = new FileReader();
  fileData.onload = function (e) {
    $(inputElement)
      .closest(".s-form-e-data")
      .find(".pic_preview")
      .attr("src", e.target.result);
  };
  fileData.readAsDataURL(inputElement.files[0]);
}

$(".s-input-lo1 input[type='file']").on("change", function () {
  $(".pic_preview").empty();
  previewFile(this);
  $(".preview_text").css("display", "none");
});

// LocalStorageへ保存（Option6 写真）
// $(".s-input-lo1 input[type='file']").on("change", function () {
//   let reader = new FileReader();

//   reader.onload = function (e) {
//     let dataUrl = e.target.result;
//     localStorage.setItem("selectedOption6", dataUrl);
//   };

//   reader.readAsDataURL(this.files[0]);
// });

// 結果ページを開いたときにLocal storage 保存されていれば反映
// Local storageのvalueと一致するoptionを反映させる
onChildAdded(customerDbRef, async function (data) {
  if (document.URL.match(/easy_result.html/)) {
    const msg = data.val();
    const key = data.key;
    const fileRef = storageRef(storage, msg.image);

    let dataUrl = await getDownloadURL(fileRef);
    if (dataUrl) {
      let newDiv; // Define newDiv here
      try {
        const url = await getDownloadURL(fileRef); // <-- Make sure to add await here
        console.log("URL: ", url);

        // Add a simple test to check if the image URL is valid
        let testImage = new Image();
        testImage.onload = function () {
          console.log("Image loaded successfully");
        };
        testImage.onerror = function () {
          console.error("Error loading image");
        };
        testImage.src = url;

        let img = $("<img />").attr("src", url).css({
          width: "400px",
          height: "300px",
        });
        newDiv = $("<div />"); // <-- This line is changed
        newDiv.append(img);
      } catch (error) {
        console.error(error);
      }
      $(".ai_result").append(newDiv);
    }

    // 診断結果のIF文
    let op1_value = msg.option1;
    let op2_era = msg.option2;
    let op3_value = msg.option3;
    let op4_value = msg.option4;
    let op5_value = msg.option5;

    let lastClinicMapping = {
      "within-3m": "3か月以内",
      "within-6m": "半年以内",
      "within-1y": "1年以内",
      "within-3y": "1～3年以内",
      "more-3y": "それ以上前",
      "not-rem": "覚えていない",
    };

    let brushing_freq = {
      "3td": "1日3回",
      "2td": "1日2回",
      "1td": "1日1回",
      "1t3d": "2-3日に1回",
      notoften: "あまりしない",
    };

    let op5_situ = {
      decay: "虫歯になりやすい",
      tartar: "歯石が付きやすい",
      notsure: "よくわからない",
    };

    let op3_last_clinic = lastClinicMapping[op3_value];
    let op4_brushing_freq = brushing_freq[op4_value];
    let op5_situ_res = op5_situ[op5_value];

    let nickName = "";
    let judge = "";
    if (op1_value === "undefined" || op1_value === null || op1_value === "") {
      nickName = "匿名希望さん";
      console.log(nickName, "ニックネーム1");

      judge = `
				<div class="result_judge">
					<span class="res_name_2">
						あなたは、
					</span>
					<span class="last_clinic">
						最後に歯医者に行ったのは${op3_last_clinic}、
					</span>
					<span class="brushing_freq">
						歯磨き頻度は${op4_brushing_freq}程度です。
				</span>
				</div>
			`;
    } else {
      nickName = op1_value + "さん";
      console.log(nickName, "ニックネーム2");

      judge = `
			<div class="result_judge">
				<span class="res_name_2">
				${nickName}は、
				</span>
				<span class="last_clinic">
					最後に歯医者に行ったのは${op3_last_clinic}、
				</span>
				<span class="brushing_freq">
					歯磨き頻度は${op4_brushing_freq}程度です。
			</span>
			</div>
		`;
    }

    const name_era = `
				<div class="result_name_era">
					<span class="res_name">
						${nickName}
					</span>
					<span class="res_era">
						${op2_era}
					</span>
				</div>
			`;

    let lc = "";
    let bf = "";
    if (op3_last_clinic === "within-3m") {
      lc = 10;
    } else if (op3_last_clinic === "within-6m") {
      lc = 8;
    } else if (op3_last_clinic === "within-1y") {
      lc = 6;
    } else if (op3_last_clinic === "within-3y") {
      lc = 3;
    } else if (op3_last_clinic === "more-3y") {
      lc = 1;
    } else {
      lc = 2;
    }

    if (op4_brushing_freq === "3td") {
      bf = 10;
    } else if (op4_brushing_freq === "2td") {
      bf = 8;
    } else if (op4_brushing_freq === "1td") {
      bf = 6;
    } else if (op4_brushing_freq === "1td3d") {
      bf = 3;
    } else {
      bf = 1;
    }

    let lf_res = lc + bf;
    let lf_judge = "";

    if (lf_res < 15) {
      lf_judge = `
					<div class="lf_judge">
					積極的にオーラルチェックができていますね！フロスや歯間ブラシを併用すると、より虫歯や歯周病などのリスクが下がりますよ。
					</div>
				`;
    } else if (lf_res < 7) {
      lf_judge = `
					<div class="lf_judge">
					口腔環境が悪化している可能性があるので、一度歯科検診を検討してみましょう。
					</div>
				`;
    } else {
      lf_judge = `
					<div class="lf_judge">
					口腔環境が悪化している可能性があります。歯医者恐怖症がある方は、麻酔で眠ったまま治療してくれる歯医者もありますので、ぜひ検討してみてください。
					</div>
				`;
    }

    let o5 = "";
    if ((op5_value === "notsure") | (op5_value === "undefined")) {
    } else {
      o5 = `
				<div class="o5">
				${op5_situ_res}ようなので、悩みにあった歯磨き粉を利用するとよいでしょう。
				</div>
			`;
    }

    console.log(judge);
    $(".jq_res").append(name_era);
    $(".jq_res").append(judge);
    $(".jq_res").append(lf_judge);
    $(".jq_res").append(o5);
  }
});

//テスト用　クリアボタン
$(".clear").on("click", function () {
  localStorage.clear();
  $(".option1").val("");
  $(".option2").html(selectBox(10, 100));
  $(".option3").val("notanswer");
  $(".option4").val("notanswer");
  $(".option5").val("notanswer");
  $(".option6").val("");
  $(".pic_preview").attr("src", "");

  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
});
