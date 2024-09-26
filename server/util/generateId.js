async function generateId(value) {
    const { nanoid } = await import('nanoid');
    const id = nanoid(value);
    return id;
  }

module.exports = generateId; 