const fs = require('fs')
const axios = require('axios')
const path = require('path')
const { v4: uuid } = require('uuid')
const asyncUtil = require('async')

/**
 * 下载单张图片
 * @param {string} imgUrl 要下载的图片url
 * @param {string} _path 图片下载到的目录
 */
async function downloadImg (imgUrl, _path) {
  try {
    const { data } = await axios.get(imgUrl, { responseType: 'stream' })
    const writer = fs.createWriteStream(_path, `${uuid()}.jpg`)
    await data.pipe(writer)
    console.log('下载完成：', imgUrl)
  } catch (err) {
    console.log('err=', err)
  }
}
// downloadImg('https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181128%2F97dcb1de5159456d9311b5d7b098957c.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631872260&t=d1bd36aea4f45b01f76ae2ac6f9a3a0d', '/data1')

/**
 * 下载多张图片
 * @param {array<string>} imgUrlList 要下载的图片url数组
 * @param {string} _path 图片下载到的目录
 * @returns {promise}
 */
function downloadManyImg (imgUrlList, _path = './downloadImgs') {
  return new Promise((resolve, reject) => {
    const dir = path.join(__dirname, _path)
    if (!fs.existsSync(dir)) {
      console.log('不存在目录，创建该目录：', dir)
      fs.mkdirSync(dir)
    }
    asyncUtil.mapLimit(imgUrlList, 10, async (itemUrl) => {
      await downloadImg(itemUrl, dir)
    }, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

module.exports = {
  downloadManyImg
}
