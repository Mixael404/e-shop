export function setStructureToStorage(key, obj){
    const string = JSON.stringify(obj);
    localStorage.setItem(key, string);
}

export function getStructureFromStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

export function createElement(tag, className, content, wrapper, id){
    const element = document.createElement(tag);
    if(className){
        element.classList.add(className);
    }
    if(id){
        element.id = id;
    }
    element.textContent = content;
    wrapper.append(element);
    return element;
}