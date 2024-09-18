const Excel = require('exceljs')
const path = require('path')


async function readExcel(filename) {
    // read from a file
  const workbook = new Excel.Workbook()
  filename = path.resolve(__dirname, './saveData.xlsx')

  try {
    await workbook.xlsx.readFile(filename)
      // 获取第一个工作表
    const worksheet = workbook.getWorksheet(1); // 使用索引获取第一个 sheet

    const totalRows = worksheet.rowCount
    console.log(`ny----totalRows总行数: `, totalRows)

    for (let index = 2; index <= totalRows; index++) {
      const row = worksheet.getRow(index)
      let item = {}
      row.eachCell((cell, colNumber) => {
        // console.log(`Column ${colNumber}, Row 1: ${cell.value}`)
        switch(colNumber){
          case 1:
            item['name'] = cell.value
            break;
          case 2:
            item['icon'] = cell.value
            break;
            
        }
      })
      console.log(`ny----row ${index}: `, item)
    }
  } catch (error) {
    console.log(`ny----error.mesaage: `, error.message)
  }
}

readExcel()