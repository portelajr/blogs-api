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
    const err = { code: 400, message: '"categoryIds" is required' };
    throw err;
  }
};

const dontUpdate = (data) => {
  if (data && data.categoryIds === true) {
    const err = { code: 400, message: 'Categories cannot be edited' };
    throw err;
  }
}; 

const blogpostEntries = (title, content, categoryIds) => {
  validateTitle(title);
  validateContent(content);
  validateCategoryIds(categoryIds);
};

const updateInputs = (data) => {
  const { title, content } = data;
  validateTitle(title);
  validateContent(content);
  dontUpdate(data);
};

module.exports = { blogpostEntries, updateInputs };
