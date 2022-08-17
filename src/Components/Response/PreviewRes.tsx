import { useState } from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import ResType from './ResType'
import PreviewRenderer from './PreviewRenderer'
import CustomAlert from '../Core/CustomAlert'
import { AxiosResponse } from '../../Utils/ApiInterface'
import { AxiosError } from 'axios'

interface PreviewResParam {
  result: AxiosResponse
}

export default function PreviewRes({ result }: PreviewResParam) {
  const initialType = () => {
    const contentType = result?.headers?.['content-type'] || ''
    if (contentType?.startsWith('text/html')) {
      return 'html'
    } else if (contentType?.startsWith('application/json')) {
      return 'json'
    } else {
      return 'text'
    }
  }

  const [type, setType] = useState(initialType)

  if (result instanceof AxiosError) {
    if (result.code && result.code === 'ERR_NETWORK') {
      return <CustomAlert msg="Network Error" type="error" />
    } else {
      return (
        <>
          <CustomAlert
            msg="CORS Problem or Unsuccessful Request. Details available at console."
            type="warning"
          />
          <Text>{result.response?.data?.message || 'No response data available.'}</Text>
        </>
      )
    }
  }

  const setTypeListener = (value: string) => {
    switch (value) {
      case 'html':
        setType('html')
        break
      case 'json':
        setType('json')
        break
      case 'text':
        setType('text')
        break
      default:
        setType('')
        break
    }
  }

  return (
    <Box>
      <Flex
        alignItems={{ base: 'normal', md: 'center' }}
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent={{ base: 'center', md: 'space-between' }}
      >
        <Text>Preview:</Text>
        <ResType onChange={setTypeListener} type={type} />
      </Flex>
      <PreviewRenderer type={type} result={result} />
    </Box>
  )
}
