import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { Divider, Flex, Modal as AntModal, ModalProps, Typography } from 'antd';
import clsx from 'clsx';

import styles from './Modal.module.scss';

interface CustomModalProps extends ModalProps {
  footer?: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  headerProps?: {
    title?: string;
    titleCentered?: boolean;
    titleClassName?: string;
  };
}

export const Modal: FC<CustomModalProps> = ({
  footer = false,
  open,
  setOpen,
  children,
  headerProps,
  ...rest
}) => {
  return (
    <AntModal {...rest} footer={footer} open={open} onCancel={() => setOpen(false)}>
      <Flex vertical align={headerProps?.titleCentered ? 'center' : ''}>
        <Typography.Title level={3} className={clsx(styles.title, headerProps?.titleClassName)}>
          {headerProps?.title}
        </Typography.Title>
        <Divider className={styles.divider} />
      </Flex>
      <Flex>{children ?? <> </>}</Flex>
    </AntModal>
  );
};
