"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show favorite stories */

function navFavoriteStories(evt) {
  console.debug("navFavoriteStories", evt);
  hidePageComponents();
  putFavoritesOnPage();
}

$body.on("click", "#nav-favorites", navFavoriteStories);

/** Show own stories */

function navOwnStories(evt) {
  console.debug("navOwnStories", evt);
  hidePageComponents();
  putUserStoriesOnPage(currentUser);
}

$body.on("click", "#nav-own-stories", navOwnStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navAddStory.show();
  $("#nav-favorites").show();
  $("#nav-own-stories").show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navAddStoryClick(evt) {
  console.debug("navAddStoryClick", evt);
  $addStoryForm.show();
}

$navAddStory.on("click", navAddStoryClick);
