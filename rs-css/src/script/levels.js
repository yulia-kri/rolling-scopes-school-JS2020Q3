export const levels = [
  {
    task: 'Select all astronomical objects',
    answer: '*',
    html: `<sun></sun>
<earth></earth>
<comet></comet>
<jupiter></jupiter>
<saturn></saturn>
<uranus></uranus>`,
  },
  {
    task: 'Select all comets',
    answer: 'comet',
    html: `<mercury></mercury>
<comet></comet>
<earth></earth>
<mars></mars>
<comet></comet>
<neptune></neptune>
<comet></comet>`,
  },
  {
    task: 'Select all gas giants',
    answer: '.gas-giant',
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
    task: 'Select our home planet',
    answer: '#our-home',
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
    task: 'Select the planets that follow Jupiter',
    answer: '.jupiter ~ planet',
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
    task: 'Select the planets that follow Jupiter',
    answer: '.jupiter ~ planet',
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
    task: 'Select every commet that directly follows a planet',
    answer: 'sun + planet',
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
    task: 'Select the first planet from the Sun',
    answer: 'planet:first-of-type',
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
    task: 'Select the last planet in the Solar System',
    answer: 'planet:last-of-type',
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
    task: 'Select the 2nd planet from the Sun',
    answer: 'planet:nth-of-type(2)',
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
    task: 'Select the 7th planet in the Solar System counting from the end',
    answer: 'planet:nth-last-of-type(2)',
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
];
