# Real-time collaborative editing

`useYjs` is an experimental, opt-in React hook that adds support for real-time collaborative editing, powered by the [Yjs](https://github.com/yjs/yjs) CRDT framework. This feature enables multiple peers to simultaneously edit the same content without having to manually resolve any conflicts.

## Implementing a transport module

`useYjs` is transport-agnostic, meaning that it does not care how peers communicate with each other. You will need to implement a compatible transport module that handles the communication between peers, and pass that into `<IsolatedBlockEditor>` via the `settings.collab.transport` prop.

In most cases, you would want some kind of WebSocket server or WebRTC signaling server, and implement a transport module to talk to that. However, you could also implement a transport module that only passes messages locally across browser tabs, which is what can be seen in the Storybook demo (run `yarn storybook` to try it).

A `CollaborationTransport` will need to implement the following methods:

- _connect_ `(options: CollaborationTransportConnectOpts) => Promise<{isFirstInChannel: boolean}>` - Join the group of peers, and return whether or not this is the first peer to join. Here you should also set up event handlers to call the provided callbacks whenever messages are received or peers change.
  - _options.user_ `object` - Information about the joined user that should be sent to every peer.
  - _options.onReceiveMessage_ `(message: object) => void` - Callback to be called whenever a message is received from a peer.
  - _options.setAvailablePeers_ `(peers: AvailablePeer[]) => void` - Callback to be called whenever a peer joins or leaves.
  - _options.channelId_ `[string]` - Identifies the group of peers.
- _sendMessage_ `(message: object) => void` - Send message to peers. A message contains information about content or selection changes.
- _disconnect_ `() => Promise<void>` - Leave the group of peers. Called when `<IsolatedBlockEditor>` unmounts.