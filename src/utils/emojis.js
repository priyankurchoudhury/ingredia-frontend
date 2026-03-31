const INGREDIENT_EMOJIS = {
  chicken: '🍗', rice: '🍚', milk: '🥛', eggs: '🥚', egg: '🥚',
  bread: '🍞', butter: '🧈', cheese: '🧀', tomato: '🍅', onion: '🧅',
  garlic: '🧄', potato: '🥔', carrot: '🥕', lemon: '🍋', apple: '🍎',
  banana: '🍌', cream: '🍦', soup: '🍲', fish: '🐟', shrimp: '🍤',
  beef: '🥩', pork: '🥓', mushroom: '🍄', corn: '🌽', pepper: '🌶️',
  salt: '🧂', sugar: '🍬', flour: '🌾', pasta: '🍝', noodles: '🍜',
  oil: '🫒', spinach: '🥬', broccoli: '🥦', avocado: '🥑', coconut: '🥥',
  honey: '🍯', chocolate: '🍫', coffee: '☕', tea: '🍵', water: '💧',
  paneer: '🧀', yogurt: '🥛', curd: '🥛', dal: '🥘', lentil: '🥘',
  ginger: '🫚', chili: '🌶️', mango: '🥭', orange: '🍊', grape: '🍇',
  strawberry: '🍓', pineapple: '🍍', watermelon: '🍉', peach: '🍑',
  pea: '🫛', bean: '🫘', cucumber: '🥒', lettuce: '🥬', cherry: '🍒',
};

const TAG_EMOJIS = {
  spicy: '🌶️', quick: '⏱️', 'quick meal': '⏱️', 'low carb': '🥗',
  'kid-friendly': '👶', 'high protein': '💪', budget: '💰',
  'comfort food': '🍲', healthy: '🥗', italian: '🇮🇹', indian: '🇮🇳',
  asian: '🍜', vegetarian: '🌿', vegan: '🌱',
};

export function getIngredientEmoji(name) {
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(INGREDIENT_EMOJIS)) {
    if (lower.includes(key)) return emoji;
  }
  return '🥘';
}

export function getTagEmoji(tag) {
  return TAG_EMOJIS[tag.toLowerCase()] || '🏷️';
}
