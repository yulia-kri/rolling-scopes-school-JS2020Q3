const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav');
const ourPetsNavLink = document.querySelector('.nav li:nth-child(2) > a');
const overlay = document.querySelector('.overlay');
const petsContainer = document.getElementById('pets');
const pagination = document.querySelector('.navigation-buttons');
const currentPageNumber = document.querySelector('.nav-btn.current');
const firstBtn = document.querySelector('[data-btn="first"]');
const prevBtn = document.querySelector('[data-btn="prev"]');
const nextBtn = document.querySelector('[data-btn="next"]');
const lastBtn = document.querySelector('[data-btn="last"]');
const inactiveLinks = document.querySelectorAll('a.inactive');

let pets = [];
let fullPetsList = [];

let currentPage = 0;
let petsPerPage = 8;

fetch('../pets.json')
  .then(res => res.json())
  .then(list => {
    pets = list;

    fullPetsList = (() => {
        let tempArr = [];

        for (let i = 0; i < 6; i++) {
            const shuffledPets = pets;

            for (let j = pets.length; j > 0; j--) {
                const randomIndex = Math.floor(Math.random() * j);
                const randomElement = shuffledPets.splice(randomIndex, 1)[0];
                shuffledPets.push(randomElement);
            }

            tempArr = [...tempArr, ...shuffledPets];
        }
        return tempArr;
    })();

    fullPetsList = sortSixElements(fullPetsList);

    checkPetsPerPage();
    displayPets(fullPetsList, petsPerPage, currentPage);
  })


function sortSixElements(list) {
    const length = list.length;

    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6);

        for (let j = 0; j < 6; j++) {
            const duplicatedElement = stepList.find((item, index) => {
                return item.name == stepList[j].name && index != j;
            })

            if (duplicatedElement !== undefined) {
                const index = (i * 6) + j;
                const inWhichEight = Math.trunc(index / 8);

                const movedElement = list.splice(index, 1)[0];
                list.splice(inWhichEight * 8, 0, movedElement);

                sortSixElements(list);
            }
        }
    }

    return list;
}

function createPetCard(pet) {
    return `
        <div class="card" data-pet="${pet.name}">
            <img src="${pet.img}" alt="cat">
            <p class="card-title">${pet.name}</p>
            <button class="card-button">Learn more</button>
        </div>`;
}

function checkPetsPerPage() {
    const width = document.querySelector('body').offsetWidth;

    if (width >= 1280) {
        petsPerPage = 8;
    } else if (width < 1280 && width >= 768) {
        petsPerPage = 6;
    } else if (width < 768) {
        petsPerPage = 3;
    }
    
    return petsPerPage;
}

function displayPets(items, itemsPerPage, page) {
    petsContainer.innerHTML = '';

    let start = itemsPerPage * page;
    let end = start + itemsPerPage;
    let paginatedItems = items.slice(start, end);

    petsContainer.innerHTML = paginatedItems.map(createPetCard).join('');
}

function setupPagination(direction) {
    checkPetsPerPage();

    switch(direction) {
        case 'first':
            currentPage = 0;
            break;
        case 'prev':
            if (currentPage == 0) return;
            currentPage = currentPage - 1;
            break;
        case 'next':
            if (currentPage == (fullPetsList.length / petsPerPage - 1)) return;
            currentPage = currentPage + 1;
            break;
        case 'last':
            currentPage = fullPetsList.length / petsPerPage - 1;
            break;
        default:
            return;
    }

    paginationButtons();
    displayPets(fullPetsList, petsPerPage, currentPage);
}

function paginationButtons() {
    currentPageNumber.innerText = currentPage + 1;

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('inactive'));

    if (currentPage == 0) {
        firstBtn.classList.add('inactive');
        prevBtn.classList.add('inactive');
    }
    if (currentPage == fullPetsList.length / petsPerPage - 1) {
        lastBtn.classList.add('inactive');
        nextBtn.classList.add('inactive');
    }
}

pagination.addEventListener('click', (e) => {
    if (!e.target.classList.contains('nav-btn') || e.target.classList.contains('current')) return;
    const btn = e.target.dataset.btn;
    setupPagination(btn);
})

window.addEventListener('resize', () => {
    checkPetsPerPage();
    displayPets(fullPetsList, petsPerPage, currentPage);
})

let isMenuOpen = false;

function showMenu() {
    menuBtn.classList.add('open');
    navLinks.classList.add('active');
    overlay.classList.add('active');
    document.querySelector('.header-logo').classList.add('visually-hidden');
    document.querySelector('.header').style.background = 'none';
    document.querySelector('body').style.overflowY = 'hidden';
    isMenuOpen = true;
}

function hideMenu() {
    menuBtn.classList.remove('open');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('.header-logo').classList.remove('visually-hidden');
    document.querySelector('.header').style.background = 'var(--color-light-xl)';
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

ourPetsNavLink.addEventListener('click', () => {
    window.scrollTo(0, 0);
    if (isMenuOpen) {
        hideMenu();
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

petsContainer.addEventListener('click', (e) => {
    const selectedPet = e.target.closest('.card');
    if (!selectedPet) return;
    const petName = selectedPet.dataset.pet;
    const petInfo = pets.find(pet => pet.name == petName);
    petModal.setContent(petInfo);
    petModal.open();
});
