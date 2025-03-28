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
    price: "Ar 500",
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
    price: "Ar 250",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [price, setPrice] = useState("");

  // Filtrer les données en fonction du texte de recherche
  const filteredData = data.filter((order) => {
    const query = searchQuery.toLowerCase();
    return (
      order.orderId.toLowerCase().includes(query) ||
      order.requester.toLowerCase().includes(query) ||
      order.supplier.toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query) ||
      order.details.toLowerCase().includes(query)
    );
  });

  const openOrderForm = () => setIsOrderFormOpen(true);
  const closeOrderForm = () => setIsOrderFormOpen(false);

  const handleAddOrder = (orderData) => {
    console.log("New Order Submitted:", orderData);
    closeOrderForm();
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    // Mettez à jour le state du prix si besoin d'édition
    setPrice(order.price);
    setIsOrderDetailsOpen(true);
  };

  const closeOrderDetails = () => {
    setIsOrderDetailsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="CommandList">
      <ClickableDataTable
        title="Commande"
        description="List des commandes à faire"
        searchPlaceholder="Recherche..."
        columns={columns}
        data={filteredData}
        onSearch={(value) => setSearchQuery(value)}
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
              <h2>Details de la commande - {selectedOrder.orderId}</h2>
              <button className="close-btn" onClick={closeOrderDetails}>
                ×
              </button>
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
                <p>
                  <strong>Date:</strong> {selectedOrder.deliveryDate}
                </p>
                <p>
                  <strong>Demandeur :</strong> {selectedOrder.requester}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status-tag ${selectedOrder.status.toLowerCase()}`}>
                    {selectedOrder.status}
                  </span>
                </p>
                <p>
                  <strong>Quantite:</strong> {selectedOrder.quantity}
                </p>
                <p>
                  <strong>Prix:</strong>{" "}
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="price-input"
                  />
                </p>
                <p>
                  <strong>Fourniseur:</strong> {selectedOrder.supplier}
                </p>
                <p>
                  <strong>Details:</strong> {selectedOrder.details}
                </p>
              </div>
              <div className="btn-container"><button className="btn-ok">Confirmer</button></div>
              
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandList;
