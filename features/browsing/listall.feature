Feature: List all datasets

  As a user I browse to the front page in order to see a list of all the
  datasets (=linguistic research resources=corpora) available. If there
  are a lot of them, the list is paginated.

  Scenario: Succesfull listing

    When the user navigates to /
    Then the #resources element should have a ul as a child
    And the previous element should have a li as a child
#    And the li should have a span as a child
#    And the span should contain a name of a resource
#    And the name should be of length > 0