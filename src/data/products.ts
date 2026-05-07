export type Concern = 'All' | 'Glow' | 'Acne' | 'Hydration' | 'Hyperpigmentation' | 'Pore Tightening';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  concern: Concern[];
  image: string;
  description: string;
  howToUse: string;
  ingredients: string;
  whyItWorks: string;
  size: string;
}

export const concerns: Concern[] = ['All', 'Glow', 'Acne', 'Hydration', 'Hyperpigmentation', 'Pore Tightening'];

export const products: Product[] = [
  {
    id: 'glow-booster-oil',
    name: 'Glow Booster Oil',
    tagline: 'Organic cold-pressed oils for luminosity',
    price: 12500,
    concern: ['Glow'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    description: 'A potent, nutrient-dense oil blend that instantly boosts luminosity, deeply nourishes the skin barrier, and imparts a natural, dewy finish.',
    howToUse: 'Apply 3-5 drops to cleansed and toned skin. Massage in upward, circular motions. Use morning and night.',
    ingredients: 'Jojoba Oil, Rosehip Seed Oil, Argan Oil, Sweet Almond Oil, Geranium Essential Oil.',
    whyItWorks: 'Cold-pressed extraction ensures the natural vitamins and antioxidants in the oils remain intact, penetrating deep into the skin to repair and naturally brighten.',
    size: '30 ml / 1 fl oz'
  },
  {
    id: 'african-black-soap-paste',
    name: 'African Black Soap Paste - Herbal Mix',
    tagline: 'Acne & Clear Skin',
    price: 4500,
    concern: ['Acne'],
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800',
    description: 'A deeply clarifying authentic African Black soap paste infused with antibacterial herbs to fight breakouts and fade blemishes.',
    howToUse: 'Scoop a pea-sized amount, lather with water, and massage onto wet face for 60 seconds. Rinse thoroughly. Best used 2-3 times a week.',
    ingredients: 'Raw African Black Soap, Neem Extract, Turmeric, Honey, Tea Tree Essential Oil.',
    whyItWorks: 'Naturally occurring plantains provide gentle exfoliation while Neem and Tea Tree offer powerful antibacterial properties to stop acne-causing bacteria and excessive sebum.',
    size: '150 g / 5.3 oz'
  },
  {
    id: 'whipped-shea-cocoa-butter',
    name: 'Whipped Shea & Cocoa Butter',
    tagline: '24hr Intense Hydration',
    price: 8500,
    concern: ['Hydration'],
    image: 'https://images.unsplash.com/photo-1615397323730-1b7305942475?auto=format&fit=crop&q=80&w=800',
    description: 'A decadent, deeply moisturizing body butter that melts gracefully into the skin, locking in moisture for 24 hours without feeling greasy.',
    howToUse: 'Massage generously onto damp skin immediately after showering to lock in hydration.',
    ingredients: 'Raw Unrefined Shea Butter, Cocoa Butter, Coconut Oil, Vitamin E Oil, Vanilla Extract.',
    whyItWorks: 'High concentrations of fatty acids and vitamins in raw Shea and Cocoa butter deeply condition the skin, creating a breathable protective barrier that prevents trans-epidermal water loss.',
    size: '250 g / 8.8 oz'
  },
  {
    id: 'vitamin-c-brightening-serum',
    name: 'Vitamin C Brightening Serum',
    tagline: 'Defend against Hyperpigmentation',
    price: 15000,
    concern: ['Glow', 'Hyperpigmentation'],
    image: 'https://images.unsplash.com/photo-1590156546946-ce55a12a6a10?auto=format&fit=crop&q=80&w=800',
    description: 'A stable, potent Vitamin C formula designed to fade dark spots, unify skin tone, and protect against environmental damage for a radiant complexion.',
    howToUse: 'Apply 2-3 drops to clean, dry skin every morning before your moisturizer and SPF.',
    ingredients: 'Vitamin C (Sodium Ascorbyl Phosphate), Ferulic Acid, Hyaluronic Acid, Aloe Vera.',
    whyItWorks: 'We combine stable Vitamin C with Ferulic acid to supercharge its brightening effects, while neutralizing the free radicals responsible for dark spots and premature aging.',
    size: '30 ml / 1 fl oz'
  },
  {
    id: 'hydrating-rose-water-toner',
    name: 'Hydrating Rose Water Toner',
    tagline: 'Pore Tightening & Balancing',
    price: 5500,
    concern: ['Hydration', 'Pore Tightening'],
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
    description: 'A pure botanical distillate that balances skin pH, refines the look of pores, and preps the skin to absorb serums and moisturizers effectively.',
    howToUse: 'Spritz directly onto the face or apply with a cotton pad after cleansing. Can be used throughout the day to refresh.',
    ingredients: '100% Pure Organic Rose Damascena Hydrosol, Vegetable Glycerin.',
    whyItWorks: 'Rose hydrosol naturally possesses mildly astringent properties that tighten pores without stripping the skin, while maintaining a balanced pH to naturally calm redness.',
    size: '100 ml / 3.4 fl oz'
  }
];
