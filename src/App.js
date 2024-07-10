import './App.css';
import { useState, useEffect } from 'react';
import Search from './components/Search';
import RouteBtn from './components/RouteBtn';
import StopList from './components/StopList';
import Modal from './components/Modal';
import Header from './components/Header';

const routeAPI = 'https://data.etabus.gov.hk/v1/transport/kmb/route/'; // show all bus routes
const routeStopAPI = 'https://data.etabus.gov.hk/v1/transport/kmb/route-stop'; // all stops for specific route
const stopAPI = 'https://data.etabus.gov.hk/v1/transport/kmb/stop'; // get stop name by stopId
const etaAPI = 'https://data.etabus.gov.hk/v1/transport/kmb/stop-eta'; // get ETA 

function App() {
  const [ allRoutes, setAllRoutes ] = useState([]);
  const [ routeServices, setRouteServices ] = useState([]);
  const [ stopList, setStopList ] = useState([]);
  const [ etaList, setEtaList ] = useState([]);
  const [ isOpen, setIsOpen ] = useState(false);
  useEffect (() => {
    async function fetchRoutes () {
        try {
            const res = await fetch(routeAPI);
            const routes = await res.json();
            setAllRoutes(routes.data);
        } catch (err) {
            console.log(err);
        }
    }
    fetchRoutes(); // here to execute
  }, []);

  function forSearchUseSetState(serviceArr) {
    setRouteServices(serviceArr);
  }

  async function forRouteBtnUseOnClick(route, bound, serviceType) {
    const res = await fetch(`${routeStopAPI}/${route}/${bound}/${serviceType}`);
    const result = await res.json();
    let tempStopList = result.data.slice();
    
    // await Promise.all(tempStopList.map(async (item, index) => {
    //   const res = await fetch(`${stopAPI}/${item.stop}`);
    //   const result = await res.json();
    //   //console.log(result.data.name_tc)
    //   tempStopList[index].stopName = result.data.name_tc;
    // }));
    for (const [index, item] of tempStopList.entries()) {
      const res = await fetch(`${stopAPI}/${item.stop}`);
      const result = await res.json();
      tempStopList[index].stopName = result.data.name_tc;
    }
    
    setStopList(tempStopList);
    
  } 

  async function etaOnClick (stopId, serviceType, route, bound) {
    setEtaList([])
    const res = await fetch(`${etaAPI}/${stopId}`);
    const result = await res.json();
    //console.log(result.data);
    for (const item of result.data) {
      //console.log(item.route, item.service_type, item.dir)
      if ((item.route === route) && (item.service_type === Number(serviceType)) && (item.dir === bound) ) {
        console.log(item);
        setEtaList(prevState => 
          [...prevState, item ] 
        )
      }
    }
    setIsOpen(true)
  }

  function closeModal()  {
    setIsOpen(false);
  }


  return (
    <div className="App">
      <Header />
      <Search
        setState={forSearchUseSetState}
        allRoutes={allRoutes}
      />
      <RouteBtn
        routeServices={routeServices}
        onRouteClick={forRouteBtnUseOnClick}
      />
      <StopList 
        list={stopList} 
        onETAClick={etaOnClick}
      />
      { isOpen && <Modal list={etaList} closeModal={closeModal}/> }
    </div>
  );
}

export default App;
