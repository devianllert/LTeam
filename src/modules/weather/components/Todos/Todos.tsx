import * as React from 'react';
import { RiCloseFill, RiMenu3Line } from 'react-icons/ri';

import { Box } from '@/common/components/system/Box';
import { Button } from '@/common/components/system/Button';
import { Divider } from '@/common/components/system/Divider';
import { IconButton } from '@/common/components/system/IconButton';
import { Typography } from '@/common/components/system/Typography';
import * as Modal from '@/common/components/system/Modal';

const initialTodos = [
  {
    date: '16:30h',
    title: 'Stay at Bohem Art Hotel',
  },
  {
    date: '17:30h',
    title: 'Stay at Bohem Art Hotel',
  },
  {
    date: '18:30h',
    title: 'Stay at Bohem Art Hotel',
  },
  {
    date: '19:30h',
    title: 'Stay at Bohem Art Hotel',
  },
];

export const Todos = (): JSX.Element => {
  const [todos] = React.useState(initialTodos);

  return (
    <Modal.Root>
      <Modal.Overlay />

      <Box width={['100%', null, 'auto']}>
        <Box display="flex" alignItems="center">
          <Button color="primary" ml="-12px">Next</Button>

          <Modal.Trigger asChild>
            <IconButton
              ml="auto"
              edge="end"
              label="Open Popup"
            >
              <RiMenu3Line />
            </IconButton>
          </Modal.Trigger>

          <Modal.Content asChild>
            <Box
              borderRadius="4px"
              backgroundColor="background.primary"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding={4}
              >
                <Modal.Title asChild>
                  <Typography variant="h4" component="span">Edit todos</Typography>
                </Modal.Title>

                <Modal.Close asChild>
                  <IconButton color="gray" label="Close">
                    <RiCloseFill />
                  </IconButton>
                </Modal.Close>
              </Box>

              <Divider space={0} />

              <Box padding={4}>
                {todos.map((item) => (
                  <Box mb={3} key={item.date}>
                    <Typography variant="subtitle1" component="span" mr={2}>16:30h</Typography>

                    <Typography variant="body1" component="span" fontWeight="bold">Stay at Bohem Art Hotel</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Modal.Content>
        </Box>

        <Divider decorative />

        <Box>
          {todos.slice(0, 2).map((item) => (
            <Box mb={3} key={item.date}>
              <Typography variant="subtitle1" component="span" mr={2}>16:30h</Typography>

              <Typography variant="body1" component="span" fontWeight="bold">Stay at Bohem Art Hotel</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal.Root>
  );
};
