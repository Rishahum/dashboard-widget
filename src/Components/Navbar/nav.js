import React, { useEffect, useState } from 'react'
import { Box, HStack, InputGroup,InputLeftAddon, Input, Spacer, IconButton,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  Button,Text
 } from '@chakra-ui/react'
import { SearchIcon, SettingsIcon, BellIcon,ChevronRightIcon } from '@chakra-ui/icons'


const Nav = () => {
  const [dashboards, setDashboards] = useState([]);
  const [SearchItemShow, setSearchItemShow] = useState(false);
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
const handleSearch=(name)=>{
  const nameExist = dashboards.some(chart => chart.name === name);
  setSearchItemShow(nameExist);
  

}

  return (
<>
 <Box bgColor="white" px={4} py={2} shadow="md" p={20}>
 <HStack spacing={4} align="center">
  
 
 <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
  <BreadcrumbItem>
    <BreadcrumbLink href='/'>Home</BreadcrumbLink>

  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
  </BreadcrumbItem>

</Breadcrumb>
   <Spacer/>

   <InputGroup width={400}>
     <InputLeftAddon>
       <SearchIcon 
       bgColor={'#f0f5fa'}
       />
     </InputLeftAddon>
     
     <Input variant='filled' 
     borderRadius="md"
     placeholder='search' 
     onInput={(e)=>{handleSearch(e.target.value)}}
     />
   </InputGroup>

   <Spacer />
   <HStack spacing={4}>
     <IconButton
       aria-label="Notifications"
       icon={<BellIcon />}
       variant="ghost"
     />
     <IconButton
       aria-label="Settings"
       icon={<SettingsIcon />}
       variant="ghost"
     />
     <Button 
     onClick={handleSearch}
     >Click Me</Button>
   </HStack>
 </HStack>
 
</Box>
{
  SearchItemShow? 
  <Box position={'absolute'}
  zIndex={1}
  bgColor={'red'}
  height={320}
  width={320}
  >
<Text>dashboard</Text>
  </Box>
  : null
 }
 
 </>
  )
}

export default Nav