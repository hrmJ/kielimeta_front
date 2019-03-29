Feature: List all datasets

  As a user I browse to the front page in order to see a list of all the
  datasets (=linguistic research resources=corpora) available. If there
  are a lot of them, the list is paginated.

  Scenario: Seeing a list of datasets

    When the user navigates to /
    Then within 1 seconds the selector "ul" matches an element in the dom
    And within 3 seconds the selector "ul > li" matches an element in the dom
  #And within 5 seconds the previous element should have a li as a child
  #    And the li should have a span as a child
  #    And the span should contain a name of a resource
  #    And the name should be of length > 0

  Scenario: Seeing a search field

    When the user navigates to /
    Then within 1 seconds the selector "#searchfield" matches an element in the dom