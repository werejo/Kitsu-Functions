This is a little (hacky) script I made for personal functionalities within Kitsu.io

The script will load buttons on the right sidebar for ease of reach. <br/>
Due to me being an ember-noob, this is done totally in javascript/jQuery with some clever workarounds (at least I think they are clever...)<br/>

This script's functionalities are mostly for usage on Kitsu.io's homepage and have not been tested/tried on most other pages, since this script was written for my personal use and the homepage is the area that I most interact with.

The Functionalities are as followed : <br/>
<strong>(¬‿¬ ) Button </strong>: Un-NSFW button. Will ungate all NSFW currently visible posts (visible meaning those that have already loaded.) Truly (¬‿¬ ).<br/>
<strong>View More Button </strong>: Expands all view-more-able posts. <br/>
<strong>View Less Button </strong>: Contracts all view-less-able posts.<br/>

-----------------------------------------

I realized that having a constantly shifting view-space due to all the expanding and contracting of posts can leave someone a little lost, so here are some other functionalities I created to help alleviate some of that lostlessnessityingly lost feeling.<br/>

<strong>Create Pins Button </strong>: Creates a "Pin This Post" button that appears on the top right corner of all visible posts.<br/>
<strong>To Pinned Button </strong>: Scrolls page to the 'anchor' post.<br/>
<strong>Pin This Post Button </strong>: Assigns this post as the 'anchor' post. <br/>

-----------------------------------------

Navigation away and back into the homepage will result in the buttons disappearing. <br/>
I have no knowledge of how ember loads pages so I couldn't hook my buttons to load with it. <br/>
A simple workaround I found, was to load the buttons again according to the user's wishes. <br/>
I have assigned the <strong>[ctrl key + space key]</strong> key combination to load the buttons if they don't already exists.<br/>
