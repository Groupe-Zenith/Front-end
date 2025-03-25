const StatsCard = ({ title, value, color }) => {
    return (
      <div className={`p-6 rounded-lg shadow ${color.split(' ')[0]}`}>
        <h4 className="text-sm font-medium mb-1">{title}</h4>
        <p className={`text-2xl font-bold ${color.split(' ')[1]}`}>{value}</p>
      </div>
    );
  };
  
  export default StatsCard;