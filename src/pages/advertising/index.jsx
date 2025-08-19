import React, { useEffect, useState } from "react";

function AdvertisingPage() {
  const [advertising, setAdvertising] = useState([]);
  const [region, setRegion] = useState([]);
  const [boshlangich, setBoshlangich] = useState([]);
  const [yakuniy, setYakuniy] = useState([]);
  const [natija, setNatija] = useState([]);

  const getAdvertising = async () => {
    try {
      const res = await API.get("/advertisement");
      console.log(res.data.data);
      setAdvertising(res.data.data);
      console.log(advertising);
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
