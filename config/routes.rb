Epictracker::Application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }
  root :to => "static_pages#root"
  
  namespace :api, defaults: {format: :json} do
    resources :projects, :only => [:create, :destroy, :index, :show, :update] do
      resources :lists, :only => [:index, :new, :create, :show]
    end
    
    resources :lists, only: [] do
      resources :stories, only: [:create, :index, :destroy, :update]
    end
    
    resources :stories, only: [:show, :update]
  end
end

