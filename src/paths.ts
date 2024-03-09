const paths = {
  home() {
    return "/";
  },
  showTopic(slug: string) {
    return `/topics/${slug}`;
  },
  createPost(slug: string) {
    return `/topics/${slug}/posts/new`;
  },
  showPost(slug: string, id: string) {
    return `/topics/${slug}/posts/${id}`;
  },
};

export default paths;
