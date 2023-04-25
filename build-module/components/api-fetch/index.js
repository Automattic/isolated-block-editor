/**
 * WordPress dependencies
 */

import apiFetch from '@wordpress/api-fetch';
function getPost() {
  return {
    body: {
      id: 0,
      type: 'post'
    }
  };
}

// Enough data for Gutenberg to work
function getTypes() {
  return {
    body: {
      post: {
        capabilities: {
          edit_post: 'edit_post'
        },
        description: '',
        hierarchical: false,
        viewable: true,
        name: 'Posts',
        slug: 'post',
        labels: {
          name: 'Posts',
          singular_name: 'Post'
        },
        supports: {
          title: false,
          editor: true,
          author: false,
          thumbnail: false,
          excerpt: false,
          trackbacks: false,
          'custom-fields': false,
          comments: false,
          revisions: false,
          'post-formats': false,
          'geo-location': false
        },
        taxonomies: [],
        rest_base: 'posts'
      }
    }
  };
}

// Provide some basic API preloading. This oils the Gutenberg wheels and allows certain operations to happen without making an external request
function registerApiHandlers(options) {
  const preload = {
    OPTIONS: {
      // Reusable blocks
      '/wp/v2/blocks': {
        body: []
      }
    },
    '/wp/v2/types?context=view': getTypes(),
    '/wp/v2/types?context=edit': getTypes(),
    '/wp/v2/posts/0?context=edit': getPost(),
    '/wp/v2/posts?context=edit': getPost()
  };
  apiFetch.use(apiFetch.createPreloadingMiddleware(preload));
}
export default registerApiHandlers;
//# sourceMappingURL=index.js.map