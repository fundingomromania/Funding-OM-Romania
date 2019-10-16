import CampaignList from '../CampaignList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Campaigns.feed, agent.Campaigns.feed());
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};



const GlobalFeedTab = props => {
  this.clickTab = React.createRef();
  this.clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Campaigns.all, agent.Campaigns.all());
  };
 
  return (
    <li className="nav-item">
      <a href=""
        className={ 'nav-link active'}
        ref={this.clickTab}
        onClick={this.clickHandler}>
        Explore campaigns
      </a>
    </li>
  );

};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  ...state.campaignList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <GlobalFeedTab tab={props.tab} ref={this.clickTab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />

        </ul>
      </div>

      <CampaignList
        pager={props.pager}
        campaigns={props.campaigns}
        loading={props.loading}
        campaignsCount={props.campaignsCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
