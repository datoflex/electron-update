const { app, BrowserWindow } = require('electron')
const path = require('path')
const got = require('got');
const cheerio = require('cheerio');
const searchlinks = [];
const URL = 'https://www.dialog-telemarketing.de/';
const extractLinks = async (url) => {
  try {
    // Fetching HTML
    const response = await got(url);
    const html = response.body;

    // Using cheerio to extract <a> tags
    const $ = cheerio.load(html);

    const linkObjects = $('a');
    // this is a mass object, not an array

    // Collect the "href" and "title" of each link and add them to an array
    const links = [];
    linkObjects.each((index, element) => {
      console.log(links.includes($(element).attr('href')))
      if(!links.includes($(element).attr('href'))&&!$(element).attr('href').replace(URL,"")=="") {
        links.push(
          //text: $(element).text(), // get the text
          $(element).attr('href').replace(URL,"") // get the href attribute
        );
      }
    });

    console.log(links);
    // do something else here with these links, such as writing to a file or saving them to your database
  } catch (error) {
    console.log(error.response.body);
  }
};

// Try it
function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html')
  }


  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    extractLinks(URL);
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })  


