export function compare_one_layer(obj1:any,obj2:any):boolean{
    if(Object.keys(obj1).length!=Object.keys(obj2).length)
    {
        return false
    }
    for(const key in obj1){
        if(obj1[key]!=obj2[key]){
            return false
        }
    }
    return true
}