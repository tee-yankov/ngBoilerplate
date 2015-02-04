# A simple boilerplate for Angular with an Express backend and Gulp as a build tool
## Includes:
- Angular.js Frontend
- Express Backend
- Gulp Configuration

## Instructions:
1. Clone the project in an empty folder.
2. Run npm install.
3. Install bower and gulp globally (npm install -g bower gulp).
4. Run bower install in the directory.
5. Set up a mongodb server with default credentials on port 27017 (also default)
6. Run gulp serve and you should be golden.

## Troubleshooting:
### Mongoose warning about failing to load the BSON extension.
Recompile using the correct version of Python. Node-gyp is used in building the extension and it doesn't like Python 3 at all. Simply reinstall mongoose and give it the path to the right Python binary (2.7 works fine for me).
    
    npm install --python=/usr/bin/python2.7 mongoose
### Bcrypt fails to build.
Explanation is same as above. Reinstall bcrypt with the correct python binary.
    
    npm install --python=/usr/bin/python2.7 bcrypt
    
## TODO:
- Clean up some unneeded modules (lots of those).
