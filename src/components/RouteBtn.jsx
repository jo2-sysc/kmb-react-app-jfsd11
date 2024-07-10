function RouteBtn ({ routeServices, onRouteClick }) {
    return (
        <div className="container mx-auto top-4">
            <div id="bound" className="mt-8 text-center">
                {!!routeServices.length && routeServices.map((item, index) => {
                    const bound = item.bound === 'I' ? `inbound` : `outbound`;
                    return (
                        <button 
                            key={index}
                            className="bg-gray-100 text-gray-800 text-md font-medium me-2 px-2.5 py-0.5 rounded border border-gray-400"
                            onClick={async() => onRouteClick(item.route, bound, item.service_type)}
                        >
                            {item.orig_tc} ➡️ {item.dest_tc}
                        </button>   
                    )
                })
                }
            </div>
        </div>
    )
}

export default RouteBtn;