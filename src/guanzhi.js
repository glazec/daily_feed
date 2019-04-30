const sgMail = require('@sendgrid/mail');
const superagent = require("superagent"); //发送网络请求获取DOM
const cheerio = require("cheerio"); //能够像Jquery一样方便获取DOM节点
const nodemailer = require("nodemailer"); //发送邮件的node插件
const ejs = require("ejs"); //ejs模版引擎
const fs = require("fs"); //文件读写
const path = require("path"); //路径配置
const schedule = require("node-schedule"); //定时器任务库
yaml = require('js-yaml'); //读取yaml配置文件
const axios = require('axios')

function guanzhi(){
    let p=new Promise(function(resolve,reject){
    axios.get('https://rsshub.app/guanzhi.rss').then(
        (response)=>{
            // console.log(response.data)    
      let $ = cheerio.load(response.data,{xmlMode: true});
      let author = $("author").text()
      let source = '观止'
      let tag = '文学'
      let title = $("title","item").text()
      let link = $("link").text()
      let description = $("description","item").text()
      let guanzhi = {author:author,source:source,link:link,description:description,title:title,tag:tag}
      resolve(guanzhi)
      console.log(JSON.stringify(guanzhi))
        }
    )
    .catch(function(error){
        console.log('guanzhi'+error)
    })
})
return p
}