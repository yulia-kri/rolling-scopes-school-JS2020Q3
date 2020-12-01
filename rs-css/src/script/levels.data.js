export const levels = [
  {
    name: 'Universal Selector',
    task: 'Select all astronomical objects',
    selector: '*',
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
    selector: 'comet',
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
    selector: '.gas-giant',
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
    selector: '#our-home',
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
    selector: '.jupiter ~ planet',
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
    selector: 'planet + comet',
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
    selector: 'planet:first-child',
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
    selector: 'planet:last-child',
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
    selector: 'planet:nth-child(4)',

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
    selector: 'planet:nth-last-child(2)',
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
    selector: 'planet:first-of-type',
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
    selector: 'planet:last-of-type',
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
    selector: 'planet:nth-of-type(2)',
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
    selector: 'planet:nth-last-of-type(2)',
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
    selector: 'comet:only-of-type',
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
    selector: '[name]',
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
    selector: '[name="Venus"]',
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
    task: `Select all planets which names contain 'e' anywhere`,
    selector: '[name*="e"]',
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
    task: `Select all planets which names end with 's'`,
    selector: '[name$="s"]',
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
    selector: '*:not(planet)',
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
