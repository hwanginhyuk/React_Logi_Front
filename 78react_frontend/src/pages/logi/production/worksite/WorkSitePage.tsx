import React, { useState } from 'react';
import { Box, Tab, Tabs, Theme, useTheme } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Page from 'components/ui-component/Page';
import PropTypes from 'prop-types';
import Layout from 'layout';
import WorkSite from './WorkSite';
import WorkSiteLog from './WorkSiteLog';

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

const WorkSitePage = () => {
  const theme: Theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
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
          <Tab label="작업장" {...a11yProps(0)} />
          <Tab label="작업장 로그" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <WorkSite />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <WorkSiteLog />
        </TabPanel>
      </MainCard>
    </Page>
  );
}

WorkSitePage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default WorkSitePage
