- - -
### Wikipedia Scraping Lab
---
- - -
Welcome! Here we will learn how to create the wikipedia scraper found on the
todays info section of this website. Starting this project, we have a couple of goals
in mind. We want to learn more about BeautifulSoup and Requests modules, which are used
in the webscraping process. We want to learn more behind the structure of html pages and
automatisation that can be done there. Any self respecing computer scientist does not look
to create more work where less work works just as well. We also want to to tie this to startup.
- - -
From above we can pull the following broad questions
* How does web scraping work?
* How can I make this as automated as possible
* What tools and processes are involved
* What steps can I take to efficiently make my script generic?
As we continue, these broad questions will be brokenb down with each sub-question
labeled 1.a, 2.b, etc.
- - -
Alright. Let us start with defining our overarching problem.  
  
1.a What is web scraping?  
  
Web Scraping is the act of extracting data from a site and then using that data
is some way. Most commonly, this extraction is of plain html elements, such as prices
text, or list elements, however one can also extract metadata from pages.  
&nbsp;

This leads us to our next question. We've defined web scraping, but this has left us with another
topic to define. This is a very common occurance in cs, when we peel back a layer of abstraction, we get more questions
- - -
1.b What structure is involved in a web page?
&nbsp;    

Below is an snipit of the html for wikipedia's December 21 page. This is the juicy information.
html, along with javascript and css, form the basis for every website on the internet. html
provides the structure and content, css the layour and pretification, and javascript interactivity
and functionality. The easisiest way to look at html is to inspect element. We are going to focus
on the li tags, these are the lists of events per era.  
&nbsp;

![html structure](/wikipediaImages/wikipedia.PNG)  
&nbsp;  

All of that is great, and a lot of information. If we are to do anything with this we must get it into
our program which, well, that's a good question. How does tsome program that lives on your
computer and/or github get info from a website that may be hosted on a server halfway across the world?
- - -
2/3.a How do we get this info to our program?  
&nbsp;  

This is where requests come in. http is a lovely little thing we take for granted and most cs students just overlook, but using the requests module, which is built on top of older http libraries, we can get all the info we need. The request module is so popular, there is currently a push to get it included in python by default. We can create a request object that gets the page for the current date. We'll come back to the question of the date later, but for now let's say it is hardcoded as December_13.

We do not (sadly) need to get into the weeds on how http works, but here is a simple explanation. http allows us to communicate requests and responces between two places, call one a client, who requests, and a server, who responds. When we connect to some website, that site is really hosted somewhere on some webserver, and through TCP and IP (transport and internet layers) we get there and have a connection. Great. http then allows for us to actually send a representation the current state of the site from the server to the client so we see all the pretty text and images and all the rest. When we do this with the request module, we are sending a GET request that will retrieve all the data aka html and css nonsense. Notably, we also want ensure the webpage we get is ok, so we check for status code 200, the ok signal that servers send the client after a successful GET.  

Now that we know it is possible to get this information and check that it is correct, then we can move to our design. It is imperitive to think about the design and structure of a program before starting. We think both about the problem itself and the structure behind the problem and we think about the structure of our solutions.
- - -
4.a What structurly do I expect to need in the code?
&nbsp;  

This is a large question, a shockingly large and important question. We know that a couple steps are needed. Broadly, get date, get data, parse data, and get events.  
* getDate(): fairly simple, nearly all computers have clocks (or well, all if you count the clock unit). Getting the date is relatively trivial, we just then need to concatenate the right form of it to "https://en.wikipedia.org/wiki
* getSiteData(): this is the big boy, main driver. Once we get the date, we can make the requester, send an GET request and then, if we have a 200 response, begin to process
* processData(): We need to parse the data we receive as html that way it is in a useable format instead of a long string and then pull all text out of it, and work the document's sections. The wikipedia pages we are scraping are divided into four sections; events, births, deaths, and holidays. Each of these parts are broken into three subparts, pre1600, early modern period, and modern period. This logically means we should have another function.
* processSection(): For each section, we can separate the subsections as lists of facts contained within.
* getRandomEvents(): a simple function get random events from the subsections.

&nbsp;  
This gives us a rough idea of the intitial tasks we will need. With this, we now can begin coding. Note the imports at the top. Of these, requests is needed for the http requests and bs4 from BeautifulSoup is needed for parsing the html.
&nbsp;  

![skeleton structure of the code](/wikipediaImages/initialCodeStructure.PNG)

- - -
let's start with getSiteData(): first since this function is the entry point of our program. Firstly, we know we need to get the current date, so call the getDate() function, and execute a request, afterwhich we check the response code. After this, we should be good to process. The function getDate is fairly simple to implement as well.
&nbsp;  

![getSiteData function](/wikipediaImages/getSiteData.PNG)

&nbsp;  

Next in the pipeline is processData(requestor). Remember that knowing the structure of the website being scraped is imperative. With this in mind, we have a really important question.  

4.b What elements of the html code or website text/structure can be used to deliminate sections?  

There are no single elements we can split on to get out the sections we want, looking for [edit] would pull every header and subheader while looking for things like the headers would mean if they are ever repeated our code breaks. Luckily, we can put the two together after realising that all headers are formatted Header[edit], which is not a word that can repeat anywhere. This gives us a great way to get the text between the headers. We will use a similar trick to split up the subheaders as well.
&nbsp;  

![processSection function](/wikipediaImages/regex.PNG)
&nbsp;  

Now with that question answered, the coding itself is fairly self explanitory. We create a list to hold the events we will select, use our html parser to parse the date and pull out all the text, and then perform the splits. This leaves us to process the sections. For the sake of simplicity, we will start by processing only on section.
&nbsp; 

![processData function](/wikipediaImages/processData.PNG)
&nbsp;  

Next is processSection(event_string), and let's start out with some data sanitisation. Wikipedia has a large number of footers that are denoted within the text itself. This is something I do not want or need to see, so we can remove them all. We can do so quite nicely with regular expressions. Regular expressions are a powerful tool for data processing and computing in general when applied in their role as operators on regular languages. the regular expression we care about looks for all cases of [x] where x is some integer. As I alluded to earlier, we also split over [edit] to get the subsections, however this gives us the subsections as one long string each.  

Because of the fact that each are now string representations of the li html elements effectively, we can split these on newlines and include all but the last element to ignore the next sections's header. We also can remove any blank lines wikipedia adds in for formatting using list comprehension, and finish off by getting our random events.
&nbsp;  

![processSections routine](/wikipediaImages/processSections.PNG)
&nbsp;  

Getting our random events gives us another interesting question. From a design perspective, and aethstetic one, we do not want to grab too many events, and there is no way of telling until we get here how many events there are.  

4.c How can we get a consistent random selection for all sections, not just one?  

We know that there are 10 sections we care about total, so let's take three events from each. If a section, has less than three, let's just take the whole section. This really will only apply on some days where we have a particularly small pre1600 section With that structure in mind now, we can code.
&nbsp; 

![processSections routine](/wikipediaImages/random.PNG)
&nbsp;  

When we put all of these peices together, we are nearly complete. Everything related to pulling the facts from a specific subsection of a page is done, and since we made sure to follow the line of questioning stemming from 4 and 2, it is easily expandible to include the other sections. After attempting on your own to follow the template so far to add the other sections, click here to see my source code with all sections filled out
- - -

Great! Now we have a very fun and interesting problem left. We need to incorporate some way to take these lists of events and embed them into an html page.
&nbsp;  

2.b How can we structure the html page this information will end up on to make our code as simple as possible?  

We have a list of events, three from each section, and nine sections. This looks like a series of lists! html has a tag for this. The ul tag creates an unordered list and the li tag creates list elements. By having an li tag for each fact we insert, so 27 total, we can look to pull these all and match one to one. click here to see the html page source code.

Pulling out those elements is not hard. Using the find_all() method from BeautifulSoup, we pull all of these and can edit their string content. After doing this, we just need to write to the file!
&nbsp;  
![main routine](/wikipediaImages/main.PNG)
&nbsp;  
