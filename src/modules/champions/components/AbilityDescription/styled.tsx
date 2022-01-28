import styled from '@emotion/styled';
import * as Tabs from '@radix-ui/react-tabs';
import * as React from 'react';
import { Box } from '@/common/components/system/Box';
import * as Text from '@/common/components/system/Text';
import { abilityButton } from '@/modules/champions/constants/abilityButton';

interface TabsProps {
  path: string;
  value: string;
  className: string;
  index?: number;
}

const TabsR = (props: TabsProps) => {
  const {
    path,
    value,
    className,
    index,
  } = props;
  return (
    <Tabs.Trigger value={value} className={className}>
      <Box
        display="flex"
        position="relative"
        width={48}
        height={48}
      >
        <img
          src={path}
          alt=""
          width={48}
          height={48}
        />

        {index && (
        <Box
          position="absolute"
          right={0}
          bottom={0}
          padding="0px 5px"
          backgroundColor="rgb(0,0,0,0.5)"
          color="white"
        >
          <Text.Paragraph variant="body3">{abilityButton[index]}</Text.Paragraph>
        </Box>
        )}
      </Box>
    </Tabs.Trigger>
  );
};

// export const Tab = styled(TabsR)
//   padding: 0;
//   margin-right: 4px;
//   border: none;

//   &[data-state="active"]: {
//     border: 1px solid;
//     color: yellow;
//     box-shadow: inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor,
//   };

export const Tab = styled(TabsR)({
  padding: 0,
  marginRight: '4px',
  border: '1px solid',
  borderColor: 'rgb(0, 0, 0, 1)',

  '&[data-state="active"]': {
    border: '1px solid',
    borderColor: 'yellow',
  },
});
