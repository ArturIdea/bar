import {Flex, Image} from "@mantine/core";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <Flex className={classes.navbar} align={'center'} px={24} py={12}>
      <Image
        src="/images/baraka_main_logo.svg"
        width={123}
        height={32}
        fit="cover"
      />
    </Flex>
  )
}
export default Navbar