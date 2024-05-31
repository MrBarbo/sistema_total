import React, { useState, useEffect } from 'react';
import Navbar from '../components/Nav-bar';
import Sidebar from '../components/Sidebar';
import StockEditModal from '../components/StockEditModal';
import StockCreateModal from '../components/StockCreateModal';
import './styles/Stock.css';

const StockPage = () => {
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/stock/`);
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  };

  const handleEditStock = async (stockId, updatedStock) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/stock/${stockId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStock),
      });
      const updated = await response.json();
      setStockData(stockData.map(stock => stock.id === stockId ? updated : stock));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleCreateStock = async (newStock) => {
    try {
      // Ensure the date is formatted correctly
      if (newStock.Vencimiento) {
        newStock.Vencimiento = new Date(newStock.Vencimiento).toISOString();
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStock),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error creating task:', response.statusText, errorText);
        return;
      }

      const createdStock = await response.json();
      setStockData([...stockData, createdStock]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating stock:', error);
    }
  };

  const handleIncreaseQuantity = async (stockId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/stock/${stockId}/increase`, {
        method: 'PATCH',
      });
      const updated = await response.json();
      setStockData(stockData.map(stock => stock.id === stockId ? updated : stock));
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecreaseQuantity = async (stockId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/stock/${stockId}/decrease`, {
        method: 'PATCH',
      });
      const updated = await response.json();
      setStockData(stockData.map(stock => stock.id === stockId ? updated : stock));
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/stock/download/pdf`, {
        method: 'GET',
        responseType: 'blob', // Specify the response type as blob
      });

      // Create a blob object from the response
      const blob = await response.blob();

      // Create a temporary URL for the blob object
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Reporte_Stock.pdf'); // Set the download attribute
      document.body.appendChild(link);

      // Trigger the click event to start the download
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const openEditModal = (stock) => {
    setSelectedStock(stock);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedStock(null);
    setIsEditModalOpen(false);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className='full'>
      <Navbar isLoggedIn={true} />
      <div className='box'>
        <div className='sidebar-box'>
          <Sidebar role={'Administrador'} />
        </div>
        <div className='content'>
          <h2>Stock</h2>
          <ul>
            <li className='list-header'>
              <span>Producto</span>
              <span>Droga</span>
              <span>Acción</span>
              <span>Cantidad</span>
              <span>Expiración</span>
              <span>Acciones</span>
            </li>
            {stockData.map((product) => (
              <li className='list' key={product.id}>
                <span>{product.Producto}</span>
                <span>{product.Droga}</span>
                <span>{product.Accion}</span>
                <span>{product.Cantidad}</span>
                <div className='stock-quantity-buttons'>
                  <button className='button-add-stock' onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                  <button className='button-decrease-stock' onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                </div>
                <span>{new Date(product.Vencimiento).toLocaleDateString()}</span>
                <button className='button-edit' onClick={() => openEditModal(product)}>Edit</button>
              </li>
            ))}
          </ul>
          {isEditModalOpen && (
            <StockEditModal
              stock={selectedStock}
              onEditStock={handleEditStock}
              onClose={closeEditModal}
            />
          )}
          {isCreateModalOpen && (
            <StockCreateModal
              onCreateStock={handleCreateStock}
              onClose={closeCreateModal}
            />
          )}
          <button className='add-product-button' onClick={openCreateModal}>Añadir Producto</button>
          <button className='download-pdf-button' onClick={handleDownloadPDF}>Descargar PDF</button>
        </div>
      </div>
    </div>
  );
};

export default StockPage;
