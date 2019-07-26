var table = document.getElementById("timetable");

function timetableGetCellTemplate(list) {
	var td = document.createElement("td");
	var i = 0;
	for(var key in timetable_data["custom_attributes"]) {
		var p = document.createElement("p");
		p.classList.add(key);
		if(list) {
			var attr_list = list[i].split(" ");
			attr_list.forEach(attr => {
				p.classList.add(key + attr);
			});
		}
		td.appendChild(p);
		++i;
	}
	return td;
}

function deployGrid() {
	table.innerHTML = "";
	// header row
	var tr = document.createElement("tr");
	for(var i=0; i<timetable_data["cols"]["data"].length; ++i){
		var th = document.createElement("th");
		th.classList.add("c" + i, "r0")
		tr.appendChild(th);
	}
	table.appendChild(tr);
	// rest rows
	for(var i=1; i<timetable_data["rows"]["data"].length; ++i){
		tr = document.createElement("tr");
		var td = document.createElement("td");
		td.classList.add("c0", "r" + i)
		tr.appendChild(td);
		for(var j=1; j<timetable_data["cols"]["num"]; ++j){
			tr.appendChild(timetableGetCellTemplate(timetable_data["cells"][j][i]));
		}
		table.appendChild(tr);
	}
	timetable_cells = table.querySelectorAll("td, th");
}

function fillRowTitles(){
	var rowTitles = timetable_data["rows"]["data"];
	for(var i=0; i<rowTitles.length; ++i){
		document.querySelector(".r" + i).innerHTML = rowTitles[i];
	}
}

function fillColumnTitles(){
	var colTitles = timetable_data["cols"]["data"];
	for(var i=0; i<colTitles.length; ++i){
		document.querySelector(".c" + i).innerHTML = colTitles[i];
	}
}

function fillCustomAttributes(){
	for(var key in timetable_data["custom_attributes"]){
		var elems = document.querySelectorAll("table td p." + key);
		elems.forEach(elem => {
			var classArray = Array.from(elem.classList);
			var nums = classArray.length;
			if(nums==2){
				elem.innerHTML = timetable_data["custom_attributes"][key][classArray[1].replace(key, "")];
			} else if(nums>2){
				nums = classArray.slice(1);
				for(var i=0; i<nums.length; ++i){
					nums[i] = nums[i].replace(key, "");
				}
				var delim = timetable_data["custom_attributes_concat"][key];
				var info = timetable_data["custom_attributes"][key][nums[0]];
				for(var i=1; i<nums.length; ++i){
					info += delim + timetable_data["custom_attributes"][key][nums[i]];
				}
				elem.innerHTML = info;
			}
		});
	}
}

var timetable_cells;
var mouseclicked = 0;
var cell_deactivate = false;
var active_cells = 0;
var key_ctrl_down = false;
var copied_content = {
	copied : false,
	content : ""
};

function timetableDeplayEventListerners() {

	table.addEventListener("mousedown", function() {
		mouseclicked++;
	});
	
	table.addEventListener("mouseup", function() {
		mouseclicked--;
	});
	
	timetable_cells.forEach(cell => {
		cell.addEventListener("mousemove", e => {
			if(mouseclicked==1){
				if(!cell_deactivate && !cell.classList.contains("active")){
					cell.classList.add("active");
					active_cells++;
				} else if(cell_deactivate && cell.classList.contains("active")){
					cell.classList.remove("active");
					active_cells--;
				}
			}
		});
	});

	document.addEventListener("keydown", e => {
		switch(e.keyCode){
			case 17:	// ctrl
				key_ctrl_down = true;
				break;
			case 67:	// c
				if(key_ctrl_down) timetableCopyCell();
				break;
			case 86:	// v
				if(key_ctrl_down) timetablePasteCell();
				break;
			case 46:	// del
				timetableClearCells();
				break;
		}
	});

	document.addEventListener("keyup", e => {
		if(e.keyCode == 17) key_ctrl_down = false;
	});

	timetable_cells.forEach(cell => {
		cell.addEventListener("click", function() {
			if(key_ctrl_down){
				if(cell.classList.contains("active")){
					cell.classList.remove("active");
					active_cells--;
				} else{
					cell.classList.add("active");
					active_cells++;
				}
			} else {
				timetableDeselectAll();
				if(!cell.classList.contains("active")) {
					cell.classList.add("active");
					active_cells++;
				}
			}
		});
	});
}


function timetable_addRow() {

}

function timetable_addCol() {

}



function timetableCopyCell() {
	var cells = table.querySelectorAll("td.active");
	if(cells.length != 1) return;
	var cell = cells[0];
	if(cell.classList.contains("r0") || cell.classList.contains("c0")) return;
	copied_content["copied"] = true;
	copied_content["content"] = cell.innerHTML;
}

function timetablePasteCell() {
	if(!copied_content["copied"]) return;
	var cells = table.querySelectorAll("td.active");
	if(cells.length != 1) return;
	var cell = cells[0];
	if(cell.classList.contains("r0") || cell.classList.contains("c0")) return;
	cell.innerHTML = copied_content["content"];
}

function timetableClearCells() {
	var cells = table.querySelectorAll("td.active");
	cells.forEach(cell => {
		cell.innerHTML = timetableGetCellTemplate().innerHTML;
	});
}

function timetableDeselectAll() {
	timetable_cells.forEach(cell => {
		cell.classList.remove("active");
	});
	active_cells = 0;
}

window.onload = function() {
	deployGrid();
	fillRowTitles();
	fillColumnTitles();
	fillCustomAttributes();
	timetableDeplayEventListerners();
}