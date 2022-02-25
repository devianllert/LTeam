import * as React from 'react';
import { Box } from '@/common/components/layout/Box';
import { getSummonerItemUrl } from '@/modules/ddragon/path';

export interface ItemsTableProps {
  items: number[];
}

export const ItemsTable = (props: ItemsTableProps) => {
  const {
    items,
  } = props;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      width={108}
    >
      {items.map((itemId, index) => (
        <Box
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          width={32}
          height={32}
          marginRight={1}
          marginBottom={1}
          backgroundColor="black"
        >
          {(itemId !== 0) && (
          <img
            width={32}
            height={32}
            alt=""
            src={getSummonerItemUrl(itemId.toString())}
          />
          )}
        </Box>
      ))}
    </Box>
  );
};
