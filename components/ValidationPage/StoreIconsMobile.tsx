import {Flex, Image, Text} from "@mantine/core";

const StoreIconsMobile = () => {
  return (
    <Flex w="90%" direction="column" rowGap={16} justify="center"  p={40} style={{borderRadius: 12, border:'1px solid #ECEEF4'}}>
      <Text fw={500} size="md">DOWNLOAD THE BARAKA APP FOR MORE DETAILS</Text>
      <Flex columnGap={8} justify="space-between">
        <Flex h={40} w={139}>
          <Image
            src="/google_mobile.svg"
            width={139}
            height={40}
            fit="cover"
          />
        </Flex>
        <Flex h={40} w={139}>
          <Image
            src="/apple_mobile.svg"
            width={139}
            height={40}
            fit="cover"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
export default StoreIconsMobile