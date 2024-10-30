export const getBookmarks = () => {
  const bookmarks = localStorage.getItem('bookmarks');
  return bookmarks ? JSON.parse(bookmarks) : [];
};

export const saveBookmark = (article) => {
  const bookmarks = getBookmarks();
  const isBookmarked = bookmarks.some((bookmark) => bookmark.url === article.url);
  
  if (!isBookmarked) {
    bookmarks.push(article);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  return !isBookmarked;
};

export const removeBookmark = (articleUrl) => {
  const bookmarks = getBookmarks();
  const filteredBookmarks = bookmarks.filter((bookmark) => bookmark.url !== articleUrl);
  localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks));
};

export const isArticleBookmarked = (articleUrl) => {
  const bookmarks = getBookmarks();
  return bookmarks.some((bookmark) => bookmark.url === articleUrl);
};
