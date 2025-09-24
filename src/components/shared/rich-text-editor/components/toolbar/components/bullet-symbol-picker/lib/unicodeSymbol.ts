export interface UnicodeSymbol {
  code: string;
  name: string;
  description?: string;
}

export interface Symbol {
  value: string;
  label: string;
  unicode: string;
  name: string;
  category: string;
}

export const UNICODE_SYMBOL_COLLECTIONS = {
  basic: [
    { code: '2022', name: 'Bullet', description: 'Standard bullet point' },
    { code: '2023', name: 'Triangular Bullet', description: 'Triangle-shaped bullet' },
    { code: '25E6', name: 'White Bullet', description: 'Hollow circle bullet' },
    { code: '2043', name: 'Hyphen Bullet', description: 'Hyphen-style bullet' },
    { code: '204C', name: 'Black Leftwards Bullet', description: 'Left-pointing bullet' },
    { code: '204D', name: 'Black Rightwards Bullet', description: 'Right-pointing bullet' },
    { code: '2219', name: 'Bullet Operator', description: 'Mathematical bullet' },
    { code: '00B7', name: 'Middle Dot', description: 'Centered dot' },
    { code: '00A4', name: 'Generic Currency Symbol', description: 'Currency symbol' },
    { code: '2024', name: 'One Dot Leader', description: 'Single dot leader' },
  ],

  arrows: [
    { code: '2192', name: 'Rightwards Arrow', description: 'Right arrow' },
    { code: '2190', name: 'Leftwards Arrow', description: 'Left arrow' },
    { code: '2193', name: 'Downwards Arrow', description: 'Down arrow' },
    { code: '2191', name: 'Upwards Arrow', description: 'Up arrow' },
    { code: '21D2', name: 'Rightwards Double Arrow', description: 'Double right arrow' },
    { code: '21D0', name: 'Leftwards Double Arrow', description: 'Double left arrow' },
    { code: '21D3', name: 'Downwards Double Arrow', description: 'Double down arrow' },
    { code: '21D1', name: 'Upwards Double Arrow', description: 'Double up arrow' },
    { code: '27A4', name: 'Black Rightwards Arrowhead', description: 'Black arrowhead right' },
    { code: '2794', name: 'Heavy Wide-Headed Rightwards Arrow', description: 'Heavy right arrow' },
    { code: '279C', name: 'Heavy Round-Tipped Rightwards Arrow', description: 'Round-tipped arrow' },
    { code: '279E', name: 'Heavy Triangle-Headed Rightwards Arrow', description: 'Triangle arrow' },
    { code: '25B6', name: 'Black Right-Pointing Triangle', description: 'Play button style' },
    { code: '25C0', name: 'Black Left-Pointing Triangle', description: 'Reverse play style' },
  ],

  shapes: [
    { code: '25A0', name: 'Black Square', description: 'Filled square' },
    { code: '25A1', name: 'White Square', description: 'Empty square' },
    { code: '25B2', name: 'Black Up-pointing Triangle', description: 'Filled up triangle' },
    { code: '25B3', name: 'White Up-pointing Triangle', description: 'Empty up triangle' },
    { code: '25BC', name: 'Black Down-pointing Triangle', description: 'Filled down triangle' },
    { code: '25BD', name: 'White Down-pointing Triangle', description: 'Empty down triangle' },
    { code: '25CF', name: 'Black Circle', description: 'Filled circle' },
    { code: '25CB', name: 'White Circle', description: 'Empty circle' },
    { code: '25C6', name: 'Black Diamond', description: 'Filled diamond' },
    { code: '25C7', name: 'White Diamond', description: 'Empty diamond' },
    { code: '25AA', name: 'Black Small Square', description: 'Small filled square' },
    { code: '25AB', name: 'White Small Square', description: 'Small empty square' },
    { code: '25AE', name: 'Black Vertical Rectangle', description: 'Vertical bar' },
    { code: '25AF', name: 'White Vertical Rectangle', description: 'Empty vertical bar' },
  ],

  decorative: [
    { code: '2605', name: 'Black Star', description: 'Filled star' },
    { code: '2606', name: 'White Star', description: 'Empty star' },
    { code: '2665', name: 'Black Heart', description: 'Filled heart' },
    { code: '2661', name: 'White Heart', description: 'Empty heart' },
    { code: '2660', name: 'Black Spade', description: 'Spade suit' },
    { code: '2663', name: 'Black Club', description: 'Club suit' },
    { code: '2666', name: 'Black Diamond Suit', description: 'Diamond suit' },
    { code: '2662', name: 'White Diamond Suit', description: 'Empty diamond suit' },
    { code: '2698', name: 'Flower', description: 'Flower symbol' },
    { code: '269B', name: 'Atom Symbol', description: 'Atom symbol' },
    { code: '269C', name: 'Fleur-de-lis', description: 'French lily' },
    { code: '26AB', name: 'Medium Black Circle', description: 'Medium circle' },
    { code: '2740', name: 'White Florette', description: 'Decorative flower' },
    { code: '2741', name: 'Eight Petalled Outlined Black Florette', description: '8-petal flower' },
  ],

  geometric: [
    { code: '25C8', name: 'White Circle with Black Dot', description: 'Target symbol' },
    { code: '25C9', name: 'Fisheye', description: 'Fisheye symbol' },
    { code: '25CA', name: 'Lozenge', description: 'Diamond shape' },
    { code: '25CE', name: 'Bullseye', description: 'Bullseye target' },
    { code: '25D0', name: 'Circle with Left Half Black', description: 'Half-filled circle left' },
    { code: '25D1', name: 'Circle with Right Half Black', description: 'Half-filled circle right' },
    { code: '25D2', name: 'Circle with Lower Half Black', description: 'Half-filled circle bottom' },
    { code: '25D3', name: 'Circle with Upper Half Black', description: 'Half-filled circle top' },
    { code: '25E0', name: 'Upper Half Circle', description: 'Top semicircle' },
    { code: '25E1', name: 'Lower Half Circle', description: 'Bottom semicircle' },
    { code: '25E2', name: 'Black Lower Right Triangle', description: 'Corner triangle' },
    { code: '25E3', name: 'Black Lower Left Triangle', description: 'Corner triangle' },
  ],

  check: [
    { code: '2713', name: 'Check Mark', description: 'Standard checkmark' },
    { code: '2714', name: 'Heavy Check Mark', description: 'Bold checkmark' },
    { code: '2715', name: 'Multiplication X', description: 'X mark' },
    { code: '2716', name: 'Heavy Multiplication X', description: 'Bold X mark' },
    { code: '2717', name: 'Ballot X', description: 'Ballot X' },
    { code: '2718', name: 'Heavy Ballot X', description: 'Heavy ballot X' },
    { code: '2610', name: 'Ballot Box', description: 'Empty checkbox' },
    { code: '2611', name: 'Ballot Box with Check', description: 'Checked checkbox' },
    { code: '2612', name: 'Ballot Box with X', description: 'X-marked checkbox' },
    { code: '2620', name: 'Skull and Crossbones', description: 'Danger symbol' },
  ],

  math: [
    { code: '2212', name: 'Minus Sign', description: 'Mathematical minus' },
    { code: '00D7', name: 'Multiplication Sign', description: 'Multiplication ×' },
    { code: '00F7', name: 'Division Sign', description: 'Division ÷' },
    { code: '00B1', name: 'Plus-Minus Sign', description: 'Plus-minus ±' },
    { code: '2260', name: 'Not Equal To', description: 'Not equal ≠' },
    { code: '2264', name: 'Less-Than or Equal To', description: 'Less equal ≤' },
    { code: '2265', name: 'Greater-Than or Equal To', description: 'Greater equal ≥' },
    { code: '221E', name: 'Infinity', description: 'Infinity symbol ∞' },
    { code: '2211', name: 'N-Ary Summation', description: 'Summation Σ' },
    { code: '220F', name: 'N-Ary Product', description: 'Product Π' },
  ]
};

export const createSymbolFromUnicode = (code: string, name: string, category: string): Symbol => {
  const codePoint = parseInt(code, 16);
  const character = String.fromCodePoint(codePoint);

  return {
    value: code.toLowerCase(),
    label: character,
    unicode: `U+${code}`,
    name: name,
    category: category
  };
};

export const getAllSymbols = (): Symbol[] => {
  const allSymbols: Symbol[] = [];

  Object.entries(UNICODE_SYMBOL_COLLECTIONS).forEach(([category, symbols]) => {
    symbols.forEach(sym => {
      allSymbols.push(createSymbolFromUnicode(sym.code, sym.name, category));
    });
  });

  return allSymbols;
};

export const getSymbolsByCategory = (category: string): Symbol[] => {
  if (category === 'all') {
    return getAllSymbols();
  }

  const categorySymbols = UNICODE_SYMBOL_COLLECTIONS[category as keyof typeof UNICODE_SYMBOL_COLLECTIONS];
  if (!categorySymbols) return [];

  return categorySymbols.map(sym =>
    createSymbolFromUnicode(sym.code, sym.name, category)
  );
};

export const searchSymbols = (query: string): Symbol[] => {
  const allSymbols = getAllSymbols();
  const searchTerm = query.toLowerCase();

  return allSymbols.filter(symbol =>
    symbol.name.toLowerCase().includes(searchTerm) ||
    symbol.unicode.toLowerCase().includes(searchTerm) ||
    symbol.category.toLowerCase().includes(searchTerm)
  );
};

export const getCategories = (): string[] => {
  return ['all', ...Object.keys(UNICODE_SYMBOL_COLLECTIONS)];
};

// Popular
export const POPULAR_SYMBOLS = [
  '2022', // Bullet
  '25CF', // Black Circle
  '25A0', // Black Square
  '2713', // Check Mark
  '2192', // Right Arrow
  '2605', // Black Star
  '25C6', // Black Diamond
  '25B6', // Play Triangle
];

export const getPopularSymbols = (): Symbol[] => {
  const allSymbols = getAllSymbols();
  return POPULAR_SYMBOLS.map(code => 
    allSymbols.find(sym => sym.value === code.toLowerCase())
  ).filter(Boolean) as Symbol[];
};