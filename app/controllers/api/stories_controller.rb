module Api
  class StoriesController < ApplicationController
  
    def index
      @stories = List.find(params[:list_id]).stories
      render :index
    end
  
    def new
    end
  
    def create
      @story = Story.new(story_params)
      if @story.save
        render partial: "api/stories/story", locals: { story: @story }
      else
        render json: { errors: @board.errors.full_messages }, status: 422
      end
    end
  
    def show
      @story = Story.find(params[:id])
      render partial: "api/stories/story", locals: {story: @story }
    end
  
    def edit
    end
  
    def update
      @story = Story.find(params[:id])
      
      if @story.update_attributes(story_params)
        render partial: "api/stories/story", locals: {story: @story}
      else
        render json: { errors: @story.errors.full_messages }, status: 422
      end
        
    end
  
    def destroy
      @story = Story.find(params[:id]).try(:destroy)
      render json: nil
    end
  
    private
    def story_params
      params.require(:story).permit(:title, :story_type, :points, :state, :description, :rank, :list_id)
    end
  
  end
end