import axios from 'axios'

let client = axios.create()

interface SanctumObject {
  url: string
  credCheck: boolean
  status: boolean
}

interface AxiosConfig {
  [index: string]: string
}

interface AxiosBody {
  [index: string]: string
}

interface AxiosResponse {
  data: object | string
  headers: {
    'content-type': string
  }
  code?: string
  request?: {
    responseURL: string
  }
}

const sanctumAuth = (sanctum: SanctumObject) => {
  client = axios.create({
    withCredentials: sanctum.credCheck,
  })
  return client.get(sanctum.url)
}

const ApiParser = async (
  url: string,
  method: string,
  header: string,
  body: AxiosBody | null,
  sanctum: SanctumObject
) => {
  const axiosConfig: AxiosConfig = {}

  if (header) {
    axiosConfig['headers'] = header
  }

  if (sanctum.status) {
    try {
      await sanctumAuth(sanctum)
    } catch (err) {
      console.log('Sanctum auth failed')
    }
  }
  switch (method) {
    case 'get':
      return client.get(url, axiosConfig)
    case 'post':
      return client.post(url, body, axiosConfig)
    case 'put':
      return client.put(url, body, axiosConfig)
    case 'patch':
      return client.patch(url, body, axiosConfig)
    case 'delete':
      return client.delete(url, axiosConfig)
    default:
      return client
  }
}

export { ApiParser, sanctumAuth }
export type { AxiosBody, SanctumObject, AxiosResponse }
