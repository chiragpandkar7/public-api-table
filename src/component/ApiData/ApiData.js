import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';

const columns = [
  { field: 'API', headerName: 'API', width: 200 },
  { field: 'Description', headerName: 'Description', width: 400 },
  { field: 'Auth', headerName: 'Auth', width: 100 },
  { field: 'HTTPS', headerName: 'HTTPS', width: 100 },
  { field: 'Cors', headerName: 'Cors', width: 50 },
  { field: 'Link', headerName: 'Link', width: 200 },
  { field: 'Category', headerName: 'Category', width: 200 },
];

const generateRowsWithIds = (apiData) => {
  return apiData.map((row, index) => ({ ...row, id: index + 1 }));
};

const ApiData = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.publicapis.org/entries');
        setApiData(response.data.entries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const rowsWithIds = generateRowsWithIds(apiData);

  return (
    
    <div style={{ height: 800, width: '100%', marginTop: '20px' }}>
        <Typography>
            <h3>Public APIs</h3>
        </Typography>
        <DataGrid
            rows={rowsWithIds}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
        />
    </div>
  );
};

export default ApiData;
