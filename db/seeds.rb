# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.create(email: "demouser@gmail.com", password: "password")

project = Project.create(name: "Sample Project")
projectassignment = ProjectAssignment.create(user_id: user.id, project_id: project.id)

list1 = List.create(name: "icebox", project_id: project.id)
list2 = List.create(name: "backlog", project_id: project.id)
list3 = List.create(name: "current", project_id: project.id)
list4 = List.create(name: "done", project_id: project.id)


#current list stories
story2 = Story.create(title: "The Current List shows stories for this week, starting on Monday. The Current list will only show 10 points worth of stories, unless additional stories are started", story_type: "feature", points: "1", state: "accepted", description: "This is the story description. You can edit this by typing here", rank: "0.5", list_id: list3.id)
story2 = Story.create(title: "This is a done story", story_type: "feature", points: "1", state: "accepted", description: "This is the story description. You can edit this by typing here", rank: "1", list_id: list3.id)
story3 = Story.create(title: "This is a ready to be accepted/rejected story", story_type: "feature", points: "1", state: "delivered", description: "This is the story description. You can edit this by typing here", rank: "2", list_id: list3.id)
story4 = Story.create(title: "This story has been rejected", story_type: "feature", points: "1", state: "rejected", description: "This is the story description. You can edit this by typing here", rank: "3", list_id: list3.id)
story5 = Story.create(title: "This story has been finished but not delivered", story_type: "feature", points: "1", state: "finished", description: "This is the story description. You can edit this by typing here", rank: "4", list_id: list3.id)
story6 = Story.create(title: "This story has been started but not finished", story_type: "feature", points: "1", state: "started", description: "This is the story description. You can edit this by typing here", rank: "5", list_id: list3.id)
story7 = Story.create(title: "This story has been estimated but not started", story_type: "feature", points: "3", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "6", list_id: list3.id)
story8 = Story.create(title: "This story has been prioritized but not estimated", story_type: "feature", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "7", list_id: list3.id)
story9 = Story.create(title: "Click '3' and watch me automatically get moved to the backlog for going over the velocity limit", story_type: "feature", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "8", list_id: list3.id)


#backlog list stories
story95 = Story.create(title: "The Backlog shows upcoming stories for future weeks", story_type: "feature", points: "3", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "1", list_id: list2.id)
story27 = Story.create(title: "This is a bug. Bugs are for tracking/solving issues", story_type: "bug", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "1.5", list_id: list2.id)
story27 = Story.create(title: "This is a chore. Chores are for tasks that aren't creaing new functionality (i.e. running a report)", story_type: "chore", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "1.7", list_id: list2.id)

story96 = Story.create(title: "Story 1 Drag and Drop me!", story_type: "feature", points: "2", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "2", list_id: list2.id)
story10 = Story.create(title: "Story 2 Drag and Drop me!", story_type: "feature", points: "1", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "3", list_id: list2.id)
story11 = Story.create(title: "Story 3 Drag and Drop me!", story_type: "feature", points: "3", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "4", list_id: list2.id)
story12 = Story.create(title: "Story 4 Drag and Drop me!", story_type: "feature", points: "2", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "5", list_id: list2.id)
story13 = Story.create(title: "Story 5 Drag and Drop me!", story_type: "feature", points: "1", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "6", list_id: list2.id)
story14 = Story.create(title: "Story 6 Drag and Drop me!", story_type: "feature", points: "3", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "7", list_id: list2.id)
story15 = Story.create(title: "Story 7 Drag and Drop me!", story_type: "feature", points: "2", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "8", list_id: list2.id)
story16 = Story.create(title: "Story 8 Drag and Drop me!", story_type: "feature", points: "1", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "9", list_id: list2.id)

#icebox stories
story17 = Story.create(title: "The Icebox is a storage area for unprioritized stories", story_type: "feature", points: "3", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "1", list_id: list1.id)
story26 = Story.create(title: "Click 'add story' to add a story or the black triangle to edit a story", story_type: "feature", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "1.2", list_id: list1.id)

story18 = Story.create(title: "0 points = quick task, 1 point = short time, 2 points = medium time, 3 points = long time", story_type: "feature", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "2", list_id: list1.id)
story19 = Story.create(title: "Story 10 Drag and Drop me! Set my Point Values! Start me! See what Happens!", story_type: "feature", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "3", list_id: list1.id)
story20 = Story.create(title: "Story 11 Drag and Drop me! Set my Point Values! Start me! See what Happens!", story_type: "feature", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "4", list_id: list1.id)
story21 = Story.create(title: "Story 12 Drag and Drop me! Set my Point Values! Start me! See what Happens!", story_type: "feature", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "5", list_id: list1.id)
story22 = Story.create(title: "Story 13 Drag and Drop me! Set my Point Values! Start me! See what Happens!", story_type: "feature", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "6", list_id: list1.id)
story23 = Story.create(title: "Story 14 Drag and Drop me! Set my Point Values! Start me! See what Happens!", story_type: "feature", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "7", list_id: list1.id)
story24 = Story.create(title: "Story 15 Drag and Drop me! Set my Point Values! Start me! See what Happens!", story_type: "feature", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "8", list_id: list1.id)
story25 = Story.create(title: "Story 16 Drag and Drop me! Set my Point Values! Start me! See what Happens!", story_type: "feature", points: "unestimated", state: "unstarted", description: "This is the story description. You can edit this by typing here", rank: "9", list_id: list1.id)