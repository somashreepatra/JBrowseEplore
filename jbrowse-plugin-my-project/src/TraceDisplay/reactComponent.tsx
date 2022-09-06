import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import React, { useState, useRef, useEffect } from 'react'
import { TraceTrackModel } from './model';
import { BaseBlock } from '@jbrowse/core/util/blockTypes';
import { makeStyles } from 'tss-react/mui'
import { getConf } from '@jbrowse/core/configuration'
import { Feature, getContainingView } from '@jbrowse/core/util'
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
    
    // const [clientRect, setClientRect] = useState<DOMRect>()
    // const [offsetMouseCoord, setOffsetMouseCoord] = useState<Coord>([0, 0])
    // const [clientMouseCoord, setClientMouseCoord] = useState<Coord>([0, 0])
    const [contextCoord, setContextCoord] = useState<Coord>()

  const { blockDefinitions, blockState, features, showEditInput,  } = model
  //let leftMousePosition;
  const viewModel: any = getContainingView(model)
  const startposition = model.editstartposition ? model.editstartposition : "0px";
  //const editstartposition = model.editstartposition || 0;
//   if(model.editstartposition) {
//     leftMousePosition =  model.editstartposition.toString() + "px" //editstartposition + Math.abs(blockDefinitions.offsetPx - viewModel.offsetPx) - 40;
//   }
  
  const [baseval, setBaseval] = useState("");
  let cont = document.getElementById("trackRenderingContainer-linearGenomeView-e1");
  if(cont){
    cont.style.height = "1000px";
  }
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
            if(model.editbasevalue) {
                setBaseval(model.editbasevalue);
            }
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
                            <input name="add_base_ce" title="qualityEditDiv" value={baseval} style={{left: startposition , position: "absolute", top: "103px",width: model.editinputwidth,fontFamily: "verdana,sans-serif",fontSize: "15px",border: "0px",outline: "medium none",zIndex:1}} onChange={(event: any) => { console.log("EVENT ON CHANGE :: ", event); }} onKeyUp={(event: any) => {
            console.log("EVENT KEYUP ", event.key)
                                event.preventDefault();
                                let newval = "";
                if(['a', 't', 'g', 'c' ].includes(event.key?.toLowerCase())) {  // Update a base
                    newval = baseval + event.key;
                    console.log("UPDATE ",newval);
                    setBaseval(newval);
                } else if(['Backspace'].includes(event.key)) {  // Delete a base
                    newval = baseval.slice(0, -1);
                    console.log("DELETE ",newval);
                    setBaseval(newval);
                } else if(['Enter'].includes(event.key)) {  // Delete a base
                    console.log("Update Traces ");
                    const features = Array.from(model.features.values());
                    const featureseq = features[0].get("gappedSeq");
                    console.log("BEFORE ADD SUB STRING ",featureseq);
                    if(baseval.length > 0) {
                        let end = 0;
                        if(model.editfeatureindex) {
                            end = parseInt(model.editfeatureindex);
                        }
                        console.log("ADD END :: ", end);
                        console.log("FEATURE GAPPEDSEQ BEFORE ADD ", features[0].get("gappedSeq"));
                        console.log("baseval  ",baseval);
                        console.log("featureseq.substring(0, end)   ",featureseq.substring(0, end) );
                        console.log("featureseq.substring(end, featureseq.length)  ",featureseq.substring(end, featureseq.length));
                        features[0].set("gappedSeq", featureseq.substring(0, end) + baseval + featureseq.substring(end+1, featureseq.length));
                        console.log("FEATURE GAPPEDSEQ AFTER ADD ", features[0].get("gappedSeq"));
                    } else {
                        let start = 0, end = 0;
                        if(model.editfeatureindex) {
                            start = parseInt(model.editfeatureindex) ;
                            end = parseInt(model.editfeatureindex) + 1;
                        }
                        console.log("START :: ", start, " :: END :: ", end);
                        console.log("FEATURE GAPPEDSEQ BEFORE delete ", features[0].get("gappedSeq"));
                        console.log("baseval  ",baseval);

                        features[0].set("gappedSeq", featureseq.substring(0, start) + baseval + featureseq.substring(end, featureseq.length));
                        console.log("FEATURE GAPPEDSEQ AFTER delete ", features[0].get("gappedSeq"));
                    }

                    // TODO: Update features changes at the top level

                    setBaseval("");
                    model.toggleShowEditInput();
                    model.reload();
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