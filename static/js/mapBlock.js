$(document).ready(function() {
    $('#map').height(app.config.homeMap.height);
    $('#homeMap').height(app.config.homeMap.height - 20);
    $('#adminMap').height(app.config.homeMap.height - 20);

    if(window.regionNames !== undefined && window.localMap !== undefined && window.linkRegionCodes !== undefined && window.admin !== undefined){
		$.fn.vectorMap('addMap', 'localMap', localMap);
        if(!admin) {
			$('#homeMap').vectorMap({
			    map: 'localMap',
			    backgroundColor: '#EEEEEE',
			    borderColor: '#818181',
			    color: '#E7E7E7',
			    hoverColor: '#CCCCCC',
			    selectedColor: '#CCCCCC',
			    borderWidth: 3,
			    enableZoom: false,
			    onRegionClick: function(element, code, region)
			    {
			    	mapLinkClick(code, admin);
			    },
			    onLabelShow: function(element, label, code) {
                    // for not showing africa in ES map highlighted and the red bubble
                    //console.log(label[0].innerText);
                    if( label[0].innerText == 'ES.CN Border' || label[0].innerText == 'Africa' ){
                        return false;
                    }

                    $('#regionName').text(getName(code));
			    	$('#tenders').text(getCount(code));
			    	label.addClass('jqvmap-label-home');
					label.html($('#overlay').html());
				    }
			});
		}
		else {
			$('#adminMap').vectorMap({
			    map: 'localMap',
			    backgroundColor: '#EEEEEE',
			    borderColor: '#818181',
			    color: '#E7E7E7',
			    hoverColor: '#CCCCCC',
			    selectedColor: '#CCCCCC',
			    borderWidth: 3,
			    enableZoom: false,
			    onRegionClick: function(element, code, region)
			    {
			    	
					$('#regionId').val(code);
					$('#name').text(getName(code));
					$('#code').text(code);
			    },
			    onLabelShow: function(element, label, code) {
					label.text(getName(code));
					if(label.text() == ''){
						return false;
					}
				}
			});
		}

        $( "#localMapLink" ).mousedown(function() {
            underMapLinkClick(linkRegionCodes[0], admin, this);
        });

        $( "#europeMapLink" ).mousedown(function() {
            underMapLinkClick(linkRegionCodes[1], admin, this);
        });

        $( "#latinAmericaMapLink" ).mousedown(function() {
            underMapLinkClick(linkRegionCodes[2], admin, this);
        });
		
	}
	});

function getName(code) {
	if(!regionNames[code]){
		return '';
	}
	return regionNames[code]['name'];
}

function getCount(code) {
	if(!regionNames[code]){
		return '';
	}
	return regionNames[code]['count'];
}

function getLink(code) {
	if(!regionNames[code]){
		return '';
	}
    else {
        return regionNames[code]['link'];
    }
}

function mapLinkClick(code, admin) {
    if(admin){
        $('#regionId').val(code);
        $('#name').text(getName(code));
        $('#code').text(code);
    }
    else {
        if(getLink(code)) {
            window.location.href = getLink(code);
        }
        return false;
    }
}

function underMapLinkClick(code, admin, element) {
    if(admin){
        $('#regionId').val(code);
        $('#name').text(getName(code));
        $('#code').text(code);
    }
    else {
        if(getLink(code)) {
            //$(element).attr("href", getLink(code));
            element.href = getLink(code);
        }
    }
}


if (navigator.appVersion.indexOf('Chrome') > -1)
{
    document.write("<style>path {stroke-width: 4px;}</style>");
}
