var timetable_data = {
	rows: {
		data: ["Time/Day", "08:00 - 08:55", "09:00 - 09:55", "10:00 - 10:55", "11:05 - 12:00", "12:05 - 01:00", "01:00 - 02:00", "02:00 - 02:55", "", "03:00 - 03:55", "", "04:05 - 05:00", "05:05 - 06:00"]
	},
	cols: {
		data: ["Time/Day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
	},
	custom_attributes: {
		subj : ["[CSN-501]", "[CSN-502]", "[CSN-503]", "[CSN-517]", "[CSN-499]"],
		prof : ["SG", "MM", "DT", "SK", "PPR", "RT"],
		btch : ["B.Tech IV", "M.Tech I", "CS1", "CS2"],
		vnue : ["LHC-206", "W-201", "W-202", "S-310", "S-301"]
	},
	custom_attributes_concat: {
		prof : "+",
		btch : " + ",
	},
	cells: [
		[],
		[
			[],
			["", "", "", ""],
			["1", "1", "0 1", "0"],
			["2", "2", "0 1", "4"],
			["", "", "", ""],
			["3", "3", "0 1", "0"],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""],
			["4", "4 5", "0 2", "3"],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""]
		],
		[
			[],
			["", "", "", ""],
			["1", "1", "0 1", "0"],
			["0", "0", "0 1", "0"],
			["", "", "", ""],
			["3", "3", "0 1", "0"],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""]
		],
		[
			[],
			["", "", "", ""],
			["", "", "", ""],
			["2", "2", "0 1", "4"],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""],
			["2", "2", "1", "4"],
			["1", "1", "0", "2"],
			["1", "1", "1", "2"],
			["2", "2", "0", "4"],
			["", "", "", ""],
			["", "", "", ""]
		],
		[
			[],
			["", "", "", ""],
			["1", "1", "0 1", "0"],
			["0", "0", "0 1", "0"],
			["2", "2", "0 1", "4"],
			["3", "3", "0 1", "0"],
			["", "", "", ""],
			["4", "4 5", "0 3", "3"],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""],
			["3", "3", "1", "1"],
			["3", "3", "0", "1"]
		],
		[
			[],
			["", "", "", ""],
			["", "", "", ""],
			["0", "0", "0 1", "0"],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""],
			["0", "0", "0", "1"],
			["", "", "", ""],
			["0", "0", "1", "1"],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""]
		]
	],
	customInnerHTML: [
		{
			cell: [6, 1],
			data: "<b>Lunch</b>"
		}
	],
	span: [
		{
			row: [6, 1],
			col: [1, 5]
		},
		{
			row: [7, 2],
			col: [0, 1]
		},
		{
			row: [9, 2],
			col: [0, 1]
		},
		{
			row: [7, 2],
			col: [1, 1]
		},
		{
			row: [9, 3],
			col: [1, 1]
		},
		{
			row: [7, 2],
			col: [2, 1]
		},
		{
			row: [9, 2],
			col: [2, 1]
		},
		{
			row: [7, 4],
			col: [4, 1]
		},
		{
			row: [7, 2],
			col: [5, 1]
		},
		{
			row: [9, 2],
			col: [5, 1]
		}
	]
};

var table = document.getElementById("timetable");
var timetable_options = document.getElementById("timetable_options");
var timetable_flip_select = document.getElementById("button_flip_select");

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
		for(var j=1; j<timetable_data["cols"]["data"].length; ++j){
			td = timetableGetCellTemplate(timetable_data["cells"][j][i]);
			td.classList.add("c" + j, "r" + i);
			tr.appendChild(td);
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
	
	table.addEventListener("mousemove", e => {
		var cell = e.target;
		if(mouseclicked==1){
			while(cell.tagName.toLowerCase()!="td" && cell.tagName.toLowerCase()!="th") cell = cell.parentElement;
			if(!cell_deactivate && !cell.classList.contains("active")){
				cell.classList.add("active");
				active_cells++;
			} else if(cell_deactivate && cell.classList.contains("active")){
				cell.classList.remove("active");
				active_cells--;
			}
			updateTimetableOptions();
		}
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
		});
	});
	
	table.addEventListener("click", e => {
		var cell = e.target;
		if(cell.tagName.toLowerCase()=="table") return;
		while(cell.tagName.toLowerCase()!="td" && cell.tagName.toLowerCase()!="th") cell = cell.parentElement;
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
		updateTimetableOptions();
	});
}


function timetable_addRow() {

}

function timetable_addCol() {

}

function timetableFlipBatchSelect() {
	if(cell_deactivate){
		timetable_flip_select.innerHTML = "Batch cell select";
	} else {
		timetable_flip_select.innerHTML = "Batch cell deselect";
	}
	cell_deactivate = !cell_deactivate;
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
	cells.forEach(cell => {
		if(!cell.classList.contains("r0") && !cell.classList.contains("c0")){
			cell.innerHTML = copied_content["content"];
		}
	});
	updateTimetableOptions();
}

function timetableClearCells() {
	var cells = table.querySelectorAll("td.active");
	cells.forEach(cell => {
		cell.innerHTML = timetableGetCellTemplate().innerHTML;
	});
	updateTimetableOptions();
}

function timetableDeselectAll() {
	timetable_cells.forEach(cell => {
		cell.classList.remove("active");
	});
	active_cells = 0;
	updateTimetableOptions();
}

function showSingleCellOptions() {
	var cells = table.querySelectorAll("td.active, th.active");
	var widget = timetable_options.querySelector("#options");
	widget.innerHTML = "";

	if(cells.length == 0) {
		timetable_options.querySelector("#desc").innerHTML = "No cell selected";
	}

	if(cells.length != 1) return;
	var cell = cells[0];
	if(cell.classList.contains("r0") || cell.classList.contains("c0")) {
		timetable_options.querySelector("#desc").innerHTML = "Header Cell Options";
		widget.innerHTML = `<input type="text" tabindex=0 value="` + table.querySelector(".active").innerText + `" oninput=updateSingleCellOption("header")></input>`;
	}
	else {
		timetable_options.querySelector("#desc").innerHTML = "Data Cell options";
		for(var key in timetable_data["custom_attributes"]){
			var select = document.createElement("select");
			select.id = "select_" + key;
			select.setAttribute("onchange", "updateSingleCellOption('select_" + key + "')");
			timetable_data["custom_attributes"][key].forEach(option => {
				var option_elem = document.createElement("option");
				option_elem.value = option;
				option_elem.innerHTML = option;
				select.appendChild(option_elem);
			});
			select.value = table.querySelector(".active p." + key).innerHTML;
			var div = document.createElement("div");
			var p = document.createElement("p");
			p.innerHTML = key;
			div.appendChild(p);
			div.appendChild(select);
			widget.appendChild(div);
		}
	}
}

function showGroupCellOptions() {
	var cells_header = table.querySelectorAll(".r0.active, .c0.active");
	var cells_data = [];
	var widget = timetable_options.querySelector("#options");
	for(var i=1; i<timetable_data["rows"]["data"].length; ++i){
		for(var j=1; j<timetable_data["cols"]["data"].length; ++j){
			var elem = table.querySelector(".r"+i+".c"+j);
			if(elem && elem.classList.contains("active")) cells_data.push(elem);
		}
	}
	if(cells_header.length>0 && cells_data.length==0){
		timetable_options.querySelector("#desc").innerHTML = active_cells + " header cells selected";
	} else if (cells_header.length==0 && cells_data.length>0){
		timetable_options.querySelector("#desc").innerHTML = active_cells + " data cells selected";
	} else {
		timetable_options.querySelector("#desc").innerHTML = active_cells + " Mixed cells selected";
	}
}

function updateTimetableOptions() {
	if(active_cells < 2) showSingleCellOptions();
	else showGroupCellOptions();
}

/**
 * @param {string} type
 */
function updateSingleCellOption(type) {
	if(type=="header"){
		table.querySelector(".active").innerHTML = timetable_options.querySelector("input").value;
	} else if(type.match("select_")){
		var key = type.replace("select_", "");
		table.querySelector(".active p." + key).innerHTML = timetable_options.querySelector("select#select_" + key).value;
	}
}

function fillCustomInnerHTML() {
	var innerHTMLs = timetable_data["customInnerHTML"];
	innerHTMLs.forEach(html => {
		var cell = table.querySelector(".r" + html["cell"][0] + ".c" + html["cell"][1]);
		cell.innerHTML = html["data"];
	});
}

function deployCellSpans() {
	var spans = timetable_data["span"];
	spans.forEach(span => {
		var row = span["row"][0];
		var col = span["col"][0];
		var rows = span["row"][1];
		var cols = span["col"][1];
		var elem = table.querySelector(".r" + row + ".c" + col);
		var string = "";
		for(var i=1; i<rows; ++i){
			var f = table.querySelector(".r" + (row + i) + ".c" + (col));
			string += f.innerHTML;
			f.remove();
		}
		for(var i=1; i<cols; ++i){
			var f = table.querySelector(".r" + (row) + ".c" + (col + i))
			string += f.innerHTML;
			f.remove();
		}
		elem.setAttribute("rowspan", rows);
		elem.setAttribute("colspan", cols);
		elem.innerHTML = elem.innerHTML + string;
	});
}

function resetTimeTableVariables() {
	mouseclicked = 0;
	cell_deactivate = false;
	active_cells = 0;
	key_ctrl_down = false;
	copied_content = {
		copied : false,
		content : ""
	};
	var widget = timetable_options.querySelector("#options");
	widget.innerHTML = "";
	timetable_options.querySelector("#desc").innerHTML = "No cell selected";
}

function showTimeTable() {
	resetTimeTableVariables();
	deployGrid();
	fillRowTitles();
	fillColumnTitles();
	fillCustomAttributes();
	timetableDeplayEventListerners();
	fillCustomInnerHTML();
	deployCellSpans();

	{
		// ankurparihar.github.io
		document.getElementById("demo_content").classList.remove("flex");
	}
}

window.onload = showTimeTable;