/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import cookie from 'react-cookies';
import RideSummary from '../RideSummary';
// import { colors } from '../css/colors';

const Detail = styled.div`
padding: 10px;
clear: both;
background: white;
box-shadow: 0 5px 15px rgba(0,0,0,0.4);
border-radius: 8px;
`;

const RightColumn = styled.div`
float: left;
width: 60%
`;

const LeftColumn = styled.div`
float: left;
width: 200px;
text-align: center;
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




function RideDetailRequest(props) {
  const ride = {
    date: props.date,
    from: props.from,
    fromgeo: props.fromgeo,
    fulfilled: props.fulfilled,
    notes: props.notes,
    passengers: props.passengers,
    price: props.price,
    seats_avail: props.seats_avail,
    studentID: props.studentID,
    time: props.time,
    to: props.to,
    togeo: props.togeo,
    type: props.type,
    user: props.user,
    _id: props._id, // eslint-disable-line no-underscore-dangle
  };

  const reserveSeat = (
    props.fulfilled ||
    props.passengers.includes(cookie.load('userId')) ||
    props.cuser._id === cookie.load('userId') // eslint-disable-line no-underscore-dangle
  );

  const fulfillSeat = (
    props.fulfilled ||
    props.cuser._id === cookie.load('userId') // eslint-disable-line no-underscore-dangle
  );

  let reserveButton;
  if (props.type === 'request') {
    reserveButton = (<input
      type="button"
      disabled={fulfillSeat}
      value="Fulfill Request"
       // Request.js
      onClick={() => props.history.push(`/new/ride/offer/${props._id}`)} // eslint-disable-line no-underscore-dangle
    />);
  } else {
    reserveButton = (<input
      type="button"
      disabled={reserveSeat}
      value="Request a Seat"
      onClick={() => props.history.push({
       pathname: `/reserve/${cookie.load('userId')}`, // ReserveRide.js
       state: { detail: ride, rideUser: props.cuser },
     })}


    />);
  }
  let contactValue = 'Contact Driver';
  if (props.type === 'request') {
    contactValue = 'Contact Passenger';
  }

  const contactButton = (<input
    type="button"
    value={contactValue}
    disabled={props.cuser._id === cookie.load('userId')} // eslint-disable-line no-underscore-dangle
    onClick={() => props.history.push({
     pathname: `/contact/${cookie.load('userId')}`, // ContactDriver.js
     state: { detail: ride, rideUser: props.cuser },
   })}

  />);

  let deleteButton;
  let deleteValue = 'Delete Your Offer';
  if (props.type === 'request') {
    deleteValue = 'Delete Your Request';
  }
  let editButton;
  if (props.user === cookie.load('userId')) {
    deleteButton = (<input
      type="button"
      value={deleteValue}
      onClick={() => props.deleteRide(props._id)} // eslint-disable-line no-underscore-dangle
    />);
    editButton = (<input
      type="button"
      value="Edit"
      // Request.js
      onClick={() => props.history.push(`/edit/ride/offer/${props._id}`)} // eslint-disable-line no-underscore-dangle
    />);
  } else {
    deleteButton = (<div />);
    editButton = (<div />);
  }

  let removeSeat;
  if (ride.passengers.indexOf(cookie.load('userId')) > -1 && ride.type === 'offer') {
    const newRide = ride;
    newRide.passengers = ride.passengers.filter(passenger =>
      ride.passengers.indexOf(passenger) <= -1);
    if (ride.seats_avail === 0) {
      // makes reserve seat button available again
      newRide.fulfilled = false;
    }
    newRide.seats_avail = ride.seats_avail + 1;
    removeSeat = (<input
      type="button"
      value="Cancel Seat Reservation"
      onClick={() => props.cancelReservation(newRide)} // eslint-disable-line no-underscore-dangle
    />);
  } else {
    removeSeat = (<div />);
  }

  let buttons = (<div> {reserveButton} {contactButton}</div>);
  if (props.profileMode) {
    buttons = (<div />);
  }

  let leftColumn = (
    <LeftColumn>
      <br />
      <Avatar
        name={props.cuser.name}
        round
        // eslint-disable-next-line no-underscore-dangle
        onClick={() => props.history.push(`/viewprofile/${props.cuser._id}/info`)} // ProfileRead.js
      />
      <Description> {props.cuser.name} </Description>
    </LeftColumn>
  );

  // user doesn't need capability to view their own profile when viewing their rides
  if (props.profileMode) {
    leftColumn = (
      <LeftColumn>
        <br />
        <Avatar
          name={props.cuser.name}
          round
        />
        <Description> {props.cuser.name} </Description>
      </LeftColumn>
    );
  }
  let userRides = null
  console.log(props.user);
  console.log(cookie.load('userId'));
  if(props.user == cookie.load('userId')){
    userRides = props;
  }
  let passengersRequested;
  console.log(userRides);
  if(userRides!= null && userRides.passengersRequested.length>0){
    passengersRequested = (
        userRides.passengersRequested.map( passengers =>
        <div style={{paddingLeft:"200px",paddingTop:"50px"}}>
            <hr style={{ width: '100%', margin: '5px 50% 5px 0px' }} />
            <Clear/>
            
            <p><span style={{fontWeight:"bold"}} >Requester Name: </span>{passengers.name}</p>
            
            <Clear/>
            <input type = "button" value= "Accept Ride" onClick={() => acceptRide(userRides,passengers)}/>
            <input type= "button" value = "Reject Ride" onClick={() => rejectRide(userRides,passengers)}/>
        </div>
        )
    );
  }
  return (
    <Detail onClick={() => props.onClick()}>
      {leftColumn}
      <RightColumn>
        <RideSummary {...props} nested />
        <hr />
        <div style={{ paddingLeft: '15px' }}>
          <Description>
            <Subtitle>
              Time of Departure:
            </Subtitle> {props.time}
          </Description>
          <Description>
            <Subtitle>
              Price:
            </Subtitle> ${props.price}
          </Description>
          <Description>
            <Subtitle>
              Notes:
            </Subtitle> {props.notes}
          </Description>
          {buttons}
          {deleteButton}
          {editButton}
          {removeSeat}

        </div>
      </RightColumn> 
      <Clear />
      <div style={{ paddingLeft: '15px' }}>
        {passengersRequested}
        </div>
    </Detail>

  );

  function acceptRide(rideDetail,userDetail){
    const newRide = Object.assign({}, rideDetail);
    delete newRide._id;
    newRide.seats_avail-=1
    let passengersRequestLeft = newRide.passengersRequested.filter(
       function(passengers){
        return passengers._id!=userDetail._id;
       });
    newRide.passengersRequested = passengersRequestLeft;
    newRide.requestStatus[userDetail._id] = "Accepted";
    updateRide(newRide,rideDetail._id);
    alert("You have accepted the ride request from "+userDetail.name);
    window.location.reload();
}

function updateRide(newRide,oldRideID) {
    // PUT article, update the ride with id
    fetch(`/api/rides/${oldRideID}`, {
      method: 'PUT',
      body: JSON.stringify(newRide),
      headers: new Headers({ 'Content-type': 'application/json' }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.status_text);
      }
      return response.json();
    }).then((updatedRide) => {
      console.log(updatedRide);
    }).catch(err => console.log(err)); // eslint-disable-line no-console
  }

function rejectRide(rideDetail,userDetail){
    const newRide = Object.assign({}, rideDetail);
    delete newRide._id;
    let passengersRequestLeft = newRide.passengersRequested.filter(
        function(passengers){
         return passengers._id!=userDetail._id
        });
     newRide.passengersRequested = passengersRequestLeft
     newRide.requestStatus[userDetail._id] = "Rejected";
     updateRide(newRide,rideDetail._id);
     alert("You have rejected the ride request from "+userDetail.name);
     window.location.reload();
}


}




export default RideDetailRequest;
