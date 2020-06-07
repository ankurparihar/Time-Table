const timetable__data = {
	navID: 'nav-projects',
	page_loc_text: 'Live Demo',
	template: `
	<div id="demo_page" class="demo-page page">
		<div class="demo_page-head flex">
			<div class="demo_page-title">Time-Table Generator</div>
		</div>
		<div class="demo_page-body">
			<div class="demo_page-cont">
				<div id="timetable_holder">
					<h2>Department of Computer Science &amp; Engineering</h2>
					<h3>Indian Institute of Technology Roorkee</h3>
					<h3>Autumn 2019 - 2020</h3>
					<h4>Time Table of B.Tech IV year</h4>
					<table id="timetable" class="noselect">
					</table>
				</div>
				<div id="timetable_options">
					<p id="desc">No cell selected</p>
					<div id="options" class="flex wrap"></div>
					<div id="copy_paste">
						<button class="btn" id="button_copy">Copy cell</button>
						<button class="btn" id="button_paste">Paste cell</button>
						<button class="btn" id="button_clear">Clear cell</button>
					</div>
					<div id="cell_select_flip">
						<button class="btn" id="button_flip_select">Enable multi-select</button>
						<button class="btn" id="button_deselect">Deselect all cells</button>
					</div>
				</div>
				<div id="timetable_manual">
					<p id="title" class="highlight">Instructions and Features</p>
					<ul>
						<li>If you're on mobile device, rotate to landscape</li>
						<li>Select single cells by clicking</li>
						<li>If selected cells are of same type (<span class="highlight">data</span> or <span class="highlight">header</span>), then options are displayed</li>
						<li>Select/Deselect multiple cells by <code style="color:#cfbf2f">button</code> or by holding <code>ctrl-key</code></li>
						<li>Deselect all cells by <code style="color:#cf7814">button</code></li>
						<li>Copy cells by <code style="color:#4caf50">button</code> or <code>ctrl+c</code></li>
						<li>Paste cells by <code style="color:#4c9baf">button</code> or <code>ctrl+v</code></li>
						<li>Clear cells by <code style="color:#cf3a2f">button</code> or <code>delete</code></li>
						<li>Copy, Paste and Clear works with <span class="highlight">data</span> cells only</li>
						<li>Merge cells row-wise or column-wise, called <span class="highlight">spanning</span> (from script only)</li>
						<li>Table is configured using <span class="highlight"><code>timetable__data</code></span> in <a class="highlight" href="https://github.com/ankurparihar/Time-Table/blob/github.io-dev/script.js">script.js</a></li>
						<li>Right now screenshot is the only way to save table</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	`,
	apply: (root) => {
		if (root === undefined) {
			console.warn('Error: contentRoot not specified')
			return
		}
		root.innerHTML = timetable__data.template
		timetable__data.displayTable()
		timetable__data.onStaticLoad(root)
	},
	onStaticLoad: (root) => {
		if (root === undefined) {
			console.warn('Error: contentRoot not specified')
			return
		}
		const btn_cpy = document.getElementById('button_copy')
		const btn_pst = document.getElementById('button_paste')
		const btn_clr = document.getElementById('button_clear')
		const btn_btch = document.getElementById('button_flip_select')
		const btn_dslt = document.getElementById('button_deselect')
		btn_cpy.addEventListener('click', timetable__data.copyCells)
		btn_pst.addEventListener('click', timetable__data.pasteCells)
		btn_clr.addEventListener('click', timetable__data.clearCells)
		btn_dslt.addEventListener('click', timetable__data.deselectCells)
		btn_btch.addEventListener('click', () => {
			if (timetable__data.batchMode) {
				timetable__data.batchMode = false
				btn_btch.innerHTML = 'Enable multi-select'
			} else {
				timetable__data.batchMode = true
				btn_btch.innerHTML = 'Disable multi-select'
			}
		})

		const table = document.getElementById('timetable')
		table.querySelectorAll('th,td').forEach(cell => {
			cell.addEventListener('click', (e) => {
				timetable__data.handleClick(cell, e)
			})
		})
		document.addEventListener('keydown', e => {
			switch (e.keyCode) {
				case 67:	// c
					if (e.ctrlKey) timetable__data.copyCells()
					break
				case 86:	// v
					if (e.ctrlKey) timetable__data.pasteCells()
					break
				case 46:	// del
					timetable__data.clearCells()
			}
		})
	},
	batchMode: false,
	selectedCells: [],
	copiedCells: [],
	selectedCellType: {
		head: 0,
		data: 0
	},
	table_top: ['Time/Day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
	table_left: ['Time/Day', '08:00 - 08:55', '09:00 - 09:55', '10:00 - 10:55', '11:05 - 12:00', '12:05 - 01:00', '01:00 - 02:00', '02:00 - 02:55', '03:00 - 03:55', '04:05 - 05:00', '05:05 - 06:00'],
	selects: {
		subj: ['[CSN-501]', '[CSN-502]', '[CSN-503]', '[CSN-517]', '[CSN-499]'],
		prof: ['SG', 'MM', 'DT', 'SK', 'PPR', 'RT', 'PPR + RT'],
		btch: ['B.Tech IV', 'M.Tech I', 'B.Tech IV CS1', 'B.Tech IV CS2', 'B.Tech IV + M.Tech I'],
		vnue: ['LHC-206', 'W-201', 'W-202', 'S-310', 'S-301']
	},
	attrs: ['subj', 'prof', 'btch', 'vnue'],
	data_cells: [
		[],
		[
			[],
			[, , ,],
			[1, 1, 4, 0],
			[2, 2, 4, 4],
			[, , ,],
			[3, 3, 4, 0],
			[, , ,],
			[, , ,],
			[4, 6, 2, 3],
			[, , ,],
			[, , ,]
		],
		[
			[],
			[, , ,],
			[1, 1, 4, 0],
			[0, 0, 4, 0],
			[, , ,],
			[3, 3, 4, 0],
			[, , ,],
			[, , ,],
			[, , ,],
			[, , ,],
			[, , ,]
		],
		[
			[],
			[, , ,],
			[, , ,],
			[2, 2, 4, 4],
			[, , ,],
			[, , ,],
			[, , ,],
			[1, 1, 0, 2],
			[1, 1, 1, 2],
			[, , ,],
			[, , ,]
		],
		[
			[],
			[, , ,],
			[1, 1, 4, 0],
			[0, 0, 4, 0],
			[2, 2, 4, 4],
			[3, 3, 4, 0],
			[, , ,],
			[4, 6, 3, 3],
			[, , ,],
			[3, 3, 1, 1],
			[3, 3, 0, 1]
		],
		[
			[],
			[, , ,],
			[, , ,],
			[0, 0, 4, 0],
			[, , ,],
			[, , ,],
			[, , ,],
			[0, 0, 0, 1],
			[0, 0, 1, 1],
			[, , ,],
			[, , ,],
			[, , ,]
		]
	],
	customInnerHTML: [
		{
			cell: [6, 1],
			data: '<b>Lunch</b>'
		}
	],
	span: [
		{
			row: [6, 1],
			col: [1, 5]
		},
		{
			row: [8, 2],
			col: [1, 1]
		},
		{
			row: [7, 2],
			col: [4, 1]
		}
	],
	processSelectedCells: () => {
		const desc = document.getElementById('desc')
		const options = document.getElementById('options')
		if (timetable__data.selectedCells.length == 0) {
			desc.innerHTML = 'No cell selected'
			options.innerHTML = ''
			return
		}
		if (timetable__data.selectedCellType.head == 0) {
			if (timetable__data.selectedCells.length == 1) desc.innerHTML = 'data cell selected'
			else desc.innerHTML = 'data cells selected'
			options.innerHTML = ''
			for (var select in timetable__data.selects) {
				const div = document.createElement('div')
				const p = document.createElement('p')
				p.innerHTML = select
				div.appendChild(p)
				const selectElem = document.createElement('select')
				selectElem.setAttribute('data-class', 'data-' + select)
				timetable__data.selects[select].forEach(opt => {
					const option = document.createElement('option')
					option.value = opt
					option.innerHTML = opt
					selectElem.appendChild(option)
				})
				selectElem.oninput = () => {
					timetable__data.selectedCells.forEach(cell => {
						cell.querySelector('p[' + selectElem.getAttribute('data-class') + ']').innerHTML = selectElem.value
					})
				}
				options.appendChild(selectElem)
				selectElem.value = (timetable__data.selectedCells.length == 1 ? (timetable__data.selectedCells[0].querySelector('p[data-' + select).innerHTML) : '')
			}

		} else if (timetable__data.selectedCellType.data == 0) {
			if (timetable__data.selectedCells.length == 1) desc.innerHTML = 'head cell selected'
			else desc.innerHTML = 'head cells selected'
			const input = document.createElement('input')
			input.type = 'text'
			input.tabIndex = 0
			input.value = timetable__data.selectedCells[0].innerHTML
			input.oninput = () => {
				timetable__data.selectedCells.forEach(cell => {
					cell.innerHTML = input.value
				})
			}
			options.appendChild(input)
		} else {
			desc.innerHTML = 'Mixed cells selected'
			options.innerHTML = ''
		}
	},
	handleClick: (cell, event) => {
		if (event.ctrlKey || timetable__data.batchMode) {
			if (timetable__data.selectedCells.indexOf(cell) >= 0) {
				var a = []
				timetable__data.selectedCells.forEach(c => {
					if (c != cell) a.push(c)
				})
				timetable__data.selectedCells = a
				cell.classList.remove('active')
				if (cell.classList.contains('r0') || cell.classList.contains('c0')) timetable__data.selectedCellType.head--
				else timetable__data.selectedCellType.data--
			} else {
				timetable__data.selectedCells.push(cell)
				cell.classList.add('active')
				if (cell.classList.contains('r0') || cell.classList.contains('c0')) timetable__data.selectedCellType.head++
				else timetable__data.selectedCellType.data++
			}
		} else {
			timetable__data.deselectCells()
			timetable__data.selectedCells.push(cell)
			cell.classList.add('active')
			if (cell.classList.contains('r0') || cell.classList.contains('c0')) timetable__data.selectedCellType.head++
			else timetable__data.selectedCellType.data++
		}
		timetable__data.processSelectedCells()
	},
	displayTable: () => {
		const table = document.getElementById('timetable')
		table.innerHTML = ''
		const rows = timetable__data.table_left.length
		const cols = timetable__data.table_top.length
		var tr = document.createElement('tr')
		for (var i = 0; i < cols; ++i) {
			var th = document.createElement('th')
			th.setAttribute('class', 'r0 ' + 'c' + i)
			tr.appendChild(th)
		}
		table.appendChild(tr)
		for (var i = 1; i < rows; ++i) {
			tr = document.createElement('tr')
			for (var j = 0; j < cols; ++j) {
				var td = document.createElement('td')
				td.setAttribute('class', 'r' + i + ' c' + j)
				tr.appendChild(td)
			}
			table.appendChild(tr)
		}
		table.querySelectorAll('.r0, .c0').forEach(cell => {
			cell.setAttribute('data-ij', '')
		})
		// Spanning
		timetable__data.span.forEach(span => {
			const row = span.row[0]
			const col = span.col[0]
			const rows = span.row[1]
			const cols = span.col[1]
			const cell = table.querySelector('.r' + row + '.c' + col)
			for (var i = 1; i < rows; ++i) {
				var r = table.querySelector('.r' + (row + i) + '.c' + col)
				r.parentElement.removeChild(r)
			}
			for (var j = 1; j < cols; ++j) {
				var r = table.querySelector('.r' + row + '.c' + (col + j))
				r.parentElement.removeChild(r)
			}
			cell.setAttribute('rowSpan', rows)
			cell.setAttribute('colSpan', cols)
		})
		// fill data
		timetable__data.fillTableData()
	},
	fillTableData: () => {
		const table = document.getElementById('timetable')
		const rows = timetable__data.table_left.length
		const cols = timetable__data.table_top.length
		var row, col, p, data, cell, d
		for (col = 0; col < cols; ++col) {
			cell = table.querySelector('.r0.c' + col)
			cell.innerHTML = timetable__data.table_top[col]
		}
		for (row = 1; row < rows; ++row) {
			cell = table.querySelector('.c0.r' + row)
			cell.innerHTML = timetable__data.table_left[row]
		}
		for (row = 1; row < rows; ++row) {
			for (col = 1; col < cols; ++col) {
				cell = table.querySelector('.r' + row + '.c' + col)
				if (cell) {
					data = timetable__data.data_cells[col][row]
					timetable__data.attrs.forEach((attr, i) => {
						p = cell.querySelector('p[data-' + attr + ']')
						if (!p) {
							p = document.createElement('p')
							p.setAttribute('data-' + attr, '')
						}
						d = data[i]
						if (Number.isInteger(d)) p.innerHTML = timetable__data.selects[attr][d]
						cell.appendChild(p)
					})
				}
			}
		}
		timetable__data.customInnerHTML.forEach(data => {
			cell = table.querySelector('.r' + data.cell[0] + '.c' + data.cell[1])
			cell.innerHTML = data.data
		})
	},
	copyCells: () => {
		if (timetable__data.selectedCellType.head > 0) return
		timetable__data.copiedCells = []
		timetable__data.selectedCells.forEach(cell => {
			timetable__data.copiedCells.push(cell)
		})
	},
	pasteCells: () => {
		if (timetable__data.selectedCellType.head > 0) return
		var i = 0
		var l = timetable__data.copiedCells.length
		timetable__data.selectedCells.forEach(cell => {
			cell.innerHTML = timetable__data.copiedCells[i % l].innerHTML
			i++
		})
		timetable__data.processSelectedCells()
	},
	clearCells: () => {
		if (timetable__data.selectedCellType.head > 0) return
		timetable__data.selectedCells.forEach(cell => {
			cell.innerHTML = ''
		})
		timetable__data.processSelectedCells()
	},
	deselectCells: () => {
		timetable__data.selectedCells.forEach(cell => {
			cell.classList.remove('active')
		})
		timetable__data.selectedCells = []
		timetable__data.selectedCellType.head = 0
		timetable__data.selectedCellType.data = 0
		timetable__data.processSelectedCells()
	},
}

spa.register('/projects/time-table', timetable__data)