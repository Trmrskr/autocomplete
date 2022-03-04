import {countries} from "./array.js";

/* The autoComplete function is to autopredict the input to a search field*/
const autoComplete = ( inp, countries) => {

    let currentFocus = -1;

    //Listens for inputs to the input field.
    inp.addEventListener("input", (evt) => {
        let val = evt.target.value;

        //Closes opened lists if any anytime an input is entered into autocomplete list
        closeListItems();

        if(!val)
            return false;
        //Creates a List container and sets id and class.
        const autoComLists = document.createElement("div");
        autoComLists.setAttribute("id", "autocomplete-lists");
        autoComLists.setAttribute("class", "autocomplete-items");

        /*
        * Below is a chain of array filter, map methods and forEach iterator
        * The filter method gets all array contents which starts with the input value by comparing
        * The map wraps the output of the filter function in a div tag
        * The forEach iterator is used to append each of the output of the map method to the list container
        */
        countries.filter((country) => {
            //return array content that starts with input value
            if(country.toUpperCase().startsWith(val.toUpperCase()))
                return country;
            
        }).map((country) => {
            const autoComChild = document.createElement('div');
            //makes matching input values bold
            autoComChild.innerHTML = "<strong>" + country.substr(0, val.length) + "</strong>" + country.substr(val.length);
            autoComChild.addEventListener("click", (e) => {
                inp.value = e.target.textContent;
                closeListItems();
            });
            return autoComChild;
        }).forEach((country) => {
            autoComLists.appendChild(country);
        });

        evt.target.parentNode.appendChild(autoComLists);
    });

    //For scrolling down the autocomplete dropdown.
    inp.addEventListener("keydown", (evt) => {

        //get the element with id autocomplete-lists.
        let x = document.getElementById("autocomplete-lists");
        //if it exists, get all div element within it.
        if(x)
            x = x.getElementsByTagName("div");
        
        //set currentFocus = -1, if there is no character in the input field.
        if(inp.value.length < 1){
            currentFocus = -1;
        }
        //on Arrowdown & up move blue focus down & up respectively.
        if(evt.key == "ArrowDown"){
            currentFocus++;
            currentFocus = currentActiveCheck(x, currentFocus);
            removeActiveItem(x);
            x[currentFocus].classList.add("autocomplete-active");
        }
        else if(evt.key == "ArrowUp"){  //Others: ArrowLeft & ArrowRight
            currentFocus--;
            currentFocus = currentActiveCheck(x, currentFocus);
            removeActiveItem(x);
            x[currentFocus].classList.add("autocomplete-active");
        }
        else if(evt.key == "Enter"){
            //prevent default on enter.
            evt.preventDefault();
        }
    });

}

const closeListItems = () => {
    //Note, use try and catch to catch typeErrors and others.
    const autoComList = document.getElementsByClassName("autocomplete-items");
    let i;
    for(i = 0; i < autoComList.length; i++){
        autoComList[i].parentNode.removeChild(autoComList[i]);
    }
}

 const currentActiveCheck = (x, currentFocus) => {
    
    if(currentFocus >= x.length)
        currentFocus = 0;
    else if(currentFocus < 0)
        currentFocus = x.length - 1;

    return currentFocus;
}

const removeActiveItem = (x) => {
    let i;
    for(i = 0; i < x.length; i++)
        x[i].classList.remove("autocomplete-active");
}

const inpt = document.getElementById("place-input");
autoComplete( inpt, countries);

document.addEventListener("click", () => {
    closeListItems();
});