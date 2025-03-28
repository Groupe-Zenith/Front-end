import { CheckCircle, XCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import './ClickableDataTable.scss';

const ClickableDataTable = ({
  title,
  description,
  searchPlaceholder,
  actionButtonText,
  columns,
  data,
  onActionClick,
  onRowClick,
  onApprove,
  onReject
}) => {
  const handleRowClick = (item, e) => {
    // Empêche le déclenchement lors d'un clic sur les boutons
    if (!e.target.closest('button')) {
      onRowClick(item);
    }
  };

  return (
    <div className="data-table-container">
      <div className="header-section">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      
      <div className="content-section">
        <div className="controls-wrapper">
          <div className="search-container">
            <input 
              placeholder={searchPlaceholder}
              className="search-input"
              type="search"
            />
          </div>
          
          {actionButtonText && (
            <button 
            className="action-button" 
            onClick={(e) => {
              e.stopPropagation(); // <-- Ajouter cette ligne
              onActionClick();
            }}
          >
            {actionButtonText}
          </button>
          )}
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column.label}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            
            <tbody>
              {data.map((item, rowIndex) => (
                <tr 
                  key={rowIndex}
                  onClick={(e) => handleRowClick(item, e)}
                  className="clickable-row"
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>{item[column.key]}</td>
                  ))}
                  
                  <td className="actions-cell"  style={{gap:20}} >
                    <button
                      className="icon-btn approve"
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprove(item);
                      }}
                      style={{ color:"blue",cursor:"pointer"}}
                    >
                      En attente
                    </button>
                    
                    <button
                      className="icon-btn reject"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReject(item);
                      }}
                      style={{paddingLeft:10 , color:"green",cursor:"pointer"}}
                    >
                      Recu
                    </button>
                    
                    <button
                      className="icon-btn reject"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReject(item);
                      }}
                      style={{paddingLeft:10 , color:"red" , cursor:"pointer"}}
                    >
                      Rejeter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

ClickableDataTable.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  actionButtonText: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onActionClick: PropTypes.func,
  onRowClick: PropTypes.func.isRequired,
  onApprove: PropTypes.func,
  onReject: PropTypes.func
};

ClickableDataTable.defaultProps = {
  description: '',
  searchPlaceholder: 'Search...',
  actionButtonText: null,
  onActionClick: () => {},
  onApprove: () => {},
  onReject: () => {}
};

export default ClickableDataTable;