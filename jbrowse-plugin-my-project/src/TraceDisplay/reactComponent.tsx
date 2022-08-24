import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import React, { useState, useRef } from 'react'
import { TraceTrackModel } from './model';
import { BaseBlock } from '@jbrowse/core/util/blockTypes';
import { makeStyles } from 'tss-react/mui'
import { getConf } from '@jbrowse/core/configuration'
import { getContainingView } from '@jbrowse/core/util'
const useStyles = makeStyles()(theme => ({
    display: {
      position: 'relative',
      whiteSpace: 'nowrap',
      textAlign: 'left',
      width: '100%',
      minHeight: '100%',
    },
    linearBlocks: {
        whiteSpace: 'nowrap',
        textAlign: 'left',
        position: 'absolute',
        minHeight: '100%',
        display: 'flex',
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

  const { model, children } = props
  
  const { classes } = useStyles()
    const ref = useRef<HTMLDivElement>(null)
    
    const [clientRect, setClientRect] = useState<DOMRect>()
    const [offsetMouseCoord, setOffsetMouseCoord] = useState<Coord>([0, 0])
    const [clientMouseCoord, setClientMouseCoord] = useState<Coord>([0, 0])
    const [contextCoord, setContextCoord] = useState<Coord>()

  const { blockDefinitions, blockState, features, showEditInput,  } = model
  let leftMousePosition;
  const viewModel: any = getContainingView(model)
  const editstartposition = model.editstartposition || 0;
  leftMousePosition =  editstartposition + Math.abs(blockDefinitions.offsetPx - viewModel.offsetPx) - 40;
  let baseval = "G";
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
        // onMouseMove={event => {
        //     if (!ref.current) {
        //       return
        //     }
        //     const rect = ref.current.getBoundingClientRect()
        //     const { left, top } = rect
        //     setOffsetMouseCoord([event.clientX - left, event.clientY - top])
        //     setClientMouseCoord([event.clientX, event.clientY])
        //     setClientRect(rect)
        //   }}
          >
            <div
                data-testid="Blockset"
                className={classes.linearBlocks}
                style={{
                    left: blockDefinitions.offsetPx - viewModel.offsetPx,
                }}>
                    {
                        showEditInput ?
                        (<div style={{position:"relative"}}> 
                            <input name="add_base_ce" title="qualityEditDiv" value={baseval} style={{left: leftMousePosition+"px", position: "absolute", top: "103px",width: "51px",fontFamily: "verdana,sans-serif",fontSize: "15px",border: "0px",outline: "medium none",zIndex:1}} onKeyUp={(event: any) => {
            console.log("EVENT KEYUP ", event.key)
                                event.preventDefault();
                if(['a', 't', 'g', 'c' ].includes(event.key?.toLowerCase())) {  // Update a base
                    console.log("UPDATE");
                    event.target.value = event.target.value + event.key
                } else if(['Backspace'].includes(event.key)) {  // Delete a base
                    console.log("DELETE");
                    const newval = event.target.value.slice(0, -1);
                    event.target.value = newval;
                } 
                return true;
            
          }} />
                        </div>) : null
                    }
                    <>
                    {blockDefinitions.map(block => {
                        let state = blockState.get(block.key)
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