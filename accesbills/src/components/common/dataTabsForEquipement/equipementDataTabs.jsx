import { AlertTriangle } from 'lucide-react';
import PropTypes from 'prop-types';
import './equipementDataTabs.scss';

const EquipementTabs = ({
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
              {data.map((item, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.key}>{item[column.key]}</td>
                  ))}
                  <td className="item-cell actions" data-label="Actions">
                    <button
                      className="report-button"
                      onClick={() => onReject(item)} // Example action
                    >
                      <AlertTriangle size={16} /> Signaler
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

EquipementTabs.propTypes = {
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

EquipementTabs.defaultProps = {
  description: '',
  searchPlaceholder: 'Rechercher...',
  actionButtonText: null,
  onActionClick: () => {},
  onView: () => {},
  onApprove: () => {},
  onReject: () => {}
};

export default EquipementTabs;
