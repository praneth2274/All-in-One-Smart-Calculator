const Favorite = require('../models/Favorite');

let inMemoryFavorites = [];

const getFavorites = async (req, res) => {
  try {
    try {
      const favs = await Favorite.find({ userId: req.user._id });
      if (favs && favs.length > 0) return res.json(favs);
    } catch (e) {}

    const userFavs = inMemoryFavorites.filter(f => String(f.userId) === String(req.user._id));
    res.json(userFavs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const { calculatorSlug, calculatorTitle, category } = req.body;
    const userId = req.user._id;

    try {
      const existing = await Favorite.findOne({ userId, calculatorSlug });
      if (existing) {
        await Favorite.deleteOne({ _id: existing._id });
        return res.json({ isFavorite: false, message: 'Removed from favorites' });
      } else {
        const fav = await Favorite.create({ userId, calculatorSlug, calculatorTitle, category });
        return res.json({ isFavorite: true, favorite: fav, message: 'Added to favorites' });
      }
    } catch (e) {
      const idx = inMemoryFavorites.findIndex(f => String(f.userId) === String(userId) && f.calculatorSlug === calculatorSlug);
      if (idx >= 0) {
        inMemoryFavorites.splice(idx, 1);
        return res.json({ isFavorite: false, message: 'Removed from favorites' });
      } else {
        const mockFav = { _id: 'fav_' + Date.now(), userId, calculatorSlug, calculatorTitle, category };
        inMemoryFavorites.push(mockFav);
        return res.json({ isFavorite: true, favorite: mockFav, message: 'Added to favorites' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFavorites, toggleFavorite };
