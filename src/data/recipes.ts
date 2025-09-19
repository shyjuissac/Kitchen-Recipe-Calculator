import { CookieRecipe } from '../types/Recipe';

const cookieRecipes: CookieRecipe[] = [
  {
    id: 'raspberry-caramel-white-chocolate',
    name: 'Raspberry Caramel & White Chocolate',
    categoryId: 'cookies',
    batchSize: 5,
    ingredients: [
      { name: 'Butter unsalted', amount: 125, unit: 'g' },
      { name: 'Plain flour', amount: 300, unit: 'g' },
      { name: 'Light brown sugar', amount: 100, unit: 'g' },
      { name: 'Caster sugar', amount: 75, unit: 'g' },
      { name: 'Egg', amount: 1, unit: 'piece' },
      { name: 'Baking powder', amount: 9, unit: 'g' },
      { name: 'Bicarbonate soda', amount: 4, unit: 'g' },
      { name: 'Salt', amount: 3, unit: 'g' },
      { name: 'White chocolate chips', amount: 100, unit: 'g' },
      { name: 'Beetroot powder', amount: 9, unit: 'g' },
      { name: 'Freeze dried raspberry whole pieces', amount: 12, unit: 'g' }
    ],
    subRecipes: [
      {
        id: 'raspberry-caramel',
        name: 'Raspberry Caramel',
        ingredients: [
          { name: 'Caster sugar', amount: 35, unit: 'g' },
          { name: 'Water', amount: 20, unit: 'ml' },
          { name: 'Unsalted butter', amount: 30, unit: 'g' },
          { name: 'Raspberry compound', amount: 25, unit: 'g' }
        ],
        yield: { amount: 110, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'Raspberry caramel', weight: 120, unit: 'g', isSubRecipe: true },
        { name: 'White chocolate slab', weight: 120, unit: 'g' },
        { name: 'White chocolate drops/chips', weight: 6, unit: 'g' },
        { name: 'Freeze dried raspberry', weight: 0.25, unit: 'g' }
      ]
    },
    instructions: [
      'Make raspberry caramel first by heating sugar and water until golden',
      'Add butter and raspberry compound to caramel',
      'Prepare cookie dough with all main ingredients',
      'Shape cookies and add raspberry caramel filling',
      'Top with white chocolate slab and chips',
      'Finish with freeze dried raspberry pieces',
      'Bake according to standard cookie procedure'
    ]
  },
  {
    id: 'sticky-toffee-pudding',
    name: 'Sticky Toffee Pudding',
    photo: '/biscoff carmel cookie 2 copy.png',
    categoryId: 'cookies',
    batchSize: 5,
    ingredients: [
      { name: 'Butter unsalted', amount: 125, unit: 'g' },
      { name: 'Plain flour', amount: 300, unit: 'g' },
      { name: 'Dark muscovado sugar', amount: 100, unit: 'g' },
      { name: 'Caster sugar', amount: 75, unit: 'g' },
      { name: 'Egg', amount: 1, unit: 'piece' },
      { name: 'Baking powder', amount: 9, unit: 'g' },
      { name: 'Bicarbonate soda', amount: 4, unit: 'g' },
      { name: 'Salt', amount: 3, unit: 'g' }
    ],
    subRecipes: [
      {
        id: 'sticky-toffee-sauce',
        name: 'Sticky Toffee Sauce',
        ingredients: [
          { name: 'Light brown sugar', amount: 45, unit: 'g' },
          { name: 'Salted butter', amount: 13, unit: 'g' },
          { name: 'Double cream', amount: 54, unit: 'g' },
          { name: 'Black treacle', amount: 8, unit: 'g' }
        ],
        yield: { amount: 120, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'Sticky toffee sauce (piped in)', weight: 120, unit: 'g', isSubRecipe: true },
        { name: 'Sticky toffee sauce (on top)', weight: 90, unit: 'g', isSubRecipe: true },
        { name: 'Golden syrup sponge crumbled', weight: 48, unit: 'g' },
        { name: 'Chocolate digestive biscuit crumbled', weight: 6, unit: 'g' },
        { name: 'Sliced date', weight: 3, unit: 'g' },
        { name: 'Mini caramel fudge chunks', weight: 9, unit: 'g' }
      ]
    },
    instructions: [
      'Prepare sticky toffee sauce by heating sugar until caramelized',
      'Add butter, cream, and treacle to make sauce',
      'Make cookie dough base with all main ingredients',
      'Pipe sticky toffee sauce into cookie centers',
      'Add crumbled sponge and digestive pieces',
      'Top with more sauce, dates, and fudge chunks',
      'Bake until golden and set'
    ]
  },
  {
    id: 'lemon-meringue',
    name: 'Lemon Meringue',
    categoryId: 'cookies',
    batchSize: 5,
    ingredients: [
      { name: 'Butter unsalted', amount: 125, unit: 'g' },
      { name: 'Plain flour', amount: 300, unit: 'g' },
      { name: 'Light brown sugar', amount: 100, unit: 'g' },
      { name: 'Caster sugar', amount: 75, unit: 'g' },
      { name: 'Egg', amount: 1, unit: 'piece' },
      { name: 'Baking powder', amount: 9, unit: 'g' },
      { name: 'Bicarbonate soda', amount: 4, unit: 'g' },
      { name: 'Salt', amount: 3, unit: 'g' },
      { name: 'Medium lemon zest', amount: 18, unit: 'g' },
      { name: 'Mixed peel', amount: 100, unit: 'g' },
      { name: 'Mini marshmallow', amount: 50, unit: 'g' }
    ],
    subRecipes: [],
    finalBuild: {
      elements: [
        { name: 'Lemon curd (piped in)', weight: 150, unit: 'g' },
        { name: 'Lemon curd (piped on top)', weight: 75, unit: 'g' },
        { name: 'Meringue pieces', weight: 20, unit: 'g' },
        { name: 'Lemon biscuit crumb', weight: 1.5, unit: 'g' },
        { name: 'Lemon zest', weight: 0.25, unit: 'g' }
      ]
    },
    instructions: [
      'Prepare cookie dough with lemon zest and mixed peel',
      'Add mini marshmallows to the dough',
      'Shape cookies and create wells for filling',
      'Pipe lemon curd into centers and on top',
      'Add meringue pieces and biscuit crumb',
      'Finish with fresh lemon zest',
      'Bake until edges are golden'
    ]
  },
  {
    id: 'milk-chocolate-sea-salt',
    name: 'Milk Chocolate & Sea Salt',
    photo: '/Choc and Salt cookie copy.png',
    categoryId: 'cookies',
    batchSize: 5,
    ingredients: [
      { name: 'Butter unsalted', amount: 125, unit: 'g' },
      { name: 'Plain flour', amount: 300, unit: 'g' },
      { name: 'Light brown sugar', amount: 100, unit: 'g' },
      { name: 'Caster sugar', amount: 75, unit: 'g' },
      { name: 'Egg', amount: 1, unit: 'piece' },
      { name: 'Baking powder', amount: 9, unit: 'g' },
      { name: 'Bicarbonate soda', amount: 4, unit: 'g' },
      { name: 'Salt', amount: 3, unit: 'g' },
      { name: 'Milk chocolate chips', amount: 100, unit: 'g' }
    ],
    subRecipes: [
      {
        id: 'milk-chocolate-ganache',
        name: 'Milk Chocolate Ganache',
        ingredients: [
          { name: 'Milk chocolate', amount: 140, unit: 'g' },
          { name: 'Double cream', amount: 100, unit: 'ml' },
          { name: 'Glucose syrup', amount: 1, unit: 'g' }
        ],
        yield: { amount: 240, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'Milk chocolate slab', weight: 180, unit: 'g' },
        { name: 'Milk chocolate ganache', weight: 240, unit: 'g', isSubRecipe: true },
        { name: 'Maldon sea salt', weight: 0.25, unit: 'g' }
      ]
    },
    instructions: [
      'Make ganache by heating cream and pouring over chocolate',
      'Add glucose syrup and mix until smooth',
      'Prepare cookie dough with milk chocolate chips',
      'Shape cookies and add chocolate slab',
      'Pipe ganache over cookies',
      'Finish with a pinch of Maldon sea salt',
      'Bake until just set'
    ]
  },
  {
    id: 'dark-chocolate-sea-salt',
    name: 'Dark Chocolate & Sea Salt',
    photo: '/dark choc Cookie with sea salt copy.png',
    categoryId: 'cookies',
    batchSize: 5,
    ingredients: [
      { name: 'Butter unsalted', amount: 125, unit: 'g' },
      { name: 'Plain flour', amount: 300, unit: 'g' },
      { name: 'Light brown sugar', amount: 100, unit: 'g' },
      { name: 'Caster sugar', amount: 75, unit: 'g' },
      { name: 'Egg', amount: 1, unit: 'piece' },
      { name: 'Baking powder', amount: 9, unit: 'g' },
      { name: 'Bicarbonate soda', amount: 4, unit: 'g' },
      { name: 'Salt', amount: 3, unit: 'g' },
      { name: 'Dark chocolate chips', amount: 100, unit: 'g' }
    ],
    subRecipes: [
      {
        id: 'dark-chocolate-ganache',
        name: 'Dark Chocolate Ganache',
        ingredients: [
          { name: 'Dark chocolate', amount: 140, unit: 'g' },
          { name: 'Double cream', amount: 100, unit: 'ml' },
          { name: 'Glucose syrup', amount: 1, unit: 'g' }
        ],
        yield: { amount: 240, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'Dark chocolate slab', weight: 180, unit: 'g' },
        { name: 'Dark chocolate ganache', weight: 240, unit: 'g', isSubRecipe: true },
        { name: 'Maldon sea salt', weight: 0.25, unit: 'g' }
      ]
    },
    instructions: [
      'Make ganache by heating cream and pouring over dark chocolate',
      'Add glucose syrup and mix until smooth',
      'Prepare cookie dough with dark chocolate chips',
      'Shape cookies and add chocolate slab',
      'Pipe ganache over cookies',
      'Finish with a pinch of Maldon sea salt',
      'Bake until edges are firm'
    ]
  },
  {
    id: 'white-chocolate-sea-salt',
    name: 'White Chocolate & Sea Salt',
    categoryId: 'cookies',
    batchSize: 5,
    ingredients: [
      { name: 'Butter unsalted', amount: 125, unit: 'g' },
      { name: 'Plain flour', amount: 300, unit: 'g' },
      { name: 'Light brown sugar', amount: 100, unit: 'g' },
      { name: 'Caster sugar', amount: 75, unit: 'g' },
      { name: 'Egg', amount: 1, unit: 'piece' },
      { name: 'Baking powder', amount: 9, unit: 'g' },
      { name: 'Bicarbonate soda', amount: 4, unit: 'g' },
      { name: 'Salt', amount: 3, unit: 'g' },
      { name: 'White chocolate chips', amount: 100, unit: 'g' }
    ],
    subRecipes: [
      {
        id: 'white-chocolate-ganache',
        name: 'White Chocolate Ganache',
        ingredients: [
          { name: 'White chocolate', amount: 140, unit: 'g' },
          { name: 'Double cream', amount: 100, unit: 'ml' },
          { name: 'Glucose syrup', amount: 1, unit: 'g' }
        ],
        yield: { amount: 240, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'White chocolate slab', weight: 180, unit: 'g' },
        { name: 'White chocolate ganache', weight: 240, unit: 'g', isSubRecipe: true },
        { name: 'Maldon sea salt', weight: 0.25, unit: 'g' }
      ]
    },
    instructions: [
      'Make ganache by heating cream and pouring over white chocolate',
      'Add glucose syrup and mix until smooth',
      'Prepare cookie dough with white chocolate chips',
      'Shape cookies and add chocolate slab',
      'Pipe ganache over cookies',
      'Finish with a pinch of Maldon sea salt',
      'Bake until just golden'
    ]
  },
  {
    id: 'triple-chocolate-sea-salt',
    name: 'Triple Chocolate & Sea Salt',
    photo: '/Double Choc Cookie copy.png',
    categoryId: 'cookies',
    batchSize: 5,
    ingredients: [
      { name: 'Butter unsalted', amount: 125, unit: 'g' },
      { name: 'Plain flour', amount: 300, unit: 'g' },
      { name: 'Light brown sugar', amount: 100, unit: 'g' },
      { name: 'Caster sugar', amount: 75, unit: 'g' },
      { name: 'Egg', amount: 1, unit: 'piece' },
      { name: 'Baking powder', amount: 9, unit: 'g' },
      { name: 'Bicarbonate soda', amount: 4, unit: 'g' },
      { name: 'Salt', amount: 3, unit: 'g' },
      { name: 'Milk chocolate chips', amount: 33, unit: 'g' },
      { name: 'Dark chocolate chips', amount: 33, unit: 'g' },
      { name: 'White chocolate chips', amount: 33, unit: 'g' }
    ],
    subRecipes: [],
    finalBuild: {
      elements: [
        { name: 'Milk chocolate slab', weight: 60, unit: 'g' },
        { name: 'Dark chocolate slab', weight: 60, unit: 'g' },
        { name: 'White chocolate slab', weight: 60, unit: 'g' },
        { name: 'Maldon sea salt', weight: 0.25, unit: 'g' }
      ]
    },
    instructions: [
      'Prepare cookie dough with all three types of chocolate chips',
      'Shape cookies ensuring even distribution of chips',
      'Top each cookie with milk, dark, and white chocolate slabs',
      'Arrange chocolate slabs in an appealing pattern',
      'Finish with a pinch of Maldon sea salt',
      'Bake until edges are set but centers remain soft'
    ]
  },
  {
    id: 'smores-cookies-cream',
    name: 'S\'mores Cookies & Cream',
    categoryId: 'cookies',
    batchSize: 5,
    ingredients: [
      { name: 'Butter unsalted', amount: 125, unit: 'g' },
      { name: 'Plain flour', amount: 300, unit: 'g' },
      { name: 'Light brown sugar', amount: 100, unit: 'g' },
      { name: 'Caster sugar', amount: 75, unit: 'g' },
      { name: 'Egg', amount: 1, unit: 'piece' },
      { name: 'Baking powder', amount: 9, unit: 'g' },
      { name: 'Bicarbonate soda', amount: 4, unit: 'g' },
      { name: 'Salt', amount: 3, unit: 'g' },
      { name: 'Black cocoa powder', amount: 30, unit: 'g' },
      { name: 'White chocolate chips', amount: 70, unit: 'g' },
      { name: 'Mini marshmallow', amount: 50, unit: 'g' }
    ],
    subRecipes: [],
    finalBuild: {
      elements: [
        { name: 'Asda cookies & cream biscuits (halved)', weight: 6, unit: 'pieces' },
        { name: 'Asda cookies & cream biscuits crumb', weight: 0.5, unit: 'g' },
        { name: 'Milk chocolate square', weight: 95, unit: 'g' }
      ]
    },
    instructions: [
      'Prepare chocolate cookie dough with black cocoa powder',
      'Mix in white chocolate chips and mini marshmallows',
      'Shape cookies and press halved cookies & cream biscuits on top',
      'Add milk chocolate squares to each cookie',
      'Sprinkle with biscuit crumbs',
      'Bake until marshmallows are lightly toasted'
    ]
  },
  {
    id: 'eton-mess',
    name: 'Eton Mess',
    categoryId: 'cookies',
    batchSize: 5,
    ingredients: [
      { name: 'Butter unsalted', amount: 125, unit: 'g' },
      { name: 'Plain flour', amount: 300, unit: 'g' },
      { name: 'Light brown sugar', amount: 100, unit: 'g' },
      { name: 'Caster sugar', amount: 75, unit: 'g' },
      { name: 'Egg', amount: 1, unit: 'piece' },
      { name: 'Baking powder', amount: 9, unit: 'g' },
      { name: 'Bicarbonate soda', amount: 4, unit: 'g' },
      { name: 'Salt', amount: 3, unit: 'g' },
      { name: 'Marshmallow', amount: 50, unit: 'g' },
      { name: 'White chocolate chips', amount: 70, unit: 'g' },
      { name: 'Freeze dried strawberry', amount: 10, unit: 'g' }
    ],
    subRecipes: [
      {
        id: 'strawberry-ganache',
        name: 'Strawberry Ganache',
        ingredients: [
          { name: 'White chocolate', amount: 100, unit: 'g' },
          { name: 'Double cream', amount: 50, unit: 'ml' },
          { name: 'Vanilla bean paste', amount: 5, unit: 'g' },
          { name: 'Glucose syrup', amount: 1, unit: 'g' },
          { name: 'Strawberry compound', amount: 21, unit: 'g' }
        ],
        yield: { amount: 177, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'Strawberry ganache (piped in)', weight: 120, unit: 'g', isSubRecipe: true },
        { name: 'Strawberry ganache (piped on top)', weight: 120, unit: 'g', isSubRecipe: true },
        { name: 'Freeze dried strawberry', weight: 15, unit: 'g' },
        { name: 'Meringue crumb', weight: 0.25, unit: 'g' }
      ]
    },
    instructions: [
      'Make strawberry ganache with white chocolate and cream',
      'Add vanilla, glucose, and strawberry compound',
      'Prepare cookie dough with marshmallows and white chocolate',
      'Add freeze dried strawberries to dough',
      'Pipe ganache into cookie centers and on top',
      'Finish with freeze dried strawberries and meringue crumb',
      'Bake until lightly golden'
    ]
  },
  {
    id: 'birthday-cake',
    name: 'Birthday Cake',
    photo: '/Bithday cookie instagram copy.png',
    categoryId: 'cookies',
    batchSize: 5,
    ingredients: [
      { name: 'Butter unsalted', amount: 125, unit: 'g' },
      { name: 'Plain flour', amount: 300, unit: 'g' },
      { name: 'Light brown sugar', amount: 100, unit: 'g' },
      { name: 'Caster sugar', amount: 75, unit: 'g' },
      { name: 'Egg', amount: 1, unit: 'piece' },
      { name: 'Baking powder', amount: 9, unit: 'g' },
      { name: 'Bicarbonate soda', amount: 4, unit: 'g' },
      { name: 'Salt', amount: 3, unit: 'g' },
      { name: 'White chocolate chips', amount: 30, unit: 'g' },
      { name: 'Coloured sprinkles', amount: 30, unit: 'g' }
    ],
    subRecipes: [
      {
        id: 'vanilla-ganache',
        name: 'White Chocolate Vanilla Ganache',
        ingredients: [
          { name: 'White chocolate', amount: 155, unit: 'g' },
          { name: 'Double cream', amount: 77, unit: 'ml' },
          { name: 'Vanilla bean paste', amount: 7, unit: 'g' },
          { name: 'Glucose syrup', amount: 1, unit: 'g' }
        ],
        yield: { amount: 240, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'White chocolate vanilla ganache (piped in)', weight: 120, unit: 'g', isSubRecipe: true },
        { name: 'White chocolate ganache (on top)', weight: 120, unit: 'g', isSubRecipe: true },
        { name: 'White chocolate disc with sprinkles', weight: 18, unit: 'pieces' },
        { name: 'Custard cream biscuit', weight: 12, unit: 'pieces' }
      ]
    },
    instructions: [
      'Make vanilla ganache with white chocolate and cream',
      'Add vanilla bean paste and glucose syrup',
      'Prepare festive cookie dough with sprinkles',
      'Mix in white chocolate chips',
      'Pipe ganache into centers and on top',
      'Decorate with chocolate discs and custard cream biscuits',
      'Bake until edges are lightly golden'
    ]
  }
];

// Large Cheesecake Recipes
export const largeCheesecakeRecipes: CookieRecipe[] = [
  {
    id: 'baked-strawberries-cream',
    name: 'Baked Strawberries & Cream',
    categoryId: 'large-cheesecakes',
    batchSize: 1, // 8" x 2.5" cake ring
    ingredients: [],
    subRecipes: [
      {
        id: 'white-chocolate-strawberry-shard',
        name: 'White Chocolate & Strawberry Shard',
        ingredients: [
          { name: 'White chocolate', amount: 365, unit: 'g' },
          { name: 'White chocolate chip', amount: 15, unit: 'g' },
          { name: 'Freeze dried strawberry', amount: 6, unit: 'g' }
        ],
        yield: { amount: 386, unit: 'g' }
      },
      {
        id: 'strawberry-compote',
        name: 'Strawberry Compote',
        ingredients: [
          { name: 'Strawberries', amount: 1200, unit: 'g' },
          { name: 'Caster sugar', amount: 400, unit: 'g' },
          { name: 'Lemon zest', amount: 3, unit: 'g' }
        ],
        yield: { amount: 1603, unit: 'g' }
      },
      {
        id: 'biscuit-mix-strawberry',
        name: 'Biscuit Mix',
        ingredients: [
          { name: 'Digestive biscuit', amount: 268, unit: 'g' },
          { name: 'Light brown sugar', amount: 30, unit: 'g' },
          { name: 'Golden syrup', amount: 30, unit: 'g' },
          { name: 'Salted butter', amount: 60, unit: 'g' },
          { name: 'Freeze dried strawberry', amount: 4.5, unit: 'g' },
          { name: 'White chocolate chips', amount: 30, unit: 'g' }
        ],
        yield: { amount: 422.5, unit: 'g' }
      },
      {
        id: 'cheese-mix-strawberry',
        name: 'Cheese Mix',
        ingredients: [
          { name: 'Cream cheese', amount: 420, unit: 'g' },
          { name: 'Caster sugar', amount: 93, unit: 'g' },
          { name: 'Mascarpone cheese', amount: 117, unit: 'g' },
          { name: 'Whole egg', amount: 75, unit: 'g' },
          { name: 'Egg yolk', amount: 61, unit: 'g' },
          { name: 'Vanilla extract', amount: 3, unit: 'g' },
          { name: 'Strawberry compote (from above)', amount: 187, unit: 'g' }
        ],
        yield: { amount: 956, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'White chocolate & strawberry shard', weight: 88, unit: 'g', isSubRecipe: true },
        { name: 'Strawberry compote', weight: 150, unit: 'g', isSubRecipe: true },
        { name: 'Fresh strawberry', weight: 10, unit: 'pieces' },
        { name: 'Meringue', weight: 17, unit: 'g' },
        { name: 'Freeze dried strawberry', weight: 2, unit: 'g' }
      ]
    },
    instructions: [
      'Make white chocolate & strawberry shard by melting chocolate and adding chips and freeze dried strawberry',
      'Prepare strawberry compote by cooking strawberries with sugar and lemon zest',
      'Make biscuit base by combining digestives, sugars, syrup, butter, and strawberry pieces',
      'Prepare cheese mix by combining all ingredients including strawberry compote',
      'Assemble in 8" x 2.5" cake ring with biscuit base and cheese mix',
      'Bake according to standard cheesecake procedure',
      'Top with shard, compote, fresh strawberries, meringue, and freeze dried strawberry'
    ]
  },
  {
    id: 'baked-salted-caramel',
    name: 'Baked Salted Caramel',
    categoryId: 'large-cheesecakes',
    batchSize: 1,
    ingredients: [],
    subRecipes: [
      {
        id: 'salted-caramel',
        name: 'Salted Caramel',
        ingredients: [
          { name: 'Caster sugar', amount: 320, unit: 'g' },
          { name: 'Double cream', amount: 440, unit: 'ml' },
          { name: 'Water', amount: 200, unit: 'ml' },
          { name: 'Salted butter', amount: 250, unit: 'g' },
          { name: 'Vanilla essence', amount: 5, unit: 'ml' },
          { name: 'Sea salt', amount: 3, unit: 'g' }
        ],
        yield: { amount: 1218, unit: 'g' }
      },
      {
        id: 'biscuit-mix-caramel',
        name: 'Biscuit Mix',
        ingredients: [
          { name: 'Plain digestive', amount: 470, unit: 'g' },
          { name: 'Cocoa powder', amount: 94, unit: 'g' },
          { name: 'Light brown sugar', amount: 47, unit: 'g' },
          { name: 'Golden syrup', amount: 47, unit: 'g' },
          { name: 'Salted butter', amount: 94, unit: 'g' }
        ],
        yield: { amount: 752, unit: 'g' }
      },
      {
        id: 'cheese-mix-caramel',
        name: 'Cheese Mix',
        ingredients: [
          { name: 'Cream cheese', amount: 420, unit: 'g' },
          { name: 'Caster sugar', amount: 93, unit: 'g' },
          { name: 'Mascarpone cheese', amount: 117, unit: 'g' },
          { name: 'Whole egg', amount: 75, unit: 'g' },
          { name: 'Egg yolk', amount: 61, unit: 'g' },
          { name: 'Vanilla extract', amount: 3, unit: 'g' },
          { name: 'Caramel (from above)', amount: 120, unit: 'g' },
          { name: 'Sea salt', amount: 1, unit: 'g' }
        ],
        yield: { amount: 890, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'Additional caramel for topping', weight: 200, unit: 'g', isSubRecipe: true }
      ]
    },
    instructions: [
      'Make salted caramel by heating sugar and water until golden, then adding cream, butter, vanilla, and salt',
      'Prepare chocolate biscuit base with digestives, cocoa, sugars, syrup, and butter',
      'Make cheese mix incorporating caramel and sea salt',
      'Assemble in 8" x 2.5" cake ring',
      'Bake according to standard procedure',
      'Top with additional caramel'
    ]
  },
  {
    id: 'baked-lemon-meringue',
    name: 'Baked Lemon Meringue',
    categoryId: 'large-cheesecakes',
    batchSize: 1,
    ingredients: [],
    subRecipes: [
      {
        id: 'julienne-lemon-zest-syrup',
        name: 'Julienne Lemon Zest in Syrup',
        ingredients: [
          { name: 'Lemon', amount: 2, unit: 'pieces' },
          { name: 'Water', amount: 200, unit: 'ml' },
          { name: 'Caster sugar', amount: 100, unit: 'g' }
        ],
        yield: { amount: 300, unit: 'g' }
      },
      {
        id: 'lemon-white-chocolate-shard',
        name: 'Lemon & White Chocolate Shard',
        ingredients: [
          { name: 'White chocolate', amount: 365, unit: 'g' },
          { name: 'White chocolate chip', amount: 15, unit: 'g' },
          { name: 'Fine grated lemon zest', amount: 10, unit: 'g' },
          { name: 'Crushed meringue', amount: 5, unit: 'g' }
        ],
        yield: { amount: 395, unit: 'g' }
      },
      {
        id: 'biscuit-mix-lemon',
        name: 'Biscuit Mix',
        ingredients: [
          { name: 'Digestive biscuit', amount: 245, unit: 'g' },
          { name: 'Light brown sugar', amount: 22, unit: 'g' },
          { name: 'Golden syrup', amount: 22, unit: 'g' },
          { name: 'Salted butter', amount: 44, unit: 'g' },
          { name: 'Lemon zest', amount: 6.5, unit: 'g' },
          { name: 'White chocolate chips', amount: 22, unit: 'g' },
          { name: 'Mixed peel', amount: 30, unit: 'g' }
        ],
        yield: { amount: 391.5, unit: 'g' }
      },
      {
        id: 'cheese-mix-lemon',
        name: 'Cheese Mix',
        ingredients: [
          { name: 'Cream cheese', amount: 410, unit: 'g' },
          { name: 'Caster sugar', amount: 91, unit: 'g' },
          { name: 'Mascarpone cheese', amount: 114, unit: 'g' },
          { name: 'Whole egg', amount: 73, unit: 'g' },
          { name: 'Egg yolk', amount: 59, unit: 'g' },
          { name: 'Vanilla extract', amount: 3, unit: 'g' },
          { name: 'Lemon curd', amount: 182, unit: 'g' },
          { name: 'Lemon zest', amount: 5.4, unit: 'g' },
          { name: 'White marshmallow', amount: 23, unit: 'g' }
        ],
        yield: { amount: 960.4, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'Lemon curd', weight: 195, unit: 'g' },
        { name: 'Julienne lemon zest in syrup', weight: 3, unit: 'g', isSubRecipe: true },
        { name: 'Boarders lemon drizzle melt biscuit', weight: 15, unit: 'g' },
        { name: 'Mixed peel', weight: 20, unit: 'g' },
        { name: 'Meringue', weight: 32, unit: 'g' },
        { name: 'Mini white marshmallow', weight: 13, unit: 'g' },
        { name: 'Lemon white chocolate shard', weight: 120, unit: 'g', isSubRecipe: true }
      ]
    },
    instructions: [
      'Prepare julienne lemon zest in sugar syrup',
      'Make lemon & white chocolate shard with zest and meringue pieces',
      'Create lemon-infused biscuit base with mixed peel and chocolate chips',
      'Prepare cheese mix with lemon curd, zest, and marshmallows',
      'Assemble and bake in 8" x 2.5" cake ring',
      'Top with lemon curd, zest syrup, biscuits, mixed peel, meringue, marshmallows, and shard'
    ]
  },
  {
    id: 'non-baked-pistachio-rocky-road',
    name: 'Non-Baked Pistachio & White Chocolate Rocky Road',
    categoryId: 'large-cheesecakes',
    batchSize: 1,
    ingredients: [],
    subRecipes: [
      {
        id: 'white-chocolate-pistachio-ganache',
        name: 'White Chocolate & Pistachio Ganache',
        ingredients: [
          { name: 'White chocolate', amount: 200, unit: 'g' },
          { name: 'Pistachio paste', amount: 35, unit: 'g' },
          { name: 'Double cream', amount: 140, unit: 'ml' },
          { name: 'Glucose syrup', amount: 20, unit: 'g' }
        ],
        yield: { amount: 395, unit: 'g' }
      },
      {
        id: 'rocky-road',
        name: 'Rocky Road',
        ingredients: [
          { name: 'White chocolate', amount: 235, unit: 'g' },
          { name: 'Digestive biscuit', amount: 200, unit: 'g' },
          { name: 'Mini marshmallow pink & white', amount: 20, unit: 'g' },
          { name: 'Dried sultana', amount: 40, unit: 'g' },
          { name: 'Pistachio', amount: 40, unit: 'g' }
        ],
        yield: { amount: 535, unit: 'g' }
      },
      {
        id: 'white-chocolate-pistachio-shard',
        name: 'White Chocolate & Pistachio Shard',
        ingredients: [
          { name: 'White chocolate', amount: 348, unit: 'g' },
          { name: 'Pistachio', amount: 40, unit: 'g' },
          { name: 'Dried fruit & cherry mix', amount: 35, unit: 'g' }
        ],
        yield: { amount: 423, unit: 'g' }
      },
      {
        id: 'biscuit-mix-pistachio',
        name: 'Biscuit Mix',
        ingredients: [
          { name: 'Digestive biscuit', amount: 535, unit: 'g' },
          { name: 'Salted butter', amount: 165, unit: 'g' },
          { name: 'Crushed pistachio', amount: 33, unit: 'g' },
          { name: 'White chocolate chips', amount: 33, unit: 'g' }
        ],
        yield: { amount: 766, unit: 'g' }
      },
      {
        id: 'cheese-mix-pistachio',
        name: 'Cheese Mix',
        ingredients: [
          { name: 'Cream cheese', amount: 500, unit: 'g' },
          { name: 'Caster sugar', amount: 133, unit: 'g' },
          { name: 'Double cream', amount: 66, unit: 'g' },
          { name: 'Pistachio paste', amount: 133, unit: 'g' },
          { name: 'White chocolate', amount: 33, unit: 'g' },
          { name: 'Pistachio', amount: 33, unit: 'g' },
          { name: 'Dried sultana & cherry mix', amount: 33, unit: 'g' },
          { name: 'Mini marshmallow', amount: 17, unit: 'g' },
          { name: 'Vanilla extract', amount: 7, unit: 'ml' },
          { name: 'Xantham gum', amount: 1.5, unit: 'g' }
        ],
        yield: { amount: 956.5, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'Rocky road', weight: 370, unit: 'g', isSubRecipe: true },
        { name: 'White chocolate & pistachio shard', weight: 215, unit: 'g', isSubRecipe: true },
        { name: 'White chocolate & pistachio ganache', weight: 240, unit: 'g', isSubRecipe: true },
        { name: 'Pistachio', weight: 17, unit: 'g' },
        { name: 'Dried sultana & cherry mix', weight: 15, unit: 'g' }
      ]
    },
    instructions: [
      'Make white chocolate & pistachio ganache with cream and glucose',
      'Prepare rocky road by combining chocolate with biscuits, marshmallows, sultanas, and pistachios',
      'Create pistachio shard with white chocolate, nuts, and dried fruit',
      'Make pistachio biscuit base with crushed nuts and chocolate chips',
      'Prepare no-bake cheese mix with pistachio paste and xantham gum',
      'Assemble in 8" x 2.5" cake ring (no baking required)',
      'Top with rocky road, shard, ganache, pistachios, and dried fruit mix'
    ]
  },
  {
    id: 'non-baked-raspberry-nutella-swirl',
    name: 'Non-Baked Raspberry Nutella Swirl',
    categoryId: 'large-cheesecakes',
    batchSize: 1,
    ingredients: [],
    subRecipes: [
      {
        id: 'dark-chocolate-ganache-raspberry',
        name: 'Dark Chocolate Ganache',
        ingredients: [
          { name: 'Dark chocolate', amount: 200, unit: 'g' },
          { name: 'Double cream', amount: 200, unit: 'ml' },
          { name: 'Glucose syrup', amount: 5, unit: 'g' }
        ],
        yield: { amount: 405, unit: 'g' }
      },
      {
        id: 'biscuit-mix-raspberry',
        name: 'Biscuit Mix',
        ingredients: [
          { name: 'Oreo (blitz to crumb)', amount: 595, unit: 'g' },
          { name: 'Butter', amount: 130, unit: 'g' },
          { name: 'Freeze dried raspberry', amount: 10, unit: 'g' }
        ],
        yield: { amount: 735, unit: 'g' }
      },
      {
        id: 'cheese-mix-raspberry',
        name: 'Cheese Mix',
        ingredients: [
          { name: 'Cream cheese', amount: 656, unit: 'g' },
          { name: 'Caster sugar', amount: 125, unit: 'g' },
          { name: 'Double cream', amount: 75, unit: 'g' },
          { name: 'Vanilla bean paste', amount: 6, unit: 'g' },
          { name: 'Vanilla extract', amount: 3, unit: 'ml' },
          { name: 'Nutella', amount: 56, unit: 'g' },
          { name: 'Raspberry compound', amount: 28, unit: 'g' }
        ],
        yield: { amount: 949, unit: 'g' }
      },
      {
        id: 'dark-chocolate-shard-raspberry',
        name: 'Dark Chocolate Shard',
        ingredients: [
          { name: 'Dark chocolate', amount: 400, unit: 'g' },
          { name: 'Dark chocolate chips', amount: 15, unit: 'g' },
          { name: 'Freeze dried raspberry', amount: 2, unit: 'g' }
        ],
        yield: { amount: 417, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'Dark chocolate ganache', weight: 240, unit: 'g', isSubRecipe: true },
        { name: 'Cadbury flake', weight: 4, unit: 'pieces' },
        { name: 'Oreo', weight: 9, unit: 'pieces' },
        { name: 'Galaxy ripple', weight: 3, unit: 'pieces' },
        { name: 'Milk chocolate slab', weight: 100, unit: 'g' },
        { name: 'Dark chocolate slab', weight: 100, unit: 'g' },
        { name: 'Fresh raspberry', weight: 100, unit: 'g' },
        { name: 'Dark chocolate chips', weight: 15, unit: 'g' },
        { name: 'Freeze dried raspberry', weight: 1, unit: 'g' },
        { name: 'Dark chocolate shard', weight: 70, unit: 'g', isSubRecipe: true }
      ]
    },
    instructions: [
      'Make dark chocolate ganache with cream and glucose syrup',
      'Prepare Oreo biscuit base with butter and freeze dried raspberry',
      'Create cheese mix with Nutella and raspberry compound swirl',
      'Make dark chocolate shard with chips and raspberry pieces',
      'Assemble in 8" x 2.5" cake ring (no baking required)',
      'Top with ganache, flakes, Oreos, ripples, chocolate slabs, fresh raspberries, chips, and shard'
    ]
  },
  {
    id: 'non-baked-fully-loaded',
    name: 'Non-Baked Fully Loaded (Caramel & Chocolate)',
    categoryId: 'large-cheesecakes',
    batchSize: 1,
    ingredients: [],
    subRecipes: [
      {
        id: 'caramel-fully-loaded',
        name: 'Caramel',
        ingredients: [
          { name: 'Caster sugar', amount: 160, unit: 'g' },
          { name: 'Water', amount: 100, unit: 'ml' },
          { name: 'Unsalted butter', amount: 125, unit: 'g' },
          { name: 'Double cream', amount: 220, unit: 'ml' },
          { name: 'Vanilla essence', amount: 5, unit: 'ml' },
          { name: 'Maldon sea salt', amount: 3, unit: 'g' }
        ],
        yield: { amount: 613, unit: 'g' }
      },
      {
        id: 'mixed-chocolate-ganache',
        name: 'Mixed Chocolate Ganache',
        ingredients: [
          { name: 'Dark chocolate', amount: 100, unit: 'g' },
          { name: 'Milk chocolate', amount: 100, unit: 'g' },
          { name: 'Double cream', amount: 200, unit: 'ml' },
          { name: 'Glucose syrup', amount: 5, unit: 'g' }
        ],
        yield: { amount: 405, unit: 'g' }
      },
      {
        id: 'biscuit-mix-fully-loaded',
        name: 'Biscuit Mix',
        ingredients: [
          { name: 'Digestive biscuit', amount: 435, unit: 'g' },
          { name: 'Salted butter', amount: 135, unit: 'g' },
          { name: 'Light brown sugar', amount: 55, unit: 'g' },
          { name: 'Golden syrup', amount: 28, unit: 'g' },
          { name: 'Cocoa powder', amount: 55, unit: 'g' },
          { name: 'Milk chocolate chips', amount: 28, unit: 'g' },
          { name: 'Dark chocolate chips', amount: 28, unit: 'g' }
        ],
        yield: { amount: 764, unit: 'g' }
      },
      {
        id: 'cheese-mix-fully-loaded',
        name: 'Cheese Mix',
        ingredients: [
          { name: 'Cream cheese', amount: 530, unit: 'g' },
          { name: 'Caster sugar', amount: 133, unit: 'g' },
          { name: 'Double cream', amount: 80, unit: 'ml' },
          { name: 'Vanilla essence', amount: 6.5, unit: 'ml' },
          { name: 'Caramel through the mix (from above)', amount: 165, unit: 'g' },
          { name: 'Xantham gum', amount: 1.5, unit: 'g' },
          { name: 'Caramel piped in (from above)', amount: 90, unit: 'g' }
        ],
        yield: { amount: 1006, unit: 'g' }
      }
    ],
    finalBuild: {
      elements: [
        { name: 'Mixed chocolate ganache', weight: 175, unit: 'g', isSubRecipe: true },
        { name: 'Galaxy ripple', weight: 3, unit: 'pieces' },
        { name: 'Cadbury twirl', weight: 2, unit: 'pieces' },
        { name: 'Twix', weight: 2, unit: 'pieces' },
        { name: 'Oreo', weight: 15, unit: 'pieces' },
        { name: 'Mini caramel shortbread', weight: 5, unit: 'pieces' },
        { name: 'Milk chocolate slab', weight: 100, unit: 'g' },
        { name: 'Dark chocolate slab', weight: 100, unit: 'g' },
        { name: 'Caramel filled buttons', weight: 12, unit: 'pieces' },
        { name: 'Giant chocolate buttons', weight: 12, unit: 'pieces' },
        { name: 'Fudge pieces', weight: 20, unit: 'g' },
        { name: 'Oreo crumb', weight: 5, unit: 'g' }
      ]
    },
    instructions: [
      'Make caramel by heating sugar and water, then adding butter, cream, vanilla, and salt',
      'Prepare mixed chocolate ganache with dark and milk chocolate',
      'Create chocolate biscuit base with cocoa powder and chocolate chips',
      'Make cheese mix with caramel swirled through and piped in',
      'Assemble in 8" x 2.5" cake ring (no baking required)',
      'Top with ganache and all the chocolate bars, biscuits, buttons, and fudge pieces'
    ]
  }
];

// Export the combined recipes as both default and named export
export const recipes = [...cookieRecipes, ...largeCheesecakeRecipes];
export default [...cookieRecipes, ...largeCheesecakeRecipes];