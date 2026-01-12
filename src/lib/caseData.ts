import { Case, CaseItem } from '../types/config';

export const CASES: Case[] = [
  {
    id: 'case-recoil',
    name: 'Recoil Case',
    price: 1.99,
    image: '/images/cases/recoil.png',
    items: [
      { id: '1', name: 'P250 | Re.built', rarity: 'blue', image: '/items/p250-rebuilt.png', value: 0.03 },
      { id: '2', name: 'MAC-10 | Disco Tech', rarity: 'blue', image: '/items/mac10-disco.png', value: 0.03 },
      { id: '3', name: 'PP-Bizon | Night Riot', rarity: 'blue', image: '/items/pp-bizon-night.png', value: 0.03 },
      { id: '4', name: 'XM1014 | Ziggy', rarity: 'purple', image: '/items/xm1014-ziggy.png', value: 0.15 },
      { id: '5', name: 'MAG-7 | Monster Call', rarity: 'purple', image: '/items/mag7-monster.png', value: 0.20 },
      { id: '6', name: 'MP9 | Starlight Protector', rarity: 'purple', image: '/items/mp9-starlight.png', value: 0.25 },
      { id: '7', name: 'Negev | Devgru', rarity: 'pink', image: '/items/negev-devgru.png', value: 2.50 },
      { id: '8', name: 'FAMAS | Rapid Eye Movement', rarity: 'pink', image: '/items/famas-rem.png', value: 3.00 },
      { id: '9', name: 'Glock-18 | Umbral Rabbit', rarity: 'pink', image: '/items/glock-umbral.png', value: 4.50 },
      { id: '10', name: 'M4A4 | Temukau', rarity: 'red', image: '/items/m4a4-temukau.png', value: 45.00 },
      { id: '11', name: 'AK-47 | Inheritance', rarity: 'red', image: '/items/ak47-inheritance.png', value: 120.00 },
      { id: '12', name: 'M4A1-S | Black Lotus', rarity: 'gold', image: '/items/m4a1s-blacklotus.png', value: 800.00 },
    ],
  },
  {
    id: 'case-revolution',
    name: 'Revolution Case',
    price: 1.99,
    image: '/images/cases/revolution.png',
    items: [
      { id: '13', name: 'P250 | Contaminant', rarity: 'blue', image: '/items/p250-contaminant.png', value: 0.05 },
      { id: '14', name: 'MP5-SD | Clearance', rarity: 'blue', image: '/items/mp5sd-clearance.png', value: 0.05 },
      { id: '15', name: 'Tec-9 | Slag', rarity: 'blue', image: '/items/tec9-slag.png', value: 0.04 },
      { id: '16', name: 'Dual Berettas | Melondrama', rarity: 'purple', image: '/items/dual-melondrama.png', value: 0.40 },
      { id: '17', name: 'Galil AR | Connexion', rarity: 'purple', image: '/items/galil-connexion.png', value: 0.35 },
      { id: '18', name: 'MP7 | Abyssal Apparition', rarity: 'purple', image: '/items/mp7-abyssal.png', value: 0.50 },
      { id: '19', name: 'Sawed-Off | Analog Input', rarity: 'pink', image: '/items/sawedoff-analog.png', value: 2.00 },
      { id: '20', name: 'SG 553 | Next Generation', rarity: 'pink', image: '/items/sg553-nextgen.png', value: 3.50 },
      { id: '21', name: 'P90 | Run and Hide', rarity: 'pink', image: '/items/p90-runandhide.png', value: 4.00 },
      { id: '22', name: 'USP-S | Jawbreaker', rarity: 'red', image: '/items/usps-jawbreaker.png', value: 35.00 },
      { id: '23', name: 'M4A4 | Temukau', rarity: 'red', image: '/items/m4a4-temukau.png', value: 55.00 },
      { id: '24', name: 'AK-47 | Head Shot', rarity: 'gold', image: '/items/ak47-headshot.png', value: 650.00 },
    ],
  },
];

export const DROP_RATES = {
  blue: 0.7992,
  purple: 0.1598,
  pink: 0.0320,
  red: 0.0064,
  gold: 0.0026,
};

export const WEAR_CONDITIONS = [
  'Factory New',
  'Minimal Wear',
  'Field-Tested',
  'Well-Worn',
  'Battle-Scarred',
];

export function getRandomItem(caseData: Case): CaseItem & { wear: string } {
  const rand = Math.random();
  let rarity: 'blue' | 'purple' | 'pink' | 'red' | 'gold';

  if (rand < DROP_RATES.blue) {
    rarity = 'blue';
  } else if (rand < DROP_RATES.blue + DROP_RATES.purple) {
    rarity = 'purple';
  } else if (rand < DROP_RATES.blue + DROP_RATES.purple + DROP_RATES.pink) {
    rarity = 'pink';
  } else if (rand < DROP_RATES.blue + DROP_RATES.purple + DROP_RATES.pink + DROP_RATES.red) {
    rarity = 'red';
  } else {
    rarity = 'gold';
  }

  const items = caseData.items.filter(item => item.rarity === rarity);
  const item = items[Math.floor(Math.random() * items.length)];
  const wear = WEAR_CONDITIONS[Math.floor(Math.random() * WEAR_CONDITIONS.length)];

  return {
    ...item,
    wear: wear as any,
  };
}
