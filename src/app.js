// Riot API
const riotKey = 'api_key=RGAPI-e95c7f02-a2a8-4fe2-94f6-ad44e3de89e8';
const sp = '%20';

const enteredName = document.querySelector("#input-text");
const postButton = document.querySelector("#post-button");
const getButton = document.querySelector("#get-button");

const responseInfo = document.querySelector("#response-info");

let champList = {};
let myChamplist = {};

const myChamps = document.querySelector("#my-champs");
const allChamps = document.querySelector("#all-champs");

let addedChamps = {
    "myChamps": [
        27,
        41,
        53,
        55,
        69
    ]
};

const init = () => {
    getChampList();
    
    const addUser = (e) => {
      e.preventDefault();
      sendPost(postButton);
      return false;
    }

    const getUsers = (e) => {
        e.preventDefault();
        requestUpdate(getButton);
        return false;
      }

    getChampInfo(1);
    
    postButton.addEventListener('click', addUser);
    getButton.addEventListener('click', getUsers);
};

window.onload = init;

/*
if (enteredName)
{
    enteredName.addEventListener('keyup', (e) => {
        if (e.keyCode === 13)
        {
            e.preventDefault();
            enterButton.click();
        }
    });
}
*/

const handleResponse = async (response, parseResponse) => {
    //Based on the status code, display something
    switch(response.status) {
      case 200:
        responseInfo.innerHTML = 'Success';
        break;
      case 201:
        responseInfo.innerHTML = 'Created';
        break;
      case 204:
        responseInfo.innerHTML = 'Updated';
        return;
      case 400:
        responseInfo.innerHTML = 'Bad Request';
        break;
      default:
        responseInfo.innerHTML = `Error code not implemented by client.`;
        break;
    }

    if (parseResponse) {
        let obj = await response.json();

        myChamplist = {};

        myChamplist = obj['champs'][enteredName.value];

        let champArray = myChamplist.champs;

        let realArray = [];

        realArray = champArray.split(',');

        console.log(realArray);
        console.log(realArray[0]);

        myChamps.innerHTML = '';

        for (let i = 0; i < realArray.length; i++)
        {
            myChamps.innerHTML = myChamps.innerHTML + `<match-info class="removeChamp" id="match-${i}"></match-info><button class="button is-dark is-medium remove-champ">Remove</button>`;
        }

        let allMyChamps = document.querySelectorAll('.removeChamp');

        allMyChamps.forEach((item, index) => {
            fillMatchData(champList, realArray[index], item).then();
        });
        
        //let jsonString = JSON.stringify(obj);
        //console.log(jsonString);
    }
};

async function getChampList()
{
    let link = `https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json`;
    let response = await fetch(link);
    const champData = await response.json();

    champList = champData['data'];

    let length = Object.keys(champList).length;

    for (let i = 0; i < length; i++)
    {
        allChamps.innerHTML = allChamps.innerHTML + `<match-info id="match-${i}"></match-info><button class="button is-dark is-medium add-champ" id='${i}' onClick="addChamp(this.id)">Add</button>`;
    }

    let allMatches = document.querySelectorAll('match-info');

    allMatches.forEach((item, index) => {
        fillMatchData(champList, index, item).then();
    });
}

async function fillMatchData(champList, index, matchBar)
{
    
    let key = Object.keys(champList).at(index);
    let champ = champList[key];
    let img = `https://opgg-static.akamaized.net/images/lol/champion/${champ.name}.png?image=c_scale,q_auto,w_46&v=1633482212`;
        
    matchBar.imgSource = img;
    matchBar.champName = `${champ.name}`;
    matchBar.championTitle = `${champ.title}`;
    matchBar.render();
}

function getChampInfo(id)
{
    Object.keys(champList).forEach((champ) => {
        if (champList[champ]['key'] == id)
        {
            return champList[champ]['name'];
        }
    });
}

const sendPost = async (nameForm) => {
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');

    //Build a data string in the FORM-URLENCODED format.
    const formData = `id=${enteredName.value}&champs=${addedChamps["myChamps"]}`;

    //Make a fetch request and await a response. Set the method to
    //the one provided by the form (POST). Set the headers. Content-Type
    //is the type of data we are sending. Accept is the data we would like
    //in response. Then add our FORM-URLENCODED string as the body of the request.
    let response = await fetch(nameAction, {
      method: nameMethod,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData,
    });

    handleResponse(response, false);
};

const requestUpdate = async (nameForm) => {
    //Grab the url and method from the html form below
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');
    
    //Await our fetch response. Go to the URL, use the right method, and attach the headers.
    let response = await fetch(nameAction, {
      method: nameMethod,
      headers: {
          'Accept': 'application/json'
      },
    });

    //Once we have our response, send it into handle response. The second parameter is a boolean
    //that says if we should parse the response or not. We will get a response to parse on get
    //requests so we can do an inline boolean check, which will return a true or false to pass in.
    handleResponse(response, nameMethod === 'get');
};
