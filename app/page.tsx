'use client'
import {Flex} from "@mantine/core";
import ProfileImage from "@/components/ValidationPage/ProfileImage";
import BadgeSection from "@/components/ValidationPage/Badge";
import BasicInfoSection from "@/components/ValidationPage/BasicInfoSection";
import IconSection from "@/components/ValidationPage/IconSection";
import BottomSection from "@/components/ValidationPage/BottomSection";
import StoreIconsMobile from "@/components/ValidationPage/StoreIconsMobile";
import {useMobileBreakpoint} from "@/hooks/useMobileBreakPoint";

export default function HomePage() {
  const isMobile = useMobileBreakpoint(600)

  return (
    <Flex maw={800} direction="column" align="center" m="0 auto">
      <ProfileImage/>
      <Flex mb={16}/>
      <BadgeSection/>
      <Flex mb={32}/>
      <BasicInfoSection/>
      <Flex mb={32}/>
      <Flex w="100%" maw={800} direction={isMobile ? 'column-reverse' : "column"}>
        <IconSection/>
        <Flex mb={isMobile ? 16 : 64}/>
        <BottomSection/>
      </Flex>
      {isMobile && <Flex mb={16}/>}
      {isMobile && <StoreIconsMobile/>}
    </Flex>
  );
}
