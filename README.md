# Getting Started
This repo was originally an assignment for Advanced Computer Security and is a simple cross-platform chat app that communicates over TCP. It's meant to demonstrate encryption between two computers so the user is able to toggle encryption on and off.

## Quick Install Instructions

1. Once downloaded, `cd` into the directory containing the project.
2. Run `npm install` to download the dependencies
3. Run `npm start` to start the app

## Walkthrough

This app can be used to see encryption being used in a useful way. A walkthrough is outlined here to guide the reader through setting up the two clients. It also details a way of listening to the network, finding the messages, and seeing what happens when encryption is turned on.

### Setup
This walkthrough requires and assumes two seperate physical computers connected on the same local area network. The architecture of this system is peer-to-peer, which means there is only one application. This application must be run on both computers at the same time. Once you've downloaded the source code, you need to do the following on both computers.

1. If you don't already have node installed, you need to download it and install it from [here](https://nodejs.org/en/). This will also install npm which is also needed.
2. Open a terminal/cmd and `cd` into the directory containing the downloaded source code.
3. Run `npm install` to download the dependencies
4. Run `npm start` to start the app
5. The apps should start and ask for the IP address of the other computer you want to talk to. It should also tell you you're IP address. You can do this now.
6. Try entering messages and presing enter to send. They should appear on eachothers screens.


### Interceptor Setup
You can use a 3rd party interceptor application to inspect the network. For example, wireshark is a popular application for this. You can download wireshark [here](https://www.wireshark.org/). Once you've downloaded wireshark, you need to select the interface that both computers are on. This will probably be ethernet if you're on a desktop and wireless if you're on a laptop.

![Imgur](http://i.imgur.com/7zx0OKT.png)
