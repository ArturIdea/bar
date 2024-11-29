import {Flex, Image, Text} from "@mantine/core";

const BadgeSection = () => {

  return (
    <Flex direction="row" bg="#169A3C" style={{borderRadius: 20}} w={100} align="center" justify="space-evenly" py={2} px={4}>
      <Image
        src="/images/shield-tick.svg"
        width={16}
        height={16}
        fit="cover"
      />
      <Text size="sm" c="white" fw={500}>Verified</Text>
    </Flex>

  )
}
export default BadgeSection