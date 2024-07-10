import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

function Search ({ setState, allRoutes }) {
    const [ inputValue, setInputValue ] = useState(''); // undefined 
    const [ error, setError ] = useState('');    
    function handleOnChange(e) {
        const cleanInput = e.target.value.trim().replaceAll(' ', '').toUpperCase();
        setInputValue(cleanInput);
    }

    async function handleSearch() {
        setError('');
        let serviceArr = [];
        await allRoutes.map((route, index) => {
            if (route.route === inputValue) {
                serviceArr.push(route);
            }
        });
        if (serviceArr.length > 0){
            //console.log('有 line')
            setState(serviceArr);
        } else {
            setError('無 line');
            // no such line
        }
    }
    // console.log(allRoutes);
    return (
        <>
        <form className="max-w-md mx-auto">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                    type="search" 
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#F05323] focus:border-[#F05323]" 
                    placeholder="請輸入路線⋯⋯" 
                    value={inputValue}
                    onChange={(e) => handleOnChange(e)}
                />
                <button 
                    type="button" 
                    className="text-white bg-[#F05323] hover:bg-[#EE4A4A] focus:ring-4 focus:ring-[#f08623] font-medium rounded-lg text-sm px-4 py-2 focus:outline-none absolute end-2.5 bottom-2.5" 
                    onClick={handleSearch}
                >
                    搜尋路線
                </button>
            </div>
        </form>
       { !!error && <ErrorMessage message={error} />}
        </>
    )
}
export default Search;