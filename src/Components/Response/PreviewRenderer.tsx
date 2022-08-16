import { Textarea } from "@chakra-ui/react";
import React from "react";
import CustomAlert from "../Core/CustomAlert";
import SyntaxHighlighter from "react-syntax-highlighter";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";

export default function PreviewRenderer({ type, result }) {
  if (type === "html") {
    return (
      <iframe
        src={result?.request.responseURL}
        title="Result"
        style={{
          border: 0,
          width: "100%",
          marginTop: 10,
          height: 450,
        }}
      ></iframe>
    );
  } else if (type === "json") {
    return (
      <SyntaxHighlighter language="json" style={docco}>
        {JSON.stringify(result, null, 2)}
      </SyntaxHighlighter>
    );
  } else if (type === "text") {
    return <Textarea mt={5} value={result?.data} readOnly />;
  } else {
    return (
      <CustomAlert
        msg="Please choose one of Type Data Response"
        type="warning"
      />
    );
  }
}
