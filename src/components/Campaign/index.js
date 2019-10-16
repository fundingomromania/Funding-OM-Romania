import CampaignMeta from './CampaignMeta';
// import CommentContainer from './CommentContainer';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton} from 'react-share';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import { CAMPAIGN_PAGE_LOADED, 
         CAMPAIGN_PAGE_UNLOADED, 
         CAMPAIGN_SUBMITTED, 
         UPDATE_FIELD_EDITOR } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.campaign,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: CAMPAIGN_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: CAMPAIGN_PAGE_UNLOADED }),
  onSubmit: payload =>
    dispatch({ type: CAMPAIGN_SUBMITTED, payload }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    position              : 'absolute'
  }
};

Modal.setAppElement('#root');

class Campaign extends React.Component {

  constructor() {
    super();

    // const updateFieldEvent =
    //   key => ev => this.props.onUpdateField(key, ev.target.value);
    // this.changeTotalDonations = updateFieldEvent('totalDonations');
    // this.changeDonationsNumber = updateFieldEvent('donationsNumber');
   
    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    };

    this.submitForm = () => {
      
      this.setState({ body: '' });
      const campaign = {
        title: this.props.campaign.title,
        paypalAddress: this.props.campaign.paypalAddress,
        totalDonations: this.props.campaign.totalDonations + Number(this.state.body),
        donationsNumber: this.props.campaign.donationsNumber + 1,
        campaignDonationsTarget: this.props.campaign.campaignDonationsTarget,
        body: this.props.campaign.body,
        tagList: this.props.campaign.tagList
      };
      
      const slug = { slug: this.props.campaign.slug };
      const promise = agent.Campaigns.update(Object.assign(campaign, slug));
  
      this.props.onSubmit(promise);
    };

    this.state = {
      modalIsOpen: false,
      body: ''
    };
    
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Campaigns.get(this.props.match.params.id),
      agent.Comments.forCampaign(this.props.match.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  } 

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    if (!this.props.campaign) {
      return null;
    }

    const markup = { __html: marked(this.props.campaign.body, { sanitize: true }) };
    const shareUrl = this.props.location.pathname;
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.campaign.author.username;
    return (
      <div className="campaign-page">

        <div>
          <div className="container">

            <h1 className="campaignTitle">{this.props.campaign.title}</h1>
            <CampaignMeta
              campaign={this.props.campaign}
              canModify={canModify} />
            
          </div>
        </div>

        <div className="container page">

          <div className="campaign-content">
            <div className="row top">
                <div className="donation-img col-md-6 col-xs-12"> 
                </div>
                <div className="donation-details col-md-6 col-xs-12">
                  <div className="donation-amount">
                    <div className="row">
                      <div className="col-md-12">
                           <p className="amount">{this.props.campaign.totalDonations.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}€</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                          <p className="out-off">donated of {this.props.campaign.campaignDonationsTarget.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}€ goal</p>
                      </div>
                    </div>
                  </div>
                  <div className="donation-time">
                    <div className="row">
                      <div className="col-md-6 donations">
                          <div className="row ">
                            <div className="col-xs-12">
                               <p className="donations-number">{this.props.campaign.donationsNumber}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xs-12">
                                <p className="text-under">donations</p>
                            </div>
                          </div>
                      </div>
                      <div className="days col-md-6">
                          <div className="row">
                            <div className="col-xs-12">
                               <p className="days-number">12</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xs-12">
                                <p className="text-under">days left</p>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 donationBtnContainer">
                    <button className="button pagination-centered donate-button" onClick={this.openModal}>Donate for this campaign</button>
                    <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Payment Modal"
                    >
                        <h2 ref={subtitle => this.subtitle = subtitle}>Donate to campaign</h2>
                        <a onClick={this.closeModal} className="close"></a>

                        <p className="modalDonationText">Support <b>{this.props.campaign.title}</b> campaign through your gift of good will.</p>
                        <fieldset className="form-group">
                            <input
                              className="form-control inputDonationAmount"
                              type="number"
                              placeholder="Donation amount"
                              value={this.state.body}
                              onChange={this.setBody}/>
                        </fieldset>
                        <form className="form-paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                          <input type="hidden" name="cmd" defaultValue="_donations" />
                          <input type="hidden" name="business" defaultValue={this.props.campaign.paypalAddress} />
                          <input type="hidden" name="currency_code" defaultValue="EUR" />
                          <button className="button pagination-centered donateButtonRedirect" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" onClick={this.submitForm} > Continue </button>
                        </form> 
                  </Modal>
                    </div> 
                  </div>
                  <div className="row">
                    <div className="share col-md-12">
                      <p> Share it on: <FacebookShareButton className="facebook" url={shareUrl}><i className="fab fa-facebook-f" aria-hidden="true" /></FacebookShareButton> <TwitterShareButton className="twitter" url={shareUrl}><i className="fab fa-twitter" aria-hidden="true" /></TwitterShareButton> <WhatsappShareButton className="whatsapp" url={shareUrl}><i className="fab fa-whatsapp" aria-hidden="true" /></WhatsappShareButton> </p>
                    </div>
                  </div>
                </div>
            </div>
          <div className="row">
              <div className="col-xs-12">

                  <div dangerouslySetInnerHTML={markup}></div>
                  
              </div> 
            
          </div>

          <hr />
        </div>
      </div>
    </div>  
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
