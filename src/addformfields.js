var count = 1;
function addFields(items,opts){
	if(!opts || !opts.max || count <= opts.max){
		for(var i=0; i<items.length; i++){
			switch (items[i].type){
				case 'select':
					var field = addSelect(items[i]);
					break;
				case 'text':
					var field = addText(items[i]);
					break;
				case 'radio':
					var field = addRadio(items[i]);
					break;
				default:
					var field = '<input type="text" />';
			}

			$(items[i].target).append(field);
		}
		if(opts && opts.max && opts.maxFunc && count >= opts.max){ opts.maxFunc(); }
		count++;
	}
}





function addSelect(item){
	try {
		if (!Array.isArray(item.val) && typeof item.val !== 'object') throw "Values for select need to be in an object or array";
	}
	catch(err){
		console.log(err);
	}
	
	var field = '<select>';

	// If values are in array
	if (Array.isArray(item.val)){
		for (var i = 0; i<item.val.length; i++){
			field += '<option>'+item.val[i]+'</option>';
		}
	} else {
		for (x in item.val){
			field += '<option value="'+item.val[x]+'">'+x+'</option>';	
		}
	}


	field += '</select>';
	field = $(field);
	if(item.fireevent){ field.on(item.fireevent.trigger,item.fireevent.action); }
	if (item.wrapper){ field = field.wrapAll(item.wrapper).parent(); }
	return field;
}





function addRadio(item){
	try {
		if (!Array.isArray(item.val) && typeof item.val !== 'object') throw "Values for radio buttons need to be in an object or array";
	}
	catch(err){
		console.log(err);
	}

	function createRadio(selVal,label,wrapper){
		label = (label !== undefined) ? label : true;
		var selected = ( item.selected === selVal) ? ' checked="checked"' : '';
		var field = '<input '+cssClass+name+selected+'" type="radio" val="'+selVal+'" />';
		if (label){ field += '<label>'+selVal+'</label>'; }
		return field;
	}
	
	if ( item.selected && typeof item.selected !== 'string' && typeof item.selected !== 'number' ){
		console.log('Selected radio value must be a string or number')
	}
	var cssClass = (item.cssClass) ? ' class="'+item.cssClass+'"' : '';
	var id = (item.id) ? ' id="'+item.id+'"' : '';
	var name = (item.name) ? ' name="'+item.name+'"' : '';

	var field = '';
	// If values are in array
	if (Array.isArray(item.val)){
		for (var i = 0; i<item.val.length; i++){
			field += createRadio(item.val[i],item.label,item.wrapperEach);
		}
	} else {
		for (x in item.val){
			field += createRadio(x,item.label,item.wrapperEach);
		}
	}

	if (item.wrapper){ field = $(item.wrapper).html(field); }
	return field;
}





function addText(item){
	var cssClass = (item.cssClass) ? ' class="'+item.cssClass+'"' : '';
	var id = (item.id) ? ' id="'+item.id+'"' : '';
	var placeholder = (item.placeholder) ? ' placeholder="'+item.placeholder+'"' : '';
	var field = '<input'+cssClass+id+placeholder+' type="text" value="testing" />';
	field = $(field);
	if(item.fireevent){ field.on(item.fireevent.trigger,item.fireevent.action); }
	if (item.wrapper){ field = field.wrapAll(item.wrapper).parent(); }
	return field;
}