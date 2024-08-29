import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Box, Flex, Button, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import DataEntries from './DataEntries';
const Form = ({ setAddFormOpen, DashboardName }) => {
  const [inputFields, setInputField] = useState([]); 
  const [GraphName, setGraphName] = useState('')
  
  const handleNameChange = (index, newName) => {
    const updatedFields = [...inputFields];
    if (index >= 0 && index < updatedFields.length) {
      updatedFields[index].name = newName;
      setInputField(updatedFields);
    }
  };
  const handleValueChange = (index, newValue) => {
    const updatedFields = [...inputFields];
    if (index >= 0 && index < updatedFields.length) {
      updatedFields[index].value = newValue;
      setInputField(updatedFields);
    }
  };
  const DataName = (name)=>{
    setGraphName(name)
  }

  const handleAddField = () => {
    setInputField([...inputFields, { name: '', value: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const graphName = DashboardName;
    
    const newPeople = inputFields.map((field, index) => ({
      id: index + 1,
      name: field.name,
      value: field.value,
    }));
  
    saveDataToLocalStorage(GraphName, graphName,  newPeople);
    window.location.reload()
  };
  
  const saveDataToLocalStorage = (graphName, category, newPeople) => {
    const storedData = localStorage.getItem(`${DashboardName}`);
    let updatedData = storedData ? JSON.parse(storedData) : { Dashboard: [] };
 
    const existingGraph = updatedData.Dashboard.find(graph => graph.name === graphName);
  
    if (existingGraph) {
      if (existingGraph[category]) {
        existingGraph[category] = [...existingGraph[category], ...newPeople];
      } else {
        existingGraph[category] = newPeople;
      }
    } else {
      updatedData.Dashboard.push({
        name: graphName,
        [category]: newPeople
      });
    }
  
    localStorage.setItem(`${DashboardName}`, JSON.stringify(updatedData));
    alert('Data saved to localStorage!');
  };
  
  
  return (
    <FormControl>
      <Flex margin={20} ml={0} alignItems="center">
        <FormLabel>Name of data</FormLabel>
        <Input type="text" width={320} onChange={(e)=>{DataName(e.target.value)}} placeholder="Enter the name" />
        <Box bgColor="#f0f5fa" p={2} onClick={handleAddField} cursor="pointer">
          <AddIcon />
        </Box>
      </Flex>

      {inputFields.length === 0 ? (
        <Flex justifyContent="center" alignItems="center" direction="column" mt={5}>
          <Text>No input fields available. Click the + icon to add a field.</Text>
        </Flex>
      ) : (
        inputFields.map((_, index) => (
          <DataEntries
            key={index}
            index={index}
            handleNameChange={handleNameChange}
            handleValueChange={handleValueChange}
          />
        ))
      )}

      <Flex bottom={0} mt={4}>
        <Button colorScheme="pink" w="30vw" onClick={handleSubmit} isDisabled={inputFields.length === 0}>
          Submit
        </Button>
        <Button w="30vw" ml="3vw" onClick={() => setAddFormOpen(false)}>
          Cancel
        </Button>
      </Flex>
    </FormControl>
  );
};

export default Form;
