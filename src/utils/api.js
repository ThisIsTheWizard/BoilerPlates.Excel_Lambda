import axios from 'axios'
import { size } from 'lodash'

export const fetchJSONFromAPI = async (params, arr = [], batch = 1) => {
  try {
    const { api_token, api_url, limit = 1000, offset = 0, order = 'created_at|desc', total_limit = 5000 } = params || {}
    if (!api_token || !api_url) {
      console.log('No api_token or api_url provided')
      return false
    }

    const response = await axios.get(
      `${api_url}?limit=${total_limit > limit ? limit : total_limit}&offset=${offset}&order=${order}`,
      { Authorization: `Bearer ${api_token}` }
    )
    const { data, meta_data } = response?.data || {}

    console.log(`Fetched ${size(data)} from API server for batch ${batch}`)

    if (size(data)) arr.push(...data)

    const { filtered_rows, total_rows } = meta_data || {}
    if (batch === 1) {
      console.log(
        `There are ${filtered_rows} filtered rows & ${total_rows} total rows and we will fetch ${total_limit} rows.`
      )
    }

    if (total_limit > size(arr) && filtered_rows > size(arr)) {
      return fetchJSONFromAPI({ api_token, api_url, limit, order, offset: limit + offset, total_limit }, arr, batch + 1)
    }

    return arr
  } catch (err) {
    console.error('Error happened in fetchJSONFromAPI:', err)
    throw err
  }
}
