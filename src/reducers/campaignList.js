import {
  CAMPAIGN_FAVORITED,
  CAMPAIGN_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case CAMPAIGN_FAVORITED:
    case CAMPAIGN_UNFAVORITED:
      return {
        ...state,
        campaigns: state.campaigns.map(campaign => {
          if (campaign.slug === action.payload.campaign.slug) {
            return {
              ...campaign,
              favorited: action.payload.campaign.favorited,
              favoritesCount: action.payload.campaign.favoritesCount
            };
          }
          return campaign;
        })
      };
    case SET_PAGE:
      return {
        ...state,
        campaigns: action.payload.campaigns,
        campaignsCount: action.payload.campaignsCount,
        currentPage: action.page
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        campaigns: action.payload.campaigns,
        campaignsCount: action.payload.campaignsCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        campaigns: action.payload[1].campaigns,
        campaignsCount: action.payload[1].campaignsCount,
        currentPage: 0,
        tab: action.tab
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        campaigns: action.payload.campaigns,
        campaignsCount: action.payload.campaignsCount,
        tab: action.tab,
        currentPage: 0,
        tag: null
      };
    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        campaigns: action.payload[1].campaigns,
        campaignsCount: action.payload[1].campaignsCount,
        currentPage: 0
      };
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
