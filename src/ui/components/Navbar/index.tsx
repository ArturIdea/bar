import { Box, Flex, Image } from '@mantine/core';
import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <Box h={60}>
      <Flex
        className={classes.navbar}
        align="center"
        px={24}
        py={12}
        pos="fixed"
        style={{ width: '100%', zIndex: 100, backgroundColor: 'white' }}
      >
        <Image src="/images/logos/baraka_main_logo.svg" width={123} height={32} fit="cover" />
      </Flex>
    </Box>
  );
};
export default Navbar;
