Feature: Access login screen

    As a user I click the login link
    in order to find a way to get authenticated

    @cur
    Scenario: Clicking the login link

        When the user navigates to /
        Then within 1000 milliseconds the selector "#loginlink" matches an element in the dom