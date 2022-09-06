import { Feature } from '@jbrowse/core/util/simpleFeature'
import { Region } from '@jbrowse/core/util/types'
import { AnyConfigurationModel } from '@jbrowse/core/configuration/configurationSchema'

export interface ISequenceProps {
    exportSVG?: boolean
    features: Map<string, Feature>
    currentFeature: Feature
    regions: Region[]
    bpPerPx: number
    config: AnyConfigurationModel
    highResolutionScaling: number
    configTheme: any
    keydata: any
    showEditInput: boolean
    showForward: boolean
    showReverse: boolean
    showTranslation: boolean,
    showElectropherogram: boolean
    showQualityBars: boolean
    displayModel: any
    onMouseOut?: React.MouseEventHandler
    onMouseDown?: React.MouseEventHandler
    onMouseLeave?: React.MouseEventHandler
    onMouseEnter?: React.MouseEventHandler
    onMouseOver?: React.MouseEventHandler
    onMouseMove?: (event: React.MouseEvent, featureId?: string) => void
    onMouseUp?: React.MouseEventHandler
    onClick?: React.MouseEventHandler
}

export enum BaseOperationEnum {
    ADD = "ADD",
    DELETE = "DELETE",
    UPDATE = "UPDATE",
    NONE = "NONE"
}
export interface IKeyEventData {
    operation: BaseOperationEnum,
    key: string,
    keyCode: number
}