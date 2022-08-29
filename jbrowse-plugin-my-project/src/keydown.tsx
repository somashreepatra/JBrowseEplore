import React from 'react'
import { Feature } from '@jbrowse/core/util/simpleFeature'
import { Region } from '@jbrowse/core/util/types'
import { contrastingTextColor } from '@jbrowse/core/util/color'
import { bpSpanPx } from '@jbrowse/core/util'

interface ISequence {
  height: number, feature: Feature, region: Region, bpPerPx: number, theme: any
}

const DNA = (props: ISequence) =>{
  
  const { bpPerPx, region, feature, theme, height} = props

  
  console.log("PROPS in DNA:  ", props, region, feature);
  // console.log("DISPLAY DNA ", seq);
  const render = 1 / bpPerPx >= 12
  const start = feature.get('start') || 0
  const end = feature.get('end') || 0
  const regionstart = region.start || 0
  const regionend = region.end || 0
  let [regionleftPx, regionrightPx] = bpSpanPx(
    regionstart,
    regionend,
    region,
    bpPerPx,
  )
  let [leftPx, rightPx] = bpSpanPx(
    start,
    end,
    region,
    bpPerPx,
  )
  const reverse = region.reversed
  const len = end - start
  const w = Math.max((rightPx - leftPx) / len, 0.8)
    const y = 0;
  //const gappedSeq = feature.get("gappedSeq");
  const gappedSeq = feature.get("gappedSeq");
  const seqarr = gappedSeq.split("");

  console.log("QBT ARRAY :: ", seqarr);

  const fillstartempty = regionstart - start;
  const fillseq = regionend - regionstart;
  const fillendseq = regionend - end;
  let sequencearr = [], seqindex = regionstart - start > 0 ? regionstart - start : 0;
  for(let i = 0; i < regionend - regionstart; i++) {
    // TODO: Refactor the below if condition
    if(regionstart + i < start) {
      sequencearr.push("");
    } else if(regionstart + i >= start && regionstart + i < end ) {
      sequencearr.push(seqarr[seqindex++]);
    } else {
      sequencearr.push("");
    }
  }
  console.log("regionleftPx  ",regionleftPx, " LEFTPX ",leftPx);
  return (
    <>
      {
      sequencearr.map((letter: string, index: number) => {
        const color = theme.palette.bases[letter.toUpperCase()]
        const x = reverse ? regionrightPx - (index + 1) * w : regionleftPx + index * w

        const featureindexpos = Math.abs(regionstart - start); //regionstart - start > 0 ? regionstart - start : 0;
        const totalbasesinregion = (regionend - regionstart ) * w;
       // const currcolumnindex = regionstart - start > 0 ? (regionstart - start) +  : 0;
       let baseindex =  regionstart - start ;
       if(regionstart - start > 0) {
        baseindex = index + regionstart - start;
       } else {
        baseindex = index - Math.abs(regionstart - start);
       }
        const leftpos = (regionend - regionstart ) * w + index * w; //regionleftPx + index * w;
        // console.log("regionstart - start > 0 ? regionstart - start :", featureindexpos, index, index+featureindexpos, leftpos);
        return (
          <React.Fragment key={index}>
            {
            letter !== "" ? (<rect
              x={x}
              y={y}
              width={w}
              height={height}
              fill='transparent'
              stroke={render ? '#ddd' : 'none'}
              data-index={baseindex} data-left={leftpos} data-rectwidth={w} data-base={letter}
            />
            ) : null}
            {
              letter !== "" && render && (fillstartempty > 0 ) ? (
              <text
                x={x}
                y={y + height / 2}
                dominantBaseline="middle"
                textAnchor="middle"
                fill={color ? color.main : 'black'} font-weight="bold"
                data-index={baseindex} data-left={leftpos} data-rectwidth={w} data-base={letter}
              >
                {letter}
              </text>
            ) : null}
            
            
          </React.Fragment>
        )
      })
      }
    </>
  )
}

export const KeyDown = (props: {isAddBase: boolean, OnSvgClick: any, OnSvgDoubleClick: any, selectedIndex: number, feature: any, regions: any, bpPerPx: number, height: any, theme: any}) => {
  const {isAddBase, OnSvgClick, OnSvgDoubleClick, feature, selectedIndex, regions, bpPerPx, height, theme} = props;
  const [region] = regions || [];
  console.log("FEATURE in keydown  ::  ", feature , region);
  const width = (region.end - region.start) / bpPerPx
  const totalHeight = 50
  

  const svgClickHandler = (event: React.MouseEvent) => {
    OnSvgClick(event);
  }

  const svgDblClickHandler = (event: React.MouseEvent) => {
    OnSvgDoubleClick(event);
  }
  
  return (

      <div>
        { feature ? 
        /*{
          isAddBase ?
          (<div style={{position:"relative"}}> 
            <input name="add_base_ce" title="qualityEditDiv" value="" style={{left: leftMousePosition, position: "absolute", top: "0",width: "10px",fontFamily: "verdana,sans-serif",fontSize: "15px",border: "0",outline: "medium none"}} />
          </div>) : null
        }*/
        <svg
              data-testid="sequence_track_DNA"
              width={width}
              height={totalHeight}
              style={{ width, height: totalHeight}}
              onClick={svgClickHandler}
              onDoubleClick={svgDblClickHandler}
            >
          <DNA height={height} feature={feature} region={region} bpPerPx={bpPerPx} theme={theme} />
        </svg> : null}
      </div>
  );
}

export default KeyDown;
