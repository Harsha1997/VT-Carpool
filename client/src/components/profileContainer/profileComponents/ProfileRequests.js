import React from 'react';
import PropTypes from 'prop-types';
import { rideType, userType} from '../../../types';
import styled from 'styled-components';

/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

const Detail = styled.div`
padding: 10px;
clear: both;
background: white;
box-shadow: 0 5px 15px rgba(0,0,0,0.4);
border-radius: 8px;
`;

const Description = styled.div`
`;


const Clear = styled.div`
clear: both;
`;


const Subtitle = styled.p`
font-weight:bold;
display: inline;
`;

export default class ProfileRequests extends React.Component {
  constructor(props) {
    super(props);

    console.log("In the ProfileRequests constructor");

    this.state = {
        currentDetail: null,
      };
  }


  setCurrent(currentID) {
    if (currentID === this.state.currentDetail) { // if the one that is clicked is already open
      this.setState({ currentDetail: null }); // close it by setting it to null
    } else {
      this.setState({ currentDetail: currentID });
    }
  }

  render() {
    console.log(this.props)
    // handle cancel a reservation
    return (
        <Detail>
          <Description>
            <Subtitle>
                Ride Request
            </Subtitle>
            </Description>
            <Description>
            <Subtitle>
              Time of Departure:
            </Subtitle> {this.props.rides.time}
          </Description>
          <Description>
            <Subtitle>
                From:
            </Subtitle> {this.props.rides.from}
          </Description>
          <Description>
            <Subtitle>
                To:
            </Subtitle> {this.props.rides.to}
          </Description>
          <Description>
            <Subtitle>
                Price:
            </Subtitle> ${this.props.rides.price}
          </Description>
          <Description>
            <Subtitle>
                Status:
            </Subtitle> {this.props.rides.requestStatus[this.props.user._id]}
          </Description>
        </Detail>
    );
  }
}

ProfileRequests.propTypes = {
  rides: PropTypes.arrayOf(rideType),
  type: PropTypes.string,
  user: userType,
  acceptRide: PropTypes.string,
  deleteRide: PropTypes.string,
};

ProfileRequests.defaultProps = {
  rides: [],
  type: 'request',
};
