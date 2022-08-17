import { Text, Flex, Textarea, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { parse, stringify, YAMLParseError } from 'yaml'
import { AxiosBody } from '../../Utils/ApiInterface'
import CustomAlert from '../Core/CustomAlert'
import TypeData from './TypeData'

interface BodyDataParam {
  onChange: (a: AxiosBody) => void
}

export default function BodyData({ onChange }: BodyDataParam) {
  const [placeholder, setPlaceholder] = useState('Select Type Data First!')
  const [body, setBody] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState('')

  const changePlaceholder = (value: string) => {
    setType(value)
    switch (value) {
      case 'json':
        if (body !== '') {
          setBody(JSON.stringify(parseString(body)))
        }
        setPlaceholder(`{ "name": "John Doe", "age": "30" }`)
        break
      case 'yaml':
        if (body !== '') {
          setBody(stringify(parseString(body)))
        }
        setPlaceholder(`name: John Doe\nage: 30`)
        break
      case 'plain/text':
        setBody('')
        setPlaceholder(`Plain Text here...`)
        break
      default:
        setBody('')
        setPlaceholder('Select Type Data First!')
        break
    }
  }

  const parseString = (value: string) => {
    if (type === 'json') {
      return JSON.parse(value)
    } else if (type === 'yaml') {
      return parse(value)
    } else {
      return value
    }
  }

  const changeBody = (value: string) => {
    setBody(value)
    if (body === '') {
      return setError('')
    }
    try {
      const result = parseString(value)
      setError('')
      onChange(result)
    } catch (err) {
      if (err instanceof YAMLParseError) {
        setError('Invalid YAML Format')
      } else if (err instanceof SyntaxError) {
        setError('Invalid JSON Format')
      } else {
        setError('Unknown Error')
      }
    }
  }

  return (
    <Box my={3}>
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        gap={{ base: 0, md: 3 }}
        alignItems={{ base: 'normal', md: 'center' }}
        justifyContent={{ base: 'normal', md: 'space-between' }}
      >
        <Text color="gray.500" fontSize="md" flexGrow={1}>
          Body Data:
        </Text>
        <TypeData onChange={changePlaceholder} />
      </Flex>
      {placeholder !== 'Select Type Data First!' ? (
        <Textarea
          mt={3}
          size="md"
          placeholder={placeholder}
          value={body}
          onChange={(e) => changeBody(e.target.value)}
        />
      ) : (
        <CustomAlert msg="Please select type data first!" type="error" />
      )}
      <CustomAlert msg={error} type="error" />
    </Box>
  )
}
