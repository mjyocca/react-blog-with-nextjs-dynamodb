import NextLink from 'next/link';
import { Card } from '@geist-ui/react';

const PostArticleCard = (props: any) => {
  const { post } = props;
  return (
    <Card style={{ margin: '5px' }} shadow>
      <h4>{post.title}</h4>
      <p>{post.description}</p>
      <Card.Footer>
        <NextLink href={`/posts/${post.slug}?cursor=${props.cursor}`}>Read More</NextLink>
      </Card.Footer>
    </Card>
  );
};

export default PostArticleCard;
