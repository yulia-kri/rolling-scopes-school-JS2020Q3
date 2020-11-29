export const levels = [
  {
    name: 'Universal Selector',
    task: 'Select all astronomical objects',
    selectors: ['*'],
    html: `<galaxy></galaxy>
<comet></comet>
<sun></sun>
<planet></planet>
<planet></planet>
<moon></moon>
<planet></planet>`,
  },
  {
    name: 'Type Selector',
    task: 'Select all comets',
    selectors: ['comet'],
    html: `<planet></planet>
<comet></comet>
<planet></planet>
<planet></planet>
<comet></comet>
<planet></planet>
<comet></comet>`,
  },
  {
    name: 'Class Selector',
    task: 'Select all gas giants',
    selectors: ['.gas-giant'],
    html: `<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet class="gas-giant"></planet>
<planet class="gas-giant"></planet>
<planet class="gas-giant"></planet>
<planet class="gas-giant"></planet>`,
  },
  {
    name: 'Id Selector',
    task: 'Select our home planet',
    selectors: ['#our-home'],
    html: `<planet></planet>
<planet></planet>
<planet id="our-home"></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>`,
  },
  {
    name: 'General Sibling Selector',
    task: 'Select the planets that follow Jupiter',
    selectors: ['.jupiter ~ planet'],
    html: `<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet class="jupiter"></planet>
<planet></planet>
<planet></planet>
<planet></planet>`,
  },
  {
    name: 'Adjacent Sibling Selector',
    task: 'Select every commet that directly follows a planet',
    selectors: ['planet + comet'],
    html: `<comet></comet>
<planet></planet>
<planet></planet>
<comet></comet>
<comet></comet>
<planet></planet>
<planet></planet>
<comet></comet>
<planet></planet>`,
  },
  {
    name: 'First Child Selector',
    task: 'Select the first planet in the Solar System',
    selectors: [
      'planet:first-child',
      'planet:first-of-type',
      'planet:nth-child(1)',
      'planet:nth-of-type(1)',
    ],
    html: `<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>`,
  },
  {
    name: 'Last Child Selector',
    task: 'Select the last planet in the Solar System',
    selectors: [
      'planet:last-child',
      'planet:last-of-type',
      'planet:nth-last-child(1)',
      'planet:nth-last-of-type(1)',
    ],
    html: `<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>`,
  },
  {
    name: 'Nth Child Selector',
    task: 'Select the 4th planet in the Solar System',
    selectors: [
      'planet:nth-child(4)',
      'planet:nth-of-type(4)',
      'planet:nth-last-child(6)',
      'planet:nth-last-of-type(5)',
    ],
    html: `<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<comet></comet>
<planet></planet>
<planet></planet>`,
  },
  {
    name: 'Nth Last Child Selector',
    task: 'Select the 7th planet in the Solar System',
    selectors: [
      'planet:nth-last-child(2)',
      'planet:nth-last-of-type(2)',
      'planet:nth-child(8)',
      'planet:nth-of-type(7)',
    ],
    html: `<planet></planet>
<planet></planet>
<planet></planet>
<comet></comet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>`,
  },
  {
    name: 'First Of Type Selector',
    task: 'Select the first planet from the Sun',
    selectors: ['planet:first-of-type'],
    html: `<sun></sun>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>`,
  },
  {
    name: 'Last Of Type Selector',
    task: 'Select the last planet in the Solar System',
    selectors: ['planet:last-of-type'],
    html: `<sun></sun>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<comet></comet>`,
  },
  {
    name: 'Nth Of Type Selector',
    task: 'Select the 2nd planet from the Sun',
    selectors: [
      'planet:nth-of-type(2)',
      'planet:nth-child(4)',
      'planet:nth-last-of-type(7)',
      'planet:nth-last-child(7)',
    ],
    html: `<sun></sun>
<planet></planet>
<comet></comet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>`,
  },
  {
    name: 'Nth Last Of Type Selector',
    task: 'Select the 7th planet in the Solar System counting from the end',
    selectors: [
      'planet:nth-last-of-type(2)',
      'planet:nth-last-child(3)',
      'planet:nth-of-type(7)',
      'planet:nth-child(8)',
    ],
    html: `<sun></sun>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<comet></comet>`,
  },
  {
    name: 'Only Of Type Selector',
    task: 'Select the only comet',
    selectors: [
      'comet:only-of-type',
      'comet:first-of-type',
      'comet:last-of-type',
      'comet:nth-of-type(1)',
      'comet:nth-last-of-type(1)',
      'comet:nth-child(4)',
      'comet:nth-last-child(3)',
      'comet',
    ],
    html: `<sun></sun>
<planet></planet>
<planet></planet>
<comet></comet>
<planet></planet>
<planet></planet>`,
  },
  {
    name: 'Has Attribute Selector',
    task: 'Select the planets that have name attribute',
    selectors: ['[name]'],
    html: `<planet></planet>
<planet name="Venus"></planet>
<planet></planet>
<planet name="Mars"></planet>
<planet name=""></planet>
<planet></planet>
<planet></planet>
<planet name="Neptune"></planet>`,
  },
  {
    name: 'Exact Attribute Selector',
    task: 'Select Venus',
    selectors: [
      '[name="Venus"]',
      'planet:nth-of-type(2)',
      'planet:nth-child(3)',
      'planet:nth-last-of-type(7)',
      'planet:nth-last-child(7)',
    ],
    html: `<planet name="Mercury"></planet>
<planet name="Venus"></planet>
<planet name="Earth"></planet>
<planet name="Mars"></planet>
<planet name="Jupiter"></planet>
<planet name="Saturn"></planet>
<planet name="Uranus"></planet>
<planet name="Neptune"></planet>`,
  },
  {
    name: 'Substring Attribute Selector',
    task: 'Select all planets which names contain E anywhere',
    selectors: ['[name*="e"]'],
    html: `<planet name="Mercury"></planet>
<planet name="Venus"></planet>
<planet name="Earth"></planet>
<planet name="Mars"></planet>
<planet name="Jupiter"></planet>
<planet name="Saturn"></planet>
<planet name="Uranus"></planet>
<planet name="Neptune"></planet>`,
  },
  {
    name: 'Ends With Attribute Selector',
    task: 'Select all planets which names end with S',
    selectors: ['[name$="s"]'],
    html: `<planet name="Mercury"></planet>
<planet name="Venus"></planet>
<planet name="Earth"></planet>
<planet name="Mars"></planet>
<planet name="Jupiter"></planet>
<planet name="Saturn"></planet>
<planet name="Uranus"></planet>
<planet name="Neptune"></planet>`,
  },
  {
    name: 'Not Selector',
    task: 'Select the saddest planet that is no longer a planet',
    selectors: [
      '*:not(planet)',
      'pluto:only-of-type',
      'pluto:first-of-type',
      'pluto:last-of-type',
      'pluto:nth-of-type(1)',
      'pluto:nth-last-of-type(1)',
      'pluto:last-child',
      'plutp:nth-last-child(1)',
      'pluto',
    ],
    html: `<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<planet></planet>
<pluto></pluto>`,
  },
];
