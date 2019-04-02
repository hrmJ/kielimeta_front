Feature: Creating a new dataset

  As a (TODO: authenticated) user I open the correct url
  in order to fill in a form based on which a new dataset
  will be added to the database

  @cur
  Scenario: Succesfully inserting a new dataset

    When the user navigates to /newdataset
    Then within 1 seconds the selector "#datasettitle" matches an element in the dom


  Scenario: Succesfully inserting a new dataset (by a researcher)

  Scenario: Succesfully inserting a new dataset (by a junior researcher)

  Scenario: Succesfully inserting a new dataset (by an admin)