window.Epictracker.Views.ListShow = Backbone.CompositeView.extend({
	template: JST["lists/show"],
	
	initialize: function (option){
		var that = this
		this.project = option.project;
		this.model.stories().fetch();
		this.listenTo(this.model, "add remove sync", this.render)
		this.listenTo(this.model.stories(), "add remove sync", this.render)
		// this.listenTo(this.project.lists(), "add remove sync", this.render)
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
		});
		
	
		return this
	},
	
	renderStories: function () {
		this.model.stories().sort();
		var that = this
		
		if (this.model.get('name') === "current") {
			var sum = 0
			this.model.stories().each(function(story) {
				sum += parseInt(story.get("points"))
			})
			if (sum > that.project.get('velocity')) {
				that.moveToBacklog()
			}
		}

		this.model.stories().each(function(story) {
			var view = new Epictracker.Views.StoryShow({
				model: story,
				list: this.model,
				collection: this.model.stories()
			})
			this.addSubView('.stories', view.render());
		}, this);
	},
	
	moveToBacklog: function () {
		var that = this
		this.model.stories().sort();
		var storyToMove = this.model.stories().last()
		var backlog_id = parseInt(this.model.stories().last().get('list_id')) - 1
		storyToMove.set({
			list_id: backlog_id
		})
		storyToMove.save()
		var sum = 0
		this.model.stories().remove(storyToMove)
		this.project.lists().get(backlog_id).stories().add(storyToMove)
		// this.model.stories().each(function(story) {
		// 	sum += parseInt(story.get("points"))
		// })
		// if (sum > that.project.get('velocity')) {
		// 	that.moveToBacklog()
		// }
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
	     var $story = $(ui.item).find("li");
			 var $storydiv = $(ui.item)
	     var next_order = $storydiv.next("div").find("li").data("rank");
	     var prev_order = $storydiv.prev("div").find("li").data("rank");
			 
	    var updated_rank = this._calculatePosition(prev_order, next_order);
			
	    var storyId = $story.data("id");
			var projectID = this.model.get('project_id')

			var oldListId = $story.data("list-id")
	    var updatedStoryListId = $storydiv.parent().data("id");
			// console.log(oldListId)
			// console.log( updatedStoryListId)

			
	    var storyModel = this.model.stories().get(storyId);
			
			
	    storyModel.save({
	      rank: updated_rank,
	      list_id: updatedStoryListId },
	      { patch: true,
	        success: function(model){
						 $story.data("rank", updated_rank);
						 Epictracker.projects.get(projectID).lists().get(oldListId).stories().remove(model, {silent: true});
						 //add
						 Epictracker.projects.get(projectID).lists().get(updatedStoryListId).stories().add(model);
						 //delete
						 
	           $story.data("list-id", updatedStoryListId);
						 // Epictracker.projects.get(projectID).lists().get(oldListId).stories().remove(model);
	          }
	      });
	},
	
  _calculatePosition: function(prevPos, nextPos){
    if(!nextPos){
      if(!prevPos){
        return 100;
      } else {
        return (prevPos + 1);
      }
    } else if(!prevPos){
      return (nextPos / 2);
    }
    return (nextPos + prevPos) / 2;
  },
	
})