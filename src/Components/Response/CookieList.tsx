import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Box,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomAlert from "../Core/CustomAlert";

export default function CookieList() {
  const [info, setInfo] = useState("");
  const parseCookie = () => {
    let cookie = document.cookie;
    if (!cookie) {
      return { data: null };
    }
    if (cookie.includes(";")) {
      cookie = cookie.split("; ");
    }

    if (Array.isArray(cookie)) {
      return { cookie: "multi", data: cookie.map((item) => item.split("=")) };
    }
    return { cookie: "single", data: cookie.split("=") };
  };

  const ShowCookie = () => {
    const { cookie, data } = parseCookie();
    if (data === null) {
      return (
        <Tr>
          <Td colSpan={2}>
            <CustomAlert msg="No Cookie found." type="error" />
          </Td>
        </Tr>
      );
    }

    if (cookie === "single") {
      return (
        <Tr>
          <Td>{data[0]}</Td>
          <Td>{data[1]}</Td>
        </Tr>
      );
    } else {
      return data.map((item) => (
        <Tr key={item[0] + item[1]}>
          <Td>{item[0]}</Td>
          <Td>{item[1]}</Td>
        </Tr>
      ));
    }
  };

  const deleteCookie = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    setInfo("Cookie Deleted");
  };

  const DeleteAllCookie = () => (
    <Button variant="ghost" colorScheme="blue" onClick={deleteCookie} mt={5}>
      Delete All Cookie
    </Button>
  );

  useEffect(() => {
    setTimeout(() => {
      setInfo("");
    }, 3000);
  }, [info]);

  return (
    <Box>
      <CustomAlert
        msg="Cookie appear here are only cookie that accessible by JavaScript (Non HttpOnly Cookie)."
        type="info"
      />
      <CustomAlert msg={info} type="success" />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <ShowCookie />
          </Tbody>
        </Table>
      </TableContainer>
      <DeleteAllCookie />
    </Box>
  );
}
