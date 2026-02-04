import React, { useState, useEffect } from 'react';
import './dialog.css';

export const Dialog = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open || false);

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  return (
    <div className="dialog-root">
      {React.Children.map(children, (child) => {
        if (child.type === DialogTrigger) {
          return React.cloneElement(child, {
            onClick: () => handleOpenChange(true),
          });
        }
        if (child.type === DialogContent) {
          return React.cloneElement(child, {
            isOpen,
            onClose: () => handleOpenChange(false),
          });
        }
        return child;
      })}
    </div>
  );
};

export const DialogTrigger = ({ children, onClick }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <div onClick={handleClick} style={{ cursor: 'pointer', display: 'block', width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

export const DialogContent = ({ children, isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
        document.body.style.overflow = 'unset';
      }, 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="dialog-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 9998,
          animation: isClosing ? 'fadeOut 0.3s ease-in-out' : 'fadeIn 0.3s ease-in-out',
        }}
      />
      
      {/* Dialog */}
      <div
        className="dialog-container"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          width: '60%',
          maxWidth: '700px',
          animation: isClosing ? 'scaleOut 0.3s ease-in-out' : 'scaleIn 0.3s ease-in-out',
        }}
      >
        <div
          className="dialog-8bit"
          style={{
            background: '#1a0e22',
            border: '4px solid #ffc010',
            boxShadow: '0 0 0 4px #000, 0 0 30px rgba(255, 192, 16, 0.6), inset 0 0 20px rgba(255, 192, 16, 0.1)',
            padding: '0',
            position: 'relative',
            imageRendering: 'pixelated',
            overflow: 'hidden',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#ffc010',
              border: '3px solid #000',
              color: '#000',
              fontSize: '20px',
              fontWeight: 'bold',
              width: '35px',
              height: '35px',
              cursor: 'pointer',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Press Start 2P", system-ui',
              boxShadow: '3px 3px 0 rgba(0, 0, 0, 0.5)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#00ffea';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#ffc010';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
          
          {children}
        </div>
      </div>
    </>
  );
};

export const DialogHeader = ({ children }) => {
  return (
    <div
      className="dialog-header"
      style={{
        padding: '20px 20px 10px',
        borderBottom: '3px solid #ffc010',
      }}
    >
      {children}
    </div>
  );
};

export const DialogTitle = ({ children }) => {
  return (
    <h2
      style={{
        fontFamily: '"Press Start 2P", system-ui',
        fontSize: '16px',
        color: '#ffc010',
        margin: 0,
        lineHeight: '1.5',
        textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)',
      }}
    >
      {children}
    </h2>
  );
};

export const DialogDescription = ({ children }) => {
  return (
    <p
      style={{
        fontFamily: '"Press Start 2P", system-ui',
        fontSize: '10px',
        color: '#fff',
        margin: '10px 0 0',
        lineHeight: '1.6',
      }}
    >
      {children}
    </p>
  );
};

export const DialogBody = ({ children }) => {
  return (
    <div
      className="dialog-body"
      style={{
        padding: '20px',
      }}
    >
      {children}
    </div>
  );
};

export const DialogFooter = ({ children }) => {
  return (
    <div
      className="dialog-footer"
      style={{
        padding: '10px 20px 20px',
        borderTop: '3px solid #ffc010',
        display: 'flex',
        gap: '15px',
        justifyContent: 'flex-end',
      }}
    >
      {children}
    </div>
  );
};
