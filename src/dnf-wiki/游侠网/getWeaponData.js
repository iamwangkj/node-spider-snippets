const axios = require('axios')
const cheerio = require('cheerio')
const {
  saveJson
} = require('../../utils/jsonFile')



async function getWeaponDetail(weaponId) {
  const url = `https://app.ali213.net/wiki/dnfsy/${weaponId}.html`
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  const attrList = []

  $('.main-container .add-a').each((i, el) => {
    if (i === 0) {
      const url = $(el).attr('src')
      attrList.push(`https:${url}`)
    } else {
      attrList.push($(el).text())
    }
  })
  // console.log(attrList)

  const weaponDetail = {
    icon: attrList[0],
    name: attrList[1],
    type: attrList[3],
    level: attrList[5],
    for: attrList[7],
    liliang: attrList[9]==='无'?'':attrList[9],
    zhili: attrList[11]==='无'?'':attrList[11],
    wuligongjili: attrList[14],
    mofagongjili: attrList[16],
    affect: attrList[19],
  }
  console.log(JSON.stringify(weaponDetail))
  return weaponDetail
}

// getWeaponDetail('wq3')

async function getAllWeaponDetail() {
  const resList = [] // 存放结果的数组
  let isEnd = false
  let zbIndex = 1
  try {
    while (zbIndex<=67) {
      const weaponId = `wq${zbIndex}`
      const zbObj = await getWeaponDetail(weaponId)
      resList.push(zbObj)
      ++zbIndex
    }
    console.log('总共=', resList.length)
  } catch (err) {

  } finally {
    await saveJson(resList, `${__dirname}/data-json/all-weapons-youxiwang.json`)
  }
}

getAllWeaponDetail()