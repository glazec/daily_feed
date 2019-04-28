
const superagent = require("superagent"); //发送网络请求获取DOM
let PoetUrl = "https://api.gushi.ci/all"

function getPoet(){
let p = new Promise(
    function(resolve,reject){
        superagent.get(PoetUrl).end(
            function(err,res){
                if(err){
                    reject(err)
                }
                let raw = JSON.parse(res.text)
                console.log('raw data: '+JSON.stringify(raw))
                resolve(raw.content)
            }
        )
    
}
)
return p
}

Promise.all([getPoet()]).then(
    function(data){
        console.log('data'+data[0])
    }
)