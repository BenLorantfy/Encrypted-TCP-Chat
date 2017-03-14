# Getting Started
This repo was originally an assignment for Advanced Computer Security and is a simple cross-platform chat app that communicates over TCP. It's meant to demonstrate encryption between two computers so the user is able to toggle encryption on and off.

## Quick Install Instructions

1. Once downloaded, `cd` into the directory containing the project.
2. Run `npm install` to download the dependencies
3. Run `npm start` to start the app

## Walkthrough

This app can be used to see encryption being used in a useful way. A walkthrough is outlined here to guide the reader through setting up the two clients. It also details a way of listening to the network, finding the messages, and seeing what happens when encryption is turned on.

### Setup
This walkthrough requires and assumes two separate physical computers connected on the same local area network. The architecture of this system is peer-to-peer, which means there is only one application. This application must be run on both computers at the same time. Once you've downloaded the source code, you need to do the following on both computers.

1. If you don't already have node installed, you need to download it and install it from [here](https://nodejs.org/en/). This will also install npm which is also needed.
2. Open a terminal/cmd and `cd` into the directory containing the downloaded source code.
3. Run `npm install` to download the dependencies
4. Run `npm start` to start the app
5. The apps should start and ask for the IP address of the other computer you want to talk to. It should also tell you you're IP address. You can do this now.
6. Try entering messages and pressing enter to send. They should appear on each others screens.


### Interceptor Setup
You can use a 3rd party interceptor application to inspect the network. For example, wireshark is a popular application for this. You can download wireshark [here](https://www.wireshark.org/). Once you've downloaded wireshark, you need to select the interface that both computers are on. This will probably be ethernet if you're on a desktop and wireless if you're on a laptop.

![Imgur](http://i.imgur.com/7zx0OKT.png)

Next you need to add filters to restrict the traffic to just the data going between the two computers running the apps. Make sure to click the blue arrow beside the filter textbox to apply the filters.

![Imgur](http://i.imgur.com/JbdhabD.png)

### Clear Text Test

The next step is to test intercepting clear text messages. Without the encryption box checked, try sending messages between the two apps. The transmission should show up in wireshark like below.

![Imgur](http://i.imgur.com/FCOp2zi.png)

You should be able to see the message in cleartext like shown above. This is a concern because anybody can do what we just did and snoop on your messages. You can see how we can remedy this in the next section.

### Encrypted Text Test
Now try the same test as above but click the encryption checkbox on each app. This time when you try sending the message, it's encrypted before being sent and appears as random noise in wireshark as shown below.

![Imgur](http://i.imgur.com/B2KdMyb.png)

If you look at the other app now, you should be able to see the clear text message appear on the screen. This is because it was decrypted using the same key that was used to encrypt it. This prevents prying eyes from trying to eavesdrop and is a core principle in any type of sensitive communication such as in the banking industry or military.
