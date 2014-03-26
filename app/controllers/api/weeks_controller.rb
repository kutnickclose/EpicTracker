module Api
  class WeeksController < ApiController
    
    def index
      @weeks = List.find(params[:list_id]).weeks
      render :index
    end
    
    def create
      @week = Week.new(week_params)
      if @week.save
        render partial: "api/weeks/week", locals: {week: @week}
      else
        render json: { errors: @week.errors.full_messages }, status: 422
      end
    end
  
    def update
      @week = Week.find(params[:id])
      if @week.update_attributes(week_params)
        render partial: "api/weeks/week", locals: { week: @week }
      else
        render json: { errors: @week.errors.full_messages }, status: 422
      end
    end
  
    def show
      @week = Week.find(params[:id])
      render partial: "api/weeks/week", locals: {week: @week}
    end
  
    def destroy
       @week = Week.find(params[:id]).try(:destroy)
       render json: nil
    end
  
    private
    def week_params
      params.require(:week).permit(:list_id, :week_num, :start_date)
    end
  
  end
end