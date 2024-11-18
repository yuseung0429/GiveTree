import { ReactNode } from 'react';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

interface FormFieldProps {
  children: ReactNode;
  label: string;
  description?: string;
  errorMessage?: string;
}

const FormField = ({
  children,
  label,
  description,
  errorMessage,
}: FormFieldProps) => {
  return (
    <Flex flexDirection="column" gap="0.5rem">
      <Typography color={colorPalette.primary[600]} weight="semiBold">
        {label}
      </Typography>
      {description && (
        <Typography size={typography.size.sm}>{description}</Typography>
      )}
      {children}
      {errorMessage && (
        <Typography color={colorPalette.danger[600]} size={typography.size.sm}>
          {errorMessage}
        </Typography>
      )}
    </Flex>
  );
};

export default FormField;
