const uuid = require('uuid/v4');

const bookmarks = [
  {
    id: uuid(),
    title: 'Google',
    url: 'http://www.google.com',
    description: 'search engine',
    rating: 3,
  },
  {
    id: uuid(),
    title: 'Notion',
    url: 'http://www.notion.com',
    description: 'note taking app',
    rating: 5,
  },
  {
    id: uuid(),
    title: 'Thinkful',
    url: 'http://www.thinkful.com',
    description: 'learn to build things',
    rating: 4,
  }
];

module.exports = { bookmarks };