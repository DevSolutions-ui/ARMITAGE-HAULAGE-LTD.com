const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  menuToggle.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) {
      menuToggle.setAttribute('aria-label', 'Open menu');
      menuToggle.textContent = '☰';
    }
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const quoteForm = document.querySelector('#quote-form');
const formSuccess = document.querySelector('#form-success');
const newEnquiry = document.querySelector('#new-enquiry');

quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  quoteForm.hidden = true;
  formSuccess.hidden = false;
});

newEnquiry?.addEventListener('click', () => {
  formSuccess.hidden = true;
  quoteForm.hidden = false;
  quoteForm.reset();
});

const chatPanel = document.querySelector('#chat-panel');
const chatOpen = document.querySelector('#chat-open');
const chatClose = document.querySelector('#chat-close');
const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const chatMessages = document.querySelector('#chat-messages');
const quickReplies = document.querySelector('#quick-replies');

const getReply = (input) => {
  const message = input.toLowerCase();
  if (message.includes('quote') || message.includes('price') || message.includes('cost')) {
    return 'We can talk through the load, route and timing. Share the details in the enquiry form, or call +44 7889 901082 for a direct conversation.';
  }
  if (message.includes('service') || message.includes('haulage') || message.includes('transport')) {
    return 'We help with haulage, collection and delivery, with practical route thinking and clear communication from the first conversation.';
  }
  if (message.includes('where') || message.includes('address') || message.includes('location')) {
    return 'You can find us at Woodward Rd, Liverpool L33 7UZ, United Kingdom.';
  }
  if (message.includes('open') || message.includes('hour') || message.includes('time')) {
    return 'The listing shows us as closed now, opening at 8am Monday.';
  }
  if (message.includes('call') || message.includes('phone') || message.includes('number')) {
    return 'You can call Armitage Haulage directly on +44 7889 901082.';
  }
  if (message.includes('review') || message.includes('rating')) {
    return 'Armitage Haulage is rated 4.7 from 11 reviews.';
  }
  return 'Thanks for your message. The quickest way to get a clear answer is to call +44 7889 901082 or send an enquiry with your load, route and timing.';
};

const addMessage = (text, type) => {
  const message = document.createElement('div');
  message.className = `chat-message ${type}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const sendChatMessage = (value) => {
  const message = value.trim();
  if (!message) return;
  addMessage(message, 'user');
  addMessage(getReply(message), 'bot');
  chatInput.value = '';
  quickReplies.hidden = true;
};

chatOpen?.addEventListener('click', () => {
  const isOpen = !chatPanel.hidden;
  chatPanel.hidden = isOpen;
  chatOpen.setAttribute('aria-expanded', String(!isOpen));
  chatOpen.innerHTML = isOpen ? '◌ <span>Chat with us</span>' : '×';
  if (!isOpen) chatInput.focus();
});

chatClose?.addEventListener('click', () => {
  chatPanel.hidden = true;
  chatOpen.setAttribute('aria-expanded', 'false');
  chatOpen.innerHTML = '◌ <span>Chat with us</span>';
});

quickReplies?.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', () => sendChatMessage(button.textContent));
});

chatForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  sendChatMessage(chatInput.value);
});