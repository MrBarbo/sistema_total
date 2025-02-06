import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StockEditModal from '../components/StockEditModal';
import StockCreateModal from '../components/StockCreateModal';
import './styles/Stock.css';
import Cookies from 'js-cookie';

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
      if (newStock.Vencimiento) {
        newStock.Vencimiento = new Date(newStock.Vencimiento).toISOString();
      }
      newStock.Sede = Cookies.get('location');
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
        responseType: 'blob',
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Reporte_Stock.pdf');
      document.body.appendChild(link);
      link.click();
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
      <div className='box'>
        <div className='sidebar-box'>
          <Sidebar role={'Administrador'} />
        </div>
        <div className='content'>
          <h2>Stock</h2>
          <div className="list-header-container">
            <span className="list-header-item">Producto</span>
            <span className="list-header-item">Droga</span>
            <span className="list-header-item">Acción</span>
            <span className="list-header-item">Cantidad</span>
            <span className="list-header-item">Agregar/Quitar</span>
            <span className="list-header-item">Expiración</span>
          </div>
          <ul>
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
                <button className='button-edit' onClick={() => openEditModal(product)}>Editar</button>
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
