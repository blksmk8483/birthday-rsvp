import React, { useState, useEffect } from 'react';
import './RSVPForm.css';
import axios from 'axios';

function RSVPForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attending, setAttending] = useState([]);

  useEffect(() => {
    axios.get('/api/rsvps')
      .then(res => setAttending(res.data))
      .catch(err => console.log(err));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (firstName && lastName) {
      axios.post('/api/rsvps', { firstName, lastName })
        .then(res => setAttending([...attending, res.data]))
        .catch(err => console.log(err));
    }
    setFirstName('');
    setLastName('');
  }

  return (
    <div className="rsvp-form">
      <form onSubmit={handleSubmit}>
        <label className="rsvp-form__label">
          First Name:
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </label>
        <br />
        <label className="rsvp-form__label">
          Last Name:
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        </label>
        <br />
        <button type="submit" className="rsvp-form__submit-button">Submit RSVP</button>
      </form>
      <div className="rsvp-form__attending-list">
        {attending.length > 0 ? (
          <>
            <h3>Attending:</h3>
            <ul>
              {attending.map((rsvp, index) => (
                <li key={index}>{rsvp.firstName} {rsvp.lastName}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>No one has RSVPed yet.</p>
        )}
      </div>
    </div>
  );
}

export default RSVPForm;
