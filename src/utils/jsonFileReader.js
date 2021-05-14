

export async function jsonFileReader( ) {
    const prev = await import("./json/prev.json");
    const prevList = prev.default['식당카페데이터_이전_복사'];

    const next = await import("./json/next.json");
    const nextList = next.default['Sheet1'];


    prevList.map(( prevItem ) => {
        
        nextList.filter(( nextItem ) => {
            console.log(prevItem);
            console.log(nextItem);
            if(prevItem['이름'] === nextItem.name){
                
            }
        });
    })
}