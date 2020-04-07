const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../config/auth");
const mainController = require("../controllers/mainController");
const discController = require("../controllers/discussionController");

router.get("/", ensureAuth, (req, res) => {
  res.redirect("/home");
});

router.get(
  "/home",
  ensureAuth,
  mainController.getHome,
  discController.resetOffset,
  discController.getLatestDiscussion,
  discController.formatDatetime,
  discController.getUserImages,
  discController.getNumOfReplies,
  discController.getReplies,
  discController.loadLatestDiscussions
);

/***** PROFILE BEGIN *****/
//router.get("/profile/:userId", ensureAuth, mainController.getProfile);

router.get(
  "/profile/:userId",
  ensureAuth,
  mainController.getProfile,
  discController.getNumOfReplies,
  discController.getReplies,
  mainController.loadProfile
);

router.get("/profile/:userId/edit", ensureAuth, mainController.getEditProfile);

router.post(
  "/edit",
  ensureAuth,
  mainController.edit,
  mainController.getHome,
  discController.resetOffset,
  discController.getLatestDiscussion,
  discController.formatDatetime,
  discController.getUserImages,
  discController.getNumOfReplies,
  discController.loadLatestDiscussions
);
/***** PROFILE END *****/

/***** SEARCH BEGIN *****/
router.post(
  "/search",
  ensureAuth,
  mainController.search,
  mainController.displaySearch
);

router.post(
  "/searchDiscussion",
  ensureAuth,
  mainController.getHome,
  discController.resetOffsetForSearch,
  discController.getLatestTopic,
  discController.formatDatetime,
  discController.getUserImages,
  discController.getNumOfReplies,
  discController.loadLatestDiscussions
);
/***** SEARCH END *****/

/***** PAGINATION BEGIN *****/
router.get(
  "/nextPage",
  ensureAuth,
  mainController.getHome,
  discController.incrementOffset,
  discController.getLatestDiscussion,
  discController.formatDatetime,
  discController.getUserImages,
  discController.getNumOfReplies,
  discController.getReplies,
  discController.loadLatestDiscussions
);

router.get(
  "/previousPage",
  ensureAuth,
  mainController.getHome,
  discController.decrementOffset,
  discController.getLatestDiscussion,
  discController.formatDatetime,
  discController.getUserImages,
  discController.getNumOfReplies,
  discController.getReplies,
  discController.loadLatestDiscussions
);

router.get(
  "/nextPageFiltered",
  ensureAuth,
  mainController.getHome,
  discController.incrementOffsetForSearch,
  discController.getLatestTopic,
  discController.formatDatetime,
  discController.getUserImages,
  discController.getNumOfReplies,
  discController.loadLatestDiscussions
);

router.get(
  "/previousPageFiltered",
  ensureAuth,
  mainController.getHome,
  discController.decrementOffsetForSearch,
  discController.getLatestTopic,
  discController.formatDatetime,
  discController.getUserImages,
  discController.getNumOfReplies,
  discController.loadLatestDiscussions
);

router.post('/profile/like',ensureAuth, mainController.likeProfile)

module.exports = router;


/***** PAGINATION END *****/

module.exports = router;
