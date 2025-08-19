import React, { useEffect, useState } from "react";

function AdvertisingPage() {
  const [statistic, setStatistic] = useState([]);
  const [region, setRegion] = useState([]);
  const [boshlangich, setBoshlangich] = useState([]);
  const [yakuniy, setYakuniy] = useState([]);
  const [natija, setNatija] = useState([]);

  const getAdvertising = async () => {
    try {
      const res = await API.get("/advertisement");
      console.log(res.data.data);
      setStatistic(res.data.data);
      setRegion(res.data.data.map((item) => item.regionName));
      setBoshlangich(
        res.data.data.map((item) => item.averageInitialPercentage)
      );
      setYakuniy(res.data.data.map((item) => item.averageFinalPercentage));
      setNatija(res.data.data.map((item) => item.growthPercentage));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAdvertising();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}

export default AdvertisingPage;
