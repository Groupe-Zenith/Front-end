import React  , {useState , useEffect}from "react";
import Card from "../../../../../components/admin/Card/Card";
import Chart from "../../../../../components/admin/Chart/Chart";
import "./Dashboard.scss";
import { useTranslation } from "react-i18next";
import useSocket from "../../../../../services/notificationService";


const Dashboard = () => {
  const { getAllPurchaseRequest, purchaseRequests } = useSocket();
  
  
  const [lineData, setLineData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aout", "Sept", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Demande d'achat mensuel",
        data: new Array(12).fill(0),
        fill: false,
        borderColor: "#5DC0DC",
        tension: 0.2,
        borderWidth: 2
      }
    ]
  })
const processMonthlyData = (requests) => {
  const monthlyCounts = new Array(12).fill(0);
  
  requests.forEach(request => {
    const date = new Date(request.createdAt);
    const month = date.getMonth(); 
    monthlyCounts[month]++;
  });

  return monthlyCounts;
};
const lineOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
      },
    },
  },
  animations: {
    tension: {
      duration: 800, 
      easing: "linear",
      from: 1,
      to: 0,
      loop: true,
    }
  },
  scales: {
    y: {
      min: 0,
      max: Math.max(...lineData.datasets[0].data) * 1.1,
    },
  },
};
  
  const {t} = useTranslation()
  const dashboardData = [
    { title: t("Card.Card1"), value: 200 },
    { title:  t("Card.Card2"), value: 150 },
    { title:  t("Card.Card3"), value: 80 }
];

useEffect(() => {
  getAllPurchaseRequest('pending');
}, [getAllPurchaseRequest]);

useEffect(() => {
  if (purchaseRequests.length > 0) {
    const counts = processMonthlyData(purchaseRequests);
    setLineData(prev => ({
      ...prev,
      datasets: [{
        ...prev.datasets[0],
        data: counts
      }]
    }));
  }
}, [purchaseRequests]);
    return (
        <div className="dashboard">
            <div className="card-container">
                {dashboardData.map((item, index) => (
                    <Card key={index} title={item.title} value={item.value} />
                ))}
            </div>
            <div className="chart-container">
                <Chart data={lineData} options={lineOptions} />
            </div>
        </div>
    );
};

export default Dashboard;