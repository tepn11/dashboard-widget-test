import React, { useState, useEffect } from 'react';
import WidgetComponent from './widgetComponent';
import { getData } from '../services/data';

function Dashboard() {
  const [data, setData] = useState({});
  const [config1, setConfig1] = useState([]);
  const [config2, setConfig2] = useState([]);

  useEffect(() => {
    getData()
      .then(result => {
        setData(result.data);
        setConfig1(result.config1);
        setConfig2(result.config2);
      });
  }, [])

  
  return (
    <div>
      { data && config1 && <WidgetComponent colConfig={config1} data={data.query}></WidgetComponent> }
      { data && config2 && <WidgetComponent colConfig={config2} data={data.query}></WidgetComponent> }
    </div>
  );
}

export default Dashboard;