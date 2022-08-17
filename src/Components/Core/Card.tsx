import { Heading, Divider, Box } from '@chakra-ui/react'

interface CardParams {
  head: JSX.Element | string
  content: JSX.Element
}

export default function Card({ head, content }: CardParams) {
  return (
    <Box py={2} px={3} borderWidth={1} borderColor="gray.300" rounded="lg" shadow="lg">
      <Heading as="h2" fontSize="xl" mb={2}>
        {head}
      </Heading>
      <Divider />
      {content}
    </Box>
  )
}
