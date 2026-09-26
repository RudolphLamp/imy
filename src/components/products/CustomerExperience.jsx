import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, BookOpen, CheckCircle2, ChevronDown, Clock3, HelpCircle,
  Mail, MessageCircle, PackageCheck, Search, Send, Star,
  ReceiptText, ShieldCheck, Sparkles, X, ShoppingBag, Pencil
} from 'lucide-react';

const faqItems = [
  { question: 'Where do I find a course after checkout?', answer: 'Open My Learning from the left menu. Your new course appears there immediately, with its progress saved in this browser.' },
  { question: 'Can I return to a lesson later?', answer: 'Yes. Your course progress is saved locally as you complete lessons. Use My Learning to continue where you left off.' },
  { question: 'How do I view a receipt?', answer: 'Open Purchase history below and select View receipt on any order. You can print or save it using your browser.' },
  { question: 'Is this a real payment?', answer: 'No. Checkout is a prototype simulation. No money is charged and no card information is collected.' },
  { question: 'Will my information appear on another device?', answer: 'No. This prototype stores account activity in this browser only. Clearing browser storage removes it.' }
];

const formatDate = (date) => new Intl.DateTimeFormat('en-ZA', { dateStyle: 'medium' }).format(new Date(date));

export default function CustomerExperience({ user, onUpdateUser, orders, tickets, onAddTicket, reviews, onAddReview, enrolled, courses, onOpenCourse, onOpenLearning, onExploreCatalog, onLoadDemoData, onShowToast, newOrderId, onDismissOrder }) {
  const [section, setSection] = useState('overview');
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [topic, setTopic] = useState('Course access');
  const [message, setMessage] = useState('');
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderSearch, setOrderSearch] = useState('');
  const [reviewCourse, setReviewCourse] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const visibleFaqs = useMemo(() => faqItems.filter(item => `${item.question} ${item.answer}`.toLowerCase().includes(faqSearch.toLowerCase())), [faqSearch]);
  const latestOrder = orders[0];
  const reviewableCourses = enrolled.map(item => courses.find(course => course.id === item.courseId)).filter(Boolean);
  const learningCourses = enrolled.map(item => ({ ...item, course: courses.find(course => course.id === item.courseId) })).filter(item => item.course);
  const nextCourse = learningCourses.find(item => item.progress < 100) || learningCourses[0];
  const overallProgress = learningCourses.length ? Math.round(learningCourses.reduce((sum, item) => sum + item.progress, 0) / learningCourses.length) : 0;
  const recentItems = [
    ...orders.map(order => ({ id: order.id, date: order.createdAt, title: order.isSample ? 'Sample order' : `Order ${order.id} completed`, detail: `${order.items.length} ${order.items.length === 1 ? 'course' : 'courses'} · R${order.total.toFixed(2)}`, section: 'orders' })),
    ...tickets.map(ticket => ({ id: ticket.id, date: ticket.createdAt, title: ticket.isSample ? 'Sample support question' : 'Support question saved', detail: ticket.topic, section: 'support' })),
    ...reviews.map(review => ({ id: review.id, date: review.createdAt, title: review.isSample ? 'Sample course review' : 'Course feedback shared', detail: courses.find(course => course.id === review.courseId)?.title || 'Course', section: 'reviews' }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  const filteredOrders = orders.filter(order => `${order.id} ${order.items.map(item => item.title).join(' ')}`.toLowerCase().includes(orderSearch.trim().toLowerCase()));

  useEffect(() => {
    setProfileName(user?.name || '');
    setProfileEmail(user?.email || '');
  }, [user?.name, user?.email]);

  useEffect(() => {
    const existing = reviews.find(review => review.courseId === reviewCourse);
    setRating(existing?.rating || 5);
    setReviewText(existing?.text || '');
  }, [reviewCourse, reviews]);

  const saveProfile = (event) => {
    event.preventDefault();
    const name = profileName.trim();
    const email = profileEmail.trim();
    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email)) {
      onShowToast?.('Enter your name and a valid email address.', 'error');
      return;
    }
    onUpdateUser({ ...user, name, email });
    onShowToast?.('Profile details saved in this browser.', 'success');
  };

  const sendTicket = (event) => {
    event.preventDefault();
    if (message.trim().length < 15) {
      onShowToast?.('Please describe your question in at least 15 characters.', 'error');
      return;
    }
    const ticket = { id: `SUP-${Date.now().toString().slice(-6)}`, topic, message: message.trim(), status: 'Saved locally', createdAt: new Date().toISOString() };
    onAddTicket(ticket);
    setMessage('');
    onShowToast?.(`Support request ${ticket.id} saved.`, 'success');
  };

  const submitReview = (event) => {
    event.preventDefault();
    if (!reviewCourse || reviewText.trim().length < 20) {
      onShowToast?.('Choose a course and write at least 20 characters of feedback.', 'error');
      return;
    }
    const existing = reviews.find(review => review.courseId === reviewCourse);
    onAddReview({ id: existing?.id || `REV-${Date.now()}`, courseId: reviewCourse, rating, text: reviewText.trim(), createdAt: existing?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString(), author: user?.name || 'Student' });
    onShowToast?.(existing ? 'Your review has been updated.' : 'Thanks for sharing your course feedback.', 'success');
  };

  return (
    <div className="cx-page">
      <div className="cx-hero">
        <div className="cx-hero-copy">
          <span className="cx-eyebrow"><span className="cx-status-dot" /> YOUR CREATE.IT SPACE</span>
          <h1>Good to see you, <span>{(user?.name || 'Creator').split(' ')[0]}.</span></h1>
          <p>Pick up a course, review your orders, and get help when you need it. Your learning space is all here.</p>
        </div>
        <div className="cx-hero-mark"><Sparkles size={38} strokeWidth={1.4} /></div>
      </div>

      {newOrderId && <div className="cx-confirmation" role="status"><CheckCircle2 size={20} /><div><strong>Your demo order is complete</strong><span>{newOrderId} has been saved. Your courses are ready in My Learning.</span></div><button type="button" onClick={() => { setSelectedOrder(orders.find(order => order.id === newOrderId) || null); setSection('orders'); onDismissOrder?.(); }}>View receipt <ArrowRight size={15} /></button><button type="button" className="cx-confirmation-close" onClick={onDismissOrder} aria-label="Dismiss order confirmation"><X size={16} /></button></div>}

      <div className="cx-stat-grid">
        <div className="cx-stat"><span className="cx-stat-icon purple"><BookOpen size={19} /></span><strong>{enrolled.length}</strong><small>Courses in my learning</small></div>
        <div className="cx-stat"><span className="cx-stat-icon cyan"><PackageCheck size={19} /></span><strong>{orders.length}</strong><small>Orders in this browser</small></div>
        <div className="cx-stat"><span className="cx-stat-icon green"><CheckCircle2 size={19} /></span><strong>{overallProgress}%</strong><small>Average course progress</small></div>
      </div>

      <nav className="cx-tabs" aria-label="Customer account sections">
        {[
          ['overview', 'Overview'], ['orders', 'Purchase history'], ['support', 'Help & support'], ['reviews', 'My feedback'], ['profile', 'Profile']
        ].map(([id, label]) => <button key={id} type="button" aria-current={section === id ? 'page' : undefined} className={section === id ? 'active' : ''} onClick={() => setSection(id)}>{label}</button>)}
      </nav>

      {!orders.length && !tickets.length && !reviews.length && <div className="cx-sample-prompt"><div><Sparkles size={18} /><span>Want to explore a complete account?</span><small>Load clearly labelled sample orders, a support question, and a review.</small></div><button type="button" className="cx-secondary" onClick={onLoadDemoData}>Load sample experience <ArrowRight size={15} /></button></div>}

      {section === 'overview' && <div className="cx-overview-grid">
        <section className="cx-panel cx-welcome-panel">
          <span className="cx-section-kicker">PICK UP WHERE YOU LEFT OFF</span>
          {nextCourse ? <><div className="cx-course-feature"><img src={nextCourse.course.image} alt="" /><div><span className="cx-course-category">{nextCourse.course.category}</span><h2>{nextCourse.course.title}</h2><p>{nextCourse.progress >= 100 ? 'Completed · You can revisit the course any time.' : `${nextCourse.progress}% complete · Keep your momentum going.`}</p></div></div><div className="cx-progress-label"><span>Course progress</span><strong>{nextCourse.progress}%</strong></div><div className="cx-progress-track" role="progressbar" aria-label={`${nextCourse.course.title} progress`} aria-valuenow={nextCourse.progress} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${nextCourse.progress}%` }} /></div><button className="cx-primary" type="button" onClick={onOpenLearning}>{nextCourse.progress >= 100 ? 'Review course' : 'Continue learning'} <ArrowRight size={16} /></button></> : <><h2>Make something brilliant.</h2><p>Browse the catalog and choose your first creative course.</p><button className="cx-primary" type="button" onClick={onExploreCatalog}>Explore courses <ArrowRight size={16} /></button></>}
        </section>
        <section className="cx-panel">
          <div className="cx-panel-heading"><ReceiptText size={19} /><h2>Latest order</h2></div>
          {latestOrder ? <>{latestOrder.isSample && <span className="cx-sample-badge">SAMPLE ORDER</span>}<p className="cx-muted">{formatDate(latestOrder.createdAt)} · {latestOrder.id}</p><strong className="cx-order-total">R{latestOrder.total.toFixed(2)}</strong><p className="cx-muted">{latestOrder.items.length} {latestOrder.items.length === 1 ? 'course' : 'courses'} in this order.</p><button type="button" className="cx-text-link" onClick={() => { setSelectedOrder(latestOrder); setSection('orders'); }}>View receipt <ArrowRight size={15} /></button></> : <><p className="cx-muted">Your order history will appear here after your first checkout.</p><button type="button" className="cx-text-link" onClick={onExploreCatalog}>Browse courses <ArrowRight size={15} /></button></>}
        </section>
        <section className="cx-panel">
          <div className="cx-panel-heading"><MessageCircle size={19} /><h2>Need a hand?</h2></div>
          <p className="cx-muted">Find answers to common questions or save a support request for this prototype.</p>
          <button type="button" className="cx-text-link" onClick={() => setSection('support')}>Visit help & support <ArrowRight size={15} /></button>
        </section>
        <section className="cx-panel cx-activity-panel"><div className="cx-panel-heading"><Clock3 size={19} /><h2>Recent activity</h2></div>{recentItems.length ? <div className="cx-activity-list">{recentItems.map(item => <button type="button" key={item.id} onClick={() => setSection(item.section)}><span className="cx-activity-dot" /><span><strong>{item.title}</strong><small>{item.detail} · {formatDate(item.date)}</small></span><ArrowRight size={15} /></button>)}</div> : <p className="cx-muted">Your orders, questions, and reviews will appear here as you use the site.</p>}</section>
      </div>}

      {section === 'orders' && <section className="cx-panel cx-full-panel">
        <div className="cx-heading-row"><div><span className="cx-section-kicker">YOUR PURCHASES</span><h2>Purchase history</h2><p>Every completed prototype checkout is recorded here.</p></div><ReceiptText size={25} /></div>
        {orders.length > 0 && <label className="cx-search cx-order-search"><Search size={16} /><input value={orderSearch} onChange={event => setOrderSearch(event.target.value)} placeholder="Search order number or course" aria-label="Search purchase history" /></label>}
        {filteredOrders.length ? <div className="cx-order-list">{filteredOrders.map(order => <article className="cx-order" key={order.id}>
          <div className="cx-order-top"><div><span className="cx-order-id">{order.id}</span>{order.isSample && <span className="cx-sample-badge">SAMPLE</span>}<span className="cx-muted">{formatDate(order.createdAt)}</span></div><span className="cx-order-status"><CheckCircle2 size={14} /> {order.isSample ? 'Example' : 'Completed'}</span></div>
          <div className="cx-order-main"><div><strong>{order.items.map(item => item.title).join(', ')}</strong><small>{order.items.length} {order.items.length === 1 ? 'course' : 'courses'}</small></div><strong>R{order.total.toFixed(2)}</strong></div>
          <button type="button" className="cx-text-link" onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}>{selectedOrder?.id === order.id ? 'Hide receipt' : 'View receipt'} <ArrowRight size={15} /></button>
          {selectedOrder?.id === order.id && <div className="cx-receipt"><div className="cx-receipt-title"><strong>{order.isSample ? 'Sample receipt' : 'Receipt'} · {order.id}</strong><span>{formatDate(order.createdAt)}</span></div>{order.items.map(item => <div className="cx-receipt-row" key={item.id}><span>{item.title}</span><span>R{item.price.toFixed(2)}</span></div>)}<div className="cx-receipt-row cx-receipt-total"><strong>Total</strong><strong>R{order.total.toFixed(2)}</strong></div><p>{order.isSample ? 'This is sample data for exploring the prototype. No purchase took place.' : 'No payment was taken. This receipt records a simulated checkout in this browser.'}</p><button type="button" className="cx-secondary" onClick={() => window.print()}>Print / save receipt</button></div>}
        </article>)}</div> : <div className="cx-empty"><ReceiptText size={31} /><h3>{orders.length ? 'No matching orders' : 'No orders yet'}</h3><p>{orders.length ? 'Try another course name or order number.' : 'When you complete a checkout, your receipt will appear here.'}</p>{!orders.length && <button type="button" className="cx-primary" onClick={onExploreCatalog}>Browse courses <ShoppingBag size={15} /></button>}</div>}
      </section>}

      {section === 'support' && <div className="cx-support-grid">
        <section className="cx-panel"><span className="cx-section-kicker">QUICK ANSWERS</span><h2>Frequently asked questions</h2><label className="cx-search"><Search size={16} /><input value={faqSearch} onChange={event => setFaqSearch(event.target.value)} placeholder="Search help topics" aria-label="Search help topics" /></label><div className="cx-faq-list">{visibleFaqs.map(item => <div className="cx-faq" key={item.question}><button type="button" aria-expanded={openFaq === item.question} onClick={() => setOpenFaq(openFaq === item.question ? null : item.question)}>{item.question}<ChevronDown size={16} /></button>{openFaq === item.question && <p>{item.answer}</p>}</div>)}{!visibleFaqs.length && <p className="cx-muted">No answers matched. Try another word or send a request.</p>}</div></section>
        <section className="cx-panel"><span className="cx-section-kicker">CONTACT SUPPORT</span><h2>Save a question</h2><p className="cx-muted">Your question is saved in this browser for demonstration. It is not sent to a support team.</p><form className="cx-form" onSubmit={sendTicket}><label>Topic<select value={topic} onChange={event => setTopic(event.target.value)}><option>Course access</option><option>Order or receipt</option><option>Learning progress</option><option>Account details</option><option>Other</option></select></label><label>Your question<textarea value={message} onChange={event => setMessage(event.target.value)} rows="5" placeholder="Tell us what happened and what you need help with..." /></label><button type="submit" className="cx-primary">Save question <Send size={15} /></button></form>{tickets.length > 0 && <div className="cx-ticket-list"><h3>My requests</h3>{tickets.map(ticket => <article key={ticket.id}><strong>{ticket.topic}</strong>{ticket.isSample && <span className="cx-sample-badge">SAMPLE</span>}<span>{ticket.id} · {formatDate(ticket.createdAt)} · {ticket.status}</span><p>{ticket.message}</p></article>)}</div>}</section>
      </div>}

      {section === 'reviews' && <div className="cx-support-grid">
        <section className="cx-panel"><span className="cx-section-kicker">SHARE YOUR EXPERIENCE</span><h2>Course feedback</h2><p className="cx-muted">Tell us what helped you learn. Your review stays editable in this browser.</p>{reviewableCourses.length ? <form className="cx-form" onSubmit={submitReview}><label>Course<select value={reviewCourse} onChange={event => setReviewCourse(event.target.value)}><option value="">Choose a course</option>{reviewableCourses.map(course => <option key={course.id} value={course.id}>{course.title}</option>)}</select></label><fieldset className="cx-stars"><legend>Your rating</legend>{[1,2,3,4,5].map(value => <button key={value} type="button" aria-label={`${value} stars`} aria-pressed={rating === value} onClick={() => setRating(value)}><Star size={24} fill={value <= rating ? '#fbbf24' : 'none'} color={value <= rating ? '#fbbf24' : '#74819b'} /></button>)}</fieldset><label>Your review<textarea rows="5" value={reviewText} onChange={event => setReviewText(event.target.value)} placeholder="What did you enjoy, and what could improve?" /></label><button type="submit" className="cx-primary">{reviews.some(review => review.courseId === reviewCourse) ? 'Update feedback' : 'Post feedback'} <ArrowRight size={15} /></button></form> : <div className="cx-empty"><Star size={30} /><p>Enrol in a course to share feedback.</p><button type="button" className="cx-primary" onClick={onExploreCatalog}>Browse courses <ArrowRight size={15} /></button></div>}</section>
        <section className="cx-panel"><span className="cx-section-kicker">YOUR VOICE</span><h2>My reviews</h2>{reviews.length ? <div className="cx-review-list">{reviews.map(review => { const course = courses.find(item => item.id === review.courseId); return <article key={review.id}><div><strong>{course?.title || 'Course'}</strong><span aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></div>{review.isSample && <span className="cx-sample-badge">SAMPLE</span>}<small>{formatDate(review.updatedAt || review.createdAt)}</small><p>{review.text}</p><button type="button" className="cx-text-link" onClick={() => { setReviewCourse(review.courseId); }}><Pencil size={13} /> Edit review</button>{course && <button type="button" className="cx-text-link" onClick={() => onOpenCourse(course.id)}>View course <ArrowRight size={14} /></button>}</article>; })}</div> : <div className="cx-empty"><MessageCircle size={30} /><p>Your course feedback will appear here.</p></div>}</section>
      </div>}

      {section === 'profile' && <div className="cx-support-grid"><section className="cx-panel"><span className="cx-section-kicker">ACCOUNT DETAILS</span><h2>My profile</h2><p className="cx-muted">Keep the name and email shown around your account up to date.</p><form className="cx-form" onSubmit={saveProfile}><label>Full name<input value={profileName} onChange={event => setProfileName(event.target.value)} autoComplete="name" /></label><label>Email address<input value={profileEmail} onChange={event => setProfileEmail(event.target.value)} type="email" autoComplete="email" /></label><button className="cx-primary" type="submit">Save changes <CheckCircle2 size={15} /></button></form></section><section className="cx-panel cx-privacy-panel"><div className="cx-panel-heading"><ShieldCheck size={20} /><h2>About your data</h2></div><p>Courses, orders, support requests, reviews, and profile details are stored in this browser for the prototype. There is no connected account service or database.</p><div className="cx-privacy-note"><Clock3 size={18} /><span>Your activity will be available on this device until browser storage is cleared.</span></div><div className="cx-privacy-note"><Mail size={18} /><span>Support requests are saved here only; no email is sent.</span></div></section></div>}

      <div className="cx-page-footer"><HelpCircle size={14} /> Create.IT prototype · Built with React, Vite, Lucide and browser storage</div>
    </div>
  );
}
