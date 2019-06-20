Feature: Conditional inputs

    Some of the form fields are visible to the user only depending on the
    values of other fields

    Scenario: Inserting a dataset that doesn't include text and not seeing annotations

        When the user navigates to #/newdataset
        Then within 1 milliseconds the selector "#addlanguage" matches an element in the dom
        And within 1 milliseconds the selector "#mediatype_text" matches an element in the dom
        Then the user clicks "#addlanguage"
        And within 200 milliseconds "#annotations_0" is visible
        But the user clicks "#mediatype_text"
        And within 200 milliseconds "#annotations_0" is not visible

      Scenario: Specifying a new media type

        When the user navigates to /#/newdataset
        Then within 1 milliseconds the selector "#datasettitle" matches an element in the dom
        And the user clicks "#mediatype_other"
        Then within 1 milliseconds the selector "#mediatypedescription" matches an element in the dom
        And the user types "ihan uudenlainen aineisto" in "#mediatypedescription"
        And after 200 milliseconds the value of "#mediatypedescription" equals "ihan uudenlainen aineisto"
