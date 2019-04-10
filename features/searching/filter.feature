Feature: Filtering datasets

    As a user I navigate to the front page
    and limit the number of datasets visible by using different kinds
    of filters

    Scenario: Limiting by languages

        When the user navigates to /
        Then within 1000 milliseconds the selector "#resources > ul > li" matches at least 20 elements in the dom
        And within 10 milliseconds "#langfilter_menu" is not visible
        But the user clicks "#langfilter"
        And within 10 milliseconds "#langfilter_menu" is visible
        And the user clicks "#langfilter_menu input[value='af-ZA']"
        Then after 1000 milliseconds the selector "#resources > ul > li" matches less than 20 elements in the dom


    Scenario: Mixing the filtering methods
        #TODO: record the values and compare those, not bare numbers!

        When the user navigates to /
        Then within 1000 milliseconds the selector "#resources > ul > li" matches at least 20 elements in the dom
        And the user clicks "#langfilter"
        And the user clicks "#langfilter_menu input[value='fi'], #langfilter_menu input[value='fi-FI']"
        Then after 1000 milliseconds the selector "#resources > ul > li" matches less than 20 elements in the dom
        And the user types "s" in "#searchfield"
        Then after 1000 milliseconds the selector "#resources > ul > li" matches less than 20 elements in the dom
        And the user types "BACKSPACE" in "#searchfield"
        Then after 1000 milliseconds the selector "#resources > ul > li" matches less than 20 elements in the dom
        Then within 1000 milliseconds the selector "#langfilter input" matches at least 7 elements in the dom


    Scenario: Using both lang and resourcetype filters
        #TODO: record the values and compare those, not bare numbers!

        When the user navigates to /
        Then within 1000 milliseconds the selector "#resources > ul > li" matches at least 20 elements in the dom
        And the user clicks "#langfilter"
        And the user clicks "#langfilter_menu input[value='fi'], #langfilter_menu input[value='fi-FI']"
        Then after 1000 milliseconds the selector "#resources > ul > li" matches less than 20 elements in the dom
        And the user clicks "#typefilter"
        And the user clicks "#typefilter_menu input[value='parallel corpus']"
        Then after 1000 milliseconds the selector "#resources > ul > li" matches less than 15 elements in the dom
        And the user clicks "#typefilter_menu input[value='parallel corpus']"
        Then after 1000 milliseconds the selector "#resources > ul > li" matches less than 20 elements in the dom

    @cur
    Scenario: Seeing the reset button

        When the user navigates to /
        Then within 1000 milliseconds the selector "#resources > ul > li" matches at least 20 elements in the dom
        And within 1000 milliseconds "#langfilter .clearfilter" is not visible
        But the user clicks "#langfilter"
        And the user clicks "#langfilter_menu input[value='fi'], #langfilter_menu input[value='fi-FI']"
        Then within 1000 milliseconds "#langfilter .clearfilter" is visible

    Scenario: Resetting an individual filter

        When the user navigates to /
        Then within 1000 milliseconds the selector "#resources > ul > li" matches at least 20 elements in the dom
        And the user clicks "#langfilter"
        And the user clicks "#langfilter_menu input[value='fi'], #langfilter_menu input[value='fi-FI']"
        And the user clicks "#langfilter_menu button"
        Then after 1000 milliseconds the selector "#resources > ul > li" matches less than 20 elements in the dom
        But the user clicks "#langfilter .close"

#TODO: STILL NOT GOOD! after using the searchbox langfilters not working as expected
