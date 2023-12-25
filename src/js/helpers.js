export function setStructureToStorage(key, obj){
    const string = JSON.stringify(obj);
    localStorage.setItem(key, string);
}

export function getStructureFromStorage(key){
    return JSON.parse(localStorage.getItem(key));
}