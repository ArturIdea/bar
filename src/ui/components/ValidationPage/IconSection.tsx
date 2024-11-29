'use client'
import {Flex, Image, Text} from "@mantine/core";
import {useMobileBreakpoint} from "@/ui/hooks/ui/useMobileBreakPoint";
import ActionIcons from "@/ui/components/ValidationPage/ActionIcons";

const IconSection = () => {
  const isMobile = useMobileBreakpoint(600)

  return (
    <Flex w="100%" direction="row" justify={isMobile ? "center" : 'space-between'} align="center">
      <ActionIcons />
      {!isMobile && <Flex direction="column" rowGap={4}>
        <Text style={{fontSize: 10, textAlign: "end"}} c='dimmed' size="xs">Download the Baraka app for more
          details</Text>
        <Flex columnGap={8} justify="end">
          <Flex h={30} w={103}>
            <Image
              src="/images/google.svg"
              width={103}
              height={30}
              fit="cover"
            />
          </Flex>
          <Flex h={30} w={103}>
            <Image
              src="/images/apple.svg"
              width={103}
              height={30}
              fit="cover"
            />
          </Flex>
        </Flex>
      </Flex>}
    </Flex>
  )
}
export default IconSection