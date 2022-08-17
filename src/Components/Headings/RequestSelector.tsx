import { Select } from '@chakra-ui/react'
import { useState } from 'react'

interface RequestSelectorParam {
  onChange: (s: string) => void
}

export default function RequestSelector({ onChange }: RequestSelectorParam) {
  const [selectedField, setSelectedField] = useState('gray.500')

  const handleSelected = (value: string) => {
    switch (value) {
      case 'get':
        setSelectedField('green.500')
        break
      case 'post':
        setSelectedField('blue.500')
        break
      case 'put':
        setSelectedField('yellow.500')
        break
      case 'patch':
        setSelectedField('orange.500')
        break
      case 'delete':
        setSelectedField('red.500')
        break
      default:
        setSelectedField('gray.500')
        break
    }
    onChange(value)
  }

  return (
    <Select
      placeholder="Request Method"
      maxW={{ base: 'auto', md: 200 }}
      color={selectedField}
      focusBorderColor={selectedField}
      borderColor={selectedField}
      onChange={(e) => handleSelected(e.target.value)}
    >
      <option value="get">GET</option>
      <option value="post">POST</option>
      <option value="put">PUT</option>
      <option value="patch">PATCH</option>
      <option value="delete">DELETE</option>
    </Select>
  )
}
