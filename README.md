# starbucksMap

## Local development

First you need to install Node.js and npm.

And then download this repository and cd into its directory in cmd:
cd starbucksMap

Install dependencies:

``npm install (http fs url path)``

Copy the sample configuration file and edit it to match your configuration

You can run the application in local website.

``node app.js``

Also you can use nodemon for this. 

``npm install -g nodemon
nodemon app.js``

To make the development server be publicly accessible, you can use ngrok or natapp to solve it.

To create a global website with natapp, you need to fristly download th application and then regist and get a free channel authtoken.
Then run ``natapp -authtoken [yourauthtoken]`` in cmd. Next you can get the website which looks something like this:

http://g76nz3.natappfree.cc/index.html

Then other devices all can visit the website with the address.



MIT License
Crafted by Linda Xiao.
