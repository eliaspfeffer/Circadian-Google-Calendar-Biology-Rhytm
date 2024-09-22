# Circadian Events Scheduler for Google Calendar

This script allows you to create daily circadian events in your Google Calendar based on your location's sunrise time. The events include wake-up time, gym, peak cognition, eating, and other activities designed to follow your natural circadian rhythm. The events are color-coded for better visualization in Google Calendar.

## Features

- Automatically creates events based on the sunrise time at your location.
- Generates daily events such as sleep, gym, peak cognition, eating, and reading.
- Color-coded events for easier identification.
- Deletes previously generated events before creating new ones to avoid duplicates.
- Uses the [Sunrise-Sunset API](https://sunrise-sunset.org/api) to get the sunrise time based on your location.
  
## Event Schedule

Here is the daily schedule of events created by the script:
  
- 💤 **Sleep**: 8 hours before wake-up time.
- 🏋️‍♂️ **Gym**: 1 hour after wake-up.
- 🛁 **Bath**: 45 minutes after Gym.
- 🍽️ **Essen**: Directly after the bath ends.
- 🧠 **Peak Cognition**: Starts 2.5 hours after wake-up, lasting 2.5 hours.
- 🍳 **Kochen**: Directly after Peak Cognition ends, lasting 45 minutes.
- 🍅 **Pomodoro Working Time**: 7 hours of work, starting after Kochen.
- 🧠 **Peak Cognition (Parallel)**: Parallel work after Peak Cognition, lasting 3 hours.
- 🛁 **Bath before sleep**: 30 minutes of bath before bedtime.
- 📖 **Reading**: 30 minutes of reading before sleep.

## Requirements

- Google Apps Script enabled.
- Google Calendar access with the ability to create or edit calendars.
- [Sunrise-Sunset API](https://sunrise-sunset.org/api) for obtaining sunrise time based on latitude and longitude.
  
## Setup

### 1. Set Up Google Apps Script

1. Go to [Google Drive](https://drive.google.com).
2. Click on **New** → **More** → **Google Apps Script** to create a new Apps Script project.
3. Go to **Files** (in German: "Dateien") and paste the provided script into the editor.

### 2. Provide Required Services Access

1. Go to **Services** (in German: "Dienste") and add the necessary services:
   - **Google Calendar**: The script requires permission to access your calendar.
   - **URL Fetch**: To fetch sunrise times from the Sunrise-Sunset API.

### 3. Set Up a Trigger for Automatic Syncing

1. Navigate to **Triggers** (in German: "Trigger") and set a trigger to automatically run the script.
2. You can choose to run the script every hour or every minute, depending on how often you want to synchronize your calendar events.
   - Set the function to `createCircadianEventsInKI` and choose the frequency that suits your needs.

### 4. Specify Your Location

Update the `locationLatitude` and `locationLongitude` variables to reflect your current latitude and longitude.

```javascript
// Example location: London
const locationLatitude = 51.5074;
const locationLongitude = -0.1278;
