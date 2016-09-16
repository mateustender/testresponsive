/**
 * For a correct functioning of the subregionsPopup use an structure like the sample below in the gsp.
 *
 *  <div class="regions-subregions">
        <div class="row">
            <div class="col col-6 region-container">
                <div class="row">
                    <div class="col">
                         <label class="checkbox parent-region">
                             <input type="checkbox" name="regionsToSelect.21" value="1" checked="true">
                             <i></i>
                             <a href="/ariadne/admin/searchProfileEdit/editById/21" target="_blank">Republic of Ireland</a>
                             <a href="javascript:void(0);" class="subregion-toggler">
                                <span class="badge txt-color-white bg-color-blueDark">sub-regions...</span>
                             </a>
                         </label>
                    </div>
                    <div style="position: relative">
                        <div class="popover fade right in" role="tooltip" style="top: -75px;  display: none;">
                            <div class="arrow"></div>
                            <h3 class="popover-title">Sub-regions:</h3>
                            <div class="popover-content">
                                <label class="checkbox">
                                    <input type="checkbox" name="subregionsToSelect.4451" value="1" checked="true">
                                    <i></i>
                                    North West
                                 </label>
                                <label class="checkbox">
                                    <input type="checkbox" name="subregionsToSelect.4455" value="1" checked="true">
                                    <i></i>
                                    East of England
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
 */

function initSubregionPopups() {
    $(".subregion-toggler").each(function() {

        /* add the toggler function to the click event */
        $(this).click(function() {
            addTogglerFeatures(this);
        });

        /* color the toggler if there are children checkboxes selected */
        colorToggler(this);

        /* if the parent region checkbox is clicked */
        var parentRegion = $(this).closest(".region-container").find(".parent-region");
        $(parentRegion).find(":checkbox").click(function(){
            parentRegionClicked(this);
        });

    });

    /* Add the behavior for when any of the radios (if they exists) is checked */
    $(".regions-subregions").find(":radio").change(function(){
        radioChange(this);
    });

    /* Add the behavior for when any of the checkbox in the popover is checked */
    $(".popover input:checkbox").each(function() {
        $(this).click(function() {
            subregionCheckboxSwitch(this);
        });
    });
}

function addTogglerFeatures(element) {
    /* align the popover accordingly */
    positionPopover(element);
    /* display/hide popover */
    $(element).closest(".region-container").find(".popover").toggle();
}

function colorToggler(toggler) {
    var someChildSelected = false;
    $(toggler).closest(".region-container").find(".popover").find(":checkbox").each(function() {
        if ($(this).is(":checked")) {
            someChildSelected = true;
        }
    });

    if (someChildSelected) {
        setSubregionToggleAsSelected($(toggler).children(".badge"));
    }
}

function radioChange(element) {
    /* go through all of the region radios. And for the unselected, unselect also the subregions and disable the onclick */
    $(".regions-subregions").find(":radio").each(function() {
        parentRegionClicked(this);

        if (!$(this).is(":checked")) {
            $(this).closest(".region-container").find(".popover").hide();
        }
    });
}

/**
 * Actions for when the parent regions is UNSELECTED
 * @param element
 */
function parentRegionClicked(element) {
    if (!$(element).is(":checked")) {

        /* unselect all subregions */
        $(element).closest(".region-container").find(".popover").find(":checkbox").prop("checked", false);

        /* unselect toggler */
        setSubregionToggleAsUnselected($(element).closest(".region-container").find(".subregion-toggler span.badge"));
    }
}

function subregionCheckboxSwitch(element) {
    if ($(element).is(":checked")) {
        checkParent(element);
        radioChange(element); // if the main regions are radios, unselect all other radios
        setSubregionToggleAsSelected($(element).closest(".region-container").find(".subregion-toggler span.badge"));

    } else {
        checkIfUnselectToggle($(element).closest(".region-container").find(".subregion-toggler span.badge"), element);
    }
}

function checkParent(element) {
    $(element).closest(".region-container").find(".parent-region").find(":checkbox").prop("checked", true);
    $(element).closest(".region-container").find(".parent-region").find(":radio").prop("checked", true);
}

/**
 * Verify if all of the subregions are unselected, for then marking the toggler as unselected as well
 * @param element
 */
function checkIfUnselectToggle(toggler, checkbox) {
    var allUnchecked = true;
    var allChildrenCheckboxes = $(checkbox).closest(".popover-content").find(":checkbox");
    $(allChildrenCheckboxes).each(function() {
        if ($(this).is(":checked")) {
            allUnchecked = false;
        }
    });
    if (allUnchecked) {
        setSubregionToggleAsUnselected(toggler);
    }
}

function setSubregionToggleAsSelected(element) {
    $(element).removeClass("bg-color-blueLight");
    $(element).addClass("bg-color-blueDark");
}

function setSubregionToggleAsUnselected(element) {
    $(element).removeClass("bg-color-blueDark");
    $(element).addClass("bg-color-blueLight");
}

/**
 * Position the popover right next to the sub-regions toggler
 * @param toggler
 */
function positionPopover(toggler) {
    var parentRegion = $(toggler).closest(".region-container").find(".parent-region");
    var iWidth = $(parentRegion).children("i").width();
    var anchorsWidth = 0;
    $(parentRegion).find("a").each(function() {
        anchorsWidth += $(this).width();
    });
    $(toggler).closest(".region-container").find(".popover").css("left", iWidth + anchorsWidth + 10 );

    var popoverHeight = $(toggler).closest(".region-container").find(".popover").height();
    $(toggler).closest(".region-container").find(".popover").css("top", - ( (popoverHeight / 2)) + 11 );

}