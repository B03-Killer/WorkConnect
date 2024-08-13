import clsx from 'clsx';
import React from 'react';
import ButtonLoadingSpinner from '../ButtonLoadingSpinner';

type ButtonTheme = 'primary' | 'grey' | 'text' | 'underlineText' | 'outline';

interface ButtonProps {
  className?: string;
  theme: ButtonTheme;
  children: React.ReactNode;
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isFullWidth?: boolean;
  isSmall?: boolean;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
}

const styles = {
  primary: 'bg-primary200Main text-white hover:bg-primary300',
  grey: 'bg-grey50 text-grey700Black hover:bg-grey200',
  text: 'bg-transparent text-grey700Black',
  underlineText: 'bg-transparent text-grey700Black underline',
  primaryDisabled: 'disabled:bg-primary50 disabled:text-white',
  greyDisabled: 'disabled:bg-grey100 disabled:text-white',
  outline: 'bg-white text-grey200 border border-grey200'
};

const Button = ({
  className,
  theme,
  children,
  isDisabled = false,
  isFullWidth = false,
  isSmall = false,
  type = 'button',
  isLoading = false,
  ...props
}: ButtonProps) => {
  const disabledStyle = theme === 'primary' ? styles.primaryDisabled : styles.greyDisabled;
  const boxShadowStyle =
    theme === 'text' || theme === 'underlineText' ? {} : { boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)' };

  return (
    <button
      className={clsx(
        'rounded-md',
        'px-[22px] box-sizing-border flex items-center justify-center gap-[12px]',
        styles[theme],
        isDisabled && disabledStyle,
        isFullWidth ? 'w-full' : '',
        isSmall ? 'h-[36px]' : 'h-[56px]',
        className
      )}
      type={type}
      disabled={isDisabled}
      style={boxShadowStyle}
      {...props}
    >
      {isLoading ? <ButtonLoadingSpinner /> : children}
    </button>
  );
};

export default Button;
