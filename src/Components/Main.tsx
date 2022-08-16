import type { AxiosBody } from '../Utils/ApiInterface'
import { Container, Box, useColorMode } from '@chakra-ui/react'
import { AxiosInstance, AxiosResponse } from 'axios'
import { useState } from 'react'
import { ApiParser } from '../Utils/ApiInterface'
import CardBody from './CardBody'
import CardHeader from './CardHeader'
import CardResponse from './CardResponse'
import Card from './Core/Card'
import Topbar from './Core/Topbar'

export default function Main() {
  const { colorMode, toggleColorMode } = useColorMode()

  const [method, setMethod] = useState('')
  const [header, setHeader] = useState('')
  const [body, setBody] = useState<AxiosBody | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<null | AxiosInstance | AxiosResponse<any, any> | unknown>(
    null
  )

  const [sanctumUrl, setSanctumUrl] = useState('http://localhost:8000/sanctum/csrf-cookie')
  const [sanctumCredCheck, setSanctumCredCheck] = useState(true)
  const [sanctumStatus, setSanctumStatus] = useState(false)

  const changeMethod = (value: string) => {
    setMethod(value)
  }

  const changeUrl = async (value: string) => {
    try {
      setIsLoading(true)
      const sanctum = {
        url: sanctumUrl,
        credCheck: sanctumCredCheck,
        status: sanctumStatus,
      }
      const result = await ApiParser(value, method, header, body, sanctum)
      console.log(result)
      setResult(result)
    } catch (e) {
      console.log(e)
      setResult(e)
    } finally {
      setIsLoading(false)
    }
  }

  const changeHeader = (value: string) => setHeader(value)

  const changeBody = (value: AxiosBody) => setBody(value)

  return (
    <Box>
      <Topbar colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <Container mt={10} maxW="container.lg">
        <Card
          head={'RSHTTP'}
          content={
            <Box>
              <CardHeader
                onMethodChange={changeMethod}
                onUrlChange={changeUrl}
                method={method}
                onLoad={isLoading}
                sanctum={{
                  url: sanctumUrl,
                  credCheck: sanctumCredCheck,
                  status: sanctumStatus,
                  urlHandler: setSanctumUrl,
                  credCheckHandler: setSanctumCredCheck,
                  statusHandler: setSanctumStatus,
                }}
              />
              <CardBody onHeaderChange={changeHeader} onBodyChange={changeBody} />
              <CardResponse result={result} />
            </Box>
          }
        />
      </Container>
    </Box>
  )
}
