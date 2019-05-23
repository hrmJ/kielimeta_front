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

	Scenario: Deleting added language when two languages set

      When the user navigates to /#/newdataset
      Then within 1000 milliseconds the selector "#addlanguage" matches an element in the dom
			Then within 1000 milliseconds "#addlanguage" is visible
      And the user clicks "#addlanguage"
      Then within 3000 milliseconds the selector "#lang_0" matches an element in the dom
      And the user clicks "#lang_0_langselect"
      And the user types "suomi" in "#lang_0_langselect input[type='text']"
      And after 1000 milliseconds the user types "ENTER" in "#lang_0_langselect input[type='text']"
			And within 1000 milliseconds the xpath "//div[@id='lang_0_langselect']//div[text()='suomi']" matches an element in the dom
			But the user clicks "#addlanguage"
      And the user types "ruotsi" in "#lang_1_langselect input[type='text']"
      And after 1000 milliseconds the user types "ENTER" in "#lang_1_langselect input[type='text']"
			And the user clicks "#lang_0>.fa-window-close"
			And within 1000 milliseconds the xpath "//div[@id='lang_0_langselect']//div[text()='suomi']" doesn't match an element in the dom


	Scenario: Deleting added language when only first language

      When the user navigates to /#/newdataset
      Then within 1000 milliseconds the selector "#addlanguage" matches an element in the dom
			Then within 1000 milliseconds "#addlanguage" is visible
      And the user clicks "#addlanguage"
      Then within 3000 milliseconds the selector "#lang_0" matches an element in the dom
      And the user clicks "#lang_0_langselect"
      And the user types "suomi" in "#lang_0_langselect input[type='text']"
      And after 1000 milliseconds the user types "ENTER" in "#lang_0_langselect input[type='text']"
			And within 1000 milliseconds the xpath "//div[@id='lang_0_langselect']//div[text()='suomi']" matches an element in the dom
			But the user clicks "#addlanguage"
			And the user clicks "#lang_0>.fa-window-close"
			And within 1000 milliseconds the xpath "//div[@id='lang_0_langselect']//div[text()='suomi']" doesn't match an element in the dom

	@cur
	Scenario: Adding a new language and specifying a new variant

      When the user navigates to /#/newdataset
      Then within 1000 milliseconds the selector "#addlanguage" matches an element in the dom
			Then within 1000 milliseconds "#addlanguage" is visible
      And the user clicks "#addlanguage"
      Then within 3000 milliseconds the selector "#lang_0" matches an element in the dom
      And the user clicks "#lang_0_langselect"
      And the user types "newlanguage" in "#lang_0_langselect input[type='text']"
      And after 1000 milliseconds the user types "ENTER" in "#lang_0_langselect input[type='text']"
      Then within 3000 milliseconds the selector "#lang_0_newcode" matches an element in the dom
      And the user clicks "#lang_0_variantselect"
      And the user types "new variant" in "#lang_0_variantselect input[type='text']"
      And after 1000 milliseconds the user types "ENTER" in "#lang_0_variantselect input[type='text']"
      Then within 3000 milliseconds the selector "#lang_0_variant_type_select" matches an element in the dom



