var $ = require('jquery')
// import $ from 'jquery'
var apiBasePath = '/api'

function getAnnouncements() {
	return $.ajax({
		url : `${apiBasePath}/todos`,
		type : 'GET',
		dataType : 'json'
	})
}

module.exports = { getAnnouncements }