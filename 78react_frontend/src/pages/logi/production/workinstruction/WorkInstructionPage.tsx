import React, { useState } from 'react';
import { Box, Tab, Tabs, Theme, useTheme } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Page from 'components/ui-component/Page';
import Layout from 'layout';
import WorkInstruction from './WorkInstruction';
import WorkOrderStatus from './WorkOrderStatus';
import WorkPerformanceManagement from './WorkPerformanceManagement';
import { ReactElement } from 'react-markdown/lib/react-markdown';

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

/**
 * [78inhyuk]
 * useTheme :  컴포넌트에서 테마 속성을 가져오는 데 사용, 아래는 useTheme의 속성
 *  customShadows: customShadows;
 * customization: Typography;
 * darkTextSecondary: string;
 * textDark: string;
 * grey500: string;
 * darkTextPrimary: string;
 * 다크모드 라이트모드에 따라 컴포넌트의 스타일이 달라지도록 설정
 * 혹은 정의된 색상을 사용하여 컴포넌트 스타일링할 때 사용
 */

const WorkInstructionPage = () => {
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
          <Tab label="작업지시" {...a11yProps(0)} />
          <Tab label="작업지시현황" {...a11yProps(1)} />
          <Tab label="생산실적관리"  {...a11yProps(2)}/>
        </Tabs>

        <TabPanel value={value} index={0}>
          <WorkInstruction />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <WorkOrderStatus />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <WorkPerformanceManagement />
        </TabPanel>
      </MainCard>
    </Page>
  );
}

WorkInstructionPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default WorkInstructionPage
