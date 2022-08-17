import { Heading, Text, Box, Button } from '@chakra-ui/react'

interface TopBarParams {
  toggleColorMode: () => void
  colorMode: string
}

export default function Topbar({ toggleColorMode, colorMode }: TopBarParams) {
  return (
    <Box
      py={5}
      px={3}
      backgroundColor="twitter.300"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
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
      </Heading>
      <Button onClick={toggleColorMode} colorScheme="blue">
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </Box>
  )
}
