import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import NewWidget from './NewWidget';

const CspmDashboards = () => {
  const [dashboards, setDashboards] = useState([]);
  const [isAddFormOpen, setAddFormOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('CSPM Dashboard'); 
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setDashboards(parsedData.Dashboard);
        console.log(parsedData);

      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
      }
    } else {
      console.warn("No data found in localStorage.");
    }
  }, []);

  const handleDelete = async (name) => {
    const updatedDashboards = dashboards.filter(dashboard => dashboard.name !== name);

    localStorage.setItem('CSPM Dashboard', JSON.stringify({ Dashboard: updatedDashboards }));
    setDashboards(updatedDashboards);
  }

  const handleAddWidgetClick = () => {
    setAddFormOpen(!isAddFormOpen);
  }

  const COLORS = ['#FF0000', '#FFBB28', '#008000', '#e3f6f5', '#7c73e6'];

  return (
    <Box>
      <Heading as="h3" size="lg" marginBottom={6} margin={'20px'}>
        CSPM Dashboards
      </Heading>
      
      <Flex>
        <Flex>
          {dashboards.length > 0 ? (
            dashboards.map((dashboard, index) => (
              <Box key={index} style={{ margin: '20px' }}  >
                {dashboard['CSPM Dashboard'] && dashboard['CSPM Dashboard'].length > 0 ? (
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
                      <PieChart width={200} height={200}>
                        <Pie
                          data={dashboard['CSPM Dashboard']}
                          cx={100}
                          cy={100}
                          innerRadius={60}
                          outerRadius={85}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {dashboard['CSPM Dashboard'].map((entry, i) => (
                            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                      <Box>
                        {dashboard['CSPM Dashboard'].map((item, i) => (
                          <Flex key={`legend-${i}`}>
                            <Box bgColor={COLORS[i % COLORS.length]} height={2} width={2} margin={2} />
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
            <p>No dashboards available.</p>
          )}
        </Flex>
        <Flex height={270} margin={'20px'} width={320} bgColor={'white'} borderRadius={12} justifyContent={'center'} alignItems={'center'}>
          <Button onClick={handleAddWidgetClick}>Add Widget</Button>
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

export default CspmDashboards;
