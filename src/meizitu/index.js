const axios = require('axios')
const cheerio = require('cheerio')

// 获取每页的图片
async function getImgList (pageIndex) {
  try {
    const resList = [] // 存放结果的数组
    // const url = `https://www.mzitu.com/jiepai/comment-page-${pageIndex}/#comments`
    const url = `https://www.mzitu.com/zipai/comment-page-${pageIndex}/#comments`
    const res = await axios.get(url)
    const $ = cheerio.load(res.data)
    $('.comment .comment-body').each((index, el) => {
      const date = $(el).find('.comment-meta a').text().trim().replace('at ', '')
      const imgUrl = $(el).find('p img.lazy').attr('data-original')
      // console.log(imgUrl, date)
      console.log(`图片名称=${date}，url=${imgUrl}`)
      const item = {
        date,
        imgUrl
      }
      resList.push(item)
    })
    return resList
  } catch (err) {
    console.log(err)
    return []
  }
}
getImgList(1)
