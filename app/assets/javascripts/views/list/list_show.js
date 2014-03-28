window.Epictracker.Views.ListShow = Backbone.CompositeView.extend({
	template: JST["lists/show"],
	
	initialize: function (option){
		var that = this
		this.project = option.project;
		this.model.stories().fetch();

		this.listenTo(this.model, "add remove sync", this.render)
		this.listenTo(this.model.stories(), "add remove sync", this.render)
		
	},
	
	events: {
		"sortstop" : "_rerank"
	},
	
	render: function () {
		//render list
		var content = this.template({
			list : this.model
		});
		this.$el.html(content);

		//render "weeks" in current and backlog
		if (this.model.get('name') === "current") {
			this.renderCurrentFirstWeek()
		} else if (this.model.get('name') === "backlog") { 
			this.renderBacklogFirstWeek()
		}
		
		//hide done
		if (this.model.get('name') === "done") {
			this.$('.done').addClass("hidden")
		}

		this.renderStories();
		this.makeItSortable()
		
		return this
	},
	
	renderStories: function () {
		this.model.stories().sort();
		var that = this

		if (that.model.get('name') === "backlog") {
			that.renderBacklogWeeks();
		} else {
			this.model.stories().each(function(story) {
				that.addStory(story);
			})
		}
		
		// this.moveStoriesFromBacklogToCurrent()
		
		//move stories to backlog if points this week > velocity
		this.moveStoriesFromCurrentToBacklog()

	},
	
	renderBacklogFirstWeek: function () {
		var monday = this.getDate(1)
		var start_date = this.convertTime(this.project.get("created_at"))
		var today_date = new Date

		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		diffDays = Math.round(Math.abs((today_date.getTime() - start_date.getTime())/(oneDay)));
		
		var week = Math.floor(diffDays / 7) + 2
		this.$(".stories").prepend("<p class='weekShow'>week " + week + " | " + monday + "</p>")
	},
	
	renderCurrentFirstWeek: function () {
		var monday = this.getDate(0)
		var start_date = this.convertTime(this.project.get("created_at"))
		var today_date = new Date

		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		diffDays = Math.round(Math.abs((today_date.getTime() - start_date.getTime())/(oneDay)));
		
		var week = Math.floor(diffDays / 7) + 1
		this.$(".stories").prepend("<p class='weekShow'>week " + week + " | " + monday + "</p>")
	},
	
	convertTime: function (text) {
			return new Date(Date.parse(text.replace(/( +)/, ' UTC$1')));
	},
	
	renderBacklogWeeks: function () {
		//set up necessary variables for week calculation
		var that = this
	  var mondayNum = 2
	  var monday = this.getDate(mondayNum)
		var start_date = this.convertTime(this.project.get("created_at"))
		var today_date = new Date
		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		diffDays = Math.round(Math.abs((today_date.getTime() - start_date.getTime())/(oneDay)));
		var week = Math.floor(diffDays / 7) + 3
		
		var sum = 0
		
		//add a new week after a "velocity" amount of points
		this.model.stories().each(function(story) {
			if (story.get('points') === "unestimated") {
				sum += 0
			} else {
				sum += parseInt(story.get('points'))
			}
			if (sum > that.project.get('velocity')) {
				that.addStory(story);
				var selector = ".story" + story.get("id")
				that.$(selector).before( "</ul><p class='weekShow'>week " + week + " | " + monday + "</p><ul>")
				sum = parseInt(story.get('points'))
				week += 1
				mondayNum += 1
				monday = that.getDate(mondayNum)
			} else {
			  that.addStory(story);	
			}
		});
		
	},
	

	
	addStory: function (story) {
		var view = new Epictracker.Views.StoryShow({
			model: story,
			list: this.model,
			collection: this.model.stories(),
			project: this.project
		})
		this.addSubView('.stories', view.render())
	},
	
	moveStoriesFromBacklogToCurrent: function () {
		var that = this
		if (this.model.get('name') === "backlog") {
			var sum = 0
			if (this.model.stories().first()) {
				var current_id = parseInt(that.model.stories().first().get('list_id')) + 1
				this.project.lists().get(current_id).stories().each(function(story) {
					sum += parseInt(story.get("points"))
				})
				if (sum < that.project.get('velocity')) {
					that.moveToCurrent()
				}
			}
		};
	},
	
	moveToCurrent: function () {
		var that = this
		this.model.stories().sort();
		var storyToMove = this.model.stories().first()
		var current_id = parseInt(this.model.stories().first().get('list_id')) + 1
		storyToMove.set({
			list_id: current_id
		})
		storyToMove.save()
		var sum = 0
		this.model.stories().remove(storyToMove)
		this.project.lists().get(current_id).stories().add(storyToMove)
	},
	
	moveStoriesFromCurrentToBacklog: function () {
		var that = this
		if (this.model.get('name') === "current") {
			var sum = 0
			this.model.stories().each(function(story) {	
				if (story.get('points') === "unestimated") {
					sum += 0
				} else {
					sum += parseInt(story.get('points'))
				}
			})
			if (sum > that.project.get('velocity')) {
				that.moveToBacklog()
			}
		};
	},
	
	moveToBacklog: function () {
		var that = this
		this.model.stories().sort();
		var storiesToMove = new Array();
		this.model.stories().each(function(story) {
			if ((story.get('state') === "unstarted" || story.get('state') === "unscheduled")  && story.get('points') !== "unestimated") {
				storiesToMove.push(story)
			}
		});
		
		var storyToMove = storiesToMove[storiesToMove.length-1]
		if (storyToMove) {
			var projectID = this.model.get('project_id')
			var backlog_id = parseInt(this.model.stories().last().get('list_id')) - 1
			var rank = Epictracker.projects.get(projectID).lists().get(backlog_id).stories().first().get('rank') / 2;
			storyToMove.set({
				list_id: backlog_id,
				rank: rank
			})
			storyToMove.save()
			var sum = 0
			this.model.stories().remove(storyToMove)
			this.project.lists().get(backlog_id).stories().add(storyToMove)
		}

		
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
						 Epictracker.projects.get(projectID).lists().get(oldListId).stories().remove(model);
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
	
	
	makeItSortable: function () {
		var that = this
		this.$(".stories").sortable({
			cursor: "move",
			opacity: 0.3,
			dropOnEmpty: true,
			connectWith: ".stories",
			items: "li:not(.accepted)"
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