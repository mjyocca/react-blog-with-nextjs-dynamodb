import type { NextPage } from 'next';
import { Divider, Text } from '@geist-ui/react';

const TechStack: NextPage = () => {
  return (
    <>
      <Text></Text>
      <Divider h={5}>NextJS</Divider>
      <Text>
        React framework with out of the box typescript support Per page, SSR (Server Side Rendering) & SSG (Static Site
        Generation)
      </Text>
      <Divider h={5}>SWR</Divider>
      <Text>React Hooks for Data Fetching</Text>
      <Divider h={5}>@geist-ui/react</Divider>
      <Text>Small & minimal React component library</Text>
      <Divider h={5}>NextJS API Routes (Backend)</Divider>
      <Text>NextJS API Routes offers building your backend with ease</Text>
      <Divider h={5}>DynamoDB as the data store</Divider>
      <Text>DynamoDB, AWS&apos;s NoSQL database</Text>
    </>
  );
};

export default TechStack;
