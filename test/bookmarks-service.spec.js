const BookmarksService = require('../src/bookmarks/bookmarksService');
const knex = require('knex');


describe.skip('Bookmarks srvice object', () => {
  let db;
  let testBookmarks = [
    {
      id: 1,
      title: 'Google',
      url: 'http://www.google.com',
      description: 'search engine',
      rating: '3.0',
    },
    {
      id: 2,
      title: 'Notion',
      url: 'http://www.notion.com',
      description: 'note taking app',
      rating: '5.0',
    },
    {
      id: 3,
      title: 'Thinkful',
      url: 'http://www.thinkful.com',
      description: 'learn to build things',
      rating: '4.0',
    }
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  after(() => db.destroy());

  before(() => db('bookmarks').truncate());

  afterEach(() => db('bookmarks').truncate());

  context('Given bookmarks table has data', () => {
    beforeEach(() => {
      return db 
        .into('bookmarks')
        .insert(testBookmarks);
    });
    it('getAllBookmakrs() resolves all bookmarks from "bookmarks" table', () => {
      // test that BookmarksService.getAllBookmarks gets data from table
      return BookmarksService.getAllBookmarks(db)
        .then(actual => {
          expect(actual).to.eql(testBookmarks);
        });
    });

    it('getById() resolves an article by id from the bookmarks table', () => {
      const thirdId = 3;
      const thirdTestBookmark = testBookmarks[thirdId - 1];
      return BookmarksService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            title: thirdTestBookmark.title,
            url: thirdTestBookmark.url,
            description: thirdTestBookmark.description,
            rating: thirdTestBookmark.rating
          });
        });
    });

    it('deleteBookmark() removes a bookmark from the bookmarks table', () => {
      const bookmarkId = 3;
      return BookmarksService.deleteBookmark(db, bookmarkId)
        .then(() => BookmarksService.getAllBookmarks(db))
        .then(allBookmarks => {
          const expected = testBookmarks.filter(b => b.id !== bookmarkId);
          expect(allBookmarks).to.eql(expected);
        });
    });

    it('updateBookmark() updates a bookmark from the bookmarks table', () => {
      const idToUpdate = 3;
      const newBookmarkData = {
        title: 'New Title',
        url: testBookmarks[idToUpdate - 1].url,
        description: testBookmarks[idToUpdate - 1].description,
        rating: '1.0'
      };

      return BookmarksService.updateBookmark(db, idToUpdate, newBookmarkData)
        .then(() => BookmarksService.getById(db, idToUpdate))
        .then(b => {
          expect(b).to.eql({
            id: idToUpdate,
            ...newBookmarkData,
          })
        })
    });
  });

  context('Given bookmarks table has no data', () => {
    it('getAllBookmarks() resolves an empty array', () => {
      return BookmarksService.getAllBookmarks(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });
    it('insertBookmark() inserts a new bookmark and resolves the new bookmark with an id', () => {
      const newBookmark = {
        title: 'Google',
        url: 'http://www.google.com',
        description: 'search engine',
        rating: '3.0',
      };
      return BookmarksService.insertBookmark(db, newBookmark)
        .then(actual => {
          expect(actual).to.eql({
            id: 1, 
            title: newBookmark.title,
            url: newBookmark.url,
            description: newBookmark.description,
            rating: newBookmark.rating
          });
        });
    });
  });
});
  