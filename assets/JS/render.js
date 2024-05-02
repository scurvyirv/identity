// THIS WAS MY FIRST ATTEMPT AT RENDERING from local storage and creating cards
    //i think we are targeting the wrong element with our query selector
    let cardTitle = document.querySelector('.card-title');
    let cardDueDate = document.querySelector('.card-header');
    let cardDescription = document.querySelector('.card-text');
    let cardContainer = document.querySelector('.card-container'); //this is the container that holds the entire card

    // RENDER objects from JSON into the UI
    let localCardData;
    // this PARSE function receives the JSON objects from local storage
    function renderedCardData() {

    // attempt to get data from localstorage and setting it to 'localCardData'
    localCardData = JSON.parse(localStorage.getItem('tasks'));

    // console.log("this is the local data", localCardData);
    //THIS IS WHAT YOU REPEAT to loop and attach CSS
    for (let cardDatum of localCardData) {
        console.log(cardDatum.content); 
        //let's put HTML and style it with CSS here.
        console.log(cardDatum);

    // this CREATES elements (h3, div, article) and then SETS ATTRIBUTES to it that corresponds to the HTML
        let divTag1 = document.createElement(`div`); //outer container 
        divTag1.setAttribute('class', 'card-container');

        let divTag2 = document.createElement(`div`);
        divTag2.setAttribute('class', 'card'); 
        
        let divTag3 = document.createElement(`div`); //this is where task name goes
        divTag3.setAttribute('class', 'card-title');

        let divTag4 = document.createElement(`div`);
        divTag4.setAttribute('class','card-body');

        let h5Tag = document.createElement(`h5`);//this is where due date goes
        h5Tag.setAttribute('class','card-header');

        let pTag = document.createElement(`p`); //this is where description goes
        pTag.setAttribute('class','card-text');

        let aTag = document.createElement('a'); // CHECK THIS for button a href...
        aTag.setAttribute('class', 'btn-warning');

    //APPENDING the elements 
        // Append the card container tag to the body
        document.body.appendChild(divTag1);

        //Append the card to the card container
        divTag1.appendChild(divTag2);

        // Append the card title (task name) to the card
        divTag2.appendChild(divTag3);

        // Append the card body to the card
        divTag2.appendChild(divTag4);

        // Append the card header (due date) to the card body
        divTag4.appendChild(h5Tag);

        // Append the card text (description) to the card body
        divTag4.appendChild(pTag);

        // CHECK THIS Append the a tag button to the card body
        divTag4.appendChild(aTag);

        //This is TEXT that comes from input 'cardDatum'
        divTag3.textContent = `${cardDatum.title}`;
        h5Tag.textContent = `${cardDatum.date}`;
        pTag.textContent = `${cardDatum.description}`;

    }
  }

  renderedCardData();


}
