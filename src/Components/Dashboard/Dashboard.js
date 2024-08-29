
// import './App.css';
import { useState } from 'react';
import { Box, Flex, Heading, Button} from '@chakra-ui/react'
import CspmDashboard from '../CspmDashboard';
import NewWidget from '../NewWidget';
import CWPPdashboard from '../CWPPdashboard';
import ImageDashboard from '../ImageDashboard';
import Navbar from '../Navbar/nav'
function Dashboard() {
  const [isAddFormOpen, setAddFormOpen]= useState(false)
  
  return (
    <Box className="App" position={'absolute'} width={'100%'} bgColor={'#edf2f7'}  >
     <Navbar/>
      <Flex margin={'20px'} justifyContent={'space-around'}   >
      <Heading as='h2' size='2xl'  >CNAPP Dashboard</Heading>
      
        <Button colorScheme='teal' size='md' onClick={()=>{setAddFormOpen(!isAddFormOpen)}}>Add Widget</Button>
      </Flex>
      <CspmDashboard setAddFormOpen={setAddFormOpen} isAddFormOpen={isAddFormOpen} />
      <CWPPdashboard />
      <ImageDashboard/>
      {isAddFormOpen?
      <Flex 
      position={'fixed'}
      right={0}
      height={'100vh'}
      
       ><NewWidget setAddFormOpen={setAddFormOpen}/> </Flex>  : null}
    </Box>
  );
}

export default Dashboard;
