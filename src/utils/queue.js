import { size } from 'lodash'

import { fetchJSONFromAPI } from 'src/utils/api'
import { generateExcelFromJSON } from 'src/utils/excel'
import { uploadFileToS3 } from 'src/utils/s3'

export const initiateProcessingForGeneratingExcel = async (params) => {
  try {
    const { api_token, api_url, total_limit } = params || {}

    const data = await fetchJSONFromAPI({ api_token, api_url, total_limit })
    if (!size(data)) {
      console.log('No data fetched from API')
      return false
    }

    console.log(`Fetched ${size(data)} rows from API. Now trying to generate the excel buffer...`)

    const excel = await generateExcelFromJSON(data)

    if (!excel?.byteLength) {
      console.log('No excel buffer generated')
      return false
    }

    console.log('Excel buffer generated successfully.')

    const fileKey = `files/excel/${new Date().toLocaleDateString('en-CA')}-${new Date().getTime()}.xlsx`

    console.log(`Now trying to upload the excel to AWS S3 at ${fileKey}.`)

    const response = await uploadFileToS3(excel, fileKey)
    if (!response?.success) {
      console.log('No file uploaded to AWS S3')
      return false
    }

    console.log(`File uploaded to AWS S3 successfully at ${fileKey}.`)

    return true
  } catch (err) {
    console.error('Error happened in initiateProcessingForGeneratingExcel:', err)
    throw err
  }
}
