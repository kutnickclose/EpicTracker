module Api
  class ProjectsController < ApplicationController
  
    def index
      @projects = Project.all
      render :index
    end
  
    def new
    end
  
    def create
      #come back and change this to be built on the user like trello
      @project = Project.new(project_params)
      if @project.save
        render partial: "api/projects/project"
      else
        render json: {errors: @projects.errors.full_messages}, status: 422
      end
    end
  
    def update
    end
  
    def edit
    end
  
    def destroy
    end
  
    def show
      @project = Project.find(params[:id])
      render partial: "api/projects/project" #, locals: { project: @project }
    end
  
    private
    def project_params
      params.require(:project).permit(:name)
    end
  
  
  end
end
