const EmojiName = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

const emojiNames = Object.values(EmojiName);

const FilterType = {
  ALL: `All`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

const NavigationItem = {
  FILTER: `filter`,
  STATISTIC: `statistic`,
};

const StatisticFilterType = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const StatisticFilterTypes = Object.values(StatisticFilterType);

const SHAKE_ANIMATION_TIMEOUT = 600;

export {emojiNames, FilterType, StatisticFilterType, StatisticFilterTypes, NavigationItem, SHAKE_ANIMATION_TIMEOUT};
