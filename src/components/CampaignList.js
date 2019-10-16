import CampaignPreview from './CampaignPreview';
import ListPagination from './ListPagination';
import React from 'react';

const CampaignList = props => {
  if (!props.campaigns) {
    return (
      <div className="campaign-preview">Loading...</div>
    );
  }

  if (props.campaigns.length === 0) {
    return (
      <div className="campaign-preview">
        No campaigns are here... yet. 
      </div>
    );
  }

  return (
    <div>
      {
        props.campaigns.map(campaign => {
          return (
            <CampaignPreview campaign={campaign} key={campaign.slug} />
          );
        })
      }

      <ListPagination
        pager={props.pager}
        campaignsCount={props.campaignsCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default CampaignList;
