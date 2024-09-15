const axios = require('axios')
const cheerio = require('cheerio')
const {
  saveJson
} = require('../utils/jsonFile')


function transformToPercent(num) {
  num = Number(num)
  const percent = num * 100 + '%'
  return percent
}


async function getOneData(zbIndex = 1) {
  // https://app.ali213.net/wiki/dnfsy/zb1.html
  const url = `https://app.ali213.net/wiki/dnfsy/zb${zbIndex}.html`
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  const zbAttrList = []

  $('.main-container .add-a').each((i, el) => {
    if (i === 0) {
      const url = $(el).attr('src')
      zbAttrList.push(`https:${url}`)
    } else {
      zbAttrList.push($(el).text())
    }
  })
  return zbAttrList
}



// getOneData()


async function main() {
  const resList = [] // 存放结果的数组
  let isEnd = false
  let zbIndex = 1
  try {
    while (!isEnd) {
      const zbObj = await getOneData(zbIndex)
      if (zbObj.length > 0) {
        resList.push(zbObj)
          ++zbIndex
      } else {
        isEnd = true
      }
    }
    console.log('总共=', resList.length)
  } catch (err) {

  } finally {
    await saveJson(resList, `${__dirname}/data-json/youxiawang-zb.json`)
  }




}

// main()