import React from 'react';
import { 
  Construction, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Zap,
  Lock
} from 'lucide-react';
import '../styles/FeatureStatus.css';

export default function FeatureStatus({ 
  status = "development", // Options: "development", "coming-soon", "beta", "completed", "locked", "maintenance"
  title,
  message,
  showEstimatedTime = false,
  estimatedTime = "",
  className = ""
}) {
  // Define configuration based on status
  const config = {
    development: {
      icon: <Construction size={40} />,
      defaultTitle: "Under Development",
      defaultMessage: "We're currently building this feature. Please check back later."
    },
    "coming-soon": {
      icon: <Clock size={40} />,
      defaultTitle: "Coming Soon",
      defaultMessage: "This feature will be available in the near future."
    },
    beta: {
      icon: <Zap size={40} />,
      defaultTitle: "Beta Feature",
      defaultMessage: "This feature is in beta testing. It may change or have limited functionality."
    },
    maintenance: {
      icon: <AlertCircle size={40} />,
      defaultTitle: "Under Maintenance",
      defaultMessage: "This feature is temporarily unavailable while we make improvements."
    },
    completed: {
      icon: <CheckCircle2 size={40} />,
      defaultTitle: "Available",
      defaultMessage: "This feature is fully available and ready to use."
    },
    locked: {
      icon: <Lock size={40} />,
      defaultTitle: "Feature Locked",
      defaultMessage: "This feature requires premium access."
    }
  };

  // Get configuration for selected status, or default to "development"
  const currentConfig = config[status] || config.development;
  
  // Status-specific class
  const statusClass = `feature-status-${status}`;

  return (
    <div className={`feature-status-container ${statusClass} ${className}`}>
      <div className="feature-status-icon">
        {currentConfig.icon}
      </div>
      
      <h2 className="feature-status-title">
        {title || currentConfig.defaultTitle}
      </h2>
      
      <p className="feature-status-message">
        {message || currentConfig.defaultMessage}
      </p>
      
      {showEstimatedTime && estimatedTime && (
        <div className="feature-status-time">
          Expected {status === "maintenance" ? "completion" : "availability"}: {estimatedTime}
        </div>
      )}
    </div>
  );
}