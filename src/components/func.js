
export function getKeybyValue(object,value,list2){
    let k =  Object.keys(object).filter(key=>object[key]===value)
   return k.filter(value => list2.includes(value));
}

export function getDefaultList(data,list1){
    let default_val = []
    list1.forEach(element => {
        default_val.push(data[element])

    });
    return default_val 
}
export function bool_update(parsed_object,key_list,value){
    key_list.forEach((element)=>{        
        parsed_object[element] = value    
    })
    return parsed_object
}

export function unselected(array1,array2){
    return array1.filter(function(obj) { return array2.indexOf(obj) == -1; });
}

export function val_update(parsed_object,field,value){
    parsed_object[field] = value
    console.log("From Function ",parsed_object)
    return parsed_object;
}

export function getKeybyValueGroup(object,value,param_object,parameter_list){
    let common_object = {}
    parameter_list.forEach(element => {
    //console.log(element)
    //console.log(param_object[element])

    let k =  Object.keys(object).filter(key=>object[key]===value)
    
    common_object[element] =  k.filter(value => Object.keys(param_object[element]).includes(value));
    });
    //console.log("Common Object",common_object)
    return common_object


}

export function isEmpty(obj){
    if(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) return true
    else return false
}
   

    
    
