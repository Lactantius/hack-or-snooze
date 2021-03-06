"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        ${story.isOwn() ? '<button class="delete-story-btn">X</button>' : ""}
        <input type="checkbox" class="favorite-checkbox" id="${
          story.storyId
        }" ${story.isFavorite() ? "checked" : ""} />
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $allStoriesList.empty();

  currentUser.favorites.forEach(function (story) {
    $allStoriesList.append(generateStoryMarkup(story));
  });

  $allStoriesList.show();
}

function putUserStoriesOnPage(user) {
  console.debug("putUserStoriesOnPage");

  $allStoriesList.empty();

  user.ownStories.forEach((story) =>
    $allStoriesList.append(generateStoryMarkup(story))
  );

  $allStoriesList.show();
}

/** For adding new stories */

async function submitNewStory() {
  const title = $("#input-story-title").val();
  const author = $("#input-story-author").val();
  const url = $("#input-story-url").val();

  $addStoryForm.hide();
  await storyList.addStory(currentUser, { title, author, url });
  storyList = await StoryList.getStories();
  putStoriesOnPage();
  $addStoryForm.val("");
}

$addStoryForm.on("submit", (evt) => {
  evt.preventDefault();
  submitNewStory();
});

$("#cancel-submit-btn").on("click", () => $addStoryForm.hide());

/** Favorites and deleting */

$allStoriesList.on("click", ".favorite-checkbox", function () {
  const id = $(this).parent().attr("id");
  const story = storyList.getStoryById(id);
  story.isFavorite()
    ? currentUser.removeFavorite(story)
    : currentUser.addFavorite(story);
});

$allStoriesList.on("click", ".delete-story-btn", function () {
  const id = $(this).parent().attr("id");
  const story = storyList.getStoryById(id);
  storyList.deleteStory(currentUser, story);
  $(this).parent().remove();
});
