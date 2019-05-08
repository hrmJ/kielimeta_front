Feature: Conditional inputs

    Some of the form fields are visible to the user only depending on the
    values of other fields

    @cur
    Scenario: Inserting audio-only text and not seeing annotations

        When the user navigates to /#/newdataset
        Then within 1 milliseconds the selector "#addlanguage" matches an element in the dom
        And within 1 milliseconds the selector "#mediatype_audio" matches an element in the dom
        Then the user clicks "#addlanguage"
        And within 200 milliseconds "#annotations_0" is visible
        But the user clicks "#mediatype_audio"
        And within 200 milliseconds "#annotations_0" is not visible
