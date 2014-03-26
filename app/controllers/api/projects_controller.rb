module Api
  class ProjectsController < ApiController
  
    def index
      @projects = Project.joins(:project_assignments).where(project_assignments: {user_id: current_user.id})
      
      # "SELECT * FROM project p JOIN project_assignment pa ON (p.id = pa.project_id) 
      # JOIN user u ON (pa.user_id = u.id) WHERE p.user_id = ?", current_user.id )
      render :index
    end
  
    def new
    end
  
    def create
      @project = current_user.projects.build(project_params)
      if @project.save
        @list1 = List.new(name: "icebox", project_id: @project.id)
        @list2 = List.new(name: "backlog", project_id: @project.id)
        @list3 = List.new(name: "current", project_id: @project.id)
        @list4 = List.new(name: "done", project_id: @project.id)
        @list1.save
        @list2.save
        @list3.save
        @list4.save
        render partial: "api/projects/project", locals: { project: @project }
      else
        render json: { errors: @projects.errors.full_messages}, status: 422
      end
    end
    
    # console.log(this.project.id)
#     var icebox = new Epictracker.Models.List({name: "icebox", project_id: this.project.id});
#     var backlog = new Epictracker.Models.List({name: "backlog", project_id: this.project.id});
#     var current = new Epictracker.Models.List({name: "current", project_id: this.project.id});
#     icebox.save()
#     backlog.save()
#     current.save()
#     this.add(icebox)
#     this.add(backlog);
#     this.add(current);
  
    def update
      @project = current_user.projects.find(params[:id])
      if @project.update_attributes(project_params)
        render partial: "api/projects/project", locals: { project: @project }
      else
        render json: {errors: @projects.errors.full_messages}, status: 422
      end
    end
  
    def edit
    end
  
    def destroy
    end
  
    def show
      @project = Project.find(params[:id])
      render partial: "api/projects/project", locals: { project: @project }
    end
  
    private
    def project_params
      params.require(:project).permit(:name, :velocity)
    end
  
  
  end
end
