// Base de dados inicial com restaurantes, lanchonetes e pizzarias de Guariba - SP
const INITIAL_PLACES = [
  {
    id: "pizzaria-kid",
    name: "Pizzaria Kid - Tradição em Guariba",
    category: "pizzaria",
    categoryLabel: "Pizzaria",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewsCount: 342,
    priceLevel: "$$",
    deliveryTime: "30-45 min",
    deliveryFee: "Grátis",
    deliveryFeeNum: 0,
    neighborhood: "Centro, Guariba",
    address: "Rua Tufic José Abimussi, 51 - Centro, Guariba - SP",
    phone: "(16) 3251-3327",
    whatsapp: "5516997543327",
    isOpen: true,
    openingHours: "Terça a Domingo: 18:30 às 23:30",
    description: "Uma das mais tradicionais pizzarias de Guariba! Massas de fermentação artesanal, recheios caprichados e opções assadas no ponto perfeito.",
    tags: ["Tradição em Guariba", "Forno Especial", "Borda Recheada"],
    menu: [
      {
        name: "Pizza Kid Especial da Casa",
        desc: "Molho de tomate artesanal, presunto nobre, catupiry original, palmito especial, bacon crocante e azeitonas pretas.",
        price: "R$ 68,00",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Pizza Margherita Especial",
        desc: "Molho rústico de tomate fresco, queijo mozzarella de primeira linha, rodelas de tomate, manjericão e azeite extravirgem.",
        price: "R$ 58,00",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Pizza Quatro Queijos Supremo",
        desc: "Generosa combinação de mozzarella, provolone defumado, gorgonzola e catupiry original cremoso.",
        price: "R$ 64,00",
        image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "pizzaria-saltes",
    name: "Pizzaria Saltes",
    category: "pizzaria",
    categoryLabel: "Pizzaria",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewsCount: 295,
    priceLevel: "$$",
    deliveryTime: "35-50 min",
    deliveryFee: "R$ 5,00",
    deliveryFeeNum: 5.0,
    neighborhood: "Centro, Guariba",
    address: "Av. Joaquim Matheus Corrêa, 1200 - Centro, Guariba - SP",
    phone: "(16) 3251-2850",
    whatsapp: "5516997122850",
    isOpen: true,
    openingHours: "Segunda a Domingo: 18:30 às 23:00",
    description: "Pizzas crocantes, beirutes caprichados e a maior variedade de esfihas abertas salgadas e doces da cidade de Guariba.",
    tags: ["Esfihas Abertas", "Beirute", "Pizzas Doces"],
    menu: [
      {
        name: "Combo 10 Esfihas Salgadas Sortidas",
        desc: "Seleção especial com esfihas de carne temperada, queijo derretido e frango com catupiry cremoso.",
        price: "R$ 49,90",
        image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Pizza Calabresa Especial com Catupiry",
        desc: "Calabresa fatiada selecionada, cebola em rodelas, catupiry original e azeitonas pretas em massa crocante.",
        price: "R$ 56,00",
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Beirute Especial da Casa",
        desc: "Pão sírio levemente tostado, tiras de filé, mozzarella, presunto, ovo, alface americana e maionese artesanal.",
        price: "R$ 38,00",
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "original-burg",
    name: "Original Burg Hamburgueria",
    category: "lanchonete",
    categoryLabel: "Lanchonete",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewsCount: 418,
    priceLevel: "$$",
    deliveryTime: "25-40 min",
    deliveryFee: "R$ 4,00",
    deliveryFeeNum: 4.0,
    neighborhood: "Jardim das Palmeiras, Guariba",
    address: "Av. Amadeu Mazzi, 531 - Guariba - SP",
    phone: "(16) 99733-6842",
    whatsapp: "5516997336842",
    isOpen: true,
    openingHours: "Terça a Domingo: 18:00 às 23:45",
    description: "Referência em hambúrgueres artesanais e smash burgers em Guariba. Famoso pelas caixas combo especiais, anéis de cebola e molhos da casa.",
    tags: ["Smash Burger", "Caixa Combo", "Batata com Cheddar"],
    menu: [
      {
        name: "Caixa Catupiry & Bacon",
        desc: "Hambúrguer artesanal 150g no pão brioche, empanado de catupiry, fatias de bacon crocante, batatas fritas e anéis de cebola.",
        price: "R$ 44,90",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Smash Burger Duplo Cheddar",
        desc: "Dois smash burgers de 80g com crostinha perfeita, fatias de cheddar derretido, cebola caramelizada e maionese secreta.",
        price: "R$ 32,90",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Batata Frita Rústica com Bacon e Cheddar",
        desc: "Porção de batatas crocantes cobertas com fondue de queijo cheddar e bacon defumado crocante em cubos.",
        price: "R$ 28,00",
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "restaurante-fogao-de-lenha",
    name: "Restaurante Fogão de Lenha",
    category: "restaurante",
    categoryLabel: "Restaurante",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewsCount: 365,
    priceLevel: "$$",
    deliveryTime: "30-45 min",
    deliveryFee: "Grátis",
    deliveryFeeNum: 0,
    neighborhood: "Centro, Guariba",
    address: "Av. Joaquim Matheus Corrêa, 1180 - Centro, Guariba - SP",
    phone: "(16) 3251-1890",
    whatsapp: "5516997811890",
    isOpen: true,
    openingHours: "Segunda a Sábado: 11:00 às 15:00",
    description: "Autêntica culinária caipira caseira no coração de Guariba. Pratos tradicionais preparados no fogão a lenha, marmitex reforçado e carnes suculentas.",
    tags: ["Comida Caseira", "Fogão a Lenha", "Almoço & Marmitex"],
    menu: [
      {
        name: "Prato Feito Caipira Completo",
        desc: "Arroz soltinho, feijão tropeiro temperado, bisteca suína grelhada, couve refogada no alho, ovo frito e torresmo crocante.",
        price: "R$ 29,90",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Filé de Frango Grelhado com Legumes e Purê",
        desc: "Peito de frango marinado em ervas frescas, purê de batata cremoso, arroz, feijão caseiro e salada de folhas.",
        price: "R$ 27,50",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Marmitex Executivo Fogão de Lenha",
        desc: "Carne bovina assada de panela com mandioca amarela macia, arroz, feijão e farofa temperada da casa.",
        price: "R$ 24,00",
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "casa-do-mineiro",
    name: "Casa do Mineiro Marmitaria",
    category: "restaurante",
    categoryLabel: "Restaurante",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewsCount: 220,
    priceLevel: "$$",
    deliveryTime: "25-40 min",
    deliveryFee: "R$ 3,50",
    deliveryFeeNum: 3.5,
    neighborhood: "Vila Virgínia, Guariba",
    address: "Avenida da Liberdade, 455 - Guariba - SP",
    phone: "(16) 3251-4420",
    whatsapp: "5516997124550",
    isOpen: true,
    openingHours: "Segunda a Sábado: 10:30 às 14:30",
    description: "Sabor mineiro inconfundível em Guariba. Feijoada completa aos sábados, costelinha suína, tutu de feijão e serviço rápido de marmitaria e almoço.",
    tags: ["Comida Mineira", "Feijoada", "Entrega Rápida"],
    menu: [
      {
        name: "Feijoada Completa Individual",
        desc: "Feijão preto com carnes selecionadas e paio, arroz branco, couve refogada, farofa temperada e gomos de laranja.",
        price: "R$ 36,00",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Costelinha Suína com Tutu à Mineira",
        desc: "Costelinha douradinha e macia com tutu cremoso, arroz fresco, couve na manteiga e vinagrete.",
        price: "R$ 32,00",
        image: "https://images.unsplash.com/photo-1514944298352-78d12239f1c7?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Marmitex Tradicional do Mineiro",
        desc: "Bife acebolado suculento, arroz branco, feijão carioca fresquinho, batatas fritas e salada.",
        price: "R$ 22,00",
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "boteco-da-vila",
    name: "Boteco da Vila Lanches & Porções",
    category: "lanchonete",
    categoryLabel: "Lanchonete",
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewsCount: 310,
    priceLevel: "$$",
    deliveryTime: "30-45 min",
    deliveryFee: "R$ 4,50",
    deliveryFeeNum: 4.5,
    neighborhood: "Centro, Guariba",
    address: "Rua 9 de Julho, 890 - Guariba - SP",
    phone: "(16) 3251-4847",
    whatsapp: "5516996145447",
    isOpen: true,
    openingHours: "Terça a Domingo: 17:30 às 00:00",
    description: "Ambiente descontraído e comida boa em Guariba! Porções de boteco, lanches prensados bem recheados, chopp gelado e pastéis crocantes.",
    tags: ["Porções", "Chopp Gelado", "Lanches Tradicionais"],
    menu: [
      {
        name: "X-Tudo Especial da Vila",
        desc: "Hambúrguer bovino, queijo prato, presunto, bacon em fatias, ovo, alface, tomate, milho e maionese verde caseira.",
        price: "R$ 28,90",
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Porção Mista de Boteco",
        desc: "Frango a passarinho crocante, calabresa acebolada no ponto e polenta frita douradinha acompanhada de molhos.",
        price: "R$ 46,00",
        image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Porção de Pastéis Artesanais (10 un)",
        desc: "Dez mini pastéis sequinhos e crocantes nos sabores carne moída temperada e queijo mozzarella derretido.",
        price: "R$ 26,00",
        image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "lanchonete-do-fabinho",
    name: "Lanchonete e Pizzaria do Fabinho",
    category: "lanchonete",
    categoryLabel: "Lanchonete",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewsCount: 274,
    priceLevel: "$$",
    deliveryTime: "25-40 min",
    deliveryFee: "R$ 4,00",
    deliveryFeeNum: 4.0,
    neighborhood: "Centro, Guariba",
    address: "Rua 9 de Julho, 1163 - Centro, Guariba - SP",
    phone: "(16) 3251-5120",
    whatsapp: "5516997455120",
    isOpen: true,
    openingHours: "Terça a Domingo: 18:00 às 23:30",
    description: "Ponto clássico em Guariba famoso pelas batatas recheadas generosas, lanches prensados no capricho, chopp estupidamente gelado e porções.",
    tags: ["Batata Recheada", "Lanche Prensado", "Chopp Gelado"],
    menu: [
      {
        name: "Batata Recheada Especial de Frango com Catupiry",
        desc: "Batata grande assada, recheada com peito de frango desfiado suculento, catupiry cremoso, milho e batata palha.",
        price: "R$ 29,90",
        image: "https://images.unsplash.com/photo-1518013034458-30b0ee243591?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "X-Bacon Especial na Chapa",
        desc: "Pão de hambúrguer tostado, carne grelhada, fatias abundantes de bacon, queijo prato derretido e maionese especial.",
        price: "R$ 25,00",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Porção de Isca de Tilápia com Molho Tártaro",
        desc: "Tiras frescas de tilápia empanadas crocantes, servidas com limão taiti e molho tártaro artesanal.",
        price: "R$ 48,00",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "restaurante-sabor-arte",
    name: "Restaurante Sabor & Arte",
    category: "restaurante",
    categoryLabel: "Restaurante",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewsCount: 198,
    priceLevel: "$$$",
    deliveryTime: "35-50 min",
    deliveryFee: "Grátis",
    deliveryFeeNum: 0,
    neighborhood: "Centro, Guariba",
    address: "Rua 9 de Julho, 731 - Centro, Guariba - SP",
    phone: "(16) 3251-3140",
    whatsapp: "5516997233140",
    isOpen: true,
    openingHours: "Segunda a Sábado: 11:00 às 15:00 / Quinta a Domingo: 19:00 às 23:00",
    description: "Gastronomia variada e de alta qualidade no centro de Guariba. Famoso pelos filés à parmegiana, massas frescas, saladas especiais e sobremesas finas.",
    tags: ["Filé à Parmegiana", "Massas Artesanais", "Ambiente Familiar"],
    menu: [
      {
        name: "Filé Mignon à Parmegiana (Serve 2)",
        desc: "Filé mignon empanado crocante, molho de tomate pelado italiano, queijo mozzarella gratinado, arroz branco e batata frita.",
        price: "R$ 79,90",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Talharim ao Ragu com Queijo Parmesão",
        desc: "Massa artesanal fresca ao molho de tomate cozido lentamente com carne desfiada e queijo parmesão ralado.",
        price: "R$ 38,00",
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Pudim Tradicional de Leite Condensado",
        desc: "Pudim caseiro lisinho com calda caramelizada na medida certa.",
        price: "R$ 12,00",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80"
      }
    ]
  }
];

// Imagens padrão para sugestão no cadastro
const PRESET_IMAGES = {
  pizzaria: [
    { label: "Pizza Napolitana Forno a Lenha", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" },
    { label: "Pizza Margherita Especial", url: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80" },
    { label: "Fatia de Pizza Queijo Derretido", url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80" }
  ],
  lanchonete: [
    { label: "Burger Artesanal com Bacon", url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
    { label: "Smash Burger Duplo Cheddar", url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80" },
    { label: "Lanches & Porção de Batatas", url: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80" }
  ],
  restaurante: [
    { label: "Restaurante & Comida Caseira", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" },
    { label: "Prato Executivo Parmegiana", url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },
    { label: "Marmitaria & Buffet Completo", url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80" }
  ]
};
