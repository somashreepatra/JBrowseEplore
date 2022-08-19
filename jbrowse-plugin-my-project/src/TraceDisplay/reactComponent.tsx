import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import React, { useState, useRef } from 'react'
import { TraceTrackModel } from './model';
import { BaseBlock } from '@jbrowse/core/util/blockTypes';
import { makeStyles } from 'tss-react/mui'
import { getConf } from '@jbrowse/core/configuration'
const useStyles = makeStyles()(theme => ({
    display: {
      position: 'relative',
      whiteSpace: 'nowrap',
      textAlign: 'left',
      width: '100%',
      minHeight: '100%',
    },
    traceBlock: {
        position: 'relative',
        minHeight: '100%',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
      elidedBlock: {
        minHeight: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#999',
        backgroundImage:
          'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,.5) 1px, rgba(255,255,255,.5) 3px)',
      },
      interRegionPaddingBlock: {
        minHeight: '100%',
        backgroundColor: theme.palette.text.primary,
      },
      boundaryPaddingBlock: {
        minHeight: '100%',
        backgroundColor: theme.palette.action.disabledBackground,
      },
  }))
type Coord = [number, number]

const TraceDisplay = observer(
    (props: { model: TraceTrackModel; children: React.ReactNode }) => {

    console.log("PROPS BEFORE ",props);
  const { model, children } = props
  console.log("props  ",props);
  console.log("CHILDREN ", children);
  
  const { classes } = useStyles()
    const ref = useRef<HTMLDivElement>(null)
    
    const [clientRect, setClientRect] = useState<DOMRect>()
    const [offsetMouseCoord, setOffsetMouseCoord] = useState<Coord>([0, 0])
    const [clientMouseCoord, setClientMouseCoord] = useState<Coord>([0, 0])
    const [contextCoord, setContextCoord] = useState<Coord>()

  const { blockDefinitions, blockState } = model
  console.log("BLOCK STATE ", blockDefinitions, blockState);
  console.log("DISPLAY ID ", getConf(model, 'displayId'));
  let isAddBase = true, leftMousePosition = "10px";
  return (
    <div
        ref={ref}
        data-testid={`display-${getConf(model, 'displayId')}`}
        className={classes.display}
        onContextMenu={event => {
            event.preventDefault()
            if (contextCoord) {
              // There's already a context menu open, so close it
              setContextCoord(undefined)
            } else if (ref.current) {
              setContextCoord([event.clientX, event.clientY])
            }
          }}
        onClick={event => {
            console.log("Mouse Clicked ", event);
            //setClientMouseCoord([event.clientX, event.clientY])
        }}
        onMouseMove={event => {
            if (!ref.current) {
              return
            }
            const rect = ref.current.getBoundingClientRect()
            const { left, top } = rect
            setOffsetMouseCoord([event.clientX - left, event.clientY - top])
            setClientMouseCoord([event.clientX, event.clientY])
            setClientRect(rect)
          }}>
            {
                isAddBase ?
                (<div style={{position:"relative"}}> 
                    <input name="add_base_ce" title="qualityEditDiv" value="" style={{left: leftMousePosition, position: "absolute", top: "0",width: "10px",fontFamily: "verdana,sans-serif",fontSize: "15px",border: "0",outline: "medium none"}} />
                </div>) : null
            }
            <>
            {blockDefinitions.map(block => {
                const state = blockState.get(block.key)
                return (
                    <TraceBlock
                    block={block}
                    key={`${model.id}-${block.key}`}
                    >
                    {state && state.ReactComponent ? (
                        <state.ReactComponent model={state} />
                    ) : null}
                    </TraceBlock>
                )
            })}
            </>
    </div>

    
  )
})

  const TraceBlock = observer(
    ({ block, children }: { block: BaseBlock; children: React.ReactNode }) => {
      const { classes } = useStyles()
      const { widthPx } = block
      return (
        <div style={{ width: widthPx }} className={classes.traceBlock}>
          {children}
        </div>
      )
    },
  )
  
export default TraceDisplay