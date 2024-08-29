import React from 'react'
import { Box, FormControl, FormLabel, Flex,Input } from '@chakra-ui/react'
const DataEntries = ({index,handleNameChange, handleValueChange}) => {
    
   
    
    return (
        <Box>
            <FormControl>
                <Flex>
                <Flex>
                <FormLabel>Name</FormLabel>
                <Input type='text' width={320} 
                 onChange={(e) => handleNameChange(index,e.target.value)} 
                 />
                </Flex>
           
            <Flex ml={5} mb={5} >
                <FormLabel>value</FormLabel>
                <Input type='number' width={320} 
                onChange={(e)=>handleValueChange(index, Number(e.target.value))}
                 />
            </Flex>
            </Flex>
            </FormControl>
            
        </Box>
    )
}

export default DataEntries