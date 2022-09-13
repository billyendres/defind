const client = require("contentful").createClient({
  space: "h1d4of63r8ee",
  accessToken: "LTl1xvksarKdzB_0i2f7Ft0hy1N1qE_n0LOgdc9DEJk",
});

const getBlogPosts = () =>
  client.getEntries().then((response) => response.items);

const getSinglePost = (slug) =>
  client
    .getEntries({
      "fields.slug": slug,
      content_type: "blogPost",
    })
    .then((response) => response.items);

export { getBlogPosts, getSinglePost };
