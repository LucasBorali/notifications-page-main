'use strict';

const mainContainer = document.getElementById('main-container');

const users = [
  {
    name: 'Mark Webber',
    profilePicture: 'assets/images/avatar-mark-webber.webp',
    action: 'reacted to your recent post',
    time: '1m ago',
    event: 'My first  tournament today!',
    read: false,
    id: 123245,
  },
  {
    name: 'Angela Grey',
    profilePicture: 'assets/images/avatar-angela-gray.webp',
    action: 'followed you',
    time: '5m ago',
    read: false,
    id: 1232334,
  },
  {
    name: 'Jacob Thompson',
    profilePicture: 'assets/images/avatar-jacob-thompson.webp',
    action: 'has joined your group',
    time: '1 day ago',
    event: 'Chess Club',
    read: false,
    id: 123245123,
  },
  {
    name: 'Rizky Hasanuddin',
    profilePicture: 'assets/images/avatar-rizky-hasanuddin.webp',
    action: 'sent you a private message',
    time: '5 days ago',
    message: `Hello, thanks for setting up the Chess Club. I've been a member for
    a few weeks now and I'm already having lots of fun and improving my`,
    read: false,
    id: 123245987,
  },
  {
    name: 'Kimberly Smith',
    profilePicture: 'assets/images/avatar-kimberly-smith.webp',
    action: 'commented on your picture',
    time: '1 week ago',
    read: false,
    id: 123245543453,
  },
  {
    name: 'Nathan Peterson',
    profilePicture: 'assets/images/avatar-nathan-peterson.webp',
    action: 'reacted to your recent post',
    time: '1 day ago',
    event: '5 end-game strategies to increase your win rate',
    read: false,
    id: 123254645,
  },
  {
    name: 'Anna Kim',
    profilePicture: 'assets/images/avatar-anna-kim.webp',
    action: 'left the group',
    time: '2 weeks ago',
    event: 'Chess Club',
    read: false,
    id: 1232423425,
  },
];

const displayMessage = function (element) {
  if (!element.message) return '';
  const html = `
    <div class="message">
    ${element.message}
  </div>    
    `;
  return html;
};

const displayEvent = function (element) {
  if (!element.event) return '';
  const event = element.event;
  return event;
};

const displayNumberUnreadNotifications = function (users) {
  const notificationCounter = document.getElementById('notifications-counter');
  const counterContainer = document.getElementById('counter-container');

  const counter = users.filter(element => element.read === false);

  if (counter.length === 0) {
    counterContainer.innerText = 'Notifications';
  }
  notificationCounter.innerText = counter.length;
};

const readNotifications = function (element) {
  if (element.read === false) {
    return 'read';
  } else {
    return '';
  }
};

const renderNotifications = function (element) {
  const html = `
    <div class="notification-box ${readNotifications(element)}" data-id="${
    element.id
  }">
          <div class="notification">
            <img src=${element.profilePicture} alt="profile picture" />
            <div>
              <a href="#">${element.name}</a> ${element.action}
              <a href="#">${displayEvent(element)}</a>
              <div class="time">${element.time}</div>
            </div>
          </div>
          ${displayMessage(element)}
        </div>
   `;

  mainContainer.insertAdjacentHTML('beforeend', html);
};

const allReadBtn = document.querySelector('#all--read--btn');

const markAllRead = function (users) {
  users.forEach(element => (element.read = true));
  return users;
};

let updatedUsers;

const init = function (updatedUsers) {
  mainContainer.innerHTML = '';

  if (updatedUsers !== undefined) {
    updatedUsers.forEach(element => renderNotifications(element));
    displayNumberUnreadNotifications(updatedUsers);
  } else {
    users.forEach(element => renderNotifications(element));
    displayNumberUnreadNotifications(users);
  }
};

allReadBtn.addEventListener('click', function () {
  updatedUsers = markAllRead(users);
  init(updatedUsers);
});

const markRead = function (notificationBox, users) {
  const elementId = notificationBox.getAttribute('data-id');
  const indexId = users.findIndex(element => element.id === +elementId);
  users[indexId].read = true;
  return users;
};

mainContainer.addEventListener('click', event => {
  const clickedElement = event.target;
  const notificationBox = clickedElement.closest('.notification-box');
  if (notificationBox) {
    updatedUsers = markRead(notificationBox, users);
    init(updatedUsers);
  }
});

init(updatedUsers);
