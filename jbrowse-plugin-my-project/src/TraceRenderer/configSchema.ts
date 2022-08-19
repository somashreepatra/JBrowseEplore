import { ConfigurationSchema } from '@jbrowse/core/configuration'

export default ConfigurationSchema(
  'TraceSequenceRenderer',
  {
    height: {
      type: 'number',
      description: 'height in pixels of each line of sequence',
      defaultValue: 160,
    }
  },
  { explicitlyTyped: true },
)
