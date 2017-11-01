import Redirect from 'found/lib/Redirect';
import App from './client/components/App.react.jsx';
import Messages from './client/components/Messages.react.jsx';
import NewMessage from './client/components/NewMessage.react.jsx';
import MessageDetails from './client/components/MessageDetails.react.jsx';

export default [
  {
    path: '/',
    Component: App,
    children: [
      new Redirect({
        from: '',
        to: '/messages/1',
      }),
      new Redirect({
        from: 'messages',
        to: '/messages/1',
      }),
      {
        path: 'messages/:page',
        Component: Messages,
      },
      {
        path: 'newmessage',
        Component: NewMessage,
      },
      {
        path: 'details/:id',
        Component: MessageDetails
      }
    ]
  }
];
