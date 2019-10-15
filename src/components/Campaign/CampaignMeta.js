import CampaignActions from './CampaignActions';
import { Link } from 'react-router-dom';
import React from 'react';

const CampaignMeta = props => {
  const campaign = props.campaign;
  return (
    <div className="campaign-meta">

        <Link to={`/@${campaign.author.username}`}>
          <img className="imgProfile" src={campaign.author.image} alt={campaign.author.username} />
        </Link>
      <div className="info">
        <Link to={`/@${campaign.author.username}`} className="author">
          {campaign.author.username}
        </Link>
        <span className="date">
          {new Date(campaign.createdAt).toDateString()}
        </span>
      </div>

      <CampaignActions canModify={props.canModify} campaign={campaign} />
    </div>
  );
};

export default CampaignMeta;
