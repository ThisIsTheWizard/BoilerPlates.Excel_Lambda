import { size } from 'lodash'

import { fetchJSONFromAPI } from 'src/utils/api'
import { generateExcelFromJSON } from 'src/utils/excel'
import { uploadFileToS3 } from 'src/utils/s3'

export const initiateProcessingForGeneratingExcel = async (params) => {
  try {
    const { api_token, api_url, total_limit } = params || {}

    const data = await fetchJSONFromAPI({ api_token, api_url, total_limit })
    if (!size(data)) {
      console.log('🚀 [EXCEL-LAMBDA] No data fetched from API ✨')
      return false
    }

    console.log(`🚀 [EXCEL-LAMBDA] Fetched ${size(data)} rows from API. Now trying to generate the excel buffer... ✨`)

    const excel = await generateExcelFromJSON(data)

    if (!excel?.byteLength) {
      console.log('🚀 [EXCEL-LAMBDA] No excel buffer generated ✨')
      return false
    }

    console.log('🚀 [EXCEL-LAMBDA] Excel buffer generated successfully. ✨')

    const fileKey = `files/excel/${new Date().toLocaleDateString('en-CA')}-${new Date().getTime()}.xlsx`

    console.log(`🚀 [EXCEL-LAMBDA] Now trying to upload the excel to AWS S3 at ${fileKey}. ✨`)

    const response = await uploadFileToS3(excel, fileKey)
    if (!response?.success) {
      console.log('🚀 [EXCEL-LAMBDA] No file uploaded to AWS S3 ✨')
      return false
    }

    console.log(`🚀 [EXCEL-LAMBDA] File uploaded to AWS S3 successfully at ${fileKey}. ✨`)

    return true
  } catch (err) {
    console.error('❌ [EXCEL-LAMBDA] Error happened in initiateProcessingForGeneratingExcel 💥', err)
    throw err
  }
}
