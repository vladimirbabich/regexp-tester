const initialStr = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nisi nec metus dignissim ultrices et a lectus. Morbi nibh est, tempor sed feugiat nec, tristique eu augue. Suspendisse lobortis non nulla in porttitor. Morbi a fermentum dolor, ut tempus diam. Aliquam molestie, enim at maximus feugiat, risus erat hendrerit dui, at porta erat enim ut massa. Maecenas elementum ac augue sed tempor. Aliquam nec rutrum velit. Curabitur eu dapibus lectus.

Vivamus nec sem id velit tempor porta quis in quam. Donec dignissim sed lacus vitae faucibus. Nullam sed felis id risus tempor egestas. Vivamus sollicitudin nisl id nunc elementum finibus. Pellentesque aliquam tristique dui nec pharetra. Mauris nulla purus, tincidunt ac turpis id, tempus interdum nisl. Suspendisse dignissim euismod porta. Donec aliquam dolor et enim sagittis facilisis. Donec rutrum est non magna gravida, vel ullamcorper ipsum sodales. Nulla mattis, nunc vel scelerisque sollicitudin, arcu lacus rutrum neque, quis ultricies nisl sapien ac elit.`
const reStr = '';
const re = new RegExp('ipsum');
const index = initialStr.search(re)
const result =initialStr
	console.log(result)


/* examples of task and right result
	get index of first word: 'ipsum' => 'ipsum'
*/