import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, CartesianGrid,XAxis, YAxis, Tooltip,
    Legend
 } from 'recharts';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import NewWidget from './NewWidget';

const ImageDashboard= () => {
  const [dashboards, setDashboards] = useState([]);
  const [isAddFormOpen, setAddFormOpen] = useState(false);
  useEffect(() => {
    const storedData = localStorage.getItem('IMAGE'); 
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setDashboards(parsedData.Dashboard);
        console.log(parsedData)

      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
      }
    } else {
      console.warn("No data found in localStorage.");
    }
  }, []);

  const handleDelete=async (name)=>{
    const updatedDashboards = dashboards.filter(dashboard => dashboard.name !== name);

    localStorage.setItem('IMAGE', JSON.stringify({ Dashboard: updatedDashboards }));
    setDashboards(updatedDashboards);
  }
  const handleAddWidgetClick = () => {
    setAddFormOpen(!isAddFormOpen);
  }

  const COLORS = ['#f95959', '#c3bef0', '#f70776', '#e3f6f5', '#3ab1c8'];

  return (
    <Box>
       <Heading as="h3" size="lg" marginBottom={6} margin={'20px'}>
        CWPP Dashboards
      </Heading>
      
      <Flex>
      <Flex>
        {dashboards.length > 0 ? (
          dashboards.map((dashboard, index) => (
            <Box key={index} style={{ margin: '20px' }}  >

              {dashboard['IMAGE'] && dashboard['IMAGE'].length > 0 ? (

                <Box width={320} bgColor={'white'} borderRadius={12} padding={13} >
                  <Flex justifyContent={'space-between'}>
                  <Heading as='h4' size='xl'>{dashboard.name}</Heading>
                  <DeleteIcon 
                  cursor="pointer" 
                  color="red.800" 
                  onClick={() => handleDelete(dashboard.name)} // Handle delete on click
                />
                  </Flex>
                  
                  <Flex justifyContent={'center'} alignItems={'center'}>
                      <BarChart 
                        width={250} 
                        height={250} 
                        data={dashboard['IMAGE']}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8">
                          {dashboard['IMAGE'].map((entry, i) => (
                            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                  <Box>
                  {dashboard['IMAGE'].map((item, i) => (
                    <Flex>
                      <Box key={`cell-${i}`} bgColor={COLORS[i % COLORS.length]} height={2} width={2} margin={2} />
                      <Heading as='h6' size='xs'>{item.name}</Heading>
                    </Flex>
                  ))}
                  </Box>
                  
                  </Flex>
                  
                </Box>
              ) : (
                <p>No data available for {dashboard.name}.</p>
              )}
             
            </Box>
          ))
        ) : (
          null
        )}
      </Flex>
      <Flex height={270} margin={'20px'} width={320} bgColor={'white'} borderRadius={12} justifyContent={'center'} alignItems={'center'}>
          <Button onClick={handleAddWidgetClick} >Add Widget</Button>
      </Flex>
      </Flex>
      
      {isAddFormOpen && (
        <Flex 
          position={'fixed'}
          right={0}
          height={'100vh'}
        >
          <NewWidget setAddFormOpen={setAddFormOpen} /> 
        </Flex>
      )}

    </Box>
  );
};

export default ImageDashboard;
