import { Text, Textarea, Box } from '@chakra-ui/react'
import { useState } from 'react'
import CustomAlert from '../Core/CustomAlert'

interface HeaderOptionsParam {
  onChange: (s: string) => void
}

export default function HeaderOptions({ onChange }: HeaderOptionsParam) {
  const [header, setHeader] = useState('')
  const [error, setError] = useState('')
  const sampleValue = `"Authorization": "bearer <token>"`

  const onHeaderChange = (value: string) => {
    setHeader(value)
    if (header === '') {
      return setError('')
    }
    try {
      const data = JSON.parse(`{${value}}`)
      setError('')
      onChange(data)
    } catch (err) {
      setError('Invalid JSON Format')
    }
  }

  return (
    <Box>
      <Text fontSize="md" color="gray.500">
        Header (JSON):
      </Text>
      <Textarea
        mt={3}
        size="md"
        placeholder={sampleValue}
        onChange={(e) => onHeaderChange(e.target.value)}
        value={header}
      />
      <CustomAlert msg={error} type="error" />
    </Box>
  )
}
