import { Feature } from '@jbrowse/core/util/simpleFeature'
import { Region } from '@jbrowse/core/util/types'
import { AnyConfigurationModel } from '@jbrowse/core/configuration/configurationSchema'

export interface SequenceProps {
    exportSVG?: boolean
    features: Map<string, Feature>
    regions: Region[]
    bpPerPx: number
    config: AnyConfigurationModel
    highResolutionScaling: number
    configTheme: any
    showForward: boolean
    showReverse: boolean
    showTranslation: boolean,
    onMouseOut?: React.MouseEventHandler
    onMouseDown?: React.MouseEventHandler
    onMouseLeave?: React.MouseEventHandler
    onMouseEnter?: React.MouseEventHandler
    onMouseOver?: React.MouseEventHandler
    onMouseMove?: (event: React.MouseEvent, featureId?: string) => void
    onMouseUp?: React.MouseEventHandler
    onClick?: React.MouseEventHandler
  }