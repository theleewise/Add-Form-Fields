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





function addSelect(opts){
	try {
		if (!Array.isArray(opts.val) && typeof opts.val !== 'object') throw "Values for select need to be in an object or array";
	}
	catch(err){
		console.log(err);
	}
	
	var field = '<select>';

	// If values are in array
	if (Array.isArray(opts.val)){
		for (var i = 0; i<opts.val.length; i++){
			field += '<option>'+opts.val[i]+'</option>';
		}
	} else {
		for (x in opts.val){
			field += '<option value="'+opts.val[x]+'">'+x+'</option>';	
		}
	}


	field += '</select>';
	return field;
}





function addRadio(item){
	try {
		if (!Array.isArray(item.val) && typeof item.val !== 'object') throw "Values for radio buttons need to be in an object or array";
	}
	catch(err){
		console.log(err);
	}

	function createRadio(selVal){
		var selected = ( item.selected === selVal) ? ' checked="checked"' : '';
		return '<input '+cssClass+name+selected+'" type="radio" val="'+item.val[i]+'" />'
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
			field += createRadio(i);
		}
	} else {
		for (x in item.val){
			field += createRadio(x);
			field += '<label>'+x+'</label>';	
		}
	}

	return field;
}





function addText(item){
	var cssClass = (item.cssClass) ? ' class="'+item.cssClass+'"' : '';
	var id = (item.id) ? ' id="'+item.id+'"' : '';
	var placeholder = (item.placeholder) ? ' placeholder="'+item.placeholder+'"' : '';
	var field = '<input'+cssClass+id+placeholder+' type="text" value="testing" />';
	return field;
}