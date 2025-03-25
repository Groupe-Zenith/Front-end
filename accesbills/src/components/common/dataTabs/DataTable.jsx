"use client"

import { Search } from 'lucide-react'
import PropTypes from 'prop-types'
import './DataTable.scss'

const DataTable = ({
  title,
  description,
  searchPlaceholder,
  actionButtonText,
  columns,
  data,
  onActionClick,
  onRowClick,
  statusConfig
}) => {
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
            <button className="search-button">
              <Search className="search-icon" />
            </button>
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
              </tr>
            </thead>
            <tbody>
              {data.map((item, rowIndex) => (
                <tr key={rowIndex} onClick={() => onRowClick && onRowClick(item)}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {column.key === 'status' && statusConfig ? (
                        <span 
                          className={`status-badge ${statusConfig[item[column.key]]?.className || ''}`}
                          style={statusConfig[item[column.key]]?.style}
                        >
                          {item[column.key]}
                        </span>
                      ) : (
                        item[column.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

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
  onRowClick: PropTypes.func,
  statusConfig: PropTypes.object
}

DataTable.defaultProps = {
  description: '',
  searchPlaceholder: 'Rechercher...',
  actionButtonText: null,
  onActionClick: () => {},
  onRowClick: null,
  statusConfig: null
}

export default DataTable