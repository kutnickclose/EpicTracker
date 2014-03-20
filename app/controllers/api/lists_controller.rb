module Api

  class ListsController < ApplicationController
  
    def new
    end
  
    def index
      @lists = Project.find(params[:project_id]).lists
      render :index
    end
  
    def create
      @list = List.new(list_params)
      if @list.save
        render partial: "api/lists/list", locals: { list: @list }
      else
        render json: { errors: @list.errors.full_messages }, status: 422
      end
    end
  
    def show
      @list = List.find(params[:id])
      render partial: "api/lists/list", locals: { list: @list }
    end
  
    private
    def list_params
      params.require(:list).permit(:name)
    end

  end
end
