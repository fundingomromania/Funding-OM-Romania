import { Link } from 'react-router-dom';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { DELETE_CAMPAIGN } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_CAMPAIGN, payload })
});

const CampaignActions = props => {
  const campaign = props.campaign;
  const del = () => {
    props.onClickDelete(agent.Campaigns.del(campaign.slug))
  };
  if (props.canModify) {
    return (
      <div className="row">
        <div className="col-md-12">
            <span className="containerEditDelCampaign">
              <Link
                to={`/editor/${campaign.slug}`}
                className="btn btn-outline-secondary btn-sm">
                <i className="ion-edit"></i> Edit Campaign
              </Link>

              <button className="btn btn-outline-danger btn-sm" onClick={del}>
                <i className="ion-trash-a"></i> Delete Campaign
              </button>
              
            </span>
        </div>
      </div>
    
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(CampaignActions);
