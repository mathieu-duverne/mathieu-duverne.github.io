import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';

interface AlertMessageProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, message, onClose }) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          text: 'text-green-600',
          border: 'border-green-200',
          icon: <CheckCircle className="w-5 h-5" />
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          text: 'text-red-600',
          border: 'border-red-200',
          icon: <XCircle className="w-5 h-5" />
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-600',
          border: 'border-yellow-200',
          icon: <AlertCircle className="w-5 h-5" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
          icon: <Info className="w-5 h-5" />
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`
      relative flex items-start gap-3 p-4 rounded-lg border
      ${styles.bg} ${styles.border}
      animate-in fade-in slide-in-from-top duration-300
    `}>
      <div className={styles.text}>
        {styles.icon}
      </div>
      <div className={`${styles.text} text-sm font-medium flex-grow`}>
        {message}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`
            ${styles.text} hover:opacity-80 transition-opacity
            p-1 rounded-full hover:bg-white/50
          `}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default AlertMessage;