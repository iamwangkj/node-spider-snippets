const cheerio = require('cheerio')
const axios = require('axios')

// https://mw.ib6tv.com/?s=%E6%B7%B1%E7%94%B0

async function searchVideo (searchWord = '深田') {
  const BASE_URL = 'https://mw.ib6tv.com'
  const url = `${BASE_URL}/?s=${encodeURIComponent(searchWord)}`
  const res = await axios.get(url)
  const html = res.data
  const $ = cheerio.load(html)

  const resList = []
  $('.video-block a.infos').each((index, el) => {
    const title = $(el).text().trim()
    const link = BASE_URL + $(el).attr('href')
    resList.push({
      title,
      link
    })
  })
  console.log('搜索结果=', resList)
  return resList
}

searchVideo('深田')
