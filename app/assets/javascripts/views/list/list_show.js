window.Epictracker.Views.ListShow = Backbone.CompositeView.extend({
	template: JST["lists/show"],
	
	initialize: function (){
		this.model.stories().fetch();
		this.listenTo(this.model, "add remove sync", this.render)
		this.listenTo(this.model.stories(), "add remove sync", this.render)
	},
	
	events: {
		"sortstop" : "_rerank"
	},
	
	render: function () {
		var content = this.template({
			list : this.model
		});
		this.$el.html(content);
		
		this.renderStories();
		
		var that = this
		this.$(".stories").sortable({
			cursor: "move",
			opacity: 0.3,
			dropOnEmpty: true,
			connectWith: ".stories"
				// 			  stop: function (event) {
				// 		that._rerank($(event.target));
				// }
		});
		
	
		return this
	},
	
	renderStories: function () {
		this.model.stories().sort();
		this.model.stories().each(function(story) {
			var view = new Epictracker.Views.StoryShow({
				model: story,
				list: this.model,
				collection: this.model.stories()
			})
			this.addSubView('.stories', view.render());
		}, this);
	},
	
	//   _rerank: function ($ul) {
	// var listStories = $ul.find('li');
	//   
	// var that = this
	// var rankNum= 1;
	//   
	// $(listStories).each(function (index, item) {
	// 	console.log("hello")
	// 	if ($(item).hasClass('storyShow')) {
	// 		var story = that.model.stories().get($(item).data('id'));
	// 		var listID = $(item).parent().parent().data('id') // data('id')
	// 		console.log(listID)
	// 		story.set({
	// 			list_id: listID,
	// 			rank: rankNum
	// 		});
	// 		story.save();
	// 		rankNum++;
	// 	}
	// });
	//   },
	
	
	_rerank: function (event, ui) {
	     var that = this;
	     //find previous element's order, or 0
	     var $story = $(ui.item).find("li");
			 var $storydiv = $(ui.item)
	     var next_order = $storydiv.next("div").find("li").data("rank");
	     var prev_order = $storydiv.prev("div").find("li").data("rank");
			 
	     //find next element's order, or prev_element + 2
	     // turn your old order into the average of the two.
	    var updated_rank = this._calculatePosition(prev_order, next_order);
			
			var oldListId = $story.data("list-id")
	    var storyId = $story.data("id");
			var projectID = this.model.get('project_id')

			
	    var updatedStoryListId = $storydiv.parent().data("id");
			console.log(updatedStoryListId)
			
	    var storyModel = this.model.stories().get(storyId);
			console.log(this.model.stories())
			console.log(storyId)
	    storyModel.save({
	      rank: updated_rank,
	      list_id: updatedStoryListId },
	      { patch: true,
	        success: function(model){
	           $story.data("rank", updated_rank);
	           that.model.stories().add(model);
	           // remove it from the old list's collection
	           Epictracker.projects.get(projectID).lists().get(oldListId).stories().remove(model, { silent: true });
	           $story.data("list-id", updatedStoryListId);
	          }
	      });
	},
	
  _calculatePosition: function(prevPos, nextPos){
    if(!nextPos){
      if(!prevPos){
        return 10000000000000;
      } else {
        return (prevPos + 1);
      }
    } else if(!prevPos){
      return (nextPos / 2);
    }
    return (nextPos + prevPos) / 2;
  },
	
})