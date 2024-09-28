import type { Block } from 'payload/types'


export const TestingBlock: Block = {
  slug: 'testingBlock',
  labels: {
    singular: 'Testing Block',
    plural: 'Testing Blocks',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'Texto',
      required: true,
    },
  ],
}
