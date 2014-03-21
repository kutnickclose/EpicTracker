window.Epictracker.Models.Story = Backbone.Model.extend({
	urlRoot: function() {
		 return "api/lists/" + this.get("list_id") + "/stories"
	},
})