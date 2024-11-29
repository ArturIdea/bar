import {ActionIcon, Flex, Image} from "@mantine/core";
const paths = ["/images/download.svg", "/images/share.svg", "/images/printer.svg"]

const ActionIcons = () => {
  return (
    <Flex columnGap={16} direction={'row'}>
      {paths.map(item => (
        <ActionIcon key={item} variant={'default'} size={'xl'} style={{borderRadius: 12, border: "1px solid #ECEEF4"}}>
          <Image
            src={item}
            width={24}
            height={24}
            fit="cover"
          />
        </ActionIcon>
      ))}
    </Flex>
  )
}
export default ActionIcons