import {   CheckCircle, XCircle } from 'lucide-react';
import { MdOutlineDownloading } from "react-icons/md";

import PropTypes from 'prop-types';
import './DataTable.scss';

const DataTable = ({
  title,
  description,
  searchPlaceholder,
  actionButtonText,
  columns,
  data,
  onActionClick,
  onView,
  onApprove,
  onReject
}) => {
  console.log(data);
  
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
            />
          </div>
          {actionButtonText && (
            <button className="action-button" onClick={onActionClick}>
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
                <th>Actions</th> {/* Colonne pour les boutons */}
              </tr>
            </thead>
            <tbody>
              {data.map((item, rowIndex) => (
                <tr key={rowIndex}
                >
                  {columns.map((column, colIndex) => {
                      const value = column.key.split('.').reduce((acc, key) => acc?.[key], item);
  
                      return <td key={colIndex}>{value}</td>;
    })}
                  <td>
                    <button className="view-btn" onClick={() => onView(item)}>
                      <MdOutlineDownloading />
                    </button>
                    <button className="approve-btn" onClick={() => onApprove(item)}>
                      <CheckCircle />
                    </button>
                    <button className="reject-btn" onClick={() => onReject(item)}>
                      <XCircle />
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

DataTable.propTypes = {
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
  onView: PropTypes.func,
  onApprove: PropTypes.func,
  onReject: PropTypes.func
};

DataTable.defaultProps = {
  description: '',
  searchPlaceholder: 'Rechercher...',
  actionButtonText: null,
  onActionClick: () => {},
  onView: () => {},
  onApprove: () => {},
  onReject: () => {}
};

export default DataTable;
