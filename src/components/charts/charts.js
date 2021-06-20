import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';

export const DonutChart = ({ ...props }) => {
    return <ResponsivePie
        data={props.data}
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

export const LineChart = ({ ...props }) => {
return <a></a>
    // return <ResponsiveLine
    //     data={props.data}
    //     margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    //     xScale={{ type: 'point' }}
    //     yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
    //     yFormat=" >-.2f"
    //     axisTop={null}
    //     axisRight={null}
    //     colors={d => d.color}
    //     axisBottom={{
    //         orient: 'bottom',
    //         tickSize: 5,
    //         tickPadding: 5,
    //         tickRotation: 0,
    //         legend: props.legendX,
    //         legendOffset: 36,
    //         legendPosition: 'middle'
    //     }}
    //     axisLeft={{
    //         orient: 'left',
    //         tickSize: 5,
    //         tickValues: props.data?.reduce((set, { y }) => set?.add(y), new Set())?.size,
    //         tickPadding: 5,
    //         tickRotation: 0,
    //         legend: "Quantidade",
    //         legendOffset: -40,
    //         legendPosition: 'middle'
    //     }}
    //     pointSize={10}
    //     pointColor={{ theme: 'background' }}
    //     pointBorderWidth={2}
    //     pointBorderColor={{ from: 'serieColor' }}
    //     pointLabelYOffset={-12}
    //     useMesh={true}
    // />     //comentado pra nao dar erro, o filtro nao ta funcionando com o estado, tem q por formik, ai ele nao manda e a api nao retorna nada ai da erro
}