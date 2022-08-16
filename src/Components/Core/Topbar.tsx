import { Heading } from '@chakra-ui/react'
import { Text, Box, Button } from '@chakra-ui/react'
import React from 'react'

export default function Topbar({toggleColorMode, colorMode}) {
  return (
    <Box py={5} px={3} backgroundColor="twitter.300">
      <Heading as="h1" size="2xl" color="white">
        <Text fontWeight="bold" color="blue.900" display="inline">
          R
        </Text>
        eact
        <Text fontWeight="bold" display="inline" color="teal.400">
          S
        </Text>
        imple
        <Text fontWeight="bold" display="inline" color="orange.500">
          HTTP
        </Text>
        <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'light' : 'dark'}</Button>
      </Heading>
    </Box>
  )
}
