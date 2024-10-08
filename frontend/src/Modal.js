import React from 'react'
import ReactDOM from 'react-dom'


const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: '#fed8b1',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  opacity: '1',
  overflowY: 'auto', // Enable vertical scrolling
  overflowX: 'hidden', // Disable horizontal scrolling
  WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
};

const CLOSE_BUTTON_STYLES = {
  position: 'absolute',
  top: '5px',
  right: '10px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  fontSize: '12px',
  cursor: 'pointer',
  padding: '5px 10px'
};

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <button
          style={CLOSE_BUTTON_STYLES}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
