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
} // Provide some basic API preloading. This oils the Gutenberg wheels and allows certain operations to happen without making an external request


function registerApiHandlers(options) {
  var preload = {
    OPTIONS: {
      // Reusable blocks
      '/wp/v2/blocks': {
        body: []
      }
    },
    // Enough data for Gutenberg to work
    '/wp/v2/types?context=edit': {
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
    },
    '/wp/v2/posts/0?context=edit': getPost()
  };
  apiFetch.use(apiFetch.createPreloadingMiddleware(preload));
}

export default registerApiHandlers;
//# sourceMappingURL=index.js.map