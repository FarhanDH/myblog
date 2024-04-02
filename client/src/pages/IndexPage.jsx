import { useEffect, useState } from 'react';
import { Post } from '../Post';
import { config } from '../config';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${config.apiUrl}/posts`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts.data);
      });
    });
  }, []);
  return (
    // @ts-ignore
    <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>
  );
}
