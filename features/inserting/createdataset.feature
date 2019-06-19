Feature: Creating a new dataset

  As a user I open the correct url
  in order to fill in a form based on which a new dataset
  will be added to the database

  @cur
  Scenario: Filling out the form: just the basics

    When the user navigates to #/newdataset
    Then within 1 milliseconds the selector "#datasettitle" matches an element in the dom
    And the user types "testisetti" in "#datasettitle"
    And the user types "kuvaus kuvaus hei mikä kuvaus" in "#datasetdescription"
    And the user clicks "#keyword"
	  And after 400 milliseconds the user clicks the xpath "//div[@id='keyword']//div[text()='translations']"
    And the user clicks "#resourcetype"
	  And after 400 milliseconds the user clicks the xpath "//div[@id='resourcetype']//div[text()='korpus']"
	  And the user clicks the xpath "//div[text()='Jatka']"
    Then the user clicks "#addlanguage"
    And within 3000 milliseconds the selector "#lang_0" matches an element in the dom
    And the user clicks "#lang_0_langselect"
    And the user types "suomi" in "#lang_0_langselect input[type='text']"
    And after 1000 milliseconds the user types "ENTER" in "#lang_0_langselect input[type='text']"
		And within 1000 milliseconds the xpath "//div[@id='lang_0_langselect']//div[text()='suomi']" matches an element in the dom
    Then the user clicks "#langmod_0"
	  And after 800 milliseconds the user clicks the xpath "//div[@id='langmod_0']//div[text()='Kirjoitettu kieli']"
    Then the user clicks "#speakerstatus_0"
	  And after 400 milliseconds the user clicks the xpath "//div[@id='speakerstatus_0']//div[text()='L1']"
    Then the user clicks "#annotations_0 > h4:first-child"
    And the user clicks "#addAnnotation_0"
    And the user clicks "#annolevel_0_0"
	  And after 400 milliseconds the user clicks the xpath "//div[@id='annolevel_0_0']//div[text()='syntaksi']"
    And the user types "erikoinen versio" in "#annoversion_0_0"
    And the user clicks "#addlanguage"
    And within 3000 milliseconds the selector "#lang_1" matches an element in the dom
    And the user clicks "#lang_1_langselect"
    And the user types "ruotsi" in "#lang_1_langselect input[type='text']"
    And after 1000 milliseconds the user types "ENTER" in "#lang_1_langselect input[type='text']"
		And within 1000 milliseconds the xpath "//div[@id='lang_1_langselect']//div[text()='ruotsi']" matches an element in the dom
    Then the user clicks "#langmod_1"
	  And after 400 milliseconds the user clicks the xpath "//div[@id='langmod_1']//div[text()='Kirjoitettu kieli']"
    Then the user clicks "#speakerstatus_1"
	  And after 400 milliseconds the user clicks the xpath "//div[@id='speakerstatus_1']//div[text()='L1']"
    Then the user clicks "#annotations_1 > h4:first-child"
    And the user clicks "#addAnnotation_1"
    And the user clicks "#annolevel_1_0"
	  And after 400 milliseconds the user clicks the xpath "//div[@id='annolevel_1_0']//div[text()='syntaksi']"
    And the user types "erikoinen versio" in "#annoversion_1_0"
    And the user clicks "#defineTranslations"
    And the user clicks "#add_lang_con"
    Then the user clicks "#sl_0"
	  And after 400 milliseconds the user clicks the xpath "//div[@id='sl_0']//div[text()='ruotsi']"
    Then the user clicks "#tl_0"
	  And after 400 milliseconds the user clicks the xpath "//div[@id='tl_0']//div[text()='suomi']"
	  And the user clicks the xpath "//div[text()='Jatka']"
	  And the user clicks "#addauthor"
	  And the user types "Aatos Anttonen" in "#personname_0"
	  And the user types "aatant@utu.fi" in "#personid_0"
	  And the user clicks "#discipline_0"
    And the user types "hassu oppiaine" in "#discipline_0 input[type='text']"
    And after 1000 milliseconds the user types "ENTER" in "#discipline_0 input[type='text']"
	  And the user clicks "#role_0"
    And the user types "tutkija" in "#role_0 input[type='text']"
    And after 1000 milliseconds the user types "ENTER" in "#role_0 input[type='text']"
	  And the user clicks the xpath "//div[text()='Jatka']"
	  And the user clicks "#contactpersons"
	  And the user clicks the xpath "//div[text()='Aatos Anttonen']"
	  And the user clicks the xpath "//div[text()='Jatka']"
    And the user types "pöytälaatikko" in "#dataLocation"
    And the user clicks "#datasetsubmit"
    Then within 2000 milliseconds the selector "#addnewdataset" matches an element in the dom
  #LANGUAGES + annotations: "add language...> properties: annotations... variant...."


  Scenario: Succesfully inserting a new dataset (by a researcher)

  Scenario: Succesfully inserting a new dataset (by a junior researcher)

  Scenario: Succesfully inserting a new dataset (by an admin)
