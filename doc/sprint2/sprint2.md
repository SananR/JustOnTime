# Sprint Goal

The sprint goal is to revamp the existing UI and have a better theme, as well as allowing the customer to view events on their main page once they have been created. In addition, administrators will be able to login and verify events created by the event organizers. Several other features will be included, such as allowing users to update their personal information, logout.

# Stories For This Sprint

### JUS-14
As a customer, I want to be able to see what kind of events are happening around me when I visit the page, so that I can find something fun to do close to me.
### Breakdown:
   - Create UI component for event cards and create a carousel slider for home page	
   - Finish the layout for customer home and create animations
   - Connect customer home to backend in order to display events from database

---
   
### JUS-2
As a logged in user, I want to log out when I'm finished using the website, so that I can protect my account.
### Breakdown:
   - Create a button in the header that only shows when user is logged in
   - Log the user out from backend, remove session, local storage value, and reset auth slice. 
   
   ---
   
### JUS-6
As a registered customer, I want to be able to view and update my personal information, so that my information remains accurate at all times.
### Breakdown:
   - use local storage to get the user personal information
   - Create endpoints for posting the updated information
   - Create UI for displaying the users personal information
   - Create a way to access the personal details page
   - update method getting user personal information
   
   ---
   
### JUS-28
As an event organizer, I want to be able to easily see and manage all events I am currently holding, so that I can make business decisions more productively.
### Breakdown:
   - Implement the base UI for the organizer main page and show the main information about each event
   - Implement the backend to get events from database
   
   ---
   
### JUS-63
As an administrative user, I want to be able to easily see event organizers that need verification so that I can verify them.
### Breakdown:
   - Create backend api endpoint to provide the list of organizers that needs to be verified
   - create frontend page to show list of event organizers that needs to be verified
   - add backend api endpoint to modify organizer's status and send them messages
   
   ---
   
### JUS-64
As an administrative user, I want to be able to easily see events that need verification so that I may verify them.
### Breakdown:
   - add backend endpoint to list all the events that needs verification
   - add backend api endpoint to modify event status and send organizer messages
   - create front end page for admin to view events that needs verification and modify their status
   
   ---
   
### JUS-65
As an administrative user, I want to be able to login to the website so that I can perform administrative duties.
### Breakdown:
   - Create new user type
   - Connect to existing model and backend

   ---

### JUS-25
As an event organizer, I want to be able to update the information for the events, so that I can make sure the information is entirely accurate.
### Breakdown:
   - Display information about the event on the page and allow the organizer to submit new values to update the event accordingly
   - Implement backend to update events
   
   ---
   
### JUS-22
As an event organizer who is not registered, I want to register on the website, so that I can create events and have customers bid on them.
### Breakdown:
   - Conduct research on event organizer on-boarding process
   - Create the UI for event organizer registration
   - Conduct research on how to best organize event organizer data in the backend
   - Setup backend for handling registration for event organizers
   - Refactor the backend code to avoid redundancy
   - Convert backend API to use asynchronous method calls
   
   ---
   
### JUS-24
As an event organizer, I want to be able to create a new event so that the customers can see my event and know when, where and how much to spend.
### Breakdown:
   - Implement frontend for creating event
   - Implement a backend for creating events
  
  ---
  
# Spikes

- Learning redux and redux toolkit to store and manage the state in the application
- Image uploading/rendering for the main page

# Team Capacity

Team Capacity: 200 points

# Participants

Sanan S. Rao  <br/>
Arya Sharma  <br/>
Bhoomi Patel  <br/>
Virthiyasahar Uthayanan  <br/>
Yuto Omachi  <br/>
