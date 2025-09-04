import ExcelJS from 'exceljs'
import { forEach, head, map } from 'lodash'

export const generateExcelFromJSON = async (data) => {
  // Import ExcelJS workbook
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('JSON_TO_EXCEL')

  // Get headers from first data object's properties
  worksheet.columns = map(Object.keys(head(data)), (key) => ({ header: key?.toUpperCase?.(), key, width: 15 }))

  // Add data rows
  forEach(data, (row) => {
    worksheet.addRow(row)
  })

  return workbook.xlsx.writeBuffer() // Generate Excel buffer from workbook
}
