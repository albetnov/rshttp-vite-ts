import { Tabs } from '@chakra-ui/react'
import { TabPanels } from '@chakra-ui/react'
import { Tab } from '@chakra-ui/react'
import { TabPanel } from '@chakra-ui/react'
import { TabList } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { AxiosInstance, AxiosResponse } from 'axios'
import CustomAlert from './Core/CustomAlert'
import CookieList from './Response/CookieList'
import HeadersList from './Response/HeadersList'
import PreviewRes from './Response/PreviewRes'
import ResStatus from './Response/ResStatus'

interface CardResponseParam {
  result: null | AxiosInstance | AxiosResponse<any, any> | unknown
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
