/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Leonard Bennett Crantford
For Exceeds Expectations
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
/* `showPage` will create and insert(append) li elements
/* derived from an array of objects each representing a single 
/* student grouped by a maximum of 9 per page
/* @@param list type array of objects
/* @@param page type number
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
/* `addPagination` will create and insert(append) li button elements used
/* for pagination control in viewing pages of studens. The number of buttons
/* calculated/created is dependant on the length of the passed list. The
/* current page's button's class is set to highlight the current page.
/* An eventListener is created on the UL element containing the page buttons.
/* The eventListener will call `showPage` passing the current list and the
/* new button's target.
/* @@param list type array of objects
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
/* For Exceeds Expectations
/* `addFilterList will create and insert input search elements for the user.
/* 2 means of submission elements are created: an input field and a button/image.
/* Contained in `addFilterList` is `execSearch,` used to execute user search and
/* the 2 addEventListeners which will call `execSearch.` 
/* @@param list type array of objects
***/
function addFilterList(list) {
  const header = document.querySelector('header');
  header.insertAdjacentHTML('beforeend', `
  <label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`);
  /***
   * For Exceeds Expectations `execSearch`
   * `execSearch` will search the student list First Name Last Name string
   * entries against user input from the elements created by `addFilterList
   * for match. Matched student list objects will be sent to `showPage` and
   * `addPagination` for rendering.
  /* `execSearch` is called by 2 eventListener's each via different event('click', 'keyup')
  ***/
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

// Initial call functions
showPage(data,1);
addPagination(data);
addFilterList(data);