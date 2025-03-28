import React from 'react';
import { Pie } from 'react-chartjs-2';
import { CheckCircle, XCircle, Clock, CreditCard, Wallet, ShoppingCart } from 'lucide-react';
import { Chart as ChartJS, registerables } from 'chart.js';
import './Financial.scss';

ChartJS.register(...registerables);

const Financial = () => {
  const revenueData = {
    labels: ['Produits', 'Services', 'Abonnements'],
    datasets: [{
      label: 'Répartition des revenus',
      data: [45, 30, 25],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)'
      ],
      borderWidth: 0,
      hoverOffset: 8
    }]
  };

  const paymentHistory = [
    { 
      id: 1, 
      date: '2024-03-01', 
      product: 'Ordinateur Portable', 
      amount: 1200, 
      status: 'completed',
      method: 'credit-card'
    },
    { 
      id: 2, 
      date: '2024-03-02', 
      product: 'Souris Gaming', 
      amount: 45, 
      status: 'pending',
      method: 'paypal'
    },
    { 
      id: 3, 
      date: '2024-03-03', 
      product: 'Clavier Mécanique', 
      amount: 89, 
      status: 'cancelled',
      method: 'bank-transfer'
    }
  ];

  const StatusIcon = ({ status }) => {
    const icons = {
      completed: <CheckCircle className="status-icon completed" />,
      cancelled: <XCircle className="status-icon cancelled" />,
      pending: <Clock className="status-icon pending spin" />
    };
    return icons[status] || null;
  };

  const MethodIcon = ({ method }) => {
    const icons = {
      'credit-card': <CreditCard size={18} />,
      'paypal': <Wallet size={18} />,
      'bank-transfer': <ShoppingCart size={18} />
    };
    return icons[method] || null;
  };

  return (
    <div className="Financial">
      
      
      <div className="content-grid">
        <div className="chart-container glassmorphism">
          <h2 className="section-title">
            <span>Répartition des Revenus</span>
            <div className="legend">
              {revenueData.labels.map((label, index) => (
                <div key={label} className="legend-item">
                  <span 
                    className="color-dot" 
                    style={{ backgroundColor: revenueData.datasets[0].backgroundColor[index] }}
                  />
                  {label}
                </div>
              ))}
            </div>
          </h2>
          <Pie 
            data={revenueData} 
            options={{
              plugins: {
                legend: { display: false },
                tooltip: { 
                  bodyFont: { size: 12 },
                  padding: 12
                }
              }
            }}
          />
        </div>

        <div className="transactions-container glassmorphism">
          <h2 className="section-title">Historique des Transactions</h2>
          
          <div className="transactions-list">
            {paymentHistory.map(transaction => (
              <div 
                key={transaction.id} 
                className={`transaction-card ${transaction.status}`}
              >
                <div className="transaction-header">
                  <div className="method-icon">
                    <MethodIcon method={transaction.method} />
                  </div>
                  <div className="transaction-meta">
                    <span className="product">{transaction.product}</span>
                    <span className="date">{transaction.date}</span>
                  </div>
                  <StatusIcon status={transaction.status} />
                </div>

                <div className="transaction-details">
                  <div className="amount">
                    ${transaction.amount.toLocaleString()}
                  </div>
                  <div className={`status ${transaction.status}`}>
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financial;