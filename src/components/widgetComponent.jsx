import React, { useState, useEffect } from 'react';
import DotPlot from './dotPlot';

function WidgetComponent(props) {
    const [data, setData] = useState({});
    const [meta, setMeta] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [config, setConfig] = useState({});

    useEffect(() => {
        if (props.colConfig && props.colConfig.length > 0) {
            const configData = {};
            props.colConfig.forEach(item => {
                configData[item.key] = item
            })
            setConfig(configData);
        }
    }, [props.colConfig])

    useEffect(() => {
        if (props.data) {
            setMeta(props.data.meta);
            setHeaders(props.data.headers);
            setData(props.data.data);
        }
    }, [props.data])

    const getValue = (index, item) => {
        const value = data[index].filter((i) => {
            return i.k === item.key;
        })[0].v;

        return `${item.prefix}${formatNumber(value, item.decimals)}${item.suffix}`;
    }

    const getMinMax = (key) => {
        let min, max;
        data.forEach(row => {
            row.forEach(rowItem => {
                if (rowItem.k === key) {
                    if (!min || (min && min > rowItem.v)) {
                        min = rowItem.v
                    }
                    if (!max || (max && max < rowItem.v)) {
                        max = rowItem.v
                    }
                }
            })
        })
        return { min, max }
    }

    const getMinValue = (item) => {
        return `${item.prefix}${formatNumber(getMinMax(item.key).min)}${item.suffix}`;
    }

    const getMaxValue = (item) => {
        return `${item.prefix}${formatNumber(getMinMax(item.key).max)}${item.suffix}`;
    }

    const getXValues = (key) => {
        const values = [];
        data.forEach(row => {
            row.forEach(rowItem => {
                if (rowItem.k === key) values.push(rowItem.v);
            })
        })
        return values
    }

    const getYValues = () => {
        const values = [];
        meta.forEach(row => {
            values.push(row.title);
        })
        return values
    }

    const ranges = [
        { divider: 1e18 , suffix: 'E' },
        { divider: 1e15 , suffix: 'P' },
        { divider: 1e12 , suffix: 'T' },
        { divider: 1e9 , suffix: 'G' },
        { divider: 1e6 , suffix: 'M' },
        { divider: 1e3 , suffix: 'K' }
    ];
      
    const formatNumber = (n, decimals = 2) => {
        for (var i = 0; i < ranges.length; i++) {
            if (n >= ranges[i].divider) {
                return (n / ranges[i].divider).toFixed(1).toString() + ranges[i].suffix;
            }
        }
        return n.toFixed(decimals).toString();
    }
  
  return (
    <div className='grid grid-cols-4 gap-1 divide-x-2 divide-dashed divide-red-500'>

        <div className="flex flex-col mx-10">
            <div className="p-1 h-7"></div>
            <div className="p-1 h-7"></div>
            {meta.map((item) => (
                <div key={item.key} className="text-sm text-gray-900">{item.title}</div>
            ))}
        </div>
        {headers.map((item) => {
            if ((config[item.key] && !config[item.key].isHidden)) return (
                <div className="flex flex-col px-5" key={item.key}>
                    <div className="p-1 h-7 font-bold">{item.title}</div>
                    <div className='grid grid-cols-5'>
                        <div className="col-start-1 flex flex-col border-t-2 border-b-2 border-l-2 border-dashed border-blue-300">
                            <div className="p-1 h-7"></div>
                            {meta.map((row, index) => (
                                <div key={row.key} className="text-sm text-gray-900">
                                    <div className='flex-1'>{ getValue(index, item) }</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col col-span-4 border-2 border-dashed border-green-300">
                            <div className='grid grid-cols-4 '>
                                <div className="">{getMinValue(item)}</div>
                                <div className="col-span-2"></div>
                                <div className="text-right">{getMaxValue(item)}</div>
                            </div>
                            <div>
                                <DotPlot xdata={ getXValues(item.key) } ydata={getYValues()}></DotPlot>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  );
}

export default WidgetComponent;