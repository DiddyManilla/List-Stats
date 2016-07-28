function showResults() {
	let list = $("#list").val().split(",").map(function(el) {
		let trimmed = $.trim(el);
		return trimmed.length > 0 ? Number(trimmed) : NaN;
	}).filter(el => !Number.isNaN(el));
	if (typeof list === "undefined" || list.length === 0) {
		$("#correction").show();
	} else {
		$("#correction").hide();
		let num;
		let avg;
		let mode;
		let med;
		let min; 
		let max;

		//Find num
		num = list.length;
		
		//Find average
		let sum = 0;
		for (let i = 0; i < list.length; i++) {
			sum += list[i];
		}
		avg = sum/num;

		//find mode
		let occurences = {};
		for (let i = 0; i < list.length; i++) {
			if (!occurences[list[i]] && occurences[list[i]] != 0) {
				occurences[list[i]] = findOccurencesOf(list, list[i]);
			}
		}
		console.log(occurences);
		mostOccurences = 0;
		mode = "";
		for (let prop in occurences) {
			if (occurences[prop] > mostOccurences) {
				mostOccurences = occurences[prop];
			}
		}
		for (let prop in occurences) {
			if (occurences[prop] === mostOccurences) {
				if (mode.length > 0) {
					mode += ", " + prop;
				} else {
					mode = prop;
				}
			}
		}

		//Find median
		let copyOfList = sort(list);
		copyLength = copyOfList.length;
		if (copyLength % 2 == 0) {
			med = (copyOfList[copyLength / 2 - 1] + copyOfList[copyLength / 2]) / 2;
		} else {
			med = copyOfList[Math.floor(copyLength / 2)];
		}

		//Find minimum and maximum values
		min = list[0];
		max = list[0];
		for (let i = 1; i < list.length; i++) {
			if (list[i] < min) {
				min = list[i];
			}
			if (list[i] > max) {
				max = list[i]
			}
		}

		$("#num").text(num);
		$("#avg").text(avg);
		$("#mode").text(mode);
		$("#med").text(med);
		$("#min").text(min);
		$("#max").text(max);
		$("#results").show();
	}
}
function findOccurencesOf(list, val) {
	let count = 0;
	for (let i = 0; i < list.length; i++) {
		if (list[i] === val) {
			count++;
		}
	}
	return count;
}
function removeDuplicatesFrom(list) {
	let copy = new Set();
	for (let i = 0; i < list.length; i++) {
		copy.add(list[i]);
	}
	return Array.from(copy);
}
function sort(list) {
	let copy = [];
	for (let i = 0; i < list.length; i++) {
		copy[i] = list[i];
	}
	for (let i = 0; i < copy.length; i++) {
		let minIndex = i;
		for (let j = i + 1; j < copy.length; j++) {
			if (copy[j] < copy[minIndex]) {
				minIndex = j;
			}
		}
		let temp = copy[i];
		copy[i] = copy[minIndex];
		copy[minIndex] = temp;
	}
	return copy;
}
$(document).ready(function() {
	$("#results").hide();
	$("#correction").hide();
	$("#get-stats").on("click", showResults);
});