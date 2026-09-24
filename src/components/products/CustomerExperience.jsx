import React, { useMemo, useState } from 'react';
import {
  ArrowRight, BookOpen, CheckCircle2, ChevronDown, Clock3, HelpCircle,
  Mail, MessageCircle, PackageCheck, Search, Send, Star, UserRound,
  ReceiptText, ShieldCheck
} from 'lucide-react';

const faqItems = [
  { question: 'Where do I find a course after checkout?', answer: 'Open My Learning from the left menu. Your new course appears there immediately, with its progress saved in this browser.' },
  { question: 'Can I return to a lesson later?', answer: 'Yes. Your course progress is saved locally as you complete lessons. Use My Learning to continue where you left off.' },
  { question: 'How do I view a receipt?', answer: 'Open Purchase history below and select View receipt on any order. You can print or save it using your browser.' },
  { question: 'Is this a real payment?', answer: 'No. Checkout is a prototype simulation. No money is charged and no card information is collected.' },
  { question: 'Will my information appear on another device?', answer: 'No. This prototype stores account activity in this browser only. Clearing browser storage removes it.' }
];

const formatDate = (date) => new Intl.DateTimeFormat('en-ZA', { dateStyle: 'medium' }).format(new Date(date));

export default function CustomerExperience({ user, onUpdateUser, orders, tickets, onAddTicket, reviews, onAddReview, enrolled, courses, onOpenCourse, onOpenLearning, onShowToast }) {
  const [section, setSection] = useState('overview');
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [topic, setTopic] = useState('Course access');
  const [message, setMessage] = useState('');
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewCourse, setReviewCourse] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const visibleFaqs = useMemo(() => faqItems.filter(item => `${item.question} ${item.answer}`.toLowerCase().includes(faqSearch.toLowerCase())), [faqSearch]);
  const purchasedCount = orders.reduce((sum, order) => sum + order.items.length, 0);
  const latestOrder = orders[0];
  const reviewableCourses = enrolled.map(item => courses.find(course => course.id === item.courseId)).filter(Boolean);

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
    onAddReview({ id: `REV-${Date.now()}`, courseId: reviewCourse, rating, text: reviewText.trim(), createdAt: new Date().toISOString(), author: user?.name || 'Student' });
    setReviewText('');
    onShowToast?.('Thanks for sharing your course feedback.', 'success');
  };

  return (
    <div className="cx-page">
      <div className="cx-hero">
        <div className="cx-hero-copy">
          <span className="cx-eyebrow"><span className="cx-status-dot" /> YOUR CREATE.IT SPACE</span>
          <h1>Good to see you, <span>{(user?.name || 'Creator').split(' ')[0]}.</span></h1>
          <p>Everything around your learning journey, from course access to receipts and support, in one place.</p>
        </div>
        <div className="cx-hero-mark"><UserRound size={38} strokeWidth={1.4} /></div>
      </div>

      <div className="cx-stat-grid">
        <div className="cx-stat"><span className="cx-stat-icon purple"><BookOpen size={19} /></span><strong>{enrolled.length}</strong><small>Courses in my learning</small></div>
        <div className="cx-stat"><span className="cx-stat-icon cyan"><PackageCheck size={19} /></span><strong>{orders.length}</strong><small>Orders placed</small></div>
        <div className="cx-stat"><span className="cx-stat-icon green"><CheckCircle2 size={19} /></span><strong>{purchasedCount}</strong><small>Courses purchased</small></div>
      </div>

      <div className="cx-tabs" role="tablist" aria-label="Customer account sections">
        {[
          ['overview', 'Overview'], ['orders', 'Purchase history'], ['support', 'Help & support'], ['reviews', 'My feedback'], ['profile', 'Profile']
        ].map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={section === id} className={section === id ? 'active' : ''} onClick={() => setSection(id)}>{label}</button>)}
      </div>

      {section === 'overview' && <div className="cx-overview-grid">
        <section className="cx-panel cx-welcome-panel">
          <span className="cx-section-kicker">PICK UP WHERE YOU LEFT OFF</span>
          <h2>Your learning is ready</h2>
          <p>Open your dashboard to continue a course and see your latest progress.</p>
          <button className="cx-primary" type="button" onClick={onOpenLearning}>Go to My Learning <ArrowRight size={16} /></button>
        </section>
        <section className="cx-panel">
          <div className="cx-panel-heading"><ReceiptText size={19} /><h2>Latest order</h2></div>
          {latestOrder ? <><p className="cx-muted">{formatDate(latestOrder.createdAt)} · {latestOrder.id}</p><strong className="cx-order-total">R{latestOrder.total.toFixed(2)}</strong><button type="button" className="cx-text-link" onClick={() => { setSelectedOrder(latestOrder); setSection('orders'); }}>View receipt <ArrowRight size={15} /></button></> : <><p className="cx-muted">Your order history will appear here after your first checkout.</p><button type="button" className="cx-text-link" onClick={onOpenLearning}>Explore your learning <ArrowRight size={15} /></button></>}
        </section>
        <section className="cx-panel">
          <div className="cx-panel-heading"><MessageCircle size={19} /><h2>Need a hand?</h2></div>
          <p className="cx-muted">Find answers to common questions or save a support request for this prototype.</p>
          <button type="button" className="cx-text-link" onClick={() => setSection('support')}>Visit help & support <ArrowRight size={15} /></button>
        </section>
      </div>}

      {section === 'orders' && <section className="cx-panel cx-full-panel">
        <div className="cx-heading-row"><div><span className="cx-section-kicker">YOUR PURCHASES</span><h2>Purchase history</h2><p>Every completed prototype checkout is recorded here.</p></div><ReceiptText size={25} /></div>
        {orders.length ? <div className="cx-order-list">{orders.map(order => <article className="cx-order" key={order.id}>
          <div className="cx-order-top"><div><span className="cx-order-id">{order.id}</span><span className="cx-muted">{formatDate(order.createdAt)}</span></div><span className="cx-order-status"><CheckCircle2 size={14} /> Completed</span></div>
          <div className="cx-order-main"><div><strong>{order.items.map(item => item.title).join(', ')}</strong><small>{order.items.length} {order.items.length === 1 ? 'course' : 'courses'}</small></div><strong>R{order.total.toFixed(2)}</strong></div>
          <button type="button" className="cx-text-link" onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}>{selectedOrder?.id === order.id ? 'Hide receipt' : 'View receipt'} <ArrowRight size={15} /></button>
          {selectedOrder?.id === order.id && <div className="cx-receipt"><div className="cx-receipt-title"><strong>Receipt · {order.id}</strong><span>Prototype purchase</span></div>{order.items.map(item => <div className="cx-receipt-row" key={item.id}><span>{item.title}</span><span>R{item.price.toFixed(2)}</span></div>)}<div className="cx-receipt-row cx-receipt-total"><strong>Total</strong><strong>R{order.total.toFixed(2)}</strong></div><p>No payment was taken. This receipt records a simulated checkout in this browser.</p><button type="button" className="cx-secondary" onClick={() => window.print()}>Print / save receipt</button></div>}
        </article>)}</div> : <div className="cx-empty"><ReceiptText size={31} /><h3>No orders yet</h3><p>When you complete a checkout, your receipt will appear here.</p></div>}
      </section>}

      {section === 'support' && <div className="cx-support-grid">
        <section className="cx-panel"><span className="cx-section-kicker">QUICK ANSWERS</span><h2>Frequently asked questions</h2><label className="cx-search"><Search size={16} /><input value={faqSearch} onChange={event => setFaqSearch(event.target.value)} placeholder="Search help topics" aria-label="Search help topics" /></label><div className="cx-faq-list">{visibleFaqs.map((item, index) => <div className="cx-faq" key={item.question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{item.question}<ChevronDown size={16} /></button>{openFaq === index && <p>{item.answer}</p>}</div>)}{!visibleFaqs.length && <p className="cx-muted">No answers matched. Try another word or send a request.</p>}</div></section>
        <section className="cx-panel"><span className="cx-section-kicker">CONTACT SUPPORT</span><h2>Send a question</h2><p className="cx-muted">This prototype saves your request locally so you can track what you asked.</p><form className="cx-form" onSubmit={sendTicket}><label>Topic<select value={topic} onChange={event => setTopic(event.target.value)}><option>Course access</option><option>Order or receipt</option><option>Learning progress</option><option>Account details</option><option>Other</option></select></label><label>Your question<textarea value={message} onChange={event => setMessage(event.target.value)} rows="5" placeholder="Tell us what happened and what you need help with..." /></label><button type="submit" className="cx-primary">Save support request <Send size={15} /></button></form>{tickets.length > 0 && <div className="cx-ticket-list"><h3>My requests</h3>{tickets.map(ticket => <article key={ticket.id}><strong>{ticket.topic}</strong><span>{ticket.id} · {formatDate(ticket.createdAt)} · {ticket.status}</span><p>{ticket.message}</p></article>)}</div>}</section>
      </div>}

      {section === 'reviews' && <div className="cx-support-grid">
        <section className="cx-panel"><span className="cx-section-kicker">SHARE YOUR EXPERIENCE</span><h2>Course feedback</h2><p className="cx-muted">Tell us what helped you learn. You can review courses in My Learning.</p>{reviewableCourses.length ? <form className="cx-form" onSubmit={submitReview}><label>Course<select value={reviewCourse} onChange={event => setReviewCourse(event.target.value)}><option value="">Choose a course</option>{reviewableCourses.map(course => <option key={course.id} value={course.id}>{course.title}</option>)}</select></label><fieldset className="cx-stars"><legend>Your rating</legend>{[1,2,3,4,5].map(value => <button key={value} type="button" aria-label={`${value} stars`} aria-pressed={rating === value} onClick={() => setRating(value)}><Star size={24} fill={value <= rating ? '#fbbf24' : 'none'} color={value <= rating ? '#fbbf24' : '#74819b'} /></button>)}</fieldset><label>Your review<textarea rows="5" value={reviewText} onChange={event => setReviewText(event.target.value)} placeholder="What did you enjoy, and what could improve?" /></label><button type="submit" className="cx-primary">Post feedback <ArrowRight size={15} /></button></form> : <div className="cx-empty"><Star size={30} /><p>Enrol in a course to share feedback.</p></div>}</section>
        <section className="cx-panel"><span className="cx-section-kicker">YOUR VOICE</span><h2>My reviews</h2>{reviews.length ? <div className="cx-review-list">{reviews.map(review => { const course = courses.find(item => item.id === review.courseId); return <article key={review.id}><div><strong>{course?.title || 'Course'}</strong><span>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></div><small>{formatDate(review.createdAt)}</small><p>{review.text}</p>{course && <button type="button" className="cx-text-link" onClick={() => onOpenCourse(course.id)}>View course <ArrowRight size={14} /></button>}</article>; })}</div> : <div className="cx-empty"><MessageCircle size={30} /><p>Your course feedback will appear here.</p></div>}</section>
      </div>}

      {section === 'profile' && <div className="cx-support-grid"><section className="cx-panel"><span className="cx-section-kicker">ACCOUNT DETAILS</span><h2>My profile</h2><p className="cx-muted">Keep the name and email shown around your account up to date.</p><form className="cx-form" onSubmit={saveProfile}><label>Full name<input value={profileName} onChange={event => setProfileName(event.target.value)} autoComplete="name" /></label><label>Email address<input value={profileEmail} onChange={event => setProfileEmail(event.target.value)} type="email" autoComplete="email" /></label><button className="cx-primary" type="submit">Save changes <CheckCircle2 size={15} /></button></form></section><section className="cx-panel cx-privacy-panel"><div className="cx-panel-heading"><ShieldCheck size={20} /><h2>About your data</h2></div><p>Courses, orders, support requests, reviews, and profile details are stored in this browser for the prototype. There is no connected account service or database.</p><div className="cx-privacy-note"><Clock3 size={18} /><span>Your activity will be available on this device until browser storage is cleared.</span></div><div className="cx-privacy-note"><Mail size={18} /><span>Support requests are saved here only; no email is sent.</span></div></section></div>}

      <div className="cx-page-footer"><HelpCircle size={14} /> Create.IT prototype · Built with React, Vite, Lucide and browser storage</div>
    </div>
  );
}
