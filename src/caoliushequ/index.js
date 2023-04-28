const cheerio = require('cheerio')
const axios = require('axios')
const jsonfile = require('jsonfile')
const path = require('path')

const BASE_URL = 'https://cl.4soe.com/thread0806.php?fid=22'

function gbk2utf8 (str) {
  const StringDecoder = require('string_decoder').StringDecoder
  const decoder = new StringDecoder('utf8')
  const buf = Buffer.from(str)
  // console.log(decoder.write(buf))
  return decoder.write(buf)
}

async function getList (searchWord = '', pageIndex = 1) {
  const resList = []
  const url = `${BASE_URL}&search=&page=${pageIndex}`
  const res = await axios.get(url)
  const html = gbk2utf8(res.data)
  const $ = cheerio.load(html)
  $('.t_one .tal h3 a').each((index, el) => {
    const title = $(el).text()
    const re = new RegExp(searchWord, 'ig')
    if (re.test(title)) {
      const url = $(el).attr('href')
      const item = `http://cc.wdrxi.com/${url}`
      resList.push(item)
    }
  })
  console.log(`当前页码${pageIndex}, 每页符合关键词的数据个数=${resList.length}`)
  return resList
}
getList('福利', 1)

async function getAll (keyword) {
  try {
    const lastPageIndex = 10
    let realList = []
    let i = 1
    let isEnd = false
    while (!isEnd) {
      const resChunk = await Promise.all([
        getList(i, keyword),
        getList(++i, keyword),
        getList(++i, keyword),
        getList(++i, keyword),
        getList(++i, keyword),
        getList(++i, keyword),
        getList(++i, keyword),
        getList(++i, keyword),
        getList(++i, keyword),
        getList(++i, keyword)
      ])
      resChunk.forEach((item) => {
        realList = realList.concat(item)
      })

      isEnd = ++i > lastPageIndex
    }
    console.log('总共有', realList.length)
    if (realList.length > 0) {
      jsonfile.writeFile(path.resolve(__dirname, `data/${keyword}.json`), data)
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getAll
}
