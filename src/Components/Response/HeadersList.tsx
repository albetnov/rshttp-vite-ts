import { Table, TableContainer, Thead, Tr, Td, Th, Tbody } from '@chakra-ui/react'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import CustomAlert from '../Core/CustomAlert'

interface HeadersListParam {
  result: AxiosInstance | AxiosResponse<any, any>
}

export default function HeadersList({ result }: HeadersListParam) {
  if (result instanceof AxiosError || result === null) {
    return <CustomAlert msg="Network Error" type="error" />
  }
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {typeof result === 'object'
            ? Object.entries(result.headers).map((item) => (
                <Tr key={item[0] + item[1]}>
                  <Td>{item[0]}</Td>
                  <Td>{item[1]}</Td>
                </Tr>
              ))
            : 'No Data'}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
