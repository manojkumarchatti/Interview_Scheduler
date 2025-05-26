import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

export default function Scheduler() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/interviews').then(res => setEvents(res.data));
  }, []);

  const handleDateSelect = selectInfo => {
    const title = prompt('Interview Title:');
    if (title) {
      axios.post('/api/interviews', {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr
      }).then(res => setEvents([...events, res.data]));
    }
  };

  const handleEventClick = clickInfo => {
    if (window.confirm(`Delete "${clickInfo.event.title}"?`)) {
      axios.delete(`/api/interviews/${clickInfo.event.id}`)
        .then(() => setEvents(events.filter(e => e.id !== clickInfo.event.id)));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Interview Scheduler</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
      />
    </div>
  );
}
