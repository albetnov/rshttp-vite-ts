import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import React from "react";
import CustomAlert from "../Core/CustomAlert";

export default function HeadersList({ result }) {
  if (result instanceof AxiosError) {
    return <CustomAlert msg="Network Error" type="error" />;
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
          {Object.entries(result.headers).map((item) => (
            <Tr key={item[0] + item[1]}>
              <Td>{item[0]}</Td>
              <Td>{item[1]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
