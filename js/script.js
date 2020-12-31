/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
"use strict";
let itemsPerPage = 9;
const studentList = document.querySelector('.student-list');
const linkListUL = document.querySelector('.link-list');


/***
/* Create the `showPage` function
/* This function will create and insert/append the elements needed to display a
/* "page" of nine /students
***/
function showPage(list, page) {
  let startIndx = (page * itemsPerPage) - itemsPerPage;
  let endIndx = ((page * itemsPerPage) > list.length)? list.length: page * itemsPerPage;
  studentList.innerHTML = '';
  for(let i = startIndx; i < endIndx; i++) {
    studentList.insertAdjacentHTML('beforeend', `
    <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${list[i].picture.large}">
        <h3>${list[i].name.first} ${list[i].name.last}</h3>
        <span class="email">${list[i].email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${list[i].registered.date}</span>
      </div>
    </li>`);
  }
}

/***
/* Create the `addPagination` function
/* This function will create and insert/append the elements needed for the pagination buttons
***/

function addPagination(list) {
  const totalPages = Math.ceil(list.length / itemsPerPage);
  linkListUL.innerHTML = '';
  for(let i = 1; i <= totalPages; i++) {
    linkListUL.insertAdjacentHTML('beforeend', `
    <li>
      <button type="button">${i}</button>
    </li>`);
  }
  const linkListBtns = document.querySelectorAll('ul button');
  linkListBtns[0].className = 'active';
  linkListUL.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
      for(let i = 0; i < linkListBtns.length; i++) {
        linkListBtns[i].className = (e.target === linkListBtns[i])
          ? 'active'
          : '';
      }
      showPage(list, parseInt(e.target.textContent));
    }
  });
}

/***
 * For Exceeds Expectations
 *
 ***/

function addFilterList(list) {
  const header = document.querySelector('header');
  header.insertAdjacentHTML('beforeend', `
  <label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`);

  function execSearch() {
    const search = document.querySelector('#search').value;
    if(search.length === 0) showPage(data,1);
    const filteredList = list.filter((v) => 
      `${v.name.first} ${v.name.last}`.toLowerCase().includes(search.toLowerCase())
    );
    if(filteredList.length > 0) {
      showPage(filteredList, 1);
      addPagination(filteredList);
    } else {
        studentList.innerHTML = '';
        studentList.insertAdjacentHTML('beforeend', `
        <li class="no-results">No results found</li>`);
        linkListUL.innerHTML = '';
    }
  } 
  
  document.querySelector('#search').addEventListener('keyup', execSearch);
  document.querySelector('input + button').addEventListener('click', execSearch)
}

// Call functions
showPage(data,1);
addPagination(data);
addFilterList(data);
