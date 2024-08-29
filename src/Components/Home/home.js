import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/nav';
import { Box, Flex, Heading } from '@chakra-ui/react';
import {
  PieChart, Pie, Cell, Funnel, FunnelChart,
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from 'recharts';

const Home = () => {
  const [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    const fetchData = (key) => {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        try {
          return JSON.parse(storedData).Dashboard || [];
        } catch (error) {
          console.error(`Failed to parse ${key} data:`, error);
          return [];
        }
      } else {
        console.warn(`No ${key} data found in localStorage.`);
        return [];
      }
    };

    const combinedData = [
      ...fetchData('CSPM Dashboard'),
      ...fetchData('CWPP'),
      ...fetchData('IMAGE'),
    ];

    setDashboards(combinedData);
  }, []);

  const CspmCOLORS = ['#FF0000', '#FFBB28', '#008000', '#e3f6f5', '#7c73e6'];
  const CWPPCOLORS = ['#ffcbcb', '#a2a8d3', '#ffebbb', '#e3f6f5', '#7c73e6'];
  const ImageCOLORS = ['#f95959', '#c3bef0', '#f70776', '#e3f6f5', '#3ab1c8'];

  return (
    <Box>
      <Navbar />
      <Flex wrap="wrap">
        {dashboards.length > 0 ? (
          dashboards.map((dashboard, index) => (
            <Box key={index} m="20px" width={320} bgColor={'white'} borderRadius={12} p={13}>
              {dashboard['CSPM Dashboard'] && dashboard['CSPM Dashboard'].length > 0 && (
                <Box>
                  <Heading as='h4' size='xl'>{dashboard.name}</Heading>
                <Flex justifyContent={'center'} alignItems={'center'} mb={4}>
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
                        <Cell key={`cspm-cell-${i}`} fill={CspmCOLORS[i % CspmCOLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                  <Box ml={4}>
                    {dashboard['CSPM Dashboard'].map((item, i) => (
                      <Flex key={`cspm-legend-${i}`} alignItems="center" mb={2}>
                        <Box bgColor={CspmCOLORS[i % CspmCOLORS.length]} height={2} width={2} mr={2} />
                        <Heading as='h6' size='xs'>{item.name}</Heading>
                      </Flex>
                    ))}
                  </Box>
                </Flex>
                </Box>
              )}

              {dashboard['CWPP'] && dashboard['CWPP'].length > 0 && (
                <Box>
                  <Heading as='h4' size='xl'>{dashboard.name}</Heading>

                <Flex justifyContent={'center'} alignItems={'center'} mb={4}>
                  <FunnelChart width={200} height={200}>
                    <Funnel
                      data={dashboard['CWPP']}
                      cx={100}
                      cy={100}
                      innerRadius={60}
                      outerRadius={85}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dashboard['CWPP'].map((entry, i) => (
                        <Cell key={`cwpp-cell-${i}`} fill={CWPPCOLORS[i % CWPPCOLORS.length]} />
                      ))}
                    </Funnel>
                  </FunnelChart>
                  <Box ml={4}>
                    {dashboard['CWPP'].map((item, i) => (
                      <Flex key={`cwpp-legend-${i}`} alignItems="center" mb={2}>
                        <Box bgColor={CWPPCOLORS[i % CWPPCOLORS.length]} height={2} width={2} mr={2} />
                        <Heading as='h6' size='xs'>{item.name}</Heading>
                      </Flex>
                    ))}
                  </Box>
                </Flex>
                </Box>
              )}

              {dashboard['IMAGE'] && dashboard['IMAGE'].length > 0 && (
                <Box>
                  <Heading as='h4' size='xl'>{dashboard.name}</Heading>
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
                        <Cell key={`image-cell-${i}`} fill={ImageCOLORS[i % ImageCOLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                  <Box ml={4}>
                    {dashboard['IMAGE'].map((item, i) => (
                      <Flex key={`image-legend-${i}`} alignItems="center" mb={2}>
                        <Box bgColor={ImageCOLORS[i % ImageCOLORS.length]} height={2} width={2} mr={2} />
                        <Heading as='h6' size='xs'>{item.name}</Heading>
                      </Flex>
                    ))}
                  </Box>
                </Flex>
                </Box>
              )}
            </Box>
          ))
        ) : (
          <p>No dashboards available.</p>
        )}
      </Flex>
      
    </Box>
  );
};

export default Home;
