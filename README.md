
## EYET Books
Is a webapp that uses an IT books Api. This is just the front-end to display, sort, search and more upon the data that the API provides.
<img src="https://i.ibb.co/5MmYKVw/eyet.png"/>

## Main functionalities
The main page displays the newest books available to the api.
Consists mainly from three components.

**Header** 
Contains links and number of books in cart.

**Sidebar**
Contains "Categories" buttons. Since the api doesn't have any real categories, these fetch the api with a different "search" parameter. The results are paginated.

**Book List**
The booklist is constructed from smaller book components.
Each displays an image, basic data, add to cart button and favourite/wishlist button.

**Wishlist**
Displays book components if they have been flagged as favourites.
Utilises localstorage.

**Cart**
Displays book components if they have been added to cart. Calculates the total. Utilises localstorage.
**

## What I learned from doing this app / Problems I ran into

 - Started using Reacts useContext hook. And later realised that this   app should use Redux to manage state and update the cart info real-time.
 - Solidified some basic knowledge about useEffect cycle, and .fetch() because on load I needed to get specific books whose ids are in localStorage from the api using a loop and .fetch() 

**
#
In the project directory, you can run
### `npm start`
This runs the app in the development mode on http://localhost:3000/


