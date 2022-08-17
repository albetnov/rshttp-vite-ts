import { Textarea } from '@chakra-ui/react'
import CustomAlert from '../Core/CustomAlert'
import SyntaxHighlighter from 'react-syntax-highlighter'
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco'
import { AxiosResponse } from '../../Utils/ApiInterface'

interface PreviewRendererParams {
  type: string
  result: AxiosResponse
}

export default function PreviewRenderer({ type, result }: PreviewRendererParams) {
  if (type === 'html') {
    return (
      <iframe
        src={result.request ? result.request.responseURL : ''}
        title="Result"
        style={{
          border: 0,
          width: '100%',
          marginTop: 10,
          height: 450,
        }}
      ></iframe>
    )
  } else if (type === 'json') {
    return (
      <SyntaxHighlighter language="json" style={docco}>
        {JSON.stringify(result, null, 2)}
      </SyntaxHighlighter>
    )
  } else if (type === 'text' && 'data' in result) {
    return <Textarea mt={5} value={result.data as string} readOnly />
  } else {
    return <CustomAlert msg="Please choose one of Type Data Response" type="warning" />
  }
}
