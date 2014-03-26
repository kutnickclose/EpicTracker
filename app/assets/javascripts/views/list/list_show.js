window.Epictracker.Views.ListShow = Backbone.CompositeView.extend({
	template: JST["lists/show"],
	
	initialize: function (option){
		var that = this
		this.project = option.project;
		this.model.stories().fetch();
		this.createNewWeekIfNecessary()
		this.listenTo(this.model.weeks(), "add", this.render)
		this.listenTo(this.model, "add remove sync", this.render)
		this.listenTo(this.model.stories(), "add remove sync", this.render)
		
		//
		// this.addCurrentWeek()
	},
	
	events: {
		"sortstop" : "_rerank"
	},
	
	render: function () {
		var content = this.template({
			list : this.model
		});
		this.$el.html(content);
		if (this.model.get('name') === "current"){
			this.renderCurrentWeek()	
		}
		if (this.model.get('name') === "backlog"){
			this.renderBacklogWeeks()	
		}
		this.renderStories();
		this.makeItSortable()
		
		return this
	},
	
	renderStories: function () {
		this.model.stories().sort();
		var that = this
		
		//move stories to backlog if points this week > velocity
		this.moveStoriesFromCurrentToBacklog()
		

		// var sum = 0
		// var ten = 0
		this.model.stories().each(function(story) {
			that.addStory(story)
			// sum += parseInt(story.get('points'))
			// if (sum > that.project.get('velocity')) {
			// 	// that.renderNewBacklogWeek(1 + Math.floor((sum +10*ten)/10))
			// 	that.addStory(story);
			// 	sum = 0
			// 	ten += 1
			// } else {
			//   that.addStory(story);	
			// }
		});
	},
	
	renderNewBacklogWeek: function (date) {
		var that = this;
		var backlogWeek = this.model.weeks().findWhere({start_date: that.getDate(date)})
		if (!backlogWeek) {
			var backlogWeek = new Epictracker.Models.Week({
				list_id: that.model.id,
				week_num: that.model.weeks().length + 2,
				start_date: that.getDate(date)
			})
		  backlogWeek.save()
		  that.model.weeks().add(backlogWeek)
		}
		var view = new Epictracker.Views.WeekShow({
			model: backlogWeek
		});
		that.addSubView('.storyShow', view.render());
	
	},
	
	addStory: function (story) {
		var view = new Epictracker.Views.StoryShow({
			model: story,
			list: this.model,
			collection: this.model.stories()
		})
		this.addSubView('.stories', view.render())
	},
	
	createNewWeekIfNecessary: function () {
		var that = this
		if (that.model.get('name') === "current") {
			this.model.weeks().fetch({
				success: function () {
					if (that.model.weeks().length === 0) {
						that._weekModel = new Epictracker.Models.Week({
							list_id: that.model.id,
							week_num: that.model.weeks().length + 1,
							start_date: that.getDate(0)
						})
					  that._weekModel.save()
					  that.model.weeks().add(that._weekModel)
				  };
			  }
			});
		}
		if (that.model.get('name') === "backlog") {
			this.model.weeks().fetch({
				success: function () {
					if (that.model.weeks().length === 0) {
						that._weekModel1 = new Epictracker.Models.Week({
							list_id: that.model.id,
							week_num: that.model.weeks().length + 2,
							start_date: that.getDate(1)
						})
					  that._weekModel1.save()
					  that.model.weeks().add(that._weekModel1)
				  };
			  }
			});
		}
	},
	
	// addCurrentWeek: function () {
	// 	var that=this		
	// 	this.model.weeks().fetch({
	// 		success: function () {
	// 			if (that.model.get('name') === "current") {
	// 				that.renderCurrentWeek();
	// 			}
	// 		}
	// 	});
	// },
	
	renderCurrentWeek: function() {
		var that=this;
		if (this.model.weeks().first()) {
			var view = new Epictracker.Views.WeekShow({
				model: that.model.weeks().first()
			});
			that.prependSubView('.stories', view.render());
		}
	},
	
	renderBacklogWeeks: function () {
		var that = this;
		if (this.model.weeks().findWhere({start_date: that.getDate(1)})) {
			var view = new Epictracker.Views.WeekShow({
				model: that.model.weeks().first()
			});
			that.prependSubView('.stories', view.render());
		}

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
		
		// it already automatically moves all the stories off so don't need to recursively do it????
				// this.model.stories().each(function(story) {
				// 	sum += parseInt(story.get("points"))
				// })
				// if (sum > that.project.get('velocity')) {
				// 	that.moveToBacklog()
				// }
	},
	
	
	_rerank: function (event, ui) {
	     var that = this;
	     var $story = $(ui.item)
			 var $storydiv = $(ui.item)
	     var next_order = $story.next("li").data("rank")
	     var prev_order = $story.prev("li").data("rank")

	    var updated_rank = this._calculatePosition(prev_order, next_order);
	    var storyId = $story.data("id");
			var projectID = this.model.get('project_id')
			var oldListId = $story.data("list-id")
	    var updatedStoryListId = $story.parent().data("id");
	    var storyModel = this.model.stories().get(storyId);
			
	    storyModel.save({
	      rank: updated_rank,
	      list_id: updatedStoryListId },
	      { patch: true,
	        success: function(model){
						 $story.data("rank", updated_rank);
						 Epictracker.projects.get(projectID).lists().get(oldListId).stories().remove(model, {silent: true});
						 Epictracker.projects.get(projectID).lists().get(updatedStoryListId).stories().add(model);
	           $story.data("list-id", updatedStoryListId);
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
	
	moveStoriesFromCurrentToBacklog: function () {
		var that = this
		if (this.model.get('name') === "current") {
			var sum = 0
			this.model.stories().each(function(story) {
				sum += parseInt(story.get("points"))
			})
			if (sum > that.project.get('velocity')) {
				that.moveToBacklog()
			}
		};
	},
	
	makeItSortable: function () {
		var that = this
		this.$(".stories").sortable({
			cursor: "move",
			opacity: 0.3,
			dropOnEmpty: true,
			connectWith: ".stories",
			items: "li:not(.weekShow)"
		});
	},
	
	getDate: function (num) {
		var getMonday = new Date;
		var first = getMonday.getDate() - getMonday.getDay() + 1 + 7 * num; // First day is the day of the month - the day of the week
		var Monday = new Date(getMonday.setDate(first)).toUTCString();
		var mondayDate = Monday.slice(5,11)
		return mondayDate
	},
		
	
})