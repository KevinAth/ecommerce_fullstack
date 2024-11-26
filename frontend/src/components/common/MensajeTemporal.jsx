import { useEffect, useState } from "react";

export function MensajeTemporal({mensaje}) {
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    setVisible(true)
    setTimeout(()=>{
        setVisible(false)
    },5000)
  })
  return <>
    <p>{mensaje}</p>
  </>;
}
