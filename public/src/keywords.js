function ajax (src, callback, callbackTwo) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            if (res.msg === "null") {
                window.location.href = "member.html";
            } else {
                if (res.admin === "yes") {
                    callback();
                }
                const newXhr = new XMLHttpRequest();
                newXhr.onreadystatechange = function () {
                    if (newXhr.readyState === 4 && newXhr.status === 200) {
                        const data = JSON.parse(newXhr.responseText);
                        callbackTwo(data);
                    }
                };
                newXhr.open("GET", "api/1.0/keywords");
                newXhr.setRequestHeader("Content-Type", "application/json");
                const accessToken = localStorage.getItem("access_token");
                newXhr.setRequestHeader("Authorization", "bearer " + accessToken);
                newXhr.send();
            }
        }
    };
    xhr.open("GET", src);
    xhr.setRequestHeader("Content-Type", "application/json");
    const accessToken = localStorage.getItem("access_token");
    xhr.setRequestHeader("Authorization", "bearer " + accessToken);
    xhr.send();
}

function ajaxKeywords (src, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            if (res.admin === "yes") {
                const newXhr = new XMLHttpRequest();
                newXhr.onreadystatechange = function () {
                    console.log(newXhr.responseText);
                    const res = JSON.parse(newXhr.responseText);
                    console.log(res);
                    callback(res);
                };
                newXhr.open("POST", "api/1.0/keywords");
                newXhr.setRequestHeader("Content-Type", "application/json");
                const accessToken = localStorage.getItem("access_token");
                newXhr.setRequestHeader("Authorization", "bearer " + accessToken);
                newXhr.send(JSON.stringify(data));
            }
        }
    };
    xhr.open("GET", src);
    xhr.setRequestHeader("Content-Type", "application/json");
    const accessToken = localStorage.getItem("access_token");
    xhr.setRequestHeader("Authorization", "bearer " + accessToken);
    xhr.send(JSON.stringify(data));
}

// 新增輸入keywords欄位
function inputKeywords () {
    const ajaxBox = document.getElementById("ajax");
    const totalBoxes = document.querySelectorAll(".keywords_box");
    const boxesLength = totalBoxes.length;
    const keywordsBox = document.createElement("div");
    keywordsBox.className = "keywords_box";
    // const number = document.createElement("div");
    // number.className = "number";
    // number.innerHTML = `${i + 1}`;
    const topic = document.createElement("input");
    topic.value = `群組${boxesLength + 1}`;
    topic.type = "text";
    topic.className = "topic";
    topic.placeholder = "必填：主題";
    const brackets = document.createElement("div");
    brackets.className = "brackets";
    brackets.innerHTML = "(";
    const keyword1 = document.createElement("input");
    keyword1.type = "text";
    keyword1.className = `keyword${boxesLength + 1}`;
    keyword1.placeholder = "必填：關鍵字";
    const select = document.createElement("select");
    select.className = `symbol${boxesLength + 1}`;
    const option = document.createElement("option");
    option.value = "and";
    option.text = "and";
    const option2 = document.createElement("option");
    option2.value = "or";
    option2.text = "or";
    select.append(option, option2);
    const keyword2 = document.createElement("input");
    keyword2.type = "text";
    keyword2.className = `keyword${boxesLength + 1}`;
    const select2 = document.createElement("select");
    select2.className = `symbol${boxesLength + 1}`;
    const option3 = document.createElement("option");
    option3.value = "and";
    option3.text = "and";
    const option4 = document.createElement("option");
    option4.value = "or";
    option4.text = "or";
    select2.append(option3, option4);
    const keyword3 = document.createElement("input");
    keyword3.type = "text";
    keyword3.className = `keyword${boxesLength + 1}`;
    const brackets2 = document.createElement("div");
    brackets2.className = "brackets";
    brackets2.innerHTML = ")";
    const select3 = document.createElement("select");
    select3.className = `symbol${boxesLength + 1}`;
    select3.id = "symbol";
    const option5 = document.createElement("option");
    option5.value = "and";
    option5.text = "and";
    const option6 = document.createElement("option");
    option6.value = "or";
    option6.text = "or";
    select3.append(option5, option6);
    const brackets3 = document.createElement("div");
    brackets3.className = "brackets";
    brackets3.innerHTML = "(";
    const keyword4 = document.createElement("input");
    keyword4.type = "text";
    keyword4.className = `keyword${boxesLength + 1}`;
    keyword4.placeholder = "請從此填";
    const select4 = document.createElement("select");
    select4.className = `symbol${boxesLength + 1}`;
    const option7 = document.createElement("option");
    option7.value = "and";
    option7.text = "and";
    const option8 = document.createElement("option");
    option8.value = "or";
    option8.text = "or";
    select4.append(option7, option8);
    const keyword5 = document.createElement("input");
    keyword5.type = "text";
    keyword5.className = `keyword${boxesLength + 1}`;
    const select5 = document.createElement("select");
    select5.className = `symbol${boxesLength + 1}`;
    const option9 = document.createElement("option");
    option9.value = "and";
    option9.text = "and";
    const option10 = document.createElement("option");
    option10.value = "or";
    option10.text = "or";
    select5.append(option9, option10);
    const keyword6 = document.createElement("input");
    keyword6.type = "text";
    keyword6.className = `keyword${boxesLength + 1}`;
    const brackets4 = document.createElement("div");
    brackets4.className = "brackets";
    brackets4.innerHTML = ")";
    const addItem = document.createElement("div");
    addItem.className = "add";
    addItem.innerHTML = "<img class=\"icon_add\" src=\"./styles/images/add.png\" title=\"新增\">";
    const deleteItem = document.createElement("div");
    deleteItem.innerHTML = "<img class=\"delete\" src=\"./styles/images/trash.png\" title=\"刪除\">";
    keywordsBox.append(topic, brackets, keyword1, select, keyword2, select2, keyword3, brackets2, select3, brackets3, keyword4, select4, keyword5, select5, keyword6, brackets4, addItem, deleteItem);
    addItem.addEventListener("click", function () {
        inputKeywords();
    });
    deleteItem.addEventListener("click", function () {
        const allDeleteItems = document.querySelectorAll(".delete");
        if (allDeleteItems.length === 1) {
            alert("無法刪除最後一項");
        } else {
            keywordsBox.remove();
        }
    });
    ajaxBox.append(keywordsBox);
}

function view (response) { // DOM
    const keywordsBox = document.getElementById("view_keywords");

    if (response.length === 0) {
        const noResult = document.createElement("div");
        noResult.className = "no_result";
        noResult.innerHTML = "目前無設定";
        keywordsBox.append(noResult);
    }
    for (const i in response) {
        const keywordBox = document.createElement("div");
        keywordBox.className = "view_keyword";
        keywordBox.id = `${response[i].topicId}`;
        const topicBox = document.createElement("div");
        topicBox.className = "view_topic";
        topicBox.innerText = response[i].topicName;
        const keywordList = document.createElement("div");
        keywordList.className = "keyword_list";
        const keywords = response[i].keywords;
        const symbols = response[i].symbols;
        console.log(symbols);
        console.log(symbols.length);
        let symbolsArr = [];
        if (symbols.length === 0) {
            symbolsArr = symbols;
        } else {
            symbolsArr = symbols.split(",");
        }
        const firstArr = (keywords.split("+")[0]).split(",");
        const secondArr = (keywords.split("+")[1]).split(",");

        let firstString = "( ";
        for (const j in firstArr) {
            if (parseInt(j) === (firstArr.length - 1)) {
                firstString += `${firstArr[j]} `;
                firstString += ") ";
                firstString += `${symbolsArr.shift()} `;
                continue;
            }
            firstString += `${firstArr[j]} `;
            firstString += `${symbolsArr.shift()} `;
        }
        // 若secondArr是空的，就不需要顯示在前端
        if (secondArr[0] !== "") {
            let secondString = "( ";
            for (const k in secondArr) {
                if (parseInt(k) === (secondArr.length - 1)) {
                    secondString += `${secondArr[k]} `;
                    secondString += ") ";
                    continue;
                }
                secondString += `${secondArr[k]} `;
                secondString += `${symbolsArr.shift()} `;
            }
            keywordList.innerHTML = firstString + secondString;
        } else {
            keywordList.innerHTML = firstString;
        }
        const remove = document.createElement("div");
        remove.className = "remove";
        remove.innerHTML = `<img id=${response[i].topicId} class="icon_trash" src="./styles/images/trash.png" title="刪除">`;
        keywordBox.append(topicBox, keywordList, remove);
        keywordsBox.append(keywordBox);
    }
    // 刪除按鈕
    const trash = document.querySelectorAll(".icon_trash");
    for (let i = 0; i < trash.length; i++) {
        trash[i].addEventListener("click", function (event) {
            console.log(event.target.id);
            Swal.fire({
                title: "確定刪除?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "刪除",
                cancelButtonText: "取消"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        "刪除成功!"
                    );
                    const parentElement = document.querySelectorAll(".view_keyword");
                    let data = {};
                    for (let j = 0; j < parentElement.length; j++) {
                        if (event.target.id === parentElement[j].id) {
                            data = {
                                topicId: event.target.id
                            };

                            parentElement[j].remove();
                        }
                    }
                    const xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                        }
                    };
                    xhr.open("POST", "api/1.0/deleteKeywords");
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(JSON.stringify(data));
                    if (parentElement.length === 0) {
                        const noResult = document.createElement("div");
                        noResult.className = "no_result";
                        noResult.innerHTML = "目前無設定";
                        keywordsBox.append(noResult);
                    }
                }
            });
        });
    }

    // keywordBox.removeChild(remove);
}

ajax("api/1.0/profile", modifiedKeywords, view);

function modifiedKeywords () {
    const ajaxBox = document.getElementById("ajax");
    const text = document.createElement("div");
    text.id = "text2";
    text.innerHTML = "修改關鍵字：儲存後，會一次修改五組";
    const keywordsTitle = document.createElement("div");
    keywordsTitle.id = "keywords_title";
    const topicText = document.createElement("div");
    topicText.id = "topic_text";
    topicText.innerHTML = "主題：";
    const search = document.createElement("div");
    search.id = "search";
    search.innerHTML = "搜尋關鍵字：";
    const button = document.createElement("button");
    button.id = "button";
    button.innerHTML = "儲存";
    keywordsTitle.append(topicText, search, button);
    ajaxBox.append(text, keywordsTitle);
    inputKeywords();
    // const addItem = document.querySelector(".icon_add");
    // addItem.addEventListener("click", function () {
    //     inputKeywords(2);
    // });

    // 點選按鈕，新增關鍵字
    button.addEventListener("click", function () {
        const topicEl = document.querySelectorAll(".topic");
        let topicCount = 0;
        let totalKeywordsCount = 0;
        const data = [];
        for (let i = 0; i < topicEl.length; i++) {
            const topic = topicEl[i].value;
            let keywordsCount = 0;
            if (topic !== "") {
                topicCount += 1;
            }
            const keywordsEl = document.querySelectorAll(`.keyword${i + 1}`);
            const keywords = [];
            // 每一個主題的關鍵字
            for (let j = 0; j < keywordsEl.length; j++) {
                const keyword = keywordsEl[j].value;
                // if (keyword !== "") {
                keywords.push(keyword);
                // }
            }
            // 每一個主題的符號
            const symbolsEl = document.querySelectorAll(`.symbol${i + 1}`);
            const symbols = [];
            for (let k = 0; k < symbolsEl.length; k++) {
                const symbol = symbolsEl[k].value;
                symbols.push(symbol);
            }

            const firstArr = [keywords[0], keywords[1], keywords[2]];
            const secondArr = [keywords[3], keywords[4], keywords[5]];
            // 有填主題，但第一個關鍵字是空的
            if (topic !== "" && keywords[0] === "") {
                alert("若需設定主題，請於第一個空格內填入一個關鍵字");
                return;
            }
            const newFirst = [];
            const newSecond = [];
            const newSymbols = [];
            // 檢查第一個Array有沒有空的
            for (let a = 0; a < firstArr.length; a++) {
                // 若關鍵字是空的，跳過
                if (firstArr[a] === "") {
                    continue;
                }
                keywordsCount += 1;
                totalKeywordsCount += 1;
                // 關鍵字放到新的array
                newFirst.push(firstArr[a]);
                // 若後面有關鍵字，前面的符號才需要放進去
                if (a >= 1) {
                    newSymbols.push(symbols[a - 1]);
                }
            }
            // 若第二個Array全部是空的，中間的符號不要放
            if (keywords[3] !== "" || keywords[4] !== "" || keywords[5] !== "") {
                newSymbols.push(symbols[2]);
            }
            // 檢查第二個array
            for (let b = 0; b < secondArr.length; b++) {
                // 若關鍵字是空的，跳過
                if (secondArr[b] === "") {
                    continue;
                }
                keywordsCount += 1;
                totalKeywordsCount += 1;
                // 關鍵字放到新的array(有問題)
                newSecond.push(secondArr[b]);
                if (b < secondArr.length - 1) {
                    newSymbols.push(symbols[b + 3]);
                }
            }
            if (topic === "" && keywordsCount !== 0) {
                alert("若需設定主題，請填入主題名稱");
                return;
            }

            const finalArr = [];
            finalArr.push(newFirst, newSecond);
            const obj = { topicNumber: (i + 1), topic: topic, keywords: finalArr, symbols: newSymbols };
            data.push(obj);
        }
        if (topicCount === 0 & totalKeywordsCount === 0) {
            alert("請輸入至少一組主題");
            return;
        }
        const oldKeywords = document.querySelectorAll(".view_keyword");
        const newKeywords = document.querySelectorAll(".keywords_box");
        console.log((oldKeywords.length + newKeywords.length));
        if ((oldKeywords.length + newKeywords.length) > 6) {
            alert("最多只能有六個群組，請刪減");
            return;
        }
        alert("已儲存");
        ajaxKeywords("/api/1.0/profile", data, view);
    });
}

// 規則預設為隱藏，點選才開啟
const ruleDetails = document.getElementById("rule_details");
ruleDetails.style.display = "none";
const question = document.getElementById("icon_question");
question.addEventListener("click", () => {
    if (ruleDetails.style.display === "none") {
        ruleDetails.style.display = "block";
    } else {
        ruleDetails.style.display = "none";
    }
});
