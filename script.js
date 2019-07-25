var timetable_title_attributes = {
	"rows" : ["Time/Day", "08:00 - 08:55", "09:00 - 09:55", "10:00 - 10:55", "11:05 - 12:00", "12:05 - 01:00", "01:00 - 02:00", "02:00 - 02:55", "03:00 - 03:55", "04:05 - 05:00", "05:05 - 06:00"],
	"cols" : ["Time/Day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
};

var timetable_custom_attributes = {
	"sess" : ["L", "T"],
	"subj" : ["CSN-501", "CSN-502", "CSN-503", "CSN-517", "CSN-499"],
	"prof" : ["SG", "MM", "DT", "SK", "PPR", "RT"],
	"btch" : ["B.Tech IV", "M.Tech I", "CS1", "CS2"],
	"vnue" : ["LHC-206", "W-201", "W-202", "S-310"]
};

var timetable_custom_attributes_concat = {
	"prof" : "+",
	"btch" : " + ",
}


var table = document.getElementById("timetable");

window.onload = function() {
	fillRowTitles();
	fillColumnTitles();
	fillCustomAttributes();
}

function fillRowTitles(){
	var rowTitles = timetable_title_attributes["rows"];
	for(var i=0; i<rowTitles.length; ++i){
		document.querySelector(".r" + i).innerHTML = rowTitles[i];
	}
}

function fillColumnTitles(){
	var colTitles = timetable_title_attributes["cols"];
	for(var i=0; i<colTitles.length; ++i){
		document.querySelector(".c" + i).innerHTML = colTitles[i];
	}
}

function fillCustomAttributes(){
	for(var key in timetable_custom_attributes){
		var elems = document.querySelectorAll("table td p." + key);
		elems.forEach(elem => {
			var classArray = Array.from(elem.classList);
			var nums = classArray.length;
			if(nums==2){
				elem.innerHTML = timetable_custom_attributes[key][classArray[1].replace(key, "")];
			} else if(nums>2){
				nums = classArray.slice(1);
				for(var i=0; i<nums.length; ++i){
					nums[i] = nums[i].replace(key, "");
				}
				var delim = timetable_custom_attributes_concat[key];
				var info = timetable_custom_attributes[key][nums[0]];
				for(var i=1; i<nums.length; ++i){
					info += delim + timetable_custom_attributes[key][nums[i]];
				}
				elem.innerHTML = info;
			}
		});
	}
}

var timetable_cells = table.querySelectorAll("td, th");
timetable_cells.forEach(cell => {
	cell.addEventListener("click", function() {
		if(cell.classList.contains("active")){
			cell.classList.remove("active");
		} else{
			cell.classList.add("active");
		}
	});
});

var mouseclicked = 0;
var cell_deactivate = false;
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
			} else if(cell_deactivate && cell.classList.contains("active")){
				cell.classList.remove("active");
			}
		}
	});
});

function timetable_addRow() {

}