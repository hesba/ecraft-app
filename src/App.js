import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



function App() {

  const [meetings, setMeetings] = useState();
  useEffect(() => {
    getMeetings();
  }, []);

  //hakee json
  const getMeetings = async () => {
    let result = await axios.get('/build-front/data/meetings.json')
    setMeetings(result.data.meetings)
  };

  //tällä haetaan getMeeting(haluttu index json tiedostosta)
  const getMeeting = (number) => {
    if (meetings === undefined) {
      return <div></div>
    } else { return meetings[number] }
  }

  const startTime = (id) => {
    return (
      new Date(getMeeting(id).StartTime)
    )
  }
  const endTime = (id) => {
    return (
      new Date(getMeeting(id).EndTime)
    )
  }
  //luo uusi kokous
  const makeMeeting = (id) => {
    return (
      <div>
        <div className="startEnd">{startTime(id).getHours() + ":" + startTime(id).getMinutes() + " - " + endTime(id).getHours() + ":" + endTime(id).getMinutes()}</div>
        <div className="meetingSubj">{getMeeting(id).Subject}</div>
        <div className="meetingOrg">{getMeeting(id).Organizer}</div>
      </div>
    )
  }
  //tänhetkinen kokous
  const makeFront = () => {
    return (
      <div>
        <div>Current meeting</div>
        <div class="hr"><hr /></div>
        <h1 className="subject0">{getMeeting(0).Subject}</h1>
        <div className="start0">{startTime(0).getHours() + ":" + startTime(0).getMinutes()}</div>
        <div class="progress">
          <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div className="end0">{endTime(0).getHours() + ":" + endTime(0).getMinutes()}</div>
        <div>{getMeeting(0).Organizer}</div>
      </div>
    )
  }


  return (

    <div className="App">
      <div className="main">
        <div className="front">
          {makeFront()}
        </div>
        <div className="footer">
          <div class="meeting1">
            {makeMeeting(1)}
          </div>
          <div className="meeting2">
            {makeMeeting(2)}
          </div>
          <div className="meeting3">
            {makeMeeting(3)}
          </div>
        </div>
      </div>
      <div className="sidebar">
        <p>sidebar</p>
      </div>
    </div>
  );
}

export default App;
