function init()
{
    updateFeeds();
}

// Function gets the selected region and then sends info to getImages()
function updateFeeds()
{
    camera_count = 0;
    rows = 0;
    removeCurrentFeeds();
    // Get the selection menu
    var selection = document.getElementById("segment_selection");
    var selected_area = document.getElementById("selected_area");
    // Get the selected value
    var region = selection.options[selection.selectedIndex].value;
    selected_area.innerHTML = selection.options[selection.selectedIndex].innerHTML;
    // Send value to getImages
    getImages(region);
}

/* Function that gets the correct image link, creates a dict of them and sends
   dict to setImageS() */
function getImages(region)
{
    var all_regions = ["AG", "AT", "SLO", "PB", "PR", "SM"];
    // See the getFeeds() function for what this var is
    var allfeeds = getFeeds();
    var regional_feeds = null;

    // Get current time to append to our images
    var current_time = Date.now();

    // get an Array containing dicts of the selected region (if it's not "ALL")
    if (region != "ALL") 
    {
        regional_feeds = allfeeds[region];

        // Now we are going to append to the IMG links with our current time in milliseconds
        // Iterate through each Camera dictionary in the array
        for (var i = 0, len = regional_feeds.length; i < len; i++)
        {
            regional_feeds[i].img += ("?" + current_time);
        }
        
        // Now go set the image feeds
        var row = null;
        row = setImages(regional_feeds, row);    
        var camera_div = document.getElementById("camera_table");
        camera_div.appendChild(row);
    }
    else 
    {
        regional_feeds = allfeeds; 
        var row = null;       
        for (var n = 0, l = all_regions.length; n < l; n ++)
        {
            for (var i = 0, len = regional_feeds[all_regions[n]].length; i < len; i++)
            {
                regional_feeds[all_regions[n]][i].img += ("?" + current_time);
            }
            // Now go set the image feeds
            row = setImages(regional_feeds[all_regions[n]], row); 
        }

        var camera_div = document.getElementById("camera_table");
        camera_div.appendChild(row);
    }
}

/* Function that sets the provided images and titles of the feeds onto the html
    in table rows of 5 */
var rows = 0;
var camera_count = 0;
function setImages(cameras, row)
{
    var feed_row;
    // check if it's the first row to be added
    if (row == null)
    {
        feed_row = document.createElement('div');
        feed_row.id = "camera_row_" + rows;
        feed_row.style = "display:table-row";
    }
    else
    {
        feed_row = row;
    }
    // Get the Camera table
    var camera_div = document.getElementById("camera_table");
    

    for (var i = 0, len = cameras.length; i < len; i++, camera_count++)
    {
        var img = document.createElement("img");
        var lbl = document.createElement("h4");
        var div = document.createElement('div');

        // We've maxed the row, time to make a new row
        if (camera_count != 0 && camera_count%5 == 0)
        {
            camera_div.appendChild(feed_row);
            rows++;
            feed_row = document.createElement('div');
            feed_row.id = "camera_row_" + rows;
            feed_row.style = "display:table-row";
        }

        div.style = "display:table-cell";
        img.src = cameras[i].img;
        lbl.innerHTML = cameras[i].name;

        div.appendChild(lbl);
        div.appendChild(img);
        feed_row.appendChild(div);
    }
    return feed_row;
}

function removeCurrentFeeds()
{
    var camera_div = document.getElementById("camera_table");
    while (camera_div.hasChildNodes())
    {
        console.log("Removed a child");
        camera_div.removeChild(camera_div.lastChild);
    }
}

/* Function populates a dictionary of arrays of dictionarys (complicated, I know)
 Heres the nested mess:
  OUTER DICTIONARY:
      1st KEY - REGION ("PR", "AT", etc.)
      1st VALUE - ARRAY OF DICTIONARIES
          ARRAY INDEXES - Point to a DICTIONARY
              INNER DICTIONARIES:
                  1st KEY - NAME
                  1st VALUE - the name of the camera, i.e. 'US-101 - Paso Robles : SR-46 East'
                  2nd KEY - IMG
                  2nd VALUE - URL of the image of the feed snapshot
 The good news is by using this we can simply filter what region we want by doing this:
      var pismo_beach_feeds = all_feeds["PB"];
 This will give us an array that points to the individual dictionaries containing  names/images of all
 pismo beach traffic cameras */
function getFeeds() 
{
    var feeds = {
    "PR" : [ 
        {"name":'US-101 - Paso Robles : SR-46 East',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/SR-46-East.jpg'} 
    ],
    "AT" : [ 
        {"name":'US-101 - Atascadero : Hwy 101 in Atascadero at Traffic Way',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Traffic-Way.jpg'},
        {"name":'US-101 - Atascadero : US 101 at Hwy 41 West in Atascadero',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Hwy-41-West.jpg'},
        {"name":'US-101 - Atascadero : Curbaril',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Curbaril.jpg'},
        {"name":'US-101 - Atascadero : Hwy 101 in Atascadero at Santa Rosa Rd',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Santa-Rosa-Road.jpg'},
        {"name":'US-101 - Atascadero : Hwy 101 in Atascadero at Santa Barbara Rd',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Santa-Barbara-Road.jpg'},
        {"name":'US-101 - Atascadero : Hwy 101 in Atascadero : SR-58',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/SR-58.jpg'}
    ],
    "SLO" : [{"name":'US-101 - San Luis Obispo : Fox Hollow',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Fox-Hollow.jpg'},
        {"name":'US-101 - San Luis Obispo : Broad Street',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Broad-Street.jpg'},
        {"name":'US-101 - San Luis Obispo : Marsh Street',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Marsh-Street.jpg'},
        {"name":'US-101 - San Luis Obispo : Monterey Street',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Monterey-Street.jpg'},
        {"name":'US-101 - San Luis Obispo : Madonna Road',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Madonna-Road.jpg'},
        {"name":'US-101 - San Luis Obispo : Los Osos Valley Road',
        "img":'http://www.dot.ca.gov/cwwp2/data/d5/cctv/image/Los-Osos-Valley-Road.jpg'},
        {"name":'US-101 - San Luis Obispo : South Higuera Street',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/South-Higuera.jpg'},
        {"name":'US-101 - San Luis Obispo : San Luis Bay Drive',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/San-Luis-Bay-Drive.jpg'}
    ],
    "PB" : [{"name":'US-101 - Pismo Beach : Avila Beach Drive',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Avila-Beach-Drive.jpg'},
        {"name":'US-101 - Pismo Beach : Spyglass',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Spyglass.jpg'},
        {"name":'US-101 - Pismo Beach : Mattie Road',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Mattie-Road.jpg'},
        {"name":'US-101 - Pismo Beach : Dolliver',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Dolliver.jpg'},
        {"name":'US-101 - Pismo Beach : 4th Street',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/4th-Street.jpg'}
    ],
    "AG" : [{"name":'US-101 - Arroyo Grande : Camino Mercado',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Camino-Mercado.jpg'},
        {"name":'US-101 - Arroyo Grande : Grand Avenue',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Grand-Avenue.jpg'}
    ],
    "SM" : [{"name":'US-101 - Santa Maria : SR-135 Broadway',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/SR-135.jpg'},
        {"name":'US-101 - Santa Maria : US 101 at Union Valley Parkway in Santa Maria',
        "img":'http://www1.dot.ca.gov/cwwp2/data/d5/cctv/image/Union-Valley-Parkway.jpg'}
    ]};
    return feeds;
}