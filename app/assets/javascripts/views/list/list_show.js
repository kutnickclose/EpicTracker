window.Epictracker.Views.ListShow = Backbone.View.extend({
	template: JST["lists/show"],
	
	initialize: function (){
		
	},
	
	events: {
		
	},
	
	render: function () {
		console.log("hi")
		var content = this.template({
			list : this.model
		});
		this.$el.html(content)
		return this
	}
})