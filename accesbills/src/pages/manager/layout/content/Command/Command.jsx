import React, { useState } from "react";
import ClickableDataTable from "../../../../../components/common/dataTabs/ClickableDataTable";
import OrderForm from "../../../../../components/manager/NewOrderModal";
import "./Command.scss";

const columns = [
  { key: "orderId", label: "Order ID" },
  { key: "requester", label: "Requester" },
  { key: "quantity", label: "Quantity" },
  { key: "price", label: "Price" },
  { key: "supplier", label: "Supplier" },
];

const data = [
  {
    orderId: "CMD12345",
    requester: "John Doe",
    quantity: 10,
    price: "$500",
    supplier: "Supplier A",
    details: "10 units of premium product X with safety certification",
    photos: [
      "https://example.com/product-x-1.jpg",
      "https://example.com/product-x-2.jpg"
    ],
    deliveryDate: "2023-12-15",
    status: "Pending"
  },
  {
    orderId: "CMD67890",
    requester: "Jane Smith",
    quantity: 5,
    price: "$250",
    supplier: "Supplier B",
    details: "5 units of industrial product Y with custom packaging",
    photos: [
      "https://example.com/product-y-1.jpg"
    ],
    deliveryDate: "2024-01-10",
    status: "Approved"
  },
];

const CommandList = () => {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  const openOrderForm = () => setIsOrderFormOpen(true);
  const closeOrderForm = () => setIsOrderFormOpen(false);

  const handleAddOrder = (orderData) => {
    console.log("New Order Submitted:", orderData);
    closeOrderForm();
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const closeOrderDetails = () => {
    setIsOrderDetailsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="CommandList">
      <ClickableDataTable
        title="Order List"
        description="List of orders made by managers"
        searchPlaceholder="Search orders..."
        actionButtonText="Add Order"
        columns={columns}
        data={data}
        onActionClick={openOrderForm}
        onRowClick={handleRowClick}
        onApprove={(order) => console.log("Approve:", order)}
        onReject={(order) => console.log("Reject:", order)}
      />

      {/* Add Order Modal */}
      {isOrderFormOpen && (
        <OrderForm
          isOpen={isOrderFormOpen}
          onClose={closeOrderForm}
          onSubmit={handleAddOrder}
          key={Date.now()}
        />
      )}

      {/* Order Details Modal */}
      {isOrderDetailsOpen && selectedOrder && (
  <div className="order-details-modal" onClick={closeOrderDetails}>
    <div className="order-details-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>Order Details - {selectedOrder.orderId}</h2>
        <button className="close-btn" onClick={closeOrderDetails}>×</button>
      </div>
      
      <div className="details-grid">
        <div className="photo-container">
          {selectedOrder.photos?.[0] && (
            <img 
              src={selectedOrder.photos[0]} 
              alt="Product preview" 
              className="main-product-photo"
            />
          )}
        </div>
              
              <div className="order-info">
                <p><strong>Delivery Date:</strong> {selectedOrder.deliveryDate}</p>
                <p><strong>Requester:</strong> {selectedOrder.requester}</p>
                <p><strong>Status:</strong> 
                  <span className={`status-tag ${selectedOrder.status.toLowerCase()}`}>
                    {selectedOrder.status}
                  </span>
                </p>
                <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                <p><strong>Price:</strong> {selectedOrder.price}</p>
                <p><strong>Supplier:</strong> {selectedOrder.supplier}</p>
                <p><strong>Details:</strong> {selectedOrder.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandList;