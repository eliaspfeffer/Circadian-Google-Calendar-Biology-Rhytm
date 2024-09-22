// Function to create circadian events with colorId
function createCircadianEventsInKI() {

  //YOUR LOCATION:
  //EXAMPLE LOCATION: London

  //Change this depending on your location:
  const locationLatitude = 51.5074;
  const locationLatitude = 9.0603;


  const calendarId = getOrCreateCalendar('KIColored').getId();
  const ONE_MINUTE = 60 * 1000;
  const ONE_HOUR = 60 * ONE_MINUTE;

  const now = new Date();
  const daysAhead = 2;

  //Colors of the events:
  const peakCognitionColor = '11'
  const regenerationColor = '1'
  const codingTimeColor = '2'



  // Define the date range for which you want to delete old events
  const startDate = new Date(now);
  startDate.setHours(0, 0, 0, 0); // Start of today
  const endDate = new Date(now);
  endDate.setDate(now.getDate() + daysAhead);
  endDate.setHours(23, 59, 59, 999); // End of the last day

  // Delete old events in the date range
  deleteOldEvents(calendarId, startDate, endDate);

  for (let i = 0; i < daysAhead; i++) {
    let eventDate = new Date(now);
    eventDate.setDate(now.getDate() + i);



    // Get sunrise time
    let sunriseTime = getSunriseTime(eventDate, locationLatitude, locationLatitude);

    // Wake-up time: 30 minutes after sunrise
    let wakeUpTime = new Date(sunriseTime.getTime() - 2 * ONE_HOUR);

    // Sleep event: from sleepStartTime to wakeUpTime (8 hours of sleep)
    let sleepStartTime = new Date(wakeUpTime.getTime() - 8 * ONE_HOUR);
    createEventWithColor(calendarId, sleepStartTime, wakeUpTime, '😴 Sleep', 'Schlafenszeit', regenerationColor); // Lavender

    // Gym: directly after wakeUpTime
    let gymStartTime = new Date(wakeUpTime.getTime());
    let gymEndTime = new Date(gymStartTime.getTime() + 1 * ONE_HOUR); // Gym lasts 1 hour
    createEventWithColor(calendarId, gymStartTime, gymEndTime, '🏋️‍♂️ Gym', 'Gym Time', regenerationColor); // Orange

    // Bath: directly after Gym
    let bathStartTime = new Date(gymEndTime.getTime());
    let bathEndTime = new Date(bathStartTime.getTime() + 45 * ONE_MINUTE);
    createEventWithColor(calendarId, bathStartTime, bathEndTime, '🛁 Bath', 'Badezeit', regenerationColor); // Pink

    // Essen: 45 minutes after Bath ends
    let eatingStartTime = new Date(bathEndTime.getTime() + 0 * ONE_MINUTE);
    let eatingEndTime = new Date(eatingStartTime.getTime() + 45 * ONE_MINUTE);
    createEventWithColor(calendarId, eatingStartTime, eatingEndTime, '🍽️ Essen', 'Essenszeit', regenerationColor); // Yellow

    // Peak Cognition: 2.5 hours after wakeUpTime
    let peakCognitionStartTime = new Date(wakeUpTime.getTime() + 2.5 * ONE_HOUR);
    let peakCognitionEndTime = new Date(peakCognitionStartTime.getTime() + 2.5 * ONE_HOUR); // Lasts 2.5 hours
    createEventWithColor(calendarId, peakCognitionStartTime, peakCognitionEndTime, '🧠 Peak Cognition', 'Kognitive Spitzenleistung', peakCognitionColor); // Red

    // Kochen: directly after Peak Cognition ends
    let cookingStartTime = new Date(peakCognitionEndTime.getTime());
    let cookingEndTime = new Date(cookingStartTime.getTime() + 45 * ONE_MINUTE);
    createEventWithColor(calendarId, cookingStartTime, cookingEndTime, '🍳 Kochen', 'Kochzeit', regenerationColor); // Purple

    // Pomodoro: 1 hour after cooking ends, lasting 7 hours
    let pomodoroStartTime = new Date(cookingEndTime.getTime() + 0 * ONE_HOUR);
    let pomodoroEndTime = new Date(pomodoroStartTime.getTime() + 7 * ONE_HOUR);
    createEventWithColor(calendarId, pomodoroStartTime, pomodoroEndTime, '🍅 Pomodoro', 'Pomodoro Arbeitszeit', codingTimeColor); // Lavender

    // Parallel Events: 4.5 hours after Peak Cognition ends, lasting 3 hours
    let parallelStartTime = new Date(peakCognitionEndTime.getTime() + 4.5 * ONE_HOUR);
    let parallelEndTime = new Date(parallelStartTime.getTime() + 3 * ONE_HOUR); // Lasts 3 hours

    // Peak Cognition (Parallel)
    createEventWithColor(calendarId, parallelStartTime, parallelEndTime, '🧠 Peak Cognition (Parallel)', 'Kognitive Spitzenleistung (Parallel)', peakCognitionColor); // Red

    // Gym (Parallel)
    createEventWithColor(calendarId, parallelStartTime, parallelEndTime, '🏋️‍♂️ Gym (Parallel)', 'Gym Time (Parallel)', regenerationColor); // Orange

    // Bath before sleep: 15.5 hours after wakeUpTime, lasting 30 minutes
    let bathBeforeSleepStartTime = new Date(wakeUpTime.getTime() + 15 * ONE_HOUR);
    let bathBeforeSleepEndTime = new Date(bathBeforeSleepStartTime.getTime() + 30 * ONE_MINUTE);
    createEventWithColor(calendarId, bathBeforeSleepStartTime, bathBeforeSleepEndTime, '🛁 Bath', 'Bath', regenerationColor); // Pink

    // Reading: 16 hours after wakeUpTime, lasting 30 minutes
    let readingStartTime = new Date(wakeUpTime.getTime() + 15.5 * ONE_HOUR);
    let readingEndTime = new Date(readingStartTime.getTime() + 30 * ONE_MINUTE);
    createEventWithColor(calendarId, readingStartTime, readingEndTime, '📖 Reading', 'Reading', regenerationColor); // Green
  }
}

// Function to delete old events in the specified date range
function deleteOldEvents(calendarId, startDate, endDate) {
  const calendar = CalendarApp.getCalendarById(calendarId);
  const events = calendar.getEvents(startDate, endDate);

  for (const event of events) {
    const eventTitle = event.getTitle();
    if (isScriptGeneratedEvent(eventTitle)) {
      event.deleteEvent();
    }
  }
}

// Helper function to identify events created by the script
function isScriptGeneratedEvent(title) {
  const scriptEventTitles = [
    '😴 Sleep',
    '🏋️‍♂️ Gym',
    '🛁 Bath',
    '🍽️ Essen',
    '🧠 Peak Cognition',
    '🍳 Kochen',
    '🍅 Pomodoro',
    '🧠 Peak Cognition (Parallel)',
    '🏋️‍♂️ Gym (Parallel)',
    '📖 Reading'
  ];
  return scriptEventTitles.includes(title);
}

// Function to create an event with specific colorId
function createEventWithColor(calendarId, startTime, endTime, title, description, colorId) {
  const event = {
    summary: title,
    description: description,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: 'Europe/Berlin',
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: 'Europe/Berlin',
    },
    colorId: colorId // Set the color ID here
  };

  Calendar.Events.insert(event, calendarId);
}

// Function to get or create the calendar
function getOrCreateCalendar(calendarName) {
  let calendar = CalendarApp.getCalendarsByName(calendarName)[0];

  if (!calendar) {
    calendar = CalendarApp.createCalendar(calendarName);
  }

  return calendar;
}

// Function to get sunrise time using an API
function getSunriseTime(date, lat, lng) {
  const apiUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${formatDateForApi(date)}&formatted=0`;
  const response = UrlFetchApp.fetch(apiUrl);
  const json = JSON.parse(response.getContentText());

  let sunriseUTC = new Date(json.results.sunrise);
  // Convert UTC time to local time
  let timezoneOffsetMs = date.getTimezoneOffset() * 60000;
  let sunriseLocal = new Date(sunriseUTC.getTime() - timezoneOffsetMs);

  return sunriseLocal;
}

function formatDateForApi(date) {
  return Utilities.formatDate(date, 'GMT', 'yyyy-MM-dd');
}