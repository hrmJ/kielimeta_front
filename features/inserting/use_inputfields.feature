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

   Scenario: Specifying keywords

      When the user navigates to /#/newdataset
      Then within 1000 milliseconds the selector "#keyword" matches an element in the dom
      When the user clicks "#keyword"
      And the user types "dial" in "#keyword input[type='text']"
      Then within 1000 milliseconds a suggestion "dialects" appears


   Scenario: Specifying temporal coverage

      When the user navigates to /#/newdataset
      Then within 1000 milliseconds the selector "#addlanguage" matches an element in the dom
      And the user clicks "#addlanguage"
      And within 1000 milliseconds the selector "#startyear" matches an element in the dom
      And within 1000 milliseconds the selector "#endyear" matches an element in the dom


   Scenario: Specifying size

      When the user navigates to /#/newdataset
      Then within 1000 milliseconds the selector "#addlanguage" matches an element in the dom
      And the user clicks "#addlanguage"
      And within 1000 milliseconds the selector "#wordcount" matches an element in the dom