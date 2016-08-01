import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Index = (props) => {
  const posts = [
    { id: 'test_id', title: 'test_title', tags: 'test_tag' },
    { id: 'another_test_id', title: 'another_test_title', tags: 'another_test_tag' },
  ];

  const postList = posts.map((post) => {
    return <li key={post.id}><Link to={`posts/${post.id}`}>{`${post.title} ${post.tags}`}</Link></li>;
  });

  return (
    <ul>
      {postList}
    </ul>
  );
};

// not currently working with reducer, also using a fake set of posts

// const mapStateToProps = (state) => (
//   {
//     posts: state.posts.all,
//   }
// );
//
// // react-redux glue -- outputs Container that know state in props
// export default connect(mapStateToProps, null)(Index);

export default Index;
