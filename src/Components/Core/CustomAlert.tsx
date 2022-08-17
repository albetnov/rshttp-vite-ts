import { AlertIcon, AlertTitle, Alert } from '@chakra-ui/react'

interface CustomAlertParams {
  msg: string
  type: 'success' | 'warning' | 'error' | 'info'
}

export default function CustomAlert({ msg, type }: CustomAlertParams) {
  if (msg) {
    return (
      <Alert status={type} my={3} rounded="lg">
        <AlertIcon />
        <AlertTitle>{msg}</AlertTitle>
      </Alert>
    )
  } else {
    return <></>
  }
}
