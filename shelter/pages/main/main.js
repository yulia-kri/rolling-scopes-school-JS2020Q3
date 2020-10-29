const menuBtn = document.querySelector('.menu-btn');
const aboutShelterNavLink = document.querySelector('.nav li:nth-child(1) > a');
const navLinks = document.querySelector('.nav');
const slider = document.querySelector('.slider');
const petsSlide = document.querySelector('.slider-items');
const overlay = document.querySelector('.overlay');
const inactiveLinks = document.querySelectorAll('a.inactive');

let pets = [];
let index = 0;
let cardsPerPage = 1;

fetch('../pets.json')
    .then(res => res.json())
    .then(list => {
        pets = list;

        for (let i = pets.length; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * i);
            const randomElement = pets.splice(randomIndex, 1)[0];
            pets.push(randomElement);
        }

        checkCardsPerPage();
        displayPets(pets);

        const cards = Array.from(document.querySelectorAll('.card')).slice(index, index + cardsPerPage);
        showActiveCards(cards);
    })

function createPetCard(pet) {
    return `
        <div class="card" data-pet="${pet.name}">
            <img src="${pet.img}" alt="cat">
            <p class="card-title">${pet.name}</p>
            <button class="card-button">Learn more</button>
        </div>
    `;
}

function displayPets(petsList) {
    petsSlide.innerHTML = petsList.map(createPetCard).join('');
}

function showActiveCards(activeCards) {
    document.querySelectorAll('.card').forEach(card => card.classList.remove('active'));
    activeCards.forEach(card => card.classList.add('active'));
}

function checkCardsPerPage() {
    const width = document.querySelector('body').offsetWidth;

    if (width >= 1280) {
        cardsPerPage = 3;
    } else if (width < 1280 && width >= 768) {
        cardsPerPage = 2;
    } else if (width < 768) {
        cardsPerPage = 1;
    }
    
    return cardsPerPage;
}

let isMenuOpen = false;

function showMenu() {
    menuBtn.classList.add('open');
    navLinks.classList.add('active');
    overlay.classList.add('active');
    document.querySelector('.header-logo').classList.add('visually-hidden');
    document.querySelector('body').style.overflowY = 'hidden';
    isMenuOpen = true;
}

function hideMenu() {
    menuBtn.classList.remove('open');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('.header-logo').classList.remove('visually-hidden');
    document.querySelector('body').style.overflowY = '';
    isMenuOpen = false;
}

const modalWindow = {};
let isModalOpen = false;

modalWindow.init = function() {
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal');
    document.body.prepend(modalElement);

    const modal = {
        open() {
            modalElement.classList.add('active');
            overlay.classList.add('active');
            isModalOpen = true;
        },
        close() {
            modalElement.classList.remove('active');
            overlay.classList.remove('active');
            isModalOpen = false;
        }
    };
    
    modalElement.addEventListener('click', e => {
        if (e.target.classList.contains('close-btn')) {
            modal.close();
        }
    });

    return Object.assign(modal, {
        setContent(content) {
            modalElement.innerHTML = `
            <button class="close-btn">&times;</button>
            <div class="modal-image-block">
                <img src="${content.img}">
            </div>
            <div class="modal-text-block">
                <div class="modal-title">
                    <h3 class="header-3">${content.name}</h3>
                    <h4 class="header-4">${content.type} - ${content.breed}</h4>
                </div>
                <h5 class="header-5">${content.description}</h5>
                <ul class="modal-list">
                    <li class="header-5"><b>Age:</b> ${content.age}</li>
                    <li class="header-5"><b>Inoculations:</b> ${content.inoculations}</li>
                    <li class="header-5"><b>Diseases:</b> ${content.diseases}</li>
                    <li class="header-5"><b>Parasites:</b> ${content.parasites}</li>
                </ul>
            </div>
        `;
        }
    });
}

const petModal = modalWindow.init();

inactiveLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    })
})

aboutShelterNavLink.addEventListener('click', () => {
    window.scrollTo(0, 0);
    if (isMenuOpen) {
        hideMenu();
    }
})

slider.addEventListener('click', (e) => {
    const petCards = Array.from(document.querySelectorAll('.card'));
    const selectedPet = e.target.closest('.card');
    const prevButton = e.target.closest('.prev');
    const nextButton = e.target.closest('.next');

    if (e.target == nextButton) {
        checkCardsPerPage();

        if (cardsPerPage == 1 && index == petCards.length - cardsPerPage) {
            index = 0;
        } else if (cardsPerPage == 2 && (index == 6 || index == 7)) {
            index = 0;
        } else if (cardsPerPage == 3 && (index == 5 || index == 6 || index == 7)) {
            index = 0;
        } else {
            index = index + cardsPerPage;
        }
        const activeCards = petCards.slice(index, index + cardsPerPage);
        showActiveCards(activeCards);
    }

    if (e.target == prevButton) {
        checkCardsPerPage();

        if (cardsPerPage == 1) {
            if (index == 0) {
                index = petCards.length - cardsPerPage;
             } else {
                index = index - cardsPerPage;
             }
        } else if (cardsPerPage == 2) {
            if (index == 0 || index == 1) {
                index = petCards.length - cardsPerPage;
             } else {
                index = index - cardsPerPage;
             }
        } else {
            if (index == 0 || index == 1 || index == 2) {
                index = petCards.length - cardsPerPage + 1;
             } else {
                index = index - cardsPerPage;
             }
        }

        activeCards = petCards.slice(index, index + cardsPerPage);
        showActiveCards(activeCards);
    }

    if (selectedPet) {
        const petName = selectedPet.dataset.pet;
        const petInfo = pets.find(pet => pet.name == petName);
        petModal.setContent(petInfo);
        petModal.open();
    }
})

menuBtn.addEventListener('click', () => {
    isMenuOpen ? hideMenu() : showMenu();
})

overlay.addEventListener('click', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (isMenuOpen) {
        hideMenu();
    }
    if (isModalOpen) {
        petModal.close();
    }
})

window.addEventListener('resize', () => {
    checkCardsPerPage();
    const petCards = Array.from(document.querySelectorAll('.card'));
    const displayedCard = document.querySelector('.card.active').dataset.pet;
    const index = pets.findIndex(card => card.name == displayedCard);
    const activeCards = petCards.slice(index, index + cardsPerPage);
    showActiveCards(activeCards);
})
