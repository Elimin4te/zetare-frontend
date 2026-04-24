import { EventInput } from '@fullcalendar/common';
import { v4 as UIDV4 } from 'uuid';

/**
 * Generate fake calendar events for planification view
 * Events represent where directors/managers will be on specific dates
 */
export function generateFakeCalendarEvents(): EventInput[] {
  const events: EventInput[] = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Directors and Managers
  const people = [
    { name: 'Carlos Rodríguez', role: 'CEO', color: '#1890ff' },
    { name: 'María González', role: 'CFO', color: '#52c41a' },
    { name: 'Juan Pérez', role: 'COO', color: '#faad14' },
    { name: 'Ana Martínez', role: 'CTO', color: '#f5222d' },
    { name: 'Luis Fernández', role: 'Sales Director', color: '#722ed1' },
    { name: 'Carmen López', role: 'HR Director', color: '#eb2f96' },
    { name: 'Roberto Sánchez', role: 'Operations Manager', color: '#13c2c2' },
    { name: 'Patricia Ramírez', role: 'Marketing Director', color: '#fa8c16' }
  ];

  // Locations and activities
  const activities = [
    { type: 'Meeting', location: 'Caracas Office', description: 'Board meeting' },
    { type: 'Travel', location: 'Bogotá, Colombia', description: 'Business trip' },
    { type: 'Conference', location: 'Lima, Peru', description: 'Industry conference' },
    { type: 'Meeting', location: 'Valencia Office', description: 'Team meeting' },
    { type: 'Travel', location: 'Panama City', description: 'Client visit' },
    { type: 'Meeting', location: 'Maracaibo Office', description: 'Regional review' },
    { type: 'Training', location: 'Caracas Office', description: 'Leadership workshop' },
    { type: 'Travel', location: 'Santiago, Chile', description: 'Partnership meeting' },
    { type: 'Meeting', location: 'Caracas Office', description: 'Strategic planning' },
    { type: 'Conference', location: 'Buenos Aires, Argentina', description: 'Annual summit' }
  ];

  // Calculate current week (Monday to Friday)
  const getMonday = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  };

  const mondayOfCurrentWeek = getMonday(today);
  const currentWeekDays: Date[] = [];

  // Generate dates for Monday to Friday of current week
  for (let i = 0; i < 5; i++) {
    const weekDay = new Date(mondayOfCurrentWeek);
    weekDay.setDate(mondayOfCurrentWeek.getDate() + i);
    currentWeekDays.push(weekDay);
  }

  // Generate events for current week (more events for demonstration)
  currentWeekDays.forEach((weekDay) => {
    // Generate 3-5 events per day in current week
    const eventsPerDay = 3 + Math.floor(Math.random() * 3); // 3-5 events per day

    // Select random people for this day (avoid duplicates on same day)
    const shuffledPeople = [...people].sort(() => Math.random() - 0.5);
    const peopleForDay = shuffledPeople.slice(0, Math.min(eventsPerDay, people.length));

    peopleForDay.forEach((person) => {
      const activity = activities[Math.floor(Math.random() * activities.length)];

      // Set times: 8am to 5pm (all-day events)
      const startDate = new Date(weekDay);
      startDate.setHours(8, 0, 0, 0);

      const endDate = new Date(weekDay);
      endDate.setHours(17, 0, 0, 0);

      // Create event title: "Person Name - Activity Type: Location"
      const title = `${person.name} - ${activity.type}: ${activity.location}`;

      events.push({
        id: UIDV4(),
        title,
        description: activity.description,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        allDay: true,
        backgroundColor: person.color,
        textColor: '#ffffff',
        extendedProps: {
          person: person.name,
          role: person.role,
          location: activity.location,
          activityType: activity.type
        }
      });
    });
  });

  // Generate events for current month and next month (rest of the month)
  const monthsToGenerate = [currentMonth, (currentMonth + 1) % 12];
  const yearsToGenerate = monthsToGenerate.map((month, idx) => (month < currentMonth ? currentYear + 1 : currentYear));

  monthsToGenerate.forEach((month, monthIdx) => {
    const year = yearsToGenerate[monthIdx];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Generate 2-4 events per person per month
    people.forEach((person, personIdx) => {
      const eventsPerPerson = 2 + Math.floor(Math.random() * 3); // 2-4 events

      for (let i = 0; i < eventsPerPerson; i++) {
        // Random day in the month (avoid weekends for some events)
        let day = Math.floor(Math.random() * daysInMonth) + 1;
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();

        // Skip if this date is in current week (already generated)
        const isInCurrentWeek = currentWeekDays.some(
          (weekDay) =>
            weekDay.getDate() === date.getDate() && weekDay.getMonth() === date.getMonth() && weekDay.getFullYear() === date.getFullYear()
        );

        if (isInCurrentWeek) {
          continue; // Skip this day, already has events
        }

        // 70% chance to avoid weekends for business events
        if (Math.random() > 0.3 && (dayOfWeek === 0 || dayOfWeek === 6)) {
          // Move to next weekday
          day = day + (dayOfWeek === 0 ? 1 : 2);
          if (day > daysInMonth) day = day - 7;
        }

        const eventDate = new Date(year, month, day);

        // Double check it's not in current week
        const finalIsInCurrentWeek = currentWeekDays.some(
          (weekDay) =>
            weekDay.getDate() === eventDate.getDate() &&
            weekDay.getMonth() === eventDate.getMonth() &&
            weekDay.getFullYear() === eventDate.getFullYear()
        );

        if (finalIsInCurrentWeek) {
          continue;
        }

        const activity = activities[Math.floor(Math.random() * activities.length)];

        // Set times: 8am to 5pm (all-day events)
        const startDate = new Date(eventDate);
        startDate.setHours(8, 0, 0, 0);

        const endDate = new Date(eventDate);
        endDate.setHours(17, 0, 0, 0);

        // Create event title: "Person Name - Activity Type: Location"
        const title = `${person.name} - ${activity.type}: ${activity.location}`;

        events.push({
          id: UIDV4(),
          title,
          description: activity.description,
          start: startDate.toISOString(),
          end: endDate.toISOString(),
          allDay: true,
          backgroundColor: person.color,
          textColor: '#ffffff',
          extendedProps: {
            person: person.name,
            role: person.role,
            location: activity.location,
            activityType: activity.type
          }
        });
      }
    });
  });

  // Generate multi-day events (2-5 days)
  const multiDayActivities = [
    { type: 'Business Trip', location: 'Bogotá, Colombia', description: 'Extended business trip' },
    { type: 'Conference', location: 'Lima, Peru', description: 'Multi-day industry conference' },
    { type: 'Training', location: 'Caracas Office', description: 'Leadership training program' },
    { type: 'Business Trip', location: 'Panama City', description: 'Client visit and meetings' },
    { type: 'Conference', location: 'Buenos Aires, Argentina', description: 'Annual summit' },
    { type: 'Business Trip', location: 'Santiago, Chile', description: 'Partnership meetings' },
    { type: 'Training', location: 'Valencia Office', description: 'Team building workshop' },
    { type: 'Business Trip', location: 'São Paulo, Brazil', description: 'Regional expansion meetings' }
  ];

  // Generate 5-8 multi-day events
  const multiDayEventCount = 5 + Math.floor(Math.random() * 4); // 5-8 events

  for (let i = 0; i < multiDayEventCount; i++) {
    const person = people[Math.floor(Math.random() * people.length)];
    const activity = multiDayActivities[Math.floor(Math.random() * multiDayActivities.length)];
    const duration = 2 + Math.floor(Math.random() * 4); // 2-5 days

    // Pick a random start date within the next 60 days (avoiding current week)
    const daysFromNow = 7 + Math.floor(Math.random() * 53); // 7-60 days from now
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + daysFromNow);
    startDate.setHours(8, 0, 0, 0);

    // Check if start date is in current week
    const isInCurrentWeek = currentWeekDays.some(
      (weekDay) =>
        weekDay.getDate() === startDate.getDate() &&
        weekDay.getMonth() === startDate.getMonth() &&
        weekDay.getFullYear() === startDate.getFullYear()
    );

    if (isInCurrentWeek) {
      continue; // Skip if in current week
    }

    // Calculate end date
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration - 1); // -1 because end date is inclusive
    endDate.setHours(17, 0, 0, 0);

    // Create event title
    const title = `${person.name} - ${activity.type}: ${activity.location}`;

    events.push({
      id: UIDV4(),
      title,
      description: `${activity.description} (${duration} days)`,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      allDay: true,
      backgroundColor: person.color,
      textColor: '#ffffff',
      extendedProps: {
        person: person.name,
        role: person.role,
        location: activity.location,
        activityType: activity.type
      }
    });
  }

  // Sort events by date
  return events.sort((a, b) => {
    const dateA = new Date(a.start as string).getTime();
    const dateB = new Date(b.start as string).getTime();
    return dateA - dateB;
  });
}
