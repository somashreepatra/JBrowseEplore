// const tracks = [
//     {
//       type: 'BasicTrack',
//       trackId:
//         'GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff',
//       name: 'NCBI RefSeq Genes',
//       assemblyNames: ['GRCh38'],
//       category: ['Genes'],
//       adapter: {
//         type: 'Gff3TabixAdapter',
//         gffGzLocation: {
//           uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz',
//         },
//         index: {
//           location: {
//             uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz.tbi',
//           },
//         },
//       },
//     },
//     {
//       type: 'AlignmentsTrack',
//       trackId: 'NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome',
//       name: 'NA12878 Exome',
//       assemblyNames: ['GRCh38'],
//       category: ['1000 Genomes', 'Alignments'],
//       adapter: {
//         type: 'CramAdapter',
//         cramLocation: {
//           uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/alignments/NA12878/NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome.cram',
//         },
//         craiLocation: {
//           uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/alignments/NA12878/NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome.cram.crai',
//         },
//         sequenceAdapter: {
//           type: 'BgzipFastaAdapter',
//           fastaLocation: {
//             uri: 'https://jbrowse.org/genomes/GRCh38/fasta/hg38.prefix.fa.gz',
//           },
//           faiLocation: {
//             uri: 'https://jbrowse.org/genomes/GRCh38/fasta/hg38.prefix.fa.gz.fai',
//           },
//           gziLocation: {
//             uri: 'https://jbrowse.org/genomes/GRCh38/fasta/hg38.prefix.fa.gz.gzi',
//           },
//         },
//       },
//     },
//     {
//       type: 'VariantTrack',
//       trackId:
//         'ALL.wgs.shapeit2_integrated_snvindels_v2a.GRCh38.27022019.sites.vcf',
//       name: '1000 Genomes Variant Calls',
//       assemblyNames: ['GRCh38'],
//       category: ['1000 Genomes', 'Variants'],
//       adapter: {
//         type: 'VcfTabixAdapter',
//         vcfGzLocation: {
//           uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/variants/ALL.wgs.shapeit2_integrated_snvindels_v2a.GRCh38.27022019.sites.vcf.gz',
//         },
//         index: {
//           location: {
//             uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/variants/ALL.wgs.shapeit2_integrated_snvindels_v2a.GRCh38.27022019.sites.vcf.gz.tbi',
//           },
//         },
//       },
//     },
//     {
//       "type": "FeatureTrack", // QuantitativeTrack
//       "trackId": "genehancer_ucsc_deepa",
//       "name": "UCSC GeneHancer",
//       "assemblyNames": ["GRCh38"],
//       "category": ['CatTest'],
//       "adapter": {
//         "type": "FromConfigAdapter",
//         "features": [
//             {
//               "refName": "GRCh38",
//                    "name": "E",
//                    "uniqueId": 4,
//                   "start": 29838680,
//                   "end": 29838690,
//                   "fill": "#D9AD3D"
//             },
//         ]
//       }, 
//       "displays": [
//         {
//           "type": "LinearBasicDisplay",
//           "displayId": "nextstrain-color-display",
//           "renderer": {
//             "type": "SvgFeatureRenderer",
//             "color1": "jexl:get(feature,'fill') || 'black'"
//           }
//         }
//       ]
//       // "adapter": {
//       //   "type": 'TraceAdapter',
//       //   "tracesLocation": {
//       //     "uri": 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/variants/ALL.wgs.shapeit2_integrated_snvindels_v2a.GRCh38.27022019.sites.vcf.gz',
//       //   }, 
//       //   "index": {
//       //     "location": {
//       //       "uri": 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/variants/ALL.wgs.shapeit2_integrated_snvindels_v2a.GRCh38.27022019.sites.vcf.gz.tbi',
//       //     },
//       //   },
//       // }
//     },
//     // {
//     //   "type": "FeatureTrack",
//     //   "name": "Nextstrain annotations",
//     //   "trackId": "nextstrain-annotations",
//     //   "assemblyNames": ["SARS-CoV-2"],
//     //   "category": ["CatTest"],
//     //   // "adapter": {
//     //   //   "type": "FromConfigAdapter",
//     //   //   "features": [
//     //   //     {
//     //   //       "refName": "SARS-CoV-2",
//     //   //       "name": "E",
//     //   //       "uniqueId": 4,
//     //   //       "start": 26244,
//     //   //       "end": 26472,
//     //   //       "fill": "#D9AD3D"
//     //   //     },
//     //   //     {
//     //   //       "refName": "SARS-CoV-2",
//     //   //       "name": "M",
//     //   //       "uniqueId": 5,
//     //   //       "start": 26522,
//     //   //       "end": 27191,
//     //   //       "fill": "#5097BA"
//     //   //     },
//     //   //     {
//     //   //       "refName": "SARS-CoV-2",
//     //   //       "name": "N",
//     //   //       "uniqueId": 10,
//     //   //       "start": 28273,
//     //   //       "end": 29533,
//     //   //       "fill": "#E67030"
//     //   //     },
//     //   //     {
//     //   //       "refName": "SARS-CoV-2",
//     //   //       "name": "ORF1a",
//     //   //       "uniqueId": 0,
//     //   //       "start": 265,
//     //   //       "end": 13468,
//     //   //       "fill": "#8EBC66"
//     //   //     },
//     //   //     {
//     //   //       "refName": "SARS-CoV-2",
//     //   //       "name": "ORF1b",
//     //   //       "uniqueId": 1,
//     //   //       "start": 13467,
//     //   //       "end": 21555,
//     //   //       "fill": "#E59637"
//     //   //     },
//     //   //     {
//     //   //       "refName": "SARS-CoV-2",
//     //   //       "name": "ORF3a",
//     //   //       "uniqueId": 3,
//     //   //       "start": 25392,
//     //   //       "end": 26220,
//     //   //       "fill": "#AABD52"
//     //   //     },
//     //   //     {
//     //   //       "refName": "SARS-CoV-2",
//     //   //       "name": "ORF6",
//     //   //       "uniqueId": 6,
//     //   //       "start": 27201,
//     //   //       "end": 27387,
//     //   //       "fill": "#DF4327"
//     //   //     },
//     //   //     {
//     //   //       "refName": "SARS-CoV-2",
//     //   //       "name": "ORF7a",
//     //   //       "uniqueId": 7,
//     //   //       "start": 27393,
//     //   //       "end": 27759,
//     //   //       "fill": "#C4B945"
//     //   //     },
//     //   //     {
//     //   //       "refName": "SARS-CoV-2",
//     //   //       "name": "ORF7b",
//     //   //       "uniqueId": 8,
//     //   //       "start": 27755,
//     //   //       "end": 27887,
//     //   //       "fill": "#75B681"
//     //   //     },
//     //   //     {
//     //   //       "refName": "SARS-CoV-2",
//     //   //       "name": "ORF8",
//     //   //       "uniqueId": 9,
//     //   //       "start": 27893,
//     //   //       "end": 28259,
//     //   //       "fill": "#60AA9E"
//     //   //     },
//     //   //     {
//     //   //       "refName": "SARS-CoV-2",
//     //   //       "name": "ORF9b",
//     //   //       "uniqueId": 11,
//     //   //       "start": 28283,
//     //   //       "end": 28577,
//     //   //       "fill": "#D9AD3D"
//     //   //     },
//     //   //     {
//     //   //       "refName": "SARS-CoV-2",
//     //   //       "name": "S",
//     //   //       "uniqueId": 2,
//     //   //       "start": 21562,
//     //   //       "end": 25384,
//     //   //       "fill": "#5097BA"
//     //   //     }
//     //   //   ]
//     //   // },
//     //   "displays": [
//     //     {
//     //       "type": "LinearBasicDisplay",
//     //       "displayId": "nextstrain-color-display",
//     //       "renderer": {
//     //         "type": "SvgFeatureRenderer",
//     //         "color1": "jexl:get(feature,'fill') || 'black'"
//     //       }
//     //     }
//     //   ]
//     // },
//     // {
//     //   "type": "FeatureTrack",
//     //   "trackId": "genehancer_ucsc",
//     //   "name": "UCSC GeneHancer",
//     //   "assemblyNames": ["hg38"],
//     //   "adapter": {
//     //     "type": "UCSCAdapter",
//     //     "track": "geneHancerInteractionsDoubleElite"
//     //   }
//     // }
    
//   ]
  


const tracks = [
  {
    trackId: 'testConfig',
    assemblyNames: ["SARS-CoV-2"],
    name: 'Foo Track',
    type: 'BasicTrack',
    adapter: { type: 'FromConfigAdapter', features: [
      {
        "refName": "SARS-CoV-2",
        "name": "A",
        "uniqueId": 3,
        "start": 14939,
        "end": 14939,
        "fill": "#D9AD3D"
      },
      {
        "refName": "SARS-CoV-2",
        "name": "T",
        "uniqueId": 4,
        "start": 14940,
        "end": 14940,
        "fill": "#D9AD3D"
      },
      {
        "refName": "SARS-CoV-2",
        "name": "C",
        "uniqueId": 5,
        "start": 14941,
        "end": 14941,
        "fill": "#D9AD3D"
      },
      {
        "refName": "SARS-CoV-2",
        "name": "A",
        "uniqueId": 6,
        "start": 14942,
        "end": 14942,
        "fill": "#D9AD3D"
      },
      {
        "refName": "SARS-CoV-2",
        "name": "G",
        "uniqueId": 7,
        "start": 14943,
        "end": 14943,
        "fill": "#D9AD3D"
      },
      {
        "refName": "SARS-CoV-2",
        "name": "C",
        "uniqueId": 8,
        "start": 14944,
        "end": 14944,
        "fill": "#D9AD3D"
      },
      {
        "refName": "SARS-CoV-2",
        "name": "T",
        "uniqueId": 9,
        "start": 14945,
        "end": 14945,
        "fill": "#D9AD3D"
      },
      {
        "refName": "SARS-CoV-2",
        "name": "G",
        "uniqueId": 10,
        "start": 14946,
        "end": 14946,
        "fill": "#D9AD3D"
      },
      {
        "refName": "SARS-CoV-2",
        "name": "G",
        "uniqueId": 11,
        "start": 14947,
        "end": 14947,
        "fill": "#D9AD3D"
      },
      {
        "refName": "SARS-CoV-2",
        "name": "T",
        "uniqueId": 12,
        "start": 14948,
        "end": 14948,
        "fill": "#D9AD3D"
      },
      {
        "refName": "SARS-CoV-2",
        "name": "T",
        "uniqueId": 13,
        "start": 14949,
        "end": 14949,
        "fill": "#D9AD3D"
      },
      {
        "refName": "SARS-CoV-2",
        "name": "T",
        "uniqueId": 14,
        "start": 14950,
        "end": 14950,
        "fill": "#D9AD3D"
      },
      {
        "refName": "SARS-CoV-2",
        "name": "T",
        "uniqueId": 15,
        "start": 14951,
        "end": 14951,
        "fill": "#D9AD3D"
      },
    ] },
    displays: [
      {
        type: "LinearBasicDisplay",
        displayId: "testDisplay"
      }
    ]
  },
  {
    "type": "FeatureTrack",
    "name": "Traces",
    "trackId": "nextstrain-annotations",
    "assemblyNames": ["SARS-CoV-2"],
    "category": ["Annotation"],
    "adapter": {
      "type": "FromConfigAdapter", //FromConfigAdapter
      "features": [
        {
          "refName": "SARS-CoV-2",
          "name": "E",
          "uniqueId": 4,
          "start": 26244,
          "end": 26472,
          "fill": "#D9AD3D"
        },
        {
          "refName": "SARS-CoV-2",
          "name": "M",
          "uniqueId": 5,
          "start": 26522,
          "end": 27191,
          "fill": "#5097BA"
        },
        {
          "refName": "SARS-CoV-2",
          "name": "N",
          "uniqueId": 10,
          "start": 28273,
          "end": 29533,
          "fill": "#E67030"
        },
        {
          "refName": "SARS-CoV-2",
          "name": "ORF1a",
          "uniqueId": 0,
          "start": 265,
          "end": 13468,
          "fill": "#8EBC66"
        },
        {
          "refName": "SARS-CoV-2",
          "name": "Sample_NA12835_spec.ab1",
          "uniqueId": 1,
          "start": 14940,
          "end": 14950,
          "fill": "#E59637"
        },
        {
          "refName": "SARS-CoV-2",
          "name": "ORF3a",
          "uniqueId": 3,
          "start": 25392,
          "end": 26220,
          "fill": "#AABD52"
        },
        {
          "refName": "SARS-CoV-2",
          "name": "ORF6",
          "uniqueId": 6,
          "start": 27201,
          "end": 27387,
          "fill": "#DF4327"
        },
        {
          "refName": "SARS-CoV-2",
          "name": "ORF7a",
          "uniqueId": 7,
          "start": 27393,
          "end": 27759,
          "fill": "#C4B945"
        },
        {
          "refName": "SARS-CoV-2",
          "name": "ORF7b",
          "uniqueId": 8,
          "start": 27755,
          "end": 27887,
          "fill": "#75B681"
        },
        {
          "refName": "SARS-CoV-2",
          "name": "ORF8",
          "uniqueId": 9,
          "start": 27893,
          "end": 28259,
          "fill": "#60AA9E"
        },
        {
          "refName": "SARS-CoV-2",
          "name": "ORF9b",
          "uniqueId": 11,
          "start": 28283,
          "end": 28577,
          "fill": "#D9AD3D"
        },
        {
          "refName": "SARS-CoV-2",
          "name": "S",
          "uniqueId": 2,
          "start": 21562,
          "end": 25384,
          "fill": "#5097BA"
        }
      ]
    },
    "displays": [
      {
        "type": "LinearBasicDisplay",
        "displayId": "nextstrain-color-display",
        "renderer": {
          "type": "SvgFeatureRenderer",
          "color1": "jexl:get(feature,'fill') || 'black'"
        }
      }
    ]
  }, 
  {
    "type": "FeatureTrack",
    "name": "Electropherogram",
    "trackId": "electropherogram-annotations",
    "assemblyNames": ["SARS-CoV-2"],
    "category": ["Annotation"],
    "adapter": {
      "type": "TracesAdapter",
      "features": 
      [
        {
                      "refName": "SARS-CoV-2",
                      "name": "E",
                      "uniqueId": 4,
                      "start": 26244,
                      "end": 26472,
                      "fill": "#D9AD3D"
                    },
                    {
                      "refName": "SARS-CoV-2",
                      "name": "Sample_NA12835_spec.ab1",
                      "uniqueId": 1,
                      "start": 14940,
                      "end": 14950,
                      "fill": "#E59637"
                    },
      ]
    }
    ,"displays": [
      {
        "type": "LinearBasicDisplay",
        "displayId": "traces-color-display",
        "renderer": {
          "type": "SvgFeatureRenderer",
          "color1": "jexl:get(feature,'fill') || 'black'"
        }
      }
    ]
  }
];
  
  export default tracks