import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
  type = 'button',
  ...props
}) => {
  const classes = `btn btn-${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
