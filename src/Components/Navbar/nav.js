import React from 'react'
import { Box, HStack, InputGroup,InputLeftAddon, Input, Spacer, IconButton,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink
 } from '@chakra-ui/react'
import { SearchIcon, SettingsIcon, BellIcon,ChevronRightIcon } from '@chakra-ui/icons'


const nav = () => {
  
  return (

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
     placeholder='search'  />
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
   </HStack>
 </HStack>
</Box>
  )
}

export default nav