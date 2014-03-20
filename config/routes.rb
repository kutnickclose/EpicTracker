Epictracker::Application.routes.draw do
  root :to => "static_pages#root"
  
  namespace :api, defaults: {format: :json} do
    resources :projects, :only => [:create, :destroy, :index, :show, :update] do
      resources :lists, :only => [:index, :new, :create, :show]
    end
  end
end

