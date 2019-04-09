Feature: Filtering datasets

    As a user I navigate to the front page
    and limit the number of datasets visible by using different kinds
    of filters

    @cur
    Scenario: Limiting by languages

        When the user navigates to /
        Then within 1000 milliseconds the selector "#resources > ul > li" matches at least 20 elements in the dom
        And within 10 milliseconds "#langfilter_menu" is not visible
        But the user clicks "#langfilter"
        And within 10 milliseconds "#langfilter_menu" is visible
        #And the user clicks "#langfilter_menu input[value='fi-FI'], #langfilter_menu input[value='fi']"
        And the user clicks "#langfilter_menu input[value='af-ZA']"
        And the user clicks "#langfilter_menu button"
        Then after 1000 milliseconds the selector "#resources > ul > li" matches less than 20 elements in the dom
# And the filter list contains as many elements as it did before the filter?
# BUT if the search was used, that should not be the case...
# TODO: by default all values clicked?
# TODO: make the checkboxes controlled
# TODO: button for resetting the search