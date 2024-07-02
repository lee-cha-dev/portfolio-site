import React from 'react';
import {Badge, Button, Heading, Image, Link, ListItem, Text, UnorderedList, VStack} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";

const Project = (props) => {
    return (
        <VStack spacing={8} align="center" maxW="3xl">
            <Heading
                as="h2"
                fontSize="2xl"
                color="#64FFDA"
                textAlign="center"
            >
                {props.projectName}
            </Heading>
            <Text fontSize="lg" textAlign="center">
                {props.projectDescriptionTop}
            </Text>
            <Image
                src={props.projectImage}
                alt={`${props.projectName} Screenshot`}
                borderRadius="md"
                maxWidth="100%"
                height="auto"
            />
            <Text fontSize="lg" textAlign="center">
                {props.projectDescriptionBottom}
            </Text>
            <VStack align="start" spacing={4} width="100%">
                <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                    Key Features:
                </Heading>
                <UnorderedList spacing={2} pl={4}>
                    {props.keyFeatures.map((feature, index) => (
                        <ListItem key={index}>{feature}</ListItem>
                    ))}
                </UnorderedList>
                <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                    Technologies Used:
                </Heading>
                <UnorderedList spacing={2} pl={4}>
                    {props.techUsed.map((tech, index) => (
                        <ListItem key={index}>{tech}</ListItem>
                    ))}
                </UnorderedList>
                {props.supportedFormats && (
                    <>
                        <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                            Supported Formats:
                        </Heading>
                        <Text>{props.supportedFormats.join(', ')}</Text>
                    </>
                )}
            </VStack>
            <Link href={props.projectLink}
                  target="_blank" isExternal color="#64FFDA"
                  marginTop={8}
            >
                <Button
                    colorScheme="blue"
                    size="lg"
                    px={8}
                    {...props.buttonStyle}
                >
                    {props.projectLinkName} <ExternalLinkIcon mx="2px" />
                </Button>
            </Link>
            {props.additionalLink && (
                <Link href={props.additionalLink.url} isExternal color="#64FFDA">
                    {props.additionalLink.text} <ExternalLinkIcon mx="2px" />
                </Link>
            )}
        </VStack>
    )
}

export default Project;