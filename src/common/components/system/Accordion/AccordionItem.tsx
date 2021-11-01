import * as React from 'react';
import { useId } from '@radix-ui/react-id';

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';

import { useAccordionContext } from './AccordionContext';
import { AccordionItemProvider } from './AccordionItemContext';

export interface AccordionItemProps {
  /**
   * A unique value for the item.
   */
  value: string;

  /**
   * When `true`, prevents the user from interacting with the item.
   */
  disabled?: boolean;

  /**
   * The content.
   */
  children?: React.ReactNode | ((props: { open: boolean; disabled: boolean }) => React.ReactNode);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface AccordionItemTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & AccordionItemProps;
  defaultComponent: D;
}

/**
 * `AccordionItem` contains all of the parts of a collapsible section inside of an `Accordion`.
 */
export const AccordionItem: OverridableComponent<AccordionItemTypeMap> = React.forwardRef((props, ref): JSX.Element => {
  const {
    value,
    children,
    disabled: disabledProps,
    component: Component = 'div',
    ...other
  } = props;

  const accordionContext = useAccordionContext('AccordionItem');
  const triggerId = useId();

  const open = (value !== undefined && accordionContext.value?.includes(value)) || false;
  const disabled = accordionContext.disabled || disabledProps || false;

  return (
    <AccordionItemProvider
      disabled={disabled}
      open={open}
      triggerId={triggerId}
      onItemToggle={() => {
        if (!open) {
          accordionContext.onItemOpen(value);
        } else {
          accordionContext.onItemClose(value);
        }
      }}
    >
      <Component
        data-state={open ? 'opened' : 'closed'}
        data-disabled={disabled ? '' : undefined}
        ref={ref}
        {...other}
      >
        {typeof children === 'function' ? children({ open, disabled }) : children}
      </Component>
    </AccordionItemProvider>
  );
});

export { AccordionItem as Item };
