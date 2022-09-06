import React from 'react'
import { Feature } from '@jbrowse/core/util/simpleFeature'
import { Region } from '@jbrowse/core/util/types'
import { contrastingTextColor } from '@jbrowse/core/util/color'
import {
  bpSpanPx,
  revcom,
  complement,
  defaultStarts,
  defaultStops,
  defaultCodonTable,
  generateCodonTable,
} from '@jbrowse/core/util'
import { createJBrowseTheme } from '@jbrowse/core/ui'
import { ISequenceProps } from './TraceRenderer/components/ITrace'

interface ISequence {
  height: number, feature: Feature, region: Region, bpPerPx: number, theme: any
}

// const DNA = (props: ISequence) =>{
  
//   const { bpPerPx, region, feature, theme, height} = props

  
//   console.log("PROPS in DNA:  ", props, region, feature);
//   // console.log("DISPLAY DNA ", seq);
//   const render = 1 / bpPerPx >= 12
//   const start = feature.get('start') || 0
//   const end = feature.get('end') || 0
//   const regionstart = region.start || 0
//   const regionend = region.end || 0
//   let [regionleftPx, regionrightPx] = bpSpanPx(
//     regionstart,
//     regionend,
//     region,
//     bpPerPx,
//   )
//   let [leftPx, rightPx] = bpSpanPx(
//     start,
//     end,
//     region,
//     bpPerPx,
//   )
//   const reverse = region.reversed
//   const len = end - start
//   const w = Math.max((rightPx - leftPx) / len, 0.8)
//     const y = 0;
//   //const gappedSeq = feature.get("gappedSeq");
//   const gappedSeq = feature.get("gappedSeq");
//   const seqarr = gappedSeq.split("");

//   console.log("QBT ARRAY :: ", seqarr);

//   const fillstartempty = regionstart - start;
//   const fillseq = regionend - regionstart;
//   const fillendseq = regionend - end;
//   let sequencearr = [], seqindex = regionstart - start > 0 ? regionstart - start : 0;
//   for(let i = 0; i < regionend - regionstart; i++) {
//     // TODO: Refactor the below if condition
//     if(regionstart + i < start) {
//       sequencearr.push("");
//     } else if(regionstart + i >= start && regionstart + i < end ) {
//       sequencearr.push(seqarr[seqindex++]);
//     } else {
//       sequencearr.push("");
//     }
//   }
//   console.log("regionleftPx  ",regionleftPx, " LEFTPX ",leftPx);
//   return (
//     <>
//       {
//       sequencearr.map((letter: string, index: number) => {
//         const color = theme.palette.bases[letter.toUpperCase()]
//         const x = reverse ? regionrightPx - (index + 1) * w : regionleftPx + index * w

//         const featureindexpos = Math.abs(regionstart - start); //regionstart - start > 0 ? regionstart - start : 0;
//         const totalbasesinregion = (regionend - regionstart ) * w;
//        // const currcolumnindex = regionstart - start > 0 ? (regionstart - start) +  : 0;
//        let baseindex =  regionstart - start ;
//        if(regionstart - start > 0) {
//         baseindex = index + regionstart - start;
//        } else {
//         baseindex = index - Math.abs(regionstart - start);
//        }
//         const leftpos = (regionend - regionstart ) * w + index * w; //regionleftPx + index * w;
//         // console.log("regionstart - start > 0 ? regionstart - start :", featureindexpos, index, index+featureindexpos, leftpos);
//         return (
//           <React.Fragment key={index}>
//             {
//             letter !== "" ? (<rect
//               x={x}
//               y={y}
//               width={w}
//               height={height}
//               fill='transparent'
//               stroke={render ? '#ddd' : 'none'}
//               data-index={baseindex} data-left={leftpos} data-rectwidth={w} data-base={letter}
//             />
//             ) : null}
//             {
//               letter !== "" && render && (fillstartempty > 0 ) ? (
//               <text
//                 x={x}
//                 y={y + height / 2}
//                 dominantBaseline="middle"
//                 textAnchor="middle"
//                 fill={color ? color.main : 'black'} fontWeight="bold"
//                 data-index={baseindex} data-left={leftpos} data-rectwidth={w} data-base={letter}
//               >
//                 {letter}
//               </text>
//             ) : null}
            
            
//           </React.Fragment>
//         )
//       })
//       }
//     </>
//   )
// }

function Translation(props: {
  codonTable: any
  seq: string
  frame: number
  bpPerPx: number
  region: Region
  reverse?: boolean
  height: number
  y: number
  theme?: any
}) {
  const {
    codonTable,
    seq,
    frame,
    bpPerPx,
    region,
    height,
    y,
    reverse = false,
    theme,
  } = props
  const scale = bpPerPx

  // the tilt variable normalizes the frame to where we are starting from,
  // which increases consistency across blocks
  const tilt = 3 - (region.start % 3)

  // the effectiveFrame incorporates tilt and the frame to say what the
  // effective frame that is plotted. The +3 is for when frame is -2 and this
  // can otherwise result in effectiveFrame -1
  const effectiveFrame = (frame + tilt + 3) % 3

  const seqSliced = seq.slice(effectiveFrame)

  const translated: { letter: string; codon: string }[] = []
  for (let i = 0; i < seqSliced.length; i += 3) {
    const codon = seqSliced.slice(i, i + 3)
    const normalizedCodon = reverse ? revcom(codon) : codon
    const aminoAcid = codonTable[normalizedCodon] || ''
    translated.push({ letter: aminoAcid, codon: normalizedCodon.toUpperCase() })
  }

  const w = (1 / scale) * 3
  const drop = region.start === 0 ? 0 : w
  const render = 1 / bpPerPx >= 12
  const width = (region.end - region.start) / bpPerPx

  const map = ['#d8d8d8', '#adadad', '#8f8f8f'].reverse()
  return (
    <>
      {translated.map((element, index) => {
        const x = region.reversed
          ? width - (w * (index + 1) + effectiveFrame / scale - drop)
          : w * index + effectiveFrame / scale - drop
        const { letter, codon } = element
        return (
          <React.Fragment key={`${index}-${letter}`}>
            <rect
              x={x}
              y={y}
              width={
                render ? w : w + 0.7 /* small fudge factor when zoomed out*/
              }
              height={height}
              stroke={render ? '#555' : 'none'}
              fill={
                defaultStarts.includes(codon)
                  ? theme.palette.startCodon
                  : defaultStops.includes(codon)
                  ? theme.palette.stopCodon
                  : map[Math.abs(frame)]
              }
            />
            {render ? (
              <text
                x={x + w / 2}
                y={y + height / 2}
                dominantBaseline="middle"
                textAnchor="middle"
              >
                {letter}
              </text>
            ) : null}
          </React.Fragment>
        )
      })}
    </>
  )
}

function DNA(props: {
  seq: string
  theme: any
  bpPerPx: number
  height: number
  region: Region
  feature: Feature
  y: number
}) {
  const { bpPerPx, region, feature, theme, height, seq, y } = props
  const render = 1 / bpPerPx >= 12

  const [leftPx, rightPx] = bpSpanPx(
    feature.get('start'),
    feature.get('end'),
    region,
    bpPerPx,
  )
  const reverse = region.reversed
  const len = feature.get('end') - feature.get('start')
  const w = Math.max((rightPx - leftPx) / len, 0.8)

  return (
    <>
      {seq.split('').map((letter, index) => {
        const color = theme.palette.bases[letter.toUpperCase()]
        const x = reverse ? rightPx - (index + 1) * w : leftPx + index * w
        return (
          <React.Fragment key={index}>
            <rect
              x={x}
              y={y}
              width={w}
              height={height}
              fill='transparent'
              stroke={render ? '#eee' : 'none'}
            />
            {render ? (
              <text
                x={x}
                y={y + height / 2}
                dominantBaseline="middle"
                textAnchor="middle"
                fill={color ? color.main : 'black'} fontWeight="bold"
              >
                {letter}
              </text>
            ) : null}
          </React.Fragment>
        )
      })}
    </>
  )
}

const SequenceSVG = (props: ISequenceProps) => {
  let { showTranslation, showReverse, showForward, regions, bpPerPx, configTheme, currentFeature} = props;
  const [region] = regions
  const theme = createJBrowseTheme(configTheme)
  const codonTable = generateCodonTable(defaultCodonTable)
  const height = 20
  //const [feature] = [...features.values()]
  if (!currentFeature) {
    return null
  }
  console.log("showForward  ",showForward);
  const seq: string = currentFeature.get('seq')
  console.log("SEQ VALUE ", seq);
  console.log("FEATURE ", currentFeature);
  if (!seq) {
    return null
  }

  // incrementer for the y-position of the current sequence being rendered
  // (applies to both translation rows and dna rows)
  let currY = -20

  return (
    <>
      {/* the upper translation row. if the view is reversed, the reverse
        translation is on the top */}
      {showTranslation && (region.reversed ? showReverse : showForward)
        ? [2, 1, 0].map(index => (
            <Translation
              key={`translation-${index}`}
              seq={seq}
              y={(currY += 20)}
              codonTable={codonTable}
              frame={index}
              bpPerPx={bpPerPx}
              region={region}
              theme={theme}
              height={height}
              reverse={region.reversed}
            />
          ))
        : null}

      {showForward ? (
        <DNA
          height={height}
          y={(currY += 20)}
          feature={currentFeature}
          region={region}
          seq={region.reversed ? complement(seq) : seq}
          bpPerPx={bpPerPx}
          theme={theme}
        />
      ) : null}

      {showReverse ? (
        <DNA
          height={height}
          y={(currY += 20)}
          feature={currentFeature}
          region={region}
          seq={region.reversed ? seq : complement(seq)}
          bpPerPx={bpPerPx}
          theme={theme}
        />
      ) : null}

      {/* the lower translation row. if the view is reversed, the forward
        translation is on the bottom */}
      {showTranslation && (region.reversed ? showForward : showReverse)
        ? [0, -1, -2].map(index => (
            <Translation
              key={`rev-translation-${index}`}
              seq={seq}
              y={(currY += 20)}
              codonTable={codonTable}
              frame={index}
              bpPerPx={bpPerPx}
              region={region}
              theme={theme}
              height={height}
              reverse={!region.reversed}
            />
          ))
        : null}
    </>
  )
}

export const KeyDown = (props: {props: ISequenceProps, OnSvgClick: any}) => {//(props: {isAddBase: boolean, OnSvgClick: any, selectedIndex: number, feature: any, regions: any, bpPerPx: number, height: any, theme: any}) => {
  const newprops = props.props;
  const {features, regions, bpPerPx, } = newprops;
  const [region] = regions || [];
  //const feature = Array.from(features.values());
  //const feature0 = feature[0];
  const feature = newprops.currentFeature;
  console.log("FEATURE in keydown  ::  ", feature , region);
  const width = (region.end - region.start) / bpPerPx
  const seqHeight = 20;
  const forwardHt = newprops.showForward ? newprops.showTranslation ? seqHeight * 3 : seqHeight : 0;
  const reverseHt = newprops.showReverse ? newprops.showTranslation ? seqHeight * 3 : seqHeight : 0;
  const totalHeight = forwardHt + reverseHt;
  const svgClickHandler = (event: React.MouseEvent) => {
    props.OnSvgClick(event);
  }
  
  return (

      <div>
        { feature ? 
        <svg
              data-testid="sequence_track_DNA"
              width={width}
              height={totalHeight}
              style={{ width, height: totalHeight}}
              onClick={svgClickHandler}
            >
          <SequenceSVG {...newprops}></SequenceSVG>
        </svg> : null}
      </div>
  );
}

export default KeyDown;
