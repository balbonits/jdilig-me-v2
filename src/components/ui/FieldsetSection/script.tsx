import { ReactNode } from 'react';
import styles from './style.module.css';

interface FieldsetSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const FieldsetSection: React.FC<FieldsetSectionProps> = ({
  title,
  children,
  className = ''
}) => {
  return (
    <fieldset className={`${styles.fieldset} ${className}`}>
      <legend className={styles.legend}>{title}</legend>
      <div className={styles.content}>
        {children}
      </div>
    </fieldset>
  );
};

export default FieldsetSection;