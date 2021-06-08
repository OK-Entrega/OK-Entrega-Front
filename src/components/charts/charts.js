import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';

const dataDonut = [
    {
        "id": "Em aberto",
        "label": "Em aberto",
        "value": 10,
        "color": "hsl(0, 0%, 53%)"
    },
    {
        "id": "Devoluções",
        "label": "Devoluções",
        "value": 5,
        "color": "hsl(0, 100%, 50%)"
    },
    {
        "id": "Entregas",
        "label": "Entregues",
        "value": 15,
        "color": "hsl(145, 63%, 49%)"
    },
    {
        "id": "Ocorrências",
        "label": "Ocorrências",
        "value": 10,
        "color": "hsl(36, 99%, 56%)"
    }
]

export const DonutChart = ({ ...props }) => {
    return <ResponsivePie
        data={dataDonut}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        colors={{ datum: 'data.color' }}
    />
}

const dataLine = [
    {
        "id": "notes",
        "color": "hsl(0, 0%, 53%)",
        "data": [
            {
                "x": "plane",
                "y": 13
            },
            {
                "x": "helicopter",
                "y": 296
            },
            {
                "x": "boat",
                "y": 14
            },
            {
                "x": "train",
                "y": 24
            },
            {
                "x": "subway",
                "y": 254
            },
            {
                "x": "bus",
                "y": 218
            },
            {
                "x": "car",
                "y": 53
            },
            {
                "x": "moto",
                "y": 22
            },
            {
                "x": "bicycle",
                "y": 88
            },
            {
                "x": "horse",
                "y": 215
            },
            {
                "x": "skateboard",
                "y": 86
            },
            {
                "x": "others",
                "y": 59
            }
        ]
    },
    {
        "id": "success",
        "color": "hsl(145, 63%, 49%)",
        "data": [
            {
                "x": "plane",
                "y": 29
            },
            {
                "x": "helicopter",
                "y": 77
            },
            {
                "x": "boat",
                "y": 57
            },
            {
                "x": "train",
                "y": 109
            },
            {
                "x": "subway",
                "y": 67
            },
            {
                "x": "bus",
                "y": 249
            },
            {
                "x": "car",
                "y": 191
            },
            {
                "x": "moto",
                "y": 253
            },
            {
                "x": "bicycle",
                "y": 167
            },
            {
                "x": "horse",
                "y": 38
            },
            {
                "x": "skateboard",
                "y": 136
            },
            {
                "x": "others",
                "y": 47
            }
        ]
    },
    {
        "id": "devolution",
        "color": "hsl(0, 100%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 194
            },
            {
                "x": "helicopter",
                "y": 176
            },
            {
                "x": "boat",
                "y": 200
            },
            {
                "x": "train",
                "y": 213
            },
            {
                "x": "subway",
                "y": 44
            },
            {
                "x": "bus",
                "y": 18
            },
            {
                "x": "car",
                "y": 170
            },
            {
                "x": "moto",
                "y": 84
            },
            {
                "x": "bicycle",
                "y": 2
            },
            {
                "x": "horse",
                "y": 236
            },
            {
                "x": "skateboard",
                "y": 109
            },
            {
                "x": "others",
                "y": 38
            }
        ]
    },
    {
        "id": "occurrence",
        "color": "hsl(36, 99%, 56%)",
        "data": [
            {
                "x": "plane",
                "y": 286
            },
            {
                "x": "helicopter",
                "y": 165
            },
            {
                "x": "boat",
                "y": 117
            },
            {
                "x": "train",
                "y": 119
            },
            {
                "x": "subway",
                "y": 163
            },
            {
                "x": "bus",
                "y": 181
            },
            {
                "x": "car",
                "y": 299
            },
            {
                "x": "moto",
                "y": 13
            },
            {
                "x": "bicycle",
                "y": 295
            },
            {
                "x": "horse",
                "y": 164
            },
            {
                "x": "skateboard",
                "y": 298
            },
            {
                "x": "others",
                "y": 76
            }
        ]
    }
]

export const LineChart = (/*{ ...props }*/) => {

    return <ResponsiveLine
        data={/*props.data*/dataLine}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        colors={d => d.color}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
}