var app = app || {};
app.product = app.product || {};

app.product.init = function () {

    var cbxXML = $('input[name="resultSentAsXML"]');

    var pricePercent = $('input[name="pricePercent"]');

    var productPriceType = {
        radioMonthly: $("input[type=radio][name='productPriceType'][value='product.monthly.based.price']"),
        radioPercentage: $("input[type=radio][name='productPriceType'][value='product.percentage.based.price']")
    };

    $('input[name="productType"]').each(function () {
        if ($(this).val() == 'product.type.addOn') {
            if ($(this).is(':checked')) {
                $('input[name="availableForTest"]').attr('checked', false);
                $('input[name="availableForTest"]').attr('disabled', 'disabled');
				$('input[name="availableForTest"]').parent().addClass("state-disabled");
                $('input[name="premiumServiceType"]').each(function () {
                    $(this).removeAttr('disabled');
                });
                $('#xmlResultRow').toggle(true);
                $('#premiumServiceTypeRow').toggle(true);
                $('select[name="maxNumberOfRegions"]').attr('disabled', 'disabled');
                $('select[name="maxNumberOfRegions"]').val('');
                $('#maxNumRegionsRow').toggle(false);
                $('select[name="maxNumberOfSearchProfiles"]').attr('disabled', 'disabled');
                $('select[name="maxNumberOfSearchProfiles"]').val('');
                $('#maxNumSearchProfilesRow').toggle(false);

                $('input[name="productPriceType"]').each(function () {
                    $(this).removeAttr('disabled');
                });
                $('input[name="subtitle"]').attr('disabled', 'disabled');
                $('input[name="subtitle"]').val('');
                $('#subtitleRow').toggle(false);

                $('input[name^="productSubtitle"]').each(function () {
                    $(this).attr('disabled', 'disabled');
                    $(this).val('');
                });
                $('label[for^="productSubtitleMandatory"]').each(function () {
                    $(this).text('');
                });
                $('textarea[name^="regionsDescription"]').each(function () {
                    $(this).attr('disabled', 'disabled');
                    $(this).val('');
                });
                $('label[for^="productRegionsMandatory"]').each(function () {
                    $(this).text('');
                });
                $("#premiumServiceTypeMandatory").text("*");
                $("#subtitleMandatory").text("");
                $("#regionsDescriptionMandatory").text("");
                $("#maxNumberOfRegionsMandatory").text("");
                $("#maxNumberOfSearchProfilesMandatory").text("");
                $('tr[id^="infoPage"]').toggle(true);
            }
            else {
                if ($('select[name="productSpecification"]').find(":selected").text() == 'Standard') {
                    $('input[name="availableForTest"]').removeAttr('disabled');
					$('input[name="availableForTest"]').parent().removeClass("state-disabled");
                }
                $('input[name="premiumServiceType"]').each(function () {
                    $(this).attr('checked', false);
                    $(this).attr('disabled', 'disabled');
                });

                $('#xmlResultRow').toggle(false);
                $('#premiumServiceTypeRow').toggle(false);

                $('select[name="maxNumberOfSearchProfiles"]').removeAttr('disabled');
                $('#maxNumSearchProfilesRow').toggle(true);

                $('input[name="productPriceType"]').each(function () {
                    $(this).attr('disabled', 'disabled');
                    if ($(this).val() == 'product.monthly.based.price') {
                        $(this).attr('checked', true);
                    }
                });
                $('input[name="subtitle"]').removeAttr('disabled');
                $('#subtitleRow').toggle(true);
                $('input[name^="productSubtitle"]').each(function () {
                    $(this).removeAttr('disabled');
                });
                $('label[for^="productSubtitleMandatory"]').each(function () {
                    $(this).text('*');
                });
                $("#premiumServiceTypeMandatory").text("");
                $("#subtitleMandatory").text("*");
                $("#maxNumberOfSearchProfilesMandatory").text("*");
                $('tr[id^="infoPage"]').toggle(false);
            }
        }

        if ($(this).val() == 'product.type.profileBased') {
            if ($(this).is(':checked')) {
                $('select[name="maxNumberOfRegions"]').attr('disabled', 'disabled');
                $('select[name="maxNumberOfRegions"]').val('1');

                $('textarea[name^="regionsDescription"]').each(function () {
                    $(this).attr('disabled', 'disabled');
                    $(this).val('');
                });

                $('label[for^="productRegionsMandatory"]').each(function () {
                    $(this).text('');
                });

                $("#regionsDescriptionMandatory").text("");
                $("#maxNumberOfRegionsMandatory").text("");

            }
        }

        if ($(this).val() == 'product.type.regionBased') {
            if ($(this).is(':checked')) {
                $('select[name="maxNumberOfRegions"]').removeAttr('disabled');
                $('#regionsRow').toggle(true);
                $('#maxNumRegionsRow').toggle(true);

                $('label[for^="productRegionsMandatory"]').each(function () {
                    $(this).text('*');
                });
                $("#regionsDescriptionMandatory").text("*");
                $("#maxNumberOfRegionsMandatory").text("*");
                $('textarea[name^="regionsDescription"]').each(function () {
                    $(this).removeAttr('disabled');
                });
            }
            else {
                $('#regionsRow').toggle(false);
                $('#maxNumRegionsRow').toggle(false);
            }
        }
    });

    $('input[name="productType"]').click(function () {
        if ($(this).val() == 'product.type.addOn' && $(this).is(':checked') == true) {
            $('input[name="availableForTest"]').attr('checked', false);
            $('input[name="availableForTest"]').attr('disabled', 'disabled');
			$('input[name="availableForTest"]').parent().addClass("state-disabled");
            $('input[name="premiumServiceType"]').each(function () {
                $(this).removeAttr('disabled');
            });
            $('#xmlResultRow').toggle(true);
            $('#premiumServiceTypeRow').toggle(true);
            $('select[name="maxNumberOfRegions"]').attr('disabled', 'disabled');
            $('select[name="maxNumberOfRegions"]').val('');
            $('#maxNumRegionsRow').toggle(false);
            $('select[name="maxNumberOfSearchProfiles"]').attr('disabled', 'disabled');
            $('select[name="maxNumberOfSearchProfiles"]').val('');
            $('#maxNumSearchProfilesRow').toggle(false);

            $('input[name="productPriceType"]').each(function () {
                $(this).removeAttr('disabled');
            });
            $('input[name="subtitle"]').attr('disabled', 'disabled');
            $('input[name="subtitle"]').val('');
            $('#subtitleRow').toggle(false);
            $('input[name^="productSubtitle"]').each(function () {
                $(this).attr('disabled', 'disabled');
                $(this).val('');
            });
            $('label[for^="productSubtitleMandatory"]').each(function () {
                $(this).text('');
            });
            $('textarea[name^="regionsDescription"]').each(function () {
                $(this).attr('disabled', 'disabled');
                $(this).val('');
            });
            $('label[for^="productRegionsMandatory"]').each(function () {
                $(this).text('');
            });
            $("#premiumServiceTypeMandatory").text("*");
            $("#subtitleMandatory").text("");
            $("#regionsDescriptionMandatory").text("");
            $("#maxNumberOfRegionsMandatory").text("");
            $("#maxNumberOfSearchProfilesMandatory").text("");
            $('tr[id^="infoPage"]').toggle(true);

            $('#regionsRow').toggle(false);
            $('#maxNumRegionsRow').toggle(false);
        }
        else {
            cbxXML.attr('checked', false);
            cbxXML.attr('disabled', 'disabled');
			$(cbxXML).parent().addClass("state-disabled");
            $('#xmlResultRow').toggle(false);
            if ($('select[name="productSpecification"]').find(":selected").text() == 'Standard') {
                $('input[name="availableForTest"]').removeAttr('disabled');
				$('input[name="availableForTest"]').parent().removeClass("state-disabled");
            }
            $('input[name="premiumServiceType"]').each(function () {
                $(this).attr('checked', false);
                $(this).attr('disabled', 'disabled');
            });
            $('#premiumServiceTypeRow').toggle(false);

            $('select[name="maxNumberOfSearchProfiles"]').removeAttr('disabled');
            $('#maxNumSearchProfilesRow').toggle(true);

            $('input[name="productPriceType"]').each(function () {
                $(this).attr('disabled', 'disabled');
                if ($(this).val() == 'product.monthly.based.price') {
                    $(this).attr('checked', true);
                    $(this).click();
                }
            });
            $('input[name="subtitle"]').removeAttr('disabled');
            $('#subtitleRow').toggle(true);
            $('input[name^="productSubtitle"]').each(function () {
                $(this).removeAttr('disabled');
            });
            $('label[for^="productSubtitleMandatory"]').each(function () {
                $(this).text('*');
            });
            $("#premiumServiceTypeMandatory").text("");
            $("#subtitleMandatory").text("*");
            $("#maxNumberOfSearchProfilesMandatory").text("*");

            $('textarea[name^="productInformationPage"]').each(function () {
                $(this).val('');
            });

            var editorInfoPage = CKEDITOR.instances["productInformationPage"];
            if (editorInfoPage) {
                editorInfoPage.setData('');
            }

            var productLabelIndex = $('#productLabelIndex').val();
            if (productLabelIndex > 1) {
                for (var i = 1; i < productLabelIndex; ++i) {
                    var editorInfoPageLocal = CKEDITOR.instances["informationPage" + index];
                    if (editorInfoPageLocal) {
                        editorInfoPageLocal.setData('');
                    }
                }
            }

            $('tr[id^="infoPage"]').toggle(false);
        }

        if ($(this).val() == 'product.type.profileBased' && $(this).is(':checked') == true) {
            $('select[name="maxNumberOfRegions"]').val('1');
            $('select[name="maxNumberOfRegions"]').attr('disabled', 'disabled');

            $('textarea[name^="regionsDescription"]').each(function () {
                $(this).attr('disabled', 'disabled');
                $(this).val('');
            });

            $("#regionsDescriptionMandatory").text("");
            $("#maxNumberOfRegionsMandatory").text("");

            $('label[for^="productRegionsMandatory"]').each(function () {
                $(this).text('');
            });

            $('#regionsRow').toggle(false);
            $('#maxNumRegionsRow').toggle(false);
        }

        if ($(this).val() == 'product.type.regionBased' && $(this).is(':checked') == true) {
            $('select[name="maxNumberOfRegions"]').removeAttr('disabled');

            $('textarea[name^="regionsDescription"]').each(function () {
                $(this).removeAttr('disabled');
            });

            $('label[for^="productRegionsMandatory"]').each(function () {
                $(this).text('*');
            });

            $('#regionsRow').toggle(true);
            $('#maxNumRegionsRow').toggle(true);
            $("#regionsDescriptionMandatory").text("*");
            $("#maxNumberOfRegionsMandatory").text("*");
        }
    });

    $('input[name="productPriceType"]').each(function () {
        if ($(this).val() == 'product.monthly.based.price') {
            if ($(this).is(':checked') == true) {
                $('input[name ^="pricePerPeriod"]').each(function () {
                    $(this).removeAttr('disabled');
					$(this).parent().removeClass("state-disabled");
                });

                $('input[name="pricePercent"]').attr('disabled', 'disabled');
				$('input[name="pricePercent"]').parent().addClass("state-disabled");
                $('input[name="pricePercent"]').val('');
                $("#productPrice12Mandatory").text("*");
                $("#pricePercentMandatory").text("");
            } else {
                $('input[name ^="pricePerPeriod"]').each(function () {
                    $(this).attr('disabled', 'disabled');
					$(this).parent().addClass("state-disabled");
                    $(this).val('');
                });

                $('input[name="pricePercent"]').removeAttr('disabled');
				$('input[name="pricePercent"]').parent().removeClass("state-disabled");
                $("#productPrice12Mandatory").text("");
                $("#pricePercentMandatory").text("*");
            }
        }
    });

    $('input[name="productPriceType"]').click(function () {
        if ($(this).val() == 'product.monthly.based.price' && $(this).is(':checked') == true) {
            $('input[name ^="pricePerPeriod"]').each(function () {
                $(this).removeAttr('disabled');
				$(this).parent().removeClass("state-disabled");
            });

            $('input[name="pricePercent"]').val('');
            $('input[name="pricePercent"]').attr('disabled', 'disabled');
			$('input[name="pricePercent"]').parent().addClass("state-disabled");
            $("#productPrice12Mandatory").text("*");
            $("#pricePercentMandatory").text("");

        } else {
            $('input[name ^="pricePerPeriod"]').each(function () {
                $(this).attr('disabled', 'disabled');
				$(this).parent().addClass("state-disabled");
                $(this).val('');
            });

            $('input[name="pricePercent"]').removeAttr('disabled');
			$('input[name="pricePercent"]').parent().removeClass("state-disabled");
            $("#productPrice12Mandatory").text("");
            $("#pricePercentMandatory").text("*");
        }
    });


    $('input[name="premiumServiceType"]').each(function () {
        if ($(this).val() == 'product.premium.service.service') {
            if ($(this).is(':checked') == true) {
                cbxXML.removeAttr('disabled');
				$(cbxXML).parent().removeClass("state-disabled");
            } else {
                cbxXML.attr('checked', false);
                cbxXML.attr('disabled', 'disabled');
				$(cbxXML).parent().addClass("state-disabled");
            }
        }
    });

    cbxXML.click(function () {
        var cbxChecked = $(this).is(':checked');
        triggerXMLServiceSettings(cbxChecked);
    });

    cbxXML.each(function () {
        var cbxChecked = $(this).is(':checked');
        triggerXMLServiceSettings(cbxChecked);
    });

    /**
     * renders the field-changes related to the selection of a XML-Service product
     * e.g. changes all product-price fields and disables productPrice.monthly
     */
    function triggerXMLServiceSettings(xmlActive) {
        if (xmlActive) {
            productPriceType.radioMonthly.attr('checked', false);
            productPriceType.radioMonthly.attr('disabled', true);
            productPriceType.radioPercentage.removeAttr('disabled');
            productPriceType.radioPercentage.attr('checked', true);

            triggerProductPriceTypeSettings();

        } else {
            productPriceType.radioMonthly.removeAttr('disabled');
            productPriceType.radioPercentage.removeAttr('disabled');

            triggerProductPriceTypeSettings();
        }
    }

    /**
     * renders the field-changes related to product-price-type radio fields
     * (renders different depending on the price options monthly or percentage)
     * e.g: disable mandatory-marker for month12-textfield
     *  add mandatory-marker on price-percent text-field
     *  disable monthly-select field etc....
     */
    function triggerProductPriceTypeSettings() {
        var monthlyActive = productPriceType.radioMonthly.is(':checked');

        if (monthlyActive) {
            $('input[name ^="pricePerPeriod"]').each(function () {
                $(this).removeAttr('disabled');
				$(this).parent().removeClass("state-disabled");
            });

            pricePercent.attr('disabled', 'disabled');
			pricePercent.parent().addClass("state-disabled");
            pricePercent.val('');

            $("#productPrice12Mandatory").text("*");
            $("#pricePercentMandatory").text("");
        } else {
            $('input[name ^="pricePerPeriod"]').each(function () {
                $(this).attr('disabled', 'disabled');
				$(this).parent().addClass("state-disabled");
                $(this).val('');
            });

            pricePercent.removeAttr('disabled');
			pricePercent.parent().removeClass("state-disabled");

            $("#productPrice12Mandatory").text("");
            $("#pricePercentMandatory").text("*");
        }
    }

    $('input[name="premiumServiceType"]').click(function () {
        if ($(this).val() == 'product.premium.service.service' && $(this).is(':checked') == true) {
            cbxXML.removeAttr('disabled');
			$(cbxXML).parent().removeClass("state-disabled");
        } else {
            cbxXML.attr('checked', false);
            cbxXML.attr('disabled', 'disabled');
			$(cbxXML).parent().addClass("state-disabled");
        }
    });

    if ($('select[name="productSpecification"]').find(":selected").text() == 'Standard') {
        $('input[name="productType"]').each(function () {
            if ($(this).val() == 'product.type.addOn') {
                if ($(this).is(':checked') == false) {
                    $('input[name="availableForTest"]').removeAttr('disabled');
					$('input[name="availableForTest"]').parent().removeClass("state-disabled");
                }
            }
        });

    } else {
        $('input[name="availableForTest"]').attr('checked', false);
        $('input[name="availableForTest"]').attr('disabled', 'disabled');
		$('input[name="availableForTest"]').parent().addClass("state-disabled");
    }
    ;

    $('select[name="productSpecification"]').change(function () {
        if ($(this).find(":selected").text() == 'Standard') {
            $('input[name="productType"]').each(function () {
                if ($(this).val() == 'product.type.addOn') {
                    if ($(this).is(':checked') == false) {
                        $('input[name="availableForTest"]').removeAttr('disabled');
						$('input[name="availableForTest"]').parent().removeClass("state-disabled");
                    }
                }
            });

        } else {
            $('input[name="availableForTest"]').attr('checked', false);
            $('input[name="availableForTest"]').attr('disabled', 'disabled');
			$('input[name="availableForTest"]').parent().addClass("state-disabled");
        }
    });

    if (document.getElementById("productLabelIndex")) {
        var index = document.getElementById("productLabelIndex").getAttribute("value");
        if (index > 1) {
            for (var i = 1; i < index; ++i) {
                addProductLabel(i)
            }
        }

    }

    if (typeof(protectedView) !== 'undefined') {
        if (protectedView) {
            $('input[name="productType"]').each(function () {
                $(this).attr('disabled', 'disabled');
            });
            $('input[name="premiumServiceType"]').each(function () {
                $(this).attr('disabled', 'disabled');
            });
            $('input[name="defaultName"]').attr('disabled', 'disabled');
            $('input[name^="productName"]').each(function () {
                $(this).attr('disabled', 'disabled');
            });
            $('input[name="subtitle"]').attr('disabled', 'disabled');
            $('input[name^="productSubtitle"]').each(function () {
                $(this).attr('disabled', 'disabled');
            });
            $('input[name="sortOrder"]').attr('disabled', 'disabled');
            $('textarea[name="notes"]').attr('disabled', 'disabled');
            cbxXML.attr('disabled', 'disabled');
			$(cbxXML).parent().addClass("state-disabled");
            $('select[name="productSpecification"]').attr('disabled', 'disabled');
        }
    }

    if (typeof(originalProductStatus) !== 'undefined') {
        if (originalProductStatus === 'EXPIRED') {
            // overrides the action of protectedView behavior
            $('input[name="defaultName"]').removeAttr('disabled');
            $('input[name^="productName"]').each(function () {
                $(this).removeAttr('disabled');
            });

            $('input[name="subtitle"]').removeAttr('disabled');
            $('input[name^="productSubtitle"]').each(function () {
                $(this).removeAttr('disabled');
            });

            $('input[name="sortOrder"]').removeAttr('disabled');
            $('textarea[name="notes"]').removeAttr('disabled');
        }
    }
	/*
	$(".productLabelRow").each(function() {
		$(this).find("input[type='text']").each(function(){
			$(this).removeAttr("disabled");
		});
	});
	*/
}

function addProductLabel(index) {
    if (languages.length <= 0) {
        return;
    }

    var changeIndex = false;
    if (!index) {
        index = $("#productLabelIndex").val();
        changeIndex = true;
    }
    var tbody = $("#productTableBody");
    var lastRow = $("#localizableRow");

    var row = document.createElement("tr");
	$(row).attr("class", "prop productLabelRow");

	var data0Text = document.createElement("td");
    $(data0Text).attr("class", "value");
	$(data0Text).attr("valign", "top");
    var elementSelect = document.createElement("select");
    $(elementSelect).attr("name", "language" + index);
    $(data0Text).append(elementSelect);
	$(elementSelect).addClass("mandatoryProductLabelProperty");
    for (var i = 0; i < languages.length; ++i) {
        addOption(elementSelect, languages[i], languages[i]);
    }
    if (productLanguages && productLanguages[index]) {
        $(elementSelect).val(productLanguages[index]);
    }
    $(row).append(data0Text);

    var data1Text = document.createElement("td");
	$(data1Text).attr("class", "value");
	$(data1Text).attr("valign", "top");
	var elementText = document.createElement("input");
	$(elementText).addClass("mandatoryProductLabelProperty");
	$(elementText).attr("type", "text");
	$(elementText).attr("name", "productName" + index);
	$(elementText).attr("size", "10");
	$(elementText).attr("maxLength", "15");
	if (productTitles && productTitles[index]) {
        $(elementText).val(productTitles[index]);
    }
    //Append the element in page (in span).
	$(data1Text).append(elementText);
	$(row).append(data1Text)

    var data2Text = document.createElement("td");
    $(data2Text).attr("class", "value");
	$(data2Text).attr("valign", "top");

	var elementSubtitleText = document.createElement("input");
    $(elementSubtitleText).attr("type", "text");
	$(elementSubtitleText).attr("name", "productSubtitle" + index);
	$(elementSubtitleText).attr("size", "20");
	$(elementSubtitleText).attr("maxLength", "38");
    if (productSubtitles && productSubtitles[index]) {
		$(elementSubtitleText).val(productSubtitles[index]);
    }
    $('input[name="productType"]').each(function () {
        if ($(this).val() == 'product.type.addOn') {
            if ($(this).is(':checked') == true) {
				$(elementSubtitleText).attr("disabled", "disabled");
                $(data2Text).css("display", "none");
            }
			else {
				$(elementSubtitleText).addClass("mandatoryProductLabelProperty");
			}
        }
    });
    //Append the element in page (in span).
	$(data2Text).append(elementSubtitleText);
    $(row).append(data2Text);

    var data3Text = document.createElement("td");
	$(data3Text).attr("class", "value");
    var elementRegionsText = document.createElement("textarea");
	$(elementRegionsText).attr("type", "text");
	$(elementRegionsText).attr("name", "regionsDescription" + index);
	$(elementRegionsText).attr("rows", "5");
	$(elementRegionsText).attr("cols", "40");
    if (productRegionsDescriptions && productRegionsDescriptions[index]) {
        $(elementRegionsText).val(productRegionsDescriptions[index]);
    }
    $('input[name="productType"]').each(function () {
        if ($(this).val() == 'product.type.regionBased') {
            if ($(this).is(':checked') == false) {
				$(elementRegionsText).attr("disabled", "disabled");
				$(data3Text).css("display", "none");
            }
			else {
				$(elementRegionsText).addClass("mandatoryProductLabelProperty");
			}
        }
    });
	$(data3Text).append(elementRegionsText);
    $(row).append(data3Text);


    var data4Text = document.createElement("td");
	$(data4Text).attr("class", "value");
    var elementServiceDescription = document.createElement("textarea");
	$(elementServiceDescription).attr("rows", "5");
	$(elementServiceDescription).attr("cols", "40");
	$(elementServiceDescription).attr("name", "serviceDescription" + index);
	$(elementServiceDescription).addClass("mandatoryProductLabelProperty");
    if (productServiceDescriptions.length && productServiceDescriptions[index]) {
		$(elementServiceDescription).val(productServiceDescriptions[index]);
    }
	$(data4Text).append(elementServiceDescription);
	$(row).append(data4Text);

    var editor = CKEDITOR.instances["serviceDescription" + index];
    if (editor) {
        editor.destroy(true);
    }

    var data5Text = document.createElement("td");
	$(data5Text).attr("class", "value");
    var elementInfoPage = document.createElement("textarea");
	$(elementInfoPage).attr("rows", "5");
	$(elementInfoPage).attr("cols", "40");
	$(elementInfoPage).attr("name", "informationPage" + index);
    if (productInformationPages && productInformationPages[index]) {
		$(elementInfoPage).val(productInformationPages[index]);
    }

    $('input[name="productType"]').each(function () {
        if ($(this).val() == 'product.type.addOn') {
            if ($(this).is(':checked') == false) {
				$(data5Text).css("display", "none");
            }
        }
    });
	$(data5Text).append(elementInfoPage);
	$(row).append(data5Text);

    var editorInfoPage = CKEDITOR.instances["informationPage" + index];
    if (editorInfoPage) {
      	editorInfoPage.destroy(true);
    }

	$(lastRow).before(row);
    if (changeIndex) {
        document.getElementById("productLabelIndex").setAttribute("value", parseInt(index) + 1)
    }
}

function removeProductLabel() {
    //var localizableSection = document.getElementById("fooBar");
    var changeIndex = false;
    index = document.getElementById("productLabelIndex").getAttribute("value");
    if (index > 1) {
        changeIndex = true;
        var lastIndex = parseInt(index) - 1;

        var editor = CKEDITOR.instances["serviceDescription" + lastIndex];
        if (editor) {
            editor.destroy(true);
        }

        var editorInfoPage = CKEDITOR.instances["informationPage" + lastIndex];
        if (editorInfoPage) {
            editorInfoPage.destroy(true);
        }

		$("#localizableRow").prev("tr").remove();


		if (changeIndex) {
            document.getElementById("productLabelIndex").setAttribute("value", lastIndex)
        }
    }
}


function addOption(selectbox, text, value) {
    var optn = document.createElement("OPTION");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
}

function submitProductForm() {
	var submitable = true;
	$(".productLabelRow").each(function(){
		$(this).find(".mandatoryProductLabelProperty").each(function() {
			if ($(this).val().trim() == "") {
				$(this).css("background", "#ac0000");
				submitable = false;
				listenToAction($(this));
			}
		});
	});
	if (submitable) {
		document.editform.submit();
	}
	else {
		alert("Please fill highlighted mandatory product label fields.")
	}
}

function listenToAction(el) {
	$(el).focus(function () {
		$(el).css("background", "#ffffff");
	});
}