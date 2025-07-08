import './App.css'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import ModalForm from './components/ModalForm'
import FactList from './components/FactList'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [isOpen, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState('insert');
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [studentData, setStudentData] = useState<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  // const fetchClients = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/students");
  //       console.log(response.data); // <--- See what is logged
  //       setTableData(response.data);
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //       }
  //     }
  //   };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchClients = async () => {
        try {
          const response  = await axios.get('http://localhost:3000/api/students')
          setTableData(response.data); // Set the fetched data

        } catch (err) {
          if (err instanceof Error) {
            console.error('Error fetching clients:', err.message);
          } else {
            console.error('An unknown error occurred while fetching clients.');
          }
        }
    };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleOpen = (mode : string, client: any = null) => {
    setModalMode(mode);
    setStudentData(client); // Set client data if provided
    setOpen(true);
  }

  const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this client?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/students/${id}`); // API call to delete client
                setTableData((prevData) => prevData.filter(client => client.id !== id)); // Update state
            } catch (err) {
                if (err instanceof Error) {
                  console.error('Error fetching clients:', err.message);
                } else {
                  console.error('An unknown error occurred while fetching clients.');
                }
            }
        }
    };

  const handleSubmit = async (newStudentData : any) => {
    if (modalMode === 'insert') {
      console.log("Modal mode is insert");
      try {
        const response = await axios.post('http://localhost:3000/api/students', newStudentData); // Replace with your actual API URL
        console.log('student added:', response.data); // Log the response
        setTableData((prevData) => [...prevData, response.data]);
        } catch (error) {
            console.error('Error adding client:', error); // Log any errors
        }
      console.log('modal mode Add');

    } else {
      console.log('Updating client with ID:', studentData.id);
        try {
        const response = await axios.put(`http://localhost:3000/api/students/${studentData.id}`, newStudentData); // Replace with your actual API URL
        console.log('student updated:', response.data); // Log the response
        setTableData((prevData) => prevData.map((item) => (item.id === response.data.id ? response.data : item)));
        } catch (error) {
            console.error('Error adding client:', error); // Log any errors
        }
    }
    setOpen(false); 
  }

  return (
    <>
      <NavBar onOpen={() => {handleOpen('insert')}} onSearch={setSearchTerm}/>
      <TableList tableData={tableData} setTableData={setTableData} onOpen={(mode, client) => handleOpen(mode, client)} searchTerm={searchTerm} handleDelete={handleDelete}/>
      <ModalForm isOpen={isOpen} mode={modalMode} onClose={() => setOpen(false)} OnSubmit={handleSubmit} studentData={studentData}/>
      <FactList />
    </>
  )
}

export default App
