function StopList( {list, onETAClick} ) {
    return (
        <div className='w-full'>
            {!!list.length && 
            <div className="max-w-md mx-auto border border-gray-200 divide-y divide-gray-200 rounded shadow mt-4 mb-4">
                 {list.map((item, index) => {
                  //console.log(item);
                  return (
                    <div 
                        key={index}
                        className='py-2 hover:bg-red-50 cursor-pointer px-4 flex items-center'
                        onClick={() => onETAClick(item.stop, item.service_type, item.route, item.bound)}
                    >
                            { item.stopName }
                    </div>
                  )  
                })}
            </div>
            }
        </div>
    )
}

export default StopList;