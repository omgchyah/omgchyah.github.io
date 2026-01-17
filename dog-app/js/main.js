/* The old way of fetching data using Promises is shown below for reference:
fetch("https://dog.ceo/api/breeds/list/all") //This operation fetches the list of all dog breeds from the Dog CEO API in the background
    .then(function(response) {
        return response.json(); //This operation processes the response and converts it to JSON format
    }).then(function(data) {
        console.log(data); //This operation logs the fetched data to the console for debugging or inspection
    })*/

async function start() {
    const DOG_URL = "https://dog.ceo/api/breeds/list/all";
    const RANDOM_DOG_URL = "https://dog.ceo/api/breeds/image/random";

    try {
        const [breedData, RandomDogData] = await Promise.all([
            getJson(DOG_URL),
            getJson(RANDOM_DOG_URL)
        ]);

        createBreedList(breedData.message);
        createSlideshow([RandomDogData.message], "");

    } catch (error) {
        console.error("Error fetching dog breeds:", error);
    }
}

async function getJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

start();

function createBreedList(breedList) {
    document.getElementById("breed-list").innerHTML = `
    <select name="breed" id="breed" onchange="loadByBreed(this.value)">
        <option value="">-- Select a dog breed --</option>
        ${Object.keys(breedList).map(function(breed) {
            return `<option value="${breed}">${breed.at(0).toUpperCase() + breed.slice(1)}</option>`;
        }).join('')}
    </select>
    `;
}

async function loadByBreed(breed) {
    const DOG_BREED_URL = `https://dog.ceo/api/breed/${breed}/images`;
    if (breed) {
        try {
            const data = await getJson(DOG_BREED_URL);
        createSlideshow(data.message, breed);
        } catch (e) {
            console.error("Error fetching images for breed:", e);
        }
    }
}

function createSlideshow(images, breed) {
    const dogImageContainer = document.getElementById("image-placeholder");
    const dogImageElement = document.getElementById("dog-img");
    const randomIndex = Math.floor(Math.random() * images.length);
    
    dogImageContainer.classList.remove("is-ready");
    dogImageElement.classList.add("is-loading");

    dogImageElement.addEventListener("load", function() {
        dogImageElement.classList.remove("is-loading");
        dogImageContainer.classList.add("is-ready");
    });

    dogImageElement.src = images[randomIndex];
    dogImageElement.alt = `A cute ${breed || ""} dog`;
}



