import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PersonalFinance = () => {
  let [responseData, setResponseData] = useState({});

  useEffect(() => {
    const fetchPersonalFinance = async () => {
      const requestUrl =
        'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json';
      try {
        const response = await axios.get(requestUrl);
        return setResponseData(response);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchPersonalFinance();
  }, []);

  return <div>{JSON.stringify(responseData)}</div>;
};

export default PersonalFinance;
