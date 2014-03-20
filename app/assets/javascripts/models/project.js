window.Epictracker.Models.Project = Backbone.Model.extend({
	parse: function(response) {
		if (response.lists){
			this.lists().set(response.lists, {parse: true});
			delete response.lists;
		}
		return response
	},
	// 
	lists: function() {
		if (!this._lists) {
			this._lists = new Epictracker.Collections.Lists([], { project: this });
		}
		return this._lists
	}
	
  // parse: function(response) {
  //   if(response['lists']){
  //     this.lists().set(response['lists']);
  //     delete response['lists'];
  //   }
  //   return response;
  // },
  
  // lists: function() {
  //   if(!this.get('lists')) {
  //     var lists = new Epictracker.Collections.Lists([], {
  //       board: this
  //     });
  //     this.set({
  //       lists: lists
  //     });
  //   }
  //   return this.get('lists')
  // }
	
})