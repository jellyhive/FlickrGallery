## Intro
This is a react native app created using expo for a code assignment. The app fetches data from Flickr's public API and then displays it in an image gallery

## Installation
- Download and install Node.js
- Navigate into the FlickrGallery root folder and run ´npm install´
- Replace the "INSERT_KEY_HERE" in the .env file with a Flickr API key
- Start the app using ´npm start´
- This will open the Metro Bundler

## Usage
The app can be opened by downloading the expo app on an android or iOS device, and being connected to the same local area network as the machine running the app. To open the app with android press the 'Run on Android device/emulator' button, and open the expo app. With iOS it's possible to scan the QR code with the camera app shown in the Metro Bundler interface to open the app. A prompt will be shown to open the app with expo. 

The app will fetch a certain number of images and display them in a scrolling gallery. Scrolling down will load more images. The search bar can be used to search for images using other Flickr image tags.

## Tests
To run the tests (snapshot test and unit test) navigate to the root folder of FlickrGallery and run ´npm test´

## Evaluation
To test the handling of a slow internet connection, set the timeout constant in the App.ts file to 1.

## Improvement suggestions
If I had more time, here are some areas of improvement:
- More comprehensive testing
- Better handling of reconnecting
- Better offline capabilities using caching of previous API calls to global storage