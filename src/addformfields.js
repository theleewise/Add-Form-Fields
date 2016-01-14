/* THINGS TO ADD 
	* Autofocus option to all
	* Accessability option to all
	* Textarea
	* Submit
	* Reset
	* Password
	* Checkboxes
*/

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
					var field = addRadioCheckbox(items[i]);
					break;
				case 'checkbox':
					var field = addRadioCheckbox(items[i]);
					break;
				case 'button':
					var field = addButton(items[i]);
					break;
				case 'submit':
					var field = addSubmit(items[i]);
					break;
				case 'textarea':
					var field = addTextArea(items[i]);
					break;
				default:
					var field = '<input type="text" />';
			}

			$(opts.target).append(field);
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
	
	var cssClass = (item.cssClass) ? ' class="'+item.cssClass+'"' : '';
	var id = (item.id) ? ' id="'+item.id+'"' : '';
	var label = '';
	if(item.label){
		var labelFor = (item.id) ? ' for="'+item.id+'"' : '';
		var label = '<label'+labelFor+'>'+item.label+'</label>';
	}
	var field = '<select'+cssClass+'">';

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
	field = $(label+field);
	if(item.fireevent){ field.on(item.fireevent.trigger,item.fireevent.action); }
	if (item.wrapper){ field = field.wrapAll(item.wrapper).parent(); }
	return field;
}





function addRadioCheckbox(item){
	try {
		if (!Array.isArray(item.val) && typeof item.val !== 'object') throw "Values for radio buttons need to be in an object or array";
	}
	catch(err){
		console.log(err);
	}

	function createItem(selVal,selected,wrapper){

		if (typeof selVal === 'string'){
			var val = selVal;
			var label = selVal;
			if (typeof selected === 'string'){
				var checked = ( selected === selVal ) ? ' checked' : '';
			} else if (Array.isArray(selected)) {
				var checked = ( selected.indexOf(selVal) >= 0 ) ? ' checked' : '';
			}
		}

		else if (typeof selVal === 'object'){
			var val = selVal[0];
			var label = selVal[1];
			if (typeof selected === 'string'){
				var checked = ( item.selected === selVal[0]) ? ' checked' : '';
			} else if (Array.isArray(selected)){
				var checked = ( selected.indexOf(selVal[0]) >= 0 ) ? ' checked' : '';
			}
		}

		var field = '<label><input '+cssClass+name+checked+' type="'+item.type+'" val="'+val+'" />'+label+'</label>';
		return field;
	}
	
	var cssClass = (item.cssClass) ? ' class="'+item.cssClass+'"' : '';
	var id = (item.id) ? ' id="'+item.id+'"' : '';
	var name = (item.name) ? ' name="'+item.name+'"' : '';

	var field = '';

	// If values are in array
	if (Array.isArray(item.val)){
		for (var i = 0; i<item.val.length; i++){
			field += createItem(item.val[i],item.selected,item.wrapperEach);
		}
	} else {
		for (x in item.val){
			field += createItem([x,item.val[x]],item.selected,item.wrapperEach);
		}
	}

	if (item.wrapper){ field = $(item.wrapper).html(field); }
	return field;
}





function addText(item){
	var cssClass = (item.cssClass) ? ' class="'+item.cssClass+'"' : '';
	var id = (item.id) ? ' id="'+item.id+'"' : '';
	var placeholder = (item.placeholder) ? ' placeholder="'+item.placeholder+'"' : '';
	var focus = (item.focus) ? ' autofocus' : '';
	var label = '';
	if(item.label){
		var labelFor = (item.id) ? ' for="'+item.id+'"' : '';
		var label = '<label'+labelFor+'>'+item.label+'</label>';
	}
	var field = '<input type="text"'+cssClass+id+placeholder+focus+' value="'+item.val+'" />';
	field = $(label+field);
	if(item.fireevent){ field.on(item.fireevent.trigger,item.fireevent.action); }
	if (item.wrapper){ field = field.wrapAll(item.wrapper).parent(); }
	return field;
}





function addTextArea(item){
	var cssClass = (item.cssClass) ? ' class="'+item.cssClass+'"' : '';
	var id = (item.id) ? ' id="'+item.id+'"' : '';
	var placeholder = (item.placeholder) ? ' placeholder="'+item.placeholder+'"' : '';
	var focus = (item.focus) ? ' autofocus' : '';
	var label = '';
	if(item.label){
		var labelFor = (item.id) ? ' for="'+item.id+'"' : '';
		var label = '<label'+labelFor+'>'+item.label+'</label>';
	}
	var field = '<textarea'+cssClass+id+placeholder+focus+'>'+item.val+'</textarea>';
	field = $(label+field);
	if(item.fireevent){ field.on(item.fireevent.trigger,item.fireevent.action); }
	if (item.wrapper){ field = field.wrapAll(item.wrapper).parent(); }
	return field;
}





function addButton(item){
	var cssClass = (item.cssClass) ? ' class="'+item.cssClass+'"' : '';
	var id = (item.id) ? ' id="'+item.id+'"' : '';
	var field = '<button type="button"'+cssClass+id+'>'+item.val+'</button>';
	field = $(field);
	if(item.fireevent){ field.on(item.fireevent.trigger,item.fireevent.action); }
	if (item.wrapper){ field = field.wrapAll(item.wrapper).parent(); }
	return field;
}





function addSubmit(item){
	var cssClass = (item.cssClass) ? ' class="'+item.cssClass+'"' : '';
	var id = (item.id) ? ' id="'+item.id+'"' : '';
	var field = '<button type="submit"'+cssClass+id+'>'+item.val+'</button>';
	field = $(field);
	if(item.fireevent){ field.on(item.fireevent.trigger,item.fireevent.action); }
	if (item.wrapper){ field = field.wrapAll(item.wrapper).parent(); }
	return field;
}