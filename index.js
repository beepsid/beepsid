// Vercel entrypoint - API endpoints are in /api folder
module.exports = (req, res) => {
  res.status(404).json({ error: 'Not found' });
};
