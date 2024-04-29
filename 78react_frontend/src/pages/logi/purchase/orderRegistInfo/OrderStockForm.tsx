import React, { ReactElement, useState } from 'react';
import { Box, Tab, Tabs, Theme, useTheme } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Page from 'components/ui-component/Page';
import Layout from 'layout';
import OrderRegistForm from './OrderRegistForm';
import ShowOrderInfoForm from './ShowOrderInfoForm';

/**
 * [78inhyuk]
 * 오류 수정 및 소스코드 가시성 향상
 * @param param0 
 * @returns 
 */

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const OrderStockForm = () => {
  const theme: Theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Page title="Client Information">
      <MainCard>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="simple tabs example"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'bold',
              minHeight: 'auto',
              minWidth: 10,
              px: 1,
              py: 1.5,
              mr: 2.25,
              color: theme.palette.grey[600],
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            },
            '& .Mui-selected': {
              color: theme.palette.secondary.main
            },
            '& .MuiTab-wrapper > svg': {
              marginBottom: '0px !important',
              marginRight: 1.25
            },
            mb: 3
          }}
        >
          <Tab label="발주" {...a11yProps(0)} />
          <Tab label="발주현황" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <OrderRegistForm />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <ShowOrderInfoForm /> 
        </TabPanel>

      </MainCard>
    </Page>
  );
}

OrderStockForm.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default OrderStockForm
