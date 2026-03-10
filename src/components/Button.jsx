import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', href, ...props }) => {
  if (href) {
    return (
      <a href={href} className={`btn btn-${variant} ${className}`} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};
