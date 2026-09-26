// Clearly labelled sample activity makes the customer journey visible on first visit.
// Real prototype actions are saved alongside these examples in localStorage.
export const sampleOrders = [
  {
    id: 'DEMO-24091', createdAt: '2026-09-21T10:30:00+02:00',
    items: [{ id: '1', title: 'Cinema 4D & After Effects: Motion Graphics', price: 750 }],
    total: 750, isSample: true
  },
  {
    id: 'DEMO-23812', createdAt: '2026-09-12T14:15:00+02:00',
    items: [{ id: '2', title: 'Blender 3D Modeling & Photoreal CGI', price: 800 }],
    total: 800, isSample: true
  }
];

export const sampleTickets = [
  {
    id: 'SUP-DEMO-01', topic: 'Learning progress',
    message: 'Where can I see which modules I have completed in my motion graphics course?',
    status: 'Sample request', createdAt: '2026-09-22T09:20:00+02:00', isSample: true
  }
];

export const sampleReviews = [
  {
    id: 'REV-DEMO-01', courseId: '1', rating: 5,
    text: 'The motion design modules are easy to follow, and the progress view helps me plan what to study next.',
    createdAt: '2026-09-23T16:45:00+02:00', author: 'Jane Smith', isSample: true
  }
];
