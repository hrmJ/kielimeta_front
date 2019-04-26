Feature: Quick search

    As a user I navigate to the front page
    and write a few letters in the search box
    on the top in order to filter the list
    of datasets

    Scenario: Succesfull filter

        When the user navigates to /
        Then within 1000 milliseconds the selector "#searchfield" matches an element in the dom
        When the user types "earchabl" in "#searchfield"
        Then within 2000 milliseconds the selector "#resources > ul > li" matches 2 elements in the dom