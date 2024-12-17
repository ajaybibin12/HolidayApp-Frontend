import React from 'react';

const HolidayModal = ({ holiday, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{holiday.name}</h2>
                <p>{holiday.description}</p>
                <p>Date: {holiday.date}</p>
                <p>Type: {holiday.type}</p>
            </div>
        </div>
    );
};

export default HolidayModal;
