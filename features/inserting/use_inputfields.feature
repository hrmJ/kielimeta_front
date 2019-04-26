Feature: Using inputfields

   As a user I navigate to /newdataset and
   Interact with different input elements on the page
   in order to type in my data

   Scenario: Specifying the resource type

      When the user navigates to /newdataset
      Then within 1 milliseconds the selector "#resourcetype" matches an element in the dom
      When the user types "parallel" in "#resourcetype"
      Then within 1 milliseconds a suggestion appears in the input

