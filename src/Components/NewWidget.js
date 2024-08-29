import {
    AlertDialog, Box, AlertDialogBody, AlertDialogFooter, Button, Flex, Text, Heading,
    TabList, Tab, TabPanel, TabPanels, Tabs,
    Checkbox
  } from '@chakra-ui/react';
  import React, { useState, useEffect } from 'react';
  import { CloseIcon } from '@chakra-ui/icons';
  import Form from './Form';
  
  const NewWidget = ({ setAddFormOpen }) => {
    const [isOpenCSPMNew, setOpenCSPMNew] = useState(false);
    const [isOpenCWPPNew, setOpenCWPPNew] = useState(false);
    const [isOpenImageNew, setOpenImageNew] = useState(false);
  
    const [cspmDashboards, setCspmDashboards] = useState([]);
    const [cwppDashboards, setCwppDashboards] = useState([]);
    const [imageDashboards, setImageDashboards] = useState([]);
  
    useEffect(() => {
      const loadDashboards = (key, setDashboards) => {
        const storedData = localStorage.getItem(key);
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            setDashboards(parsedData.Dashboard);
          } catch (error) {
            console.error(`Failed to parse ${key} data:`, error);
          }
        } else {
          console.warn(`No data found in localStorage for ${key}.`);
        }
      };
  
      loadDashboards('CSPM Dashboard', setCspmDashboards);
      loadDashboards('CWPP', setCwppDashboards);
      loadDashboards('IMAGE', setImageDashboards);
    }, []);
  
    const handleDelete = (name, dashboards, setDashboards, storageKey) => {
      const updatedDashboards = dashboards.filter(dashboard => dashboard.name !== name);
      localStorage.setItem(storageKey, JSON.stringify({ Dashboard: updatedDashboards }));
      setDashboards(updatedDashboards);
      window.location.reload()
    };
  
    return (
      <AlertDialog isOpen={true}>
        <Box position={'fixed'} bgColor={'white'} w={'60vw'} right={0} h={'100%'} mb={3}>
          <AlertDialogBody p={0}>
            <Flex height={'50px'} bgColor={'#14147d'} justifyContent={'space-between'} alignItems={'center'} p={'14px'}>
              <Text color={'whitesmoke'}>Add Widget</Text>
              <CloseIcon color={'whitesmoke'} onClick={() => { setAddFormOpen(false) }} />
            </Flex>
            <Heading as='h3' size='lg'>Personalize your dashboard by adding the following widget</Heading>
            <Tabs>
              <TabList>
                <Tab>CSPM Dashboard</Tab>
                <Tab>CWPP</Tab>
                <Tab>IMAGE</Tab>
              </TabList>
              <TabPanels>
                {/* CSPM Dashboard Tab */}
                <TabPanel>
                  <Box>
                    {cspmDashboards.map((dashboard, idx) => (
                      <Box key={idx}>
                        <Checkbox
                          margin={2}
                          onChange={() => handleDelete(dashboard.name, cspmDashboards, setCspmDashboards, 'CSPM Dashboard')}
                          defaultChecked
                        >
                          {dashboard.name}
                        </Checkbox>
                      </Box>
                    ))}
                    <Button marginTop={5} onClick={() => setOpenCSPMNew(true)}>Add New Widget</Button>
                    {isOpenCSPMNew && <Form setAddFormOpen={setAddFormOpen} DashboardName={'CSPM Dashboard'} />}
                  </Box>
                </TabPanel>
                
                {/* CWPP Tab */}
                <TabPanel>
                  <Box>
                    {cwppDashboards.map((dashboard, idx) => (
                      <Box key={idx}>
                        <Checkbox
                          margin={2}
                          onChange={() => handleDelete(dashboard.name, cwppDashboards, setCwppDashboards, 'CWPP')}
                          defaultChecked
                        >
                          {dashboard.name}
                        </Checkbox>
                      </Box>
                    ))}
                    <Button onClick={() => setOpenCWPPNew(true)}>Add New Widget</Button>
                    {isOpenCWPPNew && <Form setAddFormOpen={setAddFormOpen} DashboardName={'CWPP'} />}
                  </Box>
                </TabPanel>
                
                {/* IMAGE Tab */}
                <TabPanel>
                  <Box>
                    {imageDashboards.map((dashboard, idx) => (
                      <Box key={idx}>
                        <Checkbox
                          margin={2}
                          onChange={() => handleDelete(dashboard.name, imageDashboards, setImageDashboards, 'IMAGE')}
                          defaultChecked
                        >
                          {dashboard.name}
                        </Checkbox>
                      </Box>
                    ))}
                    <Button onClick={() => setOpenImageNew(true)}>Add New Widget</Button>
                    {isOpenImageNew && <Form setAddFormOpen={setAddFormOpen} DashboardName={'IMAGE'} />}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </AlertDialogBody>
          <AlertDialogFooter justifyContent={'flex-start'}></AlertDialogFooter>
        </Box>
      </AlertDialog>
    );
  };
  
  export default NewWidget;
  