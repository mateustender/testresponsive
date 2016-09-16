/**
 * For a correct functioning of the checkboxTree use an structure like the sample below in the gsp.
 * Note: It was not possible to use <ul> and <li> because the filter layout was interfering on it.
 *
 *  <div class="checkbox-tree">
        <div class="checkbox-tree-ul">
            <div class="checkbox-tree-li">
                <span class="tree-anchor tree-anchor-plus"></span>
                <label class="checkbox">
                    <input type="checkbox" name="sfv.region.6899" checked="checked" value="6899" class="customerRegion cbx null" id="customerRegion.6899">
                    &nbsp;United Kingdom
                </label>
                <div class="checkbox-tree-ul">
                    <div class="checkbox-tree-li">
                        <label class="checkbox">
                            <input type="checkbox" name="sfv.region.4451" checked="checked" value="4451" class="customerRegion cbx null" id="customerRegion.4451">
                            North West
                        </label>
                    </div>
                    <div class="checkbox-tree-li">
                        <label class="checkbox">
                            <input type="checkbox" name="sfv.region.4453" checked="checked" value="4453" class="customerRegion cbx null" id="customerRegion.4453">
                            &nbsp;East Midlands
                        </label>
                    </div>
                </div>
            </g:if>
        </div>
    </div>
 */

function initCheckboxTree() {
    $(".checkbox-tree").each(function() {
        addTreeFeatures(this);
    });
}

function addTreeFeatures(checkboxTreeDiv) {
    $(checkboxTreeDiv).find(".tree-anchor").each(function() {
        if ($(this).hasClass("tree-anchor-plus")) {
            anchorColapse(this);
        }

        $(this).click(function() {
            treeAnchorSwitch(this);
        });
    });

    /* add the behavior to the checkboxes */
    $(checkboxTreeDiv).find(":checkbox").each(function() {
        $(this).click(function() {
            treeCheckboxSwitch(this);
        });
    });

    /* add the behavior to the radios (if they exist) */
    $(checkboxTreeDiv).find(":radio").each(function() {
        $(this).change(function() {
            radioChange(checkboxTreeDiv);
        });
    });
}

function treeAnchorSwitch(element) {
    if ($(element).hasClass("tree-anchor-plus")) {
        anchorExpand(element);
    } else {
        anchorColapse(element);
    }
}

function radioChange(checkboxTreeDiv) {
    /* when a new radio is selected, go through all and uncheck the children checkboxes */
    $(checkboxTreeDiv).find(":radio").each(function() {
        treeCheckboxSwitch(this);
    });
}

function anchorExpand(element) {
    $(element).removeClass("tree-anchor-plus");
    $(element).addClass("tree-anchor-minus");
    $(element).parent().children(".checkbox-tree-ul").show();
}

function anchorColapse(element) {
    $(element).removeClass("tree-anchor-minus");
    $(element).addClass("tree-anchor-plus");
    $(element).parent().children(".checkbox-tree-ul").hide();
}

function treeCheckboxSwitch(element) {
    if ($(element).is(":checked")) {
        checkParent(element);
        //radioChange($(element).closest(".checkbox-tree"));
        checkIfTreeNodeFromMainRadio(element);

    } else {
        checkUncheckChildren(element, false);
    }
}

/**
 * Selects the parent checkbox of element
 * @param element
 */
function checkParent(element) {
    $(element).closest(".checkbox-tree-ul").parent().children(".checkbox").find(":checkbox").prop("checked", true);
    $(element).closest(".checkbox-tree-ul").parent().children(".checkbox").find(":radio").prop("checked", true);
}

/**
 * If it is a tree node checkbox being selected and if the main region is a radio, it has to unselect all children from the other unselected radios
 * @param element
 */
function checkIfTreeNodeFromMainRadio(element) {
    $(element).closest(".checkbox-tree").find(":radio").each(function() {
        if (!$(this).is(":checked")) {
            checkUncheckChildren(this, false);
        }
    });
}

function checkUncheckChildren(element, check) {
    var parentLi = $(element).parents(".checkbox-tree-li")[0];
    $(parentLi).children(".checkbox-tree-ul").find(":checkbox").each(function() {
        $(this).prop("checked", check);
    });
}

