import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  padding: 20px;
  max-width: 90%;
  margin: 0 auto;
  font-family: Arial, sans-serif;

  @media (min-width: 768px) {
    max-width: 850px;
  }

  @media (min-width: 1200px) {
    max-width: 1000px;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const CalendarTitle = styled.h1`
  margin: 0;
  margin-bottom: 15px;
  font-size: 2em;
  color: #333;

  @media (min-width: 768px) {
    font-size: 2em;
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 4px;
  border: none;
  border-radius: 4px;
  background-color: #2196f3;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: #1976d2;
  }

  @media (min-width: 768px) {
    width: auto;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const DayCell = styled.div`
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const EventItem = styled.div`
  background-color: ${(props) => {
    switch (props.category) {
      case 'work':
        return '#ff5722';
      case 'personal':
        return '#2196f3';
      case 'meeting':
        return '#4caf50';
      default:
        return '#9e9e9e';
    }
  }};
  color: white;
  padding: 5px;
  margin-top: 5px;
  border-radius: 4px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;

  &:hover {
    background-color: ${(props) => {
      switch (props.category) {
        case 'work':
          return '#e64a19';
        case 'personal':
          return '#1976d2';
        case 'meeting':
          return '#388e3c';
        default:
          return '#757575';
      }
    }};
  }
`;

const FormContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FormHeader = styled.h2`
  margin-top: 0;
  font-size: 1.5em;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 10px 5px;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 150px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.8;
  }

  &.add {
    background-color: #4caf50;
  }

  &.update {
    background-color: #2196f3;
  }

  &.delete {
    background-color: #f44336;
  }

  &.cancel {
    background-color: #9e9e9e;
  }

  &.category {
    background-color: #ff9800;
  }

  @media (min-width: 768px) {
    width: auto;
    margin: 10px;
  }
`;

const CategoryButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  max-width: 150px;

  @media (min-width: 768px) {
    width: auto;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 90%;
  max-width: 500px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const FilterSection = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FilterLabel = styled.label`
  font-size: 1em;
  color: #333;
  margin-right: 10px;
`;

const FilterSelect = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  width: 100%;
  max-width: 200px;

  @media (min-width: 768px) {
    width: auto;
  }
`;

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventForm, setEventForm] = useState({ id: null, title: '', date: '', category: 'work' });
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [categories, setCategories] = useState(['work', 'personal', 'meeting']);
  const [newCategory, setNewCategory] = useState('');

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setEventForm({ ...event });
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditEvent = () => {
    setEvents(events.map(event => event.id === eventForm.id ? eventForm : event));
    setEventForm({ id: null, title: '', date: '', category: 'work' });
    setSelectedEvent(null);
    setModalOpen(false);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter(event => event.id !== eventForm.id));
    setEventForm({ id: null, title: '', date: '', category: 'work' });
    setSelectedEvent(null);
    setModalOpen(false);
  };

  const handleAddEvent = () => {
    const id = events.length + 1;
    setEvents([...events, { ...eventForm, id }]);
    setEventForm({ id: null, title: '', date: '', category: 'work' });
    setShowAddForm(false);
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setEventForm((prev) => ({ ...prev, category: newCategory }));
      setNewCategory('');
    }
  };

  const filteredEvents = filter === 'all' ? events : events.filter(event => event.category === filter);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>Calendar Application</CalendarTitle>
        <AddButton onClick={() => setShowAddForm(true)}>Add New Event</AddButton>
      </CalendarHeader>

      {showAddForm && (
        <FormContainer>
          <FormHeader>{selectedEvent ? 'Edit Event' : 'Add Event'}</FormHeader>
          <Input
            type="text"
            name="title"
            value={eventForm.title}
            onChange={handleInputChange}
            placeholder="Event Title"
          />
          <Input
            type="date"
            name="date"
            value={eventForm.date}
            onChange={handleInputChange}
          />
          <Select
            name="category"
            value={eventForm.category}
            onChange={handleInputChange}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </Select>
          <Input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category"
          />
          <CategoryButton className="category" onClick={handleAddCategory}>Add Category</CategoryButton>
          {selectedEvent ? (
            <>
              <Button className="update" onClick={handleEditEvent}>Save Changes</Button>
              <Button className="delete" onClick={handleDeleteEvent}>Delete Event</Button>
            </>
          ) : (
            <Button className="add" onClick={handleAddEvent}>Add Event</Button>
          )}
          <Button className="cancel" onClick={() => {
            setSelectedEvent(null);
            setEventForm({ id: null, title: '', date: '', category: 'work' });
            setShowAddForm(false);
          }}>
            {selectedEvent ? 'Cancel Edit' : 'Clear Form'}
          </Button>
        </FormContainer>
      )}

      <FilterSection>
        <FilterLabel>Filter Events:</FilterLabel>
        <FilterSelect value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </FilterSelect>
      </FilterSection>

      <CalendarGrid>
        {Array.from({ length: 30 }, (_, i) => (
          <DayCell key={i}>
            <div>{i + 1}</div>
            {filteredEvents
              .filter(event => new Date(event.date).getDate() === i + 1)
              .map(event => (
                <EventItem
                  key={event.id}
                  category={event.category}
                  onClick={() => handleEventSelect(event)}
                >
                  {event.title}
                </EventItem>
              ))}
          </DayCell>
        ))}
      </CalendarGrid>

      {modalOpen && (
        <>
          <Overlay onClick={() => setModalOpen(false)} />
          <Modal>
            <h2>Edit Event</h2>
            <Input
              type="text"
              name="title"
              value={eventForm.title}
              onChange={handleInputChange}
              placeholder="Event Title"
            />
            <Input
              type="date"
              name="date"
              value={eventForm.date}
              onChange={handleInputChange}
            />
            <Select
              name="category"
              value={eventForm.category}
              onChange={handleInputChange}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Select>
            <Button className="update" onClick={handleEditEvent}>Save Changes</Button>
            <Button className="delete" onClick={handleDeleteEvent}>Delete Event</Button>
            <Button className="cancel" onClick={() => setModalOpen(false)}>Close</Button>
          </Modal>
        </>
      )}
    </CalendarContainer>
  );
};

export default App;
