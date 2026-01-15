import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const Toast = ({ id, type = 'info', message, onClose, duration = 4000 }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 50));
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 50);

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [id, onClose, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 300);
  };

  const Icon = iconMap[type];

  return (
    <div
      className={`toast-container ${isExiting ? 'toast-exit' : 'toast-enter'}`}
      data-type={type}
    >
      <div className="toast-content">
        <div className="toast-icon-wrapper">
          <Icon className="toast-icon" style={{ width: '20px', height: '20px' }} />
        </div>
        <p className="toast-message">{message}</p>
        <button onClick={handleClose} className="toast-close">
          <X style={{ width: '16px', height: '16px' }} />
        </button>
      </div>
      <div className="toast-progress" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Toast;