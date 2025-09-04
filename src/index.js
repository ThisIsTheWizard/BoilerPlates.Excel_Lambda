import { head } from 'lodash'

import { initiateProcessingForGeneratingExcel } from 'src/utils/queue'

export const handler = async (event, context, callback) => {
  try {
    console.log('Lambda process is started with event', event)

    const body = JSON.parse(head(event?.Records)?.body || '{}')

    return initiateProcessingForGeneratingExcel(body)
  } catch (error) {
    console.error('Error happened in handler:', error)
  } finally {
    callback(null, 'Lambda process is completed')
  }
}
