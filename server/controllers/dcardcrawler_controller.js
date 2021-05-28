const crawlerModel = require("../models/crawler_model.js");
const request = require("request");
const randomUseragent = require("random-useragent");
const proxys = [
    "http://tihyjcyk-dest:sr9mbjac4xab@193.151.161.119:8462"
    // "http://tihyjcyk-dest:sr9mbjac4xab@185.95.157.117:6138",
    // "http://tihyjcyk-dest:sr9mbjac4xab@2.56.101.219:8751",
    // "http://tihyjcyk-dest:sr9mbjac4xab@45.130.60.107:9634",
    // "http://tihyjcyk-dest:sr9mbjac4xab@185.95.157.117:6138",
    // "http://tihyjcyk-dest:sr9mbjac4xab@45.131.212.138:6187",
    // "http://tihyjcyk-dest:sr9mbjac4xab@45.92.247.141:6649",
    // "http://tihyjcyk-dest:sr9mbjac4xab@45.92.247.241:6749",
    // "http://tihyjcyk-dest:sr9mbjac4xab@45.87.249.249:7827",
    // "http://tihyjcyk-dest:sr9mbjac4xab@193.151.160.57:8144",
    // "http://tihyjcyk-dest:sr9mbjac4xab@193.151.160.143:8230",
    // "http://tihyjcyk-dest:sr9mbjac4xab@193.151.161.119:8462",
    // "http://tihyjcyk-dest:sr9mbjac4xab@193.151.161.60:8403",
    // "http://tihyjcyk-dest:sr9mbjac4xab@2.56.101.136:8668",
    // "http://tihyjcyk-dest:sr9mbjac4xab@45.92.247.166:6674",
    // "http://tihyjcyk-dest:sr9mbjac4xab@45.131.212.244:6293",
    // "http://tihyjcyk-dest:sr9mbjac4xab@185.95.157.190:6211",
    // "http://tihyjcyk-dest:sr9mbjac4xab@45.87.249.197:7775",
    // "http://tihyjcyk-dest:sr9mbjac4xab@185.95.157.131:6152",
    // "http://tihyjcyk-dest:sr9mbjac4xab@45.131.212.246:6295",
    // "http://tihyjcyk-dest:sr9mbjac4xab@45.87.249.15:7593",
    // "http://tihyjcyk-dest:sr9mbjac4xab@45.92.247.197:6705",
    // "http://tihyjcyk-dest:sr9mbjac4xab@2.56.101.219:8751"
];
function delay (i) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // console.log(i);
            resolve("delay");
        }, 1500);
    });
}
function dcardCrawler (url, proxy) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: "GET",
            proxy: proxy
            // headers: {
            //     Accept: "application/json",
            //     "Accept-Charset": "utf-8",
            //     "User-Agent": randomUseragent.getRandom()
            // }
        }, (err, res, body) => {
            if (err || !body) {
                return;
            }
            // if(tyepeof(body) ===  )

            try {
                // console.log(typeof (body));
                const data = JSON.parse(body);
                resolve(data);
            } catch (err) {
                console.log("test3");
                console.log("msg: " + err);
                // console.log(body);
                // console.log(typeof (body));
                reject(err);
            }
        });
    });
};
// 爬取Dcard文章列表，標題、id、作者、讚數、留言數
async function getDcard (req, res) {
    const result = [];
    let lastUrl = "https://www.dcard.tw/service/api/v2/forums/makeup/posts?limit=10";
    for (let i = 0; i < 5; i++) {
        // const math = Math.floor(Math.random() * 100);
        const proxy = proxys[0];
        console.log("+++++++++++++++");
        console.log(i);

        // const dcardInfo = await dcardCrawler(lastUrl);
        try {
            const dcardInfo = await dcardCrawler(lastUrl, proxy);
            console.log("heeeeeeeeeeeeeeeeeeeeee");
            await delay(i);
            const pageLimit = dcardInfo.length - 1;
            const beforeId = dcardInfo[pageLimit].id;
            lastUrl = `https://www.dcard.tw/service/api/v2/forums/makeup/posts?limit=10&&before=${beforeId}`;
            for (let j = 0; j < dcardInfo.length; j++) {
                await delay(j);
                const id = dcardInfo[j].id;
                const title = dcardInfo[j].title;
                const author = dcardInfo[j].school;
                const commentCount = dcardInfo[j].commentCount;
                const likeCount = dcardInfo[j].likeCount;
                // 將Dcard的時間戳處理
                const date = new Date(dcardInfo[j].createdAt);
                const dateInfo = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                const timeDetail = date.toTimeString();
                const timeInfo = timeDetail.split(" ")[0];
                const timeSeg = timeInfo.split(":");
                const time = dateInfo + " " + (timeSeg.slice(0, 2).join(":"));
                // 選取文章id後，進到文章內頁爬文
                const contentUrl = `https://www.dcard.tw/service/api/v2/posts/${id}`;
                const contentInfo = await dcardCrawler(contentUrl);
                const content = contentInfo.content;
                console.log(title);
                const data = {
                    author: author,
                    title: title,
                    time: time,
                    push: commentCount,
                    likes: likeCount,
                    channel: "Dcard > 美妝",
                    link: `https://www.dcard.tw/f/makeup/p/${id}`,
                    article: content
                };
                result.push(data);
                const commentsUrl = `https://www.dcard.tw/service/api/v2/posts/${id}/comments`;
                await delay(j);
                const commentsData = await dcardCrawler(commentsUrl);
                data.comments = [];
                for (const k in commentsData) {
                    if ("content" in commentsData[k]) {
                        const comment = commentsData[k].content;
                        const commentDate = new Date(commentsData[k].createdAt);
                        const commentDateInfo = commentDate.getFullYear() + "-" + (commentDate.getMonth() + 1) + "-" + commentDate.getDate();
                        const commentTimeDetail = commentDate.toString();
                        const commentTimeInfo = commentTimeDetail.split(" ")[4];
                        const commentTimeSeg = commentTimeInfo.split(":");
                        const commentTimeNoSec = commentTimeSeg.slice(0, 2).join(":");
                        const commentTime = commentDateInfo + " " + commentTimeNoSec;
                        const commentSchool = commentsData[k].school;
                        const commentLikeCount = commentsData[k].likeCount;
                        const object = {
                            commentAuthor: commentSchool,
                            comment: comment,
                            commentTime: commentTime,
                            commentLikeCount: commentLikeCount
                        };
                        data.comments.push(object);
                    }
                }
            }
            continue;
        } catch (err) {
            console.log("test4");
            console.log("alert: " + err);
            if (i > 0) {
                i = i - 1;
            }
            continue;
        }
    }
    const sqlResult = await crawlerModel.createCrawlerInfo(result);
    console.log(sqlResult);
    res.send(result);
}
module.exports = {
    getDcard
};
