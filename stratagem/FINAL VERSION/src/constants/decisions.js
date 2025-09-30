/* ────────── decision categories ────────── */
export const DECISION_CATEGORIES = [
  {
    name: 'Decision #1',
    decisions: [
      { label: 'P9 - Food For Population', values: [] },
      { label: 'P10 - Food For Export', values: [] },
      { label: 'Total Unallocated', values: [] }
    ]
  },
  {
    name: 'Decision #2',
    decisions: [
      { label: 'P11 - Food For Import', values: [] },
      { label: 'P12 - Food For Capital', values: [] },
      { label: 'P13 - Food For Environment', values: [] },
      { label: 'Total Unallocated', values: [] }
    ]
  },
  {
    name: 'Decision #3',
    decisions: [
      { label: 'E20 - Energy For Population', values: [] },
      { label: 'E21 - Energy For Food Production', values: [] },
      { label: 'E22 - Energy For Goods Production', values: [] },
      { label: 'E23 - Energy For Export', values: [] },
      { label: 'Total Unallocated', values: [] }
    ]
  },
  {
    name: 'Decision #4',
    decisions: [
      { label: 'E24 - Energy For Import', values: [] },
      { label: 'E25 - Energy For Capital', values: [] },
      { label: 'Total Unallocated', values: [] }
    ]
  },
  {
    name: 'Decision #5',
    decisions: [
      { label: 'E26 - Energy For Environment', values: [] },
      { label: 'E27 - Energy For Efficiency', values: [] },
      { label: 'G18 - Goods For Population', values: [] },
      { label: 'G19 - Goods For Export', values: [] },
      { label: 'F14 - Goods For Import', values: [] },
      { label: 'F15 - Goods For Capital', values: [] },
      { label: 'Total Unallocated', values: [] }
    ]
  },
  {
    name: 'Decision #6',
    decisions: [
      { label: 'TF9 - Goods For Environment', values: [] },
      { label: 'TF10 - Goods For Social Services', values: [] },
      { label: 'TF11 - Goods For Efficiency', values: [] },
      { label: 'TF12 - Goods For Energy Production', values: [] }
    ]
  },
  {
    name: 'Decision #7',
    decisions: [
      { label: 'TF13 - New Food Production Capital', values: [] }
    ]
  },
  {
    name: 'Decision #8',
    decisions: [
      { label: 'TF14 - New Goods Production Capital', values: [] }
    ]
  },
  {
    name: 'Decision #9',
    decisions: [
      { label: 'TF15 - New Social Services Capital', values: [] },
      { label: 'TF16 - New Environmental Protection Capital', values: [] },
      { label: 'TF17 - New Energy Production Capital', values: [] },
      { label: 'TF18 - New Energy Efficiency Capital', values: [] }
    ]
  }
]

/* ────────── tooltips ────────── */
export const TOOLTIPS = {
  'P9 - Food For Population': 'Amount of food allocated to feed the population',
  'P10 - Food For Export': 'Amount of food allocated for export',
  'P11 - Food For Import': 'Amount of food to be imported',
  'P12 - Food For Capital': 'Amount of food allocated for capital maintenance',
  'P13 - Food For Environment': 'Amount of food allocated for environmental protection',
  'E20 - Energy For Population': 'Energy allocated for population needs',
  'E21 - Energy For Food Production': 'Energy allocated for food production',
  'E22 - Energy For Goods Production': 'Energy allocated for goods production',
  'E23 - Energy For Export': 'Energy allocated for export',
  'E24 - Energy For Import': 'Energy to be imported',
  'E25 - Energy For Capital': 'Energy allocated for capital maintenance',
  'E26 - Energy For Environment': 'Energy allocated for environmental protection',
  'E27 - Energy For Efficiency': 'Energy allocated for efficiency improvements',
  'G18 - Goods For Population': 'Goods allocated for population needs',
  'G19 - Goods For Export': 'Goods allocated for export',
  'F14 - Goods For Import': 'Goods to be imported',
  'F15 - Goods For Capital': 'Goods allocated for capital maintenance',
  'TF9 - Goods For Environment': 'Goods allocated for environmental protection',
  'TF10 - Goods For Social Services': 'Goods allocated for social services',
  'TF11 - Goods For Efficiency': 'Goods allocated for efficiency improvements',
  'TF12 - Goods For Energy Production': 'Goods allocated for energy production',
  'TF13 - New Food Production Capital': 'Investment in new food production facilities',
  'TF14 - New Goods Production Capital': 'Investment in new goods production facilities',
  'TF15 - New Social Services Capital': 'Investment in new social services facilities',
  'TF16 - New Environmental Protection Capital': 'Investment in new environmental protection facilities',
  'TF17 - New Energy Production Capital': 'Investment in new energy production facilities',
  'TF18 - New Energy Efficiency Capital': 'Investment in new energy efficiency facilities',
  'Total Unallocated': 'Remaining amount that has not been allocated to any specific use'
}

/* ────────── default values ────────── */
export const DEFAULT_VALUES = {
  'P9 - Food For Population': 1000,
  'P10 - Food For Export': 500,
  'P11 - Food For Import': 0,
  'P12 - Food For Capital': 200,
  'P13 - Food For Environment': 100,
  'E20 - Energy For Population': 400,
  'E21 - Energy For Food Production': 3000,
  'E22 - Energy For Goods Production': 2000,
  'E23 - Energy For Export': 500,
  'E24 - Energy For Import': 1000,
  'E25 - Energy For Capital': 1000,
  'E26 - Energy For Environment': 500,
  'E27 - Energy For Efficiency': 500,
  'G18 - Goods For Population': 1000,
  'G19 - Goods For Export': 500,
  'F14 - Goods For Import': 500,
  'F15 - Goods For Capital': 500,
  'TF9 - Goods For Environment': 200,
  'TF10 - Goods For Social Services': 300,
  'TF11 - Goods For Efficiency': 200,
  'TF12 - Goods For Energy Production': 300,
  'TF13 - New Food Production Capital': 100,
  'TF14 - New Goods Production Capital': 100,
  'TF15 - New Social Services Capital': 100,
  'TF16 - New Environmental Protection Capital': 100,
  'TF17 - New Energy Production Capital': 100,
  'TF18 - New Energy Efficiency Capital': 100
} 