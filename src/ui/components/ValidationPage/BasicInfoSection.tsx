'use client';
import {Flex, SimpleGrid, Text} from "@mantine/core";
import {useMobileBreakpoint} from "@/src/ui/hooks/ui/useMobileBreakPoint";

const BasicInfoSection = () => {
  const isMobile = useMobileBreakpoint(600)
  return (
    <Flex w={isMobile ? "90%" : "100%"} style={{borderRadius: 10, border: "1px solid #ECEEF4"}} p={32} direction="column">
      <SimpleGrid cols={isMobile? 1 : 2}>
        <Flex direction="column" rowGap={8}>
          <Text c='dimmed' size="sm">Gender</Text>
          <Text fw={500}>Male</Text>
        </Flex>
        <Flex direction="column" rowGap={8}>
          <Text size="sm" c="dimmed">Nationality</Text>
          <Text fw={500}>Uzbekistani</Text>
        </Flex>
        <Flex direction="column" rowGap={8}>
          <Text size="sm" c="dimmed">Social Number</Text>
          <Text fw={500}>123123123</Text>
        </Flex>
        <Flex direction="column" rowGap={8}>
          <Text size="sm" c="dimmed">PINFL</Text>
          <Text fw={500}>123123123</Text>
        </Flex>
        <Flex direction="column" rowGap={8}>
          <Text size="sm" c="dimmed">Date of issue</Text>
          <Text fw={500}>01/02/2024</Text>
        </Flex>
        <Flex direction="column" rowGap={8}>
          <Text size="sm" c="dimmed">Place of birth</Text>
          <Text fw={500}>Tashkent</Text>
        </Flex>
        <Flex direction="column" rowGap={8}>
          <Text size="sm" c="dimmed">Fingerprint</Text>
          <Text style={{borderRadius: 10}} px={4} py={2} w="fit-content" size="xs" bg="yellow" c="white" fw={500}>Pending</Text>
        </Flex>
      </SimpleGrid>
    </Flex>
  )
}
export default BasicInfoSection