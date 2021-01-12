#Spatial Drawing/Editing Tool

Driving around town, picking up and dropping off customers in an efficient way, requires well trained algorithms. These algorithms require high quality spatial data to base decisions upon. As we know, data is never perfect, and sometimes it needs a bit of human interference in order to make it such.

In this task you are required to create an application which enables the user to modify spatial objects over map. The application should include two components, interactive  map and  table (or other similar representation, for example array of cards) which includes information about drawn spatial objects. You can use any interactive map. Changes in table should be reflected on the map and vice versa.

The following features should be included:
1) Map should include controls for modifying spatial objects.
2) Spatial objects can be polygons only.
3) Table should include the following information about objects:
    * Creation date
    * Name - (randomly selected from your list of names)
    * Color - (randomly selected from your list of colors)
    * Comment
4) The user should be able to modify values in the table and these changes should be reflected on the map.
5) Hovering table row should indicate which spatial object it is and the opposite hovering spatial object should indicate which row in table it is.

● [Data source](https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Election_Districts_Water_Included/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson)  to use in this task

Important points:
1. Code simplicity and readability
2. Less code is always better code
 
 3. Simple instructions to run the code
○ You can use a docker compose in order to build and run the backend and
frontend.
4. App should run consider large number of objects
5. How would you rate the map render performance?
6. How would you improve the map performance?
