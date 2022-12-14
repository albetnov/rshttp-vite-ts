import { Tabs, TabPanels, TabPanel, Tab, TabList, Box } from '@chakra-ui/react'
import { AxiosResponse } from '../Utils/ApiInterface'
import CustomAlert from './Core/CustomAlert'
import CookieList from './Response/CookieList'
import HeadersList from './Response/HeadersList'
import PreviewRes from './Response/PreviewRes'
import ResStatus from './Response/ResStatus'

interface CardResponseParam {
  result: AxiosResponse
}

export default function CardResponse({ result }: CardResponseParam) {
  if (result) {
    return (
      <Box my={3}>
        <ResStatus result={result} />
        <Tabs isFitted variant="soft-rounded" colorScheme="blue">
          <TabList>
            <Tab>Preview</Tab>
            <Tab>Headers</Tab>
            <Tab>Cookie</Tab>
          </TabList>
          <TabPanels mt={3}>
            <TabPanel>
              <PreviewRes result={result} />
            </TabPanel>
            <TabPanel>
              <HeadersList result={result} />
            </TabPanel>
            <TabPanel>
              <CookieList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    )
  }

  return <CustomAlert msg="No Result. Please make request first" type="info" />
}
