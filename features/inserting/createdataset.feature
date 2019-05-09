Feature: Creating a new dataset

  As a user I open the correct url
  in order to fill in a form based on which a new dataset
  will be added to the database

  Scenario: Succesfully submitting a new  minimal dataset

    When the user navigates to /newdataset
    Then within 1 milliseconds the selector "#datasettitle" matches an element in the dom
    And within 1 milliseconds the selector "#datasetdescription" matches an element in the dom
    And within 1 milliseconds the selector "#datasetsubmit" matches an element in the dom
    And the user types "a nice name" in "#datasettitle"
    And the user clicks "#datasetsubmit"
    Then within 3000 milliseconds the selector "#savedmsg" matches an element in the dom
  #LANGUAGES + annotations: "add language...> properties: annotations... variant...."


  Scenario: Succesfully inserting a new dataset (by a researcher)

  Scenario: Succesfully inserting a new dataset (by a junior researcher)

  Scenario: Succesfully inserting a new dataset (by an admin)