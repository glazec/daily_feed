const cheerio = require("cheerio"); //能够像Jquery一样方便获取DOM节点
const axios = require("axios");

module.exports = function guanzhi() {
  let p = new Promise(function(resolve, reject) {
    axios
      .get("https://rsshub.app/guanzhi.rss")
      .then((response) => {
        // console.log(response.data)
        let $ = cheerio.load(response.data, { xmlMode: true });
        let author = $("author").text();
        let source = "观止";
        let tag = "文学";
        let title = $("title", "item").text();
        let link = $("link").text();
        let description = $("description", "item").text();
        description = description.split("</p>").join("\n");
        description = description.split("<p>").join("\n");
        description = description.split("\n").slice(0,5);
        description[6]='......'
        let guanzhi = {
          author: author,
          source: source,
          link: 'https://meiriyiwen.com',
          description: description,
          title: title,
          tag: tag
        };
        resolve(guanzhi);
        //   console.log(JSON.stringify(guanzhi))
      })
      .catch(function(error) {
        console.log("guanzhi" + error);
      });
  });
  return p;
};
