const validateTitle = (title) => {
  if (!title) {
    const err = { code: 400, message: '"title" is required' };
    throw err;
  }
};

const validateContent = (content) => {
  if (!content) {
    const err = { code: 400, message: '"content" is required' };
    throw err;
  }
};

const validateCategoryIds = (categoryIds) => {
  if (!categoryIds) {
    const err = { code: 400, message: '"categoryId" is required' };
    throw err;
  }
};

const blogpostEntries = (title, content, categoryIds) => {
  validateTitle(title);
  validateContent(content);
  validateCategoryIds(categoryIds);
};

module.exports = { blogpostEntries };
