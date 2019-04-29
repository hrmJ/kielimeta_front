Feature: Using inputfields

   As a user I navigate to /newdataset and
   Interact with different input elements on the page
   in order to type in my data

   Scenario: Specifying the resource type

      When the user navigates to /#/newdataset
      Then within 1000 milliseconds the selector "#resourcetype" matches an element in the dom
      When the user clicks "#resourcetype"
      And the user types "parallel" in "#resourcetype input[type='text']"
      Then within 1000 milliseconds a suggestion "parallel corpus" appears

   @cur
   Scenario: Specifying keywords

      When the user navigates to /#/newdataset
      Then within 1000 milliseconds the selector "#keyword" matches an element in the dom
      When the user clicks "#keyword"
      And the user types "dial" in "#keyword input[type='text']"
      Then within 1000 milliseconds a suggestion "dialects" appears


