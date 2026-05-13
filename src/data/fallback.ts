import type { Product, Category } from '../lib/types';

export const STORE_DOMAIN = 'soggyrust';

export const fallbackCategories: Category[] = [
  {
    id: 1,
    name: 'Protection',
    description: 'Raid Protection',
    slug: 'ranks',
    hide: false,
    main_redirect: false,
  },
  {
    id: 2,
    name: 'Resources & Kits',
    description: 'Kits de démarrage et packs de ressources',
    slug: 'resources',
    hide: false,
    main_redirect: false,
  },
  {
    id: 3,
    name: 'VIP & Ranks',
    description: 'Premium ranks and exclusive privileges',
    slug: 'vip',
    hide: false,
    main_redirect: false,
  },
  {
    id: 4,
    name: 'Blueprints & Items',
    description: 'Blueprints rares et objets puissants',
    slug: 'blueprints',
    hide: false,
    main_redirect: false,
  },
];

const fallbackCategoryMap: Record<number, { id: number; name: string; slug: string }> = {
  1: { id: 1, name: 'Protection', slug: 'ranks' },
  2: { id: 2, name: 'Resources & Kits', slug: 'resources' },
  3: { id: 3, name: 'VIP & Ranks', slug: 'vip' },
  4: { id: 4, name: 'Blueprints & Items', slug: 'blueprints' },
};

function makeCat(id: number): Product['category'] {
  const c = fallbackCategoryMap[id];
  return { id: c.id, name: c.name, slug: c.slug, hide: false, main_redirect: false };
}

export const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'AK-47 Blueprint',
    status: true,
    slug: 'ak47-blueprint',
    price: 14.99,
    old_price: 19.99,
    percent_off: 25,
    small_description:
      'High-quality AK-47 blueprint with boosted damage and durability stats. Ready to craft and dominate in PvP.',
    category: makeCat(1),
    subscription: false,
    featured: true,
    image: 'https://images.pexels.com/photos/33536/hyla-meridionalis-european-tree-frog-amphibian-animal.jpg?auto=compress&cs=tinysrgb&w=600',
    created_date: Date.now(),
  },
  {
    id: 2,
    name: 'Starter Kit',
    status: true,
    slug: 'starter-kit',
    price: 9.99,
    small_description:
      'Complete starter kit with stone tools, wood armor, bandages, and enough food to get you off the beach and into a base.',
    category: makeCat(2),
    subscription: false,
    featured: true,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_date: Date.now(),
  },
  {
    id: 3,
    name: 'VIP Rank - Gold',
    status: true,
    slug: 'vip-gold',
    price: 19.99,
    old_price: 24.99,
    percent_off: 20,
    small_description:
      'Gold VIP rank with boosted gather rates, priority queue, custom chat color, and access to exclusive VIP commands.',
    category: makeCat(3),
    subscription: true,
    duration_periodicity: 'month',
    period_num: 1,
    featured: true,
    image: 'https://images.pexels.com/photos/7862657/pexels-photo-7862657.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_date: Date.now(),
  },
  {
    id: 4,
    name: 'Raid Kit',
    status: true,
    slug: 'raid-kit',
    price: 24.99,
    small_description:
      'Full raid loadout including C4, rockets, satchels, and a Semi-Automatic Rifle. Everything you need to crack a base wide open.',
    category: makeCat(1),
    subscription: false,
    featured: false,
    image: 'https://images.pexels.com/photos/1115513/pexels-photo-1115513.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_date: Date.now(),
  },
  {
    id: 5,
    name: 'Resource Bundle x5000',
    status: true,
    slug: 'resource-bundle-5000',
    price: 7.49,
    small_description:
      'Bulk resource pack: 5,000 metal frags, 5,000 wood, 2,000 stone, and 500 high quality metal to jump-start your wipe.',
    category: makeCat(2),
    subscription: false,
    featured: false,
    image: 'https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_date: Date.now(),
  },
  {
    id: 6,
    name: 'VIP Rank - Diamond',
    status: true,
    slug: 'vip-diamond',
    price: 34.99,
    old_price: 44.99,
    percent_off: 22,
    small_description:
      'Diamond VIP: max gather rates, /home teleport, custom base skin, exclusive kits, and priority support from staff.',
    category: makeCat(3),
    subscription: true,
    duration_periodicity: 'month',
    period_num: 1,
    featured: true,
    image: 'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_date: Date.now(),
  },
  {
    id: 7,
    name: 'HQM Blueprint Bundle',
    status: true,
    slug: 'hqm-blueprint-bundle',
    price: 12.99,
    small_description:
      'Bundle of high-tier blueprints: L96 Rifle, MP5A4, Compound Bow, and a full set of Metal Armor.',
    category: makeCat(4),
    subscription: false,
    featured: false,
    image: 'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    created_date: Date.now(),
  },
  {
    id: 8,
    name: 'Full Metal Base Kit',
    status: true,
    slug: 'full-metal-base-kit',
    price: 29.99,
    old_price: 39.99,
    percent_off: 25,
    small_description:
      'Everything needed to upgrade a 2x2 to full metal: metal frags, HQM, doors, locks, and a tool cupboard kit included.',
    category: makeCat(4),
    subscription: false,
    featured: true,
    image: 'https://images.pexels.com/photos/2882552/pexels-photo-2882552.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_date: Date.now(),
  },
];