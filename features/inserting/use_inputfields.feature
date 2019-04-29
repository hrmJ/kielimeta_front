Feature: Using inputfields

   As a user I navigate to /newdataset and
   Interact with different input elements on the page
   in order to type in my data

   @cur
   Scenario: Specifying the resource type

      When the user navigates to /#/newdataset
      Then within 1000 milliseconds the selector "#resourcetype" matches an element in the dom
      When the user clicks "#resourcetype"
      And the user types "parallel" in "#resourcetype input[type='text']"
      Then within 1000 milliseconds a suggestion "parallel corpus" appears

